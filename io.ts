import { osEOL } from './misc.ts'
import { readStringDelim } from './deps.ts'

export const readLine = async (
  reader: Deno.Reader = Deno.stdin
): Promise<string> => (await readStringDelim(reader, osEOL).next()).value

export const writeStdout = async (input: string) =>
  Deno.stdout.write(new TextEncoder().encode(input))

export const writeStdoutSync = (input: string) =>
  Deno.stdout.writeSync(new TextEncoder().encode(input))
