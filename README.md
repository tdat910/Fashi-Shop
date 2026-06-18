# Fashi Shop

Web thương mại điện tử thời trang với tích hợp chatbot AI tư vấn sản phẩm.

**Tech stack:** React (Vite) · Node.js · Express · PostgreSQL · Google Gemini AI

---

## Tính năng

- Hiển thị danh sách sản phẩm với phân trang
- Chatbot AI tư vấn sản phẩm, kết nối trực tiếp với database
- Backend REST API với Node.js + Express
- Database PostgreSQL

---

## Yêu cầu cài đặt

- [Node.js](https://nodejs.org/) v18 trở lên
- [PostgreSQL](https://www.postgresql.org/download/) v15 trở lên
- Google Gemini API Key (miễn phí tại [aistudio.google.com](https://aistudio.google.com))

---

## Cài đặt

### 1. Clone repo

```bash
git clone https://github.com/your-username/Fashi-Shop.git
cd Fashi-Shop
```

### 2. Cài dependencies Frontend

```bash
npm install
```

### 3. Cài dependencies Backend

```bash
cd server
npm install
```

### 4. Tạo database PostgreSQL

Mở pgAdmin hoặc psql, tạo database tên `fashi_shop_db` rồi chạy SQL sau:

```sql
CREATE TABLE products (
  id        SERIAL PRIMARY KEY,
  name      VARCHAR(255) NOT NULL,
  category  VARCHAR(100),
  price     VARCHAR(50),
  image     VARCHAR(255),
  is_sale   BOOLEAN DEFAULT false
);

INSERT INTO products (name, category, price, image, is_sale) VALUES
  ('Pure Pineapple',        'Towel', '₫14.00', '/img/products/product-1.jpg', true),
  ('Guangzhou Sweater',     'Coat',  '₫13.00', '/img/products/product-2.jpg', false),
  ('Guangzhou Sweater',     'Shoes', '₫34.00', '/img/products/product-3.jpg', false),
  ('Microfiber Wool Scarf', 'Coat',  '₫64.00', '/img/products/product-4.jpg', false),
  ('Men''s Painted Hat',    'Shoes', '₫44.00', '/img/products/product-5.jpg', false),
  ('Converse Shoes',        'Shoes', '₫34.00', '/img/products/product-6.jpg', false),
  ('Pure Pineapple',        'Towel', '₫64.00', '/img/products/product-7.jpg', true),
  ('2 Layer Windbreaker',   'Coat',  '₫44.00', '/img/products/product-8.jpg', false),
  ('Converse Shoes',        'Shoes', '₫34.00', '/img/products/product-9.jpg', false);
```

### 5. Cấu hình biến môi trường

**Frontend** — tạo file `.env` ở thư mục gốc (copy từ `.env.example`):

```bash
cp .env.example .env
```

Nội dung file `.env`:
```env
VITE_API_URL=http://localhost:5000
```

**Backend** — tạo file `server/.env` (copy từ `server/.env.example`):

```bash
cp server/.env.example server/.env
```

Mở `server/.env` và điền thông tin của bạn:
```env
DB_HOST=localhost
DB_PORT=5432
DB_NAME=fashi_shop_db
DB_USER=postgres
DB_PASSWORD=mật_khẩu_postgresql_của_bạn

PORT=5000

GEMINI_API_KEY=your_gemini_api_key_here
```

> Lấy Gemini API Key miễn phí tại [aistudio.google.com](https://aistudio.google.com) → Get API Key → Create API Key

---

## Chạy dự án

Mở **2 terminal song song**:

**Terminal 1 — Backend:**
```bash
cd server
node index.js
```
Thấy dòng sau là backend đã sẵn sàng:
```
🚀 Server đang chạy tại http://localhost:5000
✅ Kết nối database thành công!
```

**Terminal 2 — Frontend:**
```bash
npm run dev
```

Mở trình duyệt tại `http://localhost:5173`

---

## Cấu trúc thư mục

```
Fashi-Shop/
├── src/
│   ├── components/
│   │   └── Chatbot/
│   │       ├── Chatbot.jsx       # UI chatbot nổi góc màn hình
│   │       └── Chatbot.css
│   ├── pages/
│   │   └── ShopPage.jsx          # Trang shop với phân trang
│   └── data/                     # (không dùng nữa, đã có DB)
├── server/
│   ├── routes/
│   │   ├── products.js           # API GET /api/products
│   │   └── chat.js               # API POST /api/chat (Gemini AI)
│   ├── db.js                     # Kết nối PostgreSQL
│   ├── index.js                  # Khởi động Express server
│   ├── .env                      # Biến môi trường (không push GitHub)
│   └── .env.example              # Mẫu biến môi trường
├── .env                          # Biến môi trường frontend (không push GitHub)
├── .env.example                  # Mẫu biến môi trường frontend
└── README.md
```

---

## API Endpoints

| Method | Endpoint | Mô tả |
|--------|----------|-------|
| GET | `/api/products?page=1&limit=9` | Lấy danh sách sản phẩm có phân trang |
| GET | `/api/products/:id` | Lấy chi tiết 1 sản phẩm |
| POST | `/api/chat` | Gửi tin nhắn tới chatbot AI |

---

## Kiểm tra model Gemini

Để xem danh sách model Gemini available:

```bash
cd server
node listModels.js
```