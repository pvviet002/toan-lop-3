# Phân tích sư phạm — Bài 14: Một phần mấy (ĐÃ DUYỆT 08/10/2026, kèm chỉnh sửa của thầy)

Mẫu: `bai-9.js`, `bai-10.js`, `bai-11.js` (đã có Luyện thông minh) + khối "LUYỆN THÔNG MINH" ở đầu `engine.js`.
Phạm vi sửa: chỉ `bai-14.js` (và file phân tích này). Không đụng `engine.js`, `figures.js`, `lua.js`, `bai-14.html`. Đã viết mã và kiểm (xem mục 6).

Bài 14 là **bài khái niệm** (một phần hai, một phần tư … một phần chín), **không phải bảng nhân**. Mục tiêu và nhãn lỗi hoàn toàn khác bài 9–13:
bé phải hiểu "các phần **bằng nhau**" và gắn đúng "một phần mấy" với số phần, không với số phần chưa tô hay số vật được khoanh.

## 0. Nguồn và điều cần lưu ý

- Danh sách mục SGK (trang in 42–45) lấy từ **ghi chú đầu `bai-14.js` và `sec` hiện có**, khá đầy đủ: Khám phá (1/2, 1/4), Hoạt động 1 (Đ, S hình chữ nhật),
  Hoạt động 2 (chọn cách đọc), Hoạt động 3 (khoanh 1/4 số hạt dẻ), Luyện tập 1 (Đ, S hình tròn), Luyện tập 2 (tô màu 1/8 hình nào),
  Luyện tập 3 (khoanh rau), Luyện tập 4 (Số?). Tôi **chưa đối chiếu lại với sách** (phiên đám mây không có SGK).
- Hiện `bai-14.js` có 8 tab × 3 mức, **không** có `muctieu`, `mt`, `sai`, `goiY`, `soCau`.
- **Soát hình hiện trạng** (`phong_tranh.mjs . bai-14 --soat`): **2 lỗi, 1 cảnh báo** — có sẵn từ trước. Hai lỗi là **emoji hệ thống** (🧒 trứng, quyển sách…) ở "Chia đều" mức 3.
  Cảnh báo: nhiều màu ngoài bảng HM (hình riêng trong file). Bài 14 có trong `chua_chuan.txt` nên chỉ bị cảnh báo khi đưa lên; lỗi emoji nên xử lý ở mục 5.

## 1. Năm mục tiêu (muctieu) × ba mức (Thông tư 27)

| MT | Tên | Mức 1 — Nhận biết | Mức 2 — Hiểu | Mức 3 — Vận dụng |
|---|---|---|---|---|
| MT1 | Nhận ra một phần mấy trên hình | Nhận ra một phần hai, một phần ba, một phần tư trên hình tròn hoặc hình khác hẳn nhau. | Đếm số phần bằng nhau khi hình chia 3–9 phần, các lựa chọn gần giống nhau. | Chọn hình đúng khi có hình đủ số phần nhưng các phần KHÔNG bằng nhau. |
| MT2 | Đọc, viết một phần mấy | Đọc đúng một phần hai, một phần ba, một phần tư. | Đọc và viết tới một phần sáu (nhớ: một phần TƯ). | Chuyển qua lại cách đọc – cách viết tới một phần chín, các lựa chọn rất gần nhau. |
| MT3 | Các phần phải bằng nhau | Đếm số phần bằng nhau (2–5 phần) để biết câu nói đúng hay sai. | Không nhầm với số phần CHƯA tô màu; hình chia tới 9 phần. | Nhận ra các phần KHÔNG bằng nhau thì không gọi là một phần mấy. |
| MT4 | Một phần mấy của nhóm vật | Hình ít vật: biết khoanh một hàng hay một cột là một phần mấy. | Hình nhiều vật (10–15), đếm số hàng, số cột cẩn thận. | Hai hình cùng số vật xếp khác nhau: đếm số PHẦN bằng nhau, không đếm số vật khoanh. |
| MT5 | Tìm một phần mấy của một số | Tìm một phần mấy khi quả đã được chia sẵn thành các nhóm bằng nhau. | Tự chia đều số quả (có hình) để tìm một phần mấy; chọn phép chia. | Bài toán có lời: tìm một phần mấy, hoặc tìm phần CÒN LẠI (hai bước). |

Tham số engine: `goal:10, soCau:18, soCauToiDa:24`. 5 mục tiêu × tối thiểu 3 câu = 15 ≤ 18.

## 2. Mười một dạng (topics) — xếp theo mạch sư phạm

"Nguồn": **SGK** = tab có sẵn trong `bai-14.js` (mục lấy từ file, chưa đối chiếu sách) · **không có trong SGK** = dạng thêm.

