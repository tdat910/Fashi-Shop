import React from "react";
import ProductItem from "../components/ProductItem";

const ShopPage = () => {
  // Dữ liệu bóc tách chuẩn xác từ 9 sản phẩm trong shop.html của bạn
  const productsData = [
    {
      id: 1,
      name: "Pure Pineapple",
      category: "Towel",
      price: "₫14.00",
      image: "/img/products/product-1.jpg",
      isSale: true,
    },
    {
      id: 2,
      name: "Guangzhou sweater",
      category: "Coat",
      price: "₫13.00",
      image: "/img/products/product-2.jpg",
      isSale: false,
    },
    {
      id: 3,
      name: "Guangzhou sweater",
      category: "Shoes",
      price: "₫34.00",
      image: "/img/products/product-3.jpg",
      isSale: false,
    },
    {
      id: 4,
      name: "Microfiber Wool Scarf",
      category: "Coat",
      price: "₫64.00",
      image: "/img/products/product-4.jpg",
      isSale: false,
    },
    {
      id: 5,
      name: "Men's Painted Hat",
      category: "Shoes",
      price: "₫44.00",
      image: "/img/products/product-5.jpg",
      isSale: false,
    },
    {
      id: 6,
      name: "Converse Shoes",
      category: "Shoes",
      price: "₫34.00",
      image: "/img/products/product-6.jpg",
      isSale: false,
    },
    {
      id: 7,
      name: "Pure Pineapple",
      category: "Towel",
      price: "₫64.00",
      image: "/img/products/product-7.jpg",
      isSale: true,
    },
    {
      id: 8,
      name: "2 Layer Windbreaker",
      category: "Coat",
      price: "₫44.00",
      image: "/img/products/product-8.jpg",
      isSale: false,
    },
    {
      id: 9,
      name: "Converse Shoes",
      category: "Shoes",
      price: "₫34.00",
      image: "/img/products/product-9.jpg",
      isSale: false,
    },
  ];

  return (
    <section className="product-shop spad">
      <div className="container">
        <div className="row">
          <div className="col-lg-12 order-1 order-lg-2">
            <div className="product-list">
              <div className="row">
                {productsData.map((product) => (
                  <ProductItem key={product.id} product={product} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ShopPage;
