# Phân tích sư phạm — Bài 67: Thực hành xem đồng hồ, xem lịch (BÀI MỚI — BẢN NHÁP CHỜ DUYỆT)

Mẫu: khối "LUYỆN THÔNG MINH" ở đầu `engine.js`; cách dựng mục tiêu x dạng như `bai-44.js`; đồng hồ và lịch từ bài 66.
Phạm vi: tạo mới `bai-67.js`, `bai-67.html`, thêm 67 vào `AVAILABLE` (giữ CRLF, diff 1 dòng) và file này. Không đụng `engine.js`, `figures.js`, `lua.js`. Chưa viết dòng mã nào.
Tham số engine: `goal:10, soCau:18, soCauToiDa:24`. Quy tắc mã: nối chuỗi, không template literal, không emoji, không số thập phân hay số âm; mọi số trong phạm vi 100 000 (kết quả cộng, trừ không quá 100 000); `check()` tính lại từ chuỗi SVG hoặc từ số liệu trong câu, không đoán.

## 0. Nguồn và điều cần lưu ý
Nội dung SGK Tập 2 (Kết nối tri thức, Chủ đề 13: Xem đồng hồ. Tháng, năm. Tiền Việt Nam) lấy từ **tóm tắt của phiên Claude trên máy thầy**, kèm đính chính tháng 6; phiên đám mây chưa đối chiếu sách, không chép hình hay đoạn văn của sách. Số trong câu do mã chọn ngẫu nhiên; chỉ giữ dạng và độ khó theo sách.
- Sách tr.81-84: cơm điện cắm lúc 10 giờ 10 phút, 40 phút nữa chín: 10 giờ 50 phút; món rau trộn mất 7 phút, bắt đầu 10 giờ 50 phút: xong 10 giờ 57 phút; gà nướng, tính số phút từ hai đồng hồ (20, 25, 30, 35 phút); lịch tháng 5 (1 là thứ Tư; Chủ nhật 5, 12, 19, 26); việc chiều Chủ nhật: dọn nhà trước 15:45, nấu bữa tối trước 18:30, xem đá bóng 16:00 đến 17:45: xếp thứ tự; lịch tháng 6 (1 là thứ Bảy): trại hè từ 24 đến hết 30 tháng 6 là 7 ngày; hạn đăng kí hết thứ Sáu đầu tiên là ngày 7; thứ Hai của tuần kế tiếp là ngày 10 (đính chính: không phải 9); chuẩn bị đồ dùng, tính số phút giữa hai đồng hồ; chọn hoạt động không trùng giờ (vẽ tranh 10:10 đến 11:30; rung chuông vàng 10:00 đến 11:30; làm đồ chơi tái chế 10:15 đến 11:30; làm bánh giấy 15:00 đến 16:00; làm đồ gốm 14:00 đến 15:00).
- Lỗi hay gặp: cộng phút quá 60 không đổi sang giờ; đếm khoảng ngày thiếu ngày đầu hoặc cuối; chọn hoạt động trùng giờ.

## 1. Ba mục tiêu x ba mức

| MT | Tên | Mức 1 | Mức 2 | Mức 3 |
|---|---|---|---|---|
| MT1 | Thời điểm sau, thời điểm trước | Sau một số phút chẵn chục (10 giờ 10 phút + 40 phút). | Cộng phút vượt quá 60 (10 giờ 50 phút + 7 phút; 9 giờ 45 phút + 30 phút). | Thời điểm trước: phải xong trước 15 giờ 45 phút. |
| MT2 | Khoảng thời gian (số phút) | Từ giờ bắt đầu đến giờ kết thúc trong cùng một giờ. | Hai đồng hồ, qua một giờ (gà nướng). | Chuẩn bị đồ dùng; xe buýt. |
| MT3 | Lịch và xếp thời gian | Các ngày Chủ nhật của tháng; khoảng ngày trại hè. | Hạn đăng kí, thứ Hai tuần kế tiếp. | Chọn hoạt động không trùng giờ; xếp việc theo thứ tự. |

## 2. Mười dạng (topics)

