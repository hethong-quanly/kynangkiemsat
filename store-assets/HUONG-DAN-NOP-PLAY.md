# Hướng dẫn nộp Kỹ năng Kiểm sát lên Google Play (thử nghiệm kín → chính thức)

> Bước 1 (đang dùng): cả ngành tự tải APK tại **https://hethong-quanly.github.io/app/** — không cần email, không cần Play.
> Bước 2 (tài liệu này): đưa lên Google Play bằng tài khoản nhà phát triển **cá nhân** của anh. Tài khoản cá nhân tạo sau 13/11/2023 phải chạy **thử nghiệm kín với ít nhất 12 người thử tham gia liên tục 14 ngày** rồi mới được xin phát hành chính thức (production).

## Tệp cần tải về máy trước

| Tệp | Lấy ở đâu |
|---|---|
| `KyNangKiemSat-1.0.0-play-upload.aab` | https://github.com/hethong-quanly/kynangkiemsat/releases/tag/app-v1.0.0 |
| `icon-store-512.png`, `feature-graphic-1024x500.png`, `anh-chup/*.png` | thư mục `store-assets/` của repo (nút «Download raw» trên GitHub) |
| Nội dung chữ (tên, mô tả ngắn, mô tả đầy đủ) | `store-assets/NOI-DUNG-CUA-HANG.md` |

**Về khoá ký:** tệp AAB được ký bằng **upload key** (khoá tải lên, lưu ngoài repo trên máy build). Khi bật **Play App Signing** (mặc định với ứng dụng mới), Google ký lại bản phát hành bằng **khoá ký ứng dụng** của Google. Upload key SHA-256: `DB:89:DE:BF:BE:A4:BA:31:1B:66:B7:C3:96:8B:BE:C3:35:8C:4C:7C:27:77:BD:61:2F:B8:3F:87:02:FC:CA:ED`.

## 1. Tạo ứng dụng

1. Vào https://play.google.com/console → **Tạo ứng dụng**.
2. Tên: `Kỹ năng Kiểm sát` · Ngôn ngữ mặc định: **Tiếng Việt** · Loại: **Ứng dụng** · **Miễn phí**.
3. Tích các ô cam kết (Chính sách chương trình dành cho nhà phát triển, luật xuất khẩu Hoa Kỳ) → **Tạo ứng dụng**.

## 2. Thiết lập ứng dụng (Bảng điều khiển → «Thiết lập ứng dụng của bạn»)

| Mục | Khai báo |
|---|---|
| **Chính sách quyền riêng tư** | `https://hethong-quanly.github.io/kynangkiemsat/privacy.html` |
| **Quyền truy cập vào ứng dụng** | «Tất cả chức năng đều dùng được mà không cần quyền truy cập đặc biệt» (không đăng nhập). |
| **Quảng cáo** | Không chứa quảng cáo. |
| **Mức phân loại nội dung (IARC)** | Xem mục 3. |
| **Đối tượng mục tiêu** | Chỉ chọn **18 tuổi trở lên**. Không thu hút trẻ em. |
| **Ứng dụng tin tức** | Không. |
| **Ứng dụng COVID-19 / sức khoẻ** | Không. |
| **An toàn dữ liệu** | Xem mục 4. |
| **Ứng dụng chính phủ** | Xem mục 5 — đọc kỹ trước khi trả lời. |
| **Tính năng tài chính** | Không có. |
| **Danh mục + thông tin liên hệ** | Năng suất; email Google của anh; điện thoại 0939103666; trang web `https://hethong-quanly.github.io/kynangkiemsat/`. |
| **Trang thông tin cửa hàng chính** | Chép từ `NOI-DUNG-CUA-HANG.md`, tải icon 512, ảnh nổi bật 1024×500, 4–8 ảnh điện thoại. |

## 3. Câu trả lời bảng câu hỏi IARC (gợi ý)

