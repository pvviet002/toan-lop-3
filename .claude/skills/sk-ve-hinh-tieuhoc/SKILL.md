---
name: sk-ve-hinh-tieuhoc
description: >
  Vẽ hoặc làm lại HÌNH MINH HOẠ cho web luyện Toán tiểu học (repo toan-lop-3, engine
  figures.js) theo một phong cách phẳng kiểu Fluent Emoji thống nhất (bảng màu HM, nhãn số
  trắng, không viền đen). Nhân vật và đồ vật trang trí lấy từ kho Microsoft Fluent Emoji
  (giấy phép MIT) lưu ở thư mục hinh/; vật học sinh phải ĐẾM thì tự vẽ SVG, gắn data-dem và
  KIỂM ĐẾM bằng máy (kiem_dem.mjs); dãy số và chuỗi phép tính là MỘT hình SVG co theo màn
  hình. Ba lớp kiểm: kiểm đếm → SOÁT HÌNH tự động (phong_tranh --soat: emoji, chữ nhỏ dưới 14px,
  chữ đè chữ, chữ tràn nhãn, chi tiết chạm nhau, rớt dòng, màu ngoài bảng — ở 375 + 1200 px,
  sáng + tối) → soi PHÒNG TRANH bằng mắt; rồi gửi thầy ảnh TRƯỚC / SAU (--so HEAD) để duyệt;
  dang_web chặn đưa lên khi hình có lỗi. Có danh mục mọi hình dùng chung (--danhmuc). Dùng skill
  này BẤT CỨ KHI NÀO thầy chê hình xấu, khó nhìn, không giống sách, muốn "vẽ lại hình bài N",
  "làm hình đẹp hơn", "thêm hình cho dạng …", "bỏ emoji, thay bằng hình", "soát hình bài N",
  hoặc khi sk-web-toan-tieuhoc dựng bài mới cần hình. KHÔNG dùng cho logic câu hỏi hay engine
  (sk-web-toan-tieuhoc), sơ đồ khối lập trình (sk-so-do-khoi), hình giáo án / editorial / đề
  (sk-ve-hinh-minh-hoa), hay hình trong đề LaTeX.
model: sonnet
effort: medium
---

# Vẽ hình minh hoạ cho web Toán tiểu học

Skill ra đời ngày 01/10/2026, khi thầy chê "hình vẽ xấu quá". Bốn lỗi gốc lúc đó:
- **Vẽ tọa độ "mù":** viết SVG mà không nhìn lại hình.
- **Không có quy chuẩn:** mỗi hình một kiểu viền, một bảng màu, một cỡ.
- **Dùng emoji hệ thống:** mỗi máy vẽ một kiểu.
- **Lỗi bố cục:** hình đè nhau, rớt dòng.

Từ 02/10/2026 skill có **ba lớp kiểm**, mỗi lớp bắt một loại lỗi mà lớp kia không thấy:

| Lớp | Công cụ | Bắt được |
| --- | --- | --- |
| 1. Đúng toán | `kiem_dem.mjs` | số chi tiết để đếm sai (5 chấm thay 6); chi tiết tròn chạm nhau |
| 2. Lỗi trình bày (máy) | `phong_tranh.mjs --soat` | emoji · chữ < 14px trên điện thoại · chữ đè chữ · chữ tràn nhãn trắng / tràn hình · chi tiết đếm hoặc hạt dãy số chạm nhau · rớt 1 hình lẻ · thẻ tràn ngang · ảnh hỏng · màu ngoài bảng `HM` |
| 3. Đẹp, giống sách, đúng tình huống (mắt) | `phong_tranh.mjs` chụp ảnh → đọc từng ảnh | những gì máy không chấm được: hình thô / khó nhận ra, giống vật thật, cân đối, hợp lời bài |

Hai lớp đầu đã thử cài lỗi cố ý và bắt đủ: bọ rùa thiếu chấm, quả cam chạm nhau, nhãn xe tải hẹp làm chữ tràn, hạt dãy số đè nhau. `dang_web.mjs` (skill sk-web-toan-tieuhoc) chạy lớp 1 + 2 trước khi commit; có lỗi thì **không đưa lên**.

Trạng thái: bài 9–12 đã chuẩn hoá. Bài 13, 14 chưa vẽ lại, có tên trong `assets/chua_chuan.txt` nên lỗi hình ở đó chỉ bị cảnh báo. **Vẽ xong bài nào thì xoá tên bài đó khỏi file.**

## Chọn đúng nguồn hình

| Loại hình | Nguồn | Ví dụ |
| --- | --- | --- |
| Vật học sinh phải **ĐẾM / ĐO** | **Tự vẽ** trong `figures.js` + `data-dem` + một dòng `DAC_TA` trong `kiem_dem.mjs` | `ladybug` 6 chấm, `hopBut(n)`, `conCua` 8 chân 2 càng |
| Nhân vật, đồ trang trí, gợi tình huống | **Ảnh Fluent** trong `hinh/`, gọi `anh()` / `anhSVG()` | `boy`, `girl`, `bouquet`, `butterfly` |
| Hình toán học (phân số, bảng, đồng hồ, dãy số, sơ đồ) | **Tự vẽ** SVG hoặc bảng HTML | `daySo`, `soDo`, `bangCot` |

