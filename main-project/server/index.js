import { ApolloServer } from "apollo-server-express";
import mongoose from "mongoose";
import { typeDefs } from "./typeDefs/typeDefs.js";
import { resolvers } from "./resolvers/resolvers.js";
import express from "express";
import fileUpload from "express-fileupload";
import cors from "cors";
import jwt from "jsonwebtoken";
import bodyParser from "body-parser";
import morgan from "morgan";
import * as path from "path";
import { dirname } from "path";
import { fileURLToPath } from "url";
import { fileController } from "./constrollers/FileController.js";
import dotenv from "dotenv";
dotenv.config();

const JWTSECRET = process.env.JWTSECRET || "nnamdi";
const DB_PORT = process.env.DB_PORT || 27017;
const SERVER_PORT = process.env.SERVER_PORT || 4000;

const getUser = (token) => {
  try {
    if (token) {
      return jwt.verify(token, JWTSECRET);
    }
    return null;
  } catch (error) {
    return null;
  }
};

const __dirname = dirname(fileURLToPath(import.meta.url));

async function main() {
  await mongoose.connect(`mongodb://localhost:${DB_PORT}/test`);
}

mongoose.connection.once("open", () =>
  console.log(`Connected to mongo on port ${DB_PORT}`)
);

main().catch((err) => console.log(err));

const app = express();
app.use("/", express.static(path.join(__dirname, "static")));
app.use("/avatars", express.static(path.join(__dirname, "files/avatars"))); 
app.use("/films", express.static(path.join(__dirname, "files/films"))); 
app.use("/books", express.static(path.join(__dirname, "files/books"))); 
app.use("/albums", express.static(path.join(__dirname, "files/albums"))); 
app.use(
  fileUpload({
    createParentPath: true,
  })
);
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("dev"));

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req, res }) => {
    const token = req.headers.authorization || "";
    const user = getUser(token.replace("JWT ", ""));
    return { user };
  },
});

await server.start();

server.applyMiddleware({ app });

app.listen({ port: SERVER_PORT }, () =>
  console.log(
    `🚀 Server ready at http://localhost:${SERVER_PORT}${server.graphqlPath}`
  )
);

app.post("/avatar", fileController.uploadAvatar);
app.post("/films", fileController.uploadFilmLogo);
app.post("/books", fileController.uploadBookLogo);
app.post("/albums", fileController.uploadAlbumLogo);
