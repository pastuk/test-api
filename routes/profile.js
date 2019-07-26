const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

const profileSchema = require('../public/javascripts/schema');
const Profile = mongoose.model('Profile', profileSchema);

router.get('/', findRecord, endResponse);       // GET stored profile using query
router.get('/all', getRecords, endResponse);    // GET list of all stored profiles
router.post('/', createRecord, endResponse);    // POST submitted profile and respond with record
router.delete('/', deleteRecord, endResponse);  // DELETE previously submitted profile, if exists.

/**
 * Deletes queried record
 */
function deleteRecord(req, res, next) {
    Profile
        .deleteOne(req.query)
        .then(data => res.send(data))
        .catch(err => next(new Error(err)));
}

/**
 * Returns all records
 */
function getRecords(req, res, next) {
    Profile
        .find()
        .then(data => res.send(data))
        .catch(err => next(new Error(err)));
}

/**
 * Returns single record
 */
function findRecord(req, res, next) {
    Profile
        .find(req.query)
        .then(data => res.send(data))
        .catch(err => next(new Error(err)));
}

/**
 * Creates new record
 */
function createRecord (req, res, next) {
    const newProfile = new Profile();

    req.body.forEach(function (row) {
        newProfile[row.name] = row.value;
    });

    newProfile
        .save()
        .then(data => res.send(data))
        .catch(err => next(new Error(err)));
}

/**
 * Ends response
 */
function endResponse (req, res) {
    res.end();
}

module.exports = router;