- Email nhận chứng nhận: email của anh. Danh mục: **Tất cả các loại khác** (Reference, News, Educational / Utility, Productivity).
- Bạo lực, máu me, nội dung tình dục, ngôn từ thô tục, ma tuý/rượu/thuốc lá, cờ bạc, nội dung kinh dị: **Không**.
- Người dùng có thể tương tác hoặc trao đổi nội dung với nhau: **Không** (không có chat giữa người dùng).
- Chia sẻ vị trí thực của người dùng với người khác: **Không**.
- Cho phép mua hàng kỹ thuật số: **Không**.
- Truy cập Internet không hạn chế (trình duyệt web): **Không** — ứng dụng chỉ mở bộ công cụ của chính nó; vài liên kết ngoài mở bằng trình duyệt.
- Nội dung do AI tạo: ứng dụng có tính năng AI **tuỳ chọn** trả lời văn bản; mỗi câu trả lời có nút **«Báo cáo câu trả lời»** (gửi qua Zalo/SMS/gọi 0939103666) — đúng yêu cầu báo cáo nội dung AI của Google Play.
- Kết quả dự kiến: mức thấp nhất (3+/Mọi người).

## 4. An toàn dữ liệu (Data safety) — khớp với privacy.html

**Thu thập hoặc chia sẻ dữ liệu người dùng?** → **Có** (chỉ do tính năng AI tuỳ chọn).

| Loại dữ liệu | Thu thập | Chia sẻ | Bắt buộc? | Mục đích | Ghi chú |
|---|---|---|---|---|---|
| Hoạt động trong ứng dụng → **Nội dung khác do người dùng tạo** (văn bản, câu hỏi gửi AI) | Có | Không (Groq/Google là bên cung cấp dịch vụ xử lý thay mặt ứng dụng) | **Tuỳ chọn** — chỉ khi người dùng bật AI | Chức năng ứng dụng | **Xử lý tạm thời** (không lưu, không ghi log nội dung) |

- Mã hoá khi truyền: **Có** (HTTPS).
- Người dùng yêu cầu xoá dữ liệu: không lưu dữ liệu trên máy chủ; dữ liệu trên máy (đơn vị công tác, sổ việc, cài đặt) người dùng tự xoá trong ứng dụng/cài đặt trình duyệt.
- **Không** thu thập: vị trí, danh bạ, ảnh, tệp, mã thiết bị, thông tin tài chính, sức khoẻ. Tệp được xử lý trên máy (ẩn danh, đổi tên, OCR).
- Đơn vị công tác, họ tên, chức danh: chỉ lưu trên máy (localStorage), **không truyền đi** → không phải khai báo «thu thập».
- Máy chủ trung gian AI đếm số lượt theo địa chỉ IP để chống lạm dụng, không lưu nội dung — nêu trong privacy.html.
- Lưu ý Google: «Gemini bản miễn phí dùng dữ liệu để huấn luyện» — chỉ khi người dùng tự nhập key Gemini; nếu muốn khai báo chặt, ghi **Chia sẻ: Có** cho nội dung gửi Google Gemini.

## 5. Ứng dụng chính phủ / mạo danh — cần quyết định

- Play hỏi ứng dụng có được **phát triển bởi hoặc thay mặt cơ quan nhà nước** không. Nếu chọn **Có**, phải nộp văn bản xác nhận của cơ quan (giấy uỷ quyền/công văn của VKSND TP Cần Thơ cho phép phát hành, email theo tên miền cơ quan…).
- Tên app hiện có «VKSND TP Cần Thơ», biểu tượng dùng phù hiệu ngành Kiểm sát, chân trang chỉ ghi «Thiên Phúc © 2026» (đã bỏ tên Viện khỏi trang chủ và chân trang). Với tài khoản cá nhân, Google thường coi đây là **mạo danh tổ chức** (chính sách Impersonation) nếu không có giấy xác nhận → dễ bị từ chối.
- Khuyến nghị: (a) xin **văn bản cho phép của lãnh đạo VKSND TP Cần Thơ** rồi khai báo «Có» và tải lên; hoặc (b) nếu không có, dùng tên trên Play «Kỹ năng Kiểm sát», biểu tượng không dùng phù hiệu, và khai báo «Không phải ứng dụng chính phủ». Phát hành APK nội bộ (bước 1) không bị ràng buộc này.

