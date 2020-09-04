import { sequelize } from '../database'
import { DataTypes, Model } from 'sequelize'

export class Ticket extends Model {
  public messageId!: string
  public guildId!: string
  public roles!: string[]
  public parentId!: string
}

Ticket.init({
  ticketId: {
    type: DataTypes.STRING,
    autoIncrement: true,
    primaryKey: true,
  },
  channelId: {
    type: DataTypes.STRING,
  },
  guildId: {
    type: DataTypes.STRING,
  },
  resolved: {
    type: DataTypes.BOOLEAN,
  },
  closedMessageId: {
    type: DataTypes.STRING,
  },
  author: {
    type: DataTypes.STRING,
  },
}, {
  tableName: 'tickets',
  sequelize,
})
