import React, {useContext, useEffect} from "react";
import {BrowserRouter} from "react-router-dom";
import Head from "./components/header/Head";
import Foot from "./components/footer/Foot";
import {observer} from "mobx-react-lite";
import {Context} from "./index";
import {check} from "./http/studentAPI";
import AppRouter from "./AppRoutes";



const App = observer( () => {
    const {student} = useContext(Context)
    useEffect(() => {
        setTimeout(() => {
            check().then(data => {
                student.setStudent(data)
                student.setIsAuth(true)
            })
        }, 2000)
    }, [])

    return (
        <BrowserRouter>
            <Head/>
            <AppRouter/>
            <Foot/>
        </BrowserRouter>

    );
});

export default App;
