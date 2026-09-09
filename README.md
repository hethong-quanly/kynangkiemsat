# Quy trinh nghiep vu kiem sat — VKSND TP Can Tho

Trang cong khai: https://hethong-quanly.github.io/quytrinhkiemsat/

**NHOM IT — Vien Kiem sat nhan dan thanh pho Can Tho**

## Trang da chay nhu the nao?

Repo nay la **GitHub Pages** (file tinh). Khong can cai Python tren may chu.

1. File `index.html` o goc repo = trang chu (logo → bang cong cu).
2. Bam the cong cu → `index.html` mo tool trong iframe (`url` trong mang `TOOLS`).
3. Moi lan ban **Add file / Upload** hoac sua file tren GitHub, Pages tu cap nhat sau 1–2 phut.

Cai dat Pages (da bat): **Settings → Pages → Deploy from a branch → `main` / `/ (root)`**.
File `.nojekyll` giu nguyen — de GitHub khong an thu muc bat dau bang dau gach duoi.

## Gan cong cu vao bang

Mo `index.html`, tim mang `TOOLS` (cuoi file). Moi the can:

```js
{
  id: 'an-danh-tool',
  span: 'span-4',
  badge: 'CÔNG CỤ',
  badgeClass: 'badge-teal',
  title: 'Tự động che thông tin',
  desc: 'An danh van ban tren trinh duyet.',
  illust: ILLUST.censor,
  url: 'AnDanh/index.html',   // duong dan tuong doi, khong dung \\ Windows
  footer: 'NHÓM IT — Viện KSND thành phố Cần Thơ'
}
```

- Tool trong repo: `url:'AnDanh/index.html'` hoac `url:'Tool/App_tinh_lai_suat/index.html'`
- Tool ngoai (Udify): `url:'https://udify.app/chat/...'` — mo trong khung
- Mo tab moi: them `newTab:true` (NotebookLM)

**Duong dan logo:** trong `index.html` dung `src="static/logo_moi.png"` (gach cheo `/`, khong dung `.\static\`).

## Thu muc

| Thu muc | Viec |
|---|---|
| `index.html` | Trang chu + danh sach TOOLS |
| `static/` | `logo_moi.png` |
| `AnDanh/` | An danh tren trinh duyet (`index.html` + `andanh.js` + `andanh-docx.js` + `andanh-ui.js`) |
| `Data/` | Tinh tuoi / thoi han, huong dan so do tu duy |
| `Tool/` | Lai suat, an phi, doi ten file, docx→md, OCR PDF |

The **Tu dong che thong tin** mo `Tool/AnDanh/index.html` (chuyen toi `AnDanh/`). Xu ly tren may nguoi dung, khong gui tep len may chu.

## Them file moi bang giao dien GitHub

1. Vao https://github.com/hethong-quanly/quytrinhkiemsat
2. Bam **Add file → Upload files** (dung nhu anh man hinh cua ban)
3. Keo thu muc `AnDanh/`, `Tool/`, `static/` vao dung cho
4. **Commit changes** vao nhanh `main`
5. Doi ~1 phut, mo lai https://hethong-quanly.github.io/quytrinhkiemsat/

Khong can cai Git tren may neu ban chi upload qua trang GitHub.
