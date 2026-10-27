# Phân tích sư phạm — Bài 63: Phép cộng trong phạm vi 100 000 (BÀI MỚI — BẢN NHÁP CHỜ DUYỆT)

Mẫu: khối "LUYỆN THÔNG MINH" ở đầu `engine.js`; cách dựng mục tiêu x dạng như `bai-44.js`; phép cộng cột dọc `congDoc` (bài 54) mở rộng lên năm chữ số; nhẩm theo `bai-54.js`.
Phạm vi: tạo mới `bai-63.js`, `bai-63.html`, thêm 63 vào `AVAILABLE` (giữ CRLF, diff 1 dòng) và file này. Không đụng `engine.js`, `figures.js`, `lua.js`. Chưa viết dòng mã nào.
Tham số engine: `goal:10, soCau:18, soCauToiDa:24`. Quy tắc mã: nối chuỗi, không template literal, không emoji, không số thập phân hay số âm; mọi số trong phạm vi 100 000 (kết quả cộng, trừ không quá 100 000); `check()` tính lại từ chuỗi SVG hoặc từ số liệu trong câu, không đoán.

## 0. Nguồn và điều cần lưu ý
Nội dung SGK Tập 2 (Kết nối tri thức, Chủ đề 12: Cộng, trừ trong phạm vi 100 000) lấy từ **tóm tắt của phiên Claude trên máy thầy**; phiên đám mây chưa đối chiếu sách, không chép hình hay đoạn văn của sách. Số trong câu do mã chọn ngẫu nhiên; chỉ giữ dạng và độ khó theo sách.
- Sách tr.70-72: 12 547 + 23 628 = 36 175 (nhớ); 86 362 + 918 = 87 280; 93 246 + 4 825 = 98 071; 67 294 + 25 431 = 92 725; 43 835 + 55 807 = 99 642; 25 346 + 37 292 = 62 638; 67 254 + 92 = 67 346; 7 528 + 5 345 = 12 873; nhẩm 6 000 + 5 000 = 11 000; 30 000 + 50 000 = 80 000; 50 000 + 50 000 = 100 000; 25 000 + 4 000 = 29 000; biểu thức 35 000 + 27 000 + 13 000 = 75 000; 20 500 + 50 900 + 8 500 = 79 900; cửa hàng nhập 6 500 + 3 860 + 8 500 = 18 860 cuốn; hồ cá ba sa 10 800 con, lần hai nhiều hơn 950 con: cả hai lần 22 550 con; tìm chữ số bị che trong phép cộng cột dọc.
- Lỗi hay gặp: quên nhớ; nhớ sai hàng; đặt lệch hàng khi hai số khác số chữ số (86 362 + 918); nhẩm sai số chữ số 0.

## 1. Ba mục tiêu x ba mức

| MT | Tên | Mức 1 | Mức 2 | Mức 3 |
|---|---|---|---|---|
| MT1 | Cộng có nhớ (đặt tính) | Hai số năm chữ số, nhớ một lần: điền một chữ số. | Nhớ nhiều lần; điền cả tổng (tổng không quá 100 000). | Năm chữ số cộng ba hoặc bốn chữ số (86 362 + 918); chọn kết quả; bạn An quên nhớ. |
| MT2 | Nhẩm tròn nghìn, tròn chục nghìn | 6 000 + 5 000; 30 000 + 50 000. | 25 000 + 4 000; 49 000 + 2 000. | 50 000 + 50 000 = 100 000; biểu thức ba số hạng tròn nghìn. |
| MT3 | Toán đố, chữ số bị che | Cửa hàng nhập hai lần. | Hồ cá ba sa (nhiều hơn rồi cả hai). | Chữ số bị che trong phép cộng cột dọc, đáp án duy nhất. |

## 2. Mười dạng (topics)

