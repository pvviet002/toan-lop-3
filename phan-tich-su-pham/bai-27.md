# Phân tích sư phạm — Bài 27: Giảm một số đi một số lần (BÀI MỚI — BẢN NHÁP CHỜ DUYỆT)

Mẫu: `bai-24.js` (bài "gấp một số lên một số lần", cùng cặp khái niệm nghịch đảo, cùng kiểu hình số – cửa – kết quả) + khối "LUYỆN THÔNG MINH" ở đầu `engine.js`.
Phạm vi: tạo mới `bai-27.js`, `bai-27.html` (chép từ `assets/bai-template.html`), thêm 27 vào `AVAILABLE` trong `index.html` (giữ CRLF, diff đúng 1 dòng)
và file phân tích này. Không đụng `engine.js`, `figures.js`, `lua.js`. Bài mới **không** thêm vào `chua_chuan.txt`: `phong_tranh --soat` phải 0 lỗi. Chưa viết dòng mã nào.

Bài 27 là bài thứ năm của **Chủ đề 4: Phép nhân, phép chia trong phạm vi 100**. Dùng **4 mục tiêu** × 10 dạng.

## 0. Nguồn và điều cần lưu ý

- Cấu trúc mục SGK (trang in 79–80) lấy từ **bản tóm tắt của phiên Claude trên máy thầy** (đã đối chiếu từng con số trên trang sách); phiên đám mây chưa tự đối chiếu sách. Không chép nguyên văn đề vào repo; chỉ ghi dạng bài và ý.
  - **Khám phá:** 6 con thỏ "giảm đi 3 lần" còn 2 con (sơ đồ: lúc đầu 3 nhóm, lúc sau 1 nhóm). Quy tắc: muốn giảm một số đi một số lần, lấy số đó **chia** cho số lần: 6 : 3 = 2.
  - **Hoạt động 1 (Số?):** sáu ô "lò nướng", mỗi ô một phép trên một số, xen giảm và gấp: 27 giảm 3 lần → 9; 30 giảm 5 lần → ?; 14 gấp 2 lần → ?; 17 gấp 4 lần → ?; 48 giảm 6 lần → ?; 54 giảm 9 lần → ?. **Bẫy:** nhầm chiều phép tính (gấp thay giảm).
    **Hoạt động 2:** Nam có 42 nhãn vở, cho bạn một số nhãn; số còn lại **giảm đi 3 lần** so với lúc đầu: còn 14.
  - **Luyện tập 1:** Số? hai mũi tên liền nhau: 14 gấp 7 lần → ? giảm 2 lần → ? (98 → 49); 52 giảm 4 lần → ? gấp 3 lần → ? (13 → 39).
    **Luyện tập 2:** Rô-bốt có 30 đồng vàng; đi qua các ngã rẽ (gấp 2 lần, gấp 4 lần, giảm 3 lần, giảm 5 lần, gấp 4 lần…) tìm đường để có 40 đồng: mê cung, **không dựng**. Trên web đổi thành "qua hai cửa liên tiếp, số cuối là bao nhiêu" và "cặp cửa nào cho 40" (chọn một).
    **Luyện tập 3:** Mai có 28 bút màu, sau khoá vẽ số bút còn lại giảm đi 4 lần: 7.
    **Luyện tập 4:** tìm số chia: 54 : ? = 6 (9), 56 : ? = 7 (8), 36 : ? = 9 (4).
- **Ba cặp dễ lẫn:** giảm đi n lần (chia) ≠ bớt n đơn vị (trừ); gấp n lần (nhân) ≠ thêm n đơn vị (cộng); "giảm n lần" ≠ "giảm n đơn vị".
- **Mọi phép giảm đều chia hết** (số lần là ước của số đã cho). Không số thập phân. Số ≤ 100 (ô ở bước giữa có thể tới 100).
- **Nhãn riêng:** `nham-giam-bot` (trừ thay chia), `nham-chieu` (gấp thay giảm). Bài 24 đã có `nham-gap-them`, `nham-so-lan`: dùng lại tên khi hợp (khai báo lại trong `BAI.loi` của bài 27).
- **Sơ đồ nhóm "giảm":** lúc đầu có a vật xếp thành n nhóm bằng nhau, lúc sau còn 1 nhóm; số nhóm do mã tính khớp số lần; mỗi nhóm `data-dem="nhom"`, mỗi vật `data-dem="vat"`.
- Hình mới viết trong `bai-27.js` (chép `soDoGT`, `theTinh` từ `bai-24.js` nếu cần); không sửa `figures.js`.

## 1. Bốn mục tiêu (muctieu) × ba mức (Thông tư 27)

