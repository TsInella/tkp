const sequelize = require('../db')
const {DataTypes} = require('sequelize')

const Students = sequelize.define('students', {
    key: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    username: {type: DataTypes.STRING, allowNull: false},
    surname: {type: DataTypes.STRING, allowNull: false},
    gender: {type: DataTypes.STRING, allowNull: false},
    birthdate: {type: DataTypes.STRING, allowNull: false},
    email: {type: DataTypes.STRING, allowNull: false},
    password: {type: DataTypes.STRING, allowNull: false},
    group: {type: DataTypes.STRING, allowNull: false},
    course: {type: DataTypes.STRING, allowNull: false},
    fundingType: {type: DataTypes.STRING, allowNull: false},
    studyForm: {type: DataTypes.STRING, allowNull: false},
    educationLevel: {type: DataTypes.STRING,allowNull: false},
})


module.exports = {
    Students
}