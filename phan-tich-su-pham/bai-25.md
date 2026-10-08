# Phân tích sư phạm — Bài 25: Phép chia hết, phép chia có dư (BÀI MỚI — BẢN NHÁP CHỜ DUYỆT)

Mẫu: `bai-23.js` (bài tính toán Chủ đề 4, đặt tính dọc trong hình SVG, nhãn lỗi riêng) + khối "LUYỆN THÔNG MINH" ở đầu `engine.js`.
Phạm vi: tạo mới `bai-25.js`, `bai-25.html` (chép từ `assets/bai-template.html`), thêm 25 vào `AVAILABLE` trong `index.html` (giữ CRLF, diff đúng 1 dòng)
và file phân tích này. Không đụng `engine.js`, `figures.js`, `lua.js`. Bài mới **không** thêm vào `chua_chuan.txt`: `phong_tranh --soat` phải 0 lỗi. Chưa viết dòng mã nào.

Bài 25 là bài thứ ba của **Chủ đề 4: Phép nhân, phép chia trong phạm vi 100**. Dùng **4 mục tiêu** × 10 dạng.

## 0. Nguồn và điều cần lưu ý

- Cấu trúc mục SGK (trang in 72–74) lấy từ **bản tóm tắt của phiên Claude trên máy thầy**; phiên đám mây chưa tự đối chiếu sách. Không chép nguyên văn đề vào repo; chỉ ghi dạng bài và ý.
  - **Khám phá a:** chia đều 6 quả táo vào 2 rổ: 6 : 2 = 3; đặt tính chia (6 chia 2 được 3, 3 × 2 = 6, 6 − 6 = 0): **phép chia hết**.
    **Khám phá b:** chia 7 quả vào 2 rổ, mỗi rổ 3 quả, còn thừa 1: 7 : 2 = 3 (dư 1). 3 là thương, 1 là số dư. **Chú ý: số dư bé hơn số chia.**
  - **Hoạt động 1:** a) chia hết: 15 : 3, 24 : 6, 20 : 5; b) chia có dư: 32 : 6 = 5 (dư 2), 41 : 8, 23 : 3.
    **Hoạt động 2:** chia 18 quả vào các đĩa, mỗi đĩa 3, 4 hoặc 5 quả: cách nào chia hết (18 : 3 = 6), cách nào có dư (18 : 4 = 4 dư 2; 18 : 5 = 3 dư 3).
  - **Luyện tập 1:** a) tính 18 : 2, 23 : 5, 43 : 7, 17 : 8 (bốn chậu cây A, B, C, D); b) chậu nào ghi phép chia có số dư là 3 (23 : 5 = 4 dư 3).
    **Luyện tập 2:** chọn số dư cho mỗi phép chia (17 : 2 dư 1; 41 : 6 dư 5; 19 : 7 dư 5; 19 : 5 dư 4; 34 : 6 dư 4; 16 : 6 dư 4). Trên web: một phép → chọn số dư (4 phương án), trong đó có đáp án nhiễu là số **lớn hơn hoặc bằng số chia**.
    **Luyện tập 3:** 56 con cá chia vào các rổ, mỗi rổ 8 con: mấy rổ (7).
- **Lỗi hay gặp:** viết số dư lớn hơn hoặc bằng số chia; quên viết "dư"; nhầm thương với số dư; trừ sai ở bước đặt tính; coi phép chia có dư là chia hết (viết 23 : 5 = 4 mà quên dư 3).
- **Đặt tính chia (khung ⌐) là hình SVG:** số bị chia, số chia, thương, các bước nhân – trừ; ô "?" cho bước còn thiếu. Mọi chữ số trong hình mang `data-pt` để `check()` đọc lại và so với số trong câu.
- **Quy tắc kiểm:** `check()` tính lại thương = ⌊a : b⌋, số dư = a − b × thương, và phát hiện đáp án có số dư ≥ số chia.
- **Số bị chia ≤ 50 (mức 1–2), tới 60 ở mức 3; số chia 2–9.** Không số thập phân.
- Hình mới viết trong `bai-25.js`; dùng lại `anh`, `oHoi`, `svgHinh`, `HM` của `figures.js`.

## 1. Bốn mục tiêu (muctieu) × ba mức (Thông tư 27)

