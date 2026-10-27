# Phân tích sư phạm — Bài 52: Diện tích hình chữ nhật, hình vuông (BÀI MỚI — BẢN NHÁP CHỜ DUYỆT)

Mẫu: khối "LUYỆN THÔNG MINH" ở đầu `engine.js`; hình `svgHinh`, `luoiHinh43` và `gapKhuc` (bài 43), `okEq` (bài 41); cách dựng mục tiêu x dạng như `bai-44.js`.
Phạm vi: tạo mới `bai-52.js`, `bai-52.html`, thêm 52 vào `AVAILABLE` (giữ CRLF, diff 1 dòng) và file này. Không đụng `engine.js`, `figures.js`, `lua.js`. Chưa viết dòng mã nào.
Tham số engine: `goal:10, soCau:18, soCauToiDa:24`. Quy tắc mã: nối chuỗi, không template literal, không emoji, không số thập phân hay số âm; hình hình học do mã dựng bằng toạ độ nguyên, `check()` tính lại từ chuỗi SVG (data-*), không đoán.

## 0. Nguồn và điều cần lưu ý
Nội dung SGK Tập 2 (Kết nối tri thức, Chủ đề 9: Chu vi, diện tích một số hình phẳng) lấy từ **tóm tắt của phiên Claude trên máy thầy**; phiên đám mây chưa đối chiếu sách, không chép hình hay đoạn văn của sách. Số đo trong câu do mã chọn ngẫu nhiên.
- Sách tr.30-34: hình chữ nhật dài 4, rộng 3: 4 x 3 = 12 cm² (đếm 12 ô); diện tích chữ nhật = dài x rộng (cùng đơn vị); hình vuông = cạnh x cạnh (3 x 3 = 9 cm²). Bài tập: ba chữ nhật chung cạnh 3 cm: 6 x 3 = 18, 4 x 3 = 12, 10 x 3 = 30 cm²; tấm gỗ 5 x 15 = 75 cm²; bảng hình vuông cạnh 3, 5, 9 cm (chu vi 12, 20, 36; diện tích 9, 25, 81); bánh vuông cạnh 8 cm: 64 cm², cắt góc 3 x 3 còn 64 - 9 = 55 cm²; hình H ghép hình vuông cạnh 7 cm và chữ nhật 20 x 9 cm: 49 + 180 = 229 cm²; ba mảnh đất cùng chu vi 20 cm: vuông cạnh 5 (25), chữ nhật 3 x 7 (21), 6 x 4 (24): mảnh vuông lớn nhất; tấm bìa gấp đôi 3 x 6 = 18 nên 36 cm²; tấm kính 85 x 30 = 2 550, cắt ba tấm 80 x 10 còn 150 cm².
- Lỗi hay gặp: nhầm chu vi với diện tích; lấy (dài + rộng) x 2; viết cm thay cm²; quên trừ phần cắt.

## 1. Ba mục tiêu x ba mức

| MT | Tên | Mức 1 | Mức 2 | Mức 3 |
|---|---|---|---|---|
| MT1 | Diện tích hình chữ nhật | Đếm ô rồi nhân: 4 x 3. | Dài x rộng với số hai chữ số (5 x 15); ba chữ nhật chung cạnh. | Biết diện tích và một cạnh, tìm cạnh còn lại (chia). |
| MT2 | Diện tích hình vuông; phân biệt chu vi, diện tích | Cạnh 3 cm: 9 cm². | Cạnh 5, 9 cm; bảng chu vi, diện tích. | Mảnh đất cùng chu vi, diện tích khác; bạn Nam nhầm. |
| MT3 | Bài toán ghép hình, cắt hình | Bánh vuông cạnh 8 cm: 64 cm². | Cắt góc 3 x 3: 64 - 9; tấm bìa gấp đôi. | Hình H ghép (49 + 180); tấm kính cắt ba tấm. |

## 2. Mười dạng (topics)

