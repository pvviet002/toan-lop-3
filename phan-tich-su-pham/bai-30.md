# Phân tích sư phạm — Bài 30: Mi-li-mét (BÀI MỚI — BẢN NHÁP CHỜ DUYỆT)

Mẫu: `bai-24.js` (nhãn lỗi riêng, bảng, hình tự vẽ có `check()` đọc lại số từ SVG) + khối "LUYỆN THÔNG MINH" ở đầu `engine.js`.
Phạm vi: tạo mới `bai-30.js`, `bai-30.html` (chép từ `assets/bai-template.html`), thêm 30 vào `AVAILABLE` trong `index.html` (giữ CRLF, diff đúng 1 dòng)
và file phân tích này. Không đụng `engine.js`, `figures.js`, `lua.js`. Bài mới **không** thêm vào `chua_chuan.txt`: `phong_tranh --soat` phải 0 lỗi. Chưa viết dòng mã nào.

Bài 30 là bài đầu tiên của **Chủ đề 5: Một số đơn vị đo** (mi-li-mét, gam, mi-li-lít). Dùng **4 mục tiêu** × 10 dạng.

## 0. Nguồn và điều cần lưu ý

- Cấu trúc mục SGK (trang in 85–86) lấy từ **bản tóm tắt của phiên Claude trên máy thầy**; phiên đám mây chưa tự đối chiếu sách. Không chép nguyên văn đề vào repo; chỉ ghi dạng bài và ý.
  - **Khám phá:** que kem dày 1 mm đặt cạnh thước kẻ chia vạch mi-li-mét. Quy ước: **1 cm = 10 mm**, **1 m = 1 000 mm**.
  - **Hoạt động 1:** đọc thước: đoạn AB từ vạch 0 tới vạch 2 cm: 20 mm; đoạn CD tới vạch 3 cm: 30 mm.
    **Hoạt động 2:** đổi đơn vị: 6 cm = 60 mm; 2 cm = 20 mm; 10 mm = 1 cm; 1 000 mm = 1 m.
    **Hoạt động 3:** con kiến dài 3 mm, con ve sầu dài 3 cm: chọn đơn vị hợp với từng con. **Bẫy: cùng số, khác đơn vị.**
  - **Luyện tập 1:** tính với số đo (mẫu 250 mm + 100 mm = 350 mm): 420 mm − 150 mm = 270 mm; 25 mm + 3 mm = 28 mm; 64 mm − 15 mm = 49 mm; 11 mm × 3 = 33 mm; 50 mm : 2 = 25 mm.
    **Luyện tập 2:** nối số đo với phép gấp, giảm: 16 mm gấp 5 lần = 80 mm; 68 cm giảm 4 lần = 17 cm; 15 mm gấp 4 lần = 60 mm; 78 mm giảm 3 lần = 26 mm. Trên web **không dựng đường nối**: đổi thành "phép nào cho kết quả …" (chọn một) và "có mấy phép cho kết quả …" (đếm).
    **Luyện tập 3:** ốc sên bò hai quãng 152 mm và 264 mm: tất cả 416 mm.
    **Luyện tập 4:** con cào cào dài 12 mm; con kia gấp 3 lần: 36 mm.
- **Số lớn hơn 100 xuất hiện** (250, 420, 152, 264, 416, 1 000): phạm vi cộng trừ trong 1 000; viết số có dấu cách hàng nghìn ("1 000"). **Không số thập phân**; không đổi sang "cm và mm" lẫn (1 cm 5 mm không dùng).
- **Lỗi hay gặp:** cùng số khác đơn vị (3 cm = 3 mm); đổi sai bội (1 cm = 100 mm; 6 cm = 6 mm hoặc 600 mm); cộng số đo khác đơn vị mà không đổi trước; nhầm "gấp / giảm" với "thêm / bớt".
- **Nhãn riêng:** `nham-don-vi` (cùng số khác đơn vị), `quen-doi` (quên đổi đơn vị), `nham-boi` (nhầm bội 10, 100, 1 000). Chuẩn: `nham-bang`, `cong-thay-nhan`, `chon-sai-phep`, `thieu-buoc`, `dao-vai`.
- **Hình thước** có vạch mm (mỗi vạch là một nét thẳng, vạch cm dài hơn, vạch 5 mm vừa); `check()` đọc lại số vạch và chiều dài vật từ SVG.

## 1. Bốn mục tiêu (muctieu) × ba mức (Thông tư 27)

