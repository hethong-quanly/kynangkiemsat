/* Kỹ năng Kiểm sát — cấu hình theo LĨNH VỰC cho 2 chức năng dùng chung:
   (1) Trợ lý ảo Kiểm sát văn bản tư pháp  (2) Soạn Quyết định phân công KSV.
   Chỉ là DỮ LIỆU: thêm/sửa lĩnh vực, căn cứ, mẫu QĐ ở đây, không sửa code giao diện.
   ⚠ Mọi căn cứ pháp lý dưới đây chép lại từ nội dung hiện có trong repo — Kiểm sát viên
   phải đối chiếu văn bản gốc và cập nhật khi có văn bản mới (xem mục "CAP_NHAT" cuối file). */
(function (g) {
  "use strict";
  var ORG = "Viện Kiểm sát nhân dân thành phố Cần Thơ";
  var LTC = "Luật Tổ chức Viện kiểm sát nhân dân năm 2014, được sửa đổi, bổ sung bởi Luật số 82/2025/QH15";

  /* ---------- 1. LOẠI VĂN BẢN mà Trợ lý ảo kiểm sát ---------- */
  // checks: [id, tiêu đề, [từ khoá… (có 1 là đạt)], ghi chú nghiệp vụ]
  var VAN_BAN = {
    "ba-hs": { short: "BA HS", label: "Bản án hình sự",
      hint: "Lỗi chính tả, mâu thuẫn, tội danh, hình phạt, án phí, quyền kháng cáo.",
      checks: [
        ["toi", "Tội danh — điều luật", ["tội", "điều"], "Đối chiếu tội danh với BLHS, cấu thành, tình tiết tăng/giảm."],
        ["hinh-phat", "Hình phạt, án treo, thời gian thử thách", ["phạt", "tù", "cải tạo"], "Mức hình phạt, hình phạt bổ sung, án phí HS."],
        ["vat-chung", "Vật chứng, bồi thường", ["vật chứng", "bồi thường", "dân sự"], "Xử lý vật chứng, trách nhiệm dân sự."],
        ["khang-cao", "Quyền kháng cáo", ["kháng cáo", "khang cao"], "Phải nêu thời hạn, người có quyền kháng cáo."]
      ] },
    "ba-ds": { short: "BA DS", label: "Bản án dân sự",
      hint: "Thẩm quyền, tư cách đương sự, nghĩa vụ, án phí, thời hạn thi hành.",
      checks: [
        ["duong-su", "Đương sự, tư cách tố tụng", ["nguyên đơn", "bị đơn", "người có quyền"], "Họ tên, địa chỉ, tư cách phải khớp suốt bản án."],
        ["quan-he", "Quan hệ pháp luật, yêu cầu", ["yêu cầu", "tranh chấp", "nghĩa vụ"], "Nhận định phải giải quyết hết yêu cầu, không bỏ sót."],
        ["an-phi", "Án phí, chi phí tố tụng", ["án phí", "an phi"], "Người chịu án phí, mức, căn cứ."],
        ["thi-hanh", "Thời hạn thi hành, quyền kháng cáo", ["thi hành", "kháng cáo"], "Ghi rõ nghĩa vụ phải thi hành và hạn kháng cáo."]
      ] },
    "ba-hc": { short: "BA HC", label: "Bản án hành chính",
      hint: "Đối tượng khởi kiện, thời hiệu, thẩm quyền, tính hợp pháp QĐ/HVHC bị kiện.",
      checks: [
        ["doi-tuong-kk", "Đối tượng khởi kiện", ["quyết định hành chính", "hành vi hành chính", "bị kiện"], "Xác định đúng QĐHC/HVHC bị kiện, người bị kiện."],
        ["thoi-hieu-kk", "Thời hiệu khởi kiện", ["thời hiệu"], "Đối chiếu thời hiệu theo Luật Tố tụng hành chính."],
        ["hop-phap", "Đánh giá tính hợp pháp", ["trình tự", "thẩm quyền", "căn cứ"], "Nhận định đủ về thẩm quyền, trình tự, nội dung QĐHC."],
        ["an-phi-hc", "Án phí, quyền kháng cáo", ["án phí", "kháng cáo"], "Người chịu án phí, hạn kháng cáo."]
      ] },
    "qd-thads": { short: "QĐ THADS", label: "Quyết định thi hành án dân sự",
      hint: "Thẩm quyền, hạn ra QĐ, nghĩa vụ, thời hạn tự nguyện, gửi VKS.",
      checks: [
        ["tham-quyen", "Thẩm quyền ra QĐ THA", ["thủ trưởng", "chi cục trưởng", "trưởng văn phòng", "quyết định thi hành"], "Đối chiếu Điều 33–35 Luật 106/2025, NĐ 152, NĐ 151."],
        ["nghia-vu", "Nghĩa vụ phải thi hành", ["buộc", "phải", "nghĩa vụ", "số tiền"], "Khớp bản án/QĐ gốc: khoản tiền, tài sản, nghĩa vụ khác."],
        ["tu-nguyen", "Thời hạn tự nguyện", ["tự nguyện", "10 ngày", "mười ngày"], "Tự nguyện 10 ngày kể từ thông báo hợp lệ — trừ BPKCTT."],
        ["gui-vks", "Gửi VKS", ["viện kiểm sát", "vks"], "Mọi QĐ về THA gửi VKS trong 03 ngày làm việc (Điều 35.2)."]
      ] },
    "qd-thahs": { short: "QĐ THAHS", label: "Quyết định thi hành án hình sự",
      hint: "Người chấp hành, thời hạn, cơ quan THA, gửi VKS trong 02 ngày LV.",
      checks: [
        ["nguoi", "Người chấp hành án", ["họ tên", "ngày sinh", "phạm nhân", "người bị kết án", "người chấp hành án"], "Họ tên, ngày sinh, nơi cư trú phải khớp bản án."],
        ["thoi-han", "Thời hạn chấp hành, hình phạt bổ sung", ["thời hạn", "phạt tù", "cải tạo", "tháng tù", "năm tù"], "Khớp phần tuyên; ghi rõ ngày bắt đầu, nơi chấp hành."],
        ["co-quan-tha", "Cơ quan thi hành", ["công an", "trại giam", "cơ quan thi hành án"], "Cơ quan THA, trường hợp tại ngoại: hạn 07 ngày có mặt."],
        ["gui-vks-hs", "Gửi VKS trong 02 ngày LV", ["viện kiểm sát", "vks"], "Tòa gửi VKS QĐ THA phạt tù trong 02 ngày làm việc (Điều 16 Luật 127)."]
      ] },
    "lenh-tgtg": { short: "Lệnh TG-TG", label: "Lệnh / QĐ tạm giữ, tạm giam, gia hạn",
      hint: "Thẩm quyền, căn cứ, thời hạn, gia hạn, phê chuẩn VKS, giao nhận người bị tạm giữ/tạm giam.",
      checks: [
        ["nguoi-tg", "Người bị tạm giữ / tạm giam", ["bị tạm giữ", "bị tạm giam", "bị can", "người bị bắt"], "Họ tên, năm sinh, nơi cư trú khớp hồ sơ."],
        ["thoi-han-tg", "Thời hạn, ngày bắt đầu — kết thúc", ["thời hạn", "kể từ", "đến ngày"], "Tính đúng hạn (dùng tab Tính hạn / công cụ Tính thời hạn)."],
        ["phe-chuan", "Phê chuẩn / gia hạn của VKS", ["phê chuẩn", "gia hạn", "viện kiểm sát"], "Lệnh phải được VKS phê chuẩn khi luật quy định; gia hạn đúng thẩm quyền."],
        ["noi-giam", "Nơi tạm giữ, tạm giam", ["nhà tạm giữ", "trại tạm giam", "buồng tạm giữ"], "Cơ sở giam giữ đúng thẩm quyền, có biên bản giao nhận."]
      ] },
    "qd-giam-an": { short: "Giảm án · Tha tù", label: "Hồ sơ / QĐ giảm thời hạn, tha tù trước thời hạn, hoãn, tạm đình chỉ",
      hint: "Điều kiện, thời gian đã chấp hành, xếp loại cải tạo, thành phần hồ sơ, ý kiến VKS.",
      checks: [
        ["dieu-kien", "Điều kiện xét", ["đã chấp hành", "xếp loại", "cải tạo"], "Đối chiếu điều kiện theo BLHS, Luật THAHS và hướng dẫn liên ngành."],
        ["thanh-phan", "Thành phần hồ sơ", ["đơn", "bản án", "biên bản", "kết quả xếp loại"], "Đủ tài liệu theo quy định trước khi Tòa xét."],
        ["muc-giam", "Mức giảm / thời hạn còn lại", ["giảm", "tháng", "năm"], "Mức giảm không vượt giới hạn luật định."],
        ["y-kien-vks", "Ý kiến của VKS", ["viện kiểm sát", "kiểm sát viên"], "Ghi nhận ý kiến VKS tại phiên họp."]
      ] },
    "qd-cqdt": { short: "QĐ CQĐT", label: "Lệnh / QĐ của CQĐT cần phê chuẩn (khởi tố bị can, bắt, tạm giam…)",
      hint: "Thẩm quyền, căn cứ, thời hạn gửi VKS, thời hạn phê chuẩn, chữ ký, dấu.",
      checks: [
        ["tham-quyen-dt", "Thẩm quyền ban hành", ["thủ trưởng", "phó thủ trưởng", "cơ quan cảnh sát điều tra", "cơ quan điều tra"], "Đúng người có thẩm quyền theo BLTTHS."],
        ["can-cu-dt", "Căn cứ áp dụng", ["căn cứ", "điều"], "Có căn cứ pháp lý và chứng cứ tương ứng."],
        ["doi-tuong-dt", "Đối tượng bị áp dụng", ["bị can", "người bị", "sinh năm"], "Họ tên, nhân thân khớp hồ sơ."],
        ["gui-vks-dt", "Đề nghị phê chuẩn / gửi VKS", ["phê chuẩn", "viện kiểm sát"], "Kiểm tra hạn VKS phải ra quyết định phê chuẩn / không phê chuẩn."]
      ] },
    "cao-trang": { short: "KLĐT · Cáo trạng", label: "Kết luận điều tra / Cáo trạng",
      hint: "Tội danh, điều khoản, chứng cứ, tình tiết, thời hạn điều tra/truy tố, đồng bộ với hồ sơ.",
      checks: [
        ["toi-ct", "Tội danh — điều khoản", ["tội", "khoản", "điều"], "Khớp hành vi, cấu thành, điều khoản."],
        ["chung-cu", "Chứng cứ, tình tiết", ["chứng cứ", "lời khai", "kết luận giám định", "tình tiết"], "Đủ chứng cứ buộc tội/gỡ tội; tình tiết tăng/giảm."],
        ["nhan-than", "Nhân thân bị can", ["nhân thân", "tiền án", "tiền sự", "sinh năm"], "Nhân thân, biện pháp ngăn chặn đang áp dụng."],
        ["xu-ly-vc", "Xử lý vật chứng, tài sản", ["vật chứng", "tài sản", "tạm giữ"], "Đề xuất xử lý vật chứng phù hợp."]
      ] },
    "qd-kntc": { short: "QĐ KN-TC", label: "Quyết định giải quyết khiếu nại, tố cáo",
      hint: "Thẩm quyền, thời hiệu, hạn giải quyết, nội dung khiếu nại/tố cáo.",
      checks: [
        ["doi-tuong", "Người KN/TC, người bị KN/TC", ["khiếu nại", "tố cáo", "khieu nai"], "Đối tượng, nội dung, tài liệu kèm theo."],
        ["tham-quyen-kn", "Thẩm quyền giải quyết", ["thẩm quyền", "viện trưởng", "thủ trưởng"], "Đối chiếu BLTTHS, Luật Khiếu nại, Luật Tố cáo, QĐ 50/QĐ-VKSTC."],
        ["thoi-hieu", "Thời hiệu, thời hạn giải quyết", ["thời hiệu", "thời hạn", "ngày"], "Hạn thụ lý, xác minh, ban hành QĐ — không được quá hạn."],
        ["ket-luan", "Kết luận, hướng xử lý", ["chấp nhận", "không chấp nhận", "giải quyết"], "Phải nêu rõ chấp nhận toàn bộ/một phần/không chấp nhận và cách thi hành."]
      ] }
  };

  /* ---------- 2. KHÂU CÔNG TÁC cho Soạn QĐ phân công KSV ---------- */
  // vu: kiểu câu "đối tượng vụ việc" ở Điều 1 — hs | thahs | tgtg | thads | ds | hc | kntc
  var KHAU = {
    "ksdt": { short: "KSĐT", label: "Kiểm sát điều tra, truy tố", hint: "Thông báo thụ lý vụ án hình sự", so: "HS", vu: "hs",
      nv: "thực hành quyền công tố và kiểm sát việc điều tra, truy tố vụ án hình sự",
      mau: "Mẫu số 71/HS — Thông tư 03/2026/TT-VKSTC",
      cc: [LTC, "Bộ luật Tố tụng hình sự năm 2015 (sửa đổi, bổ sung)", "Thông tư số 03/2026/TT-VKSTC (Mẫu số 71/HS)"],
      detect: /thông báo thụ lý|khởi tố vụ án|cơ quan cảnh sát điều tra|bị can/ },
    "ksxx": { short: "KSXX", label: "Kiểm sát xét xử hình sự", hint: "Thông báo thụ lý xét xử, cáo trạng", so: "HS", vu: "hs",
      nv: "thực hành quyền công tố và kiểm sát việc xét xử vụ án hình sự",
      mau: "Mẫu số 71/HS — Thông tư 03/2026/TT-VKSTC",
      cc: [LTC, "Bộ luật Tố tụng hình sự năm 2015 (sửa đổi, bổ sung)", "Thông tư số 03/2026/TT-VKSTC (Mẫu số 71/HS)"],
      detect: /xét xử|cáo trạng|phiên tòa|truy tố|bị cáo/ },
    "kstha-hs": { short: "KSTHA HS", label: "Kiểm sát thi hành án hình sự", hint: "Quyết định thi hành án hình sự", so: "THAHS", vu: "thahs",
      nv: "kiểm sát việc thi hành án hình sự",
      mau: "Biểu mẫu kèm Quy chế 259/QĐ-VKSTC ngày 20/7/2023 (đối chiếu số mẫu)",
      cc: [LTC, "Luật Thi hành án hình sự số 127/2025/QH15", "Quy chế 259/QĐ-VKSTC"],
      detect: /thi hành án hình sự|thahs|người chấp hành án|phạm nhân/ },
    "ks-tgtg": { short: "KS TG-TG", label: "Kiểm sát tạm giữ, tạm giam", hint: "Lệnh / QĐ tạm giữ, tạm giam, gia hạn", so: "TGTG", vu: "tgtg",
      nv: "kiểm sát việc quản lý, thi hành tạm giữ, tạm giam",
      mau: "Biểu mẫu kèm Quy chế 259/QĐ-VKSTC ngày 20/7/2023 (đối chiếu số mẫu)",
      cc: [LTC, "Luật Thi hành tạm giữ, tạm giam và cấm đi khỏi nơi cư trú số 128/2025/QH15", "Bộ luật Tố tụng hình sự năm 2015 (sửa đổi, bổ sung)", "Quy chế 259/QĐ-VKSTC"],
      detect: /tạm giữ|tạm giam|nhà tạm giữ|trại tạm giam/ },
    "kstha-ds": { short: "KSTHA DS", label: "Kiểm sát thi hành án dân sự", hint: "Quyết định thi hành án dân sự", so: "THADS", vu: "thads",
      nv: "kiểm sát việc thi hành án dân sự",
      mau: "Mẫu theo quy định ngành về KS THADS (đối chiếu QĐ 810/QĐ-VKSTC)",
      cc: [LTC, "Luật Thi hành án dân sự số 106/2025/QH15", "Quyết định số 810/QĐ-VKSTC"],
      detect: /thi hành án dân sự|thads|chấp hành viên|người phải thi hành án/ },
    "ks-ds": { short: "KS DS", label: "Kiểm sát giải quyết vụ việc dân sự", hint: "Thông báo thụ lý vụ án dân sự", so: "DS", vu: "ds",
      nv: "kiểm sát việc giải quyết vụ, việc dân sự",
      mau: "Biểu mẫu QĐ 410/QĐ-VKSTC (đối chiếu số mẫu)",
      cc: [LTC, "Bộ luật Tố tụng dân sự năm 2015 (sửa đổi, bổ sung bởi Luật 85/2025/QH15)", "Quyết định số 410/QĐ-VKSTC ngày 25/11/2021"],
      detect: /nguyên đơn|bị đơn|vụ án dân sự|tranh chấp/ },
    "ks-hc": { short: "KS HC", label: "Kiểm sát giải quyết vụ án hành chính", hint: "Thông báo thụ lý vụ án hành chính", so: "HC", vu: "hc",
      nv: "kiểm sát việc giải quyết vụ án hành chính",
      mau: "Biểu mẫu QĐ 410/QĐ-VKSTC (đối chiếu số mẫu)",
      cc: [LTC, "Luật Tố tụng hành chính năm 2015 (sửa đổi, bổ sung)", "Quyết định số 410/QĐ-VKSTC ngày 25/11/2021"],
      detect: /vụ án hành chính|người khởi kiện|người bị kiện|quyết định hành chính/ },
    "ks-kntc": { short: "KS KN-TC", label: "Kiểm sát giải quyết khiếu nại, tố cáo trong hoạt động tư pháp", hint: "Đơn / thông báo thụ lý khiếu nại, tố cáo", so: "KNTC", vu: "kntc",
      nv: "kiểm sát việc giải quyết khiếu nại, tố cáo trong hoạt động tư pháp",
      mau: "Biểu mẫu theo Quy định 50/QĐ-VKSTC (đối chiếu số mẫu)",
      cc: [LTC, "Bộ luật Tố tụng hình sự năm 2015 (sửa đổi, bổ sung)", "Luật Khiếu nại; Luật Tố cáo", "Quy định 50/QĐ-VKSTC ngày 20/3/2026"],
      detect: /khiếu nại|tố cáo/ }
  };

  /* ---------- 3. VĂN BẢN MẪU để thử (dữ liệu hư cấu) ---------- */
  var MAU = {
    "ksdt": "CÔNG AN THÀNH PHỐ CẦN THƠ\nCỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM\nĐộc lập - Tự do - Hạnh phúc\n\nSố: 128/TB-CQĐT                         Cần Thơ, ngày 02 tháng 9 năm 2026\n\nTHÔNG BÁO THỤ LÝ VỤ ÁN HÌNH SỰ\n\nCăn cứ Điều 162 Bộ luật Tố tụng hình sự năm 2015,\nCơ quan Cảnh sát điều tra Công an thành phố Cần Thơ thông báo:\n\nĐã thụ lý vụ án hình sự số 45/2026/HSĐT ngày 02/9/2026 về tội Cố ý gây thương tích quy định tại khoản 1 Điều 134 Bộ luật Hình sự năm 2015.\n\nBị can: Nguyễn Văn An, sinh năm 1994, giới tính Nam.\n\nTóm tắt: Khoảng 21 giờ ngày 28/8/2026, tại quận Ninh Kiều, bị can Nguyễn Văn An dùng ghế đánh anh Trần Văn Bình gây thương tích tỷ lệ 15%.\n\nNơi nhận:\n- Viện kiểm sát nhân dân thành phố Cần Thơ (để kiểm sát điều tra);",
    "kstha-hs": "TÒA ÁN NHÂN DÂN THÀNH PHỐ CẦN THƠ\nCỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM\nĐộc lập - Tự do - Hạnh phúc\n\nSố: 88/2026/QĐ-THAHS                    Cần Thơ, ngày 05 tháng 9 năm 2026\n\nQUYẾT ĐỊNH\nTHI HÀNH ÁN HÌNH SỰ\n\nCăn cứ Luật Thi hành án hình sự;\nCăn cứ bản án số 21/2026/HS-ST ngày 12/8/2026 của Tòa án nhân dân thành phố Cần Thơ đã có hiệu lực pháp luật,\n\nQUYẾT ĐỊNH:\n\nNgười chấp hành án: Lê Minh Châu, sinh năm 1990, giới tính Nam.\nTội: Trộm cắp tài sản theo khoản 1 Điều 173 Bộ luật Hình sự năm 2015.\nHình phạt: 12 (mười hai) tháng tù.\n\nNơi nhận:\n- Viện kiểm sát nhân dân thành phố Cần Thơ (để kiểm sát thi hành án);",
    "ks-tgtg": "CÔNG AN THÀNH PHỐ CẦN THƠ\nCƠ QUAN CẢNH SÁT ĐIỀU TRA\nCỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM\nĐộc lập - Tự do - Hạnh phúc\n\nSố: 61/LTG                              Cần Thơ, ngày 10 tháng 9 năm 2026\n\nLỆNH TẠM GIAM\n\nCăn cứ Điều 119 Bộ luật Tố tụng hình sự năm 2015;\nCăn cứ Quyết định khởi tố bị can số 45/QĐ-CQĐT ngày 09/9/2026,\n\nTạm giam bị can: Võ Thành Đạt, sinh năm 1998, giới tính Nam, về tội Cướp giật tài sản quy định tại khoản 1 Điều 171 Bộ luật Hình sự năm 2015.\nThời hạn tạm giam: 02 tháng kể từ ngày 10/9/2026 đến ngày 09/11/2026.\nNơi tạm giam: Trại tạm giam Công an thành phố Cần Thơ.\n\nNơi nhận:\n- Viện kiểm sát nhân dân thành phố Cần Thơ (để phê chuẩn);",
    "kstha-ds": "CHI CỤC THI HÀNH ÁN DÂN SỰ THÀNH PHỐ CẦN THƠ\nCỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM\nĐộc lập - Tự do - Hạnh phúc\n\nSố: 156/QĐ-THADS                        Cần Thơ, ngày 04 tháng 9 năm 2026\n\nQUYẾT ĐỊNH\nTHI HÀNH ÁN DÂN SỰ\n\nCăn cứ Luật Thi hành án dân sự;\nCăn cứ bản án số 32/2026/DS-ST ngày 15/7/2026 của Tòa án nhân dân thành phố Cần Thơ đã có hiệu lực pháp luật,\n\nQUYẾT ĐỊNH:\n\nNgười phải thi hành án: Phạm Thị Hoa, sinh năm 1985, giới tính Nữ.\nNghĩa vụ: thanh toán số tiền 85.000.000 đồng cho người được thi hành án Trần Quốc Việt.\nQuan hệ pháp luật: tranh chấp hợp đồng vay tài sản.\n\nNơi nhận:\n- Viện kiểm sát nhân dân thành phố Cần Thơ (để kiểm sát thi hành án dân sự);",
    "ks-ds": "TÒA ÁN NHÂN DÂN KHU VỰC 1 - CẦN THƠ\nCỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM\nĐộc lập - Tự do - Hạnh phúc\n\nSố: 210/TB-TLVA                         Cần Thơ, ngày 08 tháng 9 năm 2026\n\nTHÔNG BÁO VỀ VIỆC THỤ LÝ VỤ ÁN\n\nĐã thụ lý vụ án dân sự số 210/2026/TLST-DS ngày 08/9/2026 về việc tranh chấp hợp đồng mua bán tài sản.\nNguyên đơn: Huỳnh Văn Phát, sinh năm 1978.\nBị đơn: Đặng Thị Mai, sinh năm 1982.\n\nNơi nhận:\n- Viện kiểm sát nhân dân cùng cấp;",
    "ks-kntc": "VIỆN KIỂM SÁT NHÂN DÂN THÀNH PHỐ CẦN THƠ\n\nSố: 15/TB-VKS                           Cần Thơ, ngày 11 tháng 9 năm 2026\n\nTHÔNG BÁO THỤ LÝ GIẢI QUYẾT KHIẾU NẠI\n\nThụ lý số 15/2026/KN ngày 11/9/2026 đơn khiếu nại của ông Lâm Văn Hùng, sinh năm 1970, khiếu nại Quyết định không khởi tố vụ án hình sự số 22/QĐ-CQĐT ngày 20/8/2026.\n\nNơi nhận:\n- Lưu hồ sơ;"
  };

  /* ---------- 4. HỎI ĐÁP NHANH (không cần mạng) ---------- */
  var FAQ = [
    [/thads|thi hành án dân sự/, "Kiểm sát QĐ THADS theo Luật 106/2025, NĐ 151–152/2026: hạn ra QĐ (chủ động 05 ngày LV / theo yêu cầu 05 ngày LV), gửi VKS 03 ngày LV, tự nguyện 10 ngày, nghĩa vụ khớp bản án. Dùng tab «Tính hạn», «Phí THA» trên trang THADS."],
    [/thahs|thi hành án hình sự|phạt tù/, "Kiểm sát QĐ THAHS theo Luật 127/2025: Tòa gửi VKS trong 02 ngày LV (Điều 16); đối chiếu họ tên, thời hạn chấp hành, hình phạt bổ sung, cơ quan THA. Dùng tab «Hồ sơ», «Chế độ», «Tính hạn» trên trang THAHS."],
    [/tạm giữ|tạm giam|gia hạn/, "Kiểm sát lệnh/QĐ tạm giữ, tạm giam: thẩm quyền, căn cứ, thời hạn và ngày kết thúc, gia hạn, phê chuẩn của VKS, nơi giam giữ, biên bản giao nhận. Dùng tab «Tính hạn» (tạm giữ/tạm giam) để chốt ngày hết hạn."],
    [/giảm án|giảm thời hạn|tha tù/, "Hồ sơ giảm thời hạn, tha tù trước thời hạn: điều kiện thời gian đã chấp hành, xếp loại cải tạo, thành phần hồ sơ, mức giảm; VKS có ý kiến tại phiên họp."],
    [/khiếu nại|tố cáo|kn-tc|kntc/, "Kiểm sát QĐ giải quyết khiếu nại, tố cáo: thẩm quyền, thời hiệu, hạn thụ lý — xác minh — ban hành, nội dung chấp nhận/không chấp nhận. Căn cứ BLTTHS, Luật Khiếu nại, Luật Tố cáo, QĐ 50/QĐ-VKSTC 2026."],
    [/hành chính/, "Kiểm sát bản án hành chính: đối tượng khởi kiện, thời hiệu, thẩm quyền, đánh giá tính hợp pháp QĐHC/HVHC, án phí, hạn kháng cáo."],
    [/bản án hình sự|ba hs|cáo trạng|kết luận điều tra/, "Kiểm sát bản án/cáo trạng hình sự: tội danh — điều luật, tình tiết, hình phạt, vật chứng, trách nhiệm dân sự, án phí, quyền kháng cáo. Phát hiện mâu thuẫn nhận định/tuyên, sai tên người, sai số liệu."],
    [/bản án dân sự|ba ds/, "Kiểm sát bản án dân sự: thẩm quyền, tư cách đương sự, giải quyết hết yêu cầu, nghĩa vụ thi hành, án phí, hạn kháng cáo."],
    [/phân công|quyết định phân công/, "Mở tab «Soạn QĐ phân công KSV»: dán Thông báo thụ lý / QĐ THA → Trích xuất → nhập KSV, người ký → Tải .docx và chép dòng sổ."]
  ];

  /* ---------- 5. LĨNH VỰC = gói (văn bản + khâu + mẫu) cho từng trang kỹ năng ---------- */
  var LINH_VUC = {
    "thahs": { ten: "Kiểm sát thi hành án hình sự, tạm giữ, tạm giam",
      vanBan: ["qd-thahs", "lenh-tgtg", "qd-giam-an", "ba-hs"], khau: ["kstha-hs", "ks-tgtg"],
      canCu: "Luật THAHS 127/2025/QH15, Luật 128/2025/QH15, NĐ 170–213/2026, Quy chế 259/QĐ-VKSTC (kèm biểu mẫu)" },
    "thads": { ten: "Kiểm sát thi hành án dân sự",
      vanBan: ["qd-thads", "ba-ds", "ba-hc"], khau: ["kstha-ds"],
      canCu: "Luật THADS 106/2025/QH15, NĐ 151–152/2026, TT 72/2026/TT-BTC (phí THA), Quy chế 810/QĐ-VKSTC" },
    "anhs": { ten: "Kiểm sát án hình sự (THQCT, điều tra, truy tố, xét xử)",
      vanBan: ["qd-cqdt", "cao-trang", "ba-hs"], khau: ["ksdt", "ksxx"],
      canCu: "BLTTHS, Quy chế 06/QĐ-VKSTC, Quy chế 09/QĐ-VKSTC, TT 03/2026/TT-VKSTC (biểu mẫu)" },
    "ands": { ten: "Kiểm sát án dân sự, hành chính",
      vanBan: ["ba-ds", "ba-hc"], khau: ["ks-ds", "ks-hc"],
      canCu: "BLTTDS 2015 (sửa bởi Luật 85/2025/QH15, Luật 142/2025/QH15), Luật TTHC 2015 (sửa bởi Luật 85/2025/QH15), QĐ 410/QĐ-VKSTC (biểu mẫu), Quy chế 436/QĐ-VKSTC" },
    "kntc": { ten: "Kiểm sát giải quyết khiếu nại, tố cáo trong hoạt động tư pháp",
      vanBan: ["qd-kntc"], khau: ["ks-kntc"],
      canCu: "BLTTHS, TTLT 02/2018 (KN-TC trong TTHS), Luật Khiếu nại, Luật Tố cáo (sửa bởi Luật 136/2025/QH15), Quy định kèm QĐ 50/QĐ-VKSTC" },
    // Bản tổng hợp cho 2 trang độc lập hiện có (Tool/TroLyAoKiemSat, Tool/SoanQdPhanCong)
    "tong-hop": { ten: "Tổng hợp các lĩnh vực",
      vanBan: Object.keys(VAN_BAN), khau: Object.keys(KHAU), canCu: "Theo từng loại văn bản" }
  };

  /* ---------- 6. CĂN CỨ CHO AI (system prompt) — chỉ ghi văn bản/mốc đã có nguồn trong repo
     (Data/van-ban-can-cu.json, các trang kỹ năng) hoặc đã đối chiếu toàn văn. Giữ gọn (Groq free ~8K TPM). */
  var AI_LUAT = {
    chung: {
      canCu: ["Luật Tổ chức VKSND 63/2014/QH13, sửa bởi Luật 82/2025/QH15 (HL 01/7/2025)",
        "BLTTHS 101/2015/QH13, sửa đến Luật 99/2025/QH15 (HL 01/7/2025) — BLTTHS (sửa đổi) thông qua 21/11/2026, HL 01/3/2027, CHƯA áp dụng",
        "BLHS 100/2015/QH13 (sửa 2017, 2024, 2025) — BLHS (sửa đổi) thông qua 20/11/2026, HL 01/3/2027, CHƯA áp dụng"],
      het: [], moc: [] },
    thahs: {
      canCu: ["Luật Thi hành án hình sự 127/2025/QH15 (ban hành 10/12/2025, HL 01/7/2026)",
        "Luật Thi hành tạm giữ, tạm giam và cấm đi khỏi nơi cư trú 128/2025/QH15 (HL 01/7/2026)",
        "NĐ 170/2026/NĐ-CP (chi tiết Luật THAHS), NĐ 213/2026/NĐ-CP (chi tiết Luật Thi hành tạm giữ, tạm giam và cấm đi khỏi nơi cư trú) — cùng HL 01/7/2026",
        "TTLT 05/2026/TTLT-BCA-BQP-VKSNDTC-TANDTC (phối hợp quản lý, thi hành tạm giữ, tạm giam); TTLT 08/2026/TTLT-BCA-BQP-TANDTC-VKSNDTC (tha tù trước thời hạn có điều kiện); TT 57/2026/TT-BCA (chế độ quản lý giam giữ), TT 88/2026/TT-BCA (gặp, nhận quà, liên lạc của phạm nhân), TT 96/2026/TT-BCA (nội quy cơ sở giam giữ phạm nhân) — cùng HL 01/7/2026",
        "TTLT 01/2026/TTLT-VKSNDTC-BCA-BQP (phối hợp CQĐT–VKS thực hiện BLTTHS; ban hành 28/01/2026, HL 15/3/2026; Điều 17 cách tính thời hạn tạm giữ, tạm giam)",
        "NQ 03/2024/NQ-HĐTP ngày 10/6/2024 (thời hiệu thi hành bản án, miễn chấp hành hình phạt, giảm mức hình phạt, hoãn chấp hành hình phạt tù)",
        "Quy chế 259/QĐ-VKSTC ngày 20/7/2023 (kiểm sát tạm giữ, tạm giam, thi hành án hình sự, kèm hệ thống biểu mẫu)"],
      het: ["Luật THAHS 41/2019/QH14 — hết HL 01/7/2026, thay bằng Luật 127/2025/QH15",
        "Luật Thi hành tạm giữ, tạm giam 94/2015/QH13 — hết HL 01/7/2026, thay bằng Luật 128/2025/QH15",
        "TTLT 04/2018/TTLT-VKSNDTC-BCA-BQP — hết HL 15/3/2026, thay bằng TTLT 01/2026",
        "QĐ 39/QĐ-VKSTC ngày 26/01/2018 (biểu mẫu kiểm sát THAHS) — hết HL từ 20/7/2023, thay bằng biểu mẫu kèm Quy chế 259/QĐ-VKSTC"],
      moc: ["Thời hạn tạm giữ không quá 03 ngày; trường hợp cần thiết NGƯỜI RA QUYẾT ĐỊNH TẠM GIỮ (không phải VKS) gia hạn không quá 03 ngày, trường hợp đặc biệt gia hạn lần hai không quá 03 ngày; mọi lần gia hạn phải được VKS cùng cấp/có thẩm quyền phê chuẩn; VKS ra quyết định phê chuẩn hoặc không phê chuẩn gia hạn trong 12 giờ kể từ khi nhận hồ sơ đề nghị gia hạn; 01 ngày tạm giữ = 01 ngày tạm giam (Điều 118 BLTTHS 2015)",
        "Tính thời hạn tạm giữ, tạm giam: hết vào ngày ghi trong lệnh/quyết định; 01 tháng = 30 ngày, không lùi do ngày nghỉ (Điều 17 TTLT 01/2026)",
        "Tòa gửi QĐ thi hành án phạt tù cho VKS trong 02 ngày làm việc; người bị kết án tại ngoại phải có mặt trong 07 ngày kể từ khi nhận QĐ (Điều 16 Luật 127/2025)",
        "Xét giảm án: Chánh án phân công Thẩm phán trong 02 ngày làm việc từ khi nhận hồ sơ, Thẩm phán mở phiên họp trong 05 ngày làm việc; Tòa gửi QĐ trong 03 ngày làm việc (Điều 36 khoản 3, 4 Luật 127/2025)"] },
    thads: {
      canCu: ["Luật Thi hành án dân sự 106/2025/QH15 (ban hành 05/12/2025, HL 01/7/2026)",
        "NĐ 152/2026/NĐ-CP (quy định chi tiết, biện pháp thi hành Luật THADS; thay NĐ 62/2015) và NĐ 151/2026/NĐ-CP (văn phòng thi hành án dân sự, Thừa hành viên) — ban hành 13/5/2026, HL 01/7/2026",
        "TT 72/2026/TT-BTC về phí THADS (HL 01/7/2026, thay TT 216/2016 và TT 74/2019)",
        "Quy chế 810/QĐ-VKSTC (kiểm sát THADS, THAHC); QĐ 94/QĐ-VKSTC (quy trình trực tiếp kiểm sát)"],
      het: ["Luật THADS 26/2008/QH12 (đã sửa nhiều lần) — hết HL 01/7/2026, thay bằng Luật 106/2025/QH15. Để so sánh: luật cũ cũng quy định tự nguyện 10 ngày kể từ ngày nhận được hoặc được thông báo hợp lệ QĐ THA (khoản 1 Điều 45); xác minh trong 10 ngày sau hết hạn tự nguyện (khoản 1 Điều 44) — theo VBHN 115/VBHN-VPQH ngày 27/8/2025"],
      moc: ["Thời hạn tự nguyện thi hành án là 10 ngày kể từ ngày người phải thi hành án được thông báo hợp lệ quyết định thi hành án, trừ thi hành quyết định áp dụng biện pháp khẩn cấp tạm thời (khoản 1 Điều 36 Luật 106/2025/QH15)",
        "Trong 09 ngày kể từ ngày hết thời hạn tự nguyện mà không tự nguyện thi hành thì Chấp hành viên xác minh; thi hành QĐ áp dụng BPKCTT thì xác minh ngay (khoản 1 Điều 37 Luật 106/2025/QH15)"] },
    anhs: {
      canCu: ["TTLT 01/2026/TTLT-VKSNDTC-BCA-BQP (HL 15/3/2026) — phối hợp CQĐT và VKS",
        "TTLT 01/2017/TTLT-BCA-BQP-BTC-BNN&PTNT-VKSNDTC (tiếp nhận, giải quyết nguồn tin về tội phạm; sửa bởi TTLT 01/2021)",
        "Quy chế 06/QĐ-VKSTC ngày 23/3/2026 (THQCT, kiểm sát khởi tố, điều tra, truy tố; thay QĐ 111/QĐ-VKSTC 2020); Quy chế 09/QĐ-VKSTC ngày 05/5/2026 (THQCT, kiểm sát xét xử vụ án hình sự; thay QĐ 505/QĐ-VKSTC 2017); TT 03/2026/TT-VKSTC ngày 09/02/2026 (biểu mẫu, HL 15/02/2026); TT 02/2025/TT-VKSTC (thẩm quyền của VKS các cấp trong THQCT, kiểm sát vụ việc, vụ án hình sự)",
        "Luật Tổ chức cơ quan điều tra hình sự 99/2015/QH13 (luật sửa đổi thông qua 20/11/2026, HL 01/3/2027)"],
      het: ["TTLT 04/2018/TTLT-VKSNDTC-BCA-BQP — hết HL 15/3/2026, thay bằng TTLT 01/2026",
        "QĐ 111/QĐ-VKSTC 2020 — đã thay bằng Quy chế 06/QĐ-VKSTC 2026"],
      moc: ["Thời hạn tạm giữ không quá 03 ngày; trường hợp cần thiết NGƯỜI RA QUYẾT ĐỊNH TẠM GIỮ (không phải VKS) gia hạn không quá 03 ngày, trường hợp đặc biệt gia hạn lần hai không quá 03 ngày; mọi lần gia hạn phải được VKS cùng cấp/có thẩm quyền phê chuẩn; VKS ra quyết định phê chuẩn hoặc không phê chuẩn gia hạn trong 12 giờ kể từ khi nhận hồ sơ đề nghị gia hạn; 01 ngày tạm giữ = 01 ngày tạm giam (Điều 118 BLTTHS 2015)",
        "01 tháng tạm giam = 30 ngày, hết vào ngày ghi trong lệnh, không lùi do ngày nghỉ (Điều 17 TTLT 01/2026)"] },
    ands: {
      canCu: ["BLTTDS 92/2015/QH13 (sửa bởi Luật 85/2025/QH15 HL 01/7/2025 và Luật Phục hồi, phá sản 142/2025/QH15 HL 01/3/2026); Luật TTHC 93/2015/QH13 (sửa bởi Luật 85/2025/QH15); BLDS 91/2015/QH13",
        "NQ 326/2016/UBTVQH14 (án phí, lệ phí Tòa án); NQ 01/2019/NQ-HĐTP (lãi suất, hợp đồng vay)",
        "QĐ 410/QĐ-VKSTC ngày 25/11/2021 (biểu mẫu kiểm sát DS, HC); Quy chế 436/QĐ-VKSTC ngày 28/11/2025 (kiểm sát giải quyết vụ việc dân sự; thay QĐ 364/QĐ-VKSTC 2017)"],
      het: ["QĐ 204/QĐ-VKSTC ngày 01/6/2017 (biểu mẫu tạm thời) — phần dân sự đã thay bằng QĐ 410/QĐ-VKSTC 2021"],
      moc: ["Kháng nghị phúc thẩm bản án sơ thẩm dân sự: VKS cùng cấp 15 ngày, VKS cấp trên trực tiếp 01 tháng kể từ ngày tuyên án (KSV không dự phiên tòa: tính từ ngày VKS cùng cấp nhận bản án); QĐ tạm đình chỉ, đình chỉ giải quyết vụ án: 07 ngày (cùng cấp) / 10 ngày (cấp trên trực tiếp) kể từ ngày VKS cùng cấp nhận QĐ (khoản 1, 2 Điều 280 BLTTDS 2015)",
        "Kháng nghị phúc thẩm bản án sơ thẩm hành chính: VKS cùng cấp 15 ngày, VKS cấp trên trực tiếp 30 ngày kể từ ngày tuyên án; QĐ tạm đình chỉ, đình chỉ: 07 ngày / 10 ngày kể từ ngày VKS cùng cấp nhận QĐ (khoản 1, 2 Điều 213 Luật TTHC 2015)"] },
    kntc: {
      canCu: ["Luật Khiếu nại 02/2011/QH13, Luật Tố cáo 25/2018/QH14, Luật Tiếp công dân 42/2013/QH13 — cùng sửa bởi Luật 136/2025/QH15 (HL 01/7/2026)",
        "NĐ 124/2020/NĐ-CP (hướng dẫn Luật Khiếu nại); NĐ 31/2019/NĐ-CP (hướng dẫn Luật Tố cáo) — sửa bởi NĐ 155/2026 và NĐ 156/2026 (ban hành 15/5/2026, HL 01/7/2026)",
        "BLTTHS (Chương XXXIII khiếu nại, tố cáo); TTLT 02/2018/TTLT-VKSTC-TATC-BCA-BQP-BTC-BNN&PTNT ngày 05/9/2018 (phối hợp giải quyết KN-TC trong TTHS); Luật THAHS 127/2025",
        "QĐ 50/QĐ-VKSTC ngày 20/3/2026 ban hành Quy định quy trình giải quyết KN-TC, kiểm sát việc giải quyết KN-TC trong hoạt động tư pháp (thay QĐ 546/QĐ-VKSTC 2018)"],
      het: ["QĐ 546/QĐ-VKSTC 2018 — đã thay bằng QĐ 50/QĐ-VKSTC ngày 20/3/2026"],
      moc: ["Quyết định giải quyết khiếu nại gửi người khiếu nại, người bị khiếu nại và VKS cấp trên trực tiếp trong 03 ngày làm việc kể từ ngày ban hành (khoản 2 Điều 11 Quy định kèm QĐ 50/QĐ-VKSTC)",
        "Kết luận nội dung tố cáo được công khai trong 07 ngày làm việc kể từ ngày ban hành (khoản 1 Điều 25 Quy định kèm QĐ 50/QĐ-VKSTC)",
        "Kết luận kiểm sát, kiến nghị, kháng nghị gửi Thủ trưởng cơ quan được kiểm sát và VKS cấp trên trực tiếp trong 03 ngày làm việc (Điều 33 Quy định kèm QĐ 50/QĐ-VKSTC)"] }
  };

  /* CAP_NHAT: khi có văn bản pháp luật mới → sửa VAN_BAN[*].checks, KHAU[*].cc / mau,
     LINH_VUC[*].canCu, AI_LUAT (căn cứ/mốc cho AI), rồi tăng PHIEN_BAN và CACHE trong sw.js. */
  var PHIEN_BAN = "2026-11-23.2";

  /* AI tuỳ chọn. PROXY_URL = Cloudflare Worker của Viện (mã nguồn: ai-proxy/worker.js), giữ GROQ_API_KEY
     trong Worker Secrets, giới hạn 8 lượt/phút, 40 lượt/ngày mỗi IP. Để trống = chỉ dùng key riêng (BYOK).
     KHÔNG đặt API key ở đây. */
  var AI = { PROXY_URL: "https://morning-night-5d0eknks-ai-proxy.mrphuc2009.workers.dev/api/chat" };

  g.KNKS_LINH_VUC = { AI: AI, ORG: ORG, VAN_BAN: VAN_BAN, KHAU: KHAU, MAU: MAU, FAQ: FAQ, LINH_VUC: LINH_VUC, AI_LUAT: AI_LUAT, PHIEN_BAN: PHIEN_BAN };
})(window);
