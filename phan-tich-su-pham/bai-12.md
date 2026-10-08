# Phân tích sư phạm — Bài 12: Bảng nhân 9, bảng chia 9 (BẢN NHÁP CHỜ DUYỆT)

Mẫu: `bai-9.js`, `bai-10.js`, `bai-11.js` (đã có Luyện thông minh) + khối "LUYỆN THÔNG MINH" ở đầu `engine.js`.
Phạm vi sửa: chỉ `bai-12.js` (và file phân tích này). Không đụng `engine.js`, `figures.js`, `lua.js`, `bai-12.html`. Chưa viết dòng mã nào.

## 0. Nguồn và điều cần lưu ý

- Danh sách mục SGK (trang in 36–38) lấy từ **ghi chú đầu `bai-12.js` và `sec` hiện có**: Khám phá (múa rồng; bảng nhân 9, bảng chia 9),
  Hoạt động 1 (tính nhẩm), Hoạt động 2 (hai phép tính cùng kết quả), Luyện tập (số còn thiếu, Số?, so với 10, giải toán).
  Tôi **chưa đối chiếu lại với sách** (phiên đám mây không có SGK); số thứ tự Luyện tập 1, 2, 3, 4 chưa rõ (xem câu hỏi 1).
- Hiện `bai-12.js` có 8 tab × 3 mức, **không** có `muctieu`, `mt`, `sai`, `goiY`, `soCau`.
- **Soát hình hiện trạng** (`phong_tranh.mjs . bai-12 --soat`): **8 lỗi, 2 cảnh báo** — có sẵn từ trước, không do thay đổi này:
  - Giải toán dùng **emoji hệ thống** (thuyền, cốc sữa/can nước mắm): lỗi chặn.
  - "So với 10" mức 3: phép tính dài ("63 : 9 + 3") trong `flower` chỉ **11.8px** (cần ≥ 14): lỗi chặn.
  - "Cùng kết quả" mức 3: "9 × 10 + 9" trong `melon` 12.0px: cảnh báo; màu ngoài bảng HM (hình `melon`, `flower`, `dragon` cũ): cảnh báo.
  - Bài 12 **không** có trong `chua_chuan.txt`, nên lỗi hình sẽ **chặn đưa lên** cho tới khi sửa. Hai cách sửa nằm ở mục 5 (không vẽ hình mới, không sửa `figures.js`).

## 1. Năm mục tiêu (muctieu) × ba mức (Thông tư 27)

| MT | Tên | Mức 1 — Nhận biết | Mức 2 — Hiểu | Mức 3 — Vận dụng |
|---|---|---|---|---|
| MT1 | Ý nghĩa phép nhân | Đếm các nhóm 9 bằng phép cộng các số 9 (2–3 nhóm). | Viết tổng 4–7 số 9 thành phép nhân; nhận ra 9 × n là n lần số 9. | Biết tổng, tìm số nhóm; nhận ra cách viết sai. |
| MT2 | Bảng nhân 9 | Nhớ 9 × 1 đến 9 × 5. | Nhớ cả bảng (9 × 6 … 9 × 10), đổi chỗ thừa số, nhận ra kết quả sai. | Dùng kết quả đã biết để tính nhanh (9 × 5 = 45 nên 9 × 6 = 45 + 9); chỉ ra lỗi của bạn. |
| MT3 | Bảng chia 9 | Chia nhẩm 18 : 9 … 45 : 9. | Chia nhẩm cả bảng (54 : 9 … 90 : 9); từ phép nhân suy ra phép chia. | Từ một phép nhân suy ra cả hai phép chia; tìm số bị chia; tìm lỗi sai của bạn. |
| MT4 | Liên hệ phép tính | Đếm thêm 9 (đầu dãy); sơ đồ nhân rồi chia số nhỏ; so kết quả với 10 khi kết quả khác xa 10; tìm phép tính cùng kết quả bằng cách đổi chỗ thừa số. | Đếm thêm hoặc bớt 9 (giữa dãy); sơ đồ nhân rồi chia các số trong bảng đã học; so với 10 khi kết quả sát 10; cùng kết quả ở bảng khác (45 : 9 = 20 : 4). | Dãy bị che ô cạnh; sơ đồ số lớn; so với 10 phép tính hai bước; hiểu cấu tạo bảng (9 × 5 = 9 × 4 + 9). |
| MT5 | Giải toán | Bài toán một phép nhân với số nhỏ; chọn phép nhân cho tình huống. | Nhân hoặc chia đều với 9; chọn phép chia. | Bài toán hai bước (nhân rồi trừ, chia rồi nhân); chọn biểu thức hai bước. |

