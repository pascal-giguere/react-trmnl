<img src="./doc/react-trmnl-logo.svg" alt="react-trmnl" width="400" />

Build React apps for [TRMNL](https://usetrmnl.com) e-ink devices.

_Currently in development_

[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](https://opensource.org/licenses/ISC)
[![npm version](https://img.shields.io/npm/v/react-trmnl)](https://www.npmjs.com/package/react-trmnl)
[![npm bundle size](https://img.shields.io/bundlephobia/minzip/react-trmnl)](https://bundlephobia.com/package/react-trmnl)

What’s included:

- ⚙️ **Custom React Renderer**
  - Natively render React components to 1-bit monochrome images, no browser required
  - Generate, encode and serve 1-bit BMP or PNG images from Node.js to TRMNL devices
- 🎨 **Rendering Utilities**
  - Colors – Easily apply dithered colors and patterns to your components
  - Images – Choose from a variety of dithering algorithms to display 1-bit images
  - Fonts – Use bitmap fonts optimized for low-resolution, 1-bit screens
- ⚛️ **Component library** (coming soon) – A set of pre-built components for common UI patterns
- 🌐 **Development Server** (coming soon) – A browser-based TRMNL emulator for development and testing

## Getting started

Install both `react-trmnl` and `react` as dependencies in your Node project:

```bash
npm install react react-trmnl
```

Then, create a React component that uses the `react-trmnl` renderer:

```tsx
// App.tsx
```

```tsx
// index.tsx
```

> [!TIP]
> For a complete example project, see the [example](./example) directory.

## How it works

TODO

## API

> [!WARNING]
> This project is in active development and is not yet ready for production use. Its API is not stable and may change frequently.

TODO

### Components

`<Trmnl>`

`<Box>`

`<Text>`

`<Image>`
