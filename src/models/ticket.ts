import { DataTypes, Model } from 'sequelize'
import { sequelize } from './../database/db';

export class Ticket extends Model {
  public messageId!: string
  public guildId!: string
  public roles!: string[]
  public parentId!: string
  
  // timestamps!
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Ticket.init({
  ticketId: {
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