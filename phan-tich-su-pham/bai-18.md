# Phân tích sư phạm — Bài 18: Góc. Góc vuông, góc không vuông (BÀI MỚI — BẢN NHÁP CHỜ DUYỆT)

Mẫu: `bai-16.js`, `bai-17.js` (bài hình học mới, có hình riêng trong file) + khối "LUYỆN THÔNG MINH" ở đầu `engine.js`.
Phạm vi: tạo mới `bai-18.js`, `bai-18.html` (chép từ `assets/bai-template.html`), thêm 18 vào `AVAILABLE` trong `index.html` (giữ CRLF, diff đúng 1 dòng)
và file phân tích này. Không đụng `engine.js`, `figures.js`, `lua.js`. Bài mới **không** thêm vào `chua_chuan.txt`: `phong_tranh --soat` phải 0 lỗi. Chưa viết dòng mã nào.

Bài 18 là **bài hình học khái niệm** (hai trang sách). Dùng **4 mục tiêu** × 9 dạng.

## 0. Nguồn và điều cần lưu ý

- Cấu trúc mục SGK (trang in 54–55) lấy từ **bản tóm tắt của phiên Claude trên máy thầy**; phiên đám mây chưa tự đối chiếu sách.
  Không chép nguyên văn đề vào repo; chỉ ghi dạng bài và ý. Các mục: Khám phá a (hai tay giơ ra tạo góc), b (góc vuông đỉnh O cạnh OA, OB; góc không vuông đỉnh P cạnh PM, PN; đỉnh E cạnh EC, ED),
  c (ê ke); Hoạt động (dùng ê ke xét 6 góc A, M, P, I, G, E, có hai góc gần vuông là bẫy); Luyện tập 1 (vẽ góc vuông trên lưới ô vuông); Luyện tập 2 (hình nào có nhiều góc vuông nhất).
- **Chỉ dùng "góc vuông" và "góc không vuông"**. Lớp 3 chưa học "góc nhọn", "góc tù": không dùng hai từ này trong câu hỏi, gợi ý, nhãn lỗi.
- **Thao tác của sách đổi thành câu chọn / đếm** (engine không có công cụ vẽ hay đặt ê ke):
  - dùng ê ke thật → hình **ê ke vẽ SVG** áp vào góc (xem mục 3), bé nhìn khít hay hở rồi chọn Có / Không;
  - Luyện tập 1 "vẽ góc vuông trên lưới" → **chọn hình vẽ đúng** (D6) và **chọn điểm thứ ba** làm góc vuông (D7);
  - Luyện tập 2 "hình nào có nhiều góc vuông nhất" → câu **đếm** (D8) và câu **chọn một** (D9).
- **Mọi góc do mã tính từ toạ độ**: đỉnh, hai cạnh, tích vô hướng. `check()` tính lại góc vuông (tích vô hướng bằng 0), không tin nhãn.
- **Góc "gần vuông" là bẫy có chủ ý** (góc đỉnh P và đỉnh G của sách): lệch ít nhất **12°** so với 90° để mắt thấy khác; không chọn góc lệch dưới 12°.
- **Hình mới viết trong `bai-18.js`**, không sửa `figures.js`.

## 1. Bốn mục tiêu (muctieu) × ba mức (Thông tư 27)

| MT | Tên | Mức 1 — Nhận biết | Mức 2 — Hiểu | Mức 3 — Vận dụng |
|---|---|---|---|---|
| MT1 | Đỉnh, cạnh và tên góc | Chọn đỉnh của góc; chọn cạnh. | Gọi tên góc theo đỉnh và cạnh ("góc đỉnh E, cạnh EC, ED"); nhiều góc trong một hình. | Đ hay S: câu nói về đỉnh, cạnh của góc (bẫy nhầm đỉnh với cạnh). |
| MT2 | Góc vuông, góc không vuông | Dùng ê ke: khít hoàn toàn hay hở rõ. | Góc vuông trong nhiều góc; ê ke hở ít. | Góc gần vuông (lệch ≥ 12°) không phải góc vuông; tìm lỗi của bạn. |
| MT3 | Góc vuông trên lưới ô vuông | Chọn góc vuông có hai cạnh theo đường lưới (ngang, dọc). | Chọn điểm thứ ba để được góc vuông. | Bẫy cạnh xiên: hai cạnh xiên nhìn như vuông; góc vuông xiên theo đường chéo ô. |
| MT4 | Đếm góc vuông trong hình | Đếm góc vuông trong tam giác, hình chữ nhật. | Đếm trong hình ngôi nhà, hình thang vuông. | Hình nào có nhiều góc vuông nhất. |

