# Phân tích sư phạm — Bài 10: Bảng nhân 7, bảng chia 7 (BẢN NHÁP CHỜ DUYỆT)

Mẫu: `bai-9.js` + khối "LUYỆN THÔNG MINH" ở đầu `engine.js` (commit db5dfbc).
Phạm vi sửa: chỉ `bai-10.js`. Không đụng `engine.js`, `figures.js`, `lua.js`, `bai-10.html`
(`bai-10.html` đã nạp `lua.js` từ db5dfbc). Chưa viết dòng code nào.

## 0. Hiện trạng và điều chưa kiểm chứng được

- `bai-10.js` hiện ở chế độ "Chọn dạng": 7 dạng × 3 mức, **không** có `muctieu`, `mt`, `sai`, `goiY`, `soCau`.
- Chế độ Luyện thông minh của engine bật khi `BAI.muctieu` có dữ liệu. Mỗi dạng cần `mt:[…]`, `levels:3`, `muc:[…]`, `make(lv, mt)`, `check(q)`.
  Đáp án nhiễu gắn nhãn lỗi qua `q.sai`, gợi ý qua `q.goiY`.
- **Không tìm thấy trong repo:** `CLAUDE.md`, skill `sk-web-toan-tieuhoc`, và file `bai-09.md` mà đầu `bai-9.js` nhắc
  (`E:/Dat_Thoi/Lop3/phan-tich-su-pham/bai-09.md`). Các quy ước dưới đây tôi suy ra từ `bai-9.js`,
  phần đầu `engine.js`, `figures.js` và thông điệp commit db5dfbc. Nếu `CLAUDE.md` hay skill có quy tắc khác
  (cấu trúc file phân tích, danh sách việc phải kiểm), xin gửi để tôi đối chiếu trước khi viết code.
- Tôi không có SGK trang in của Bài 10. Tên mục (`sec`) giữ nguyên như file hiện tại. Số trang và tên mục
  Khám phá / Hoạt động / Luyện tập cần bạn xác nhận (xem mục 7).

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

## 2. Mười ba dạng (topics)

Dạng có sẵn tái dùng hình và bộ sinh câu hiện có. Dạng mới đánh dấu **(mới)**. Cột "Nhãn lỗi" là nhãn gắn cho đáp án nhiễu.

