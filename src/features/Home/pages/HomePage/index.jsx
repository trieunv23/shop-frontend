import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import './styles.scss';
import SlideShow from '../../components/SlideShow';
import Product from '../../../../components/Product';

HomePage.propTypes = {};

function HomePage(props) {  
    const products = [
        { 
            imageUrl: 'https://img.lazcdn.com/g/ff/kf/S3aa0e25a6b93404c8e5b9bde3e54afb8o.jpg_720x720q80.jpg_.webp', 
            name: 'Áo Đấu T1 LCK 2023', 
            price: '250k', 
            status: ['Số lượng có hạn'] 
        }, { 
            imageUrl: 'https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-luvxx4ytojyq6a.webp', 
            name: 'Áo Đấu Geng LCK 2023', 
            price: '149k', 
            status: ['Số lượng có hạn', 'Hàng độc quyền'] 
        }, { 
            imageUrl: 'https://down-vn.img.susercontent.com/file/sg-11134202-7rd3s-luenva1ku2i867.webp', 
            name: 'Áo Đấu HLE LCK 2023', 
            price: '699k', 
            status: [] 
        }, { 
            imageUrl: 'https://img.lazcdn.com/g/ff/kf/S3aa0e25a6b93404c8e5b9bde3e54afb8o.jpg_720x720q80.jpg_.webp', 
            name: 'Áo Đấu T1 LCK 2023', 
            price: '499k', 
            status: ['Số lượng có hạn', 'Hàng độc quyền', 'Hết hàng'] 
        },
    ];


    return (
        <div className='home-container'>
            <SlideShow/>
            <div className="policies">
                <div className="wide">
                    <div className="policies-body">
                        <div className="policies-item">
                            <div className="policies-image">
                                <img src="https://file.hstatic.net/1000360022/file/giaohangnhanh_abaa5d524e464a0c8547a91ad9b50968.png" alt="" />
                            </div>

                            <div className="policies-infor">
                                <span className="policies-title">
                                    Miễn phí vận chuyển
                                </span>
                                
                                <span className="policies-desc">
                                    Đơn từ 399k
                                </span>
                            </div>
                        </div>

                        <div className="policies-item">
                            <div className="policies-image">
                                <img src="https://file.hstatic.net/1000360022/file/giaohangnhanh_abaa5d524e464a0c8547a91ad9b50968.png" alt="" />
                            </div>

                            <div className="policies-infor">
                                <span className="policies-title">
                                    Miễn phí vận chuyển
                                </span>
                                
                                <span className="policies-desc">
                                    Đơn từ 399k
                                </span>
                            </div>
                        </div>

                        <div className="policies-item">
                            <div className="policies-image">
                                <img src="https://file.hstatic.net/1000360022/file/giaohangnhanh_abaa5d524e464a0c8547a91ad9b50968.png" alt="" />
                            </div>

                            <div className="policies-infor">
                                <span className="policies-title">
                                    Miễn phí vận chuyển
                                </span>
                                
                                <span className="policies-desc">
                                    Đơn từ 399k
                                </span>
                            </div>
                        </div>

                        <div className="policies-item">
                            <div className="policies-image">
                                <img src="https://file.hstatic.net/1000360022/file/giaohangnhanh_abaa5d524e464a0c8547a91ad9b50968.png" alt="" />
                            </div>

                            <div className="policies-infor">
                                <span className="policies-title">
                                    Miễn phí vận chuyển
                                </span>
                                
                                <span className="policies-desc">
                                    Đơn từ 399k
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="collection-product">
                <div className="wide">
                    <div className="body">
                        <div className="item">
                            <a href="">
                                <img src="https://file.hstatic.net/1000360022/file/dodilam_5e4f45bc5c8645deb71eea2b8dec4f99_grande.jpg" alt="" />
                            </a>
                        </div>

                        <div className="item">
                            <a href="">
                                <img src="https://file.hstatic.net/1000360022/file/techopen_jeans_7e32840e2aba41ecb0cd8772d8eff9ee_grande.jpg" alt="" />
                            </a>
                        </div>

                        <div className="item">
                            <a href="">
                                <img src="https://file.hstatic.net/1000360022/file/sp_denim_779deb4755ad4251bc8ecbbca8004673_grande.jpg" alt="" />
                            </a>
                        </div>

                        <div className="item">
                            <a href="">
                                <img src="https://file.hstatic.net/1000360022/file/dohangngay_69ac0ead5c7c4b4483520cec6804996a_grande.jpg" alt="" />
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            <div className="new-product">
                <div className='wide'>
                    <div className="title">
                        <h1>Hàng Mới</h1>
                    </div>

                    <div className="body">
                        { products.map((product, index) => (
                            <Product 
                                key={index}
                                imageUrl={product.imageUrl}
                                name={product.name}
                                price={product.price}
                                status={product.status}
                            />
                        )) }
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HomePage;
