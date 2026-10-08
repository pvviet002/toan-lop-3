# Phân tích sư phạm — Bài 26: Chia số có hai chữ số cho số có một chữ số (BÀI MỚI — BẢN NHÁP CHỜ DUYỆT)

Mẫu: `bai-23.js` (bài tính toán Chủ đề 4, đặt tính dọc trong hình SVG, nhãn lỗi riêng) và `bai-25.js` (khi đã có: khung đặt tính chia) + khối "LUYỆN THÔNG MINH" ở đầu `engine.js`.
Phạm vi: tạo mới `bai-26.js`, `bai-26.html` (chép từ `assets/bai-template.html`), thêm 26 vào `AVAILABLE` trong `index.html` (giữ CRLF, diff đúng 1 dòng)
và file phân tích này. Không đụng `engine.js`, `figures.js`, `lua.js`. Bài mới **không** thêm vào `chua_chuan.txt`: `phong_tranh --soat` phải 0 lỗi. Chưa viết dòng mã nào.

Bài 26 là bài thứ tư của **Chủ đề 4: Phép nhân, phép chia trong phạm vi 100**; sách dành 4 trang (75–78), nên dùng **4 mục tiêu** × 11 dạng.

## 0. Nguồn và điều cần lưu ý

- Cấu trúc mục SGK (trang in 75–78) lấy từ **bản tóm tắt của phiên Claude trên máy thầy**; phiên đám mây chưa tự đối chiếu sách. Không chép nguyên văn đề vào repo; chỉ ghi dạng bài và ý.
  - **Khám phá 1 (chia hết):** chia đều 48 quả cà chua vào 2 khay: 48 : 2 = 24 (4 chia 2 được 2; hạ 8, 8 chia 2 được 4).
    **Hoạt động 1:** đặt tính chia 36 : 3 = 12 (có bước trừ 3 × 1 = 3, hạ 6), 86 : 2, 48 : 4, 77 : 7.
    **Hoạt động 2:** tính nhẩm theo mẫu "90 : 3: 9 chục : 3 = 3 chục = 30": 60 : 2, 80 : 4, 90 : 9, 60 : 3.
    **Hoạt động 3:** tìm thừa số: 3 × ? = 63, ? × 5 = 55, 2 × ? = 42, ? × 4 = 84.
  - **Khám phá 2 (có dư):** 51 : 3 = 17 (chia hết: 5 chia 3 được 1 dư 2, hạ 1 được 21, 21 chia 3 được 7); 74 : 3 = 24 dư 2.
    **Hoạt động 1:** 91 : 4 = 22 (dư 3), 53 : 6, 33 : 2, 79 : 5.
    **Hoạt động 2:** 75 quả trứng chia đều vào 3 rổ: mỗi rổ 25.
    **Hoạt động 3:** tìm các phép chia có số dư là 3 trong 43 : 3, 53 : 5, 64 : 4, 25 : 5, 73 : 7 (43 : 3 = 14 dư 1; 53 : 5 = 10 dư 3; 64 : 4 hết; 25 : 5 hết; 73 : 7 = 10 dư 3; hai phép đúng). Trên web: câu **đếm** và câu **chọn một**.
  - **Luyện tập 1:** tính 77 : 2, 97 : 4, 51 : 2, 98 : 7.
    **Luyện tập 2:** Số?: ba con mèo cân nặng 12 kg → mỗi con 4 kg; ba con chó 72 kg → mỗi con 24 kg; ba rô-bốt 45 kg → mỗi con 15 kg (chia đều: tổng : 3).
    **Luyện tập 3:** lớp có 29 học sinh, mỗi bàn 2 em: cần ít nhất mấy bàn (15; **bẫy**: nhiều bé đáp 14).
    **Luyện tập 4:** tìm số bị chia: ? : 4 = 15, ? : 5 = 17, ? : 3 = 28 (nhân thương với số chia: 60, 85, 84).
