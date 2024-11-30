import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './styles.scss';
import axios from 'axios';
import { Link } from 'react-router-dom';
import IconAdd from '../../../../components/icons/Add';
import { API_URL } from '../../../../constants/config';

const Addresses = () => {
    const [addresses, setAddresses] = useState([]);
    
    useEffect(() => {
        const getAddress = async () => {
            try {
                const response = await axios.get(`${API_URL}/get-addresses`, { withCredentials: true });
    
                if (response.status === 201) {
                    setAddresses(response.data.addresses);
                } else {
                    // Do something ? 
                    console.log('Error!');
                }
            } catch (error) {
                console.log(error.response);
            }
        }

        getAddress();
    }, []);

    const handleChangeDefault = async (address_id) => {
        if (address_id) {
            try {
                const response = await axios.post(`${API_URL}/update-default-address`, { address_id }, { withCredentials: true });
                if (response.status === 200) {
                    setAddresses(prevAddresses => 
                        prevAddresses
                            .map(address => ({
                                ...address,
                                is_default: address.id === address_id,
                            }))
                            .sort((a, b) => b.is_default - a.is_default)
                    );
                }
            } catch (error) {
                console.log(error.response);
            }
        }
    }

    const handleDeleteAddress = async (address_id) => {
        if (address_id) {
            try {
                const response = await axios.post(`${API_URL}/delete-address`, { address_id }, { withCredentials: true });
                if (response.status === 200) {
                    setAddresses(prevAddresses => prevAddresses.filter(address => address.id !== address_id));
                }
            } catch (error) {
                console.log(error.response);
            }
        }
    }

    return (
        <div className='address-detail'>
            <Link 
                className="add-address"
                to={'create'}
            >
                <div className="add-icon">
                    <IconAdd />
                </div>
                <span>Thêm địa chỉ mới</span>
            </Link>

            {addresses.map((address) => (
                <div className="address-box" key={address.id}>
                    <div className="address-content">
                        <span className='customer-name'>{ address.customer_name }</span>
                        <div className="address">
                            <span className='address'>Địa chỉ: </span>
                            <span>{`${address.address_detail}, ${address.ward_name}, ${address.district_name}, ${address.province_name}`}</span>
                        </div>

                        <div className="phone-number">
                            <span className='phone-number'>Điện thoại: </span>
                            <span>{ address.phone_number }</span>
                        </div>
                    </div>

                    <div className="address-action">
                        <div className="action-btns">
                            <Link 
                                className='link-url'
                                to={`edit/${address.id}`}
                            >
                                Chỉnh sửa
                            </Link>

                            { !address.is_default && 
                                <button onClick={() => handleDeleteAddress(address.id)}>
                                    Xóa
                                </button>
                            }

                            { !address.is_default && 
                                <button onClick={() => handleChangeDefault(address.id)}>
                                    Đặt làm mặc định
                                </button>
                            }
                        </div>

                        { address.is_default 
                            ? (
                                <div className="action-infor">
                                    <span>Mặc định</span>
                                </div>
                            ) : (
                                <div></div>
                            ) 
                        }
                    </div>
                </div>
            ))}
        </div>
    );
}

export default Addresses;