require("dotenv").config();

const express = require("express");
const path = require("path");
const app = express();
const cookieParser = require("cookie-parser");

const { restrictUser, checkAuth } = require("./middlewares/auth");

const PORT = process.env.PORT || 3000;

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

const apiRoutes = require("./routers/new");
const staticRoutes = require("./routers/staticRoutes");
const userRoutes = require("./routers/user");

app.use(express.static(path.join(process.cwd(), "public"))); // process.cwd() -> root, public
app.use("/api/v1", restrictUser, apiRoutes);
app.use("/", checkAuth, staticRoutes);
app.use("/user", userRoutes);

const dbConnection = require("./config/dbConnect");
dbConnection();

app.listen(PORT, () => {
  console.log("Server started");
});
