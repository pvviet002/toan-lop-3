/* bai-68.js — Bài 68: Tiền Việt Nam (Tập 2, Chủ đề 13). BÀI MỚI, Engine v2 — LUYỆN THÔNG MINH.
   Theo bảng phân tích sư phạm đã duyệt (phan-tich-su-pham/bai-68.md): 3 MỤC TIÊU (muctieu) × 10 DẠNG (topics), mỗi dạng 3 mức (Thông tư 27).
   Hình (mới, mã tự dựng): toTien (tờ tiền là hình chữ nhật có mệnh giá, KHÔNG dùng ảnh tiền thật; data-to), lonTien (chú lợn đất và các tờ tiền, data-lon), bangGia (bảng giá, data-gia).
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

function tien(n){ return sx(n)+' đồng'; }
var TO=[1000,2000,5000,10000,20000,50000,100000,200000,500000];
var MAU_TO={1000:HM.xam, 2000:HM.vang, 5000:HM.troi, 10000:HM.la, 20000:HM.cam, 50000:HM.hong, 100000:HM.goNhat, 200000:HM.xanhLa, 500000:HM.vangDam};
/* tờ tiền: hình chữ nhật có mệnh giá (không phải ảnh tiền thật) */
function toTien(v){
 var o=svgHinh(88,46,88).replace('<svg ','<svg data-to="'+v+'" ');
 o+='<rect x="2" y="2" width="84" height="42" rx="7" fill="'+MAU_TO[v]+'"/><rect x="9" y="9" width="70" height="28" rx="5" fill="#fff" fill-opacity="0.6"/>'+chuSo(44, 23, sx(v), 16);
 return o+'</svg>';
}
function dayTo(ds){ return xepHang(ds.map(toTien), 3); }
function docTo(html){ var re=/data-to="(\d+)"/g, m, v=[]; while((m=re.exec(html))) v.push(+m[1]); return v; }
function heo(){
 return '<svg width="64" height="50" viewBox="0 0 64 50" style="display:inline-block;vertical-align:middle"><ellipse cx="30" cy="28" rx="26" ry="17" fill="'+HM.hong+'"/><circle cx="20" cy="13" r="7" fill="'+HM.hong+'"/><ellipse cx="55" cy="30" rx="7" ry="6" fill="'+HM.cam+'"/><circle cx="43" cy="22" r="2.6" fill="'+HM.chu+'"/><rect x="15" y="40" width="7" height="9" rx="3" fill="'+HM.hong+'"/><rect x="38" y="40" width="7" height="9" rx="3" fill="'+HM.hong+'"/><rect x="24" y="11" width="16" height="4" rx="2" fill="'+HM.doDam+'"/></svg>';
}
function lonTien(ten, ds){ return '<div class="my-2" data-lon="'+ten+':'+ds.join(',')+'"><div class="flex items-center justify-center gap-2">'+heo()+'<div class="font-extrabold text-slate-700">Lợn '+ten+'</div></div>'+xepHang(ds.map(toTien), 3)+'</div>'; }
function docLon(html){ var re=/data-lon="(\w):([\d,]+)"/g, m, v=[]; while((m=re.exec(html))) v.push({t:m[1], ds:m[2].split(',').map(Number)}); return v; }
function tongArr(a){ return a.reduce(function(s,x){ return s+x; },0); }
/* bảng giá: [tên, giá] */
function bangGia(ds){
 var s=svgX(330, ds.length*38+6, 330).replace('<svg ','<svg data-gia="'+ds.map(function(d){ return d[1]; }).join(',')+'" ');
 ds.forEach(function(d,i){ var y=4+i*38;
  s+='<rect x="3" y="'+y+'" width="324" height="34" rx="8" fill="'+HM.xam+'"/><text x="14" y="'+(y+23)+'" font-size="16" '+HFONT+' fill="'+HM.chu+'">'+d[0]+'</text><text x="316" y="'+(y+23)+'" text-anchor="end" font-size="16" '+HFONT+' fill="'+HM.chu+'">'+sx(d[1])+' đồng</text>'; });
 return '<div class="flex justify-center my-2">'+s+'</svg></div>';
}
function docGia(html){ var a=/data-gia="([\d,]+)"/.exec(html); return a ? a[1].split(',').map(Number) : null; }
var DOVAT=['Bóng đèn','Quyển sách','Rô-bốt','Cái lược','Hộp bút','Quả bóng','Cặp sách','Bút máy','Đèn pin','Ô che mưa'];
var MON=[['chanh','chanh'],['hành','hành'],['cà chua','cà chua'],['trứng','trứng'],['rau cải','rau cải'],['bánh mì','bánh mì'],['sữa','sữa'],['đường','đường']];
/* cách trả lại: {tờ: số tờ} → chữ */
function chuCach(c){ var ks=Object.keys(c).map(Number).sort(function(a,b){ return b-a; }); return ks.map(function(k){ return c[k]+' tờ '+sx(k)+' đồng'; }).join(' và '); }
function giaTriCach(s){ var re=/(\d+) tờ ([\d ]+) đồng/g, m, t=0; while((m=re.exec(s))) t+= +m[1] * +String(m[2]).split(' ').join(''); return t; }
function cachNgau(x, dsTo, maxLoai){
 for(var g=0; g<400; g++){ var c={}, left=x, to=shuffle(dsTo.slice()), i; for(i=0;i<to.length && left>0;i++){ var mx=Math.floor(left/to[i]); if(mx<=0) continue; var k=rnd(1,Math.min(mx,3)); c[to[i]]=k; left-=k*to[i]; } if(left===0 && Object.keys(c).length<=maxLoai) return c; }
 var c2={}; c2[x]=1; return c2;
}
var GOI={'cong-sai-to':'Bé cộng từng tờ tiền: số tờ nhân với mệnh giá, rồi cộng các kết quả lại.',
  'quen-tra-lai':'Tiền trả lại = tiền đưa − tiền hàng. Bé nhớ trừ nhé!',
  'doi-sai-so-to':'Bé tính tổng tiền ở bên trái rồi chia cho mệnh giá tờ tiền ở bên phải.',
  'so-sanh-gia':'Bé so sánh các giá tiền: số nào có nhiều chữ số hơn thì lớn hơn; cùng số chữ số thì so từng hàng.',
  'thieu-buoc':'Bài này có nhiều bước. Bé làm đủ các bước nhé!',
  'doc-de-sai':'Bé đọc kỹ đề: «mua 2 bắp» thì giá một bắp bằng số tiền chia 2.',
  'nham-bang':'Bé tính lại từng bước cho đúng nhé.'};
