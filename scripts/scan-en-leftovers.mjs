/**
 * Headless audit: open every HTML page with knks_lang=en, click main tabs,
 * run main calculators where possible, scan document.body.innerText for
 * Vietnamese-accented characters and Vietnamese abbreviations (KN, TC, TTHS, BLTTHS, VKS, NĐ…).
 * Allowed leftovers: "Tiếng Việt", "Thiên Phúc © 2026", "Thiên Phúc" and official document numbers.
 * KNKS_DUMP_CAPS=/tmp/caps.json dumps every all-caps token seen, for review.
 */
import puppeteer from "puppeteer-core";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = process.env.KNKS_ROOT || path.resolve(__dirname, "..");
const BASE = process.env.KNKS_BASE || "http://127.0.0.1:8788";
const CHROME = process.env.CHROME || "/usr/bin/google-chrome";
const VN_RE = /[àáảãạăằắẳẵặâầấẩẫậèéẻẽẹêềếểễệìíỉĩịòóỏõọôồốổỗộơờớởỡợùúủũụưừứửữựỳýỷỹỵđÀÁẢÃẠĂẰẮẲẴẶÂẦẤẨẪẬÈÉẺẼẸÊỀẾỂỄỆÌÍỈĨỊÒÓỎÕỌÔỒỐỔỖỘƠỜỚỞỠỢÙÚỦŨỤƯỪỨỬỮỰỲÝỶỸỴĐ]/;

function listHtml(dir, acc = []) {
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    if (ent.name.startsWith(".") || ent.name === "node_modules" || ent.name === "android" || ent.name === "desktop-windows" || ent.name === "vendor" || ent.name === "i18n" || ent.name === "scripts") continue;
    const p = path.join(dir, ent.name);
    if (ent.isDirectory()) listHtml(p, acc);
    else if (ent.name.endsWith(".html")) acc.push(path.relative(ROOT, p).split(path.sep).join("/"));
  }
  return acc.sort();
}

function allowedStrip(s) {
  return s
    .replace(/Thiên Phúc © 2026/g, "")
    .replace(/Thiên Phúc/g, "")
    .replace(/Tiếng Việt/g, "");
}

/* Vietnamese abbreviations (no diacritics, so VN_RE misses them). Official document numbers
   such as 02/2018/TTLT-VKSNDTC-... or 152/2026/ND-CP are identifiers and are stripped first. */
const VN_ABBR = new Set((
  "KN TC TTHS TTDS TTHC KN-TC KNTC BLTTHS BLTTDS BLHS BLDS BLLĐ BLLD LTTHC LTTHA LTHADS LTHAHS LXLVPHC XLVPHC VPHC CQĐT CQDT CQTHTT " +
  "VKS VKSND VKSNDTC VKSTC VKSQS TAND TANDTC TANDCC TAQS TA KSV ĐTV DTV THA THADS THAHS CQTHADS CBCC GQ LV QĐ QD NĐ ND TT TTLT NQ HĐTP HDTP " +
  "HĐXX HDXX HĐTP UBND UBTVQH CA CAND BCA CSĐT CSDT ANĐT ANDT KSĐT KSDT KSXX TGTG TGTGGQ TGTGQ TGTH KSTG KSTGTG TTG TG TGTH TĐC TDC GĐ GD " +
  "BKS CTV PCT VT PVT KSVCC KSVTC KSVSC TP TX TPHCM HS DS HC KT LĐ LD HNGĐ HNGD PS PT GĐT GDT TT-GĐT TB NLHVDS NLPLDS QSDĐ QSDD GCNQSDĐ GCNQSDD " +
  "BPNC BPTT BPCC CTTP HTTP TNHS TNDS TĐ TCN TNHH CTCP DNTN HTX QPPL VBQPPL VBPL CSDL BLTTHS2015 PL PLTTHS NĐ-CP QĐ-VKSTC TTr BC KL KLTT"
).split(/\s+/).filter(Boolean));
const ALLOWED_CAPS = new Set((process.env.KNKS_ALLOWED_CAPS || "").split(/[\s,]+/).filter(Boolean));
const CODE_STRIP_RE = /[0-9A-Za-zĐđ.]+(?:[\/\-][0-9A-Za-zĐđ&.]+)*\/[0-9A-Za-zĐđ&.]+(?:[\/\-][0-9A-Za-zĐđ&.]+)*/g;
const CAPS_RE = /(?<![A-Za-z0-9ĐđÀ-ỹ_])[A-ZĐ][A-ZĐ0-9]*(?:-[A-ZĐ][A-ZĐ0-9]*)*(?![A-Za-z0-9ĐđÀ-ỹ_])/g;
function capsTokens(text) {
  const out = [];
  for (const line of String(text || "").split(/[\n\r]+/)) {
    const t = line.replace(/\s+/g, " ").trim();
    if (!t) continue;
    const stripped = t.replace(CODE_STRIP_RE, (m) => (/\d/.test(m) ? " " : m));
    let m;
    CAPS_RE.lastIndex = 0;
    while ((m = CAPS_RE.exec(stripped))) {
      const tok = m[0];
      if (tok.replace(/[^A-ZĐ]/g, "").length < 2) continue;
      out.push({ tok, line: t.slice(0, 240) });
    }
  }
  return out;
}
function abbrLeftovers(text) {
  const hits = [];
  for (const { tok, line } of capsTokens(text)) {
    if (ALLOWED_CAPS.has(tok)) continue;
    const parts = tok.split("-");
    if (VN_ABBR.has(tok) || parts.some((p) => VN_ABBR.has(p))) hits.push(tok + "  ⟵  " + line);
  }
  return hits;
}

