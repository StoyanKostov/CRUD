const path = require('path'),
    fs = require('fs'),
    USER_MODEl = require(path.join('..', 'model'));

module.exports = {
    home: function () {
        return new Promise((resolve, reject) => {
            fs.readFile(require.resolve(path.join('..', '..', 'client', 'index.html')), (err, content) => {
                if (err) {
                    reject(err);
                };
                resolve(content);
            });
        });
    },
    create: USER_MODEl.registerUser,
    read: USER_MODEl.getUserById,
    update: USER_MODEl.updateUserById,
    delete: USER_MODEl.deleteUserById
};