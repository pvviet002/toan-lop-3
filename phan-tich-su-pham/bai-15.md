# Phân tích sư phạm — Bài 15: Luyện tập chung (BÀI MỚI — BẢN NHÁP CHỜ DUYỆT)

Mẫu: `bai-11.js` (Luyện thông minh từ đầu) + khối "LUYỆN THÔNG MINH" ở đầu `engine.js`.
Phạm vi: tạo mới `bai-15.js`, `bai-15.html` (chép từ `assets/bai-template.html`), thêm 15 vào `AVAILABLE` trong `index.html` (giữ CRLF, diff đúng 1 dòng)
và file phân tích này. Không đụng `engine.js`, `figures.js`, `lua.js`. Bài mới **không** thêm vào `chua_chuan.txt`: `phong_tranh --soat` phải 0 lỗi. Chưa viết dòng mã nào.

## 0. Nguồn và điều cần lưu ý

- Cấu trúc mục SGK (trang in 46–48) lấy từ **bản tóm tắt của phiên Claude trên máy thầy** (đã đọc sách); phiên đám mây chưa tự đối chiếu sách.
  Không chép nguyên văn đề vào repo; dưới đây chỉ ghi dạng bài, dải số và ý.
- Bài này là **Luyện tập chung** nên trộn ôn tập: nhân, chia bảng 3–10, tìm thành phần, so sánh kết quả, một phần mấy, giải toán.
- **Engine hiện chỉ chấm trắc nghiệm MỘT đáp án đúng** (`correct` là một chỉ số; không có chọn nhiều). Hai mục SGK cho chọn **nhiều** đáp án
  (Tiết 1 LT2 "những phép tính nào có kết quả bé hơn 8"; Tiết 2 LT3a "đã tô 1/5 những hình nào"). Cách xử lý (cần thầy quyết, câu hỏi 2):
  chuyển thành **câu đếm** ("có bao nhiêu phép tính / hình thoả điều kiện?", trả lời bằng số, như dạng "Chọn bóng" ở bài 10) và câu **chọn một**
  ("phép tính nào KHÔNG thoả điều kiện?"). Không sửa engine.
- **Trò chơi "Cầu thang – cầu trượt"** (bàn cờ, đúng mới được đi): engine không có bàn cờ. Giữ **ý cốt lõi** "mỗi ô một phép tính, đúng hay sai" thành dạng Đ/S (D3). Không dựng bàn cờ.

## 1. Năm mục tiêu (muctieu) × ba mức (Thông tư 27)

| MT | Tên | Mức 1 — Nhận biết | Mức 2 — Hiểu | Mức 3 — Vận dụng |
|---|---|---|---|---|
| MT1 | Nhân, chia trong các bảng | Nhân nhẩm bảng 3–5; nhận ra cụm "nhân → đổi chỗ → hai phép chia". | Nhân nhẩm bảng 3–10; điền ô trống trong cụm bốn phép tính; Đ hay S. | Từ một phép nhân suy ra các phép còn lại; tìm lỗi trong phép tính. |
| MT2 | Tìm thành phần chưa biết | Tìm thừa số, số bị chia, số chia, bảng 3–5. | Tìm số trên mũi tên (cả ô đầu lẫn số ở giữa mũi tên); tam giác số tìm ô tích. | Tam giác số: tìm đỉnh từ các tích; mũi tên hai ẩn. |
| MT3 | So sánh kết quả | So sánh kết quả một phép tính với một số, kết quả khác xa số đó. | Đếm số phép tính có kết quả bé hơn một số; kết quả gần số đó. | Đếm số phép tính thoả HAI điều kiện (lớn hơn a và bé hơn b). |
| MT4 | Một phần mấy | Nhận ra hình tô màu 1/n, các hình khác hẳn nhau. | Tìm một phần mấy của số vật xếp thành hàng, cột; hình có số phần gần nhau. | Hình có số phần khác số tô (bẫy: 6 phần mà hỏi 1/5); tìm hai phân số khác nhau cùng một nhóm vật. |
| MT5 | Giải toán | Bài toán một phép nhân với số nhỏ, có hình để đếm. | Nhân hoặc chia theo nhóm với bảng 3–10; chọn phép tính. | Bài toán hai bước; chọn biểu thức hai bước. |

