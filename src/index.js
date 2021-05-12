const { ApolloServer, gql } = require('apollo-server');
const dotenv = require('dotenv');
const {MongoClient} = require('mongodb');

const {DB_URI, DB_NAME} = process.env;

dotenv.config();


  

const typeDefs = gql`
  
    type User {
        id: ID!
        name: String!
        email!
        avatar!
    }

`;

const resolvers = {
    
  };

const start = async () => {

    const {DB_URI, DB_NAME} = process.env;
    const client = new MongoClient(DB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    await client.connect();
    const db = client.db(DB_NAME);

    const context = {
        db,
    }

}
    

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({ typeDefs, resolvers });

// The `listen` method launches a web server.
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});

start();