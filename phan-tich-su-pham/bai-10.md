# Phân tích sư phạm — Bài 10: Bảng nhân 7, bảng chia 7 (ĐÃ DUYỆT 08/10/2026, kèm điều chỉnh của thầy)

Mẫu: `bai-9.js` + khối "LUYỆN THÔNG MINH" ở đầu `engine.js` (commit db5dfbc).
Phạm vi sửa: chỉ `bai-10.js` (và file phân tích này). Không đụng `engine.js`, `figures.js`, `lua.js`, `bai-10.html`
(`bai-10.html` đã nạp `lua.js` từ db5dfbc).

## 0. Hiện trạng và điều chưa kiểm chứng được

- `bai-10.js` hiện ở chế độ "Chọn dạng": 7 dạng × 3 mức, **không** có `muctieu`, `mt`, `sai`, `goiY`, `soCau`.
- Chế độ Luyện thông minh của engine bật khi `BAI.muctieu` có dữ liệu. Mỗi dạng cần `mt:[…]`, `levels:3`, `muc:[…]`, `make(lv, mt)`, `check(q)`.
  Đáp án nhiễu gắn nhãn lỗi qua `q.sai`, gợi ý qua `q.goiY`.
- `CLAUDE.md` và skill `sk-web-toan-tieuhoc` nằm trên `main` (commit c81a91c); bản này đã rebase và làm theo đó. Công cụ kiểm dùng bản thật trong `.claude/skills/sk-web-toan-tieuhoc/assets/`.
- Không có SGK trong phiên đám mây. Thầy đã đối chiếu SGK trang in 31–32: 13 dạng phủ đủ các mục; các điều chỉnh (a)–(d) ở mục 7 đã đưa vào bảng. Không chép nguyên văn đề sách vào repo.

## 1. Năm mục tiêu (muctieu) × ba mức (Thông tư 27: Nhận biết · Hiểu · Vận dụng)

| MT | Tên | Mức 1 — Nhận biết | Mức 2 — Hiểu | Mức 3 — Vận dụng |
|---|---|---|---|---|
| MT1 | Ý nghĩa phép nhân | Đếm các nhóm 7 bằng phép cộng các số 7 (2–3 nhóm). | Nhận ra 7 × n là n lần số 7; viết tổng 4–7 số 7 thành phép nhân. | Biết tổng, tìm số nhóm; nhận ra cách viết sai. |
| MT2 | Bảng nhân 7 | Nhớ 7 × 1 đến 7 × 5. | Nhớ cả bảng (7 × 6 … 7 × 10), đổi chỗ thừa số, nhận ra kết quả sai. | Dùng kết quả đã biết để tính nhanh (7 × 7 = 49 nên 7 × 8 = 49 + 7); chỉ ra lỗi của bạn. |
| MT3 | Bảng chia 7 | Chia nhẩm 14 : 7 … 35 : 7. | Chia nhẩm cả bảng (42 : 7 … 70 : 7); từ phép nhân suy ra phép chia. | Từ một phép nhân suy ra cả hai phép chia; tìm số bị chia, số chia chưa biết. |
| MT4 | Liên hệ phép tính | Tính theo mũi tên một bước; đếm thêm 7 (ô đầu dãy); so sánh phép tính với một số. | Mũi tên nhân hoặc chia; đếm thêm hoặc bớt 7 (ô giữa dãy); so sánh hai phép tính; chọn quả bóng bé hơn một số. | Mũi tên ngược (tìm ô đầu); dãy bị che ô cạnh; quả bóng thoả hai điều kiện; so sánh phép tính hai bước. |
| MT5 | Giải toán | Bài toán một phép nhân, có hình để đếm (tuần lễ 2–5). | Bài toán chia đều (cốc vào 7 hộp) hoặc nhân số lớn; chọn phép chia cho tình huống. | Bài toán hai bước (tuần lễ và ngày lẻ; chia rồi nhân); chọn biểu thức hai bước. |

