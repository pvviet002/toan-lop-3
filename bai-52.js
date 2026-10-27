/* bai-52.js — Bài 52: Diện tích hình chữ nhật, hình vuông (Tập 2, Chủ đề 9). BÀI MỚI, Engine v2 — LUYỆN THÔNG MINH.
   Theo bảng phân tích sư phạm đã duyệt (phan-tich-su-pham/bai-52.md): 3 MỤC TIÊU (muctieu) × 10 DẠNG (topics), mỗi dạng 3 mức (Thông tư 27).
   Hình: daGiac, baHinh (chép từ bài 50), khungLuoi, oLuoi (chép từ bài 51); mới: chuNhatO, baChuNhat, banhCat, hinhGhep, tamKinh. Mỗi ô vuông là 1 cm².
   check() đọc lại hình từ chuỗi SVG (data-seg, data-cell, data-ab, data-a, data-w1, data-hinh, data-k) và tính lại. QUY TẮC: nối chuỗi, KHÔNG backtick, KHÔNG template literal. */

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

var M2=' cm²';
var GOI={'dem-sot-o':'Bé đếm từng ô vuông, hoặc đếm số ô một hàng rồi nhân với số hàng. Mỗi ô vuông là 1 cm².',
  'nham-bang':'Bé tính lại phép nhân cho đúng nhé.',
  'nhan-chu-vi':'Diện tích hình chữ nhật là dài × rộng. Chu vi mới là (dài + rộng) × 2. Hai việc khác nhau!',
  'cong-thay-nhan':'Muốn tính diện tích ta nhân (không cộng) chiều dài với chiều rộng.',
  'quen-tru-phan-cat':'Phần bị cắt đi không còn nữa. Bé lấy diện tích cả hình trừ diện tích phần cắt.',
  'thieu-buoc':'Bài này có hai bước. Bé làm đủ các bước nhé!',
  'viet-cm-thay-cm2':'Diện tích viết bằng xăng-ti-mét vuông (cm²), khác độ dài viết bằng xăng-ti-mét (cm).'};
function gy(extra){ var o={}, k; for(k in GOI) o[k]=GOI[k]; for(k in (extra||{})) o[k]=extra[k]; return o; }

