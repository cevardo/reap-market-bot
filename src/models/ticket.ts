import { DataTypes, Model } from 'sequelize'
import { sequelize } from './../database/db'

export class Ticket extends Model {
  id!: number
  channelId!: string
  guildId!: string
  resolved!: boolean
  closedMessageId!: string
  author!: string

  // timestamps!
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export const initTicket = (): Model => {
  return Ticket.init({
    id: {
      type: DataTypes.INTEGER,
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
}

