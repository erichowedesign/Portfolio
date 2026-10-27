export const ACCESS_COOKIE = "portfolio_access";
export const ACCESS_MAX_AGE = 60 * 60 * 24 * 30;

/**
 * Value stored in the access cookie. Derived from the password so that
 * changing PROTECTED_PASSWORD signs everyone out. Returns null when no
 * password is configured, which keeps protected pages locked.
 */
export async function accessToken(password: string | undefined): Promise<string | null> {
  if (!password) return null;
  const data = new TextEncoder().encode(`portfolio-access:${password}`);
  const digest = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(digest), (b) => b.toString(16).padStart(2, "0")).join("");
}

export const PROTECTED_PREFIXES = ["/nike"];

export function isProtectedPath(path: string): boolean {
  return PROTECTED_PREFIXES.some((prefix) => path === prefix || path.startsWith(`${prefix}/`));
}

/** Only redirect back to protected pages on this site after unlocking. */
export function safeNextPath(value: unknown): string {
  return typeof value === "string" && isProtectedPath(value) ? value : PROTECTED_PREFIXES[0];
}