| # | Dạng | Nguồn | MT | Mức 1 / Mức 2 / Mức 3 | Hình | Nhãn lỗi chính |
|---|---|---|---|---|---|---|
| D1 | Thời điểm sau (cơm điện) | SGK (bài 1) | MT1 | M1: + 40 phút · M2: vượt quá 60 phút · M3: qua 12 giờ | đồng hồ (SVG) | `cong-phut-quen-doi` |
| D2 | Thời gian làm món ăn | SGK (bài 2, 3) | MT2 | M1: rau trộn 7 phút · M2: gà nướng, hai đồng hồ · M3: bốn đáp án | hai đồng hồ (SVG) | `dem-phut-sai` |
| D3 | Lịch: các ngày Chủ nhật | SGK (bài 4) | MT3 | M1: ngày Chủ nhật đầu · M2: các Chủ nhật · M3: tháng khác | lịch (SVG, data-lich) | `nham-thu` |
| D4 | Xếp việc theo thời gian | SGK (bài 5) | MT3 | M1: hai việc · M2: ba việc · M3: bốn việc, có khoảng giờ | chữ, thẻ giờ | `sai-thu-tu-gio` |
| D5 | Khoảng ngày trại hè | SGK (bài 6) | MT3 | M1: 24 đến hết 30 tháng 6 · M2: số khác · M3: qua tháng | lịch (SVG) | `dem-sot-ngay` |
| D6 | Hạn đăng kí, thứ Hai tuần kế | SGK (bài 6, đính chính) | MT3 | M1: thứ Sáu đầu tiên · M2: thứ Hai tuần kế · M3: ngày cho trước | lịch (SVG) | `nham-thu` |
| D7 | Chuẩn bị đồ dùng: số phút giữa hai đồng hồ | SGK (bài 7) | MT2 | M1: cùng giờ · M2: qua một giờ · M3: giờ chiều | hai đồng hồ (SVG) | `dem-phut-sai` |
| D8 | Chọn hoạt động không trùng giờ | SGK (bài 8) | MT3 | M1: hai hoạt động · M2: ba hoạt động · M3: chọn đủ nhiều nhất | bảng giờ (SVG) | `trung-gio` |
| D9 | Thời điểm trước | **không có trong SGK** | MT1 | M1: bắt đầu trước · M2: qua giờ · M3: hai việc liền | đồng hồ (SVG) | `cong-phut-quen-doi` |
| D10 | Bạn An tính giờ | **không có trong SGK** | MT1 | M1: An tính, em đồng ý không · M2: An sai ở đâu · M3: giờ đúng | `anh('boy')` | `cong-phut-quen-doi` |

### Luật lời câu hỏi
- Câu «… có … không?» dùng Có / Không; mọi đẳng thức trong phương án đúng số học; đúng một đáp án.

## 3. Nhãn lỗi
`cong-phut-quen-doi`, `dem-phut-sai`, `nham-thu`, `sai-thu-tu-gio`, `dem-sot-ngay`, `trung-gio` (tên gợi ý, đặt trong mã).

## Rủi ro chung
Font Linux khác máy thầy (thầy soát lại trên Vercel). mặt đồng hồ có 60 vạch phút phải đọc rõ ở 375 px (kim giờ, kim phút khác màu, nhãn số lớn); lịch tháng tự dựng bằng bảng: `check()` tính lại thứ trong tuần từ ngày 1, không tin số liệu cho sẵn. Số có năm chữ số viết có khoảng trắng không ngắt ở hàng nghìn ("12 324"); ô nhập là số nguyên không dấu cách.

## Việc sẽ làm sau khi thầy duyệt
Viết `bai-67.js` (chép đồng hồ, lịch từ bài 66), chép `bai-67.html`, sửa `index.html`; chạy đủ cổng; PR [XONG] Bài 67.

## Cần thầy quyết (kèm đề xuất)
1. Bảng dạng đúng chưa? Đề xuất: đúng như bảng.
2. Số liệu lịch, giờ do mã dựng, `check()` tính lại: đồng ý (**đề xuất**).
3. D9, D10 ngoài SGK: giữ (**đề xuất**).
