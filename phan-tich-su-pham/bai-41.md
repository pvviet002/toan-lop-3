# Phân tích sư phạm — Bài 41: Ôn tập phép nhân, phép chia trong phạm vi 100, 1 000 (BÀI MỚI — BẢN NHÁP CHỜ DUYỆT)

Mẫu: `bai-36.js` (`nhanDoc3`), `bai-37.js` (`chiaDoc3`), `bai-26.js` (`chiaDoc2` hai chữ số), `bai-14.js` (một phần mấy, lưới vật), `bai-40.js` (khi có) + khối "LUYỆN THÔNG MINH" ở đầu `engine.js`.
Phạm vi: tạo mới `bai-41.js`, `bai-41.html`, thêm 41 vào `AVAILABLE` (giữ CRLF, diff 1 dòng) và file này. Không đụng `engine.js`, `figures.js`, `lua.js`. Chưa viết dòng mã nào.

Bài 41 mở đầu **Chủ đề 7: Ôn tập học kì 1**; sách dành 3 trang luyện tập (113–115). Dùng **4 mục tiêu** × 12 dạng.

## 0. Nguồn và điều cần lưu ý

Nội dung SGK (trang in 113–115) lấy từ **bản tóm tắt của phiên Claude trên máy thầy**; phiên đám mây chưa tự đối chiếu sách. Không chép nguyên văn đề vào repo.

- **Trang 1.** Nhẩm: 20 × 3 = 60; 40 × 2 = 80; 50 × 2 = 100; 30 × 3 = 90; 60 : 2 = 30; 80 : 4 = 20; 90 : 3 = 30; 100 : 5 = 20. Đặt tính: 34 × 2 = 68; 15 × 6 = 90; 23 × 4 = 92; 69 : 3 = 23; 84 : 7 = 12; 95 : 8 = 11 (dư 7). Đ, S: 17 × 5 = 55 SAI (85); 86 : 6 = 14 (dư 2) với các bước 6, 26, 24, 2 ĐÚNG. Bài toán: hai xe, mỗi xe 45 học sinh: 90. Thùng 28 l, can 5 l: cần ít nhất 6 can (25 l còn 3 l).
- **Trang 2.** Nhẩm: 300 × 3 = 900; 400 × 2 = 800; 200 × 4 = 800; 500 × 2 = 1 000; 800 : 4 = 200; 700 : 7 = 100; 600 : 3 = 200; 400 : 2 = 200. Đặt tính: 423 × 2 = 846; 107 × 9 = 963; 91 × 8 = 728; 848 : 4 = 212; 740 : 5 = 148; 569 : 9 = 63 (dư 2). Đ, S: 114 × 6 = 684 ĐÚNG; 510 : 5 = 12 SAI (đúng 102, thiếu chữ số 0). 256 cái bánh, mỗi hộp 8: 32 hộp. Tìm chữ số: 1?2 × 4 = 60? → 152 × 4 = 608; 3? × 7 = ??6 → 38 × 7 = 266.
- **Trang 3.** Chọn đáp án: 192 × 4 = 768 (A 468, B 768, C 786, D 867); 906 : 3 = 302 (A 320, B 32, C 203, D 302); số dư của 628 : 8 là 4 (A 2, B 3, C 4, D 5). Tìm thành phần: ? × 6 = 186 (31); ? : 7 = 105 (735); 72 : ? = 8 (9). Mi hái 25 bông, Mai gấp 3 lần: Mai 75, cả hai 100. Số?: 15 ngôi sao (3 hàng 5 cột): 1/3 là 5; 1/5 là 3. Đố em: chọn ba chữ số 1, 2, 3 điền (hai chữ số) × (một chữ số) = 63: 21 × 3.
- **Lỗi hay gặp:** nhẩm sai hàng (50 × 2 = 10); quên nhớ; thương thiếu chữ số 0; số dư ≥ số chia; quên cộng 1 khi còn dư; nhầm thành phần (tìm số bị chia thì nhân).
- **Số:** 500 × 2 = 1 000 viết "1 000" (số duy nhất tới 1 000); còn lại ≤ 999.

## 1. Bốn mục tiêu × ba mức

