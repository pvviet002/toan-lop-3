# Phân tích sư phạm — Bài 39: So sánh số lớn gấp mấy lần số bé (BÀI MỚI — BẢN NHÁP CHỜ DUYỆT)

Mẫu: `bai-28.js` (`soDoHai`: sơ đồ đoạn thẳng, `cauHai`), `bai-27.js` (nhóm vật đếm được), `bai-29.js` + khối "LUYỆN THÔNG MINH" ở đầu `engine.js`.
Phạm vi: tạo mới `bai-39.js`, `bai-39.html`, thêm 39 vào `AVAILABLE` trong `index.html` (giữ CRLF, diff đúng 1 dòng) và file này. Không đụng `engine.js`, `figures.js`, `lua.js`. Chưa viết dòng mã nào.

Bài 39 là bài thứ tư của **Chủ đề 6**; sách dành 2 trang (109–110), nên dùng **4 mục tiêu** × 9 dạng.

## 0. Nguồn và điều cần lưu ý

Nội dung SGK (trang in 109–110) lấy từ **bản tóm tắt của phiên Claude trên máy thầy** (đã đối chiếu từng số); phiên đám mây chưa tự đối chiếu sách. Không chép nguyên văn đề vào repo.

- **Khám phá a:** hàng dưới 2 ô tô, hàng trên 6 ô tô: 2 × 3 = 6; 6 : 2 = 3 (lần). **Quy tắc:** muốn tìm số lớn gấp mấy lần số bé, lấy số lớn chia cho số bé.
  **Khám phá b:** AB = 8 cm, CD = 2 cm: AB gấp CD 8 : 2 = 4 (lần); sơ đồ đoạn thẳng, AB chia 4 phần bằng CD.
- **Hoạt động 1** (bảng số lớn – số bé – gấp mấy lần): 6 và 2 → 3; 10 và 5 → 2; 20 và 4 → 5.
  **Hoạt động 2:** bút chì 10 cm, bút sáp 5 cm, cái ghim 2 cm: bút chì gấp bút sáp 2 lần, gấp cái ghim 5 lần.
- **Luyện tập 1** (hơn bao nhiêu đơn vị; gấp mấy lần): 8 và 2: hơn 6, gấp 4; 12 và 4: hơn 8, gấp 3; 15 và 5: hơn 10, gấp 3; 24 và 6: hơn 18, gấp 4; 30 và 3: hơn 27, gấp 10.
  **Luyện tập 2:** 32 quả bóng xếp 4 hàng 8 cột: số bóng một hàng gấp số bóng một cột 8 : 4 = 2 lần.
  **Luyện tập 3:** thuyền lớn 24 khách, thuyền nhỏ 6 khách: nhiều hơn 18 khách; gấp 4 lần.
- **Bẫy chính:** "nhiều hơn bao nhiêu" (trừ) với "gấp mấy lần" (chia); lấy số bé chia số lớn; trả lời số lớn thay vì số lần.
- **Số:** số bé 2–9, số lớn ≤ 100 (mức 3 đến 999 với số tròn), số lớn chia hết cho số bé; kết quả 2–10 lần.
- **Hình:** hai hàng vật đếm được (`haiHang`, mỗi vật `data-dem`, hàng trên và hàng dưới); sơ đồ đoạn thẳng gấp (`soDoHai` kiểu `gap` chép từ bài 28); bảng số lớn – số bé (`tri` như bài 36); lưới bóng 4 × 8 (`luoiBong`, `data-dem`).

## 1. Bốn mục tiêu × ba mức

