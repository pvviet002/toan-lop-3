# Phân tích sư phạm — Bài 22: Luyện tập chung (BÀI MỚI — BẢN NHÁP CHỜ DUYỆT)

Mẫu: `bai-18.js`, `bai-19.js`, `bai-20.js` (bài hình học luyện tập chung, có hình riêng trong file) + khối "LUYỆN THÔNG MINH" ở đầu `engine.js`.
Phạm vi: tạo mới `bai-22.js`, `bai-22.html` (chép từ `assets/bai-template.html`), thêm 22 vào `AVAILABLE` trong `index.html` (giữ CRLF, diff đúng 1 dòng)
và file phân tích này. Không đụng `engine.js`, `figures.js`, `lua.js`. Bài mới **không** thêm vào `chua_chuan.txt`: `phong_tranh --soat` phải 0 lỗi. Chưa viết dòng mã nào.

Bài 22 gộp hai tiết luyện tập về **hình vuông, hình tròn, đếm hình, hình khối**. Dùng **4 mục tiêu** × 9 dạng.

## 0. Nguồn và điều cần lưu ý

- Cấu trúc mục SGK (trang in 65–66) lấy từ **bản tóm tắt của phiên Claude trên máy thầy**; phiên đám mây chưa tự đối chiếu sách. Không chép nguyên văn đề vào repo; chỉ ghi dạng bài và ý.
  - **Tiết 1, Luyện tập 1:** Mai vẽ một hình vuông trên giấy ô rồi vẽ trung điểm mỗi cạnh; trong ba hình, hình nào vẽ đúng (bẫy: hình chữ nhật dài; điểm lệch một ô).
    **Luyện tập 2:** tờ giấy hình tròn dán vào tờ giấy hình vuông (tròn chạm bốn cạnh); bán kính 2 cm thì cạnh hình vuông dài mấy cm (bằng đường kính, 4 cm).
    **Luyện tập 3:** cái ao hình chữ nhật, lá súng hình tròn đường kính 1 dm xếp sát nhau dọc hai cạnh: a) chiều dài (7 lá liền, 7 dm); b) chiều rộng (4 lá liền, 4 dm).
  - **Tiết 2, Luyện tập 1:** đếm hình tam giác và hình tứ giác trong ngũ giác ABCDE có hai đường chéo AC, AD (3 tam giác, 2 tứ giác; ngũ giác ABCDE không đếm).
    **Luyện tập 2:** dùng ê ke kiểm tra hai bán kính nào của hình tròn tâm O tạo thành góc vuông (bốn bán kính OA, OB, OC, OD; đúng một cặp vuông).
    **Luyện tập 3:** ghép 8 khối lập phương nhỏ thành khối lập phương lớn (2 × 2 × 2), sơn đỏ mọi mặt khối lớn: tất cả bao nhiêu mặt của khối nhỏ được sơn đỏ (6 mặt × 4 = 24).
- **Luật đếm hình đã duyệt ở bài 19:** chỉ đếm hình **không có điểm nằm giữa cạnh**; hình đếm phải là đa giác lồi. Hai đường chéo chung đỉnh A không cắt nhau trong ngũ giác, nên không có điểm nằm giữa cạnh. `check()` liệt kê tam giác, tứ giác từ chính các đoạn đã vẽ (vét cạn), không tin con số trong mã.
- **Góc vuông bằng ê ke (Tiết 2, Luyện tập 2):** web không có ê ke thật. Hình vẽ **một ê ke nhỏ** cạnh hình tròn (hoặc câu "dùng ê ke kiểm tra") và hỏi chọn cặp bán kính. Đúng **một** cặp vuông (đúng 90 độ trên hình); mọi cặp khác lệch ≥ 12 độ so với 90 độ (luật từ bài 18), không dùng từ "góc nhọn", "góc tù".
- **Trung điểm chỉ nằm trên điểm lưới:** cạnh hình vuông là số ô chẵn (2, 4, 6), nên trung điểm rơi đúng vào giao điểm ô lưới.
- **Số thập phân không dùng.** Mọi số đo nguyên (cm, dm).
- **Hình mới viết trong `bai-22.js`**; khối 3D chép phép chiếu xiên từ `bai-21.js` (nếu bài 21 chưa được viết thì viết hàm ngay trong `bai-22.js`, vẫn chép hàm, không dùng chung tệp).

