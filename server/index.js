require ('dotenv').config()
const express = require('express')
const sequelize = require('./db')
const cors = require('cors')
const router = require('./routes/index')
const errorHandler = require('./middleware/errorHandlingMiddleware')
const path = require('path')

const PORT = process.env.PORT || 5000;

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.resolve(__dirname, 'static')));
app.use('/api', router);

app.use(errorHandler);


const start = async () => {
    try{
        console.log(process.env.DB_NAME)
        console.log(process.env.DB_USER)
        console.log(process.env.DB_PASSWORD)

        await sequelize.authenticate()
        await sequelize.sync()
        app.listen(PORT, () => console.log('server started on port', PORT))
    } catch (e) {
        console.log(e)
    }
}
start()




