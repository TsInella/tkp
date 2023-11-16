import React from 'react';
import {Button, Layout, Menu, theme} from 'antd';
import MenuItem from "antd/es/menu/MenuItem";
import {FrownFilled} from "@ant-design/icons";
import {NavLink} from "react-router-dom";
const { Header, Content, Footer } = Layout;
// import styles from './Head.css'
const Head = () => {
    const {
        token: { colorBgContainer },
    } = theme.useToken();

    return (
        <Layout className="layout">
                {/*<div className={styles.demologo}*/}
                {/*/>*/}
                <Menu
                    theme="light"
                    mode="horizontal"
                    style = {{paddingLeft: 140, justifyContent: 'center'}}
                    >
                    <MenuItem style= {{marginLeft:20}}><NavLink to="/">Главная</NavLink></MenuItem>
                    <MenuItem  style= {{marginLeft:20}}><NavLink to="/auth">Вход</NavLink></MenuItem>
                    <MenuItem  style= {{marginLeft:20}}><NavLink to="/registration">Регистрация</NavLink></MenuItem>

                    <MenuItem  style= {{left:500}}>
                        <NavLink to="/personalAccount">
                            <Button type="primary" htmlType="submit" style={{width: "140px"}}>
                                Личный кабинет
                            </Button>
                        </NavLink>
                    </MenuItem>

                </Menu>
        </Layout>
    );
};

export default Head;