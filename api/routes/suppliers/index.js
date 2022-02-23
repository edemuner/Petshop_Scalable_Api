const router = require('express').Router()
const SupplierTable = require('./supplierTable')
const Supplier = require('./Supplier')
const SupplierSerializer = require('../../Serializer').SupplierSerializer

router.options('/', (req, res) => {
    res.set('Access-Control-Allow-Methods', 'GET, POST')
    res.set('Access-Control-Allow-Headers', 'Content-Type')
    res.status(204).end()
})

// the serialize call checks the accepted content type for the response
// if it is among the supported formats, the method returns the data for the client as requested
// the same goes for the post and other http methods here
router.get('/', async (req, res) => {
    const results = await SupplierTable.list()
    const serializer = new SupplierSerializer(
        res.getHeader('Content-Type'),
        ['company', 'category'])
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
            res.getHeader('Content-Type'),
            ['company', 'category'])
        res.send(
            serializer.serialize(supplier)
        )
    } catch(error){
        next(error)
    }
})

router.options('/:supplierId', (req, res) => {
    res.set('Access-Control-Allow-Methods', 'GET, PUT, DELETE')
    res.set('Access-Control-Allow-Headers', 'Content-Type')
    res.status(204).end()
})

router.get('/:supplierId', async (req, res, next) => {
    try {
        const id = req.params.supplierId
        const supplier = new Supplier({ id: id })
        await supplier.load()
        const serializer = new SupplierSerializer(
            res.getHeader('Content-Type'), 
            ['email', 'company','createdAt', 'updatedAt'])
        res.send(
            serializer.serialize(supplier)
        )
    } catch (error) {
        next(error)
    }
})

router.put('/:supplierId', async (req, res, next) => {
    
    try {
        const id = req.params.supplierId
        const receivedData = req.body
        const data = Object.assign({}, receivedData, { id: id })
        const supplier = new Supplier(data)
        await supplier.update()
        res.status(204).end()
    } catch(error) {
        next(error)
    }
})

router.delete('/:supplierId', async (req, res, next) => {
    try {
        const id = req.params.supplierId
        const supplier = new Supplier({ id: id })
        await supplier.load()
        await supplier.remove()
        res.end()
    } catch(error) {
        next(error)
    }
})

// this function checks if the supplier exists
// it is used in the products search
// replaces the http supplier field for the proper supplier object
const checkSupplier = async (req, res, next) => {
    try {
        const id = req.params.supplierId
        const supplier = new Supplier({ id: id })
        await supplier.load()
        req.supplier = supplier
        next()
    } catch(error) {
        next(error)
    }
}

// the router for products, it is inside suppliers because supplier is a foreign key to product
// since each product has a supplier (one to many)
const productRouter = require('./products')
router.use('/:supplierId/products', checkSupplier, productRouter)

module.exports = router