- **Lỗi hay gặp:** quên hạ chữ số (86 : 2 → 4); thương thiếu chữ số 0 (80 : 4 viết 2 thay vì 20); số dư lớn hơn hoặc bằng số chia; quên cộng 1 khi còn dư ("cần ít nhất mấy bàn").
- **Đặt tính chia (khung ⌐) là hình SVG:** số bị chia, số chia, thương, các bước nhân – trừ – hạ từng hàng; ô "?" cho bước còn thiếu. Mỗi chữ số mang `data-pt` để `check()` đọc lại. Mỗi ô lỗi dự đoán trước; `check()` tính lại từ số, không tin chữ số vẽ ra.
- **Số bị chia ≤ 99; số chia 2–9.** Thương là số có hai chữ số (hoặc có chữ số 0 ở hàng đơn vị). Không số thập phân.
- Hình khung ⌐ chép và mở rộng từ `bai-25.js` (nếu bài 25 chưa gộp thì viết lại ngay trong `bai-26.js`; không dùng chung tệp).

## 1. Bốn mục tiêu (muctieu) × ba mức (Thông tư 27)

| MT | Tên | Mức 1 — Nhận biết | Mức 2 — Hiểu | Mức 3 — Vận dụng |
|---|---|---|---|---|
| MT1 | Chia hết số có hai chữ số | 48 : 2, 36 : 3; chia nhẩm 60 : 2, 80 : 4 (thương tròn chục). | Đặt tính 86 : 2, 48 : 4, 77 : 7 (có bước hạ); tìm thừa số 3 × ? = 63. | Chia hết có bước trừ (51 : 3); thương có chữ số 0; ? × 5 = 55. |
| MT2 | Chia có dư | 74 : 3 = 24 dư 2 (hỏi thương hoặc số dư). | 91 : 4, 53 : 6, 33 : 2, 79 : 5; có dư hay chia hết. | Đếm các phép chia có số dư là 3; chọn một phép có số dư là 3. |
| MT3 | Vận dụng | 75 quả trứng vào 3 rổ (mỗi rổ 25); 3 con mèo 12 kg. | Ba con chó 72 kg, ba rô-bốt 45 kg; tìm số bị chia (? : 4 = 15). | Lớp có 29 học sinh, mỗi bàn 2 em: cần ít nhất mấy bàn. |
| MT4 | Tìm lỗi và sửa | Phép chia của bạn An có đúng không (một lỗi rõ). | Nhận ra lỗi: quên hạ chữ số, thương thiếu chữ số 0, số dư lớn hơn số chia. | Kết quả đúng là bao nhiêu; chữa lỗi quên cộng 1. |

Tham số engine: `goal:10, soCau:18, soCauToiDa:24`. 4 mục tiêu × tối thiểu 3 câu = 12 ≤ 18.

## 2. Mười một dạng (topics) — xếp theo mạch sư phạm

"Nguồn": **SGK** = có trong sách (mục ghi trong ngoặc) · **không có trong SGK** = dạng thêm.

