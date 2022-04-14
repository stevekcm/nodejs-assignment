import express from "express";
import helmet from "helmet";
import notFoundHandler from "./handlers/notFoundHandler";
import exceptionHandler from "./handlers/exceptionHandler";
import routes from "./routes";

const app = express();

app.disable("x-powered-by");

app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//register the routes with
app.use("/", routes);

// catch 404
app.use(notFoundHandler);

// catch global error
app.use(exceptionHandler);

export default app;
