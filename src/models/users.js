const mongoose = require('mongoose');
const User = new mongoose.Schema({
    email: String,
    password: String
});

User.methods.compare = function (Password){
    if(Password === this.password) {
        return true
    } else {
        return false
    }
}

const model = mongoose.model('Users', User);
module.exports = model;