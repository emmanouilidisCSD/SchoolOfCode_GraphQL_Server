const sqlite3 = require('@louislam/sqlite3');
const { InvoiceData } = require('./InvoiceData');

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

    getCarByID(id) {
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
                            YEAR_OF_MAN: 0,
                            VIN: `Couldn't find car with id ${id}`,
                            FOR_SALE: false
                        });
                }
                resolve(rows[0]);
            });
        });
    }

    createCar(args) {
        let values = [args.MANUFACTURER, args.MODEL, args.COLOR, args.YEAR_OF_MAN, args.VIN];
        if ('FOR_SALE' in args) {
            values.push(args.FOR_SALE ? 1 : 0)
        } else {
            values.push(0);
        }
        if ('USED' in args) {
            values.push(args.USED ? 1 : 0)
        } else {
            values.push(0)
        }
        return new Promise((carInsertSuccess, carInsertFail) => {
            this.db.run('INSERT INTO CAR (MANUFACTURER,MODEL,COLOR,YEAR_OF_MAN,VIN,FOR_SALE,USED) VALUES(?,?,?,?,?,?,?)', values,function (err) {
                if (err) {
                    carInsertFail("Insert Failed");
                }
                carInsertSuccess(`Insert was successful.Car ID: ${this.lastID}`);
            });
        });
    }

    updateCarByID(carID, args) {
        return new Promise((carUpdateNotify,carUpdateFail) => {
            let query = "UPDATE CAR SET ";
            const keys = Object.keys(args);
            for (let i = 0; i < keys.length; i++) {
                const key = keys[i];
                if (key != "carID") {
                    query += `${key} = '${args[key]}'`;
                if (i < keys.length - 1)
                    query += ",";
                }
            }
            query += ` WHERE carID = ${carID}`;
            this.db.run(query,[],function (err) {
                if (err) {
                    carUpdateFail(err);
                }
                if (this.changes === 1) {
                    carUpdateNotify(`Car with id ${carID} succesfuylly updated.`);
                } else {
                    carUpdateNotify(`No car with id ${carID} found.`);
                }
            });
        });
    }

    //Διαγράφει το αυτοκίνητο με id = carID αρκεί να μην αντιστοιχεί σε κάποιο τιμολόγιο ή εισιτήριο σέρβις.
    deleteCarByID(carID) {
        return new Promise((carDeleteNotify,carDeleteFail) => {
            let getCarsWithTicketOrInvoice = "SELECT carID FROM (SELECT CAR.carID FROM CAR JOIN INVOICE on CAR.carID = INVOICE.carID UNION SELECT CAR.carID FROM CAR JOIN TICKET on CAR.carID = TICKET.carID) ORDER BY carID"
            let query = `DELETE FROM CAR WHERE carID = ${carID} AND carID NOT IN (${getCarsWithTicketOrInvoice});`;
            this.db.run(query,[],function (err) {
                if (err) {
                    console.log(err);
                    carDeleteFail(err);
                }
                if (this.changes === 1) {
                    carDeleteNotify(`Car with id ${carID} succesfully deleted.`);
                } else {
                    carDeleteNotify(`Couldn't delete car with id = ${carID}.`);
                }
            });
        });
    }

    //Διαγράφει αυτοκίνητα από το minID μέχρι και το maxID.Ένα αυτοκίνητο διαγράφεται μόνο αν δεν αντιστοιχεί σε κάποιο τιμολόγιο ή εισιτήριο σέρβις.
    deleteCarBetweenIDs(minID,maxID) {
        return new Promise((carDeleteNotify,carDeleteFail) => {
            let getCarsWithTicketOrInvoice = "SELECT carID FROM (SELECT CAR.carID FROM CAR JOIN INVOICE on CAR.carID = INVOICE.carID UNION SELECT CAR.carID FROM CAR JOIN TICKET on CAR.carID = TICKET.carID) ORDER BY carID"
            let query = `DELETE FROM CAR WHERE carID >= ${minID} AND`;
            if (maxID) {
                query += ` carID <= ${maxID} AND`;
            } 
            query += ` carID NOT IN (${getCarsWithTicketOrInvoice});`;
            console.log(query);
            this.db.run(query,[],function (err) {
                if (err) {
                    console.log(err);
                    carDeleteFail(err);
                }
                if (this.changes >= 1) {
                    carDeleteNotify(`Deleted ${this.changes} car(s).`);
                } else {
                    carDeleteNotify(`No cars were deleted.`);
                }
            });
        });

    }
}