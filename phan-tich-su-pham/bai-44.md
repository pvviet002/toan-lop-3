# Phân tích sư phạm — Bài 44: Ôn tập chung (BÀI MỚI — BẢN NHÁP CHỜ DUYỆT)

Mẫu: `bai-36.js` (`nhanDoc3`), `bai-37.js` (`chiaDoc3`), `bai-26.js` (`chiaDoc2`), `bai-38.js` (biểu thức), `bai-43.js` khi có (lưới, trung điểm, góc vuông), `bai-36.js` (`canDia`), `bai-38.js` (`gapKhuc`) + khối "LUYỆN THÔNG MINH" ở đầu `engine.js`.
Phạm vi: tạo mới `bai-44.js`, `bai-44.html`, thêm 44 vào `AVAILABLE` (giữ CRLF, diff 1 dòng) và file này. Không đụng `engine.js`, `figures.js`, `lua.js`. Chưa viết dòng mã nào.

Bài 44 là bài cuối **Tập 1** (Chủ đề 7); sách dành 2 trang (120–121). Dùng **4 mục tiêu** × 10 dạng.

## 0. Nguồn và điều cần lưu ý

Nội dung SGK (trang in 120–121) lấy từ **bản tóm tắt của phiên Claude trên máy thầy**; phiên đám mây chưa tự đối chiếu sách. Không chép hình lưới của sách; mọi hình do mã dựng.

- **Trang 1.** Bài 1: 213 × 3 = 639; 217 × 4 = 868; 161 × 5 = 805. Bài 2: 69 : 3 = 23; 68 : 4 = 17; 80 : 5 = 16. Bài 3 (ngôi nhà trên lưới: mái tam giác đỉnh A, thân là hình chữ nhật BCDE; Q, M trên BC; N, P trên ED): a) trung điểm của BC, ED, BM, ND; b) mấy góc vuông (B, C, D, E của hình chữ nhật). Bài 4: 175 + 42 − 75 = 142; 12 × (12 − 9) = 36. Bài 5: 1 thùng 100 l và 5 can mỗi can 10 l: 150 l.
- **Trang 2.** Bài 1: 72 × 3 = 216; 116 × 6 = 696; 106 × 8 = 848. Bài 2: 963 : 3 = 321; 265 : 5 = 53; 720 : 4 = 180. Bài 3a: gấp khúc ABCD 30 mm, 42 mm, 28 mm: 100 mm; 3b: túi muối cân bằng hai quả cân 200 g và một quả 100 g: 500 g. Bài 4: 96 : 3 × 5 = 160; 60 : (2 × 3) = 10. Bài 5: tuần đầu 20 thùng, tuần sau gấp 3 lần: tuần sau 60, cả hai tuần 80.
- **Lỗi hay gặp:** quên nhớ; thương thiếu chữ số 0 (720 : 4 = 18); nhầm trung điểm; bỏ ngoặc; bài hai bước thiếu bước cộng.
- **Số:** mọi kết quả ≤ 999; không "1 000".

## 1. Bốn mục tiêu × ba mức

| MT | Tên | Mức 1 | Mức 2 | Mức 3 |
|---|---|---|---|---|
| MT1 | Nhân, chia | 213 × 3; 69 : 3 (hai chữ số). | 217 × 4, 72 × 3 (có nhớ); 265 : 5; 963 : 3. | 106 × 8, 161 × 5 (nhớ, có 0); 720 : 4 = 180 (thương có 0). |
| MT2 | Hình học | Trung điểm của BC (M); góc vuông của hình chữ nhật. | Trung điểm của BM, ND (đoạn con); đếm góc vuông cả hình (4). | Chọn cặp (đoạn, trung điểm) đúng; hình có thêm mái: góc không vuông. |
| MT3 | Biểu thức | 175 + 42 − 75. | 12 × (12 − 9); 96 : 3 × 5. | 60 : (2 × 3); chọn biểu thức bằng 160. |
| MT4 | Đo lường và giải toán | Gấp khúc 30 + 42 + 28; túi muối 500 g. | Thùng 100 l và 5 can 10 l (hai bước); tuần sau 60 thùng. | Cả hai tuần 80 thùng; cân với quả cân "?" và hai bước. |

Tham số engine: `goal:10, soCau:18, soCauToiDa:24`.

## 2. Mười dạng (topics)

