const { signup, login, signout } = require('../utilities/auth');

const resolvers = {
    Query: {
        hello: async function(root, {}, { user }) {
            return 'hello';
        }
    },
    Mutation: {
        register: async function(root, { email, password }, { user }) {
            let obj = await signup(email, password);
            let res = {
                uid: obj.user.uid,
                email: email,
                phoneNumber: obj.user.phoneNumber,
                displayName: obj.user.displayName
            };
            return res;
        },
        login: async function(root, { email, password }, { user }) {
            let obj = await login(email, password);
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
        }
    }
};

module.exports = resolvers;
