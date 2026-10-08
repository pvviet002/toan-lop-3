---
name: sk-web-toan-tieuhoc
description: >-
  Dựng một BÀI LUYỆN TOÁN TIỂU HỌC thành trang web tương tác trên site dùng engine chung (engine.js /
  engine.css / figures.js; mỗi bài là bai-<N>.js + bai-<N>.html): phân tích sư phạm theo mục tiêu →
  kho câu nhiều dạng × 3 mức Thông tư 27 → engine tự chọn câu, gợi ý theo kiểu lỗi; tab theo mục SGK,
  nội dung bám sát sách, hình vẽ lại bằng SVG. Kiểm bằng máy (kiemtra.js, soat_giao_dien.mjs) rồi đưa
  lên web bằng git (dang_web.mjs) — repo mặc định pvviet002/toan-lop-3. Dùng khi thầy muốn "làm bài số
  N" cho web Toán, "dựng bài luyện toán lớp 1–5", "thêm bài vào toan-lop-3", "sửa bài N cho giống
  sách", "chuyển bài N sang engine", sửa giao diện / engine chung, hoặc "làm bài tiếp theo như lần
  trước". KHÔNG dùng cho ra đề lập trình (sk-tao-de-cvpoi), chuyên đề cvpoi (sk-chuyen-de-web), đề
  Word (sk-soan-de-word), mô phỏng thuật toán (sk-mo-phong-don).
model: opus
effort: medium
---

# Dựng bài luyện Toán tiểu học thành web tương tác

Mục tiêu: mỗi bài học trong SGK Toán tiểu học → một trang luyện tập tự chấm. Site
hiện tại: repo GitHub `pvviet002/toan-lop-3`, deploy Vercel `toan-lop-3.vercel.app`,
mục lục ở `index.html`. **Bản sao git làm việc: `E:/Dat_Thoi/Lop3/web-toan3`** (khớp
`origin/main`; `gh` đã đăng nhập tài khoản pvviet002 nên `git push` chạy thẳng).
Bài đặt tên `bai-<N>` (N = số bài trong SGK). **Bài mẫu chuẩn (có 3 mức): `bai-14.js`
(bài khái niệm, hình tự vẽ) và `bai-12.js` (bài bảng nhân/chia, dùng bộ sinh câu chung).**

Ba nguyên tắc cốt lõi (thầy đã chốt, đừng bỏ):

1. **BÁM SÁT SGK.** Đi đúng mạch các mục của bài trong sách (Khám phá → Hoạt
   động 1, 2… → Luyện tập), giữ đúng tên hoạt động và đúng các dạng bài/phép
   tính sách cho. Đừng tự nghĩ ra cấu trúc riêng. Đã vấp: bỏ sót "Hoạt động 1:
   Tính nhẩm" khiến thầy nói "chưa bám sách".
2. **CÓ HÌNH GIỐNG SÁCH — nhưng VẼ LẠI.** Tái hiện bố cục/nhân vật của sách bằng
   **SVG/emoji gốc**. **Tuyệt đối không cắt/nhúng tranh scan của SGK** — tranh là
   bản quyền NXB Giáo dục, và số in trên ảnh cố định nên không luyện lại được.
   (Nếu thầy yêu cầu cắt ảnh thật, giải thích ranh giới bản quyền, giữ hướng vẽ lại.)
3. **RANDOMIZE + TỰ CHẤM.** Mỗi dạng là một hàm sinh câu hỏi ngẫu nhiên trong dải
   hợp lý, làm lại được nhiều lần; đúng thì +10 ⭐ và tăng streak 🔥.

## Quy trình

Ba điểm dừng hỏi thầy: (a) bài **đã tồn tại** trên repo → xem nó là gì, báo và hỏi
có ghi đè không; (b) cách xử lý hình nếu thầy chưa nói (mặc định: vẽ lại);
(c) **duyệt bảng phân tích sư phạm** (bước 2) — quyết định sư phạm là của thầy. Ngoài ra
làm liền mạch.

0. **Đồng bộ repo:** `git -C E:/Dat_Thoi/Lop3/web-toan3 pull --ff-only` (thầy có thể
   đã sửa trên GitHub). Thư mục chưa phải bản sao git → làm theo
   `references/quy-trinh-commit.md` § "Dựng bản sao git".
