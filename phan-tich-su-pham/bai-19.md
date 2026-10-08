# Phân tích sư phạm — Bài 19: Hình tam giác, hình tứ giác. Hình chữ nhật, hình vuông (BÀI MỚI — BẢN NHÁP CHỜ DUYỆT)

Mẫu: `bai-16.js`, `bai-17.js` (bài hình học mới, có hình riêng trong file) + khối "LUYỆN THÔNG MINH" ở đầu `engine.js`.
Phạm vi: tạo mới `bai-19.js`, `bai-19.html` (chép từ `assets/bai-template.html`), thêm 19 vào `AVAILABLE` trong `index.html` (giữ CRLF, diff đúng 1 dòng)
và file phân tích này. Không đụng `engine.js`, `figures.js`, `lua.js`. Bài mới **không** thêm vào `chua_chuan.txt`: `phong_tranh --soat` phải 0 lỗi. Chưa viết dòng mã nào.

Bài 19 là **bài dài** (năm trang sách, hai phần). Dùng **6 mục tiêu** × 13 dạng, chia hai nhóm tab: **"Tam giác, tứ giác"** (MT1–MT3) và **"Hình chữ nhật, hình vuông"** (MT4–MT6).

## 0. Nguồn và điều cần lưu ý

- Cấu trúc mục SGK (trang in 56–60) lấy từ **bản tóm tắt của phiên Claude trên máy thầy**; phiên đám mây chưa tự đối chiếu sách.
  Không chép nguyên văn đề; chỉ ghi dạng bài và ý.
  - **Phần 1:** Khám phá (tam giác ABC: 3 đỉnh, 3 cạnh, 3 góc; tứ giác MNPQ: 4 đỉnh, 4 cạnh, 4 góc); HĐ1 nêu tên đỉnh, cạnh (tam giác MNP, tam giác DEG, tứ giác ABCD);
    HĐ2 nêu tên các tam giác, tứ giác trong hình ghép (hình thang ABED, C trên DE, nối AC, BC); HĐ3 tờ giấy hình chữ nhật ABCD, M trên AB, N trên DC: cắt theo đoạn nào được hai tứ giác, hoặc một tam giác và một tứ giác.
  - **Phần 2:** Khám phá (hình chữ nhật: 4 đỉnh, 4 góc vuông, hai cạnh dài bằng nhau, hai cạnh ngắn bằng nhau; chiều dài, chiều rộng; hình vuông: 4 góc vuông, 4 cạnh bằng nhau); HĐ1 trên lưới (a hình nào là hình vuông, b hình nào là hình chữ nhật);
    HĐ2 đo trên lưới (cạnh hình vuông, chiều dài và chiều rộng hình chữ nhật); HĐ3 tờ giấy có mép rách, cắt theo đoạn nào để được hình vuông;
    Luyện tập 1 (hình chữ nhật ABCD, BC = 13 dm, CD = 20 dm: khoảng cách giữa các nhà); Luyện tập 2 (đường vòng khi đoạn CD hỏng); Luyện tập 3 (10 que tính xếp hình chữ nhật).
- **Thao tác của sách đổi thành câu chọn một / đếm / điền số** (engine chấm một đáp án, không có nhiều lựa chọn đồng thời, không có công cụ cắt giấy):
  - HĐ1 phần 2 "chọn **những** hình" (chọn nhiều) → câu **đếm** ("Có bao nhiêu hình chữ nhật?") và câu **chọn một** (D7);
  - cắt giấy (HĐ3 hai phần) → **chọn đoạn cắt đúng** trong danh sách đoạn (D4, D9);
  - đo trên lưới → **đếm ô**, 1 ô = 1 cm (D8);
  - Luyện tập 3 que tính → trắc nghiệm và đếm số cách (D12).
- **Mọi số đo và mọi loại hình do mã tính từ toạ độ**: số đỉnh, cạnh, góc vuông, độ dài cạnh; `check()` tính lại hình chữ nhật (4 góc vuông), hình vuông (thêm 4 cạnh bằng nhau), đếm tam giác, tứ giác từ danh sách đoạn thẳng.
- **Số thập phân cấm**: mọi độ dài là số nguyên (ô, cm, dm, km).
- **Hình mới viết trong `bai-19.js`**, không sửa `figures.js`.

