/* bai-28.js — Bài 28: Bài toán giải bằng hai bước tính. BÀI MỚI, Engine v2 — LUYỆN THÔNG MINH.
   Theo bảng phân tích sư phạm đã duyệt (phan-tich-su-pham/bai-28.md) và chỉnh sửa của thầy trên PR #16:
   4 MỤC TIÊU (muctieu) × 9 DẠNG (topics), mỗi dạng 3 mức (Thông tư 27: Nhận biết · Hiểu · Vận dụng).
   Câu hai bước hỏi thành hai câu liên tiếp, mỗi câu một đáp số: mức 1 hỏi bước 1, mức 2 và 3 hỏi đáp số cuối.
   Lỗi lớn nhất: làm một bước rồi dừng; "ít hơn" mà cộng; "gấp" mà cộng.
   Hình mới viết ngay trong file này (không sửa figures.js): soDoHai (sơ đồ đoạn thẳng hai đoạn), gapKhucABC (đường gấp khúc).
   Đoạn trong sơ đồ mang data-v / data-r / data-t; nhãn cm của đường gấp khúc mang data-cm; check() đọc lại từ chuỗi SVG.
   QUY TẮC: nối chuỗi, KHÔNG backtick và KHÔNG template literal. */

/* ---- Tiện ích chung ---- */
function nhanSai(ds, dung){ var o={}; ds.forEach(function(p){ var v=p[0]; if(Number.isInteger(v) && v>0 && v!==dung && !(String(v) in o)) o[String(v)]=p[1]; }); return o; }
function kiemMCQ(q){ return q.choices[q.correct]===q._dung && new Set(q.choices).size===q.choices.length; }
function dsBtn28(ch){ return '<span class="text-2xl font-extrabold text-slate-700">'+ch+'</span><span class="ml-2 text-base font-bold text-slate-600">'+(ch==='Đ'?'Đúng':'Sai')+'</span>'; }
function svgX(w, h, px){ return svgHinh(w, h, px).replace('<svg ', '<svg class="text-slate-700" '); }
function khungHinh(s){ return '<div class="flex justify-center my-2">'+s+'</svg></div>'; }
function nguoi(ten, alt){ return '<div class="flex justify-center mb-1">'+anh(ten, 72, alt)+'</div>'; }
function cap(s){ return s.charAt(0).toUpperCase()+s.slice(1); }
var GOI={'nham-it-nhieu':'Ít hơn thì bớt đi (trừ). Nhiều hơn thì thêm vào (cộng).', 'nham-gap-them':'Gấp n lần là nhân với n. Thêm n đơn vị mới là cộng n.', 'tra-loi-sai-buoc':'Bé đọc lại câu hỏi cuối: còn một bước nữa mới ra đáp số.',
  'thieu-buoc':'Bài này có hai bước. Bước 1 tìm số chưa biết, bước 2 trả lời câu hỏi.', 'cong-thay-nhan':'Gấp n lần là nhân với n.', 'chon-sai-phep':'Bé xem lại: phép tính này có tìm đúng số cần tìm không?',
  'lech-nhom':'Bé đọc lại đề: số nào ứng với bạn nào, đoạn nào?', 'nham-bang':'Bé tính lại cho đúng nhé!'};
function gy(extra){ var o={}, k; for(k in GOI) o[k]=GOI[k]; for(k in (extra||{})) o[k]=extra[k]; return o; }
function haiNhanXet(x, T, mo){
  var maiDung = x===T, alt, ch;
  if(maiDung){ alt=T+pick([-2,-1,1,2]); if(alt<=0) alt=T+1; ch=[['Đồng ý, vì '+mo(T), true, T],['Không đồng ý, vì '+mo(alt), false, alt]]; }
  else ch=[['Đồng ý, vì '+mo(x), true, x],['Không đồng ý, vì '+mo(T), false, T]];
  shuffle(ch);
  var idx=ch.map(function(c){ return c[2]; }).indexOf(T);
  return {choices:ch.map(function(c){ return c[0]; }), correct:idx, ds:ch};
}
function kiemNhanXet(q){
  var ds=q._ds, T=q._T, x=q._x, maiDung = x===T;
  return ds.length===2 && q.choices.length===2 && ds.filter(function(c){ return c[2]===T; }).length===1 && ds[q.correct][2]===T && ds[q.correct][1]===maiDung
    && q.choices[q.correct]===q._dung && new Set(q.choices).size===2;
}
/* Phép tính viết ra: pt(x,'+',y) → {s:'x + y = r', r:r} */
function pt(x, op, y){ var r = op==='+' ? x+y : (op==='−' ? x-y : x*y); return {s:x+' '+op+' '+y+' = '+r, r:r, x:x, op:op, y:y}; }
var TRU='−';

/* ---- Hình mới 1: sơ đồ đoạn thẳng hai đoạn (độ dài tỉ lệ với số). kieu = 'nhieu' (đoạn 2 = đoạn 1 + k), 'it' (đoạn 2 = đoạn 1 bớt k, phần bớt nét đứt),
   'gap' (đoạn 2 = k đoạn bằng đoạn 1). hoi = 'r2' (ngoặc dưới đoạn 2 ghi "? don"), 'tong' (ngoặc phải ôm cả hai đoạn), '' (không hỏi).
   Mỗi đoạn là một rect có data-v (số), data-r (hàng 1 hoặc 2), data-t (goc / them / bot). ---- */
