# Phân tích sư phạm — Bài 29: Luyện tập chung (BÀI MỚI — BẢN NHÁP CHỜ DUYỆT)

Mẫu: `bai-24.js` (gấp – giảm, `soDoGT`), `bai-26.js` (đặt tính chia `chiaDoc2`), `bai-28.js` (khi đã có: sơ đồ đoạn thẳng hai bước) + khối "LUYỆN THÔNG MINH" ở đầu `engine.js`.
Phạm vi: tạo mới `bai-29.js`, `bai-29.html` (chép từ `assets/bai-template.html`), thêm 29 vào `AVAILABLE` trong `index.html` (giữ CRLF, diff đúng 1 dòng)
và file phân tích này. Không đụng `engine.js`, `figures.js`, `lua.js`. Bài mới **không** thêm vào `chua_chuan.txt`: `phong_tranh --soat` phải 0 lỗi. Chưa viết dòng mã nào.

Bài 29 gộp hai tiết luyện tập của **Chủ đề 4** (các dạng bài 23–28). **Dùng ít hình mới**: hình dựng lại từ các hàm của bài 24, 25, 26, 28 (chép sang, không dùng chung tệp). Dùng **5 mục tiêu** × 10 dạng.

## 0. Nguồn và điều cần lưu ý

- Cấu trúc mục SGK (trang in 83–84) lấy từ **bản tóm tắt của phiên Claude trên máy thầy** (đã đối chiếu từng con số trên trang sách); phiên đám mây chưa tự đối chiếu sách. Không chép nguyên văn đề vào repo; chỉ ghi dạng bài và ý.
  - **Tiết 1, Luyện tập 1:** tính nhẩm a) 10 × 7, 20 × 4, 40 × 2, 30 × 3; b) 60 : 2, 90 : 3, 70 : 7, 40 : 2 (nhân, chia số tròn chục như bài 23, 26).
    **Luyện tập 2:** hai cây cầu: cầu A "giảm 2 lần", cầu B "gấp 3 lần"; các bạn mang các số 9, 32, 24, 27; bốn giỏ táo mang số 12, 81, 16, 27: 9 → B → 27; 32 → A → 16; 24 → A → 12; 27 → B → 81. Trên web: "bạn cầm số 32 đi cầu nào thì lấy được giỏ nào" (chọn một); **không dựng** khung cảnh nhiều bạn, cầu, giỏ.
    **Luyện tập 3:** Mai làm 27 tấm thiệp; số thiệp của Rô-bốt gấp 3 lần của Mai: 81.
    **Luyện tập 4:** buổi sáng cửa hàng bán 30 kg gạo; buổi chiều bằng buổi sáng giảm đi 2 lần: 15.
  - **Tiết 2, Luyện tập 1:** đặt tính chia (theo mẫu 45 : 7 = 6 dư 3): 60 : 2, 73 : 4, 39 : 3. Dùng khung đặt tính chia đã viết ở bài 25, 26 (chép sang).
    **Luyện tập 2:** Số? sơ đồ hai bước (tròn → vuông → tam giác): 32 gấp 3 lần → ? giảm 4 lần → ? (96 → 24); 42 giảm 3 lần → ? bớt 3 đơn vị → ? (14 → 11); 11 gấp 2 lần → ? thêm 2 đơn vị → ? (22 → 24).
    **Luyện tập 3:** Rô-bốt có 35 m vải, mỗi bộ quần áo công nhân may hết 3 m: may được nhiều nhất bao nhiêu bộ, còn thừa mấy mét (11 bộ, thừa 2 m). **Bẫy:** quên "còn thừa".
    **Luyện tập 4:** ngày hội trồng cây, Việt trồng 5 cây, Rô-bốt gấp 3 lần Việt: cả hai bạn (5 + 15 = 20).
