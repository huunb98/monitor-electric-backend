"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Database = void 0;
const mongoose = require("mongoose");
class Database {
    constructor() {
        this.uri = process.env.Host + '/' + process.env.MongoDbName;
        this.user = process.env.MongoDbUser;
        this.pass = process.env.MongoDbPass;
    }
    connectMongoDb(callback) {
        mongoose.connect(this.uri, {
            user: this.user,
            pass: this.pass,
        }, (error) => {
            if (error === null)
                callback('');
            else
                console.log(error);
        });
    }
}
exports.Database = Database;
//# sourceMappingURL=mongodb.js.map