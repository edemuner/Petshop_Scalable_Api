const router = require('express').Router({ mergeParams: true })
const Table = require('./productTable')
const Product = require('./Product')
const Serializer = require('../../../Serializer').productSerializer

router.get('/', async (req, res) => {
    const products = await Table.list(req.supplier.id)
    const serializer = new Serializer(
        res.getHeader('Content-Type')
    )
    res.send(
        serializer.serialize(products)
    )
})

router.post('/', async (req, res, next) => {
    try{
        const supplierId = req.supplier.id
        const body = req.body
        const data = Object.assign({}, body, { supplier: supplierId})
    
        const product = new Product(data)
        await product.create()
        const serializer = new Serializer(
            res.getHeader('Content-Type')
        )
        const timestamp = (new Date(product.updatedAt)).getTime()
        res.set('Last-Modified', timestamp)
        res.set('X-Powered-By', 'Eduardo Demuner')
        res.set('Location', `/api/suppliers/${product.supplier}/products/${product.id}`)
        res.status(201).send(
            serializer.serialize(product)
        )
    } catch(error) {
        next(error)
    }   

})

router.delete('/:productId', async (req, res) => {
    const data = {
        id: req.params.productId,
        supplier: req.supplier.id
    }
    const product = new Product(data)
    await product.delete()
    res.status(204).end()
})

router.get('/:productId', async (req, res, next) => {
    
    try{
        const data = {
            id: req.params.productId,
            supplier: req.supplier
        }
    
        const product = new Product(data)
        await product.load()
        const serializer = new Serializer(
            res.getHeader('Content-Type'),
            ['price', 'stock', 'supplier', 'createdAt', 'updatedAt']
        )
        const timestamp = (new Date(product.updatedAt)).getTime()
        res.set('X-Powered-By', 'Eduardo Demuner')
        res.set('Last-Modified', timestamp)
        res.send(
            serializer.serialize(product)
        )
    } catch(error){
        next(error)
    }
    
})

router.put('/:productId', async (req, res, next) => {
    try{
        const data = Object.assign(
            {},
            req.body,
            {
                id: req.params.productId,
                supplier: req.supplier
            }
        )
    
        const product = new Product(data)
        await product.update()
        await product.load()
        const timestamp = (new Date(product.updatedAt)).getTime()
        res.set('Last-Modified', timestamp)
        res.set('X-Powered-By', 'Eduardo Demuner')
        res.status(204).end()
    } catch(error) {
        next(error)
    }
})

router.post('/:productId/reduce-stock', async (req, res, next) => {
    try {
        const product =  new Product({
            id: req.params.productId,
            supplier: req.supplier
        })
        await product.load()
        product.stock -= req.body.amount
        await product.reduceStock()
        await product.load()
        const timestamp = (new Date(product.updatedAt)).getTime()
        res.set('Last-Modified', timestamp)
        res.set('X-Powered-By', 'Eduardo Demuner')
        res.status(204).end()
    } catch(error) {
        next(error)
    }

})

module.exports = router