| MT | Tên | Mức 1 — Nhận biết | Mức 2 — Hiểu | Mức 3 — Vận dụng |
|---|---|---|---|---|
| MT1 | Mi-li-mét và thước | Que kem dày mấy mi-li-mét; đọc vạch cm. | Đoạn thẳng từ vạch 0 dài mấy mm (đếm vạch). | Đoạn không bắt đầu từ vạch 0: hiệu hai vạch. |
| MT2 | Đổi đơn vị và chọn đơn vị | 2 cm = ? mm; 10 mm = 1 cm. | 6 cm = ? mm; 30 mm = ? cm; 1 000 mm = 1 m; con kiến dài 3 mm hay 3 cm. | Chọn đơn vị hợp lí; so sánh 25 mm với 3 cm. |
| MT3 | Tính với số đo | 250 mm + 100 mm; 25 mm + 3 mm. | 420 mm − 150 mm; 64 mm − 15 mm; 11 mm × 3; 50 mm : 2. | Gấp, giảm (16 mm gấp 5 lần; 78 mm giảm 3 lần); phép nào cho kết quả 80 mm. |
| MT4 | Giải toán và vận dụng | Cào cào 12 mm; con kia gấp 3 lần. | Ốc sên bò 152 mm rồi 264 mm: tất cả. | Hai bước; bạn nói đúng hay sai ("Em thấy thế nào?"). |

Tham số engine: `goal:10, soCau:18, soCauToiDa:24`. 4 mục tiêu × tối thiểu 3 câu = 12 ≤ 18.

## 2. Mười dạng (topics) — xếp theo mạch sư phạm

"Nguồn": **SGK** = có trong sách (mục ghi trong ngoặc) · **không có trong SGK** = dạng thêm.

| # | Dạng | Nguồn | MT | Mức 1 / Mức 2 / Mức 3 | Hình | Nhãn lỗi chính |
|---|---|---|---|---|---|---|
| D1 | Que kem và thước | SGK (Khám phá) | MT1 | M1: que kem dày mấy mm (một vạch) · M2: bao nhiêu vạch mm trong 1 cm (đếm) · M3: đoạn dài mấy mm khi biết số vạch | **hình mới** `thuocMm` (thước, vạch mm) | `nham-boi`, `nham-bang` |
| D2 | Đọc đoạn thẳng trên thước | SGK (Hoạt động 1) | MT1 | M1: AB từ 0 tới 2 cm: mấy mm · M2: CD tới 3 cm, tới 5 cm · M3: đoạn từ vạch 1 cm tới 4 cm; từ vạch 20 mm tới 70 mm | `thuocMm` | `nham-don-vi`, `quen-doi` |
| D3 | Đổi cm và mm | SGK (Hoạt động 2) | MT2 | M1: 2 cm = ? mm; 10 mm = ? cm · M2: 6 cm = ? mm; 30 mm = ? cm · M3: 9 cm = ? mm; 80 mm = ? cm; 1 m = ? mm | chữ | `quen-doi`, `nham-boi` |
| D4 | Mét và mi-li-mét | SGK (Hoạt động 2) | MT2 | M1: 1 000 mm = ? m · M2: 1 m = ? mm; 1 m = ? cm; 1 cm = ? mm · M3: 2 m = ? mm; 3 000 mm = ? m | chữ | `nham-boi`, `quen-doi` |
| D5 | Cùng số, khác đơn vị | SGK (Hoạt động 3) | MT2 | M1: con kiến dài 3 … (mm / cm) · M2: ve sầu 3 …; vật nào dài hơn (3 mm hay 3 cm) · M3: 25 mm hay 3 cm dài hơn; đổi về cùng đơn vị | chữ, `anh` nếu có | `nham-don-vi`, `quen-doi` |
| D6 | Cộng, trừ số đo | SGK (Luyện tập 1) | MT3 | M1: 250 mm + 100 mm; 25 mm + 3 mm · M2: 420 mm − 150 mm; 64 mm − 15 mm · M3: số có ba chữ số cả hai vế (386 mm + 214 mm); số đo mm cộng cm sau khi đổi (30 mm + 2 cm) | chữ | `nham-bang`, `chon-sai-phep`, `quen-doi` |
| D7 | Nhân, chia số đo | SGK (Luyện tập 1) | MT3 | M1: 11 mm × 3; 50 mm : 2 · M2: 12 mm × 4; 90 mm : 3 · M3: 25 mm × 3; 96 mm : 4 | chữ | `nham-bang`, `cong-thay-nhan` |
| D8 | Gấp và giảm số đo | SGK (Luyện tập 2, đổi thành chọn một và đếm) | MT3 | M1: 16 mm gấp 5 lần: kết quả · M2: phép nào cho kết quả 80 mm (chọn một trong bốn thẻ) · M3: trong tám thẻ, có mấy thẻ cho kết quả 60 mm | `theTinh` (chép từ bài 24) | `nham-gap-them`, `nham-chieu`, `dem-sot-phep` |
| D9 | Ốc sên và cào cào | SGK (Luyện tập 3, 4) | MT4 | M1: cào cào 12 mm, con kia gấp 3 lần: con kia · M2: ốc sên bò 152 mm rồi 264 mm: tất cả · M3: gấp rồi cộng (cả hai con cào cào); quãng đường còn lại | chữ | `thieu-buoc`, `tra-loi-sai-buoc` |
| D10 | Bạn nói đúng hay sai | **không có trong SGK** | MT4 | M1: Đúng / Sai: "30 mm = 3 cm" · M2: "Bạn An nói: 3 cm bằng 3 mm" (em thấy thế nào) · M3: "Bạn An nói: 2 m = 200 mm" với "Đồng ý, vì… / Không đồng ý, vì…" | `anh('boy')` | `nham-don-vi`, `nham-boi` |