| # | Dạng | Nguồn | MT | Mức 1 / Mức 2 / Mức 3 | Hình | Nhãn lỗi chính |
|---|---|---|---|---|---|---|
| D1 | Chia đều vào khay | SGK (Khám phá 1) | MT1 | M1: 48 quả vào 2 khay (số chia 2, thương nhỏ) · M2: 36 vào 3, 55 vào 5 · M3: thương hai chữ số 84 : 4, 96 : 3. Đáp bằng số | `khayQua` (khay, quả `data-dem` theo nhóm chục) hoặc chữ | `quen-ha`, `nham-bang` |
| D2 | Đặt tính chia | SGK (Hoạt động 1) | MT1 | M1: ô "?" ở chữ số hàng chục của thương · M2: ô "?" ở bước hạ hoặc ở tích · M3: điền cả thương (36 : 3, 86 : 2, 48 : 4, 77 : 7) | **hình mới** `chiaDoc2` (khung ⌐, nhiều bước) | `quen-ha`, `thieu-so-0`, `tru-sai-buoc` |
| D3 | Chia nhẩm số tròn chục | SGK (Hoạt động 2) | MT1 | M1: 60 : 2, 80 : 4 (thương tròn chục < 50) · M2: 90 : 9, 60 : 3 · M3: ? × 3 = 90; viết thương thiếu chữ số 0. Đáp bằng số | chữ ("9 chục : 3 = 3 chục") | `thieu-so-0`, `nham-hang` |
| D4 | Tìm thừa số | SGK (Hoạt động 3) | MT1 | M1: 3 × ? = 63 · M2: ? × 5 = 55, 2 × ? = 42 · M3: ? × 4 = 84, ? × 3 = 96. Đáp bằng số | chữ | `dao-vai`, `cong-thay-nhan` |
| D5 | Chia hết hay có dư | SGK (Khám phá 2) | MT2 | M1: 51 : 3 chia hết hay có dư (Có / Không) · M2: 74 : 3: thương, số dư (hỏi một) · M3: chọn phép chia có dư trong ba phép | chữ | `du-lon-hon-chia`, `nham-thuong-du` |
| D6 | Chia có dư | SGK (Khám phá 2, Hoạt động 1; Luyện tập 1) | MT2 | M1: 91 : 4, 33 : 2: hỏi thương · M2: 53 : 6, 79 : 5: hỏi số dư · M3: 97 : 4, 98 : 7, 51 : 2 (Luyện tập 1): thương hoặc số dư. Đáp bằng số | `chiaDoc2` | `du-lon-hon-chia`, `nham-thuong-du`, `quen-ha` |
| D7 | Số dư là 3 | SGK (Hoạt động 3 của Khám phá 2) | MT2 | M1: phép nào có số dư là 3 (chọn một trong bốn) · M2: trong năm phép có bao nhiêu phép có số dư là 3 (đếm) · M3: số dư là 3 hoặc phép chia hết: đếm cả hai | thẻ phép chia | `dem-sot-phep`, `nham-thuong-du` |
| D8 | Chia đều | SGK (Hoạt động 2; Luyện tập 2) | MT3 | M1: 75 quả trứng vào 3 rổ (25); 12 kg ba con mèo · M2: ba con chó 72 kg; ba rô-bốt 45 kg · M3: số khác (tổng 96, 4 phần) | `anh`, chữ | `thieu-buoc`, `cong-thay-nhan` |
| D9 | Cần ít nhất mấy bàn | SGK (Luyện tập 3) | MT3 | M1: 28 học sinh, mỗi bàn 2 em: 14 bàn (chia hết) · M2: 29 học sinh, mỗi bàn 2 em: cần ít nhất mấy bàn (15) · M3: số khác (mỗi bàn 3, 4 em; 50 học sinh) | `anh`, chữ | `quen-du`, `nham-thuong-du` |
| D10 | Tìm số bị chia | SGK (Luyện tập 4) | MT3 | M1: ? : 4 = 15 · M2: ? : 5 = 17, ? : 3 = 28 · M3: ? : 6 = 15, ? : 4 = 23 (nhân thương với số chia, tích < 100). Đáp bằng số | chữ | `dao-vai`, `cong-thay-nhan` |
| D11 | Bạn An làm có đúng? | **không có trong SGK** | MT4 | M1: "Bạn An nói: …" (một lỗi rõ), Em thấy thế nào? · M2: An sai ở bước nào (quên hạ, thương thiếu 0, dư ≥ chia, quên cộng 1) · M3: kết quả đúng là bao nhiêu | `chiaDoc2` (bài An), `anh('boy')` | `quen-ha`, `thieu-so-0`, `du-lon-hon-chia`, `quen-du` |

Dạng không có trong SGK: **Bạn An làm có đúng? (D11)** (1 dạng). Mười dạng còn lại bám các mục của sách.

Phân bố: MT1 bốn dạng (D1, D2, D3, D4) · MT2 ba dạng (D5, D6, D7) · MT3 ba dạng (D8, D9, D10) · MT4 một dạng (D11, ba mức) — MT4 có thêm câu sửa lỗi trong D2 mức 3 (ô "?" ở bước hạ): xem câu hỏi 5.

### Luật lời câu hỏi (áp dụng cho cả bài)

