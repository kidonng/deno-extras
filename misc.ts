import { EOL } from './deps.ts'

export const osEOL: EOL = Deno.build.os === 'windows' ? EOL.CRLF : EOL.LF

export type RunOptions = Pick<Deno.RunOptions, 'cmd' | 'cwd' | 'env'>

export const run = async (
  options: RunOptions | RunOptions['cmd']
): Promise<void> => {
  const { stdout } = Deno.run({
    ...(Array.isArray(options) ? { cmd: options } : options),
    stdout: 'piped',
  })
  const iter = Deno.iter(stdout)

  for await (const chunk of iter) {
    Deno.stdout.writeSync(chunk)
  }
}
