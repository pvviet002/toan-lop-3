# Phân tích sư phạm — Bài 11: Bảng nhân 8, bảng chia 8 (BẢN NHÁP CHỜ DUYỆT)

Mẫu: `bai-9.js`, `bai-10.js` (đã gộp) + khối "LUYỆN THÔNG MINH" ở đầu `engine.js`.
Phạm vi sửa: chỉ `bai-11.js` (và file phân tích này). Không đụng `engine.js`, `figures.js`, `lua.js`, `bai-11.html`
(`bai-11.html` đã nạp `lua.js`). Chưa viết dòng mã nào.

## 0. Nguồn và điều cần lưu ý

- Cấu trúc mục SGK Bài 11 (trang 33–35) lấy từ **bản tóm tắt của phiên Claude trên máy thầy** (đã đọc sách). Tôi **chưa tự đối chiếu sách**
  (phiên đám mây không có SGK). Chỉ ghi dạng bài và ý, không chép nguyên văn đề vào repo. Thầy xem lại bảng mục dưới đây.
- Công cụ soát giao diện, phòng tranh giờ chạy được trên đám mây nhờ bản Tailwind/confetti lưu sẵn (commit 535318c).
  `kiem_dem.mjs` vẫn sẽ báo SAI vì `figures.js` trên `main` chưa có `data-dem` (đã biết, thuộc skill vẽ hình, không sửa ở đây).
- Không sửa `figures.js` (thầy đang sửa dở bản trên máy). Cần hình mới thì nêu ở mục 5, **không vẽ**.

### Các mục SGK Bài 11 và chỗ `bai-11.js` hiện tại còn thiếu

| Mục SGK | Dạng bài (ý) | `bai-11.js` hiện tại |
|---|---|---|
| Khám phá a | Mỗi con bạch tuộc 8 xúc tu: cộng các số 8 → phép nhân → phép chia | Có (tab "Khám phá") |
| Khám phá b | Hoàn thành bảng nhân 8 **và bảng chia 8** (thêm 8 vào kết quả trước) | Có bảng nhân; **thiếu bảng chia** |
| Hoạt động 1 a | Bảng nhiều cột Thừa số · Thừa số · Tích | **Thiếu** |
| Hoạt động 1 b | Bảng nhiều cột Số bị chia · Số chia · Thương | **Thiếu** |
| Hoạt động 2 | Mỗi hộp bút 8 bút: nối câu "n hộp có bao nhiêu bút" với phép tính 8 × n | Có nhưng ghi `sec` sai ("Hoạt động 2 — Số?"), và là dạng tính số bút, không phải nối phép tính |
| Luyện tập 1 | Dãy đếm thêm 8 và dãy đếm bớt 8 (8 … 80) | Có (ghi `sec` "Luyện tập" chung) |
| Luyện tập 2 | Sơ đồ hai bước: 8 —× k→ ? —+ m→ ? | Có (ghi `sec` "Luyện tập" chung) |
| Luyện tập 3 | Chọn kết quả cho phép tính (ong mang phép tính bay tới hoa mang đáp số) | Có (ghi `sec` "Luyện tập" chung); hình ong, hoa chưa có |
| Luyện tập 4 | Con cua 8 chân, 2 càng: câu hỏi chân, câu hỏi càng. **Bẫy:** hỏi càng thì nhân với 2, không nhân với 8 | Có (ghi `sec` "Luyện tập — Giải toán (con cua)") |

## 1. Năm mục tiêu (muctieu) × ba mức (Thông tư 27)

