import assert from "node:assert/strict";
import test from "node:test";
import { runInNewContext } from "node:vm";
import { renderToStaticMarkup } from "react-dom/server";
import { BootScript } from "../components/BootScript";

const html = renderToStaticMarkup(<BootScript />);
const script = html.replace(/^<script>/, "").replace(/<\/script>$/, "");

for (const { cookie, systemDark, expectedTheme, expectedLang } of [
  { cookie: "", systemDark: true, expectedTheme: "dark", expectedLang: "en" },
  { cookie: "", systemDark: false, expectedTheme: "light", expectedLang: "en" },
  { cookie: "lodgetrack_theme=LIGHT", systemDark: true, expectedTheme: "light", expectedLang: "en" },
  { cookie: "other=value; lodgetrack_theme=DARK; lodgetrack_locale=sr", systemDark: false, expectedTheme: "dark", expectedLang: "sr" },
]) {
  test(`boot script preserves preferences: ${cookie || `system dark=${systemDark}`}`, () => {
    const classes = new Set<string>();
    const root = {
      classList: {
        toggle(name: string, enabled: boolean) {
          if (enabled) classes.add(name);
          else classes.delete(name);
        },
      },
      dataset: {} as Record<string, string>,
      style: {} as Record<string, string>,
      lang: "en",
    };
    runInNewContext(script, {
      document: { cookie, documentElement: root },
      window: { matchMedia: () => ({ matches: systemDark }) },
    });
    assert.deepEqual([...classes], [expectedTheme]);
    assert.equal(root.dataset.theme, expectedTheme);
    assert.equal(root.style.colorScheme, expectedTheme);
    assert.equal(root.lang, expectedLang);
  });
}

test("boot script tolerates blocked cookie access", () => {
  assert.doesNotThrow(() => runInNewContext(script, {
    document: {
      documentElement: {},
      get cookie() { throw new Error("Cookies blocked"); },
    },
  }));
});
