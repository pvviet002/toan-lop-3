# Phân tích sư phạm — Bài 38: Biểu thức số. Tính giá trị của biểu thức số (BÀI MỚI — BẢN NHÁP CHỜ DUYỆT)

Mẫu: `bai-28.js` (`gapKhucABC`, `pt()`), `bai-35.js` (`theTinh`, bài "kết quả 100"), `bai-24.js` + khối "LUYỆN THÔNG MINH" ở đầu `engine.js`; hàm `tinhBT` của `figures.js` tính giá trị biểu thức để `check()`.
Phạm vi: tạo mới `bai-38.js`, `bai-38.html`, thêm 38 vào `AVAILABLE` trong `index.html` (giữ CRLF, diff đúng 1 dòng) và file này. Không đụng `engine.js`, `figures.js`, `lua.js`. Chưa viết dòng mã nào.

Bài 38 là bài thứ ba của **Chủ đề 6**; sách dành 5 trang (104–108) với ba Khám phá, nên dùng **4 mục tiêu** × 11 dạng.

## 0. Nguồn và điều cần lưu ý

Nội dung SGK (trang in 104–108) lấy từ **bản tóm tắt của phiên Claude trên máy thầy** (đã đối chiếu từng số); phiên đám mây chưa tự đối chiếu sách. Không chép nguyên văn đề vào repo.

- **Khám phá 1 (biểu thức là gì):** đường gấp khúc ABC, AB = BC = 5 cm: độ dài viết 5 + 5 hoặc 5 × 2; thêm CD = 8 cm: 5 + 5 + 8 hoặc 5 × 2 + 8. Ví dụ biểu thức: 5 + 5; 24 − 7; 5 × 2; 8 : 2; 5 + 5 + 8; 5 × 2 + 8; 18 : 3 − 2. Giá trị của biểu thức: 35 + 8 − 10 = 43 − 10 = 33.
  HĐ1 (mẫu 45 − 15 + 10 = 30 + 10 = 40): 27 − 7 + 30 = 50; 60 + 50 − 20 = 90; 9 × 4 = 36. HĐ2 (nối biểu thức với tổ ong 48, 50, 15, 22): 32 + 8 − 18 = 22; 6 × 8 = 48; 80 − 40 + 10 = 50; 45 : 9 + 10 = 15.
- **Khám phá 2 (thứ tự thực hiện):** can 10 l rót sang 3 ca mỗi ca 2 l, còn 10 − 2 × 3 = 10 − 6 = 4 l. Quy tắc: có cộng, trừ, nhân, chia thì **nhân chia trước, cộng trừ sau**; chỉ có cộng trừ hoặc chỉ có nhân chia thì **từ trái sang phải**.
  HĐ1 (mẫu 24 + 8 : 2 = 24 + 4 = 28): 30 : 5 × 2 = 12; 24 + 5 × 6 = 54; 30 − 18 : 3 = 24. HĐ2 (câu cá, bốn con cá 45, 46, 47, 48): 40 + 20 − 15 = 45; 56 − 2 × 5 = 46; 40 + 32 : 4 = 48; 67 − 15 − 5 = 47.
- **Khám phá 3 (dấu ngoặc):** 3 thỏ trắng và 4 thỏ nâu, mỗi con 2 tai: 2 × (3 + 4) = 2 × 7 = 14 (hoặc 2 × 3 + 2 × 4). Quy tắc: **có dấu ngoặc thì tính trong ngoặc trước**.
  HĐ1 (mẫu 30 : (20 − 14) = 30 : 6 = 5): 45 : (5 + 4) = 5; 8 × (11 − 6) = 40; 42 − (42 − 5) = 5. HĐ2 (bốn thuyền, bốn số 3, 40, 4, 5): (15 + 5) : 5 = 4; 32 − (25 + 4) = 3; 16 + (40 − 16) = 40; 40 : (11 − 3) = 5.
