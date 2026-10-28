# Phân tích sư phạm — Bài 71: Chia số có năm chữ số cho số có một chữ số (BÀI MỚI — BẢN NHÁP CHỜ DUYỆT)

Mẫu: khối "LUYỆN THÔNG MINH" ở đầu `engine.js`; cách dựng mục tiêu x dạng như `bai-44.js`; phép chia cột dọc `chiaDoc4` (bài 57) mở rộng lên năm chữ số; bảng số bị chia, số chia, thương, số dư theo `bai-57.js`.
Phạm vi: tạo mới `bai-71.js`, `bai-71.html`, thêm 71 vào `AVAILABLE` (giữ CRLF, diff 1 dòng) và file này. Không đụng `engine.js`, `figures.js`, `lua.js`. Chưa viết dòng mã nào.
Tham số engine: `goal:10, soCau:18, soCauToiDa:24`. Quy tắc mã: nối chuỗi, không template literal, không emoji, không số thập phân hay số âm; số bị chia không quá 99 999; số dư luôn bé hơn số chia; `check()` tính lại từ chuỗi SVG hoặc từ số liệu trong câu, không đoán.

## 0. Nguồn và điều cần lưu ý
Nội dung SGK Tập 2 (Kết nối tri thức, Chủ đề 14: Nhân, chia trong phạm vi 100 000) lấy từ **tóm tắt của phiên Claude trên máy thầy**; phiên đám mây chưa đối chiếu sách, không chép hình hay đoạn văn của sách. Số trong câu do mã chọn ngẫu nhiên; chỉ giữ dạng và độ khó theo sách. Bài 70 do máy thầy làm, bài này không đụng tới.
- Sách tr.97-100: chia hết 17 486 : 2 = 8 743 (đặt tính từng bước: 17 chia 2 được 8, hạ 4, hạ 8, hạ 6); 25 684 : 4; 37 085 : 5; 21 684 : 4; 16 025 : 5; 45 789 : 3; kho 10 160 kg muối chia đều vào 4 ô tô. Chia có dư: 10 450 m vải, mỗi bộ quần áo 3 m: 10 450 : 3 = 3 483 (dư 1); 15 827 : 5; 26 167 : 4 và bảng Phép chia, Số bị chia, Số chia, Thương, Số dư; 21 437 : 3; 36 095 : 8; 10 243 viên thuốc, mỗi vỉ 8 viên: nhiều nhất bao nhiêu vỉ, thừa mấy viên. Nhẩm: 15 000 : 5 = 3 000 (15 nghìn : 5 = 3 nghìn); 21 000 : 3; 24 000 : 4; 56 000 : 7. Bảng viết phép chia có dư: 16 945 : 2 = 8 472 (dư 1); 36 747 : 6. Đặt tính 45 250 : 5; 27 162 : 3; 36 180 : 4, rồi chọn phép có kết quả lớn nhất, bé nhất; 12 000 bút sáp đóng hộp, mỗi hộp 6 bút.
- Lỗi hay gặp: quên hạ chữ số; thương thiếu chữ số 0 (16 025 : 5 = 3 205); số dư lớn hơn hoặc bằng số chia; nhầm thương với số dư; nhẩm sai số chữ số 0.

## 1. Ba mục tiêu x ba mức

| MT | Tên | Mức 1 | Mức 2 | Mức 3 |
|---|---|---|---|---|
| MT1 | Chia hết (đặt tính, thương có chữ số 0) | Số chia 2, 3, thương bốn chữ số (17 486 : 2); điền một chữ số của thương. | Số chia 4, 5; thương có chữ số 0 (16 025 : 5, 10 160 : 4). | Thương năm chữ số (45 789 : 3); thương có hai chữ số 0; bạn An thiếu chữ số 0. |
| MT2 | Chia có dư; bảng; thử lại | Chia có dư với số chia 2, 3 (10 450 : 3); điền thương. | Số chia 4 đến 6 (26 167 : 4); điền số dư; bảng điền số dư. | Số chia 7, 8, 9 (36 095 : 8); bảng điền số bị chia. |
| MT3 | Nhẩm, chọn phép tính, toán đố | 15 000 : 5; chia đều muối vào các ô tô. | 56 000 : 7; chọn phép tính có kết quả lớn nhất; bao nhiêu vỉ thuốc. | Số tròn chục nghìn (90 000 : 3); điền >, <, =; hỏi số dư. |

## 2. Mười dạng (topics)