function soDoHai(kieu, a, k, ten1, ten2, hoi, don){
  var seg2 = kieu==='nhieu' ? [{v:a,t:'goc',l:''},{v:k,t:'them',l:k}] : (kieu==='it' ? [{v:a-k,t:'goc',l:''},{v:k,t:'bot',l:k}] : []), i;
  if(kieu==='gap') for(i=0;i<k;i++) seg2.push({v:a,t:'goc',l:a});
  var tot2=0; seg2.forEach(function(g){ tot2+=g.v; });
  var mx=Math.max(a,tot2), ox=92, barW = hoi==='tong' ? 150 : 170, u=barW/mx, y1=34, y2=98, hh=30;
  var W = hoi==='tong' ? ox+barW+8+22+82+26 : ox+barW+26, H = hoi==='r2' ? y2+hh+16+34+16 : y2+hh+20, s=svgX(W,H);
  function hang(r, y, ten, segs){
    var x=ox, o='<text x="'+(ox-10)+'" y="'+(y+21)+'" text-anchor="end" font-size="17" '+HFONT+' fill="currentColor">'+ten+'</text>';
    segs.forEach(function(g){
      var w=g.v*u;
      o+='<rect data-v="'+g.v+'" data-r="'+r+'" data-t="'+g.t+'" x="'+x.toFixed(1)+'" y="'+y+'" width="'+w.toFixed(1)+'" height="'+hh+'" rx="3" '
        +(g.t==='bot' ? 'fill="none" stroke-dasharray="5 4" opacity=".8"' : 'fill="'+(g.t==='them' ? HM.vang : HM.troi)+'" fill-opacity="'+(g.t==='them' ? '0.8' : '0.5')+'"')+' stroke="currentColor" stroke-width="2.5"/>';
      if(g.l!=='') o+='<text x="'+(x+w/2).toFixed(1)+'" y="'+(y-7)+'" text-anchor="middle" font-size="17" '+HFONT+' fill="currentColor">'+g.l+'</text>';
      x+=w;
    });
    return o;
  }
  s+=hang(1, y1, ten1, [{v:a,t:'goc',l:a}]);
  s+=hang(2, y2, ten2, seg2);
  if(hoi==='r2'){ var xa=ox, xb=ox+tot2*u, yb=y2+hh+14;
    s+='<path d="M'+xa+' '+(yb-6)+' L'+xa+' '+yb+' L'+xb.toFixed(1)+' '+yb+' L'+xb.toFixed(1)+' '+(yb-6)+'" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>';
    s+='<text x="'+((xa+xb)/2).toFixed(1)+'" y="'+(yb+30)+'" text-anchor="middle" font-size="20" '+HFONT+' fill="'+HM.hoi+'">? '+don+'</text>'; }
  if(hoi==='tong'){ var xr=ox+mx*u+8, ym=(y1+y2+hh)/2;
    s+='<path d="M'+xr.toFixed(1)+' '+y1+' H'+(xr+8).toFixed(1)+' V'+(y2+hh)+' H'+xr.toFixed(1)+' M'+(xr+8).toFixed(1)+' '+ym+' H'+(xr+16).toFixed(1)+'" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>';
    s+='<text x="'+(xr+22).toFixed(1)+'" y="'+(ym+7)+'" font-size="20" '+HFONT+' fill="'+HM.hoi+'">? '+don+'</text>'; }
  return khungHinh(s);
}
function docDoan(s){ var o=[], re=/<rect data-v="(\d+)" data-r="(\d)" data-t="(\w+)"/g, m; while((m=re.exec(String(s)))) o.push({v:+m[1], r:+m[2], t:m[3]}); return o; }
/* Đối chiếu hình với số trong đề: đoạn 1 = a; đoạn 2 đúng kiểu */
function kiemSoDo(q){
  var d=docDoan(q.q), a=q._a, k=q._k, r1=d.filter(function(g){ return g.r===1; }), r2=d.filter(function(g){ return g.r===2; });
  if(r1.length!==1 || r1[0].v!==a || r1[0].t!=='goc') return false;
  if(q._kieu==='nhieu') return r2.length===2 && r2[0].v===a && r2[0].t==='goc' && r2[1].v===k && r2[1].t==='them';
  if(q._kieu==='it') return r2.length===2 && r2[0].v===a-k && r2[0].t==='goc' && r2[1].v===k && r2[1].t==='bot' && a-k>0;
  return r2.length===k && r2.every(function(g){ return g.v===a && g.t==='goc'; });
}
function tongThuc(kieu, a, k){ return kieu==='nhieu' ? a+(a+k) : (kieu==='it' ? a+(a-k) : a+a*k); }
function haiThuc(kieu, a, k){ return kieu==='nhieu' ? a+k : (kieu==='it' ? a-k : a*k); }

