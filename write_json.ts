export interface WriteJsonOptions extends Deno.WriteFileOptions {
  replacer?: (
    this: any,
    key: string,
    value: any
  ) => any | (number | string)[] | null
  space?: string | number
}

export const writeJson = async (
  path: string | URL,
  data: any,
  options: WriteJsonOptions = {}
): Promise<void> => {
  const { replacer, space, ...writeOptions } = options
  await Deno.writeTextFile(
    path,
    JSON.stringify(data, replacer, space),
    writeOptions
  )
}

export const writeJsonSync = (
  path: string | URL,
  data: any,
  options: WriteJsonOptions = {}
): void => {
  const { replacer, space, ...writeOptions } = options
  Deno.writeTextFileSync(
    path,
    JSON.stringify(data, replacer, space),
    writeOptions
  )
}
