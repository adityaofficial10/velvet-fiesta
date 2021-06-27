const db = require('../database/index');
const { v4 } = require('uuid');

module.exports = {
    insert: async function (data) {
        let id = v4();
        data.blog_id = id;
        const ans = db.collection('blogs').doc();
        await ans.set(data);
        return data;
    },
    getAll: async function () {
        const blog = db.collection('blogs');
        const res = await blog.get();
        let blogs = [];
        res.forEach(doc => {
            console.log(doc.id, '=>', doc.data());
            blogs.push(doc.data());
        });
        return blogs;
    },
    getById: async function(blogId) {
        let blogs = await db.collection('blogs').where('blog_id', '==', blogId).get();
        let blog = {};
        blogs.forEach((doc) => {
            blog = doc.data();
        });
        return blog;
    }
};