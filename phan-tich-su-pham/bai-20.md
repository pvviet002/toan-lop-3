# Phân tích sư phạm — Bài 20: Thực hành vẽ góc vuông, đường tròn, hình vuông, hình chữ nhật và vẽ trang trí (BÀI MỚI — BẢN NHÁP CHỜ DUYỆT)

Mẫu: `bai-16.js`, `bai-17.js` (bài hình học mới, có hình riêng trong file) + khối "LUYỆN THÔNG MINH" ở đầu `engine.js`.
Phạm vi: tạo mới `bai-20.js`, `bai-20.html` (chép từ `assets/bai-template.html`), thêm 20 vào `AVAILABLE` trong `index.html` (giữ CRLF, diff đúng 1 dòng)
và file phân tích này. Không đụng `engine.js`, `figures.js`, `lua.js`. Bài mới **không** thêm vào `chua_chuan.txt`: `phong_tranh --soat` phải 0 lỗi. Chưa viết dòng mã nào.

Bài 20 là **bài thực hành** (hai tiết, hai trang sách): bé vẽ, gấp, ghép, tô màu bằng tay. Web **không có công cụ vẽ**, nên toàn bài là **chuyển thể** thành nhận ra hình vẽ đúng, đếm, chọn.
Dùng **5 mục tiêu** × 13 dạng.

## 0. Nguồn và điều cần lưu ý

- Cấu trúc mục SGK (trang in 61–62) lấy từ **bản tóm tắt của phiên Claude trên máy thầy**; phiên đám mây chưa tự đối chiếu sách.
  Không chép nguyên văn đề; chỉ ghi dạng bài và ý.
- **Bảng chuyển thể và bỏ** (mục nào đổi thành gì, mục nào bỏ):

| Mục SGK | Việc bé làm trong sách | Trên web |
|---|---|---|
| Tiết 1, HĐ1 | Vẽ góc vuông đỉnh A cạnh AB, AC; vẽ đường tròn tâm I | **Chuyển thể**: chọn hình vẽ đúng (D1, D2) |
| Tiết 1, HĐ2 | Tự gấp ê ke giấy (gấp đôi, gấp đôi tiếp) | **Chuyển thể**: chọn cách gấp cho hai nếp vuông góc (D3) |
| Tiết 1, HĐ2a | Kiểm tra góc vuông bằng ê ke giấy | **Chuyển thể**: Có / Không với hình ê ke áp vào góc (D4) |
| Tiết 1, HĐ2b | Hình ngũ giác cụt một góc có mấy góc vuông | **Giữ**: đếm góc vuông (D5) |
| Tiết 1, HĐ3 | Vẽ hình chữ nhật, hình vuông trên lưới theo mẫu | **Chuyển thể**: chọn hình vẽ đúng theo mẫu (D6) và đếm ô (D7) |
| Tiết 2, HĐ1 | Tự vẽ hình em thích ghép từ hình vuông, hình chữ nhật (tàu hoả, ngôi nhà, rô-bốt) | **Chuyển thể**: đếm số hình vuông, hình chữ nhật tạo nên hình ghép (D8, D9). **Bỏ phần tự vẽ hình em thích** (sản phẩm tự do, không chấm được) |
| Tiết 2, HĐ2 | Vẽ trang trí từ các đường tròn rồi tô màu | **Chuyển thể**: tâm đường tròn thứ hai nằm ở đâu (D10), chọn hình đúng ở bước 2, bước 3 (D11), đếm số phần để tô (D12). **Bỏ phần tô màu** (không chấm được) |

- **Mọi số đo, góc, tâm, số phần do mã tính từ toạ độ**; `check()` tính lại, không tin nhãn.
- **Số thập phân cấm**: mọi độ dài là số nguyên (ô).
- **Hình mới viết trong `bai-20.js`**, không sửa `figures.js`. Một số hàm hình giống bài 17 và bài 18 nhưng **chép sang** `bai-20.js` (mỗi bài đứng riêng, không phụ thuộc bài khác).

## 1. Năm mục tiêu (muctieu) × ba mức (Thông tư 27)

