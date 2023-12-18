const Router = require('express')
const router = new Router()
const courseController = require('../controllers/courseController')


router.post('/', courseController.create)
router.get('/', courseController.getAll)

module.exports = router