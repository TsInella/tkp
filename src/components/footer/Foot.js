import React from 'react';
import {Layout} from "antd";

const Foot = () => {
    return (
        <Layout
            style={{
            textAlign: 'center',
            position:'absolute',
            left: 0,
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