| MT | Tên | Mức 1 — Nhận biết | Mức 2 — Hiểu | Mức 3 — Vận dụng |
|---|---|---|---|---|
| MT1 | Nhận ra hình vẽ đúng: góc vuông, đường tròn | Hình nào vẽ đúng góc vuông; hình nào có tâm I. | Góc lệch (≥ 12°) là bẫy; tâm lệch ra khỏi giữa hình tròn. | Đỉnh sai chỗ; tâm I nằm trên đường tròn (bẫy); Đ/S tìm lỗi. |
| MT2 | Ê ke giấy và góc vuông | Hai nếp gấp vuông góc cho ê ke giấy; ê ke khít góc. | Ê ke hở ít; đếm góc vuông của hình đơn giản. | Ngũ giác cụt một góc: đếm góc vuông (3); phân biệt với góc ở chỗ cụt. |
| MT3 | Hình vuông, hình chữ nhật trên lưới | Chọn hình đúng theo mẫu; đếm ô một cạnh. | Mẫu chiều dài, chiều rộng khác nhau; hình đổi chỗ dài, rộng là bẫy. | Hai hình cùng số ô nhưng khác dạng (hình vuông và hình chữ nhật). |
| MT4 | Hình ghép từ hình vuông, hình chữ nhật | Đếm hình vuông trong tàu hoả (hoặc hình chữ nhật). | Đếm hình chữ nhật không kể hình vuông (rô-bốt); đếm góc vuông của các khối. | Hiệu hai loại hình; nhiều khối. |
| MT5 | Vẽ trang trí từ đường tròn | Tâm đường tròn thứ hai nằm trên đường tròn thứ nhất. | Chọn hình đúng ở bước 2; đếm phần của hai đường tròn. | Chọn hình đúng ở bước 3; đếm phần của ba đường tròn. |

Tham số engine: `goal:10, soCau:18, soCauToiDa:24`. 5 mục tiêu × tối thiểu 3 câu = 15 ≤ 18.

## 2. Mười ba dạng (topics) — xếp theo mạch sư phạm

"Nguồn": **SGK** = có trong sách (mục ghi trong ngoặc) · **không có trong SGK** = dạng thêm.

| # | Dạng | Nguồn | MT | Mức 1 / Mức 2 / Mức 3 | Hình | Nhãn lỗi chính |
|---|---|---|---|---|---|---|
| D1 | Góc vuông vẽ đúng | SGK (Tiết 1, HĐ1) | MT1 | M1: ba hình, chọn hình vẽ đúng "góc vuông đỉnh A, cạnh AB, AC" (hai hình khác hẳn) · M2: có góc lệch ≥ 12° · M3: góc vuông nhưng đỉnh là B (đúng góc, sai đỉnh) | **hình mới** `gocVe` | `goc-gan-vuong`, `nham-dinh-canh` |
| D2 | Đường tròn tâm I | SGK (Tiết 1, HĐ1) | MT1 | M1: chọn hình tròn có chấm tâm I ở giữa · M2: chấm lệch ra khỏi giữa · M3: chấm I nằm trên đường tròn (đó là điểm trên đường tròn, không phải tâm) | **hình mới** `tronTamI` | `tam-lech`, `lech-nhom` |
| D3 | Gấp ê ke giấy | SGK (Tiết 1, HĐ2) | MT2 | M1: hai nếp gấp nào vuông góc (ba hình tờ giấy với hai nếp) · M2: nếp thứ hai lệch ≥ 12° · M3: nếp gấp thứ hai không đi qua điểm của nếp thứ nhất (hình sai) | **hình mới** `nepGap` | `goc-gan-vuong`, `lech-nhom` |
| D4 | Ê ke giấy khít hay hở | SGK (Tiết 1, HĐ2a) | MT2 | M1: ê ke khít hai cạnh (Có / Không "Đây là góc vuông?") · M2: hở ít · M3: không có ê ke, góc gần vuông | `gocVe` có ê ke | `goc-gan-vuong`, `lech-nhom` |
| D5 | Ngũ giác cụt một góc | SGK (Tiết 1, HĐ2b) | MT2 | M1: hình chữ nhật, đếm góc vuông (4) · M2: hình thang vuông (2), tam giác vuông (1) · M3: ngũ giác cụt một góc (3), tam giác cân cao hẹp (0). Đáp bằng số | `hinhPhang` | `dem-sot-goc`, `lech-nhom` |
| D6 | Hình vẽ đúng theo mẫu | SGK (Tiết 1, HĐ3) | MT3 | M1: mẫu hình vuông cạnh n ô: chọn hình đúng (ba hình khác hẳn) · M2: mẫu hình chữ nhật dài a ô, rộng b ô: có hình đổi dài, rộng · M3: hai hình cùng số ô, một vuông một chữ nhật | **hình mới** `luoiMau` | `doi-dai-rong`, `lech-nhom` |
| D7 | Đếm ô trên lưới | SGK (Tiết 1, HĐ3: đo) | MT3 | M1: hình vuông, cạnh bao nhiêu ô · M2: hình chữ nhật, chiều dài, chiều rộng · M3: chiều dài hơn chiều rộng bao nhiêu ô. Đáp bằng số | `luoiMau` | `lech-nhom`, `cong-thay-nhan` |
| D8 | Đếm hình trong hình ghép | SGK (Tiết 2, HĐ1) | MT4 | M1: tàu hoả, đếm hình vuông · M2: rô-bốt, đếm hình chữ nhật (không kể hình vuông) · M3: ngôi nhà, hình chữ nhật nhiều hơn hình vuông bao nhiêu. Đáp bằng số | **hình mới** `hinhGhepKhoi` | `dem-sot-hinh`, `nham-hv-hcn` |
| D9 | Góc vuông trong hình ghép | **không có trong SGK** | MT4 | M1: tàu hoả có a toa là a hình chữ nhật: tất cả có mấy góc vuông (4 góc mỗi toa) · M2: rô-bốt, tính góc vuông của các khối · M3: ngôi nhà, đếm các khối rồi nhân 4 (mái tam giác có 0 góc vuông). Đáp bằng số | `hinhGhepKhoi` | `dem-sot-goc`, `cong-thay-nhan` |
| D10 | Tâm đường tròn thứ hai | SGK (Tiết 2, HĐ2 bước 2) | MT5 | M1: tâm đường tròn thứ hai đặt ở đâu: trong, trên hay ngoài đường tròn thứ nhất (chọn một) · M2: chọn điểm trên hình · M3: bán kính khác nhau, tâm vẫn nằm trên đường tròn thứ nhất | **hình mới** `trangTri` | `tam-lech`, `lech-nhom` |
| D11 | Hình đúng ở bước 2, bước 3 | SGK (Tiết 2, HĐ2) | MT5 | M1: bước 2, ba hình (tâm trên, trong, ngoài) · M2: bước 2 có hai hình gần giống · M3: bước 3, tâm đường tròn thứ ba nằm trên đường tròn thứ nhất hoặc thứ hai | `trangTri` | `tam-lech`, `lech-nhom` |
| D12 | Đếm số phần | SGK (Tiết 2, HĐ2: tô màu → đếm phần) | MT5 | M1: hai đường tròn bán kính bằng nhau, tâm cái này trên cái kia: có mấy phần (3) · M2: bước 3, hình ba đường tròn: có mấy phần · M3: thêm đường tròn thứ tư. Đáp bằng số; `check()` đếm bằng cách quét điểm và tính thành phần liên thông | `trangTri` | `dem-sot-phan`, `lech-nhom` |
| D13 | Đúng / Sai tìm lỗi | **không có trong SGK** | MT1, MT2 | M1: mệnh đề ("Hai nếp gấp vuông góc cho ê ke giấy." — Đ) · M2: "Chấm I nằm trên đường tròn nên I là tâm." — S · M3: "Bạn An nói …"; chọn lý do sai | `anh('boy')`, `gocVe`, `tronTamI` | `goc-gan-vuong`, `tam-lech` |

