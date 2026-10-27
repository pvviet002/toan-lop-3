/* bai-47.js — Bài 47: Làm quen với chữ số La Mã (Tập 2, Chủ đề 8). BÀI MỚI, Engine v2 — LUYỆN THÔNG MINH.
   Theo bảng phân tích sư phạm đã duyệt (phan-tich-su-pham/bai-47.md, PR #39): 3 MỤC TIÊU (muctieu) × 10 DẠNG (topics), mỗi dạng 3 mức (Thông tư 27).
   Chỉ dùng số La Mã từ I đến XX. Hình: dongHoLaMa (đồng hồ mặt số La Mã, mới), queLaMa (số La Mã xếp bằng que tính, mới), luoiLaMa (lưới ô số La Mã, mới).
   check() đọc lại hình từ chuỗi SVG (data-gio, data-phut, data-que, data-g) hoặc từ trường _ của câu, rồi tính lại. QUY TẮC: nối chuỗi, KHÔNG backtick, KHÔNG template literal. */

/* ---- Tiện ích chung ---- */
function nhanSai(ds, dung){ var o={}; ds.forEach(function(p){ var v=p[0]; if(Number.isInteger(v) && v>0 && v!==dung && !(String(v) in o)) o[String(v)]=p[1]; }); return o; }
function kiemMCQ(q){ return q.choices[q.correct]===q._dung && new Set(q.choices).size===q.choices.length; }
function khungHinh(s){ return '<div class="flex justify-center my-2">'+s+'</svg></div>'; }
function bieuThucTo(t){ return '<div class="text-3xl font-extrabold text-orange-600 my-2">'+t+'</div>'; }
function nguoi(ten, alt){ return '<div class="flex justify-center mb-1">'+anh(ten, 72, alt)+'</div>'; }
function lapMCQ(dungStr, cacSai){
 var seen={}, ds=[]; seen[dungStr]=1; cacSai.forEach(function(p){ if(p[0] && !seen[p[0]]){ seen[p[0]]=1; ds.push(p); } });
 var opts=[[dungStr,'']].concat(ds.slice(0,3)); opts=shuffle(opts); var sai={};
 opts.forEach(function(o,i){ if(o[0]!==dungStr) sai[String(i)]=o[1]; });
 var cs=opts.map(function(o){ return o[0]; });
 return {choices:cs, correct:cs.indexOf(dungStr), sai:sai, _dung:dungStr};
}
var LM1=['','I','II','III','IV','V','VI','VII','VIII','IX'];
function laMa(n){ return n>=10 ? 'X'+laMa(n-10) : LM1[n]; }
var GT={I:1, V:5, X:10};
function giaTriLaMa(s){ var t=0, i; for(i=0;i<s.length;i++){ var a=GT[s.charAt(i)], b=i+1<s.length ? GT[s.charAt(i+1)] : 0; t += a<b ? -a : a; } return t; }
function laMaDung(s){ var i; for(i=1;i<=20;i++) if(laMa(i)===s) return true; return false; }
function soQue(s){ var t=0, i; for(i=0;i<s.length;i++) t += s.charAt(i)==='I' ? 1 : 2; return t; }
function dao(s){ return s.split('').reverse().join(''); }
function vietCong(n){ var u=n%10, o=''; var i; for(i=0;i<Math.floor(n/10);i++) o+='X'; if(u>=5) o+='V'; for(i=0;i<u%5;i++) o+='I'; return o; }   /* cách viết "cộng thêm que" sai: IIII, VIIII */
var NHAM=[4,6,9,11,14,16];
function gio2(n){ return (n<10 ? '0' : '')+n; }
var GOI={'nham-IV-VI':'Chữ số bé đứng TRƯỚC chữ số lớn thì trừ (IV = 5 − 1 = 4); đứng SAU thì cộng (VI = 5 + 1 = 6).',
  'viet-VIIII':'Số La Mã không viết bốn chữ I liền nhau: 4 là IV, 9 là IX.',
  'nham-kim':'Kim ngắn chỉ giờ, kim dài chỉ phút. Bé xem kim ngắn đang chỉ vào số La Mã nào.',
  'dem-sai-que':'Bé đếm từng que: chữ I một que, chữ V hai que, chữ X hai que.',
  'dem-sai-buoc':'Bé đếm tiếp từng số La Mã theo thứ tự: I, II, III, IV, V, VI, VII, VIII, IX, X, XI, XII ...',
  'sai-thu-tu':'Bé đổi từng số La Mã ra số thường rồi so sánh.'};
function gy(extra){ var o={}, k; for(k in GOI) o[k]=GOI[k]; for(k in (extra||{})) o[k]=extra[k]; return o; }