| MT | Tên | Mức 1 — Nhận biết | Mức 2 — Hiểu | Mức 3 — Vận dụng |
|---|---|---|---|---|
| MT1 | Ý nghĩa phép nhân | Đếm các nhóm 8 bằng phép cộng các số 8 (2–3 nhóm). | Viết tổng 4–7 số 8 thành phép nhân; nhận ra 8 × n là n lần số 8. | Biết tổng, tìm số nhóm; nhận ra cách viết sai. |
| MT2 | Bảng nhân 8 | Nhớ 8 × 1 đến 8 × 5. | Nhớ cả bảng (8 × 6 … 8 × 10), đổi chỗ thừa số, nhận ra kết quả sai. | Dùng kết quả đã biết để tính nhanh (8 × 7 = 56 nên 8 × 8 = 56 + 8); chỉ ra lỗi của bạn. |
| MT3 | Bảng chia 8 | Chia nhẩm 16 : 8 … 40 : 8. | Chia nhẩm cả bảng (48 : 8 … 80 : 8); từ phép nhân suy ra phép chia. | Từ một phép nhân suy ra cả hai phép chia; tìm số bị chia; tìm lỗi sai của bạn. |
| MT4 | Liên hệ phép tính | Đếm thêm 8 (đầu dãy); sơ đồ nhân 8 rồi cộng một số nhỏ; chọn kết quả, các đáp án xa nhau. | Đếm thêm hoặc bớt 8 (giữa dãy); sơ đồ cộng số có hai chữ số; chọn kết quả nhân hoặc chia, đáp án gần nhau. | Dãy bị che ô cạnh; sơ đồ có trừ hoặc chia; chọn kết quả phép tính hai bước. |
| MT5 | Giải toán | Bài toán một phép nhân với số nhỏ, có hình để đếm (hộp bút, con cua); chọn phép nhân cho tình huống. | Nhân với số lớn; câu hỏi về càng (khác số chân mỗi con); chọn phép chia. | Hai bước (hộp bút và bút lẻ; chân cộng càng; hơn kém); chọn biểu thức hai bước. |

Tham số engine: `goal:10, soCau:18, soCauToiDa:24` (như bài 9, 10). 5 mục tiêu × tối thiểu 3 câu = 15 ≤ 18.

## 2. Mười bốn dạng (topics) — xếp theo mạch sư phạm

"Nguồn": **SGK** = có trong sách (mục ghi trong ngoặc) · **không có trong SGK** = dạng thêm để lộ cách hiểu, giống bài 9–10.