Dạng không có trong SGK: **Góc vuông trong hình ghép** (D9), **Đúng / Sai tìm lỗi** (D13). Mười một dạng còn lại bám các mục của sách (một số dạng tách từ một mục).

Phân bố: MT1 ba dạng (D1, D2, D13) · MT2 ba dạng (D3, D4, D5, cộng D13) · MT3 hai dạng (D6, D7) · MT4 hai dạng (D8, D9) · MT5 ba dạng (D10, D11, D12). Mỗi mục tiêu ≥ 2 dạng.

### Luật lời câu hỏi (áp dụng cho cả bài)

- Nút **Đúng / Sai** chỉ đi với **mệnh đề**. Câu "… có … không?" dùng nút **Có / Không**.
- Đáp án nhiễu **không chứa chính đối tượng đang hỏi** (hỏi "tâm I" thì phương án không dùng "I" như điểm nhiễu khác).

## 3. Hình mới cần vẽ (viết ngay trong `bai-20.js`, KHÔNG sửa `figures.js`)

Theo quy chuẩn `sk-ve-hinh-tieuhoc`: bảng màu `HM`, `svgHinh`, `nhanTron` / `nhanVien`; mỗi hình là MỘT SVG co theo màn hình; chữ ≥ 14px ở khổ điện thoại;
nét và chữ dùng `currentColor`; nét thẳng có `fill="none"`; không emoji hệ thống. **Vật để ĐẾM mang `data-dem` và các vật đếm không đè nhau.**

