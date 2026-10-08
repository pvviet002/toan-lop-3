# Phân tích sư phạm — Bài 13: Tìm thành phần trong phép nhân, phép chia (ĐÃ DUYỆT 08/10/2026, kèm chỉnh sửa của thầy)

Mẫu: `bai-9.js`, `bai-10.js`, `bai-11.js` (đã có Luyện thông minh) + khối "LUYỆN THÔNG MINH" ở đầu `engine.js`.
Phạm vi sửa: chỉ `bai-13.js` (và file phân tích này). Không đụng `engine.js`, `figures.js`, `lua.js`, `bai-13.html`. Đã viết mã và kiểm (xem mục 6).

Bài 13 **không phải bài bảng nhân 7, 8, 9** nên mục tiêu và nhãn lỗi khác: bé học **tìm thành phần chưa biết** (thừa số, số bị chia, số chia), không học thêm một bảng mới.

## 0. Nguồn và điều cần lưu ý

- Danh sách mục SGK (trang in 39–41) lấy từ **ghi chú đầu `bai-13.js` và `sec` hiện có**: Khám phá (tìm thừa số bằng chia đều; tìm số bị chia),
  Hoạt động 1 (tìm thừa số; tìm số chia), Hoạt động 2 (bảng thừa số–tích; bảng số bị chia–số chia–thương), Luyện tập (sơ đồ, giải toán).
  Tôi **chưa đối chiếu lại với sách**; cách đánh số các ý a, b, c của Khám phá và Hoạt động chưa rõ (xem câu hỏi 1).
- Hiện `bai-13.js` có 8 tab × 3 mức, **không** có `muctieu`, `mt`, `sai`, `goiY`, `soCau`.
- **Soát hình hiện trạng** (`phong_tranh.mjs . bai-13 --soat`): **6 lỗi, 1 cảnh báo** — có sẵn từ trước. Lỗi đều là **emoji hệ thống** trong Giải toán
  (bông hoa, quả cam, toa tàu); cảnh báo: màu ngoài bảng HM ở hình `jug` (ca nước, hình riêng của bài). Bài 13 có trong `chua_chuan.txt`
  nên chỉ bị cảnh báo khi đưa lên, nhưng lỗi emoji nên xử lý ở mục 5.

## 1. Năm mục tiêu (muctieu) × ba mức (Thông tư 27)

| MT | Tên | Mức 1 — Nhận biết | Mức 2 — Hiểu | Mức 3 — Vận dụng |
|---|---|---|---|---|
| MT1 | Tìm thừa số | Tìm thừa số trong bảng nhân 2–5; hiểu chia đều số lít cho 2–3 ca. | Tìm thừa số trong bảng 2–9; chia đều tới 5 ca. | Vế còn lại là một phép nhân (? × 4 = 3 × 8); bài hai bước (tìm một ca rồi tính vài ca). |
| MT2 | Tìm số bị chia | Tìm số bị chia với số chia, thương nhỏ (bảng 2–5). | Tìm số bị chia trong bảng chia 2–9. | Thương là một phép nhân (? : 4 = 2 × 3). |
| MT3 | Tìm số chia | Tìm số chia với số nhỏ (bảng 2–5). | Tìm số chia trong bảng chia 2–9. | Thương là một phép chia khác (24 : ? = 20 : 5). |
| MT4 | Bảng và sơ đồ | Tìm tích hoặc thương trong bảng, số nhỏ; sơ đồ một bước tìm số đầu (nhân hoặc chia cho 2, 3). | Tìm thừa số, số bị chia, số chia hoặc tích trong bảng 2–9; sơ đồ cho 2–5. | Số lớn (tới 10); sơ đồ HAI bước tính ngược từ cuối về đầu. |
| MT5 | Giải toán | Bài toán một bước với số nhỏ; chọn phép tính. | Bài toán một bước: tìm số đĩa, số người mỗi ca-bin, số bông hoa; chọn phép chia. | Bài toán hai bước (chia rồi trừ, chia rồi nhân); chọn biểu thức hai bước. |

