/* bai-39.js — Bài 39: So sánh số lớn gấp mấy lần số bé. BÀI MỚI, Engine v2 — LUYỆN THÔNG MINH.
   Theo bảng phân tích sư phạm đã duyệt (phan-tich-su-pham/bai-39.md, PR #31): 4 MỤC TIÊU (muctieu) × 9 DẠNG (topics), mỗi dạng 3 mức (Thông tư 27).
   Quy tắc: muốn tìm số lớn gấp mấy lần số bé, lấy số lớn chia cho số bé. Bẫy: "nhiều hơn bao nhiêu" (trừ) với "gấp mấy lần" (chia); lấy số bé chia số lớn.
   Số lớn luôn chia hết cho số bé; số lần 2–10. Hình mới viết ngay trong file này (không sửa figures.js): haiHang (hai hàng vật đếm được, data-dem), luoiBong (lưới bóng, data-dem);
   soDoHai chép từ bài 28 (thêm tuỳ chọn ẩn nhãn), bảng tri chép từ bài 36. check() đếm lại vật từ chuỗi SVG và tính lại số lần.
   QUY TẮC: nối chuỗi, KHÔNG backtick và KHÔNG template literal. */

/* ---- Tiện ích chung ---- */
function nhanSai(ds, dung){ var o={}; ds.forEach(function(p){ var v=p[0]; if(Number.isInteger(v) && v>0 && v!==dung && !(String(v) in o)) o[String(v)]=p[1]; }); return o; }
function kiemMCQ(q){ return q.choices[q.correct]===q._dung && new Set(q.choices).size===q.choices.length; }
function svgX(w, h, px){ return svgHinh(w, h, px).replace('<svg ', '<svg class="text-slate-700" '); }
function demDem(s, loai){ var m=String(s).match(new RegExp('data-dem="'+loai+'"', 'g')); return m ? m.length : 0; }
function khungHinh(s){ return '<div class="flex justify-center my-2">'+s+'</svg></div>'; }
function nguoi(ten, alt){ return '<div class="flex justify-center mb-1">'+anh(ten, 72, alt)+'</div>'; }
function kyHieu(nhan, bt){ return '<div class="text-slate-500 mb-1">'+nhan+'</div><div class="text-3xl font-extrabold text-orange-600">'+bt+'</div>'; }
var GOI={'chia-nguoc':'Muốn biết số lớn gấp mấy lần số bé, bé lấy SỐ LỚN chia cho SỐ BÉ.', 'nham-hon-gap':'"Nhiều hơn bao nhiêu" thì lấy số lớn TRỪ số bé. "Gấp mấy lần" thì lấy số lớn CHIA cho số bé.', 'dem-sai':'Bé đếm lại từng hàng, từng cột nhé.', 'nham-hang':'Số tròn chục, tròn trăm: 6 trăm : 2 trăm = 3 (lần), vì 600 = 200 × 3.',
  'nham-bang':'Bé nhẩm lại bảng chia nhé.', 'chon-sai-phep':'Bé đọc kỹ câu hỏi: hỏi "gấp mấy lần" hay "nhiều hơn bao nhiêu"?', 'dao-vai':'Bé xem lại: câu hỏi hỏi số lần hay hỏi số lớn?', 'thieu-buoc':'Bài này có hai bước. Bé làm đủ các bước nhé!', 'cong-thay-nhan':'Gấp n lần là nhân với n.'};
function gy(extra){ var o={}, k; for(k in GOI) o[k]=GOI[k]; for(k in (extra||{})) o[k]=extra[k]; return o; }
function tri(r1,r2,r3, v1,v2,v3, hide){
  function cell(v,on){ return '<td data-o="'+(on?'?':v)+'" class="px-4 py-1 text-center text-lg '+(on?'bg-amber-100 text-amber-700 font-extrabold':'font-bold text-slate-700')+'" style="border:1px solid #fcd34d">'+(on?'?':v)+'</td>'; }
  function lab(t){ return '<td class="px-3 py-1 font-bold text-slate-600 bg-amber-50" style="border:1px solid #fcd34d">'+t+'</td>'; }
  return '<table class="mx-auto border-collapse my-2" style="border:2px solid #fcd34d;border-radius:8px;overflow:hidden">'
   +'<tr>'+lab(r1)+cell(v1,hide===0)+'</tr><tr>'+lab(r2)+cell(v2,hide===1)+'</tr><tr>'+lab(r3)+cell(v3,hide===2)+'</tr></table>';
}
function docTri(s){ var o=[], re=/data-o="([^"]*)"/g, m; while((m=re.exec(String(s)))) o.push(m[1]); return o; }
function okEq(s){ var re=/(\d+) ([+−×:]) (\d+) = (\d+)/g, m, n=0, ok=true; while((m=re.exec(s))){ n++; if(tinhBT(m[1]+' '+m[2]+' '+m[3])!==+m[4]) ok=false; } return ok && n>=1; }

