# Phân tích sư phạm — Bài 33: Nhiệt độ. Đơn vị đo nhiệt độ (BÀI MỚI)

Mẫu: `bai-31.js` (hình đọc số từ SVG, nhãn lỗi riêng, `check()` đọc lại số từ chuỗi SVG) + khối "LUYỆN THÔNG MINH" ở đầu `engine.js`.
Phạm vi: tạo mới `bai-33.js`, `bai-33.html`, thêm 33 vào `AVAILABLE` trong `index.html` (giữ CRLF, diff đúng 1 dòng) và file này. Không đụng `engine.js`, `figures.js`, `lua.js`.
Thầy Việt đã cho phép làm liền, không chờ duyệt từng bước. Bài này viết phân tích rồi mã trong cùng một PR.

Bài 33 là bài thứ tư của **Chủ đề 5: Một số đơn vị đo**. Dùng **4 mục tiêu** × 9 dạng.

## 0. Nguồn và điều cần lưu ý

- Cấu trúc mục SGK (trang in 91–93) lấy từ **bản tóm tắt của phiên Claude trên máy thầy** (đã đối chiếu từng số trên sách); phiên đám mây chưa tự đối chiếu sách. Không chép nguyên văn đề vào repo.
  - **Khám phá:** ba vật: cốc A nước nóng, chai B nước nguội, cốc C nước đá: nước cốc A nóng hơn chai B; nước cốc C lạnh hơn chai B. Đơn vị đo nhiệt độ là **độ C**, viết °C: 10 °C đọc "mười độ xê"; trong thực tế viết gọn 10°.
  - **Hoạt động 1:** nhiệt kế đo không khí, thang chia vạch, nhãn 5, 10, …, 50 (chỉ phần từ 0 trở lên): mức thuỷ ngân ở vạch 30 → 30 °C. Bảng nhiệt độ buổi sáng: Hà Nội 30 °C, Lào Cai 26 °C, Sa Pa 10 °C: nơi nào cao hơn (Hà Nội), nơi nào thấp hơn (Sa Pa).
    **Hoạt động 2:** nhiệt kế y tế, thang khoảng 35–42 °C, mức thuỷ ngân ở vạch 37 → 37 °C; bác sĩ đo hai bạn: Việt 37 °C, Nam 38 °C.
  - **Luyện tập 1:** dự báo nhiệt độ trong ngày: sáng 27 °C, trưa 36 °C, đêm 15 °C; thấp nhất 15 °C, cao nhất 36 °C.
    **Luyện tập 2:** ba người đo nhiệt độ cơ thể 38 °C, 37 °C, 39 °C; bình thường là 37 °C: nhiệt độ nào cao hơn bình thường (38 °C và 39 °C).
    **Luyện tập 3:** hoạt động ở nhà (xem nhiệt kế để mặc áo cho hợp, nhờ người lớn đo khi sốt): đổi thành câu "chọn việc nên làm".
- **Chỉ dùng nhiệt độ từ 0 °C trở lên; không số âm; không số thập phân.**
- **Lỗi hay gặp:** đọc sai vạch (đếm thiếu vạch từ nhãn 5); nhầm "cao hơn / thấp hơn"; trừ ngược khi tìm chênh lệch; nhầm "nóng hơn" với số nhỏ hơn.
- **Nhãn riêng:** `doc-sai-vach` (đọc sai vạch nhiệt kế), `nham-cao-thap` (nhầm cao hơn với thấp hơn). Chuẩn: `nham-bang`, `chon-sai-phep`, `thieu-buoc`, `dao-vai`, `dem-sot-phep`.
- **Hình nhiệt kế:** nằm ngang, ống thuỷ ngân đỏ đến đúng vạch, mỗi vạch 1 °C, nhãn ở mỗi 5 °C (không khí) hoặc mỗi 1 °C (y tế 35–42); `check()` đọc `data-t` và số vạch từ SVG.

## 1. Bốn mục tiêu (muctieu) × ba mức (Thông tư 27)

