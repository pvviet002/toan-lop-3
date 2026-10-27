/* bai-53.js — Bài 53: Luyện tập chung (Tập 2, Chủ đề 9). BÀI MỚI, Engine v2 — LUYỆN THÔNG MINH.
   Theo bảng phân tích sư phạm đã duyệt (phan-tich-su-pham/bai-53.md): 3 MỤC TIÊU (muctieu) × 10 DẠNG (topics), mỗi dạng 3 mức (Thông tư 27).
   Ôn lại bài 50–52. Mọi hàm chép nguyên từ bài 50–52 (mỗi bài một tệp): daGiac, baHinh (bài 50); khungLuoi, oLuoi, polyo (bài 51); hinhGhep (bài 52).
   Hình mới: gachHang (gạch ghép), vuonCoc (vườn có cọc rào), nhaHinh (miếng bìa ngôi nhà trên lưới). Mỗi ô vuông là 1 cm².
   check() đọc lại hình từ chuỗi SVG (data-seg, data-gach, data-coc, data-cell, data-tam, data-hinh, data-w1) và tính lại. QUY TẮC: nối chuỗi, KHÔNG backtick, KHÔNG template literal. */

var NB='\u00a0';
/* ---- Tiện ích chung ---- */
function nhanSai(ds, dung){ var o={}; ds.forEach(function(p){ var v=p[0]; if(Number.isInteger(v) && v>0 && v!==dung && !(String(v) in o)) o[String(v)]=p[1]; }); return o; }
function kiemMCQ(q){ return q.choices[q.correct]===q._dung && new Set(q.choices).size===q.choices.length; }
function svgX(w, h, px){ return svgHinh(w, h, px).replace('<svg ', '<svg class="text-slate-700" '); }
function khungHinh(s){ return '<div class="flex justify-center my-2">'+s+'</svg></div>'; }
function nguoi(ten, alt){ return '<div class="flex justify-center mb-1">'+anh(ten, 72, alt)+'</div>'; }
function lapMCQ(dungStr, cacSai){
 var seen={}, ds=[]; seen[dungStr]=1; cacSai.forEach(function(p){ if(p[0] && !seen[p[0]]){ seen[p[0]]=1; ds.push(p); } });
 var opts=[[dungStr,'']].concat(ds.slice(0,3)); opts=shuffle(opts); var sai={};
 opts.forEach(function(o,i){ if(o[0]!==dungStr) sai[String(i)]=o[1]; });
 var cs=opts.map(function(o){ return o[0]; });
 return {choices:cs, correct:cs.indexOf(dungStr), sai:sai, _dung:dungStr};
}
function sx(n){ var s=String(n); return s.length>=4 ? s.slice(0,s.length-3)+NB+s.slice(-3) : s; }
var P_TAM=[[150,22],[262,110],[38,110]], P_TU=[[78,26],[232,36],[258,112],[44,104]], P_CN=[[66,34],[234,34],[234,108],[66,108]], P_VUONG=[[106,30],[194,30],[194,118],[106,118]], P_NGU=[[150,18],[256,58],[218,114],[82,114],[44,58]];
/* đa giác: pts toạ độ đỉnh; nhan[i] = {v:số đo, u:đơn vị} hoặc {v:'?'} cho cạnh pts[i] đến pts[i+1], hoặc null (không ghi) */
function daGiac(pts, nhan, ten){
 var n=pts.length, cx=0, cy=0, i, s=svgX(300,150,300), d='';
 pts.forEach(function(p){ cx+=p[0]; cy+=p[1]; }); cx/=n; cy/=n;
 for(i=0;i<n;i++) d+=(i? ' L':'M')+pts[i][0]+' '+pts[i][1];
 s+='<path d="'+d+' Z" fill="'+HM.vang+'" stroke="'+HM.vangDam+'" stroke-width="5" stroke-linejoin="round"/>';
 for(i=0;i<n;i++){
  var a=pts[i], b=pts[(i+1)%n], mx=(a[0]+b[0])/2, my=(a[1]+b[1])/2, vx=mx-cx, vy=my-cy, L=Math.sqrt(vx*vx+vy*vy)||1, tx=mx+vx/L*24, ty=my+vy/L*18+5, nh=nhan[i];
  if(!nh) continue;
  s+='<g data-seg="'+nh.v+'"'+(nh.u ? ' data-dv="'+nh.u+'"' : '')+'><text x="'+tx.toFixed(1)+'" y="'+ty.toFixed(1)+'" text-anchor="middle" font-size="15" '+HFONT+' fill="currentColor">'+(nh.v==='?' ? '?' : nh.v+' '+nh.u)+'</text></g>';
 }
 (ten||[]).forEach(function(t,k){ s+='<text x="'+(pts[k][0]+(pts[k][0]<cx ? -14 : 14))+'" y="'+(pts[k][1]+(pts[k][1]<cy ? -6 : 16))+'" text-anchor="middle" font-size="14" '+HFONT+' fill="currentColor">'+t+'</text>'; });
 return s;
}
function docCanh(html){ var re=/data-seg="(\d+|\?)"(?: data-dv="(\w+)")?/g, m, v=[]; while((m=re.exec(html))) v.push({v:m[1]==='?' ? null : +m[1], u:m[2]||''}); return v; }
/* ba hình A, B, C (chữ nhật, vuông): mỗi hình data-hinh="loai,a,b,dv" */
function baHinh(hs, dv){
 var s=svgX(300,130,300), i, x, h, nhan;
 for(i=0;i<hs.length;i++){
  h=hs[i]; x=6+i*98;
  s+='<g data-hinh="'+h.k+','+h.a+','+h.b+','+dv+'">';
  if(h.k==='v'){ s+='<rect x="'+(x+12)+'" y="34" width="52" height="52" fill="'+HM.vang+'" stroke="'+HM.vangDam+'" stroke-width="4"/><text x="'+(x+38)+'" y="26" text-anchor="middle" font-size="15" '+HFONT+' fill="currentColor">'+h.a+' '+dv+'</text>'; }
  else { s+='<rect x="'+(x+4)+'" y="40" width="'+(h.a>=h.b ? 54 : 34)+'" height="'+(h.a>=h.b ? 36 : 56)+'" fill="'+HM.vang+'" stroke="'+HM.vangDam+'" stroke-width="4"/>';
   s+='<text x="'+(x+4+(h.a>=h.b ? 27 : 17))+'" y="32" text-anchor="middle" font-size="15" '+HFONT+' fill="currentColor">'+h.a+' '+dv+'</text><text x="'+(x+(h.a>=h.b ? 64 : 44))+'" y="'+(h.a>=h.b ? 63 : 73)+'" text-anchor="start" font-size="15" '+HFONT+' fill="currentColor">'+h.b+'</text>'; }
  s+='<text x="'+(x+38)+'" y="118" text-anchor="middle" font-size="16" '+HFONT+' fill="currentColor">'+'Hình '+['A','B','C'][i]+'</text></g>';
 }
 return s;
}
function docBaHinh(html){ var re=/data-hinh="(\w),(\d+),(\d+),(\w+)"/g, m, v=[]; while((m=re.exec(html))) v.push({k:m[1], a:+m[2], b:+m[3], dv:m[4]}); return v; }
function chuViHinh(h){ return h.k==='v' ? h.a*4 : (h.a+h.b)*2; }
function khungLuoi(W, H, x0, y0, cs){
 var s='<rect x="'+x0+'" y="'+y0+'" width="'+(W*cs)+'" height="'+(H*cs)+'" fill="#fff" stroke="'+HM.day+'" stroke-width="1.5"/>', i;
 for(i=1;i<W;i++) s+='<line x1="'+(x0+i*cs)+'" y1="'+y0+'" x2="'+(x0+i*cs)+'" y2="'+(y0+H*cs)+'" stroke="'+HM.day+'" stroke-width="1"/>';
 for(i=1;i<H;i++) s+='<line x1="'+x0+'" y1="'+(y0+i*cs)+'" x2="'+(x0+W*cs)+'" y2="'+(y0+i*cs)+'" stroke="'+HM.day+'" stroke-width="1"/>';
 return s;
}
/* hình xếp bằng ô vuông: cells [[c,r]]; x0, y0, cs: cỡ ô; W, H: số ô khung; ten: tên phần; mau: màu; nhãn dưới */
function oLuoi(cells, ten, mau, x0, y0, cs){
 var s='', i;
 cells.forEach(function(c){ s+='<rect data-cell="'+ten+','+c[0]+','+c[1]+'" x="'+(x0+c[0]*cs)+'" y="'+(y0+c[1]*cs)+'" width="'+cs+'" height="'+cs+'" fill="'+mau+'" stroke="'+HM.troiDam+'" stroke-width="1.5"/>'; });
 return s;
}
function docO(html){ var re=/data-cell="(\w),(\d+),(\d+)"/g, m, o={}; while((m=re.exec(html))){ o[m[1]]=(o[m[1]]||[]); o[m[1]].push([+m[2], +m[3]]); } return o; }
/* hình liền nối n ô trong khung W x H */
function polyo(n, W, H){
 for(var g=0; g<400; g++){
  var cells=[[rnd(0,W-1), rnd(0,H-1)]], key={}, t=0; key[cells[0][0]+','+cells[0][1]]=1;
  while(cells.length<n && t++<400){
   var b=pick(cells), d=pick([[1,0],[-1,0],[0,1],[0,-1]]), c=b[0]+d[0], r=b[1]+d[1];
   if(c<0 || r<0 || c>=W || r>=H || key[c+','+r]) continue; key[c+','+r]=1; cells.push([c,r]);
  }
  if(cells.length===n) return cells;
 }
 return [[0,0]];
}
function lienNoi(cells){ var key={}, i; cells.forEach(function(c){ key[c[0]+','+c[1]]=1; }); var seen={}, st=[cells[0]]; seen[cells[0][0]+','+cells[0][1]]=1; var cnt=0;
 while(st.length){ var c=st.pop(); cnt++; [[1,0],[-1,0],[0,1],[0,-1]].forEach(function(d){ var k=(c[0]+d[0])+','+(c[1]+d[1]); if(key[k] && !seen[k]){ seen[k]=1; st.push([c[0]+d[0], c[1]+d[1]]); } }); }
 return cnt===cells.length;
}
/* hình ghép: hai hình chữ nhật (hoặc vuông + chữ nhật) đặt cạnh nhau, đáy thẳng hàng */
function hinhGhep(w1, h1, w2, h2){
 var u=Math.min(Math.floor(200/(w1+w2)*10)/10, 100/Math.max(h1,h2)), tot=(w1+w2)*u, x0=(300-tot)/2, base=130, s=svgX(300,156,300).replace('<svg ','<svg data-w1="'+w1+'" data-h1="'+h1+'" data-w2="'+w2+'" data-h2="'+h2+'" ');
 s+='<rect x="'+x0+'" y="'+(base-h1*u)+'" width="'+(w1*u)+'" height="'+(h1*u)+'" fill="'+HM.troi+'" stroke="'+HM.troiDam+'" stroke-width="3"/><rect x="'+(x0+w1*u)+'" y="'+(base-h2*u)+'" width="'+(w2*u)+'" height="'+(h2*u)+'" fill="'+HM.hong+'" stroke="'+HM.troiDam+'" stroke-width="3"/>';
 s+='<text x="'+(x0+w1*u/2)+'" y="'+(base-h1*u-6)+'" text-anchor="middle" font-size="15" '+HFONT+' fill="currentColor">'+w1+' cm</text><text x="'+(x0+w1*u+w2*u/2)+'" y="'+(base-h2*u-6)+'" text-anchor="middle" font-size="15" '+HFONT+' fill="currentColor">'+w2+' cm</text>';
 if(h1!==w1) s+='<text x="'+(x0-5)+'" y="'+(base-h1*u/2+5)+'" text-anchor="end" font-size="15" '+HFONT+' fill="currentColor">'+h1+' cm</text>';
 s+='<text x="'+(x0+tot+5)+'" y="'+(base-h2*u/2+5)+'" text-anchor="start" font-size="15" '+HFONT+' fill="currentColor">'+h2+' cm</text>';
 return s;
}
function docGhep(html){ var m=/data-w1="(\d+)" data-h1="(\d+)" data-w2="(\d+)" data-h2="(\d+)"/.exec(html); return m ? {w1:+m[1], h1:+m[2], w2:+m[3], h2:+m[4]} : null; }
function dienTichHinh(h){ return h.k==='v' ? h.a*h.a : h.a*h.b; }