| MT | Tên | Mức 1 — Nhận biết | Mức 2 — Hiểu | Mức 3 — Vận dụng |
|---|---|---|---|---|
| MT1 | Chia hết, chia có dư | Chia đều quả vào rổ (đếm hình): hết hay còn thừa. | Phép chia nào chia hết, phép nào có dư (chọn một). | Phép chia nào có số dư lớn nhất hoặc bé nhất; Đúng / Sai về chia hết. |
| MT2 | Thương và số dư | Chia hết: 15 : 3, 24 : 6, 20 : 5. | Chia có dư: 32 : 6, 41 : 8, 23 : 3; tính thương hoặc số dư. | Đặt tính chia, điền ô "?"; chọn số dư (có đáp án nhiễu lớn hơn số chia). |
| MT3 | Số dư bé hơn số chia | Chậu cây A, B, C, D: chậu nào có số dư là 3. | Số dư của phép chia cho 5 có thể là mấy (chọn một). | Phát hiện kết quả sai vì số dư lớn hơn hoặc bằng số chia; sửa lại. |
| MT4 | Vận dụng | Chia 18 quả vào các đĩa: cách nào chia hết. | 56 con cá, mỗi rổ 8 con: mấy rổ; có bao nhiêu quả còn thừa. | Bạn nói đúng hay sai; bài toán có dư (hết đĩa còn mấy quả). |

Tham số engine: `goal:10, soCau:18, soCauToiDa:24`. 4 mục tiêu × tối thiểu 3 câu = 12 ≤ 18.

## 2. Mười dạng (topics) — xếp theo mạch sư phạm

"Nguồn": **SGK** = có trong sách (mục ghi trong ngoặc) · **không có trong SGK** = dạng thêm.

| # | Dạng | Nguồn | MT | Mức 1 / Mức 2 / Mức 3 | Hình | Nhãn lỗi chính |
|---|---|---|---|---|---|---|
| D1 | Chia đều vào rổ | SGK (Khám phá a, b) | MT1 | M1: 6 quả vào 2 rổ, mỗi rổ mấy quả (chia hết, đếm hình) · M2: 7 quả vào 2 rổ: mỗi rổ mấy quả, còn thừa mấy quả (hai câu, hỏi một) · M3: số quả khác (11 vào 3 rổ), hỏi còn thừa | **hình mới** `ronQua` (rổ, quả `data-dem`) | `nham-thuong-du`, `lech-nhom` |
| D2 | Chia hết hay có dư | SGK (Hoạt động 1) | MT1 | M1: phép nào chia hết trong ba phép (số nhỏ) · M2: phép nào có dư · M3: phép nào có số dư lớn nhất (chọn một) | chữ | `nham-thuong-du`, `du-lon-hon-chia` |
| D3 | Đặt tính chia | SGK (Khám phá a, b) | MT2 | M1: ô "?" ở thương (chia hết) · M2: ô "?" ở bước nhân (thương × số chia) · M3: ô "?" ở số dư; hoặc điền cả hai | **hình mới** `phepChiaDoc` (khung ⌐) | `tru-sai-buoc`, `nham-thuong-du` |
| D4 | Chia nhẩm có dư | SGK (Hoạt động 1; Luyện tập 1a) | MT2 | M1: chia hết 15 : 3, 24 : 6, 20 : 5, hỏi thương · M2: 32 : 6, 41 : 8, 23 : 3: hỏi thương hoặc số dư (một số) · M3: 43 : 7, 17 : 8, 23 : 5: hỏi số dư. Đáp bằng số | chữ | `nham-thuong-du`, `du-lon-hon-chia`, `tru-sai-buoc` |
| D5 | Chọn số dư | SGK (Luyện tập 2) | MT2 | M1: 17 : 2 chọn số dư (đáp nhiễu có số ≥ 2) · M2: 41 : 6, 19 : 7 · M3: 19 : 5, 34 : 6, 16 : 6 · mỗi câu bốn phương án | chữ | `du-lon-hon-chia`, `nham-thuong-du` |
| D6 | Chậu cây A, B, C, D | SGK (Luyện tập 1) | MT3 | M1: chậu nào có số dư là 3 (chọn một trong bốn) · M2: có bao nhiêu chậu chia hết (đếm) · M3: chậu nào có số dư lớn nhất | **hình mới** `chauCay` (4 chậu mang phép chia, `data-dem`) | `nham-thuong-du`, `dem-sot-chau` |
| D7 | Số dư có thể là mấy | **không có trong SGK** | MT3 | M1: chia cho 3, số dư có thể là 0, 1, 2 · M2: chia cho 5, số dư nào không thể (chọn một) · M3: Đúng / Sai: "số dư là 7 khi chia cho 5" | chữ | `du-lon-hon-chia` |
| D8 | Chia 18 quả vào các đĩa | SGK (Hoạt động 2) | MT4 | M1: mỗi đĩa 3 quả (hết) · M2: mỗi đĩa 4 hoặc 5 quả, có dư: chia được mấy đĩa, thừa mấy quả · M3: chọn cách chia hết trong ba cách | **hình mới** `ronQua` (đĩa, quả) | `nham-thuong-du`, `lech-nhom` |
| D9 | Chia cá vào rổ | SGK (Luyện tập 3) | MT4 | M1: 56 con cá, mỗi rổ 8 con: mấy rổ (hết) · M2: 49 con cá, mỗi rổ 8 con: mấy rổ, còn thừa mấy con · M3: bài toán có thêm bước (còn thừa mấy con, hay cần thêm mấy con để đủ rổ) | chữ, `anh` | `nham-thuong-du`, `thieu-buoc` |
| D10 | Bạn nói đúng hay sai | **không có trong SGK** | MT3, MT4 | M1: "Bạn An nói: 23 : 5 = 4 (dư 7)." · M2: "Bạn An nói: 18 : 4 = 4 dư 2." · M3: "Bạn An nói: …" với "Đồng ý, vì…" / "Không đồng ý, vì…" | `anh('boy')` | `du-lon-hon-chia`, `nham-thuong-du` |

