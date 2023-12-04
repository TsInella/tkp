const Router = require('express')
const router = new Router()
const studentsRouter = require('./studentsRouter')


router.use('/students', studentsRouter)


module.exports = router


