# Phân tích sư phạm — Bài 56: Nhân số có bốn chữ số với số có một chữ số (BÀI MỚI — BẢN NHÁP CHỜ DUYỆT)

Mẫu: khối "LUYỆN THÔNG MINH" ở đầu `engine.js`; cách dựng mục tiêu x dạng như `bai-44.js`; phép tính cột dọc theo `nhanDoc`/`chiaDoc3` (bài 36, 37, 41) mở rộng lên bốn chữ số; `okEq` (bài 41) cho câu «đồng ý, vì …».
Phạm vi: tạo mới `bai-56.js`, `bai-56.html`, thêm 56 vào `AVAILABLE` (giữ CRLF, diff 1 dòng) và file này. Không đụng `engine.js`, `figures.js`, `lua.js`. Chưa viết dòng mã nào.
Tham số engine: `goal:10, soCau:18, soCauToiDa:24`. Quy tắc mã: nối chuỗi, không template literal, không emoji, không số thập phân hay số âm; mọi kết quả trong phạm vi 10 000 (tích luôn bé hơn 10 000); số dư luôn bé hơn số chia; `check()` tính lại từ chuỗi SVG hoặc từ số đo trong câu, không đoán.

## 0. Nguồn và điều cần lưu ý
Nội dung SGK Tập 2 (Kết nối tri thức, Chủ đề 10: Cộng, trừ, nhân, chia trong phạm vi 10 000) lấy từ **tóm tắt của phiên Claude trên máy thầy**; phiên đám mây chưa đối chiếu sách, không chép hình hay đoạn văn của sách. Số trong câu do mã chọn ngẫu nhiên; chỉ giữ dạng và độ khó theo sách.
- Sách tr.43-46: 1 034 × 2 = 2 068; 1 225 × 3 = 3 675 (nhớ); 1 014 × 5 = 5 070; 3 148 × 2 = 6 296; 2 109 × 3 = 6 327; 2 051 × 4 = 8 204; 1 103 × 3 = 3 309; 1 021 × 9 = 9 189; nhẩm 2 000 × 3 = 6 000; khu đất vuông cạnh 1 617 m: chu vi 6 468 m; 1 216 × 6 = 7 296; 1 205 × 8 = 9 640; 1 408 × 7 = 9 856; dãy 805 nhân 2 được 1 610, trừ 200 được 1 410, nhân 3 được 4 230; ba tàu mỗi tàu 3 050 l: 9 150 l; 4 trung đoàn x 1 300 người = 5 200, thêm 450 thành 5 650; tạ mèo, rùa (tổng bằng 2 lần một bên); tìm chữ số bị che trong phép nhân.
- Lỗi hay gặp: quên nhớ; thiếu chữ số 0 khi nhân với số có chữ số 0 (1 014 × 5); cộng số nhớ vào sai hàng; viết tích có ít chữ số hơn thực tế.

## 1. Ba mục tiêu x ba mức

| MT | Tên | Mức 1 | Mức 2 | Mức 3 |
|---|---|---|---|---|
| MT1 | Nhân có nhớ (đặt tính) | Không nhớ hoặc nhớ một lần (1 034 × 2, 1 225 × 3); điền một chữ số. | Nhớ nhiều lần (3 148 × 2, 1 216 × 6); điền cả tích. | Thừa số có chữ số 0 (1 014 × 5, 2 051 × 4, 1 021 × 9); bạn An quên nhớ hoặc thiếu 0. |
| MT2 | Nhẩm, dãy phép tính, tìm chữ số bị che | 2 000 × 3; 4 000 × 2. | Dãy 805 → × 2 → − 200 → × 3. | Tìm chữ số bị che trong phép nhân, đáp án duy nhất. |
| MT3 | Toán đố (chu vi, gấp lên, hai bước) | Ba tàu mỗi tàu 3 050 l: cả ba tàu. | Khu đất vuông cạnh 1 617 m: chu vi; 4 trung đoàn x 1 300. | Thêm 450 người (hai bước); tạ mèo, rùa. |

## 2. Mười dạng (topics)

