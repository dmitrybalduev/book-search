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

type Book {
    bookId: String
    authors: [String]
    description: String!
    image: String
    link: String
    title: String!
}

input savedBook {
    description: String
    title: String
    bookId: String
    image: String
    link: String
    authors: [String]
}

type Query {
    me: User
}

type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
}

type Auth {
    token: ID!
    user: User
  }
`;



// export the typeDefs
module.exports = typeDefs;