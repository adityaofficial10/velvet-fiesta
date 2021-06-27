const { gql } = require('apollo-server')


const typeDefs = gql`
    type User {
        uid: String!
        email: String!
        phoneNumber: String
        displayName: String
    }
    type Blog{
        blog_id: String!
        title: String
        content: String
        description: String
        user_id: String!
        image_url: String
    }
    type Query{
        hello: String
        getAllBlogs: [Blog!]
        getBlogById(blogId: String!): Blog!
        getUserId: String
    }
    type Mutation{
        register(email: String!, password: String!, username: String, name: String): User!
        login(email: String!, password: String!): User!
        logout: String!
        insertBlog(title: String, content: String, description: String, imageUrl: String): Blog!
    }
`

module.exports = typeDefs;