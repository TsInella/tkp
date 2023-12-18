const ApiError = require ('../error/ApiError')
const {Faculty} = require("../models/student_model");
class FacultyController {
    async create(req, res) {
        const {name, studentsNumber, dean} = req.body
        const faculty = await Faculty.create({name, studentsNumber, dean})
        return res.json(faculty)
    }
    async getAll(req, res) {
        const allFaculties = await Faculty.findAll()
        return res.json(allFaculties)
    }
}
module.exports= new FacultyController()