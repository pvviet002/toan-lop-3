/* bai-14.js — Bài 14: Một phần mấy. Engine v2 — LUYỆN THÔNG MINH.
   Theo bảng phân tích sư phạm đã duyệt (phan-tich-su-pham/bai-14.md):
   5 MỤC TIÊU (muctieu) × 11 DẠNG (topics), mỗi dạng 3 mức (Thông tư 27: Nhận biết · Hiểu · Vận dụng).
   Mức 1 = số nhỏ như sách, lựa chọn khác hẳn nhau · Mức 2 = số lớn hơn, bẫy quen thuộc (đếm phần chưa tô)
   · Mức 3 = tình huống mới: các phần KHÔNG bằng nhau, hai hình cùng số vật xếp khác, bài toán có lời.
   Mỗi câu gắn nhãn lỗi cho đáp án nhiễu (q.sai) + gợi ý (q.goiY). Bốn nhãn riêng của bài khai báo ở BAI.loi.
   Hình riêng: phân số dọc, hình tròn/chữ nhật chia phần, bánh, hình tô màu, hạt dẻ/rau/quả xếp hàng. Không dùng emoji.
   QUY TẮC: nối chuỗi, KHÔNG backtick và KHÔNG template literal. */

var DOC = ['', 'một', 'hai', 'ba', 'tư', 'năm', 'sáu', 'bảy', 'tám', 'chín', 'mười'];
function docPS(n){ return 'Một phần ' + DOC[n]; }
/* Phân số 1/n viết dọc, theo cỡ + màu chữ xung quanh */
function fr(n){
  return '<span style="display:inline-flex;flex-direction:column;align-items:center;vertical-align:middle;line-height:1.05;margin:0 3px;font-weight:800">'
   +'<span>1</span><span style="border-top:2px solid currentColor;padding:0 3px;min-width:0.9em;text-align:center">'+n+'</span></span>';
}
function frBig(ch){ return '<span class="text-2xl text-slate-700">'+fr(parseInt(ch.split('/')[1],10))+'</span>'; }
function dsBtn(ch){ return '<span class="text-2xl font-extrabold text-slate-700">'+ch+'</span><span class="ml-2 text-base font-bold text-slate-600">'+(ch==='Đ'?'Đúng':'Sai')+'</span>'; }
/* n và cnt-1 số GẦN n trong [lo,hi], đã xáo */
function gan(n, lo, hi, cnt){
  var c=[n-1,n+1,n+2,n-2,n+3,n-3,n+4,n-4].filter(function(v){ return v>=lo && v<=hi; });
  var top=c.slice(0,Math.max(cnt+1,4)); shuffle(top);
  var out=[n].concat(top.slice(0,cnt-1)); shuffle(out); return out;
}
/* n và cnt-1 số XA n (lệch >= 2) trong [lo,hi], đã xáo — dùng cho Mức 1 */
function xa(n, lo, hi, cnt){
  var c=[]; for(var v=lo;v<=hi;v++) if(Math.abs(v-n)>=2) c.push(v);
  shuffle(c); var out=[n].concat(c.slice(0,cnt-1)); shuffle(out); return out;
}
/* n phần KHÔNG bằng nhau (tỉ lệ lớn nhất/nhỏ nhất >= 1.8), tổng = 1 */
function phanLech(n){
  var w; do { w=[]; for(var i=0;i<n;i++) w.push(rnd(4,16)); } while(Math.max.apply(null,w)/Math.min.apply(null,w)<1.8);
  var t=w.reduce(function(a,b){ return a+b; },0); return w.map(function(x){ return x/t; });
}
function pt(c, r, deg){ var a=deg*Math.PI/180; return (c+r*Math.cos(a)).toFixed(1)+' '+(c+r*Math.sin(a)).toFixed(1); }
function nanQuat(c, r, a0, a1){ return 'M'+c+' '+c+' L'+pt(c,r,a0)+' A'+r+' '+r+' 0 '+((a1-a0)>180?1:0)+' 1 '+pt(c,r,a1)+' Z'; }
function svgMo(w, h){ return '<svg width="'+w+'" height="'+h+'" viewBox="0 0 '+w+' '+h+'" style="max-width:100%;height:auto;display:inline-block">'; }
function tia(c, r, a){ var p=pt(c,r,a).split(' '); return '<line x1="'+c+'" y1="'+c+'" x2="'+p[0]+'" y2="'+p[1]+'" stroke="#1f2937" stroke-width="2.5"/>'; }

