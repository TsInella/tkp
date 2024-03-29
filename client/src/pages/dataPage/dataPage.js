import style from './dataPage.module.css'
import {SearchOutlined} from '@ant-design/icons';
import React, {useEffect, useRef, useState} from 'react';
import Highlighter from 'react-highlight-words';
import {Button, Input, Space, Table} from 'antd';
import {fetchAcademicPerformance, fetchStudents} from "../../http/studentAPI";

const DataPage = () => {
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef(null);

    const [studentRows, setStudentRows] = useState([]);
    const [performanceRows, setPerformanceRows] = useState([]);

    useEffect(() => {
        const fetchAndSetStudents = async () => {
            const rows = await fetchStudents();
            setStudentRows(rows);
        };
        fetchAndSetStudents();
    }, []);

    useEffect(() => {
        const fetchAndSetAcademicPerformance = async () => {
            const rows = await fetchAcademicPerformance();
            setPerformanceRows(rows);
        };
        fetchAndSetAcademicPerformance();
    }, []);

    const totalArray = studentRows.map(obj1 => {
        const matchingObj2 = performanceRows.find(obj2 => obj2.id === obj1.academicPerformanceId);
        return { ...obj1, ...matchingObj2 };
    });

    console.log(totalArray);


    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
    };
    const handleReset = (clearFilters) => {
        clearFilters();
        setSearchText('');
    };
    const getColumnSearchProps = (dataIndex) => ({
        filterDropdown: ({setSelectedKeys, selectedKeys, confirm, clearFilters, close}) => (
            <div
                style={{
                    padding: 8,
                }}
                onKeyDown={(e) => e.stopPropagation()}
            >
                <Input
                    ref={searchInput}
                    placeholder={`Искать ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
                    style={{
                        marginBottom: 8,
                        display: 'block',
                    }}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
                        icon={<SearchOutlined/>}
                        size="small"
                        style={{
                            width: 90,
                        }}
                    >
                        Искать
                    </Button>
                    <Button
                        onClick={() => clearFilters && handleReset(clearFilters)}
                        size="small"
                        style={{
                            width: 90,
                        }}
                    >
                        Сбросить
                    </Button>
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            confirm({
                                closeDropdown: false,
                            });
                            setSearchText(selectedKeys[0]);
                            setSearchedColumn(dataIndex);
                        }}
                    >
                        Фильтровать
                    </Button>
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            close();
                        }}
                    >
                        Закрыть
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: (filtered) => (
            <SearchOutlined
                style={{
                    color: filtered ? '#1677ff' : undefined,
                }}
            />
        ),
        onFilter: (value, record) =>
            record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),

        onFilterDropdownOpenChange: (visible) => {
            if (visible) {
                setTimeout(() => searchInput.current?.select(), 100);
            }
        },
        render: (text) =>
            searchedColumn === dataIndex ? (
                <Highlighter
                    highlightStyle={{
                        backgroundColor: '#abdbff',
                        padding: 0,
                    }}
                    searchWords={[searchText]}
                    autoEscape
                    textToHighlight={text ? text.toString() : ''}
                />
            ) : (
                text
            ),
    });

    const columns = [
        {
            title: '',
            dataIndex: 'key',
            key: 'key',
            ...getColumnSearchProps('key'),
        },
        {
            title: 'Имя',
            dataIndex: 'username',
            key: 'username',
            ...getColumnSearchProps('username'),
            render: (text) => <h4>{text}</h4>,
        },
        {
            title: 'Фамилия',
            dataIndex: 'surname',
            key: 'surname',
            ...getColumnSearchProps('surname'),
            render: (text) => <h4>{text}</h4>,
        },
        {
            title: 'Пол',
            dataIndex: 'gender',
            key: 'gender',
            ...getColumnSearchProps('gender'),
        },
        {
            title: 'Дата рождения',
            dataIndex: 'birthdate',
            key: 'birthdate',
            ...getColumnSearchProps('birthdate'),
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
            ...getColumnSearchProps('email'),
        },
        {
            title: 'Группа',
            dataIndex: 'groupNumber',
            key: 'groupNumber',
            ...getColumnSearchProps('groupNumber'),
        },
        {
            title: 'Курс',
            dataIndex: 'courseNumber',
            key: 'courseNumber',
            ...getColumnSearchProps('courseNumber'),
        },
        {
            title: 'Факультет',
            dataIndex: 'facultyName',
            key: 'facultyName',
            ...getColumnSearchProps('facultyName'),
        },
        {
            title: 'Вид финансирования',
            dataIndex: 'fundingType',
            key: 'fundingType',
            ...getColumnSearchProps('fundingType'),
        },
        {
            title: 'Форма обучения',
            dataIndex: 'studyForm',
            key: 'studyForm',
            ...getColumnSearchProps('studyForm'),
        },
        {
            title: 'Уровень образования',
            dataIndex: 'educationLevel',
            key: 'educationLevel',
            ...getColumnSearchProps('educationLevel'),
        },
        {
            title: 'Количество курсов',
            dataIndex: 'classesNumber',
            key: 'classesNumber',
            ...getColumnSearchProps('classesNumber'),
        },
        {
            title: 'Средняя оценка',
            dataIndex: 'averageMark',
            key: 'averageMark',
            ...getColumnSearchProps('averageMark'),
        },

    ];

    return (
        <div className={style.wrap}>
            <div>
                <div className={style.upperRow}>
                    <h1>Информация о студентах</h1>
                </div>
                <Table size = "small" className = {style.table} pagination={false} columns={columns} dataSource={totalArray}/>
            </div>
        </div>
    );
};

export default DataPage;