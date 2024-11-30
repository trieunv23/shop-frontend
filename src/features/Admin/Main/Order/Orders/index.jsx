import React, { useEffect, useState } from 'react';
import './styles.scss';
import Title from '../../components/Title';
import { Button, Table } from 'antd';
import axios from 'axios';
import { API_URL } from '../../../../../constants/config';
import { useNavigate } from 'react-router-dom';

const Orders = () => {
    const navigate = useNavigate();
    const [orders, setOrders] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredOrders, setFilteredOrders] = useState([]);

    useEffect(() => {
        const loadOrders = async() => {
            try {
                const response = await axios.get(`${API_URL}/get-orders-admin`);
                setOrders(response.data.orders);
                setFilteredOrders(response.data.orders);
            } catch (error) {
                console.log(error);
            } finally {
                // setLoading(false);
            }
        }

        loadOrders();
    }, []);

    const handleDetail = (orderId) => {
        navigate(`detail/${orderId}`);
    }

    const handleSearch = (e) => {
        const term = e.target.value;
        
        setSearchTerm(term);

        const filtered = orders.filter(order => 
            order.orderCode.toLowerCase().includes(term.toLowerCase()) || 
            order.user.profile.name.toLowerCase().includes(term.toLowerCase())
        );
        
        setFilteredOrders(filtered);
    }

    const columns = [
        {
            title: 'Mã đơn hàng',
            dataIndex: 'orderCode',
            key: 'id',
        },

        {
            title: 'Khách hàng',
            dataIndex: ['user', 'profile', 'name'],
            key: 'name',
        },

        {
            title: 'Tổng tiền',
            dataIndex: 'totalAmount', 
            key: 'totalPrice',
            sorter: (a, b) => a.totalAmount - b.totalAmount,
            render: (price) => `${price.toLocaleString()} VNĐ`,
        },
        {
            title: 'Trạng thái',
            dataIndex: 'orderStatus',
            key: 'status',
        },
        {
            title: 'Ngày tạo',
            dataIndex: 'createdAt',
            key: 'createdAt',
            sorter: (a, b) => new Date(a.createdAt) - new Date(b.createdAt),
            render: (date) => new Date(date).toLocaleDateString(), 
        },
        {
            title: 'Hành động',
            key: 'action',
            render: (text, record) => (
                <div>
                    <Button 
                        className='detail-btn'
                        onClick={() => handleDetail(record.id)}
                    >
                        Chi tiết
                    </Button>
                </div>
            )
        },
    ];
    
    return (
        <div className='orders-wr'>
            <Title 
                onChange={handleSearch}
                name={'Danh sách đơn hàng'}
            />
            
            <Table 
                columns={columns}
                dataSource={filteredOrders}
                rowKey='id'
            />
        </div>
    );
};

export default Orders;