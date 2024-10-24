import React, { useState } from 'react';
import './styles.scss'
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import Shop from '../../../../components/Icons/Shop';
import DescribeItem from '../../components/DescribeItem';

DetailProduct.propTypes = {
    
};

function DetailProduct(props) {
    const { id } = useParams();
    console.log(id);
    const [total, setTotal] = useState(1);

    const [openIndex, setOpenIndex] = useState(null);
    const [colorSelected, setColorSelected] = useState(0);
    const [sizeSelected, setSizeSelected] = useState(0);
    
    const describeItems = [
        { title: 'Chất liệu', content: 'Áo được làm từ 100% cotton, mang lại cảm giác mềm mại, thoáng mát và dễ chịu khi mặc cả ngày.' },
        { title: 'Thiết kế', content: 'Áo có kiểu dáng đơn giản, cổ tròn, tay ngắn, phù hợp với nhiều phong cách khác nhau, từ dạo phố đến đi làm.' },
        { title: 'Màu sắc', content: 'Sắc trắng tinh tế, dễ phối đồ, phù hợp cho cả nam và nữ trong mọi hoàn cảnh.' },
    ];

    const colorItems = [
        { colorName: 'Cream' },
        { colorName: 'Black' },
        { colorName: 'White' },
    ];

    const sizeItems = [
        { sizeName: 'M' },
        { sizeName: 'L' },
        { sizeName: 'XL' },
    ]

    const handleToggleDescribe = (index) => {
        setOpenIndex(openIndex === index ? null : index) ; 
    }

    const handleToggleColor = (index) => {
        setColorSelected(index);
    }

    const handleToggleSize = (index) => {
        setSizeSelected(index);
    }

    const handleMinus = () => {
        if (total > 1) {
            setTotal(total - 1);
        }
    };

    const handlePlus = () => {
        setTotal(total + 1);
    }

    return (
        <div className='product-detail'>
            <div className="detai-contents">
                <div className="wide detail-main">
                    <div className="body">
                        <div className="thumnail-nav">
                            <div className="sticky-area">
                                <div className="product-images">
                                    <div className="swiper-wrapper">
                                        <div className="swipper-slide">
                                            <img src="https://ecimg.cafe24img.com/pg218b67012705022/sshowlab1/web/product/big/20240430/bc5944867fc1902880606fd50ae055ba.jpg" alt="" />
                                        </div>

                                        <div className="swipper-slide">
                                            <img src="https://ecimg.cafe24img.com/pg218b67012705022/sshowlab1/web/product/small/20240430/03b131188c589769e2111628175ce116.jpg" alt="" />
                                        </div>

                                        <div className="swipper-slide">
                                            <img src="https://ecimg.cafe24img.com/pg218b67012705022/sshowlab1/web/product/big/20240430/bc5944867fc1902880606fd50ae055ba.jpg" alt="" />  
                                        </div>

                                        <div className="swipper-slide">
                                            <img src="https://ecimg.cafe24img.com/pg218b67012705022/sshowlab1/web/product/big/20240430/bc5944867fc1902880606fd50ae055ba.jpg" alt="" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="detail-thumnail">
                            <div className="product-image">
                                <img src="https://ecimg.cafe24img.com/pg218b67012705022/sshowlab1/web/product/big/20240430/bc5944867fc1902880606fd50ae055ba.jpg" alt="" />
                            </div>

                            <div className="product-image">
                                <img src="https://ecimg.cafe24img.com/pg218b67012705022/sshowlab1/web/product/big/20240430/bc5944867fc1902880606fd50ae055ba.jpg" alt="" />
                            </div>

                            <div className="product-image">
                                <img src="https://ecimg.cafe24img.com/pg218b67012705022/sshowlab1/web/product/big/20240430/bc5944867fc1902880606fd50ae055ba.jpg" alt="" />
                            </div>

                            <div className="product-image">
                                <img src="https://ecimg.cafe24img.com/pg218b67012705022/sshowlab1/web/product/big/20240430/bc5944867fc1902880606fd50ae055ba.jpg" alt="" />
                            </div>
                        </div>

                        <div className="detail-infor">
                            <div className="sticky-area">
                                <div className="box-infor-product">
                                    <h2 className="title-name-product">
                                        LCK X DUCKDIVE MESH LONG SLEEVE
                                    </h2>

                                    <span className="promotion-product">
                                        LCK X DUCKDIVE MESH LONG SLEEVE
                                    </span>

                                    <span className="price-remove">
                                        100,000đ
                                    </span>

                                    <div className="stock-status">
                                        <div className="rice-discount">
                                            <span className='text-price'>95,000đ</span>
                                            <span className='span-discount'>-5%</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="select-product">
                                    <div className="horizontal"></div>
                                    <div className="transport">
                                        <span className='span-transport'>Vận chuyển</span>
                                        <span className='form-transport'>Miễn phí</span>
                                    </div>

                                    <div className="horizontal"></div>

                                    <div className='select-att'>
                                        <p>Chọn màu sắc</p>
                                        <div className='box-type-att'>
                                            { colorItems.map((colorItem, index) => (
                                                <div
                                                    key={index} 
                                                    className={`att-product ${colorSelected === index ? 'active' : ''}`}
                                                    onClick={() => handleToggleColor(index)}
                                                >
                                                    <span className='span-att'>{ colorItem.colorName }</span>
                                                </div>
                                            )) }
                                        </div>
                                    </div>
                                            
                                    <div className='select-att'>
                                        <p>Chọn kích thước</p>
                                        <div className='box-type-att'>
                                            { sizeItems.map((sizeItem, index) => (
                                                <div
                                                    key={index} 
                                                    className={`att-product ${sizeSelected === index ? 'active' : ''}`}
                                                    onClick={() => handleToggleSize(index)}
                                                >
                                                    <span className='span-att'>{ sizeItem.sizeName }</span>
                                                </div>
                                            )) }
                                        </div>
                                    </div>

                                    <div className="horizontal"></div>

                                    <div className="chose-quatity">
                                        <span className='span-transport'>Chọn số lượng</span>
                                        <div className="button-quatity">
                                            <span className="minus" onClick={handleMinus}>-</span>
                                            <span className='num'>{ total }</span>
                                            <span className='plus' onClick={handlePlus}>+</span>
                                        </div>
                                    </div>

                                    <div className="horizontal"></div>

                                    <div className="button-groups">
                                        <div className="buy-now-btn">
                                            <span>Mua ngay</span>
                                        </div>

                                        <div className="add-cart-btn">
                                            <div className="in-add-cart">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="21" height="20" viewBox="0 0 21 20" fill="none">
                                                    <g clip-path="url(#clip0_2_678)">
                                                        <path d="M7.74996 18.3333C8.2102 18.3333 8.58329 17.9602 8.58329 17.5C8.58329 17.0398 8.2102 16.6667 7.74996 16.6667C7.28972 16.6667 6.91663 17.0398 6.91663 17.5C6.91663 17.9602 7.28972 18.3333 7.74996 18.3333Z" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                                                        <path d="M16.9167 18.3333C17.3769 18.3333 17.75 17.9602 17.75 17.5C17.75 17.0398 17.3769 16.6667 16.9167 16.6667C16.4565 16.6667 16.0834 17.0398 16.0834 17.5C16.0834 17.9602 16.4565 18.3333 16.9167 18.3333Z" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                                                        <path d="M1.08337 0.833336H4.41671L6.65004 11.9917C6.72624 12.3753 6.93496 12.72 7.23966 12.9653C7.54436 13.2105 7.92562 13.3408 8.31671 13.3333H16.4167C16.8078 13.3408 17.1891 13.2105 17.4938 12.9653C17.7984 12.72 18.0072 12.3753 18.0834 11.9917L19.4167 5H5.25004" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                                                    </g>
                                                    <defs>
                                                        <clipPath id="clip0_2_678">
                                                            <rect width="20" height="20" fill="white" transform="translate(0.25)"></rect>
                                                        </clipPath>
                                                    </defs>
                                                </svg>
                                                <span>Thêm giỏ hàng</span>
                                            </div>
                                        </div>  
                                    </div>
                                </div>

                                <div className="product-describes">
                                    { describeItems.map((item, index) => (
                                        <DescribeItem 
                                            key={index}
                                            title={ item.title }
                                            content={ item.content }
                                            isOpen={ openIndex === index }
                                            onToggle={() => handleToggleDescribe(index)}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DetailProduct;