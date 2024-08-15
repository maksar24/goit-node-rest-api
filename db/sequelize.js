import { Sequelize } from "sequelize";

const { DB_DIALECT, DB_USER, DB_NAME, DB_PASSWORD, DB_HOST, DB_PORT } =
  process.env;

const sequelize = new Sequelize({
  dialect: DB_DIALECT,
  username: DB_USER,
  database: DB_NAME,
  password: DB_PASSWORD,
  host: DB_HOST,
  port: DB_PORT,
  dialectOptions: {
    ssl: true,
  },
});

export default sequelize;
