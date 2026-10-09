# Phân tích sư phạm — Bài 36: Nhân số có ba chữ số với số có một chữ số (BÀI MỚI — BẢN NHÁP CHỜ DUYỆT)

Mẫu: `bai-26.js` / `bai-29.js` (khung đặt tính trong SVG, `data-pt`, `check()` tính lại từ số), `bai-31.js` (`canDia`), `bai-35.js` (`soDoGT`, `theTinh`) + khối "LUYỆN THÔNG MINH" ở đầu `engine.js`.
Phạm vi: tạo mới `bai-36.js`, `bai-36.html` (chép từ `bai-24.html`), thêm 36 vào `AVAILABLE` trong `index.html` (giữ CRLF, diff đúng 1 dòng) và file này. Không đụng `engine.js`, `figures.js`, `lua.js`. Bài mới không thêm vào `chua_chuan.txt`: `phong_tranh --soat` phải 0 lỗi. Chưa viết dòng mã nào.

Bài 36 mở đầu **Chủ đề 6: Phép nhân, phép chia trong phạm vi 1 000**; sách dành 2 trang (97–98), nên dùng **4 mục tiêu** × 9 dạng.

## 0. Nguồn và điều cần lưu ý

Nội dung SGK (trang in 97–98) lấy từ **bản tóm tắt của phiên Claude trên máy thầy** (đã đối chiếu từng số); phiên đám mây chưa tự đối chiếu sách. Không chép nguyên văn đề vào repo; chỉ ghi dạng bài và ý.

- **Khám phá:** mỗi tháp xếp từ 140 khối cầu, 2 tháp cần 140 × 2 = 280 (không nhớ: 2 nhân 0, 2 nhân 4, 2 nhân 1); 215 × 4 = 860 (có nhớ: 4 nhân 5 bằng 20 viết 0 nhớ 2; 4 nhân 1 bằng 4 thêm 2 bằng 6; 4 nhân 2 bằng 8).
- **Hoạt động 1** (đặt tính sẵn, tính): 312 × 3 = 936; 203 × 4 = 812; 427 × 2 = 854; 131 × 5 = 655.
  **Hoạt động 2** (đặt tính rồi tính): 243 × 2 = 486; 162 × 4 = 648; 250 × 3 = 750; 108 × 5 = 540.
  **Hoạt động 3:** hải âu 118 ngày tuổi, mèo gấp 3 lần: 118 × 3 = 354 ngày.
- **Luyện tập 1** (bảng thừa số – thừa số – tích): 209 × 4 = 836; 253 × 3 = 759; 114 × 7 = 798; 107 × 9 = 963.
  **Luyện tập 2** (nhẩm, mẫu 200 × 2: 2 trăm × 2 = 4 trăm): 300 × 3 = 900; 200 × 4 = 800; 400 × 2 = 800.
  **Luyện tập 3:** cái ấm cân bằng với 3 cái chén, mỗi chén 128 g: ấm nặng 384 g.
  **Luyện tập 4:** 3 hũ mật ong, mỗi hũ 250 ml, đã dùng 525 ml: còn 3 × 250 − 525 = 225 ml (hai bước).
- **Lỗi hay gặp:** quên nhớ (215 × 4 → 840); nhớ nhầm sang hàng khác; cộng thay nhân; nhẩm số tròn trăm sai hàng (300 × 3 = 90); bài hai bước thiếu bước trừ.
- **Số:** thừa số thứ nhất 100–333 (tích ≤ 999); thừa số thứ hai 2–9; không có tích ≥ 1 000. Số viết "1 000" nếu cần ghi mốc.
- **Khung đặt tính nhân** là hình SVG mới (`nhanDoc3`): thừa số trên, thừa số dưới có dấu ×, gạch ngang, tích; ô "?" cho chữ số cần tìm; số nhớ nhỏ phía trên (tuỳ chọn). Mỗi chữ số mang `data-pt`, `check()` tính lại từ hai thừa số.

## 1. Bốn mục tiêu (muctieu) × ba mức (Thông tư 27)

