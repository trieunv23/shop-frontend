import React from 'react';
import PropTypes from 'prop-types';
import { Route, Routes } from 'react-router-dom';
import ListProduct from './pages/ListProduct';
import Header from '../../components/Header';
import DetailProduct from './pages/DetailProduct';

ProductFeature.propTypes = {
    
};

function ProductFeature(props) {
    return (
        <div>
            <Header />

            <Routes>
                <Route path='/list/:filter' element={<ListProduct />}/>
                <Route path='/detail/:id'element={<DetailProduct />}/>
            </Routes>
        </div>
    );
}

export default ProductFeature;