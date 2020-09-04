import { sequelize } from '../database'
import { DataTypes, Model } from 'sequelize'

export class TicketConfig extends Model {
  public messageId!: string
  public guildId!: string
  public roles!: string[]
  public parentId!: string

}

TicketConfig.init({
  messageId: {
    type: DataTypes.STRING,
    primaryKey: true,
  },
  guildId: {
    type: DataTypes.STRING,
  },
  roles: {
    type: DataTypes.STRING,
  },
  parentId: {
    type: DataTypes.STRING,
  },
}, {
  tableName: 'ticketConfigs',
  sequelize,
})