- **Luyện tập:** 1) lớn nhất, bé nhất: 5 × (6 − 2) = 20; 5 × 6 − 2 = 28; (16 + 24) : 4 = 10; 16 + 24 : 4 = 22 → lớn nhất B, bé nhất C. 2) Mai có 4 hộp bút màu, cho Mi 2 hộp, mỗi hộp 10 chiếc: còn 10 × (4 − 2) = 20 (hoặc 4 × 10 − 2 × 10). 3a) ba thùng nước mắm 64 l, 55 l, 45 l: (64 + 55) + 45 và 64 + (55 + 45) cùng bằng 164, cách ghép 55 + 45 = 100 thuận tiện hơn; nhận xét (a + b) + c = a + (b + c). 3b) 123 + 80 + 20 = 223; 207 + 64 + 36 = 307 (ghép cặp tròn chục, tròn trăm).
- **Lỗi hay gặp:** làm từ trái sang phải khi có nhân chia (24 + 5 × 6 → 174); bỏ dấu ngoặc (5 × (6 − 2) → 28); nhân chia làm sau; nhầm "giá trị của biểu thức" với một số trong biểu thức.
- **Số:** mọi giá trị nguyên, 0–999; không số âm (trừ: số bị trừ ≥ số trừ ở mọi bước); chia hết ở mọi bước; dùng `tinhBT` (figures.js) để tính và kiểm; không dùng số có dấu cách ("1 000") trong biểu thức (bài 35 đã gặp lỗi).
- Dấu: × và : như engine; dấu ngoặc đơn "( )" có khoảng trắng như sách: "5 × (6 − 2)".

## 1. Bốn mục tiêu × ba mức

| MT | Tên | Mức 1 — Nhận biết | Mức 2 — Hiểu | Mức 3 — Vận dụng |
|---|---|---|---|---|
| MT1 | Biểu thức và giá trị | Dãy nào là biểu thức (chọn); 5 + 5 với đường gấp khúc; 9 × 4. | 27 − 7 + 30; 60 + 50 − 20: tính từng bước. | Nối biểu thức với giá trị (tổ ong); viết biểu thức cho đường gấp khúc ba đoạn. |
| MT2 | Thứ tự không ngoặc | 10 − 2 × 3 (can nước); 30 : 5 × 2. | 24 + 5 × 6; 30 − 18 : 3: chọn bước đầu đúng. | Câu cá: biểu thức nào bằng 46; hai biểu thức cùng giá trị. |
| MT3 | Dấu ngoặc | 2 × (3 + 4) (tai thỏ); 45 : (5 + 4). | 8 × (11 − 6); 42 − (42 − 5); bước đầu là trong ngoặc. | Thuyền: biểu thức nào bằng 40; so sánh 5 × (6 − 2) với 5 × 6 − 2. |
| MT4 | Vận dụng và tính thuận tiện | Mai còn mấy hộp bút (viết biểu thức). | Lớn nhất, bé nhất trong bốn biểu thức; ghép 55 + 45 = 100. | 207 + 64 + 36 tính thuận tiện; bạn An bỏ ngoặc: Em thấy thế nào? |

Tham số engine: `goal:10, soCau:18, soCauToiDa:24`.

## 2. Mười một dạng (topics)

