import React from "react";
import Auth from "./pages/authPage/Auth";
import Registration from "./pages/registrationPage/Registration";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Head from "./components/header/Head";
import Foot from "./components/footer/Foot";
import DataPage from "./pages/dataPage/dataPage";
import Account from "./pages/account/Account";

//current user ID это айди текущего пользователя, который выдается при регистрации, пока липовый, а потом когда будем делать сервак напишем норм

let currentUserID = 1;
function App() {
    return (
        <BrowserRouter>
            <Head/>
            <Routes>
                <Route path="/personalAccount" element={<Account currentUserID={currentUserID} />}/>
                <Route path="/" element={<DataPage/>}/>
                <Route path="/auth" element={<Auth/>}/>
                <Route path="/registration" element={<Registration/>}/>
            </Routes>
            <Foot/>
        </BrowserRouter>

    );
}

export default App;