## 1. Sáu mục tiêu (muctieu) × ba mức (Thông tư 27)

| MT | Tên | Mức 1 — Nhận biết | Mức 2 — Hiểu | Mức 3 — Vận dụng |
|---|---|---|---|---|
| MT1 | Tam giác, tứ giác: đỉnh, cạnh, góc | Số đỉnh, số cạnh, số góc của tam giác, tứ giác. | Nêu tên đỉnh, cạnh (tam giác MNP, tứ giác ABCD). | Nhận ra hình vẽ KHÔNG phải tam giác hay tứ giác (đường hở, đường cong); Đ hay S. |
| MT2 | Đếm tam giác, tứ giác trong hình ghép | Đếm tam giác trong hình đơn giản. | Hình thang ABED có C trên DE, nối AC, BC: đếm tam giác. | Đếm tứ giác (hình chồng nhau), đếm cả hai loại. |
| MT3 | Cắt giấy hình chữ nhật | Cắt theo đường chéo → hai tam giác. | Cắt theo MN (M trên AB, N trên DC) → hai tứ giác. | Cắt theo đoạn nối một đỉnh với M hoặc N → một tam giác và một tứ giác; chọn đoạn cắt đúng. |
| MT4 | Nhận ra hình chữ nhật, hình vuông | Chọn hình chữ nhật, chọn hình vuông trong ba hình khác hẳn nhau. | Hình vuông trong nhiều hình (có hình thoi, hình chữ nhật đứng); đếm hình chữ nhật (hình bình hành, hình thang là bẫy). | Đ hay S: tìm lỗi của bạn ("hình thoi là hình vuông vì 4 cạnh bằng nhau"); hình vuông có phải hình chữ nhật không. |
| MT5 | Cạnh của hình chữ nhật, hình vuông | Đếm ô: cạnh hình vuông, chiều dài, chiều rộng. | Cạnh đối bằng nhau: biết BC = 13 dm thì AD = ?; biết CD thì AB = ?. | Chọn đoạn cắt để được hình vuông (mép giấy rách); kích thước hình chữ nhật theo lưới. |
| MT6 | Vận dụng | Chọn cách xếp hình chữ nhật bằng que tính. | Đường vòng: CD = MN; đếm que. | Đi vòng dài hơn đi thẳng bao nhiêu; đếm số cách xếp hình chữ nhật bằng 10 que. |

Tham số engine: `goal:10, soCau:20, soCauToiDa:26`. 6 mục tiêu × tối thiểu 3 câu = 18 ≤ 20.

## 2. Mười ba dạng (topics) — xếp theo mạch sư phạm

"Nguồn": **SGK** = có trong sách (mục ghi trong ngoặc) · **không có trong SGK** = dạng thêm.

### Nhóm tab "Tam giác, tứ giác"

