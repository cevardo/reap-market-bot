import { Sequelize } from 'sequelize'
import { config } from '../config'

export const sequelize = new Sequelize(config.dbName, config.dbUser, config.dbPassword, {
  dialect: 'mysql',
  host: process.env.dbHost,
  port: 3306,
})