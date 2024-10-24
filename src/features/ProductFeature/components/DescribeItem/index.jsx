import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './styles.scss';

DescribeItem.propTypes = {
    title: PropTypes.string,
    content: PropTypes.string,
    onToggle: PropTypes.func,
    isOpen: PropTypes.bool,
};

function DescribeItem({ title, content, isOpen, onToggle }) {
    return (
        <div className={`describe-item ${isOpen ? 'on' : ''}`}>
            <div className="fold-btn" onClick={onToggle}>
                <p className='fold-title'>{ title }</p>
                { isOpen ? (<span>-</span>) : (<span>+</span>) }
            </div>

            <div className="fold-contents">
                <div className="payment">
                    { content }
                </div>
            </div>
        </div>
    );
}

export default DescribeItem;