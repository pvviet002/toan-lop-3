/* bai-58.js — Bài 58: Luyện tập chung (Tập 2, Chủ đề 10). BÀI MỚI, Engine v2 — LUYỆN THÔNG MINH.
   Theo bảng phân tích sư phạm đã duyệt (phan-tich-su-pham/bai-58.md): 3 MỤC TIÊU (muctieu) × 10 DẠNG (topics), mỗi dạng 3 mức (Thông tư 27).
   Ôn lại bài 54–57. Mọi hàm chép nguyên từ bài 54–57 (mỗi bài một tệp): capChia, soDoLan (bài 57), nhanKhongNho (bài 56), chia (bài 44).
   Hình mới: laHinh (lá ghi kết quả), duongKhuc (đường gấp khúc các đoạn bằng nhau), robotHinh (rô-bốt lắp pin), khoiDay (khối lập phương gắn dây đèn), tuongI (tường vuông, chòi ở trung điểm).
   Mọi kết quả <= 9999. check() đọc lại hình từ chuỗi SVG (data-la, data-dk, data-rb, data-dem, data-ab, data-lan) và tính lại. QUY TẮC: nối chuỗi, KHÔNG backtick, KHÔNG template literal. */

var NB='\u00a0';
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
function docPT(s){ var o={}, re=/data-pt="(\w+)"[^>]*>([^<]*)<\/text>/g, m; while((m=re.exec(String(s)))) o[m[1]]=m[2]; return o; }
/* ---- Phép cộng: số nhớ, kết quả sai thường gặp ---- */
function cotSo(n, i){ return Math.floor(n/Math.pow(10,i))%10; }
function chia(a, b){ var q=Math.floor(a/b); return {q:q, r:a-q*b}; }
function demKhongA(a){ return (String(a).match(/0/g)||[]).length; }
/* quên nhớ: chỉ viết chữ số đơn vị của tích từng hàng */
function nhanKhongNho(a, b){ var r=0, i; for(i=3;i>=0;i--) r=r*10+(cotSo(a,i)*b)%10; return r; }
/* cặp (a, b): a bốn chữ số, b một chữ số; kieu 'het' (không dư) hoặc 'du' (có dư); zq: các số chữ số 0 được phép của thương; qmin, qmax: khoảng của thương */
function capChia(bs, kieu, zq, qmin, qmax){
 for(var g=0; g<12000; g++){
  var b=pick(bs), a=rnd(1000,9999), q=Math.floor(a/b), r=a%b;
  if(kieu==='het' && r!==0) continue; if(kieu==='du' && r===0) continue; if(zq && zq.indexOf(demKhongA(q))<0) continue; if(qmin && q<qmin) continue; if(qmax && q>qmax) continue;
  return {a:a, b:b, q:q, r:r};
 }
 return {a:6408, b:2, q:3204, r:0};
}
/* sơ đồ gấp lên: thanh trên gồm k ô bằng nhau (cả thanh là B), thanh dưới một ô (A, ô ?) */
function soDoLan(k, B, tenB, tenA, dv){
 var u=44, s=svgX(300,132,300).replace('<svg ','<svg data-lan="'+k+','+B+'" '), i;
 s+='<text x="10" y="16" font-size="15" '+HFONT+' fill="currentColor">'+tenB+': '+sx(B)+' '+dv+'</text>';
 for(i=0;i<k;i++) s+='<rect x="'+(10+i*u)+'" y="22" width="'+(u-4)+'" height="28" rx="6" fill="'+HM.troi+'"/>';
 s+='<text x="10" y="74" font-size="15" '+HFONT+' fill="currentColor">'+tenA+': ?</text><rect x="10" y="80" width="'+(u-4)+'" height="28" rx="6" fill="none" stroke="'+HM.hoi+'" stroke-width="2.5" stroke-dasharray="5 3"/><text x="'+(10+(u-4)/2)+'" y="100" text-anchor="middle" font-size="18" '+HFONT+' fill="currentColor">?</text>';
 s+='<text x="'+(10+k*u+6)+'" y="42" font-size="15" '+HFONT+' fill="currentColor">gấp '+k+' lần</text>';
 return s;
}
function docLan(html){ var m=/data-lan="(\d+),(\d+)"/.exec(html); return m ? {k:+m[1], B:+m[2]} : null; }

