import React, { useEffect, useState } from 'react';
import './styles.scss';
import axios from 'axios';
import Location from '../../../../components/Location';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import isNotEmptyObject from '../../../../utils/objectUtils';
import { API_URL } from '../../../../constants/config';

const AddressForm = () => {
    const navigate = useNavigate();
    const [address, setAddress] = useState(null);
    
    const { id } = useParams();

    useEffect(() => {
        const loadAddress = async (id) => {
            if (id) {
                try {
                    const response = await axios.get(`${API_URL}/get-address/${id}`, { withCredentials: true });
        
                    if (response.status === 201) {
                        setAddress(response.data.address);
                    } else {
                        console.log('Error!');
                    }
                } catch (error) {
                    console.log(error.response);
                }
            }
        } 
        
        loadAddress(id);
    }, [id]);

    useEffect(() => {
        setValue('customerName', address?.customer_name || '');
        setValue('phoneNumber', address?.phone_number || '');
        setValue('location', 
            {
                province: {
                    id: address?.province_id || '',
                    name: address?.province_name || ''
                },
                district: {
                    id: address?.district_id || '',
                    name: address?.district_name || ''
                },
                ward: {
                    id: address?.ward_id || '',
                    name: address?.ward_name || ''
                }
            },
        );
        setValue('addressDetail', address?.address_detail);
    }, [address]);

    const { handleSubmit, control, formState: { errors }, setValue } = useForm({
        defaultValues: {
            customerName: '',
            phoneNumber: '',
            location: {
                province: {
                    id: '',
                    name: ''
                },
                district: {
                    id: '',
                    name: ''
                },
                ward: {
                    id: '',
                    name: ''
                }
            },
            addressDetail: ''
        }
    });

    const onSubmit = async (data) => {
        if (!isNotEmptyObject(data)) {
            return;
        }

        const { customerName, phoneNumber, location, addressDetail} = data;

        const addressData = {
            id: address?.id,
            customer_name: customerName,
            phone_number: phoneNumber,
            province_id: location.province.id,
            district_id: location.district.id,
            ward_id: location.ward.id,
            province_name: location.province.name,
            district_name: location.district.name,
            ward_name: location.ward.name,
            address_detail: addressDetail
        }

        const apiRoute = addressData.id ? 'update-address' : 'create-address';
        const method = addressData.id ? 'put' : 'post';
        
        try {
            const response = await axios({
                method: method,
                url: `${API_URL}/${apiRoute}`,
                data: addressData,
                withCredentials: true
            });

            console.log(response);
            if (response.status === 200) {
                navigate('/account/address')
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className='address-edit'>
            <form className="edit-form" onSubmit={handleSubmit(onSubmit)}>
                <div className="edit-field">
                    <div className="edit-title">
                        <span>Họ & Tên</span>
                    </div>

                    <Controller 
                        name='customerName'
                        control={control}
                        render={({ field }) => (
                            <div className="edit-input">
                                <input 
                                    {...field}
                                    required
                                    placeholder='Nhập họ và tên'
                                    type="text"      
                                />
                            </div>
                        )}
                    />
                </div>

                <div className="edit-field">
                    <div className="edit-title">
                        <span>Điện thoại</span>
                    </div>

                    <Controller 
                        control={control}
                        name='phoneNumber'
                        render={({ field }) => (
                            <div className="edit-input">
                                <input 
                                    {...field}
                                    required
                                    placeholder='Nhập số điện thoại'
                                    type="text" 
                                />
                            </div>
                        )}
                    />
                </div>

                <Controller 
                    name='location'
                    control={control}
                    render={({ field }) => (
                        <Location 
                            {...field}
                        />
                    )}
                />

                <div className="edit-field">
                    <div className="edit-title">
                        <span>Địa chỉ</span>
                    </div>

                    <div className="edit-input">
                        <Controller 
                            name='addressDetail'
                            control={control}
                            render={({ field }) => (
                                <textarea
                                    {...field}  
                                    name="" 
                                    id="" 
                                    required
                                    placeholder='Nhập địa chỉ'
                                />
                            )}
                        />
                    </div>
                </div>

                <div className="edit-field">
                    <div className="edit-title">
                        
                    </div>

                    <div className="edit-input">
                        <button type='submit'>Cập nhật</button>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default AddressForm;