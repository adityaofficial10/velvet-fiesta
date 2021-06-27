require('dotenv').config();
// Deployed Link: "https://velvet-gql.as.r.appspot.com/"
const express = require('express');
const { ApolloServer, schema } = require('apollo-server-express');
const http = require('http');
const path = require('path');
const cors = require('cors');
const db = require('./database/index');

const app = express();
const httpServer = http.createServer(app);

var corsOptions = {
    origin: 'http://www.celebrate-your-identity-with.tech/',
    optionsSuccessStatus: 200,
    // some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.use(cors(corsOptions));

//app.use('/',require('./utilities/auth'));

const typeDefs = require('./graphql/schema');
const resolvers = require('./graphql/resolvers');

const { getCurrentUser, firebase } = require('./utilities/auth');

const server = new ApolloServer({
    typeDefs,
    resolvers,
    introspection: true,
    playground: true,
    context: ({ req, res }) => {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Credentials', true);
        res.header(
            'Access-Control-Allow-Headers',
            'Origin, X-Requested-With, Content-Type, Accept',
        );
        let user = {};
        firebase.auth().onAuthStateChanged((userObj) => {
            if (userObj) {
                user.id = userObj.uid;
                user.email = userObj.email;
                console.log(user);
            } else {
                console.log("No user logged in!");
                user.id = null;
            }
        });
        return { user };
    }
});

app.get('/user', (req, res) => {
    firebase.auth().onAuthStateChanged(async (userObj) => {
        if (userObj) {
            let users = await db.collection('users').where('uid', '==', userObj.uid).get();
            let user = {};
            users.forEach((doc) => {
                user = doc.data();
            });
            res.send(user);
        } else {
            let user = {};
            console.log("No user logged in!");
            user.uid = null;
            res.send(user);
        }
    });
});

app.get('/getAllBlogs', async (req, res) => {
    const blog = db.collection('blogs');
    const data = await blog.get();
    let blogs = [];
    data.forEach(doc => {
        console.log(doc.id, '=>', doc.data());
        blogs.push(doc.data());
    });
    res.send(blogs);
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