var M2=' cm²';
var GOI={'nham-bang':'Bé tính lại từng bước cho đúng nhé.',
  'nham-chu-vi-canh':'Hình vuông có bốn cạnh bằng nhau: chu vi bằng cạnh × 4, nên cạnh bằng chu vi : 4.',
  'quen-doi-don-vi':'Muốn tính chu vi, các số đo phải cùng đơn vị. Đổi 1 dm = 10 cm, 1 m = 10 dm rồi mới tính.',
  'nhan-chu-vi':'Chu vi là (dài + rộng) × 2. Diện tích là dài × rộng. Hai việc khác nhau!',
  'dem-sot-o':'Bé đếm từng ô vuông, không bỏ sót, không đếm trùng. Phần bị cắt đi thì không đếm.',
  'dem-sot-coc':'Hai cọc liền nhau cách nhau 1 m: có bao nhiêu cọc quanh vườn thì hàng rào dài bấy nhiêu mét. Bé đếm từng cọc một lần.',
  'thieu-buoc':'Bài này có hai bước. Bé làm đủ các bước nhé!',
  'cong-chu-vi-vien':'Khi ghép các viên gạch, cạnh chung nằm bên trong nên không tính vào chu vi cả hình.'};
function gy(extra){ var o={}, k; for(k in GOI) o[k]=GOI[k]; for(k in (extra||{})) o[k]=extra[k]; return o; }

