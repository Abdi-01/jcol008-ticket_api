const bcrypt = require('bcrypt');

module.exports = {
    hashPassword: (pass) => {
        const salt = bcrypt.genSaltSync(10);
        return bcrypt.hashSync(pass, salt);
    }
}