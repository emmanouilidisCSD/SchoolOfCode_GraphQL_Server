const path = require("path");
const { loadFilesSync } = require("@graphql-tools/load-files");
const { mergeResolvers } = require("@graphql-tools/merge");

const resolverDefsDir = path.resolve() + '/graphql/resolvers';
const resolversArray = loadFilesSync(resolverDefsDir);

//Δημιουργία των resolvers για τα queries και mutations των Car και Salesman
exports.resolverDefs = mergeResolvers(resolversArray);