| # | Dạng | Nguồn | MT | Mức 1 / Mức 2 / Mức 3 | Hình | Nhãn lỗi chính |
|---|---|---|---|---|---|---|
| D1 | Đặt tính nhân | SGK (Bài 1 trang 1, 2) | MT1 | M1: 213 × 3 (không nhớ) · M2: 217 × 4, 72 × 3 (nhớ một lần) · M3: 106 × 8, 161 × 5, 116 × 6 | `nhanDoc3`, `nhanDoc2` (bài 41) | `quen-nho`, `nho-sai-hang` |
| D2 | Đặt tính chia | SGK (Bài 2 trang 1, 2) | MT1 | M1: 69 : 3, 68 : 4 (hai chữ số) · M2: 963 : 3, 265 : 5 · M3: 720 : 4 = 180 (thương có 0); 80 : 5 = 16 | `chiaDoc2`, `chiaDoc3` | `quen-ha`, `thieu-so-0` |
| D3 | Chọn kết quả | **không có trong SGK** | MT1 | M1: 213 × 3 trong bốn số · M2: 963 : 3 · M3: thương có 0 (720 : 4: 18 / 180 / 108 / 1 080? không: 180 / 18 / 108 / 190) | thẻ số | `thieu-so-0`, `quen-nho` |
| D4 | Trung điểm ngôi nhà | SGK (Bài 3a trang 1) | MT2 | M1: M có là trung điểm của BC không · M2: trung điểm của BM, ND (điểm Q, P) · M3: chọn cặp đúng trong bốn | `luoiNha` (mới: dựng từ `luoiDiem` bài 43) | `nham-trung-diem` |
| D5 | Góc vuông ngôi nhà | SGK (Bài 3b trang 1) | MT2 | M1: góc đỉnh B có vuông không · M2: hình chữ nhật có mấy góc vuông (4) · M3: cả ngôi nhà có mấy góc vuông (4, mái không vuông) | `luoiNha` | `nham-vuong`, `dem-sot-goc` |
| D6 | Biểu thức không ngoặc | SGK (Bài 4a trang 1, 2) | MT3 | M1: 175 + 42 − 75 · M2: 96 : 3 × 5 · M3: ba phép với nhân chia trước | chữ | `tinh-trai-sang-phai`, `nham-bang` |
| D7 | Biểu thức có ngoặc | SGK (Bài 4b trang 1, 2) | MT3 | M1: 12 × (12 − 9) · M2: 60 : (2 × 3) · M3: bốn thẻ, thẻ nào bằng số đã cho | chữ, `theTinh` | `bo-ngoac` |
| D8 | Gấp khúc và túi muối | SGK (Bài 3 trang 2) | MT4 | M1: ABCD 30, 42, 28 mm · M2: túi muối 200 + 200 + 100 · M3: cân có quả cân cả hai bên (bưởi kiểu bài 43) | `gapKhuc`, `canDia` | `thieu-buoc`, `chon-sai-phep` |
| D9 | Nước mắm và thùng sách | SGK (Bài 5 trang 1, 2) | MT4 | M1: 5 can 10 l: bao nhiêu lít · M2: thùng 100 l và 5 can (hai bước); tuần sau gấp 3 lần 20 · M3: cả hai tuần (hai bước) | chữ | `thieu-buoc`, `cong-thay-nhan` |
| D10 | Bạn An làm | **không có trong SGK** | MT1 | M1: An tính 720 : 4 = 18: em thấy thế nào · M2: An sai ở đâu (thiếu 0, quên nhớ) · M3: kết quả đúng | `anh('boy')` | `thieu-so-0`, `quen-nho` |

Dạng không có trong SGK: D3, D10. Phân bố: MT1 bốn dạng (D1–D3, D10) · MT2 hai dạng (D4, D5) · MT3 hai dạng (D6, D7) · MT4 hai dạng (D8, D9).

### Luật lời câu hỏi
- "… có là trung điểm … không?" dùng Có / Không.
- Mọi đẳng thức trong phương án đúng số học; đúng một đáp án.

## 3. Hình
- `luoiNha(cfg)` **mới**: lưới ô vuông, tam giác mái đỉnh A trên hình chữ nhật BCDE; điểm Q, M trên BC; N, P trên ED với toạ độ nguyên do mã chọn (M là trung điểm BC, Q trung điểm BM, N trung điểm ED, P trung điểm ND); mỗi điểm `data-x`, `data-y`; `check()` kiểm trung điểm bằng toạ độ.
- `nhanDoc3`/`nhanDoc2`, `chiaDoc3`/`chiaDoc2`, `theTinh`, `tinhBT2`, `gapKhuc`, `canDia` chép từ bài 36–38, 41.

## 4. Nhãn lỗi
Chuẩn + riêng chép từ bài 36–38, 43: `quen-nho`, `nho-sai-hang`, `quen-ha`, `thieu-so-0`, `nham-trung-diem`, `nham-vuong`, `dem-sot-goc`, `tinh-trai-sang-phai`, `bo-ngoac`.

## 5. Rủi ro
1. Ngôi nhà trên lưới: 9 điểm có tên (A–E, M, N, P, Q); tên điểm cách nhau đủ xa trên 375 px; đặt tên lệch về phía ngoài hình.
2. Trung điểm của BM, ND: toạ độ chẵn để Q, P nguyên: BC dài 4 hoặc 8 ô.
3. Thương có 0 (720 : 4): bộ sinh theo `phepChia3({so0:true})`.
4. `index.html` CRLF; font Linux: thầy soát lại trên máy thầy.

## 6. Việc sẽ làm sau khi thầy duyệt
Viết `bai-44.js`, chép `bai-44.html`, sửa `index.html`; chạy đủ cổng; PR "[XONG] Bài 44".

## 7. Cần thầy quyết (kèm đề xuất)
1. Mục SGK và bảng dạng đúng chưa? Đề xuất: đúng như bảng.
2. **D3, D10** ngoài SGK cho MT1 (ôn tập cần nhiều dạng tính): giữ (**đề xuất**).
3. **Ngôi nhà** dựng bằng mã với toạ độ do mã chọn (không giống hệt sách): đồng ý (**đề xuất**).
