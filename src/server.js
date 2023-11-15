import express from "express";
import cors from "cors";
import route from "./modules/app.module.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/", route);

const port = 7777;

app.listen(port, () => {
  console.log(`server running on port: http://localhost:${port}`);
});
