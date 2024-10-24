import React from 'react';
import PropTypes from 'prop-types';
import './styles.scss';

Product.propTypes = {
    id: PropTypes.string,
    imageUrl: PropTypes.string,
    name: PropTypes.string,
    price: PropTypes.string,
    status: PropTypes.arrayOf(PropTypes.string),
    url: PropTypes.string
};

function Product(props) {
    const { id, imageUrl, name, price, status, url } = props;

    return (
        <div className="product">
            <div className="product-image">
                <a href={url}>
                    <img src={imageUrl} alt="" />
                </a>
            </div>

            <div className="product-text">
                <div className="name">
                    <a href={url}>
                        <span>{name && name}</span>
                    </a>
                </div>

                <div className="price">
                    <span>{price && price}</span>
                </div>

                { status && status.length > 0 && (
                    <div className="special-status">
                        <ul>
                            { status.map((item, index) => (
                                <li key={index}>{ item }</li>
                            )) }
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Product;