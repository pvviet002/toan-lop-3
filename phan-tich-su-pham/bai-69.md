# Phân tích sư phạm — Bài 69: Luyện tập chung (Chủ đề 13) (BÀI MỚI — BẢN NHÁP CHỜ DUYỆT)

Mẫu: khối "LUYỆN THÔNG MINH" ở đầu `engine.js`; cách dựng mục tiêu x dạng như `bai-44.js`; chép đồng hồ, lịch (bài 66, 67), tờ tiền (bài 68).
Phạm vi: tạo mới `bai-69.js`, `bai-69.html`, thêm 69 vào `AVAILABLE` (giữ CRLF, diff 1 dòng) và file này. Không đụng `engine.js`, `figures.js`, `lua.js`. Chưa viết dòng mã nào.
Tham số engine: `goal:10, soCau:18, soCauToiDa:24`. Quy tắc mã: nối chuỗi, không template literal, không emoji, không số thập phân hay số âm; mọi số trong phạm vi 100 000 (kết quả cộng, trừ không quá 100 000); `check()` tính lại từ chuỗi SVG hoặc từ số liệu trong câu, không đoán.

## 0. Nguồn và điều cần lưu ý
Nội dung SGK Tập 2 (Kết nối tri thức, Chủ đề 13: Xem đồng hồ. Tháng, năm. Tiền Việt Nam) lấy từ **tóm tắt của phiên Claude trên máy thầy**; phiên đám mây chưa đối chiếu sách, không chép hình hay đoạn văn của sách. Số trong câu do mã chọn ngẫu nhiên; chỉ giữ dạng và độ khó theo sách.
- Sách tr.88-92: «giờ kém» (8 giờ 50 phút hay 9 giờ kém 10 phút); lịch tháng 4 (1 là thứ Hai; Chủ nhật 7, 14, 21, 28): Ngày Sách Việt Nam 21 tháng 4 là Chủ nhật; cây đậu thần mỗi ngày thêm 1 bông, thứ Bảy đầu tiên (6/4) có 4 bông: bắt đầu ra hoa từ ngày 3 tháng 4; mua kẹo và gói bim bim (cần thêm tờ 5 000 đồng); 2 giờ = 120 phút; 2 năm = 24 tháng; Rô-bốt đi xe buýt: tính số phút từ hai đồng hồ; Mai làm hai việc trong ngày thứ Bảy; lịch tháng 12 (1 là Chủ nhật): bóng rổ mỗi Chủ nhật là ngày 1, 8, 15, 22, 29; học vẽ chiều thứ Bảy từ ngày 14: 3 buổi; Nam mua 3 cái bút chì bằng 9 000 đồng (3 000 đồng một cái); dãy đồng hồ kim tăng dần; 3 tuần = 21 ngày; 3 giờ = 180 phút; 3 năm = 36 tháng; 3 ngày = 72 giờ; 11 giờ 20 phút, 10 phút nữa là đến giờ ăn trưa: 11 giờ 30 phút; 1 giờ 30 phút = 90 phút; 1 tuần 3 ngày = 10 ngày; 1 năm 6 tháng = 18 tháng; 1 ngày 6 giờ = 30 giờ.
- Lỗi hay gặp: nhầm «giờ kém»; đổi đơn vị thời gian sai (1 giờ = 60 phút, 1 ngày = 24 giờ); đếm sót ngày; chia tiền sai.

## 1. Ba mục tiêu x ba mức

| MT | Tên | Mức 1 | Mức 2 | Mức 3 |
|---|---|---|---|---|
| MT1 | Đọc giờ, «giờ kém», dãy đồng hồ | 8 giờ 50 phút hay 9 giờ kém 10 phút. | Dãy đồng hồ kim tăng dần (chọn đồng hồ tiếp theo). | Giờ kém ở giờ chiều. |
| MT2 | Đổi đơn vị thời gian; thời điểm, khoảng thời gian | 2 giờ = ? phút; 3 tuần = ? ngày. | 1 giờ 30 phút = ? phút; 1 năm 6 tháng = ? tháng; 11 giờ 20 phút + 10 phút. | 1 ngày 6 giờ = ? giờ; xe buýt: số phút từ hai đồng hồ. |
| MT3 | Lịch, tiền | Chủ nhật hằng tuần trong tháng; mua 3 bút chì giá một cái. | Cây đậu thần ra hoa từ ngày nào; học vẽ chiều thứ Bảy từ ngày 14. | Mua kẹo, bim bim (tờ 5 000 đồng); lịch tháng 12. |

