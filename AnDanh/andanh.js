/* NHOM IT — VKSND TP Can Tho — nhan dien PII tieng Viet (chay tren may, khong gui tep). */
(function (global) {
  var SURNAMES = [
    "Tôn Thất","Nguyễn","Trương","Hoàng","Huỳnh","Phùng","Giàng","Quách","Nghiêm","Trịnh",
    "Thiều","Đặng","Đinh","Đoàn","Dương","Lương","Vương","Tưởng","Thiếu","Thạch","Thái",
    "Triệu","Trần","Phạm","Phan","Bành","Bạch","Đào","Doãn","Hứa","Kiều","Lưu","Mạc","Ngô",
    "Nhữ","Tăng","Tống","Viên","Châu","Diệp","Giáp","Hồ","Lâm","Lại","Lý","Mai","Ông","Tạ",
    "Tô","Từ","Uông","Vũ","Võ","Bùi","Cao","Chu","Hà","La","Lê","Lữ","Đỗ"
  ];
  var STREET_PREFIX = /(?:đường|phố|phuong|cầu|hẻm|ngõ|ngách|quốc\s+lộ|tỉnh\s+lộ|đại\s+lộ|xa\s+lộ|công\s+viên|chùa|chợ|trường|bệnh\s+viện|bến\s+xe|sân\s+bay|công\s+ty|tập\s+đoàn|ngân\s+hàng|ủy\s+ban|hội\s+đồng|viện|tòa\s+án)\s+$/i;
  var ORG_FOLLOW = /^(?:\s+)(?:nhân\s+dân|thành\s+phố|tỉnh|quận|huyện|thị\s+xã|thị\s+trấn|phường|xã|viện|tòa\s+án|công\s+an|công\s+ty|tnhh|cổ\s+phần|trách\s+nhiệm|kiểm\s+sát|thanh\s+tra|hội\s+đồng)/i;
  var ORG_PHRASES = [
    "viện kiểm sát","tòa án nhân dân","công an nhân dân","ủy ban nhân dân","hội đồng nhân dân",
    "cộng hòa xã hội","chủ tịch nước","thủ tướng","kiểm sát viên","điều tra viên","thẩm phán",
    "hồ chí minh","võ nguyên giáp","trường chinh","nguyễn ái quốc","cộng hòa xã hội chủ nghĩa việt nam"
  ];

  var CAP = "A-ZÀÁẢÃẠĂẲẮẴẶẰÂẦẤẨẪẢĐÈÉẺẼẸÊỀẾỂỄẺÌÍỈĨỊÒÓỎÕỌÔỒỐỔỖỒƠỜỚỞỠỘÙÚỦŨỤƯỪỨỬỮỨỲÝỶỸỴ";
  var LOW = "a-zàáảãạăẳắẵặằâầấẩẫảđèéẻẽẹêềếểễẻìíỉĩịòóỏõọôồốổỗồơờớởỡộùúủũụưừứửữứỳýỷỹỵ";
  var LET = CAP + LOW;

  function escapeRe(s) {
    return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  }
  var SURNAME_ALT = SURNAMES.slice().sort(function (a, b) { return b.length - a.length; }).map(escapeRe).join("|");

  global.CATEGORY_ORDER = ["hoten","cccd","dienthoai","diachi","ngaysinh","taikhoan","email","bienso","masothue","custom"];
  global.CATEGORY_META = {
    hoten: { label: "Họ và tên", short: "Họ tên" },
    dienthoai: { label: "Số điện thoại", short: "SĐT" },
    cccd: { label: "CMND / CCCD", short: "CCCD" },
    diachi: { label: "Địa chỉ", short: "Địa chỉ" },
    ngaysinh: { label: "Ngày sinh", short: "Ngày sinh" },
    taikhoan: { label: "Tài khoản ngân hàng", short: "STK" },
    email: { label: "Thư điện tử", short: "Email" },
    bienso: { label: "Biển số xe", short: "Biển số" },
    masothue: { label: "Mã số thuế", short: "MST" },
    custom: { label: "Chuỗi tùy chỉnh", short: "Tùy chỉnh" }
  };
  global.REDACT_STYLES = [
    { id: "block", label: "Thanh đen", sample: "████████" },
    { id: "stars", label: "Dấu sao", sample: "********" },
    { id: "hidden", label: "Nhãn ẩn", sample: "[ĐÃ ẨN]" },
    { id: "label", label: "Theo loại", sample: "[HỌ TÊN]" }
  ];
  global.SAMPLE =
    "VIỆN KIỂM SÁT NHÂN DÂN THÀNH PHỐ CẦN THƠ\n" +
    "CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM\nĐộc lập - Tự do - Hạnh phúc\n\n" +
    "Số: 123/KSĐT-HS  Ngày 09 tháng 9 năm 2026\n\n" +
    "BẢN CÁO TRẠNG (TÀI LIỆU MẪU — DỮ LIỆU GIẢ ĐỊNH)\n\n" +
    "Viện Kiểm sát nhân dân thành phố Cần Thơ, xét thấy:\n\n" +
    "Bị can: Nguyễn Văn An, sinh ngày 12/03/1988, giới tính: Nam.\n" +
    "Số CCCD: 092088001234\n" +
    "Địa chỉ thường trú: số 15 đường Nguyễn Trãi, phường An Hòa, quận Ninh Kiều, thành phố Cần Thơ\n" +
    "Điện thoại: 0912 345 678\nEmail: nguyenvanan.mau@gmail.com\n\n" +
    "Người bị hại: Trần Thị Bình, sinh ngày 05/11/1992, giới tính: Nữ.\n" +
    "Số CCCD: 092192004321\n" +
    "Địa chỉ: 42/6 đường 3 Tháng 2, phường Xuân Khánh, quận Ninh Kiều, TP. Cần Thơ\n" +
    "Số điện thoại: 0903.222.111\n\n" +
    "Người làm chứng: Lê Minh Châu, sinh năm 1990\nSố CMND: 361234567\n" +
    "Địa chỉ tạm trú: khóm 3, phường Tân An, quận Ninh Kiều, thành phố Cần Thơ\n" +
    "Di động: 0388 111 222\n\n" +
    "Tài khoản ngân hàng số 012345678901 thuộc Ngân hàng TMCP Ngoại thương Việt Nam (Vietcombank), chi nhánh Cần Thơ, đứng tên Nguyễn Văn An.\n\n" +
    "Biển số xe: 65A-123.45\nMã số thuế: 1800123456\n\n" +
    "Nội dung (rút gọn, giả định): Khoảng 20 giờ ngày 15/08/2025, tại khu vực bến Ninh Kiều, bị can Nguyễn Văn An có hành vi theo nội dung vụ án (nội dung nghiệp vụ đã lược bỏ trong tài liệu mẫu).\n\n" +
    "Ghi chú: Toàn bộ họ tên, số giấy tờ, địa chỉ, điện thoại, tài khoản trong văn bản này là dữ liệu giả, chỉ dùng để kiểm tra công cụ ẩn danh.\n";

  function nearby(text, index, keywords, window) {
    window = window == null ? 52 : window;
    var from = Math.max(0, index - window);
    return keywords.test(text.slice(from, index));
  }
  function push(out, part, category, text, start, end, confidence) {
    var value = text.slice(start, end);
    var trimmed = value.replace(/[\s,;:.]+$/g, "").replace(/^[\s,;:.]+/g, "");
    if (trimmed.length < 2) return;
    var lead = value.indexOf(trimmed);
    var s = start + (lead >= 0 ? lead : 0);
    var e = s + trimmed.length;
    out.push({ id: part + ":" + s + ":" + e + ":" + category, category: category, text: trimmed, start: s, end: e, part: part, confidence: confidence || "high" });
  }
  function labeled(out, part, text, re, category, group, confidence) {
    group = group == null ? 1 : group;
    confidence = confidence || "high";
    re.lastIndex = 0;
    var m;
    while ((m = re.exec(text))) {
      var g = m[group];
      if (!g) continue;
      var rel = m[0].lastIndexOf(g);
      var start = m.index + (rel >= 0 ? rel : m[0].length - g.length);
      push(out, part, category, text, start, start + g.length, confidence);
      if (m[0].length === 0) re.lastIndex += 1;
    }
  }
  function isCccdDigits(d) {
    if (!/^\d{12}$/.test(d)) return false;
    var province = Number(d.slice(0, 3));
    return province >= 1 && province <= 96;
  }
  function looksLikeCaseNumber(text, start) {
    var around = text.slice(Math.max(0, start - 8), start + 24);
    return /(?:vks|vksnd|hs|hstt|hssp|ds|hc|qt|\/\d{4}\/)/i.test(around);
  }
  function isOrgName(value) {
    var n = value.toLowerCase();
    for (var i = 0; i < ORG_PHRASES.length; i++) if (n.indexOf(ORG_PHRASES[i]) >= 0) return true;
    return false;
  }
  function collectPhones(out, part, text) {
    var re = /(?<!\d)(?:\+?84|0)(?:3[2-9]|5[2689]|7[06-9]|8[1-9]|9[0-9])(?:[\s.\-]?\d){7}(?!\d)/g;
    var m;
    while ((m = re.exec(text))) push(out, part, "dienthoai", text, m.index, m.index + m[0].length);
    labeled(out, part, text, /(?:điện\s*thoại|đt|sđt|di\s*động|mobile|fax|số\s+máy)\s*[:.\-]?\s*(\+?\d[\d\s.\-]{7,14}\d)/gi, "dienthoai");
  }
  function collectIds(out, part, text) {
    labeled(out, part, text, /(?:số\s+)?(?:cccd|cmnd|cmtnd|căn\s*cước(?:\s+công\s+dân)?|chứng\s*minh(?:\s+nhân\s+dân)?|định\s+danh(?:\s+cá\s+nhân)?|cmt)\s*(?:số|:|là)?\s*[:.\-]?\s*(\d[\d\s]{7,14}\d)/gi, "cccd");
    var loose = /(?<!\d)(\d{12})(?!\d)/g;
    var m;
    while ((m = loose.exec(text))) {
      if (!isCccdDigits(m[1])) continue;
      if (looksLikeCaseNumber(text, m.index)) continue;
      if (nearby(text, m.index, /(?:tài\s+khoản|stk|\btk\b|ngân\s+hàng)/i, 70)) continue;
      var conf = nearby(text, m.index, /(?:cccd|cmnd|căn\s*cước|chứng\s*minh|định\s+danh|sinh)/i, 60) ? "high" : "medium";
      push(out, part, "cccd", text, m.index, m.index + 12, conf);
    }
    labeled(out, part, text, /(?:hộ\s*chiếu|passport|số\s+hc)\s*[:.\-]?\s*([A-Z]\d{7})/gi, "cccd");
  }
  function collectBanks(out, part, text) {
    labeled(out, part, text, /(?:số\s+)?(?:tài\s+khoản|stk|tk)\s*(?:ngân\s+hàng)?\s*(?:số|:|là)?\s*[:.\-]?\s*(\d[\d\s]{7,17}\d)/gi, "taikhoan");
  }
  function collectTax(out, part, text) {
    labeled(out, part, text, /(?:mã\s+số\s+thuế|mst)\s*[:.\-]?\s*(\d{10}(?:\d{3})?)/gi, "masothue");
  }
  function collectEmail(out, part, text) {
    var re = /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/gi;
    var m;
    while ((m = re.exec(text))) push(out, part, "email", text, m.index, m.index + m[0].length);
  }
  function collectPlates(out, part, text) {
    var re = /(?<![A-Z0-9])\d{2}[A-Z]{1,2}[-\s.]?\d{3,5}(?:[.\s]\d{2})?(?![A-Z0-9])/gi;
    var m;
    while ((m = re.exec(text))) {
      var conf = nearby(text, m.index, /(?:biển\s+số|bks|xe|ô\s*tô|moto|mô\s*tô)/i) ? "high" : "medium";
      push(out, part, "bienso", text, m.index, m.index + m[0].length, conf);
    }
  }
  function collectDob(out, part, text) {
    labeled(out, part, text, /(?:sinh\s+ngày|ngày\s+sinh|ns|n\.s\.|dob)\s*[:.\-]?\s*(\d{1,2}[/\-.]\d{1,2}[/\-.]\d{2,4})/gi, "ngaysinh");
    labeled(out, part, text, /(?:sinh\s+ngày|ngày\s+sinh)\s*[:.\-]?\s*(ngày\s+\d{1,2}\s+tháng\s+\d{1,2}\s+năm\s+\d{4})/gi, "ngaysinh");
    labeled(out, part, text, /sinh\s+năm\s*[:.\-]?\s*(\d{4})/gi, "ngaysinh");
  }
  function collectAddresses(out, part, text) {
    labeled(out, part, text, /(?:địa\s+chỉ\s+thường\s+trú|địa\s+chỉ\s+tạm\s+trú|chỗ\s+ở(?:\s+hiện\s+nay)?|nơi\s+cư\s+trú|địa\s+chỉ|thường\s+trú|tạm\s+trú|trú\s+tại|cư\s+trú(?:\s+tại)?|hộ\s+khẩu|nơi\s+ở)\s*(?:tại|là)?\s*[:.\-]\s*([^\n;]{8,140}?)(?=(?:\s{2,}|\n|$|;|điện\s*thoại|sđt|cccd|cmnd|email|sinh\s+ngày|giới\s+tính))/gi, "diachi");
  }
  function collectLabeledNames(out, part, text) {
    labeled(out, part, text, /(?:họ\s+và\s+tên|họ\s+tên|tên(?:\s+là)?|bị\s+can|bị\s+cáo|bị\s+hại|người\s+bị\s+hại|nguyên\s+đơn|bị\s+đơn|nhân\s+chứng|người\s+làm\s+chứng|đương\s+sự|can\s+phạm|người\s+tố\s+giác|người\s+báo\s+tin|người\s+liên\s+quan|con\s+của|chồng(?:\s+là)?|vợ(?:\s+là)?)\s*[:.\-]?\s*([^\n,;]{4,60}?)(?=(?:\s*,|\s*;|\s*$|\s*\n|\s+sinh|\s+giới\s+tính|\s+nam\b|\s+nữ\b|\s+số\s+cccd|\s+cccd|\s+cmnd|\s+địa\s+chỉ|\s+trú|\s+sđt|\s+điện\s*thoại))/gi, "hoten");
  }
  function collectSurnameNames(out, part, text) {
    var wordTitle = "[" + CAP + "][" + LOW + "]{1,16}";
    var reTitle = new RegExp("(?<![" + LET + "])((?:" + SURNAME_ALT + ")(?:[\\s]+" + wordTitle + "){1,3})", "g");
    var surnameUpper = SURNAMES.map(function (s) { return s.toLocaleUpperCase("vi"); }).sort(function (a, b) { return b.length - a.length; }).map(escapeRe).join("|");
    var wordUpper = "[" + CAP + "]{2,16}";
    var reUpper = new RegExp("(?<![" + LET + "])((?:" + surnameUpper + ")(?:[\\s]+" + wordUpper + "){1,3})", "g");
    function run(re) {
      re.lastIndex = 0;
      var m;
      while ((m = re.exec(text))) {
        var raw = m[1].replace(/\s+/g, " ").trim();
        var parts = raw.split(" ");
        if (parts.length < 2) continue;
        if (isOrgName(raw)) continue;
        var before = text.slice(Math.max(0, m.index - 24), m.index);
        if (STREET_PREFIX.test(before)) continue;
        var after = text.slice(m.index + m[1].length, m.index + m[1].length + 28);
        if (ORG_FOLLOW.test(after)) continue;
        if (parts.length === 2 && !nearby(text, m.index, /(?:ông|bà|anh|chị|cô|chú|bị\s+can|bị\s+cáo|họ\s+tên|là)\s+$/i, 18)) continue;
        push(out, part, "hoten", text, m.index, m.index + m[1].length, parts.length >= 3 ? "high" : "medium");
      }
    }
    run(reTitle);
    run(reUpper);
  }
  function collectCustom(out, part, text, terms) {
    for (var i = 0; i < terms.length; i++) {
      var t = terms[i].trim();
      if (t.length < 2) continue;
      var re = new RegExp(escapeRe(t), "gi");
      var m;
      while ((m = re.exec(text))) push(out, part, "custom", text, m.index, m.index + m[0].length, "high");
    }
  }
  function suppressOverlaps(findings) {
    var sorted = findings.slice().sort(function (a, b) {
      var la = a.end - a.start, lb = b.end - b.start;
      if (lb !== la) return lb - la;
      if (a.start !== b.start) return a.start - b.start;
      return a.category.localeCompare(b.category);
    });
    var kept = [];
    for (var i = 0; i < sorted.length; i++) {
      var f = sorted[i];
      var hits = kept.some(function (k) { return k.part === f.part && f.start < k.end && f.end > k.start; });
      if (!hits) kept.push(f);
    }
    kept.sort(function (a, b) { return a.start - b.start || a.category.localeCompare(b.category); });
    var seen = {};
    return kept.filter(function (f) {
      if (seen[f.id]) return false;
      seen[f.id] = true;
      return true;
    });
  }
  global.parseCustomTerms = function (raw) {
    return String(raw || "").split(/\n|,/).map(function (s) { return s.trim(); }).filter(function (s, i, arr) { return s.length >= 2 && arr.indexOf(s) === i; }).sort(function (a, b) { return b.length - a.length; });
  };
  global.detectPii = function (text, part, terms) {
    var p = part || "body";
    var out = [];
    if (!text) return out;
    collectPhones(out, p, text);
    collectIds(out, p, text);
    collectBanks(out, p, text);
    collectTax(out, p, text);
    collectEmail(out, p, text);
    collectPlates(out, p, text);
    collectDob(out, p, text);
    collectAddresses(out, p, text);
    collectLabeledNames(out, p, text);
    collectSurnameNames(out, p, text);
    if (terms && terms.length) collectCustom(out, p, text, terms);
    return suppressOverlaps(out);
  };
})(typeof window !== "undefined" ? window : this);
