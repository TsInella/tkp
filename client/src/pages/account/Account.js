import React from 'react';
import users_db from '../../data/users_db'
import {Button, DatePicker, Input, Select} from "antd";
import style from './Account.module.css'
import dayjs from "dayjs";

const {Option} = Select;


const Account = () => {
    const currentAccount = users_db.find(item => item.key === 1);
    console.log(currentAccount)
    const onChange = (date, dateString) => {
        console.log(date, dateString);
    };

    return (
        <div className={style.wrapper}>
            <div className={style.card}>
                <div
                    className={style.title}>{currentAccount.username} {' '} {currentAccount.surname}
                </div>
                

                <div className={style.field}> Пол:
                    <Select style={{width: 250}} defaultValue={currentAccount.gender} placeholder="Пол">
                        <Option value="male">Мужской</Option>
                        <Option value="female">Женский</Option>
                    </Select>
                </div>

                <div className={style.field}> Дата рождения:
                    <DatePicker style={{width: 250}} defaultValue={dayjs(currentAccount.birthdate, 'YYYY-DD-MM')}
                                onChange={onChange}/>
                </div>

                <div className={style.field}> Email:
                    <Input style={{width: 250}} defaultValue={currentAccount.email}/>
                </div>

                <div className={style.field}> Пароль:
                    <Input.Password style={{width: 250}} defaultValue={currentAccount.password} placeholder="Пароль"/>
                </div>

                <div className={style.field}> Номер группы:
                    <Input style={{width: 250}} defaultValue={currentAccount.group}/>
                </div>

                <div className={style.field}> Курс:
                    <Input style={{width: 250}} defaultValue={currentAccount.course}/>
                </div>

                <div className={style.field}> Форма обучения:
                    <Select style={{width: 250}} defaultValue={currentAccount.studyForm} placeholder="Форма обучения">
                        <Option value="fullTime">Очная</Option>
                        <Option value="partTime">Заочная</Option>
                    </Select>
                </div>

                <div className={style.field}> Вид финансирования:
                    <Select style={{width: 250}} defaultValue={currentAccount.fundingType}
                            placeholder="Вид финансирования">
                        <Option value="budget">Бюджетная форма</Option>
                        <Option value="paid">Платная форма</Option>
                    </Select>
                </div>

                <div className={style.field}> Уровень образования:
                    <Select style={{width: 250}} defaultValue={currentAccount.educationLevel}
                            placeholder="Уровень образования">
                        <Option value="bachelor">Бакалавриат</Option>
                        <Option value="master">Магистратура</Option>
                        <Option value="phd">Аспирантура</Option>
                        <Option value="specialist">Специалитет</Option>
                    </Select>
                </div>


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