| MT | Tên | Mức 1 — Nhận biết | Mức 2 — Hiểu | Mức 3 — Vận dụng |
|---|---|---|---|---|
| MT1 | Giảm một số đi một số lần | Sơ đồ nhóm: lúc đầu mấy nhóm; 6 giảm 3 lần. | Tính giảm đi n lần bằng phép chia (30 giảm 5 lần); chọn phép tính đúng. | Số lớn hơn (54 giảm 9 lần); số lần là ước hai chữ số (96 giảm 4 lần). |
| MT2 | Gấp hay giảm (chiều phép tính) | Một cửa: gấp hoặc giảm (số nhỏ). | Hai mũi tên liền nhau (14 gấp 7 lần → giảm 2 lần); lò nướng xen giảm và gấp. | Qua hai cửa liên tiếp; cặp cửa nào cho kết quả cho trước. |
| MT3 | Giảm n lần khác bớt n đơn vị | Đúng / Sai: 27 giảm 3 lần là 9. | Từ hai số, nói đúng "bớt … đơn vị" hay "giảm … lần". | Bạn nói đúng hay sai ("Em thấy thế nào?"); hai quan hệ cùng đúng. |
| MT4 | Giải toán và vận dụng | Nhãn vở còn lại giảm 3 lần (42 → 14); 28 bút màu giảm 4 lần. | Bài toán chọn phép chia hay phép trừ; tìm số chia (54 : ? = 6). | Hai bước: cho đi rồi giảm; tìm số chia khi biết thương. |

Tham số engine: `goal:10, soCau:18, soCauToiDa:24`. 4 mục tiêu × tối thiểu 3 câu = 12 ≤ 18.

## 2. Mười dạng (topics) — xếp theo mạch sư phạm

"Nguồn": **SGK** = có trong sách (mục ghi trong ngoặc) · **không có trong SGK** = dạng thêm.

| # | Dạng | Nguồn | MT | Mức 1 / Mức 2 / Mức 3 | Hình | Nhãn lỗi chính |
|---|---|---|---|---|---|---|
| D1 | Sơ đồ nhóm "giảm" | SGK (Khám phá) | MT1 | M1: 6 con thỏ xếp 3 nhóm: lúc đầu mấy nhóm · M2: giảm đi 3 lần còn mấy con · M3: 12 con giảm 4 lần còn mấy con; đáp bằng số | **hình mới** `nhomThu` | `nham-giam-bot`, `nham-so-lan` |
| D2 | Giảm một số đi n lần | SGK (Khám phá, quy tắc) | MT1 | M1: 8 giảm 2 lần · M2: chọn phép tính đúng (a : n, a − n, a × n, n : a) · M3: số lớn (54 giảm 9 lần, 96 giảm 4 lần) | chữ | `nham-giam-bot`, `nham-chieu`, `nham-bang` |
| D3 | Lò nướng: gấp hay giảm | SGK (Hoạt động 1) | MT2 | M1: một phép trên số nhỏ (12 giảm 3 lần) · M2: sáu ô xen giảm và gấp (27, 30, 14, 17, 48, 54); hỏi một ô · M3: biết kết quả, tìm số đầu (? giảm 4 lần = 6) | `soDoGT` | `nham-chieu`, `nham-giam-bot`, `nham-bang` |
| D4 | Hai mũi tên liền nhau | SGK (Luyện tập 1) | MT2 | M1: gấp rồi giảm, số nhỏ (6 gấp 3 lần → giảm 2 lần) · M2: 14 gấp 7 lần → giảm 2 lần; 52 giảm 4 lần → gấp 3 lần (hỏi ô cuối) · M3: hỏi ô giữa khi biết ô cuối | `soDoGT` (ba ô) | `nham-chieu`, `thieu-buoc` |
| D5 | Qua hai cửa | SGK (Luyện tập 2, thay mê cung) | MT2 | M1: 30 qua "gấp 2 lần" rồi "giảm 3 lần": số cuối · M2: chọn cặp cửa cho kết quả 40 từ 30 (chọn một) · M3: chọn cặp cửa cho kết quả cho trước, số khác | `soDoGT` | `nham-chieu`, `thieu-buoc` |
| D6 | Đúng / Sai giảm hay bớt | **không có trong SGK** | MT3 | M1: "Từ 27 giảm 3 lần được 9." · M2: "Từ 30 đến 25 là bớt 5 đơn vị / giảm 5 lần" · M3: 24 → 12: giảm 2 lần (Đ) và bớt 12 đơn vị (Đ), bớt 2 đơn vị (S) | chữ | `nham-giam-bot`, `nham-so-lan` |
| D7 | Bạn nói đúng hay sai | **không có trong SGK** | MT3 | M1: "Bạn An nói: 18 giảm 3 lần là 15." · M2: "Bạn An nói: 20 giảm 4 lần là 16." · M3: "Bạn An nói: …" với "Đồng ý, vì…" / "Không đồng ý, vì…" | `anh('boy')` | `nham-giam-bot`, `nham-chieu` |
| D8 | Nhãn vở còn lại | SGK (Hoạt động 2) | MT4 | M1: còn lại giảm 3 lần so với lúc đầu: 42 → ? (hiểu "so với lúc đầu") · M2: 24 bút giảm 4 lần còn mấy · M3: Nam có 42 nhãn vở, cho bạn 14 nhãn rồi còn lại giảm… (hai bước) | chữ, `anh` | `nham-giam-bot`, `thieu-buoc` |
| D9 | Bút màu sau khoá vẽ | SGK (Luyện tập 3) | MT4 | M1: 28 bút giảm 4 lần còn 7 · M2: chọn phép tính (28 : 4, 28 − 4, 28 × 4) · M3: số bút ban đầu khi biết còn 7 và giảm 4 lần | chữ, `anh` | `nham-giam-bot`, `nham-chieu` |
| D10 | Tìm số chia | SGK (Luyện tập 4) | MT4 | M1: 54 : ? = 6 · M2: 56 : ? = 7, 36 : ? = 9 · M3: 72 : ? = 8, 81 : ? = 9, 63 : ? = 7. Đáp bằng số | chữ | `dao-vai`, `cong-thay-nhan` |