- Nút **Đúng / Sai** chỉ đi với **mệnh đề**; câu "… có … không?" dùng nút **Có / Không**.
- Dạng "Bạn An nói …" dùng "Em thấy thế nào?" với "Đồng ý, vì…" / "Không đồng ý, vì…". Đáp án không tự mâu thuẫn với đề (đề nói An sai thì không có đáp án "An không sai").
- Viết đúng thuật ngữ: **số bị chia, số chia, thương, số dư**.
- Câu "cần ít nhất mấy bàn" nói rõ "mỗi bàn ngồi 2 em; em còn lại cũng cần một chỗ".
- Đáp án nhiễu **không chứa chính đối tượng đang hỏi**; ở câu chọn số dư có phương án ≥ số chia.

## 3. Hình mới cần vẽ (viết ngay trong `bai-26.js`, KHÔNG sửa `figures.js`)

Theo quy chuẩn `sk-ve-hinh-tieuhoc`: bảng màu `HM`, `svgHinh`, `nhanTron` / `nhanVien`; mỗi hình là MỘT SVG co theo màn hình; chữ ≥ 14px ở khổ điện thoại; nét và chữ dùng `currentColor`; nét thẳng có `fill="none"`; không emoji hệ thống.

| Hàm | Mô tả | Tham số | Kiểm do mã |
|---|---|---|---|
| `chiaDoc2(a, b, tuy)` | Phép chia số có hai chữ số đặt dọc theo khung ⌐: hàng 1 (số bị chia), bước nhân – trừ – hạ ở hàng chục và hàng đơn vị, thương bên phải; chữ số cần tìm là ô "?"; có thể hiện bài của bạn An (đúng hoặc sai). | a, b, tuỳ {an: 'thuong-chuc'/'ha'/'tich'/'du', bieuDien: bài An} | `check()` tính lại mọi bước (chữ số hàng chục, số dư sau mỗi bước, thương, số dư) từ a, b; đọc các `data-pt` từ chuỗi SVG. |
| `khayQua(n, soKhay)` | Các khay, mỗi khay xếp quả thành hàng chục (hàng mười quả) và quả lẻ; mỗi quả `data-dem="qua"`. | số quả, số khay | `check()` đếm quả = số quả; số khay khớp. Dùng cho D1 mức 1. |
| `theChia(ds)` | Dãy thẻ phép chia (chữ trong thẻ bo góc) để chọn hoặc đếm. | mảng chuỗi phép chia | `check()` tính lại thương, số dư mọi thẻ; số thẻ có số dư là 3 khớp đáp án. |

Hình dùng lại từ `figures.js`: `anh`, `oHoi`, `svgHinh`, `HM`, `nhanVien`.

## 4. Nhãn lỗi

- Chuẩn của engine dùng được: `nham-bang`, `cong-thay-nhan`, `dao-vai`, `thieu-buoc`.
- **Nhãn riêng của bài 26** (khai báo qua `BAI.loi`):

| Nhãn | Tên hiển thị | Ví dụ lỗi | Gợi ý |
|---|---|---|---|
| `quen-ha` | Quên hạ chữ số | 86 : 2 → thương 4 (quên hạ 6) | "Sau khi chia hàng chục, bé hạ chữ số hàng đơn vị xuống." |
| `thieu-so-0` | Thương thiếu chữ số 0 | 80 : 4 viết 2 thay vì 20 | "8 chục : 4 = 2 chục, 2 chục là 20." |
| `du-lon-hon-chia` | Số dư lớn hơn hoặc bằng số chia | 53 : 6 = 8 dư 5 viết dư 7 | "Số dư luôn bé hơn số chia." |
| `quen-du` | Quên cộng 1 khi còn dư | 29 học sinh, mỗi bàn 2 em: đáp 14 bàn | "Còn một em, cũng cần một bàn: 14 + 1 = 15." |
| `tru-sai-buoc` | Trừ sai ở bước đặt tính | 8 − 6 = 3 | "Bé tính lại số bị chia trừ tích." |
| `nham-thuong-du` | Nhầm thương với số dư | Trả lời 4 khi hỏi số dư | "Thương là kết quả phép chia, số dư là phần còn lại." |
| `nham-hang` | Nhầm hàng khi nhẩm số tròn chục | 60 : 2 = 3 | "6 chục : 2 = 3 chục, tức là 30." |
| `dem-sot-phep` | Đếm sót hoặc thừa phép tính | Đếm 1 thay vì 2 phép có số dư là 3 | "Bé tính từng thẻ rồi đếm." |