Dạng không có trong SGK: **Bạn nói đúng hay sai (D10)** (1 dạng). Chín dạng còn lại bám các mục của sách (D3 và D4 tách đôi Hoạt động 2 cho dễ chia mức).

Phân bố: MT1 hai dạng (D1, D2) · MT2 ba dạng (D3, D4, D5) · MT3 ba dạng (D6, D7, D8) · MT4 hai dạng (D9, D10). Mỗi mục tiêu ≥ 2 dạng.

### Luật lời câu hỏi (áp dụng cho cả bài)

- Nút **Đúng / Sai** chỉ đi với **mệnh đề**; câu "… có … không?" dùng nút **Có / Không**.
- Dạng "Bạn An nói …" dùng "Em thấy thế nào?" với "Đồng ý, vì…" / "Không đồng ý, vì…". Đáp án không tự mâu thuẫn với đề.
- Luôn ghi **đơn vị** sau số ("250 mm", "3 cm"); đáp án nhiễu **không chứa chính đối tượng đang hỏi**; ô trả lời có đơn vị ghi sẵn.
- Phép tính đổi đơn vị chỉ dùng số nguyên (1 cm = 10 mm, 1 m = 1 000 mm = 100 cm). Mọi kết quả nguyên ≤ 1 000.
- Nhãn trong hình nằm giữa đúng phần nó đo; nhãn ở rìa khung chừa lề ≥ 1,3 lần cỡ chữ.

## 3. Hình mới cần vẽ (viết ngay trong `bai-30.js`, KHÔNG sửa `figures.js`)

Theo quy chuẩn `sk-ve-hinh-tieuhoc`: bảng màu `HM`, `svgHinh`, `nhanTron` / `nhanVien`; mỗi hình là MỘT SVG co theo màn hình; chữ ≥ 14px ở khổ điện thoại; nét và chữ dùng `currentColor`; nét thẳng có `fill="none"`; không emoji hệ thống.

| Hàm | Mô tả | Tham số | Kiểm do mã |
|---|---|---|---|
| `thuocMm(cm, tu, den, nhan)` | Thước kẻ dài `cm` xăng-ti-mét: vạch mm ngắn, vạch 5 mm vừa, vạch cm dài có số (0, 1, 2, …, chữ ≥ 14px). Một đoạn màu (que kem, đoạn AB) từ vạch `tu` tới vạch `den` (đơn vị mm). Nhãn tên đoạn (AB, que kem) nằm trên đoạn. | cm ≤ 6, tu, den, tên | `check()` đếm vạch (mỗi vạch `data-mm`) = 10 × cm + 1 và đọc lại `tu`, `den` từ thuộc tính; đáp = den − tu. |
| `theTinh(ds)` (chép từ `bai-24.js`) | Dãy thẻ phép tính. | ds | tính lại từng thẻ. |

Hình dùng lại từ `figures.js`: `anh`, `oHoi`, `svgHinh`, `HM`, `nhanVien`, `tinhBT`.

## 4. Nhãn lỗi

- Chuẩn của engine dùng được: `nham-bang`, `cong-thay-nhan`, `chon-sai-phep`, `thieu-buoc`, `dao-vai`.
- **Nhãn riêng của bài 30** (khai báo qua `BAI.loi`):

