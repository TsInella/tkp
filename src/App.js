import React from "react";
import Auth from "./pages/authPage/Auth";
import Registration from "./pages/registrationPage/Registration";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Head from "./components/header/Head";
import Foot from "./components/footer/Foot";
import DataPage from "./pages/dataPage/dataPage";


function App() {
    return (
        <BrowserRouter>
            <Head/>
            <Routes>
                <Route path="/personalAccount" element={<div>страничка в разработке))</div>}/>
                <Route path="/" element={<DataPage/>}/>
                <Route path="/auth" element={<Auth/>}/>
                <Route path="/registration" element={<Registration/>}/>
            </Routes>
            <Foot/>
        </BrowserRouter>

    );
}

export default App;
