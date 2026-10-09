/* bai-38.js — Bài 38: Biểu thức số. Tính giá trị của biểu thức số. BÀI MỚI, Engine v2 — LUYỆN THÔNG MINH.
   Theo bảng phân tích sư phạm đã duyệt (phan-tich-su-pham/bai-38.md, PR #28): 4 MỤC TIÊU (muctieu) × 11 DẠNG (topics), mỗi dạng 3 mức (Thông tư 27).
   Quy tắc dạy: chỉ cộng trừ hoặc chỉ nhân chia thì làm từ trái sang phải; có cả bốn phép thì nhân chia trước; có dấu ngoặc thì tính trong ngoặc trước.
   Mọi giá trị nguyên, 0–999, mọi bước không âm, mọi phép chia chia hết. tinhBT2 (viết trong file này) tính biểu thức có dấu ngoặc bằng tinhBT của figures.js;
   tinhTSP tính "từ trái sang phải" (lỗi) và tinhBoNgoac tính "bỏ dấu ngoặc" (lỗi) để làm đáp án nhiễu có nhãn. check() luôn tính lại bằng tinhBT2.
   Hình: gapKhuc (đường gấp khúc nhiều đoạn, nhãn trắng cao 30), theTinh (thẻ biểu thức), anh('boy'). Không emoji.
   QUY TẮC: nối chuỗi, KHÔNG backtick và KHÔNG template literal. */

/* ---- Tiện ích chung ---- */
function nhanSai(ds, dung){ var o={}; ds.forEach(function(p){ var v=p[0]; if(Number.isInteger(v) && v>0 && v!==dung && !(String(v) in o)) o[String(v)]=p[1]; }); return o; }
function kiemMCQ(q){ return q.choices[q.correct]===q._dung && new Set(q.choices).size===q.choices.length; }
function dsBtn38(ch){ return '<span class="text-2xl font-extrabold text-slate-700">'+ch+'</span><span class="ml-2 text-base font-bold text-slate-600">'+(ch==='Đ'?'Đúng':'Sai')+'</span>'; }
function svgX(w, h, px){ return svgHinh(w, h, px).replace('<svg ', '<svg class="text-slate-700" '); }
function khungHinh(s){ return '<div class="flex justify-center my-2">'+s+'</svg></div>'; }
function nguoi(ten, alt){ return '<div class="flex justify-center mb-1">'+anh(ten, 72, alt)+'</div>'; }
function kyHieu(nhan, bt){ return '<div class="text-slate-500 mb-1">'+nhan+'</div><div class="text-3xl font-extrabold text-orange-600">'+bt+'</div>'; }
var TRU='−', NHAN='×', CHIA=':';
var GOI={'tinh-trai-sang-phai':'Biểu thức có phép nhân hoặc phép chia thì bé làm NHÂN, CHIA trước, rồi mới cộng, trừ.', 'nhan-chia-sau':'Nhân, chia trước; cộng, trừ sau.', 'bo-ngoac':'Có dấu ngoặc thì bé tính TRONG NGOẶC trước.', 'nham-gia-tri':'Giá trị của biểu thức là kết quả sau khi tính hết mọi phép tính.',
  'nham-bang':'Bé tính lại từng bước cho đúng nhé.', 'thieu-buoc':'Bài này có hai bước. Bé làm đủ các bước nhé!', 'chon-sai-phep':'Bé đọc kỹ: gộp lại là cộng, bớt đi là trừ, nhiều phần bằng nhau là nhân, chia đều là chia.', 'dem-sot-phep':'Bé xét từng thẻ rồi đếm lại nhé!', 'dao-vai':'Bé xem lại câu hỏi hỏi gì.'};
