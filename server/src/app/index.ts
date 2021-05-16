import MikroConnection from "../data/mikroOrm/MikroConnection";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import PostRepository from "./resolver/PostRepository";
import GraphQlContext from "./resolver/GraphQlContext";
import Argon2Adapter from "./Argon2Adapter";
import RedisInstaller from "../data/redis/RedisInstaller";
import dotenv from "dotenv";

dotenv.config();

const main = async () => {
  const hasher = new Argon2Adapter();
  const db = new MikroConnection();
  const orm = await db.Install();
  const sessionInstaller = new RedisInstaller();

  const apollo = new ApolloServer({
    schema: await buildSchema({
      resolvers: [PostRepository /*, UserRepository*/],
      validate: false,
    }),
    context: () => new GraphQlContext(orm.em, hasher),
  });

  const app = express();
  sessionInstaller.Init(app, process.env.SESSION_SECRET, process.env.SESSION_DB_PASSWORD);
  apollo.applyMiddleware({ app });
  app.listen(process.env.PORT);
  console.log("Started");
};

main().catch((e) => console.error(e));
