export interface RunOptions extends Omit<Deno.RunOptions, 'cmd'> {
  shell?: string
}

/**
 * Deno.run with shortcuts
 *
 * ```ts
 * const status1 = await run('echo', 'hello', 'world')
 * console.log({ status1 })
 *
 * const status2 = await run(['echo', 'hello', 'world']).status()
 * console.log({ status2 })
 *
 * const status3 = await run(['echo', '$HOME'], { shell: 'bash' }).status()
 * console.log({ status3 })
 * ```
 *
 * Output:
 *
 * ```
 * hello world
 * { status1: { success: true, code: 0 } }
 * hello world
 * { status2: { success: true, code: 0 } }
 * /Users/kid
 * { status3: { success: true, code: 0 } }
 * ```
 *  */
export function run(
  file: string | URL,
  ...args: string[]
): Promise<Deno.ProcessStatus>
export function run<T extends RunOptions>(
  cmd: Deno.RunOptions['cmd'],
  opt?: T
): Deno.Process<T & { cmd: Deno.RunOptions['cmd'] }>
export function run<T extends RunOptions>(
  fileOrCmd: string | URL | Deno.RunOptions['cmd'],
  opt?: T,
  ...args: string[]
):
  | Promise<Deno.ProcessStatus>
  | Deno.Process<T & { cmd: Deno.RunOptions['cmd'] }> {
  if (Array.isArray(fileOrCmd)) {
    return Deno.run({
      cmd: opt?.shell ? [opt.shell, '-c', fileOrCmd.join(' ')] : fileOrCmd,
      ...opt,
    })
  } else {
    return Deno.run({
      cmd: [fileOrCmd, opt, ...args] as Deno.RunOptions['cmd'],
    }).status()
  }
}