/* ---- Hình (mới trong bài này) ---- */
/* k viên gạch vuông cạnh s xếp thành một hàng */
function gachHang(s, k){
 var t=Math.min(56, Math.floor(250/k)), tot=t*k, x0=Math.round((300-tot)/2), o=svgX(300,t+54,300).replace('<svg ','<svg data-gach="'+s+','+k+'" '), i;
 for(i=0;i<k;i++) o+='<rect x="'+(x0+i*t)+'" y="26" width="'+t+'" height="'+t+'" fill="'+HM.goNhat+'" stroke="'+HM.go+'" stroke-width="3"/>';
 o+='<text x="'+(x0+t/2)+'" y="18" text-anchor="middle" font-size="15" '+HFONT+' fill="currentColor">'+s+' cm</text><text x="150" y="'+(t+46)+'" text-anchor="middle" font-size="15" '+HFONT+' fill="currentColor">'+k+' viên gạch ghép thành hình chữ nhật</text>';
 return o;
}
function docGach(html){ var m=/data-gach="(\d+),(\d+)"/.exec(html); return m ? {s:+m[1], k:+m[2]} : null; }
/* vườn hoa có hàng rào: cọc cách nhau 1 m, mỗi cọc là một chấm data-coc; vs = [{t, a, b}] (t rỗng nếu chỉ một vườn) */
function vuonCoc(vs){
 var n=vs.length, cw=300/n, o=svgX(300,150,300), i, t, d;
 vs.forEach(function(v,i2){
  var u=Math.min((cw-26)/v.a, 96/v.b), x0=i2*cw+(cw-v.a*u)/2, y0=22, P=2*(v.a+v.b), p, x, y;
  o+='<rect x="'+x0+'" y="'+y0+'" width="'+(v.a*u)+'" height="'+(v.b*u)+'" fill="'+HM.la+'" opacity="0.55"/>';
  for(t=0;t<P;t++){
   if(t<v.a){ x=t; y=0; } else if(t<v.a+v.b){ x=v.a; y=t-v.a; } else if(t<2*v.a+v.b){ x=v.a-(t-v.a-v.b); y=v.b; } else { x=0; y=v.b-(t-2*v.a-v.b); }
   o+='<circle data-coc="'+(v.t||'V')+'" cx="'+(x0+x*u).toFixed(1)+'" cy="'+(y0+y*u).toFixed(1)+'" r="'+(u>=14 ? 4.5 : 3.4)+'" fill="'+HM.goDam+'"/>';
  }
  if(v.t) o+='<text x="'+(i2*cw+cw/2)+'" y="'+(y0+v.b*u+26)+'" text-anchor="middle" font-size="15" '+HFONT+' fill="currentColor">Vườn '+v.t+'</text>';
 });
 return o;
}
function docCoc(html){ var re=/data-coc="(\w)"/g, m, o={}; while((m=re.exec(html))) o[m[1]]=(o[m[1]]||0)+1; return o; }
/* miếng bìa hình ngôi nhà cắt trên lưới 7 x 7: thân 5 x 4 ô, mái 3 hàng; mỗi miếng cắt bỏ vài ô (cửa, cửa sổ) */
var NHA=(function(){ var c=[], i, j; for(i=1;i<=5;i++) for(j=3;j<=6;j++) c.push([i,j]); [[1,2],[2,2],[3,2],[4,2],[5,2],[2,1],[3,1],[4,1],[3,0]].forEach(function(x){ c.push(x); }); return c; })();
var LO=[[3,6],[3,5],[2,4],[4,4],[2,3],[4,3],[1,4],[5,4]];
function nhaCat(r){
 for(var g=0; g<200; g++){
  var lo=shuffle(LO.slice()).slice(0,r), key={}; lo.forEach(function(x){ key[x[0]+','+x[1]]=1; });
  var cells=NHA.filter(function(c){ return !key[c[0]+','+c[1]]; }); if(lienNoi(cells)) return cells;
 }
 return NHA;
}
function nhaHinh(rs, ten, cs){
 var n=rs.length, W=7, o=svgX(300,n===1 ? 7*cs+40 : 7*cs+44,300), i, x0;
 rs.forEach(function(r,i2){ x0=n===1 ? Math.round((300-W*cs)/2) : 6+i2*98; o+=khungLuoi(W,W,x0,6,cs)+oLuoi(nhaCat(r),ten[i2],HM.vang,x0,6,cs); if(n>1) o+='<text x="'+(x0+W*cs/2)+'" y="'+(6+W*cs+24)+'" text-anchor="middle" font-size="16" '+HFONT+' fill="currentColor">Miếng '+ten[i2]+'</text>'; });
 return o;
}
var AN=29;

