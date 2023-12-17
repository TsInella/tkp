import React, {useContext, useEffect, useState} from 'react';
import users_db from '../../data/users_db'
import {Button, DatePicker, Input, Select} from "antd";
import style from './Account.module.css'
import dayjs from "dayjs";
import {Context} from "../../index";
import {useNavigate} from "react-router-dom";
import {fetchOneStudent, fetchStudents} from "../../http/studentAPI";

const {Option} = Select;


const Account = () => {
    const history = useNavigate()

    const {student} = useContext(Context)
    const email = student.email;
    const [rows, setRows] = useState([]);
    const fetchAndSetStudents = async () => {
        const rows = await fetchOneStudent(email);
        setRows(rows);
    };
    fetchAndSetStudents();

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
                    <Select style={{width: 250}} defaultValue={rows.gender} placeholder="Пол">
                        <Option value="male">Мужской</Option>
                        <Option value="female">Женский</Option>
                    </Select>
                </div>

                <div className={style.field}> Дата рождения:
                    <DatePicker style={{width: 250}} defaultValue={dayjs(rows.birthdate, 'DD-MM-YYYY')}/>
                </div>

                <div className={style.field}> Номер группы:
                    <Input style={{width: 250}} defaultValue={rows.group}/>
                </div>

                <div className={style.field}> Курс:
                    <Input style={{width: 250}} defaultValue={rows.course}/>
                </div>

                <div className={style.field}> Форма обучения:
                    <Select style={{width: 250}} defaultValue={rows.studyForm} placeholder="Форма обучения">
                        <Option value="fullTime">Очная</Option>
                        <Option value="partTime">Заочная</Option>
                    </Select>
                </div>

                <div className={style.field}> Вид финансирования:
                    <Select style={{width: 250}} defaultValue={rows.fundingType}
                            placeholder="Вид финансирования">
                        <Option value="budget">Бюджетная форма</Option>
                        <Option value="paid">Платная форма</Option>
                    </Select>
                </div>

                <div className={style.field}> Уровень образования:
                    <Select style={{width: 250}} defaultValue={rows.educationLevel}
                            placeholder="Уровень образования">
                        <Option value="bachelor">Бакалавриат</Option>
                        <Option value="master">Магистратура</Option>
                        <Option value="phd">Аспирантура</Option>
                        <Option value="specialist">Специалитет</Option>
                    </Select>
                </div>


                <div className={style.button}>
                    <Button onClick={() => logOut()} type="primary" htmlType="submit" style={{background: "#dc4840", width: "150px"}}>
                        Выйти из аккаунта
                    </Button>

                    <Button type="primary" htmlType="submit" style={{width: "180px"}}>
                        Сохранить изменения
                    </Button>
                </div>
            </div>
            }

        </div>
    );

};

export default Account;