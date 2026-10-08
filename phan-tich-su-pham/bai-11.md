# Phân tích sư phạm — Bài 11: Bảng nhân 8, bảng chia 8 (BẢN NHÁP CHỜ DUYỆT)

Mẫu: `bai-9.js`, `bai-10.js` (đã gộp) + khối "LUYỆN THÔNG MINH" ở đầu `engine.js`.
Phạm vi sửa: chỉ `bai-11.js` (và file phân tích này). Không đụng `engine.js`, `figures.js`, `lua.js`, `bai-11.html`
(`bai-11.html` đã nạp `lua.js`). Chưa viết dòng mã nào.

## 0. Hiện trạng và điều CHƯA kiểm chứng

- `bai-11.js` hiện có 7 tab × 3 mức, **không** có `muctieu`, `mt`, `sai`, `goiY`, `soCau`; chưa có dạng tính nhẩm bảng chia 8.
- Các mục SGK (`sec`) tôi lấy nguyên từ file hiện tại: Khám phá (cộng các số 8), Khám phá (hoàn thành bảng nhân 8),
  Hoạt động 2 — Số? (hộp bút), Luyện tập (số còn thiếu, sơ đồ hai bước, chọn kết quả, giải toán con cua).
  **Không có Hoạt động 1** và không có mục nào về bảng chia 8. Ở bài 9 và bài 10, Hoạt động 1 là tính nhẩm. Tôi không có SGK trong phiên
  đám mây nên **không biết bài 11 sách còn mục nào mà bản hiện tại bỏ sót** (xem câu hỏi 1). Không đoán nội dung sách.
- Bảng dưới là **bản nháp suy từ file hiện tại**; chờ thầy đối chiếu SGK rồi mới chốt.

## 1. Năm mục tiêu (muctieu) × ba mức (Thông tư 27)

| MT | Tên | Mức 1 — Nhận biết | Mức 2 — Hiểu | Mức 3 — Vận dụng |
|---|---|---|---|---|
| MT1 | Ý nghĩa phép nhân | Đếm các nhóm 8 bằng phép cộng các số 8 (2–3 nhóm). | Viết tổng 4–7 số 8 thành phép nhân; nhận ra 8 × n là n lần số 8. | Biết tổng, tìm số nhóm; nhận ra cách viết sai. |
| MT2 | Bảng nhân 8 | Nhớ 8 × 1 đến 8 × 5. | Nhớ cả bảng (8 × 6 … 8 × 10), đổi chỗ thừa số, nhận ra kết quả sai. | Dùng kết quả đã biết để tính nhanh (8 × 7 = 56 nên 8 × 8 = 56 + 8); chỉ ra lỗi của bạn. |
| MT3 | Bảng chia 8 | Chia nhẩm 16 : 8 … 40 : 8. | Chia nhẩm cả bảng (48 : 8 … 80 : 8); từ phép nhân suy ra phép chia. | Từ một phép nhân suy ra cả hai phép chia; tìm số bị chia; tìm lỗi sai của bạn. |
| MT4 | Liên hệ phép tính | Đếm thêm 8 (đầu dãy); sơ đồ nhân 8 rồi cộng một số nhỏ; chọn kết quả, các đáp án xa nhau. | Đếm thêm hoặc bớt 8 (giữa dãy); sơ đồ cộng số có hai chữ số; chọn kết quả nhân, chia, đáp án gần nhau. | Dãy bị che ô cạnh; sơ đồ có trừ hoặc chia; chọn kết quả phép tính hai bước (8 × 5 + 8). |
| MT5 | Giải toán | Bài toán một phép nhân với số nhỏ, có hình để đếm (hộp bút, con cua). | Nhân với số lớn; bài chia đều; chọn đúng phép tính. | Bài toán hai bước (hộp và bút lẻ; chân + càng; hơn kém); chọn biểu thức hai bước. |

Tham số engine: `goal:10, soCau:18, soCauToiDa:24` (như bài 9, 10). 5 mục tiêu × tối thiểu 3 câu = 15 ≤ 18.

## 2. Mười ba dạng (topics) — xếp theo mạch sư phạm

"Nguồn": **SGK** = đang có trong `bai-11.js` (mục lấy từ file hiện tại, chưa đối chiếu sách) · **không có trong SGK** = dạng thêm
để lộ cách hiểu, giống bài 9–10. "Nhãn lỗi" gắn cho đáp án nhiễu.

