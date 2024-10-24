import React from 'react';
import PropTypes from 'prop-types';
import { Controller } from 'react-hook-form';
import { Input } from 'antd';
import './styles.scss';

InputField.propTypes = {
    form: PropTypes.object.isRequired,
    name: PropTypes.string.isRequired,
    label: PropTypes.string,
};

function InputField(props) {
    const { form, name, label } = props;
    const { control } = form;

    return (
        <div>
            <label>{label}</label>
            <Controller
                name={name}
                control={control}
                rules={{
                    required: 'Vui lòng nhập thông tin',
                    minLength: {
                        value: 3,
                        message: 'Vui lòng nhập nhiều hơn 3 kí tự'
                    }
                }}
                render={({ field, fieldState }) => 
                    <div>
                        <Input 
                        className='input-field' 
                        {...field}
                        placeholder='Title' />
                        { fieldState.error && <p>{fieldState.error.message}</p> }
                    </div>
                }
            />
        </div>
    );
}

export default InputField;
