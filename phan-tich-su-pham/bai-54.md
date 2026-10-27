# Phân tích sư phạm — Bài 54: Phép cộng trong phạm vi 10 000 (BÀI MỚI — BẢN NHÁP CHỜ DUYỆT)

Mẫu: khối "LUYỆN THÔNG MINH" ở đầu `engine.js`; cách dựng mục tiêu x dạng như `bai-44.js`; phép tính cột dọc theo `nhanDoc`/`chiaDoc3` (bài 36, 37, 41) mở rộng lên bốn chữ số; `okEq` (bài 41) cho câu «đồng ý, vì …».
Phạm vi: tạo mới `bai-54.js`, `bai-54.html`, thêm 54 vào `AVAILABLE` (giữ CRLF, diff 1 dòng) và file này. Không đụng `engine.js`, `figures.js`, `lua.js`. Chưa viết dòng mã nào.
Tham số engine: `goal:10, soCau:18, soCauToiDa:24`. Quy tắc mã: nối chuỗi, không template literal, không emoji, không số thập phân hay số âm; mọi kết quả trong phạm vi 10 000 (tích luôn bé hơn 10 000); số dư luôn bé hơn số chia; `check()` tính lại từ chuỗi SVG hoặc từ số đo trong câu, không đoán.

## 0. Nguồn và điều cần lưu ý
Nội dung SGK Tập 2 (Kết nối tri thức, Chủ đề 10: Cộng, trừ, nhân, chia trong phạm vi 10 000) lấy từ **tóm tắt của phiên Claude trên máy thầy**; phiên đám mây chưa đối chiếu sách, không chép hình hay đoạn văn của sách. Số trong câu do mã chọn ngẫu nhiên; chỉ giữ dạng và độ khó theo sách.
- Sách tr.38-40: đặt tính cộng có nhớ 2 729 + 4 827 = 7 556; 6 428 + 3 481 = 9 909; 2 576 + 4 518 = 7 094; 6 307 + 826 = 7 133; 837 + 524 = 1 361; đặt tính rồi tính 3 628 + 4 845, 4 252 + 5 284, 3 847 + 635; thóc của bác Hùng 2 530 kg, bác Dương nhiều hơn 550 kg thì 3 080 kg; nhẩm số tròn nghìn (5 nghìn + 3 nghìn = 8 nghìn), tròn trăm (4 200 + 600 = 4 800); kiến chọn cửa hàng có kết quả lớn nhất (5 800 + 2 000, 5 800 + 2 500, 5 800 + 2 200); toán hai bước 1 250 người, ngựa nhiều hơn 2 320 thì 3 570, cả hai 4 820.
- Lỗi hay gặp: quên nhớ; nhớ sai hàng; đặt tính lệch hàng khi hai số khác số chữ số (6 307 + 826); nhẩm sai số chữ số 0.

## 1. Ba mục tiêu x ba mức

| MT | Tên | Mức 1 | Mức 2 | Mức 3 |
|---|---|---|---|---|
| MT1 | Cộng có nhớ (đặt tính) | Hai số bốn chữ số, nhớ một lần; điền một chữ số của tổng. | Nhớ nhiều lần; điền cả tổng (6 428 + 3 481). | Một số bốn chữ số, một số ba chữ số (6 307 + 826, 837 + 524); chọn kết quả; bạn An quên nhớ. |
| MT2 | Nhẩm số tròn nghìn, tròn trăm | 6 000 + 2 000; 3 000 + 4 000. | 4 200 + 600; 8 600 + 200; 5 000 + 500. | 1 000 + 9 000 (tổng 10 000); chọn tổng lớn nhất trong ba phép (cửa hàng). |
| MT3 | Toán đố một, hai bước | Nhiều hơn: bác Hùng 2 530 kg, bác Dương nhiều hơn 550 kg. | Nhiều hơn rồi cộng cả hai (hai bước). | Hai bước có số lớn hơn; tìm số hạng chưa biết. |

## 2. Mười dạng (topics)