| # | Dạng | Nguồn | MT | Mức 1 / Mức 2 / Mức 3 | Hình | Nhãn lỗi chính |
|---|---|---|---|---|---|---|
| D1 | Đỉnh, cạnh, góc | SGK (Khám phá phần 1) | MT1 | M1: tam giác có mấy đỉnh / cạnh / góc (số) · M2: tứ giác có mấy đỉnh / cạnh / góc · M3: Đ/S "Tứ giác có 3 cạnh." | **hình mới** `hinhDaGiac` | `lech-nhom`, `nham-tam-tu` |
| D2 | Tên đỉnh và cạnh | SGK (Hoạt động 1 phần 1) | MT1 | M1: tam giác MNP, chọn tên một cạnh · M2: tứ giác ABCD, chọn tên các cạnh · M3: chọn tên cạnh KHÔNG thuộc hình (ví dụ AC trong tứ giác ABCD là đường chéo) | `hinhDaGiac` | `nham-dinh-canh`, `lech-nhom` |
| D3 | Đúng hình, sai hình | **không có trong SGK** | MT1 | M1: một hình khép kín và một hình hở: hình nào là tam giác · M2: có hình có cạnh cong · M3: Đ/S "Hình này là tứ giác." (đường gấp khúc hở có 4 đoạn) | `hinhDaGiac` | `nham-tam-tu`, `lech-nhom` |
| D4 | Đếm hình trong hình ghép | SGK (Hoạt động 2 phần 1) | MT2 | M1: hình tam giác chia thành hai tam giác nhỏ, đếm tam giác · M2: hình thang ABED, C trên DE, nối AC, BC: đếm tam giác · M3: đếm tứ giác, hoặc đếm tất cả hình (số). Đáp bằng số | **hình mới** `hinhGhep` | `dem-sot-hinh`, `lech-nhom` |
| D5 | Cắt tờ giấy | SGK (Hoạt động 3 phần 1) | MT3 | M1: hình chữ nhật ABCD, cắt theo đường chéo AC được hai hình gì · M2: M trên AB, N trên DC, cắt theo MN được hai hình gì · M3: chọn đoạn cắt (trong AC, MN, AN, MC…) để được **một tam giác và một tứ giác** | **hình mới** `giayCat` | `cat-sai`, `lech-nhom` |

### Nhóm tab "Hình chữ nhật, hình vuông"

| # | Dạng | Nguồn | MT | Mức 1 / Mức 2 / Mức 3 | Hình | Nhãn lỗi chính |
|---|---|---|---|---|---|---|
| D6 | Đặc điểm hình chữ nhật, hình vuông | SGK (Khám phá phần 2) | MT4 | M1: hình chữ nhật có mấy góc vuông · M2: hình vuông có mấy cạnh bằng nhau; chiều dài, chiều rộng · M3: Đ/S "Hình vuông cũng là hình chữ nhật." (đồng ý, vì có 4 góc vuông) | `hinhDaGiac` | `lech-nhom`, `nham-hv-hcn` |
| D7 | Hình nào là hình vuông, hình chữ nhật | SGK (Hoạt động 1 phần 2) | MT4 | M1: ba hình khác hẳn: chọn hình vuông · M2: bốn hình trên lưới (hình chữ nhật đứng, hình thoi, hình vuông thật): chọn hình vuông · M3: bốn hình (hình bình hành, hình chữ nhật, hình thang, hình chữ nhật đứng hẹp): **đếm** số hình chữ nhật hoặc chọn hình chữ nhật | **hình mới** `luoiHinh` | `nham-thoi-vuong`, `nham-hv-hcn` |
| D8 | Đếm ô trên lưới | SGK (Hoạt động 2 phần 2) | MT5 | M1: hình vuông, đếm ô cạnh (cm) · M2: hình chữ nhật, chiều dài, chiều rộng (cm) · M3: biết số ô, hình nào dài hơn hình nào bao nhiêu. Đáp bằng số | `luoiHinh` | `lech-nhom`, `cong-thay-nhan` |
| D9 | Cắt để được hình vuông | SGK (Hoạt động 3 phần 2) | MT5 | M1: tờ giấy một góc rách, chọn đoạn cắt (hai đoạn khác hẳn) · M2: nhiều đoạn, đếm ô để biết cạnh bằng nhau · M3: hai đoạn cùng làm hình chữ nhật nhưng chỉ một đoạn cho hình vuông | `giayCat` | `cat-sai`, `lech-nhom` |
| D10 | Cạnh đối bằng nhau | SGK (Luyện tập 1) | MT5 | M1: hình chữ nhật ABCD có BC = 13 dm: AD = ? · M2: cho cả CD: AB = ? và AD = ? · M3: nhà ở A, B, C, D: A cách B, A cách D bao nhiêu dm; bẫy chọn cạnh nhầm | **hình mới** `hcnNhan` | `nham-canh-doi`, `lech-nhom` |
| D11 | Đường vòng | SGK (Luyện tập 2) | MT6 | M1: CD = MN = ? (hình chữ nhật CMND, CM = 1 km, MN = 2 km) · M2: độ dài đường vòng C–M–N–D · M3: đi vòng dài hơn đi thẳng bao nhiêu km (1 + 2 + 1 − 2). Đáp bằng số | `hcnNhan` | `nham-canh-doi`, `thieu-buoc` |
| D12 | Que tính | SGK (Luyện tập 3) | MT6 | M1: hình chữ nhật 2 × 1 dùng 6 que: một cách xếp bằng 8 que (chọn, trắc nghiệm) · M2: 10 que, chọn các cách xếp được · M3: **đếm** số cách xếp hình chữ nhật (dài lớn hơn rộng, không kể hình vuông) bằng n que (n = 10, 12, 14) | **hình mới** `queTinh` | `lech-nhom`, `dem-sot-hinh` |
| D13 | Đúng / Sai tìm lỗi | **không có trong SGK** | MT4 | M1: mệnh đề ("Hình thoi có 4 cạnh bằng nhau nên là hình vuông." — S) · M2: lỗi tinh (hình bình hành, hình chữ nhật đứng hẹp) · M3: "Bạn An nói …"; chọn lý do sai | `anh('boy')`, `luoiHinh` | `nham-thoi-vuong`, `nham-hv-hcn` |

