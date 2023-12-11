import {makeAutoObservable} from "mobx";

export default class StudentList {
    constructor() {
        this._isAuth = false
        this._student = {}
        makeAutoObservable(this)
    }

    setIsAuth(bool) {
        this._isAuth = bool
    }
    setStudent(student) {
        this._student = student
    }

    get isAuth() {
        return this._isAuth
    }
    get student() {
        return this._student
    }
}