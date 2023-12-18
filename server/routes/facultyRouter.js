const Router = require('express')
const router = new Router()
const facultyController = require('../controllers/facultyController')


router.post('/', facultyController.create)
router.get('/', facultyController.getAll)

module.exports = router