/* ---- Hình ---- */
/* đồng hồ mặt số La Mã: giờ h (1..12), phút m */
function dongHoLaMa(h, m){
 var s=svgHinh(150,150,200).replace('<svg ','<svg data-gio="'+h+'" data-phut="'+m+'" '), n, a;
 s+='<circle cx="75" cy="75" r="71" fill="#fff" stroke="'+HM.vangDam+'" stroke-width="5"/>';
 for(n=1;n<=12;n++){ a=(n/12)*2*Math.PI-Math.PI/2; s+='<text x="'+(75+55*Math.cos(a)).toFixed(1)+'" y="'+(75+55*Math.sin(a)+5).toFixed(1)+'" text-anchor="middle" font-size="13" '+HFONT+' fill="'+HM.chu+'">'+laMa(n)+'</text>'; }
 var ha=(((h%12)+m/60)/12)*2*Math.PI-Math.PI/2, ma=(m/60)*2*Math.PI-Math.PI/2;
 s+='<line x1="75" y1="75" x2="'+(75+28*Math.cos(ha)).toFixed(1)+'" y2="'+(75+28*Math.sin(ha)).toFixed(1)+'" stroke="'+HM.den+'" stroke-width="5" stroke-linecap="round"/>';
 s+='<line x1="75" y1="75" x2="'+(75+40*Math.cos(ma)).toFixed(1)+'" y2="'+(75+40*Math.sin(ma)).toFixed(1)+'" stroke="'+HM.troiDam+'" stroke-width="3" stroke-linecap="round"/>';
 return s+'<circle cx="75" cy="75" r="4" fill="'+HM.do+'"/></svg>';
}
function docDongHo(html){ var m=/data-gio="(\d+)" data-phut="(\d+)"/.exec(html); return m ? {h:+m[1], m:+m[2]} : null; }
/* số La Mã xếp bằng que tính: mỗi chữ I một que, V hai que, X hai que; mỗi que là một <line data-dem="que"> */
function queLaMa(ds){
 var tong=ds.join(' '), n=0, i, j, x=8, y=10, c, o='', W=0;
 ds.forEach(function(sv){ W += sv.length*38+22; });
 var s=svgHinh(Math.max(W,120),70,Math.max(W,120));
 for(i=0;i<ds.length;i++){
  o+='<g data-que="'+ds[i]+'">';
  for(j=0;j<ds[i].length;j++){
   c=ds[i].charAt(j);
   if(c==='I'){ o+='<line data-dem="que" x1="'+(x+14)+'" y1="'+y+'" x2="'+(x+14)+'" y2="'+(y+50)+'" stroke="'+HM.go+'" stroke-width="7" stroke-linecap="round"/>'; }
   else if(c==='V'){ o+='<line data-dem="que" x1="'+(x+2)+'" y1="'+y+'" x2="'+(x+14)+'" y2="'+(y+50)+'" stroke="'+HM.go+'" stroke-width="7" stroke-linecap="round"/><line data-dem="que" x1="'+(x+26)+'" y1="'+y+'" x2="'+(x+14)+'" y2="'+(y+50)+'" stroke="'+HM.go+'" stroke-width="7" stroke-linecap="round"/>'; }
   else { o+='<line data-dem="que" x1="'+(x+2)+'" y1="'+y+'" x2="'+(x+26)+'" y2="'+(y+50)+'" stroke="'+HM.go+'" stroke-width="7" stroke-linecap="round"/><line data-dem="que" x1="'+(x+26)+'" y1="'+y+'" x2="'+(x+2)+'" y2="'+(y+50)+'" stroke="'+HM.goNhat+'" stroke-width="7" stroke-linecap="round"/>'; }
   x+=38;
  }
  o+='</g>'; x+=22;
 }
 return s+o+'</svg>';
}
function docQue(html){ var re=/<g data-que="(\w+)">/g, m, v=[]; while((m=re.exec(html))) v.push(m[1]); return {ds:v, que:(html.match(/data-dem="que"/g)||[]).length}; }
/* lưới ô số La Mã (các ô xáo trộn); mỗi ô data-g */
function luoiLaMa(cs){
 var o=svgHinh(300,Math.ceil(cs.length/4)*52+4,300), i, x, y;
 for(i=0;i<cs.length;i++){ x=4+(i%4)*74; y=4+Math.floor(i/4)*52;
  o+='<rect data-g="'+cs[i]+'" x="'+x+'" y="'+y+'" width="68" height="46" rx="10" fill="'+HM.vang+'" stroke="'+HM.vangDam+'" stroke-width="3"/>'+'<text x="'+(x+34)+'" y="'+(y+31)+'" text-anchor="middle" font-size="20" '+HFONT+' fill="'+HM.chu+'">'+laMa(cs[i])+'</text>'; }
 return khungHinh(o);
}
function docLuoi(html){ var re=/data-g="(\d+)"/g, m, v=[]; while((m=re.exec(html))) v.push(+m[1]); return v; }
function hoanvi(a){ if(a.length<=1) return [a]; var r=[]; a.forEach(function(x,i){ hoanvi(a.slice(0,i).concat(a.slice(i+1))).forEach(function(t){ r.push([x].concat(t)); }); }); return r; }

