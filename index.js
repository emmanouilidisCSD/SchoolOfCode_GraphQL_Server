const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { schema } = require('./graphql/index.js');
const { graphql, buildSchema } = require('graphql');
const { makeExecutableSchema } = require('@graphql-tools/schema');
const { dataSources } = require('./dataSource/index');
const graphQLPath = '/graphql';
const graphQLPort = 4000;

const app = express();
const s = makeExecutableSchema({ typeDefs: schema.typeDefs, resolvers: schema.resolverDefs });
app.use(graphQLPath, graphqlHTTP({ schema: s, graphiql: true }));

app.listen(graphQLPort, () => {
    console.log(`Running a GraphQL server on http://localhost:${graphQLPort}${graphQLPath}.`);
});
