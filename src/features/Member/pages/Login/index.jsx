import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './styles.scss';
import { Input } from 'antd';   
const { Password } = Input;

Login.propTypes = {
    
};

function Login(props) {
    const [isFocusUsername, setIsFocusUsername] = useState(false);
    const [isFocusPassword, setIsFocusPassword] = useState(false);

    return (
        <div className='login-container'>
            <div className="warp">
                <div className="login-header">
                    <div className="top-nav">
                        <div className="back-btn">

                        </div>

                        <div className="home-btn">

                        </div>
                    </div>

                    <h1 className="shop-name">
                        <a href="">
                            Cửa Hàng LCK
                        </a>
                    </h1>
                </div>

                <div className="login-section">
                    <div className="contents">
                        <h2 className='title'>Đăng nhập</h2>
                        <p className='text'>Bạn mệt mỏi với việc nhập ID và mật khẩu của mình?
                        Đăng ký sau 1 giây và đăng nhập dễ dàng mà không cần nhập bất cứ thứ gì.</p>
                        <div className="basic-btn">
                            <div className="btn google-btn">
                                <font>Đăng nhập / Đăng kí Bằng Google</font>
                            </div>
                        </div>
                    </div>

                    <div className="contents member-login">
                        <ul className="tab-menu">
                            <li className='active'>
                                <a href="">Bạn đã có tài khoản?</a>
                            </li>
                            <li>
                                <a href="">Đăng kí ngay!</a>
                            </li>
                        </ul>

                        <div className="form-wrap">
                            <form className="member-form">
                                <div className="normal-login">
                                    <div className="input-box">
                                        { isFocusUsername && <label htmlFor="" className='input-title'>Tên đăng nhập</label> }
                                        <Input
                                            id='member-id'
                                            placeholder={!isFocusUsername ? ('Tên đăng nhập') : ('')} 
                                            onFocus={() => setIsFocusUsername(true)}
                                            onBlur={() => setIsFocusUsername(false)}
                                        />
                                        <div className="order-no"></div>    
                                        <div className="passwd">
                                            <Password 
                                                className='member-passwd'
                                                placeholder={!isFocusPassword ? ('Mật khẩu') : ('')} 
                                                onFocus={() => setIsFocusPassword(true)}
                                                onBlur={() => setIsFocusPassword(false)}
                                            />

                                            { isFocusPassword && <label htmlFor="" className='input-title'>Mật khẩu</label> }
                                            
                                        </div>
                                    </div>   

                                    <div className="login-checkbox"></div>
                                    <div className="login-btn">
                                        Đăng nhập
                                    </div>

                                    <div className="util-menu">
                                        <a href="">Quên mật khẩu</a>
                                        
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;