/* bai-51.js — Bài 51: Diện tích của một hình. Xăng-ti-mét vuông (Tập 2, Chủ đề 9). BÀI MỚI, Engine v2 — LUYỆN THÔNG MINH.
   Theo bảng phân tích sư phạm đã duyệt (phan-tich-su-pham/bai-51.md): 3 MỤC TIÊU (muctieu) × 10 DẠNG (topics), mỗi dạng 3 mức (Thông tư 27).
   Hình (mới, mã tự dựng): hinhLong (ba hình lồng nhau), luoiO (hình xếp bằng ô vuông 1 cm², mỗi ô data-cell), vuongCheo (hình vuông cắt đường chéo), dieuHinh (cánh diều).
   Mỗi ô vuông là 1 cm². Đơn vị diện tích viết "cm²". check() đọc lại hình từ chuỗi SVG (data-lop, data-kieu, data-e, data-cell, data-k, data-dieu) và tính lại.
   QUY TẮC: nối chuỗi, KHÔNG backtick, KHÔNG template literal. */

/* ---- Tiện ích chung ---- */
function nhanSai(ds, dung){ var o={}; ds.forEach(function(p){ var v=p[0]; if(Number.isInteger(v) && v>0 && v!==dung && !(String(v) in o)) o[String(v)]=p[1]; }); return o; }
function kiemMCQ(q){ return q.choices[q.correct]===q._dung && new Set(q.choices).size===q.choices.length; }
function svgX(w, h, px){ return svgHinh(w, h, px).replace('<svg ', '<svg class="text-slate-700" '); }
function khungHinh(s){ return '<div class="flex justify-center my-2">'+s+'</svg></div>'; }
function bieuThucTo(t){ return '<div class="text-3xl font-extrabold text-orange-600 my-2">'+t+'</div>'; }
function nguoi(ten, alt){ return '<div class="flex justify-center mb-1">'+anh(ten, 72, alt)+'</div>'; }
var NB=' ';
function sx(n){ var s=String(n); return s.length>=4 ? s.slice(0,s.length-3)+NB+s.slice(-3) : s; }
function lapMCQ(dungStr, cacSai){
 var seen={}, ds=[]; seen[dungStr]=1; cacSai.forEach(function(p){ if(p[0] && !seen[p[0]]){ seen[p[0]]=1; ds.push(p); } });
 var opts=[[dungStr,'']].concat(ds.slice(0,3)); opts=shuffle(opts); var sai={};
 opts.forEach(function(o,i){ if(o[0]!==dungStr) sai[String(i)]=o[1]; });
 var cs=opts.map(function(o){ return o[0]; });
 return {choices:cs, correct:cs.indexOf(dungStr), sai:sai, _dung:dungStr};
}
var CH=['không','một','hai','ba','bốn','năm','sáu','bảy','tám','chín'];
function docSoN(n){
 if(n===10000) return 'mười nghìn';
 var th=Math.floor(n/1000), r=n%1000, h=Math.floor(r/100), t=Math.floor(r/10)%10, u=r%10, s='';
 if(th>0){ s=CH[th]+' nghìn'; if(r===0) return s; s+=' '+CH[h]+' trăm'; } else if(h>0) s=CH[h]+' trăm';
 if(th>0 || h>0){ if(t===0){ if(u>0) s+=' linh '+(u===4 ? 'tư' : CH[u]); } else { s+= t===1 ? ' mười' : ' '+CH[t]+' mươi'; if(u>0) s+=' '+(u===1 && t>1 ? 'mốt' : (u===5 ? 'lăm' : (u===4 && t>1 ? 'tư' : CH[u]))); } }
 else if(t===0) s=CH[u]; else { s=(t===1 ? 'mười' : CH[t]+' mươi'); if(u>0) s+=' '+(u===1 && t>1 ? 'mốt' : (u===5 ? 'lăm' : CH[u])); }
 return s;
}
var M2=' cm²';
var GOI={'so-sanh-dien-tich':'Hình nằm trọn trong hình kia thì có diện tích bé hơn. Hai hình có cùng số ô vuông thì diện tích bằng nhau.',
  'dem-sot-o':'Bé đếm từng ô vuông, mỗi ô đếm một lần, không bỏ sót, không đếm trùng. Bé đánh dấu ô đã đếm.',
  'viet-cm-thay-cm2':'Diện tích viết bằng xăng-ti-mét vuông (cm²), khác độ dài viết bằng xăng-ti-mét (cm).',
  'nham-bang':'Bé tính lại từng bước cho đúng nhé.',
  'doc-de-sai':'Bé đọc kỹ câu hỏi: «lớn hơn bao nhiêu» là phép trừ hai diện tích.'};
function gy(extra){ var o={}, k; for(k in GOI) o[k]=GOI[k]; for(k in (extra||{})) o[k]=extra[k]; return o; }