## 1. Bốn mục tiêu (muctieu) × ba mức (Thông tư 27)

| MT | Tên | Mức 1 — Nhận biết | Mức 2 — Hiểu | Mức 3 — Vận dụng |
|---|---|---|---|---|
| MT1 | Hình vuông và trung điểm | Điểm M có là trung điểm cạnh không (cạnh 2–4 ô); trung điểm cách đỉnh mấy ô. | Chọn hình vẽ đúng trong ba hình (hình vuông cạnh 4 ô). | Chọn hình đúng khi có cả bẫy chữ nhật và bẫy điểm lệch một ô (cạnh 4–6 ô); Đ hay S. |
| MT2 | Hình tròn và độ dài | Bán kính 2–3 cm, cạnh hình vuông bao quanh; 3–4 lá súng liền. | Cho cạnh hình vuông, tìm bán kính; 5–7 lá liền, đường kính 1 dm. | Hai tờ giấy tròn cạnh nhau trong hình chữ nhật; lá súng đường kính 2 dm; chiều dài hơn chiều rộng bao nhiêu. |
| MT3 | Đếm hình, góc vuông | Đếm tam giác trong tứ giác có một đường chéo; chọn cặp bán kính vuông (bốn bán kính). | Đếm tam giác, tứ giác trong ngũ giác có hai đường chéo (SGK). | Hình sáu cạnh có ba đường chéo chung đỉnh; năm bán kính trong hình tròn; Đ hay S. |
| MT4 | Hình khối ghép | Một mặt khối lớn gồm mấy mặt khối nhỏ (4); khối 2 × 2 × 2 gồm 8 khối nhỏ. | Sơn 6 mặt khối lớn: 6 × 4 = 24 mặt nhỏ (SGK). | Chỉ sơn một số mặt; khối 3 × 3 × 3 (mỗi mặt 9 ô vuông). |

Tham số engine: `goal:10, soCau:18, soCauToiDa:24`. 4 mục tiêu × tối thiểu 3 câu = 12 ≤ 18.

## 2. Chín dạng (topics) — xếp theo mạch sư phạm

"Nguồn": **SGK** = có trong sách (mục ghi trong ngoặc) · **không có trong SGK** = dạng thêm.

