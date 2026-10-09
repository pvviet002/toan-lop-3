# Phân tích sư phạm — Bài 43: Ôn tập hình học và đo lường (BÀI MỚI — BẢN NHÁP CHỜ DUYỆT)

Mẫu: `bai-22.js` (Luyện tập chung hình học: `luoiVuong`, `laTrungDiem`, `tronBanKinh`, `soCapVuong`, `khoiGhep`), `bai-18.js` (`luoiGoc3`, `demVuong`), `bai-17.js` (`hinhTron`, `loaiDoan`), `bai-21.js` (`khoiHop`, `demDinh`), `bai-16.js` (`gapKhuc`, `thuocCm`), `bai-35.js` (`canDia`, số đo), `bai-33.js` (nhiệt độ) + khối "LUYỆN THÔNG MINH" ở đầu `engine.js`.
Phạm vi: tạo mới `bai-43.js`, `bai-43.html`, thêm 43 vào `AVAILABLE` (giữ CRLF, diff 1 dòng) và file này. Không đụng `engine.js`, `figures.js`, `lua.js`. Chưa viết dòng mã nào.

Bài 43 là bài thứ ba của **Chủ đề 7**; sách dành 2 trang luyện tập (118–119). Dùng **4 mục tiêu** × 11 dạng.

## 0. Nguồn và điều cần lưu ý

Nội dung SGK (trang in 118–119) lấy từ **bản tóm tắt của phiên Claude trên máy thầy**; phiên đám mây chưa tự đối chiếu sách. **Không chép hình lưới và ảnh chụp trong sách**: tự dựng hình SVG theo dạng bài, số do mã tính, `check()` tính lại, đúng một đáp án.

- **Trang 1.** Bài 1: ngũ giác ABCDE trên lưới ô vuông, đường thẳng AC nằm ngang và BI thẳng đứng cắt nhau tại K (I trên ED): a) mấy góc vuông (các góc ở K và I); b) mấy góc không vuông đỉnh A (tạo bởi AB, AC, AE); c) trung điểm của AC và ED (K và I). Bài 2: vẽ hình theo mẫu trên lưới (tam giác, hình chữ nhật, hình vuông) — trên web đổi thành **chọn hình đúng** / **nhận dạng**. Bài 3a: tên đường kính, bán kính của hình tròn tâm O với các điểm A, B, C, D, M, N trên đường tròn; 3b: hình xếp bởi mấy khối lập phương, mấy khối trụ. Bài 4: xếp khối lập phương nhỏ thành khối hộp 3 × 2 × 2 rồi sơn mọi mặt: mấy khối được sơn 3 mặt (8 khối ở đỉnh; mọi kích thước ≥ 2 đều 8).
- **Trang 2.** Bài 1a: đường gấp khúc ABCD có AB = BC = CD = 28 mm: 84 mm; 1b: cân đĩa: hai quả cân 500 g bên trái, quả bưởi và quả cân 100 g bên phải: bưởi 900 g. Bài 2 (chọn số đo thích hợp): sách Toán dày khoảng 5 mm (tóm tắt suy ra, **thầy soát lại**); bút mực nặng khoảng 20 g; lọ thuốc nhỏ mắt khoảng 15 ml; nhiệt độ cơ thể bình thường khoảng 37 °C. Bài 3: 480 mm + 120 mm = 600 mm; 545 mm − 45 mm = 500 mm; 840 mm : 3 = 280 mm; 465 g + 340 g = 805 g; 200 g × 5 = 1 000 g; 900 g : 6 = 150 g; 500 ml + 156 ml = 656 ml; 1 000 ml − 500 ml = 500 ml; 250 ml × 3 = 750 ml. Bài 4: gói mì 80 g, hộp sữa 455 g: 3 gói mì và 1 hộp sữa nặng 695 g.
- **Lỗi hay gặp:** đếm thiếu góc vuông (chỉ đếm một góc tại giao điểm); nhầm bán kính với đường kính; đếm khối bị che; quên đổi "1 000"; ước lượng đơn vị sai (5 cm thay 5 mm); cân đĩa cộng cả hai bên.
- **Số:** "1 000 g", "1 000 ml" viết có dấu cách; mọi phép đo ≤ 1 000.

## 1. Bốn mục tiêu × ba mức