| # | Dạng | Nguồn | MT | Mức 1 / Mức 2 / Mức 3 | Hình | Nhãn lỗi chính |
|---|---|---|---|---|---|---|
| D1 | Đếm ô rồi nhân | SGK (khám phá) | MT1 | M1: 4 x 3 ô · M2: 5 x 4 ô · M3: 6 x 5 ô, hỏi diện tích | lưới ô (SVG, data-w, data-h) | `dem-sot-o`, `nham-bang` |
| D2 | Diện tích chữ nhật | SGK (bài 1) | MT1 | M1: 6 x 3 cm · M2: tấm gỗ 5 x 15 cm · M3: dài, rộng hai chữ số | chữ nhật (SVG) | `cong-thay-nhan`, `nhan-chu-vi` |
| D3 | Ba chữ nhật chung cạnh | SGK (bài 1) | MT1 | M1: ABCD 6 x 3 · M2: BEGC 4 x 3 · M3: AEGD = ABCD + BEGC | ba chữ nhật ghép (SVG) | `nham-bang` |
| D4 | Diện tích hình vuông | SGK (bài 2) | MT2 | M1: cạnh 3 cm · M2: cạnh 5, 9 cm · M3: bảng điền chu vi và diện tích | vuông (SVG) | `nhan-chu-vi`, `nham-bang` |
| D5 | Bánh vuông cắt góc | SGK (bài 3) | MT3 | M1: bánh vuông cạnh 8 cm · M2: cắt góc 3 x 3, còn lại · M3: hai góc bị cắt | vuông cắt góc (SVG) | `quen-tru-phan-cat` |
| D6 | Hình H ghép | SGK (bài 4) | MT3 | M1: hai chữ nhật, tính hai phần · M2: 49 + 180 · M3: hình ghép khác số đo | hình ghép (SVG) | `thieu-buoc` |
| D7 | Ba mảnh đất | SGK (bài 5) | MT2 | M1: chu vi ba mảnh bằng nhau, tìm mảnh lớn nhất · M2: chu vi và diện tích · M3: vuông cạnh 5 so với 3 x 7, 6 x 4 | ba hình (SVG) | `nhan-chu-vi` |
| D8 | Tấm bìa gấp đôi | SGK (bài 6) | MT3 | M1: 3 x 6 = 18 · M2: gấp đôi 36 · M3: gấp ba | chữ nhật (SVG) | `thieu-buoc` |
| D9 | Tấm kính cắt ba tấm | SGK (bài 7) | MT3 | M1: 85 x 30 · M2: cắt một tấm 80 x 10 · M3: cắt ba tấm, còn bao nhiêu | chữ nhật (SVG) | `quen-tru-phan-cat` |
| D10 | Bạn Nam làm | **không có trong SGK** | MT2 | M1: Nam tính (dài + rộng) x 2 cho diện tích: đồng ý không · M2: sai ở đâu · M3: kết quả đúng | `anh('boy')` | `nhan-chu-vi`, `viet-cm-thay-cm2` |

### Luật lời câu hỏi
- Câu «… có … không?» dùng Có / Không; mọi đẳng thức trong phương án đúng số học; đúng một đáp án; mọi số đo cùng đơn vị trước khi tính.

## 3. Nhãn lỗi
`dem-sot-o`, `nham-bang`, `nhan-chu-vi` (nhầm chu vi với diện tích), `cong-thay-nhan`, `quen-tru-phan-cat`, `thieu-buoc`, `viet-cm-thay-cm2` (tên gợi ý, đặt trong mã).

## Rủi ro chung
Font Linux khác máy thầy (thầy soát lại trên Vercel). Nhãn số đo trên cạnh hình phải không đè lên nhau ở 375 px (đặt nhãn lệch ra ngoài cạnh). Mọi kết quả trong phạm vi 10 000, không số thập phân. Đơn vị viết đủ: cm, dm, m; diện tích viết cm² (viết bằng ký tự "²", không dùng "^2").

## Việc sẽ làm sau khi thầy duyệt
Viết `bai-52.js`, chép `bai-52.html`, sửa `index.html`; chạy đủ cổng; PR [XONG] Bài 52.

## Cần thầy quyết (kèm đề xuất)
1. Bảng dạng đúng chưa? Đề xuất: đúng như bảng.
2. D10 ngoài SGK: giữ (**đề xuất**).