Lý do chọn 5 mục tiêu: giống bài 9 để engine, bản đồ mục tiêu và ngọn lửa hoạt động như nhau giữa hai bài.
MT4 gom các dạng liên hệ phép tính SGK Bài 10 đang có (mũi tên, dãy số, chọn bóng, so sánh).
Bài 10 không có dạng "xe tải" hay "bướm → hoa" như bài 9, nên MT4 không phải thêm dạng nào ngoài các dạng này.

Tham số engine: `goal:10, soCau:18, soCauToiDa:24` (như bài 9). 5 mục tiêu × tối thiểu 3 câu = 15 ≤ 18.

## 2. Mười ba dạng (topics) — xếp theo mạch sư phạm như bài 9

"Nguồn" = **SGK** (có trong sách) hoặc **không có trong SGK** (dạng thêm để lộ cách hiểu). "Nhãn lỗi" là nhãn gắn cho đáp án nhiễu.

| # | Dạng | Nguồn | MT | Mức 1 / Mức 2 / Mức 3 | Hình | Nhãn lỗi chính |
|---|---|---|---|---|---|---|
| D1 | Đội kéo co | SGK (Khám phá) | MT1 | M1: 2–3 đội, có gợi ý "tức là 7 × n" · M2: 4–5 đội, không gợi ý · M3: biết 7n bạn, tìm số đội | `doiKeoCo` | `lech-nhom`, `chon-sai-phep`, `cong-thay-nhan` |
| D2 | Tổng số 7 | **không có trong SGK** | MT1 | M1: tổng 2–3 số 7 viết thành 7 × ? · M2: 5–7 số 7 · M3: Đúng hay Sai ("7+7+7+7 = 7 × 5") | chữ | `lech-nhom`, `dao-vai` |
| D3 | Nhân nhẩm | **không có trong SGK** | MT2 | M1: 7 × 1..5 · M2: 7 × k, k × 7, ưu tiên k = 6..9 · M3: "Biết 7 × k = …, vậy 7 × (k±1) = ?" | chữ | `canh-dong`, `cong-thay-nhan`, `nham-bang`, `sai-buoc` |
| D4 | Lập bảng | SGK (Khám phá) | MT2 | `bnBang`: M1 dòng đầu · M2 dòng cuối · M3 che dòng bên cạnh; M1–M2 có thêm bảng nhiều cột (Thừa số · Thừa số · Tích) | bảng | `canh-dong`, `cong-thay-nhan`, `nham-bang` |
| D5 | Chia nhẩm | **không có trong SGK** | MT3 | M1: 14 : 7 … 35 : 7 · M2: 42 : 7 … 70 : 7 · M3: biết 7 × k = P, tìm P : k | chữ | `canh-dong`, `cong-thay-nhan`, `dao-vai` |
| D6 | Nhân → chia | **không có trong SGK** | MT3 | M1: điền P : 7 từ 7 × k = P · M2: chọn phép chia đúng · M3: chọn phép tính KHÔNG suy ra được | chữ, MCQ | `dao-vai`, `cong-thay-nhan` |
| D7 | Mũi tên | SGK (Hoạt động 1) | MT4 | M1: × k (k 2..5) · M2: × hoặc : · M3: tìm ô đầu | `soDo` | `canh-dong`, `dao-vai`, `nham-bang`, `cong-thay-nhan` |
| D8 | Chọn bóng | SGK (Hoạt động 2) | MT4 | M1: chọn quả bé hơn N, kết quả xa nhau · M2: kết quả gần nhau; **một nửa số câu hỏi dạng số: "có bao nhiêu quả bé hơn N?"** · M3: hai điều kiện (chọn quả, hoặc đếm số quả) | `bong` | `lech-nhom` (câu đếm); câu chọn quả dùng gợi ý chung |
| D9 | Số còn thiếu | SGK (Luyện tập) | MT4 | `bnDaySo(7,…)`: M1 đầu dãy · M2 giữa dãy, thêm hoặc bớt · M3 che ô bên cạnh | `daySo` | `canh-dong`, `sai-buoc` |
| D10 | So sánh | SGK (Luyện tập) | MT4 | M1: phép tính với số · M2: hai phép tính nhân/chia, có cặp 7 × k và k × 7, **và cặp hai phép chia khác số chia (cùng số bị chia, hoặc hai thương bằng nhau)** · M3: hai bước (7 × k ± 7 và 7 × j) | chữ, MCQ | M3: `sai-buoc` (thêm hoặc bớt sai một lần 7) |
| D11 | Đúng / Sai, tìm lỗi | **không có trong SGK** | MT2, MT3 | M1: lỗi thô (7 + k thay 7 × k) · M2: lỗi tinh (nhầm dòng bên cạnh, nhầm bảng) · M3: "Bạn An tính … = X, sai; kết quả đúng là?" | `anh('boy')` | `cong-thay-nhan`, `canh-dong`, `nham-bang` |
| D12 | Giải toán | SGK (**Hoạt động 3**: tuần lễ, nhân · **Luyện tập 3**: chia cốc vào hộp) | MT5 | M1: nhân, tuần lễ có hình · M2: nhân hoặc chia đều · M3: hai bước | `tuanLe`, `hopCoc` | `cong-thay-nhan`, `lech-nhom`, `chon-sai-phep`, `thieu-buoc` |
| D13 | Chọn phép tính | **không có trong SGK** | MT5 | M1: chọn phép nhân · M2: chọn phép chia · M3: chọn biểu thức hai bước | `tuanLe`, `hopCoc`, `doiKeoCo`, `anh` | `chon-sai-phep`, `cong-thay-nhan`, `dao-vai` |

