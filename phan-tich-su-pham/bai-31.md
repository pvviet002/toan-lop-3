# Phân tích sư phạm — Bài 31: Gam (BÀI MỚI — BẢN NHÁP CHỜ DUYỆT)

Mẫu: `bai-24.js` (nhãn lỗi riêng, hình tự vẽ có `check()` đọc lại số từ SVG) + khối "LUYỆN THÔNG MINH" ở đầu `engine.js`.
Phạm vi: tạo mới `bai-31.js`, `bai-31.html` (chép từ `assets/bai-template.html`), thêm 31 vào `AVAILABLE` trong `index.html` (giữ CRLF, diff đúng 1 dòng)
và file phân tích này. Không đụng `engine.js`, `figures.js`, `lua.js`. Bài mới **không** thêm vào `chua_chuan.txt`: `phong_tranh --soat` phải 0 lỗi. Chưa viết dòng mã nào.

Bài 31 là bài thứ hai của **Chủ đề 5: Một số đơn vị đo**. Dùng **4 mục tiêu** × 10 dạng.

## 0. Nguồn và điều cần lưu ý

- Cấu trúc mục SGK (trang in 87–88) lấy từ **bản tóm tắt của phiên Claude trên máy thầy**; phiên đám mây chưa tự đối chiếu sách. Không chép nguyên văn đề vào repo; chỉ ghi dạng bài và ý.
  - **Khám phá:** quả cân 100 g (gam); **1 kg = 1 000 g**.
  - **Hoạt động 1 (cân đĩa):** hai đĩa cân thăng bằng; đặt quả cân một bên, gói hàng một bên: gói nặng 500 g; ba cặp cộng quả cân: 100 g + 50 g = 150 g; 20 g + 20 g = 40 g; 200 g + 200 g = 400 g.
    **Hoạt động 2 (cân đồng hồ):** quả táo nặng 500 g, túi bột mì nặng 250 g; túi bột mì nhẹ hơn quả táo, quả táo nặng hơn túi bột mì 250 g; cả hai nặng 750 g (hai bước).
  - **Luyện tập 1:** tính với số đo (mẫu 250 g + 300 g = 550 g; 40 g : 5 = 8 g): 740 g − 360 g = 380 g; 15 g × 4 = 60 g.
    **Luyện tập 2:** ước lượng cân nặng con vật (gà 2 kg, chó 20 kg, chim sẻ 200 g, bò 200 kg). Trên web dùng **chữ**, không vẽ con vật nếu không vẽ chuẩn: "Con gà nặng khoảng …" chọn một.
- **Số lớn hơn 100** (250, 500, 750, 1 000): phạm vi cộng trừ trong 1 000, viết "1 000" có dấu cách; **không số thập phân** (không dùng 1/2 kg; dùng 500 g).
- **Lỗi hay gặp:** nhầm g với kg (200 g khác 200 kg); nhầm bội (1 kg = 100 g); đọc kim cân sai vạch (hai vạch gần nhau); cộng g với kg không đổi.
- **Nhãn riêng:** `nham-g-kg` (nhầm g với kg), `nham-boi` (nhầm bội 10, 100, 1 000), `quen-doi` (quên đổi đơn vị). Chuẩn: `nham-bang`, `cong-thay-nhan`, `chon-sai-phep`, `thieu-buoc`, `dao-vai`.
- **Hình cân:** cân đĩa (hai đĩa, quả cân là hình tròn có nhãn "100 g", gói hàng là hình chữ nhật); cân đồng hồ (mặt tròn, vạch 0 – 250 – 500 – 750 – 1 kg, kim đúng góc); `check()` đọc lại từ thuộc tính `data-g` của quả cân, của kim.

## 1. Bốn mục tiêu (muctieu) × ba mức (Thông tư 27)

