const express = require('express')
const app = express()
const bodyparser = require('body-parser')
const config = require('config')

app.listen(config.get('api.porta'), () => console.log('API working'))

app.use(bodyparser.json())