1. **Xác định bài + đọc SGK.** Lấy đúng trang sách, liệt kê các mục và từng dạng bài
   → `references/doc-sgk-va-hinh.md`.
2. **Phân tích sư phạm — DỪNG cho thầy duyệt** (chốt 30/09/2026, mẫu:
   `E:/Dat_Thoi/Lop3/phan-tich-su-pham/bai-09.md`). Lưu `phan-tich-su-pham/bai-NN.md` (NGOÀI repo):
   - **Mục tiêu cần đạt** (4–6 MT) theo Yêu cầu cần đạt CT GDPT 2018 (diễn đạt lại) + SGK.
   - **Dạng câu** (10–15): đủ MỌI mục/bài tập của SGK (soát sót — bài 9 cũ từng thiếu LT2–LT5) +
     vài dạng thêm làm lộ cách hiểu (Đúng/Sai tìm lỗi, Chọn phép tính…), đánh dấu rõ "không có trong SGK".
     Mỗi dạng gắn mục tiêu và tả **Mức 1 / 2 / 3**.
   - **Lỗi sai thường gặp** → nhãn gắn vào đáp án nhiễu + câu gợi ý.
   - Hình vẽ lại cần có. Trình bảng gọn, hỏi thầy duyệt; chỉ viết mã sau khi duyệt.
3. **Dựng file.** Chỉ viết **`bai-<N>.js`** (biến `BAI` + `muctieu` + mảng `topics`), chép
   `assets/bai-template.html` thành **`bai-<N>.html`**. Khung, chấm điểm, game layer,
   giao diện nằm ở file DÙNG CHUNG — không đụng tới trừ khi nâng cấp engine.
4. **Kiểm bằng máy — hai cổng, cả hai phải đạt:**
   - `node assets/kiemtra.js <repo> bai-<N>.js 400000` → phải in `✅ OK`.
   - `node assets/soat_giao_dien.mjs <repo> bai-<N>` → phải `KẾT QUẢ: ĐẠT`.
   Rồi nhìn tận mắt 1–2 màn mới (server tĩnh + trình duyệt tích hợp, khổ điện thoại).
5. **Mở khoá mục lục** (nếu N chưa có trong `AVAILABLE` của `index.html`) — sửa đúng
   dòng đó bằng Edit trên bản cục bộ.
6. **Đưa lên web:** viết thông điệp commit ra file tạm (kết thúc bằng dòng
   Co-Authored-By theo hướng dẫn hiện hành) rồi
   `node assets/dang_web.mjs E:/Dat_Thoi/Lop3/web-toan3 <msg.txt>`. Công cụ tự chạy lại các
   cổng kiểm, commit, push, rồi chờ Vercel khớp mã băm. In "ĐÃ LÊN WEB" mới là xong.
   Từ 02/10/2026 có thêm **bước 2b "Soát hình"** (skill `sk-ve-hinh-tieuhoc`):
   - kiểm đếm chi tiết `data-dem`;
   - soát emoji, chữ nhỏ, chữ đè / tràn, chi tiết chạm nhau, rớt dòng.

   Có lỗi thì không commit. Bài ghi trong `sk-ve-hinh-tieuhoc/assets/chua_chuan.txt` chỉ bị cảnh báo.

## Dùng engine v2 (nhiều file dùng chung)

Repo có các file DÙNG CHUNG (sửa một lần, mọi bài hưởng):
- `engine.js` — dựng TOÀN BỘ giao diện từ biến `BAI` + chấm điểm + **game layer**
  (mục tiêu buổi + thanh tiến trình + màn kết thúc chấm sao + mốc streak + âm thanh
  Web Audio + lưu tiến trình `localStorage`) + **nút giao diện** ☀️/🌙/📖 (Sáng/Tối/Dịu
  mắt, đặt `data-theme` trên `<html>`) + **nút Hiển thị** (giao diện, cỡ chữ, loại
  thiết bị; lưu `toanlop3-cfg`) + **nút Vừa màn hình** (co bằng CSS `zoom`, chạy cả
  iPhone — KHÔNG dựa vào Fullscreen API) + tự nạp `counter.js` (bộ đếm lượt truy cập).
  Khung KHÔNG đổi kích thước khi làm bài (khoá chiều cao thẻ).