function leftovers(text) {
  const clean = allowedStrip(text || "");
  if (!VN_RE.test(clean)) return [];
  const out = [];
  const parts = clean.split(/[\n\r]+/);
  for (const line of parts) {
    const t = line.replace(/\s+/g, " ").trim();
    if (t && VN_RE.test(t)) out.push(t.slice(0, 240));
  }
  return out;
}

async function interact(page, rel) {
  await page.evaluate(async () => {
    const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
    const clickAll = (sel) => {
      document.querySelectorAll(sel).forEach((el) => {
        try { el.click(); } catch (e) {}
      });
    };
    clickAll(".tab, .tab-btn, [data-tab], button.tab, .chip, .vb-chip");
    await sleep(200);

    // Try calculators: fill first date inputs and click calculate-like buttons
    const dates = document.querySelectorAll('input[type="date"]');
    dates.forEach((el, i) => {
      try { el.value = i === 0 ? "2026-01-15" : "2026-02-01"; el.dispatchEvent(new Event("input", { bubbles: true })); el.dispatchEvent(new Event("change", { bubbles: true })); } catch (e) {}
    });
    const nums = document.querySelectorAll('input[type="number"], input[inputmode="numeric"]');
    nums.forEach((el) => {
      if (!el.value) {
        try { el.value = "15"; el.dispatchEvent(new Event("input", { bubbles: true })); } catch (e) {}
      }
    });
    const labels = ["Tính", "Calculate", "Tính hạn", "Tính toán", "Áp dụng", "Run", "Soạn", "Tạo", "Generate", "Xem", "Tra cứu", "Search"];
    document.querySelectorAll("button, input[type=button], input[type=submit], .btn").forEach((el) => {
      const t = ((el.textContent || el.value || "") + " " + (el.getAttribute("id") || "")).toLowerCase();
      if (labels.some((x) => t.includes(x.toLowerCase())) || /tinh|calc|soan|tao|apply/.test(el.id || "")) {
        try { el.click(); } catch (e) {}
      }
    });
    await sleep(400);
  });
}

const pages = listHtml(ROOT);
console.log("HTML pages:", pages.length);
pages.forEach((p) => console.log(" -", p));

const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: "new",
  args: ["--no-sandbox", "--disable-gpu", "--disable-dev-shm-usage"],
});

const results = [];
let totalLeft = 0;
let totalAbbr = 0;
const capsDump = {};
const consoleByPage = {};

