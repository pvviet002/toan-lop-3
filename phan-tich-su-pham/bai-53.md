# Phân tích sư phạm — Bài 53: Luyện tập chung (Chủ đề 9) (BÀI MỚI — BẢN NHÁP CHỜ DUYỆT)

Mẫu: khối "LUYỆN THÔNG MINH" ở đầu `engine.js`; hình `svgHinh`, `luoiHinh43` và `gapKhuc` (bài 43), `okEq` (bài 41); cách dựng mục tiêu x dạng như `bai-44.js`.
Phạm vi: tạo mới `bai-53.js`, `bai-53.html`, thêm 53 vào `AVAILABLE` (giữ CRLF, diff 1 dòng) và file này. Không đụng `engine.js`, `figures.js`, `lua.js`. Chưa viết dòng mã nào.
Tham số engine: `goal:10, soCau:18, soCauToiDa:24`. Quy tắc mã: nối chuỗi, không template literal, không emoji, không số thập phân hay số âm; hình hình học do mã dựng bằng toạ độ nguyên, `check()` tính lại từ chuỗi SVG (data-*), không đoán.

## 0. Nguồn và điều cần lưu ý
Nội dung SGK Tập 2 (Kết nối tri thức, Chủ đề 9: Chu vi, diện tích một số hình phẳng) lấy từ **tóm tắt của phiên Claude trên máy thầy**; phiên đám mây chưa đối chiếu sách, không chép hình hay đoạn văn của sách. Số đo trong câu do mã chọn ngẫu nhiên.
- Sách tr.35-37: bảng hình vuông (cạnh 20 thì chu vi 80; chu vi 40 thì cạnh 10; chu vi 100 thì cạnh 25); chữ nhật 2 dm x 5 cm đổi 20 cm: (20 + 5) x 2 = 50 cm; 1 m x 2 dm: (10 + 2) x 2 = 24 dm; ba viên gạch vuông cạnh 30 cm ghép chữ nhật 90 x 30: 240 cm; hàng rào vườn hoa, cọc cách nhau 1 m, đếm cọc suy ra chu vi; diện tích vuông cạnh 9 = 81, chữ nhật 9 x 6 = 54, rộng 6 dài gấp đôi = 72 cm²; ba miếng bìa hình ngôi nhà trên lưới (đếm ô, hai miếng bằng nhau); võ đài vuông chu vi 36 thì cạnh 9, diện tích 81; sàn nhà 9 tấm gỗ 45 x 9 = 405 cm² mỗi tấm, tổng 3 645 cm²; hình H ghép 6 x 8 = 48 và 10 x 7 = 70: 118 cm²; ba tờ giấy: xanh dương 4 x 6 (chu vi 20, diện tích 24), xanh lá 4 x 7 (22, 28), vàng vuông cạnh 5 (20, 25): giấy của Nam cùng chu vi với của Việt nhưng diện tích bé hơn nên Nam xanh dương, Việt vàng.
- Lỗi hay gặp: quên đổi đơn vị; nhầm chu vi với diện tích; quên số lần lặp (9 tấm).

## 1. Ba mục tiêu x ba mức

| MT | Tên | Mức 1 | Mức 2 | Mức 3 |
|---|---|---|---|---|
| MT1 | Chu vi (bảng, đổi đơn vị, hàng rào) | Bảng hình vuông: cạnh 20 tìm chu vi. | Chữ nhật 2 dm x 5 cm: đổi đơn vị; ba viên gạch ghép. | Biết chu vi tìm cạnh; hàng rào cọc cách nhau 1 m. |
| MT2 | Diện tích (công thức, đếm ô) | Vuông cạnh 9: 81 cm²; chữ nhật 9 x 6. | Chữ nhật rộng 6, dài gấp đôi. | Ba miếng bìa ngôi nhà trên lưới: hai miếng bằng nhau. |
| MT3 | Bài toán chu vi, diện tích | Võ đài chu vi 36: cạnh 9. | Võ đài: diện tích 81; sàn nhà 9 tấm gỗ. | Hình H ghép 48 + 70; ba tờ giấy Nam, Việt. |

## 2. Mười dạng (topics)

