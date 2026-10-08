# Phân tích sư phạm — Bài 23: Nhân số có hai chữ số với số có một chữ số (BÀI MỚI — BẢN NHÁP CHỜ DUYỆT)

Mẫu: `bai-12.js` (bài tính toán, có `muctieu`, nhãn lỗi riêng) + khối "LUYỆN THÔNG MINH" ở đầu `engine.js`.
Phạm vi: tạo mới `bai-23.js`, `bai-23.html` (chép từ `assets/bai-template.html`), thêm 23 vào `AVAILABLE` trong `index.html` (giữ CRLF, diff đúng 1 dòng)
và file phân tích này. Không đụng `engine.js`, `figures.js`, `lua.js`. Bài mới **không** thêm vào `chua_chuan.txt`: `phong_tranh --soat` phải 0 lỗi. Chưa viết dòng mã nào.

Bài 23 là bài đầu của **Chủ đề 4: Phép nhân, phép chia trong phạm vi 100**. Dùng **4 mục tiêu** × 11 dạng.

## 0. Nguồn và điều cần lưu ý

- Cấu trúc mục SGK (trang in 67–69) lấy từ **bản tóm tắt của phiên Claude trên máy thầy**; phiên đám mây chưa tự đối chiếu sách. Không chép nguyên văn đề vào repo; chỉ ghi dạng bài và ý.
  - **Khám phá 1 (không nhớ):** mỗi hộp 12 bút màu, 3 hộp: 12 × 3 = 12 + 12 + 12 = 36; đặt tính dọc, nhân từng chữ số (hàng đơn vị rồi hàng chục).
    **Hoạt động 1:** đặt tính rồi tính (phép nhân hai chữ số, không nhớ). **Hoạt động 2:** tính nhẩm số tròn chục theo mẫu "2 chục × 3 = 6 chục = 60". **Hoạt động 3:** 3 bình, mỗi bình 21 viên sỏi: tất cả 63 viên.
  - **Khám phá 2 (có nhớ):** mỗi chùm 26 quả nho, 3 chùm: 26 × 3 = 78; hàng đơn vị 3 × 6 = 18 viết 8 nhớ 1; hàng chục 3 × 2 = 6, thêm 1 bằng 7. **Hoạt động:** bốn phép nhân có nhớ.
  - **Luyện tập 1:** ghép phép tính với chữ để đọc tên một di tích (bảng tám phép tính tương ứng tám chữ; các ô kết quả điền chữ). Trên web đổi thành "kết quả này ứng với phép tính nào / chữ nào" (chọn một); **không chép nguyên trò chơi**.
    **Luyện tập 2:** đổi chỗ hai thẻ số để phép tính đúng (ví dụ phép tính dùng các thẻ 4, 1, 2, 8, 4; đổi chỗ hai thẻ thì đúng).
- **Chú ý sư phạm:** tách rõ nhân **không nhớ** và **có nhớ**. Lỗi hay gặp: quên cộng số nhớ; nhớ nhầm; nhân chữ số hàng chục không thêm số nhớ; viết cả hai chữ số của tích ở hàng đơn vị (18 viết 18); nhầm hàng khi nhẩm số tròn chục (2 chục × 3 viết 6 thay vì 60).
- **Mọi tích < 100** (kể cả mức 3), theo phạm vi của chủ đề; tích lớn nhất là 99.
- **Đặt tính dọc là hình** (SVG căn phải, canh đúng hàng): số nhớ nhỏ viết phía trên chữ số hàng chục (cỡ chữ ≥ 14px); ô cần tìm hiện ô "?". Đáp án luôn tính lại từ số, không tin chữ số vẽ ra.
- **Không số thập phân.** Phép nhân số tròn chục đọc "chục" (2 chục × 3 = 6 chục = 60).
- **Hình mới viết trong `bai-23.js`**, không sửa `figures.js`.

## 1. Bốn mục tiêu (muctieu) × ba mức (Thông tư 27)

