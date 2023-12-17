import style from './dataPage.module.css'
import {SearchOutlined} from '@ant-design/icons';
import React, {useEffect, useRef, useState} from 'react';
import Highlighter from 'react-highlight-words';
import {Button, Input, Space, Table} from 'antd';
import {fetchStudents} from "../../http/studentAPI";

const DataPage = () => {
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef(null);

    const [rows, setRows] = useState([]);
    useEffect(() => {
        const fetchAndSetStudents = async () => {
            const rows = await fetchStudents();
            setRows(rows);
        };
        fetchAndSetStudents();
    }, []);

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
                    placeholder={`Search ${dataIndex}`}
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
                        Search
                    </Button>
                    <Button
                        onClick={() => clearFilters && handleReset(clearFilters)}
                        size="small"
                        style={{
                            width: 90,
                        }}
                    >
                        Reset
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
                        Filter
                    </Button>
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            close();
                        }}
                    >
                        close
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
            dataIndex: 'group',
            key: 'group',
            ...getColumnSearchProps('group'),
        },
        {
            title: 'Курс',
            dataIndex: 'course',
            key: 'course',
            ...getColumnSearchProps('course'),
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

    ];

    return (
        <div className={style.wrap}>
            <div>
                <div className={style.upperRow}>
                    <h1>Информация о студентах</h1>
                </div>
                <Table className = {style.table} pagination={false} columns={columns} dataSource={rows}/>
            </div>
        </div>
    );
};

export default DataPage;