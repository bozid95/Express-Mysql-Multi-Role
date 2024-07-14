import { Sequelize } from "sequelize";

import dotenv from "dotenv";
dotenv.config();

//connection to database
const db = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: "mysql",
  }
);

//test connection
db.authenticate()
  .then(() => {
    console.log("Database Connection has been established successfully.");
  })
  .catch((error) => {
    console.error("Unable to connect to the database:", error);
  });

//generate table
// (async () => {
//   await db.sync();
// })();

//generate table session

export default db;

