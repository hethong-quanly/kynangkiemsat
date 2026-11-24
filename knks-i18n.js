/* Kỹ năng Kiểm sát — đa ngôn ngữ Việt / Anh.
   Lưu lựa chọn trong localStorage "knks_lang" ('vi' | 'en').
   Khi knks_lang === 'en', toàn bộ nội dung hiển thị (giao diện, bảng, kết quả JS,
   mẫu quyết định, căn cứ pháp lý) được dịch sang tiếng Anh. Chuyển lại VI khôi phục nguyên văn. */
(function (global) {
  "use strict";
  var KEY = "knks_lang";
  var listeners = [];

  function stored() {
    try {
      var v = localStorage.getItem(KEY);
      if (v === "en" || v === "vi") return v;
    } catch (e) {}
    return "vi";
  }

  function lang() { return stored(); }
  function isEn() { return stored() === "en"; }

  function norm(s) {
    return String(s == null ? "" : s).replace(/\s+/g, " ").trim().normalize("NFC");
  }

  var VI = {};
  var EN = {};
  function add(key, vi, en) { VI[key] = vi; EN[key] = en; }

  /* ---------- Từ điển theo khóa (giao diện tĩnh + JS) ---------- */
  add("app.name", "Kỹ năng Kiểm sát", "procuratorial Skills");
  add("app.title", "Kỹ năng Kiểm sát - VKSND TPCT", "procuratorial Skills — People's Procuracy of Can Tho City");
  add("landing.h1", "KỸ NĂNG NGHIỆP VỤ", "PROFESSIONAL SKILLS");
  add("landing.h1.html", "KỸ NĂNG <span class=\"bg-gradient-to-r from-proc-blue to-proc-neon bg-clip-text text-transparent\">NGHIỆP VỤ</span>", "PROFESSIONAL <span class=\"bg-gradient-to-r from-proc-blue to-proc-neon bg-clip-text text-transparent\">SKILLS</span>");
  add("landing.tagline", "♥ PHỤC VỤ CÔNG TÁC KIỂM SÁT ♥", "♥ SERVING PROCURACY WORK ♥");
  add("landing.logoAlt", "Phù hiệu VKSND", "Emblem of the People's Procuracy");
  add("landing.photoAlt", "Trụ sở Viện kiểm sát nhân dân thành phố Cần Thơ", "Headquarters of the People's Procuracy of Can Tho City");
  add("home.h1", "KỸ NĂNG ỨNG DỤNG TRONG NGHIỆP VỤ KIỂM SÁT", "APPLIED SKILLS IN PROCURACY WORK");
  add("theme.group", "Chọn giao diện", "Choose theme");
  add("theme.light", "Sáng", "Light");
  add("theme.dark", "Tối", "Dark");
  add("theme.lightTitle", "Giao diện sáng", "Light theme");
  add("theme.darkTitle", "Giao diện tối", "Dark theme");
  add("lang.group", "Ngôn ngữ / Language", "Language");
  add("unit.btn", "Đơn vị công tác", "Work unit");
  add("unit.btnTitle", "Chọn đơn vị công tác", "Choose your work unit");
  add("install.btn", "Cài đặt", "Install");
  add("pwa.bannerAria", "Cài ứng dụng", "Install the app");
  add("pwa.bannerTitle", "Cài đặt app điện thoại", "Install the mobile app");
  add("pwa.bannerDesc", "Sử dụng tiện lợi, nhanh chóng, chính xác.", "Convenient, fast and accurate to use.");
  add("pwa.close", "Đóng", "Close");
  add("footer.author", "Thiên Phúc © 2026", "Thiên Phúc © 2026");
  add("footer.links", "Tải ứng dụng · Quyền riêng tư", "Download app · Privacy");
  add("footer.app", "Tải ứng dụng", "Download app");
  add("footer.privacy", "Quyền riêng tư", "Privacy");
  add("taskbar.menu", "⬥ Danh mục chính", "⬥ Main menu");
  add("taskbar.home", "Kỹ năng", "Skills");
  add("taskbar.main", "Menu chính", "Main menu");
  add("net.online", "Trực tuyến", "Online");
  add("net.offline", "Ngoại tuyến", "Offline");
  add("kind.online", "CẦN MẠNG", "NEEDS NETWORK");
  add("kind.desktop", "MÁY TÍNH · WINDOWS", "DESKTOP · WINDOWS");
  add("pwa.update", "Có bản mới", "Update available");
  add("pwa.reload", "Tải lại", "Reload");
  add("pwa.sheetTitle", "Cài ra màn hình chính", "Add to Home Screen");
  add("pwa.sheetLead", "Không cần cửa hàng ứng dụng. Lần đầu mở khi có mạng để tải sẵn công cụ HTML.", "No app store needed. Open once while online so the HTML tools can be cached.");
  add("pwa.sheet1", "Mở trang này bằng Safari (iPhone / iPad) hoặc Chrome (Android).", "Open this page in Safari (iPhone / iPad) or Chrome (Android).");
  add("pwa.sheet1.html", "Mở trang này bằng <strong>Safari</strong> (iPhone / iPad) hoặc <strong>Chrome</strong> (Android).", "Open this page in <strong>Safari</strong> (iPhone / iPad) or <strong>Chrome</strong> (Android).");
  add("pwa.sheet2", "iPhone: bấm nút Chia sẻ (hình vuông có mũi tên lên) rồi chọn Thêm vào Màn hình chính.", "iPhone: tap the Share button (square with an up arrow), then Add to Home Screen.");
  add("pwa.sheet2.html", "iPhone: bấm nút Chia sẻ (hình vuông có mũi tên lên) rồi chọn <strong>Thêm vào Màn hình chính</strong>.", "iPhone: tap the Share button (square with an up arrow), then <strong>Add to Home Screen</strong>.");
  add("pwa.sheet3.html", "Android: <a href=\"cai-dat.html\"><strong>tải ứng dụng Android (APK)</strong></a>, hoặc bấm <strong>Cài app</strong> trên banner / menu Chrome → Cài đặt ứng dụng.", "Android: <a href=\"cai-dat.html\"><strong>download the Android app (APK)</strong></a>, or tap <strong>Install</strong> on the banner / Chrome menu → Install app.");
  add("pwa.sheet4.html", "Mở icon <strong>KN Kiểm sát</strong> trên màn hình.", "Open the <strong>procuratorial Skills</strong> app icon on your Home Screen.");
  add("pwa.gotIt", "Đã hiểu", "Got it");
  add("toast.needNet", "Mục này cần kết nối mạng.", "This item requires a network connection.");
  add("confirm.ext", "Lưu ý: «{name}» là dịch vụ bên ngoài. Mọi nội dung bạn nhập sẽ được gửi lên máy chủ của bên thứ ba (có thể ở nước ngoài).\n\nChỉ nhập văn bản đã ẩn danh (che họ tên, CCCD, địa chỉ…), không nhập tài liệu mật. Kết quả chỉ để tham khảo.\n\nXem Chính sách dữ liệu: privacy.html\n\nTiếp tục mở?", "Note: “{name}” is an external service. Anything you enter will be sent to a third-party server (possibly abroad).\n\nOnly enter anonymized text (names, ID numbers, addresses masked). Do not enter classified documents. Results are for reference only.\n\nSee the Privacy policy: privacy.html\n\nContinue?");
  add("badge.skill", "KỸ NĂNG", "SKILL");
  add("badge.method", "PHƯƠNG PHÁP", "METHOD");
  add("badge.guide", "HƯỚNG DẪN", "GUIDE");
  add("badge.ai", "TRỢ LÝ ẢO", "AI ASSISTANT");
  add("day.0", "CN", "Sun"); add("day.1", "T2", "Mon"); add("day.2", "T3", "Tue");
  add("day.3", "T4", "Wed"); add("day.4", "T5", "Thu"); add("day.5", "T6", "Fri"); add("day.6", "T7", "Sat");
  add("law.note", "Nguyên văn điều luật, tên văn bản pháp luật và mẫu quyết định được giữ tiếng Việt. Giao diện có chú thích tiếng Anh ngắn.", "The official wording of legal provisions, instrument titles and decision templates is kept in Vietnamese. Short English labels are provided on the interface.");

  /* Thẻ công cụ trang chủ */
  add("tool.kiem-sat-ban-an-chung.title", "Trợ lý ảo Kiểm sát văn bản tư pháp", "Virtual Assistant for Supervising Judicial Documents");
  add("tool.kiem-sat-ban-an-chung.desc", "Kiểm sát bản án hình sự, dân sự; quyết định thi hành án dân sự, hình sự; quyết định giải quyết khiếu nại, tố cáo.", "Supervise criminal and civil judgments; decisions on the enforcement of civil judgments and the execution of criminal judgments; and decisions settling complaints and denunciations.");
  add("tool.kiem-sat-ban-an-nang-cao.title", "Kiểm sát Bản án hình sự, dân sự", "Supervision of criminal and civil judgments");
  add("tool.kiem-sat-ban-an-nang-cao.desc", "Bản nâng cấp tối ưu đặc biệt.", "An enhanced, specialized version.");
  add("tool.soan-qd-phan-cong.title", "Kỹ năng tự động soạn thảo Quyết định phân công KSV – từ Thông báo thụ lý, Quyết định thi hành án (scan)", "Auto-draft the Decision assigning a procurator — from a Notice of acceptance or a judgment enforcement/execution decision (including scans)");
  add("tool.soan-qd-phan-cong.desc", "Tự động đọc và trích xuất thông tin từ Thông báo thụ lý, QĐ thi hành án hình sự/ dân sự và soạn thảo QĐ phân công KSV, trích thông tin để nhập sổ quản lý của khâu công tác.", "Automatically read and extract information from a Notice of acceptance or a decision on the execution of a criminal judgment / enforcement of a civil judgment, draft the Decision assigning a procurator, and pull fields for the section register.");
  add("tool.giai-quyet-kn-tc.title", "Kỹ năng giải quyết khiếu nại, tố cáo — thời hạn thụ lý, xác minh, giải quyết đơn", "Settlement of complaints & denunciations — time limits for acceptance, verification and settlement");
  add("tool.giai-quyet-kn-tc.desc", "Tự động tính thời hạn thụ lý, xác minh, giải quyết đơn khiếu nại, tố cáo; kiểm sát hạn CQĐT/Tòa án; bảng tra cứu và quy trình kỹ năng theo BLTTHS, Luật Khiếu nại, Luật Tố cáo và QĐ 50/QĐ-VKSTC 2026. Có thêm Trợ lý ảo kiểm sát văn bản và Soạn QĐ phân công KSV.", "Automatically calculate time limits for accepting, verifying and settling complaints and denunciations; supervise Investigating Agency/Court deadlines; lookup tables and procedural steps under the Criminal Procedure Code, the Law on Complaints, the Law on Denunciations and Decision 50/QD-VKSTC 2026. Also includes the Document Supervision Virtual Assistant and the Procurator Assignment Decision drafter.");
  add("tool.kiem-sat-thads.title", "Kỹ năng kiểm sát thi hành án dân sự — thời hạn, hạ giá, phí THA", "Supervision of civil judgment enforcement — time limits, price reductions, enforcement fees");
  add("tool.kiem-sat-thads.desc", "Tính hạn ra QĐ THA, xác minh, thẩm định giá, bán đấu giá, thu chi tiền; tính phí THA theo Thông tư 72/2026/TT-BTC; tính % hạ giá sau đấu giá không thành; phương pháp kiểm sát kê biên, giao tài sản theo Luật 106/2025, NĐ 151–152/2026. Có thêm Trợ lý ảo kiểm sát văn bản và Soạn QĐ phân công KSV.", "Calculate deadlines for enforcement decisions, verification, valuation, auction and receipts/disbursements; enforcement fees under Circular 72/2026/TT-BTC; price-reduction percentages after a failed auction; methods for supervising attachment and delivery of assets under Law 106/2025 and Decrees 151–152/2026. Also includes the Document Supervision Virtual Assistant and the Procurator Assignment Decision drafter.");
  add("tool.kiem-sat-thahs.title", "Kỹ năng kiểm sát thi hành án hình sự — hồ sơ, chế độ, giảm án", "Supervision of criminal judgment execution — records, regimes, sentence reduction");
  add("tool.kiem-sat-thahs.desc", "Hồ sơ tạm giữ, tạm giam, phạm nhân; chế độ ăn, mặc, lễ Tết, căn tin, bếp ăn, lưu ký tiền; tính hạn QĐ THA, giảm án, tha tù theo Luật 127/2025, Luật 128/2025, NĐ 170–213/2026. Biểu mẫu nghiệp vụ theo Quyết định số 259/QĐ-VKSTC ngày 20/7/2023. Có thêm Trợ lý ảo kiểm sát văn bản và Soạn QĐ phân công KSV.", "Records on custody, temporary detention and prisoners; food, clothing, Tet/holiday regimes, canteen, kitchen and cash deposits; deadlines for execution decisions, sentence reduction and early release under Laws 127/2025 and 128/2025 and Decrees 170–213/2026. Professional forms under Decision No. 259/QD-VKSTC of 20/7/2023. Also includes the Document Supervision Virtual Assistant and the Procurator Assignment Decision drafter.");
  add("tool.kiem-sat-an-hs.title", "Kỹ năng kiểm sát án hình sự — nguồn tin, phê chuẩn, xét xử", "Supervision of criminal cases — sources of crime reports, approvals, trial");
  add("tool.kiem-sat-an-hs.desc", "Toàn bộ quá trình THQCT, kiểm sát nguồn tin, phê chuẩn lệnh/QĐ CQĐT, điều tra, truy tố, xét xử theo Quy chế 06, Quy chế 09, BLTTHS, Luật Tổ chức VKSND và quy trình duyệt báo cáo đề xuất của VKSND hai cấp TP Cần Thơ. Biểu mẫu tố tụng theo Thông tư số 03/2026/TT-VKSTC ngày 09/02/2026. Có thêm Trợ lý ảo kiểm sát văn bản và Soạn QĐ phân công KSV.", "The full exercise of the right to prosecute: supervising the handling of sources of crime reports, approving Investigating Agency warrants/decisions, investigation, prosecution and trial under Regulations 06 and 09, the Criminal Procedure Code, the Law on Organization of People's Procuracies, and the two-level approval process of the People's Procuracy of Can Tho City. Procedural forms under Circular No. 03/2026/TT-VKSTC of 09/02/2026. Also includes the Document Supervision Virtual Assistant and the Procurator Assignment Decision drafter.");
  add("tool.kiem-sat-an-ds.title", "Kỹ năng kiểm sát án dân sự — quy chế, biểu mẫu", "Supervision of civil cases — regulations and forms");
  add("tool.kiem-sat-an-ds.desc", "Phương pháp kiểm sát, tính hạn tố tụng dân sự và bảng tra cứu theo Bộ luật Tố tụng dân sự (sửa bởi Luật 85/2025). Biểu mẫu tải về theo Quyết định số 410/QĐ-VKSTC ngày 25/11/2021: 65 mẫu dân sự, 65 mẫu hành chính, 21 mẫu PL09. Quy chế Quyết định 436 ngày 28/11/2025 chưa có toàn văn. Có thêm Trợ lý ảo kiểm sát văn bản và Soạn QĐ phân công KSV.", "Supervision methods, civil-procedure time limits and lookup tables under the Civil Procedure Code (as amended by Law 85/2025). Downloadable forms under Decision No. 410/QD-VKSTC of 25/11/2021: 65 civil forms, 65 administrative forms, 21 PL09 forms. The full text of Regulation Decision 436 of 28/11/2025 is not yet available. Also includes the Document Supervision Virtual Assistant and the Procurator Assignment Decision drafter.");
  add("tool.nghiep-vu-van-phong.title", "Kỹ năng nghiệp vụ văn phòng — báo cáo, thống kê, văn thư lưu trữ, CNTT, thi đua, tài sản công", "Office professional skills — reports, statistics, records and archives, IT, emulation, public assets");
  add("tool.nghiep-vu-van-phong.desc", "Chín mảng công tác Văn phòng: văn thư, lưu trữ, tài sản công, lịch trực bảo vệ, thống kê (156 chỉ tiêu, biểu mẫu HS/DS), CNTT, tham mưu báo cáo, thi đua khen thưởng, xây dựng cơ bản. Mục chỉ tiêu gồm điểm KPI theo Quyết định 287/QĐ-VKSTC năm 2026 (Bảng danh mục nhiệm vụ KPI dùng chung) (bản nâng cấp đánh giá nhiệm vụ) và biểu mẫu thống kê theo Quyết định số 358/QĐ-VKSTC ngày 23/9/2025. Tính hạn theo NĐ 30/2020, Luật Lưu trữ 2024, QĐ 358/QĐ-VKSTC ngày 23/9/2025, QĐ 274/2025, TT 05/2026.", "Nine Office workstreams: records management, archives, public assets, security duty roster, statistics (156 indicators, criminal/civil forms), IT, advisory reporting, emulation and rewards, and capital construction. The indicators tab includes KPI scores under Decision 287/QD-VKSTC 2026 (common KPI task catalogue) and statistical forms under Decision No. 358/QD-VKSTC of 23/9/2025. Time limits follow Decree 30/2020, the 2024 Archives Law, Decision 358/QD-VKSTC of 23/9/2025, Decision 274/2025 and Circular 05/2026.");
  add("tool.co-so-van-ban-pl.title", "Cơ sở dữ liệu văn bản pháp luật — luật, án lệ, quy trình, rút kinh nghiệm", "Legal Database — laws, precedents, procedures, lessons learned");
  add("tool.co-so-van-ban-pl.desc", "Tra cứu Bộ luật, Luật, Nghị định, Thông tư, Nghị quyết, Quyết định; quy trình nghiệp vụ hình sự, dân sự, hành chính; án lệ TANDTC; thông báo rút kinh nghiệm; nghị định, thông tư, nghị quyết, quy trình và rút kinh nghiệm đã tách hình sự, dân sự, tố tụng hành chính, kinh doanh thương mại, thi hành án. Bộ luật và Luật lấy theo chỉ mục Cổng vbpl ngày 14/4/2026, cộng văn bản ngành đã rà.", "Look up Codes, Laws, Decrees, Circulars, Resolutions and Decisions; criminal, civil and administrative professional procedures; precedents of the Supreme People's Court; lessons-learned notices; and instruments already split by criminal, civil, administrative procedure, commercial and judgment-execution work. Codes and Laws follow the vbpl.gov.vn index as of 14/4/2026, plus instruments already reviewed in-sector.");
  add("tool.khoi-kien-cong-ich.title", "Kỹ năng khởi kiện công ích về Nghị quyết 205", "Public-interest litigation skills under Resolution 205");
  add("tool.khoi-kien-cong-ich.desc", "Hướng dẫn nghiệp vụ, 32 biểu mẫu và soạn thảo theo Nghị quyết 205 và Thông tư liên tịch 09/2025: tiếp nhận, thu thập chứng cứ, kiến nghị, khởi kiện vụ án dân sự bảo vệ quyền lợi công ích. Cần mạng.", "Professional guidance, 32 forms and drafting under Resolution 205 and Joint Circular 09/2025: intake, evidence gathering, recommendations and filing a civil case to protect the public interest. Requires a network connection.");
  add("tool.tinh-lai-suat.title", "Tính lãi suất", "Interest Rate Calculator");
  add("tool.tinh-lai-suat.desc", "Tự động tính tiền lãi trong hạn, lãi quá hạn, lãi chậm trả trong giao dịch dân sự.", "Automatically calculate in-term interest, overdue interest and late-payment interest in civil transactions.");
  add("tool.tinh-an-phi.title", "Tính án phí", "Court Fee Calculator");
  add("tool.tinh-an-phi.desc", "Tra cứu và tự động tính nhanh số tiền án phí hình sự và dân sự.", "Look up and quickly calculate criminal and civil court fees.");
  add("tool.tinh-tuoi-thoi-han.title", "Tính tuổi — Tính thời hạn", "Age & Time-limit Calculator");
  add("tool.tinh-tuoi-thoi-han.desc", "Tự động tính tuổi của đối tượng, tính chính xác ngày tháng năm, giờ phút, kiểm soát chặt chẽ thời hạn tạm giữ, tạm giam tố tụng.", "Automatically calculate a person's age and exact dates and times, and closely track custody and temporary detention time limits in criminal proceedings.");
  add("tool.notebook-lm.title", "Hình sự & Tố tụng hình sự", "Criminal law & criminal procedure");
  add("tool.notebook-lm.desc", "Tra cứu Điều luật, hỗ trợ lập luận tố tụng dựa trên kho tri thức hiện hành.", "Look up articles of law and support procedural reasoning from a current knowledge base.");
  add("tool.huong-dan-so-do-tu-duy.title", "Tạo sơ đồ tư duy", "Mind-map guide");
  add("tool.huong-dan-so-do-tu-duy.desc", "Thao tác chi tiết và bộ prompt mẫu để tạo sơ đồ tư duy tự động.", "Step-by-step operations and sample prompts to generate mind maps automatically.");
  add("tool.an-danh-tool.title", "Tự động che thông tin (ẩn danh) văn bản", "Anonymizer — automatically mask personal data in documents");
  add("tool.an-danh-tool.desc", "Ẩn họ tên, CCCD, SĐT, địa chỉ, ngày sinh, số tài khoản… trong file Word/TXT ngay trên trình duyệt trước khi công bố hoặc giao cho AI. Tệp không gửi lên mạng.", "Mask full names, ID numbers, phone numbers, addresses, dates of birth, account numbers and more in Word/TXT files in the browser before publication or use with AI. Files never leave your device.");
  add("tool.file-renamer-tool.title", "Tự động đổi tên file hàng loạt", "Batch File Renamer");
  add("tool.file-renamer-tool.desc", "Chuẩn hóa tên file (bỏ dấu, ký tự lạ, rút gọn) để AI dễ đọc, hoặc đánh số hàng loạt như số bút lục. Chạy trên trình duyệt, tải về .zip hoặc đổi tên trực tiếp (Chrome máy tính).", "Normalize file names (strip diacritics and odd characters, shorten names) so AI can read them more easily, or batch-number files like case-file folio numbers. Runs in the browser; download a .zip or rename in place (Chrome on desktop).");
  add("tool.docx-to-md-tool.title", "Chuyển Word (.docx) sang Markdown", "Word/DOCX to Markdown");
  add("tool.docx-to-md-tool.desc", "Chuyển .docx sang Markdown giữ tiêu đề, in đậm, danh sách, bảng — trước khi đưa cho AI. Chạy trên trình duyệt, không gửi tệp đi.", "Convert .docx to Markdown while keeping headings, bold text, lists and tables — before sending text to AI. Runs in the browser; files are not uploaded.");
  add("tool.pdf-to-md-tool.title", "Chuyển PDF, ảnh scan sang Markdown (có OCR tiếng Việt)", "PDF/scan to Markdown & Vietnamese OCR");
  add("tool.pdf-to-md-tool.desc", "Trích chữ từ PDF và nhận dạng chữ (OCR) cho bản scan, ảnh chụp ngay trên máy — xuất .md/.txt để đưa cho AI. Không gửi tệp lên mạng.", "Extract text from PDFs and run OCR on scans and photos on your device — export .md/.txt for AI. Files are not uploaded.");

  /* Đơn vị công tác */
  add("dv.title", "Đơn vị công tác", "Work unit");
  add("dv.welcome", "Chào bạn! Chọn nơi bạn công tác để ứng dụng điền sẵn tên cơ quan trong Quyết định phân công KSV và các mẫu văn bản. Thông tin chỉ lưu trên máy này, không gửi đi đâu; sửa lại bất cứ lúc nào bằng nút «Đơn vị công tác».", "Welcome! Choose your work unit so the app can pre-fill the agency name in the Decision assigning a procurator and in document templates. This information is saved only on this device and is never sent anywhere. You can change it any time with the “Work unit” button.");
  add("dv.lead", "Chọn nơi bạn công tác để ứng dụng điền sẵn tên cơ quan trong Quyết định phân công KSV và các mẫu văn bản. Thông tin chỉ lưu trên máy này, không gửi đi đâu; sửa lại bất cứ lúc nào bằng nút «Đơn vị công tác».", "Choose your work unit so the app can pre-fill the agency name in the Decision assigning a procurator and in document templates. This information is saved only on this device and is never sent anywhere. You can change it any time with the “Work unit” button.");
  add("dv.lang", "Ngôn ngữ / Language", "Language");
  add("dv.cap", "Cấp", "Level");
  add("dv.cap.toi-cao", "VKSND tối cao", "Supreme People's Procuracy");
  add("dv.cap.cap-cao", "VKSND cấp cao", "High-level People's Procuracy");
  add("dv.cap.tinh", "VKSND tỉnh, thành phố", "Provincial / municipal People's Procuracy");
  add("dv.cap.khu-vuc", "VKSND khu vực", "Regional People's Procuracy");
  add("dv.cc", "VKSND cấp cao tại", "High-level People's Procuracy in");
  add("dv.tinh", "Tỉnh, thành phố", "Province or city");
  add("dv.kv", "Viện kiểm sát nhân dân khu vực", "Regional People's Procuracy");
  add("dv.kvItem", "Khu vực {n} - {tinh}", "Region {n} — {tinh}");
  add("dv.hoten", "Họ và tên (tuỳ chọn)", "Full name (optional)");
  add("dv.chuc", "Chức danh (tuỳ chọn)", "Title (optional)");
  add("dv.chuc.vt", "Viện trưởng", "Chief Procurator");
  add("dv.chuc.pvt", "Phó Viện trưởng", "Deputy Chief Procurator");
  add("dv.chuc.ksvcc", "Kiểm sát viên cao cấp", "Senior Procurator");
  add("dv.chuc.ksvtc", "Kiểm sát viên trung cấp", "Intermediate Procurator");
  add("dv.chuc.ksvsc", "Kiểm sát viên sơ cấp", "Junior Procurator");
  add("dv.chuc.ktv", "Kiểm tra viên", "Inspector");
  add("dv.chuc.cv", "Chuyên viên", "Specialist");
  add("dv.preview", "Đơn vị: {ngan}", "Unit: {ngan}");
  add("dv.previewDoc", "Tiêu đề văn bản: {td} · {dia}, ngày …", "Document heading (kept in Vietnamese): {td} · {dia}, dated …");
  add("dv.save", "Lưu", "Save");
  add("dv.skip", "Bỏ qua", "Skip");
  add("dv.close", "Đóng", "Close");
  add("dv.delete", "Xoá thông tin đơn vị trên máy này", "Delete the work-unit information on this device");
  add("dv.tp", "Thành phố {t}", "City of {t}");
  add("dv.tinhPref", "Tỉnh {t}", "Province of {t}");
  add("dv.hcm", "Thành phố Hồ Chí Minh", "Ho Chi Minh City");

  /* Cài đặt / quyền riêng tư / offline — khóa ngắn; đoạn dài ở khối HTML phía dưới */
  add("install.title", "Cài ứng dụng — Kỹ năng Kiểm sát", "Install the app — procuratorial Skills");
  add("install.h1", "Cài ứng dụng Kỹ năng Kiểm sát", "Install procuratorial Skills");
  add("install.sub", "Miễn phí · Android, iPhone và máy tính", "Free · Android, iPhone and computers");
  add("privacy.title", "Chính sách dữ liệu — Kỹ năng Kiểm sát", "Privacy policy — procuratorial Skills");
  add("privacy.h1", "Chính sách dữ liệu và quyền riêng tư", "Data and privacy policy");
  add("privacy.kicker", "Kỹ năng Kiểm sát", "procuratorial Skills");
  add("offline.title", "Ngoại tuyến — Kỹ năng Kiểm sát", "Offline — procuratorial Skills");
  add("offline.h1", "Chưa có mạng", "You are offline");
  add("offline.body", "Trang này chưa được tải sẵn. Mở app một lần khi có mạng để lưu công cụ HTML (tính hạn, THADS, THAHS, KN-TC). Công cụ Udify và NotebookLM luôn cần mạng.", "This page has not been cached yet. Open the app once while online to store the HTML tools (time-limit calculators, civil/criminal execution, complaints). The Udify and NotebookLM tools always need a network connection.");
  add("offline.back", "Về danh mục", "Back to the menu");
  add("back.home", "← Về trang chính", "← Back to the home page");

  add("common.runsLocal", "Chạy trên trình duyệt, không gửi tệp đi", "Runs in the browser; files are not uploaded");
  add("common.runsBrowser", "Chạy trên trình duyệt", "Runs in the browser");
  add("common.copy", "Sao chép", "Copy");
  add("common.download", "Tải", "Download");
  add("common.close", "Đóng", "Close");
  add("common.save", "Lưu", "Save");
  add("common.selectFiles", "Chọn tệp", "Choose files");
  add("common.results", "Kết quả", "Results");
  add("common.help", "Hướng dẫn", "Guide");
  add("common.file", "Tệp", "File");
  add("common.status", "Trạng thái", "Status");
  add("common.stop", "Dừng", "Stop");
  add("common.supportFoot", "Công cụ hỗ trợ — kiểm tra lại nội dung trước khi sử dụng.", "Support tool — review the content before use.");

  /* Trang công cụ — tiêu đề */
  add("andanh.title", "Ẩn danh văn bản — Kỹ năng Kiểm sát", "Anonymizer — procuratorial Skills");
  add("andanh.h1", "Tự động che thông tin trong văn bản", "Automatically mask personal data in documents");
  add("andanh.privacy", "Xử lý trên máy của bạn — không gửi tệp lên mạng.", "Processed on your device — files are not uploaded.");
  add("andanh.kicker", "Công cụ nghiệp vụ · chạy trên trình duyệt", "Professional tool · runs in the browser");
  add("andanh.lead", "Chọn file Word (.docx), .txt hoặc dán văn bản. Công cụ nhận diện họ tên, CCCD, SĐT, địa chỉ, ngày sinh, STK, email, biển số, MST.", "Choose a Word (.docx) or .txt file, or paste text. The tool detects full names, ID numbers, phone numbers, addresses, dates of birth, account numbers, emails, license plates and tax codes.");
  add("andanh.dropTitle", "Chọn văn bản cần che thông tin", "Choose a document to anonymize");
  add("andanh.dropHint", "Kéo thả file .docx / .txt vào đây", "Drop a .docx / .txt file here");
  add("andanh.browse", "Chọn tệp .docx / .txt", "Choose a .docx / .txt file");
  add("andanh.sample", "Dùng văn bản mẫu", "Use a sample document");
  add("andanh.paste", "Hoặc dán nội dung", "Or paste text");
  add("andanh.pastePh", "Dán cáo trạng, bản án, báo cáo…", "Paste an indictment, judgment, report…");
  add("andanh.pasteGo", "Nhận diện văn bản đã dán", "Detect personal data in the pasted text");
  add("andanh.replace", "Đổi tệp", "Change file");
  add("andanh.clear", "Xóa phiên", "Clear session");
  add("andanh.style", "Kiểu che", "Mask style");
  add("andanh.cats", "Nhóm phát hiện", "Detection groups");
  add("andanh.custom", "Thêm chuỗi cần ẩn (mỗi dòng một chuỗi)", "Add extra strings to mask (one per line)");
  add("andanh.customPh", "Biệt danh, tên riêng…", "Nicknames, proper names…");
  add("andanh.dl", "Tải văn bản đã ẩn", "Download the anonymized document");
  add("andanh.preview", "Xem trước", "Preview");
  add("andanh.modeSrc", "Gốc đã đánh dấu", "Original, highlighted");
  add("andanh.modeRed", "Đã ẩn", "Masked");
  add("andanh.helpTitle", "Hướng dẫn", "Guide");
  add("andanh.help1", "1. Chọn file .docx/.txt hoặc dán văn bản. 2. Rà soát danh sách. 3. Chọn kiểu che. 4. Tải file đã ẩn.", "1. Choose a .docx/.txt file or paste text. 2. Review the list. 3. Choose a mask style. 4. Download the masked file.");
  add("andanh.help2", "Mọi xử lý chạy trong trình duyệt. Không gửi tệp lên máy chủ.", "All processing runs in the browser. Files are not sent to a server.");
  add("andanh.win", "Cần bản Windows độc lập? Tải AnDanhTool.zip rồi chạy AnDanhTool.exe.", "Need a standalone Windows copy? Download AnDanhTool.zip and run AnDanhTool.exe.");
  add("andanh.win.html", "Cần bản Windows độc lập? <a class=\"winlink\" href=\"../Tool/AnDanh/AnDanhTool.zip\">Tải AnDanhTool.zip</a> rồi chạy AnDanhTool.exe.", "Need a standalone Windows copy? <a class=\"winlink\" href=\"../Tool/AnDanh/AnDanhTool.zip\">Download AnDanhTool.zip</a> and run AnDanhTool.exe.");

  add("renamer.title", "Đổi tên file hàng loạt — Kỹ năng Kiểm sát", "Batch File Renamer — procuratorial Skills");
  add("renamer.h1.html", "Đổi tên file <span>hàng loạt</span>", "Batch <span>file renamer</span>");
  add("renamer.lead", "Chuẩn hóa tên file cho AI dễ đọc (bỏ dấu tiếng Việt, ký tự đặc biệt, rút gọn tên dài) hoặc đánh số hàng loạt (ví dụ đánh số bút lục). Tệp không rời khỏi máy của bạn.", "Normalize file names so AI can read them more easily (strip Vietnamese diacritics and special characters, shorten long names) or batch-number files (for example case-file folio numbers). Files never leave your device.");
  add("renamer.step1", "1. Chọn tệp", "1. Choose files");
  add("renamer.drop", "Kéo thả các tệp vào đây", "Drop files here");
  add("renamer.folder", "Chọn thư mục", "Choose a folder");
  add("renamer.direct", "Đổi tên trực tiếp trong thư mục", "Rename directly in the folder");
  add("renamer.dirNote", "«Đổi tên trực tiếp» dùng được trên Chrome/Edge máy tính: đổi tên ngay trong thư mục bạn chọn.", "“Rename directly” works in Chrome/Edge on a computer: files are renamed in the folder you choose.");
  add("renamer.step2", "2. Cách đổi tên", "2. How to rename");
  add("renamer.mode", "Chế độ", "Mode");
  add("renamer.mode.clean", "Chuẩn hóa tên (bỏ dấu, ký tự lạ, rút gọn)", "Normalize names (strip diacritics and odd characters, shorten)");
  add("renamer.mode.number", "Đánh số thứ tự (bút lục)", "Sequential numbering (folio)");
  add("renamer.mode.both", "Đánh số + chuẩn hóa", "Number + normalize");
  add("renamer.maxLen", "Độ dài tối đa (ký tự)", "Maximum length (characters)");
  add("renamer.prefix", "Tiền tố", "Prefix");
  add("renamer.start", "Bắt đầu từ", "Start from");
  add("renamer.digits", "Số chữ số", "Number of digits");
  add("renamer.onlyBad", "Chỉ đổi tên file có vấn đề (chế độ chuẩn hóa)", "Only rename files that have a problem (normalize mode)");
  add("renamer.abbr", "Viết tắt cụm từ pháp lý khi tên dài (Quyết định → QD, Viện kiểm sát → VKS…)", "Abbreviate long legal phrases in file names (standard Vietnamese legal abbreviations)");
  add("renamer.step3", "3. Xem trước", "3. Preview");
  add("renamer.csv", "Tải bảng đối chiếu (.csv)", "Download the comparison table (.csv)");
  add("renamer.zip", "Tải các tệp đã đổi tên (.zip)", "Download the renamed files (.zip)");
  add("renamer.old", "Tên cũ", "Old name");
  add("renamer.new", "Tên mới", "New name");
  add("renamer.reason", "Lý do", "Reason");
  add("renamer.desk", "Bản máy tính Windows (đổi tên trực tiếp cả thư mục con)", "Windows desktop edition (renames subfolders too)");
  add("renamer.deskLink", "Trang tải FileRenamer.zip", "FileRenamer.zip download page");
  add("renamer.foot", "Công cụ hỗ trợ — kiểm tra bảng đối chiếu trước khi dùng.", "Support tool — check the comparison table before use.");

  add("docx.title", "Chuyển Word (.docx) sang Markdown — Kỹ năng Kiểm sát", "Word to Markdown — procuratorial Skills");
  add("docx.h1.html", "Chuyển Word <span>sang Markdown</span>", "Convert Word <span>to Markdown</span>");
  add("docx.lead.html", "Chuyển tệp <strong>.docx</strong> sang <strong>Markdown (.md)</strong> để đưa cho AI đọc: giữ tiêu đề, in đậm/nghiêng, danh sách, bảng. Mọi xử lý chạy trên máy của bạn, tệp không được gửi lên mạng.", "Convert a <strong>.docx</strong> file to <strong>Markdown (.md)</strong> for AI: headings, bold/italic, lists and tables are kept. All processing runs on your device; files are not uploaded.");
  add("docx.drop", "Kéo thả một hoặc nhiều tệp .docx vào đây", "Drop one or more .docx files here");
  add("docx.docHint", "Tệp .doc (Word 97–2003): mở bằng Word → Lưu thành .docx rồi chọn lại.", ".doc files (Word 97–2003): open in Word → Save as .docx, then choose again.");
  add("docx.pick", "Chọn tệp .docx", "Choose .docx files");
  add("docx.optTable", "Chuyển bảng thành bảng Markdown", "Convert tables to Markdown tables");
  add("docx.optFmt", "Giữ in đậm, in nghiêng", "Keep bold and italic");
  add("docx.step2", "2. Kết quả", "2. Results");

  add("pdf.title", "Chuyển PDF, ảnh sang Markdown — Kỹ năng Kiểm sát", "PDF/image to Markdown — procuratorial Skills");
  add("pdf.h1.html", "Chuyển PDF, ảnh <span>sang Markdown</span>", "Convert PDF and images <span>to Markdown</span>");
  add("pdf.lead.html", "Trích chữ từ <strong>PDF</strong> (có lớp chữ) và nhận dạng chữ (OCR tiếng Việt) cho <strong>PDF scan, ảnh chụp</strong> — rồi xuất <strong>Markdown/TXT</strong> để đưa cho AI. Toàn bộ xử lý trên máy của bạn, không gửi tệp lên mạng.", "Extract text from a <strong>PDF</strong> (with a text layer) and run Vietnamese OCR on <strong>scanned PDFs and photos</strong> — then export <strong>Markdown/TXT</strong> for AI. All processing runs on your device; files are not uploaded.");
  add("pdf.drop", "Kéo thả tệp PDF, JPG, PNG vào đây", "Drop PDF, JPG or PNG files here");
  add("pdf.optOcr", "Tự nhận dạng chữ (OCR) cho trang scan / ảnh", "Automatically run OCR on scanned pages / images");
  add("pdf.optForce", "OCR cả trang đã có lớp chữ (khi chữ trích ra bị lỗi phông)", "Also OCR pages that already have a text layer (when extracted text has font errors)");
  add("pdf.ocrHint", "Lần OCR đầu tiên tải bộ nhận dạng tiếng Việt (~9,6 MB) từ chính ứng dụng. OCR mất khoảng 5–20 giây mỗi trang tùy máy.", "The first OCR run downloads the Vietnamese recognition pack (~9.6 MB) from this app. OCR takes about 5–20 seconds per page, depending on the device.");
  add("pdf.txt", "Tải .txt", "Download .txt");
  add("pdf.md", "Tải .md", "Download .md");
  add("pdf.note", "Kết quả OCR có thể sai dấu, sai số với bản scan mờ — luôn đối chiếu bản gốc trước khi sử dụng.", "OCR may misread diacritics or numbers on a blurry scan — always check the original before use.");
  add("pdf.pages", "Trang", "Pages");

  add("troly.title", "Trợ lý ảo Kiểm sát văn bản tư pháp — Kỹ năng Kiểm sát", "Virtual Assistant for Supervising Judicial Documents — Prosecutorial Skills");
  add("troly.h1.html", "Trợ lý ảo <span>Kiểm sát văn bản tư pháp</span>", "Virtual Assistant <span>for Supervising Judicial Documents</span>");
  add("troly.lead", "Kiểm sát bản án hình sự, dân sự; quyết định thi hành án dân sự, hình sự; quyết định giải quyết khiếu nại, tố cáo của cơ quan tư pháp. Xưng hô «bạn». Công cụ hỗ trợ — đối chiếu văn bản gốc trước khi kiến nghị, kháng nghị.", "Supervise criminal and civil judgments; decisions on the enforcement of civil judgments and the execution of criminal judgments; and decisions of judicial bodies settling complaints and denunciations. The assistant addresses you as “you”. This is a support tool — check the original document before making a recommendation or protest.");
  add("troly.foot", "Công cụ hỗ trợ nghiệp vụ — không thay thế đối chiếu văn bản gốc và ý kiến lãnh đạo Viện.", "A professional support tool — it does not replace checking the original document or the views of the Procuracy leadership.");

  add("soanqd.title", "Soạn QĐ phân công KSV — Kỹ năng Kiểm sát", "Draft the Decision assigning a procurator — Prosecutorial Skills");
  add("soanqd.h1.html", "Soạn <span>Quyết định phân công KSV</span>", "Draft the <span>Decision assigning a procurator</span>");
  add("soanqd.lead", "Dán, kéo thả hoặc tải Thông báo thụ lý / Quyết định thi hành án (kể cả chữ đã OCR từ bản scan). Công cụ trích trường, soạn QĐ phân công KSV (Mẫu 71/HS — Thông tư 03/2026/TT-VKSTC) và dòng sổ quản lý. Kiểm sát viên rà soát trước khi trình Viện trưởng ký.", "Paste, drop or upload a Notice of acceptance or a judgment enforcement/execution decision (including text OCR’d from a scan). The tool extracts fields, drafts the Decision assigning a procurator (Form 71/HS — Circular 03/2026/TT-VKSTC) and a register line. A procurator should review it before submission to the Chief Procurator for signature.");
  add("soanqd.foot", "Mẫu 71/HS — Thông tư 03/2026/TT-VKSTC · Công cụ hỗ trợ soạn thảo, không thay thế việc kiểm tra của lãnh đạo Viện.", "Form 71/HS — Circular 03/2026/TT-VKSTC · A drafting aid, not a substitute for review by Procuracy leadership.");

  add("tuoi.title", "Tính tuổi - Tính thời hạn - Đếm tạm giữ", "Age, time limits and custody calculator");
  add("tuoi.h1", "TÍNH TUỔI - TÍNH THỜI HẠN - TẠM GIỮ", "AGE — TIME LIMITS — CUSTODY");
  add("tuoi.sub", "Công cụ tính toán thời gian tố tụng", "Criminal-procedure time calculator");
  add("hd.title", "Hướng dẫn - Tạo sơ đồ tư duy tự động", "Guide — Generate a mind map automatically");
  add("hd.h1", "HƯỚNG DẪN - Tạo sơ đồ tư duy tự động", "GUIDE — Generate a mind map automatically");
  add("lai.title", "Tính Lãi Suất Chuyên Dụng", "Specialized Interest Rate Calculator");
  add("lai.h1", "PHẦN MỀM HỖ TRỢ TÍNH LÃI SUẤT CHUYÊN DỤNG", "SPECIALIZED INTEREST RATE CALCULATOR");
  add("anphi.title", "Công cụ Tra cứu & Tính toán Án phí", "Court fee lookup and calculator");
  add("anphi.h1", "Phần mềm Tính Án phí & Lệ phí", "Court fee & levy calculator");


  add("ks.anhs.h1.html", "Kỹ năng kiểm sát <span>án hình sự</span>", "Skills for supervising <span>criminal cases</span>");
  add("ks.ands.h1.html", "Kỹ năng kiểm sát <span>án dân sự</span>", "Skills for supervising <span>civil cases</span>");
  add("ks.thads.h1.html", "Kỹ năng kiểm sát <span>thi hành án dân sự</span>", "Supervision of <span>civil judgment enforcement</span>");
  add("ks.thahs.h1.html", "Kỹ năng kiểm sát <span>thi hành án hình sự</span>", "Supervision of <span>criminal judgment execution</span>");
  add("ks.kntc.h1.html", "Kỹ năng giải quyết <span>khiếu nại — tố cáo</span>", "Skills for settling <span>complaints & denunciations</span>");
  add("ks.vbpl.h1.html", "Cơ sở dữ liệu <span>văn bản pháp luật</span>", "Legal <span>Database</span>");
  add("ks.vp.h1.html", "Kỹ năng nghiệp vụ <span>văn phòng</span>", "Office <span>professional skills</span>");
  add("lai.h1.html", "PHẦN MỀM HỖ TRỢ TÍNH LÃI SUẤT CHUYÊN DỤNG", "SPECIALIZED INTEREST RATE CALCULATOR");
  add("anphi.h1.html", "Phần mềm Tính Án phí & Lệ phí", "Court fee & levy calculator");

  /* ---------- Cụm UI (khớp nguyên văn, dùng cho trang lớn) ---------- */
  var PHRASE = {
    "Phương pháp kiểm sát": "Supervision methods",
    "Hồ sơ · phê chuẩn": "Case file · approvals",
    "Hồ sơ": "Case file",
    "Biểu mẫu TT 03": "Forms — Circular 03",
    "Biểu mẫu QĐ 410": "Forms — Decision 410",
    "Biểu mẫu QĐ 259": "Forms — Decision 259",
    "Tính hạn": "Deadline calculator",
    "Bảng tra cứu": "Lookup table",
    "Sổ việc": "Work register",
    "Hạ giá": "Price reduction",
    "Phí THA": "Enforcement fees",
    "Chế độ · lưu ký": "Regimes · deposits",
    "Quy trình kỹ năng": "Procedural steps",
    "Quy trình 09 mảng": "Nine workstreams",
    "Chỉ tiêu · KPI": "Indicators · KPI",
    "Kỹ năng kiểm sát án hình sự": "Skills for supervising criminal cases",
    "Kỹ năng kiểm sát án dân sự": "Skills for supervising civil cases",
    "Kỹ năng kiểm sát thi hành án dân sự": "Supervision of civil judgment enforcement",
    "Kỹ năng kiểm sát thi hành án hình sự": "Supervision of criminal judgment execution",
    "Kỹ năng giải quyết khiếu nại — tố cáo": "Skills for settling complaints and denunciations",
    "Kỹ năng giải quyết khiếu nại, tố cáo": "Skills for settling complaints and denunciations",
    "Cơ sở dữ liệu văn bản pháp luật": "Legal Database",
    "Kỹ năng nghiệp vụ văn phòng": "Office professional skills",
    "văn bản pháp luật": "legal instruments",
    "án hình sự": "criminal cases",
    "án dân sự": "civil cases",
    "văn phòng": "office work",
    "khiếu nại — tố cáo": "complaints & denunciations",
    "☰ Danh mục": "☰ Catalogue",
    "Tra cứu trong kho": "Search the collection",
    "Tra cứu": "Search",
    "Kho văn bản pháp luật và nghiệp vụ kiểm sát": "Collection of legal instruments and procuracy practice",
    "← Quay lại danh sách": "← Back to the list",
    "1. Chọn khâu": "1. Choose the work stage",
    "1. Chọn mảng": "1. Choose the workstream",
    "1. Loại việc": "1. Type of matter",
    "2. Tình huống": "2. Situation",
    "3. Ngày trên hồ sơ": "3. Date on the file",
    "3. Ngày trên đơn": "3. Date on the petition",
    "Mốc": "Milestone",
    "Giờ": "Hour",
    "Giờ nhận hồ sơ": "Time the file was received",
    "Giờ nhận": "Time received",
    "Ghi chú sổ": "Register note",
    "Sổ việc trên máy này": "Work register on this device",
    "Bảng tra cứu thời hạn — biểu mẫu": "Time-limit lookup — forms",
    "Bảng tra cứu thời hạn": "Time-limit lookup",
    "Bảng tra cứu thời hạn công tác văn phòng": "Office work time-limit lookup",
    "Ngày nhận đơn": "Date the petition was received",
    "Ngày thụ lý (nếu đã thụ lý)": "Date of acceptance (if already accepted)",
    "Ngày biết QĐ / hành vi (thời hiệu)": "Date the decision / act became known (statute of limitations)",
    "Ngày ban hành QĐ / kết luận": "Date the decision / conclusion was issued",
    "Ngày VKS nhận QĐ (khâu kiểm sát)": "Date the Procuracy received the decision (supervision stage)",
    "Mẫu tạm giam": "Temporary detention template",
    "Mẫu KN hành chính": "Administrative complaint template",
    "Mẫu tố cáo": "Denunciation template",
    "Mẫu kiểm sát CQĐT": "Investigating agency supervision template",
    "Tải Thông tư (PDF ký)": "Download the Circular (signed PDF)",
    "Tải danh mục kèm theo": "Download the accompanying list",
    "ĐẾM THỜI GIAN TẠM GIỮ": "CUSTODY TIMER",
    "TÍNH THỜI HẠN TẠM GIỮ": "CALCULATE THE CUSTODY PERIOD",
    "TÍNH THỜI HẠN TẠM GIAM": "CALCULATE THE TEMPORARY DETENTION PERIOD",
    "TÍNH TUỔI & TÍNH THỜI HẠN": "CALCULATE AGE & TIME LIMITS",
    "TÍNH TOÁN": "CALCULATE",
    "KẾT QUẢ THỜI HẠN TẠM GIỮ": "CUSTODY PERIOD RESULT",
    "KẾT QUẢ THỜI HẠN TẠM GIAM": "TEMPORARY DETENTION PERIOD RESULT",
    "KẾT QUẢ TÍNH TOÁN": "CALCULATION RESULT",
    "Thời điểm bắt đầu tạm giữ": "Start of custody",
    "Thời hạn tạm giữ": "Custody period",
    "Giờ - Phút": "Hour – minute",
    "Ngày - Tháng - Năm": "Day – month – year",
    "Lấy thời gian hiện tại": "Use the current time",
    "Lấy ngày hiện tại": "Use today's date",
    "Chọn thời hạn": "Choose a period",
    "Nhập số giờ tùy chọn": "Enter a custom number of hours",
    "Số giờ": "Hours",
    "Tùy chọn": "Custom",
    "Ngày bắt đầu tạm giam": "Start date of temporary detention",
    "Thời hạn tạm giam (ghi trong lệnh)": "Temporary detention period (as stated in the warrant)",
    "Số ngày đã tạm giữ (để trừ vào thời hạn tạm giam)": "Days already held in custody (deducted from the temporary detention period)",
    "Tuổi / Thời hạn tố tụng": "Age / procedural time limit",
    "Thời gian gốc Mốc bắt đầu": "Original time — starting point",
    "Thời hạn gốc": "Original period",
    "Cộng thêm": "Add",
    "Trừ đi": "Subtract",
    "Ví dụ nhanh": "Quick examples",
    "Thời hạn (điền các giá trị mong muốn, có thể để trống)": "Period (fill in the values you need; fields may be left blank)",
    "Năm": "Year",
    "Ngày": "Day",
    "Tháng": "Month",
    "Giờ (0-23)": "Hour (0-23)",
    "Phút (0-59)": "Minute (0-59)",
    "1 năm": "1 year",
    "2 năm": "2 years",
    "1 tháng": "1 month",
    "2 tháng": "2 months",
    "3 tháng": "3 months",
    "4 tháng": "4 months",
    "6 tháng": "6 months",
    "18 tuổi": "18 years of age",
    "20 ngày": "20 days",
    "Tổng quan": "Overview",
    "Video hướng dẫn": "Tutorial video",
    "Slide hướng dẫn": "Tutorial slides",
    "Video hướng dẫn chi tiết": "Detailed tutorial video",
    "Xem video ngay": "Watch the video",
    "Slide hướng dẫn từng bước": "Step-by-step slides",
    "Xem slide": "View slides",
    "Trình duyệt của bạn không hỗ trợ video.": "Your browser does not support video.",
    "Tải video hướng dẫn": "Download the tutorial video",
    "Video hướng dẫn tạo sơ đồ tư duy tự động": "Tutorial video on generating a mind map automatically",
    "Toàn màn hình để xem rõ hơn": "Use full screen for a clearer view",
    "Slide hướng dẫn - Tạo sơ đồ tư duy tự động": "Tutorial slides — Generate a mind map automatically",
    "Tạo sơ đồ tư duy tự động": "Generate a mind map automatically",
    "PHẦN MỀM HỖ TRỢ TÍNH LÃI SUẤT CHUYÊN DỤNG": "SPECIALIZED INTEREST RATE CALCULATOR",
    "Nghiệp vụ kỹ thuật số áp dụng trong ngành Kiểm sát nhân dân": "Digital professional tools for the People's Procuracy",
    "Phần mềm Tính Án phí & Lệ phí": "Court fee & levy calculator",
    "Công cụ hỗ trợ nghiệp vụ Kiểm sát - Bản quyền nội bộ": "Procuracy professional support tool — for internal use",
    "Tính toán án phí (có giá ngạch)": "Calculate court fees (ad valorem)",
    "Án phí dân sự sơ thẩm": "First-instance civil court fee",
    "Án phí KDTM sơ thẩm": "First-instance commercial court fee",
    "Án phí Lao động sơ thẩm": "First-instance labour court fee",
    "Thuận tình ly hôn / Hòa giải thành trước khi mở phiên tòa": "Uncontested divorce / successful mediation before the hearing opens",
    "(chỉ chịu 50% án phí – Điều 27 NQ 326/2016)": "(only 50% of the fee is payable — Art. 27 of Resolution 326/2016; official wording in Vietnamese)",
    "Tính toán ngay": "Calculate now",
    "Biên lai tính phí chi tiết": "Detailed fee calculation",
    "Giá trị tranh chấp:": "Value in dispute:",
    "Công thức áp dụng:": "Formula applied:",
    "Án phí gốc:": "Base court fee:",
    "Giảm 50% (Điều 27 NQ 326/2016):": "50% reduction (Art. 27 of Resolution 326/2016):",
    "Tổng án phí phải nộp:": "Total court fee payable:",
    "* Áp dụng theo Nghị quyết 326/2016/UBTVQH14": "* Applied under Resolution 326/2016/UBTVQH14 (fee schedule kept in Vietnamese)",
    "Bảng Tra cứu đầy đủ (Nghị quyết 326)": "Full lookup table (Resolution 326 — official wording in Vietnamese)",
    "Ghi chú pháp lý": "Legal notes",
    "Chọn tệp": "Choose files",
    "Chọn tệp .docx": "Choose .docx files",
    "Sao chép": "Copy",
    "Đóng": "Close",
    "Lưu": "Save",
    "Dừng": "Stop",
    "Tải .md": "Download .md",
    "Tải .txt": "Download .txt",
    "Kết quả": "Results",
    "Tệp": "File",
    "Trạng thái": "Status",
    "Hướng dẫn": "Guide",
    "1. Chọn tệp": "1. Choose files",
    "2. Kết quả": "2. Results",
    "Xem trước": "Preview",
    "Chạy trên trình duyệt": "Runs in the browser",
    "Chạy trên trình duyệt, không gửi tệp đi": "Runs in the browser; files are not uploaded"
  };

  /* ---------- Dịch toàn bộ nội dung hiển thị (EN 100%) ---------- */
  var VN_RE = /[àáảãạăằắẳẵặâầấẩẫậèéẻẽẹêềếểễệìíỉĩịòóỏõọôồốổỗộơờớởỡợùúủũụưừứửữựỳýỷỹỵđÀÁẢÃẠĂẰẮẲẴẶÂẦẤẨẪẬÈÉẺẼẸÊỀẾỂỄỆÌÍỈĨỊÒÓỎÕỌÔỒỐỔỖỘƠỜỚỞỠỢÙÚỦŨỤƯỪỨỬỮỰỲÝỶỸỴĐ]/;
  var PLACE_EN = {
    "Hà Nội": "Hanoi", "Cao Bằng": "Cao Bang", "Tuyên Quang": "Tuyen Quang",
    "Điện Biên": "Dien Bien", "Lai Châu": "Lai Chau", "Sơn La": "Son La",
    "Lào Cai": "Lao Cai", "Thái Nguyên": "Thai Nguyen", "Lạng Sơn": "Lang Son",
    "Quảng Ninh": "Quang Ninh", "Bắc Ninh": "Bac Ninh", "Phú Thọ": "Phu Tho",
    "Hải Phòng": "Hai Phong", "Hưng Yên": "Hung Yen", "Ninh Bình": "Ninh Binh",
    "Thanh Hóa": "Thanh Hoa", "Nghệ An": "Nghe An", "Hà Tĩnh": "Ha Tinh",
    "Quảng Trị": "Quang Tri", "Huế": "Hue", "Đà Nẵng": "Da Nang",
    "Quảng Ngãi": "Quang Ngai", "Gia Lai": "Gia Lai", "Khánh Hòa": "Khanh Hoa",
    "Đắk Lắk": "Dak Lak", "Đăk Lăk": "Dak Lak", "Lâm Đồng": "Lam Dong",
    "Đồng Nai": "Dong Nai", "Hồ Chí Minh": "Ho Chi Minh City",
    "Tây Ninh": "Tay Ninh", "Đồng Tháp": "Dong Thap", "Vĩnh Long": "Vinh Long",
    "An Giang": "An Giang", "Cần Thơ": "Can Tho", "Cà Mau": "Ca Mau"
  };
  var WORDS = {};
  var PHRASE_KEYS = [];
  var PHRASE_IDX = {};
  var applying = false;
  var packsLoaded = {};

  function addPhrases(map) {
    if (!map) return;
    var k, keys = Object.keys(map);
    for (var i = 0; i < keys.length; i++) {
      k = keys[i];
      if (!k) continue;
      PHRASE[k] = map[k];
    }
    rebuildPhraseIndex();
  }

  function addWords(map) {
    if (!map) return;
    var k, keys = Object.keys(map);
    for (var i = 0; i < keys.length; i++) {
      k = keys[i];
      WORDS[k] = map[k];
      WORDS[k.toLowerCase()] = map[k];
    }
  }

  function rebuildPhraseIndex() {
    var dk = Object.keys(VI);
    for (var si = 0; si < dk.length; si++) {
      var vk = dk[si];
      if (VI[vk] && EN[vk] && EN[vk] !== VI[vk]) {
        if (!PHRASE[VI[vk]]) PHRASE[VI[vk]] = EN[vk];
        var nv = norm(VI[vk]);
        if (nv && !PHRASE[nv]) PHRASE[nv] = EN[vk];
      }
    }
    var pk = Object.keys(PLACE_EN);
    for (var pi = 0; pi < pk.length; pi++) {
      if (!PHRASE[pk[pi]]) PHRASE[pk[pi]] = PLACE_EN[pk[pi]];
    }
    /* Viết tắt đứng riêng để abbrEn xử lý (bản dịch máy cũ kiểu «QĐ» → «decision making» làm hỏng CQĐT…) */
    var ak = Object.keys(ABBR_EN);
    for (var ai = 0; ai < ak.length; ai++) if (ak[ai] !== "CN" && ak[ai] !== "T7" && PHRASE[ak[ai]] != null) delete PHRASE[ak[ai]];
    var allk = Object.keys(PHRASE);
    for (var aj = 0; aj < allk.length; aj++) {
      var kk = allk[aj];
      if (abbrOnly(kk)) delete PHRASE[kk];
    }
    PHRASE_KEYS = Object.keys(PHRASE).sort(function (a, b) { return b.length - a.length; });
    PHRASE_IDX = {};
    for (var i = 0; i < PHRASE_KEYS.length; i++) {
      var k = PHRASE_KEYS[i];
      var c = k.charAt(0);
      if (!PHRASE_IDX[c]) PHRASE_IDX[c] = [];
      PHRASE_IDX[c].push(k);
    }
  }

  function i18nBase() {
    var scripts = document.getElementsByTagName("script");
    for (var i = 0; i < scripts.length; i++) {
      var src = scripts[i].src || "";
      if (src.indexOf("knks-i18n.js") !== -1) {
        return src.replace(/knks-i18n\.js(\?.*)?$/, "");
      }
    }
    try {
      var t = document.querySelector('script[src*="theme.js"]');
      if (t && t.src) return t.src.replace(/theme\.js(\?.*)?$/, "");
    } catch (e) {}
    return "";
  }

  function loadScript(src) {
    return new Promise(function (resolve) {
      if (packsLoaded[src]) { resolve(); return; }
      var el = document.createElement("script");
      el.src = src;
      el.async = false;
      el.onload = function () { packsLoaded[src] = 1; resolve(); };
      el.onerror = function () { resolve(); };
      (document.head || document.documentElement).appendChild(el);
    });
  }

  function packsForPath(path) {
    var list = ["i18n/pack-core.js"];
    if (/CoSoVanBanPhapLuat/.test(path)) list.push("i18n/pack-vbpl.js", "i18n/pack-vbpl-2026.js");
    else if (/NghiepVuVanPhong/.test(path)) list.push("i18n/pack-vanphong.js");
    else if (/KiemSat|GiaiQuyetKnTc/.test(path)) list.push("i18n/pack-kiemsat.js");
    else if (/\/Tool\/|\/Data\/|\/AnDanh\//.test(path) || /TinhTuoiThoiHan|HuongDan|Slide|SoanQd|TroLyAo|App_DS|App_tinh|FileRenamer|DocxToMd|PdfToMd|AnDanh/.test(path)) {
      list.push("i18n/pack-tools.js");
    }
    list.push("i18n/pack-abbr.js");
    return list;
  }

  function loadPacks() {
    var base = i18nBase();
    var packs = packsForPath(location.pathname || "");
    var chain = Promise.resolve();
    packs.forEach(function (p) {
      chain = chain.then(function () { return loadScript(base + p); });
    });
    return chain.then(function () {
      if (global.__KNKS_PHRASE_QUEUE) {
        var q = global.__KNKS_PHRASE_QUEUE;
        global.__KNKS_PHRASE_QUEUE = [];
        for (var i = 0; i < q.length; i++) {
          if (q[i].abbrPhrases) addAbbrPhrases(q[i].abbrPhrases);
          else if (q[i].phrases) addPhrases(q[i].phrases);
          else if (q[i].words) addWords(q[i].words);
          else addPhrases(q[i]);
        }
      }
      rebuildPhraseIndex();
    });
  }

  function preserve(s) {
    var hold = [];
    function keep(m) {
      hold.push(m);
      return "\u0000" + (hold.length - 1) + "\u0000";
    }
    s = s.replace(/Thiên Phúc © 2026/g, keep);
    s = s.replace(/Thiên Phúc/g, keep);
    s = s.replace(/Tiếng Việt/g, keep);
    return { s: s, hold: hold };
  }
  function restore(s, hold) {
    return s.replace(/\u0000(\d+)\u0000/g, function (_, n) { return hold[+n]; });
  }

  function applyCase(src, en) {
    if (!en) return en;
    if (src === src.toUpperCase() && src !== src.toLowerCase()) return en.toUpperCase();
    if (src.charAt(0) === src.charAt(0).toUpperCase() && src.slice(1) === src.slice(1).toLowerCase()) {
      return en.charAt(0).toUpperCase() + en.slice(1);
    }
    return en;
  }

  function replaceByIndex(s, map, idx) {
    var out = "", i = 0, n = s.length;
    while (i < n) {
      var list = idx[s.charAt(i)];
      var hit = null;
      if (list) {
        for (var j = 0; j < list.length; j++) {
          var k = list[j];
          if (k.length <= n - i && s.substr(i, k.length) === k) { hit = k; break; }
        }
      }
      if (hit) {
        out += map[hit];
        i += hit.length;
      } else {
        out += s.charAt(i);
        i++;
      }
    }
    return out;
  }

  function replaceWords(s) {
    return s.replace(/[A-Za-zÀ-ỹĐđ]+/g, function (w) {
      if (!VN_RE.test(w)) return w;
      if (ABBR_EN[w] != null || ICON_EN[w] != null) return w;
      var low = w.toLowerCase();
      var en = WORDS[w] || WORDS[low];
      if (en == null) return w;
      return applyCase(w, en);
    });
  }

  function patternDates(s) {
    s = s.replace(/ngày\s+(\d{1,2})\s+tháng\s+(\d{1,2})\s+năm\s+(\d{4})/gi, "$1/$2/$3");
    s = s.replace(/Ngày\s+(\d{1,2})\s+tháng\s+(\d{1,2})\s+năm\s+(\d{4})/g, "$1/$2/$3");
    s = s.replace(/ngày\s+(\d{1,2})\/(\d{1,2})\/(\d{4})/gi, "$1/$2/$3");
    s = s.replace(/(\d{1,2})\s*giờ\s*(\d{1,2})\s*phút/gi, "$1:$2");
    s = s.replace(/(\d{1,2})\s*giờ/gi, "$1:00");
    s = s.replace(/\bThứ\s*hai\b/gi, "Monday");
    s = s.replace(/\bThứ\s*ba\b/gi, "Tuesday");
    s = s.replace(/\bThứ\s*tư\b/gi, "Wednesday");
    s = s.replace(/\bThứ\s*năm\b/gi, "Thursday");
    s = s.replace(/\bThứ\s*sáu\b/gi, "Friday");
    s = s.replace(/\bThứ\s*bảy\b/gi, "Saturday");
    s = s.replace(/\bChủ\s*nhật\b/gi, "Sunday");
    s = s.replace(/\bCN\b(?=\s*[,)])/g, "Sun");
    return s;
  }


  var DEACCENT_MAP = {"à":"a","á":"a","ả":"a","ã":"a","ạ":"a","ă":"a","ằ":"a","ắ":"a","ẳ":"a","ẵ":"a","ặ":"a","â":"a","ầ":"a","ấ":"a","ẩ":"a","ẫ":"a","ậ":"a","è":"e","é":"e","ẻ":"e","ẽ":"e","ẹ":"e","ê":"e","ề":"e","ế":"e","ể":"e","ễ":"e","ệ":"e","ì":"i","í":"i","ỉ":"i","ĩ":"i","ị":"i","ò":"o","ó":"o","ỏ":"o","õ":"o","ọ":"o","ô":"o","ồ":"o","ố":"o","ổ":"o","ỗ":"o","ộ":"o","ơ":"o","ờ":"o","ớ":"o","ở":"o","ỡ":"o","ợ":"o","ù":"u","ú":"u","ủ":"u","ũ":"u","ụ":"u","ư":"u","ừ":"u","ứ":"u","ử":"u","ữ":"u","ự":"u","ỳ":"y","ý":"y","ỷ":"y","ỹ":"y","ỵ":"y","đ":"d","À":"A","Á":"A","Ả":"A","Ã":"A","Ạ":"A","Ă":"A","Ằ":"A","Ắ":"A","Ẳ":"A","Ẵ":"A","Ặ":"A","Â":"A","Ầ":"A","Ấ":"A","Ẩ":"A","Ẫ":"A","Ậ":"A","È":"E","É":"E","Ẻ":"E","Ẽ":"E","Ẹ":"E","Ê":"E","Ề":"E","Ế":"E","Ể":"E","Ễ":"E","Ệ":"E","Ì":"I","Í":"I","Ỉ":"I","Ĩ":"I","Ị":"I","Ò":"O","Ó":"O","Ỏ":"O","Õ":"O","Ọ":"O","Ô":"O","Ồ":"O","Ố":"O","Ổ":"O","Ỗ":"O","Ộ":"O","Ơ":"O","Ờ":"O","Ớ":"O","Ở":"O","Ỡ":"O","Ợ":"O","Ù":"U","Ú":"U","Ủ":"U","Ũ":"U","Ụ":"U","Ư":"U","Ừ":"U","Ứ":"U","Ử":"U","Ữ":"U","Ự":"U","Ỳ":"Y","Ý":"Y","Ỷ":"Y","Ỹ":"Y","Ỵ":"Y","Đ":"D"};
  function deaccent(s) {
    return String(s).replace(/[àáảãạăằắẳẵặâầấẩẫậèéẻẽẹêềếểễệìíỉĩịòóỏõọôồốổỗộơờớởỡợùúủũụưừứửữựỳýỷỹỵđÀÁẢÃẠĂẰẮẲẴẶÂẦẤẨẪẬÈÉẺẼẸÊỀẾỂỄỆÌÍỈĨỊÒÓỎÕỌÔỒỐỔỖỘƠỜỚỞỠỢÙÚỦŨỤƯỪỨỬỮỰỲÝỶỸỴĐ]/g, function (c) { return DEACCENT_MAP[c] || c; });
  }


  /* Số hiệu văn bản (NĐ-CP, NQ-HĐTP, QĐ-VKSTC…): giữ nguyên, chỉ bỏ dấu, không dịch từng chữ */
  var CODE_RE = /[0-9A-Za-zĐđ]+(?:[\/\-][0-9A-Za-zĐđ&]+)*\/[0-9A-Za-zĐđ&]+(?:[\/\-][0-9A-Za-zĐđ&]+)*/g;
  function protectCodes(s) {
    return s.replace(CODE_RE, function (m) { return /[ĐđA-Z]/.test(m) && /\d/.test(m) ? deaccent(m) : m; });
  }
  function exactPhrase(t) {
    var n = norm(t);
    if (!n) return n;
    if (ABBR_PHRASE[n] != null) return ABBR_PHRASE[n];
    if (!VN_RE.test(n)) return protectCodes(n);
    return PHRASE[n] || PLACE_EN[n] || null;
  }
  /* «03 ngày», «Còn 3 ngày», «Quá hạn 2 giờ»… */
  function countPhrase(n) {
    var m;
    if ((m = n.match(/^0*(\d+) ngày làm việc$/))) return m[1] + (m[1] === "1" ? " working day" : " working days");
    if ((m = n.match(/^0*(\d+) ngày$/))) return m[1] + (m[1] === "1" ? " day" : " days");
    if ((m = n.match(/^0*(\d+) giờ$/))) return m[1] + (m[1] === "1" ? " hour" : " hours");
    if ((m = n.match(/^0*(\d+) mốc$/))) return m[1] + (m[1] === "1" ? " milestone" : " milestones");
    if ((m = n.match(/^Còn 0*(\d+) (ngày làm việc|ngày|giờ)$/))) return m[1] + " " + ({ "ngày làm việc": "working day", "ngày": "day", "giờ": "hour" })[m[2]] + (m[1] === "1" ? "" : "s") + " left";
    if ((m = n.match(/^Quá hạn 0*(\d+) (ngày làm việc|ngày|giờ)$/))) return "Overdue by " + m[1] + " " + ({ "ngày làm việc": "working day", "ngày": "day", "giờ": "hour" })[m[2]] + (m[1] === "1" ? "" : "s");
    return null;
  }
  var SEP_RE = /( · | — | – | › | → | \| )/;
  /* Dịch theo mẫu và theo từng đoạn (nhóm · mảng, nhãn — giá trị…) trước khi rơi về dịch từng từ */
  function smartTranslate(n, depth) {
    if (depth > 3) return null;
    var hit = exactPhrase(n);
    if (hit != null) return hit;
    var m;
    if ((m = n.match(/^([^\s\wÀ-ỹĐđ“"(\[]+)\s*(.+)$/)) && VN_RE.test(m[2])) {
      var r0 = smartTranslate(m[2], depth + 1);
      if (r0 != null) return m[1] + " " + r0;
    }
    if ((m = n.match(/^\[([^\]]+)\] (.+)$/))) {
      var k0 = exactPhrase(m[1]), t0 = smartTranslate(m[2], depth + 1);
      if (k0 != null && t0 != null) return "[" + k0 + "] " + t0;
    }
    if ((m = n.match(/^(\d+) văn bản(.*)$/))) {
      var rest = m[2] ? smartTranslate(m[2].trim(), depth + 1) : "";
      if (rest == null) return null;
      return m[1] + (m[1] === "1" ? " document" : " documents") + (m[2] ? (/^\s/.test(m[2]) ? " " : "") + rest : "");
    }
    if ((m = countPhrase(n)) != null) return m;
    if ((m = n.match(/^(\d+) kết quả$/))) return m[1] + (m[1] === "1" ? " result" : " results");
    if ((m = n.match(/^Năm (\d{4})$/))) return "Year " + m[1];
    if ((m = n.match(/^Lọc: (“.*”|".*")$/))) return "Filter: " + m[1];
    if ((m = n.match(/^Không tìm thấy kết quả cho (“.*”|".*")\.?$/))) return "No results found for " + m[1] + ".";
    if ((m = n.match(/^Mẫu số (\S+)$/))) return "Form No. " + deaccent(m[1]);
    if ((m = n.match(/^Mẫu (\S+)$/))) return "Form " + deaccent(m[1]);
    if ((m = n.match(/^Án lệ số (\d+\/\d{4}\/AL)$/))) return "Precedent No. " + m[1];
    if ((m = n.match(/^Án lệ (\d+\/\d{4}\/AL)$/))) return "Precedent " + m[1];
    if ((m = n.match(/^(.*\S)\s*:\s*(.+)$/)) && m[1].length < 40 && !/[“"]/.test(m[1])) {
      var a = exactPhrase(m[1]);
      if (a != null) {
        var b = smartTranslate(m[2], depth + 1);
        if (b != null) return a + ": " + b;
      }
    }
    if (SEP_RE.test(n)) {
      var parts = n.split(SEP_RE), out = "";
      for (var i = 0; i < parts.length; i++) {
        if (i % 2) { out += parts[i]; continue; }
        var seg = parts[i].trim();
        if (!seg) { out += parts[i]; continue; }
        var tr = smartTranslate(seg, depth + 1);
        if (tr == null) return null;
        out += tr;
      }
      return out;
    }
    return null;
  }

  /* ---------- Chữ viết tắt tiếng Việt → tiếng Anh (chỉ chế độ EN) ----------
     Viết tắt không dấu (KN, TC, TTHS, BLTTHS, VKS, QĐ…) lọt qua VN_RE nên được xử lý riêng ở bước cuối.
     Số hiệu văn bản chính thức (02/2018/TTLT-VKSNDTC-…, 152/2026/NĐ-CP, …/QĐ-VKSTC), mã quy trình (HS-PT-01),
     URL, tên tệp được giữ nguyên (chỉ bỏ dấu Đ→D trong số hiệu như trước). */
  var ABBR_EN = {
    "KN": "complaint", "TC": "denunciation", "KN-TC": "complaints & denunciations", "KNTC": "complaints & denunciations",
    "KN-TC-KN": "complaints, denunciations & protests",
    "TTHS": "criminal procedure", "TTDS": "civil procedure", "TTHC": "administrative procedure",
    "BLTTHS": "Criminal Procedure Code", "BLTTDS": "Civil Procedure Code", "BLHS": "Criminal Code", "BLDS": "Civil Code",
    "BLLĐ": "Labour Code", "BLLD": "Labour Code", "LTTHC": "Law on Administrative Procedures",
    "HNGĐ": "marriage & family", "HNGD": "marriage & family", "DS-HNGĐ": "civil, marriage & family", "DS-HNGD": "civil, marriage & family",
    "KDTM": "business & commercial", "HĐTM": "commercial contract", "HĐLĐ": "labour contract",
    "VKS": "procuracy", "VKSND": "People's Procuracy", "VKSNDTC": "Supreme People's Procuracy", "VKSTC": "Supreme People's Procuracy",
    "VKSQS": "Military Procuracy", "KSND": "people's procuracy", "VKSCC": "High People's Procuracy",
    "TAND": "People's Court", "TANDTC": "Supreme People's Court", "TANDCC": "High People's Court", "TA": "court", "TAQS": "Military Court",
    "HĐXX": "trial panel", "HDXX": "trial panel", "HĐTP": "Council of Judges", "HDTP": "Council of Judges",
    "KSV": "procurator", "KTV": "procuracy inspector", "ĐTV": "investigator", "DTV": "investigator", "CHV": "enforcement officer",
    "VT": "Chief Procurator", "PVT": "Deputy Chief Procurator", "PTT": "deputy head", "LĐ": "leadership",
    "CQĐT": "investigating agency", "CQDT": "investigating agency", "CQTHTT": "procedure-conducting agency",
    "CQTHADS": "civil judgment enforcement agency", "CQTHAHS": "criminal judgment execution agency",
    "THA": "judgment enforcement", "THADS": "civil judgment enforcement", "THAHS": "criminal judgment execution",
    "THAHC": "administrative judgment enforcement", "KSTHA": "supervision of judgment enforcement",
    "THQCT": "exercise of the right to prosecute", "VAHS": "criminal case", "HSVA": "case file", "HSKS": "supervision file",
    "KS": "supervision", "KSĐT": "investigation supervision", "KSDT": "investigation supervision", "KSXX": "trial supervision",
    "KSXXHS": "criminal trial supervision", "TTKS": "direct supervision",
    "XX": "trial", "XXPT": "appellate trial", "XXGĐT": "cassation trial", "PT": "appeal", "ST": "first instance",
    "GĐT": "cassation", "GDT": "cassation", "ĐT": "investigation", "DT": "investigation", "ĐTBS": "additional investigation",
    "TĐC": "suspension", "KLĐT": "investigation conclusion", "KLDT": "investigation conclusion",
    "KNKT": "recommendation for prosecution", "RKN": "lessons learned", "TBRKN": "lessons-learned notice",
    "GQ": "resolution", "LV": "working days", "HL": "effective",
    "QĐ": "decision", "QD": "decision", "NĐ": "decree", "TT": "circular", "TTLT": "joint circular", "NQ": "resolution",
    "HD": "guidance", "CV": "official letter", "QC": "regulation", "KH": "plan", "KL": "conclusion", "BC": "report",
    "BB": "record", "TB": "notice", "CT": "directive", "PL": "appendix", "VB": "document", "VBHN": "consolidated text",
    "VBQPPL": "legal normative document", "QPPL": "legal normative", "VBPL": "legal document", "CSDL": "database",
    "TVPL": "Thu Vien Phap Luat", "TTĐT": "e-information", "TTDT": "e-information",
    "HS": "criminal", "DS": "civil", "HC": "administrative", "KT": "prosecution",
    "QĐHC": "administrative decision", "HVHC": "administrative act",
    "UBND": "People's Committee", "HĐND": "People's Council", "UBTVQH": "NA Standing Committee", "QH": "National Assembly",
    "BCA": "Ministry of Public Security", "BTP": "Ministry of Justice", "BQP": "Ministry of National Defence", "BTC": "Ministry of Finance",
    "BNG": "Ministry of Foreign Affairs", "CA": "police", "CAND": "People's Public Security", "CSGT": "traffic police",
    "CSĐT": "criminal police investigation", "CSDT": "criminal police investigation", "ANĐT": "security investigation", "ANDT": "security investigation",
    "CBCC": "civil servants", "TCCB": "personnel", "CNTT": "IT", "TĐKT": "emulation & commendation", "XDCB": "capital construction",
    "TSC": "public assets", "TSCĐ": "fixed assets", "PCCC": "fire safety", "ATTT": "information security", "BMNN": "state secrets",
    "PCTN": "anti-corruption", "PCTNLPTC": "anti-corruption, waste & negativity", "PBGDPL": "legal education & dissemination",
    "LLCT": "political theory", "QP-AN": "defence & security", "CĐS": "digital transformation", "ĐHKS": "Procuracy University",
    "KHKS": "Procuratorial Science", "BCĐ": "steering committee", "ĐVHC": "administrative unit", "TMCP": "joint-stock commercial",
    "CCCD": "citizen ID", "CMND": "ID card", "SĐT": "phone number", "SDT": "phone number", "STK": "account number", "MST": "tax code",
    "GCN": "certificate", "QSDĐ": "land use rights", "QSDD": "land use rights", "GCNQSDĐ": "land use right certificate",
    "GCNQSDD": "land use right certificate", "BĐS": "real estate", "ĐKDN": "business registration", "HTX": "cooperative",
    "DN": "enterprise", "BHXH": "social insurance", "NSNN": "state budget", "DTTS": "ethnic minority", "NCTN": "juvenile",
    "BPNC": "preventive measures", "BPĐT": "investigative measures", "BPKCTT": "interim emergency measures",
    "BPXLHC": "administrative handling measures", "XLHC": "administrative handling", "BP": "measure", "VPHC": "administrative violations",
    "XLVPHC": "handling of administrative violations", "BPXLCH": "diversion measures", "XLCH": "diversion",
    "NLCTXH": "social worker", "CSSC": "compulsory rehabilitation facility",
    "ĐG": "auction", "TĐG": "price appraisal", "ĐGTS": "property auction", "XM": "verification", "CC": "coercive enforcement",
    "HĐ": "contract", "TS": "property", "TK": "bank account", "ĐK": "conditions", "VNĐ": "VND", "NT": "serious",
    "TG": "custody", "TGTG": "custody & temporary detention", "TG-TG": "custody & temporary detention", "TGTGQ": "custody, temporary detention & management",
    "VP": "office", "TP": "city", "TPCT": "Can Tho City", "TPHCM": "Ho Chi Minh City", "STT": "No.", "XHCN": "socialist",
    "VD": "e.g.", "MH": "screen", "THPT": "high school", "HSMT": "bidding documents", "HCST": "first-instance administrative",
    "CN": "Sun", "T7": "Sat", "TL": "by order", "VA": "case", "CHA": "sentence serving",
    "BMTKNV": "professional statistics forms", "BMHS": "criminal statistics forms", "BA": "judgment", "PCT": "Vice Chairman", "AL": "precedent", "CĐ": "topic"
  };
  /* Chữ trên ô biểu tượng đầu trang (2–3 ký tự) */
  var ICON_EN = { "KN": "CD", "HS": "CJ", "DS": "CE", "AD": "CIV", "AH": "CRM", "VP": "OF", "VB": "DB", "QĐ": "DC", "QD": "DC" };
  var LAW_EN = {
    "KN": "Law on Complaints", "TC": "Law on Denunciations", "TCN": "Law on Denunciations", "TTHC": "Law on Administrative Procedures",
    "HNGĐ": "Law on Marriage and Family", "HNGD": "Law on Marriage and Family", "ĐGTS": "Law on Property Auction",
    "ATTT": "Law on Cyberinformation Security", "VPHC": "Law on Handling Administrative Violations", "XLVPHC": "Law on Handling Administrative Violations",
    "THADS": "Law on Enforcement of Civil Judgments", "THAHS": "Law on Execution of Criminal Judgments", "TTHS": "Criminal Procedure Code",
    "TTDS": "Civil Procedure Code", "TCCQĐTHS": "Law on Organization of Criminal Investigation Agencies"
  };
  var DOC_EN = { "QĐ": "Decision", "QD": "Decision", "NĐ": "Decree", "ND": "Decree", "TT": "Circular", "TTLT": "Joint Circular",
    "NQ": "Resolution", "HD": "Guidance", "CV": "Official Letter", "CT": "Directive", "QC": "Regulation", "KH": "Plan",
    "BC": "Report", "TB": "Notice", "QĐHC": "Administrative decision" };
  var AB_L = "(^|[^A-Za-z0-9À-ỹĐđ_])", AB_R = "(?=$|[^A-Za-z0-9À-ỹĐđ_])";
  /* Bản dịch tay cho chuỗi có viết tắt (i18n/pack-abbr.js) — ưu tiên trước PHRASE dịch máy */
  var ABBR_PHRASE = {};
  function addAbbrPhrases(map) {
    if (!map) return;
    var ks = Object.keys(map);
    for (var i = 0; i < ks.length; i++) ABBR_PHRASE[norm(ks[i])] = map[ks[i]];
  }
  var ABBR_KEYS = Object.keys(ABBR_EN).sort(function (a, b) { return b.length - a.length; });
  function reEsc(s) { return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"); }
  var ABBR_ALT = ABBR_KEYS.map(reEsc).join("|");
  var ABBR_TEST = new RegExp(AB_L + "(" + ABBR_ALT + "|PL\\d{2})" + AB_R);
  var ABBR_TOKEN_RE = new RegExp(AB_L + "(" + ABBR_ALT + ")" + AB_R, "g");
  var HOLD_RES = [
    /https?:\/\/[^\s)»"'<>]+/g,
    /[\w.+-]+@[\w-]+\.[\w.]+/g,
    /\b(?:[0-9A-F]{2}:){3,}[0-9A-F]{2}\b/g,
    /[0-9A-Za-zĐđ.…]*\d[0-9A-Za-zĐđ.…]*(?:[\/\-][0-9A-Za-zĐđ&.…]+)*\/[0-9A-Za-zĐđ&.…]+(?:[\/\-][0-9A-Za-zĐđ&.…]+)*/g,
    /\/[A-ZĐ][A-ZĐ0-9]*(?:-[A-ZĐ0-9…]+)+/g,
    /\b[A-ZĐ]{1,6}(?:-[A-ZĐ]{1,6})*-\d{1,3}\b/g,
    /[^\s"«»()]+\.(?:pdf|htm|html|docx?|xlsx?|txt|zip|apk|exe|md|json|png|jpe?g)\b/gi
  ];
  /* \b của JS không nhận Đ/Í… là chữ: đổi \b đầu mẫu thành nhóm tiền tố, các \b khác thành lookahead (không dùng lookbehind cho Safari cũ) */
  /* Trang kiểm sát án / thống kê: «KN» là kháng nghị (protest); trang KN-TC: khiếu nại (complaint) */
  var KN_PROTEST = false, SRC_HAS_KHANG_NGHI = false, THA_CRIM = false;
  try { KN_PROTEST = /KiemSatAnHs|KiemSatAnDs|NghiepVuVanPhong/.test(location.pathname || ""); THA_CRIM = /KiemSatThahs/.test(location.pathname || ""); } catch (e) {}
  function abbrRule(src, fn) {
    var lead = src.indexOf("\\b") === 0;
    if (lead) src = AB_L + src.slice(2);
    src = src.split("\\b").join(AB_R);
    return [new RegExp(src, "g"), fn, lead];
  }
  function lawName(k) { return LAW_EN[k] || null; }
  var ABBR_RULES = [
    abbrRule("\\bVKSND\\s+(?:TC|tối cao|Tối cao|Supreme)\\b", function () { return "Supreme People's Procuracy"; }),
    abbrRule("\\bTAND\\s+(?:TC|tối cao|Tối cao|Supreme)\\b", function () { return "Supreme People's Court"; }),
    abbrRule("\\bVKSND\\s+(?:TP\\.?\\s*(?:Cần Thơ|Can Tho)(?: City)?|TPCT)\\b", function () { return "Can Tho City People's Procuracy"; }),
    abbrRule("\\bTP\\.?\\s*(?:Hồ Chí Minh|Ho Chi Minh)(?: City)?\\b", function () { return "Ho Chi Minh City"; }),
    abbrRule("\\bTP\\.?\\s*(?:Cần Thơ|Can Tho)(?: City)?\\b", function () { return "Can Tho City"; }),
    abbrRule("\\bTP\\.?\\s+([A-Z][a-z]+(?: [A-Z][a-z]+)?)\\b", function (m, a) { return a + " City"; }),
    abbrRule("\\b(KN-TC|KN|TC)\\s+(TTHS|TTDS|TTHC)\\b", function (m, a, b) {
      var p = { "TTHS": "criminal procedure", "TTDS": "civil procedure", "TTHC": "administrative procedure" }[b];
      return p + " " + (a === "KN" ? "complaint" : a === "TC" ? "denunciation" : "complaints & denunciations");
    }),
    abbrRule("\\bKN(?=\\s+(?:phúc thẩm|giám đốc thẩm|tái thẩm|GĐT|GDT|PT|appeal|appellate|cassation|reopening)\\b)", function () { return "protest"; }),
    abbrRule("\\b(?:KS|Kiểm sát|Supervision of|Control of|Supervising|Procuracy of)\\s+(KN-TC|KNTC)\\b", function () { return "supervision of complaints & denunciations"; }),
    abbrRule("\\b(KN|TC)\\s+(?:hành chính|administrative|Administrative)\\b", function (m, a) { return "administrative " + (a === "KN" ? "complaint" : "denunciation"); }),
    abbrRule("\\b(?:Administrative|administrative)\\s+(KN|TC)\\b", function (m, a) { return "administrative " + (a === "KN" ? "complaint" : "denunciation"); }),
    abbrRule("\\bKN\\s+(?:kỷ luật|disciplinary)\\s+CBCC\\b", function () { return "disciplinary complaint by a civil servant"; }),
    abbrRule("\\b(?:Bộ luật|Code of|Code)\\s+(TTHS|TTDS)\\b", function (m, a) { return lawName(a); }),
    abbrRule("\\b(?:Luật|Law on|Law of|Law)\\s+(KN|TC|TTHC|HNGĐ|HNGD|ĐGTS|ATTT|VPHC|XLVPHC|THADS|THAHS)\\b", function (m, a) { return lawName(a); }),
    abbrRule("\\b(KN|TC|TTHC|HNGĐ|HNGD|ĐGTS|ATTT|VPHC|XLVPHC|THADS|THAHS)\\s+(?:Law|law)\\b", function (m, a) { return lawName(a); }),
    abbrRule("\\b(?:KS|Supervision|supervision)\\s+(THAHS|THADS|THAHC|THA|DS|HS|HC|TG-TG|TGTG|GQ|KN|TC)\\b", function (m, a) {
      var x = { "DS": "civil cases", "HS": "criminal cases", "HC": "administrative cases", "KN": "complaints", "TC": "denunciations", "GQ": "resolution" }[a] || ABBR_EN[a];
      return "supervision of " + x;
    }),
    abbrRule("\\b(?:BA|Judgment|judgment)\\s+(DS|HS|HC)\\b", function (m, a) { return ({ "DS": "civil", "HS": "criminal", "HC": "administrative" })[a] + " judgment"; }),
    abbrRule("\\bLệnh\\s+(TG-TG)\\b", function () { return "custody/detention order"; }),
    abbrRule("\\b(VT)\\s*\\/\\s*PVT\\b", function () { return "Chief/Deputy Chief Procurator"; }),
    abbrRule("(Lưu|Archived?|Saved?|Storage|Keep|Kept)\\s*:\\s*VT\\b", function (m, a) { return a + ": Archives"; }),
    abbrRule("\\bKT\\.\\s*", function () { return "P.P. "; }),
    abbrRule("\\b(?:mới|newly|new)\\s+KT\\b", function () { return "newly prosecuted"; }),
    abbrRule("\\b(Ít|ít|Less|less|Little|little|Minor|minor)\\s+NT\\b", function (m, a) { return (/^[A-ZÍ]/.test(a) ? "Less" : "less") + " serious"; }),
    abbrRule("\\b(rất|Rất|very|Very)\\s+NT\\b", function (m, a) { return (/^[A-ZR]/.test(a) ? "Very" : "very") + " serious"; }),
    abbrRule("(đặc biệt|Đặc biệt|especially|Especially|particularly|Particularly|special|Special|exceptionally|Exceptionally)\\s+NT\\b", function (m, a) { return (/^[A-ZĐ]/.test(a) ? "Particularly" : "particularly") + " serious"; }),
    abbrRule("\\bKH\\s*&\\s*CN\\b", function () { return "science & technology"; }),
    abbrRule("\\b(?:XX)?(GĐT|GDT)\\s*([\\/,])\\s*TT\\b", function (m, a, sep) { return (/^XX/.test(m) ? "cassation/reopening trial" : "cassation" + (sep === "," ? ", " : "/") + "reopening"); }),
    abbrRule("\\bĐT\\s*\\/\\s*XX\\b", function () { return "investigation/trial"; }),
    abbrRule("\\bPL(\\d{2})\\b", function (m, a) { return "Appendix " + a; }),
    abbrRule("\\b(\\d+)\\s+PL\\b", function (m, a) { return a + " appendices"; }),
    abbrRule("\\b(?:ngày|Ngày|days?|Days?|dates?|Dates?|day|Day)\\s+LV\\b", function (m) { return (/^[NDA-Z]/.test(m) ? "Working days" : "working days"); }),
    abbrRule("\\b(?:hạn|Hạn|deadline|Deadline|time limit|Time limit|limit|Limit|term|Term)\\s+(?:for\\s+|of\\s+)?GQ\\b", function (m) { return (/^[A-ZH]/.test(m) ? "Resolution deadline" : "resolution deadline"); }),
    abbrRule("\\bGQ\\s+(?:deadline|time limit|term)\\b", function () { return "resolution deadline"; }),
    abbrRule("\\b(?:hết|out of|expired?|expiry of|no longer)\\s+HL\\b", function () { return "expired"; }),
    abbrRule("\\b(QĐHC|QĐ|QD|NĐ|ND|TTLT|TT|NQ|HD|CV|CT|QC|KH|BC|TB)\\s+(số\\s+|No\\.\\s*)?(?=\\d|\\u0001)", function (m, a, no) { return DOC_EN[a] + " " + (no ? "No. " : ""); }),
    abbrRule("\\b(QĐ|QD)\\s+(?=KS|[A-Z]{2,}\\b)", function () { return "Decision "; })
  ];
  function abbrCase(rep, before, upper) {
    if (!rep) return rep;
    if (upper) return rep.toUpperCase();
    if (/(^\s*|[.!?•·—–|:;\n]\s+|^\s*[\-–•·(\[«“"]\s*)$/.test(before) && /^[a-z]/.test(rep)) return rep.charAt(0).toUpperCase() + rep.slice(1);
    return rep;
  }
  function abbrEn(s) {
    if (s == null) return s;
    var str = String(s);
    if (!ABBR_TEST.test(str)) return str;
    var hold = [];
    function keep(m) { hold.push(/[ĐđA-Z]/.test(m) && /\d/.test(m) ? deaccent(m) : m); return "\u0001" + (hold.length - 1) + "\u0002"; }
    for (var h = 0; h < HOLD_RES.length; h++) str = str.replace(HOLD_RES[h], keep);
    var rest = str.replace(ABBR_TOKEN_RE, "$1").replace(/\u0001\d+\u0002/g, "").replace(/[^A-Za-zÀ-ỹĐđ]/g, "");
    var whole = rest.length > 6 && rest === rest.toUpperCase() && rest !== rest.toLowerCase();
    for (var r = 0; r < ABBR_RULES.length; r++) {
      var rule = ABBR_RULES[r];
      str = str.replace(rule[0], function () {
        var args = Array.prototype.slice.call(arguments);
        var full = args[args.length - 1], off = args[args.length - 2];
        var pre = "";
        if (rule[2]) {
          pre = args[1] || "";
          args.splice(1, 1);
          args[0] = args[0].slice(pre.length);
          off += pre.length;
        }
        return pre + abbrCase(rule[1].apply(null, args), full.slice(0, off), whole);
      });
    }
    str = str.replace(ABBR_TOKEN_RE, function (m, pre, tok, off, full) {
      var rep = (tok === "KN" && KN_PROTEST && !SRC_HAS_KHANG_NGHI) ? "protest" : (tok === "THA" && THA_CRIM) ? "judgment execution" : ABBR_EN[tok];
      if (rep == null) return m;
      return pre + abbrCase(rep, full.slice(0, off + pre.length), whole);
    });
    return str.replace(/\u0001(\d+)\u0002/g, function (_, n) { return hold[+n]; });
  }
  function hasAbbr(s) { return s != null && ABBR_TEST.test(String(s)); }
  /* Chuỗi chỉ gồm viết tắt, số hiệu, số và dấu câu (vd «TTLT 02/2018 · QĐ 50», «KS KN-TC») */
  function abbrOnly(s) {
    var t = String(s);
    if (!ABBR_TEST.test(t)) return false;
    for (var h = 0; h < HOLD_RES.length; h++) t = t.replace(HOLD_RES[h], " ");
    t = t.replace(ABBR_TOKEN_RE, "$1 ").replace(/\bPL\d{2}\b/g, " ");
    return !/[A-Za-zÀ-ỹĐđ]/.test(t);
  }

  function translate(s) {
    if (s == null) return s;
    var raw = String(s);
    var na = norm(raw);
    SRC_HAS_KHANG_NGHI = /kháng nghị|khiếu nại|tố cáo|(^|[^A-Za-zÀ-ỹĐđ])(TC|KN-TC|KNTC)([^A-Za-zÀ-ỹĐđ]|$)/i.test(raw);
    if (na && ABBR_PHRASE[na] != null) return raw.match(/^\s*/)[0] + abbrEn(ABBR_PHRASE[na]) + raw.match(/\s*$/)[0];
    /* Tên tệp (…/TB rut KN … DS.pdf) là định danh: chỉ bỏ dấu, không dịch */
    if (/^[^\n\/]{1,200}\.(?:pdf|htm|html|docx?|xlsx?|txt|zip)$/i.test(na)) return deaccent(raw);
    if (abbrOnly(raw)) return abbrEn(raw);
    var cp = na && countPhrase(na);
    if (cp) return raw.match(/^\s*/)[0] + cp + raw.match(/\s*$/)[0];
    if (!VN_RE.test(raw)) {
      if (!hasAbbr(raw)) return raw;
      var n0 = norm(raw);
      if (PHRASE[n0]) {
        return raw.match(/^\s*/)[0] + abbrEn(PHRASE[n0]) + raw.match(/\s*$/)[0];
      }
      return abbrEn(raw);
    }
    return abbrEn(translateCore(raw)).replace(/(\d)\/\/(?=[A-Z])/g, "$1/");
  }

  function translateCore(raw) {
    if (/\S\s*\n\s*\S/.test(raw) && !PHRASE[norm(raw)] && smartTranslate(norm(raw), 0) == null) {
      return raw.split(/(\n+)/).map(function (part, i) { return i % 2 ? part : translate(part); }).join("");
    }
    var pr = preserve(raw);
    var text = pr.s;
    if (!VN_RE.test(text)) return restore(text, pr.hold);
    var n = norm(text);
    if (PHRASE[n]) return restore(PHRASE[n], pr.hold);
    if (PHRASE[text]) return restore(PHRASE[text], pr.hold);
    var pl = PLACE_EN[text] || PLACE_EN[n];
    if (pl) return restore(pl, pr.hold);
    var smart = smartTranslate(n, 0);
    if (smart != null) {
      var lead = text.match(/^\s*/)[0], trail = text.match(/\s*$/)[0];
      return restore(lead + smart + trail, pr.hold);
    }
    text = protectCodes(text);
    text = patternDates(text);
    text = replaceByIndex(text, PLACE_EN, (function () {
      var idx = {}, keys = Object.keys(PLACE_EN).sort(function (a, b) { return b.length - a.length; });
      for (var i = 0; i < keys.length; i++) {
        var c = keys[i].charAt(0);
        (idx[c] = idx[c] || []).push(keys[i]);
      }
      return idx;
    })());
    if (PHRASE_KEYS.length) text = replaceByIndex(text, PHRASE, PHRASE_IDX);
    text = replaceWords(text);
    if (VN_RE.test(text)) text = deaccent(text);
    return restore(text, pr.hold);
  }

  function skipTranslate(node) {
    var el = node.nodeType === 1 ? node : node.parentElement;
    if (!el || !el.closest) return true;
    if (el.closest("script,style,noscript,textarea,input,svg,[data-no-i18n],[data-knks-lang]")) return true;
    return false;
  }

  function translateNode(node) {
    if (!node) return;
    if (node.nodeType === 3) {
      if (skipTranslate(node)) return;
      if (node._knksOrig == null) node._knksOrig = node.nodeValue;
      var orig = node._knksOrig;
      if (!isEn()) {
        if (node.nodeValue !== orig) node.nodeValue = orig;
        return;
      }
      var pe = node.parentElement;
      var next = (pe && pe.classList && pe.classList.contains("hdr-icon") && ICON_EN[norm(orig)]) ? ICON_EN[norm(orig)] : translate(orig);
      node._knksTranslated = next;
      if (node.nodeValue !== next) node.nodeValue = next;
      return;
    }
    if (node.nodeType !== 1) return;
    if (skipTranslate(node) && node.tagName !== "INPUT" && node.tagName !== "TEXTAREA") return;
    var attrs = ["placeholder", "title", "aria-label", "alt", "content"];
    if (node.tagName === "META" && (node.getAttribute("name") === "description" || node.getAttribute("property") === "og:description")) {
      attrs.push("content");
    }
    for (var i = 0; i < attrs.length; i++) {
      var a = attrs[i];
      if (!node.getAttribute) continue;
      if (node.hasAttribute("data-i18n-" + (a === "placeholder" ? "placeholder" : a === "title" ? "title" : a === "aria-label" ? "aria" : a === "alt" ? "alt" : "x"))) continue;
      var cur = node.getAttribute(a);
      if (cur == null) continue;
      var flag = "data-knks-orig-" + a;
      if (!node.hasAttribute(flag)) node.setAttribute(flag, cur);
      var o = node.getAttribute(flag);
      node.setAttribute(a, isEn() ? translate(o) : o);
    }
    if (node.tagName === "OPTION") {
      /* value often equals label; keep value, translate text via text nodes */
    }
  }

  function translateTree(root) {
    var box = root || document;
    if (!box) return;
    if (box.nodeType === 3) { translateNode(box); return; }
    if (box.querySelectorAll) {
      var withAttr = box.querySelectorAll("[placeholder],[title],[aria-label],[alt]");
      for (var i = 0; i < withAttr.length; i++) translateNode(withAttr[i]);
      var md = box.querySelectorAll ? box.querySelectorAll('meta[name="description"]') : [];
      for (var m = 0; m < md.length; m++) translateNode(md[m]);
    }
    if (!box.createTreeWalker && !document.createTreeWalker) return;
    var walker = document.createTreeWalker(box === document ? document.body || box : box, NodeFilter.SHOW_TEXT, null, false);
    var n;
    while ((n = walker.nextNode())) translateNode(n);
  }

  function wrapDialogs() {
    if (wrapDialogs._done) return;
    wrapDialogs._done = 1;
    ["alert", "confirm", "prompt"].forEach(function (name) {
      var orig = global[name];
      if (typeof orig !== "function") return;
      global[name] = function (msg, def) {
        var m = isEn() ? translate(String(msg == null ? "" : msg)) : msg;
        if (name === "prompt") return orig.call(global, m, def);
        return orig.call(global, m);
      };
    });
  }

  rebuildPhraseIndex();


  var PAGE_TITLE = {
    "index.html": "app.title",
    "": "app.title",
    "cai-dat.html": "install.title",
    "privacy.html": "privacy.title",
    "offline.html": "offline.title",
    "hoi-dap.html": "hdqa.title",
    "AnDanh/index.html": "andanh.title",
    "Tool/AnDanh/index.html": "andanh.title",
    "Tool/FileRenamer/index.html": "renamer.title",
    "Tool/DocxToMd/index.html": "docx.title",
    "Tool/PdfToMd/index.html": "pdf.title",
    "Tool/TroLyAoKiemSat/index.html": "troly.title",
    "Tool/SoanQdPhanCong/index.html": "soanqd.title",
    "Data/TinhTuoiThoiHan.html": "tuoi.title",
    "Data/HuongDan.html": "hd.title",
    "Tool/App_tinh_lai_suat/index.html": "lai.title",
    "Tool/App_DS/index.html": "anphi.title",
    "Tool/KiemSatAnHs/index.html": "ks.anhs.title",
    "Tool/KiemSatAnDs/index.html": "ks.ands.title",
    "Tool/KiemSatThads/index.html": "ks.thads.title",
    "Tool/KiemSatThahs/index.html": "ks.thahs.title",
    "Tool/GiaiQuyetKnTc/index.html": "ks.kntc.title",
    "Tool/CoSoVanBanPhapLuat/index.html": "ks.vbpl.title",
    "Tool/NghiepVuVanPhong/index.html": "ks.vp.title"
  };
  add("ks.anhs.title", "Kỹ năng kiểm sát án hình sự — Kỹ năng Kiểm sát", "Supervision of criminal cases — Prosecutorial Skills");
  add("ks.ands.title", "Kỹ năng kiểm sát án dân sự — Kỹ năng Kiểm sát", "Supervision of civil cases — Prosecutorial Skills");
  add("ks.thads.title", "Kỹ năng kiểm sát thi hành án dân sự — Kỹ năng Kiểm sát", "Supervision of civil judgment enforcement — Prosecutorial Skills");
  add("ks.thahs.title", "Kỹ năng kiểm sát thi hành án hình sự — Kỹ năng Kiểm sát", "Supervision of criminal judgment execution — Prosecutorial Skills");
  add("ks.kntc.title", "Kỹ năng giải quyết khiếu nại, tố cáo — Kỹ năng Kiểm sát", "Settlement of complaints & denunciations — Prosecutorial Skills");
  add("ks.vbpl.title", "Cơ sở dữ liệu văn bản pháp luật — Kỹ năng Kiểm sát", "Legal Database — procuratorial Skills");
  add("ks.vp.title", "Kỹ năng nghiệp vụ văn phòng — Kỹ năng Kiểm sát", "Office professional skills — Prosecutorial Skills");

  var LAW_NOTE_RE = /(KiemSat|GiaiQuyetKnTc|CoSoVanBanPhapLuat|NghiepVuVanPhong|App_tinh_lai_suat|App_DS|TinhTuoiThoiHan)/i;

  /* Cài ứng dụng */
  add("install.android", "Điện thoại Android", "Android phones");
  add("install.dlBtn", "⬇ Tải ứng dụng Android (APK · 2,5 MB)", "⬇ Download the Android app (APK · 2.5 MB)");
  add("install.ver", "Phiên bản 1.0.0 · Android 7.0 trở lên", "Version 1.0.0 · Android 7.0 or later");
  add("install.a1.html", "Bấm nút <strong>Tải ứng dụng Android</strong> ở trên. Nếu đang mở trong <strong>Zalo</strong>, bấm dấu <strong>⋯</strong> (góc trên) → <strong>Mở bằng trình duyệt</strong> rồi bấm lại nút tải.", "Tap <strong>Download the Android app</strong> above. If you opened this in <strong>Zalo</strong>, tap <strong>⋯</strong> (top corner) → <strong>Open in browser</strong>, then tap the download button again.");
  add("install.a2.html", "Tải xong, bấm vào thông báo <strong>KyNangKiemSat-1.0.0.apk</strong> (hoặc mở ứng dụng <strong>Tệp / Quản lý tệp → Tải xuống</strong>).", "After the download, tap the <strong>KyNangKiemSat-1.0.0.apk</strong> notification (or open <strong>Files / File Manager → Downloads</strong>).");
  add("install.a3.html", "Nếu máy báo <em>«Vì lý do bảo mật, điện thoại không được phép cài ứng dụng không rõ nguồn»</em>: bấm <strong>Cài đặt</strong> → bật <strong>Cho phép từ nguồn này</strong> → quay lại.", "If the phone says <em>“For security reasons, your phone is not allowed to install unknown apps”</em>: tap <strong>Settings</strong> → turn on <strong>Allow from this source</strong> → go back.");
  add("install.a4.html", "Bấm <strong>Cài đặt</strong>. Nếu Google Play Protect cảnh báo «ứng dụng chưa được xác minh / không rõ»: bấm <strong>Thông tin chi tiết</strong> → <strong>Vẫn cài đặt</strong> (ứng dụng chưa phát hành qua cửa hàng nên Google chưa biết).", "Tap <strong>Install</strong>. If Google Play Protect warns that the app is “not verified / unknown”: tap <strong>More details</strong> → <strong>Install anyway</strong> (the app is not yet on the Play Store, so Google does not recognize it).");
  add("install.a5.html", "Bấm <strong>Mở</strong>. Biểu tượng <strong>KN Kiểm sát</strong> xuất hiện trên màn hình chính. Lần đầu mở cần có mạng để tải sẵn công cụ.", "Tap <strong>Open</strong>. The <strong>procuratorial Skills</strong> app icon appears on the Home Screen. The first launch needs a network connection to cache the tools.");
  add("install.unknownSum", "Không thấy mục «Cho phép từ nguồn này»? (theo hãng máy)", "Don’t see “Allow from this source”? (by phone brand)");
  add("install.samsung.html", "<strong>Samsung</strong>: Cài đặt → Ứng dụng → (⋮) Quyền truy cập đặc biệt → Cài đặt ứng dụng không rõ nguồn → chọn Chrome (hoặc Tệp của tôi) → Cho phép.", "<strong>Samsung</strong>: Settings → Apps → (⋮) Special access → Install unknown apps → choose Chrome (or My Files) → Allow.");
  add("install.xiaomi.html", "<strong>Xiaomi / Redmi / POCO</strong>: Cài đặt → Ứng dụng → Quyền đặc biệt (Quyền truy cập ứng dụng đặc biệt) → Cài đặt ứng dụng không rõ nguồn → chọn Chrome → Cho phép. Máy có thể yêu cầu chờ vài giây rồi bấm «Tôi hiểu rủi ro».", "<strong>Xiaomi / Redmi / POCO</strong>: Settings → Apps → Special permissions → Install unknown apps → choose Chrome → Allow. The phone may ask you to wait a few seconds, then tap “I understand the risk”.");
  add("install.oppo.html", "<strong>OPPO / realme</strong>: Cài đặt → Mật khẩu & bảo mật (hoặc Quyền riêng tư) → Quyền hệ thống/Cài đặt ứng dụng không rõ nguồn → chọn Chrome → Cho phép.", "<strong>OPPO / realme</strong>: Settings → Password & security (or Privacy) → Special app access / Install unknown apps → choose Chrome → Allow.");
  add("install.vivo.html", "<strong>vivo</strong>: Cài đặt → Bảo mật (hoặc Ứng dụng) → Cài đặt ứng dụng không rõ nguồn → chọn Chrome → Cho phép.", "<strong>vivo</strong>: Settings → Security (or Apps) → Install unknown apps → choose Chrome → Allow.");
  add("install.other.html", "Máy khác: vào <strong>Cài đặt</strong>, tìm «không rõ nguồn» hoặc «unknown apps», cấp quyền cho trình duyệt bạn dùng để tải.", "Other phones: open <strong>Settings</strong>, search for “unknown apps”, and grant permission to the browser you used to download.");
  add("install.unknownFoot", "Tên mục có thể khác đôi chút theo phiên bản Android. Cài xong có thể tắt lại quyền này.", "Menu names may differ slightly by Android version. You can turn this permission off again after installing.");
  add("install.altSum", "Cách khác không cần tải APK", "Another way, without downloading the APK");
  add("install.alt.html", "Mở <a href=\"./\">trang ứng dụng</a> bằng <strong>Chrome</strong> → menu <strong>⋮</strong> → <strong>Cài đặt ứng dụng</strong> (hoặc «Thêm vào màn hình chính»).", "Open the <a href=\"./\">app page</a> in <strong>Chrome</strong> → <strong>⋮</strong> menu → <strong>Install app</strong> (or “Add to Home Screen”).");
  add("install.itSum", "Kiểm tra tệp (dành cho cán bộ CNTT)", "File check (for IT staff)");
  add("install.ios", "iPhone, iPad", "iPhone, iPad");
  add("install.ios1.html", "Mở trang này bằng <strong>Safari</strong> (nếu đang ở Zalo: bấm <strong>⋯</strong> → <strong>Mở bằng trình duyệt</strong>).", "Open this page in <strong>Safari</strong> (if you are in Zalo: tap <strong>⋯</strong> → <strong>Open in browser</strong>).");
  add("install.ios2.html", "Bấm nút <strong>Chia sẻ</strong> (hình vuông có mũi tên đi lên, ở thanh dưới cùng).", "Tap the <strong>Share</strong> button (square with an up arrow, on the bottom bar).");
  add("install.ios3.html", "Kéo xuống, chọn <strong>Thêm vào MH chính</strong> (Thêm vào Màn hình chính) → <strong>Thêm</strong>.", "Scroll down, choose <strong>Add to Home Screen</strong> → <strong>Add</strong>.");
  add("install.ios4.html", "Mở biểu tượng <strong>KN Kiểm sát</strong> trên màn hình chính.", "Open the <strong>procuratorial Skills</strong> app icon on the Home Screen.");
  add("install.openApp", "Mở trang ứng dụng", "Open the app page");
  add("install.pc", "Máy tính (Windows / Mac)", "Computer (Windows / Mac)");
  add("install.pcIntro", "Ứng dụng chạy trong cửa sổ riêng, có biểu tượng ngoài Desktop / Start Menu / Dock, không có thanh địa chỉ và tự cập nhật theo bản mới nhất.", "The app runs in its own window with an icon on the Desktop / Start Menu / Dock, no address bar, and updates itself to the latest version.");
  add("install.pwaH", "Cách 1: Cài nhanh 1 chạm", "Option 1: One-click install");
  add("install.recommended", "Khuyên dùng", "Recommended");
  add("install.pwaSub", "Dùng cho Windows và Mac, không hiện cảnh báo bảo mật.", "Works on Windows and Mac, with no security warnings.");
  add("install.pwaBtn", "🖥 Cài vào máy tính ngay", "🖥 Install on this computer");
  add("install.pwaDone.html", "✓ Ứng dụng đã được cài trên máy này. Mở biểu tượng <strong>KN Kiểm sát</strong> ngoài màn hình (hoặc Start Menu / Launchpad).", "✓ The app is installed on this computer. Open the <strong>procuratorial Skills</strong> app icon on the desktop (or Start Menu / Launchpad).");
  add("install.pwaHelpH", "Trình duyệt chưa hiện hộp cài tự động, anh/chị làm 2 bước:", "Your browser has not offered automatic install yet. Two quick steps:");
  add("install.pwaChrome.html", "<strong>Chrome / Edge</strong> (Windows, Mac): mở <a href=\"./\">trang ứng dụng</a>, bấm biểu tượng <strong>Cài đặt</strong> (màn hình có mũi tên ⤓) ở cuối thanh địa chỉ → <strong>Cài đặt</strong>. Không thấy biểu tượng thì bấm menu <strong>⋮</strong> / <strong>…</strong> → <strong>Ứng dụng</strong> → <strong>Cài đặt trang web này dưới dạng ứng dụng</strong>.", "<strong>Chrome / Edge</strong> (Windows, Mac): open the <a href=\"./\">app page</a>, click the <strong>Install</strong> icon (a screen with a ⤓ arrow) at the end of the address bar → <strong>Install</strong>. If you don't see it, open the <strong>⋮</strong> / <strong>…</strong> menu → <strong>Apps</strong> → <strong>Install this site as an app</strong>.");
  add("install.pwaSafari.html", "<strong>Safari trên Mac</strong> (macOS Sonoma trở lên): mở <a href=\"./\">trang ứng dụng</a>, bấm <strong>Tệp</strong> (File) → <strong>Thêm vào Dock</strong> (Add to Dock) → <strong>Thêm</strong>.", "<strong>Safari on Mac</strong> (macOS Sonoma or later): open the <a href=\"./\">app page</a>, choose <strong>File</strong> → <strong>Add to Dock</strong> → <strong>Add</strong>.");
  add("install.pwaFirefox", "Firefox chưa hỗ trợ cài ứng dụng web: hãy mở trang bằng Chrome hoặc Edge, hoặc dùng bộ cài Windows ở Cách 2.", "Firefox cannot install web apps yet: open this page in Chrome or Edge, or use the Windows installer in Option 2.");
  add("install.exeH", "Cách 2: Tải bộ cài Windows (.exe)", "Option 2: Download the Windows installer (.exe)");
  add("install.exeSub", "Cài như phần mềm bình thường, dùng cho Windows 10 / 11 (64-bit).", "Installs like regular software, for Windows 10 / 11 (64-bit).");
  add("install.exeBtn", "⬇ Tải bộ cài Windows (.exe)", "⬇ Download the Windows installer (.exe)");
  add("install.exeWait", "Bộ cài Windows đang được chuẩn bị, anh/chị dùng Cách 1 trong lúc chờ.", "The Windows installer is being prepared; please use Option 1 meanwhile.");
  add("install.exe1.html", "Tải xong, bấm đúp tệp <strong>KyNangKiemSat-Windows-Setup-1.0.0.exe</strong> → <strong>Cài đặt</strong> (không cần quyền quản trị).", "When the download finishes, double-click <strong>KyNangKiemSat-Windows-Setup-1.0.0.exe</strong> → <strong>Install</strong> (no administrator rights needed).");
  add("install.exe2.html", "Mở <strong>Kỹ năng Kiểm sát</strong> từ biểu tượng ngoài Desktop hoặc Start Menu.", "Open <strong>Kỹ năng Kiểm sát</strong> from the Desktop or Start Menu icon.");
  add("install.exeNote.html", "Nếu Windows hiện bảng xanh bảo vệ, bấm <strong>Thông tin thêm</strong> (More info) → <strong>Vẫn chạy</strong> (Run anyway). Gỡ cài đặt: <strong>Cài đặt</strong> → <strong>Ứng dụng</strong> → <strong>Kỹ năng Kiểm sát</strong> → <strong>Gỡ cài đặt</strong>.", "If Windows shows a blue protection screen, click <strong>More info</strong> → <strong>Run anyway</strong>. To uninstall: <strong>Settings</strong> → <strong>Apps</strong> → <strong>Kỹ năng Kiểm sát</strong> → <strong>Uninstall</strong>.");
  add("install.exeIt.html", "Bộ cài NSIS dựng tự động trên GitHub Actions từ mã nguồn <code>desktop-windows/</code>, chạy Microsoft Edge WebView2. SHA-256: <a href=\"https://github.com/hethong-quanly/kynangkiemsat/releases/download/app-v1.0.0/SHA256SUMS-windows.txt\">SHA256SUMS-windows.txt</a> · <a href=\"https://github.com/hethong-quanly/kynangkiemsat/releases/tag/app-v1.0.0\">GitHub Release app-v1.0.0</a>", "NSIS installer built automatically on GitHub Actions from the <code>desktop-windows/</code> source, running on Microsoft Edge WebView2. SHA-256: <a href=\"https://github.com/hethong-quanly/kynangkiemsat/releases/download/app-v1.0.0/SHA256SUMS-windows.txt\">SHA256SUMS-windows.txt</a> · <a href=\"https://github.com/hethong-quanly/kynangkiemsat/releases/tag/app-v1.0.0\">GitHub Release app-v1.0.0</a>");
  add("install.pcSheet.html", "Máy tính (Windows / Mac): bấm biểu tượng <strong>Cài đặt</strong> ở cuối thanh địa chỉ Chrome / Edge, hoặc <a href=\"cai-dat.html#c-desktop\"><strong>tải bộ cài Windows</strong></a>.", "Computer (Windows / Mac): click the <strong>Install</strong> icon at the end of the Chrome / Edge address bar, or <a href=\"cai-dat.html#c-desktop\"><strong>download the Windows installer</strong></a>.");
  add("install.share", "Gửi cho đồng nghiệp", "Share with colleagues");
  add("install.qrAlt", "Mã QR tới trang cài đặt", "QR code to the install page");
  add("install.shortHint", "Đường link ngắn (gửi qua Zalo):", "Short link (send via Zalo):");
  add("install.copy", "Sao chép link", "Copy the link");
  add("install.copied", "Đã sao chép ✓", "Copied ✓");
  add("install.orQr", "Hoặc quét mã QR bằng camera điện thoại.", "Or scan the QR code with your phone camera.");
  add("install.shareBtn", "Chia sẻ (Zalo, tin nhắn…)", "Share (Zalo, messages…)");
  add("install.shareTitle", "Kỹ năng Kiểm sát", "procuratorial Skills");
  add("install.shareText", "Cài ứng dụng Kỹ năng Kiểm sát:", "Install the procuratorial Skills app:");
  add("install.notes", "Lưu ý", "Notes");
  add("install.n1.html", "Ứng dụng mở bộ công cụ tại <code>hethong-quanly.github.io/kynangkiemsat</code> và <strong>tự cập nhật nội dung</strong>, không cần tải lại APK hay bộ cài khi có công cụ mới.", "The app opens the toolkit at <code>hethong-quanly.github.io/kynangkiemsat</code> and <strong>updates its content automatically</strong>; you do not need to download the APK or installer again when new tools are added.");
  add("install.n2.html", "Lần đầu mở, ứng dụng hỏi <strong>đơn vị công tác</strong> để điền sẵn tên cơ quan trong mẫu văn bản; thông tin chỉ lưu trên máy. Xem <a href=\"privacy.html\">Chính sách dữ liệu</a>.", "On first launch, the app asks for your <strong>work unit</strong> so it can pre-fill the agency name in document templates; the information is stored only on the device. See the <a href=\"privacy.html\">Privacy policy</a>.");
  add("install.n3", "Chỉ tải APK / bộ cài Windows từ nút trên trang này hoặc trang GitHub Release ở trên.", "Only download the APK / Windows installer from the button on this page or from the GitHub Release page above.");

  /* Chính sách dữ liệu */
  add("privacy.ctrl", "Bên kiểm soát dữ liệu", "Data controller");
  add("privacy.ctrl.html", "<strong>Thiên Phúc</strong> © 2026 — bên kiểm soát dữ liệu của ứng dụng. Liên hệ: <a href=\"tel:0939103666\">0939103666</a>.", "<strong>Thiên Phúc</strong> © 2026 — data controller of this application. Contact: <a href=\"tel:0939103666\">0939103666</a>.");
  add("privacy.s1", "1. Dữ liệu được lưu trên chính máy của bạn", "1. Data stored on your own device");
  add("privacy.s1a.html", "Phần mềm là trang web tĩnh (GitHub Pages), không yêu cầu đăng nhập. <strong>Không có máy chủ riêng thu thập dữ liệu</strong>, trừ nội dung bạn tự đăng ở <a href=\"#hoi-dap\">Phòng hỏi đáp nghiệp vụ</a> (mục 3).", "The software is a static website (GitHub Pages) and no sign-in is required. There is <strong>no separate server that collects data</strong>, except content you yourself post in the <a href=\"#hoi-dap\">Professional Q&A room</a> (section 3).");
  add("privacy.s1b.html", "Văn bản bạn dán hoặc tải lên để kiểm sát, trích xuất, soạn quyết định được <strong>xử lý ngay trong trình duyệt</strong> và không gửi đi đâu ở chế độ mặc định (dò từ khoá).", "Documents you paste or upload for supervision, extraction or decision drafting are <strong>processed in the browser</strong> and are not sent anywhere in the default mode (keyword checks).");
  add("privacy.s1c.html", "Một số thông tin được lưu trong bộ nhớ trình duyệt (localStorage) để tiện dùng lại: sổ việc, tên Kiểm sát viên/người ký, giao diện sáng/tối, cài đặt AI (nếu bạn tự nhập). Bạn xoá bằng cách xoá dữ liệu trang web trong cài đặt trình duyệt.", "Some information is stored in the browser (localStorage) for convenience: the work register, the procurator/signatory name, light/dark theme, and AI settings (if you enter them). You can delete this by clearing the site’s data in your browser settings.");
  add("privacy.s1d.html", "<strong>Đơn vị công tác</strong> (cấp Viện kiểm sát, tỉnh/thành, Viện khu vực) và họ tên, chức danh nếu bạn tự nhập ở màn hình chào: <strong>chỉ lưu trên máy này</strong> (localStorage <code>knks-don-vi</code>) để điền sẵn tên cơ quan trong mẫu văn bản; không gửi đi đâu, không gửi cho AI trừ khi nằm trong văn bản bạn tự gửi. Sửa hoặc xoá bằng nút «Đơn vị công tác» ở trang chủ.", "Your <strong>work unit</strong> (Procuracy level, province/city, regional Procuracy) and the name and title you optionally enter on the welcome screen are <strong>stored only on this device</strong> (localStorage <code>knks-don-vi</code>) so the agency name can be pre-filled in templates; they are not sent anywhere, and are not sent to AI unless they appear in text you yourself submit. Edit or delete them with the “Work unit” button on the home page.");
  add("privacy.s1e", "Khi cài thành ứng dụng (PWA), các trang được lưu tạm (cache) trên máy để mở nhanh hơn.", "When installed as an app (PWA), pages are cached on the device so they open faster.");
  add("privacy.s1f.html", "Ứng dụng Android (tải APK tại trang <a href=\"cai-dat.html\">Cài ứng dụng</a>) chỉ mở trang web này toàn màn hình; không xin quyền danh bạ, vị trí, máy ảnh hay bộ nhớ, không có quảng cáo, không thu thập dữ liệu.", "The Android app (APK from the <a href=\"cai-dat.html\">Install</a> page) only opens this website full screen; it does not request contacts, location, camera or storage permissions, has no ads, and collects no data.");
  add("privacy.s1g", "Các công cụ ẩn danh văn bản, đổi tên file, chuyển Word/PDF/ảnh sang Markdown (kể cả nhận dạng chữ OCR) chạy hoàn toàn trên máy của bạn; tệp không được gửi lên mạng.", "The anonymizer, file renamer and Word/PDF/image-to-Markdown tools (including OCR) run entirely on your device; files are not uploaded.");
  add("privacy.s2", "2. AI là tuỳ chọn — dữ liệu sẽ được gửi ra nước ngoài", "2. AI is optional — data will be sent abroad");
  add("privacy.s2a.html", "Mục «Trợ lý ảo kiểm sát văn bản» có thể dùng thêm AI <strong>chỉ khi bạn tự bật</strong>, tự nhập API key của mình và tích ô xác nhận đã ẩn danh.", "The “Document Supervision Virtual Assistant” can use AI <strong>only when you turn it on yourself</strong>, enter your own API key and tick the box confirming that the text has been anonymized.");
  add("privacy.s2b.html", "Khi bật AI, nội dung văn bản và câu hỏi được gửi tới máy chủ của nhà cung cấp AI đặt <strong>ở nước ngoài</strong> (Groq — Hoa Kỳ; Google Gemini). Tác giả ứng dụng không kiểm soát việc lưu trữ của các nhà cung cấp này.", "When AI is on, the document text and your questions are sent to the AI provider’s servers <strong>abroad</strong> (Groq — United States; Google Gemini). The app author does not control how those providers store data.");
  add("privacy.s2c.html", "<strong>Lượt AI miễn phí dùng chung</strong> (không cần key): yêu cầu đi qua máy chủ trung gian <strong>Cloudflare Worker</strong> do tác giả ứng dụng quản lý, rồi được chuyển tới <strong>Groq (Hoa Kỳ)</strong>. Máy chủ trung gian <strong>không lưu và không ghi log nội dung</strong> văn bản, câu hỏi, câu trả lời; chỉ đếm số lượt theo địa chỉ IP (8 lượt/phút, 40 lượt/ngày) để chống lạm dụng. Mã nguồn công khai tại thư mục <code>ai-proxy/</code> của repo.", "<strong>Shared free AI turns</strong> (no key needed): requests go through a <strong>Cloudflare Worker</strong> intermediary managed by the app author, then on to <strong>Groq (United States)</strong>. The intermediary <strong>does not store or log the content</strong> of documents, questions or answers; it only counts requests by IP address (8 per minute, 40 per day) to prevent abuse. The source code is public in the repo’s <code>ai-proxy/</code> folder.");
  add("privacy.s2d", "Nếu bạn nhập key riêng, trình duyệt gọi thẳng nhà cung cấp bằng key của bạn (khi không gọi được thì mới chuyển qua máy chủ trung gian, kèm key, không lưu key).", "If you enter your own key, the browser calls the provider directly with your key (only if that fails does it go through the intermediary, with the key, which is not stored).");
  add("privacy.s2e.html", "<strong>Google Gemini bản miễn phí</strong>: Google dùng dữ liệu gửi lên (văn bản, câu hỏi, câu trả lời) để huấn luyện và cải thiện sản phẩm; nhân viên Google có thể đọc. Groq công bố không dùng dữ liệu để huấn luyện.", "<strong>Google Gemini’s free tier</strong>: Google uses submitted data (documents, questions, answers) to train and improve its products; Google staff may read it. Groq states that it does not use data for training.");
  add("privacy.s2f", "API key của bạn chỉ lưu trong trình duyệt của bạn, không được đưa lên GitHub. Không dùng chung máy khi đã lưu key.", "Your API key is stored only in your browser and is not uploaded to GitHub. Do not share a device after a key has been saved.");
  add("privacy.s2g.html", "<strong>Báo cáo câu trả lời AI</strong>: dưới mỗi câu trả lời AI có nút «Báo cáo câu trả lời». Bạn chọn lý do, ghi chú rồi tự gửi qua Zalo, SMS hoặc gọi tới số 0939103666. Ứng dụng không tự gửi gì và không có máy chủ thu báo cáo; nội dung báo cáo chỉ gồm lý do, ghi chú, lĩnh vực, thời điểm và đoạn trích (tối đa 600 ký tự) câu trả lời AI — không kèm văn bản bạn đã dán. Khi gửi qua Zalo/SMS, nội dung chịu chính sách của Zalo/nhà mạng.", "<strong>Reporting an AI answer</strong>: under each AI answer there is a “Report this answer” button. You choose a reason, add a note, then send it yourself via Zalo, SMS or a call to 0939103666. The app does not send anything automatically and has no server that collects reports; a report contains only the reason, note, field, time and an excerpt (up to 600 characters) of the AI answer — not the document you pasted. Messages sent via Zalo/SMS are subject to Zalo’s or the carrier’s policies.");
  add("privacy.s2h.html", "Các mục «Kiểm sát Bản án hình sự, dân sự» (chatbot udify.app) và «Hình sự & Tố tụng hình sự» (Google NotebookLM) là <strong>dịch vụ bên ngoài</strong>: mọi nội dung bạn nhập ở đó được gửi lên máy chủ của bên thứ ba.", "The “Supervision of criminal and civil judgments” item (udify.app chatbot) and “Criminal law & criminal procedure” (Google NotebookLM) are <strong>external services</strong>: anything you enter there is sent to a third-party server.");
  add("privacy.s3", "4. Khuyến nghị bắt buộc trước khi gửi văn bản cho AI hoặc dịch vụ ngoài", "4. Mandatory recommendations before sending a document to AI or an external service");
  add("privacy.s3a.html", "<strong>Ẩn danh</strong> văn bản: che họ tên, ngày sinh, số CCCD/hộ chiếu, địa chỉ, số điện thoại, số tài khoản… (dùng công cụ «Tự động che thông tin», chạy trên máy).", "<strong>Anonymize</strong> the document: mask full names, dates of birth, ID/passport numbers, addresses, phone numbers, account numbers, and so on (use the “Anonymizer” tool, which runs on the device).");
  add("privacy.s3b.html", "<strong>Không</strong> gửi tài liệu thuộc bí mật nhà nước, tài liệu mật, hồ sơ vụ án chưa công khai.", "<strong>Do not</strong> send state-secret documents, classified documents, or case files that have not been made public.");
  add("privacy.s3c", "Kết quả AI chỉ để tham khảo, có thể sai hoặc bịa điều luật. Kiểm sát viên phải đối chiếu văn bản gốc và chịu trách nhiệm về ý kiến, kiến nghị, kháng nghị.", "AI results are for reference only and may be wrong or may invent legal provisions. The procurator must check the original instruments and remains responsible for opinions, recommendations and protests.");
  add("privacy.s4", "5. Liên hệ", "5. Contact");
  add("privacy.s4p.html", "Thiên Phúc © 2026 · Liên hệ: <a href=\"tel:0939103666\">0939103666</a>. Mã nguồn: <a href=\"https://github.com/hethong-quanly/kynangkiemsat\" target=\"_blank\" rel=\"noopener\">github.com/hethong-quanly/kynangkiemsat</a>.", "Thiên Phúc © 2026 · Contact: <a href=\"tel:0939103666\">0939103666</a>. Source code: <a href=\"https://github.com/hethong-quanly/kynangkiemsat\" target=\"_blank\" rel=\"noopener\">github.com/hethong-quanly/kynangkiemsat</a>.");
  add("privacy.foot", "Cập nhật ngày 24/11/2026 (bổ sung Phòng hỏi đáp nghiệp vụ).", "Updated 24/11/2026 (Professional Q&A room added).");


  add("privacy.hd.title", "3. Phòng hỏi đáp nghiệp vụ (nội dung công khai)", "3. Professional Q&A room (public content)");
  add("privacy.hd.a.html", "Khi bạn đăng ở mục «Hỏi đáp nghiệp vụ», các dữ liệu sau được <strong>lưu trên máy chủ</strong> (cơ sở dữ liệu Supabase, đặt tại Singapore) để <strong>hiển thị công khai cho cộng đồng người dùng ứng dụng</strong>: lĩnh vực, tiêu đề và nội dung câu hỏi; nội dung câu trả lời; <strong>tên hiển thị và đơn vị do bạn tự nguyện nhập</strong> (có thể chọn «Gửi ẩn danh»); thời điểm đăng; số lượt «Hữu ích».", "When you post in “Professional Q&A”, the following data is <strong>stored on a server</strong> (a Supabase database in Singapore) and <strong>shown publicly to the app’s user community</strong>: the field, question title and body; answer text; the <strong>display name and unit you optionally enter</strong> (you may choose “Post anonymously”); the time of posting; and the number of “Helpful” votes.");
  add("privacy.hd.b.html", "<strong>Báo cáo vi phạm</strong>: lý do bạn chọn, ghi chú (nếu có), bài bị báo cáo và thời điểm được lưu trên máy chủ để kiểm duyệt; báo cáo không hiển thị công khai. Bài có từ 3 báo cáo từ các máy khác nhau sẽ tự động ẩn.", "<strong>Reporting a violation</strong>: the reason you choose, any note, the reported post and the time are stored on the server for moderation; reports are not shown publicly. A post with reports from 3 different devices is hidden automatically.");
  add("privacy.hd.c.html", "Để chống gửi trùng (một máy chỉ báo cáo và bấm «Hữu ích» một lần cho mỗi bài), máy chủ lưu <strong>mã băm một chiều</strong> của địa chỉ IP kèm lượt báo cáo/bình chọn; không lưu IP gốc, không gắn với tên hay thiết bị của bạn.", "To prevent duplicate submissions (one device may report or mark “Helpful” only once per post), the server stores a <strong>one-way hash</strong> of the IP address with the report/vote; the raw IP is not stored and is not linked to your name or device.");
  add("privacy.hd.d.html", "Không cần tài khoản, không thu thập email, số điện thoại hay danh bạ. Danh sách bài bạn đã ẩn, đã bấm hữu ích và tên hiển thị gần nhất chỉ lưu trên máy bạn (localStorage).", "No account is required, and no email, phone number or contacts are collected. The list of posts you have hidden or marked helpful, and your last display name, are stored only on your device (localStorage).");
  add("privacy.hd.e.html", "<strong>Không đăng</strong> họ tên thật đương sự, số hồ sơ/bản án mật, tài liệu mật hoặc thông tin cá nhân chưa ẩn danh. Nội dung trao đổi chỉ mang tính tham khảo.", "<strong>Do not post</strong> real names of parties, classified case/judgment numbers, classified documents or personal data that has not been anonymized. Discussion is for reference only.");
  add("privacy.hd.f.html", "<strong>Gỡ bài</strong>: bấm «Báo cáo vi phạm» trên bài, hoặc gọi/nhắn <a href=\"tel:0939103666\">0939103666</a> kèm tiêu đề bài để được gỡ (kể cả bài do chính bạn đăng). Bạn cũng có thể bấm «Ẩn bài này» để không thấy bài trên máy mình.", "<strong>Removing a post</strong>: tap “Report a violation” on the post, or call/message <a href=\"tel:0939103666\">0939103666</a> with the post title to have it taken down (including a post you wrote yourself). You can also tap “Hide this post” so you no longer see it on your device.");
  add("badge.community", "CỘNG ĐỒNG", "COMMUNITY");
  add("tool.hoi-dap-nghiep-vu.title", "Hỏi đáp nghiệp vụ", "Professional Q&A");
  add("tool.hoi-dap-nghiep-vu.desc", "Phòng trao đổi nghiệp vụ: đặt câu hỏi, chia sẻ kinh nghiệm và trả lời đồng nghiệp trong ngành theo từng lĩnh vực hình sự, dân sự, hành chính, thi hành án, khiếu nại tố cáo.", "A professional discussion room: ask questions, share experience and answer colleagues in the sector, by field — criminal, civil, administrative, judgment enforcement and execution, and complaints & denunciations.");
  add("hdqa.title", "Hỏi đáp nghiệp vụ — Kỹ năng Kiểm sát", "Professional Q&A — procuratorial Skills");

  add("ai.langRule", "LANGUAGE: Answer in clear, professional English. Keep the original Vietnamese titles of legal instruments (Luật, Bộ luật, Nghị định, Thông tư, Nghị quyết, Quyết định, Điều, khoản) and cite article and clause numbers accurately. Do not invent citations. Address the user as “you”. Be concise.", "LANGUAGE: Answer in clear, professional English. Keep the original Vietnamese titles of legal instruments (Luật, Bộ luật, Nghị định, Thông tư, Nghị quyết, Quyết định, Điều, khoản) and cite article and clause numbers accurately. Do not invent citations. Address the user as “you”. Be concise.");

  function dict() { return isEn() ? EN : VI; }

  function t(key, vars) {
    var d = dict();
    var s = d[key];
    if (s == null) s = (isEn() ? VI[key] : EN[key]);
    if (s == null) s = key;
    if (vars) {
      Object.keys(vars).forEach(function (k) {
        s = s.split("{" + k + "}").join(vars[k] == null ? "" : String(vars[k]));
      });
    }
    return s;
  }

  function applyAttr(el, attr, key) {
    if (!key) return;
    var flag = "data-i18n-orig-" + attr;
    if (!el.hasAttribute(flag)) el.setAttribute(flag, el.getAttribute(attr) || "");
    var val = isEn() ? (EN[key] != null ? EN[key] : el.getAttribute(flag)) : el.getAttribute(flag);
    if (val != null) el.setAttribute(attr, val);
  }

  function applyEl(el) {
    var key = el.getAttribute("data-i18n");
    var htmlKey = el.getAttribute("data-i18n-html");
    if (htmlKey) {
      if (!el.hasAttribute("data-i18n-orig-html")) el.setAttribute("data-i18n-orig-html", el.innerHTML);
      el.innerHTML = isEn() ? (EN[htmlKey] != null ? EN[htmlKey] : el.getAttribute("data-i18n-orig-html")) : el.getAttribute("data-i18n-orig-html");
    } else if (key) {
      if (!el.hasAttribute("data-i18n-orig")) el.setAttribute("data-i18n-orig", el.textContent);
      var val = isEn() ? (EN[key] != null ? EN[key] : el.getAttribute("data-i18n-orig")) : el.getAttribute("data-i18n-orig");
      if (val != null) {
        /* Giữ icon <i>/<svg> đầu phần tử */
        var keep = [];
        while (el.firstChild && el.firstChild.nodeType === 1 && /^(I|SVG|IMG|BR)$/i.test(el.firstChild.tagName)) {
          keep.push(el.removeChild(el.firstChild));
        }
        el.textContent = val;
        for (var i = keep.length - 1; i >= 0; i--) {
          if (keep[i].tagName !== "BR" && el.firstChild && el.firstChild.nodeType === 3) {
            el.insertBefore(document.createTextNode(" "), el.firstChild);
          }
          el.insertBefore(keep[i], el.firstChild);
        }
      }
    }
    var ph = el.getAttribute("data-i18n-placeholder");
    if (ph) applyAttr(el, "placeholder", ph);
    var ti = el.getAttribute("data-i18n-title");
    if (ti) applyAttr(el, "title", ti);
    var ar = el.getAttribute("data-i18n-aria");
    if (ar) applyAttr(el, "aria-label", ar);
    var al = el.getAttribute("data-i18n-alt");
    if (al) applyAttr(el, "alt", al);
  }

  function decorativeChild(el) {
    return /^(I|SVG|IMG|BR|PATH|USE)$/i.test(el.tagName);
  }

  function isSimpleChrome(el) {
    if (!el || el.nodeType !== 1) return false;
    if (el.hasAttribute("data-i18n") || el.hasAttribute("data-i18n-html") || el.hasAttribute("data-no-i18n") || el.hasAttribute("data-i") || el.closest("[data-i]")) return false;
    if (el.closest("script,style,pre,code,textarea,option,[data-no-i18n],.preview,.law,.dieu,table")) return false;
    /* Bảng án phí / điều luật giữ nguyên tiếng Việt */
    var kids = el.children;
    for (var i = 0; i < kids.length; i++) {
      if (!decorativeChild(kids[i])) return false;
    }
    return true;
  }

  function setChromeText(el, text) {
    var keep = [];
    while (el.firstChild && el.firstChild.nodeType === 1 && decorativeChild(el.firstChild)) {
      keep.push(el.removeChild(el.firstChild));
    }
    while (el.firstChild) el.removeChild(el.firstChild);
    for (var i = 0; i < keep.length; i++) el.appendChild(keep[i]);
    if (keep.length) el.appendChild(document.createTextNode(" "));
    el.appendChild(document.createTextNode(text));
  }

  function applyPhrases(root) {
    var box = root || document;
    if (!box.querySelectorAll) return;
    var list = box.querySelectorAll("h1,h2,h3,h4,legend,label,button,th,summary,a,.tab,.tab-btn,.kicker,.card-title,.header-title,.header-sub,.hdr p,header p,.muted,.btn,.chip,.kind-chip,p.kicker");
    var cur = stored();
    for (var i = 0; i < list.length; i++) {
      var el = list[i];
      if (!isSimpleChrome(el)) continue;
      if (!el.hasAttribute("data-i18n-phrase-orig")) el.setAttribute("data-i18n-phrase-orig", norm(el.textContent));
      var orig = el.getAttribute("data-i18n-phrase-orig");
      var en = ABBR_PHRASE[orig] != null ? ABBR_PHRASE[orig] : PHRASE[orig];
      if (!en) continue;
      if (el.getAttribute("data-i18n-phrase-lang") === cur) continue;
      setChromeText(el, cur === "en" ? abbrEn(en) : orig);
      el.setAttribute("data-i18n-phrase-lang", cur);
    }
    /* placeholder / title thuần Việt đã biết */
    var inputs = box.querySelectorAll("input[placeholder], textarea[placeholder]");
    for (var j = 0; j < inputs.length; j++) {
      var inp = inputs[j];
      if (inp.hasAttribute("data-i18n-placeholder")) continue;
      if (!inp.hasAttribute("data-ph-orig")) inp.setAttribute("data-ph-orig", inp.getAttribute("placeholder") || "");
      var po = inp.getAttribute("data-ph-orig");
      inp.setAttribute("placeholder", cur === "en" && PHRASE[norm(po)] ? abbrEn(PHRASE[norm(po)]) : po);
    }
  }

  function titleKey() {
    var path = (location.pathname || "").replace(/\/+$/, "");
    var keys = Object.keys(PAGE_TITLE).filter(function (k) { return k && k !== "index.html"; })
      .sort(function (a, b) { return b.length - a.length; });
    for (var i = 0; i < keys.length; i++) {
      if (path.endsWith("/" + keys[i]) || path === keys[i] || path.endsWith(keys[i])) return PAGE_TITLE[keys[i]];
    }
    /* Chỉ trang chủ mới dùng khóa index.html (không áp cho AnDanh hay Tool). */
    if (/\/(index\.html)?$/.test(path) && !/\/(AnDanh|Tool|Data)\//.test(path)) return PAGE_TITLE["index.html"] || PAGE_TITLE[""];
    return null;
  }
  function applyTitle() {
    var key = titleKey();
    if (key) document.title = t(key);
    var md = document.querySelector('meta[name="description"]');
    var pathNow = (location.pathname || "").replace(/\/+$/, "");
    var isHome = !/\/(AnDanh|Tool|Data)\//.test(pathNow) && /\/(index\.html)?$/.test(pathNow);
    if (md && isHome) {
      if (!md.hasAttribute("data-i18n-orig-content")) md.setAttribute("data-i18n-orig-content", md.getAttribute("content") || "");
      md.setAttribute("content", isEn()
        ? "Procuracy professional toolkit: time-limit calculators, legal database, document templates, anonymizer, OCR."
        : md.getAttribute("data-i18n-orig-content"));
    }
  }

  function lawNote() {
    var old = document.getElementById("knks-law-note");
    if (old) old.remove();
  }

  function apply(root) {
    if (applying) return;
    applying = true;
    try {
      var box = root || document;
      if (!box.querySelectorAll) return;
      var nodes = box.querySelectorAll("[data-i18n], [data-i18n-html], [data-i18n-placeholder], [data-i18n-title], [data-i18n-aria], [data-i18n-alt]");
      for (var i = 0; i < nodes.length; i++) applyEl(nodes[i]);
      if (box.hasAttribute && (box.hasAttribute("data-i18n") || box.hasAttribute("data-i18n-html"))) applyEl(box);
      applyPhrases(box);
      translateTree(box === document ? (document.body || box) : box);
      if (!root || root === document || root === document.body) {
        applyTitle();
        lawNote();
        if (isEn() && document.title && (VN_RE.test(document.title) || hasAbbr(document.title) || document._knksTitleOrig)) {
          if (!document._knksTitleOrig) document._knksTitleOrig = document.title;
          document.title = translate(document._knksTitleOrig);
        } else if (!isEn() && document._knksTitleOrig) {
          var key = titleKey();
          document.title = key ? t(key) : document._knksTitleOrig;
        }
        syncSwitcher();
      }
    } finally {
      applying = false;
    }
  }

  function css() {
    if (document.getElementById("knks-i18n-css")) return;
    var s = document.createElement("style");
    s.id = "knks-i18n-css";
    s.textContent =
      ".lang-switch{display:inline-flex;align-items:center;height:44px;padding:3px;gap:0;border:1px solid var(--slate-200,#e2e8f0);border-radius:12px;background:#fff;font:inherit;font-weight:800;font-size:12px;letter-spacing:.04em;line-height:1}" +
      ".lang-switch button{border:0;background:transparent;min-width:34px;height:36px;border-radius:9px;font:inherit;font-weight:800;cursor:pointer;color:var(--slate-700,#334155);padding:0 8px}" +
      ".lang-switch button[aria-pressed=true]{background:var(--sky-dark,#1e5a8a);color:#fff}" +
      ".lang-switch .lang-sep{opacity:.35;padding:0 1px;user-select:none}" +
      ".lang-switch.compact{height:28px;border-radius:6px;background:rgba(255,255,255,.1);border-color:rgba(255,255,255,.12);padding:2px}" +
      ".lang-switch.compact button{min-width:26px;height:24px;border-radius:5px;padding:0 6px;font-size:11px;color:rgba(255,255,255,.8)}" +
      ".lang-switch.compact button[aria-pressed=true]{background:rgba(255,255,255,.2);color:#fff}" +
      ".theme-fab{display:flex;gap:8px;align-items:center;flex-wrap:wrap}" +
      "#landing-page .lang-switch:not(.compact){background:rgba(6,21,48,.72);border-color:rgba(232,198,117,.38)}" +
      "#landing-page .lang-switch:not(.compact) button{color:#e8c675}" +
      "#landing-page .lang-switch:not(.compact) button[aria-pressed=true]{background:#1e5a8a;color:#fff}" +
      "html[data-theme=dark] .lang-switch:not(.compact){background:#15202b;border-color:#2c3d4e}" +
      "html[data-theme=dark] .lang-switch:not(.compact) button{color:#94a3b8}" +
      "html[data-theme=dark] .lang-switch:not(.compact) button[aria-pressed=true]{background:#1e5a8a;color:#fff}" +
      ".lang-switch.floating{position:fixed;top:max(10px,env(safe-area-inset-top));right:max(10px,env(safe-area-inset-right));z-index:9990;box-shadow:0 4px 16px rgba(0,0,0,.12)}" +
      ".hdr .lang-switch,.header .lang-switch,header.header .lang-switch{margin-left:auto;background:rgba(255,255,255,.14);border-color:rgba(255,255,255,.28)}" +
      ".hdr .lang-switch button,header.header .lang-switch button,.header .lang-switch button{color:#fff}" +
      ".hdr .lang-switch button[aria-pressed=true],header.header .lang-switch button[aria-pressed=true]{background:rgba(255,255,255,.22)}" +
      ".hdr,.header.header{position:relative}" +
      ".knks-law-note{margin:10px 16px 0;padding:8px 12px;border-radius:10px;background:#fff8e1;border:1px solid #ffe082;color:#6d4c00;font:12px/1.5 'Be Vietnam Pro',Arial,sans-serif}" +
      "html[data-theme=dark] .knks-law-note{background:#2a2410;border-color:#5c4b14;color:#fde68a}" +
      "#dv-modal .dv-lang{display:flex;gap:8px;margin:0 0 14px}" +
      "#dv-modal .dv-lang button{flex:1;min-height:44px;border-radius:12px;border:1px solid #cbd5e1;background:transparent;font:inherit;font-weight:800;cursor:pointer;color:inherit}" +
      "#dv-modal .dv-lang button[aria-pressed=true]{background:#1e5a8a;border-color:#1e5a8a;color:#fff}";
    document.head.appendChild(s);
  }

  function switcherHtml(compact) {
    var cur = stored();
    return '<div class="lang-switch' + (compact ? " compact" : "") + '" role="group" aria-label="' + t("lang.group") + '">' +
      '<button type="button" data-knks-lang="vi" aria-pressed="' + (cur === "vi" ? "true" : "false") + '" title="Tiếng Việt">VI</button>' +
      '<span class="lang-sep" aria-hidden="true">|</span>' +
      '<button type="button" data-knks-lang="en" aria-pressed="' + (cur === "en" ? "true" : "false") + '" title="English">EN</button>' +
      "</div>";
  }

  function syncSwitcher() {
    var cur = stored(), all = document.querySelectorAll(".lang-switch, .dv-lang");
    for (var i = 0; i < all.length; i++) {
      all[i].setAttribute("aria-label", t("lang.group"));
      var btns = all[i].querySelectorAll("[data-knks-lang]");
      for (var j = 0; j < btns.length; j++) {
        btns[j].setAttribute("aria-pressed", btns[j].getAttribute("data-knks-lang") === cur ? "true" : "false");
      }
    }
  }

  function placeSwitcher(el, compact) {
    var wrap = document.createElement("div");
    wrap.innerHTML = switcherHtml(compact);
    var node = wrap.firstElementChild;
    el.parentNode.insertBefore(node, el.nextSibling);
    return node;
  }

  function mountSwitcher() {
    css();
    if (!document.body) return;
    var existing = document.querySelectorAll(".lang-switch");
    if (existing.length) { syncSwitcher(); return; }
    var themes = document.querySelectorAll(".theme-switch");
    if (themes.length) {
      for (var i = 0; i < themes.length; i++) {
        placeSwitcher(themes[i], themes[i].classList.contains("compact"));
      }
      syncSwitcher();
      return;
    }
    var hdr = document.querySelector("header.hdr, .hdr, header.header, .header");
    if (hdr) {
      var wrap = document.createElement("div");
      wrap.innerHTML = switcherHtml(false);
      var node = wrap.firstElementChild;
      /* Đưa vào hàng tiêu đề nếu header là flex */
      hdr.appendChild(node);
      var cs = global.getComputedStyle ? getComputedStyle(hdr) : null;
      if (cs && cs.display.indexOf("flex") === -1) {
        node.classList.add("floating");
      }
      syncSwitcher();
      return;
    }
    var wrap2 = document.createElement("div");
    wrap2.innerHTML = switcherHtml(false);
    var node2 = wrap2.firstElementChild;
    node2.classList.add("floating");
    document.body.appendChild(node2);
    syncSwitcher();
  }

  function set(next, opts) {
    if (next !== "en" && next !== "vi") return;
    var cur = stored();
    try { localStorage.setItem(KEY, next); } catch (e) {}
    document.documentElement.lang = next;
    document.documentElement.setAttribute("data-lang", next);
    apply(document);
    syncSwitcher();
    try {
      global.dispatchEvent(new CustomEvent("knks-lang", { detail: next }));
      global.dispatchEvent(new CustomEvent("knks-i18n", { detail: next }));
      if (global.parent && global.parent !== global) global.parent.postMessage({ knksLang: next }, "*");
      var frames = document.querySelectorAll("iframe");
      for (var i = 0; i < frames.length; i++) {
        try { frames[i].contentWindow.postMessage({ knksLang: next }, "*"); } catch (e2) {}
      }
    } catch (e3) {}
    if (cur !== next) {
      for (var j = 0; j < listeners.length; j++) {
        try { listeners[j](next); } catch (e4) {}
      }
    }
  }

  function onChange(fn) { if (typeof fn === "function") listeners.push(fn); }

  /* Áp lang sớm để tránh nháy sai ngôn ngữ */
  try {
    document.documentElement.lang = stored();
    document.documentElement.setAttribute("data-lang", stored());
  } catch (e) {}

  function watchMutations() {
    if (!document.body || document.documentElement.hasAttribute("data-i18n-watch")) return;
    document.documentElement.setAttribute("data-i18n-watch", "1");
    var tmr = null;
    try {
      new MutationObserver(function (ms) {
        if (applying) return;
        var need = false;
        for (var i = 0; i < ms.length; i++) {
          var rec = ms[i];
          if (rec.addedNodes && rec.addedNodes.length) { need = true; break; }
          if (rec.type === "characterData" && rec.target && rec.target.nodeType === 3) {
            var val = rec.target.nodeValue || "";
            if (VN_RE.test(val) && val !== rec.target._knksTranslated) {
              rec.target._knksOrig = val;
              need = true;
              break;
            }
          }
        }
        if (!need) return;
        clearTimeout(tmr);
        tmr = setTimeout(function () { apply(document.body); }, 40);
      }).observe(document.body, { childList: true, subtree: true, characterData: true });
    } catch (e) {}
  }
  function boot() {
    css();
    wrapDialogs();
  addPhrases({
    "Quyết định phân công Kiểm sát viên": "Decision on assignment of the Prosecutor",
    "Quyết định phân công KSV": "Decision on assignment of the Prosecutor",
    "Quyết định phân công": "Assignment decision",
    "Viện kiểm sát nhân dân thành phố Cần Thơ": "People's Procuracy of Can Tho City",
    "Viện kiểm sát nhân dân thành phố": "Municipal People's Procuracy",
    "Soạn Quyết định phân công KSV": "Draft a prosecutor assignment decision",
    "Thời hạn tạm giam": "Temporary detention time limit",
    "Thời hạn tạm giữ": "Custody time limit",
    "Kỹ năng ứng dụng trong nghiệp vụ Kiểm sát": "Applied skills in procuratorial work"
  });

    if (global.__KNKS_PHRASE_QUEUE) {
      var q0 = global.__KNKS_PHRASE_QUEUE;
      global.__KNKS_PHRASE_QUEUE = [];
      for (var qi = 0; qi < q0.length; qi++) {
        if (q0[qi].phrases) addPhrases(q0[qi].phrases);
        else if (q0[qi].words) addWords(q0[qi].words);
        else if (q0[qi].abbrPhrases) addAbbrPhrases(q0[qi].abbrPhrases);
        else addPhrases(q0[qi]);
      }
    }
    rebuildPhraseIndex();
    apply(document);
    mountSwitcher();
    watchMutations();
    loadPacks().then(function () {
      apply(document);
      mountSwitcher();
    });
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot);
  else boot();

  document.addEventListener("click", function (e) {
    var t = e.target;
    if (!t || !t.closest) return;
    var b = t.closest("[data-knks-lang]");
    if (!b) return;
    e.preventDefault();
    set(b.getAttribute("data-knks-lang"));
  });

  global.addEventListener("storage", function (e) {
    if (e.key === KEY) set(stored());
  });
  global.addEventListener("message", function (e) {
    var d = e && e.data;
    if (d && (d.knksLang === "vi" || d.knksLang === "en")) {
      if (d.knksLang !== stored()) set(d.knksLang);
    }
  });

  global.KNKS_I18N = {
    KEY: KEY, t: t, lang: lang, isEn: isEn, set: set, apply: apply,
    onChange: onChange, PHRASE: PHRASE, VI: VI, EN: EN,
    addPhrases: addPhrases, addWords: addWords, translate: translate,
    loadPacks: loadPacks, placeName: function (n) { return PLACE_EN[n] || n; },
    WORDS: WORDS, abbrEn: abbrEn, ABBR_EN: ABBR_EN, ABBR_KEYS: ABBR_KEYS, addAbbrPhrases: addAbbrPhrases,
    /* kiểm tra bản dịch (scripts): chuỗi có dịch được theo cụm không, hay rơi xuống dịch từng từ */
    isPhraseCovered: function (s) { var n = norm(s); return exactPhrase(n) != null || smartTranslate(n, 0) != null; }
  };
})(window);