Tham số engine: `goal:10, soCau:18, soCauToiDa:24`. 5 mục tiêu × tối thiểu 3 câu = 15 ≤ 18.

## 2. Mười một dạng (topics) — xếp theo mạch sư phạm

"Nguồn": **SGK** = tab có sẵn trong `bai-13.js` (mục lấy từ file, chưa đối chiếu sách) · **không có trong SGK** = dạng thêm.

| # | Dạng | Nguồn | MT | Mức 1 / Mức 2 / Mức 3 | Hình | Nhãn lỗi chính |
|---|---|---|---|---|---|---|
| D1 | Chia đều (ca nước) | SGK (Khám phá — tìm thừa số) | MT1 | M1: 2–3 ca, số nhỏ, gợi ý "? × n = tổng" · M2: tới 5 ca · M3: tìm một ca rồi tính vài ca | `jug` | `chon-sai-phep`, `lech-nhom`, `thieu-buoc` |
| D2 | Tìm thừa số | SGK (Hoạt động 1) | MT1 | M1: bảng 2–5, có gợi ý "tích chia thừa số kia" · M2: bảng 2–9 · M3: vế phải là phép nhân khác (? × 4 = 3 × 8) | chữ, ô `?` | `chon-sai-phep`, `cong-thay-nhan`, `dao-vai` |
| D3 | Tìm số bị chia | SGK (Khám phá) | MT2 | M1: bảng 2–5, gợi ý "thương nhân số chia" · M2: bảng 2–9 · M3: thương là phép nhân (? : 4 = 2 × 3) | chữ, ô `?` | `chon-sai-phep`, `cong-thay-nhan`, `dao-vai` |
| D4 | Tìm số chia | SGK (Hoạt động 1) | MT3 | M1: bảng 2–5, gợi ý "bị chia chia thương" · M2: bảng 2–9 · M3: thương là phép chia khác (24 : ? = 20 : 5) | chữ, ô `?` | `chon-sai-phep`, `cong-thay-nhan`, `dao-vai` |
| D5 | Bảng thừa số | SGK (Hoạt động 2) | MT4 | `tri`: M1 tìm tích · M2 tìm thừa số hoặc tích, bảng 2–9 · M3 tìm thừa số, số lớn | bảng 3 dòng | `chon-sai-phep`, `cong-thay-nhan`, `dao-vai` |
| D6 | Bảng chia | SGK (Hoạt động 2) | MT4 | `tri`: M1 tìm thương · M2 tìm số bị chia, số chia hoặc thương · M3 tìm số chia hoặc số bị chia, số lớn | bảng 3 dòng | `chon-sai-phep`, `cong-thay-nhan`, `dao-vai` |
| D7 | Sơ đồ | SGK (Luyện tập — Số?) | MT4 | M1: tìm số đầu sau × hoặc : cho 2, 3 · M2: cho 2–5 · M3: HAI bước tính ngược (+, − sau phép nhân) | `arrowFind`, `arrowFind2` | `thieu-buoc`, `dao-vai`, `chon-sai-phep` |
| D8 | Chọn cách tìm | **không có trong SGK** | MT1, MT2, MT3 | Cho phép tính có ô `?`; bé chọn phép tính tìm ô đó. M1: bảng 2–5 · M2: bảng 2–9 · M3: vế phải là phép tính. `make(lv, mt)` chọn thừa số (MT1), số bị chia (MT2) hay số chia (MT3) | chữ, MCQ | `chon-sai-phep`, `cong-thay-nhan`, `dao-vai` |
| D9 | Đúng / Sai, tìm lỗi | **không có trong SGK** | MT1, MT2, MT3 | M1: lỗi thô (cộng, trừ thay nhân, chia) · M2: lỗi tinh (lấy nhầm số, đổi vai) · M3: "Bạn An tính … , sai; kết quả đúng là?" | `anh('boy')` | `cong-thay-nhan`, `chon-sai-phep`, `dao-vai` |
| D10 | Giải toán | SGK (Luyện tập) | MT5 | M1: nhân, số nhỏ (lọ hoa) · M2: chia đều (đĩa cam, ca-bin) hoặc nhân · M3: hai bước (chia rồi trừ, chia rồi nhân) | **xem mục 5** | `chon-sai-phep`, `cong-thay-nhan`, `thieu-buoc` |
| D11 | Chọn phép tính | **không có trong SGK** | MT5 | M1: chọn phép nhân cho tình huống · M2: chọn phép chia · M3: chọn biểu thức hai bước | `jug`, `anh`, `hopBut` | `chon-sai-phep`, `cong-thay-nhan`, `dao-vai` |

