# Phân tích sư phạm — Bài 32: Mi-li-lít (BÀI MỚI — BẢN NHÁP CHỜ DUYỆT)

Mẫu: `bai-24.js` (nhãn lỗi riêng, hình tự vẽ có `check()` đọc lại số từ SVG) + khối "LUYỆN THÔNG MINH" ở đầu `engine.js`.
Phạm vi: tạo mới `bai-32.js`, `bai-32.html` (chép từ `assets/bai-template.html`), thêm 32 vào `AVAILABLE` trong `index.html` (giữ CRLF, diff đúng 1 dòng)
và file phân tích này. Không đụng `engine.js`, `figures.js`, `lua.js`. Bài mới **không** thêm vào `chua_chuan.txt`: `phong_tranh --soat` phải 0 lỗi. Chưa viết dòng mã nào.

Bài 32 là bài thứ ba của **Chủ đề 5: Một số đơn vị đo**. Dùng **4 mục tiêu** × 10 dạng.

## 0. Nguồn và điều cần lưu ý

- Cấu trúc mục SGK (trang in 89–91) lấy từ **bản tóm tắt của phiên Claude trên máy thầy**; phiên đám mây chưa tự đối chiếu sách. Không chép nguyên văn đề vào repo; chỉ ghi dạng bài và ý.
  - **Khám phá:** ca đong có vạch chia; mức nước 500 ml là nửa ca; ca đầy là 1 l (lít); **1 l = 1 000 ml**.
  - **Hoạt động 1:** ba ca đong rót vào một bình: 500 ml + 200 ml + 300 ml = 1 000 ml (đọc mức nước từng ca, cộng).
    **Hoạt động 2:** phích đựng 1 l nước; rót ra ba lần: 200 ml, 200 ml, 100 ml; còn lại 500 ml (1 000 − 200 − 200 − 100).
  - **Luyện tập 1:** tính với số đo (mẫu 100 ml + 20 ml = 120 ml; 8 ml × 4 = 32 ml): 120 ml − 20 ml = 100 ml; 12 ml × 3 = 36 ml.
    **Luyện tập 2:** chai dầu ăn 750 ml, dùng một lúc còn 350 ml: đã dùng 400 ml (đọc hình hai mức nước, tìm hiệu).
- **Số lớn hơn 100** (200, 500, 750, 1 000): phạm vi cộng trừ trong 1 000, viết "1 000" có dấu cách; **không số thập phân, không phân số** (500 ml, không "nửa lít").
- **Lỗi hay gặp:** nhầm ml với l (200 ml khác 200 l); nhầm bội (1 l = 100 ml); đọc mức nước sai vạch; quên rót ra là phép trừ; một bước rồi dừng ở bài "rót ba lần".
- **Nhãn riêng:** `nham-ml-l` (nhầm ml với l), `nham-boi` (nhầm bội 10, 100, 1 000), `quen-doi` (quên đổi đơn vị), `tra-loi-sai-buoc` (dừng ở bước giữa, như bài 28). Chuẩn: `nham-bang`, `cong-thay-nhan`, `chon-sai-phep`, `thieu-buoc`, `dao-vai`.
- **Hình ca đong:** ca có vạch chia (vạch dài mỗi 250 ml hoặc 100 ml, nhãn số), mức nước màu xanh; `check()` đọc lại `data-ml` của mức nước từ SVG.

## 1. Bốn mục tiêu (muctieu) × ba mức (Thông tư 27)

| MT | Tên | Mức 1 — Nhận biết | Mức 2 — Hiểu | Mức 3 — Vận dụng |
|---|---|---|---|---|
| MT1 | Mi-li-lít và lít | Ca đong có mức nước 500 ml; 1 l = ? ml. | 2 l = ? ml; 3 000 ml = ? l; 500 ml là mấy phần của 1 l. | Chọn ml hay l cho vật quen; đổi số lớn (5 l = ? ml). |
| MT2 | Đọc ca đong, cộng các ca | Đọc mức nước một ca. | Ba ca rót vào bình: 500 + 200 + 300. | Bình đầy 1 000 ml, thiếu bao nhiêu; hai ca khác nhau. |
| MT3 | Tính với mi-li-lít | 100 ml + 20 ml; 8 ml × 4. | 120 ml − 20 ml; 12 ml × 3. | Số lớn (386 ml + 214 ml); nhân, chia số đo (25 ml × 3; 96 ml : 4). |
| MT4 | Giải toán và vận dụng | Phích 1 l, rót 200 ml: còn bao nhiêu. | Rót ba lần (200 + 200 + 100): còn 500 ml; chai dầu 750 ml còn 350 ml. | Bạn nói đúng hay sai ("Em thấy thế nào?"); hai bước với số khác. |

