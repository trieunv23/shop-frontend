import React, { useEffect, useRef, useState } from 'react';
import './styles.scss';
import '../../styles/common.scss';

import SlideShow from './components/SlideShow';
import Product from '../../components/Product';
import Header from '../../components/Header';
import axios from 'axios';

const Home = () => {  
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

    const slides = [
        {id: 1, imageUrl: 'https://ecimg.cafe24img.com/pg218b67012705022/sshowlab1/web/upload/appfiles/ZaReJam3QiELznoZeGGkMG/56db3a532554bab87eb4e942baf2662e.jpg', href: 'fefef'},
        {id: 2, imageUrl: 'https://ecimg.cafe24img.com/pg218b67012705022/sshowlab1/web/upload/appfiles/ZaReJam3QiELznoZeGGkMG/47ef6626e8d8b445a45033da2db49c2f.jpg'},
        {id: 3, imageUrl: 'https://ecimg.cafe24img.com/pg218b67012705022/sshowlab1/web/upload/appfiles/ZaReJam3QiELznoZeGGkMG/56db3a532554bab87eb4e942baf2662e.jpg'},
        {id: 4, imageUrl: 'https://ecimg.cafe24img.com/pg218b67012705022/sshowlab1/web/upload/appfiles/ZaReJam3QiELznoZeGGkMG/70ca8b42b8fb334f403a3f03f7382da9.jpg'},
    ];

    return (
        <div className='main wr'>
            <div className='wrap'>
                <Header />
                <div className="main-wr">
                    <div className="main-contents">
                        <SlideShow slides={slides} />
                        <div className="policies">
                            <div className="wide">
                                <div className="policies-swiper">
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

                        <div className="collections">
                            <div className="wide">
                                <div className="collection-wr">
                                    <div className="collection-item">
                                        <a href="">
                                            <img src="https://file.hstatic.net/1000360022/file/dodilam_5e4f45bc5c8645deb71eea2b8dec4f99_grande.jpg" alt="" />
                                        </a>
                                    </div>

                                    <div className="collection-item">
                                        <a href="">
                                            <img src="https://file.hstatic.net/1000360022/file/techopen_jeans_7e32840e2aba41ecb0cd8772d8eff9ee_grande.jpg" alt="" />
                                        </a>
                                    </div>

                                    <div className="collection-item">
                                        <a href="">
                                            <img src="https://file.hstatic.net/1000360022/file/sp_denim_779deb4755ad4251bc8ecbbca8004673_grande.jpg" alt="" />
                                        </a>
                                    </div>

                                    <div className="collection-item">
                                        <a href="">
                                            <img src="https://file.hstatic.net/1000360022/file/dohangngay_69ac0ead5c7c4b4483520cec6804996a_grande.jpg" alt="" />
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="products">
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
                </div>
            </div>
        </div>
    );
}

export default Home;
