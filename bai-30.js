/* bai-30.js — Bài 30: Mi-li-mét. BÀI MỚI, Engine v2 — LUYỆN THÔNG MINH.
   Theo bảng phân tích sư phạm (phan-tich-su-pham/bai-30.md): 4 MỤC TIÊU (muctieu) × 10 DẠNG (topics), mỗi dạng 3 mức (Thông tư 27).
   Lỗi lớn nhất: cùng số khác đơn vị (3 cm khác 3 mm), nhầm bội (1 cm = 10 mm, 1 m = 1 000 mm), quên đổi đơn vị.
   Luyện tập 2 của sách (nối) đổi thành chọn một và đếm. Số đo tới 1 000, viết "1 000"; không số thập phân.
   Hình mới viết ngay trong file này (không sửa figures.js): thuocMm (thước có vạch mm); theTinh chép từ bài 24.
   Vạch thước mang data-mm, đoạn màu mang data-tu / data-den; check() đọc lại từ chuỗi SVG.
   QUY TẮC: nối chuỗi, KHÔNG backtick và KHÔNG template literal. */

/* ---- Tiện ích chung ---- */
function nhanSai(ds, dung){ var o={}; ds.forEach(function(p){ var v=p[0]; if(Number.isInteger(v) && v>0 && v!==dung && !(String(v) in o)) o[String(v)]=p[1]; }); return o; }
function kiemMCQ(q){ return q.choices[q.correct]===q._dung && new Set(q.choices).size===q.choices.length; }
function dsBtn30(ch){ return '<span class="text-2xl font-extrabold text-slate-700">'+ch+'</span><span class="ml-2 text-base font-bold text-slate-600">'+(ch==='Đ'?'Đúng':'Sai')+'</span>'; }
function svgX(w, h, px){ return svgHinh(w, h, px).replace('<svg ', '<svg class="text-slate-700" '); }
function khungHinh(s){ return '<div class="flex justify-center my-2">'+s+'</svg></div>'; }
function nguoi(ten, alt){ return '<div class="flex justify-center mb-1">'+anh(ten, 72, alt)+'</div>'; }
function kyHieu(nhan, bt){ return '<div class="text-slate-500 mb-1">'+nhan+'</div><div class="text-3xl font-extrabold text-orange-600">'+bt+'</div>'; }
function so(n){ return n>=1000 ? Math.floor(n/1000)+' '+('00'+(n%1000)).slice(-3) : String(n); }
var GOI={'nham-don-vi':'Cùng một số mà khác đơn vị thì độ dài khác nhau: 3 cm dài hơn 3 mm.', 'quen-doi':'Muốn so sánh hay cộng trừ, bé đổi về cùng một đơn vị: 1 cm = 10 mm.', 'nham-boi':'1 cm = 10 mm, 1 m = 100 cm = 1 000 mm.',
  'nham-bang':'Bé tính lại cho đúng nhé!', 'cong-thay-nhan':'Gấp n lần là nhân với n, không phải cộng.', 'chon-sai-phep':'Bé đọc kỹ: thêm là cộng, bớt là trừ, chia đều là chia.', 'thieu-buoc':'Bé làm đủ các bước của bài toán nhé!',
  'dao-vai':'Bé xem lại: ô trả lời là số nào?', 'dem-sot-phep':'Bé tính từng thẻ rồi đếm lại nhé!', 'nham-gap-them':'Gấp n lần là nhân với n. Thêm n đơn vị mới là cộng n.', 'nham-chieu':'Giảm đi là chia, gấp lên là nhân.',
  'tra-loi-sai-buoc':'Bé đọc lại câu hỏi cuối: còn một bước nữa mới ra đáp số.'};
