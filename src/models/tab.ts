import { Model, DataTypes } from 'sequelize'
import { sequelize } from '../database/db'

export class Tab extends Model {
  id?: number
  messageId!: string
  guildId!: string
  roles!: string[]
  parentId!: string
  ownerId!: string
  ownerName!: string
  open!: boolean

  // timestamps!
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export const initTab = (): Model => {
  return Tab.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    messageId: {
      type: DataTypes.STRING,
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
    ownerId: {
      type: DataTypes.STRING,
    },
    ownerName: {
      type: DataTypes.STRING,
    },
    open: {
      type: DataTypes.BOOLEAN,
    },
  }, {
    tableName: 'tabs',
    sequelize,
  })
}

// TODO: Make associations to tickets table