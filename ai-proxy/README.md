# ai-proxy — máy chủ trung gian AI (Cloudflare Worker)

Lưu trữ mã nguồn Worker đang chạy tại `https://morning-night-5d0eknks-ai-proxy.mrphuc2009.workers.dev`,
được `static/js/knks-linh-vuc.js` (`AI.PROXY_URL`) và `static/js/tro-ly-ao.js` sử dụng.

- **API:** `POST /api/chat` — body `{ messages: [{role, content}], system?, max_tokens?, temperature?, model? }`
  → `{ provider, source: "shared" | "byok", model, content }`. Lỗi: `{ error }` (429 = hết lượt, 413 = quá lớn).
  `GET /api/health` → `{ ok, providers }`.
- **Key riêng (BYOK):** header `X-User-Provider` (`groq` | `gemini`) + `X-User-Api-Key`; Worker chỉ chuyển tiếp, không lưu.
- **Key dùng chung:** đặt trong **Worker Secrets** (`GROQ_API_KEY`, tuỳ chọn `GEMINI_API_KEY` — chỉ khi đã bật billing).
  **Tuyệt đối không ghi key vào file này hay bất kỳ file nào trong repo.**
- **Mặc định:** `ALLOWED_ORIGINS=https://hethong-quanly.github.io`, 8 lượt/phút và 40 lượt/ngày mỗi IP,
  body tối đa 200 KB, thứ tự `groq,gemini`, model `qwen/qwen3.8-27b`. Không ghi log nội dung.

## Cập nhật Worker
1. Cloudflare Dashboard → Workers & Pages → Worker → **Edit code** → dán `worker.js` → **Deploy**.
2. Settings → Variables and Secrets: thêm/sửa `GROQ_API_KEY` (loại *Secret*).
3. Kiểm tra: `curl https://<worker>/api/health`.