| MT | Tên | Mức 1 — Nhận biết | Mức 2 — Hiểu | Mức 3 — Vận dụng |
|---|---|---|---|---|
| MT1 | Nhân không nhớ | 12 × 3 = 12 + 12 + 12; đặt tính 11 × 7, 13 × 3. | Đặt tính 34 × 2, 42 × 2; nhẩm số tròn chục 20 × 4, 30 × 3. | Nhẩm 31 × 3 trực tiếp; tìm thừa số chưa biết (? × 3 = 90); nhân nhẩm có gợi ý "chục". |
| MT2 | Nhân có nhớ | Nhớ ở hàng đơn vị, hàng chục không vượt 9 (26 × 3). | 37 × 2, 16 × 4, 29 × 3, 18 × 5 (như SGK). | Tích sát 100 (19 × 5 = 95, 24 × 4 = 96, 48 × 2 = 96); phân biệt có nhớ hay không. |
| MT3 | Tìm lỗi và sửa | Phép tính bạn An có đúng không (một lỗi rõ). | Nhận ra lỗi: quên nhớ, viết cả hai chữ số. | Điền chữ số còn thiếu; đổi chỗ hai thẻ số để phép tính đúng. |
| MT4 | Vận dụng | Bài toán một phép nhân không nhớ (3 bình, mỗi bình 21 viên). | Bài toán một phép nhân có nhớ; ghép kết quả với phép tính. | Bài toán hai bước (nhân rồi cộng hoặc trừ); ghép chữ. |

Tham số engine: `goal:10, soCau:18, soCauToiDa:24`. 4 mục tiêu × tối thiểu 3 câu = 12 ≤ 18.

## 2. Mười một dạng (topics) — xếp theo mạch sư phạm

"Nguồn": **SGK** = có trong sách (mục ghi trong ngoặc) · **không có trong SGK** = dạng thêm.

