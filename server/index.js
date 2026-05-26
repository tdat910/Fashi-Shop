const express = require("express");
const cors = require("cors");
require("dotenv").config();

const productsRouter = require("./routes/products");
const chatRouter = require("./routes/chat");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Routes
app.use("/api/products", productsRouter);
app.use("/api/chat", chatRouter);

// Kiểm tra server còn sống
app.get("/", (req, res) => {
  res.json({ message: "Fashi Shop API đang chạy" });
});

app.listen(PORT, () => {
  console.log(`Server đang chạy tại http://localhost:${PORT}`);
});