import React, { useEffect, useState } from 'react';
import './styles.scss';
import { Link } from 'react-router-dom';
import { fetchAddresses, updateDefaultAdress, deleteAddress, fetchProvince, fetchWard, fetchDistrict } from '../../../../services/api/addressApi';
import { MESSAGE } from '../../../../constants/config';

const Addresses = () => {
    const [addresses, setAddresses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    
    useEffect(() => {
        const loadAddresses = async () => {
            try {
                const { addresses } = await fetchAddresses();

                const provincePromises = addresses.map(address => fetchProvince(Number(address.province)));
                const districtPromises = addresses.map(address => fetchDistrict(Number(address.district))); 
                const wardPromises = addresses.map(address => fetchWard(Number(address.ward)));

                const provinces = await Promise.all(provincePromises); 
                const districts = await Promise.all(districtPromises); 
                const wards = await Promise.all(wardPromises);

                const updatedAddresses = addresses.map((address, index) => ({
                    ...address,
                    province: provinces[index], 
                    district: districts[index], 
                    ward: wards[index],
                }))

                setAddresses(updatedAddresses);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }  
        }

        loadAddresses();
    }, []);

    const handleUpdateDefaultAddress = async (addressId) => {
        try {
            const isChanged = await updateDefaultAdress(addressId);

            if (isChanged) {
                alert(MESSAGE.SUCCESS.ADDRESS_UPDATED);

                setAddresses(prevAddresses => 
                    prevAddresses
                        .map(address => ({
                            ...address,
                            isDefault: address.id === addressId,
                        }))
                        .sort((a, b) => b.isDefault - a.isDefault)
                );
            } else {
                alert(MESSAGE.ERROR.ADDRESS_UPDATE_DEFAULT_ERROR);
            }
        } catch (error) {
            setError(error.message);
            alert(MESSAGE.ERROR.GENERAL_ERROR);
        }
    }

    const handleDeleteAddress = async (addressId) => {
        try {
            const isDeleted = await deleteAddress(addressId);

            if (isDeleted) {
                alert(MESSAGE.SUCCESS.ADDRESS_DELETED);

                setAddresses(prevAddresses => prevAddresses.filter(address => address.id !== addressId));
            } else {
                alert(MESSAGE.ERROR.ADDRESS_DELETE_ERROR);
            }
        } catch (error) {
            setError(error.message);
            alert(MESSAGE.ERROR.GENERAL_ERROR);
        }
    }

    return (
        <div className='address-detail'>
            <Link 
                className="add-address"
                to={'create'}
            >
                <span>Thêm địa chỉ mới</span>
            </Link>

            {addresses.length > 0 && 
                addresses.map((address) => (
                    <div className="address-box" key={address.id}>
                        <div className="address-content">
                            <span className='customer-name'>{ address.name }</span>
                            <div className="address">
                                <span className='address'>Địa chỉ: </span>
                                <span>{`${address.detail}, ${address.ward.name}, ${address.district.name}, ${address.province.name}`}</span>
                            </div>

                            <div className="phone-number">
                                <span className='phone-number'>Điện thoại: </span>
                                <span>{ address.phoneNumber }</span>
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

                                { !address.isDefault && 
                                    <button onClick={() => handleDeleteAddress(address.id)}>
                                        Xóa
                                    </button>
                                }

                                { !address.isDefault && 
                                    <button onClick={() => handleUpdateDefaultAddress(address.id)}>
                                        Đặt làm mặc định
                                    </button>
                                }
                            </div>

                            { address.isDefault 
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
                )
            )}
        </div>
    );
}

export default Addresses;