| MT | Tên | Mức 1 | Mức 2 | Mức 3 |
|---|---|---|---|---|
| MT1 | Nhẩm và đặt tính trong phạm vi 100 | 20 × 3, 60 : 2; 34 × 2. | 15 × 6 (có nhớ); 69 : 3, 84 : 7. | 95 : 8 = 11 (dư 7); Đ/S 17 × 5 = 55. |
| MT2 | Nhẩm và đặt tính trong phạm vi 1 000 | 300 × 3, 800 : 4; 423 × 2. | 107 × 9, 91 × 8; 848 : 4. | 740 : 5 = 148; 569 : 9 (dư 2); Đ/S 510 : 5 = 12; tìm chữ số 1?2 × 4 = 60?. |
| MT3 | Chọn đáp án và tìm thành phần | 192 × 4 trong bốn số; ? × 6 = 186. | 906 : 3; ? : 7 = 105. | Số dư của 628 : 8; 72 : ? = 8; đố em 21 × 3 = 63. |
| MT4 | Giải toán | Hai xe 45 học sinh; Mai gấp 3 lần Mi 25 bông. | 256 bánh vào hộp 8; cả hai bạn hái bao nhiêu. | Thùng 28 l, can 5 l: cần ít nhất mấy can; 1/3 của 15 ngôi sao. |

Tham số engine: `goal:10, soCau:18, soCauToiDa:24`.

## 2. Mười hai dạng (topics)

| # | Dạng | Nguồn | MT | Mức 1 / Mức 2 / Mức 3 | Hình | Nhãn lỗi chính |
|---|---|---|---|---|---|---|
| D1 | Nhẩm trong phạm vi 100 | SGK (trang 1) | MT1 | M1: 20 × 3, 60 : 2 · M2: 50 × 2 = 100, 100 : 5 · M3: chọn thẻ có kết quả 60 trong bốn | chữ, `theTinh` | `nham-hang`, `thieu-so-0` |
| D2 | Đặt tính hai chữ số | SGK (trang 1) | MT1 | M1: 34 × 2, 23 × 4 (ô ? tích) · M2: 15 × 6 (có nhớ); 69 : 3 · M3: 84 : 7, 95 : 8 (dư) | `nhanDoc2` (rút từ `nhanDoc3`), `chiaDoc2` (bài 26) | `quen-nho`, `quen-ha`, `du-lon-hon-chia` |
| D3 | Đúng hay sai (100) | SGK (trang 1) | MT1 | M1: 17 × 5 = 55 (Đ/S) · M2: 86 : 6 = 14 (dư 2) với các bước (Đ/S) · M3: sai ở đâu | `chiaDoc2` bài An | `quen-nho`, `du-lon-hon-chia` |
| D4 | Nhẩm trong phạm vi 1 000 | SGK (trang 2) | MT2 | M1: 300 × 3, 800 : 4 · M2: 500 × 2 = 1 000; 700 : 7 · M3: chọn thẻ có kết quả 800 | chữ, `theTinh` | `nham-hang` |
| D5 | Đặt tính ba chữ số | SGK (trang 2) | MT2 | M1: 423 × 2; 848 : 4 (ô ?) · M2: 107 × 9, 91 × 8; 740 : 5 · M3: 569 : 9 (dư 2); thương có 0 | `nhanDoc3`, `chiaDoc3` | `quen-nho`, `thieu-so-0`, `quen-ha` |
| D6 | Đúng hay sai (1 000) | SGK (trang 2) | MT2 | M1: 114 × 6 = 684 (Đ/S) · M2: 510 : 5 = 12 (Đ/S) · M3: kết quả đúng là bao nhiêu | chữ | `thieu-so-0`, `quen-nho` |
| D7 | Tìm chữ số thích hợp | SGK (trang 2) | MT2 | M1: 1?2 × 4 = 608 (ô ? ở thừa số) · M2: 3? × 7 = ??6: chữ số hàng đơn vị của thừa số · M3: cả thừa số | `nhanDoc3` với ô ? ở thừa số | `nham-bang`, `dao-vai` |
| D8 | Chọn đáp án đúng | SGK (trang 3) | MT3 | M1: 192 × 4 (bốn số, có 786/867 đảo chữ số) · M2: 906 : 3 (bốn số, có 32 thiếu 0) · M3: số dư của 628 : 8 | thẻ số | `quen-nho`, `thieu-so-0`, `nham-thuong-du` |
| D9 | Tìm thành phần | SGK (trang 3) | MT3 | M1: ? × 6 = 186 · M2: ? : 7 = 105 (nhân) · M3: 72 : ? = 8 (chia) | chữ | `dao-vai`, `chon-sai-phep` |
| D10 | Đố em: xếp chữ số | SGK (trang 3) | MT3 | M1: chọn phép đúng trong bốn (21 × 3, 12 × 3, 31 × 2, 13 × 2) bằng 63 · M2: ba chữ số khác (1, 2, 4 → 12 × 4 = 48 hoặc 21 × 4 = 84: hỏi bằng 48) · M3: hỏi tích lớn nhất có thể | thẻ | `nham-bang` |
| D11 | Giải toán nhân, chia | SGK (trang 1, 2, 3) | MT4 | M1: hai xe 45 học sinh; Mai gấp 3 lần Mi · M2: 256 bánh, hộp 8; cả hai bạn · M3: thùng 28 l, can 5 l: cần ít nhất mấy can | chữ, `anh` | `thieu-buoc`, `quen-du`, `cong-thay-nhan` |
| D12 | Một phần mấy của ngôi sao | SGK (trang 3) | MT4 | M1: 15 ngôi sao (3 × 5): 1/3 là mấy · M2: 1/5 là mấy · M3: lưới khác (4 × 6: 1/4, 1/6) | **hình mới** `luoiSao` (`data-dem`) | `dao-vai`, `nham-bang` |

