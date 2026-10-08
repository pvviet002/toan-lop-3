# Phân tích sư phạm — Bài 17: Hình tròn. Tâm, bán kính, đường kính của hình tròn (BÀI MỚI — BẢN NHÁP CHỜ DUYỆT)

Mẫu: `bai-11.js` (Luyện thông minh từ đầu) + `bai-13.js`, `bai-14.js` (có hình riêng trong file) + khối "LUYỆN THÔNG MINH" ở đầu `engine.js`.
Phạm vi: tạo mới `bai-17.js`, `bai-17.html` (chép từ `assets/bai-template.html`), thêm 17 vào `AVAILABLE` trong `index.html` (giữ CRLF, diff đúng 1 dòng)
và file phân tích này. Không đụng `engine.js`, `figures.js`, `lua.js`. Bài mới **không** thêm vào `chua_chuan.txt`: `phong_tranh --soat` phải 0 lỗi. Chưa viết dòng mã nào.

Bài 17 là **bài hình học khái niệm** ngắn (hai trang sách). Dùng **4 mục tiêu** (skill cho phép 4–6) × 8 dạng.

## 0. Nguồn và điều cần lưu ý

- Cấu trúc mục SGK (trang in 52–53) lấy từ **bản tóm tắt của phiên Claude trên máy thầy**; phiên đám mây chưa tự đối chiếu sách. Không chép nguyên văn đề; chỉ ghi dạng bài và ý.
- **Thao tác "vẽ bằng com pa" của sách đổi thành nhận ra / chọn hình vẽ đúng**: engine không có công cụ vẽ. Ghi rõ ở từng dạng.
- **Mọi số đo do mã tính và khớp hình**: tâm, bán kính, điểm trên đường tròn tính từ toạ độ; nhãn cm lấy từ chính toạ độ; đường kính thật sự đi qua tâm; dây thật sự không đi qua tâm. `check()` tính lại từ toạ độ.
- **Hình mới viết trong `bai-17.js`**, không sửa `figures.js`.

## 1. Bốn mục tiêu (muctieu) × ba mức (Thông tư 27)

| MT | Tên | Mức 1 — Nhận biết | Mức 2 — Hiểu | Mức 3 — Vận dụng |
|---|---|---|---|---|
| MT1 | Nhận ra tâm, bán kính, đường kính | Nhận ra tâm O, một bán kính, một đường kính trên hình tròn có nhãn. | Nhiều đoạn trên hình: chọn đúng đoạn là bán kính, đúng đoạn là đường kính. | Nhận ra hình VẼ ĐÚNG (tâm đúng chỗ, đường kính qua tâm) trong các hình gần giống nhau. |
| MT2 | Đường kính hay dây? | Đoạn qua tâm là đường kính (hình đơn giản). | Phân biệt đường kính với dây CD KHÔNG qua tâm (bẫy). | Đ hay S: tìm lỗi của bạn ("CD là đường kính vì nối hai điểm trên đường tròn"). |
| MT3 | Quan hệ trong hình tròn | Biết tâm là trung điểm đường kính. | Đổi giữa bán kính và đường kính (đường kính = 2 lần bán kính), số nhỏ. | Đổi qua lại với số lớn hơn; so sánh các đoạn. |
| MT4 | Tính độ dài trên hình ghép | Hai hình tròn bán kính r tiếp xúc, tâm cách nhau 2r. | Ba hình tròn sát nhau: độ dài đoạn nối ba tâm; bẫy lấy BC = 2 bán kính. | Bài bọ ngựa bò A–B–C–D: tổng độ dài, có đoạn đầu và đoạn cuối. |

Tham số engine: `goal:10, soCau:18, soCauToiDa:24`. 4 mục tiêu × tối thiểu 3 câu = 12 ≤ 18.

## 2. Tám dạng (topics) — xếp theo mạch sư phạm

"Nguồn": **SGK** = có trong sách (mục ghi trong ngoặc) · **không có trong SGK** = dạng thêm.

