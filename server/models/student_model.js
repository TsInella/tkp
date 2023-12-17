const sequelize = require('../db');
const {DataTypes} = require('sequelize');

// Определение модели для факультета
const Faculty = sequelize.define('faculty', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    facultyName: { type: DataTypes.STRING, unique: true, allowNull: false },
    studentsNumber: { type: DataTypes.INTEGER },
    dean: { type: DataTypes.STRING, allowNull: false }
});

// Определение модели для курса
const Course = sequelize.define('course', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    // Предполагается, что связь с группами будет многие-ко-многим
});

// Определение модели для группы
const Group = sequelize.define('group', {
    number: { type: DataTypes.STRING, primaryKey: true },
    tutorName: { type: DataTypes.STRING, allowNull: false },
    studentsNumber: { type: DataTypes.INTEGER },

});

// Изменение модели студента для связи с курсами и группами
const Student = sequelize.define('student', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    username: { type: DataTypes.STRING, unique: true, allowNull: false },
    surname: { type: DataTypes.STRING, allowNull: false },
    gender: { type: DataTypes.STRING, allowNull: false },
    birthdate: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, unique: true, allowNull: false },
    password: { type: DataTypes.STRING, allowNull: false },
    fundingType: { type: DataTypes.STRING, allowNull: false },
    studyForm: { type: DataTypes.STRING, allowNull: false },
    educationLevel: { type: DataTypes.STRING, allowNull: false },

});

// Связи между сущностями
Course.hasMany(Group)
Group.belongsTo(Course)

Faculty.hasMany(Group)
Group.belongsTo(Faculty)

Group.hasOne(Student)
Student.belongsTo(Group)


module.exports = {
    Faculty,
    Course,
    Group,
    Student
};