Dạng không có trong SGK: **Đúng / Sai giảm hay bớt (D6)**, **Bạn nói đúng hay sai (D7)** (2 dạng). Tám dạng còn lại bám các mục của sách.

Phân bố: MT1 hai dạng (D1, D2) · MT2 ba dạng (D3, D4, D5) · MT3 hai dạng (D6, D7) · MT4 ba dạng (D8, D9, D10). Mỗi mục tiêu ≥ 2 dạng.

### Luật lời câu hỏi (áp dụng cho cả bài)

- Nút **Đúng / Sai** chỉ đi với **mệnh đề**; câu "… có … không?" dùng nút **Có / Không**.
- Dạng "Bạn An nói …" dùng "Em thấy thế nào?" với "Đồng ý, vì…" / "Không đồng ý, vì…". Đáp án không tự mâu thuẫn với đề.
- Luôn viết rõ **"giảm đi … lần"** (chia) hoặc **"bớt … đơn vị"** (trừ); **"gấp … lần"** (nhân) hoặc **"thêm … đơn vị"** (cộng). Không viết "ít hơn … lần".
- Đáp án nhiễu **không chứa chính đối tượng đang hỏi**.
- Nhãn trong hình nằm giữa đúng phần nó đo; nhãn ở rìa khung chừa lề ≥ 1,3 lần cỡ chữ.
- Mọi phép giảm chia hết; mọi kết quả nguyên, ≤ 100.

## 3. Hình mới cần vẽ (viết ngay trong `bai-27.js`, KHÔNG sửa `figures.js`)

Theo quy chuẩn `sk-ve-hinh-tieuhoc`: bảng màu `HM`, `svgHinh`, `nhanTron` / `nhanVien`; mỗi hình là MỘT SVG co theo màn hình; chữ ≥ 14px ở khổ điện thoại; nét và chữ dùng `currentColor`; nét thẳng có `fill="none"`; không emoji hệ thống.

| Hàm | Mô tả | Tham số | Kiểm do mã |
|---|---|---|---|
| `nhomThu(n, moi, con)` | Sơ đồ "lúc đầu": n nhóm (hình bo góc) bằng nhau, mỗi nhóm moi vật (thỏ vẽ đơn giản hoặc chấm tròn); "lúc sau": 1 nhóm. Mỗi nhóm `data-dem="nhom"`, mỗi vật `data-dem="vat"`; nhãn "Lúc đầu", "Lúc sau" bên trái. | n nhóm, moi vật mỗi nhóm, con = 'tho' / 'tron' | `check()` đếm nhóm = số lần, vật = n × moi (lúc đầu) và moi (lúc sau). |
| `soDoGT(nut, cua)` (chép từ `bai-24.js`) | Số – cửa – kết quả, nhiều nút. | nut, cua | chữ số do mã tính, `check()` tính lại. |
| `theTinh(ds)` (chép từ `bai-24.js`) | Thẻ phép tính. | ds | tính lại từng thẻ. |

Hình dùng lại từ `figures.js`: `anh`, `oHoi`, `svgHinh`, `HM`, `tinhBT`, `bangCot`.