Dạng không có trong SGK: **Số dư có thể là mấy (D7)**, **Bạn nói đúng hay sai (D10)** (2 dạng). Tám dạng còn lại bám các mục của sách.

Phân bố: MT1 hai dạng (D1, D2) · MT2 ba dạng (D3, D4, D5) · MT3 ba dạng (D6, D7, D10) · MT4 ba dạng (D8, D9, D10). Mỗi mục tiêu ≥ 2 dạng.

### Luật lời câu hỏi (áp dụng cho cả bài)

- Nút **Đúng / Sai** chỉ đi với **mệnh đề**; câu "… có … không?" dùng nút **Có / Không**.
- Dạng "Bạn An nói …" dùng "Em thấy thế nào?" với "Đồng ý, vì…" / "Không đồng ý, vì…". Đáp án không tự mâu thuẫn với đề.
- Viết đúng thuật ngữ: **số bị chia, số chia, thương, số dư**; "chia hết" khi số dư bằng 0.
- Đáp án nhiễu **không chứa chính đối tượng đang hỏi**; ở câu chọn số dư, ít nhất một phương án là số dư **lớn hơn hoặc bằng số chia** (lỗi `du-lon-hon-chia`).
- Số trong hình đặt tính không viết hai chữ số vào một ô; số dư ghi sau chữ "dư".

## 3. Hình mới cần vẽ (viết ngay trong `bai-25.js`, KHÔNG sửa `figures.js`)

Theo quy chuẩn `sk-ve-hinh-tieuhoc`: bảng màu `HM`, `svgHinh`, `nhanTron` / `nhanVien`; mỗi hình là MỘT SVG co theo màn hình; chữ ≥ 14px ở khổ điện thoại; nét và chữ dùng `currentColor`; nét thẳng có `fill="none"`; không emoji hệ thống.

| Hàm | Mô tả | Tham số | Kiểm do mã |
|---|---|---|---|
| `phepChiaDoc(a, b, tuy)` | Phép chia đặt dọc theo khung ⌐: số bị chia bên trong khung, số chia bên phải, thương dưới số chia; bước nhân (thương × số chia) viết dưới số bị chia, gạch ngang, số dư; tuỳ chọn che chữ số bằng ô "?". | a, b, tuỳ {an: 'thuong'/'tich'/'du'} | `check()` tính lại thương, tích, số dư từ a, b; đọc các `data-pt` từ chuỗi SVG. |
| `ronQua(soQua, soChia, kieu)` | Các rổ (hoặc đĩa) trên hàng; quả (hình tròn) xếp vào từng rổ; phần thừa nằm riêng bên cạnh. Mỗi quả `data-dem="qua"`; không chồng nhau. | số quả, số rổ, 'ro'/'dia' | `check()` đếm quả = số quả; số rổ khớp; thừa = số dư. |
| `chauCay(ds)` | Bốn chậu cây A, B, C, D, mỗi chậu mang một phép chia (nhãn trắng). Mỗi chậu `data-dem="chau"`. | mảng 4 chuỗi phép chia | `check()` tính lại thương, số dư mỗi chậu; đáp án khớp. |

Hình dùng lại từ `figures.js`: `anh`, `oHoi`, `svgHinh`, `HM`, `nhanVien`.

