# Content Update Guide

This document explains how to update show listings, bio content, and other site data without touching component code.

## Where Content Lives

All editable content is stored in JSON files under `src/data/`:

| File | Purpose |
|------|---------|
| `src/data/shows.json` | Show listings displayed on the home page |
| `src/data/content.json` | Bio text, stats, social links, press quotes, About IGL copy |
| `src/data/states-cities.json` | State/City dropdown options for forms |

## Updating Shows

1. Open `src/data/shows.json`
2. Add, edit, or remove show objects. Each show follows this structure:

```json
{
  "id": "unique-slug",
  "name": "Show Name",
  "date": "YYYY-MM-DD",
  "time": "HH:MM",
  "venue": "Venue Name",
  "city": "City Name",
  "type": "Stand-up or Taping",
  "description": "Short description",
  "price": "₹X – ₹Y",
  "status": "On Sale | Coming Soon | Sold Out"
}
```

3. Save the file
4. Commit and push to trigger redeploy (Vercel/Netlify will auto-deploy)

## Updating Bio / Quotes / About IGL

1. Open `src/data/content.json`
2. Edit the relevant sections:
   - `bio.paragraphs` — Bio text paragraphs
   - `bio.stats` — Stat cards (label + value)
   - `bio.socials` — Social media links
   - `aboutIGL.body` — About page copy (preserve Hinglish tone)
   - `aboutIGL.rules` — Rules & Guidelines list
   - `quotes` — Press quote cards

3. Save and redeploy

## Updating States/Cities

1. Open `src/data/states-cities.json`
2. Add or remove states and their cities
3. Save and redeploy

## Important Notes

- **No code changes needed** — editing JSON files is sufficient
- The site is statically generated, so changes require a redeploy
- On Vercel: push to main branch auto-triggers deployment
- On Netlify: push to main branch auto-triggers deployment
- Always validate JSON syntax before committing (use a JSON validator)
