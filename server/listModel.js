const https = require("https");
require("dotenv").config();

const API_KEY = process.env.GEMINI_API_KEY;

const options = {
  hostname: "generativelanguage.googleapis.com",
  path: `/v1beta/models?key=${API_KEY}`,
  method: "GET",
};

console.log("🔍 Đang lấy danh sách model Gemini...\n");

const req = https.request(options, (res) => {
  let data = "";
  res.on("data", (chunk) => (data += chunk));
  res.on("end", () => {
    const json = JSON.parse(data);

    if (json.error) {
      console.error("❌ Lỗi:", json.error.message);
      return;
    }

    const models = json.models || [];
    models.forEach((model, i) => {
      console.log(`─────────────────────────────────────`);
      console.log(`[${i + 1}] ${model.displayName}`);
      console.log(`    ID            : ${model.name}`);
      console.log(`    Version       : ${model.version}`);
      console.log(`    Methods       : ${model.supportedGenerationMethods?.join(", ")}`);
      console.log(`    Input tokens  : ${model.inputTokenLimit}`);
      console.log(`    Output tokens : ${model.outputTokenLimit}`);
    });

    console.log(`─────────────────────────────────────`);
    console.log(`\n✅ Tổng cộng: ${models.length} model`);
  });
});

req.on("error", (err) => console.error("❌ Lỗi kết nối:", err.message));
req.end();