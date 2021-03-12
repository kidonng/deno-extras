export type Env = {
  (): Record<string, string>
} & Record<string, string>

export const env = new Proxy((() => Deno.env.toObject()) as Env, {
  get: (_t, p: string) => Deno.env.get(p),
  set(_t, p: string, v) {
    Deno.env.set(p, v)
    return true
  },
  deleteProperty(_t, p: string) {
    Deno.env.delete(p)
    return true
  },
})
