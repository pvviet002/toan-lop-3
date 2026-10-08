# Phân tích sư phạm — Bài 21: Khối lập phương, khối hộp chữ nhật (BÀI MỚI — BẢN NHÁP CHỜ DUYỆT)

Mẫu: `bai-17.js`, `bai-19.js` (bài hình học mới, có hình riêng trong file) + khối "LUYỆN THÔNG MINH" ở đầu `engine.js`.
Phạm vi: tạo mới `bai-21.js`, `bai-21.html` (chép từ `assets/bai-template.html`), thêm 21 vào `AVAILABLE` trong `index.html` (giữ CRLF, diff đúng 1 dòng)
và file phân tích này. Không đụng `engine.js`, `figures.js`, `lua.js`. Bài mới **không** thêm vào `chua_chuan.txt`: `phong_tranh --soat` phải 0 lỗi. Chưa viết dòng mã nào.

Bài 21 là bài **hình khối** đầu tiên (hai trang sách). Dùng **4 mục tiêu** × 9 dạng.

## 0. Nguồn và điều cần lưu ý

- Cấu trúc mục SGK (trang in 63–64) lấy từ **bản tóm tắt của phiên Claude trên máy thầy**; phiên đám mây chưa tự đối chiếu sách. Không chép nguyên văn đề vào repo; chỉ ghi dạng bài và ý.
  - **Khám phá:** khối hộp chữ nhật và khối lập phương đều có 8 đỉnh, 6 mặt, 12 cạnh; các mặt của khối hộp chữ nhật là hình chữ nhật; các mặt của khối lập phương là hình vuông; chỉ ra một cạnh, một đỉnh, một mặt trên khối.
  - **Hoạt động 1:** khung sắt dạng khối hộp chữ nhật có cạnh sơn xanh và đỏ: a) có mấy cạnh xanh, mấy cạnh đỏ (4 cạnh dọc xanh, 8 cạnh đỏ); b) tấm gỗ vừa khít mặt trước khung là hình gì.
    **Hoạt động 2:** gần mỗi đỉnh khối lập phương gỗ chạm 3 bông hoa; tất cả bao nhiêu bông (8 đỉnh × 3 = 24).
  - **Luyện tập 1:** con kiến bò theo các cạnh (màu cam) trên khung nhôm hình hộp chữ nhật tới hạt gạo: bò qua mấy cạnh. **Luyện tập 2:** đèn lồng khối lập phương, mỗi cạnh một nan tre, mỗi mặt dán một tờ giấy màu: a) mỗi đèn mấy nan tre (12); b) 5 đèn mấy tờ giấy (6 × 5 = 30).
- **Hình khối (3D) viết bằng SVG, phép chiếu xiên:** mặt trước là hình chữ nhật (hoặc hình vuông), mặt sau dịch lên phải và lên trên; **cạnh khuất vẽ nét đứt** (ba cạnh gặp nhau ở đỉnh sau-dưới-trái). Đỉnh, cạnh, mặt do mã sinh từ 8 đỉnh; `check()` tính lại số đỉnh, cạnh, mặt, không tin nhãn.
- **Cạnh tô màu phải đếm được:** mỗi cạnh là một nét có `data-dem="xanh"`, `"do"` hoặc `"cam"`; `check()` đếm lại trong chuỗi SVG, bằng số mà đáp án dựa vào (xanh 4, đỏ 8).
- **Không số thập phân.** Mọi độ dài cạnh nguyên (cm).
- **Hình mới viết trong `bai-21.js`**, không sửa `figures.js`. Hoa ở đỉnh và đèn lồng vẽ đơn giản (chấm hoa, nan tre), không dùng emoji.

## 1. Bốn mục tiêu (muctieu) × ba mức (Thông tư 27)

| MT | Tên | Mức 1 — Nhận biết | Mức 2 — Hiểu | Mức 3 — Vận dụng |
|---|---|---|---|---|
| MT1 | Nhận biết khối: đỉnh, cạnh, mặt | Khối có mấy đỉnh, mấy cạnh, mấy mặt; chỉ ra đỉnh, cạnh, mặt được tô. | Hộp chữ nhật hay lập phương: mặt là hình gì; khối lập phương có các cạnh bằng nhau. | Đ hay S: tìm lỗi của bạn; khối nào là khối lập phương (các cạnh ghi cm). |
| MT2 | Mặt của khối | Mặt trước (mặt tô màu) là hình gì. | Tấm gỗ vừa khít mặt trước khung hộp chữ nhật. | Khối lập phương: mặt là hình vuông; hộp chữ nhật có hai mặt giống nhau. |
| MT3 | Đếm cạnh | Đếm cạnh xanh, cạnh đỏ trên khung. | Con kiến bò theo cạnh tới hạt gạo: đếm cạnh trên đường đi. | Đường đi dài hơn, qua nhiều cạnh; cạnh nét đứt (khuất) vẫn là cạnh. |
| MT4 | Vận dụng phép nhân | Hoa ở mỗi đỉnh: 8 × 3; đèn lồng có 12 nan. | 5 đèn lồng cần 6 × 5 = 30 tờ giấy; số nan của hai đèn. | Bài toán hai bước (nan và giấy); đổi số đèn, số hoa ở mỗi đỉnh. |

