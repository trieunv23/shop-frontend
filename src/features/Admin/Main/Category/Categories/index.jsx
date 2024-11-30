import React, { useEffect, useState } from 'react';
import Title from '../../components/Title';
import { Table } from 'antd';
import axios from 'axios';
import { API_URL } from '../../../../../constants/config';

const Categories = ()=> {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const loadCategories = async () => {
            try {
                const response = await axios.get(`${API_URL}/get-categories-admin`, {}, { withCredentials: true });
                setCategories(response.data.categories);
                console.log(response.data.categories);
            } catch (error) {
                console.log(error);
            }
        }

        loadCategories();
    }, []);

    const columns = [
        {
            title: 'Mã phân loại',
            dataIndex: 'categoryCode',
            key: 'categoryCode',
        },
        {
          title: 'Tên phân loại',
          dataIndex: 'name',
          key: 'name',
        },
        {
          title: 'Mô tả',
          dataIndex: 'description',
          key: 'description',
        },
        {
          title: 'Đường dẫn',
          dataIndex: 'slug',
          key: 'slug',
        },
        {
          title: 'Sản phẩm',
          dataIndex: 'productsCount',
          key: 'productsCount',
        },
        {
            title: 'Hành động',
            key: 'action',
            render: (text, record) => (
                <></>
            ),
        },
      ];

    return (
        <div>   
            <Title 
                name='Danh sách phân loại'
                route={'create'}
            />

            <div className="categories-wr">
                <Table 
                    columns={columns}
                    dataSource={categories}
                    rowKey={'id'}
                />
            </div>
        </div>  
    );
};


export default Categories;