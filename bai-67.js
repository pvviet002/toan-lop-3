/* bai-67.js — Bài 67: Thực hành xem đồng hồ, xem lịch (Tập 2, Chủ đề 13). BÀI MỚI, Engine v2 — LUYỆN THÔNG MINH.
   Theo bảng phân tích sư phạm đã duyệt (phan-tich-su-pham/bai-67.md): 3 MỤC TIÊU (muctieu) × 10 DẠNG (topics), mỗi dạng 3 mức (Thông tư 27).
   Hình: dongHoKim, lichThang (chép từ bài 66; đồng hồ có thêm cỡ hiển thị), haiDongHo (hai đồng hồ bắt đầu, kết thúc), bangGio (bảng giờ hoạt động, data-bg).
   Lịch do mã dựng với ngày 1 là thứ bất kỳ; check() tính lại thứ trong tuần. Đính chính tháng 6: thứ Sáu đầu tiên là ngày 7, thứ Hai tuần kế tiếp là ngày 10.
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

function pad2(n){ return n<10 ? '0'+n : String(n); }
function txtGio(h, m){ return h+' giờ'+(m>0 ? ' '+m+' phút' : ''); }
var TH=['thứ Hai','thứ Ba','thứ Tư','thứ Năm','thứ Sáu','thứ Bảy','Chủ nhật'];
var NGAY_THANG=[31,28,31,30,31,30,31,31,30,31,30,31];
/* ---- Mặt đồng hồ 60 vạch: kim giờ ngắn (đỏ), kim phút dài (xanh) ---- */
function dongHoKim(h, m, px){
 var o=svgX(220,220,px||220).replace('<svg ','<svg data-gio="'+h+'" data-phut="'+m+'" '), i, a, c, s, x1, y1, x2, y2;
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
/* thời điểm sau d phút (đồng hồ 12 giờ) */
function tinhSau(h, m, d){ var t=((h%12)*60+m+d)%720; if(t<0) t+=720; var hh=Math.floor(t/60); return {h: hh===0 ? 12 : hh, m: t%60}; }
function phutGiua(h1, m1, h2, m2){ return (((h2%12)*60+m2)-((h1%12)*60+m1)+720)%720; }
function khungDH(h, m, ten){ return '<div class="flex flex-col items-center">'+dongHoKim(h,m,180).replace('<div class="flex justify-center my-2">','<div>')+'<div class="font-extrabold text-slate-700 -mt-1 mb-1">'+ten+'</div></div>'; }
function haiDongHo(h1, m1, h2, m2){ return '<div class="flex flex-wrap justify-center gap-x-4">'+khungDH(h1,m1,'Bắt đầu')+khungDH(h2,m2,'Kết thúc')+'</div>'; }
function docNhieuDH(html){ var re=/data-gio="(\d+)" data-phut="(\d+)"/g, m, v=[]; while((m=re.exec(html))) v.push({h:+m[1], m:+m[2]}); return v; }
/* bảng giờ hoạt động: [tên, bắt đầu, kết thúc] (phút trong ngày) */
function hhmm(t){ return pad2(Math.floor(t/60))+':'+pad2(t%60); }
function bangGio(ds){
 var s=svgX(330, ds.length*38+6, 330).replace('<svg ','<svg data-bg="'+ds.map(function(d){ return d[1]+'-'+d[2]; }).join(',')+'" ');
 ds.forEach(function(d,i){ var y=4+i*38;
  s+='<rect x="3" y="'+y+'" width="324" height="34" rx="8" fill="'+HM.xam+'"/><text x="14" y="'+(y+23)+'" font-size="16" '+HFONT+' fill="'+HM.chu+'">'+d[0]+'</text><text x="316" y="'+(y+23)+'" text-anchor="end" font-size="16" '+HFONT+' fill="'+HM.chu+'">'+hhmm(d[1])+' - '+hhmm(d[2])+'</text>'; });
 return '<div class="flex justify-center my-2">'+s+'</svg></div>';
}
function docBangGio(html){ var a=/data-bg="([\d,\-]+)"/.exec(html); return a ? a[1].split(',').map(function(p){ var x=p.split('-'); return [+x[0], +x[1]]; }) : null; }
function trungNhau(a, b){ return a[0]<b[1] && b[0]<a[1]; }
var VIEC=['Vẽ tranh trên gỗ','Rung chuông vàng','Làm đồ chơi tái chế','Làm bánh giấy','Làm đồ gốm','Chơi cờ vua','Tập hát','Học nấu ăn','Làm diều giấy','Trồng cây'];
var VIECNHA=['dọn nhà','nấu bữa tối','xem đá bóng','tưới cây','đọc truyện','làm bài tập'];
var GOI={'cong-phut-quen-doi':'Cộng hoặc trừ phút: đủ 60 phút thì đổi thành 1 giờ. Ví dụ 9 giờ 45 phút + 30 phút = 9 giờ 75 phút = 10 giờ 15 phút.',
  'nham-gio':'Kim ngắn đi qua số nào rồi thì giờ là số đó (chưa tới số kế tiếp thì chưa tới giờ kế tiếp).',
  'dem-phut-sai':'Số phút = giờ kết thúc − giờ bắt đầu. Từ 10 giờ 50 phút đến 11 giờ là 10 phút, rồi cộng tiếp số phút sau 11 giờ.',
  'nham-thu':'Mỗi tuần có 7 ngày: sau ngày thứ Bảy là Chủ nhật, rồi lại thứ Hai. Bé nhìn cột của ngày đó trong lịch.',
  'sai-thu-tu-gio':'Việc nào bắt đầu sớm hơn thì làm trước. Bé so giờ từ nhỏ đến lớn.',
  'dem-sot-ngay':'Bé đếm cả ngày đầu và ngày cuối: từ ngày 24 đến hết ngày 30 là 7 ngày.',
  'trung-gio':'Hai hoạt động không trùng giờ khi hoạt động này kết thúc trước hoặc đúng lúc hoạt động kia bắt đầu.',
  'nham-bang':'Bé tính lại từng bước cho đúng nhé.'};
function gy(){ var o={}, k; for(k in GOI) o[k]=GOI[k]; return o; }

var BAI = {
 n: 67,
 title: 'Thực Hành Xem Đồng Hồ, Xem Lịch',
 sub: 'Luyện thông minh: câu hỏi tự đổi theo bé — làm hết lượt để xem ngọn lửa!',
 goal: 10, soCau: 18, soCauToiDa: 24,
 loi: {'cong-phut-quen-doi':'Quên đổi 60 phút thành 1 giờ', 'nham-gio':'Nhầm số giờ', 'dem-phut-sai':'Đếm sai số phút', 'nham-thu':'Nhầm thứ trong tuần', 'sai-thu-tu-gio':'Xếp sai thứ tự theo giờ', 'dem-sot-ngay':'Đếm sót ngày', 'trung-gio':'Chọn hoạt động trùng giờ', 'nham-bang':'Tính sai'},
 muctieu: [
  {id:'MT1', ten:'Thời điểm sau, thời điểm trước', muc:['Sau một số phút chẵn chục (10 giờ 10 phút + 40 phút).', 'Cộng phút vượt quá 60 (9 giờ 45 phút + 30 phút); thời điểm bắt đầu trước.', 'Qua 12 giờ; hai việc liền nhau; giờ đúng sau khi An tính sai.']},
  {id:'MT2', ten:'Khoảng thời gian (số phút)', muc:['Từ giờ bắt đầu đến giờ kết thúc trong cùng một giờ.', 'Hai đồng hồ, qua một giờ (gà nướng).', 'Bốn đáp án gần nhau; buổi chiều kéo dài hơn một giờ.']},
  {id:'MT3', ten:'Lịch và xếp thời gian', muc:['Chủ nhật đầu tiên; xếp hai việc; trại hè trong tháng; thứ Sáu đầu tiên; chọn hai hoạt động.', 'Đếm Chủ nhật trong tháng; xếp ba việc; thứ Hai tuần kế tiếp; chọn hoạt động không trùng giờ.', 'Chủ nhật thứ k; xếp bốn việc; trại hè qua tháng; hai thứ bất kỳ; số hoạt động nhiều nhất.']}
 ],
 topics: [
  /* D1 — Thời điểm sau (cơm điện) */
  {name:'Thời điểm sau (cơm điện)', sec:'Bài 1 — cơm điện cắm lúc 10 giờ 10 phút, 40 phút nữa chín: 10 giờ 50 phút; rau trộn mất 7 phút', mt:['MT1'], levels:3,
   muc:['Cộng số phút chẵn chục, chưa đủ 60 phút.', 'Cộng phút vượt quá 60 (9 giờ 45 phút + 30 phút).', 'Qua 12 giờ.'],
   make:function(lv){
    var h, m, d, g;
    if(lv<=1){ h=rnd(1,12); m=pick([10,20,30]); d=pick([10,20,30,40]); if(m+d>=60) d=10; }
    else if(lv===2){ for(g=0; g<300; g++){ h=rnd(1,10); m=pick([30,35,40,45,50,55]); d=pick([15,20,25,30,35,40,45]); if(m+d>=60) break; } }
    else { for(g=0; g<300; g++){ h=pick([11,12]); m=pick([30,35,40,45,50,55]); d=pick([15,20,25,30,35,40,45]); if(m+d>=60) break; } }
    var r=tinhSau(h,m,d), D=txtGio(r.h,r.m), cand=[[txtGio(h,(m+d)%60),'cong-phut-quen-doi'],[txtGio(r.h,m),'cong-phut-quen-doi'],[txtGio((r.h%12)+1,r.m),'nham-gio'],[txtGio(r.h,(r.m+10)%60),'nham-bang'],[txtGio(h,m+d>=60 ? m+d : (m+d+10)%60),'cong-phut-quen-doi']], mm=lapMCQ(D,cand);
    return {type:'mcq', cot:2, _lv:lv, _d:d, _dung:mm._dung, q:dongHoKim(h,m)+'<div>Cơm điện được cắm lúc đồng hồ chỉ như hình. Sau <b>'+d+' phút</b> nữa cơm chín. Cơm chín lúc mấy giờ?</div>', choices:mm.choices, correct:mm.correct, sai:mm.sai, goiY:gy()};
  }, check:function(q){ var c=docDongHo(q.q), d=q._d; if(!c || !kiemMCQ(q) || q.choices.length!==4 || q.q.indexOf('<b>'+d+' phút</b>')<0) return false; var r=tinhSau(c.h,c.m,d); if(q._dung!==txtGio(r.h,r.m)) return false;
    if(q._lv<=1) return c.m%10===0 && d%10===0 && c.m+d<60; if(q._lv===2) return c.m+d>=60 && c.h<=10; return c.m+d>=60 && (c.h===11 || c.h===12); }},

  /* D2 — Thời gian làm món ăn */
  {name:'Thời gian làm món ăn', sec:'Bài 2, 3 — rau trộn mất 7 phút, bắt đầu 10 giờ 50 phút, xong 10 giờ 57 phút; gà nướng: 20, 25, 30 hay 35 phút', mt:['MT2'], levels:3,
   muc:['Bắt đầu và xong lúc trong cùng một giờ (rau trộn).', 'Hai đồng hồ, gà nướng: chọn 20, 25, 30 hay 35 phút.', 'Hai đồng hồ, bốn đáp án gần nhau.'],
   make:function(lv){
    if(lv<=1){ var h=rnd(1,12), b=rnd(1,45), d=rnd(3,12), c=b+d;
     return {type:'num', _lv:1, _h:h, _b:b, _c:c, q:'<div>Món rau trộn bắt đầu làm lúc <b>'+txtGio(h,b)+'</b> và xong lúc <b>'+txtGio(h,c)+'</b>.</div><div>Làm món rau trộn mất bao nhiêu phút?</div>', ans:d, sai:nhanSai([[b+c,'dem-phut-sai'],[d+1,'dem-phut-sai'],[d-1,'dem-phut-sai'],[c,'dem-phut-sai'],[60-d,'dem-phut-sai']], d), goiY:gy()}; }
    var h1=rnd(1,12), m1, d, g, ch, D, sai={};
    if(lv===2){ m1=rnd(0,11)*5; d=pick([20,25,30,35]); ch=['20 phút','25 phút','30 phút','35 phút']; }
    else { for(g=0; g<500; g++){ m1=rnd(1,59); d=rnd(13,58); if(m1%5!==0 && d%5!==0 && m1+d>=60 && (m1+d-60)%5!==0) break; } }
    var e=tinhSau(h1,m1,d); D=d+' phút';
    if(lv>=3){ var cs=[d,d+1,d-1,d+5,d-5,d+10,d-10].filter(function(x){ return x>0 && x<60; }); ch=[D]; cs.forEach(function(x){ var t=x+' phút'; if(t!==D && ch.length<4 && ch.indexOf(t)<0) ch.push(t); }); }
    ch=shuffle(ch.slice()); ch.forEach(function(c2,i){ if(c2!==D) sai[String(i)]='dem-phut-sai'; });
    return {type:'mcq', cot:2, _lv:lv, _dung:D, q:haiDongHo(h1,m1,e.h,e.m)+'<div>Gà nướng bắt đầu lúc đồng hồ chỉ như hình bên trái, xong lúc đồng hồ bên phải. Nướng gà mất bao nhiêu phút?</div>', choices:ch, correct:ch.indexOf(D), sai:sai, goiY:gy()};
  }, check:function(q){ if(q._lv<=1){ var h=q._h, b=q._b, c=q._c; return b>=1 && c<60 && c>b && q.ans===c-b && q.q.indexOf('<b>'+txtGio(h,b)+'</b>')>=0 && q.q.indexOf('<b>'+txtGio(h,c)+'</b>')>=0; }
    var v=docNhieuDH(q.q); if(v.length!==2 || !kiemMCQ(q) || q.choices.length!==4) return false; var d=phutGiua(v[0].h,v[0].m,v[1].h,v[1].m); if(q._dung!==d+' phút' || d<=0 || d>=60) return false;
    if(q._lv===2) return v[0].m%5===0 && v[1].m%5===0 && [20,25,30,35].indexOf(d)>=0 && q.choices.slice().sort().join()==='20 phút,25 phút,30 phút,35 phút'; return v[0].m%5!==0 && v[1].m%5!==0 && d%5!==0 && v[0].m+d>=60; }},

  /* D3 — Lịch: các ngày Chủ nhật */
  {name:'Lịch: các ngày Chủ nhật', sec:'Bài 4 — lịch tháng 5 (ngày 1 là thứ Tư): Chủ nhật là ngày 5, 12, 19, 26', mt:['MT3'], levels:3,
   muc:['Chủ nhật đầu tiên.', 'Đếm số ngày Chủ nhật trong tháng.', 'Ngày Chủ nhật thứ hai, thứ ba, thứ tư hoặc cuối cùng (tháng bất kỳ).'],
   make:function(lv){
    var N = lv<=1 ? 31 : (lv===2 ? pick([30,31]) : pick([28,29,30,31])), t0=rnd(0,6), ds=[], d;
    for(d=1; d<=N; d++) if(thuCua(t0,d)===6) ds.push(d);
    var kind = lv<=1 ? 'dau' : (lv===2 ? 'dem' : pick(['k2','k3','k4','cuoi'])), ans = kind==='dau' ? ds[0] : (kind==='dem' ? ds.length : (kind==='k2' ? ds[1] : (kind==='k3' ? ds[2] : (kind==='k4' ? ds[3] : ds[ds.length-1])))),
     hoi = kind==='dau' ? 'Ngày <b>Chủ nhật đầu tiên</b> của tháng là ngày mấy?' : (kind==='dem' ? 'Tháng này có bao nhiêu <b>ngày Chủ nhật</b>?' : (kind==='cuoi' ? 'Ngày <b>Chủ nhật cuối cùng</b> của tháng là ngày mấy?' : 'Ngày <b>Chủ nhật thứ '+({k2:'hai',k3:'ba',k4:'tư'})[kind]+'</b> của tháng là ngày mấy?'));
    return {type:'num', _lv:lv, _kind:kind, q:lichThang(N,t0)+'<div>Lịch tháng có '+N+' ngày. '+hoi+'</div>', ans:ans, sai:nhanSai([[kind==='dem' ? ans+1 : ans+7,'nham-thu'],[kind==='dem' ? ans-1 : ans-7,'nham-thu'],[ans+1,'nham-thu'],[ans-1,'nham-thu'],[ans+2,'nham-thu']], ans), goiY:gy()};
  }, check:function(q){ var L=docLich(q.q); if(!L || !lichDung(L) || q.q.indexOf('Lịch tháng có '+L.N+' ngày')<0) return false; var ds=[], d; for(d=1; d<=L.N; d++) if(thuCua(L.t,d)===6) ds.push(d); var kd=q._kind;
    var e = kd==='dau' ? ds[0] : (kd==='dem' ? ds.length : (kd==='k2' ? ds[1] : (kd==='k3' ? ds[2] : (kd==='k4' ? ds[3] : ds[ds.length-1])))); if(q.ans!==e || e<1) return false;
    if(q._lv<=1) return L.N===31 && kd==='dau'; if(q._lv===2) return L.N>=30 && kd==='dem'; return ['k2','k3','k4','cuoi'].indexOf(kd)>=0; }},

  /* D4 — Xếp việc theo thời gian */
  {name:'Xếp việc theo thời gian', sec:'Bài 5 — chiều Chủ nhật: dọn nhà trước 15:45, nấu bữa tối trước 18:30, xem đá bóng 16:00 đến 17:45: xếp thứ tự', mt:['MT3'], levels:3,
   muc:['Hai việc: việc nào làm trước.', 'Ba việc: xếp thứ tự.', 'Bốn việc có khoảng giờ: xếp thứ tự.'],
   make:function(lv){
    var n = lv<=1 ? 2 : (lv===2 ? 3 : 4), vs=shuffle(VIECNHA.slice()).slice(0,n), g, ts, i;
    for(g=0; g<300; g++){ ts=[]; var t=rnd(13,16)*60+rnd(0,11)*5; for(i=0;i<n;i++){ ts.push(t); t+=rnd(2,8)*15; } if(new Set(ts).size===n && ts[n-1]<22*60) break; }
    var ords=shuffle(vs.map(function(v,k){ return k; })), dong='', k;
    ords.forEach(function(j){ var bd=ts[j]; dong+='<div>'+vs[j].charAt(0).toUpperCase()+vs[j].slice(1)+': '+(lv>=3 ? 'từ <b>'+hhmm(bd)+'</b> đến <b>'+hhmm(bd+rnd(1,2)*15)+'</b>' : 'lúc <b>'+hhmm(bd)+'</b>')+'</div>'; });
    var ord=function(ix){ return ix.map(function(j){ return vs[j]; }).join(', '); }, idx=vs.map(function(_,j){ return j; }), D=ord(idx), cand=[[ord(idx.slice().reverse()),'sai-thu-tu-gio']], t2;
    for(i=0;i<n-1;i++){ t2=idx.slice(); var w=t2[i]; t2[i]=t2[i+1]; t2[i+1]=w; cand.push([ord(t2),'sai-thu-tu-gio']); }
    var mm=lapMCQ(D,cand);
    return {type:'mcq', cot:1, _lv:lv, _vs:vs.join('|'), _ts:ts.join(','), _dung:mm._dung, q:'<div>Chiều Chủ nhật, bạn Nam có các việc sau:</div>'+dong+'<div class="mt-1">Nam làm các việc theo thứ tự thời gian. Bé xếp các việc từ <b>sớm đến muộn</b> nhé!</div>', choices:mm.choices, correct:mm.correct, sai:mm.sai, goiY:gy()};
  }, check:function(q){ if(!kiemMCQ(q)) return false; var vs=q._vs.split('|'), ts=q._ts.split(',').map(Number), n=vs.length; if(n!==(q._lv<=1 ? 2 : (q._lv===2 ? 3 : 4)) || ts.length!==n || new Set(ts).size!==n || q.choices.length!==(n===2 ? 2 : 4)) return false;
    if(!vs.every(function(v,j){ return q.q.indexOf(hhmm(ts[j]))>=0; })) return false; var idx=vs.map(function(_,j){ return j; }).sort(function(a,b){ return ts[a]-ts[b]; }); return q._dung===idx.map(function(j){ return vs[j]; }).join(', ') && (q._lv<3 || q.q.indexOf(' đến <b>')>=0); }},

  /* D5 — Khoảng ngày trại hè */
  {name:'Khoảng ngày trại hè', sec:'Bài 6 — trại hè từ ngày 24 đến hết ngày 30 tháng 6 kéo dài 7 ngày', mt:['MT3'], levels:3,
   muc:['Trại hè trong một tháng (24 đến hết 30).', 'Các ngày khác trong tháng 6 hoặc tháng có 31 ngày.', 'Trại hè kéo dài qua tháng.'],
   make:function(lv){
    var t, N, d1, d2, t0=rnd(0,6), ans, q;
    if(lv<=1){ t=6; N=30; d1=24; d2=30; } else if(lv===2){ t=pick([5,6,7,8,9,10,11,12]); N=NGAY_THANG[t-1]; d1=rnd(10,N-3); d2=rnd(d1+2, N); }
    else { t=pick([3,4,5,6,7,8,9,10,11]); N=NGAY_THANG[t-1]; d1=N-rnd(1,4); d2=rnd(2,6); }
    if(lv<=2){ ans=d2-d1+1; q='<div>Trại hè bắt đầu từ ngày <b>'+d1+'</b> tháng '+t+' và kết thúc vào hết ngày <b>'+d2+'</b> tháng '+t+'. Trại hè kéo dài bao nhiêu ngày?</div>'; }
    else { ans=N-d1+1+d2; q='<div>Trại hè bắt đầu từ ngày <b>'+d1+'</b> tháng '+t+' và kết thúc vào hết ngày <b>'+d2+'</b> tháng '+(t+1)+'. Trại hè kéo dài bao nhiêu ngày?</div>'; }
    var hl = lv<=2 ? [d1,d2] : [d1,N];
    return {type:'num', _lv:lv, _t:t, _N:N, _d1:d1, _d2:d2, q:lichThang(N,t0,hl)+'<div>Lịch tháng '+t+' có '+N+' ngày.</div>'+q, ans:ans, sai:nhanSai([[lv<=2 ? d2-d1 : N-d1+d2,'dem-sot-ngay'],[ans+1,'dem-sot-ngay'],[ans-1,'dem-sot-ngay'],[lv<=2 ? d2 : N-d1,'dem-sot-ngay'],[ans+2,'dem-sot-ngay']], ans), goiY:gy()};
  }, check:function(q){ var L=docLich(q.q); if(!L || !lichDung(L)) return false; var N=q._N, d1=q._d1, d2=q._d2; if(L.N!==N || NGAY_THANG[q._t-1]!==N || q.q.indexOf('<b>'+d1+'</b>')<0 || q.q.indexOf('<b>'+d2+'</b>')<0) return false;
    var e = q._lv<=2 ? d2-d1+1 : N-d1+1+d2; if(q.ans!==e || e<2) return false; if(q._lv<=1) return q._t===6 && d1===24 && d2===30; if(q._lv===2) return d2<=N && d2>d1; return d1>=N-4 && d2<=6; }},

  /* D6 — Hạn đăng kí, thứ Hai tuần kế */
  {name:'Hạn đăng kí, thứ Hai tuần kế', sec:'Bài 6 — lịch tháng 6 (ngày 1 là thứ Bảy): hạn đăng kí hết thứ Sáu đầu tiên là ngày 7; thứ Hai của tuần kế tiếp là ngày 10', mt:['MT3'], levels:3,
   muc:['Ngày thứ Sáu đầu tiên của tháng.', 'Ngày thứ Hai của tuần kế tiếp.', 'Hai thứ bất kỳ: thứ nhất đầu tiên, thứ hai của tuần kế tiếp.'],
   make:function(lv){
    var N=pick([30,31]), t0=rnd(0,6), w1 = lv<=2 ? 4 : rnd(0,6), w2 = lv<=1 ? 4 : (lv===2 ? 0 : (function(){ var x; do { x=rnd(0,6); } while(x===w1); return x; })()), d, f1=null;
    for(d=1; d<=7; d++) if(thuCua(t0,d)===w1){ f1=d; break; }
    var ans = lv<=1 ? f1 : f1-w1+7+w2, hoi;
    if(lv<=1) hoi='Hạn đăng kí hết vào <b>thứ Sáu đầu tiên</b> của tháng. Hạn đăng kí hết vào ngày mấy?';
    else if(lv===2) hoi='Hạn đăng kí hết vào <b>thứ Sáu đầu tiên</b> của tháng. Danh sách được thông báo vào <b>thứ Hai của tuần kế tiếp</b>. Thông báo vào ngày mấy?';
    else hoi='Hạn đăng kí hết vào <b>'+TH[w1]+' đầu tiên</b> của tháng. Danh sách được thông báo vào <b>'+TH[w2]+' của tuần kế tiếp</b>. Thông báo vào ngày mấy?';
    return {type:'num', _lv:lv, _w1:w1, _w2:w2, q:lichThang(N,t0)+'<div>Lịch tháng có '+N+' ngày. '+hoi+'</div>', ans:ans, sai:nhanSai([[ans+7,'nham-thu'],[ans-7,'nham-thu'],[ans+1,'nham-thu'],[ans-1,'nham-thu'],[lv<=1 ? ans+2 : f1+(w2-w1+7)%7,'nham-thu']], ans), goiY:gy()};
  }, check:function(q){ var L=docLich(q.q); if(!L || !lichDung(L) || q.q.indexOf('Lịch tháng có '+L.N+' ngày')<0) return false; var w1=q._w1, w2=q._w2, d, f1=null; for(d=1; d<=7; d++) if(thuCua(L.t,d)===w1){ f1=d; break; }
    var e = q._lv<=1 ? f1 : f1-w1+7+w2; if(q.ans!==e || e<1 || e>L.N) return false; if(q._lv<=1) return w1===4; if(q._lv===2) return w1===4 && w2===0; return w1!==w2; }},

  /* D7 — Chuẩn bị đồ dùng: số phút giữa hai đồng hồ */
  {name:'Số phút giữa hai đồng hồ', sec:'Bài 7 — chuẩn bị đồ dùng từ giờ bắt đầu đến giờ kết thúc: tính số phút giữa hai đồng hồ', mt:['MT2'], levels:3,
   muc:['Bắt đầu và kết thúc trong cùng một giờ.', 'Qua một giờ.', 'Buổi chiều, kéo dài hơn một giờ.'],
   make:function(lv){
    var h1, m1, d, g;
    if(lv<=1){ h1=rnd(1,12); m1=rnd(0,9)*5; d=rnd(2,Math.floor((55-m1)/5))*5; }
    else if(lv===2){ for(g=0; g<300; g++){ h1=rnd(1,11); m1=rnd(7,11)*5; d=rnd(4,11)*5; if(m1+d>60) break; } }
    else { h1=rnd(1,5); m1=rnd(0,11)*5; d=rnd(14,30)*5; }
    var e=tinhSau(h1,m1,d);
    return {type:'num', _lv:lv, q:haiDongHo(h1,m1,e.h,e.m)+'<div>Rô-bốt chuẩn bị đồ dùng bắt đầu lúc đồng hồ bên trái'+(lv>=3 ? ' (buổi chiều)' : '')+', xong lúc đồng hồ bên phải. Rô-bốt chuẩn bị mất bao nhiêu phút?</div>', ans:d, sai:nhanSai([[Math.abs(e.m-m1),'dem-phut-sai'],[d+5,'dem-phut-sai'],[d-5,'dem-phut-sai'],[d+60,'dem-phut-sai'],[d>60 ? d-60 : d+10,'dem-phut-sai']], d), goiY:gy()};
  }, check:function(q){ var v=docNhieuDH(q.q); if(v.length!==2) return false; var d=phutGiua(v[0].h,v[0].m,v[1].h,v[1].m); if(q.ans!==d || d<=0 || v[0].m%5!==0 || v[1].m%5!==0) return false;
    if(q._lv<=1) return v[0].h===v[1].h && v[1].m>v[0].m; if(q._lv===2) return d<60 && v[1].m<v[0].m; return d>=70 && d<=150 && q.q.indexOf('buổi chiều')>=0 && v[0].h<=5; }},

  /* D8 — Chọn hoạt động không trùng giờ */
  {name:'Chọn hoạt động không trùng giờ', sec:'Bài 8 — vẽ tranh 10:10 đến 11:30; rung chuông vàng 10:00 đến 11:30; làm đồ chơi 10:15 đến 11:30; làm bánh giấy 15:00 đến 16:00; làm đồ gốm 14:00 đến 15:00', mt:['MT3'], levels:3,
   muc:['Hai hoạt động nào không trùng giờ (ba hoạt động).', 'Chọn hai hoạt động không trùng giờ (bốn hoạt động).', 'Tham gia được nhiều nhất bao nhiêu hoạt động (năm hoạt động).'],
   make:function(lv){
    var ten=shuffle(VIEC.slice()), g, ds, i, b0, b1, c0, c1, a0, a1;
    var xuat=function(dsX, lvX, chs, D, hoi){ var sai={}; chs.forEach(function(c,k){ if(c!==D) sai[String(k)]='trung-gio'; });
     return {type:'mcq', cot:1, _lv:lvX, _ds:JSON.stringify(dsX), _dung:D, q:bangGio(dsX)+'<div>'+hoi+'</div>', choices:chs, correct:chs.indexOf(D), sai:sai, goiY:gy()}; };
    if(lv<=1){
     b0=540+rnd(0,6)*5; b1=b0+rnd(8,12)*5; c0=b1+rnd(1,4)*5; c1=c0+rnd(8,12)*5; a0=b0+rnd(1,4)*5; a1=c0+rnd(1,4)*5;
     ds=shuffle([[ten[0],a0,a1],[ten[1],b0,b1],[ten[2],c0,c1]]);
     var pr=function(x,y){ return ds[x][0]+' và '+ds[y][0]; }, cs=[[0,1],[0,2],[1,2]], good=cs.filter(function(p2){ return !trungNhau([ds[p2[0]][1],ds[p2[0]][2]],[ds[p2[1]][1],ds[p2[1]][2]]); });
     return xuat(ds, 1, shuffle(cs.map(function(p2){ return pr(p2[0],p2[1]); })), pr(good[0][0],good[0][1]), 'Nam muốn tham gia hai hoạt động. Hai hoạt động nào <b>không trùng giờ</b>?');
    }
    if(lv===2){
     var x=600+rnd(0,6)*5, mor=[], j;
     for(j=0;j<3;j++) mor.push([ten[j], x-rnd(3,9)*5, x+rnd(3,9)*5]);
     var d0=840+rnd(0,3)*5, dd=[ten[3], d0, d0+rnd(10,16)*5]; ds=shuffle(mor.concat([dd]));
     var idx=function(nm){ return ds.findIndex(function(t){ return t[0]===nm; }); }, nm=function(t){ return t[0]; };
     var goodM=pick(mor), badP=shuffle([[mor[0],mor[1]],[mor[0],mor[2]],[mor[1],mor[2]]]).slice(0,2);
     var D2=nm(goodM)+' và '+nm(dd), chs=shuffle([D2].concat(badP.map(function(p2){ return nm(p2[0])+' và '+nm(p2[1]); })));
     return xuat(ds, 2, chs, D2, 'Nam muốn tham gia hai hoạt động mà <b>không trùng giờ</b>. Bé chọn giúp Nam!');
    }
    var mx=0, mask, sel, okm, a, c;
    for(g=0; g<2000; g++){ ds=[]; for(i=0;i<5;i++){ var st=rnd(108,190)*5; ds.push([ten[i], st, st+rnd(8,18)*5]); }
     mx=0; for(mask=1; mask<32; mask++){ sel=[]; for(i=0;i<5;i++) if(mask&(1<<i)) sel.push([ds[i][1],ds[i][2]]); okm=true; for(a=0;a<sel.length;a++) for(c=a+1;c<sel.length;c++) if(trungNhau(sel[a],sel[c])) okm=false; if(okm && sel.length>mx) mx=sel.length; }
     if(mx>=2 && mx<=3) break; }
    return {type:'num', _lv:3, _ds:JSON.stringify(ds), q:bangGio(ds)+'<div>Nam muốn tham gia nhiều hoạt động nhất mà các hoạt động <b>không trùng giờ</b>. Nam tham gia được nhiều nhất bao nhiêu hoạt động?</div>', ans:mx, sai:nhanSai([[mx+1,'trung-gio'],[mx-1,'trung-gio'],[5,'trung-gio'],[mx+2,'trung-gio'],[4,'trung-gio']], mx), goiY:gy()};
  }, check:function(q){ var ds=JSON.parse(q._ds), b=docBangGio(q.q); if(!b || b.length!==ds.length || !b.every(function(x,i){ return x[0]===ds[i][1] && x[1]===ds[i][2]; }) || !ds.every(function(d){ return d[2]>d[1] && q.q.indexOf(hhmm(d[1]))>=0; })) return false;
    var best=function(){ var mx=0, mask, sel, i, a, c, okm; for(mask=1; mask<(1<<ds.length); mask++){ sel=[]; for(i=0;i<ds.length;i++) if(mask&(1<<i)) sel.push([ds[i][1],ds[i][2]]); okm=true; for(a=0;a<sel.length;a++) for(c=a+1;c<sel.length;c++) if(trungNhau(sel[a],sel[c])) okm=false; if(okm && sel.length>mx) mx=sel.length; } return mx; };
    var tr=function(x,y){ return trungNhau([ds[x][1],ds[x][2]],[ds[y][1],ds[y][2]]); };
    if(q._lv>=3) return ds.length===5 && q.ans===best() && q.ans>=2 && q.ans<=3;
    if(!kiemMCQ(q)) return false; var pairOK=function(s){ var m=s.split(' và '); var x=ds.findIndex(function(d){ return d[0]===m[0]; }), y=ds.findIndex(function(d){ return d[0]===m[1]; }); return x>=0 && y>=0 && x!==y && !tr(x,y); };
    var good=q.choices.filter(pairOK); if(good.length!==1 || good[0]!==q._dung) return false; if(q._lv<=1) return ds.length===3 && q.choices.length===3; return ds.length===4 && q.choices.length===3; }},

  /* D9 — Thời điểm trước */
  {name:'Thời điểm trước', sec:'Dạng thêm (không có trong SGK) — phải xong trước 15 giờ 45 phút, việc mất 30 phút: bắt đầu lúc nào', mt:['MT1'], levels:3,
   muc:['Bắt đầu muộn nhất (không phải đổi giờ).', 'Trừ phút qua giờ.', 'Hai việc liền nhau.'],
   make:function(lv){
    var h=rnd(3,8), m, d, g;
    if(lv<=1){ m=rnd(3,11)*5; d=rnd(1,m/5-0)*5; if(d>=m) d=m-5; if(d<=0) d=5; }
    else if(lv===2){ for(g=0; g<300; g++){ m=rnd(1,10)*5; d=rnd(4,11)*5; if(d>m) break; } }
    else { for(g=0; g<300; g++){ m=rnd(1,11)*5; d=rnd(10,20)*5; if(d>m && d<=130) break; } }
    var tong=d, goi='';
    var r=tinhSau(h,m,-tong), D=txtGio(r.h,r.m)+' chiều', cand=[[txtGio(h,Math.abs(m-(tong%60)))+' chiều','cong-phut-quen-doi'],[txtGio(tinhSau(h,m,tong).h,tinhSau(h,m,tong).m)+' chiều','cong-phut-quen-doi'],[txtGio(r.h,(r.m+10)%60)+' chiều','nham-bang'],[txtGio((r.h%12)+1,r.m)+' chiều','nham-gio'],[txtGio(((r.h+10)%12)+1,r.m)+' chiều','nham-gio']], mm=lapMCQ(D,cand);
    var cau;
    if(lv<=2) cau='Việc đó mất <b>'+d+' phút</b>.';
    else { var d1=rnd(2,Math.floor(d/5)-2)*5, d2=d-d1; if(d1<5 || d2<5){ d1=5; d2=d-5; } cau='Nam làm hai việc liền nhau: việc thứ nhất mất <b>'+d1+' phút</b>, việc thứ hai mất <b>'+d2+' phút</b>.'; goi=d1+','+d2; }
    return {type:'mcq', cot:2, _lv:lv, _d:d, _ds:goi, _dung:mm._dung, q:dongHoKim(h,m)+'<div>Nam phải làm xong việc <b>trước lúc đồng hồ chỉ như hình</b> (buổi chiều). '+cau+' Nam phải bắt đầu muộn nhất lúc mấy giờ?</div>', choices:mm.choices, correct:mm.correct, sai:mm.sai, goiY:gy()};
  }, check:function(q){ var c=docDongHo(q.q), d=q._d; if(!c || !kiemMCQ(q) || q.choices.length!==4 || d<=0 || c.m%5!==0) return false; var r=tinhSau(c.h,c.m,-d); if(q._dung!==txtGio(r.h,r.m)+' chiều') return false;
    if(q._lv<=1) return d<c.m && q.q.indexOf('<b>'+d+' phút</b>')>=0; if(q._lv===2) return d>c.m && d<60 && q.q.indexOf('<b>'+d+' phút</b>')>=0; var p=q._ds.split(',').map(Number); return p.length===2 && p[0]+p[1]===d && p[0]>=5 && p[1]>=5 && d>c.m && q.q.indexOf('<b>'+p[0]+' phút</b>')>=0 && q.q.indexOf('<b>'+p[1]+' phút</b>')>=0; }},

  /* D10 — Bạn An tính giờ */
  {name:'Bạn An tính giờ', sec:'Dạng thêm (không có trong SGK) — bạn An tính thời điểm sau: em có đồng ý không, An sai ở đâu, giờ đúng', mt:['MT1'], levels:3,
   muc:['An tính: em có đồng ý không.', 'An tính sai: An sai ở đâu.', 'An tính sai: giờ đúng là mấy giờ.'],
   make:function(lv){
    var an=nguoi('boy','Bạn An'), h, m, d, g;
    for(g=0; g<300; g++){ h=rnd(1,10); m=pick([30,35,40,45,50,55]); d=pick([15,20,25,30,35,40,45]); if(m+d>=60) break; }
    var r=tinhSau(h,m,d), D=txtGio(r.h,r.m), kind=pick(['quen-doi','cong-sai','nham-gio']), sa = kind==='quen-doi' ? txtGio(h,(m+d)%60) : (kind==='cong-sai' ? txtGio(r.h,(r.m+10)%60) : txtGio(r.h+1,r.m)), hinh=dongHoKim(h,m), mo='<div>Nam đi học lúc đồng hồ chỉ như hình. Sau <b>'+d+' phút</b> nữa Nam đến trường.</div>';
    if(lv<=1){ var dung=Math.random()<0.5, ra = dung ? D : sa;
     return {type:'mcq', cot:2, _lv:1, _d:d, _ra:ra, _dung:ra===D?'Đồng ý':'Không đồng ý', q:an+hinh+mo+'<div>Bạn An nói Nam đến trường lúc «<b>'+ra+'</b>». Em có đồng ý với bạn An không?</div>', choices:['Đồng ý','Không đồng ý'], correct:ra===D?0:1, sai:(ra===D?{'1':'cong-phut-quen-doi'}:{'0':'cong-phut-quen-doi'}), goiY:gy()}; }
    if(lv===2){ var LY={'quen-doi':'An quên đổi 60 phút thành 1 giờ', 'cong-sai':'An cộng sai số phút', 'nham-gio':'An cộng thừa một giờ'}, ch=shuffle([LY['quen-doi'],LY['cong-sai'],LY['nham-gio'],'An tính đúng rồi']), Dd=LY[kind], sai={}; ch.forEach(function(c,i){ if(c!==Dd) sai[String(i)]='cong-phut-quen-doi'; });
     return {type:'mcq', cot:1, _lv:2, _d:d, _kind:kind, _ra:sa, _dung:Dd, q:an+hinh+mo+'<div>Bạn An nói Nam đến trường lúc «<b>'+sa+'</b>». An tính sai rồi! An sai ở đâu?</div>', choices:ch, correct:ch.indexOf(Dd), sai:sai, goiY:gy()}; }
    var m3=lapMCQ(D,[[sa,kind==='nham-gio' ? 'nham-gio' : (kind==='cong-sai' ? 'nham-bang' : 'cong-phut-quen-doi')],[txtGio(h,(m+d)%60),'cong-phut-quen-doi'],[txtGio(r.h,(r.m+10)%60),'nham-bang'],[txtGio((r.h%12)+1,r.m),'nham-gio'],[txtGio(r.h,m),'cong-phut-quen-doi']]);
    return {type:'mcq', cot:2, _lv:3, _d:d, _kind:kind, _ra:sa, _dung:m3._dung, q:an+hinh+mo+'<div>Bạn An nói Nam đến trường lúc «<b>'+sa+'</b>». An tính sai rồi! Nam đến trường lúc mấy giờ?</div>', choices:m3.choices, correct:m3.correct, sai:m3.sai, goiY:gy()};
  }, check:function(q){ var c=docDongHo(q.q), d=q._d; if(!c || !kiemMCQ(q) || q.q.indexOf('<b>'+d+' phút</b>')<0 || c.m+d<60 || c.h>10) return false; var r=tinhSau(c.h,c.m,d), D=txtGio(r.h,r.m);
    if(q._lv<=1) return q.choices.length===2 && q.q.indexOf('«<b>'+q._ra+'</b>»')>=0 && (q._dung==='Đồng ý')===(q._ra===D);
    var exp = q._kind==='quen-doi' ? txtGio(c.h,(c.m+d)%60) : (q._kind==='cong-sai' ? txtGio(r.h,(r.m+10)%60) : txtGio(r.h+1,r.m)); if(exp!==q._ra || exp===D || q.q.indexOf('«<b>'+q._ra+'</b>»')<0) return false;
    if(q._lv===2) return q.choices.length===4 && q._dung===({'quen-doi':'An quên đổi 60 phút thành 1 giờ', 'cong-sai':'An cộng sai số phút', 'nham-gio':'An cộng thừa một giờ'})[q._kind]; return q.choices.length===4 && q._dung===D; }}
 ]
};
