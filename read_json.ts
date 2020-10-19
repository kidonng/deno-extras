export const readJson = async <T = unknown>(path: string | URL): Promise<T> =>
  JSON.parse(await Deno.readTextFile(path))

export const readJsonSync = <T = unknown>(path: string | URL): T =>
  JSON.parse(Deno.readTextFileSync(path))
