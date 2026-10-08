# Phân tích sư phạm — Bài 24: Gấp một số lên một số lần (BÀI MỚI — BẢN NHÁP CHỜ DUYỆT)

Mẫu: `bai-23.js` (bài tính toán Chủ đề 4, nhãn lỗi riêng, hình riêng trong file) + khối "LUYỆN THÔNG MINH" ở đầu `engine.js`.
Phạm vi: tạo mới `bai-24.js`, `bai-24.html` (chép từ `assets/bai-template.html`), thêm 24 vào `AVAILABLE` trong `index.html` (giữ CRLF, diff đúng 1 dòng)
và file phân tích này. Không đụng `engine.js`, `figures.js`, `lua.js`. Bài mới **không** thêm vào `chua_chuan.txt`: `phong_tranh --soat` phải 0 lỗi. Chưa viết dòng mã nào.

Bài 24 là bài thứ hai của **Chủ đề 4: Phép nhân, phép chia trong phạm vi 100**. Dùng **4 mục tiêu** × 10 dạng.

## 0. Nguồn và điều cần lưu ý

- Cấu trúc mục SGK (trang in 70–71) lấy từ **bản tóm tắt của phiên Claude trên máy thầy**; phiên đám mây chưa tự đối chiếu sách. Không chép nguyên văn đề vào repo; chỉ ghi dạng bài và ý.
  - **Khám phá:** Việt có 6 quả táo, số táo của Mai gấp 4 lần số táo của Việt: Mai có 6 × 4 = 24 quả. Có sơ đồ đoạn thẳng "Tóm tắt" (đoạn Việt = 1 phần, đoạn Mai = 4 phần bằng nhau). Quy tắc: muốn gấp một số lên một số lần, lấy số đó nhân với số lần.
  - **Hoạt động 1:** bảng 5 cột (số đã cho 4, 7, 11, 8, 9), hàng "thêm vào số đã cho 8 đơn vị" (phép cộng) và hàng "gấp 8 lần số đã cho" (phép nhân): điền các ô. **Bẫy:** nhầm "thêm 8 đơn vị" với "gấp 8 lần".
    **Hoạt động 2:** đường ống nối: từ một số đi qua một cửa (thêm 5 đơn vị, gấp 4 lần, gấp 5 lần, thêm 8 đơn vị) tới ô kết quả; có ô đã cho (50, gấp 5 lần, tìm số đầu).
    **Hoạt động 3:** năm nay con 9 tuổi, tuổi bố gấp 4 lần tuổi con: bố bao nhiêu tuổi (36).
  - **Luyện tập 1:** Số? hai mũi tên cùng xuất phát từ một số: gấp 4 lần và thêm 4 đơn vị (3 → ?), gấp 5 lần và thêm 5 đơn vị (6 → ?).
    **Luyện tập 2:** Đúng / Sai: kiến mang số 7, tổ có 63, "gấp 9 lần" Đ, "thêm 9 đơn vị" S; các cặp (8 → 13, 16 → 32, 24 → 72) hỏi "thêm … đơn vị" hay "gấp … lần".
    **Luyện tập 3:** 9 cái bàn, mỗi bàn 2 cái ghế: cần bao nhiêu ghế (18).
    **Luyện tập 4:** mê cung tìm đường qua các phép tính có kết quả 45: trên web đổi thành "phép tính nào có kết quả bằng 45" (chọn một) và "có bao nhiêu phép tính có kết quả bằng 45" (đếm); **không dựng mê cung**.
- **Lỗi lớn nhất:** nhầm "gấp n lần" (phép nhân) với "thêm n đơn vị" (phép cộng); nhầm **số lần** với **số đơn vị**; viết "gấp" khi hai số cách nhau một hiệu.
- **Sơ đồ đoạn thẳng "Tóm tắt" vẽ bằng SVG:** đoạn ngắn là 1 phần, đoạn dài n phần bằng nhau (có vạch chia), nhãn "? quả" kẹp bằng ngoặc dưới đoạn dài. Số phần do mã sinh từ số lần; mỗi phần của đoạn dài mang `data-dem="phan"`; `check()` đếm lại số phần = số lần.
- **Mọi kết quả < 100.** Số lần từ 2 đến 9. Không số thập phân.
- **Không dựng lại mê cung** của Luyện tập 4; chuyển thành câu chọn và câu đếm.
- Hình mới viết trong `bai-24.js`; dùng lại `soDo`, `bangCot`, `anh`, `oHoi` của `figures.js`.

## 1. Bốn mục tiêu (muctieu) × ba mức (Thông tư 27)

