# Thư viện bên thứ ba (để trong repo, không phụ thuộc CDN)

| Thư viện | Phiên bản | Giấy phép | Tệp |
|---|---|---|---|
| JSZip | 3.10.1 | MIT/GPLv3 | `jszip.min.js` |
| pdf.js (pdfjs-dist) | 3.11.174 | Apache-2.0 | `pdfjs/pdf.min.js`, `pdfjs/pdf.worker.min.js` |
| Tesseract.js | 6.0.1 | Apache-2.0 | `tesseract/tesseract.min.js`, `tesseract/worker.min.js` |
| tesseract.js-core | 6.x | Apache-2.0 | `tesseract/tesseract-core-*-lstm.wasm.js` |
| Dữ liệu tiếng Việt | 4.0.0_best_int (@tesseract.js-data/vie) | Apache-2.0 | `tesseract/vie.traineddata.gz` |

Tesseract (~9,6 MB) chỉ tải khi người dùng bấm nhận dạng ảnh scan, rồi service worker lưu lại để lần sau chạy offline.
