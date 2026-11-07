import { posix, relative, sep } from 'node:path'
import type { Image, Link, Nodes, Parent, Root, RootContent } from 'mdast'
import { fromMarkdown } from 'mdast-util-from-markdown'

// The fields of hast properties this plugin sets on a node, through mdast's data.
type HastData = {
  hProperties?: {
    className?: unknown
  }
}

const markdownAttributePattern = /\s+markdown=(["'])1\1/g
const classAttributePattern = /^\{\s*((?:\.[A-Za-z0-9_-]+\s*)+)\}/
const repoReferenceReplacements: [RegExp, string][] = [
  [/ssh:\/\/git@codeberg\.org\/OpenVitals\/website\.git/g, 'git@github.com:Hale-MTU/docs.git'],
  [/https:\/\/codeberg\.org\/OpenVitals\/website\.git/g, 'https://github.com/Hale-MTU/docs.git'],
  [/https:\/\/codeberg\.org\/OpenVitals\/website/g, 'https://github.com/Hale-MTU/docs'],
  [/codeberg\.org\/OpenVitals\/website/g, 'github.com/Hale-MTU/docs'],
  [/OpenVitals\/website/g, 'Hale-MTU/docs']
]

export function remarkMkdocsCompat() {
  return (tree: Root, file: { path: string }) => {
    transformChildren(tree)
    normalizeMarkdownLinks(tree, pageDirectory(file))
  }
}

// The page's folder below the content root: 'features' for
// content/features/scales.md, '' for content/index.md.
function pageDirectory(file: { path: string }): string {
  return relative(process.cwd(), file.path).split(sep).slice(1, -1).join('/')
}

// The plugin splices block content and raw HTML in wherever MkDocs had them, which
// mdast's per-parent child types do not allow, so children are handled as any node.
function childrenOf(parent: Parent): RootContent[] {
  return parent.children as RootContent[]
}

function transformChildren(parent: Nodes) {
  if (!('children' in parent)) {
    return
  }

  const children = childrenOf(parent)

  for (let index = 0; index < children.length; index += 1) {
    const child = children[index]
    const replacement = transformHtmlNode(child)

    if (replacement) {
      children.splice(index, 1, ...replacement)
      index += replacement.length - 1
      continue
    }

    rewriteRepoReferencesInNode(child)
    transformChildren(child)
  }

  applyInlineAttributes(parent)
  normalizeMarkdownImages(parent)
}

function transformHtmlNode(node: RootContent): RootContent[] | null {
  if (node.type !== 'html' || !node.value.includes('markdown=')) {
    return null
  }

  const fullWrapper = node.value.match(
    /^<([A-Za-z][\w:-]*)([^>]*)>\n?([\s\S]*?)\n?<\/\1>$/
  )

  if (fullWrapper && hasMarkdownAttribute(fullWrapper[2])) {
    const [, tagName, rawAttributes, innerMarkdown] = fullWrapper
    return wrapParsedMarkdown(tagName, rawAttributes, innerMarkdown)
  }

  const openingWithMarkdown = node.value.match(
    /^<([A-Za-z][\w:-]*)([^>]*)>\n([\s\S]+)$/
  )

  if (openingWithMarkdown && hasMarkdownAttribute(openingWithMarkdown[2])) {
    const [, tagName, rawAttributes, trailingMarkdown] = openingWithMarkdown
    return [
      {
        type: 'html',
        value: `<${tagName}${stripMarkdownAttribute(rawAttributes)}>`
      },
      ...parseMarkdownFragment(trailingMarkdown)
    ]
  }

  node.value = stripMarkdownAttribute(node.value)
  return null
}

function wrapParsedMarkdown(
  tagName: string,
  rawAttributes: string,
  innerMarkdown: string
): RootContent[] {
  return [
    {
      type: 'html',
      value: `<${tagName}${stripMarkdownAttribute(rawAttributes)}>`
    },
    ...parseMarkdownFragment(innerMarkdown),
    {
      type: 'html',
      value: `</${tagName}>`
    }
  ]
}

function parseMarkdownFragment(markdown: string): RootContent[] {
  const fragment = fromMarkdown(markdown)
  transformChildren(fragment)
  return fragment.children
}

function hasMarkdownAttribute(value: string): boolean {
  return /\smarkdown=(["'])1\1/.test(value)
}

function stripMarkdownAttribute(value: string): string {
  return value.replace(markdownAttributePattern, '')
}

function applyInlineAttributes(parent: Parent) {
  const children = childrenOf(parent)

  for (let index = 0; index < children.length - 1; index += 1) {
    const child = children[index]
    const next = children[index + 1]

    if (
      (child.type !== 'image' && child.type !== 'link') ||
      next?.type !== 'text' ||
      !next.value.startsWith('{')
    ) {
      continue
    }

    const match = next.value.match(classAttributePattern)
    if (!match) {
      continue
    }

    addClassNames(
      child,
      match[1]
        .trim()
        .split(/\s+/)
        .map(className => className.slice(1))
    )

    next.value = next.value.slice(match[0].length)
    if (!next.value) {
      children.splice(index + 1, 1)
    }
  }
}

function addClassNames(node: Image | Link, classNames: string[]) {
  const data = (node.data ||= {}) as HastData
  data.hProperties ||= {}

  const existing = data.hProperties.className
  const current = Array.isArray(existing)
    ? existing
    : typeof existing === 'string'
      ? existing.split(/\s+/).filter(Boolean)
      : []

  data.hProperties.className = [...new Set([...current, ...classNames])].join(' ')
}

function rewriteRepoReferencesInNode(node: RootContent) {
  if (
    node.type === 'code' ||
    node.type === 'html' ||
    node.type === 'inlineCode' ||
    node.type === 'text'
  ) {
    node.value = rewriteRepoReferences(node.value)
  }

  if (node.type === 'definition' || node.type === 'image' || node.type === 'link') {
    node.url = rewriteRepoReferences(node.url)

    if (typeof node.title === 'string') {
      node.title = rewriteRepoReferences(node.title)
    }
  }
}

function rewriteRepoReferences(value: string): string {
  return repoReferenceReplacements.reduce(
    (current, [pattern, replacement]) => current.replace(pattern, replacement),
    value
  )
}

function normalizeMarkdownLinks(node: Nodes, pageDir: string) {
  if (node.type === 'link') {
    node.url = normalizeMarkdownUrl(rewriteRepoReferences(node.url), pageDir)
  }

  if ('children' in node) {
    for (const child of node.children) {
      normalizeMarkdownLinks(child, pageDir)
    }
  }
}

function normalizeMarkdownImages(parent: Parent) {
  for (const child of childrenOf(parent)) {
    if (child.type === 'image') {
      child.url = normalizeImageUrl(child.url)
    }
  }
}

function normalizeMarkdownUrl(url: string, pageDir: string): string {
  if (
    url.startsWith('#') ||
    url.startsWith('//') ||
    /^[A-Za-z][A-Za-z0-9+.-]*:/.test(url)
  ) {
    return url
  }

  const match = url.match(/^([^?#]+)([?#].*)?$/)
  if (!match || !match[1].endsWith('.md')) {
    return url
  }

  // Resolved to an absolute route: every page is exported as <route>/index.html,
  // so a relative link would resolve one folder too deep.
  const page = posix.resolve('/', pageDir, match[1].slice(0, -'.md'.length))
  const route = page.endsWith('/index') ? page.slice(0, -'index'.length) : `${page}/`
  const suffix = match[2] || ''

  return `${route}${suffix}`
}

function normalizeImageUrl(url: string): string {
  if (
    url.startsWith('#') ||
    url.startsWith('/') ||
    url.startsWith('./') ||
    url.startsWith('../') ||
    url.startsWith('//') ||
    /^[A-Za-z][A-Za-z0-9+.-]*:/.test(url)
  ) {
    return url
  }

  return `./${url}`
}
