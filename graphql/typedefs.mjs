import path from "path";
import { loadFilesSync } from "@graphql-tools/load-files";
import { mergeTypeDefs } from "@graphql-tools/merge"

const typeDefsDir = path.resolve() + '/graphql/typedefs';
const typesArray = loadFilesSync(typeDefsDir);

const mergedTypeDefs = mergeTypeDefs(typesArray);
console.log(mergedTypeDefs);
export {mergeTypeDefs};