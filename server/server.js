import express from "express";
import cors from "cors";
import materialsRouter from "./routes/Materials.js";

// import the router from your routes file

const PORT = process.env.PORT || 3000;

const app = express();
app.use(cors());

app.use(express.json());

// specify the api path for the server to use
app.use("/api", materialsRouter);

app.listen(PORT, () => {
  console.log(`server listening on http://localhost:${PORT}`);
});
