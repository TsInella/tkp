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
    // Внешний ключ для связи с факультетом
    facultyId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'faculties',
            key: 'id'
        }
    }
});

// Изменение модели студента для связи с курсами и группами
const Students = sequelize.define('students', {
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
    // Внешние ключи для связи со схемой
    groupId: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
            model: 'groups',
            key: 'number'
        }
    },
    courseId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'courses',
            key: 'id'
        }
    }
    // Необходимо удалить поля group и course, так как они теперь представлены как внешние ключи
});

// Связи между сущностями
Faculty.hasMany(Group, { foreignKey: 'facultyId' });
Group.belongsTo(Faculty, { foreignKey: 'facultyId' });

Group.hasMany(Students, { foreignKey: 'groupId' });
Students.belongsTo(Group, { foreignKey: 'groupId' });

// Связь многие-ко-многим между курсами и группами
// Также необходимо будет определить промежуточную таблицу для этой связи, если она уже не определена

module.exports = {
    Faculty,
    Course,
    Group,
    Students
};