Dạng không có trong SGK: **Tổng số 7, Nhân nhẩm, Chia nhẩm, Nhân → chia, Đúng/Sai, Chọn phép tính** (6 dạng). Bảy dạng còn lại bám SGK.

Phân bố dạng theo mục tiêu: MT1 hai dạng · MT2 ba dạng (có D11) · MT3 ba dạng (có D11) · MT4 bốn dạng · MT5 hai dạng.
Mỗi mục tiêu có ít nhất 2 dạng để engine đan xen, không bắt bé làm một dạng liên tục.

### Điểm riêng của bảng 7 (khác bảng 6) cần xử lý trong ngân hàng câu

- 7 × 6, 7 × 7, 7 × 8, 7 × 9 (42, 49, 56, 63) là chỗ bé hay sai nhất. Mức 2 của D3 dùng `pick([6,7,8,9,10,rnd(2,10)])`, nghiêng về nhóm này như bài 9.
- Đáp án nhiễu hay gặp: **dòng bên cạnh** (7(k−1), 7(k+1)), **bảng bên cạnh** (6k, 8k — khác bài 9 là 5k, 7k), **cộng thay nhân** (7 + k).
  Hàm `saiNhan7(k)` dùng `nhanSai()`: bỏ giá trị ≤ 0 hoặc trùng đáp án đúng; hai nhãn trùng giá trị thì giữ nhãn xếp trước.
  Ví dụ k = 7: 6k = 42 = 7(k−1), giữ nhãn `canh-dong`.
- Gợi ý tận dụng bảng đã học (đổi chỗ thừa số): "7 × 6 = 6 × 7, bé đã học ở bảng 6" (`goiY` cho `nham-bang` / `canh-dong` ở k = 6).
- Chia: `saiChia7(k)` gồm k±1 (`canh-dong`), 7k − 7 (`cong-thay-nhan`), 7 (`dao-vai`, tự bỏ khi k = 7).
- Ngữ cảnh đời sống giữ nguyên SGK: đội kéo co (7 bạn), tuần lễ (7 ngày), hộp cốc.

## 3. Cái giữ và cái đổi trong dữ liệu

