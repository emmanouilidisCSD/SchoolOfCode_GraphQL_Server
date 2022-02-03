const { resolve } = require("path/posix");
const { dataSources } = require("../../dataSource/index.js");

module.exports = {
    Query: {
        getSalesmanByID: (parent, args, context, info) => {
            return dataSources.salesmanData.getSalesmanByID(args.salesmanID);
        },
        getAllSalesmen: (parent, args, context, info) => {
            return dataSources.salesmanData.getSalesmen();
        },

    },
    Salesman: {
        carsSold: (parent) => {
            let cars = [];
            return new Promise((resolve) => {
                let numOfPendingPromises = 0;
                dataSources.invoiceData.getInvoicesBySalesmanID(parent.salesmanID).then((invoices) => {
                    for (let invoice of invoices) {
                        numOfPendingPromises++;
                        dataSources.carData.getCar(invoice.carID).then((car) => {
                            cars.push(car);
                            numOfPendingPromises--;
                            if (numOfPendingPromises == 0) {
                                resolve(cars);
                            }
                        });
                    }
                });
            });
        }
    }
};