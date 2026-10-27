# Phân tích sư phạm — Bài 65: Luyện tập chung (Chủ đề 12) (BÀI MỚI — BẢN NHÁP CHỜ DUYỆT)

Mẫu: khối "LUYỆN THÔNG MINH" ở đầu `engine.js`; cách dựng mục tiêu x dạng như `bai-44.js`; chép hàm từ bài 63, 64 (cột dọc năm chữ số, nhẩm).
Phạm vi: tạo mới `bai-65.js`, `bai-65.html`, thêm 65 vào `AVAILABLE` (giữ CRLF, diff 1 dòng) và file này. Không đụng `engine.js`, `figures.js`, `lua.js`. Chưa viết dòng mã nào.
Tham số engine: `goal:10, soCau:18, soCauToiDa:24`. Quy tắc mã: nối chuỗi, không template literal, không emoji, không số thập phân hay số âm; mọi số trong phạm vi 100 000 (kết quả cộng, trừ không quá 100 000); `check()` tính lại từ chuỗi SVG hoặc từ số liệu trong câu, không đoán.

## 0. Nguồn và điều cần lưu ý
Nội dung SGK Tập 2 (Kết nối tri thức, Chủ đề 12: Cộng, trừ trong phạm vi 100 000) lấy từ **tóm tắt của phiên Claude trên máy thầy**; phiên đám mây chưa đối chiếu sách, không chép hình hay đoạn văn của sách. Số trong câu do mã chọn ngẫu nhiên; chỉ giữ dạng và độ khó theo sách.
- Sách tr.76: nhẩm 30 000 + 6 000 − 20 000 = 16 000; 18 000 − 9 000 + 40 000 = 49 000; 80 000 − (40 000 + 10 000) = 30 000; 70 000 − (60 000 − 30 000) = 40 000; Đúng/Sai phép tính (32 467 + 2 825 = 60 717 sai, đúng 35 292; 62 958 − 473 = 62 485 đúng; 73 865 − 68 529 = 15 346 sai, đúng 5 336; 45 376 + 38 205 = 83 581 đúng); đặt tính 8 563 + 7 284, 42 758 + 9 235, 32 679 − 946, 83 627 − 76 253; cửa hàng xăng 16 500 l, nhập thêm 9 000 l, bán 17 350 l: còn 8 150 l; biểu thức 8 647 + 6 500 − 13 217 = 1 930; 15 654 − (7 460 + 2 140) = 6 054.
- Lỗi hay gặp: quên nhớ, quên mượn; bỏ ngoặc; sai thứ tự khi có cộng, trừ liên tiếp.

## 1. Ba mục tiêu x ba mức

| MT | Tên | Mức 1 | Mức 2 | Mức 3 |
|---|---|---|---|---|
| MT1 | Nhẩm và tính nhanh | Nhẩm hai phép tròn nghìn. | Nhẩm ba phép; có dấu ngoặc. | Nhẩm có ngoặc lồng nhau. |
| MT2 | Đặt tính cộng, trừ; Đúng/Sai | Đặt tính cộng, trừ một lần nhớ. | Đúng/Sai phép tính; nhớ hai lần. | Chọn phép tính sai và sửa lại; qua chữ số 0. |
| MT3 | Toán đố nhiều bước; biểu thức | Cửa hàng xăng: nhập thêm. | Nhập thêm rồi bán (ba bước). | Biểu thức có ngoặc số lớn. |

## 2. Mười dạng (topics)

| # | Dạng | Nguồn | MT | Mức 1 / Mức 2 / Mức 3 | Hình | Nhãn lỗi chính |
|---|---|---|---|---|---|---|
| D1 | Nhẩm ba số hạng | SGK (bài 1) | MT1 | M1: 30 000 + 6 000 − 20 000 · M2: 18 000 − 9 000 + 40 000 · M3: nhiều phép | chữ | `sai-thu-tu-tinh` |
| D2 | Nhẩm có dấu ngoặc | SGK (bài 1) | MT1 | M1: a − (b + c) · M2: a − (b − c) · M3: số lớn | chữ | `bo-ngoac` |
| D3 | Đúng hay sai phép tính | SGK (bài 2) | MT2 | M1: phép cộng · M2: phép trừ · M3: chọn phép sai trong bốn | chữ | `quen-nho`, `quen-muon` |
| D4 | Đặt tính cộng | SGK (bài 3) | MT2 | M1: 8 563 + 7 284 · M2: 42 758 + 9 235 · M3: nhớ nhiều lần | cột dọc (SVG) | `quen-nho` |
| D5 | Đặt tính trừ | SGK (bài 3) | MT2 | M1: 32 679 − 946 · M2: 83 627 − 76 253 · M3: mượn qua chữ số 0 | cột dọc (SVG) | `quen-muon` |
| D6 | Cửa hàng xăng | SGK (bài 4) | MT3 | M1: nhập thêm · M2: bán · M3: nhập thêm rồi bán (16 500 + 9 000 − 17 350) | chữ, sơ đồ (SVG) | `thieu-buoc` |
| D7 | Biểu thức ba số hạng | SGK (bài 5) | MT3 | M1: a + b − c · M2: 8 647 + 6 500 − 13 217 · M3: số lớn | chữ | `sai-thu-tu-tinh` |
| D8 | Biểu thức có ngoặc | SGK (bài 5) | MT3 | M1: a − (b + c) · M2: 15 654 − (7 460 + 2 140) · M3: ngoặc trừ | chữ | `bo-ngoac` |
| D9 | Tìm số hạng, số bị trừ | **không có trong SGK** | MT2 | M1: ? + 2 000 = 7 000 · M2: ? − 827 = 1 557 · M3: số năm chữ số | chữ | `cong-thay-tru` |
| D10 | Bạn An làm | **không có trong SGK** | MT2 | M1: An tính, em đồng ý không · M2: An sai ở đâu · M3: kết quả đúng | `anh('boy')` | `quen-nho`, `quen-muon` |

### Luật lời câu hỏi
- Câu «… có … không?» dùng Có / Không; mọi đẳng thức trong phương án đúng số học; đúng một đáp án.

## 3. Nhãn lỗi
Chép từ bài 63, 64: `quen-nho`, `quen-muon`, `bo-ngoac`, `thieu-buoc`, `cong-thay-tru`, `sai-thu-tu-tinh`.

## Rủi ro chung
Font Linux khác máy thầy (thầy soát lại trên Vercel). phép tính cột dọc năm chữ số (hình mới, dựng từ bài 54–57) phải co vừa 375 px, các chữ số không đè nhau, số nhớ không nhỏ hơn 14 px. Số có năm chữ số viết có khoảng trắng không ngắt ở hàng nghìn ("12 324"); ô nhập là số nguyên không dấu cách.

## Việc sẽ làm sau khi thầy duyệt
Viết `bai-65.js` (chép hàm cần dùng từ bài 63, 64), chép `bai-65.html`, sửa `index.html`; chạy đủ cổng; PR [XONG] Bài 65.

## Cần thầy quyết (kèm đề xuất)
1. Bài 65 dùng lại dạng bài 63, 64: đồng ý (**đề xuất**).
2. Làm bài 65 sau cùng trong chủ đề.
