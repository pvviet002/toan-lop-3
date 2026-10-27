# Phân tích sư phạm — Bài 45: Các số có bốn chữ số. Số 10 000 (BÀI MỚI — BẢN NHÁP CHỜ DUYỆT)

Mẫu: khối "LUYỆN THÔNG MINH" ở đầu `engine.js`; hình `clockSVG`, `daySo`, `svgHinh` trong `figures.js`; cách dựng mục tiêu x dạng như `bai-44.js`.
Phạm vi: tạo mới `bai-45.js`, `bai-45.html`, thêm 45 vào `AVAILABLE` (giữ CRLF, diff 1 dòng) và file này. Không đụng `engine.js`, `figures.js`, `lua.js`. Chưa viết dòng mã nào.
Tham số engine: `goal:10, soCau:18, soCauToiDa:24`. Quy tắc mã: nối chuỗi, không template literal, không emoji, không số thập phân hay số âm; mọi số trong phạm vi 10 000; `check()` tính lại từ chuỗi SVG (data-*).

## 0. Nguồn và điều cần lưu ý
Nội dung SGK Tập 2 (Kết nối tri thức) lấy từ **tóm tắt của phiên Claude trên máy thầy**; phiên đám mây chưa đối chiếu sách, không chép hình hay đoạn văn của sách.
- Sách tr.4-8: khối 1 000/100/10/1 và bảng hàng nghìn-trăm-chục-đơn vị; đọc số có hàng 0 (3 067 "không trăm sáu mươi bảy", 4 007 "không trăm linh bảy"); 10 000 là mười nghìn, liền sau 9 999; tia số bước 1, 100, 1 000; liền trước/liền sau; phân tích số; lập số từ thẻ chữ số (0 không đứng đầu).
- Đính chính: sách mất trang, còn 1504...1507 và 1998...2001, trang mất là 1505, 1506, 1999, 2000.
- Lỗi hay gặp: bỏ chữ số 0 khi viết, đọc sai hàng 0, nhầm liền trước với liền sau.

## 1. Ba mục tiêu x ba mức

| MT | Tên | Mức 1 | Mức 2 | Mức 3 |
|---|---|---|---|---|
| MT1 | Đọc, viết số có bốn chữ số | Nghe/đọc số (3 421). | Số có một chữ số 0 (3 067, 4 007). | Hai chữ số 0 (8 004), 10 000; đọc đặc biệt (8 640). |
| MT2 | Cấu tạo thập phân, tia số, liền trước/liền sau | Bảng hàng: cho số, điền chữ số các hàng. | Tia số bước 100, 1 000; liền trước/liền sau. | Phân tích 3 892 = 3 000 + 800 + 90 + ?; trang sách bị mất. |
| MT3 | Lập số, suy luận | Chọn số có chữ số hàng trăm là 7. | Ba nhà 3 405, 6 450, 10 000 theo manh mối. | Lập số từ thẻ 0, 2, 0, 4 (0 không đứng đầu). |

## 2. Mười dạng (topics)

| # | Dạng | Nguồn | MT | Mức 1 / Mức 2 / Mức 3 | Hình | Nhãn lỗi chính |
|---|---|---|---|---|---|---|
| D1 | Đọc số, viết số | SGK (khám phá) | MT1 | M1: không có 0 · M2: một chữ số 0 · M3: hai chữ số 0, 10 000 | chữ + khối `svgHinh` | `bo-so-0`, `doc-sai-hang` |
| D2 | Bảng hàng | SGK (bài 3) | MT2 | M1: điền chữ số các hàng · M2: viết số từ bảng · M3: bảng có hàng 0 | bảng hàng (SVG) | `doc-sai-hang`, `bo-so-0` |
| D3 | Tia số | SGK (bài 2, 4) | MT2 | M1: bước 1 · M2: bước 100 · M3: bước 1 000, qua 5 000 hoặc 10 000 | tia số tự vẽ (data-pt) | `dem-sai-buoc` |
| D4 | Viết số từ lời | SGK (bài 5) | MT1 | M1: 3 nghìn 4 trăm 2 chục 1 đơn vị · M2: có hàng 0 · M3: lời đọc dài | chữ | `bo-so-0` |
| D5 | Liền trước, liền sau | SGK (bài 6) | MT2 | M1: liền sau 8 999 · M2: liền trước 4 078, 10 000 · M3: 9 000 là liền sau của số nào | chữ | `nham-truoc-sau` |
| D6 | Chữ số hàng nào là 7 | SGK (bài 7) | MT3 | M1: hàng nghìn · M2: hàng trăm, chục · M3: bốn số, đúng một đáp án | chữ | `nham-hang` |
| D7 | Phân tích số | SGK (luyện tập) | MT2 | M1: 3 892 = 3 000 + 800 + 90 + ? · M2: 6 008 = 6 000 + ? · M3: 6 411 = ? + 400 + ? + 1 | chữ | `nham-hang` |
| D8 | Trang sách bị mất | SGK (luyện tập, đính chính) | MT2 | M1: 1504 ... 1507 · M2: hai cuốn · M3: số lớn hơn | chữ | `dem-sai-buoc` |
| D9 | Lập số từ thẻ | SGK (luyện tập) | MT3 | M1: lập một số từ 4 thẻ · M2: có thẻ 0 · M3: đếm bao nhiêu số | thẻ (SVG) | `so-0-dau` |
| D10 | Ba nhà theo manh mối | SGK (bài 8) | MT3 | M1: manh mối đơn · M2: hai manh mối · M3: chọn rồi đọc số | `svgHinh` ngôi nhà | `doc-sai-hang` |

### Luật lời câu hỏi
- Câu «… có … không?» dùng Có / Không; mọi đẳng thức trong phương án đúng số học; đúng một đáp án.

## 3. Nhãn lỗi
`bo-so-0`, `doc-sai-hang`, `dem-sai-buoc`, `nham-truoc-sau`, `nham-hang`, `so-0-dau` (tên gợi ý, đặt trong mã).

## Rủi ro chung
Font Linux khác máy thầy (thầy soát lại trên Vercel). Số có bốn chữ số viết có dấu cách ngăn nhóm nghìn ("3 421"), phải dùng khoảng trắng không ngắt để không tách dòng ở 375 px.

## Việc sẽ làm sau khi thầy duyệt
Viết `bai-45.js`, chép `bai-45.html`, sửa `index.html`; chạy đủ cổng; PR [XONG] Bài 45.

## Cần thầy quyết (kèm đề xuất)
1. Bảng dạng đúng chưa? Đề xuất: đúng như bảng.
2. Không có dạng ngoài SGK (**đề xuất**).