| MT | Tên | Mức 1 — Nhận biết | Mức 2 — Hiểu | Mức 3 — Vận dụng |
|---|---|---|---|---|
| MT1 | Gam và ki-lô-gam | Quả cân 100 g; 1 kg = ? g. | 2 kg = ? g; 3 000 g = ? kg; 1 kg gồm mấy quả cân 100 g. | Đổi số lớn (5 kg = ? g); chọn g hay kg cho vật quen. |
| MT2 | Cân đĩa, cân đồng hồ | Cân đĩa: gói nặng bằng quả cân (500 g). | Cân thăng bằng: tổng các quả cân (100 + 50); kim chỉ vạch 250, 500, 750. | Kim giữa hai vạch (chọn đúng vạch); hai bên cân thăng bằng, tìm quả cân thiếu. |
| MT3 | Tính với gam | 250 g + 300 g; 20 g + 20 g. | 740 g − 360 g; 15 g × 4; 40 g : 5. | Gấp, giảm số đo; hai bước (nặng hơn, cả hai). |
| MT4 | Ước lượng và vận dụng | Táo 500 g, bột mì 250 g: cả hai. | Quả táo nặng hơn túi bột mì bao nhiêu gam; ước lượng con vật. | Bạn nói đúng hay sai; hai bước với số khác. |

Tham số engine: `goal:10, soCau:18, soCauToiDa:24`. 4 mục tiêu × tối thiểu 3 câu = 12 ≤ 18.

## 2. Mười dạng (topics) — xếp theo mạch sư phạm

"Nguồn": **SGK** = có trong sách (mục ghi trong ngoặc) · **không có trong SGK** = dạng thêm.

| # | Dạng | Nguồn | MT | Mức 1 / Mức 2 / Mức 3 | Hình | Nhãn lỗi chính |
|---|---|---|---|---|---|---|
| D1 | Quả cân 100 g | SGK (Khám phá) | MT1 | M1: một quả cân nặng mấy gam · M2: 1 kg gồm mấy quả cân 100 g (đếm 10 quả) · M3: mấy quả cân 100 g cân được 700 g | **hình mới** `quaCan` (hàng quả cân, `data-dem="can"`) | `nham-boi`, `dem-sot-phep` |
| D2 | Đổi kg và g | SGK (Khám phá) | MT1 | M1: 1 kg = ? g · M2: 2 kg = ? g; 3 000 g = ? kg · M3: 5 kg = ? g; 7 000 g = ? kg | chữ | `nham-boi`, `quen-doi` |
| D3 | Cân đĩa: gói nặng bao nhiêu | SGK (Hoạt động 1) | MT2 | M1: gói cân thăng bằng với một quả cân 500 g · M2: bên kia 100 g + 50 g (hai quả) · M3: ba quả cân (200 + 100 + 50) | **hình mới** `canDia` (hai đĩa, quả cân, gói) | `thieu-buoc`, `nham-bang` |
| D4 | Cộng quả cân | SGK (Hoạt động 1) | MT2 | M1: 20 g + 20 g · M2: 200 g + 200 g; 100 g + 50 g · M3: ba quả cân khác loại; thiếu quả cân để thăng bằng (400 g − 250 g) | `canDia` | `cong-thay-nhan`, `thieu-buoc` |
| D5 | Cân đồng hồ | SGK (Hoạt động 2) | MT2 | M1: kim chỉ đúng vạch 500 g · M2: vạch 250 g, 750 g · M3: kim giữa hai vạch: chọn số đo (trong bốn đáp) | **hình mới** `canDongHo` (mặt tròn, kim) | `nham-bang`, `nham-g-kg` |
| D6 | Táo và bột mì | SGK (Hoạt động 2) | MT4 | M1: táo 500 g, bột mì 250 g: cả hai (hình cân) · M2: táo nặng hơn bột mì bao nhiêu g (hiệu) · M3: số khác (táo 750 g, đường 250 g); chọn phép tính | `canDongHo` | `chon-sai-phep`, `thieu-buoc` |
| D7 | Tính với gam | SGK (Luyện tập 1) | MT3 | M1: 250 g + 300 g; 20 g + 30 g · M2: 740 g − 360 g; 15 g × 4; 40 g : 5 · M3: số lớn (386 g + 214 g; 25 g × 3; 96 g : 4) | chữ | `nham-bang`, `cong-thay-nhan` |
| D8 | Ước lượng cân nặng | SGK (Luyện tập 2, đổi thành chọn một) | MT4 | M1: con gà nặng khoảng (2 kg hay 2 g) · M2: con chim sẻ, quả táo (200 g, 20 kg…) · M3: cặp "con vật – cân nặng" đều hợp lí? chọn một trong bốn câu | chữ | `nham-g-kg`, `nham-boi` |
| D9 | Chọn g hay kg | **không có trong SGK** | MT1 | M1: gói kẹo 100 … (g / kg) · M2: bao gạo, cuốn vở, bé · M3: so sánh 800 g với 1 kg (cùng đơn vị) | chữ | `nham-g-kg`, `quen-doi` |
| D10 | Bạn nói đúng hay sai | **không có trong SGK** | MT4 | M1: Đúng / Sai: "1 kg = 1 000 g" · M2: "Bạn An nói: 200 g nặng hơn 2 kg" (em thấy thế nào) · M3: "Bạn An nói: 3 kg = 300 g" với "Đồng ý, vì… / Không đồng ý, vì…" | `anh('boy')` | `nham-g-kg`, `nham-boi` |

