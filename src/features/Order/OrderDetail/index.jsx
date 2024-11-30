import React, { useEffect, useState } from 'react';
import './styles.scss';
import axios from 'axios';
import { API_URL } from '../../../constants/config';
import { useParams } from 'react-router-dom';
import { generateStatus } from '../../../utils/orderUtils';
import { Steps, Button, message } from 'antd';
import { ShoppingCartOutlined, SolutionOutlined, CarOutlined, HomeOutlined, CheckCircleOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import { formatCurrency } from '../../../utils/priceUtils';
import { formatDate } from '../../../utils/dateUtils';

const { Step } = Steps;

const getCurrentStep = (order) => {
    if (!order) return 0;

    if (order.orderStatus === 'delivered' && order.orderSchedule.status === 'shipped') {
        return 3;
    }
    if (['confirmed', 'delivered'].includes(order.orderStatus) && order.orderSchedule.status === 'in_transit') {
        return 2;
    }
    if (order.orderStatus === 'confirmed' && order.orderSchedule.status === 'confirmed') {
        return 1;
    } 
    if (order.orderStatus === 'pending') {
        return 0;
    }
    
    return 0;
};

const getOrderStatus = (order) => {
    if (!order) {
        return 'Không xác định';
    }

    if (order.orderStatus === 'delivered' && order.orderSchedule.status === 'shipped') {
        return 'Hoàn Thành';
    }
    if (['confirmed', 'delivered'].includes(order.orderStatus) && order.orderSchedule.status === 'in_transit') {
        return 'Đang Giao Hàng';
    }
    if (order.orderStatus === 'confirmed' && order.orderSchedule.status === 'confirmed') {
        return 'Chờ Giao Hàng';
    } 
    if (order.orderStatus === 'cancelled') {
        return 'Đã Hủy Đơn Hàng';
    }
    if (order.orderStatus === 'pending') {
        return 'Chờ Xác Nhận';
    }
}

const getPaymentMethod = (order) => {
    if (!order) {
        return 'Không xác định';
    }

    switch(order.orderPayment.paymentMethod) {
        case 'cash_on_delivery' :
            return 'Thanh toán khi giao hàng';
        case 'bank_transfer' : 
            return 'Thanh toán bằng tài khoản ngân hàng';
        case 'paypal' :
            return 'Paypal';
        case 'credit_card' : 
            return 'Thanh toán bằng thẻ tín dụng';
        default: return 'Không xác định';
    }
}

const getPaymentStatus = (order) => {
    if (!order) {
        return 'Không xác định';
    }

    switch(order.orderPayment.paymentStatus) {
        case 'pending' :
            return 'Chưa thanh toán';
        case 'completed' : 
            return 'Đã thanh toán';
        case 'failed' :
            return 'Thanh toán thất bại';
        default: return 'Không xác định';
    }
}

const OrderDetail = () => {
    const { id } = useParams();
    const [order, setOrder] = useState(null);

    useEffect(() => {
        const loadOrders = async() => {
            try {
                const response = await axios.get(`${API_URL}/get-order/${id}`, { withCredentials: true });
                setOrder(response.data.order);
                console.log(response.data.order);
            } catch (error) {
                console.log(error);
            }
        }

        loadOrders();
    }, []);

    if (!order) {
        return (
            <div>
                <span>Không Tìm Thấy Đơn Hàng</span>
            </div>
        );
    }

    const steps = [
        {
          title: 'Đơn Hàng Được Đặt',
          description: order?.orderSchedule ? formatDate(order.orderSchedule.orderDate) : '',
          icon: <ShoppingCartOutlined />,
        },
        {
            title: 'Xác Nhận Đơn Hàng',
            description: order?.orderSchedule ? formatDate(order.orderSchedule.confirmationDate) : '',
            icon: <SolutionOutlined />,
          },
        {
          title: 'Chờ Giao Hàng',
          description: order?.orderSchedule ? formatDate(order.orderSchedule.deliveryDate) : '',
          icon: <CarOutlined />,
        },
        {
          title: 'Giao Hàng Thành Công',
          description: order?.orderSchedule ? formatDate(order.orderSchedule.deliveredDate) : '',
          icon: <CheckCircleOutlined />,
        },
    ];

    // const progressIndex = 

    return (
        <div className='order-container'>
            <div className="wrap">
                <div className="wide">
                    <div className="order-content">
                        <div className="order-box">
                            <div className="order-field">
                                <div className="field-header">
                                    <span>Chi Tiết Đơn Hàng</span>
                                </div>

                                <div className="field-contents">
                                    <span>Mã đơn hàng: {order.orderCode}</span>
                                    <span>Trạng thái: {getOrderStatus(order)}</span>
                                    <span>Ngày đặt hàng: {order.orderSchedule.orderDate}</span>
                                </div>
                            </div>

                            <div className="order-field">
                                <div className="field-header">
                                    <span>Thông Tin Vận Chuyển</span>
                                </div>

                                <div className="field-contents">
                                    <span className="customer-infor">
                                        <span>{order.orderSchedule.shippingAddress.name}</span>
                                        <span className="partition"></span>
                                        <span>{order.orderSchedule.shippingAddress.phone}</span>
                                    </span>

                                    <span className="address-content-infor">
                                        <span>{order.orderSchedule.shippingAddress.address}</span>
                                    </span>
                                </div>
                            </div>

                            <div className="order-field">
                                <div className="field-header">
                                    <span>Sản Phẩm</span>
                                </div>

                                <div className="field-contents">
                                    <div className="product-list">
                                        {order.products.map((product, index) => (
                                            <div key={index} className="product-item">
                                                <div className="product-content">
                                                    <div className="product-image">
                                                        <img src={`${API_URL}/storage/${product.imageUrl}`} alt="" />
                                                    </div>

                                                    <div className="product-infor">
                                                        <span className="product-name">
                                                            {product.productName}
                                                        </span>

                                                        <span className="product-classify">
                                                            Phân Loại: Đen xám, XL
                                                        </span>

                                                        <span className="product-total">
                                                            x{product.quantity}
                                                        </span>
                                                    </div>
                                                </div>

                                                <div className="product-payment">
                                                    <span>{formatCurrency(product.quantity * product.price)}</span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="total-amount">
                                        <div className="price-field">
                                            <span className='price-title'>Tổng tiền hàng</span>
                                            <span className='price-value'>{formatCurrency(order.totalAmount)}</span>
                                        </div>

                                        <div className="price-field">
                                            <span className='price-title'>Phí vận chuyển</span>
                                            <span className='price-value'>0</span>
                                        </div>

                                        <div className="price-field">
                                            <span className='price-title'>Mã giảm giá</span>
                                            <span className='price-value'>0</span>
                                        </div>

                                        <div className="price-field">
                                            <span className='price-title'>Thành tiền</span>
                                            <span className='price-value'>{formatCurrency(order.totalAmount)}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="order-field">
                                <div className="field-header">
                                    <span>Tiến Trình</span>
                                </div>

                                <div className="field-contents">
                                    <div className="order-progress">
                                        { !order.orderStatus === 'cancelled' ? 
                                            <Steps current={getCurrentStep(order)}>
                                                {steps.map((step, index) => (
                                                    <Step 
                                                        key={index} 
                                                        title={step.title} 
                                                        description={step.description} 
                                                        icon={step.icon} 
                                                    />
                                                ))}
                                            </Steps>
                                            : <div className='cancelled-status'>
                                                <span className='cancelled-tile'>Đơn hàng đã được hủy</span>
                                                <span className='cancelled-date'>{order.orderSchedule.cancelledDate}</span>
                                            </div>
                                        }
                                    </div>

                                    { !order.orderStatus === 'cancelled' && 
                                        <div className="order-action">
                                            <div className="action-item">
                                                <button>Đã Nhận Hàng</button>
                                            </div>

                                            <div className="action-item">
                                                <button disabled={['in_transit', 'shipped'].includes(order.orderSchedule.status)}>Hủy Đơn Hàng</button>
                                            </div>
                                        </div>
                                    }
                                </div>
                            </div>

                            <div className="order-field">
                                <div className="field-header">
                                    <span>Thanh toán</span>
                                </div>

                                <div className="field-contents">
                                    <span>Tổng thanh toán: {formatCurrency(order.orderPayment.paymentAmount)}</span>
                                    <span>Phương thức thanh toán: {getPaymentMethod(order)}</span>
                                    <span>Trạng thái: {getPaymentStatus(order)}</span>
                                    {(order.orderPayment.paymentStatus === 'pending' || order.orderPayment.paymentStatus === 'failed') ?
                                        <div className="payment-btn">
                                            <button>Thanh Toán</button>
                                        </div> 
                                        : <div></div>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default OrderDetail;