/* ---- Hình (mới trong bài này) ---- */
/* hình chữ nhật w x h ô, mỗi ô 1 cm² (ô data-cell) */
function chuNhatO(w, h){
 var cs=Math.min(30, Math.floor(250/w), Math.floor(150/h)), x0=Math.round((300-w*cs)/2), s=svgX(300,h*cs+10,300), cells=[], i, j;
 for(i=0;i<w;i++) for(j=0;j<h;j++) cells.push([i,j]);
 return s+khungLuoi(w,h,x0,4,cs)+oLuoi(cells,'E','#26C9FC',x0,4,cs);
}
/* ba hình chữ nhật chung cạnh: ABCD (AB), BEGC (BE), AEGD = ABCD + BEGC; chiều rộng AD = h */
function baChuNhat(ab, be, h){
 var u=Math.min(22, Math.floor(230/(ab+be))), tot=(ab+be)*u, x0=Math.round((300-tot)/2), y0=26, hh=h*u, s=svgX(300,hh+78,300).replace('<svg ','<svg data-ab="'+ab+'" data-be="'+be+'" data-h="'+h+'" ');
 s+='<rect x="'+x0+'" y="'+y0+'" width="'+(ab*u)+'" height="'+hh+'" fill="'+HM.troi+'" stroke="'+HM.troiDam+'" stroke-width="3"/><rect x="'+(x0+ab*u)+'" y="'+y0+'" width="'+(be*u)+'" height="'+hh+'" fill="'+HM.hong+'" stroke="'+HM.troiDam+'" stroke-width="3"/>';
 [['A',x0,y0-8],['B',x0+ab*u,y0-8],['E',x0+tot,y0-8],['D',x0,y0+hh+18],['C',x0+ab*u,y0+hh+18],['G',x0+tot,y0+hh+18]].forEach(function(p){ s+='<text x="'+p[1]+'" y="'+p[2]+'" text-anchor="middle" font-size="15" '+HFONT+' fill="currentColor">'+p[0]+'</text>'; });
 [['AB = '+ab+' cm',60],['BE = '+be+' cm',150],['AD = '+h+' cm',240]].forEach(function(p){ s+='<text x="'+p[1]+'" y="'+(y0+hh+46)+'" text-anchor="middle" font-size="15" '+HFONT+' fill="currentColor">'+p[0]+'</text>'; });
 return s;
}
function docBaCN(html){ var m=/data-ab="(\d+)" data-be="(\d+)" data-h="(\d+)"/.exec(html); return m ? {ab:+m[1], be:+m[2], h:+m[3]} : null; }
/* bánh vuông cạnh a, cắt n góc c x c (n = 0, 1 hoặc 2) */
function banhCat(a, c, n){
 var u=Math.min(16, Math.floor(150/a)), W=a*u, x0=Math.round((300-W)/2), y0=26, pts, i, s=svgX(300,W+66,300).replace('<svg ','<svg data-a="'+a+'" data-c="'+c+'" data-n="'+n+'" ');
 if(n===0) pts=[[0,0],[a,0],[a,a],[0,a]]; else if(n===1) pts=[[0,0],[a-c,0],[a-c,c],[a,c],[a,a],[0,a]]; else pts=[[0,0],[a-c,0],[a-c,c],[a,c],[a,a],[c,a],[c,a-c],[0,a-c]];
 s+='<polygon points="'+pts.map(function(p){ return (x0+p[0]*u)+','+(y0+p[1]*u); }).join(' ')+'" fill="'+HM.goNhat+'" stroke="'+HM.go+'" stroke-width="4" stroke-linejoin="round"/>';
 if(n>=1) s+='<rect x="'+(x0+(a-c)*u)+'" y="'+y0+'" width="'+(c*u)+'" height="'+(c*u)+'" fill="none" stroke="currentColor" stroke-width="2" stroke-dasharray="4 4"/>';
 if(n>=2) s+='<rect x="'+x0+'" y="'+(y0+(a-c)*u)+'" width="'+(c*u)+'" height="'+(c*u)+'" fill="none" stroke="currentColor" stroke-width="2" stroke-dasharray="4 4"/>';
 s+='<text x="150" y="'+(y0+W+22)+'" text-anchor="middle" font-size="15" '+HFONT+' fill="currentColor">Cạnh '+a+' cm</text>';
 if(n>=1) s+='<text x="'+(x0+(a-c/2)*u)+'" y="'+(y0-8)+'" text-anchor="middle" font-size="14" '+HFONT+' fill="currentColor">'+c+' cm</text>';
 return s;
}
function docBanh(html){ var m=/data-a="(\d+)" data-c="(\d+)" data-n="(\d+)"/.exec(html); return m ? {a:+m[1], c:+m[2], n:+m[3]} : null; }
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
/* tấm kính a x b, đã cắt k tấm c x d (xếp dọc từ trên xuống) */
function tamKinh(a, b, c, d, k){
 var u=212/a, W=a*u, H=b*u, x0=24, y0=24, i, s=svgX(300,H+60,300).replace('<svg ','<svg data-a="'+a+'" data-b="'+b+'" data-c="'+c+'" data-d="'+d+'" data-k="'+k+'" ');
 s+='<rect x="'+x0+'" y="'+y0+'" width="'+W+'" height="'+H+'" fill="'+HM.troi+'" stroke="'+HM.troiDam+'" stroke-width="3"/>';
 for(i=0;i<k;i++) s+='<rect x="'+x0+'" y="'+(y0+i*d*u)+'" width="'+(c*u)+'" height="'+(d*u)+'" fill="'+HM.xam+'" stroke="'+HM.troiDam+'" stroke-width="2" stroke-dasharray="4 3"/>';
 s+='<text x="'+(x0+W/2)+'" y="'+(y0-8)+'" text-anchor="middle" font-size="15" '+HFONT+' fill="currentColor">'+a+' cm</text><text x="'+(x0+W+6)+'" y="'+(y0+H/2+5)+'" text-anchor="start" font-size="15" '+HFONT+' fill="currentColor">'+b+' cm</text>';
 if(k>0) s+='<text x="'+(x0+W/2)+'" y="'+(y0+H+22)+'" text-anchor="middle" font-size="15" '+HFONT+' fill="currentColor">'+(k===1 ? 'Cắt 1 tấm ' : 'Cắt '+k+' tấm ')+c+' × '+d+' cm</text>';
 return s;
}
function docKinh(html){ var m=/data-a="(\d+)" data-b="(\d+)" data-c="(\d+)" data-d="(\d+)" data-k="(\d+)"/.exec(html); return m ? {a:+m[1], b:+m[2], c:+m[3], d:+m[4], k:+m[5]} : null; }
function dienTichHinh(h){ return h.k==='v' ? h.a*h.a : h.a*h.b; }

