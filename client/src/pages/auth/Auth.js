import React, {useContext, useState} from 'react';
import {Button, DatePicker, Form, Input, Select, Typography} from "antd";
import {useLocation, useNavigate} from "react-router-dom";
import {LOGIN_ROUTE, MAIN_ROUTE} from "../../utils/consts";
import {observer} from "mobx-react-lite";
import {login, registration} from "../../http/studentAPI";
import {Context} from "../../index";

const {Title} = Typography;
const {Option} = Select;

const Auth = observer(() => {
    const {student} = useContext(Context)
    const location = useLocation()
    const history = useNavigate()
    const isLogin = location.pathname === LOGIN_ROUTE;
    console.log(isLogin)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [username, setUsername] = useState('')
    const [surname, setSurname] = useState('')
    const [gender, setGender] = useState('')
    const [birthdate, setBirthdate] = useState('')
    const [group, setGroup] = useState('')
    const [course, setCourse] = useState('')
    const [fundingType, setFundingType] = useState('')
    const [studyForm, setStudyForm] = useState('')
    const [educationLevel, setEducationLevel] = useState('')

    const click = async () => {
        try {
            let data;
            if (isLogin) {
                data = await login(email, password);
            } else {
                data = await registration(username, surname, gender, birthdate, email, password, group, course, fundingType, studyForm, educationLevel);
            }
            student.setStudent(student)
            student.setIsAuth(true)
            history(MAIN_ROUTE)
        } catch (e) {
            alert(e.response.data.message)
        }
    }
    const onFinish = (values) => {
        console.log("Received values:", values);
    }
    const onChange = (date, dateString) => {
        console.log(date, dateString);
    };
    return (
        <div>
            {
                isLogin ?

                    <div style={{display: "flex", justifyContent: "center", alignItems: "center", height: "100vh"}}>
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
                    <div style={{display: "flex", justifyContent: "center", height: "100vh"}}>
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
                                <DatePicker onChange={value => setBirthdate(value)} placeholder="Дата рождения"/>
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
                                value={group}
                                onChange={e => setGroup(e.target.value)}
                                rules={[{required: true, message: "Пожалуйста, введите номер вашей группы!"}]}
                            >
                                <Input placeholder="Номер группы"/>
                            </Form.Item>

                            <Form.Item
                                name="course"
                                value={course}
                                onChange={e => setCourse(e.target.value)}
                                rules={[{required: true, message: "Пожалуйста, введите ваш курс!"}]}
                            >
                                <Input placeholder="Курс"/>
                            </Form.Item>


                            <Form.Item
                                name="studyForm"
                                rules={[{required: true, message: "Пожалуйста, выберите форму обучения!"}]}
                            >
                                <Select placeholder="Форма обучения" onChange={value => setStudyForm(value)}>
                                    <Option value="fullTime">Очная</Option>
                                    <Option value="partTime">Заочная</Option>
                                </Select>
                            </Form.Item>
                            <Form.Item
                                name="fundingType"
                                rules={[{required: true, message: "Пожалуйста, выберите вид финансирования!"}]}
                            >
                                <Select placeholder="Вид финансирования" onChange={value => setFundingType(value)}>
                                    <Option value="budget">Бюджетная форма</Option>
                                    <Option value="paid">Платная форма</Option>
                                </Select>
                            </Form.Item>
                            <Form.Item
                                name="educationLevel"
                                rules={[{required: true, message: "Пожалуйста, выберите уровень образования!"}]}
                            >
                                <Select placeholder="Уровень образования" onChange={value => setEducationLevel(value)}>
                                    <Option value="bachelor">Бакалавриат</Option>
                                    <Option value="master">Магистратура</Option>
                                    <Option value="phd">Аспирантура</Option>
                                    <Option value="specialist">Специалитет</Option>
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
});

export default Auth;