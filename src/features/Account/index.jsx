import React from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import './styles.scss';
import '../../styles/common.scss';

import Persional from '../../components/icons/Persional';
import Location from '../../components/icons/Location';
import Order from '../../components/icons/Order';
import Header from '../../components/Header';

import { useAccountStatus } from '../../context/AccountStatusContext';

const Account = () => {
    const { optionSelected } = useAccountStatus();

    return (
        <div>
            <div className="member-account">
                <div className="wrap">
                    <Header />
                    <div className="account-wr">
                        <div className="account-contents">
                            <div className="account-main">
                                <div className="account-menu">
                                    <div className="menu-list">
                                        <div className="menu-box">
                                            <span className='menu-title'>Tài khoản</span>

                                            <ul className="menu-content">
                                                <li>
                                                    <Link 
                                                        className={`menu-item ${optionSelected === 'profile' ? 'active' : ''}`}
                                                        to={'profile'}
                                                    >
                                                        <span className='item-name'>Thông tin tài khoản</span>
                                                    </Link>
                                                </li>

                                                <li>
                                                    <Link 
                                                        className={`menu-item ${optionSelected === 'address' ? 'active' : ''}`}
                                                        to={'address'}
                                                    >
                                                        <span className='item-name'>Địa chỉ</span>
                                                    </Link>
                                                </li>
                                            </ul>
                                        </div>

                                        <div className="menu-box">
                                            <span className='menu-title'>Mua sắm</span>

                                            <ul className="menu-content">
                                                <li>
                                                    <Link 
                                                        className={`menu-item ${optionSelected === 'order' ? 'active' : ''}`}
                                                        to={'/order'}
                                                    >
                                                        <span className='item-name'>Đơn mua</span>
                                                    </Link>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>

                                <div className="account-detail">
                                    <Outlet />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Account;