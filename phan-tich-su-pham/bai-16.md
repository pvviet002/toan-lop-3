# Phân tích sư phạm — Bài 16: Điểm ở giữa, trung điểm của đoạn thẳng (BÀI MỚI — BẢN NHÁP CHỜ DUYỆT)

Mẫu: `bai-11.js` (Luyện thông minh từ đầu) + `bai-13.js`, `bai-14.js` (có hình riêng trong file) + khối "LUYỆN THÔNG MINH" ở đầu `engine.js`.
Phạm vi: tạo mới `bai-16.js`, `bai-16.html` (chép từ `assets/bai-template.html`), thêm 16 vào `AVAILABLE` trong `index.html` (giữ CRLF, diff đúng 1 dòng)
và file phân tích này. Không đụng `engine.js`, `figures.js`, `lua.js`. Bài mới **không** thêm vào `chua_chuan.txt`: `phong_tranh --soat` phải 0 lỗi. Chưa viết dòng mã nào.

Bài 16 là **bài hình học khái niệm** (điểm ở giữa, trung điểm), không phải bảng nhân. Hai khái niệm dễ lẫn: **ở giữa** (ba điểm thẳng hàng) và **trung điểm** (ở giữa VÀ cách đều hai đầu).

## 0. Nguồn và điều cần lưu ý

- Cấu trúc mục SGK (trang in 49–51) lấy từ **bản tóm tắt của phiên Claude trên máy thầy**; phiên đám mây chưa tự đối chiếu sách. Không chép nguyên văn đề; chỉ ghi dạng bài và ý.
- **Thao tác của sách đổi sang trắc nghiệm hoặc điền số** (engine không có công cụ vẽ bằng thước): "đo bằng thước", "gập dây", "đếm ô" đều thành câu nhận ra / chọn / điền số. Ghi rõ ở từng dạng.
- **Mọi số đo do mã tính và khớp hình**: vị trí điểm tính từ toạ độ, nhãn cm lấy từ toạ độ, "trung điểm" thật sự ở chính giữa. `check()` tính lại từ toạ độ chứ không tin nhãn.
- **Hình mới viết trong `bai-16.js`**, không sửa `figures.js`.

## 1. Năm mục tiêu (muctieu) × ba mức (Thông tư 27)

| MT | Tên | Mức 1 — Nhận biết | Mức 2 — Hiểu | Mức 3 — Vận dụng |
|---|---|---|---|---|
| MT1 | Thẳng hàng và điểm ở giữa | Nhận ra điểm ở giữa của ba điểm thẳng hàng trên một đường thẳng, có nhãn độ dài. | Tìm ba điểm thẳng hàng trên hình lưới; nói đúng điểm ở giữa hai điểm nào. | Ba điểm KHÔNG thẳng hàng thì không có điểm "ở giữa" (bẫy). |
| MT2 | Trung điểm của đoạn thẳng | Nhận ra trung điểm khi hai đoạn bằng nhau (3 cm và 3 cm). | Tính độ dài khi biết trung điểm (DH = 4 cm thì DE = ?, hoặc DE = 12 cm thì HE = ?). | Hai đoạn không bằng nhau thì điểm ở giữa không là trung điểm; tính độ dài hai bước. |
| MT3 | Phân biệt ở giữa và trung điểm | Đ hay S: điểm ở giữa nhưng hai đoạn không bằng nhau. | Đ hay S: nhận ra điểm không thẳng hàng; điểm ở giữa nhưng không là trung điểm. | Tìm lỗi của bạn (bạn nói B là trung điểm vì B ở giữa). |
| MT4 | Trung điểm trên lưới và thước | Đọc vạch trên thước cm: M có ở chính giữa A và B không. | Trên lưới: đếm ô để tìm trung điểm của đoạn nằm ngang hoặc thẳng đứng; có điểm nhiễu. | Trung điểm của đoạn có đầu mút không nằm trên cùng mốc 0 của thước; điểm nhiễu sát trung điểm. |
| MT5 | Vận dụng | Cào cào nhảy bước đều: tìm vị trí trung điểm. | Cào cào đã nhảy vài bước: cần nhảy thêm mấy bước tới trung điểm. | Gập đôi dây để lấy nửa độ dài: chọn cách đúng; tính độ dài dây khi không có thước chia cm. |

