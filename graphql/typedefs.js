const path = require("path");
const { loadFilesSync } = require("@graphql-tools/load-files");
const { mergeTypeDefs } = require("@graphql-tools/merge");

const typeDefsDir = path.resolve() + '/graphql/typedefs';
const typesArray = loadFilesSync(typeDefsDir);
//Δημιουργία των type definitions για τα Car και Salesman graphql objects
exports.typeDefs = mergeTypeDefs(typesArray);