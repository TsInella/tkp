import React from 'react';
import users_db from '../../data/users_db'
import {Button, Card, Form, Input} from "antd";
import style from './Account.module.css'



const Account = ({currentUserID}) => {
    const currentAccount = users_db.find(item => item.key === currentUserID);
    console.log(currentAccount)
    return (
        <div className={style.wrapper}>
            <div className={style.card}>
                <div className={style.title}>{currentAccount.username} {' '} {currentAccount.surname}</div>
                <div className={style.field}> Пол: <Input style={{width: 250}} defaultValue={currentAccount.gender}/> </div>
                <div className={style.field}> Дата рождения: <Input style={{width: 250}} defaultValue={currentAccount.birthdate}/> </div>
                <div className={style.field}> Email: <Input style={{width: 250}} defaultValue={currentAccount.email}/> </div>
                <div className={style.field}> Пароль: <Input style={{width: 250}} defaultValue={currentAccount.password}/> </div>
                <div className={style.field}> Номер группы: <Input style={{width: 250}} defaultValue={currentAccount.group}/> </div>
                <div className={style.field}> Курс: <Input style={{width: 250}} defaultValue={currentAccount.course}/> </div>
                <div className={style.field}> Форма обучения: <Input style={{width: 250}} defaultValue={currentAccount.studyForm}/> </div>
                <div className={style.field}> Вид финансирования: <Input style={{width: 250}} defaultValue={currentAccount.fundingType}/> </div>
                <div className={style.field}> Уровень образования: <Input style={{width: 250}} defaultValue={currentAccount.educationLevel}/> </div>
                <div className={style.button}>
                    <Button type="primary" htmlType="submit" style={{background: "#dc4840", width: "150px"}}>
                        Выйти из аккаунта
                    </Button>
                    <Button type="primary" htmlType="submit" style={{width: "180px"}}>
                        Сохранить изменения
                    </Button>
                </div>
            </div>

        </div>
    );
};

export default Account;