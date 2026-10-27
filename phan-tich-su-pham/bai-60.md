# Phân tích sư phạm — Bài 60: So sánh các số trong phạm vi 100 000 (BÀI MỚI — BẢN NHÁP CHỜ DUYỆT)

Mẫu: khối "LUYỆN THÔNG MINH" ở đầu `engine.js`; cách dựng mục tiêu x dạng như `bai-44.js`; so sánh, xếp thứ tự theo `bai-46.js` (10 000) mở rộng lên 100 000; lưới Venn là hình mới.
Phạm vi: tạo mới `bai-60.js`, `bai-60.html`, thêm 60 vào `AVAILABLE` (giữ CRLF, diff 1 dòng) và file này. Không đụng `engine.js`, `figures.js`, `lua.js`. Chưa viết dòng mã nào.
Tham số engine: `goal:10, soCau:18, soCauToiDa:24`. Quy tắc mã: nối chuỗi, không template literal, không emoji, không số thập phân hay số âm; mọi số trong phạm vi 100 000 (kết quả cộng, trừ không quá 100 000); `check()` tính lại từ chuỗi SVG hoặc từ số liệu trong câu, không đoán.

## 0. Nguồn và điều cần lưu ý
Nội dung SGK Tập 2 (Kết nối tri thức, Chủ đề 11: Các số đến 100 000) lấy từ **tóm tắt của phiên Claude trên máy thầy**; phiên đám mây chưa đối chiếu sách, không chép hình hay đoạn văn của sách. Số trong câu do mã chọn ngẫu nhiên; chỉ giữ dạng và độ khó theo sách.
- Sách tr.61-68: cách so sánh như phạm vi 10 000 (ít chữ số hơn thì bé hơn; cùng số chữ số thì so từng hàng từ trái sang phải: 41 217 < 46 616); Đúng/Sai 9 876 < 12 345, 30 724 > 31 000 (sai), 41 035 > 39 999; điền >, <, = (29 100 ? 26 189; 52 740 ? 50 000 + 2 000 + 700 + 40); cây thần kì chọn cành có số lớn hơn; bốn huyện dân số 73 017, 78 655, 75 400, 73 420: xếp tăng dần, đông nhất, ít nhất; sức chứa sân vận động 40 192, 28 000, 30 000, 25 000; công-tơ-mét 43 288, 50 000, 43 300; tìm chữ số (42 371 > 42 37?; 50 826 < 50 ?26); Đúng/Sai (8 000 + 400 > 9 000 sai); toa tàu 50 000, 60 000, 70 000 ...; nối biểu thức tổng các hàng với số; số lượt nghe; Venn hình tròn và hình vuông.
- Lỗi hay gặp: so từ hàng đơn vị; không để ý khác số chữ số; sai khi so với biểu thức.

## 1. Ba mục tiêu x ba mức

| MT | Tên | Mức 1 | Mức 2 | Mức 3 |
|---|---|---|---|---|
| MT1 | So sánh hai số | Khác số chữ số (9 876 và 12 345). | Cùng số chữ số (38 197 và 38 307). | So với tổng các hàng (52 740 ? 50 000 + 2 000 + 700 + 40); tìm chữ số ?. |
| MT2 | Lớn nhất, bé nhất, xếp thứ tự | Số lớn nhất trong ba số; sân vận động lớn nhất. | Xếp bốn huyện từ bé đến lớn; công-tơ-mét nhiều nhất, ít nhất. | Dãy toa tàu; Venn: số lớn nhất ở giao hai hình. |
| MT3 | Đúng sai, suy luận | Đúng/Sai một câu so sánh. | Đúng/Sai có biểu thức (8 000 + 400 > 9 000). | Chọn câu đúng trong ba câu; bạn An so sánh. |

## 2. Mười dạng (topics)

