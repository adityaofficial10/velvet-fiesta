require('dotenv').config();
// Deployed Link: "https://velvet-gql.as.r.appspot.com"
const express = require('express');
const { ApolloServer, schema } = require('apollo-server-express');
const http = require('http');
const path = require('path');

const app = express();
const httpServer = http.createServer(app);
const io = require('socket.io')(httpServer);


io.on('connection', (socket) => {
    console.log('new client connected');
    console.log(socket);
    socket.emit('connection', null);
});

//app.use('/',require('./utilities/auth'));

const typeDefs = require('./graphql/schema');
const resolvers = require('./graphql/resolvers');

const {getCurrentUser, firebase} = require('./utilities/auth');

const server = new ApolloServer({
    typeDefs,
    resolvers,
    introspection: true,
    playground: true,
    context: ({ req, res }) => {
        let user = {};
        firebase.auth().onAuthStateChanged((userObj) => {
            if (userObj) {
              user.id = userObj.uid;
              user.email = userObj.email;
              console.log(user);
            } else {
              console.log("No user logged in!");
            }
        });
        return { user };
    }
});

server.applyMiddleware({
    app,
    path: '/',
    cors: {
        credentials: true,
        origin: '5000'
    }
});



httpServer.listen({
    port: process.env.PORT || 8080
}, () => console.log(`Server running on port ${server.graphqlPath}`));
