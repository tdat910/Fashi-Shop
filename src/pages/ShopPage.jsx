import React, { useState } from "react";
import ProductItem from "../components/ProductItem";
import productsData from "../data/product.json";
import "/Hoc_Tap_Code/Tổng Hợp Dự Án/Fashi-Shop/public/css/ShopPage.css";

const PRODUCTS_PER_PAGE = 9;

const ShopPage = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(productsData.length / PRODUCTS_PER_PAGE);

  const currentProducts = productsData.slice(
    (currentPage - 1) * PRODUCTS_PER_PAGE,
    currentPage * PRODUCTS_PER_PAGE
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <section className="product-shop spad">
      <div className="container">
        <div className="row">
          <div className="col-lg-12 order-1 order-lg-2">
            <div className="product-list">
              <div className="row">
                {currentProducts.map((product) => (
                  <ProductItem key={product.id} product={product} />
                ))}
              </div>

              {/* Phân trang — chỉ hiện nếu có nhiều hơn 1 trang */}
              {totalPages > 1 && (
                <div className="product-pagination">
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                  >
                    &laquo; Trước
                  </button>

                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <button
                      key={page}
                      onClick={() => handlePageChange(page)}
                      className={currentPage === page ? "active" : ""}
                    >
                      {page}
                    </button>
                  ))}

                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                  >
                    Sau &raquo;
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ShopPage;