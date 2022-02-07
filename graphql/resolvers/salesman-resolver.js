const { resolve } = require("path/posix");
const { dataSources } = require("../../dataSource/index.js");

module.exports = {
    
    Query: {
        //Επιστρέφει συγκεκριμένο Πωλητή
        getSalesmanByID: (parent, args, context, info) => {
            return dataSources.salesmanData.getSalesmanByID(args.salesmanID);
        },
        //Επιστρέφει όλους τους Πωλητές
        getAllSalesmen: (parent, args, context, info) => {
            return dataSources.salesmanData.getSalesmen();
        },

    },
    Salesman: {
        //Επιστρέφει τα αυτοκίνητα που πούλησε συγκεκριμένος πωλητής.
        carsSold: (parent) => {
            console.log(parent);
            return dataSources.salesmanData.getCarsSoldBySalesman(parent.salesmanID);
        }
    }
};