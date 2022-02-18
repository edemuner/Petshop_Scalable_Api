const router = require('express').Router({ mergeParams: true })
const Table = require('./productTable')

router.get('/', async (req, res) => {
    const products = await Table.list(req.params.supplierId)
    res.json(products)
})

module.exports = router