const sqlite3 = require('@louislam/sqlite3');

exports.InvoiceData = class InvoiceData {
    constructor(database) {
        this.db = database;
    }

    getInvoices() {
        return new Promise((resolve, reject) => {
            this.db.all("SELECT * FROM INVOICE;", function (err, rows) {
                if (err) {
                    reject([]);
                }
                resolve(rows);
            });
        });
    }


    getInvoicesBySalesmanID(salesmanID) {
        return new Promise((resolve, reject) => {
            this.db.all(`SELECT * FROM INVOICE WHERE INVOICE.salesmanID = ${salesmanID};`, function (err, rows) {
                if (err) {
                    reject([]);
                }
                resolve(rows);
            });
        });
    }

    getInvoicesByClientID(clientID) {
        return new Promise((resolve, reject) => {
            this.db.all(`SELECT * FROM INVOICE WHERE INVOICE.clientID = ${clientID};`, function (err, rows) {
                if (err) {
                    reject([]);
                }
                resolve(rows);
            });
        });
    }

    getInvoicesByCarID(carID) {
        return new Promise((resolve, reject) => {
            this.db.all(`SELECT * FROM INVOICE WHERE INVOICE.carID = ${carID};`, function (err, rows) {
                if (err) {
                    reject([]);
                }
                resolve(rows);
            });
        });
    }
}