# Phân tích sư phạm — Bài 50: Chu vi hình tam giác, tứ giác, chữ nhật, vuông (BÀI MỚI — BẢN NHÁP CHỜ DUYỆT)

Mẫu: khối "LUYỆN THÔNG MINH" ở đầu `engine.js`; hình `svgHinh`, `luoiHinh43` và `gapKhuc` (bài 43), `okEq` (bài 41); cách dựng mục tiêu x dạng như `bai-44.js`.
Phạm vi: tạo mới `bai-50.js`, `bai-50.html`, thêm 50 vào `AVAILABLE` (giữ CRLF, diff 1 dòng) và file này. Không đụng `engine.js`, `figures.js`, `lua.js`. Chưa viết dòng mã nào.
Tham số engine: `goal:10, soCau:18, soCauToiDa:24`. Quy tắc mã: nối chuỗi, không template literal, không emoji, không số thập phân hay số âm; hình hình học do mã dựng bằng toạ độ nguyên, `check()` tính lại từ chuỗi SVG (data-*), không đoán.

## 0. Nguồn và điều cần lưu ý
Nội dung SGK Tập 2 (Kết nối tri thức, Chủ đề 9: Chu vi, diện tích một số hình phẳng) lấy từ **tóm tắt của phiên Claude trên máy thầy**; phiên đám mây chưa đối chiếu sách, không chép hình hay đoạn văn của sách. Số đo trong câu do mã chọn ngẫu nhiên.
- Sách tr.21-25: chu vi = tổng độ dài các cạnh; tam giác ABC (2, 3, 4 cm) = 9 cm; tứ giác MNPQ (3, 4, 5, 2 cm) = 14 cm; chữ nhật (dài + rộng) x 2 (5 và 3 cm = 16 cm); vuông cạnh x 4 (5 cm = 20 cm). Bài tập: 7 + 10 + 14 = 31 cm; 20, 30, 40 dm = 90 dm; tứ giác 3, 4, 5, 6 dm = 18 dm; dây đèn thuyền (60 + 25 + 40 + 25) = 150 cm; bảng hình vuông (6 cm, 8 m, 7 cm, 10 m); chữ nhật 6 x 4 cm, 8 x 2 m, 15 x 10 dm; que tính hình vuông cạnh 3 que = 12 que; chọn chu vi cho ba hình (26, 28, 30 cm); bàn học 40 cm x 1 m: Việt tính (40 + 1) x 2 = 82 là sai, đúng (40 + 100) x 2 = 280 cm; hàng rào vườn rau 9 m x 5 m, để cổng 2 m: (9 + 5) x 2 - 2 = 26 m.
- Lỗi hay gặp: quên đổi đơn vị; tính dài x 2 + rộng; cộng thiếu một cạnh; viết sai đơn vị.

## 1. Ba mục tiêu x ba mức

| MT | Tên | Mức 1 | Mức 2 | Mức 3 |
|---|---|---|---|---|
| MT1 | Chu vi tam giác, tứ giác (tổng các cạnh) | Tam giác 3 cạnh nhỏ (2, 3, 4 cm). | Tam giác, tứ giác cạnh hai chữ số (20, 30, 40 dm). | Đa giác nhiều cạnh (dây đèn: 60 + 25 + 40 + 25). |
| MT2 | Chu vi hình chữ nhật, hình vuông (công thức) | Chữ nhật 5 x 3 cm; vuông cạnh 5 cm. | Chữ nhật dài, rộng hai chữ số; vuông cạnh 8 m, 10 m. | Chọn hình có chu vi cho trước; que tính xếp hình vuông. |
| MT3 | Đổi đơn vị và bài toán thực tế | Hai số cùng đơn vị, tính chu vi. | Bàn học 40 cm x 1 m: đổi 1 m = 100 cm. | Hàng rào vườn 9 m x 5 m trừ cổng 2 m; bạn Việt làm sai. |

## 2. Mười dạng (topics)