| # | Dạng | Nguồn | MT | Mức 1 / Mức 2 / Mức 3 | Hình | Nhãn lỗi chính |
|---|---|---|---|---|---|---|
| D1 | Đặt tính cộng, điền một chữ số | SGK (khám phá, bài 1) | MT1 | M1: nhớ một lần · M2: nhớ hai lần · M3: nhớ ba lần | cột dọc 5 chữ số (SVG, data-pt) | `quen-nho`, `nho-sai-hang` |
| D2 | Đặt tính cộng, điền tổng | SGK (bài 1) | MT1 | M1: nhớ một lần · M2: nhớ hai lần · M3: nhớ ba, bốn lần | cột dọc 5 chữ số (SVG) | `quen-nho` |
| D3 | Hai số khác số chữ số | SGK (bài 1) | MT1 | M1: 5 chữ số + 3 chữ số · M2: 5 chữ số + 2 chữ số · M3: 4 chữ số + 5 chữ số | cột dọc thẳng hàng (SVG) | `dat-lech-hang` |
| D4 | Nhẩm tròn nghìn | SGK (bài 2) | MT2 | M1: 6 000 + 5 000 · M2: 9 000 + 4 000 · M3: 7 000 + 9 000 | chữ | `nham-hang` |
| D5 | Nhẩm tròn chục nghìn | SGK (bài 2) | MT2 | M1: 30 000 + 50 000 · M2: 40 000 + 20 000 · M3: 50 000 + 50 000 | chữ | `nham-hang` |
| D6 | Nhẩm nghìn cộng chục nghìn | SGK (bài 2) | MT2 | M1: 25 000 + 4 000 · M2: 49 000 + 2 000 · M3: 55 000 + 5 000 | chữ | `nham-hang` |
| D7 | Biểu thức và cửa hàng nhập sách | SGK (bài 3, 4) | MT3 | M1: hai số hạng · M2: ba số hạng · M3: ba số hạng không tròn nghìn | chữ | `thieu-buoc` |
| D8 | Hồ cá ba sa (hai bước) | SGK (bài 5) | MT3 | M1: lần hai nhiều hơn · M2: cả hai lần · M3: số lớn | sơ đồ (SVG) | `thieu-buoc` |
| D9 | Chữ số bị che | SGK (bài 6) | MT3 | M1: một ô ở tổng · M2: một ô ở số hạng · M3: hai ô, đáp án duy nhất | cột dọc có ô ? (SVG) | `quen-nho` |
| D10 | Bạn An làm | **không có trong SGK** | MT1 | M1: An tính, em đồng ý không · M2: An sai ở đâu · M3: kết quả đúng | `anh('boy')`, cột dọc | `quen-nho`, `nho-sai-hang` |

### Luật lời câu hỏi
- Câu «… có … không?» dùng Có / Không; mọi đẳng thức trong phương án đúng số học; đúng một đáp án.

## 3. Nhãn lỗi
`quen-nho`, `nho-sai-hang`, `dat-lech-hang`, `nham-hang`, `thieu-buoc` (tên gợi ý, đặt trong mã).

## Rủi ro chung
Font Linux khác máy thầy (thầy soát lại trên Vercel). phép tính cột dọc năm chữ số (hình mới, dựng từ bài 54–57) phải co vừa 375 px, các chữ số không đè nhau, số nhớ không nhỏ hơn 14 px. Số có năm chữ số viết có khoảng trắng không ngắt ở hàng nghìn ("12 324"); ô nhập là số nguyên không dấu cách.

## Việc sẽ làm sau khi thầy duyệt
Viết `bai-63.js`, chép `bai-63.html`, sửa `index.html`; chạy đủ cổng; PR [XONG] Bài 63.

## Cần thầy quyết (kèm đề xuất)
1. Bảng dạng đúng chưa? Đề xuất: đúng như bảng.
2. D9 do mã tự dựng, đáp án duy nhất kiểm bằng máy: đồng ý (**đề xuất**).
3. D10 ngoài SGK: giữ (**đề xuất**).
