# mf-enterprise-demo

**English** | [Türkçe](README.tr.md)

This Webpack 5 Module Federation demo shows a simple e-commerce flow built with a shell container and two remote microfrontends: `product` and `cart`. All apps are written in TypeScript, and shared types, the event bus, and UI components are organized under workspaces.

## Screenshot

![mf-enterprise-demo screenshot](docs/screenshot.png)

## Architecture Diagram

```text
mf-enterprise-demo/
|- apps/
|  |- shell   (3000) -> host container, central routing, layout, theme, user state
|  |- product (3001) -> product list + detail, emits cart:add-item
|  \- cart    (3002) -> cart page, listens cart:add-item, emits cart:count-updated
|- packages/
|  |- shared  -> event bus, types, formatters, helpers
|  |- ui-kit  -> Button, Card, Badge, Skeleton, Toast, Modal
|  \- tsconfig -> shared TypeScript presets
\- tailwind.config.js -> shared styling tokens for all apps

Browser
   |
   v
Shell (localhost:3000)
   |-- consumes --> Product remoteEntry (localhost:3001)
   |-- consumes --> Cart remoteEntry    (localhost:3002)
   |
   \-- shares --> react, react-dom, react-router-dom, @mf-demo/shared, @mf-demo/ui-kit
```

## Setup and Run

```bash
npm install
npm run dev
```

To run each app individually:

```bash
npm run dev -w apps/shell
npm run dev -w apps/product
npm run dev -w apps/cart
```

## GitHub Pages Deployment

This repository deploys automatically to GitHub Pages when changes are pushed to the `main` branch. Workflow file: `.github/workflows/deploy-pages.yml`

To build the Pages artifact locally:

```bash
npm run build:pages
```

The generated static artifact is written to `dist-pages/`.

On GitHub Pages, the shell app runs with `HashRouter`, so no extra SPA rewrite rules are required. Expected URL format:

- Shell: [https://zaferayan.github.io/microfrontend-demo/#/products](https://zaferayan.github.io/microfrontend-demo/#/products)
- Product standalone: [https://zaferayan.github.io/microfrontend-demo/product/#/products](https://zaferayan.github.io/microfrontend-demo/product/#/products)
- Cart standalone: [https://zaferayan.github.io/microfrontend-demo/cart/#/cart](https://zaferayan.github.io/microfrontend-demo/cart/#/cart)

### Publish on Your Own GitHub Pages

To publish this project from your own account:

1. Fork this repository to your GitHub account, or create a new repository and push the code there.
2. Make sure the default branch is `main`.
3. In GitHub, go to `Settings > Pages > Build and deployment > Source` and select `GitHub Actions`.
4. Push to the `main` branch.
5. Wait for the `Deploy GitHub Pages` workflow to complete successfully in the `Actions` tab.

In this project, Pages URLs are generated automatically from the repository owner and repository name. Example:

- Shell: `https://<github-username>.github.io/<repo-name>/#/products`
- Product standalone: `https://<github-username>.github.io/<repo-name>/product/#/products`
- Cart standalone: `https://<github-username>.github.io/<repo-name>/cart/#/cart`

Notes:

- If you use a branch other than `main`, update the branch trigger in `.github/workflows/deploy-pages.yml`.
- If you use a custom domain, define `PAGES_ORIGIN` and, if needed, `PAGES_BASE_PATH` in the workflow environment.

## Ports and URLs

- Shell: `http://localhost:3000`
- Product micro app: `http://localhost:3001/products`
- Cart micro app: `http://localhost:3002/cart`

## Module Federation Setup

- `apps/shell/webpack.config.js`: defines `name: "shell"` and registers `product` and `cart` as remotes.
- `apps/product/webpack.config.js`: defines `name: "product"` and exposes `./App` as a remote module.
- `apps/cart/webpack.config.js`: defines `name: "cart"` and exposes `./App` as a remote module.
- All apps share `react`, `react-dom`, `react-router-dom`, `@mf-demo/shared`, and `@mf-demo/ui-kit` as singletons.

## Event Bus Flow

```text
Product remote
  -> eventBus.emit('cart:add-item', payload)

Cart remote
  -> eventBus.on('cart:add-item', handler)
  -> own cart store updates
  -> eventBus.emit('cart:count-updated', { count })

Shell header
  -> eventBus.on('cart:count-updated', handler)
  -> updates cart badge
```

## Tech Stack

- React 18
- TypeScript
- Webpack 5 + Module Federation Plugin
- React Router v6
- npm Workspaces
- Tailwind CSS
