# Phân tích sư phạm — Bài 28: Bài toán giải bằng hai bước tính (BÀI MỚI — BẢN NHÁP CHỜ DUYỆT)

Mẫu: `bai-24.js` (sơ đồ đoạn thẳng `soDoGap`, bài toán gấp lên, nhãn lỗi riêng) + khối "LUYỆN THÔNG MINH" ở đầu `engine.js`.
Phạm vi: tạo mới `bai-28.js`, `bai-28.html` (chép từ `assets/bai-template.html`), thêm 28 vào `AVAILABLE` trong `index.html` (giữ CRLF, diff đúng 1 dòng)
và file phân tích này. Không đụng `engine.js`, `figures.js`, `lua.js`. Bài mới **không** thêm vào `chua_chuan.txt`: `phong_tranh --soat` phải 0 lỗi. Chưa viết dòng mã nào.

Bài 28 là bài thứ sáu của **Chủ đề 4: Phép nhân, phép chia trong phạm vi 100**: giải toán hai bước. Dùng **4 mục tiêu** × 9 dạng.

## 0. Nguồn và điều cần lưu ý

- Cấu trúc mục SGK (trang in 81–82) lấy từ **bản tóm tắt của phiên Claude trên máy thầy** (đã đối chiếu từng con số trên trang sách); phiên đám mây chưa tự đối chiếu sách. Không chép nguyên văn đề vào repo; chỉ ghi dạng bài và ý.
  - **Khám phá, bài toán 1:** có 5 bông hoa cúc; số hoa hồng nhiều hơn hoa cúc 2 bông. a) hoa hồng bao nhiêu (5 + 2 = 7); b) hoa hồng và hoa cúc tất cả (5 + 7 = 12). Tóm tắt bằng sơ đồ đoạn thẳng (đoạn cúc 5, đoạn hồng = đoạn cúc + 2, ngoặc "? bông").
    **Bài toán 2:** ngăn trên 10 quyển, ngăn dưới nhiều hơn ngăn trên 3 quyển: cả hai ngăn? Hai bước: ngăn dưới 10 + 3 = 13; cả hai 10 + 13 = 23. Chú thích sách: "trước hết tìm số sách ở ngăn dưới, sau đó tìm số sách ở cả hai ngăn".
  - **Hoạt động 1:** can thứ nhất 5 l nước mắm, can thứ hai **gấp 3 lần** can thứ nhất: cả hai can (can 2: 5 × 3 = 15; cả hai: 5 + 15 = 20). Có lời giải điền ô.
    **Hoạt động 2:** Mai gấp 10 cái thuyền, Nam gấp **ít hơn** Mai 3: cả hai (Nam 7; cả hai 17).
  - **Luyện tập 1:** buổi sáng bán 10 máy tính, buổi chiều **ít hơn** buổi sáng 4: cả hai buổi (6 → 16).
    **Luyện tập 2:** đường gấp khúc ABC có AB = 9 cm, BC dài **gấp 2 lần** AB: độ dài ABC (18 → 27).
    **Luyện tập 3:** nêu bài toán theo tóm tắt (bao ngô 30 kg; bao gạo **ít hơn** bao ngô 10 kg; tất cả ?) rồi giải (gạo 20; tổng 50). Trên web: **chọn đề toán khớp sơ đồ** và điền đáp số.
- **Lỗi hay gặp:** làm một bước rồi dừng (đáp 7 thay vì 12) → `thieu-buoc` (đã có); "ít hơn" mà cộng thay trừ → `nham-it-nhieu`; "gấp" mà cộng thay nhân → `nham-gap-them` (bài 24); trả lời bước 1 thay bước 2.
- **Mỗi câu hai bước hiển thị sơ đồ đoạn thẳng** (SVG; đoạn đo theo số, vạch chia đều, nhãn trên đoạn khớp số, ngoặc "? bông"); dùng lại `soDoGap` của bài 24 (chép sang, mở rộng cho đoạn "nhiều hơn" và "ít hơn").
- **Câu hỏi hai bước hiển thị thứ tự:** bước 1 rồi bước 2 (hai ô nhập số hoặc chọn phép tính). Mọi đáp số < 100.
- Hình mới viết trong `bai-28.js`; không sửa `figures.js`.

## 1. Bốn mục tiêu (muctieu) × ba mức (Thông tư 27)

