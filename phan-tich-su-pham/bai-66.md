# Phân tích sư phạm — Bài 66: Xem đồng hồ. Tháng, năm (BÀI MỚI — BẢN NHÁP CHỜ DUYỆT)

Mẫu: khối "LUYỆN THÔNG MINH" ở đầu `engine.js`; cách dựng mục tiêu x dạng như `bai-44.js`; đồng hồ dựng từ `clockSVG` và `dongHoLaMa` (bài 47) với 60 vạch phút; lịch tháng là bảng mới.
Phạm vi: tạo mới `bai-66.js`, `bai-66.html`, thêm 66 vào `AVAILABLE` (giữ CRLF, diff 1 dòng) và file này. Không đụng `engine.js`, `figures.js`, `lua.js`. Chưa viết dòng mã nào.
Tham số engine: `goal:10, soCau:18, soCauToiDa:24`. Quy tắc mã: nối chuỗi, không template literal, không emoji, không số thập phân hay số âm; mọi số trong phạm vi 100 000 (kết quả cộng, trừ không quá 100 000); `check()` tính lại từ chuỗi SVG hoặc từ số liệu trong câu, không đoán.

## 0. Nguồn và điều cần lưu ý
Nội dung SGK Tập 2 (Kết nối tri thức, Chủ đề 13: Xem đồng hồ. Tháng, năm. Tiền Việt Nam) lấy từ **tóm tắt của phiên Claude trên máy thầy**, có đính chính nếu có; phiên đám mây chưa đối chiếu sách, không chép hình hay đoạn văn của sách. Số trong câu do mã chọn ngẫu nhiên; chỉ giữ dạng và độ khó theo sách.
- Sách tr.77-80: 1 giờ = 60 phút; mặt đồng hồ có 60 vạch phút, mỗi vạch 1 phút; đọc «3 giờ 5 phút», «5 giờ 43 phút»; sáng, chiều (đọc đồng hồ kim, đồng hồ số: giờ chiều bằng giờ cộng 12); đồng hồ số (16:22 hay 22:16; 02:10 hay 10:02 theo tranh); phép tính 10 phút + 25 phút = 35 phút; 24 giờ − 8 giờ = 16 giờ; 24 giờ × 2 = 48 giờ; 60 phút : 6 = 10 phút. Một năm có 12 tháng; tháng 31 ngày: 1, 3, 5, 7, 8, 10, 12; tháng 30 ngày: 4, 6, 9, 11; tháng 2 có 28 hoặc 29 ngày; lịch tháng 3 (Chủ nhật 3, 10, 17, 24, 31): Chủ nhật cuối cùng là ngày 31; ngày cuối tháng 3 là Chủ nhật, ngày đầu tháng 4 là thứ Hai; từ 29 tháng 3 đến hết 2 tháng 4 là 5 ngày.
- Lỗi hay gặp: nhầm kim giờ, kim phút; đọc phút theo số trên mặt đồng hồ (số 3 là 15 phút); nhầm số ngày của tháng; đếm sai khoảng ngày qua tháng.

## 1. Ba mục tiêu x ba mức

| MT | Tên | Mức 1 | Mức 2 | Mức 3 |
|---|---|---|---|---|
| MT1 | Đọc giờ, phút (đồng hồ kim, đồng hồ số) | Giờ đúng, giờ rưỡi, giờ có số phút chia hết cho 5. | Giờ có số phút bất kỳ (3 giờ 5 phút, 5 giờ 43 phút); sáng, chiều. | Đồng hồ kim nối đồng hồ số buổi chiều; chọn cách đọc theo tranh. |
| MT2 | Tính với đơn vị thời gian | 10 phút + 25 phút; 60 phút : 6. | 24 giờ − 8 giờ; 24 giờ × 2. | Phép tính nhiều bước với giờ, phút. |
| MT3 | Tháng, năm, lịch | Tháng có 30 hay 31 ngày. | Lịch tháng 3: Chủ nhật cuối; thứ của ngày đầu tháng sau. | Khoảng ngày qua tháng (29/3 đến 2/4); đổi lịch khác. |

## 2. Mười dạng (topics)

