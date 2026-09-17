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

test("image-backed sections contain their negative background layers", () => {
  for (const id of ["hero", "features", "about"]) {
    const section = html.match(new RegExp(`<section id="${id}" class="([^"]+)"`));
    assert.ok(section, `expected ${id} section`);
    assert.ok(section[1].split(" ").includes("isolate"), `${id} must isolate its background layers`);
  }
});

test("footer content stays centered across breakpoints", () => {
  const footer = html.match(/<footer\b[\s\S]*?<\/footer>/)?.[0];
  assert.ok(footer);
  assert.match(footer, /<footer class="[^"]*\btext-center\b/);
  assert.match(footer, /md:grid-cols-3/);
  assert.doesNotMatch(footer, /lg:grid-cols-6|justify-between|md:flex-row/);
});

test("header centers desktop navigation without sign-in text", () => {
  const header = html.match(/<header\b[\s\S]*?<\/header>/)?.[0];
  assert.ok(header);
  assert.doesNotMatch(header, /sign in/i);
  assert.match(header, /md:grid-cols-\[1fr_auto_1fr\]/);
  assert.match(header, /md:justify-self-end/);
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
