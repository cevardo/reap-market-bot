import { DataTypes, Model } from 'sequelize'
import { sequelize } from './../database/db';

export class TicketConfig extends Model {
  messageId!: string
  guildId!: string
  roles!: string[]
  parentId!: string

  // timestamps!
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
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
},
{
  tableName: 'ticketConfigs',
  sequelize,
})