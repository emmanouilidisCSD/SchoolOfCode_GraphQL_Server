import  express from 'express';
import { graphqlHTTP } from 'express-graphql';
import { graphql } from 'graphql';
import schema   from './graphql/queries.mjs';
import { mergeTypeDefs } from './graphql/typedefs.mjs';

const app=express();




console.log(typeof graphqlHTTP);
const graphQLPath='/graphql';
const graphQLPort=4000;
app.use(graphQLPath,graphqlHTTP({schema: schema.schema, graphiql: true}));

app.listen(graphQLPort, () => { 
    console.log(`Running a GraphQL server on http://localhost:${graphQLPort}${graphQLPath}.`);
});