var BAI = {
 n: 52,
 title: 'Diện Tích Hình Chữ Nhật, Hình Vuông',
 sub: 'Luyện thông minh: câu hỏi tự đổi theo bé — làm hết lượt để xem ngọn lửa!',
 goal: 10, soCau: 18, soCauToiDa: 24,
 loi: {'dem-sot-o':'Đếm sót hoặc đếm trùng ô vuông', 'nham-bang':'Nhân sai', 'nhan-chu-vi':'Nhầm diện tích với chu vi', 'cong-thay-nhan':'Cộng thay vì nhân', 'quen-tru-phan-cat':'Quên trừ phần bị cắt đi', 'thieu-buoc':'Thiếu một bước', 'viet-cm-thay-cm2':'Viết cm thay cho cm²'},
 muctieu: [
  {id:'MT1', ten:'Diện tích hình chữ nhật', muc:['Đếm ô rồi nhân (4 × 3); chữ nhật 6 × 3 cm; ABCD trong ba hình chung cạnh.', 'Tấm gỗ 5 × 15 cm; hình BEGC.', 'Biết diện tích và chiều dài, tìm chiều rộng; hình AEGD = ABCD + BEGC.']},
  {id:'MT2', ten:'Diện tích hình vuông; phân biệt chu vi và diện tích', muc:['Hình vuông cạnh 3, 4 cm; bạn Nam nhầm chu vi với diện tích: đồng ý không.', 'Hình vuông cạnh 5, 9 cm; ba mảnh đất cùng chu vi, diện tích khác nhau; Nam sai ở đâu.', 'Biết chu vi hình vuông, tính diện tích; mảnh đất vuông so với chữ nhật; kết quả đúng của Nam.']},
  {id:'MT3', ten:'Bài toán ghép hình, cắt hình', muc:['Bánh vuông cạnh 8 cm; hình ghép hai chữ nhật; tấm bìa A.', 'Bánh cắt một góc 3 × 3; hình H = hình vuông + chữ nhật; tấm bìa gấp đôi; tấm kính 85 × 30.', 'Bánh cắt hai góc; hình H số lớn; tấm bìa gấp ba; tấm kính cắt ba tấm.']}
 ],
 topics: [
  /* D1 — Đếm ô rồi nhân (khám phá) */
  {name:'Đếm ô rồi nhân', sec:'Khám phá — hình chữ nhật ABCD dài 4, rộng 3: đếm 12 ô, 4 × 3 = 12 cm²', mt:['MT1'], levels:3,
   muc:['Hình 4 ô × 3 ô.', 'Hình 5 ô × 4 ô.', 'Hình 6 hoặc 7 ô × 5 ô.'],
   make:function(lv){
    var w = lv<=1 ? rnd(4,5) : (lv===2 ? rnd(5,6) : rnd(6,7)), h = lv<=1 ? 3 : (lv===2 ? 4 : 5), ans=w*h;
    return {type:'num', _lv:lv, _w:w, _h:h, q:khungHinh(chuNhatO(w,h).replace(/<\/svg>$/,''))+'<div>Mỗi ô vuông là 1 cm². Diện tích hình chữ nhật là bao nhiêu xăng-ti-mét vuông?</div>', ans:ans, sai:nhanSai([[w+h,'cong-thay-nhan'],[(w+h)*2,'nhan-chu-vi'],[ans+1,'dem-sot-o'],[ans-1,'dem-sot-o'],[ans+w,'dem-sot-o']], ans), goiY:gy()};
  }, check:function(q){ var o=docO(q.q), E=o.E||[]; if(!E.length) return false; var c=0, r=0; E.forEach(function(x){ c=Math.max(c,x[0]+1); r=Math.max(r,x[1]+1); }); if(c*r!==E.length || q.ans!==E.length || q._w!==c || q._h!==r) return false;
    if(q._lv<=1) return r===3 && c>=4 && c<=5; if(q._lv===2) return r===4 && c>=5 && c<=6; return r===5 && c>=6 && c<=7; }},

  /* D2 — Diện tích hình chữ nhật (bài 1) */
  {name:'Diện tích hình chữ nhật', sec:'Bài 1 — chữ nhật 6 × 3 = 18 cm²; tấm gỗ 5 cm × 15 cm = 75 cm²', mt:['MT1'], levels:3,
   muc:['Dài, rộng nhỏ (6 × 3 cm).', 'Tấm gỗ có dài, rộng khác xa nhau (5 × 15 cm).', 'Biết diện tích và chiều dài, tìm chiều rộng.'],
   make:function(lv){
    var a, b, S, q, ans, sai, ve;
    if(lv<=1){ b=rnd(2,5); a=b+rnd(1,5); ans=a*b; ve=daGiac(P_CN,[{v:a,u:'cm'},{v:b,u:'cm'},null,null]); q='<div>Hình chữ nhật có chiều dài <b>'+a+' cm</b>, chiều rộng <b>'+b+' cm</b>. Diện tích hình chữ nhật là bao nhiêu xăng-ti-mét vuông?</div>'; sai=[[(a+b)*2,'nhan-chu-vi'],[a+b,'cong-thay-nhan'],[ans+a,'nham-bang'],[ans-b,'nham-bang']]; }
    else if(lv===2){ b=rnd(3,9); a=rnd(11,25); ans=a*b; ve=daGiac(P_CN,[{v:a,u:'cm'},{v:b,u:'cm'},null,null]); q='<div>Tấm gỗ hình chữ nhật dài <b>'+a+' cm</b>, rộng <b>'+b+' cm</b>. Diện tích tấm gỗ là bao nhiêu xăng-ti-mét vuông?</div>'; sai=[[(a+b)*2,'nhan-chu-vi'],[a+b,'cong-thay-nhan'],[ans+10,'nham-bang'],[ans-10,'nham-bang']]; }
    else { b=rnd(4,15); a=b+rnd(2,18); S=a*b; ans=b; ve=daGiac(P_CN,[{v:a,u:'cm'},{v:'?'},null,null]); q='<div>Hình chữ nhật có diện tích <b>'+S+' cm²</b>, chiều dài <b>'+a+' cm</b>. Chiều rộng (ghi dấu ?) là bao nhiêu xăng-ti-mét?</div>'; sai=[[S-a,'nham-bang'],[S+a,'nham-bang'],[a-b,'nham-bang'],[b+1,'nham-bang'],[b-1,'nham-bang']]; }
    return {type:'num', _lv:lv, q:khungHinh(ve)+q, ans:ans, sai:nhanSai(sai, ans), goiY:gy()};
  }, check:function(q){ var cs=docCanh(q.q); if(cs.length!==2 || cs[0].u!=='cm') return false; var a=cs[0].v;
    if(q._lv>=3){ if(cs[1].v!==null) return false; var m=/<b>(\d+) cm²<\/b>/.exec(q.q); if(!m) return false; var S=+m[1]; return a>0 && S%a===0 && q.ans===S/a && q.ans>=4 && q.q.indexOf('<b>'+a+' cm</b>')>=0; }
    var b=cs[1].v; if(a===null || b===null || a<=b || q.ans!==a*b || cs[1].u!=='cm') return false; if(q._lv<=1) return a<=10 && b<=5; return a>=11 && a<=25 && b>=3 && b<=9; }},

  /* D3 — Ba hình chữ nhật chung cạnh (bài 1) */
  {name:'Ba hình chữ nhật chung cạnh', sec:'Bài 1 — ABCD 6 × 3 = 18 cm²; BEGC 4 × 3 = 12 cm²; AEGD 10 × 3 = 30 cm²', mt:['MT1'], levels:3,
   muc:['Diện tích hình ABCD (AB × AD).', 'Diện tích hình BEGC (BE × AD).', 'Diện tích hình AEGD (gồm ABCD và BEGC).'],
   make:function(lv){
    var h=rnd(2,5), ab=rnd(3,8), be=rnd(2,6), ans = lv<=1 ? ab*h : (lv===2 ? be*h : (ab+be)*h), ten = lv<=1 ? 'ABCD' : (lv===2 ? 'BEGC' : 'AEGD');
    var sai = lv<=1 ? [[(ab+h)*2,'nhan-chu-vi'],[ab+h,'cong-thay-nhan'],[be*h,'nham-bang'],[(ab+be)*h,'thieu-buoc']] : (lv===2 ? [[(be+h)*2,'nhan-chu-vi'],[be+h,'cong-thay-nhan'],[ab*h,'nham-bang'],[(ab+be)*h,'thieu-buoc']] : [[ab*h,'thieu-buoc'],[be*h,'thieu-buoc'],[(ab+be+h)*2,'nhan-chu-vi'],[ab+be+h,'cong-thay-nhan']]);
    return {type:'num', _lv:lv, _ten:ten, q:khungHinh(baChuNhat(ab,be,h).replace(/<\/svg>$/,''))+'<div>Ba hình chữ nhật ABCD, BEGC và AEGD có chung cạnh AD. Diện tích hình chữ nhật <b>'+ten+'</b> là bao nhiêu xăng-ti-mét vuông?</div>', ans:ans, sai:nhanSai(sai, ans), goiY:gy()};
  }, check:function(q){ var t=docBaCN(q.q); if(!t || t.ab<=0 || t.be<=0 || t.h<=0) return false; var e = q._ten==='ABCD' ? t.ab*t.h : (q._ten==='BEGC' ? t.be*t.h : (t.ab+t.be)*t.h); if(q.ans!==e || q.q.indexOf('<b>'+q._ten+'</b>')<0) return false; return q._lv<=1 ? q._ten==='ABCD' : (q._lv===2 ? q._ten==='BEGC' : q._ten==='AEGD'); }},

  /* D4 — Diện tích hình vuông (bài 2) */
  {name:'Diện tích hình vuông', sec:'Bài 2 — hình vuông cạnh 3 cm: 3 × 3 = 9 cm²; cạnh 5 cm, 9 cm: 25 cm², 81 cm²', mt:['MT2'], levels:3,
   muc:['Hình vuông cạnh 3 hoặc 4 cm.', 'Hình vuông cạnh 5 đến 9 cm.', 'Biết chu vi hình vuông, tính diện tích.'],
   make:function(lv){
    var a, ans, q, ve, sai;
    if(lv<=1){ a=rnd(3,4); ans=a*a; ve=daGiac(P_VUONG,[{v:a,u:'cm'},null,null,null]); q='<div>Hình vuông có cạnh <b>'+a+' cm</b>. Diện tích hình vuông là bao nhiêu xăng-ti-mét vuông?</div>'; sai=[[a*4,'nhan-chu-vi'],[a*2,'cong-thay-nhan'],[a+a,'cong-thay-nhan'],[ans+1,'nham-bang']]; }
    else if(lv===2){ a=rnd(5,9); ans=a*a; ve=daGiac(P_VUONG,[{v:a,u:'cm'},null,null,null]); q='<div>Hình vuông có cạnh <b>'+a+' cm</b>. Diện tích hình vuông là bao nhiêu xăng-ti-mét vuông?</div>'; sai=[[a*4,'nhan-chu-vi'],[a*2,'cong-thay-nhan'],[ans+a,'nham-bang'],[ans-a,'nham-bang']]; }
    else { a=rnd(4,12); ans=a*a; ve=daGiac(P_VUONG,[{v:'?'},null,null,null]); q='<div>Hình vuông có chu vi <b>'+(a*4)+' cm</b>. Diện tích hình vuông là bao nhiêu xăng-ti-mét vuông?</div>'; sai=[[a*4,'nhan-chu-vi'],[a*4*a*4,'nham-bang'],[a*2,'thieu-buoc'],[ans+a,'nham-bang'],[a,'thieu-buoc']]; }
    return {type:'num', _lv:lv, _a:a, q:khungHinh(ve)+q, ans:ans, sai:nhanSai(sai, ans), goiY:gy()};
  }, check:function(q){ var cs=docCanh(q.q), a=q._a; if(cs.length!==1 || q.ans!==a*a) return false;
    if(q._lv<=2){ return cs[0].v===a && cs[0].u==='cm' && (q._lv<=1 ? (a>=3 && a<=4) : (a>=5 && a<=9)); } return cs[0].v===null && q.q.indexOf('<b>'+(a*4)+' cm</b>')>=0 && a>=4 && a<=12; }},

  /* D5 — Bánh vuông cắt góc (bài 3) */
  {name:'Bánh vuông cắt góc', sec:'Bài 3 — bánh vuông cạnh 8 cm: 64 cm²; cắt góc 3 cm × 3 cm: còn 64 − 9 = 55 cm²', mt:['MT3'], levels:3,
   muc:['Bánh vuông cạnh 6 đến 12 cm: diện tích.', 'Cắt đi một góc vuông c × c: diện tích còn lại.', 'Cắt đi hai góc: diện tích còn lại.'],
   make:function(lv){
    var a=rnd(6,12), c=rnd(2,3), n = lv<=1 ? 0 : (lv===2 ? 1 : 2), ans=a*a-n*c*c, sai=[[a*a,'quen-tru-phan-cat'],[a*a-c*c,'quen-tru-phan-cat'],[a*a-c,'nham-bang'],[a*a+c*c,'nham-bang'],[a*4,'nhan-chu-vi'],[ans+1,'nham-bang']];
    var q = n===0 ? 'Chiếc bánh hình vuông có cạnh <b>'+a+' cm</b>. Diện tích chiếc bánh là bao nhiêu xăng-ti-mét vuông?' : 'Chiếc bánh hình vuông cạnh <b>'+a+' cm</b>, bị cắt đi '+(n===1 ? 'một góc' : 'hai góc')+' hình vuông cạnh <b>'+c+' cm</b> (nét đứt). Diện tích phần bánh còn lại là bao nhiêu xăng-ti-mét vuông?';
    return {type:'num', _lv:lv, q:khungHinh(banhCat(a,c,n).replace(/<\/svg>$/,''))+'<div>'+q+'</div>', ans:ans, sai:nhanSai(sai, ans), goiY:gy()};
  }, check:function(q){ var t=docBanh(q.q); if(!t || t.a<6 || t.a>12 || t.c<2 || t.c>3) return false; if(q.ans!==t.a*t.a-t.n*t.c*t.c) return false; return t.n===(q._lv<=1 ? 0 : (q._lv===2 ? 1 : 2)); }},

  /* D6 — Hình ghép (bài 4) */
  {name:'Hình ghép hai hình chữ nhật', sec:'Bài 4 — hình H gồm hình vuông cạnh 7 cm và hình chữ nhật 20 cm × 9 cm: 49 + 180 = 229 cm²', mt:['MT3'], levels:3,
   muc:['Hình ghép hai hình chữ nhật nhỏ: tính tổng hai diện tích.', 'Hình vuông cạnh 5 đến 9 cm ghép chữ nhật 10 đến 20 cm × 5 đến 9 cm.', 'Hình vuông và chữ nhật có số đo lớn hơn.'],
   make:function(lv){
    var w1, h1, w2, h2, A, B;
    if(lv<=1){ w1=rnd(3,6); h1=rnd(2,4); w2=rnd(3,6); h2=rnd(2,4); while(w1===h1){ h1=rnd(2,4); if(h1===w1) h1=w1+1; } }
    else if(lv===2){ w1=rnd(5,9); h1=w1; w2=rnd(10,20); h2=rnd(5,9); }
    else { w1=rnd(6,12); h1=w1; w2=rnd(10,30); h2=rnd(4,9); }
    A=w1*h1; B=w2*h2; var ans=A+B;
    return {type:'num', _lv:lv, q:khungHinh(hinhGhep(w1,h1,w2,h2).replace(/<\/svg>$/,''))+'<div>Hình H gồm hai phần ghép lại (hình vẽ không đúng tỉ lệ). Diện tích hình H là bao nhiêu xăng-ti-mét vuông?</div>', ans:ans, sai:nhanSai([[A,'thieu-buoc'],[B,'thieu-buoc'],[(w1+w2)*Math.max(h1,h2),'nham-bang'],[ans+10,'nham-bang'],[A*B,'nham-bang']], ans), goiY:gy()};
  }, check:function(q){ var t=docGhep(q.q); if(!t || q.ans!==t.w1*t.h1+t.w2*t.h2 || q.ans>999) return false; if(q._lv<=1) return t.w1!==t.h1 && t.w1<=6 && t.w2<=6; if(q._lv===2) return t.w1===t.h1 && t.w1>=5 && t.w1<=9 && t.w2>=10 && t.w2<=20; return t.w1===t.h1 && t.w1>=6 && t.w2>=10; }},

  /* D7 — Ba mảnh đất cùng chu vi (bài 5) */
  {name:'Ba mảnh đất cùng chu vi', sec:'Bài 5 — ba mảnh đất cùng chu vi 20 cm: vuông cạnh 5 (25 cm²), chữ nhật 3 × 7 (21 cm²), 6 × 4 (24 cm²)', mt:['MT2'], levels:3,
   muc:['Ba hình chữ nhật cùng chu vi: hình nào có diện tích lớn nhất.', 'Tính diện tích của một mảnh đất (Hình A, B hoặc C).', 'Có hình vuông trong ba mảnh: hình có diện tích lớn nhất hoặc bé nhất.'],
   make:function(lv){
    var P = lv<=2 ? pick([20,24,28]) : pick([16,20,24,28]), half=P/2, pares=[], w, hs, g;
    for(w=half-2; w>half/2; w--) pares.push([w, half-w]);
    if(lv<=2){ var ch=shuffle(pares.slice()).slice(0,3); hs=ch.map(function(p){ return {k:'c', a:p[0], b:p[1]}; }); }
    else { var ch2=shuffle(pares.slice()).slice(0,2); hs=[{k:'v', a:P/4, b:0}].concat(ch2.map(function(p){ return {k:'c', a:p[0], b:p[1]}; })); }
    hs=shuffle(hs); var ar=hs.map(dienTichHinh), L=['Hình A','Hình B','Hình C'], note='Ba mảnh đất có chu vi bằng nhau <b>'+P+' cm</b> (hình vẽ không đúng tỉ lệ). ';
    if(lv===2){ var i=rnd(0,2), a2=ar[i], cvv=chuViHinh(hs[i]); return {type:'num', _lv:2, _i:i, q:khungHinh(baHinh(hs,'cm').replace(/<\/svg>$/,''))+'<div>'+note+'Diện tích mảnh đất <b>'+L[i]+'</b> là bao nhiêu xăng-ti-mét vuông?</div>', ans:a2, sai:nhanSai([[cvv,'nhan-chu-vi'],[hs[i].k==='v' ? hs[i].a*2 : hs[i].a+hs[i].b,'cong-thay-nhan'],[a2+2,'nham-bang'],[a2-2,'nham-bang']], a2), goiY:gy()}; }
    var kieu = lv<=1 ? 'max' : pick(['max','min']), ix = ar.indexOf(kieu==='max' ? Math.max.apply(null,ar) : Math.min.apply(null,ar)), sai={}; L.forEach(function(c,k){ if(k!==ix) sai[String(k)]='nhan-chu-vi'; });
    return {type:'mcq', cot:1, _lv:lv, _kieu:kieu, _dung:L[ix], q:khungHinh(baHinh(hs,'cm').replace(/<\/svg>$/,''))+'<div>'+note+'Mảnh đất nào có diện tích <b>'+(kieu==='max' ? 'lớn nhất' : 'bé nhất')+'</b>?</div>', choices:L, correct:ix, sai:sai, goiY:gy()};
  }, check:function(q){ var hs=docBaHinh(q.q); if(hs.length!==3) return false; var cv=hs.map(chuViHinh); if(new Set(cv).size!==1 || hs.some(function(h){ return h.k==='c' && h.a<=h.b; })) return false; var ar=hs.map(dienTichHinh); if(new Set(ar).size!==3) return false; var nv=hs.filter(function(h){ return h.k==='v'; }).length;
    var m=/<b>(\d+) cm<\/b> \(hình/.exec(q.q); if(!m || +m[1]!==cv[0]) return false;
    if(q._lv<=2){ if(nv!==0) return false; if(q._lv===2) return q.ans===ar[q._i] && q.q.indexOf('<b>'+['Hình A','Hình B','Hình C'][q._i]+'</b>')>=0; var mx=ar.indexOf(Math.max.apply(null,ar)); return kiemMCQ(q) && q._kieu==='max' && q._dung==='Hình '+['A','B','C'][mx]; }
    if(nv!==1) return false; var ix=ar.indexOf(q._kieu==='max' ? Math.max.apply(null,ar) : Math.min.apply(null,ar)); return kiemMCQ(q) && q._dung==='Hình '+['A','B','C'][ix]; }},

  /* D8 — Tấm bìa gấp đôi (bài 6) */
  {name:'Tấm bìa gấp đôi, gấp ba', sec:'Bài 6 — miếng bìa đỏ 3 × 6 = 18 cm²; tấm bìa vuông có diện tích gấp đôi: 36 cm²', mt:['MT3'], levels:3,
   muc:['Diện tích miếng bìa hình chữ nhật.', 'Tấm bìa khác có diện tích gấp đôi.', 'Tấm bìa khác có diện tích gấp ba.'],
   make:function(lv){
    var b=rnd(3,8), a=b+rnd(1,5), S=a*b, k = lv<=1 ? 1 : (lv===2 ? 2 : 3), ans=S*k, q;
    if(lv<=1) q='Miếng bìa hình chữ nhật dài <b>'+a+' cm</b>, rộng <b>'+b+' cm</b>. Diện tích miếng bìa là bao nhiêu xăng-ti-mét vuông?';
    else q='Miếng bìa đỏ hình chữ nhật dài <b>'+a+' cm</b>, rộng <b>'+b+' cm</b>. Tấm bìa xanh có diện tích <b>gấp '+(k===2 ? 'đôi' : 'ba')+'</b> miếng bìa đỏ. Diện tích tấm bìa xanh là bao nhiêu xăng-ti-mét vuông?';
    return {type:'num', _lv:lv, q:khungHinh(daGiac(P_CN,[{v:a,u:'cm'},{v:b,u:'cm'},null,null]))+'<div>'+q+'</div>', ans:ans, sai:nhanSai([[S,'thieu-buoc'],[(a+b)*2*k,'nhan-chu-vi'],[S+k,'nham-bang'],[S*(k+1),'nham-bang'],[S+S+S+(k===2 ? 0 : 0),'nham-bang']], ans), goiY:gy()};
  }, check:function(q){ var cs=docCanh(q.q); if(cs.length!==2 || cs[0].v<=cs[1].v) return false; var S=cs[0].v*cs[1].v, k=q._lv<=1 ? 1 : (q._lv===2 ? 2 : 3); if(q.ans!==S*k || q.ans>999) return false; if(k>1 && q.q.indexOf('gấp '+(k===2 ? 'đôi' : 'ba'))<0) return false; return true; }},

  /* D9 — Tấm kính cắt (bài 7) */
  {name:'Tấm kính cắt thành các tấm nhỏ', sec:'Bài 7 — tấm kính 85 cm × 30 cm = 2 550 cm²; cắt ba tấm 80 × 10 còn 2 550 − 2 400 = 150 cm²', mt:['MT3'], levels:3,
   muc:['Diện tích tấm kính hình chữ nhật.', 'Cắt một tấm c × d: diện tích còn lại.', 'Cắt ba tấm: diện tích còn lại.'],
   make:function(lv){
    var a=rnd(12,19)*5, b=pick([30,40]), c=rnd(Math.max(4, Math.ceil(a/10)-4), Math.floor((a-5)/10))*10, d=10, k = lv<=1 ? 0 : (lv===2 ? 1 : 3);
    if(c>a) c=Math.floor(a/10)*10; var S=a*b, cut=k*c*d, ans=S-cut, q;
    if(lv<=1) q='Tấm kính hình chữ nhật dài <b>'+a+' cm</b>, rộng <b>'+b+' cm</b>. Diện tích tấm kính là bao nhiêu xăng-ti-mét vuông?'; else q='Tấm kính hình chữ nhật dài <b>'+a+' cm</b>, rộng <b>'+b+' cm</b>. Người ta cắt '+(k===1 ? 'một tấm' : 'ba tấm')+' kính hình chữ nhật dài <b>'+c+' cm</b>, rộng <b>'+d+' cm</b>. Diện tích phần kính còn lại là bao nhiêu xăng-ti-mét vuông?';
    return {type:'num', _lv:lv, q:khungHinh(tamKinh(a,b,c,d,k).replace(/<\/svg>$/,''))+'<div>'+q+'</div>', ans:ans, sai:nhanSai([[S,'quen-tru-phan-cat'],[cut,'thieu-buoc'],[S-c*d,'quen-tru-phan-cat'],[(a+b)*2,'nhan-chu-vi'],[ans+10,'nham-bang']], ans), goiY:gy()};
  }, check:function(q){ var t=docKinh(q.q); if(!t || t.a<60 || t.b<30 || t.c>t.a || t.k*t.d>t.b) return false; var e=t.a*t.b-t.k*t.c*t.d; if(q.ans!==e || e<=0) return false; return q._lv<=1 ? t.k===0 : (q._lv===2 ? t.k===1 : t.k===3); }},

  /* D10 — Bạn Nam làm (không có trong SGK) */
  {name:'Bạn Nam làm', sec:'Ôn tập — bạn Nam tính diện tích hình chữ nhật dài 6 cm, rộng 3 cm là (6 + 3) × 2 = 18 cm²: em có đồng ý không', mt:['MT2'], levels:3,
   muc:['Nam tính diện tích: em có đồng ý không.', 'Nam tính sai: Nam sai ở đâu.', 'Nam tính sai: kết quả đúng là bao nhiêu.'],
   make:function(lv){
    var b=rnd(3,8), a=b+rnd(1,6), S=a*b, cvv=(a+b)*2, dung=Math.random()<0.5, ve=khungHinh(daGiac(P_CN,[{v:a,u:'cm'},{v:b,u:'cm'},null,null]));
    var mo=function(sai){ return nguoi('boy','Bạn Nam')+ve+'<div>Hình chữ nhật có chiều dài <b>'+a+' cm</b>, chiều rộng <b>'+b+' cm</b>. Bạn Nam tính diện tích hình: «<b>'+(sai ? '('+a+' + '+b+') × 2 = '+cvv+' cm²' : a+' × '+b+' = '+S+' cm²')+'</b>»'+(sai && lv>=2 ? '. Nam làm sai rồi!' : '.')+'</div>'; };
    if(lv<=1){ var D=dung ? 'Đồng ý' : 'Không đồng ý'; return {type:'mcq', cot:2, _lv:1, _a:a, _b:b, _dung:D, q:mo(!dung)+'<div>Em có đồng ý với Nam không?</div>', choices:['Đồng ý','Không đồng ý'], correct:dung?0:1, sai:(dung?{'1':'nhan-chu-vi'}:{'0':'nhan-chu-vi'}), goiY:gy()}; }
    if(lv===2){ var D2='Nam tính chu vi, không tính diện tích', m2=lapMCQ(D2, [['Nam quên đổi đơn vị','nham-bang'],['Nam cộng sai '+a+' + '+b,'nham-bang'],['Nam đếm thiếu ô vuông','dem-sot-o']]); return {type:'mcq', cot:1, _lv:2, _a:a, _b:b, _dung:D2, q:mo(true)+'<div>Nam sai ở đâu?</div>', choices:m2.choices, correct:m2.correct, sai:m2.sai, goiY:gy()}; }
    return {type:'num', _lv:3, _a:a, _b:b, q:mo(true)+'<div>Diện tích hình chữ nhật đúng là bao nhiêu xăng-ti-mét vuông?</div>', ans:S, sai:nhanSai([[cvv,'nhan-chu-vi'],[a+b,'cong-thay-nhan'],[S+a,'nham-bang'],[S-b,'nham-bang']], S), goiY:gy()};
  }, check:function(q){ var cs=docCanh(q.q); if(cs.length!==2 || cs[0].v!==q._a || cs[1].v!==q._b || q._a<=q._b) return false; var a=q._a, b=q._b, S=a*b, cvv=(a+b)*2;
    if(q._lv<=1){ var asm=/«<b>([^<]+)<\/b>»/.exec(q.q); if(!asm) return false; var ok = asm[1]===a+' × '+b+' = '+S+' cm²', sa = asm[1]==='('+a+' + '+b+') × 2 = '+cvv+' cm²'; if(ok===sa) return false; return kiemMCQ(q) && q.choices.length===2 && (q._dung==='Đồng ý')===ok; }
    if(q.q.indexOf('('+a+' + '+b+') × 2 = '+cvv+' cm²')<0) return false; if(q._lv===2) return kiemMCQ(q) && q.choices.length===4 && q._dung==='Nam tính chu vi, không tính diện tích'; return q.ans===S; }}
 ]
};