| # | Dạng | Nguồn | MT | Mức 1 / Mức 2 / Mức 3 | Hình | Nhãn lỗi chính |
|---|---|---|---|---|---|---|
| D1 | Bảng hình vuông | SGK (bài 1) | MT1 | M1: cạnh 20 tìm chu vi · M2: chu vi 40 tìm cạnh · M3: chu vi 100 tìm cạnh | chữ, bảng | `nham-bang`, `nham-chu-vi-canh` |
| D2 | Chữ nhật đổi đơn vị | SGK (bài 2) | MT1 | M1: 2 dm x 5 cm · M2: 1 m x 2 dm · M3: 3 dm x 15 cm | chữ nhật (SVG) | `quen-doi-don-vi` |
| D3 | Gạch vuông ghép | SGK (bài 3) | MT1 | M1: 2 viên · M2: 3 viên (90 x 30) · M3: 4 viên, chu vi | gạch ghép (SVG) | `quen-doi-don-vi`, `nham-bang` |
| D4 | Hàng rào cọc cách nhau 1 m | SGK (bài 4) | MT1 | M1: đếm cọc, chu vi · M2: vườn có hàng rào dài nhất · M3: vườn ngắn nhất | vườn và cọc (SVG, data-coc) | `dem-sot-coc` |
| D5 | Diện tích vuông, chữ nhật | SGK (bài 5) | MT2 | M1: vuông cạnh 9 · M2: chữ nhật 9 x 6 · M3: rộng 6, dài gấp đôi | chữ nhật (SVG) | `nhan-chu-vi`, `thieu-buoc` |
| D6 | Ba miếng bìa ngôi nhà | SGK (bài 6) | MT2 | M1: đếm ô một miếng · M2: hai miếng nào bằng nhau · M3: miếng nào lớn nhất | lưới ô, ngôi nhà (SVG, data-cell) | `dem-sot-o` |
| D7 | Võ đài vuông | SGK (bài 7) | MT3 | M1: chu vi 36 tìm cạnh · M2: tìm diện tích · M3: chu vi 48 | vuông (SVG) | `nham-chu-vi-canh`, `nhan-chu-vi` |
| D8 | Sàn nhà lát gỗ | SGK (bài 8) | MT3 | M1: 1 tấm 45 x 9 · M2: 9 tấm gỗ · M3: số tấm khác | chữ nhật (SVG) | `thieu-buoc` |
| D9 | Hình H ghép | SGK (bài 9) | MT3 | M1: hai phần 48, 70 · M2: tổng 118 · M3: số đo khác | hình ghép (SVG) | `thieu-buoc` |
| D10 | Ba tờ giấy Nam và Việt | SGK (bài 10) | MT3 | M1: tính chu vi ba tờ · M2: chu vi bằng nhau, diện tích bé hơn · M3: ai cầm tờ nào | ba hình (SVG) | `nhan-chu-vi` |

### Luật lời câu hỏi
- Câu «… có … không?» dùng Có / Không; mọi đẳng thức trong phương án đúng số học; đúng một đáp án; mọi số đo cùng đơn vị trước khi tính.

## 3. Nhãn lỗi
Chép từ bài 50-52: `nham-bang`, `quen-doi-don-vi`, `nhan-chu-vi`, `dem-sot-o`, `thieu-buoc`; thêm `nham-chu-vi-canh` (biết chu vi tìm cạnh), `dem-sot-coc` (tên gợi ý, đặt trong mã).

## Rủi ro chung
Font Linux khác máy thầy (thầy soát lại trên Vercel). Nhãn số đo trên cạnh hình phải không đè lên nhau ở 375 px (đặt nhãn lệch ra ngoài cạnh). Mọi kết quả trong phạm vi 10 000, không số thập phân. Đơn vị viết đủ: cm, dm, m; diện tích viết cm² (viết bằng ký tự "²", không dùng "^2").

## Việc sẽ làm sau khi thầy duyệt
Viết `bai-53.js` (chép hàm cần dùng từ bài 50-52), chép `bai-53.html`, sửa `index.html`; chạy đủ cổng; PR [XONG] Bài 53.

## Cần thầy quyết (kèm đề xuất)
1. Bài 53 dùng lại dạng bài 50-52 (ôn tập): đồng ý (**đề xuất**).
2. Làm bài 53 sau cùng vì chép hàm từ ba bài trước.
