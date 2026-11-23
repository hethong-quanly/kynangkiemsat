//! Kỹ năng Kiểm sát — vỏ ứng dụng máy tính.
//!
//! Mở thẳng bản web https://hethong-quanly.github.io/kynangkiemsat/ trong cửa sổ
//! Edge WebView2 riêng (không thanh địa chỉ), nên luôn tự cập nhật theo bản web.
//! Chỉ các trang thuộc phạm vi ứng dụng được mở trong cửa sổ; liên kết ngoài
//! được chuyển sang trình duyệt mặc định của máy.

use tauri::webview::NewWindowResponse;
use tauri::{Manager, WebviewUrl, WebviewWindowBuilder};
use url::Url;

const APP_HOST: &str = "hethong-quanly.github.io";
const APP_PATH: &str = "/kynangkiemsat";
const START_URL: &str = "https://hethong-quanly.github.io/kynangkiemsat/?vao=1";

/// Trang được phép hiển thị ngay trong cửa sổ ứng dụng.
fn in_app_scope(u: &Url) -> bool {
    match u.scheme() {
        "https" => {
            u.host_str() == Some(APP_HOST)
                && (u.path() == APP_PATH || u.path().starts_with("/kynangkiemsat/"))
        }
        // Nội dung do chính trang tạo ra (tệp tải về, xem trước, in).
        "blob" | "data" | "about" => true,
        _ => false,
    }
}

/// Liên kết ngoài được giao cho trình duyệt / ứng dụng mặc định.
fn open_outside(u: &Url) {
    if matches!(u.scheme(), "https" | "http" | "mailto" | "tel" | "zalo") {
        let _ = tauri_plugin_opener::open_url(u.as_str(), None::<&str>);
    }
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_single_instance::init(|app, _args, _cwd| {
            // Mở lần hai: đưa cửa sổ đang chạy lên trước thay vì mở thêm.
            if let Some(w) = app.get_webview_window("main") {
                let _ = w.unminimize();
                let _ = w.show();
                let _ = w.set_focus();
            }
        }))
        .plugin(tauri_plugin_opener::init())
        .setup(|app| {
            let start: Url = START_URL.parse().expect("START_URL hợp lệ");
            WebviewWindowBuilder::new(app, "main", WebviewUrl::External(start))
                .title("Kỹ năng Kiểm sát")
                .inner_size(1280.0, 820.0)
                .min_inner_size(400.0, 600.0)
                .center()
                .resizable(true)
                .on_navigation(|u| {
                    if in_app_scope(u) {
                        true
                    } else {
                        open_outside(u);
                        false
                    }
                })
                .on_new_window(|u, _features| {
                    if u.scheme() == "blob" || u.scheme() == "about" {
                        // Cửa sổ xem trước / in do trang tạo ra.
                        NewWindowResponse::Allow
                    } else {
                        // target=_blank, window.open: mở bằng trình duyệt mặc định.
                        open_outside(&u);
                        NewWindowResponse::Deny
                    }
                })
                .build()?;
            Ok(())
        })
        .run(tauri::generate_context!())
        .expect("không khởi động được Kỹ năng Kiểm sát");
}
