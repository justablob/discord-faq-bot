import { Context } from '../types'

import { Router } from 'express'

type RouteHandler = (router: Router, ctx: Context) => any | Promise<any>
type RouterFactory = (ctx: Context) => Promise<[string, Router]>

export default function createRouter (base = '/', handler: RouteHandler): RouterFactory {
  return async ctx => {
    const router = Router()
    await handler(router, ctx)

    ctx.logger.debug('API', `Initialized '${base}' router.`)

    return [base, router]
  }
}
