const sqlite3 = require('@louislam/sqlite3');

exports.CarData = class CarData {
    constructor(database) {
        this.db = database;
    }

    getCars() {
        return new Promise((resolve, reject) => {
            this.db.all("SELECT * FROM CAR;", function (err, rows) {
                if (err) {
                    reject([]);
                }
                resolve(rows);
            });
        });
    }

    getCar(id) {
        return new Promise((resolve, reject) => {
            this.db.all(`SELECT * FROM CAR WHERE carID = ${id};`, function (err, rows) {
                if (err) {
                    reject([]);
                }
                if (rows.length == 0) {
                    rows.push(
                        {
                            carID: -1,
                            MANUFACTURER: `Couldn't find car with id ${id}`,
                            MODEL: `Couldn't find car with id ${id}`,
                            COLOR: `Couldn't find car with id ${id}`,
                            YEAR_OF_MANUFACTURE: 0,
                            VIN: `Couldn't find car with id ${id}`,
                            FOR_SALE: false
                        });
                }
                resolve(rows[0]);
            });
        });
    }
}