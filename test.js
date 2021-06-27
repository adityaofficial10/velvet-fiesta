/*const apolloClient = require('socket.io-client');

let socket = apolloClient('https://velvet-gql.as.r.appspot.com');

socket.on('connection', () => {
    console.log("Success!");
});*/

const { login, signup, signout, getCurrentUser } = require('./utilities/auth');

/*login('adityalm1@gmail.com', '123456').then((res) => {
    console.log(res.user);
});*/

/*getCurrentUser().then((user) => {
    console.log(user);
});*/
const { insert, getAll, getById } = require('./models/blogs');

getById('xcfdinfcsoincposnc3').then((blogs) => {
    console.log(blogs);
});