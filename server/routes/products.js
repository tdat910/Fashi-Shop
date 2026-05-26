const express = require("express");
const router = express.Router();
const pool = require("../db");

// GET /api/products?page=1&limit=9
router.get("/", async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 9;
  const offset = (page - 1) * limit;

  try {
    const totalResult = await pool.query("SELECT COUNT(*) FROM products");
    const total = parseInt(totalResult.rows[0].count);

    const result = await pool.query(
      "SELECT * FROM products ORDER BY id ASC LIMIT $1 OFFSET $2",
      [limit, offset]
    );

    res.json({
      data: result.rows,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Lỗi server" });
  }
});

// GET /api/products/:id
router.get("/:id", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM products WHERE id = $1",
      [req.params.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Không tìm thấy sản phẩm" });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Lỗi server" });
  }
});

module.exports = router;