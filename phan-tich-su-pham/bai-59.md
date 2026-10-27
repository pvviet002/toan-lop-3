# Phân tích sư phạm — Bài 59: Các số có năm chữ số. Số 100 000 (BÀI MỚI — BẢN NHÁP CHỜ DUYỆT)

Mẫu: khối "LUYỆN THÔNG MINH" ở đầu `engine.js`; cách dựng mục tiêu x dạng như `bai-44.js`; bảng hàng và tia số theo `bai-45.js` (bốn chữ số) mở rộng lên năm chữ số.
Phạm vi: tạo mới `bai-59.js`, `bai-59.html`, thêm 59 vào `AVAILABLE` (giữ CRLF, diff 1 dòng) và file này. Không đụng `engine.js`, `figures.js`, `lua.js`. Chưa viết dòng mã nào.
Tham số engine: `goal:10, soCau:18, soCauToiDa:24`. Quy tắc mã: nối chuỗi, không template literal, không emoji, không số thập phân hay số âm; mọi số trong phạm vi 100 000 (kết quả cộng, trừ không quá 100 000); `check()` tính lại từ chuỗi SVG hoặc từ số liệu trong câu, không đoán.

## 0. Nguồn và điều cần lưu ý
Nội dung SGK Tập 2 (Kết nối tri thức, Chủ đề 11: Các số đến 100 000) lấy từ **tóm tắt của phiên Claude trên máy thầy**, có đính chính nếu có; phiên đám mây chưa đối chiếu sách, không chép hình hay đoạn văn của sách. Số trong câu do mã chọn ngẫu nhiên; chỉ giữ dạng và độ khó theo sách.
- Sách tr.56-60: bảng hàng chục nghìn, nghìn, trăm, chục, đơn vị (1 chục nghìn 2 nghìn 3 trăm 2 chục 4 đơn vị = 12 324); 10 chục nghìn = 100 000 đọc «một trăm nghìn», liền sau 99 999; đọc, viết số có chữ số 0 (90 056, 50 602, 66 401); tia số 36 524 ... 36 530; số tròn chục nghìn; liền trước 13 450, liền sau 90 000, liền trước 10 001, liền sau 99 999; khung xe đạp đến 99 997; phân tích 54 766 = 50 000 + 4 000 + 700 + 60 + 6; Đúng/Sai về các số liên tiếp 13 820 đến 13 824; dãy cách 5 000; bạn An đố số (hàng chục nghìn là 8, làm tròn đến hàng chục thì chữ số hàng chục là 6, ...).
- Lỗi hay gặp: bỏ chữ số 0; nhầm hàng chục nghìn với hàng nghìn; liền sau 99 999 viết sai.

## 1. Ba mục tiêu x ba mức

| MT | Tên | Mức 1 | Mức 2 | Mức 3 |
|---|---|---|---|---|
| MT1 | Đọc, viết số có năm chữ số | Số không có 0 (12 324); số tròn chục nghìn (40 000). | Số có một chữ số 0 (90 056, 50 602). | Số có hai chữ số 0 (80 004), 100 000. |
| MT2 | Bảng hàng, tia số, liền trước, liền sau, phân tích | Bảng hàng; tia số bước 1; liền trước, liền sau. | Tia số bước 10, 1 000; dãy cách 5 000; phân tích số. | Liền trước, liền sau qua 99 999 và 10 000; khung xe 99 997; phân tích số có hàng 0. |
| MT3 | Suy luận về số | Chữ số hàng chục nghìn là 1. | Đúng/Sai về các số liên tiếp. | Bạn An đố số: hàng và làm tròn. |

## 2. Mười dạng (topics)

| # | Dạng | Nguồn | MT | Mức 1 / Mức 2 / Mức 3 | Hình | Nhãn lỗi chính |
|---|---|---|---|---|---|---|
| D1 | Đọc số, chọn số | SGK (khám phá, bài 5) | MT1 | M1: không có 0 · M2: một chữ số 0 · M3: hai chữ số 0, 100 000 | chữ | `bo-so-0`, `doc-sai-hang` |
| D2 | Viết số từ lời | SGK (bài 4) | MT1 | M1: 1 chục nghìn 5 nghìn 8 trăm 2 chục 6 đơn vị · M2: có hàng 0 (32 043) · M3: lời đọc dài | chữ | `bo-so-0` |
| D3 | Bảng hàng năm hàng | SGK (bài 1) | MT2 | M1: điền chữ số các hàng · M2: viết số từ bảng · M3: bảng có hàng 0 | bảng hàng (SVG, data-cot) | `nham-hang`, `bo-so-0` |
| D4 | Tia số | SGK (bài 2) | MT2 | M1: bước 1 (36 524 ...) · M2: bước 10, 1 000 · M3: qua tròn chục nghìn | tia số (SVG, data-seq) | `dem-sai-buoc` |
| D5 | Số tròn chục nghìn, dãy cách 5 000 | SGK (bài 3, luyện tập) | MT2 | M1: 40 000, 80 000 · M2: dãy cách 5 000 · M3: ô trống xa nhau | chữ, dãy (SVG) | `dem-sai-buoc` |
| D6 | Liền trước, liền sau | SGK (bài 6) | MT2 | M1: liền trước 13 450 · M2: liền sau 90 000, liền trước 10 001 · M3: liền sau 99 999 là 100 000 | chữ | `nham-truoc-sau` |
| D7 | Phân tích số | SGK (bài 8) | MT2 | M1: 54 766 · M2: 15 000 = 10 000 + ? · M3: 37 059 có hai hàng 0 | chữ | `nham-hang` |
| D8 | Chữ số ở hàng nào | SGK (bài 9) | MT3 | M1: hàng chục nghìn là 1 · M2: hàng nghìn, hàng trăm · M3: hàng chục, đơn vị | chữ | `nham-hang` |
| D9 | Các số liên tiếp: đúng hay sai | SGK (bài 10) | MT3 | M1: một câu đúng · M2: một câu sai · M3: chọn câu sai trong ba câu | chữ | `nham-truoc-sau` |
| D10 | Bạn An đố số | SGK (bài 12) | MT3 | M1: một điều kiện · M2: hai điều kiện · M3: ba điều kiện (chọn trong bốn số) | chữ | `nham-hang`, `lam-tron-nham-5` |

### Luật lời câu hỏi
- Câu «… có … không?» dùng Có / Không; mọi đẳng thức trong phương án đúng số học; đúng một đáp án.

## 3. Nhãn lỗi
`bo-so-0`, `doc-sai-hang`, `nham-hang`, `dem-sai-buoc`, `nham-truoc-sau`, `lam-tron-nham-5` (tên gợi ý, đặt trong mã).

## Rủi ro chung
Font Linux khác máy thầy (thầy soát lại trên Vercel). số năm chữ số rộng hơn bốn chữ số: phải co vừa 375 px, không chữ nào dưới 14 px, không chữ đè nhau. Số có năm chữ số viết có khoảng trắng không ngắt ở hàng nghìn ("12 324"); ô nhập là số nguyên không dấu cách.

## Việc sẽ làm sau khi thầy duyệt
Viết `bai-59.js`, chép `bai-59.html`, sửa `index.html`; chạy đủ cổng; PR [XONG] Bài 59.

## Cần thầy quyết (kèm đề xuất)
1. Bảng dạng đúng chưa? Đề xuất: đúng như bảng.
2. Số 100 000 chỉ xuất hiện ở các mức 3: đồng ý (**đề xuất**).