| # | Dạng | Nguồn | MT | Mức 1 / Mức 2 / Mức 3 | Hình | Nhãn lỗi chính |
|---|---|---|---|---|---|---|
| D1 | Cộng các số bằng nhau | SGK (Khám phá 1) | MT1 | M1: 12 + 12 → 12 × 2 · M2: 13 + 13 + 13 → phép nhân và kết quả · M3: Đ hay S "13 × 3 = 13 + 13 + 13" (Đ/S chỉ cho mệnh đề) | `hopBut` (hộp bút) hoặc chữ | `lech-nhom`, `cong-thay-nhan` |
| D2 | Đặt tính, nhân không nhớ | SGK (Khám phá 1, HĐ1) | MT1 | M1: a × b với a từ 11 đến 23, b 2–3, hỏi chữ số hàng đơn vị của tích · M2: 34 × 2, 43 × 2, 11 × 7: hỏi tích · M3: nhẩm trực tiếp 32 × 3 hoặc hỏi chữ số hàng chục. Đáp bằng số | **hình mới** `phepTinhDoc` | `nham-bang`, `dao-vai`, `sai-buoc` |
| D3 | Nhân nhẩm số tròn chục | SGK (HĐ2) | MT1 | M1: 10 × 8 (1 chục × 8 = 8 chục) · M2: 20 × 4, 30 × 3, 40 × 2 · M3: ? × 3 = 90; hoặc 60 = ? chục. Đáp bằng số | chữ (mẫu "2 chục × 3 = 6 chục = 60") | `nham-hang`, `nham-bang` |
| D4 | Nhân có nhớ: chùm nho | SGK (Khám phá 2) | MT2 | M1: mỗi chùm 26 quả, 3 chùm (nhớ 1, hàng chục không vượt 9) · M2: 37 × 2, 16 × 4 · M3: tích sát 100 (24 × 4, 48 × 2). Đáp bằng số | `phepTinhDoc` hiện số nhớ | `quen-nho`, `viet-ca-hai-chu-so`, `nho-nham` |
| D5 | Đặt tính, nhân có nhớ | SGK (Khám phá 2, HĐ) | MT2 | M1: chữ số viết ở hàng đơn vị của tích (số nhớ chưa hiện) · M2: chữ số viết ở hàng chục (đã có số nhớ) · M3: cả tích 29 × 3, 18 × 5, 19 × 5. Đáp bằng số | `phepTinhDoc` | `quen-nho`, `viet-ca-hai-chu-so`, `nho-nham` |
| D6 | Có nhớ hay không nhớ | **không có trong SGK** | MT2 | M1: phép nào có nhớ trong ba phép (chọn một) · M2: nhận ra phép nhân có nhớ ở hàng chục · M3: hai phép cùng tích gần nhau, một có nhớ | chữ | `quen-nho`, `nham-bang` |
| D7 | Bạn An làm có đúng? | **không có trong SGK** | MT3 | M1: "Bạn An nói: …". Em thấy thế nào? (một lỗi rõ) · M2: bạn sai ở bước nào (quên nhớ / viết cả hai chữ số / nhớ nhầm) · M3: kết quả đúng là bao nhiêu | `phepTinhDoc` (phép bạn An, có lỗi), `anh('boy')` | `quen-nho`, `viet-ca-hai-chu-so`, `nho-nham` |
| D8 | Điền chữ số còn thiếu | **không có trong SGK** | MT3 | M1: ô "?" ở tích, phép không nhớ · M2: ô "?" ở tích, phép có nhớ · M3: ô "?" ở thừa số (nghiệm duy nhất). Đáp bằng số | `phepTinhDoc` có ô "?" | `sai-buoc`, `thieu-buoc` |
| D9 | Đổi chỗ hai thẻ số | SGK (Luyện tập 2) | MT3 | M1: phép tính sai, đổi chỗ hai thẻ liền nhau · M2: đổi chỗ hai thẻ bất kỳ · M3: tích có nhớ. Chọn đúng một cặp thẻ trong bốn | **hình mới** `theSo` | `dao-vai`, `sai-buoc` |
| D10 | Giải toán bằng phép nhân | SGK (HĐ3, Khám phá) | MT4 | M1: 3 bình, mỗi bình 21 viên (không nhớ) · M2: 4 hộp, mỗi hộp 18 viên (có nhớ) · M3: hai bước: nhân rồi cộng hoặc trừ. Đáp bằng số | hình vật (bình, hộp, chùm) hoặc chữ | `cong-thay-nhan`, `thieu-buoc`, `chon-sai-phep` |
| D11 | Phép tính ứng với kết quả | SGK (Luyện tập 1) | MT4 | M1: kết quả 84 ứng với phép tính nào (chọn một trong bốn) · M2: kết quả 52 ứng với chữ nào theo bảng · M3: các kết quả 88, 84, 95, 90 đọc được từ nào (CHÙA) | **hình mới** `bangChu` (bảng phép tính – chữ) | `nham-bang`, `quen-nho` |

Dạng không có trong SGK: **Có nhớ hay không nhớ (D6)**, **Bạn An làm có đúng? (D7)**, **Điền chữ số còn thiếu (D8)** (3 dạng). Tám dạng còn lại bám các mục của sách.

Phân bố: MT1 ba dạng (D1, D2, D3) · MT2 ba dạng (D4, D5, D6) · MT3 ba dạng (D7, D8, D9) · MT4 hai dạng (D10, D11). Mỗi mục tiêu ≥ 2 dạng.

### Luật lời câu hỏi (áp dụng cho cả bài)

- Nút **Đúng / Sai** chỉ đi với **mệnh đề**; câu "… có … không?" dùng nút **Có / Không**.
- Dạng "Bạn An nói …" dùng "Em thấy thế nào?" với "Đồng ý, vì…" / "Không đồng ý, vì…".
- Đáp án nhiễu **không chứa chính kết quả đang hỏi** (hỏi "phép tính nào cho kết quả 84" thì phương án không viết sẵn "= 84").
- Nhãn lỗi **không gắn vào đáp án đúng**. Lỗi gắn vào đáp án nhiễu tính ra từ lỗi thật: quên số nhớ (26 × 3 = 68), viết cả hai chữ số (18 viết 18), nhớ nhầm (cộng 2 thay vì 1), nhầm hàng (20 × 3 = 6).
- Mọi số trong đề và đáp án là số nguyên; tích < 100.

