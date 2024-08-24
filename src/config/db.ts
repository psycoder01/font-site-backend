import dotenv from 'dotenv';
import { Sequelize } from 'sequelize';

dotenv.config();

const { MYSQL_USER = '', MYSQL_PASSWORD = '', MYSQL_DB = '', MYSQL_HOST = '' } = process.env;

export const sequelize = new Sequelize(MYSQL_DB, MYSQL_USER, MYSQL_PASSWORD, {
    host: MYSQL_HOST,
    dialect: 'mysql',
});

sequelize.sync({
    alter: true,
});
