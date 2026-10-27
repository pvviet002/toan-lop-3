/* bai-61.js — Bài 61: Làm tròn số đến hàng nghìn, hàng chục nghìn (Tập 2, Chủ đề 11). BÀI MỚI, Engine v2 — LUYỆN THÔNG MINH.
   Theo bảng phân tích sư phạm đã duyệt (phan-tich-su-pham/bai-61.md): 3 MỤC TIÊU (muctieu) × 10 DẠNG (topics), mỗi dạng 3 mức (Thông tư 27).
   Hình (mẫu bài 48 mở rộng lên năm chữ số): mayTron (máy làm tròn, data-may/data-in/data-out). check() đọc lại hình từ chuỗi SVG và tính lại.
   QUY TẮC: nối chuỗi, KHÔNG backtick, KHÔNG template literal. */

var NB=' ';
/* ---- Tiện ích chung ---- */
function nhanSai(ds, dung){ var o={}; ds.forEach(function(p){ var v=p[0]; if(Number.isInteger(v) && v>0 && v!==dung && !(String(v) in o)) o[String(v)]=p[1]; }); return o; }
function kiemMCQ(q){ return q.choices[q.correct]===q._dung && new Set(q.choices).size===q.choices.length; }
function svgX(w, h, px){ return svgHinh(w, h, px).replace('<svg ', '<svg class="text-slate-700" '); }
function khungHinh(s){ return '<div class="flex justify-center my-2">'+s+'</svg></div>'; }
function bieuThucTo(t){ return '<div class="text-3xl font-extrabold text-orange-600 my-2">'+t+'</div>'; }
function nguoi(ten, alt){ return '<div class="flex justify-center mb-1">'+anh(ten, 72, alt)+'</div>'; }
function sx(n){ var s=String(n); return s.length>=4 ? s.slice(0,s.length-3)+NB+s.slice(-3) : s; }
function lapMCQ(dungStr, cacSai){
 var seen={}, ds=[]; seen[dungStr]=1; cacSai.forEach(function(p){ if(p[0] && !seen[p[0]]){ seen[p[0]]=1; ds.push(p); } });
 var opts=[[dungStr,'']].concat(ds.slice(0,3)); opts=shuffle(opts); var sai={};
 opts.forEach(function(o,i){ if(o[0]!==dungStr) sai[String(i)]=o[1]; });
 var cs=opts.map(function(o){ return o[0]; });
 return {choices:cs, correct:cs.indexOf(dungStr), sai:sai, _dung:dungStr};
}
/* ---- Phép cộng: số nhớ, kết quả sai thường gặp ---- */
function cotSo(n, i){ return Math.floor(n/Math.pow(10,i))%10; }
function demKhong(n){ return (String(n).match(/0/g)||[]).length; }

