# toan-lop-3 — web luyện Toán lớp 3 (repo công khai, Vercel `toan-lop-3.vercel.app`)

Mọi việc trong repo này đi qua hai skill nằm ngay trong repo — **đọc `SKILL.md` tương ứng trước khi làm**:

- `.claude/skills/sk-web-toan-tieuhoc/` — dựng / sửa bài luyện (`bai-<N>.js` + `bai-<N>.html`), engine chung, kiểm, đưa lên.
- `.claude/skills/sk-ve-hinh-tieuhoc/` — mọi việc vẽ / sửa hình trong `figures.js`, kho ảnh `hinh/`.

`engine.js`, `engine.css`, `figures.js`, `lua.js`, `counter.js` trong `assets/` của skill là **bản mẫu để dựng site mới** —
trong repo này luôn sửa và dùng tệp ở **gốc repo**.

Viết cho học sinh lớp 3 và thầy giáo: tiếng Việt có dấu, câu ngắn, dễ hiểu.

## Đang chạy ở đâu?

- **Máy thầy** = thư mục làm việc là `E:/Dat_Thoi/Lop3/web-toan3` (Windows). Theo skill nguyên văn; bỏ qua mục dưới.
- **Phiên đám mây** = mọi trường hợp khác (Linux, thư mục gốc repo). Skill viết cho máy thầy, nên **các luật dưới đây thay cho
  chỗ tương ứng trong skill**.

## Luật thay thế khi chạy trên đám mây

1. **Đường dẫn.** Mọi chỗ skill ghi `E:/Dat_Thoi/Lop3/web-toan3` hay `<repo>` = thư mục gốc repo `.`.
   `assets/…`, `~/.claude/skills/<skill>/assets/…` = `.claude/skills/<skill>/assets/…`.
   Ví dụ: `node .claude/skills/sk-web-toan-tieuhoc/assets/kiemtra.js . bai-15.js 400000`.
2. **Không có SGK.** File PDF sách chỉ có trên máy thầy. Việc cần đọc SGK (bài mới, "sửa cho giống sách"):
   dùng ảnh chụp trang sách thầy dán vào phiên. Không có ảnh thì **dừng, hỏi thầy**, đừng đoán nội dung sách.
   **Không commit ảnh / trích đoạn SGK vào repo** (repo công khai, bản quyền NXB Giáo dục).
3. **Phân tích sư phạm** lưu ở `phan-tich-su-pham/bai-NN.md` **trong repo** (không lên web nhờ `.vercelignore`).
   Vẫn **dừng cho thầy duyệt** trước khi viết mã, đúng như skill.
4. **Chrome cho các cổng soát** (`soat_giao_dien.mjs`, `phong_tranh.mjs`). Công cụ tự tìm Chrome / Chromium, kể cả bản
   Playwright. Không thấy thì cài: `npx -y playwright install --with-deps chromium` (lỗi quyền thì bỏ `--with-deps`).
   Vẫn không cài được ⇒ chạy các cổng không cần trình duyệt (`kiemtra.js`, `kiem_dem.mjs`) và ghi rõ trong PR:
   **"CHƯA soát giao diện / soát hình — cần chạy trên máy thầy"**. Đừng coi là xong.
5. **Không đưa thẳng lên web.** Không chạy `dang_web.mjs` không có `--thu`, không push vào `main`, không `--force`.
   Trình tự:
   - `node .claude/skills/sk-web-toan-tieuhoc/assets/dang_web.mjs . --thu` — chạy đủ các cổng kiểm, phải ĐẠT;
   - commit lên nhánh của phiên, push, mở **Pull Request vào `main`**;
   - mô tả PR: bảng bám SGK (mục → tab), kết quả từng cổng, việc còn để thầy làm. Vercel tự tạo bản xem trước cho PR —
     thầy duyệt trên điện thoại rồi gộp. Gộp xong Vercel mới đưa lên web thật.
6. **Ảnh phòng tranh** (`phong_tranh.mjs`) chụp vào thư mục tạm ngoài repo, tự soi bằng Read; **không commit ảnh chụp**.
   Thầy duyệt hình bằng bản xem trước Vercel của PR.
7. **Font khác máy thầy.** Linux không có Segoe UI nên cỡ chữ đo được có thể lệch chút ít. Lỗi "chữ tràn / chữ nhỏ" chỉ hiện
   trên đám mây mà nhìn bản xem trước không thấy ⇒ ghi chú trong PR, đừng sửa mò.
8. **Nhiều phiên chạy song song** (mỗi phiên một bài) nên tránh sửa đè nhau:
   - hàm hình mới đặt ở **cuối** `figures.js`, trong khối có chú thích `/* ---- Bài N ---- */`;
   - không sửa `engine.js` / `engine.css` / `lua.js` trừ khi việc được giao là nâng engine;
   - trước khi báo xong: `git fetch origin main && git rebase origin/main`, chạy lại các cổng.
9. **Sửa tệp trong `.claude/skills/`** (thêm dòng `DAC_TA` / `DANH_MUC`, xoá tên bài khỏi `chua_chuan.txt`…) thì
   ghi rõ trong PR mục **"Có sửa skill"** — gộp xong thầy chạy trên máy: `git pull` rồi
   `node .claude/dong-bo-skill.mjs --ve-may` để bản trên máy nhận thay đổi.
10. Không đụng tới tệp không thuộc việc được giao. Commit message: dòng đầu tiếng Việt không dấu, ngắn.

## Việc hợp với phiên đám mây (không cần SGK)

- Chuyển bài cũ 1–8 (trang HTML độc lập, chưa dùng engine) sang engine v2 — nội dung lấy từ chính trang cũ.
- Thêm **Luyện thông minh** (`muctieu`, ngọn lửa) cho bài 10–14 theo mẫu `bai-9.js`.
- Vẽ lại hình bài 13, 14 theo quy chuẩn (đang ghi trong `chua_chuan.txt`).
- Bài mới khi thầy dán ảnh trang SGK.

## Trên máy thầy

Sửa skill ở `~/.claude/skills/` xong ⇒ `node .claude/dong-bo-skill.mjs --len-repo` rồi commit `.claude/skills`
cùng lần đưa lên tới. Chạy không tham số để xem hai bên có lệch không.