Tham số engine: `goal:10, soCau:18, soCauToiDa:24`. 4 mục tiêu × tối thiểu 3 câu = 12 ≤ 18.

## 2. Chín dạng (topics) — xếp theo mạch sư phạm

"Nguồn": **SGK** = có trong sách (mục ghi trong ngoặc) · **không có trong SGK** = dạng thêm.

| # | Dạng | Nguồn | MT | Mức 1 / Mức 2 / Mức 3 | Hình | Nhãn lỗi chính |
|---|---|---|---|---|---|---|
| D1 | Đỉnh, cạnh, mặt | SGK (Khám phá) | MT1 | M1: khối có mấy đỉnh / cạnh / mặt (số) · M2: một khối hộp chữ nhật rồi một khối lập phương, hỏi số đỉnh · M3: Đ/S "Khối lập phương có 8 mặt." | **hình mới** `khoiHop` | `nham-dinh-canh-mat`, `lech-nhom` |
| D2 | Chỉ đỉnh, cạnh, mặt | SGK (Khám phá: chỉ ra) | MT1 | M1: phần được tô là gì (cạnh / đỉnh / mặt), chọn một · M2: tô một mặt, chọn đúng tên mặt · M3: tô cạnh khuất (nét đứt) | `khoiHop` | `nham-dinh-canh-mat` |
| D3 | Mặt của khối | SGK (Khám phá, Hoạt động 1b) | MT2 | M1: hình tô là mặt gì · M2: tấm gỗ vừa khít mặt trước: hình gì (hộp chữ nhật → "hình chữ nhật"; khối lập phương → "hình vuông"; phương án khác: hình tròn, hình tam giác) · M3: mặt bên của khối lập phương | `khoiHop` | `nham-hinh-mat`, `lech-nhom` |
| D4 | Đếm cạnh tô màu | SGK (Hoạt động 1a) | MT3 | M1: có mấy cạnh xanh (4) · M2: có mấy cạnh đỏ (8) · M3: có mấy cạnh xanh và đỏ cộng lại (12) hoặc chênh lệch. Đáp bằng số | `khoiHop` (cạnh `data-dem`) | `dem-sot-canh`, `lech-nhom` |
| D5 | Con kiến bò | SGK (Luyện tập 1) | MT3 | M1: ba cạnh cam liền nhau · M2: đường đi 4–5 cạnh trên khung hộp chữ nhật · M3: đường đi dài 6 cạnh có cả cạnh khuất. Đáp bằng số | `khoiHop` (cạnh cam) | `dem-sot-canh` |
| D6 | Hoa ở đỉnh | SGK (Hoạt động 2) | MT4 | M1: mỗi đỉnh 3 bông, 8 đỉnh → 24 · M2: mỗi đỉnh 2 bông · M3: có 4 đỉnh chạm hoa, đếm hoa. Đáp bằng số | `khoiHop` (hoa `data-dem`) | `cong-thay-nhan`, `thieu-buoc` |
| D7 | Đèn lồng | SGK (Luyện tập 2) | MT4 | M1: một đèn có mấy nan tre (12) · M2: 5 đèn có mấy tờ giấy (6 × 5) · M3: hai bước: n đèn cần bao nhiêu nan và bao nhiêu giấy (cộng hai số) | `khoiHop` | `cong-thay-nhan`, `thieu-buoc` |
| D8 | Khối nào là khối lập phương | **không có trong SGK** | MT1 | M1: hai khối, các cạnh ghi cm: khối nào có các cạnh bằng nhau · M2: ba khối · M3: một khối ghi hai cạnh bằng nhau, một cạnh khác (bẫy) | `khoiHop` có nhãn cm | `nham-lap-phuong`, `lech-nhom` |
| D9 | Đúng / Sai tìm lỗi | **không có trong SGK** | MT1, MT2 | M1: mệnh đề đơn · M2: "Khối hộp chữ nhật có 6 cạnh." · M3: "Bạn An nói: «…». Em thấy thế nào?" với "Đồng ý, vì…" / "Không đồng ý, vì…" | `khoiHop`, `anh('boy')` | `nham-dinh-canh-mat`, `nham-hinh-mat` |

