const bcrypt = require("bcrypt");

const comparePassword = (password, enteredPassword) => {
    return bcrypt.compare(enteredPassword, password);
}

module.exports = {
    comparePassword
}