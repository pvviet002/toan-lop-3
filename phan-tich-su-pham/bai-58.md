# Phân tích sư phạm — Bài 58: Luyện tập chung (Chủ đề 10) (BÀI MỚI — BẢN NHÁP CHỜ DUYỆT)

Mẫu: khối "LUYỆN THÔNG MINH" ở đầu `engine.js`; cách dựng mục tiêu x dạng như `bai-44.js`; phép tính cột dọc theo `nhanDoc`/`chiaDoc3` (bài 36, 37, 41) mở rộng lên bốn chữ số; `okEq` (bài 41) cho câu «đồng ý, vì …».
Phạm vi: tạo mới `bai-58.js`, `bai-58.html`, thêm 58 vào `AVAILABLE` (giữ CRLF, diff 1 dòng) và file này. Không đụng `engine.js`, `figures.js`, `lua.js`. Chưa viết dòng mã nào.
Tham số engine: `goal:10, soCau:18, soCauToiDa:24`. Quy tắc mã: nối chuỗi, không template literal, không emoji, không số thập phân hay số âm; mọi kết quả trong phạm vi 10 000 (tích luôn bé hơn 10 000); số dư luôn bé hơn số chia; `check()` tính lại từ chuỗi SVG hoặc từ số đo trong câu, không đoán.

## 0. Nguồn và điều cần lưu ý
Nội dung SGK Tập 2 (Kết nối tri thức, Chủ đề 10: Cộng, trừ, nhân, chia trong phạm vi 10 000) lấy từ **tóm tắt của phiên Claude trên máy thầy**; phiên đám mây chưa đối chiếu sách, không chép hình hay đoạn văn của sách. Số trong câu do mã chọn ngẫu nhiên; chỉ giữ dạng và độ khó theo sách.
- Sách tr.51-55: 3 507 × 2 = 7 014; 4 806 : 6 = 801; 1 041 × 5 = 5 205; 7 168 : 7 = 1 024; máy bay A cao 6 504 m gấp đôi B, B gấp 3 lần C: B 3 252 m, C 1 084 m; ? × 4 = 1 668; ? : 3 = 819; hai con cà cuống bơi đường gấp khúc (A bốn đoạn 515 cm, B ba đoạn 928 cm): A ngắn hơn; tôm bơi năm đoạn bằng nhau, tổng bằng đường cà cuống A: mỗi đoạn 412 cm; 8 cục pin nặng 1 680 g: mỗi cục 210 g; ba rô-bốt 2 000 g lắp 5, 6, 8 cục pin; sâu bò chọn lá ghi kết quả (721 × 6, 4 328 : 6 dư 2, 9 362 : 9 dư 2, 1 214 × 6, 2 790 : 3, 912 × 7); dây đèn khối lập phương (12 − 4 = 8 dây × 450 cm = 3 600 cm); ba người khổng lồ nâng gỗ 2 612 kg, voi 1 245 kg, chó 25 kg, ngựa 450 kg; biểu thức (2 000 + 7 015) : 3, (102 + 901) × 7, 2 515 : (1 + 4), 705 × (8 − 2); tàu 7 863 thùng, còn lại giảm 3 lần: 2 621; đường lát đá 4 555 m, khối đá 5 m: 911 khối; tường vuông cạnh 2 324 bước: chu vi 9 296; chòi ở trung điểm I của AB: AI = 1 162.
- Lỗi hay gặp: quên nhớ; thiếu chữ số 0 ở thương; số dư lớn hơn số chia; bỏ ngoặc; nhầm gấp lên với thêm vào; quên trừ 4 cạnh sát đất.

## 1. Ba mục tiêu x ba mức

| MT | Tên | Mức 1 | Mức 2 | Mức 3 |
|---|---|---|---|---|
| MT1 | Tính nhân, chia với số bốn chữ số | Nhân (3 507 × 2); chia hết (4 806 : 6). | Có dư (4 328 : 6, 9 362 : 9); chọn lá ghi đúng kết quả. | Nhiều phép trộn lẫn, số có chữ số 0. |
| MT2 | Tìm số chưa biết; biểu thức | ? × 4 = 1 668; ? : 3 = 819. | (2 000 + 7 015) : 3; (102 + 901) × 7. | 2 515 : (1 + 4); 705 × (8 − 2). |
| MT3 | Toán đố nhiều bước, hình học | Gấp lên, giảm đi (máy bay A, B, C); chia đều (8 pin 1 680 g). | Đường gấp khúc cà cuống; tường vuông chu vi; chòi ở trung điểm. | Dây đèn khối lập phương; ba người khổng lồ; ba rô-bốt. |

