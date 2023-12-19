const express = require('express');
const db = require('./config/connection')

const PORT = 3001;
const app = express(); //allows us to use defined methods to set routes, etc.

app.use(express.urlencoded({ extended: true }));
app.use(express.json());