Dạng không có trong SGK: **Chọn cách tìm, Đúng/Sai, Chọn phép tính** (3 dạng). Tám dạng còn lại là các tab hiện có.

Phân bố: MT1 bốn dạng (D1, D2, D8, D9) · MT2 ba dạng (D3, D8, D9) · MT3 ba dạng (D4, D8, D9) · MT4 ba dạng (D5, D6, D7) · MT5 hai dạng. Mỗi mục tiêu ≥ 2 dạng.

### Điểm riêng của bài 13 (tìm thành phần)

- **Lỗi quan trọng nhất:** chọn sai phép tính. Ví dụ "? × 4 = 24": bé lấy 24 × 4 = 96 (nhân thay chia, `chon-sai-phep`), hoặc 24 − 4 = 20 (trừ, `cong-thay-nhan`), hoặc 4 (chép số có sẵn, `dao-vai`).
  Với số bị chia: "? : 4 = 6" bé hay lấy 6 : 4 hoặc 6 + 4 = 10 (`cong-thay-nhan`) thay vì 6 × 4. Với số chia: "24 : ? = 6" bé hay lấy 24 × 6 hoặc 24 − 6.
- Mỗi câu có đáp án nhiễu gắn nhãn theo giá trị cụ thể trên (dùng `nhanSai()`), kèm gợi ý **riêng cho từng loại thành phần**:
  "Muốn tìm thừa số, lấy tích chia cho thừa số kia" · "Muốn tìm số bị chia, lấy thương nhân số chia" · "Muốn tìm số chia, lấy số bị chia chia cho thương".
- D8 (Chọn cách tìm) kiểm hiểu quy tắc, không cần tính ra kết quả.
- D7 M3: tính ngược hai bước phải **đảo thứ tự** (lỗi `thieu-buoc` khi chỉ đảo một bước; `chon-sai-phep` khi đảo sai dấu).

## 3. Cái giữ và cái đổi

- Giữ các hàm riêng của bài (`jug`, `ubox`, `eqline`, `tri`, `oVuong`, `muiTen`, `arrowFind`, `arrowFind2`, `capKhac`, `soLon`) và bộ sinh câu hiện có; thêm `mt`, `sai`, `goiY`, `make(lv, mt)`.
- `BAI.sub` thành câu "Luyện thông minh…"; thêm `soCau`, `soCauToiDa`, `muctieu`. Tab "Khám phá" đổi tên thành "Chia đều" (cho khác "Tìm số bị chia", cũng là Khám phá).
- Hàm hỗ trợ (`nhanSai`, `kiemMCQ`, `dsBtn13`) chép từ `bai-11.js`. Không thêm nhãn riêng: dùng 8 nhãn chuẩn của engine.
- `check()` giữ bất biến cũ (đáp số khớp, phép tính khớp) và thêm: không nhãn lỗi nào gắn vào đáp án đúng.

## 4. Rủi ro đã biết

