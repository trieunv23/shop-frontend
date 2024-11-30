import React, { useEffect, useState } from 'react';
import './styles.scss';

import axios from 'axios';
import { useParams } from 'react-router-dom';
import { API_URL } from '../../../constants/config';
import { formatCurrency } from '../../../utils/priceUtils';
import { InboxOutlined } from '@ant-design/icons';
import { Upload } from 'antd';
import { Controller, useForm } from 'react-hook-form';
import { isValidateImageFile } from '../../../utils/fileUpload';

const { Dragger } = Upload;

const Payment = () => {
    const { id } = useParams();
    const [order, setOrder] = useState(null);
    const [bank, setBank] = useState(null);
    const [qrCode, setQrCode] = useState(null);

    const [imagePreview, setImagePreview] = useState(null);

    const { control, handleSubmit } = useForm({
        defaultValues: {
            file: null,
        }
    });

    const onSubmit = async(data) => {
        if (data && data.file) {
            try {
                const formData = new FormData();
                formData.append('order_id', order.id);
                formData.append('file', data.file);

                const response = await axios.post(`${API_URL}/confirm-payment`, formData, { 
                    withCredentials: true,
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    }
                 });

                console.log(response);
                alert('Thanh toán thành công.');
            } catch (error) {
                console.log(error.response);
            }
        }
    }

    const beforeUpload = (file) => {
        if (!isValidateImageFile(file)) {
            return Upload.LIST_IGNORE;
        }
        return true;
    }

    const handleUploadChange = (infor, field) => {
        const { file } = infor;

        const selectedFile = file.originFileObj || file;
        
        if (selectedFile) {
            field.onChange(selectedFile);

            const imageURL = URL.createObjectURL(selectedFile); 
            setImagePreview(imageURL);
        }
    };

    useEffect(() => {
        const loadPayment = async() => {
            try {
                const response = await axios.get(`${API_URL}/payment/${id}`, { withCredentials: true });
                console.log(response.data);
                setQrCode(response.data.qrCode);
                setBank(response.data.bank);
                setOrder(response.data.order);
            } catch (error) {
                console.log(error.response);
            }
        }

        loadPayment();
    }, []);

    return (
        <div className="payment-wr">
            <div className="payment-left">
                <div className="payment-title">
                    Thanh Toán
                </div>

                { bank && 
                    <form className="payment-content" onSubmit={handleSubmit(onSubmit)}>
                        <div className="payment-field">
                            <span className='payment-field-title'>Tổng tiền hàng</span>
                            <span className='payment-field-value'>{formatCurrency(order.totalAmount)}</span>
                        </div>
                        <div className="payment-field">
                            <span className='payment-field-title'>Số Tài Khoản</span>
                            <span className='payment-field-value'>{bank.bankCode}</span>
                        </div>
                        <div className="payment-field">
                            <span className='payment-field-title'>Tên tài khoản</span>
                            <span className='payment-field-value'>{bank.accountName}</span>
                        </div>
                        <div className="payment-field">
                            <span className='payment-field-title'>Nội dung chuyển khoản</span>
                            <span className='payment-field-value'>{bank.paymentCode}</span>
                        </div>

                        <div className="file-upload">
                            <Controller 
                                name='file'
                                control={control}
                                render={({ field }) => (
                                    <Dragger
                                        onChange={(infor) => handleUploadChange(infor, field)}
                                        accept='image/*'
                                        beforeUpload={beforeUpload}
                                        maxCount={1}
                                    >
                                        <p className="ant-upload-drag-icon">
                                            <InboxOutlined />
                                        </p>
                                        <p className="ant-upload-text">Kéo và thả hình ảnh vào đây hoặc click để chọn ảnh</p>
                                        <p className="ant-upload-hint">Chỉ hỗ trợ file hình ảnh.</p>
                                    </Dragger> 
                                )}
                            />

                            {imagePreview && ( 
                                <div className="image-preview"> 
                                    <img src={imagePreview} alt="Preview" /> 
                                </div> 
                            )}   
                        </div>

                        <div className="btn-submit">
                            <button type='submit'>Xác nhận</button>
                        </div>
                    </form>
                }
            </div>

            <div className="line-center"></div>

            <div className="payment-right">
                { qrCode && 
                    <div className='qrcode'> 
                        <img src={qrCode} alt="QR Code" /> 
                    </div> 
                }
            </div>
        </div>
    );
};

export default Payment;