| # | Dạng | Nguồn | MT | Mức 1 / Mức 2 / Mức 3 | Hình | Nhãn lỗi chính |
|---|---|---|---|---|---|---|
| D1 | Hình tròn | SGK (Khám phá) | MT1 | M1: chia 2 hoặc 4 phần, lựa chọn xa nhau · M2: 3–6 phần, lựa chọn gần nhau · M3: 6–9 phần | `tronPS` | `dem-phan-chua-to`, `lech-nhom` |
| D2 | Tô màu hình nào | SGK (Luyện tập 2) | MT1 | M1: chọn hình tô 1/2, 1/3, 1/4 · M2: lưới, tam giác, dải, hình tròn · M3: loại hình đủ số phần nhưng các phần KHÔNG bằng nhau | `hinhTo` | `phan-khong-bang`, `lech-nhom` |
| D3 | Cách đọc | SGK (Hoạt động 2) | MT2 | M1: một phần hai/ba/tư · M2: tới một phần sáu · M3: tới một phần chín; hai chiều (đọc → viết, viết → đọc) | `banh`, phân số dọc | `doc-nham`, `lech-nhom` |
| D4 | Đọc đúng hay sai | **không có trong SGK** | MT2 | M1: "1/4 đọc là một phần bốn" Đ hay S · M2: đúng/sai tới một phần sáu · M3: tới một phần chín, các cách đọc gần nhau | chữ | `doc-nham` |
| D5 | Đ/S hình chữ nhật | SGK (Hoạt động 1) | MT3 | M1: 2–4 phần · M2: 3–6 phần, bẫy đếm phần chưa tô · M3: thêm hình có các phần KHÔNG bằng nhau | `hcnPS` | `dem-phan-chua-to`, `phan-khong-bang` |
| D6 | Đ/S hình tròn | SGK (Luyện tập 1) | MT3 | M1: 3–5 phần · M2: 5–9 phần, bẫy phần chưa tô · M3: các phần KHÔNG bằng nhau | `tronPS` | `dem-phan-chua-to`, `phan-khong-bang` |
| D7 | Hạt dẻ | SGK (Hoạt động 3) | MT4 | M1: lưới nhỏ, khoanh một hàng hay một cột · M2: lưới 10–15 vật · M3: hai lưới cùng số vật, xếp khác nhau | `khoanh` (hạt dẻ) | `dem-vat-khoanh`, `lech-nhom` |
| D8 | Khoanh rau | SGK (Luyện tập 3) | MT4 | như D7 với cải bắp, xà lách | `khoanh` (cải bắp, xà lách) | `dem-vat-khoanh`, `lech-nhom` |
| D9 | Chia đều | SGK (Luyện tập 4) | MT5 | M1: quả đã chia sẵn thành nhóm · M2: quả để rời, bé tự chia · M3: bài toán có lời, hoặc tìm phần CÒN LẠI | `vat` (táo, cam) | `dao-vai`, `thieu-buoc`, `chon-sai-phep` |
| D10 | Một phần mấy của số | **không có trong SGK** | MT5 | M1: "1/2 của 8 là mấy?" (số nhỏ) · M2: "1/n của N" với N = n × m, n tới 5 · M3: "1/n của N, còn lại là mấy?" | chữ, phân số dọc | `dao-vai`, `chon-sai-phep`, `thieu-buoc` |
| D11 | Chọn phép tính | **không có trong SGK** | MT5 | M1: "1/2 số kẹo" → chia 2 · M2: "1/n số quả" → chia n · M3: biểu thức hai bước (tìm 1/n rồi trừ) | `vat`, `anh` | `chon-sai-phep`, `dao-vai` |

Dạng không có trong SGK: **Đọc đúng hay sai, Một phần mấy của số, Chọn phép tính** (3 dạng). Tám dạng còn lại là các tab hiện có.

Phân bố: MT1 hai dạng · MT2 hai dạng · MT3 hai dạng · MT4 hai dạng · MT5 ba dạng. Mỗi mục tiêu ≥ 2 dạng.

### Nhãn lỗi riêng của bài 14 (khai báo qua `BAI.loi`)

Nhãn chuẩn của engine không mô tả được lỗi hiểu khái niệm một phần mấy, nên đề xuất **bốn nhãn riêng** (engine cho phép, như bài 11):

| Nhãn | Tên hiển thị | Ví dụ lỗi | Gợi ý |
|---|---|---|---|
| `dem-phan-chua-to` | Đếm số phần chưa tô thay vì tổng số phần | Hình chia 5 phần, tô 1: bé chọn 1/4 | "Bé đếm TẤT CẢ các phần bằng nhau, cả phần đã tô." |
| `dem-vat-khoanh` | Đếm số vật được khoanh thay vì số phần bằng nhau | Khoanh 3 vật trong lưới 2 × 3: bé chọn 1/3 vì 3 vật | "Bé đếm xem khoanh được mấy PHẦN bằng nhau, không đếm số vật." |
| `phan-khong-bang` | Quên kiểm tra các phần có bằng nhau không | Hình 4 phần to nhỏ khác nhau, bé vẫn chọn 1/4 | "Muốn nói một phần mấy, các phần phải BẰNG NHAU." |
| `doc-nham` | Nhầm cách đọc | "một phần bốn" chọn thành 1/5; "tư" và "bốn" lẫn | "Bé nhớ: 1/4 đọc là một phần TƯ; 1/2 một phần hai." |

