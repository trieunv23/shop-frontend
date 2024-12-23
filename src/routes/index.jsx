import React from 'react';
import { useRoutes } from 'react-router-dom';

import { path } from './path';
import Login from '../features/User/Login';
import Register from '../features/User/Register';
import Main from '../features/Main';
import Account from '../features/Account';
import Purchase from '../features/Order';
import Profile from '../features/Account/Profile';
import Email from '../features/Account/Email';
import Address from '../features/Account/Address';
import Addresses from '../features/Account/Address/Addresses';
import AddressForm from '../features/Account/Address/AddressForm';
import Admin from '../features/Admin';
import AdminLogin from '../features/Admin/Login';
import AdminMain from '../features/Admin/Main';
import Customers from '../features/Admin/Main/Customers';
import Dashboard from '../features/Admin/Main/Dashboard';
import AdminBanner from '../features/Admin/Main/Banner';
import AdminOrder from '../features/Admin/Main/Order';
import AdminOrders from '../features/Admin/Main/Order/Orders';
import AdminOrderDetail from '../features/Admin/Main/Order/OrderDetail';
import AdminProduct from '../features/Admin/Main/Product';
import AdminProducts from '../features/Admin/Main/Product/Products';
import AdminProductForm from '../features/Admin/Main/Product/ProductForm';
import AdminCategory from '../features/Admin/Main/Category';
import AdminCategories from '../features/Admin/Main/Category/Categories';
import AdminCategoryForm from '../features/Admin/Main/Category/CategoryForm';
import AdminPayment from '../features/Admin/Main/Payment';
import AdminPayments from '../features/Admin/Main/Payment/Payments';
import AdminPaymentDetail from '../features/Admin/Main/Payment/PaymentDetail';
import Product from '../features/Product';
import Products from '../features/Product/Products';
import DetailProduct from '../features/Product/DetailProduct';
import Checkout from '../features/Checkout';
import Cart from '../features/Checkout/Cart';
import OrderCheckout from '../features/Checkout/Order';
import OrderPayment from '../features/Checkout/Payment';
import Order from '../features/Order';
import Orders from '../features/Order/Orders';
import OrderDetail from '../features/Order/OrderDetail';
import User from '../features/User';

const Routes = () => {
    return useRoutes([
        {
            path: path.user,
            element: <User />,
            children: [
                { path: path.login, element: <Login /> },
                { path: path.register, element: <Register /> }
            ]
        },
        {
            path: path.main,
            element: <Main />
        },
        {
            path: path.account,
            element: <Account />,
            children: [
                { 
                    path: path.profile, 
                    element: <Profile />,
                    children: [

                    ]
                },
                { 
                    path: path.email, 
                    element: <Email />,
                    children: [

                    ]
                },
                { 
                    path: path.address, 
                    element: <Address />,
                    children: [
                        { path: path.addresses, element: <Addresses /> },
                        { path: path.addressCreate, element: <AddressForm /> },
                        { path: path.addressEdit, element: <AddressForm /> }
                    ]
                }
            ]
        },

        {
            path: path.purchase,
            element: <Purchase />
        },
        {
            path: path.admin,
            element: <Admin />,
            children: [
                { path: path.login, element: <AdminLogin /> },
                { 
                    path: path.adMain, 
                    element: <AdminMain />,
                    children: [
                        { path: path.adCustomers, element: <Customers /> },
                        { 
                            path: path.adDashboard, 
                            element: <Dashboard />,
                        },
                        { path: path.adBanner, element: <AdminBanner /> },
                        { 
                            path: path.adOrder, 
                            element: <AdminOrder />, 
                            children: [
                                { path: path.adOrders, element: <AdminOrders /> },
                                { path: path.adOrderDetail, element: <AdminOrderDetail /> }
                            ]
                        },
                        {
                            path: path.adProduct, 
                            element: <AdminProduct />,
                            children: [
                                { path: path.adProducts, element: <AdminProducts /> },
                                { path: path.adProductCreate, element: <AdminProductForm /> },
                                { path: path.adProductEdit, element: <AdminProductForm /> },
                            ] 
                        },
                        {
                            path: path.adCategory,
                            element: <AdminCategory />,
                            children: [
                                { path: path.adCategories, element: <AdminCategories /> },
                                { path: path.adCategoryCreate, element: <AdminCategoryForm /> },
                            ]
                        },
                        {
                            path: path.adPayment, element: <AdminPayment />, 
                            children: [
                                { path: path.adPayments, element: <AdminPayments /> },
                                { path: path.adPaymentEdit, element: <AdminPaymentDetail /> }
                            ]
                        }
                    ]
                }
            ]
        },
        {
            path: path.product, 
            element: <Product />, 
            children: [
                { path: path.productFilter, element: <Products /> },
                { path: path.productDetai, element: <DetailProduct /> },
            ]
        },
        {
            path: path.checkout, 
            element: <Checkout />,
            children: [
                { path: path.cart, element: <Cart /> },
                { path: path.orderCheckout, element: <OrderCheckout /> },
                { path: path.orderPayment, element: <OrderPayment /> }
            ]
        },
        {
            path: path.order,
            element: <Order />,
            children: [
                { path: path.orders, element: <Orders /> },
                { path: path.orderDetail, element: <OrderDetail /> }
            ]
        }
    ]);
};

export default Routes;