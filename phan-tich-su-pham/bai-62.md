# Phân tích sư phạm — Bài 62: Luyện tập chung (Chủ đề 11) (BÀI MỚI — BẢN NHÁP CHỜ DUYỆT)

Mẫu: khối "LUYỆN THÔNG MINH" ở đầu `engine.js`; cách dựng mục tiêu x dạng như `bai-44.js`; chép hàm từ bài 59–61 (bảng hàng, tia số, máy làm tròn).
Phạm vi: tạo mới `bai-62.js`, `bai-62.html`, thêm 62 vào `AVAILABLE` (giữ CRLF, diff 1 dòng) và file này. Không đụng `engine.js`, `figures.js`, `lua.js`. Chưa viết dòng mã nào.
Tham số engine: `goal:10, soCau:18, soCauToiDa:24`. Quy tắc mã: nối chuỗi, không template literal, không emoji, không số thập phân hay số âm; mọi số trong phạm vi 100 000 (kết quả cộng, trừ không quá 100 000); `check()` tính lại từ chuỗi SVG hoặc từ số liệu trong câu, không đoán.

## 0. Nguồn và điều cần lưu ý
Nội dung SGK Tập 2 (Kết nối tri thức, Chủ đề 11: Các số đến 100 000) lấy từ **tóm tắt của phiên Claude trên máy thầy**; phiên đám mây chưa đối chiếu sách, không chép hình hay đoạn văn của sách. Số trong câu do mã chọn ngẫu nhiên; chỉ giữ dạng và độ khó theo sách.
- Sách tr.66-69: bảng viết, đọc số (51 254 «năm mươi mốt nghìn hai trăm năm mươi tư»; 38 519; 26 856; 79 600); dãy 67 210, 67 220, 67 230, ?, ?; 46 600, 46 700, ?, 46 900, ?; 79 000, ?, 81 000, 82 000, ?; khoảng cách ong đến vườn: hoa hồng 42 890 m, hoa lan 35 000 m, hoa cúc 45 050 m, hướng dương 25 090 m (xa nhất, gần nhất). Trò chơi «Thả bóng vào rổ» bỏ qua.
- Lỗi hay gặp: bỏ chữ số 0; nhầm bước nhảy trên dãy số; so sánh sai các số gần nhau.

## 1. Ba mục tiêu x ba mức

| MT | Tên | Mức 1 | Mức 2 | Mức 3 |
|---|---|---|---|---|
| MT1 | Đọc, viết số | Viết số từ lời (38 519). | Đọc số có hàng 0 (79 600, 80 104). | Số có hai chữ số 0. |
| MT2 | Dãy số, so sánh, xếp thứ tự | Dãy cách 10 (67 210, 67 220 ...). | Dãy cách 100, cách 1 000; khoảng cách xa nhất. | Xếp bốn số; gần nhất; liền trước, liền sau. |
| MT3 | Làm tròn và phân tích | Làm tròn đến hàng nghìn. | Làm tròn đến hàng chục nghìn. | Phân tích số có hàng 0; ước lượng. |

## 2. Mười dạng (topics)

| # | Dạng | Nguồn | MT | Mức 1 / Mức 2 / Mức 3 | Hình | Nhãn lỗi chính |
|---|---|---|---|---|---|---|
| D1 | Đọc số, chọn số | SGK (bài 1) | MT1 | M1: không có 0 · M2: có 0 · M3: nhiều chữ số 0 | chữ | `bo-so-0` |
| D2 | Viết số từ lời | SGK (bài 1) | MT1 | M1: 3 chục nghìn 8 nghìn ... · M2: có hàng 0 · M3: lời đọc dài | chữ | `bo-so-0` |
| D3 | Bảng hàng | SGK (bài 1) | MT1 | M1: điền chữ số · M2: viết số · M3: hàng 0 | bảng hàng (SVG) | `nham-hang` |
| D4 | Dãy số cách 10 | SGK (bài 2) | MT2 | M1: 67 210, 67 220, ... · M2: cách 100 · M3: cách 1 000 | dãy (SVG, data-seq) | `dem-sai-buoc` |
| D5 | Khoảng cách ong | SGK (bài 3) | MT2 | M1: xa nhất · M2: gần nhất · M3: xa thứ hai | chữ, ong (`anh`) | `so-sanh-hang` |
| D6 | Xếp thứ tự | SGK (bài 3) | MT2 | M1: 3 số · M2: 4 số · M3: lớn đến bé | thẻ | `sai-thu-tu` |
| D7 | Làm tròn | SGK (bài 3, 4) | MT3 | M1: hàng nghìn · M2: hàng chục nghìn · M3: khoảng | chữ | `lam-tron-nham-5` |
| D8 | Phân tích số | SGK (bài 3, 4) | MT3 | M1: 54 766 · M2: có hàng 0 · M3: tìm số hạng ở giữa | chữ | `nham-hang` |
| D9 | Đúng hay sai | **không có trong SGK** | MT2 | M1: một câu · M2: có biểu thức · M3: chọn câu đúng | chữ | `so-sanh-hang` |
| D10 | Bạn An làm | **không có trong SGK** | MT1 | M1: An viết số, em đồng ý không · M2: An sai ở đâu · M3: số đúng | `anh('boy')` | `bo-so-0` |

### Luật lời câu hỏi
- Câu «… có … không?» dùng Có / Không; mọi đẳng thức trong phương án đúng số học; đúng một đáp án.

## 3. Nhãn lỗi
Chép từ bài 59–61: `bo-so-0`, `nham-hang`, `dem-sai-buoc`, `so-sanh-hang`, `sai-thu-tu`, `lam-tron-nham-5`.

## Rủi ro chung
Font Linux khác máy thầy (thầy soát lại trên Vercel). số năm chữ số rộng hơn bốn chữ số: phải co vừa 375 px, không chữ nào dưới 14 px, không chữ đè nhau. Số có năm chữ số viết có khoảng trắng không ngắt ở hàng nghìn ("12 324"); ô nhập là số nguyên không dấu cách.

## Việc sẽ làm sau khi thầy duyệt
Viết `bai-62.js` (chép hàm cần dùng từ bài 59–61), chép `bai-62.html`, sửa `index.html`; chạy đủ cổng; PR [XONG] Bài 62.

## Cần thầy quyết (kèm đề xuất)
1. Bài 62 dùng lại dạng bài 59–61 (ôn tập): đồng ý (**đề xuất**).
2. Làm bài 62 sau cùng trong chủ đề.
