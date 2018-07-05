require('dotenv').config()
const express = require('express');
const mongoose = require('mongoose')
const logger = require('morgan');
const Router = require('./routes');

const app = express();

mongoose.connect('mongodb://localhost:27017/finalLiveCoding')
app.use(require('cors')())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/', Router);


module.exports = app;