Dạng không có trong SGK: **Đúng hình, sai hình** (D3), **Đúng / Sai tìm lỗi** (D13). Mười một dạng còn lại là các mục của sách.

Phân bố: MT1 ba dạng (D1, D2, D3) · MT2 một dạng (D4) · MT3 một dạng (D5) · MT4 ba dạng (D6, D7, D13) · MT5 ba dạng (D8, D9, D10) · MT6 hai dạng (D11, D12).
**Hai mục tiêu (MT2, MT3) chỉ có một dạng**: đề xuất gộp MT2 vào MT3 thành "Đếm và cắt hình" (hai dạng D4, D5) → **5 mục tiêu**, xem mục 7 câu 3.

### Luật lời câu hỏi (áp dụng cho cả bài)

- Nút **Đúng / Sai** chỉ đi với **mệnh đề**. Câu "… có … không?" dùng nút **Có / Không**.
- Đáp án nhiễu **không chứa chính đối tượng đang hỏi**. Câu chọn đoạn cắt: các đoạn nhiễu đều là đoạn khác với đoạn đúng, `check()` bảo đảm **đúng một** đoạn thoả.

## 3. Hình mới cần vẽ (viết ngay trong `bai-19.js`, KHÔNG sửa `figures.js`)

Theo quy chuẩn `sk-ve-hinh-tieuhoc`: bảng màu `HM`, `svgHinh`, `nhanTron` / `nhanVien`; mỗi hình là MỘT SVG co theo màn hình; chữ ≥ 14px ở khổ điện thoại;
nét và chữ dùng `currentColor`; nét thẳng có `fill="none"`; không emoji hệ thống. **Nhãn độ dài nằm giữa ĐÚNG đoạn nó đo**, mỗi đoạn một nhãn; nhãn điểm cách nhau ≥ 2 cm / đủ khoảng.

