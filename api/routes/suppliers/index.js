const router = require('express').Router()
const SupplierTable = require('./supplierTable')
const Supplier = require('./Supplier')
const SupplierSerializer = require('../../Serializer').SupplierSerializer


router.get('/', async (req, res) => {
    const results = await SupplierTable.list()
    const serializer = new SupplierSerializer(res.getHeader('Content-Type'))
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
        const serializer = new SupplierSerializer(res.getHeader('Content-Type'))
        res.send(
            serializer.serialize(supplier)
        )
    } catch(error){
        next(error)
    }
})

router.get('/:supplierId', async (req, res, next) => {
    try {
        const id = req.params.supplierId
        const supplier = new Supplier({ id: id })
        await supplier.load()
        const serializer = new SupplierSerializer(
            res.getHeader('Content-Type'), 
            ['email', 'createdAt', 'updatedAt'])
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
        res.end()
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

const productRouter = require('./products')
router.use('/:supplierId/products', productRouter)

module.exports = router