| # | Dạng | Nguồn | MT | Mức 1 / Mức 2 / Mức 3 | Hình | Nhãn lỗi chính |
|---|---|---|---|---|---|---|
| D1 | Đặt tính nhân, điền một chữ số | SGK (khám phá, bài 1) | MT1 | M1: không nhớ · M2: nhớ một lần · M3: nhớ hai lần | cột dọc 4 chữ số (SVG, data-pt) | `quen-nho`, `nho-sai-hang` |
| D2 | Đặt tính nhân, điền tích | SGK (bài 1, 3) | MT1 | M1: 1 034 × 2 · M2: 3 148 × 2, 1 216 × 6 · M3: 1 408 × 7 | cột dọc 4 chữ số (SVG) | `quen-nho` |
| D3 | Thừa số có chữ số 0 | SGK (bài 1, 3) | MT1 | M1: 1 014 × 5 · M2: 2 051 × 4 · M3: 1 021 × 9, 1 008 × 9 | cột dọc (SVG) | `bo-so-0`, `quen-nho` |
| D4 | Nhẩm tròn nghìn | SGK (bài 2) | MT2 | M1: 2 000 × 3 · M2: 3 000 × 3 · M3: 2 000 × 4 | chữ | `nham-hang` |
| D5 | Dãy phép tính | SGK (bài 4) | MT2 | M1: 805 × 2 · M2: × 2 rồi − 200 · M3: × 2, − 200, × 3 | dãy mũi tên (SVG) | `sai-thu-tu-tinh` |
| D6 | Tìm chữ số bị che | SGK (bài 6) | MT2 | M1: ? ở hàng đơn vị · M2: ? ở hàng chục · M3: hai chữ số bị che, đáp án duy nhất | cột dọc có ô ? (SVG) | `quen-nho` |
| D7 | Chu vi khu đất vuông | SGK (bài 5) | MT3 | M1: cạnh 1 617 m · M2: cạnh 1 205 m · M3: cạnh 2 324 m | hình vuông (SVG) | `quen-nhan-bon` |
| D8 | Ba tàu, bốn trung đoàn | SGK (bài 5) | MT3 | M1: 3 050 × 3 · M2: 1 300 × 4 · M3: 1 300 × 4 rồi thêm 450 | chữ | `thieu-buoc` |
| D9 | Tạ mèo và rùa | SGK (bài 7) | MT3 | M1: một bên nặng · M2: tổng hai bên · M3: nâng được bao nhiêu gam | tạ đĩa (SVG, data-g) | `dem-sot-dia` |
| D10 | Bạn An làm | **không có trong SGK** | MT1 | M1: An tính, em có đồng ý không · M2: An sai ở đâu · M3: kết quả đúng | `anh('boy')`, cột dọc | `quen-nho`, `bo-so-0` |

### Luật lời câu hỏi
- Câu «… có … không?» dùng Có / Không; mọi đẳng thức trong phương án đúng số học; đúng một đáp án; số dư luôn bé hơn số chia.

## 3. Nhãn lỗi
`quen-nho`, `nho-sai-hang`, `bo-so-0`, `nham-hang`, `sai-thu-tu-tinh`, `quen-nhan-bon`, `thieu-buoc`, `dem-sot-dia` (tên gợi ý, đặt trong mã).

## Rủi ro chung
Font Linux khác máy thầy (thầy soát lại trên Vercel). Phép tính cột dọc bốn chữ số rộng hơn ba chữ số: phải co vừa 375 px, các chữ số không đè nhau, số nhớ nhỏ nhưng không dưới 14 px. Số có bốn chữ số viết có khoảng trắng không ngắt ở hàng nghìn ("2 729"); ô nhập là số nguyên không dấu cách.

## Việc sẽ làm sau khi thầy duyệt
Viết `bai-56.js`, chép `bai-56.html`, sửa `index.html`; chạy đủ cổng; PR [XONG] Bài 56.

## Cần thầy quyết (kèm đề xuất)
1. Bảng dạng đúng chưa? Đề xuất: đúng như bảng.
2. D6 (chữ số bị che) và D9 (tạ) do mã tự dựng số liệu, đáp án duy nhất bằng máy: đồng ý (**đề xuất**).
3. D10 ngoài SGK: giữ (**đề xuất**).