| MT | Tên | Mức 1 — Nhận biết | Mức 2 — Hiểu | Mức 3 — Vận dụng |
|---|---|---|---|---|
| MT1 | Gấp một số lên một số lần | Sơ đồ đoạn thẳng: đoạn dài gồm mấy phần bằng nhau; 6 gấp 3 lần. | Tính "gấp lên n lần" bằng phép nhân (6 × 4); chọn phép tính đúng. | Số lớn hơn (9 gấp 5 lần); hơn kém: Mai nhiều hơn Việt bao nhiêu quả. |
| MT2 | Gấp hay thêm đơn vị | Bảng: thêm n đơn vị hoặc gấp n lần (số nhỏ, hai hàng). | Đường ống một cửa; hai mũi tên Số? (gấp 4 lần / thêm 4 đơn vị). | Biết kết quả, tìm số đầu (? gấp 5 lần = 50); đường ống hai bước. |
| MT3 | Gấp mấy lần, thêm mấy đơn vị | Đúng / Sai: 7 → 63 gấp 9 lần. | Từ hai số, nói đúng "thêm … đơn vị" hay "gấp … lần". | Bạn nói đúng hay sai ("Em thấy thế nào?"); hai số có cả hai quan hệ. |
| MT4 | Giải toán và vận dụng | Tuổi bố gấp 4 lần tuổi con (số nhỏ); 9 bàn × 2 ghế. | Bài toán có chọn phép nhân hay phép cộng; phép tính có kết quả 45 (chọn một). | Đếm các phép tính có kết quả 45; bài toán hai bước (gấp rồi thêm). |

Tham số engine: `goal:10, soCau:18, soCauToiDa:24`. 4 mục tiêu × tối thiểu 3 câu = 12 ≤ 18.

## 2. Mười dạng (topics) — xếp theo mạch sư phạm

"Nguồn": **SGK** = có trong sách (mục ghi trong ngoặc) · **không có trong SGK** = dạng thêm.

| # | Dạng | Nguồn | MT | Mức 1 / Mức 2 / Mức 3 | Hình | Nhãn lỗi chính |
|---|---|---|---|---|---|---|
| D1 | Sơ đồ đoạn thẳng | SGK (Khám phá) | MT1 | M1: đoạn dài gồm mấy phần bằng đoạn ngắn (đếm) · M2: sơ đồ và tìm số quả của Mai (6 × 4) · M3: Mai nhiều hơn Việt bao nhiêu quả (hai bước). Đáp bằng số | **hình mới** `soDoGap` | `nham-gap-them`, `nham-so-lan`, `thieu-buoc` |
| D2 | Gấp một số lên n lần | SGK (Khám phá, quy tắc) | MT1 | M1: "6 gấp 3 lần" (số nhỏ) · M2: chọn phép tính đúng (6 × 4, 6 + 4, 6 : 4…) · M3: số lớn hơn (9 gấp 5 lần) | chữ | `nham-gap-them`, `nham-so-lan` |
| D3 | Bảng thêm hay gấp | SGK (Hoạt động 1) | MT2 | M1: hai hàng, số đã cho nhỏ (4, 7) · M2: thêm 8 / gấp 8 lần, ô "?" ở hàng nào cũng được · M3: biết hàng dưới tìm số đã cho. Đáp bằng số | `bangCot` | `nham-gap-them`, `canh-dong` |
| D4 | Đường ống | SGK (Hoạt động 2) | MT2 | M1: một số qua một cửa → ? · M2: qua "gấp 4 lần" hoặc "thêm 5 đơn vị", chọn cửa đúng · M3: biết kết quả, tìm số đầu (? × 5 = 50) | `soDo` (số – cửa – kết quả) | `nham-gap-them`, `dao-vai` |
| D5 | Số? hai mũi tên | SGK (Luyện tập 1) | MT2 | M1: 3 gấp 4 lần → ? · M2: 3 thêm 4 đơn vị, cả hai · M3: 6 gấp 5 lần, thêm 5 đơn vị; so hai kết quả | `soDo` hai nhánh | `nham-gap-them` |
| D6 | Đúng / Sai gấp hay thêm | SGK (Luyện tập 2) | MT3 | M1: "7 → 63 gấp 9 lần" Đ / "thêm 9 đơn vị" S · M2: 16 → 32 gấp mấy lần / thêm mấy đơn vị (mệnh đề) · M3: 24 → 72 gấp 3 lần, thêm 48 đơn vị | chữ, `anh` kiến | `nham-gap-them`, `nham-so-lan` |
| D7 | Bạn nói đúng hay sai | **không có trong SGK** | MT3 | M1: "Bạn An nói: số 12 gấp 3 lần số 4." · M2: số 20 là số 5 thêm 15 đơn vị hay gấp 4 lần · M3: "Bạn An nói: …" với "Đồng ý, vì…" / "Không đồng ý, vì…" | `anh('boy')` | `nham-gap-them`, `nham-so-lan` |
| D8 | Giải toán: gấp lên | SGK (Khám phá, Hoạt động 3) | MT4 | M1: tuổi bố gấp 4 lần tuổi con 9 tuổi (36) · M2: chọn phép nhân hay phép cộng cho tình huống (gấp / thêm) · M3: hai bước (gấp rồi thêm, hoặc gấp rồi trừ) | `anh`, sơ đồ | `nham-gap-them`, `cong-thay-nhan`, `thieu-buoc` |
| D9 | Bàn và ghế | SGK (Luyện tập 3) | MT4 | M1: 9 bàn, mỗi bàn 2 ghế (18) · M2: bàn có 3, 4 ghế; ghế nhiều hơn bàn bao nhiêu · M3: thêm ghế dự phòng; hoặc tìm số bàn khi biết số ghế | xếp bàn ghế `data-dem` | `lech-nhom`, `thieu-buoc` |
| D10 | Phép tính có kết quả 45 | SGK (Luyện tập 4) | MT4 | M1: phép tính nào có kết quả bằng 45 (chọn một trong bốn) · M2: có bao nhiêu phép tính (trong sáu) có kết quả 45 · M3: kết quả 45 qua cộng, trừ, nhân: đếm các phép tính | chữ (thẻ phép tính) | `nham-bang`, `dem-sot-phep` |

