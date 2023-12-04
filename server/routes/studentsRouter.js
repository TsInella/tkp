const Router = require('express')
const router = new Router()
const studentController = require('../controllers/studentController')
const authMiddleware = require('../middleware/authMiddleware')

router.post('/registration', studentController.registration)
router.post('/login', studentController.login)
router.get('/auth', authMiddleware, studentController.check)

module.exports = router