Tham số engine: `goal:10, soCau:18, soCauToiDa:24`. 5 mục tiêu × tối thiểu 3 câu = 15 ≤ 18.

## 2. Mười dạng (topics) — xếp theo mạch sư phạm

"Nguồn": **SGK** = có trong sách (mục ghi trong ngoặc) · **không có trong SGK** = dạng thêm.

| # | Dạng | Nguồn | MT | Mức 1 / Mức 2 / Mức 3 | Hình | Nhãn lỗi chính |
|---|---|---|---|---|---|---|
| D1 | Điểm ở giữa | SGK (Khám phá a) | MT1 | M1: A, B, C thẳng hàng (AB 3 cm, BC 2 cm), chọn điểm ở giữa · M2: độ dài số khác, thứ tự điểm bị đổi (C ở giữa) · M3: có thêm điểm ngoài đường thẳng (bẫy: không thẳng hàng) | **hình mới** `duongThang` | `khong-thang-hang`, `lech-nhom` |
| D2 | Trung điểm | SGK (Khám phá b) | MT2 | M1: D, H, E thẳng hàng, DH = HE: "H là trung điểm của đoạn nào?" · M2: chọn điểm là trung điểm trong 3 điểm · M3: DH ≠ HE, chọn đoạn có trung điểm | `duongThang` | `nham-giua-trung-diem`, `lech-nhom` |
| D3 | Đ/S đường gấp khúc | SGK (Hoạt động 1) | MT3 | M1: 3 cm – 3 cm thẳng hàng: Đ hay S · M2: B không thẳng hàng với M, N (bẫy) · M3: N ở giữa B và C nhưng không là trung điểm (3 cm, 2 cm) | **hình mới** `gapKhuc` (đường gấp khúc A–M–B nối B–N–C, lệch hướng) | `nham-giua-trung-diem`, `khong-thang-hang` |
| D4 | Thẳng hàng trên lưới | SGK (Hoạt động 2) | MT1 | Hình chữ H trên lưới: M1 tìm ba điểm thẳng hàng · M2 H ở giữa hai điểm nào · M3 có điểm nhiễu, bẫy không thẳng hàng | **hình mới** `luoiDiem` (lưới ô vuông, điểm có nhãn chữ) | `khong-thang-hang`, `lech-nhom` |
| D5 | Trung điểm trên lưới | SGK (Hoạt động 3, Luyện tập 2) | MT4 | M1: đoạn nằm ngang, đếm ô, 1 điểm nhiễu · M2: đoạn thẳng đứng và nằm ngang, 2–3 điểm nhiễu · M3: hình cánh diều (AC, BD), điểm nhiễu sát trung điểm | `luoiDiem` | `lech-nhom`, `chia-doi-sai` |
| D6 | Trên thước cm | SGK (Luyện tập 1) | MT4 | M1: A ở 0, M ở 3, B ở 6: M có là trung điểm của AB không (Đ/S) · M2: B có là trung điểm của AC không · M3: thước không bắt đầu từ vạch 0 | **hình mới** `thuocCm` | `doc-sai-thuoc`, `nham-giua-trung-diem` |
| D7 | Cào cào nhảy | SGK (Luyện tập 3) | MT5 | M1: thanh chia ô đều, tìm ô trung điểm · M2: đã nhảy 2 bước, cần nhảy thêm mấy bước tới trung điểm · M3: thanh dài hơn, số bước lẻ → hỏi có trung điểm không | **hình mới** `thanhChiaO` (có điểm cào cào) | `chia-doi-sai`, `lech-nhom` |
| D8 | Gập đôi dây | SGK (Luyện tập 4: lấy 10 cm từ dây 20 cm không có thước) | MT5 | Trắc nghiệm chọn cách đúng: M1 dây 20 cm lấy 10 cm · M2 dây khác (16, 24, 30 cm): lấy nửa · M3 lấy 5 cm (gập đôi hai lần) | **hình mới** `dayGap` | `chia-doi-sai`, `nham-giua-trung-diem` |
| D9 | Tính độ dài | **không có trong SGK** | MT2 | M1: DH = a, H là trung điểm: DE = ? · M2: DE = b, tìm HE · M3: hai bước (DE biết, H trung điểm DE, K trung điểm DH: DK = ?) | `duongThang` | `chia-doi-sai`, `cong-thay-nhan` |
| D10 | Đúng / Sai, tìm lỗi | **không có trong SGK** | MT3 | M1: lỗi thô ("B ở giữa nên B là trung điểm") · M2: lỗi tinh (thẳng hàng nhưng AB ≠ BC) · M3: "bạn nói … , đúng hay sai và vì sao" (chọn lý do) | `anh('boy')`, `duongThang` | `nham-giua-trung-diem`, `khong-thang-hang` |

