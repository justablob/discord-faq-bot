import { Context } from '../types'

import createExpress from 'express'

export default async function initApi (ctx: Context) {
  const express = createExpress()

  const server = express.listen(ctx.config.API_PORT, ctx.config.API_HOST, () => {
    ctx.logger.info('API', `Started HTTP server on http://${ctx.config.API_HOST}:${ctx.config.API_PORT}${ctx.config.API_BASE}.`)
  })

  return {
    application: express,
    server: server
  }
}
