# Phân tích sư phạm — Bài 40: Luyện tập chung (BÀI MỚI — BẢN NHÁP CHỜ DUYỆT)

Mẫu: `bai-36.js` (`nhanDoc3`), `bai-37.js` (`chiaDoc3`, `soDoGT`), `bai-38.js` (`tinhBT2`, `theTinh`), `bai-35.js` (khuôn luyện tập chung) + khối "LUYỆN THÔNG MINH" ở đầu `engine.js`.
Phạm vi: tạo mới `bai-40.js`, `bai-40.html`, thêm 40 vào `AVAILABLE` (giữ CRLF, diff 1 dòng) và file này. Không đụng `engine.js`, `figures.js`, `lua.js`. Chưa viết dòng mã nào.

Bài 40 là bài cuối của **Chủ đề 6**; sách dành 2 trang (111–112). Dùng **4 mục tiêu** × 9 dạng.

## 0. Nguồn và điều cần lưu ý

Nội dung SGK (trang in 111–112) lấy từ **bản tóm tắt của phiên Claude trên máy thầy**; phiên đám mây chưa tự đối chiếu sách. Không chép nguyên văn đề vào repo.

- **Luyện tập trang 1.** Bài 1 (đặt tính): 122 × 4 = 488; 327 × 3 = 981; 715 : 5 = 143; 645 : 3 = 215.
  Bài 2a (bảng số đã cho → giảm 3 lần → gấp 4 lần): 12 → 4 → 48; 15 → 5 → 60; 18 → 6 → 72. Bài 2b (gấp mấy lần): 36 và 9 → 4; 40 và 8 → 5; 45 và 5 → 9.
  Bài 3: bê 120 kg, bò gấp 3 lần: bò 360 kg, cả hai 480 kg.
- **Luyện tập trang 2.** Bài 1 (cánh hoa 55, 30, 305, 396, 200): 360 + 47 − 102 = 305; 360 − (335 − 30) = 55; 132 × (12 − 9) = 396; 80 + 60 × 2 = 200; (150 + 30) : 6 = 30.
  Bài 2: cây cau lúc trồng 2 m, nay 6 m: gấp 3 lần.
  Bài 3a: ngỗng 6 kg; chó gấp 2 lần ngỗng; lợn gấp 5 lần chó: 6 × 2 × 5 = 60 kg; (6 × 2) × 5 và 6 × (2 × 5) cùng bằng 60, cách ghép 2 × 5 = 10 thuận tiện hơn; nhận xét (a × b) × c = a × (b × c) (chỉ nói bằng lời, chưa gọi tên). Bài 3b: 8 × 5 × 2 = 80; 9 × 2 × 5 = 90.
- **Lỗi hay gặp:** quên nhớ khi nhân; thương thiếu chữ số 0; nhầm giảm (chia) với gấp (nhân); lấy số bé chia số lớn; bài hai bước thiếu bước cộng "cả hai"; bỏ ngoặc.
- **Số:** tích ≤ 999; thương nguyên; mọi giá trị biểu thức 0–999; số nhiều chữ số nhất là 999 (không "1 000").

## 1. Bốn mục tiêu × ba mức

| MT | Tên | Mức 1 | Mức 2 | Mức 3 |
|---|---|---|---|---|
| MT1 | Nhân, chia số có ba chữ số | 122 × 4 (không nhớ); 645 : 3 (ô ? một chữ số). | 327 × 3 (có nhớ); 715 : 5 (có bước dư). | Nhớ hai lần; thương có chữ số 0; chọn kết quả đúng. |
| MT2 | Gấp, giảm, gấp mấy lần | 12 giảm 3 lần → 4 → gấp 4 lần → 48 (một mũi tên). | Hai mũi tên; 36 và 9 gấp mấy lần. | Cây cau 2 m và 6 m; số lớn tròn chục. |
| MT3 | Biểu thức | 80 + 60 × 2; (150 + 30) : 6 (có mẫu). | Cánh hoa: biểu thức nào bằng 305. | 360 − (335 − 30); 132 × (12 − 9); đếm cánh hoa. |
| MT4 | Bài toán hai bước, tính thuận tiện | Bê 120 kg, bò gấp 3: bò nặng bao nhiêu. | Cả hai nặng bao nhiêu (hai bước); lợn 6 × 2 × 5. | Cách ghép thuận tiện (6 × (2 × 5)); 8 × 5 × 2; 9 × 2 × 5. |

Tham số engine: `goal:10, soCau:18, soCauToiDa:24`.

## 2. Chín dạng (topics)