Dạng không có trong SGK: **Khối nào là khối lập phương**, **Đúng / Sai tìm lỗi** (2 dạng). Bảy dạng còn lại bám các mục của sách.

Phân bố: MT1 ba dạng (D1, D2, D8, cộng D9) · MT2 hai dạng (D3, D9) · MT3 hai dạng (D4, D5) · MT4 hai dạng (D6, D7). Mỗi mục tiêu ≥ 2 dạng.

### Luật lời câu hỏi (áp dụng cho cả bài)

- Nút **Đúng / Sai** chỉ đi với **mệnh đề**; câu "… có … không?" dùng nút **Có / Không**.
- Dạng "Bạn An nói …" dùng "Em thấy thế nào?" với "Đồng ý, vì…" / "Không đồng ý, vì…".
- Đáp án nhiễu **không chứa chính đối tượng đang hỏi**. Câu chọn hình của mặt: không để cả "hình vuông" và "hình chữ nhật" cùng là đáp án khi mặt là hình vuông (mặt khối lập phương chỉ có phương án "hình vuông", "hình tròn", "hình tam giác").
- Nhãn độ dài (cm) nằm giữa **đúng cạnh** nó đo, mỗi cạnh một nhãn; nhãn ở rìa khung chừa lề ≥ 1,3 lần cỡ chữ.

## 3. Hình mới cần vẽ (viết ngay trong `bai-21.js`, KHÔNG sửa `figures.js`)

Theo quy chuẩn `sk-ve-hinh-tieuhoc`: bảng màu `HM`, `svgHinh`, `nhanTron` / `nhanVien`; mỗi hình là MỘT SVG co theo màn hình; chữ ≥ 14px ở khổ điện thoại; nét và chữ dùng `currentColor`; nét thẳng có `fill="none"`; không emoji hệ thống.

| Hàm | Mô tả | Tham số | Kiểm do mã |
|---|---|---|---|
| `khoiHop(spec)` | Khối hộp chữ nhật hoặc lập phương theo phép chiếu xiên: 8 đỉnh (có thể có nhãn chữ), 12 cạnh, 6 mặt; cạnh khuất nét đứt; tuỳ chọn: tô một mặt, tô một đỉnh, tô cạnh theo màu (`xanh`, `do`, `cam`), nhãn cm giữa cạnh, hoa ở đỉnh. | `spec` = {dai, rong, cao (đơn vị), to: …} | `check()` tính số đỉnh, cạnh, mặt từ 8 đỉnh; đếm `data-dem` bằng số cạnh/hoa mà đáp án dựa vào; tên mặt từ danh sách mặt, không từ nhãn. |
| `duongKien(spec)` | `khoiHop` cộng đường đi của con kiến (các cạnh cam liền nhau) tới hạt gạo (chấm nhỏ). Con kiến và hạt gạo vẽ đơn giản (thân tròn, sáu chân). | `spec` + đường đi (danh sách đỉnh) | `check()` đếm cạnh cam = số đoạn của đường đi; hai cạnh liên tiếp chung đỉnh. |
| `denLong(n)` | Đèn lồng khối lập phương: khung nan tre (12 cạnh), mặt dán giấy màu nhạt (6 mặt); hình một đèn hoặc hàng đèn. | `n` | `check()` đếm nan và mặt; đèn trong hàng không chồng nhau. |

Hình dùng lại từ `figures.js`: `anh('boy')`, `nhanTron`, `nhanVien`, `svgHinh`, `HM`.

## 4. Nhãn lỗi

- Chuẩn của engine dùng được: `lech-nhom`, `cong-thay-nhan`, `thieu-buoc`.
- **Nhãn riêng của bài 21** (khai báo qua `BAI.loi`):

| Nhãn | Tên hiển thị | Ví dụ lỗi | Gợi ý |
|---|---|---|---|
| `nham-dinh-canh-mat` | Nhầm đỉnh, cạnh, mặt | Gọi cạnh là mặt; đếm 6 đỉnh thay vì 8 | "Đỉnh là điểm góc, cạnh là đoạn nối hai đỉnh, mặt là hình phẳng bao quanh." |
| `nham-hinh-mat` | Nhầm hình của mặt | Mặt khối lập phương chọn "hình chữ nhật" hay "hình tròn" | "Mặt khối hộp chữ nhật là hình chữ nhật; mặt khối lập phương là hình vuông." |
| `dem-sot-canh` | Đếm sót hoặc thừa cạnh | Quên các cạnh khuất (nét đứt); đếm hai lần một cạnh | "Cạnh nét đứt vẫn là cạnh. Bé đếm lần lượt, không đếm hai lần." |
| `nham-lap-phuong` | Nhầm khối lập phương với hộp chữ nhật | Chỉ nhìn mặt trước vuông mà bỏ qua cạnh còn lại | "Khối lập phương có tất cả các cạnh bằng nhau. Bé so cả ba số đo." |

