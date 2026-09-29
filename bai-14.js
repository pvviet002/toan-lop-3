/* bai-14.js — NỘI DUNG Bài 14 (Một phần mấy). Engine v2.
   Bám SGK trang in 42-45: Khám phá (1/2, 1/4) · HĐ1 Đ,S hình chữ nhật · HĐ2 Chọn cách đọc ·
   HĐ3 Khoanh 1/4 số hạt dẻ · LT1 Đ,S hình tròn · LT2 Tô màu 1/8 hình nào · LT3 Khoanh rau · LT4 Số?
   Hình riêng: phân số dọc, hình tròn/chữ nhật chia phần, bánh, hình tô màu, hạt dẻ/rau/quả xếp hàng.
   QUY TẮC: nối chuỗi, KHÔNG backtick và KHÔNG template literal. */

var DOC = ['', 'một', 'hai', 'ba', 'tư', 'năm', 'sáu', 'bảy', 'tám', 'chín'];
function docPS(n){ return 'Một phần ' + DOC[n]; }
/* Phân số 1/n viết dọc, theo cỡ + màu chữ xung quanh */
function fr(n){
  return '<span style="display:inline-flex;flex-direction:column;align-items:center;vertical-align:middle;line-height:1.05;margin:0 3px;font-weight:800">'
   +'<span>1</span><span style="border-top:2px solid currentColor;padding:0 3px;min-width:0.9em;text-align:center">'+n+'</span></span>';
}
function frBig(ch){ return '<span class="text-2xl text-slate-700">'+fr(parseInt(ch.split('/')[1],10))+'</span>'; }
function dsBtn(ch){ return '<span class="text-2xl font-extrabold text-slate-700">'+ch+'</span><span class="ml-2 text-base font-bold text-slate-600">'+(ch==='Đ'?'Đúng':'Sai')+'</span>'; }
/* n và các số gần n (trong [lo,hi]), đủ cnt số khác nhau, đã xáo */
function gan(n, lo, hi, cnt){
  var c=[n-1,n+1,n+2,n-2,n+3,n-3,n+4,n-4].filter(function(v){ return v>=lo && v<=hi; });
  var top=c.slice(0,Math.max(cnt+1,4)); shuffle(top);
  var out=[n].concat(top.slice(0,cnt-1)); shuffle(out); return out;
}
function pt(c, r, deg){ var a=deg*Math.PI/180; return (c+r*Math.cos(a)).toFixed(1)+' '+(c+r*Math.sin(a)).toFixed(1); }
function nanQuat(c, r, a0, a1){ return 'M'+c+' '+c+' L'+pt(c,r,a0)+' A'+r+' '+r+' 0 '+((a1-a0)>180?1:0)+' 1 '+pt(c,r,a1)+' Z'; }
function svgMo(w, h){ return '<svg width="'+w+'" height="'+h+'" viewBox="0 0 '+w+' '+h+'" style="max-width:100%;height:auto;display:inline-block">'; }

