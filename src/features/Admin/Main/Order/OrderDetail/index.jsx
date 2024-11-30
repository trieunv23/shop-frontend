import React, { useEffect, useState } from 'react';
import './styles.scss';
import { API_URL } from '../../../../../constants/config';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { generateStatus } from '../../../../../utils/orderUtils';
import { formatCurrency } from '../../../../../utils/priceUtils';
import { formatDate } from '../../../../../utils/dateUtils';

const generatePaymentStatus = (paymentStatus) => {
    switch (paymentStatus) {
        case 'pending':
            return 'Chưa thanh toán';
        case 'confirmed':
            return 'Đã xác nhận';
        case 'waiting_for_confirmation':
            return 'Đang chờ xác nhận';
        default:
            return paymentStatus;
    }
}

const OrderDetail = () => {
    const { id } = useParams();

    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadOrder = async() => {
            try {
                const response = await axios.get(`${API_URL}/get-order-admin/${id}`);
                setOrder(response.data.order);
                console.log(response.data.order);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        }

        loadOrder();
    }, []);

    const handleConfirmOrder = async() => {
        try { 
            console.log(order.orderId);
            const response = await axios.post(`${API_URL}/confirm-order`, { 
                order_id: order.orderId
            }); 
            alert(response.data.message); 
            window.location.reload(); 
        } catch (error) { 
            console.error('Failed to confirm order:', error); 
        }
    }

    const handleStartShipping = async () => { 
        try { 
            const response = await axios.post(`${API_URL}/start-shipping`, { 
                order_id: order.orderId 
            }); 
            alert(response.data.message); 
            window.location.reload(); 
        } catch (error) { 
            console.error('Failed to start shipping:', error); 
        } 
    };

    const handleCompleteShipping = async () => { 
        try { 
            const response = await axios.post(`${API_URL}/complete-shipping`, { 
                order_id: order.orderId 
            }); 
            alert(response.data.message); 
            window.location.reload(); 
        } catch (error) { 
            console.error('Failed to complete shipping:', error); 
        } 
    };

    const handleCancelOrder = async () => { 
        try { 
            const response = await axios.post(`${API_URL}/cancel-order`, { 
                order_id: order.orderId 
            }); 
            alert(response.data.message); 
            window.location.reload(); 
        } catch (error) { 
            console.error('Failed to cancel order:', error); 
        } 
    };

    const handleConfirmPayment = async() => {
        if (order && order.orderPayment) {
            try {
                const formData = new FormData();
                formData.append('payment_id', order.orderPayment.id);
    
                const response =  await axios.post(`${API_URL}/confirm-payment-admin`, formData, { withCredentials: true });
    
                alert('Xác nhận thanh toán thành công.');
            } catch (error) {
                console.log(error.response);
            }
        }
    }

    if (loading) {
        return (
            <div>Loading...</div>
        );
    }

    if (!order) {
        return (
            <div>Đã xảy ra lỗi</div>
        );
    }

    const { orderSchedule, orderPayment, orderStatus } = order;

    const statuses = [ 
        orderSchedule.orderDate && { 
            name: 'Đơn hàng đã được đặt', 
            date: orderSchedule.orderDate, 
        }, 
        orderPayment.paymentDate === 'completed' && { 
            name: 'Đơn hàng đã được thanh toán', 
            date: orderPayment.paymentDate, 
        }, 
        orderSchedule.confirmationDate && { 
            name: 'Đơn hàng đã được xác nhận', 
            date: orderSchedule.confirmationDate, 
        }, 
        orderSchedule.deliveryDate && { 
            name: 'Đơn hàng đang được giao', 
            date: orderSchedule.deliveryDate, 
        }, 
        orderSchedule.deliveredDate === 'shipped' && { 
            name: 'Đơn hàng đã được giao', 
            date: orderSchedule.deliveredDate, 
        },
        orderSchedule.cancelledDate && {
            name: 'Đã hủy đơn hàng', 
            date: orderSchedule.cancelledDate,  
        }
    ].filter(Boolean);

    statuses.sort((a, b) => new Date(a.date) - new Date(b.date));

    return (
        <div className='order-wr'>
            <div className="order-main-title">
                <span className='order-code'>Mã đơn hàng: <span>{order.orderCode}</span></span>
                <span className='order-status-text'><span>{generateStatus(order.orderStatus, order.shippingStatus)}</span></span>
            </div>

            <div className="order-contents">
                <div className="customer-infor">
                    <div className="field-title">
                        <span>Thông tin khách hàng</span>
                    </div>

                    <div className="field-content">
                        <span>Mã khách hàng: {order.user.userCode}</span>
                        <span>Họ và Tên: {order.user.name}</span>
                    </div>
                </div>

                <div className="address-infor">
                    <div className="field-title">
                        Địa chỉ
                    </div>

                    <div className="field-content">
                        <span className='customer-name'>{order.orderSchedule.recipientName}</span>
                        <div className="address">
                            <span className='address'>Địa chỉ: </span>
                            <span>{order.orderSchedule.shippingAddress.address}</span>
                        </div>

                        <div className="phone-number">
                            <span className='phone-number'>Điện thoại: </span>
                            <span>{order.orderSchedule.shippingAddress.phone}</span>
                        </div>
                    </div>
                </div>

                <div className="product-infor">
                    <div className="field-title">
                        Danh sách sản phẩm
                    </div>
                    <div className="field-content">
                        <div className="product-list">
                            {order.orderProducts.map((orderProduct, index) => (
                                <div className="product-item" key={index}>
                                    <div className="product-img">
                                        <img src={`${API_URL}/storage/${orderProduct.imageUrl}`} alt="" />
                                    </div>

                                    <div className="product-text">
                                        <div className="product-name">
                                            <span>{orderProduct.name}</span>
                                        </div>

                                        <div className="product-classify">
                                            <span>Phân Loại: Đen trắng</span>
                                        </div>

                                        <div className="product-total">
                                            x{orderProduct.quantity}
                                        </div>
                                    </div>

                                    <div className="product-price">
                                        <div className="price-field">
                                            <span>
                                                {formatCurrency(orderProduct.quantity * orderProduct.price)}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="order-total-amount">
                            <span>Tổng tiền</span>
                            <span>{formatCurrency(order.totalAmount)}</span>
                        </div>
                    </div>
                </div>

                <div className="order-infor">
                    <div className="field-title">
                        Thanh toán
                    </div>

                    <div className="field-content">
                        <div className="order-field">
                            <span>Phương thức thanh toán</span>
                            <span className='price'>{order.orderPayment.paymentMethod === 'cash_on_delivery' ? 'Thanh toán bằng tiền mặt' : (order.orderPayment.paymentMethod === 'bank_transfer' ? 'Thanh toán qua tài khoản ngân hàng' : '')}</span>
                        </div>

                        <div className="order-field">
                            <span>Trạng thái</span>
                            <span>{ generatePaymentStatus(order.orderPayment.paymentStatus) }</span>
                        </div>
                        
                        { order.orderPayment.paymentImage && 
                            <div className="order-field">
                                 <span>Ảnh</span>
                                <img src={`${API_URL}/storage/${order.orderPayment.paymentImage}`} alt="" /> 
                            </div>
                        }

                        <div className="order-field">
                            <span>Mã giao dịch</span>
                            <span>{ generatePaymentStatus(order.orderPayment.paymentCode) }</span>
                        </div>

                        { order.orderPayment.paymentDate && 
                            <div className="order-field">
                                <span>Ngày thanh toán</span>
                                <span>{ generatePaymentStatus(order.orderPayment.paymentDate) }</span>
                            </div>
                        }

                        <div className="order-field">
                            <span></span>
                            <span>
                                <button className='payment-action confirm' onClick={handleConfirmPayment}>Xác nhận</button>
                                <button className='payment-action cancel'>Từ chối</button>
                            </span>
                        </div>
                    </div>
                </div>

                <div className="order-status">
                    <div className="field-title">
                        Trạng thái đơn hàng
                    </div>

                    <div className="field-content">
                        {statuses.map((status, index) => (
                            <div className="schedules-field" key={index}>
                                <span className='field-name'>{status.name}</span>
                                <span className='schedules-date'>
                                    <span>{formatDate(status.date)}</span>
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="order-actions">
                    {
                        order.orderStatus === 'pending' ? (
                            <div className="order-btns">
                                <button onClick={handleConfirmOrder}>Xác nhận đơn hàng</button>
                            </div>
                        ) : (order.orderStatus === 'confirmed' && order.orderSchedule.status === 'not_shipped' || order.orderSchedule.status === 'confirmed' ? (
                            <div className="order-btns">
                                <button onClick={handleStartShipping}>Bắt đầu giao hàng</button>
                            </div>
                        ) : (order.orderStatus === 'confirmed' && order.orderSchedule.status === 'in_transit' ? (
                            <div className="order-btns">
                                <button onClick={handleCompleteShipping}>Giao hàng thành công</button>
                            </div>
                        ) : (
                            <div className='order-btns'>
                                <button disabled={true}>Đã giao hàng thành công</button>
                            </div>
                        ))) 
                    }

                    <div className="order-btns">
                        <button disabled={['shipped', 'cancelled'].includes(order.orderSchedule.status)} onClick={handleCancelOrder}>Hủy đơn hàng</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderDetail;