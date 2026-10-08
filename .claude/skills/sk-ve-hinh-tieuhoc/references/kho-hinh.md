# Kho hình `hinh/` — Microsoft Fluent Emoji (bản phẳng)

- **Nguồn:** https://github.com/microsoft/fluentui-emoji. Giấy phép **MIT**: được dùng công khai, chỉ cần giữ thông báo bản quyền.
- **Thông báo bản quyền** nằm ở `hinh/LICENSE-fluentui-emoji.txt`. Do `lay_hinh.mjs` tự tải; KHÔNG xoá file này.
- **Chỉ dùng bản `Flat`** (phẳng). Bản `Color` có gradient, bản `3D` là PNG nặng; trộn vào sẽ lệch phong cách.
- **Mỗi lần tải phải hỏi thầy trước,** nêu tên file, nguồn và tổng dung lượng.
  Ảnh thử để chọn tải vào scratchpad trước; chỉ hình dùng thật mới chép vào `hinh/` của repo.

## Tìm tên đúng

```bash
gh api "repos/microsoft/fluentui-emoji/git/trees/main?recursive=1" --jq '.tree[] | select(.path|endswith("_flat.svg")) | "\(.size) \(.path)"' | grep -i "beetle\|truck"
```

- Tên truyền cho `lay_hinh.mjs` là **tên thư mục**, vd `"Lady beetle"`, `"Delivery truck"`, `"Cherry blossom"`.
- **Người** (Boy, Girl, Child, Man, Woman, Person) nằm ở `assets/<Tên>/Default/Flat/<slug>_flat_default.svg`. `lay_hinh` tự xử lý.

## Đang có trong repo (cập nhật mỗi lần thêm)

| File | Dùng ở | Ghi chú |
| --- | --- | --- |
| `butterfly.svg` | bài 9 D10, `chuoiBuom` | bướm cam; nhãn số tròn đặt giữa hai cánh |
| `cherry_blossom.svg` | bài 9 D10, `chuoiBuom` | hoa hồng; nhãn số đặt ở nhuỵ |
| `boy.svg` | bài 9 D11 ("Bạn An"), D13; bài 10 `doiKeoCo` | mặt bạn trai |
| `girl.svg` | bài 9 D13; bài 10 `doiKeoCo` | mặt bạn gái (xen kẽ với bạn trai) |
| `bouquet.svg` | bài 9 D13 | bó hoa (gợi tình huống, không để đếm) |

## Đã thử và LOẠI (đừng tải lại để dùng cho việc đó)

| Hình | Lý do loại |
| --- | --- |
| `Lady beetle` | khoảng 7 chấm, có chấm vắt qua đường giữa; sai với "6 chấm". Dùng `ladybug()` tự vẽ. |
| `Delivery truck` | thùng hàng cố định, không dài ra theo biểu thức. Dùng `truck()` tự vẽ cùng bảng màu. |
| `Wood` | là khúc gỗ tròn, không phải thanh gỗ để cưa. Dùng `thanhGo()`. |
| `Crayon`, `Pencil` | bút đơn lẻ; "hộp có 6 bút" phải đếm được. Dùng `hopBut(n)`. |
| `Thinking face` | trang trí, không gợi tình huống. Thay bằng hình đúng tình huống. |

## Dự kiến cho bài 10–14 (tải khi làm, nhớ hỏi trước)

| Bài | Cần | Ứng viên Fluent |
| --- | --- | --- |
| 10 | ĐÃ XONG (01/10/2026) — không cần tải thêm | `doiKeoCo` dùng `boy` + `girl` có sẵn |
| 11 | ĐÃ XONG (01/10/2026) — không tải | Bạch tuộc và cua phải đếm (8 xúc tu; 8 chân + 2 càng), nên tự vẽ: `bachTuoc`, `conCua` |
| 12 | ĐÃ XONG (01/10/2026) — không tải | rồng múa, dưa hấu, hướng dương, thuyền, túi cam, can đều tự vẽ; người dùng `boy`, `girl` |
| 13 | ca nước | `Cup with straw`, `Teacup without handle`, hoặc tự vẽ ca có vạch |
| 14 | cây rau để khoanh | `Leafy green`, `Carrot` |
