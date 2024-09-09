const express = require('express');
const routes = express.Router();

const addContact = require('../controllers/contacts/addContact');
const searchContact = require("../controllers/contacts/searchContact")
const deleteContact = require('../controllers/contacts/deleteContact');

routes
    .post('/addContact' , addContact.addContact)
    .post('/searchContacts' , searchContact.searchContact)
    .post('/deleteContact' , deleteContact.deleteContact);

exports.route = routes;