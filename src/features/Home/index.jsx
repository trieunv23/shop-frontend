import React from 'react';
import PropTypes from 'prop-types';
import Header from '../../components/Header';
import HomePage from './pages/HomePage';
import SlideShow from './components/SlideShow';

HomeFeature.propTypes = {
    
};

function HomeFeature(props) {
    return (
        <div>
            <Header />
            <HomePage />
        </div>
    );
}

export default HomeFeature;