## 2. Mười dạng (topics)

| # | Dạng | Nguồn | MT | Mức 1 / Mức 2 / Mức 3 | Hình | Nhãn lỗi chính |
|---|---|---|---|---|---|---|
| D1 | Chọn lá ghi kết quả | SGK (bài 6) | MT1 | M1: phép nhân · M2: phép chia có dư · M3: hai phép nhân, chia xen kẽ | ba lá (SVG) | `quen-nho`, `thieu-so-0` |
| D2 | Tìm số chưa biết | SGK (bài 2) | MT2 | M1: ? × 4 = 1 668 · M2: ? : 3 = 819 · M3: ? × 5 = 5 205 và ? : 7 = 1 024 | chữ | `doi-phep-tinh` |
| D3 | Biểu thức có dấu ngoặc | SGK (bài 8) | MT2 | M1: (2 000 + 7 015) : 3 · M2: (102 + 901) × 7 · M3: 2 515 : (1 + 4), 705 × (8 − 2) | chữ | `bo-ngoac` |
| D4 | Gấp lên, giảm đi nhiều lần | SGK (bài 3, 9) | MT3 | M1: A gấp đôi B · M2: B gấp 3 lần C · M3: tàu 7 863 thùng còn lại giảm 3 lần | sơ đồ đoạn thẳng (SVG) | `doc-de-sai`, `thieu-buoc` |
| D5 | Hai con cà cuống bơi đường gấp khúc | SGK (bài 4) | MT3 | M1: đường của A · M2: A và B, ai bơi ngắn hơn · M3: mỗi đoạn của tôm | gấp khúc (SVG, data-seg) | `thieu-buoc` |
| D6 | Chia đều | SGK (bài 5, 9) | MT3 | M1: 8 cục pin 1 680 g · M2: đường lát đá 4 555 m, khối đá 5 m · M3: số khác | chữ | `doi-phep-tinh` |
| D7 | Ba rô-bốt lắp pin | SGK (bài 5) | MT3 | M1: một rô-bốt · M2: rô-bốt nhẹ nhất · M3: nặng nhất, hơn bao nhiêu | rô-bốt và pin (SVG, data-dem) | `dem-sot-pin` |
| D8 | Dây đèn khối lập phương | SGK (bài 7) | MT3 | M1: 12 − 4 = 8 dây · M2: 8 dây × 450 cm · M3: số cạnh khác | khối lập phương (SVG) | `quen-tru-canh` |
| D9 | Chu vi tường, chòi ở trung điểm | SGK (bài 9, 10) | MT3 | M1: chu vi tường vuông · M2: AI khi I là trung điểm AB · M3: hai câu liền | đoạn thẳng, hình vuông (SVG) | `quen-nhan-bon`, `nham-trung-diem` |
| D10 | Ba người khổng lồ nâng vật | SGK (bài 8) | MT3 | M1: tổng một người nâng · M2: ai nâng nặng nhất · M3: nặng hơn bao nhiêu | chữ, ba người (SVG) | `thieu-buoc` |

### Luật lời câu hỏi
- Câu «… có … không?» dùng Có / Không; mọi đẳng thức trong phương án đúng số học; đúng một đáp án; số dư luôn bé hơn số chia.

## 3. Nhãn lỗi
Chép từ bài 54-57: `quen-nho`, `thieu-so-0`, `thieu-buoc`, `doc-de-sai`, `bo-ngoac`, `quen-nhan-bon`; thêm `doi-phep-tinh`, `dem-sot-pin`, `quen-tru-canh`, `nham-trung-diem` (tên gợi ý, đặt trong mã).

## Rủi ro chung
Font Linux khác máy thầy (thầy soát lại trên Vercel). Phép tính cột dọc bốn chữ số rộng hơn ba chữ số: phải co vừa 375 px, các chữ số không đè nhau, số nhớ nhỏ nhưng không dưới 14 px. Số có bốn chữ số viết có khoảng trắng không ngắt ở hàng nghìn ("2 729"); ô nhập là số nguyên không dấu cách.

## Việc sẽ làm sau khi thầy duyệt
Viết `bai-58.js` (chép hàm cần dùng từ bài 54-57 và bài 43, 44), chép `bai-58.html`, sửa `index.html`; chạy đủ cổng; PR [XONG] Bài 58.

## Cần thầy quyết (kèm đề xuất)
1. Bài 58 dùng lại dạng bài 54-57: đồng ý (**đề xuất**).
2. Làm bài 58 sau cùng vì chép hàm từ bốn bài trước.