var BAI = {
 n: 47,
 title: 'Làm Quen Với Chữ Số La Mã',
 sub: 'Luyện thông minh: câu hỏi tự đổi theo bé — làm hết lượt để xem ngọn lửa!',
 goal: 10, soCau: 18, soCauToiDa: 24,
 loi: {'nham-IV-VI':'Nhầm IV với VI, IX với XI', 'viet-VIIII':'Viết thêm chữ số thay vì ghép bớt (IIII, VIIII)', 'nham-kim':'Nhầm kim giờ, kim phút', 'dem-sai-que':'Đếm sai số que tính', 'dem-sai-buoc':'Đếm sai bước khi điền dãy số La Mã', 'sai-thu-tu':'Xếp sai thứ tự'},
 muctieu: [
  {id:'MT1', ten:'Đọc và viết số La Mã đến XX', muc:['Đọc, viết số La Mã đến XII; nối số thường với số La Mã (1 đến 12); điền số La Mã còn thiếu.', 'Đọc, viết số La Mã XIII đến XX; điền dãy cách 2; bạn An sai ở đâu.', 'Phân biệt IV với VI, IX với XI; điền số khi qua IX, X, XI.']},
  {id:'MT2', ten:'Đồng hồ số La Mã', muc:['Đọc giờ đúng trên đồng hồ số La Mã.', 'Đọc giờ đúng và giờ rưỡi; nối với đồng hồ điện tử.', 'Giờ buổi chiều (14 giờ chỉ vào II).']},
  {id:'MT3', ten:'Sắp xếp, que tính và trò chơi', muc:['Xếp 3 số La Mã nhỏ; đếm que của một số; tìm ô còn thiếu trong lưới I đến V.', 'Xếp XIII, XVII, XII, XVIII từ bé đến lớn; đếm que số XIII đến XX; lưới VI đến XIII.', 'Xếp từ lớn đến bé với số dễ nhầm; tổng số que của hai số; lưới XI đến XX.']}
 ],
 topics: [
  /* D1 — Đọc số La Mã (khám phá) */
  {name:'Đọc số La Mã', sec:'Khám phá — I = 1, V = 5, X = 10; bảng I đến XX; đọc VI, V, VIII, II, XI, IX', mt:['MT1'], levels:3,
   muc:['Số La Mã đến XII.', 'Số La Mã XIII đến XX.', 'Các số dễ nhầm: IV và VI, IX và XI, XIV và XVI.'],
   make:function(lv){
    var n = lv<=1 ? pick([1,2,3,5,7,8,10,12]) : (lv===2 ? pick([13,15,17,18,20]) : pick(NHAM)), r=laMa(n), sai=[];
    if(lv>=3){ var sw=giaTriLaMa(dao(r)); if(sw!==n && laMaDung(dao(r))) sai.push([String(sw),'nham-IV-VI']); else sai.push([String(n===14?16:(n===16?14:n+2)),'nham-IV-VI']); }
    [n+1,n-1,n+2,n-2,n+5,n-5].forEach(function(v){ if(v>=1 && v!==n) sai.push([String(v),'dem-sai-buoc']); });
    var seen={}; seen[String(n)]=1; sai=sai.filter(function(p){ if(seen[p[0]]) return false; seen[p[0]]=1; return true; });
    var m=lapMCQ(String(n), sai);
    return {type:'mcq', cot:2, _lv:lv, _n:n, _dung:m._dung, q:'<div>Số La Mã dưới đây là số nào?</div>'+bieuThucTo(r), choices:m.choices, correct:m.correct, sai:m.sai, goiY:gy()};
  }, check:function(q){ var n=q._n; if(n<1 || n>20 || q.q.indexOf('>'+laMa(n)+'<')<0 || !kiemMCQ(q) || q.choices.length!==4 || q._dung!==String(n)) return false;
    if(q._lv<=1) return n<=12 && NHAM.indexOf(n)<0; if(q._lv===2) return n>=13 && NHAM.indexOf(n)<0; return NHAM.indexOf(n)>=0; }},

  /* D2 — Viết số La Mã (bài 2) */
  {name:'Viết số La Mã', sec:'Bài 2 — viết các số từ 1 đến 20 bằng số La Mã', mt:['MT1'], levels:3,
   muc:['Viết số từ 1 đến 10 bằng số La Mã.', 'Viết số từ 11 đến 15.', 'Viết số từ 16 đến 20.'],
   make:function(lv){
    var n = lv<=1 ? pick([1,2,3,4,5,6,7,8,9,10]) : (lv===2 ? rnd(11,15) : rnd(16,20)), r=laMa(n), sai=[], c=vietCong(n);
    if(c!==r) sai.push([c,'viet-VIIII']);
    if(dao(r)!==r && laMaDung(dao(r))) sai.push([dao(r),'nham-IV-VI']);
    [n+1,n-1,n+2,n-2,n+5,n-5].forEach(function(v){ if(v>=1){ sai.push([laMa(v),'dem-sai-buoc']); } });
    var seen={}; seen[r]=1; sai=sai.filter(function(p){ if(seen[p[0]] || !p[0]) return false; seen[p[0]]=1; return true; });
    var m=lapMCQ(r, sai);
    return {type:'mcq', cot:2, _lv:lv, _n:n, _dung:m._dung, q:'<div>Số <b>'+n+'</b> viết bằng số La Mã là:</div>', choices:m.choices, correct:m.correct, sai:m.sai, goiY:gy()};
  }, check:function(q){ var n=q._n; if(n<1 || n>20 || !kiemMCQ(q) || q.choices.length!==4 || q._dung!==laMa(n) || q.q.indexOf('<b>'+n+'</b>')<0) return false; return q._lv<=1 ? n<=10 : (q._lv===2 ? (n>=11 && n<=15) : n>=16); }},

  /* D3 — Nối số thường với số La Mã (bài 1) */
  {name:'Nối số thường với số La Mã', sec:'Bài 1 — nối 13 với XIII, 15 với XV, 11 với XI, 17 với XVII', mt:['MT1'], levels:3,
   muc:['Chọn cặp ghép đúng (số từ 1 đến 12).', 'Chọn cặp ghép đúng (13, 15, 11, 17).', 'Chọn cặp ghép SAI trong bốn cặp.'],
   make:function(lv){
    var base = lv<=1 ? [1,2,3,5,7,8,10,12] : [11,12,13,15,17,18,20], ns=shuffle(base.slice()).slice(0,4);
    function cap(n,r){ return n+' = '+r; }
    var dungC, ch, sai={}, i;
    if(lv<=2){ var n0=ns[0]; dungC=cap(n0, laMa(n0)); ch=[dungC, cap(ns[1], laMa(ns[1]+1)), cap(ns[2], dao(laMa(ns[2]))===laMa(ns[2]) ? laMa(ns[2]+2) : dao(laMa(ns[2]))), cap(ns[3], laMa(ns[3]===1 ? 3 : ns[3]-1))];
      ch=shuffle(ch); ch.forEach(function(c,k){ if(c!==dungC) sai[String(k)]='dem-sai-buoc'; }); }
    else { var nm=shuffle(NHAM.slice()).slice(0,1)[0], bad=laMaDung(dao(laMa(nm))) ? dao(laMa(nm)) : laMa(nm+2); dungC=cap(nm, bad); ch=shuffle([dungC, cap(ns[0], laMa(ns[0])), cap(ns[1], laMa(ns[1])), cap(ns[2], laMa(ns[2]))]); ch.forEach(function(c,k){ if(c!==dungC) sai[String(k)]='nham-IV-VI'; }); }
    return {type:'mcq', cot:2, _lv:lv, _dung:dungC, q:'<div>'+(lv<=2 ? 'Cặp nào <b>đúng</b>?' : 'Ba cặp đúng và một cặp <b>sai</b>. Cặp nào <b>sai</b>?')+'</div>', choices:ch, correct:ch.indexOf(dungC), sai:sai, goiY:gy()};
  }, check:function(q){ if(!kiemMCQ(q) || q.choices.length!==4) return false; var ok=q.choices.map(function(c){ var p=c.split(' = '); return laMa(+p[0])===p[1]; }); var cnt=ok.filter(Boolean).length;
    if(q._lv<=2) return cnt===1 && ok[q.correct]===true && q.choices.every(function(c){ return +c.split(' = ')[0]<=(q._lv<=1 ? 12 : 20); }) ; return cnt===3 && ok[q.correct]===false; }},

  /* D4 — Đọc giờ đồng hồ La Mã (khám phá) */
  {name:'Đọc giờ đồng hồ La Mã', sec:'Khám phá — đồng hồ mặt số La Mã: kim ngắn chỉ giờ, kim dài chỉ phút', mt:['MT2'], levels:3,
   muc:['Đồng hồ chỉ mấy giờ đúng (điền số).', 'Giờ đúng hoặc giờ rưỡi (chọn đáp án).', 'Giờ buổi chiều: chọn giờ theo cách đọc 24 giờ.'],
   make:function(lv){
    var h=rnd(1,12), m=0, hinh;
    if(lv<=1){ return {type:'num', _lv:1, q:khungHinh(dongHoLaMa(h,0).replace(/<\/svg>$/,''))+'<div>Đồng hồ chỉ mấy giờ?</div>', ans:h, sai:nhanSai([[h+1,'nham-kim'],[h-1,'nham-kim'],[(h%12)+1===h ? 1 : 12-h,'nham-kim'],[h+2,'nham-kim']], h), goiY:gy()}; }
    if(lv===2){ m=pick([0,30]); h=rnd(1,11); var d=h+' giờ'+(m?' 30 phút':''), ch=[d, (m?h+' giờ':h+' giờ 30 phút'), (h+1)+' giờ'+(m?' 30 phút':''), (m?(h+1)+' giờ':(h+1)+' giờ 30 phút')], mm=lapMCQ(d, ch.slice(1).map(function(c){ return [c,'nham-kim']; }));
      return {type:'mcq', cot:2, _lv:2, _dung:mm._dung, q:khungHinh(dongHoLaMa(h,m).replace(/<\/svg>$/,''))+'<div>Đồng hồ chỉ mấy giờ?</div>', choices:mm.choices, correct:mm.correct, sai:mm.sai, goiY:gy()}; }
    h=rnd(1,10); var dd=(h+12)+' giờ', m3=lapMCQ(dd, [[h+' giờ','nham-kim'],[(h+11)+' giờ','nham-kim'],[(h+13)+' giờ','nham-kim']]);
    return {type:'mcq', cot:2, _lv:3, _dung:m3._dung, q:khungHinh(dongHoLaMa(h,0).replace(/<\/svg>$/,''))+'<div>Lúc <b>chiều</b>, đồng hồ chỉ như hình. Bây giờ là mấy giờ (đọc theo 24 giờ)?</div>', choices:m3.choices, correct:m3.correct, sai:m3.sai, goiY:gy()};
  }, check:function(q){ var t=docDongHo(q.q); if(!t || t.h<1 || t.h>12) return false;
    if(q._lv<=1) return t.m===0 && q.ans===t.h; if(!kiemMCQ(q) || q.choices.length!==4) return false;
    if(q._lv===2) return (t.m===0 || t.m===30) && t.h<=11 && q._dung===t.h+' giờ'+(t.m?' 30 phút':''); return t.m===0 && t.h<=10 && q._dung===(t.h+12)+' giờ' && q.q.indexOf('chiều')>=0; }},

  /* D5 — Nối đồng hồ La Mã với giờ điện tử (luyện tập) */
  {name:'Đồng hồ La Mã và đồng hồ điện tử', sec:'Luyện tập — nối đồng hồ số La Mã với đồng hồ điện tử (bóng chỉ vào II lúc 14 giờ)', mt:['MT2'], levels:3,
   muc:['Giờ đúng buổi sáng: chọn đồng hồ điện tử.', 'Giờ đúng và giờ rưỡi.', 'Giờ buổi chiều: 14:00 hay 02:00.']
   ,make:function(lv){
    var h, m=0, dung, ch, chieu=false;
    if(lv<=1){ h=rnd(1,11); dung=gio2(h)+':00'; ch=[[gio2(h+1)+':00','nham-kim'],[gio2(h-1<1?12:h-1)+':00','nham-kim'],[gio2(12-h<1?11:12-h)+':00','nham-kim'],[gio2(h+2>12?1:h+2)+':00','nham-kim']]; }
    else if(lv===2){ h=rnd(1,11); m=pick([0,30]); dung=gio2(h)+':'+(m?'30':'00'); ch=[[gio2(h)+':'+(m?'00':'30'),'nham-kim'],[gio2(h+1)+':'+(m?'30':'00'),'nham-kim'],[gio2(h+1)+':'+(m?'00':'30'),'nham-kim']]; }
    else { h=rnd(1,10); chieu=true; dung=(h+12)+':00'; ch=[[gio2(h)+':00','nham-kim'],[(h+13)+':00','nham-kim'],[(h+11)+':00','nham-kim']]; }
    var mm=lapMCQ(dung, ch);
    return {type:'mcq', cot:2, _lv:lv, _dung:mm._dung, q:khungHinh(dongHoLaMa(h,m).replace(/<\/svg>$/,''))+'<div>'+(chieu ? 'Lúc <b>chiều</b>, đồng' : 'Đồng')+' hồ số La Mã chỉ như hình. Đồng hồ điện tử nào chỉ cùng giờ?</div>', choices:mm.choices, correct:mm.correct, sai:mm.sai, goiY:gy()};
  }, check:function(q){ var t=docDongHo(q.q); if(!t || !kiemMCQ(q) || q.choices.length!==4) return false;
    if(q._lv<=1) return t.m===0 && t.h<=11 && q._dung===gio2(t.h)+':00' && q.q.indexOf('chiều')<0; if(q._lv===2) return (t.m===0 || t.m===30) && t.h<=11 && q._dung===gio2(t.h)+':'+(t.m?'30':'00');
    return t.m===0 && t.h<=10 && q.q.indexOf('chiều')>=0 && q._dung===(t.h+12)+':00'; }},

  /* D6 — Điền số La Mã còn thiếu (bài 3) */
  {name:'Điền số La Mã còn thiếu', sec:'Bài 3 — XII, XIII, ?, XV, ?, ?, XVIII', mt:['MT1'], levels:3,
   muc:['Dãy tăng 1 trong I đến IX: tìm số còn thiếu.', 'Dãy tăng 2: tìm số còn thiếu.', 'Dãy tăng 1 đi qua IX, X, XI hoặc XIX, XX: tìm số còn thiếu.'],
   make:function(lv){
    var st, a, seq=[], i, hi=rnd(1,4);
    if(lv<=1){ st=1; a=rnd(1,3); }
    else if(lv===2){ st=2; a=rnd(1,6)*1+ (rnd(0,1)); a = a<=1 ? 2 : a; }
    else { st=1; a=pick([5,6,7,8,14,15]); }
    for(i=0;i<6;i++) seq.push(a+i*st);
    var ans=seq[hi], sai=[], v;
    var cand=[ans+st,ans-st,ans+1,ans-1,ans+2,ans-2,seq[5]+1,seq[5]+2,seq[0]-1,seq[0]-2].filter(function(x){ return x>=1 && x<=20 && x!==ans; }); cand=cand.filter(function(x){ return seq.indexOf(x)<0; }).concat(cand.filter(function(x){ return seq.indexOf(x)>=0; })); cand.forEach(function(x){ sai.push([laMa(x),'dem-sai-buoc']); });
    if(lv>=3){ var sw=dao(laMa(ans)); if(laMaDung(sw) && sw!==laMa(ans)) sai.unshift([sw,'nham-IV-VI']); }
    var seen={}; seen[laMa(ans)]=1; sai=sai.filter(function(p){ if(seen[p[0]]) return false; seen[p[0]]=1; return true; });
    var m=lapMCQ(laMa(ans), sai), tx=seq.map(function(x,k){ return k===hi ? '?' : laMa(x); }).join(', ');
    return {type:'mcq', cot:2, _lv:lv, _dung:m._dung, q:'<div data-seq="'+seq.join(',')+'" data-hi="'+hi+'"><div>Điền số La Mã vào chỗ <b class="text-amber-700">?</b></div>'+bieuThucTo(tx)+'</div>', choices:m.choices, correct:m.correct, sai:m.sai, goiY:gy()};
  }, check:function(q){ var m=/data-seq="([\d,]+)" data-hi="(\d+)"/.exec(q.q); if(!m || !kiemMCQ(q) || q.choices.length<3) return false; var seq=m[1].split(',').map(Number), hi=+m[2], st=seq[1]-seq[0], i;
    for(i=1;i<seq.length;i++) if(seq[i]-seq[i-1]!==st) return false; if(seq[0]<1 || seq[seq.length-1]>20 || hi<1 || hi>4) return false;
    if(q._dung!==laMa(seq[hi])) return false; if(q._lv<=1) return st===1 && seq[seq.length-1]<=9; if(q._lv===2) return st===2; return st===1 && seq[0]<=9 && seq[seq.length-1]>=10 || (st===1 && seq[0]>=14 && seq[seq.length-1]>=19); }},

  /* D7 — Sắp xếp số La Mã (bài 4) */
  {name:'Sắp xếp số La Mã', sec:'Bài 4 — sắp xếp XIII, XVII, XII, XVIII từ bé đến lớn', mt:['MT3'], levels:3,
   muc:['Xếp ba số La Mã nhỏ từ bé đến lớn.', 'Xếp bốn số La Mã (XII đến XX) từ bé đến lớn.', 'Xếp bốn số dễ nhầm từ lớn đến bé.'],
   make:function(lv){
    var ns = lv<=1 ? shuffle([1,2,3,4,5,6,7,8,9,10]).slice(0,3) : (lv===2 ? shuffle([11,12,13,14,15,16,17,18,19,20]).slice(0,4) : shuffle(NHAM.concat([5,10,15])).slice(0,4)), tang=lv<3;
    var srt=ns.slice().sort(function(a,b){ return tang ? a-b : b-a; }), sep=tang ? ' < ' : ' > ', dung=srt.map(laMa).join(sep);
    var sai=shuffle(hoanvi(ns.slice()).map(function(a){ return a.map(laMa).join(sep); }).filter(function(c){ return c!==dung; })).map(function(c){ return [c,'sai-thu-tu']; });
    var m=lapMCQ(dung, sai);
    return {type:'mcq', cot:1, _lv:lv, _ns:ns.join(','), _tang:tang, _dung:dung, q:'<div>Các số: <b>'+shuffle(ns.slice()).map(laMa).join(', ')+'</b>. Cách xếp nào đúng '+(tang ? 'từ bé đến lớn' : 'từ lớn đến bé')+'?</div>', choices:m.choices, correct:m.correct, sai:m.sai, goiY:gy()};
  }, check:function(q){ var ns=q._ns.split(',').map(Number); if(new Set(ns).size!==ns.length || ns.some(function(v){ return v<1 || v>20; }) || !kiemMCQ(q) || q.choices.length<3) return false;
    var srt=ns.slice().sort(function(a,b){ return q._tang ? a-b : b-a; }); if(q._dung!==srt.map(laMa).join(q._tang ? ' < ' : ' > ')) return false;
    if(q._lv<=1) return ns.length===3 && q._tang && Math.max.apply(null,ns)<=10; if(q._lv===2) return ns.length===4 && q._tang && Math.min.apply(null,ns)>=11; return ns.length===4 && !q._tang && ns.some(function(v){ return NHAM.indexOf(v)>=0; }); }},

  /* D8 — Xếp que tính (bài 5) */
  {name:'Xếp que tính', sec:'Bài 5 — xếp VIII, XIII bằng que tính (IX cần 3 que)', mt:['MT3'], levels:3,
   muc:['Đếm số que xếp một số La Mã nhỏ.', 'Đếm số que xếp số XIII đến XX.', 'Tổng số que xếp hai số La Mã.'],
   make:function(lv){
    var ds, ans, hoi;
    if(lv<=1){ var a=pick([2,3,5,6,7,8,9]); ds=[laMa(a)]; hoi='Cần mấy que tính để xếp số La Mã trong hình?'; }
    else if(lv===2){ var b=rnd(13,20); ds=[laMa(b)]; hoi='Cần mấy que tính để xếp số La Mã trong hình?'; }
    else { var c=rnd(4,9), d=rnd(11,18); ds=[laMa(c), laMa(d)]; hoi='Cần tất cả mấy que tính để xếp hai số La Mã trong hình?'; }
    ans=ds.reduce(function(s,x){ return s+soQue(x); }, 0);
    var sai=[[ans+1,'dem-sai-que'],[ans-1,'dem-sai-que'],[ds.reduce(function(s,x){ return s+x.length; }, 0),'dem-sai-que'],[ans+2,'dem-sai-que'],[ans-2,'dem-sai-que']];
    return {type:'num', _lv:lv, q:khungHinh(queLaMa(ds).replace(/<\/svg>$/,''))+'<div>Chữ I một que, chữ V hai que, chữ X hai que. '+hoi+'</div>', ans:ans, sai:nhanSai(sai, ans), goiY:gy()};
  }, check:function(q){ var t=docQue(q.q); if(!t.ds.length || t.ds.some(function(x){ return !laMaDung(x); })) return false; var e=t.ds.reduce(function(s,x){ return s+soQue(x); }, 0); if(t.que!==e || q.ans!==e) return false;
    if(q._lv<=1) return t.ds.length===1 && giaTriLaMa(t.ds[0])<=9; if(q._lv===2) return t.ds.length===1 && giaTriLaMa(t.ds[0])>=13; return t.ds.length===2; }},

  /* D9 — Đi theo thứ tự La Mã (trò chơi) */
  {name:'Lưới số La Mã', sec:'Trò chơi — đi theo thứ tự La Mã từ I đến XX trong lưới', mt:['MT3'], levels:3,
   muc:['Lưới các số I đến V: tìm số còn thiếu.', 'Lưới tám số từ VI đến XIII: tìm số còn thiếu.', 'Lưới tám số từ XI đến XX: tìm số còn thiếu.'],
   make:function(lv){
    var a, len, g, miss;
    if(lv<=1){ a=1; len=6; } else if(lv===2){ a=rnd(5,6); len=9; } else { a=rnd(10,11); len=9; }
    var seq=[], i; for(i=0;i<len;i++) seq.push(a+i); miss=seq[rnd(1,len-2)]; g=shuffle(seq.filter(function(x){ return x!==miss; }));
    var sai=[[laMa(miss+1)===undefined?'':laMa(miss-1),'dem-sai-buoc'],[laMa(a-1),'dem-sai-buoc'],[laMa(a+len),'dem-sai-buoc'],[laMa(miss+len),'dem-sai-buoc'],[dao(laMa(miss)),'nham-IV-VI']];
    var seen={}; seen[laMa(miss)]=1; sai=sai.filter(function(p){ if(!p[0] || seen[p[0]] || !laMaDung(p[0])) return false; seen[p[0]]=1; return true; });
    if(sai.length<3){ [miss+2, miss-2, miss+3].forEach(function(v){ if(v>=1 && v<=20 && !seen[laMa(v)] && seq.indexOf(v)<0){ seen[laMa(v)]=1; sai.push([laMa(v),'dem-sai-buoc']); } }); }
    var m=lapMCQ(laMa(miss), sai);
    return {type:'mcq', cot:2, _lv:lv, _dung:m._dung, q:luoiLaMa(g)+'<div>Trong lưới có các số La Mã liên tiếp, nhưng <b>thiếu một số</b>. Số còn thiếu là số nào?</div>', choices:m.choices, correct:m.correct, sai:m.sai, goiY:gy()};
  }, check:function(q){ var g=docLuoi(q.q); if(g.length<5 || !kiemMCQ(q) || q.choices.length<3) return false; var s=g.slice().sort(function(x,y){ return x-y; }), miss=[], i; for(i=s[0]; i<s[s.length-1]; i++) if(s.indexOf(i)<0) miss.push(i);
    if(miss.length!==1 || q._dung!==laMa(miss[0]) || new Set(g).size!==g.length) return false; if(q._lv<=1) return s[0]===1 && s[s.length-1]<=7; if(q._lv===2) return s[0]>=5 && s[s.length-1]<=15; return s[0]>=10 && s[s.length-1]<=20; }},

  /* D10 — Bạn An làm (không có trong SGK) */
  {name:'Bạn An làm', sec:'Ôn tập — bạn An viết số La Mã: em có đồng ý không, An sai ở đâu, viết đúng', mt:['MT1'], levels:3,
   muc:['An nói «IX là số 9»: em có đồng ý không.', 'An viết sai (4 là VI): An sai ở đâu.', 'An viết 9 là VIIII: số 9 viết đúng là gì.'],
   make:function(lv){
    var n, r;
    if(lv<=1){ var dung=Math.random()<0.5; n=pick([4,6,9,11,14,16]); r=laMa(n); var gt = dung ? n : giaTriLaMa(dao(r))===n ? n+1 : giaTriLaMa(dao(r)); if(!dung && !laMaDung(dao(r))) gt=n+1;
      return {type:'mcq', cot:2, _lv:1, _n:n, _gt:gt, _dung:(gt===n?'Đồng ý':'Không đồng ý'), q:nguoi('boy','Bạn An')+'<div>Bạn An nói: «Số La Mã <b>'+r+'</b> là số <b>'+gt+'</b>». Em có đồng ý với An không?</div>', choices:['Đồng ý','Không đồng ý'], correct:(gt===n?0:1), sai:(gt===n?{'1':'nham-IV-VI'}:{'0':'nham-IV-VI'}), goiY:gy()}; }
    if(lv===2){ n=pick([4,9]); var ar=dao(laMa(n)), v2=giaTriLaMa(ar), D='«'+ar+'» là số '+v2+', còn số '+n+' viết là '+laMa(n);
      var ch=[[ '«'+ar+'» là số '+(v2+1)+', còn số '+n+' viết là '+laMa(n),'dem-sai-buoc'],['«'+ar+'» là số '+v2+', còn số '+n+' viết là '+vietCong(n),'viet-VIIII'],['«'+ar+'» là số '+v2+', còn số '+n+' viết là '+laMa(n+1),'dem-sai-buoc']], m=lapMCQ(D, ch);
      return {type:'mcq', cot:1, _lv:2, _n:n, _dung:D, q:nguoi('boy','Bạn An')+'<div>Bạn An viết số <b>'+n+'</b> là <b>'+ar+'</b>. An viết sai rồi! Chọn câu nói đúng:</div>', choices:m.choices, correct:m.correct, sai:m.sai, goiY:gy()}; }
    n=pick([4,9,14,19]); var rc=vietCong(n), sai3=[[laMa(n+2),'dem-sai-buoc'],[dao(laMa(n)),'nham-IV-VI'],[laMa(n-1),'dem-sai-buoc'],[laMa(n+1),'dem-sai-buoc']].filter(function(p){ return p[0]!==laMa(n) && p[0]; }), m3=lapMCQ(laMa(n), sai3);
    return {type:'mcq', cot:2, _lv:3, _n:n, _dung:m3._dung, q:nguoi('boy','Bạn An')+'<div>Bạn An viết số <b>'+n+'</b> là <b>'+rc+'</b>. An viết sai rồi! Số '+n+' viết đúng là:</div>', choices:m3.choices, correct:m3.correct, sai:m3.sai, goiY:gy()};
  }, check:function(q){ var n=q._n; if(!kiemMCQ(q) || NHAM.concat([19]).indexOf(n)<0) return false;
    if(q._lv<=1){ var r=laMa(n); return q.q.indexOf('<b>'+r+'</b> là số <b>'+q._gt+'</b>')>=0 && q.choices.length===2 && (q._dung==='Đồng ý')===(q._gt===n); }
    if(q._lv===2){ var ar=dao(laMa(n)); return laMaDung(ar) && ar!==laMa(n) && q._dung==='«'+ar+'» là số '+giaTriLaMa(ar)+', còn số '+n+' viết là '+laMa(n) && q.choices.length===4; }
    return [4,9,14,19].indexOf(n)>=0 && vietCong(n)!==laMa(n) && q._dung===laMa(n) && q.q.indexOf('<b>'+vietCong(n)+'</b>')>=0 && q.choices.length>=3; }}
 ]
};