- **Năm mục tiêu** (theo gợi ý của phiên máy thầy): nhân, chia nhẩm; gấp – giảm; giải toán hai bước; chia có dư; mũi tên hai bước.
- **Mọi kết quả < 100** (trừ ô bước giữa có thể tới 100). Mọi phép giảm và phép chia theo bài toán đều đúng quy tắc: phép giảm chia hết, phép chia có dư nói rõ "còn thừa".
- Hình mới tối thiểu: **cầu A, cầu B** (D3) vẽ đơn giản; còn lại chép `soDoGT`, `chiaDoc2` / `phepChiaDoc`, `soDoHai` từ các bài trước.

## 1. Năm mục tiêu (muctieu) × ba mức (Thông tư 27)

| MT | Tên | Mức 1 — Nhận biết | Mức 2 — Hiểu | Mức 3 — Vận dụng |
|---|---|---|---|---|
| MT1 | Nhân, chia nhẩm số tròn chục | 10 × 7, 60 : 2. | 20 × 4, 40 × 2, 90 : 3, 70 : 7. | Tìm thừa số, số bị chia; thương có chữ số 0. |
| MT2 | Gấp lên, giảm đi | Gấp hoặc giảm một số nhỏ (27 giảm 3 lần). | Thiệp của Rô-bốt gấp 3 lần (27 → 81); gạo buổi chiều giảm 2 lần (30 → 15). | Chọn phép tính hoặc nêu số lần khi biết hai số. |
| MT3 | Giải toán hai bước | Trồng cây: Việt 5 cây, Rô-bốt gấp 3 lần (hỏi Rô-bốt). | Cả hai bạn (5 + 15). | Số lớn hơn; chọn dãy hai phép tính; bạn nói đúng hay sai. |
| MT4 | Chia có dư | Đặt tính chia 60 : 2 (ô "?" ở thương). | 73 : 4, 39 : 3; vải 35 m, mỗi bộ 3 m: mấy bộ. | Còn thừa mấy mét; phát hiện lỗi quên "còn thừa". |
| MT5 | Mũi tên và cửa | Một cửa: bạn cầm số 32 đi cầu nào (A giảm 2 lần, B gấp 3 lần). | Hai bước: 32 gấp 3 lần → giảm 4 lần. | Hai bước hỗn hợp: 42 giảm 3 lần → bớt 3 đơn vị; 11 gấp 2 lần → thêm 2 đơn vị. |

Tham số engine: `goal:10, soCau:20, soCauToiDa:26`. 5 mục tiêu × tối thiểu 3 câu = 15 ≤ 20.

## 2. Mười dạng (topics) — xếp theo mạch sư phạm

"Nguồn": **SGK** = có trong sách (mục ghi trong ngoặc) · **không có trong SGK** = dạng thêm.