| # | Dạng | Nguồn | MT | Mức 1 / Mức 2 / Mức 3 | Hình | Nhãn lỗi chính |
|---|---|---|---|---|---|---|
| D1 | Chu vi tam giác | SGK (bài 1, 2) | MT1 | M1: 2, 3, 4 cm · M2: 20, 30, 40 dm · M3: biết hai cạnh và chu vi, tìm cạnh còn lại | tam giác (SVG, data-seg) | `thieu-canh`, `nham-bang` |
| D2 | Chu vi tứ giác | SGK (bài 2) | MT1 | M1: 3, 4, 5, 2 cm · M2: 10, 15, 10, 15 cm · M3: tứ giác có hai cạnh ghi chung | tứ giác (SVG, data-seg) | `thieu-canh`, `nham-bang` |
| D3 | Chu vi hình chữ nhật | SGK (bài 3) | MT2 | M1: 5 x 3 cm · M2: 8 x 2 m, 15 x 10 dm · M3: chữ nhật có đơn vị m, dm | chữ nhật (SVG, data-w, data-h) | `dai-nhan-hai-cong-rong`, `nham-bang` |
| D4 | Chu vi hình vuông | SGK (bảng bài 3) | MT2 | M1: cạnh 5 cm · M2: cạnh 8 m, 10 m · M3: bảng nhiều cột, điền chu vi | vuông (SVG, data-a) | `nham-bang`, `chon-sai-phep` |
| D5 | Chọn chu vi cho ba hình | SGK (bài 4) | MT2 | M1: chọn hình có chu vi 28 trong ba hình · M2: chu vi 26 · M3: chu vi 30 | ba hình (SVG) | `dai-nhan-hai-cong-rong` |
| D6 | Que tính xếp hình vuông | SGK (bài 5) | MT3 | M1: cạnh 3 que · M2: cạnh 4 que · M3: cạnh 5 que, hỏi mấy que | que (SVG, data-dem) | `dem-sot-que` |
| D7 | Dây đèn trang trí thuyền | SGK (bài 6) | MT1 | M1: 3 cạnh · M2: 4 cạnh (60 + 25 + 40 + 25) · M3: 5 cạnh | đa giác (SVG, data-seg) | `thieu-canh` |
| D8 | Đổi đơn vị rồi tính chu vi | SGK (bài 7) | MT3 | M1: 40 cm x 1 m, đáp số cm · M2: 2 m x 50 cm · M3: 1 m x 20 cm, đáp số dm | chữ nhật (SVG) | `quen-doi-don-vi` |
| D9 | Hàng rào vườn rau | SGK (bài 8) | MT3 | M1: 9 x 5 m (không cổng) · M2: để cổng 2 m · M3: để cổng 3 m, vườn 12 x 8 m | chữ nhật + cổng (SVG) | `quen-tru-cong`, `nham-bang` |
| D10 | Bạn Việt làm | SGK (bài 7, sửa) | MT3 | M1: Việt tính (40 + 1) x 2: đồng ý không · M2: Việt sai ở đâu · M3: kết quả đúng | `anh('boy')` | `quen-doi-don-vi`, `dai-nhan-hai-cong-rong` |

### Luật lời câu hỏi
- Câu «… có … không?» dùng Có / Không; mọi đẳng thức trong phương án đúng số học; đúng một đáp án; mọi số đo cùng đơn vị trước khi tính.

## 3. Nhãn lỗi
`thieu-canh`, `nham-bang`, `dai-nhan-hai-cong-rong`, `chon-sai-phep`, `dem-sot-que`, `quen-doi-don-vi`, `quen-tru-cong` (tên gợi ý, đặt trong mã).

## Rủi ro chung
Font Linux khác máy thầy (thầy soát lại trên Vercel). Nhãn số đo trên cạnh hình phải không đè lên nhau ở 375 px (đặt nhãn lệch ra ngoài cạnh). Mọi kết quả trong phạm vi 10 000, không số thập phân. Đơn vị viết đủ: cm, dm, m; diện tích viết cm² (viết bằng ký tự "²", không dùng "^2").

## Việc sẽ làm sau khi thầy duyệt
Viết `bai-50.js`, chép `bai-50.html`, sửa `index.html`; chạy đủ cổng; PR [XONG] Bài 50.

## Cần thầy quyết (kèm đề xuất)
1. Bảng dạng đúng chưa? Đề xuất: đúng như bảng.
2. Số đo trong câu do mã chọn, không chép số của sách: đồng ý (**đề xuất**).
