import React, {useContext} from 'react';
import {Button, Layout, Menu, theme} from 'antd';
import MenuItem from "antd/es/menu/MenuItem";
import {NavLink, useNavigate} from "react-router-dom";
import {Context} from "../../index";
import {ACCOUNT_ROUTE} from "../../utils/consts";

const {Header, Content, Footer} = Layout;
// import styles from './Head.css'
const Head = () => {
    const {
        token: {colorBgContainer},
    } = theme.useToken();
    const history = useNavigate()
    const {student} = useContext(Context)
    console.log(student.isAuth)
    return (
        <Layout className="layout">
            <Menu
                theme="light"
                mode="horizontal"
                style={{paddingLeft: 140, justifyContent: 'center'}}
            >
                <MenuItem style={{marginLeft: 20}}><NavLink to="/">Главная</NavLink></MenuItem>
                <MenuItem style={{marginLeft: 20}}><NavLink to="/login">Вход</NavLink></MenuItem>
                <MenuItem style={{marginLeft: 20}}><NavLink to="/registration">Регистрация</NavLink></MenuItem>
                {student.isAuth &&
                    <MenuItem style={{left: 500}}>
                        <Button onClick={() => history(ACCOUNT_ROUTE)} type="primary" htmlType="submit"
                                style={{width: "140px"}}>
                            Личный кабинет
                        </Button>
                    </MenuItem>}

            </Menu>
        </Layout>
    );
};

export default Head;