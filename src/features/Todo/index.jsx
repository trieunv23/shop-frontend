import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Route, Routes, useLocation, useMatch } from 'react-router-dom';
import ListPage from './pages/ListPage';
import DetaiPage from './pages/DetailPage';

TodoFeature.propTypes = {};

function TodoFeature(props) {
    return (
        <div>
            <span>Todo Share UI</span>

            <Routes>
                <Route path='/' element={<ListPage />}/>
                <Route path='/:todoId' element={<DetaiPage />}/>
            </Routes>
        </div>
    );
}

export default TodoFeature;