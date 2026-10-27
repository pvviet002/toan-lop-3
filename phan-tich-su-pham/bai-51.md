# Phân tích sư phạm — Bài 51: Diện tích của một hình. Xăng-ti-mét vuông (BÀI MỚI — BẢN NHÁP CHỜ DUYỆT)

Mẫu: khối "LUYỆN THÔNG MINH" ở đầu `engine.js`; hình `svgHinh`, `luoiHinh43` và `gapKhuc` (bài 43), `okEq` (bài 41); cách dựng mục tiêu x dạng như `bai-44.js`.
Phạm vi: tạo mới `bai-51.js`, `bai-51.html`, thêm 51 vào `AVAILABLE` (giữ CRLF, diff 1 dòng) và file này. Không đụng `engine.js`, `figures.js`, `lua.js`. Chưa viết dòng mã nào.
Tham số engine: `goal:10, soCau:18, soCauToiDa:24`. Quy tắc mã: nối chuỗi, không template literal, không emoji, không số thập phân hay số âm; hình hình học do mã dựng bằng toạ độ nguyên, `check()` tính lại từ chuỗi SVG (data-*), không đoán.

## 0. Nguồn và điều cần lưu ý
Nội dung SGK Tập 2 (Kết nối tri thức, Chủ đề 9: Chu vi, diện tích một số hình phẳng) lấy từ **tóm tắt của phiên Claude trên máy thầy**; phiên đám mây chưa đối chiếu sách, không chép hình hay đoạn văn của sách. Số đo trong câu do mã chọn ngẫu nhiên.
- Sách tr.26-29: diện tích là phần mặt phẳng hình chiếm; hình nằm trong hình kia thì diện tích bé hơn; đếm ô vuông để so sánh (6 ô = 6 ô); cắt ghép (E = C + D, 10 ô = 6 ô + 4 ô). Xăng-ti-mét vuông (cm²) là diện tích hình vuông cạnh 1 cm. Đọc, viết: 15 cm², 234 cm², 1 500 cm² (một nghìn năm trăm xăng-ti-mét vuông), 10 000 cm². Tính với đơn vị: 2 cm² + 3 cm² = 5 cm²; 15 cm² x 4 = 60 cm²; 56 cm² : 7 = 8 cm²; cánh diều đỏ 900 cm², vàng 880 cm² nên đỏ hơn vàng 20 cm².
- Lỗi hay gặp: viết cm thay cm²; đếm sót hoặc đếm trùng ô; nhầm so sánh khi hình nằm trong hình.

## 1. Ba mục tiêu x ba mức

| MT | Tên | Mức 1 | Mức 2 | Mức 3 |
|---|---|---|---|---|
| MT1 | So sánh diện tích bằng trực quan | Hình nằm trong hình kia: hình nào bé hơn. | Đếm ô trên lưới: hình nào lớn hơn, hai hình có bằng nhau không. | Cắt ghép: E = C + D; hình vuông cắt chéo ghép thành tam giác. |
| MT2 | Xăng-ti-mét vuông: đọc, viết, đếm ô | Đọc số đo 15 cm²; đếm ô hình nhỏ. | Viết 234 cm²; đếm ô hình chữ nhật. | 1 500 cm², 10 000 cm²; đếm ô hình ghép. |
| MT3 | Tính với đơn vị xăng-ti-mét vuông | 2 cm² + 3 cm²; 50 cm² - 12 cm². | 37 cm² + 25 cm²; 15 cm² x 4; 56 cm² : 7. | Cánh diều đỏ 900 cm², vàng 880 cm²: hơn kém bao nhiêu. |

## 2. Mười dạng (topics)