- **Giữ:** 7 dạng bám SGK (tên, hình, ý tưởng 3 mức) — thêm `mt`, `sai`, `goiY`; riêng Chọn bóng và So sánh có thêm biến thể theo điều chỉnh của thầy. Dạng "Khám phá" đổi tên tab thành "Đội kéo co" cho khác với dạng Lập bảng (cũng thuộc Khám phá).
- **Đổi:** `BAI.sub` thành "Luyện thông minh: câu hỏi tự đổi theo bé — làm hết lượt để xem ngọn lửa!"; thêm `soCau`, `soCauToiDa`, `muctieu`.
- **Hàm hỗ trợ** (`nhanSai`, `kiemMCQ`, `dsBtn`, `kyHieu`) chép từ `bai-9.js` sang `bai-10.js` (đổi tên `dsBtn10`). Không sửa `figures.js` (thầy chốt).
- **`check()`** mọi dạng giữ hai bất biến: đáp số khớp `_e`; câu MCQ có đúng một lựa chọn đúng, không trùng lựa chọn.

## 4. Nhãn lỗi

Engine có sẵn: `canh-dong`, `nham-bang`, `cong-thay-nhan`, `sai-buoc`, `chon-sai-phep`, `lech-nhom`, `dao-vai`, `thieu-buoc`
(cả tên hiển thị `LOI_TEN` lẫn gợi ý mặc định `LOI_GOIY`). Bài 10 dùng được toàn bộ.

Không thêm nhãn riêng (thầy bỏ `sai-thu-tu`): lỗi làm sai bước ở So sánh mức 3 gom vào `sai-buoc`. Câu chọn quả bóng không có nhãn lỗi; engine dùng gợi ý chung.

## 5. Rủi ro đã biết

1. **Tiến độ đã lưu.** Xếp lại thứ tự dạng nên sao/mức theo dạng ở chế độ "Chọn dạng" của bé có thể lệch sang dạng khác (thầy chấp nhận). Chế độ Luyện thông minh lưu theo mục tiêu nên không ảnh hưởng.
2. **Soát giao diện trên Linux.** Font khác máy thầy (CLAUDE.md luật 7): lỗi "chữ tràn, chữ nhỏ" chỉ hiện trên đám mây thì ghi chú trong PR, không sửa mò.
3. **Dạng chung hai mục tiêu (D11)** đặt `q.mt` đúng theo nhánh nhân hoặc chia.
4. **Chọn bóng dạng số:** lưới bóng 2 cột, câu "đếm" có quả bóng đúng bằng mốc để kiểm hiểu "bé hơn" nghĩa là không tính quả bằng.

## 6. Kiểm (phiên đám mây 08/10/2026)

- `kiemtra.js . bai-10.js 400000` → ✅ OK (13 dạng, MT1:2 MT2:3 MT3:3 MT4:4 MT5:2).
- `soat_giao_dien.mjs . bai-10` → **CHƯA soát được**: Chromium chạy nhưng trang không dựng, vì phiên đám mây chặn CDN
  (Tailwind, jsDelivr, unpkg, cdnjs; chỉ registry npm mở). Bài 9 cũng lỗi y hệt ⇒ lỗi môi trường, không phải mã bài 10.
  **Cần chạy trên máy thầy** (hoặc xem bản xem trước Vercel của PR).
- `kiem_dem.mjs .` → báo SAI 53 trên `figures.js` gốc repo (chưa có thuộc tính `data-dem` nào). Có từ trước, không liên quan bài 10
  (`figures.js` không đổi trong lần này), nên `dang_web.mjs . --thu` chưa thể ĐẠT. Việc gắn `data-dem` thuộc skill `sk-ve-hinh-tieuhoc`.

## 7. Quyết định của thầy (08/10/2026)

1. Làm theo `CLAUDE.md` và skill; dùng công cụ thật, không viết script tạm.
2. Xếp dạng theo sư phạm như bài 9; chấp nhận lệch sao/mức cũ ở chế độ Chọn dạng.
3. Chép hàm hỗ trợ sang `bai-10.js`, không sửa `figures.js`.
4. Đối chiếu SGK trang 31–32: 13 dạng đủ. Bổ sung: (a) Chọn bóng có câu hỏi dạng số (đếm quả); (b) So sánh mức 2 có cặp hai phép chia khác số chia; (c) Giải toán: tuần lễ là Hoạt động 3, chia cốc là Luyện tập 3; (d) ghi rõ dạng không có trong SGK.
5. Bỏ nhãn `sai-thu-tu`, gom vào `sai-buoc`.
