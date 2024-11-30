import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../../components/Header';

const Order = () => {
    return (
        <div>   
            <Header />
            <Outlet />
        </div>
    );
}

export default Order;