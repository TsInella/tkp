import React from 'react';
import {Form, Input, Button, Typography, Select} from "antd";

const {Title} = Typography;
const {Option} = Select;
const Registration = () => {
    const onFinish = (values) => {
        console.log("Received values:", values);
    };
    return (
        <div style={{display: "flex", justifyContent: "center", alignItems: "center", height: "100vh"}}>
            <Form
                name="registration"
                initialValues={{remember: true}}
                onFinish={onFinish}
                style={{width: 300}}
            >
                <Title level={3} style={{textAlign: "center"}}>Регистрация</Title>
                <Form.Item
                    name="username"
                    rules={[{required: true, message: "Пожалуйста, введите ваше имя!"}]}
                >
                    <Input placeholder="Имя"/>
                </Form.Item>
                <Form.Item
                    name="surname"
                    rules={[{required: true, message: "Пожалуйста, введите вашу фамилию!"}]}
                >
                    <Input placeholder="Фамилия"/>
                </Form.Item>
                <Form.Item
                    name="gender"
                    rules={[{required: true, message: "Пожалуйста, введите ваш пол!"}]}
                >
                    <Select placeholder="Пол">
                        <Option value="male">Мужской</Option>
                        <Option value="female">Женский</Option>
                    </Select>
                </Form.Item>
                <Form.Item
                    name="birthdate"
                    rules={[{required: true, message: "Пожалуйста, введите вашу дату рождения!"}]}
                >
                    <Input placeholder="Дата рождения"/>
                </Form.Item>
                <Form.Item
                    name="email"
                    rules={[{required: true, message: "Пожалуйста, введите вашу электронную почту!"}]}
                >
                    <Input placeholder="Электронная почта" type="email"/>
                </Form.Item>
                <Form.Item
                    name="password"
                    rules={[{required: true, message: "Пожалуйста, введите ваш пароль!"}]}
                >
                    <Input.Password placeholder="Пароль"/>
                </Form.Item>

                <Title level={5} style={{textAlign: "center"}}>Заполните анкетные данные</Title>
                <Form.Item
                    name="group"
                    rules={[{required: true, message: "Пожалуйста, введите номер вашей группы!"}]}
                >
                    <Input placeholder="Номер группы"/>
                </Form.Item>

                <Form.Item
                    name="course"
                    rules={[{required: true, message: "Пожалуйста, введите ваш курс!"}]}
                >
                    <Input placeholder="Курс"/>
                </Form.Item>


                <Form.Item
                    name="studyForm"
                    rules={[{required: true, message: "Пожалуйста, выберите форму обучения!"}]}
                >
                    <Select placeholder="Форма обучения">
                        <Option value="fullTime">Очная</Option>
                        <Option value="partTime">Заочная</Option>
                    </Select>
                </Form.Item>
                <Form.Item
                    name="fundingType"
                    rules={[{required: true, message: "Пожалуйста, выберите вид финансирования!"}]}
                >
                    <Select placeholder="Вид финансирования">
                        <Option value="budget">Бюджетная</Option>
                        <Option value="paid">Платная</Option>
                    </Select>
                </Form.Item>
                <Form.Item
                    name="educationLevel"
                    rules={[{required: true, message: "Пожалуйста, выберите уровень образования!"}]}
                >
                    <Select placeholder="Уровень образования">
                        <Option value="bachelor">Бакалавриат</Option>
                        <Option value="master">Магистратура</Option>
                        <Option value="phd">Аспирантура</Option>
                        <Option value="specialist">Специалитет</Option>
                    </Select>
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit" style={{width: "100%", bottom:10}}>
                        Зарегистрироваться
                    </Button>
                </Form.Item>

            </Form>
        </div>
    );
};

export default Registration;