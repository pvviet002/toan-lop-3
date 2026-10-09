# Phân tích sư phạm — Bài 49: Luyện tập chung (Chủ đề 8) (BÀI MỚI — BẢN NHÁP CHỜ DUYỆT)

Mẫu: khối "LUYỆN THÔNG MINH" ở đầu `engine.js`; hình `clockSVG`, `daySo`, `svgHinh` trong `figures.js`; cách dựng mục tiêu x dạng như `bai-44.js`.
Phạm vi: tạo mới `bai-49.js`, `bai-49.html`, thêm 49 vào `AVAILABLE` (giữ CRLF, diff 1 dòng) và file này. Không đụng `engine.js`, `figures.js`, `lua.js`. Chưa viết dòng mã nào.
Tham số engine: `goal:10, soCau:18, soCauToiDa:24`. Quy tắc mã: nối chuỗi, không template literal, không emoji, không số thập phân hay số âm; mọi số trong phạm vi 10 000; `check()` tính lại từ chuỗi SVG (data-*).

## 0. Nguồn và điều cần lưu ý
Nội dung SGK Tập 2 (Kết nối tri thức) lấy từ **tóm tắt của phiên Claude trên máy thầy**; phiên đám mây chưa đối chiếu sách, không chép hình hay đoạn văn của sách.
- Sách tr.17-20, đã đính chính: nghe-viết (3 992; 10 000; 8 504; 7 006); tia số 3 496...3 504 và 9 992...9 999; 2 846 có chữ số hàng chục là 4, làm tròn hàng chục 2 850; bảng hàng (4 128, 5 062, 6 704, 7 053); lớn/bé nhất trong 3 768, 6 783, 3 687, 6 738; điểm 2 150, 1 650, 2 300, 1 850; sách I-VIII mất hai cuốn; bình vỡ XIV; ba con vật 6 125 kg (voi), 2 287 kg (tê giác), 1 687 kg (hươu); phân tích số; 5?01 > 5 799 (? = 8 hoặc 9, hai cách); trường 1 992 học sinh khoảng 2 000.
- Bỏ trò chơi «Về nhà đón Tết».

## 1. Ba mục tiêu x ba mức

| MT | Tên | Mức 1 | Mức 2 | Mức 3 |
|---|---|---|---|---|
| MT1 | Đọc, viết, bảng hàng, tia số | Nghe viết 3 992; bảng hàng 4 128. | Tia số 3 496 ... 3 504; số có hàng 0 (5 062). | Tia số qua 10 000; 10 000. |
| MT2 | So sánh và xếp thứ tự | Lớn nhất trong ba số. | Điểm trò chơi: ai cao nhất, ai trên 2 000. | Ba con vật theo manh mối; thẻ 5?01 > 5 799. |
| MT3 | Làm tròn và số La Mã | Làm tròn hàng chục (2 846). | Trường 1 992 khoảng 2 000; bình XIV. | Sách I-VIII mất hai cuốn; làm tròn qua nghìn. |

## 2. Mười dạng (topics)

| # | Dạng | Nguồn | MT | Mức 1 / Mức 2 / Mức 3 | Hình | Nhãn lỗi chính |
|---|---|---|---|---|---|---|
| D1 | Nghe viết số | SGK (bài 1) | MT1 | M1: 3 992 · M2: 8 504 · M3: 7 006, 10 000 | chữ | `bo-so-0` |
| D2 | Tia số | SGK (bài 2) | MT1 | M1: 3 496...3 504 · M2: 9 992...9 999 · M3: hai ô trống xa nhau | tia số (SVG) | `dem-sai-buoc` |
| D3 | Bảng hàng, chữ số hàng chục | SGK (bài 3) | MT1 | M1: chữ số hàng chục · M2: bảng hàng 5 062 · M3: kèm làm tròn | bảng hàng (SVG) | `nham-hang` |
| D4 | Phân tích số | SGK (bài 4) | MT1 | M1: 6 409 = 6 000 + ? + 9 · M2: 6 411 = ? + 400 + ? + 1 · M3: hai hàng 0 | chữ | `nham-hang` |
| D5 | Số lớn nhất, bé nhất | SGK (bài 5) | MT2 | M1: ba số · M2: 3 768, 6 783, 3 687, 6 738 · M3: lớn thứ hai | chữ | `so-sanh-hang` |
| D6 | Điểm trò chơi | SGK (bài 6) | MT2 | M1: ai cao nhất · M2: ai trên 2 000 · M3: đếm ai dưới 2 000 | `anh` | `so-sanh-hang` |
| D7 | Ba con vật | SGK (bài 7, đính chính) | MT2 | M1: voi nặng nhất · M2: hươu nhẹ hơn tê giác · M3: gán đủ ba con | `anh`, chữ | `doc-de-sai` |
| D8 | Thẻ chữ số ? | SGK (bài 8) | MT2 | M1: 5?01 > 5 799 · M2: hỏi chữ số · M3: hỏi có bao nhiêu cách (2) | thẻ | `so-sanh-hang` |
| D9 | Làm tròn và khoảng | SGK (bài 9) | MT3 | M1: 2 846 hàng chục · M2: trường 1 992 · M3: bốn đáp án | chữ | `lam-tron-nham-5` |
| D10 | Số La Mã trong bài | SGK (bài 10) | MT3 | M1: bình XIV, thiếu XIII · M2: sách I-VIII mất hai cuốn · M3: xếp XIII, XVII, XII, XVIII | chữ, thẻ | `nham-IV-VI` |

### Luật lời câu hỏi
- Câu «… có … không?» dùng Có / Không; mọi đẳng thức trong phương án đúng số học; đúng một đáp án.

## 3. Nhãn lỗi
Chép từ bài 45-48: `bo-so-0`, `dem-sai-buoc`, `nham-hang`, `so-sanh-hang`, `lam-tron-nham-5`, `nham-IV-VI`; thêm `doc-de-sai`.

## Rủi ro chung
Font Linux khác máy thầy (thầy soát lại trên Vercel). Số có bốn chữ số viết có dấu cách ngăn nhóm nghìn ("3 421"), phải dùng khoảng trắng không ngắt để không tách dòng ở 375 px.

## Việc sẽ làm sau khi thầy duyệt
Viết `bai-49.js` (chép hàm cần dùng từ bài 45-48), chép `bai-49.html`, sửa `index.html`; chạy đủ cổng; PR [XONG] Bài 49.

## Cần thầy quyết (kèm đề xuất)
1. Bài 49 dùng lại dạng bài 45-48 (ôn tập): đồng ý (**đề xuất**).
2. Làm bài 49 sau cùng vì chép hàm từ bốn bài trước.
