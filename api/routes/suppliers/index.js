const router = require('express').Router()
const SupplierTable = require('./supplierTable')

router.use('/', async (req, res) => {
    const results = await SupplierTable.list()
    res.json(results)
})

module.exports = router