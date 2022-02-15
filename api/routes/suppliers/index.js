const router = require('express').Router()
const SupplierTable = require('./supplierTable')
const Supplier = require('./Supplier')

router.get('/', async (req, res) => {
    const results = await SupplierTable.list()
    res.json(results)
})

router.post('/', async (req, res) => {
    const receivedData = req.body
    const supplier = new Supplier(receivedData)
    await supplier.create()
    res.json(supplier)
})

router.get('/:supplierId', async (req, res) => {
    try {
        const id = req.params.supplierId
        const supplier = new Supplier({ id: id })
        await supplier.load()
        res.json(supplier)
    } catch (error) {
        res.json({
            message: error.message
        })
    }
    
})

module.exports = router