Dạng không có trong SGK: **Bạn nói đúng hay sai (D7)** (1 dạng). Chín dạng còn lại bám các mục của sách.

Phân bố: MT1 hai dạng (D1, D2) · MT2 ba dạng (D3, D4, D5) · MT3 hai dạng (D6, D7) · MT4 ba dạng (D8, D9, D10). Mỗi mục tiêu ≥ 2 dạng.

### Luật lời câu hỏi (áp dụng cho cả bài)

- Nút **Đúng / Sai** chỉ đi với **mệnh đề**; câu "… có … không?" dùng nút **Có / Không**.
- Dạng "Bạn An nói …" dùng "Em thấy thế nào?" với "Đồng ý, vì…" / "Không đồng ý, vì…". Đáp án không tự mâu thuẫn với đề (đề nói bạn sai thì không có đáp án "bạn không sai").
- Luôn viết rõ **"gấp … lần"** hoặc **"thêm … đơn vị"**, không viết "hơn … lần" hay "nhiều hơn … lần".
- Đáp án nhiễu **không chứa chính đối tượng đang hỏi**.
- Nhãn trong hình (số quả, số tuổi) nằm giữa đúng đoạn nó đo; nhãn ở rìa khung chừa lề ≥ 1,3 lần cỡ chữ.

## 3. Hình mới cần vẽ (viết ngay trong `bai-24.js`, KHÔNG sửa `figures.js`)

Theo quy chuẩn `sk-ve-hinh-tieuhoc`: bảng màu `HM`, `svgHinh`, `nhanTron` / `nhanVien`; mỗi hình là MỘT SVG co theo màn hình; chữ ≥ 14px ở khổ điện thoại; nét và chữ dùng `currentColor`; nét thẳng có `fill="none"`; không emoji hệ thống.

| Hàm | Mô tả | Tham số | Kiểm do mã |
|---|---|---|---|
| `soDoGap(ten1, ten2, so, n, don)` | Sơ đồ đoạn thẳng "Tóm tắt": đoạn trên là 1 phần (nhãn số, ví dụ "6 quả"); đoạn dưới gồm n phần bằng nhau, có vạch chia; ngoặc phía dưới đoạn dài ghi "? quả". Tên hai bạn ở bên trái. | số đã cho, số lần n, đơn vị | `check()` đếm phần (`data-dem="phan"`) = n; nhãn số khớp số đã cho. |
| `banGhe(nBan, soGhe)` | Các bàn xếp hàng, mỗi bàn là một hình chữ nhật với ghế (hình vuông nhỏ) quanh bàn; mỗi ghế `data-dem="ghe"`; các bàn không chồng nhau. | số bàn, số ghế mỗi bàn | `check()` đếm ghế = số bàn × số ghế. |
| `theTinh(ds)` | Dãy thẻ phép tính (chữ trong thẻ bo góc) để chọn hoặc đếm. | mảng chuỗi phép tính | `check()` tính lại mọi kết quả; số thẻ có kết quả 45 khớp đáp án. |

Hình dùng lại từ `figures.js`: `soDo`, `bangCot`, `anh`, `oHoi`, `svgHinh`, `HM`, `tinhBT`.

## 4. Nhãn lỗi

- Chuẩn của engine dùng được: `canh-dong`, `nham-bang`, `cong-thay-nhan`, `lech-nhom`, `dao-vai`, `thieu-buoc`.
- **Nhãn riêng của bài 24** (khai báo qua `BAI.loi`):

