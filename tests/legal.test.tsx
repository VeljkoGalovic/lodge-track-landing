import assert from "node:assert/strict";
import test from "node:test";
import { renderToStaticMarkup } from "react-dom/server";
import TermsPage from "../app/terms/page";
import PrivacyPage from "../app/privacy/page";
import ContactPage from "../app/contact/page";

for (const [name, Page, heading] of [
  ["terms", TermsPage, "Terms of Service"],
  ["privacy", PrivacyPage, "Privacy Policy"],
  ["contact", ContactPage, "Contact &amp; Support"],
] as const) {
  test(`${name} page renders with pre-launch notice and support contact`, () => {
    const html = renderToStaticMarkup(<Page />);
    assert.match(html, new RegExp(heading));
    assert.match(html, /pre-launch/i);
    assert.match(html, /href="\/"/);
  });
}

test("every legal page exposes the same support email address", () => {
  for (const Page of [TermsPage, PrivacyPage, ContactPage]) {
    const html = renderToStaticMarkup(<Page />);
    assert.match(html, /mailto:support@lodgetrack\.com/);
  }
});
