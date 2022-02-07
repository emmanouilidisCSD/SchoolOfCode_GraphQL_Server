const { typeDefs } = require("./typedefs.js");
const { resolverDefs } = require("./resolvers.js");

//Δημιουργία του schema που περιέχει τις δηλώσεις των αντικειμένων και τις υλοποιήσεις των ερωτημάτων
exports.schema = {
    typeDefs,
    resolverDefs
};
