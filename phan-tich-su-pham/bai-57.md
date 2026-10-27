# Phân tích sư phạm — Bài 57: Chia số có bốn chữ số cho số có một chữ số (BÀI MỚI — BẢN NHÁP CHỜ DUYỆT)

Mẫu: khối "LUYỆN THÔNG MINH" ở đầu `engine.js`; cách dựng mục tiêu x dạng như `bai-44.js`; phép tính cột dọc theo `nhanDoc`/`chiaDoc3` (bài 36, 37, 41) mở rộng lên bốn chữ số; `okEq` (bài 41) cho câu «đồng ý, vì …».
Phạm vi: tạo mới `bai-57.js`, `bai-57.html`, thêm 57 vào `AVAILABLE` (giữ CRLF, diff 1 dòng) và file này. Không đụng `engine.js`, `figures.js`, `lua.js`. Chưa viết dòng mã nào.
Tham số engine: `goal:10, soCau:18, soCauToiDa:24`. Quy tắc mã: nối chuỗi, không template literal, không emoji, không số thập phân hay số âm; mọi kết quả trong phạm vi 10 000 (tích luôn bé hơn 10 000); số dư luôn bé hơn số chia; `check()` tính lại từ chuỗi SVG hoặc từ số đo trong câu, không đoán.

## 0. Nguồn và điều cần lưu ý
Nội dung SGK Tập 2 (Kết nối tri thức, Chủ đề 10: Cộng, trừ, nhân, chia trong phạm vi 10 000) lấy từ **tóm tắt của phiên Claude trên máy thầy**; phiên đám mây chưa đối chiếu sách, không chép hình hay đoạn văn của sách. Số trong câu do mã chọn ngẫu nhiên; chỉ giữ dạng và độ khó theo sách.
- Sách tr.47-50: 6 408 : 2 = 3 204; 1 275 : 3 = 425; chia có dư 9 365 : 3 = 3 121 (dư 2), 2 249 : 4 = 562 (dư 1); 6 393 : 3 = 2 131; 6 606 : 6 = 1 101; 3 652 : 4 = 913; 4 575 : 5 = 915; trang trại vịt 4 500 con, trang trại thứ hai giảm 3 lần: 1 500 con, cả hai 6 000; 6 729 : 6 = 1 121 (dư 3); 4 163 : 8 = 520 (dư 3) kèm bảng số bị chia, số chia, thương, số dư; 6 308 người chia nhóm 7 người: 901 nhóm dư 1; 9 490 ngày gấp đôi ve sầu: 4 745; 5 025 : 5 = 1 005; 3 296 : 4 = 824; 7 369 : 8 = 921 (dư 1); nhẩm 8 000 : 2 = 4 000; so sánh 6 000 : 2 với 2 999; ba vệ tinh: B 1 527 km gấp 3 lần A thì A 509 km, C gấp 4 lần A thì 2 036 km.
- Lỗi hay gặp: quên hạ chữ số; thương thiếu chữ số 0 (6 606 : 6); số dư lớn hơn hoặc bằng số chia; nhầm thương với số dư.

## 1. Ba mục tiêu x ba mức

| MT | Tên | Mức 1 | Mức 2 | Mức 3 |
|---|---|---|---|---|
| MT1 | Chia hết (đặt tính, thương có chữ số 0) | 6 408 : 2; 1 275 : 3; điền một chữ số của thương. | Thương có chữ số 0 (6 606 : 6 = 1 101, 5 025 : 5). | Thương có hai chữ số 0; bạn An thiếu chữ số 0 ở thương. |
| MT2 | Chia có dư; bảng số bị chia, số chia, thương, số dư | Chia có dư với số chia 2, 3 (9 365 : 3). | Số chia 4 đến 6 (2 249 : 4, 6 729 : 6); điền số dư; chia nhóm (6 308 : 7). | Số chia 7, 8, 9 (4 163 : 8, 7 369 : 8); bảng bốn cột. |
| MT3 | Nhẩm, so sánh, toán đố (giảm, gấp lên) | 8 000 : 2; 9 000 : 3. | Điền >, <, = (6 000 : 2 ? 2 999); trang trại vịt giảm 3 lần. | Ba vệ tinh (gấp 3 lần, gấp 4 lần); kiến chúa gấp đôi ve sầu. |

