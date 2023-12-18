import {$host} from "./index";
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

export const fetchStudents = async () => {
    const {data} = await $host.get('api/student')
    console.log(data)
    return (data)
}

export const fetchOneStudent = async (email) => {
    const {data} = await $host.get('api/student/'+email)
    console.log("fetchOneStudent")
    return (data)
}

export const updateOneStudent = async (email, newGender, newBirthdate, newGroup, newCourse, newFundingType, newStudyForm, newEducationLevel) => {
    console.log("updateOneStudent")
    const {data} = await $host.put('api/student/'+email, {newGender, newBirthdate, newGroup, newCourse, newFundingType, newStudyForm, newEducationLevel})

    return (data)
}
//group
export const createGroup = async (number, tutorName, studentsNumber, courseNumber, facultyName ) => {
    const {data} = await $host.post('api/group', {number, tutorName, studentsNumber, courseNumber, facultyName})
    return data
}
export const fetchGroup = async () => {
    const {data} = await $host.get('api/group')
    return data
}

//faculty
export const createFaculty = async (name, studentsNumber, dean) => {
    const {data} = await $host.post('api/faculty', {name, studentsNumber, dean})
    return data
}
export const fetchFaculty = async () => {
    const {data} = await $host.get('api/faculty')
    return data
}

//academicPerformance
export const createAcademicPerformance = async (classesNumber, averageMark) => {
    const {data} = await $host.post('api/academicPerformance', {classesNumber, averageMark})
    return data
}
export const fetchAcademicPerformance = async () => {
    const {data} = await $host.get('api/academicPerformance')
    return data
}

//course
export const createCourse = async (number) => {
    const {data} = await $host.post('api/course', {number})
    return data
}
export const fetchCourse = async () => {
    const {data} = await $host.get('api/course')
    return data
}
