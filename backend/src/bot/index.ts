import { Context } from '../types'

import { Client, Intents } from 'discord.js'

export default async function initBot (ctx: Context) {
  const client = new Client({
    intents: new Intents([
      Intents.FLAGS.GUILDS,
      Intents.FLAGS.GUILD_MESSAGES
    ])
  })

  client.on('ready', () => {
    ctx.logger.info('Bot', `Started Bot as @${client.user.username}#${client.user.discriminator}.`)
  })

  client.login(ctx.config.DISCORD_BOT_TOKEN)

  return client
}
