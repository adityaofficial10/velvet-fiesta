const { gql } = require('apollo-server')


const typeDefs = gql`
    type Query{
        hello: String
    }
    type User {
        uid: String!
        email: String!
        phoneNumber: String
        displayName: String
    }
    type Mutation{
        register(email: String!, password: String!): User!
        login(email: String!, password: String!): User!
        logout: String!
    }
`

module.exports = typeDefs;