| MT | Tên | Mức 1 — Nhận biết | Mức 2 — Hiểu | Mức 3 — Vận dụng |
|---|---|---|---|---|
| MT1 | Nóng, lạnh và độ C | Cốc nào nóng nhất; đọc "10 °C". | Nóng hơn hay lạnh hơn; viết "hai mươi lăm độ xê". | Xếp từ lạnh nhất đến nóng nhất; đọc số có hai chữ số. |
| MT2 | Đọc nhiệt kế | Mức thuỷ ngân ở vạch có nhãn (30 °C). | Vạch 5 °C; nhiệt kế y tế (37 °C). | Đếm vạch từ nhãn gần nhất (27 °C); hai nhiệt kế y tế. |
| MT3 | So sánh và tính nhiệt độ | Nơi nào cao hơn (30 °C và 10 °C). | Thấp nhất, cao nhất; có sốt không (hơn 37 °C). | Chênh lệch cao nhất và thấp nhất; đếm người cao hơn bình thường. |
| MT4 | Vận dụng | Nên mặc gì khi trời lạnh. | Cơ thể 39 °C nên làm gì; bạn nói đúng hay sai. | Buổi nào nên mang áo ấm; bạn nói (em thấy thế nào). |

Tham số engine: `goal:10, soCau:18, soCauToiDa:24`. 4 mục tiêu × tối thiểu 3 câu = 12 ≤ 18.

## 2. Chín dạng (topics) — xếp theo mạch sư phạm

| # | Dạng | Nguồn | MT | Mức 1 / Mức 2 / Mức 3 | Hình | Nhãn lỗi chính |
|---|---|---|---|---|---|---|
| D1 | Nóng và lạnh | SGK (Khám phá a) | MT1 | M1: cốc nào nóng nhất (nóng, nguội, nước đá) · M2: nước cốc A nóng hơn hay lạnh hơn chai B · M3: xếp từ lạnh nhất đến nóng nhất | chữ | `nham-cao-thap` |
| D2 | Đọc và viết độ C | SGK (Khám phá b) | MT1 | M1: 10 °C đọc là gì · M2: "hai mươi lăm độ xê" viết là · M3: đọc 36 °C, 38 °C | chữ | `nham-hang`, `nham-bang` |
| D3 | Nhiệt kế không khí | SGK (Hoạt động 1a) | MT2 | M1: mức thuỷ ngân ở vạch có số (10, 20, 30, 40) · M2: vạch 5, 15, 25, 35 · M3: đếm vạch từ nhãn gần nhất (27, 33) | **hình mới** `nhietKe` (thang 0–50) | `doc-sai-vach`, `dem-sot-phep` |
| D4 | Nhiệt kế y tế | SGK (Hoạt động 2) | MT2 | M1: một nhiệt kế y tế (36–40 °C) · M2: hai nhiệt kế: ai cao hơn (Việt 37, Nam 38) · M3: hai nhiệt kế: cao hơn bao nhiêu độ | `nhietKe` (thang 35–42) | `doc-sai-vach`, `nham-cao-thap` |
| D5 | Nhiệt độ các nơi | SGK (Hoạt động 1b) | MT3 | M1: hai nơi, nơi nào cao hơn · M2: ba nơi, nơi nào thấp nhất · M3: Hà Nội cao hơn Sa Pa bao nhiêu độ | bảng chữ | `nham-cao-thap`, `chon-sai-phep` |
| D6 | Dự báo trong ngày | SGK (Luyện tập 1) | MT3 | M1: buổi nào nóng nhất · M2: nhiệt độ thấp nhất, cao nhất (đáp số) · M3: cao nhất hơn thấp nhất bao nhiêu độ | bảng chữ | `chon-sai-phep`, `nham-cao-thap` |
| D7 | Nhiệt độ cơ thể | SGK (Luyện tập 2) | MT3 | M1: Đúng / Sai "38 °C cao hơn 37 °C" · M2: bạn có cao hơn bình thường không (Có / Không) · M3: ba người, mấy người cao hơn bình thường | chữ | `nham-cao-thap` |
| D8 | Nên làm gì | SGK (Luyện tập 3) | MT4 | M1: trời lạnh nên mặc gì · M2: nhiệt độ cơ thể 39 °C nên làm gì · M3: buổi nào nên mang áo ấm (thấp nhất) | chữ | `nham-cao-thap` |
| D9 | Bạn nói đúng hay sai | **không có trong SGK** | MT4 | M1: Đúng / Sai "35 °C nóng hơn 25 °C" · M2: bạn An nói Sa Pa nóng hơn Hà Nội (em thấy thế nào) · M3: bạn An nói Nam cao hơn bình thường 1 độ | `anh('boy')` | `nham-cao-thap`, `chon-sai-phep` |

