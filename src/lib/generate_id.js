const uuid = require('uuid');
const btoa = require('btoa');
const generateId = () =>  {
    return btoa(uuid.v4()).substring(0, 12);
}

module.exports = { generateId };
