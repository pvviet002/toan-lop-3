/* bai-57.js — Bài 57: Chia số có bốn chữ số cho số có một chữ số (Tập 2, Chủ đề 10). BÀI MỚI, Engine v2 — LUYỆN THÔNG MINH.
   Theo bảng phân tích sư phạm đã duyệt (phan-tich-su-pham/bai-57.md): 3 MỤC TIÊU (muctieu) × 10 DẠNG (topics), mỗi dạng 3 mức (Thông tư 27).
   Hình (mới, mã tự dựng): chiaDoc4 (chia dọc đến bốn chữ số, dựng từ chiaDoc3 bài 37 và bài 44), bangChia (bảng số bị chia, số chia, thương, số dư), soDoLan (sơ đồ «gấp lên»).
   Số dư luôn bé hơn số chia. check() đọc lại hình từ chuỗi SVG (data-pt, data-bc, data-lan) và tính lại.
   QUY TẮC: nối chuỗi, KHÔNG backtick, KHÔNG template literal. */

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
/* ---- Phép chia số bốn chữ số cho số có một chữ số (chia dọc) ---- */
function buocChia4(a, b){
 var d=[Math.floor(a/1000), Math.floor(a/100)%10, Math.floor(a/10)%10, a%10], steps=[], start=0, cur=d[0], j, q, t, r;
 if(cur<b){ cur=d[0]*10+d[1]; start=1; }
 q=Math.floor(cur/b); t=q*b; r=cur-t; steps.push({col:start, cur:cur, q:q, t:t, r:r});
 for(j=start+1;j<4;j++){ cur=r*10+d[j]; q=Math.floor(cur/b); t=q*b; r=cur-t; steps.push({col:j, cur:cur, q:q, t:t, r:r}); }
 return {d:d, steps:steps, thuong:steps.map(function(s){ return s.q; }).join(''), q:Math.floor(a/b), r:a%b};
}
var XC=[40,76,112,148], QC=[200,236,272,308];
/* tuy.an: 'q<i>' ô ? ở chữ số thứ i của thương (từ đơn vị); 'thuong' chỉ khung chia, thương là ô ?; 'du' khung chia, thương hiện, số dư là ô ? */
function chuSoChia4(a, b, tuy){
 tuy=tuy||{}; var B=buocChia4(a,b), it=[], row=0, k, s, i, yRow=44, lines=[], H=140;
 function add(id, x, y, ch, rong){ it.push({id:id, x:x, y:y, ch:ch, rong:rong}); }
 add('a3', XC[0], 44, String(B.d[0])); add('a2', XC[1], 44, String(B.d[1])); add('a1', XC[2], 44, String(B.d[2])); add('a0', XC[3], 44, String(B.d[3])); add('b0', QC[0], 44, String(b));
 var th=B.thuong, L=th.length;
 if(tuy.an==='thuong'){ add('qt', 264, 96, '?', true); return {it:it, H:140, B:B, lines:[], khung:true}; }
 for(i=0;i<L;i++){ var qi=L-1-i; add('q'+qi, QC[i], 96, (tuy.an==='q'+qi) ? '?' : th.charAt(i)); }
 if(tuy.an==='du'){ add('r', XC[3], 134, '?'); return {it:it, H:172, B:B, lines:[], khung:true, du:true}; }
 for(k=0;k<B.steps.length;k++){ s=B.steps[k];
  if(k>0) add('h'+k, XC[s.col], yRow, String(B.d[s.col]));
  var yU=yRow+46, tt=String(s.t), n=tt.length;
  for(i=0;i<n;i++) add('u'+k+'_'+(n-1-i), XC[s.col-(n-1)+i], yU, tt.charAt(i));
  lines.push([XC[s.col-(n-1)]-18, yU+12, XC[s.col]+18]); yRow=yU+46;
  add('r'+k, XC[s.col], yRow, String(s.r));
 }
 return {it:it, H:yRow+30, B:B, lines:lines};
}
function chiaDoc4(a, b, tuy){
 var o=chuSoChia4(a,b,tuy), s=svgX(340,o.H,340);
 o.it.forEach(function(e){
  if(e.ch==='?' && e.rong) s+='<rect x="'+(e.x-70)+'" y="62" width="140" height="46" rx="8" fill="none" stroke="'+HM.hoi+'" stroke-width="2.5" stroke-dasharray="5 3"/>';
  else if(e.ch==='?') s+='<rect x="'+(e.x-17)+'" y="'+(e.y-27)+'" width="34" height="37" rx="7" fill="none" stroke="'+HM.hoi+'" stroke-width="2.5" stroke-dasharray="5 3"/>';
  s+='<text data-pt="'+e.id+'" x="'+e.x+'" y="'+e.y+'" text-anchor="middle" font-size="34" '+HFONT+' fill="'+(e.ch==='?' ? HM.hoi : 'currentColor')+'">'+e.ch+'</text>';
 });
 o.lines.forEach(function(l){ s+='<text x="12" y="'+(l[1]-12)+'" text-anchor="middle" font-size="26" '+HFONT+' fill="currentColor">&#8722;</text><line x1="'+l[0]+'" y1="'+l[1]+'" x2="'+l[2]+'" y2="'+l[1]+'" stroke="currentColor" stroke-width="3" stroke-linecap="round"/>'; });
 s+='<line x1="170" y1="10" x2="170" y2="106" stroke="currentColor" stroke-width="3" stroke-linecap="round"/><line x1="170" y1="54" x2="334" y2="54" stroke="currentColor" stroke-width="3" stroke-linecap="round"/>';
 if(o.du) s+='<text x="76" y="134" text-anchor="middle" font-size="22" '+HFONT+' fill="currentColor">dư</text>';
 return khungHinh(s);
}
function kiemChia4(q){
 var p=q._pt, o=chuSoChia4(p.a, p.b, {an:p.an}), d=docPT(q.q), want={};
 o.it.forEach(function(e){ want[e.id]=e.ch; });
 var ids=Object.keys(want);
 return p.a>=1000 && p.a<=9999 && p.b>=2 && p.b<=9 && ids.length===Object.keys(d).length && ids.every(function(k){ return d[k]===want[k]; });
}
/* cặp (a, b): a bốn chữ số, b một chữ số; kieu 'het' (không dư) hoặc 'du' (có dư); zq: các số chữ số 0 được phép của thương; qmin, qmax: khoảng của thương */
function capChia(bs, kieu, zq, qmin, qmax){
 for(var g=0; g<12000; g++){
  var b=pick(bs), a=rnd(1000,9999), q=Math.floor(a/b), r=a%b;
  if(kieu==='het' && r!==0) continue; if(kieu==='du' && r===0) continue; if(zq && zq.indexOf(demKhongA(q))<0) continue; if(qmin && q<qmin) continue; if(qmax && q>qmax) continue;
  return {a:a, b:b, q:q, r:r};
 }
 return {a:6408, b:2, q:3204, r:0};
}
/* bảng: số bị chia, số chia, thương, số dư; an: 'th' | 'du' | 'sbc' là ô ? */
function bangChia(a, b, q, r, an){
 var s=svgX(300,104,300).replace('<svg ','<svg data-bc="'+a+','+b+','+q+','+r+','+an+'" '), cs=[['sbc',['Số bị','chia'],a],['sc',['Số','chia'],b],['th',['Thương',''],q],['du',['Số dư',''],r]], i;
 cs.forEach(function(c,i2){ var x=6+i2*72, hien = c[0]===an ? '?' : String(c[2]);
  s+='<rect x="'+x+'" y="4" width="68" height="44" rx="8" fill="'+HM.vang+'"/><text x="'+(x+34)+'" y="'+(c[1][1] ? 22 : 31)+'" text-anchor="middle" font-size="15" '+HFONT+' fill="'+HM.chu+'">'+c[1][0]+'</text>'+(c[1][1] ? '<text x="'+(x+34)+'" y="40" text-anchor="middle" font-size="15" '+HFONT+' fill="'+HM.chu+'">'+c[1][1]+'</text>' : '');
  s+='<rect x="'+x+'" y="52" width="68" height="46" rx="8" fill="#fff" stroke="'+(hien==='?' ? HM.hoi : HM.day)+'" stroke-width="3" '+(hien==='?' ? 'stroke-dasharray="5 3"' : '')+'/><text data-pt="'+c[0]+'" x="'+(x+34)+'" y="84" text-anchor="middle" font-size="22" '+HFONT+' fill="'+(hien==='?' ? HM.hoi : HM.chu)+'">'+(hien==='?' ? '?' : sx(c[2]))+'</text>'; });
 return s;
}
function docBang(html){ var m=/data-bc="(\d+),(\d+),(\d+),(\d+),(\w+)"/.exec(html); return m ? {a:+m[1], b:+m[2], q:+m[3], r:+m[4], an:m[5]} : null; }
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
var GOI={'quen-ha':'Chia xong một hàng, bé HẠ chữ số tiếp theo xuống rồi chia tiếp.',
  'thieu-so-0':'Hạ chữ số xuống mà không chia được thì viết 0 ở thương rồi hạ tiếp (6 606 : 6 = 1 101).',
  'du-lon-hon-chia':'Số dư luôn bé hơn số chia. Nếu số dư còn lớn hơn hoặc bằng số chia thì chia tiếp.',
  'nham-thuong-du':'Thương là kết quả của phép chia, số dư là phần còn lại. Muốn thử: thương × số chia + số dư = số bị chia.',
  'nham-hang':'Bé nhẩm theo nghìn, theo trăm rồi viết đủ chữ số 0: 8 nghìn : 2 = 4 nghìn = 4 000.',
  'so-sanh-sai':'Bé tính giá trị hai vế rồi mới so sánh.',
  'doc-de-sai':'«Giảm đi k lần» là chia cho k; «gấp k lần» là nhân với k. Bé đọc kỹ câu hỏi.',
  'thieu-buoc':'Bài này có hai bước. Bé làm đủ các bước nhé!'};
