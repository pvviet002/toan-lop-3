# Phân tích sư phạm — Bài 68: Tiền Việt Nam (BÀI MỚI — BẢN NHÁP CHỜ DUYỆT)

Mẫu: khối "LUYỆN THÔNG MINH" ở đầu `engine.js`; cách dựng mục tiêu x dạng như `bai-44.js`; hình tờ tiền tự vẽ bằng SVG (hình chữ nhật có mệnh giá, màu khác nhau), không dùng ảnh tiền thật.
Phạm vi: tạo mới `bai-68.js`, `bai-68.html`, thêm 68 vào `AVAILABLE` (giữ CRLF, diff 1 dòng) và file này. Không đụng `engine.js`, `figures.js`, `lua.js`. Chưa viết dòng mã nào.
Tham số engine: `goal:10, soCau:18, soCauToiDa:24`. Quy tắc mã: nối chuỗi, không template literal, không emoji, không số thập phân hay số âm; mọi số trong phạm vi 100 000 (kết quả cộng, trừ không quá 100 000); `check()` tính lại từ chuỗi SVG hoặc từ số liệu trong câu, không đoán.

## 0. Nguồn và điều cần lưu ý
Nội dung SGK Tập 2 (Kết nối tri thức, Chủ đề 13: Xem đồng hồ. Tháng, năm. Tiền Việt Nam) lấy từ **tóm tắt của phiên Claude trên máy thầy**; phiên đám mây chưa đối chiếu sách, không chép hình hay đoạn văn của sách. Số trong câu do mã chọn ngẫu nhiên; chỉ giữ dạng và độ khó theo sách.
- Sách tr.85-87: các tờ tiền 1 000, 2 000, 5 000, 10 000, 20 000, 50 000, 100 000, 200 000, 500 000 đồng. Chú lợn nào có nhiều tiền nhất (cộng các tờ); mẹ mua chanh 3 000 đồng và hành 2 000 đồng, đưa 10 000 đồng: trả lại 5 000 đồng (chọn cách trả lại); đoán giá (bóng đèn thấp nhất, quyển sách cao nhất); ba giỏ 10 000, 8 000, 5 000 đồng; bắp ngô đầu vụ 5 000 đồng một bắp, giữa vụ 5 000 đồng mua 2 bắp: 2 500 đồng một bắp, đầu vụ đắt hơn 2 500 đồng; nước 20 000 + đường 14 000 + chanh 10 000 = 44 000 đồng; bán 80 000 đồng, trừ vốn còn 36 000 đồng; đổi tiền (2 tờ 10 000 = 1 tờ 20 000; 5 tờ 10 000 = 1 tờ 50 000; 1 tờ 100 000 = 2 tờ 50 000).
- Lỗi hay gặp: cộng sai khi các tờ khác nhau; quên trừ khi trả lại; nhầm số tờ khi đổi tiền.

## 1. Ba mục tiêu x ba mức

| MT | Tên | Mức 1 | Mức 2 | Mức 3 |
|---|---|---|---|---|
| MT1 | Cộng, đổi các tờ tiền | Cộng hai, ba tờ. | Cộng các tờ khác nhau; đổi tiền một cách. | Đổi tiền nhiều cách; chọn cách đổi đúng. |
| MT2 | Mua, trả lại | Mua một món, trả lại. | Mua hai món (3 000 + 2 000), trả lại từ 10 000. | Chọn cách trả lại bằng các tờ cho trước. |
| MT3 | Bài toán đố về tiền | Tổng tiền ba thứ (20 000 + 14 000 + 10 000). | Bán trừ vốn còn bao nhiêu (80 000 − ?). | Đầu vụ, giữa vụ (5 000 mua 2 bắp): giá một bắp, đắt hơn bao nhiêu. |

## 2. Mười dạng (topics)

