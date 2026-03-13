# mf-enterprise-demo

[English](README.md) | **Türkçe**

Webpack 5 Module Federation tabanlı bu demo, shell container ile iki remote microfrontend (`product`, `cart`) üzerinden basit bir e-ticaret deneyimi gösterir. Tüm uygulamalar TypeScript ile yazıldı ve ortak tipler, event bus, UI bileşenleri workspaces altında toplandı.

## Ekran Görüntüsü

![mf-enterprise-demo ekran görüntüsü](docs/screenshot.png)

## Mimari Diyagram

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

## Kurulum ve Çalıştırma

```bash
npm install
npm run dev
```

Tek tek çalıştırmak için:

```bash
npm run dev -w apps/shell
npm run dev -w apps/product
npm run dev -w apps/cart
```

## GitHub Pages Deploy

Bu repo `main` branch'e push edildiğinde GitHub Actions ile otomatik olarak GitHub Pages'e deploy olacak. Workflow dosyası: `.github/workflows/deploy-pages.yml`

Pages build'ini lokalde almak için:

```bash
npm run build:pages
```

Üretilen statik artifact `dist-pages/` altına yazılır.

GitHub Pages üzerinde shell uygulaması `HashRouter` ile çalışır; bu sayede SPA route'ları için ek rewrite gerekmez. Beklenen URL formatı:

- Shell: [https://zaferayan.github.io/microfrontend-demo/#/products](https://zaferayan.github.io/microfrontend-demo/#/products)
- Product standalone: [https://zaferayan.github.io/microfrontend-demo/product/#/products](https://zaferayan.github.io/microfrontend-demo/product/#/products)
- Cart standalone: [https://zaferayan.github.io/microfrontend-demo/cart/#/cart](https://zaferayan.github.io/microfrontend-demo/cart/#/cart)

### Kendi GitHub Pages'ında Yayınlamak

Bu projeyi kendi hesabınızda yayınlamak için:

1. Repoyu kendi GitHub hesabınıza fork edin ya da yeni bir repo oluşturup kodu push edin.
2. Varsayılan branch'in `main` olduğundan emin olun.
3. GitHub'da `Settings > Pages > Build and deployment > Source` değerini `GitHub Actions` olarak seçin.
4. `main` branch'e push yapın.
5. `Actions` sekmesinde `Deploy GitHub Pages` workflow'unun başarıyla tamamlanmasını bekleyin.

Bu projede Pages URL'leri repo sahibi ve repo adından otomatik türetilir. Örnek:

- Shell: `https://<github-kullanıcı-adı>.github.io/<repo-adı>/#/products`
- Product standalone: `https://<github-kullanıcı-adı>.github.io/<repo-adı>/product/#/products`
- Cart standalone: `https://<github-kullanıcı-adı>.github.io/<repo-adı>/cart/#/cart`

Notlar:

- `main` yerine farklı bir branch kullanacaksanız `.github/workflows/deploy-pages.yml` içindeki branch tetikleyicisini güncelleyin.
- Custom domain kullanacaksanız workflow env tarafında `PAGES_ORIGIN` ve gerekiyorsa `PAGES_BASE_PATH` tanımlayın.

## Portlar ve URL'ler

- Shell: `http://localhost:3000`
- Product micro app: `http://localhost:3001/products`
- Cart micro app: `http://localhost:3002/cart`

## Module Federation Yapısı

- `apps/shell/webpack.config.js`: `name: "shell"`, `remotes` olarak `product` ve `cart` tanımlar.
- `apps/product/webpack.config.js`: `name: "product"`, `./App` remote modülünü expose eder.
- `apps/cart/webpack.config.js`: `name: "cart"`, `./App` remote modülünü expose eder.
- Tüm app'ler `react`, `react-dom`, `react-router-dom`, `@mf-demo/shared`, `@mf-demo/ui-kit` paketlerini `singleton` olarak share eder.

## Event Bus Akışı

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

## Teknoloji Stack

- React 18
- TypeScript
- Webpack 5 + Module Federation Plugin
- React Router v6
- npm Workspaces
- Tailwind CSS