| MT | Tên | Mức 1 | Mức 2 | Mức 3 |
|---|---|---|---|---|
| MT1 | Góc, trung điểm, hình trên lưới | Mấy góc vuông ở giao điểm hai đường vuông góc; trung điểm của đoạn trên lưới. | Góc không vuông đỉnh A; trung điểm của hai đoạn. | Đếm góc vuông của ngũ giác có hai đường cắt; chọn hình đúng tên trên lưới. |
| MT2 | Hình tròn và khối | Tên bán kính (OA, OB). | Tên đường kính (AB qua O) trong nhiều đoạn; đếm khối lập phương, khối trụ. | Khối hộp 3 × 2 × 2 sơn ba mặt: mấy khối (8); hộp 4 × 2 × 2. |
| MT3 | Đo lường | Gấp khúc 28 × 3; chọn 5 mm/5 cm/5 dm. | Cân đĩa bưởi 900 g; bút 20 g, thuốc 15 ml, 37 °C. | Tính với số đo: 840 mm : 3; 200 g × 5 = 1 000 g; mì và sữa (hai bước). |
| MT4 | Tìm lỗi | Bạn An nói "quả bưởi 1 100 g": em thấy thế nào. | An đếm 4 góc vuông (thiếu); An gọi OA là đường kính. | An nói 12 khối sơn 3 mặt; An ước lượng sai. |

Tham số engine: `goal:10, soCau:18, soCauToiDa:24`.

## 2. Mười một dạng (topics)

| # | Dạng | Nguồn | MT | Mức 1 / Mức 2 / Mức 3 | Hình | Nhãn lỗi chính |
|---|---|---|---|---|---|---|
| D1 | Góc vuông trên lưới | SGK (Bài 1a trang 1) | MT1 | M1: hai đường vuông góc cắt tại K: mấy góc vuông đỉnh K (4) · M2: đường cắt tại điểm trên cạnh (I): mấy góc vuông đỉnh I (2) · M3: cả hình: mấy góc vuông (K và I) | `luoiGoc` (chép `luoiGoc3` bài 18, mở rộng) | `dem-sot-goc`, `nham-vuong` |
| D2 | Góc không vuông đỉnh A | SGK (Bài 1b trang 1) | MT1 | M1: góc đỉnh A có vuông không (Có / Không) · M2: mấy góc không vuông đỉnh A (AB, AC, AE: 3) · M3: đỉnh khác, số cạnh khác | `luoiGoc` | `nham-vuong`, `dem-sot-goc` |
| D3 | Trung điểm trên lưới | SGK (Bài 1c trang 1) | MT1 | M1: K có là trung điểm của AC không · M2: điểm nào là trung điểm của ED (chọn trong I, K, D) · M3: hai đoạn, chọn cặp đúng | `luoiDiem` (chép bài 16/22) | `nham-trung-diem` |
| D4 | Hình trên lưới | SGK (Bài 2 trang 1) | MT1 | M1: hình vẽ trên lưới là hình gì (tam giác / chữ nhật / vuông) · M2: hình nào là hình vuông trong ba hình · M3: hình chữ nhật có chiều dài mấy ô, rộng mấy ô | `luoiHinh` (chép bài 19) | `nham-hinh` |
| D5 | Bán kính, đường kính | SGK (Bài 3a trang 1) | MT2 | M1: đoạn OA là bán kính hay đường kính · M2: đoạn nào là đường kính trong bốn đoạn · M3: đếm bán kính (hoặc đường kính) trong hình | `hinhTron` (chép bài 17: `tronBanKinh` bài 22) | `nham-bk-dk`, `dem-sot` |
| D6 | Đếm khối | SGK (Bài 3b trang 1) | MT2 | M1: mấy khối trụ (1–3) · M2: mấy khối lập phương trên sàn (4–9, có che một phần? không: xếp một lớp nhìn thấy hết) · M3: cả hai loại: tổng | `khoiGhep` (chép bài 20/22) + khối trụ mới `khoiTru` | `dem-sot`, `nham-khoi` |
| D7 | Sơn ba mặt | SGK (Bài 4 trang 1) | MT2 | M1: khối hộp 2 × 2 × 2: mấy khối ở đỉnh (8) · M2: 3 × 2 × 2 (8) · M3: 4 × 2 × 2 hay 3 × 3 × 2: mấy khối sơn 3 mặt (luôn 8), bạn An nói 12 | `khoiHop` (chép bài 21) | `nham-dinh`, `dem-sot` |
| D8 | Gấp khúc và cân đĩa | SGK (Bài 1 trang 2) | MT3 | M1: ABCD ba đoạn 28 mm · M2: cân: 500 g + 500 g = bưởi + 100 g · M3: cân với ba quả cân; gấp khúc bốn đoạn | `gapKhuc` (bài 38), `canDia` (bài 36) | `cong-thay-nhan`, `thieu-buoc`, `chon-sai-phep` |
| D9 | Chọn số đo thích hợp | SGK (Bài 2 trang 2) | MT3 | M1: sách dày 5 mm / 5 cm / 5 dm · M2: bút 20 g, thuốc 15 ml · M3: nhiệt độ 37 °C; vật khác (cặp sách 2 kg, cốc 250 ml) | chữ, `anh` | `uoc-luong-sai` |
| D10 | Tính với số đo | SGK (Bài 3, Bài 4 trang 2) | MT3 | M1: cộng, trừ (480 mm + 120 mm) · M2: nhân, chia (840 mm : 3; 200 g × 5 = 1 000 g) · M3: mì và sữa 3 × 80 + 455 (hai bước) | chữ | `nham-bang`, `thieu-buoc`, `quen-doi` |
| D11 | Bạn An nói | **không có trong SGK** | MT4 | M1: An nói bưởi 1 100 g: em thấy thế nào · M2: An gọi OA là đường kính / đếm thiếu góc · M3: An nói 12 khối sơn 3 mặt; An nói sách dày 5 cm | `anh('boy')` | `chon-sai-phep`, `nham-bk-dk`, `nham-dinh` |

