import React, {useContext} from 'react';
import {Routes, Route, Navigate} from 'react-router-dom'
import {authRoutes, publicRoutes} from "./routes";
import {MAIN_ROUTE} from "./utils/consts";
import {Context} from "./index";

const AppRouter = () => {
    const {student} = useContext(Context)

    console.log(student)
    return (
        <Routes>
            {student.isAuth && authRoutes.map(({path, Component}) =>
                <Route key={path} path={path} element={<Component/>} exact/>
            )}
            {publicRoutes.map(({path, Component}) =>
                <Route key={path} path={path} element={<Component/>} exact/>
            )}
            <Route path='*' element={<Navigate to={MAIN_ROUTE}/>} />
        </Routes>
    );
};

export default AppRouter;