| MT | Tên | Mức 1 — Nhận biết | Mức 2 — Hiểu | Mức 3 — Vận dụng |
|---|---|---|---|---|
| MT1 | Nhân không nhớ | 140 × 2, 312 × 3 (ô "?" một chữ số của tích). | 203 × 4, 131 × 5: điền cả tích; có chữ số 0 ở giữa. | Thừa số đến 333 × 3, 243 × 2; chọn phép tính có tích cho trước. |
| MT2 | Nhân có nhớ | 215 × 4 (ô "?" ở hàng có nhớ, có ghi số nhớ). | 162 × 4, 108 × 5: nhớ một lần, không ghi số nhớ. | 209 × 4, 114 × 7, 107 × 9: nhớ hai lần, tích gần 1 000. |
| MT3 | Nhẩm và vận dụng | 200 × 2, 300 × 3 theo mẫu "2 trăm × 2"; hải âu – mèo (118 × 3). | 400 × 2; ấm và 3 chén (128 × 3); gấp n lần với số ba chữ số. | 3 hũ mật ong 250 ml, đã dùng 525 ml: còn bao nhiêu (hai bước). |
| MT4 | Tìm lỗi | Bạn An tính 215 × 4 = 840: Em thấy thế nào? | An sai ở bước nào (quên nhớ, nhớ nhầm hàng). | Kết quả đúng là bao nhiêu; An nhẩm 300 × 3 = 90. |

Tham số engine: `goal:10, soCau:18, soCauToiDa:24`.

## 2. Chín dạng (topics) — xếp theo mạch sư phạm

| # | Dạng | Nguồn | MT | Mức 1 / Mức 2 / Mức 3 | Hình | Nhãn lỗi chính |
|---|---|---|---|---|---|---|
| D1 | Xếp tháp khối cầu | SGK (Khám phá) | MT1 | M1: 2 tháp, mỗi tháp 140 (hỏi tổng) · M2: 3 tháp 120, 2 tháp 215 · M3: số khác (tháp 100–330, 2–3 tháp) | `anh` + chữ (không đếm 140 khối) | `cong-thay-nhan`, `nham-bang` |
| D2 | Đặt tính không nhớ | SGK (Hoạt động 1) | MT1 | M1: ô "?" một chữ số của tích (312 × 3) · M2: điền cả tích, có chữ số 0 (203 × 4) · M3: 131 × 5, 243 × 2; thừa số có 3 ở hàng trăm | **hình mới** `nhanDoc3` | `nham-bang`, `nham-hang` |
| D3 | Đặt tính có nhớ | SGK (Khám phá b, Hoạt động 2) | MT2 | M1: 215 × 4 có ghi số nhớ, hỏi ô "?" · M2: 162 × 4, 108 × 5, 250 × 3 điền tích · M3: 209 × 4, 114 × 7, 107 × 9 (nhớ hai lần) | `nhanDoc3` | `quen-nho`, `nho-sai-hang`, `nham-bang` |
| D4 | Bảng thừa số – tích | SGK (Luyện tập 1) | MT2 | M1: ô "?" là tích (209 × 4) · M2: 253 × 3, 114 × 7 · M3: ô "?" là thừa số thứ hai khi biết tích (836 : 209 = 4, chọn trong 2–9) | bảng ba hàng (`tri` như bài 13) | `quen-nho`, `dao-vai` |
| D5 | Nhẩm số tròn trăm | SGK (Luyện tập 2) | MT3 | M1: 200 × 2, 300 × 3 (mẫu "2 trăm × 2 = 4 trăm") · M2: 400 × 2, 100 × 9 · M3: chọn phép nhẩm có kết quả 800 trong bốn thẻ | chữ, `theTinh` | `nham-hang`, `thieu-so-0` |
| D6 | Gấp n lần | SGK (Hoạt động 3) | MT3 | M1: hải âu 118 ngày, mèo gấp 3 · M2: số khác (102–330, gấp 2–4) · M3: hỏi "cả hai con bao nhiêu ngày" (hai bước) | `anh`, chữ | `cong-thay-nhan`, `thieu-buoc` |
| D7 | Ấm và chén trên cân | SGK (Luyện tập 3) | MT3 | M1: ấm cân bằng với 3 chén 128 g · M2: 2–4 chén, 110–240 g · M3: hỏi ấm nặng hơn một chén bao nhiêu (hai bước) | `canDia` (chép từ bài 31) với nhãn "128 g" | `cong-thay-nhan`, `thieu-buoc` |
| D8 | Mật ong còn lại | SGK (Luyện tập 4) | MT3 | M1: 3 hũ 250 ml, hỏi tổng · M2: đã dùng 525 ml, còn bao nhiêu · M3: số khác; hỏi "còn hơn hay kém một hũ" (chọn) | `anh` + chữ | `thieu-buoc`, `chon-sai-phep` |
| D9 | Bạn An tính có đúng? | **không có trong SGK** | MT4 | M1: An tính 215 × 4 = 840: Em thấy thế nào? · M2: An sai ở bước nào · M3: kết quả đúng là bao nhiêu | `nhanDoc3` (bài An), `anh('boy')` | `quen-nho`, `nho-sai-hang`, `nham-hang` |

