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
}