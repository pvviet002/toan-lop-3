/* bai-69.js — Bài 69: Luyện tập chung (Tập 2, Chủ đề 13). BÀI MỚI, Engine v2 — LUYỆN THÔNG MINH.
   Theo bảng phân tích sư phạm đã duyệt (phan-tich-su-pham/bai-69.md): 3 MỤC TIÊU (muctieu) × 10 DẠNG (topics), mỗi dạng 3 mức (Thông tư 27).
   Ôn lại bài 66–68: đồng hồ, lịch (từ bài 66, 67) và tờ tiền (từ bài 68) chép lại; thêm «giờ kém», dãy đồng hồ.
   check() đọc lại hình từ chuỗi SVG và tính lại; lịch do mã dựng, check() tính lại thứ trong tuần. QUY TẮC: nối chuỗi, KHÔNG backtick, KHÔNG template literal. */

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
function tongArr(a){ return a.reduce(function(s,x){ return s+x; },0); }
/* giờ kém: h giờ m phút (m >= 40) = (h+1) giờ kém (60 − m) phút */
function chuKem(h, m){ return ((h%12)+1)+' giờ kém '+(60-m)+' phút'; }
function chiaTo(T){
 for(var g=0; g<400; g++){ var a=[], left=T, n=0; while(left>0 && n<4){ var ok=[1000,2000,5000,10000,20000].filter(function(x){ return x<=left; }); if(!ok.length) break; var v=pick(ok); a.push(v); left-=v; n++; } if(left===0 && a.length>=2) return a.sort(function(x,y){ return y-x; }); }
 return null;
}
function haiDongHoNhan(h1, m1, h2, m2, n1, n2){ return '<div class="flex flex-wrap justify-center gap-x-4">'+khungDH(h1,m1,n1)+khungDH(h2,m2,n2)+'</div>'; }
var GOI={'nham-gio-kem':'Giờ kém: 8 giờ 50 phút còn 10 phút nữa là 9 giờ nên đọc là 9 giờ kém 10 phút. Giờ kém = giờ tiếp theo, kém (60 − số phút) phút.',
  'doi-don-vi':'1 giờ = 60 phút. 1 ngày = 24 giờ. 1 tuần = 7 ngày. 1 năm = 12 tháng.',
  'cong-phut-quen-doi':'Cộng hoặc trừ phút: đủ 60 phút thì đổi thành 1 giờ.',
  'nham-gio':'Kim ngắn đi qua số nào rồi thì giờ là số đó (chưa tới số kế tiếp thì chưa tới giờ kế tiếp).',
  'nham-thu':'Mỗi tuần có 7 ngày: sau ngày thứ Bảy là Chủ nhật, rồi lại thứ Hai. Bé nhìn cột của ngày đó trong lịch.',
  'dem-sot-ngay':'Bé đếm cả ngày đầu và ngày cuối. Mỗi ngày thêm 1 bông thì ngày đầu tiên có 1 bông.',
  'dem-phut-sai':'Số phút = giờ kết thúc − giờ bắt đầu. Từ 7 giờ 50 phút đến 8 giờ là 10 phút, rồi cộng tiếp số phút sau 8 giờ.',
  'nham-kim':'Kim ngắn là kim giờ, kim dài là kim phút. Dãy đồng hồ: bé tìm xem mỗi đồng hồ tăng thêm bao lâu.',
  'cong-sai-to':'Bé cộng từng tờ tiền: các mệnh giá cộng lại với nhau.',
  'doc-de-sai':'Giá một cái = tổng tiền chia cho số cái. Muốn mua nhiều cái thì lấy giá một cái nhân với số cái.',
  'nham-bang':'Bé tính lại từng bước cho đúng nhé.'};
function gy(){ var o={}, k; for(k in GOI) o[k]=GOI[k]; return o; }

