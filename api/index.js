const express = require('express')
const app = express()
const bodyparser = require('body-parser')
const config = require('config')
const NotFound = require('./errors/NotFound')
const InvalidField = require('./errors/InvalidField')
const NotEnoughData = require('./errors/NotEnoughData')
const NotSuportedValue = require('./errors/NotSupportedValue')
const acceptedFormats = require('./Serializer').acceptedFormats
const ErrorSerializer = require('./Serializer').ErrorSerializer



app.use(bodyparser.json())

app.use((req, res, next) => {
    let requestedFormat = req.header('Accept')

    if (requestedFormat === '*/*'){
        requestedFormat = 'application/json'
    }

    if (acceptedFormats.indexOf(requestedFormat) === -1){
        res.status(406).end()
    } else {
        res.setHeader('Content-Type', requestedFormat)
        next()
    }
})

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
    const serializer = new ErrorSerializer(
        res.getHeader('Content-Type')
    )
    
    res.status(status).send(
        serializer.serialize({
            id: error.idError,
            message: error.message
        })
    )
})


app.listen(config.get('api.port'), () => console.log('API working'))
