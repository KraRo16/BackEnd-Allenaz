const express = require("express");
const cookieparser = require("cookie-parser");
const cors = require("cors");
const app = express();
const logger = require("morgan");
// const formatsLogger = app.get("env") === "development" ? "dev" : "short";


// app.use(logger(formatsLogger));
app.use(cors());
app.use(cookieparser());
app.use(express.json());
app.use(express.static("public"));

//  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

//  app.use("/api/transactions", auth, transactionsRouter);

//  app.use("/api/users", usersRoutes);

//  app.use("/api/categories", categoriesRouter);

//  app.use("/api/statistics", statisticsRouter);

//  app.use("/api/auth", googleAuthRouter);

app.use((req, res, next) => {
  res.status(404).json({ message: "Not found" });
  next();
});
app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  console.log(err);
  res.status(status).json({ status, message });
});

module.exports = app;