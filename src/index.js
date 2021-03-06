const { ApolloServer, gql } = require('apollo-server');
const {MongoClient} = require('mongodb');
const dotenv = require('dotenv');
dotenv.config();

const { DB_URI, DB_NAME } = process.env;


const typeDefs = gql`
    type Query {
        myTaskLists: [TaskList!]!
    }

    type Mutation {
        signUp(input: SignUpInput): AuthUser!
        signIn(input: SignInInput): AuthUser!
    }

    input SignUpInput {
        email: String!
        password: String!
        name: String!
        avatar: String
    }

    input SignInInput {
        email: String!
        password: String!
    }

    type AuthUser {
        user: User! 
        token: String!
    }
  
    type User {
        id: ID!
        name: String!
        email: String!
        avatar: String!
    }

    type TaskList {
        id: ID!
        createdAt: String!
        title: String!
        progress: Float!

        users: [User!]!
        todos: [ToDo!]!
    }

    type ToDo {
        id: ID!
        content: String!
        isCompleted: Boolean!

        taskListId: ID!
        taskList: TaskList
    }

`;

const resolvers = {
    Query: {
        myTaskLists: () => []
    },
    Mutation: {
        signUp: (_, { input }) => {
            console.log(input)

        },
        signIn: () => {

        }
    }
    
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
const server = new ApolloServer({ typeDefs, resolvers});

// The `listen` method launches a web server.
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});

start();