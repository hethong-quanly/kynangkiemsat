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
- Quy chế/QĐ ngành: 06/QĐ-VKSTC (23/3/2026), 09/QĐ-VKSTC (05/5/2026), 50/QĐ-VKSTC, 810/QĐ-VKSTC, 94/QĐ-VKSTC, 358/QĐ-VKSTC, 287/QĐ-VKSTC (19/9/2026), v.v. — đối chiếu trên cổng VKSNDTC / bản PDF gốc.

## Danh mục rút gọn theo nhóm kỹ năng

| Nhóm / file chính | Căn cứ then chốt đang dẫn |
|---|---|
| Tính tuổi, thời hạn, tạm giữ/tạm giam — `Data/TinhTuoiThoiHan.html` | BLTTHS 101/2015 (Điều 135, 117); TTLT 01/2026 Điều 17 |
| KS án hình sự — `Tool/KiemSatAnHs` | BLTTHS, BLHS, Luật 99/2025, Luật 63/2014 sửa 82/2025, TT 03/2026, QĐ 06 và 09/QĐ-VKSTC, TTLT 01/2026 |
| KS THAHS — `Tool/KiemSatThahs` | Luật 127/2025, Luật 128/2025, NQ 03/2024/NQ-HĐTP, TTLT 05/08/2026, NĐ 170 và 213/2026, TT BCA 57/88/96/2026, QĐ 259, 39/QĐ-VKSTC |
| KS THADS — `Tool/KiemSatThads` | Luật 106/2025, TT 72/2026/TT-BTC, NĐ 151 và 152/2026, QĐ 810, 94/QĐ-VKSTC |
| KS án dân sự — `Tool/KiemSatAnDs` | BLTTDS 92/2015 sửa Luật 85/2025, QĐ 204, 410, 436/QĐ-VKSTC |
| KN-TC — `Tool/GiaiQuyetKnTc` | Luật Khiếu nại, Tố cáo, Tiếp công dân + Luật 136/2025, NĐ 31/2019, 124/2020, QĐ 50/QĐ-VKSTC, TTLT 02/2018 |
| Soạn QĐ phân công — `Tool/SoanQdPhanCong` | Luật TC VKSND, BLTTHS, TT 03/2026, QĐ 810 — **còn sót căn cứ THAHS 2019 và THADS 2008** |
| Văn phòng — `Tool/NghiepVuVanPhong` | NĐ 30/2020, Luật Lưu trữ 2024, TT 05/2026, QĐ 358 và 287/QĐ-VKSTC |
| Án phí — `Tool/App_DS` | NQ 326/2016/UBTVQH14 |
| Lãi suất — `Tool/App_tinh_lai_suat` | BLDS 2015, NQ 01/2019/NQ-HĐTP |
| CSDL VBPL — `Tool/CoSoVanBanPhapLuat` | Kho ~385 luật + NĐ/TT/NQ/QĐ ngành; mốc vbpl 14/4/2026 |