| # | Dạng | Nguồn | MT | Mức 1 / Mức 2 / Mức 3 | Hình | Nhãn lỗi chính |
|---|---|---|---|---|---|---|
| D1 | Bạch tuộc | SGK (Khám phá a) | MT1 | M1: 2–3 con, có gợi ý "tức là 8 × n" · M2: 4–5 con, không gợi ý · M3: biết 8n xúc tu, tìm số con | `bachTuoc`, `xepHang` | `lech-nhom`, `chon-sai-phep`, `cong-thay-nhan` |
| D2 | Tổng số 8 | **không có trong SGK** | MT1 | M1: tổng 2–3 số 8 → 8 × ? · M2: 5–7 số 8 · M3: Đúng hay Sai ("8+8+8+8 = 8 × 5") | chữ | `lech-nhom`, `dao-vai` |
| D3 | Nhân nhẩm | **không có trong SGK** | MT2 | M1: 8 × 1..5 · M2: 8 × k, k × 8 (k tới 10), nghiêng về k = 6..9 · M3: "Biết 8 × k = …, vậy 8 × (k±1) = ?" | chữ | `canh-dong`, `cong-thay-nhan`, `nham-bang`, `sai-buoc` |
| D4 | Bảng nhân | SGK (Khám phá b, Hoạt động 1a) | MT2 | M1–M2: hoặc bảng nhiều cột Thừa số · Thừa số · Tích (`bangCot`), hoặc bảng nhân 8 (`bnBang`) · M3: `bnBang` che hai dòng bên cạnh | `bangCot`, `bnBang` | `canh-dong`, `cong-thay-nhan`, `nham-bang` |
| D5 | Chia nhẩm | **không có trong SGK** | MT3 | M1: 16 : 8 … 40 : 8 · M2: 48 : 8 … 80 : 8 · M3: biết 8 × k = P, tìm P : k | chữ | `canh-dong`, `cong-thay-nhan`, `dao-vai` |
| D6 | Nhân → chia | **không có trong SGK** (ý có ở Khám phá a) | MT3 | M1: điền P : 8 từ 8 × k = P · M2: chọn phép chia đúng · M3: chọn phép tính KHÔNG suy ra được | chữ, MCQ | `dao-vai`, `cong-thay-nhan` |
| D7 | Bảng chia | SGK (Khám phá b, Hoạt động 1b) | MT3 | M1: tìm thương, số nhỏ (Số bị chia · Số chia · Thương) · M2: số lớn, hoặc `bnBang(8,…,true)` bảng chia 8 · M3: tìm số bị chia | `bangCot`, `bnBang` | `canh-dong`, `cong-thay-nhan`, `dao-vai` |
| D8 | Số còn thiếu | SGK (Luyện tập 1) | MT4 | `bnDaySo(8,…,'vuong','tron')`: M1 đầu dãy · M2 giữa dãy, thêm hoặc bớt · M3 che ô bên cạnh | `daySo` | `canh-dong`, `sai-buoc` |
| D9 | Sơ đồ hai bước | SGK (Luyện tập 2) | MT4 | M1: × k rồi + số nhỏ · M2: × k rồi + số hai chữ số · M3: × k rồi − m, hoặc × k rồi : 2 / : 4 | `soDo` | `thieu-buoc`, `cong-thay-nhan`, `chon-sai-phep` |
| D10 | Chọn kết quả | SGK (Luyện tập 3) | MT4 | M1: 8 × k, 3 lựa chọn xa nhau · M2: nhân hoặc chia, 4 lựa chọn gần nhau · M3: 8 × k ± 8 | chữ, MCQ (ong và hoa: xem mục 5) | `canh-dong`, `cong-thay-nhan`, `nham-bang` (gắn theo giá trị) |
| D11 | Hộp bút | SGK (Hoạt động 2) | MT5 | M1: n hộp, **chọn phép tính 8 × n** (nối câu với phép tính, n nhỏ) · M2: tính số bút, tới 10 hộp · M3: tìm số hộp, hoặc hộp và bút lẻ | `hopBut`, `xepHang` | `cong-thay-nhan`, `lech-nhom`, `thieu-buoc`, `chon-sai-phep` |
| D12 | Đúng / Sai, tìm lỗi | **không có trong SGK** | MT2, MT3 | M1: lỗi thô (8 + k thay 8 × k) · M2: lỗi tinh (nhầm dòng bên cạnh, nhầm bảng 7 / 9) · M3: "Bạn An tính … = X, sai; kết quả đúng là?" | `anh('boy')` | `cong-thay-nhan`, `canh-dong`, `nham-bang` |
| D13 | Con cua | SGK (Luyện tập 4) | MT5 | M1: n con, hỏi **chân** (có hình từng con) · M2: hỏi **chân hoặc càng** (càng nhân 2, không nhân 8) · M3: chân cộng càng, hoặc hơn kém | `conCua`, `xepHang` | **`nham-so-moi-con`** (mới), `cong-thay-nhan`, `thieu-buoc`, `chon-sai-phep` |
| D14 | Chọn phép tính | **không có trong SGK** | MT5 | M1: chọn phép nhân · M2: chọn phép chia · M3: chọn biểu thức hai bước | `hopBut`, `conCua`, `bachTuoc`, `anh` | `chon-sai-phep`, `cong-thay-nhan`, `dao-vai` |

Dạng không có trong SGK: **Tổng số 8, Nhân nhẩm, Chia nhẩm, Nhân → chia, Đúng/Sai, Chọn phép tính** (6 dạng). Tám dạng còn lại bám SGK.

Phân bố theo mục tiêu: MT1 hai dạng · MT2 ba dạng (có D12) · MT3 bốn dạng (có D12) · MT4 ba dạng · MT5 ba dạng. Mỗi mục tiêu ≥ 2 dạng.

