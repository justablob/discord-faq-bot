import readEnvironment from 'envreader-ts'
import * as dotenv from 'dotenv'

dotenv.config()

class EnvironmentError extends Error {
  static verify <T extends Record<string, any>, K extends keyof T>(obj: T, key: K): void {
    if (typeof obj[key] === 'undefined') {
      throw new this(`Environment variable '${key}' was not provided.`)
    }
  }
}

export default function config () {
  let env = readEnvironment({
    NODE_ENV: 'development',
    MASTER_KEY: String,
    LOG_LEVEL: 'trace',

    API_PORT: 8001,
    API_HOST: '0.0.0.0',
    API_PROXIES: 'loopback',
    API_BASE: '/',

    DB_HOST: '127.0.0.1',
    DB_PORT: 5432,
    DB_NAME: String,
    DB_USER: 'postgres',
    DB_PASS: 'postgres',

    MS_HOST: '127.0.0.1',
    MS_PORT: 7700,
    MS_INDEX: String,
    MS_KEY: String,

    DISCORD_BOT_TOKEN: String,
    DISCORD_OAUTH2_ID: String,
    DISCORD_OAUTH2_SECRET: String
  }, process.env)

  EnvironmentError.verify(env, 'MASTER_KEY')

  return env
}

export type Config = ReturnType<typeof config>