| # | Dạng | Nguồn | MT | Mức 1 / Mức 2 / Mức 3 | Hình | Nhãn lỗi chính |
|---|---|---|---|---|---|---|
| D1 | Đọc giờ trên đồng hồ kim | SGK (khám phá, bài 1) | MT1 | M1: giờ đúng, rưỡi · M2: phút chia hết cho 5 · M3: phút bất kỳ (5 giờ 43 phút) | đồng hồ 60 vạch (SVG, data-gio, data-phut) | `nham-kim`, `doc-phut-theo-so` |
| D2 | Buổi sáng, buổi chiều | SGK (bài 1) | MT1 | M1: giờ sáng · M2: giờ chiều, đọc theo 24 giờ · M3: hai bạn, hai buổi | đồng hồ + chữ | `nham-kim` |
| D3 | Đồng hồ kim nối đồng hồ số | SGK (bài 2) | MT1 | M1: sáng · M2: chiều (giờ + 12) · M3: bốn đồng hồ số, chọn cùng thời gian | đồng hồ kim + số (SVG) | `nham-kim`, `gio-chieu` |
| D4 | Đồng hồ số: đọc hai cách | SGK (bài 3) | MT1 | M1: 16:22 hay 22:16 theo tranh · M2: 02:10 hay 10:02 · M3: tranh ban đêm | đồng hồ số, tranh | `doc-sai-so` |
| D5 | Tính với đơn vị thời gian | SGK (bài 4) | MT2 | M1: 10 phút + 25 phút · M2: 24 giờ − 8 giờ, 24 giờ × 2 · M3: 60 phút : 6; nhiều bước | chữ | `doi-don-vi` |
| D6 | Tháng có bao nhiêu ngày | SGK (bài 5) | MT3 | M1: tháng 30 hay 31 ngày · M2: tháng 2 · M3: cả năm, đếm tháng 31 ngày | bàn tay nắm (SVG) | `nham-so-ngay` |
| D7 | Lịch tháng: Chủ nhật cuối | SGK (bài 6) | MT3 | M1: ngày Chủ nhật đầu · M2: Chủ nhật cuối · M3: lịch tháng khác | lịch (SVG, data-lich) | `nham-thu` |
| D8 | Ngày cuối tháng, ngày đầu tháng sau | SGK (bài 6) | MT3 | M1: ngày cuối là thứ mấy · M2: ngày đầu tháng sau · M3: tháng 30 ngày | lịch (SVG) | `nham-thu` |
| D9 | Khoảng ngày qua tháng | SGK (bài 7) | MT3 | M1: trong một tháng · M2: qua tháng (29/3 đến 2/4) · M3: qua tháng 2 | lịch (SVG) | `dem-sot-ngay` |
| D10 | Bạn An đọc giờ | **không có trong SGK** | MT1 | M1: An đọc, em đồng ý không · M2: An sai ở đâu · M3: giờ đúng | `anh('boy')`, đồng hồ | `doc-phut-theo-so` |

### Luật lời câu hỏi
- Câu «… có … không?» dùng Có / Không; mọi đẳng thức trong phương án đúng số học; đúng một đáp án.

## 3. Nhãn lỗi
`nham-kim`, `doc-phut-theo-so`, `gio-chieu`, `doc-sai-so`, `doi-don-vi`, `nham-so-ngay`, `nham-thu`, `dem-sot-ngay` (tên gợi ý, đặt trong mã).

## Rủi ro chung
Font Linux khác máy thầy (thầy soát lại trên Vercel). mặt đồng hồ có 60 vạch phút phải đọc rõ ở 375 px (kim giờ, kim phút khác màu, nhãn số lớn); lịch tháng tự dựng bằng bảng: `check()` tính lại thứ trong tuần từ ngày 1, không tin số liệu cho sẵn. Số có năm chữ số viết có khoảng trắng không ngắt ở hàng nghìn ("12 324"); ô nhập là số nguyên không dấu cách.

## Việc sẽ làm sau khi thầy duyệt
Viết `bai-66.js`, chép `bai-66.html`, sửa `index.html`; chạy đủ cổng (kiểm đếm lịch); PR [XONG] Bài 66.

## Cần thầy quyết (kèm đề xuất)
1. Bảng dạng đúng chưa? Đề xuất: đúng như bảng.
2. Lịch do mã dựng với ngày 1 là thứ bất kỳ (không chép lịch sách); `check()` tính lại thứ trong tuần: đồng ý (**đề xuất**).
3. D10 ngoài SGK: giữ (**đề xuất**).
