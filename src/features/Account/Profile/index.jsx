import React, { useEffect, useRef, useState } from 'react';
import './styles.scss';
import { Controller, useForm } from "react-hook-form";
import axios from 'axios';

import DayOfBirthSelector from '../../../components/DateOfBirthSelector';
import Phone from '../../../components/icons/Phone';
import Mail from '../../../components/icons/Mail';
import GenderSelector from '../../../components/GenderSelector';
import ResultHandle from '../../../components/ResultHandle/inex';

import { useAccountStatus } from '../../../context/AccountStatusContext';
import { isValidBirthDate } from '../../../utils/dateUtils';
import { isValidDateMinLengthString } from '../../../utils/stringUtils';

import { API_URL } from '../../../constants/config';

const Profile = () => {
    const { setOptionSelected } = useAccountStatus();

    const [isSuccess, setIsSuccess] = useState(false);

    const [user, setUser] = useState(null);
    const [initialUserData, setInitialUserData] = useState(null);

    const { handleSubmit, control, setValue, formState: { errors } } = useForm({
        mode: 'onChange',
        defaultValues: {
            name: '',
            gender: '',
            day_of_birth: '',
        }
    });

    const updateUserProfile = async (data) => {
        try {
            const response = await axios.put(`${API_URL}/update-profile`, data, { withCredentials: true });

            if (response.status === 200) {
                console.log('Update success');
                setIsSuccess(true);
                return response.data.user;
            } else {
                // Do something ? 
                console.log('Update Error!');
            }
        } catch (error) {
            console.log(error.response);
        }
    }

    const onSubmit = async(data) => {
        if (initialUserData) {
            const isUpdated = Object.keys(data).some((key) => data[key] !== initialUserData[key]);
            if (isUpdated) {
                if (
                    isValidBirthDate(data.day_of_birth) &&
                    isValidDateMinLengthString(data.name, 3) &&
                    data.gender !== null && data.gender !== ''
                ) {
                    const user = await updateUserProfile(data);
                } else {
                    alert('Thông tin không hợp lệ.');
                }
            }
        }
    }

    useEffect(() => {
        setOptionSelected('profile');
    }, []);

    useEffect(() => {
        const getUser = async() => {
            const response = await axios.get(`${API_URL}/get-user`, { withCredentials: true });
            if (response.status === 201) {
                const userData = response.data.user;
                setUser(userData);
                setInitialUserData(userData.profile || {});

                setValue('name', userData.profile?.name || '');
                setValue('gender', userData.profile?.gender || '');
                setValue('day_of_birth', userData.profile?.day_of_birth || '');
            }
        }

        getUser();
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
                <div className="infor-field">
                    <span className='infor-title'>Họ & Tên</span>
                    <Controller 
                        name='name'
                        control={control}
                        rules={{
                            required: 'Tên không được để trống.',
                            minLength: { value: 3, message: 'Tên phải có ít nhất 3 ký tự.' }
                        }}
                        render={({ field }) => (
                            <>
                                <input
                                    {...field} 
                                    type='text' 
                                />
                                {errors.name && <span className="error-message">{errors.name.message}</span>}
                            </>
                        )}
                    />
                </div>

                <div className="infor-field">
                    <span className='infor-title'>Ngày Sinh</span>
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
                                {errors.day_of_birth && <span className="error-message">{errors.day_of_birth.message}</span>}
                            </>
                        )}
                    />
                    
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

                <div className="btn-submit">
                    <button disabled={hasErrors}>Lưu Thay Đổi</button>
                </div>
            </div>

            <div className="vertical"></div>

            <div className="profile-contact">
                <div className="contact-field">
                    <div className="contact-content">
                        <div className="contact-icon">
                            <Phone />
                        </div>

                        <div className="contact-text">
                            <span>Số điện thoại</span>
                            <span>{ user ? user.phone_number : '' }</span>
                        </div>
                    </div>

                    <div className="contact-action">
                        <button>Thay đổi</button>
                    </div>
                </div>

                <div className="contact-field">
                    <div className="contact-content">
                        <div className="contact-icon">
                            <Mail />
                        </div>

                        <div className="contact-text">
                            <span>Email</span>
                            <span>{ user ? user.email : '' }</span>
                        </div>
                    </div>

                    <div className="contact-action">
                        <button type='submit'>Thay đổi</button>
                    </div>
                </div>
            </div>
        </form>
    );
}

export default Profile;