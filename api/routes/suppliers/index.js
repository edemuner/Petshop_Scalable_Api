const router = require('express').Router()
const SupplierTable = require('./supplierTable')
const Supplier = require('./Supplier')
const NotFound = require('../../errors/NotFound')

router.get('/', async (req, res) => {
    const results = await SupplierTable.list()
    res.json(results)
})

router.post('/', async (req, res) => {
    try{
        const receivedData = req.body
        const supplier = new Supplier(receivedData)
        await supplier.create()
        res.status(201).json(supplier)
    } catch(error){
        res.status(400).json({
            message : error.message
        })
    }
})

router.get('/:supplierId', async (req, res) => {
    try {
        const id = req.params.supplierId
        const supplier = new Supplier({ id: id })
        await supplier.load()
        res.json(supplier)
    } catch (error) {
        res.status(404).json({
            message: error.message
        })
    }
})

router.put('/:supplierId', async (req, res, next) => {
    
    try {
        const id = req.params.supplierId
        const receivedData = req.body
        const data = Object.assign({}, receivedData, { id: id })
        const supplier = new Supplier(data)
        await supplier.update()
        res.end()
    } catch(error) {
        next(error)
    }
})

router.delete('/:supplierId', async (req, res) => {
    try {
        const id = req.params.supplierId
        const supplier = new Supplier({ id: id })
        await supplier.load()
        await supplier.remove()
        res.end()
    } catch(error) {
        res.status(404).json({
            message: error.message
        })
    }
})

module.exports = router