Tham số engine: `goal:10, soCau:18, soCauToiDa:24`. 5 mục tiêu × tối thiểu 3 câu = 15 ≤ 18.

## 2. Mười hai dạng (topics) — xếp theo mạch sư phạm

"Nguồn": **SGK** = có trong sách (mục ghi trong ngoặc) · **không có trong SGK** = dạng thêm.

| # | Dạng | Nguồn | MT | Mức 1 / Mức 2 / Mức 3 | Hình | Nhãn lỗi chính |
|---|---|---|---|---|---|---|
| D1 | Nhân nhẩm | SGK (Tiết 1 — LT1) | MT1 | M1: bảng 3–5 · M2: bảng 3–10, cả k × b · M3: "biết a × b = P, vậy (a+1) × b = ?" | chữ | `canh-dong`, `cong-thay-nhan`, `nham-bang` |
| D2 | Cụm bốn phép tính | SGK (Tiết 2 — LT1) | MT1 | M1: điền kết quả phép nhân, thừa số nhỏ · M2: điền ô trống trong cụm (đổi chỗ, hai phép chia) · M3: biết MỘT phép, viết ba phép còn lại (chọn đúng cụm) | chữ, MCQ | `dao-vai`, `cong-thay-nhan`, `chon-sai-phep` |
| D3 | Đ/S phép tính | **không có trong SGK** (ý của trò chơi cầu thang) | MT1 | M1: lỗi thô (cộng thay nhân) · M2: lỗi tinh (nhầm dòng, nhầm bảng) · M3: "bạn tính sai ở đâu, kết quả đúng là?" | `anh('boy')` | `cong-thay-nhan`, `canh-dong`, `nham-bang` |
| D4 | Tìm thành phần | **không có trong SGK** (theo bài 13) | MT2 | M1: bảng 3–5 · M2: bảng 3–10, ô trống ở cả hai vị trí · M3: vế phải là một phép tính | chữ | `chon-sai-phep`, `cong-thay-nhan`, `dao-vai` |
| D5 | Mũi tên | SGK (Tiết 1 — LT3) | MT2 | M1: tìm ô đầu, nhân hoặc chia · M2: tìm SỐ TRÊN MŨI TÊN (4 × ? → 36; 35 : ? → 5) · M3: cả hai kiểu, bảng 6–10 | `soDo` (ô `?`, phép tính có `?`) | `chon-sai-phep`, `dao-vai`, `canh-dong` |
| D6 | Tam giác số | SGK (Tiết 1 — LT5) | MT2 | M1: biết hai đỉnh, tìm tích (bảng 2–5) · M2: tìm tích bảng 2–9, hoặc tìm đỉnh từ một tích và một đỉnh · M3: biết một đỉnh và hai tích, tìm đỉnh còn lại | **hình mới** `tamGiacSo` | `chon-sai-phep`, `cong-thay-nhan`, `dao-vai` |
| D7 | Phép chia bé hơn số | SGK (Tiết 1 — LT2, đổi từ chọn nhiều) | MT3 | M1: 3 phép, đếm số phép có kết quả bé hơn N, kết quả khác xa · M2: 4–5 phép, kết quả gần N (có phép bằng N) · M3: HAI điều kiện (lớn hơn a, bé hơn b) | chữ trong thẻ (không hình) | `lech-nhom` |
| D8 | So sánh | **không có trong SGK** | MT3 | M1: phép tính với số · M2: hai phép tính khác bảng · M3: hai bước | chữ, MCQ | `sai-buoc` |
| D9 | Hình tô 1/n | SGK (Tiết 2 — LT3a, đổi từ chọn nhiều) | MT4 | M1: chọn hình tô 1/5 trong các hình khác hẳn nhau · M2: các hình có 4, 5, 6 phần · M3: BẪY hình 6 phần mà hỏi 1/5, hình các phần không bằng nhau | **hình mới** `hinhNam` (chữ thập 5 ô, lục giác chia 6, ngôi sao 5 cánh) | `lech-nhom`, `phan-khong-bang` |
| D10 | Một phần mấy số vật | SGK (Tiết 2 — LT3b) | MT4 | M1: 12 vật, 1/n của số vật với n nhỏ · M2: lưới nhiều vật (như 18 con xếp 3 hàng × 6): 1/6, 1/9 của số vật · M3: HAI phân số cùng một nhóm vật (1/6 và 1/9), tìm hiệu | **hình mới** `luoiVat` (chấm xếp hàng, đếm được) | `dao-vai`, `chon-sai-phep`, `lech-nhom` |
| D11 | Giải toán | SGK (Tiết 1 — LT4; Tiết 2 — LT2) | MT5 | M1: xếp li vào các bàn, mỗi bàn m cái → tất cả (nhân, có hình) · M2: chia theo nhóm (45 hoa, mỗi lọ 9 bông → mấy lọ) · M3: hai bước | **hình mới** `banLi` (bàn có li) | `cong-thay-nhan`, `chon-sai-phep`, `thieu-buoc` |
| D12 | Chọn phép tính | **không có trong SGK** | MT5 | M1: chọn phép nhân · M2: chọn phép chia · M3: chọn biểu thức hai bước | `banLi`, `anh('bouquet')` | `chon-sai-phep`, `cong-thay-nhan`, `dao-vai` |