| # | Dạng | Nguồn | MT | Mức 1 / Mức 2 / Mức 3 | Hình | Nhãn lỗi chính |
|---|---|---|---|---|---|---|
| D1 | Đặt tính chia hết, điền một chữ số | SGK (khám phá 1) | MT1 | M1: 17 486 : 2 · M2: 25 684 : 4 · M3: 45 789 : 3 | chia 5 chữ số (SVG, data-pt) | `quen-ha`, `thieu-so-0` |
| D2 | Đặt tính chia hết, điền thương | SGK (hoạt động 1, 2) | MT1 | M1: số chia 2, 3 · M2: thương có chữ số 0 (16 025 : 5) · M3: thương hai chữ số 0 | chia 5 chữ số (SVG) | `thieu-so-0`, `quen-ha` |
| D3 | Chia có dư, điền thương | SGK (khám phá 2) | MT2 | M1: 10 450 : 3 · M2: 26 167 : 4 · M3: 36 095 : 8 | chia 5 chữ số (SVG) | `quen-ha`, `du-lon-hon-chia` |
| D4 | Chia có dư, điền số dư | SGK (hoạt động tr.99) | MT2 | M1: số chia 2, 3 · M2: số chia 4 đến 6 · M3: số chia 7 đến 9 | chia 5 chữ số (SVG) | `du-lon-hon-chia`, `nham-thuong-du` |
| D5 | Bảng số bị chia, số chia, thương, số dư | SGK (luyện tập tr.100) | MT2 | M1: điền thương · M2: điền số dư · M3: điền số bị chia | bảng (SVG) | `nham-thuong-du` |
| D6 | Chia đều, chia nhóm (muối, vải, thuốc) | SGK (hoạt động, luyện tập) | MT3 | M1: chia hết (10 160 kg : 4) · M2: số vỉ nhiều nhất (10 243 : 8) · M3: số dư còn thừa | chữ | `nham-thuong-du`, `thieu-buoc` |
| D7 | Nhẩm tròn nghìn, tròn chục nghìn | SGK (luyện tập tr.99) | MT3 | M1: 15 000 : 5 · M2: 56 000 : 7, 24 000 : 4 · M3: 90 000 : 3 | chữ | `nham-hang` |
| D8 | Phép nào lớn nhất, bé nhất; điền >, <, = | SGK (luyện tập tr.100, câu 3b) | MT3 | M1: hai phép · M2: ba phép (45 250 : 5; 27 162 : 3; 36 180 : 4) · M3: điền >, <, = | chữ | `so-sanh-sai` |
| D9 | Đúng hay sai phép chia có dư | **không có trong SGK** | MT2 | M1: số dư bé hơn số chia · M2: thử lại bằng nhân rồi cộng · M3: chọn phép sai trong bốn | chữ | `du-lon-hon-chia`, `thu-lai-sai` |
| D10 | Bạn An chia | **không có trong SGK** | MT1 | M1: An tính, em có đồng ý không · M2: An sai ở đâu · M3: kết quả đúng | `anh('boy')`, chia dọc | `thieu-so-0`, `quen-ha` |

### Luật lời câu hỏi
- Câu «… có … không?» dùng Có / Không; mọi đẳng thức trong phương án đúng số học; đúng một đáp án; số dư luôn bé hơn số chia; số bị chia không quá 99 999.

## 3. Nhãn lỗi
`quen-ha`, `thieu-so-0`, `du-lon-hon-chia`, `nham-thuong-du`, `nham-hang`, `so-sanh-sai`, `thieu-buoc`, `thu-lai-sai` (tên gợi ý, đặt trong mã).

## Rủi ro chung
Font Linux khác máy thầy (thầy soát lại trên Vercel). Phép chia cột dọc năm chữ số rộng hơn bốn chữ số: phải co vừa 375 px, các chữ số không đè nhau, số nhỏ không dưới 14 px. Số có năm chữ số viết có khoảng trắng không ngắt ở hàng nghìn ("17 486"); ô nhập là số nguyên không dấu cách.

## Việc sẽ làm sau khi thầy duyệt
Viết `bai-71.js` (chép hàm chia cột dọc từ bài 57), chép `bai-71.html`, sửa `index.html`; chạy đủ cổng; PR [XONG] Bài 71.

## Cần thầy quyết (kèm đề xuất)
1. Bảng dạng đúng chưa? Đề xuất: đúng như bảng.
2. D9, D10 ngoài SGK: giữ (**đề xuất**).
3. Cách làm: mỗi bài một PR nháp phân tích riêng, chờ thầy duyệt rồi mới viết mã (đúng như thầy dặn).
