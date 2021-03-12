import { assertEquals } from 'https://deno.land/std@0.90.0/testing/asserts.ts'
import { run } from './run.ts'

Deno.test('run', async () => {
  const filename = 'test'
  const tmp = await run.stdout('mktemp', '-d')
  const { code } = await run('touch', `${tmp}/${filename}`)
  const files = await run.stdout('ls', tmp)
  const err = await run.stderr('echo')

  assertEquals(code, 0)
  assertEquals(files, filename)
  assertEquals(err, '')
})
