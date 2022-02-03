import "dotenv/config";
import express from "express";
import cors from "cors";
import helmet from "helmet";

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "*",
  })
);
app.use(helmet());

app.get("/", (req, res) => {
  res.status(200).json({
    message: "Hello World",
  });
});

const port = process.env.PORT || 5009;
app.listen(port, () => {
  console.log(`Aplicativo iniciado na porta ${port}`);
});