Dạng không có trong SGK: **Tính độ dài, Đúng/Sai** (2 dạng). Tám dạng còn lại là các mục của sách.

Phân bố: MT1 hai dạng (D1, D4) · MT2 hai dạng (D2, D9) · MT3 hai dạng (D3, D10) · MT4 hai dạng (D5, D6) · MT5 hai dạng (D7, D8). Mỗi mục tiêu ≥ 2 dạng.

## 3. Hình mới cần vẽ (viết ngay trong `bai-16.js`, KHÔNG sửa `figures.js`)

Theo quy chuẩn `sk-ve-hinh-tieuhoc`: bảng màu `HM`, `svgHinh`, `nhanTron` / `nhanVien`; mỗi hình là MỘT SVG co theo màn hình; chữ ≥ 14px ở khổ điện thoại;
chữ và nét dùng `currentColor` để thấy ở giao diện Tối; không emoji hệ thống. **Mọi số đo do mã tính**: vị trí điểm tính từ toạ độ, nhãn cm lấy từ chính toạ độ (làm tròn như nhau ở hình và đáp án).

| Hàm | Mô tả | Tham số | Kiểm do mã |
|---|---|---|---|
| `duongThang(diem, nhan)` | Một đường thẳng (đoạn kéo dài) có các điểm nhãn chữ; nhãn độ dài cm giữa hai điểm liền kề; điểm ngoài đường (bẫy) vẽ lệch phía trên. | `diem` = [{ten, x, tren}], `nhan` bật/tắt nhãn cm | `check()` tính "thẳng hàng", "ở giữa", "trung điểm" từ x, không từ nhãn. |
| `gapKhuc(a, b, c)` | Đường gấp khúc A–M–B nối B–N–C, lệch hướng như sách (3 đoạn thẳng hàng, 1 đoạn gấp). | độ dài các đoạn | `check()` tính thẳng hàng từ toạ độ. |
| `luoiDiem(w, h, diem, doan)` | Lưới ô vuông w × h; điểm có nhãn chữ tại giao điểm lưới; vài đoạn nối. | `diem` = [{ten, cot, hang}], `doan` | `check()` tính trung điểm = (x1+x2)/2 trên toạ độ nguyên; chỉ hỏi khi toạ độ nguyên. |
| `thuocCm(diem, dau, cuoi)` | Thước chia cm có vạch và số; các điểm A, B, M, C đặt đúng vạch. | `diem`, đầu và cuối thước | `check()` đọc vạch từ vị trí điểm. |
| `thanhChiaO(n, vitri)` | Thanh chia n ô đều từ A đến B; con cào cào (vẽ đơn giản: thân + hai chân, không emoji) ở vị trí k. | `n`, `vitri` | `check()` tính vị trí trung điểm = n/2; chỉ hỏi khi n chẵn. |
| `dayGap(dai)` | Sợi dây thẳng dài `dai` cm (không có vạch cm); hình gập đôi cho từng phương án. | `dai`, `gap` | `check()` chỉ một phương án cho nửa dây. |

Hình dùng lại từ `figures.js`: `anh('boy')`, `nhanTron`, `nhanVien`, `svgHinh`, `HM`, `xepHang`.

## 4. Nhãn lỗi

- Chuẩn của engine dùng được: `lech-nhom` (đếm sai số ô / bước), `cong-thay-nhan` (cộng thay chia đôi), `dao-vai`.
- **Nhãn riêng của bài 16** (khai báo qua `BAI.loi`):