Dạng không có trong SGK: **Chọn g hay kg (D9)**, **Bạn nói đúng hay sai (D10)** (2 dạng). Tám dạng còn lại bám các mục của sách.

Phân bố: MT1 ba dạng (D1, D2, D9) · MT2 ba dạng (D3, D4, D5) · MT3 một dạng (D7) · MT4 ba dạng (D6, D8, D10). **MT3 chỉ một dạng** (Luyện tập 1): thêm hai dạng nhỏ vào D7 theo mức, hoặc chuyển D6 mức 1 sang MT3 (**đề xuất:** D6 phục vụ cả MT3 và MT4, dùng `make(lv, mt)` như bài 26); mỗi mục tiêu ≥ 2 dạng.

### Luật lời câu hỏi (áp dụng cho cả bài)

- Nút **Đúng / Sai** chỉ đi với **mệnh đề**; câu "… có … không?" dùng nút **Có / Không**.
- Dạng "Bạn An nói …" dùng "Em thấy thế nào?" với "Đồng ý, vì…" / "Không đồng ý, vì…". Đáp án không tự mâu thuẫn với đề.
- Luôn ghi **đơn vị** sau số; hỏi "nặng hơn bao nhiêu gam" thì đáp số là hiệu; "cả hai nặng bao nhiêu" thì đáp số là tổng. Đáp án nhiễu **không chứa chính đối tượng đang hỏi**.
- Không dùng số thập phân, không dùng phân số (500 g, không "nửa ki-lô-gam"). Mọi kết quả nguyên ≤ 1 000.
- Nhãn trong hình nằm giữa đúng phần nó đo; nhãn ở rìa khung chừa lề ≥ 1,3 lần cỡ chữ.

## 3. Hình mới cần vẽ (viết ngay trong `bai-31.js`, KHÔNG sửa `figures.js`)

Theo quy chuẩn `sk-ve-hinh-tieuhoc`: bảng màu `HM`, `svgHinh`, `nhanTron` / `nhanVien`; mỗi hình là MỘT SVG co theo màn hình; chữ ≥ 14px ở khổ điện thoại; nét và chữ dùng `currentColor`; nét thẳng có `fill="none"`; không emoji hệ thống.

| Hàm | Mô tả | Tham số | Kiểm do mã |
|---|---|---|---|
| `quaCan(n)` | Hàng n quả cân 100 g (hình tròn, nhãn "100 g"), xếp 5 hoặc 10 quả một hàng; mỗi quả `data-dem="can"`. | n ≤ 10 | `check()` đếm quả cân = n. |
| `canDia(trai, phai)` | Cân đĩa thăng bằng: hai đĩa; mỗi bên là danh sách quả cân (`{g}`, nhãn "100 g") hoặc một gói hàng (`{goi:true, g}`, ghi "?" hoặc số). Cân thăng bằng khi tổng hai bên bằng nhau (cân nghiêng không dùng). | hai danh sách | `check()` đọc `data-g` từ SVG, tổng hai bên bằng nhau. |
| `canDongHo(g)` | Mặt cân tròn, vạch 0, 250, 500, 750, 1 000 (nhãn 0, 250, 500, 750, 1 kg), kim chỉ `g` theo góc tính từ `g`; đĩa cân bên dưới. | g (bội số 50) | `check()` đọc `data-g` của kim và so với đáp. |

Hình dùng lại từ `figures.js`: `anh`, `oHoi`, `svgHinh`, `HM`, `nhanVien`, `tinhBT`.

## 4. Nhãn lỗi