| # | Dạng | Nguồn | MT | Mức 1 / Mức 2 / Mức 3 | Hình | Nhãn lỗi chính |
|---|---|---|---|---|---|---|
| D1 | Hình vuông và trung điểm | SGK (Tiết 1, LT1) | MT1 | M1: một hình vuông, điểm M trên cạnh; chọn "M là trung điểm của AB" Đ/S · M2: ba hình, hình nào vẽ đúng (1 hình chữ nhật, 1 hình vuông lệch điểm, 1 hình đúng) · M3: ba hình đều gần giống, chọn hình đúng | **hình mới** `luoiVuong` (lưới ô, hình, điểm) | `nham-hv-hcn`, `lech-trung-diem` |
| D2 | Trung điểm cách đỉnh mấy ô | **không có trong SGK** | MT1 | M1: cạnh 4 ô → trung điểm cách đỉnh mấy ô · M2: cạnh 6 ô; cách đỉnh còn lại · M3: cho trung điểm cách đỉnh 3 ô, cạnh dài mấy ô. Đáp bằng số | `luoiVuong` | `dem-sot-o`, `canh-dong` |
| D3 | Giấy tròn trong giấy vuông | SGK (Tiết 1, LT2) | MT2 | M1: bán kính 2–3 cm → cạnh hình vuông · M2: cạnh hình vuông 8–10 cm → bán kính · M3: hai tờ giấy tròn bán kính 3 cm cạnh nhau trong hình chữ nhật: chiều dài. Đáp bằng số | **hình mới** `trongVuong` (hình tròn nội tiếp, có vẽ bán kính và nhãn cm) | `nham-ban-kinh-duong-kinh`, `thieu-buoc` |
| D4 | Lá súng trên ao | SGK (Tiết 1, LT3) | MT2 | M1: 3–4 lá liền, đường kính 1 dm → chiều dài · M2: 5–7 lá (chiều dài), 3–5 lá (chiều rộng) · M3: đường kính 2 dm; hoặc chiều dài hơn chiều rộng mấy dm. Đáp bằng số | **hình mới** `aoLaSung` (ao hình chữ nhật, lá tròn xếp sát; mỗi lá `data-dem`) | `dem-sot-la`, `cong-thay-nhan` |
| D5 | Đếm tam giác và tứ giác | SGK (Tiết 2, LT1) | MT3 | M1: tứ giác ABCD có đường chéo AC: có mấy hình tam giác · M2: ngũ giác ABCDE có AC, AD: tam giác (3) hoặc tứ giác (2), hỏi riêng từng loại · M3: lục giác có AC, AD, AE: tam giác (4) hoặc tứ giác (3). Đáp bằng số | `hinhDaGiac` (chép từ `bai-19.js`) | `dem-sot-hinh`, `nham-tam-tu` |
| D6 | Hai bán kính vuông góc (ê ke) | SGK (Tiết 2, LT2) | MT3 | M1: bốn bán kính, chọn cặp tạo góc vuông (4 phương án) · M2: bốn bán kính, vị trí xoay ngẫu nhiên · M3: năm bán kính, cặp lệch gần 90 độ (≥ 12 độ) | **hình mới** `tronBanKinh` (tâm O, các bán kính có nhãn, ê ke) | `goc-gan-vuong`, `nham-dinh-canh` |
| D7 | Khối 2 × 2 × 2 sơn đỏ | SGK (Tiết 2, LT3) | MT4 | M1: một mặt khối lớn gồm mấy mặt khối nhỏ (đếm 4) · M2: sơn cả 6 mặt: 6 × 4 = 24 · M3: chỉ sơn 2–5 mặt, hoặc khối 3 × 3 × 3. Đáp bằng số | **hình mới** `khoiGhep` (khối lớn chia ô trên ba mặt thấy được) | `cong-thay-nhan`, `thieu-buoc`, `dem-sot-mat` |
| D8 | Ghép khối nhỏ | **không có trong SGK** | MT4 | M1: lớp dưới 4 khối, lớp trên 4 khối → 8 khối · M2: ba lớp 2 × 2 → 12 khối; hai lớp 3 × 3 → 18 · M3: khối 3 × 3 × 3 gồm bao nhiêu khối nhỏ (27). Đáp bằng số | `khoiGhep` | `thieu-buoc`, `cong-thay-nhan` |
| D9 | Đúng / Sai tìm lỗi | **không có trong SGK** | MT1, MT2, MT3 | M1: "Hình vuông có bốn cạnh bằng nhau." · M2: "Bán kính dài gấp đôi đường kính." · M3: "Bạn Mai nói: «…». Em thấy thế nào?" với "Đồng ý, vì…" / "Không đồng ý, vì…" | `luoiVuong`, `trongVuong`, `anh('girl')` | `nham-hv-hcn`, `nham-ban-kinh-duong-kinh` |

Dạng không có trong SGK: **Trung điểm cách đỉnh mấy ô (D2)**, **Ghép khối nhỏ (D8)**, **Đúng / Sai tìm lỗi (D9)** (3 dạng). Sáu dạng còn lại bám các mục của sách.

Phân bố: MT1 ba dạng (D1, D2, D9) · MT2 ba dạng (D3, D4, D9) · MT3 ba dạng (D5, D6, D9) · MT4 hai dạng (D7, D8). Mỗi mục tiêu ≥ 2 dạng.