## 2. Mười dạng (topics)

| # | Dạng | Nguồn | MT | Mức 1 / Mức 2 / Mức 3 | Hình | Nhãn lỗi chính |
|---|---|---|---|---|---|---|
| D1 | Đặt tính chia hết, điền một chữ số | SGK (khám phá, bài 1) | MT1 | M1: 6 408 : 2 · M2: 1 275 : 3 · M3: 6 393 : 3 | chia 4 chữ số (SVG, data-pt) | `quen-ha`, `thieu-so-0` |
| D2 | Thương có chữ số 0 | SGK (bài 1, 3) | MT1 | M1: 5 025 : 5 · M2: 6 606 : 6 · M3: 4 806 : 6, 2 004 : 2 | chia 4 chữ số (SVG) | `thieu-so-0` |
| D3 | Chia có dư, điền thương | SGK (khám phá, bài 3) | MT2 | M1: 9 365 : 3 · M2: 2 249 : 4, 6 729 : 6 · M3: 4 163 : 8, 7 369 : 8 | chia 4 chữ số (SVG) | `quen-ha`, `du-lon-hon-chia` |
| D4 | Chia có dư, điền số dư | SGK (bài 3) | MT2 | M1: số chia 3 · M2: số chia 4 đến 6 · M3: số chia 7 đến 9 | chia 4 chữ số (SVG) | `du-lon-hon-chia`, `nham-thuong-du` |
| D5 | Bảng số bị chia, số chia, thương, số dư | SGK (bài 3) | MT2 | M1: điền thương · M2: điền số dư · M3: điền số bị chia | bảng (SVG) | `nham-thuong-du` |
| D6 | Chia nhóm | SGK (bài 4) | MT2 | M1: 6 308 : 7 · M2: số khác, hỏi số nhóm · M3: hỏi số người còn dư | chữ | `nham-thuong-du` |
| D7 | Nhẩm tròn nghìn | SGK (bài 5) | MT3 | M1: 8 000 : 2 · M2: 7 000 : 7, 9 000 : 3 · M3: 8 000 : 4 | chữ | `nham-hang` |
| D8 | Điền >, <, = | SGK (bài 5) | MT3 | M1: 6 000 : 2 ? 2 999 · M2: 3 000 : 3 ? 200 × 5 · M3: 3 500 : 5 ? 4 000 : 5 | chữ | `so-sanh-sai` |
| D9 | Giảm đi, gấp lên (vệ tinh, vịt, ve sầu) | SGK (bài 6, 7) | MT3 | M1: giảm đi 3 lần · M2: gấp 3 lần rồi gấp 4 lần · M3: hai bước, cả hai | sơ đồ đoạn thẳng (SVG) | `doc-de-sai`, `thieu-buoc` |
| D10 | Bạn An chia | **không có trong SGK** | MT1 | M1: An tính, em có đồng ý không · M2: An sai ở đâu · M3: kết quả đúng | `anh('boy')`, chia dọc | `thieu-so-0`, `quen-ha` |

### Luật lời câu hỏi
- Câu «… có … không?» dùng Có / Không; mọi đẳng thức trong phương án đúng số học; đúng một đáp án; số dư luôn bé hơn số chia.

## 3. Nhãn lỗi
`quen-ha`, `thieu-so-0`, `du-lon-hon-chia`, `nham-thuong-du`, `nham-hang`, `so-sanh-sai`, `doc-de-sai`, `thieu-buoc` (tên gợi ý, đặt trong mã).

## Rủi ro chung
Font Linux khác máy thầy (thầy soát lại trên Vercel). Phép tính cột dọc bốn chữ số rộng hơn ba chữ số: phải co vừa 375 px, các chữ số không đè nhau, số nhớ nhỏ nhưng không dưới 14 px. Số có bốn chữ số viết có khoảng trắng không ngắt ở hàng nghìn ("2 729"); ô nhập là số nguyên không dấu cách.

## Việc sẽ làm sau khi thầy duyệt
Viết `bai-57.js`, chép `bai-57.html`, sửa `index.html`; chạy đủ cổng; PR [XONG] Bài 57.

## Cần thầy quyết (kèm đề xuất)
1. Bảng dạng đúng chưa? Đề xuất: đúng như bảng.
2. D10 ngoài SGK: giữ (**đề xuất**).
