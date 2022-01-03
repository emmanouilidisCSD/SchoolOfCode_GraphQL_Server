const { typeDefs  } = require ("./typedefs.js");
const { resolverDefs } = require ("./resolvers.js");
const { print,printSchema } = require ('graphql');

exports.schema = {
    typeDefs,
    resolverDefs
};
