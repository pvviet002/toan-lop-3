/* figures.js — Thư viện DÙNG CHUNG: hàm ngẫu nhiên + hình vẽ lại (SVG gốc).
   Mọi hình là hàm trả CHUỖI (không chạm DOM) nên chạy được cả trong Node để kiểm.
   QUY TẮC: viết bằng nối chuỗi, KHÔNG backtick và KHÔNG template literal (để chèn được editor GitHub). */

/* ---- Hàm ngẫu nhiên (dùng trong generator của từng bài) ---- */
function rnd(a,b){ return Math.floor(Math.random()*(b-a+1))+a; }
function pick(a){ return a[Math.floor(Math.random()*a.length)]; }
function shuffle(a){ for(var i=a.length-1;i>0;i--){ var j=Math.floor(Math.random()*(i+1)); var t=a[i];a[i]=a[j];a[j]=t; } return a; }

/* ---- Con bọ rùa (đổi số chấm nếu cần) ---- */
function ladybug(){
  return '<svg width="54" height="54" viewBox="0 0 100 100" style="display:inline-block">'
   +'<ellipse cx="50" cy="90" rx="26" ry="5" fill="rgba(0,0,0,.12)"/>'
   +'<circle cx="50" cy="30" r="15" fill="#1f2937"/>'
   +'<circle cx="44" cy="27" r="3" fill="#fff"/><circle cx="56" cy="27" r="3" fill="#fff"/>'
   +'<circle cx="50" cy="62" r="30" fill="#dc2626"/>'
   +'<line x1="50" y1="34" x2="50" y2="92" stroke="#1f2937" stroke-width="3"/>'
   +'<circle cx="37" cy="52" r="5" fill="#1f2937"/><circle cx="63" cy="52" r="5" fill="#1f2937"/>'
   +'<circle cx="33" cy="66" r="5" fill="#1f2937"/><circle cx="67" cy="66" r="5" fill="#1f2937"/>'
   +'<circle cx="42" cy="80" r="5" fill="#1f2937"/><circle cx="58" cy="80" r="5" fill="#1f2937"/>'
   +'</svg>';
}
/* ---- Xe tải chở một phép tính ---- */
function truck(expr){
  return '<div style="display:inline-block;position:relative">'
   +'<svg width="150" height="72" viewBox="0 0 150 72">'
   +'<rect x="4" y="12" width="96" height="40" rx="5" fill="#fde68a" stroke="#f59e0b" stroke-width="2"/>'
   +'<path d="M100 22 h26 l16 16 v14 h-42 z" fill="#f87171" stroke="#dc2626" stroke-width="2"/>'
   +'<rect x="106" y="26" width="20" height="14" rx="2" fill="#bae6fd"/>'
   +'<circle cx="32" cy="58" r="9" fill="#374151"/><circle cx="112" cy="58" r="9" fill="#374151"/>'
   +'</svg>'
   +'<div style="position:absolute;left:4px;top:12px;width:96px;height:40px;display:flex;align-items:center;justify-content:center;font-weight:800;color:#b45309;font-size:1.1rem">'+expr+'</div>'
   +'</div>';
}
/* ---- Đồng hồ kim ---- */
function clockSVG(h,m){
  var s='<svg width="150" height="150" viewBox="0 0 140 140">';
  s+='<circle cx="70" cy="70" r="66" fill="#fff" stroke="#f59e0b" stroke-width="5"/>';
  for(var n=1;n<=12;n++){ var a=(n/12)*2*Math.PI-Math.PI/2; s+='<text x="'+(70+52*Math.cos(a)).toFixed(1)+'" y="'+(70+52*Math.sin(a)+5).toFixed(1)+'" font-size="13" font-weight="bold" text-anchor="middle" fill="#334155">'+n+'</text>'; }
  var ha=(((h%12)+m/60)/12)*2*Math.PI-Math.PI/2; s+='<line x1="70" y1="70" x2="'+(70+30*Math.cos(ha)).toFixed(1)+'" y2="'+(70+30*Math.sin(ha)).toFixed(1)+'" stroke="#1e293b" stroke-width="5" stroke-linecap="round"/>';
  var ma=(m/60)*2*Math.PI-Math.PI/2; s+='<line x1="70" y1="70" x2="'+(70+45*Math.cos(ma)).toFixed(1)+'" y2="'+(70+45*Math.sin(ma)).toFixed(1)+'" stroke="#3b82f6" stroke-width="3" stroke-linecap="round"/>';
  s+='<circle cx="70" cy="70" r="4" fill="#ef4444"/></svg>'; return s;
}
/* ---- Con rồng múa (generic) ---- */
function dragon(){
  return '<svg width="122" height="66" viewBox="0 0 160 84" style="display:inline-block">'
   +'<ellipse cx="86" cy="78" rx="60" ry="4" fill="rgba(0,0,0,.1)"/>'
   +'<path d="M46 46 Q66 20 88 42 Q110 64 132 42" stroke="#16a34a" stroke-width="15" fill="none" stroke-linecap="round"/>'
   +'<path d="M46 46 Q66 20 88 42 Q110 64 132 42" stroke="#f59e0b" stroke-width="15" fill="none" stroke-linecap="round" stroke-dasharray="3 16"/>'
   +'<path d="M132 42 l14 -7 l-2 9 l10 3 l-13 6 z" fill="#22c55e"/>'
   +'<circle cx="34" cy="42" r="19" fill="#ef4444" stroke="#b91c1c" stroke-width="2"/>'
   +'<circle cx="27" cy="37" r="4" fill="#fff"/><circle cx="27" cy="37" r="1.8" fill="#1f2937"/>'
   +'<path d="M18 47 q-9 3 -14 -2" stroke="#f59e0b" stroke-width="3" fill="none" stroke-linecap="round"/>'
   +'<path d="M34 23 l4 -12 l5 12 z" fill="#f59e0b"/>'
   +'<path d="M24 24 l1 -9 l5 8 z" fill="#f59e0b"/>'
   +'</svg>';
}
/* ---- Quả dưa hấu chở một phép tính ---- */
function melon(expr){
  return '<div style="display:inline-block;position:relative">'
   +'<svg width="132" height="70" viewBox="0 0 132 70">'
   +'<ellipse cx="64" cy="38" rx="58" ry="27" fill="#4ade80" stroke="#16a34a" stroke-width="3"/>'
   +'<path d="M30 15 Q40 38 30 61" stroke="#15803d" stroke-width="2.5" fill="none"/>'
   +'<path d="M64 12 Q74 38 64 64" stroke="#15803d" stroke-width="2.5" fill="none"/>'
   +'<path d="M98 15 Q88 38 98 61" stroke="#15803d" stroke-width="2.5" fill="none"/>'
   +'<path d="M120 24 q9 -3 12 -10" stroke="#15803d" stroke-width="3" fill="none" stroke-linecap="round"/>'
   +'</svg>'
   +'<div style="position:absolute;left:0;top:0;width:132px;height:70px;display:flex;align-items:center;justify-content:center;font-weight:800;color:#fff;font-size:1.05rem;text-shadow:0 1px 2px rgba(0,0,0,.4)">'+expr+'</div>'
   +'</div>';
}
/* ---- Bông hoa hướng dương chở một phép tính ---- */
function flower(expr){
  var s='<div style="display:inline-block;position:relative">'
   +'<svg width="118" height="118" viewBox="0 0 120 120">'
   +'<g fill="#facc15" stroke="#eab308" stroke-width="1.5">';
  for(var i=0;i<12;i++){ var a=i*30; var r=a*Math.PI/180; var x=60+34*Math.cos(r), y=60+34*Math.sin(r);
    s+='<ellipse cx="'+x.toFixed(1)+'" cy="'+y.toFixed(1)+'" rx="9" ry="17" transform="rotate('+a+' '+x.toFixed(1)+' '+y.toFixed(1)+')"/>'; }
  s+='</g><circle cx="60" cy="60" r="26" fill="#b45309"/>'
   +'</svg>'
   +'<div style="position:absolute;left:0;top:0;width:118px;height:118px;display:flex;align-items:center;justify-content:center;font-weight:800;color:#fff;font-size:1.05rem;text-shadow:0 1px 2px rgba(0,0,0,.5)">'+expr+'</div>'
   +'</div>';
  return s;
}
/* ---- Sơ đồ hai bước: [a] op1-> (?) op2-> [?] ---- */
function arrow2(a, op1, op2){
  return '<div class="flex items-center justify-center gap-1 md:gap-2 my-3 flex-wrap">'
   +'<span style="width:52px;height:52px" class="inline-flex items-center justify-center rounded-lg bg-emerald-400 text-white font-extrabold text-xl">'+a+'</span>'
   +'<span class="text-slate-500 font-bold text-sm">'+op1+' &#8594;</span>'
   +'<span style="width:52px;height:52px" class="inline-flex items-center justify-center rounded-full bg-slate-100 border border-slate-300 text-slate-400 font-extrabold text-lg">?</span>'
   +'<span class="text-slate-500 font-bold text-sm">'+op2+' &#8594;</span>'
   +'<span style="width:52px;height:52px" class="inline-flex items-center justify-center rounded-xl bg-white border-2 border-amber-400 text-amber-600 font-extrabold text-xl">?</span>'
   +'</div>';
}