| MT | Tên | Mức 1 — Nhận biết | Mức 2 — Hiểu | Mức 3 — Vận dụng |
|---|---|---|---|---|
| MT1 | Gấp mấy lần qua hình | Hai hàng ô tô 6 và 2: gấp mấy lần (đếm được). | Đoạn AB 8 cm và CD 2 cm trên sơ đồ. | Lưới bóng 4 × 8: một hàng gấp một cột mấy lần. |
| MT2 | Tính số lần | Bảng 6 và 2, 10 và 5 (chia bảng nhỏ). | 20 và 4, 24 và 6, 30 và 3. | Số lớn đến 90, số bé 2–9; số tròn chục, tròn trăm (90 và 30). |
| MT3 | Phân biệt hơn và gấp | 8 và 2: hơn 6 hay gấp 4 (hỏi một). | Thuyền 24 và 6: nhiều hơn bao nhiêu; gấp mấy lần. | Hỏi cả hai trong một câu (chọn cặp đúng); số lớn hơn. |
| MT4 | Vận dụng và tìm lỗi | Bút chì 10 cm, bút sáp 5 cm. | Bút chì gấp cái ghim; chọn phép tính đúng. | Bạn An nói "gấp 4 lần" khi phải trừ: em thấy thế nào. |

Tham số engine: `goal:10, soCau:18, soCauToiDa:24`.

## 2. Chín dạng (topics)

| # | Dạng | Nguồn | MT | Mức 1 / Mức 2 / Mức 3 | Hình | Nhãn lỗi chính |
|---|---|---|---|---|---|---|
| D1 | Hai hàng ô tô | SGK (Khám phá a) | MT1 | M1: hàng trên 6, hàng dưới 2 (đếm) · M2: hàng trên 8–12, dưới 2–4 · M3: hỏi ngược: hàng dưới có 3, hàng trên gấp 4 lần: hàng trên có mấy | **hình mới** `haiHang` (`data-dem`) | `chia-nguoc`, `nham-hon-gap` |
| D2 | Sơ đồ đoạn thẳng | SGK (Khám phá b) | MT1 | M1: AB 8 cm, CD 2 cm · M2: số khác (CD 2–5, AB gấp 2–6) · M3: biết AB và số lần, hỏi CD | `soDoHai` kiểu `gap` (chép bài 28) | `chia-nguoc`, `dao-vai` |
| D3 | Lưới bóng | SGK (Luyện tập 2) | MT1 | M1: 4 hàng 8 cột: mỗi hàng mấy quả · M2: một hàng gấp một cột mấy lần · M3: lưới khác (3 × 9, 2 × 8, 5 × 10) | **hình mới** `luoiBong` (`data-dem`) | `dem-sai`, `chia-nguoc` |
| D4 | Bảng số lớn – số bé | SGK (Hoạt động 1) | MT2 | M1: 6 và 2, 10 và 5 · M2: 20 và 4, 24 và 6 · M3: 30 và 3, 90 và 9, 80 và 4 | bảng `tri` | `chia-nguoc`, `nham-bang` |
| D5 | Tính số lần | SGK (Luyện tập 1) | MT2 | M1: số lớn ≤ 20 · M2: ≤ 50 · M3: số tròn chục, tròn trăm (90 và 30, 600 và 200) | chữ | `nham-hang`, `chia-nguoc` |
| D6 | Hơn hay gấp | SGK (Luyện tập 1) | MT3 | M1: hỏi "hơn bao nhiêu đơn vị" · M2: hỏi "gấp mấy lần" · M3: chọn cặp (hơn 18, gấp 4) đúng trong bốn cặp | chữ | `nham-hon-gap`, `chon-sai-phep` |
| D7 | Thuyền chở khách | SGK (Luyện tập 3) | MT3 | M1: 24 và 6: nhiều hơn bao nhiêu · M2: gấp mấy lần · M3: hỏi "nhiều hơn" hay "gấp" ngẫu nhiên, số khác | chữ, `anh` | `nham-hon-gap`, `chia-nguoc` |
| D8 | Bút chì, bút sáp, ghim | SGK (Hoạt động 2) | MT4 | M1: bút chì gấp bút sáp · M2: bút chì gấp cái ghim; bút sáp gấp ghim (có dư? không: 5 : 2 — tránh, chọn số chia hết) · M3: chọn phép tính đúng (10 : 2, 10 − 2, 10 × 2, 2 : 10) | `thuocVat` (chép bài 34) hoặc chữ | `chia-nguoc`, `chon-sai-phep` |
| D9 | Bạn An nói | **không có trong SGK** | MT4 | M1: An nói "24 gấp 6 là 4 lần": em thấy thế nào · M2: An lấy số bé chia số lớn / nói "hơn 4" · M3: An trả lời "hơn 18" khi hỏi gấp: sửa lại | `anh('boy')` | `nham-hon-gap`, `chia-nguoc` |