/* ---- Hình mới 1 (D1): hai hàng vật. n1 = hàng trên (0 = không vẽ), n2 = hàng dưới; mỗi vật data-dem="vat" data-h="1|2" ---- */
function veVat(loai, cx, cy, h){
  if(loai==='oto') return '<rect data-dem="vat" data-h="'+h+'" x="'+(cx-13)+'" y="'+(cy-8)+'" width="26" height="14" rx="4" fill="'+HM.do+'"/><rect x="'+(cx-7)+'" y="'+(cy-14)+'" width="13" height="7" rx="2" fill="'+HM.troi+'"/><circle cx="'+(cx-7)+'" cy="'+(cy+7)+'" r="3.2" fill="'+HM.den+'"/><circle cx="'+(cx+7)+'" cy="'+(cy+7)+'" r="3.2" fill="'+HM.den+'"/>';
  if(loai==='hoa') return '<circle data-dem="vat" data-h="'+h+'" cx="'+cx+'" cy="'+cy+'" r="11" fill="'+HM.hong+'"/><circle cx="'+cx+'" cy="'+cy+'" r="4.5" fill="'+HM.vang+'"/>';
  return '<circle data-dem="vat" data-h="'+h+'" cx="'+cx+'" cy="'+cy+'" r="11" fill="'+HM.cam+'"/><path d="M'+(cx-4)+' '+(cy-11)+' Q'+cx+' '+(cy-16)+' '+(cx+5)+' '+(cy-13)+'" fill="none" stroke="'+HM.xanhLa+'" stroke-width="2.5" stroke-linecap="round"/>';
}
function haiHang(n1, n2, loai){
  var D=28, nmax=Math.max(n1,n2), ox=14, W=ox*2+nmax*D, H = n1>0 ? 140 : 72, s=svgX(Math.max(W,200),H), i;
  if(n1>0){ s+='<text x="'+ox+'" y="22" font-size="17" '+HFONT+' fill="currentColor">Hàng trên</text>'; for(i=0;i<n1;i++) s+=veVat(loai, ox+i*D+D/2, 48, 1); }
  var yl = n1>0 ? 90 : 22, y2 = n1>0 ? 116 : 48;
  s+='<text x="'+ox+'" y="'+yl+'" font-size="17" '+HFONT+' fill="currentColor">Hàng dưới</text>'; for(i=0;i<n2;i++) s+=veVat(loai, ox+i*D+D/2, y2, 2);
  return khungHinh(s);
}
function demHang(s, h){ var m=String(s).match(new RegExp('data-dem="vat" data-h="'+h+'"', 'g')); return m ? m.length : 0; }

/* ---- Hình mới 2 (D3): lưới bóng r hàng × c cột, mỗi quả data-dem="bong" ---- */
function luoiBong(r, c){
  var D=30, ox=12, oy=12, W=ox*2+c*D, H=oy*2+r*D, s=svgX(W,H), i, j;
  for(i=0;i<r;i++) for(j=0;j<c;j++) s+='<circle data-dem="bong" data-r="'+i+'" data-c="'+j+'" cx="'+(ox+j*D+D/2)+'" cy="'+(oy+i*D+D/2)+'" r="11" fill="'+pick([HM.troi])+'" stroke="currentColor" stroke-width="1.5"/>';
  return khungHinh(s);
}
function docLuoi(s){ var rs=new Set(), cs=new Set(), re=/data-dem="bong" data-r="(\d+)" data-c="(\d+)"/g, m, n=0; while((m=re.exec(String(s)))){ n++; rs.add(+m[1]); cs.add(+m[2]); } return {n:n, r:rs.size, c:cs.size}; }