for (const rel of pages) {
  const url = BASE + "/" + rel;
  console.log("OPEN", rel); process.stdout.write("");
  const page = await browser.newPage();
  page.setDefaultTimeout(20000);
  page.on("dialog", async (d) => { try { await d.accept(); } catch (e) {} });
  const logs = [];
  page.on("pageerror", (e) => logs.push("pageerror: " + e.message));
  page.on("console", (m) => {
    if (m.type() === "error") logs.push("console.error: " + m.text());
  });
  await page.evaluateOnNewDocument(() => {
    try { localStorage.setItem("knks_lang", "en"); } catch (e) {}
    try { localStorage.setItem("knks-don-vi-bo-qua", "1"); } catch (e) {}
  });
  try {
    await page.goto(url, { waitUntil: "domcontentloaded", timeout: 45000 });
    await page.waitForFunction(() => window.KNKS_I18N, { timeout: 10000 }).catch(() => {});
    await new Promise((r) => setTimeout(r, 700));
    await interact(page, rel);
    await new Promise((r) => setTimeout(r, 400));
    const payload = await page.evaluate(() => {
      const title = document.title || "";
      const body = document.body ? document.body.innerText : "";
      const extras = [];
      document.querySelectorAll("[placeholder],[title],[aria-label]").forEach((el) => {
        ["placeholder", "title", "aria-label"].forEach((a) => {
          const v = el.getAttribute(a);
          if (v) extras.push(v);
        });
      });
      return { title, body, extras: extras.join("\n") };
    });
    const engineKeys = await page.evaluate(() => (window.KNKS_I18N && window.KNKS_I18N.ABBR_KEYS) || []);
    engineKeys.forEach((k) => VN_ABBR.add(k));
    const all = payload.title + "\n" + payload.body + "\n" + payload.extras;
    const left = leftovers(all);
    const abbr = [...new Set(abbrLeftovers(all))];
    totalLeft += left.length;
    totalAbbr += abbr.length;
    if (process.env.KNKS_DUMP_CAPS) {
      for (const { tok, line } of capsTokens(all)) {
        const e = (capsDump[tok] = capsDump[tok] || { n: 0, pages: new Set(), samples: [] });
        e.n++; e.pages.add(rel); if (e.samples.length < 3) e.samples.push(line);
      }
    }
    results.push({ rel, url, leftovers: left, abbr, errors: logs.slice() });
    console.log((left.length === 0 && abbr.length === 0 ? "OK " : "VN!") + "  " + String(left.length).padStart(4) + " " + String(abbr.length).padStart(4) + "  " + rel);
    if (left.length) left.slice(0, 8).forEach((s) => console.log("     ·", s));
    if (abbr.length) abbr.slice(0, 8).forEach((s) => console.log("     ABBR", s));
  } catch (e) {
    results.push({ rel, url, leftovers: ["NAV_ERROR: " + e.message], errors: logs });
    totalLeft += 1;
    console.log("ERR  " + rel + "  " + e.message);
  } finally {
    await page.close();
  }
  consoleByPage[rel] = logs;
}

// VI restore smoke: home + a few tools
const viPages = ["index.html", "Data/TinhTuoiThoiHan.html", "cai-dat.html", "hoi-dap.html", "Tool/App_DS/index.html"];
const viReport = [];
for (const rel of viPages) {
  const page = await browser.newPage();
  page.setDefaultTimeout(20000);
  page.on("dialog", async (d) => { try { await d.accept(); } catch (e) {} });
  const logs = [];
  page.on("pageerror", (e) => logs.push(e.message));
  await page.evaluateOnNewDocument(() => {
    try { localStorage.setItem("knks_lang", "vi"); } catch (e) {}
    try { localStorage.setItem("knks-don-vi-bo-qua", "1"); } catch (e) {}
  });
  await page.goto(BASE + "/" + rel, { waitUntil: "domcontentloaded", timeout: 45000 });
  await page.waitForFunction(() => window.KNKS_I18N, { timeout: 10000 }).catch(() => {});
  await new Promise((r) => setTimeout(r, 800));
  const text = await page.evaluate(() => (document.body && document.body.innerText) || "");
  const hasVN = VN_RE.test(text);
  const hasEnChromeLeak = /Prosecutorial Skills|Deadline calculator|Legal Database/.test(text) && !hasVN;
  viReport.push({ rel, hasVN, chars: text.length, errors: logs, sample: text.slice(0, 180).replace(/\s+/g, " ") });
  console.log("VI  ", rel, "hasVN=" + hasVN, "errors=" + logs.length);
  await page.close();
}

await browser.close();

if (process.env.KNKS_DUMP_CAPS) {
  const rows = Object.entries(capsDump).sort((a, b) => b[1].n - a[1].n)
    .map(([tok, e]) => ({ tok, n: e.n, pages: [...e.pages], samples: e.samples }));
  fs.writeFileSync(process.env.KNKS_DUMP_CAPS, JSON.stringify(rows, null, 2));
  console.log("Caps dump:", process.env.KNKS_DUMP_CAPS, rows.length, "tokens");
}
const out = { scanned: pages.length, leftoverStrings: totalLeft, leftoverAbbr: totalAbbr, results, viReport };
const outPath = "/tmp/knks-en100/scan-report.json";
fs.writeFileSync(outPath, JSON.stringify(out, null, 2));
console.log("\n==== SUMMARY ====");
console.log("Pages scanned:", pages.length);
console.log("Leftover VN strings:", totalLeft);
console.log("Leftover VN abbreviations:", totalAbbr);
console.log("Report:", outPath);
process.exit(totalLeft === 0 && totalAbbr === 0 ? 0 : 2);