| # | Dạng | Nguồn | MT | Mức 1 / Mức 2 / Mức 3 | Hình | Nhãn lỗi chính |
|---|---|---|---|---|---|---|
| D1 | Đúng hay sai | SGK (bài 1) | MT3 | M1: khác số chữ số · M2: cùng số chữ số · M3: ba câu, chọn câu đúng | chữ | `so-sanh-hang` |
| D2 | Điền >, <, = | SGK (bài 2) | MT1 | M1: khác số chữ số · M2: cùng số chữ số · M3: với tổng các hàng | chữ | `so-sanh-hang`, `nham-bang` |
| D3 | Cây thần kì | SGK (bài 3) | MT1 | M1: hai cành · M2: ba cành · M3: bốn cành, số gần nhau | cây, cành (SVG, data-canh) | `so-sanh-hang` |
| D4 | Xếp thứ tự bốn huyện | SGK (bài 4) | MT2 | M1: ba huyện bé đến lớn · M2: bốn huyện bé đến lớn · M3: lớn đến bé | chữ, thẻ | `sai-thu-tu` |
| D5 | Sân vận động, công-tơ-mét | SGK (bài 5, 6) | MT2 | M1: lớn nhất · M2: bé nhất · M3: trên 40 000 người; lớn thứ hai | chữ | `so-sanh-hang` |
| D6 | Tìm chữ số ? | SGK (bài 7) | MT1 | M1: ? ở hàng nghìn · M2: ? ở hàng trăm, chục · M3: hai điều kiện | chữ | `so-sanh-hang` |
| D7 | Toa tàu hỏa | SGK (bài 9) | MT2 | M1: 50 000, 60 000, ? · M2: ô trống giữa · M3: toa cuối 100 000 | tàu (SVG, data-seq) | `dem-sai-buoc` |
| D8 | Nối biểu thức với số | SGK (bài 10) | MT1 | M1: tổng hai hàng · M2: bốn hàng · M3: năm hàng có hàng 0 | chữ | `bo-so-0`, `nham-hang` |
| D9 | Hình Venn: số ở giao hai hình | SGK (bài 12) | MT2 | M1: số chỉ trong hình tròn · M2: số ở giao · M3: số lớn nhất ở giao | Venn (SVG, data-v) | `so-sanh-hang` |
| D10 | Bạn An so sánh | **không có trong SGK** | MT3 | M1: An so sánh, em đồng ý không · M2: An sai ở đâu · M3: dấu đúng | `anh('boy')` | `so-phai-sang-trai` |

### Luật lời câu hỏi
- Câu «… có … không?» dùng Có / Không; mọi đẳng thức trong phương án đúng số học; đúng một đáp án.

## 3. Nhãn lỗi
`so-sanh-hang`, `sai-thu-tu`, `nham-bang`, `dem-sai-buoc`, `bo-so-0`, `nham-hang`, `so-phai-sang-trai` (tên gợi ý, đặt trong mã).

## Rủi ro chung
Font Linux khác máy thầy (thầy soát lại trên Vercel). số năm chữ số rộng hơn bốn chữ số: phải co vừa 375 px, không chữ nào dưới 14 px, không chữ đè nhau. Hình Venn: số nằm trọn trong vùng (chỉ trong, giao), không đè lên đường viền. Số có năm chữ số viết có khoảng trắng không ngắt ở hàng nghìn ("12 324"); ô nhập là số nguyên không dấu cách.

## Việc sẽ làm sau khi thầy duyệt
Viết `bai-60.js`, chép `bai-60.html`, sửa `index.html`; chạy đủ cổng; PR [XONG] Bài 60.

## Cần thầy quyết (kèm đề xuất)
1. Bảng dạng đúng chưa? Đề xuất: đúng như bảng.
2. Hình Venn (D9) tự vẽ hai vòng giao nhau, số đặt trong vùng đúng: đồng ý (**đề xuất**).
3. D10 ngoài SGK: giữ (**đề xuất**).
