const mongoose = require('mongoose');
let mongodb;
function connect(url, callback) {
    mongoose.connect(url, {}, (err, db) => {
        if (err)
            console.log(err);
        else {
            mongodb = db;
            callback();
        }
    });
}
function get() {
    return mongodb;
}
module.exports = {
    connect,
    get,
};
//# sourceMappingURL=mongodb.js.map