function un(s){ return +String(s).split(NB).join(''); }
function tron(n, b){ return Math.floor((n+b/2)/b)*b; }
function xuong(n, b){ return Math.floor(n/b)*b; }
function len(n, b){ return Math.ceil(n/b)*b; }
var TEN={10:'hàng chục', 100:'hàng trăm', 1000:'hàng nghìn', 10000:'hàng chục nghìn'};
var HANG4=[10,100,1000,10000];
function tachNam(n){ var d=String(n).split(''); return [+(d[0]+'0000'), +(d[1]+'000'), +(d[2]+'00'), +(d[3]+d[4])].filter(function(x){ return x>0; }); }
function tongArr(a){ return a.reduce(function(s,x){ return s+x; }, 0); }
/* số làm tròn đến hàng nghìn: lv1 hàng trăm < 5; lv2 hàng trăm >= 5; lv3 qua hàng chục nghìn */
function nNghin(lv){
 var g, n, h;
 if(lv>=3) return rnd(0,9)*10000+9000+rnd(5,9)*100+rnd(1,99);
 for(g=0; g<500; g++){ n=rnd(1000,99999); h=Math.floor(n/100)%10; if(n%1000===0) continue; if(lv<=1 && h<5 && n>=10000) return n; if(lv===2 && h>=5 && Math.floor(n/1000)%10!==9) return n; }
 return lv<=1 ? 11204 : 11678;
}
/* số làm tròn đến hàng chục nghìn: lv1 hàng nghìn < 5; lv2 hàng nghìn >= 5; lv3 hàng nghìn bằng 5 hoặc qua 100 000 */
function nChuc(lv){
 var g, n, t;
 if(lv>=3) return Math.random()<0.6 ? rnd(1,8)*10000+5000+rnd(0,999) : 90000+rnd(5,9)*1000+rnd(0,999);
 for(g=0; g<500; g++){ n=rnd(10000,99999); t=Math.floor(n/1000)%10; if(n%10000===0) continue; if(lv<=1 && t<5) return n; if(lv===2 && t>=5 && Math.floor(n/10000)!==9) return n; }
 return lv<=1 ? 82134 : 55712;
}
function nTheo(b, lv){ return b===1000 ? nNghin(lv) : nChuc(lv); }
/* kết quả sai thường gặp: [giá trị, nhãn] */
function saiTron(n, b){
 var c=tron(n,b), o=[], ot = c===xuong(n,b) ? len(n,b) : xuong(n,b);
 o.push([ot,'lam-tron-nham-5']); o.push([c+b,'lam-tron-nham-5']); if(c-b>0) o.push([c-b,'lam-tron-nham-5']);
 o.push([tron(n, b===1000 ? 10000 : 1000),'nham-hang-tron']); o.push([tron(n,100),'nham-hang-tron']);
 var q=Math.floor(n/(b*10))*(b*10); if(c>=q+b*10 || (c===len(n,b) && c%(b*10)===0)) o.unshift([q,'quen-nho-tron']);
 o.push([n,'nham-hang-tron']); o.push([c+2*b,'nham-hang-tron']); if(c-2*b>0) o.push([c-2*b,'nham-hang-tron']);
 var seen={}; return o.filter(function(p){ if(p[0]<=0 || p[0]>100000 || p[0]===c || seen[p[0]]) return false; seen[p[0]]=1; return true; });
}
function saiMCQ(n, b){ return saiTron(n,b).map(function(p){ return [sx(p[0]), p[1]]; }); }
function ptr(ve, b, x){ return ve+' làm tròn đến '+TEN[b]+' là '+sx(x); }
function mayTron(b, vao, ra){
 var o=svgX(330,100,330).replace('<svg ','<svg data-may="'+b+'" data-in="'+vao+'" data-out="'+ra+'" ');
 var tv = vao==='?' ? '?' : sx(vao), tr = ra==='?' ? '?' : sx(ra);
 o+='<rect x="2" y="30" width="92" height="42" rx="10" fill="#fff" stroke="'+HM.day+'" stroke-width="3"/>'+chuSo(48, 51, tv, 19);
 o+='<path d="M97 51 L108 51 M104 44 L111 51 L104 58" fill="none" stroke="'+HM.troiDam+'" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>';
 o+='<rect x="115" y="12" width="100" height="78" rx="10" fill="'+HM.troi+'"/><text x="165" y="43" text-anchor="middle" font-size="15" '+HFONT+' fill="'+HM.chu+'">Làm tròn</text><text x="165" y="65" text-anchor="middle" font-size="15" '+HFONT+' fill="'+HM.chu+'">'+(b===1000 ? 'hàng nghìn' : 'chục nghìn')+'</text>';
 o+='<path d="M218 51 L229 51 M225 44 L232 51 L225 58" fill="none" stroke="'+HM.troiDam+'" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>';
 o+='<rect x="236" y="30" width="92" height="42" rx="10" fill="#fff" stroke="'+HM.day+'" stroke-width="3"/>'+chuSo(282, 51, tr, 19);
 return '<div class="flex justify-center my-2">'+o+'</svg></div>';
}
function docMay(html){ var m=/data-may="(\d+)" data-in="(\d+|\?)" data-out="(\d+|\?)"/.exec(html); return m ? {b:+m[1], vao:m[2]==='?' ? null : +m[2], ra:m[3]==='?' ? null : +m[3]} : null; }
var CANH=[['Kho','kg cà phê'],['Huyện','người'],['Thư viện','cuốn sách'],['Sân vận động','chỗ ngồi']];
var BAN=['Nam','Mai','Lan'];

var GOI={'lam-tron-nham-5':'Xem chữ số ngay bên phải hàng cần làm tròn: bé hơn 5 thì làm tròn xuống, từ 5 trở lên thì làm tròn lên.',
  'nham-hang-tron':'Đọc kỹ làm tròn đến hàng nào: hàng nghìn thì xem chữ số hàng trăm; hàng chục nghìn thì xem chữ số hàng nghìn.',
  'quen-nho-tron':'Làm tròn lên thì chữ số ở hàng bên trái tăng thêm 1 (có thể phải nhớ): 49 600 làm tròn đến hàng nghìn là 50 000.',
  'quen-lam-tron':'Bé làm tròn từng số đến hàng đã cho rồi mới cộng các số đã làm tròn.'};
function gy(){ var o={}, k; for(k in GOI) o[k]=GOI[k]; return o; }

