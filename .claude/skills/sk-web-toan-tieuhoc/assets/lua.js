/* lua.js — NGỌN LỬA CẤP ĐỘ TƯ DUY, dùng chung cho trang bài (engine.js) và mục lục (index.html).
   4 trạng thái (Thông tư 27/2020): 0 Đang làm quen = đốm xanh lá nhạt · 1 Nhận biết = ngọn xanh lá ·
   2 Hiểu = ngọn cam · 3 Vận dụng = ngọn đỏ bùng ba lưỡi. Khác nhau cả MÀU, CỠ và SỐ LƯỠI (không chỉ dựa vào màu).
   veLua(muc, px) trả chuỗi SVG. Trên mục lục: tự gắn ngọn lửa nhỏ cạnh mỗi bài đã luyện (đọc localStorage).
   QUY TẮC: nối chuỗi, KHÔNG backtick và KHÔNG template literal. */
(function(){
  var TEN = ['Đang làm quen', 'Nhận biết', 'Hiểu', 'Vận dụng'];
  var MAU = [ ['#97C459', '#EAF3DE', 0.42], ['#3B9A2F', '#C0DD97', 0.62], ['#EF9F27', '#FAC775', 0.84], ['#E24B4A', '#FAC775', 1] ];
  var NGOAI = 'M0 0 C-30 0 -38 -30 -22 -55 C-12 -72 -8 -88 0 -100 C8 -88 12 -72 22 -55 C38 -30 30 0 0 0 Z';
  var TRONG = 'M0 0 C-16 0 -20 -18 -11 -32 C-6 -42 -3 -50 0 -58 C3 -50 6 -42 11 -32 C20 -18 16 0 0 0 Z';
  /* muc 0..3; px = chiều cao khung; cls = lớp CSS thêm (vd 'lua-song' cho lửa rung) */
  function veLua(muc, px, cls){
    muc = Math.max(0, Math.min(3, muc|0)); px = px || 40;
    var m = MAU[muc], s = m[2], g = '';
    if(muc===3) g += '<g transform="translate(-22,0) scale(0.55) rotate(-18)"><path d="'+NGOAI+'" fill="#F09595"/></g>'
                   + '<g transform="translate(22,0) scale(0.55) rotate(18)"><path d="'+NGOAI+'" fill="#F09595"/></g>';
    g += '<path d="'+NGOAI+'" fill="'+m[0]+'"/><path d="'+TRONG+'" fill="'+m[1]+'"/>';
    return '<svg class="lua '+(cls||'')+'" width="'+Math.round(px*0.9)+'" height="'+px+'" viewBox="-50 -104 100 108" role="img" aria-label="Ngọn lửa: '+(muc?'Mức '+muc+' · ':'')+TEN[muc]+'" style="display:inline-block;vertical-align:bottom;overflow:visible">'
      + '<g class="lua-than" transform="translate(0,2) scale('+s+')">'+g+'</g></svg>';
  }
  function tenMuc(muc){ return muc ? 'Mức '+muc+' · '+TEN[muc] : TEN[0]; }
  window.veLua = veLua; window.tenMucLua = tenMuc;

  /* ---- Mục lục: gắn ngọn lửa nhỏ cạnh bài đã luyện ---- */
  function mucCuaBai(n){
    try{ var p = JSON.parse(localStorage.getItem('toanlop3-bai-'+n) || 'null'); if(!p) return -1;
      if(p.tong && typeof p.tong.dat==='number') return p.tong.dat;
      var ds = Object.keys(p.muc||{}).map(function(k){ return p.muc[k]; }).filter(function(v){ return typeof v==='number'; });
      if(!ds.length) return -1; ds.sort(function(a,b){ return a-b; }); return ds[Math.floor((ds.length-1)/2)];
    }catch(e){ return -1; }
  }
  function ganMucLuc(){
    if(window.BAI) return;   /* trang bài: engine tự vẽ lửa */
    var as = document.querySelectorAll('a[href^="bai-"]');
    Array.prototype.forEach.call(as, function(a){
      var m = /^bai-(\d+)\.html/.exec(a.getAttribute('href')||''); if(!m || a.querySelector('.lua')) return;
      var muc = mucCuaBai(+m[1]); if(muc<0) return;
      var sp = document.createElement('span'); sp.title = tenMuc(muc); sp.style.marginLeft = '6px';
      sp.innerHTML = veLua(muc, 20); a.appendChild(sp);
    });
  }
  if(!window.BAI){
    var chay = function(){ ganMucLuc(); setTimeout(ganMucLuc, 400); };
    if(document.readyState==='loading') document.addEventListener('DOMContentLoaded', chay); else chay();
  }
})();