### Luật lời câu hỏi (áp dụng cho cả bài)

- Nút **Đúng / Sai** chỉ đi với **mệnh đề**; câu "… có … không?" dùng nút **Có / Không**.
- Dạng "Bạn Mai nói …" dùng "Em thấy thế nào?" với "Đồng ý, vì…" / "Không đồng ý, vì…".
- Đáp án nhiễu **không chứa chính đối tượng đang hỏi** (hỏi "hình nào" thì phương án không viết sẵn tên hình).
- Nhãn độ dài (cm, dm) nằm giữa **đúng đoạn** nó đo, mỗi đoạn một nhãn; nhãn bán kính chỉ khi đã vẽ đoạn bán kính. Nhãn ở rìa khung chừa lề ≥ 1,3 lần cỡ chữ.
- Điểm không nằm trên đường thẳng phải cách điểm nằm trên đường thẳng ≥ 1,5 cm theo phương ngang; điểm kề nhau cách ≥ 2 cm.
- Không viết "góc nhọn", "góc tù", không nói "hình vuông cũng là hình chữ nhật" (lớp 3). Hình chữ nhật dài ở D1 là **bẫy** vì các cạnh kề không bằng nhau.

## 3. Hình mới cần vẽ (viết ngay trong `bai-22.js`, KHÔNG sửa `figures.js`)

Theo quy chuẩn `sk-ve-hinh-tieuhoc`: bảng màu `HM`, `svgHinh`, `nhanTron` / `nhanVien`; mỗi hình là MỘT SVG co theo màn hình; chữ ≥ 14px ở khổ điện thoại; nét và chữ dùng `currentColor`; nét thẳng có `fill="none"`; không emoji hệ thống.

| Hàm | Mô tả | Tham số | Kiểm do mã |
|---|---|---|---|
| `luoiVuong(hinhs)` | Lưới ô nền, một hoặc ba hình (mỗi hình đặt trong khung nhỏ có nhãn 1, 2, 3 hoặc không nhãn); mỗi hình là hình vuông hoặc hình chữ nhật cạnh theo ô, cùng bốn điểm đánh dấu trên bốn cạnh. | mảng {x, y, rong, cao, diem:[…]} | `check()` tính hình vuông (hai cạnh kề bằng nhau theo ô) và từng điểm có là trung điểm (khoảng cách tới hai đỉnh bằng nhau); đúng một hình đạt cả hai điều kiện. |
| `trongVuong(r, soTo)` | Hình vuông chứa hình tròn chạm bốn cạnh (hoặc hai hình tròn trong chữ nhật); có vẽ bán kính và đoạn cạnh. | r, soTo | cạnh = 2r (hoặc 4r) tính từ r; nhãn cm khớp. |
| `aoLaSung(dai, rong, d)` | Ao hình chữ nhật, lá súng hình tròn xếp sát dọc chiều dài và chiều rộng; mỗi lá có `data-dem`; lá khác màu nhẹ cho dễ đếm. | dai, rong (số lá), d (dm) | `check()` đếm lá trên hai cạnh bằng `data-dem`; lá không đè nhau. |
| `tronBanKinh(goc)` | Hình tròn tâm O, các bán kính OA, OB, … nhãn chữ ngoài đầu mút; ê ke nhỏ vẽ cạnh hình; lệch ≥ 12 độ so với 90 độ ở mọi cặp trừ một cặp. | mảng góc (độ) | `check()` tính từng cặp bằng tích vô hướng; đúng một cặp vuông. |
| `khoiGhep(n, sơn)` | Khối lập phương n × n × n theo phép chiếu xiên, mỗi mặt thấy được chia n × n ô; tuỳ chọn tô đỏ vài mặt lớn. | n, danh sách mặt sơn | `check()` tính số ô nhỏ = n × n × số mặt sơn; mỗi ô thấy được có `data-dem`. |
| `hinhDaGiac` (chép từ `bai-19.js`) | Đa giác lồi có đường chéo, nhãn chữ A, B, C … | — | liệt kê tam giác, tứ giác từ các đoạn đã vẽ. |