| MT | Tên | Mức 1 — Nhận biết | Mức 2 — Hiểu | Mức 3 — Vận dụng |
|---|---|---|---|---|
| MT1 | Hai bước: nhiều hơn rồi cộng | Bước 1: hoa hồng nhiều hơn hoa cúc 2 bông (5 + 2). | Hai bước: ngăn sách (10, 13, cả hai 23). | Số lớn hơn; hỏi cả ba số (cúc, hồng, tất cả). |
| MT2 | Hai bước: gấp, ít hơn | Bước 1: can 2 gấp 3 lần can 1 (5 × 3). | Hai bước: can nước mắm (20); thuyền (10, 7, 17). | Máy tính (10, 6, 16); số lớn hơn; chọn phép tính hai bước. |
| MT3 | Đoạn gấp khúc và tóm tắt | Đường gấp khúc ABC: BC bằng 2 lần AB (bước 1). | Đường gấp khúc: độ dài ABC (9, 18, 27). | Chọn đề toán khớp sơ đồ (ngô, gạo); điền đáp số. |
| MT4 | Tìm lỗi và chọn phép tính | Bạn An làm một bước rồi dừng: đúng hay sai. | Chọn dãy hai phép tính đúng; nhận ra "ít hơn" mà cộng. | Bạn nói đúng hay sai ("Em thấy thế nào?"); trả lời đúng bước hỏi. |

Tham số engine: `goal:10, soCau:18, soCauToiDa:24`. 4 mục tiêu × tối thiểu 3 câu = 12 ≤ 18.

## 2. Chín dạng (topics) — xếp theo mạch sư phạm

"Nguồn": **SGK** = có trong sách (mục ghi trong ngoặc) · **không có trong SGK** = dạng thêm.

| # | Dạng | Nguồn | MT | Mức 1 / Mức 2 / Mức 3 | Hình | Nhãn lỗi chính |
|---|---|---|---|---|---|---|
| D1 | Hoa cúc, hoa hồng | SGK (Khám phá, bài toán 1) | MT1 | M1: hoa hồng nhiều hơn hoa cúc k bông: hoa hồng · M2: hoa hồng và hoa cúc tất cả · M3: số lớn hơn, hỏi tất cả | **hình mới** `soDoHai` (đoạn cúc, đoạn hồng = cúc + k, ngoặc "? bông") | `thieu-buoc`, `cong-thay-nhan` |
| D2 | Hai ngăn sách | SGK (Khám phá, bài toán 2) | MT1 | M1: ngăn dưới nhiều hơn ngăn trên 3 quyển: ngăn dưới · M2: cả hai ngăn (10, 13, 23) · M3: số lớn hơn; hỏi cả hai ngăn | `soDoHai` | `thieu-buoc`, `tra-loi-sai-buoc` |
| D3 | Hai can nước mắm | SGK (Hoạt động 1) | MT2 | M1: can 2 gấp 3 lần can 1: can 2 (5 × 3) · M2: cả hai can (5 + 15) · M3: can 1 từ 4 đến 9 l, gấp 2 hoặc 3 lần, hỏi cả hai can | `soDoHai` (đoạn gấp) | `nham-gap-them`, `thieu-buoc` |
| D4 | Gấp thuyền | SGK (Hoạt động 2) | MT2 | M1: Nam gấp ít hơn Mai 3 cái: Nam · M2: cả hai bạn (10 + 7) · M3: Nam ít hơn Mai k cái; hỏi cả hai bạn, số lớn hơn | `soDoHai` (đoạn ít hơn) | `nham-it-nhieu`, `thieu-buoc` |
| D5 | Máy tính bán được | SGK (Luyện tập 1) | MT2 | M1: buổi chiều ít hơn buổi sáng 4 máy: buổi chiều (10 − 4) · M2: cả hai buổi (10 + 6) · M3: số lớn hơn (30 máy, ít hơn 12); chọn phép tính hai bước | `soDoHai` | `nham-it-nhieu`, `thieu-buoc` |
| D6 | Đường gấp khúc ABC | SGK (Luyện tập 2) | MT3 | M1: BC dài gấp 2 lần AB (9 cm): BC · M2: độ dài đường gấp khúc ABC (9 + 18) · M3: số khác (AB = 14, BC gấp 3 lần; ABC < 100) | **hình mới** `gapKhucABC` (đoạn AB, BC có nhãn cm) | `nham-gap-them`, `thieu-buoc` |
| D7 | Đề toán khớp sơ đồ | SGK (Luyện tập 3) | MT3 | M1: chọn đề toán khớp sơ đồ (ngô 30 kg, gạo ít hơn 10 kg) · M2: chọn đề và điền đáp số (cả hai bao) · M3: sơ đồ có "gấp"; chọn đề rồi điền | `soDoHai` + chữ | `nham-it-nhieu`, `nham-gap-them` |
| D8 | Bạn nói đúng hay sai | **không có trong SGK** | MT4 | M1: "Bạn An nói: 5 + 7 = 12 là số hoa hồng." · M2: "Bạn An làm một bước: hoa hồng 7 là đáp số của cả hai loại." · M3: "Bạn An nói: …" với "Đồng ý, vì…" / "Không đồng ý, vì…" | `anh('boy')` | `thieu-buoc`, `nham-it-nhieu` |
| D9 | Chọn dãy phép tính | **không có trong SGK** | MT4 | M1: bài toán nhiều hơn, chọn dãy hai phép tính đúng · M2: bài toán ít hơn · M3: bài toán gấp rồi cộng; phương án nhiễu "ít hơn mà cộng", "gấp mà cộng" | chữ | `nham-it-nhieu`, `nham-gap-them` |

