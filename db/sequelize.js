import { Sequelize } from "sequelize";

const sequelize = new Sequelize({
  dialect: "postgres",
  username: "maksym",
  database: "db_contacts_j20x",
  password: "Dc5h9ejccHfCjjJ3PiyvqhPJ1jDTAsDx",
  host: "dpg-cqmkteggph6c739s9f1g-a.frankfurt-postgres.render.com",
  port: "5432",
  dialectOptions: {
    ssl: true,
  },
});

export default sequelize;
