import express from "express";
import cors from "cors";
import session from "express-session";
import dotenv from "dotenv";
import UserRoute from "./routes/UserRoute.js";
import ProductRoute from "./routes/ProductRoute.js";
dotenv.config();

// app
const app = express();

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

// port
const port = process.env.APP_PORT;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
