const app = require("./app");
const connectDatabase = require("./config/database");

connectDatabase();

app.listen(process.env.PORT, () => {
  console.log(
    `My Server listening to the port: ${process.env.PORT} in  ${process.env.NODE_ENV} `
  );
});

process.on("unhandledRejection", (err) => {
  console.log(`Error: ${err.message}`);
  console.log("Shutting down the server due to unhandled rejection error");
});

process.on("uncaughtException", (err) => {
  console.log(`Error: ${err.message}`);
  console.log("Shutting down the server due to uncaught exception error");
});