Các nhãn chuẩn dùng thêm: `lech-nhom` (đếm thiếu/thừa một phần), `dao-vai` (nhầm n với N, ví dụ "1/4 của 12 là 4"), `chon-sai-phep` (nhân thay chia), `thieu-buoc`.

## 3. Cái giữ và cái đổi

- Giữ các hàm hình riêng của bài (`tronPS`, `hcnPS`, `banh`, `hinhTo`, `khoanh`, `vat`, `fr`, `frBig`, `gan`, `xa`, `phanLech`…) và bộ sinh câu hiện có; thêm `mt`, `sai`, `goiY`, `make(lv, mt)`.
- `BAI.sub` thành câu "Luyện thông minh…"; thêm `soCau`, `soCauToiDa`, `muctieu`, `loi`. Tab "Khám phá" đổi tên thành "Hình tròn" (cho rõ).
- Với mcq, nhãn lỗi gắn theo **chỉ số lựa chọn** (`sai:{'1':'dem-phan-chua-to'}`): phải tính sau khi xáo thứ tự; dạng `xa()`, `gan()` đã xáo, nên nhãn dựa vào giá trị lựa chọn.
- `check()` giữ bất biến cũ (`kiemKhoanh`, `kiemDS`, …) và thêm: không nhãn lỗi nào gắn vào đáp án đúng.

## 4. Rủi ro đã biết

1. Sao/mức theo dạng ở "Chọn dạng" lệch khi xếp lại thứ tự (đã chấp nhận ở bài 10, 11).
2. `kiem_dem.mjs` báo SAI vì `figures.js` trên `main` chưa có `data-dem` (đã biết, không sửa).
3. Lưới `khoanh` mức 3 (hai hình cùng số vật xếp khác): phải bảo đảm chỉ MỘT hình đúng (`kiemKhoanh` đã làm).
4. Hình `tronPS`, `hinhTo`… dùng nhiều màu ngoài bảng HM: chỉ cảnh báo vì bài 14 có trong `chua_chuan.txt`.
5. Dạng `phan-khong-bang` phụ thuộc `phanLech()` (tỉ lệ phần lớn nhất / nhỏ nhất ≥ 1.8): giữ.

## 5. Hình: lỗi có sẵn và cách xử lý (cần thầy quyết)

- **Emoji ở "Chia đều" mức 3** (🧒, 🥚, 📚): đề xuất **bỏ hình, chỉ để lời văn** (bài toán vẫn rõ); không vẽ hình mới, không sửa `figures.js`.
- Không có hình mới nào cần vẽ cho các dạng thêm (D4, D10, D11 dùng chữ, `vat`, `anh`).

## 6. Kiểm (phiên đám mây 08/10/2026)

- `kiemtra.js . bai-14.js 400000` → ✅ OK (11 dạng; MT1:2 MT2:2 MT3:2 MT4:2 MT5:3).
- `phong_tranh.mjs . bai-14 --soat --khong-chup --rong 375,1200 --giao light,dark --lan 3` → **SOÁT HÌNH: ĐẠT**, **0 lỗi** (hết lỗi emoji); 4 cảnh báo là màu ngoài bảng HM của các hình riêng (bài 14 có trong `chua_chuan.txt`).
- `soat_giao_dien.mjs . bai-14 --cau 2` → **ĐẠT**, 0 lỗi, 0 cảnh báo; tự chơi Luyện thông minh 18 câu, 3 câu sai có gợi ý riêng.
- `kiem_dem.mjs`: SAI vì lý do đã biết (`data-dem` chưa lên `main`). Không sửa.

## 7. Quyết định của thầy (08/10/2026) và cách đã làm

1. **Mục SGK đúng** như bảng.
2. **Hoạt động 2** (chọn cách đọc) sách có cả một phần năm: Mức 1 của D3 gồm 1/2, 1/3, 1/4, 1/5.
3. **Luyện tập 1** sách có hình tròn chia phần không bằng nhau, và hình chia 9 phần mà ghi 1/8: D6 Mức 2–3 giữ cả hai bẫy.
4. **Luyện tập 2** (tô 1/8 hình nào): có hình vuông chia 8 tam giác bằng nhau (`kim:8`); `check()` bảo đảm **chỉ một** hình đúng.
5. **Luyện tập 4 (D9)** bám mẫu sách: chia 6 táo thành 2 phần, chia 12 cam thành 3 phần (nằm trong dải Mức 2).
6. Giữ **bốn nhãn riêng** (`dem-phan-chua-to`, `dem-vat-khoanh`, `phan-khong-bang`, `doc-nham`). Bỏ emoji ở Chia đều Mức 3. Năm mục tiêu giữ; xếp lại theo sư phạm; 11 dạng, 3 dạng ngoài SGK.