| # | Dạng | Nguồn | MT | Mức 1 / Mức 2 / Mức 3 | Hình | Nhãn lỗi chính |
|---|---|---|---|---|---|---|
| D1 | Tâm, bán kính, đường kính | SGK (Khám phá, Hoạt động) | MT1 | M1: hình tròn tâm O, chọn tên đoạn (OM, AB) cho "bán kính" hoặc "đường kính" · M2: nhiều đoạn, chọn tên đúng · M3: ghép tên với đoạn trong hình xoay góc khác | **hình mới** `hinhTron` | `nham-ban-kinh-duong-kinh`, `lech-nhom` |
| D2 | Hình vẽ đúng | SGK (Luyện tập 1: vẽ bằng com pa → nhận ra) | MT1 | M1: "hình nào có tâm O, bán kính r cm" — hình khác hẳn nhau · M2: hình có tâm lệch, bán kính sai độ dài · M3: đường kính vẽ không qua tâm là hình sai | `hinhTron` | `nham-day-duong-kinh`, `nham-ban-kinh-duong-kinh` |
| D3 | Đường kính hay dây | SGK (Hoạt động, bẫy dây CD) | MT2 | M1: một đoạn qua tâm: có phải đường kính không · M2: dây CD không qua tâm (bẫy) · M3: nhiều đoạn, tìm các đoạn là đường kính (đếm số đoạn, đáp bằng số) | `hinhTron` | `nham-day-duong-kinh`, `lech-nhom` |
| D4 | Đ/S tìm lỗi | **không có trong SGK** | MT2 | M1: lỗi thô ("OM là đường kính") · M2: lỗi tinh (dây qua gần tâm) · M3: "bạn nói … ; sai ở đâu" (chọn lý do) | `anh('boy')`, `hinhTron` | `nham-day-duong-kinh`, `nham-ban-kinh-duong-kinh` |
| D5 | Tâm là trung điểm | SGK (Khám phá) | MT3 | M1: O là trung điểm của đoạn nào (chọn trong AB, CD, OM) · M2: biết AB = 8 cm, AO = ? · M3: có hai đường kính cắt nhau, mọi tâm trùng | `hinhTron` | `nham-giua-trung-diem`, `chia-doi-sai` |
| D6 | Bán kính ↔ đường kính | SGK (Khám phá: đường kính = 2 lần bán kính) | MT3 | M1: bán kính 3 cm, đường kính? · M2: đường kính 12 cm, bán kính? · M3: so sánh (bán kính 7 cm và đường kính 12 cm đoạn nào dài hơn) | `hinhTron` có nhãn cm | `nham-ban-kinh-duong-kinh`, `chia-doi-sai` |
| D7 | Bọ ngựa bò | SGK (Luyện tập 2: ba bông hoa tròn, bọ ngựa A–B–C–D) | MT4 | M1: hai hình tròn bán kính r tiếp xúc, tâm B và C: BC = ? · M2: ba hình tròn sát nhau (B, O, C thẳng hàng), BC = ? (4 bán kính) · M3: tổng đường bò A–B–C–D (bán kính 7 cm: 7 + 28 + 7 = 42 cm), có đổi bán kính | **hình mới** `baHoaTron` | `nham-bc`, `quen-doan-dau-cuoi`, `lech-nhom` |
| D8 | Hai hình tròn tiếp xúc | **không có trong SGK** | MT4 | M1: tâm cách nhau bao nhiêu khi hai hình tròn bán kính r và r' tiếp xúc · M2: bán kính khác nhau · M3: ba hình tròn khác bán kính, tổng khoảng cách ba tâm | `baHoaTron` | `nham-bc`, `cong-thay-nhan` |

Dạng không có trong SGK: **Đ/S tìm lỗi, Hai hình tròn tiếp xúc** (2 dạng). Sáu dạng còn lại là các mục của sách.

Phân bố: MT1 hai dạng (D1, D2) · MT2 hai dạng (D3, D4) · MT3 hai dạng (D5, D6) · MT4 hai dạng (D7, D8). Mỗi mục tiêu ≥ 2 dạng.

## 3. Hình mới cần vẽ (viết ngay trong `bai-17.js`, KHÔNG sửa `figures.js`)

Theo quy chuẩn `sk-ve-hinh-tieuhoc`: bảng màu `HM`, `svgHinh`, `nhanTron` / `nhanVien`; mỗi hình là MỘT SVG co theo màn hình; chữ ≥ 14px ở khổ điện thoại;
chữ và nét dùng `currentColor` để thấy ở giao diện Tối; không emoji hệ thống. **Mọi số đo do mã tính**: toạ độ điểm trên đường tròn = tâm + r·(cos, sin); nhãn cm lấy từ chính r.

| Hàm | Mô tả | Tham số | Kiểm do mã |
|---|---|---|---|
| `hinhTron(r, doan)` | Một đường tròn tâm O (chấm có nhãn "O"), các đoạn nối điểm trên đường tròn: bán kính (từ tâm), đường kính (đi qua tâm, hai đầu trên đường tròn), dây (không qua tâm); mỗi đoạn có nhãn chữ; nhãn cm tuỳ chọn. | `r`, `doan` = [{tu, den, loai}] | `check()` tính "qua tâm" từ toạ độ: đường kính phải có tâm là trung điểm; dây phải cách tâm ≥ 0,1 r. |
| `baHoaTron(r, tamX, ten)` | Ba hình tròn bán kính r nằm sát nhau (tâm B, O, C thẳng hàng); điểm A trên đường tròn tâm B, D trên đường tròn tâm C; đường bò A–B–C–D nét đậm. Bán kính có thể khác nhau ở D8. | `r` hoặc mảng bán kính | `check()` tính BC = tổng các bán kính / 4 bán kính từ toạ độ tâm, không tin nhãn. |

Hình dùng lại từ `figures.js`: `anh('boy')`, `nhanTron`, `nhanVien`, `svgHinh`, `HM`.

