import React from 'react';
import { Form, Input, Button, Typography } from "antd";
const { Title } = Typography;
const Auth = () => {
    const onFinish = (values) => {
        console.log("Received values:", values);
    }
    return (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
            <Form
                name="login"
                initialValues={{ remember: true }}
                onFinish={onFinish}
                style={{ width: 300 }}
            >
                <Title level={3} style={{ textAlign: "center" }}>Авторизация</Title>
                <Form.Item
                    name="username"
                    rules={[{ required: true, message: "Пожалуйста, введите ваше имя!" }]}
                >
                    <Input placeholder="Имя пользователя" />
                </Form.Item>
                <Form.Item
                    name="surname"
                    rules={[{ required: true, message: "Пожалуйста, введите вашу фамилию!" }]}
                >
                    <Input placeholder="Фамилия пользователя" />
                </Form.Item>
                <Form.Item
                    name="email"
                    rules={[{ required: true, message: "Пожалуйста, введите вашу почту!" }]}
                >
                    <Input placeholder="Электронная почта пользователя" />
                </Form.Item>
                <Form.Item
                    name="password"
                    rules={[{ required: true, message: "Пожалуйста, введите ваш пароль!" }]}
                >
                    <Input.Password placeholder="Пароль" />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit" style={{ width: "100%" }}>
                        Войти
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default Auth;