function gy(extra){ var o={}, k; for(k in GOI) o[k]=GOI[k]; for(k in (extra||{})) o[k]=extra[k]; return o; }
function haiNhanXet(x, T, mo){
  var maiDung = x===T, alt, ch;
  if(maiDung){ alt=T+pick([-2,-1,1,2]); if(alt<=0) alt=T+1; ch=[['Đồng ý, vì '+mo(T), true, T],['Không đồng ý, vì '+mo(alt), false, alt]]; }
  else ch=[['Đồng ý, vì '+mo(x), true, x],['Không đồng ý, vì '+mo(T), false, T]];
  shuffle(ch);
  var idx=ch.map(function(c){ return c[2]; }).indexOf(T);
  return {choices:ch.map(function(c){ return c[0]; }), correct:idx, ds:ch};
}
function kiemNhanXet(q){
  var ds=q._ds, T=q._T, x=q._x, maiDung = x===T;
  return ds.length===2 && q.choices.length===2 && ds.filter(function(c){ return c[2]===T; }).length===1 && ds[q.correct][2]===T && ds[q.correct][1]===maiDung
    && q.choices[q.correct]===q._dung && new Set(q.choices).size===2;
}
function theTinh(ds){
  var s='<div class="flex flex-wrap justify-center gap-2 my-2">';
  ds.forEach(function(t){ s+='<span class="inline-block px-3 py-2 rounded-xl border-2 border-amber-300 text-slate-700 font-extrabold text-xl whitespace-nowrap">'+t+'</span>'; });
  return s+'</div>';
}
function docThe(s){ var o=[], re=/<span class="inline-block px-3 py-2[^>]*>([^<]*)<\/span>/g, m; while((m=re.exec(String(s)))) o.push(m[1]); return o; }

/* ---- Hình mới (D1, D2): thước kẻ dài cm xăng-ti-mét (≤ 5): vạch mm ngắn, vạch 5 mm vừa, vạch cm dài có số. Đoạn màu từ tu đến den (mm) nằm trên thước,
   tên đoạn ở trên. Mỗi vạch data-mm="k"; đoạn màu data-tu, data-den. ---- */
function thuocMm(cm, tu, den, ten){
  var u=Math.min(100, 290/cm), L=cm*u, W=Math.round(Math.max(L+68, 250)), x0=(W-L)/2, H=138, s=svgX(W,H), k;
  var x1=x0+tu*u/10, x2=x0+den*u/10, cx=Math.min(Math.max((x1+x2)/2, x0+34), x0+L-34);
  s+='<text x="'+cx.toFixed(1)+'" y="26" text-anchor="middle" font-size="17" '+HFONT+' fill="currentColor">'+ten+'</text>';
  s+='<rect data-tu="'+tu+'" data-den="'+den+'" x="'+x1.toFixed(1)+'" y="36" width="'+(x2-x1).toFixed(1)+'" height="22" rx="3" fill="'+HM.cam+'" fill-opacity="0.6" stroke="currentColor" stroke-width="2.5"/>';
  s+='<rect x="'+(x0-8)+'" y="62" width="'+(L+16)+'" height="68" rx="6" fill="'+HM.vang+'" fill-opacity="0.35" stroke="currentColor" stroke-width="2.5"/>';
  for(k=0;k<=cm*10;k++){ var x=x0+k*u/10, len = k%10===0 ? 24 : (k%5===0 ? 16 : 9);
    s+='<line data-mm="'+k+'" x1="'+x.toFixed(1)+'" y1="62" x2="'+x.toFixed(1)+'" y2="'+(62+len)+'" stroke="currentColor" stroke-width="'+(k%10===0 ? 2.4 : 1.5)+'" stroke-linecap="round"/>';
    if(k%10===0) s+='<text x="'+x.toFixed(1)+'" y="112" text-anchor="middle" font-size="17" '+HFONT+' fill="currentColor">'+(k/10)+'</text>'; }
  return khungHinh(s);
}
function docThuoc(s){ var v=String(s).match(/data-mm="/g), d=/data-tu="(\d+)" data-den="(\d+)"/.exec(s); return d ? {vach:v ? v.length : 0, tu:+d[1], den:+d[2]} : null; }

var BAI = {
 n: 30,
 title: 'Mi-li-mét',
 sub: 'Luyện thông minh: câu hỏi tự đổi theo bé — làm hết lượt để xem ngọn lửa!',
 goal: 10, soCau: 18, soCauToiDa: 24,
 loi: {'nham-don-vi':'Nhầm đơn vị (cùng số, khác đơn vị)', 'quen-doi':'Quên đổi đơn vị', 'nham-boi':'Nhầm bội của đơn vị (10, 100, 1 000)', 'nham-gap-them':'Nhầm "gấp n lần" với "thêm n đơn vị"', 'tra-loi-sai-buoc':'Trả lời bước giữa thay vì bước cuối', 'dem-sot-phep':'Đếm sót hoặc thừa phép tính'},
 muctieu: [
  {id:'MT1', ten:'Mi-li-mét và thước', muc:['Que kem dày mấy mi-li-mét; đoạn từ vạch 0 tới 2 cm.', 'Đoạn thẳng từ vạch 0 dài mấy mm (đếm vạch).', 'Đoạn không bắt đầu từ vạch 0: hiệu hai vạch; đọc vạch 5 mm.']},
  {id:'MT2', ten:'Đổi đơn vị và chọn đơn vị', muc:['2 cm = ? mm; 10 mm = ? cm; con kiến dài 3 mm hay 3 cm.', '6 cm = ? mm; 30 mm = ? cm; 1 m = ? mm; 3 mm và 3 cm: vật nào dài hơn.', 'Đổi số lớn (9 cm, 80 mm); 25 mm và 3 cm: độ dài nào lớn hơn.']},
  {id:'MT3', ten:'Tính với số đo', muc:['250 mm + 100 mm; 25 mm + 3 mm; 11 mm × 3.', '420 mm − 150 mm; 64 mm − 15 mm; 50 mm : 2; 16 mm gấp 5 lần.', 'Số có ba chữ số; 30 mm + 2 cm; phép nào cho kết quả 80 mm; đếm thẻ.']},
  {id:'MT4', ten:'Giải toán và vận dụng', muc:['Cào cào 12 mm; con kia gấp 3 lần; 30 mm = 3 cm đúng hay sai.', 'Ốc sên bò 152 mm rồi 264 mm: tất cả; bạn nói 3 cm bằng 3 mm.', 'Cả hai con; quãng đường còn lại; bạn nói 3 m bằng 30 cm.']}
 ],
 topics: [
  /* D1 — Que kem và thước (Khám phá) */
  {name:'Que kem và thước', sec:'Khám phá — Que kem dày 1 mm; 1 cm có 10 vạch mi-li-mét', mt:['MT1'], levels:3,
   muc:['Que kem dày bao nhiêu mi-li-mét (một vạch).', 'Từ vạch 0 tới vạch k cm có bao nhiêu khoảng 1 mm.', 'Đoạn từ vạch 0 tới vạch 5 mm giữa hai số cm.'],
   make:function(lv){
    var cm, tu=0, den, ten, ans, cau, sai;
    if(lv<=1){ cm=3; tu=pick([10,20]); den=tu+1; ten='Que kem'; ans=1; cau='Que kem dày bao nhiêu mi-li-mét?'; sai=[[10,'nham-boi'],[2,'nham-bang'],[tu,'dao-vai'],[100,'nham-boi']]; }
    else if(lv===2){ var k=rnd(1,3); cm=Math.max(k,2); den=10*k; ten=k+' cm'; ans=10*k; cau='Từ vạch 0 tới vạch '+k+' cm có bao nhiêu khoảng 1 mm?'; sai=[[k,'quen-doi'],[10*k-1,'dem-sot-phep'],[10*k+1,'dem-sot-phep'],[100*k,'nham-boi']]; }
    else { var c=rnd(1,3); cm=c+1; den=10*c+5; ten='Đoạn màu'; ans=den; cau='Đoạn màu từ vạch 0 dài bao nhiêu mi-li-mét?'; sai=[[c,'quen-doi'],[10*c,'dem-sot-phep'],[den+5,'dem-sot-phep'],[10*den,'nham-boi']]; }
    return {type:'num', _lv:lv, _cm:cm, _tu:tu, _den:den, q:thuocMm(cm,tu,den,ten)+'<div>'+cau+'</div>', ans:ans, unit:'mm', sai:nhanSai(sai, ans), goiY:gy({'dem-sot-phep':'Bé đếm từng vạch nhỏ: mỗi khoảng giữa hai vạch nhỏ là 1 mm.', 'dao-vai':'Que kem dày bằng một khoảng giữa hai vạch nhỏ.'})};
  }, check:function(q){
    var t=docThuoc(q.q); if(!t || t.vach!==10*q._cm+1 || t.tu!==q._tu || t.den!==q._den || q._cm>5) return false;
    var e = q._lv<=1 ? 1 : t.den-t.tu; return q.ans===e && t.den<=10*q._cm; }},

  /* D2 — Đọc đoạn thẳng trên thước (Hoạt động 1) */
  {name:'Đọc đoạn thẳng trên thước', sec:'Hoạt động 1 — Đoạn AB từ vạch 0 tới 2 cm dài bao nhiêu mi-li-mét', mt:['MT1'], levels:3,
   muc:['Đoạn từ vạch 0 tới vạch cm (AB = 20 mm).', 'Đoạn từ vạch 0 tới vạch 3, 4, 5 cm.', 'Đoạn không bắt đầu từ vạch 0 (từ 1 cm tới 4 cm).'],
   make:function(lv){
    var ten=pick(['AB','CD','MN','PQ']), tu=0, den, cm;
    if(lv<=1){ den=10*rnd(1,3); } else if(lv===2){ den=10*rnd(3,5); } else { tu=pick([10,15,20,25]); den=pick([40,45,50]); }
    cm=Math.ceil(den/10); if(cm<2) cm=2;
    var e=den-tu, sai = lv<=2 ? [[den/10,'quen-doi'],[den*10,'nham-boi'],[den+10,'nham-bang'],[den-10,'nham-bang']] : [[den,'thieu-buoc'],[tu,'thieu-buoc'],[den+tu,'chon-sai-phep'],[e+5,'nham-bang'],[e-5,'nham-bang']];
    return {type:'num', _lv:lv, _cm:cm, _tu:tu, _den:den, q:thuocMm(cm,tu,den,ten)+'<div>Đoạn thẳng '+ten+' dài bao nhiêu mi-li-mét?</div>', ans:e, unit:'mm', sai:nhanSai(sai, e),
      goiY:gy({'thieu-buoc':'Đoạn không bắt đầu từ vạch 0: bé lấy số ở vạch cuối trừ số ở vạch đầu.'})};
  }, check:function(q){
    var t=docThuoc(q.q); if(!t || t.vach!==10*q._cm+1 || t.tu!==q._tu || t.den!==q._den || t.den>10*q._cm) return false;
    return q.ans===t.den-t.tu && t.den>t.tu && (q._lv>=3 || t.tu===0); }},

  /* D3 — Đổi cm và mm (Hoạt động 2) */
  {name:'Đổi cm và mm', sec:'Hoạt động 2 — 6 cm = 60 mm; 2 cm = 20 mm; 10 mm = 1 cm', mt:['MT2'], levels:3,
   muc:['2 cm = ? mm; 10 mm = ? cm.', '6 cm = ? mm; 30 mm = ? cm.', '9 cm = ? mm; 80 mm = ? cm.'],
   make:function(lv){
    var k = lv<=1 ? rnd(1,3) : (lv===2 ? rnd(4,7) : rnd(7,9)), dir=Math.random()<0.5, ans, bt, sai;
    if(dir){ ans=10*k; bt=k+' cm = '+oHoi()+' mm'; sai=[[k,'quen-doi'],[100*k,'nham-boi'],[10*k+10,'nham-bang'],[10*k-10,'nham-bang']]; }
    else { ans=k; bt=(10*k)+' mm = '+oHoi()+' cm'; sai=[[10*k,'quen-doi'],[k+1,'nham-bang'],[k-1,'nham-bang'],[100*k,'nham-boi']]; }
    return {type:'num', _lv:lv, _k:k, _dir:dir, q:kyHieu('Đổi đơn vị', bt), ans:ans, sai:nhanSai(sai, ans), goiY:gy()};
  }, check:function(q){ return q.ans===(q._dir ? 10*q._k : q._k) && q._k>=1 && q._k<=9; }},

  /* D4 — Mét và mi-li-mét (Hoạt động 2) */
  {name:'Mét và mi-li-mét', sec:'Hoạt động 2 — 1 000 mm = 1 m; 1 m = 100 cm', mt:['MT2'], levels:3,
   muc:['1 000 mm = ? m; 1 m = ? mm.', '1 m = ? cm; 1 cm = ? mm; 100 cm = ? m.', '2 m = ? cm; 3 000 mm = ? m (số lớn).'],
   make:function(lv){
    var ans, bt, sai;
    if(lv<=1){ if(Math.random()<0.5){ ans=1; bt='1 000 mm = '+oHoi()+' m'; sai=[[10,'nham-boi'],[100,'nham-boi'],[1000,'quen-doi']]; } else { ans=1000; bt='1 m = '+oHoi()+' mm'; sai=[[100,'nham-boi'],[10,'nham-boi'],[1,'quen-doi']]; } }
    else if(lv===2){ var c=pick([[1,'1 m = '+oHoi()+' cm',100],[2,'1 m = '+oHoi()+' mm',1000],[3,'1 cm = '+oHoi()+' mm',10],[4,'100 cm = '+oHoi()+' m',1]]); ans=c[2]; bt=c[1]; sai=[[ans*10,'nham-boi'],[ans*100,'nham-boi'],[ans%10===0 ? ans/10 : 0,'nham-boi'],[ans%100===0 ? ans/100 : 0,'nham-boi']]; }
    else { var k=rnd(2,9); if(Math.random()<0.5){ ans=100*k; bt=k+' m = '+oHoi()+' cm'; sai=[[k,'quen-doi'],[10*k,'nham-boi'],[1000*k,'nham-boi']]; } else { ans=k; bt=(1000*k)+' mm = '+oHoi()+' m'; sai=[[100*k,'nham-boi'],[10*k,'nham-boi'],[1000*k,'quen-doi']]; } }
    return {type:'num', _lv:lv, _ans:ans, q:kyHieu('Đổi đơn vị', bt), ans:ans, sai:nhanSai(sai, ans), goiY:gy()};
  }, check:function(q){ return q.ans===q._ans && q.ans>=1 && q.ans<=1000; }},

  /* D5 — Cùng số, khác đơn vị (Hoạt động 3) */
  {name:'Cùng số, khác đơn vị', sec:'Hoạt động 3 — Con kiến dài 3 mm, con ve sầu dài 3 cm: cùng số, khác đơn vị', mt:['MT2'], levels:3,
   muc:['Chọn đơn vị hợp với vật (con kiến dài 3 …).', 'Hai vật cùng số, khác đơn vị: vật nào dài hơn.', 'Hai độ dài khác số, khác đơn vị: đổi về cùng đơn vị rồi so sánh.'],
   make:function(lv){
    if(lv<=1){ var it=pick([['Con kiến',3,'mm'],['Hạt gạo',6,'mm'],['Cái bút chì',15,'cm'],['Quyển vở',20,'cm'],['Cái bàn học',120,'cm'],['Con ve sầu',3,'cm'],['Con ong',12,'mm']]);
      var ch=['mm','cm','m'], dung=it[2]; if(dung==='m') dung='cm';
      var sai={}; ch.forEach(function(c,i){ if(c!==dung) sai[String(i)]='nham-don-vi'; });
      return {type:'mcq', cot:1, _lv:1, _it:it, _dung:dung, q:'<div class="text-xl font-extrabold text-orange-600 my-1">'+it[0]+' dài '+it[1]+' …</div><div>Điền đơn vị nào cho hợp lí?</div>', choices:ch, correct:ch.indexOf(dung), sai:sai, goiY:gy({'nham-don-vi':'Bé nghĩ: vật bé xíu thì dùng mi-li-mét, vật dài hơn thì dùng xăng-ti-mét.'})}; }
    var x, y, ten1, ten2, dung2, ch2;
    if(lv===2){ var pa=pick([['Con kiến','Con ve sầu'],['Hạt gạo','Cái bút'],['Con ốc','Con sâu']]), a=rnd(2,9); x=a; y=a; var dao=Math.random()<0.5; ten1=dao?pa[1]:pa[0]; ten2=dao?pa[0]:pa[1];
      var u1=dao?'cm':'mm', u2=dao?'mm':'cm'; ch2=[ten1,ten2,'Hai vật dài bằng nhau']; dung2 = dao ? ten1 : ten2;
      var s2={}; s2[String(ch2.indexOf('Hai vật dài bằng nhau'))]='nham-don-vi';
      return {type:'mcq', cot:1, _lv:2, _a:a, _u1:u1, _u2:u2, _dung:dung2, _ten:[ten1,ten2], q:'<div>'+ten1+' dài <b>'+a+' '+u1+'</b>. '+ten2+' dài <b>'+a+' '+u2+'</b>. Vật nào dài hơn?</div>', choices:ch2, correct:ch2.indexOf(dung2), sai:s2, goiY:gy()}; }
    var X=rnd(11,59), Y=rnd(2,6); if(Math.random()<0.25) X=10*Y;
    ch2=[X+' mm dài hơn', Y+' cm dài hơn', 'Hai độ dài bằng nhau']; dung2 = X>10*Y ? ch2[0] : (X<10*Y ? ch2[1] : ch2[2]);
    var s3={}; ch2.forEach(function(c,i){ if(c!==dung2) s3[String(i)]=(c===ch2[2] ? 'quen-doi' : 'nham-don-vi'); });
    return {type:'mcq', cot:1, _lv:3, _X:X, _Y:Y, _dung:dung2, q:'<div>Em so sánh hai độ dài: <b>'+X+' mm</b> và <b>'+Y+' cm</b>. Độ dài nào lớn hơn?</div>', choices:ch2, correct:ch2.indexOf(dung2), sai:s3, goiY:gy({'chung':'Bé đổi '+Y+' cm ra mi-li-mét ('+Y+' × 10), rồi so sánh với '+X+'.'})};
  }, check:function(q){
    if(q._lv<=1){ var it=q._it, dung=it[2]==='m' ? 'cm' : it[2]; return q.choices.join()==='mm,cm,m' && q._dung===dung && q.choices[q.correct]===dung && (it[2]==='mm' ? it[1]<=12 : true); }
    if(q._lv===2){ var kiemU = q._u1!==q._u2, daiHon = q._u1==='cm' ? q._ten[0] : q._ten[1]; return kiemMCQ(q) && kiemU && q._dung===daiHon && q.choices.length===3; }
    var X=q._X, Y=q._Y, e = X>10*Y ? X+' mm dài hơn' : (X<10*Y ? Y+' cm dài hơn' : 'Hai độ dài bằng nhau'); return kiemMCQ(q) && q._dung===e; }},

  /* D6 — Cộng, trừ số đo (Luyện tập 1) */
  {name:'Cộng, trừ số đo', sec:'Luyện tập 1 — Tính: 250 mm + 100 mm; 420 mm − 150 mm; 25 mm + 3 mm; 64 mm − 15 mm', mt:['MT3'], levels:3,
   muc:['Cộng không nhớ (250 mm + 100 mm; 25 mm + 3 mm).', 'Trừ (420 mm − 150 mm; 64 mm − 15 mm).', 'Số có ba chữ số có nhớ (386 mm + 214 mm); 30 mm + 2 cm (đổi trước).'],
   make:function(lv){
    var a, b, ans, bt, sai, kind=lv<=1 ? 'c' : (lv===2 ? 't' : pick(['c3','t3','doi']));
    if(kind==='c'){ if(Math.random()<0.5){ a=50*rnd(2,8); b=50*rnd(1,6); } else { a=rnd(11,60); b=rnd(2,9); while((a%10)+b>=10){ a=rnd(11,60); b=rnd(2,9); } } ans=a+b; bt=a+' mm + '+b+' mm ='+oHoi(); sai=[[ans+10,'nham-bang'],[ans-10,'nham-bang'],[Math.abs(a-b),'chon-sai-phep']]; }
    else if(kind==='t'){ if(Math.random()<0.5){ a=10*rnd(20,90); b=10*rnd(5,(a/10)-5); } else { a=rnd(41,98); b=rnd(11,a-10); while(a%10>=b%10) { a=rnd(41,98); b=rnd(11,a-10); } } ans=a-b; bt=a+' mm − '+b+' mm ='+oHoi(); sai=[[a+b,'chon-sai-phep'],[ans+10,'nham-bang'],[ans-10,'nham-bang']]; }
    else if(kind==='c3'){ a=rnd(150,600); b=rnd(100,Math.min(500,990-a)); while((a%10)+(b%10)<10){ a=rnd(150,600); b=rnd(100,Math.min(500,990-a)); } ans=a+b; bt=a+' mm + '+b+' mm ='+oHoi(); sai=[[ans-10,'nham-bang'],[ans+10,'nham-bang'],[ans+100,'nham-bang'],[a-b>0?a-b:0,'chon-sai-phep']]; }
    else if(kind==='t3'){ a=rnd(400,990); b=rnd(120,a-100); while((a%10)>=(b%10)){ a=rnd(400,990); b=rnd(120,a-100); } ans=a-b; bt=a+' mm − '+b+' mm ='+oHoi(); sai=[[a+b>1000?0:a+b,'chon-sai-phep'],[ans+10,'nham-bang'],[ans-10,'nham-bang'],[ans+100,'nham-bang']]; }
    else { a=10*rnd(2,9); b=rnd(1,6); ans=a+10*b; bt=a+' mm + '+b+' cm ='+oHoi(); sai=[[a+b,'quen-doi'],[ans+10,'nham-bang'],[a+100*b,'nham-boi']]; }
    return {type:'num', _lv:lv, _kind:kind, _a:a, _b:b, q:kyHieu('Tính', bt), ans:ans, unit:'mm', sai:nhanSai(sai, ans), goiY:gy({'quen-doi':'Muốn cộng, bé đổi '+b+' cm ra mi-li-mét ('+b+' × 10) rồi cộng.'})};
  }, check:function(q){
    var a=q._a, b=q._b, k=q._kind, e = (k==='c' || k==='c3') ? a+b : (k==='doi' ? a+10*b : a-b);
    return q.ans===e && e>0 && e<=1000 && (k==='doi' || (k!=='c' && k!=='c3') || a+b<=1000); }},

  /* D7 — Nhân, chia số đo (Luyện tập 1) */
  {name:'Nhân, chia số đo', sec:'Luyện tập 1 — Tính: 11 mm × 3; 50 mm : 2', mt:['MT3'], levels:3,
   muc:['11 mm × 3; 50 mm : 2.', '12 mm × 4; 90 mm : 3.', '25 mm × 3; 96 mm : 4.'],
   make:function(lv){
    var nhan=Math.random()<0.5, a, b, ans, bt, sai;
    if(nhan){ a = lv<=1 ? rnd(11,20) : (lv===2 ? rnd(12,24) : rnd(21,32)); b = lv<=1 ? rnd(2,3) : (lv===2 ? rnd(3,4) : rnd(3,4)); while(a*b>=100){ a=rnd(11,24); } ans=a*b; bt=a+' mm × '+b+' ='+oHoi(); sai=[[a+b,'cong-thay-nhan'],[ans+10,'nham-bang'],[ans-10,'nham-bang'],[a*(b-1),'nham-bang']]; }
    else { b = lv<=1 ? 2 : (lv===2 ? 3 : pick([4,6])); ans = lv<=1 ? rnd(12,30) : (lv===2 ? rnd(12,33) : rnd(14,24)); a=b*ans; while(a>=100){ ans--; a=b*ans; } bt=a+' mm : '+b+' ='+oHoi(); sai=[[a-b,'chon-sai-phep'],[ans+1,'nham-bang'],[ans-1,'nham-bang'],[a*b,'nham-chieu']]; }
    return {type:'num', _lv:lv, _nhan:nhan, _a:a, _b:b, q:kyHieu('Tính', bt), ans:ans, unit:'mm', sai:nhanSai(sai, ans), goiY:gy()};
  }, check:function(q){ var a=q._a, b=q._b; return q.ans===(q._nhan ? a*b : a/b) && Number.isInteger(q.ans) && q.ans<100 && a<100; }},

  /* D8 — Gấp và giảm số đo (Luyện tập 2: nối đổi thành chọn một và đếm) */
  {name:'Gấp và giảm số đo', sec:'Luyện tập 2 — 16 mm gấp 5 lần; 78 mm giảm 3 lần: phép nào cho kết quả 80 mm', mt:['MT3'], levels:3,
   muc:['16 mm gấp 5 lần; 78 mm giảm 3 lần (một phép).', 'Phép nào cho kết quả 60 mm (chọn một trong bốn thẻ).', 'Trong tám thẻ, có mấy thẻ cho kết quả 60 mm.'],
   make:function(lv){
    if(lv<=1){ var gap=Math.random()<0.5, a, k, ans, bt, sai;
      if(gap){ a=rnd(12,19); k=rnd(3,5); while(a*k>=100){ a=rnd(12,19); } ans=a*k; bt=a+' mm gấp '+k+' lần ='+oHoi(); sai=[[a+k,'nham-gap-them'],[ans+10,'nham-bang'],[k,'nham-bang']]; }
      else { k=rnd(2,4); ans=rnd(12,30); a=k*ans; while(a>=100){ ans--; a=k*ans; } bt=a+' mm giảm '+k+' lần ='+oHoi(); sai=[[a-k,'chon-sai-phep'],[a*k,'nham-chieu'],[ans+1,'nham-bang']]; }
      return {type:'num', _lv:1, _gap:gap, _a:a, _k:k, q:kyHieu('Tính', bt), ans:ans, unit:'mm', sai:nhanSai(sai, ans), goiY:gy()}; }
    var T=pick([24,36,48,60,72,80]), sl = lv===2 ? 4 : 8, nd = lv===2 ? 1 : pick([2,3]), g, ds, dungDs=[];
    var vals=[]; for(g=2;g<=9;g++){ if(T%g===0 && T/g>=2) vals.push(T/g+' × '+g); if(T*g<100) vals.push((T*g)+' : '+g); } for(g=1;g<=60;g+=1){ if(g!==T && T-g>=2) { vals.push(g+' + '+(T-g)); } }
    var exact=vals.filter(function(t){ return tinhBT(t)===T; }), nhieu=[], i;
    for(g=0;g<300;g++){ var p=rnd(4,90), r=rnd(2,9), kind=rnd(0,2), t = kind===0 ? p+' × '+r : (kind===1 ? (p*r<100 ? (p*r)+' : '+r : p+' − '+r) : p+' + '+r); if(tinhBT(t)!==T && Number.isInteger(tinhBT(t)) && tinhBT(t)>0 && tinhBT(t)<100) nhieu.push(t); }
    shuffle(exact); shuffle(nhieu); var d=exact.slice(0,nd), kh=[]; for(i=0;i<nhieu.length && kh.length<sl-nd;i++){ if(kh.every(function(x){ return tinhBT(x)!==tinhBT(nhieu[i]); }) && tinhBT(nhieu[i])!==T) kh.push(nhieu[i]); }
    ds=shuffle(d.concat(kh));
    if(lv===2){ var dung=d[0];
      return {type:'mcq', cot:1, _lv:2, _ds:ds, _T:T, _dung:dung, q:theTinh(ds)+'<div>Mỗi thẻ là một số đo tính bằng mi-li-mét. Phép tính nào có kết quả bằng <b class="text-2xl text-orange-600">'+T+'</b>?</div>', choices:ds, correct:ds.indexOf(dung), goiY:gy({'chung':'Bé tính kết quả của từng thẻ, rồi tìm thẻ bằng '+T+'.'})}; }
    var dem=ds.filter(function(t){ return tinhBT(t)===T; }).length;
    return {type:'num', _lv:3, _ds:ds, _T:T, q:theTinh(ds)+'<div>Mỗi thẻ là một số đo tính bằng mi-li-mét. Có bao nhiêu thẻ có kết quả bằng <b class="text-2xl text-orange-600">'+T+'</b>?</div>', ans:dem, unit:'thẻ', sai:nhanSai([[dem+1,'dem-sot-phep'],[dem-1,'dem-sot-phep'],[dem+2,'dem-sot-phep']], dem), goiY:gy()};
  }, check:function(q){
    if(q._lv<=1){ var e = q._gap ? q._a*q._k : q._a/q._k; return Number.isInteger(e) && q.ans===e && e<100; }
    var ds=q._ds, v=ds.map(function(t){ return tinhBT(t); }); if(!v.every(Number.isInteger) || v.some(function(x){ return x<=0 || x>=100; })) return false;
    var dem=v.filter(function(x){ return x===q._T; }).length;
    if(docThe(q.q).join('|')!==ds.join('|')) return false;
    if(q._lv===2) return kiemMCQ(q) && ds.length===4 && dem===1 && tinhBT(q._dung)===q._T;
    return ds.length===8 && q.ans===dem && dem>=2 && dem<=3; }},

  /* D9 — Ốc sên và cào cào (Luyện tập 3, 4) */
  {name:'Ốc sên và cào cào', sec:'Luyện tập 3, 4 — Ốc sên bò 152 mm rồi 264 mm; cào cào dài 12 mm, con kia gấp 3 lần', mt:['MT4'], levels:3,
   muc:['Cào cào dài 12 mm, con kia gấp 3 lần: con kia dài bao nhiêu.', 'Ốc sên bò hai quãng 152 mm và 264 mm: tất cả.', 'Cả hai con cào cào; quãng đường còn lại.'],
   make:function(lv){
    var a, b, k, ans, cau, lead, sai, loai='gap';
    if(lv<=1){ a=rnd(10,30); k=rnd(2,4); while(a*(k+1)>=100){ a=rnd(10,24); } ans=a*k; lead='Con cào cào dài <b>'+a+' mm</b>. Con kia dài <b>gấp '+k+' lần</b> con cào cào.'; cau='Hỏi con kia dài bao nhiêu mi-li-mét?'; sai=[[a+k,'nham-gap-them'],[ans+a,'tra-loi-sai-buoc'],[ans+10,'nham-bang']]; }
    else if(lv===2){ loai='bo'; a=rnd(110,490); b=rnd(110,490); ans=a+b; lead='Con ốc sên bò quãng đầu dài <b>'+a+' mm</b>, quãng sau dài <b>'+b+' mm</b>.'; cau='Hỏi con ốc sên bò tất cả bao nhiêu mi-li-mét?'; sai=[[ans+10,'nham-bang'],[ans-10,'nham-bang'],[ans+100,'nham-bang'],[Math.abs(a-b),'chon-sai-phep']]; }
    else if(Math.random()<0.5){ a=rnd(10,24); k=rnd(2,3); while(a*(k+1)>=100){ a=rnd(10,24); } ans=a+a*k; lead='Con cào cào dài <b>'+a+' mm</b>. Con kia dài <b>gấp '+k+' lần</b> con cào cào.'; cau='Hỏi cả hai con dài bao nhiêu mi-li-mét?'; sai=[[a*k,'tra-loi-sai-buoc'],[2*a+k,'nham-gap-them'],[a,'thieu-buoc'],[ans+10,'nham-bang']]; }
    else { loai='conlai'; var L=10*rnd(60,95); a=rnd(110,300); b=rnd(110,300); while(a+b>=L-20){ a=rnd(110,300); b=rnd(110,300); } ans=L-a-b; lead='Con ốc sên phải bò quãng đường dài <b>'+so(L)+' mm</b>. Nó đã bò quãng đầu <b>'+a+' mm</b> và quãng sau <b>'+b+' mm</b>.'; cau='Hỏi con ốc sên còn phải bò bao nhiêu mi-li-mét nữa?'; sai=[[L-a,'tra-loi-sai-buoc'],[a+b,'thieu-buoc'],[ans+10,'nham-bang'],[ans-10,'nham-bang'],[L+a+b>1000?0:L+a+b,'chon-sai-phep']]; }
    return {type:'num', _lv:lv, _loai:loai, _a:a, _b:b, _k:k, _L:typeof L==='undefined' ? 0 : L, q:'<div>'+lead+'</div><div class="mt-1">'+cau+'</div>', ans:ans, unit:'mm', sai:nhanSai(sai, ans),
      goiY:gy({'tra-loi-sai-buoc':'Bé đọc lại câu hỏi cuối: còn một bước nữa mới ra đáp số.', 'thieu-buoc':'Bé làm đủ các bước: tìm số của con kia, rồi cộng hai con.'})};
  }, check:function(q){
    var a=q._a, b=q._b, k=q._k, e;
    if(q._loai==='gap'){ e = q._lv<=1 ? a*k : a+a*k; return q.ans===e && a*(k+1)<100; }
    if(q._loai==='bo') return q.ans===a+b && a+b<=1000;
    return q._L>0 && q.ans===q._L-a-b && q.ans>0; }},

  /* D10 — Bạn nói đúng hay sai (không có trong SGK) */
  {name:'Bạn nói đúng hay sai', sec:'Tìm lỗi — 30 mm = 3 cm đúng hay sai; bạn An nói 3 cm bằng 3 mm', mt:['MT4'], levels:3,
   muc:['Đúng / Sai: một phép đổi cm và mm.', 'Bạn An nói k cm bằng x mm: em thấy thế nào.', 'Bạn An nói k m bằng x cm: em thấy thế nào.'],
   make:function(lv){
    var k;
    if(lv<=1){ k=rnd(2,9); var dung=Math.random()<0.5, dir=Math.random()<0.5, x = dung ? 10*k : pick([k, 100*k, 10*k+10]), tr=(x===10*k), tag = x===k ? 'nham-don-vi' : (x===100*k ? 'nham-boi' : 'nham-bang');
      var ph = dir ? k+' cm = '+x+' mm.' : x+' mm = '+k+' cm.'; if(!dir){ x = dung ? 10*k : pick([k, 100*k]); tr=(x===10*k); tag = x===k ? 'nham-don-vi' : 'nham-boi'; ph=x+' mm = '+k+' cm.'; }
      return {type:'mcq', figFn:dsBtn30, _lv:1, _k:k, _x:x, _dir:dir, _dung:(tr?'Đ':'S'), q:'<div class="text-xl font-extrabold text-orange-700 my-2">'+ph+'</div><div class="text-base text-slate-500">Đúng (Đ) hay sai (S)?</div>', choices:['Đ','S'], correct:(tr?0:1), sai:(tr?{}:{'0':tag}), goiY:gy()}; }
    if(lv===2){ k=rnd(2,9); var T=10*k, x2 = Math.random()<0.5 ? T : pick([k,100*k]), mo=function(n){ return k+' × 10 = '+n; }, hn=haiNhanXet(x2,T,mo), sai={}; sai[String(1-hn.correct)] = x2===T ? 'nham-bang' : (x2===k ? 'nham-don-vi' : 'nham-boi');
      return {type:'mcq', cot:1, _lv:2, _k:k, _x:x2, _T:T, _ds:hn.ds, _dung:hn.choices[hn.correct], q:nguoi('boy','Bạn An')+'<div>Bạn An nói: «<b>'+k+' cm</b> bằng <b>'+x2+' mm</b>.» Em thấy thế nào?</div>', choices:hn.choices, correct:hn.correct, sai:sai, goiY:gy({'chung':'Bé nhớ 1 cm = 10 mm, rồi tính '+k+' × 10.'})}; }
    k=rnd(2,9); var T3=100*k, x3 = Math.random()<0.5 ? T3 : pick([k,10*k]), mo3=function(n){ return '1 m = 100 cm, '+k+' × 100 = '+n; }, hn3=haiNhanXet(x3,T3,mo3), sai3={}; sai3[String(1-hn3.correct)] = x3===T3 ? 'nham-bang' : (x3===k ? 'nham-don-vi' : 'nham-boi');
    return {type:'mcq', cot:1, _lv:3, _k:k, _x:x3, _T:T3, _ds:hn3.ds, _dung:hn3.choices[hn3.correct], q:nguoi('boy','Bạn An')+'<div>Bạn An nói: «<b>'+k+' m</b> bằng <b>'+x3+' cm</b>.» Em thấy thế nào?</div>', choices:hn3.choices, correct:hn3.correct, sai:sai3, goiY:gy({'chung':'Bé nhớ 1 m = 100 cm, rồi tính '+k+' × 100.'})};
  }, check:function(q){
    var k=q._k;
    if(q._lv<=1) return q.choices.join()==='Đ,S' && (q._dung==='Đ')===(q._x===10*k) && q.correct===(q._x===10*k?0:1);
    return kiemNhanXet(q) && q._T===(q._lv===2 ? 10*k : 100*k) && q._T<=1000; }}
 ]
};
