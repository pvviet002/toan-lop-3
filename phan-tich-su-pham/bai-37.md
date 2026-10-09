# Phân tích sư phạm — Bài 37: Chia số có ba chữ số cho số có một chữ số (BÀI MỚI — BẢN NHÁP CHỜ DUYỆT)

Mẫu: `bai-26.js` và `bai-29.js` (`chiaDoc2`: khung ⌐ nhiều bước, `data-pt`, `check()` tính lại từ số), `bai-31.js` (`canDia`), `bai-29.js` (`soDoGT` bản đã sửa ở PR #20) + khối "LUYỆN THÔNG MINH" ở đầu `engine.js`.
Phạm vi: tạo mới `bai-37.js`, `bai-37.html`, thêm 37 vào `AVAILABLE` trong `index.html` (giữ CRLF, diff đúng 1 dòng) và file này. Không đụng `engine.js`, `figures.js`, `lua.js`. Chưa viết dòng mã nào.

Bài 37 là bài thứ hai của **Chủ đề 6**; sách dành 5 trang (99–103) nên dùng **4 mục tiêu** × 11 dạng.

## 0. Nguồn và điều cần lưu ý

Nội dung SGK (trang in 99–103) lấy từ **bản tóm tắt của phiên Claude trên máy thầy** (đã đối chiếu từng số); phiên đám mây chưa tự đối chiếu sách. Không chép nguyên văn đề vào repo.

- **Khám phá 1:** 312 vỏ chai, mỗi đồ chơi 2 vỏ: 312 : 2 = 156 (3 : 2 = 1 dư 1; hạ 1 được 11 : 2 = 5 dư 1; hạ 2 được 12 : 2 = 6); xếp 156 đồ chơi vào hộp mỗi hộp 5: 156 : 5 = 31 (dư 1).
- **Khám phá 2:** 714 vỏ chai, mỗi ghế 7 vỏ: 714 : 7 = 102 (**thương có chữ số 0 ở giữa**: 7 : 7 = 1; hạ 1, 1 : 7 = 0; hạ 4, 14 : 7 = 2); mỗi bàn 5 ghế: 102 : 5 = 20 (dư 2).
- **Hoạt động (trang 1):** a) 381 : 3 = 127; 554 : 4 = 138 (dư 2); 625 : 5 = 125; b) 237 : 5 = 47 (dư 2); 428 : 6 = 71 (dư 2); 371 : 7 = 53. HĐ2: 354 quả táo, mỗi hộp 6 quả: 59 hộp. HĐ3 (Số?, giảm đi n lần): 144 m giảm 3 lần = 48 m; 264 phút giảm 8 lần = 33 phút; 312 ml giảm 6 lần = 52 ml; 552 g giảm 4 lần = 138 g.
- **Hoạt động (trang 2):** a) 270 : 3 = 90; 560 : 4 = 140; 450 : 9 = 50; b) 251 : 5 = 50 (dư 1); 638 : 6 = 106 (dư 2); 764 : 7 = 109 (dư 1). HĐ2: 460 cái bánh, mỗi hộp 4 cái: 115 hộp. HĐ3 (Đ, S) ba phép chia làm sẵn: 216 : 7 = 30 (dư 6) ĐÚNG; 808 : 8 = 11 SAI (đúng là 101); 423 : 6 = 7 (dư 3) SAI (đúng là 70 dư 3).
- **Luyện tập:** 1) đặt tính (mẫu 462 : 3 = 154): 403 : 3 = 134 (dư 1); 518 : 5 = 103 (dư 3); 844 : 8 = 105 (dư 4); 810 : 9 = 90. 2) nhẩm (mẫu 600 : 2 = 300): 400 : 4; 600 : 3; 800 : 2. 3) rô-bốt 600 g cân bằng với bốn khối ru-bích giống nhau: mỗi khối 150 g. 4) chọn câu đúng: Mai 3 phi tiêu trúng vòng vàng được 375 điểm; Việt 1 phi tiêu vòng vàng: 125 điểm (A 115, B 125, C 135). Hình phi tiêu khó dựng: dùng chữ. 5) trang trại 15 lạc đà một bướu, còn lại hai bướu, tất cả 225 bướu: (225 − 15) : 2 = 105 con hai bướu.
- **Bẫy:** thương có chữ số 0 (102, 101, 90, 105, 70, 109, 106); chia có dư; quên hạ; số dư ≥ số chia.
- **Số:** số bị chia 100–999, số chia 2–9, thương 10–499; mọi kết quả nguyên; "(dư r)" sau thương như bài 25, 26.
- Khung ⌐ chép `chiaDoc2` từ bài 29 (bản đã sửa, PR #20) và mở rộng cho **ba chữ số bị chia** (ba bước hạ), tên `chiaDoc3`.

## 1. Bốn mục tiêu × ba mức

| MT | Tên | Mức 1 — Nhận biết | Mức 2 — Hiểu | Mức 3 — Vận dụng |
|---|---|---|---|---|
| MT1 | Chia hết | 312 : 2, 381 : 3 (ô "?" một chữ số của thương); nhẩm 600 : 2. | 625 : 5, 371 : 7: điền thương; 270 : 3, 560 : 4 (thương tròn chục). | Thương có chữ số 0 ở giữa: 714 : 7 = 102; 810 : 9 = 90. |
| MT2 | Chia có dư | 156 : 5 = 31 dư 1 (hỏi thương hoặc số dư). | 554 : 4, 237 : 5, 428 : 6; chia hết hay có dư. | 102 : 5 = 20 dư 2; 638 : 6 = 106 dư 2; 518 : 5 = 103 dư 3 (thương có 0 và có dư). |
| MT3 | Vận dụng | 354 quả táo vào hộp 6 quả; 144 m giảm 3 lần. | 460 bánh, hộp 4; rô-bốt 600 g và 4 khối; Việt được mấy điểm. | Lạc đà 225 bướu (hai bước); "cần ít nhất mấy hộp" khi có dư. |
| MT4 | Tìm lỗi | 808 : 8 = 11: Đúng hay Sai? | 423 : 6 = 7 dư 3: sai ở đâu (thiếu chữ số 0). | Kết quả đúng là bao nhiêu; bạn An quên hạ. |

Tham số engine: `goal:10, soCau:18, soCauToiDa:24`.

## 2. Mười một dạng (topics)

| # | Dạng | Nguồn | MT | Mức 1 / Mức 2 / Mức 3 | Hình | Nhãn lỗi chính |
|---|---|---|---|---|---|---|
| D1 | Vỏ chai làm đồ chơi | SGK (Khám phá 1a) | MT1 | M1: 312 vỏ, mỗi đồ chơi 2 vỏ · M2: số khác chia hết (200–600, chia 2–4) · M3: hỏi "làm được bao nhiêu, còn thừa mấy vỏ" (có dư) | `anh` + chữ | `quen-ha`, `nham-bang` |
| D2 | Đặt tính chia hết | SGK (Hoạt động 1a, Luyện tập 1) | MT1 | M1: ô "?" ở chữ số hàng trăm của thương · M2: ô "?" ở bước hạ hoặc tích · M3: điền cả thương (381 : 3, 625 : 5, 371 : 7) | **hình mới** `chiaDoc3` | `quen-ha`, `tru-sai-buoc` |
| D3 | Thương có chữ số 0 | SGK (Khám phá 2, HĐ trang 2, LT1) | MT1 | M1: 270 : 3, 560 : 4 (thương tròn chục) · M2: 714 : 7 = 102; 810 : 9 = 90 · M3: 844 : 8 = 105 dư 4; 638 : 6 = 106 dư 2 | `chiaDoc3` | `thieu-so-0`, `quen-ha` |
| D4 | Chia nhẩm số tròn trăm | SGK (Luyện tập 2) | MT1 | M1: 600 : 2, 400 : 4 · M2: 600 : 3, 800 : 2 · M3: chọn thẻ có kết quả 200 trong bốn thẻ | chữ, `theTinh` | `nham-hang`, `thieu-so-0` |
| D5 | Chia hết hay có dư | SGK (Khám phá 1b) | MT2 | M1: 156 : 5 chia hết hay có dư (Có / Không) · M2: thương, số dư (hỏi một) · M3: chọn phép chia có dư trong ba phép | chữ | `du-lon-hon-chia`, `nham-thuong-du` |
| D6 | Đặt tính chia có dư | SGK (HĐ 1b, HĐ trang 2b, LT1) | MT2 | M1: 237 : 5, 428 : 6: hỏi thương · M2: 554 : 4, 251 : 5: hỏi số dư · M3: 403 : 3, 518 : 5, 764 : 7: thương hoặc số dư | `chiaDoc3` | `du-lon-hon-chia`, `nham-thuong-du`, `quen-ha` |
| D7 | Xếp vào hộp | SGK (HĐ2 trang 1, HĐ2 trang 2) | MT3 | M1: 354 táo, hộp 6 (59) · M2: 460 bánh, hộp 4 (115) · M3: số có dư: cần ít nhất mấy hộp (⌈a : b⌉) | `anh`, chữ | `quen-du`, `thieu-buoc` |
| D8 | Giảm đi n lần | SGK (HĐ3 trang 1) | MT3 | M1: 144 m giảm 3 lần · M2: 264 phút giảm 8 lần; 312 ml giảm 6 lần · M3: 552 g giảm 4 lần rồi gấp 2 lần (hai mũi tên) | `soDoGT` (bản PR #20) | `nham-giam-bot`, `nham-chieu` |
| D9 | Rô-bốt và khối ru-bích | SGK (Luyện tập 3) | MT3 | M1: 600 g cân bằng 4 khối · M2: 2–6 khối, tổng 200–900 g · M3: hỏi 3 khối nặng bao nhiêu (hai bước) | `canDia` (chép từ bài 31) | `cong-thay-nhan`, `thieu-buoc` |
| D10 | Phi tiêu và lạc đà | SGK (Luyện tập 4, 5) | MT3 | M1: Mai 3 phi tiêu 375 điểm, Việt 1 phi tiêu: chọn A/B/C · M2: số khác (2–4 phi tiêu, 200–900) · M3: lạc đà: 15 con một bướu, 225 bướu: số con hai bướu (hai bước) | chữ, `anh` | `thieu-buoc`, `chon-sai-phep` |
| D11 | Phép chia đúng hay sai | SGK (HĐ3 trang 2) + mở rộng | MT4 | M1: 808 : 8 = 11 (Đúng / Sai) · M2: sai ở đâu: thiếu chữ số 0, quên hạ, dư ≥ chia · M3: kết quả đúng là bao nhiêu | `chiaDoc3` (bài An), `anh('boy')` | `thieu-so-0`, `quen-ha`, `du-lon-hon-chia` |

Dạng không có trong SGK: không (D11 mở rộng từ HĐ3 trang 2). Phân bố: MT1 bốn dạng (D1–D4) · MT2 hai dạng (D5, D6) · MT3 bốn dạng (D7–D10) · MT4 một dạng (D11).

### Luật lời câu hỏi
- Đ/S chỉ cho mệnh đề ("216 : 7 = 30 (dư 6)" là mệnh đề: dùng Đ/S); "… có … không?" dùng Có / Không.
- Thuật ngữ: **số bị chia, số chia, thương, số dư**; số dư luôn bé hơn số chia.
- "Cần ít nhất mấy hộp" nói rõ "quả còn lại cũng cần một hộp".
- Mọi đẳng thức trong phương án đúng số học; phương án nhiễu không chứa chính đối tượng đang hỏi.

## 3. Hình mới (viết ngay trong `bai-37.js`)

| Hàm | Mô tả | Kiểm do mã |
|---|---|---|
| `chiaDoc3(a, b, tuy)` | Khung ⌐ cho số bị chia ba chữ số: tối đa ba bước chia – nhân – trừ – hạ; thương có thể có chữ số 0 (bước "1 : 7 = 0" vẫn viết); ô "?" tại `tuy.an` (`thuong-tram`/`thuong-chuc`/`thuong-dv`/`ha`/`tich`/`du`); `tuy.bieuDien` = bài An. Mỗi chữ số `data-pt`. Chép và mở rộng từ `chiaDoc2` bài 29. | `check()` tính lại mọi bước từ a, b; thương so với ⌊a : b⌋, số dư với a mod b. |

Hình dùng lại: `anh`, `canDia` (bài 31), `soDoGT` (bài 29 bản PR #20: khung cao 92, hai dòng cách 24), `theTinh` (bài 35).
Luật Windows: nhãn trắng chứa số cỡ 18 cao ≥ 30; hai dòng chữ cách ≥ 1,4 lần cỡ chữ; nhãn ở rìa chừa lề ≥ 1,3 lần cỡ chữ; chữ số trong khung ⌐ ≥ 14px ở khổ 375 (khung ba bước cao hơn bài 26, nên hình co theo bề ngang nhưng không co chữ).

## 4. Nhãn lỗi

Chuẩn: `nham-bang`, `cong-thay-nhan`, `dao-vai`, `thieu-buoc`, `chon-sai-phep`. Riêng bài 37 (chép tên và lời từ bài 26, 29):

| Nhãn | Tên hiển thị | Ví dụ lỗi |
|---|---|---|
| `quen-ha` | Quên hạ chữ số | 312 : 2 → 15 |
| `thieu-so-0` | Thương thiếu chữ số 0 | 808 : 8 = 11; 423 : 6 = 7 dư 3 |
| `du-lon-hon-chia` | Số dư lớn hơn hoặc bằng số chia | 554 : 4 = 137 dư 6 |
| `quen-du` | Quên cộng 1 khi còn dư | cần ít nhất mấy hộp |
| `tru-sai-buoc` | Trừ sai ở bước đặt tính | 11 − 10 = 2 |
| `nham-thuong-du` | Nhầm thương với số dư | trả lời 31 khi hỏi số dư |
| `nham-hang` | Nhẩm sai hàng | 600 : 2 = 30 |
| `nham-giam-bot` | Nhầm "giảm n lần" với "bớt n đơn vị" | 144 giảm 3 lần → 141 |
| `nham-chieu` | Nhầm chiều phép tính | giảm thành gấp |

## 5. Rủi ro

1. **Khung ⌐ ba bước trên điện thoại:** cao khoảng 7 hàng chữ; chữ ≥ 14px; không đè.
2. **Thương có chữ số 0:** bộ sinh có chủ ý (a = b × thương với thương chứa 0); `check()` so với ⌊a : b⌋.
3. **Số dư ≥ số chia** chỉ ở phương án nhiễu, có nhãn; không bao giờ là đáp án đúng.
4. **Phi tiêu (D10):** không vẽ bia; điểm mỗi phi tiêu = 375 : 3; đáp nhiễu ±10.
5. **Lạc đà:** (225 − 15) : 2 nguyên; bộ sinh chọn số một bướu và hai bướu rồi tính ngược.
6. `index.html` CRLF; font Linux: thầy soát lại trên máy thầy.

## 6. Việc sẽ làm sau khi thầy duyệt

Viết `bai-37.js`, chép `bai-37.html`, sửa `index.html`; chạy đủ cổng; tự soi ảnh (khung ⌐ ba bước, cân đĩa, sơ đồ giảm); PR "[XONG] Bài 37".

## 7. Cần thầy quyết (kèm đề xuất)

1. Mục SGK ở mục 0 và bảng dạng đúng chưa? Đề xuất: đúng như bảng.
2. **Bước "1 : 7 = 0"** trong khung ⌐ (714 : 7): sách có viết "0" và "1 − 0 = 1" ra không? Đề xuất: viết chữ số 0 ở thương, **không** viết hàng "0 / 1" (gọn như sách thường in).
3. **D10 gộp phi tiêu và lạc đà** một dạng (ba mức): giữ (**đề xuất**) hay tách thành hai dạng?
4. **D8 mức 3** thêm mũi tên gấp (hai bước) như bài 35: đồng ý (**đề xuất**).