| Hàm | Mô tả | Tham số | Kiểm do mã |
|---|---|---|---|
| `gocVe(g, eke)` | Một góc (đỉnh, hai tia có chấm nhãn); tuỳ chọn có ê ke giấy áp vào (tam giác vuông nhạt); dùng ở D1, D4, D13. | `g`, `eke` | `check()` tính góc từ toạ độ: vuông khi tích vô hướng bằng 0, "gần vuông" lệch ≥ 12°. |
| `tronTamI(spec)` | Đường tròn với chấm I (ở tâm, lệch tâm hoặc trên đường tròn) và nhãn I; tên hình A, B, C. | `spec` = {I: 'tam' / 'lech' / 'tren'} | `check()` tính khoảng cách chấm I đến tâm đường tròn từ toạ độ. |
| `nepGap(spec)` | Tờ giấy (hình chữ nhật) có hai nếp gấp là hai nét đứt cắt nhau tại một điểm; có thể lệch góc hoặc không cắt. | `spec` = góc giữa hai nếp | `check()` tính góc giữa hai nếp từ toạ độ. |
| `luoiMau(w, h, hinh)` | Lưới ô vuông (28 đơn vị/ô); hình mẫu một bên, các hình để chọn một bên (ba hình nhỏ có nhãn A, B, C). | `hinh` | `check()` đếm ô từ toạ độ: cạnh, dài, rộng, vuông, chữ nhật. |
| `hinhGhepKhoi(ten)` | Tàu hoả, rô-bốt, ngôi nhà ghép từ **khối rời**: mỗi khối hình vuông hoặc chữ nhật là một hình, đặt cạnh nhau, **không chồng lên nhau** (khe nhỏ giữa các khối); mái nhà là tam giác (không đếm). Hình vuông `data-dem="hv"`, hình chữ nhật `data-dem="hcn"`. | `ten` | `check()` đếm `data-dem` trong chuỗi SVG, bằng số khối mà đáp án dựa vào; từng khối: vuông khi cạnh bằng nhau. |
| `trangTri(buoc, r, tam)` | Một, hai, ba (hoặc bốn) đường tròn bán kính (nguyên, đơn vị) cho trước; mỗi tâm là chấm nhỏ có nhãn; tô nhạt từng vòng. | `buoc`, `r`, `tam` | `check()` tính "tâm nằm trên đường tròn" từ khoảng cách; đếm số phần bằng quét điểm, thành phần liên thông (4 hướng). |
| `hinhPhang(poly)` | Đa giác lồi (chép từ bài 18): hình chữ nhật, thang vuông, tam giác vuông, tam giác cân cao hẹp, ngũ giác cụt một góc; **không đánh dấu** góc vuông. | `poly` | `check()` đếm đỉnh có góc trong đúng 90° từ toạ độ. |

Hình dùng lại từ `figures.js`: `anh('boy')`, `nhanTron`, `nhanVien`, `svgHinh`, `HM`.

## 4. Nhãn lỗi

- Chuẩn của engine dùng được: `lech-nhom`, `cong-thay-nhan`, `dao-vai`.
- **Nhãn riêng của bài 20** (khai báo qua `BAI.loi`):

| Nhãn | Tên hiển thị | Ví dụ lỗi | Gợi ý |
|---|---|---|---|
| `goc-gan-vuong` | Nhầm góc gần vuông là góc vuông | Hai nếp gấp lệch 15° chọn là vuông góc | "Gần vuông vẫn chưa vuông. Bé dùng ê ke: hở một chút thì không phải góc vuông." |
| `nham-dinh-canh` | Nhầm đỉnh với cạnh | Góc vuông nhưng đỉnh là B thay vì A | "Đỉnh là điểm chung của hai cạnh. Bé đọc kỹ đề: đỉnh A, cạnh AB, AC." |
| `tam-lech` | Nhầm tâm đường tròn | Chấm I lệch hoặc nằm trên đường tròn mà chọn là tâm | "Tâm cách đều mọi điểm trên đường tròn: nằm chính giữa, không nằm trên đường tròn." |
| `doi-dai-rong` | Đổi chỗ chiều dài và chiều rộng | Mẫu dài 5 ô rộng 3 ô, bé chọn hình dài 3 ô rộng 5 ô | "Bé đếm ô theo hàng ngang (chiều dài) rồi theo cột dọc (chiều rộng)." |
| `dem-sot-hinh` | Đếm sót hoặc thừa hình | Rô-bốt: bé quên hai tay hoặc đếm cả hình vuông là hình chữ nhật | "Bé đếm từng khối một, đánh dấu từng khối đã đếm." |
| `dem-sot-goc` | Đếm sót hoặc thừa góc vuông | Ngũ giác cụt góc: bé đếm cả góc ở chỗ cụt | "Bé thử ê ke ở từng đỉnh. Chỗ cụt không phải góc vuông." |
| `nham-hv-hcn` | Nhầm hình vuông với hình chữ nhật (khi đếm) | Hỏi "hình chữ nhật không kể hình vuông" nhưng bé đếm cả hình vuông | "Hình vuông cũng có 4 góc vuông, nhưng ở câu này bé chỉ đếm hình chữ nhật dài hơn rộng." |
| `dem-sot-phan` | Đếm sót hoặc thừa phần | Hai đường tròn chồng nhau: bé đếm 2 phần thay vì 3 | "Bé đếm cả phần chung của hai đường tròn." |

