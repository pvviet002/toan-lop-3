/* bai-50.js — Bài 50: Chu vi hình tam giác, hình tứ giác, hình chữ nhật, hình vuông (Tập 2, Chủ đề 9). BÀI MỚI, Engine v2 — LUYỆN THÔNG MINH.
   Theo bảng phân tích sư phạm đã duyệt (phan-tich-su-pham/bai-50.md): 3 MỤC TIÊU (muctieu) × 10 DẠNG (topics), mỗi dạng 3 mức (Thông tư 27).
   Hình (mới, mã tự dựng, không to đúng tỉ lệ): daGiac (đa giác có số đo trên từng cạnh), baHinh (ba hình A, B, C), queVuong (hình vuông xếp bằng que), vuonRau (vườn có cổng).
   check() đọc lại hình từ chuỗi SVG (data-seg, data-dv, data-hinh, data-dem, data-w, data-h, data-gate) và tính lại. QUY TẮC: nối chuỗi, KHÔNG backtick, KHÔNG template literal. */

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
var GOI={'thieu-canh':'Chu vi là tổng độ dài TẤT CẢ các cạnh. Bé đếm xem đã cộng đủ các cạnh chưa.',
  'nham-bang':'Bé cộng lại từng bước cho đúng nhé.',
  'dai-nhan-hai-cong-rong':'Chu vi hình chữ nhật là (dài + rộng) × 2: cộng dài với rộng trước, rồi mới nhân 2.',
  'quen-nhan-hai':'Chu vi hình chữ nhật gồm hai chiều dài và hai chiều rộng, nên phải nhân với 2.',
  'quen-nhan-bon':'Hình vuông có bốn cạnh bằng nhau, nên chu vi bằng cạnh × 4.',
  'nham-dien-tich':'Chu vi là độ dài đường bao quanh hình (cộng các cạnh), không phải nhân hai số với nhau.',
  'dem-sot-que':'Hình vuông có 4 cạnh, mỗi cạnh có cùng số que. Bé lấy số que một cạnh nhân với 4.',
  'quen-doi-don-vi':'Muốn tính chu vi, các số đo phải cùng đơn vị. Đổi 1 m = 100 cm (1 m = 10 dm) rồi mới tính.',
  'quen-tru-cong':'Hàng rào không bao quanh chỗ để cổng. Bé tính chu vi rồi trừ độ rộng của cổng.',
  'thieu-buoc':'Bài này có hai bước. Bé làm đủ các bước nhé!'};
function gy(extra){ var o={}, k; for(k in GOI) o[k]=GOI[k]; for(k in (extra||{})) o[k]=extra[k]; return o; }

