# Phân tích sư phạm — Bài 64: Phép trừ trong phạm vi 100 000 (BÀI MỚI — BẢN NHÁP CHỜ DUYỆT)

Mẫu: khối "LUYỆN THÔNG MINH" ở đầu `engine.js`; cách dựng mục tiêu x dạng như `bai-44.js`; phép trừ cột dọc `truDoc` (bài 55) mở rộng lên năm chữ số.
Phạm vi: tạo mới `bai-64.js`, `bai-64.html`, thêm 64 vào `AVAILABLE` (giữ CRLF, diff 1 dòng) và file này. Không đụng `engine.js`, `figures.js`, `lua.js`. Chưa viết dòng mã nào.
Tham số engine: `goal:10, soCau:18, soCauToiDa:24`. Quy tắc mã: nối chuỗi, không template literal, không emoji, không số thập phân hay số âm; mọi số trong phạm vi 100 000 (kết quả cộng, trừ không quá 100 000); `check()` tính lại từ chuỗi SVG hoặc từ số liệu trong câu, không đoán.

## 0. Nguồn và điều cần lưu ý
Nội dung SGK Tập 2 (Kết nối tri thức, Chủ đề 12: Cộng, trừ trong phạm vi 100 000) lấy từ **tóm tắt của phiên Claude trên máy thầy**; phiên đám mây chưa đối chiếu sách, không chép hình hay đoạn văn của sách. Số trong câu do mã chọn ngẫu nhiên; chỉ giữ dạng và độ khó theo sách.
- Sách tr.73-75: 23 285 − 12 967 = 10 318 (nhớ); 84 758 − 43 265 = 41 493; 79 363 − 5 819 = 73 544; 34 635 − 927 = 33 708; 97 358 − 89 263 = 8 095; 75 046 − 32 638 = 42 408; 56 492 − 56 = 56 436; nhẩm 13 000 − 6 000 = 7 000; 80 000 − 50 000 = 30 000; 100 000 − 40 000 = 60 000; 38 000 − 4 000 = 34 000; nhà máy làm 24 500 xe, tháng 1 bán 10 600, tháng 2 bán 9 500: còn 4 400; so sánh 70 000 − 9 000 + 6 023 với 93 279 − 3 279 − 20 000; quãng đường lên dốc 6 700 m, xuống dốc ngắn hơn 2 900 m: cả đường 10 500 m; hiệu của 99 999 và 102 là 99 897; hai phường dân số 23 285 và 12 967: hơn 10 318 người.
- Lỗi hay gặp: quên mượn; trừ ngược chữ số; mượn qua chữ số 0 (75 046 − 32 638, 34 635 − 927); đặt lệch hàng.

## 1. Ba mục tiêu x ba mức

| MT | Tên | Mức 1 | Mức 2 | Mức 3 |
|---|---|---|---|---|
| MT1 | Trừ có nhớ (đặt tính) | Mượn một lần: điền một chữ số của hiệu. | Mượn nhiều lần, qua chữ số 0; điền cả hiệu. | Năm chữ số trừ hai, ba, bốn chữ số; thử lại; bạn An quên mượn. |
| MT2 | Nhẩm tròn nghìn, tròn chục nghìn | 13 000 − 6 000; 80 000 − 50 000. | 38 000 − 4 000; 60 000 − 20 000. | 100 000 − 40 000; 86 000 − 5 000; biểu thức. |
| MT3 | Toán đố một, hai bước; so sánh | Xe còn lại (một lần bán). | Nhà máy bán hai tháng; lên dốc, xuống dốc ngắn hơn. | So sánh hai biểu thức; hiệu của 99 999 và số bé nhất có ba chữ số khác nhau. |

## 2. Mười dạng (topics)

