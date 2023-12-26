import React, {useContext, useEffect, useState} from 'react';
import {Button, DatePicker, Form, Input, Select, Typography} from "antd";
import {useLocation, useNavigate} from "react-router-dom";
import {observer} from "mobx-react-lite";
import {
    createAcademicPerformance,
    createCourse,
    createFaculty,
    createGroup,
    fetchFaculty,
    fetchGroup,
    login,
    registration
} from "../../http/studentAPI";
import {Context} from "../../index";
import dayjs from "dayjs";

dayjs('2019-01-25').format('DD/MM/YYYY')
const {Title} = Typography;
const {Option} = Select;

const Auth = observer(() => {
        const {student} = useContext(Context)
        const location = useLocation()
        const history = useNavigate()
        const isLogin = location.pathname === '/login';
        const [email, setEmail] = useState('')
        const [password, setPassword] = useState('')
        const [username, setUsername] = useState('')
        const [surname, setSurname] = useState('')
        const [gender, setGender] = useState('')
        const [birthdate, setBirthdate] = useState('')
        const [fundingType, setFundingType] = useState('')
        const [studyForm, setStudyForm] = useState('')
        const [educationLevel, setEducationLevel] = useState('')
        //FK
        const [courseNumber, setCourseNumber] = useState(undefined)
        const [facultyName, setFacultyName] = useState('')
        const [groupNumber, setGroupNumber] = useState('')
        //group
        const [tutorName, setTutorName] = useState('')
        const [groupStudentsNumber, setGroupStudentsNumber] = useState('')
        //faculty
        const [facultyStudentsNumber, setFacultyStudentsNumber] = useState('')
        const [dean, setDean] = useState('')
        //average performance
        const [classesNumber, setClassesNumber] = useState('')
        const [averageMark, setAverageMark] = useState('')

        const [groupExists, setGroupExists] = useState(false)
        const [facultyExists, setFacultyExists] = useState(false)


        useEffect(() => {
            const fetchAndSetGroupExistance = async () => {
                const rows = await fetchGroup();
                const result = await rows.find(group => group.number === groupNumber);
                if (result) {
                    setGroupExists(true)
                    setFacultyName(result.facultyName)
                    setCourseNumber(result.courseNumber)
                }

                else {setGroupExists(false)}
            }
            fetchAndSetGroupExistance()

        }, [groupNumber])


        useEffect(() => {
            const fetchAndSetFacultyExistance = async () => {
                const rows = await fetchFaculty();
                const result = rows.find(faculty => faculty.name === facultyName);
                if (result) {setFacultyExists(true)}
                else {setFacultyExists(false)}
            }
            fetchAndSetFacultyExistance()

        }, [facultyName])


        const click = async () => {
            try {
                if (isLogin) {
                    await login(email, password);
                } else {
                        await createCourse({number: courseNumber});
                        await createFaculty(facultyName, facultyStudentsNumber, dean);
                        const academicPerformance = await createAcademicPerformance(classesNumber, averageMark);
                        const academicPerformanceId = academicPerformance.id;
                        await createGroup(groupNumber, tutorName, groupStudentsNumber, courseNumber, facultyName);

                    const Registration = async () => {
                        try {
                            await registration(username, surname, gender, birthdate, email, password, fundingType, studyForm, educationLevel, courseNumber, facultyName, academicPerformanceId, groupNumber)
                        } catch (error) {
                            console.error(error);
                        }
                    };

                    Registration();
                }

                student.setEmail(email)
                student.setStudent(student)
                student.setIsAuth(true)
                setTimeout(() => {
                    history('/');
                }, 500);
            } catch
                (e) {
                alert(e.response.data.message)
            }
        }
        const onFinish = (values) => {
            console.log("Received values:", values);
        };
        return (
            <div style={{marginBottom: 100}}>
                {
                    isLogin ?

                        <div style={{display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", marginBottom: 100}}>
                            <Form
                                name="login"
                                initialValues={{remember: true}}
                                onFinish={onFinish}
                                style={{width: 300}}
                            >
                                <Title level={3} style={{textAlign: "center"}}>Авторизация</Title>
                                <Form.Item
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                    rules={[{required: true, message: "Пожалуйста, введите вашу почту!"}]}
                                >
                                    <Input placeholder="Электронная почта пользователя"/>
                                </Form.Item>
                                <Form.Item
                                    value={password}
                                    onChange={e => setPassword(e.target.value)}
                                    name="password"
                                    rules={[{required: true, message: "Пожалуйста, введите ваш пароль!"}]}
                                >
                                    <Input.Password placeholder="Пароль"/>
                                </Form.Item>
                                <Form.Item>
                                    <Button onClick={click} type="primary" htmlType="submit" style={{width: "100%"}}>
                                        Войти
                                    </Button>
                                </Form.Item>
                            </Form>
                        </div> :
                        <div style={{display: "flex", justifyContent: "center", height: "100vh", paddingBottom: 100}}>
                            <Form
                                name="registration"
                                initialValues={{remember: true}}
                                onFinish={onFinish}
                                style={{width: 300}}
                            >
                                <Title level={3} style={{textAlign: "center"}}>Регистрация</Title>
                                <Form.Item
                                    name="username"
                                    value={username}
                                    onChange={e => setUsername(e.target.value)}
                                    rules={[{required: true, message: "Пожалуйста, введите ваше имя!"}]}
                                >
                                    <Input placeholder="Имя"/>
                                </Form.Item>
                                <Form.Item
                                    name="surname"
                                    value={surname}
                                    onChange={e => setSurname(e.target.value)}
                                    rules={[{required: true, message: "Пожалуйста, введите вашу фамилию!"}]}
                                >
                                    <Input placeholder="Фамилия"/>
                                </Form.Item>
                                <Form.Item
                                    name="gender"
                                    rules={[{required: true, message: "Пожалуйста, введите ваш пол!"}]}
                                >
                                    <Select placeholder="Пол"
                                            onChange={value => setGender(value)}>
                                        <Option value="Мужской">Мужской</Option>
                                        <Option value="Женский">Женский</Option>
                                    </Select>
                                </Form.Item>
                                <Form.Item
                                    name="birthdate"

                                    rules={[{required: true, message: "Пожалуйста, введите вашу дату рождения!"}]}
                                >
                                    <DatePicker onChange={value => setBirthdate(value.format('DD/MM/YYYY'))}
                                                placeholder="Дата рождения"/>
                                </Form.Item>
                                <Form.Item
                                    name="email"
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                    rules={[{required: true, message: "Пожалуйста, введите вашу электронную почту!"}]}
                                >
                                    <Input placeholder="Электронная почта" type="email"/>
                                </Form.Item>
                                <Form.Item
                                    name="password"
                                    value={password}
                                    onChange={e => setPassword(e.target.value)}
                                    rules={[{required: true, message: "Пожалуйста, введите ваш пароль!"}]}
                                >
                                    <Input.Password placeholder="Пароль"/>
                                </Form.Item>

                                <Title level={5} style={{textAlign: "center"}}>Заполните анкетные данные</Title>
                                <Form.Item
                                    name="group"
                                    value={groupNumber}
                                    onChange={e => setGroupNumber(e.target.value)}
                                    rules={[{required: true, message: "Пожалуйста, введите номер вашей группы!"}]}
                                >
                                    <Input placeholder="Номер группы"/>
                                </Form.Item>
                                {!groupExists &&
                                    <Form.Item
                                        name="tutorName"
                                        value={tutorName}
                                        onChange={e => setTutorName(e.target.value)}
                                        rules={[{required: true, message: "Пожалуйста, введите имя вашего куратора!"}]}
                                    >
                                        <Input placeholder="Имя куратора"/>
                                    </Form.Item>}
                                {!groupExists &&
                                    <Form.Item
                                        name="groupStudentsNumber"
                                        value={groupStudentsNumber}
                                        onChange={e => setGroupStudentsNumber(e.target.value)}
                                        rules={[{required: true, message: "Сколько студентов в вашей группе?"}]}
                                    >
                                        <Input placeholder="Количество студентов в группе"/>
                                    </Form.Item>
                                }
                                {!groupExists &&
                                    <Form.Item
                                        name="course"
                                        value={courseNumber}
                                        onChange={e => setCourseNumber(e.target.value)}
                                        rules={[{required: true, message: "Пожалуйста, введите ваш курс!"}]}
                                    >
                                        <Input placeholder="Курс"/>
                                    </Form.Item>
                                }
                                {!groupExists &&
                                    <Form.Item
                                        name="faculty"
                                        value={facultyName || ""}
                                        onChange={e => setFacultyName(e.target.value)}
                                        rules={[{required: true, message: "Пожалуйста, введите ваш факультет!"}]}
                                    >
                                        <Input placeholder="Факультет"/>
                                    </Form.Item>
                                }
                                {!groupExists && !facultyExists &&
                                    <Form.Item
                                        name="dean"
                                        value={dean || ""}
                                        onChange={e => setDean(e.target.value)}
                                        rules={[{required: true, message: "Пожалуйста, введите декана!"}]}
                                    >
                                        <Input placeholder="Декан"/>
                                    </Form.Item>
                                }
                                {!groupExists && !facultyExists &&
                                    <Form.Item
                                        name="facultyStudentsNumber"
                                        value={facultyStudentsNumber || ""}
                                        onChange={e => setFacultyStudentsNumber(e.target.value)}
                                        rules={[{required: true, message: "Сколько студентов на вашем факультете?"}]}
                                    >
                                        <Input placeholder="Количество студентов на факультете"/>
                                    </Form.Item>
                                }
                                <Form.Item
                                    name="classesNumber"
                                    value={classesNumber}
                                    onChange={e => setClassesNumber(e.target.value)}
                                    rules={[{required: true, message: "Пожалуйста, введите количество посещаемых курсов!"}]}
                                >
                                    <Input placeholder="Количество курсов"/>
                                </Form.Item>

                                <Form.Item
                                    name="averageMark"
                                    value={averageMark}
                                    onChange={e => setAverageMark(e.target.value)}
                                    rules={[{required: true, message: "Пожалуйста, введите ваш средний балл!"}]}
                                >
                                    <Input placeholder="Средний балл"/>
                                </Form.Item>

                                <Form.Item
                                    name="studyForm"
                                    rules={[{required: true, message: "Пожалуйста, выберите форму обучения!"}]}
                                >
                                    <Select placeholder="Форма обучения" onChange={value => setStudyForm(value)}>
                                        <Option value="Очная">Очная</Option>
                                        <Option value="Заочная">Заочная</Option>
                                    </Select>
                                </Form.Item>
                                <Form.Item
                                    name="fundingType"
                                    rules={[{required: true, message: "Пожалуйста, выберите вид финансирования!"}]}
                                >
                                    <Select placeholder="Вид финансирования" onChange={value => setFundingType(value)}>
                                        <Option value="Бюджетная форма">Бюджетная форма</Option>
                                        <Option value="Платная форма">Платная форма</Option>
                                    </Select>
                                </Form.Item>
                                <Form.Item
                                    name="educationLevel"
                                    rules={[{required: true, message: "Пожалуйста, выберите уровень образования!"}]}
                                >
                                    <Select placeholder="Уровень образования" onChange={value => setEducationLevel(value)}>
                                        <Option value="Бакалавриат">Бакалавриат</Option>
                                        <Option value="Магистратура">Магистратура</Option>
                                        <Option value="Аспирантура">Аспирантура</Option>
                                        <Option value="Специалитет">Специалитет</Option>
                                    </Select>
                                </Form.Item>
                                <Form.Item>
                                    <Button onClick={click} type="primary" htmlType="submit"
                                            style={{width: "100%", bottom: 10, top: 10}}>
                                        Зарегистрироваться
                                    </Button>
                                </Form.Item>
                            </Form>
                        </div>
                }
            </div>
        );
    })
;

export default Auth;