Tham số engine: `goal:10, soCau:18, soCauToiDa:24`. 4 mục tiêu × tối thiểu 3 câu = 12 ≤ 18.

## 2. Mười dạng (topics) — xếp theo mạch sư phạm

"Nguồn": **SGK** = có trong sách (mục ghi trong ngoặc) · **không có trong SGK** = dạng thêm.

| # | Dạng | Nguồn | MT | Mức 1 / Mức 2 / Mức 3 | Hình | Nhãn lỗi chính |
|---|---|---|---|---|---|---|
| D1 | Đọc ca đong | SGK (Khám phá) | MT2 | M1: mức nước 500 ml: đọc (vạch có nhãn) · M2: đếm vạch 100 ml từ đáy ca (100 đến 400 ml) · M3: mức nước trên nhãn 500 ml, đếm khoảng vạch tiếp theo (600 đến 900 ml) | **hình mới** `caDong` (ca có vạch, mức nước) | `nham-bang`, `nham-ml-l` |
| D2 | Nửa ca và một lít | SGK (Khám phá) | MT1 | M1: ca đầy là 1 l = ? ml · M2: 500 ml là nửa ca; hai ca 500 ml đầy mấy lít · M3: 1 l gồm mấy ca 100 ml (đếm 10 ca trong hình) | `caDong`, chữ | `nham-boi`, `dem-sot-phep` |
| D3 | Đổi l và ml | SGK (Khám phá) | MT1 | M1: 1 l = ? ml · M2: 2 l = ? ml; 3 000 ml = ? l · M3: 5 l = ? ml; 7 000 ml = ? l | chữ | `nham-boi`, `quen-doi` |
| D4 | Ba ca vào bình | SGK (Hoạt động 1) | MT2 | M1: hai ca (500 ml + 200 ml) · M2: ba ca (500 + 200 + 300 = 1 000) · M3: ba ca khác số; bình chứa 1 l còn thiếu bao nhiêu | `caDong` (ba ca cạnh nhau) | `thieu-buoc`, `tra-loi-sai-buoc` |
| D5 | Phích nước | SGK (Hoạt động 2) | MT4 | M1: phích 1 000 ml, rót 200 ml: còn bao nhiêu · M2: rót ba lần (200 + 200 + 100): còn 500 ml (hai bước) · M3: số khác (rót 150 + 250 + 100) | chữ, `caDong` | `chon-sai-phep`, `thieu-buoc` |
| D6 | Tính với ml | SGK (Luyện tập 1) | MT3 | M1: 100 ml + 20 ml; 8 ml × 4 · M2: 120 ml − 20 ml; 12 ml × 3 · M3: số lớn (386 ml + 214 ml; 25 ml × 3; 96 ml : 4) | chữ | `nham-bang`, `cong-thay-nhan` |
| D7 | Chai dầu ăn | SGK (Luyện tập 2) | MT4 | M1: chai 750 ml, còn 350 ml: đã dùng bao nhiêu (hình hai mức) · M2: số khác (900 ml, còn 450 ml) · M3: biết đã dùng, tìm còn lại; chọn phép tính | `caDong` hoặc chai (hai mức nước) | `chon-sai-phep`, `dao-vai` |
| D8 | Gấp và giảm số đo | **không có trong SGK** | MT3 | M1: 12 ml gấp 3 lần · M2: 96 ml giảm 4 lần; phép nào cho kết quả 60 ml (chọn một) · M3: trong tám thẻ, có mấy thẻ cho kết quả 60 ml | `theTinh` (chép từ bài 24) | `nham-gap-them`, `nham-chieu`, `dem-sot-phep` |
| D9 | Chọn ml hay l | **không có trong SGK** | MT1 | M1: thìa thuốc ho 5 … (ml / l) · M2: chai nước, bình nước, xô nước, ly nước, nồi canh · M3: so sánh 800 ml với 1 l (cùng đơn vị) | chữ | `nham-ml-l`, `quen-doi` |
| D10 | Bạn nói đúng hay sai | **không có trong SGK** | MT4 | M1: Đúng / Sai: "1 l = 1 000 ml" · M2: "Bạn An nói: 200 ml nhiều hơn 2 l" (em thấy thế nào) · M3: "Bạn An nói: 3 l = 300 ml" với "Đồng ý, vì… / Không đồng ý, vì…" | `anh('boy')` | `nham-ml-l`, `nham-boi` |

