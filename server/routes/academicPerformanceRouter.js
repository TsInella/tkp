const Router = require('express')
const router = new Router()
const academicPerformanceController = require('../controllers/academicPerformanceController')


router.post('/', academicPerformanceController.create)
router.get('/', academicPerformanceController.getAll)

module.exports = router