| Nhãn | Tên hiển thị | Ví dụ lỗi | Gợi ý |
|---|---|---|---|
| `nham-don-vi` | Nhầm đơn vị (cùng số, khác đơn vị) | 3 cm viết 3 mm; con ve sầu dài 3 mm | "3 cm dài hơn 3 mm: đơn vị khác nhau thì độ dài khác nhau." |
| `quen-doi` | Quên đổi đơn vị | 6 cm = 6 mm; 30 mm + 2 cm = 32 | "Muốn cộng, đổi về cùng một đơn vị: 2 cm = 20 mm." |
| `nham-boi` | Nhầm bội của đơn vị (10, 100, 1 000) | 1 cm = 100 mm; 1 m = 100 mm | "1 cm = 10 mm; 1 m = 1 000 mm." |
| `nham-gap-them`, `nham-chieu` (dùng cho D8) | Như bài 24, 27 | 16 mm gấp 5 lần viết 16 + 5 | "Gấp 5 lần là nhân với 5." |
| `tra-loi-sai-buoc` (dùng cho D9) | Như bài 28 | Cả hai con mà đáp số con thứ hai | "Câu hỏi cuối là cả hai con: còn một bước nữa." |

## 5. Rủi ro đã biết

1. **Số lớn:** kết quả có ba chữ số; ô đáp có sẵn đơn vị; số trên 999 viết "1 000" (dấu cách) và `check()` kiểm kết quả ≤ 1 000.
2. **Thước vạch mm:** 6 cm × 10 vạch mịn có thể chật trên điện thoại: mỗi cm rộng ≥ 34 đơn vị khung, vạch cm có số, vạch 5 mm vừa; chỉ dựng thước tối đa 6 cm; số trên thước không đè vạch.
3. **Đoạn không bắt đầu từ vạch 0 (D2 mức 3):** đo bằng hiệu hai vạch; đoạn không chồng nhãn số.
4. **Khác đơn vị trong một phép tính (D6 mức 3):** chỉ dùng khi đổi đơn vị là phép nhân 10 (cm → mm), có gợi ý "đổi về cùng đơn vị" khi sai.
5. **Chọn đơn vị (D5):** câu hỏi không nhắc kích thước thực; chỉ dùng vật quen (con kiến, con ve sầu, cái bút, cuốn sách) có nhãn đơn vị rõ; không dựng hình con vật nếu không vẽ chuẩn: chữ thay thế.
6. **Không nhãn sát biên:** font Linux hẹp hơn Segoe UI; thầy soát lại hình trên máy thầy (ghi trong PR).
7. `index.html` dùng CRLF: sửa bằng Python đọc/ghi nhị phân (không `sed -i`), diff đúng 1 dòng.
8. `kiem_dem.mjs` kiểm các `data-dem` của bài (nếu hình có).

## 6. Việc sẽ làm sau khi thầy duyệt

1. Viết `bai-30.js` theo bảng trên (nối chuỗi, **không** backtick hay template literal), chép `bai-30.html`, sửa `index.html` (một dòng).
2. Chạy RIÊNG từng cổng (đặt `CHROME` nếu cần):
   - `node .claude/skills/sk-web-toan-tieuhoc/assets/kiemtra.js . bai-30.js 400000`
   - `node .claude/skills/sk-ve-hinh-tieuhoc/assets/phong_tranh.mjs . <thư mục tạm> bai-30 --soat --khong-chup --rong 375,1200 --giao light,dark --lan 3` → 0 lỗi
   - `node .claude/skills/sk-web-toan-tieuhoc/assets/soat_giao_dien.mjs . bai-30 --cau 2`
3. Tự soi ảnh phòng tranh (thước mm), push, ghi kết quả từng cổng trong mô tả PR, đổi tiêu đề thành "[XONG] Bài 30", gỡ trạng thái nháp. Không tự gộp.

## 7. Cần thầy quyết (kèm phương án đề xuất)

1. **Mục SGK ở mục 0 và bảng dạng** có đúng không? Đề xuất: đúng như bảng.
2. **Luyện tập 2 (nối)** đổi thành chọn một và đếm (D8): đồng ý (**đề xuất**).
3. **Phạm vi số:** kết quả ≤ 1 000, có dấu cách hàng nghìn: đồng ý (**đề xuất**).
4. **Dạng "không có trong SGK" (D10):** giữ (**đề xuất**) hay bớt?
5. **Ba nhãn riêng** (`nham-don-vi`, `quen-doi`, `nham-boi`): giữ (**đề xuất**) hay gom về `nham-bang`, `thieu-buoc`?
6. **Bốn mục tiêu, mười dạng**; xếp lại thứ tự dạng theo sư phạm như bài 9–29 (**đề xuất**).
