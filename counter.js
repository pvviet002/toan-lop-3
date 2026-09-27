/* counter.js — Bộ đếm lượt truy cập DÙNG CHUNG (badge hits.sh), hiện cố định ở góc mọi trang.
   Đếm chung cho cả web (key = toan-lop-3.vercel.app); mỗi lần tải trang +1.
   Nạp bằng <script src="counter.js"></script> ở mỗi trang; engine.js tự nạp cho các bài v2.
   QUY TẮC: nối chuỗi, KHÔNG backtick và KHÔNG template literal. */
(function(){
  var SRC = 'https://hits.sh/toan-lop-3.vercel.app.svg?style=flat-square&label='
    + encodeURIComponent('Lượt truy cập') + '&color=f59e0b&labelColor=475569';
  function mount(){
    if(document.getElementById('siteCounter')) return;
    if(!document.body){ setTimeout(mount, 100); return; }
    var w = document.createElement('div');
    w.id = 'siteCounter';
    w.style.cssText = 'position:fixed;right:8px;bottom:8px;z-index:30;opacity:.92;pointer-events:none';
    var img = document.createElement('img');
    img.alt = 'Lượt truy cập';
    img.style.cssText = 'height:24px;display:block;border-radius:6px;filter:drop-shadow(0 1px 2px rgba(0,0,0,.18))';
    img.onerror = function(){ w.style.display = 'none'; };
    img.src = SRC + '&_=' + Date.now();
    w.appendChild(img);
    document.body.appendChild(w);
  }
  if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', mount);
  else mount();
})();