1. Sao/mức theo dạng ở "Chọn dạng" lệch khi xếp lại thứ tự (đã chấp nhận ở bài 10, 11).
2. `kiem_dem.mjs` báo SAI vì `figures.js` trên `main` chưa có `data-dem` (đã biết, không sửa).
3. D8 và D9 dùng chung ba mục tiêu: phải đặt `q.mt` đúng thành phần, nếu không điểm bị ghi nhầm.
4. D2, D3, D4 mức 3 có vế phải là một phép tính: đáp số phải khác mọi đáp án nhiễu (`nhanSai` đã chặn trùng), và vế phải phải nguyên.

## 5. Hình: lỗi có sẵn và cách xử lý (cần thầy quyết)

- **Emoji trong Giải toán** (bông hoa, quả cam, toa tàu): đề xuất **bỏ hình, chỉ để lời văn**; không vẽ hình mới, không sửa `figures.js`.
  Muốn có hình thì giao riêng cho skill `sk-ve-hinh-tieuhoc`, làm sau ở bản trên máy thầy.
- **Hình `jug`** (ca nước, hình riêng trong `bai-13.js`) dùng màu ngoài bảng HM: chỉ cảnh báo (bài 13 có trong `chua_chuan.txt`). Đề xuất **giữ nguyên**; chuẩn hoá màu là việc của skill vẽ hình.

## 6. Kiểm (phiên đám mây 08/10/2026)

- `kiemtra.js . bai-13.js 400000` → ✅ OK (11 dạng; MT1:4 MT2:3 MT3:3 MT4:3 MT5:2).
- `phong_tranh.mjs . bai-13 --soat --khong-chup --rong 375,1200 --giao light,dark --lan 3` → **SOÁT HÌNH: ĐẠT**, **0 lỗi** (hết lỗi emoji); 4 cảnh báo là màu ngoài bảng HM của hình `jug` (bài 13 có trong `chua_chuan.txt`).
- `soat_giao_dien.mjs . bai-13 --cau 2` → **ĐẠT**, 0 lỗi, 0 cảnh báo; tự chơi Luyện thông minh 18 câu, 4 câu sai có gợi ý riêng.
- `kiem_dem.mjs`: SAI vì lý do đã biết (`data-dem` chưa lên `main`). Không sửa.

## 7. Quyết định của thầy (08/10/2026) và cách đã làm

1. **Mục SGK** có hai phần, `sec` ghi đúng sách: Khám phá (tìm thừa số trong một tích — ca nước) · Hoạt động 1 (tìm thừa số theo mẫu) · Hoạt động 2 (Số? bảng Thừa số · Thừa số · Tích) · Hoạt động 3 (giải toán ca-bin, chia đều) ·
   Khám phá a (tìm số bị chia — lọ hoa, nhân), b (tìm số chia — lọ hoa, chia theo nhóm) · Hoạt động 1 a, b · Hoạt động 2 (Số? bảng Số bị chia · Số chia · Thương) · Luyện tập 1 (Số? mũi tên tìm ô đầu) · Luyện tập 2 (giải toán đĩa cam).
2. **D2 Tìm thừa số:** Mức 1 chỉ có ô trống ở thừa số thứ nhất; từ Mức 2 có cả ô trống ở thừa số thứ hai (6 × ? = 24).
3. **D8 Sơ đồ:** Luyện tập 1 là một bước tìm ô đầu, cả × lẫn :. Mức 1–2 bám dạng này, cả hai chiều; Mức 3 hai bước.
4. **D10 Giải toán:** Mức 1 tìm tổng số hoa (lọ hoa, nhân). Mức 2 phân biệt rõ **chia đều** (tìm mỗi ca-bin) với **chia theo nhóm** (tìm số đĩa cam), thêm bài nhân. Mức 3 hai bước.
5. **Hình:** bỏ emoji. Bài lọ hoa dùng `anh('bouquet')`; bài khác chỉ lời văn. Giữ `jug`.
6. Năm mục tiêu giữ; xếp lại thứ tự theo sư phạm; 11 dạng, 3 dạng ngoài SGK. **Bài 12 hoãn** (thầy đang vẽ lại hình bài 12 trên máy).
