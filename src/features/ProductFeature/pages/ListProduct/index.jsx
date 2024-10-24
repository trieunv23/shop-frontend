import React from 'react';
import PropTypes from 'prop-types';
import './styles.scss';
import Product from '../../../../components/Product';
import { useParams } from 'react-router-dom';

ListProduct.propTypes = {
    
};

function ListProduct(props) {
    const { filter } = useParams();
    console.log(filter)

    const products = [
        { 
            id: '1',
            imageUrl: 'https://img.lazcdn.com/g/ff/kf/S3aa0e25a6b93404c8e5b9bde3e54afb8o.jpg_720x720q80.jpg_.webp', 
            name: 'Áo Đấu T1 LCK 2023', 
            price: '250k', 
            status: ['Số lượng có hạn'] 
        }, { 
            id: '2',
            imageUrl: 'https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-luvxx4ytojyq6a.webp', 
            name: 'Áo Đấu Geng LCK 2023', 
            price: '149k', 
            status: ['Số lượng có hạn', 'Hàng độc quyền'] 
        }, { 
            id: '3',
            imageUrl: 'https://down-vn.img.susercontent.com/file/sg-11134202-7rd3s-luenva1ku2i867.webp', 
            name: 'Áo Đấu HLE LCK 2023', 
            price: '699k', 
            status: [] 
        }, { 
            id: '4',
            imageUrl: 'https://img.lazcdn.com/g/ff/kf/S3aa0e25a6b93404c8e5b9bde3e54afb8o.jpg_720x720q80.jpg_.webp', 
            name: 'Áo Đấu T1 LCK 2023', 
            price: '499k', 
            status: ['Số lượng có hạn', 'Hàng độc quyền', 'Hết hàng'] 
        },
    ];

    return (
        <div className='product-body'>
            <div className="wide">
                <div className="title">
                    <span>Tất cả</span>
                </div>
            </div>

            <div className="wide">
                <div className="product-menu">
                    <div className="product-total">
                        <span>Có</span>
                        <span className='count'>23</span>
                        <span>sản phẩm</span>
                    </div>

                    <div className="product-options">
                        <select name="" id="">
                            <option value="">Giá: Tăng dần</option>
                            <option value="">Giá: Giảm dần</option>
                            <option value="">Bán chạy nhất fewf</option>
                        </select>    
                    </div>  
                </div>

                <div className="product-list">
                    { products.map((product, index) => (
                        <Product 
                            key={product.id}
                            id={product.id}
                            imageUrl={product.imageUrl}
                            name={product.name}
                            price={product.price}
                            status={product.status}
                            url={`/product/detail/${product.id}`}
                        />
                    )) }
                </div>
                
                <div className="product-page">
                    <a href="">
                        <img src="https://ecimg.cafe24img.com/pg218b67012705022/sshowlab1/web/_ms/img/ms_page_first.png" alt="" />
                    </a>
                    <a href="">
                        <img src="https://ecimg.cafe24img.com/pg218b67012705022/sshowlab1/web/_ms/img/ms_page_prev.png" alt="" />
                    </a>
                    <ol>
                        <li>
                            <a href="">1</a>
                        </li>
                    </ol>
                    <a href="">
                        <img src="https://ecimg.cafe24img.com/pg218b67012705022/sshowlab1/web/_ms/img/ms_page_next.png" alt="" />
                    </a>
                    <a href="">
                        <img src="https://ecimg.cafe24img.com/pg218b67012705022/sshowlab1/web/_ms/img/ms_page_last.png" alt="" />
                    </a>
                </div>
                
            </div>
        </div>
    );
}

export default ListProduct;