| # | Dạng | Nguồn | MT | Mức 1 / Mức 2 / Mức 3 | Hình | Nhãn lỗi chính |
|---|---|---|---|---|---|---|
| D1 | Bạch tuộc | SGK (Khám phá) | MT1 | M1: 2–3 con, có gợi ý "tức là 8 × n" · M2: 4–5 con, không gợi ý · M3: biết 8n xúc tu, tìm số con | `bachTuoc`, `xepHang` | `lech-nhom`, `chon-sai-phep`, `cong-thay-nhan` |
| D2 | Tổng số 8 | **không có trong SGK** | MT1 | M1: tổng 2–3 số 8 → 8 × ? · M2: 5–7 số 8 · M3: Đúng hay Sai ("8+8+8+8 = 8 × 5") | chữ | `lech-nhom`, `dao-vai` |
| D3 | Nhân nhẩm | **không có trong SGK** | MT2 | M1: 8 × 1..5 · M2: 8 × k, k × 8 (k tới 10), nghiêng về k = 6..9 · M3: "Biết 8 × k = …, vậy 8 × (k±1) = ?" | chữ | `canh-dong`, `cong-thay-nhan`, `nham-bang`, `sai-buoc` |
| D4 | Lập bảng | SGK (Khám phá) | MT2 | `bnBang(8,…)`: M1 dòng đầu · M2 dòng cuối · M3 che dòng bên cạnh; M1–M2 có thêm bảng nhiều cột (Thừa số · Thừa số · Tích) | bảng | `canh-dong`, `cong-thay-nhan`, `nham-bang` |
| D5 | Chia nhẩm | **không có trong SGK** | MT3 | M1: 16 : 8 … 40 : 8 · M2: 48 : 8 … 80 : 8 · M3: biết 8 × k = P, tìm P : k | chữ | `canh-dong`, `cong-thay-nhan`, `dao-vai` |
| D6 | Nhân → chia | **không có trong SGK** | MT3 | M1: điền P : 8 từ 8 × k = P · M2: chọn phép chia đúng · M3: chọn phép tính KHÔNG suy ra được | chữ, MCQ | `dao-vai`, `cong-thay-nhan` |
| D7 | Số còn thiếu | SGK (Luyện tập) | MT4 | `bnDaySo(8,…,'vuong','tron')`: M1 đầu dãy · M2 giữa dãy, thêm hoặc bớt · M3 che ô bên cạnh | `daySo` | `canh-dong`, `sai-buoc` |
| D8 | Sơ đồ hai bước | SGK (Luyện tập) | MT4 | M1: × k rồi + số nhỏ · M2: × k rồi + số hai chữ số · M3: × k rồi − m, hoặc × k rồi : 2 / : 4 | `soDo` | `thieu-buoc`, `cong-thay-nhan`, `chon-sai-phep` |
| D9 | Chọn kết quả | SGK (Luyện tập) | MT4 | M1: 8 × k, 3 lựa chọn xa nhau · M2: nhân hoặc chia, 4 lựa chọn gần nhau · M3: 8 × k ± 8 | chữ, MCQ | `canh-dong`, `cong-thay-nhan`, `nham-bang` (tự gắn theo giá trị) |
| D10 | Hộp bút | SGK (Hoạt động 2 — Số?) | MT5 | M1: 2–4 hộp, có hình từng hộp · M2: tới 10 hộp · M3: tìm số hộp, hoặc hộp và bút lẻ | `hopBut` | `cong-thay-nhan`, `lech-nhom`, `thieu-buoc`, `chon-sai-phep` |
| D11 | Đúng / Sai, tìm lỗi | **không có trong SGK** | MT2, MT3 | M1: lỗi thô (8 + k thay 8 × k) · M2: lỗi tinh (nhầm dòng bên cạnh, nhầm bảng 7 / 9) · M3: "Bạn An tính … = X, sai; kết quả đúng là?" | `anh('boy')` | `cong-thay-nhan`, `canh-dong`, `nham-bang` |
| D12 | Giải toán (con cua) | SGK (Luyện tập) | MT5 | M1: 2–4 con, có hình từng con · M2: chân hoặc càng, số lớn hơn · M3: chân + càng, hoặc hơn kém | `conCua`, `xepHang` | `cong-thay-nhan`, `lech-nhom`, `thieu-buoc`, `chon-sai-phep` |
| D13 | Chọn phép tính | **không có trong SGK** | MT5 | M1: chọn phép nhân · M2: chọn phép chia · M3: chọn biểu thức hai bước | `hopBut`, `conCua`, `bachTuoc`, `anh` | `chon-sai-phep`, `cong-thay-nhan`, `dao-vai` |

Dạng không có trong SGK: **Tổng số 8, Nhân nhẩm, Chia nhẩm, Nhân → chia, Đúng/Sai, Chọn phép tính** (6 dạng). Bảy dạng còn lại là các tab hiện có.

Phân bố theo mục tiêu: MT1 hai dạng · MT2 ba dạng (có D11) · MT3 ba dạng (có D11) · MT4 ba dạng · MT5 ba dạng. Mỗi mục tiêu ≥ 2 dạng.

### Điểm riêng của bảng 8 cần xử lý trong ngân hàng câu