## 5. Rủi ro đã biết

1. **Khung ⌐ nhiều bước trên điện thoại:** hình hẹp, các hàng chữ số thẳng cột; chữ số ≥ 14px; gạch ngang đủ dài; không đè chữ.
2. **Thương có chữ số 0 (80 : 4 = 20):** `make` sinh có kiểm soát; `check()` so thương với ⌊a : b⌋, không tin chữ số vẽ ra.
3. **Số dư ≥ số chia ở đáp án nhiễu:** có chủ ý, nhưng không bao giờ là đáp án đúng; `check()` kiểm đúng một phương án.
4. **Cần ít nhất mấy bàn (D9):** `check()` tính ⌈a : b⌉, kiểm đáp nhiễu a : b (nhãn `quen-du`).
5. **Tìm số bị chia (D10):** tích thương × số chia < 100; không tìm số bị chia khi tích ≥ 100.
6. **Đếm các phép chia có số dư là 3 (D7):** các thẻ khác nhau; mỗi thẻ một kết quả.
7. **Không nhãn sát biên:** font Linux hẹp hơn Segoe UI; thầy soát lại hình trên máy thầy (ghi trong PR).
8. `index.html` dùng CRLF: sửa bằng Python đọc/ghi nhị phân (không `sed -i`), diff đúng 1 dòng.
9. `kiem_dem.mjs` kiểm các `data-dem` của bài.

## 6. Việc sẽ làm sau khi thầy duyệt

1. Viết `bai-26.js` theo bảng trên (nối chuỗi, **không** backtick hay template literal), chép `bai-26.html`, sửa `index.html` (một dòng).
2. Chạy RIÊNG từng cổng (đặt `CHROME` nếu cần):
   - `node .claude/skills/sk-web-toan-tieuhoc/assets/kiemtra.js . bai-26.js 400000`
   - `node .claude/skills/sk-ve-hinh-tieuhoc/assets/phong_tranh.mjs . <thư mục tạm> bai-26 --soat --khong-chup --rong 375,1200 --giao light,dark --lan 3` → 0 lỗi
   - `node .claude/skills/sk-web-toan-tieuhoc/assets/soat_giao_dien.mjs . bai-26 --cau 2`
3. Tự soi ảnh phòng tranh (khung ⌐ nhiều bước, khay quả, thẻ phép chia), push, ghi kết quả từng cổng trong mô tả PR, đổi tiêu đề thành "[XONG] Bài 26", gỡ trạng thái nháp. Không tự gộp.

## 7. Cần thầy quyết (kèm phương án đề xuất)

1. **Mục SGK ở mục 0 và bảng dạng** có đúng không? Đề xuất: đúng như bảng.
2. **Cách viết các bước đặt tính chia** (chữ số hạ, bước nhân – trừ, số dư) đúng như sách chưa? Nếu sách viết khác (ví dụ ghi số dư cạnh thương), thầy chỉnh.
3. **Khung ⌐:** làm `chiaDoc2` riêng trong `bai-26.js` (chép từ `bai-25.js`): đồng ý (**đề xuất**).
4. **Câu "cần ít nhất mấy bàn" (D9):** ba mức, đáp nhiễu 14 có nhãn `quen-du`: đồng ý (**đề xuất**).
5. **MT4 (tìm lỗi và sửa) chỉ có một dạng (D11) ba mức:** đủ (**đề xuất**) hay thêm một dạng "số dư lớn hơn số chia, sửa lại" ngoài SGK?
6. **Tám nhãn riêng** nhiều hơn các bài trước: giữ hết (**đề xuất**) hay gom bớt (`nham-hang` → `thieu-so-0`, `dem-sot-phep` → `lech-nhom`)?
7. **Bốn mục tiêu, mười một dạng**; xếp lại thứ tự dạng theo sư phạm như bài 9–25 (**đề xuất**).
