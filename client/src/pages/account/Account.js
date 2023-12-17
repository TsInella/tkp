import React, {useContext, useEffect, useState} from 'react';
import users_db from '../../data/users_db'
import {Button, DatePicker, Input, Select} from "antd";
import style from './Account.module.css'
import dayjs from "dayjs";
import {Context} from "../../index";
import {useNavigate} from "react-router-dom";
import {fetchOneStudent, fetchStudents, updateOneStudent} from "../../http/studentAPI";

const {Option} = Select;


const Account = () => {
    const history = useNavigate()
    const [newGender, setNewGender] = useState('')
    const [newBirthdate, setNewBirthdate] = useState('')
    const [newGroup, setNewGroup] = useState('')
    const [newCourse, setNewCourse] = useState('')
    const [newFundingType, setNewFundingType] = useState('')
    const [newStudyForm, setNewStudyForm] = useState('')
    const [newEducationLevel, setNewEducationLevel] = useState('')
    const {student} = useContext(Context)
    const email = student.email;
    const [rows, setRows] = useState([]);

    useEffect(() => {
        const fetchAndSetStudents = async () => {
            const rows = await fetchOneStudent(email);
            setRows(rows);
        };
        fetchAndSetStudents();
    }, []);


    useEffect(() => {
        if (rows) {
            setNewGender(rows.gender);
            setNewBirthdate(rows.birthdate);
            setNewGroup(rows.group);
            setNewCourse(rows.course);
            setNewFundingType(rows.fundingType);
            setNewStudyForm(rows.studyForm);
            setNewEducationLevel(rows.educationLevel);
        }
    }, [rows]);

    console.log(newGroup)

    const Save = async () => {
        await updateOneStudent(email, newGender, newBirthdate, newGroup, newCourse, newFundingType, newStudyForm, newEducationLevel)
        alert("Успешно сохранено!");
    }

    const logOut = () => {
        student.setStudent({})
        student.setIsAuth(false)
        history('/')
    }


    console.log(rows.birthdate)

    return (
        <div className={style.wrapper}>
            {rows.username &&
            <div className={style.card}>
                <div
                    className={style.title}>{rows.username} {' '} {rows.surname}
                </div>

                <div className={style.field}> Пол:
                    <Select onChange={value => setNewGender(value)} style={{width: 250}} defaultValue={rows.gender} placeholder="Пол">
                        <Option value="Мужской">Мужской</Option>
                        <Option value="Женский">Женский</Option>
                    </Select>
                </div>

                <div className={style.field}> Дата рождения:
                    <DatePicker onChange={e => setNewBirthdate(e.target.value)} style={{width: 250}} defaultValue={dayjs(rows.birthdate, 'DD-MM-YYYY')}/>
                </div>

                <div className={style.field}> Номер группы:
                    <Input onChange={e => setNewGroup(e.target.value)} style={{width: 250}} defaultValue={rows.group}/>
                </div>

                <div className={style.field}> Курс:
                    <Input onChange={e => setNewCourse(e.target.value)} style={{width: 250}} defaultValue={rows.course}/>
                </div>

                <div className={style.field}> Форма обучения:
                    <Select onChange={value => setNewStudyForm(value)} style={{width: 250}} defaultValue={rows.studyForm} placeholder="Форма обучения">
                        <Option value="Очная">Очная</Option>
                        <Option value="Заочная">Заочная</Option>
                    </Select>
                </div>

                <div className={style.field}> Вид финансирования:
                    <Select onChange={value => setNewFundingType(value)} style={{width: 250}} defaultValue={rows.fundingType}
                            placeholder="Вид финансирования">
                        <Option value="Бюджетная форма">Бюджетная форма</Option>
                        <Option value="Платная форма">Платная форма</Option>
                    </Select>
                </div>

                <div className={style.field}> Уровень образования:
                    <Select onChange={value => setNewEducationLevel(value)} style={{width: 250}} defaultValue={rows.educationLevel}
                            placeholder="Уровень образования">
                        <Option value="Бакалавриат">Бакалавриат</Option>
                        <Option value="Магистратура">Магистратура</Option>
                        <Option value="Аспирантура">Аспирантура</Option>
                        <Option value="Специалитет">Специалитет</Option>
                    </Select>
                </div>


                <div className={style.button}>
                    <Button onClick={() => logOut()} type="primary" htmlType="submit" style={{background: "#dc4840", width: "150px"}}>
                        Выйти из аккаунта
                    </Button>

                    <Button onClick={Save} type="primary" htmlType="submit" style={{width: "180px"}}>
                        Сохранить изменения
                    </Button>
                </div>
            </div>
            }

        </div>
    );

};

export default Account;