- `engine.css` — hiệu ứng + **màu từng giao diện** (override lớp Tailwind theo
  `html[data-theme=…]`) + luật tương phản trong thẻ câu hỏi.
- `figures.js` — `rnd/pick/shuffle` + hình SVG dùng chung (`ladybug, truck, daySo,
  chuoiBuom, hopBut, thanhGo, clockSVG`…) + khối **QUY CHUẨN HÌNH** (bảng màu `HM`, nhãn
  số `nhanTron/nhanVien`, `svgHinh`, `xepHang`, ảnh kho `anh/anhSVG`). Thêm hình mới vào đây.
- `hinh/` — ảnh Microsoft Fluent Emoji bản phẳng (MIT, kèm `LICENSE-fluentui-emoji.txt`).
- **MỌI việc vẽ / sửa hình → gọi skill `sk-ve-hinh-tieuhoc`** (quy chuẩn, kho hình, phòng tranh soi bằng mắt).

`bai-<N>.js` khai báo:

```js
var BAI = { n:<N>, title:'Tên bài', sub:'...', goal:10, topics:[
  { name:'Tên tab', sec:'Nhãn mục SGK',
    make:function(){
      // num: { type:'num', q:'<html>', ans:<số>, unit:'<đvị?>', _x:... }
      // mcq: { type:'mcq', q:'<html>', choices:[...], correct:<index>, figFn:melon, _x:... }
    },
    check:function(q){ return <bất biến đúng>; }   // nên có cho mcq và bài chia hết
  }
]};
```

- `goal` = số câu đúng để hoàn thành một hoạt động (mặc định 10).
- `check(q)` khẳng định đáp án/độ hợp lệ của câu vừa sinh; `kiemtra.js` chạy hàng
  trăm nghìn lượt.
- **Quy tắc code:** nối chuỗi `'...'+x+'...'`, KHÔNG backtick và KHÔNG `${` (kể cả trong
  comment). Deploy chính giờ là git nên luật này chỉ còn để giữ được đường dự phòng
  qua trình duyệt — `kiemtra.js` vẫn soát, cứ giữ. Dùng `×` cho nhân, `:` cho chia.

## Luyện thông minh theo mục tiêu + ngọn lửa (chuẩn cho bài MỚI từ 30/09/2026; mẫu `bai-9.js`)

Bài khai báo `muctieu` thì mở vào **Luyện thông minh** (engine tự chọn câu), phụ là **Chọn dạng** (tab):

```js
var BAI = { n:9, title:'…', sub:'…', goal:10, soCau:18, soCauToiDa:24,
  muctieu:[ {id:'MT1', ten:'Ý nghĩa phép nhân', muc:['Mức 1 là…','Mức 2 là…','Mức 3 là…']}, … ],
  topics:[ { name:'Bọ rùa', sec:'Khám phá — …', mt:['MT1'], levels:3, muc:[3 câu],
             make:function(lv, mt){ … return {type, q, ans|choices+correct, sai:{…}, goiY:{…}, mt?:'MT2'} },
             check:function(q){ … } }, … ] };
```
- `sai`: num → `{'42':'canh-dong'}` (khoá = đáp số sai); mcq → `{'1':'chon-sai-phep'}` (khoá = chỉ số
  lựa chọn). `goiY`: `{nhãn: câu gợi ý riêng cho câu này, chung: …}`. Nhãn chuẩn trong engine:
  `canh-dong, nham-bang, cong-thay-nhan, sai-buoc, chon-sai-phep, lech-nhom, dao-vai, thieu-buoc`
  (thêm nhãn riêng bằng `BAI.loi`). Dùng `nhanSai([[giá trị, nhãn]…], đáp án đúng)` để tự loại nhãn trùng
  đáp án đúng — `kiemtra.js` CHẶN nhãn gắn vào đáp án đúng.
