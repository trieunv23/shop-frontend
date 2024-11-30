import React, { useEffect, useState } from 'react';
import './styles.scss';
import { useForm, Controller } from 'react-hook-form';
import axios from 'axios';

import { Select, Button, Upload } from 'antd';

import { UploadOutlined } from '@ant-design/icons';
import { API_URL } from '../../../../../constants/config';

import { isValidateImageFile } from '../../../../../utils/fileUpload';
import { useNavigate } from 'react-router-dom';

const ProductForm = () => {
    const navigate = useNavigate();
    const { Option } = Select;
    const [fileList, setFileList] = useState([]);
    const [categories, setCategories] = useState([]);
    const [sizes, setSizes] = useState([]);
    const [colors, setColors] = useState([]);

    const beforeUpload = (file) => {
        if (!isValidateImageFile(file)) {
            return Upload.LIST_IGNORE;
        }
        return true;
    }

    const handleUploadChange = (info, field) => {
        const updatedFileList = info.fileList.map(file => ({
            ...file,
            originFileObj: file.originFileObj || file
        }));
        setFileList(updatedFileList);
        field.onChange(updatedFileList.map(file => file.originFileObj));
    };
    

    const { handleSubmit, control, formState: { errors } } = useForm({
        defaultValues: {
            name: '',
            price: '',
            weight: '',
            description: '',
            categories: [],
            colors: [],
            sizes: [],
            images: []
        }
    });

    const onSubmit = async (data) => {
        console.log(data.images);
        try {
            const formData = new FormData();

            formData.append('name', data.name);
            formData.append('price', data.price);
            formData.append('weight', data.weight);
            formData.append('description', data.description);

            data.categories.forEach((category) => formData.append('categories[]', Number(category)));
            data.colors.forEach((color) => formData.append('colors[]', color ));
            data.sizes.forEach((size) => formData.append('sizes[]', Number(size)));
            data.images.forEach((image) => formData.append('images[]', image));

            await axios.post(`${API_URL}/create-product`, formData, { 
                headers: { 
                    'Content-Type': 'multipart/form-data' 
                },
                withCredentials: true 
            });

            alert('Thêm sản phẩm thành công.');

            navigate('/admin/product');
        } catch (error) {
            console.log(error.response);
        }
    } 

    useEffect(() => {
        const loadCategories = async () => {
            try {
                const response = await axios.get(`${API_URL}/get-categories`);
                setCategories(response.data.categories);
            } catch (error) {
                console.log(error.response);
            }
        } 

        loadCategories();
    }, []);

    useEffect(() => {
        const loadSizes = async () => {
            try {
                const response = await axios.get(`${API_URL}/get-sizes`);
                setSizes(response.data.sizes);
            } catch (error) {
                console.log(error.response);
            }
        } 

        loadSizes();
    }, []);

    useEffect(() => {
        const loadColors = async () => {
            try {
                const response = await axios.get(`${API_URL}/get-colors`);
                setColors(response.data.colors);
            } catch (error) {
                console.log(error.response);
            }
        } 

        loadColors();
    }, []);

    return (
        <div className='adm_addproduct'>
            <div className="add_title">
                <span>Thêm sản phẩm</span>
            </div>

            <form className="add_box" onSubmit={handleSubmit(onSubmit)}>
                <div className="box-fields">
                    <div className="add_list_left">
                        <div className="add_field">
                            <span className='field_title'>Tên sản phẩm:</span>
                            <div className="field_input">
                                <Controller 
                                    name='name'
                                    control={control}
                                    render={({ field }) => (
                                        <input 
                                            {...field}
                                            type="text" 
                                            placeholder='Nhập tên sản phẩm'
                                            required
                                        />
                                    )}
                                />
                            </div>
                        </div>

                        <div className="add_field">
                            <span className='field_title'>Giá Tiền:</span>
                            <div className="field_input">
                                <Controller 
                                    name='price'
                                    control={control}
                                    render={({ field }) => (
                                        <input 
                                            {...field}
                                            type="text" 
                                            placeholder='Nhập giá sản phẩm'
                                            required
                                        />
                                    )}
                                />
                            </div>
                        </div>

                        <div className="add_field">
                            <span className='field_title'>Khối lượng (kg):</span>
                            <div className="field_input">
                                <Controller 
                                    name='weight'
                                    control={control}
                                    render={({ field }) => (
                                        <input 
                                            {...field}
                                            type="text" 
                                            placeholder='Nhập khối lượng'
                                            required
                                        />
                                    )}
                                />
                            </div>
                        </div>

                        <div className="add_field">
                            <span className='field_title'>Mô tả:</span>
                            <div className="field_input">
                                <Controller 
                                    name='description'
                                    control={control}
                                    render={({ field }) => (
                                        <textarea 
                                            {...field}
                                            type="text" 
                                            placeholder='Nhập mô tả'
                                            required
                                        />
                                    )}
                                />
                            </div>
                        </div>

                        <div className="add_field">
                            <span className='field_title'>Phân loại:</span>
                            <div className="field-add">
                                <Controller 
                                    name='categories'
                                    control={control}
                                    render={({ field }) => (
                                        <Select 
                                            {...field} 
                                            mode="multiple"
                                            className='select-field'
                                            placeholder='Chọn phân loại'
                                            required
                                        >
                                            { categories.map((category) => (
                                                <Option 
                                                    value={category.id}
                                                    key={category.id}
                                                >
                                                    { category.name }
                                                </Option>
                                            ))}
                                        </Select>
                                    )}
                                />
                            </div>
                        </div>

                        <div className="add_field">
                            <span className='field_title'>Màu sắc:</span>
                            <div className="field-add">
                                <Controller 
                                    name='colors'
                                    control={control}
                                    render={({ field }) => (
                                        <Select 
                                            {...field} 
                                            mode="multiple"
                                            className='select-field'
                                            placeholder='Chọn màu sắc'
                                            required
                                        >
                                            { colors.map((color) => (
                                                <Option 
                                                    key={color.id}
                                                    value={color.id}
                                                    className='option-field'
                                                >
                                                    { color.name }
                                                </Option>
                                            ))}
                                        </Select>
                                    )}
                                />
                            </div>
                        </div>

                        <div className="add_field">
                            <span className='field_title'>Kích thước:</span>
                            <div className="field-add">
                                <Controller 
                                    name='sizes'
                                    control={control}
                                    render={({ field }) => (
                                        <Select 
                                            {...field} 
                                            mode="multiple"
                                            className='select-field'
                                            placeholder='Chọn kích thước'
                                            required
                                        >
                                            { sizes.map((size) => (
                                                <Option 
                                                    value={size.id}
                                                    key={size.id}
                                                >
                                                    { size.name }
                                                </Option>
                                            ))}
                                        </Select>
                                    )}
                                />
                            </div>
                        </div>

                        <div className="btn-submit">
                            <button type='submit'>Cập nhật</button>
                        </div>
                    </div>

                    <div className="vertical"></div>

                    <div className="add_list_right">
                        <div className="image-add-title">
                            Thêm ảnh
                        </div>

                        <div className="image-wrap">
                            <Controller 
                                name='images'
                                control={control}
                                render={({ field }) => (
                                    <Upload
                                        {...field}
                                        listType="picture"
                                        beforeUpload={beforeUpload}
                                        onChange={(infor) => handleUploadChange(infor, field)}
                                        className='upload-images'
                                        fileList={fileList}
                                    >
                                        <Button icon={<UploadOutlined />}>Upload File</Button>
                                    </Upload>
                                )}
                            />
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default ProductForm;