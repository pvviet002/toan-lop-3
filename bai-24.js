/* bai-24.js — Bài 24: Gấp một số lên một số lần. BÀI MỚI, Engine v2 — LUYỆN THÔNG MINH.
   Theo bảng phân tích sư phạm đã duyệt (phan-tich-su-pham/bai-24.md) và chỉnh sửa của thầy trên PR #13:
   4 MỤC TIÊU (muctieu) × 10 DẠNG (topics), mỗi dạng 3 mức (Thông tư 27: Nhận biết · Hiểu · Vận dụng).
   Lỗi lớn nhất: nhầm "gấp n lần" (phép nhân) với "thêm n đơn vị" (phép cộng), nhầm số lần với số đơn vị.
   Mê cung của sách đổi thành "phép tính nào có kết quả bằng 45" (chọn một / đếm). Mọi kết quả < 100.
   Hình mới viết ngay trong file này (không sửa figures.js): soDoGap, banGhe, soDoGT, theTinh; dùng lại bangCot, anh, oHoi, tinhBT.
   Vật để đếm mang data-dem (phan, ghe, ban); check() đếm lại trong chuỗi SVG.
   QUY TẮC: nối chuỗi, KHÔNG backtick và KHÔNG template literal. */

/* ---- Tiện ích chung ---- */
function nhanSai(ds, dung){ var o={}; ds.forEach(function(p){ var v=p[0]; if(v>0 && v!==dung && !(String(v) in o)) o[String(v)]=p[1]; }); return o; }
function kiemMCQ(q){ return q.choices[q.correct]===q._dung && new Set(q.choices).size===q.choices.length; }
function dsBtn24(ch){ return '<span class="text-2xl font-extrabold text-slate-700">'+ch+'</span><span class="ml-2 text-base font-bold text-slate-600">'+(ch==='Đ'?'Đúng':'Sai')+'</span>'; }
function svgX(w, h, px){ return svgHinh(w, h, px).replace('<svg ', '<svg class="text-slate-700" '); }
function f1(v){ return v.toFixed(1); }
function demDem(s, loai){ var m=String(s).match(new RegExp('data-dem="'+loai+'"', 'g')); return m ? m.length : 0; }
function khungHinh(s){ return '<div class="flex justify-center my-2">'+s+'</svg></div>'; }
function nguoi(ten, alt){ return '<div class="flex justify-center mb-1">'+anh(ten, 72, alt)+'</div>'; }
var CAP_TEN=[['Việt','Mai'],['Nam','Lan'],['An','Bình'],['Hà','Minh']];
var VAT=[['táo','quả'],['kẹo','viên'],['bút','chiếc'],['bi','viên']];
/* Nhận xét "Em thấy thế nào?": mo(n) viết lý do có số n; x = số bạn nói, T = số đúng */
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
var GOI_GT={'nham-gap-them':'Gấp n lần là nhân với n. Thêm n đơn vị mới là cộng n.', 'nham-so-lan':'Số lần là số em nhân với số đã cho: số đã cho × ? = số kia.'};

/* ---- Hình mới 1 (D1): sơ đồ đoạn thẳng "Tóm tắt". Đoạn ngắn = 1 phần (nhãn số bên phải); đoạn dài = n phần bằng nhau (mỗi phần data-dem="phan");
   ngoặc dưới đoạn dài ghi hoi (ví dụ "? quả"), để trống thì không vẽ ngoặc. ---- */
function soDoGap(ten1, ten2, so, n, don, hoi){
  var u=Math.min(40, Math.floor(230/n)), x0=76, W=Math.max(300, x0+n*u+34), H=hoi ? 150 : 104, s=svgX(W,H), i, y1=12, y2=58;
  s+='<text x="'+(x0-10)+'" y="'+(y1+22)+'" text-anchor="end" font-size="19" '+HFONT+' fill="currentColor">'+ten1+'</text>';
  s+='<rect x="'+x0+'" y="'+y1+'" width="'+u+'" height="30" rx="4" fill="'+HM.vang+'" fill-opacity="0.65" stroke="currentColor" stroke-width="2.5"/>';
  s+='<text x="'+(x0+u+10)+'" y="'+(y1+22)+'" font-size="19" '+HFONT+' fill="currentColor">'+so+' '+don+'</text>';
  s+='<text x="'+(x0-10)+'" y="'+(y2+22)+'" text-anchor="end" font-size="19" '+HFONT+' fill="currentColor">'+ten2+'</text>';
  for(i=0;i<n;i++) s+='<rect data-dem="phan" x="'+(x0+i*u)+'" y="'+y2+'" width="'+u+'" height="30" rx="4" fill="'+HM.troi+'" fill-opacity="0.5" stroke="currentColor" stroke-width="2.5"/>';
  if(hoi){ var xa=x0, xb=x0+n*u, yb=y2+44;
    s+='<path d="M'+xa+' '+(yb-6)+' L'+xa+' '+yb+' L'+xb+' '+yb+' L'+xb+' '+(yb-6)+'" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>';
    s+='<text x="'+((xa+xb)/2)+'" y="'+(yb+30)+'" text-anchor="middle" font-size="20" '+HFONT+' fill="'+HM.hoi+'">'+hoi+'</text>'; }
  return khungHinh(s);
}

/* ---- Hình mới 2 (D9): nBan cái bàn xếp thành hàng, mỗi bàn có soGhe cái ghế (hình vuông nhỏ sát bàn, không chồng); bàn data-dem="ban", ghế data-dem="ghe" ---- */
function banGhe(nBan, soGhe){
  var moi=Math.ceil(nBan/Math.ceil(nBan/5)), hang=Math.ceil(nBan/moi), cw=64, ch=70, W=moi*cw, H=hang*ch, s=svgX(W,H), i;
  for(i=0;i<nBan;i++){
    var cx=(i%moi)*cw+cw/2, cy=Math.floor(i/moi)*ch+ch/2, g=[[cx-5,cy-9-3-10],[cx-5,cy+9+3],[cx-16-3-10,cy-5],[cx+16+3,cy-5]];
    s+='<rect data-dem="ban" x="'+(cx-16)+'" y="'+(cy-9)+'" width="32" height="18" rx="4" fill="'+HM.goNhat+'"/>';
    for(var k=0;k<soGhe;k++) s+='<rect data-dem="ghe" x="'+g[k][0]+'" y="'+g[k][1]+'" width="10" height="10" rx="2" fill="'+HM.go+'"/>';
  }
  return khungHinh(s);
}

/* ---- Hình mới 3 (D4, D5): số – cửa – kết quả. nut = [{v}] (v = null → ô "?"), cua = nhãn trên mũi tên ("gấp 4 lần", "thêm 5 đơn vị") ---- */
function soDoGT(nut, cua){
  var D=56, A=128, W=nut.length*D+(nut.length-1)*A+8, s=svgX(W,76), x=4, i;
  for(i=0;i<nut.length;i++){
    var hoi=(nut[i].v===null || nut[i].v===undefined);
    s+='<circle cx="'+(x+D/2)+'" cy="46" r="'+(D/2-1.5)+'" fill="'+(hoi ? '#fff' : HM.vang)+'"'+(hoi ? ' stroke="'+HM.vangDam+'" stroke-width="3"' : '')+'/>'+chuSo(x+D/2, 46, hoi ? '?' : nut[i].v, hoi ? 24 : (String(nut[i].v).length>2 ? 18 : 22));
    x+=D;
    if(i<cua.length){
      s+='<text x="'+(x+A/2)+'" y="30" text-anchor="middle" font-size="17" '+HFONT+' fill="currentColor">'+cua[i]+'</text>'
       +'<path d="M'+(x+8)+' 46 H'+(x+A-8)+' M'+(x+A-15)+' 40 L'+(x+A-8)+' 46 L'+(x+A-15)+' 52" stroke="currentColor" stroke-width="2.6" fill="none" stroke-linecap="round" stroke-linejoin="round" opacity=".6"/>';
      x+=A;
    }
  }
  return khungHinh(s);
}
function cuaChu(loai, k){ return loai==='gap' ? 'gấp '+k+' lần' : 'thêm '+k+' đơn vị'; }
function ap(loai, v, k){ return loai==='gap' ? v*k : v+k; }