Dạng không có trong SGK: **Bạn nói đúng hay sai (D9)**. Tám dạng còn lại bám các mục của sách.

Phân bố: MT1 hai dạng (D1, D2) · MT2 hai dạng (D3, D4) · MT3 ba dạng (D5, D6, D7) · MT4 hai dạng (D8, D9).

### Luật lời câu hỏi (áp dụng cho cả bài)

- Nút **Đúng / Sai** chỉ đi với **mệnh đề**; câu "… có … không?" dùng nút **Có / Không**.
- "Bạn An nói …" dùng "Em thấy thế nào?" với "Đồng ý, vì…" / "Không đồng ý, vì…". Đáp án không tự mâu thuẫn với đề; mọi phép tính trong phương án đúng số học.
- Luôn ghi "°C" sau số. Không số âm, không số thập phân.
- Nhãn trắng chứa số cỡ 18 cao ≥ 30; hai dòng chữ cách ≥ 1,4 lần cỡ chữ; nhãn ở rìa khung chừa lề ≥ 1,3 lần cỡ chữ.

## 3. Hình mới (viết ngay trong `bai-33.js`, KHÔNG sửa `figures.js`)

| Hàm | Mô tả | Kiểm do mã |
|---|---|---|
| `nhietKe(t, lo, hi)` | Nhiệt kế nằm ngang: bầu và ống, thuỷ ngân đỏ tới `t`; vạch mỗi 1 °C; nhãn số mỗi 5 °C (thang 0–50) hoặc mỗi 1 °C (thang 35–42). | `check()` đọc `data-t`, `data-lo`, `data-hi` và số vạch = hi − lo + 1. |

## 4. Nhãn lỗi

| Nhãn | Tên hiển thị | Ví dụ lỗi | Gợi ý |
|---|---|---|---|
| `doc-sai-vach` | Đọc sai vạch nhiệt kế | Mức ở 27 mà đọc 25 hoặc 30 | "Từ nhãn 25, đếm thêm 2 vạch nhỏ: 27." |
| `nham-cao-thap` | Nhầm cao hơn với thấp hơn | Sa Pa 10 °C nóng hơn Hà Nội 30 °C | "Số lớn hơn thì nóng hơn." |

## 5. Rủi ro đã biết

1. **Nhiệt kế nằm ngang:** 50 vạch trên 288 đơn vị khung (5,76 mỗi vạch): vạch mảnh nhưng thấy rõ; nhãn mỗi 5 °C cách ≥ 28 đơn vị; nhãn ở hai đầu chừa lề ≥ 22.
2. **Đọc số bằng chữ (D2):** chỉ dùng số có cách đọc không bất thường (không dùng 1, 4, 5 ở hàng đơn vị trừ "lăm" ở 15, 25, 35).
3. **Nhiệt độ cơ thể 37 °C bình thường:** không đưa lời khuyên y tế cụ thể; chỉ "báo người lớn".
4. `index.html` dùng CRLF: sửa bằng Python đọc/ghi nhị phân (không `sed -i`), diff đúng 1 dòng.

## 6. Cổng kiểm

`kiemtra.js`, `phong_tranh.mjs --soat`, `soat_giao_dien.mjs`, `dang_web.mjs . --thu`: chạy riêng từng cổng; kết quả ghi trong PR.
