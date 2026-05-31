# Muhammad Ahmed — Portfolio

Personal UI/UX design portfolio (React 19 + Vite 7 + Tailwind 4).

Open this folder in **VS Code**, **Cursor**, or **Windsurf** — the repo root is the workspace (not a subfolder).

## Quick start

**Requirements:** [Node.js](https://nodejs.org/) 20+ and [pnpm](https://pnpm.io/) (`corepack enable`).

```powershell
cd path\to\MuhammadAhmedPortfolio
pnpm.cmd install --ignore-scripts
pnpm.cmd dev
```

**PowerShell blocks `pnpm`?** Windows may disable `.ps1` scripts. Use `pnpm.cmd` instead of `pnpm`, or run once:

```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

Open **http://localhost:5000/**

In VS Code / Cursor: **Terminal → Run Task → Dev: Portfolio**, or run `pnpm dev` from the integrated terminal.

## Where files live

| Path | Purpose |
|------|---------|
| `artifacts/portfolio/src/` | React pages and components |
| `artifacts/portfolio/public/` | Images, PDFs, case-study assets (served at `/`) |
| `artifacts/api-server/` | Optional Express API (contact form) |
| `lib/` | Shared API / DB packages for the monorepo |

**Images & documents:** `artifacts/portfolio/public/`  
Subfolders: `jsoor/`, `lumen/`, `nicotina/`, plus root files like `avatar.png`, `muhammad-ahmed-resume.pdf`.

## Project layout

```
MuhammadAhmedPortfolio/
├── artifacts/
│   ├── portfolio/     ← main website
│   └── api-server/    ← optional backend
├── lib/               ← shared packages
├── package.json
├── pnpm-workspace.yaml
└── .vscode/           ← editor tasks & settings
```

## Scripts

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start portfolio dev server (port 5000) |
| `pnpm build` | Typecheck and build all packages |
| `pnpm run typecheck` | Typecheck only |

## Notes

- Use **pnpm**, not npm or yarn (`pnpm install --ignore-scripts` on Windows avoids a Unix-only hook).
- The contact form needs the API server and a Postgres `DATABASE_URL`.
- Default dev URL: **http://localhost:5000/** (no env vars required locally).
