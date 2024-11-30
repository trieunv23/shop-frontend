import React, { useEffect, useState } from 'react';
import './styles.scss';

import Header from '../../../components/Header';
import Money from '../../../components/icons/Money';
import axios from 'axios';
import { useForm, Controller } from 'react-hook-form';
import { API_URL } from '../../../constants/config';
import { useNavigate } from 'react-router-dom';

const Payment = () => {
    const navigate = useNavigate();

    const [address, setAddress] = useState(null);
    const [total, setTotal] = useState(1);
    const [cart, setCart] = useState(null);
    const [totalPrice, setTotalPrice] = useState(0);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);

    const { handleSubmit, control, formState: { errors }, setValue } = useForm({
        defaultValues: {
            shippingMethod: 'fast',
            paymentMethod: 'cash_on_delivery',
        },
    });

    const onSubmit = async(data) => {
        console.log(data);

        if (!address) {
            alert('Chưa có địa chỉ mặc định.');
            return;
        }

        try {
            if (data.paymentMethod === 'vnpay') {
                const response = await axios.post(`${API_URL}/vnpay_payment`);
                console.log(response);
            } else {
                const response  = await axios.post(`${API_URL}/create-order`, {
                    shipping_method: data.shippingMethod,
                    payment_method: data.paymentMethod === 'cash_on_delivery' 
                                    ? data.paymentMethod 
                                    : data.paymentMethod === 'tpbank' || data.paymentMethod === 'viettelmoney' 
                                    ? 'bank_transfer' 
                                    : '',
                }, { withCredentials: true });

                const order = response.data.order;
                console.log(response);
                
                navigate(`/checkout/payment/${order.id}`);  
            }  
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        const loadAddressDefault = async() => {
            setLoading(true);
            try {
                const response = await axios.get(`${API_URL}/get-default-address`, { withCredentials: true });
                setAddress(response.data.address);
                console.log(response.data.address);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        }

        loadAddressDefault();
    }, []);

    useEffect(() => {
        const loadCart = async() => {
            setLoading(true);
            try {
                const response = await axios.get(`${API_URL}/get-cart`, { withCredentials: true });
                if (response.status === 200) {
                    console.log(response.data);
                    setCart(response.data.cart);
                    setProducts(response.data.products);
                    setTotalPrice(response.data.totalPrice);
                }
            } catch (error) {
                console.log(error.response);
            } finally {
                setLoading(false);
            }
        }

        loadCart();
    }, []);

    return (
        <div className="payment-list-container">
            <Header />
            <div className="wrap">
                <div className='wide'>
                    <div className="title">Thanh Toán</div>
                    <form className="payment-layout" onSubmit={handleSubmit(onSubmit)}>
                        <div className="payment-infor">
                            <div className="payment-field">
                                <div className="title-field">
                                    <span>Địa Chỉ</span>
                                    <a href="">Thay đổi</a>
                                </div>

                                <div className="field-content">
                                    { address ? 
                                        <div className="transport">
                                            <div className="customer-infor">
                                                <p className='customer-name'>{ address.customer_name }</p>
                                                <div className="partition">

                                                </div>
                                                <p className='customer-phone'>SĐT: { address.phone_number }</p>
                                            </div>

                                            <div className="address">
                                                <span>{`${address.address_detail}, ${address.ward_name}, ${address.district_name}, ${address.province_name}`}</span>
                                            </div>
                                        </div>
                                        : (!loading && <div>Chưa có địa chỉ</div>)
                                    }
                                </div>
                            </div>

                            <div className="payment-field">
                                <div className="title-field">
                                    <span>Sản Phẩm</span>
                                </div>

                                <div className="field-content">
                                    <div className="product-list">
                                        { products && products.map((product, index) => (
                                            <div key={index} className="product-item">
                                                <div className="product-image">
                                                    <img src={`${API_URL}/storage/${product.product.image}`} alt="" />
                                                </div>
    
                                                <div className="product-infor">
                                                    <div className="product-name">{ product.product.name }</div>
                                                    <div className="product-text">
                                                        <span>SL: { product.quantity }</span>
                                                        <span className='total-item'>
                                                            { product.totalPrice }
                                                            <span style={{textDecoration: 'underline'}}>đ</span>
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className="payment-field">
                                <div className="title-field">
                                    <span>Chọn Phương Thức Thanh Toán</span>
                                </div>

                                <div className="field-content flex-column">
                                    <div className="option-payment">
                                        <Controller 
                                            name='paymentMethod'
                                            control={control}
                                            render={({ field }) => (
                                                <>
                                                    <input 
                                                        type="radio"
                                                        value={'cash_on_delivery'} 
                                                        {...field}
                                                        checked={field.value === 'cash_on_delivery'}
                                                        onChange={() => setValue('paymentMethod', 'cash_on_delivery')}
                                                    />
                                                    <span className='option-infor'>
                                                        <Money className='option-img' />
                                                        <label htmlFor="money">Thanh toán bằng tiền mặt</label>
                                                    </span>
                                                </>
                                            )}
                                        />
                                    </div>

                                    <div className="option-payment">
                                        <Controller 
                                            name='paymentMethod'
                                            control={control}
                                            render={({ field }) => (
                                                <>
                                                    <input 
                                                        type="radio"
                                                        value={'vnpay'} 
                                                        {...field}
                                                        checked={field.value === 'vnpay'}
                                                        onChange={() => setValue('paymentMethod', 'vnpay')}
                                                    />
                                                    <span className='option-infor'>
                                                        <img src='https://scontent.fdad2-1.fna.fbcdn.net/v/t39.30808-6/453247051_895663219261867_7610666258558796060_n.jpg?_nc_cat=1&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeFmkJ0naO-7at6Oq_OhEDhPT1AnQUFvop1PUCdBQW-incoF-PUgevr7FiGEeBMEFGVjByxRNn7j_HCGB7QNh4YQ&_nc_ohc=9B-T9HKypgkQ7kNvgGOvPKt&_nc_zt=23&_nc_ht=scontent.fdad2-1.fna&_nc_gid=APM_wMYP6h3u4MkIRZvNY9H&oh=00_AYCS_aJ5hMftTPuF8f7O3izzrReRg6Yp0kn96LnjFszjog&oe=672FB63A' className='option-img' />
                                                        <label htmlFor="money">VN PAY</label>
                                                    </span>
                                                </>
                                            )}
                                        />
                                    </div>

                                    <div className="option-payment">
                                        <Controller 
                                            name='paymentMethod'
                                            control={control}
                                            render={({ field }) => (
                                                <>
                                                    <input 
                                                        type="radio"
                                                        value={'viettelmoney'} 
                                                        {...field}
                                                        checked={field.value === 'viettelmoney'}
                                                        onChange={() => setValue('paymentMethod', 'viettelmoney')}
                                                    />
                                                    <span className='option-infor'>
                                                        <img src='https://salt.tikicdn.com/ts/upload/5f/f9/75/d7ac8660aae903818dd7da8e4772e145.png' className='option-img' />
                                                        <label htmlFor="money">Viettel Money</label>
                                                    </span>
                                                </>
                                            )}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="payment-field">
                                <div className="title-field">
                                    <span>Chọn Phương Thức Vận chuyển</span>
                                </div>

                                <div className="field-content flex-column">
                                    <div className="option-payment">
                                        <Controller 
                                            name='shippingMethod'
                                            control={control}
                                            render={({ field }) => (
                                                <>
                                                    <input 
                                                        type="radio" 
                                                        id='fast'
                                                        value='fast'
                                                        {...field}
                                                        checked={field.value === 'fast'}  
                                                        onChange={() => setValue('shippingMethod', 'fast')}                                                  
                                                    />
                                                    <span className='option-infor'>
                                                        <label htmlFor="fast">Vận chuyển nhanh</label>
                                                    </span>
                                                </>
                                            )}
                                        />
                                    </div>

                                    <div className="option-payment">
                                        <Controller 
                                            name='shippingMethod'
                                            control={control}
                                            render={({ field }) => (
                                                <>
                                                    <input 
                                                        type="radio" 
                                                        id='save'
                                                        value='save'
                                                        {...field}
                                                        checked={field.value === 'save'}   
                                                        onChange={() => setValue('shippingMethod', 'save')}                                             
                                                    />
                                                    <span className='option-infor'>
                                                        <label htmlFor="save">Tiết kiệm</label>
                                                    </span>
                                                </>
                                            )}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="payment-last">
                                <div className="left-content">
                                    <textarea name="" id="" placeholder='Nhập ghi chú gửi đến cửa hàng'></textarea>
                                </div>

                                <div className="right-content">
                                    <div className="right-field">
                                        <span className="payment-title">Tổng tiền hàng</span>
                                        <span>{ totalPrice }<span className='unit'>đ</span></span>
                                    </div>
                                    <div className="right-field">
                                        <span className="payment-title">Phí tiền vận chuyển</span>
                                        <span>0<span className='unit'>đ</span></span>
                                    </div>
                                    <div className="right-field">
                                        <span className="payment-title">Tổng voucher giảm giá</span>
                                        <span>0<span className='unit'>đ</span></span>
                                    </div>

                                    <div className="right-field total">
                                        <span className="payment-title">Tổng tiền</span>
                                        <span className='payment-total'>{ totalPrice } <span className='unit'>đ</span></span>
                                    </div>

                                    <div className='btn-payment'>
                                        <button type='submit'>MUA HÀNG</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>  
            </div>
        </div>
    );
}

export default Payment;