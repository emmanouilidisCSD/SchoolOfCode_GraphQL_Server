const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const schema =  require('./graphql/queries.js');
const app=express();
console.log(typeof graphqlHTTP);
app.use('/graphql',graphqlHTTP({schema: schema.schema, graphiql: true}));

app.listen(4000, () => { 
    console.log("Running a GraphQL server on http://localhost:4000.");
});
