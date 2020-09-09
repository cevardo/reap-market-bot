import { DataTypes, Model } from 'sequelize'
import { sequelize } from '../database/db'

export class MarketRole extends Model {
  public id!: number
  public role!: string
  public description!: string

  // timestamps!
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export const initRole = (): Model => {
  return MarketRole.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    role: {
      type: DataTypes.STRING,
    },
    description: {
      type: DataTypes.STRING,
    },
  }, {
    tableName: 'roles',
    sequelize,
  })
}