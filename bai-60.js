/* bai-60.js — Bài 60: So sánh các số trong phạm vi 100 000 (Tập 2, Chủ đề 11). BÀI MỚI, Engine v2 — LUYỆN THÔNG MINH.
   Theo bảng phân tích sư phạm đã duyệt (phan-tich-su-pham/bai-60.md): 3 MỤC TIÊU (muctieu) × 10 DẠNG (topics), mỗi dạng 3 mức (Thông tư 27).
   Hình (mới, mã tự dựng): cayThan (cây thần kì, data-canh), doanTau (toa tàu, data-seq/data-hi), vennHai (hình tròn và hình vuông cắt nhau, data-t1/data-t2).
   check() đọc lại hình từ chuỗi SVG và tính lại. QUY TẮC: nối chuỗi, KHÔNG backtick, KHÔNG template literal. */

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

function gan5(n){
 var d=String(n).split(''), out=[], i, j;
 for(i=0;i<5;i++) for(j=i+1;j<5;j++){ var e=d.slice(), t=e[i]; e[i]=e[j]; e[j]=t; if(e[0]==='0') continue; var v=+e.join(''); if(v!==n) out.push([v, (d[i]==='0' || d[j]==='0') ? 'bo-so-0' : 'doc-sai-hang']); }
 [100,-100,10,-10,1000,-1000,10000,-10000,1,-1].forEach(function(x){ out.push([n+x,'doc-sai-hang']); });
 var seen={}; return shuffle(out.filter(function(p){ if(p[0]<10000 || p[0]>99999 || p[0]===n || seen[p[0]]) return false; seen[p[0]]=1; return true; }));
}
function boKhong(n){ var s=String(n).replace(/0/g,''); return s.length ? +s : 0; }
function un(s){ return +String(s).split(NB).join(''); }
function dau(a,b){ return a>b ? '>' : (a<b ? '<' : '='); }
function nguocDau(o){ return o==='>' ? '<' : '>'; }
/* hai số năm chữ số giống nhau từ trái sang tới hàng k-1, khác nhau ở hàng k (0 = chục nghìn); trap: chữ số hàng đơn vị xếp ngược với thứ tự thật */
function haiKhacTai(k, trap){
 for(var g=0; g<400; g++){
  var d1=[], d2=[], i, x, y;
  for(i=0;i<5;i++){ x = i===0 ? rnd(1,9) : rnd(0,9); d1.push(x); d2.push(x); }
  do { y=rnd(k===0 ? 1 : 0, 9); } while(y===d1[k]);
  d2[k]=y; for(i=k+1;i<5;i++){ d1[i]=rnd(0,9); d2[i]=rnd(0,9); }
  var a=+d1.join(''), b=+d2.join('');
  if(!trap || k===4 || (d1[4]!==d2[4] && (a>b)===(d1[4]<d2[4]))) return [a,b];
 }
 return [38197, 38307];
}
function viTriKhac(a,b){ var x=String(a), y=String(b), i; for(i=0;i<x.length;i++) if(x.charAt(i)!==y.charAt(i)) return i; return -1; }
function capSo(lv){
 var p = lv<=1 ? [rnd(1000,9999), rnd(10000,99999)] : haiKhacTai(rnd(0,4), true);
 return Math.random()<0.5 ? p : [p[1],p[0]];
}
function cauSS(a,op,b){ return sx(a)+' '+op+' '+sx(b); }
function sxs(s){ return s.length>=4 ? s.slice(0,s.length-3)+NB+s.slice(-3) : s; }
function tach5(n){ var d=String(n).split(''), ps=[+(d[0]+'0000'), +(d[1]+'000'), +(d[2]+'00'), +(d[3]+d[4])]; return ps.filter(function(x){ return x>0; }); }
function tongArr(a){ return a.reduce(function(s,x){ return s+x; }, 0); }
var DAU3=['>','<','='];
/* cây thần kì: mỗi cành mang một số */
function cayThan(ns){
 var n=ns.length, w=Math.floor(318/n)-6, o=svgX(330,150,330), i, cx, x, co = n>=4 ? 15 : 17;
 o+='<rect x="153" y="96" width="24" height="52" rx="6" fill="'+HM.go+'"/>';
 for(i=0;i<n;i++){ cx=6+w/2+i*(w+6)+3; o+='<path d="M165 100 L'+cx+' 52" stroke="'+HM.goDam+'" stroke-width="5" stroke-linecap="round" fill="none"/>'; }
 for(i=0;i<n;i++){ cx=6+w/2+i*(w+6)+3; x=cx-w/2; o+='<rect data-canh="'+ns[i]+'" x="'+x+'" y="6" width="'+w+'" height="44" rx="12" fill="'+HM.la+'"/>'+chuSo(cx, 28, sx(ns[i]), co); }
 return '<div class="flex justify-center my-2">'+o+'</svg></div>';
}
function docCanh(html){ var re=/data-canh="(\d+)"/g, m, v=[]; while((m=re.exec(html))) v.push(+m[1]); return v; }
/* đoàn tàu: 5 toa mang số */
function doanTau(seq, hi){
 var o=svgX(332,64,332), i, x;
 o+='<line x1="4" y1="40" x2="328" y2="40" stroke="'+HM.day+'" stroke-width="3"/>';
 for(i=0;i<5;i++){ x=3+i*66;
  o+='<rect x="'+x+'" y="6" width="62" height="42" rx="8" fill="'+(i===hi ? '#fff' : HM.troi)+'"'+(i===hi ? ' stroke="'+HM.vangDam+'" stroke-width="3"' : '')+'/>'+chuSo(x+31, 27, i===hi ? '?' : sx(seq[i]), i===hi ? 22 : 15);
  o+='<circle cx="'+(x+14)+'" cy="54" r="6" fill="'+HM.timDam+'"/><circle cx="'+(x+48)+'" cy="54" r="6" fill="'+HM.timDam+'"/>';
 }
 return '<div class="flex justify-center my-2" data-seq="'+seq.join(',')+'" data-hi="'+hi+'">'+o+'</svg></div>';
}
function docTau(html){ var a=/data-seq="([\d,]+)" data-hi="(\d+)"/.exec(html); return a ? {seq:a[1].split(',').map(Number), hi:+a[2]} : null; }
/* Venn: hình tròn và hình vuông cắt nhau */
function vennHai(t1, t2){
 var o=svgX(270,150,270).replace('<svg ','<svg data-t1="'+t1+'" data-t2="'+t2+'" ');
 o+='<circle cx="100" cy="82" r="58" fill="'+HM.troi+'" fill-opacity="0.45" stroke="'+HM.troiDam+'" stroke-width="3"/>';
 o+='<rect x="108" y="30" width="122" height="104" rx="6" fill="'+HM.vang+'" fill-opacity="0.45" stroke="'+HM.vangDam+'" stroke-width="3"/>';
 o+='<text x="62" y="18" text-anchor="middle" font-size="15" '+HFONT+' fill="currentColor">Hình tròn</text><text x="190" y="18" text-anchor="middle" font-size="15" '+HFONT+' fill="currentColor">Hình vuông</text>';
 return '<div class="flex justify-center my-2">'+o+'</svg></div>';
}
function docVenn(html){ var a=/data-t1="(\d+)" data-t2="(\d+)"/.exec(html); return a ? {t1:+a[1], t2:+a[2]} : null; }
function vung(x, t1, t2){ return (x<t1 && x>t2) ? 'giao' : (x<t1 ? 'tron' : 'vuong'); }
var TEN_VUNG={tron:'Chỉ trong hình tròn', vuong:'Chỉ trong hình vuông', giao:'Phần chung của hai hình'};

