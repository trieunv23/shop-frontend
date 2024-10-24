import React from 'react';
import PropTypes from 'prop-types';
import InputField from '../form-controls/InputField';
import { useForm } from 'react-hook-form';

TodoForm.propTypes = {
    onSubmit: PropTypes.func,
};

function TodoForm(props) {
    const form = useForm({
        mode: 'onSubmit',
        defaultValues: {
            title: '',

        },
    })

    const handleSubmit = (values) => {
        console.log('TodoForm: ', values);
    }

    return (
        <form onSubmit={form.handleSubmit(handleSubmit)}>
            Todo Form
            <InputField name='title' label='Todo' form={form}/>
        </form>
    );
}

export default TodoForm;