/* ---- Hình ---- */
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
var P_TAM=[[150,22],[262,110],[38,110]], P_TU=[[78,26],[232,36],[258,112],[44,104]], P_CN=[[66,34],[234,34],[234,108],[66,108]], P_VUONG=[[106,30],[194,30],[194,118],[106,118]], P_NGU=[[150,18],[256,58],[218,114],[82,114],[44,58]];
function canhHop(c){ var t=c.reduce(function(a,b){ return a+b; },0); return c.every(function(x){ return x<t-x; }); }
function lonNhat(c){ return Math.max.apply(null,c); }
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
/* hình vuông xếp bằng que: mỗi cạnh k que; mỗi que một đoạn data-dem="que" */
function queVuong(k){
 var s=svgHinh(240,170,240), L=140, x0=50, y0=14, i, g=L/k, d=5;
 for(i=0;i<k;i++){
  s+='<line data-dem="que" x1="'+(x0+i*g+d)+'" y1="'+y0+'" x2="'+(x0+(i+1)*g-d)+'" y2="'+y0+'" stroke="'+HM.go+'" stroke-width="8" stroke-linecap="round"/>';
  s+='<line data-dem="que" x1="'+(x0+i*g+d)+'" y1="'+(y0+L)+'" x2="'+(x0+(i+1)*g-d)+'" y2="'+(y0+L)+'" stroke="'+HM.go+'" stroke-width="8" stroke-linecap="round"/>';
  s+='<line data-dem="que" x1="'+x0+'" y1="'+(y0+i*g+d)+'" x2="'+x0+'" y2="'+(y0+(i+1)*g-d)+'" stroke="'+HM.goNhat+'" stroke-width="8" stroke-linecap="round"/>';
  s+='<line data-dem="que" x1="'+(x0+L)+'" y1="'+(y0+i*g+d)+'" x2="'+(x0+L)+'" y2="'+(y0+(i+1)*g-d)+'" stroke="'+HM.goNhat+'" stroke-width="8" stroke-linecap="round"/>';
 }
 return s.replace('<svg ','<svg data-k="'+k+'" ');
}
/* vườn rau hình chữ nhật có chỗ để cổng ở cạnh dưới (gate = 0: không có cổng) */
function vuonRau(dai, rong, gate, dv){
 var s=svgX(300,150,300).replace('<svg ','<svg data-w="'+dai+'" data-h="'+rong+'" data-gate="'+gate+'" ');
 s+='<rect x="66" y="34" width="168" height="74" fill="'+HM.la+'"/>';
 if(gate>0) s+='<path d="M124 108 L66 108 L66 34 L234 34 L234 108 L176 108" fill="none" stroke="'+HM.goDam+'" stroke-width="6" stroke-linejoin="round" stroke-linecap="round"/><text x="150" y="132" text-anchor="middle" font-size="15" '+HFONT+' fill="currentColor">cổng '+gate+' '+dv+'</text>';
 else s+='<rect x="66" y="34" width="168" height="74" fill="none" stroke="'+HM.goDam+'" stroke-width="6" stroke-linejoin="round"/>';
 s+='<text x="150" y="24" text-anchor="middle" font-size="15" '+HFONT+' fill="currentColor">'+dai+' '+dv+'</text><text x="246" y="76" text-anchor="start" font-size="15" '+HFONT+' fill="currentColor">'+rong+' '+dv+'</text>';
 return s;
}
function docVuon(html){ var m=/data-w="(\d+)" data-h="(\d+)" data-gate="(\d+)"/.exec(html); return m ? {w:+m[1], h:+m[2], g:+m[3]} : null; }
var DV3=['cm','dm','m'];

