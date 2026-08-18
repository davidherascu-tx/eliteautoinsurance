/**
 * Reads a deployment variable. A hosting dashboard stores exactly what was
 * pasted into it, so a value still carrying the quotes that dotenv strips from
 * a local .env file arrives with them intact, and keys often carry whitespace.
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
