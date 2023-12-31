const dotenv = require('dotenv');
dotenv.config();

module.exports = {
  development: {
    dialect: 'postgres',
    host: process.env.POSTGRES_HOST,
    port: Number(process.env.POSTGRES_PORT),
    username: process.env.POSTGRES_USER,
    password: String(process.env.POSTGRES_PASSWORD),
    database: process.env.POSTGRES_DB,
  },
  production: {
    dialect: 'postgres',
    host: process.env.POSTGRES_HOST,
    port: Number(process.env.POSTGRES_PORT),
    username: process.env.POSTGRES_USER,
    password: String(process.env.POSTGRES_PASSWORD),
    database: process.env.POSTGRES_DB,
  },
};