var BAI = {
 n: 53,
 title: 'Luyện Tập Chung (Chủ Đề 9)',
 sub: 'Luyện thông minh: câu hỏi tự đổi theo bé — làm hết lượt để xem ngọn lửa!',
 goal: 10, soCau: 18, soCauToiDa: 24,
 loi: {'nham-bang':'Tính sai', 'nham-chu-vi-canh':'Nhầm giữa chu vi và cạnh hình vuông', 'quen-doi-don-vi':'Quên đổi đơn vị trước khi tính', 'nhan-chu-vi':'Nhầm chu vi với diện tích', 'dem-sot-o':'Đếm sót hoặc đếm trùng ô vuông', 'dem-sot-coc':'Đếm sót hoặc đếm trùng cọc', 'thieu-buoc':'Thiếu một bước', 'cong-chu-vi-vien':'Cộng chu vi từng viên gạch'},
 muctieu: [
  {id:'MT1', ten:'Chu vi (bảng, đổi đơn vị, gạch ghép, hàng rào)', muc:['Hình vuông cạnh 20: chu vi; chữ nhật 2 dm × 5 cm; hai viên gạch ghép; đếm cọc quanh vườn.', 'Biết chu vi hình vuông, tìm cạnh; chữ nhật 1 m × 2 dm; ba viên gạch (90 × 30); vườn nào có hàng rào dài hơn.', 'Chu vi 100, cạnh 25; chữ nhật 3 dm × 15 cm; bốn viên gạch; ba vườn, hàng rào ngắn nhất.']},
  {id:'MT2', ten:'Diện tích (công thức, đếm ô)', muc:['Hình vuông cạnh 9; đếm ô một miếng bìa ngôi nhà.', 'Chữ nhật 9 × 6; hai miếng bìa nào có diện tích bằng nhau.', 'Chữ nhật rộng 6, dài gấp đôi; miếng bìa nào lớn nhất.']},
  {id:'MT3', ten:'Bài toán chu vi, diện tích', muc:['Võ đài chu vi 36: cạnh; sàn nhà một tấm gỗ; hình H nhỏ; tính chu vi tờ giấy.', 'Võ đài: diện tích; sàn nhà nhiều tấm gỗ; hình H (6 × 8 và 10 × 7); giấy của Nam.', 'Võ đài chu vi 48; sàn nhà nhiều tấm; hình H số lớn; ai cầm tờ giấy nào.']}
 ],
 topics: [
  /* D1 — Bảng hình vuông (bài 1) */
  {name:'Bảng hình vuông', sec:'Bài 1 — hình vuông cạnh 20 cm có chu vi 80 cm; chu vi 40 cm có cạnh 10 cm; chu vi 100 cm có cạnh 25 cm', mt:['MT1'], levels:3,
   muc:['Biết cạnh, tính chu vi (cạnh 20, 5, ...).', 'Biết chu vi, tìm cạnh (chu vi 40).', 'Biết chu vi lớn, tìm cạnh (chu vi 100).'],
   make:function(lv){
    var a, ans, q, ve, sai;
    if(lv<=1){ a=pick([5,6,7,8,10,12,15,20,25,30]); ans=a*4; ve=daGiac(P_VUONG,[{v:a,u:'cm'},null,null,null]); q='<div>Hình vuông có cạnh <b>'+a+' cm</b>. Chu vi hình vuông là bao nhiêu xăng-ti-mét?</div>'; sai=[[a*2,'nham-chu-vi-canh'],[a*a,'nhan-chu-vi'],[a+4,'nham-chu-vi-canh'],[ans+4,'nham-bang']]; }
    else if(lv===2){ a=rnd(5,15); ans=a; ve=daGiac(P_VUONG,[{v:'?'},null,null,null]); q='<div>Hình vuông có chu vi <b>'+(a*4)+' cm</b>. Cạnh hình vuông (ghi dấu ?) là bao nhiêu xăng-ti-mét?</div>'; sai=[[a*4,'nham-chu-vi-canh'],[a*2,'nham-chu-vi-canh'],[a+1,'nham-bang'],[a-1,'nham-bang'],[a*a,'nhan-chu-vi']]; }
    else { a=rnd(16,50); ans=a; ve=daGiac(P_VUONG,[{v:'?'},null,null,null]); q='<div>Hình vuông có chu vi <b>'+(a*4)+' cm</b>. Cạnh hình vuông (ghi dấu ?) là bao nhiêu xăng-ti-mét?</div>'; sai=[[a*2,'nham-chu-vi-canh'],[a*4,'nham-chu-vi-canh'],[a+2,'nham-bang'],[a-2,'nham-bang'],[a*4-a,'nham-bang']]; }
    return {type:'num', _lv:lv, _a:a, q:khungHinh(ve)+q, ans:ans, sai:nhanSai(sai, ans), goiY:gy()};
  }, check:function(q){ var cs=docCanh(q.q), a=q._a; if(cs.length!==1) return false;
    if(q._lv<=1) return cs[0].v===a && cs[0].u==='cm' && q.ans===a*4 && q.q.indexOf('<b>'+a+' cm</b>')>=0;
    return cs[0].v===null && q.ans===a && q.q.indexOf('<b>'+(a*4)+' cm</b>')>=0 && (q._lv===2 ? a<=15 : a>=16); }},

  /* D2 — Chữ nhật đổi đơn vị (bài 2) */
  {name:'Chu vi hình chữ nhật đổi đơn vị', sec:'Bài 2 — chữ nhật 2 dm × 5 cm: (20 + 5) × 2 = 50 cm; 1 m × 2 dm: (10 + 2) × 2 = 24 dm', mt:['MT1'], levels:3,
   muc:['Chiều dài dm, chiều rộng cm: đáp số cm.', 'Chiều dài m, chiều rộng dm: đáp số dm.', 'Số đo lớn hơn, dài dm, rộng cm.'],
   make:function(lv){
    var d, r, du, ru, ans, uu, sai;
    if(lv<=1){ d=rnd(2,4); r=rnd(5,9); du='dm'; ru='cm'; ans=(d*10+r)*2; uu='xăng-ti-mét'; sai=[[(d+r)*2,'quen-doi-don-vi'],[d*10+r,'quen-doi-don-vi'],[(d*10+r)*2+10,'nham-bang'],[d*2+r*2*10,'quen-doi-don-vi']]; }
    else if(lv===2){ d=rnd(1,2); r=rnd(2,5); du='m'; ru='dm'; ans=(d*10+r)*2; uu='đề-xi-mét'; sai=[[(d+r)*2,'quen-doi-don-vi'],[(d*100+r)*2,'quen-doi-don-vi'],[d*10+r,'quen-doi-don-vi'],[ans+2,'nham-bang']]; }
    else { d=rnd(3,6); r=rnd(10,25); du='dm'; ru='cm'; ans=(d*10+r)*2; uu='xăng-ti-mét'; sai=[[(d+r)*2,'quen-doi-don-vi'],[d*10+r,'quen-doi-don-vi'],[(d*10+r)*2+10,'nham-bang'],[d*r*2,'quen-doi-don-vi']]; }
    return {type:'num', _lv:lv, q:khungHinh(daGiac(P_CN,[{v:d,u:du},{v:r,u:ru},null,null]))+'<div>Hình chữ nhật có chiều dài <b>'+d+' '+du+'</b>, chiều rộng <b>'+r+' '+ru+'</b>. Chu vi hình chữ nhật là bao nhiêu '+(uu==='xăng-ti-mét' ? 'xăng-ti-mét (cm)' : 'đề-xi-mét (dm)')+'?</div>', ans:ans, sai:nhanSai(sai, ans), goiY:gy()};
  }, check:function(q){ var cs=docCanh(q.q); if(cs.length!==2) return false; var a=cs[0], b=cs[1], e;
    if(q._lv===2){ if(a.u!=='m' || b.u!=='dm') return false; e=(a.v*10+b.v)*2; return q.q.indexOf('(dm)')>=0 && q.ans===e && a.v<=2 && b.v<=5; }
    if(a.u!=='dm' || b.u!=='cm' || q.q.indexOf('(cm)')<0) return false; e=(a.v*10+b.v)*2; return q.ans===e && (q._lv<=1 ? (a.v<=4 && b.v<=9) : (a.v>=3 && b.v>=10)); }},

  /* D3 — Gạch vuông ghép (bài 3) */
  {name:'Gạch vuông ghép thành hình chữ nhật', sec:'Bài 3 — ba viên gạch vuông cạnh 30 cm ghép thành hình chữ nhật 90 × 30: chu vi 240 cm', mt:['MT1'], levels:3,
   muc:['Hai viên gạch vuông ghép lại.', 'Ba viên gạch ghép lại (cạnh 30 cm).', 'Bốn viên gạch ghép lại.'],
   make:function(lv){
    var k = lv<=1 ? 2 : (lv===2 ? 3 : 4), s = lv===2 ? 30 : pick([20,30,40]), ans=(s*k+s)*2;
    return {type:'num', _lv:lv, q:khungHinh(gachHang(s,k).replace(/<\/svg>$/,''))+'<div>Ghép <b>'+k+' viên gạch</b> hình vuông cạnh <b>'+s+' cm</b> thành một hình chữ nhật. Chu vi hình chữ nhật là bao nhiêu xăng-ti-mét?</div>', ans:ans, sai:nhanSai([[s*4*k,'cong-chu-vi-vien'],[s*k+s,'nham-bang'],[s*k*s,'nhan-chu-vi'],[s*k*2,'thieu-buoc'],[ans+s,'nham-bang']], ans), goiY:gy()};
  }, check:function(q){ var t=docGach(q.q); if(!t || t.k<2 || t.k>4 || q.ans!==(t.s*t.k+t.s)*2) return false; if(q.q.indexOf('<b>'+t.k+' viên gạch</b>')<0 || q.q.indexOf('<b>'+t.s+' cm</b>')<0) return false; return q._lv<=1 ? t.k===2 : (q._lv===2 ? (t.k===3 && t.s===30) : t.k===4); }},

  /* D4 — Hàng rào cọc cách nhau 1 m (bài 4) */
  {name:'Hàng rào vườn hoa', sec:'Bài 4 — hàng rào quanh vườn hoa, hai cọc liền nhau cách nhau 1 m: đếm cọc, tìm vườn có hàng rào dài nhất, ngắn nhất', mt:['MT1'], levels:3,
   muc:['Đếm cọc quanh một vườn: hàng rào dài bao nhiêu mét.', 'Hai vườn: vườn nào có hàng rào dài hơn.', 'Ba vườn: vườn nào có hàng rào ngắn nhất (dài nhất).'],
   make:function(lv){
    var vs, g;
    if(lv<=1){ var a=rnd(4,9), b=rnd(3,7); if(a<=b) a=b+1; return {type:'num', _lv:1, _a:a, _b:b, q:khungHinh(vuonCoc([{t:'',a:a,b:b}]).replace(/<\/svg>$/,''))+'<div>Các chấm là cọc rào quanh vườn hoa, hai cọc liền nhau cách nhau <b>1 m</b>. Hàng rào quanh vườn dài bao nhiêu mét?</div>', ans:2*(a+b), sai:nhanSai([[2*(a+b)-1,'dem-sot-coc'],[2*(a+b)+1,'dem-sot-coc'],[a+b,'nham-bang'],[a*b,'nhan-chu-vi'],[2*(a+b)-4,'dem-sot-coc']], 2*(a+b)), goiY:gy()}; }
    var n = lv===2 ? 2 : 3, ten=['A','B','C'].slice(0,n);
    for(g=0; g<300; g++){ vs=ten.map(function(t){ var a=rnd(3,7), b=rnd(2,6); if(a<=b) a=b+1; return {t:t, a:a, b:b}; }); var ps=vs.map(function(v){ return 2*(v.a+v.b); }); if(new Set(ps).size===n) break; }
    var ps2=vs.map(function(v){ return 2*(v.a+v.b); }), kieu = lv===2 ? 'dai' : pick(['dai','ngan']), ix = ps2.indexOf(kieu==='dai' ? Math.max.apply(null,ps2) : Math.min.apply(null,ps2)), ch=vs.map(function(v){ return 'Vườn '+v.t; }), sai={}; ch.forEach(function(c,i){ if(i!==ix) sai[String(i)]='dem-sot-coc'; });
    return {type:'mcq', cot:2, _lv:lv, _kieu:kieu, _dung:ch[ix], q:khungHinh(vuonCoc(vs).replace(/<\/svg>$/,''))+'<div>Các chấm là cọc rào quanh vườn, hai cọc liền nhau cách nhau <b>1 m</b>. Vườn nào có hàng rào '+(kieu==='dai' ? '<b>dài nhất</b>' : '<b>ngắn nhất</b>')+'?</div>', choices:ch, correct:ix, sai:sai, goiY:gy()};
  }, check:function(q){ var o=docCoc(q.q), ks=Object.keys(o);
    if(q._lv<=1){ var a=q._a, b=q._b; return ks.length===1 && o[ks[0]]===2*(a+b) && q.ans===o[ks[0]] && a>b; }
    var n = q._lv===2 ? 2 : 3; if(ks.length!==n || !kiemMCQ(q) || q.choices.length!==n) return false; var vals=ks.map(function(k){ return o[k]; }); if(new Set(vals).size!==n) return false;
    var e = q._kieu==='dai' ? Math.max.apply(null,vals) : Math.min.apply(null,vals), t=ks.filter(function(k){ return o[k]===e; })[0]; if(q._dung!=='Vườn '+t) return false; return q._lv===2 ? q._kieu==='dai' : true; }},

  /* D5 — Diện tích hình vuông, hình chữ nhật (bài 5) */
  {name:'Diện tích hình vuông, hình chữ nhật', sec:'Bài 5 — hình vuông cạnh 9 cm: 81 cm²; chữ nhật 9 × 6: 54 cm²; chiều rộng 6, chiều dài gấp đôi: 72 cm²', mt:['MT2'], levels:3,
   muc:['Hình vuông cạnh 6 đến 9 cm.', 'Hình chữ nhật dài 9 cm, rộng 6 cm (số khác).', 'Chiều rộng cho trước, chiều dài gấp đôi chiều rộng.'],
   make:function(lv){
    var a, b, ans, ve, q, sai;
    if(lv<=1){ a=rnd(6,9); ans=a*a; ve=daGiac(P_VUONG,[{v:a,u:'cm'},null,null,null]); q='Hình vuông có cạnh <b>'+a+' cm</b>. Diện tích hình vuông là bao nhiêu xăng-ti-mét vuông?'; sai=[[a*4,'nhan-chu-vi'],[a*2,'nham-bang'],[ans+a,'nham-bang'],[ans-a,'nham-bang']]; }
    else if(lv===2){ b=rnd(4,8); a=b+rnd(2,5); ans=a*b; ve=daGiac(P_CN,[{v:a,u:'cm'},{v:b,u:'cm'},null,null]); q='Hình chữ nhật có chiều dài <b>'+a+' cm</b>, chiều rộng <b>'+b+' cm</b>. Diện tích hình chữ nhật là bao nhiêu xăng-ti-mét vuông?'; sai=[[(a+b)*2,'nhan-chu-vi'],[a+b,'nham-bang'],[ans+a,'nham-bang'],[ans-b,'nham-bang']]; }
    else { b=rnd(4,9); a=b*2; ans=a*b; ve=daGiac(P_CN,[{v:'?'},{v:b,u:'cm'},null,null]); q='Hình chữ nhật có chiều rộng <b>'+b+' cm</b>, chiều dài <b>gấp đôi</b> chiều rộng (ghi dấu ?). Diện tích hình chữ nhật là bao nhiêu xăng-ti-mét vuông?'; sai=[[b*b,'thieu-buoc'],[a,'thieu-buoc'],[(a+b)*2,'nhan-chu-vi'],[ans+b,'nham-bang']]; }
    return {type:'num', _lv:lv, _a:a, _b:b, q:khungHinh(ve)+'<div>'+q+'</div>', ans:ans, sai:nhanSai(sai, ans), goiY:gy()};
  }, check:function(q){ var cs=docCanh(q.q);
    if(q._lv<=1) return cs.length===1 && cs[0].v>=6 && cs[0].v<=9 && q.ans===cs[0].v*cs[0].v;
    if(q._lv===2) return cs.length===2 && cs[0].v>cs[1].v && q.ans===cs[0].v*cs[1].v;
    return cs.length===2 && cs[0].v===null && cs[1].v>=4 && q.ans===2*cs[1].v*cs[1].v && q.q.indexOf('gấp đôi')>=0; }},

  /* D6 — Ba miếng bìa hình ngôi nhà (bài 6) */
  {name:'Ba miếng bìa hình ngôi nhà', sec:'Bài 6 — ba miếng bìa hình ngôi nhà cắt trên lưới ô vuông: đếm ô, hai miếng nào có diện tích bằng nhau', mt:['MT2'], levels:3,
   muc:['Đếm ô của một miếng bìa.', 'Ba miếng bìa: hai miếng nào có diện tích bằng nhau.', 'Ba miếng bìa: miếng nào có diện tích lớn nhất.'],
   make:function(lv){
    var rs, ten=['A','B','C'];
    if(lv<=1){ var r=rnd(0,4); return {type:'num', _lv:1, q:khungHinh(nhaHinh([r],['A'],24).replace(/<\/svg>$/,''))+'<div>Miếng bìa hình ngôi nhà cắt trên lưới ô vuông, mỗi ô vuông là 1 cm². Diện tích miếng bìa là bao nhiêu xăng-ti-mét vuông?</div>', ans:AN-r, sai:nhanSai([[AN,'dem-sot-o'],[AN-r+1,'dem-sot-o'],[AN-r-1,'dem-sot-o'],[AN-r+2,'dem-sot-o'],[r,'dem-sot-o']], AN-r), goiY:gy()}; }
    if(lv===2){ var r1=rnd(0,2), r2=r1+rnd(1,3); rs=shuffle([r1,r1,r2]); var cap=[], i, j; for(i=0;i<3;i++) for(j=i+1;j<3;j++) cap.push([ten[i]+' và '+ten[j], rs[i]===rs[j]]); var D=cap.filter(function(c){ return c[1]; })[0][0], ch=cap.map(function(c){ return c[0]; }).concat(['Không có hai miếng nào bằng nhau']), sai={}; ch.forEach(function(c,k){ if(c!==D) sai[String(k)]='dem-sot-o'; });
      return {type:'mcq', cot:1, _lv:2, _dung:D, q:khungHinh(nhaHinh(rs,ten,12).replace(/<\/svg>$/,''))+'<div>Ba miếng bìa hình ngôi nhà cắt trên lưới ô vuông (mỗi ô vuông là 1 cm²). Hai miếng bìa nào có diện tích bằng nhau?</div>', choices:ch, correct:ch.indexOf(D), sai:sai, goiY:gy()}; }
    rs=shuffle([0,rnd(1,2),rnd(3,4)]); var ar=rs.map(function(r){ return AN-r; }), kieu=pick(['max','min']), ix=ar.indexOf(kieu==='max' ? Math.max.apply(null,ar) : Math.min.apply(null,ar)), ch3=['Miếng A','Miếng B','Miếng C'], sai3={}; ch3.forEach(function(c,k){ if(k!==ix) sai3[String(k)]='dem-sot-o'; });
    return {type:'mcq', cot:1, _lv:3, _kieu:kieu, _dung:ch3[ix], q:khungHinh(nhaHinh(rs,ten,12).replace(/<\/svg>$/,''))+'<div>Ba miếng bìa hình ngôi nhà cắt trên lưới ô vuông (mỗi ô vuông là 1 cm²). Miếng bìa nào có diện tích '+(kieu==='max' ? '<b>lớn nhất</b>' : '<b>bé nhất</b>')+'?</div>', choices:ch3, correct:ix, sai:sai3, goiY:gy()};
  }, check:function(q){ var o=docO(q.q), ks=Object.keys(o);
    if(q._lv<=1){ return ks.length===1 && o[ks[0]].length===q.ans && lienNoi(o[ks[0]]) && q.ans>=AN-4 && q.ans<=AN; }
    if(ks.length!==3 || !kiemMCQ(q) || ks.some(function(k){ return !lienNoi(o[k]); })) return false; var ar={A:o.A.length, B:o.B.length, C:o.C.length};
    if(q._lv===2){ var pr=[['A','B'],['A','C'],['B','C']].filter(function(p){ return ar[p[0]]===ar[p[1]]; }); if(pr.length!==1) return false; return q._dung===pr[0][0]+' và '+pr[0][1] && q.choices.length===4; }
    var vals=[ar.A,ar.B,ar.C]; if(new Set(vals).size!==3) return false; var e=q._kieu==='max' ? Math.max.apply(null,vals) : Math.min.apply(null,vals), t=['A','B','C'].filter(function(k){ return ar[k]===e; })[0]; return q._dung==='Miếng '+t; }},

  /* D7 — Võ đài vuông (bài 7) */
  {name:'Võ đài hình vuông', sec:'Bài 7 — võ đài hình vuông có chu vi 36 cm: cạnh 9 cm, diện tích 81 cm²', mt:['MT3'], levels:3,
   muc:['Biết chu vi, tìm cạnh.', 'Biết chu vi, tính diện tích (hai bước).', 'Chu vi lớn hơn (48 cm), tính diện tích.'],
   make:function(lv){
    var a = lv<=1 ? rnd(5,12) : (lv===2 ? rnd(5,12) : rnd(10,16)), ans = lv<=1 ? a : a*a, sai;
    sai = lv<=1 ? [[a*4,'nham-chu-vi-canh'],[a*2,'nham-chu-vi-canh'],[a+1,'nham-bang'],[a-1,'nham-bang']] : [[a*4,'thieu-buoc'],[a,'thieu-buoc'],[a*2,'nham-bang'],[(a*4)*(a*4),'nham-bang'],[ans+a,'nham-bang']];
    return {type:'num', _lv:lv, _a:a, q:khungHinh(daGiac(P_VUONG,[{v:'?'},null,null,null]))+'<div>Võ đài hình vuông có chu vi <b>'+(a*4)+' cm</b>. '+(lv<=1 ? 'Cạnh võ đài (ghi dấu ?) là bao nhiêu xăng-ti-mét?' : 'Diện tích võ đài là bao nhiêu xăng-ti-mét vuông?')+'</div>', ans:ans, sai:nhanSai(sai, ans), goiY:gy()};
  }, check:function(q){ var cs=docCanh(q.q), a=q._a; if(cs.length!==1 || cs[0].v!==null || q.q.indexOf('<b>'+(a*4)+' cm</b>')<0) return false; if(q._lv<=1) return q.ans===a && a>=5 && a<=12; if(q._lv===2) return q.ans===a*a && a>=5 && a<=12 && q.q.indexOf('Diện tích')>=0; return q.ans===a*a && a>=10 && a<=16 && q.q.indexOf('Diện tích')>=0; }},

  /* D8 — Sàn nhà lát gỗ (bài 8) */
  {name:'Sàn nhà lát gỗ', sec:'Bài 8 — sàn nhà lát 9 tấm gỗ, mỗi tấm 45 cm × 9 cm: 9 × 405 = 3 645 cm²', mt:['MT3'], levels:3,
   muc:['Diện tích một tấm gỗ.', 'Diện tích sàn nhà lát một số tấm gỗ.', 'Sàn nhà lát nhiều tấm gỗ hơn.'],
   make:function(lv){
    var a=rnd(8,12)*5, b=rnd(5,9), n = lv<=1 ? 1 : (lv===2 ? rnd(3,6) : rnd(8,12)), one=a*b, ans=one*n;
    var o=svgX(300,150,300).replace('<svg ','<svg data-tam="'+n+','+a+','+b+'" '), per=4, i, w=Math.min(62, 260/per), h=w*b/a*1.0+6, show=Math.min(n,12);
    for(i=0;i<show;i++) o+='<rect x="'+(20+(i%per)*(w+6))+'" y="'+(22+Math.floor(i/per)*(h+6))+'" width="'+w+'" height="'+h+'" fill="'+HM.goNhat+'" stroke="'+HM.go+'" stroke-width="2"/>';
    var rows=Math.ceil(show/per), ty=22+rows*(h+6)+16;
    o+='<text x="150" y="'+ty+'" text-anchor="middle" font-size="15" '+HFONT+' fill="currentColor">Một tấm gỗ: '+a+' cm × '+b+' cm</text>';
    var q = lv<=1 ? 'Một tấm gỗ hình chữ nhật dài <b>'+a+' cm</b>, rộng <b>'+b+' cm</b>. Diện tích một tấm gỗ là bao nhiêu xăng-ti-mét vuông?' : 'Sàn nhà lát <b>'+n+' tấm gỗ</b> giống nhau, mỗi tấm hình chữ nhật dài <b>'+a+' cm</b>, rộng <b>'+b+' cm</b>. Diện tích sàn nhà là bao nhiêu xăng-ti-mét vuông?';
    return {type:'num', _lv:lv, _n:n, _a:a, _b:b, q:khungHinh(o)+'<div>'+q+'</div>', ans:ans, sai:nhanSai([[one,'thieu-buoc'],[(a+b)*2*n,'nhan-chu-vi'],[ans+one,'nham-bang'],[ans-one,'nham-bang'],[(a+b)*n,'nham-bang']], ans), goiY:gy()};
  }, check:function(q){ var m=/data-tam="(\d+),(\d+),(\d+)"/.exec(q.q); if(!m) return false; var n=+m[1], a=+m[2], b=+m[3]; if(n!==q._n || a!==q._a || b!==q._b || q.ans!==n*a*b || q.ans>9999) return false; var xs=(q.q.match(/<rect /g)||[]).length; if(xs!==Math.min(n,12)) return false; return q._lv<=1 ? n===1 : (q._lv===2 ? (n>=3 && n<=6) : (n>=8 && n<=12)); }},

  /* D9 — Hình H ghép (bài 9) */
  {name:'Hình H ghép hai hình chữ nhật', sec:'Bài 9 — hình H ghép chữ nhật 6 cm × 8 cm (48 cm²) và chữ nhật 10 cm × 7 cm (70 cm²): 118 cm²', mt:['MT3'], levels:3,
   muc:['Hai hình chữ nhật nhỏ ghép lại.', 'Chữ nhật 6 đến 8 cm × 6 đến 8 cm ghép chữ nhật 8 đến 12 cm × 5 đến 8 cm.', 'Hai hình chữ nhật có số đo lớn.'],
   make:function(lv){
    var w1, h1, w2, h2;
    if(lv<=1){ w1=rnd(3,6); h1=rnd(2,5); w2=rnd(3,6); h2=rnd(2,5); }
    else if(lv===2){ w1=rnd(6,8); h1=rnd(6,8); w2=rnd(8,12); h2=rnd(5,8); }
    else { w1=rnd(10,20); h1=rnd(5,9); w2=rnd(10,25); h2=rnd(5,9); }
    var A=w1*h1, B=w2*h2, ans=A+B;
    return {type:'num', _lv:lv, q:khungHinh(hinhGhep(w1,h1,w2,h2).replace(/<\/svg>$/,''))+'<div>Hình H gồm hai hình chữ nhật ghép lại (hình vẽ không đúng tỉ lệ). Diện tích hình H là bao nhiêu xăng-ti-mét vuông?</div>', ans:ans, sai:nhanSai([[A,'thieu-buoc'],[B,'thieu-buoc'],[(w1+w2)*Math.max(h1,h2),'nham-bang'],[ans+10,'nham-bang'],[(w1+h1+w2+h2)*2,'nhan-chu-vi']], ans), goiY:gy()};
  }, check:function(q){ var t=docGhep(q.q); if(!t || q.ans!==t.w1*t.h1+t.w2*t.h2 || q.ans>999) return false; if(q._lv<=1) return t.w1<=6 && t.w2<=6 && t.h1<=5 && t.h2<=5; if(q._lv===2) return t.w1>=6 && t.w1<=8 && t.h1>=6 && t.h1<=8 && t.w2>=8 && t.w2<=12; return t.w1>=10 && t.w2>=10; }},

  /* D10 — Ba tờ giấy của Nam và Việt (bài 10) */
  {name:'Ba tờ giấy của Nam và Việt', sec:'Bài 10 — ba tờ giấy: xanh dương 4 × 6 (chu vi 20, diện tích 24), xanh lá 4 × 7 (22, 28), vàng vuông cạnh 5 (20, 25): giấy của Nam cùng chu vi với Việt, diện tích bé hơn', mt:['MT3'], levels:3,
   muc:['Tính chu vi một tờ giấy.', 'Giấy của Nam có chu vi bằng của Việt, diện tích bé hơn: tờ nào của Nam.', 'Ghép tên Nam, Việt với hai tờ giấy.'],
   make:function(lv){
    var P=pick([20,24,28]), half=P/2, s=P/4, pares=[], w, hs, L=['Hình A','Hình B','Hình C'];
    for(w=half-2; w>half/2; w--) pares.push([w, half-w]);
    var pr=pick(pares), tr, g; do { tr=[rnd(5,9), rnd(2,4)]; } while(tr[0]+tr[1]===half || tr[0]<=tr[1]);
    var base=[{k:'v', a:s, b:0, who:'viet'}, {k:'c', a:pr[0], b:pr[1], who:'nam'}, {k:'c', a:tr[0], b:tr[1], who:'khac'}];
    hs=shuffle(base);
    var fig=khungHinh(baHinh(hs,'cm').replace(/<\/svg>$/,'')), ix=hs.map(function(h){ return h.who; });
    if(lv<=1){ var i=rnd(0,2), cv=chuViHinh(hs[i]); return {type:'num', _lv:1, _i:i, q:fig+'<div>Ba tờ giấy hình chữ nhật và hình vuông (hình vẽ không đúng tỉ lệ). Chu vi tờ giấy <b>'+L[i]+'</b> là bao nhiêu xăng-ti-mét?</div>', ans:cv, sai:nhanSai([[dienTichHinh(hs[i]),'nhan-chu-vi'],[hs[i].k==='v' ? hs[i].a*2 : hs[i].a+hs[i].b,'nham-bang'],[cv+2,'nham-bang'],[cv-2,'nham-bang']], cv), goiY:gy()}; }
    var inam=ix.indexOf('nam'), iviet=ix.indexOf('viet');
    if(lv===2){ var sai={}; L.forEach(function(c,k){ if(k!==inam) sai[String(k)]='nhan-chu-vi'; });
      return {type:'mcq', cot:1, _lv:2, _dung:L[inam], q:fig+'<div>Ba tờ giấy (hình vẽ không đúng tỉ lệ). Giấy của <b>Nam</b> có chu vi bằng giấy của Việt nhưng diện tích <b>bé hơn</b>. Giấy của Nam là hình nào?</div>', choices:L, correct:inam, sai:sai, goiY:gy()}; }
    var D='Nam: '+L[inam]+'; Việt: '+L[iviet], per=[], a1, b1; for(a1=0;a1<3;a1++) for(b1=0;b1<3;b1++) if(a1!==b1) per.push('Nam: '+L[a1]+'; Việt: '+L[b1]);
    var m3=lapMCQ(D, shuffle(per.filter(function(c){ return c!==D; })).map(function(c){ return [c,'nhan-chu-vi']; }));
    return {type:'mcq', cot:1, _lv:3, _dung:m3._dung, q:fig+'<div>Ba tờ giấy (hình vẽ không đúng tỉ lệ). Giấy của Nam có chu vi bằng giấy của Việt nhưng diện tích <b>bé hơn</b>. Cách ghép nào đúng?</div>', choices:m3.choices, correct:m3.correct, sai:m3.sai, goiY:gy()};
  }, check:function(q){ var hs=docBaHinh(q.q); if(hs.length!==3 || hs.some(function(h){ return h.k==='c' && h.a<=h.b; })) return false; var cv=hs.map(chuViHinh), ar=hs.map(dienTichHinh), L=['Hình A','Hình B','Hình C'];
    if(q._lv<=1) return q.ans===cv[q._i] && q.q.indexOf('<b>'+L[q._i]+'</b>')>=0;
    var pr=[], i, j; for(i=0;i<3;i++) for(j=i+1;j<3;j++) if(cv[i]===cv[j]) pr.push([i,j]); if(pr.length!==1) return false; var p=pr[0], nam = ar[p[0]]<ar[p[1]] ? p[0] : p[1], viet = nam===p[0] ? p[1] : p[0]; if(ar[p[0]]===ar[p[1]]) return false;
    if(!kiemMCQ(q)) return false; if(q._lv===2) return q._dung===L[nam] && q.choices.length===3; return q._dung==='Nam: '+L[nam]+'; Việt: '+L[viet] && q.choices.length===4; }}
 ]
};