Dạng không có trong SGK: **Đ/S phép tính, Tìm thành phần, So sánh, Chọn phép tính** (4 dạng). Tám dạng còn lại là các mục của sách.

Phân bố: MT1 ba dạng (D1–D3) · MT2 ba dạng (D4–D6) · MT3 hai dạng (D7, D8) · MT4 hai dạng (D9, D10) · MT5 hai dạng (D11, D12). Mỗi mục tiêu ≥ 2 dạng.

## 3. Hình mới cần vẽ (viết ngay trong `bai-15.js`, KHÔNG sửa `figures.js`)

Theo quy chuẩn `sk-ve-hinh-tieuhoc`: bảng màu `HM`, `svgHinh`, `nhanTron` / `nhanVien`, `xepHang`; mỗi hình là MỘT SVG co theo màn hình;
chữ ≥ 14px ở khổ điện thoại; chữ và nét dùng `currentColor` để thấy ở giao diện Tối; không emoji hệ thống; vật phải đếm thì gắn `data-dem`.

| Hàm | Mô tả | Tham số | Kiểm do mã |
|---|---|---|---|
| `tamGiacSo(dinh, tich, an)` | Tam giác có 3 đỉnh là 3 hình tròn (nhãn số), ô vuông ở giữa mỗi cạnh ghi TÍCH hai đỉnh; `an` = vị trí ô hoặc đỉnh hiện `?`. | `dinh` = [a, b, c]; `tich` tự tính = [a·b, b·c, c·a] | `check()` tính lại tích từ ba đỉnh; đáp án `?` khớp. |
| `hinhNam(loai, s)` | Hình chia 5 phần bằng nhau tô một phần, các kiểu: chữ thập 5 ô, ngôi sao 5 cánh tô một cánh; hình bẫy: lục giác chia 6 phần tô một phần. | `loai`, `s` = phần được tô | Số phần bằng nhau lấy từ hàm vẽ; chỉ MỘT hình trong lựa chọn có đúng n phần. |
| `luoiVat(r, c)` | Lưới r hàng × c cột vật xếp đều (chấm, hoặc hình con vật vẽ đơn giản không emoji) để lấy 1/n của số vật. | `r`, `c` | `data-dem` bằng r × c; `check()` chia hết. |
| `banLi(soBan, moiBan)` | Các bàn (hình chữ nhật bo góc), mỗi bàn có `moiBan` cái li (hình tròn nhỏ), đếm được. | `soBan`, `moiBan` | `data-dem` li = soBan × moiBan. |

