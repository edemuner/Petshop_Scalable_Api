const Sequelize = require('sequelize')
const instance = require('../../../database')

const columns = {
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },
    price: {
        type:Sequelize.DOUBLE,
        allowNull: false
    },
    stock: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    supplier: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: require('../modelSupplierTable'),
            key: 'id'
        }
    }
}

const options = {
    freezeTableName: true,
    tableName: 'products',
    timestamps: true
}

module.exports = instance.define('product', columns, options)