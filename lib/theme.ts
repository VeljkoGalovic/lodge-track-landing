/**
 * Theme preference: what the visitor *chose*, not what is currently painted.
 *
 * The application this token layer once served has been stripped for the
 * pre-launch site; the marketing pages are a fixed dark brand experience, so
 * this file now only carries the cookie name the boot script reads and clears.
 * The enum that lived in prisma/schema.prisma is gone with the database.
 */
export const THEMES = ["SYSTEM", "LIGHT", "DARK"] as const

export type ThemePreference = (typeof THEMES)[number]

/** Holds the member's choice between requests. Not a secret, so not httpOnly. */
export const THEME_COOKIE = "lodgetrack_theme"

/**
 * Readable by the blocking script in the document head, which is the whole point
 * — the theme has to be applied before the first paint, and a script cannot read
 * an httpOnly cookie.
 */
export const THEME_COOKIE_OPTIONS = {
  path: "/",
  sameSite: "lax",
  httpOnly: false,
  maxAge: 60 * 60 * 24 * 365,
  secure: process.env.NODE_ENV === "production",
} as const

export const DEFAULT_THEME: ThemePreference = "SYSTEM"

export function isThemePreference(value: string): value is ThemePreference {
  return (THEMES as readonly string[]).includes(value)
}

/**
 * Reads a raw cookie value into a preference, falling back to SYSTEM.
 *
 * SYSTEM is the safe fallback in both directions: for a value that is missing and
 * one that is garbage. Defaulting to LIGHT or DARK would impose one member's
 * choice on a device whose operating system disagrees.
 */
export function parseThemePreference(raw: string | undefined | null): ThemePreference {
  return raw && isThemePreference(raw) ? raw : DEFAULT_THEME
}

/** Tailwind's `dark:` variant and the token layer both key off this class. */
export function themeClassName(preference: ThemePreference, systemPrefersDark: boolean): "dark" | "light" {
  if (preference === "SYSTEM") return systemPrefersDark ? "dark" : "light"
  return preference === "DARK" ? "dark" : "light"
}