Dạng không có trong SGK: D11. Phân bố: MT1 bốn dạng (D1–D4) · MT2 ba dạng (D5–D7) · MT3 ba dạng (D8–D10) · MT4 một dạng (D11, ba mức).

### Luật lời câu hỏi
- "… có … không?" dùng Có / Không; Đ/S chỉ cho mệnh đề.
- Tên góc: "góc đỉnh K, cạnh KA, KB". Tên đoạn: "OA", "AB".
- Mọi hình do mã dựng: toạ độ lưới nguyên, trung điểm có toạ độ nguyên, góc vuông kiểm bằng tích vô hướng = 0.

## 3. Hình (viết ngay trong `bai-43.js`, chép từ bài cũ; không sửa `figures.js`)
| Hàm | Nguồn | Ghi chú |
|---|---|---|
| `luoiGoc(diem, doan)` | `luoiGoc3` bài 18 | Lưới ô vuông, các điểm có tên, các đoạn; `check()` đếm góc vuông từ toạ độ. |
| `luoiDiem` | bài 16/22 | Trung điểm toạ độ nguyên; `data-x`, `data-y`. |
| `luoiHinh` | bài 19 | Tam giác, chữ nhật, vuông trên lưới. |
| `hinhTron` | bài 17/22 (`tronBanKinh`) | Tâm O, điểm trên đường tròn, đoạn nối; `data-loai` (bk/dk/khac). |
| `khoiGhep`, `khoiHop` | bài 20–22, 21 | Khối lập phương, khối hộp; **mới** `khoiTru` (khối trụ phẳng, không viền đen). |
| `gapKhuc`, `canDia` | bài 38, 36 | Nhãn trắng cỡ 18 cao 30. |

## 4. Nhãn lỗi
Chuẩn + riêng (chép từ bài 16–22, 35): `nham-vuong`, `dem-sot-goc`, `nham-trung-diem`, `nham-hinh`, `nham-bk-dk`, `dem-sot`, `nham-khoi`, `nham-dinh`, `uoc-luong-sai`, `quen-doi`, `chon-sai-phep`, `thieu-buoc`.

## 5. Rủi ro
1. **Hình lưới nhiều điểm trên điện thoại:** tên điểm ≥ 14px, không đè nhau; đã có luật bài 16 (điểm cách ≥ 1,5 cm ngang).
2. **Đếm góc vuông** phụ thuộc cách sách đếm (K và I); `check()` đếm từ toạ độ theo đúng quy ước ghi trong lời câu hỏi ("các góc có đỉnh K hoặc I").
3. **Khối trụ** chưa có hình chuẩn: vẽ mới theo bảng HM.
4. **Sơn ba mặt** luôn 8: mức 3 hỏi số khối ở đỉnh với kích thước khác, đáp nhiễu là số khối, số mặt.
5. Số đo "sách dày 5 mm" là suy luận của phiên máy thầy, thầy soát.
6. `index.html` CRLF; font Linux: thầy soát lại trên máy thầy (hình học hay lộ lỗi đè chữ trên Windows).

## 6. Việc sẽ làm sau khi thầy duyệt
Viết `bai-43.js`, chép `bai-43.html`, sửa `index.html`; chạy đủ cổng (hình học: soát kỹ 375 px); PR "[XONG] Bài 43".

## 7. Cần thầy quyết (kèm đề xuất)
1. Mục SGK và bảng dạng đúng chưa? Đề xuất: đúng như bảng.
2. **Bài 2 "vẽ theo mẫu"** đổi thành nhận dạng hình trên lưới (D4): đồng ý (**đề xuất**) vì web không chấm vẽ.
3. **Đếm góc vuông (D1 mức 3)**: tính cả 4 góc ở K và 2 góc ở I (6) như sách? Thầy xác nhận số sách ghi.
4. **Khối trụ** vẽ mới: đồng ý (**đề xuất**).