Hình dùng lại từ `figures.js`: `anh('girl')`, `nhanTron`, `nhanVien`, `svgHinh`, `HM`.

## 4. Nhãn lỗi

- Chuẩn của engine dùng được: `canh-dong`, `thieu-buoc`, `cong-thay-nhan`.
- **Nhãn riêng của bài 22** (khai báo qua `BAI.loi`):

| Nhãn | Tên hiển thị | Ví dụ lỗi | Gợi ý |
|---|---|---|---|
| `nham-hv-hcn` | Nhầm hình vuông với hình chữ nhật | Chọn hình chữ nhật dài vì "có bốn điểm giữa cạnh" | "Hình vuông có bốn cạnh bằng nhau. Bé đếm số ô mỗi cạnh." |
| `lech-trung-diem` | Điểm lệch khỏi trung điểm | Chọn hình có điểm lệch một ô | "Trung điểm cách đều hai đầu cạnh. Bé đếm số ô về hai phía." |
| `dem-sot-o` | Đếm sót ô trên lưới | Đếm số vạch thay vì số ô | "Đếm số ô giữa hai điểm, không đếm vạch." |
| `nham-ban-kinh-duong-kinh` | Nhầm bán kính với đường kính | Lấy cạnh hình vuông bằng bán kính | "Cạnh hình vuông bằng đường kính; đường kính gấp đôi bán kính." |
| `dem-sot-la` | Đếm sót hoặc thừa lá | Đếm lá ở góc ao hai lần | "Lá ở góc chỉ đếm một lần; đếm theo từng cạnh rồi so với hình." |
| `dem-sot-hinh` | Đếm sót hình | Bỏ sót hình tứ giác ghép từ hai tam giác | "Liệt kê theo tên đỉnh (ABC, ACD, …), mỗi hình đếm một lần." |
| `nham-tam-tu` | Nhầm tam giác với tứ giác | Gọi hình bốn đỉnh là tam giác | "Tam giác có ba đỉnh, tứ giác có bốn đỉnh." |
| `goc-gan-vuong` | Nhầm góc gần vuông | Chọn cặp lệch ít so với góc vuông | "Đặt ê ke vào góc, mép ê ke trùng hai cạnh mới là góc vuông." |
| `dem-sot-mat` | Đếm sót mặt khối nhỏ | Chỉ đếm 3 mặt nhìn thấy | "Khối có 6 mặt, đếm cả mặt sau, mặt dưới, mặt bên bị che." |

Ghi chú: `nham-tam-tu`, `dem-sot-hinh`, `goc-gan-vuong` đã dùng ở bài 18–19, bài 22 khai báo lại cho riêng mình. Nếu thầy muốn gọn hơn, có thể gom `dem-sot-o` và `dem-sot-la` vào `lech-nhom` (xem câu 6).

## 5. Rủi ro đã biết