Dạng không có trong SGK: **Bạn nói đúng hay sai (D8)**, **Chọn dãy phép tính (D9)** (2 dạng). Bảy dạng còn lại bám các mục của sách.

Phân bố: MT1 hai dạng (D1, D2) · MT2 ba dạng (D3, D4, D5) · MT3 hai dạng (D6, D7) · MT4 hai dạng (D8, D9). Mỗi mục tiêu ≥ 2 dạng.

### Luật lời câu hỏi (áp dụng cho cả bài)

- Nút **Đúng / Sai** chỉ đi với **mệnh đề**; câu "… có … không?" dùng nút **Có / Không**.
- Dạng "Bạn An nói …" dùng "Em thấy thế nào?" với "Đồng ý, vì…" / "Không đồng ý, vì…". Đáp án không tự mâu thuẫn với đề.
- Viết rõ **"nhiều hơn"**, **"ít hơn"**, **"gấp … lần"**; không viết "hơn" một mình.
- Câu hỏi hai bước ghi thứ tự: **"a) … b) …"**; mỗi ô chỉ một yêu cầu; không hỏi hai đại lượng trong một ô.
- Đáp án nhiễu **không chứa chính đối tượng đang hỏi**. Mọi đáp số < 100.
- Nhãn trong hình nằm giữa đúng đoạn nó đo; nhãn ở rìa khung chừa lề ≥ 1,3 lần cỡ chữ.

## 3. Hình mới cần vẽ (viết ngay trong `bai-28.js`, KHÔNG sửa `figures.js`)

Theo quy chuẩn `sk-ve-hinh-tieuhoc`: bảng màu `HM`, `svgHinh`, `nhanTron` / `nhanVien`; mỗi hình là MỘT SVG co theo màn hình; chữ ≥ 14px ở khổ điện thoại; nét và chữ dùng `currentColor`; nét thẳng có `fill="none"`; không emoji hệ thống.

| Hàm | Mô tả | Tham số | Kiểm do mã |
|---|---|---|---|
| `soDoHai(a, kieu, k, ten1, ten2, don, hoi)` | Sơ đồ đoạn thẳng hai đoạn: đoạn thứ nhất a phần (nhãn số); đoạn thứ hai: `nhieu` = đoạn thứ nhất cộng k phần; `it` = đoạn thứ nhất bớt k phần; `gap` = k đoạn bằng đoạn thứ nhất; ngoặc "? đơn vị" dưới đoạn hoặc cả hai đoạn. Mỗi phần `data-dem="phan"`; đơn vị đo `u` theo số lớn nhất. | a, kiểu, k, tên, đơn vị, nhãn hỏi | `check()` đếm phần = a (đoạn 1) và tổng số phần đoạn 2 khớp kiểu; nhãn số khớp. |
| `gapKhucABC(ab, bc)` | Đường gấp khúc A–B–C: hai đoạn thẳng nối ở B, nhãn cm đặt giữa từng đoạn (đoạn còn lại có thể ghi "? cm"). | ab, bc | `check()` BC = k × AB nếu đề nói "gấp k lần"; nhãn cm khớp số. |
| `soDoGap`, `theTinh` (chép từ `bai-24.js`) | Sơ đồ đoạn thẳng "gấp"; thẻ phép tính. | — | như bài 24. |

Hình dùng lại từ `figures.js`: `anh`, `oHoi`, `svgHinh`, `HM`, `nhanVien`.

## 4. Nhãn lỗi

- Chuẩn của engine dùng được: `thieu-buoc`, `cong-thay-nhan`, `chon-sai-phep`, `lech-nhom`.
- **Nhãn riêng của bài 28** (khai báo qua `BAI.loi`):

