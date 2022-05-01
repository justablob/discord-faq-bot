import { Config } from './config'
import { Logger } from './logger'
import { Client } from 'discord.js'
import { Application } from 'express'
import { Server } from 'http'

export interface Context {
  config: Config
  logger: Logger,

  bot: Client,
  application: Application,
  server: Server
}