- 8 × 6, 8 × 7, 8 × 8, 8 × 9 (48, 56, 64, 72) là chỗ bé hay sai nhất; Mức 2 của D3 nghiêng về k = 6..9.
- Đáp án nhiễu hay gặp: **dòng bên cạnh** (8(k−1), 8(k+1)), **bảng bên cạnh** (7k, 9k), **cộng thay nhân** (8 + k).
  Hàm `saiNhan8(k)` dùng `nhanSai()` (bỏ giá trị ≤ 0 hoặc trùng đáp án đúng). Chia: `saiChia8(k)` gồm k±1, 8k − 8, và 8 (`dao-vai`).
- Gợi ý tận dụng bảng đã học: "8 × 6 = 6 × 8, bé đã học ở bảng 6"; "8 × 7 = 7 × 8, bé đã học ở bảng 7".
- D8 (sơ đồ hai bước): lỗi hay gặp là **dừng ở bước nhân** (`thieu-buoc`), **cộng hai số đầu** (k + m, `cong-thay-nhan`) và **cộng thay trừ** (8k + m, `chon-sai-phep`).
- D9: nhãn gắn theo giá trị đáp án nhiễu: cách đúng 8 → `canh-dong`; bằng 8 + k hay k + 8 → `cong-thay-nhan`; bằng 7k / 9k → `nham-bang`.
- D12 mức 3 "hơn kém": lỗi hay gặp là cộng thay vì trừ (`chon-sai-phep`), hoặc quên tính một trong hai số (`thieu-buoc`).

## 3. Cái giữ và cái đổi

- **Giữ:** 7 tab hiện có (tên, hình, ý tưởng 3 mức); thêm `mt`, `sai`, `goiY`, `make(lv, mt)`. Tab "Khám phá" đổi tên thành "Bạch tuộc" (cho khác "Lập bảng").
  Tab "Chọn kết quả" và "Sơ đồ" giữ bộ sinh câu, chỉ gắn nhãn lỗi.
- **Đổi:** `BAI.sub` thành "Luyện thông minh: câu hỏi tự đổi theo bé — làm hết lượt để xem ngọn lửa!"; thêm `soCau`, `soCauToiDa`, `muctieu`.
- **Hàm hỗ trợ** (`nhanSai`, `kiemMCQ`, `dsBtn11`, `kyHieu`) chép từ `bai-10.js`, không sửa `figures.js`.
- **`check()`** mọi dạng giữ hai bất biến: đáp số khớp `_e`; câu MCQ có đúng một lựa chọn đúng, không trùng lựa chọn.
- **Không thêm nhãn riêng** (`BAI.loi`): dùng 8 nhãn chuẩn của engine.

## 4. Rủi ro đã biết

1. Sao/mức theo dạng ở chế độ "Chọn dạng" của bé lệch khi xếp lại thứ tự dạng (đã chấp nhận ở bài 10; đề xuất cùng cách ở đây).
2. Cổng `soat_giao_dien.mjs` và `phong_tranh.mjs` không chạy được trên đám mây (CDN bị chặn); `kiem_dem.mjs` báo sai trên `figures.js` do chưa có `data-dem`.
   Sẽ ghi rõ trong PR "CHƯA soát giao diện / soát hình — cần chạy trên máy thầy" như bài 10.
3. D11 phải đặt `q.mt` đúng nhánh nhân hoặc chia, nếu không điểm bị ghi nhầm mục tiêu.
4. D8 ở M3 có phép chia (`: 2`, `: 4`): `check()` phải bảo đảm chia hết và kết quả nguyên (bộ sinh hiện tại đã làm; giữ).

## 5. Việc sẽ làm sau khi thầy duyệt

1. Viết lại `bai-11.js` theo bảng trên (nối chuỗi, **không** backtick hay template literal).
2. Chạy `kiemtra.js` (400000 lượt), `soat_giao_dien.mjs`, `dang_web.mjs . --thu`; báo kết quả từng cổng.
3. Commit lên nhánh của phiên, mở PR (nháp) vào `main` với bảng bám SGK và kết quả cổng kiểm.

## 6. Cần thầy quyết

1. **SGK:** thầy đối chiếu SGK Bài 11 với danh sách mục ở mục 0. Bài 11 sách có "Hoạt động 1" (tính nhẩm?) hoặc mục nào khác mà bản hiện tại bỏ sót không? Nếu có, thầy dán ảnh trang sách (không commit ảnh vào repo) hoặc nêu tên mục và dạng bài.
2. Thứ tự dạng: **xếp lại theo sư phạm** như bài 9–10 (đề xuất) hay giữ thứ tự cũ?
3. D10 "Hộp bút" xếp vào **MT5 (Giải toán)** (đề xuất, giống bài 9 có hộp bút) hay MT2 (Bảng nhân 8, vì sách ghi "Số?")?
4. D9 "Chọn kết quả" xếp vào **MT4** (đề xuất, vì mức 3 là hai bước) hay MT2/MT3?
5. Xác nhận 13 dạng và 6 dạng "không có trong SGK" như bài 10.