/* ---- Hình mới 2 (D6): đường gấp khúc A–B–C. Độ dài đoạn tỉ lệ với số cm; nhãn cm là chữ nằm giữa từng đoạn trong ô trắng
   (data-cm = số thật; hoiBC = true thì ô BC hiện "? cm"). Chữ A, B, C chừa lề ≥ 1,3 lần cỡ chữ. ---- */
function gapKhucABC(ab, bc, hoiBC){
  var sc=Math.min(18, 290/(ab+bc)), L1=ab*sc, L2=bc*sc, th=0.5, c=Math.cos(th), sn=Math.sin(th);
  var ax=0, ay=0, bx=L1*c, by=-L1*sn, cx=bx+L2*c, cy=by+L2*sn*0.7;
  var minY=Math.min(ay,by,cy), maxY=Math.max(ay,by,cy), PX=58, PT=62, PB=34, W=Math.round(cx+2*PX), H=Math.round(maxY-minY+PT+PB), ox=PX, oy=PT-minY, s=svgX(W,H);
  var P=[[ax+ox,ay+oy],[bx+ox,by+oy],[cx+ox,cy+oy]];
  s+='<path d="M'+P[0][0].toFixed(1)+' '+P[0][1].toFixed(1)+' L'+P[1][0].toFixed(1)+' '+P[1][1].toFixed(1)+' L'+P[2][0].toFixed(1)+' '+P[2][1].toFixed(1)+'" fill="none" stroke="currentColor" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/>';
  var nh=[['A',P[0][0]-20,P[0][1]+7],['B',P[1][0],P[1][1]-16],['C',P[2][0]+20,P[2][1]+7]];
  P.forEach(function(p){ s+='<circle cx="'+p[0].toFixed(1)+'" cy="'+p[1].toFixed(1)+'" r="2.5" fill="none" stroke="currentColor" stroke-width="6"/>'; });
  nh.forEach(function(t){ s+='<text x="'+t[1].toFixed(1)+'" y="'+t[2].toFixed(1)+'" text-anchor="middle" font-size="22" '+HFONT+' fill="currentColor">'+t[0]+'</text>'; });
  var m1=[(P[0][0]+P[1][0])/2,(P[0][1]+P[1][1])/2], m2=[(P[1][0]+P[2][0])/2,(P[1][1]+P[2][1])/2];
  s+='<g data-seg="AB" data-cm="'+ab+'">'+nhanVien(+m1[0].toFixed(1), +m1[1].toFixed(1), String(ab).length*10+44, 28, ab+' cm', 17)+'</g>';
  s+='<g data-seg="BC" data-cm="'+bc+'" data-an="'+(hoiBC?1:0)+'">'+nhanVien(+m2[0].toFixed(1), +m2[1].toFixed(1), hoiBC ? 56 : String(bc).length*10+44, 28, hoiBC ? '? cm' : bc+' cm', 17)+'</g>';
  return khungHinh(s);
}
function docGK(s){ var a=/data-seg="AB" data-cm="(\d+)"/.exec(s), b=/data-seg="BC" data-cm="(\d+)" data-an="(\d)"/.exec(s); return a && b ? {ab:+a[1], bc:+b[1], an:+b[2]} : null; }

/* Bộ đề cho các dạng nhiều hơn / ít hơn / gấp: v1 = cách gọi "a + đơn vị + vật", n1, n2 = tên hai loại */
var CH_NHIEU=[{n1:'hoa cúc',n2:'hoa hồng',v1:'bông hoa cúc',don:'bông',t1:'Cúc',t2:'Hồng'},{n1:'bút chì',n2:'bút mực',v1:'chiếc bút chì',don:'chiếc',t1:'Bút chì',t2:'Bút mực'},
  {n1:'táo',n2:'cam',v1:'quả táo',don:'quả',t1:'Táo',t2:'Cam'},{n1:'truyện',n2:'vở',v1:'quyển truyện',don:'quyển',t1:'Truyện',t2:'Vở'}];
var CAP_TEN=[['Việt','Mai'],['Nam','Lan'],['An','Bình'],['Hà','Minh']];

