# Phân tích sư phạm — Bài 48: Làm tròn số đến hàng chục, hàng trăm (BÀI MỚI — BẢN NHÁP CHỜ DUYỆT)

Mẫu: khối "LUYỆN THÔNG MINH" ở đầu `engine.js`; hình `clockSVG`, `daySo`, `svgHinh` trong `figures.js`; cách dựng mục tiêu x dạng như `bai-44.js`.
Phạm vi: tạo mới `bai-48.js`, `bai-48.html`, thêm 48 vào `AVAILABLE` (giữ CRLF, diff 1 dòng) và file này. Không đụng `engine.js`, `figures.js`, `lua.js`. Chưa viết dòng mã nào.
Tham số engine: `goal:10, soCau:18, soCauToiDa:24`. Quy tắc mã: nối chuỗi, không template literal, không emoji, không số thập phân hay số âm; mọi số trong phạm vi 10 000; `check()` tính lại từ chuỗi SVG (data-*).

## 0. Nguồn và điều cần lưu ý
Nội dung SGK Tập 2 (Kết nối tri thức) lấy từ **tóm tắt của phiên Claude trên máy thầy**; phiên đám mây chưa đối chiếu sách, không chép hình hay đoạn văn của sách.
- Sách tr.15-16: làm tròn đến hàng chục (đơn vị bé hơn 5 thì xuống, từ 5 trở lên thì lên); đến hàng trăm (xét hàng chục). 1 726 -> 1 730, 1 725 -> 1 730, 1 723 -> 1 720; 1 786 -> 1 800, 1 726 -> 1 700. Đàn gà 1 242 con khoảng 1 240; thư viện 6 745 cuốn -> 6 750 (hàng chục) hoặc 6 700 (hàng trăm); máy làm tròn 3 254 -> 3 300, 4 516 -> 4 500.
- Lỗi hay gặp: làm tròn xuống khi đơn vị bằng 5; nhầm hàng; quên đổi chữ số hàng trên khi lên (1 996 -> 2 000).

## 1. Ba mục tiêu x ba mức

| MT | Tên | Mức 1 | Mức 2 | Mức 3 |
|---|---|---|---|---|
| MT1 | Làm tròn đến hàng chục | Đơn vị bé hơn 5 (1 723). | Đơn vị từ 5 trở lên (1 725, 1 726). | Lên qua hàng trăm (2 997 -> 3 000). |
| MT2 | Làm tròn đến hàng trăm | Hàng chục bé hơn 5 (1 726). | Hàng chục từ 5 trở lên (1 786). | Qua hàng nghìn (3 960 -> 4 000). |
| MT3 | Ước lượng «khoảng» | Đàn gà 1 242 con khoảng bao nhiêu. | Thư viện 6 745: làm tròn đến hàng nào. | Máy làm tròn: tìm số ban đầu; hai bạn, ai đúng. |

## 2. Mười dạng (topics)

| # | Dạng | Nguồn | MT | Mức 1 / Mức 2 / Mức 3 | Hình | Nhãn lỗi chính |
|---|---|---|---|---|---|---|
| D1 | Làm tròn đến hàng chục | SGK (khám phá, bài 1) | MT1 | M1: đơn vị < 5 · M2: đơn vị >= 5 · M3: qua hàng trăm | chữ | `lam-tron-nham-5` |
| D2 | Làm tròn đến hàng trăm | SGK (khám phá, bài 1) | MT2 | M1: hàng chục < 5 · M2: hàng chục >= 5 · M3: qua hàng nghìn | chữ | `lam-tron-nham-5` |
| D3 | Làm tròn đến hàng nào | SGK (bài 3) | MT3 | M1: 6 750 là hàng nào · M2: 6 700 · M3: 4 000 hay 4 100 | chữ | `nham-hang-tron` |
| D4 | Khoảng bao nhiêu | SGK (bài 2) | MT3 | M1: đàn gà · M2: số lớn hơn · M3: đơn vị khác (cuốn, học sinh) | `anh` | `lam-tron-nham-5` |
| D5 | Máy làm tròn | SGK (bài 4) | MT3 | M1: hàng trăm 4 516 · M2: hàng chục · M3: số ban đầu có thể | máy (SVG) | `nham-hang-tron` |
| D6 | Hai bạn, ai đúng | SGK (bài 2) | MT3 | M1: Mai đúng · M2: Việt sai ở đâu · M3: cả hai cùng đúng | `anh('girl')`, `anh('boy')` | `lam-tron-nham-5` |
| D7 | Trục số làm tròn | **không có trong SGK** | MT1 | M1: gần số tròn chục nào hơn · M2: hàng trăm · M3: điểm giữa 5 | trục số (SVG, data-pt) | `lam-tron-nham-5` |
| D8 | Chọn kết quả | **không có trong SGK** | MT1 | M1: bốn đáp án hàng chục · M2: hàng trăm · M3: đáp án gần nhau | thẻ số | `lam-tron-nham-5` |
| D9 | Đúng hay sai | **không có trong SGK** | MT2 | M1: 3 058 -> 3 060 · M2: 4 315 -> 4 300 · M3: chọn mệnh đề đúng | chữ | `lam-tron-nham-5` |
| D10 | Bạn An làm tròn | **không có trong SGK** | MT2 | M1: An làm tròn 1 725 thành 1 720 · M2: sai ở đâu · M3: kết quả đúng | `anh('boy')` | `lam-tron-nham-5` |

### Luật lời câu hỏi
- Câu «… có … không?» dùng Có / Không; mọi đẳng thức trong phương án đúng số học; đúng một đáp án.

## 3. Nhãn lỗi
`lam-tron-nham-5`, `nham-hang-tron` (tên gợi ý, đặt trong mã).

## Rủi ro chung
Font Linux khác máy thầy (thầy soát lại trên Vercel). Số có bốn chữ số viết có dấu cách ngăn nhóm nghìn ("3 421"), phải dùng khoảng trắng không ngắt để không tách dòng ở 375 px.

## Việc sẽ làm sau khi thầy duyệt
Viết `bai-48.js`, chép `bai-48.html`, sửa `index.html`; chạy đủ cổng; PR [XONG] Bài 48.

## Cần thầy quyết (kèm đề xuất)
1. Bài sách chỉ hai trang nên D7-D10 ngoài SGK: giữ (**đề xuất**).
2. Lẻ 5 trở lên làm tròn lên, đúng sách (**đề xuất**).
