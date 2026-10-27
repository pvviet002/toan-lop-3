/* bai-48.js — Bài 48: Làm tròn số đến hàng chục, hàng trăm (Tập 2, Chủ đề 8). BÀI MỚI, Engine v2 — LUYỆN THÔNG MINH.
   Theo bảng phân tích sư phạm đã duyệt (phan-tich-su-pham/bai-48.md, PR #39): 3 MỤC TIÊU (muctieu) × 10 DẠNG (topics), mỗi dạng 3 mức (Thông tư 27).
   Quy tắc làm tròn: chữ số bên phải hàng cần làm tròn bé hơn 5 thì làm tròn xuống, từ 5 trở lên thì làm tròn lên. Kết quả có thể là 10 000.
   Hình: trucTron (trục số có điểm P, mới), mayTron (máy làm tròn, mới). Số viết có khoảng trắng không ngắt ở hàng nghìn ("3 254").
   check() đọc lại hình từ chuỗi SVG (data-lo, data-hi, data-n, data-may, data-in, data-out) hoặc từ trường _ của câu, rồi tính lại. QUY TẮC: nối chuỗi, KHÔNG backtick, KHÔNG template literal. */

/* ---- Tiện ích chung ---- */
function nhanSai(ds, dung){ var o={}; ds.forEach(function(p){ var v=p[0]; if(Number.isInteger(v) && v>0 && v!==dung && !(String(v) in o)) o[String(v)]=p[1]; }); return o; }
function kiemMCQ(q){ return q.choices[q.correct]===q._dung && new Set(q.choices).size===q.choices.length; }
function khungHinh(s){ return '<div class="flex justify-center my-2">'+s+'</svg></div>'; }
function bieuThucTo(t){ return '<div class="text-3xl font-extrabold text-orange-600 my-2">'+t+'</div>'; }
function nguoi(ten, alt){ return '<div class="flex justify-center mb-1">'+anh(ten, 72, alt)+'</div>'; }
var NB=' ';
function sx(n){ var s=String(n); return s.length>=4 ? s.slice(0,s.length-3)+NB+s.slice(-3) : s; }
function untx(s){ return +String(s).split(NB).join(''); }
function lapMCQ(dungStr, cacSai){
 var seen={}, ds=[]; seen[dungStr]=1; cacSai.forEach(function(p){ if(p[0] && !seen[p[0]]){ seen[p[0]]=1; ds.push(p); } });
 var opts=[[dungStr,'']].concat(ds.slice(0,3)); opts=shuffle(opts); var sai={};
 opts.forEach(function(o,i){ if(o[0]!==dungStr) sai[String(i)]=o[1]; });
 var cs=opts.map(function(o){ return o[0]; });
 return {choices:cs, correct:cs.indexOf(dungStr), sai:sai, _dung:dungStr};
}
/* làm tròn: xuống hoặc lên theo quy tắc; ham: 10 hoặc 100 */
function tron(n, b){ return Math.floor((n+b/2)/b)*b; }
function xuong(n, b){ return Math.floor(n/b)*b; }
function len(n, b){ return Math.ceil(n/b)*b; }
function tenHang(b){ return b===10 ? 'hàng chục' : 'hàng trăm'; }
/* số có bốn chữ số với chữ số đơn vị / chục cho trước (một khoảng) */
function soVoi(donvi, chuc){ var a=rnd(10,99); return a*100+(chuc===null ? rnd(0,9) : chuc)*10+(donvi===null ? rnd(0,9) : donvi); }
var GOI={'lam-tron-nham-5':'Xem chữ số ngay bên phải hàng cần làm tròn: bé hơn 5 thì làm tròn xuống, từ 5 trở lên thì làm tròn lên.',
  'nham-hang-tron':'Làm tròn đến hàng chục thì các chữ số hàng đơn vị về 0; làm tròn đến hàng trăm thì hàng chục và hàng đơn vị về 0.',
  'quen-nho-tron':'Làm tròn lên mà chữ số ở hàng làm tròn là 9 thì phải nhớ sang hàng liền trước: 2 997 làm tròn đến hàng chục là 3 000.'};
function gy(extra){ var o={}, k; for(k in GOI) o[k]=GOI[k]; for(k in (extra||{})) o[k]=extra[k]; return o; }
function saiTron(n, b){
 var ds=[], x=xuong(n,b), l=len(n,b), ung=tron(n,b), u=b===10 ? n%10 : n%100;
 ds.push([ung===x ? l : x, 'lam-tron-nham-5']);
 ds.push([b===10 ? tron(n,100) : tron(n,10), 'nham-hang-tron']);
 ds.push([ung+b,'lam-tron-nham-5'],[ung-b,'lam-tron-nham-5'],[n,'nham-hang-tron']);
 if(b===10 && Math.floor(n/10)%10===9 && n%10>=5) ds.unshift([xuong(n,100),'quen-nho-tron']);
 if(b===100 && Math.floor(n/100)%10===9 && n%100>=50) ds.unshift([xuong(n,1000),'quen-nho-tron']);
 return ds;
}