Dạng không có trong SGK: **D9** (1 dạng). Phân bố: MT1 hai dạng (D1, D2) · MT2 hai dạng (D3, D4) · MT3 bốn dạng (D5–D8) · MT4 một dạng (D9).

### Luật lời câu hỏi
- Đ/S chỉ cho mệnh đề; "Bạn An nói…" dùng "Em thấy thế nào?" với "Đồng ý, vì…" / "Không đồng ý, vì…"; mọi đẳng thức trong phương án phải đúng số học.
- Thuật ngữ: **thừa số, tích**. Không "1 000" làm tích; tích luôn ≤ 999.
- Phương án nhiễu không chứa chính đối tượng đang hỏi.

## 3. Hình mới (viết ngay trong `bai-36.js`, KHÔNG sửa `figures.js`)

| Hàm | Mô tả | Kiểm do mã |
|---|---|---|
| `nhanDoc3(a, b, tuy)` | Đặt tính nhân dọc: a (ba chữ số) trên, "× b" dưới, gạch ngang, tích; `tuy.an` = vị trí ô "?" (`tram`/`chuc`/`donvi`/`tich`); `tuy.nho` = có ghi số nhớ nhỏ; `tuy.bieuDien` = tích sai của bạn An. Mỗi chữ số `data-pt`. | `check()` tính lại a × b, so từng chữ số với `data-pt`; chữ số "?" khớp đáp án. |

Hình dùng lại: `anh`, `canDia` (bài 31, nhãn trắng cỡ 18 cao ≥ 30), `theTinh` (bài 35), bảng `tri` (bài 13).
Luật Windows: hai dòng chữ cách ≥ 1,4 lần cỡ chữ; nhãn ở rìa khung chừa lề ≥ 1,3 lần cỡ chữ; số nhớ nhỏ không nhỏ hơn 14px ở khổ 375.

## 4. Nhãn lỗi

Chuẩn: `nham-bang`, `cong-thay-nhan`, `dao-vai`, `thieu-buoc`, `chon-sai-phep`. **Riêng bài 36** (`BAI.loi`):

| Nhãn | Tên hiển thị | Ví dụ lỗi | Gợi ý |
|---|---|---|---|
| `quen-nho` | Quên nhớ | 215 × 4 = 840 | "4 nhân 5 bằng 20, viết 0 **nhớ 2** sang hàng chục." |
| `nho-sai-hang` | Nhớ nhầm hàng | 215 × 4 = 1 060 hoặc 820 | "Số nhớ cộng vào hàng liền bên trái." |
| `nham-hang` | Nhẩm sai hàng | 300 × 3 = 90 | "3 trăm × 3 = 9 trăm, là 900." |
| `thieu-so-0` | Tích thiếu chữ số 0 | 250 × 3 = 75 | "Viết đủ chữ số 0 ở hàng đơn vị." |

## 5. Rủi ro

1. **Tích vượt 999:** bộ sinh giới hạn a ≤ 999 : b; `check()` loại câu có tích ≥ 1 000.
2. **Nhớ hai lần** (107 × 9 = 963): số nhớ hiện ở đúng hàng; `check()` tính lại số nhớ từng hàng.
3. **Cân đĩa với ấm:** nhãn "128 g" trên chén là nhãn trắng cao ≥ 30; ba chén không chạm nhau (`data-dem`).
4. `index.html` CRLF: sửa bằng Python đọc/ghi nhị phân, diff đúng 1 dòng.
5. Font Linux hẹp hơn Segoe UI: thầy soát lại `phong_tranh --soat` trên máy thầy.

## 6. Việc sẽ làm sau khi thầy duyệt

Viết `bai-36.js` (nối chuỗi, không backtick), chép `bai-36.html`, sửa `index.html`; chạy `kiemtra.js`, `kiem_dem.mjs`, `phong_tranh --soat`, `soat_giao_dien --cau 2`, `dang_web --thu`; tự soi ảnh; PR "[XONG] Bài 36".

## 7. Cần thầy quyết (kèm đề xuất)

1. Mục SGK ở mục 0 và bảng dạng đúng chưa? Đề xuất: đúng như bảng.
2. **Ghi số nhớ nhỏ phía trên** trong khung đặt tính ở mức 1 (như sách viết lời "viết 0 nhớ 2"): đề xuất có ở mức 1, bỏ ở mức 2–3.
3. **D4 mức 3** tìm thừa số thứ hai từ tích (chọn trong 2–9): giữ (**đề xuất**) hay thay bằng ô "?" tích với số lớn hơn?
4. **D1** không vẽ 140 khối cầu (quá nhiều để đếm), dùng ảnh minh hoạ + chữ: đồng ý (**đề xuất**).
