const { signup, login, signout } = require('../utilities/auth');
const { getAll, getById, insert } = require('../models/blogs');
const db = require('../database/index');
const { AuthenticationError, ValidationError } = require('apollo-server-express');
const { ValidationContext } = require('graphql');

const resolvers = {
    Query: {
        hello: async function(root, {}, { user }) {
            return 'hello';
        },
        getAllBlogs: async function(root, {}, { user }) {
            let blogs = await getAll();
            return blogs;
        },
        getBlogById: async function(root, { blogId }, { user }) {
            let blog = await getById(blogId);
            return blog;
        },
        getUserId: async function(root, { }, { user }) {
            return user.id ? user.id : null;
        }
    },
    Mutation: {
        register: async function(root, { email, password, username, name }, { user }) {
            let obj = await signup(email, password);
            if(!obj)
              return {uid: '', email: '', username: null, name: null};
            let res = {
                uid: obj.user.uid,
                email: email,
                phoneNumber: obj.user.phoneNumber,
                displayName: obj.user.displayName
            };
            await db.collection('users').doc().create({
                uid: res.uid,
                email: email,
                username: username,
                name: name
            });
            return res;
        },
        login: async function(root, { email, password }, { user }) {
            let obj = await login(email, password);
            if(!obj)
              return {uid: '', email: '', username: null, name: null};
            let res = {
                uid: obj.user.uid,
                email: email,
                phoneNumber: obj.user.phoneNumber,
                displayName: obj.user.displayName
            };
            return res;
        },
        logout: async function(root, {}, { user }) {
            await signout();
            return 'Success';
        },
        insertBlog: async function(root, {title, content, description, imageUrl}, { user }) {
            if(!user.id)
                return new AuthenticationError('Unauthorized!');
            else {
                let blog = await insert({
                    title: title,
                    content: content, 
                    description: description,
                    imageUrl: imageUrl,
                    user_id: user.id
                });
                return blog;
            }
        }
    }
};

module.exports = resolvers;