var M2L=['A','B','C','D'];
/* ---- Hình (mới trong bài này) ---- */
/* lá cây: mỗi lá ghi một kết quả; data-la="X:giá trị" */
function laHinh(ds){
 var s=svgX(300, Math.ceil(ds.length/2)*66+6, 300);
 ds.forEach(function(d,i){ var x=8+(i%2)*148, y=6+Math.floor(i/2)*66;
  s+='<g data-la="'+d.t+':'+d.v+'"><path d="M'+(x+4)+' '+(y+30)+' Q'+(x+40)+' '+(y-4)+' '+(x+136)+' '+(y+30)+' Q'+(x+100)+' '+(y+62)+' '+(x+4)+' '+(y+30)+' Z" fill="'+HM.la+'" stroke="'+HM.xanhLa+'" stroke-width="3" stroke-linejoin="round"/><text x="'+(x+34)+'" y="'+(y+36)+'" text-anchor="middle" font-size="18" '+HFONT+' fill="'+HM.chu+'">'+d.t+'</text><text x="'+(x+90)+'" y="'+(y+36)+'" text-anchor="middle" font-size="16" '+HFONT+' fill="'+HM.chu+'">'+d.v+'</text></g>'; });
 return s;
}
function docLa(html){ var re=/data-la="(\w):([^"]*)"/g, m, v=[]; while((m=re.exec(html))) v.push({t:m[1], v:m[2]}); return v; }
/* đường gấp khúc gồm các đoạn bằng nhau; rows = [{t, n, d}] */
function duongKhuc(rows){
 var s=svgX(300, rows.length*72+16, 300);
 rows.forEach(function(r,i){ var y0=10+i*72, W=200, seg=W/r.n, pts=[], k;
  for(k=0;k<=r.n;k++) pts.push((50+k*seg).toFixed(1)+','+(y0+(k%2 ? 8 : 40)));
  s+='<g data-dk="'+r.t+':'+r.n+':'+r.d+'"><polyline points="'+pts.join(' ')+'" fill="none" stroke="'+HM.goDam+'" stroke-width="5" stroke-linejoin="round" stroke-linecap="round"/><text x="25" y="'+(y0+30)+'" text-anchor="middle" font-size="16" '+HFONT+' fill="currentColor">'+r.t+'</text><text x="270" y="'+(y0+30)+'" text-anchor="middle" font-size="14" '+HFONT+' fill="currentColor">'+r.n+' đoạn</text><text x="150" y="'+(y0+66)+'" text-anchor="middle" font-size="15" '+HFONT+' fill="currentColor">Mỗi đoạn '+r.d+' cm</text></g>'; });
 return s;
}
function docKhuc(html){ var re=/data-dk="(\w+):(\d+):(\d+)"/g, m, v=[]; while((m=re.exec(html))) v.push({t:m[1], n:+m[2], d:+m[3]}); return v; }
/* rô-bốt lắp pin: mỗi pin là một ô data-dem="pin" */
function robotHinh(rs){
 var s=svgX(300,168,300), i, j;
 rs.forEach(function(r,i2){ var x=8+i2*98;
  s+='<g data-rb="'+r.t+':'+r.n+'"><rect x="'+(x+22)+'" y="6" width="44" height="30" rx="8" fill="'+HM.xam+'" stroke="'+HM.troiDam+'" stroke-width="3"/><circle cx="'+(x+36)+'" cy="21" r="4" fill="'+HM.troiDam+'"/><circle cx="'+(x+52)+'" cy="21" r="4" fill="'+HM.troiDam+'"/><rect x="'+(x+8)+'" y="40" width="72" height="84" rx="10" fill="'+HM.troi+'" stroke="'+HM.troiDam+'" stroke-width="3"/>';
  for(j=0;j<r.n;j++) s+='<rect data-dem="pin" x="'+(x+16+(j%3)*20)+'" y="'+(48+Math.floor(j/3)*24)+'" width="16" height="18" rx="3" fill="'+HM.vang+'" stroke="'+HM.vangDam+'" stroke-width="2"/>';
  s+='<text x="'+(x+44)+'" y="150" text-anchor="middle" font-size="16" '+HFONT+' fill="currentColor">Rô-bốt '+r.t+'</text></g>'; });
 return s;
}
function docRobot(html){ var re=/data-rb="(\w):(\d+)"/g, m, v=[]; while((m=re.exec(html))) v.push({t:m[1], n:+m[2]}); return {rs:v, dem:(html.match(/data-dem="pin"/g)||[]).length}; }
/* ngôi nhà khối lập phương: 12 cạnh, 4 cạnh sát đất (xám), 8 cạnh gắn dây đèn (vàng, data-dem="day") */
function khoiDay(){
 var s=svgX(260,176,260), F=[[50,70],[150,70],[150,160],[50,160]], K=[[90,30],[190,30],[190,120],[90,120]], i, E=[];
 s+='<polygon points="'+F.map(function(p){ return p.join(','); }).join(' ')+'" fill="'+HM.goNhat+'" opacity="0.5"/>';
 for(i=0;i<4;i++){ E.push([F[i],F[(i+1)%4], i===2]); E.push([K[i],K[(i+1)%4], i===2]); E.push([F[i],K[i], i===2||i===3]); }
 E.forEach(function(e,idx){ var duoi = (e[0][1]>=120 && e[1][1]>=120) && !(e[0][1]===120 && e[1][1]===120 && false); var matDat = e[2];
  s+='<line '+(matDat ? '' : 'data-dem="day" ')+'x1="'+e[0][0]+'" y1="'+e[0][1]+'" x2="'+e[1][0]+'" y2="'+e[1][1]+'" stroke="'+(matDat ? HM.xam : HM.vangDam)+'" stroke-width="'+(matDat ? 4 : 6)+'" stroke-linecap="round"/>'; });
 return s;
}
function tuongI(ab){
 var s=svgX(260,160,260).replace('<svg ','<svg data-ab="'+ab+'" ');
 s+='<rect x="60" y="26" width="110" height="110" fill="'+HM.la+'" stroke="'+HM.goDam+'" stroke-width="5" stroke-linejoin="round"/>';
 [['A',60,20],['B',170,20],['C',170,152],['D',60,152]].forEach(function(p){ s+='<text x="'+(p[1]+(p[0]==='A'||p[0]==='D' ? -14 : 14))+'" y="'+p[2]+'" text-anchor="middle" font-size="16" '+HFONT+' fill="currentColor">'+p[0]+'</text>'; });
 s+='<circle cx="115" cy="26" r="6" fill="'+HM.do+'"/><text x="115" y="54" text-anchor="middle" font-size="18" '+HFONT+' fill="'+HM.chu+'">I</text>';
 return s;
}
function docTuong(html){ var m=/data-ab="(\d+)"/.exec(html); return m ? +m[1] : null; }
var GOI={'quen-nho':'Nhân ở một hàng được số có hai chữ số thì viết chữ số đơn vị, NHỚ chữ số chục sang hàng bên trái.',
  'thieu-so-0':'Hạ chữ số xuống mà không chia được thì viết 0 ở thương rồi hạ tiếp.',
  'du-lon-hon-chia':'Số dư luôn bé hơn số chia.',
  'doi-phep-tinh':'Tìm thừa số: lấy tích chia cho thừa số kia. Tìm số bị chia: lấy thương nhân với số chia.',
  'bo-ngoac':'Có dấu ngoặc thì tính TRONG NGOẶC trước.',
  'doc-de-sai':'«Gấp k lần» là nhân với k; «giảm đi k lần» là chia cho k. Bé đọc kỹ câu hỏi.',
  'thieu-buoc':'Bài này có hai bước. Bé làm đủ các bước nhé!',
  'dem-sot-pin':'Bé đếm từng cục pin trong hình, mỗi cục đếm một lần.',
  'quen-tru-canh':'Dây đèn không gắn ở 4 cạnh sát đất: 12 cạnh trừ 4 cạnh còn 8 cạnh.',
  'quen-nhan-bon':'Hình vuông có bốn cạnh bằng nhau, nên chu vi bằng cạnh × 4.',
  'nham-trung-diem':'Trung điểm là điểm nằm GIỮA đoạn thẳng, chia đoạn thẳng thành hai phần bằng nhau.',
  'nham-bang':'Bé tính lại từng bước cho đúng nhé.'};