## 4. Nhãn lỗi

- Chuẩn của engine dùng được: `canh-dong`, `nham-bang`, `cong-thay-nhan`, `lech-nhom`, `dao-vai`, `thieu-buoc`.
- **Nhãn riêng của bài 25** (khai báo qua `BAI.loi`):

| Nhãn | Tên hiển thị | Ví dụ lỗi | Gợi ý |
|---|---|---|---|
| `du-lon-hon-chia` | Số dư lớn hơn hoặc bằng số chia | 23 : 5 = 4 dư 3 viết dư 8 hoặc dư 5 | "Số dư luôn bé hơn số chia. Nếu dư còn chia được, bé chia tiếp." |
| `nham-thuong-du` | Nhầm thương với số dư | Trả lời 4 khi hỏi số dư của 23 : 5 | "Thương là kết quả phép chia, số dư là phần còn lại." |
| `tru-sai-buoc` | Trừ sai ở bước đặt tính | 23 − 20 = 2 | "Bé tính lại: số bị chia trừ tích (thương × số chia)." |
| `dem-sot-chau` | Đếm sót chậu | Đếm sót một chậu chia hết | "Bé tính từng chậu, rồi đếm." |

## 5. Rủi ro đã biết

1. **Số dư luôn bé hơn số chia:** `make` sinh câu chọn số dư với bốn phương án khác nhau, trong đó có số dư ≥ số chia; `check()` đòi đúng một phương án có số dư đúng và bé hơn số chia.
2. **Trùng đáp án giữa thương và số dư** (ví dụ 8 : 3 = 2 dư 2): tránh các cặp thương = số dư khi câu hỏi hỏi một trong hai.
3. **Khung ⌐ trên điện thoại:** hình hẹp, chữ số ≥ 14px; gạch ngang đủ dài; không đè chữ.
4. **Quả xếp vào rổ:** đúng số quả mỗi rổ, phần thừa nằm ngoài rổ; mỗi quả `data-dem` không chồng nhau.
5. **Không chia cho 1, không chia cho 0**; số chia 2–9.
6. **Không nhãn sát biên:** font Linux hẹp hơn Segoe UI; thầy soát lại hình trên máy thầy (ghi trong PR).
7. `index.html` dùng CRLF: sửa bằng Python đọc/ghi nhị phân (không `sed -i`), diff đúng 1 dòng.
8. `kiem_dem.mjs` kiểm các `data-dem` của bài.

## 6. Việc sẽ làm sau khi thầy duyệt

1. Viết `bai-25.js` theo bảng trên (nối chuỗi, **không** backtick hay template literal), chép `bai-25.html`, sửa `index.html` (một dòng).
2. Chạy RIÊNG từng cổng (đặt `CHROME` nếu cần):
   - `node .claude/skills/sk-web-toan-tieuhoc/assets/kiemtra.js . bai-25.js 400000`
   - `node .claude/skills/sk-ve-hinh-tieuhoc/assets/phong_tranh.mjs . <thư mục tạm> bai-25 --soat --khong-chup --rong 375,1200 --giao light,dark --lan 3` → 0 lỗi
   - `node .claude/skills/sk-web-toan-tieuhoc/assets/soat_giao_dien.mjs . bai-25 --cau 2`
3. Tự soi ảnh phòng tranh (rổ quả, khung ⌐, chậu cây), push, ghi kết quả từng cổng trong mô tả PR, đổi tiêu đề thành "[XONG] Bài 25", gỡ trạng thái nháp. Không tự gộp.

## 7. Cần thầy quyết (kèm phương án đề xuất)

1. **Mục SGK ở mục 0 và bảng dạng** có đúng không? Đề xuất: đúng như bảng.
2. **Cách viết số dư:** "(dư 1)" sau thương; hình khung ⌐ ghi số dư dưới gạch ngang cuối. Đúng như sách chưa?
3. **Luyện tập 2 (chọn số dư):** bốn phương án, có phương án ≥ số chia (nhãn `du-lon-hon-chia`): đồng ý (**đề xuất**).
4. **Hai dạng "không có trong SGK" (D7, D10):** giữ (**đề xuất**) hay bớt?
5. **Bốn nhãn riêng** (`du-lon-hon-chia`, `nham-thuong-du`, `tru-sai-buoc`, `dem-sot-chau`): giữ (**đề xuất**) hay gom bớt về `lech-nhom`, `thieu-buoc`?
6. **Bốn mục tiêu, mười dạng**; xếp lại thứ tự dạng theo sư phạm như bài 9–24 (**đề xuất**).
