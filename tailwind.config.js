/* Cấu hình Tailwind v3 để sinh tailwind.css tĩnh (thay cho cdn.tailwindcss.com).
   Quét mọi trang .html và .js ở gốc repo (engine.js, figures.js, bai-N.js ghép chuỗi class nên cũng được quét).
   Build lại sau khi thêm class Tailwind mới:
     npx tailwindcss@3.4.17 -c tailwind.config.js -i tailwind.src.css -o tailwind.css --minify */
module.exports = {
  content: ['./*.html', './*.js'],
  theme: { extend: {} },
  plugins: [],
};