| # | Dạng | Nguồn | MT | Mức 1 / Mức 2 / Mức 3 | Hình | Nhãn lỗi chính |
|---|---|---|---|---|---|---|
| D1 | Đặt tính trừ, điền một chữ số | SGK (khám phá) | MT1 | M1: mượn một lần · M2: mượn hai lần · M3: mượn qua chữ số 0 | cột dọc 5 chữ số (SVG) | `quen-muon`, `tru-nguoc` |
| D2 | Đặt tính trừ, điền hiệu | SGK (bài 1) | MT1 | M1: 84 758 − 43 265 · M2: 75 046 − 32 638 · M3: 97 358 − 89 263 | cột dọc 5 chữ số (SVG) | `quen-muon`, `tru-nguoc` |
| D3 | Hai số khác số chữ số | SGK (bài 1) | MT1 | M1: 5 chữ số − 4 chữ số · M2: 5 chữ số − 3 chữ số (34 635 − 927) · M3: 5 chữ số − 2 chữ số | cột dọc thẳng hàng (SVG) | `dat-lech-hang` |
| D4 | Nhẩm tròn nghìn | SGK (bài 2) | MT2 | M1: 13 000 − 6 000 · M2: 15 000 − 7 000 · M3: 17 000 − 8 000 | chữ | `nham-hang` |
| D5 | Nhẩm tròn chục nghìn | SGK (bài 2) | MT2 | M1: 80 000 − 50 000 · M2: 60 000 − 20 000 · M3: 100 000 − 40 000 | chữ | `nham-hang` |
| D6 | Nhẩm chục nghìn trừ nghìn | SGK (bài 2) | MT2 | M1: 38 000 − 4 000 · M2: 57 000 − 3 000 · M3: 43 000 − 8 000 | chữ | `nham-hang` |
| D7 | Nhà máy xe ô tô | SGK (bài 3) | MT3 | M1: bán một tháng · M2: bán hai tháng (24 500 − 10 600 − 9 500) · M3: bán ba tháng | sơ đồ (SVG) | `thieu-buoc` |
| D8 | So sánh hai biểu thức | SGK (bài 4) | MT3 | M1: hai phép trừ · M2: ba số hạng · M3: 70 000 − 9 000 + 6 023 so với 93 279 − 3 279 − 20 000 | chữ | `so-sanh-sai` |
| D9 | Đường lên dốc, xuống dốc; hai phường | SGK (bài 5, 6) | MT3 | M1: xuống dốc ngắn hơn · M2: cả đường (hai bước) · M3: hai phường hơn bao nhiêu | chữ | `thieu-buoc` |
| D10 | Bạn An làm | **không có trong SGK** | MT1 | M1: An tính, em đồng ý không · M2: An sai ở đâu · M3: kết quả đúng | `anh('boy')`, cột dọc | `quen-muon` |

### Luật lời câu hỏi
- Câu «… có … không?» dùng Có / Không; mọi đẳng thức trong phương án đúng số học; đúng một đáp án.

## 3. Nhãn lỗi
`quen-muon`, `tru-nguoc`, `dat-lech-hang`, `nham-hang`, `thieu-buoc`, `so-sanh-sai` (tên gợi ý, đặt trong mã).

## Rủi ro chung
Font Linux khác máy thầy (thầy soát lại trên Vercel). phép tính cột dọc năm chữ số (hình mới, dựng từ bài 54–57) phải co vừa 375 px, các chữ số không đè nhau, số nhớ không nhỏ hơn 14 px. Số có năm chữ số viết có khoảng trắng không ngắt ở hàng nghìn ("12 324"); ô nhập là số nguyên không dấu cách.

## Việc sẽ làm sau khi thầy duyệt
Viết `bai-64.js`, chép `bai-64.html`, sửa `index.html`; chạy đủ cổng; PR [XONG] Bài 64.

## Cần thầy quyết (kèm đề xuất)
1. Bảng dạng đúng chưa? Đề xuất: đúng như bảng.
2. D10 ngoài SGK: giữ (**đề xuất**).
