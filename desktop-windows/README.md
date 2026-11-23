# Kỹ năng Kiểm sát — bộ cài Windows

Vỏ ứng dụng máy tính dựng bằng [Tauri v2](https://v2.tauri.app/), chạy trên Microsoft Edge WebView2
(có sẵn trên Windows 10/11; máy thiếu sẽ được bộ cài tự tải về).

- Mở thẳng `https://hethong-quanly.github.io/kynangkiemsat/` trong cửa sổ riêng «Kỹ năng Kiểm sát»
  (1280×820, tối thiểu 400×600, căn giữa), không có thanh địa chỉ, luôn chạy bản web mới nhất.
- Chỉ các trang trong `hethong-quanly.github.io/kynangkiemsat/` được mở trong cửa sổ; liên kết khác
  mở bằng trình duyệt mặc định. Trang web không được cấp quyền gọi API hệ thống.
- Bộ cài NSIS (tiếng Việt), cài cho người dùng hiện tại (không cần quyền quản trị), tạo lối tắt
  Desktop và Start Menu, gỡ cài đặt trong *Settings → Apps*.

## Build

Workflow `.github/workflows/build-windows.yml` (runner `windows-latest`):

```bash
gh workflow run build-windows.yml --ref main -f release_tag=app-v1.0.0
```

Kết quả `KyNangKiemSat-Windows-Setup-<version>.exe` và `SHA256SUMS-windows.txt` được đính kèm vào
Release đã chọn. Build tại chỗ trên Windows: `npm ci && npx tauri build --bundles nsis`.

Đổi phiên bản: sửa `version` trong `src-tauri/tauri.conf.json` (và `Cargo.toml`).