Tham số engine: `goal:10, soCau:18, soCauToiDa:24`. 4 mục tiêu × tối thiểu 3 câu = 12 ≤ 18.

## 2. Chín dạng (topics) — xếp theo mạch sư phạm

"Nguồn": **SGK** = có trong sách (mục ghi trong ngoặc) · **không có trong SGK** = dạng thêm.

| # | Dạng | Nguồn | MT | Mức 1 / Mức 2 / Mức 3 | Hình | Nhãn lỗi chính |
|---|---|---|---|---|---|---|
| D1 | Đỉnh và cạnh | SGK (Khám phá b) | MT1 | M1: chọn đỉnh của góc (một góc có tên đỉnh) · M2: chọn hai cạnh của góc · M3: chọn tên cạnh khi hình có hai góc cùng đỉnh | **hình mới** `gocHinh` | `nham-dinh-canh`, `lech-nhom` |
| D2 | Gọi tên góc | SGK (Hoạt động: gọi tên đỉnh, cạnh) | MT1 | M1: hình một góc, chọn tên "góc đỉnh X, cạnh XA, XB" · M2: hình hai góc rời nhau, chọn mô tả đúng góc thứ hai · M3: mô tả đúng đỉnh nhưng sai cạnh là bẫy | `gocHinh` | `nham-dinh-canh`, `lech-nhom` |
| D3 | Dùng ê ke | SGK (Khám phá c) | MT2 | M1: ê ke khít hai cạnh · M2: ê ke hở ít (lệch ≥ 12°) · M3: không có ê ke, góc gần vuông. Hỏi "Đây có phải góc vuông không?" (Có / Không) | **hình mới** `gocEke` | `goc-gan-vuong`, `lech-nhom` |
| D4 | Sáu góc | SGK (Hoạt động: 6 góc A, M, P, I, G, E) | MT2 | M1: ba góc (một vuông), chọn góc vuông · M2: bốn góc có một góc gần vuông · M3: sáu góc, đếm số góc vuông (1 hoặc 2) | `gocHinh` (nhiều góc) | `goc-gan-vuong`, `lech-nhom` |
| D5 | Đúng / Sai | **không có trong SGK** | MT1, MT2 | M1: mệnh đề đơn ("Góc đỉnh A là góc vuông.") · M2: về đỉnh, cạnh ("PM, PN là hai cạnh của góc đỉnh P.") · M3: "Bạn An nói …; chọn lý do sai" | `anh('boy')`, `gocHinh` | `nham-dinh-canh`, `goc-gan-vuong` |
| D6 | Góc vuông trên lưới | SGK (Luyện tập 1: vẽ → chọn hình) | MT3 | M1: ba hình vẽ trên lưới, một góc vuông (hai cạnh ngang, dọc), hai hình khác hẳn · M2: hình có cạnh xiên không vuông (ví dụ cạnh qua hai ô ngang, một ô dọc) · M3: có góc vuông xiên theo đường chéo ô là hình đúng | **hình mới** `luoiGoc` | `goc-xien`, `lech-nhom` |
| D7 | Điểm thứ ba | SGK (Luyện tập 1: hoàn thành góc vuông) | MT3 | M1: cho O, A trên lưới, chọn điểm B (ba điểm) để góc AOB vuông · M2: bốn điểm, hai điểm gần đúng · M3: O, A không nằm theo ngang, dọc | `luoiGoc` | `goc-xien`, `lech-nhom` |
| D8 | Đếm góc vuông | SGK (Luyện tập 2) | MT4 | M1: tam giác vuông (1), hình chữ nhật (4) · M2: hình ngôi nhà, hình thang vuông · M3: ngũ giác cụt một góc, tam giác cân cao hẹp (0). Đáp bằng số | **hình mới** `hinhPhang` | `dem-sot-goc`, `lech-nhom` |
| D9 | Hình nhiều góc vuông nhất | SGK (Luyện tập 2) | MT4 | M1: hai hình, chọn hình có nhiều góc vuông hơn · M2: ba hình, hiệu hai hình nhỏ · M3: ba hình, có tam giác cân cao hẹp (bẫy: nhìn như vuông). Đúng **một** phương án có nhiều nhất | `hinhPhang` | `dem-sot-goc` |

Dạng không có trong SGK: **Đúng / Sai** (1 dạng). Tám dạng còn lại là các mục của sách (Luyện tập 1 tách thành hai dạng D6, D7).

Phân bố: MT1 hai dạng (D1, D2, cộng D5) · MT2 ba dạng (D3, D4, D5) · MT3 hai dạng (D6, D7) · MT4 hai dạng (D8, D9). Mỗi mục tiêu ≥ 2 dạng.