## 4. Nhãn lỗi

- Chuẩn của engine dùng được: `nham-bang`, `cong-thay-nhan`, `lech-nhom`, `dao-vai`, `thieu-buoc`.
- **Nhãn riêng của bài 27** (khai báo qua `BAI.loi`):

| Nhãn | Tên hiển thị | Ví dụ lỗi | Gợi ý |
|---|---|---|---|
| `nham-giam-bot` | Nhầm "giảm n lần" với "bớt n đơn vị" | 12 giảm 3 lần viết 12 − 3 = 9 | "Giảm đi 3 lần là chia cho 3: 12 : 3. Bớt 3 đơn vị mới là trừ 3." |
| `nham-chieu` | Nhầm chiều phép tính (gấp thay giảm) | 30 giảm 5 lần viết 30 × 5 = 150 | "Giảm đi là chia, gấp lên là nhân. Bé đọc kỹ cửa nhé!" |
| `nham-so-lan` | Nhầm số lần với số đơn vị | 6 con giảm 3 lần còn 3 (lấy 6 − 3) | "Số lần là số nhóm bằng nhau; một nhóm là kết quả." |

## 5. Rủi ro đã biết

1. **Kết quả của "giảm" và "bớt" trùng nhau** (ví dụ 6 giảm 2 lần = 3 và 6 bớt 3 = 3): `make` tránh các cặp số cho hai kết quả bằng nhau, và `check()` kiểm.
2. **Sơ đồ nhóm:** số nhóm khớp số lần, vật trong mỗi nhóm đều nhau; các nhóm không chồng nhau; trên điện thoại số nhóm tối đa 6 vẫn rõ.
3. **Mũi tên hai ô liền nhau:** ô giữa phải là kết quả nguyên của phép đầu; `check()` tính lại cả hai bước.
4. **"Qua hai cửa" (D5):** không dựng mê cung; hai cửa đủ để tính; cặp cửa nào cho 40: đúng một cặp trong bốn (cả cộng hoặc trừ không dùng, chỉ gấp và giảm).
5. **Chữ trong hình:** nhãn cửa "giảm 3 lần" dài hơn "gấp 2 lần": mũi tên đủ rộng như `soDoGT` của bài 24.
6. **Không nhãn sát biên:** font Linux hẹp hơn Segoe UI; thầy soát lại hình trên máy thầy (ghi trong PR).
7. `index.html` dùng CRLF: sửa bằng Python đọc/ghi nhị phân (không `sed -i`), diff đúng 1 dòng.
8. `kiem_dem.mjs` kiểm các `data-dem` của bài.

## 6. Việc sẽ làm sau khi thầy duyệt

1. Viết `bai-27.js` theo bảng trên (nối chuỗi, **không** backtick hay template literal), chép `bai-27.html`, sửa `index.html` (một dòng).
2. Chạy RIÊNG từng cổng (đặt `CHROME` nếu cần):
   - `node .claude/skills/sk-web-toan-tieuhoc/assets/kiemtra.js . bai-27.js 400000`
   - `node .claude/skills/sk-ve-hinh-tieuhoc/assets/phong_tranh.mjs . <thư mục tạm> bai-27 --soat --khong-chup --rong 375,1200 --giao light,dark --lan 3` → 0 lỗi
   - `node .claude/skills/sk-web-toan-tieuhoc/assets/soat_giao_dien.mjs . bai-27 --cau 2`
3. Tự soi ảnh phòng tranh (sơ đồ nhóm, mũi tên), push, ghi kết quả từng cổng trong mô tả PR, đổi tiêu đề thành "[XONG] Bài 27", gỡ trạng thái nháp. Không tự gộp.

## 7. Cần thầy quyết (kèm phương án đề xuất)

1. **Mục SGK ở mục 0 và bảng dạng** có đúng không? Đề xuất: đúng như bảng.
2. **Mê cung (Luyện tập 2)** đổi thành "qua hai cửa" (D5): đồng ý (**đề xuất**).
3. **Con thỏ trong sơ đồ nhóm** vẽ đơn giản (hoặc chấm tròn khi không nhận ra được): đồng ý (**đề xuất**).
4. **Hai dạng "không có trong SGK" (D6, D7):** giữ (**đề xuất**) hay bớt?
5. **Ba nhãn riêng** (`nham-giam-bot`, `nham-chieu`, `nham-so-lan`): giữ (**đề xuất**) hay gom về `cong-thay-nhan`, `lech-nhom`?
6. **Bốn mục tiêu, mười dạng**; xếp lại thứ tự dạng theo sư phạm như bài 9–26 (**đề xuất**).
