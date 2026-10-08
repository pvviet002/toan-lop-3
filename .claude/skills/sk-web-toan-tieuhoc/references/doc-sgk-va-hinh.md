# Đọc SGK & vẽ lại hình

## Đọc đúng trang SGK

- SGK bản scan (PDF ảnh, KHÔNG có lớp text). Với bộ Toán Kết nối tri thức lớp 3
  Tập 1: file `E:/Dat_Thoi/Lop3/toan-3-tap-1-ket-noi-tri-thuc-voi-cuoc-song_27620232187.pdf`
  (126 trang). Các lớp/tập khác: hỏi thầy đường dẫn.
- **Lệch trang:** với PDF này, **trang PDF = số trang in + 1** (bìa/đầu sách chiếm
  1 trang). Kiểm nhanh bằng cách render một trang rồi nhìn số in ở góc dưới.
- Công cụ đọc: PyMuPDF (`fitz`) render trang ra PNG rồi đọc bằng công cụ Read.
  KHÔNG dùng `Read` trực tiếp lên PDF (máy này thiếu poppler → lỗi).

```python
import fitz
doc = fitz.open(PDF_PATH)
z = 150/72.0; m = fitz.Matrix(z, z)          # ~150 DPI đủ nét chữ Việt
for p in [22, 23, 24]:                         # trang PDF (1-based)
    doc[p-1].get_pixmap(matrix=m).save(f"pg_{p:03d}.png")
```

- Đọc các PNG, ghi lại **cấu trúc mục** của bài (Khám phá / Hoạt động 1, 2… /
  Luyện tập) và **từng dạng bài + phép tính cụ thể** sách cho. Đây là nguồn chân
  lý cho mảng TOPICS — bám đúng, đừng tự chế cấu trúc.

## Vẽ lại hình (KHÔNG copy tranh scan)

Tranh trong SGK là bản quyền NXB Giáo dục. Không cắt/nhúng ảnh scan lên web công
khai, kể cả cắt ra rồi đổi số. Thay vào đó **vẽ lại bằng SVG gốc** — vật thể
thông thường (con vật, đồ vật), giống bố cục sách nhưng là hình của mình, và
**truyền số vào để đổi được** (randomize).

Mỗi hình là một hàm trả chuỗi SVG (viết bằng nối chuỗi, không backtick/`${`).
`figures.js` (dùng chung) đã có sẵn:
- `ladybug()` — con bọ rùa 6 chấm (bài bảng nhân/chia 6).
- `truck(expr)`, `melon(expr)`, `flower(expr)` — hình chở phép tính (dạng "cùng kết quả",
  "chọn theo điều kiện"); bài 10 có `ball(expr)` riêng.
- `clockSVG(h, m)` — đồng hồ kim · `dragon()` · `arrow2(a, op1, op2)` — sơ đồ hai bước.

**Mẫu hình chở phép tính (bắt buộc theo khuôn này):** SVG thuần, phép tính là `<text>` trên
nhãn trắng bo tròn, chữ đậm tối, SVG tự co:
```js
function vatChoPhepTinh(expr){
  return '<svg width="132" height="70" viewBox="0 0 132 70" style="max-width:100%;height:auto;display:block">'
   +'...hình vật...'
   +'<rect x="21" y="24" width="86" height="28" rx="14" fill="#ffffff" stroke="#16a34a" stroke-width="1.5"/>'
   +'<text x="64" y="44" text-anchor="middle" font-size="18" font-weight="800" fill="#14532d" font-family="system-ui,Segoe UI,Roboto,sans-serif">'+expr+'</text>'
   +'</svg>';
}
```
Không đặt `<div>` chữ tuyệt đối đè lên SVG, không cố định bề rộng không co được.

Vẽ thêm theo bài, ví dụ ý tưởng:
- **Đường gấp khúc:** `polyline` qua các điểm A,B,C,D + nhãn số đo mỗi đoạn.
- **Cân đĩa / khối lượng:** hai đĩa + số kg; hoặc thẻ đồ vật kèm "… kg".
- **Dung tích:** can/chai + "… l".
- **Khối:** dùng emoji vật thật (📦 hộp chữ nhật, 🥫 trụ, 🎲/🧊 lập phương, ⚽ cầu).
- **Dãy số (đếm thêm/bớt):** vòng tròn (thêm) và hình thoi (bớt) — ô ẩn để "?".
- **Nhóm đồ vật (nhân/chia):** lặp emoji theo hàng (g hàng × k vật).
- **Bảng cấu tạo số:** bảng Trăm | Chục | Đơn vị.
- **Đặt tính dọc:** hai số căn phải, gạch ngang, font monospace.

Giữ hình **generic**: đừng vẽ lại nhân vật riêng/đặc trưng của bộ sách; vẽ con
vật/đồ vật thông thường là đủ giống mà không đụng bản quyền hình.

## Bám mạch SGK — các mục thường gặp

- **Khám phá:** hình thành phép tính từ tình huống (vd cộng lặp → phép nhân);
  hoàn thành bảng nhân/chia.
- **Hoạt động 1 — Tính nhẩm:** một loạt phép cụ thể (nhớ giữ dạng "tính nhẩm",
  đây là mục dễ bị bỏ sót nhất).
- **Hoạt động 2:** so khớp/nối (vd hai phép tính cùng kết quả), chọn đáp đúng.
- **Luyện tập:** nêu số còn thiếu (dãy), đặt tính, tìm thành phần, giải toán có
  lời văn, đố vui.

Mỗi mục → một tab, `sec` ghi đúng tên mục (vd "Hoạt động 1 — Tính nhẩm").
