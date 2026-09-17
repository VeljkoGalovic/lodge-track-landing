import assert from "node:assert/strict";
import test from "node:test";
import { renderToStaticMarkup } from "react-dom/server";
import Home from "../app/page";

const html = renderToStaticMarkup(<Home />);

test("pre-launch purchase CTAs are disabled, not signup or checkout links", () => {
  const buttons = [...html.matchAll(/<button\b([^>]*)>/g)].map(([, a]) => a);
  const ctas = buttons.filter((a) => !a.includes('aria-label="Toggle menu"'));
  assert.ok(ctas.length >= 4, "expected launch CTAs in header, hero and pricing");
  for (const attributes of ctas) assert.match(attributes, /\bdisabled=/);
  assert.doesNotMatch(html, /href="\/(?:dashboard|login|signin|register|api|onboarding|invite)(?:[/?#"])/);
});

test("footer navigation points to legal pages instead of empty anchors", () => {
  const footer = html.match(/<footer\b[\s\S]*?<\/footer>/)?.[0];
  assert.ok(footer);
  assert.match(footer, /href="\/terms"/);
  assert.match(footer, /href="\/privacy"/);
  assert.match(footer, /href="\/contact"/);
  assert.doesNotMatch(footer, /href="#"/);
});

test("launch status and product previews are visible together", () => {
  assert.match(html, /Work in Progress/);
  assert.match(html, /under active development/);
  assert.match(html, /subject to change/i);
  assert.match(html, /id="features"/);
  assert.match(html, /id="pricing"/);
  assert.match(html, /LodgeTrack — Dashboard/);
  assert.match(html, /sample data/i);
});
