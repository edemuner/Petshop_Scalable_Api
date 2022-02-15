const Sequelize = require('sequelize')
const sequelize = require('../../database')

const colunas = {
    company: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false
    },
    category: {
        type: Sequelize.ENUM('food', 'toys'),
        allowNull: false
    }
}

const options = {
    freezeTableName: true,
    tableName: 'suppliers',
    timestamps:true
}

module.exports = sequelize.define('supplier', colunas, options)