| Hàm | Mô tả | Tham số | Kiểm do mã |
|---|---|---|---|
| `hinhDaGiac(poly, ten)` | Tam giác, tứ giác, hình chữ nhật, hình vuông: đa giác tô nhạt, đỉnh có chấm và nhãn chữ đặt ngoài hình; có thể vẽ hình hở (đường gấp khúc) hoặc cạnh cong cho D3. | `poly`, `ten` | `check()` đếm đỉnh, cạnh, góc vuông từ toạ độ. |
| `hinhGhep(spec)` | Hình thang ABED, C trên DE, nối AC, BC (và vài hình ghép khác); các đoạn là nét đậm; nhãn đỉnh chữ. | `spec` = điểm + đoạn | `check()` **liệt kê tam giác và tứ giác** từ danh sách đoạn (ba điểm không thẳng hàng, ba cạnh nằm trên đoạn đã vẽ) rồi so với đáp án. |
| `giayCat(poly, cat)` | Tờ giấy hình chữ nhật (hoặc có mép rách) có điểm M, N; có thể vẽ đường cắt nét đứt. | `poly`, `cat` | `check()` tách đa giác theo đường cắt, đếm số cạnh hai phần (3 hoặc 4) từ toạ độ. |
| `luoiHinh(w, h, hinh)` | Lưới ô vuông 28 đơn vị/ô, 1 ô = 1 cm; nhiều hình (hình vuông, chữ nhật, thoi, bình hành, thang) vẽ trên đỉnh lưới; nhãn chữ A, B, C, D. | `hinh` = [{ten, poly}] | `check()` phân loại hình từ toạ độ: chữ nhật khi 4 góc vuông, vuông khi thêm 4 cạnh bằng nhau. |
| `hcnNhan(ab, bc, hienNhan)` | Hình chữ nhật ABCD (và CMND cho đường vòng) có nhãn dm / km trên đúng cạnh được cho (mỗi cạnh nhiều nhất một nhãn). | `ab`, `bc` | `check()` đối chiếu AB = CD, BC = AD. |
| `queTinh(n)` | Hình chữ nhật xếp bằng que (que vẽ là đoạn dày, tách rời, đếm được). | `n` = chiều dài, rộng | `check()` đếm `data-dem="que"` = chu vi / (đơn vị que) bằng số que nói trong đề; que không đè nhau. |

Hình dùng lại từ `figures.js`: `anh('boy')`, `nhanTron`, `nhanVien`, `svgHinh`, `HM`.

## 4. Nhãn lỗi

- Chuẩn của engine dùng được: `lech-nhom`, `cong-thay-nhan`, `thieu-buoc`, `dao-vai`.
- **Nhãn riêng của bài 19** (khai báo qua `BAI.loi`):

| Nhãn | Tên hiển thị | Ví dụ lỗi | Gợi ý |
|---|---|---|---|
| `nham-tam-tu` | Nhầm tam giác với tứ giác | Hình hở hay đường cong chọn là tam giác; tứ giác nói 3 cạnh | "Tam giác có 3 đỉnh, 3 cạnh khép kín. Tứ giác có 4 đỉnh, 4 cạnh khép kín." |
| `nham-dinh-canh` | Nhầm đỉnh với cạnh | Chọn tên điểm khi hỏi tên cạnh | "Cạnh nối hai đỉnh, gọi bằng hai chữ cái." |
| `dem-sot-hinh` | Đếm sót hoặc thừa hình | Hình ghép: chỉ đếm các hình nhỏ nhất, quên hình lớn gồm hai hình nhỏ | "Bé đếm cả hình ghép từ hai hay ba phần." |
| `cat-sai` | Chọn sai đoạn cắt | Chọn đoạn cắt ra hai tứ giác khi đề cần một tam giác và một tứ giác | "Bé thử vẽ đoạn cắt, đếm số cạnh hai phần." |
| `nham-thoi-vuong` | Nhầm hình thoi với hình vuông | Hình thoi có 4 cạnh bằng nhau nhưng KHÔNG có 4 góc vuông | "Hình vuông phải có 4 góc vuông. Bé dùng ê ke thử các góc." |
| `nham-hv-hcn` | Nhầm hình vuông với hình chữ nhật | Hình bình hành, hình thang chọn là hình chữ nhật; hình chữ nhật đứng hẹp bị loại | "Hình chữ nhật có 4 góc vuông. Hình vuông cũng là hình chữ nhật đặc biệt." |
| `nham-canh-doi` | Nhầm cạnh đối | Hình chữ nhật ABCD, BC = 13 dm: bé nói AB = 13 dm | "Hai cạnh đối bằng nhau: BC = AD, AB = CD. Cạnh kề thì khác." |

## 5. Rủi ro đã biết