| # | Dạng | Nguồn | MT | Mức 1 / Mức 2 / Mức 3 | Hình | Nhãn lỗi chính |
|---|---|---|---|---|---|---|
| D1 | Đặt tính cộng, điền một chữ số | SGK (khám phá, bài 1) | MT1 | M1: nhớ một lần · M2: nhớ hai lần · M3: nhớ ba lần | cột dọc 4 chữ số (SVG, data-pt) | `quen-nho`, `nho-sai-hang` |
| D2 | Đặt tính cộng, điền tổng | SGK (bài 1, 2) | MT1 | M1: 2 576 + 4 518 · M2: 6 428 + 3 481 · M3: 3 628 + 4 845 | cột dọc 4 chữ số (SVG) | `quen-nho`, `nho-sai-hang` |
| D3 | Hai số khác số chữ số | SGK (bài 1) | MT1 | M1: 837 + 524 · M2: 6 307 + 826 · M3: 3 847 + 635 | cột dọc, đặt thẳng hàng (SVG) | `dat-lech-hang`, `quen-nho` |
| D4 | Nhẩm tròn nghìn | SGK (bài 3) | MT2 | M1: 6 000 + 2 000 · M2: 5 000 + 4 000 · M3: 1 000 + 9 000 | chữ | `nham-hang` |
| D5 | Nhẩm tròn trăm | SGK (bài 3) | MT2 | M1: 4 200 + 600 · M2: 3 200 + 700, 8 600 + 200 · M3: 6 100 + 800, 5 000 + 500 | chữ | `nham-hang` |
| D6 | Kiến chọn cửa hàng | SGK (bài 4) | MT2 | M1: hai phép · M2: ba phép (5 800 + 2 000, ...) · M3: ba phép gần nhau | chữ, ba cửa (SVG) | `so-sanh-sai` |
| D7 | Thóc của hai bác | SGK (bài 5) | MT3 | M1: 2 530 + 550 · M2: số khác · M3: cả hai bác | `anh` | `thieu-buoc`, `cong-thay-tru` |
| D8 | Người vận chuyển (hai bước) | SGK (bài 6) | MT3 | M1: số ngựa (1 250 + 2 320) · M2: cả hai (3 570 + 1 250) · M3: số khác | chữ, sơ đồ đoạn thẳng (SVG) | `thieu-buoc` |
| D9 | Tìm số hạng chưa biết | **không có trong SGK** | MT3 | M1: ? + 2 000 = 7 000 · M2: 4 500 + ? = 6 700 · M3: ? + 837 = 1 361 | chữ | `cong-thay-tru` |
| D10 | Bạn An làm | **không có trong SGK** | MT1 | M1: An tính, em có đồng ý không · M2: An sai ở đâu · M3: kết quả đúng | `anh('boy')`, cột dọc | `quen-nho`, `nho-sai-hang` |

### Luật lời câu hỏi
- Câu «… có … không?» dùng Có / Không; mọi đẳng thức trong phương án đúng số học; đúng một đáp án; số dư luôn bé hơn số chia.

## 3. Nhãn lỗi
`quen-nho`, `nho-sai-hang`, `dat-lech-hang`, `nham-hang`, `so-sanh-sai`, `thieu-buoc`, `cong-thay-tru` (tên gợi ý, đặt trong mã).

## Rủi ro chung
Font Linux khác máy thầy (thầy soát lại trên Vercel). Phép tính cột dọc bốn chữ số rộng hơn ba chữ số: phải co vừa 375 px, các chữ số không đè nhau, số nhớ nhỏ nhưng không dưới 14 px. Số có bốn chữ số viết có khoảng trắng không ngắt ở hàng nghìn ("2 729"); ô nhập là số nguyên không dấu cách.

## Việc sẽ làm sau khi thầy duyệt
Viết `bai-54.js`, chép `bai-54.html`, sửa `index.html`; chạy đủ cổng; PR [XONG] Bài 54.

## Cần thầy quyết (kèm đề xuất)
1. Bảng dạng đúng chưa? Đề xuất: đúng như bảng.
2. D9, D10 ngoài SGK để đủ 10 dạng: giữ (**đề xuất**).
3. Tổng 10 000 (1 000 + 9 000) chỉ xuất hiện ở nhẩm: đồng ý (**đề xuất**).
