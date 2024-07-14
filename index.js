import express from "express";
import cors from "cors";
import session from "express-session";
import dotenv from "dotenv";
import db from "./config/Database.js";
import SequelizeStore from "connect-session-sequelize";
import UserRoute from "./routes/UserRoute.js";
import ProductRoute from "./routes/ProductRoute.js";
import AuthRoute from "./routes/AuthRoute.js";
dotenv.config();

// app
const app = express();

// generate Session to database
const sessionStore = SequelizeStore(session.Store);
const store = new sessionStore({
  db: db,
});

// cors
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

// session
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: store,
    cookie: {
      secure: "auto",
    },
  })
);

// body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes
app.use(UserRoute);
app.use(ProductRoute);
app.use(AuthRoute);

//store.sync();

// port
const port = process.env.APP_PORT;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
