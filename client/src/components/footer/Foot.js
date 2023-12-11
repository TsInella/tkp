import React from 'react';
import {Layout} from "antd";

const Foot = () => {
    return (
        <Layout
            style={{
            textAlign: 'center',
            position:'relative',
            left: 0,
            padding: 30,
            bottom: 0,
            width: '100%',
            height: '80px',
        }}
            >
            TKP ©2023 Created by "Нерусские"
        </Layout>

    );
};

export default Foot;