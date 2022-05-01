import initConfig from './config'
import initApi from './api'

import { Context } from './types'
import initLogger from "./logger"

async function init () {
  const ctx: Context = {} as any

  const config = ctx.config = initConfig()
  const logger = ctx.logger = initLogger(ctx)

  const web = await initApi(ctx)
  ctx.application = web.application
  ctx.server = web.server
}

init()