/* Hình tròn chia n phần bằng nhau, tô phần thứ s */
function tronPS(n, s, mau, size){
  size=size||150; var c=size/2, r=c-4, st=-90-180/n, d=360/n, h=svgMo(size,size);
  h+='<circle cx="'+c+'" cy="'+c+'" r="'+r+'" fill="#ffffff"/>';
  h+='<path d="'+nanQuat(c,r,st+s*d,st+(s+1)*d)+'" fill="'+(mau||'#38bdf8')+'"/>';
  for(var i=0;i<n;i++) h+='<line x1="'+c+'" y1="'+c+'" x2="'+pt(c,r,st+i*d).split(' ')[0]+'" y2="'+pt(c,r,st+i*d).split(' ')[1]+'" stroke="#1f2937" stroke-width="2.5"/>';
  return h+'<circle cx="'+c+'" cy="'+c+'" r="'+r+'" fill="none" stroke="#1f2937" stroke-width="3"/></svg>';
}
/* Hình chữ nhật chia n cột bằng nhau, tô cột s */
function hcnPS(n, s){
  var W=210, H=90, x0=3, y0=3, w=W-6, hh=H-6, cw=w/n, h=svgMo(W,H);
  h+='<rect x="'+x0+'" y="'+y0+'" width="'+w+'" height="'+hh+'" fill="#ffffff"/>';
  h+='<rect x="'+(x0+s*cw).toFixed(1)+'" y="'+y0+'" width="'+cw.toFixed(1)+'" height="'+hh+'" fill="#38bdf8"/>';
  for(var i=1;i<n;i++) h+='<line x1="'+(x0+i*cw).toFixed(1)+'" y1="'+y0+'" x2="'+(x0+i*cw).toFixed(1)+'" y2="'+(y0+hh)+'" stroke="#1f2937" stroke-width="2.5"/>';
  return h+'<rect x="'+x0+'" y="'+y0+'" width="'+w+'" height="'+hh+'" fill="none" stroke="#1f2937" stroke-width="3"/></svg>';
}
/* Chiếc bánh chia n miếng bằng nhau; miếng trên cùng tô cam, có ghi 1/n nếu ghi=true */
function banh(n, ghi){
  var S=150, c=75, st=-90-180/n, d=360/n, h=svgMo(S,S);
  h+='<circle cx="75" cy="75" r="71" fill="#fcd34d" stroke="#b45309" stroke-width="2"/>';
  h+='<circle cx="75" cy="75" r="61" fill="#fff7ed"/>';
  h+='<path d="'+nanQuat(c,61,st,st+d)+'" fill="#fdba74"/>';
  for(var i=0;i<n;i++) h+='<line x1="75" y1="75" x2="'+pt(c,71,st+i*d).split(' ')[0]+'" y2="'+pt(c,71,st+i*d).split(' ')[1]+'" stroke="#b45309" stroke-width="2"/>';
  if(ghi){
    var p=pt(c, n<=2?34:38, -90).split(' '), x=+p[0], y=+p[1];
    h+='<text x="'+x+'" y="'+(y-6)+'" text-anchor="middle" font-size="17" font-weight="800" fill="#7c2d12" font-family="system-ui,Segoe UI,Roboto,sans-serif">1</text>';
    h+='<line x1="'+(x-8)+'" y1="'+(y)+'" x2="'+(x+8)+'" y2="'+(y)+'" stroke="#7c2d12" stroke-width="2"/>';
    h+='<text x="'+x+'" y="'+(y+16)+'" text-anchor="middle" font-size="17" font-weight="800" fill="#7c2d12" font-family="system-ui,Segoe UI,Roboto,sans-serif">'+n+'</text>';
  }
  return h+'</svg>';
}
/* Hình tô màu (LT2): mã 'dai:m:s' | 'luoi:m:r:c:ri:ci' | 'kim:8' | 'tam:4' | 'tron:m:s' */
function hinhTo(ch){
  var p=ch.split(':'), t=p[0], S=112, a=4, b=108, m=(b-a), V='#fbbf24', K='stroke="#1f2937" stroke-width="2.5"', h;
  if(t==='tron') return tronPS(+p[1], +p[2], V, 112);
  h=svgMo(S,S)+'<rect x="'+a+'" y="'+a+'" width="'+m+'" height="'+m+'" fill="#ffffff"/>';
  if(t==='dai'){ var n=+p[1], s=+p[2], w=m/n;
    h+='<rect x="'+(a+s*w).toFixed(1)+'" y="'+a+'" width="'+w.toFixed(1)+'" height="'+m+'" fill="'+V+'"/>';
    for(var i=1;i<n;i++) h+='<line x1="'+(a+i*w).toFixed(1)+'" y1="'+a+'" x2="'+(a+i*w).toFixed(1)+'" y2="'+b+'" '+K+'/>';
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
function soPhanHinh(ch){ return parseInt(ch.split(':')[1],10); }
function taoHinh(m){
  var o=['dai:'+m+':'+rnd(0,m-1)];
  if(m>=3) o.push('tron:'+m+':'+rnd(0,m-1));
  var L={4:[2,2],6:[2,3],8:[2,4],9:[3,3]};
  if(L[m]){ var r=L[m][0], c=L[m][1]; o.push('luoi:'+m+':'+r+':'+c+':'+rnd(0,r-1)+':'+rnd(0,c-1)); }
  if(m===8){ o.push('kim:8'); o.push('kim:8'); }
  if(m===4) o.push('tam:4');
  return pick(o);
}
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
function khoanh(ch){
  var p=ch.split(':'), L=p[0], r=+p[1], c=+p[2], md=p[3], k=+p[4], lo=p[5], o=30, pd=9, W=c*o+pd*2, H=r*o+pd*2, h=svgMo(W,H);
  h+='<rect x="1" y="1" width="'+(W-2)+'" height="'+(H-2)+'" rx="10" fill="#fef9ec" stroke="#a8a29e" stroke-width="1.5"/>';
  for(var i=0;i<r;i++) for(var j=0;j<c;j++) h+=vat(lo, pd+j*o+o/2, pd+i*o+o/2);
  if(md==='h') h+='<rect x="'+(pd+1)+'" y="'+(pd+k*o+1)+'" width="'+(c*o-2)+'" height="'+(o-2)+'" rx="'+((o-2)/2)+'" fill="none" stroke="#dc2626" stroke-width="2.5"/>';
  else h+='<rect x="'+(pd+k*o+1)+'" y="'+(pd+1)+'" width="'+(o-2)+'" height="'+(r*o-2)+'" rx="'+((o-2)/2)+'" fill="none" stroke="#dc2626" stroke-width="2.5"/>';
  return '<div class="flex flex-col items-center gap-1">'+h+'</svg><div class="text-lg font-extrabold text-slate-700">'+L+'</div></div>';
}
function cauKhoanh(lo, ten){
  var G=pick([[2,3],[3,2],[2,4],[4,2],[2,5],[5,2],[3,4],[4,3],[3,5],[5,3]]), r=G[0], c=G[1];   /* tối đa 5 cột: hình không bị thu quá nhỏ trên điện thoại */
  var ds=[{md:'h',k:rnd(0,r-1),ps:r},{md:'c',k:rnd(0,c-1),ps:c}]; shuffle(ds);
  var hoi=pick([r,c]), ch=[];
  for(var i=0;i<2;i++) ch.push(['A','B'][i]+':'+r+':'+c+':'+ds[i].md+':'+ds[i].k+':'+lo);
  return {type:'mcq', figFn:khoanh, _k:hoi, q:'<div>Đã khoanh vào '+fr(hoi)+' số '+ten+' của hình nào?</div>', choices:ch, correct:(khoanhPS(ch[0])===hoi?0:1)};
}
function kiemKhoanh(q){ var t=q.choices.filter(function(c){ return khoanhPS(c)===q._k; }).length; return t===1 && khoanhPS(q.choices[q.correct])===q._k && q.choices[0]!==q.choices[1]; }
function kiemDS(q){ return q.choices.join()==='Đ,S' && q.correct===(q._k===q._n?0:1) && q._k>=2; }
function cauDS(n, hinh, ten){
  var k = Math.random()<0.5 ? n : (n>2 && Math.random()<0.6 ? n-1 : n+1);   /* bẫy hay gặp: đếm phần CHƯA tô (n-1) */
  return {type:'mcq', figFn:dsBtn, _n:n, _k:k, q:'<div class="flex justify-center mb-2">'+hinh+'</div><div>Đã tô màu '+fr(k)+' '+ten+'.</div><div class="text-base text-slate-500 mt-1">Đúng (Đ) hay sai (S)?</div>', choices:['Đ','S'], correct:(k===n?0:1)};
}

var BAI = {
 n: 14,
 title: 'Một Phần Mấy',
 sub: 'Bé chọn một hoạt động rồi luyện tập nhé!',
 goal: 10,
 topics: [
  {name:'Khám phá', sec:'Khám phá — Một phần hai, một phần tư', make:function(){
    var n=pick([2,2,3,4,4]), ns=gan(n,2,6,4);
    return {type:'mcq', figFn:frBig, _n:n, q:'<div class="flex justify-center mb-2">'+tronPS(n, rnd(0,n-1))+'</div>'
      +'<div class="text-base text-slate-600 mb-1">Hình tròn được chia thành các phần bằng nhau, tô màu 1 phần.</div>'
      +'<div>Đã tô màu <b>một phần mấy</b> hình tròn?</div>', choices:ns.map(function(v){ return '1/'+v; }), correct:ns.indexOf(n)};
  }, check:function(q){ return q.choices[q.correct]==='1/'+q._n && new Set(q.choices).size===q.choices.length && q.choices.length===4; }},

  {name:'Đ/S chữ nhật', sec:'Hoạt động 1 — Đ, S? (hình chữ nhật)', make:function(){
    var n=rnd(2,6); return cauDS(n, hcnPS(n, rnd(0,n-1)), 'hình chữ nhật');
  }, check:kiemDS},

  {name:'Cách đọc', sec:'Hoạt động 2 — Chọn cách đọc phù hợp với cách viết', make:function(){
    if(Math.random()<0.6){
      var n=rnd(2,6), ns=gan(n,2,9,4);
      return {type:'mcq', _n:n, _doc:true, q:'<div class="flex justify-center mb-2">'+banh(n,true)+'</div><div>Miếng bánh tô màu là '+fr(n)+' chiếc bánh. Đọc là gì?</div>',
        choices:ns.map(docPS), correct:ns.indexOf(n)};
    }
    var m=rnd(2,9), ms=gan(m,2,9,4);
    return {type:'mcq', figFn:frBig, _n:m, _doc:false, q:'<div class="text-2xl font-extrabold text-orange-700 my-2">« '+docPS(m)+' »</div><div>Chọn cách viết phù hợp:</div>',
      choices:ms.map(function(v){ return '1/'+v; }), correct:ms.indexOf(m)};
  }, check:function(q){ var ok = q._doc ? q.choices[q.correct]===docPS(q._n) : q.choices[q.correct]==='1/'+q._n; return ok && new Set(q.choices).size===4; }},

  {name:'Hạt dẻ', sec:'Hoạt động 3 — Đã khoanh vào một phần mấy số hạt dẻ?', make:function(){
    return cauKhoanh('hatde', 'hạt dẻ');
  }, check:kiemKhoanh},

  {name:'Đ/S hình tròn', sec:'Luyện tập 1 — Đ, S? (hình tròn)', make:function(){
    var n=rnd(3,9); return cauDS(n, tronPS(n, rnd(0,n-1)), 'hình tròn');
  }, check:kiemDS},

  {name:'Tô màu hình nào', sec:'Luyện tập 2 — Đã tô màu một phần mấy của hình nào?', make:function(){
    var k=pick([3,4,5,6,7,8,8,9]), ms=gan(k,2,9,4), ch=ms.map(taoHinh);
    return {type:'mcq', figFn:hinhTo, _k:k, q:'<div>Đã tô màu '+fr(k)+' hình nào?</div>', choices:ch, correct:ms.indexOf(k)};
  }, check:function(q){ var t=q.choices.filter(function(c){ return soPhanHinh(c)===q._k; }).length; return t===1 && soPhanHinh(q.choices[q.correct])===q._k && new Set(q.choices).size===4; }},

  {name:'Khoanh rau', sec:'Luyện tập 3 — Đã khoanh vào một phần mấy số cây?', make:function(){
    return Math.random()<0.5 ? cauKhoanh('caibap', 'cây cải bắp') : cauKhoanh('xalach', 'cây xà lách');
  }, check:kiemKhoanh},

  {name:'Chia đều', sec:'Luyện tập 4 — Số?', make:function(){
    var k=rnd(2,5), m=rnd(2,6), N=k*m, lo=pick(['tao','cam']), ten=(lo==='tao'?'táo':'cam'), hinh='';
    if(Math.random()<0.5){   /* như Mẫu: đã chia sẵn thành k nhóm */
      var cc=Math.min(m,3), rr=Math.ceil(m/cc), o=24;
      for(var g=0;g<k;g++){ var W=cc*o+12, H=rr*o+12, s=svgMo(W,H)+'<rect x="1" y="1" width="'+(W-2)+'" height="'+(H-2)+'" rx="14" fill="#e0f2fe" stroke="#7dd3fc" stroke-width="1.5"/>';
        for(var i=0;i<m;i++) s+=vat(lo, 6+(i%cc)*o+o/2, 6+Math.floor(i/cc)*o+o/2);
        hinh+=s+'</svg>'; }
      hinh='<div class="flex flex-wrap justify-center gap-2 mb-2">'+hinh+'</div>';
    } else {                 /* như câu hỏi: quả để rời, bé tự chia */
      var cols=(N<=6?N:(N%5===0?5:(N%4===0?4:6))), rows=Math.ceil(N/cols), o2=26, W2=cols*o2+12, H2=rows*o2+12, s2=svgMo(W2,H2)+'<rect x="1" y="1" width="'+(W2-2)+'" height="'+(H2-2)+'" rx="12" fill="#fef9ec" stroke="#a8a29e" stroke-width="1.5"/>';
      for(var i2=0;i2<N;i2++) s2+=vat(lo, 6+(i2%cols)*o2+o2/2, 6+Math.floor(i2/cols)*o2+o2/2);
      hinh='<div class="flex justify-center mb-2">'+s2+'</svg></div>';
    }
    return {type:'num', _k:k, _N:N, q:hinh+'<div class="text-base text-slate-600">Chia '+N+' quả '+ten+' thành '+k+' phần bằng nhau.</div>'
      +'<div>'+fr(k)+' số quả '+ten+' là <b class="text-amber-700">?</b> quả '+ten+'.</div>', ans:m, unit:'quả'};
  }, check:function(q){ return q.ans*q._k===q._N && q.ans>=2; }}
 ]
};
