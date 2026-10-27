# Phân tích sư phạm — Bài 55: Phép trừ trong phạm vi 10 000 (BÀI MỚI — BẢN NHÁP CHỜ DUYỆT)

Mẫu: khối "LUYỆN THÔNG MINH" ở đầu `engine.js`; cách dựng mục tiêu x dạng như `bai-44.js`; phép tính cột dọc theo `nhanDoc`/`chiaDoc3` (bài 36, 37, 41) mở rộng lên bốn chữ số; `okEq` (bài 41) cho câu «đồng ý, vì …».
Phạm vi: tạo mới `bai-55.js`, `bai-55.html`, thêm 55 vào `AVAILABLE` (giữ CRLF, diff 1 dòng) và file này. Không đụng `engine.js`, `figures.js`, `lua.js`. Chưa viết dòng mã nào.
Tham số engine: `goal:10, soCau:18, soCauToiDa:24`. Quy tắc mã: nối chuỗi, không template literal, không emoji, không số thập phân hay số âm; mọi kết quả trong phạm vi 10 000 (tích luôn bé hơn 10 000); số dư luôn bé hơn số chia; `check()` tính lại từ chuỗi SVG hoặc từ số đo trong câu, không đoán.

## 0. Nguồn và điều cần lưu ý
Nội dung SGK Tập 2 (Kết nối tri thức, Chủ đề 10: Cộng, trừ, nhân, chia trong phạm vi 10 000) lấy từ **tóm tắt của phiên Claude trên máy thầy**; phiên đám mây chưa đối chiếu sách, không chép hình hay đoạn văn của sách. Số trong câu do mã chọn ngẫu nhiên; chỉ giữ dạng và độ khó theo sách.
- Sách tr.41-42: 3 143 − 1 634 = 1 509 (nhớ); 5 274 − 2 928 = 2 346; 7 668 − 5 809 = 1 859; 2 384 − 827 = 1 557; 6 729 − 43 = 6 686; 4 291 − 3 864 = 427; 8 380 − 6 425 = 1 955; 6 635 − 807 = 5 828; sông Nin 6 650 km, sông Hồng 1 149 km: hơn 5 501 km; nhẩm 7 000 − 3 000, 10 000 − 6 000; 7 500 − 300 = 7 200; 4 300 − 2 000; 6 378 − 2 549 = 3 829; 5 624 − 4 718 = 906; 4 628 − 719 = 3 909; 8 372 − 39 = 8 333; xe chở 9 000 l dầu, bơm 2 500 l rồi 2 200 l: còn 4 300 l.
- Lỗi hay gặp: quên mượn; trừ ngược chữ số bé cho chữ số lớn; trừ sai khi số bị trừ có chữ số 0 (4 291 − 3 864, 5 624 − 4 718); đặt tính lệch hàng (6 729 − 43).

## 1. Ba mục tiêu x ba mức

| MT | Tên | Mức 1 | Mức 2 | Mức 3 |
|---|---|---|---|---|
| MT1 | Trừ có nhớ (đặt tính) | Nhớ một lần; điền một chữ số của hiệu. | Nhớ nhiều lần, số bị trừ có chữ số 0 (4 291 − 3 864); điền cả hiệu. | Số bị trừ bốn chữ số, số trừ hai hoặc ba chữ số (6 729 − 43, 2 384 − 827); thử lại bằng phép cộng; bạn An quên mượn. |
| MT2 | Nhẩm số tròn nghìn, tròn trăm | 7 000 − 3 000; 9 000 − 7 000. | 7 500 − 300; 6 700 − 600. | 10 000 − 6 000; 8 400 − 6 000. |
| MT3 | Toán đố một, hai bước | Cao hơn bao nhiêu mét (3 143 − 1 634). | Dài hơn bao nhiêu km (6 650 − 1 149). | Xe chở 9 000 l, bơm hai lần: còn lại (hai bước); tìm số bị trừ chưa biết. |

## 2. Mười dạng (topics)

