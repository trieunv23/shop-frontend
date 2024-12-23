import React, { useEffect, useRef, useState } from 'react';
import './styles.scss';
import { Controller, useForm } from "react-hook-form";

import DayOfBirthSelector from '../../../components/DateOfBirthSelector';
import GenderSelector from '../../../components/GenderSelector';
import ResultHandle from '../../../components/ResultHandle/inex';

import { useAccountStatus } from '../../../context/AccountStatusContext';
import { isValidBirthDate } from '../../../utils/dateUtils';
import { isValidDateMinLengthString } from '../../../utils/stringUtils';

import { API_URL, MESSAGE } from '../../../constants/config';
import _ from 'lodash';
import { updateProfile } from '../../../services/api/userApi';
import { validateEmail, validatePhoneNumber } from '../../../utils/fieldUtils';
import { fetchUser } from '../../../services/api/userApi';
import { Link } from 'react-router-dom';

const Profile = () => {
    const { setOptionSelected } = useAccountStatus();

    const [isSuccess, setIsSuccess] = useState(false);
    const [error, setError] = useState('');

    const [profile, setProfile] = useState(null);
    const [initialUserData, setInitialUserData] = useState(null);

    const { handleSubmit, control, setValue, formState: { errors }, trigger } = useForm({
        mode: 'onChange',
        defaultValues: {
            name: '', 
            phoneNumber: '',
            email: '',
            gender: '',
            dayOfBirth: '',
        }
    });

    const onSubmit = async(data) => {
        if (initialUserData) {
            const isUpdated = Object.keys(data).some((key) => data[key] !== initialUserData[key]);
            if (isUpdated) {
                try {
                    const { name, gender, dayOfBirth } = data;

                    const profileData = _.mapKeys({
                        name,
                        gender,
                        dayOfBirth
                        }, (value, key) => _.snakeCase(key)
                    );
                    
                    const isUpdated = await updateProfile(profileData);
    
                    if (isUpdated) {
                        alert(MESSAGE.SUCCESS.USER_PROFILE_UPDATED);
                    } else {
                        alert(MESSAGE.ERROR.USER_PROFILE_UPDATE_ERROR);
                    }
                } catch (error) {
                    setError(error.message);
                    alert(MESSAGE.ERROR.GENERAL_ERROR);
                }
            }
        }
    }

    useEffect(() => {
        const loadUser = async() => {
            try {
                const { profile } = await fetchUser();

                setProfile(profile);
                setInitialUserData(profile);

                const profileFields = ['name', 'phoneNumber', 'email', 'gender', 'dayOfBirth'];

                profileFields.forEach(field => {
                    setValue(field, profile?.[field] || '');
                });
            } catch (error) {
                
            }
        }

        loadUser();
    }, []);

    const hasErrors = Object.keys(errors).length > 0;

    return (
        <form className="profile-content" onSubmit={handleSubmit(onSubmit)}>
            <ResultHandle 
                isSuccess={isSuccess}
                name='Thay đổi thành công' 
                onChange={() => setIsSuccess(false)} 
            /> 
            
            <div className="profile-persional">
                <div className="profile-title">
                    Thông tin tài khoản
                </div>

                <div className="persional-content">
                    <div className="infor-field">
                        <span className='infor-title'>Họ & Tên</span>
                        <div className="input-data">
                            <Controller 
                                name='name'
                                control={control}
                                rules={{
                                    required: 'Tên không được để trống.',
                                    minLength: { value: 3, message: 'Tên phải có ít nhất 3 ký tự.' }
                                }}
                                render={({ field }) => (
                                    <input
                                        {...field} 
                                        type='text' 
                                    />
                                )}
                            />
                        </div>
                        {errors.name && <span className="error-message">{errors.name.message}</span>}
                    </div>

                    <div className="infor-field">
                        <span className='infor-title'>Số điện thoại</span>
                        <div className="input-data">
                            <Controller 
                                name='phoneNumber'
                                control={control}
                                render={({ field }) => (
                                    <input 
                                        {...field}
                                        type="text" 
                                        placeholder='Nhập số điện thoại'
                                    />
                                )}
                            />
                        </div>
                    </div>

                    <div className="infor-field">
                        <span className='infor-title'>Email</span>
                        <div className="input-data">
                            <Controller 
                                name='email'
                                control={control}
                                rules={{ validate: validateEmail }}
                                render={({ field }) => (
                                    <input 
                                        {...field}
                                        type="text" 
                                        placeholder='Nhập emnail'
                                        onBlur={() => trigger("email")}
                                    />
                                )}
                            />
                        </div>

                        {errors.email && <span className="error-message">{errors.email.message}</span>}

                        <div></div>

                        <div className='infor-action'>
                            <button>Cập nhật</button>
                        </div>
                    </div>

                    <div className="infor-field">
                        <span className='infor-title'>Ngày Sinh</span>
                        <div className="input-data">
                            <Controller 
                                name='day_of_birth'
                                control={control}
                                rules={{
                                    validate: value => isValidBirthDate(value) || 'Ngày sinh không hợp lệ, hãy chọn lại ngày khác'
                                }}
                                render={({ field }) => (
                                    <>
                                        <DayOfBirthSelector 
                                            {...field}
                                        />
                                    </>
                                )}
                            />
                        </div>

                        {errors.day_of_birth && <span className="error-message">{errors.day_of_birth.message}</span>}
                        
                    </div>

                    <div className="infor-field">
                        <span className='infor-title'>Giới tính</span>
                        <div className="input-text">
                            <Controller 
                                name='gender'
                                control={control}
                                render={({ field }) => (
                                    <GenderSelector 
                                        {...field}
                                    />
                                )}
                            />
                        </div>
                    </div>

                    <div className="infor-field">
                        <span></span>
                        <div className="input-data">
                            <div className="btn-submit">
                                <button disabled={hasErrors}>Lưu Thay Đổi</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    );
}

export default Profile;