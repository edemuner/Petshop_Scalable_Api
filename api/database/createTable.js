const TableModel = require('../routes/suppliers/modelTableSupplier')

TableModel
    .sync()
    .then(() => console.log('Table successfuly created'))
    .catch(console.log())