- Chuẩn của engine dùng được: `nham-bang`, `cong-thay-nhan`, `chon-sai-phep`, `thieu-buoc`, `dao-vai`, `dem-sot-phep`.
- **Nhãn riêng của bài 31** (khai báo qua `BAI.loi`):

| Nhãn | Tên hiển thị | Ví dụ lỗi | Gợi ý |
|---|---|---|---|
| `nham-g-kg` | Nhầm gam với ki-lô-gam | Con gà nặng 2 g; 200 g nặng hơn 2 kg | "1 kg nặng bằng 1 000 g. Gam là đơn vị nhỏ, dùng cho vật nhẹ." |
| `nham-boi` | Nhầm bội của đơn vị | 1 kg = 100 g | "1 kg = 1 000 g." |
| `quen-doi` | Quên đổi đơn vị | 2 kg + 500 g = 502 | "Đổi về cùng gam: 2 kg = 2 000 g." |

## 5. Rủi ro đã biết

1. **Cân đĩa:** hình dễ chật khi mỗi bên có ba quả cân; tối đa 3 quả cân mỗi bên, hai hàng; nhãn "100 g" trong quả cân ≥ 14px ở 375px; không để gói đè lên quả cân.
2. **Cân đồng hồ:** góc kim tính từ số đo; chỉ dùng g bội số 50, vạch 250 g; mức 3 "giữa hai vạch" chỉ hỏi chọn trong bốn số (không đòi ước lượng tự do); nhãn số quanh mặt tròn chừa lề, không đè kim.
3. **Ước lượng (D8):** đáp án có nhiễu hợp lí (cùng số, khác đơn vị); đề không chứa số đo thật mơ hồ (chỉ vật quen: gà, chó, chim sẻ, quả táo, cuốn vở).
4. **Cân thăng bằng:** bảo đảm tổng hai bên bằng nhau do mã tính, không vẽ cân lệch.
5. **Số lớn:** viết "1 000"; `check()` kiểm kết quả ≤ 1 000.
6. **Không nhãn sát biên:** font Linux hẹp hơn Segoe UI; thầy soát lại hình trên máy thầy (ghi trong PR).
7. `index.html` dùng CRLF: sửa bằng Python đọc/ghi nhị phân (không `sed -i`), diff đúng 1 dòng.
8. `kiem_dem.mjs` kiểm các `data-dem` của bài.

## 6. Việc sẽ làm sau khi thầy duyệt

1. Viết `bai-31.js` theo bảng trên (nối chuỗi, **không** backtick hay template literal), chép `bai-31.html`, sửa `index.html` (một dòng).
2. Chạy RIÊNG từng cổng (đặt `CHROME` nếu cần):
   - `node .claude/skills/sk-web-toan-tieuhoc/assets/kiemtra.js . bai-31.js 400000`
   - `node .claude/skills/sk-ve-hinh-tieuhoc/assets/phong_tranh.mjs . <thư mục tạm> bai-31 --soat --khong-chup --rong 375,1200 --giao light,dark --lan 3` → 0 lỗi
   - `node .claude/skills/sk-web-toan-tieuhoc/assets/soat_giao_dien.mjs . bai-31 --cau 2`
3. Tự soi ảnh phòng tranh (cân đĩa, cân đồng hồ, quả cân), push, ghi kết quả từng cổng trong mô tả PR, đổi tiêu đề thành "[XONG] Bài 31", gỡ trạng thái nháp. Không tự gộp.

## 7. Cần thầy quyết (kèm phương án đề xuất)

1. **Mục SGK ở mục 0 và bảng dạng** có đúng không? Đề xuất: đúng như bảng.
2. **Luyện tập 2 (ước lượng con vật)** dùng chữ, không vẽ con vật: đồng ý (**đề xuất**).
3. **MT3 chỉ có một dạng riêng (D7):** cho D6 phục vụ cả MT3 và MT4 (**đề xuất**) hay thêm một dạng nữa?
4. **Hai dạng "không có trong SGK" (D9, D10):** giữ (**đề xuất**) hay bớt?
5. **Ba nhãn riêng** (`nham-g-kg`, `nham-boi`, `quen-doi`): giữ (**đề xuất**) hay gom về `nham-bang`, `thieu-buoc`?
6. **Bốn mục tiêu, mười dạng**; xếp lại thứ tự dạng theo sư phạm như bài 9–30 (**đề xuất**).