function gy(){ var o={}, k; for(k in GOI) o[k]=GOI[k]; return o; }

var BAI = {
 n: 68,
 title: 'Tiền Việt Nam',
 sub: 'Luyện thông minh: câu hỏi tự đổi theo bé — làm hết lượt để xem ngọn lửa!',
 goal: 10, soCau: 18, soCauToiDa: 24,
 loi: {'cong-sai-to':'Cộng sai các tờ tiền', 'quen-tra-lai':'Quên trừ khi trả lại tiền', 'doi-sai-so-to':'Nhầm số tờ khi đổi tiền', 'so-sanh-gia':'So sánh giá tiền sai', 'thieu-buoc':'Thiếu một bước', 'doc-de-sai':'Đọc sai đề', 'nham-bang':'Tính sai'},
 muctieu: [
  {id:'MT1', ten:'Cộng, đổi các tờ tiền', muc:['Cộng hai, ba tờ tiền; đổi 2 tờ 10 000 = ? tờ 20 000.', 'Cộng các tờ khác nhau; đổi 5 tờ 10 000 = ? tờ 50 000.', 'Số lớn; 1 tờ 50 000 = 1 tờ 10 000 + ? tờ 20 000.']},
  {id:'MT2', ten:'Mua, trả lại; so sánh giá', muc:['Mua một món, trả lại; trả lại 5 000 đồng; giá thấp nhất.', 'Mua hai món (3 000 + 2 000), trả lại từ 10 000; giá cao nhất.', 'Ba món, đưa tờ lớn; chọn cách trả lại nhiều tờ; một món đắt hơn món kia bao nhiêu.']},
  {id:'MT3', ten:'Bài toán đố về tiền', muc:['Tổng tiền hai thứ; giá một bắp giữa vụ; bán trừ vốn.', 'Tổng tiền ba thứ (20 000 + 14 000 + 10 000); đầu vụ đắt hơn bao nhiêu.', 'Số lớn; ba thứ rồi trừ vốn; hai giỏ đắt nhất.']}
 ],
 topics: [
  /* D1 — Chú lợn nào nhiều tiền nhất */
  {name:'Chú lợn nào nhiều tiền nhất', sec:'Bài 1 — các chú lợn đất đựng các tờ tiền: chú lợn nào có nhiều tiền nhất', mt:['MT1'], levels:3,
   muc:['Hai chú lợn, mỗi chú vài tờ tiền.', 'Ba chú lợn.', 'Ba chú lợn, các tờ khác nhau, số lớn.'],
   make:function(lv){
    var n = lv<=1 ? 2 : 3, nm=['A','B','C'].slice(0,n), pool = lv<=2 ? [1000,2000,5000,10000,20000] : [5000,10000,20000,50000,100000], g, pigs, vs;
    for(g=0; g<500; g++){ pigs=nm.map(function(){ var k=rnd(2, lv>=3 ? 4 : 3), a=[], i; for(i=0;i<k;i++) a.push(pick(pool)); return a.sort(function(x,y){ return y-x; }); }); vs=pigs.map(tongArr); var s=vs.slice().sort(function(x,y){ return y-x; }); if(new Set(vs).size===n && s[0]-s[1]>=(lv>=3 ? 5000 : 1000) && (lv<3 || s[0]>=40000)) break; }
    var ix=vs.indexOf(Math.max.apply(null,vs)), ch=nm.map(function(t){ return 'Lợn '+t; }), sai={}; ch.forEach(function(c,i){ if(i!==ix) sai[String(i)]='cong-sai-to'; });
    return {type:'mcq', cot:2, _lv:lv, _dung:ch[ix], q:pigs.map(function(a,i){ return lonTien(nm[i], a); }).join('')+'<div>Chú lợn nào có <b>nhiều tiền nhất</b>?</div>', choices:ch, correct:ix, sai:sai, goiY:gy()};
  }, check:function(q){ var L=docLon(q.q), n = q._lv<=1 ? 2 : 3; if(L.length!==n || !kiemMCQ(q) || q.choices.length!==n) return false; var vs=L.map(function(x){ return tongArr(x.ds); }); if(new Set(vs).size!==n) return false; var ix=vs.indexOf(Math.max.apply(null,vs));
    if(q._dung!=='Lợn '+L[ix].t || !L.every(function(x){ return x.ds.length>=2 && x.ds.every(function(v){ return TO.indexOf(v)>=0; }); })) return false; if(q._lv<=2) return L.every(function(x){ return x.ds.every(function(v){ return v<=20000; }); }); return L.every(function(x){ return x.ds.every(function(v){ return v>=5000; }); }) && vs.some(function(v){ return v>=40000; }); }},

  /* D2 — Mua và trả lại */
  {name:'Mua và trả lại', sec:'Bài 2 — mẹ mua chanh 3 000 đồng và hành 2 000 đồng, đưa 10 000 đồng: cô bán hàng trả lại 5 000 đồng', mt:['MT2'], levels:3,
   muc:['Mua một món, trả lại.', 'Mua hai món, đưa 10 000 đồng.', 'Mua ba món, đưa tờ tiền lớn.'],
   make:function(lv){
    var n = lv<=1 ? 1 : (lv===2 ? 2 : 3), ms=shuffle(MON.slice()).slice(0,n), gs=[], pay, g, tong;
    for(g=0; g<500; g++){ if(lv<=1){ gs=[rnd(1,4)*1000]; pay=5000; } else if(lv===2){ gs=[rnd(1,5)*1000, rnd(1,5)*1000]; pay=10000; } else { gs=[rnd(3,15)*1000, rnd(3,15)*1000, rnd(3,15)*1000]; pay=pick([50000,100000]); } tong=tongArr(gs); if(tong<pay && (lv>=3 ? pay-tong>=2000 : tong>=2000 || lv<=1)) break; }
    var ans=pay-tong, dong=ms.map(function(m,i){ return m[0]+' hết <b>'+tien(gs[i])+'</b>'; });
    var cau = n===1 ? 'Mẹ mua '+dong[0]+'.' : 'Mẹ mua '+dong.slice(0,n-1).join(', ')+' và '+dong[n-1]+'.';
    return {type:'num', _lv:lv, _g:gs.join(','), _pay:pay, q:'<div>'+cau+' Mẹ đưa cô bán hàng tờ tiền như hình. Cô bán hàng phải trả lại mẹ bao nhiêu đồng?</div>'+dayTo([pay]), ans:ans, sai:nhanSai([[tong,'quen-tra-lai'],[pay+tong,'quen-tra-lai'],[pay-gs[0],'thieu-buoc'],[ans+1000,'cong-sai-to'],[ans-1000,'cong-sai-to'],[ans+2000,'cong-sai-to']], ans), goiY:gy()};
  }, check:function(q){ var gs=q._g.split(',').map(Number), pay=q._pay, d=docTo(q.q), tong=tongArr(gs); if(d.length!==1 || d[0]!==pay || q.ans!==pay-tong || q.ans<1000 || !gs.every(function(x){ return q.q.indexOf('<b>'+tien(x)+'</b>')>=0 && x%1000===0; })) return false;
    if(q._lv<=1) return gs.length===1 && pay===5000; if(q._lv===2) return gs.length===2 && pay===10000; return gs.length===3 && pay>=50000; }},

  /* D3 — Chọn cách trả lại */
  {name:'Chọn cách trả lại', sec:'Bài 2 — trả lại 5 000 đồng: 1 tờ 5 000 đồng hoặc 2 tờ 2 000 đồng và 1 tờ 1 000 đồng', mt:['MT2'], levels:3,
   muc:['Trả lại 5 000 đồng.', 'Trả lại bằng hai loại tờ tiền (2 tờ 2 000 và 1 tờ 1 000).', 'Trả lại số tiền lớn, nhiều cách: chọn cách đúng.'],
   make:function(lv){
    var x, dsTo, loai;
    if(lv<=1){ x=pick([3000,4000,5000,6000,7000]); dsTo=[1000,2000,5000]; loai=2; } else if(lv===2){ x=pick([3000,4000,5000,6000,7000,8000,9000]); dsTo=[1000,2000,5000]; loai=3; } else { x=pick([13000,15000,17000,25000,35000,45000,60000,65000]); dsTo=[1000,2000,5000,10000,20000,50000]; loai=3; }
    var D=cachNgau(x,dsTo,loai), Dt=chuCach(D), cand=[], g, c, t, seen={};
    seen[Dt]=1;
    for(g=0; g<300 && cand.length<3; g++){ var delta=pick([-2000,-1000,1000,2000,-5000,5000,3000]); var y=x+delta; if(y<=0) continue; c=cachNgau(y,dsTo,loai); t=chuCach(c); if(!seen[t] && giaTriCach(t)!==x){ seen[t]=1; cand.push(t); } }
    var ch=shuffle([Dt].concat(cand)), sai={}; ch.forEach(function(s,i){ if(s!==Dt) sai[String(i)]='cong-sai-to'; });
    return {type:'mcq', cot:1, _lv:lv, _x:x, _dung:Dt, q:'<div>Cô bán hàng cần trả lại cho mẹ <b>'+tien(x)+'</b>. Cô trả lại bằng cách nào là <b>đúng</b>?</div>', choices:ch, correct:ch.indexOf(Dt), sai:sai, goiY:gy()};
  }, check:function(q){ var x=q._x; if(!kiemMCQ(q) || q.choices.length!==4 || q.q.indexOf('<b>'+tien(x)+'</b>')<0) return false; var good=q.choices.filter(function(s){ return giaTriCach(s)===x; }); if(good.length!==1 || good[0]!==q._dung) return false;
    if(!q.choices.every(function(s){ return /^(\d+ tờ [\d ]+ đồng)( và \d+ tờ [\d ]+ đồng)*$/.test(s); })) return false; if(q._lv<=1) return x<=7000; if(q._lv===2) return x<=9000; return x>=13000; }},

  /* D4 — Đổi tiền */
  {name:'Đổi tiền', sec:'Bài 7 — 2 tờ 10 000 đồng = 1 tờ 20 000 đồng; 5 tờ 10 000 đồng = 1 tờ 50 000 đồng; 1 tờ 50 000 đồng = 1 tờ 10 000 đồng + 2 tờ 20 000 đồng', mt:['MT1'], levels:3,
   muc:['Đổi 2 hoặc 4 tờ nhỏ lấy tờ lớn gấp đôi (2 tờ 10 000 = ? tờ 20 000).', 'Đổi 5 hoặc 10 tờ (5 tờ 10 000 = ? tờ 50 000).', 'Một tờ lớn = một tờ nhỏ + ? tờ khác.'],
   make:function(lv){
    var a, b, k, ans, q, g, X, Y, Z;
    if(lv<=1){ var pr=pick([[1000,2000],[5000,10000],[10000,20000],[50000,100000],[2000,5000]]); a=pr[0]; b=pr[1]; k = (pr[0]===2000) ? 5 : pick([2,4]); if(k*a%b!==0){ k=2; } ans=k*a/b; q='<div>Đổi tiền:</div>'+dayTo(new Array(k).fill(a))+bieuThucTo(k+' tờ '+sx(a)+' đồng = ? tờ '+sx(b)+' đồng'); }
    else if(lv===2){ var pr2=pick([[1000,5000],[2000,10000],[10000,50000],[20000,100000],[10000,100000]]); a=pr2[0]; b=pr2[1]; var rt=b/a; k=rt*pick([1,2]); if(k>10) k=rt; ans=k*a/b; q='<div>Đổi tiền:</div>'+(k<=6 ? dayTo(new Array(k).fill(a)) : '')+bieuThucTo(k+' tờ '+sx(a)+' đồng = ? tờ '+sx(b)+' đồng'); }
    else { for(g=0; g<500; g++){ X=pick([20000,50000,100000,200000]); Y=pick([1000,2000,5000,10000,20000,50000]); Z=pick([2000,5000,10000,20000,50000]); if(Y<X && Z<X && (X-Y)%Z===0 && (X-Y)/Z>=1 && (X-Y)/Z<=8 && Z!==Y) break; } ans=(X-Y)/Z; a=X; b=Z; k=Y;
     q='<div>Đổi tiền:</div>'+dayTo([X])+bieuThucTo('1 tờ '+sx(X)+' đồng = 1 tờ '+sx(Y)+' đồng + ? tờ '+sx(Z)+' đồng'); }
    return {type:'num', _lv:lv, _a:a, _b:b, _k:k, q:q, ans:ans, sai:nhanSai([[ans+1,'doi-sai-so-to'],[ans+2,'doi-sai-so-to'],[ans-1,'doi-sai-so-to'],[ans*2,'doi-sai-so-to'],[lv>=3 ? Math.round((X-Y)/1000) : k,'doi-sai-so-to']], ans), goiY:gy()};
  }, check:function(q){ var a=q._a, b=q._b, k=q._k;
    if(q._lv<=2){ if(TO.indexOf(a)<0 || TO.indexOf(b)<0 || k*a%b!==0 || q.ans!==k*a/b || q.ans<1 || q.q.indexOf(k+' tờ '+sx(a)+' đồng = ? tờ '+sx(b)+' đồng')<0) return false; return q._lv<=1 ? (k===2 || k===4 || (a===2000 && k===5)) && b<=100000 : (b/a>=5 && k>=5 && k%(b/a)===0); }
    var X=a, Z=b, Y=k; return TO.indexOf(X)>=0 && TO.indexOf(Z)>=0 && TO.indexOf(Y)>=0 && Y<X && (X-Y)%Z===0 && q.ans===(X-Y)/Z && q.ans>=1 && q.q.indexOf('1 tờ '+sx(X)+' đồng = 1 tờ '+sx(Y)+' đồng + ? tờ '+sx(Z)+' đồng')>=0; }},

  /* D5 — Đoán giá, so sánh giá */
  {name:'Đoán giá, so sánh giá', sec:'Bài 3 — đoán giá: bóng đèn thấp nhất, quyển sách cao nhất; rô-bốt cao hơn cái lược', mt:['MT2'], levels:3,
   muc:['Đồ vật có giá thấp nhất.', 'Đồ vật có giá cao nhất.', 'Một món đắt hơn món kia bao nhiêu đồng.'],
   make:function(lv){
    var ten=shuffle(DOVAT.slice()).slice(0,4), ps=[], g, i;
    for(g=0; g<500; g++){ ps=[]; for(i=0;i<4;i++) ps.push(pick([2000,5000,8000,10000,14000,15000,20000,25000,30000,45000,50000,80000,100000,120000,150000,200000])); if(new Set(ps).size===4) break; }
    var ds=ten.map(function(t,k){ return [t, ps[k]]; }), bang=bangGia(ds);
    if(lv<=2){ var ix = lv<=1 ? ps.indexOf(Math.min.apply(null,ps)) : ps.indexOf(Math.max.apply(null,ps)), ch=shuffle(ten.slice()), D=ten[ix], sai={}; ch.forEach(function(c,k){ if(c!==D) sai[String(k)]='so-sanh-gia'; });
     return {type:'mcq', cot:2, _lv:lv, _dung:D, q:bang+'<div>Món đồ nào có giá <b>'+(lv<=1 ? 'thấp nhất' : 'cao nhất')+'</b>?</div>', choices:ch, correct:ch.indexOf(D), sai:sai, goiY:gy()}; }
    var i1=rnd(0,3), i2; do { i2=rnd(0,3); } while(i2===i1); var hi=ps[i1]>ps[i2] ? i1 : i2, lo=hi===i1 ? i2 : i1, ans=ps[hi]-ps[lo];
    return {type:'num', _lv:3, _hi:hi, _lo:lo, q:bang+'<div>'+ten[hi]+' đắt hơn '+ten[lo].toLowerCase()+' bao nhiêu đồng?</div>', ans:ans, sai:nhanSai([[ps[hi]+ps[lo],'so-sanh-gia'],[ans+1000,'nham-bang'],[ans-1000,'nham-bang'],[ps[hi],'thieu-buoc'],[ans+10000,'nham-bang']], ans), goiY:gy()};
  }, check:function(q){ var ps=docGia(q.q); if(!ps || ps.length!==4 || new Set(ps).size!==4) return false; var names=[]; var re=/font-size="16"[^>]*>([^<]+)<\/text><text[^>]*text-anchor="end"/g, m; while((m=re.exec(q.q))) names.push(m[1]); if(names.length!==4) return false;
    if(q._lv<=2){ if(!kiemMCQ(q) || q.choices.length!==4) return false; var ix = q._lv<=1 ? ps.indexOf(Math.min.apply(null,ps)) : ps.indexOf(Math.max.apply(null,ps)); return q._dung===names[ix] && q.q.indexOf(q._lv<=1 ? 'thấp nhất' : 'cao nhất')>=0; }
    var hi=q._hi, lo=q._lo; return ps[hi]>ps[lo] && q.ans===ps[hi]-ps[lo] && q.q.indexOf(names[hi]+' đắt hơn '+names[lo].toLowerCase())>=0; }},

  /* D6 — Giá của ba giỏ hàng */
  {name:'Giá của các giỏ hàng', sec:'Bài 4 — ba giỏ bắp ngô, cà rốt, dưa chuột có giá 10 000, 8 000, 5 000 đồng', mt:['MT3'], levels:3,
   muc:['Mua hai giỏ: tổng tiền.', 'Mua cả ba giỏ: tổng tiền.', 'Mua hai giỏ nào hết nhiều tiền nhất.'],
   make:function(lv){
    var ten=shuffle(['bắp ngô','cà rốt','dưa chuột','cà chua','táo']).slice(0,3), g, ps;
    for(g=0; g<300; g++){ ps=[pick([5000,6000,8000,10000,12000,15000,20000]), pick([5000,6000,8000,10000,12000,15000,20000]), pick([5000,6000,8000,10000,12000,15000,20000])]; if(new Set(ps).size===3) break; }
    var dong=ten.map(function(t,i){ return '<div>Giỏ '+t+': <b>'+tien(ps[i])+'</b></div>'; }).join('');
    if(lv<=1){ var a=rnd(0,2), b=(a+rnd(1,2))%3, ans=ps[a]+ps[b];
     return {type:'num', _lv:1, _ps:ps.join(','), _ab:a+','+b, _ten:ten.join('|'), q:dong+'<div class="mt-1">Mẹ mua giỏ '+ten[a]+' và giỏ '+ten[b]+'. Mẹ phải trả bao nhiêu đồng?</div>', ans:ans, sai:nhanSai([[ps[a],'thieu-buoc'],[ps[b],'thieu-buoc'],[tongArr(ps),'thieu-buoc'],[ans+1000,'cong-sai-to'],[ans-1000,'cong-sai-to']], ans), goiY:gy()}; }
    if(lv===2){ var ans2=tongArr(ps);
     return {type:'num', _lv:2, _ps:ps.join(','), _ten:ten.join('|'), q:dong+'<div class="mt-1">Mẹ mua cả ba giỏ. Mẹ phải trả bao nhiêu đồng?</div>', ans:ans2, sai:nhanSai([[ps[0]+ps[1],'thieu-buoc'],[ps[1]+ps[2],'thieu-buoc'],[ans2+1000,'cong-sai-to'],[ans2-1000,'cong-sai-to'],[ans2+2000,'cong-sai-to']], ans2), goiY:gy()}; }
    var prs=[[0,1],[0,2],[1,2]], sums=prs.map(function(p2){ return ps[p2[0]]+ps[p2[1]]; }), ix=sums.indexOf(Math.max.apply(null,sums)), chs=prs.map(function(p2){ return 'Giỏ '+ten[p2[0]]+' và giỏ '+ten[p2[1]]; }), D=chs[ix], sai={}; chs.forEach(function(c,i){ if(i!==ix) sai[String(i)]='cong-sai-to'; });
    return {type:'mcq', cot:1, _lv:3, _ps:ps.join(','), _ten:ten.join('|'), _dung:D, q:dong+'<div class="mt-1">Mẹ mua hai giỏ. Mua hai giỏ nào thì mẹ phải trả <b>nhiều tiền nhất</b>?</div>', choices:chs, correct:ix, sai:sai, goiY:gy()};
  }, check:function(q){ var ps=q._ps.split(',').map(Number), ten=q._ten.split('|'); if(ps.length!==3 || ten.length!==3 || new Set(ps).size!==3 || !ps.every(function(p,i){ return q.q.indexOf('Giỏ '+ten[i]+': <b>'+tien(p)+'</b>')>=0; })) return false;
    if(q._lv<=1){ var ab=q._ab.split(',').map(Number); return ab[0]!==ab[1] && q.ans===ps[ab[0]]+ps[ab[1]]; } if(q._lv===2) return q.ans===tongArr(ps);
    if(!kiemMCQ(q) || q.choices.length!==3) return false; var prs=[[0,1],[0,2],[1,2]], sums=prs.map(function(p2){ return ps[p2[0]]+ps[p2[1]]; }), ix=sums.indexOf(Math.max.apply(null,sums)); return new Set(sums).size===3 && q._dung==='Giỏ '+ten[prs[ix][0]]+' và giỏ '+ten[prs[ix][1]]; }},

  /* D7 — Tổng tiền mua nguyên liệu */
  {name:'Tổng tiền mua nguyên liệu', sec:'Bài 5 — làm nước chanh: nước 20 000 đồng, đường 14 000 đồng, chanh 10 000 đồng: tất cả 44 000 đồng', mt:['MT3'], levels:3,
   muc:['Mua hai thứ.', 'Mua ba thứ (20 000 + 14 000 + 10 000).', 'Mua ba thứ, số lớn hơn.'],
   make:function(lv){
    var NL=shuffle(['nước','đường','chanh','đá','lá bạc hà','chai thủy tinh']), n = lv<=1 ? 2 : 3, ps=[], i;
    for(i=0;i<n;i++) ps.push(lv<=2 ? rnd(2,30)*1000 : rnd(10,90)*1000+pick([0,500]));
    var ans=tongArr(ps);
    if(ans>99000 && lv>=3){ ps=ps.map(function(p){ return Math.round(p/2/500)*500; }); ans=tongArr(ps); }
    var dong=ps.map(function(p,k){ return NL[k]+' <b>'+tien(p)+'</b>'; });
    return {type:'num', _lv:lv, _ps:ps.join(','), _nl:NL.slice(0,n).join('|'), q:'<div>Bạn Mai mua nguyên liệu làm nước chanh: '+dong.join(', ')+'.</div><div>Bạn Mai phải trả tất cả bao nhiêu đồng?</div>', ans:ans, sai:nhanSai([[ans-ps[n-1],'thieu-buoc'],[ans-ps[0],'thieu-buoc'],[ans+1000,'cong-sai-to'],[ans-1000,'cong-sai-to'],[ans+10000,'cong-sai-to']], ans), goiY:gy()};
  }, check:function(q){ var ps=q._ps.split(',').map(Number), nl=q._nl.split('|'), n=q._lv<=1 ? 2 : 3; if(ps.length!==n || nl.length!==n || q.ans!==tongArr(ps) || ps.some(function(p){ return p<=0; })) return false; if(!ps.every(function(p,i){ return q.q.indexOf(nl[i]+' <b>'+tien(p)+'</b>')>=0; })) return false; if(q._lv<=2) return ps.every(function(p){ return p%1000===0; }); return ps.some(function(p){ return p%1000!==0 || p>=10000; }); }},

  /* D8 — Bán hàng: tiền lãi */
  {name:'Bán hàng: tiền lãi', sec:'Bài 6 — bán được 80 000 đồng, trừ vốn 44 000 đồng còn lãi 36 000 đồng', mt:['MT3'], levels:3,
   muc:['Bán được ... đồng, vốn ... đồng: lãi bao nhiêu.', 'Số khác, vốn có hàng nghìn khác 0.', 'Vốn gồm ba khoản: tính vốn rồi tính lãi (hai bước).'],
   make:function(lv){
    var ban, von, ans, q, vs, g;
    if(lv<=1){ ban=rnd(5,10)*10000; von=rnd(2,Math.floor(ban/10000)*10-1)*5000; if(von>=ban) von=ban-10000; ans=ban-von; q='<div>Bạn Mai bán nước chanh được <b>'+tien(ban)+'</b>. Tiền vốn mua nguyên liệu là <b>'+tien(von)+'</b>.</div><div>Bạn Mai lãi bao nhiêu đồng?</div>'; vs=[von]; }
    else if(lv===2){ ban=rnd(30,99)*1000; von=rnd(10,Math.floor(ban/1000)-5)*1000+pick([0,1000,2000,3000]); if(von>=ban) von=ban-5000; ans=ban-von; q='<div>Bạn Mai bán nước chanh được <b>'+tien(ban)+'</b>. Tiền vốn mua nguyên liệu là <b>'+tien(von)+'</b>.</div><div>Bạn Mai lãi bao nhiêu đồng?</div>'; vs=[von]; }
    else { for(g=0; g<500; g++){ vs=[rnd(5,30)*1000, rnd(5,30)*1000, rnd(5,30)*1000]; von=tongArr(vs); ban=rnd(Math.floor(von/10000)+1, 12)*10000; if(ban>von+2000 && ban<=99000) break; } ans=ban-von; q='<div>Bạn Mai mua nước <b>'+tien(vs[0])+'</b>, đường <b>'+tien(vs[1])+'</b>, chanh <b>'+tien(vs[2])+'</b>. Bạn bán nước chanh được <b>'+tien(ban)+'</b>.</div><div>Bạn Mai lãi bao nhiêu đồng?</div>'; }
    return {type:'num', _lv:lv, _ban:ban, _vs:vs.join(','), q:q, ans:ans, sai:nhanSai([[ban+tongArr(vs),'thieu-buoc'],[ban-vs[0],'thieu-buoc'],[tongArr(vs),'thieu-buoc'],[ans+1000,'nham-bang'],[ans-1000,'nham-bang']], ans), goiY:gy()};
  }, check:function(q){ var ban=q._ban, vs=q._vs.split(',').map(Number), von=tongArr(vs); if(ban<=von || q.ans!==ban-von || q.ans<=0 || q.q.indexOf('<b>'+tien(ban)+'</b>')<0) return false; if(!vs.every(function(v){ return q.q.indexOf('<b>'+tien(v)+'</b>')>=0; })) return false; if(q._lv<=1) return vs.length===1 && ban%10000===0 && vs[0]%5000===0; if(q._lv===2) return vs.length===1; return vs.length===3; }},

  /* D9 — Đầu vụ, giữa vụ */
  {name:'Đầu vụ, giữa vụ', sec:'Bài 6, 7 — đầu vụ 1 bắp ngô 5 000 đồng; giữa vụ 5 000 đồng mua 2 bắp: 1 bắp 2 500 đồng, đầu vụ đắt hơn 2 500 đồng', mt:['MT3'], levels:3,
   muc:['Giữa vụ: giá một bắp ngô.', 'Đầu vụ đắt hơn giữa vụ bao nhiêu đồng.', 'Số khác: giữa vụ mua nhiều bắp.'],
   make:function(lv){
    var a, k, b, g, gia, ans, q;
    if(lv<=2){ a=pick([5000,6000,8000,10000]); k=2; b=a; gia=b/k; }
    else { for(g=0; g<500; g++){ a=pick([6000,8000,10000,12000]); k=pick([2,3,4,5]); b=pick([5000,6000,8000,9000,10000,12000,15000]); if(b%k===0 && b/k<a && (b/k)%500===0) break; } gia=b/k; }
    if(lv<=1){ ans=gia; q='<div>Giữa vụ, <b>'+tien(b)+'</b> mua được <b>'+k+' bắp</b> ngô. Giữa vụ, một bắp ngô giá bao nhiêu đồng?</div>'; }
    else { ans=a-gia; q='<div>Đầu vụ, <b>1 bắp</b> ngô giá <b>'+tien(a)+'</b>. Giữa vụ, <b>'+tien(b)+'</b> mua được <b>'+k+' bắp</b> ngô. Đầu vụ, một bắp ngô đắt hơn giữa vụ bao nhiêu đồng?</div>'; }
    return {type:'num', _lv:lv, _a:a, _k:k, _b:b, q:q, ans:ans, sai:nhanSai([[b,'doc-de-sai'],[b*k,'doc-de-sai'],[lv<=1 ? b+k : a-b,'doc-de-sai'],[gia,'thieu-buoc'],[ans+500,'nham-bang'],[ans+1000,'nham-bang']], ans), goiY:gy()};
  }, check:function(q){ var a=q._a, k=q._k, b=q._b; if(b%k!==0 || k<2) return false; var gia=b/k; if(q._lv<=1) return q.ans===gia && gia>0 && q.q.indexOf('<b>'+tien(b)+'</b>')>=0 && q.q.indexOf('<b>'+k+' bắp</b>')>=0 && k===2;
    return a>gia && q.ans===a-gia && q.q.indexOf('<b>'+tien(a)+'</b>')>=0 && q.q.indexOf('<b>'+tien(b)+'</b>')>=0 && q.q.indexOf('<b>'+k+' bắp</b>')>=0 && (q._lv===2 ? k===2 : k>=2); }},

  /* D10 — Bạn An trả tiền */
  {name:'Bạn An trả tiền', sec:'Dạng thêm (không có trong SGK) — bạn An tính tiền trả lại: em có đồng ý không, An sai ở đâu, số tiền đúng', mt:['MT2'], levels:3,
   muc:['An tính tiền trả lại: em có đồng ý không.', 'An sai: An sai ở đâu.', 'An sai: số tiền trả lại đúng là bao nhiêu.'],
   make:function(lv){
    var an=nguoi('boy','Bạn An'), a, b, pay, tong, ans, kind=pick(['tru','cong','tong']), sa;
    var g; for(g=0; g<300; g++){ a=rnd(2,15)*1000; b=rnd(2,15)*1000; pay=pick([50000,100000]); tong=a+b; if(tong<pay-2000 && tong*2!==pay) break; }
    ans=pay-tong; sa = kind==='tru' ? ans+pick([1000,2000]) : (kind==='cong' ? pay+tong : tong);
    var mo='<div>Mẹ mua hàng hết <b>'+tien(a)+'</b> và <b>'+tien(b)+'</b>. Mẹ đưa tờ tiền như hình.</div>'+dayTo([pay]);
    if(lv<=1){ var dung=Math.random()<0.5, ra = dung ? ans : sa;
     return {type:'mcq', cot:2, _lv:1, _a:a, _b:b, _pay:pay, _ra:ra, _dung:ra===ans?'Đồng ý':'Không đồng ý', q:an+mo+'<div>Bạn An nói cô bán hàng phải trả lại <b>'+tien(ra)+'</b>. Em có đồng ý với bạn An không?</div>', choices:['Đồng ý','Không đồng ý'], correct:ra===ans?0:1, sai:(ra===ans?{'1':'quen-tra-lai'}:{'0':'quen-tra-lai'}), goiY:gy()}; }
    if(lv===2){ var LY={tru:'An trừ sai số tiền', cong:'An cộng tiền đưa với tiền hàng', tong:'An quên trừ: lấy tổng tiền hàng làm tiền trả lại'}, ch=shuffle([LY.tru, LY.cong, LY.tong, 'An tính đúng rồi']), Dd=LY[kind], sai={}; ch.forEach(function(c,i){ if(c!==Dd) sai[String(i)]='quen-tra-lai'; });
     return {type:'mcq', cot:1, _lv:2, _a:a, _b:b, _pay:pay, _ra:sa, _kind:kind, _dung:Dd, q:an+mo+'<div>Bạn An nói cô bán hàng phải trả lại <b>'+tien(sa)+'</b>. An tính sai rồi! An sai ở đâu?</div>', choices:ch, correct:ch.indexOf(Dd), sai:sai, goiY:gy()}; }
    var m3=lapMCQ(tien(ans), [[tien(sa),'quen-tra-lai'],[tien(tong),'quen-tra-lai'],[tien(pay+tong),'quen-tra-lai'],[tien(ans+1000),'cong-sai-to'],[tien(ans-1000),'cong-sai-to']]);
    return {type:'mcq', cot:2, _lv:3, _a:a, _b:b, _pay:pay, _ra:sa, _kind:kind, _dung:m3._dung, q:an+mo+'<div>Bạn An nói cô bán hàng phải trả lại <b>'+tien(sa)+'</b>. An tính sai rồi! Số tiền trả lại <b>đúng</b> là bao nhiêu?</div>', choices:m3.choices, correct:m3.correct, sai:m3.sai, goiY:gy()};
  }, check:function(q){ var a=q._a, b=q._b, pay=q._pay, d=docTo(q.q), tong=a+b, ans=pay-tong; if(d.length!==1 || d[0]!==pay || ans<2000 || !kiemMCQ(q) || q.q.indexOf('<b>'+tien(a)+'</b>')<0 || q.q.indexOf('<b>'+tien(b)+'</b>')<0 || q.q.indexOf('<b>'+tien(q._ra)+'</b>')<0) return false;
    if(q._lv<=1) return q.choices.length===2 && (q._dung==='Đồng ý')===(q._ra===ans);
    var exp = q._kind==='tru' ? [ans+1000,ans+2000] : (q._kind==='cong' ? [pay+tong] : [tong]); if(exp.indexOf(q._ra)<0 || q._ra===ans) return false;
    if(q._lv===2) return q.choices.length===4 && q._dung===({tru:'An trừ sai số tiền', cong:'An cộng tiền đưa với tiền hàng', tong:'An quên trừ: lấy tổng tiền hàng làm tiền trả lại'})[q._kind]; return q.choices.length===4 && q._dung===tien(ans); }}
 ]
};
