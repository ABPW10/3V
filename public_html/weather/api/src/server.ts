import express from 'express';
import { ModuleResolutionKind } from 'typescript';
const app = express();

const port = 8000;

import { routes } from "./routes/routes";

app.set("json spaces", 2);

app.use("/", routes);

app.listen(port, () => {
  console.log(`Server is running at ${port}`);
});

module.exports = app;