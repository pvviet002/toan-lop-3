/* bai-66.js — Bài 66: Xem đồng hồ. Tháng, năm (Tập 2, Chủ đề 13). BÀI MỚI, Engine v2 — LUYỆN THÔNG MINH.
   Theo bảng phân tích sư phạm đã duyệt (phan-tich-su-pham/bai-66.md): 3 MỤC TIÊU (muctieu) × 10 DẠNG (topics), mỗi dạng 3 mức (Thông tư 27).
   Hình (mới, mã tự dựng): dongHoKim (mặt đồng hồ 60 vạch, data-gio/data-phut), dongHoSo (data-so), banTay (bàn tay nắm), lichThang (lịch tháng, data-lich, data-d/data-w).
   Lịch do mã dựng với ngày 1 là thứ bất kỳ; check() tính lại thứ trong tuần từ ngày 1. QUY TẮC: nối chuỗi, KHÔNG backtick, KHÔNG template literal. */

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

function pad2(n){ return n<10 ? '0'+n : String(n); }
function txtGio(h, m){ return h+' giờ'+(m>0 ? ' '+m+' phút' : ''); }
var TH=['thứ Hai','thứ Ba','thứ Tư','thứ Năm','thứ Sáu','thứ Bảy','Chủ nhật'];
var NGAY_THANG=[31,28,31,30,31,30,31,31,30,31,30,31];
/* ---- Mặt đồng hồ 60 vạch: kim giờ ngắn (đỏ), kim phút dài (xanh) ---- */
function dongHoKim(h, m){
 var o=svgX(220,220,220).replace('<svg ','<svg data-gio="'+h+'" data-phut="'+m+'" '), i, a, c, s, x1, y1, x2, y2;
 o+='<circle cx="110" cy="110" r="106" fill="#fff" stroke="'+HM.vangDam+'" stroke-width="5"/>';
 for(i=0;i<60;i++){ a=i/60*2*Math.PI-Math.PI/2; c=Math.cos(a); s=Math.sin(a); var r1 = i%5===0 ? 64 : 70, w = i%5===0 ? 3 : 1.5;
  o+='<line x1="'+(110+r1*c).toFixed(1)+'" y1="'+(110+r1*s).toFixed(1)+'" x2="'+(110+78*c).toFixed(1)+'" y2="'+(110+78*s).toFixed(1)+'" stroke="'+HM.chu+'" stroke-width="'+w+'" stroke-linecap="round"/>'; }
 for(i=1;i<=12;i++){ a=i/12*2*Math.PI-Math.PI/2; o+='<text x="'+(110+91*Math.cos(a)).toFixed(1)+'" y="'+(110+91*Math.sin(a)+6.5).toFixed(1)+'" text-anchor="middle" font-size="18" '+HFONT+' fill="'+HM.chu+'">'+i+'</text>'; }
 var ha=(((h%12)+m/60)/12)*2*Math.PI-Math.PI/2, ma=(m/60)*2*Math.PI-Math.PI/2;
 o+='<line x1="110" y1="110" x2="'+(110+42*Math.cos(ha)).toFixed(1)+'" y2="'+(110+42*Math.sin(ha)).toFixed(1)+'" stroke="'+HM.doDam+'" stroke-width="8" stroke-linecap="round"/>';
 o+='<line x1="110" y1="110" x2="'+(110+68*Math.cos(ma)).toFixed(1)+'" y2="'+(110+68*Math.sin(ma)).toFixed(1)+'" stroke="'+HM.troiDam+'" stroke-width="5" stroke-linecap="round"/>';
 o+='<circle cx="110" cy="110" r="6" fill="'+HM.chu+'"/>';
 return '<div class="flex justify-center my-2">'+o+'</svg></div>';
}
function docDongHo(html){ var a=/data-gio="(\d+)" data-phut="(\d+)"/.exec(html); return a ? {h:+a[1], m:+a[2]} : null; }
/* ---- Đồng hồ số ---- */
function dongHoSo(hh, mm){
 var o=svgX(200,84,200).replace('<svg ','<svg data-so="'+pad2(hh)+':'+pad2(mm)+'" ');
 o+='<rect x="2" y="4" width="196" height="76" rx="12" fill="'+HM.chu+'"/><text x="100" y="58" text-anchor="middle" font-size="46" '+HFONT+' fill="'+HM.la+'">'+pad2(hh)+':'+pad2(mm)+'</text>';
 return '<div class="flex justify-center my-2">'+o+'</svg></div>';
}
function docSo(html){ var a=/data-so="(\d\d):(\d\d)"/.exec(html); return a ? {h:+a[1], m:+a[2]} : null; }
/* ---- Bàn tay nắm: tháng ở đốt ngón tay có 31 ngày, ở khe có 30 ngày ---- */
function banTay(){
 var o=svgX(300,134,300), i, x, nho, thang;
 for(i=0;i<12;i++){ thang=i+1; var hang = i<7 ? 0 : 1, vt = i<7 ? i : i-7; nho = (vt%2===0); x=26+vt*42; var y = (hang===0 ? 0 : 62) + (nho ? 24 : 52);
  o+='<circle cx="'+x+'" cy="'+y+'" r="18" fill="'+(nho ? HM.vang : '#fff')+'" stroke="'+(nho ? HM.vangDam : HM.day)+'" stroke-width="3"/>'+chuSo(x, y, thang, 17); }
 return '<div class="flex justify-center my-2">'+o+'</svg></div>';
}
/* ---- Lịch tháng: N ngày, ngày 1 là thứ t0 (0 = thứ Hai … 6 = Chủ nhật); tô vàng các ngày trong hl = [d1, d2] ---- */
function lichThang(N, t0, hl){
 var o=svgX(290,260,290).replace('<svg ','<svg data-lich="'+N+':'+t0+'" '), c, d, row, col, x, y, tong=Math.ceil((t0+N)/7);
 for(c=0;c<7;c++) o+='<text x="'+(5+c*40+20)+'" y="20" text-anchor="middle" font-size="16" '+HFONT+' fill="currentColor">'+(c===6 ? 'CN' : 'T'+(c+2))+'</text>';
 for(d=1; d<=N; d++){ col=(t0+d-1)%7; row=Math.floor((t0+d-1)/7); x=5+col*40; y=30+row*36; var dk = hl && d>=hl[0] && d<=hl[1];
  o+='<g data-d="'+d+'" data-w="'+col+'"><rect x="'+(x+1)+'" y="'+(y+1)+'" width="38" height="34" rx="6" fill="'+(dk ? HM.vang : 'none')+'" stroke="'+(dk ? HM.vangDam : (col===6 ? HM.do : HM.day))+'" stroke-width="2"/><text x="'+(x+20)+'" y="'+(y+24)+'" text-anchor="middle" font-size="16" '+HFONT+' fill="'+(dk ? HM.chu : 'currentColor')+'">'+d+'</text></g>'; }
 return '<div class="flex justify-center my-2">'+o.replace('height="260" viewBox="0 0 290 260"','height="'+Math.round((36+tong*36)*1)+'" viewBox="0 0 290 '+(36+tong*36)+'"')+'</svg></div>';
}
function docLich(html){ var a=/data-lich="(\d+):(\d)"/.exec(html); if(!a) return null; var re=/data-d="(\d+)" data-w="(\d)"/g, m, cells=[]; while((m=re.exec(html))) cells.push([+m[1], +m[2]]); return {N:+a[1], t:+a[2], cells:cells}; }
function lichDung(L){ var N=L.N, t0=L.t; if(L.cells.length!==N) return false; return L.cells.every(function(c,i){ return c[0]===i+1 && c[1]===(t0+i)%7; }); }
function thuCua(t0, d){ return (t0+d-1)%7; }
function chonThu(dung, so){ var out=[dung], k=[1,6,2,5,3,4]; k.forEach(function(x){ var v=(dung+x)%7; if(out.length<so && out.indexOf(v)<0) out.push(v); }); return shuffle(out); }
var GOI={'nham-kim':'Kim ngắn là kim giờ, kim dài là kim phút. Bé nhìn kim ngắn để biết giờ, kim dài để biết phút.',
  'doc-phut-theo-so':'Mỗi vạch nhỏ là 1 phút. Kim dài chỉ số 3 là 15 phút, chỉ số 6 là 30 phút. Bé đếm từng vạch từ số 12.',
  'nham-gio':'Kim ngắn đi qua số nào rồi thì giờ là số đó (chưa tới số kế tiếp thì chưa tới giờ kế tiếp).',
  'nham-buoi':'Buổi sáng là các giờ trước 12 giờ trưa. Buổi chiều là các giờ sau 12 giờ trưa.',
  'gio-chieu':'Giờ buổi chiều theo cách đọc 24 giờ = số giờ trên đồng hồ cộng 12. Ví dụ 3 giờ chiều là 15 giờ.',
  'doc-sai-so':'Đồng hồ số: hai số bên trái là giờ, hai số bên phải là phút. 16:22 đọc là 16 giờ 22 phút.',
  'doi-don-vi':'1 giờ = 60 phút. 1 ngày = 24 giờ. Bé đọc kỹ đơn vị trong phép tính.',
  'nham-bang':'Bé tính lại từng bước cho đúng nhé.',
  'nham-so-ngay':'Tháng 1, 3, 5, 7, 8, 10, 12 có 31 ngày. Tháng 4, 6, 9, 11 có 30 ngày. Tháng 2 có 28 hoặc 29 ngày.',
  'nham-thu':'Mỗi tuần có 7 ngày: sau ngày thứ Bảy là Chủ nhật, rồi lại thứ Hai. Bé nhìn cột của ngày đó trong lịch.',
  'dem-sot-ngay':'Bé đếm cả ngày đầu và ngày cuối: từ ngày 29 đến hết ngày 31 là 3 ngày.'};
