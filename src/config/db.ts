import dotenv from 'dotenv';
import { Sequelize } from 'sequelize';

dotenv.config();

const { MYSQL_USER = '', MYSQL_PASSWORD = '', MYSQL_DB = '' } = process.env;

export const sequelize = new Sequelize(MYSQL_DB, MYSQL_USER, MYSQL_PASSWORD, {
  dialect: 'mysql',
});

sequelize.sync({
  alter: true,
});