## 3. Hình mới cần vẽ (viết ngay trong `bai-23.js`, KHÔNG sửa `figures.js`)

Theo quy chuẩn `sk-ve-hinh-tieuhoc`: bảng màu `HM`, `svgHinh`; mỗi hình là MỘT SVG co theo màn hình; chữ ≥ 14px ở khổ điện thoại; nét và chữ dùng `currentColor`; nét thẳng có `fill="none"`; không emoji hệ thống.

| Hàm | Mô tả | Tham số | Kiểm do mã |
|---|---|---|---|
| `phepTinhDoc(a, b, tuy)` | Phép nhân đặt dọc căn phải: hàng trên a (hai chữ số), hàng dưới "× b", gạch ngang, tích; số nhớ nhỏ phía trên chữ số hàng chục; tuỳ chọn: ẩn một chữ số thành ô "?", hiện sẵn kết quả của bạn (có thể sai). | a, b, tuỳ {nho: bool, an: 'tich-dv'|'tich-chuc'|'thua-so', bieuDien: kết quả của bạn} | `check()` tính lại a × b, chữ số hàng đơn vị, hàng chục, số nhớ từ a, b; không tin chữ số trong chuỗi. Ô "?" nghiệm duy nhất (D8 liệt kê). |
| `theSo(cacThe)` | Dãy thẻ số (ô vuông bo góc) xếp thành phép nhân `[a][b] × [c] = [d][e]`; các thẻ đánh số 1…5 để chọn cặp đổi chỗ. | 5 chữ số | `check()` thử cả 10 cách đổi chỗ, đúng **một** cách thoả; bốn phương án trong câu hỏi chứa cách đúng đó. |
| `bangChu(dsPhep)` | Bảng hai cột: phép tính và chữ cái ứng với phép tính (tám dòng gọn, có thể hai nửa bảng cạnh nhau). | mảng {phep, chu} | `check()` tính lại từng kết quả; kết quả các dòng khác nhau (không trùng); từ ghép từ các chữ có trong bảng. |

Hình dùng lại từ `figures.js`: `hopBut`, `anh('boy')`, `svgHinh`, `HM`, `nhanVien`, `tinhBT`, `oHoi`.

## 4. Nhãn lỗi

- Chuẩn của engine dùng được: `nham-bang`, `dao-vai`, `sai-buoc`, `cong-thay-nhan`, `thieu-buoc`, `chon-sai-phep`, `lech-nhom`.
- **Nhãn riêng của bài 23** (khai báo qua `BAI.loi`):

| Nhãn | Tên hiển thị | Ví dụ lỗi | Gợi ý |
|---|---|---|---|
| `quen-nho` | Quên cộng số nhớ | 26 × 3 = 68 (quên cộng 1 ở hàng chục) | "Nhân hàng chục xong phải cộng thêm số nhớ." |
| `viet-ca-hai-chu-so` | Viết cả hai chữ số của tích riêng | 18 viết cả 18 ở hàng đơn vị | "Hàng đơn vị chỉ viết một chữ số, chữ số còn lại là số nhớ." |
| `nho-nham` | Nhớ nhầm số | 3 × 6 = 18 mà nhớ 8 (hoặc nhớ 2) | "18 gồm 1 chục và 8 đơn vị: viết 8, nhớ 1." |
| `nham-hang` | Nhầm hàng khi nhẩm số tròn chục | 20 × 3 = 6 hoặc 600 | "2 chục × 3 = 6 chục, 6 chục là 60." |

## 5. Rủi ro đã biết