| Nhãn | Tên hiển thị | Ví dụ lỗi | Gợi ý |
|---|---|---|---|
| `nham-giua-trung-diem` | Nhầm "ở giữa" với "trung điểm" | AB = 3 cm, BC = 2 cm: bé nói B là trung điểm | "Trung điểm phải ở giữa VÀ hai đoạn bằng nhau. Bé so hai độ dài." |
| `khong-thang-hang` | Quên kiểm tra ba điểm có thẳng hàng không | B ở giữa M và N dù ba điểm lệch hướng | "Ba điểm phải nằm trên MỘT đường thẳng mới nói điểm ở giữa." |
| `chia-doi-sai` | Nhầm khi chia đôi độ dài | DE = 12 cm: bé nói HE = 24 cm hoặc 12 cm | "Trung điểm chia đoạn thành hai phần bằng nhau: lấy độ dài chia 2." |
| `doc-sai-thuoc` | Đọc sai vạch trên thước | A ở 0, B ở 6: bé lấy 3 cm nhưng đọc lệch một vạch | "Bé đọc đúng vạch trên thước, rồi tính khoảng cách." |

## 5. Rủi ro đã biết

1. **Toạ độ nguyên**: trung điểm trên lưới và thước chỉ hỏi khi (x1+x2) chẵn; `check()` loại các cặp lẻ.
2. **Điểm nhiễu sát trung điểm** ở M3 của D5 không được trùng đáp án đúng; chặn bằng khoảng cách ≥ 1 ô.
3. **Soát hình**: sáu hình mới phải qua `phong_tranh --soat` với 0 lỗi (nhãn điểm, nhãn cm không đè nhau ở khổ 375px, chữ ≥ 14px).
4. `index.html` dùng CRLF: sửa bằng Python đọc/ghi nhị phân (không `sed -i`), diff đúng 1 dòng.
5. D8 "gập đôi dây" là thao tác thực; làm trắc nghiệm chọn cách đúng thì phương án sai phải thật sự sai (không có hai cách cùng cho nửa dây).
6. `kiem_dem.mjs` có thể báo sai vì `figures.js` trên `main` chưa có `data-dem` (đã biết, không sửa).

## 6. Việc sẽ làm sau khi thầy duyệt

1. Viết `bai-16.js` theo bảng trên (nối chuỗi, **không** backtick hay template literal), chép `bai-16.html`, sửa `index.html` (một dòng).
2. Chạy RIÊNG từng cổng (đặt `CHROME` nếu cần):
   - `node .claude/skills/sk-web-toan-tieuhoc/assets/kiemtra.js . bai-16.js 400000`
   - `node .claude/skills/sk-ve-hinh-tieuhoc/assets/phong_tranh.mjs . <thư mục tạm> bai-16 --soat --khong-chup --rong 375,1200 --giao light,dark --lan 3` → 0 lỗi
   - `node .claude/skills/sk-web-toan-tieuhoc/assets/soat_giao_dien.mjs . bai-16 --cau 2`
3. Push, ghi kết quả từng cổng trong mô tả PR, đổi tiêu đề thành "[XONG] Bài 15–17", gỡ trạng thái nháp. Không tự gộp.

## 7. Cần thầy quyết (kèm phương án đề xuất)

1. **Mục SGK ở mục 0 và bảng dạng** có đúng không? Đề xuất: đúng như bảng.
2. **Thao tác thước/gập dây** đổi thành trắc nghiệm / điền số: đồng ý (**đề xuất**).
3. **Bốn nhãn riêng** (`nham-giua-trung-diem`, `khong-thang-hang`, `chia-doi-sai`, `doc-sai-thuoc`): giữ (**đề xuất**, vì lỗi khái niệm hình học không khớp nhãn chuẩn) hay gom về `lech-nhom`?
4. **Sáu hình mới** viết trong `bai-16.js`: đồng ý. Con cào cào ở D7 vẽ đơn giản (thân + chân) hay chỉ một dấu chấm có nhãn? Đề xuất: **hình đơn giản**, nếu soát hình không qua thì đổi sang dấu chấm.
5. Xếp lại thứ tự dạng theo sư phạm như bài 9–14 (**đề xuất**).
6. Xác nhận 10 dạng và 2 dạng "không có trong SGK".
