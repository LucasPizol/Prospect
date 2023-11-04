import express from "express";
import cors from "cors";
import { router } from "./routes";

const app = express();

app.use(cors());

app.use(express.json());
app.use(express.static("public"));
app.use(router);

const PORT = process.env.PORT || 3000;

app.listen(PORT, async () => {
  console.log("Server started sucessfully");
});