| # | Dạng | Nguồn | MT | Mức 1 / Mức 2 / Mức 3 | Hình | Nhãn lỗi chính |
|---|---|---|---|---|---|---|
| D1 | Đường gấp khúc và biểu thức | SGK (Khám phá 1) | MT1 | M1: ABC hai đoạn 5 cm: chọn biểu thức (5 + 5 hoặc 5 × 2) · M2: ABCD thêm 8 cm: chọn 5 × 2 + 8 · M3: tính độ dài (giá trị) với số khác | `gapKhucABC` (chép từ bài 28, nhãn cm cao ≥ 30) | `chon-sai-phep`, `thieu-buoc` |
| D2 | Đâu là biểu thức | SGK (Khám phá 1, ví dụ) | MT1 | M1: chọn dãy là biểu thức trong bốn thẻ (có thẻ "24 7", "= 5") · M2: đếm số biểu thức trong bốn thẻ · M3: biểu thức có đúng hai phép tính | `theTinh` | `dem-sot-phep` |
| D3 | Tính từ trái sang phải | SGK (HĐ1 KP1) | MT1 | M1: 27 − 7 + 30 · M2: 60 + 50 − 20; 35 + 8 − 10 · M3: ba phép cộng trừ, số đến 500 | chữ (hai dòng "= … = …") | `nham-bang`, `thieu-buoc` |
| D4 | Tổ ong: nối giá trị | SGK (HĐ2 KP1) | MT1 | M1: một biểu thức, chọn tổ ong đúng (bốn số) · M2: chọn biểu thức có giá trị 48 · M3: hai biểu thức cùng tổ (đếm) | `theTinh` + nhãn số | `nham-bang`, `tinh-trai-sang-phai` |
| D5 | Can nước: nhân chia trước | SGK (Khám phá 2) | MT2 | M1: 10 − 2 × 3 (can 10 l, 3 ca 2 l) · M2: số khác (can 12–30 l, 2–5 ca) · M3: chọn biểu thức đúng cho bài toán | `caDong`/`hangCa` (chép từ bài 32) hoặc `anh` | `tinh-trai-sang-phai`, `chon-sai-phep` |
| D6 | Thứ tự thực hiện | SGK (HĐ1 KP2) | MT2 | M1: bước đầu tiên làm gì (chọn) · M2: 24 + 5 × 6; 30 − 18 : 3; 30 : 5 × 2 · M3: biểu thức có cả bốn phép, hai bước | chữ | `tinh-trai-sang-phai`, `nhan-chia-sau` |
| D7 | Câu cá | SGK (HĐ2 KP2) | MT2 | M1: biểu thức nào bằng 46 · M2: con cá nào ứng với 40 + 32 : 4 · M3: đếm biểu thức có giá trị trong 45–48 | `theTinh`, `anh` | `tinh-trai-sang-phai`, `dem-sot-phep` |
| D8 | Tai thỏ: dấu ngoặc | SGK (Khám phá 3) | MT3 | M1: 2 × (3 + 4) · M2: số thỏ khác; hai cách viết cùng giá trị · M3: chọn biểu thức đúng cho bài toán | `anh`, chữ | `bo-ngoac`, `chon-sai-phep` |
| D9 | Tính trong ngoặc trước | SGK (HĐ1, HĐ2 KP3) | MT3 | M1: 45 : (5 + 4); bước đầu là gì · M2: 8 × (11 − 6); 42 − (42 − 5) · M3: thuyền: (15 + 5) : 5, 40 : (11 − 3): chọn thuyền hoặc tính | chữ, `theTinh` | `bo-ngoac`, `nham-bang` |
| D10 | Lớn nhất, bé nhất | SGK (Luyện tập 1) | MT4 | M1: hai biểu thức, cái nào lớn hơn (5 × (6 − 2), 5 × 6 − 2) · M2: bốn biểu thức, lớn nhất · M3: bốn biểu thức, bé nhất; có cặp bằng nhau là nhiễu | `theTinh` | `bo-ngoac`, `tinh-trai-sang-phai` |
| D11 | Bút màu, nước mắm, tính thuận tiện | SGK (Luyện tập 2, 3) | MT4 | M1: Mai còn bao nhiêu bút (10 × (4 − 2)) · M2: ba thùng 64, 55, 45: cách ghép nào thuận tiện · M3: 123 + 80 + 20; 207 + 64 + 36: tính; bạn An bỏ ngoặc: Em thấy thế nào? | chữ, `anh('boy')` | `thieu-buoc`, `bo-ngoac`, `nham-bang` |

Dạng không có trong SGK: không (câu "bạn An" ở D11 mức 3 là mở rộng). Phân bố: MT1 bốn dạng (D1–D4) · MT2 ba dạng (D5–D7) · MT3 hai dạng (D8, D9) · MT4 hai dạng (D10, D11).

