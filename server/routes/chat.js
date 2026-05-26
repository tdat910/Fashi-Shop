const express = require("express");
const router = express.Router();
const pool = require("../db");
const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Định nghĩa các tool để Gemini gọi DB
const tools = [
  {
    functionDeclarations: [
      {
        name: "searchProducts",
        description: "Tìm kiếm sản phẩm theo tên hoặc danh mục",
        parameters: {
          type: "OBJECT",
          properties: {
            keyword: {
              type: "STRING",
              description: "Từ khóa tìm kiếm (tên sản phẩm hoặc danh mục)",
            },
          },
          required: ["keyword"],
        },
      },
      {
        name: "getProductsByCategory",
        description: "Lấy danh sách sản phẩm theo danh mục cụ thể",
        parameters: {
          type: "OBJECT",
          properties: {
            category: {
              type: "STRING",
              description: "Tên danh mục: Towel, Coat, Shoes",
            },
          },
          required: ["category"],
        },
      },
      {
        name: "getSaleProducts",
        description: "Lấy danh sách sản phẩm đang giảm giá (sale)",
        parameters: {
          type: "OBJECT",
          properties: {},
        },
      },
      {
        name: "getAllProducts",
        description: "Lấy toàn bộ danh sách sản phẩm trong shop",
        parameters: {
          type: "OBJECT",
          properties: {},
        },
      },
    ],
  },
];

// Hàm thực thi tool gọi DB
const executeTool = async (toolName, args) => {
  try {
    let result;
    switch (toolName) {
      case "searchProducts":
        result = await pool.query(
          "SELECT * FROM products WHERE name ILIKE $1 OR category ILIKE $1",
          [`%${args.keyword}%`]
        );
        break;
      case "getProductsByCategory":
        result = await pool.query(
          "SELECT * FROM products WHERE category ILIKE $1",
          [args.category]
        );
        break;
      case "getSaleProducts":
        result = await pool.query(
          "SELECT * FROM products WHERE is_sale = true"
        );
        break;
      case "getAllProducts":
        result = await pool.query("SELECT * FROM products ORDER BY id ASC");
        break;
      default:
        return { error: "Tool không tồn tại" };
    }
    return { products: result.rows, total: result.rows.length };
  } catch (err) {
    return { error: err.message };
  }
};

// POST /api/chat
router.post("/", async (req, res) => {
  const { message, history = [] } = req.body;

  if (!message) {
    return res.status(400).json({ error: "Thiếu nội dung tin nhắn" });
  }

  try {
    const model = genAI.getGenerativeModel({
      model: "models/gemini-2.5-flash",
      tools,
      systemInstruction: `Bạn là trợ lý tư vấn mua sắm thân thiện của Fashi Shop - cửa hàng thời trang online.
Nhiệm vụ của bạn:
- Tư vấn sản phẩm dựa trên dữ liệu thật từ database
- Trả lời bằng tiếng Việt, ngắn gọn và thân thiện
- Khi khách hỏi về sản phẩm, LUÔN dùng tool để lấy dữ liệu thật từ DB
- Hiển thị tên, giá và trạng thái sale của sản phẩm khi giới thiệu
- Nếu không tìm thấy sản phẩm phù hợp, thông báo lịch sự`,
    });

    const chat = model.startChat({ history });
    let response = await chat.sendMessage(message);
    let result = response.response;

    // Xử lý Tool Use nếu Gemini muốn gọi DB
    while (result.functionCalls() && result.functionCalls().length > 0) {
      const functionCall = result.functionCalls()[0];
      const toolResult = await executeTool(functionCall.name, functionCall.args);

      response = await chat.sendMessage([
        {
          functionResponse: {
            name: functionCall.name,
            response: toolResult,
          },
        },
      ]);
      result = response.response;
    }

    res.json({ reply: result.text() });
  } catch (err) {
    console.error("Gemini error:", err.message);
    res.status(500).json({ error: "Lỗi AI, thử lại sau" });
  }
});

module.exports = router;