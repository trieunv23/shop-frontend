import React, { useEffect, useState } from 'react';
import './styles.scss';

import { Button, Table } from 'antd';
import { API_URL } from '../../../../../constants/config';
import axios from 'axios';
import { render } from '@testing-library/react';

const Payments = () => {
    const [payments, setPayments] = useState([]);
    const [filteredPayments, setFilteredPayments] = useState([]);

    useEffect(() => {
        const loadPayments = async() => {
            try {
                const response = await axios.get(`${API_URL}/get-payments`, { withCredentials: true });
                setPayments(response.data.payments);
                setFilteredPayments(response.data.payments);
                console.log(response.data.payments);
            } catch (error) {
                console.log(error.response);
            }
        }

        loadPayments();
    }, []); 

    const handleStatusChange = (e) => {
        const status = e.target.value;

        if (status === '') {
            setFilteredPayments(payments);
        } else {
            const filtered = payments.filter(payment => payment.paymentStatus === status);
            setFilteredPayments(filtered);
        }
    };
    
    const handleDetail = (paymentId) => {

    }

    const handleConfirm = async(paymentId) => {
        try {
            const formData = new FormData();
            formData.append('payment_id', paymentId);

            const response =  await axios.post(`${API_URL}/confirm-payment-admin`, formData, { withCredentials: true });

            const updatedPayments = payments.map(payment => {
                if (payment.id === paymentId) {
                    return { ...payment, paymentStatus: 'confirmed' };
                }
                return payment;
            });

            setPayments(updatedPayments);
            setFilteredPayments(updatedPayments);

            alert('Xác nhận thanh toán thành công.');
        } catch (error) {
            console.log(error.response);
        }
    }

    const columns = [
        {
            title: 'Mã đơn hàng',
            dataIndex: 'orderCode',
            key: 'orderCode',
        },
        {
            title: 'Ngày thanh toán',
            dataIndex: 'paymentDate', 
            key: 'paymentDate',
        },
        {
            title: 'Phương thức thanh toán',
            dataIndex: 'paymentMethod',
            key: 'paymentMethod',
            render: (text, record) => {
                switch (record.paymentMethod) {
                    case 'cash_on_delivery':
                        return <span>Trực tiếp</span>;
                    case 'bank_transfer':
                        return <span style={{ color: 'green' }}>Ngân hàng</span>;
                    default:
                        return <span>{text}</span>;
                }
            }
        },
        {
            title: 'Trạng thái',
            dataIndex: 'paymentStatus',
            key: 'paymentStatus',
            render: (text, record) => {
                switch (record.paymentStatus) {
                    case 'pending':
                        return <span style={{ color: 'orange' }}>Chưa thanh toán</span>;
                    case 'confirmed':
                        return <span style={{ color: 'green' }}>Đã xác nhận</span>;
                    case 'waiting_for_confirmation':
                        return <span style={{ color: 'gray' }}>Đang chờ xác nhận</span>;
                    default:
                        return <span>{text}</span>;
                }
            }
        },
        {
            title: 'Tổng tiền',
            dataIndex: 'paymentAmount',
            key: 'paymentAmount',
        },
        {
            title: 'Mã thanh toán',
            dataIndex: 'paymentCode',
            key: 'paymentCode',
        },
        {
            title: 'Hành động',
            key: 'action',
            render: (text, record) => (
                <div>
                    <Button onClick={() => handleDetail(record.id)}>Chi tiết</Button> 
                    <Button onClick={() => handleConfirm(record.id)}>Xác nhận</Button>
                </div>
            )
        },
    ];

    return (
        <div className='payment-list'>
            <div className="payment-title">
                <span>Danh sách thanh toán</span>
                <select 
                    name="" 
                    id=""
                    style={{ backgroundImage: 'url(/images/down-arrow.png)' }}
                    onChange={handleStatusChange}
                >
                    <option value="">Tất cả</option>
                    <option value="pending">Chưa thanh toán</option>
                    <option value="waiting_for_confirmation">Đang xác nhận</option>
                    <option value="confirmed">Đã xác nhận</option>
                </select>
            </div>

            <Table 
                columns={columns}
                dataSource={filteredPayments}
                rowKey='id'
            />
        </div>
    );
};

export default Payments;