function gy(){ var o={}, k; for(k in GOI) o[k]=GOI[k]; return o; }

var BAI = {
 n: 66,
 title: 'Xem Đồng Hồ. Tháng, Năm',
 sub: 'Luyện thông minh: câu hỏi tự đổi theo bé — làm hết lượt để xem ngọn lửa!',
 goal: 10, soCau: 18, soCauToiDa: 24,
 loi: {'nham-kim':'Nhầm kim giờ, kim phút', 'doc-phut-theo-so':'Đọc phút theo số trên mặt đồng hồ', 'nham-gio':'Nhầm số giờ', 'nham-buoi':'Nhầm buổi sáng, buổi chiều', 'gio-chieu':'Quên cộng 12 giờ buổi chiều', 'doc-sai-so':'Đọc đồng hồ số sai', 'doi-don-vi':'Nhầm đơn vị thời gian', 'nham-bang':'Tính sai', 'nham-so-ngay':'Nhầm số ngày trong tháng', 'nham-thu':'Nhầm thứ trong tuần', 'dem-sot-ngay':'Đếm sót ngày'},
 muctieu: [
  {id:'MT1', ten:'Đọc giờ, phút (đồng hồ kim, đồng hồ số)', muc:['Giờ đúng, giờ rưỡi; buổi sáng; đồng hồ kim ra đồng hồ số buổi sáng.', 'Giờ có số phút chia hết cho 5; buổi chiều đọc theo 24 giờ; đồng hồ số có số 0 đứng đầu.', 'Số phút bất kỳ (5 giờ 43 phút); hai buổi; đồng hồ số buổi chiều, các đáp án gần nhau.']},
  {id:'MT2', ten:'Tính với đơn vị thời gian', muc:['10 phút + 25 phút.', '24 giờ − 8 giờ; 24 giờ × 2.', '60 phút : 6; phép tính nhiều bước.']},
  {id:'MT3', ten:'Tháng, năm, lịch', muc:['Tháng có 30 hay 31 ngày; Chủ nhật đầu tiên; ngày cuối tháng; đếm ngày trong một tháng.', 'Tháng 2; Chủ nhật cuối; ngày đầu tháng sau; đếm ngày qua tháng.', 'Cả năm có mấy tháng 31 ngày; thứ hai tuần ba; tháng 30 ngày; qua tháng 2.']}
 ],
 topics: [
  /* D1 — Đọc giờ trên đồng hồ kim */
  {name:'Đọc giờ trên đồng hồ kim', sec:'Khám phá, bài 1 — 3 giờ 5 phút; 5 giờ 43 phút: đồng hồ có 60 vạch phút', mt:['MT1'], levels:3,
   muc:['Giờ đúng, giờ rưỡi.', 'Số phút chia hết cho 5.', 'Số phút bất kỳ (5 giờ 43 phút).'],
   make:function(lv){
    var m = lv<=1 ? pick([0,30]) : (lv===2 ? pick([5,10,15,20,25,35,40,45,50,55]) : pick([1,2,3,4,6,7,8,9,11,12,13,14,16,17,18,19,21,22,23,24,26,27,28,29,31,32,33,34,36,37,38,39,41,42,43,44,46,47,48,49,51,52,53,54,56,57,58,59])), h=rnd(1,12);
    var D=txtGio(h,m), cand=[], hs=(Math.round(m/5)%12)||12;
    cand.push([txtGio(hs, (h%12)*5), 'nham-kim']); cand.push([txtGio((h%12)+1, m), 'nham-gio']); cand.push([txtGio(((h+10)%12)+1, m), 'nham-gio']);
    if(m>0) cand.push([txtGio(h, Math.round(m/5)), 'doc-phut-theo-so']); cand.push([txtGio(h, (m+5)%60), 'doc-phut-theo-so']); cand.push([txtGio(h, m===0 ? 30 : 0), 'nham-kim']);
    var mm=lapMCQ(D, cand);
    return {type:'mcq', cot:2, _lv:lv, _dung:mm._dung, q:dongHoKim(h,m)+'<div>Kim ngắn (màu đỏ) chỉ giờ, kim dài (màu xanh) chỉ phút.</div><div>Đồng hồ chỉ mấy giờ?</div>', choices:mm.choices, correct:mm.correct, sai:mm.sai, goiY:gy()};
  }, check:function(q){ var c=docDongHo(q.q); if(!c || !kiemMCQ(q) || q.choices.length!==4 || c.h<1 || c.h>12 || c.m<0 || c.m>59) return false; if(q._dung!==txtGio(c.h,c.m)) return false;
    if(q._lv<=1) return c.m===0 || c.m===30; if(q._lv===2) return c.m%5===0 && c.m!==0 && c.m!==30; return c.m%5!==0; }},

  /* D2 — Buổi sáng, buổi chiều */
  {name:'Buổi sáng, buổi chiều', sec:'Bài 1 — Nam học Toán lúc ? giờ ? phút sáng; Việt học Giáo dục thể chất lúc ? giờ ? phút chiều', mt:['MT1'], levels:3,
   muc:['Đọc giờ buổi sáng.', 'Đọc giờ buổi chiều theo cách 24 giờ.', 'Hai bạn, hai buổi: ai đến muộn hơn mấy giờ.'],
   make:function(lv){
    var h, m, D, cand, mm;
    if(lv<=1){ h=rnd(6,11); m=pick([0,10,15,20,25,30,40,45,50]); D=txtGio(h,m)+' sáng';
     cand=[[txtGio(h,m)+' chiều','nham-buoi'],[txtGio((h%12)+1,m)+' sáng','nham-gio'],[txtGio(h,(m+5)%60)+' sáng','doc-phut-theo-so'],[txtGio(h,Math.round(m/5) || 6)+' sáng','doc-phut-theo-so']]; mm=lapMCQ(D,cand);
     return {type:'mcq', cot:2, _lv:1, _dung:mm._dung, q:dongHoKim(h,m)+'<div>Nam học Toán lúc đồng hồ chỉ như hình, vào <b>buổi sáng</b>. Nam học Toán lúc mấy giờ?</div>', choices:mm.choices, correct:mm.correct, sai:mm.sai, goiY:gy()}; }
    if(lv===2){ h=rnd(1,9); m=pick([5,10,15,20,25,30,35,40,45,50,55,0]); D=txtGio(h+12,m);
     cand=[[txtGio(h,m),'gio-chieu'],[txtGio(h+10,m),'gio-chieu'],[txtGio(h+2,m),'gio-chieu'],[txtGio(h+11,m),'gio-chieu'],[txtGio(h+12,(m+5)%60),'doc-phut-theo-so']]; mm=lapMCQ(D,cand);
     return {type:'mcq', cot:2, _lv:2, _dung:mm._dung, q:dongHoKim(h,m)+'<div>Việt học thể dục lúc đồng hồ chỉ như hình, vào <b>buổi chiều</b>. Nói theo cách đọc 24 giờ, Việt học lúc mấy giờ?</div>', choices:mm.choices, correct:mm.correct, sai:mm.sai, goiY:gy()}; }
    var n=rnd(6,11), hh=rnd(1,9), ans=hh+12-n;
    return {type:'num', _lv:3, _n:n, q:dongHoKim(hh,0)+'<div>Nam đến lớp lúc <b>'+n+' giờ</b> sáng. Việt đến lớp lúc đồng hồ chỉ như hình, vào <b>buổi chiều</b>. Việt đến lớp muộn hơn Nam bao nhiêu giờ?</div>', ans:ans, sai:nhanSai([[hh-n>0 ? hh-n : n-hh,'gio-chieu'],[hh+12,'gio-chieu'],[ans+1,'nham-bang'],[ans-1,'nham-bang'],[12-n+hh+1,'nham-bang']], ans), goiY:gy()};
  }, check:function(q){ var c=docDongHo(q.q); if(!c) return false;
    if(q._lv<=1){ return kiemMCQ(q) && q.choices.length===4 && c.h>=6 && c.h<=11 && q._dung===txtGio(c.h,c.m)+' sáng' && q.q.indexOf('buổi sáng')>=0; }
    if(q._lv===2) return kiemMCQ(q) && q.choices.length===4 && c.h>=1 && c.h<=9 && q._dung===txtGio(c.h+12,c.m) && q.q.indexOf('buổi chiều')>=0;
    return c.m===0 && c.h>=1 && c.h<=9 && q._n>=6 && q._n<=11 && q.ans===c.h+12-q._n && q.ans>=2 && q.q.indexOf('<b>'+q._n+' giờ</b>')>=0; }},

  /* D3 — Đồng hồ kim nối đồng hồ số */
  {name:'Đồng hồ kim nối đồng hồ số', sec:'Bài 2 — đồng hồ kim ↔ đồng hồ số buổi chiều: 13:16, 14:55, 16:56, 18:20 (giờ chiều = giờ + 12)', mt:['MT1'], levels:3,
   muc:['Đồng hồ kim buổi sáng: chọn đồng hồ số.', 'Đồng hồ kim buổi chiều: chọn đồng hồ số (giờ cộng 12).', 'Buổi chiều, bốn đồng hồ số gần nhau.'],
   make:function(lv){
    var h, m, hs, D, cand, mm, ds=function(a,b){ return pad2(a)+':'+pad2(b); };
    if(lv<=1){ h=rnd(6,11); m=rnd(1,11)*5; hs=h; } else { h=rnd(1,8); m=rnd(1,11)*5; hs=h+12; }
    D=ds(hs,m); cand=[];
    cand.push([ds(m,hs>=24?0:hs),'doc-sai-so']);
    if(lv<=1){ cand.push([ds(h+12,m),'gio-chieu']); cand.push([ds(h+1,m),'nham-gio']); cand.push([ds(h,(m+5)%60),'doc-phut-theo-so']); cand.push([ds(h-1,m),'nham-gio']); }
    else if(lv===2){ cand.push([ds(h,m),'gio-chieu']); cand.push([ds(h+10,m),'gio-chieu']); cand.push([ds(hs+1,m),'nham-gio']); cand.push([ds(hs,(m+5)%60),'doc-phut-theo-so']); }
    else { cand=[[ds(hs+1,m),'nham-gio'],[ds(hs-1,m),'nham-gio'],[ds(hs,(m+5)%60),'doc-phut-theo-so'],[ds(hs,(m+55)%60),'doc-phut-theo-so'],[ds(h,m),'gio-chieu']]; if(m<=23) cand.push([ds(m,hs),'doc-sai-so']); }
    cand=cand.filter(function(p){ var a=+p[0].slice(0,2); return a>=0 && a<=23 && (lv<=1 || a>=13 || lv===2); }); if(lv>=3) cand=cand.filter(function(p){ return +p[0].slice(0,2)>=13; });
    mm=lapMCQ(D,cand);
    return {type:'mcq', cot:2, _lv:lv, _dung:mm._dung, q:dongHoKim(h,m)+'<div>Đồng hồ kim chỉ như hình'+(lv<=1 ? ' (buổi sáng)' : ' (buổi chiều)')+'. Đồng hồ số nào chỉ cùng thời gian?</div>', choices:mm.choices, correct:mm.correct, sai:mm.sai, goiY:gy()};
  }, check:function(q){ var c=docDongHo(q.q); if(!c || !kiemMCQ(q) || q.choices.length!==4) return false; var hs = q._lv<=1 ? c.h : c.h+12; if(c.m%5!==0 || q._dung!==pad2(hs)+':'+pad2(c.m)) return false;
    if(!q.choices.every(function(s){ return /^\d\d:\d\d$/.test(s) && +s.slice(0,2)<=23 && +s.slice(3)<=59; })) return false;
    if(q._lv<=1) return c.h>=6 && c.h<=11; if(q._lv===2) return c.h>=1 && c.h<=8; return c.h>=1 && c.h<=8 && q.choices.every(function(s){ return +s.slice(0,2)>=13; }); }},

  /* D4 — Đồng hồ số: đọc hai cách */
  {name:'Đồng hồ số: đọc giờ, phút', sec:'Bài 3 — mẹ làm bánh lúc 16:22 hay 22:16; bố hút bụi lúc 02:10 hay 10:02', mt:['MT1'], levels:3,
   muc:['Đồng hồ số 16:22: số phút từ 25 trở lên.', 'Đồng hồ số 02:10: số 0 đứng đầu.', 'Đồng hồ số buổi chiều, đọc đảo hai số cũng được.'],
   make:function(lv){
    var H, M;
    if(lv<=1){ H=rnd(13,23); M=rnd(25,59); } else if(lv===2){ H=rnd(1,9); M=rnd(10,24); } else { H=rnd(13,23); M=rnd(10,24); }
    var D=txtGio(H,M), cand=[[txtGio(M,H),'doc-sai-so'],[txtGio(H,(M+10)%60),'doc-sai-so'],[txtGio(H+1,M),'doc-sai-so'],[txtGio(H-1,M),'doc-sai-so'],[txtGio(H,M+1),'doc-sai-so']], mm=lapMCQ(D,cand);
    return {type:'mcq', cot:2, _lv:lv, _dung:mm._dung, q:dongHoSo(H,M)+'<div>Đồng hồ số chỉ như hình. Đồng hồ chỉ mấy giờ mấy phút?</div>', choices:mm.choices, correct:mm.correct, sai:mm.sai, goiY:gy()};
  }, check:function(q){ var c=docSo(q.q); if(!c || !kiemMCQ(q) || q.choices.length!==4 || q._dung!==txtGio(c.h,c.m)) return false; if(q._lv<=1) return c.h>=13 && c.h<=23 && c.m>=25 && c.m<=59; if(q._lv===2) return c.h>=1 && c.h<=9 && c.m>=10 && c.m<=24; return c.h>=13 && c.h<=23 && c.m>=10 && c.m<=24; }},

  /* D5 — Tính với đơn vị thời gian */
  {name:'Tính với đơn vị thời gian', sec:'Bài 4 — 10 phút + 25 phút = 35 phút; 24 giờ − 8 giờ = 16 giờ; 24 giờ × 2 = 48 giờ; 60 phút : 6 = 10 phút', mt:['MT2'], levels:3,
   muc:['Cộng, trừ số phút (10 phút + 25 phút).', 'Trừ, nhân số giờ (24 giờ − 8 giờ; 24 giờ × 2).', 'Chia số phút (60 phút : 6); phép tính nhiều bước.'],
   make:function(lv){
    var ex, ans, dv, sai, k, a, b;
    if(lv<=1){ if(Math.random()<0.6){ a=rnd(1,8)*5; b=rnd(1,8)*5; ex=a+' phút + '+b+' phút'; ans=a+b; } else { a=rnd(4,12)*5; b=rnd(1,a/5-1)*5; ex=a+' phút − '+b+' phút'; ans=a-b; } dv='phút'; }
    else if(lv===2){ if(Math.random()<0.5){ a=rnd(2,16); ex='24 giờ − '+a+' giờ'; ans=24-a; } else { a=rnd(2,5); ex='24 giờ × '+a; ans=24*a; } dv='giờ'; }
    else { if(Math.random()<0.5){ k=pick([2,3,4,5,6,10,12,15]); ex='60 phút : '+k; ans=60/k; dv='phút'; } else { var ks=[2,3,4,6], g; for(g=0; g<100; g++){ a=rnd(1,16); k=pick(ks); if((24-a)%k===0 && (24-a)/k>=1) break; } ex='(24 giờ − '+a+' giờ) : '+k; ans=(24-a)/k; dv='giờ'; } }
    return {type:'num', _lv:lv, _ex:ex, q:'<div>Tính:</div>'+bieuThucTo(ex+' = ? '+dv), ans:ans, sai:nhanSai([[ans+5,'nham-bang'],[ans-1,'nham-bang'],[ans+1,'nham-bang'],[ans*60,'doi-don-vi'],[ans+10,'nham-bang']], ans), goiY:gy()};
  }, check:function(q){ var ex=q._ex, m=/^(\d+) (phút|giờ) ([+−×:]) (\d+)(?: (phút|giờ))?$/.exec(ex), t;
    if(m){ var a=+m[1], b=+m[4], op=m[3]; t = op==='+' ? a+b : (op==='−' ? a-b : (op==='×' ? a*b : a/b)); if(op==='×' && m[2]!=='giờ') return false; if(op===':' && b===0) return false; if(!Number.isInteger(t) || t<=0 || q.ans!==t || q.q.indexOf(ex)<0) return false;
      if(q._lv<=1) return m[2]==='phút' && (op==='+' || op==='−') && a%5===0 && b%5===0; if(q._lv===2) return a===24 && m[2]==='giờ' && (op==='−' || op==='×'); return m[2]==='phút' && op===':' && a===60; }
    var m2=/^\(24 giờ − (\d+) giờ\) : (\d+)$/.exec(ex); if(!m2) return false; t=(24-m2[1])/m2[2]; return q._lv>=3 && Number.isInteger(t) && t>=1 && q.ans===t && q.q.indexOf(ex)>=0; }},

  /* D6 — Tháng có bao nhiêu ngày */
  {name:'Tháng có bao nhiêu ngày', sec:'Bài 5 — một năm có 12 tháng; tháng có 31 ngày: 1, 3, 5, 7, 8, 10, 12; tháng có 30 ngày: 4, 6, 9, 11; tháng 2 có 28 hoặc 29 ngày', mt:['MT3'], levels:3,
   muc:['Tháng 30 ngày hay 31 ngày.', 'Tháng 2 có bao nhiêu ngày.', 'Cả năm có mấy tháng có 31 ngày, 30 ngày.'],
   make:function(lv){
    var goi='<div>Nắm bàn tay: tháng ở <b>đốt ngón tay</b> (màu vàng) có 31 ngày, tháng ở <b>khe</b> (màu trắng) có 30 ngày; tháng 2 có 28 hoặc 29 ngày.</div>';
    if(lv<=1){ var t=pick([1,3,4,5,6,7,8,9,10,11,12]), N=NGAY_THANG[t-1], ch=['28 ngày','29 ngày','30 ngày','31 ngày'], D=N+' ngày', sai={}; ch.forEach(function(c,i){ if(c!==D) sai[String(i)]='nham-so-ngay'; });
     return {type:'mcq', cot:2, _lv:1, _t:t, _dung:D, q:banTay()+goi+'<div>Tháng <b>'+t+'</b> có bao nhiêu ngày?</div>', choices:ch, correct:ch.indexOf(D), sai:sai, goiY:gy()}; }
    if(lv===2){ var ch2=['28 ngày','28 hoặc 29 ngày','30 ngày','31 ngày'], D2='28 hoặc 29 ngày', sai2={}; ch2=shuffle(ch2); ch2.forEach(function(c,i){ if(c!==D2) sai2[String(i)]='nham-so-ngay'; });
     return {type:'mcq', cot:2, _lv:2, _t:2, _dung:D2, q:banTay()+goi+'<div>Tháng <b>2</b> có bao nhiêu ngày?</div>', choices:ch2, correct:ch2.indexOf(D2), sai:sai2, goiY:gy()}; }
    var kd=pick(['31','30','ngan','nhieu']), ans = kd==='31' ? 7 : (kd==='30' ? 4 : (kd==='ngan' ? 5 : 11)), hoi = kd==='31' ? 'Một năm có mấy tháng có <b>31 ngày</b>?' : (kd==='30' ? 'Một năm có mấy tháng có <b>30 ngày</b>?' : (kd==='ngan' ? 'Một năm có mấy tháng có <b>không quá 30 ngày</b>?' : 'Một năm có mấy tháng có <b>ít nhất 30 ngày</b>?'));
    return {type:'num', _lv:3, _kd:kd, q:banTay()+goi+'<div>'+hoi+'</div>', ans:ans, sai:nhanSai([[ans+1,'nham-so-ngay'],[ans-1,'nham-so-ngay'],[12,'nham-so-ngay'],[ans+2,'nham-so-ngay'],[6,'nham-so-ngay']], ans), goiY:gy()};
  }, check:function(q){ if(q._lv<=2){ if(!kiemMCQ(q) || q.choices.length!==4) return false; var t=q._t, N=NGAY_THANG[t-1]; var D = t===2 ? '28 hoặc 29 ngày' : N+' ngày'; if(q._dung!==D || q.q.indexOf('<b>'+t+'</b> có bao nhiêu')<0) return false; return q._lv<=1 ? t!==2 : t===2; }
    var c31=NGAY_THANG.filter(function(x){ return x===31; }).length, c30=NGAY_THANG.filter(function(x){ return x===30; }).length, kd=q._kd, e = kd==='31' ? c31 : (kd==='30' ? c30 : (kd==='ngan' ? NGAY_THANG.filter(function(x){ return x<=30; }).length : NGAY_THANG.filter(function(x){ return x>=30; }).length)); return q.ans===e && e>0; }},

  /* D7 — Lịch tháng: Chủ nhật */
  {name:'Lịch tháng: Chủ nhật, thứ trong tháng', sec:'Bài 6 — lịch tháng 3 (Chủ nhật: 3, 10, 17, 24, 31): Chủ nhật cuối cùng là ngày 31', mt:['MT3'], levels:3,
   muc:['Chủ nhật đầu tiên của tháng.', 'Chủ nhật cuối cùng của tháng.', 'Tháng khác: thứ cuối cùng hoặc thứ ba trong tháng.'],
   make:function(lv){
    var N = lv<=1 ? 31 : (lv===2 ? pick([30,31]) : pick([28,29,30,31])), t0=rnd(0,6), w, kind, ans, hoi, d;
    if(lv<=1){ w=6; kind='dau'; } else if(lv===2){ w=6; kind='cuoi'; } else { w=rnd(0,6); kind=pick(['cuoi','ba']); }
    var ds=[]; for(d=1; d<=N; d++) if(thuCua(t0,d)===w) ds.push(d);
    ans = kind==='dau' ? ds[0] : (kind==='cuoi' ? ds[ds.length-1] : ds[2]);
    hoi = kind==='dau' ? 'Ngày <b>Chủ nhật đầu tiên</b> của tháng là ngày mấy?' : (kind==='cuoi' ? 'Ngày <b>'+TH[w]+' cuối cùng</b> của tháng là ngày mấy?' : 'Ngày <b>'+TH[w]+' thứ ba</b> của tháng là ngày mấy?');
    return {type:'num', _lv:lv, _w:w, _kind:kind, q:lichThang(N,t0)+'<div>Lịch tháng có '+N+' ngày. '+hoi+'</div>', ans:ans, sai:nhanSai([[ans+7,'nham-thu'],[ans-7,'nham-thu'],[ans+1,'nham-thu'],[ans-1,'nham-thu'],[ans+2,'nham-thu']], ans), goiY:gy()};
  }, check:function(q){ var L=docLich(q.q); if(!L || !lichDung(L)) return false; var ds=[], d, w=q._w; for(d=1; d<=L.N; d++) if(thuCua(L.t,d)===w) ds.push(d);
    var e = q._kind==='dau' ? ds[0] : (q._kind==='cuoi' ? ds[ds.length-1] : ds[2]); if(q.ans!==e || e<1 || q.q.indexOf('Lịch tháng có '+L.N+' ngày')<0) return false;
    if(q._lv<=1) return L.N===31 && w===6 && q._kind==='dau'; if(q._lv===2) return (L.N===30 || L.N===31) && w===6 && q._kind==='cuoi'; return L.N>=28 && (q._kind==='cuoi' || q._kind==='ba'); }},

  /* D8 — Ngày cuối tháng, ngày đầu tháng sau */
  {name:'Ngày cuối tháng, ngày đầu tháng sau', sec:'Bài 6 — ngày cuối tháng 3 là Chủ nhật, ngày đầu tháng 4 là thứ Hai', mt:['MT3'], levels:3,
   muc:['Ngày cuối tháng là thứ mấy.', 'Ngày đầu tháng sau là thứ mấy.', 'Tháng 30 ngày hoặc tháng 2: ngày cuối, ngày đầu tháng sau là thứ mấy.'],
   make:function(lv){
    var N = lv<=2 ? 31 : pick([28,29,30]), t0=rnd(0,6), cuoi=thuCua(t0,N), sau=(cuoi+1)%7, kind = lv<=1 ? 'cuoi' : (lv===2 ? 'sau' : pick(['cuoi','sau'])), w = kind==='cuoi' ? cuoi : sau;
    var os=chonThu(w,4), ch=os.map(function(v){ return TH[v]; }), D=TH[w], sai={}; ch.forEach(function(c,i){ if(c!==D) sai[String(i)]='nham-thu'; });
    var hoi = kind==='cuoi' ? 'Ngày cuối cùng của tháng là thứ mấy?' : 'Ngày đầu tiên của tháng sau là thứ mấy?';
    return {type:'mcq', cot:2, _lv:lv, _kind:kind, _dung:D, q:lichThang(N,t0)+'<div>Lịch tháng có '+N+' ngày. '+hoi+'</div>', choices:ch, correct:ch.indexOf(D), sai:sai, goiY:gy()};
  }, check:function(q){ var L=docLich(q.q); if(!L || !lichDung(L) || !kiemMCQ(q) || q.choices.length!==4) return false; var cuoi=thuCua(L.t,L.N), w = q._kind==='cuoi' ? cuoi : (cuoi+1)%7; if(q._dung!==TH[w] || q.q.indexOf('Lịch tháng có '+L.N+' ngày')<0) return false;
    if(q._lv<=1) return L.N===31 && q._kind==='cuoi'; if(q._lv===2) return L.N===31 && q._kind==='sau'; return L.N<=30; }},

  /* D9 — Khoảng ngày qua tháng */
  {name:'Khoảng ngày qua tháng', sec:'Bài 7 — chuyến đi từ 29 tháng 3 đến hết ngày 2 tháng 4 kéo dài 5 ngày', mt:['MT3'], levels:3,
   muc:['Đếm ngày trong cùng một tháng.', 'Đếm ngày qua tháng có 30 hoặc 31 ngày.', 'Đếm ngày qua tháng 2.'],
   make:function(lv){
    var t, N, d1, d2, t0=rnd(0,6), ans, q, nx;
    if(lv<=1){ t=pick([1,3,4,5,6,7,8,9,10,11,12]); N=NGAY_THANG[t-1]; d1=rnd(3,N-8); d2=d1+rnd(2,6); ans=d2-d1+1; q='<div>Chuyến đi bắt đầu từ ngày <b>'+d1+'</b> tháng '+t+' đến hết ngày <b>'+d2+'</b> tháng '+t+'. Chuyến đi kéo dài bao nhiêu ngày?</div>'; }
    else { t = lv===2 ? pick([1,3,4,5,6,7,8,9,10,11]) : 2; N = lv===2 ? NGAY_THANG[t-1] : 28; d1=N-rnd(2,5); d2=rnd(1,5); nx=t+1; ans=N-d1+1+d2; q='<div>'+(lv===3 ? 'Tháng 2 năm đó có 28 ngày. ' : '')+'Chuyến đi bắt đầu từ ngày <b>'+d1+'</b> tháng '+t+' đến hết ngày <b>'+d2+'</b> tháng '+nx+'. Chuyến đi kéo dài bao nhiêu ngày?</div>'; }
    var hl = lv<=1 ? [d1,d2] : [d1,N];
    return {type:'num', _lv:lv, _t:t, _N:N, _d1:d1, _d2:d2, q:lichThang(N,t0,hl)+q, ans:ans, sai:nhanSai([[lv<=1 ? d2-d1 : N-d1+d2,'dem-sot-ngay'],[ans+1,'dem-sot-ngay'],[ans-1,'dem-sot-ngay'],[lv<=1 ? d2 : N-d1+1,'dem-sot-ngay'],[ans+2,'dem-sot-ngay']], ans), goiY:gy()};
  }, check:function(q){ var L=docLich(q.q); if(!L || !lichDung(L)) return false; var N=q._N, d1=q._d1, d2=q._d2; if(L.N!==N || q.q.indexOf('<b>'+d1+'</b>')<0 || q.q.indexOf('<b>'+d2+'</b>')<0) return false;
    var e = q._lv<=1 ? d2-d1+1 : N-d1+1+d2; if(q.ans!==e || e<2) return false; if(q._lv<=1) return d2<=N && d2>d1 && NGAY_THANG[q._t-1]===N; if(q._lv===2) return NGAY_THANG[q._t-1]===N && N>=30 && d1>N-6 && d2<=5; return N===28 && q._t===2 && d1>=23 && d2<=5; }},

  /* D10 — Bạn An đọc giờ */
  {name:'Bạn An đọc giờ', sec:'Dạng thêm (không có trong SGK) — bạn An đọc đồng hồ: em có đồng ý không, An sai ở đâu, giờ đúng', mt:['MT1'], levels:3,
   muc:['An đọc đồng hồ: em có đồng ý không.', 'An đọc sai: An sai ở đâu.', 'An đọc sai: giờ đúng là mấy giờ.'],
   make:function(lv){
    var an=nguoi('boy','Bạn An'), h=rnd(1,12), m=rnd(1,11)*5, hs=(Math.round(m/5)%12)||12, D=txtGio(h,m), kind=pick(['kim','phut','gio']), sa;
    var hinh=dongHoKim(h,m);
    if(kind==='kim') sa=txtGio(hs, (h%12)*5); else if(kind==='phut') sa=txtGio(h, m/5); else sa=txtGio((h%12)+1, m);
    if(sa===D){ kind='gio'; sa=txtGio((h%12)+1, m); }
    if(lv<=1){ var dung=Math.random()<0.5, ra = dung ? D : sa;
     return {type:'mcq', cot:2, _lv:1, _ra:ra, _dung:ra===D?'Đồng ý':'Không đồng ý', q:an+hinh+'<div>Bạn An đọc: «<b>'+ra+'</b>».</div><div>Em có đồng ý với bạn An không?</div>', choices:['Đồng ý','Không đồng ý'], correct:ra===D?0:1, sai:(ra===D?{'1':'nham-kim'}:{'0':'nham-kim'}), goiY:gy()}; }
    if(lv===2){ var LY={kim:'An đọc nhầm kim giờ với kim phút', phut:'An đọc số phút theo số trên mặt đồng hồ', gio:'An đọc sai số giờ'}, ch=shuffle([LY.kim, LY.phut, LY.gio, 'An đọc đúng rồi']), Dd=LY[kind], sai={}; ch.forEach(function(c,i){ if(c!==Dd) sai[String(i)]='nham-kim'; });
     return {type:'mcq', cot:1, _lv:2, _kind:kind, _ra:sa, _dung:Dd, q:an+hinh+'<div>Bạn An đọc: «<b>'+sa+'</b>». An đọc sai rồi!</div><div>An sai ở đâu?</div>', choices:ch, correct:ch.indexOf(Dd), sai:sai, goiY:gy()}; }
    var m3=lapMCQ(D, [[sa,{kim:'nham-kim',phut:'doc-phut-theo-so',gio:'nham-gio'}[kind]],[txtGio(h,(m+5)%60),'doc-phut-theo-so'],[txtGio(((h+10)%12)+1,m),'nham-gio'],[txtGio((h%12)+1,m),'nham-gio']]);
    return {type:'mcq', cot:2, _lv:3, _kind:kind, _ra:sa, _dung:m3._dung, q:an+hinh+'<div>Bạn An đọc: «<b>'+sa+'</b>». An đọc sai rồi!</div><div>Đồng hồ chỉ mấy giờ?</div>', choices:m3.choices, correct:m3.correct, sai:m3.sai, goiY:gy()};
  }, check:function(q){ var c=docDongHo(q.q); if(!c || !kiemMCQ(q) || c.m%5!==0 || c.m===0) return false; var D=txtGio(c.h,c.m);
    if(q._lv<=1) return q.choices.length===2 && q.q.indexOf('<b>'+q._ra+'</b>')>=0 && (q._dung==='Đồng ý')===(q._ra===D);
    if(q._ra===D || q.q.indexOf('<b>'+q._ra+'</b>')<0) return false; var hs=(Math.round(c.m/5)%12)||12, exp = q._kind==='kim' ? txtGio(hs,(c.h%12)*5) : (q._kind==='phut' ? txtGio(c.h,c.m/5) : txtGio((c.h%12)+1,c.m)); if(exp!==q._ra) return false;
    if(q._lv===2) return q.choices.length===4 && q._dung===({kim:'An đọc nhầm kim giờ với kim phút', phut:'An đọc số phút theo số trên mặt đồng hồ', gio:'An đọc sai số giờ'})[q._kind]; return q.choices.length===4 && q._dung===D; }}
 ]
};
