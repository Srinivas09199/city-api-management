const express = require('express');
const cityRoutes = require('./routes/cityRoutes.cjs');

const app = express();
const port = 3000;

app.use(express.json());
app.use('/cities', cityRoutes);

module.exports = app;