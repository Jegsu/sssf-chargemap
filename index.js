'use strict';

require('dotenv').config()
const express = require('express')
const app = express()
const db = require('./db')
const stationRoute = require('./routes/stationRoute')

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use('/station', stationRoute)

db.on('connected', () => {
    app.listen(3000)
})
