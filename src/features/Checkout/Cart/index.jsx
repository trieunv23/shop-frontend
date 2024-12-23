import React, { useEffect, useState } from 'react';
import './styles.scss';
import Header from '../../../components/Header';
import { Popover } from "antd";
import QuantitySelector from '../../../components/QuantitySelector';
import OptionSelector from '../../../components/OptionSelector';
import Trash from '../../../components/icons/Trash';
import { API_URL } from '../../../constants/config';
import { useNavigate } from 'react-router-dom';
import _ from 'lodash';
import { useDispatch } from 'react-redux';
import { removeItem } from './slice';
import { deleteCartProduct, fetchCart, updateCartProduct } from '../../../services/api/cartApi';

const Cart = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [total, setTotal] = useState(1);
    const [cart, setCart] = useState(null);
    const [cartProducts, setCartProducts] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(() => {
        const loadCart = async() => {
            try {
                const { cart, products, totalPrice } = await fetchCart();
                setCart(cart);
                setCartProducts(products);
                setTotalPrice(totalPrice);
            } catch (error) {
                console.log(error.response);
            }
        }

        loadCart();
    }, []);

    const hadleChangeTotal = async(cartProductId, newTotal) => {
        const cartProduct = cartProducts.find(p => p.id === cartProductId);
        if (cartProduct && cartProduct.quantity !== newTotal) {
            try {
                await updateCartProduct(cartProductId, { quantity: newTotal });
                
                const updatedProducts = cartProducts.map(cartProduct => 
                    cartProduct.id === cartProductId 
                    ? {...cartProduct, quantity: newTotal, totalPrice: cartProduct.price * newTotal }
                    : cartProduct
                );
    
                setCartProducts(updatedProducts);
    
                const newTotalPrice = updatedProducts.reduce((sum, cartProduct) => sum + cartProduct.totalPrice, 0); 
                setTotalPrice(newTotalPrice);
            } catch (error) {
                console.error("Failed to update quantity", error);
            }
        }
    };  

    const handleDeleteCartProduct = async(cartProductId) => {
        try {
            await deleteCartProduct(cartProductId);

            const updatedProducts = cartProducts.filter(cartProduct => cartProduct.id !== cartProductId);
            setCartProducts(updatedProducts);

            const newTotalPrice = updatedProducts.reduce((sum, cartProduct) => sum + cartProduct.totalPrice, 0);
            setTotalPrice(newTotalPrice);

            // dispatch(removeItem());
        } catch (error) {
            console.log(error);
        }
    }

    const [colorSelected, setColorSelected] = useState(0);

    const handleToggleColor = (value, option) => {
        setColorSelected(option.value);
    };

    const handleBuy = () => {
        if (cartProducts.length === 0 ) {
            alert('Bạn chưa có sản phẩm nào trong giỏ hàng');
            return;
        }

        navigate('/checkout/order');
    }

    const content = (
        <div>
          <OptionSelector value='color' title='Chọn màu sắc' onChange={handleToggleColor} />
        </div>
    );

    return (
        <div className="cart-list-container">
            <Header />
            <div className="wrap">
                <div className='wide'>
                    <div className="title">Giỏ Hàng</div>
                    <div className="cart-layout">
                        <div className="cart-list">
                            <div className="p-item head">
                                <div className="p-infor">
                                    <div className="product-title">
                                        <span>Sản Phẩm</span>
                                    </div>
                                </div>

                                <div className="price">
                                    <span>Đơn Giá</span>
                                </div>

                                <div className="quantity">
                                    <span>Số Lượng</span>
                                </div>

                                <div className="total">
                                    <span>Tổng</span>
                                </div>

                                <div className="action">
                                    <span>Hành Động</span>
                                </div>
                            </div>

                            {cartProducts && cartProducts.map((cartProduct, index) => (
                                <div key={index} className="p-item">
                                    <div className="p-infor">
                                        <div className="thumb">
                                            <a href={`/product/detail/${cartProduct.id}`}>
                                                <img src={`${API_URL}/storage/${cartProduct.imgPath}`} alt="" />
                                            </a>
                                        </div>

                                        <div className="infor">
                                            <span className='product-name'>{cartProduct.name}</span>

                                            <div className="product-type">
                                                <Popover content={content} trigger="click">
                                                    <button>
                                                        <span>Màu: {colorSelected}</span>
                                                    </button>
                                                </Popover>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="price">
                                        <span className='product-price'>{cartProduct.price}<span className='unit'>đ</span></span>
                                    </div>

                                    <div className="quantity">
                                        <QuantitySelector 
                                            cartProductId={cartProduct.id}
                                            value={cartProduct.quantity}
                                            onChange={hadleChangeTotal}
                                        />
                                    </div>

                                    <div className="total">
                                        <span>
                                            { cartProduct.itemTotalPrice }
                                            <span style={{textDecoration: 'underline'}}>đ</span>
                                        </span>
                                    </div>

                                    <div className="action">
                                        <button onClick={() => handleDeleteCartProduct(cartProduct.id)}>
                                            <Trash />
                                        </button>
                                    </div>
                                </div>
                            ))}

                            {
                                (!cart || !cartProducts || cartProducts.length === 0) &&
                                <div className="p-item not-found">
                                    <div className="notfound-img">
                                        <img src="/images/no-results.png" alt="" />
                                    </div>
                                    <span>Chưa có sản phẩm</span>
                                </div>
                            }
                        </div>

                        { 
                            (cart && cartProducts && cartProducts.length > 0) &&
                            <div className="cart-payment">
                                <div className="left-content">
                                    <div className="discount-wr">
                                        <input type="text" placeholder='Nhập mã giảm giá'/>
                                        <button>Kiểm tra</button>
                                    </div>
                                </div>

                                <div className="right-content">
                                    <div className="price">
                                        <span className='price-title'>Tổng tiền hàng</span>
                                        <span>
                                            {totalPrice}
                                            <span style={{textDecoration: 'underline'}}>đ</span>
                                        </span>
                                    </div>

                                    <div className="price">
                                        <span className='price-title'>Mã giảm giá</span>
                                        <span>
                                            - 0
                                            <span style={{textDecoration: 'underline'}}>đ</span>
                                        </span>
                                    </div>

                                    <div className="total">
                                        <span>Tổng tiền thanh toán</span>
                                        <span className='total-value'>
                                            { totalPrice }
                                            <span style={{textDecoration: 'underline'}}> đ</span>
                                        </span>
                                    </div>

                                    <div className='checkout'>
                                        <button onClick={handleBuy}>Mua Hàng</button>
                                    </div>
                                </div>
                            </div>
                        }
                    </div>
                </div>  
            </div>
        </div>
    );
}

export default Cart;