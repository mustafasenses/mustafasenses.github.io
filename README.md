# Portfolio

Next.js developer portfolio based on [Magic UI](https://github.com/magicuidesign/portfolio).

English / Turkish content, dock language & theme toggle. Shared config in [`content.json`](./content.json), locale copy in [`en-content.json`](./en-content.json) and [`tr-content.json`](./tr-content.json).

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000), then edit the content files and assets in `public/`.

## GitHub Pages (Deploy from a branch)

Site: `https://mustafasenses.github.io/`

1. Build into `docs/`:

```bash
pnpm build:pages
```

2. Commit and push `docs/` to `main`
3. Repo **Settings → Pages**:
   - Source: **Deploy from a branch**
   - Branch: `main`
   - Folder: `/docs`

MIT License — see [LICENSE](./LICENSE).