Dạng không có trong SGK: **Gấp và giảm số đo (D8)**, **Chọn ml hay l (D9)**, **Bạn nói đúng hay sai (D10)** (3 dạng). Bảy dạng còn lại bám các mục của sách.

Phân bố: MT1 ba dạng (D2, D3, D9) · MT2 hai dạng (D1, D4) · MT3 hai dạng (D6, D8) · MT4 ba dạng (D5, D7, D10). Mỗi mục tiêu ≥ 2 dạng.

### Luật lời câu hỏi (áp dụng cho cả bài)

- Nút **Đúng / Sai** chỉ đi với **mệnh đề**; câu "… có … không?" dùng nút **Có / Không**.
- Dạng "Bạn An nói …" dùng "Em thấy thế nào?" với "Đồng ý, vì…" / "Không đồng ý, vì…". Đáp án không tự mâu thuẫn với đề.
- Luôn ghi **đơn vị** sau số; "còn lại" là phép trừ, "tất cả" là phép cộng; đáp án nhiễu **không chứa chính đối tượng đang hỏi**.
- Không dùng số thập phân, không dùng phân số ("nửa ca" chỉ dùng kèm số 500 ml). Mọi kết quả nguyên ≤ 1 000.
- Câu hai bước (rót ba lần) hỏi thành hai câu liên tiếp như bài 28; mức 1 hỏi bước giữa, mức 2–3 hỏi đáp số cuối.
- Nhãn trong hình nằm giữa đúng phần nó đo; nhãn ở rìa khung chừa lề ≥ 1,3 lần cỡ chữ.

## 3. Hình mới cần vẽ (viết ngay trong `bai-32.js`, KHÔNG sửa `figures.js`)

Theo quy chuẩn `sk-ve-hinh-tieuhoc`: bảng màu `HM`, `svgHinh`, `nhanTron` / `nhanVien`; mỗi hình là MỘT SVG co theo màn hình; chữ ≥ 14px ở khổ điện thoại; nét và chữ dùng `currentColor`; nét thẳng có `fill="none"`; không emoji hệ thống.

| Hàm | Mô tả | Tham số | Kiểm do mã |
|---|---|---|---|
| `caDong(ml, tuy)` | Một ca đong cao (hình chữ nhật bo góc, có quai), vạch chia đều cạnh trái (dài mỗi 250 ml, ngắn mỗi 50 ml hoặc 100 ml), nhãn số ở vạch dài (500 và "1 l"); mức nước màu `HM.troi` tới đúng độ cao ứng với `ml`. `tuy.nhan` = chữ dưới ca ("Ca 1"). | ml (bội số 100), cap, tên | `check()` đọc `data-ml` của mức nước, độ cao tính ra từ `ml`. |
| `hangCa(ds)` | Nhiều ca đong cạnh nhau (tối đa 3), mỗi ca là một `caDong` thu nhỏ trong cùng một SVG; nhãn tên ca dưới mỗi ca. | ds = danh sách ml | `check()` đọc `data-ml` từng ca; tổng khớp đáp. |
| `theTinh(ds)` (chép từ `bai-24.js`) | Dãy thẻ phép tính. | ds | tính lại từng thẻ. |

Hình dùng lại từ `figures.js`: `anh`, `oHoi`, `svgHinh`, `HM`, `nhanVien`, `tinhBT`.

## 4. Nhãn lỗi

- Chuẩn của engine dùng được: `nham-bang`, `cong-thay-nhan`, `chon-sai-phep`, `thieu-buoc`, `dao-vai`, `dem-sot-phep`.
- **Nhãn riêng của bài 32** (khai báo qua `BAI.loi`):