Tham số engine: `goal:10, soCau:18, soCauToiDa:24`.

## 2. Mười ba dạng (topics) — xếp theo mạch sư phạm

"Nguồn": **SGK** = tab có sẵn trong `bai-12.js` (mục lấy từ file, chưa đối chiếu sách) · **không có trong SGK** = dạng thêm.

| # | Dạng | Nguồn | MT | Mức 1 / Mức 2 / Mức 3 | Hình | Nhãn lỗi chính |
|---|---|---|---|---|---|---|
| D1 | Múa rồng | SGK (Khám phá) | MT1 | M1: 2–3 đội, có gợi ý "tức là 9 × n" · M2: 4 đội, không gợi ý · M3: biết 9n người, tìm số đội | `dragon` | `lech-nhom`, `chon-sai-phep`, `cong-thay-nhan` |
| D2 | Tổng số 9 | **không có trong SGK** | MT1 | M1: tổng 2–3 số 9 → 9 × ? · M2: 5–7 số 9 · M3: Đúng hay Sai | chữ | `lech-nhom`, `dao-vai` |
| D3 | Lập bảng | SGK (Khám phá) | MT2, MT3 | `bnBang(9,…,true)`: M1 dòng đầu bảng nhân · M2 dòng cuối, nhân hoặc chia · M3 che dòng bên cạnh. `make(lv, mt)` chọn bảng nhân (MT2) hay bảng chia (MT3) | bảng | `canh-dong`, `cong-thay-nhan`, `nham-bang` |
| D4 | Nhân nhẩm | SGK (Hoạt động 1) | MT2 | M1: 9 × 1..5 · M2: 9 × k, k × 9 (k tới 10), nghiêng về k = 6..9 · M3: "Biết 9 × k = …, vậy 9 × (k±1) = ?" hoặc tìm số chưa biết (9 × ? = P) | chữ | `canh-dong`, `cong-thay-nhan`, `nham-bang`, `sai-buoc` |
| D5 | Chia nhẩm | SGK (Hoạt động 1) | MT3 | M1: 18 : 9 … 45 : 9 · M2: 54 : 9 … 90 : 9 · M3: biết 9 × k = P, tìm P : k; tìm số bị chia (? : 9 = k) | chữ | `canh-dong`, `cong-thay-nhan`, `dao-vai` |
| D6 | Nhân → chia | **không có trong SGK** | MT3 | M1: điền P : 9 từ 9 × k = P · M2: chọn phép chia đúng · M3: chọn phép tính KHÔNG suy ra được | chữ, MCQ | `dao-vai`, `cong-thay-nhan` |
| D7 | Cùng kết quả | SGK (Hoạt động 2) | MT4 | M1: đổi chỗ thừa số (9 × 4 = 4 × 9) · M2: phép tính ở bảng khác (45 : 9 = 20 : 4) · M3: 9 × 5 = 9 × 4 + 9 | `melon` hoặc `truck` (câu hỏi 3) | `canh-dong`, `sai-buoc` |
| D8 | Số còn thiếu | SGK (Luyện tập) | MT4 | `bnDaySo(9,…,'vuong','tron')`: M1 đầu dãy · M2 giữa dãy, thêm hoặc bớt · M3 che ô bên cạnh | `daySo` | `canh-dong`, `sai-buoc` |
| D9 | Sơ đồ | SGK (Luyện tập — Số?) | MT4 | M1: × 2 hoặc × 3 rồi : 3 hoặc : 9 · M2: × k rồi chia cho số trong bảng đã học · M3: số lớn, chia cho 4, 5, 6, 8 | `arrow2` | `thieu-buoc`, `cong-thay-nhan`, `chon-sai-phep` |
| D10 | So với 10 | SGK (Luyện tập) | MT4 | M1: kết quả khác xa 10 · M2: kết quả sát 10 (9, 10, 11) · M3: phép tính hai bước. **Phép tính ≤ 9 ký tự** (xem mục 5) | `flower` | chọn nhầm (đọc ngược lớn/bé): gợi ý chung |
| D11 | Đúng / Sai, tìm lỗi | **không có trong SGK** | MT2, MT3 | M1: lỗi thô (9 + k thay 9 × k) · M2: lỗi tinh (nhầm dòng bên cạnh, nhầm bảng 8 / 10) · M3: "Bạn An tính … = X, sai; kết quả đúng là?" | `anh('boy')` | `cong-thay-nhan`, `canh-dong`, `nham-bang` |
| D12 | Giải toán | SGK (Luyện tập) | MT5 | M1: n thuyền, mỗi thuyền 9 người · M2: nhân (thuyền, túi cam) hoặc chia đều (can nước) · M3: hai bước (nhân rồi trừ, chia rồi nhân) | **xem mục 5** | `cong-thay-nhan`, `lech-nhom`, `chon-sai-phep`, `thieu-buoc` |
| D13 | Chọn phép tính | **không có trong SGK** | MT5 | M1: chọn phép nhân · M2: chọn phép chia · M3: chọn biểu thức hai bước | `dragon`, `hopBut`, `anh` | `chon-sai-phep`, `cong-thay-nhan`, `dao-vai` |