| # | Dạng | Nguồn | MT | Mức 1 / Mức 2 / Mức 3 | Hình | Nhãn lỗi chính |
|---|---|---|---|---|---|---|
| D1 | Đặt tính nhân | SGK (LT1 trang 1) | MT1 | M1: không nhớ, ô ? một chữ số · M2: nhớ một lần, cả tích · M3: nhớ hai lần | `nhanDoc3` (chép bài 36) | `quen-nho`, `nho-sai-hang` |
| D2 | Đặt tính chia | SGK (LT1 trang 1) | MT1 | M1: chia hết, ô ? chữ số thương · M2: có bước dư giữa chừng (715 : 5), cả thương · M3: thương có chữ số 0 hoặc có dư | `chiaDoc3` (chép bài 37) | `quen-ha`, `thieu-so-0` |
| D3 | Chọn kết quả đúng | **không có trong SGK** (mượn kiểu bài 41) | MT1 | M1: 122 × 4 = ? trong bốn số · M2: 645 : 3 · M3: số dư của phép chia | thẻ số | `quen-nho`, `thieu-so-0` |
| D4 | Giảm rồi gấp | SGK (LT2a trang 1) | MT2 | M1: một mũi tên (12 giảm 3 lần) · M2: hai mũi tên (giảm 3 rồi gấp 4) · M3: hai mũi tên, hỏi ô giữa khi biết ô cuối | `soDoGT` (chép bài 37) | `nham-chieu`, `thieu-buoc` |
| D5 | Gấp mấy lần | SGK (LT2b trang 1; LT2 trang 2) | MT2 | M1: 36 và 9 · M2: 40 và 8, 45 và 5 · M3: cây cau 2 m và 6 m; số tròn chục (80 và 20) | chữ, bảng `tri` | `chia-nguoc`, `nham-hon-gap` |
| D6 | Bê và bò | SGK (LT3 trang 1) | MT4 | M1: bò gấp 3 lần bê 120 kg · M2: cả hai nặng bao nhiêu · M3: số khác; hỏi bò nặng hơn bê bao nhiêu | chữ | `thieu-buoc`, `nham-hon-gap` |
| D7 | Cánh hoa | SGK (LT1 trang 2) | MT3 | M1: tính một biểu thức (có nhân chia trước) · M2: biểu thức nào bằng số ở cánh hoa (bốn thẻ) · M3: có ngoặc: 360 − (335 − 30); 132 × (12 − 9) | `theTinh` | `tinh-trai-sang-phai`, `bo-ngoac` |
| D8 | Ngỗng, chó, lợn | SGK (LT3a trang 2) | MT4 | M1: chó nặng bao nhiêu (6 × 2) · M2: lợn nặng bao nhiêu (ba thừa số) · M3: cách ghép nào thuận tiện: (6 × 2) × 5 hay 6 × (2 × 5) | chữ | `thieu-buoc`, `cong-thay-nhan` |
| D9 | Nhân ba số thuận tiện | SGK (LT3b trang 2) | MT4 | M1: 8 × 5 × 2 (ghép 5 × 2) · M2: 9 × 2 × 5; 7 × 2 × 5 · M3: 4 × 7 × 25? không (ngoài bảng); dùng 3 × 5 × 2 × … không; M3: chọn cách ghép đúng trong bốn thẻ | `theTinh` | `nham-bang`, `thieu-buoc` |

Dạng không có trong SGK: D3. Phân bố: MT1 ba dạng (D1–D3) · MT2 hai dạng (D4, D5) · MT3 một dạng (D7, ba mức) · MT4 ba dạng (D6, D8, D9).

### Luật lời câu hỏi
- "Gấp mấy lần" → đơn vị lần; "nặng hơn bao nhiêu" → kg.
- Tính thuận tiện: hỏi "cách nào thuận tiện hơn" (chọn) với hai cách cùng giá trị; không gọi tên "tính chất kết hợp".
- Mọi đẳng thức trong phương án đúng số học.

## 3. Hình
Không có hình mới: `nhanDoc3` (bài 36), `chiaDoc3` (bài 37), `soDoGT` (bài 37), `theTinh` và `tinhBT2` (bài 38), bảng `tri` (bài 36). Chép vào `bai-40.js` (mỗi bài một tệp, không dùng chung).

## 4. Nhãn lỗi
Chuẩn: `nham-bang`, `cong-thay-nhan`, `thieu-buoc`, `chon-sai-phep`, `dao-vai`. Riêng (chép tên và lời từ bài 36–39): `quen-nho`, `nho-sai-hang`, `quen-ha`, `thieu-so-0`, `du-lon-hon-chia`, `nham-chieu`, `nham-giam-bot`, `chia-nguoc`, `nham-hon-gap`, `tinh-trai-sang-phai`, `bo-ngoac`.

## 5. Rủi ro
1. Bài ôn tập nhiều hình chép từ ba bài: giữ nguyên hàm, chỉ đổi tên nếu trùng.
2. D4 mức 3 (hỏi ô giữa): ô giữa = ô cuối : k2; bộ sinh chọn số chia hết.
3. D9: ba thừa số trong bảng nhân (2–9), tích ≤ 999; cách ghép thuận tiện là cặp có tích 10 hoặc tròn chục.
4. `index.html` CRLF; font Linux: thầy soát lại trên máy thầy.

## 6. Việc sẽ làm sau khi thầy duyệt
Viết `bai-40.js`, chép `bai-40.html`, sửa `index.html`; chạy đủ cổng; PR "[XONG] Bài 40".

## 7. Cần thầy quyết (kèm đề xuất)
1. Mục SGK và bảng dạng đúng chưa? Đề xuất: đúng như bảng.
2. **D3 (chọn kết quả đúng)** thêm ngoài SGK để MT1 có ba dạng: giữ (**đề xuất**) hay bỏ?
3. **D9 mức 3**: chọn cách ghép đúng trong bốn thẻ (có thẻ ghép sai như "8 × (5 + 2)"): đồng ý (**đề xuất**).