| # | Dạng | Nguồn | MT | Mức 1 / Mức 2 / Mức 3 | Hình | Nhãn lỗi chính |
|---|---|---|---|---|---|---|
| D1 | Nhân nhẩm số tròn chục | SGK (Tiết 1, LT1a) | MT1 | M1: 10 × 7, 10 × 4 · M2: 20 × 4, 40 × 2, 30 × 3 · M3: ? × 3 = 90; 3 × 30 | chữ | `nham-hang`, `nham-bang` |
| D2 | Chia nhẩm số tròn chục | SGK (Tiết 1, LT1b) | MT1 | M1: 60 : 2, 40 : 2 · M2: 90 : 3, 70 : 7 · M3: 80 : 4, 90 : 9; thương có chữ số 0 | chữ | `thieu-so-0`, `nham-hang` |
| D3 | Cầu A, cầu B | SGK (Tiết 1, LT2) | MT5 | M1: số 32 qua cầu A (giảm 2 lần): giỏ nào · M2: số 9 đi cầu nào để tới giỏ 27 (chọn một) · M3: bốn bạn, bốn giỏ: bạn cầm số 24 lấy giỏ nào | **hình mới** `haiCau` (cầu A, cầu B, bạn mang số; giỏ táo mang số) | `nham-chieu`, `nham-giam-bot` |
| D4 | Thiệp của Mai và Rô-bốt | SGK (Tiết 1, LT3) | MT2 | M1: Mai 27 tấm, Rô-bốt gấp 3 lần: Rô-bốt · M2: chọn phép tính gấp hay cộng · M3: số khác (gấp 4 lần, số nhỏ hơn) | `anh`, chữ | `nham-gap-them`, `nham-so-lan` |
| D5 | Gạo buổi chiều | SGK (Tiết 1, LT4) | MT2 | M1: sáng 30 kg, chiều giảm 2 lần: 15 · M2: chọn phép tính (30 : 2, 30 − 2) · M3: số khác; cả hai buổi (hai bước) | chữ | `nham-giam-bot`, `thieu-buoc` |
| D6 | Đặt tính chia | SGK (Tiết 2, LT1) | MT4 | M1: ô "?" ở thương, chia hết (60 : 2) · M2: có dư (73 : 4, 39 : 3 = 13): ô "?" ở bước hạ hoặc tích · M3: ô "?" ở số dư | `phepChiaDoc` / `chiaDoc2` (chép từ bài 25, 26) | `quen-ha`, `du-lon-hon-chia`, `tru-sai-buoc` |
| D7 | Mũi tên hai bước | SGK (Tiết 2, LT2) | MT5 | M1: 32 gấp 3 lần → ? (một bước đầu) · M2: 32 gấp 3 lần → giảm 4 lần → ? (96 → 24) · M3: 42 giảm 3 lần → bớt 3 đơn vị; 11 gấp 2 lần → thêm 2 đơn vị (hỗn hợp) | `soDoGT` (chép từ bài 24) ba ô | `nham-chieu`, `nham-gap-them`, `thieu-buoc` |
| D8 | Vải may quần áo | SGK (Tiết 2, LT3) | MT4 | M1: 35 m vải, mỗi bộ 3 m: may được mấy bộ (11) · M2: còn thừa mấy mét (2) · M3: số khác (47 m, mỗi bộ 5 m); đã dùng bao nhiêu mét vải | chữ, `anh` | `quen-thua`, `nham-thuong-du`, `thieu-buoc` |
| D9 | Ngày hội trồng cây | SGK (Tiết 2, LT4) | MT3 | M1: Việt 5 cây, Rô-bốt gấp 3 lần: Rô-bốt (15) · M2: cả hai bạn (20) · M3: số khác; chọn dãy hai phép tính | `soDoHai` (chép từ bài 28) hoặc chữ | `thieu-buoc`, `nham-gap-them` |
| D10 | Bạn nói đúng hay sai | **không có trong SGK** | MT3, MT4 | M1: "Bạn An nói: 20 cây là cả hai bạn trồng." · M2: "Bạn An nói: 35 : 3 = 11, hết." (quên "còn thừa") · M3: "Bạn An nói: …" với "Đồng ý, vì…" / "Không đồng ý, vì…" | `anh('boy')` | `quen-thua`, `thieu-buoc`, `nham-gap-them` |

Dạng không có trong SGK: **Bạn nói đúng hay sai (D10)** (1 dạng). Chín dạng còn lại bám các mục của sách.

Phân bố: MT1 hai dạng (D1, D2) · MT2 hai dạng (D4, D5) · MT3 hai dạng (D9, D10) · MT4 hai dạng (D6, D8) · MT5 hai dạng (D3, D7). Mỗi mục tiêu ≥ 2 dạng.

### Luật lời câu hỏi (áp dụng cho cả bài)

- Nút **Đúng / Sai** chỉ đi với **mệnh đề**; câu "… có … không?" dùng nút **Có / Không**.
- Dạng "Bạn An nói …" dùng "Em thấy thế nào?" với "Đồng ý, vì…" / "Không đồng ý, vì…". Đáp án không tự mâu thuẫn với đề (đề nói bạn sai thì không có đáp án "bạn không sai").
- Luôn viết rõ **"gấp … lần"**, **"giảm đi … lần"**, **"thêm … đơn vị"**, **"bớt … đơn vị"**, **"còn thừa"**.
- Đáp án nhiễu **không chứa chính đối tượng đang hỏi**. Mọi đáp số nguyên < 100 (trừ ô bước giữa có thể tới 100).
- Nhãn trong hình nằm giữa đúng đoạn nó đo; nhãn ở rìa khung chừa lề ≥ 1,3 lần cỡ chữ.

