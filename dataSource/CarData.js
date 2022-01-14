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


    //createCar(manufacturer: String!,model: String!, color: String!,year: String!, vin: String!,for_sale: Boolean,used: Boolean): Car!;
    createCar(args) {
        let values = [args.MANUFACTURER,args.MODEL,args.COLOR,args.YEAR_OF_MANUFACTURE,args.VIN];
        if ('FOR_SALE' in args) {
            values.push(args.FOR_SALE)
        } else {
            values.push(false);
        }
        if ('USED' in args) {
            values.push(args.USED)
        } else {
            values.push(false)
        }
        console.log(values);
        return new Promise((resolve, reject) => {
            this.db.run('INSERT INTO CAR (MANUFACTURER,MODEL,COLOR,YEAR_OF_MAN,VIN,FOR_SALE,USED) VALUES(?,?,?,?,?,?,?)',values,function (err) {
                if (err) {
                    reject("Insert Failed");
                    return;
                }
                resolve(`Insert was successful.Car ID: ${this.lastID}`);
            });
        });
    }
/*
    //    updateCar(carID: ID!,manufacturer: String,model: String, color: String,year: String, vin: String,for_sale: Boolean,used: Boolean): Car!;
    updateCar: (parent,args) => {
        return dataSources.carData.updateCar(args.carID,args)
    }

*/
}