Hình dùng lại từ `figures.js`: `soDo` (mũi tên), `xepHang`, `anh('boy')`, `anh('bouquet')`, `nhanTron`, `nhanVien`, `HM`.

## 4. Nhãn lỗi

- Dùng 8 nhãn chuẩn của engine: `canh-dong`, `nham-bang`, `cong-thay-nhan`, `sai-buoc`, `chon-sai-phep`, `lech-nhom`, `dao-vai`, `thieu-buoc`.
- Thêm một nhãn riêng qua `BAI.loi`: **`phan-khong-bang`** = "Quên kiểm tra các phần có bằng nhau không" (cùng nghĩa với bài 14; D9 M3).
- Bẫy riêng của bài: hình lục giác chia 6 phần mà hỏi 1/5 → nhãn `lech-nhom` ("đếm lệch số phần").
- D5 M2 (số trên mũi tên): lỗi hay gặp là lấy tích hoặc thương thay cho số trên mũi tên: `dao-vai`; nhân thay chia: `chon-sai-phep`.

## 5. Rủi ro đã biết

1. Engine không chấm chọn nhiều: đã đổi thành câu đếm và câu chọn một (mục 0).
2. Soát hình: bốn hình mới phải qua `phong_tranh --soat` với 0 lỗi (bài mới không được vào `chua_chuan.txt`); chú ý chữ ≥ 14px ở nhãn ô vuông của tam giác số khi khổ 375px.
3. `index.html` dùng CRLF: sửa bằng Python đọc/ghi nhị phân (không `sed -i`), `git diff --stat index.html` phải đúng 1 dòng đổi.
4. D7 mức 3 (hai điều kiện) cần bảo đảm đáp số đếm nằm trong 1..4 và các phép tính đều nguyên.
5. `kiem_dem.mjs` có thể báo sai vì `figures.js` trên `main` chưa có `data-dem` (đã biết, không sửa).

## 6. Việc sẽ làm sau khi thầy duyệt

1. Viết `bai-15.js` theo bảng trên (nối chuỗi, **không** backtick hay template literal), chép `bai-15.html`, sửa `index.html` (một dòng).
2. Chạy RIÊNG từng cổng (đặt `CHROME` nếu cần):
   - `node .claude/skills/sk-web-toan-tieuhoc/assets/kiemtra.js . bai-15.js 400000`
   - `node .claude/skills/sk-ve-hinh-tieuhoc/assets/phong_tranh.mjs . <thư mục tạm> bai-15 --soat --khong-chup --rong 375,1200 --giao light,dark --lan 3` → 0 lỗi
   - `node .claude/skills/sk-web-toan-tieuhoc/assets/soat_giao_dien.mjs . bai-15 --cau 2`
3. Push, ghi kết quả từng cổng trong mô tả PR, đổi tiêu đề thành "[XONG] Bài 15–17", gỡ trạng thái nháp. Không tự gộp.

## 7. Cần thầy quyết (kèm phương án đề xuất)

1. **Mục SGK ở mục 0 và bảng dạng** có đúng không? Đề xuất: đúng như bảng.
2. **Chọn nhiều đáp án** (Tiết 1 LT2, Tiết 2 LT3a): đổi thành câu **đếm** + câu **chọn một** (**đề xuất**), hay thầy muốn nâng engine để hỗ trợ chọn nhiều (việc riêng, sửa `engine.js`)?
3. **Trò chơi Cầu thang – cầu trượt**: bỏ bàn cờ, giữ ý "đúng mới đi" thành dạng Đ/S (**đề xuất**).
4. **Bốn hình mới** (`tamGiacSo`, `hinhNam`, `luoiVat`, `banLi`) viết trong `bai-15.js`: đồng ý. Hình con ếch ở LT3b dùng chấm hoặc hình con vật vẽ đơn giản? Đề xuất: **chấm tròn xếp lưới** (đếm rõ, không phụ thuộc hình vẽ khó).
5. Xếp lại thứ tự dạng theo sư phạm như bài 9–14 (**đề xuất**).
6. Xác nhận 12 dạng và 4 dạng "không có trong SGK".
