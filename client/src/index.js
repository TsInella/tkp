import React, {createContext} from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import StudentList from "./students/StudentList";

export const Context = createContext(null)
console.log(process.env.REACT_APP_API_URL)

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
    <Context.Provider value={{
        student: new StudentList(),
    }}>
        <App />

    </Context.Provider>,

)