var GOI={'so-sanh-hang':'Số nào có nhiều chữ số hơn thì lớn hơn. Cùng số chữ số thì so từng hàng từ trái sang phải, dừng ở hàng đầu tiên khác nhau.',
  'sai-thu-tu':'Từ bé đến lớn: số bé nhất đứng trước. Từ lớn đến bé: số lớn nhất đứng trước.',
  'nham-bang':'Bé cộng các hàng thành một số rồi mới so sánh: 50 000 + 2 000 + 700 + 40 = 52 740.',
  'dem-sai-buoc':'Bé xem mỗi toa tăng (hoặc giảm) bao nhiêu (2 000, 5 000, 10 000) rồi đếm tiếp.',
  'bo-so-0':'Hàng nào không có thì viết chữ số 0 giữ chỗ: 70 000 + 6 000 + 40 + 2 = 76 042.',
  'nham-hang':'Từ phải sang trái: hàng đơn vị, chục, trăm, nghìn, chục nghìn.',
  'so-phai-sang-trai':'Đừng so từ hàng đơn vị. Bé so từ hàng cao nhất, bên trái.'};
function gy(){ var o={}, k; for(k in GOI) o[k]=GOI[k]; return o; }
function nhanDau(xa, lab){ var sai={}; DAU3.forEach(function(c,i){ if(c!==xa) sai[String(i)]=lab; }); return sai; }

