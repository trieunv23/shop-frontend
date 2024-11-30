import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './styles.scss';
import { Route, Routes } from 'react-router-dom';
import Order from '../OrderDetail';
import Transfer from '../../../components/icons/Transfer';
import axios from 'axios';
import { API_URL } from '../../../constants/config';
import { generateStatus } from '../../../utils/orderUtils';
import { formatCurrency } from '../../../utils/priceUtils';

const Purchases = () => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const loadOrders = async() => {
            try {
                const response = await axios.get(`${API_URL}/get-orders`, { withCredentials: true });
                setOrders(response.data.orders);
                console.log(response.data.orders);
            } catch (error) {
                console.log(error);
            }
        }

        loadOrders();
    }, []);

    return (
        <div className='purchase-container'>
            <div className="wrap">
                <div className="wide">
                    <div className="purchase-layout">
                        <div className="purchases-action">
                            <ul className="categories-list">
                                <li className='category-item'>
                                    <a href="">Tất cả</a>
                                </li>
                                <li className='category-item'>
                                    <a href="">Chờ thanh toán</a>
                                </li>
                                <li className='category-item'>
                                    <a href="">Chờ giao hàng</a>
                                </li>
                                <li className='category-item'>
                                    <a href="">Vận chuyển</a>
                                </li>
                                <li className='category-item'>
                                    <a href="">Hoàn thành</a>
                                </li>
                                <li className='category-item'>
                                    <a href="">Đã hủy</a>
                                </li>
                            </ul>
                        </div>

                        <div className="purchase-list">
                            { orders && orders.map((order, index) => (
                                <div key={index} className="purchase-item">
                                    <div className="purchase-status">
                                        <div className="order-code">
                                            <span>Mã đơn hàng: {order.orderCode}</span>
                                        </div>
                                        <div className="status-content">    
                                            <div className="status-icon">
                                                <img src="/images/delivery.png" alt="" />    
                                            </div>
                                            <span>
                                                { generateStatus(order.orderStatus, order.orderSchedule.status) }
                                            </span>
                                        </div>
                                    </div>

                                    <a href={`order/detail/${order.orderId}`} className="purchase-products">
                                        {order.products.map((product, index) => (
                                            <div key={index} className="product-item">
                                                <div className="product-infor">
                                                    <div className="product-image">
                                                        <img src={`${API_URL}/storage/${product.imageUrl}`} alt="" />
                                                    </div>

                                                    <div className="product-contents">
                                                        <span className='product-name'>{product.productName}</span>
                                                        <span className='product-classify'>Phân loại: {}</span>
                                                        <span className='product-quantity'>x{product.quantity}</span>
                                                    </div>
                                                </div>

                                                <div className="product-payment">
                                                    <div className="product-total">
                                                        <span className='payment-value'>
                                                            { formatCurrency(product.total) }    
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </a>

                                    <div className="purchase-total">
                                        <span>Thành tiền:&#160;</span>
                                        <span className='purchase-total-value'>
                                            { formatCurrency(order.totalPrice) }
                                        </span>
                                    </div>

                                    <div className="purchase-action">
                                        <div className="purchase-describe">
                                            Vui lòng chỉ nhấn "Đã nhận được hàng" khi đơn hàng đã được giao đến bạn và sản phẩm nhận được không có vấn đề nào.
                                        </div>

                                        <div className="purchase-btns">
                                            <button>Đã Nhận Hàng</button>
                                            <button>Hủy</button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}


export default Purchases;