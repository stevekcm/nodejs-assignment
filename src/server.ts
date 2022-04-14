import http from "http";
import app from "./app";
import mongoose from "mongoose";

const server = http.createServer(app);
const port = process.env.PORT || "3000";
app.set("port", port);

// avoid the 304 response from json GET request
app.set("etag", false);

const onError = (error: NodeJS.ErrnoException) => {
  if (error.syscall !== "listen") {
    throw error;
  }

  const bind = typeof port === "string" ? "Pipe " + port : "Port " + port;

  // handle specific listen errors
  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges");
      process.exit(1);
    case "EADDRINUSE":
      console.error(bind + " is already in use");
      process.exit(1);
    default:
      throw error;
  }
};

const getConnection = () => {
  if (process.env.NODE_ENV.trim() === "development") return process.env.DB_DEV;
  else if (process.env.NODE_ENV.trim() === "test") return process.env.DB_TEST;
  else if (process.env.NODE_ENV.trim() === "production")
    return process.env.DB_PROD;
};

//Connect Mongo
mongoose.Promise = global.Promise;
const uri = getConnection();
const mongoPromise = mongoose.connect(uri);

mongoPromise.then(
  () => {
    console.log("Connected to Database");
  },
  (err: Error) => {
    console.log("Failed to connect database: ", err);
    process.exit(1);
  }
);

server.listen(port);
server.on("error", onError);
server.address();

console.log("Service is listening on " + port);
