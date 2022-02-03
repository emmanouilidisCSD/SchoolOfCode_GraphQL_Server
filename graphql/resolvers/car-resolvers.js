const { dataSources } = require("../../dataSource/index.js");

module.exports = {
    Query: {
        getCarByID: (parent, args, context, info) => {
            return dataSources.carData.getCarByID(args.carID)
        },
        getAllCars: (parent, args, context, info) => {
            return dataSources.carData.getCars()
        }
    },
    Mutation: {
        createCar: (parent,args) => {
            return dataSources.carData.createCar(args);
        },
        updateCarByID: (parent,args) => {
            return dataSources.carData.updateCarByID(args.carID,args)
        },
        deleteCarByID: (parent,args,context,info) => {
            return dataSources.carData.deleteCarByID(args.carID);
        },
        delecteCarsBetweenIDs: (parent,args,context,info) => {
            return dataSources.carData.deleteCarBetweenIDs(args.minID,args.maxID);
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
        YEAR_OF_MAN(parent, args) {
            return parent.YEAR_OF_MAN;
        },
        VIN(parent, args) {
            return parent.VIN;
        },
        FOR_SALE(parent, args) {
            return parent.FOR_SALE;
        }
    }
};