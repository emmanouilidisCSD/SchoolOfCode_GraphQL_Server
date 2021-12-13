const graphql = require("graphql");
const sqlite3 = require('sqlite3').verbose();
const dbpath="./data/dealership.db";
const path = require('path');
console.log(__filename);
console.log(path.resolve(dbpath));
const db = new sqlite3.Database(dbpath,sqlite3.OPEN_READONLY);

const CarType = new graphql.GraphQLObjectType({
    name: "Car",
    fields: {
       carID: { type: graphql.GraphQLID },
       MANUFACTURER: { type: graphql.GraphQLString },
       MODEL: { type: graphql.GraphQLString },
       COLOR: { type: graphql.GraphQLString },
       YEAR_OF_MANUFACTURE: { type:  graphql.GraphQLInt},
       VIN: {type: graphql.GraphQLString },
       FOR_SALE: {type: graphql.GraphQLBoolean}
    }
});

let queryType = new graphql.GraphQLObjectType({
    name: 'Query',
    fields: {
        Cars: {
            type: graphql.GraphQLList(CarType),
            resolve: (root, args, context, info) => {
                return new Promise((resolve, reject) => {
                    // raw SQLite query to select from table
                    db.all("SELECT * FROM CAR;", function(err, rows) {  
                        if(err){
                            reject([]);
                        }
                        resolve(rows);
                    });
                });
            }
        }
    }
});


const schema = new graphql.GraphQLSchema({
    query: queryType
});

//export schema to use on index.js
module.exports = {
    schema
}