## 3. Hình mới cần vẽ (viết ngay trong `bai-29.js`, KHÔNG sửa `figures.js`)

Theo quy chuẩn `sk-ve-hinh-tieuhoc`: bảng màu `HM`, `svgHinh`, `nhanTron` / `nhanVien`; mỗi hình là MỘT SVG co theo màn hình; chữ ≥ 14px ở khổ điện thoại; nét và chữ dùng `currentColor`; nét thẳng có `fill="none"`; không emoji hệ thống.

| Hàm | Mô tả | Tham số | Kiểm do mã |
|---|---|---|---|
| `haiCau(banSo, gioSo)` | Hai cây cầu nằm song song: cầu A ghi "giảm 2 lần", cầu B ghi "gấp 3 lần"; bên trái bạn mang một số; bên phải các giỏ táo mang số; một đường nối chỉ cầu được chọn. Mỗi bạn `data-dem="ban"`, mỗi giỏ `data-dem="gio"`. | số của bạn, danh sách số giỏ | `check()` tính lại kết quả qua từng cầu; đúng một giỏ khớp. |
| `soDoGT`, `theTinh` (chép từ `bai-24.js`) | Số – cửa – kết quả; thẻ phép tính. | — | như bài 24. |
| `phepChiaDoc` (chép từ `bai-25.js`) hoặc `chiaDoc2` (từ `bai-26.js`) | Khung đặt tính chia một bước hoặc hai bước. | — | như bài 25, 26. |
| `soDoHai` (chép từ `bai-28.js`) | Sơ đồ đoạn thẳng cho bài toán hai bước. | — | như bài 28. |

Hình dùng lại từ `figures.js`: `anh`, `oHoi`, `svgHinh`, `HM`, `nhanVien`, `tinhBT`.

## 4. Nhãn lỗi

- Chuẩn của engine dùng được: `nham-bang`, `cong-thay-nhan`, `thieu-buoc`, `lech-nhom`, `dao-vai`.
- **Nhãn riêng của bài 29** (khai báo qua `BAI.loi`; nhãn đã có ở bài 24–28 dùng lại tên, khai báo lại trong tệp):

| Nhãn | Tên hiển thị | Ví dụ lỗi | Gợi ý |
|---|---|---|---|
| `nham-gap-them` | Nhầm "gấp n lần" với "thêm n đơn vị" | 27 gấp 3 lần viết 27 + 3 = 30 | "Gấp 3 lần là nhân với 3." |
| `nham-giam-bot` | Nhầm "giảm n lần" với "bớt n đơn vị" | 30 giảm 2 lần viết 30 − 2 = 28 | "Giảm đi 2 lần là chia cho 2." |
| `nham-chieu` | Nhầm chiều phép tính (gấp thay giảm) | 32 qua cầu "giảm 2 lần" viết 32 × 2 | "Giảm đi là chia, gấp lên là nhân." |
| `nham-so-lan` | Nhầm số lần với số đơn vị | Đáp số lần thay cho kết quả | "Số lần là số nhân hoặc chia." |
| `thieu-so-0` | Thương thiếu chữ số 0 | 80 : 4 viết 2 | "8 chục : 4 = 2 chục = 20." |
| `nham-hang` | Nhầm hàng khi nhẩm số tròn chục | 20 × 4 = 8 | "2 chục × 4 = 8 chục = 80." |
| `quen-ha`, `du-lon-hon-chia`, `tru-sai-buoc` | Lỗi đặt tính chia (như bài 25, 26) | quên hạ, dư lớn hơn số chia, trừ sai | như bài 25, 26 |
| `quen-thua` | Quên "còn thừa" | 35 : 3 = 11 mà quên dư 2 | "Phép chia có dư thì còn thừa 2 mét." |
| `nham-thuong-du` | Nhầm thương với số dư | Trả lời 11 khi hỏi còn thừa | "Thương là số bộ, số dư là số mét còn thừa." |