/* ---- Hình mới 4 (D10): dãy thẻ phép tính ---- */
function theTinh(ds){
  var s='<div class="flex flex-wrap justify-center gap-2 my-2">';
  ds.forEach(function(t){ s+='<span class="inline-block px-3 py-2 rounded-xl border-2 border-amber-300 text-slate-700 font-extrabold text-xl whitespace-nowrap">'+t+'</span>'; });
  return s+'</div>';
}
function docThe(s){ var o=[], re=/<span class="inline-block px-3 py-2[^>]*>([^<]*)<\/span>/g, m; while((m=re.exec(String(s)))) o.push(m[1]); return o; }

var BAI = {
 n: 24,
 title: 'Gấp Một Số Lên Một Số Lần',
 sub: 'Luyện thông minh: câu hỏi tự đổi theo bé — làm hết lượt để xem ngọn lửa!',
 goal: 10, soCau: 18, soCauToiDa: 24,
 loi: {'nham-gap-them':'Nhầm "gấp n lần" với "thêm n đơn vị"', 'nham-so-lan':'Nhầm số lần với số đơn vị', 'dem-sot-phep':'Đếm sót hoặc thừa phép tính'},
 muctieu: [
  {id:'MT1', ten:'Gấp một số lên một số lần', muc:['Sơ đồ đoạn thẳng: đoạn dài gồm mấy phần bằng nhau; 4 gấp 3 lần.', 'Tính gấp lên n lần bằng phép nhân (6 × 4); chọn phép tính đúng.', 'Số lớn hơn (9 gấp 5 lần); Mai nhiều hơn Việt bao nhiêu quả.']},
  {id:'MT2', ten:'Gấp hay thêm đơn vị', muc:['Bảng "thêm n đơn vị" và "gấp n lần" (số nhỏ); một số qua một cửa.', 'Đường ống: chọn cửa đúng; hai mũi tên Số? (gấp 4 lần, thêm 4 đơn vị).', 'Biết kết quả, tìm số đầu; so sánh hai kết quả.']},
  {id:'MT3', ten:'Gấp mấy lần, thêm mấy đơn vị', muc:['Đúng / Sai: 7 → 63 gấp 9 lần.', 'Từ hai số, nói đúng "thêm … đơn vị" hay "gấp … lần".', 'Bạn nói đúng hay sai ("Em thấy thế nào?").']},
  {id:'MT4', ten:'Giải toán và vận dụng', muc:['Tuổi bố gấp 4 lần tuổi con; 9 bàn, mỗi bàn 2 ghế.', 'Chọn phép nhân hay phép cộng cho tình huống; phép tính nào có kết quả bằng 45.', 'Bài toán hai bước; đếm các phép tính có kết quả bằng 45.']}
 ],
 topics: [
  /* D1 — Sơ đồ đoạn thẳng (Khám phá) */
  {name:'Sơ đồ đoạn thẳng', sec:'Khám phá — Số táo của Mai gấp 4 lần số táo của Việt: sơ đồ đoạn thẳng', mt:['MT1'], levels:3,
   muc:['Đoạn của bạn kia gồm mấy phần bằng đoạn của bạn đầu (đếm).', 'Tìm số quả của bạn kia: số quả × số lần.', 'Bạn kia nhiều hơn bạn đầu bao nhiêu quả (hai bước).'],
   make:function(lv){
    var tn=pick(CAP_TEN), vt=pick(VAT), so, n, ans, hoi='', cau, sai;
    if(lv<=1){ so=rnd(3,6); n=rnd(2,3); ans=n; cau='Đoạn của '+tn[1]+' gồm mấy phần bằng đoạn của '+tn[0]+'?';
      sai=[[n+1,'dem-sot-phep'],[n-1,'dem-sot-phep'],[so,'nham-so-lan']]; }
    else if(lv===2){ so=rnd(3,9); n=rnd(2,5); ans=so*n; hoi='? '+vt[1]; cau='Hỏi '+tn[1]+' có bao nhiêu '+vt[1]+' '+vt[0]+'?';
      sai=[[so+n,'nham-gap-them'],[so*(n-1),'dem-sot-phep'],[so*(n+1),'dem-sot-phep'],[n,'nham-so-lan']]; }
    else { so=rnd(5,9); n=rnd(3,6); ans=so*(n-1); cau='Hỏi '+tn[1]+' có nhiều hơn '+tn[0]+' bao nhiêu '+vt[1]+' '+vt[0]+'?';
      sai=[[so*n,'thieu-buoc'],[so,'thieu-buoc'],[so+n,'nham-gap-them'],[n-1,'nham-so-lan']]; }
    return {type:'num', _lv:lv, _so:so, _n:n, q:soDoGap(tn[0], tn[1], so, n, vt[1]+' '+vt[0], hoi)+'<div>Số '+vt[0]+' của '+tn[1]+' gấp <b>'+n+' lần</b> số '+vt[0]+' của '+tn[0]+'. '+tn[0]+' có <b>'+so+' '+vt[1]+'</b>.</div><div class="mt-1">'+cau+'</div>',
      ans:ans, unit: lv<=1 ? 'phần' : vt[1], sai:nhanSai(sai, ans),
      goiY:{'dem-sot-phep':'Bé đếm lại các phần bằng nhau của đoạn dài nhé!', 'nham-so-lan':'Số lần chính là số phần của đoạn dài.', 'nham-gap-them':'Gấp '+n+' lần là '+n+' phần bằng nhau, nhân với '+n+'. Không phải cộng '+n+'.', 'thieu-buoc':'Bé tìm số '+vt[1]+' của '+tn[1]+' trước ('+so+' × '+n+'), rồi so với '+tn[0]+'.'}};
  }, check:function(q){
    var dem=demDem(q.q,'phan'), so=q._so, n=q._n;
    if(dem!==n || n<2) return false;
    var e = q._lv<=1 ? n : (q._lv===2 ? so*n : so*(n-1));
    return q.ans===e && so*n<100; }},

  /* D2 — Gấp một số lên n lần (quy tắc) */
  {name:'Gấp một số lên n lần', sec:'Khám phá — Muốn gấp một số lên một số lần, ta lấy số đó nhân với số lần', mt:['MT1'], levels:3,
   muc:['Gấp số nhỏ lên 2 hoặc 3 lần.', 'Chọn phép tính đúng để gấp một số lên n lần.', 'Gấp số lớn hơn lên nhiều lần (9 gấp 5 lần).'],
   make:function(lv){
    var so, n, ans;
    if(lv<=1){ so=rnd(2,5); n=rnd(2,3); ans=so*n;
      return {type:'num', _lv:1, _so:so, _n:n, q:'<div class="text-slate-500 mb-1">Tính nhẩm</div><div class="text-3xl font-extrabold text-orange-600">Gấp '+so+' lên '+n+' lần được'+oHoi()+'</div>', ans:ans,
        sai:nhanSai([[so+n,'nham-gap-them'],[so*(n+1),'dem-sot-phep'],[n,'nham-so-lan']], ans), goiY:{'nham-gap-them':GOI_GT['nham-gap-them'], 'dem-sot-phep':'Bé nhân '+so+' với '+n+'.', 'nham-so-lan':GOI_GT['nham-so-lan']}}; }
    if(lv===2){ so=rnd(3,9); n=rnd(3,5); var dung=so+' × '+n, ds=[[dung,''],[so+' + '+n,'nham-gap-them'],[so+' × '+(n-1),'lech-nhom'],[so+' × '+(n+1),'lech-nhom']];
      shuffle(ds); var ch=ds.map(function(d){ return d[0]; }), sai={}; ds.forEach(function(d,i){ if(d[1]) sai[String(i)]=d[1]; });
      return {type:'mcq', cot:1, _lv:2, _so:so, _n:n, _dung:dung, q:'<div class="text-xl font-extrabold text-orange-600 my-1">Gấp '+so+' lên '+n+' lần</div><div>Phép tính nào đúng?</div>', choices:ch, correct:ch.indexOf(dung), sai:sai,
        goiY:{'nham-gap-them':GOI_GT['nham-gap-them'], 'lech-nhom':'Gấp '+n+' lần là nhân với '+n+'. Bé xem lại số lần nhé!'}}; }
    so=rnd(6,9); n=rnd(4,9); while(so*n>=100) n=rnd(4,9); ans=so*n;
    return {type:'num', _lv:3, _so:so, _n:n, q:'<div class="text-slate-500 mb-1">Tính nhẩm</div><div class="text-3xl font-extrabold text-orange-600">Gấp '+so+' lên '+n+' lần được'+oHoi()+'</div>', ans:ans,
      sai:nhanSai([[so+n,'nham-gap-them'],[so*(n-1),'dem-sot-phep'],[so*(n+1),'dem-sot-phep'],[n,'nham-so-lan']], ans), goiY:{'nham-gap-them':GOI_GT['nham-gap-them'], 'dem-sot-phep':'Bé nhẩm lại bảng nhân '+so+' nhé!', 'nham-so-lan':GOI_GT['nham-so-lan']}};
  }, check:function(q){
    if(q._lv===2) return kiemMCQ(q) && q.choices.filter(function(c){ return tinhBT(c)===q._so*q._n; }).length===1 && tinhBT(q._dung)===q._so*q._n;
    return q.ans===q._so*q._n && q.ans<100; }},

  /* D3 — Bảng thêm hay gấp (Hoạt động 1) */
  {name:'Bảng thêm hay gấp', sec:'Hoạt động 1 — Thêm vào số đã cho k đơn vị hay gấp k lần số đã cho', mt:['MT2'], levels:3,
   muc:['Bảng thêm 2, 3 đơn vị và gấp 2, 3 lần (số nhỏ).', 'Bảng thêm 8 đơn vị và gấp 8 lần (4, 7, 11, 8); ô ? ở hàng nào cũng được.', 'Ô ? ở hàng "số đã cho": tìm số đầu.']
   ,
   make:function(lv){
    var k, pool, i, vs=[], row, c, so, ans, sai, nh;
    if(lv<=1){ k=rnd(2,3); pool=[2,3,4,5,6,7]; } else { k=lv===2 ? 8 : pick([5,6,7,8,9]); pool=lv===2 ? [4,7,11,8,9,3,5,6,10,12] : [3,4,5,6,7,8,9,10,11]; }
    pool=shuffle(pool.slice());
    for(i=0;i<pool.length && vs.length<3;i++) if(vs.indexOf(pool[i])<0 && pool[i]*k<100) vs.push(pool[i]);
    c=rnd(0,2); row = lv<=1 ? rnd(1,2) : (lv===2 ? rnd(1,2) : 0); so=vs[c];
    var cot=vs.map(function(v){ return [v, v+k, v*k]; });
    ans=cot[c][row];
    if(row===0) sai=[[so+k,'nham-gap-them'],[so*k,'nham-gap-them'],[so+1,'canh-dong'],[so-1,'canh-dong']];
    else if(row===1) sai=[[so*k,'nham-gap-them'],[ans+1,'canh-dong'],[ans-1,'canh-dong'],[k,'nham-so-lan']];
    else sai=[[so+k,'nham-gap-them'],[ans+so,'dem-sot-phep'],[ans-so,'dem-sot-phep'],[k,'nham-so-lan']];
    return {type:'num', _lv:lv, _k:k, _cot:cot, _c:c, _r:row, q:bangCot(['Số đã cho','Thêm '+k+' đơn vị','Gấp '+k+' lần'], cot, {c:c, r:row})+'<div class="mt-1">Số ở ô <b class="text-amber-700">?</b> là bao nhiêu?</div>', ans:ans, sai:nhanSai(sai, ans),
      goiY:{'nham-gap-them':'Hàng "thêm '+k+' đơn vị" là cộng '+k+'. Hàng "gấp '+k+' lần" là nhân với '+k+'. Bé xem đúng hàng nhé!', 'canh-dong':'Bé tính lại kết quả của đúng cột này.', 'nham-so-lan':'Ô ? là kết quả, không phải số k.', 'dem-sot-phep':'Bé tính từ số đã cho của cột này.'}};
  }, check:function(q){
    var k=q._k, cot=q._cot, ok = cot.length===3 && cot.every(function(x){ return x[1]===x[0]+k && x[2]===x[0]*k && x[2]<100; }) && new Set(cot.map(function(x){ return x[0]; })).size===3;
    return ok && q.ans===cot[q._c][q._r] && (q._lv<=2 ? q._r>=1 : q._r===0); }},

  /* D4 — Đường ống (Hoạt động 2) */
  {name:'Đường ống', sec:'Hoạt động 2 — Số đi qua cửa "thêm … đơn vị" hoặc "gấp … lần" tới ô kết quả', mt:['MT2'], levels:3,
   muc:['Một số đi qua một cửa: tìm kết quả.', 'Chọn cửa đúng để từ số đầu ra kết quả cho trước.', 'Biết kết quả và cửa, tìm số đầu.'],
   make:function(lv){
    var loai=pick(['gap','them']), k, v, ra;
    if(lv<=1){ k=loai==='gap' ? rnd(2,5) : rnd(2,8); v=rnd(2,9); ra=ap(loai,v,k); if(ra>=100){ loai='them'; ra=ap(loai,v,k); }
      return {type:'num', _lv:1, _loai:loai, _k:k, _v:v, q:soDoGT([{v:v},{v:null}], [cuaChu(loai,k)])+'<div>Số <b>'+v+'</b> đi qua cửa <b>'+cuaChu(loai,k)+'</b>. Số ở ô <b class="text-amber-700">?</b> là bao nhiêu?</div>', ans:ra,
        sai:nhanSai([[ap(loai==='gap'?'them':'gap', v, k),'nham-gap-them'],[k,'nham-so-lan'],[ra+1,'canh-dong'],[ra-1,'canh-dong']], ra), goiY:{'nham-gap-them':GOI_GT['nham-gap-them'], 'nham-so-lan':'Ô ? là kết quả sau khi qua cửa, không phải số '+k+'.', 'canh-dong':'Bé tính lại cho đúng phép tính của cửa.'}}; }
    if(lv===2){ loai=pick(['gap','them']); k = loai==='gap' ? rnd(2,6) : rnd(3,9); v=rnd(3,9); ra=ap(loai,v,k);
      var cs=[[cuaChu(loai,k),''],[cuaChu(loai==='gap'?'them':'gap',k),'nham-gap-them']], g=shuffle([2,3,4,5,6,7,8,9]);
      var thu=[['gap',g[0]],['them',g[1]],['gap',g[2]],['them',g[3]],['gap',g[4]],['them',g[5]]]; thu.forEach(function(t){ if(cs.length<4 && ap(t[0],v,t[1])!==ra && cs.every(function(c){ return c[0]!==cuaChu(t[0],t[1]); })) cs.push([cuaChu(t[0],t[1]),'']); });
      var ds=cs.slice(0,4); shuffle(ds); var dung=cuaChu(loai,k), ch=ds.map(function(d){ return d[0]; }), sai={}; ds.forEach(function(d,i){ if(d[1]) sai[String(i)]=d[1]; });
      return {type:'mcq', cot:1, _lv:2, _loai:loai, _k:k, _v:v, _ra:ra, _dung:dung, q:soDoGT([{v:v},{v:ra}], ['cửa nào?'])+'<div>Số <b>'+v+'</b> đi qua một cửa thì ra số <b>'+ra+'</b>. Cửa nào đúng?</div>', choices:ch, correct:ch.indexOf(dung), sai:sai,
        goiY:{'nham-gap-them':'Bé tính cả hai cửa: nhân với '+k+' và cộng '+k+'. Cửa nào ra '+ra+'?', 'chung':'Bé thử từng cửa với số '+v+' xem cửa nào ra '+ra+'.'}}; }
    loai=pick(['gap','them']); k = loai==='gap' ? rnd(2,9) : rnd(3,9); v=rnd(3,12); ra=ap(loai,v,k); while(ra>=100){ v=rnd(3,12); ra=ap(loai,v,k); }
    return {type:'num', _lv:3, _loai:loai, _k:k, _v:v, q:soDoGT([{v:null},{v:ra}], [cuaChu(loai,k)])+'<div>Một số đi qua cửa <b>'+cuaChu(loai,k)+'</b> thì ra số <b>'+ra+'</b>. Số ban đầu ở ô <b class="text-amber-700">?</b> là bao nhiêu?</div>', ans:v,
      sai:nhanSai([[ra-k,'dao-vai'],[ra+k,'dao-vai'],[k,'nham-so-lan'],[ra,'dao-vai']], v), goiY:{'dao-vai':'Bé làm ngược lại: '+(loai==='gap' ? 'số nào nhân với '+k+' được '+ra+'?' : 'số nào cộng '+k+' được '+ra+'?'), 'nham-so-lan':'Ô ? là số ban đầu, không phải số '+k+'.'}};
  }, check:function(q){
    if(q._lv===2){ var tl=q.choices.filter(function(c){ var m=/^(gấp|thêm) (\d+) /.exec(c); return m && ap(m[1]==='gấp'?'gap':'them', q._v, +m[2])===q._ra; }); return kiemMCQ(q) && tl.length===1 && tl[0]===q._dung && q.choices.length===4 && ap(q._loai,q._v,q._k)===q._ra; }
    var ra=ap(q._loai,q._v,q._k); if(ra>=100) return false;
    return q._lv===1 ? q.ans===ra : (q.ans===q._v && ap(q._loai,q.ans,q._k)===ra); }},

  /* D5 — Số? hai mũi tên (Luyện tập 1) */
  {name:'Số? hai mũi tên', sec:'Luyện tập 1 — Số? gấp lên một số lần, thêm một số đơn vị', mt:['MT2'], levels:3,
   muc:['Một mũi tên gấp k lần (3 → ?).', 'Hai mũi tên: một ô đã có số, tìm ô còn lại.', 'Tìm hai kết quả rồi so sánh (6 gấp 5 lần, thêm 5 đơn vị).'],
   make:function(lv){
    var v, k, a, b, e;
    if(lv<=1){ v=rnd(2,7); k=rnd(3,5); a=v*k;
      return {type:'num', _lv:1, _v:v, _k:k, q:soDoGT([{v:v},{v:null}], ['gấp '+k+' lần'])+'<div>Số ở ô <b class="text-amber-700">?</b> là bao nhiêu?</div>', ans:a,
        sai:nhanSai([[v+k,'nham-gap-them'],[a+k,'dem-sot-phep'],[k,'nham-so-lan']], a), goiY:{'nham-gap-them':GOI_GT['nham-gap-them'], 'dem-sot-phep':'Bé tính '+v+' × '+k+'.', 'nham-so-lan':GOI_GT['nham-so-lan']}}; }
    if(lv===2){ v=rnd(3,8); k=rnd(3,6); a=v*k; b=v+k; var hoiGap=Math.random()<0.5;
      return {type:'num', _lv:2, _v:v, _k:k, _gap:hoiGap, q:soDoGT([{v:v},{v: hoiGap ? null : a}], ['gấp '+k+' lần'])+soDoGT([{v:v},{v: hoiGap ? b : null}], ['thêm '+k+' đơn vị'])+'<div>Số ở ô <b class="text-amber-700">?</b> là bao nhiêu?</div>', ans: hoiGap ? a : b,
        sai:nhanSai(hoiGap ? [[b,'nham-gap-them'],[a+k,'dem-sot-phep'],[k,'nham-so-lan']] : [[a,'nham-gap-them'],[b+k,'dem-sot-phep'],[k,'nham-so-lan']], hoiGap ? a : b), goiY:{'nham-gap-them':GOI_GT['nham-gap-them']+' Hàng nào hỏi "gấp", hàng nào hỏi "thêm"?', 'dem-sot-phep':'Bé tính lại một lần nữa.', 'nham-so-lan':'Ô ? là kết quả, không phải số '+k+'.'}}; }
    v=rnd(4,9); k=rnd(4,7); a=v*k; b=v+k; var lon=Math.random()<0.5; e=a-b;
    return {type:'num', _lv:3, _v:v, _k:k, q:soDoGT([{v:v},{v:null}], ['gấp '+k+' lần'])+soDoGT([{v:v},{v:null}], ['thêm '+k+' đơn vị'])+'<div>Kết quả khi <b>gấp '+k+' lần</b> hơn kết quả khi <b>thêm '+k+' đơn vị</b> bao nhiêu?</div>', ans:e, unit:'',
      sai:nhanSai([[a,'thieu-buoc'],[b,'thieu-buoc'],[a+b,'cong-thay-nhan'],[a-b+1,'dem-sot-phep'],[a-b-1,'dem-sot-phep']], e), goiY:{'thieu-buoc':'Bé tính cả hai kết quả rồi so sánh.', 'cong-thay-nhan':'Hỏi hơn bao nhiêu thì tìm hiệu của hai kết quả.', 'dem-sot-phep':'Bé kiểm tra lại hai kết quả: '+v+' × '+k+' và '+v+' + '+k+'.'}};
  }, check:function(q){
    var v=q._v, k=q._k, a=v*k, b=v+k;
    if(a>=100) return false;
    if(q._lv===1) return q.ans===a;
    if(q._lv===2) return q.ans===(q._gap ? a : b);
    return a>b && q.ans===a-b; }},

  /* D6 — Đúng / Sai gấp hay thêm (Luyện tập 2) */
  {name:'Đúng / Sai gấp hay thêm', sec:'Luyện tập 2 — Từ số này tới số kia là gấp mấy lần, thêm mấy đơn vị (Đ / S)', mt:['MT3'], levels:3,
   muc:['Kiến mang số 7, tổ có 63: gấp 9 lần (Đ), thêm 9 đơn vị (S).', 'Từ hai số, câu "gấp … lần" hoặc "thêm … đơn vị" (số khác nhau rõ).', 'Hai quan hệ cùng đúng hoặc cùng sai (24 → 72); số lần và số đơn vị khác nhau.'],
   make:function(lv){
    var a, k, b, loai, x, dung, tag='nham-gap-them';
    if(lv<=1){ a=rnd(3,9); k=rnd(3,9); b=a*k; while(b>=100){ a=rnd(3,9); k=rnd(3,9); b=a*k; } loai=pick(['gap','them']);
      if(loai==='gap'){ x=k; dung = Math.random()<0.5; if(!dung) x=b-a; } else { x=b-a; dung=Math.random()<0.5; if(!dung) x=k; } }
    else if(lv===2){ a=rnd(4,12); k=rnd(2,5); b=a*k; loai=pick(['gap','them']); dung=Math.random()<0.5;
      if(loai==='gap') x = dung ? k : pick([k+1,k-1,b-a,k+2].filter(function(v){ return v>1 && v!==k; }));
      else x = dung ? b-a : pick([b-a+1,b-a-1,k,b-a+2].filter(function(v){ return v>0 && v!==b-a; })); tag='nham-so-lan'; if(loai==='gap'&&x===b-a || loai==='them'&&x===k) tag='nham-gap-them'; }
    else { a=rnd(6,24); k=rnd(2,4); b=a*k; while(b>=100){ a=rnd(6,24); k=rnd(2,4); b=a*k; } loai=pick(['gap','them']);
      if(loai==='gap'){ dung=Math.random()<0.5; x = dung ? k : pick([b-a,k+1,k-1].filter(function(v){ return v>1 && v!==k; })); }
      else { dung=Math.random()<0.5; x = dung ? b-a : pick([k,b-a+1,b-a-1].filter(function(v){ return v>0 && v!==b-a; })); } tag = (loai==='gap' && x===b-a) || (loai==='them' && x===k) ? 'nham-gap-them' : 'nham-so-lan'; }
    var ph = loai==='gap' ? 'Từ '+a+' đến '+b+' là gấp '+x+' lần.' : 'Từ '+a+' đến '+b+' là thêm '+x+' đơn vị.', thatSu = loai==='gap' ? b===a*x : b===a+x;
    return {type:'mcq', figFn:dsBtn24, _lv:lv, _a:a, _b:b, _x:x, _loai:loai, _dung:(thatSu?'Đ':'S'), q:'<div class="text-xl font-extrabold text-orange-700 my-2">'+ph+'</div><div class="text-base text-slate-500">Đúng (Đ) hay sai (S)?</div>', choices:['Đ','S'], correct:(thatSu?0:1), sai:(thatSu?{}:{'0':tag}),
      goiY:{'nham-gap-them':GOI_GT['nham-gap-them']+' Bé thử: '+a+' × ? = '+b+' và '+a+' + ? = '+b+'.', 'nham-so-lan':'Bé tính lại số lần hoặc số đơn vị: '+a+' × ? = '+b+' và '+a+' + ? = '+b+'.', 'chung':'Bé thử '+a+' × ? = '+b+' và '+a+' + ? = '+b+'.'}};
  }, check:function(q){
    var tr = q._loai==='gap' ? q._b===q._a*q._x : q._b===q._a+q._x;
    return q.choices.join()==='Đ,S' && (q._dung==='Đ')===tr && q.correct===(tr?0:1) && q._b<100 && q._x>0; }},

  /* D7 — Bạn nói đúng hay sai (không có trong SGK) */
  {name:'Bạn nói đúng hay sai', sec:'Tìm lỗi — Bạn An nói gấp mấy lần, thêm mấy đơn vị', mt:['MT3'], levels:3,
   muc:['Bạn An nói một số gấp số kia mấy lần.', 'Bạn An nói số lần bằng hiệu hai số (nhầm gấp với thêm).', 'Bạn An nói số đơn vị bằng thương (nhầm thêm với gấp).'],
   make:function(lv){
    var a=rnd(3,12), k=rnd(2,5), b=a*k, T, x, mo, tag, cau;
    if(lv<=1){ T=k; x = Math.random()<0.5 ? T : pick([T+1,T-1,b-a].filter(function(v){ return v>1 && v!==T; })); mo=function(n){ return n+' × '+a+' = '+(n*a); }; mo=function(n){ return a+' × '+n+' = '+(a*n); }; tag='nham-so-lan'; cau='Bạn An nói: «Số '+b+' gấp <b>'+x+' lần</b> số '+a+'.»'; }
    else if(lv===2){ T=k; x = Math.random()<0.5 ? T : (b-a>1 && b-a!==T ? b-a : T+1); mo=function(n){ return a+' × '+n+' = '+(a*n); }; tag='nham-gap-them'; cau='Bạn An nói: «Số '+b+' gấp <b>'+x+' lần</b> số '+a+'.»'; }
    else { T=b-a; x = Math.random()<0.5 ? T : (k>0 && k!==T ? k : T+1); mo=function(n){ return a+' + '+n+' = '+(a+n); }; tag='nham-gap-them'; cau='Bạn An nói: «Số '+b+' là số '+a+' thêm <b>'+x+' đơn vị</b>.»'; }
    var hnx=haiNhanXet(x, T, mo), sai={}; sai[String(1-hnx.correct)]=tag;
    return {type:'mcq', cot:1, _lv:lv, _a:a, _b:b, _x:x, _T:T, _ds:hnx.ds, _dung:hnx.choices[hnx.correct], q:nguoi('boy','Bạn An')+'<div>'+cau+' Em thấy thế nào?</div>', choices:hnx.choices, correct:hnx.correct, sai:sai,
      goiY:{'nham-gap-them':GOI_GT['nham-gap-them']+' Bé thử: '+a+' × ? = '+b+' và '+a+' + ? = '+b+'.', 'nham-so-lan':GOI_GT['nham-so-lan'], 'chung':'Bé thử '+a+' × ? = '+b+' và '+a+' + ? = '+b+'.'}};
  }, check:function(q){
    var a=q._a, b=q._b, e = q._lv<=2 ? b/a : b-a;
    return kiemNhanXet(q) && q._T===e && Number.isInteger(e) && b<100 && (q._lv>=3 ? true : b===a*e); }},

  /* D8 — Giải toán: gấp lên (Khám phá, Hoạt động 3) */
  {name:'Giải toán: gấp lên', sec:'Khám phá, Hoạt động 3 — Tuổi bố gấp 4 lần tuổi con; bài toán gấp lên', mt:['MT4'], levels:3,
   muc:['Tuổi bố gấp k lần tuổi con (một phép nhân).', 'Chọn phép nhân (gấp) hoặc phép cộng (hơn) cho tình huống.', 'Hai bước: gấp lên rồi thêm hoặc bớt.'],
   make:function(lv){
    var c, k, vt=pick(VAT), tn=pick(CAP_TEN);
    if(lv<=1){ c=rnd(6,9); k=rnd(3,5); while(c*k>=60){ k=rnd(3,5); }
      return {type:'num', _lv:1, _c:c, _k:k, q:nguoi('boy','Con')+'<div>Năm nay con <b>'+c+' tuổi</b>. Tuổi bố gấp <b>'+k+' lần</b> tuổi con.</div><div class="mt-1">Hỏi bố bao nhiêu tuổi?</div>', ans:c*k, unit:'tuổi',
        sai:nhanSai([[c+k,'nham-gap-them'],[c*(k-1),'dem-sot-phep'],[c*(k+1),'dem-sot-phep'],[k,'nham-so-lan']], c*k), goiY:{'nham-gap-them':GOI_GT['nham-gap-them'], 'dem-sot-phep':'Bé nhân '+c+' với '+k+'.', 'nham-so-lan':GOI_GT['nham-so-lan']}}; }
    if(lv===2){ var a=rnd(4,9), n=rnd(3,6), gap=Math.random()<0.5; while(a*(n-1)===a+n || a*n===a+n){ a=rnd(4,9); n=rnd(3,6); } var dung = gap ? a+' × '+n : a+' + '+n, sai0 = gap ? a+' + '+n : a+' × '+n, ds=[[dung,''],[sai0,'nham-gap-them'],[a+' × '+(n+1),'lech-nhom'],[a+' + '+(n+1),'lech-nhom']];
      if(gap===false){ ds[2]=[a+' − '+n,'chon-sai-phep']; ds[3]=[a+' × '+(n-1),'lech-nhom']; }
      shuffle(ds); var ch=ds.map(function(d){ return d[0]; }), sai={}; ds.forEach(function(d,i){ if(d[1]) sai[String(i)]=d[1]; });
      var cau = gap ? 'Số '+vt[0]+' của '+tn[1]+' gấp '+n+' lần số '+vt[0]+' của '+tn[0]+'. '+tn[0]+' có '+a+' '+vt[1]+'. Phép tính nào tìm số '+vt[0]+' của '+tn[1]+'?'
        : 'Số '+vt[0]+' của '+tn[1]+' nhiều hơn số '+vt[0]+' của '+tn[0]+' '+n+' '+vt[1]+'. '+tn[0]+' có '+a+' '+vt[1]+'. Phép tính nào tìm số '+vt[0]+' của '+tn[1]+'?';
      return {type:'mcq', cot:1, _lv:2, _a:a, _n:n, _gap:gap, _dung:dung, q:'<div>'+cau+'</div>', choices:ch, correct:ch.indexOf(dung), sai:sai,
        goiY:{'nham-gap-them':'"Gấp n lần" là phép nhân. "Nhiều hơn n" là phép cộng. Bé đọc kỹ đề nhé!', 'lech-nhom':'Bé xem lại số lần hoặc số '+vt[1]+' trong đề.', 'chon-sai-phep':'Nhiều hơn thì dùng phép cộng, không phải phép trừ.'}}; }
    var a2=rnd(4,9), k2=rnd(3,5), d=rnd(3,12), them=Math.random()<0.5, base=a2*k2; while(!them && base<=d+5){ d=rnd(3,12); }
    var ans=them ? base+d : base-d;
    return {type:'num', _lv:3, _a:a2, _k:k2, _d:d, _them:them, q:nguoi('girl','Hà')+'<div>Hà có <b>'+a2+' viên bi</b>. Số bi của Nam gấp <b>'+k2+' lần</b> số bi của Hà. '+(them ? 'Mẹ cho Nam thêm <b>'+d+' viên</b> bi nữa.' : 'Nam cho bạn <b>'+d+' viên</b> bi.')+'</div><div class="mt-1">Hỏi '+(them ? 'bây giờ Nam có' : 'Nam còn lại')+' bao nhiêu viên bi?</div>', ans:ans, unit:'viên bi',
      sai:nhanSai([[base,'thieu-buoc'],[them ? base-d : base+d,'chon-sai-phep'],[a2+k2+(them?d:-d),'nham-gap-them']], ans), goiY:{'thieu-buoc':'Bài này cần hai bước: tìm số bi của Nam ('+a2+' × '+k2+'), rồi '+(them ? 'cộng thêm' : 'trừ đi')+' '+d+'.', 'chon-sai-phep':(them ? 'Thêm vào là cộng.' : 'Cho đi là trừ.'), 'nham-gap-them':'Gấp '+k2+' lần là nhân với '+k2+', không phải cộng.'}};
  }, check:function(q){
    if(q._lv===1) return q.ans===q._c*q._k && q.ans<60;
    if(q._lv===2){ var v=q.choices.filter(function(c){ return tinhBT(c)===(q._gap ? q._a*q._n : q._a+q._n); }); return kiemMCQ(q) && v.length===1 && tinhBT(q._dung)===(q._gap ? q._a*q._n : q._a+q._n) && q.choices.filter(function(c){ return c===q._dung; }).length===1; }
    var base=q._a*q._k; return q.ans===(q._them ? base+q._d : base-q._d) && q.ans>0 && q.ans<100; }},

  /* D9 — Bàn và ghế (Luyện tập 3) */
  {name:'Bàn và ghế', sec:'Luyện tập 3 — 9 cái bàn, mỗi bàn 2 cái ghế: cần bao nhiêu cái ghế?', mt:['MT4'], levels:3,
   muc:['Có n cái bàn, mỗi bàn 2 cái ghế: tất cả bao nhiêu ghế (đếm ghế trong hình).', 'Mỗi bàn 3, 4 ghế: ghế nhiều hơn bàn bao nhiêu.', 'Thêm ghế dự phòng; hoặc biết số ghế, tìm số bàn.'],
   make:function(lv){
    var n, g, ans, cau, sai, fig='';
    if(lv<=1){ n=rnd(3,9); g=2; ans=n*g; fig=banGhe(n,g); cau='Có <b>'+n+' cái bàn</b>, mỗi bàn <b>'+g+' cái ghế</b>. Hỏi cần tất cả bao nhiêu cái ghế?'; sai=[[n+g,'cong-thay-nhan'],[n,'thieu-buoc'],[n*(g+1),'lech-nhom'],[n*g-g,'lech-nhom']]; }
    else if(lv===2){ n=rnd(3,6); g=rnd(3,4); ans=n*g-n; fig=banGhe(n,g); cau='Có <b>'+n+' cái bàn</b>, mỗi bàn <b>'+g+' cái ghế</b>. Số ghế nhiều hơn số bàn bao nhiêu?'; sai=[[n*g,'thieu-buoc'],[g-1,'thieu-buoc'],[n*g+n,'cong-thay-nhan'],[n*g-g,'lech-nhom']]; }
    else if(Math.random()<0.6){ n=rnd(3,6); g=rnd(3,4); var d=rnd(2,6); ans=n*g+d; fig=banGhe(n,g); cau='Có <b>'+n+' cái bàn</b>, mỗi bàn <b>'+g+' cái ghế</b>. Cô giáo mang thêm <b>'+d+' cái ghế</b> dự phòng. Hỏi có tất cả bao nhiêu cái ghế?'; sai=[[n*g,'thieu-buoc'],[n+g+d,'cong-thay-nhan'],[n*g-d,'chon-sai-phep'],[n*(g+1)+d,'lech-nhom']]; }
    else { g=rnd(3,5); n=rnd(4,9); ans=n; cau='Mỗi bàn có <b>'+g+' cái ghế</b>. Cần tất cả <b>'+(n*g)+' cái ghế</b>. Hỏi có bao nhiêu cái bàn?'; sai=[[n*g,'dao-vai'],[n*g-g,'dao-vai'],[g,'nham-so-lan'],[n+1,'lech-nhom'],[n-1,'lech-nhom']]; }
    var e = fig ? ans : ans;
    return {type:'num', _lv:lv, _n:n, _g:g, _fig:!!fig, _d:d, q:fig+'<div>'+cau+'</div>', ans:ans, unit: (lv>=3 && !fig) ? 'cái bàn' : (lv===2 ? 'cái ghế' : 'cái ghế'), sai:nhanSai(sai, ans),
      goiY:{'cong-thay-nhan':'Mỗi bàn đều có '+g+' ghế: dùng phép nhân.', 'thieu-buoc':'Bé nhớ làm hết các bước của bài toán nhé!', 'lech-nhom':'Bé đếm lại số bàn và số ghế mỗi bàn.', 'chon-sai-phep':'Mang thêm ghế là cộng, không phải trừ.', 'dao-vai':'Số bàn là số lần lấy '+g+' ghế để được '+(n*g)+' ghế. Bé tìm số mà '+g+' × ? = '+(n*g)+'.', 'nham-so-lan':'Ô trả lời là số bàn, không phải số ghế mỗi bàn.'}};
  }, check:function(q){
    var n=q._n, g=q._g;
    if(q._fig){ if(demDem(q.q,'ban')!==n || demDem(q.q,'ghe')!==n*g) return false; }
    else if(q._lv<3) return false;
    var e = q._lv<=1 ? n*g : (q._lv===2 ? n*g-n : (q._fig ? n*g+q._d : n));
    return q.ans===e && n*g<100; }},

  /* D10 — Phép tính có kết quả 45 (Luyện tập 4: mê cung đổi thành chọn một và đếm) */
  {name:'Phép tính có kết quả 45', sec:'Luyện tập 4 — Tìm các phép tính có kết quả bằng 45 (thay cho mê cung)', mt:['MT4'], levels:3,
   muc:['Phép tính nào có kết quả bằng 45 (chọn một trong bốn).', 'Trong sáu thẻ, có bao nhiêu thẻ phép tính có kết quả bằng 45.', 'Trong tám thẻ (cộng, trừ, nhân), có bao nhiêu thẻ có kết quả bằng 45.'],
   make:function(lv){
    var dung45=['15 × 3','9 × 5','5 × 9','3 × 15','40 + 5','50 − 5','60 − 15','75 − 30','20 + 25','30 + 15','35 + 10','90 − 45'],
        khac=['23 × 2','75 − 20','16 × 2','75 − 45','45 + 7','9 × 6','15 × 4','40 + 6','60 − 14','8 × 5','25 + 25','30 + 14','12 × 4','50 − 6','7 × 7','10 × 4'];
    var sl = lv<=1 ? 4 : (lv===2 ? 6 : 8), nd = lv<=1 ? 1 : pick([2,3]), ds, g;
    for(g=0;g<200;g++){
      var d=shuffle(dung45.slice()).slice(0,nd), k=shuffle(khac.slice()).slice(0,sl-nd); ds=shuffle(d.concat(k));
      if(ds.every(function(t){ return Number.isInteger(tinhBT(t)); }) && new Set(ds.map(function(t){ return tinhBT(t); })).size>=sl-1) break; }
    var dem=ds.filter(function(t){ return tinhBT(t)===45; }).length;
    if(lv<=1){ var dung=ds.filter(function(t){ return tinhBT(t)===45; })[0];
      return {type:'mcq', cot:1, _lv:1, _ds:ds, _dung:dung, q:'<div>Phép tính nào có kết quả bằng <b class="text-2xl text-orange-600">45</b>?</div>', choices:ds, correct:ds.indexOf(dung),
        goiY:{'chung':'Bé tính kết quả của từng phép tính, rồi tìm phép có kết quả bằng 45.'}}; }
    return {type:'num', _lv:lv, _ds:ds, q:theTinh(ds)+'<div>Có bao nhiêu thẻ phép tính có kết quả bằng <b class="text-2xl text-orange-600">45</b>?</div>', ans:dem, unit:'thẻ',
      sai:nhanSai([[dem+1,'dem-sot-phep'],[dem-1,'dem-sot-phep'],[dem+2,'dem-sot-phep']], dem), goiY:{'dem-sot-phep':'Bé tính kết quả của từng thẻ, rồi đếm các thẻ có kết quả bằng 45.'}};
  }, check:function(q){
    var ds=q._ds, v=ds.map(function(t){ return tinhBT(t); });
    if(!v.every(Number.isInteger) || v.some(function(x){ return x<=0 || x>=100; })) return false;
    var dem=v.filter(function(x){ return x===45; }).length;
    if(q._lv<=1) return kiemMCQ(q) && ds.length===4 && dem===1 && tinhBT(q._dung)===45;
    var tren=docThe(q.q); if(tren.join('|')!==ds.join('|')) return false;
    return q.ans===dem && dem>=2 && dem<=3 && ds.length===(q._lv===2 ? 6 : 8); }}
 ]
};