## 5. Rủi ro đã biết

1. **Phép chiếu xiên dễ gây nhầm**: nhãn đỉnh đặt ngoài hình theo hướng xa tâm, cách nét ≥ 14 đơn vị; cạnh khuất nét đứt không đè nhãn. Soát hình sáng và tối ở 375px.
2. **Các cạnh cùng `data-dem` chung đỉnh**: nếu `phong_tranh` báo đè giữa các nét `data-dem`, vẽ mỗi cạnh bằng thanh mảnh rút ngắn hai đầu (như que tính ở bài 19) thay vì nét thẳng.
3. **Mặt trước, mặt sau**: câu hỏi chỉ dùng "mặt trước" khi mặt đó tô màu trong hình, tránh nhầm với mặt sau bị che.
4. **Khối lập phương nhận ra bằng số đo** (D8), vì phép chiếu xiên rút ngắn độ sâu; hình không thể tự nó cho biết khối có phải khối lập phương hay không.
5. **Hình khối không phải đa giác lồi trên mặt phẳng**: `check()` không dùng thuật toán đa giác; tính trên danh sách đỉnh, cạnh, mặt.
6. **Nhãn không sát biên**: font Linux hẹp hơn Segoe UI; thầy soát lại hình trên máy thầy.
7. `index.html` dùng CRLF: sửa bằng Python đọc/ghi nhị phân (không `sed -i`), diff đúng 1 dòng.
8. `kiem_dem.mjs` báo sai vì `figures.js` trên `main` chưa có `data-dem` (đã biết, không sửa); các `data-dem` của bài 21 do `check()` đếm lại.

## 6. Việc sẽ làm sau khi thầy duyệt

1. Viết `bai-21.js` theo bảng trên (nối chuỗi, **không** backtick hay template literal), chép `bai-21.html`, sửa `index.html` (một dòng).
2. Chạy RIÊNG từng cổng (đặt `CHROME` nếu cần):
   - `node .claude/skills/sk-web-toan-tieuhoc/assets/kiemtra.js . bai-21.js 400000`
   - `node .claude/skills/sk-ve-hinh-tieuhoc/assets/phong_tranh.mjs . <thư mục tạm> bai-21 --soat --khong-chup --rong 375,1200 --giao light,dark --lan 3` → 0 lỗi
   - `node .claude/skills/sk-web-toan-tieuhoc/assets/soat_giao_dien.mjs . bai-21 --cau 2`
3. Tự soi ảnh phòng tranh (hình khối, đường kiến, đèn lồng), push, ghi kết quả từng cổng trong mô tả PR, đổi tiêu đề thành "[XONG] Bài 21", gỡ trạng thái nháp. Không tự gộp.

## 7. Cần thầy quyết (kèm phương án đề xuất)

1. **Mục SGK ở mục 0 và bảng dạng** có đúng không? Đề xuất: đúng như bảng.
2. **Hình khối bằng phép chiếu xiên** (mặt trước hình chữ nhật, mặt sau dịch lên phải và lên trên, cạnh khuất nét đứt): đồng ý (**đề xuất**).
3. **Dạng "Khối nào là khối lập phương" (D8)** nhận ra bằng số đo cm, vì hình xiên không tự cho biết: đồng ý (**đề xuất**).
4. **Con kiến** vẽ thân tròn, sáu chân, râu; **hoa** vẽ chấm tròn nhiều cánh nhỏ; **đèn lồng** vẽ nan và mặt giấy: đồng ý vẽ đơn giản, không nhận ra thì ghi nhãn chữ (**đề xuất**).
5. **Bốn nhãn riêng** (`nham-dinh-canh-mat`, `nham-hinh-mat`, `dem-sot-canh`, `nham-lap-phuong`): giữ (**đề xuất**) hay gom bớt về `lech-nhom`?
6. **Bốn mục tiêu, chín dạng**; xếp lại thứ tự dạng theo sư phạm như bài 9–20 (**đề xuất**).
7. Xác nhận 9 dạng và 2 dạng "không có trong SGK".
