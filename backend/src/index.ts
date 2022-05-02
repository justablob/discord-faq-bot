import initConfig from './config'
import initApi from './api'

import { Context } from './types'
import initLogger from "./logger"

import pkg from '../package.json'
import initBot from './bot'

async function init () {
  const ctx: Context = {} as any

  ctx.config = initConfig()
  ctx.logger = initLogger(ctx)

  ctx.logger.info(undefined, `Starting ${pkg.name}@${pkg.version} in ${ctx.config.NODE_ENV} mode...`)

  if (ctx.config.DISCORD_BOT_TOKEN) {
    ctx.bot = await initBot(ctx)
  } else {
    ctx.logger.warning('Bot', 'DISCORD_BOT_TOKEN not passed, skipping Bot initialization.')
  }

  if (ctx.config.API_PORT) {
    const web = await initApi(ctx)
    ctx.application = web.application
    ctx.server = web.server
  } else {
    ctx.logger.warning('API', 'API_PORT not passed, skipping API initialization.')
  }
}

init()
