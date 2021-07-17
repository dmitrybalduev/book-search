// import the gql tagged template function
const { gql } = require('apollo-server-express');

const typeDefs = gql`

type User {
    _id: ID!
    username: String!
    email: String!
    password: String!
    bookCount: Int
    savedBooks: [Book]
  }

type Query {
    me: User
  }
type Mutation {
    
}
type Auth {
    token: ID!
    user: User
  }
`;



// export the typeDefs
module.exports = typeDefs;