/* ---- Hình ---- */
/* ba hình lồng nhau: e = cỡ; chữ nhật nửa cao e, nửa rộng 1,3e; hình tròn bán kính 1,7e */
function chamTrong(o, i){
 if(o.k==='r') return i.k==='r' ? (1.3*i.e<1.3*o.e && i.e<o.e) : (1.7*i.e<o.e);
 return i.k==='r' ? (Math.sqrt(1.69+1)*i.e<1.7*o.e) : (1.7*i.e<1.7*o.e);
}
function hinhLong(ds){
 var s=svgX(300,184,300), i, d;
 for(i=0;i<ds.length;i++){
  d=ds[i];
  s+='<g data-lop="'+(i+1)+'" data-kieu="'+d.k+'" data-e="'+d.e+'" data-ten="'+d.t+'">';
  if(d.k==='r') s+='<rect x="'+(150-1.3*d.e)+'" y="'+(92-d.e)+'" width="'+(2.6*d.e)+'" height="'+(2*d.e)+'" rx="6" fill="'+d.mau+'" stroke="'+HM.vangDam+'" stroke-width="3"/>';
  else s+='<circle cx="150" cy="92" r="'+(1.7*d.e)+'" fill="'+d.mau+'" stroke="'+HM.vangDam+'" stroke-width="3"/>';
  var hw=function(o){ return o.k==='r' ? 1.3*o.e : 1.7*o.e; }, lx = i+1<ds.length ? 150-(hw(d)+hw(ds[i+1]))/2 : 150, ly = i+1<ds.length ? 98 : 98;
  s+='<text x="'+lx+'" y="'+ly+'" text-anchor="middle" font-size="16" '+HFONT+' fill="'+HM.chu+'">'+d.t+'</text></g>';
 }
 return s;
}
function docLong(html){ var re=/data-lop="(\d)" data-kieu="(\w)" data-e="(\d+)" data-ten="(\w)"/g, m, v=[]; while((m=re.exec(html))) v.push({lop:+m[1], k:m[2], e:+m[3], t:m[4]}); return v; }
/* hình xếp bằng ô vuông: cells [[c,r]]; x0, y0, cs: cỡ ô; W, H: số ô khung; ten: tên phần; mau: màu; nhãn dưới */
function oLuoi(cells, ten, mau, x0, y0, cs){
 var s='', i;
 cells.forEach(function(c){ s+='<rect data-cell="'+ten+','+c[0]+','+c[1]+'" x="'+(x0+c[0]*cs)+'" y="'+(y0+c[1]*cs)+'" width="'+cs+'" height="'+cs+'" fill="'+mau+'" stroke="'+HM.troiDam+'" stroke-width="1.5"/>'; });
 return s;
}
function khungLuoi(W, H, x0, y0, cs){
 var s='<rect x="'+x0+'" y="'+y0+'" width="'+(W*cs)+'" height="'+(H*cs)+'" fill="#fff" stroke="'+HM.day+'" stroke-width="1.5"/>', i;
 for(i=1;i<W;i++) s+='<line x1="'+(x0+i*cs)+'" y1="'+y0+'" x2="'+(x0+i*cs)+'" y2="'+(y0+H*cs)+'" stroke="'+HM.day+'" stroke-width="1"/>';
 for(i=1;i<H;i++) s+='<line x1="'+x0+'" y1="'+(y0+i*cs)+'" x2="'+(x0+W*cs)+'" y2="'+(y0+i*cs)+'" stroke="'+HM.day+'" stroke-width="1"/>';
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
function hop(cells){ var c=0, r=0; cells.forEach(function(x){ c=Math.max(c,x[0]); r=Math.max(r,x[1]); }); return [c+1, r+1]; }
function khuonHinh(cells){ var a=hop(cells); return a[0]+'x'+a[1]; }
function lienNoi(cells){ var key={}, i; cells.forEach(function(c){ key[c[0]+','+c[1]]=1; }); var seen={}, st=[cells[0]]; seen[cells[0][0]+','+cells[0][1]]=1; var cnt=0;
 while(st.length){ var c=st.pop(); cnt++; [[1,0],[-1,0],[0,1],[0,-1]].forEach(function(d){ var k=(c[0]+d[0])+','+(c[1]+d[1]); if(key[k] && !seen[k]){ seen[k]=1; st.push([c[0]+d[0], c[1]+d[1]]); } }); }
 return cnt===cells.length;
}
/* hình vuông cạnh k ô cắt đường chéo; bên phải hình tam giác B ghép từ hai nửa (đáy 2k, cao k) */
function vuongCheo(k, hienB){
 var cs = Math.min(36, Math.floor(80/k)), w=k*cs, s=svgX(300,Math.max(w,k*cs)+40,300).replace('<svg ','<svg data-k="'+k+'" '), x0=14, y0=10, i;
 s+=khungLuoi(k,k,x0,y0,cs);
 s+='<polygon points="'+x0+','+y0+' '+(x0+w)+','+y0+' '+(x0+w)+','+(y0+w)+'" fill="'+HM.troi+'" opacity="0.8"/><polygon points="'+x0+','+y0+' '+x0+','+(y0+w)+' '+(x0+w)+','+(y0+w)+'" fill="'+HM.hong+'" opacity="0.8"/>';
 s+='<line x1="'+x0+'" y1="'+y0+'" x2="'+(x0+w)+'" y2="'+(y0+w)+'" stroke="'+HM.timDam+'" stroke-width="3"/>';
 s+='<text x="'+(x0+w/2)+'" y="'+(y0+w+22)+'" text-anchor="middle" font-size="15" '+HFONT+' fill="currentColor">Hình vuông A</text>';
 if(hienB){ var bw=Math.min(2*w, 300-(x0+w+30)-6), bx=x0+w+30, bh=bw/2; s+='<polygon points="'+bx+','+(y0+w)+' '+(bx+bw)+','+(y0+w)+' '+(bx+bw/2)+','+(y0+w-bh)+'" fill="'+HM.troi+'" opacity="0.8"/><line x1="'+(bx+bw/2)+'" y1="'+(y0+w)+'" x2="'+(bx+bw/2)+'" y2="'+(y0+w-bh)+'" stroke="'+HM.timDam+'" stroke-width="3"/><text x="'+(bx+bw/2)+'" y="'+(y0+w+22)+'" text-anchor="middle" font-size="15" '+HFONT+' fill="currentColor">Tam giác B</text>'; }
 return s;
}
/* cánh diều: ds = [{t:'đỏ', v:900, mau}] */
function dieuHinh(ds){
 var n=ds.length, W=300, s=svgX(W,160,W), i, cx, d;
 for(i=0;i<n;i++){
  d=ds[i]; cx=W/(n*2)+i*(W/n);
  s+='<g data-dieu="'+d.t+':'+d.v+'"><polygon points="'+cx+',8 '+(cx+30)+',48 '+cx+',100 '+(cx-30)+',48" fill="'+d.mau+'" stroke="'+HM.goDam+'" stroke-width="3" stroke-linejoin="round"/>';
  s+='<path d="M'+cx+' 100 q-12 12 0 22 q12 10 0 20" fill="none" stroke="'+HM.goDam+'" stroke-width="3" stroke-linecap="round"/>';
  s+='<text x="'+cx+'" y="152" text-anchor="middle" font-size="15" '+HFONT+' fill="currentColor">'+d.v+M2+'</text></g>';
 }
 return s;
}
function docDieu(html){ var re=/data-dieu="([^":]+):(\d+)"/g, m, v=[]; while((m=re.exec(html))) v.push({t:m[1], v:+m[2]}); return v; }
var MAU_DIEU={'đỏ':HM.do, 'vàng':HM.vang, 'xanh':HM.troi};
var MAU_LONG=[HM.vang, HM.cam, HM.hong];

