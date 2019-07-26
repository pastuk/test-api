const mongoose = require('mongoose');
const Schema = mongoose.Schema;

module.exports = new Schema({
    firstName: {
        type: String,
        set: value => value.charAt(0).toUpperCase() + value.slice(1, value.length) // First letter to upper case
    },
    lastName: {
        type: String,
        set: value => value.charAt(0).toUpperCase() + value.slice(1, value.length)  // First letter to upper case
    },
    birthDate: {
        type: Date,
        get: value => {
            let date = value.getDate();
            let month = value.getMonth() + 1;
            let year = value.getFullYear();
            return month + '-' + date + '-' + year; // Returns date in proper format
        },
        set: value => new Date(value).toISOString() // Convert date text to ISO format
    },
    ssn: {
        type: String,
        get: value => '***-**-' + value.slice(value.length - 4, value.length) // obfuscate social security number
    },
    address:    String,
    city:       String,
    state:      String,
    zip:        String,
    country:    String
}, {
    toObject : {
        getters: true,
        setters: true
    },
    toJSON : {
        getters: true,
        setters: true
    }
});