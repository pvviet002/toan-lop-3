# Phân tích sư phạm — Bài 46: So sánh các số trong phạm vi 10 000 (BÀI MỚI — BẢN NHÁP CHỜ DUYỆT)

Mẫu: khối "LUYỆN THÔNG MINH" ở đầu `engine.js`; hình `clockSVG`, `daySo`, `svgHinh` trong `figures.js`; cách dựng mục tiêu x dạng như `bai-44.js`.
Phạm vi: tạo mới `bai-46.js`, `bai-46.html`, thêm 46 vào `AVAILABLE` (giữ CRLF, diff 1 dòng) và file này. Không đụng `engine.js`, `figures.js`, `lua.js`. Chưa viết dòng mã nào.
Tham số engine: `goal:10, soCau:18, soCauToiDa:24`. Quy tắc mã: nối chuỗi, không template literal, không emoji, không số thập phân hay số âm; mọi số trong phạm vi 10 000; `check()` tính lại từ chuỗi SVG (data-*).

## 0. Nguồn và điều cần lưu ý
Nội dung SGK Tập 2 (Kết nối tri thức) lấy từ **tóm tắt của phiên Claude trên máy thầy**; phiên đám mây chưa đối chiếu sách, không chép hình hay đoạn văn của sách.
- Sách tr.9-11: ít chữ số hơn thì bé hơn; cùng số chữ số thì so từng cặp từ trái sang phải; so với biểu thức (3 257 ? 3 000 + 200 + 50 + 7); cầu dài nhất/ngắn nhất; xếp thứ tự (túi hạt dẻ, đỉnh núi); đố số bé nhất/lớn nhất có bốn chữ số (khác nhau, giống nhau).
- Đáp án mẫu: 1 023, 9 876, 1 111, 9 999, 1 000; thẻ 3, 0, 2, 7 lập số bé nhất là 2 037.
- Lỗi hay gặp: so hàng đơn vị trước; không để ý khác số chữ số; số bé nhất bắt đầu bằng 0.

## 1. Ba mục tiêu x ba mức

| MT | Tên | Mức 1 | Mức 2 | Mức 3 |
|---|---|---|---|---|
| MT1 | So sánh hai số | Khác số chữ số (998 và 2 021). | Cùng số chữ số (5 831 và 5 381). | So với biểu thức (6 500 ? 600 + 5). |
| MT2 | Lớn nhất, bé nhất, xếp thứ tự | Số lớn nhất trong ba số. | Xếp bốn số (cầu, núi, túi hạt dẻ). | Xếp lớn đến bé, tìm vật thứ hai. |
| MT3 | Đố về số | Bé nhất/lớn nhất có bốn chữ số. | Bé nhất/lớn nhất có bốn chữ số khác nhau. | Lập số bé nhất từ thẻ 3, 0, 2, 7; Đúng/Sai nhiều mệnh đề. |

## 2. Mười dạng (topics)

| # | Dạng | Nguồn | MT | Mức 1 / Mức 2 / Mức 3 | Hình | Nhãn lỗi chính |
|---|---|---|---|---|---|---|
| D1 | Điền >, <, = | SGK (bài 1) | MT1 | M1: khác số chữ số · M2: cùng số chữ số · M3: với biểu thức | chữ | `so-sanh-hang` |
| D2 | Chọn số lớn nhất, bé nhất | SGK (mê cung) | MT2 | M1: ba số · M2: bốn số cùng hàng nghìn · M3: số gần giống nhau | chữ, cửa (SVG) | `so-sanh-hang` |
| D3 | Cầu dài nhất, ngắn nhất | SGK (bài 3) | MT2 | M1: dài nhất · M2: ngắn nhất · M3: dài thứ hai | `svgHinh` cầu | `so-sanh-hang` |
| D4 | Xếp thứ tự | SGK (bài 3) | MT2 | M1: 3 số bé đến lớn · M2: 4 số · M3: lớn đến bé | thẻ số | `sai-thu-tu` |
| D5 | Túi hạt dẻ | SGK (bài 4) | MT2 | M1: nặng nhất · M2: nhẹ nhất · M3: nhẹ thứ hai | chữ | `so-sanh-hang` |
| D6 | Đỉnh núi | SGK (bài 5) | MT2 | M1: cao nhất · M2: xếp theo độ cao · M3: thấp thứ hai | chữ | `sai-thu-tu` |
| D7 | Đúng hay sai | SGK (bài 6) | MT1 | M1: 10 000 > 9 999 · M2: 3 080 = 3 000 + 80 · M3: chọn mệnh đề đúng | chữ | `so-sanh-hang` |
| D8 | Bé nhất, lớn nhất có bốn chữ số | SGK (đố) | MT3 | M1: bé nhất/lớn nhất · M2: khác nhau (1 023, 9 876) · M3: giống nhau (1 111, 9 999) | chữ | `so-0-dau` |
| D9 | Lập số từ thẻ | SGK (đố) | MT3 | M1: lớn nhất từ 3 thẻ · M2: bé nhất từ 4 thẻ có 0 · M3: lớn hơn số cho trước | thẻ (SVG) | `so-0-dau` |
| D10 | Bạn nào đúng | **không có trong SGK** | MT1 | M1: đồng ý/không · M2: sai ở đâu · M3: so sánh đúng | `anh('boy')` | `so-sanh-hang` |

### Luật lời câu hỏi
- Câu «… có … không?» dùng Có / Không; mọi đẳng thức trong phương án đúng số học; đúng một đáp án.

## 3. Nhãn lỗi
`so-sanh-hang`, `sai-thu-tu`, `so-0-dau` (tên gợi ý, đặt trong mã).

## Rủi ro chung
Font Linux khác máy thầy (thầy soát lại trên Vercel). Số có bốn chữ số viết có dấu cách ngăn nhóm nghìn ("3 421"), phải dùng khoảng trắng không ngắt để không tách dòng ở 375 px.

## Việc sẽ làm sau khi thầy duyệt
Viết `bai-46.js`, chép `bai-46.html`, sửa `index.html`; chạy đủ cổng; PR [XONG] Bài 46.

## Cần thầy quyết (kèm đề xuất)
1. Bảng dạng đúng chưa? Đề xuất: đúng như bảng.
2. D10 ngoài SGK: giữ (**đề xuất**).