/* Hình tròn chia n phần, tô phần s. goc (tuỳ chọn) = mảng n tỉ lệ -> các phần KHÔNG bằng nhau */
function tronPS(n, s, mau, size, goc){
  size=size||150; var c=size/2, r=c-4, h=svgMo(size,size), g=goc||null, a=[], cur=-90-(g?g[0]*180:180/n);
  for(var i=0;i<=n;i++){ a.push(cur); if(i<n) cur+= g ? g[i]*360 : 360/n; }
  h+='<circle cx="'+c+'" cy="'+c+'" r="'+r+'" fill="#ffffff"/>';
  h+='<path d="'+nanQuat(c,r,a[s],a[s+1])+'" fill="'+(mau||'#38bdf8')+'"/>';
  for(var j=0;j<n;j++) h+=tia(c,r,a[j]);
  return h+'<circle cx="'+c+'" cy="'+c+'" r="'+r+'" fill="none" stroke="#1f2937" stroke-width="3"/></svg>';
}
/* Hình chữ nhật chia n cột, tô cột s. rong (tuỳ chọn) = mảng n tỉ lệ bề rộng -> cột KHÔNG bằng nhau */
function hcnPS(n, s, rong){
  var W=210, H=90, x0=3, y0=3, w=W-6, hh=H-6, h=svgMo(W,H), x=[x0];
  for(var i=0;i<n;i++) x.push(x[i] + (rong ? rong[i] : 1/n)*w);
  h+='<rect x="'+x0+'" y="'+y0+'" width="'+w+'" height="'+hh+'" fill="#ffffff"/>';
  h+='<rect x="'+x[s].toFixed(1)+'" y="'+y0+'" width="'+(x[s+1]-x[s]).toFixed(1)+'" height="'+hh+'" fill="#38bdf8"/>';
  for(var j=1;j<n;j++) h+='<line x1="'+x[j].toFixed(1)+'" y1="'+y0+'" x2="'+x[j].toFixed(1)+'" y2="'+(y0+hh)+'" stroke="#1f2937" stroke-width="2.5"/>';
  return h+'<rect x="'+x0+'" y="'+y0+'" width="'+w+'" height="'+hh+'" fill="none" stroke="#1f2937" stroke-width="3"/></svg>';
}
/* Chiếc bánh chia n miếng bằng nhau; miếng trên cùng tô cam, có ghi 1/n nếu ghi=true */
function banh(n, ghi){
  var S=150, c=75, st=-90-180/n, d=360/n, h=svgMo(S,S);
  h+='<circle cx="75" cy="75" r="71" fill="#fcd34d" stroke="#b45309" stroke-width="2"/>';
  h+='<circle cx="75" cy="75" r="61" fill="#fff7ed"/>';
  h+='<path d="'+nanQuat(c,61,st,st+d)+'" fill="#fdba74"/>';
  for(var i=0;i<n;i++){ var p=pt(c,71,st+i*d).split(' '); h+='<line x1="75" y1="75" x2="'+p[0]+'" y2="'+p[1]+'" stroke="#b45309" stroke-width="2"/>'; }
  if(ghi){
    var q=pt(c, n<=2?34:40, -90).split(' '), x=+q[0], y=+q[1], fs=(n>=7?15:17);
    h+='<text x="'+x+'" y="'+(y-6)+'" text-anchor="middle" font-size="'+fs+'" font-weight="800" fill="#7c2d12" font-family="system-ui,Segoe UI,Roboto,sans-serif">1</text>';
    h+='<line x1="'+(x-7)+'" y1="'+y+'" x2="'+(x+7)+'" y2="'+y+'" stroke="#7c2d12" stroke-width="2"/>';
    h+='<text x="'+x+'" y="'+(y+15)+'" text-anchor="middle" font-size="'+fs+'" font-weight="800" fill="#7c2d12" font-family="system-ui,Segoe UI,Roboto,sans-serif">'+n+'</text>';
  }
  return h+'</svg>';
}
/* Hình tô màu (LT2): 'dai:m:s' | 'luoi:m:r:c:ri:ci' | 'kim:8' | 'tam:4' | 'tron:m:s' | 'lech:m:s:w1-w2-…' (dải KHÔNG bằng nhau) */
function hinhTo(ch){
  var p=ch.split(':'), t=p[0], S=112, a=4, b=108, m=(b-a), V='#fbbf24', K='stroke="#1f2937" stroke-width="2.5"', h;
  if(t==='tron') return tronPS(+p[1], +p[2], V, 112);
  h=svgMo(S,S)+'<rect x="'+a+'" y="'+a+'" width="'+m+'" height="'+m+'" fill="#ffffff"/>';
  if(t==='dai' || t==='lech'){
    var n=+p[1], s=+p[2], ww=(t==='lech') ? p[3].split('-').map(Number) : null, tong=ww?ww.reduce(function(x,y){ return x+y; },0):n, xs=[a];
    for(var i=0;i<n;i++) xs.push(xs[i] + (ww?ww[i]:1)/tong*m);
    h+='<rect x="'+xs[s].toFixed(1)+'" y="'+a+'" width="'+(xs[s+1]-xs[s]).toFixed(1)+'" height="'+m+'" fill="'+V+'"/>';
    for(var i1=1;i1<n;i1++) h+='<line x1="'+xs[i1].toFixed(1)+'" y1="'+a+'" x2="'+xs[i1].toFixed(1)+'" y2="'+b+'" '+K+'/>';
  } else if(t==='luoi'){ var r=+p[2], c=+p[3], ri=+p[4], ci=+p[5], cw=m/c, rh=m/r;
    h+='<rect x="'+(a+ci*cw).toFixed(1)+'" y="'+(a+ri*rh).toFixed(1)+'" width="'+cw.toFixed(1)+'" height="'+rh.toFixed(1)+'" fill="'+V+'"/>';
    for(var i2=1;i2<c;i2++) h+='<line x1="'+(a+i2*cw).toFixed(1)+'" y1="'+a+'" x2="'+(a+i2*cw).toFixed(1)+'" y2="'+b+'" '+K+'/>';
    for(var j=1;j<r;j++) h+='<line x1="'+a+'" y1="'+(a+j*rh).toFixed(1)+'" x2="'+b+'" y2="'+(a+j*rh).toFixed(1)+'" '+K+'/>';
  } else if(t==='kim'){   /* hai đường giữa + hình thoi nối trung điểm -> 8 tam giác bằng nhau */
    h+='<path d="M4 56 L56 4 L56 56 Z" fill="'+V+'"/>';
    h+='<line x1="56" y1="4" x2="56" y2="108" '+K+'/><line x1="4" y1="56" x2="108" y2="56" '+K+'/>';
    h+='<path d="M56 4 L108 56 L56 108 L4 56 Z" fill="none" '+K+'/>';
  } else if(t==='tam'){   /* hai đường chéo -> 4 tam giác bằng nhau */
    h+='<path d="M4 4 L108 4 L56 56 Z" fill="'+V+'"/>';
    h+='<line x1="4" y1="4" x2="108" y2="108" '+K+'/><line x1="108" y1="4" x2="4" y2="108" '+K+'/>';
  }
  return h+'<rect x="'+a+'" y="'+a+'" width="'+m+'" height="'+m+'" fill="none" stroke="#1f2937" stroke-width="3"/></svg>';
}
/* Số phần BẰNG NHAU của hình (hình 'lech' không phải "một phần mấy" -> 0) */
function soPhanHinh(ch){ return ch.split(':')[0]==='lech' ? 0 : parseInt(ch.split(':')[1],10); }
function taoHinh(m){
  var o=['dai:'+m+':'+rnd(0,m-1)];
  if(m>=3) o.push('tron:'+m+':'+rnd(0,m-1));
  var L={4:[2,2],6:[2,3],8:[2,4],9:[3,3]};
  if(L[m]){ var r=L[m][0], c=L[m][1]; o.push('luoi:'+m+':'+r+':'+c+':'+rnd(0,r-1)+':'+rnd(0,c-1)); }
  if(m===8){ o.push('kim:8'); o.push('kim:8'); }
  if(m===4) o.push('tam:4');
  return pick(o);
}
function hinhLech(m){ var w=phanLech(m).map(function(x){ return Math.round(x*100); }); return 'lech:'+m+':'+rnd(0,m-1)+':'+w.join('-'); }

