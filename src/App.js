import React from "react";
import Auth from "./pages/authPage/Auth";
import Registration from "./pages/registrationPage/Registration";
import {BrowserRouter, Route, Routes} from "react-router-dom";
function App() {
    return (
        <BrowserRouter>
            {/*<Header/>*/}
            <Routes>
                {/*<Route path="/" element={<MainPage/>}/>*/}
                <Route path="/auth" element={<Auth/>}/>
                <Route path="/registration" element={<Registration/>}/>
            </Routes>
            {/*<MainFooter/>*/}
        </BrowserRouter>

    );
}

export default App;
