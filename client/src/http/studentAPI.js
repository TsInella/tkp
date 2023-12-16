import {$authHost, $host} from "./index";
import { jwtDecode } from "jwt-decode";
export const registration = async (username, surname, gender, birthdate, email, password, group, course, fundingType, studyForm, educationLevel) => {
    const {data} = await $host.post('api/student/registration', {username, surname, gender, birthdate, email, password, group, course, fundingType, studyForm, educationLevel})
    localStorage.setItem('token', data.token)
    return jwtDecode(data.token)
}

export const login = async (email, password) => {
    const {data} = await $host.post('api/student/login', {email, password})
    localStorage.setItem('token', data.token)
    return jwtDecode(data.token)
}

export const check = async () => {
    const {data} = await $authHost.get('api/student/auth')
    localStorage.setItem('token', data.token)
    return jwtDecode(data.token)
}

export const fetchStudents = async () => {
    const {data} = await $host.get('api/student')
    console.log(data)
    return (data)
}

export const fetchOneStudent = async (email) => {
    const {data} = await $host.get('api/student/'+email)
    console.log(data)
    return (data)
}