| # | Dạng | Nguồn | MT | Mức 1 / Mức 2 / Mức 3 | Hình | Nhãn lỗi chính |
|---|---|---|---|---|---|---|
| D1 | Hình nằm trong hình | SGK (khám phá) | MT1 | M1: chữ nhật trong hình tròn · M2: tam giác ABC trong tam giác ADC · M3: ba hình lồng nhau | hình lồng nhau (SVG) | `so-sanh-dien-tich` |
| D2 | Đếm ô, so sánh hai hình | SGK (bài 1) | MT1 | M1: 6 ô và 6 ô · M2: 8 ô và 7 ô · M3: hai hình hình dạng khác, số ô gần nhau | lưới ô (SVG, data-cell) | `dem-sot-o`, `so-sanh-dien-tich` |
| D3 | Cắt ghép hình | SGK (khám phá, bài 2) | MT1 | M1: E = C + D, tìm D · M2: tìm E · M3: hai cách cắt cùng một hình | lưới ô (SVG, data-cell) | `dem-sot-o` |
| D4 | Đọc, viết xăng-ti-mét vuông | SGK (bài 3) | MT2 | M1: mười lăm xăng-ti-mét vuông · M2: hai trăm ba mươi tư · M3: một nghìn năm trăm, mười nghìn | chữ | `viet-cm-thay-cm2` |
| D5 | Đếm ô tính diện tích | SGK (bài 4) | MT2 | M1: hình 4 ô (con sâu) · M2: hình 12 ô · M3: hình ghép nhiều khối | lưới ô (SVG, data-cell) | `dem-sot-o` |
| D6 | Hình vuông cắt đường chéo | SGK (bài 1) | MT1 | M1: hai nửa bằng nhau · M2: ghép thành tam giác, diện tích bằng · M3: chọn hình có diện tích khác | lưới ô, đường chéo (SVG) | `so-sanh-dien-tich` |
| D7 | Cộng, trừ với cm² | SGK (bài 5) | MT3 | M1: 2 + 3 · M2: 37 + 25 · M3: 50 - 12, nhiều bước | chữ | `viet-cm-thay-cm2`, `nham-bang` |
| D8 | Nhân, chia với cm² | SGK (bài 5) | MT3 | M1: 5 x 2 · M2: 15 x 4 · M3: 56 : 7 | chữ | `viet-cm-thay-cm2`, `nham-bang` |
| D9 | Hai cánh diều | SGK (bài 6) | MT3 | M1: đỏ 900, vàng 880: diều nào lớn hơn · M2: lớn hơn bao nhiêu · M3: ba cánh diều, xếp thứ tự | `svgHinh` diều | `doc-de-sai` |
| D10 | Bạn An viết đơn vị | **không có trong SGK** | MT2 | M1: An viết 15 cm: đồng ý không · M2: An sai ở đâu · M3: viết đúng | `anh('boy')` | `viet-cm-thay-cm2` |

### Luật lời câu hỏi
- Câu «… có … không?» dùng Có / Không; mọi đẳng thức trong phương án đúng số học; đúng một đáp án; mọi số đo cùng đơn vị trước khi tính.

## 3. Nhãn lỗi
`so-sanh-dien-tich`, `dem-sot-o`, `viet-cm-thay-cm2`, `nham-bang`, `doc-de-sai` (tên gợi ý, đặt trong mã).

## Rủi ro chung
Font Linux khác máy thầy (thầy soát lại trên Vercel). Nhãn số đo trên cạnh hình phải không đè lên nhau ở 375 px (đặt nhãn lệch ra ngoài cạnh). Mọi kết quả trong phạm vi 10 000, không số thập phân. Đơn vị viết đủ: cm, dm, m; diện tích viết cm² (viết bằng ký tự "²", không dùng "^2").

## Việc sẽ làm sau khi thầy duyệt
Viết `bai-51.js`, chép `bai-51.html`, sửa `index.html`; chạy đủ cổng (kiểm đếm ô); PR [XONG] Bài 51.

## Cần thầy quyết (kèm đề xuất)
1. Bảng dạng đúng chưa? Đề xuất: đúng như bảng.
2. Hình con vật trên lưới của sách thay bằng hình nhiều ô do mã dựng: đồng ý (**đề xuất**).
3. D10 ngoài SGK: giữ (**đề xuất**).
