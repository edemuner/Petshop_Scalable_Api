const express = require('express')
const app = express()
const bodyparser = require('body-parser')
const config = require('config')

app.use(bodyparser.json())

const router = require('./routes/suppliers')
app.use('/api/suppliers', router)

app.listen(config.get('api.port'), () => console.log('API working'))
