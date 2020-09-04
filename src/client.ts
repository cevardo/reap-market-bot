import { Client } from 'discord.js'
import { config } from './config'

export const discordClient = async (): Promise<Client> => {
  const client: Client = new Client({ partials: ['MESSAGE', 'REACTION'] }) // Instantiate the Discord Client.
  await client.login(config.token)
    .then(() => {
      console.log(client.user?.username + ' has logged in.')
    }, ()=> {
      console.log(client.user?.username + ' has FAILED logged in.')
    })
    .catch(error => { console.log(error) })

  return client
}