## 2. Mười dạng (topics)

| # | Dạng | Nguồn | MT | Mức 1 / Mức 2 / Mức 3 | Hình | Nhãn lỗi chính |
|---|---|---|---|---|---|---|
| D1 | Giờ kém | SGK (bài 1) | MT1 | M1: 8 giờ 50 phút = 9 giờ kém 10 phút · M2: đọc đồng hồ hai cách · M3: giờ chiều | đồng hồ (SVG) | `nham-gio-kem` |
| D2 | Đổi đơn vị thời gian | SGK (bài 4) | MT2 | M1: 2 giờ = 120 phút · M2: 3 tuần = 21 ngày · M3: 3 ngày = 72 giờ; 3 năm = 36 tháng | chữ | `doi-don-vi` |
| D3 | Đổi hỗn hợp | SGK (bài 4) | MT2 | M1: 1 giờ 30 phút · M2: 1 tuần 3 ngày · M3: 1 năm 6 tháng; 1 ngày 6 giờ | chữ | `doi-don-vi` |
| D4 | Thời điểm sau (ăn trưa) | SGK (bài 4) | MT2 | M1: 11 giờ 20 phút + 10 phút · M2: vượt quá 60 phút · M3: ra chơi bắt đầu lúc nào | đồng hồ (SVG) | `cong-phut-quen-doi` |
| D5 | Lịch: Chủ nhật hằng tuần | SGK (bài 3) | MT3 | M1: Ngày Sách Việt Nam · M2: các ngày bóng rổ · M3: số buổi học vẽ | lịch (SVG, data-lich) | `nham-thu` |
| D6 | Cây đậu thần | SGK (bài 3) | MT3 | M1: 1 bông mỗi ngày · M2: thứ Bảy đầu tiên có 4 bông · M3: số khác | lịch, chữ | `dem-sot-ngay` |
| D7 | Rô-bốt đi xe buýt | SGK (bài 6) | MT2 | M1: đi đến trường · M2: về nhà · M3: cả hai chiều | hai đồng hồ (SVG) | `dem-phut-sai` |
| D8 | Mua kẹo, bim bim | SGK (bài 2) | MT3 | M1: giá kẹo · M2: thêm tờ 5 000 đồng · M3: giá bim bim | tờ tiền (SVG) | `cong-sai-to` |
| D9 | Mua nhiều cái chia đều | SGK (bài 5) | MT3 | M1: 9 000 đồng mua 3 cái · M2: giá một cái · M3: số tiền cho 1 cái | tờ tiền (SVG) | `doc-de-sai` |
| D10 | Dãy đồng hồ kim | SGK (bài 7) | MT1 | M1: tăng 1 giờ · M2: tăng 15 phút · M3: tăng 1 giờ 5 phút | dãy đồng hồ (SVG) | `nham-kim` |

### Luật lời câu hỏi
- Câu «… có … không?» dùng Có / Không; mọi đẳng thức trong phương án đúng số học; đúng một đáp án.

## 3. Nhãn lỗi
Chép từ bài 66–68: `nham-kim`, `doi-don-vi`, `cong-phut-quen-doi`, `dem-phut-sai`, `nham-thu`, `dem-sot-ngay`, `cong-sai-to`, `doc-de-sai`; thêm `nham-gio-kem` (tên gợi ý, đặt trong mã).

## Rủi ro chung
Font Linux khác máy thầy (thầy soát lại trên Vercel). mặt đồng hồ có 60 vạch phút phải đọc rõ ở 375 px (kim giờ, kim phút khác màu, nhãn số lớn); lịch tháng tự dựng bằng bảng: `check()` tính lại thứ trong tuần từ ngày 1, không tin số liệu cho sẵn. Số có năm chữ số viết có khoảng trắng không ngắt ở hàng nghìn ("12 324"); ô nhập là số nguyên không dấu cách.

## Việc sẽ làm sau khi thầy duyệt
Viết `bai-69.js` (chép hàm cần dùng từ bài 66–68), chép `bai-69.html`, sửa `index.html`; chạy đủ cổng; PR [XONG] Bài 69.

## Cần thầy quyết (kèm đề xuất)
1. Bài 69 dùng lại dạng bài 66–68: đồng ý (**đề xuất**).
2. Làm bài 69 sau cùng.
