import { BufReader } from './deps.ts'

/** Reads a single line from a Reader, defaults to `Deno.stdin` */
export async function readLine(
  reader: Deno.Reader = Deno.stdin
): Promise<string> {
  const result = await new BufReader(reader).readLine()
  return result ? new TextDecoder().decode(result.line) : ''
}

/** Asynchronously writes a string to a Writer, defaults to `Deno.stdout` */
export async function writeString(
  input: string,
  writer: Deno.Writer = Deno.stdout
): Promise<number> {
  return writer.write(new TextEncoder().encode(input))
}

/** Writes a string to a WriterSync, defaults to `Deno.stdout` */
export function writeStringSync(
  input: string,
  writer: Deno.WriterSync = Deno.stdout
): number {
  return writer.writeSync(new TextEncoder().encode(input))
}
