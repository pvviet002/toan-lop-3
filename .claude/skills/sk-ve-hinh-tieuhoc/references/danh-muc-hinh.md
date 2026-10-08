# Danh mục hình dùng chung (`figures.js`)

Xem bằng ảnh: `node assets/phong_tranh.mjs <repo> <ảnh> --danhmuc --giao light,dark`.
Thêm hàm mới thì thêm một dòng vào bảng này, một dòng `DANH_MUC` trong `phong_tranh.mjs`, và (nếu có chi tiết để đếm) một dòng `DAC_TA` trong `kiem_dem.mjs`.

## Hàm nền (không vẽ, dùng để dựng hình)

| Hàm | Việc |
| --- | --- |
| `HM` | bảng màu (xem `quy-chuan.md`) |
| `svgHinh(w, h, px)` | mở thẻ `<svg>` tự co (`max-width:100%`) |
| `chuSo(cx, cy, v, co)` | chữ số căn giữa; `'?'` thì tô hổ phách |
| `nhanTron(cx, cy, r, v, co)` / `nhanVien(cx, cy, w, h, v, co)` | nhãn trắng tròn / viên thuốc chứa số |
| `anh(ten, px, alt)` / `anhSVG(ten, x, y, s)` | ảnh kho `hinh/` (thẻ `<img>` / `<image>` trong SVG ghép) |
| `xepHang(ds, toiDa)` | xếp các hình thành hàng cân đối (6 → 3 + 3) |

## Hình

| Hàm | Vẽ gì | Đếm (`data-dem`) | Bài dùng |
| --- | --- | --- | --- |
| `ladybug(px)` | bọ rùa | `cham` = 6 | 9 |
| `truck(expr)` | xe tải chở phép tính; biểu thức dài thì thùng dài ra | — | 9 |
| `clockSVG(h, m)` | đồng hồ kim (**chưa chuẩn hoá**: còn viền) | — | — |
| `daySo(seq, hi, an, hinh, nen)` | dãy số một SVG: `'tron'` / `'vuong'` / `'thoi'`; `hi` ô "?", `an` ô che "…" | hạt có `data-tach` | qua `bnDaySo`: 9–12 |
| `hopBut(n, px)` | hộp n bút chì màu; trên 6 bút thì rộng ra | `but` = n | 9, 11 |
| `chuoiBuom(dau, buoc, giaTri)` | bướm mang số → phép tính → bông hoa …; ít bước thì to hơn | — | 9 |
| `thanhGo(n, dai)` | thanh gỗ dài `dai` cm, cưa n đoạn, có đường đo | `vach` = n − 1 | 9 |
| `doiKeoCo(soDoi, moiDoi=7)` | mỗi đội một hàng bạn nhỏ nắm dây | `ban` = soDoi × moiDoi | 10 |
| `soDo(nut, phep)` | sơ đồ mũi tên; nút `{v, h:'tron'/'vuong'}`, `v:null` = "?", `v:''` = ô trống | — | 10, 11, 12 |
| `bachTuoc(px)` | bạch tuộc | `xuctu` = 8 | 11 |
| `conCua(px)` | con cua | `chan` = 8, `cang` = 2 | 11 |
| `bong(expr)` | quả bóng 6 múi chở phép tính | — | 10 |
| `tuanLe(soTuan)` | mỗi tuần một dải 7 ô T2 … CN | `ngay` = 7 × soTuan | 10 |
| `hopCoc(soHop)` | hàng hộp đựng cốc (in hình cốc trên mặt hộp) | `hop` = soHop | 10 |
| `bangCot(nhan, cot, o)` | bảng HTML nhiều cột kiểu SGK, ô `o` là "?" (**chưa chuẩn hoá**: màu Tailwind) | — | 9 |
| `doiMuaRong(soDoi, moiDoi=9)` | con rồng, các bạn cầm gậy đỡ thân rồng | `ban` = soDoi × moiDoi | 12 |
| `melon(expr)` | dưa hấu chở phép tính; biểu thức dài thì quả dài ra | — | 12 |
| `flower(expr)` | hoa hướng dương chở phép tính; nhãn nới khi biểu thức dài | — | 12 |
| `thuyen(px)` | thuyền buồm (gợi tình huống) | — | 12 |
| `tuiCam(px, soQua=9)` | túi lưới đựng cam, 3 quả một hàng | `qua` = soQua | 12 |
| `hangCan(soCan)` | hàng can nhựa | `can` = soCan | 12 |

## Còn phải chuẩn hoá

- `clockSVG`: viền cam, kim màu Tailwind → làm lại khi tới bài xem đồng hồ.
- `bangCot` / `bnBang`: bảng HTML màu Tailwind → được (bảng đọc rõ), nhưng nên đồng màu `HM` khi rảnh.
- Hình riêng trong `bai-13.js` (`jug`, `tri`, `oVuong`, `arrowFind`…) và `bai-14.js` (`tronPS`, `hcnPS`, `banh`, `vat`, `khoanh`…). Hai bài này có tên trong `chua_chuan.txt`.
