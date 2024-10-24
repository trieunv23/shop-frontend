import React from 'react';
import PropTypes from 'prop-types';
import './styles.scss';

import User from '../Icons/User';
import Shop from '../Icons/Shop';
import Search from '../Icons/Search';
import Menu from '../Icons/Menu';

Header.propTypes = {
    
};

function Header(props) {
    return (
        <div className='header'>
            <div className="top-banner">

            </div>

            <div className='wide'>
                <div className='header-wr'>
                    <div className='logo'>
                        <a href="">
                            <img src="/Pontofrio.png" alt="" />
                        </a>
                    </div>

                    <div className="category">
                        <ul className="category-list">
                            <li className='category-item'>
                                <a href="">Sản phẩm</a>
                            </li>

                            <li className='category-item'>
                                <a href="">Hàng mới</a>
                            </li>

                            <li className='category-item'>
                                <a href="">Áo nam</a>
                            </li>

                            <li className='category-item'>
                                <a href="">Áo nam</a>
                            </li>
                        </ul>
                    </div>

                    <div className='header-gnb'>
                        <ul>
                            <li className='gnb-item menu'>
                                <a href="">
                                    <Menu className='icon'/>
                                </a>
                            </li>

                            <li className='gnb-item'>
                                <a href="">
                                    <User className='icon'/>
                                </a>
                            </li>

                            <li className='gnb-item'>
                                <a href="">
                                    <Shop className='icon'/>
                                    <span className='basket-count'>0</span>
                                </a>
                            </li>

                            <li className='gnb-item'>
                                <a href="">
                                    <Search className='icon'/>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Header;