## 5. Rủi ro đã biết

1. **Nhiều nhãn riêng:** tổng 11 nhãn; mỗi câu chỉ gắn nhãn cho đáp án nhiễu tính ra từ lỗi thật; `kiemtra.js` kiểm.
2. **Cầu A, cầu B (D3):** hình đơn giản (hai hình chữ nhật dài làm cầu); chữ "giảm 2 lần", "gấp 3 lần" ≥ 14px ở 375px; các số bạn, giỏ ghi trong nhãn trắng; không dựng cảnh nhiều bạn cùng lúc (chỉ một bạn, một đường).
3. **Đúng một giỏ khớp:** bốn giỏ cho kết quả khác nhau; `check()` tính lại 2 cầu × số bạn; chỉ một giỏ khớp mỗi câu.
4. **Hình đặt tính chia chép sang:** giữ nguyên quy ước bài 25, 26 (số dư dưới cùng, dấu trừ bên trái); phép chia hai chữ số với chữ số hàng chục ≥ số chia dùng khung nhiều bước.
5. **Sơ đồ hai bước tròn – vuông – tam giác:** ba nút khác hình (tròn, vuông, tam giác) có thể dùng hình dạng nút của `soDoGT`; kích thước chữ ≥ 14px.
6. **Bài quên "còn thừa" (D8, D10):** đáp án nhiễu có số bộ đúng nhưng thiếu số mét thừa; `check()` tính ⌊a : b⌋ và số dư.
7. **Không nhãn sát biên:** font Linux hẹp hơn Segoe UI; thầy soát lại hình trên máy thầy (ghi trong PR).
8. `index.html` dùng CRLF: sửa bằng Python đọc/ghi nhị phân (không `sed -i`), diff đúng 1 dòng.
9. `kiem_dem.mjs` kiểm các `data-dem` của bài.

## 6. Việc sẽ làm sau khi thầy duyệt

1. Viết `bai-29.js` theo bảng trên (nối chuỗi, **không** backtick hay template literal), chép `bai-29.html`, sửa `index.html` (một dòng).
2. Chạy RIÊNG từng cổng (đặt `CHROME` nếu cần):
   - `node .claude/skills/sk-web-toan-tieuhoc/assets/kiemtra.js . bai-29.js 400000`
   - `node .claude/skills/sk-ve-hinh-tieuhoc/assets/phong_tranh.mjs . <thư mục tạm> bai-29 --soat --khong-chup --rong 375,1200 --giao light,dark --lan 3` → 0 lỗi
   - `node .claude/skills/sk-web-toan-tieuhoc/assets/soat_giao_dien.mjs . bai-29 --cau 2`
3. Tự soi ảnh phòng tranh (cầu A, cầu B, khung đặt tính chia, sơ đồ hai bước), push, ghi kết quả từng cổng trong mô tả PR, đổi tiêu đề thành "[XONG] Bài 29", gỡ trạng thái nháp. Không tự gộp.

## 7. Cần thầy quyết (kèm phương án đề xuất)

1. **Mục SGK ở mục 0 và bảng dạng** có đúng không? Đề xuất: đúng như bảng.
2. **Cầu A, cầu B (Luyện tập 2 của tiết 1):** chỉ một bạn và một đường qua cầu, không dựng cả cảnh: đồng ý (**đề xuất**).
3. **Năm mục tiêu** (nhân – chia nhẩm; gấp – giảm; toán hai bước; chia có dư; mũi tên và cửa), mỗi mục tiêu hai dạng: đồng ý (**đề xuất**).
4. **Hình chép sang** từ bài 24, 25, 26, 28 (không dùng chung tệp): đồng ý (**đề xuất**).
5. **Dạng "không có trong SGK" (D10):** giữ (**đề xuất**) hay bớt?
6. **Nhãn riêng:** giữ hết (**đề xuất**) hay gom bớt về nhãn chuẩn?
7. **Mười dạng**; xếp lại thứ tự dạng theo sư phạm như bài 9–28 (**đề xuất**).