| # | Dạng | MT | Mức 1 / Mức 2 / Mức 3 | Hình | Nhãn lỗi chính |
|---|---|---|---|---|---|
| D1 | Khám phá (đội kéo co) | MT1 | M1: 2–3 đội, có gợi ý "tức là 7 × n" · M2: 4–5 đội, không gợi ý · M3: biết 7n bạn, tìm số đội | `doiKeoCo` | `lech-nhom`, `chon-sai-phep`, `cong-thay-nhan` |
| D2 | Tổng số 7 **(mới)** | MT1 | M1: viết tổng 2–3 số 7 thành 7 × ? · M2: 5–7 số 7 · M3: "7+7+7+7 = 7 × 5" Đúng hay Sai? | chữ | `lech-nhom`, `dao-vai` |
| D3 | Nhân nhẩm **(mới)** | MT2 | M1: 7 × 1..5 · M2: 7 × k, k × 7 (k tới 10), ưu tiên k = 6..9 · M3: "Biết 7 × k = …, vậy 7 × (k±1) = ?" | chữ, `oHoi` | `canh-dong`, `cong-thay-nhan`, `nham-bang`, `sai-buoc` |
| D4 | Lập bảng | MT2 | Như hiện tại (`bnBang`): M1 dòng đầu · M2 dòng cuối · M3 che dòng bên cạnh. Thêm bảng nhiều cột kiểu `bangCot` ở M1–M2 | bảng | `canh-dong`, `cong-thay-nhan`, `nham-bang` |
| D5 | Chia nhẩm **(mới)** | MT3 | M1: 14 : 7 … 35 : 7 · M2: 42 : 7 … 70 : 7 · M3: biết 7 × k = P, tìm P : k | chữ | `canh-dong`, `cong-thay-nhan`, `dao-vai` |
| D6 | Nhân → chia **(mới)** | MT3 | M1: điền P : 7 từ 7 × k = P · M2: chọn phép chia đúng · M3: chọn phép tính KHÔNG suy ra được | chữ, MCQ | `dao-vai`, `cong-thay-nhan` |
| D7 | Mũi tên | MT4 | Như hiện tại: M1 × k (k 2..5) · M2 × hoặc : · M3 tìm ô đầu | `soDo` | `canh-dong`, `dao-vai`, `nham-bang` |
| D8 | Số còn thiếu (dãy) | MT4 | Như hiện tại (`bnDaySo(7,…)`) | `daySo` | `canh-dong`, `sai-buoc` |
| D9 | Chọn bóng | MT4 | Như hiện tại: M1 bé hơn N, kết quả xa nhau · M2 kết quả gần nhau · M3 hai điều kiện | `bong` | `sai-buoc` (chọn nhầm quả sát điều kiện) |
| D10 | So sánh | MT4 | Như hiện tại: M1 phép tính với số · M2 hai phép tính (có cặp 7 × k và k × 7) · M3 hai bước (7 × k ± 7) | chữ, MCQ | `sai-buoc`, nhãn mới `sai-thu-tu` (xem mục 4) |
| D11 | Đúng / Sai, tìm lỗi **(mới)** | MT2, MT3 | M1: lỗi thô (7 + k thay 7 × k) · M2: lỗi tinh (nhầm dòng bên cạnh, nhầm bảng) · M3: "Bạn An tính … = X. An sai, kết quả đúng là?" | `anh('boy')` | `cong-thay-nhan`, `canh-dong`, `nham-bang` |
| D12 | Giải toán | MT5 | Như hiện tại: M1 nhân (tuần lễ, có hình) · M2 chia đều hoặc nhân lớn · M3 hai bước | `tuanLe`, `hopCoc` | `cong-thay-nhan`, `lech-nhom`, `chon-sai-phep`, `thieu-buoc` |
| D13 | Chọn phép tính **(mới)** | MT5 | M1: chọn phép nhân (cộng nhầm là lỗi) · M2: chọn phép chia · M3: chọn biểu thức hai bước | `tuanLe`, `hopCoc`, `doiKeoCo`, `anh('bouquet')` | `chon-sai-phep`, `cong-thay-nhan`, `dao-vai` |

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

- **Giữ:** toàn bộ 7 dạng hiện có (tên, `sec`, hình, ý tưởng 3 mức) — chỉ thêm `mt`, `sai`, `goiY`, và `make(lv, mt)`.
- **Đổi:** `BAI.sub` thành "Luyện thông minh: câu hỏi tự đổi theo bé — làm hết lượt để xem ngọn lửa!"; thêm `soCau`, `soCauToiDa`, `muctieu`.
- **Hàm hỗ trợ** (`nhanSai`, `kiemMCQ`, `dsBtn`, `kyHieu`) chép từ `bai-9.js` sang `bai-10.js` (đổi tên `dsBtn10`).
  Hai bài hiện không dùng chung; chuyển vào `figures.js` là việc khác, chỉ làm khi bạn đồng ý (câu hỏi 3).
- **`check()`** mọi dạng giữ hai bất biến: đáp số khớp `_e`; câu MCQ có đúng một lựa chọn đúng, không trùng lựa chọn.

## 4. Nhãn lỗi

Engine có sẵn: `canh-dong`, `nham-bang`, `cong-thay-nhan`, `sai-buoc`, `chon-sai-phep`, `lech-nhom`, `dao-vai`, `thieu-buoc`
(cả tên hiển thị `LOI_TEN` lẫn gợi ý mặc định `LOI_GOIY`). Bài 10 dùng được toàn bộ.