var BAI = {
 n: 61,
 title: 'Làm Tròn Số Đến Hàng Nghìn, Hàng Chục Nghìn',
 sub: 'Luyện thông minh: câu hỏi tự đổi theo bé — làm hết lượt để xem ngọn lửa!',
 goal: 10, soCau: 18, soCauToiDa: 24,
 loi: {'lam-tron-nham-5':'Nhầm quy tắc làm tròn (so với 5)', 'nham-hang-tron':'Nhầm hàng cần làm tròn', 'quen-nho-tron':'Quên tăng hàng bên trái khi làm tròn lên', 'quen-lam-tron':'Chưa làm tròn từng số'},
 muctieu: [
  {id:'MT1', ten:'Làm tròn đến hàng nghìn', muc:['Chữ số hàng trăm bé hơn 5 (11 204 thành 11 000).', 'Chữ số hàng trăm từ 5 trở lên (11 678 thành 12 000).', 'Làm tròn lên qua hàng chục nghìn (9 805 thành 10 000; 49 600 thành 50 000).']},
  {id:'MT2', ten:'Làm tròn đến hàng chục nghìn', muc:['Chữ số hàng nghìn bé hơn 5 (82 134 thành 80 000).', 'Chữ số hàng nghìn từ 5 trở lên (55 712 thành 60 000).', 'Chữ số hàng nghìn bằng 5 (35 425 thành 40 000); qua 100 000.']},
  {id:'MT3', ten:'Ước lượng «khoảng», chọn hàng làm tròn', muc:['Khoảng bao nhiêu; số 36 000 là làm tròn đến hàng nào.', 'Số dân khoảng bao nhiêu; ba bạn làm tròn ba hàng khác nhau.', 'Làm tròn từng số rồi cộng; vệ tinh 35 425 km; máy làm tròn ngược.']}
 ],
 topics: [
  /* D1 — Làm tròn đến hàng nghìn */
  {name:'Làm tròn đến hàng nghìn', sec:'Khám phá, bài 1 — 11 678 thành 12 000; 11 204 thành 11 000; 11 515 thành 12 000; 65 341; 10 501; 9 805', mt:['MT1'], levels:3,
   muc:['Chữ số hàng trăm bé hơn 5.', 'Chữ số hàng trăm từ 5 trở lên.', 'Làm tròn lên qua hàng chục nghìn.'],
   make:function(lv){
    var n=nNghin(lv), ans=tron(n,1000);
    return {type:'num', _lv:lv, _n:n, q:'<div>Làm tròn số sau đến <b>hàng nghìn</b>:</div>'+bieuThucTo(sx(n)), ans:ans, sai:nhanSai(saiTron(n,1000), ans), goiY:gy()};
  }, check:function(q){ var n=q._n, h=Math.floor(n/100)%10, t=Math.floor(n/1000)%10; if(n<1000 || n>99999 || q.ans!==tron(n,1000) || q.q.indexOf('>'+sx(n)+'<')<0 || n%1000===0) return false;
    if(q._lv<=1) return h<5; if(q._lv===2) return h>=5 && t!==9; return h>=5 && t===9; }},

  /* D2 — Làm tròn đến hàng chục nghìn */
  {name:'Làm tròn đến hàng chục nghìn', sec:'Khám phá, bài 1 — 11 678 thành 10 000; 17 051 thành 20 000; 15 001 thành 20 000; 82 134; 55 712; 46 000', mt:['MT2'], levels:3,
   muc:['Chữ số hàng nghìn bé hơn 5.', 'Chữ số hàng nghìn từ 5 trở lên.', 'Chữ số hàng nghìn bằng 5; qua 100 000.'],
   make:function(lv){
    var n=nChuc(lv), ans=tron(n,10000);
    return {type:'num', _lv:lv, _n:n, q:'<div>Làm tròn số sau đến <b>hàng chục nghìn</b>:</div>'+bieuThucTo(sx(n)), ans:ans, sai:nhanSai(saiTron(n,10000), ans), goiY:gy()};
  }, check:function(q){ var n=q._n, t=Math.floor(n/1000)%10, p=Math.floor(n/10000); if(n<10000 || n>99999 || q.ans!==tron(n,10000) || q.q.indexOf('>'+sx(n)+'<')<0 || n%10000===0) return false;
    if(q._lv<=1) return t<5; if(q._lv===2) return t>=5 && p!==9; return t===5 || (p===9 && t>=5); }},

  /* D3 — Làm tròn đến hàng nào */
  {name:'Làm tròn đến hàng nào', sec:'Bài 3 — 11 678 làm tròn thành 12 000: đã làm tròn đến hàng nào', mt:['MT3'], levels:3,
   muc:['Kết quả làm tròn đến hàng nghìn.', 'Kết quả làm tròn đến hàng chục nghìn.', 'Kết quả làm tròn đến hàng chục hoặc hàng trăm.'],
   make:function(lv){
    var tg = lv<=1 ? 1000 : (lv===2 ? 10000 : pick([10,100])), n, g, vs, r;
    for(g=0; g<1000; g++){ n=rnd(10000,99999); vs=HANG4.map(function(h){ return tron(n,h); }); if(new Set(vs).size===4 && vs.indexOf(n)<0) break; }
    r=tron(n,tg);
    var ch=HANG4.map(function(h){ return TEN[h]; }), D=TEN[tg], sai={}; ch=shuffle(ch); ch.forEach(function(c,i){ if(c!==D) sai[String(i)]='nham-hang-tron'; });
    return {type:'mcq', cot:2, _lv:lv, _n:n, _t:tg, _dung:D, q:'<div>Số <b>'+sx(n)+'</b> được làm tròn thành <b>'+sx(r)+'</b>.</div><div>Bé đã làm tròn đến hàng nào?</div>', choices:ch, correct:ch.indexOf(D), sai:sai, goiY:gy()};
  }, check:function(q){ var n=q._n, tg=q._t, r=tron(n,tg); if(!kiemMCQ(q) || q.choices.length!==4 || q.q.indexOf('<b>'+sx(n)+'</b> được làm tròn thành <b>'+sx(r)+'</b>')<0) return false;
    var hit=HANG4.filter(function(h){ return tron(n,h)===r; }); if(hit.length!==1 || hit[0]!==tg || q._dung!==TEN[tg]) return false;
    if(q._lv<=1) return tg===1000; if(q._lv===2) return tg===10000; return tg===10 || tg===100; }},

  /* D4 — Khoảng bao nhiêu */
  {name:'Khoảng bao nhiêu', sec:'Bài 2 — cà phê 13 787 kg khoảng 14 000 kg; số dân 71 839 làm tròn đến hàng chục nghìn là 70 000', mt:['MT3'], levels:3,
   muc:['Làm tròn đến hàng nghìn rồi nói «khoảng».', 'Làm tròn số dân đến hàng chục nghìn.', 'Làm tròn từng số đến hàng nghìn rồi cộng.'],
   make:function(lv){
    var cf=pick(CANH), ten=cf[0], dv=cf[1], n, n2, ans, sai, q;
    if(lv<=1){ n=nNghin(rnd(1,2)); ans=tron(n,1000); sai=saiTron(n,1000); q='<div>'+ten+' có <b>'+sx(n)+'</b> '+dv+'.</div><div>Làm tròn đến <b>hàng nghìn</b>, '+ten.toLowerCase()+' có khoảng bao nhiêu '+dv+'?</div>'; }
    else if(lv===2){ n=nChuc(rnd(1,2)); ans=tron(n,10000); sai=saiTron(n,10000); q='<div>'+ten+' có <b>'+sx(n)+'</b> '+dv+'.</div><div>Làm tròn đến <b>hàng chục nghìn</b>, '+ten.toLowerCase()+' có khoảng bao nhiêu '+dv+'?</div>'; }
    else { var g; for(g=0; g<500; g++){ n=rnd(1000,49999); n2=rnd(1000,49999); if(n%1000!==0 && n2%1000!==0 && Math.abs(n-n2)>1000) break; }
     ans=tron(n,1000)+tron(n2,1000); sai=[[xuong(n,1000)+xuong(n2,1000),'lam-tron-nham-5'],[len(n,1000)+len(n2,1000),'lam-tron-nham-5'],[n+n2,'quen-lam-tron'],[tron(n,1000)+n2,'quen-lam-tron']];
     q='<div>'+ten+' A có <b>'+sx(n)+'</b> '+dv+'. '+ten+' B có <b>'+sx(n2)+'</b> '+dv+'.</div><div>Làm tròn mỗi số đến <b>hàng nghìn</b> rồi cộng: hai nơi có khoảng bao nhiêu '+dv+'?</div>'; }
    return {type:'num', _lv:lv, _ci:CANH.indexOf(cf), _n:n, _n2:n2||0, q:q, ans:ans, sai:nhanSai(sai, ans), goiY:gy()};
  }, check:function(q){ var n=q._n, n2=q._n2, cf=CANH[q._ci]; if(!cf || q.q.indexOf('<b>'+sx(n)+'</b>')<0) return false;
    if(q._lv<=1) return q.ans===tron(n,1000) && n>=1000 && n%1000!==0 && q.q.indexOf('hàng nghìn')>=0;
    if(q._lv===2) return q.ans===tron(n,10000) && n>=10000 && n%10000!==0 && q.q.indexOf('hàng chục nghìn')>=0;
    return n2>=1000 && q.q.indexOf('<b>'+sx(n2)+'</b>')>=0 && q.ans===tron(n,1000)+tron(n2,1000) && q.ans<=100000; }},

  /* D5 — Máy làm tròn */
  {name:'Máy làm tròn', sec:'Dạng thêm (không có trong SGK) — máy làm tròn số đến hàng nghìn, hàng chục nghìn', mt:['MT3'], levels:3,
   muc:['Máy làm tròn đến hàng nghìn: tìm số ra.', 'Máy làm tròn đến hàng chục nghìn: tìm số ra.', 'Biết số ra, chọn số vào.'],
   make:function(lv){
    if(lv<=2){ var b = lv<=1 ? 1000 : 10000, n=nTheo(b, rnd(1,2)), ans=tron(n,b);
     return {type:'num', _lv:lv, q:mayTron(b, n, '?')+'<div>Số ra khỏi máy là số nào?</div>', ans:ans, sai:nhanSai(saiTron(n,b), ans), goiY:gy()}; }
    var bb=pick([1000,10000]), r, n3, d, g, cs, ok;
    for(g=0; g<500; g++){
     r = bb===1000 ? rnd(11,98)*1000 : rnd(2,8)*10000; n3=r-bb/2+rnd(0,bb-1); if(n3===r) continue;
     cs=[n3, r+bb/2+rnd(0,bb/2-1), r-bb-bb/2+rnd(0,bb/2-1)+1, r+bb+bb/2+rnd(0,bb/2-1)];
     ok = cs.every(function(v){ return v>=1000 && v<=99999; }) && tron(cs[0],bb)===r && cs.slice(1).every(function(v){ return tron(v,bb)!==r; }) && new Set(cs).size===4; if(ok) break;
    }
    var ch=shuffle(cs.map(sx)), D=sx(n3), sai={}; ch.forEach(function(c,i){ if(c!==D) sai[String(i)] = un(c)>r+bb ? 'nham-hang-tron' : 'lam-tron-nham-5'; });
    return {type:'mcq', cot:2, _lv:3, _dung:D, q:mayTron(bb, '?', r)+'<div>Số ra khỏi máy là <b>'+sx(r)+'</b>. Số nào có thể là số vào máy?</div>', choices:ch, correct:ch.indexOf(D), sai:sai, goiY:gy()};
  }, check:function(q){ var m=docMay(q.q); if(!m) return false;
    if(q._lv<=2){ if(m.vao===null || m.ra!==null) return false; return q.ans===tron(m.vao,m.b) && m.b===(q._lv<=1 ? 1000 : 10000) && m.vao>=1000 && m.vao!==q.ans; }
    if(m.vao!==null || m.ra===null || !kiemMCQ(q) || q.choices.length!==4) return false; var hit=q.choices.filter(function(c){ return tron(un(c),m.b)===m.ra; }); return hit.length===1 && hit[0]===q._dung && q.q.indexOf('<b>'+sx(m.ra)+'</b>')>=0 && q.choices.every(function(c){ return un(c)>=1000 && un(c)<=99999; }); }},

  /* D6 — Ba bạn làm tròn số đo vệ tinh */
  {name:'Ba bạn làm tròn', sec:'Bài 4 — vệ tinh cách mặt đất 35 786 km: ba bạn nói 40 000, 35 800, 36 000; 35 425 km: hàng nghìn 35 000, hàng chục nghìn 40 000', mt:['MT3'], levels:3,
   muc:['Một bạn nói số đã làm tròn: làm tròn đến hàng nào.', 'Ba bạn, ba hàng: bạn nào làm tròn đến hàng đã cho.', 'Số có chữ số hàng nghìn là 5.'],
   make:function(lv){
    var n, g, v3, hs=[100,1000,10000];
    for(g=0; g<2000; g++){ n=rnd(10000,99999); v3=hs.map(function(h){ return tron(n,h); }); if(new Set(v3).size!==3 || v3.indexOf(n)>=0) continue; if(lv>=3 && Math.floor(n/1000)%10!==5) continue; break; }
    var vang = '<div>Vệ tinh cách mặt đất <b>'+sx(n)+'</b> km.</div>';
    if(lv<=1){ var h1=pick(hs), r1=tron(n,h1), ch=hs.map(function(h){ return TEN[h]; }).concat([TEN[10]]), D=TEN[h1], sai={}; ch=shuffle(ch); ch.forEach(function(c,i){ if(c!==D) sai[String(i)]='nham-hang-tron'; });
     return {type:'mcq', cot:2, _lv:1, _n:n, _h:h1, _dung:D, q:nguoi('boy','Bạn Nam')+vang+'<div>Bạn Nam nói: «Khoảng <b>'+sx(r1)+'</b> km.»</div><div>Bạn Nam làm tròn đến hàng nào?</div>', choices:ch, correct:ch.indexOf(D), sai:sai, goiY:gy()}; }
    var ord=shuffle(hs.slice()), hoi=pick(hs), dong='', D2=null;
    BAN.forEach(function(b,i){ dong+='<div>Bạn '+b+' nói: «Khoảng <b>'+sx(tron(n,ord[i]))+'</b> km.»</div>'; if(ord[i]===hoi) D2='Bạn '+b; });
    var ch2=BAN.map(function(b){ return 'Bạn '+b; }), sai2={}; ch2.forEach(function(c,i){ if(c!==D2) sai2[String(i)]='nham-hang-tron'; });
    return {type:'mcq', cot:2, _lv:lv, _n:n, _ord:ord.join(','), _hoi:hoi, _dung:D2, q:vang+dong+'<div class="mt-1">Bạn nào làm tròn đến <b>'+TEN[hoi]+'</b>?</div>', choices:ch2, correct:ch2.indexOf(D2), sai:sai2, goiY:gy()};
  }, check:function(q){ if(!kiemMCQ(q)) return false; var n=q._n, hs=[100,1000,10000];
    if(q._lv<=1){ if(q.choices.length!==4 || hs.indexOf(q._h)<0 || q._dung!==TEN[q._h] || q.q.indexOf('<b>'+sx(n)+'</b> km')<0 || q.q.indexOf('<b>'+sx(tron(n,q._h))+'</b>')<0) return false; return new Set(hs.map(function(h){ return tron(n,h); })).size===3 && hs.every(function(h){ return tron(n,h)!==n; }); }
    var ord=q._ord.split(',').map(Number); if(ord.length!==3 || q.choices.length!==3 || new Set(ord).size!==3 || q.q.indexOf('<b>'+sx(n)+'</b> km')<0) return false;
    if(new Set(hs.map(function(h){ return tron(n,h); })).size!==3) return false; var i=ord.indexOf(q._hoi); if(i<0 || q._dung!=='Bạn '+BAN[i]) return false;
    if(!ord.every(function(h,j){ return q.q.indexOf('Bạn '+BAN[j]+' nói: «Khoảng <b>'+sx(tron(n,h))+'</b>')>=0; })) return false; if(q._lv>=3) return Math.floor(n/1000)%10===5; return true; }},

  /* D7 — Chữ số 5 ở giữa */
  {name:'Chữ số 5 ở giữa', sec:'Bài 4 (ý 2) — 35 425 km: hàng nghìn là 5 thì làm tròn lên 40 000', mt:['MT2'], levels:3,
   muc:['Chữ số hàng nghìn là 5, làm tròn đến hàng chục nghìn.', 'Chữ số hàng trăm là 5, làm tròn đến hàng nghìn.', 'So hai số: kết quả làm tròn giống hay khác nhau.'],
   make:function(lv){
    if(lv<=1){ var n=rnd(1,8)*10000+5000+rnd(1,999), ans=tron(n,10000);
     return {type:'num', _lv:1, _n:n, q:'<div>Số <b>'+sx(n)+'</b> có chữ số hàng nghìn là <b>5</b>.</div><div>Làm tròn số đó đến <b>hàng chục nghìn</b>:</div>', ans:ans, sai:nhanSai(saiTron(n,10000), ans), goiY:gy()}; }
    if(lv===2){ var m=rnd(10,98)*1000+500+rnd(1,99), a2=tron(m,1000);
     return {type:'num', _lv:2, _n:m, q:'<div>Số <b>'+sx(m)+'</b> có chữ số hàng trăm là <b>5</b>.</div><div>Làm tròn số đó đến <b>hàng nghìn</b>:</div>', ans:a2, sai:nhanSai(saiTron(m,1000), a2), goiY:gy()}; }
    var khac=Math.random()<0.5, p=rnd(1,8)*10000, a, b;
    if(khac){ a=p+4000+rnd(0,999); b=p+5000+rnd(0,999); } else { var up=Math.random()<0.5; a=p+(up ? 5000 : rnd(0,4)*1000)+rnd(0,999); b=p+(up ? rnd(5,9)*1000 : rnd(0,4)*1000)+rnd(0,999); if(up===false && a===b) b=a+1; if(up && a===b) b=a+1; }
    if(Math.random()<0.5){ var t=a; a=b; b=t; }
    var D = tron(a,10000)===tron(b,10000) ? 'Giống nhau' : 'Khác nhau';
    return {type:'mcq', cot:2, _lv:3, _a:a, _b:b, _dung:D, q:'<div>Làm tròn mỗi số đến <b>hàng chục nghìn</b>:</div>'+bieuThucTo(sx(a)+' và '+sx(b))+'<div>Hai kết quả làm tròn giống nhau hay khác nhau?</div>', choices:['Giống nhau','Khác nhau'], correct:D==='Giống nhau'?0:1, sai:(D==='Giống nhau'?{'1':'lam-tron-nham-5'}:{'0':'lam-tron-nham-5'}), goiY:gy()};
  }, check:function(q){ var n=q._n;
    if(q._lv<=1) return q.ans===tron(n,10000) && Math.floor(n/1000)%10===5 && q.q.indexOf('<b>'+sx(n)+'</b>')>=0 && n%1000!==0;
    if(q._lv===2) return q.ans===tron(n,1000) && Math.floor(n/100)%10===5 && q.q.indexOf('<b>'+sx(n)+'</b>')>=0 && n%1000!==500 && n>=10000;
    var a=q._a, b=q._b; if(!kiemMCQ(q) || a===b || q.choices.length!==2 || q.q.indexOf(sx(a)+' và '+sx(b))<0 || a<10000 || b<10000 || a>99999 || b>99999) return false; return q._dung===(tron(a,10000)===tron(b,10000) ? 'Giống nhau' : 'Khác nhau'); }},

  /* D8 — Chọn kết quả */
  {name:'Chọn kết quả làm tròn', sec:'Dạng thêm (không có trong SGK) — chọn kết quả đúng trong bốn đáp án', mt:['MT1'], levels:3,
   muc:['Bốn đáp án: làm tròn đến hàng nghìn.', 'Bốn đáp án: làm tròn đến hàng chục nghìn.', 'Số sát nửa; các đáp án gần nhau.'],
   make:function(lv){
    var b = lv<=1 ? 1000 : (lv===2 ? 10000 : pick([1000,10000])), n;
    if(lv<=2) n=nTheo(b, rnd(1,2)); else { var base = b===1000 ? rnd(11,98)*1000 : rnd(1,9)*10000; n = base + b/2 + pick([0,0,-1,1,-10]); if(n>99999) n=base+b/2; }
    var c=tron(n,b), m=lapMCQ(sx(c), saiMCQ(n,b));
    return {type:'mcq', cot:2, _lv:lv, _n:n, _b:b, _dung:m._dung, q:'<div>Làm tròn số sau đến <b>'+TEN[b]+'</b>:</div>'+bieuThucTo(sx(n)), choices:m.choices, correct:m.correct, sai:m.sai, goiY:gy()};
  }, check:function(q){ var n=q._n, b=q._b; if(!kiemMCQ(q) || q.choices.length!==4 || q._dung!==sx(tron(n,b)) || q.q.indexOf('>'+sx(n)+'<')<0 || q.q.indexOf(TEN[b])<0 || n>99999) return false;
    if(q.choices.some(function(c){ return un(c)<=0 || un(c)>100000; })) return false; if(q._lv<=1) return b===1000; if(q._lv===2) return b===10000; var r=n%b; return Math.abs(r-b/2)<=10; }},

  /* D9 — Đúng hay sai */
  {name:'Làm tròn: đúng hay sai', sec:'Dạng thêm (không có trong SGK) — câu nói về kết quả làm tròn', mt:['MT2'], levels:3,
   muc:['Một câu về làm tròn một số.', 'Số viết thành tổng các hàng.', 'Ba câu, chọn câu đúng.'],
   make:function(lv){
    var one=function(expr, n, b){ var c=tron(n,b), sa=saiTron(n,b), tr=Math.random()<0.5, x = tr ? c : pick(sa)[0]; return {n:n, b:b, x:x, tr:tr, t:ptr(expr || sx(n), b, x)}; };
    var cau=function(){ var b=pick([1000,10000]), n=nTheo(b, rnd(1,2)); return one(null, n, b); };
    if(lv===1){ var s=cau();
     return {type:'mcq', cot:2, _lv:1, _s:JSON.stringify([s.n,s.b,s.x]), _dung:s.tr?'Đúng':'Sai', q:'<div>Bé xem câu sau đúng hay sai:</div><div class="text-xl font-extrabold text-orange-600 my-2">'+s.t+'</div>', choices:['Đúng','Sai'], correct:s.tr?0:1, sai:(s.tr?{'1':'lam-tron-nham-5'}:{'0':'lam-tron-nham-5'}), goiY:gy()}; }
    if(lv===2){ var g, n, ps; for(g=0; g<300; g++){ n=rnd(10000,99999); ps=tachNam(n); if(ps.length>=3 && n%1000!==0 && n%10000!==0) break; }
     var b2=pick([1000,10000]), tv=one(ps.map(sx).join(' + '), n, b2);
     return {type:'mcq', cot:2, _lv:2, _s:JSON.stringify([ps,b2,tv.x]), _dung:tv.tr?'Đúng':'Sai', q:'<div>Bé xem câu sau đúng hay sai:</div><div class="text-xl font-extrabold text-orange-600 my-2">'+tv.t+'</div>', choices:['Đúng','Sai'], correct:tv.tr?0:1, sai:(tv.tr?{'1':'lam-tron-nham-5'}:{'0':'lam-tron-nham-5'}), goiY:gy()}; }
    var ss=[], seen={}, i, s3;
    for(i=0;i<3;i++){ do { s3=cau(); } while(seen[s3.n] || (i===0 ? !s3.tr : s3.tr) || s3.n%1000===0); seen[s3.n]=1; ss.push(s3); }
    var txt=ss.map(function(z){ return z.t; }), D=txt[0], od=shuffle(txt.slice()), sai={}; od.forEach(function(c,k){ if(c!==D) sai[String(k)]='lam-tron-nham-5'; });
    return {type:'mcq', cot:1, _lv:3, _s:JSON.stringify(ss.map(function(z){ return [z.n,z.b,z.x]; })), _dung:D, q:'<div>Có đúng một câu <b>đúng</b>. Bé chọn câu đúng nhé!</div>', choices:od, correct:od.indexOf(D), sai:sai, goiY:gy()};
  }, check:function(q){ if(!kiemMCQ(q)) return false; var s=JSON.parse(q._s);
    if(q._lv===1){ var n=s[0], b=s[1], x=s[2]; if(q.q.indexOf(ptr(sx(n),b,x))<0 || q.choices.length!==2) return false; return (q._dung==='Đúng')===(x===tron(n,b)); }
    if(q._lv===2){ var ps=s[0], b2=s[1], x2=s[2], n2=tongArr(ps); if(ps.length<3 || q.q.indexOf(ptr(ps.map(sx).join(' + '), b2, x2))<0 || q.choices.length!==2) return false; return (q._dung==='Đúng')===(x2===tron(n2,b2)); }
    if(s.length!==3 || q.choices.length!==3) return false; var oks=s.filter(function(z){ return z[2]===tron(z[0],z[1]); }); if(oks.length!==1) return false;
    return q._dung===ptr(sx(oks[0][0]),oks[0][1],oks[0][2]) && s.every(function(z){ return q.choices.indexOf(ptr(sx(z[0]),z[1],z[2]))>=0; }); }},

  /* D10 — Bạn An làm tròn */
  {name:'Bạn An làm tròn', sec:'Dạng thêm (không có trong SGK) — bạn An làm tròn số, bé nhận xét', mt:['MT2'], levels:3,
   muc:['An làm tròn, em đồng ý không?', 'An sai: phải xem chữ số ở hàng nào?', 'An làm tròn sai, chọn kết quả đúng.'],
   make:function(lv){
    var an=nguoi('boy','Bạn An'), b=pick([1000,10000]), n=nTheo(b, rnd(1,2)), c=tron(n,b), sa=saiTron(n,b);
    if(lv<=1){ var ok=Math.random()<0.5, x = ok ? c : pick(sa)[0];
     return {type:'mcq', cot:2, _lv:1, _n:n, _b:b, _x:x, _dung:ok?'Đồng ý':'Không đồng ý', q:an+'<div>Bạn An nói:</div><div class="text-xl font-extrabold text-orange-600 my-2">'+ptr(sx(n),b,x)+'</div><div>Em có đồng ý với bạn An không?</div>', choices:['Đồng ý','Không đồng ý'], correct:ok?0:1, sai:(ok?{'1':'lam-tron-nham-5'}:{'0':'lam-tron-nham-5'}), goiY:gy()}; }
    var xw=pick(sa)[0];
    if(lv===2){ var ch=HANG4.map(function(h){ return TEN[h]; }), D=TEN[b/10], sai={}; ch=shuffle(ch); ch.forEach(function(k,i){ if(k!==D) sai[String(i)]='nham-hang-tron'; });
     return {type:'mcq', cot:2, _lv:2, _n:n, _b:b, _x:xw, _dung:D, q:an+'<div>Bạn An làm tròn:</div><div class="text-xl font-extrabold text-orange-600 my-2">'+ptr(sx(n),b,xw)+'</div><div>An làm tròn sai. Muốn làm tròn đến <b>'+TEN[b]+'</b>, bé phải xem chữ số ở hàng nào?</div>', choices:ch, correct:ch.indexOf(D), sai:sai, goiY:gy()}; }
    var m=lapMCQ(sx(c), saiMCQ(n,b).filter(function(p){ return true; }));
    return {type:'mcq', cot:2, _lv:3, _n:n, _b:b, _x:xw, _dung:m._dung, q:an+'<div>Bạn An làm tròn:</div><div class="text-xl font-extrabold text-orange-600 my-2">'+ptr(sx(n),b,xw)+'</div><div>An làm tròn sai. Kết quả <b>đúng</b> là số nào?</div>', choices:m.choices, correct:m.correct, sai:m.sai, goiY:gy()};
  }, check:function(q){ var n=q._n, b=q._b, x=q._x; if(!kiemMCQ(q) || q.q.indexOf(ptr(sx(n),b,x))<0 || n<1000 || n>99999 || (b!==1000 && b!==10000)) return false;
    if(q._lv<=1) return q.choices.length===2 && (q._dung==='Đồng ý')===(x===tron(n,b));
    if(x===tron(n,b)) return false; if(q._lv===2) return q.choices.length===4 && q._dung===TEN[b/10]; return q.choices.length===4 && q._dung===sx(tron(n,b)); }}
 ]
};
