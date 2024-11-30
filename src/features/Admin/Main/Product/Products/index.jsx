import React, { useEffect, useState } from 'react';
import './styles.scss';
import Title from '../../components/Title';
import { Button, Table, Tag } from 'antd';
import { API_URL } from '../../../../../constants/config';
import axios from 'axios';

const Products = () => {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);

    useEffect(() => {
        const loadProducts = async() => {
          try {
            const response = await axios.get(`${API_URL}/get-all-products`);
            setProducts(response.data);
            setFilteredProducts(response.data);
            console.log(response);
          } catch (error) {
            console.log(error);
          }
        }
  
        loadProducts();
    }, []);

    const handleSearch = (e) => {
        const term = e.target.value;

        const filtered = products.filter(product => {
            const productCode = product.productCode ? product.productCode.toLowerCase() : '';
            const productName = product.name ? product.name.toLowerCase() : '';
            const productCategories = product.categories && product.categories.length > 0 
                ? product.categories.map(category => category.name.toLowerCase()).join(' ')
                : '';

            return (
                productCategories.includes(term.toLowerCase()) ||
                productName.includes(term.toLowerCase()) ||
                productCode.includes(term.toLowerCase())
            );
        });

        setFilteredProducts(filtered);
    }

    const columns = [
    {
        title: 'Mã sản phẩm',
        dataIndex: 'productCode',
        key: 'productCode',
    },
    {
        title: 'Tên sản phẩm',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: 'Giá',
        dataIndex: 'price',
        key: 'price',
    },
    {
        title: 'Mô tả',
        dataIndex: 'description',
        key: 'description',
    },
    {
        title: 'Khối lượng',
        dataIndex: 'weight',
        key: 'weight',
    },
    {
        title: 'Phân Loại',
        dataIndex: 'categories',
        key: 'categories',
        render: (categories) => (
            <span>
                {categories && categories.length > 0 ? (
                    categories.map(category => (
                    <Tag color="blue" key={category.id}>
                        {category.name}
                    </Tag>
                    ))
                ) : (
                    <Tag color="gray">Không có loại</Tag>
                )}
            </span>
        ),
    },
    {
        title: 'Hành động',
        key: 'action',
        render: (text, record) => (
            <Button>
                Chi tiết
            </Button>
        ),
    },
    ];

    return (
        <div className='ad-products'>
            <Title 
                onChange={handleSearch} 
                route={'create'}
                name={'Danh sách sản phẩm'} 
            /> 
            <Table 
              columns={columns} 
              dataSource={filteredProducts} 
              rowKey="id"
              className='products-list'
            />
        </div>
    );
}

export default Products;