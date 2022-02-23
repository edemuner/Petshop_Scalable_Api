const router = require('express').Router()
const SupplierTable = require('./supplierTable')
const Supplier = require('./Supplier')
const SupplierSerializer = require('../../Serializer').SupplierSerializer

router.options('/:supplierId', (req, res) => {
    res.set('Access-Control-Allow-Methods', 'GET')
    res.set('Access-Control-Allow-Headers', 'Content-Type')
    res.status(204).end()
})

router.get('/', async (req, res) => {
    const results = await SupplierTable.list()
    res.status(200)
    const serializer = new SupplierSerializer(
        res.getHeader('Content-Type', ['category'])
    )
    res.send(
        serializer.serialize(results)
    )
})

router.post('/', async (req, res, next) => {
    try{
        const receivedData = req.body
        const supplier = new Supplier(receivedData)
        await supplier.create()
        res.status(201)
        const serializer = new SupplierSerializer(
            res.getHeader('Content-Type'))
        res.send(
            serializer.serialize(supplier)
        )
    } catch(error){
        next(error)
    }
})

module.exports = router