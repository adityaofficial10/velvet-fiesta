const resolvers = {
    Query: {
        hello: async function(root, {}, { user }) {
            return 'hello';
        }
    }
};

module.exports = resolvers;