## 6. Thử nghiệm kín (Closed testing)

1. **Kiểm thử và phát hành → Thử nghiệm → Thử nghiệm kín** → «Tạo kênh» (hoặc dùng kênh «Alpha» có sẵn).
2. Tab **Người thử nghiệm**: tạo danh sách email, hoặc chọn **Google Group** (khuyên dùng: tạo nhóm Google, đặt «Ai cũng tham gia được», gửi link nhóm cho đồng nghiệp tự tham gia — không phải gõ từng email). Cần **≥ 12 người** tham gia.
3. Chép **đường link tham gia thử nghiệm** (Opt-in URL) gửi qua Zalo; mỗi người mở link bằng tài khoản Google trên điện thoại → «Trở thành người thử nghiệm» → cài từ Play.
4. **Tạo bản phát hành mới** → chấp nhận **Play App Signing** → tải lên `KyNangKiemSat-1.0.0-play-upload.aab` → tên bản phát hành `1.0.0 (1)` → ghi chú: «Bản thử nghiệm đầu tiên».
5. **Xem xét bản phát hành** → sửa các cảnh báo nếu có → **Bắt đầu phát hành lên kênh thử nghiệm kín** → **Gửi để xem xét** (Tổng quan về việc xuất bản → Gửi thay đổi để xem xét).
6. Duyệt lần đầu thường mất vài ngày.

## 7. Sau khi được duyệt: cập nhật Digital Asset Links (bắt buộc để app không hiện thanh địa chỉ)

1. Play Console → **Kiểm thử và phát hành → Thiết lập → Tính toàn vẹn của ứng dụng → Ký ứng dụng (App signing)**.
2. Chép **Vân tay chứng chỉ SHA-256** của mục **«Chứng chỉ khoá ký ứng dụng»** (App signing key certificate).
3. Thêm vào mảng `sha256_cert_fingerprints` trong `https://github.com/hethong-quanly/hethong-quanly.github.io/blob/main/.well-known/assetlinks.json` (**giữ nguyên** vân tay upload key hiện có để bản APK tải trực tiếp vẫn chạy toàn màn hình):
   ```json
   "sha256_cert_fingerprints": [
     "DB:89:DE:BF:BE:A4:BA:31:1B:66:B7:C3:96:8B:BE:C3:35:8C:4C:7C:27:77:BD:61:2F:B8:3F:87:02:FC:CA:ED",
     "<SHA-256 khoá ký ứng dụng của Play>"
   ]
   ```
4. Kiểm tra: `https://digitalassetlinks.googleapis.com/v1/statements:list?source.web.site=https://hethong-quanly.github.io&relation=delegate_permission/common.handle_all_urls`

## 8. Lên chính thức (Production)

- Sau **14 ngày liên tục** có ≥ 12 người thử đã tham gia: Bảng điều khiển → **Đăng ký quyền truy cập vào bản phát hành chính thức** → trả lời câu hỏi về quá trình thử nghiệm → chờ duyệt → tạo bản phát hành ở kênh **Chính thức** (có thể dùng lại AAB đã thử).

## 9. Cập nhật phiên bản sau này

- Nội dung công cụ tự cập nhật theo web — **không cần** nộp lại khi sửa trang.
- Chỉ build AAB/APK mới khi đổi tên, biểu tượng, gói Android: tăng `appVersionCode` trong `twa-manifest.json`, chạy `bubblewrap build`, tải AAB mới lên Play và APK mới lên GitHub Release, sửa link tải trong `cai-dat.html`.
