# Quy chuẩn hình — phong cách phẳng kiểu Fluent Emoji

Mục tiêu: hình tự vẽ đứng cạnh ảnh Fluent mà **không lệch phong cách**. Mã mẫu nằm đầu `figures.js` (khối «QUY CHUẨN HÌNH»).

## 1. Nét vẽ

- **Mảng màu đặc, KHÔNG viền đen** quanh vật. Đường viền chỉ dùng cho ô "?" (viền hổ phách) và đường đo.
- Mỗi vật tối đa **hai sắc** của cùng một màu:
  - sắc chính;
  - một sắc đậm hơn làm mặt dưới hoặc dải đáy để tạo khối (vd thùng xe `vang` + dải `vangDam`).
- Bo tròn: khối lớn `rx` 6–9 (trên khung 64–100), đầu nét `stroke-linecap="round"`.
- Không đổ bóng mờ (`rgba` đen dưới chân), không gradient.

## 2. Bảng màu `HM` (lấy từ chính kho Fluent)

| Tên | Mã | Dùng cho |
| --- | --- | --- |
| `do` / `doDam` | `#F8312F` / `#CA0B4A` | bọ rùa, đèn xe, bút đỏ |
| `cam` / `camDam` | `#FF822D` / `#FF6723` | khung xe, bút |
| `vang` / `vangDam` | `#FCD53F` / `#FFB02E` | thùng xe, hạt dãy số đếm thêm, viền ô "?", đường đo |
| `troi` / `troiDam` | `#26C9FC` / `#00A6ED` | kính xe, hộp bút, hạt dãy số đếm bớt |
| `la`, `xanhLa` | `#86D72F`, `#00D26A` | lá, bút xanh |
| `hong`, `tim`, `timDam` | `#FF6DC6`, `#8D65C5`, `#321B41` | bút; `timDam` cho bánh xe |
| `den` | `#212121` | đầu, chân, chấm bọ rùa (kèm quầng trắng — mục 5) |
| `goNhat` / `go` / `goDam` | `#F3AD61` / `#D37034` / `#7D4533` | gỗ, đầu bút chì, vạch cưa |
| `xam` | `#E6E6E6` | cabin xe, ô bị che "…" |
| `day` | `#CBD5E1` | sợi dây nối hạt dãy số |

Thêm màu mới: lấy từ một ảnh Fluent đang dùng, đặt tên tiếng Việt, ghi vào bảng này.

## 3. Số trên hình

- **Nhãn trắng** chứa số:
  - `nhanTron(cx, cy, r, v, cỡ)` cho nhãn tròn (bướm, hoa);
  - `nhanVien(cx, cy, w, h, v, cỡ)` cho nhãn viên thuốc (xe tải, độ dài thanh gỗ).
- Chữ `#212121`, đậm 800, font hệ thống. Ô "?" thì chữ `#B45309`.
- Cỡ chữ **sau khi co trên điện thoại** phải ≥ 14 px. Cách tính: cỡ trong SVG × (bề rộng hiển thị ÷ bề rộng viewBox). Thẻ câu hỏi trên điện thoại rộng khoảng 340 px.
- Nhãn không được che chi tiết để đếm. Nhãn đặt vào khoảng trống tự nhiên: thùng xe, nhuỵ hoa, giữa hai cánh bướm.

## 4. Cỡ và bố cục

| Loại | Cỡ hiển thị |
| --- | --- |
| Vật đếm trong hàng (bọ rùa, hộp bút) | 52–60 px |
| Một hình minh hoạ đơn | 64–80 px |
| Hình chở phép tính (xe tải) | cao 70, rộng 144 (biểu thức ngắn) hoặc 180 (biểu thức dài) |
| Dãy số | bước 46, hạt 40, 8 hạt = 372 đơn vị |
| Chuỗi bướm → hoa | hình 56, mũi tên 50 |

- **Mọi SVG mở bằng `svgHinh(w, h, px)`.** Hàm này đặt `max-width:100%; height:auto` để hình tự co trong nút trắc nghiệm và trên điện thoại.
- **Một khối liên tục = MỘT SVG** (dãy số, chuỗi phép tính). Không dựng bằng nhiều thẻ HTML `flex-wrap`, vì sẽ rớt dòng và đè nhau.
- **Hàng nhiều vật:** dùng `xepHang(ds, 4)`, không để `flex-wrap` tự rớt. Kết quả: 5 ⇒ 3 + 2, 6 ⇒ 3 + 3.
- **Hình xếp dọc trong câu:** hình trước, chữ sau, cách `mb-2`.

## 5. Giao diện Tối

Nền thẻ ở giao diện Tối là `#1e293b`.

- **Phần đen hoặc tím than nằm ở rìa hình** (chân, râu, đầu): lót **quầng trắng mờ 50%**, to hơn 1–2 đơn vị, bên dưới. Nền trắng thì không thấy; nền tối thì có viền sáng (xem `ladybug`).
- **Chữ hoặc mũi tên nằm thẳng trên nền thẻ** (không có nhãn trắng lót):
  - dùng `fill="currentColor"` / `stroke="currentColor"`;
  - đặt `class="text-slate-700"` trên thẻ `<svg>`.

  engine.css sẽ đổi màu theo giao diện.
- Nhãn trắng và ô "?" trắng giữ nguyên ở mọi giao diện, vì chữ tối trên trắng luôn đọc được.

## 6. Đánh dấu cho máy kiểm

- **Chi tiết để ĐẾM:** gắn `data-dem="<loại>"` lên TỪNG chi tiết. Ví dụ:
  - `<circle data-dem="cham" …>` cho chấm bọ rùa;
  - `anhSVG(...).replace('<image', '<image data-dem="ban"')` cho người trong hàng.

  Loại đang dùng: `cham but vach ban xuctu chan cang ngay hop qua can`.
- **Mỗi hàm có `data-dem` phải có một dòng `DAC_TA` trong `kiem_dem.mjs`.** Dòng này ghi số mong đợi theo tham số; thiếu dòng thì kiem_dem báo lỗi.
- **Chi tiết tròn hoặc chữ nhật không được chạm nhau** (hạt dãy số…) thì gắn `data-tach="1"`. Máy soát kiểm chúng không đè nhau.
- **Hàm vẽ mới phải có một dòng `DANH_MUC`** trong `phong_tranh.mjs`, để nó hiện trong danh mục và được soát.
- **Path chỉ có nét** (dây, vạch, vân gỗ) phải ghi `fill="none"`. Thiếu thì máy soát tính thành mảng màu đen.

## 7. Mã

- **Nối chuỗi** `'…'+x+'…'`. KHÔNG backtick, KHÔNG `${`; kiemtra.js bắt lỗi này.
- **Hàm hình trả về CHUỖI, không chạm DOM.** Nhờ vậy kiemtra.js và phong_tranh.mjs chạy được trong Node.
- **Ảnh Fluent:**
  - `anh(ten, px, alt)` → `<img src="hinh/ten.svg">`, dùng thẳng trong câu hỏi;
  - `anhSVG(ten, x, y, s)` → `<image href="hinh/ten.svg">`, đặt bên trong một SVG ghép để gắn nhãn số.
