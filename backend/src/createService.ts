import { Context } from './types'

type Promisify<T> = T extends Promise<infer P> ? Promise<P> : Promise<T>

export default function createService <T = any> (service: (ctx: Context) => T): (ctx: Context) => Promisify<T> {
  return (
    async ctx => {
      return await service(ctx)
    }
  ) as any
}
