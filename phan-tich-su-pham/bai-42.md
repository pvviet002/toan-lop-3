# Phân tích sư phạm — Bài 42: Ôn tập biểu thức số (BÀI MỚI — BẢN NHÁP CHỜ DUYỆT)

Mẫu: `bai-38.js` (`tinhBT2`, `tinhTSP`, `tinhBoNgoac`, `okBuoc`, `theTinh`, các bộ sinh biểu thức) + khối "LUYỆN THÔNG MINH" ở đầu `engine.js`.
Phạm vi: tạo mới `bai-42.js`, `bai-42.html`, thêm 42 vào `AVAILABLE` (giữ CRLF, diff 1 dòng) và file này. Không đụng `engine.js`, `figures.js`, `lua.js`. Chưa viết dòng mã nào.

Bài 42 là bài thứ hai của **Chủ đề 7**; sách dành 2 trang luyện tập (116–117). Dùng **4 mục tiêu** × 10 dạng.

## 0. Nguồn và điều cần lưu ý

Nội dung SGK (trang in 116–117) lấy từ **bản tóm tắt của phiên Claude trên máy thầy**; phiên đám mây chưa tự đối chiếu sách. Không chép nguyên văn đề vào repo.

- **Trang 1.** Bài 1: 731 − 680 + 19 = 70; 63 × 2 : 7 = 18; 14 × 6 − 29 = 55; 348 + 84 : 6 = 362. Bài 2: bao gạo 30 kg, bao ngô 45 kg: 3 bao gạo và 1 bao ngô nặng 30 × 3 + 45 = 135 kg. Bài 3 (năm cái kẹo A–E, giá trị lớn hơn 80): 30 × 2 + 20 = 80; 50 + 100 : 2 = 100; 60 : 3 + 70 = 90; 30 + 40 × 2 = 110; 20 × 5 − 30 = 70: lớn hơn 80 là B, C, D (**bẫy** A bằng 80). Bài 4 Đố em: 5 ? 5 ? 5 = 5 với dấu + hoặc −: 5 + 5 − 5 hoặc 5 − 5 + 5.
- **Trang 2.** Bài 1: 182 − (96 − 54) = 140; 7 × (48 : 6) = 56. Bài 2 (cá heo, bóng 100, 50, 210, 40): 4 × (54 − 44) = 40; (33 + 67) : 2 = 50; (25 + 45) × 3 = 210; 52 + 24 × 2 = 100. Bài 3: 27 + 34 + 66 = 127 (ghép 34 + 66 = 100); 7 × 5 × 2 = 70 (ghép 5 × 2 = 10). Bài 4: 288 bánh xe, mỗi hộp 4 bánh, mỗi thùng 8 hộp: 72 hộp; 9 thùng. Bài 5 Đố em: 6 × (6 ? 6) bé nhất khi ? là − (0); + 72; × 216; : 6.
- **Lỗi hay gặp:** làm từ trái sang phải khi có nhân chia; bỏ ngoặc; nhầm "lớn hơn 80" với "bằng 80"; bài hai bước thiếu bước thứ hai.
- **Số:** mọi giá trị nguyên 0–999; chia hết ở mọi bước; số ba chữ số trong biểu thức (731 − 680 + 19) cho phép.

## 1. Bốn mục tiêu × ba mức

| MT | Tên | Mức 1 | Mức 2 | Mức 3 |
|---|---|---|---|---|
| MT1 | Tính giá trị không ngoặc | 731 − 680 + 19; 63 × 2 : 7 (từ trái sang phải). | 14 × 6 − 29; 348 + 84 : 6 (nhân chia trước). | Ba phép hỗn hợp với số ba chữ số. |
| MT2 | Tính giá trị có ngoặc | 7 × (48 : 6). | 182 − (96 − 54); cá heo: biểu thức nào bằng 40. | Bốn thẻ có ngoặc và không ngoặc: thẻ nào bằng 100. |
| MT3 | So sánh và chọn dấu | Biểu thức nào lớn hơn 80 (bốn thẻ, một bẫy bằng 80). | Đố em 5 ? 5 ? 5 = 5. | 6 × (6 ? 6) bé nhất; đếm thẻ lớn hơn 80. |
| MT4 | Vận dụng và tính thuận tiện | 3 bao gạo và 1 bao ngô (30 × 3 + 45). | 288 bánh xe: hộp, thùng (hai bước). | 27 + 34 + 66; 7 × 5 × 2: ghép thuận tiện. |

Tham số engine: `goal:10, soCau:18, soCauToiDa:24`.

## 2. Mười dạng (topics)

