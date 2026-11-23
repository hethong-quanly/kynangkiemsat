/* Kỹ năng Kiểm sát — module dùng chung: "Soạn Quyết định phân công KSV" theo lĩnh vực.
   Cần nạp trước: knks-linh-vuc.js, tro-ly-ao.js. Đăng ký KNKS.mountSoanQd(host, linhVucId).
   Lưu tên KSV/người ký trên máy (localStorage "vks.phancong.v1" — dùng chung với trang cũ). */
(function (g) {
  "use strict";
  var C = g.KNKS_LINH_VUC, K = g.KNKS;
  if (!C || !K) { console.error("Thiếu knks-linh-vuc.js / tro-ly-ao.js"); return; }
  var esc = K.util.esc, LS = "vks.phancong.v1";
  var KEYS = [["soVanBan", "Số văn bản nguồn"], ["ngayVanBan", "Ngày văn bản nguồn"], ["coQuanGui", "Cơ quan ban hành / gửi"],
    ["soThuLy", "Số thụ lý"], ["ngayThuLy", "Ngày thụ lý"], ["doiTuong", "Bị can / đương sự / người CHA"], ["namSinh", "Năm sinh"],
    ["toiDanh", "Tội danh / quan hệ pháp luật"], ["dieuLuat", "Điều luật"], ["toaAn", "Tòa án / cơ quan THA"],
    ["soBanAn", "Số bản án / quyết định"], ["hinhPhat", "Hình phạt / nghĩa vụ / thời hạn"], ["tomTat", "Tóm tắt"], ["ghiChu", "Ghi chú sổ"]];

  function compact(s) { return (s || "").replace(/\s+/g, " ").trim(); }
  function pick(t, re) { var m = t.match(re); return m ? compact(m[1] || m[0]) : ""; }
  function pickDate(t) {
    var a = t.match(/ngày\s+(\d{1,2})\s+tháng\s+(\d{1,2})\s+năm\s+(\d{4})/i); if (a) return ("0" + a[1]).slice(-2) + "/" + ("0" + a[2]).slice(-2) + "/" + a[3];
    var b = t.match(/\b(\d{1,2})[./-](\d{1,2})[./-](\d{4})\b/); if (b) return ("0" + b[1]).slice(-2) + "/" + ("0" + b[2]).slice(-2) + "/" + b[3];
    return "";
  }
  function extract(t) {
    var f = {}; KEYS.forEach(function (k) { f[k[0]] = ""; });
    f.soVanBan = pick(t, /Số:\s*([0-9A-Za-zÀ-ỹĐđ./-]+)/);
    f.ngayVanBan = pickDate(t.slice(0, 900));
    var lines = t.split(/\n/).map(function (l) { return l.trim(); }).filter(function (l) { return l.length > 8 && !/cộng ho[àa]|độc lập/i.test(l); });
    f.coQuanGui = lines[0] || "";
    f.soThuLy = pick(t, /thụ lý(?: vụ án(?: hình sự| dân sự| hành chính)?)? số\s*([0-9A-Za-zĐ./-]+)/i) || pick(t, /vụ án (?:hình sự|dân sự|hành chính) số\s*([0-9A-Za-zĐ./-]+)/i);
    f.ngayThuLy = pickDate((t.match(/thụ lý[\s\S]{0,80}?(?:ngày\s+\d{1,2}\s+tháng\s+\d{1,2}\s+năm\s+\d{4}|\d{1,2}[./-]\d{1,2}[./-]\d{4})/i) || [""])[0]) || f.ngayVanBan;
    f.doiTuong = pick(t, /(?:Bị can|Tạm giam bị can|Tạm giữ|Người chấp hành án|Người phải thi hành án|Bị cáo|Nguyên đơn|Người khởi kiện|Đương sự):\s*([^,\n]+)/i) || pick(t, /đơn khiếu nại của\s+(?:ông|bà)?\s*([^,\n]+)/i);
    f.namSinh = pick(t, /sinh(?: ngày| năm)?[:\s]+(\d{1,2}[./-]\d{1,2}[./-]\d{4}|\d{4})/i);
    f.toiDanh = pick(t, /về tội\s+([^.\n]+?)(?:\s+quy định|\s+theo|\s+tại|$)/im) || pick(t, /Tội:\s*([^.\n]+?)(?:\s+theo|\s+quy định|$)/im) || pick(t, /Quan hệ pháp luật:\s*([^\n]+)/i) || pick(t, /về việc\s+([a-zà-ỹđ][^.\n]+)/) || pick(t, /khiếu nại\s+(Quyết định[^\n.]+)/i);
    f.dieuLuat = pick(t, /((?:khoản\s+\d+\s+)?Điều\s+\d+\w*\s+(?:Bộ luật Hình sự|BLHS)(?:\s+năm\s+\d{4})?)/i);
    f.toaAn = pick(t, /(Tòa án nhân dân[^\n,]{0,60}?)(?:\s+đã|\s+có hiệu lực|$)/im) || pick(t, /(Chi cục thi hành án[^\n,]{0,50})/i) || pick(t, /(Trại tạm giam[^\n,.]{0,50}|Nhà tạm giữ[^\n,.]{0,50})/i);
    f.soBanAn = pick(t, /bản án số\s*([0-9A-Za-zĐ./-]+)/i);
    f.hinhPhat = pick(t, /Hình phạt:\s*([^\n]+)/i) || pick(t, /Nghĩa vụ:\s*([^\n]+)/i) || pick(t, /Thời hạn tạm (?:giam|giữ):\s*([^\n]+)/i);
    f.hinhPhat = f.hinhPhat.replace(/[.;]\s*$/, "");
    var tom = t.match(/Tóm tắt:\s*([\s\S]{10,400}?)(?:\n\s*\n|Nơi nhận:|$)/i); f.tomTat = tom ? compact(tom[1]) : "";
    return f;
  }
  function detect(text, ids) {
    var t = text.toLowerCase();
    for (var i = 0; i < ids.length; i++) if (C.KHAU[ids[i]].detect && C.KHAU[ids[i]].detect.test(t)) return ids[i];
    return ids[0];
  }
  function isoLong(iso) { var p = (iso || "").split("-"); return p.length === 3 ? "ngày " + Number(p[2]) + " tháng " + Number(p[1]) + " năm " + p[0] : "ngày … tháng … năm …"; }
  function isoShort(iso) { var p = (iso || "").split("-"); return p.length === 3 ? p[2] + "/" + p[1] + "/" + p[0] : ""; }
  function vuViec(k, F) {
    var dt = (F.doiTuong || "…") + (F.namSinh ? ", sinh " + F.namSinh : "");
    var tl = "thụ lý số " + (F.soThuLy || F.soVanBan || "…") + (F.ngayThuLy ? " ngày " + F.ngayThuLy : "");
    switch (k.vu) {
      case "thahs": return "đối với người chấp hành án " + dt + (F.soBanAn ? ", theo bản án số " + F.soBanAn : "") + (F.soVanBan ? " và Quyết định thi hành án số " + F.soVanBan : "") + (F.hinhPhat ? " (" + F.hinhPhat + ")" : "");
      case "tgtg": return "đối với " + dt + (F.soVanBan ? ", theo văn bản số " + F.soVanBan : "") + (F.toiDanh ? ", về tội " + F.toiDanh : "") + (F.toaAn ? ", tại " + F.toaAn : "");
      case "thads": return "theo Quyết định thi hành án số " + (F.soVanBan || "…") + (F.coQuanGui ? " của " + F.coQuanGui : "") + " đối với người phải thi hành án " + dt;
      case "ds": case "hc": return tl + (F.toiDanh ? " về việc " + F.toiDanh : "") + (F.doiTuong ? " (" + F.doiTuong + ")" : "");
      case "kntc": return tl + " của " + dt + (F.toiDanh ? " đối với " + F.toiDanh : "");
      default: return tl + " đối với bị can/bị cáo " + dt + (F.toiDanh ? " về tội " + F.toiDanh : "") + (F.dieuLuat ? " (" + F.dieuLuat + ")" : "");
    }
  }
  function draft(k, F, a) {
    var nguon = [F.soVanBan, F.ngayVanBan, F.coQuanGui].filter(Boolean).join(" — ");
    var cd = a.chucDanh.toUpperCase();
    return "VIỆN KIỂM SÁT NHÂN DÂN\nTHÀNH PHỐ CẦN THƠ\nSố: " + (a.soQd || "…") + "/QĐ-VKS-" + k.so +
      "\n\nCỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM\nĐộc lập - Tự do - Hạnh phúc\n\nCần Thơ, " + isoLong(a.ngayQd) +
      "\n\nQUYẾT ĐỊNH\nPhân công Kiểm sát viên " + k.nv + "\n\n" + cd + " VIỆN KIỂM SÁT NHÂN DÂN THÀNH PHỐ CẦN THƠ\n\nCăn cứ:\n" +
      k.cc.map(function (c) { return "- " + c + ";"; }).join("\n") + "\n\nXét đề nghị phân công và văn bản nguồn" + (nguon ? ": " + nguon : "") + ";\n\nQUYẾT ĐỊNH:\n\n" +
      "Điều 1. Phân công đồng chí " + (a.ksv || "…") + ", " + a.chucVu + ", " + k.nv + " " + vuViec(k, F).replace(/[.\s]+$/, "") + "." +
      (a.ksvPhu ? "\nPhân công đồng chí " + a.ksvPhu + " phối hợp, hỗ trợ Kiểm sát viên thụ lý chính." : "") +
      "\nĐồng chí được phân công là Kiểm sát viên thụ lý chính, chịu trách nhiệm lập, quản lý hồ sơ kiểm sát và báo cáo tiến độ theo quy chế công tác." +
      "\n\nĐiều 2. Đồng chí có tên tại Điều 1 chịu trách nhiệm thi hành Quyết định này.\n\nĐiều 3. Quyết định này có hiệu lực kể từ ngày ký." +
      "\n\nNơi nhận:                                      " + cd + "\n- Như Điều 1;\n- Lưu: VT, hồ sơ kiểm sát.\n\n                                               " + (a.vienTruong || "…") + "\n";
  }
  function toDocx(text, name) {
    return K.util.loadScript(K.util.CDN.jszip).then(function () {
      var x = function (s) { return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;"); };
      var paras = text.split(/\n/).map(function (l) {
        return l ? '<w:p><w:r><w:rPr><w:rFonts w:ascii="Times New Roman" w:hAnsi="Times New Roman" w:eastAsia="Times New Roman" w:cs="Times New Roman"/><w:sz w:val="26"/></w:rPr><w:t xml:space="preserve">' + x(l) + "</w:t></w:r></w:p>" : "<w:p/>";
      }).join("");
      var z = new g.JSZip();
      z.file("[Content_Types].xml", '<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types"><Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/><Default Extension="xml" ContentType="application/xml"/><Override PartName="/word/document.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml"/></Types>');
      z.file("_rels/.rels", '<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="word/document.xml"/></Relationships>');
      z.file("word/document.xml", '<?xml version="1.0" encoding="UTF-8" standalone="yes"?><w:document xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main"><w:body>' + paras + '<w:sectPr><w:pgSz w:w="11906" w:h="16838"/><w:pgMar w:top="1134" w:right="1134" w:bottom="1134" w:left="1701"/></w:sectPr></w:body></w:document>');
      return z.generateAsync({ type: "blob" });
    }).then(function (blob) { var a = document.createElement("a"); a.href = URL.createObjectURL(blob); a.download = name; a.click(); });
  }
  K.soanQd = { extract: extract, detect: detect, draft: draft, toDocx: toDocx };

  K.mountSoanQd = function (host, linhVucId) {
    var lv = C.LINH_VUC[linhVucId] || C.LINH_VUC["tong-hop"];
    var ids = lv.khau, khau = ids[0], F = extract("");
    host.classList.add("knai");
    var mauBtns = ids.filter(function (id) { return C.MAU[id]; }).map(function (id) { return '<button class="btn" type="button" data-mau="' + id + '">Mẫu ' + esc(C.KHAU[id].short) + "</button>"; }).join("");
    host.innerHTML =
      '<div class="card"><p class="kicker">Soạn Quyết định phân công KSV · ' + esc(lv.ten) + '</p><p class="muted">Dán / tải Thông báo thụ lý, Lệnh, Quyết định (kể cả chữ đã OCR). Công cụ trích trường, soạn QĐ phân công và dòng sổ quản lý. Kiểm sát viên rà soát trước khi trình ký.</p></div>' +
      '<div class="card"><p class="kicker">1. Khâu công tác</p><div class="grid g2" data-k="khau"></div></div>' +
      '<div class="card"><p class="kicker">2. Văn bản nguồn</p><textarea data-k="src" placeholder="Dán văn bản nguồn hoặc tải .docx / .txt / .pdf…"></textarea>' +
      '<div class="row"><button class="btn" type="button" data-k="parse" style="background:var(--navy);color:#fff;border-color:var(--navy)">Trích xuất</button><button class="btn" type="button" data-k="btnFile">Tải file</button>' + mauBtns +
      '<input type="file" data-k="file" accept=".docx,.txt,.pdf" hidden /></div><p class="muted" data-k="parsed"></p></div>' +
      '<div class="card"><p class="kicker">3. Trường vụ việc</p><div class="grid g2" data-k="fields"></div></div>' +
      '<div class="card"><p class="kicker">4. Phân công</p><div class="grid g2">' +
      '<div><label>Số quyết định</label><input data-k="soQd" value="01" /></div><div><label>Ngày ký</label><input type="date" data-k="ngayQd" /></div>' +
      '<div><label>Kiểm sát viên thụ lý chính</label><input data-k="ksv" placeholder="Họ tên KSV" /></div><div><label>Chức vụ KSV</label><input data-k="chucVu" value="Kiểm sát viên" /></div>' +
      '<div><label>KSV phối hợp (nếu có)</label><input data-k="ksvPhu" /></div><div><label>Người ký</label><select data-k="chucDanh"><option>VIỆN TRƯỞNG</option><option>PHÓ VIỆN TRƯỞNG</option><option>KT. VIỆN TRƯỞNG — PHÓ VIỆN TRƯỞNG</option></select></div>' +
      '<div style="grid-column:1/-1"><label>Họ tên người ký</label><input data-k="vienTruong" /></div></div></div>' +
      '<div class="card"><div class="row" style="justify-content:space-between;margin-top:0"><p class="kicker" style="margin:0">Quyết định phân công</p><div class="row" style="margin:0">' +
      '<button class="btn" type="button" data-k="copy">Sao chép</button><button class="btn" type="button" data-k="print">In</button><button class="btn" type="button" data-k="docx" style="background:var(--navy);color:#fff;border-color:var(--navy)">Tải .docx</button></div></div>' +
      '<p class="muted" data-k="mau"></p><div class="knai-preview" data-k="preview"></div></div>' +
      '<div class="card"><div class="row" style="justify-content:space-between;margin-top:0"><p class="kicker" style="margin:0">Dòng sổ quản lý khâu công tác</p><button class="btn" type="button" data-k="tsv">Sao chép Excel</button></div>' +
      '<div style="overflow:auto;margin-top:10px"><table><thead data-k="thead"></thead><tbody data-k="tbody"></tbody></table></div></div>';
    function $(k) { return host.querySelector('[data-k="' + k + '"]'); }
    var AS = ["soQd", "ngayQd", "ksv", "chucVu", "ksvPhu", "chucDanh", "vienTruong"];
    function assign() { var a = {}; AS.forEach(function (k) { a[k] = $(k).value.trim(); }); a.chucVu = a.chucVu || "Kiểm sát viên"; return a; }
    function renderKhau() {
      $("khau").innerHTML = ids.map(function (id) { var k = C.KHAU[id]; return '<button type="button" class="knai-khau' + (id === khau ? " on" : "") + '" data-khau="' + id + '"><strong>' + esc(k.short) + "</strong><div>" + esc(k.label) + "</div><small>" + esc(k.hint) + "</small></button>"; }).join("");
    }
    function renderFields() {
      $("fields").innerHTML = KEYS.map(function (k) {
        var full = k[0] === "tomTat" || k[0] === "ghiChu" ? ' style="grid-column:1/-1"' : "";
        return "<div" + full + "><label>" + k[1] + "</label>" + (k[0] === "tomTat" ? '<textarea data-f="tomTat" style="min-height:80px">' + esc(F.tomTat) + "</textarea>" : '<input data-f="' + k[0] + '" value="' + esc(F[k[0]]) + '" />') + "</div>";
      }).join("");
    }
    var cur = { draft: "", tsv: "" };
    function refresh() {
      var k = C.KHAU[khau], a = assign();
      cur.draft = draft(k, F, a);
      $("preview").textContent = cur.draft;
      $("mau").textContent = "Tham chiếu mẫu: " + k.mau + " — đối chiếu mẫu gốc trước khi trình ký.";
      var heads = ["Ngày QĐ", "Số thụ lý", "Khâu công tác", "Đối tượng", "Tội danh / nội dung", "KSV được phân công", "Số QĐ phân công", "Ghi chú"];
      var row = [isoShort(a.ngayQd), F.soThuLy || F.soVanBan, k.label, F.doiTuong, [F.toiDanh, F.dieuLuat].filter(Boolean).join(" — "), a.ksv, a.soQd ? a.soQd + "/QĐ-VKS-" + k.so : "", F.ghiChu || F.hinhPhat];
      $("thead").innerHTML = "<tr>" + heads.map(function (h) { return "<th>" + h + "</th>"; }).join("") + "</tr>";
      $("tbody").innerHTML = "<tr>" + row.map(function (c) { return "<td>" + esc(c || "—") + "</td>"; }).join("") + "</tr>";
      cur.tsv = heads.join("\t") + "\n" + row.map(function (c) { return (c || "").replace(/\t|\n/g, " "); }).join("\t");
      try { var o = {}; ["ksv", "chucVu", "ksvPhu", "vienTruong", "chucDanh"].forEach(function (x) { o[x] = $(x).value; }); localStorage.setItem(LS, JSON.stringify(o)); } catch (e) {}
    }
    function apply(text, force) {
      $("src").value = text; khau = force || detect(text, ids); F = extract(text);
      renderKhau(); renderFields(); refresh();
      var n = KEYS.filter(function (k) { return (F[k[0]] || "").trim(); }).length;
      $("parsed").textContent = n ? "Đã nhận " + n + " trường — sửa trực tiếp nếu OCR lệch." : "Chưa nhận được trường nào — kiểm tra lại văn bản.";
    }
    try { var o = JSON.parse(localStorage.getItem(LS) || "{}"); Object.keys(o).forEach(function (x) { if (o[x] && $(x)) $(x).value = o[x]; }); } catch (e) {}
    $("ngayQd").value = K.util.today();
    host.addEventListener("click", function (e) {
      var b = e.target.closest("[data-khau]"); if (b) { khau = b.getAttribute("data-khau"); renderKhau(); refresh(); return; }
      var m = e.target.closest("[data-mau]"); if (m) { var id = m.getAttribute("data-mau"); apply(C.MAU[id], id); }
    });
    $("fields").addEventListener("input", function (e) { var f = e.target.getAttribute("data-f"); if (f) { F[f] = e.target.value; refresh(); } });
    AS.forEach(function (k) { $(k).addEventListener("input", refresh); $(k).addEventListener("change", refresh); });
    $("parse").onclick = function () { apply($("src").value); };
    $("btnFile").onclick = function () { $("file").click(); };
    // Kéo thả file vào ô văn bản nguồn (như trang cũ)
    (function (z) {
      z.addEventListener("dragover", function (e) { e.preventDefault(); z.classList.add("knai-drop"); });
      z.addEventListener("dragleave", function () { z.classList.remove("knai-drop"); });
      z.addEventListener("drop", function (e) {
        var f = e.dataTransfer && e.dataTransfer.files && e.dataTransfer.files[0]; z.classList.remove("knai-drop");
        if (!f) return; e.preventDefault(); K.util.readFileText(f).then(function (t) { apply(t); }).catch(function () { alert("Không đọc được file."); });
      });
    })($("src"));
    $("file").onchange = function (e) { var f = e.target.files && e.target.files[0]; e.target.value = ""; if (f) K.util.readFileText(f).then(function (t) { apply(t); }).catch(function () { alert("Không đọc được file."); }); };
    $("copy").onclick = function () { navigator.clipboard && navigator.clipboard.writeText(cur.draft); };
    $("tsv").onclick = function () { navigator.clipboard && navigator.clipboard.writeText(cur.tsv); };
    $("print").onclick = function () { var w = g.open("", "_blank"); if (!w) return; w.document.write("<pre style='font-family:Times New Roman;font-size:13pt;white-space:pre-wrap'>" + esc(cur.draft) + "</pre>"); w.document.close(); w.print(); };
    $("docx").onclick = function () { toDocx(cur.draft, "QD-phan-cong-KSV-" + C.KHAU[khau].so + ".docx").catch(function () { alert("Thiếu thư viện Word (cần mạng lần đầu)."); }); };
    renderKhau(); renderFields(); refresh();
  };
})(window);
