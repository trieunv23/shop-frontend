import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Dropdown, Menu, Popconfirm, Space, Table } from 'antd';
import './styles.scss';
import Title from '../components/Title';
import axios from 'axios';
import { API_URL } from '../../../../constants/config';


const Customers = () => {
    const [users, setUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    
    useEffect(() => {
      const loadUsers = async() => {
        try {
          const response = await axios.get(`${API_URL}/get-users`);
          setUsers(response.data);
          setFilteredUsers(response.data);
          console.log(response);
        } catch (error) {
          console.log(error);
        }
      }

      loadUsers();
    }, []);

    const handleSearch = (e) => {
      const term = e.target.value;

      const filtered = users.filter(user => 
        user.userCode.toLowerCase().includes(term.toLowerCase()) || 
        user.profile.name.toLowerCase().includes(term.toLowerCase())
      );
    
      setFilteredUsers(filtered);
    }

    const columns = [
      {
          title: 'Mã khách hàng',
          dataIndex: 'userCode',
          key: 'userCode',
      },
      {
        title: 'Họ và Tên',
        dataIndex: ['profile', 'name'],
        key: 'name',
      },
      {
        title: 'Email',
        dataIndex: 'email',
        key: 'email',
      },
      {
        title: 'Số điện thoại',
        dataIndex: 'phoneNumber',
        key: 'phoneNumber',
      },
      {
        title: 'Trạng thái',
        dataIndex: 'status',
        key: 'status',
      },
      {
          title: 'Hành động',
          key: 'action',
          render: (text, record) => (
              <Button>
              Chi tiết
              </Button>
          ),
      },
    ];
      
    return (
        <div className='customer-wr'>
            <Title onChange={handleSearch} /> 
            <Table 
              columns={columns} 
              dataSource={filteredUsers} 
              className='customer-list'
            />
        </div>
    );
}

export default Customers;