var BAI = {
 n: 69,
 title: 'Luyện Tập Chung (Thời Gian, Tiền Việt Nam)',
 sub: 'Luyện thông minh: câu hỏi tự đổi theo bé — làm hết lượt để xem ngọn lửa!',
 goal: 10, soCau: 18, soCauToiDa: 24,
 loi: {'nham-gio-kem':'Nhầm cách đọc «giờ kém»', 'doi-don-vi':'Nhầm đơn vị thời gian', 'cong-phut-quen-doi':'Quên đổi 60 phút thành 1 giờ', 'nham-gio':'Nhầm số giờ', 'nham-thu':'Nhầm thứ trong tuần', 'dem-sot-ngay':'Đếm sót ngày', 'dem-phut-sai':'Đếm sai số phút', 'nham-kim':'Nhầm kim giờ, kim phút hoặc bước của dãy', 'cong-sai-to':'Cộng sai các tờ tiền', 'doc-de-sai':'Đọc sai đề', 'nham-bang':'Tính sai'},
 muctieu: [
  {id:'MT1', ten:'Đọc giờ, «giờ kém», dãy đồng hồ', muc:['8 giờ 50 phút = 9 giờ kém 10 phút; dãy đồng hồ tăng 1 giờ.', 'Đọc đồng hồ theo giờ kém; dãy đồng hồ tăng 15 phút.', 'Giờ kém buổi chiều; dãy đồng hồ tăng 1 giờ 5 phút.']},
  {id:'MT2', ten:'Đổi đơn vị thời gian; thời điểm, khoảng thời gian', muc:['2 giờ = ? phút; 3 tuần = ? ngày; 1 giờ 30 phút; 11 giờ 20 phút + 10 phút; xe buýt đi đến trường.', '1 tuần 3 ngày; vượt quá 60 phút; xe buýt về nhà.', '3 ngày = ? giờ; 1 năm 6 tháng; ra chơi bắt đầu lúc nào; xe buýt cả hai chiều.']},
  {id:'MT3', ten:'Lịch, tiền', muc:['Ngày là thứ mấy; cây đậu thần; giá kẹo; giá một cái bút chì.', 'Số buổi bóng rổ; cây đậu thần thứ Bảy đầu tiên; thêm bao nhiêu tiền; giá một cái (tờ tiền).', 'Số buổi học vẽ; cây đậu số khác; thêm tờ 5 000 đồng; mua nhiều cái.']}
 ],
 topics: [
  /* D1 — Giờ kém */
  {name:'Giờ kém', sec:'Bài 1 — 8 giờ 50 phút hay 9 giờ kém 10 phút', mt:['MT1'], levels:3,
   muc:['8 giờ 50 phút = ? giờ kém ? phút.', 'Đọc đồng hồ kim theo giờ kém.', 'Giờ kém buổi chiều: chọn đồng hồ số.'],
   make:function(lv){
    var h=rnd(1,12), m=pick([40,45,50,55]), D, cand, mm;
    if(lv<=1){ D=chuKem(h,m); cand=[[(h%12 ? h%12 : 12)+' giờ kém '+(60-m)+' phút','nham-gio-kem'],[chuKem(h,m).replace(/kém \d+/, 'kém '+m),'nham-gio-kem'],[(((h+1)%12)+1)+' giờ kém '+(60-m)+' phút','nham-gio-kem'],[((h%12)+1)+' giờ kém '+(m-30)+' phút','nham-gio-kem']]; mm=lapMCQ(D,cand);
     return {type:'mcq', cot:2, _lv:1, _h:h, _m:m, _dung:mm._dung, q:'<div><b>'+txtGio(h,m)+'</b> còn có thể đọc là «… giờ kém … phút». Bé chọn cách đọc đúng nhé!</div>', choices:mm.choices, correct:mm.correct, sai:mm.sai, goiY:gy()}; }
    if(lv===2){ D=chuKem(h,m); cand=[[(h%12 ? h%12 : 12)+' giờ kém '+(60-m)+' phút','nham-gio-kem'],[((h%12)+1)+' giờ kém '+m+' phút','nham-gio-kem'],[txtGio(h,60-m),'nham-gio-kem'],[(((h+1)%12)+1)+' giờ kém '+(60-m)+' phút','nham-gio-kem']]; mm=lapMCQ(D,cand);
     return {type:'mcq', cot:2, _lv:2, _dung:mm._dung, q:dongHoKim(h,m)+'<div>Đồng hồ chỉ như hình. Đọc theo cách «giờ kém», đồng hồ chỉ mấy giờ?</div>', choices:mm.choices, correct:mm.correct, sai:mm.sai, goiY:gy()}; }
    var hc=rnd(1,8), ds=function(a,b){ return pad2(a)+':'+pad2(b); }, hs=hc+12, D3=ds(hs,m);
    cand=[[ds(hs+1,60-m),'nham-gio-kem'],[ds(hs+1,m),'nham-gio-kem'],[ds(hc,m),'nham-gio-kem'],[ds(hs,60-m),'nham-gio-kem'],[ds(hs+2,m),'nham-gio-kem']]; mm=lapMCQ(D3,cand);
    return {type:'mcq', cot:2, _lv:3, _h:hc, _m:m, _dung:mm._dung, q:'<div>Việt học bài lúc <b>'+chuKem(hc,m)+'</b> chiều. Đồng hồ số nào chỉ cùng thời gian?</div>', choices:mm.choices, correct:mm.correct, sai:mm.sai, goiY:gy()};
  }, check:function(q){ if(!kiemMCQ(q) || q.choices.length!==4) return false;
    if(q._lv<=1){ var h=q._h, m=q._m; return m>=40 && m%5===0 && q.q.indexOf('<b>'+txtGio(h,m)+'</b>')>=0 && q._dung===chuKem(h,m); }
    if(q._lv===2){ var c=docDongHo(q.q); return !!c && c.m>=40 && c.m%5===0 && q._dung===chuKem(c.h,c.m); }
    var hc=q._h, mm=q._m; return hc>=1 && hc<=8 && mm>=40 && q.q.indexOf('<b>'+chuKem(hc,mm)+'</b>')>=0 && q._dung===pad2(hc+12)+':'+pad2(mm) && q.choices.every(function(s){ return /^\d\d:\d\d$/.test(s) && +s.slice(0,2)<=23 && +s.slice(3)<=59; }); }},

  /* D2 — Đổi đơn vị thời gian */
  {name:'Đổi đơn vị thời gian', sec:'Bài 4 — 2 giờ = 120 phút; 3 tuần = 21 ngày; 3 ngày = 72 giờ; 3 năm = 36 tháng', mt:['MT2'], levels:3,
   muc:['Giờ ra phút (2 giờ = ? phút).', 'Tuần ra ngày (3 tuần = ? ngày).', 'Ngày ra giờ; năm ra tháng.'],
   make:function(lv){
    var k, a, b, dvA, dvB, f;
    if(lv<=1){ k=rnd(2,5); dvA='giờ'; dvB='phút'; f=60; } else if(lv===2){ k=rnd(2,6); dvA='tuần'; dvB='ngày'; f=7; } else if(Math.random()<0.5){ k=rnd(2,4); dvA='ngày'; dvB='giờ'; f=24; } else { k=rnd(2,5); dvA='năm'; dvB='tháng'; f=12; }
    var ans=k*f;
    return {type:'num', _lv:lv, _k:k, _f:f, _dv:dvA, q:'<div>Đổi đơn vị:</div>'+bieuThucTo(k+' '+dvA+' = ? '+dvB), ans:ans, sai:nhanSai([[k*10,'doi-don-vi'],[k*100,'doi-don-vi'],[k+f,'doi-don-vi'],[k*(f===60 ? 100 : (f===7 ? 10 : (f===24 ? 12 : 10))),'doi-don-vi'],[ans+f,'nham-bang']], ans), goiY:gy()};
  }, check:function(q){ var f={'giờ':60,'tuần':7,'ngày':24,'năm':12}[q._dv]; if(!f || f!==q._f || q.ans!==q._k*f || q.q.indexOf(q._k+' '+q._dv+' = ?')<0) return false; if(q._lv<=1) return q._dv==='giờ'; if(q._lv===2) return q._dv==='tuần'; return q._dv==='ngày' || q._dv==='năm'; }},

  /* D3 — Đổi hỗn hợp */
  {name:'Đổi hỗn hợp', sec:'Bài 4 — 1 giờ 30 phút = 90 phút; 1 tuần 3 ngày = 10 ngày; 1 năm 6 tháng = 18 tháng; 1 ngày 6 giờ = 30 giờ', mt:['MT2'], levels:3,
   muc:['Giờ và phút ra phút.', 'Tuần và ngày ra ngày.', 'Năm và tháng ra tháng; ngày và giờ ra giờ.'],
   make:function(lv){
    var a, b, dvA, dvB, f;
    if(lv<=1){ a=rnd(1,3); b=pick([10,15,20,30,45]); dvA='giờ'; dvB='phút'; f=60; } else if(lv===2){ a=rnd(1,4); b=rnd(1,6); dvA='tuần'; dvB='ngày'; f=7; } else if(Math.random()<0.5){ a=rnd(1,3); b=rnd(2,9); dvA='năm'; dvB='tháng'; f=12; } else { a=rnd(1,3); b=rnd(2,20); dvA='ngày'; dvB='giờ'; f=24; }
    var ans=a*f+b;
    return {type:'num', _lv:lv, _a:a, _b:b, _f:f, _dv:dvA, _dvb:dvB, q:'<div>Đổi đơn vị:</div>'+bieuThucTo(a+' '+dvA+' '+b+' '+dvB+' = ? '+dvB), ans:ans, sai:nhanSai([[a+b,'doi-don-vi'],[a*10+b,'doi-don-vi'],[a*100+b,'doi-don-vi'],[a*f,'thieu-buoc'],[ans+f,'nham-bang']], ans), goiY:gy()};
  }, check:function(q){ var tb={'giờ':[60,'phút'],'tuần':[7,'ngày'],'năm':[12,'tháng'],'ngày':[24,'giờ']}[q._dv]; if(!tb || tb[0]!==q._f || tb[1]!==q._dvb || q.ans!==q._a*q._f+q._b || q._b>=q._f || q.q.indexOf(q._a+' '+q._dv+' '+q._b+' '+q._dvb+' = ?')<0) return false; if(q._lv<=1) return q._dv==='giờ'; if(q._lv===2) return q._dv==='tuần'; return q._dv==='năm' || q._dv==='ngày'; }},

  /* D4 — Thời điểm sau, thời điểm trước */
  {name:'Thời điểm sau (ăn trưa, ra chơi)', sec:'Bài 4 — 11 giờ 20 phút, 10 phút nữa là đến giờ ăn trưa: 11 giờ 30 phút; bây giờ 3 giờ 15 phút, đã ra chơi được 15 phút: ra chơi lúc 3 giờ', mt:['MT2'], levels:3,
   muc:['Cộng số phút chẵn chục, chưa đủ 60 phút.', 'Cộng phút vượt quá 60.', 'Ra chơi bắt đầu lúc nào (lùi lại số phút).'],
   make:function(lv){
    var h, m, d, g, r, D, cand, mm, q;
    if(lv<=1){ h=rnd(1,12); m=pick([10,20,30]); d=pick([10,20,30]); if(m+d>=60) d=10; r=tinhSau(h,m,d); q='<div>Bây giờ đồng hồ chỉ như hình. <b>'+d+' phút</b> nữa là đến giờ ăn trưa. Giờ ăn trưa là lúc mấy giờ?</div>'; }
    else if(lv===2){ for(g=0; g<300; g++){ h=rnd(1,11); m=pick([35,40,45,50,55]); d=pick([15,20,25,30,35,40]); if(m+d>=60) break; } r=tinhSau(h,m,d); q='<div>Bây giờ đồng hồ chỉ như hình. <b>'+d+' phút</b> nữa là đến giờ ăn trưa. Giờ ăn trưa là lúc mấy giờ?</div>'; }
    else { for(g=0; g<300; g++){ h=rnd(2,12); m=pick([5,10,15,20,25]); d=pick([10,15,20,25,30,35]); if(d>m) break; } r=tinhSau(h,m,-d); q='<div>Bây giờ đồng hồ chỉ như hình. Các bạn đã ra chơi được <b>'+d+' phút</b>. Giờ ra chơi bắt đầu lúc mấy giờ?</div>'; }
    D=txtGio(r.h,r.m); var sg = lv>=3 ? -d : d;
    cand=[[txtGio(h,(m+sg+120)%60),'cong-phut-quen-doi'],[txtGio(r.h,(r.m+10)%60),'nham-bang'],[txtGio((r.h%12)+1,r.m),'nham-gio'],[txtGio(((r.h+10)%12)+1,r.m),'nham-gio'],[txtGio(h,m+sg>=60 ? m+sg : Math.abs(m+sg)),'cong-phut-quen-doi'],[txtGio(r.h,m),'cong-phut-quen-doi']]; mm=lapMCQ(D,cand);
    return {type:'mcq', cot:2, _lv:lv, _d:d, _dung:mm._dung, q:dongHoKim(h,m)+q, choices:mm.choices, correct:mm.correct, sai:mm.sai, goiY:gy()};
  }, check:function(q){ var c=docDongHo(q.q), d=q._d; if(!c || !kiemMCQ(q) || q.choices.length!==4 || q.q.indexOf('<b>'+d+' phút</b>')<0) return false; var r=tinhSau(c.h,c.m, q._lv>=3 ? -d : d); if(q._dung!==txtGio(r.h,r.m)) return false;
    if(q._lv<=1) return c.m+d<60 && c.m%10===0 && d%10===0; if(q._lv===2) return c.m+d>=60 && c.h<=11; return d>c.m && c.m%5===0 && q.q.indexOf('ra chơi')>=0; }},

  /* D5 — Lịch: ngày trong tuần, Chủ nhật hằng tuần */
  {name:'Lịch: ngày trong tuần', sec:'Bài 3 — lịch tháng 4: Ngày Sách Việt Nam 21 tháng 4 là Chủ nhật; lịch tháng 12: bóng rổ mỗi Chủ nhật; học vẽ chiều thứ Bảy từ ngày 14', mt:['MT3'], levels:3,
   muc:['Một ngày cho trước là thứ mấy.', 'Đếm số Chủ nhật trong tháng (bóng rổ hằng tuần).', 'Đếm số thứ Bảy từ một ngày cho trước (học vẽ).'],
   make:function(lv){
    var N=pick([30,31]), t0=rnd(0,6), d, ds=[];
    if(lv<=1){ d=rnd(10,28); var w=thuCua(t0,d), os=chonThu(w,4), ch=os.map(function(v){ return TH[v]; }), D=TH[w], sai={}; ch.forEach(function(c,i){ if(c!==D) sai[String(i)]='nham-thu'; });
     return {type:'mcq', cot:2, _lv:1, _d:d, _dung:D, q:lichThang(N,t0)+'<div>Lịch tháng có '+N+' ngày. Ngày <b>'+d+'</b> là thứ mấy?</div>', choices:ch, correct:ch.indexOf(D), sai:sai, goiY:gy()}; }
    var ans, hoi, i;
    if(lv===2){ for(i=1; i<=N; i++) if(thuCua(t0,i)===6) ds.push(i); ans=ds.length; hoi='Nam chơi bóng rổ vào <b>Chủ nhật hằng tuần</b>. Trong tháng này Nam chơi bóng rổ bao nhiêu buổi?'; d=1; }
    else { d=rnd(8,14); for(i=d; i<=N; i++) if(thuCua(t0,i)===5) ds.push(i); ans=ds.length; hoi='Mai học vẽ vào <b>chiều thứ Bảy hằng tuần</b>, bắt đầu từ ngày <b>'+d+'</b>. Từ ngày '+d+' đến hết tháng, Mai học vẽ bao nhiêu buổi?'; }
    return {type:'num', _lv:lv, _d:d, q:lichThang(N,t0)+'<div>Lịch tháng có '+N+' ngày. '+hoi+'</div>', ans:ans, sai:nhanSai([[ans+1,'dem-sot-ngay'],[ans-1,'dem-sot-ngay'],[ans+2,'dem-sot-ngay'],[N,'nham-thu'],[ans*7,'nham-thu']], ans), goiY:gy()};
  }, check:function(q){ var L=docLich(q.q); if(!L || !lichDung(L) || q.q.indexOf('Lịch tháng có '+L.N+' ngày')<0) return false; var i, ds=[];
    if(q._lv<=1){ var d=q._d; return kiemMCQ(q) && q.choices.length===4 && d>=10 && d<=28 && q._dung===TH[thuCua(L.t,d)] && q.q.indexOf('<b>'+d+'</b>')>=0; }
    if(q._lv===2){ for(i=1;i<=L.N;i++) if(thuCua(L.t,i)===6) ds.push(i); return q.ans===ds.length && ds.length>=4; }
    for(i=q._d;i<=L.N;i++) if(thuCua(L.t,i)===5) ds.push(i); return q._d>=8 && q._d<=18 && q.q.indexOf('<b>'+q._d+'</b>')>=0 && q.ans===ds.length && ds.length>=2; }},

  /* D6 — Cây đậu thần */
  {name:'Cây đậu thần', sec:'Bài 3 — cây đậu thần mỗi ngày thêm 1 bông, thứ Bảy đầu tiên (ngày 6 tháng 4) có 4 bông: bắt đầu ra hoa từ ngày 3', mt:['MT3'], levels:3,
   muc:['Hôm nay có mấy bông: ra hoa từ ngày nào.', 'Thứ Bảy đầu tiên có 4 bông: ra hoa từ ngày nào.', 'Thứ khác, số bông khác.'],
   make:function(lv){
    var N=pick([30,31]), t0, w, k, f, d, ans, q, g;
    if(lv<=1){ k=rnd(3,8); d=rnd(k+2,26); ans=d-k+1; return {type:'num', _lv:1, _k:k, _d:d, q:'<div>Cây đậu thần mỗi ngày ra thêm <b>1 bông</b> hoa. Đến hết ngày <b>'+d+'</b> tháng 4, cây có <b>'+k+' bông</b>. Cây bắt đầu ra hoa từ ngày mấy của tháng 4?</div>', ans:ans, sai:nhanSai([[d-k,'dem-sot-ngay'],[d+k,'dem-sot-ngay'],[ans+1,'dem-sot-ngay'],[ans-1,'dem-sot-ngay'],[k,'dem-sot-ngay']], ans), goiY:gy()}; }
    for(g=0; g<500; g++){ t0=rnd(0,6); w = lv===2 ? 5 : rnd(0,6); k = lv===2 ? 4 : rnd(3,7); for(f=1; f<=7; f++) if(thuCua(t0,f)===w) break; if(f-k+1>=1 && f>=k) break; }
    ans=f-k+1;
    return {type:'num', _lv:lv, _w:w, _k:k, q:lichThang(N,t0)+'<div>Lịch tháng có '+N+' ngày. Cây đậu thần mỗi ngày ra thêm <b>1 bông</b> hoa. Vào <b>'+TH[w]+' đầu tiên</b> của tháng, cây có <b>'+k+' bông</b>. Cây bắt đầu ra hoa từ ngày mấy?</div>', ans:ans, sai:nhanSai([[f-k,'dem-sot-ngay'],[f+k,'dem-sot-ngay'],[f,'dem-sot-ngay'],[ans+1,'dem-sot-ngay'],[ans-1,'dem-sot-ngay']], ans), goiY:gy()};
  }, check:function(q){ if(q._lv<=1){ var k=q._k, d=q._d; return q.ans===d-k+1 && q.ans>=1 && k>=3 && q.q.indexOf('<b>'+d+'</b>')>=0 && q.q.indexOf('<b>'+k+' bông</b>')>=0; }
    var L=docLich(q.q); if(!L || !lichDung(L)) return false; var w=q._w, k2=q._k, f; for(f=1; f<=7; f++) if(thuCua(L.t,f)===w) break; if(q.ans!==f-k2+1 || q.ans<1 || q.q.indexOf('<b>'+TH[w]+' đầu tiên</b>')<0 || q.q.indexOf('<b>'+k2+' bông</b>')<0) return false; return q._lv===2 ? (w===5 && k2===4) : k2>=3; }},

  /* D7 — Rô-bốt đi xe buýt */
  {name:'Rô-bốt đi xe buýt', sec:'Bài 6 — Rô-bốt đi xe buýt: tính số phút từ hai đồng hồ lúc đi và lúc đến', mt:['MT2'], levels:3,
   muc:['Đi đến trường: số phút từ hai đồng hồ.', 'Về nhà: số phút từ hai đồng hồ.', 'Cả hai chiều: tổng số phút.'],
   make:function(lv){
    var h1, m1, d, e, d2, h2, m2, e2, q, ans;
    if(lv<=1){ h1=rnd(6,7); m1=rnd(0,5)*5; d=rnd(4,8)*5; e=tinhSau(h1,m1,d); q=haiDongHoNhan(h1,m1,e.h,e.m,'Lên xe','Đến trường')+'<div>Sáng, Rô-bốt lên xe buýt đi đến trường. Đồng hồ bên trái chỉ lúc lên xe, đồng hồ bên phải chỉ lúc đến trường. Rô-bốt đi xe buýt mất bao nhiêu phút?</div>'; ans=d; }
    else if(lv===2){ h1=rnd(3,4); m1=rnd(7,11)*5; d=rnd(4,9)*5; e=tinhSau(h1,m1,d); q=haiDongHoNhan(h1,m1,e.h,e.m,'Lên xe','Về đến nhà')+'<div>Chiều, Rô-bốt lên xe buýt đi về nhà. Đồng hồ bên trái chỉ lúc lên xe, đồng hồ bên phải chỉ lúc về đến nhà. Rô-bốt đi xe buýt mất bao nhiêu phút?</div>'; ans=d; if(m1+d<=60){ m1=55; d=rnd(4,9)*5; e=tinhSau(h1,m1,d); q=haiDongHoNhan(h1,m1,e.h,e.m,'Lên xe','Về đến nhà')+'<div>Chiều, Rô-bốt lên xe buýt đi về nhà. Đồng hồ bên trái chỉ lúc lên xe, đồng hồ bên phải chỉ lúc về đến nhà. Rô-bốt đi xe buýt mất bao nhiêu phút?</div>'; ans=d; } }
    else { h1=rnd(6,7); m1=rnd(0,5)*5; d=rnd(4,8)*5; e=tinhSau(h1,m1,d); h2=rnd(3,4); m2=rnd(0,5)*5; d2=rnd(4,8)*5; e2=tinhSau(h2,m2,d2); ans=d+d2;
     q=haiDongHoNhan(h1,m1,e.h,e.m,'Lên xe','Đến trường')+'<div>Sáng, Rô-bốt đi xe buýt đến trường (hai đồng hồ ở trên). Chiều, Rô-bốt lên xe lúc <b>'+txtGio(h2,m2)+'</b> và về đến nhà lúc <b>'+txtGio(e2.h,e2.m)+'</b>. Hôm đó Rô-bốt đi xe buýt tất cả bao nhiêu phút?</div>'; }
    return {type:'num', _lv:lv, _c2:lv>=3 ? [h2,m2,e2.h,e2.m].join(',') : '', q:q, ans:ans, sai:nhanSai([[lv>=3 ? d : Math.abs(e.m-m1),'dem-phut-sai'],[ans+5,'dem-phut-sai'],[ans-5,'dem-phut-sai'],[ans+60,'dem-phut-sai'],[lv>=3 ? d2 : ans+10,'dem-phut-sai']], ans), goiY:gy()};
  }, check:function(q){ var v=docNhieuDH(q.q); if(v.length!==2) return false; var d=phutGiua(v[0].h,v[0].m,v[1].h,v[1].m); if(d<=0 || v[0].m%5!==0 || v[1].m%5!==0) return false;
    if(q._lv<=2){ if(q.ans!==d) return false; return q._lv<=1 ? (v[0].h>=6 && v[0].h<=7) : (v[0].h>=3 && v[0].h<=4 && v[1].m<v[0].m); }
    var c=q._c2.split(',').map(Number); if(c.length!==4) return false; var d2=phutGiua(c[0],c[1],c[2],c[3]); return d2>0 && q.ans===d+d2 && q.q.indexOf('<b>'+txtGio(c[0],c[1])+'</b>')>=0 && q.q.indexOf('<b>'+txtGio(c[2],c[3])+'</b>')>=0; }},

  /* D8 — Mua kẹo, bim bim */
  {name:'Mua kẹo, bim bim', sec:'Bài 2 — mua túi kẹo bằng hai tờ tiền; muốn mua gói bim bim phải thêm tờ 5 000 đồng', mt:['MT3'], levels:3,
   muc:['Hai tờ tiền mua túi kẹo: giá túi kẹo.', 'Muốn mua gói bim bim phải thêm bao nhiêu đồng.', 'Thêm tờ 5 000 đồng thì mua được bim bim: giá bim bim.'],
   make:function(lv){
    var a=pick([1000,2000,5000,10000,20000]), b=pick([1000,2000,5000,10000,20000]), tong=a+b, ans, q, c=0;
    if(lv<=1){ ans=tong; q='<div>Mai có hai tờ tiền như hình. Mai dùng hết số tiền đó mua một túi kẹo. Túi kẹo giá bao nhiêu đồng?</div>'; }
    else if(lv===2){ c=tong+rnd(1,9)*1000; ans=c-tong; q='<div>Mai có hai tờ tiền như hình. Gói bim bim giá <b>'+tien(c)+'</b>. Mai phải thêm bao nhiêu đồng nữa mới mua được gói bim bim?</div>'; }
    else { ans=tong+5000; q='<div>Mai có hai tờ tiền như hình. Mai phải thêm <b>một tờ 5 000 đồng</b> nữa mới mua được gói bim bim. Gói bim bim giá bao nhiêu đồng?</div>'; }
    return {type:'num', _lv:lv, _a:a, _b:b, _c:c, q:dayTo([a,b])+q, ans:ans, sai:nhanSai([[a,'cong-sai-to'],[b,'cong-sai-to'],[tong,'cong-sai-to'],[lv>=3 ? tong : c,'cong-sai-to'],[ans+1000,'cong-sai-to'],[ans-1000,'cong-sai-to'],[a+b+a,'cong-sai-to']], ans), goiY:gy()};
  }, check:function(q){ var d=docTo(q.q), a=q._a, b=q._b, tong=a+b; if(d.length!==2 || d.slice().sort().join()!==[a,b].sort().join() || TO.indexOf(a)<0 || TO.indexOf(b)<0) return false;
    if(q._lv<=1) return q.ans===tong; if(q._lv===2) return q._c>tong && q.ans===q._c-tong && q.q.indexOf('<b>'+tien(q._c)+'</b>')>=0; return q.ans===tong+5000 && q.q.indexOf('5 000 đồng')>=0; }},

  /* D9 — Mua nhiều cái chia đều */
  {name:'Mua nhiều cái, giá một cái', sec:'Bài 5 — Nam mua 3 cái bút chì hết 9 000 đồng: 3 000 đồng một cái; Việt mua 1 cái trả 3 000 đồng', mt:['MT3'], levels:3,
   muc:['Mua k cái hết ... đồng: giá một cái.', 'Số tiền cho trong hình: giá một cái.', 'Biết giá một cái, mua nhiều cái: phải trả bao nhiêu.'],
   make:function(lv){
    var gia=rnd(1,5)*1000, k=rnd(2,4), T=gia*k, ans, q, ds=null, m=0;
    if(lv<=1){ ans=gia; q='<div>Nam mua <b>'+k+' cái</b> bút chì cùng loại hết <b>'+tien(T)+'</b>. Giá một cái bút chì là bao nhiêu đồng?</div>'; }
    else { ds=chiaTo(T); if(!ds){ gia=3000; k=3; T=9000; ds=[5000,2000,2000]; }
     if(lv===2){ ans=gia; q='<div>Nam dùng hết các tờ tiền như hình để mua <b>'+k+' cái</b> bút chì cùng loại. Giá một cái bút chì là bao nhiêu đồng?</div>'; }
     else { m=rnd(3,6); ans=gia*m; q='<div>Nam dùng hết các tờ tiền như hình để mua <b>'+k+' cái</b> bút chì cùng loại. Việt mua <b>'+m+' cái</b> bút chì loại đó. Việt phải trả bao nhiêu đồng?</div>'; } }
    return {type:'num', _lv:lv, _gia:gia, _k:k, _T:T, _m:m, _ds:ds ? ds.join(',') : '', q:(ds ? dayTo(ds) : '')+q, ans:ans, sai:nhanSai([[T,'doc-de-sai'],[T*k,'doc-de-sai'],[gia+k,'doc-de-sai'],[lv>=3 ? T : gia*k,'doc-de-sai'],[ans+1000,'nham-bang'],[ans+2000,'nham-bang']], ans), goiY:gy()};
  }, check:function(q){ var gia=q._gia, k=q._k, T=q._T; if(gia*k!==T || k<2 || k>4 || q.q.indexOf('<b>'+k+' cái</b>')<0) return false;
    if(q._lv<=1) return q.ans===gia && q.q.indexOf('<b>'+tien(T)+'</b>')>=0 && !q._ds;
    var ds=q._ds.split(',').map(Number), d=docTo(q.q); if(d.length!==ds.length || tongArr(ds)!==T || ds.some(function(x){ return TO.indexOf(x)<0; })) return false; if(q._lv===2) return q.ans===gia;
    return q._m>=3 && q.ans===gia*q._m && q.q.indexOf('<b>'+q._m+' cái</b>')>=0; }},

  /* D10 — Dãy đồng hồ kim */
  {name:'Dãy đồng hồ kim', sec:'Bài 7 — dãy đồng hồ kim tăng dần: chọn đồng hồ tiếp theo', mt:['MT1'], levels:3,
   muc:['Hai đồng hồ liên tiếp hơn kém nhau 1 giờ.', 'Hơn kém nhau 15 phút.', 'Hơn kém nhau 1 giờ 5 phút.'],
   make:function(lv){
    var st = lv<=1 ? 60 : (lv===2 ? 15 : 65), h=rnd(1,12), m = lv<=1 ? pick([0,10,15,20,30,40,45]) : (lv===2 ? pick([0,5,10,20,25,30,40]) : pick([0,5,10,15,20,25,30])), a=tinhSau(h,m,0), b=tinhSau(h,m,st), c=tinhSau(h,m,2*st);
    var D=txtGio(c.h,c.m), cand=[[txtGio(b.h,b.m),'nham-kim'],[txtGio(c.h,(c.m+10)%60),'nham-kim'],[txtGio((c.h%12)+1,c.m),'nham-kim'],[txtGio(((c.h+10)%12)+1,c.m),'nham-kim'],[txtGio(tinhSau(h,m,3*st).h,tinhSau(h,m,3*st).m),'nham-kim'],[txtGio(c.h,(c.m+5)%60),'nham-kim']], mm=lapMCQ(D,cand);
    return {type:'mcq', cot:2, _lv:lv, _st:st, _dung:mm._dung, q:haiDongHoNhan(a.h,a.m,b.h,b.m,'Đồng hồ 1','Đồng hồ 2')+'<div>Dãy đồng hồ kim: mỗi đồng hồ chỉ giờ muộn hơn đồng hồ trước một khoảng như nhau. Đồng hồ <b>tiếp theo</b> chỉ mấy giờ?</div>', choices:mm.choices, correct:mm.correct, sai:mm.sai, goiY:gy()};
  }, check:function(q){ var v=docNhieuDH(q.q); if(v.length!==2 || !kiemMCQ(q) || q.choices.length!==4) return false; var st=phutGiua(v[0].h,v[0].m,v[1].h,v[1].m); if(st!==q._st) return false; var c=tinhSau(v[1].h,v[1].m,st); if(q._dung!==txtGio(c.h,c.m)) return false; if(q._lv<=1) return st===60; if(q._lv===2) return st===15; return st===65; }}
 ]
};
