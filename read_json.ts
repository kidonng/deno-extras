/** Asynchronously reads a JSON file and then parses it into an object */
export async function readJson<T = unknown>(path: string | URL): Promise<T> {
  return JSON.parse(await Deno.readTextFile(path))
}

/** Reads a JSON file and then parses it into an object */
export function readJsonSync<T = unknown>(path: string | URL): T {
  return JSON.parse(Deno.readTextFileSync(path))
}
