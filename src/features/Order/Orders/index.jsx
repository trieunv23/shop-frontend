import React, { useEffect, useState } from 'react';
import './styles.scss';

import axios from 'axios';
import { API_URL } from '../../../constants/config';
import { formatCurrency } from '../../../utils/priceUtils';
import { getOrderStatus } from '../../../utils/orderUtils';
import { fetchOrders } from '../../../services/api/orderApi';

const Purchases = () => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const loadOrders = async() => {
            try {
                const { orders } = await fetchOrders();
                setOrders(orders);
                console.log(orders);
            } catch (error) {
                console.log(error);
            }
        }

        loadOrders();
    }, []);

    const handleConfirmedReceiptOrder = async(orderId) => {
        try { 
            const response = await axios.post(`${API_URL}/confirmed_receipt`, { 
                order_id: orderId 
            }); 
            alert(response.data.message); 
            
            const updatedOrders = orders.map(order => {
                if (order.id === orderId) {
                    order.orderSchedule.status = 'confirmed_receipt'
                }
            });

            setOrders(updatedOrders);
        } catch (error) { 
            console.error('Failed to complete shipping:', error); 
        }
    }

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
                                            <span>Mã đơn hàng: {order.code}</span>
                                        </div>
                                        <div className="status-content">    
                                            <div className="status-icon">
                                                <img src="/images/delivery.png" alt="" />    
                                            </div>
                                            <span>
                                                { getOrderStatus(order.status) }
                                            </span>
                                        </div>
                                    </div>

                                    <a href={`order/detail/${order.id}`} className="purchase-products">
                                        {order.products.map((product, index) => (
                                            <div key={index} className="product-item">
                                                <div className="product-infor">
                                                    <div className="product-image">
                                                        <img src={`${API_URL}/storage/${product.imageUrl}`} alt="" />
                                                    </div>

                                                    <div className="product-contents">
                                                        <span className='product-name'>{product.name}</span>
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
                                            <button 
                                                disabled={order.status === 'confirmed_receipt'}
                                                onClick={() => handleConfirmedReceiptOrder(order.id)}
                                            >Đã Nhận Hàng</button>
                                            <button
                                                disabled={!['pending', 'confirmed'].includes(order.status)}
                                            >Hủy</button>
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