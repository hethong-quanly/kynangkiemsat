# Danh mục văn bản căn cứ — Kỹ năng Kiểm sát

- **Repo:** [hethong-quanly/kynangkiemsat](https://github.com/hethong-quanly/kynangkiemsat)
- **Ngày đối chiếu:** 23/11/2026 (Asia/Saigon, UTC+7)
- **File máy đọc được:** `van-ban-can-cu.json` — `Data/van-ban-can-cu.json`
- **Phạm vi:** văn bản được dẫn/căn cứ trong các kỹ năng, trang chủ, `TASK.md`, và kho `Tool/CoSoVanBanPhapLuat`. Không sao chép hết ~385 luật chỉ mục cổng vbpl ngày 14/4/2026.

## Ghi chú nguồn và repo liên quan

- Kho nội bộ `Tool/CoSoVanBanPhapLuat/index.html` (các mảng `DB_VAN_BAN_LUAT`, `LUAT_CONG`, `VB_BO_SUNG`) lấy chỉ mục Bộ luật/Luật theo cổng vbpl **14/4/2026**, rồi bổ sung văn bản ngành. Kỳ họp 2 Quốc hội khóa XVI (bế mạc 21/11/2026) **chưa** có trong kho này.

## Việc cần làm ngay (lệch căn cứ trong phần mềm)

> **Trạng thái 23/11/2026:** đã sửa 3 căn cứ trong `Tool/SoanQdPhanCong/index.html` và module `static/js/knks-linh-vuc.js`; đã cập nhật `TASK.md` sang TTLT 01/2026.

| Mức | Văn bản | Việc | File |
|---|---|---|---|
| Sửa ngay | Luật THAHS **41/2019/QH14** hết hiệu lực 01/7/2026, thay bằng **127/2025/QH15** | Soạn QĐ phân công KSV (mẫu KS THAHS) vẫn ghi căn cứ «Luật Thi hành án hình sự năm 2019» | `Tool/SoanQdPhanCong/index.html` |
| Sửa ngay | Luật THADS **26/2008/QH12** hết hiệu lực 01/7/2026, thay bằng **106/2025/QH15** | Cùng tool, mẫu KS THADS vẫn ghi «Luật Thi hành án dân sự năm 2008» | `Tool/SoanQdPhanCong/index.html` |
| Sửa ngay (nhãn căn cứ) | Luật Tổ chức VKSND **63/2014/QH13** đã được sửa bởi **82/2025/QH15** (HL 01/7/2025): hệ thống tối cao – cấp tỉnh – khu vực | Soạn QĐ phân công chỉ ghi «năm 2014 (sửa đổi, bổ sung)», chưa nêu 82/2025. Kỹ năng án HS đã ghi đúng. | `Tool/SoanQdPhanCong/index.html` |
| Đặc tả lỗi thời | TTLT **04/2018/TTLT-VKSNDTC-BCA-BQP** hết hiệu lực 15/3/2026, thay bằng **01/2026/TTLT-VKSNDTC-BCA-BQP** (ban hành 28/01/2026, HL 15/3/2026) | `TASK.md` và issue #1 còn viết Điều 17 TT 04/2018. **Code** `Data/TinhTuoiThoiHan.html` đã chuyển sang TTLT 01/2026. Không triển khai issue #1 theo bản 2018. | `TASK.md` |

**Nguồn (việc sửa ngay):**

- Luật 127/2025/QH15, HL 01/7/2026; Luật 41/2019 hết hiệu lực cùng ngày — [Cổng chính sách](https://xaydungchinhsach.chinhphu.vn/noi-dung-co-ban-cua-luat-thi-hanh-an-hinh-su-so-127-2025-qh15-119260130151202311.htm), [Công báo](https://congbao.chinhphu.vn/van-ban/luat-so-127-2025-qh15-468573.htm). Lưu ý: một trường metadata Công báo từng ghi «07/01/2026»; lấy theo điều khoản luật (01/7/2026).
- Luật 106/2025/QH15, HL 01/7/2026 — [vanban.chinhphu.vn](https://vanban.chinhphu.vn/?docid=216552&pageid=27160).
- Luật 82/2025/QH15, HL 01/7/2025 — [vanban.chinhphu.vn](https://vanban.chinhphu.vn/?classid=1&docid=214608&orggroupid=1&pageid=27160).
- TTLT 01/2026: ban hành 28/01/2026, HL 15/03/2026 — [vanban.chinhphu.vn](https://vanban.chinhphu.vn/?classid=1&docid=216989&orggroupid=4&pageid=27160).

## Việc phải lên lịch (Kỳ họp 2 Quốc hội khóa XVI, 20–21/11/2026)

Các luật đã thông qua, **số hiệu chính thức chưa thấy trên Công báo** tại thời điểm rà 23/11/2026. Hiệu lực phổ biến: **01/3/2027**.

| Văn bản mới | Ngày thông qua | HL dự kiến | Thay / sửa | Ảnh hưởng phần mềm |
|---|---|---|---|---|
| Bộ luật Hình sự (sửa đổi) | 20/11/2026 | 01/3/2027 | thay 100/2015/QH13 | Định tội, khung hình phạt, KS án HS, THAHS (Điều 63) |
| Bộ luật Tố tụng hình sự (sửa đổi) — 527 điều | 21/11/2026 | 01/3/2027 | thay 101/2015/QH13 | Tính hạn (Điều 135, 117 bản 2015), án HS, mẫu TT 03/2026, trợ lý ảo. Kèm NQ thi hành (HL 03/12/2026) và NQ thí điểm thu hồi tài sản không qua kết tội (HL 01/3/2027) |
| Luật Tổ chức cơ quan điều tra hình sự (sửa đổi) | 20/11/2026 | 01/3/2027 | thay 99/2015/QH13 | Thẩm quyền CQĐT; từ 01/3/2027 không tổ chức CQĐT của VKSNDTC (tin BCA/VOV) |
| Luật Văn bản QPPL (thay Luật Ban hành VBQPPL 64/2025) | 20/11/2026 | 01/3/2027 | thay 64/2025/QH15 | Văn phòng/văn thư; có thể kéo theo NĐ thay 30/2020/NĐ-CP |
| Luật Đất đai (sửa đổi); Luật Đấu giá tài sản (sửa đổi); luật sửa Luật Lưu trữ; Luật Xử lý VPHC (sửa đổi) | 20–21/11/2026 | đợi Công báo | sửa/thay luật hiện hành | Án DS/đất đai, KS THADS (đấu giá), tính hạn lưu trữ |

Nguồn: [Báo Chính phủ — BLTTHS](https://baochinhphu.vn/bo-luat-to-tung-hinh-su-sua-doi-dot-pha-voi-to-tung-dien-tu-truc-tuyen-102261121130340761.htm), [Báo Chính phủ — BLHS và Luật CQĐT](https://baochinhphu.vn/quoc-hoi-thong-qua-2-luat-trong-linh-vuc-hinh-su-102261120175834233.htm), [Cổng chính sách — Luật VBQPPL](https://xaydungchinhsach.chinhphu.vn/quoc-hoi-thong-qua-luat-van-ban-quy-pham-phap-luat-119261120092232114.htm).

## Văn bản đang dùng đúng (còn hiệu lực hoặc đã chuyển sang bản mới)

Nhóm này tool kỹ năng đã dẫn bản hiện hành (chi tiết file/số hiệu trong JSON):

- BLTTHS 101/2015 đã sửa bởi Luật 99/2025/QH15 (HL 01/7/2025) — còn dùng đến 28/2/2027.
- Luật THAHS 127/2025, Luật THADS 106/2025, Luật tạm giữ/tạm giam 128/2025 — đã có trong kỹ năng THAHS/THADS và CSDL.
- TTLT 01/2026 (tính hạn tạm giam); TT 03/2026/TT-VKSTC (biểu mẫu); TT 05/2026/TT-VKSTC (thay TT 02/2024); TT 72/2026/TT-BTC (phí THADS, thay 216/2016 và 74/2019).
- Luật 136/2025/QH15 (sửa Luật Tiếp công dân, Khiếu nại, Tố cáo, HL 01/7/2026) — tool KN-TC đã dẫn số hiệu; nên rà nội dung điều.
- NQ 326/2016/UBTVQH14 (án phí) — đến 23/11/2026 chưa thấy văn bản thay thế.
- NĐ 30/2020/NĐ-CP (văn thư) — chưa thấy nghị định thay; sẽ rà sau Luật VBQPPL 2026.
- Quy chế/QĐ ngành: 06/QĐ-VKSTC (23/3/2026), 09/QĐ-VKSTC (05/5/2026), 50/QĐ-VKSTC, 810/QĐ-VKSTC, 94/QĐ-VKSTC, 358/QĐ-VKSTC, 287/QĐ-VKSTC (KPI — chưa xác minh ngày ký trên chinhphu.vn/TVPL), v.v. — đối chiếu trên cổng VKSNDTC / bản PDF gốc.

## Danh mục rút gọn theo nhóm kỹ năng

| Nhóm / file chính | Căn cứ then chốt đang dẫn |
|---|---|
| Tính tuổi, thời hạn, tạm giữ/tạm giam — `Data/TinhTuoiThoiHan.html` | BLTTHS 101/2015 (khoản 1 Điều 134 cách tính thời hạn tạm giữ, tạm giam; Điều 117, 118); TTLT 01/2026 Điều 17 |
| KS án hình sự — `Tool/KiemSatAnHs` | BLTTHS, BLHS, Luật 99/2025, Luật 63/2014 sửa 82/2025, TT 03/2026, QĐ 06 và 09/QĐ-VKSTC, TTLT 01/2026 |
| KS THAHS — `Tool/KiemSatThahs` | Luật 127/2025, Luật 128/2025, NQ 03/2024/NQ-HĐTP, TTLT 05/08/2026, NĐ 170 và 213/2026, TT BCA 57/88/96/2026, Quy chế 259/QĐ-VKSTC (kèm biểu mẫu; QĐ 39/2018 đã hết HL) |
| KS THADS — `Tool/KiemSatThads` | Luật 106/2025, TT 72/2026/TT-BTC, NĐ 151 và 152/2026, QĐ 810, 94/QĐ-VKSTC |
| KS án dân sự — `Tool/KiemSatAnDs` | BLTTDS 92/2015 sửa Luật 85/2025 và 142/2025, LTTHC 93/2015, QĐ 410, 436/QĐ-VKSTC (QĐ 204/2017 đã được thay) |
| KN-TC — `Tool/GiaiQuyetKnTc` | Luật Khiếu nại, Tố cáo, Tiếp công dân + Luật 136/2025, NĐ 124/2020 (Khiếu nại), NĐ 31/2019 (Tố cáo) — sửa bởi NĐ 155, 156/2026; QĐ 50/QĐ-VKSTC, TTLT 02/2018 (KN-TC trong TTHS) |
| Soạn QĐ phân công — `Tool/SoanQdPhanCong` | Luật TC VKSND, BLTTHS, TT 03/2026, QĐ 810 — đã chuyển sang Luật 127/2025 và 106/2025; dùng chung module `static/js/soan-qd-phan-cong.js` |
| Văn phòng — `Tool/NghiepVuVanPhong` | NĐ 30/2020, Luật Lưu trữ 2024, TT 05/2026, QĐ 358 và 287/QĐ-VKSTC |
| Án phí — `Tool/App_DS` | NQ 326/2016/UBTVQH14 |
| Lãi suất — `Tool/App_tinh_lai_suat` | BLDS 2015, NQ 01/2019/NQ-HĐTP |
| CSDL VBPL — `Tool/CoSoVanBanPhapLuat` | Kho ~385 luật + NĐ/TT/NQ/QĐ ngành; mốc vbpl 14/4/2026 |

## Kết quả xác minh 23/11/2026 (nguồn chinhphu.vn / thuvienphapluat.vn)

Mỗi mục đối chiếu số hiệu, tên, ngày ban hành, ngày hiệu lực với vanban.chinhphu.vn, congbao.chinhphu.vn hoặc thuvienphapluat.vn. «Nguồn ngành» = chỉ có trên Tạp chí Kiểm sát / Báo Bảo vệ pháp luật; «Nguồn phụ» = chỉ có trên trang khác. Mục chưa xác minh **không** đưa vào căn cứ AI.

| Số hiệu | Tên (rút gọn) | Ban hành | Hiệu lực | Kết quả | Nguồn | Ghi chú |
|---|---|---|---|---|---|---|
| 101/2015/QH13 | Bộ luật Tố tụng hình sự 2015 (đã sửa 2021, 2024, 2025) | 27/11/2015 | 01/07/2016 | Đúng | [vanban.chinhphu.vn](https://vanban.chinhphu.vn/?docid=214557&pageid=27160) | Đã xác minh ở đợt trước (nguồn trong mục nguon). |
| 100/2015/QH13 | Bộ luật Hình sự 2015 (đã sửa 2017, 2024, 2025) | 27/11/2015 | 01/01/2018 | Đúng | [baochinhphu.vn](https://baochinhphu.vn/quoc-hoi-thong-qua-2-luat-trong-linh-vuc-hinh-su-102261120175834233.htm) | Đã xác minh ở đợt trước (nguồn trong mục nguon). |
| 91/2015/QH13 | Bộ luật Dân sự 2015 | 24/11/2015 | 01/01/2017 | Đúng | [vanban.chinhphu.vn](https://vanban.chinhphu.vn/?docid=183188&pageid=27160) |  |
| 92/2015/QH13 | Bộ luật Tố tụng dân sự 2015 (sửa bởi Luật 85/2025/QH15, Luật 142/2025/QH15) | 25/11/2015 | 01/07/2016 | **Đã sửa** | [vanban.chinhphu.vn](https://vanban.chinhphu.vn/?docid=183189&pageid=27160) | Bổ sung Luật 142/2025/QH15 (HL 01/3/2026) là văn bản sửa đổi. |
| 93/2015/QH13 | Luật Tố tụng hành chính 2015 (sửa 2025) | 25/11/2015 | 01/07/2016 | Đúng | [congbao.chinhphu.vn](https://congbao.chinhphu.vn/van-ban/luat-so-93-2015-qh13-18405.htm) |  |
| 63/2014/QH13 | Luật Tổ chức Viện kiểm sát nhân dân 2014 (sửa 2025) | 24/11/2014 | 01/06/2015 | Đúng | [vanban.chinhphu.vn](https://vanban.chinhphu.vn/?classid=1&docid=214608&orggroupid=1&pageid=27160) | Đã xác minh ở đợt trước (nguồn trong mục nguon). |
| 82/2025/QH15 | Luật sửa đổi, bổ sung một số điều của Luật Tổ chức Viện kiểm sát nhân dân | 24/06/2025 | 01/07/2025 | Đúng | [vanban.chinhphu.vn](https://vanban.chinhphu.vn/?classid=1&docid=214608&orggroupid=1&pageid=27160) | Đã xác minh ở đợt trước (nguồn trong mục nguon). |
| 34/2024/QH15 | Luật Tổ chức Tòa án nhân dân 2024 (sửa 2025) | 24/06/2024 | 01/01/2025 | Đúng | [vanban.chinhphu.vn](https://vanban.chinhphu.vn/?docid=214577&pageid=27160) |  |
| 41/2019/QH14 | Luật Thi hành án hình sự 2019 | 14/06/2019 | 01/01/2020 | Đúng | [congbao.chinhphu.vn](https://congbao.chinhphu.vn/van-ban/luat-so-127-2025-qh15-468573.htm) | Đã xác minh ở đợt trước (nguồn trong mục nguon). |
| 127/2025/QH15 | Luật Thi hành án hình sự 2025 | 10/12/2025 | 01/07/2026 | Đúng | [vanban.chinhphu.vn](https://vanban.chinhphu.vn) | Đã xác minh ở đợt trước (nguồn trong mục nguon). |
| 26/2008/QH12 | Luật Thi hành án dân sự 2008 (đã sửa nhiều lần) | 14/11/2008 | 01/07/2009 | Đúng | [vanban.chinhphu.vn](https://vanban.chinhphu.vn/?docid=216552&pageid=27160) | Đã xác minh ở đợt trước (nguồn trong mục nguon). |
| 106/2025/QH15 | Luật Thi hành án dân sự 2025 | 05/12/2025 | 01/07/2026 | Đúng | [vanban.chinhphu.vn](https://vanban.chinhphu.vn/?docid=216552&pageid=27160) | Đã xác minh ở đợt trước (nguồn trong mục nguon). |
| 94/2015/QH13 | Luật Thi hành tạm giữ, tạm giam 2015 | 25/11/2015 | 01/07/2016 | Đúng | [vanban.chinhphu.vn](https://vanban.chinhphu.vn/?classid=1&docid=216508&pageid=27160&typegroupid=3) | Đã xác minh ở đợt trước (nguồn trong mục nguon). |
| 128/2025/QH15 | Luật Thi hành tạm giữ, tạm giam và cấm đi khỏi nơi cư trú 2025 | 10/12/2025 | 01/07/2026 | Đúng | [vanban.chinhphu.vn](https://vanban.chinhphu.vn/?classid=1&docid=216508&pageid=27160&typegroupid=3) | Đã xác minh ở đợt trước (nguồn trong mục nguon). |
| 02/2011/QH13 | Luật Khiếu nại 2011 (sửa 2025) | 11/11/2011 | 01/07/2012 | Đúng | [thuvienphapluat.vn](https://thuvienphapluat.vn/van-ban/Thu-tuc-To-tung/Luat-khieu-nai-2011-132446.aspx) |  |
| 25/2018/QH14 | Luật Tố cáo 2018 (sửa 2025) | 12/06/2018 | 01/01/2019 | Đúng | [congbao.chinhphu.vn](https://congbao.chinhphu.vn/van-ban/luat-so-25-2018-qh14-26892.htm) |  |
| 42/2013/QH13 | Luật Tiếp công dân 2013 (sửa 2025) | 25/11/2013 | 01/07/2014 | **Đã sửa** | [vanban.chinhphu.vn](https://vanban.chinhphu.vn/?docid=171414&pageid=27160) | Số hiệu cũ ghi sai 55/2013/QH13; đúng là 42/2013/QH13. |
| 136/2025/QH15 | Luật sửa đổi, bổ sung một số điều của Luật Tiếp công dân, Luật Khiếu nại, Luật Tố cáo | 10/12/2025 | 01/07/2026 | Đúng | [vanban.chinhphu.vn](https://vanban.chinhphu.vn/?docid=216516&pageid=27160) |  |
| 33/2024/QH15 | Luật Lưu trữ 2024 | 21/06/2024 | 01/07/2025 | Nguồn phụ | [luatvietnam.vn](https://luatvietnam.vn/tin-van-ban-moi/danh-sach-cac-luat-duoc-thong-qua-tai-ky-hop-thu-2-quoc-hoi-xvi-186-115980-article.html) | Ngày ban hành/hiệu lực theo caa.gov.vn; chưa mở được trang chinhphu.vn/TVPL của văn bản. |
| 99/2015/QH13 | Luật Tổ chức cơ quan điều tra hình sự 2015 (dẫn trong kỹ năng án HS; đối chiếu với 99/2025 là luật khác) | 26/11/2015 | 01/07/2016 | Đúng | [vanban.chinhphu.vn](https://vanban.chinhphu.vn/default.aspx?docid=183221&pageid=27160) |  |
| 99/2025/QH15 | Luật sửa đổi, bổ sung một số điều của Bộ luật Tố tụng hình sự | 27/06/2025 | 01/07/2025 | Đúng | [vanban.chinhphu.vn](https://vanban.chinhphu.vn/?docid=214557&pageid=27160) | Đã xác minh ở đợt trước (nguồn trong mục nguon). |
| 06/2022/QH15 | Luật Thi đua, khen thưởng 2022 | 15/06/2022 | 01/01/2024 | Đúng | [vanban.chinhphu.vn](https://vanban.chinhphu.vn/?docid=206170&pageid=27160) |  |
| 326/2016/UBTVQH14 | Nghị quyết quy định mức thu, miễn, giảm, thu, nộp, quản lý và sử dụng án phí và lệ phí Tòa án | 30/12/2016 | 01/01/2017 | Đúng | [congbao.chinhphu.vn](https://congbao.chinhphu.vn/van-ban/nghi-quyet-so-326-2016-ubtvqh14-22191.htm) | Đã xác minh ở đợt trước (nguồn trong mục nguon). |
| 04/2018/TTLT-VKSNDTC-BCA-BQP | TTLT phối hợp giữa CQĐT và VKS thực hiện một số quy định BLTTHS (2018) | 19/10/2018 | — | Đúng | [vanban.chinhphu.vn](https://vanban.chinhphu.vn/?classid=1&docid=216989&orggroupid=4&pageid=27160) |  |
| 01/2026/TTLT-VKSNDTC-BCA-BQP | TTLT quy định phối hợp giữa CQĐT và VKS thực hiện một số quy định BLTTHS | 28/01/2026 | 15/03/2026 | Đúng | [vanban.chinhphu.vn](https://vanban.chinhphu.vn/?classid=1&docid=216989&orggroupid=4&pageid=27160) | Đã xác minh ở đợt trước (nguồn trong mục nguon). |
| 03/2026/TT-VKSTC | Thông tư 03/2026/TT-VKSTC ban hành 213 biểu mẫu trong THQCT, kiểm sát việc khởi tố, điều tra, truy tố (Mẫu số  | 09/02/2026 | 15/02/2026 | Đúng | [vanban.chinhphu.vn](https://vanban.chinhphu.vn/?docid=216930&pageid=27160) |  |
| 05/2026/TT-VKSTC | Thông tư 05/2026/TT-VKSTC ngày 09/3/2026 (thay TT 02/2024/TT-VKSTC) — thi đua/khen thưởng, nghiệp vụ VP | 09/03/2026 | 09/03/2026 | Đúng | [congbao.chinhphu.vn](https://congbao.chinhphu.vn/van-ban/thong-tu-so-05-2026-tt-vkstc-469105.htm) |  |
| 02/2024/TT-VKSTC | Thông tư 02/2024/TT-VKSTC (đã được thay) | 12/08/2024 | — | Đúng | — | Đã được thay bằng TT 05/2026/TT-VKSTC. |
| 72/2026/TT-BTC | Thông tư phí thi hành án dân sự (HL 01/7/2026, thay TT 216/2016/TT-BTC và TT 74/2019/TT-BTC) | 23/06/2026 | 01/07/2026 | Đúng | [vanban.chinhphu.vn](https://vanban.chinhphu.vn/?docid=218623&pageid=27160) |  |
| 30/2020/NĐ-CP | Nghị định về công tác văn thư | 05/03/2020 | — | Đúng | [congbao.chinhphu.vn](https://congbao.chinhphu.vn/van-ban/nghi-dinh-so-30-2020-nd-cp-30858.htm) | Đã xác minh ở đợt trước (nguồn trong mục nguon). |
| 05/2026/TTLT-BCA-BQP-VKSNDTC-TANDTC | TTLT quy định phối hợp trong quản lý, thi hành tạm giữ, tạm giam và kiểm sát | 15/06/2026 | 01/07/2026 | **Đã sửa** | [congbao.chinhphu.vn](https://congbao.chinhphu.vn/van-ban/thong-tu-lien-tich-so-05-2026-ttlt-bca-bqp-vksndtc-tandtc-469869.htm) | Bổ sung tên, ngày đúng. |
| 08/2026/TTLT-BCA-BQP-TANDTC-VKSNDTC | TTLT quy định phối hợp thực hiện tha tù trước thời hạn có điều kiện | 22/06/2026 | 01/07/2026 | **Đã sửa** | [vanban.chinhphu.vn](https://vanban.chinhphu.vn/?docid=218788&pageid=27160) | Tên cũ ghi chung chung; sửa đúng nội dung tha tù trước thời hạn có điều kiện. |
| 57/2026/TT-BCA | Thông tư quy định chế độ quản lý giam giữ người bị tạm giữ, tạm giam | 15/05/2026 | 01/07/2026 | **Đã sửa** | [congbao.chinhphu.vn](https://congbao.chinhphu.vn/van-ban/thong-tu-so-57-2026-tt-bca-469656.htm) | Bổ sung tên, ngày. |
| 88/2026/TT-BCA | Thông tư quy định việc gặp, nhận quà, liên lạc của phạm nhân | 10/06/2026 | 01/07/2026 | **Đã sửa** | [congbao.chinhphu.vn](https://congbao.chinhphu.vn/van-ban/thong-tu-so-88-2026-tt-bca-469868.htm) | Bổ sung tên, ngày. |
| 96/2026/TT-BCA | Thông tư ban hành Nội quy cơ sở giam giữ phạm nhân | 19/06/2026 | 01/07/2026 | **Đã sửa** | [congbao.chinhphu.vn](https://congbao.chinhphu.vn/van-ban/thong-tu-so-96-2026-tt-bca-469919.htm) | Bổ sung tên, ngày. |
| 170/2026/NĐ-CP | Nghị định quy định chi tiết Luật Thi hành án hình sự | 15/05/2026 | 01/07/2026 | Đúng | [vanban.chinhphu.vn](https://vanban.chinhphu.vn/?docid=218166&pageid=27160) |  |
| 213/2026/NĐ-CP | Nghị định quy định chi tiết Luật Thi hành tạm giữ, tạm giam và cấm đi khỏi nơi cư trú | 18/06/2026 | 01/07/2026 | Đúng | [vanban.chinhphu.vn](https://vanban.chinhphu.vn/?docid=218508&pageid=27160) |  |
| 151/2026/NĐ-CP | Nghị định quy định tổ chức, hoạt động của văn phòng thi hành án dân sự và Thừa hành viên | 13/05/2026 | 01/07/2026 | **Đã sửa** | [vanban.chinhphu.vn](https://vanban.chinhphu.vn/?docid=218078&pageid=27160) | Tên cũ "liên quan THADS" quá chung; sửa đúng nội dung. |
| 152/2026/NĐ-CP | Nghị định quy định chi tiết một số điều và biện pháp thi hành Luật Thi hành án dân sự (thay NĐ 62/2015/NĐ-CP) | 13/05/2026 | 01/07/2026 | Đúng | [vanban.chinhphu.vn](https://vanban.chinhphu.vn/?docid=218079&pageid=27160) |  |
| 152/2025/NĐ-CP | Nghị định quy định phân cấp, phân quyền trong lĩnh vực thi đua, khen thưởng | 14/06/2025 | 01/07/2025 | Đúng | [vanban.chinhphu.vn](https://vanban.chinhphu.vn/?docid=213955&pageid=27160) | Áp dụng đến 01/3/2027. |
| 161/2026/NĐ-CP | Nghị định quy định mức lương cơ sở và chế độ tiền thưởng | 15/05/2026 | 01/07/2026 | **Đã sửa** | [congbao.chinhphu.vn](https://congbao.chinhphu.vn/van-ban/nghi-dinh-so-161-2026-nd-cp-469550.htm) | Tên cũ sai nội dung; đúng là mức lương cơ sở và chế độ tiền thưởng. |
| 124/2020/NĐ-CP | Nghị định quy định chi tiết một số điều và biện pháp thi hành Luật Khiếu nại | 19/10/2020 | — | **Đã sửa** | [congbao.chinhphu.vn](https://congbao.chinhphu.vn/van-ban/nghi-dinh-so-155-2026-nd-cp-469547.htm) | Repo cũ ghi nhầm "hướng dẫn Luật Tố cáo"; NĐ 124/2020 là hướng dẫn Luật Khiếu nại. |
| 31/2019/NĐ-CP | Nghị định quy định chi tiết một số điều và biện pháp tổ chức thi hành Luật Tố cáo | 10/04/2019 | — | **Đã sửa** | [congbao.chinhphu.vn](https://congbao.chinhphu.vn/van-ban/nghi-dinh-so-155-2026-nd-cp-469547.htm) | Repo cũ ghi nhầm "hướng dẫn Luật Khiếu nại"; NĐ 31/2019 là hướng dẫn Luật Tố cáo. |
| 02/2018/TTLT-VKSTC-TATC-BCA-BQP-BTC-BNN&PTNT | TTLT quy định việc phối hợp thi hành một số quy định của BLTTHS về khiếu nại, tố cáo | 05/09/2018 | 19/10/2018 | **Đã sửa** | [vanban.chinhphu.vn](https://vanban.chinhphu.vn/?classid=1&docid=195161&orggroupid=5&pageid=27160) | Tên cũ ghi sai "tố giác, tin báo về tội phạm" (đó là TTLT 01/2017). TTLT 02/2018 là về khiếu nại, tố cáo trong TTHS — dùng đúng ở Tool/GiaiQuyetKnTc. |
| 02/2025/TT-VKSTC | Thông tư quy định thẩm quyền của VKS các cấp trong THQCT, kiểm sát vụ việc, vụ án hình sự | 30/06/2025 | 01/07/2025 | **Đã sửa** | [congbao.chinhphu.vn](https://congbao.chinhphu.vn/van-ban/thong-tu-so-02-2025-tt-vkstc-45450.htm) | Tên cũ sai. |
| 03/2024/NQ-HĐTP | Nghị quyết hướng dẫn áp dụng BLHS về thời hiệu thi hành bản án, miễn chấp hành hình phạt, giảm mức hình phạt,  | 10/06/2024 | 15/07/2024 | **Đã sửa** | [thuvienphapluat.vn](https://thuvienphapluat.vn/van-ban/Trach-nhiem-hinh-su/Nghi-quyet-03-2024-NQ-HDTP-huong-dan-Bo-luat-Hinh-su-thoi-hieu-thi-hanh-ban-an-483755.aspx) | Tên cũ sai ("trừ thời gian tạm giữ, tạm giam"). |
| 01/2019/NQ-HĐTP | Nghị quyết hướng dẫn áp dụng một số quy định của pháp luật về lãi, lãi suất, phạt vi phạm | 11/01/2019 | 15/03/2019 | Đúng | — |  |
| 06/QĐ-VKSTC | Quy chế THQCT, kiểm sát khởi tố, điều tra, truy tố (23/3/2026; thay QĐ 111/QĐ-VKSTC 17/4/2020) | 23/03/2026 | — | Đúng | [thuvienphapluat.vn](https://thuvienphapluat.vn/van-ban/Thu-tuc-To-tung/Quyet-dinh-06-QD-VKSTC-2026-700285.aspx) |  |
| 09/QĐ-VKSTC | Quy chế công tác thực hành quyền công tố, kiểm sát xét xử vụ án hình sự (thay QĐ 505/QĐ-VKSTC 2017) | 05/05/2026 | — | **Đã sửa** | [thuvienphapluat.vn](https://thuvienphapluat.vn/van-ban/Thu-tuc-To-tung/Quyet-dinh-09-QD-VKSTC-2026-quy-che-cong-tac-kiem-sat-xet-xu-vu-an-hinh-su-728838.aspx) | Bổ sung tên đúng. |
| 50/QĐ-VKSTC | Quyết định ban hành Quy định quy trình giải quyết khiếu nại, tố cáo; kiểm tra QĐ giải quyết khiếu nại có hiệu  | 20/03/2026 | — | Đúng | [thuvienphapluat.vn](https://thuvienphapluat.vn/van-ban/Thu-tuc-To-tung/Quyet-dinh-50-QD-VKSTC-2026-698562.aspx) |  |
| 39/QĐ-VKSTC | Quyết định ban hành 80 biểu mẫu kiểm sát tạm giữ, tạm giam, thi hành án hình sự (2018) | 26/01/2018 | — | **Đã sửa** | — | Hết hiệu lực từ 20/7/2023 (Điều 2 QĐ 259/QĐ-VKSTC thay thế). 23/11/2026: đã thay trên trang THAHS và thẻ trang chủ. Nguồn: thuvienphapluat.vn. |
| 259/QĐ-VKSTC | Quy chế công tác kiểm sát việc tạm giữ, tạm giam, thi hành án hình sự (kèm hệ thống biểu mẫu; thay QĐ 501/QĐ-V | 20/07/2023 | — | Đúng | [thuvienphapluat.vn](https://thuvienphapluat.vn/van-ban/Trach-nhiem-hinh-su/Quyet-dinh-259-QD-VKSTC-2023-583402.aspx) |  |
| 810/QĐ-VKSTC | Quy chế công tác kiểm sát THADS, THAHC | 20/12/2016 | — | Đúng | [thuvienphapluat.vn](https://thuvienphapluat.vn/van-ban/Thu-tuc-To-tung/Quyet-dinh-810-QD-VKSTC-2016-334702.aspx) |  |
| 94/QĐ-VKSTC | Quy trình, kỹ năng trực tiếp kiểm sát tại cơ quan THADS và kiểm sát giải quyết KN-TC về THADS, THAHC | 22/03/2021 | — | Đúng | [thuvienphapluat.vn](https://thuvienphapluat.vn/van-ban/Thu-tuc-To-tung/Quyet-dinh-94-QD-VKSTC-2021-468315.aspx) |  |
| 204/QĐ-VKSTC | Quyết định ban hành biểu mẫu tạm thời (2017) | 01/06/2017 | — | **Đã sửa** | — | Đã được thay bằng QĐ 410/QĐ-VKSTC; gỡ khỏi căn cứ AI. |
| 410/QĐ-VKSTC | Quyết định ban hành biểu mẫu kiểm sát việc giải quyết vụ việc dân sự, vụ án hành chính (01/DS–65/DS, 01/HC–65/ | 25/11/2021 | — | Đúng | [thuvienphapluat.vn](https://thuvienphapluat.vn/van-ban/Thu-tuc-To-tung/Quyet-dinh-410-QD-VKSTC-2021-496065.aspx) |  |
| 436/QĐ-VKSTC | Quy chế công tác kiểm sát việc giải quyết các vụ việc dân sự (thay QĐ 364/QĐ-VKSTC 2017) | 28/11/2025 | — | Nguồn ngành | [kiemsat.vn](https://kiemsat.vn/vksnd-toi-cao-ban-hanh-quy-che-cong-tac-kiem-sat-viec-giai-quyet-cac-vu-viec-dan-su-73654.html) | Chưa có trên chinhphu.vn/TVPL; xác nhận qua Tạp chí Kiểm sát và Báo Bảo vệ pháp luật (cơ quan của VKSNDTC). Lưu ý: TVPL có QĐ 436/QĐ-VKSTC 2020 khác (phá sản). |
| 358/QĐ-VKSTC | QĐ 23/9/2025 — biểu mẫu thống kê | 23/09/2025 | — | Nguồn phụ | — | Chỉ thấy bản sao (nhansu.vn) của trang TVPL; chưa mở được bản chính trên chinhphu/TVPL. |
| 287/QĐ-VKSTC | Quyết định ban hành Bảng danh mục nhiệm vụ KPI dùng chung trong ngành KSND (phiên bản 1.0) | — | — | **Chưa xác minh** | — | Không tìm thấy trên chinhphu.vn/TVPL. Báo Bảo vệ pháp luật ghi ngày 14/9/2026, code trang Văn phòng ghi 19/9/2026 — cần đối chiếu bản gốc. Không đưa vào căn cứ AI; đã bỏ ngày khỏi mô tả trang. |
| 06/CT-VKSTC | Chỉ thị 06/2019/CT-VKSTC — KS THAHS (tool ghi còn hiệu lực) | 18/06/2019 | — | **Đã sửa** | [thuvienphapluat.vn](https://thuvienphapluat.vn/van-ban/Bo-may-hanh-chinh/Chi-thi-06-CT-VKSTC-2019-417601.aspx) | Số hiệu đúng là 06/CT-VKSTC (không có "/2019"). |
| CHUA_CO_SO_HIEU | Bộ luật Tố tụng hình sự (sửa đổi) — thông qua 21/11/2026 (9 phần, 37 chương, 527 điều) | 21/11/2026 | 01/03/2027 | Chưa có số hiệu | [baochinhphu.vn](https://baochinhphu.vn/bo-luat-to-tung-hinh-su-sua-doi-dot-pha-voi-to-tung-dien-tu-truc-tuyen-102261121130340761.htm) | Đã thông qua, chưa công bố số hiệu trên chinhphu.vn/TVPL tại ngày đối chiếu; chưa áp dụng. |
| CHUA_CO_SO_HIEU | Bộ luật Hình sự (sửa đổi) — thông qua 20/11/2026 | 20/11/2026 | 01/03/2027 | Chưa có số hiệu | [mps.gov.vn](https://mps.gov.vn/chinh-sach-phap-luat/bai-viet/quoc-hoi-thong-qua-bo-luat-hinh-su-sua-doi-co-hieu-luc-thi-hanh-tu-ngay-01-3-2027-1795189759) | Đã thông qua, chưa công bố số hiệu trên chinhphu.vn/TVPL tại ngày đối chiếu; chưa áp dụng. |
| CHUA_CO_SO_HIEU | Luật Tổ chức cơ quan điều tra hình sự (sửa đổi) — thông qua 20/11/2026 | 20/11/2026 | 01/03/2027 | Chưa có số hiệu | [baochinhphu.vn](https://baochinhphu.vn/quoc-hoi-thong-qua-2-luat-trong-linh-vuc-hinh-su-102261120175834233.htm) | Đã thông qua, chưa công bố số hiệu trên chinhphu.vn/TVPL tại ngày đối chiếu; chưa áp dụng. |
| CHUA_CO_SO_HIEU | Luật Văn bản quy phạm pháp luật — thông qua 20/11/2026 (thay Luật Ban hành VBQPPL 64/2025/QH15) | 20/11/2026 | 01/03/2027 | Chưa có số hiệu | [xaydungchinhsach.chinhphu.vn](https://xaydungchinhsach.chinhphu.vn/quoc-hoi-thong-qua-luat-van-ban-quy-pham-phap-luat-119261120092232114.htm) | Đã thông qua, chưa công bố số hiệu trên chinhphu.vn/TVPL tại ngày đối chiếu; chưa áp dụng. |
| NHIEU_LUAT_CHUA_SO | Các luật Kỳ họp 2 QH XVI liên quan nghiệp vụ KS (Đất đai sửa đổi; Đấu giá tài sản sửa đổi; Xử lý VPHC sửa đổi; | 20/11/2026 | — | Chưa có số hiệu | [luatvietnam.vn](https://luatvietnam.vn/tin-van-ban-moi/danh-sach-cac-luat-duoc-thong-qua-tai-ky-hop-thu-2-quoc-hoi-xvi-186-115980-article.html) | Đã thông qua, chưa công bố số hiệu trên chinhphu.vn/TVPL tại ngày đối chiếu; chưa áp dụng. |
| 85/2025/QH15 | Luật sửa đổi, bổ sung một số điều của BLTTDS, Luật TTHC, Luật Tư pháp người chưa thành niên, Luật Phá sản và L | 25/06/2025 | 01/07/2025 | Đúng | [vanban.chinhphu.vn](https://vanban.chinhphu.vn/?docid=214582&pageid=27160) |  |
| 142/2025/QH15 | Luật Phục hồi, phá sản (sửa điểm g khoản 1 Điều 214 BLTTDS) | — | 01/03/2026 | Đúng | [congbao.chinhphu.vn](https://congbao.chinhphu.vn/van-ban/luat-so-142-2025-qh15-468702.htm) |  |
| 81/2025/QH15 | Luật sửa đổi, bổ sung một số điều của Luật Tổ chức Tòa án nhân dân | 24/06/2025 | 01/07/2025 | Đúng | [vanban.chinhphu.vn](https://vanban.chinhphu.vn/?docid=214577&pageid=27160) |  |
| 155/2026/NĐ-CP | Nghị định sửa đổi nghị định hướng dẫn Luật Khiếu nại/Luật Tố cáo (cặp với NĐ 156/2026) | 15/05/2026 | 01/07/2026 | Đúng | [congbao.chinhphu.vn](https://congbao.chinhphu.vn/van-ban/nghi-dinh-so-155-2026-nd-cp-469547.htm) |  |
| 156/2026/NĐ-CP | Nghị định sửa đổi nghị định hướng dẫn Luật Khiếu nại/Luật Tố cáo (cặp với NĐ 155/2026) | 15/05/2026 | 01/07/2026 | Đúng | [vanban.chinhphu.vn](https://vanban.chinhphu.vn/?docid=218183&pageid=27160) |  |
| 01/2017/TTLT-BCA-BQP-BTC-BNN&PTNT-VKSNDTC | TTLT quy định việc phối hợp tiếp nhận, giải quyết nguồn tin về tội phạm (tố giác, tin báo, kiến nghị khởi tố); | — | — | Đúng | [thuvienphapluat.vn](https://thuvienphapluat.vn/van-ban/Thu-tuc-To-tung/Thong-tu-lien-tich-01-2017-TTLT-BCA-BQP-BTC-BNN-PTNT-VKSNDTC-368583.aspx) |  |