### Điểm riêng của bài 11 cần xử lý trong ngân hàng câu

- 8 × 6, 8 × 7, 8 × 8, 8 × 9 (48, 56, 64, 72) là chỗ bé hay sai nhất; Mức 2 của D3 nghiêng về k = 6..9.
- Đáp án nhiễu hay gặp: **dòng bên cạnh** (8(k−1), 8(k+1)), **bảng bên cạnh** (7k, 9k), **cộng thay nhân** (8 + k).
  `saiNhan8(k)` dùng `nhanSai()` (bỏ giá trị ≤ 0 hoặc trùng đáp án đúng). Chia: `saiChia8(k)` gồm k±1, 8k − 8, và 8 (`dao-vai`).
- Gợi ý tận dụng bảng đã học: "8 × 6 = 6 × 8, bé đã học ở bảng 6"; "8 × 7 = 7 × 8, bé đã học ở bảng 7".
- **Bẫy của Luyện tập 4 (D13):** hỏi số càng (mỗi con 2 càng) mà bé nhân với 8 (số chân). Đáp nhiễu là 8 × n, gắn nhãn riêng
  `nham-so-moi-con` ("Lấy nhầm số chân hay số càng của mỗi con"), gợi ý: "Câu này hỏi càng. Mỗi con có mấy càng?". Đây là **nhãn riêng duy nhất**
  của bài, khai báo qua `BAI.loi`. Lưu ý: ở bài 10 thầy đã bỏ nhãn riêng `sai-thu-tu`, nhưng nhãn này sách có chủ ý gài bẫy nên tôi đề xuất giữ (câu hỏi 5).
- D9 (sơ đồ hai bước): lỗi hay gặp là **dừng ở bước nhân** (`thieu-buoc`), **cộng hai số đầu** (k + m, `cong-thay-nhan`), **cộng thay trừ** (8k + m, `chon-sai-phep`).
- D10: nhãn gắn theo giá trị đáp án nhiễu: cách đáp án đúng 8 → `canh-dong`; bằng 8 + k hay k + 8 → `cong-thay-nhan`; bằng 7k / 9k → `nham-bang`.

## 3. Cái giữ và cái đổi

- **Giữ:** bộ sinh câu của các tab hiện có (bạch tuộc, số còn thiếu, sơ đồ, chọn kết quả, con cua, hộp bút), thêm `mt`, `sai`, `goiY`, `make(lv, mt)`.
- **Đổi tên và `sec` cho đúng SGK:** "Khám phá" thành "Bạch tuộc" (Khám phá a); "Lập bảng" gộp vào "Bảng nhân" (Khám phá b, Hoạt động 1a);
  "Hộp bút" ghi `sec` "Hoạt động 2", và M1 đổi thành chọn phép tính (khớp dạng nối của sách); ba dạng Luyện tập ghi đúng số mục 1, 2, 3, 4.
- **Thêm:** "Bảng chia" (Khám phá b, Hoạt động 1b) dùng `bangCot` và `bnBang(8,…,true)`.
- `BAI.sub` thành "Luyện thông minh: câu hỏi tự đổi theo bé — làm hết lượt để xem ngọn lửa!"; thêm `soCau`, `soCauToiDa`, `muctieu`.
- **Hàm hỗ trợ** (`nhanSai`, `kiemMCQ`, `dsBtn11`, `kyHieu`) chép từ `bai-10.js`, không sửa `figures.js`.
- **`check()`** mọi dạng giữ hai bất biến: đáp số khớp `_e`; câu MCQ có đúng một lựa chọn đúng, không trùng lựa chọn.

## 4. Rủi ro đã biết

