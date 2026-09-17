# LodgeTrack — pre-launch landing page

This repository currently hosts a static "Work in Progress / Launching Soon"
page for LodgeTrack, built with Next.js (App Router)
and Tailwind CSS. It exists so the domain can pass merchant verification while
the product is still under active development.

The page deliberately shows what the product will do — features, pricing
preview, and a dashboard mockup built with sample data — while making three
things unmistakable to a reviewer:

- no accounts can be created and no purchases can be made yet (every CTA is
  disabled);
- the pricing shown is illustrative and subject to change before launch;
- there is a real way to reach us: the footer and the `/contact`,
  `/terms`, and `/privacy` pages all point at a support inbox.

## Development

```bash
npm install
npm run dev     # http://localhost:3000
npm run test    # server-rendered assertions for the pre-launch contract
npm run build   # production build
```

## Before public launch

- Confirm incoming mail reaches `support@lodgetrack.com`, the support inbox
  shared by the footer and all three legal pages.
- Replace the placeholder terms and privacy text in `app/terms`, `app/privacy`
  with reviewed legal copy.
- Re-introduce the application (dashboard, auth, database, billing) — it was
  removed from this temporary page and can be recovered from the initial
  commit (`24b6dcb`).
