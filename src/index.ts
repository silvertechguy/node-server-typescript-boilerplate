import "dotenv-safe/config";
import { __prod__ } from "./constants";
import express, { Express } from "express";
import mongoose from "mongoose";
import cors from "cors";
import todoRoutes from "./routes";

const main = async () => {
  const uri: string = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@clustertodo.raz9g.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`;
  mongoose.set("useFindAndModify", false);
  mongoose
    .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log(`Database Connected`))
    .catch((error) => {
      throw error;
    });

  const app: Express = express();

  app.set("trust proxy", 1);
  app.use(
    cors({
      origin: process.env.CORS_ORIGIN,
      credentials: true,
    })
  );
  app.use(todoRoutes);

  const PORT: string | number = parseInt(process.env.PORT) || 4000;

  app.listen(PORT, () => {
    console.log(`server started on localhost:${PORT}`);
  });
};

main().catch((err) => {
  console.error(err);
});
