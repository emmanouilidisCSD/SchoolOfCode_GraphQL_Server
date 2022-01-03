const path = require ("path");
const { loadFilesSync } = require ("@graphql-tools/load-files");
const { mergeResolvers } = require ("@graphql-tools/merge");

const resolverDefsDir = path.resolve() + '/graphql/resolvers';
const resolversArray = loadFilesSync(resolverDefsDir);
const resolverDefs = mergeResolvers(resolversArray);
console.log("------------------resolversArray-------------------");
console.log(resolversArray);
console.log("------------------resolversArray-------------------");

exports.resolverDefs = resolverDefs;