Dạng không có trong SGK: D9. Phân bố: MT1 ba dạng (D1–D3) · MT2 hai dạng (D4, D5) · MT3 hai dạng (D6, D7) · MT4 hai dạng (D8, D9).

### Luật lời câu hỏi
- Hỏi "gấp mấy lần" thì đơn vị là **lần**; hỏi "nhiều hơn / dài hơn bao nhiêu" thì đơn vị là đơn vị của vật.
- "Đồng ý, vì … / Không đồng ý, vì …" chỉ chứa đẳng thức đúng (24 : 6 = 4; 24 − 6 = 18).
- Số lớn luôn chia hết cho số bé; không hỏi "gấp" khi không chia hết.

## 3. Hình mới (viết ngay trong `bai-39.js`)

| Hàm | Mô tả | Kiểm do mã |
|---|---|---|
| `haiHang(n1, n2, loai)` | Hai hàng vật (ô tô, quả bóng, bông hoa vẽ phẳng), hàng trên n1, hàng dưới n2, mỗi vật `data-dem="vat"` kèm `data-h` (1/2); n1 ≤ 12. | `check()` đếm vật từng hàng; n1 = k × n2. |
| `luoiBong(r, c)` | Lưới r hàng × c cột quả bóng (`data-dem="bong"`), nhãn "hàng", "cột"; r ≤ 5, c ≤ 10. | `check()` đếm r × c; c chia hết cho r. |

Hình dùng lại: `soDoHai` (bài 28, kiểu `gap`), `tri` (bài 36), `anh`. Vật đếm cách nhau ≥ 8; nhãn trắng cỡ 18 cao ≥ 30.

## 4. Nhãn lỗi

Chuẩn: `nham-bang`, `chon-sai-phep`, `dao-vai`, `thieu-buoc`. **Riêng bài 39:**

| Nhãn | Tên hiển thị | Ví dụ | Gợi ý |
|---|---|---|---|
| `chia-nguoc` | Lấy số bé chia số lớn | 2 : 6 | "Số lớn gấp mấy lần số bé: lấy số lớn chia cho số bé." |
| `nham-hon-gap` | Nhầm "hơn bao nhiêu" với "gấp mấy lần" | 24 − 6 = 18 khi hỏi gấp | "Hơn bao nhiêu thì trừ; gấp mấy lần thì chia." |
| `dem-sai` | Đếm sai số vật | 7 ô tô thay vì 6 | "Bé đếm lại từng hàng." |
| `nham-hang` | Nhẩm sai hàng với số tròn | 600 : 200 = 30 | "6 trăm : 2 trăm = 3 (lần)." |

## 5. Rủi ro

1. Hai hàng vật 12 và 3 trên điện thoại: hàng 12 vật cần ≤ 30 đơn vị mỗi vật; xếp hai hàng, không rớt lẻ.
2. Sơ đồ `soDoHai` kiểu `gap`: đoạn dài chia k phần bằng đoạn ngắn, nhãn cm cao ≥ 30 (bản bài 28 là 28, nâng lên 30).
3. D8: số đo chọn để mọi phép "gấp" chia hết (10, 5, 2 là bộ sách; bộ khác 12, 6, 3; 8, 4, 2).
4. `index.html` CRLF; font Linux: thầy soát lại trên máy thầy.

## 6. Việc sẽ làm sau khi thầy duyệt
Viết `bai-39.js`, chép `bai-39.html`, sửa `index.html`; chạy đủ cổng; tự soi ảnh; PR "[XONG] Bài 39".

## 7. Cần thầy quyết (kèm đề xuất)
1. Mục SGK ở mục 0 và bảng dạng đúng chưa? Đề xuất: đúng như bảng.
2. **D1 mức 3** hỏi ngược (biết số lần, tìm số lớn) có vượt bài không? Đề xuất: giữ (ôn lại "gấp n lần" bài 24).
3. **D8** vẽ thước và vật (`thuocVat` bài 34) hay chỉ chữ: đề xuất chữ kèm số đo, hình thước để sau.