1. **Bài dài**: 13 dạng × ba mức, sáu hình mới; phải soát hình cho từng dạng. `hinhGhep` và `giayCat` cần thuật toán đếm tam giác, tứ giác, tách đa giác; `check()` tính độc lập với bộ sinh.
2. **Hình chữ nhật, hình vuông là bẫy khái niệm**: "hình vuông cũng là hình chữ nhật" (sách lớp 3 chưa nói thẳng; chỉ đặt câu này ở **mức 3 như bài khám phá**, thầy duyệt có giữ không — câu 5 mục 7).
3. **Đếm hình chồng nhau**: `data-dem` không dùng cho hình ghép (các hình chồng lên nhau, phong_tranh báo đè); số tam giác, tứ giác do `check()` tính từ toạ độ, không từ `data-dem`.
4. **Que tính** (D12): các que phải tách rời, không đè (`data-dem` hình chữ nhật không chồng).
5. **Nhãn không sát biên**: font Linux hẹp hơn Segoe UI; nhãn cách nhau ≥ 2 cm / đủ khoảng; thầy soát lại hình học trên máy thầy.
6. `index.html` dùng CRLF: sửa bằng Python đọc/ghi nhị phân (không `sed -i`), diff đúng 1 dòng.
7. `kiem_dem.mjs` báo sai vì `figures.js` trên `main` chưa có `data-dem` (đã biết, không sửa).

## 6. Việc sẽ làm sau khi thầy duyệt

1. Viết `bai-19.js` theo bảng trên (nối chuỗi, **không** backtick hay template literal), chép `bai-19.html`, sửa `index.html` (một dòng).
2. Chạy RIÊNG từng cổng (đặt `CHROME` nếu cần):
   - `node .claude/skills/sk-web-toan-tieuhoc/assets/kiemtra.js . bai-19.js 400000`
   - `node .claude/skills/sk-ve-hinh-tieuhoc/assets/phong_tranh.mjs . <thư mục tạm> bai-19 --soat --khong-chup --rong 375,1200 --giao light,dark --lan 3` → 0 lỗi
   - `node .claude/skills/sk-web-toan-tieuhoc/assets/soat_giao_dien.mjs . bai-19 --cau 2`
3. Tự soi ảnh phòng tranh các dạng hình mới, push, ghi kết quả từng cổng trong mô tả PR, đổi tiêu đề thành "[XONG] Bài 19", gỡ trạng thái nháp. Không tự gộp.

## 7. Cần thầy quyết (kèm phương án đề xuất)

1. **Mục SGK ở mục 0 và bảng dạng** có đúng không, đặc biệt HĐ2 trên lưới và Luyện tập 2 (hình chữ nhật CMND)? Đề xuất: đúng như bảng.
2. **Chọn nhiều hình (HĐ1 phần 2 b)** đổi thành **đếm** và **chọn một**: đồng ý (**đề xuất**).
3. **Số mục tiêu**: 6 mục tiêu như bảng, hay gộp MT2 (đếm hình) và MT3 (cắt giấy) thành một mục tiêu "Đếm và cắt hình" → 5 mục tiêu? Đề xuất: **5 mục tiêu** (mỗi mục tiêu có ít nhất 2 dạng).
4. **Hai nhóm tab** ("Tam giác, tứ giác" và "Hình chữ nhật, hình vuông"): đồng ý (**đề xuất**) nếu engine cho nhóm tab bằng thứ tự `topics` và `sec` (không sửa engine); nếu không, chỉ ghi thứ tự trong `sec`.
5. **"Hình vuông cũng là hình chữ nhật"** (D6 mức 3): giữ (**đề xuất**, sách có nêu 4 góc vuông cho cả hai hình) hay bỏ vì lớp 3 chưa học?
6. **Que tính (D12)**: đếm số hình chữ nhật có dài lớn hơn rộng, **không kể hình vuông** (n = 10: 2 cách): đồng ý (**đề xuất**).
7. **Bảy nhãn riêng** (`nham-tam-tu`, `nham-dinh-canh`, `dem-sot-hinh`, `cat-sai`, `nham-thoi-vuong`, `nham-hv-hcn`, `nham-canh-doi`): giữ (**đề xuất**), hay gom bớt về `lech-nhom`?
8. **Sáu hàm hình mới** viết trong `bai-19.js`: đồng ý; soát hình bài này **chặt** (nhiều hình hình học).
9. Xếp lại thứ tự dạng theo sư phạm như bài 9–17 (**đề xuất**).
10. Xác nhận 13 dạng và 2 dạng "không có trong SGK".