/* ---- Hình (D2): sơ đồ đoạn thẳng, chép từ bài 28, kieu 'gap' (đoạn 2 = k đoạn bằng đoạn 1). an = true: ẩn số trên các đoạn (hỏi CD) ---- */
function soDoHai(kieu, a, k, ten1, ten2, hoi, don, an){
  var seg2=[], i; for(i=0;i<k;i++) seg2.push({v:a,t:'goc',l:(an ? '' : a)});
  var tot2=a*k, mx=Math.max(a,tot2), ox=56, barW=240, u=barW/mx, y1=34, y2=98, hh=30;
  var W=ox+barW+30, H=y2+hh+(hoi==='r2' ? 50 : 20), s=svgX(W,H);
  function hang(r, y, ten, segs){
    var x=ox, o='<text x="'+(ox-10)+'" y="'+(y+21)+'" text-anchor="end" font-size="18" '+HFONT+' fill="currentColor">'+ten+'</text>';
    segs.forEach(function(g, gi){ var w=g.v*u; if(gi>0 && w<56) g.l='';
      o+='<rect data-v="'+g.v+'" data-r="'+r+'" data-t="'+g.t+'" x="'+x.toFixed(1)+'" y="'+y+'" width="'+w.toFixed(1)+'" height="'+hh+'" rx="3" fill="'+(r===1 ? HM.vang : HM.troi)+'" fill-opacity="0.6" stroke="currentColor" stroke-width="2.5"/>';
      if(g.l!=='') o+='<text x="'+(x+w/2).toFixed(1)+'" y="'+(y-7)+'" text-anchor="middle" font-size="17" '+HFONT+' fill="currentColor">'+g.l+' '+don+'</text>';
      x+=w; });
    return o;
  }
  s+=hang(1, y1, ten1, [{v:a,t:'goc',l:(an ? '?' : a)}]);
  s+=hang(2, y2, ten2, seg2);
  if(hoi==='r2'){ var xa=ox, xb=ox+tot2*u, yb=y2+hh+14;
    s+='<path d="M'+xa+' '+(yb-6)+' L'+xa+' '+yb+' L'+xb.toFixed(1)+' '+yb+' L'+xb.toFixed(1)+' '+(yb-6)+'" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>';
    s+='<text x="'+((xa+xb)/2).toFixed(1)+'" y="'+(yb+30)+'" text-anchor="middle" font-size="20" '+HFONT+' fill="currentColor">'+tot2+' '+don+'</text>'; }
  return khungHinh(s);
}
function docDoan(s){ var o=[], re=/<rect data-v="(\d+)" data-r="(\d)" data-t="(\w+)"/g, m; while((m=re.exec(String(s)))) o.push({v:+m[1], r:+m[2], t:m[3]}); return o; }