/* Bộ tạo câu cho D1–D5 (cùng một khuôn): cfg = {kieu, rg:[[amin,amax,kmin,kmax] × 3], dung(lv): {lead, cau1, cau2, t1, t2, don, unit}} */
function cauHai(lv, kieu, rg, mk){
  var r=rg[lv-1], a, k, g=0;
  do{ a=rnd(r[0],r[1]); k=rnd(r[2],r[3]); g++; }while(g<500 && (tongThuc(kieu,a,k)>=100 || (kieu==='it' && a-k<2) || (kieu==='nhieu' && lv===3 && a===k)));
  var b=haiThuc(kieu,a,k), T=tongThuc(kieu,a,k), x=mk(a,k), sai;
  if(lv<=1) sai = kieu==='nhieu' ? [[a-k,'nham-it-nhieu'],[a*k,'nham-gap-them'],[T,'tra-loi-sai-buoc'],[b+1,'nham-bang']] : (kieu==='it' ? [[a+k,'nham-it-nhieu'],[T,'tra-loi-sai-buoc'],[a*k,'nham-gap-them'],[b+1,'nham-bang']] : [[a+k,'nham-gap-them'],[T,'tra-loi-sai-buoc'],[b+1,'nham-bang']]);
  else sai = kieu==='nhieu' ? [[b,'tra-loi-sai-buoc'],[a,'thieu-buoc'],[2*a-k>0 ? 2*a-k : 0,'nham-it-nhieu'],[T+1,'nham-bang']] : (kieu==='it' ? [[b,'tra-loi-sai-buoc'],[2*a+k,'nham-it-nhieu'],[a,'thieu-buoc'],[T+1,'nham-bang']] : [[b,'tra-loi-sai-buoc'],[2*a+k,'nham-gap-them'],[a,'thieu-buoc'],[T+1,'nham-bang']]);
  var ans = lv<=1 ? b : T;
  return {type:'num', _lv:lv, _a:a, _k:k, _kieu:kieu, q:soDoHai(kieu,a,k,x.t1,x.t2, lv<=1 ? 'r2' : 'tong', x.don)+'<div>'+x.lead+'</div><div class="mt-1">'+(lv<=1 ? x.cau1 : x.cau2)+'</div>', ans:ans, unit:x.unit, sai:nhanSai(sai, ans),
    goiY:gy({'tra-loi-sai-buoc':'Bé tìm số của bạn kia trước ('+(kieu==='nhieu' ? a+' + '+k : kieu==='it' ? a+' − '+k : a+' × '+k)+'), rồi cộng với '+a+' để ra tất cả.', 'thieu-buoc':'Bài này có hai bước: tìm số còn lại, rồi cộng hai số.'})};
}
function kiemHai(q){
  var a=q._a, k=q._k, kieu=q._kieu, T=tongThuc(kieu,a,k);
  return kiemSoDo(q) && q.ans===(q._lv<=1 ? haiThuc(kieu,a,k) : T) && T<100 && k>=2 && a>=2; }