## 4. Nhãn lỗi

- Chuẩn của engine dùng được: `lech-nhom`, `cong-thay-nhan`, `dao-vai`.
- **Nhãn riêng của bài 17** (khai báo qua `BAI.loi`):

| Nhãn | Tên hiển thị | Ví dụ lỗi | Gợi ý |
|---|---|---|---|
| `nham-ban-kinh-duong-kinh` | Nhầm bán kính với đường kính | Đường kính = bán kính; bán kính 7 cm bé nói đường kính 3,5 cm hoặc 7 cm | "Đường kính = 2 lần bán kính. Bán kính từ tâm tới đường tròn." |
| `nham-day-duong-kinh` | Nhầm dây không qua tâm là đường kính | CD nối hai điểm trên đường tròn nhưng không qua tâm: bé chọn đường kính | "Đường kính phải đi qua TÂM O. Bé kiểm tra đoạn có qua O không." |
| `nham-bc` | Nhầm khoảng cách giữa hai tâm | Ba hoa bán kính 7 cm: bé lấy BC = 14 cm (2 bán kính) thay vì 28 cm | "Từ tâm B tới tâm C đi qua cả hình tròn giữa: cộng đủ các bán kính." |
| `quen-doan-dau-cuoi` | Quên đoạn đầu và đoạn cuối của đường bò | Bé chỉ tính BC, quên AB và CD | "Bọ ngựa bò cả A–B, B–C, rồi C–D. Bé cộng đủ ba đoạn." |
| (dùng thêm) `chia-doi-sai`, `nham-giua-trung-diem` | như bài 16 | AB = 8 cm: bé nói AO = 16 cm | "Tâm chia đường kính thành hai phần bằng nhau." |

## 5. Rủi ro đã biết

1. **Dây gần tâm**: dây ở M2 và M3 của D3, D4 không được quá sát tâm đến mức mắt thấy như đường kính (chặn bằng khoảng cách ≥ 0,25 r, kiểm bằng toạ độ).
2. **Soát hình**: hai hình mới phải qua `phong_tranh --soat` với 0 lỗi (nhãn O, A, B không đè lên nét; chữ ≥ 14px ở khổ 375px; ba hoa tròn co theo màn hình điện thoại).
3. **Độ dài trên hình ghép**: các bán kính chọn sao cho đáp số nguyên (r = 2 … 9 cm).
4. `index.html` dùng CRLF: sửa bằng Python đọc/ghi nhị phân (không `sed -i`), diff đúng 1 dòng.
5. `kiem_dem.mjs` có thể báo sai vì `figures.js` trên `main` chưa có `data-dem` (đã biết, không sửa).

## 6. Việc sẽ làm sau khi thầy duyệt

1. Viết `bai-17.js` theo bảng trên (nối chuỗi, **không** backtick hay template literal), chép `bai-17.html`, sửa `index.html` (một dòng).
2. Chạy RIÊNG từng cổng (đặt `CHROME` nếu cần):
   - `node .claude/skills/sk-web-toan-tieuhoc/assets/kiemtra.js . bai-17.js 400000`
   - `node .claude/skills/sk-ve-hinh-tieuhoc/assets/phong_tranh.mjs . <thư mục tạm> bai-17 --soat --khong-chup --rong 375,1200 --giao light,dark --lan 3` → 0 lỗi
   - `node .claude/skills/sk-web-toan-tieuhoc/assets/soat_giao_dien.mjs . bai-17 --cau 2`
3. Push, ghi kết quả từng cổng trong mô tả PR, đổi tiêu đề thành "[XONG] Bài 15–17", gỡ trạng thái nháp. Không tự gộp.

## 7. Cần thầy quyết (kèm phương án đề xuất)

1. **Mục SGK ở mục 0 và bảng dạng** có đúng không? Đề xuất: đúng như bảng.
2. **Thao tác vẽ bằng com pa** đổi thành chọn hình vẽ đúng (D2): đồng ý (**đề xuất**).
3. **Bốn mục tiêu** (không phải năm vì bài ngắn): đồng ý (**đề xuất**), hay thầy muốn tách thêm MT5 giải toán?
4. **Nhãn riêng** (`nham-ban-kinh-duong-kinh`, `nham-day-duong-kinh`, `nham-bc`, `quen-doan-dau-cuoi`): giữ (**đề xuất**; hai nhãn cuối chính là các bẫy sách cố ý gài) hay gom về `lech-nhom`?
5. **Hai hình mới** `hinhTron`, `baHoaTron` viết trong `bai-17.js`: đồng ý. Ba bông hoa vẽ dạng vòng tròn nét đậm có chấm tâm (đề xuất) hay có thêm cánh hoa trang trí? Đề xuất: **vòng tròn đơn giản có tên hoa** để soát hình dễ qua.
6. Xếp lại thứ tự dạng theo sư phạm như bài 9–14 (**đề xuất**).
7. Xác nhận 8 dạng và 2 dạng "không có trong SGK".