function gy(extra){ var o={}, k; for(k in GOI) o[k]=GOI[k]; for(k in (extra||{})) o[k]=extra[k]; return o; }
function theTinh(ds){
  var s='<div class="flex flex-wrap justify-center gap-2 my-2">';
  ds.forEach(function(t){ s+='<span class="inline-block px-3 py-2 rounded-xl border-2 border-amber-300 text-slate-700 font-extrabold text-xl whitespace-nowrap">'+t+'</span>'; });
  return s+'</div>';
}
function docThe(s){ var o=[], re=/<span class="inline-block px-3 py-2[^>]*>([^<]*)<\/span>/g, m; while((m=re.exec(String(s)))) o.push(m[1]); return o; }
function bieuThuc(t){ return '<div class="text-3xl font-extrabold text-orange-600 my-2">'+t+'</div>'; }

/* ---- Tính giá trị ---- */
function tinhBT2(t){ var s=String(t), m; while((m=/\(([^()]+)\)/.exec(s))) s=s.replace(m[0], String(tinhBT(m[1]))); return tinhBT(s); }
function tinhTSP(t){ var tk=String(t).replace(/[()]/g,'').replace(/−/g,'-').trim().split(/\s+/), r=+tk[0], i; for(i=1;i<tk.length;i+=2){ var o=tk[i], v=+tk[i+1]; r = o==='+' ? r+v : (o==='-' ? r-v : (o==='×' ? r*v : r/v)); } return r; }
function tinhBoNgoac(t){ return tinhBT(String(t).replace(/[()]/g,'')); }
function okSo(v){ return Number.isInteger(v) && v>=0 && v<=999; }
function laBT(t){ return /^\d+( [+−×:] \d+)+$/.test(t); }
function soPhep(t){ return (String(t).match(/[+−×:]/g)||[]).length; }
/* Mọi bước của biểu thức (không ngoặc, theo đúng thứ tự) đều là số nguyên không âm <= 999 */
function okBuoc(t){ var s=String(t), m; while((m=/\(([^()]+)\)/.exec(s))){ var v=tinhBT(m[1]); if(!okSo(v) || !okBuocPhang(m[1])) return false; s=s.replace(m[0], String(v)); } return okBuocPhang(s) && okSo(tinhBT(s)); }
function okBuocPhang(t){ var tk=String(t).replace(/−/g,'-').trim().split(/\s+/), vals=[+tk[0]], ops=[], i;
  for(i=1;i<tk.length;i+=2){ var o=tk[i], v=+tk[i+1]; if(o==='×'){ vals[vals.length-1]*=v; } else if(o===':'){ if(v===0 || vals[vals.length-1]%v!==0) return false; vals[vals.length-1]/=v; } else { ops.push(o); vals.push(v); } if(!okSo(vals[vals.length-1])) return false; }
  var r=vals[0]; for(i=0;i<ops.length;i++){ r = ops[i]==='+' ? r+vals[i+1] : r-vals[i+1]; if(!okSo(r)) return false; } return true; }
function bt(a, op, b){ return a+' '+op+' '+b; }

/* ---- Hình (D1): đường gấp khúc n đoạn, nhãn độ dài trắng 30 cao. ds = [cm, cm, …]; ten = 'ABCD' ---- */
function gapKhuc(ds){
  var tong=ds.reduce(function(x,y){ return x+y; },0), nho=Math.min.apply(null, ds), sc=Math.min(22, 300/tong), P=[[0,0]], i, ang=[-0.45, 0.35, -0.3];
  for(i=0;i<ds.length;i++){ var L=ds[i]*sc, a=ang[i%3], p=P[P.length-1]; P.push([p[0]+L*Math.cos(a), p[1]+L*Math.sin(a)]); }
  var minY=Math.min.apply(null, P.map(function(p){ return p[1]; })), maxY=Math.max.apply(null, P.map(function(p){ return p[1]; })), PX=40, PT=46, PB=46, W=Math.round(P[P.length-1][0]+2*PX), H=Math.round(maxY-minY+PT+PB), ox=PX, oy=PT-minY, s=svgX(W,H), TEN='ABCDE';
  var Q=P.map(function(p){ return [p[0]+ox, p[1]+oy]; });
  s+='<path d="M'+Q.map(function(p){ return p[0].toFixed(1)+' '+p[1].toFixed(1); }).join(' L')+'" fill="none" stroke="currentColor" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/>';
  Q.forEach(function(p,j){ s+='<circle cx="'+p[0].toFixed(1)+'" cy="'+p[1].toFixed(1)+'" r="2.5" fill="none" stroke="currentColor" stroke-width="6"/>'; var up = (j===0) ? false : (ang[(j-1)%3]<0), tx = j===0 ? p[0]-22 : (j===Q.length-1 ? p[0]+22 : p[0]), ty = (j===0 || j===Q.length-1) ? p[1]+8 : (up ? p[1]-14 : p[1]+28); s+='<text x="'+tx.toFixed(1)+'" y="'+ty.toFixed(1)+'" text-anchor="middle" font-size="22" '+HFONT+' fill="currentColor">'+TEN.charAt(j)+'</text>'; });
  for(i=0;i<ds.length;i++){ var mx=(Q[i][0]+Q[i+1][0])/2, my=(Q[i][1]+Q[i+1][1])/2, up2=ang[i%3]<0, lx=mx, ly = up2 ? my+24 : my-24;
    s+='<g data-seg="'+i+'" data-cm="'+ds[i]+'">'+nhanVien(+lx.toFixed(1), +ly.toFixed(1), String(ds[i]).length*12+44, 30, ds[i]+' cm', 18)+'</g>'; }
  return khungHinh(s);
}
function docGK(s){ var o=[], re=/data-seg="(\d+)" data-cm="(\d+)"/g, m; while((m=re.exec(String(s)))) o.push(+m[2]); return o; }

/* ---- Bộ sinh biểu thức có giá trị kiểm soát ---- */
/* a + b × c, a − b × c, a + b : c, a − b : c (nhân chia trước) với mọi bước hợp lệ */
function btUuTien(){
  for(var g=0;g<500;g++){ var kieu=pick(['+×','−×','+:','−:','×+','×−',':+',':−']), a, b, c, t;
    if(kieu==='+×'){ b=rnd(2,9); c=rnd(2,9); a=rnd(5,60); t=a+' + '+b+' × '+c; }
    else if(kieu==='−×'){ b=rnd(2,9); c=rnd(2,9); a=rnd(b*c+1, b*c+60); t=a+' − '+b+' × '+c; }
    else if(kieu==='+:'){ c=rnd(2,9); b=c*rnd(2,9); a=rnd(5,60); t=a+' + '+b+' : '+c; }
    else if(kieu==='−:'){ c=rnd(2,9); b=c*rnd(2,9); a=rnd(b/c+1, b/c+60); t=a+' − '+b+' : '+c; }
    else if(kieu==='×+'){ a=rnd(2,9); b=rnd(2,9); c=rnd(5,60); t=a+' × '+b+' + '+c; }
    else if(kieu==='×−'){ a=rnd(2,9); b=rnd(2,9); c=rnd(1,a*b-1); t=a+' × '+b+' − '+c; }
    else if(kieu===':+'){ b=rnd(2,9); a=b*rnd(2,9); c=rnd(5,60); t=a+' : '+b+' + '+c; }
    else { b=rnd(2,9); a=b*rnd(2,9); c=rnd(1,a/b-1); t=a+' : '+b+' − '+c; }
    if(okBuoc(t) && tinhTSP(t)!==tinhBT2(t)) return t; }
  return '24 + 5 × 6';
}
/* chỉ cộng trừ hoặc chỉ nhân chia: hai phép, từ trái sang phải */
function btTrai(lv){
  for(var g=0;g<500;g++){ var t, kieu=pick(lv<=1 ? ['+−','−+','++','−−'] : ['+−','−+','++','−−','×:',':×']), a, b, c;
    var M = lv<=1 ? 60 : (lv===2 ? 100 : 500);
    if(kieu==='+−'){ a=rnd(10,M); b=rnd(5,M); c=rnd(5,a+b); t=a+' + '+b+' − '+c; }
    else if(kieu==='−+'){ a=rnd(20,M); b=rnd(5,a); c=rnd(5,M); t=a+' − '+b+' + '+c; }
    else if(kieu==='++'){ a=rnd(10,M); b=rnd(5,M); c=rnd(5,M); t=a+' + '+b+' + '+c; }
    else if(kieu==='−−'){ a=rnd(30,M); b=rnd(5,a); c=rnd(1,a-b); t=a+' − '+b+' − '+c; }
    else if(kieu==='×:'){ a=rnd(2,9); b=rnd(2,9); c=pick([2,3,4,5,6,7,8,9].filter(function(x){ return (a*b)%x===0; })); t=a+' × '+b+' : '+c; }
    else { b=rnd(2,9); a=b*rnd(2,9); c=rnd(2,9); t=a+' : '+b+' × '+c; }
    if(okBuoc(t)) return t; }
  return '27 − 7 + 30';
}
/* có dấu ngoặc: a × (b + c), a : (b + c), (a + b) : c, a − (b + c), a + (b − c), (a − b) × c */
function btNgoac(){
  for(var g=0;g<500;g++){ var kieu=pick(['×(+','×(−',':(+',':(−','(+):','(−):','−(+','−(−','+(−']), a, b, c, t;
    if(kieu==='×(+'){ a=rnd(2,9); b=rnd(2,9); c=rnd(1,9); t=a+' × ('+b+' + '+c+')'; }
    else if(kieu==='×(−'){ a=rnd(2,9); b=rnd(5,15); c=rnd(1,b-1); t=a+' × ('+b+' − '+c+')'; }
    else if(kieu===':(+'){ b=rnd(2,7); c=rnd(1,7); a=(b+c)*rnd(2,9); t=a+' : ('+b+' + '+c+')'; }
    else if(kieu===':(−'){ b=rnd(10,20); c=rnd(1,b-2); a=(b-c)*rnd(2,9); t=a+' : ('+b+' − '+c+')'; }
    else if(kieu==='(+):'){ c=rnd(2,9); var s1=c*rnd(2,9); a=rnd(1,s1-1); b=s1-a; t='('+a+' + '+b+') : '+c; }
    else if(kieu==='(−):'){ c=rnd(2,9); var s2=c*rnd(2,9); b=rnd(1,20); a=s2+b; t='('+a+' − '+b+') : '+c; }
    else if(kieu==='−(+'){ b=rnd(5,30); c=rnd(1,9); a=rnd(b+c, b+c+40); t=a+' − ('+b+' + '+c+')'; }
    else if(kieu==='−(−'){ b=rnd(10,50); c=rnd(1,b-1); a=rnd(b, b+40); t=a+' − ('+b+' − '+c+')'; }
    else { b=rnd(10,50); c=rnd(1,b-1); a=rnd(5,40); t=a+' + ('+b+' − '+c+')'; }
    if(okBuoc(t) && okSo(tinhBoNgoac(t)) && tinhBoNgoac(t)!==tinhBT2(t)) return t; }
  return '45 : (5 + 4)';
}
/* n biểu thức có giá trị đôi một khác nhau, lấy từ bộ sinh gen */
function nhieuBT(gen, n){ var ds=[], g; for(g=0;g<300 && ds.length<n;g++){ var t=gen(); if(ds.every(function(x){ return tinhBT2(x)!==tinhBT2(t) && x!==t; })) ds.push(t); } return ds; }
function nhieuGiaTri(t){ var v=tinhBT2(t); return [[tinhTSP(t),'tinh-trai-sang-phai'],[tinhBoNgoac(t),'bo-ngoac'],[v+1,'nham-bang'],[v-1,'nham-bang'],[v+10,'nham-bang']]; }
function okEq(s){ var re=/(\d+) ([+−×:]) (\d+) = (\d+)/g, m, n=0, ok=true; while((m=re.exec(s))){ n++; if(tinhBT(m[1]+' '+m[2]+' '+m[3])!==+m[4]) ok=false; } return ok && n>=1; }

var BAI = {
 n: 38,
 title: 'Biểu Thức Số. Tính Giá Trị Của Biểu Thức Số',
 sub: 'Luyện thông minh: câu hỏi tự đổi theo bé — làm hết lượt để xem ngọn lửa!',
 goal: 10, soCau: 18, soCauToiDa: 24,
 loi: {'tinh-trai-sang-phai':'Làm từ trái sang phải khi có nhân, chia', 'nhan-chia-sau':'Làm nhân, chia sau cộng, trừ', 'bo-ngoac':'Bỏ dấu ngoặc', 'nham-gia-tri':'Nhầm giá trị với một số trong biểu thức', 'dem-sot-phep':'Đếm sót hoặc thừa thẻ'},
 muctieu: [
  {id:'MT1', ten:'Biểu thức và giá trị', muc:['Dãy nào là biểu thức; biểu thức cho đường gấp khúc ABC; 9 × 4.', '27 − 7 + 30; 60 + 50 − 20: tính từ trái sang phải; tổ ong.', 'Đường gấp khúc ba đoạn; đếm biểu thức; ba phép với số đến 500.']},
  {id:'MT2', ten:'Thứ tự không ngoặc', muc:['Can 10 l rót 3 ca 2 l: 10 − 2 × 3; bước đầu tiên là gì.', '24 + 5 × 6; 30 − 18 : 3; câu cá.', 'Chọn biểu thức cho bài toán; hai phép ưu tiên; đếm thẻ.']},
  {id:'MT3', ten:'Dấu ngoặc', muc:['Tai thỏ: 2 × (3 + 4); 45 : (5 + 4).', '8 × (11 − 6); 42 − (42 − 5); hai cách viết cùng giá trị.', 'Thuyền: biểu thức nào bằng 40; chọn biểu thức cho bài toán.']},
  {id:'MT4', ten:'Vận dụng và tính thuận tiện', muc:['Mai còn mấy chiếc bút; hai biểu thức, cái nào lớn hơn.', 'Lớn nhất trong bốn biểu thức; ghép 55 + 45 = 100 thuận tiện.', 'Bé nhất; 207 + 64 + 36; bạn An bỏ ngoặc: em thấy thế nào.']}
 ],
 topics: [
  /* D1 — Đường gấp khúc và biểu thức (Khám phá 1) */
  {name:'Đường gấp khúc và biểu thức', sec:'Khám phá 1 — Đường gấp khúc ABC có AB = BC = 5 cm: độ dài là 5 + 5 hoặc 5 × 2; thêm CD = 8 cm: 5 + 5 + 8 hoặc 5 × 2 + 8', mt:['MT1'], levels:3,
   muc:['Hai đoạn bằng nhau: chọn biểu thức tính độ dài.', 'Ba đoạn (hai đoạn bằng nhau, một đoạn khác): chọn biểu thức.', 'Ba đoạn khác nhau: tính độ dài (giá trị của biểu thức).'],
   make:function(lv){
    if(lv<=1){ var a=rnd(3,9), ch=shuffle([a+' + '+a, a+' × '+a, a+' − '+a, a+' : '+a]), dung=a+' + '+a, sai={}; ch.forEach(function(c,i){ if(c!==dung) sai[String(i)]='chon-sai-phep'; });
      return {type:'mcq', cot:1, _lv:1, _ds:[a,a], _dung:dung, q:gapKhuc([a,a])+'<div>Đường gấp khúc ABC có AB = BC = <b>'+a+' cm</b>. Biểu thức nào tính độ dài đường gấp khúc ABC?</div>', choices:ch, correct:ch.indexOf(dung), sai:sai, goiY:gy({'chon-sai-phep':'Độ dài đường gấp khúc bằng tổng độ dài các đoạn: '+a+' + '+a+'.'})}; }
    if(lv===2){ var a2=rnd(3,9), c2=rnd(3,12); while(c2===a2) c2=rnd(3,12); var dung2=a2+' × 2 + '+c2, ch2=shuffle([dung2, a2+' + 2 + '+c2, a2+' × 2 − '+c2, a2+' × '+c2+' + 2']), sai2={}; ch2.forEach(function(c,i){ if(c!==dung2) sai2[String(i)]='chon-sai-phep'; });
      return {type:'mcq', cot:1, _lv:2, _ds:[a2,a2,c2], _dung:dung2, q:gapKhuc([a2,a2,c2])+'<div>Đường gấp khúc ABCD có AB = BC = <b>'+a2+' cm</b>, CD = <b>'+c2+' cm</b>. Biểu thức nào tính độ dài đường gấp khúc ABCD?</div>', choices:ch2, correct:ch2.indexOf(dung2), sai:sai2, goiY:gy({'chon-sai-phep':'Hai đoạn '+a2+' cm là '+a2+' × 2, rồi cộng thêm '+c2+'.'})}; }
    var ds=[rnd(4,12), rnd(4,12), rnd(4,12)]; while(ds[0]===ds[1] || ds[1]===ds[2] || ds[0]===ds[2]) ds=[rnd(4,12), rnd(4,12), rnd(4,12)]; var T=ds[0]+ds[1]+ds[2];
    return {type:'num', _lv:3, _ds:ds, q:gapKhuc(ds)+'<div>Đường gấp khúc ABCD có AB = <b>'+ds[0]+' cm</b>, BC = <b>'+ds[1]+' cm</b>, CD = <b>'+ds[2]+' cm</b>. Độ dài đường gấp khúc ABCD là bao nhiêu xăng-ti-mét?</div>', ans:T, unit:'cm', sai:nhanSai([[ds[0]+ds[1],'thieu-buoc'],[ds[1]+ds[2],'thieu-buoc'],[T+1,'nham-bang'],[T-1,'nham-bang']], T), goiY:gy({'thieu-buoc':'Cộng đủ cả ba đoạn: '+ds[0]+' + '+ds[1]+' + '+ds[2]+'.'})};
  }, check:function(q){ var d=docGK(q.q); if(d.join()!==q._ds.join()) return false; var T=q._ds.reduce(function(x,y){ return x+y; },0);
    if(q._lv===3) return q.ans===T && new Set(q._ds).size===3;
    return kiemMCQ(q) && q.choices.length===4 && tinhBT2(q._dung)===T && q.choices.filter(function(c){ return tinhBT2(c)===T; }).length===1; }},

  /* D2 — Đâu là biểu thức (Khám phá 1, ví dụ) */
  {name:'Đâu là biểu thức', sec:'Khám phá 1 — Biểu thức là dãy số và dấu phép tính: 5 + 5; 24 − 7; 5 × 2; 8 : 2; 5 + 5 + 8; 18 : 3 − 2', mt:['MT1'], levels:3,
   muc:['Chọn thẻ là biểu thức trong bốn thẻ.', 'Đếm số thẻ là biểu thức.', 'Đếm thẻ là biểu thức có đúng hai phép tính.'],
   make:function(lv){
    var KHONG=['24 7','= 5','8 +','+ −','7 ×','× 3 =','9 6 2',': 8','=','15 −'], ds, dung, i;
    if(lv<=1){ dung=pick([btTrai(1), bt(rnd(2,9),NHAN,rnd(2,9)), bt(rnd(10,60),TRU,rnd(1,9)), bt(rnd(10,60),'+',rnd(1,9))]); ds=shuffle([dung].concat(shuffle(KHONG.slice()).slice(0,3))); var sai={}; ds.forEach(function(c,k){ if(c!==dung) sai[String(k)]='dem-sot-phep'; });
      return {type:'mcq', cot:1, _lv:1, _ds:ds, _dung:dung, q:theTinh(ds)+'<div>Thẻ nào ghi một <b>biểu thức</b>?</div>', choices:ds, correct:ds.indexOf(dung), sai:sai, goiY:gy({'dem-sot-phep':'Biểu thức gồm các số nối với nhau bằng dấu phép tính, không có dấu =.'})}; }
    var nBT = lv===2 ? rnd(2,3) : 4, cac=[], g;
    for(g=0;g<100 && cac.length<nBT;g++){ var t = lv===2 ? pick([btTrai(1), bt(rnd(2,9),NHAN,rnd(2,9)), bt(rnd(10,90),TRU,rnd(1,9)), btUuTien()]) : (Math.random()<0.5 ? btTrai(1) : (Math.random()<0.5 ? btUuTien() : pick([bt(rnd(2,9),NHAN,rnd(2,9)), bt(rnd(10,90),'+',rnd(1,9))]))); if(cac.indexOf(t)<0) cac.push(t); }
    ds=shuffle(cac.concat(shuffle(KHONG.slice()).slice(0,4-cac.length)));
    if(lv===2){ var dem=ds.filter(laBT).length; return {type:'num', _lv:2, _ds:ds, q:theTinh(ds)+'<div>Có bao nhiêu thẻ ghi một <b>biểu thức</b>?</div>', ans:dem, unit:'thẻ', sai:nhanSai([[dem+1,'dem-sot-phep'],[dem-1,'dem-sot-phep'],[4,'dem-sot-phep']], dem), goiY:gy()}; }
    var dem2=ds.filter(function(t){ return laBT(t) && soPhep(t)===2; }).length;
    return {type:'num', _lv:3, _ds:ds, q:theTinh(ds)+'<div>Có bao nhiêu thẻ ghi một biểu thức có <b>đúng hai phép tính</b>?</div>', ans:dem2, unit:'thẻ', sai:nhanSai([[dem2+1,'dem-sot-phep'],[dem2-1,'dem-sot-phep'],[ds.filter(laBT).length,'dem-sot-phep']], dem2), goiY:gy({'dem-sot-phep':'Bé đếm dấu phép tính trên từng thẻ: thẻ có đúng hai dấu mới tính.'})};
  }, check:function(q){ var ds=q._ds; if(docThe(q.q).join('|')!==ds.join('|') || ds.length!==4) return false;
    if(q._lv<=1) return kiemMCQ(q) && ds.filter(laBT).length===1 && laBT(q._dung);
    if(q._lv===2) return q.ans===ds.filter(laBT).length && q.ans>=2 && q.ans<=3;
    return q.ans===ds.filter(function(t){ return laBT(t) && soPhep(t)===2; }).length && ds.every(laBT); }},

  /* D3 — Tính từ trái sang phải (Hoạt động 1 của Khám phá 1) */
  {name:'Tính từ trái sang phải', sec:'Hoạt động 1 — Mẫu 45 − 15 + 10 = 30 + 10 = 40; 27 − 7 + 30; 60 + 50 − 20; 9 × 4', mt:['MT1'], levels:3,
   muc:['Hai phép cộng, trừ, số đến 60 (có mẫu).', 'Số đến 100; chỉ nhân chia (3 × 4 : 2).', 'Ba phép với số đến 500.'],
   make:function(lv){
    var t = lv<=2 ? btTrai(lv) : null, g;
    if(lv===3){ for(g=0;g<300;g++){ var a=rnd(100,500), b=rnd(20,300), c=rnd(20,300), d=rnd(10,200), k=pick(['+−−','−+−','+−+','−−+']), s=a; t=String(a); var ok=true; [b,c,d].forEach(function(v,i){ var op=k.charAt(i); s = op==='+' ? s+v : s-v; if(!okSo(s)) ok=false; t+=' '+(op==='+'?'+':TRU)+' '+v; }); if(ok) break; } }
    var T=tinhBT2(t), b1=t.split(' ').slice(0,3).join(' '), v1=tinhBT(b1), tk=t.split(' ');
    var sai=[[tinhBT(tk.slice(2).join(' ')),'nham-gia-tri'],[v1,'thieu-buoc'],[T+1,'nham-bang'],[T-1,'nham-bang'],[T+10,'nham-bang']];
    if(tk[3]==='+' || tk[3]==='−') sai.push([tk[3]==='+' ? v1-(+tk[4]) : v1+(+tk[4]),'chon-sai-phep']);
    return {type:'num', _lv:lv, _bt:t, q:(lv<=1 ? '<div class="text-base text-slate-500">Mẫu: 45 − 15 + 10 = 30 + 10 = 40.</div>' : '')+kyHieu('Tính giá trị của biểu thức', t+' ='+oHoi()), ans:T, sai:nhanSai(sai, T), goiY:gy({'thieu-buoc':'Bé làm phép đầu được '+v1+', rồi làm tiếp phép sau.', 'nham-gia-tri':'Bé làm từ trái sang phải: '+b1+' = '+v1+' trước.'})};
  }, check:function(q){ var t=q._bt, n=soPhep(t); if(!laBT(t) || !okBuoc(t) || /[×:]/.test(t) && /[+−]/.test(t)) return false; return q.ans===tinhBT2(t) && n===(q._lv===3 ? 3 : 2) && (q._lv<=1 ? !/[×:]/.test(t) : true); }},

  /* D4 — Tổ ong: nối biểu thức với giá trị (Hoạt động 2 của Khám phá 1) */
  {name:'Tổ ong: nối giá trị', sec:'Hoạt động 2 — Chọn số là giá trị của mỗi biểu thức: 32 + 8 − 18 = 22; 6 × 8 = 48; 80 − 40 + 10 = 50; 45 : 9 + 10 = 15', mt:['MT1'], levels:3,
   muc:['Một biểu thức, chọn tổ ong ghi đúng giá trị (bốn số).', 'Bốn biểu thức: biểu thức nào có giá trị bằng số đã cho.', 'Bốn biểu thức: có mấy biểu thức có giá trị bằng số đã cho.'],
   make:function(lv){
    if(lv<=1){ var t=pick([btTrai(1), btUuTien(), bt(rnd(2,9),NHAN,rnd(2,9))]), T=tinhBT2(t), ch=[T], g=0; while(ch.length<4 && g<200){ g++; var x=pick([tinhTSP(t), T+1, T-1, T+10, T-10, T+2]); if(okSo(x) && x>0 && ch.indexOf(x)<0) ch.push(x); } ch=shuffle(ch.map(String)); var sai={}; ch.forEach(function(c,i){ if(+c!==T) sai[String(i)]=(+c===tinhTSP(t) ? 'tinh-trai-sang-phai' : 'nham-bang'); });
      return {type:'mcq', cot:2, _lv:1, _bt:t, _dung:String(T), q:bieuThuc(t)+'<div>Tổ ong nào ghi đúng <b>giá trị</b> của biểu thức?</div>', choices:ch, correct:ch.indexOf(String(T)), sai:sai, goiY:gy()}; }
    var ds=nhieuBT(function(){ return pick([btTrai(1), btUuTien(), bt(rnd(2,9),NHAN,rnd(2,9)), bt(rnd(20,99),TRU,rnd(1,19))]); }, 4);
    if(lv===2){ var dung=pick(ds), T2=tinhBT2(dung), sai2={}; ds.forEach(function(c,i){ if(c!==dung) sai2[String(i)]='nham-bang'; });
      return {type:'mcq', cot:1, _lv:2, _ds:ds, _T:T2, _dung:dung, q:theTinh(ds)+'<div>Biểu thức nào có giá trị bằng <b class="text-2xl text-orange-600">'+T2+'</b>?</div>', choices:ds, correct:ds.indexOf(dung), sai:sai2, goiY:gy({'nham-bang':'Bé tính giá trị của từng thẻ rồi so với '+T2+'.'})}; }
    ds.sort(function(x,y){ return tinhBT2(y)-tinhBT2(x); }); var T3=tinhBT2(ds[0]), them=[], h; for(h=0;h<200 && them.length<1;h++){ var u=pick([btTrai(1), btUuTien()]); if(tinhBT2(u)===T3 && ds.indexOf(u)<0) them.push(u); }
    if(!them.length){ var kk = T3>=10 ? rnd(1,9) : 0; them.push((T3-kk)+' + '+kk); }
    var ds3=shuffle(ds.slice(0,3).concat(them)), dem=ds3.filter(function(x){ return tinhBT2(x)===T3; }).length;
    return {type:'num', _lv:3, _ds:ds3, _T:T3, q:theTinh(ds3)+'<div>Có bao nhiêu thẻ ghi biểu thức có giá trị bằng <b class="text-2xl text-orange-600">'+T3+'</b>?</div>', ans:dem, unit:'thẻ', sai:nhanSai([[dem-1,'dem-sot-phep'],[dem+1,'dem-sot-phep'],[4,'dem-sot-phep']], dem), goiY:gy()};
  }, check:function(q){
    if(q._lv<=1) return laBT(q._bt) && okBuoc(q._bt) && kiemMCQ(q) && q.choices.length===4 && +q._dung===tinhBT2(q._bt);
    var ds=q._ds; if(docThe(q.q).join('|')!==ds.join('|') || ds.length!==4 || !ds.every(function(t){ return laBT(t) && okBuoc(t); })) return false;
    var dem=ds.filter(function(t){ return tinhBT2(t)===q._T; }).length;
    if(q._lv===2) return kiemMCQ(q) && dem===1 && tinhBT2(q._dung)===q._T;
    return q.ans===dem && dem===2; }},

  /* D5 — Can nước: nhân chia trước (Khám phá 2) */
  {name:'Can nước: nhân chia trước', sec:'Khám phá 2 — Can 10 l rót sang 3 ca, mỗi ca 2 l: còn 10 − 2 × 3 = 10 − 6 = 4 l', mt:['MT2'], levels:3,
   muc:['Can 10 l, 3 ca 2 l: còn bao nhiêu lít.', 'Số khác: can 12–30 l, 2–5 ca.', 'Chọn biểu thức đúng cho bài toán.'],
   make:function(lv){
    var can, n, ca, g=0; do{ g++; can = lv<=1 ? 10 : rnd(12,30); n = lv<=1 ? 3 : rnd(2,5); ca = lv<=1 ? 2 : rnd(2,5); }while(g<200 && n*ca>=can);
    var t=can+' − '+ca+' × '+n, T=can-ca*n, vat=pick([['can','ca','lít','l'],['bình','cốc','mi-li-lít','ml']]);
    if(lv<=2) return {type:'num', _lv:lv, _bt:t, q:'<div>Một '+vat[0]+' có <b>'+can+' '+vat[3]+'</b> nước. Rót sang <b>'+n+' '+vat[1]+'</b>, mỗi '+vat[1]+' <b>'+ca+' '+vat[3]+'</b>. Trong '+vat[0]+' còn lại bao nhiêu '+vat[2]+' nước?</div><div class="text-base text-slate-500">Biểu thức: '+t+'</div>', ans:T, unit:vat[3], sai:nhanSai([[tinhTSP(t),'tinh-trai-sang-phai'],[ca*n,'thieu-buoc'],[can-ca,'thieu-buoc'],[T+1,'nham-bang']], T), goiY:gy({'thieu-buoc':'Bước 1: số nước đã rót là '+ca+' × '+n+'. Bước 2: lấy '+can+' trừ đi.'})};
    var ch=shuffle([t, can+' − '+ca+' − '+n, '('+can+' − '+ca+') × '+n, can+' : '+ca+' − '+n]), sai={}; ch.forEach(function(c,i){ if(c!==t) sai[String(i)]='chon-sai-phep'; });
    return {type:'mcq', cot:1, _lv:3, _bt:t, _dung:t, q:'<div>Một '+vat[0]+' có <b>'+can+' '+vat[3]+'</b> nước. Rót sang <b>'+n+' '+vat[1]+'</b>, mỗi '+vat[1]+' <b>'+ca+' '+vat[3]+'</b>. Biểu thức nào tính số '+vat[2]+' nước còn lại trong '+vat[0]+'?</div>', choices:ch, correct:ch.indexOf(t), sai:sai, goiY:gy({'chon-sai-phep':'Đã rót '+ca+' × '+n+' '+vat[3]+'; còn lại là '+can+' trừ đi số đó.'})};
  }, check:function(q){ var m=/^(\d+) − (\d+) × (\d+)$/.exec(q._bt); if(!m) return false; var T=(+m[1])-(+m[2])*(+m[3]); if(T<=0) return false; if(q._lv<=2) return q.ans===T; return kiemMCQ(q) && q.choices.length===4 && q._dung===q._bt; }},

  /* D6 — Thứ tự thực hiện (Hoạt động 1 của Khám phá 2) */
  {name:'Thứ tự thực hiện', sec:'Hoạt động 1 — Mẫu 24 + 8 : 2 = 24 + 4 = 28; 30 : 5 × 2; 24 + 5 × 6; 30 − 18 : 3', mt:['MT2'], levels:3,
   muc:['Bước đầu tiên bé làm phép tính nào (chọn).', 'Tính giá trị: 24 + 5 × 6; 30 − 18 : 3.', 'Hai phép nhân chia trong một biểu thức: 2 × 9 + 36 : 4.'],
   make:function(lv){
    var t=btUuTien(), tk=t.split(' ');
    if(lv<=1){ var uu = /[×:]/.test(tk[1]) ? tk.slice(0,3).join(' ') : tk.slice(2).join(' '), khac = uu===tk.slice(0,3).join(' ') ? tk.slice(2).join(' ') : tk.slice(0,3).join(' '), ch=shuffle([uu, khac]), sai={}; sai[String(ch.indexOf(khac))]='tinh-trai-sang-phai';
      return {type:'mcq', cot:1, _lv:1, _bt:t, _dung:uu, q:bieuThuc(t)+'<div>Bước đầu tiên, bé làm phép tính nào?</div>', choices:ch, correct:ch.indexOf(uu), sai:sai, goiY:gy()}; }
    if(lv===2){ var T=tinhBT2(t); return {type:'num', _lv:2, _bt:t, q:'<div class="text-base text-slate-500">Mẫu: 24 + 8 : 2 = 24 + 4 = 28.</div>'+kyHieu('Tính giá trị của biểu thức', t+' ='+oHoi()), ans:T, sai:nhanSai(nhieuGiaTri(t), T), goiY:gy()}; }
    var t3, g; for(g=0;g<300;g++){ var a=rnd(2,9), b=rnd(2,9), d=rnd(2,9), c=d*rnd(2,9), op=pick(['+','−']); t3=a+' × '+b+' '+op+' '+c+' : '+d; if(okBuoc(t3) && tinhTSP(t3)!==tinhBT2(t3)) break; }
    var T3=tinhBT2(t3); return {type:'num', _lv:3, _bt:t3, q:kyHieu('Tính giá trị của biểu thức', t3+' ='+oHoi()), ans:T3, sai:nhanSai(nhieuGiaTri(t3).concat([[tinhBT(t3.split(' ').slice(0,3).join(' ')),'thieu-buoc']]), T3), goiY:gy({'thieu-buoc':'Bé làm cả hai phép nhân, chia trước, rồi mới cộng hoặc trừ.'})};
  }, check:function(q){ var t=q._bt; if(!laBT(t) || !okBuoc(t) || !/[×:]/.test(t) || !/[+−]/.test(t)) return false;
    if(q._lv<=1){ var tk=t.split(' '), uu = /[×:]/.test(tk[1]) ? tk.slice(0,3).join(' ') : tk.slice(2).join(' '); return kiemMCQ(q) && q.choices.length===2 && q._dung===uu; }
    return q.ans===tinhBT2(t) && soPhep(t)===(q._lv===2 ? 2 : 3) && tinhTSP(t)!==tinhBT2(t); }},

  /* D7 — Câu cá (Hoạt động 2 của Khám phá 2) */
  {name:'Câu cá', sec:'Hoạt động 2 — Bốn biểu thức và bốn con cá 45, 46, 47, 48: 40 + 20 − 15 = 45; 56 − 2 × 5 = 46; 40 + 32 : 4 = 48; 67 − 15 − 5 = 47', mt:['MT2'], levels:3,
   muc:['Biểu thức nào có giá trị bằng số đã cho (bốn thẻ).', 'Con cá nào (bốn số) ứng với biểu thức đã cho.', 'Có mấy thẻ có giá trị bằng số đã cho.'],
   make:function(lv){
    var ds=nhieuBT(function(){ return Math.random()<0.6 ? btUuTien() : btTrai(1); }, 4);
    if(lv<=1){ var dung=pick(ds), T=tinhBT2(dung), sai={}; ds.forEach(function(c,i){ if(c!==dung) sai[String(i)]=(tinhTSP(c)===T ? 'tinh-trai-sang-phai' : 'nham-bang'); });
      return {type:'mcq', cot:1, _lv:1, _ds:ds, _T:T, _dung:dung, q:theTinh(ds)+'<div>Con cá ghi số <b class="text-2xl text-orange-600">'+T+'</b>. Biểu thức nào có giá trị bằng '+T+'?</div>', choices:ds, correct:ds.indexOf(dung), sai:sai, goiY:gy()}; }
    if(lv===2){ var t2=btUuTien(), T2=tinhBT2(t2), ch=[T2], g=0; while(ch.length<4 && g<200){ g++; var x=pick([tinhTSP(t2), T2+1, T2-1, T2+2, T2-2, T2+10]); if(okSo(x) && x>0 && ch.indexOf(x)<0) ch.push(x); } ch=shuffle(ch.map(String)); var sai2={}; ch.forEach(function(c,i){ if(+c!==T2) sai2[String(i)]=(+c===tinhTSP(t2) ? 'tinh-trai-sang-phai' : 'nham-bang'); });
      return {type:'mcq', cot:2, _lv:2, _bt:t2, _dung:String(T2), q:bieuThuc(t2)+'<div>Mỗi con cá ghi một số. Con cá nào ghi đúng giá trị của biểu thức?</div>', choices:ch, correct:ch.indexOf(String(T2)), sai:sai2, goiY:gy()}; }
    ds.sort(function(x,y){ return tinhBT2(y)-tinhBT2(x); }); var T3=tinhBT2(ds[0]), them=null, h; for(h=0;h<300 && !them;h++){ var u=Math.random()<0.6 ? btUuTien() : btTrai(1); if(tinhBT2(u)===T3 && ds.indexOf(u)<0) them=u; }
    if(!them){ var k = T3>=10 ? rnd(1,9) : 0; them=(T3-k)+' + '+k; }
    var ds3=shuffle(ds.slice(0,3).concat([them])), dem=ds3.filter(function(x){ return tinhBT2(x)===T3; }).length;
    return {type:'num', _lv:3, _ds:ds3, _T:T3, q:theTinh(ds3)+'<div>Con cá ghi số <b class="text-2xl text-orange-600">'+T3+'</b>. Có bao nhiêu thẻ ghi biểu thức có giá trị bằng '+T3+'?</div>', ans:dem, unit:'thẻ', sai:nhanSai([[dem-1,'dem-sot-phep'],[dem+1,'dem-sot-phep'],[4,'dem-sot-phep']], dem), goiY:gy()};
  }, check:function(q){
    if(q._lv===2) return laBT(q._bt) && okBuoc(q._bt) && kiemMCQ(q) && q.choices.length===4 && +q._dung===tinhBT2(q._bt);
    var ds=q._ds; if(docThe(q.q).join('|')!==ds.join('|') || ds.length!==4 || !ds.every(function(t){ return laBT(t) && okBuoc(t); })) return false;
    var dem=ds.filter(function(t){ return tinhBT2(t)===q._T; }).length;
    if(q._lv<=1) return kiemMCQ(q) && dem===1 && tinhBT2(q._dung)===q._T;
    return q.ans===dem && dem===2; }},

  /* D8 — Tai thỏ: dấu ngoặc (Khám phá 3) */
  {name:'Tai thỏ: dấu ngoặc', sec:'Khám phá 3 — 3 con thỏ trắng và 4 con thỏ nâu, mỗi con 2 tai: 2 × (3 + 4) = 2 × 7 = 14 tai', mt:['MT3'], levels:3,
   muc:['3 thỏ trắng, 4 thỏ nâu, mỗi con 2 tai: tất cả bao nhiêu tai.', 'Số khác; chọn cách viết khác có cùng giá trị với 2 × (3 + 4).', 'Chọn biểu thức đúng cho bài toán.'],
   make:function(lv){
    var k=pick([[2,'tai','con thỏ','con'],[4,'chân','con mèo','con'],[2,'bánh xe','chiếc xe đạp','chiếc'],[3,'bánh xe','chiếc xe xích lô','chiếc']]), m = lv<=1 ? 3 : rnd(2,9), n = lv<=1 ? 4 : rnd(2,9); while(m===n) n=rnd(2,9); var t=k[0]+' × ('+m+' + '+n+')', T=k[0]*(m+n);
    var de='<div>Có <b>'+m+' '+k[2]+'</b> màu trắng và <b>'+n+' '+k[2]+'</b> màu nâu. Mỗi '+k[3]+' có <b>'+k[0]+' '+k[1]+'</b>. ';
    if(lv<=1) return {type:'num', _lv:1, _bt:t, q:de+'Tất cả có bao nhiêu '+k[1]+'?</div><div class="text-base text-slate-500">Biểu thức: '+t+'</div>', ans:T, unit:k[1], sai:nhanSai([[tinhBoNgoac(t),'bo-ngoac'],[m+n,'thieu-buoc'],[k[0]*m,'thieu-buoc'],[T+1,'nham-bang']], T), goiY:gy({'thieu-buoc':'Bước 1: có tất cả '+m+' + '+n+' '+k[2]+'. Bước 2: nhân với '+k[0]+'.'})};
    if(lv===2){ var dung=k[0]+' × '+m+' + '+k[0]+' × '+n, ch=shuffle([dung, k[0]+' × '+m+' + '+n, k[0]+' + '+m+' × '+n, k[0]+' × '+m+' × '+n]), sai={}; if(ch.filter(function(c){ return tinhBT2(c)===T; }).length!==1) return BAI.topics[7].make(2); ch.forEach(function(c,i){ if(c!==dung) sai[String(i)]='chon-sai-phep'; });
      return {type:'mcq', cot:1, _lv:2, _bt:t, _dung:dung, q:de+'Số '+k[1]+' tính bằng biểu thức <b>'+t+'</b>. Biểu thức nào cũng có giá trị bằng '+t+'?</div>', choices:ch, correct:ch.indexOf(dung), sai:sai, goiY:gy({'chon-sai-phep':'Tính '+k[1]+' của '+k[2]+' trắng ('+k[0]+' × '+m+') rồi cộng '+k[1]+' của '+k[2]+' nâu ('+k[0]+' × '+n+').'})}; }
    var ch3=shuffle([t, k[0]+' × '+m+' + '+n, k[0]+' + '+m+' + '+n, k[0]+' × '+m+' − '+n]), sai3={}; if(ch3.filter(function(c){ return tinhBT2(c)===T; }).length!==1) return BAI.topics[7].make(3); ch3.forEach(function(c,i){ if(c!==t) sai3[String(i)]='chon-sai-phep'; });
    return {type:'mcq', cot:1, _lv:3, _bt:t, _dung:t, q:de+'Biểu thức nào tính số '+k[1]+' của tất cả các '+k[2]+'?</div>', choices:ch3, correct:ch3.indexOf(t), sai:sai3, goiY:gy({'chon-sai-phep':'Có tất cả ('+m+' + '+n+') '+k[2]+', mỗi '+k[3]+' '+k[0]+' '+k[1]+': '+t+'.'})};
  }, check:function(q){ var m=/^(\d+) × \((\d+) \+ (\d+)\)$/.exec(q._bt); if(!m) return false; var T=(+m[1])*((+m[2])+(+m[3])); if(T>999) return false;
    if(q._lv<=1) return q.ans===T; if(q._lv===2) return kiemMCQ(q) && q.choices.length===4 && tinhBT2(q._dung)===T && q.choices.filter(function(c){ return tinhBT2(c)===T; }).length===1;
    return kiemMCQ(q) && q.choices.length===4 && q._dung===q._bt; }},

  /* D9 — Tính trong ngoặc trước (Hoạt động 1, 2 của Khám phá 3) */
  {name:'Tính trong ngoặc trước', sec:'Hoạt động 1, 2 — Mẫu 30 : (20 − 14) = 30 : 6 = 5; 45 : (5 + 4); 8 × (11 − 6); 42 − (42 − 5); thuyền: (15 + 5) : 5 = 4', mt:['MT3'], levels:3,
   muc:['Tính giá trị biểu thức có ngoặc (có mẫu); bước đầu là gì.', '8 × (11 − 6); 42 − (42 − 5): tính giá trị.', 'Thuyền: biểu thức nào có giá trị bằng số đã cho (bốn thẻ có ngoặc).'],
   make:function(lv){
    var t=btNgoac(), T=tinhBT2(t), trong=/\(([^()]+)\)/.exec(t)[1];
    if(lv<=1){ if(Math.random()<0.5){ var khac, m2=/^(\d+) ([+−×:]) \((\d+) ([+−]) (\d+)\)$/.exec(t), m3=/^\((\d+) ([+−]) (\d+)\) ([+−×:]) (\d+)$/.exec(t); khac = m2 ? m2[1]+' '+m2[2]+' '+m2[3] : m3[3]+' '+m3[4]+' '+m3[5];
        if(khac===trong) khac=trong.split(' ').reverse().join(' ');
        var ch=shuffle([trong, khac]), sai={}; sai[String(ch.indexOf(khac))]='bo-ngoac';
        return {type:'mcq', cot:1, _lv:1, _bt:t, _dung:trong, q:bieuThuc(t)+'<div>Bước đầu tiên, bé làm phép tính nào?</div>', choices:ch, correct:ch.indexOf(trong), sai:sai, goiY:gy()}; }
      return {type:'num', _lv:1, _bt:t, q:'<div class="text-base text-slate-500">Mẫu: 30 : (20 − 14) = 30 : 6 = 5.</div>'+kyHieu('Tính giá trị của biểu thức', t+' ='+oHoi()), ans:T, sai:nhanSai(nhieuGiaTri(t).concat([[tinhBT(trong),'thieu-buoc']]), T), goiY:gy({'thieu-buoc':'Trong ngoặc được '+tinhBT(trong)+', bé làm tiếp phép còn lại.'})}; }
    if(lv===2) return {type:'num', _lv:2, _bt:t, q:kyHieu('Tính giá trị của biểu thức', t+' ='+oHoi()), ans:T, sai:nhanSai(nhieuGiaTri(t).concat([[tinhBT(trong),'thieu-buoc']]), T), goiY:gy({'thieu-buoc':'Trong ngoặc được '+tinhBT(trong)+', bé làm tiếp phép còn lại.'})};
    var ds=nhieuBT(btNgoac, 4), dung=pick(ds), T3=tinhBT2(dung), sai3={}; ds.forEach(function(c,i){ if(c!==dung) sai3[String(i)]=(tinhBoNgoac(c)===T3 ? 'bo-ngoac' : 'nham-bang'); });
    return {type:'mcq', cot:1, _lv:3, _ds:ds, _T:T3, _dung:dung, q:theTinh(ds)+'<div>Chiếc thuyền ghi số <b class="text-2xl text-orange-600">'+T3+'</b>. Biểu thức nào có giá trị bằng '+T3+'?</div>', choices:ds, correct:ds.indexOf(dung), sai:sai3, goiY:gy({'nham-bang':'Bé tính trong ngoặc trước ở từng thẻ, rồi so với '+T3+'.'})};
  }, check:function(q){
    if(q._lv===3){ var ds=q._ds; if(docThe(q.q).join('|')!==ds.join('|') || ds.length!==4 || !ds.every(function(t){ return /\(/.test(t) && okBuoc(t); })) return false; return kiemMCQ(q) && ds.filter(function(t){ return tinhBT2(t)===q._T; }).length===1 && tinhBT2(q._dung)===q._T; }
    var t=q._bt; if(!/\(/.test(t) || !okBuoc(t)) return false; var trong=/\(([^()]+)\)/.exec(t)[1];
    if(q.type==='mcq') return kiemMCQ(q) && q.choices.length===2 && q._dung===trong;
    return q.ans===tinhBT2(t) && tinhBoNgoac(t)!==tinhBT2(t); }},

  /* D10 — Lớn nhất, bé nhất (Luyện tập 1) */
  {name:'Lớn nhất, bé nhất', sec:'Luyện tập 1 — 5 × (6 − 2) = 20; 5 × 6 − 2 = 28; (16 + 24) : 4 = 10; 16 + 24 : 4 = 22: lớn nhất B, bé nhất C', mt:['MT4'], levels:3,
   muc:['Hai biểu thức giống nhau chỉ khác dấu ngoặc: cái nào lớn hơn.', 'Bốn biểu thức: biểu thức nào có giá trị lớn nhất.', 'Bốn biểu thức: bé nhất; có hai biểu thức bằng nhau để đánh lạc.'],
   make:function(lv){
    var capNgoac=function(){ for(var g=0;g<300;g++){ var t=btNgoac(), u=t.replace(/[()]/g,''); if(okBuoc(u) && tinhBT2(t)!==tinhBT2(u)) return [t,u]; } return ['5 × (6 − 2)','5 × 6 − 2']; };
    if(lv<=1){ var p=capNgoac(), lon = tinhBT2(p[0])>tinhBT2(p[1]) ? p[0] : p[1], ch=shuffle(p.slice()), sai={}; sai[String(1-ch.indexOf(lon))]='bo-ngoac';
      return {type:'mcq', cot:1, _lv:1, _ds:ch, _dung:lon, q:theTinh(ch)+'<div>Biểu thức nào có giá trị <b>lớn hơn</b>?</div>', choices:ch, correct:ch.indexOf(lon), sai:sai, goiY:gy({'bo-ngoac':'Hai biểu thức chỉ khác dấu ngoặc: bé tính trong ngoặc trước rồi so sánh.'})}; }
    var p1=capNgoac(), p2=capNgoac(), ds=p1.concat(p2), g=0; while(g<50 && new Set(ds.map(function(t){ return tinhBT2(t); })).size<(lv===2 ? 4 : 3)){ g++; p2=capNgoac(); ds=p1.concat(p2); }
    if(lv===3){ var vals=ds.map(tinhBT2), mn=Math.min.apply(null, vals); if(vals.filter(function(v){ return v===mn; }).length>1) return BAI.topics[9].make(3); }
    ds=shuffle(ds); var vs=ds.map(tinhBT2), muon = lv===2 ? Math.max.apply(null, vs) : Math.min.apply(null, vs), dung=ds[vs.indexOf(muon)], sai2={}; ds.forEach(function(c,i){ if(c!==dung) sai2[String(i)]='bo-ngoac'; });
    return {type:'mcq', cot:1, _lv:lv, _ds:ds, _dung:dung, q:theTinh(ds)+'<div>Biểu thức nào có giá trị <b>'+(lv===2 ? 'lớn nhất' : 'bé nhất')+'</b>?</div>', choices:ds, correct:ds.indexOf(dung), sai:sai2, goiY:gy({'bo-ngoac':'Bé tính giá trị từng thẻ (trong ngoặc trước, nhân chia trước) rồi so sánh.'})};
  }, check:function(q){ var ds=q._ds; if(docThe(q.q).join('|')!==ds.join('|') || !ds.every(function(t){ return laBT(t.replace(/[()]/g,'')) && okBuoc(t); })) return false; var vs=ds.map(tinhBT2);
    if(q._lv<=1) return ds.length===2 && kiemMCQ(q) && tinhBT2(q._dung)===Math.max.apply(null, vs) && vs[0]!==vs[1];
    var muon = q._lv===2 ? Math.max.apply(null, vs) : Math.min.apply(null, vs); return ds.length===4 && kiemMCQ(q) && tinhBT2(q._dung)===muon && vs.filter(function(v){ return v===muon; }).length===1; }},

  /* D11 — Bút màu, nước mắm, tính thuận tiện (Luyện tập 2, 3) */
  {name:'Bút màu và tính thuận tiện', sec:'Luyện tập 2, 3 — Mai có 4 hộp bút màu, cho Mi 2 hộp, mỗi hộp 10 chiếc: còn 10 × (4 − 2) = 20; ba thùng 64 l, 55 l, 45 l: 64 + (55 + 45) thuận tiện hơn', mt:['MT4'], levels:3,
   muc:['Mai còn bao nhiêu chiếc bút (biểu thức có ngoặc).', 'Ba thùng nước mắm: cách ghép nào thuận tiện hơn.', '207 + 64 + 36 tính thuận tiện; bạn An bỏ ngoặc: em thấy thế nào.'],
   make:function(lv){
    if(lv<=1){ var h=rnd(3,9), cho=rnd(1,h-1), moi=pick([10,5,6,8,12]), t=moi+' × ('+h+' − '+cho+')', T=moi*(h-cho), vat=pick([['hộp bút màu','chiếc bút màu','Mai','Mi'],['túi kẹo','chiếc kẹo','Nam','em'],['hộp bi','viên bi','Việt','bạn']]);
      return {type:'num', _lv:1, _bt:t, q:'<div>'+vat[2]+' có <b>'+h+' '+vat[0]+'</b>, mỗi '+vat[0].split(' ')[0]+' có <b>'+moi+' '+vat[1]+'</b>. '+vat[2]+' cho '+vat[3]+' <b>'+cho+' '+vat[0].split(' ')[0]+'</b>. '+vat[2]+' còn lại bao nhiêu '+vat[1]+'?</div><div class="text-base text-slate-500">Biểu thức: '+t+'</div>', ans:T, unit:vat[1].split(' ')[0], sai:nhanSai([[tinhBoNgoac(t),'bo-ngoac'],[h-cho,'thieu-buoc'],[moi*h,'thieu-buoc'],[T+moi,'nham-bang']], T), goiY:gy({'thieu-buoc':'Bước 1: còn '+h+' − '+cho+' '+vat[0].split(' ')[0]+'. Bước 2: nhân với '+moi+'.'})}; }
    if(lv===2){ var c=10*rnd(2,8), b=100-c, a=rnd(21,99), g=0; while(g<50 && (a%10===0 || (a+b)%10===0)){ g++; a=rnd(21,99); } var tron=a+' + ('+b+' + '+c+')', khac='('+a+' + '+b+') + '+c, ch=shuffle([tron, khac]), sai={}; sai[String(ch.indexOf(khac))]='nham-bang';
      return {type:'mcq', cot:1, _lv:2, _a:a, _b:b, _c:c, _dung:tron, q:'<div>Ba thùng nước mắm có <b>'+a+' l</b>, <b>'+b+' l</b> và <b>'+c+' l</b>. Cả ba thùng có '+a+' + '+b+' + '+c+' lít. Cách ghép nào tính <b>thuận tiện hơn</b>?</div>', choices:ch, correct:ch.indexOf(tron), sai:sai, goiY:gy({'nham-bang':b+' + '+c+' = 100 là số tròn trăm, cộng tiếp với '+a+' rất dễ.'})}; }
    if(Math.random()<0.5){ var tron=pick([100,100,200]), b3=rnd(11,tron-11), c3=tron-b3, a3=rnd(101,500), T3=a3+b3+c3; while(b3%10===0){ b3=rnd(11,tron-11); c3=tron-b3; T3=a3+b3+c3; } while(T3>999){ a3-=100; T3=a3+b3+c3; }
      return {type:'num', _lv:3, _bt:a3+' + '+b3+' + '+c3, q:kyHieu('Tính thuận tiện', a3+' + '+b3+' + '+c3+' ='+oHoi())+'<div class="text-base text-slate-500">Gợi ý: ghép hai số có tổng là số tròn chục hoặc tròn trăm.</div>', ans:T3, sai:nhanSai([[a3+b3,'thieu-buoc'],[T3+10,'nham-bang'],[T3-10,'nham-bang'],[T3+100,'nham-bang']], T3), goiY:gy({'thieu-buoc':'Ghép '+b3+' + '+c3+' = '+(b3+c3)+' rồi cộng với '+a3+'.'})}; }
    var t4, T4, x, trong, m2, m3, ngoai, g4;
    for(g4=0;g4<300;g4++){ t4=btNgoac(); T4=tinhBT2(t4); x=tinhBoNgoac(t4); trong=/\(([^()]+)\)/.exec(t4)[1]; m2=/^(\d+) ([+−×:]) \((\d+) ([+−]) (\d+)\)$/.exec(t4); m3=/^\((\d+) ([+−]) (\d+)\) ([+−×:]) (\d+)$/.exec(t4); ngoai = m2 ? m2[1]+' '+m2[2]+' '+m2[3] : m3[3]+' '+m3[4]+' '+m3[5]; if(okSo(x) && okSo(tinhBT(ngoai)) && x!==T4) break; }
    var buoc2 = m2 ? m2[1]+' '+m2[2]+' '+tinhBT(trong)+' = '+T4 : tinhBT(trong)+' '+m3[4]+' '+m3[5]+' = '+T4;
    var dungC='Không đồng ý, vì '+trong+' = '+tinhBT(trong)+' và '+buoc2, saiC='Đồng ý, vì '+ngoai+' = '+tinhBT(ngoai), ch4=shuffle([dungC, saiC]), sai4={}; sai4[String(ch4.indexOf(saiC))]='bo-ngoac';
    return {type:'mcq', cot:1, _lv:3, _bt:t4, _x:x, _dung:dungC, q:nguoi('boy','Bạn An')+'<div>Bạn An tính: «<b>'+t4+' = '+x+'</b>». Em thấy thế nào?</div>', choices:ch4, correct:ch4.indexOf(dungC), sai:sai4, goiY:gy()};
  }, check:function(q){
    if(q._lv<=1){ var m=/^(\d+) × \((\d+) − (\d+)\)$/.exec(q._bt); return !!m && q.ans===(+m[1])*((+m[2])-(+m[3])) && q.ans>0; }
    if(q._lv===2) return kiemMCQ(q) && q.choices.length===2 && q._b+q._c===100 && q._dung===q._a+' + ('+q._b+' + '+q._c+')' && tinhBT2(q.choices[0])===tinhBT2(q.choices[1]);
    if(q.type==='num'){ var p=q._bt.split(' + ').map(Number); return p.length===3 && q.ans===p[0]+p[1]+p[2] && (p[1]+p[2]===100 || p[1]+p[2]===200) && q.ans<=999; }
    return okBuoc(q._bt) && q._x===tinhBoNgoac(q._bt) && q._x!==tinhBT2(q._bt) && q.choices.length===2 && q.choices.every(okEq) && kiemMCQ(q) && /^Không đồng ý/.test(q._dung); }}
 ]
};