Dạng không có trong SGK: không. Phân bố: MT1 ba dạng (D1–D3) · MT2 bốn dạng (D4–D7) · MT3 ba dạng (D8–D10) · MT4 hai dạng (D11, D12).

### Luật lời câu hỏi
- Đ/S chỉ cho mệnh đề ("17 × 5 = 55" là mệnh đề).
- "Cần ít nhất mấy can" nói rõ "số lít còn lại cũng cần một can".
- Thuật ngữ: thừa số, tích, số bị chia, số chia, thương, số dư.

## 3. Hình
- `nhanDoc2(a, b, tuy)`: đặt tính nhân hai chữ số (rút gọn `nhanDoc3`, hai cột). `nhanDoc3` cho phép ô "?" ở **thừa số** (D7: `tuy.anThuaSo = 'chuc'`), kiểm bằng `data-pt`.
- `chiaDoc2` (bài 26), `chiaDoc3` (bài 37), `theTinh` (bài 38).
- **Hình mới** `luoiSao(r, c)`: lưới ngôi sao r × c, mỗi sao `data-dem="sao"`; r ≤ 4, c ≤ 6.

## 4. Nhãn lỗi
Chuẩn + riêng (chép tên và lời từ bài 26, 36, 37): `quen-nho`, `nho-sai-hang`, `quen-ha`, `thieu-so-0`, `du-lon-hon-chia`, `quen-du`, `nham-thuong-du`, `nham-hang`.

## 5. Rủi ro
1. 500 × 2 = 1 000: viết "1 000", nhãn so sánh trong `check()` dùng số.
2. D7 tìm chữ số: nhiều nghiệm? 1?2 × 4 = 60?: chỉ 152 (2 → 608; 1?2 × 4 = 60x đòi ? = 5). Bộ sinh kiểm đúng một chữ số thoả.
3. D10 đố em: liệt kê mọi cách xếp ba chữ số, bảo đảm đúng một thẻ có tích cần tìm.
4. D11 mức 3 (cần ít nhất): `check()` tính ⌈a : b⌉.
5. `index.html` CRLF; font Linux: thầy soát lại trên máy thầy.

## 6. Việc sẽ làm sau khi thầy duyệt
Viết `bai-41.js`, chép `bai-41.html`, sửa `index.html`; chạy đủ cổng; PR "[XONG] Bài 41".

## 7. Cần thầy quyết (kèm đề xuất)
1. Mục SGK và bảng dạng đúng chưa? Đề xuất: đúng như bảng.
2. **Mười hai dạng** (nhiều nhất từ trước): giữ (**đề xuất**, vì sách ba trang) hay gộp D1 + D4 (nhẩm) và D3 + D6 (Đ/S) thành 10 dạng?
3. **D10 mức 3** "tích lớn nhất có thể" (31 × 2 = 62 hay 21 × 3 = 63?) hơi khó: giữ hay thay bằng "bằng 63" với bộ số khác? Đề xuất: thay, cùng kiểu mức 2.