var BAI = {
 n: 60,
 title: 'So Sánh Các Số Trong Phạm Vi 100 000',
 sub: 'Luyện thông minh: câu hỏi tự đổi theo bé — làm hết lượt để xem ngọn lửa!',
 goal: 10, soCau: 18, soCauToiDa: 24,
 loi: {'so-sanh-hang':'So sánh sai hàng, nhầm số chữ số', 'sai-thu-tu':'Xếp sai thứ tự', 'nham-bang':'Chưa tính tổng các hàng', 'dem-sai-buoc':'Đếm sai bước nhảy', 'bo-so-0':'Bỏ sót chữ số 0', 'nham-hang':'Nhầm tên hàng', 'so-phai-sang-trai':'So từ hàng đơn vị'},
 muctieu: [
  {id:'MT1', ten:'So sánh hai số', muc:['Hai số khác số chữ số (9 876 và 12 345).', 'Hai số cùng số chữ số (38 197 và 38 307); tìm chữ số ở một hàng.', 'So với tổng các hàng (52 740 ? 50 000 + 2 000 + 700 + 40); tìm chữ số ? thỏa hai điều kiện.']},
  {id:'MT2', ten:'Lớn nhất, bé nhất, xếp thứ tự', muc:['Số lớn nhất trong hai, ba số; xếp ba số từ bé đến lớn; toa tàu bước 10 000.', 'Xếp bốn số từ bé đến lớn; số bé nhất; toa tàu nhiều bước; số ở vùng Venn.', 'Xếp từ lớn đến bé; lớn thứ hai, bé thứ hai; toa tàu về 100 000; số ở phần chung.']},
  {id:'MT3', ten:'Đúng, sai và suy luận', muc:['Đúng/Sai một câu so sánh khác số chữ số; An so sánh.', 'Đúng/Sai cùng số chữ số; An sai ở hàng nào.', 'Chọn câu đúng trong ba câu; sửa dấu của bạn An.']}
 ],
 topics: [
  /* D1 — Đúng hay sai */
  {name:'Đúng hay sai', sec:'Bài 1 — 9 876 < 12 345 (đúng); 30 724 > 31 000 (sai); 41 035 > 39 999 (đúng)', mt:['MT3'], levels:3,
   muc:['Hai số khác số chữ số.', 'Hai số cùng số chữ số.', 'Ba câu, chọn câu đúng.'],
   make:function(lv){
    if(lv<=2){
     var p=capSo(lv), dd=dau(p[0],p[1]), op = Math.random()<0.5 ? dd : nguocDau(dd), dung = op===dd ? 'Đúng' : 'Sai', ok = dung==='Đúng';
     return {type:'mcq', cot:2, _lv:lv, _st:JSON.stringify([p[0],op,p[1]]), _dung:dung, q:'<div>Bé xem câu sau đúng hay sai:</div>'+bieuThucTo(cauSS(p[0],op,p[1])), choices:['Đúng','Sai'], correct:ok?0:1, sai:(ok?{'1':'so-sanh-hang'}:{'0':lv>=2?'so-phai-sang-trai':'so-sanh-hang'}), goiY:gy()};
    }
    var ss=[], seen={}, i, t, p2;
    for(i=0;i<3;i++){ do { p2=capSo(rnd(1,2)); t=p2[0]+','+p2[1]; } while(seen[t] || seen[p2[1]+','+p2[0]]); seen[t]=1; ss.push(i===0 ? [p2[0],dau(p2[0],p2[1]),p2[1]] : [p2[0],nguocDau(dau(p2[0],p2[1])),p2[1]]); }
    var txt=ss.map(function(s){ return cauSS(s[0],s[1],s[2]); }), D=txt[0], ord=shuffle(txt.slice()), sai={};
    ord.forEach(function(c,j){ if(c!==D) sai[String(j)]='so-sanh-hang'; });
    return {type:'mcq', cot:1, _lv:3, _st:JSON.stringify(ss), _dung:D, q:'<div>Có đúng một câu <b>đúng</b>. Bé chọn câu đúng nhé!</div>', choices:ord, correct:ord.indexOf(D), sai:sai, goiY:gy()};
  }, check:function(q){ if(!kiemMCQ(q)) return false; var st=JSON.parse(q._st), tr=function(s){ return dau(s[0],s[2])===s[1]; };
    if(q._lv<=2){ if(q.choices.length!==2 || q.q.indexOf(cauSS(st[0],st[1],st[2]))<0) return false; var a=st[0], b=st[2]; if(a===b) return false;
     if(q._lv<=1 && !(Math.min(String(a).length,String(b).length)===4 && Math.max(String(a).length,String(b).length)===5)) return false;
     if(q._lv===2 && (String(a).length!==5 || String(b).length!==5)) return false; return (q._dung==='Đúng')===tr(st); }
    if(st.length!==3 || q.choices.length!==3) return false; var oks=st.filter(tr); if(oks.length!==1) return false;
    return q._dung===cauSS(oks[0][0],oks[0][1],oks[0][2]) && st.every(function(s){ return q.choices.indexOf(cauSS(s[0],s[1],s[2]))>=0 && s[0]!==s[2]; }); }},

  /* D2 — Điền >, <, = */
  {name:'Điền dấu >, <, =', sec:'Bài 2 — 29 100 ? 26 189; 52 740 ? 50 000 + 2 000 + 700 + 40', mt:['MT1'], levels:3,
   muc:['Hai số khác số chữ số.', 'Hai số cùng số chữ số, so từng cặp chữ số từ trái sang phải.', 'So một số với tổng các hàng.'],
   make:function(lv){
    var a, b, ve, xa, ps=null;
    if(lv<=2){ var p=capSo(lv); a=p[0]; b=p[1]; ve=sx(a)+' ? '+sx(b); xa=dau(a,b); }
    else {
     var n, g; for(g=0; g<200; g++){ n=rnd(10000,99999); ps=tach5(n); if(ps.length>=3) break; }
     var tong=tongArr(ps); a = pick([tong, tong, tong+100, tong-10, tong+1000, tong-100]); if(a<10000 || a>99999) a=tong; b=tong;
     ve=sx(a)+' ? '+ps.map(sx).join(' + '); xa=dau(a,b);
    }
    var big = lv>=3 ? '<div class="text-3xl font-extrabold text-orange-600 mt-2">'+sx(a)+'</div><div class="text-3xl font-extrabold text-amber-700">?</div><div class="text-2xl font-extrabold text-orange-600 mb-2">'+ps.map(sx).join(' + ')+'</div>' : bieuThucTo(ve);
    return {type:'mcq', cot:2, _lv:lv, _a:a, _p:ps ? ps.join(',') : '', _dung:xa, q:'<div>Điền dấu thích hợp vào chỗ <b class="text-amber-700">?</b></div>'+big, choices:DAU3.slice(), correct:DAU3.indexOf(xa), sai:nhanDau(xa, lv>=3 ? 'nham-bang' : 'so-sanh-hang'), goiY:gy()};
  }, check:function(q){ var a=q._a, b; if(!kiemMCQ(q) || q.choices.length!==3) return false;
    if(q._lv>=3){ var ps=q._p.split(',').map(Number); b=tongArr(ps); return ps.length>=3 && q.q.indexOf(ps.map(sx).join(' + '))>=0 && q.q.indexOf('>'+sx(a)+'<')>=0 && q._dung===dau(a,b); }
    var m=/<div class="text-3xl[^>]*>([^<]+)</.exec(q.q); if(!m) return false; var pr=m[1].split(' ? '); if(pr.length!==2) return false; var x=un(pr[0]), y=un(pr[1]);
    if(x!==a || q._dung!==dau(x,y) || x===y) return false;
    if(q._lv<=1) return Math.min(String(x).length,String(y).length)===4 && Math.max(String(x).length,String(y).length)===5; return String(x).length===5 && String(y).length===5; }},

  /* D3 — Cây thần kì */
  {name:'Cây thần kì', sec:'Bài 3 — cây thần kì: chọn cành có số lớn hơn', mt:['MT1'], levels:3,
   muc:['Hai cành: số lớn hơn.', 'Ba cành: số lớn nhất.', 'Bốn cành gần nhau: số lớn nhất hoặc bé nhất.'],
   make:function(lv){
    var k = lv<=1 ? 2 : (lv===2 ? 3 : 4), ns=[], g, i;
    for(g=0; g<300; g++){
     ns=[]; var pre=rnd(1,9)*10000;
     if(lv<=1){ ns=[rnd(1000,9999), rnd(10000,99999)]; }
     else if(lv===2){ for(i=0;i<3;i++) ns.push(rnd(1,9)*10000+rnd(0,99)*100+rnd(0,9)*10+rnd(0,9)); }
     else { for(i=0;i<4;i++) ns.push(pre+rnd(0,9)*1000+rnd(0,99)*10+rnd(0,9)); }
     if(new Set(ns).size===k && ns.every(function(x){ return x>=1000 && x<=99999; }) && (lv<=1 || Math.min.apply(null, ns.map(function(x){ return Math.abs(x); }))>0)) {
      var s=ns.slice().sort(function(a,b){ return a-b; }), gap=true; for(i=1;i<s.length;i++) if(s[i]-s[i-1]<50) gap=false; if(gap) break; }
    }
    ns = shuffle(ns);
    var nho = lv>=3 && Math.random()<0.5, tgt = nho ? Math.min.apply(null, ns) : Math.max.apply(null, ns);
    var ch = shuffle(ns.map(sx)), D=sx(tgt), sai={}; ch.forEach(function(c,j){ if(c!==D) sai[String(j)]='so-sanh-hang'; });
    return {type:'mcq', cot:2, _lv:lv, _nho:nho?1:0, _dung:D, q:cayThan(ns)+'<div>Cây thần kì cho đi qua cành có số <b>'+(nho?'bé nhất':(k===2?'lớn hơn':'lớn nhất'))+'</b>. Bé chọn số đó nhé!</div>', choices:ch, correct:ch.indexOf(D), sai:sai, goiY:gy()};
  }, check:function(q){ var v=docCanh(q.q); if(!kiemMCQ(q)) return false; var k = q._lv<=1 ? 2 : (q._lv===2 ? 3 : 4); if(v.length!==k || new Set(v).size!==k || q.choices.length!==k) return false;
    var t = q._nho ? Math.min.apply(null, v) : Math.max.apply(null, v); if(q._nho && q._lv<3) return false;
    if(q._dung!==sx(t) || !v.every(function(x){ return q.choices.indexOf(sx(x))>=0; })) return false;
    if(q._lv<=1) return Math.min.apply(null,v)<10000 && Math.max.apply(null,v)>=10000; return v.every(function(x){ return x>=10000; }); }},

  /* D4 — Xếp thứ tự các huyện */
  {name:'Xếp thứ tự bốn huyện', sec:'Bài 4 — dân số bốn huyện 73 017, 78 655, 75 400, 73 420: xếp từ bé đến lớn', mt:['MT2'], levels:3,
   muc:['Ba huyện, xếp từ bé đến lớn.', 'Bốn huyện, xếp từ bé đến lớn.', 'Bốn huyện, xếp từ lớn đến bé.'],
   make:function(lv){
    var k = lv<=1 ? 3 : 4, NM=['Mai','Lan','Đào','Cúc'], g, ns, i;
    for(g=0; g<300; g++){ var base=rnd(2,8)*10000; ns=[]; for(i=0;i<k;i++) ns.push(base+rnd(0,9)*1000+rnd(0,99)*10); var s=ns.slice().sort(function(a,b){ return a-b; }), ok=new Set(ns).size===k; for(i=1;i<k;i++) if(s[i]-s[i-1]<100) ok=false; if(ok) break; }
    var nm=NM.slice(0,k), desc = lv>=3, idx=nm.map(function(_,j){ return j; }).sort(function(a,b){ return desc ? ns[b]-ns[a] : ns[a]-ns[b]; });
    var ord=function(ix){ return ix.map(function(j){ return nm[j]; }).join(', '); }, D=ord(idx), cand=[], t;
    cand.push([ord(idx.slice().reverse()),'sai-thu-tu']);
    for(i=0;i<k-1;i++){ t=idx.slice(); var w=t[i]; t[i]=t[i+1]; t[i+1]=w; cand.push([ord(t),'so-sanh-hang']); }
    var m=lapMCQ(D, cand), dong='';
    nm.forEach(function(x,j){ dong+='<div>Huyện '+x+': <b>'+sx(ns[j])+'</b> người</div>'; });
    return {type:'mcq', cot:1, _lv:lv, _h:ns.join(','), _desc:desc?1:0, _dung:m._dung, q:'<div class="mb-1">Dân số các huyện như sau:</div>'+dong+'<div class="mt-1">Xếp tên các huyện theo dân số <b>'+(desc?'từ lớn đến bé':'từ bé đến lớn')+'</b>.</div>', choices:m.choices, correct:m.correct, sai:m.sai, goiY:gy()};
  }, check:function(q){ if(!kiemMCQ(q)) return false; var ns=q._h.split(',').map(Number), k=ns.length, NM=['Mai','Lan','Đào','Cúc'].slice(0,k); if(k !== (q._lv<=1 ? 3 : 4) || new Set(ns).size!==k || q.choices.length!==4) return false;
    var okq=ns.every(function(x,j){ return q.q.indexOf('Huyện '+NM[j]+': <b>'+sx(x)+'</b>')>=0; }); if(!okq) return false;
    var desc = q._lv>=3; if((q._desc===1)!==desc || q.q.indexOf(desc ? 'từ lớn đến bé' : 'từ bé đến lớn')<0) return false;
    var idx=NM.map(function(_,j){ return j; }).sort(function(a,b){ return desc ? ns[b]-ns[a] : ns[a]-ns[b]; }); return q._dung===idx.map(function(j){ return NM[j]; }).join(', '); }},

  /* D5 — Sân vận động, công-tơ-mét */
  {name:'Sân vận động, công-tơ-mét', sec:'Bài 5, 6 — sức chứa sân vận động 40 192, 28 000, 30 000, 25 000; công-tơ-mét 43 288, 50 000, 43 300', mt:['MT2'], levels:3,
   muc:['Số lớn nhất trong bốn số.', 'Số bé nhất trong bốn số.', 'Lớn thứ hai hoặc bé thứ hai.'],
   make:function(lv){
    var xe = Math.random()<0.5, ten = xe ? 'Xe' : 'Sân', ns=[], g, i;
    for(g=0; g<300; g++){ ns=[]; for(i=0;i<4;i++) ns.push(rnd(2,9)*10000+(Math.random()<0.5 ? 0 : rnd(0,9)*1000)+rnd(0,9)*(Math.random()<0.5 ? 0 : 100)); var s=ns.slice().sort(function(a,b){ return a-b; }), ok=new Set(ns).size===4; for(i=1;i<4;i++) if(s[i]-s[i-1]<100) ok=false; if(lv>=3){ ok = ok && (s[3]-s[2]<12000); } if(ok) break; }
    var kind = lv<=1 ? 'max' : (lv===2 ? 'min' : pick(['max2','min2'])), LB=['A','B','C','D'], s2=ns.slice().sort(function(a,b){ return a-b; });
    var val = kind==='max' ? s2[3] : (kind==='min' ? s2[0] : (kind==='max2' ? s2[2] : s2[1])), j = ns.indexOf(val), D=ten+' '+LB[j], dong='';
    ns.forEach(function(x,t){ dong+='<div>'+ten+' '+LB[t]+': <b>'+sx(x)+'</b> '+(xe ? 'km' : 'chỗ ngồi')+'</div>'; });
    var hoi = xe ? ('Xe nào đã chạy được '+({max:'nhiều nhất', min:'ít nhất', max2:'nhiều thứ hai', min2:'ít thứ hai'})[kind]+'?') : ('Sân nào có sức chứa '+({max:'lớn nhất', min:'bé nhất', max2:'lớn thứ hai', min2:'bé thứ hai'})[kind]+'?');
    var ch=shuffle(LB.map(function(l){ return ten+' '+l; })), sai={}; ch.forEach(function(c,t){ if(c!==D) sai[String(t)]='so-sanh-hang'; });
    return {type:'mcq', cot:2, _lv:lv, _xe:xe?1:0, _k:kind, _n:ns.join(','), _dung:D, q:'<div class="mb-1">'+(xe?'Số trên công-tơ-mét của bốn xe:':'Sức chứa của bốn sân vận động:')+'</div>'+dong+'<div class="mt-1">'+hoi+'</div>', choices:ch, correct:ch.indexOf(D), sai:sai, goiY:gy()};
  }, check:function(q){ if(!kiemMCQ(q) || q.choices.length!==4) return false; var ns=q._n.split(',').map(Number); if(ns.length!==4 || new Set(ns).size!==4 || ns.some(function(x){ return x<10000 || x>99999; })) return false;
    var ten = q._xe ? 'Xe' : 'Sân', LB=['A','B','C','D']; if(!ns.every(function(x,t){ return q.q.indexOf(ten+' '+LB[t]+': <b>'+sx(x)+'</b>')>=0; })) return false;
    var s2=ns.slice().sort(function(a,b){ return a-b; }), kd=q._k, val = kd==='max' ? s2[3] : (kd==='min' ? s2[0] : (kd==='max2' ? s2[2] : s2[1]));
    if(q._dung!==ten+' '+LB[ns.indexOf(val)]) return false; if(q._lv<=1) return kd==='max'; if(q._lv===2) return kd==='min'; return kd==='max2' || kd==='min2'; }},

  /* D6 — Tìm chữ số ? */
  {name:'Tìm chữ số ?', sec:'Bài 7 — 42 371 > 42 37?; 50 826 < 50 ?26', mt:['MT1'], levels:3,
   muc:['Chữ số ? ở hàng nghìn.', 'Chữ số ? ở hàng trăm hoặc hàng chục.', 'Hai điều kiện: số ? kẹp giữa hai số.'],
   make:function(lv){
    var kind, p, A, B, C=null, ans, hoi, i, d;
    if(lv<=2){
     p = lv<=1 ? 1 : pick([2,3]); kind = Math.random()<0.5 ? 'gt' : 'lt'; d=String(rnd(10000,99999)).split('');
     while(kind==='gt' ? +d[p]<2 : +d[p]>8) d=String(rnd(10000,99999)).split('');
     A=d.join(''); var e=d.slice(); e[p]='?'; B=e.join('');
     ans = kind==='gt' ? +d[p]-1 : +d[p]+1;
     hoi = kind==='gt' ? 'Tìm chữ số <b>lớn nhất</b> của <b class="text-amber-700">?</b> để câu đúng.' : 'Tìm chữ số <b>bé nhất</b> của <b class="text-amber-700">?</b> để câu đúng.';
    } else {
     kind='mid'; p=rnd(1,3); d=String(rnd(10000,99999)).split(''); var lo=rnd(1,7), a2=d.slice(), c2=d.slice(), b2=d.slice(); a2[p]=String(lo); c2[p]=String(lo+2); b2[p]='?';
     A=a2.join(''); B=b2.join(''); C=c2.join(''); ans=lo+1; hoi='Tìm chữ số <b class="text-amber-700">?</b> để câu đúng.';
    }
    var fm = kind==='mid' ? sxs(A)+' &lt; '+sxs(B)+' &lt; '+sxs(C) : (kind==='gt' ? sxs(A)+' &gt; '+sxs(B) : sxs(A)+' &lt; '+sxs(B));
    return {type:'num', _lv:lv, _kind:kind, _A:A, _B:B, _C:C||'', q:'<div>Chữ số <b class="text-amber-700">?</b> là chữ số nào?</div>'+(kind==='mid' ? '<div class="text-xl font-extrabold text-orange-600 my-2">'+fm+'</div>' : bieuThucTo(fm))+'<div>'+hoi+'</div>', ans:ans, sai:nhanSai([[ans+1,'so-sanh-hang'],[ans-1,'so-sanh-hang'],[kind==='gt' ? +A.charAt(p) : ans+2,'so-sanh-hang'],[9,'so-sanh-hang']], ans), goiY:gy()};
  }, check:function(q){ var A=q._A, B=q._B, C=q._C, kd=q._kind, ok=[], x, fm; if(B.split('?').length!==2) return false;
    var f=function(s,x){ return +s.replace('?',x); };
    for(x=0;x<=9;x++){ if(kd==='gt' && +A>f(B,x)) ok.push(x); if(kd==='lt' && +A<f(B,x)) ok.push(x); if(kd==='mid' && +A<f(B,x) && f(B,x)<+C) ok.push(x); }
    if(ok.length===0) return false; var ans = kd==='gt' ? Math.max.apply(null,ok) : Math.min.apply(null,ok);
    if(kd==='mid' && ok.length!==1) return false; if(q.ans!==ans || ans<1) return false;
    fm = kd==='mid' ? sxs(A)+' &lt; '+sxs(B)+' &lt; '+sxs(C) : (kd==='gt' ? sxs(A)+' &gt; '+sxs(B) : sxs(A)+' &lt; '+sxs(B)); if(q.q.indexOf(fm)<0) return false;
    var p=B.indexOf('?'); if(q._lv<=1) return p===1 && kd!=='mid'; if(q._lv===2) return (p===2 || p===3) && kd!=='mid'; return kd==='mid' && p>=1 && p<=3; }},

  /* D7 — Toa tàu hỏa */
  {name:'Toa tàu hỏa', sec:'Bài 9 — toa tàu 50 000, 60 000, 70 000 ...', mt:['MT2'], levels:3,
   muc:['Dãy toa tăng 10 000 từ số tròn chục nghìn.', 'Dãy toa tăng hoặc giảm 2 000, 5 000, 10 000; ô trống ở giữa.', 'Dãy toa có toa 100 000.'],
   make:function(lv){
    var step, start, seq=[], i, hi, desc=false;
    if(lv<=1){ step=10000; start=rnd(1,5)*10000; hi=pick([2,3,4]); }
    else if(lv===2){ step=pick([2000,5000,10000]); desc=Math.random()<0.4; start = desc ? 60000+rnd(0,3)*5000+4*step-50000+rnd(0,2)*1000 : rnd(1,4)*10000+rnd(0,4)*1000; hi=rnd(1,3); }
    else { step=pick([5000,10000,20000]); desc=Math.random()<0.5; start = desc ? 100000 : 100000-4*step; hi = desc ? rnd(1,4) : rnd(0,3); }
    if(desc && lv===2){ start=rnd(5,9)*10000+rnd(0,4)*1000; }
    for(i=0;i<5;i++) seq.push(start+(desc ? -i : i)*step);
    var ans=seq[hi];
    return {type:'num', _lv:lv, q:doanTau(seq,hi)+'<div>Số ở toa <b class="text-amber-700">?</b> là số nào?</div>', ans:ans, sai:nhanSai([[ans+step,'dem-sai-buoc'],[ans-step,'dem-sai-buoc'],[ans+10000,'dem-sai-buoc'],[ans-10000,'dem-sai-buoc'],[ans+1000,'dem-sai-buoc']], ans), goiY:gy()};
  }, check:function(q){ var t=docTau(q.q); if(!t || t.seq.length!==5 || t.hi<0 || t.hi>4) return false; var st=t.seq[1]-t.seq[0], i; if(st===0) return false; for(i=1;i<5;i++) if(t.seq[i]-t.seq[i-1]!==st) return false;
    if(Math.min.apply(null,t.seq)<10000 || Math.max.apply(null,t.seq)>100000 || q.ans!==t.seq[t.hi]) return false;
    if(q._lv<=1) return st===10000 && t.seq[0]%10000===0 && t.hi>=2; if(q._lv===2) return [2000,5000,10000].indexOf(Math.abs(st))>=0 && t.hi>=1 && t.hi<=3; return t.seq.indexOf(100000)>=0 && t.seq.indexOf(100000)!==t.hi && [5000,10000,20000].indexOf(Math.abs(st))>=0; }},

  /* D8 — Nối biểu thức với số */
  {name:'Nối biểu thức với số', sec:'Bài 10 — nối 70 000 + 6 000 + 40 + 2 với 76 042', mt:['MT1'], levels:3,
   muc:['Tổng hai hàng.', 'Tổng bốn hàng.', 'Tổng ba hàng, có hàng bị khuyết (chữ số 0).'],
   make:function(lv){
    var n, ps, g, d;
    for(g=0; g<400; g++){
     n=rnd(10000,99999); d=String(n).split(''); ps = lv<=1 ? [d[0]+'0000', +d[1]>0 ? d[1]+'000' : '0'].map(Number).filter(function(x){ return x>0; }) : tach5(n);
     if(lv<=1){ n=ps.length===2 ? tongArr(ps) : 0; if(ps.length===2) { var dn=demKhong(n); if(dn===3) break; } continue; }
     if(lv===2 && ps.length===4 && demKhong(n)===1 && d[4]!=='0' ) break;
     if(lv===3 && ps.length===3 && demKhong(n)===2) break;
    }
    if(lv<=1 && (ps.length!==2)){ n=rnd(1,9)*10000+rnd(1,9)*1000; ps=[Math.floor(n/10000)*10000, n%10000]; }
    var ve=ps.map(sx).join(' + '), m=lapMCQ(sx(n), gan5(n).map(function(p){ return [sx(p[0]), p[1]==='doc-sai-hang' ? 'nham-hang' : p[1]]; }).concat([[sx(boKhong(n)), 'bo-so-0']]).filter(function(p){ return +String(p[0]).split(NB).join('')>=10000; }));
    return {type:'mcq', cot:2, _lv:lv, _p:ps.join(','), _dung:m._dung, q:'<div>Biểu thức nào bằng số nào? Bé chọn số bằng biểu thức này:</div>'+(lv===2 ? '<div class="text-xl font-extrabold text-orange-600 my-2">'+ve+'</div>' : bieuThucTo(ve)), choices:m.choices, correct:m.correct, sai:m.sai, goiY:gy()};
  }, check:function(q){ var ps=q._p.split(',').map(Number); if(!kiemMCQ(q) || q.choices.length!==4 || q.q.indexOf(ps.map(sx).join(' + '))<0) return false; var n=tongArr(ps); if(q._dung!==sx(n) || n<10000 || n>99999) return false;
    if(q._lv<=1) return ps.length===2 && demKhong(n)===3; if(q._lv===2) return ps.length===4; return ps.length===3 && demKhong(n)===2; }},

  /* D9 — Hình Venn */
  {name:'Hình Venn: số ở vùng nào', sec:'Bài 12 — hình tròn và hình vuông cắt nhau: số nào ở phần chung', mt:['MT2'], levels:3,
   muc:['Số ở vùng nào (số cách xa hai mốc).', 'Số ở vùng nào (số gần mốc).', 'Trong bốn số, số nào ở phần chung của hai hình.'],
   make:function(lv){
    var t2=rnd(3,4)*10000+rnd(0,9)*1000, t1=t2+rnd(2,3)*10000+rnd(0,9)*1000, g, x, nums=[], vs;
    var fig=vennHai(t1,t2), mo='<div>Hình tròn: các số <b>bé hơn '+sx(t1)+'</b>.</div><div>Hình vuông: các số <b>lớn hơn '+sx(t2)+'</b>.</div>';
    if(lv<=2){
     vs=pick(['tron','vuong','giao']);
     var lo = vs==='tron' ? 10000 : (vs==='vuong' ? t1+100 : t2+100), hi = vs==='tron' ? t2-100 : (vs==='vuong' ? 99999 : t1-100);
     for(g=0; g<3000; g++){ x=rnd(lo,hi); var dm=Math.min(Math.abs(x-t1),Math.abs(x-t2)); if(lv<=1 ? dm>=4000 : (dm>=100 && dm<=3000)) break; }
     var ch=['tron','vuong','giao'].map(function(v){ return TEN_VUNG[v]; }), sai={}; ch.forEach(function(c,i){ if(c!==TEN_VUNG[vs]) sai[String(i)]='so-sanh-hang'; });
     return {type:'mcq', cot:1, _lv:lv, _x:x, _t:t1+','+t2, _dung:TEN_VUNG[vs], q:fig+mo+'<div class="mt-1">Số <b>'+sx(x)+'</b> được đặt vào vùng nào?</div>', choices:ch, correct:ch.indexOf(TEN_VUNG[vs]), sai:sai, goiY:gy()};
    }
    for(g=0; g<800; g++){
     nums=[]; var gi=rnd(t2+100,t1-100); nums.push(gi);
     nums.push(rnd(10000,t2-100 > 10000 ? t2-100 : 10000), rnd(t1+100 < 99900 ? t1+100 : 99900, 99999));
     nums.push(Math.random()<0.5 ? t2-rnd(100,900) : t1+rnd(100,900));
     if(nums.every(function(v){ return v>=10000 && v<=99999; }) && new Set(nums).size===4 && nums.filter(function(v){ return vung(v,t1,t2)==='giao'; }).length===1) break;
    }
    var ord=shuffle(nums.map(sx)), D=sx(nums[0]), sai2={}; ord.forEach(function(c,i){ if(c!==D) sai2[String(i)]='so-sanh-hang'; });
    return {type:'mcq', cot:2, _lv:3, _t:t1+','+t2, _nums:nums.join(','), _dung:D, q:fig+mo+'<div class="mt-1">Trong các số dưới đây, số nào nằm ở <b>phần chung</b> của hai hình?</div>', choices:ord, correct:ord.indexOf(D), sai:sai2, goiY:gy()};
  }, check:function(q){ var v=docVenn(q.q); if(!v || !kiemMCQ(q) || v.t1<=v.t2 || q._t!==v.t1+','+v.t2) return false; if(q.q.indexOf('bé hơn '+sx(v.t1))<0 || q.q.indexOf('lớn hơn '+sx(v.t2))<0) return false;
    if(q._lv<=2){ var x=q._x, vz=vung(x,v.t1,v.t2); if(x===v.t1 || x===v.t2 || q.choices.length!==3 || q._dung!==TEN_VUNG[vz] || q.q.indexOf('<b>'+sx(x)+'</b> được đặt')<0) return false; var dm=Math.min(Math.abs(x-v.t1),Math.abs(x-v.t2)); return q._lv<=1 ? dm>=4000 : (dm>=100 && dm<=3000); }
    var ns=q._nums.split(',').map(Number); if(ns.length!==4 || new Set(ns).size!==4 || q.choices.length!==4) return false; var gi=ns.filter(function(z){ return z!==v.t1 && z!==v.t2 && vung(z,v.t1,v.t2)==='giao'; }); return gi.length===1 && q._dung===sx(gi[0]) && ns.every(function(z){ return q.choices.indexOf(sx(z))>=0; }); }},

  /* D10 — Bạn An so sánh */
  {name:'Bạn An so sánh', sec:'Dạng thêm (không có trong SGK) — bạn An so sánh số, bé nhận xét', mt:['MT3'], levels:3,
   muc:['An so sánh hai số, em đồng ý không?', 'An sai ở hàng nào?', 'Sửa dấu cho bạn An (so với tổng các hàng).'],
   make:function(lv){
    var an=nguoi('boy','Bạn An');
    if(lv<=1){
     var p=capSo(2), dd=dau(p[0],p[1]), op = Math.random()<0.5 ? dd : nguocDau(dd), ok = op===dd;
     return {type:'mcq', cot:2, _lv:1, _st:JSON.stringify([p[0],op,p[1]]), _dung:ok?'Đồng ý':'Không đồng ý', q:an+'<div>Bạn An nói:</div>'+bieuThucTo(cauSS(p[0],op,p[1]))+'<div>Em có đồng ý với bạn An không?</div>', choices:['Đồng ý','Không đồng ý'], correct:ok?0:1, sai:(ok?{'1':'so-sanh-hang'}:{'0':'so-phai-sang-trai'}), goiY:gy()};
    }
    if(lv===2){
     var k=rnd(0,3), pp=haiKhacTai(k,true), a=pp[0], b=pp[1], da=dau(a,b), xs = nguocDau(da);
     var TN=['hàng chục nghìn','hàng nghìn','hàng trăm','hàng chục'], ch=TN.slice(), D=TN[k], sai={}; ch=shuffle(ch); ch.forEach(function(c,i){ if(c!==D) sai[String(i)]= 'nham-hang'; });
     return {type:'mcq', cot:2, _lv:2, _ab:a+','+b, _dung:D, q:an+'<div>Bạn An so sánh hai số bằng cách nhìn chữ số hàng đơn vị và viết:</div>'+bieuThucTo(cauSS(a,xs,b))+'<div>An sai rồi! Hai số này <b>khác nhau đầu tiên</b> ở hàng nào (tính từ trái sang)?</div>', choices:ch, correct:ch.indexOf(D), sai:sai, goiY:gy()};
    }
    var n, ps, g, tong, bb, ds; for(g=0; g<200; g++){ n=rnd(10000,99999); ps=tach5(n); if(ps.length>=3) break; }
    tong=tongArr(ps); bb = pick([tong, tong+100, tong-100, tong+10, tong-10]); if(bb<10000 || bb>99999) bb=tong; var dd3=dau(tong,bb), an3 = pick(DAU3.filter(function(c){ return c!==dd3; }));
    return {type:'mcq', cot:2, _lv:3, _p:ps.join(','), _b:bb, _dung:dd3, q:an+'<div>Bạn An viết:</div><div class="text-2xl font-extrabold text-orange-600 my-2">'+ps.map(sx).join(' + ')+' '+an3+' '+sx(bb)+'</div><div>An điền sai dấu rồi. Dấu đúng là dấu nào?</div>', choices:DAU3.slice(), correct:DAU3.indexOf(dd3), sai:nhanDau(dd3,'nham-bang'), goiY:gy()};
  }, check:function(q){ if(!kiemMCQ(q)) return false;
    if(q._lv<=1){ var st=JSON.parse(q._st); if(q.q.indexOf(cauSS(st[0],st[1],st[2]))<0 || st[0]===st[2]) return false; return (q._dung==='Đồng ý')===(dau(st[0],st[2])===st[1]) && q.choices.length===2; }
    if(q._lv===2){ var ab=q._ab.split(',').map(Number), TN=['hàng chục nghìn','hàng nghìn','hàng trăm','hàng chục'], k=viTriKhac(ab[0],ab[1]); if(k<0 || k>3 || q.choices.length!==4 || String(ab[0]).length!==5 || String(ab[1]).length!==5) return false; return q._dung===TN[k] && q.q.indexOf(cauSS(ab[0],nguocDau(dau(ab[0],ab[1])),ab[1]))>=0; }
    var ps=q._p.split(',').map(Number), b=q._b, t=tongArr(ps); if(ps.length<3 || q.choices.length!==3 || q._dung!==dau(t,b) || b<10000 || b>99999) return false;
    var m=new RegExp(ps.map(sx).join(' \\+ ').replace(/ /g,' ')+' ([<>=]) '+sx(b)).exec(q.q); return !!m && m[1]!==q._dung; }}
 ]
};