**Cấm:**
- Emoji hệ thống: máy soát báo lỗi.
- Cắt tranh SGK: bản quyền NXB.
- Ảnh Fluent cho câu ĐẾM. Ví dụ bọ rùa Fluent có khoảng 7 chấm, sai với đề "6 chấm".

**Trước khi vẽ mới, xem danh mục** (`--danhmuc` hoặc `references/danh-muc-hinh.md`): rất có thể đã có hàm dùng lại được. Ví dụ `doiKeoCo(soDoi, moiDoi)` vẽ được mọi hàng người; `soDo` vẽ được mọi sơ đồ mũi tên.

## Quy trình

1. **Kê hiện trạng:**
   - chạy `--soat` cho bài (máy liệt kê emoji và lỗi bố cục);
   - chụp phòng tranh, đọc từng ảnh;
   - lập bảng hình kèm nguồn chọn (theo bảng trên).

   Muốn hình giống tranh sách thì xem trang SGK của bài: cách đọc PDF ở `sk-web-toan-tieuhoc/references/doc-sgk-va-hinh.md`.
2. **Cần ảnh Fluent mới:**
   - tìm tên đúng (`references/kho-hinh.md`);
   - **hỏi thầy cho tải**, nêu tên file, nguồn và dung lượng;
   - tải vào scratchpad bằng `lay_hinh.mjs`, soi bằng `--hinh`;
   - chỉ chép vào `hinh/` những hình dùng thật.
3. **Vẽ nháp ngoài repo.**
   - Viết hàm vào một file nháp trong scratchpad, ghép vào trang thử rồi xem bằng `--trang <tuyệt đối>`.
   - Phóng to 200–300 px để **đếm tay** chi tiết.
   - Đạt rồi mới chép vào `figures.js`. Làm vậy còn để không lẫn vào commit của bài đang chờ soát.
4. **Viết theo quy chuẩn** (`references/quy-chuan.md`):
   - bảng màu `HM`, `svgHinh`, nhãn `nhanTron` / `nhanVien`, `xepHang`;
   - chi tiết để đếm gắn `data-dem="<loại>"`, hạt dãy số gắn `data-tach`;
   - thêm dòng `DAC_TA` và dòng `DANH_MUC` cho hàm mới.
5. **Lớp 1:**
   - `node assets/kiem_dem.mjs <repo>` phải ĐẠT;
   - `kiemtra.js <repo> bai-N.js` (skill sk-web-toan-tieuhoc) cho **từng** bài dùng hàm đó. Không tham số thì kiemtra chỉ chạy bài 12.
6. **Lớp 2:** `--soat --khong-chup --rong 375,1200 --giao light,dark --lan 3` phải ĐẠT.
   - Cảnh báo cũng nên dọn: chữ 12–14px, màu ngoài bảng.
7. **Lớp 3:** chụp phòng tranh, sáng + tối, khổ 1200 và 375; đọc TỪNG ảnh theo `references/tieu-chi-soi.md` (phần «Mắt»).
8. **Gửi thầy duyệt** (SendUserFile):
   - ảnh **trước / sau** `--so HEAD` (cùng câu hỏi, cũ trái, mới phải);
   - kèm 1 ảnh giao diện Tối và 1 ảnh điện thoại.

   Đợt nhiều bài: **một bài mẫu** trước, duyệt phong cách xong mới làm bài khác.
9. **Đưa lên web** bằng `dang_web.mjs`:
   - bước 2b tự chạy lớp 1 + 2;
   - commit phải kèm `hinh/` (svg + LICENSE) nếu có ảnh mới;
   - **chỉ đưa lên khi thầy đã duyệt bài đó**.

## Công cụ (`assets/`)

| Lệnh | Việc |
| --- | --- |
| `node phong_tranh.mjs <repo> <ảnh> bai-9 [bai-10 …] --giao light,dark --rong 1200,375` | Phòng tranh: mọi dạng × 3 mức, đúng HTML học sinh thấy; chụp từng khúc 900 px. `--lan 3`: 3 mẫu mỗi mức. `--hat 7`: đổi hạt ngẫu nhiên (cùng hạt thì cùng câu hỏi). |
| … `--soat [--khong-chup]` | Soát hình tự động (lớp 2); có lỗi thì mã thoát 1. |
| … `--so HEAD` | Ảnh TRƯỚC / SAU: hai cột cũ \| mới, cùng câu hỏi. Dùng `--so <commit>` để so với một bản bất kỳ. |
| `node phong_tranh.mjs <repo> <ảnh> --danhmuc --giao light,dark` | Danh mục mọi hình dùng chung. Hàm vẽ nào chưa có mẫu thì báo ⚠. |
| `node phong_tranh.mjs <repo> <ảnh> --hinh hinh` | Bảng soi kho ảnh Fluent (96 + 48 px, nền sáng + tối). |
| `node phong_tranh.mjs <repo> <ảnh> --trang <file.html>` | Chụp trang thử; nạp được `/figures.js`, `/hinh/…`, `/engine.css`. |
| `node kiem_dem.mjs <repo>` | Kiểm đếm (lớp 1). Hàm có `data-dem` mà chưa có `DAC_TA` cũng bị báo. |
| `node lay_hinh.mjs <đích> "Butterfly" "Boy" …` | Tải ảnh Fluent bản Flat kèm LICENSE. **Chỉ chạy sau khi thầy cho phép.** |
| `chua_chuan.txt` | Bài chưa vẽ lại: lỗi hình ở đó chỉ cảnh báo trong dang_web. |