var BAI = {
 n: 50,
 title: 'Chu Vi Tam Giác, Tứ Giác, Chữ Nhật, Vuông',
 sub: 'Luyện thông minh: câu hỏi tự đổi theo bé — làm hết lượt để xem ngọn lửa!',
 goal: 10, soCau: 18, soCauToiDa: 24,
 loi: {'thieu-canh':'Cộng thiếu một cạnh', 'nham-bang':'Cộng sai', 'dai-nhan-hai-cong-rong':'Tính dài × 2 + rộng', 'quen-nhan-hai':'Quên nhân 2 (chỉ cộng dài với rộng)', 'quen-nhan-bon':'Chu vi hình vuông: quên nhân 4', 'nham-dien-tich':'Nhầm chu vi với diện tích', 'dem-sot-que':'Đếm sót que tính', 'quen-doi-don-vi':'Quên đổi đơn vị trước khi tính', 'quen-tru-cong':'Quên trừ chỗ để cổng', 'thieu-buoc':'Thiếu một bước'},
 muctieu: [
  {id:'MT1', ten:'Chu vi tam giác, tứ giác (tổng các cạnh)', muc:['Tam giác, tứ giác có số đo nhỏ (2, 3, 4 cm).', 'Cạnh là số chục (20, 30, 40 dm); biết chu vi tìm cạnh còn lại; đa giác nhiều cạnh.', 'Dây đèn quanh hình ngũ giác; tìm cạnh còn lại khi biết chu vi.']},
  {id:'MT2', ten:'Chu vi hình chữ nhật, hình vuông', muc:['Chữ nhật 5 × 3 cm; hình vuông cạnh 5 cm.', 'Chữ nhật 15 × 10 dm; hình vuông cạnh 8 m, 10 m; chọn hình có chu vi cho trước.', 'Số đo lớn hơn; ba hình có chu vi gần nhau; que tính xếp hình vuông.']},
  {id:'MT3', ten:'Đổi đơn vị và bài toán thực tế', muc:['Bàn học 40 cm × 1 m: đổi 1 m = 100 cm; hàng rào vườn không có cổng.', 'Hàng rào vườn rau có chỗ để cổng; bạn Việt làm sai ở đâu.', 'Đáp số bằng dm; hàng rào để cổng; kết quả đúng của bạn Việt.']}
 ],
 topics: [
  /* D1 — Chu vi hình tam giác (bài 1, 2) */
  {name:'Chu vi hình tam giác', sec:'Bài 1, 2 — tam giác ABC (2, 3, 4 cm) = 9 cm; 7 + 10 + 14 = 31 cm; 20, 30, 40 dm = 90 dm', mt:['MT1'], levels:3,
   muc:['Ba cạnh nhỏ (2 đến 6 cm): tính chu vi.', 'Ba cạnh là số chục (dm hoặc m): tính chu vi.', 'Biết chu vi và hai cạnh: tìm cạnh còn lại.'],
   make:function(lv){
    var c, u, t, ve, ans, sai, q;
    do { if(lv<=1){ c=[rnd(2,6),rnd(2,6),rnd(2,6)]; u='cm'; } else if(lv===2){ c=[rnd(2,9)*5,rnd(2,9)*5,rnd(2,9)*5]; u=pick(['dm','m']); } else { c=[rnd(5,30),rnd(5,30),rnd(5,30)]; u=pick(['cm','dm']); } } while(!canhHop(c));
    t=c[0]+c[1]+c[2];
    if(lv<=2){ ve=khungHinh(daGiac(P_TAM,[{v:c[0],u:u},{v:c[1],u:u},{v:c[2],u:u}],['A','B','C'])); ans=t; q='<div>Chu vi hình tam giác ABC là bao nhiêu '+u+'?</div>'; sai=[[t-lonNhat(c),'thieu-canh'],[t-Math.min.apply(null,c),'thieu-canh'],[t+1,'nham-bang'],[t-1,'nham-bang'],[t+10,'nham-bang']]; }
    else { ve=khungHinh(daGiac(P_TAM,[{v:c[0],u:u},{v:c[1],u:u},{v:'?'}],['A','B','C'])); ans=c[2]; q='<div>Chu vi hình tam giác ABC là <b>'+t+' '+u+'</b>. Cạnh CA (ghi dấu ?) dài bao nhiêu '+u+'?</div>'; sai=[[t,'thieu-buoc'],[c[0]+c[1],'thieu-buoc'],[t-c[0],'thieu-buoc'],[t-c[1],'thieu-buoc'],[ans+1,'nham-bang']]; }
    return {type:'num', _lv:lv, _t:t, q:ve+q, ans:ans, sai:nhanSai(sai, ans), goiY:gy()};
  }, check:function(q){ var cs=docCanh(q.q); if(cs.length!==3) return false; var u=cs[0].u; if(cs.some(function(x){ return x.u!==u && x.v!==null; })) return false;
    if(q._lv<=2){ var c=cs.map(function(x){ return x.v; }); if(c.some(function(x){ return x===null || x<2; }) || !canhHop(c) || q.ans!==c[0]+c[1]+c[2] || q.ans>999) return false; return q._lv<=1 ? (u==='cm' && Math.max.apply(null,c)<=6) : (c.every(function(x){ return x%5===0; })); }
    var k=cs.filter(function(x){ return x.v===null; }); if(k.length!==1) return false; var dd=cs.filter(function(x){ return x.v!==null; }).map(function(x){ return x.v; }), t=q._t; if(q.q.indexOf('<b>'+t+' '+u+'</b>')<0) return false; var c3=t-dd[0]-dd[1]; return q.ans===c3 && canhHop([dd[0],dd[1],c3]); }},

  /* D2 — Chu vi hình tứ giác (bài 2) */
  {name:'Chu vi hình tứ giác', sec:'Bài 2 — tứ giác MNPQ (3, 4, 5, 2 cm) = 14 cm; 3, 4, 5, 6 dm = 18 dm; 10, 15, 10, 15 cm = 50 cm', mt:['MT1'], levels:3,
   muc:['Bốn cạnh nhỏ (2 đến 6 cm): tính chu vi.', 'Bốn cạnh là số chục hoặc số có hai chữ số: tính chu vi.', 'Biết chu vi và ba cạnh: tìm cạnh còn lại.'],
   make:function(lv){
    var c, u, t, ve, ans, sai, q;
    do { if(lv<=1){ c=[rnd(2,6),rnd(2,6),rnd(2,6),rnd(2,6)]; u='cm'; } else if(lv===2){ c=[rnd(2,9)*5,rnd(2,9)*5,rnd(2,9)*5,rnd(2,9)*5]; u=pick(['cm','dm']); } else { c=[rnd(5,30),rnd(5,30),rnd(5,30),rnd(5,30)]; u=pick(['dm','m']); } } while(!canhHop(c));
    t=c[0]+c[1]+c[2]+c[3];
    if(lv<=2){ ve=khungHinh(daGiac(P_TU,c.map(function(x){ return {v:x,u:u}; }),['M','N','P','Q'])); ans=t; q='<div>Chu vi hình tứ giác MNPQ là bao nhiêu '+u+'?</div>'; sai=[[t-lonNhat(c),'thieu-canh'],[t-Math.min.apply(null,c),'thieu-canh'],[t+1,'nham-bang'],[t-1,'nham-bang'],[t+10,'nham-bang']]; }
    else { ve=khungHinh(daGiac(P_TU,[{v:c[0],u:u},{v:c[1],u:u},{v:c[2],u:u},{v:'?'}],['M','N','P','Q'])); ans=c[3]; q='<div>Chu vi hình tứ giác MNPQ là <b>'+t+' '+u+'</b>. Cạnh QM (ghi dấu ?) dài bao nhiêu '+u+'?</div>'; sai=[[t,'thieu-buoc'],[c[0]+c[1]+c[2],'thieu-buoc'],[t-c[0],'thieu-buoc'],[t-c[1],'thieu-buoc'],[ans+1,'nham-bang']]; }
    return {type:'num', _lv:lv, _t:t, q:ve+q, ans:ans, sai:nhanSai(sai, ans), goiY:gy()};
  }, check:function(q){ var cs=docCanh(q.q); if(cs.length!==4) return false; var u=cs[0].u; if(cs.some(function(x){ return x.u!==u && x.v!==null; })) return false;
    if(q._lv<=2){ var c=cs.map(function(x){ return x.v; }); if(c.some(function(x){ return x===null || x<2; }) || !canhHop(c) || q.ans!==c[0]+c[1]+c[2]+c[3] || q.ans>999) return false; return q._lv<=1 ? (u==='cm' && Math.max.apply(null,c)<=6) : c.every(function(x){ return x%5===0; }); }
    var k=cs.filter(function(x){ return x.v===null; }); if(k.length!==1) return false; var dd=cs.filter(function(x){ return x.v!==null; }).map(function(x){ return x.v; }), t=q._t; if(q.q.indexOf('<b>'+t+' '+u+'</b>')<0) return false; var c4=t-dd[0]-dd[1]-dd[2]; return q.ans===c4 && canhHop([dd[0],dd[1],dd[2],c4]); }},

  /* D3 — Chu vi hình chữ nhật (bài 3) */
  {name:'Chu vi hình chữ nhật', sec:'Bài 3 — chữ nhật dài 5, rộng 3 cm: (5 + 3) × 2 = 16 cm; 6 × 4 cm, 8 × 2 m, 15 × 10 dm', mt:['MT2'], levels:3,
   muc:['Chiều dài, chiều rộng nhỏ (cm).', 'Chiều dài, chiều rộng hai chữ số, đơn vị dm hoặc m.', 'Số đo lớn hơn (đến hàng chục), tính chu vi.'],
   make:function(lv){
    var a, b, u;
    if(lv<=1){ b=rnd(2,6); a=b+rnd(1,5); u='cm'; } else if(lv===2){ b=rnd(2,10); a=b+rnd(2,10); u=pick(['dm','m']); } else { b=rnd(10,40); a=b+rnd(5,40); u=pick(DV3); }
    var ans=(a+b)*2, sai=[[a*2+b,'dai-nhan-hai-cong-rong'],[b*2+a,'dai-nhan-hai-cong-rong'],[a+b,'quen-nhan-hai'],[a*b,'nham-dien-tich'],[ans+2,'nham-bang']];
    return {type:'num', _lv:lv, q:khungHinh(daGiac(P_CN,[{v:a,u:u},{v:b,u:u},null,null]))+'<div>Hình chữ nhật có chiều dài <b>'+a+' '+u+'</b>, chiều rộng <b>'+b+' '+u+'</b>. Chu vi hình chữ nhật là bao nhiêu '+u+'?</div>', ans:ans, sai:nhanSai(sai, ans), goiY:gy()};
  }, check:function(q){ var cs=docCanh(q.q); if(cs.length!==2) return false; var a=cs[0].v, b=cs[1].v, u=cs[0].u; if(a===null || b===null || u!==cs[1].u || a<=b || q.ans!==(a+b)*2 || q.ans>999) return false;
    if(q.q.indexOf('<b>'+a+' '+u+'</b>')<0 || q.q.indexOf('<b>'+b+' '+u+'</b>')<0) return false; if(q._lv<=1) return u==='cm' && a<=11; if(q._lv===2) return (u==='dm' || u==='m') && a<=20; return a>=15; }},

  /* D4 — Chu vi hình vuông (bài 3, bảng) */
  {name:'Chu vi hình vuông', sec:'Bài 3 — hình vuông cạnh 5 cm: 5 × 4 = 20 cm; cạnh 6 cm, 8 m, 7 cm, 10 m', mt:['MT2'], levels:3,
   muc:['Hình vuông cạnh 5 cm (số nhỏ).', 'Hình vuông cạnh 8 m, 10 m.', 'Hình vuông có cạnh lớn hơn (đến hàng chục).'],
   make:function(lv){
    var a, u;
    if(lv<=1){ a=rnd(2,9); u='cm'; } else if(lv===2){ a=rnd(6,12); u=pick(['dm','m']); } else { a=rnd(12,60); u=pick(DV3); }
    var ans=a*4, sai=[[a*2,'quen-nhan-bon'],[a*3,'quen-nhan-bon'],[a+4,'quen-nhan-bon'],[a*a,'nham-dien-tich'],[ans+4,'nham-bang']];
    return {type:'num', _lv:lv, q:khungHinh(daGiac(P_VUONG,[{v:a,u:u},null,null,null]))+'<div>Hình vuông có cạnh <b>'+a+' '+u+'</b>. Chu vi hình vuông là bao nhiêu '+u+'?</div>', ans:ans, sai:nhanSai(sai, ans), goiY:gy()};
  }, check:function(q){ var cs=docCanh(q.q); if(cs.length!==1 || cs[0].v===null) return false; var a=cs[0].v, u=cs[0].u; if(q.ans!==a*4 || q.q.indexOf('<b>'+a+' '+u+'</b>')<0) return false; if(q._lv<=1) return u==='cm' && a<=9; if(q._lv===2) return a>=6 && a<=12; return a>=12; }},

  /* D5 — Chọn chu vi cho ba hình (bài 4) */
  {name:'Chọn hình có chu vi cho trước', sec:'Bài 4 — chữ nhật 8 × 5, vuông cạnh 7, chữ nhật 5 × 10 nối với chu vi 26, 28, 30 cm', mt:['MT2'], levels:3,
   muc:['Ba hình có chu vi khác xa nhau: chọn hình có chu vi cho trước.', 'Hai hình có chu vi gần nhau.', 'Ba hình có chu vi sát nhau (cách nhau 2 cm).'],
   make:function(lv){
    var hs, cv, g;
    for(g=0; g<400; g++){
     hs=[{k:'c', a:rnd(6,12), b:rnd(3,5)}, {k:'v', a:rnd(4,9), b:0}, {k:'c', a:rnd(8,14), b:rnd(4,6)}];
     if(hs[0].a<=hs[0].b || hs[2].a<=hs[2].b) continue;
     cv=hs.map(chuViHinh); if(new Set(cv).size<3) continue;
     var srt=cv.slice().sort(function(x,y){ return x-y; }), d=Math.min(srt[1]-srt[0], srt[2]-srt[1]);
     if(lv<=1 && d>=6) break; if(lv===2 && d>=2 && d<=4) break; if(lv>=3 && d===2) break;
    }
    hs=shuffle(hs); var cvs=hs.map(chuViHinh), ia=rnd(0,2), t=cvs[ia], ch=['Hình A','Hình B','Hình C'], D=ch[ia], sai={}; ch.forEach(function(c,i){ if(c!==D) sai[String(i)]='nham-bang'; });
    return {type:'mcq', cot:1, _lv:lv, _dung:D, _t:t, q:khungHinh(baHinh(hs,'cm').replace(/<\/svg>$/,''))+'<div>Hình nào có chu vi <b>'+t+' cm</b>?</div>', choices:ch, correct:ia, sai:sai, goiY:gy()};
  }, check:function(q){ var hs=docBaHinh(q.q); if(hs.length!==3 || !kiemMCQ(q)) return false; var cv=hs.map(chuViHinh); if(new Set(cv).size!==3 || hs.some(function(h){ return h.k==='c' && h.a<=h.b; })) return false;
    var hit=cv.filter(function(x){ return x===q._t; }); if(hit.length!==1 || cv.indexOf(q._t)!==['Hình A','Hình B','Hình C'].indexOf(q._dung)) return false;
    var s=cv.slice().sort(function(x,y){ return x-y; }), d=Math.min(s[1]-s[0], s[2]-s[1]); if(q._lv<=1) return d>=6; if(q._lv===2) return d>=2 && d<=4; return d===2; }},

  /* D6 — Que tính xếp hình vuông (bài 5) */
  {name:'Que tính xếp hình vuông', sec:'Bài 5 — xếp hình vuông có cạnh gồm 3 que: cần 12 que', mt:['MT3'], levels:3,
   muc:['Cạnh hình vuông gồm 3 que.', 'Cạnh gồm 4 que.', 'Cạnh gồm 5 que.'],
   make:function(lv){
    var k = lv<=1 ? 3 : (lv===2 ? 4 : 5), ans=k*4;
    return {type:'num', _lv:lv, _k:k, q:khungHinh(queVuong(k).replace(/<\/svg>$/,''))+'<div>Mỗi cạnh của hình vuông gồm <b>'+k+' que tính</b>. Xếp cả hình vuông cần mấy que tính?</div>', ans:ans, sai:nhanSai([[k*3,'dem-sot-que'],[k*2,'dem-sot-que'],[ans-1,'dem-sot-que'],[ans+1,'dem-sot-que'],[k*k,'nham-dien-tich']], ans), goiY:gy()};
  }, check:function(q){ var n=(q.q.match(/data-dem="que"/g)||[]).length, m=/data-k="(\d+)"/.exec(q.q); if(!m) return false; var k=+m[1]; return n===4*k && q._k===k && q.ans===n && q.q.indexOf('<b>'+k+' que tính</b>')>=0 && k===(q._lv<=1 ? 3 : (q._lv===2 ? 4 : 5)); }},

  /* D7 — Dây đèn quanh hình (bài 6) */
  {name:'Dây đèn quanh hình', sec:'Bài 6 — dây đèn trang trí thuyền: 60 + 25 + 40 + 25 = 150 cm', mt:['MT1'], levels:3,
   muc:['Dây đèn quanh hình tam giác (lá cờ).', 'Dây đèn quanh hình bốn cạnh (thuyền): 60 + 25 + 40 + 25.', 'Dây đèn quanh hình năm cạnh.'],
   make:function(lv){
    var n = lv<=1 ? 3 : (lv===2 ? 4 : 5), c=[], i, u='cm';
    do { c=[]; for(i=0;i<n;i++) c.push(rnd(2,12)*5); } while(!canhHop(c));
    var P = n===3 ? P_TAM : (n===4 ? P_TU : P_NGU), t=c.reduce(function(a,b){ return a+b; },0), vat = n===3 ? 'lá cờ' : (n===4 ? 'chiếc thuyền' : 'ngôi nhà nhỏ');
    return {type:'num', _lv:lv, q:khungHinh(daGiac(P, c.map(function(x){ return {v:x,u:u}; })))+'<div>Bác thợ gắn dây đèn quanh mép '+vat+' như hình. Cần bao nhiêu xăng-ti-mét dây đèn?</div>', ans:t, sai:nhanSai([[t-lonNhat(c),'thieu-canh'],[t-Math.min.apply(null,c),'thieu-canh'],[t+5,'nham-bang'],[t-5,'nham-bang'],[t+10,'nham-bang']], t), goiY:gy()};
  }, check:function(q){ var cs=docCanh(q.q), n=q._lv<=1 ? 3 : (q._lv===2 ? 4 : 5); if(cs.length!==n || cs.some(function(x){ return x.v===null || x.u!=='cm' || x.v%5!==0; })) return false; var c=cs.map(function(x){ return x.v; }); return canhHop(c) && q.ans===c.reduce(function(a,b){ return a+b; },0) && q.ans<=999; }},

  /* D8 — Đổi đơn vị rồi tính chu vi (bài 7) */
  {name:'Đổi đơn vị rồi tính chu vi', sec:'Bài 7 — bàn học 40 cm × 1 m: (40 + 100) × 2 = 280 cm', mt:['MT3'], levels:3,
   muc:['Dài 1 m, rộng là số cm: đáp số bằng cm.', 'Dài 2 m, rộng là số cm: đáp số bằng cm.', 'Dài là m, rộng là số chục cm: đáp số bằng dm.'],
   make:function(lv){
    var m, r, ans, u2, q, sai;
    if(lv<=1){ m=1; r=rnd(2,9)*10; ans=(m*100+r)*2; u2='cm'; sai=[[(m+r)*2,'quen-doi-don-vi'],[m*100+r,'quen-nhan-hai'],[(m*100+r)*2+20,'nham-bang'],[m*100*2+r,'dai-nhan-hai-cong-rong']]; }
    else if(lv===2){ m=2; r=rnd(2,9)*10; ans=(m*100+r)*2; u2='cm'; sai=[[(m+r)*2,'quen-doi-don-vi'],[m*100+r,'quen-nhan-hai'],[(m*100+r)*2+20,'nham-bang'],[m*100*2+r,'dai-nhan-hai-cong-rong']]; }
    else { m=rnd(1,3); r=rnd(1,5)*10; ans=(m*10+r/10)*2; u2='dm'; sai=[[(m+r)*2,'quen-doi-don-vi'],[(m*10+r)*2,'quen-doi-don-vi'],[m*10+r/10,'quen-nhan-hai'],[ans+2,'nham-bang']]; }
    return {type:'num', _lv:lv, q:khungHinh(daGiac(P_CN,[{v:m,u:'m'},{v:r,u:'cm'},null,null]))+'<div>Mặt bàn hình chữ nhật dài <b>'+m+' m</b>, rộng <b>'+r+' cm</b>. Chu vi mặt bàn là bao nhiêu '+u2+'?</div>', ans:ans, sai:nhanSai(sai, ans), goiY:gy()};
  }, check:function(q){ var cs=docCanh(q.q); if(cs.length!==2 || cs[0].u!=='m' || cs[1].u!=='cm') return false; var m=cs[0].v, r=cs[1].v; if(r%10!==0) return false; var e = q._lv>=3 ? (m*10+r/10)*2 : (m*100+r)*2; if(q.ans!==e || q.ans>999) return false;
    if(q._lv<=1) return m===1; if(q._lv===2) return m===2; return m>=1 && m<=3 && q.q.indexOf('bao nhiêu dm')>=0; }},

  /* D9 — Hàng rào vườn rau (bài 8) */
  {name:'Hàng rào vườn rau', sec:'Bài 8 — vườn rau 9 m × 5 m, để cổng 2 m: (9 + 5) × 2 − 2 = 26 m', mt:['MT3'], levels:3,
   muc:['Hàng rào bao quanh vườn (không có cổng).', 'Vườn để cổng 2 m: hàng rào dài bao nhiêu.', 'Vườn lớn hơn, để cổng 3 m hoặc 4 m.'],
   make:function(lv){
    var a, b, g;
    if(lv<=1){ b=rnd(3,8); a=b+rnd(2,6); g=0; } else if(lv===2){ b=rnd(4,8); a=b+rnd(2,6); g=2; } else { b=rnd(6,15); a=b+rnd(3,10); g=pick([3,4]); }
    var cv=(a+b)*2, ans=cv-g, sai=[[cv,'quen-tru-cong'],[cv+g,'quen-tru-cong'],[(a+b)-g,'quen-nhan-hai'],[a*b-g,'nham-dien-tich'],[ans+2,'nham-bang']];
    return {type:'num', _lv:lv, q:khungHinh(vuonRau(a,b,g,'m').replace(/<\/svg>$/,''))+'<div>Bác làm hàng rào quanh vườn rau hình chữ nhật dài <b>'+a+' m</b>, rộng <b>'+b+' m</b>'+(g ? ', chừa lối đi (cổng) rộng <b>'+g+' m</b>, không làm hàng rào ở chỗ cổng' : '')+'. Hàng rào dài bao nhiêu mét?</div>', ans:ans, sai:nhanSai(sai, ans), goiY:gy()};
  }, check:function(q){ var t=docVuon(q.q); if(!t || t.w<=t.h) return false; if(q.ans!==(t.w+t.h)*2-t.g || q.ans<=0) return false; if(q.q.indexOf('<b>'+t.w+' m</b>')<0 || q.q.indexOf('<b>'+t.h+' m</b>')<0) return false;
    if(q._lv<=1) return t.g===0; if(q._lv===2) return t.g===2 && q.q.indexOf('<b>2 m</b>')>=0; return (t.g===3 || t.g===4) && t.h>=6; }},

  /* D10 — Bạn Việt làm (bài 7, sửa lỗi) */
  {name:'Bạn Việt làm', sec:'Bài 7 — bàn học 40 cm × 1 m: Việt tính (40 + 1) × 2 = 82 cm; Việt làm sai ở đâu', mt:['MT3'], levels:3,
   muc:['Việt tính chu vi mặt bàn: em có đồng ý không.', 'Việt tính sai: Việt sai ở đâu.', 'Việt tính sai: kết quả đúng là bao nhiêu.'],
   make:function(lv){
    var r=rnd(2,9)*10, tc=(r+100)*2, sv=(r+1)*2, dung=Math.random()<0.5, vp = dung ? '('+r+' + 100) × 2 = '+tc+' cm' : '('+r+' + 1) × 2 = '+sv+' cm';
    var mo=nguoi('boy','Bạn Việt')+'<div>Mặt bàn hình chữ nhật dài <b>1 m</b>, rộng <b>'+r+' cm</b>. Bạn Việt tính chu vi mặt bàn: «<b>'+vp+'</b>».</div>';
    if(lv<=1){ var D=dung ? 'Đồng ý' : 'Không đồng ý'; return {type:'mcq', cot:2, _lv:1, _r:r, _dung:D, _vd:dung?1:0, q:mo+'<div>Em có đồng ý với Việt không?</div>', choices:['Đồng ý','Không đồng ý'], correct:dung?0:1, sai:(dung?{'1':'quen-doi-don-vi'}:{'0':'quen-doi-don-vi'}), goiY:gy()}; }
    if(dung){ vp='('+r+' + 1) × 2 = '+sv+' cm'; mo=nguoi('boy','Bạn Việt')+'<div>Mặt bàn hình chữ nhật dài <b>1 m</b>, rộng <b>'+r+' cm</b>. Bạn Việt tính chu vi mặt bàn: «<b>'+vp+'</b>». Việt làm sai rồi!</div>'; }
    else mo=mo.replace(/<\/div>$/,' Việt làm sai rồi!</div>');
    if(lv===2){ var D2='Việt chưa đổi 1 m ra 100 cm trước khi cộng', m2=lapMCQ(D2, [['Việt quên nhân với 2','quen-nhan-hai'],['Việt cộng 40 với 1 chưa đúng','nham-bang'],['Việt nên lấy dài nhân rộng','nham-dien-tich']]);
      return {type:'mcq', cot:1, _lv:2, _r:r, _dung:D2, q:mo+'<div>Việt sai ở đâu?</div>', choices:m2.choices, correct:m2.correct, sai:m2.sai, goiY:gy()}; }
    return {type:'num', _lv:3, _r:r, q:mo+'<div>Chu vi mặt bàn đúng là bao nhiêu xăng-ti-mét?</div>', ans:tc, sai:nhanSai([[sv,'quen-doi-don-vi'],[r+100,'quen-nhan-hai'],[tc+20,'nham-bang'],[r*2+100,'dai-nhan-hai-cong-rong']], tc), goiY:gy()};
  }, check:function(q){ var r=q._r; if(r%10!==0 || r<20 || r>90) return false; var tc=(r+100)*2, sv=(r+1)*2;
    if(q._lv<=1){ var asm=/«<b>([^<]+)<\/b>»/.exec(q.q); if(!asm) return false; var ok = asm[1]==='('+r+' + 100) × 2 = '+tc+' cm', sa = asm[1]==='('+r+' + 1) × 2 = '+sv+' cm'; if(!ok && !sa) return false; return kiemMCQ(q) && q.choices.length===2 && (q._dung==='Đồng ý')===ok; }
    if(q._lv===2) return kiemMCQ(q) && q.choices.length===4 && q._dung==='Việt chưa đổi 1 m ra 100 cm trước khi cộng' && q.q.indexOf('('+r+' + 1) × 2 = '+sv+' cm')>=0; return q.ans===tc && q.q.indexOf('('+r+' + 1) × 2 = '+sv+' cm')>=0; }}
 ]
};