/* Vật nhỏ vẽ lại (tâm x,y) */
function vat(loai, x, y){
  if(loai==='hatde') return '<ellipse cx="'+x+'" cy="'+(y+3)+'" rx="8" ry="9" fill="#b45309"/><ellipse cx="'+x+'" cy="'+(y-4)+'" rx="9.5" ry="5" fill="#78350f"/><rect x="'+(x-1)+'" y="'+(y-12)+'" width="2" height="5" fill="#78350f"/>';
  if(loai==='caibap') return '<circle cx="'+x+'" cy="'+y+'" r="11" fill="#86efac" stroke="#15803d" stroke-width="1.5"/><circle cx="'+x+'" cy="'+y+'" r="6" fill="#bbf7d0" stroke="#16a34a" stroke-width="1"/><path d="M'+x+' '+(y-10)+' Q'+(x+3)+' '+y+' '+x+' '+(y+10)+'" stroke="#15803d" stroke-width="1.2" fill="none"/>';
  if(loai==='xalach') return '<ellipse cx="'+x+'" cy="'+(y-1)+'" rx="4.5" ry="11" fill="#a3e635" stroke="#4d7c0f" stroke-width="1.2"/>'
      +'<ellipse cx="'+(x-6)+'" cy="'+(y+1)+'" rx="4" ry="9.5" fill="#bef264" stroke="#4d7c0f" stroke-width="1.2" transform="rotate(-28 '+(x-6)+' '+(y+1)+')"/>'
      +'<ellipse cx="'+(x+6)+'" cy="'+(y+1)+'" rx="4" ry="9.5" fill="#bef264" stroke="#4d7c0f" stroke-width="1.2" transform="rotate(28 '+(x+6)+' '+(y+1)+')"/>';
  if(loai==='tao') return '<circle cx="'+x+'" cy="'+(y+1)+'" r="9" fill="#ef4444" stroke="#b91c1c" stroke-width="1.2"/><rect x="'+(x-0.8)+'" y="'+(y-11)+'" width="1.6" height="5" fill="#78350f"/><ellipse cx="'+(x+4)+'" cy="'+(y-8)+'" rx="4" ry="2" fill="#16a34a"/>';
  return '<circle cx="'+x+'" cy="'+(y+1)+'" r="9" fill="#fb923c" stroke="#c2410c" stroke-width="1.2"/><ellipse cx="'+(x+3)+'" cy="'+(y-8)+'" rx="4" ry="2" fill="#16a34a"/>';
}
/* Hình khoanh (HĐ3, LT3): mã 'CHỮ:r:c:h|c:chỉ số:vật' — lưới r hàng × c cột, khoanh 1 hàng (1/r) hoặc 1 cột (1/c) */
function khoanhPS(ch){ var p=ch.split(':'); return p[3]==='h' ? +p[1] : +p[2]; }
/* Số vật nằm trong vòng khoanh: khoanh 1 hàng thì có c vật, khoanh 1 cột thì có r vật */
function soVatKhoanh(ch){ var p=ch.split(':'); return p[3]==='h' ? +p[2] : +p[1]; }
function khoanh(ch){
  var p=ch.split(':'), L=p[0], r=+p[1], c=+p[2], md=p[3], k=+p[4], lo=p[5], o=30, pd=9, W=c*o+pd*2, H=r*o+pd*2, h=svgMo(W,H);
  h+='<rect x="1" y="1" width="'+(W-2)+'" height="'+(H-2)+'" rx="10" fill="#fef9ec" stroke="#a8a29e" stroke-width="1.5"/>';
  for(var i=0;i<r;i++) for(var j=0;j<c;j++) h+=vat(lo, pd+j*o+o/2, pd+i*o+o/2);
  if(md==='h') h+='<rect x="'+(pd+1)+'" y="'+(pd+k*o+1)+'" width="'+(c*o-2)+'" height="'+(o-2)+'" rx="'+((o-2)/2)+'" fill="none" stroke="#dc2626" stroke-width="2.5"/>';
  else h+='<rect x="'+(pd+k*o+1)+'" y="'+(pd+1)+'" width="'+(o-2)+'" height="'+(r*o-2)+'" rx="'+((o-2)/2)+'" fill="none" stroke="#dc2626" stroke-width="2.5"/>';
  return '<div class="flex flex-col items-center gap-1">'+h+'</svg><div class="text-lg font-extrabold text-slate-700">'+L+'</div></div>';
}

