/* bai-46.js — Bài 46: So sánh các số trong phạm vi 10 000 (Tập 2, Chủ đề 8). BÀI MỚI, Engine v2 — LUYỆN THÔNG MINH.
   Theo bảng phân tích sư phạm đã duyệt (phan-tich-su-pham/bai-46.md, PR #39): 3 MỤC TIÊU (muctieu) × 10 DẠNG (topics), mỗi dạng 3 mức (Thông tư 27).
   Hình: caoBang (bốn cây cầu, mới), theSo (thẻ chữ số, chép từ bài 45). Số viết có khoảng trắng không ngắt ở hàng nghìn ("3 421").
   check() đọc lại hình từ chuỗi SVG (data-cau, data-m, data-the) hoặc từ trường _ của câu, rồi tính lại. QUY TẮC: nối chuỗi, KHÔNG backtick, KHÔNG template literal. */

/* ---- Tiện ích chung ---- */
function nhanSai(ds, dung){ var o={}; ds.forEach(function(p){ var v=p[0]; if(Number.isInteger(v) && v>0 && v!==dung && !(String(v) in o)) o[String(v)]=p[1]; }); return o; }
function kiemMCQ(q){ return q.choices[q.correct]===q._dung && new Set(q.choices).size===q.choices.length; }
function svgX(w, h, px){ return svgHinh(w, h, px).replace('<svg ', '<svg class="text-slate-700" '); }
function khungHinh(s){ return '<div class="flex justify-center my-2">'+s+'</svg></div>'; }
function bieuThucTo(t){ return '<div class="text-3xl font-extrabold text-orange-600 my-2">'+t+'</div>'; }
function nguoi(ten, alt){ return '<div class="flex justify-center mb-1">'+anh(ten, 72, alt)+'</div>'; }
var NB=' ';
function sx(n){ var s=String(n); return s.length>=4 ? s.slice(0,s.length-3)+NB+s.slice(-3) : s; }
function demKhong(n){ return (String(n).match(/0/g)||[]).length; }
function dau(a,b){ return a>b ? '>' : (a<b ? '<' : '='); }
function lapMCQ(dungStr, cacSai){
 var opts=[[dungStr,'']].concat(cacSai.slice(0,3)); opts=shuffle(opts); var sai={};
 opts.forEach(function(o,i){ if(o[0]!==dungStr) sai[String(i)]=o[1]; });
 var cs=opts.map(function(o){ return o[0]; });
 return {choices:cs, correct:cs.indexOf(dungStr), sai:sai, _dung:dungStr};
}
/* số bốn chữ số ngẫu nhiên (chữ số đầu khác 0); cs: các chữ số cần khác nhau? không bắt buộc */
function so4(){ return rnd(1,9)*1000+rnd(0,999); }
/* hai số bốn chữ số khác nhau đầu tiên ở vị trí vt (0 = hàng nghìn) */
function haiSoKhacTai(vt){
 for(var g=0; g<500; g++){
  var a=so4(), d=String(a).split(''), b=d.slice(), x;
  do { x=rnd(vt===0 ? 1 : 0, 9); } while(x===+d[vt]);
  b[vt]=String(x); for(var i=vt+1;i<4;i++) b[i]=String(rnd(0,9));
  var bn=+b.join(''); if(bn!==a) return [a,bn];
 }
 return [3143,2427];
}
function hoanVi4(){
 for(var g=0; g<300; g++){
  var d=shuffle([0,1,2,3,4,5,6,7,8,9]).slice(0,4), s={}, i, out=[];
  if(d.indexOf(0)>=0 && Math.random()<0.7) continue;
  for(i=0;i<40 && out.length<4;i++){ var p=shuffle(d.slice()); if(p[0]===0) continue; var v=+p.join(''); if(!s[v]){ s[v]=1; out.push(v); } }
  if(out.length===4) return out;
 }
 return [3768,6783,3687,6738];
}
var GOI={'so-sanh-hang':'Số nào có nhiều chữ số hơn thì lớn hơn. Cùng số chữ số thì so từng cặp chữ số từ trái sang phải, cặp nào khác nhau đầu tiên quyết định.',
  'sai-thu-tu':'Bé so từng số với số kia rồi xếp. Bé kiểm tra lại: bé đến lớn thì số sau lớn hơn số trước.',
  'so-0-dau':'Số có bốn chữ số thì chữ số 0 không được đứng đầu.',
  'so-chu-so':'Số có bốn chữ số nhỏ nhất là 1 000, lớn nhất là 9 999.',
  'quen-khac-nhau':'Đề bài nói các chữ số khác nhau thì không được lặp lại chữ số.',
  'so-phai-sang-trai':'Phải so từ chữ số hàng cao nhất (bên trái) trước, không so từ hàng đơn vị.',
  'nham-bang':'Bé tính giá trị biểu thức (cộng các hàng) rồi mới so sánh.'};
