import React from "react";
import {BrowserRouter} from "react-router-dom";
import Head from "./components/header/Head";
import Foot from "./components/footer/Foot";
import {observer} from "mobx-react-lite";
import AppRouter from "./AppRoutes";



const App = observer( () => {

    return (
        <BrowserRouter>
            <Head/>
            <AppRouter/>
            <Foot/>
        </BrowserRouter>

    );
});

export default App;
