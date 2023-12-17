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

    async check(req, res) {
        const token = generateJwt(req.students.id, req.students.email)
        return res.json({token})
    }

    async getAll(req, res) {
        const students = await Students.findAll()
        return res.json(students)
    }

    async getOne(req, res) {
        const{email} = req.params
        const students = await Students.findOne({where: {email}})
        return res.json(students)
    }


    async updateOne(req, res, next) {
        const { email } = req.params;
        const {newGender, newBirthdate, newGroup, newCourse, newFundingType, newStudyForm, newEducationLevel} = req.body

        const student = await Students.findOne({where: {email}})
        if (!student) {
            return next(ApiError.badRequest(('Пользователя не существует!')))
        }
        student.gender = newGender
        student.birthdate = newBirthdate
        student.group = newGroup
        student.course = newCourse
        student.fundingType = newFundingType
        student.studyForm = newStudyForm
        student.educationLevel = newEducationLevel
        await student.save();
        return res.json({ message: 'Данные успешно обновлены!' })
    }

}

module.exports = new StudentController()