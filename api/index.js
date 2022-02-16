const express = require('express')
const app = express()
const bodyparser = require('body-parser')
const config = require('config')
const NotFound = require('./errors/NotFound')
const InvalidField = require('./errors/InvalidField')
const NotEnoughData = require('./errors/NotEnoughData')
const NotSuportedValue = require('./errors/NotSupportedValue')


app.use(bodyparser.json())

const router = require('./routes/suppliers')
app.use('/api/suppliers', router)

app.use((error, req, res, next) => {
    let status = 500

    if (error instanceof NotFound){
        status = 404
    } else if (error instanceof InvalidField || 
                error instanceof NotEnoughData){
        status = 400
    } else if (error instanceof NotSuportedValue){
        status = 406
    }
    res.status(status).json({
        message: error.message
    })
})


app.listen(config.get('api.port'), () => console.log('API working'))
