# Phân tích sư phạm — Bài 35: Luyện tập chung (BÀI MỚI)

Mẫu: `bai-31.js` (cân đĩa), `bai-33.js`, `bai-29.js` (`soDoGT`), `bai-24.js` (`theTinh`) + khối "LUYỆN THÔNG MINH" ở đầu `engine.js`.
Phạm vi: tạo mới `bai-35.js`, `bai-35.html`, thêm 35 vào `AVAILABLE` trong `index.html` (giữ CRLF, diff đúng 1 dòng) và file này. Không đụng `engine.js`, `figures.js`, `lua.js`.
Thầy Việt đã cho phép làm liền, không chờ duyệt từng bước. Phân tích và mã trong cùng một PR.

Bài 35 là bài cuối của **Chủ đề 5**. Dùng **4 mục tiêu** × 9 dạng.

## 0. Nguồn và điều cần lưu ý

Nội dung SGK (trang in 95–96) lấy từ **bản tóm tắt của phiên Claude trên máy thầy** (đã đối chiếu từng số); phiên đám mây chưa tự đối chiếu sách. Không chép nguyên văn đề vào repo.

- **Tiết 1.** Bài 1: a) 329 ml − 135 ml = 194 ml; 200 g − 150 g = 50 g; 392 mm + 43 mm = 435 mm; b) 251 ml + 262 ml = 513 ml; 37 g + 63 g − 30 g = 70 g; 87 mm − 17 mm + 10 mm = 80 mm.
  Bài 2 (cân đĩa thăng bằng): a) bên trái quả cân 100 g và hộp quà, bên phải quả cân 500 g: hộp quà 400 g; b) bên trái quả cân 50 g và chùm nho, bên phải 100 g và 100 g: chùm nho 150 g.
  Bài 3: cô Ba đơm một chiếc cúc áo hết 70 mm chỉ: 5 chiếc hết 350 mm.
  Bài 4: Rô-bốt có hai cốc 150 ml và 400 ml, lấy 250 ml nước từ thùng: đổ đầy cốc 400 ml, rót sang cốc 150 ml cho đầy, trong cốc 400 ml còn 250 ml. Trên web đổi thành chọn một cách đúng trong bốn cách.
- **Tiết 2.** Bài 1 (Số? ba chuỗi hai bước): 8 ml gấp 3 lần → 24 ml, giảm 4 lần → 6 ml; 42 g giảm 3 lần → 14 g, gấp 5 lần → 70 g; 20 mm gấp 2 lần → 40 mm, giảm 8 lần → 5 mm.
  Bài 2: ba túi A, B, C trên cân đĩa: túi A cân bằng với quả cân 100 g + 200 g (300 g); quả cân 500 g cân bằng với túi B và quả cân 200 g (B nặng 300 g); đĩa chứa túi C thấp hơn: túi C nặng nhất.
  Trò chơi "Dế mèn phiêu lưu kí" (bàn cờ ô phép tính với số đo): không dựng bàn cờ; dùng các phép tính làm câu "ô nào có kết quả 100".
- Không số âm, không số thập phân; kết quả ≤ 1 000.
- **Nhãn riêng:** `nham-chieu`, `nham-gap-them`, `nham-giam-bot`, `nham-cao-thap`, `dem-sot-phep`, `quen-doi`; chuẩn: `nham-bang`, `chon-sai-phep`, `thieu-buoc`, `dao-vai`, `cong-thay-nhan`.

## 1. Bốn mục tiêu (muctieu) × ba mức

| MT | Tên | Mức 1 | Mức 2 | Mức 3 |
|---|---|---|---|---|
| MT1 | Tính với số đo | Cộng, trừ không nhớ; một phép gấp, giảm. | Có nhớ (392 mm + 43 mm); ba số; hai mũi tên gấp rồi giảm. | Số có ba chữ số cả hai vế; hai mũi tên hỗn hợp. |
| MT2 | Cân đĩa | Hộp quà thăng bằng với quả cân; bên nào nặng hơn. | Chùm nho (50 g + chùm = 100 g + 100 g); ba túi, túi nào nặng nhất. | Ba quả cân mỗi bên; túi nào nhẹ nhất. |
| MT3 | Đo lường trong đời sống | 5 chiếc cúc áo hết bao nhiêu mm chỉ. | Đong 250 ml bằng hai cốc; mỗi chiếc cúc hết bao nhiêu. | Số khác; cuộn chỉ còn lại bao nhiêu. |
| MT4 | Tính nhanh và tìm lỗi | Ô nào có kết quả 100; Đúng / Sai. | Có mấy ô có kết quả 100; bạn tính ba số. | Tám ô; bạn nói hộp quà nặng bao nhiêu. |

Tham số engine: `goal:10, soCau:18, soCauToiDa:24`.

## 2. Chín dạng (topics)

| # | Dạng | Nguồn | MT | Hình | Nhãn lỗi chính |
|---|---|---|---|---|---|
| D1 | Cộng, trừ số đo | SGK (Tiết 1, bài 1) | MT1 | chữ | `nham-bang`, `chon-sai-phep` |
| D2 | Tính ba số | SGK (Tiết 1, bài 1b) | MT1 | chữ | `thieu-buoc`, `chon-sai-phep` |
| D7 | Chuỗi hai bước | SGK (Tiết 2, bài 1) | MT1 | `soDoGT` (chép từ bài 29) | `nham-chieu`, `thieu-buoc` |
| D3 | Hộp quà và chùm nho | SGK (Tiết 1, bài 2) | MT2 | `canDia` (chép từ bài 31) | `thieu-buoc`, `chon-sai-phep` |
| D4 | Cân nghiêng: túi nặng nhất | SGK (Tiết 2, bài 2) | MT2 | `canDia` có cân nghiêng và nhãn chữ | `nham-cao-thap` |
| D5 | Chỉ đơm cúc áo | SGK (Tiết 1, bài 3) | MT3 | chữ | `cong-thay-nhan`, `thieu-buoc` |
| D6 | Đong nước bằng hai cốc | SGK (Tiết 1, bài 4) | MT3 | chữ | `nham-bang` |
| D8 | Tính nhanh | SGK (trò chơi, đổi thành chọn một và đếm) | MT4 | `theTinh` | `dem-sot-phep` |
| D9 | Bạn nói đúng hay sai | không có trong SGK | MT4 | `anh('boy')` | `nham-bang`, `chon-sai-phep` |

Luật: Đ/S chỉ cho mệnh đề; "Bạn An nói…" dùng "Em thấy thế nào?"; mọi phép tính trong phương án đúng số học; nhãn trắng chứa số cỡ 18 cao ≥ 30; nhãn ở rìa chừa lề ≥ 1,3 lần cỡ chữ; hai dòng chữ cách ≥ 1,4 lần cỡ chữ.

## 3. Rủi ro

1. **Cân nghiêng:** đĩa thấp hơn là đĩa nặng hơn; `check()` đọc `data-nghieng` và tổng hai bên.
2. **Ba cân (D4 mức 2, 3):** cân 1 và 2 thăng bằng cho A = B; cân 3 chỉ so C với B nên C là túi nặng nhất (hoặc nhẹ nhất) duy nhất; `check()` tính lại A và B từ SVG.
3. **Đong hai cốc (D6):** năm cách, kết quả đều khác nhau; đúng một cách cho kết quả cần tìm.
4. **Tính nhanh (D8):** không dùng số có dấu cách trong thẻ (`tinhBT` không đọc được).
5. `index.html` dùng CRLF: sửa bằng Python đọc/ghi nhị phân, diff đúng 1 dòng.