/* ---- Hình ---- */
/* trục số: hai điểm tròn lo, hi và điểm P ở số n */
function trucTron(lo, hi, n){
 var o=svgX(300,96,300).replace('<svg ','<svg data-lo="'+lo+'" data-hi="'+hi+'" data-n="'+n+'" '), px=44+(n-lo)/(hi-lo)*212;
 o+='<line x1="30" y1="60" x2="270" y2="60" stroke="currentColor" stroke-width="3" stroke-linecap="round"/>';
 o+='<line x1="44" y1="50" x2="44" y2="70" stroke="currentColor" stroke-width="3"/><line x1="256" y1="50" x2="256" y2="70" stroke="currentColor" stroke-width="3"/>';
 o+='<text x="44" y="90" text-anchor="middle" font-size="15" '+HFONT+' fill="currentColor">'+sx(lo)+'</text><text x="256" y="90" text-anchor="middle" font-size="15" '+HFONT+' fill="currentColor">'+sx(hi)+'</text>';
 o+='<circle cx="'+px.toFixed(1)+'" cy="32" r="14" fill="'+HM.doDam+'"/><text x="'+px.toFixed(1)+'" y="38" text-anchor="middle" font-size="16" '+HFONT+' fill="#fff">P</text>';
 o+='<line x1="'+px.toFixed(1)+'" y1="46" x2="'+px.toFixed(1)+'" y2="60" stroke="'+HM.doDam+'" stroke-width="3"/>';
 return o+'</svg>';
}
function docTruc(html){ var m=/data-lo="(\d+)" data-hi="(\d+)" data-n="(\d+)"/.exec(html); return m ? {lo:+m[1], hi:+m[2], n:+m[3]} : null; }
/* máy làm tròn: số vào, máy (hàng chục / hàng trăm), số ra; số ? khi cần tìm */
function mayTron(b, vao, ra){
 var o=svgHinh(300,100,300).replace('<svg ','<svg data-may="'+b+'" data-in="'+vao+'" data-out="'+ra+'" ');
 var tv = vao==='?' ? '?' : sx(vao), tr = ra==='?' ? '?' : sx(ra);
 o+='<rect x="2" y="30" width="78" height="42" rx="10" fill="#fff" stroke="'+HM.day+'" stroke-width="3"/><text x="41" y="58" text-anchor="middle" font-size="18" '+HFONT+' fill="'+(vao==='?' ? HM.hoi : HM.chu)+'">'+tv+'</text>';
 o+='<line x1="82" y1="51" x2="90" y2="51" stroke="'+HM.troiDam+'" stroke-width="4" stroke-linecap="round"/><polygon points="88,44 98,51 88,58" fill="'+HM.troiDam+'"/>';
 o+='<rect x="100" y="14" width="100" height="74" rx="10" fill="'+HM.troi+'"/><text x="150" y="44" text-anchor="middle" font-size="14" '+HFONT+' fill="'+HM.chu+'">Làm tròn</text><text x="150" y="64" text-anchor="middle" font-size="14" '+HFONT+' fill="'+HM.chu+'">'+tenHang(b)+'</text>';
 o+='<line x1="202" y1="51" x2="210" y2="51" stroke="'+HM.troiDam+'" stroke-width="4" stroke-linecap="round"/><polygon points="208,44 218,51 208,58" fill="'+HM.troiDam+'"/>';
 o+='<rect x="220" y="30" width="78" height="42" rx="10" fill="#fff" stroke="'+HM.day+'" stroke-width="3"/><text x="259" y="58" text-anchor="middle" font-size="18" '+HFONT+' fill="'+(ra==='?' ? HM.hoi : HM.chu)+'">'+tr+'</text>';
 return o+'</svg>';
}
function docMay(html){ var m=/data-may="(\d+)" data-in="(\d+|\?)" data-out="(\d+|\?)"/.exec(html); return m ? {b:+m[1], vao:m[2]==='?' ? null : +m[2], ra:m[3]==='?' ? null : +m[3]} : null; }
function svgX(w, h, px){ return svgHinh(w, h, px).replace('<svg ', '<svg class="text-slate-700" '); }
var CANH=[['Đàn gà','con gà'],['Thư viện','cuốn sách'],['Trường học','học sinh'],['Sân vận động','người xem'],['Kho','quả trứng']];