1. Sao/mức theo dạng ở chế độ "Chọn dạng" của bé lệch khi xếp lại thứ tự dạng (đã chấp nhận ở bài 10; đề xuất cùng cách ở đây).
2. `kiem_dem.mjs` báo SAI vì `figures.js` trên `main` chưa có `data-dem`; ghi một dòng trong PR, không sửa.
3. Font Linux khác máy thầy: lỗi "chữ tràn / chữ nhỏ" chỉ hiện trên đám mây thì ghi chú trong PR, không sửa mò (CLAUDE.md luật 7).
4. D12 phải đặt `q.mt` đúng nhánh nhân hoặc chia, nếu không điểm bị ghi nhầm mục tiêu.
5. D9 ở M3 có phép chia (`: 2`, `: 4`): `check()` phải bảo đảm chia hết và kết quả nguyên.
6. D13 M2: câu hỏi chân và câu hỏi càng phải có đáp số khác nhau với mọi n (8n ≠ 2n với n ≥ 1), để nhãn `nham-so-moi-con` không bao giờ gắn vào đáp án đúng.

## 5. Hình cần (không vẽ trong lần này)

- **Hình con ong và bông hoa** cho Luyện tập 3 (D10): sách cho ong mang phép tính bay tới hoa mang đáp số. Trên `main` có `flower(expr)` (hoa mang phép tính),
  `bong(expr)`, nhưng **chưa có hình ong**. Đề xuất: D10 làm bằng `flower(expr)` có sẵn, **chưa vẽ ong**; nếu thầy muốn đúng sách, thầy giao việc vẽ ong và hoa
  mang đáp số cho skill `sk-ve-hinh-tieuhoc` (làm sau, ở bản trên máy thầy vì thầy đang sửa `figures.js`).
- Các hình khác (`bachTuoc`, `conCua`, `hopBut`, `soDo`, `bangCot`, `daySo`) đã có.

## 6. Việc sẽ làm sau khi thầy duyệt

1. Viết lại `bai-11.js` theo bảng trên (nối chuỗi, **không** backtick hay template literal).
2. Chạy RIÊNG từng cổng (không dùng `dang_web --thu`, vì nó dừng ở `kiem_dem` trước khi tới `soat_giao_dien`):
   - `node .claude/skills/sk-web-toan-tieuhoc/assets/kiemtra.js . bai-11.js 400000`
   - `node .claude/skills/sk-ve-hinh-tieuhoc/assets/phong_tranh.mjs . /tmp/pt bai-11 --soat --khong-chup --rong 375,1200 --giao light,dark --lan 3`
   - `node .claude/skills/sk-web-toan-tieuhoc/assets/soat_giao_dien.mjs . bai-11 --cau 2`
3. Push, ghi kết quả từng cổng trong mô tả PR, đổi tiêu đề thành "[XONG] Bài 11: Luyện thông minh", gỡ trạng thái nháp. Không tự gộp.

## 7. Cần thầy quyết (kèm phương án đề xuất)

1. **Danh sách mục SGK ở mục 0** có đúng không? Đề xuất: đúng như bảng (theo tóm tắt phiên máy thầy); thầy sửa nếu lệch.
2. **Thứ tự dạng:** xếp lại theo sư phạm như bài 9–10 (**đề xuất**, chấp nhận lệch sao/mức cũ ở "Chọn dạng") hay giữ thứ tự cũ?
3. **Hộp bút (Hoạt động 2)** thuộc **MT5** (đề xuất; M1 là chọn phép tính 8 × n) hay MT1 (nhận ra phép nhân)?
4. **Chọn kết quả (Luyện tập 3)** thuộc **MT4** (đề xuất, vì mức 3 là hai bước) hay MT2/MT3?
5. **Nhãn riêng `nham-so-moi-con`** cho bẫy "hỏi càng mà nhân 8" ở Luyện tập 4: **giữ** (đề xuất, sách chủ ý gài bẫy) hay bỏ, gom vào `lech-nhom`?
6. **Hình ong** cho Luyện tập 3: dùng `flower` có sẵn trước (**đề xuất**) hay chờ vẽ ong?
7. Xác nhận 14 dạng và 6 dạng "không có trong SGK" như bài 10.
