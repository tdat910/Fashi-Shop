import React from 'react';

const ProductItem = ({ product }) => {
    return (
        <div className="col-lg-4 col-sm-6">
            <div className="product-item">
                <div className="pi-pic">
                    <img src={product.image} alt={product.name} />
                    {product.isSale && <div className="sale pp-sale">Sale</div>}
                    <div className="icon">
                        <i className="icon_heart_alt"></i>
                    </div>
                    <ul>
                        <li className="w-icon active"><a href="#"><i className="icon_bag_alt"></i></a></li>
                        <li className="quick-view"><a href="#">+ Add Cart</a></li>
                        <li className="w-icon"><a href="#"><i className="fa fa-random"></i></a></li>
                    </ul>
                </div>
                <div className="pi-text">
                    <div className="catagory-name">{product.category}</div>
                    <a href="#">
                        <h5>{product.name}</h5>
                    </a>
                    <div className="product-price">
                        {product.price}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductItem;