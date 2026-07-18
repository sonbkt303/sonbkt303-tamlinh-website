# Tam Linh Website

Landing page for **Tam Linh** — tombstone engraving & sandblasting equipment workshop in Hanoi.

Built with **Next.js 15+**, **TypeScript**, **Tailwind CSS v4**, and **next-intl** (Vietnamese default + English).

## Quick start

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) (Vietnamese) or [http://localhost:3000/en](http://localhost:3000/en) (English).

## Project structure

```
app/[locale]/          # Localized routes (vi default, en prefixed)
components/            # UI, layout, homepage sections
content/blog/          # MDX blog posts (vi/ and en/)
lib/
  site-config.ts       # Brand info — edit here to change name, phone, address
  i18n/                # next-intl routing & request config
  data/                # Products, machines, news, navigation
messages/              # UI translations (vi.json, en.json)
```

## Maintain brand info

Edit a single file: [`lib/site-config.ts`](lib/site-config.ts)

```typescript
export const siteConfig = {
  name: "Tam Linh",
  phone: ["0399 833 888", "0399 383 888"],
  // ...
};
```

## Add blog posts

Create MDX files in:

- `content/blog/vi/your-post.mdx`
- `content/blog/en/your-post-en.mdx`

Frontmatter example:

```yaml
---
title: "Your title"
locale: vi
slug: your-slug
alternateSlug: english-slug
date: "2026-06-09"
excerpt: "Short summary"
tags: ["bia-mộ"]
---
```

## Deploy to Vercel

1. Push to GitHub
2. Import project on [Vercel](https://vercel.com)
3. Set environment variable: `NEXT_PUBLIC_SITE_URL=https://your-domain.com`
4. Deploy

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Development server |
| `npm run build` | Production build |
| `npm run start` | Start production server |
| `npm run lint` | ESLint |

## Locales & URLs

| Vietnamese (default) | English |
|---------------------|---------|
| `/` | `/en` |
| `/gioi-thieu` | `/en/about` |
| `/san-pham/bia-mo` | `/en/products/tombstones` |
| `/tin-tuc` | `/en/news` |

Language switcher in the header preserves the current page when switching locale.
