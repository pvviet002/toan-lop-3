# Phân tích sư phạm — Bài 61: Làm tròn số đến hàng nghìn, hàng chục nghìn (BÀI MỚI — BẢN NHÁP CHỜ DUYỆT)

Mẫu: khối "LUYỆN THÔNG MINH" ở đầu `engine.js`; cách dựng mục tiêu x dạng như `bai-44.js`; máy làm tròn, trục số theo `bai-48.js` mở rộng lên năm chữ số.
Phạm vi: tạo mới `bai-61.js`, `bai-61.html`, thêm 61 vào `AVAILABLE` (giữ CRLF, diff 1 dòng) và file này. Không đụng `engine.js`, `figures.js`, `lua.js`. Chưa viết dòng mã nào.
Tham số engine: `goal:10, soCau:18, soCauToiDa:24`. Quy tắc mã: nối chuỗi, không template literal, không emoji, không số thập phân hay số âm; mọi số trong phạm vi 100 000 (kết quả cộng, trừ không quá 100 000); `check()` tính lại từ chuỗi SVG hoặc từ số liệu trong câu, không đoán.

## 0. Nguồn và điều cần lưu ý
Nội dung SGK Tập 2 (Kết nối tri thức, Chủ đề 11: Các số đến 100 000) lấy từ **tóm tắt của phiên Claude trên máy thầy**; phiên đám mây chưa đối chiếu sách, không chép hình hay đoạn văn của sách. Số trong câu do mã chọn ngẫu nhiên; chỉ giữ dạng và độ khó theo sách.
- Sách tr.64-66: làm tròn đến hàng nghìn: so chữ số hàng trăm với 5 (11 678 thành 12 000; 11 204 thành 11 000; 11 515 thành 12 000); đến hàng chục nghìn: so chữ số hàng nghìn với 5 (11 678 thành 10 000; 17 051 thành 20 000; 15 001 thành 20 000); bé hơn 5 làm tròn xuống, còn lại làm tròn lên. Bài: 65 341, 10 501, 9 805; 82 134, 55 712, 46 000; cà phê 13 787 kg khoảng 14 000 kg; số dân 71 839 làm tròn đến hàng chục nghìn là 70 000; vệ tinh cách đất 35 786 km: ba bạn nói 40 000, 35 800, 36 000 (mỗi bạn làm tròn đến hàng nào); 35 425 km: hàng nghìn 35 000, hàng chục nghìn 40 000 (hàng nghìn là 5 thì làm tròn lên).
- Lỗi hay gặp: làm tròn xuống khi chữ số bằng 5; nhầm hàng cần làm tròn; quên đổi hàng liền trước khi làm tròn lên (9 805 thành 10 000).

## 1. Ba mục tiêu x ba mức

| MT | Tên | Mức 1 | Mức 2 | Mức 3 |
|---|---|---|---|---|
| MT1 | Làm tròn đến hàng nghìn | Hàng trăm bé hơn 5 (11 204). | Hàng trăm từ 5 trở lên (11 678, 11 515). | Qua hàng chục nghìn (9 805 thành 10 000; 49 600 thành 50 000). |
| MT2 | Làm tròn đến hàng chục nghìn | Hàng nghìn bé hơn 5 (82 134). | Hàng nghìn từ 5 trở lên (55 712, 17 051). | Hàng nghìn bằng 5 (15 001, 46 000, 35 425); qua 100 000. |
| MT3 | Ước lượng «khoảng», nhiều hàng | Khoảng bao nhiêu (cà phê 13 787 kg). | Số dân 71 839 làm tròn đến hàng chục nghìn. | Vệ tinh 35 786 km: ba bạn làm tròn đến ba hàng khác nhau. |

## 2. Mười dạng (topics)

| # | Dạng | Nguồn | MT | Mức 1 / Mức 2 / Mức 3 | Hình | Nhãn lỗi chính |
|---|---|---|---|---|---|---|
| D1 | Làm tròn đến hàng nghìn | SGK (khám phá, bài 1) | MT1 | M1: hàng trăm < 5 · M2: hàng trăm >= 5 · M3: qua hàng chục nghìn | chữ | `lam-tron-nham-5`, `quen-nho-tron` |
| D2 | Làm tròn đến hàng chục nghìn | SGK (khám phá, bài 1) | MT2 | M1: hàng nghìn < 5 · M2: hàng nghìn >= 5 · M3: hàng nghìn bằng 5 | chữ | `lam-tron-nham-5` |
| D3 | Làm tròn đến hàng nào | SGK (bài 3) | MT3 | M1: 12 000 là số 11 678 làm tròn đến hàng nào · M2: 10 000 · M3: chọn hàng đúng cho ba số | chữ | `nham-hang-tron` |
| D4 | Khoảng bao nhiêu | SGK (bài 2) | MT3 | M1: cà phê 13 787 kg khoảng · M2: dân số làm tròn chục nghìn · M3: bốn đáp án | chữ, `anh` | `lam-tron-nham-5` |
| D5 | Máy làm tròn | **không có trong SGK** | MT3 | M1: hàng nghìn, tìm số ra · M2: hàng chục nghìn · M3: biết số ra, chọn số vào | máy (SVG, data-may) | `nham-hang-tron` |
| D6 | Ba bạn làm tròn vệ tinh | SGK (bài 4) | MT3 | M1: bạn nói 36 000 làm tròn hàng nào · M2: ba bạn ba hàng · M3: số 35 425 | chữ, `anh` | `nham-hang-tron` |
| D7 | Chữ số 5 ở giữa | SGK (bài 4, ý 2) | MT2 | M1: hàng nghìn 5, làm tròn chục nghìn · M2: hàng trăm 5 · M3: so hai kết quả | chữ | `lam-tron-nham-5` |
| D8 | Chọn kết quả | **không có trong SGK** | MT1 | M1: bốn đáp án hàng nghìn · M2: hàng chục nghìn · M3: đáp án gần nhau | chữ | `lam-tron-nham-5` |
| D9 | Đúng hay sai | **không có trong SGK** | MT2 | M1: một câu · M2: có biểu thức · M3: chọn câu đúng | chữ | `lam-tron-nham-5` |
| D10 | Bạn An làm tròn | **không có trong SGK** | MT2 | M1: An làm tròn, em đồng ý không · M2: An sai ở đâu · M3: kết quả đúng | `anh('boy')` | `lam-tron-nham-5` |

### Luật lời câu hỏi
- Câu «… có … không?» dùng Có / Không; mọi đẳng thức trong phương án đúng số học; đúng một đáp án.

## 3. Nhãn lỗi
`lam-tron-nham-5`, `nham-hang-tron`, `quen-nho-tron` (tên gợi ý, đặt trong mã).

## Rủi ro chung
Font Linux khác máy thầy (thầy soát lại trên Vercel). số năm chữ số rộng hơn bốn chữ số: phải co vừa 375 px, không chữ nào dưới 14 px, không chữ đè nhau. Số có năm chữ số viết có khoảng trắng không ngắt ở hàng nghìn ("12 324"); ô nhập là số nguyên không dấu cách.

## Việc sẽ làm sau khi thầy duyệt
Viết `bai-61.js`, chép `bai-61.html`, sửa `index.html`; chạy đủ cổng; PR [XONG] Bài 61.

## Cần thầy quyết (kèm đề xuất)
1. Bài sách ngắn nên D5, D8 đến D10 ngoài SGK: giữ (**đề xuất**).
2. Làm tròn lên khi chữ số bằng 5, đúng sách (**đề xuất**).
