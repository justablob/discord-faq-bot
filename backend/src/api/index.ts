import createService from '../createService'

import createExpress, { Router } from 'express'

import requestLogger from './requestLogger'

import index from './routers'

export default createService(async (ctx) => {
  const express = createExpress()
  const baseRouter = Router()

  express.set('trust proxy', ctx.config.API_PROXIES)

  baseRouter.use(requestLogger(ctx))

  baseRouter.use(...await index(ctx))

  express.use(ctx.config.API_BASE, baseRouter)

  const server = express.listen(ctx.config.API_PORT, ctx.config.API_HOST, () => {
    ctx.logger.info('API', `Started HTTP server on http://${ctx.config.API_HOST}:${ctx.config.API_PORT}${ctx.config.API_BASE}.`)
  })

  return {
    application: express,
    server: server
  }
})
