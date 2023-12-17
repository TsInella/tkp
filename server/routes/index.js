const Router = require('express')
const router = new Router()
const studentsRouter = require('./studentsRouter')


router.use('/student', studentsRouter)


module.exports = router
