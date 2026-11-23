# Ứng dụng Android (TWA)

`twa-manifest.json` là cấu hình Bubblewrap (gói `io.github.hethongquanly.kynangkiemsat`, targetSdk 36, minSdk 24). Keystore và mật khẩu **không** nằm trong repo.

Build lại: `bubblewrap update --manifest=twa-manifest.json` rồi `bubblewrap build` (cần JDK 17, Android SDK; biến môi trường `BUBBLEWRAP_KEYSTORE_PASSWORD`, `BUBBLEWRAP_KEY_PASSWORD`). Tăng `appVersionCode` mỗi lần phát hành.