### Luật lời câu hỏi (áp dụng cho cả bài)

- Nút **Đúng / Sai** chỉ đi với **mệnh đề** ("Góc đỉnh P là góc vuông."). Câu hỏi dạng "… có … không?" dùng nút **Có / Không**.
- Đáp án nhiễu **không chứa chính đối tượng đang hỏi** (hỏi "Cạnh của góc đỉnh E" thì phương án không có "góc đỉnh E" như một cạnh).

## 3. Hình mới cần vẽ (viết ngay trong `bai-18.js`, KHÔNG sửa `figures.js`)

Theo quy chuẩn `sk-ve-hinh-tieuhoc`: bảng màu `HM`, `svgHinh`, `nhanTron` / `nhanVien`; mỗi hình là MỘT SVG co theo màn hình; chữ ≥ 14px ở khổ điện thoại;
nét và chữ dùng `currentColor` (`class="text-slate-700"` trên `<svg>`); nét thẳng có `fill="none"`; không emoji hệ thống. **Mọi số đo do mã tính** từ toạ độ.

| Hàm | Mô tả | Tham số | Kiểm do mã |
|---|---|---|---|
| `gocHinh(g)` | Một hoặc nhiều góc: chấm đỉnh có nhãn, hai cạnh là hai tia (đầu mỗi tia có chấm nhãn), cung nhỏ ở đỉnh; góc vuông có ô vuông nhỏ **chỉ khi đề cho sẵn** (D1, D2). Nhãn đỉnh đặt ngoài góc, cách nét ≥ 14 đơn vị. | `g` = [{dinh, ten, hai cạnh, độ}] | `check()` tính độ góc từ toạ độ; góc "vuông" khi tích vô hướng bằng 0; góc "gần vuông" lệch ≥ 12°. |
| `gocEke(g, eke)` | Một góc có **ê ke** áp vào: ê ke là tam giác vuông xanh nhạt, góc vuông của nó đặt khít ở đỉnh, một cạnh ê ke trùng một cạnh của góc; cạnh còn lại của góc trùng hoặc hở so với cạnh ê ke. Có nét chỉ chỗ hở (vạch đỏ nhỏ). | `g`, `eke` = true/false | `check()`: khít khi góc đúng 90°; hở khi lệch ≥ 12°. |
| `luoiGoc(w, h, hinh)` | Lưới ô vuông w × h, mỗi ô 28 đơn vị; một hoặc nhiều góc vẽ bằng hai đoạn nối ba điểm trên giao điểm lưới; điểm có nhãn. | `hinh` = [{O, A, B}] | `check()`: tích vô hướng (A − O) · (B − O) bằng 0 cho góc vuông, khác 0 và lệch ≥ 12° cho góc không vuông. |
| `hinhPhang(poly)` | Đa giác lồi (tam giác, hình chữ nhật, thang vuông, ngôi nhà, ngũ giác cụt góc) trên lưới ngầm; **không đánh dấu** góc vuông (đáp án nằm ở đếm). Đỉnh có nhãn chữ. | `poly` = mảng toạ độ | `check()` đếm đỉnh có góc trong đúng 90° từ toạ độ; chỉ dùng **đa giác lồi** nên không có góc 270°. |

Hình dùng lại từ `figures.js`: `anh('boy')`, `nhanTron`, `nhanVien`, `svgHinh`, `HM`.

## 4. Nhãn lỗi

- Chuẩn của engine dùng được: `lech-nhom`, `dao-vai`.
- **Nhãn riêng của bài 18** (khai báo qua `BAI.loi`):

| Nhãn | Tên hiển thị | Ví dụ lỗi | Gợi ý |
|---|---|---|---|
| `nham-dinh-canh` | Nhầm đỉnh với cạnh | Chọn tên đỉnh khi hỏi cạnh; chọn đoạn thẳng khi hỏi đỉnh | "Đỉnh là điểm chung của hai cạnh. Cạnh là hai tia (hai đoạn) đi ra từ đỉnh." |
| `goc-gan-vuong` | Nhầm góc gần vuông là góc vuông | Góc đỉnh P (lệch 15°) chọn là góc vuông | "Góc gần vuông vẫn chưa vuông. Bé dùng ê ke: nếu hở một chút thì không phải góc vuông." |
| `goc-xien` | Nhầm cạnh xiên là góc vuông | Hai cạnh nhìn như vuông nhưng một cạnh đi qua hai ô ngang, một ô dọc | "Góc vuông trên lưới ô vuông: một cạnh đi ngang, một cạnh đi dọc (hoặc cùng theo đường chéo). Bé đếm ô của từng cạnh." |
| `dem-sot-goc` | Đếm sót hoặc thừa góc vuông | Hình ngôi nhà: bé quên hai góc ở sàn, hoặc đếm cả góc của mái | "Bé đi vòng quanh hình, dùng ê ke thử từng đỉnh, đếm từng góc vuông." |

