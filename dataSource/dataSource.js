const sqlite3 = require('@louislam/sqlite3');
const path = require('path');

exports.CarData = class CarData {
    constructor() {
        console.log("Creating CarData");
        const dbpath = path.resolve() + "/data/dealership.db";
        this.db = new sqlite3.Database(dbpath, sqlite3.OPEN_READONLY);
    }

    getCars() {
        return new Promise((resolve,reject) => {
            this.db.all("SELECT * FROM CAR;", function (err, rows) {
                if (err) {
                    reject([]);
                }
                resolve(rows);
            });
        });
    }

    getCar(id) {
        console.log("db call");
        let p = new Promise((resolve, reject) => {
            this.db.all(`SELECT * FROM CAR WHERE carID = ${id};`, function (err, rows) {
                console.log(`db callback call id=${id}`);
                if (err) {
                    reject([]);
                }
                console.log(rows);
                resolve(rows[0]);
            });
        });
        console.log("out of db call");
        return p;
    }
}