### Luật lời câu hỏi
- "Giá trị của biểu thức … là bao nhiêu?" (đáp số); "Bước đầu tiên bé làm phép tính nào?" (chọn, phương án là phép tính con có kết quả đúng số học).
- Đ/S chỉ cho mệnh đề ("5 × (6 − 2) = 28" là mệnh đề).
- Mọi đẳng thức trong phương án đúng số học; "Đồng ý, vì…/Không đồng ý, vì…" với đẳng thức đúng.
- Phương án nhiễu không chứa chính đối tượng đang hỏi; các giá trị nhiễu lấy từ lỗi thật (trái sang phải, bỏ ngoặc) và phải khác nhau.

## 3. Hình (viết ngay trong `bai-38.js`)

Không có hình mới phức tạp. Dùng lại: `gapKhucABC` (bài 28, nâng nhãn trắng cỡ 17 lên cao 30 theo luật Windows), `theTinh`/`docThe` (bài 35), `hangCa` hoặc `caDong` (bài 32) cho can nước, `anh` (thỏ, cá, thuyền, tổ ong nếu có trong `hinh/`; không có thì dùng chữ, **không** emoji).
Biểu thức dài hiển thị bằng HTML (`<b>`), không SVG; hai dòng tính "= 30 + 10" và "= 40" là hai `<div>`.

## 4. Nhãn lỗi

Chuẩn: `nham-bang`, `chon-sai-phep`, `thieu-buoc`, `dem-sot-phep`. **Riêng bài 38** (`BAI.loi`):

| Nhãn | Tên hiển thị | Ví dụ lỗi | Gợi ý |
|---|---|---|---|
| `tinh-trai-sang-phai` | Làm từ trái sang phải khi có nhân, chia | 24 + 5 × 6 = 174 | "Có phép nhân thì **nhân trước**: 5 × 6 = 30, rồi 24 + 30." |
| `nhan-chia-sau` | Làm nhân, chia sau cộng, trừ | 30 − 18 : 3 = 4 | "Chia trước: 18 : 3 = 6, rồi 30 − 6." |
| `bo-ngoac` | Bỏ dấu ngoặc | 5 × (6 − 2) = 28 | "Có dấu ngoặc thì tính **trong ngoặc trước**: 6 − 2 = 4." |
| `nham-gia-tri` | Nhầm giá trị với một số trong biểu thức | trả lời 24 cho 24 + 5 × 6 | "Giá trị là kết quả sau khi tính hết các phép." |

## 5. Rủi ro

1. **`tinhBT` của `figures.js`** có đọc dấu ngoặc không? Nếu không, viết `tinhBT2` riêng trong `bai-38.js` (tách ngoặc rồi gọi `tinhBT`). `check()` phải tính lại mọi giá trị bằng mã, không tin số viết sẵn.
2. **Không số âm, chia hết ở mọi bước:** bộ sinh dựng biểu thức từ kết quả ngược (chọn số rồi ghép) và kiểm lại.
3. **Giá trị nhiễu trùng đáp án** (ví dụ trái sang phải cho cùng kết quả): bộ sinh loại và sinh lại.
4. **Khoảng trắng trong biểu thức** ("5 × (6 − 2)") thống nhất một kiểu trong cả bài để `docThe` đọc được.
5. `index.html` CRLF; font Linux: thầy soát lại trên máy thầy.

## 6. Việc sẽ làm sau khi thầy duyệt

Viết `bai-38.js`, chép `bai-38.html`, sửa `index.html`; chạy đủ cổng; tự soi ảnh; PR "[XONG] Bài 38".

## 7. Cần thầy quyết (kèm đề xuất)

1. Mục SGK ở mục 0 và bảng dạng đúng chưa? Đề xuất: đúng như bảng.
2. **D2 "Đâu là biểu thức"** có thẻ không phải biểu thức ("24 7", "= 5", "5 + ?"): giữ (**đề xuất**) hay bỏ vì sách không hỏi thế?
3. **Tính thuận tiện (D11 mức 2, 3):** hỏi "cách nào thuận tiện hơn" (chọn) và tính 207 + 64 + 36 (số): đồng ý (**đề xuất**); chưa dạy tên tính chất kết hợp, chỉ nhận xét bằng lời.
4. **Can nước (D5)** dùng hình ca đong của bài 32 hay chỉ chữ: đề xuất chữ + `anh` nếu có, để hình không rối.
