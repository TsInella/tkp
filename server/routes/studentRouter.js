const Router = require('express')
const router = new Router()
const studentController = require('../controllers/studentController')
const authMiddleware = require('../middleware/authMiddleware')

/**
 * @swagger
 * /api/student/registration:
 *   post:
 *     summary: Регистрирует нового студента
 *     tags: [Student]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - surname
 *               - gender
 *               - birthdate
 *               - email
 *               - password
 *               - fundingType
 *               - studyForm
 *               - educationLevel
 *               - courseNumber
 *               - facultyName
 *               - academicPerformanceId
 *               - groupNumber
 *             properties:
 *               username:
 *                 type: string
 *               surname:
 *                 type: string
 *               gender:
 *                 type: string
 *               birthdate:
 *                 type: string
 *                 format: date
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *                 format: password
 *               fundingType:
 *                 type: string
 *               studyForm:
 *                 type: string
 *               educationLevel:
 *                 type: string
 *               courseNumber:
 *                 type: integer
 *               facultyName:
 *                 type: string
 *               academicPerformanceId:
 *                 type: integer
 *               groupNumber:
 *                 type: string
 *     responses:
 *       200:
 *         description: Успешная регистрация, возвращается токен авторизации.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *       400:
 *         description: Ошибка запроса из-за некорректного email или пароля.
 *       409:
 *         description: Пользователь с таким email уже существует.
 */
router.post('/registration', studentController.registration)

/**
 * @swagger
 * /api/student/login:
 *   post:
 *     summary: Авторизует студента и возвращает токен
 *     tags: [Student]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: Email студента для входа
 *               password:
 *                 type: string
 *                 format: password
 *                 description: Пароль студента
 *     responses:
 *       200:
 *         description: Авторизация успешна, возвращается токен
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: Токен аутентификации
 *       404:
 *         description: Пользователь не найден
 *       401:
 *         description: Неверный пароль
 */
router.post('/login', studentController.login)

/**
 * @swagger
 * /api/student/check:
 *   get:
 *     summary: Проверяет и обновляет токен авторизации студента
 *     tags: [Student]
 *     responses:
 *       200:
 *         description: Токен успешно проверен и обновлен
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: Обновленный токен аутентификации
 *       401:
 *         description: Недействительный или истекший токен
 */
router.get('/auth', authMiddleware, studentController.check)

/**
 * @swagger
 * /api/students:
 *   get:
 *     summary: Возвращает список всех студентов
 *     tags: [Student]
 *     responses:
 *       200:
 *         description: Список студентов успешно получен
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: Уникальный идентификатор студента
 *                   username:
 *                     type: string
 *                     description: Имя пользователя студента
 *                   surname:
 *                     type: string
 *                     description: Фамилия студента
 *                   gender:
 *                     type: string
 *                     description: Пол студента
 *                   birthdate:
 *                     type: string
 *                     format: date
 *                     description: Дата рождения студента
 *                   email:
 *                     type: string
 *                     format: email
 *                     description: Электронная почта студента
 *                   # Дополнительные поля...
 */
router.get('/', studentController.getAll)

/**
 * @swagger
 * /api/student/{email}:
 *   get:
 *     summary: Получает информацию о студенте по электронной почте
 *     tags: [Student]
 *     parameters:
 *       - in: path
 *         name: email
 *         required: true
 *         schema:
 *           type: string
 *         description: Электронная почта студента
 *     responses:
 *       200:
 *         description: Данные о студенте
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: Уникальный идентификатор студента
 *                 username:
 *                   type: string
 *                   description: Имя пользователя студента
 *                 surname:
 *                   type: string
 *                   description: Фамилия студента
 *                 gender:
 *                   type: string
 *                   description: Пол студента
 *                 birthdate:
 *                   type: string
 *                   format: date
 *                   description: Дата рождения студента
 *                 email:
 *                   type: string
 *                   format: email
 *                   description: Электронная почта студента
 *       404:
 *         description: Студент с такой электронной почтой не найден
 */
router.get('/:email', studentController.getOne)

/**
 * @swagger
 * /api/student/{email}:
 *   put:
 *     summary: Обновляет информацию о студенте
 *     tags: [Student]
 *     parameters:
 *       - in: path
 *         name: email
 *         required: true
 *         schema:
 *           type: string
 *         description: Электронная почта студента
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               newGender:
 *                 type: string
 *                 description: Новый пол студента
 *               newBirthdate:
 *                 type: string
 *                 format: date
 *                 description: Новая дата рождения студента
 *               newGroupNumber:
 *                 type: integer
 *                 description: Новый номер группы студента
 *               newCourseNumber:
 *                 type: integer
 *                 description: Новый номер курса студента
 *               newFundingType:
 *                 type: string
 *                 description: Новый тип финансирования студента
 *               newFacultyName:
 *                 type: string
 *                 description: Новое название факультета студента
 *               newStudyForm:
 *                 type: string
 *                 description: Новая форма обучения студента
 *               newEducationLevel:
 *                 type: string
 *                 description: Новый уровень образования студента
 *     responses:
 *       200:
 *         description: Информация о студенте успешно обновлена
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       400:
 *         description: Пользователь не найден или данные некорректны
 */
router.put('/:email', studentController.updateOne);

module.exports = router