const express = require('express')
const app = express()
const bodyparser = require('body-parser')
const config = require('config')
const NotFound = require('./errors/NotFound')

app.use(bodyparser.json())

const router = require('./routes/suppliers')
app.use('/api/suppliers', router)

app.use((error, req, res, next) => {
    if (error instanceof NotFound){
        res.status(404)
    } else {
        res.status(400)
    }
    res.json({
        message: error.message
    })
})

app.listen(config.get('api.port'), () => console.log('API working'))
