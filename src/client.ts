import { Client } from 'discord.js'
import { config } from './config'

export const discordClient = async (): Promise<Client> => {
  const client: Client = new Client({ partials: ['MESSAGE', 'REACTION'] }) // Instantiate the Discord Client.
  await client.login(config.token).catch(error => { console.log(error) })

  return client
}