var BAI = {
 n: 48,
 title: 'Làm Tròn Số Đến Hàng Chục, Hàng Trăm',
 sub: 'Luyện thông minh: câu hỏi tự đổi theo bé — làm hết lượt để xem ngọn lửa!',
 goal: 10, soCau: 18, soCauToiDa: 24,
 loi: {'lam-tron-nham-5':'Nhầm quy tắc làm tròn (xuống hay lên)', 'nham-hang-tron':'Nhầm hàng cần làm tròn', 'quen-nho-tron':'Quên nhớ khi làm tròn lên qua hàng 9'},
 muctieu: [
  {id:'MT1', ten:'Làm tròn đến hàng chục', muc:['Chữ số hàng đơn vị bé hơn 5 (1 723): làm tròn xuống.', 'Chữ số hàng đơn vị từ 5 trở lên (1 725, 1 726): làm tròn lên.', 'Làm tròn lên qua hàng trăm (2 997 thành 3 000).']},
  {id:'MT2', ten:'Làm tròn đến hàng trăm', muc:['Chữ số hàng chục bé hơn 5 (1 726 thành 1 700).', 'Chữ số hàng chục từ 5 trở lên (1 786 thành 1 800).', 'Làm tròn lên qua hàng nghìn (3 960 thành 4 000).']},
  {id:'MT3', ten:'Ước lượng «khoảng»', muc:['Đàn gà 1 242 con khoảng bao nhiêu; số làm tròn đến hàng nào.', 'Thư viện 6 745 cuốn: hai bạn làm tròn đến hàng nào; máy làm tròn.', 'Trường 1 992 học sinh khoảng bao nhiêu; hai bạn cùng đúng; tìm số ban đầu.']}
 ],
 topics: [
  /* D1 — Làm tròn đến hàng chục (khám phá, bài 1) */
  {name:'Làm tròn đến hàng chục', sec:'Khám phá, bài 1 — 1 726 thành 1 730; 1 725 thành 1 730; 1 723 thành 1 720; 2 864, 3 058, 4 315', mt:['MT1'], levels:3,
   muc:['Chữ số hàng đơn vị bé hơn 5: làm tròn xuống.', 'Chữ số hàng đơn vị từ 5 trở lên: làm tròn lên.', 'Làm tròn lên qua hàng trăm (chữ số hàng chục là 9).'],
   make:function(lv){
    var n = lv<=1 ? soVoi(rnd(1,4), rnd(0,8)) : (lv===2 ? soVoi(rnd(5,9), rnd(0,8)) : soVoi(rnd(5,9), 9)), ans=tron(n,10);
    return {type:'num', _lv:lv, _n:n, q:'<div>Làm tròn số <b>'+sx(n)+'</b> đến hàng chục.</div>', ans:ans, sai:nhanSai(saiTron(n,10), ans), goiY:gy()};
  }, check:function(q){ var n=q._n, u=n%10, t=Math.floor(n/10)%10; if(n<1000 || n>9999 || q.ans!==tron(n,10) || q.q.indexOf(sx(n))<0) return false;
    if(q._lv<=1) return u>=1 && u<=4 && t<=8; if(q._lv===2) return u>=5 && t<=8; return u>=5 && t===9; }},

  /* D2 — Làm tròn đến hàng trăm (khám phá, bài 1) */
  {name:'Làm tròn đến hàng trăm', sec:'Khám phá, bài 1 — 1 786 thành 1 800; 1 756 thành 1 800; 1 726 thành 1 700; 4 315, 3 058', mt:['MT2'], levels:3,
   muc:['Chữ số hàng chục bé hơn 5: làm tròn xuống.', 'Chữ số hàng chục từ 5 trở lên: làm tròn lên.', 'Làm tròn lên qua hàng nghìn (chữ số hàng trăm là 9).'],
   make:function(lv){
    var n;
    if(lv<=1) n=rnd(10,98)*100+rnd(0,4)*10+rnd(0,9); else if(lv===2) n=rnd(10,98)*100+rnd(5,9)*10+rnd(0,9); else n=rnd(1,9)*1000+900+rnd(5,9)*10+rnd(0,9);
    if(lv<=2 && Math.floor(n/100)%10===9) n-=300;
    var ans=tron(n,100);
    return {type:'num', _lv:lv, _n:n, q:'<div>Làm tròn số <b>'+sx(n)+'</b> đến hàng trăm.</div>', ans:ans, sai:nhanSai(saiTron(n,100), ans), goiY:gy()};
  }, check:function(q){ var n=q._n, t=Math.floor(n/10)%10, h=Math.floor(n/100)%10; if(n<1000 || n>9999 || q.ans!==tron(n,100) || q.q.indexOf(sx(n))<0) return false;
    if(q._lv<=1) return t<=4 && h<=8; if(q._lv===2) return t>=5 && h<=8; return t>=5 && h===9; }},

  /* D3 — Làm tròn đến hàng nào (bài 3) */
  {name:'Làm tròn đến hàng nào', sec:'Bài 3 — thư viện 6 745 cuốn: bạn nói 6 750, bạn nói 6 700: mỗi bạn làm tròn đến hàng nào', mt:['MT3'], levels:3,
   muc:['6 750 là số 6 745 làm tròn đến hàng nào.', '6 700 là số 6 745 làm tròn đến hàng nào.', 'Hai bạn làm tròn một số: mỗi bạn làm tròn đến hàng nào.'],
   make:function(lv){
    var n;
    do { n=soVoi(rnd(1,9), rnd(1,8)); } while(tron(n,10)===tron(n,100) || tron(n,10)===n || tron(n,100)===n);
    if(lv<=2){ var b = lv<=1 ? 10 : 100, r=tron(n,b), ch=['hàng chục','hàng trăm','hàng nghìn','hàng đơn vị'], dung=tenHang(b), sai={};
      var m=lapMCQ(dung, [[ lv<=1 ? 'hàng trăm' : 'hàng chục','nham-hang-tron'],['hàng nghìn','nham-hang-tron'],['hàng đơn vị','nham-hang-tron']]);
      return {type:'mcq', cot:2, _lv:lv, _n:n, _r:r, _b:b, _dung:m._dung, q:'<div>Số <b>'+sx(n)+'</b> được làm tròn thành <b>'+sx(r)+'</b>. Số đó đã được làm tròn đến hàng nào?</div>', choices:m.choices, correct:m.correct, sai:m.sai, goiY:gy()}; }
    var D='Bạn A: hàng chục; bạn B: hàng trăm', m3=lapMCQ(D, [['Bạn A: hàng trăm; bạn B: hàng chục','nham-hang-tron'],['Bạn A: hàng chục; bạn B: hàng chục','nham-hang-tron'],['Bạn A: hàng trăm; bạn B: hàng trăm','nham-hang-tron']]);
    return {type:'mcq', cot:1, _lv:3, _n:n, _ra:tron(n,10), _rb:tron(n,100), _dung:D, q:'<div>Một thư viện có <b>'+sx(n)+'</b> cuốn sách. Bạn A nói «khoảng <b>'+sx(tron(n,10))+'</b> cuốn». Bạn B nói «khoảng <b>'+sx(tron(n,100))+'</b> cuốn». Mỗi bạn làm tròn đến hàng nào?</div>', choices:m3.choices, correct:m3.correct, sai:m3.sai, goiY:gy()};
  }, check:function(q){ var n=q._n; if(!kiemMCQ(q) || q.choices.length!==4 || n<1000 || n>9999 || tron(n,10)===tron(n,100)) return false;
    if(q._lv<=2) return q._r===tron(n,q._b) && q._dung===tenHang(q._b) && q._b===(q._lv<=1 ? 10 : 100) && q.q.indexOf(sx(q._r))>=0; return q._ra===tron(n,10) && q._rb===tron(n,100) && q._dung==='Bạn A: hàng chục; bạn B: hàng trăm' && q.q.indexOf(sx(q._ra))>=0 && q.q.indexOf(sx(q._rb))>=0; }},

  /* D4 — Khoảng bao nhiêu (bài 2) */
  {name:'Khoảng bao nhiêu', sec:'Bài 2 — đàn gà 1 242 con làm tròn đến hàng chục khoảng 1 240 con; trường 1 992 học sinh khoảng 2 000', mt:['MT3'], levels:3,
   muc:['Làm tròn đến hàng chục để ước lượng (đàn gà 1 242 con).', 'Làm tròn đến hàng trăm để ước lượng.', 'Chọn số khoảng đúng trong bốn số (trường 1 992 học sinh).'],
   make:function(lv){
    var c=pick(CANH), n, b = lv<=1 ? 10 : 100;
    if(lv<=2){ do { n=soVoi(null, null); } while(tron(n,b)===n || tron(n,b)===xuong(n,b) && Math.random()<0.5); var ans=tron(n,b);
      return {type:'num', _lv:lv, _n:n, _b:b, q:'<div>'+c[0]+' có <b>'+sx(n)+'</b> '+c[1]+'. Làm tròn đến <b>'+tenHang(b)+'</b>, '+c[0].toLowerCase()+' có khoảng bao nhiêu '+c[1]+'?</div>', ans:ans, sai:nhanSai(saiTron(n,b), ans), goiY:gy()}; }
    do { n=rnd(1,9)*1000+rnd(5,9)*100+rnd(5,9)*10+rnd(0,9); } while(tron(n,10)===tron(n,100));
    var T=tron(n,100), sai=[[tron(n,10),'nham-hang-tron'],[xuong(n,100),'lam-tron-nham-5'],[xuong(n,1000),'nham-hang-tron'],[T-100,'lam-tron-nham-5'],[T+100,'lam-tron-nham-5']], mm=lapMCQ(sx(T), sai.map(function(p){ return [sx(p[0]),p[1]]; }));
    return {type:'mcq', cot:2, _lv:3, _n:n, _dung:mm._dung, q:'<div>'+c[0]+' có <b>'+sx(n)+'</b> '+c[1]+'. Làm tròn đến <b>hàng trăm</b>, '+c[0].toLowerCase()+' có khoảng bao nhiêu '+c[1]+'?</div>', choices:mm.choices, correct:mm.correct, sai:mm.sai, goiY:gy()};
  }, check:function(q){ var n=q._n; if(n<1000 || n>9999) return false; if(q._lv<=2) return q.ans===tron(n,q._b) && q._b===(q._lv<=1 ? 10 : 100) && q.q.indexOf(sx(n))>=0;
    return kiemMCQ(q) && q.choices.length===4 && q._dung===sx(tron(n,100)) && n%100>=50 && tron(n,10)!==tron(n,100); }},

  /* D5 — Máy làm tròn (bài 4) */
  {name:'Máy làm tròn', sec:'Bài 4 — máy làm tròn: 3 254 thành 3 300; 9 136 thành 9 100; 6 582 thành 6 600; 4 516 thành ?', mt:['MT3'], levels:3,
   muc:['Máy làm tròn đến hàng trăm: điền số ra.', 'Máy làm tròn đến hàng chục: điền số ra.', 'Biết số ra, chọn số vào có thể đã cho vào máy.'],
   make:function(lv){
    var b, n, out;
    if(lv<=1){ b=100; n=soVoi(null,null); out=tron(n,b); return {type:'num', _lv:1, q:khungHinh(mayTron(b,n,'?').replace(/<\/svg>$/,''))+'<div>Số ra khỏi máy ở ô <b class="text-amber-700">?</b> là bao nhiêu?</div>', ans:out, sai:nhanSai(saiTron(n,b), out), goiY:gy()}; }
    if(lv===2){ b=10; n=soVoi(null,null); out=tron(n,b); return {type:'num', _lv:2, q:khungHinh(mayTron(b,n,'?').replace(/<\/svg>$/,''))+'<div>Số ra khỏi máy ở ô <b class="text-amber-700">?</b> là bao nhiêu?</div>', ans:out, sai:nhanSai(saiTron(n,b), out), goiY:gy()}; }
    b=pick([10,100]); out=(b===100 ? rnd(11,98)*100 : rnd(101,985)*10); var half=b/2, dung=out+pick([-1,1])*rnd(1,half-1), s1=out+half+rnd(0,half-2), s2=out-half-rnd(1,half-1), s3=out+b+rnd(1,half-1);
    var mm=lapMCQ(sx(dung), [[sx(s1),'lam-tron-nham-5'],[sx(s2),'lam-tron-nham-5'],[sx(s3),'nham-hang-tron']]);
    return {type:'mcq', cot:2, _lv:3, _b:b, _out:out, _dung:mm._dung, q:khungHinh(mayTron(b,'?',out).replace(/<\/svg>$/,''))+'<div>Số ra khỏi máy là <b>'+sx(out)+'</b>. Số nào có thể là số đã cho vào máy (ô <b class="text-amber-700">?</b>)?</div>', choices:mm.choices, correct:mm.correct, sai:mm.sai, goiY:gy()};
  }, check:function(q){ var t=docMay(q.q); if(!t) return false;
    if(q._lv<=2){ return t.vao!==null && t.ra===null && q.ans===tron(t.vao,t.b) && t.b===(q._lv<=1 ? 100 : 10) && t.vao>=1000 && t.vao<=9999; }
    if(t.vao!==null || t.ra===null || !kiemMCQ(q) || q.choices.length!==4) return false; var ok=q.choices.map(function(c){ return tron(untx(c), t.b)===t.ra; }); return ok.filter(Boolean).length===1 && ok[q.correct]===true && t.ra===q._out; }},

  /* D6 — Hai bạn, ai đúng (bài 2) */
  {name:'Hai bạn, ai đúng', sec:'Bài 2 — đàn gà 1 242 con: Mai nói khoảng 1 240, Việt nói khoảng 1 250', mt:['MT3'], levels:3,
   muc:['Hai bạn làm tròn đến hàng chục, một bạn đúng: bạn nào đúng.', 'Việt làm tròn sai: Việt sai ở đâu.', 'Hai bạn làm tròn đến hai hàng khác nhau: ai đúng.'],
   make:function(lv){
    var n, a, bn=['Mai','Việt'], hinh='<div class="flex justify-center gap-3 mb-1">'+anh('girl',64,'Bạn Mai')+anh('boy',64,'Bạn Việt')+'</div>';
    if(lv<=1){ n=soVoi(rnd(1,9), rnd(0,8)); var dung=tron(n,10), sai1=(n%10>=5 ? xuong(n,10) : len(n,10)), maiDung=Math.random()<0.5, vm=maiDung ? dung : sai1, vv=maiDung ? sai1 : dung, D=maiDung ? 'Mai' : 'Việt';
      var ch=['Mai','Việt','Cả hai bạn','Không bạn nào'], sai={}; ch.forEach(function(c,i){ if(c!==D) sai[String(i)]='lam-tron-nham-5'; });
      return {type:'mcq', cot:2, _lv:1, _n:n, _vm:vm, _vv:vv, _dung:D, q:hinh+'<div>Đàn gà có <b>'+sx(n)+'</b> con. Làm tròn đến hàng chục, Mai nói «khoảng <b>'+sx(vm)+'</b> con», Việt nói «khoảng <b>'+sx(vv)+'</b> con». Bạn nào làm tròn đúng?</div>', choices:ch, correct:ch.indexOf(D), sai:sai, goiY:gy()}; }
    if(lv===2){ n=soVoi(rnd(1,4), rnd(0,8)); var up=len(n,10), Dd='Việt làm tròn lên, nhưng chữ số hàng đơn vị bé hơn 5 nên phải làm tròn xuống', c2=[[ 'Việt làm tròn đến hàng trăm, không phải hàng chục','nham-hang-tron'],['Việt viết sai chữ số hàng nghìn','nham-hang-tron'],['Việt làm tròn xuống, nhưng phải làm tròn lên','lam-tron-nham-5']], m2=lapMCQ(Dd, c2);
      return {type:'mcq', cot:1, _lv:2, _n:n, _vv:up, _dung:Dd, q:hinh+'<div>Đàn gà có <b>'+sx(n)+'</b> con. Làm tròn đến hàng chục, Việt nói «khoảng <b>'+sx(up)+'</b> con». Việt làm sai rồi! Việt sai ở đâu?</div>', choices:m2.choices, correct:m2.correct, sai:m2.sai, goiY:gy()}; }
    do { n=soVoi(rnd(0,9), rnd(1,8)); } while(tron(n,10)===tron(n,100) || tron(n,10)===n || tron(n,100)===n);
    var D3='Cả hai bạn đều đúng', ch3=shuffle([D3,'Chỉ Mai đúng','Chỉ Việt đúng','Không bạn nào đúng']), s3={}; ch3.forEach(function(c,i){ if(c!==D3) s3[String(i)]='nham-hang-tron'; });
    return {type:'mcq', cot:2, _lv:3, _n:n, _dung:D3, q:hinh+'<div>Thư viện có <b>'+sx(n)+'</b> cuốn sách. Mai làm tròn đến hàng chục nói «khoảng <b>'+sx(tron(n,10))+'</b> cuốn». Việt làm tròn đến hàng trăm nói «khoảng <b>'+sx(tron(n,100))+'</b> cuốn». Ai làm tròn đúng?</div>', choices:ch3, correct:ch3.indexOf(D3), sai:s3, goiY:gy()};
  }, check:function(q){ var n=q._n; if(!kiemMCQ(q) || n<1000 || n>9999) return false;
    if(q._lv<=1){ var d=tron(n,10), mdung=q._vm===d, vdung=q._vv===d; if(mdung===vdung) return false; return q._dung===(mdung ? 'Mai' : 'Việt') && q.choices.length===4; }
    if(q._lv===2) return n%10>=1 && n%10<=4 && q._vv===len(n,10) && q._vv!==tron(n,10) && q.choices.length===4;
    return tron(n,10)!==tron(n,100) && q.q.indexOf(sx(tron(n,10)))>=0 && q.q.indexOf(sx(tron(n,100)))>=0 && q._dung==='Cả hai bạn đều đúng' && q.choices.length===4; }},

  /* D7 — Trục số làm tròn (không có trong SGK) */
  {name:'Trục số làm tròn', sec:'Ôn tập — điểm P trên trục số: gần số tròn chục (tròn trăm) nào hơn; điểm ở giữa', mt:['MT1'], levels:3,
   muc:['Điểm P gần số tròn chục nào hơn.', 'Điểm P gần số tròn trăm nào hơn.', 'Điểm P ở chính giữa hai số tròn: làm tròn thành số nào.'],
   make:function(lv){
    var b, lo, n, hoi;
    if(lv<=1){ b=10; lo=rnd(101,989)*10; n=lo+pick([1,2,3,4,6,7,8,9]); hoi='Điểm P gần số tròn chục nào hơn?'; }
    else if(lv===2){ b=100; lo=rnd(11,98)*100; n=lo+pick([10,20,30,40,60,70,80,90])+rnd(0,9); hoi='Điểm P gần số tròn trăm nào hơn?'; }
    else { b=pick([10,100]); lo=b===10 ? rnd(101,989)*10 : rnd(11,98)*100; n=lo+b/2; hoi='Điểm P nằm chính giữa hai số tròn. Làm tròn số <b>'+sx(n)+'</b> đến '+tenHang(b)+' thì được số nào?'; }
    var hi=lo+b, dung = lv>=3 ? hi : (n-lo<b/2 ? lo : hi), cs=[[lo,'lam-tron-nham-5'],[hi,'lam-tron-nham-5'],[lo-b,'nham-hang-tron'],[hi+b,'nham-hang-tron']].map(function(p){ return [sx(p[0]),p[1]]; }), mm=lapMCQ(sx(dung), cs.filter(function(p){ return p[0]!==sx(dung); }));
    return {type:'mcq', cot:2, _lv:lv, _dung:mm._dung, q:khungHinh(trucTron(lo,hi,n).replace(/<\/svg>$/,''))+'<div>'+(lv>=3 ? '' : 'Điểm P ứng với số <b>'+sx(n)+'</b>. ')+hoi+'</div>', choices:mm.choices, correct:mm.correct, sai:mm.sai, goiY:gy()};
  }, check:function(q){ var t=docTruc(q.q); if(!t || !kiemMCQ(q) || q.choices.length!==4) return false; var b=t.hi-t.lo; if(b!==10 && b!==100) return false; var e = tron(t.n,b); if(q._dung!==sx(e)) return false;
    if(q._lv<=1) return b===10 && (t.n-t.lo)*2!==b; if(q._lv===2) return b===100 && (t.n-t.lo)*2!==b; return (t.n-t.lo)*2===b && e===t.hi; }},

  /* D8 — Chọn kết quả (không có trong SGK) */
  {name:'Chọn kết quả làm tròn', sec:'Ôn tập — chọn kết quả làm tròn đúng trong bốn số', mt:['MT1'], levels:3,
   muc:['Chọn kết quả làm tròn đến hàng chục.', 'Chọn kết quả làm tròn đến hàng trăm.', 'Số có chữ số cuối là 5: chọn kết quả làm tròn đến hàng chục hoặc hàng trăm.'],
   make:function(lv){
    var b = lv<=1 ? 10 : (lv===2 ? 100 : pick([10,100])), n; do { n = lv<=2 ? soVoi(null,null) : (b===10 ? soVoi(5, rnd(0,8)) : rnd(10,98)*100+50+rnd(0,9)); } while(tron(n,b)===n || n%b===0);
    var T=tron(n,b), m=lapMCQ(sx(T), saiTron(n,b).map(function(p){ return [sx(p[0]),p[1]]; }));
    return {type:'mcq', cot:2, _lv:lv, _n:n, _b:b, _dung:m._dung, q:'<div>Làm tròn số <b>'+sx(n)+'</b> đến <b>'+tenHang(b)+'</b>. Kết quả là số nào?</div>', choices:m.choices, correct:m.correct, sai:m.sai, goiY:gy()};
  }, check:function(q){ var n=q._n, b=q._b; if(n<1000 || n>9999 || !kiemMCQ(q) || q.choices.length!==4 || q._dung!==sx(tron(n,b)) || q.q.indexOf(sx(n))<0) return false;
    if(q._lv<=1) return b===10; if(q._lv===2) return b===100; return b===10 ? n%10===5 : n%100>=50 && n%100<=59; }},

  /* D9 — Đúng hay sai (không có trong SGK) */
  {name:'Đúng hay sai', sec:'Ôn tập — 3 058 làm tròn đến hàng chục là 3 060: đúng hay sai', mt:['MT2'], levels:3,
   muc:['Một câu làm tròn đến hàng chục: đúng hay sai.', 'Một câu làm tròn đến hàng trăm: đúng hay sai.', 'Ba câu, chọn câu đúng.'],
   make:function(lv){
    function cau(n,b,r){ return sx(n)+' làm tròn đến '+tenHang(b)+' là '+sx(r); }
    function mot(b, dung){ var n=soVoi(null,null), r=tron(n,b); if(b===100) n=rnd(10,98)*100+rnd(0,99); r=tron(n,b); if(dung) return {n:n,b:b,r:r}; var w=saiTron(n,b).map(function(p){ return p[0]; }).filter(function(v){ return v!==r && v>0; }); return {n:n,b:b,r:pick(w)}; }
    if(lv<=2){ var yc=Math.random()<0.5, s=mot(lv<=1 ? 10 : 100, yc);
      return {type:'mcq', cot:2, _lv:lv, _s:JSON.stringify(s), _dung:yc?'Đúng':'Sai', q:'<div>Bé xem câu sau đúng hay sai:</div>'+bieuThucTo(cau(s.n,s.b,s.r)), choices:['Đúng','Sai'], correct:yc?0:1, sai:(yc?{'1':'lam-tron-nham-5'}:{'0':'lam-tron-nham-5'}), goiY:gy()}; }
    var ss=[mot(10,true), mot(10,false), mot(100,false)], tx=ss.map(function(s){ return cau(s.n,s.b,s.r); }), D=tx[0], ord=shuffle(tx.slice()), sai3={}; ord.forEach(function(c,i){ if(c!==D) sai3[String(i)]='lam-tron-nham-5'; });
    return {type:'mcq', cot:1, _lv:3, _s:JSON.stringify(ss), _dung:D, q:'<div>Chỉ có một câu đúng. Bé chọn câu đúng nhé!</div>', choices:ord, correct:ord.indexOf(D), sai:sai3, goiY:gy()};
  }, check:function(q){ function ev(s){ return s.r===tron(s.n,s.b); } function cau(s){ return sx(s.n)+' làm tròn đến '+tenHang(s.b)+' là '+sx(s.r); } if(!kiemMCQ(q)) return false;
    if(q._lv<=2){ var s=JSON.parse(q._s); if(q.q.indexOf(cau(s))<0 || s.n<1000 || s.n>9999) return false; return (q._dung==='Đúng')===ev(s) && s.b===(q._lv<=1 ? 10 : 100); }
    var ss=JSON.parse(q._s); if(ss.length!==3 || q.choices.length!==3) return false; var ok=ss.filter(ev); return ok.length===1 && q._dung===cau(ok[0]) && ss.every(function(x){ return q.choices.indexOf(cau(x))>=0; }); }},

  /* D10 — Bạn An làm tròn (không có trong SGK) */
  {name:'Bạn An làm tròn', sec:'Ôn tập — bạn An làm tròn 1 725 đến hàng chục thành 1 720: em có đồng ý không, An sai ở đâu, kết quả đúng', mt:['MT2'], levels:3,
   muc:['An làm tròn một số đến hàng chục: em có đồng ý không.', 'An làm tròn xuống số có chữ số cuối là 5: An sai ở đâu.', 'An làm tròn sai: kết quả đúng là bao nhiêu.'],
   make:function(lv){
    var n, an, dung=Math.random()<0.5;
    if(lv<=1){ n=soVoi(rnd(1,9), rnd(0,8)); an = dung ? tron(n,10) : (n%10>=5 ? xuong(n,10) : len(n,10)); var D=dung?'Đồng ý':'Không đồng ý';
      return {type:'mcq', cot:2, _lv:1, _n:n, _an:an, _dung:D, q:nguoi('boy','Bạn An')+'<div>Bạn An làm tròn số <b>'+sx(n)+'</b> đến hàng chục được <b>'+sx(an)+'</b>. Em có đồng ý với An không?</div>', choices:['Đồng ý','Không đồng ý'], correct:dung?0:1, sai:(dung?{'1':'lam-tron-nham-5'}:{'0':'lam-tron-nham-5'}), goiY:gy()}; }
    n=soVoi(5, rnd(0,8)); an=xuong(n,10);
    if(lv===2){ var D2='Chữ số hàng đơn vị là 5 nên phải làm tròn lên', mm=lapMCQ(D2, [['An làm tròn đến hàng trăm, không phải hàng chục','nham-hang-tron'],['Chữ số hàng đơn vị là 5 nên giữ nguyên số','lam-tron-nham-5'],['An viết sai chữ số hàng nghìn','nham-hang-tron']]);
      return {type:'mcq', cot:1, _lv:2, _n:n, _an:an, _dung:D2, q:nguoi('boy','Bạn An')+'<div>Bạn An làm tròn số <b>'+sx(n)+'</b> đến hàng chục được <b>'+sx(an)+'</b>. An làm sai rồi! An sai ở đâu?</div>', choices:mm.choices, correct:mm.correct, sai:mm.sai, goiY:gy()}; }
    return {type:'num', _lv:3, _n:n, _an:an, q:nguoi('boy','Bạn An')+'<div>Bạn An làm tròn số <b>'+sx(n)+'</b> đến hàng chục được <b>'+sx(an)+'</b>. An làm sai rồi! Kết quả đúng là bao nhiêu?</div>', ans:tron(n,10), sai:nhanSai([[an,'lam-tron-nham-5'],[tron(n,100),'nham-hang-tron'],[tron(n,10)+10,'lam-tron-nham-5'],[n,'nham-hang-tron']], tron(n,10)), goiY:gy()};
  }, check:function(q){ var n=q._n, an=q._an; if(n<1000 || n>9999) return false;
    if(q._lv<=1){ return kiemMCQ(q) && q.choices.length===2 && an!==n && (q._dung==='Đồng ý')===(an===tron(n,10)) && q.q.indexOf(sx(an))>=0; }
    if(n%10!==5 || an!==xuong(n,10)) return false; if(q._lv===2) return kiemMCQ(q) && q.choices.length===4 && q._dung==='Chữ số hàng đơn vị là 5 nên phải làm tròn lên'; return q.ans===tron(n,10) && q.ans!==an; }}
 ]
};
