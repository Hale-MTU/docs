# Hale Docs

Nextra documentation site for the apps published by Hale MTÜ: OpenVitals, OpenWatch and OpenBridge, and OpenLink, the link between OpenVitals and OpenWatch.

The content lives in `docs/`, one folder each: `docs/openvitals/`, `docs/openwatch/`, `docs/openbridge/` and `docs/openlink/`, under the Hale docs home `docs/index.md`. Each folder's `_meta.ts` is its sidebar; `docs/_meta.ts` is the navbar.

Some pages are ported from the apps' repositories and say so at the bottom ("kept in step with ..."): OpenWatch's watches, Wear OS install, permissions, privacy, release notes and developer pages, and OpenLink's specification. Change those in the app's repository first, then here, so the two say the same.

Repository:

```text
https://github.com/Hale-MTU/docs
```

Website URL:

```text
https://docs.hale.ngo/
```

## Local Preview

```bash
npm install
npm run dev
```

## Build

```bash
npm run typecheck
npm run build
```

The build is a static export: every page is written to `out/` as `<path>/index.html`, with the Pagefind search index in `out/_pagefind`. To preview the exported site rather than the dev server:

```bash
python3 -m http.server --directory out 3000
```

## Repository Rename

This repository is expected to live at:

```text
https://github.com/Hale-MTU/docs
```

If a local checkout still points to the previous repository slug, update it with:

```bash
git remote set-url origin https://github.com/Hale-MTU/docs
```

## GitHub Pages

The GitHub Actions workflow (`.github/workflows/test.yml`) builds the Nextra site on every push and pull request and, on a push to `main`, deploys `out/` to GitHub Pages.

One-time setup: in the repository's Settings → Pages, set the source to "GitHub Actions" and the custom domain to `docs.hale.ngo`, and turn on "Enforce HTTPS" once the certificate is issued. In DNS, `docs` is a `CNAME` record on hale.ngo pointing to `hale-mtu.github.io`. The apex `hale.ngo` belongs to the landing page, not this site. The old address, docs.openvitals.health, is served by a separate redirect site that forwards every path here.

A static host has no server-side redirects, so `public/` holds small redirect pages. A section without an index page (`/openvitals/app/`, `/openvitals/features/`, `/openvitals/releases/`, `/openvitals/developers/`) sends links to its first page. Every address from before OpenVitals moved under `/openvitals/` (`/app/privacy/`, `/features/scales/` and the rest) sends links to the same page in its new place; the OpenVitals app, its Play listing and the landing page link to some of them.

## License

The OpenVitals documentation site is licensed under the [`GNU Affero General Public License v3.0 or later`](LICENSE).