var BAI = {
 n: 28,
 title: 'Bài Toán Giải Bằng Hai Bước Tính',
 sub: 'Luyện thông minh: câu hỏi tự đổi theo bé — làm hết lượt để xem ngọn lửa!',
 goal: 10, soCau: 18, soCauToiDa: 24,
 loi: {'nham-it-nhieu':'Nhầm "ít hơn" với "nhiều hơn"', 'nham-gap-them':'Nhầm "gấp n lần" với "thêm n đơn vị"', 'tra-loi-sai-buoc':'Trả lời bước 1 thay vì bước cuối'},
 muctieu: [
  {id:'MT1', ten:'Hai bước: nhiều hơn rồi cộng', muc:['Bước 1: hoa hồng nhiều hơn hoa cúc 2 bông (5 + 2).', 'Hai bước: hai ngăn sách (10, 13, cả hai 23).', 'Số lớn hơn; hỏi cả hai loại.']},
  {id:'MT2', ten:'Hai bước: gấp, ít hơn', muc:['Bước 1: can 2 gấp 3 lần can 1; thuyền của Nam ít hơn Mai.', 'Hai bước: hai can (5, 15, 20); thuyền (10, 7, 17); máy tính (10, 6, 16).', 'Số lớn hơn (30 máy, ít hơn 12).']},
  {id:'MT3', ten:'Đoạn gấp khúc và tóm tắt', muc:['Đường gấp khúc ABC: BC bằng 2 lần AB (bước 1); chọn đề khớp sơ đồ.', 'Độ dài ABC (9, 18, 27); đọc sơ đồ rồi tính cả hai bao.', 'Số khác (AB 14, BC gấp 3 lần); sơ đồ có "gấp".']},
  {id:'MT4', ten:'Tìm lỗi và chọn phép tính', muc:['Đúng / Sai: số hoa hồng là 7; chọn dãy hai phép tính (nhiều hơn).', 'Bạn An còn thiếu bước nào; chọn dãy phép tính (ít hơn).', 'Bạn nói đúng hay sai ("Em thấy thế nào?"); chọn dãy phép tính (gấp).']}
 ],
 topics: [
  /* D1 — Hoa cúc, hoa hồng (Khám phá, bài toán 1) */
  {name:'Hoa cúc, hoa hồng', sec:'Khám phá — Số hoa hồng nhiều hơn số hoa cúc 2 bông: sơ đồ đoạn thẳng, hai bước', mt:['MT1'], levels:3,
   muc:['Bước 1: số loài thứ hai nhiều hơn k (a + k).', 'Hai bước: cả hai loại (a + (a + k)).', 'Số lớn hơn, cả hai loại.'],
   make:function(lv){ return cauHai(lv, 'nhieu', [[3,9,2,5],[3,9,2,5],[12,40,3,9]], function(a,k){ var t=pick(CH_NHIEU);
      return {t1:cap(t.t1), t2:cap(t.t2), don:t.don, unit:t.don, lead:'Có <b>'+a+' '+t.v1+'</b>. Số '+t.n2+' nhiều hơn số '+t.n1+' <b>'+k+' '+t.don+'</b>.', cau1:'Hỏi có bao nhiêu '+t.don+' '+t.n2+'?', cau2:'Hỏi '+t.n1+' và '+t.n2+' có tất cả bao nhiêu '+t.don+'?'}; }); },
   check:kiemHai},

  /* D2 — Hai ngăn sách (Khám phá, bài toán 2) */
  {name:'Hai ngăn sách', sec:'Khám phá — Ngăn trên 10 quyển, ngăn dưới nhiều hơn ngăn trên 3 quyển', mt:['MT1'], levels:3,
   muc:['Bước 1: ngăn dưới có bao nhiêu quyển.', 'Hai bước: cả hai ngăn.', 'Số lớn hơn: cả hai ngăn.'],
   make:function(lv){ return cauHai(lv, 'nhieu', [[6,12,2,5],[8,20,2,6],[20,45,5,12]], function(a,k){
      return {t1:'Trên', t2:'Dưới', don:'quyển', unit:'quyển', lead:'Ngăn trên có <b>'+a+' quyển</b> sách. Ngăn dưới có nhiều hơn ngăn trên <b>'+k+' quyển</b>.', cau1:'Hỏi ngăn dưới có bao nhiêu quyển sách?', cau2:'Hỏi cả hai ngăn có tất cả bao nhiêu quyển sách?'}; }); },
   check:kiemHai},

  /* D3 — Hai can nước mắm (Hoạt động 1) */
  {name:'Hai can nước mắm', sec:'Hoạt động 1 — Can thứ hai gấp 3 lần can thứ nhất: hai bước', mt:['MT2'], levels:3,
   muc:['Bước 1: can thứ hai gấp k lần can thứ nhất (a × k).', 'Hai bước: cả hai can (a + a × k).', 'Số lớn hơn: can thứ nhất 6 đến 9 l, gấp 4 đến 6 lần.'],
   make:function(lv){ return cauHai(lv, 'gap', [[3,9,2,3],[3,9,2,3],[6,9,4,6]], function(a,k){ var ch=pick(['nước mắm','dầu ăn','nước tương']);
      return {t1:'Can 1', t2:'Can 2', don:'l', unit:'l', lead:'Can thứ nhất đựng <b>'+a+' l</b> '+ch+'. Can thứ hai đựng <b>gấp '+k+' lần</b> can thứ nhất.', cau1:'Hỏi can thứ hai đựng bao nhiêu lít '+ch+'?', cau2:'Hỏi cả hai can đựng bao nhiêu lít '+ch+'?'}; }); },
   check:kiemHai},

  /* D4 — Gấp thuyền (Hoạt động 2) */
  {name:'Gấp thuyền', sec:'Hoạt động 2 — Mai gấp 10 cái thuyền, Nam gấp ít hơn Mai 3 cái', mt:['MT2'], levels:3,
   muc:['Bước 1: bạn thứ hai gấp ít hơn k cái (a − k).', 'Hai bước: cả hai bạn.', 'Số lớn hơn: cả hai bạn.'],
   make:function(lv){ var tn=pick(CAP_TEN); return cauHai(lv, 'it', [[8,15,2,5],[8,15,2,5],[20,48,5,14]], function(a,k){
      return {t1:tn[0], t2:tn[1], don:'cái', unit:'cái thuyền', lead:tn[0]+' gấp được <b>'+a+' cái thuyền</b>. '+tn[1]+' gấp được ít hơn '+tn[0]+' <b>'+k+' cái thuyền</b>.', cau1:'Hỏi '+tn[1]+' gấp được bao nhiêu cái thuyền?', cau2:'Hỏi cả hai bạn gấp được bao nhiêu cái thuyền?'}; }); },
   check:kiemHai},

  /* D5 — Máy tính bán được (Luyện tập 1) */
  {name:'Máy tính bán được', sec:'Luyện tập 1 — Buổi sáng bán 10 máy tính, buổi chiều bán ít hơn buổi sáng 4 máy', mt:['MT2'], levels:3,
   muc:['Bước 1: buổi chiều bán được bao nhiêu máy (a − k).', 'Hai bước: cả hai buổi.', 'Số lớn hơn (30 máy, ít hơn 12).'],
   make:function(lv){ return cauHai(lv, 'it', [[8,20,2,6],[8,20,2,6],[30,48,8,15]], function(a,k){
      return {t1:'Sáng', t2:'Chiều', don:'máy', unit:'máy tính', lead:'Buổi sáng cửa hàng bán được <b>'+a+' máy tính</b>. Buổi chiều bán được ít hơn buổi sáng <b>'+k+' máy tính</b>.', cau1:'Hỏi buổi chiều bán được bao nhiêu máy tính?', cau2:'Hỏi cả hai buổi bán được bao nhiêu máy tính?'}; }); },
   check:kiemHai},

  /* D6 — Đường gấp khúc ABC (Luyện tập 2) */
  {name:'Đường gấp khúc ABC', sec:'Luyện tập 2 — Đường gấp khúc ABC có AB = 9 cm, BC dài gấp 2 lần AB', mt:['MT3'], levels:3,
   muc:['Bước 1: đoạn BC dài bao nhiêu cm.', 'Hai bước: độ dài đường gấp khúc ABC.', 'Số khác (AB 10 đến 16 cm, BC gấp 2 hoặc 3 lần).'],
   make:function(lv){
    var ab, k, bc, g=0;
    do{ if(lv<=2){ ab=rnd(4,9); k=2; } else { ab=rnd(10,16); k=rnd(2,3); } bc=ab*k; g++; }while(g<200 && ab+bc>=100);
    var T=ab+bc, ans = lv<=1 ? bc : T;
    var sai = lv<=1 ? [[ab+k,'nham-gap-them'],[T,'tra-loi-sai-buoc'],[bc+1,'nham-bang']] : [[bc,'tra-loi-sai-buoc'],[ab+(ab+k),'nham-gap-them'],[ab,'thieu-buoc'],[T+1,'nham-bang']];
    return {type:'num', _lv:lv, _ab:ab, _k:k, _bc:bc, q:gapKhucABC(ab,bc,true)+'<div>Đường gấp khúc ABC có đoạn AB dài <b>'+ab+' cm</b>. Đoạn BC dài <b>gấp '+k+' lần</b> đoạn AB.</div><div class="mt-1">'+(lv<=1 ? 'Hỏi đoạn BC dài bao nhiêu xăng-ti-mét?' : 'Hỏi đường gấp khúc ABC dài bao nhiêu xăng-ti-mét?')+'</div>', ans:ans, unit:'cm', sai:nhanSai(sai, ans),
      goiY:gy({'tra-loi-sai-buoc':'Bé tìm độ dài BC trước ('+ab+' × '+k+'), rồi cộng với AB.', 'thieu-buoc':'Đường gấp khúc ABC gồm hai đoạn AB và BC. Bé cộng cả hai.'})};
  }, check:function(q){
    var f=docGK(q.q), ab=q._ab, k=q._k, bc=ab*k;
    return !!f && f.ab===ab && f.bc===bc && f.an===1 && q._bc===bc && ab+bc<100 && q.ans===(q._lv<=1 ? bc : ab+bc); }},

  /* D7 — Đề toán khớp sơ đồ (Luyện tập 3) */
  {name:'Đề toán khớp sơ đồ', sec:'Luyện tập 3 — Nêu bài toán theo sơ đồ: bao ngô 30 kg, bao gạo ít hơn bao ngô 10 kg', mt:['MT3'], levels:3,
   muc:['Chọn đề toán khớp sơ đồ (ít hơn hoặc nhiều hơn).', 'Đọc sơ đồ, tính cả hai bao (phần nét đứt hoặc phần vàng).', 'Chọn đề toán khớp sơ đồ có "gấp".'],
   make:function(lv){
    var th=pick([['ngô','gạo'],['đường','muối'],['gạo','đậu']]), a, k, kieu, T, de;
    function deText(rel, kk, hoi, aa){ return 'Bao '+th[0]+' nặng '+aa+' kg. Bao '+th[1]+' '+(rel==='it' ? 'nặng ít hơn bao '+th[0]+' '+kk+' kg' : (rel==='nhieu' ? 'nặng nhiều hơn bao '+th[0]+' '+kk+' kg' : 'nặng gấp '+kk+' lần bao '+th[0]))+'. Hỏi '+(hoi==='tong' ? 'cả hai bao nặng bao nhiêu ki-lô-gam?' : 'bao '+th[1]+' nặng bao nhiêu ki-lô-gam?'); }
    if(lv===2){ kieu=pick(['it','nhieu']); a=rnd(20,48); k=rnd(5,15); T=tongThuc(kieu,a,k);
      while(T>=100 || a-k<2){ a=rnd(20,48); k=rnd(5,15); T=tongThuc(kieu,a,k); }
      var ghi = kieu==='it' ? 'Phần nét đứt là phần bao '+th[1]+' ít hơn bao '+th[0]+'.' : 'Phần màu vàng là phần bao '+th[1]+' nhiều hơn bao '+th[0]+'.';
      return {type:'num', _lv:2, _a:a, _k:k, _kieu:kieu, q:soDoHai(kieu,a,k,cap(th[0]),cap(th[1]),'tong','kg')+'<div>Nhìn sơ đồ. '+ghi+' Hai bao nặng tất cả bao nhiêu ki-lô-gam?</div>', ans:T, unit:'kg',
        sai:nhanSai(kieu==='it' ? [[haiThuc(kieu,a,k),'tra-loi-sai-buoc'],[2*a+k,'nham-it-nhieu'],[a,'thieu-buoc'],[T+1,'nham-bang']] : [[haiThuc(kieu,a,k),'tra-loi-sai-buoc'],[2*a-k,'nham-it-nhieu'],[a,'thieu-buoc'],[T+1,'nham-bang']], T), goiY:gy()}; }
    if(lv<=1){ kieu=pick(['it','nhieu']); a=rnd(20,50); k=rnd(5,15); T=tongThuc(kieu,a,k); while(T>=100 || a-k<2){ a=rnd(20,50); k=rnd(5,15); T=tongThuc(kieu,a,k); }
      var g2=pick([2,3]); de=[[kieu,k,'tong',''],[kieu,k,'r2','tra-loi-sai-buoc'],[kieu==='it'?'nhieu':'it',k,'tong','nham-it-nhieu'],['gap',g2,'tong','nham-gap-them']]; }
    else { kieu='gap'; k=rnd(2,3); a=rnd(10,24); while(a*(k+1)>=100){ a=rnd(10,24); } T=tongThuc(kieu,a,k);
      de=[['gap',k,'tong',''],['gap',k,'r2','tra-loi-sai-buoc'],['nhieu',k,'tong','nham-gap-them'],['it',k,'tong','nham-it-nhieu']]; }
    shuffle(de); var ch=de.map(function(d){ return deText(d[0],d[1],d[2],a); }), dung=deText(kieu,k,'tong',a), sai={};
    de.forEach(function(d,i){ if(d[3]) sai[String(i)]=d[3]; });
    return {type:'mcq', cot:1, _lv:lv, _a:a, _k:k, _kieu:kieu, _de:de, _dung:dung, q:soDoHai(kieu,a,k,cap(th[0]),cap(th[1]),'tong','kg')+'<div>Đề toán nào khớp với sơ đồ?</div>', choices:ch, correct:ch.indexOf(dung), sai:sai,
      goiY:gy({'chung':'Bé nhìn sơ đồ: bao '+th[1]+' dài hơn hay ngắn hơn, và có hỏi cả hai bao không?'})};
  }, check:function(q){
    if(q._lv===2) return kiemSoDo(q) && q.ans===tongThuc(q._kieu,q._a,q._k) && q.ans<100;
    var kh=q._de.filter(function(d){ return d[0]===q._kieu && d[1]===q._k && d[2]==='tong'; });
    return kiemSoDo(q) && kiemMCQ(q) && q._de.length===4 && kh.length===1 && q.choices.length===4 && q._de.filter(function(d){ return d[3]===''; }).length===1 && tongThuc(q._kieu,q._a,q._k)<100; }},

  /* D8 — Tìm lỗi trong bài hai bước (không có trong SGK) */
  {name:'Tìm lỗi trong bài hai bước', sec:'Tìm lỗi — Đúng hay sai; bạn An còn thiếu bước nào; bạn An nói đúng hay sai', mt:['MT4'], levels:3,
   muc:['Đúng / Sai: số hoa hồng là x bông.', 'Bạn An làm một bước rồi dừng: còn thiếu bước nào.', 'Bạn An nói số hoa của cả hai loại: em thấy thế nào?'],
   make:function(lv){
    var a=rnd(3,9), k=rnd(2,5), b=a+k, T=a+b;
    if(lv<=1){ var dung=Math.random()<0.5, x = dung ? b : pick([T, a-k>0 ? a-k : b+1, a*k===b ? b+2 : a*k].filter(function(v){ return v!==b; })), tag = x===T ? 'tra-loi-sai-buoc' : (x===a*k ? 'nham-gap-them' : 'nham-it-nhieu');
      return {type:'mcq', figFn:dsBtn28, _lv:1, _a:a, _k:k, _x:x, _dung:(x===b?'Đ':'S'), q:'<div>Có <b>'+a+' bông hoa cúc</b>. Số hoa hồng nhiều hơn số hoa cúc <b>'+k+' bông</b>.</div><div class="text-xl font-extrabold text-orange-700 my-2">Số hoa hồng là '+x+' bông.</div><div class="text-base text-slate-500">Đúng (Đ) hay sai (S)?</div>', choices:['Đ','S'], correct:(x===b?0:1), sai:(x===b?{}:{'0':tag}), goiY:gy()}; }
    if(lv===2){ var dg='Cộng số hoa cúc với số hoa hồng: '+a+' + '+b, ds=[[dg,''],['Trừ số hoa hồng đi số hoa cúc: '+b+' '+TRU+' '+a,'chon-sai-phep'],['Nhân số hoa cúc với '+k+': '+a+' × '+k,'nham-gap-them'],['Không thiếu bước nào, '+b+' đã là đáp số','thieu-buoc']];
      shuffle(ds); var ch=ds.map(function(d){ return d[0]; }), sai={}; ds.forEach(function(d,i){ if(d[1]) sai[String(i)]=d[1]; });
      return {type:'mcq', cot:1, _lv:2, _a:a, _k:k, _dung:dg, q:nguoi('boy','Bạn An')+'<div>Có '+a+' bông hoa cúc. Số hoa hồng nhiều hơn số hoa cúc '+k+' bông. Hỏi cả hai loại hoa có bao nhiêu bông? Bạn An tính '+a+' + '+k+' = '+b+' rồi trả lời: «Cả hai loại có '+b+' bông.» Bạn An còn thiếu bước nào?</div>', choices:ch, correct:ch.indexOf(dg), sai:sai, goiY:gy()}; }
    var x2 = Math.random()<0.5 ? T : (Math.random()<0.6 ? b : T+pick([-2,-1,1,2])), mo=function(n){ return a+' + '+b+' = '+n; }, hnx=haiNhanXet(x2, T, mo), sai3={}; sai3[String(1-hnx.correct)] = x2===b ? 'thieu-buoc' : 'nham-bang';
    return {type:'mcq', cot:1, _lv:3, _a:a, _k:k, _x:x2, _T:T, _ds:hnx.ds, _dung:hnx.choices[hnx.correct], q:nguoi('boy','Bạn An')+'<div>Có '+a+' bông hoa cúc. Số hoa hồng nhiều hơn số hoa cúc '+k+' bông, tức là '+b+' bông. Bạn An nói: «Cả hai loại hoa có <b>'+x2+'</b> bông.» Em thấy thế nào?</div>', choices:hnx.choices, correct:hnx.correct, sai:sai3, goiY:gy()};
  }, check:function(q){
    var a=q._a, k=q._k, b=a+k, T=a+b;
    if(q._lv<=1) return q.choices.join()==='Đ,S' && (q._dung==='Đ')===(q._x===b) && q.correct===(q._x===b?0:1) && T<100;
    if(q._lv===2) return kiemMCQ(q) && q.choices.length===4 && q.choices.filter(function(c){ return c==='Cộng số hoa cúc với số hoa hồng: '+a+' + '+b; }).length===1 && q._dung==='Cộng số hoa cúc với số hoa hồng: '+a+' + '+b;
    return kiemNhanXet(q) && q._T===T && T<100; }},

  /* D9 — Chọn dãy phép tính (không có trong SGK) */
  {name:'Chọn dãy phép tính', sec:'Chọn dãy hai phép tính đúng cho bài toán nhiều hơn, ít hơn, gấp', mt:['MT4'], levels:3,
   muc:['Bài toán nhiều hơn: chọn dãy hai phép tính.', 'Bài toán ít hơn: chọn dãy hai phép tính.', 'Bài toán gấp: chọn dãy hai phép tính.'],
   make:function(lv){
    var kieu = lv<=1 ? 'nhieu' : (lv===2 ? 'it' : 'gap'), tn=pick(CAP_TEN), a, k, b, op1;
    if(kieu==='nhieu'){ a=rnd(5,12); k=rnd(2,6); op1='+'; } else if(kieu==='it'){ a=rnd(10,20); k=rnd(3,8); op1=TRU; } else { a=rnd(4,9); k=rnd(2,4); op1='×'; }
    var p1=pt(a,op1,k); b=p1.r;
    var ok=[p1, pt(a,'+',b)], ds=[[ok,'']];
    if(kieu==='nhieu'){ var q1=pt(a,TRU,k); ds.push([[q1,pt(a,'+',q1.r)],'nham-it-nhieu']); ds.push([[p1,pt(b,TRU,a)],'chon-sai-phep']); var q3=pt(a,'×',k); ds.push([[q3,pt(a,'+',q3.r)],'nham-gap-them']); }
    else if(kieu==='it'){ var r1=pt(a,'+',k); ds.push([[r1,pt(a,'+',r1.r)],'nham-it-nhieu']); ds.push([[p1,pt(a,TRU,b)],'chon-sai-phep']); var r3=pt(a,'×',k); ds.push([[r3,pt(a,'+',r3.r)],'nham-gap-them']); }
    else { var s1=pt(a,'+',k); ds.push([[s1,pt(a,'+',s1.r)],'nham-gap-them']); ds.push([[p1,pt(b,TRU,a)],'chon-sai-phep']); ds.push([[p1],'thieu-buoc']); }
    var txt=function(o){ return o.map(function(p){ return p.s; }).join(', rồi '); };
    shuffle(ds); var ch=ds.map(function(d){ return txt(d[0]); }), dung=txt(ok), sai={}; ds.forEach(function(d,i){ if(d[1]) sai[String(i)]=d[1]; });
    var lead = tn[0]+' có <b>'+a+' chiếc bút</b>. '+tn[1]+' có '+(kieu==='nhieu' ? 'nhiều hơn '+tn[0]+' <b>'+k+' chiếc bút</b>' : (kieu==='it' ? 'ít hơn '+tn[0]+' <b>'+k+' chiếc bút</b>' : '<b>gấp '+k+' lần</b> số bút của '+tn[0]))+'.';
    return {type:'mcq', cot:1, _lv:lv, _a:a, _k:k, _kieu:kieu, _ds:ds.map(function(d){ return d[0]; }), _dung:dung, q:'<div>'+lead+'</div><div class="mt-1">Hỏi hai bạn có tất cả bao nhiêu chiếc bút? Chọn các phép tính đúng.</div>', choices:ch, correct:ch.indexOf(dung), sai:sai,
      goiY:gy({'chung':'Bé tìm số bút của '+tn[1]+' trước, rồi cộng với số bút của '+tn[0]+'.'})};
  }, check:function(q){
    var a=q._a, k=q._k, op = q._kieu==='nhieu' ? '+' : (q._kieu==='it' ? TRU : '×'), b = q._kieu==='nhieu' ? a+k : (q._kieu==='it' ? a-k : a*k);
    var dem=q._ds.filter(function(o){ var p1=o[0], p2=o[1]; return p1.x===a && p1.op===op && p1.y===k && p1.r===b && p2 && p2.op==='+' && ((p2.x===a && p2.y===b) || (p2.x===b && p2.y===a)); }).length;
    return kiemMCQ(q) && q.choices.length===4 && dem===1 && b>0 && a+b<100; }}
 ]
};
