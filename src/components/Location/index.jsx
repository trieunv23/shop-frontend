import React, { forwardRef, useEffect, useState } from 'react';
import axios from 'axios';
import './styles.scss';

const Location = forwardRef(({ value, onChange }, ref) => {
    const [provinces, setProvinces] = useState([]);
    const [province, setProvince] = useState(null);
    const [districts, setDistricts] = useState([]);
    const [district, setDistrict] = useState(null);
    const [wards, setWards] = useState([]);
    const [ward, setWard] = useState(null);

    const loadLocations = async (name, parent_id) => {
        const id_value = parent_id || '';

        try {
            const response = await axios.get(`https://open.oapi.vn/location/${name}/${id_value}?page=0&size=100&`);
            return response.data.data;
        } catch (error) {
            return null;
        }
    }

    useEffect(() => {
        setProvince({ id: value?.province?.id || '', name: value?.province?.name || ''});
        setDistrict({ id: value?.district?.id || '', name: value?.district?.name || ''});
        setWard({ id: value?.ward?.id || '', name: value?.ward?.name || ''});
    }, [value]);

    useEffect(() => {
        const fetchProvinces = async () => {
            const provinces = await loadLocations('provinces');
            setProvinces(provinces);
        };

        fetchProvinces();
    }, []);

    useEffect(() => {
        const fetchDistricts = async () => {
            if (province?.id) {
                console.log('is Called api');
                const districts = await loadLocations('districts', province.id);
                setDistricts(districts);
            } else {
                setDistricts([]);
                setDistrict(null);
            }
        };

        fetchDistricts();
    }, [province?.id]);

    useEffect(() => {
        const fetchWards = async () => {
            if (district?.id) {
                const wards = await loadLocations('wards', district.id);
                setWards(wards);
            } else {
                setWards([]);
                setWard(null);
            }
        };

        fetchWards();
    }, [district]);

    const handleProvinceChange = (e) => {
        const selectedProvince = provinces.find(p => p.id === e.target.value);
        setProvince({ id: selectedProvince?.id || '', name: selectedProvince?.name });
        setDistrict(null);

        onChange({ 
            province: selectedProvince, 
            district: null, 
            ward: null 
        });
    }

    const handleDistrictChange = (e) => {
        const selectedDistrict = districts.find(d => d.id === e.target.value);
        setDistrict({ id: selectedDistrict?.id || '', name: selectedDistrict?.name} );
        setWard(null);

        onChange({ 
            province: province, 
            district: selectedDistrict, 
            ward: null 
        });
    }

    const handleWardChange = (e) => {
        const selectedWard = wards.find(w => w.id === e.target.value);
        setWard({ id: selectedWard?.id || '', name: selectedWard?.name} );

        onChange({ 
            province: province, 
            district: district, 
            ward: selectedWard 
        });
    }

    return (
        <div className='location-field'>
            <div className="edit-field">
                <div className="edit-title">
                    <span>Tỉnh / Thành phố</span>
                </div>

                <div className="edit-input">
                    <select 
                        value={province?.id || ''} 
                        onChange={handleProvinceChange}
                        required
                    >
                        <option value="">Chọn Tỉnh / Thành phố</option>
                        {provinces.map((province) => (
                            <option key={province.id} value={province.id}>
                                { province.name }
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            <div className="edit-field">
                <div className="edit-title">
                    <span>Quận / Huyện</span>
                </div>

                <div className="edit-input">
                    <select 
                        value={district?.id || ''} 
                        onChange={handleDistrictChange}
                        required
                    >
                        <option value="">Chọn Quận / Huyện</option>
                        {districts.map((district) => (
                            <option key={district.id} value={district.id}>
                                { district.name }
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            <div className="edit-field">
                <div className="edit-title">
                    <span>Phường / Xã</span>
                </div>

                <div className="edit-input">
                    <select 
                        value={ward?.id || ''} 
                        onChange={handleWardChange}
                        required
                    >
                        <option value="">Chọn Phường / Xã</option>
                        {wards.map((ward) => (
                            <option key={ward.id} value={ward.id}>
                                { ward.name }
                            </option>
                        ))}
                    </select>
                </div>
            </div>
        </div>
    );
});

export default Location;