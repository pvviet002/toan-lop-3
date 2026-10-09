# Phân tích sư phạm — Bài 47: Làm quen với chữ số La Mã (BÀI MỚI — BẢN NHÁP CHỜ DUYỆT)

Mẫu: khối "LUYỆN THÔNG MINH" ở đầu `engine.js`; hình `clockSVG`, `daySo`, `svgHinh` trong `figures.js`; cách dựng mục tiêu x dạng như `bai-44.js`.
Phạm vi: tạo mới `bai-47.js`, `bai-47.html`, thêm 47 vào `AVAILABLE` (giữ CRLF, diff 1 dòng) và file này. Không đụng `engine.js`, `figures.js`, `lua.js`. Chưa viết dòng mã nào.
Tham số engine: `goal:10, soCau:18, soCauToiDa:24`. Quy tắc mã: nối chuỗi, không template literal, không emoji, không số thập phân hay số âm; mọi số trong phạm vi 10 000; `check()` tính lại từ chuỗi SVG (data-*).

## 0. Nguồn và điều cần lưu ý
Nội dung SGK Tập 2 (Kết nối tri thức) lấy từ **tóm tắt của phiên Claude trên máy thầy**; phiên đám mây chưa đối chiếu sách, không chép hình hay đoạn văn của sách.
- Sách tr.12-16: ba ký hiệu I = 1, V = 5, X = 10; bảng I đến XX; đồng hồ mặt số La Mã; nối số thường với số La Mã; xếp que tính; điền số thiếu; sắp xếp; nối đồng hồ La Mã với đồng hồ điện tử. **Chỉ dùng đến XX.**
- Lỗi hay gặp: nhầm IV (4) với VI (6), IX (9) với XI (11); viết VIIII.
- Mặt đồng hồ La Mã tự vẽ bằng SVG (dựa `clockSVG`, đổi nhãn số).

## 1. Ba mục tiêu x ba mức

| MT | Tên | Mức 1 | Mức 2 | Mức 3 |
|---|---|---|---|---|
| MT1 | Đọc và viết số La Mã đến XX | Đọc I-XII, viết 1-12. | Đọc, viết 13-20. | Điền số thiếu, tìm số sai trong dãy. |
| MT2 | Đồng hồ số La Mã | Đọc giờ đúng. | Nối đồng hồ La Mã với giờ điện tử. | Giờ chiều (14 giờ chỉ vào II). |
| MT3 | Sắp xếp và que tính | Xếp 3 số La Mã nhỏ. | Xếp XIII, XVII, XII, XVIII bé đến lớn. | Đếm que tạo VIII, XIII. |

## 2. Mười dạng (topics)

| # | Dạng | Nguồn | MT | Mức 1 / Mức 2 / Mức 3 | Hình | Nhãn lỗi chính |
|---|---|---|---|---|---|---|
| D1 | Đọc số La Mã | SGK (khám phá) | MT1 | M1: I-XII · M2: XIII-XX · M3: IV/VI, IX/XI dễ nhầm | chữ | `nham-IV-VI` |
| D2 | Viết số La Mã | SGK (bài 2) | MT1 | M1: 1-10 · M2: 11-15 · M3: 16-20 | chữ | `viet-VIIII` |
| D3 | Nối số thường với số La Mã | SGK (bài 1) | MT1 | M1: 3 cặp · M2: 4 cặp (13, 15, 11, 17) · M3: tìm cặp sai | chữ | `nham-IV-VI` |
| D4 | Đọc giờ đồng hồ La Mã | SGK (khám phá) | MT2 | M1: giờ đúng · M2: giờ đúng và rưỡi · M3: giờ chiều | `clockSVG` nhãn La Mã | `nham-kim` |
| D5 | Nối đồng hồ La Mã với giờ điện tử | SGK (luyện tập) | MT2 | M1: sáng · M2: giờ khác · M3: 14 giờ (II) | đồng hồ SVG | `nham-kim` |
| D6 | Điền số La Mã còn thiếu | SGK (bài 3) | MT1 | M1: XII, XIII, ?, XV · M2: hai chỗ thiếu · M3: ba chỗ thiếu | chữ | `dem-sai-buoc` |
| D7 | Sắp xếp số La Mã | SGK (bài 4) | MT3 | M1: 3 số · M2: 4 số bé đến lớn · M3: lớn đến bé | thẻ | `sai-thu-tu` |
| D8 | Xếp que tính | SGK (bài 5) | MT3 | M1: VIII cần mấy que · M2: XIII · M3: IX cần 3 que | que (SVG, data-dem) | `dem-sai-que` |
| D9 | Đi theo thứ tự La Mã | SGK (trò chơi) | MT3 | M1: I-V · M2: ô tiếp theo · M3: ô thiếu trong lưới | lưới (SVG) | `dem-sai-buoc` |
| D10 | Bạn nào đúng | **không có trong SGK** | MT1 | M1: bạn viết 9 là VIIII · M2: sai ở đâu · M3: viết đúng | `anh('boy')` | `viet-VIIII` |

### Luật lời câu hỏi
- Câu «… có … không?» dùng Có / Không; mọi đẳng thức trong phương án đúng số học; đúng một đáp án.

## 3. Nhãn lỗi
`nham-IV-VI`, `viet-VIIII`, `nham-kim`, `dem-sai-que`, `dem-sai-buoc` (tên gợi ý, đặt trong mã).

## Rủi ro chung
Font Linux khác máy thầy (thầy soát lại trên Vercel). Số có bốn chữ số viết có dấu cách ngăn nhóm nghìn ("3 421"), phải dùng khoảng trắng không ngắt để không tách dòng ở 375 px.

## Việc sẽ làm sau khi thầy duyệt
Viết `bai-47.js`, chép `bai-47.html`, sửa `index.html`; chạy đủ cổng (có kiem_dem cho que tính); PR [XONG] Bài 47.

## Cần thầy quyết (kèm đề xuất)
1. Bảng dạng đúng chưa? Đề xuất: đúng như bảng.
2. Đồng hồ La Mã tự vẽ: đồng ý (**đề xuất**).
3. D10 ngoài SGK: giữ (**đề xuất**).
