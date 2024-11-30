import React, { useEffect } from 'react';
import './styles.scss';
import { Outlet } from 'react-router-dom';
import { useAccountStatus } from '../../../context/AccountStatusContext';

const Address = (props) => {
    const { setOptionSelected } = useAccountStatus();

    useEffect(() => {
        setOptionSelected('address');
    }, []);

    return (
        <div>
            <Outlet />
        </div>
    );
}

export default Address;