| # | Dạng | Nguồn | MT | Mức 1 / Mức 2 / Mức 3 | Hình | Nhãn lỗi chính |
|---|---|---|---|---|---|---|
| D1 | Đặt tính trừ, điền một chữ số | SGK (khám phá, bài 1) | MT1 | M1: mượn một lần · M2: mượn hai lần · M3: mượn qua chữ số 0 | cột dọc 4 chữ số (SVG, data-pt) | `quen-muon`, `tru-nguoc` |
| D2 | Đặt tính trừ, điền hiệu | SGK (bài 1, 3) | MT1 | M1: 5 274 − 2 928 · M2: 4 291 − 3 864 · M3: 6 378 − 2 549 | cột dọc 4 chữ số (SVG) | `quen-muon`, `tru-nguoc` |
| D3 | Hai số khác số chữ số | SGK (bài 1, 3) | MT1 | M1: 2 384 − 827 · M2: 6 729 − 43 · M3: 4 628 − 719 | cột dọc, đặt thẳng hàng (SVG) | `dat-lech-hang`, `quen-muon` |
| D4 | Nhẩm tròn nghìn | SGK (bài 2) | MT2 | M1: 7 000 − 3 000 · M2: 9 000 − 7 000 · M3: 10 000 − 6 000 | chữ | `nham-hang` |
| D5 | Nhẩm tròn trăm | SGK (bài 2) | MT2 | M1: 7 500 − 300 · M2: 6 700 − 600 · M3: 8 400 − 6 000 | chữ | `nham-hang` |
| D6 | Cao hơn, dài hơn bao nhiêu | SGK (khám phá, bài 4) | MT3 | M1: 3 143 − 1 634 · M2: 6 650 − 1 149 · M3: số khác | `svgHinh` hai cột | `thieu-buoc` |
| D7 | Xe chở dầu (hai bước) | SGK (bài 5) | MT3 | M1: bơm một lần · M2: bơm hai lần (9 000 − 2 500 − 2 200) · M3: bơm ba lần | chữ, sơ đồ (SVG) | `thieu-buoc` |
| D8 | Tìm số bị trừ, số trừ | **không có trong SGK** | MT3 | M1: ? − 2 000 = 5 000 · M2: 7 500 − ? = 7 200 · M3: ? − 827 = 1 557 | chữ | `cong-thay-tru` |
| D9 | Thử lại bằng phép cộng | **không có trong SGK** | MT1 | M1: hiệu + số trừ · M2: chọn phép tính đúng · M3: tìm phép tính sai | cột dọc (SVG) | `tru-nguoc` |
| D10 | Bạn An làm | **không có trong SGK** | MT1 | M1: An tính, em có đồng ý không · M2: An sai ở đâu · M3: kết quả đúng | `anh('boy')`, cột dọc | `quen-muon`, `tru-nguoc` |

### Luật lời câu hỏi
- Câu «… có … không?» dùng Có / Không; mọi đẳng thức trong phương án đúng số học; đúng một đáp án; số dư luôn bé hơn số chia.

## 3. Nhãn lỗi
`quen-muon`, `tru-nguoc`, `dat-lech-hang`, `nham-hang`, `thieu-buoc`, `cong-thay-tru` (tên gợi ý, đặt trong mã).

## Rủi ro chung
Font Linux khác máy thầy (thầy soát lại trên Vercel). Phép tính cột dọc bốn chữ số rộng hơn ba chữ số: phải co vừa 375 px, các chữ số không đè nhau, số nhớ nhỏ nhưng không dưới 14 px. Số có bốn chữ số viết có khoảng trắng không ngắt ở hàng nghìn ("2 729"); ô nhập là số nguyên không dấu cách.

## Việc sẽ làm sau khi thầy duyệt
Viết `bai-55.js`, chép `bai-55.html`, sửa `index.html`; chạy đủ cổng; PR [XONG] Bài 55.

## Cần thầy quyết (kèm đề xuất)
1. Bảng dạng đúng chưa? Đề xuất: đúng như bảng.
2. D8, D9, D10 ngoài SGK: giữ (**đề xuất**).
