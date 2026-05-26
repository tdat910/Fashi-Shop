import React, { useState, useEffect } from "react";
import ProductItem from "../components/ProductItem";

const PRODUCTS_PER_PAGE = 9;

const ShopPage = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(
          `http://localhost:5000/api/products?page=${currentPage}&limit=${PRODUCTS_PER_PAGE}`
        );
        if (!res.ok) throw new Error("Không thể tải sản phẩm");
        const json = await res.json();
        setProducts(json.data);
        setTotalPages(json.pagination.totalPages);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [currentPage]); // gọi lại mỗi khi đổi trang

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (loading) return <p style={{ textAlign: "center", padding: "40px" }}>Đang tải sản phẩm...</p>;
  if (error)   return <p style={{ textAlign: "center", padding: "40px", color: "red" }}>Lỗi: {error}</p>;

  return (
    <section className="product-shop spad">
      <div className="container">
        <div className="row">
          <div className="col-lg-12 order-1 order-lg-2">
            <div className="product-list">
              <div className="row">
                {products.map((product) => (
                  <ProductItem key={product.id} product={product} />
                ))}
              </div>

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