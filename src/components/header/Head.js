import React from 'react';
import { Layout, Menu, theme } from 'antd';
import MenuItem from "antd/es/menu/MenuItem";
import {FrownFilled} from "@ant-design/icons";
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
                    style = {{justifyContent: 'center'}}
                    >
                    <MenuItem style= {{marginLeft:20}}>Главная</MenuItem>
                    <MenuItem  style= {{marginLeft:20}}>Вход</MenuItem>
                    <MenuItem  style= {{marginLeft:20}}>Регистрация</MenuItem>
                    <MenuItem  style= {{left:500}} icon={<FrownFilled />}></MenuItem>
                </Menu>





        </Layout>
    );
};

export default Head;