Dạng không có trong SGK: **Tổng số 9, Nhân → chia, Đúng/Sai, Chọn phép tính** (4 dạng). Chín dạng còn lại là các tab hiện có (một số tách đôi: "Tính nhẩm" thành Nhân nhẩm và Chia nhẩm; "Lập bảng" dùng chung hai mục tiêu).

Phân bố: MT1 hai dạng · MT2 bốn dạng (D3, D4, D11 chung) · MT3 bốn dạng (D3, D5, D6, D11 chung) · MT4 bốn dạng · MT5 hai dạng. Mỗi mục tiêu ≥ 2 dạng.

### Điểm riêng của bảng 9

- Chỗ bé hay sai nhất: 9 × 6 … 9 × 9 (54, 63, 72, 81).
- Đáp án nhiễu hay gặp: **dòng bên cạnh** (9(k−1), 9(k+1)), **bảng bên cạnh** (8k, 10k), **cộng thay nhân** (9 + k). `saiNhan9(k)`; chia: `saiChia9(k)` (k±1, 9k − 9, và 9).
- **Gợi ý riêng cho bảng 9** (mẹo SGK-lành mạnh, không chép sách): "9 × k = 10 × k − k" và "kết quả của bảng nhân 9 có tổng hai chữ số bằng 9" (18, 27, 36 … 90).
- D7 M3 giữ cấu trúc "9 × 5 = 9 × 4 + 9"; lỗi `sai-buoc` khi bé lấy "9 × 4 + 1" hoặc "8 × 5 + 9".

## 3. Cái giữ và cái đổi

- Giữ bộ sinh câu hiện có (múa rồng, `bnBang`, `bnTinh`, cùng kết quả, `bnDaySo`, sơ đồ `arrow2`, so với 10, giải toán); thêm `mt`, `sai`, `goiY`, `make(lv, mt)`.
- `BAI.sub` thành câu "Luyện thông minh…"; thêm `soCau`, `soCauToiDa`, `muctieu`. Tab "Tính nhẩm" tách thành "Nhân nhẩm" và "Chia nhẩm".
- Hàm hỗ trợ (`nhanSai`, `kiemMCQ`, `dsBtn12`, `kyHieu`) chép từ `bai-11.js`. Bỏ hàm `btBang25` / `kiemCung` cũ nếu thay bằng bản có `check()` chặt hơn (giữ ý, cùng bất biến).
- Không thêm nhãn riêng: dùng 8 nhãn chuẩn của engine.

