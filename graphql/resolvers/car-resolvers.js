const { dataSources } = require("../../dataSource/index.js");

module.exports = {
    Query: {
        car: (parent, args, context, info) => {
            return dataSources.carData.getCar(args.carID)
        },
        cars: (parent, args, context, info) => {
            return dataSources.carData.getCars()
        }
    },
    Car: {
        carID(parent, args) {
            return parent.carID;
        },
        MANUFACTURER(parent, args) {
            return parent.MANUFACTURER;
        },
        MODEL(parent, args) {
            return parent.MODEL;
        },
        COLOR(parent, args) {
            return parent.COLOR;
        },
        YEAR_OF_MANUFACTURE(parent, args) {
            return parent.YEAR_OF_MANUFACTURE;
        },
        VIN(parent, args) {
            return parent.VIN;
        },
        FOR_SALE(parent, args) {
            return parent.FOR_SALE;
        }
    }
};