const bcrypt = require('bcrypt')
const ApiError = require ('../error/ApiError')
const jwt = require('jsonwebtoken')
const {Students} = require('../models/student_model')
const {DataTypes} = require("sequelize");

const generateJwt = (id, email) => {
    return jwt.sign(
        {id, email},
        process.env.SECRET_KEY,
        {expiresIn: '24h'}
    )
}

class StudentController {
    async registration(req, res, next) {
        const {username, surname, gender, birthdate, email, password, group, course, fundingType, studyForm, educationLevel} = req.body
        if (!email || !password) {
            return next(ApiError.badRequest(('Некорректный email или паролЬ')))
        }
        const candidate = await Students.findOne({where: {email}})
        if (candidate) {
            return next(ApiError.badRequest(('Пользователь с таким email уже существует!')))
        }
        const hashPassword = await bcrypt.hash(password, 5)
        const students = await Students.create({username, surname, gender, birthdate, email, password: hashPassword, group, course, fundingType, studyForm, educationLevel})
        const token = generateJwt(students.id, students.email)
        return res.json({token})
    }

    async login(req, res, next) {
        const {email, password} = req.body
        const students = await Students.findOne({where: {email}})
        if (!students) {
            return next(ApiError.internal('ПОЛЬЗОВАТЕЛЬ НЕ НАЙДЕН!'))
        }
        let comparePassword = bcrypt.compareSync(password, students.password)
        if (!comparePassword) {
            return next(ApiError.internal('Указан неверный пароль!'))
        }
        const token = generateJwt(students.id, students.email)
        return res.json({token})
    }

    async check(req, res, next) {
        const token = generateJwt(req.students.id, req.students.email)
        return res.json({token})
    }
}

module.exports = new StudentController()