var BAI = {
 n: 39,
 title: 'So Sánh Số Lớn Gấp Mấy Lần Số Bé',
 sub: 'Luyện thông minh: câu hỏi tự đổi theo bé — làm hết lượt để xem ngọn lửa!',
 goal: 10, soCau: 18, soCauToiDa: 24,
 loi: {'chia-nguoc':'Lấy số bé chia số lớn', 'nham-hon-gap':'Nhầm "hơn bao nhiêu" với "gấp mấy lần"', 'dem-sai':'Đếm sai số vật', 'nham-hang':'Nhẩm sai hàng với số tròn chục, tròn trăm'},
 muctieu: [
  {id:'MT1', ten:'Gấp mấy lần qua hình', muc:['Hai hàng ô tô 6 và 2: gấp mấy lần (đếm được); đoạn AB và CD trên sơ đồ.', 'Số khác trên hai hàng, sơ đồ đoạn thẳng; lưới bóng: một hàng gấp một cột mấy lần.', 'Biết số lần, tìm số lớn hoặc số bé; lưới bóng khác.']},
  {id:'MT2', ten:'Tính số lần', muc:['Bảng 6 và 2, 10 và 5 (bảng chia nhỏ).', '20 và 4, 24 và 6, 30 và 3.', 'Số lớn đến 90; số tròn chục, tròn trăm (90 và 30, 600 và 200).']},
  {id:'MT3', ten:'Phân biệt hơn và gấp', muc:['8 và 2: hơn bao nhiêu đơn vị (hỏi một ý).', 'Thuyền 24 và 6: nhiều hơn bao nhiêu; gấp mấy lần.', 'Chọn cặp (hơn 18, gấp 4) đúng; hỏi ngẫu nhiên hơn hay gấp.']},
  {id:'MT4', ten:'Vận dụng và tìm lỗi', muc:['Bút chì 10 cm gấp bút sáp 5 cm mấy lần.', 'Bút chì gấp cái ghim; chọn phép tính đúng.', 'Bạn An nói "gấp" khi phải "hơn": em thấy thế nào; sửa lại.']}
 ],
 topics: [
  /* D1 — Hai hàng ô tô (Khám phá a) */
  {name:'Hai hàng ô tô', sec:'Khám phá a — Hàng dưới 2 ô tô, hàng trên 6 ô tô: 6 : 2 = 3, hàng trên gấp 3 lần hàng dưới', mt:['MT1'], levels:3,
   muc:['Hàng trên 6, hàng dưới 2 (hoặc số nhỏ tương tự): gấp mấy lần.', 'Hàng dưới 2–4, hàng trên gấp 2–4 lần (đếm rồi chia).', 'Biết hàng dưới và số lần: hàng trên có mấy (chỉ vẽ hàng dưới).'],
   make:function(lv){
    var loai=pick(['oto','hoa','cam']), ten=loai==='oto' ? 'ô tô' : (loai==='hoa' ? 'bông hoa' : 'quả cam'), n2, k, n1;
    if(lv<=1){ n2=pick([2,3]); k=pick([2,3]); } else { n2=rnd(2,4); k=rnd(2,4); while(n2*k>12) k--; } n1=n2*k;
    if(lv<=2) return {type:'num', _lv:lv, _n1:n1, _n2:n2, q:haiHang(n1, n2, loai)+'<div>Hàng trên có bao nhiêu '+ten+', hàng dưới có bao nhiêu '+ten+'? Số '+ten+' ở hàng trên gấp mấy lần số '+ten+' ở hàng dưới?</div>', ans:k, unit:'lần', sai:nhanSai([[n1-n2,'nham-hon-gap'],[n1,'dao-vai'],[k+1,'dem-sai'],[k-1,'dem-sai']], k), goiY:gy({'dao-vai':'Bé đếm hàng trên được '+n1+', hàng dưới được '+n2+', rồi lấy '+n1+' : '+n2+'.'})};
    return {type:'num', _lv:3, _n1:n1, _n2:n2, _k:k, q:haiHang(0, n2, loai)+'<div>Hàng dưới có <b>'+n2+' '+ten+'</b>. Hàng trên có số '+ten+' gấp <b>'+k+' lần</b> hàng dưới. Hàng trên có bao nhiêu '+ten+'?</div>', ans:n1, unit:ten, sai:nhanSai([[n2+k,'cong-thay-nhan'],[k,'dao-vai'],[n1+n2,'nham-bang'],[n1-n2,'nham-bang']], n1), goiY:gy()};
  }, check:function(q){ var h1=demHang(q.q,1), h2=demHang(q.q,2); if(h2!==q._n2 || q._n1%q._n2!==0) return false; if(q._lv<=2) return h1===q._n1 && q.ans===q._n1/q._n2 && q.ans>=2; return h1===0 && q.ans===q._n1 && q._n1===q._n2*q._k; }},

  /* D2 — Sơ đồ đoạn thẳng (Khám phá b) */
  {name:'Sơ đồ đoạn thẳng', sec:'Khám phá b — Đoạn AB dài 8 cm, đoạn CD dài 2 cm: AB gấp CD 8 : 2 = 4 (lần)', mt:['MT1'], levels:3,
   muc:['AB 8 cm, CD 2 cm: AB gấp CD mấy lần.', 'Số khác: CD 2–5 cm, AB gấp 2–6 lần.', 'Biết AB và số lần, tìm CD.'],
   make:function(lv){
    var a, k; if(lv<=1){ a=2; k=pick([3,4,5]); } else { a=rnd(2,5); k=rnd(2,6); while(a*k>30) k--; }
    if(lv<=2) return {type:'num', _lv:lv, _a:a, _k:k, q:soDoHai('gap', a, k, 'CD', 'AB', '', 'cm')+'<div>Đoạn thẳng CD dài <b>'+a+' cm</b>, đoạn thẳng AB dài <b>'+(a*k)+' cm</b>. Độ dài đoạn thẳng AB gấp mấy lần độ dài đoạn thẳng CD?</div>', ans:k, unit:'lần', sai:nhanSai([[a*k-a,'nham-hon-gap'],[a*k,'dao-vai'],[k+1,'nham-bang'],[k-1,'nham-bang']], k), goiY:gy()};
    return {type:'num', _lv:3, _a:a, _k:k, q:soDoHai('gap', a, k, 'CD', 'AB', 'r2', 'cm', true)+'<div>Đoạn thẳng AB dài <b>'+(a*k)+' cm</b> và gấp <b>'+k+' lần</b> đoạn thẳng CD. Đoạn thẳng CD dài bao nhiêu xăng-ti-mét?</div>', ans:a, unit:'cm', sai:nhanSai([[a*k-k,'nham-hon-gap'],[a*k*k>999 ? 0 : a*k*k,'chon-sai-phep'],[k,'dao-vai'],[a+1,'nham-bang']], a), goiY:gy({'chon-sai-phep':'AB gấp '+k+' lần CD, nên CD = AB : '+k+'.'})};
  }, check:function(q){ var d=docDoan(q.q), r1=d.filter(function(g){ return g.r===1; }), r2=d.filter(function(g){ return g.r===2; }); if(r1.length!==1 || r1[0].v!==q._a || r2.length!==q._k || !r2.every(function(g){ return g.v===q._a; })) return false; return q.ans===(q._lv===3 ? q._a : q._k) && q._k>=2; }},

  /* D3 — Lưới bóng (Luyện tập 2) */
  {name:'Lưới bóng', sec:'Luyện tập 2 — 32 quả bóng xếp 4 hàng 8 cột: số bóng một hàng gấp số bóng một cột 8 : 4 = 2 lần', mt:['MT1'], levels:3,
   muc:['4 hàng 8 cột: mỗi hàng mấy quả, mỗi cột mấy quả.', 'Số bóng một hàng gấp số bóng một cột mấy lần.', 'Lưới khác (3 × 9, 2 × 8, 5 × 10, 2 × 6).'],
   make:function(lv){
    var rc = lv<=2 ? [4,8] : pick([[3,9],[2,8],[5,10],[2,6],[3,6],[4,8]]), r=rc[0], c=rc[1];
    if(lv<=1){ var hoiHang=Math.random()<0.5; return {type:'num', _lv:1, _r:r, _c:c, _hoi:(hoiHang?'c':'r'), q:luoiBong(r,c)+'<div>Các quả bóng xếp thành hàng và cột. Mỗi '+(hoiHang ? 'hàng' : 'cột')+' có bao nhiêu quả bóng?</div>', ans:(hoiHang ? c : r), unit:'quả', sai:nhanSai([[hoiHang ? r : c,'dao-vai'],[r*c,'dao-vai'],[(hoiHang ? c : r)+1,'dem-sai']], hoiHang ? c : r), goiY:gy({'dao-vai':'Hàng nằm ngang, cột đứng dọc. Bé đếm số quả trên một hàng, rồi trên một cột.'})}; }
    return {type:'num', _lv:lv, _r:r, _c:c, _hoi:'k', q:luoiBong(r,c)+'<div>Các quả bóng xếp thành hàng và cột. Số quả bóng ở một hàng gấp mấy lần số quả bóng ở một cột?</div>', ans:c/r, unit:'lần', sai:nhanSai([[c-r,'nham-hon-gap'],[c,'dao-vai'],[r,'dao-vai'],[c/r+1,'dem-sai']], c/r), goiY:gy({'dao-vai':'Một hàng có '+c+' quả, một cột có '+r+' quả: lấy '+c+' : '+r+'.'})};
  }, check:function(q){ var d=docLuoi(q.q); if(d.r!==q._r || d.c!==q._c || d.n!==q._r*q._c || q._c%q._r!==0) return false; return q.ans===(q._hoi==='c' ? q._c : (q._hoi==='r' ? q._r : q._c/q._r)) && (q._hoi==='k' ? q.ans>=2 : true); }},

  /* D4 — Bảng số lớn – số bé (Hoạt động 1) */
  {name:'Bảng số lớn – số bé', sec:'Hoạt động 1 — Số lớn 6, số bé 2: gấp 3 lần; 10 và 5: 2 lần; 20 và 4: 5 lần', mt:['MT2'], levels:3,
   muc:['6 và 2, 10 và 5, 8 và 2.', '20 và 4, 24 và 6, 15 và 5.', '30 và 3, 90 và 9, 80 và 4.'],
   make:function(lv){
    var p = lv<=1 ? pick([[6,2],[10,5],[8,2],[9,3],[12,3]]) : (lv===2 ? pick([[20,4],[24,6],[12,4],[15,5],[18,3],[28,7]]) : pick([[30,3],[90,9],[80,4],[40,5],[70,7],[60,6]])), a=p[0], b=p[1], k=a/b;
    return {type:'num', _lv:lv, _a:a, _b:b, q:tri('Số lớn','Số bé','Số lớn gấp mấy lần số bé', a, b, k, 2)+'<div>Số ở ô <b class="text-amber-700">?</b> là bao nhiêu?</div>', ans:k, unit:'lần', sai:nhanSai([[a-b,'nham-hon-gap'],[k+1,'nham-bang'],[k-1,'nham-bang'],[a,'dao-vai']], k), goiY:gy()};
  }, check:function(q){ var t=docTri(q.q); return t.length===3 && t[0]===String(q._a) && t[1]===String(q._b) && t[2]==='?' && q._a%q._b===0 && q.ans===q._a/q._b && q.ans>=2; }},

  /* D5 — Tính số lần (Luyện tập 1) */
  {name:'Tính số lần', sec:'Luyện tập 1 — Số lớn gấp mấy lần số bé: 8 và 2 gấp 4; 24 và 6 gấp 4; 30 và 3 gấp 10', mt:['MT2'], levels:3,
   muc:['Số lớn đến 20.', 'Số lớn đến 50.', 'Số tròn chục, tròn trăm (90 và 30; 600 và 200).'],
   make:function(lv){
    var b, k, a;
    if(lv<=1){ b=rnd(2,5); k=rnd(2,Math.floor(20/b)); } else if(lv===2){ b=rnd(2,9); k=rnd(2,Math.min(10,Math.floor(50/b))); } else { b=pick([10,20,30,100,200,300]); k=rnd(2,Math.min(9,Math.floor(999/b))); }
    a=b*k;
    return {type:'num', _lv:lv, _a:a, _b:b, q:'<div>Số lớn là <b>'+a+'</b>, số bé là <b>'+b+'</b>. Số lớn gấp mấy lần số bé?</div>', ans:k, unit:'lần', sai:nhanSai([[a-b,'nham-hon-gap'],[k*10,'nham-hang'],[k+1,'nham-bang'],[k-1,'nham-bang']], k), goiY:gy()};
  }, check:function(q){ if(q._a%q._b!==0) return false; var k=q._a/q._b; return q.ans===k && k>=2 && k<=10 && (q._lv<=1 ? q._a<=20 : (q._lv===2 ? q._a<=50 : q._b%10===0)); }},

  /* D6 — Hơn hay gấp (Luyện tập 1) */
  {name:'Hơn hay gấp', sec:'Luyện tập 1 — 8 và 2: số lớn hơn số bé 6 đơn vị, gấp 4 lần; 12 và 4: hơn 8, gấp 3', mt:['MT3'], levels:3,
   muc:['Số lớn hơn số bé bao nhiêu đơn vị.', 'Số lớn gấp mấy lần số bé.', 'Chọn cặp (hơn … đơn vị, gấp … lần) đúng trong bốn cặp.'],
   make:function(lv){
    var p=pick([[8,2],[12,4],[15,5],[24,6],[30,3],[18,2],[20,4],[27,3],[16,4],[40,5]]), a=p[0], b=p[1], hon=a-b, gap=a/b;
    if(lv<=1) return {type:'num', _lv:1, _a:a, _b:b, _hoi:'hon', q:'<div>Số lớn là <b>'+a+'</b>, số bé là <b>'+b+'</b>. Số lớn hơn số bé bao nhiêu đơn vị?</div>', ans:hon, unit:'đơn vị', sai:nhanSai([[gap,'nham-hon-gap'],[a+b,'chon-sai-phep'],[hon+1,'nham-bang']], hon), goiY:gy()};
    if(lv===2) return {type:'num', _lv:2, _a:a, _b:b, _hoi:'gap', q:'<div>Số lớn là <b>'+a+'</b>, số bé là <b>'+b+'</b>. Số lớn gấp mấy lần số bé?</div>', ans:gap, unit:'lần', sai:nhanSai([[hon,'nham-hon-gap'],[gap+1,'nham-bang'],[a*b>999 ? 0 : a*b,'chon-sai-phep']], gap), goiY:gy()};
    var dung='Hơn '+hon+' đơn vị, gấp '+gap+' lần', ch=[dung, 'Hơn '+gap+' đơn vị, gấp '+hon+' lần', 'Hơn '+(a+b)+' đơn vị, gấp '+gap+' lần', 'Hơn '+hon+' đơn vị, gấp '+hon+' lần']; ch=ch.filter(function(c,i){ return ch.indexOf(c)===i; }); ch=shuffle(ch); var sai={}; ch.forEach(function(c,i){ if(c!==dung) sai[String(i)]='nham-hon-gap'; });
    return {type:'mcq', cot:1, _lv:3, _a:a, _b:b, _hoi:'cap', _dung:dung, q:'<div>Số lớn là <b>'+a+'</b>, số bé là <b>'+b+'</b>. Số lớn hơn số bé bao nhiêu đơn vị và gấp mấy lần số bé?</div>', choices:ch, correct:ch.indexOf(dung), sai:sai, goiY:gy()};
  }, check:function(q){ var a=q._a, b=q._b; if(a%b!==0) return false; if(q._hoi==='hon') return q.ans===a-b; if(q._hoi==='gap') return q.ans===a/b; var m=/^Hơn (\d+) đơn vị, gấp (\d+) lần$/.exec(q._dung); return !!m && +m[1]===a-b && +m[2]===a/b && kiemMCQ(q) && q.choices.length>=3; }},

  /* D7 — Thuyền chở khách (Luyện tập 3) */
  {name:'Thuyền chở khách', sec:'Luyện tập 3 — Thuyền lớn chở 24 khách, thuyền nhỏ chở 6 khách: nhiều hơn 18 khách; gấp 4 lần', mt:['MT3'], levels:3,
   muc:['Thuyền lớn chở nhiều hơn thuyền nhỏ bao nhiêu khách.', 'Thuyền lớn chở gấp mấy lần thuyền nhỏ.', 'Hỏi ngẫu nhiên hơn hay gấp; số khác.'],
   make:function(lv){
    var vat=pick([['thuyền lớn','thuyền nhỏ','khách','chở'],['xe to','xe nhỏ','người','chở'],['rổ to','rổ nhỏ','quả cam','đựng'],['lớp 3A','tổ Một','bạn','có']]), b, k, a;
    if(lv<=2){ a=24; b=6; } else { b=rnd(2,9); k=rnd(2,9); a=b*k; while(a>60){ k--; a=b*k; } }
    var hoiHon = lv<=1 ? true : (lv===2 ? false : Math.random()<0.5), ans = hoiHon ? a-b : a/b;
    return {type:'num', _lv:lv, _a:a, _b:b, _hoi:(hoiHon?'hon':'gap'), q:'<div>'+vat[0].charAt(0).toUpperCase()+vat[0].slice(1)+' '+vat[3]+' <b>'+a+' '+vat[2]+'</b>, '+vat[1]+' '+vat[3]+' <b>'+b+' '+vat[2]+'</b>. '+(hoiHon ? vat[0].charAt(0).toUpperCase()+vat[0].slice(1)+' '+vat[3]+' nhiều hơn '+vat[1]+' bao nhiêu '+vat[2]+'?' : 'Số '+vat[2]+' '+vat[0]+' '+vat[3]+' gấp mấy lần số '+vat[2]+' '+vat[1]+' '+vat[3]+'?')+'</div>', ans:ans, unit:(hoiHon ? vat[2] : 'lần'), sai:nhanSai(hoiHon ? [[a/b,'nham-hon-gap'],[a+b,'chon-sai-phep'],[ans+1,'nham-bang']] : [[a-b,'nham-hon-gap'],[ans+1,'nham-bang'],[ans-1,'nham-bang']], ans), goiY:gy()};
  }, check:function(q){ var a=q._a, b=q._b; if(a%b!==0 || a/b<2) return false; return q.ans===(q._hoi==='hon' ? a-b : a/b) && (q._lv<=1 ? q._hoi==='hon' : (q._lv===2 ? q._hoi==='gap' : true)); }},

  /* D8 — Bút chì, bút sáp, cái ghim (Hoạt động 2) */
  {name:'Bút chì, bút sáp, cái ghim', sec:'Hoạt động 2 — Bút chì 10 cm, bút sáp 5 cm, cái ghim 2 cm: bút chì gấp bút sáp 2 lần, gấp cái ghim 5 lần', mt:['MT4'], levels:3,
   muc:['Bút chì dài gấp mấy lần bút sáp.', 'Bút chì gấp cái ghim; bút sáp gấp cái ghim (bộ số chia hết).', 'Chọn phép tính đúng (10 : 2, 10 − 2, 10 × 2, 2 : 10).'],
   make:function(lv){
    var bo=pick([[10,5,2],[12,6,3],[8,4,2],[18,6,3],[16,8,2],[20,10,5]]), ten=['bút chì','bút sáp','cái ghim'], i, j;
    if(lv<=1){ i=0; j=1; } else if(lv===2){ var c=pick([[0,2],[1,2],[0,1]].filter(function(x){ return bo[x[0]]%bo[x[1]]===0; })); i=c[0]; j=c[1]; } else { i=0; j=pick([1,2]); }
    var a=bo[i], b=bo[j], k=a/b, lead='<div>Bút chì dài <b>'+bo[0]+' cm</b>, bút sáp dài <b>'+bo[1]+' cm</b>, cái ghim dài <b>'+bo[2]+' cm</b>.</div>';
    if(lv<=2) return {type:'num', _lv:lv, _bo:bo, _i:i, _j:j, q:lead+'<div>'+ten[i].charAt(0).toUpperCase()+ten[i].slice(1)+' dài gấp mấy lần '+ten[j]+'?</div>', ans:k, unit:'lần', sai:nhanSai([[a-b,'nham-hon-gap'],[k+1,'nham-bang'],[k-1,'nham-bang'],[a,'dao-vai']], k), goiY:gy()};
    var dung=a+' : '+b, ch=shuffle([dung, a+' − '+b, a+' × '+b, b+' : '+a]), sai={}; ch.forEach(function(c,n){ if(c!==dung) sai[String(n)]=(c===b+' : '+a ? 'chia-nguoc' : (c===a+' − '+b ? 'nham-hon-gap' : 'chon-sai-phep')); });
    return {type:'mcq', cot:2, _lv:3, _bo:bo, _i:i, _j:j, _dung:dung, q:lead+'<div>Phép tính nào cho biết '+ten[i]+' dài gấp mấy lần '+ten[j]+'?</div>', choices:ch, correct:ch.indexOf(dung), sai:sai, goiY:gy()};
  }, check:function(q){ var a=q._bo[q._i], b=q._bo[q._j]; if(a%b!==0 || a/b<2 || q._bo[0]%q._bo[1]!==0 || q._bo[0]%q._bo[2]!==0) return false; if(q._lv<=2) return q.ans===a/b; return kiemMCQ(q) && q.choices.length===4 && q._dung===a+' : '+b; }},

  /* D9 — Bạn An nói (không có trong SGK) */
  {name:'Bạn An nói', sec:'Tìm lỗi — Bạn An nói "24 gấp 6 là 4 lần" hoặc nhầm "hơn 18" với "gấp 4": em thấy thế nào', mt:['MT4'], levels:3,
   muc:['An nói số lớn gấp mấy lần số bé: em thấy thế nào.', 'An sai ở đâu: lấy số bé chia số lớn hay lấy hiệu.', 'An trả lời "hơn 18" khi hỏi gấp mấy lần: số đúng là bao nhiêu.'],
   make:function(lv){
    var p=pick([[24,6],[18,3],[20,4],[30,5],[16,2],[27,3],[40,8],[36,4]]), a=p[0], b=p[1], k=a/b, hon=a-b;
    if(lv<=1){ var dung=Math.random()<0.5, x = dung ? k : hon, dungC, saiC;
      if(dung){ dungC='Đồng ý, vì '+a+' : '+b+' = '+k; saiC='Không đồng ý, vì '+a+' − '+b+' = '+hon; } else { dungC='Không đồng ý, vì '+a+' : '+b+' = '+k; saiC='Đồng ý, vì '+a+' − '+b+' = '+hon; }
      var ch=shuffle([dungC,saiC]), s1={}; s1[String(1-ch.indexOf(dungC))]='nham-hon-gap';
      return {type:'mcq', cot:1, _lv:1, _a:a, _b:b, _x:x, _dung:dungC, q:nguoi('boy','Bạn An')+'<div>Bạn An nói: «Số <b>'+a+'</b> gấp <b>'+x+' lần</b> số <b>'+b+'</b>.» Em thấy thế nào?</div>', choices:ch, correct:ch.indexOf(dungC), sai:s1, goiY:gy()}; }
    if(lv===2){ var kieu=pick(['chia-nguoc','nham-hon-gap']), noi = kieu==='chia-nguoc' ? b+' : '+a : a+' − '+b+' = '+hon, ch2=['An lấy số bé chia cho số lớn','An lấy số lớn trừ đi số bé','An lấy số lớn nhân với số bé'], dung2 = kieu==='chia-nguoc' ? ch2[0] : ch2[1], s2={}; ch2.forEach(function(c,i){ if(c!==dung2) s2[String(i)]=(kieu==='chia-nguoc' ? 'nham-hon-gap' : 'chia-nguoc'); });
      return {type:'mcq', cot:1, _lv:2, _a:a, _b:b, _kieu:kieu, _dung:dung2, q:nguoi('boy','Bạn An')+'<div>Hỏi: số <b>'+a+'</b> gấp mấy lần số <b>'+b+'</b>? Bạn An viết phép tính «<b>'+noi+'</b>». An làm sai rồi! An sai ở đâu?</div>', choices:ch2, correct:ch2.indexOf(dung2), sai:s2, goiY:gy()}; }
    return {type:'num', _lv:3, _a:a, _b:b, q:nguoi('boy','Bạn An')+'<div>Hỏi: số <b>'+a+'</b> gấp mấy lần số <b>'+b+'</b>? Bạn An trả lời: «<b>'+hon+' lần</b>». An nhầm rồi! Số đúng là bao nhiêu lần?</div>', ans:k, unit:'lần', sai:nhanSai([[hon,'nham-hon-gap'],[k+1,'nham-bang'],[k-1,'nham-bang']], k), goiY:gy()};
  }, check:function(q){ var a=q._a, b=q._b, k=a/b; if(a%b!==0 || k<2) return false;
    if(q._lv<=1) return q.choices.length===2 && q.choices.every(okEq) && kiemMCQ(q) && /^Đồng ý/.test(q._dung)===(q._x===k);
    if(q._lv===2) return kiemMCQ(q) && q.choices.length===3 && (q._kieu==='chia-nguoc' ? /số bé chia/.test(q._dung) : /trừ/.test(q._dung));
    return q.ans===k; }}
 ]
};
