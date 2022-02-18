const router = require('express').Router({ mergeParams: true })
const Table = require('./productTable')
const Product = require('./Product')

router.get('/', async (req, res) => {
    const products = await Table.list(req.params.supplierId)
    res.json(products)
})

router.post('/', async (req, res) => {
    const supplierId = req.params.supplierId
    const body = req.body
    const data = Object.assign({}, body, { supplier: supplierId})

    const product = new Product(data)
    await product.create()
    res.status(201).json(product)

})

module.exports = router