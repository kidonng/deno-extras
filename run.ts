export type cmd = Deno.RunOptions['cmd']

function decode(input: BufferSource) {
  return new TextDecoder().decode(input).trim()
}

/**
 * Deno.run with shortcuts
 *
 * ```ts
 * const { success, code, signal, rid, pid } = await run('echo', 'foo')
 * const stdout = await run.stdout('echo', 'bar')
 * const stderr = await run.stderr('echo', 'baz')
 * ```
 */
export async function run(...cmd: cmd) {
  const process = Deno.run({ cmd })
  const status = await process.status()
  process.close()
  return { ...process, ...status }
}

run.stdout = async function (...cmd: cmd) {
  const process = Deno.run({
    cmd,
    stdout: 'piped',
  })
  const output = await process.output()
  process.close()
  return decode(output)
}

run.stderr = async function (...cmd: cmd) {
  const process = Deno.run({
    cmd,
    stderr: 'piped',
  })
  const stderrOutput = await process.stderrOutput()
  process.close()
  return decode(stderrOutput)
}
