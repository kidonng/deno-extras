export type RunOptions = Pick<Deno.RunOptions, 'cmd' | 'cwd' | 'env'>

/** Asynchronously runs a command and pipes to `Deno.stdout` */
export async function run(
  options: RunOptions | RunOptions['cmd']
): Promise<void> {
  const { stdout } = Deno.run({
    ...(Array.isArray(options) ? { cmd: options } : options),
    stdout: 'piped',
  })
  const iter = Deno.iter(stdout)

  for await (const chunk of iter) {
    Deno.stdout.writeSync(chunk)
  }
}