1. **Căn hàng trong hình đặt tính:** chữ số các hàng phải thẳng cột (cùng toạ độ x cho cùng hàng), số nhớ nằm đúng phía trên hàng chục. Soát hình sáng và tối ở 375px; chữ ≥ 14px kể cả số nhớ.
2. **Ô "?" nghiệm duy nhất (D8):** `check()` thử mọi chữ số 0–9 cho ô "?" và đòi đúng một nghiệm; chữ số hàng chục của thừa số không được là 0.
3. **Đổi chỗ hai thẻ số (D9):** phải đúng một cặp đổi chỗ cho phép tính đúng trong **cả 10** cách; không để hai cách cho cùng kết quả (ví dụ hai thẻ cùng chữ số). `check()` sinh lại phép tính từ thẻ.
4. **Bảng chữ (D11):** không chép nguyên bảng của sách. Dùng tám phép tính khác (hoặc đổi thừa số) cho cùng tám chữ, chỉ giữ ý "kết quả → chữ". Từ cần đọc ghép từ chữ trong bảng, mỗi kết quả khác nhau.
5. **Tích < 100 mọi mức:** `make` không sinh tích ≥ 100; `check()` chặn.
6. **Đáp án nhiễu có lỗi thật:** mỗi lỗi gắn nhãn dựa trên cách tính sai cụ thể, không gắn bừa; `kiemtra.js` đòi mỗi nhãn đúng quy tắc.
7. **Không nhãn sát biên:** font Linux hẹp hơn Segoe UI; thầy soát lại hình trên máy thầy (ghi trong PR).
8. `index.html` dùng CRLF: sửa bằng Python đọc/ghi nhị phân (không `sed -i`), diff đúng 1 dòng.
9. `kiem_dem.mjs` báo sai vì `figures.js` trên `main` chưa có `data-dem` (đã biết, không sửa).

## 6. Việc sẽ làm sau khi thầy duyệt

1. Viết `bai-23.js` theo bảng trên (nối chuỗi, **không** backtick hay template literal), chép `bai-23.html`, sửa `index.html` (một dòng).
2. Chạy RIÊNG từng cổng (đặt `CHROME` nếu cần):
   - `node .claude/skills/sk-web-toan-tieuhoc/assets/kiemtra.js . bai-23.js 400000`
   - `node .claude/skills/sk-ve-hinh-tieuhoc/assets/phong_tranh.mjs . <thư mục tạm> bai-23 --soat --khong-chup --rong 375,1200 --giao light,dark --lan 3` → 0 lỗi
   - `node .claude/skills/sk-web-toan-tieuhoc/assets/soat_giao_dien.mjs . bai-23 --cau 2`
3. Tự soi ảnh phòng tranh (đặt tính dọc, thẻ số, bảng chữ), push, ghi kết quả từng cổng trong mô tả PR, đổi tiêu đề thành "[XONG] Bài 23", gỡ trạng thái nháp. Không tự gộp.

## 7. Cần thầy quyết (kèm phương án đề xuất)

1. **Mục SGK ở mục 0 và bảng dạng** có đúng không? Đề xuất: đúng như bảng.
2. **Số nhớ viết ở đâu?** Đề xuất: chữ số nhỏ phía trên chữ số hàng chục của thừa số thứ nhất. Nếu sách ghi khác (ví dụ viết nhỏ bên cạnh), thầy chỉnh.
3. **D11 (Chùa Một Cột):** giữ ý "kết quả → chữ" nhưng dùng tám phép tính khác, từ đọc ra là CHÙA / MỘT / CỘT: đồng ý (**đề xuất**) hay bỏ dạng này?
4. **D9 (đổi chỗ hai thẻ số):** chọn trong bốn cặp thẻ, đúng một cặp: đồng ý (**đề xuất**).
5. **Ba dạng "không có trong SGK"** (D6, D7, D8): giữ cả ba (**đề xuất**) hay bớt?
6. **Bốn nhãn riêng** (`quen-nho`, `viet-ca-hai-chu-so`, `nho-nham`, `nham-hang`): giữ (**đề xuất**) hay gom `nho-nham` về `sai-buoc`?
7. **Bốn mục tiêu, mười một dạng**; xếp lại thứ tự dạng theo sư phạm như bài 9–22 (**đề xuất**).
