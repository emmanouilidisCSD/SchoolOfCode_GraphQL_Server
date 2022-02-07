const sqlite3 = require('@louislam/sqlite3');

exports.SalesmanData = class SalesmanData {
    constructor(database) {
        this.db = database;
    }

    getSalesmen() {
        return new Promise((resolve, reject) => {
            this.db.all("SELECT * FROM SALESMAN;", function (err, rows) {
                if (err) {
                    reject([]);
                }
                resolve(rows);
            });
        });
    }

    getSalesmanByID(id) {
        return new Promise((resolve, reject) => {
            this.db.all(`SELECT * FROM SALESMAN WHERE salesmanID = ${id};`, function (err, rows) {
                if (err) {
                    reject([]);
                }
                if (rows.length == 0) {
                    rows.push(
                        {
                            salesmanID: -1,
                            NAME: `Couldn't find salesman with id ${id}`,
                            SURNAME: `Couldn't find salesman with id ${id}`,
                        });
                }
                resolve(rows[0]);
            });
        });
    }

    getCarsSoldBySalesman(id) {
        return new Promise((resolve, reject) => {
            let query = `SELECT DISTINCT Car.carID,CAR.COLOR,CAR.FOR_SALE,CAR.MANUFACTURER,CAR.MODEL,CAR.USED,CAR.VIN,CAR.YEAR_OF_MAN
            FROM INVOICE JOIN CAR on INVOICE.carID = CAR.carID
            WHERE INVOICE.salesmanID = ${id};`;
            console.log(query);
            this.db.all(query, function (err, rows) {
                if (err) {
                    reject([]);
                }
                if (rows.length == 0) {
                    rows.push({
                        carID: -1,
                        MANUFACTURER: `No cars found for salesman with id ${id}`,
                        MODEL: `No cars found for salesman with id ${id}`,
                        COLOR: `No cars found for salesman with id ${id}`,
                        YEAR_OF_MAN: 0,
                        VIN: `No cars found for salesman with id ${id}`,
                        FOR_SALE: false,
                        USED: false 
                    })
                }
                console.log(rows);
                resolve(rows);
            });
        });
    }
}