## 5. Rủi ro đã biết

1. **Góc gần vuông** phải lệch ≥ 12° (bộ sinh chọn góc 75° hoặc 105° hoặc xa hơn); chữ nhãn đỉnh không đè lên nét của cạnh.
2. **Ê ke đặt khít**: tam giác ê ke vẽ bằng SVG phải có góc vuông ở đỉnh; với góc không vuông, cạnh thứ hai hở rõ bằng vạch đỏ; soát hình **tối + sáng** (ê ke xanh nhạt chìm ở giao diện Tối: lót nét viền).
3. **Hình lưới**: góc vuông xiên theo đường chéo (ví dụ O, A, B có (A−O) = (1,1), (B−O) = (−1,1)) là đáp án **đúng** ở D6 M3; bộ sinh bảo đảm **đúng một** phương án có tích vô hướng bằng 0.
4. **Đa giác lồi**: không dùng hình chữ L (góc trong 270° gây tranh cãi); mọi đỉnh có góc trong 90° hoặc khác 90° rõ ràng.
5. **Nhãn không sát biên**: font Linux hẹp hơn Segoe UI; nhãn cách nhau ≥ 2 cm / đủ khoảng; thầy soát lại hình học trên máy thầy.
6. `index.html` dùng CRLF: sửa bằng Python đọc/ghi nhị phân (không `sed -i`), diff đúng 1 dòng.
7. `kiem_dem.mjs` báo sai vì `figures.js` trên `main` chưa có `data-dem` (đã biết, không sửa). Bài 18 không có vật cần `data-dem`; số góc vuông do `check()` tính từ toạ độ.

## 6. Việc sẽ làm sau khi thầy duyệt

1. Viết `bai-18.js` theo bảng trên (nối chuỗi, **không** backtick hay template literal), chép `bai-18.html`, sửa `index.html` (một dòng).
2. Chạy RIÊNG từng cổng (đặt `CHROME` nếu cần):
   - `node .claude/skills/sk-web-toan-tieuhoc/assets/kiemtra.js . bai-18.js 400000`
   - `node .claude/skills/sk-ve-hinh-tieuhoc/assets/phong_tranh.mjs . <thư mục tạm> bai-18 --soat --khong-chup --rong 375,1200 --giao light,dark --lan 3` → 0 lỗi
   - `node .claude/skills/sk-web-toan-tieuhoc/assets/soat_giao_dien.mjs . bai-18 --cau 2`
3. Tự soi ảnh phòng tranh các dạng hình mới (D3 ê ke, D6, D7 lưới, D8 hình phẳng), push, ghi kết quả từng cổng trong mô tả PR, đổi tiêu đề thành "[XONG] Bài 18", gỡ trạng thái nháp. Không tự gộp.

## 7. Cần thầy quyết (kèm phương án đề xuất)

1. **Mục SGK ở mục 0 và bảng dạng** có đúng không, đặc biệt thứ tự và số mục của Luyện tập? Đề xuất: đúng như bảng.
2. **Không dùng "góc nhọn", "góc tù"**, chỉ "góc vuông / góc không vuông" như sách lớp 3: đồng ý (**đề xuất**).
3. **Dùng ê ke vẽ SVG** (D3) thay cho ê ke thật; câu hỏi "có phải góc vuông không?" nút **Có / Không**: đồng ý (**đề xuất**).
4. **Bốn mục tiêu, chín dạng**; Luyện tập 1 tách thành hai dạng (chọn hình vẽ đúng; chọn điểm thứ ba): đồng ý (**đề xuất**).
5. **Bốn nhãn riêng** (`nham-dinh-canh`, `goc-gan-vuong`, `goc-xien`, `dem-sot-goc`): giữ (**đề xuất**; `goc-gan-vuong` và `goc-xien` là hai bẫy sách cố ý gài) hay gom về `lech-nhom`?
6. **Góc gần vuông lệch ≥ 12°**: đồng ý (**đề xuất**), hay thầy muốn ngưỡng khác?
7. **Chỉ dùng đa giác lồi** ở D8, D9 (bỏ hình chữ L): đồng ý (**đề xuất**).
8. Xếp lại thứ tự dạng theo sư phạm như bài 9–17 (**đề xuất**).
9. Xác nhận 9 dạng và 1 dạng "không có trong SGK".