## 4. Rủi ro đã biết

1. Sao/mức theo dạng ở "Chọn dạng" lệch khi xếp lại thứ tự (đã chấp nhận ở bài 10, 11).
2. `kiem_dem.mjs` báo SAI vì `figures.js` trên `main` chưa có `data-dem` (đã biết, không sửa).
3. D3 và D11 phải đặt `q.mt` đúng nhánh nhân hoặc chia.
4. D7 mức 3: tránh hai đáp án cùng kết quả (`check` chặn).

## 5. Hình: lỗi có sẵn và cách xử lý (cần thầy quyết)

Soát hình hiện trạng (mục 0) bắt **lỗi chặn** ở bài 12. Hai việc cần xử lý để đưa lên được, **không cần vẽ hình mới và không sửa `figures.js`**:

- **Emoji trong Giải toán** (thuyền, cốc sữa/can): đề xuất **bỏ hình, chỉ để lời văn** (bài toán vẫn rõ). Muốn có hình thuyền, túi cam, can nước mắm thì giao riêng cho skill `sk-ve-hinh-tieuhoc`, làm sau ở bản trên máy thầy.
- **Chữ nhỏ ở "So với 10" mức 3**: giới hạn phép tính ≤ 9 ký tự (ví dụ "9 × 2 − 9"); chữ khi đó 13.8px, chỉ còn cảnh báo như bài 11. Bỏ các phép dài như "63 : 9 + 3", "81 : 9 + 1".
- "Cùng kết quả" dùng `melon` (SGK dưa hấu). Đề xuất **giữ `melon`**; cảnh báo 12.0px ở "9 × 10 + 9" chấp nhận được, hoặc đổi sang `truck` (bài 9) nếu thầy muốn bỏ cảnh báo. Màu ngoài bảng HM của `melon`, `flower`, `dragon` là việc của skill vẽ hình.

## 6. Việc sẽ làm sau khi thầy duyệt

1. Viết lại `bai-12.js` theo bảng trên (nối chuỗi, **không** backtick hay template literal).
2. Chạy RIÊNG từng cổng:
   - `node .claude/skills/sk-web-toan-tieuhoc/assets/kiemtra.js . bai-12.js 400000`
   - `node .claude/skills/sk-ve-hinh-tieuhoc/assets/phong_tranh.mjs . <thư mục tạm> bai-12 --soat --khong-chup --rong 375,1200 --giao light,dark --lan 3`
   - `node .claude/skills/sk-web-toan-tieuhoc/assets/soat_giao_dien.mjs . bai-12 --cau 2`
   (đặt biến `CHROME` trỏ tới Chromium của Playwright nếu công cụ không tự tìm thấy).
3. Push, ghi kết quả từng cổng trong mô tả PR, đổi tiêu đề thành "[XONG] Bài 12: Luyện thông minh", gỡ trạng thái nháp. Không tự gộp.

## 7. Cần thầy quyết (kèm phương án đề xuất)

1. **Mục SGK ở mục 0** có đúng không, và Luyện tập đánh số 1, 2, 3, 4 ra sao? Đề xuất: đúng như bảng; thầy (hoặc phiên máy thầy) cho số mục để ghi `sec` chuẩn.
2. **Giải toán**: bỏ emoji, chỉ lời văn (**đề xuất**) hay chờ vẽ hình?
3. **Cùng kết quả**: giữ `melon` (**đề xuất**) hay đổi `truck`?
4. **Thứ tự dạng**: xếp lại theo sư phạm như bài 9–11 (**đề xuất**).
5. D3 "Lập bảng" dùng chung MT2 và MT3 (**đề xuất**), hay tách bảng nhân và bảng chia thành hai dạng?
6. Xác nhận 13 dạng và 4 dạng "không có trong SGK".
