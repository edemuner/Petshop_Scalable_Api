const router = require('express').Router({ mergeParams: true })
const Table = require('./productTable')
const Product = require('./Product')

router.get('/', async (req, res) => {
    const products = await Table.list(req.params.supplierId)
    res.json(products)
})

router.post('/', async (req, res, next) => {
    try{
        const supplierId = req.params.supplierId
        const body = req.body
        const data = Object.assign({}, body, { supplier: supplierId})
    
        const product = new Product(data)
        await product.create()
        res.status(201).json(product)
    } catch(error) {
        next(error)
    }   

})

router.delete('/:productId', async (req, res) => {
    const data = {
        productId: req.params.productId,
        supplierId: req.params.supplierId
    }
    const product = new Product(data)
    await product.delete(productId)
    res.status(204).end()
})

module.exports = router