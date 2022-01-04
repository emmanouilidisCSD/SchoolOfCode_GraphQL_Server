const path = require('path');
const sqlite3 = require('@louislam/sqlite3');

const { CarData } = require("./CarData.js");
const { SalesmanData } = require("./SalesmanData.js");
const { InvoiceData } = require("./InvoiceData.js");


const dbpath = path.resolve() + "/data/dealership.db";
db = new sqlite3.Database(dbpath, sqlite3.OPEN_READONLY);

exports.dataSources = {
    carData: new CarData(db),
    salesmanData: new SalesmanData(db),
    invoiceData: new InvoiceData(db),
};