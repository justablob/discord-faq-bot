import config from './config'
import logger from './logger'

import api from './api'
import bot from './bot'

import { Context } from './types'

import pkg from '../package.json'

async function init () {
  const ctx: Context = {} as any

  ctx.config = config()
  ctx.logger = logger(ctx.config)

  ctx.logger.info(undefined, `Starting ${pkg.name}@${pkg.version} in ${ctx.config.NODE_ENV} mode...`)

  if (ctx.config.DISCORD_BOT_TOKEN) {
    ctx.bot = await bot(ctx)
  } else {
    ctx.logger.warning('Bot', 'DISCORD_BOT_TOKEN not passed, skipping Bot initialization.')
  }

  if (ctx.config.API_PORT) {
    const web = await api(ctx)
    ctx.application = web.application
    ctx.server = web.server
  } else {
    ctx.logger.warning('API', 'API_PORT not passed, skipping API initialization.')
  }
}

init()
