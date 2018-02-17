'use strict';
var Sequelize = require('sequelize');
const db = require('../db')

module.exports = db.define('campus', {
  name: Sequelize.STRING,
  image: Sequelize.STRING
  });