function gy(extra){ var o={}, k; for(k in GOI) o[k]=GOI[k]; for(k in (extra||{})) o[k]=extra[k]; return o; }
var TEN_LOI={'thieu-so-0':'Thương thiếu chữ số 0', 'du-lon-hon-chia':'Số dư lớn hơn hoặc bằng số chia', 'quen-ha':'Quên hạ chữ số'};

var BAI = {
 n: 57,
 title: 'Chia Số Có Bốn Chữ Số Cho Số Có Một Chữ Số',
 sub: 'Luyện thông minh: câu hỏi tự đổi theo bé — làm hết lượt để xem ngọn lửa!',
 goal: 10, soCau: 18, soCauToiDa: 24,
 loi: {'quen-ha':'Quên hạ chữ số', 'thieu-so-0':'Thương thiếu chữ số 0', 'du-lon-hon-chia':'Số dư lớn hơn hoặc bằng số chia', 'nham-thuong-du':'Nhầm thương với số dư', 'nham-hang':'Nhầm hàng khi nhẩm số tròn', 'so-sanh-sai':'So sánh sai', 'doc-de-sai':'Đọc sai «giảm đi», «gấp lên»', 'thieu-buoc':'Thiếu một bước'},
 muctieu: [
  {id:'MT1', ten:'Chia hết (đặt tính, thương có chữ số 0)', muc:['Chia hết, số chia 2 đến 3, thương không có chữ số 0 (6 408 : 2 = 3 204); thương ba chữ số có một chữ số 0 (4 806 : 6).', 'Số chia 3 đến 5 (1 275 : 3); thương bốn chữ số có một chữ số 0 (6 606 : 6 = 1 101).', 'Số chia đến 9 (6 393 : 3); thương có hai chữ số 0 (5 025 : 5 = 1 005); bạn An thiếu chữ số 0.']},
  {id:'MT2', ten:'Chia có dư; bảng số bị chia, số chia, thương, số dư', muc:['Số chia 2, 3 (9 365 : 3 = 3 121 dư 2); chia nhóm: số nhóm; bảng điền thương.', 'Số chia 4 đến 6 (2 249 : 4 = 562 dư 1; 6 729 : 6); điền số dư; bảng điền số dư.', 'Số chia 7 đến 9 (4 163 : 8 = 520 dư 3); chia nhóm: số người còn dư; bảng điền số bị chia.']},
  {id:'MT3', ten:'Nhẩm, so sánh, toán đố (giảm đi, gấp lên)', muc:['8 000 : 2; 6 000 : 2 ? 2 999; giảm đi 3 lần.', '7 000 : 7; 3 000 : 3 ? 200 × 5; B gấp 3 lần A, biết B tìm A.', '3 500 : 5; 3 500 : 5 ? 4 000 : 5; B gấp 3 lần A, C gấp 4 lần A (hai bước).']}
 ],
 topics: [
  /* D1 — Đặt tính chia hết, điền một chữ số (khám phá, bài 1) */
  {name:'Đặt tính chia hết, điền một chữ số', sec:'Khám phá, bài 1 — 6 408 : 2 = 3 204; 1 275 : 3 = 425; 6 393 : 3 = 2 131: điền chữ số ở ô ?', mt:['MT1'], levels:3,
   muc:['Chia hết cho 2 hoặc 3, thương không có chữ số 0.', 'Chia hết cho 3, 4 hoặc 5.', 'Chia hết cho số từ 3 đến 9.'],
   make:function(lv){
    var p = lv<=1 ? capChia([2,3],'het',[0]) : (lv===2 ? capChia([3,4,5],'het',[0,1]) : capChia([3,4,5,6,7,8,9],'het',[0,1]));
    var th=String(p.q), pos=[], i;
    for(i=0;i<th.length;i++) if(th.charAt(i)!=='0') pos.push(th.length-1-i);
    var an=pick(pos), ans=cotSo(p.q, an);
    return {type:'num', _lv:lv, _pt:{a:p.a,b:p.b,an:'q'+an}, q:chiaDoc4(p.a,p.b,{an:'q'+an})+'<div>Chữ số ở ô <b class="text-amber-700">?</b> của thương là mấy?</div>', ans:ans, sai:nhanSai([[ans+1,'quen-ha'],[ans-1,'quen-ha'],[ans+2,'quen-ha'],[(ans+5)%10===0 ? 1 : (ans+5)%10,'quen-ha']], ans), goiY:gy()};
  }, check:function(q){ var p=q._pt; if(!kiemChia4(q)) return false; var c=chia(p.a,p.b); if(c.r!==0) return false; var idx=+p.an.slice(1); if(q.ans!==cotSo(c.q,idx) || q.ans<=0) return false;
    if(q._lv<=1) return p.b<=3 && demKhongA(c.q)===0; if(q._lv===2) return p.b>=3 && p.b<=5; return p.b>=3; }},

  /* D2 — Thương có chữ số 0 (bài 1, 3) */
  {name:'Thương có chữ số 0', sec:'Bài 1, 3 — 6 606 : 6 = 1 101; 5 025 : 5 = 1 005; 4 806 : 6 = 801', mt:['MT1'], levels:3,
   muc:['Thương ba chữ số có một chữ số 0 (4 806 : 6 = 801).', 'Thương bốn chữ số có một chữ số 0 (6 606 : 6 = 1 101).', 'Thương bốn chữ số có hai chữ số 0 (5 025 : 5 = 1 005).'],
   make:function(lv){
    var p = lv<=1 ? capChia([2,3,4,5,6,7,8,9],'het',[1],100,999) : (lv===2 ? capChia([2,3,4,5,6,7,8,9],'het',[1],1000) : capChia([2,3,4,5],'het',[2],1000));
    return {type:'num', _lv:lv, _pt:{a:p.a,b:p.b,an:'thuong'}, q:chiaDoc4(p.a,p.b,{an:'thuong'})+'<div>Tính thương của phép chia <b>'+sx(p.a)+' : '+p.b+'</b>.</div>', ans:p.q, sai:nhanSai([[+String(p.q).replace(/0/g,''),'thieu-so-0'],[p.q+10,'quen-ha'],[p.q-1,'quen-ha'],[p.q+100,'quen-ha'],[Math.floor(p.q/10),'quen-ha']], p.q), goiY:gy()};
  }, check:function(q){ var p=q._pt; if(!kiemChia4(q)) return false; var c=chia(p.a,p.b); if(c.r!==0 || q.ans!==c.q) return false; var z=demKhongA(c.q); if(q._lv<=1) return z===1 && c.q<1000; if(q._lv===2) return z===1 && c.q>=1000; return z===2 && c.q>=1000; }},

  /* D3 — Chia có dư, điền thương (khám phá, bài 3) */
  {name:'Chia có dư, điền thương', sec:'Khám phá, bài 3 — 9 365 : 3 = 3 121 (dư 2); 2 249 : 4 = 562 (dư 1); 4 163 : 8 = 520 (dư 3)', mt:['MT2'], levels:3,
   muc:['Số chia 2 hoặc 3: tìm thương.', 'Số chia 4 đến 6: tìm thương.', 'Số chia 7 đến 9: tìm thương.'],
   make:function(lv){
    var p = lv<=1 ? capChia([2,3],'du') : (lv===2 ? capChia([4,5,6],'du') : capChia([7,8,9],'du'));
    return {type:'num', _lv:lv, _pt:{a:p.a,b:p.b,an:'thuong'}, q:chiaDoc4(p.a,p.b,{an:'thuong'})+'<div>Tính thương của phép chia <b>'+sx(p.a)+' : '+p.b+'</b> (chia có dư).</div>', ans:p.q, sai:nhanSai([[p.r,'nham-thuong-du'],[p.q+1,'quen-ha'],[p.q-1,'quen-ha'],[Math.floor(p.q/10),'quen-ha'],[+String(p.q).replace(/0/g,''),'thieu-so-0']], p.q), goiY:gy()};
  }, check:function(q){ var p=q._pt; if(!kiemChia4(q)) return false; var c=chia(p.a,p.b); if(c.r===0 || q.ans!==c.q) return false; if(q._lv<=1) return p.b<=3; if(q._lv===2) return p.b>=4 && p.b<=6; return p.b>=7; }},

  /* D4 — Chia có dư, điền số dư (bài 3) */
  {name:'Chia có dư, điền số dư', sec:'Bài 3 — 9 365 : 3 = 3 121 dư 2; 6 729 : 6 = 1 121 dư 3; 4 163 : 8 = 520 dư 3', mt:['MT2'], levels:3,
   muc:['Số chia 3: tìm số dư.', 'Số chia 4 đến 6: tìm số dư.', 'Số chia 7 đến 9: tìm số dư.'],
   make:function(lv){
    var p = lv<=1 ? capChia([2,3],'du') : (lv===2 ? capChia([4,5,6],'du') : capChia([7,8,9],'du'));
    return {type:'num', _lv:lv, _pt:{a:p.a,b:p.b,an:'du'}, q:chiaDoc4(p.a,p.b,{an:'du'})+'<div>Phép chia <b>'+sx(p.a)+' : '+p.b+' = '+sx(p.q)+'</b> còn dư. Số dư ở ô <b class="text-amber-700">?</b> là bao nhiêu?</div>', ans:p.r, sai:nhanSai([[p.b,'du-lon-hon-chia'],[p.b+p.r,'du-lon-hon-chia'],[p.r+1,'nham-thuong-du'],[p.q%10+0 || p.r+2,'nham-thuong-du'],[p.b-p.r>0 ? p.b-p.r : p.r+3,'nham-thuong-du']], p.r), goiY:gy()};
  }, check:function(q){ var p=q._pt; if(!kiemChia4(q)) return false; var c=chia(p.a,p.b); if(c.r===0 || q.ans!==c.r || q.q.indexOf('<b>'+sx(p.a)+' : '+p.b+' = '+sx(c.q)+'</b>')<0) return false; if(q._lv<=1) return p.b<=3; if(q._lv===2) return p.b>=4 && p.b<=6; return p.b>=7; }},

  /* D5 — Bảng số bị chia, số chia, thương, số dư (bài 3) */
  {name:'Bảng số bị chia, số chia, thương, số dư', sec:'Bài 3 — bảng: số bị chia 4 163, số chia 8, thương 520, số dư 3', mt:['MT2'], levels:3,
   muc:['Điền thương vào bảng.', 'Điền số dư vào bảng.', 'Điền số bị chia vào bảng (thương × số chia + số dư).'],
   make:function(lv){
    var p=capChia([2,3,4,5,6,7,8,9],'du'), an = lv<=1 ? 'th' : (lv===2 ? 'du' : 'sbc'), ans = an==='th' ? p.q : (an==='du' ? p.r : p.a);
    var sai = an==='th' ? [[p.r,'nham-thuong-du'],[p.q+1,'quen-ha'],[p.q-1,'quen-ha'],[Math.floor(p.q/10),'quen-ha']] : (an==='du' ? [[p.b,'du-lon-hon-chia'],[p.r+1,'nham-thuong-du'],[p.q%10||p.r+2,'nham-thuong-du'],[p.b-p.r>0 ? p.b-p.r : p.r+3,'nham-thuong-du']] : [[p.q*p.b,'thieu-buoc'],[p.q+p.b+p.r,'nham-thuong-du'],[p.a+10,'thieu-buoc'],[p.a-p.r,'thieu-buoc'],[p.a+p.b,'thieu-buoc']]);
    return {type:'num', _lv:lv, q:khungHinh(bangChia(p.a,p.b,p.q,p.r,an).replace(/<\/svg>$/,''))+'<div>Điền số vào ô <b class="text-amber-700">?</b> của bảng.</div>', ans:ans, sai:nhanSai(sai, ans), goiY:gy()};
  }, check:function(q){ var t=docBang(q.q); if(!t || t.a<1000 || t.b<2 || t.b>9 || t.r<=0 || t.r>=t.b || t.q*t.b+t.r!==t.a) return false; var e = t.an==='th' ? t.q : (t.an==='du' ? t.r : t.a); return q.ans===e && t.an===(q._lv<=1 ? 'th' : (q._lv===2 ? 'du' : 'sbc')); }},

  /* D6 — Chia nhóm (bài 4) */
  {name:'Chia thành các nhóm', sec:'Bài 4 — 6 308 người chia thành các nhóm, mỗi nhóm 7 người: 901 nhóm, còn dư 1 người', mt:['MT2'], levels:3,
   muc:['Có bao nhiêu nhóm (số chia 2 đến 5).', 'Có bao nhiêu nhóm (số chia 6 đến 9).', 'Còn dư bao nhiêu người.'],
   make:function(lv){
    var p = lv<=1 ? capChia([2,3,4,5],'du') : (lv===2 ? capChia([6,7,8,9],'du') : capChia([5,6,7,8,9],'du')), hoi = lv<=2 ? 'Có bao nhiêu nhóm đủ '+p.b+' người?' : 'Sau khi chia, còn dư bao nhiêu người?', ans = lv<=2 ? p.q : p.r;
    return {type:'num', _lv:lv, _a:p.a, _b:p.b, q:'<div>Có <b>'+sx(p.a)+' người</b> được chia thành các nhóm, mỗi nhóm <b>'+p.b+' người</b>. '+hoi+'</div>', ans:ans, sai:nhanSai(lv<=2 ? [[p.q+1,'nham-thuong-du'],[p.r,'nham-thuong-du'],[p.q-1,'quen-ha'],[Math.floor(p.q/10),'quen-ha'],[+String(p.q).replace(/0/g,''),'thieu-so-0']] : [[p.q,'nham-thuong-du'],[p.b,'du-lon-hon-chia'],[p.r+1,'nham-thuong-du'],[p.b-p.r>0 ? p.b-p.r : p.r+2,'nham-thuong-du']], ans), goiY:gy()};
  }, check:function(q){ var a=q._a, b=q._b, c=chia(a,b); if(c.r===0 || a<1000 || q.q.indexOf('<b>'+sx(a)+' người</b>')<0 || q.q.indexOf('<b>'+b+' người</b>')<0) return false; if(q._lv<=2) return q.ans===c.q && (q._lv===1 ? b<=5 : b>=6); return q.ans===c.r && b>=5 && q.q.indexOf('còn dư')>=0; }},

  /* D7 — Nhẩm tròn nghìn (bài 5) */
  {name:'Nhẩm số tròn nghìn, tròn trăm', sec:'Bài 5 — 8 nghìn : 2 = 4 nghìn: 8 000 : 2, 7 000 : 7, 9 000 : 3, 8 000 : 4', mt:['MT3'], levels:3,
   muc:['Tròn nghìn chia cho 2, 3, 4 (8 000 : 2).', 'Tròn nghìn chia cho số đến 9 (7 000 : 7, 9 000 : 3).', 'Tròn trăm chia cho số một chữ số (3 500 : 5, 6 000 : 4).'],
   make:function(lv){
    var a, b, g;
    if(lv<=1){ do { b=rnd(2,4); a=rnd(2,9)*1000; } while((a/1000)%b!==0); }
    else if(lv===2){ do { b=rnd(2,9); a=rnd(2,9)*1000; } while((a/1000)%b!==0 || b<=4 && Math.random()<0.5); }
    else { for(g=0; g<500; g++){ b=rnd(2,9); a=rnd(10,99)*100; if(a%b===0 && (a/b)%100===0 && a/b>=100 && !(a%1000===0 && (a/b)%1000===0)) break; } }
    var ans=a/b;
    return {type:'num', _lv:lv, _a:a, _b:b, q:'<div>Tính nhẩm:</div>'+bieuThucTo(sx(a)+' : '+b+' = ?'), ans:ans, sai:nhanSai([[a/1000/b,'nham-hang'],[ans/10,'nham-hang'],[ans*10,'nham-hang'],[ans+1000,'nham-hang'],[ans-100,'nham-hang']], ans), goiY:gy()};
  }, check:function(q){ var a=q._a, b=q._b; if(a%b!==0 || q.ans!==a/b || q.q.indexOf(sx(a)+' : '+b)<0) return false; if(q._lv<=1) return a%1000===0 && b<=4; if(q._lv===2) return a%1000===0 && (a/1000)%b===0; return a%100===0 && (a/b)%100===0 && !(a%1000===0 && (a/b)%1000===0); }},

  /* D8 — Điền >, <, = (bài 5) */
  {name:'Điền dấu >, <, =', sec:'Bài 5 — 6 000 : 2 ? 2 999; 3 000 : 3 ? 200 × 5; 3 500 : 5 ? 4 000 : 5', mt:['MT3'], levels:3,
   muc:['Một phép chia nhẩm với một số (6 000 : 2 ? 2 999).', 'Phép chia với phép nhân (3 000 : 3 ? 200 × 5).', 'Hai phép chia (3 500 : 5 ? 4 000 : 5).'],
   make:function(lv){
    var l, r, ve, a, b, c, d, g;
    if(lv<=1){ do { b=rnd(2,5); a=rnd(2,9)*1000; } while((a/1000)%b!==0); l=a/b; r = pick([l-1, l+1, l+100, l-100, l]); ve=sx(a)+' : '+b+' ? '+sx(r); }
    else if(lv===2){ do { b=rnd(2,5); a=rnd(2,9)*1000; c=rnd(1,5)*100; d=rnd(2,6); } while((a/1000)%b!==0 || (a/b===c*d && Math.random()<0.5)); l=a/b; r=c*d; ve=sx(a)+' : '+b+' ? '+c+' × '+d; }
    else { for(g=0; g<2000; g++){ b=rnd(2,9); d=rnd(2,9); a=rnd(10,99)*100; c=rnd(10,99)*100; if(a%b===0 && c%d===0 && (a/b!==c/d || Math.random()<0.2)) break; } l=a/b; r=c/d; ve=sx(a)+' : '+b+' ? '+sx(c)+' : '+d; }
    var xa = l>r ? '>' : (l<r ? '<' : '='), ch=['>','<','='], sai={}; ch.forEach(function(x,i){ if(x!==xa) sai[String(i)]='so-sanh-sai'; });
    return {type:'mcq', cot:2, _lv:lv, _ve:ve, _dung:xa, q:'<div>Điền dấu thích hợp vào chỗ <b class="text-amber-700">?</b></div>'+bieuThucTo(ve), choices:ch, correct:ch.indexOf(xa), sai:sai, goiY:gy()};
  }, check:function(q){ if(!kiemMCQ(q) || q.choices.length!==3) return false; var u=function(s){ return +String(s).split(NB).join(''); }, m, l, r;
    if(q._lv<=1){ m=/^([\d ]+) : (\d) \? ([\d ]+)$/.exec(q._ve); if(!m || u(m[1])%+m[2]!==0) return false; l=u(m[1])/+m[2]; r=u(m[3]); }
    else if(q._lv===2){ m=/^([\d ]+) : (\d) \? (\d+) × (\d)$/.exec(q._ve); if(!m || u(m[1])%+m[2]!==0) return false; l=u(m[1])/+m[2]; r=+m[3]*+m[4]; }
    else { m=/^([\d ]+) : (\d) \? ([\d ]+) : (\d)$/.exec(q._ve); if(!m || u(m[1])%+m[2]!==0 || u(m[3])%+m[4]!==0) return false; l=u(m[1])/+m[2]; r=u(m[3])/+m[4]; }
    return q.q.indexOf(q._ve)>=0 && q._dung===(l>r ? '>' : (l<r ? '<' : '=')); }},

  /* D9 — Giảm đi, gấp lên (bài 6, 7) */
  {name:'Giảm đi, gấp lên (vịt, vệ tinh)', sec:'Bài 6, 7 — trang trại vịt giảm đi 3 lần: 4 500 : 3 = 1 500; vệ tinh B 1 527 km gấp 3 lần A: A 509 km; C gấp 4 lần A: 2 036 km', mt:['MT3'], levels:3,
   muc:['Số con giảm đi một số lần: tìm số con.', 'Biết số lớn gấp k lần số bé: tìm số bé.', 'Biết số của B gấp 3 lần A, C gấp 4 lần A: tìm số của C (hai bước).'],
   make:function(lv){
    var k, A, Bv, m, q, ans, hinh;
    if(lv<=1){ k=rnd(2,4); A=rnd(5,24)*100; Bv=A*k; ans=A; hinh=soDoLan(k,Bv,'Trang trại thứ nhất','Trang trại thứ hai','con'); q='Trang trại thứ nhất nuôi <b>'+sx(Bv)+' con</b> vịt. Số vịt của trang trại thứ hai <b>giảm đi '+k+' lần</b> so với trang trại thứ nhất. Trang trại thứ hai nuôi bao nhiêu con vịt?'; }
    else if(lv===2){ k=rnd(3,4); A=rnd(100,2400); Bv=A*k; ans=A; hinh=soDoLan(k,Bv,'Vệ tinh B','Vệ tinh A','km'); q='Vệ tinh B bay một vòng quanh Trái Đất dài <b>'+sx(Bv)+' km</b>, gấp <b>'+k+' lần</b> vệ tinh A. Vệ tinh A bay một vòng dài bao nhiêu ki-lô-mét?'; }
    else { k=3; m=pick([4,5]); do { A=rnd(100,1900); } while(A*m>9999 || A*k>9999); Bv=A*k; ans=A*m; hinh=soDoLan(k,Bv,'Vệ tinh B','Vệ tinh A','km'); q='Vệ tinh B bay một vòng dài <b>'+sx(Bv)+' km</b>, gấp <b>'+k+' lần</b> vệ tinh A. Vệ tinh C bay một vòng dài gấp <b>'+m+' lần</b> vệ tinh A. Vệ tinh C bay một vòng dài bao nhiêu ki-lô-mét?'; }
    return {type:'num', _lv:lv, _k:k, _B:Bv, _m:m||0, q:khungHinh(hinh.replace(/<\/svg>$/,''))+'<div>'+q+'</div>', ans:ans, sai:nhanSai([[Bv*k,'doc-de-sai'],[Bv+k,'doc-de-sai'],[lv>=3 ? Bv*m : A+k,'thieu-buoc'],[lv>=3 ? A : Bv,'thieu-buoc'],[ans+10,'quen-ha']], ans), goiY:gy()};
  }, check:function(q){ var t=docLan(q.q); if(!t || t.B%t.k!==0 || t.k!==q._k || t.B!==q._B) return false; var A=t.B/t.k; if(q.q.indexOf('<b>'+sx(t.B)+' ')<0) return false; if(q._lv<=2) return q.ans===A && (q._lv===1 ? q.q.indexOf('giảm đi')>=0 : q.q.indexOf('gấp')>=0); return q.ans===A*q._m && (q._m===4 || q._m===5) && A*q._m<=9999 && t.k===3; }},

  /* D10 — Bạn An chia (không có trong SGK) */
  {name:'Bạn An chia', sec:'Ôn tập — bạn An tính 6 606 : 6 = 111: em có đồng ý không, An sai ở đâu, kết quả đúng', mt:['MT1'], levels:3,
   muc:['An tính phép chia: em có đồng ý không.', 'An tính sai: An sai ở đâu.', 'An tính sai: kết quả đúng là bao nhiêu.'],
   make:function(lv){
    var p, kind, g, an, t, txt;
    for(g=0; g<600; g++){ kind=pick(['thieu-so-0','du-lon-hon-chia']);
     if(kind==='thieu-so-0'){ p=capChia([2,3,4,5,6,7,8,9],'het',[1,2]); if(+String(p.q).replace(/0/g,'')===p.q) continue; break; }
     p=capChia([3,4,5,6,7,8,9],'du'); break; }
    t=p.q; var dung=Math.random()<0.5;
    if(kind==='thieu-so-0'){ an=+String(p.q).replace(/0/g,''); txt = (lv<=1 && dung) ? sx(p.a)+' : '+p.b+' = '+sx(p.q) : sx(p.a)+' : '+p.b+' = '+sx(an); }
    else { txt = (lv<=1 && dung) ? sx(p.a)+' : '+p.b+' = '+sx(p.q)+' (dư '+p.r+')' : sx(p.a)+' : '+p.b+' = '+sx(p.q-1)+' (dư '+(p.r+p.b)+')'; }
    var dungKq = lv<=1 && dung, mo=nguoi('boy','Bạn An')+'<div>Bạn An tính: «<b>'+txt+'</b>»'+(lv>=2 ? '. An tính sai rồi!' : '.')+'</div>';
    if(lv<=1){ var D=dungKq ? 'Đồng ý' : 'Không đồng ý'; return {type:'mcq', cot:2, _lv:1, _a:p.a, _b:p.b, _kind:kind, _txt:txt, _ok:dungKq?1:0, _dung:D, q:mo+'<div>Em có đồng ý với An không?</div>', choices:['Đồng ý','Không đồng ý'], correct:dungKq?0:1, sai:(dungKq?{'1':'thieu-so-0'}:{'0':'thieu-so-0'}), goiY:gy()}; }
    if(lv===2){ var ks=['thieu-so-0','du-lon-hon-chia','quen-ha'], ch=shuffle(ks.slice()).map(function(k){ return TEN_LOI[k]; }), D2=TEN_LOI[kind], sai={}; ch.forEach(function(c,i){ if(c!==D2) sai[String(i)]=ks.filter(function(k){ return TEN_LOI[k]===c; })[0]; });
      return {type:'mcq', cot:1, _lv:2, _a:p.a, _b:p.b, _kind:kind, _txt:txt, _dung:D2, q:mo+'<div>An sai ở đâu?</div>', choices:ch, correct:ch.indexOf(D2), sai:sai, goiY:gy()}; }
    return {type:'num', _lv:3, _a:p.a, _b:p.b, _kind:kind, _txt:txt, q:mo+'<div>Thương đúng của phép chia là bao nhiêu?</div>', ans:t, sai:nhanSai([[kind==='thieu-so-0' ? an : p.q-1,kind],[p.q+1,'quen-ha'],[p.r,'nham-thuong-du'],[Math.floor(p.q/10),'quen-ha']], t), goiY:gy()};
  }, check:function(q){ var a=q._a, b=q._b, c=chia(a,b), kind=q._kind; if(a<1000 || q.q.indexOf('<b>'+q._txt+'</b>')<0) return false;
    var okTxt, saTxt; if(kind==='thieu-so-0'){ if(c.r!==0 || demKhongA(c.q)<1) return false; var an=+String(c.q).replace(/0/g,''); if(an===c.q) return false; okTxt=sx(a)+' : '+b+' = '+sx(c.q); saTxt=sx(a)+' : '+b+' = '+sx(an); }
    else { if(c.r===0) return false; okTxt=sx(a)+' : '+b+' = '+sx(c.q)+' (dư '+c.r+')'; saTxt=sx(a)+' : '+b+' = '+sx(c.q-1)+' (dư '+(c.r+b)+')'; }
    if(q._lv<=1){ var ok=q._txt===okTxt; if(!ok && q._txt!==saTxt) return false; return kiemMCQ(q) && q.choices.length===2 && (q._dung==='Đồng ý')===ok; }
    if(q._txt!==saTxt) return false; if(q._lv===2) return kiemMCQ(q) && q.choices.length===3 && q._dung===TEN_LOI[kind]; return q.ans===c.q; }}
 ]
};
