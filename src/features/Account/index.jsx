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
    const location = useLocation();

    const { optionSelected } = useAccountStatus();

    console.log(location);

    return (
        <div>
            <div className="member-account">
                <div className="wrap">
                    <Header />
                    <div className="account-wr">
                        <div className="account-contents">
                            <div className="account-main wide">
                                <div className="account-menu">
                                    <div className="menu-list">
                                        <Link 
                                            className={`menu-item ${optionSelected === 'profile' ? 'active' : ''}`}
                                            to={'profile'}
                                        >
                                            <Persional />
                                            <span className='item-name'>Thông tin tài khoản</span>
                                        </Link>

                                        <Link 
                                            className={`menu-item ${optionSelected === 'address' ? 'active' : ''}`}
                                            to={'address'}
                                        >
                                            <Location />
                                            <span className='item-name'>Địa chỉ</span>
                                        </Link>

                                        <Link 
                                            className={`menu-item ${optionSelected === 'order' ? 'active' : ''}`}
                                            to={'/order'}
                                        >
                                            <Order />
                                            <span className='item-name'>Đơn mua</span>
                                        </Link>
                                    </div>
                                </div>

                                <div className="account-detail">
                                    <div className="detail-title">
                                        Thông tin tài khoản
                                    </div>

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