| # | Dạng | Nguồn | MT | Mức 1 / Mức 2 / Mức 3 | Hình | Nhãn lỗi chính |
|---|---|---|---|---|---|---|
| D1 | Chú lợn nào nhiều tiền nhất | SGK (bài 1) | MT1 | M1: hai chú lợn · M2: ba chú lợn · M3: các tờ khác nhau, số lớn | tờ tiền (SVG, data-to) | `cong-sai-to` |
| D2 | Mua và trả lại | SGK (bài 2) | MT2 | M1: một món · M2: hai món · M3: ba món, đưa tờ lớn | chữ, tờ tiền (SVG) | `quen-tra-lai` |
| D3 | Chọn cách trả lại | SGK (bài 2) | MT2 | M1: tờ 5 000 · M2: hai tờ 2 000 và một tờ 1 000 · M3: nhiều cách, chọn cách đúng | tờ tiền (SVG) | `cong-sai-to` |
| D4 | Đổi tiền | SGK (bài 7) | MT1 | M1: 2 tờ 10 000 = ? tờ 20 000 · M2: 5 tờ 10 000 = ? tờ 50 000 · M3: 1 tờ 50 000 = 1 tờ 10 000 + ? tờ 20 000 | tờ tiền (SVG) | `doi-sai-so-to` |
| D5 | Đoán giá, so sánh giá | SGK (bài 3) | MT2 | M1: giá thấp nhất · M2: cao nhất · M3: A cao hơn B | bảng giá (SVG) | `so-sanh-gia` |
| D6 | Giá của ba giỏ hàng | SGK (bài 4) | MT3 | M1: tổng hai giỏ · M2: ba giỏ · M3: giỏ nào đắt nhất | chữ | `cong-sai-to` |
| D7 | Tổng tiền mua nguyên liệu | SGK (bài 5) | MT3 | M1: hai thứ · M2: ba thứ (20 000 + 14 000 + 10 000) · M3: số lớn | chữ | `thieu-buoc` |
| D8 | Bán hàng: tiền lãi | SGK (bài 6) | MT3 | M1: bán 80 000, vốn 44 000 · M2: số khác · M3: hai bước | chữ | `thieu-buoc` |
| D9 | Đầu vụ, giữa vụ | SGK (bài 6, 7) | MT3 | M1: giữa vụ 2 bắp 5 000 đồng, một bắp · M2: đắt hơn bao nhiêu · M3: số khác | chữ | `doc-de-sai` |
| D10 | Bạn An trả tiền | **không có trong SGK** | MT2 | M1: An trả lại, em đồng ý không · M2: An sai ở đâu · M3: số tiền đúng | `anh('boy')` | `quen-tra-lai` |

### Luật lời câu hỏi
- Câu «… có … không?» dùng Có / Không; mọi đẳng thức trong phương án đúng số học; đúng một đáp án.

## 3. Nhãn lỗi
`cong-sai-to`, `quen-tra-lai`, `doi-sai-so-to`, `so-sanh-gia`, `thieu-buoc`, `doc-de-sai` (tên gợi ý, đặt trong mã).

## Rủi ro chung
Font Linux khác máy thầy (thầy soát lại trên Vercel). tờ tiền tự vẽ có chữ mệnh giá lớn (không dưới 14 px), màu trong bảng HM, tờ chồng nhau không che chữ. Số có năm chữ số viết có khoảng trắng không ngắt ở hàng nghìn ("12 324"); ô nhập là số nguyên không dấu cách.

## Việc sẽ làm sau khi thầy duyệt
Viết `bai-68.js`, chép `bai-68.html`, sửa `index.html`; chạy đủ cổng; PR [XONG] Bài 68.

## Cần thầy quyết (kèm đề xuất)
1. Bảng dạng đúng chưa? Đề xuất: đúng như bảng.
2. Tờ tiền vẽ bằng hình chữ nhật có mệnh giá, không ảnh tiền thật: đồng ý (**đề xuất**).
3. Giá bóng đèn, quyển sách ở D5 do mã dựng: đồng ý (**đề xuất**).