var BAI = {
 n: 51,
 title: 'Diện Tích Của Một Hình. Xăng-ti-mét Vuông',
 sub: 'Luyện thông minh: câu hỏi tự đổi theo bé — làm hết lượt để xem ngọn lửa!',
 goal: 10, soCau: 18, soCauToiDa: 24,
 loi: {'so-sanh-dien-tich':'So sánh diện tích sai (hình lồng nhau, số ô)', 'dem-sot-o':'Đếm sót hoặc đếm trùng ô vuông', 'viet-cm-thay-cm2':'Viết cm thay cho cm²', 'nham-bang':'Tính sai', 'doc-de-sai':'Đọc sai yêu cầu của đề'},
 muctieu: [
  {id:'MT1', ten:'So sánh diện tích bằng trực quan', muc:['Hình nằm trong hình kia; đếm ô hai hình có số ô khác xa hoặc bằng nhau; hình vuông cắt chéo.', 'Đếm ô hai hình chênh 1 đến 2 ô; E = C + D, tìm số ô của một phần.', 'Ba hình lồng nhau; hai hình có dạng khác nhau, số ô chênh 1; ba phần của một hình.']},
  {id:'MT2', ten:'Xăng-ti-mét vuông: đọc, viết, đếm ô', muc:['Đọc, viết số đo hai chữ số (15 cm²); đếm ô hình nhỏ (4 đến 6 ô); An viết đơn vị.', 'Số đo ba chữ số (234 cm²); đếm ô hình 10 đến 14 ô.', 'Số đo 1 500 cm², 10 000 cm²; đếm ô hình ghép lớn.']},
  {id:'MT3', ten:'Tính với đơn vị xăng-ti-mét vuông', muc:['2 cm² + 3 cm²; 5 cm² × 2; diều nào lớn hơn.', '37 cm² + 25 cm²; 15 cm² × 4; lớn hơn bao nhiêu cm².', '50 cm² − 12 cm²; 56 cm² : 7; ba cánh diều xếp thứ tự.']}
 ],
 topics: [
  /* D1 — Hình nằm trong hình (khám phá) */
  {name:'Hình nằm trong hình', sec:'Khám phá — hình chữ nhật nằm trong hình tròn thì diện tích bé hơn; tam giác ABC nằm trong tam giác ADC', mt:['MT1'], levels:3,
   muc:['Hai hình lồng nhau: hình nào có diện tích bé hơn.', 'Hai hình lồng nhau: hình nào lớn hơn, hình nào bé hơn.', 'Ba hình lồng nhau: hình nào lớn nhất, bé nhất.'],
   make:function(lv){
    var n = lv<=2 ? 2 : 3, ds=[], es=[50,28,14], ks=[], i, g, ten=shuffle(['A','B','C']).slice(0,n);
    for(g=0; g<200; g++){ ks=[]; for(i=0;i<n;i++) ks.push(pick(['r','c'])); var ok=true; for(i=0;i+1<n;i++){ if(!chamTrong({k:ks[i],e:es[i]},{k:ks[i+1],e:es[i+1]})) ok=false; } if(ok) break; }
    for(i=0;i<n;i++) ds.push({k:ks[i], e:es[i], t:ten[i], mau:MAU_LONG[i]});
    var hoiLon = lv<=1 ? false : Math.random()<0.5, dung = hoiLon ? ds[0].t : ds[n-1].t, ch;
    if(lv>=3){ hoiLon=Math.random()<0.5; dung = hoiLon ? ds[0].t : ds[n-1].t; }
    ch = n===2 ? ['Hình '+ds[0].t, 'Hình '+ds[1].t, 'Hai hình bằng nhau', 'Không so sánh được'] : ['Hình A','Hình B','Hình C','Ba hình bằng nhau'];
    var D='Hình '+dung, sai={}; ch.forEach(function(c,i){ if(c!==D) sai[String(i)]='so-sanh-dien-tich'; });
    return {type:'mcq', cot:2, _lv:lv, _lon:hoiLon, _dung:D, q:khungHinh(hinhLong(ds).replace(/<\/svg>$/,''))+'<div>Các hình xếp lồng nhau như hình. Hình nào có diện tích <b>'+(hoiLon ? 'lớn nhất' : 'bé nhất')+'</b>?</div>', choices:ch, correct:ch.indexOf(D), sai:sai, goiY:gy()};
  }, check:function(q){ var ds=docLong(q.q), n=q._lv<=2 ? 2 : 3; if(ds.length!==n || !kiemMCQ(q)) return false; var i; for(i=0;i+1<n;i++) if(!chamTrong(ds[i], ds[i+1])) return false;
    var e = q._lon ? ds[0].t : ds[n-1].t; if(q._dung!=='Hình '+e) return false; if(q._lv<=1 && q._lon) return false; return new Set(ds.map(function(d){ return d.t; })).size===n; }},

  /* D2 — Đếm ô, so sánh hai hình (bài 1) */
  {name:'Đếm ô, so sánh hai hình', sec:'Bài 1 — hai hình trên lưới ô vuông: hình A 6 ô, hình B 6 ô nên diện tích bằng nhau', mt:['MT1'], levels:3,
   muc:['Hai hình có số ô bằng nhau hoặc chênh nhiều.', 'Hai hình có số ô chênh 1 đến 2.', 'Hai hình có dạng khác nhau, số ô chênh 1.'],
   make:function(lv){
    var a, b, A, B, g;
    for(g=0; g<400; g++){
     a=rnd(5,10); b = lv<=1 ? (Math.random()<0.4 ? a : a+pick([-3,3,4,-4])) : (lv===2 ? a+pick([-2,-1,1,2]) : a+pick([-1,1]));
     if(b<3) continue; A=polyo(a,6,5); B=polyo(b,6,5); if(!lienNoi(A) || !lienNoi(B)) continue;
     if(lv>=3 && khuonHinh(A)===khuonHinh(B)) continue; break;
    }
    var s=svgX(300,150,300);
    s+=khungLuoi(6,5,6,6,22)+oLuoi(A,'A',HM.troi,6,6,22)+khungLuoi(6,5,162,6,22)+oLuoi(B,'B',HM.hong,162,6,22);
    s+='<text x="72" y="146" text-anchor="middle" font-size="15" '+HFONT+' fill="currentColor">Hình A</text><text x="228" y="146" text-anchor="middle" font-size="15" '+HFONT+' fill="currentColor">Hình B</text>';
    var D = a>b ? 'Hình A lớn hơn' : (a<b ? 'Hình B lớn hơn' : 'Diện tích hai hình bằng nhau'), ch=['Hình A lớn hơn','Hình B lớn hơn','Diện tích hai hình bằng nhau'], sai={};
    ch.forEach(function(c,i){ if(c!==D) sai[String(i)]='dem-sot-o'; });
    return {type:'mcq', cot:1, _lv:lv, _dung:D, q:khungHinh(s)+'<div>Mỗi ô vuông là 1 cm². So sánh diện tích hai hình.</div>', choices:ch, correct:ch.indexOf(D), sai:sai, goiY:gy()};
  }, check:function(q){ var o=docO(q.q); if(!o.A || !o.B || !kiemMCQ(q) || q.choices.length!==3 || !lienNoi(o.A) || !lienNoi(o.B)) return false; var a=o.A.length, b=o.B.length, d=Math.abs(a-b);
    var e = a>b ? 'Hình A lớn hơn' : (a<b ? 'Hình B lớn hơn' : 'Diện tích hai hình bằng nhau'); if(q._dung!==e) return false;
    if(q._lv<=1) return d===0 || d>=3; if(q._lv===2) return d>=1 && d<=2; return d===1 && khuonHinh(o.A)!==khuonHinh(o.B); }},

  /* D3 — Cắt ghép hình (khám phá, bài 2) */
  {name:'Cắt ghép hình', sec:'Khám phá, bài 2 — hình E (10 ô) cắt thành C (6 ô) và D (4 ô): diện tích E bằng diện tích C cộng diện tích D', mt:['MT1'], levels:3,
   muc:['Biết E và C, tìm số ô của D.', 'Biết C và D, tìm số ô của E.', 'Hình E gồm ba phần C, D, G: tìm số ô của G.'],
   make:function(lv){
    var g, cells, W=7, H=5, n=rnd(9,14), cuts, parts, cnt;
    for(g=0; g<500; g++){
     cells=polyo(n,W,H); if(!lienNoi(cells)) continue;
     var cs=cells.map(function(c){ return c[0]; }).sort(function(a,b){ return a-b; }), c1=cs[Math.floor(n/3)], c2=cs[Math.floor(2*n/3)];
     if(lv<=2){ parts=cells.map(function(c){ return c[0]<c1 ? 'C' : 'D'; }); } else { parts=cells.map(function(c){ return c[0]<c1 ? 'C' : (c[0]<c2 ? 'D' : 'G'); }); }
     cnt={C:0,D:0,G:0}; parts.forEach(function(p){ cnt[p]++; });
     if(cnt.C>0 && cnt.D>0 && (lv<=2 || cnt.G>0) && (lv>=3 || cnt.C!==cnt.D)) break;
    }
    var s=svgX(300,196,300), x0=45, y0=6, cs2=30, MAU={C:HM.troi, D:HM.hong, G:HM.la}, i;
    s+=khungLuoi(W,H,x0,y0,cs2);
    ['C','D','G'].forEach(function(p){ var cc=cells.filter(function(c,i2){ return parts[i2]===p; }); s+=oLuoi(cc,p,MAU[p],x0,y0,cs2); });
    var leg=lv<=2 ? ['C','D'] : ['C','D','G'];
    leg.forEach(function(p,k){ s+='<rect x="'+(96+k*52)+'" y="168" width="18" height="18" fill="'+MAU[p]+'" stroke="'+HM.troiDam+'" stroke-width="1.5"/><text x="'+(120+k*52)+'" y="183" font-size="16" '+HFONT+' fill="currentColor">'+p+'</text>'; });
    var ve=khungHinh(s), ans, q;
    if(lv<=1){ ans=cnt.D; q='<div>Hình E có <b>'+n+' ô</b> vuông, cắt thành hai phần C và D. Phần C có <b>'+cnt.C+' ô</b>. Phần D có bao nhiêu ô vuông?</div>'; }
    else if(lv===2){ ans=n; q='<div>Hình E gồm hai phần: phần C có <b>'+cnt.C+' ô</b>, phần D có <b>'+cnt.D+' ô</b>. Mỗi ô vuông là 1 cm². Diện tích hình E là bao nhiêu xăng-ti-mét vuông?</div>'; }
    else { ans=cnt.G; q='<div>Hình E có <b>'+n+' ô</b> vuông, cắt thành ba phần C, D, G. Phần C có <b>'+cnt.C+' ô</b>, phần D có <b>'+cnt.D+' ô</b>. Phần G có bao nhiêu ô vuông?</div>'; }
    return {type:'num', _lv:lv, _n:n, _c:cnt.C, _d:cnt.D, q:ve+q, ans:ans, sai:nhanSai([[ans+1,'dem-sot-o'],[ans-1,'dem-sot-o'],[cnt.C,'nham-bang'],[lv>=3 ? cnt.D : n,'nham-bang'],[n+cnt.C,'nham-bang']], ans), goiY:gy()};
  }, check:function(q){ var o=docO(q.q), C=(o.C||[]).length, D=(o.D||[]).length, G=(o.G||[]).length, n=C+D+G; if(C<1 || D<1 || n!==q._n) return false; var all=[].concat(o.C||[], o.D||[], o.G||[]); if(!lienNoi(all)) return false; if(q._c!==C || q._d!==D) return false;
    if(q._lv<=1) return G===0 && q.ans===D && q.q.indexOf('<b>'+n+' ô</b>')>=0; if(q._lv===2) return G===0 && q.ans===n; return G>=1 && q.ans===G && q.q.indexOf('<b>'+n+' ô</b>')>=0; }},

  /* D4 — Đọc, viết xăng-ti-mét vuông (bài 3) */
  {name:'Đọc, viết xăng-ti-mét vuông', sec:'Bài 3 — mười lăm xăng-ti-mét vuông viết 15 cm²; 234 cm²; 1 500 cm² đọc một nghìn năm trăm xăng-ti-mét vuông; 10 000 cm²', mt:['MT2'], levels:3,
   muc:['Số đo có hai chữ số (15 cm²).', 'Số đo có ba chữ số (234 cm²).', 'Số đo có bốn chữ số (1 500 cm²), 10 000 cm².'],
   make:function(lv){
    var n = lv<=1 ? rnd(11,99) : (lv===2 ? rnd(101,999) : pick([1500, 2000, 3500, 10000, rnd(10,99)*100+rnd(0,9)*10])), D=sx(n)+M2, sai=[];
    sai.push([sx(n)+' cm','viet-cm-thay-cm2'],[sx(n)+' m²','viet-cm-thay-cm2']);
    var d=String(n).split(''); if(d.length>=2 && d[0]!==d[1]){ var w=d.slice(); var t=w[0]; w[0]=w[1]; w[1]=t; var nn=+w.join(''); if(nn!==n && w[0]!=='0') sai.push([sx(nn)+M2,'nham-bang']); }
    sai.push([sx(n+(n>=1000 ? 100 : 10))+M2,'nham-bang'],[sx(n>=1000 ? n-1000 : n+1)+M2,'nham-bang']);
    var m=lapMCQ(D, sai);
    return {type:'mcq', cot:2, _lv:lv, _n:n, _dung:m._dung, q:'<div>Số đo diện tích đọc là:</div>'+bieuThucTo('«'+docSoN(n)+' xăng-ti-mét vuông»')+'<div>Bé chọn cách viết đúng!</div>', choices:m.choices, correct:m.correct, sai:m.sai, goiY:gy()};
  }, check:function(q){ var n=q._n; if(n<10 || n>10000 || !kiemMCQ(q) || q.choices.length!==4 || q._dung!==sx(n)+M2 || q.q.indexOf(docSoN(n)+' xăng-ti-mét vuông')<0) return false; if(q._lv<=1) return n<100; if(q._lv===2) return n>=100 && n<1000; return n>=1000; }},

  /* D5 — Đếm ô tính diện tích (bài 4) */
  {name:'Đếm ô tính diện tích', sec:'Bài 4 — con sâu 4 ô vuông có diện tích 4 cm²; hình con vật đếm ô trên lưới', mt:['MT2'], levels:3,
   muc:['Hình nhỏ (4 đến 6 ô).', 'Hình 10 đến 14 ô.', 'Hình ghép lớn (15 đến 22 ô).'],
   make:function(lv){
    var n = lv<=1 ? rnd(4,6) : (lv===2 ? rnd(10,14) : rnd(15,22)), cells, W=8, H=6, g;
    for(g=0; g<500; g++){ cells=polyo(n,W,H); if(lienNoi(cells)) break; }
    var s=svgX(300,188,300), x0=30, cs=30;
    s+=khungLuoi(W,H,x0,4,cs)+oLuoi(cells,'E',HM.troi,x0,4,cs);
    return {type:'num', _lv:lv, _n:n, q:khungHinh(s)+'<div>Mỗi ô vuông có diện tích 1 cm². Diện tích hình màu xanh là bao nhiêu xăng-ti-mét vuông?</div>', ans:n, sai:nhanSai([[n+1,'dem-sot-o'],[n-1,'dem-sot-o'],[n+2,'dem-sot-o'],[n-2,'dem-sot-o'],[hop(cells)[0]*hop(cells)[1],'nham-bang']], n), goiY:gy()};
  }, check:function(q){ var o=docO(q.q), E=o.E||[]; if(!E.length || !lienNoi(E) || q.ans!==E.length || q._n!==E.length) return false; var n=E.length; if(q._lv<=1) return n>=4 && n<=6; if(q._lv===2) return n>=10 && n<=14; return n>=15 && n<=22; }},

  /* D6 — Hình vuông cắt đường chéo (bài 1) */
  {name:'Hình vuông cắt đường chéo', sec:'Bài 1 — hình vuông A cắt theo đường chéo thành hai tam giác, ghép thành tam giác B: diện tích bằng nhau', mt:['MT1'], levels:3,
   muc:['Mỗi nửa (tam giác) có diện tích bằng nửa hình vuông.', 'Hai nửa ghép thành tam giác B: diện tích B bằng diện tích A.', 'Hình vuông cạnh 3 đến 5 ô: diện tích B.'],
   make:function(lv){
    var k = lv<=1 ? pick([2,4]) : (lv===2 ? pick([2,3,4]) : pick([3,4,5])), A=k*k, ans, q;
    if(lv<=1){ ans=A/2; q='<div>Hình vuông A có cạnh <b>'+k+' ô</b>, mỗi ô là 1 cm². Cắt theo đường chéo thành hai tam giác bằng nhau. Mỗi tam giác có diện tích bao nhiêu xăng-ti-mét vuông?</div>'; }
    else { ans=A; q='<div>Hình vuông A có cạnh <b>'+k+' ô</b>, mỗi ô là 1 cm². Cắt theo đường chéo rồi ghép hai nửa thành tam giác B. Diện tích tam giác B là bao nhiêu xăng-ti-mét vuông?</div>'; }
    return {type:'num', _lv:lv, _k:k, q:khungHinh(vuongCheo(k, lv>=2))+q, ans:ans, sai:nhanSai([[lv<=1 ? A : A/2,'so-sanh-dien-tich'],[ans+1,'nham-bang'],[ans-1,'nham-bang'],[k*2,'nham-bang'],[A*2,'so-sanh-dien-tich']], ans), goiY:gy()};
  }, check:function(q){ var m=/data-k="(\d+)"/.exec(q.q); if(!m) return false; var k=+m[1]; if(k!==q._k || k<2 || k>5) return false; var A=k*k; if(q._lv<=1) return k%2===0 && q.ans===A/2 && q.q.indexOf('Tam giác B')<0; if(q._lv===2) return q.ans===A && q.q.indexOf('Tam giác B')>=0 && k<=4; return q.ans===A && k>=3 && q.q.indexOf('Tam giác B')>=0; }},

  /* D7 — Cộng, trừ với cm² (bài 5) */
  {name:'Cộng, trừ với xăng-ti-mét vuông', sec:'Bài 5 — 2 cm² + 3 cm² = 5 cm²; 37 cm² + 25 cm² = 62 cm²; 50 cm² − 12 cm² = 38 cm²', mt:['MT3'], levels:3,
   muc:['Cộng, trừ hai số nhỏ (2 cm² + 3 cm²).', 'Cộng hai số có hai chữ số (37 cm² + 25 cm²).', 'Trừ (50 cm² − 12 cm²) hoặc cộng rồi trừ.'],
   make:function(lv){
    var a, b, c, ans, ex;
    if(lv<=1){ a=rnd(2,9); b=rnd(2,9); if(Math.random()<0.5){ ans=a+b; ex=a+M2+' + '+b+M2; } else { if(a<b){ var t=a; a=b; b=t; } ans=a-b; ex=a+M2+' − '+b+M2; if(ans<1){ ans=a+b; ex=a+M2+' + '+b+M2; } } }
    else if(lv===2){ a=rnd(11,60); b=rnd(11,60); ans=a+b; ex=a+M2+' + '+b+M2; }
    else if(Math.random()<0.5){ a=rnd(30,99); b=rnd(11,a-10); ans=a-b; ex=a+M2+' − '+b+M2; }
    else { a=rnd(20,60); b=rnd(11,60); c=rnd(5,Math.min(a+b-5,40)); ans=a+b-c; ex=a+M2+' + '+b+M2+' − '+c+M2; }
    return {type:'num', _lv:lv, _ex:ex, q:'<div>Tính (viết kết quả là số, đơn vị là xăng-ti-mét vuông):</div>'+bieuThucTo(ex+' = ? cm²'), ans:ans, sai:nhanSai([[ans+10,'nham-bang'],[ans-10,'nham-bang'],[ans+1,'nham-bang'],[ans-1,'nham-bang'],[a+b,'nham-bang']], ans), goiY:gy()};
  }, check:function(q){ var m=q._ex.replace(/ cm²/g,'').split(' '), v=+m[0], i, t=v; for(i=1;i<m.length;i+=2){ t = m[i]==='+' ? t+ +m[i+1] : t-+m[i+1]; } if(q.ans!==t || t<1 || t>999 || q.q.indexOf(q._ex)<0) return false;
    if(q._lv<=1) return m.length===3 && Math.max(+m[0],+m[2])<=9; if(q._lv===2) return m.length===3 && m[1]==='+' && +m[0]>=11 && +m[2]>=11; return (m.length===3 && m[1]==='−' && +m[0]>=30) || m.length===5; }},

  /* D8 — Nhân, chia với cm² (bài 5) */
  {name:'Nhân, chia với xăng-ti-mét vuông', sec:'Bài 5 — 5 cm² × 2 = 10 cm²; 15 cm² × 4 = 60 cm²; 56 cm² : 7 = 8 cm²', mt:['MT3'], levels:3,
   muc:['Nhân số nhỏ (5 cm² × 2).', 'Nhân số có hai chữ số (15 cm² × 4).', 'Chia hết (56 cm² : 7).'],
   make:function(lv){
    var a, b, ans, ex;
    if(lv<=1){ a=rnd(2,9); b=rnd(2,5); ans=a*b; ex=a+M2+' × '+b; }
    else if(lv===2){ a=rnd(11,30); b=rnd(2,5); ans=a*b; ex=a+M2+' × '+b; }
    else { b=rnd(3,9); ans=rnd(3,9)*1+rnd(0,6)*1; ans=rnd(4,19); a=ans*b; ex=a+M2+' : '+b; }
    return {type:'num', _lv:lv, _ex:ex, q:'<div>Tính (viết kết quả là số, đơn vị là xăng-ti-mét vuông):</div>'+bieuThucTo(ex+' = ? cm²'), ans:ans, sai:nhanSai([[ans+b,'nham-bang'],[ans+1,'nham-bang'],[ans-1,'nham-bang'],[a+b,'nham-bang'],[ans+10,'nham-bang']], ans), goiY:gy()};
  }, check:function(q){ var chia=q._ex.indexOf(' : ')>=0, p=q._ex.replace(M2,'').split(chia ? ' : ' : ' × '), a=+p[0], b=+p[1]; if(chia && a%b!==0) return false; var e = chia ? a/b : a*b; if(q.ans!==e || e>999 || q.q.indexOf(q._ex)<0) return false;
    if(q._lv<=1) return !chia && a<=9 && b<=5; if(q._lv===2) return !chia && a>=11 && b<=5; return chia && b>=3 && b<=9 && e>=4; }},

  /* D9 — Hai cánh diều (bài 6) */
  {name:'Hai cánh diều', sec:'Bài 6 — cánh diều đỏ 900 cm², cánh diều vàng 880 cm²: diều đỏ lớn hơn diều vàng 20 cm²', mt:['MT3'], levels:3,
   muc:['Hai cánh diều: cánh nào có diện tích lớn hơn.', 'Hai cánh diều: lớn hơn bao nhiêu xăng-ti-mét vuông.', 'Ba cánh diều: xếp từ lớn đến bé.'],
   make:function(lv){
    var n = lv<=2 ? 2 : 3, vs, g, ten=shuffle(['đỏ','vàng','xanh']).slice(0,n), ds;
    for(g=0; g<100; g++){ var base=rnd(10,90)*10; vs=[base+rnd(1,9)*10, base+rnd(1,9)*10, base+rnd(1,9)*10].slice(0,n); if(new Set(vs).size===n) break; }
    ds=ten.map(function(t,i){ return {t:t, v:vs[i], mau:MAU_DIEU[t]}; });
    var hinh=khungHinh(dieuHinh(ds).replace(/<\/svg>$/,''));
    if(lv<=1){ var lon=ds[0].v>ds[1].v ? ds[0] : ds[1], ch=['Cánh diều '+ds[0].t, 'Cánh diều '+ds[1].t, 'Hai cánh diều bằng nhau', 'Không so sánh được'], D='Cánh diều '+lon.t, sai={}; ch.forEach(function(c,i){ if(c!==D) sai[String(i)]='so-sanh-dien-tich'; });
      return {type:'mcq', cot:2, _lv:1, _dung:D, q:hinh+'<div>Cánh diều nào có diện tích lớn hơn?</div>', choices:ch, correct:ch.indexOf(D), sai:sai, goiY:gy()}; }
    if(lv===2){ var l2=Math.max(ds[0].v,ds[1].v), s2=Math.min(ds[0].v,ds[1].v), ans=l2-s2, ln=ds[0].v>ds[1].v ? ds[0].t : ds[1].t, sn=ds[0].v>ds[1].v ? ds[1].t : ds[0].t;
      return {type:'num', _lv:2, q:hinh+'<div>Cánh diều '+ln+' có diện tích lớn hơn cánh diều '+sn+' bao nhiêu xăng-ti-mét vuông?</div>', ans:ans, sai:nhanSai([[l2+s2,'doc-de-sai'],[ans+10,'nham-bang'],[ans-10,'nham-bang'],[l2,'doc-de-sai']], ans), goiY:gy()}; }
    var srt=ds.slice().sort(function(a,b){ return b.v-a.v; }), D3=srt.map(function(d){ return d.t; }).join(' > '), per=[], sai3=[];
    function hv(a){ if(a.length<=1) return [a]; var r=[]; a.forEach(function(x,i){ hv(a.slice(0,i).concat(a.slice(i+1))).forEach(function(t){ r.push([x].concat(t)); }); }); return r; }
    hv(ten.slice()).forEach(function(a){ var c=a.join(' > '); if(c!==D3) sai3.push([c,'so-sanh-dien-tich']); });
    var m3=lapMCQ(D3, shuffle(sai3));
    return {type:'mcq', cot:1, _lv:3, _dung:m3._dung, q:hinh+'<div>Xếp ba cánh diều theo diện tích từ lớn đến bé. Cách xếp nào đúng?</div>', choices:m3.choices, correct:m3.correct, sai:m3.sai, goiY:gy()};
  }, check:function(q){ var ds=docDieu(q.q), n=q._lv<=2 ? 2 : 3; if(ds.length!==n || new Set(ds.map(function(d){ return d.v; })).size!==n || ds.some(function(d){ return d.v<100 || d.v>999; })) return false;
    var srt=ds.slice().sort(function(a,b){ return b.v-a.v; });
    if(q._lv<=1) return kiemMCQ(q) && q._dung==='Cánh diều '+srt[0].t; if(q._lv===2) return q.ans===srt[0].v-srt[1].v;
    return kiemMCQ(q) && q.choices.length>=3 && q._dung===srt.map(function(d){ return d.t; }).join(' > '); }},

  /* D10 — Bạn An viết đơn vị (không có trong SGK) */
  {name:'Bạn An viết đơn vị', sec:'Ôn tập — bạn An đếm 15 ô vuông, viết diện tích 15 cm: em có đồng ý không, An sai ở đâu, viết đúng', mt:['MT2'], levels:3,
   muc:['An viết diện tích bằng một đơn vị: em có đồng ý không.', 'An viết diện tích bằng cm: An sai ở đâu.', 'An viết sai đơn vị: cách viết đúng là gì.'],
   make:function(lv){
    var n=rnd(5,14), cells, g, W=5, H=4; for(g=0; g<300; g++){ cells=polyo(n,W,H); if(lienNoi(cells)) break; }
    var s=svgX(300,112,300), x0=76, cs=28; s+=khungLuoi(W,H,x0,4,cs)+oLuoi(cells,'E',HM.troi,x0,4,cs);
    var ve=khungHinh(s), mo='<div>Mỗi ô vuông là 1 cm². Bạn An đếm đúng số ô vuông và viết diện tích hình là «<b>'+n+(lv<=1 && Math.random()<0.5 ? M2 : ' cm')+'</b>».</div>';
    if(lv<=1){ var dung=mo.indexOf(M2+'</b>')>=0, D=dung ? 'Đồng ý' : 'Không đồng ý'; return {type:'mcq', cot:2, _lv:1, _n:n, _dung:D, q:nguoi('boy','Bạn An')+ve+mo+'<div>Em có đồng ý với An không?</div>', choices:['Đồng ý','Không đồng ý'], correct:dung?0:1, sai:(dung?{'1':'viet-cm-thay-cm2'}:{'0':'viet-cm-thay-cm2'}), goiY:gy()}; }
    mo='<div>Mỗi ô vuông là 1 cm². Bạn An đếm đúng số ô vuông và viết diện tích hình là «<b>'+n+' cm</b>». An viết sai rồi!</div>';
    if(lv===2){ var D2='Diện tích phải viết bằng xăng-ti-mét vuông (cm²), không viết cm', m2=lapMCQ(D2, [['An đếm thiếu một ô vuông','dem-sot-o'],['An viết sai số đo, phải viết '+(n+1),'nham-bang'],['Diện tích viết bằng mét vuông','viet-cm-thay-cm2']]);
      return {type:'mcq', cot:1, _lv:2, _n:n, _dung:D2, q:nguoi('boy','Bạn An')+ve+mo+'<div>An sai ở đâu?</div>', choices:m2.choices, correct:m2.correct, sai:m2.sai, goiY:gy()}; }
    var D3=n+M2, m3=lapMCQ(D3, [[n+' cm','viet-cm-thay-cm2'],[n+' m²','viet-cm-thay-cm2'],[(n+1)+M2,'dem-sot-o'],[(n-1)+M2,'dem-sot-o']]);
    return {type:'mcq', cot:2, _lv:3, _n:n, _dung:m3._dung, q:nguoi('boy','Bạn An')+ve+mo+'<div>Cách viết đúng diện tích của hình là:</div>', choices:m3.choices, correct:m3.correct, sai:m3.sai, goiY:gy()};
  }, check:function(q){ var o=docO(q.q), E=o.E||[]; if(!E.length || !lienNoi(E) || E.length!==q._n || q._n<5 || q._n>14 || !kiemMCQ(q)) return false; var n=q._n;
    if(q._lv<=1){ var cm2=q.q.indexOf('<b>'+n+M2+'</b>')>=0, cm=q.q.indexOf('<b>'+n+' cm</b>')>=0; return (cm2!==cm) && q.choices.length===2 && (q._dung==='Đồng ý')===cm2; }
    if(q.q.indexOf('<b>'+n+' cm</b>')<0) return false; if(q._lv===2) return q.choices.length===4 && q._dung==='Diện tích phải viết bằng xăng-ti-mét vuông (cm²), không viết cm'; return q._dung===n+M2 && q.choices.length===4; }}
 ]
};