| Nhãn | Tên hiển thị | Ví dụ lỗi | Gợi ý |
|---|---|---|---|
| `nham-ml-l` | Nhầm mi-li-lít với lít | Chai nước 500 l; 200 ml nhiều hơn 2 l | "1 l = 1 000 ml. Mi-li-lít là đơn vị nhỏ, dùng cho lượng nước ít." |
| `nham-boi` | Nhầm bội của đơn vị | 1 l = 100 ml | "1 l = 1 000 ml." |
| `quen-doi` | Quên đổi đơn vị | 2 l + 500 ml = 502 | "Đổi về cùng ml: 2 l = 2 000 ml." |
| `tra-loi-sai-buoc` | Trả lời bước giữa thay vì bước cuối | Rót ba lần, đáp số sau lần hai | "Câu hỏi cuối là còn lại: còn một bước nữa." |
| `nham-gap-them`, `nham-chieu` (dùng cho D8) | Như bài 24, 27 | 12 ml gấp 3 lần viết 12 + 3 | "Gấp 3 lần là nhân với 3." |

## 5. Rủi ro đã biết

1. **Ca đong:** mức nước phải đúng độ cao theo ml, nhãn số ≥ 14px ở 375px; ba ca cạnh nhau (D4) có thể chật: mỗi ca rộng ≥ 70 đơn vị khung, chỉ nhãn vạch dài; không để chữ đè quai ca hoặc đè mức nước.
2. **Đọc mức nước (D1):** mức nước chỉ ở bội của 100 ml; đáp án nhiễu cách ít nhất 100 ml.
3. **Chai dầu (D7):** dùng ca đong hai mức (lúc đầu, lúc sau) thay cho chai nếu không vẽ chuẩn; không vẽ vật thật gây hiểu sai.
4. **Phích nước (D5):** chỉ chữ và số, không vẽ phích; rót ra nhiều lần là phép trừ liên tiếp, kết quả không âm.
5. **Số lớn:** viết "1 000"; `check()` kiểm kết quả ≤ 1 000.
6. **Không nhãn sát biên:** font Linux hẹp hơn Segoe UI; thầy soát lại hình trên máy thầy (ghi trong PR).
7. `index.html` dùng CRLF: sửa bằng Python đọc/ghi nhị phân (không `sed -i`), diff đúng 1 dòng.
8. `kiem_dem.mjs` kiểm các `data-dem` của bài.

## 6. Việc sẽ làm sau khi thầy duyệt

1. Viết `bai-32.js` theo bảng trên (nối chuỗi, **không** backtick hay template literal), chép `bai-32.html`, sửa `index.html` (một dòng).
2. Chạy RIÊNG từng cổng (đặt `CHROME` nếu cần):
   - `node .claude/skills/sk-web-toan-tieuhoc/assets/kiemtra.js . bai-32.js 400000`
   - `node .claude/skills/sk-ve-hinh-tieuhoc/assets/phong_tranh.mjs . <thư mục tạm> bai-32 --soat --khong-chup --rong 375,1200 --giao light,dark --lan 3` → 0 lỗi
   - `node .claude/skills/sk-web-toan-tieuhoc/assets/soat_giao_dien.mjs . bai-32 --cau 2`
3. Tự soi ảnh phòng tranh (ca đong, ba ca), push, ghi kết quả từng cổng trong mô tả PR, đổi tiêu đề thành "[XONG] Bài 32", gỡ trạng thái nháp. Không tự gộp.

## 7. Cần thầy quyết (kèm phương án đề xuất)

1. **Mục SGK ở mục 0 và bảng dạng** có đúng không? Đề xuất: đúng như bảng.
2. **Phích nước (D5) chỉ chữ và số**, chai dầu (D7) vẽ bằng ca đong hai mức: đồng ý (**đề xuất**).
3. **Câu hai bước hỏi thành hai câu liên tiếp** (rót ba lần): đồng ý (**đề xuất**).
4. **Ba dạng "không có trong SGK" (D8, D9, D10):** giữ (**đề xuất**) hay bớt?
5. **Nhãn riêng** (`nham-ml-l`, `nham-boi`, `quen-doi`, `tra-loi-sai-buoc`): giữ (**đề xuất**) hay gom về `nham-bang`, `thieu-buoc`?
6. **Bốn mục tiêu, mười dạng**; xếp lại thứ tự dạng theo sư phạm như bài 9–31 (**đề xuất**).