| Nhãn | Tên hiển thị | Ví dụ lỗi | Gợi ý |
|---|---|---|---|
| `nham-gap-them` | Nhầm "gấp n lần" với "thêm n đơn vị" | 6 gấp 4 lần viết 6 + 4 = 10 | "Gấp 4 lần là nhân với 4: 6 × 4. Thêm 4 đơn vị mới là cộng 4." |
| `nham-so-lan` | Nhầm số lần với số đơn vị | 24 là 6 gấp 18 lần | "Số lần là số em nhân với số đã cho: 6 × ? = 24." |
| `dem-sot-phep` | Đếm sót hoặc thừa phép tính | Đếm 2 thay vì 3 phép tính có kết quả 45 | "Bé tính kết quả của từng thẻ, rồi đếm các thẻ có kết quả bằng 45." |

## 5. Rủi ro đã biết

1. **Sơ đồ đoạn thẳng:** nhãn "? quả" kẹp đúng đoạn dài, các vạch chia đều nhau; đoạn ngắn và đoạn dài cùng độ dài một phần. n = 9 phần trên điện thoại phải vẫn rõ: mỗi phần ≥ 22 đơn vị, chữ nhãn ≥ 14px.
2. **Câu hỏi "tìm số đầu" (D4 mức 3)** là phép chia (50 : 5): chưa dạy ở đây; viết "? gấp 5 lần bằng 50" và giải bằng tìm thừa số (như bài 13: "? × 5 = 50").
3. **Đáp án trùng giữa "gấp" và "thêm"** (ví dụ 4 gấp 2 lần = 8 và 4 thêm 4 đơn vị = 8): `make` tránh các cặp số cho hai kết quả bằng nhau, và `check()` kiểm.
4. **Đếm phép tính có kết quả 45 (D10):** các thẻ khác nhau, mỗi thẻ một kết quả; chỉ dùng cộng, trừ, nhân (không chia), kết quả < 100.
5. **Ghế quanh bàn:** ghế không chồng nhau (`data-dem="ghe"` không đè); nếu `phong_tranh` báo đè thì vẽ ghế nhỏ lại, đặt ghế sát mép bàn.
6. **Không nhãn sát biên:** font Linux hẹp hơn Segoe UI; thầy soát lại hình trên máy thầy (ghi trong PR).
7. `index.html` dùng CRLF: sửa bằng Python đọc/ghi nhị phân (không `sed -i`), diff đúng 1 dòng.
8. `kiem_dem.mjs` kiểm các `data-dem` của bài.

## 6. Việc sẽ làm sau khi thầy duyệt

1. Viết `bai-24.js` theo bảng trên (nối chuỗi, **không** backtick hay template literal), chép `bai-24.html`, sửa `index.html` (một dòng).
2. Chạy RIÊNG từng cổng (đặt `CHROME` nếu cần):
   - `node .claude/skills/sk-web-toan-tieuhoc/assets/kiemtra.js . bai-24.js 400000`
   - `node .claude/skills/sk-ve-hinh-tieuhoc/assets/phong_tranh.mjs . <thư mục tạm> bai-24 --soat --khong-chup --rong 375,1200 --giao light,dark --lan 3` → 0 lỗi
   - `node .claude/skills/sk-web-toan-tieuhoc/assets/soat_giao_dien.mjs . bai-24 --cau 2`
3. Tự soi ảnh phòng tranh (sơ đồ đoạn thẳng, bảng, đường ống, bàn ghế), push, ghi kết quả từng cổng trong mô tả PR, đổi tiêu đề thành "[XONG] Bài 24", gỡ trạng thái nháp. Không tự gộp.

## 7. Cần thầy quyết (kèm phương án đề xuất)

1. **Mục SGK ở mục 0 và bảng dạng** có đúng không? Đề xuất: đúng như bảng.
2. **Mê cung (Luyện tập 4)** đổi thành câu chọn một và câu đếm: đồng ý (**đề xuất**).
3. **Đường ống (Hoạt động 2):** dùng hình `soDo` có sẵn (số – phép – kết quả), không vẽ ống nước riêng: đồng ý (**đề xuất**) hay cần hình ống?
4. **Tìm số đầu (D4 mức 3):** viết "? gấp 5 lần bằng 50" rồi tìm thừa số (không dùng phép chia): đồng ý (**đề xuất**).
5. **Dạng "không có trong SGK" (D7):** giữ (**đề xuất**) hay bớt?
6. **Ba nhãn riêng** (`nham-gap-them`, `nham-so-lan`, `dem-sot-phep`): giữ (**đề xuất**) hay gom về `cong-thay-nhan`, `lech-nhom`?
7. **Bốn mục tiêu, mười dạng**; xếp lại thứ tự dạng theo sư phạm như bài 9–23 (**đề xuất**).
