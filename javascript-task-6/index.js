import { ApolloServer } from '@apollo/server';
import mongoose from 'mongoose';
import { startStandaloneServer } from '@apollo/server/standalone';
import { typeDefs } from './typeDefs/typeDefs.js'
import { resolvers } from './resolvers/resolvers.js'

const DB_PORT = 27017;

async function main() {
  await mongoose.connect(`mongodb://localhost:${DB_PORT}/test`);
}

mongoose.connection.once('open', () => console.log(`Connected to mongo on  port ${DB_PORT}`));

main().catch(err => console.log(err));

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
});

console.log(`🚀  Server ready at: ${url}`);