function gy(extra){ var o={}, k; for(k in GOI) o[k]=GOI[k]; for(k in (extra||{})) o[k]=extra[k]; return o; }

/* ---- Hình: bốn cây cầu (nhãn A, B, C, D và độ dài) ---- */
function cauHinh(ds){
 var o=svgX(300,134,300), i, x, y, g;
 for(i=0;i<ds.length;i++){
  x=4+(i%2)*148; y=2+Math.floor(i/2)*66;
  o+='<g data-cau="'+ds[i].t+'" data-m="'+ds[i].v+'"><rect x="'+(x+4)+'" y="'+(y+14)+'" width="134" height="8" rx="3" fill="'+HM.goDam+'"/><rect x="'+(x+30)+'" y="'+(y+22)+'" width="8" height="16" fill="'+HM.goDam+'"/><rect x="'+(x+104)+'" y="'+(y+22)+'" width="8" height="16" fill="'+HM.goDam+'"/>';
  o+='<line x1="'+(x+4)+'" y1="'+(y+40)+'" x2="'+(x+138)+'" y2="'+(y+40)+'" stroke="'+HM.troiDam+'" stroke-width="4" stroke-linecap="round"/>';
  o+='<text x="'+(x+71)+'" y="'+(y+60)+'" text-anchor="middle" font-size="15" '+HFONT+' fill="currentColor">Cầu '+ds[i].t+': '+sx(ds[i].v)+' m</text></g>';
 }
 return o+'</svg>';
}
function docCau(html){ var re=/data-cau="(\w)" data-m="(\d+)"/g, m, v=[]; while((m=re.exec(html))) v.push({t:m[1], v:+m[2]}); return v; }
function theSo(cs){
 var o=svgHinh(264,76,264), i;
 for(i=0;i<cs.length;i++){ o+='<rect data-the="'+cs[i]+'" x="'+(4+i*65)+'" y="4" width="58" height="68" rx="10" fill="#fff" stroke="'+HM.vangDam+'" stroke-width="4"/>'+chuSo(33+i*65, 38, cs[i], 38); }
 return khungHinh(o);
}
function docThe(html){ var re=/data-the="(\d)"/g, m, v=[]; while((m=re.exec(html))) v.push(+m[1]); return v; }
/* các số lập được từ thẻ, mỗi thẻ dùng một lần, chữ số 0 không đứng đầu */
function lapDuoc(cs){
 var seen={}, hs=[], i, j, k, l;
 for(i=0;i<4;i++) for(j=0;j<4;j++) for(k=0;k<4;k++) for(l=0;l<4;l++){ if(i===j||i===k||i===l||j===k||j===l||k===l) continue; if(cs[i]===0) continue; var p=cs[i]*1000+cs[j]*100+cs[k]*10+cs[l]; if(!seen[p]){ seen[p]=1; hs.push(p); } }
 return hs;
}
/* bài "vật nào dài/nặng/cao ... nhất": lv1 lớn nhất trong 3 số khác hàng nghìn; lv2 nhỏ nhất/lớn nhất trong 4 số; lv3 lớn thứ hai */
function bonVat(lv){
 var ns, g;
 if(lv<=1){ ns=shuffle([1,2,3,4,5,6,7,8,9]).slice(0,3).map(function(t){ return t*1000+rnd(0,999); }); }
 else if(lv===2){ ns=hoanVi4(); }
 else { for(g=0;g<1000;g++){ ns=hoanVi4(); var h=ns.slice().sort(function(a,b){ return a-b; }); if(h[3]-h[2]>=90) break; } }
 return ns;
}
function hoiVat(lv, cfg, hinhFn){
 var ns=bonVat(lv), ten=['A','B','C','D'].slice(0,ns.length), ds=ns.map(function(v,i){ return {t:ten[i], v:v}; }), kieu = lv<=1 ? 'max' : (lv===2 ? pick(['min','max']) : 'hai');
 var srt=ds.slice().sort(function(a,b){ return b.v-a.v; }), dung = kieu==='max' ? srt[0] : (kieu==='min' ? srt[srt.length-1] : srt[1]);
 var ch=ten.map(function(t){ return cfg.ten+' '+t; }), dungS=cfg.ten+' '+dung.t, sai={};
 ch.forEach(function(c,i){ if(c!==dungS) sai[String(i)]='so-sanh-hang'; });
 var liet = hinhFn ? hinhFn(ds) : '<div class="text-center">'+ds.map(function(d){ return '<div>'+cfg.ten+' '+d.t+': <b>'+sx(d.v)+' '+cfg.dv+'</b></div>'; }).join('')+'</div>';
 var hoi = cfg[kieu];
 return {type:'mcq', cot:2, _lv:lv, _vat:ds.map(function(d){ return d.t+':'+d.v; }).join(','), _kieu:kieu, _dung:dungS, q:'<div>'+cfg.mo+'</div>'+liet+'<div>'+cfg.ten+' nào <b>'+hoi+'</b>?</div>', choices:ch, correct:ch.indexOf(dungS), sai:sai, goiY:gy()};
}
function kiemVat(q){
 var ds=q._vat.split(',').map(function(s){ var p=s.split(':'); return {t:p[0], v:+p[1]}; }), vs=ds.map(function(d){ return d.v; });
 if(new Set(vs).size!==ds.length || vs.some(function(v){ return v<1000 || v>9999; }) || !kiemMCQ(q)) return false;
 var srt=ds.slice().sort(function(a,b){ return b.v-a.v; }), dung = q._kieu==='max' ? srt[0] : (q._kieu==='min' ? srt[srt.length-1] : srt[1]);
 if(q._lv<=1 && !(ds.length===3 && q._kieu==='max' && new Set(vs.map(function(v){ return Math.floor(v/1000); })).size===3)) return false;
 if(q._lv===2 && ds.length!==4) return false; if(q._lv===3 && !(ds.length===4 && q._kieu==='hai' && srt[0].v-srt[1].v>=90)) return false;
 return q._dung.slice(-1)===dung.t && q.choices.length===ds.length && ds.every(function(d){ return q.q.indexOf(sx(d.v))>=0; });
}
var CFG_CAU={ten:'Cầu', dv:'m', mo:'Bốn cây cầu có độ dài như hình.', max:'dài nhất', min:'ngắn nhất', hai:'dài thứ hai'};
var CFG_TUI={ten:'Túi', dv:'g', mo:'Các túi hạt dẻ có cân nặng như sau.', max:'nặng nhất', min:'nhẹ nhất', hai:'nặng thứ hai'};
var CFG_NUI={ten:'Núi', dv:'m', mo:'Độ cao của các đỉnh núi như sau.', max:'cao nhất', min:'thấp nhất', hai:'cao thứ hai'};