1. **Bẫy trung điểm phải công bằng:** hình sai chỉ sai **một** điều kiện (hoặc không vuông, hoặc điểm lệch), và `check()` xác nhận đúng một hình thoả cả hai. Hình sai không được lệch quá nhỏ đến mức không phân biệt được ở 375px: lệch đúng một ô lưới (≥ 20 đơn vị).
2. **Ê ke trên web:** hình ê ke chỉ minh hoạ; câu hỏi dựa vào số đo góc do mã sinh (đúng 90 độ), không dựa vào mắt thường. Các cặp khác lệch ≥ 12 độ.
3. **Lá súng chồng nhau:** `data-dem` không đè nhau (đường kính lá nhỏ hơn bước xếp 1–2 đơn vị, hoặc vẽ vòng tròn viền nhẹ). Ao có đủ chỗ cho nhãn "… dm" hai bên.
4. **Chữ trong hình bán kính:** nhãn A, B, C … ngoài hình tròn cách đường tròn ≥ 14 đơn vị; không dùng chữ "I", "O" gây nhầm với số 1, 0 trừ O là tâm (chữ O in hoa kiểu serif).
5. **Hình đa giác có hai đường chéo:** đỉnh sinh tự động, lồi, không có điểm nằm giữa cạnh; đường chéo chung đỉnh không cắt nhau, `check()` kiểm tra bằng đếm giao điểm bên trong.
6. **Khối 2 × 2 × 2:** mặt thấy được chỉ có 3 trong 6; câu hỏi luôn nói rõ "tất cả các mặt của khối lớn" để học sinh không chỉ đếm 3 mặt; `check()` tính theo công thức n × n × số mặt sơn, không đếm ô trong hình.
7. **Không nhãn sát biên:** font Linux hẹp hơn Segoe UI; thầy soát lại hình trên máy thầy (ghi trong PR).
8. `index.html` dùng CRLF: sửa bằng Python đọc/ghi nhị phân (không `sed -i`), diff đúng 1 dòng.
9. `kiem_dem.mjs` báo sai vì `figures.js` trên `main` chưa có `data-dem` (đã biết, không sửa); các `data-dem` của bài 22 do `check()` đếm lại.

## 6. Việc sẽ làm sau khi thầy duyệt

1. Viết `bai-22.js` theo bảng trên (nối chuỗi, **không** backtick hay template literal), chép `bai-22.html`, sửa `index.html` (một dòng).
2. Chạy RIÊNG từng cổng (đặt `CHROME` nếu cần):
   - `node .claude/skills/sk-web-toan-tieuhoc/assets/kiemtra.js . bai-22.js 400000`
   - `node .claude/skills/sk-ve-hinh-tieuhoc/assets/phong_tranh.mjs . <thư mục tạm> bai-22 --soat --khong-chup --rong 375,1200 --giao light,dark --lan 3` → 0 lỗi
   - `node .claude/skills/sk-web-toan-tieuhoc/assets/soat_giao_dien.mjs . bai-22 --cau 2`
3. Tự soi ảnh phòng tranh (lưới trung điểm, giấy tròn, ao lá súng, hình đa giác, ê ke, khối ghép), push, ghi kết quả từng cổng trong mô tả PR, đổi tiêu đề thành "[XONG] Bài 22", gỡ trạng thái nháp. Không tự gộp.

## 7. Cần thầy quyết (kèm phương án đề xuất)

1. **Mục SGK ở mục 0 và bảng dạng** có đúng không? Đề xuất: đúng như bảng.
2. **Ê ke trên web:** vẽ một ê ke nhỏ cạnh hình tròn, câu hỏi chọn cặp bán kính vuông góc (đúng một cặp, các cặp khác lệch ≥ 12 độ): đồng ý (**đề xuất**).
3. **D1 hình vuông và trung điểm:** hình sai là hình chữ nhật dài hoặc điểm lệch một ô; cạnh chỉ 2, 4, 6 ô để trung điểm rơi đúng điểm lưới: đồng ý (**đề xuất**).
4. **Mức 3 của D7:** thêm khối 3 × 3 × 3 (mỗi mặt 9 ô, 6 × 9 = 54) và sơn một số mặt, dù SGK chỉ có 2 × 2 × 2: đồng ý (**đề xuất**) hay giữ đúng 2 × 2 × 2?
5. **Ba dạng "không có trong SGK"** (D2, D8, D9): giữ cả ba (**đề xuất**) hay bớt?
6. **Chín nhãn riêng** nhiều hơn các bài trước: giữ (**đề xuất**) hay gom bớt (`dem-sot-o`, `dem-sot-la`, `dem-sot-mat` về `lech-nhom`)?
7. **Bốn mục tiêu, chín dạng**; xếp lại thứ tự dạng theo sư phạm như bài 9–21 (**đề xuất**).
