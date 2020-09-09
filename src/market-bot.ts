require('dotenv').config()

import { Client, Message, GuildMember, TextChannel } from 'discord.js'
import { discordClient } from './client'
import { sequelize } from './database/db'
import { Ticket, Tab, initTicket, initTab, initRole, MarketRole } from './models'
import { config } from './config'
import { emojiCharacters } from './emojiCharacters'

const db = sequelize

async function start() {

  const client: Client = await discordClient()

  client.once('ready', () => {
    console.log(client.user?.username + ' is READY for business.')
    db.authenticate()
      .then(async () => {
        console.log('Connected to database.')
        initTicket()
        initTab()
        initRole()
        await Ticket.sync()
        await Tab.sync()
        await MarketRole.sync()
      })
      .catch(err => console.log(err))
  })

  client.on('message', async (message: Message) => {

    if (message.author.bot || message.channel.type === 'dm') return

    const guild = await message.guild!.fetch()
    const marketCategory = guild.channels.cache.find(channel => channel.id === config.marketCategoryId)

    // TODO: Make this listener into a SWITCH control
    // Create separate modules for each command

    if (message.content.toLowerCase() === '?tab' && isValidShopper(message.member!)) {
      try {
        // TODO:
        // Create a single tab for each user. Do not open duplicate tabs.
        // Append new orders to existing tab.
        // Create a command to list open orders in a user's tab.

        console.log('Cheking tab for ' + message.author.username)
        const tab = await Tab.findOne({ where: { ownerId: message.author.id } })
          .catch(err => console.log(err))

        if (tab) {
          message.channel.send('You have an open Tab! Go buy stuff!')
          // TODO: Print out user's current tab of opened tickets
          return

        }
        else {
          const fetchMsg = await message.channel.messages.fetch(message.id)

          console.log(marketCategory)
          if (!fetchMsg || !marketCategory) {
            throw 'Invalid fields!'
          }
          else {
            // TODO: Get these from roles table
            const roles = '751441844637794354, 751960815359229953, 751961192565571634'.split(/,\s*/)
            console.log(roles)
            for (const roleId of roles) {
              if (!guild.roles.cache.get(roleId)) throw new Error('Role does not exist!')
            }

            await Tab.create({
              messageId: message.id,
              guildId: message.guild!.id,
              roles: JSON.stringify(roles),
              parentId: marketCategory.id,
              ownerId: message.author.id,
              ownerName: message.author.username,
              open: true,
            })

            message.channel.send('Opened a new Tab for ' + message.author.username)
            await fetchMsg.react(emojiCharacters.tab).catch(err => console.log(err))
          }
        }
      }
      catch (err) {
        message.channel.send('You lack permissions to do perform this action!')
        throw new Error(err)
      }
    }
  })

  client.on('messageReactionAdd', async (reaction, user) => {
    if (user.bot) return

    if(reaction.emoji.name === emojiCharacters.tab) {
      const tab = await Tab.findOne({ where: { messageId: reaction.message.id } })

      if (tab) {
        const findTicket = await Tab.findOne({ where: { authorId: user.id, resolved: false } })

        if (findTicket) {
          console.log('An open ticket already exists!')

        }
        else {
          console.log('Creating ticket!')

          const roleIdString: string = tab.getDataValue('roles')
          console.log(roleIdString)
          const roleIds = JSON.parse(roleIdString)

          const permissions = roleIds.map((id: string) => { return { allow: 'VIEW_CHANNEL', id } })

          const channel = await reaction.message.guild!.channels.create('ticket', {
            parent: tab.getDataValue('parentId'),
            permissionOverwrites: [
              { deny: 'VIEW_CHANNEL', id: reaction.message.guild!.id },
              { allow: 'VIEW_CHANNEL', id: user.id },
              ...permissions,
            ],
          })

          const msg = await channel.send('React to this message to close the ticket!')
          await msg.react('\:lock:')

          const ticket = await Ticket.create({
            authorId: user.id,
            channelId: channel.id,
            guildId: reaction.message.guild!.id,
            resolved: false,
            closedMessageId: msg.id,
          })

          const ticketId = String(ticket.getDataValue('ticketId').padStart(4, 0))
          await channel.edit({ name: `ticket=${ticketId}` })

        }
      }
      else {
        console.log('No ticket found with ID: ' + reaction.message.id)
      }
    }
    else if (reaction.emoji.name === '\:lock:') {
      const ticket = await Ticket.findOne({ where: { channelId: reaction.message.channel.id } })
      if (ticket) {
        const closedMessageId = ticket.getDataValue('closedMessageId')
        if (reaction.message.id === closedMessageId) {
          console.log('Closing ticket...')
          const channel = reaction.message.channel as TextChannel
          await channel.updateOverwrite(ticket.getDataValue('authorId'), {
            VIEW_CHANNEL: false,
          }).catch(err => { throw err})
          ticket.resolved = true
          await ticket.save()
          console.log('Updated ticket!')
        }
      }
    }
  })
}

process.on('unhandledRejection', error => console.error('Uncaught Promise Rejection', error))

// async function getFirstMessageContent(message: Message): Promise<string> {
//   const filter = (m: Message) => m.author.id === message.author.id
//   // const finalMessage = (await message.channel.awaitMessages(filter, { max: 1 })).first()!
//   const finalMessage = await message.channel.awaitMessages(filter, { max: 1 })
//     .then(successResponse => {
//       return successResponse.first()!.content
//     },
//     (rejectResponse) => {
//       console.log(rejectResponse)
//       return rejectResponse
//     })
//     .catch(error => console.log(error))

//   return finalMessage
// }

function isValidShopper(member: GuildMember) {
  return member.roles.cache.some(role => role.name === 'market-shopper') ? true : false
}
start()