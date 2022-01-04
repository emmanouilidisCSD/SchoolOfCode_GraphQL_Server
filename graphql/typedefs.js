const path = require("path");
const { loadFilesSync } = require("@graphql-tools/load-files");
const { mergeTypeDefs } = require("@graphql-tools/merge");

const typeDefsDir = path.resolve() + '/graphql/typedefs';
const typesArray = loadFilesSync(typeDefsDir);

exports.typeDefs = mergeTypeDefs(typesArray);