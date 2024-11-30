import React, { useEffect, useState } from 'react';
import { useModal } from '../../context/ModalContext';
import { Controller, useForm } from "react-hook-form";
import './styles.scss';
import { Input } from 'antd';
import Password from 'antd/es/input/Password';
import Close from '../icons/Close';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { API_URL } from '../../constants/config';
import { useDispatch } from 'react-redux';

import { setAuthenticated } from '../../features/User/slice';

const LoginModal = () => {
    const modalName = 'loginModal';

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { closeModal, isOpen } = useModal();
    const [isFocusUsername, setIsFocusUsername] = useState(false);
    const [isFocusPassword, setIsFocusPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const { handleSubmit, formState: { errors }, control } = useForm({
        defaultValues: {
            username: '',
            password: ''
        }
    });
    
    const handleOutsideClick = (e) => {
        if (e.target.classList.contains('modal')) {
            closeModal(modalName);
        }
    }

    const handleClosePopup = () => {
        closeModal(modalName);
    }

    const handlelogin = async (data) => {
        const {username, password} = data;

        setIsLoading(true);
        try {
            const response = await axios.post(`${API_URL}/login`, {
                username,
                password
            }, {
                withCredentials: true
            });

            if (response.status === 201) {
                setAuthenticated(true);
                closeModal(modalName);
                navigate(0);
            }

        } catch (error) {
            console.log(error);

            if (error.response && error.response.status === 401) {
                alert('Tên đăng nhập hoặc mật khẩu không đúng.');
            }
        } finally {
            setIsLoading(false);
        }
    }

    const onSubmit = (data) => {
        const { username, password } = data;
        if (username && password) {
            handlelogin(data);
        } else {
            
        }
    }

    return (
        <div className={`modal ${isOpen(modalName) ? 'show' : ''}`} onClick={handleOutsideClick}>
            <div className='login-container'>
                <span className='login-popup-close' onClick={handleClosePopup}>
                    <Close width="20px" height="20px" />
                </span>
                
                <form 
                    className="login-popup-form"
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <div className="form-title">
                        Đăng Nhập
                    </div>

                    <div className="form-desc">
                        Chào mừng bạn quay trở lại! Hãy đăng nhập để tiếp tục khám phá.
                    </div>

                    <div className="normal-login">
                        <div className="input-box">
                            { isFocusUsername && <label htmlFor="" className='input-title'>Tên đăng nhập</label> }
                            <Controller 
                                name='username'
                                control={control}
                                render={({ field }) => (
                                    <Input
                                        {...field}
                                        id='member-id'
                                        placeholder={!isFocusUsername ? ('Tên đăng nhập') : ('')} 
                                        onFocus={() => setIsFocusUsername(true)}
                                        onBlur={() => setIsFocusUsername(false)}
                                    />
                                )}
                            />
                            {errors.username && <p className="error">{errors.username.message}</p>}
                        </div>
                        <div className="input-box">


                            <div className="order-no"></div>    
                            <div className="passwd">
                                <Controller 
                                    name='password'
                                    control={control}
                                    render={({ field }) => (
                                        <Password 
                                            {...field}
                                            className='member-passwd'
                                            placeholder={!isFocusPassword ? ('Mật khẩu') : ('')} 
                                            onFocus={() => setIsFocusPassword(true)}
                                            onBlur={() => setIsFocusPassword(false)}
                                        />
                                    )}
                                />

                                { isFocusPassword && <label htmlFor="" className='input-title'>Mật khẩu</label> }
                                
                            </div>
                        </div>   

                        <div className="login-checkbox"></div>

                        <button className="login-btn" type='submit'>
                            Đăng nhập
                        </button>

                        <div className="util-menu">
                            <a href="">Đăng kí</a>
                            <a href="">Quên mật khẩu</a>  
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default LoginModal;