Đề xuất thêm **một** nhãn riêng cho bài qua `BAI.loi` (engine cho phép): `sai-thu-tu` = "Làm sai thứ tự phép tính"
(7 × 4 + 7 bị tính thành 7 × 11 = 77 ở D10 mức 3). Nếu bạn thấy thừa, bỏ nhãn này và gom vào `sai-buoc`.

## 5. Rủi ro kỹ thuật

1. **Chỉ số dạng và tiến độ đã lưu.** Engine lưu `PROG.stars/muc/lich` theo chỉ số dạng trong `localStorage`
   (`toanlop3-bai-10`). Đổi thứ tự dạng sẽ làm sao/mức cũ của bé lệch sang dạng khác.
   Cách tránh: giữ 7 dạng hiện có ở chỉ số 0–6 đúng thứ tự cũ, dạng mới nối tiếp ở 7–12 (xem câu hỏi 2).
2. **Công cụ kiểm không có trong repo.** Commit db5dfbc nhắc `kiemtra.js` và `soat_giao_dien` (có lẽ nằm ổ E:).
   Tôi sẽ viết một script Node tạm trong thư mục scratchpad, nạp `figures.js` + `bai-10.js` trong `vm`, rồi:
   gọi `make(lv, mt)` 500 lần cho mỗi dạng × mức, chạy `check()`, kiểm nhãn lỗi không bao giờ gắn vào đáp án đúng,
   kiểm MCQ không trùng lựa chọn, kiểm `q.mt` hợp lệ. Việc soát giao diện bằng trình duyệt (Playwright/Chromium có sẵn) tôi sẽ chạy
   một lượt trọn vẹn: 18–24 câu, thấy ngọn lửa và bản đồ mục tiêu. Riêng bước soát tương phản/đổi giao diện của `soat_giao_dien` thì không làm lại được nếu không có công cụ đó.
3. **Chọn bóng mức 3** cần 4 quả bóng có giá trị phân biệt và đúng một quả nằm giữa hai mốc. Bộ sinh hiện tại có thể lặp lâu
   khi tập phép tính hẹp; tôi giữ vòng chặn `g<300` và thêm kiểm trong script.
4. **Dạng chung hai mục tiêu (D11).** Engine gọi `make(lv, mt)` với `mt` được chọn; D11 phải đặt `q.mt` theo đúng nhánh nhân hoặc chia
   (như `bai-9.js` D11), nếu không điểm bị ghi nhầm mục tiêu.

## 6. Việc sẽ làm sau khi bạn duyệt

1. Viết lại `bai-10.js` theo bảng trên (nối chuỗi, **không** dùng backtick hay template literal — quy tắc của engine).
2. Chạy script kiểm hàng loạt và soát giao diện trong trình duyệt; báo kết quả kèm lỗi nếu có.
3. Commit lên nhánh `claude/trusting-ritchie-clze5m`; không mở PR nếu bạn chưa yêu cầu.

## 7. Cần bạn quyết

1. `CLAUDE.md` và skill `sk-web-toan-tieuhoc` không có trong repo/phiên này. Bạn gửi nội dung (hoặc xác nhận cứ theo `bai-9.js`) được không?
2. Thứ tự dạng: **nối đuôi** (giữ chỉ số 0–6 cũ, dạng mới 7–12, bảo toàn tiến độ đã lưu — tôi đề xuất) hay **xếp lại theo sư phạm** như bài 9 (đẹp hơn ở tab "Chọn dạng", nhưng làm lệch sao/mức cũ)?
3. Chép hàm hỗ trợ sang `bai-10.js` (đề xuất, diff nhỏ) hay gom vào `figures.js` dùng chung cho cả bài 9–14?
4. Xác nhận tên mục SGK (`sec`) và số 13 dạng. Có dạng nào của SGK Bài 10 mà bản hiện tại thiếu không?
5. Nhãn riêng `sai-thu-tu` ở D10: giữ hay bỏ?