- Dạng phục vụ nhiều mục tiêu (`mt:['MT2','MT3']`) nhận `mt` qua `make(lv, mt)` và đặt `q.mt`.
- **Luật chọn câu** (soat_giao_dien kiểm bằng tự chơi + đột biến): khởi động mỗi MT 1 câu ở Mức 2 (sai →
  hạ Mức 1) · sau đó chọn MT còn < 3 câu, không lặp MT vừa hỏi, yếu nhất · dạng: tránh dạng vừa sai,
  không quá 2 câu liền một dạng, ưu tiên dạng ít gặp · câu sai hẹn ôn lại sau 3–5 câu bằng dạng khác ·
  mức lên/xuống RIÊNG từng MT (đúng 2 liền lên, sai 2 liền xuống) · kết thúc khi ≥ `soCau` câu và mọi MT
  ≥ 3 câu (tối đa `soCauToiDa`) · nút "Câu tiếp" chỉ hiện sau khi đã trả lời (không bỏ qua câu khó).
- **Ngọn lửa** (`lua.js`, nạp trong loader sau `bai-N.js`, trước `engine.js`; mục lục cũng nạp):
  đốm xanh lá nhạt (Đang làm quen) → xanh lá (Mức 1) → cam (Mức 2) → đỏ bùng ba lưỡi (Mức 3); khác cả
  cỡ + số lưỡi, luôn kèm chữ. Lửa lúc làm bài = cấp độ ước lượng hiện tại (trung vị các MT); màn kết thúc =
  lửa lớn + dải lửa nhỏ từng MT + lỗi hay gặp + nên luyện thêm. Mục lục hiện lửa nhỏ cạnh bài đã luyện
  (`PROG.tong`). Chuỗi đúng liên tiếp dùng ⚡ (không dùng 🔥 để khỏi lẫn với lửa cấp độ).

## Thích ứng trong một dạng (chế độ Chọn dạng; bài cũ 10–14 chỉ có chế độ này)

Engine tự nâng/hạ mức câu hỏi và cuối buổi đánh giá **cấp độ tư duy** theo 3 mức của
**Thông tư 27/2020**: 1 **Nhận biết** · 2 **Hiểu** · 3 **Vận dụng**. Mỗi topic phải khai báo:

```js
{ name:'…', sec:'…', levels:3,
  muc:['Mức 1 ở dạng này là gì', 'Mức 2 …', 'Mức 3 …'],   // hiện ở màn đánh giá ("Bước tiếp theo")
  make:function(lv){ … sinh câu theo lv = 1|2|3 … }, check:function(q){ … } }
```

- **Luật engine** (đừng đổi tuỳ tiện — `soat_giao_dien` kiểm bằng tự chơi thử): chỉ tính LẦN TRẢ LỜI
  ĐẦU mỗi câu; đúng 2 câu liền → lên mức, sai 2 câu liền → xuống mức; buổi mới bắt đầu ở mức cao nhất
  từng đạt. Mức đạt = mức cao nhất có ≥ 2 câu đúng ngay và ≥ 60% số câu ở mức đó. Lưu
  `toanlop3-bai-<n>` = `{stars, muc, lich}`; nút 📊 mở Hồ sơ (mức từng dạng + cấp độ chung = trung vị).
- **Thiết kế mức — giữ ĐÚNG dạng SGK, chỉ đổi độ khó** (mẫu: `bai-14.js`, `bai-12.js`):
  - **Mức 1 · Nhận biết:** số nhỏ như trong sách (bảng 2–5, ×1..5), ít lựa chọn (3), đáp án nhiễu
    lệch XA, có gợi ý ("tức là 6 × 3", "Muốn tìm thừa số…").
  - **Mức 2 · Hiểu:** đủ dải của bài (×1..10), 4 lựa chọn lệch GẦN, bẫy quen thuộc (đếm phần chưa tô,
    đổi chỗ thừa số, bảng chia), bỏ gợi ý.
  - **Mức 3 · Vận dụng:** tình huống MỚI cùng chủ đề — làm ngược (biết tổng tìm số nhóm), vế còn lại là
    một phép tính ("? × 4 = 3 × 8"), bài toán HAI bước, hai điều kiện, phản ví dụ khái niệm (các phần
    KHÔNG bằng nhau), che cả ô lân cận để không đếm thêm được. Vẫn trong phạm vi bảng đã học.