| # | Dạng | Nguồn | MT | Mức 1 / Mức 2 / Mức 3 | Hình | Nhãn lỗi chính |
|---|---|---|---|---|---|---|
| D1 | Từ trái sang phải | SGK (Bài 1a, b trang 1) | MT1 | M1: 731 − 680 + 19 (số ba chữ số, chỉ cộng trừ) · M2: 63 × 2 : 7 (chỉ nhân chia) · M3: ba phép cộng trừ số ba chữ số | chữ | `nham-bang`, `thieu-buoc` |
| D2 | Nhân chia trước | SGK (Bài 1c, d trang 1) | MT1 | M1: 14 × 6 − 29 · M2: 348 + 84 : 6 · M3: hai phép ưu tiên (bài 38 D6 mức 3) | chữ | `tinh-trai-sang-phai`, `nhan-chia-sau` |
| D3 | Gạo và ngô | SGK (Bài 2 trang 1) | MT4 | M1: 3 bao gạo nặng bao nhiêu · M2: 3 bao gạo và 1 bao ngô (30 × 3 + 45) · M3: chọn biểu thức đúng trong bốn | chữ | `thieu-buoc`, `chon-sai-phep` |
| D4 | Lớn hơn 80 | SGK (Bài 3 trang 1) | MT3 | M1: thẻ nào có giá trị lớn hơn 80 (ba thẻ, một đúng; một thẻ **bằng** 80) · M2: có mấy thẻ lớn hơn 80 (bốn thẻ, một bằng 80) · M3: ngưỡng khác (bé hơn 50) với năm thẻ | `theTinh` | `nham-bang-lon-hon`, `tinh-trai-sang-phai` |
| D5 | Đố em: chọn dấu | SGK (Bài 4 trang 1; Bài 5 trang 2) | MT3 | M1: 5 ? 5 ? 5 = 5: chọn cặp dấu đúng (bốn cặp) · M2: 6 × (6 ? 6) bé nhất: chọn dấu · M3: a ? a ? a = a với a khác; 6 × (6 ? 6) lớn nhất | thẻ | `nham-bang`, `bo-ngoac` |
| D6 | Có dấu ngoặc | SGK (Bài 1 trang 2) | MT2 | M1: 7 × (48 : 6) · M2: 182 − (96 − 54) · M3: số ba chữ số và ngoặc chứa phép chia | chữ | `bo-ngoac`, `thieu-buoc` |
| D7 | Cá heo và bóng | SGK (Bài 2 trang 2) | MT2 | M1: biểu thức nào bằng 40 (bốn thẻ) · M2: quả bóng nào (bốn số) ứng với một biểu thức · M3: đếm thẻ bằng số đã cho | `theTinh` | `bo-ngoac`, `tinh-trai-sang-phai` |
| D8 | Tính thuận tiện | SGK (Bài 3 trang 2) | MT4 | M1: 27 + 34 + 66 (ghép tròn trăm) · M2: 7 × 5 × 2 (ghép 10) · M3: chọn cách ghép thuận tiện trong bốn thẻ | `theTinh` | `thieu-buoc`, `nham-bang` |
| D9 | Bánh xe: hộp và thùng | SGK (Bài 4 trang 2) | MT4 | M1: 288 bánh xe, mỗi hộp 4: mấy hộp · M2: mỗi thùng 8 hộp: mấy thùng (hai bước) · M3: số khác; hỏi "mỗi thùng có bao nhiêu bánh xe" (nhân) | chữ | `thieu-buoc`, `chon-sai-phep` |
| D10 | Bạn An tính | **không có trong SGK** | MT1 | M1: An làm từ trái sang phải: em thấy thế nào · M2: An bỏ ngoặc · M3: kết quả đúng là bao nhiêu | `anh('boy')` | `tinh-trai-sang-phai`, `bo-ngoac` |

Dạng không có trong SGK: D10. Phân bố: MT1 ba dạng (D1, D2, D10) · MT2 hai dạng (D6, D7) · MT3 hai dạng (D4, D5) · MT4 ba dạng (D3, D8, D9).

### Luật lời câu hỏi
- "Lớn hơn 80" không gồm "bằng 80": lời gợi ý nói rõ.
- Đố em: chọn một trong các cặp dấu; đúng một phương án cho giá trị cần tìm (5 ? 5 ? 5 = 5 có **hai** cách đúng trong sách: trên web chọn "cặp dấu nào đúng" với phương án gồm cả hai cách đúng thành một thẻ, hoặc hỏi "cặp nào **không** đúng"? Xem mục 7).
- Mọi đẳng thức trong phương án đúng số học.

## 3. Hình
Không có hình mới: `theTinh`, `tinhBT2`, `tinhTSP`, `tinhBoNgoac`, `okBuoc`, các bộ sinh `btTrai`, `btUuTien`, `btNgoac` (chép từ bài 38, mở rộng số đến ba chữ số), `anh('boy')`.

## 4. Nhãn lỗi
Chuẩn + riêng (chép từ bài 38): `tinh-trai-sang-phai`, `nhan-chia-sau`, `bo-ngoac`, `nham-gia-tri`, `dem-sot-phep`; **mới:** `nham-bang-lon-hon` — "Nhầm bằng với lớn hơn" (chọn thẻ bằng 80 khi hỏi lớn hơn 80).

## 5. Rủi ro
1. Đố em 5 ? 5 ? 5 = 5 có hai cách đúng: phương án là **cặp dấu** ("+ rồi −", "− rồi +", "+ rồi +", "× rồi −"); hỏi "cặp nào cho kết quả 5": vẫn hai đúng ⇒ hỏi "cặp dấu nào **cho kết quả khác 5**" hoặc giữ một cặp đúng trong bốn (bỏ cặp đúng thứ hai khỏi phương án). Đề xuất: bỏ cặp đúng thứ hai.
2. 6 × (6 ? 6): phương án bốn dấu, đúng một dấu cho bé nhất (−) hoặc lớn nhất (×).
3. Số ba chữ số trong biểu thức: `okBuoc` giữ 0–999; 731 − 680 + 19 hợp lệ.
4. `index.html` CRLF; font Linux: thầy soát lại trên máy thầy.

## 6. Việc sẽ làm sau khi thầy duyệt
Viết `bai-42.js`, chép `bai-42.html`, sửa `index.html`; chạy đủ cổng; PR "[XONG] Bài 42".

## 7. Cần thầy quyết (kèm đề xuất)
1. Mục SGK và bảng dạng đúng chưa? Đề xuất: đúng như bảng.
2. **Đố em 5 ? 5 ? 5 = 5** (hai cách đúng): bỏ một cách đúng khỏi phương án (**đề xuất**) hay hỏi "cặp nào cho kết quả khác 5"?
3. **D10 bạn An** ngoài SGK để MT1 đủ ba dạng: giữ (**đề xuất**).