/* ---- Tiện ích riêng bài 14 (nhãn lỗi, kiểm) ---- */
/* Bảng nhãn lỗi cho đáp số: ds = [[giá trị, nhãn], …]; bỏ giá trị <= 0 hoặc trùng đáp án đúng */
function nhanSai(ds, dung){ var o={}; ds.forEach(function(p){ var v=p[0]; if(v>0 && v!==dung && !(String(v) in o)) o[String(v)]=p[1]; }); return o; }
function kiemMCQ(q){ return q.choices[q.correct]===q._dung && new Set(q.choices).size===q.choices.length; }
/* Nhãn lỗi cho các lựa chọn "1/v": v = n−1 là đếm phần chưa tô; còn lại là đếm lệch số phần */
function saiPS(ns, n){ var o={}; ns.forEach(function(v,i){ if(v!==n) o[String(i)] = (v===n-1 ? 'dem-phan-chua-to' : 'lech-nhom'); }); return o; }
var GOIY_PS = {
  'dem-phan-chua-to':'Bé đếm TẤT CẢ các phần bằng nhau của hình, cả phần đã tô màu.',
  'lech-nhom':'Bé đếm lại số phần bằng nhau của hình nhé!',
  'phan-khong-bang':'Muốn nói một phần mấy, các phần phải BẰNG NHAU. Bé nhìn xem các phần có bằng nhau không.',
  'dem-vat-khoanh':'Bé đếm xem hình chia được mấy PHẦN bằng nhau, không đếm số vật được khoanh.',
  'doc-nham':'Bé nhớ: 1/2 một phần hai, 1/3 một phần ba, 1/4 một phần tư, 1/5 một phần năm.'
};

/* Mức 1: lưới nhỏ · Mức 2: lưới lớn — cùng lưới, một hình khoanh hàng, một hình khoanh cột.
   Mức 3: HAI lưới cùng số vật nhưng xếp khác (r×c và c×r), cùng khoanh một hàng -> phải đếm số phần, không đếm số vật khoanh. */
function cauKhoanh(lo, ten, lv){
  var ch=[], hoi, ds;
  if(lv>=3){
    var G3=pick([[2,3],[2,4],[2,5],[3,4],[3,5]]), md=pick(['h','c']);
    var g1=[G3[0],G3[1]], g2=[G3[1],G3[0]]; ds=[g1,g2]; shuffle(ds);
    for(var i=0;i<2;i++){ var rr=ds[i][0], cc=ds[i][1]; ch.push(['A','B'][i]+':'+rr+':'+cc+':'+md+':'+rnd(0,(md==='h'?rr:cc)-1)+':'+lo); }
    hoi=khoanhPS(ch[rnd(0,1)]);
  } else {
    var G=pick(lv<=1 ? [[2,3],[3,2],[2,4],[4,2]] : [[2,5],[5,2],[3,4],[4,3],[3,5],[5,3]]), r=G[0], c=G[1];
    ds=[{md:'h',k:rnd(0,r-1)},{md:'c',k:rnd(0,c-1)}]; shuffle(ds);
    for(var j=0;j<2;j++) ch.push(['A','B'][j]+':'+r+':'+c+':'+ds[j].md+':'+ds[j].k+':'+lo);
    hoi=pick([r,c]);
  }
  var dung=(khoanhPS(ch[0])===hoi?0:1), sai={}, sg=1-dung;   /* lựa chọn sai: nếu số vật khoanh đúng bằng số hỏi thì là lỗi đếm vật */
  sai[String(sg)] = soVatKhoanh(ch[sg])===hoi ? 'dem-vat-khoanh' : 'lech-nhom';
  return {type:'mcq', figFn:khoanh, _k:hoi, q:'<div>Đã khoanh vào '+fr(hoi)+' số '+ten+' của hình nào?</div>', choices:ch, correct:dung, sai:sai, goiY:GOIY_PS};
}
function kiemKhoanh(q){ var t=q.choices.filter(function(c){ return khoanhPS(c)===q._k; }).length; return t===1 && khoanhPS(q.choices[q.correct])===q._k; }
/* Đ, S: n phần; câu nói "1/k". Mức 1: k=n hoặc lệch xa · Mức 2: bẫy đếm phần CHƯA tô (n-1) hoặc n+1 · Mức 3: thêm hình có các phần KHÔNG bằng nhau */
function cauDS(n, lv, veBang, veLech, ten){
  var bang=true, k;
  if(lv>=3 && Math.random()<0.4){ bang=false; k=n; }
  else if(Math.random()<0.5) k=n;
  else if(lv<=1) k=n+pick([2,3]);
  else k=(n>2 && Math.random()<0.6) ? n-1 : n+1;
  var hinh = bang ? veBang(n) : veLech(n), dung=((bang && k===n)?0:1), sai={};
  if(dung===1) sai['0'] = !bang ? 'phan-khong-bang' : (k===n-1 ? 'dem-phan-chua-to' : 'lech-nhom');   /* chọn Đ nhầm */
  return {type:'mcq', figFn:dsBtn, _n:n, _k:k, _bang:bang, q:'<div class="flex justify-center mb-2">'+hinh+'</div><div>Đã tô màu '+fr(k)+' '+ten+'.</div><div class="text-base text-slate-500 mt-1">Đúng (Đ) hay sai (S)?</div>', choices:['Đ','S'], correct:dung, sai:sai, goiY:GOIY_PS};
}
function kiemDS(q){ return q.choices.join()==='Đ,S' && q.correct===((q._bang && q._k===q._n)?0:1) && q._k>=2; }

