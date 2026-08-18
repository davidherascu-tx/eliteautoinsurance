/**
 * Reads a deployment variable. A hosting dashboard stores exactly what was
 * pasted into it, so a value copied out of .env.example arrives still wrapped
 * in the quotes dotenv strips locally, and pasted keys often carry whitespace.
 */
export function readEnv(name: string) {
  const raw = process.env[name];
  if (!raw) return undefined;

  const value = raw
    .trim()
    .replace(/^["']/, "")
    .replace(/["']$/, "")
    .trim();

  return value === "" ? undefined : value;
}
