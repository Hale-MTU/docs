# OpenVitals Docs

Nextra documentation site for OpenVitals.

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

A section without an index page (`/app/`, `/features/`) has a small redirect page in `public/` that sends old links to its first page, since a static host has no server-side redirects.

## License

The OpenVitals documentation site is licensed under the [`GNU Affero General Public License v3.0 or later`](LICENSE).
