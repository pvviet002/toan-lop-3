# Đưa lên web: git (mặc định) · trình duyệt (dự phòng)

Repo `pvviet002/toan-lop-3` (công khai) → Vercel `toan-lop-3.vercel.app` tự dựng lại
sau mỗi lần có commit lên `main` (thường 10–30 giây).

## 1. Đường chính: git + `dang_web.mjs` (từ 29/09/2026)

Máy này: `git` 2.55 + `gh` đã đăng nhập tài khoản **pvviet002** (quyền `repo`); mạng
tới github.com thông. Bản sao làm việc: **`E:/Dat_Thoi/Lop3/web-toan3`**, cấu hình riêng:
`core.autocrlf=false` (giữ nguyên byte như trên repo), `credential.https://github.com.helper
= !gh auth git-credential` (không hỏi mật khẩu), `.claude/` nằm trong `.git/info/exclude`.

```bash
git -C E:/Dat_Thoi/Lop3/web-toan3 pull --ff-only          # trước khi sửa
# ... sửa file bằng Edit/Write ...
node ~/.claude/skills/sk-web-toan-tieuhoc/assets/dang_web.mjs E:/Dat_Thoi/Lop3/web-toan3 msg.txt
```

`msg.txt`: dòng đầu tiếng Việt không dấu ngắn gọn (vd `Them Bai 14: Mot phan may`),
vài dòng mô tả, dòng cuối là `Co-Authored-By:` theo hướng dẫn attribution hiện hành.
Script: kiemtra → soat_giao_dien (lỗi ⇒ dừng, KHÔNG commit) → `git add` đúng các file đã
sửa → commit → push → hỏi Vercel tới khi mọi file khớp mã băm. `--thu` = chỉ chạy hai cổng.

Lưu ý:
- **Đừng tự lấy lệnh `curl`** để kiểm web (đã bị từ chối quyền); dùng `fetch` của Node như
  script đang làm.
- Push hỏng vì quyền → `gh auth status`; token hết hạn thì nhờ thầy chạy `gh auth login`
  (Claude không nhập mật khẩu/token).
- Thầy sửa trực tiếp trên GitHub → `pull --ff-only` trước khi làm. Lệch nhánh thì dừng,
  báo thầy, không `--force`.

### Dựng bản sao git (khi thư mục chưa phải repo)
Không ghi đè file cục bộ nào chưa so:
```bash
cd E:/Dat_Thoi/Lop3/web-toan3
git init -q -b main && git config core.autocrlf false
git remote add origin https://github.com/pvviet002/toan-lop-3.git
git fetch -q origin main && git reset -q --mixed origin/main
git status --short        # M = cục bộ khác repo (XEM KỸ trước khi quyết), D = chỉ có trên repo
git checkout -- <các file D>   # kéo file chỉ có trên repo về
echo ".claude/" >> .git/info/exclude
git config --local credential.https://github.com.helper ""
git config --local --add credential.https://github.com.helper "!gh auth git-credential"
```
(Lần dựng 29/09/2026: 16 file cục bộ khớp tuyệt đối repo, 21 file kéo về.)

## 2. Dự phòng: commit qua trình duyệt (Claude in Chrome)

Chỉ dùng khi git/mạng không dùng được. **KHÔNG click theo toạ độ trong editor GitHub** —
hộp thoại commit nhảy vị trí theo cuộn/thanh trợ giúp; đã vấp: gõ nhầm thông điệp vào
editor làm hỏng file. Làm TOÀN BỘ bằng JS trên tab `github.com/.../edit/main/<file>`:

1. **Chờ editor gắn** (`document.querySelector('.cm-content')` khác null). Tab ẩn (cửa sổ
   Chrome bị che, hoặc nhóm tab mới tạo nằm nền) vẫn gắn nhưng chậm ~10 giây.
2. **Dựng nội dung mới trong trang:** lấy bản gốc qua API
   `api.github.com/repos/pvviet002/toan-lop-3/contents/<file>?ref=main` (base64 → `atob` →
   `TextDecoder('utf-8')`), áp các cặp cũ→mới bằng `split/join` với số lần khớp kỳ vọng.
   Nội dung có `\` (CSS `.hover\:…`) thì truyền qua chuỗi JSON (`json.dumps(ensure_ascii=True)`
   sinh bằng Python), KHÔNG bọc backtick. Chỉ `return` trường an toàn (API trả URL có query
   → kết quả bị chặn "Cookie/query string data").
3. **So mã băm** (`crypto.subtle.digest('SHA-256', …)`): bản gốc phải khớp hash bản gốc tính
   ở máy, bản mới phải khớp hash file cục bộ.
4. **Ghi thẳng vào CodeMirror** (thay execCommand):
   `var v=(el.cmTile||el.cmView).view; v.dispatch({changes:{from:0,to:v.state.doc.length,insert:NEW}})`
   rồi băm `v.state.doc.toString()` — phải khớp hash cục bộ (kiểm cả tài liệu).
5. **Commit bằng JS:** click `button` có chữ bắt đầu `Commit changes` và chứa `...`; chờ 2–3s;
   đặt `#commit-description-input` rồi `#commit-message-input` bằng native value setter +
   `Event('input'/'change')` (message đặt SAU CÙNG — Copilot hay ghi đè); click `button`
   text đúng `Commit changes`; xác nhận `location.pathname` chuyển sang `/blob/`.
6. Kiểm lịch sử: `fetch('https://api.github.com/repos/pvviet002/toan-lop-3/commits?per_page=3')`.

## Khi không có cả git lẫn Chrome
Soạn + kiểm như thường, lưu ở bản sao cục bộ, **commit cục bộ** (`git commit`), báo thầy
"đã kiểm chứng, CHƯA lên web" — lần sau có mạng chỉ cần `git push`. Đừng coi là xong.