var BAI = {
 n: 14,
 title: 'Một Phần Mấy',
 sub: 'Luyện thông minh: câu hỏi tự đổi theo bé — làm hết lượt để xem ngọn lửa!',
 goal: 10, soCau: 18, soCauToiDa: 24,
 loi: {'dem-phan-chua-to':'Đếm số phần chưa tô thay vì tổng số phần', 'dem-vat-khoanh':'Đếm số vật được khoanh thay vì số phần bằng nhau',
       'phan-khong-bang':'Quên kiểm tra các phần có bằng nhau không', 'doc-nham':'Nhầm cách đọc'},
 muctieu: [
  {id:'MT1', ten:'Nhận ra một phần mấy trên hình', muc:['Nhận ra một phần hai, một phần ba, một phần tư trên hình tròn hoặc hình khác hẳn nhau.', 'Đếm số phần bằng nhau khi hình chia 3–9 phần, các lựa chọn gần giống nhau.', 'Chọn hình đúng khi có hình đủ số phần nhưng các phần KHÔNG bằng nhau.']},
  {id:'MT2', ten:'Đọc, viết một phần mấy', muc:['Đọc đúng một phần hai, một phần ba, một phần tư, một phần năm.', 'Đọc và viết tới một phần sáu (nhớ: một phần TƯ).', 'Chuyển qua lại cách đọc – cách viết tới một phần chín, các lựa chọn rất gần nhau.']},
  {id:'MT3', ten:'Các phần phải bằng nhau', muc:['Đếm số phần bằng nhau (2–5 phần) để biết câu nói đúng hay sai.', 'Không nhầm với số phần CHƯA tô màu; hình chia tới 9 phần (9 phần mà ghi 1/8).', 'Nhận ra các phần KHÔNG bằng nhau thì không gọi là một phần mấy.']},
  {id:'MT4', ten:'Một phần mấy của nhóm vật', muc:['Hình ít vật: biết khoanh một hàng hay một cột là một phần mấy.', 'Hình nhiều vật (10–15), đếm số hàng, số cột cẩn thận.', 'Hai hình cùng số vật xếp khác nhau: đếm số PHẦN bằng nhau, không đếm số vật khoanh.']},
  {id:'MT5', ten:'Tìm một phần mấy của một số', muc:['Tìm một phần mấy khi quả đã được chia sẵn thành các nhóm bằng nhau; một nửa của số nhỏ.', 'Tự chia đều số quả (có hình) để tìm một phần mấy; chọn phép chia.', 'Bài toán có lời: tìm một phần mấy, hoặc tìm phần CÒN LẠI (hai bước).']}
 ],
 topics: [
  /* D1 — Hình tròn chia phần (Khám phá — Một phần hai, một phần tư) */
  {name:'Hình tròn', sec:'Khám phá — Một phần hai, một phần tư', mt:['MT1'], levels:3,
   muc:['Nhận ra một phần hai, một phần tư trên hình tròn.', 'Nhận ra một phần mấy khi hình tròn chia 3–6 phần, các lựa chọn gần giống nhau.', 'Đếm đúng khi hình tròn chia nhiều phần nhỏ (6–9 phần).'],
   make:function(lv){
    var n, ns;
    if(lv<=1){ n=pick([2,4]); ns=xa(n,2,9,3); }
    else if(lv===2){ n=rnd(3,6); ns=gan(n,2,9,4); }
    else { n=rnd(6,9); ns=gan(n,2,10,4); }
    return {type:'mcq', figFn:frBig, _n:n, q:'<div class="flex justify-center mb-2">'+tronPS(n, rnd(0,n-1))+'</div>'
      +'<div class="text-base text-slate-600 mb-1">Hình tròn được chia thành các phần bằng nhau, tô màu 1 phần.</div>'
      +'<div>Đã tô màu <b>một phần mấy</b> hình tròn?</div>', choices:ns.map(function(v){ return '1/'+v; }), correct:ns.indexOf(n), sai:saiPS(ns, n), goiY:GOIY_PS};
  }, check:function(q){ return q.choices[q.correct]==='1/'+q._n && new Set(q.choices).size===q.choices.length; }},

  /* D2 — Đã tô màu một phần mấy của hình nào? (Luyện tập 2) */
  {name:'Tô màu hình nào', sec:'Luyện tập 2 — Đã tô màu một phần mấy của hình nào?', mt:['MT1'], levels:3,
   muc:['Chọn hình tô một phần hai, một phần ba, một phần tư — các hình khác hẳn nhau.',
        'Đếm số phần bằng nhau trên nhiều kiểu hình (lưới ô, tam giác, dải, hình tròn).',
        'Loại hình có đủ số phần nhưng các phần KHÔNG bằng nhau.'],
   make:function(lv){
    var k, ms, ch;
    if(lv<=1){ k=pick([2,3,4]); ms=xa(k,2,9,3); ch=ms.map(taoHinh); }
    else if(lv===2){ k=pick([4,5,6,7,8,9]); ms=gan(k,2,9,4); ch=ms.map(taoHinh); }
    else {   /* 1 hình đúng + 2 hình gần + 1 hình đủ k phần nhưng KHÔNG bằng nhau */
      k=pick([4,5,6,8]); var g=gan(k,2,9,3); ch=g.map(taoHinh).concat([hinhLech(k)]); shuffle(ch);
      ms=ch.map(soPhanHinh);
    }
    var sai={}; ch.forEach(function(c,i){ var m=soPhanHinh(c); if(m!==k) sai[String(i)] = m===0 ? 'phan-khong-bang' : 'lech-nhom'; });
    return {type:'mcq', figFn:hinhTo, _k:k, q:'<div>Đã tô màu '+fr(k)+' hình nào?</div>', choices:ch, correct:ms.indexOf(k), sai:sai, goiY:GOIY_PS};
  }, check:function(q){ var t=q.choices.filter(function(c){ return soPhanHinh(c)===q._k; }).length; return t===1 && soPhanHinh(q.choices[q.correct])===q._k && new Set(q.choices).size===q.choices.length; }},

  /* D3 — Chọn cách đọc phù hợp với cách viết (Hoạt động 2) */
  {name:'Cách đọc', sec:'Hoạt động 2 — Chọn cách đọc phù hợp với cách viết', mt:['MT2'], levels:3,
   muc:['Đọc đúng một phần hai, một phần ba, một phần tư, một phần năm.',
        'Đọc và viết được một phần mấy tới một phần sáu (nhớ: một phần TƯ).',
        'Chuyển qua lại cách đọc – cách viết tới một phần chín, các lựa chọn rất gần nhau.'],
   make:function(lv){
    var xuoi = lv<=1 ? true : Math.random()<0.5, n, ns;
    if(lv<=1){ n=rnd(2,5); ns=xa(n,2,9,3); }
    else if(lv===2){ n=rnd(2,6); ns=gan(n,2,9,4); }
    else { n=rnd(5,9); ns=gan(n,2,10,4); }
    var sai={}; ns.forEach(function(v,i){ if(v!==n) sai[String(i)]='doc-nham'; });
    if(xuoi) return {type:'mcq', _n:n, _doc:true, q:'<div class="flex justify-center mb-2">'+banh(n,true)+'</div><div>Miếng bánh tô màu là '+fr(n)+' chiếc bánh. Đọc là gì?</div>',
        choices:ns.map(docPS), correct:ns.indexOf(n), sai:sai, goiY:GOIY_PS};
    return {type:'mcq', figFn:frBig, _n:n, _doc:false, q:'<div class="text-2xl font-extrabold text-orange-700 my-2">« '+docPS(n)+' »</div><div>Chọn cách viết phù hợp:</div>',
      choices:ns.map(function(v){ return '1/'+v; }), correct:ns.indexOf(n), sai:sai, goiY:GOIY_PS};
  }, check:function(q){ var ok = q._doc ? q.choices[q.correct]===docPS(q._n) : q.choices[q.correct]==='1/'+q._n; return ok && new Set(q.choices).size===q.choices.length; }},

  /* D4 — Đọc đúng hay sai? (không có trong SGK) */
  {name:'Đọc đúng hay sai', sec:'Đọc đúng hay sai — Bạn đọc, viết có đúng không?', mt:['MT2'], levels:3,
   muc:['Biết cách đọc đúng một phần hai … một phần năm.', 'Đúng hay sai tới một phần sáu.', 'Đúng hay sai tới một phần chín, các cách đọc gần nhau.'],
   make:function(lv){
    var n = lv<=1 ? rnd(2,5) : (lv===2 ? rnd(2,6) : rnd(3,9)), laDung=Math.random()<0.5, m=n;
    if(!laDung){ m = lv<=1 ? pick([2,3,4,5].filter(function(v){ return Math.abs(v-n)>=2; })) : n+pick([-1,1]); if(!(m>=2 && m<=(lv<=1?5:(lv===2?6:9)))) m=n+(n>2?-1:1); }
    var viet = lv>=3 && Math.random()<0.5, cau;
    if(viet) cau='<div class="text-2xl font-extrabold text-orange-700 my-2">« '+docPS(m)+' » viết là '+fr(n)+'</div>';
    else cau='<div class="text-2xl font-extrabold text-orange-700 my-2">'+fr(n)+' đọc là « '+docPS(m)+' »</div>';
    var dung=(m===n?'Đ':'S');
    return {type:'mcq', figFn:dsBtn, _n:n, _m:m, _dung:dung, q:cau+'<div class="text-base text-slate-500">Đúng (Đ) hay sai (S)?</div>', choices:['Đ','S'], correct:(m===n?0:1), sai:(m===n?{}:{'0':'doc-nham'}), goiY:GOIY_PS};
  }, check:function(q){ return q.choices.join()==='Đ,S' && q.correct===(q._m===q._n?0:1) && q._n>=2 && q._m>=2 && kiemMCQ(q); }},

  /* D5 — Đ, S? hình chữ nhật (Hoạt động 1) */
  {name:'Đ/S chữ nhật', sec:'Hoạt động 1 — Đ, S? (hình chữ nhật)', mt:['MT3'], levels:3,
   muc:['Đếm số phần bằng nhau (2–4 phần) để biết câu nói đúng hay sai.',
        'Không nhầm với số phần CHƯA tô màu, hình chia tới 6 phần.',
        'Nhận ra các phần KHÔNG bằng nhau thì không gọi là một phần mấy.'],
   make:function(lv){
    var n = lv<=1 ? rnd(2,4) : (lv===2 ? rnd(3,6) : rnd(4,7)), s=rnd(0,n-1);
    return cauDS(n, lv, function(m){ return hcnPS(m, s); }, function(m){ return hcnPS(m, s, phanLech(m)); }, 'hình chữ nhật');
  }, check:kiemDS},

  /* D6 — Đ, S? hình tròn (Luyện tập 1): có cả hình chia phần không bằng nhau, và hình chia 9 phần mà ghi 1/8 */
  {name:'Đ/S hình tròn', sec:'Luyện tập 1 — Đ, S? (hình tròn)', mt:['MT3'], levels:3,
   muc:['Đếm số phần bằng nhau của hình tròn (3–5 phần).',
        'Hình tròn chia nhiều phần (5–9), không nhầm với số phần chưa tô.',
        'Nhận ra hình tròn chia thành các phần KHÔNG bằng nhau.'],
   make:function(lv){
    var n = lv<=1 ? rnd(3,5) : rnd(5,9), s=rnd(0,n-1);
    return cauDS(n, lv, function(m){ return tronPS(m, s); }, function(m){ return tronPS(m, s, null, 150, phanLech(m)); }, 'hình tròn');
  }, check:kiemDS},

  /* D7 — Khoanh hạt dẻ (Hoạt động 3) */
  {name:'Hạt dẻ', sec:'Hoạt động 3 — Đã khoanh vào một phần mấy số hạt dẻ?', mt:['MT4'], levels:3,
   muc:['Hình ít hạt: biết khoanh một hàng hay một cột là một phần mấy.',
        'Hình nhiều hạt hơn (10–15 hạt), đếm số hàng, số cột cẩn thận.',
        'Hai hình cùng số hạt nhưng xếp khác nhau — đếm số PHẦN bằng nhau, không đếm số hạt được khoanh.'],
   make:function(lv){ return cauKhoanh('hatde', 'hạt dẻ', lv); }, check:kiemKhoanh},

  /* D8 — Khoanh rau (Luyện tập 3) */
  {name:'Khoanh rau', sec:'Luyện tập 3 — Đã khoanh vào một phần mấy số cây?', mt:['MT4'], levels:3,
   muc:['Luống ít cây: biết khoanh một hàng hay một cột là một phần mấy.',
        'Luống nhiều cây (10–15 cây), đếm số hàng, số cột cẩn thận.',
        'Hai luống cùng số cây nhưng xếp khác nhau — đếm số PHẦN bằng nhau, không đếm số cây được khoanh.'],
   make:function(lv){ return Math.random()<0.5 ? cauKhoanh('caibap', 'cây cải bắp', lv) : cauKhoanh('xalach', 'cây xà lách', lv); }, check:kiemKhoanh},

  /* D9 — Chia đều: tìm một phần mấy số quả (Luyện tập 4) */
  {name:'Chia đều', sec:'Luyện tập 4 — Số?', mt:['MT5'], levels:3,
   muc:['Tìm một phần mấy khi quả đã được chia sẵn thành các nhóm bằng nhau.',
        'Tự chia đều số quả (có hình) để tìm một phần mấy.',
        'Giải bài toán có lời văn: tìm một phần mấy, hoặc tìm phần CÒN LẠI (hai bước).'],
   make:function(lv){
    var k, m, N, lo=pick(['tao','cam']), ten=(lo==='tao'?'táo':'cam'), hinh='';
    if(lv>=3){
      k=rnd(2,5); m=rnd(3,9); N=k*m;
      var tt=pick([['Lớp 3A có '+N+' bạn.', 'số bạn là tổ Một', 'Tổ Một có mấy bạn?', 'bạn', 'bạn còn lại không ở tổ Một'],
                   ['Mẹ có '+N+' quả trứng.', 'số trứng mẹ đã dùng làm bánh', 'Mẹ đã dùng mấy quả trứng?', 'quả', 'quả trứng mẹ còn lại'],
                   ['Thư viện có '+N+' quyển truyện.', 'số truyện đã cho các bạn mượn', 'Đã cho mượn mấy quyển?', 'quyển', 'quyển truyện còn lại trong thư viện']]);
      var con = Math.random()<0.5;
      return {type:'num', _k:k, _N:N, _con:con, q:'<div>'+tt[0]+' '+fr(k)+' '+tt[1]+'.</div>'
        +'<div class="mt-1">'+(con ? ('Hỏi có bao nhiêu '+tt[4]+'?') : tt[2])+'</div>', ans:(con? N-m : m), unit:tt[3],
        sai: con ? nhanSai([[m,'thieu-buoc'],[N,'dao-vai'],[k,'dao-vai']], N-m) : nhanSai([[N,'dao-vai'],[k,'dao-vai'],[N-m,'chon-sai-phep'],[N*k,'chon-sai-phep']], m),
        goiY: con ? {'thieu-buoc':'Bé đã tìm được '+fr(k)+' số đó là '+m+'. Còn bước lấy '+N+' trừ đi '+m+'!', 'dao-vai':'Bé tìm phần CÒN LẠI: lấy tổng trừ đi phần đã dùng.'}
                  : {'dao-vai':'Bé chia '+N+' thành '+k+' phần bằng nhau. Một phần có mấy?', 'chon-sai-phep':'Tìm một phần mấy thì dùng phép chia: '+N+' : '+k+'.'}};
    }
    k = lv<=1 ? rnd(2,3) : rnd(2,5); m = lv<=1 ? rnd(2,4) : rnd(2,6); N=k*m;
    if(lv<=1){   /* như Mẫu: đã chia sẵn thành k nhóm */
      var cc=Math.min(m,3), rr=Math.ceil(m/cc), o=24;
      for(var g=0;g<k;g++){ var W=cc*o+12, H=rr*o+12, s=svgMo(W,H)+'<rect x="1" y="1" width="'+(W-2)+'" height="'+(H-2)+'" rx="14" fill="#e0f2fe" stroke="#7dd3fc" stroke-width="1.5"/>';
        for(var i=0;i<m;i++) s+=vat(lo, 6+(i%cc)*o+o/2, 6+Math.floor(i/cc)*o+o/2);
        hinh+=s+'</svg>'; }
      hinh='<div class="flex flex-wrap justify-center gap-2 mb-2">'+hinh+'</div>';
    } else {     /* như câu hỏi SGK: quả để rời, bé tự chia */
      var cols=(N<=6?N:(N%5===0?5:(N%4===0?4:6))), rows=Math.ceil(N/cols), o2=26, W2=cols*o2+12, H2=rows*o2+12, s2=svgMo(W2,H2)+'<rect x="1" y="1" width="'+(W2-2)+'" height="'+(H2-2)+'" rx="12" fill="#fef9ec" stroke="#a8a29e" stroke-width="1.5"/>';
      for(var i2=0;i2<N;i2++) s2+=vat(lo, 6+(i2%cols)*o2+o2/2, 6+Math.floor(i2/cols)*o2+o2/2);
      hinh='<div class="flex justify-center mb-2">'+s2+'</svg></div>';
    }
    return {type:'num', _k:k, _N:N, _con:false, q:hinh+'<div class="text-base text-slate-600">Chia '+N+' quả '+ten+' thành '+k+' phần bằng nhau.</div>'
      +'<div>'+fr(k)+' số quả '+ten+' là <b class="text-amber-700">?</b> quả '+ten+'.</div>', ans:m, unit:'quả',
      sai:nhanSai([[N,'dao-vai'],[k,'dao-vai'],[m-1,'lech-nhom'],[m+1,'lech-nhom']], m),
      goiY:{'dao-vai':'Bé chia '+N+' quả thành '+k+' phần bằng nhau. Một phần có mấy quả?', 'lech-nhom':'Bé chia đều lại: mỗi phần có mấy quả '+ten+'?'}};
  }, check:function(q){ return q._N%q._k===0 && (q._con ? q.ans===q._N-q._N/q._k : q.ans*q._k===q._N) && q.ans>=1; }},

  /* D10 — Một phần mấy của một số (không có trong SGK) */
  {name:'Một phần mấy của số', sec:'Một phần mấy của một số — không có hình', mt:['MT5'], levels:3,
   muc:['Tìm một nửa, một phần ba của số nhỏ.', 'Tìm một phần mấy (tới một phần năm) của một số.', 'Tìm một phần mấy rồi tìm phần CÒN LẠI.'],
   make:function(lv){
    var n = lv<=1 ? pick([2,3]) : rnd(2,5), m = lv<=1 ? rnd(2,5) : rnd(2,9), N=n*m, v=pick(['quả cam','cái kẹo','quyển truyện','bông hoa']);
    if(lv>=3){
      return {type:'num', _n:n, _N:N, _con:true, q:'<div>Có '+N+' '+v+'. Đã lấy '+fr(n)+' số '+v+'.</div><div class="mt-1">Hỏi còn lại bao nhiêu '+v+'?</div>', ans:N-m, unit:'',
        sai:nhanSai([[m,'thieu-buoc'],[N,'dao-vai'],[N-n,'chon-sai-phep']], N-m), goiY:{'thieu-buoc':'Bé đã tìm được số '+v+' đã lấy: '+m+'. Còn bước lấy '+N+' trừ đi '+m+'!', 'dao-vai':'Bài hỏi số còn lại, không phải tổng.', 'chon-sai-phep':'Tìm '+fr(n)+' của '+N+' thì dùng phép chia '+N+' : '+n+'.'}}; }
    return {type:'num', _n:n, _N:N, _con:false, q:'<div>Có '+N+' '+v+'.</div><div class="mt-1">'+fr(n)+' số '+v+' là bao nhiêu '+v+'?</div>', ans:m, unit:'',
      sai:nhanSai([[N,'dao-vai'],[n,'dao-vai'],[N-n,'chon-sai-phep'],[N*n,'chon-sai-phep'],[m-1,'lech-nhom'],[m+1,'lech-nhom']], m),
      goiY:{'dao-vai':'Bé chia '+N+' thành '+n+' phần bằng nhau. Một phần là bao nhiêu?', 'chon-sai-phep':'Tìm '+fr(n)+' của '+N+' thì dùng phép chia: '+N+' : '+n+'.', 'lech-nhom':'Bé nhẩm: '+n+' × mấy = '+N+'?'}};
  }, check:function(q){ return q._N%q._n===0 && q.ans===(q._con ? q._N-q._N/q._n : q._N/q._n) && q.ans>=1; }},

  /* D11 — Chọn phép tính (không có trong SGK) */
  {name:'Chọn phép tính', sec:'Chọn phép tính — không cần tính ra kết quả', mt:['MT5'], levels:3,
   muc:['Chọn phép chia để tìm một nửa số vật.', 'Chọn phép chia để tìm một phần mấy số vật.', 'Chọn biểu thức hai bước (tìm một phần mấy rồi tìm phần còn lại).'],
   make:function(lv){
    var n = lv<=1 ? 2 : rnd(3,5), m=rnd(2,9), N=n*m, v=pick(['quả cam','cái kẹo','quyển truyện','bông hoa']), ds, q;
    if(lv<=2){
      ds=[[N+' : '+n,''], [N+' × '+n,'chon-sai-phep'], [N+' − '+n,'chon-sai-phep'], [n+' : '+N,'dao-vai']];
      q='<div>Có '+N+' '+v+'.</div><div class="mt-1">Phép tính nào tìm được '+fr(n)+' số '+v+'?</div>';
    } else {
      n=rnd(2,5); m=rnd(2,9); N=n*m;
      ds=[[N+' − '+N+' : '+n,''], [N+' : '+n,'thieu-buoc'], [N+' + '+N+' : '+n,'chon-sai-phep'], [N+' : '+n+' − '+n,'dao-vai']];
      q='<div>Có '+N+' '+v+'. Đã lấy '+fr(n)+' số '+v+'.</div><div class="mt-1">Phép tính nào tìm được <b>số '+v+' còn lại</b>?</div>';
    }
    var dung=ds[0][0]; shuffle(ds);
    var ch=ds.map(function(d){ return d[0]; }), sai={}; ds.forEach(function(d,i){ if(d[1]) sai[String(i)]=d[1]; });
    return {type:'mcq', cot:1, _dung:dung, q:q, choices:ch, correct:ch.indexOf(dung), sai:sai,
      goiY:{'chon-sai-phep':'Tìm một phần mấy của một số thì chia số đó cho số phần bằng nhau. Còn lại: bớt đi phần đã lấy.', 'dao-vai':'Bé xem lại: số nào là tổng, số nào là số phần bằng nhau?', 'thieu-buoc':'Bé mới tìm được số đã lấy. Còn bước lấy tổng trừ đi số đã lấy!'}};
  }, check:kiemMCQ}
 ]
};
