# Phân tích sư phạm — Bài 34: Thực hành và trải nghiệm (BÀI MỚI)

Mẫu: `bai-33.js`, `bai-31.js`, `bai-30.js` (hình thước, nhiệt kế; nhãn lỗi riêng; `check()` đọc lại số từ SVG) + khối "LUYỆN THÔNG MINH" ở đầu `engine.js`.
Phạm vi: tạo mới `bai-34.js`, `bai-34.html`, thêm 34 vào `AVAILABLE` trong `index.html` (giữ CRLF, diff đúng 1 dòng) và file này. Không đụng `engine.js`, `figures.js`, `lua.js`.
Thầy Việt đã cho phép làm liền, không chờ duyệt từng bước. Phân tích và mã trong cùng một PR.

Bài 34 là bài thứ năm của **Chủ đề 5**: chỉ có phần "Hoạt động", không có Khám phá hay Luyện tập. Dùng **4 mục tiêu** × 8 dạng.

## 0. Nguồn và điều cần lưu ý

Nội dung SGK (trang in 94–95) lấy từ **bản tóm tắt của phiên Claude trên máy thầy** (đã đối chiếu từng số); phiên đám mây chưa tự đối chiếu sách. Không chép nguyên văn đề vào repo.

- **Trang 1.** HĐ1: đo độ dài đồ vật theo mi-li-mét: đồng xu 1 000 đồng đặt trên thước (0–4 cm), hai đường dóng từ hai mép: 19 mm. Kẹp giấy, cục tẩy cần đo ngoài thực tế: trên web chỉ dùng vật trên thước vẽ sẵn.
  HĐ2: chọn số đo phù hợp: cục tẩy 20 g (nhiễu 20 kg); hộp sữa 400 g (nhiễu 40 g); quả bí đao 3 kg (nhiễu 3 g).
  HĐ3: chọn quả cân 100 g, 100 g, 200 g, 200 g, 500 g để cân đúng 1 kg gạo: 500 + 200 + 200 + 100 = 1 000 g.
  HĐ4: đo nhiệt độ không khí thứ Hai, thứ Ba, thứ Tư ghi vào bảng: thực hành ngoài lớp; trên web đổi thành đọc bảng cho trước.
- **Trang 2.** HĐ1: chọn nhiệt kế A, B, C hợp với mỗi bức tranh (A khoảng 5 °C, B khoảng 25 °C, C khoảng 38 °C): đọc sách trong phòng mát (B), ngồi quạt vì nóng (C), mặc ấm sưởi lửa vì rét (A).
  HĐ2: chọn số cân thích hợp: quả trứng 100 g; quả tạ đòn 100 kg; túi cà chua 1 kg.
  HĐ3: bốn ca nước A 300 ml, B 150 ml, C 200 ml, D 250 ml: ca ít nước nhất (B); hai ca khác nhau được 350 ml (B và C); được 550 ml (A và D).
- **Không bắt đo vật thật**; chỉ câu hỏi chọn, đọc, tính. Không số âm, không số thập phân.
- **Lỗi hay gặp:** cùng số khác đơn vị (20 g khác 20 kg); đọc sai vạch (quên trừ vạch trái); thêm sai quả cân; nhầm cao hơn với thấp hơn.
- **Nhãn riêng:** `nham-don-vi`, `nham-boi`, `doc-sai-vach`, `nham-cao-thap`, `dem-sot-phep`; chuẩn: `nham-bang`, `chon-sai-phep`, `thieu-buoc`, `dao-vai`.

## 1. Bốn mục tiêu (muctieu) × ba mức

| MT | Tên | Mức 1 | Mức 2 | Mức 3 |
|---|---|---|---|---|
| MT1 | Đo độ dài và chọn số đo | Đồng xu từ vạch 0; cục tẩy, hộp sữa. | Đồng xu không từ vạch 0; quả bí đao, túi cà chua. | Kẹp giấy, cục tẩy trên thước; quả tạ đòn. |
| MT2 | Cân và đong | Cân đúng 1 kg; ca ít nước nhất. | Cân 700, 800, 900 g; hai ca được 350 ml. | Ít nhất mấy quả cân; hai ca được 550 ml. |
| MT3 | Nhiệt độ | Ngày nóng nhất; nhiệt kế hợp tranh. | Cao nhất hơn thấp nhất; nhiệt kế chỉ mấy độ. | Hai ngày hơn kém; nóng hơn rét bao nhiêu độ. |
| MT4 | Chọn đơn vị và vận dụng | Chọn một đơn vị; Đúng / Sai số đo. | Hai đơn vị; bạn nói sai đơn vị. | Bốn đơn vị; bạn nói hai ca nước. |

Tham số engine: `goal:10, soCau:18, soCauToiDa:24`. 4 mục tiêu × tối thiểu 3 câu = 12 ≤ 18.

## 2. Tám dạng (topics)

| # | Dạng | Nguồn | MT | Hình | Nhãn lỗi chính |
|---|---|---|---|---|---|
| D1 | Đồng xu trên thước | SGK (Trang 1, HĐ1) | MT1 | **hình mới** `thuocVat` (vật, hai đường dóng, thước 0–4 cm) | `doc-sai-vach`, `nham-boi` |
| D2 | Chọn số đo phù hợp | SGK (Trang 1 HĐ2; Trang 2 HĐ2) | MT1 | chữ | `nham-don-vi`, `nham-boi` |
| D3 | Chọn quả cân | SGK (Trang 1, HĐ3) | MT2 | chữ (các quả cân là thẻ) | `nham-bang`, `dem-sot-phep` |
| D4 | Bốn ca nước | SGK (Trang 2, HĐ3) | MT2 | chữ (thẻ) | `nham-cao-thap`, `nham-bang` |
| D5 | Bảng nhiệt độ các ngày | SGK (Trang 1, HĐ4) | MT3 | bảng chữ | `nham-cao-thap`, `chon-sai-phep` |
| D6 | Chọn nhiệt kế | SGK (Trang 2, HĐ1) | MT3 | `nhietKe` (chép từ bài 33) | `nham-cao-thap`, `doc-sai-vach` |
| D7 | Chọn đơn vị | không có trong SGK | MT4 | chữ | `nham-don-vi` |
| D8 | Bạn nói đúng hay sai | không có trong SGK | MT4 | `anh('boy')` | `nham-don-vi`, `chon-sai-phep` |

Luật: Đ/S chỉ cho mệnh đề; "Bạn An nói…" dùng "Em thấy thế nào?"; mọi phép tính trong phương án đúng số học; đáp án nhiễu về đơn vị khác ≥ 100 lần hoặc bội 1 000; nhãn trắng chứa số cỡ 18 cao ≥ 30; nhãn ở rìa chừa lề ≥ 1,3 lần cỡ chữ.

## 3. Rủi ro

1. **Đồng xu to:** đường kính 19 mm trên thước 0–4 cm rộng 138 đơn vị khung; hình cao hơn các hình khác; vẫn nằm trong một SVG.
2. **Quả cân (D3):** mọi cách chọn lấy từ tập thật 100, 100, 200, 200, 500; `check()` liệt kê và tính tổng từng cách, đúng một cách đúng.
3. **Ca nước (D4):** hai ca khác nhau có tổng duy nhất (không trùng cặp khác); `check()` kiểm.
4. `index.html` dùng CRLF: sửa bằng Python đọc/ghi nhị phân, diff đúng 1 dòng.
