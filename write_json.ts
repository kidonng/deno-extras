export interface WriteJsonOptions extends Deno.WriteFileOptions {
  replacer?: (
    this: any,
    key: string,
    value: any
  ) => any | (number | string)[] | null
  space?: string | number
}

/** Asynchronously writes an object to a JSON file */
export async function writeJson(
  path: string | URL,
  data: any,
  options: WriteJsonOptions = {}
): Promise<void> {
  const { replacer, space, ...writeOptions } = options
  await Deno.writeTextFile(
    path,
    JSON.stringify(data, replacer, space),
    writeOptions
  )
}

/** Writes an object to a JSON file */
export function writeJsonSync(
  path: string | URL,
  data: any,
  options: WriteJsonOptions = {}
): void {
  const { replacer, space, ...writeOptions } = options
  Deno.writeTextFileSync(
    path,
    JSON.stringify(data, replacer, space),
    writeOptions
  )
}