| Nhãn | Tên hiển thị | Ví dụ lỗi | Gợi ý |
|---|---|---|---|
| `nham-it-nhieu` | Nhầm "ít hơn" với "nhiều hơn" | Ít hơn 4 mà cộng 10 + 4 = 14 | "Ít hơn thì bớt đi: 10 − 4." |
| `nham-gap-them` | Nhầm "gấp n lần" với "thêm n đơn vị" | Gấp 3 lần mà cộng 5 + 3 = 8 | "Gấp 3 lần là nhân với 3: 5 × 3." |
| `tra-loi-sai-buoc` | Trả lời bước 1 thay bước 2 | Cả hai ngăn mà đáp 13 | "Câu hỏi cuối là cả hai ngăn: còn một bước nữa." |

## 5. Rủi ro đã biết

1. **Đáp số bước giữa là đáp số cuối:** trong bài hai bước, `make` tránh số bước 1 trùng số bước 2; `check()` tính lại cả hai bước từ số trong đề.
2. **Sơ đồ đoạn thẳng "ít hơn":** đoạn ngắn vẽ bằng a − k phần, có phần bớt đứt nét; số phần khớp số; không để nhãn "? bông" đè lên đoạn.
3. **Chọn đề khớp sơ đồ (D7):** bốn đề, đúng một đề khớp (đủ đại lượng, đúng "ít hơn / nhiều hơn / gấp"); đề nhiễu có cùng số nhưng đổi quan hệ.
4. **Hai ô nhập (bước 1, bước 2):** nếu engine chỉ có một ô, hỏi từng bước thành hai câu riêng (cùng một đề), hoặc chọn dãy phép tính; không đòi nhập hai số một lúc.
5. **Đường gấp khúc ABC:** vẽ đúng tỉ lệ đoạn dài (BC = 2 AB) nhưng nhãn cm là chữ; đoạn không chồng nhãn; điểm A, B, C có nhãn chữ cách đỉnh ≥ 14 đơn vị.
6. **Không nhãn sát biên:** font Linux hẹp hơn Segoe UI; thầy soát lại hình trên máy thầy (ghi trong PR).
7. `index.html` dùng CRLF: sửa bằng Python đọc/ghi nhị phân (không `sed -i`), diff đúng 1 dòng.
8. `kiem_dem.mjs` kiểm các `data-dem` của bài.

## 6. Việc sẽ làm sau khi thầy duyệt

1. Viết `bai-28.js` theo bảng trên (nối chuỗi, **không** backtick hay template literal), chép `bai-28.html`, sửa `index.html` (một dòng).
2. Chạy RIÊNG từng cổng (đặt `CHROME` nếu cần):
   - `node .claude/skills/sk-web-toan-tieuhoc/assets/kiemtra.js . bai-28.js 400000`
   - `node .claude/skills/sk-ve-hinh-tieuhoc/assets/phong_tranh.mjs . <thư mục tạm> bai-28 --soat --khong-chup --rong 375,1200 --giao light,dark --lan 3` → 0 lỗi
   - `node .claude/skills/sk-web-toan-tieuhoc/assets/soat_giao_dien.mjs . bai-28 --cau 2`
3. Tự soi ảnh phòng tranh (sơ đồ đoạn thẳng, đường gấp khúc), push, ghi kết quả từng cổng trong mô tả PR, đổi tiêu đề thành "[XONG] Bài 28", gỡ trạng thái nháp. Không tự gộp.

## 7. Cần thầy quyết (kèm phương án đề xuất)

1. **Mục SGK ở mục 0 và bảng dạng** có đúng không? Đề xuất: đúng như bảng.
2. **Hai bước nhập:** mỗi câu hỏi một bước (hai câu liên tiếp trong cùng ngữ cảnh) thay vì hai ô nhập: đồng ý (**đề xuất**).
3. **Chọn đề khớp sơ đồ (Luyện tập 3):** chọn một trong bốn đề rồi điền đáp số ở câu sau: đồng ý (**đề xuất**).
4. **Hai dạng "không có trong SGK" (D8, D9):** giữ (**đề xuất**) hay bớt?
5. **Ba nhãn riêng** (`nham-it-nhieu`, `nham-gap-them`, `tra-loi-sai-buoc`): giữ (**đề xuất**) hay gom về `thieu-buoc`, `cong-thay-nhan`?
6. **Bốn mục tiêu, chín dạng**; xếp lại thứ tự dạng theo sư phạm như bài 9–27 (**đề xuất**).