- **Bộ sinh câu dùng chung** (figures.js) cho bài bảng nhân/chia b: `bnTinh(b,lv)`, `bnBang(b,lv,choChia)`,
  `bnDaySo(b,lv,hinhLen,hinhXuong)` + check `bnKiemTinh/bnKiemBang/bnKiemDay`; `soChon(v,lv,b,cnt)` sinh
  đáp số nhiễu theo mức; `tinhBT('9 × 4 + 9')` tính biểu thức để check(); `coChu(expr,cỡ)` thu chữ
  trong hình khi biểu thức dài; `oHoi()`, `hatSo()`.
- `kiemtra.js … --chitiet` in bảng theo mức (đáp số TB/lớn nhất, số lựa chọn) — soát bằng mắt là mức
  càng cao càng khó (mức 3 dạng "ngược" có thể đáp số nhỏ hơn: khó ở cách nghĩ, không ở cỡ số).

## Hình minh hoạ và màu — luật rút ra từ lỗi "khó nhìn" (28–29/09/2026)

- Mỗi hình là một hàm trả chuỗi SVG (số truyền vào để đổi được). Giữ hình **generic**.
  Mẫu + cách vẽ → `references/doc-sgk-va-hinh.md`.
- **Hình chở phép tính** (xe tải, bóng, dưa hấu, hoa…): **SVG thuần** — phép tính là
  `<text>` nằm trên **nhãn trắng bo tròn** đủ rộng, chữ đậm màu tối; thẻ `<svg>` có
  `style="max-width:100%;height:auto;display:block"` để tự co trong nút trắc nghiệm
  trên điện thoại. KHÔNG đặt `<div>` chữ đè lên SVG (chữ sẽ vắt qua nhiều màu, và
  hình không co được — đã vấp: bóng bài 10, xe tải bài 9 tràn nút ở khổ 375px).
- **Hạt số màu** (vòng tròn/hình thoi/ô trong dãy số): nền `-400` thì chữ phải TỐI.
  engine.css đã tự đổi `.bg-amber/sky/emerald-400.text-white` trong thẻ sang chữ tối,
  nhưng bài mới nên viết thẳng chữ tối.
- Chữ nhỏ trên nền trắng/nhạt: dùng nấc màu `-700` (cam, hổ phách, xanh lá), không
  dùng `-400/-500`; chữ xám ≥ `slate-500`. Nền nhạt mới (vd `bg-xxx-100`) phải có
  override giao diện Tối trong engine.css — `soat_giao_dien` sẽ bắt nếu thiếu.
- **Thầy chê "hình vẽ xấu" (01/10/2026) ⇒ tách hẳn thành skill `sk-ve-hinh-tieuhoc`.**
  Soát tương phản/tràn KHÔNG bắt được hình xấu. Trước khi giao phải chạy **phòng tranh**
  (`phong_tranh.mjs`: mọi dạng × 3 mức, sáng + tối), tự soi từng ảnh bằng mắt, rồi gửi thầy duyệt.
  Không dùng emoji hệ thống làm hình.

## Kiểm thử

- **`assets/kiemtra.js` (Node):** nạp `figures.js` + `bai-<N>.js` trong sandbox, chạy
  mỗi generator hàng trăm nghìn lượt: `ans` nguyên, mcq đúng một `correct` + đủ lựa
  chọn, mọi `check(q)` đúng, không backtick/`${`.