## Lỗi đã vấp (đừng lặp)

- **Hàng hình bằng `flex-wrap`** làm hình thoi đè nhau, ô cuối rớt dòng.
  → Một SVG duy nhất, bước cố định (`daySo`, `chuoiBuom`, `soDo`).
- **Chuỗi nhiều bước trên điện thoại** thì chữ co dưới 14px (chuỗi bướm 3 bước: 13,5px).
  → Ít bước thì phóng to; 3 bước thì rút mũi tên và nới chữ. Máy soát bắt được.
- **Phần đen (đầu, chân) chìm ở giao diện Tối.**
  → Lót quầng trắng mờ 50% bên dưới.
- **Chữ hoặc mũi tên tô cứng màu tối** thì mất ở giao diện Tối.
  → `fill="currentColor"` + `class="text-slate-700"` trên `<svg>`.
- **Hàng 5–6 hình rớt thành 5 + 1.**
  → `xepHang(ds, 4)`.
- **Emoji 🤔 trang trí** không giúp hiểu bài.
  → Thay bằng hình gợi đúng tình huống.
- **Nắp hộp vát hình thang** trông như mái nhà.
  → Nắp là dải chữ nhật phẳng.
- **Người đứng trên dây** trông như đứng trên giá.
  → Thêm hai bàn tay (`#FFC83D`) nằm trên dây.
- **Đầu xúc tu cong móc vào nhau** nên khó đếm.
  → Chi tiết để đếm kết thúc bằng đầu tròn, cách nhau ≥ 8 đơn vị.
- **Biểu thức dài trên nhãn cố định** thì chữ bị thu nhỏ.
  → Hình dài ra hoặc nhãn nới ra khi biểu thức quá 7 ký tự (`truck`, `melon`, `flower`).
- **Nét thẳng thiếu `fill="none"`** bị máy soát tính là mảng màu đen.
  → Luôn ghi `fill="none"` cho path chỉ có nét.
- **`elementsFromPoint` chỉ thấy phần đang trong màn hình** nên phép kiểm "chữ tràn nhãn" bỏ sót thẻ ở dưới trang.
  → Bộ soát cuộn từng thẻ vào giữa màn hình trước khi kiểm. Khi sửa bộ soát, **thử cài lỗi cố ý** để chắc nó còn bắt được.
- **Chèn mã JS bằng heredoc + Python** làm `\n` thành xuống dòng thật, `\\S` mất một dấu `\`.
  → Sửa file `.mjs`/`.js` bằng Edit, không bằng heredoc.
- **Hình học — điểm nhiễu đặt ngay trên điểm khác** (bài 16, 08/10/2026: K ngoài đường thẳng nằm trên M / che hẳn nhãn E).
  → Điểm ngoài đường cách mọi điểm trên đường ≥ 1,5 cm theo chiều ngang; hai điểm liền kề cách ≥ 2 cm (hoặc đủ để nhãn
  chữ không chạm); bộ sinh loại bộ số vi phạm. **Đám mây (font Linux hẹp hơn Segoe UI) bỏ sót lỗi chữ đè chữ mà Windows
  bắt được** — đừng thiết kế sát biên; hình học phải soát lại trên máy thầy.
- **Nhãn độ dài đặt lệch đoạn nó đo** (bài 17: "14 cm" của đường kính nằm trên nửa AO, nhìn như bán kính 14 cm — dạy sai).
  → Nhãn nằm giữa ĐÚNG đoạn được đo (đường kính: giữa cả đoạn, hoặc ngoặc dưới cả đoạn). Nhãn bán kính phải có ĐOẠN
  bán kính được vẽ (tâm → điểm trên đường tròn); không để nhãn cm lơ lửng, không lặp nhãn cho cùng một đoạn.
- **Con vật vẽ ra không đúng loài** (bài 16: "cào cào" vẽ thân tròn mắt to thành con ếch).
  → Giữ nét nhận diện của loài (cào cào: thân dài thon, chân sau dài gập chữ V ngược, râu); không nhận ra được thì dùng
  chấm tròn có chữ thay vì hình sai.