var CACHE8={};
var BAI = {
 n: 46,
 title: 'So Sánh Các Số Trong Phạm Vi 10 000',
 sub: 'Luyện thông minh: câu hỏi tự đổi theo bé — làm hết lượt để xem ngọn lửa!',
 goal: 10, soCau: 18, soCauToiDa: 24,
 loi: {'so-sanh-hang':'So sánh sai hàng, nhầm số chữ số', 'sai-thu-tu':'Xếp sai thứ tự', 'so-0-dau':'Để chữ số 0 đứng đầu', 'so-chu-so':'Nhầm số chữ số của số bé nhất, lớn nhất', 'quen-khac-nhau':'Quên các chữ số phải khác nhau', 'so-phai-sang-trai':'So từ hàng đơn vị thay vì từ hàng cao nhất', 'nham-bang':'Nhầm giá trị biểu thức khi so sánh'},
 muctieu: [
  {id:'MT1', ten:'So sánh hai số', muc:['Hai số khác số chữ số (998 và 2 021); đúng hay sai: 10 000 > 9 999.', 'Hai số cùng số chữ số (5 831 và 5 381); đúng hay sai với tổng các hàng.', 'So với biểu thức (4 100 ? 4 000 + 100); chọn câu đúng.']},
  {id:'MT2', ten:'Lớn nhất, bé nhất, xếp thứ tự', muc:['Số lớn nhất trong ba số; cầu dài nhất.', 'Bốn số cùng hàng nghìn; xếp từ bé đến lớn; túi nhẹ nhất; đỉnh núi cao nhất.', 'Dài (nặng, cao) thứ hai; xếp từ lớn đến bé.']},
  {id:'MT3', ten:'Đố về số', muc:['Số bé nhất, lớn nhất có bốn chữ số; lập số lớn nhất từ 4 thẻ.', 'Số bé nhất, lớn nhất có bốn chữ số khác nhau; số bé nhất từ thẻ có 0.', 'Số bé nhất, lớn nhất có bốn chữ số giống nhau; số lớn nhất bé hơn 5 000; bạn An so sánh sai.']}
 ],
 topics: [
  /* D1 — Điền >, <, = (bài 1) */
  {name:'Điền dấu >, <, =', sec:'Bài 1 — 998 < 2 021; 3 143 > 2 427; 856 ? 7 560; 5 831 ? 5 381; 4 100 ? 4 000 + 100; 3 257 ? 3 000 + 200 + 50 + 7', mt:['MT1'], levels:3,
   muc:['Hai số khác số chữ số.', 'Hai số cùng số chữ số, so từng cặp chữ số từ trái sang phải.', 'So một số với tổng các hàng (biểu thức).'],
   make:function(lv){
    var a, b, partsR=null, ve, xa;
    if(lv<=1){ a=rnd(100,999); b=so4(); if(Math.random()<0.5){ var t=a; a=b; b=t; } ve=sx(a)+' ? '+sx(b); xa=dau(a,b); }
    else if(lv===2){ var p=haiSoKhacTai(rnd(0,2)); a=p[0]; b=p[1]; ve=sx(a)+' ? '+sx(b); xa=dau(a,b); }
    else {
     var n, d, parts; do { n=so4(); d=String(n).split(''); parts=[+(d[0]+'000'), +(d[1]+'00'), +(d[2]+'0'), +d[3]].filter(function(x){ return x>0; }); } while(parts.length<3);
     if(Math.random()<0.3 && parts.length>2) parts=parts.slice(parts.length-2);
     var tong=parts.reduce(function(s,x){ return s+x; }, 0); partsR=parts;
     a = pick([tong, tong, tong+100, tong-10, tong+10]); if(a<1000 && tong>=1000) a=tong; if(a<100) a=tong+100;
     b=tong; ve=sx(a)+' ? '+parts.map(sx).join(' + '); xa=dau(a,b);
    }
    var ch=['>','<','='], sai={}; ch.forEach(function(c,i){ if(c!==xa) sai[String(i)]= lv>=3 ? 'nham-bang' : 'so-sanh-hang'; });
    return {type:'mcq', cot:2, _lv:lv, _a:a, _p:partsR ? partsR.join(',') : '', _dung:xa, q:'<div>Điền dấu thích hợp vào chỗ <b class="text-amber-700">?</b></div>'+bieuThucTo(ve), choices:ch, correct:ch.indexOf(xa), sai:sai, goiY:gy()};
  }, check:function(q){ var a=q._a, b, ve=q.q;
    if(!kiemMCQ(q) || q.choices.length!==3) return false;
    if(q._lv>=3){ var ps=q._p.split(',').map(Number); b=ps.reduce(function(s,x){ return s+x; }, 0); return ps.length>=2 && q.q.indexOf(ps.map(sx).join(' + '))>=0 && q.q.indexOf(sx(a)+' ? ')>=0 && q._dung===dau(a,b); }
    var m=/<div class="text-3xl[^>]*>([^<]+)</.exec(ve); if(!m) return false; var pr=m[1].split(' ? '); if(pr.length!==2) return false; var x=+pr[0].split(NB).join(''), y=+pr[1].split(NB).join('');
    if(x!==a || q._dung!==dau(x,y) || x===y) return false;
    if(q._lv<=1) return String(Math.min(x,y)).length===3 && String(Math.max(x,y)).length===4; return String(x).length===4 && String(y).length===4; }},

  /* D2 — Chọn số lớn nhất, bé nhất (mê cung) */
  {name:'Chọn số lớn nhất, bé nhất', sec:'Mê cung — ba cửa 1 240, 2 401, 1 420; 3 768, 6 783, 3 687, 6 738', mt:['MT2'], levels:3,
   muc:['Ba số khác nhau ở hàng nghìn: chọn số lớn nhất.', 'Bốn số có thể giống nhau ở hàng nghìn: chọn số bé nhất hoặc lớn nhất.', 'Bốn số gồm các chữ số giống nhau xếp khác nhau: chọn số lớn nhất hoặc bé nhất.']
   ,make:function(lv){
    var ns, kieu;
    if(lv<=1){ ns=bonVat(1); kieu='max'; }
    else if(lv===2){ var t=rnd(1,8); do { ns=shuffle([t*1000+rnd(0,999), t*1000+rnd(0,999), (t+1)*1000+rnd(0,999), (t+1)*1000+rnd(0,999)]); } while(new Set(ns).size<4); kieu=pick(['min','max']); }
    else { ns=hoanVi4(); kieu=pick(['min','max']); }
    var srt=ns.slice().sort(function(a,b){ return a-b; }), dung = kieu==='max' ? srt[srt.length-1] : srt[0];
    var cs=ns.map(sx), dungS=sx(dung), sai={}; cs.forEach(function(c,i){ if(c!==dungS) sai[String(i)]='so-sanh-hang'; });
    return {type:'mcq', cot:2, _lv:lv, _kieu:kieu, _ns:ns.join(','), _dung:dungS, q:'<div>Trong các số dưới đây, số nào <b>'+(kieu==='max' ? 'lớn nhất' : 'bé nhất')+'</b>?</div>', choices:cs, correct:cs.indexOf(dungS), sai:sai, goiY:gy()};
  }, check:function(q){ var ns=q._ns.split(',').map(Number); if(new Set(ns).size!==ns.length || ns.some(function(v){ return v<1000 || v>9999; }) || !kiemMCQ(q) || q.choices.length!==ns.length) return false;
    var e = q._kieu==='max' ? Math.max.apply(null,ns) : Math.min.apply(null,ns); if(q._dung!==sx(e)) return false;
    if(q._lv<=1) return ns.length===3 && q._kieu==='max' && new Set(ns.map(function(v){ return Math.floor(v/1000); })).size===3; if(q._lv===2) return ns.length===4;
    var ds=ns.map(function(v){ return String(v).split('').sort().join(''); }); return ns.length===4 && ds.every(function(x){ return x===ds[0]; }); }},

  /* D3 — Cầu dài nhất, ngắn nhất (bài 3) */
  {name:'Cầu dài nhất, ngắn nhất', sec:'Bài 3 — cầu dài 3 900 m, 5 440 m, 2 750 m, 4 480 m: cầu nào dài nhất, ngắn nhất', mt:['MT2'], levels:3,
   muc:['Ba cây cầu: cầu dài nhất.', 'Bốn cây cầu: cầu ngắn nhất hoặc dài nhất.', 'Cầu dài thứ hai.'],
   make:function(lv){ return hoiVat(lv, CFG_CAU, function(ds){ return khungHinh(cauHinh(ds).replace(/<\/svg>$/,'')); }); },
   check:function(q){ var ds=docCau(q.q), vs=q._vat.split(',').join('|'), tx=ds.map(function(d){ return d.t+':'+d.v; }).join(','); return ds.length>=3 && tx===q._vat && kiemVat(q); }},

  /* D4 — Xếp thứ tự (bài 3, luyện tập) */
  {name:'Xếp thứ tự', sec:'Bài 3 — xếp các số từ bé đến lớn: 2 427, 2 826, 3 083, 3 143', mt:['MT2'], levels:3,
   muc:['Xếp ba số từ bé đến lớn.', 'Xếp bốn số từ bé đến lớn.', 'Xếp bốn số từ lớn đến bé.'],
   make:function(lv){
    var ns = lv<=1 ? bonVat(1) : (lv===2 ? bonVat(2) : bonVat(2)), tang = lv<3, srt=ns.slice().sort(function(a,b){ return tang ? a-b : b-a; }), dau2=tang ? ' < ' : ' > ';
    var dung=srt.map(sx).join(dau2), sai=[];
    function hoanvi(a){ if(a.length<=1) return [a]; var r=[]; a.forEach(function(x,i){ hoanvi(a.slice(0,i).concat(a.slice(i+1))).forEach(function(t){ r.push([x].concat(t)); }); }); return r; }
    sai=shuffle(hoanvi(ns.slice()).map(function(a){ return a.map(sx).join(dau2); }).filter(function(c){ return c!==dung; })).map(function(c){ return [c,'sai-thu-tu']; });
    var m=lapMCQ(dung, sai);
    return {type:'mcq', cot:1, _lv:lv, _ns:ns.join(','), _tang:tang, _dung:dung, q:'<div>Các số: <b>'+shuffle(ns.slice()).map(sx).join(', ')+'</b>. Cách xếp nào đúng '+(tang ? 'từ bé đến lớn' : 'từ lớn đến bé')+'?</div>', choices:m.choices, correct:m.correct, sai:m.sai, goiY:gy()};
  }, check:function(q){ var ns=q._ns.split(',').map(Number); if(new Set(ns).size!==ns.length || ns.some(function(v){ return v<1000 || v>9999; }) || !kiemMCQ(q) || q.choices.length<3) return false;
    var srt=ns.slice().sort(function(a,b){ return q._tang ? a-b : b-a; }); if(q._dung!==srt.map(sx).join(q._tang ? ' < ' : ' > ')) return false;
    if(q._lv<=1) return ns.length===3 && q._tang; if(q._lv===2) return ns.length===4 && q._tang; return ns.length===4 && !q._tang; }},

  /* D5 — Túi hạt dẻ (bài 4) */
  {name:'Túi hạt dẻ', sec:'Bài 4 — các túi hạt dẻ nặng 4 352 g, 5 432 g, 5 342 g, 4 532 g: túi nhẹ nhất', mt:['MT2'], levels:3,
   muc:['Ba túi: túi nặng nhất.', 'Bốn túi: túi nhẹ nhất hoặc nặng nhất.', 'Túi nặng thứ hai.'],
   make:function(lv){ return hoiVat(lv, CFG_TUI); }, check:function(q){ return kiemVat(q) && /g<\/b>/.test(q.q); }},

  /* D6 — Đỉnh núi (bài 5) */
  {name:'Đỉnh núi', sec:'Bài 5 — độ cao các đỉnh núi 3 083 m, 3 143 m, 2 826 m, 2 427 m', mt:['MT2'], levels:3,
   muc:['Ba đỉnh núi: núi cao nhất.', 'Bốn đỉnh núi: núi thấp nhất hoặc cao nhất.', 'Núi cao thứ hai.'],
   make:function(lv){ return hoiVat(lv, CFG_NUI); }, check:function(q){ return kiemVat(q) && /m<\/b>/.test(q.q); }},

  /* D7 — Đúng hay sai (bài 6) */
  {name:'Đúng hay sai', sec:'Bài 6 — 10 000 > 9 999; 3 080 = 3 000 + 80; 900 + 80 > 9 080', mt:['MT1'], levels:3,
   muc:['Một câu so sánh hai số khác số chữ số: đúng hay sai.', 'So số với tổng các hàng: đúng hay sai.', 'Ba câu, chọn câu đúng.'],
   make:function(lv){
    function ve(s){ return s.l.map(sx).join(' + ')+' '+s.op+' '+s.r.map(sx).join(' + '); }
    function dung1(s){ var L=s.l.reduce(function(x,y){ return x+y; },0), R=s.r.reduce(function(x,y){ return x+y; },0); return dau(L,R)===s.op; }
    function mot(kind, dungYC){
     var n, d, parts, L, R, op; do { n=so4(); d=String(n).split(''); parts=[+(d[0]+'000'), +(d[1]+'00'), +(d[2]+'0'), +d[3]].filter(function(x){ return x>0; }); } while(parts.length<2);
     if(kind==='so'){ var a=rnd(100,9999), b; do { b=rnd(100,9999); } while(b===a || String(a).length===String(b).length); L=[a]; R=[b]; op=dau(a,b); }
     else { var s2=parts.reduce(function(x,y){ return x+y; },0); R=parts; op=pick(['=','=','>','<']); L=[s2]; if(op==='>') L=[s2+pick([10,100])]; if(op==='<') L=[s2-pick([10,100])]; if(L[0]<1000 || L[0]>9999){ L=[s2]; op='='; } }
     var st={l:L,op:op,r:R}; if(dung1(st)!==dungYC){ var o=['<','>','='].filter(function(z){ return z!==op && (dung1({l:L,op:z,r:R})===dungYC); }); if(!o.length) return null; st.op=pick(o); }
     return st;
    }
    if(lv<=2){ var yc=Math.random()<0.5, st=null; while(!st) st=mot(lv<=1 ? 'so' : 'tong', yc);
     return {type:'mcq', cot:2, _lv:lv, _st:JSON.stringify(st), _dung:yc?'Đúng':'Sai', q:'<div>Bé xem câu sau đúng hay sai:</div>'+bieuThucTo(ve(st)), choices:['Đúng','Sai'], correct:yc?0:1, sai:(yc?{'1':'so-sanh-hang'}:{'0':'so-sanh-hang'}), goiY:gy()}; }
    var sts=[mot('tong',true), mot('tong',false), mot('so',false)]; while(sts.some(function(x){ return !x; })) sts=[mot('tong',true), mot('tong',false), mot('so',false)];
    var txt=sts.map(ve), dungT=txt[0], ord=shuffle(txt.slice()), sai={}; ord.forEach(function(c,i){ if(c!==dungT) sai[String(i)]='so-sanh-hang'; });
    return {type:'mcq', cot:1, _lv:3, _st:JSON.stringify(sts), _dung:dungT, q:'<div>Chỉ có một câu đúng. Bé chọn câu đúng nhé!</div>', choices:ord, correct:ord.indexOf(dungT), sai:sai, goiY:gy()};
  }, check:function(q){ function ev(s){ var L=s.l.reduce(function(x,y){ return x+y; },0), R=s.r.reduce(function(x,y){ return x+y; },0); return dau(L,R)===s.op; }
    function ve(s){ return s.l.map(sx).join(' + ')+' '+s.op+' '+s.r.map(sx).join(' + '); }
    if(!kiemMCQ(q)) return false;
    if(q._lv<=2){ var st=JSON.parse(q._st); if(q.q.indexOf(ve(st))<0) return false; if(st.l.some(function(x){ return x<=0; }) || st.r.some(function(x){ return x<=0; })) return false; return (q._dung==='Đúng')===ev(st) && (q._lv>=2 ? st.r.length>=2 : (st.l.length===1 && st.r.length===1 && String(st.l[0]).length!==String(st.r[0]).length)); }
    var ss=JSON.parse(q._st); if(ss.length!==3 || q.choices.length!==3) return false; var cnt=ss.filter(ev).length; return cnt===1 && q._dung===ve(ss.filter(ev)[0]) && ss.every(function(s){ return q.choices.indexOf(ve(s))>=0 && s.r.every(function(x){ return x>0; }); }); }},

  /* D8 — Số bé nhất, lớn nhất có bốn chữ số (đố) */
  {name:'Số bé nhất, lớn nhất có bốn chữ số', sec:'Đố — số bé nhất có bốn chữ số khác nhau (1 023), lớn nhất khác nhau (9 876), giống nhau (1 111, 9 999)', mt:['MT3'], levels:3,
   muc:['Số bé nhất, lớn nhất có bốn chữ số.', 'Số bé nhất, lớn nhất có bốn chữ số khác nhau.', 'Số bé nhất, lớn nhất có bốn chữ số giống nhau.'],
   make:function(lv){
    var kieu=pick(['min','max']), ans, loai, sai;
    if(lv<=1){ loai='bat-ky'; ans = kieu==='min' ? 1000 : 9999; sai=[[kieu==='min' ? 999 : 10000,'so-chu-so'],[kieu==='min' ? 1001 : 9990,'so-chu-so'],[kieu==='min' ? 100 : 9000,'so-chu-so']]; }
    else if(lv===2){ loai='khac-nhau'; ans = kieu==='min' ? 1023 : 9876; sai=[[kieu==='min' ? 1000 : 9999,'quen-khac-nhau'],[kieu==='min' ? 1234 : 9870,'so-sanh-hang'],[kieu==='min' ? 1032 : 9867,'so-sanh-hang'],[kieu==='min' ? 1011 : 9988,'quen-khac-nhau']]; }
    else { loai='giong-nhau'; ans = kieu==='min' ? 1111 : 9999; sai=[[kieu==='min' ? 1000 : 9990,'quen-khac-nhau'],[kieu==='min' ? 1234 : 9876,'quen-khac-nhau'],[kieu==='min' ? 1010 : 9900,'so-sanh-hang'],[kieu==='min' ? 1001 : 9099,'so-0-dau']]; }
    var tx = loai==='bat-ky' ? 'có bốn chữ số' : (loai==='khac-nhau' ? 'có bốn chữ số khác nhau' : 'có bốn chữ số giống nhau');
    return {type:'num', _lv:lv, _kieu:kieu, _loai:loai, q:'<div>Số <b>'+(kieu==='min' ? 'bé nhất' : 'lớn nhất')+'</b> '+tx+' là số nào?</div>', ans:ans, sai:nhanSai(sai, ans), goiY:gy()};
  }, check:function(q){ var nums=CACHE8[q._loai], v; if(!nums){ nums=[]; for(v=1000; v<=9999; v++){ var s=String(v), ok = q._loai==='bat-ky' ? true : (q._loai==='khac-nhau' ? new Set(s.split('')).size===4 : new Set(s.split('')).size===1); if(ok) nums.push(v); } CACHE8[q._loai]=nums; }
    var e = q._kieu==='min' ? nums[0] : nums[nums.length-1]; if(q.ans!==e) return false; return (q._lv<=1 && q._loai==='bat-ky') || (q._lv===2 && q._loai==='khac-nhau') || (q._lv===3 && q._loai==='giong-nhau'); }},

  /* D9 — Lập số từ thẻ (đố) */
  {name:'Lập số từ thẻ', sec:'Đố — lập số bé nhất từ các thẻ 3, 0, 2, 7 (2 037)', mt:['MT3'], levels:3,
   muc:['Lập số lớn nhất từ 4 thẻ khác 0.', 'Lập số bé nhất từ 4 thẻ có thẻ 0 (0 không đứng đầu).', 'Lập số lớn nhất bé hơn 5 000.'],
   make:function(lv){
    var cs, ans, q, sai, hs, g;
    if(lv<=1){ cs=shuffle([1,2,3,4,5,6,7,8,9]).slice(0,4); hs=lapDuoc(cs); ans=Math.max.apply(null,hs); q='lập số lớn nhất.'; sai=[[Math.min.apply(null,hs),'so-sanh-hang'],[ans-9,'so-sanh-hang'],[+cs.join(''),'so-sanh-hang']]; }
    else if(lv===2){ cs=shuffle([0].concat(shuffle([1,2,3,4,5,6,7,8,9]).slice(0,3))); hs=lapDuoc(cs); ans=Math.min.apply(null,hs); q='lập số bé nhất (chữ số 0 không đứng đầu).'; var z=+cs.slice().sort(function(a,b){ return a-b; }).join(''); sai=[[z,'so-0-dau'],[Math.max.apply(null,hs),'so-sanh-hang'],[ans+9,'so-sanh-hang']]; }
    else { for(g=0;g<200;g++){ cs=shuffle([1,2,3,4,5,6,7,8,9]).slice(0,4); hs=lapDuoc(cs).filter(function(v){ return v<5000; }); if(hs.length>=3 && cs.some(function(c){ return c>=5; })) break; } ans=Math.max.apply(null,hs); q='lập số <b>lớn nhất mà bé hơn 5 000</b>.'; var all=lapDuoc(cs); sai=[[Math.max.apply(null,all),'so-sanh-hang'],[Math.min.apply(null,all),'so-sanh-hang'],[ans-9,'so-sanh-hang']]; }
    return {type:'num', _lv:lv, q:theSo(cs)+'<div>Dùng cả 4 thẻ, '+q+'</div>', ans:ans, sai:nhanSai(sai, ans), goiY:gy()};
  }, check:function(q){ var cs=docThe(q.q); if(cs.length!==4 || new Set(cs).size!==4) return false; var hs=lapDuoc(cs), z=cs.indexOf(0)>=0;
    if(q._lv<=1) return !z && q.ans===Math.max.apply(null,hs); if(q._lv===2) return z && q.ans===Math.min.apply(null,hs) && q.ans>=1000;
    var h5=hs.filter(function(v){ return v<5000; }); return !z && h5.length>=3 && q.ans===Math.max.apply(null,h5); }},

  /* D10 — Bạn An so sánh (không có trong SGK) */
  {name:'Bạn An so sánh', sec:'Ôn tập — bạn An so sánh hai số: em có đồng ý không, An sai ở đâu, so sánh đúng', mt:['MT1'], levels:3,
   muc:['An nói «5 831 > 5 381»: em có đồng ý không.', 'An so sánh sai: An sai ở đâu.', 'An so sánh sai: dấu đúng là gì.'],
   make:function(lv){
    var a, b, p, dung;
    if(lv<=1){ p=haiSoKhacTai(rnd(0,2)); a=p[0]; b=p[1]; dung=Math.random()<0.5; var vs = dung ? dau(a,b) : (a>b ? '<' : '>');
      return {type:'mcq', cot:2, _lv:1, _a:a, _b:b, _op:vs, _dung:dung?'Đồng ý':'Không đồng ý', q:nguoi('boy','Bạn An')+'<div>Bạn An nói: «<b>'+sx(a)+' '+vs+' '+sx(b)+'</b>». Em có đồng ý với An không?</div>', choices:['Đồng ý','Không đồng ý'], correct:dung?0:1, sai:(dung?{'1':'so-sanh-hang'}:{'0':'so-sanh-hang'}), goiY:gy()}; }
    for(var g=0; g<500; g++){ p=haiSoKhacTai(rnd(0,2)); a=p[0]; b=p[1]; if(a%10!==b%10 && dau(a%10,b%10)!==dau(a,b)) break; }
    var vsai = a>b ? '<' : '>';
    if(lv===2){ var D='An so các chữ số từ phải sang trái', ch=[D,'An chỉ so số chữ số của hai số','An cộng các chữ số rồi so sánh'], ord=shuffle(ch.slice()), sai={}; ord.forEach(function(c,i){ if(c!==D) sai[String(i)]= c.indexOf('cộng')>=0 ? 'nham-bang' : 'so-sanh-hang'; });
      return {type:'mcq', cot:1, _lv:2, _a:a, _b:b, _op:vsai, _dung:D, q:nguoi('boy','Bạn An')+'<div>Bạn An nói: «<b>'+sx(a)+' '+vsai+' '+sx(b)+'</b> vì '+(a%10)+' '+dau(a%10,b%10)+' '+(b%10)+'». An làm sai rồi! An sai ở đâu?</div>', choices:ord, correct:ord.indexOf(D), sai:sai, goiY:gy({'nham-bang':'Hai số có cùng số chữ số thì so từng cặp chữ số từ trái sang phải, không cộng các chữ số.'})}; }
    var dd=dau(a,b), ch3=['>','<','='], s3={}; ch3.forEach(function(c,i){ if(c!==dd) s3[String(i)]='so-phai-sang-trai'; });
    return {type:'mcq', cot:2, _lv:3, _a:a, _b:b, _op:vsai, _dung:dd, q:nguoi('boy','Bạn An')+'<div>Bạn An nói: «<b>'+sx(a)+' '+vsai+' '+sx(b)+'</b>». An so sánh sai! Dấu đúng là gì?</div>'+bieuThucTo(sx(a)+' ? '+sx(b)), choices:ch3, correct:ch3.indexOf(dd), sai:s3, goiY:gy()};
  }, check:function(q){ var a=q._a, b=q._b; if(!kiemMCQ(q) || a===b || String(a).length!==4 || String(b).length!==4) return false;
    if(q._lv<=1) return (q._dung==='Đồng ý')===(q._op===dau(a,b)) && q.choices.length===2;
    if(q._op===dau(a,b) || a%10===b%10 || dau(a%10,b%10)===dau(a,b)) return false;
    if(q._lv===2) return q._dung==='An so các chữ số từ phải sang trái' && q.choices.length===3; return q.choices.length===3 && q._dung===dau(a,b); }}
 ]
};