- **`assets/soat_giao_dien.mjs` (Node + Chrome chạy ngầm):** mở mọi tab × 3 giao diện ×
  2 khổ (375×812, 1280×800), sinh vài câu mỗi tab, đo **tương phản chữ/nền theo WCAG**
  (< 3:1 = LỖI chặn; 3–4.5:1 với chữ nhỏ = cảnh báo), **chữ đè lên nhiều màu nền**,
  **chữ tràn khỏi nút**, **hình thò ra ngoài thẻ**, **tràn ngang**, **lỗi JavaScript**;
  soát cả bảng Hiển thị. **Bài có `muctieu`:** tự chơi trọn một lượt Luyện thông minh (xen đúng/sai/làm
  lại) rồi đối chiếu: khởi động đủ MT, dạng thuộc đúng MT, không dạng nào 3 câu liền, mức từng câu đúng
  luật, câu sai được ôn lại, làm lại không bị tính, sai có nhãn thì có gợi ý riêng, độ dài lượt, lửa cuối
  khớp mức chấm; soát màn kết thúc với nhật ký mẫu ở mọi giao diện/khổ. Đã thử 4 đột biến (bỏ khởi động,
  lên mức sau 3 câu, tính cả lần làm lại, lửa lấy mức cao nhất) → bắt đủ. **Với trang có thích ứng** (mở kèm `?kiemthu=1` → `window.__ENG`): soát câu
  ở TỪNG mức, **tự chơi thử** mỗi tab kiểm luật lên/xuống mức + nhật ký lần đầu, kiểm luật chấm mức
  trên 7 nhật ký mẫu, soát màn đánh giá + Hồ sơ (đã thử đột biến: công cụ bắt được). Mặc định 2 câu
  mỗi mức; soát cả 6 bài mất ~15–20 phút (chạy nền). Chặn hits.sh nên không làm tăng bộ đếm thật. `--chup <dir>`
  lưu ảnh những chỗ có vấn đề; **`--anh <dir>` chụp câu đầu của MỌI tab (khổ điện thoại,
  3 giao diện) để duyệt bằng mắt bằng Read — không cần trình duyệt tích hợp** (khung
  trình duyệt tích hợp hay vẽ chậm/treo khi cửa sổ Claude bị che: ảnh ra mờ do hiệu ứng
  chưa chạy xong, hoặc chụp quá thời gian). Đã kiểm độ nhạy: chạy trên bản cũ bắt đúng lỗi số
  trắng trên hạt vàng (1.67:1) và phép tính đè múi bóng.
- **Nhìn tận mắt:** `.claude/launch.json` (python `-m http.server 8099`) +
  `preview_start` → `navigate` `http://localhost:8099/bai-<N>.html`, `resize_window`
  preset mobile. (`file://` trong trình duyệt tích hợp không nạp script ngoài; bản
  Vercel bị chặn trong trình duyệt tích hợp — dùng localhost.)

**Bẫy máy này:** `sed -i` của Git Bash âm thầm đổi CRLF → LF cả file (index.html là CRLF: diff 461 dòng
thay vì 1). Sửa file CRLF bằng Python đọc/ghi nhị phân, rồi `git diff --stat` phải đúng số dòng đổi.
Script Python in tiếng Việt ra console bị lỗi mã hoá cp1252 — ghi file trước khi print, hoặc
`PYTHONIOENCODING=utf-8`.

## Đưa lên web

- **Bản cho phiên đám mây (08/10/2026):** repo chứa bản sao hai skill ở `.claude/skills/` + `CLAUDE.md` gốc repo (luật
  thay thế khi không có máy thầy: không SGK, mở PR thay vì push `main`). **Sửa skill này hoặc `sk-ve-hinh-tieuhoc` xong ⇒
  `node .claude/dong-bo-skill.mjs --len-repo`** rồi commit `.claude/skills` cùng lần đưa lên tới; gộp PR đám mây có sửa
  skill ⇒ `git pull` rồi `--ve-may`. Công cụ soát tìm được cả Chrome Linux / Playwright (`--no-sandbox` trên Linux).
- **Mặc định: git** qua `assets/dang_web.mjs` (xem Quy trình bước 6). Chi tiết, cách
  dựng lại bản sao git, và đường **dự phòng qua trình duyệt** (khi máy mất git/mạng)
  → `references/quy-trinh-commit.md`.
- **Mở khoá bài trong mục lục:** `index.html` chỉ tạo link cho các số trong
  `const AVAILABLE = new Set([...])`. Thêm N vào set (Edit bản cục bộ) rồi đẩy cùng
  commit của bài.
- Các trang cũ bài 1–8 + `index.html` chưa dùng engine (chưa có nút giao diện); bộ
  đếm đã gắn bằng `<script src="counter.js">`.

## Báo cáo cuối

Nêu ngắn gọn một lần: bảng kiểm bám SGK (mục → tab), kết quả hai cổng kiểm
(kiemtra + soat_giao_dien), đã lên web chưa (dòng "ĐÃ LÊN WEB" của dang_web.mjs).