function gy(extra){ var o={}, k; for(k in GOI) o[k]=GOI[k]; for(k in (extra||{})) o[k]=extra[k]; return o; }
/* biểu thức: {k, a, b, c} */
var BT_MAU={p1:'(a + b) : c', p2:'(a + b) × c', p3:'a : (b + c)', p4:'a × (b − c)'};
function btText(t){ var f=function(x){ return sx(x); };
 if(t.k==='p1') return '('+f(t.a)+' + '+f(t.b)+') : '+t.c; if(t.k==='p2') return '('+f(t.a)+' + '+f(t.b)+') × '+t.c;
 if(t.k==='p3') return f(t.a)+' : ('+t.b+' + '+t.c+')'; return f(t.a)+' × ('+t.b+' − '+t.c+')'; }
function btGiaTri(t){ if(t.k==='p1') return (t.a+t.b)/t.c; if(t.k==='p2') return (t.a+t.b)*t.c; if(t.k==='p3') return t.a/(t.b+t.c); return t.a*(t.b-t.c); }

var BAI = {
 n: 58,
 title: 'Luyện Tập Chung (Chủ Đề 10)',
 sub: 'Luyện thông minh: câu hỏi tự đổi theo bé — làm hết lượt để xem ngọn lửa!',
 goal: 10, soCau: 18, soCauToiDa: 24,
 loi: {'quen-nho':'Quên nhớ', 'thieu-so-0':'Thương thiếu chữ số 0', 'du-lon-hon-chia':'Số dư lớn hơn hoặc bằng số chia', 'doi-phep-tinh':'Chọn sai phép tính khi tìm số chưa biết', 'bo-ngoac':'Bỏ dấu ngoặc', 'doc-de-sai':'Đọc sai «giảm đi», «gấp lên»', 'thieu-buoc':'Thiếu một bước', 'dem-sot-pin':'Đếm sót hoặc đếm trùng pin', 'quen-tru-canh':'Quên trừ 4 cạnh sát đất', 'quen-nhan-bon':'Chu vi hình vuông: quên nhân 4', 'nham-trung-diem':'Nhầm trung điểm', 'nham-bang':'Tính sai'},
 muctieu: [
  {id:'MT1', ten:'Tính nhân, chia với số bốn chữ số', muc:['Chọn lá ghi kết quả phép nhân (3 507 × 2).', 'Chọn lá ghi kết quả phép chia hết (4 806 : 6).', 'Chọn lá ghi thương và số dư (9 362 : 9 = 1 040 dư 2).']},
  {id:'MT2', ten:'Tìm số chưa biết; biểu thức', muc:['? × 4 = 1 668; (2 000 + 7 015) : 3; (102 + 901) × 7.', '? : 3 = 819; 2 515 : (1 + 4); 705 × (8 − 2).', 'Số bị chia, số chia, thừa số chưa biết; biểu thức có dấu ngoặc số lớn.']},
  {id:'MT3', ten:'Toán đố nhiều bước, hình học', muc:['Máy bay A gấp đôi B; 8 cục pin 1 680 g; đường của cà cuống A; 12 − 4 cạnh; chu vi tường; tổng rô-bốt; một người khổng lồ nâng.', 'Gấp lên hai lần; cà cuống A và B, ai bơi ngắn hơn; chòi ở trung điểm; tổng dây đèn; rô-bốt nhẹ nhất; ai nâng nặng nhất.', 'Tàu dỡ thùng (hai bước); mỗi đoạn của tôm; đường lát đá; từ trung điểm I men tường; rô-bốt nặng hơn; nặng hơn bao nhiêu.']}
 ],
 topics: [
  /* D1 — Chọn lá ghi kết quả (bài 6) */
  {name:'Chọn lá ghi kết quả', sec:'Bài 6 — sâu bò theo đường màu chọn lá ghi kết quả: 721 × 6 = 4 326; 2 790 : 3 = 930; 9 362 : 9 = 1 040 (dư 2)', mt:['MT1'], levels:3,
   muc:['Phép nhân số bốn chữ số với số một chữ số.', 'Phép chia hết số bốn chữ số.', 'Phép chia có dư: thương và số dư.'],
   make:function(lv){
    var p, ve, D, sai=[], g;
    if(lv<=1){ var b, a; do { b=rnd(2,9); a=rnd(300,Math.floor(9999/b)); } while(a*b>9999); var t=a*b; ve=sx(a)+' × '+b; D=sx(t); sai=[[sx(nhanKhongNho(a,b)),'quen-nho'],[sx(t+10),'quen-nho'],[sx(t-100),'quen-nho'],[sx(a+b),'nham-bang'],[sx(t+1000),'quen-nho']]; }
    else if(lv===2){ p=capChia([2,3,4,5,6,7,8,9],'het',[0,1]); ve=sx(p.a)+' : '+p.b; D=sx(p.q); sai=[[sx(+String(p.q).replace(/0/g,'')),'thieu-so-0'],[sx(p.q+1),'quen-nho'],[sx(p.q-1),'quen-nho'],[sx(Math.floor(p.q/10)),'quen-nho'],[sx(p.q+10),'quen-nho']]; }
    else { p=capChia([3,4,5,6,7,8,9],'du'); ve=sx(p.a)+' : '+p.b; D=sx(p.q)+' dư '+p.r; sai=[[sx(p.q-1)+' dư '+(p.r+p.b),'du-lon-hon-chia'],[sx(p.q)+' dư '+p.b,'du-lon-hon-chia'],[sx(p.q+1)+' dư '+p.r,'quen-nho'],[sx(p.r)+' dư '+sx(p.q%1000>0 ? p.q%1000 : p.q+1),'thieu-buoc'],[sx(p.q)+' dư '+(p.r+1),'quen-nho']]; }
    var seen={}; seen[D]=1; sai=sai.filter(function(s){ if(seen[s[0]] || !s[0]) return false; seen[s[0]]=1; return true; }); var vs=[[D,'']].concat(sai.slice(0,3)); vs=shuffle(vs);
    var ds=vs.map(function(v,i){ return {t:M2L[i], v:v[0]}; }), ix=vs.findIndex(function(v){ return v[0]===D; }), ch=ds.map(function(d){ return 'Lá '+d.t; }), sa={}; ch.forEach(function(c,i){ if(i!==ix) sa[String(i)]=vs[i][1]; });
    return {type:'mcq', cot:2, _lv:lv, _ve:ve, _D:D, _dung:ch[ix], q:khungHinh(laHinh(ds).replace(/<\/svg>$/,''))+'<div>Sâu muốn bò đến lá ghi kết quả của phép tính <b>'+ve+'</b>. Sâu bò đến lá nào?</div>', choices:ch, correct:ix, sai:sa, goiY:gy()};
  }, check:function(q){ var ls=docLa(q.q), m, e; if(ls.length!==4 || !kiemMCQ(q) || q.choices.length!==4) return false; var u=function(s){ return +String(s).split(NB).join(''); };
    if(q._lv<=1){ m=/^([\d ]+) × (\d)$/.exec(q._ve); if(!m) return false; e=sx(u(m[1])*+m[2]); }
    else { m=/^([\d ]+) : (\d)$/.exec(q._ve); if(!m) return false; var a=u(m[1]), b=+m[2], c=chia(a,b); if(q._lv===2){ if(c.r!==0) return false; e=sx(c.q); } else { if(c.r===0) return false; e=sx(c.q)+' dư '+c.r; } }
    var hit=ls.filter(function(l){ return l.v===e; }); if(hit.length!==1 || q._dung!=='Lá '+hit[0].t) return false; return q.q.indexOf('<b>'+q._ve+'</b>')>=0; }},

  /* D2 — Tìm số chưa biết (bài 2) */
  {name:'Tìm số chưa biết', sec:'Bài 2 — ? × 4 = 1 668 (417); ? : 3 = 819 (2 457)', mt:['MT2'], levels:3,
   muc:['Tìm thừa số chưa biết: ? × 4 = 1 668.', 'Tìm số bị chia chưa biết: ? : 3 = 819.', 'Tìm số chia hoặc thừa số: a : ? = q; b × ? = P.'],
   make:function(lv){
    var ex, ans, b, q, a;
    if(lv<=1){ b=rnd(2,5); a=rnd(300,Math.floor(9999/b)); ex='? × '+b+' = '+sx(a*b); ans=a; }
    else if(lv===2){ b=rnd(2,9); q=rnd(300,Math.floor(9999/b)); ex='? : '+b+' = '+sx(q); ans=q*b; }
    else if(Math.random()<0.5){ b=rnd(2,9); q=rnd(300,Math.floor(9999/b)); ex=sx(q*b)+' : ? = '+sx(q); ans=b; }
    else { b=rnd(2,9); a=rnd(300,Math.floor(9999/b)); ex=b+' × ? = '+sx(a*b); ans=a; }
    return {type:'num', _lv:lv, _ex:ex, q:'<div>Tìm số ở ô <b class="text-amber-700">?</b></div>'+bieuThucTo(ex), ans:ans, sai:nhanSai([[lv===2 ? Math.floor(ans/b) : ans+b,'doi-phep-tinh'],[ans+10,'nham-bang'],[ans-10,'nham-bang'],[ans+100,'nham-bang'],[lv===1 ? ans*b : ans+1,'doi-phep-tinh']], ans), goiY:gy()};
  }, check:function(q){ var u=function(s){ return +String(s).split(NB).join(''); }, m;
    if(q.q.indexOf(q._ex)<0) return false;
    if((m=/^\? × (\d) = ([\d ]+)$/.exec(q._ex))){ return q._lv<=1 && u(m[2])%+m[1]===0 && q.ans===u(m[2])/+m[1] && u(m[2])<=9999; }
    if((m=/^\? : (\d) = ([\d ]+)$/.exec(q._ex))){ return q._lv===2 && q.ans===u(m[2])*+m[1] && q.ans<=9999; }
    if((m=/^([\d ]+) : \? = ([\d ]+)$/.exec(q._ex))){ return q._lv>=3 && u(m[2])>0 && u(m[1])%u(m[2])===0 && q.ans===u(m[1])/u(m[2]) && q.ans>=2 && q.ans<=9; }
    if((m=/^(\d) × \? = ([\d ]+)$/.exec(q._ex))){ return q._lv>=3 && u(m[2])%+m[1]===0 && q.ans===u(m[2])/+m[1]; } return false; }},

  /* D3 — Biểu thức có dấu ngoặc (bài 8) */
  {name:'Biểu thức có dấu ngoặc', sec:'Bài 8 — (2 000 + 7 015) : 3 = 3 005; (102 + 901) × 7 = 7 021; 2 515 : (1 + 4) = 503; 705 × (8 − 2) = 4 230', mt:['MT2'], levels:3,
   muc:['(a + b) : c hoặc (a + b) × c với c nhỏ.', 'a : (b + c) hoặc a × (b − c).', 'Bốn dạng biểu thức với số lớn hơn.'],
   make:function(lv){
    var k = lv<=1 ? pick(['p1','p2']) : (lv===2 ? pick(['p3','p4']) : pick(['p1','p2','p3','p4'])), t, c, s, q;
    if(k==='p1'){ c=rnd(2,9); q=rnd(lv>=3 ? 800 : 300, Math.floor(9999/c)); s=q*c; var a1=rnd(100,s-100); t={k:k, a:a1, b:s-a1, c:c}; }
    else if(k==='p2'){ c=rnd(2,6); var a2=rnd(100,Math.floor(9999/c/2)-50), b2=rnd(100,Math.floor(9999/c)-a2); t={k:k, a:a2, b:b2, c:c}; }
    else if(k==='p3'){ var b3=rnd(1,5), c3=rnd(1,9-b3); q=rnd(lv>=3 ? 800 : 300, Math.floor(9999/(b3+c3))); t={k:k, a:q*(b3+c3), b:b3, c:c3}; }
    else { var c4=rnd(1,5), b4=c4+rnd(2,9-c4>2 ? 9-c4 : 2); var a4=rnd(100,Math.floor(9999/(b4-c4))); t={k:k, a:a4, b:b4, c:c4}; }
    var ans=btGiaTri(t), ex=btText(t);
    return {type:'num', _lv:lv, _bt:t, q:'<div>Tính giá trị của biểu thức:</div>'+bieuThucTo(ex+' = ?'), ans:ans, sai:nhanSai([[k==='p1' ? t.a+t.b/t.c : (k==='p2' ? t.a+t.b*t.c : (k==='p3' ? t.a/t.b+t.c : t.a*t.b-t.c)),'bo-ngoac'],[ans+10,'nham-bang'],[ans-10,'nham-bang'],[ans+100,'nham-bang'],[ans+1,'nham-bang']], ans), goiY:gy()};
  }, check:function(q){ var t=q._bt; if(q.q.indexOf(btText(t)+' = ?')<0) return false; var v=btGiaTri(t); if(!Number.isInteger(v) || v<=0 || v>9999 || q.ans!==v) return false; if((t.k==='p3' || t.k==='p1') && (t.k==='p1' ? (t.a+t.b)%t.c!==0 : t.a%(t.b+t.c)!==0)) return false; if(t.k==='p4' && t.b<=t.c) return false;
    if(q._lv<=1) return t.k==='p1' || t.k==='p2'; if(q._lv===2) return t.k==='p3' || t.k==='p4'; return true; }},

  /* D4 — Gấp lên, giảm đi nhiều lần (bài 3, 9) */
  {name:'Gấp lên, giảm đi nhiều lần', sec:'Bài 3, 9 — máy bay A cao 6 504 m gấp đôi B, B gấp 3 lần C: B 3 252 m, C 1 084 m; tàu 7 863 thùng, số còn lại giảm 3 lần: 2 621 thùng', mt:['MT3'], levels:3,
   muc:['A gấp đôi B: tìm B.', 'A gấp đôi B, B gấp 3 lần C: tìm C (hai bước).', 'Tàu chở thùng, số còn lại giảm 3 lần: dỡ xuống bao nhiêu thùng (hai bước).'],
   make:function(lv){
    var A, B, C, X, N, q, ans, hinh='';
    if(lv<=1){ B=rnd(500,4999); A=B*2; ans=B; hinh=khungHinh(soDoLan(2,A,'Máy bay A','Máy bay B','m').replace(/<\/svg>$/,'')); q='Máy bay A bay cao <b>'+sx(A)+' m</b>, gấp <b>đôi</b> độ cao của máy bay B. Máy bay B bay cao bao nhiêu mét?'; }
    else if(lv===2){ C=rnd(300,1666); B=C*3; A=B*2; ans=C; q='Máy bay A bay cao <b>'+sx(A)+' m</b>, gấp <b>đôi</b> độ cao máy bay B. Độ cao máy bay B gấp <b>3 lần</b> độ cao máy bay C. Máy bay C bay cao bao nhiêu mét?'; }
    else { X=rnd(300,3300); N=X*3; ans=N-X; hinh=khungHinh(soDoLan(3,N,'Lúc đầu','Còn lại','thùng').replace(/<\/svg>$/,'')); q='Tàu chở <b>'+sx(N)+' thùng</b> hàng. Dỡ xuống một số thùng thì số thùng còn lại <b>giảm đi 3 lần</b> so với lúc đầu. Tàu đã dỡ xuống bao nhiêu thùng hàng?'; }
    var base = lv<=1 ? A : (lv===2 ? A : N);
    return {type:'num', _lv:lv, _base:base, q:hinh+'<div>'+q+'</div>', ans:ans, sai:nhanSai([[lv===2 ? A/2 : (lv<=1 ? A*2 : N/3),'thieu-buoc'],[base*2,'doc-de-sai'],[lv===3 ? N/3*1 : A/6*2,'thieu-buoc'],[ans+10,'nham-bang'],[ans-100,'nham-bang']], ans), goiY:gy()};
  }, check:function(q){ var b=q._base; if(q.q.indexOf('<b>'+sx(b)+' ')<0) return false; if(q._lv<=1) return b%2===0 && q.ans===b/2 && !!docLan(q.q); if(q._lv===2) return b%6===0 && q.ans===b/6; return b%3===0 && q.ans===b-b/3 && !!docLan(q.q); }},

  /* D5 — Hai con cà cuống bơi đường gấp khúc (bài 4) */
  {name:'Cà cuống bơi đường gấp khúc', sec:'Bài 4 — cà cuống A bơi 4 đoạn mỗi đoạn 515 cm (2 060 cm), cà cuống B bơi 3 đoạn mỗi đoạn 928 cm (2 784 cm); tôm bơi 5 đoạn bằng đường của A: 412 cm', mt:['MT3'], levels:3,
   muc:['Độ dài đường gấp khúc của cà cuống A.', 'So sánh hai cà cuống: ai bơi ngắn hơn.', 'Tôm bơi cùng độ dài, chia đều thành 5 đoạn: mỗi đoạn dài bao nhiêu.'],
   make:function(lv){
    var nA=4, dA=rnd(300,990), nB=3, dB, g;
    if(lv>=3){ do { dA=rnd(40,198)*5; } while((dA*4)%5!==0 || dA*4>9999); }
    if(lv===2){ for(g=0; g<500; g++){ dB=rnd(300,990); if(nA*dA!==nB*dB) break; } }
    if(lv<=1) return {type:'num', _lv:1, _nA:nA, _dA:dA, q:khungHinh(duongKhuc([{t:'A',n:nA,d:dA}]).replace(/<\/svg>$/,''))+'<div>Cà cuống A bơi theo đường gấp khúc gồm <b>'+nA+' đoạn</b> bằng nhau, mỗi đoạn <b>'+dA+' cm</b>. Đường bơi của cà cuống A dài bao nhiêu xăng-ti-mét?</div>', ans:nA*dA, sai:nhanSai([[nA+dA,'thieu-buoc'],[nA*dA+10,'nham-bang'],[nA*dA-100,'nham-bang'],[dA*3,'thieu-buoc']], nA*dA), goiY:gy()};
    if(lv===2){ var tA=nA*dA, tB=nB*dB, D=tA<tB ? 'Cà cuống A' : 'Cà cuống B', ch=['Cà cuống A','Cà cuống B','Hai con bơi bằng nhau','Không so sánh được'], sai={}; ch.forEach(function(c,i){ if(c!==D) sai[String(i)]='thieu-buoc'; });
      return {type:'mcq', cot:2, _lv:2, _dung:D, q:khungHinh(duongKhuc([{t:'A',n:nA,d:dA},{t:'B',n:nB,d:dB}]).replace(/<\/svg>$/,''))+'<div>Hai con cà cuống bơi theo hai đường gấp khúc như hình. Con nào bơi quãng đường <b>ngắn hơn</b>?</div>', choices:ch, correct:ch.indexOf(D), sai:sai, goiY:gy()}; }
    var tot=nA*dA;
    return {type:'num', _lv:3, _nA:nA, _dA:dA, q:khungHinh(duongKhuc([{t:'A',n:nA,d:dA}]).replace(/<\/svg>$/,''))+'<div>Con tôm bơi theo đường gấp khúc gồm <b>5 đoạn</b> bằng nhau, dài bằng đường bơi của cà cuống A. Mỗi đoạn đường của tôm dài bao nhiêu xăng-ti-mét?</div>', ans:tot/5, sai:nhanSai([[tot,'thieu-buoc'],[dA,'thieu-buoc'],[tot/5+10,'nham-bang'],[tot/4,'thieu-buoc'],[tot/5-1,'nham-bang']], tot/5), goiY:gy()};
  }, check:function(q){ var ks=docKhuc(q.q); if(!ks.length) return false;
    if(q._lv<=1) return ks.length===1 && ks[0].n===4 && q.ans===ks[0].n*ks[0].d; if(q._lv===2){ if(ks.length!==2 || !kiemMCQ(q)) return false; var a=ks[0].n*ks[0].d, b=ks[1].n*ks[1].d; if(a===b) return false; return q._dung===(a<b ? 'Cà cuống A' : 'Cà cuống B') && q.choices.length===4; }
    var t=ks[0].n*ks[0].d; return ks.length===1 && t%5===0 && q.ans===t/5 && q.q.indexOf('<b>5 đoạn</b>')>=0; }},

  /* D6 — Chia đều (bài 5, 9) */
  {name:'Chia đều', sec:'Bài 5, 9 — 8 cục pin nặng 1 680 g: mỗi cục 210 g; đường lát đá dài 4 555 m, mỗi khối đá dài 5 m: 911 khối', mt:['MT3'], levels:3,
   muc:['Các cục pin giống nhau: mỗi cục nặng bao nhiêu gam.', 'Đường lát đá: cần bao nhiêu khối đá.', 'Chia đều số lớn: mỗi phần là bao nhiêu.'],
   make:function(lv){
    var p, q;
    if(lv<=1){ p=capChia([2,3,4,5,6,7,8,9],'het',[0,1],100,999); q='<b>'+p.b+' cục pin</b> giống nhau nặng tất cả <b>'+sx(p.a)+' g</b>. Mỗi cục pin nặng bao nhiêu gam?'; }
    else if(lv===2){ p=capChia([5],'het',[0,1]); q='Con đường lát đá dài <b>'+sx(p.a)+' m</b>. Mỗi khối đá dài <b>'+p.b+' m</b>. Cần bao nhiêu khối đá để lát hết con đường?'; }
    else { p=capChia([3,4,6,7,8,9],'het',[1,2],1000); q='Có <b>'+sx(p.a)+' quả</b> cam xếp đều vào <b>'+p.b+' thùng</b>. Mỗi thùng có bao nhiêu quả cam?'; }
    return {type:'num', _lv:lv, _a:p.a, _b:p.b, q:'<div>'+q+'</div>', ans:p.q, sai:nhanSai([[+String(p.q).replace(/0/g,''),'thieu-so-0'],[p.a-p.b,'doi-phep-tinh'],[p.q+1,'nham-bang'],[p.q-1,'nham-bang'],[Math.floor(p.q/10),'nham-bang']], p.q), goiY:gy()};
  }, check:function(q){ var a=q._a, b=q._b; if(a%b!==0 || q.ans!==a/b || q.q.indexOf('<b>'+sx(a)+' ')<0) return false; if(q._lv<=1) return a/b<=999 && q.q.indexOf('cục pin')>=0; if(q._lv===2) return b===5 && q.q.indexOf('khối đá')>=0; return a/b>=1000 && demKhongA(a/b)>=1; }},

  /* D7 — Ba rô-bốt lắp pin (bài 5) */
  {name:'Ba rô-bốt lắp pin', sec:'Bài 5 — ba rô-bốt mỗi con nặng 2 000 g chưa lắp pin, lắp 5, 6, 8 cục pin: con nào nhẹ nhất', mt:['MT3'], levels:3,
   muc:['Một rô-bốt: nặng bao nhiêu gam sau khi lắp pin.', 'Rô-bốt nhẹ nhất là con nào.', 'Rô-bốt nặng nhất nặng hơn rô-bốt nhẹ nhất bao nhiêu gam.'],
   make:function(lv){
    var base=rnd(10,30)*100, pin=rnd(10,30)*10, ns=shuffle([2,3,4,5,6,7,8,9]).slice(0,3), rs=ns.map(function(n,i){ return {t:M2L[i], n:n}; }), hinh=khungHinh(robotHinh(rs).replace(/<\/svg>$/,'')), mo='Ba rô-bốt giống nhau, chưa lắp pin mỗi con nặng <b>'+sx(base)+' g</b>. Mỗi cục pin nặng <b>'+pin+' g</b>. Các rô-bốt lắp pin như hình. ';
    if(lv<=1){ var i=rnd(0,2), ans=base+rs[i].n*pin; return {type:'num', _lv:1, _base:base, _pin:pin, _i:i, q:hinh+'<div>'+mo+'Rô-bốt <b>'+rs[i].t+'</b> nặng bao nhiêu gam?</div>', ans:ans, sai:nhanSai([[rs[i].n*pin,'thieu-buoc'],[base+pin,'dem-sot-pin'],[base+(rs[i].n+1)*pin,'dem-sot-pin'],[base+(rs[i].n-1)*pin,'dem-sot-pin'],[ans+100,'nham-bang']], ans), goiY:gy()}; }
    if(lv===2){ var mn=ns.indexOf(Math.min.apply(null,ns)), ch=rs.map(function(r){ return 'Rô-bốt '+r.t; }), sai={}; ch.forEach(function(c,k){ if(k!==mn) sai[String(k)]='dem-sot-pin'; });
      return {type:'mcq', cot:2, _lv:2, _base:base, _pin:pin, _dung:ch[mn], q:hinh+'<div>'+mo+'Rô-bốt nào <b>nhẹ nhất</b>?</div>', choices:ch, correct:mn, sai:sai, goiY:gy()}; }
    var d=(Math.max.apply(null,ns)-Math.min.apply(null,ns))*pin;
    return {type:'num', _lv:3, _base:base, _pin:pin, q:hinh+'<div>'+mo+'Rô-bốt nặng nhất nặng hơn rô-bốt nhẹ nhất bao nhiêu gam?</div>', ans:d, sai:nhanSai([[Math.max.apply(null,ns)*pin,'thieu-buoc'],[(Math.max.apply(null,ns)-Math.min.apply(null,ns))*pin+pin,'dem-sot-pin'],[(Math.max.apply(null,ns)-Math.min.apply(null,ns)+1)*pin,'dem-sot-pin'],[d+100,'nham-bang'],[d-10,'nham-bang']], d), goiY:gy()};
  }, check:function(q){ var t=docRobot(q.q); if(t.rs.length!==3 || t.dem!==t.rs.reduce(function(s,r){ return s+r.n; },0) || new Set(t.rs.map(function(r){ return r.n; })).size!==3) return false; var ns=t.rs.map(function(r){ return r.n; });
    if(q._lv<=1) return q.ans===q._base+ns[q._i]*q._pin && q.q.indexOf('<b>'+t.rs[q._i].t+'</b>')>=0; if(q._lv===2){ if(!kiemMCQ(q) || q.choices.length!==3) return false; return q._dung==='Rô-bốt '+t.rs[ns.indexOf(Math.min.apply(null,ns))].t; }
    return q.ans===(Math.max.apply(null,ns)-Math.min.apply(null,ns))*q._pin; }},

  /* D8 — Dây đèn ngôi nhà khối lập phương (bài 7) */
  {name:'Dây đèn ngôi nhà hình khối lập phương', sec:'Bài 7 — gắn dây đèn dọc các cạnh, trừ 4 cạnh sát đất: 12 − 4 = 8 dây, mỗi dây 450 cm: 3 600 cm', mt:['MT3'], levels:3,
   muc:['Có bao nhiêu cạnh được gắn dây đèn (12 − 4).', 'Tổng độ dài dây đèn (8 × 450).', 'Tổng độ dài dây đèn với mỗi dây dài hơn.'],
   make:function(lv){
    var L = lv<=1 ? 0 : (lv===2 ? rnd(2,12)*50 : rnd(14,49)*25), ans = lv<=1 ? 8 : 8*L;
    return {type:'num', _lv:lv, _L:L, q:khungHinh(khoiDay())+'<div>Ngôi nhà hình khối lập phương có <b>12 cạnh</b>. '+(lv<=1 ? 'Người ta gắn dây đèn dọc các cạnh, <b>trừ 4 cạnh sát đất</b>. Có bao nhiêu cạnh được gắn dây đèn?' : 'Người ta gắn dây đèn dọc các cạnh, <b>trừ 4 cạnh sát đất</b>. Mỗi cạnh có một dây đèn dài <b>'+sx(L)+' cm</b>. Tất cả dây đèn dài bao nhiêu xăng-ti-mét?')+'</div>', ans:ans, sai:nhanSai(lv<=1 ? [[12,'quen-tru-canh'],[4,'quen-tru-canh'],[16,'quen-tru-canh'],[9,'dem-sot-pin'],[7,'dem-sot-pin']] : [[12*L,'quen-tru-canh'],[4*L,'quen-tru-canh'],[8+L,'thieu-buoc'],[ans+L,'dem-sot-pin'],[ans-L,'dem-sot-pin']], ans), goiY:gy()};
  }, check:function(q){ var n=(q.q.match(/data-dem="day"/g)||[]).length; if(n!==8) return false; var L=q._L; if(q._lv<=1) return q.ans===8 && L===0; if(q.q.indexOf('<b>'+sx(L)+' cm</b>')<0 || q.ans!==8*L || q.ans>9999) return false; return q._lv===2 ? L<=600 : L>=350; }},

  /* D9 — Chu vi tường, chòi ở trung điểm (bài 9, 10) */
  {name:'Chu vi tường, chòi ở trung điểm', sec:'Bài 9, 10 — tường hình vuông cạnh 2 324 bước: chu vi 9 296 bước; chòi ở trung điểm I của AB: AI = 1 162 bước', mt:['MT3'], levels:3,
   muc:['Chu vi tường hình vuông.', 'Chòi ở trung điểm I của AB: tính AI.', 'Từ I đi men tường đến B rồi C: đi bao nhiêu bước.'],
   make:function(lv){
    var ab = lv<=1 ? rnd(1000,2499) : (lv===2 ? rnd(500,4999)*2 : rnd(500,3300)*2), ans, q;
    if(lv<=1){ ans=ab*4; q='Bức tường hình vuông ABCD có cạnh <b>'+sx(ab)+' bước chân</b>. Chu vi bức tường là bao nhiêu bước chân?'; }
    else if(lv===2){ ans=ab/2; q='Bức tường hình vuông ABCD có cạnh AB dài <b>'+sx(ab)+' bước chân</b>. Chòi canh I ở trung điểm của AB. Đoạn AI dài bao nhiêu bước chân?'; }
    else { ans=ab/2+ab; q='Bức tường hình vuông ABCD có cạnh <b>'+sx(ab)+' bước chân</b>. Chòi canh I ở trung điểm của AB. Một người đi từ I men theo tường đến B rồi đến C. Người đó đi bao nhiêu bước chân?'; }
    return {type:'num', _lv:lv, _ab:ab, q:khungHinh(tuongI(ab).replace(/<\/svg>$/,''))+'<div>'+q+'</div>', ans:ans, sai:nhanSai(lv<=1 ? [[ab*2,'quen-nhan-bon'],[ab*3,'quen-nhan-bon'],[ab+4,'quen-nhan-bon'],[ans+10,'nham-bang']] : (lv===2 ? [[ab,'nham-trung-diem'],[ab*2,'nham-trung-diem'],[ab/2+1,'nham-bang'],[ab/4,'nham-trung-diem']] : [[ab/2,'thieu-buoc'],[ab,'thieu-buoc'],[ab*2,'thieu-buoc'],[ans+10,'nham-bang'],[ab/2+ab/2,'thieu-buoc']]), ans), goiY:gy()};
  }, check:function(q){ var ab=docTuong(q.q); if(ab===null || ab!==q._ab || q.q.indexOf('<b>'+sx(ab)+' bước chân</b>')<0) return false; if(q._lv<=1) return q.ans===ab*4 && ab<=2499; if(ab%2!==0) return false; if(q._lv===2) return q.ans===ab/2; return q.ans===ab/2+ab && q.ans<=9999; }},

  /* D10 — Ba người khổng lồ nâng vật (bài 8) */
  {name:'Ba người khổng lồ nâng vật', sec:'Bài 8 — ba người khổng lồ nâng khúc gỗ 2 612 kg, voi 1 245 kg, chó 25 kg, ngựa 450 kg: ai nâng nặng nhất', mt:['MT3'], levels:3,
   muc:['Một người nâng hai con vật: tổng cân nặng.', 'Ba người nâng: ai nâng nặng nhất.', 'Người nâng nặng nhất nặng hơn người nâng nhẹ nhất bao nhiêu ki-lô-gam.'],
   make:function(lv){
    var g, w, tong;
    for(g=0; g<300; g++){ w={go:rnd(140,300)*5, voi:rnd(200,320)*5, cho:rnd(2,10)*5, ngua:rnd(60,120)*5}; var A=w.ngua+w.cho, B=w.voi+w.cho, C=w.go; tong=[A,B,C]; if(new Set(tong).size===3) break; }
    var mo='Ba người khổng lồ cùng nâng. Người <b>A</b> nâng con ngựa nặng <b>'+sx(w.ngua)+' kg</b> và con chó nặng <b>'+sx(w.cho)+' kg</b>. Người <b>B</b> nâng con voi nặng <b>'+sx(w.voi)+' kg</b> và con chó nặng <b>'+sx(w.cho)+' kg</b>. Người <b>C</b> nâng khúc gỗ nặng <b>'+sx(w.go)+' kg</b>. ';
    if(lv<=1) return {type:'num', _lv:1, _w:JSON.stringify(w), q:'<div>'+mo+'Người B nâng tất cả bao nhiêu ki-lô-gam?</div>', ans:tong[1], sai:nhanSai([[w.voi,'thieu-buoc'],[w.cho,'thieu-buoc'],[tong[1]+10,'nham-bang'],[tong[1]-100,'nham-bang'],[w.go+w.voi,'thieu-buoc']], tong[1]), goiY:gy()};
    var mx=tong.indexOf(Math.max.apply(null,tong)), ch=['Người A','Người B','Người C'];
    if(lv===2){ var sai={}; ch.forEach(function(c,i){ if(i!==mx) sai[String(i)]='thieu-buoc'; }); return {type:'mcq', cot:1, _lv:2, _w:JSON.stringify(w), _dung:ch[mx], q:'<div>'+mo+'Ai nâng <b>nặng nhất</b>?</div>', choices:ch, correct:mx, sai:sai, goiY:gy()}; }
    var d=Math.max.apply(null,tong)-Math.min.apply(null,tong);
    return {type:'num', _lv:3, _w:JSON.stringify(w), q:'<div>'+mo+'Người nâng nặng nhất nâng nặng hơn người nâng nhẹ nhất bao nhiêu ki-lô-gam?</div>', ans:d, sai:nhanSai([[Math.max.apply(null,tong),'thieu-buoc'],[Math.min.apply(null,tong),'thieu-buoc'],[d+10,'nham-bang'],[d-5,'nham-bang'],[Math.max.apply(null,tong)+Math.min.apply(null,tong),'thieu-buoc']], d), goiY:gy()};
  }, check:function(q){ var w=JSON.parse(q._w), tong=[w.ngua+w.cho, w.voi+w.cho, w.go]; if(new Set(tong).size!==3 || tong.some(function(x){ return x>9999; })) return false; var ks=['ngua','cho','voi','go']; if(ks.some(function(k){ return q.q.indexOf('<b>'+sx(w[k])+' kg</b>')<0; })) return false;
    if(q._lv<=1) return q.ans===tong[1]; if(q._lv===2){ if(!kiemMCQ(q) || q.choices.length!==3) return false; return q._dung==='Người '+['A','B','C'][tong.indexOf(Math.max.apply(null,tong))]; }
    return q.ans===Math.max.apply(null,tong)-Math.min.apply(null,tong); }}
 ]
};
