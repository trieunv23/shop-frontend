import React, { useEffect, useState } from 'react';
import './styles.scss'
import { useParams } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';

import DescribeItem from '../components/DescribeItem';
import OptionSelector from '../../../components/OptionSelector';
import QuantitySelector from '../../../components/QuantitySelector';
import Shop from '../../../components/icons/Shop';
import axios from 'axios';
import _ from 'lodash';
import isNotEmptyObject from '../../../utils/objectUtils';

import { API_URL } from '../../../constants/config';
import { useDispatch } from 'react-redux';
import { addItem } from '../../Checkout/Cart/slice';

const DetailProduct = (props) => {
    const dispatch = useDispatch();
    const { id } = useParams();

    const [openIndex, setOpenIndex] = useState(null);
    const [colorSelected, setColorSelected] = useState(0);
    const [sizeSelected, setSizeSelected] = useState(0);
    const [total, setTotal] = useState(1);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const [product, setProduct] = useState(null);

    const { handleSubmit, setValue, control } = useForm({
        defaultValues: {
            productId: null,
            colorId: null,
            sizeId: null,
            quantity: null,
        }
    });

    const onSubmit = async (data) => {
        if (!isNotEmptyObject(data)) {
            alert('Vui lòng nhập đầy đủ thông tin');
            return;
        }

        console.log(data);

        try {
            const snakeCaseData =  _.mapKeys(data, (value, key) => _.snakeCase(key));

            const response = await axios.post(`${API_URL}/add-to-cart`, snakeCaseData, { withCredentials: true });
    
            alert('Sản phẩm đã được thêm vào giỏ hàng');
            dispatch(addItem());
        } catch (error) {
            console.error(error);
            alert('Không thể kết nối với server');
        } finally {
            setLoading(false);
        }
    }
    
    const describeItems = [
        { title: 'Chất liệu', content: 'Áo được làm từ 100% cotton, mang lại cảm giác mềm mại, thoáng mát và dễ chịu khi mặc cả ngày.' },
        { title: 'Thiết kế', content: 'Áo có kiểu dáng đơn giản, cổ tròn, tay ngắn, phù hợp với nhiều phong cách khác nhau, từ dạo phố đến đi làm.' },
        { title: 'Màu sắc', content: 'Sắc trắng tinh tế, dễ phối đồ, phù hợp cho cả nam và nữ trong mọi hoàn cảnh.' },
    ];

    useEffect(() => {
        const loadProduct = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`${API_URL}/get-product/${id}`);
                setProduct(response.data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }

        }

        loadProduct();
    }, []);

    useEffect(() => {
        if (product) {
            setValue('productId', product.id);
        }
    }, [product]);

    const handleToggleDescribe = (index) => {
        setOpenIndex(openIndex === index ? null : index) ; 
    }

    const handleToggleColor = (value, option) => {
        setColorSelected(option.value);
    };

    const handleToggleSize = (value, option) => {
        setSizeSelected(option.value);
    };

    const handleTotalChange = (newTotal) => {
        setTotal(newTotal);
    }; 

    if (loading) {
        return <p>Loading...</p>
    }

    if (error) {
        return <p>Error: {error}</p>
    }

    if (!product) {
        return <p>Product not found</p>
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
                                        {product.product_images.map((image, index) => (
                                            <div key={index} className="swipper-slide">
                                                <img src={`${API_URL}/storage/${image.img_url}`} alt="" />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="detail-thumnail">
                            {product.product_images.map((image, index) => (
                                <div 
                                    key={index}
                                    className="product-image"
                                >
                                    <img src={`${API_URL}/storage/${image.img_url}`} alt="" />
                                </div>
                            ))}
                        </div>

                        <form className="detail-infor" onSubmit={handleSubmit(onSubmit)}>
                            <div className="sticky-area">
                                <div className="box-infor-product">
                                    <h2 className="title-name-product">
                                        { product.name }
                                    </h2>

                                    <div className="stock-status">
                                        <div className="rice-discount">
                                            <span className='text-price'>{ product.price }đ</span>
                                            <span className='span-discount'>-5%</span>
                                            <span className="price-remove">
                                                100,000đ
                                            </span>
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

                                    <Controller 
                                        name='colorId'
                                        control={control}
                                        render={({ field }) => (
                                            <OptionSelector 
                                                {...field}
                                                title='Chọn màu sắc' 
                                                options={product.colors}
                                            />
                                        )}
                                    />

                                    <Controller 
                                        name='sizeId'
                                        control={control}
                                        render={({ field }) => (
                                            <OptionSelector 
                                                {...field}
                                                title='Chọn kích thước' 
                                                options={product.sizes} 
                                            />
                                        )}
                                    />

                                    <div className="horizontal"></div>

                                    <div className="chose-quatity">
                                        <span className='span-transport'>Chọn số lượng</span>
                                        <Controller 
                                            name='quantity'
                                            control={control}
                                            render={({ field }) => (
                                                <QuantitySelector {...field}/>
                                            )}
                                        />
                                     </div>   

                                    <div className="horizontal"></div>

                                    <div className="button-groups">
                                        <button className="buy-now-btn" type='submit'>
                                            <span>Mua ngay</span>
                                        </button>

                                        <div className="add-cart-btn">
                                            <div className="in-add-cart">
                                                <Shop />
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
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DetailProduct;