## 5. Rủi ro đã biết

1. **Không có công cụ vẽ**: toàn bộ chuyển thể. Thầy cần xác nhận hướng chuyển thể (mục 7).
2. **Hình ghép khối rời**: các khối không chồng nhau để `phong_tranh` không báo đè `data-dem`; ngôi nhà ghép từ khối rời (tường chia thành ba khối quanh cửa) khác mẫu sách. Nêu rõ cho thầy xem trước.
3. **Đếm phần của các đường tròn** (D12): dùng quét điểm và thành phần liên thông; bộ sinh chỉ chọn các cấu hình (bán kính bằng nhau, tâm nằm trên đường tròn kia) có đáp án ổn định (kiểm thử trên 10 000 mẫu).
4. **Ê ke giấy khít, ê ke xanh nhạt chìm ở giao diện Tối**: lót nét viền; soát hình sáng và tối.
5. **Nhãn không sát biên**: font Linux hẹp hơn Segoe UI; nhãn cách nhau ≥ 2 cm / đủ khoảng; thầy soát lại hình học trên máy thầy.
6. `index.html` dùng CRLF: sửa bằng Python đọc/ghi nhị phân (không `sed -i`), diff đúng 1 dòng.
7. `kiem_dem.mjs` báo sai vì `figures.js` trên `main` chưa có `data-dem` (đã biết, không sửa); các `data-dem` của bài 20 do `check()` đếm lại.

## 6. Việc sẽ làm sau khi thầy duyệt

1. Viết `bai-20.js` theo bảng trên (nối chuỗi, **không** backtick hay template literal), chép `bai-20.html`, sửa `index.html` (một dòng).
2. Chạy RIÊNG từng cổng (đặt `CHROME` nếu cần):
   - `node .claude/skills/sk-web-toan-tieuhoc/assets/kiemtra.js . bai-20.js 400000`
   - `node .claude/skills/sk-ve-hinh-tieuhoc/assets/phong_tranh.mjs . <thư mục tạm> bai-20 --soat --khong-chup --rong 375,1200 --giao light,dark --lan 3` → 0 lỗi
   - `node .claude/skills/sk-web-toan-tieuhoc/assets/soat_giao_dien.mjs . bai-20 --cau 2`
3. Tự soi ảnh phòng tranh các dạng hình mới, push, ghi kết quả từng cổng trong mô tả PR, đổi tiêu đề thành "[XONG] Bài 20", gỡ trạng thái nháp. Không tự gộp.

## 7. Cần thầy quyết (kèm phương án đề xuất)

1. **Bảng chuyển thể và bỏ ở mục 0** có đúng ý thầy không? Đề xuất: bỏ phần tự vẽ hình em thích và phần tô màu; mọi thao tác khác đổi thành chọn, đếm.
2. **Ngôi nhà ghép từ khối rời** (tường chia quanh cửa) thay vì cửa vẽ đè trên tường: đồng ý (**đề xuất**), để các khối không chồng nhau.
3. **Đếm phần (D12)** thay cho tô màu: đồng ý (**đề xuất**); bước 3 có ba đường tròn bằng nhau, tâm nằm trên nhau.
4. **Tám nhãn riêng** (`goc-gan-vuong`, `nham-dinh-canh`, `tam-lech`, `doi-dai-rong`, `dem-sot-hinh`, `dem-sot-goc`, `nham-hv-hcn`, `dem-sot-phan`): giữ (**đề xuất**), hay gom bớt về `lech-nhom`?
5. **Chép các hàm hình** (`hinhPhang`, `gocVe`) từ bài 18, 17 sang `bai-20.js`, không dùng chung (đề xuất, như các bài trước chép hàm hỗ trợ).
6. **Năm mục tiêu, 13 dạng**: đồng ý (**đề xuất**), hay thầy muốn bài ngắn hơn (bỏ D9 và D13 → 11 dạng)?
7. Xếp lại thứ tự dạng theo sư phạm như bài 9–17 (**đề xuất**).
8. Xác nhận 13 dạng và 2 dạng "không có trong SGK".
