# Tiêu chí soi hình

Mỗi mục ghi ai chấm:
- **[máy-đếm]** = `kiem_dem.mjs`;
- **[máy-soát]** = `phong_tranh.mjs --soat`;
- **[mắt]** = đọc ảnh phòng tranh.

Máy chạy trước. Máy ĐẠT rồi mới soi mắt, và mắt chỉ cần chấm các mục **[mắt]**. Đọc ảnh ở cả giao diện sáng và tối, khổ 1200 và 375.

## A. Đúng toán (quan trọng nhất)
- [ ] [máy-đếm] **Số chi tiết để đếm đúng số trong lời**, với mọi n hàm nhận.
- [ ] [máy-đếm + máy-soát] **Chi tiết đếm không chạm nhau:** chấm, quả, bút, hộp, can, hạt dãy số.
- [ ] [mắt] **Đếm được bằng mắt ở cỡ điện thoại:** chi tiết không quá mảnh, không lẫn vào nền.
  Máy chỉ đếm được thẻ `data-dem`; nó không biết mắt trẻ có tách được hay không.
- [ ] [mắt] **Hình không lộ đáp án và không gợi sai.** Ví dụ vẽ cốc rời trong bài "chia cốc vào hộp" làm các em đếm nhầm số cốc.
- [ ] [mắt] **Số lượng trong lời khớp hình ở cấp câu hỏi:** "Có 3 con" thì vẽ 3 con. Mức 2–3 vẽ một hình minh hoạ cũng được, miễn không gây hiểu sai.

## B. Rõ ràng
- [ ] [máy-soát] **Chữ trong hình ≥ 14px** khi thẻ rộng cỡ điện thoại; dưới 12px là lỗi.
- [ ] [máy-soát] **Không chữ đè chữ**; chữ không tràn khỏi nhãn trắng, không tràn khỏi hình.
- [ ] [máy-soát] **Không rớt một hình lẻ xuống dòng**; thẻ không tràn ngang; không ảnh hỏng.
- [ ] [mắt] **Ô "?" nổi bật**, và chỉ có đúng ô cần hỏi. Ô trung gian không hỏi thì để trống (`v:''`).

## C. Thống nhất phong cách
- [ ] [máy-soát] **Không còn emoji hệ thống.**
- [ ] [máy-soát] **Màu nằm trong bảng `HM`.** Máy chỉ cảnh báo màu ngoài bảng; màu mới đáng dùng thì thêm vào `HM`.
- [ ] [mắt] **Hình tự vẽ cùng "họ" với ảnh Fluent:** mảng màu đặc, không viền đen, bo tròn, có một sắc đậm tạo khối.
- [ ] [mắt] **Cỡ hình hợp lý:** vật đếm 52–60, hình đơn 64–80. Các hình trong một câu thẳng hàng, cách đều.

## D. Giao diện Tối
- [ ] [mắt] **Phần đen hoặc tím than không chìm:** đầu, chân, râu, bánh xe.
- [ ] [mắt] **Chữ phép tính và mũi tên trên nền thẻ vẫn sáng rõ** (`currentColor`).

## E. Sư phạm
- [ ] [mắt] **Hình gợi đúng tình huống của lời**, không chỉ để trang trí.
- [ ] [mắt] **Giống tinh thần tranh SGK:** cùng vật, cùng cách sắp xếp. Vẽ lại, không chép.

Ghi kết quả vào tin báo thầy một dòng mỗi bài. Ví dụ: "Bài 12: kiểm đếm ĐẠT · soát hình 0 lỗi (375 + 1200, sáng + tối) · soi mắt 8 dạng × 3 mức — sạch".
