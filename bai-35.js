/* bai-35.js — Bài 35: Luyện tập chung (Chủ đề 5). BÀI MỚI, Engine v2 — LUYỆN THÔNG MINH.
   Theo bảng phân tích sư phạm (phan-tich-su-pham/bai-35.md): 4 MỤC TIÊU (muctieu) × 9 DẠNG (topics), mỗi dạng 3 mức (Thông tư 27).
   Gộp tính với số đo (ml, g, mm), cân đĩa thăng bằng và cân nghiêng, chuỗi hai bước, đong nước hai cốc, trò chơi tính nhanh (không dựng bàn cờ).
   Hình: canDia (chép từ bài 31, thêm cân nghiêng và nhãn chữ), soDoGT (chép từ bài 29), theTinh (chép từ bài 24). check() đọc lại số từ chuỗi SVG.
   Mọi phép tính trong phương án đúng số học; số đo tới 1 000; không số âm, không số thập phân.
   QUY TẮC: nối chuỗi, KHÔNG backtick và KHÔNG template literal. */

/* ---- Tiện ích chung ---- */
function nhanSai(ds, dung){ var o={}; ds.forEach(function(p){ var v=p[0]; if(Number.isInteger(v) && v>0 && v!==dung && !(String(v) in o)) o[String(v)]=p[1]; }); return o; }
function kiemMCQ(q){ return q.choices[q.correct]===q._dung && new Set(q.choices).size===q.choices.length; }
function dsBtn35(ch){ return '<span class="text-2xl font-extrabold text-slate-700">'+ch+'</span><span class="ml-2 text-base font-bold text-slate-600">'+(ch==='Đ'?'Đúng':'Sai')+'</span>'; }
function svgX(w, h, px){ return svgHinh(w, h, px).replace('<svg ', '<svg class="text-slate-700" '); }
function demDem(s, loai){ var m=String(s).match(new RegExp('data-dem="'+loai+'"', 'g')); return m ? m.length : 0; }
function khungHinh(s){ return '<div class="flex justify-center my-2">'+s+'</svg></div>'; }
function nguoi(ten, alt){ return '<div class="flex justify-center mb-1">'+anh(ten, 72, alt)+'</div>'; }
function kyHieu(nhan, bt){ return '<div class="text-slate-500 mb-1">'+nhan+'</div><div class="text-3xl font-extrabold text-orange-600">'+bt+'</div>'; }
function so(n){ return n>=1000 ? Math.floor(n/1000)+' '+('00'+(n%1000)).slice(-3) : String(n); }
var GOI={'nham-bang':'Bé tính lại cho đúng nhé, nhớ cả phần nhớ khi cộng và khi trừ.', 'chon-sai-phep':'Bé đọc kỹ: thêm vào là cộng, bớt đi là trừ, gấp lên là nhân, chia đều là chia.', 'thieu-buoc':'Bài này có hai bước. Bé làm đủ các bước nhé!', 'dao-vai':'Bé xem lại: ô trả lời là số nào?',
  'nham-chieu':'Giảm đi là chia, gấp lên là nhân. Bé đọc kỹ nhé!', 'nham-gap-them':'Gấp n lần là nhân với n. Thêm n đơn vị mới là cộng n.', 'nham-giam-bot':'Giảm đi n lần là chia cho n. Bớt n đơn vị mới là trừ n.', 'cong-thay-nhan':'Nhân với một số, không phải cộng.',
  'nham-cao-thap':'Đĩa cân bên nào thấp hơn thì bên đó nặng hơn.', 'dem-sot-phep':'Bé tính từng thẻ rồi đếm lại nhé!', 'quen-doi':'Bé đổi về cùng một đơn vị trước khi tính.'};
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
function theTinh(ds){
  var s='<div class="flex flex-wrap justify-center gap-2 my-2">';
  ds.forEach(function(t){ s+='<span class="inline-block px-3 py-2 rounded-xl border-2 border-amber-300 text-slate-700 font-extrabold text-xl whitespace-nowrap">'+t+'</span>'; });
  return s+'</div>';
}
function docThe(s){ var o=[], re=/<span class="inline-block px-3 py-2[^>]*>([^<]*)<\/span>/g, m; while((m=re.exec(String(s)))) o.push(m[1]); return o; }

function soDoGT(nut, cua){
  var nhieu=nut.length>=3, ml=0, D=nhieu?48:56, A,  W, s, x=4, i; var dong=function(c){ var m=/^(.+?) (đơn vị)$/.exec(c); return m ? [m[1], m[2]] : [c]; }; cua.forEach(function(c){ dong(c).forEach(function(d){ ml=Math.max(ml, d.length); }); }); A=Math.max(nhieu?108:128, Math.ceil(ml*8.8)+8); W=nut.length*D+(nut.length-1)*A+8; s=svgX(W,76);
  for(i=0;i<nut.length;i++){
    var v=nut[i].v, hoi=(v===null || v===undefined), trong=(v===''), cx=x+D/2;
    if(trong) s+='<circle cx="'+cx+'" cy="46" r="'+(D/2-1.5)+'" fill="none" stroke="currentColor" stroke-width="2.5" stroke-dasharray="5 4" opacity=".55"/>';
    else s+='<circle cx="'+cx+'" cy="46" r="'+(D/2-1.5)+'" fill="'+(hoi ? '#fff' : HM.vang)+'"'+(hoi ? ' stroke="'+HM.vangDam+'" stroke-width="3"' : '')+'/>'+chuSo(cx, 46, hoi ? '?' : v, hoi ? 24 : (String(v).length>2 ? 18 : 22));
    x+=D;
    if(i<cua.length){
      var ls=dong(cua[i]); s+=ls.map(function(t,j){ return '<text x="'+(x+A/2)+'" y="'+(ls.length>1 ? 17+j*21 : 30)+'" text-anchor="middle" font-size="17" '+HFONT+' fill="currentColor">'+t+'</text>'; }).join('')
       +'<path d="M'+(x+8)+' 46 H'+(x+A-8)+' M'+(x+A-15)+' 40 L'+(x+A-8)+' 46 L'+(x+A-15)+' 52" stroke="currentColor" stroke-width="2.6" fill="none" stroke-linecap="round" stroke-linejoin="round" opacity=".6"/>';
      x+=A;
    }
  }
  return khungHinh(s);
}

/* Các đáp án nhiễu thật cho một phép: nhầm chiều, nhầm gấp với thêm, giảm với bớt */
function nhamPhep(loai, v, k){
  if(loai==='gap') return [[v+k,'nham-gap-them'],[v%k===0 ? v/k : 0,'nham-chieu']];
  if(loai==='giam') return [[v-k,'nham-giam-bot'],[v*k,'nham-chieu']];
  if(loai==='them') return [[v*k,'nham-gap-them'],[v-k,'chon-sai-phep']];
  return [[v%k===0 ? v/k : 0,'nham-giam-bot'],[v+k,'chon-sai-phep']];
}
function cuaChu(loai, k){ return loai==='gap' ? 'gấp '+k+' lần' : (loai==='giam' ? 'giảm '+k+' lần' : (loai==='them' ? 'thêm '+k+' đơn vị' : 'bớt '+k+' đơn vị')); }
function ap(loai, v, k){ return loai==='gap' ? v*k : (loai==='giam' ? v/k : (loai==='them' ? v+k : v-k)); }
function okPhep(loai, v, k){ var r=ap(loai,v,k); return Number.isInteger(r) && r>=1 && r<=1000; }

/* ---- Hình (D3, D4): cân đĩa. Mỗi bên là danh sách vật: {g, k:'can'} quả cân có nhãn; {g, k:'goi', an:true} gói hàng hiện "?" (g = số thật, để kiểm); {g:0, k:'goi', nhan:'A'} túi có nhãn chữ.
   nghieng = 'trai' (đĩa trái thấp hơn, bên trái nặng hơn), 'phai', hoặc không có (thăng bằng). Mỗi vật rect có data-g, data-s (t, p), data-k; thanh cân có data-nghieng. ---- */
function canDia(trai, phai, nghieng){
  var W=390, H=236, xL=104, xR=286, yBeam=70, yPan=172, s=svgX(W,H), dy = nghieng==='trai' ? 14 : (nghieng==='phai' ? -14 : 0), yb1=yBeam+dy, yb2=yBeam-dy, yp1=yPan+dy, yp2=yPan-dy;
  s+='<path data-nghieng="'+(nghieng||'can')+'" d="M'+xL+' '+yb1+' L'+xR+' '+yb2+'" fill="none" stroke="currentColor" stroke-width="4" stroke-linecap="round"/>'
    +'<path d="M195 '+yBeam+' V216 M155 220 H235" fill="none" stroke="currentColor" stroke-width="5" stroke-linecap="round"/>'
    +'<path d="M'+xL+' '+yb1+' L24 '+yp1+' M'+xL+' '+yb1+' L184 '+yp1+' M'+xR+' '+yb2+' L206 '+yp2+' M'+xR+' '+yb2+' L366 '+yp2+'" fill="none" stroke="currentColor" stroke-width="1.8" opacity=".5"/>'
    +'<path d="M24 '+yp1+' H184 Q184 '+(yp1+16)+' 104 '+(yp1+16)+' Q24 '+(yp1+16)+' 24 '+yp1+'" fill="'+HM.vang+'" fill-opacity="0.5" stroke="currentColor" stroke-width="2.5"/>'
    +'<path d="M206 '+yp2+' H366 Q366 '+(yp2+16)+' 286 '+(yp2+16)+' Q206 '+(yp2+16)+' 206 '+yp2+'" fill="'+HM.vang+'" fill-opacity="0.5" stroke="currentColor" stroke-width="2.5"/>';
  function xep(ds, cx, side, yp){
    var n=ds.length, o='', pos=[], i;
    var w=function(d){ return d.k==='goi' ? 74 : 62; }, h=function(d){ return d.k==='goi' ? 46 : 32; };
    if(n===1) pos=[[cx,0]]; else if(n===2) pos=[[cx-34,0],[cx+34,0]]; else pos=[[cx-34,0],[cx+34,0],[cx,1]];
    for(i=0;i<n;i++){ var d=ds[i], ww=w(d), hh=h(d), x=pos[i][0]-ww/2, y=yp-hh-pos[i][1]*34, tx=pos[i][0], ty=y+hh/2+6;
      if(d.k==='goi') o+='<rect data-g="'+d.g+'" data-s="'+side+'" data-k="goi" x="'+x+'" y="'+y+'" width="'+ww+'" height="'+hh+'" rx="8" fill="'+HM.cam+'" fill-opacity="0.55" stroke="currentColor" stroke-width="2.5"/><text x="'+tx+'" y="'+(ty+(d.an?2:0))+'" text-anchor="middle" font-size="'+((d.an || d.nhan)?24:18)+'" '+HFONT+' fill="'+(d.an?HM.hoi:HM.chu)+'">'+(d.an?'?':(d.nhan ? d.nhan : d.g+' g'))+'</text>';
      else o+='<rect data-g="'+d.g+'" data-s="'+side+'" data-k="can" x="'+x+'" y="'+y+'" width="'+ww+'" height="'+hh+'" rx="6" fill="'+HM.xam+'" stroke="currentColor" stroke-width="2.5"/><text x="'+tx+'" y="'+ty+'" text-anchor="middle" font-size="18" '+HFONT+' fill="'+HM.chu+'">'+d.g+' g</text>'; }
    return o;
  }
  s+=xep(trai, xL, 't', yp1)+xep(phai, xR, 'p', yp2);
  return khungHinh(s);
}
function docCanNhieu(html){ return String(html).split('<svg ').slice(1).map(function(seg){ var o=[], re=/<rect data-g="(\d+)" data-s="(\w)" data-k="(\w+)"/g, m, n=/data-nghieng="(\w+)"/.exec(seg); while((m=re.exec(seg))) o.push({g:+m[1], s:m[2], k:m[3]}); return {items:o, nghieng:n ? n[1] : null}; }); }
function tongBen(o, s){ var t=0; o.forEach(function(d){ if(d.s===s) t+=d.g; }); return t; }

var DON=[['ml','ml'],['g','g'],['mm','mm']];
var GAME=['160 − 60','30 × 2','55 + 45','20 × 5','90 : 3','30 + 60','30 + 70','90 : 5','10 × 9','30 + 90','40 × 2','500 − 50','10 × 7','4 + 96','72 : 9','56 : 7','903 − 3','8 × 9','45 + 35','50 × 2','25 × 4','99 + 1','400 : 4'];

var BAI = {
 n: 35,
 title: 'Luyện Tập Chung',
 sub: 'Luyện thông minh: câu hỏi tự đổi theo bé — làm hết lượt để xem ngọn lửa!',
 goal: 10, soCau: 18, soCauToiDa: 24,
 loi: {'nham-chieu':'Nhầm chiều phép tính (gấp thay giảm)', 'nham-gap-them':'Nhầm "gấp n lần" với "thêm n đơn vị"', 'nham-giam-bot':'Nhầm "giảm n lần" với "bớt n đơn vị"', 'nham-cao-thap':'Nhầm đĩa cân nặng với đĩa cân nhẹ', 'dem-sot-phep':'Đếm sót hoặc thừa thẻ', 'quen-doi':'Quên đổi đơn vị'},
 muctieu: [
  {id:'MT1', ten:'Tính với số đo', muc:['Cộng, trừ không nhớ (392 mm + 43 mm); một phép gấp, giảm.', 'Cộng, trừ có nhớ (329 ml − 135 ml); ba số (37 g + 63 g − 30 g); hai mũi tên (8 ml gấp 3 lần, giảm 4 lần).', 'Số có ba chữ số cả hai vế; ba số có ba chữ số; hai mũi tên hỗn hợp.']},
  {id:'MT2', ten:'Cân đĩa', muc:['Hộp quà cân bằng với quả cân (100 g + hộp = 500 g); bên nào nặng hơn.', 'Chùm nho (50 g + chùm = 100 g + 100 g).', 'Ba quả cân mỗi bên; túi nào nặng nhất, nhẹ nhất (ba cân).']},
  {id:'MT3', ten:'Đo lường trong đời sống', muc:['Đơm 5 chiếc cúc áo, mỗi chiếc hết 70 mm chỉ.', 'Đong 250 ml bằng hai cốc 150 ml và 400 ml (chọn cách đúng); chia đều chỉ cho các cúc.', 'Số khác; cuộn chỉ còn lại bao nhiêu mm.']},
  {id:'MT4', ten:'Tính nhanh và tìm lỗi', muc:['Ô nào có kết quả 100 (chọn một); Đúng / Sai một phép tính.', 'Có mấy ô cho kết quả 100 (sáu ô); bạn tính ba số có đúng không.', 'Tám ô; bạn nói hộp quà nặng bao nhiêu (em thấy thế nào).']}
 ],
 topics: [
  /* D1 — Cộng, trừ số đo (Tiết 1, bài 1) */
  {name:'Cộng, trừ số đo', sec:'Tiết 1, bài 1 — 329 ml − 135 ml; 200 g − 150 g; 392 mm + 43 mm; 251 ml + 262 ml', mt:['MT1'], levels:3,
   muc:['Cộng, trừ không nhớ (số đo có hai hoặc ba chữ số).', 'Cộng, trừ có nhớ (392 mm + 43 mm; 329 ml − 135 ml).', 'Số có ba chữ số cả hai vế (251 ml + 262 ml).'],
   make:function(lv){
    var u=pick(DON)[0], cong=Math.random()<0.5, a, b, ans, g=0;
    do{ g++;
      if(lv<=1){ if(cong){ a=10*rnd(5,60); b=10*rnd(1,30); while(a+b>900) b=10*rnd(1,20); } else { a=10*rnd(20,90); b=10*rnd(1,Math.floor(a/10)-5); } }
      else if(lv===2){ if(cong){ a=rnd(150,490); b=rnd(21,89); } else { a=rnd(200,499); b=rnd(60,190); } }
      else { if(cong){ a=rnd(150,490); b=rnd(120,490); } else { a=rnd(400,990); b=rnd(120,Math.min(500,a-100)); } }
      var carry = cong ? ((a%10)+(b%10)>=10 || (Math.floor(a/10)%10)+(Math.floor(b/10)%10)>=10) : ((a%10)<(b%10) || (Math.floor(a/10)%10)<(Math.floor(b/10)%10));
      ans = cong ? a+b : a-b;
    }while(g<500 && ((lv<=1 && carry) || (lv>=2 && !carry) || ans<=0 || ans>1000));
    var sai=[[ans+10,'nham-bang'],[ans-10,'nham-bang'],[ans+100,'nham-bang'],[cong ? Math.abs(a-b) : a+b,'chon-sai-phep']];
    return {type:'num', _lv:lv, _a:a, _b:b, _cong:cong, q:kyHieu('Tính', a+' '+u+(cong ? ' + ' : ' − ')+b+' '+u+' ='+oHoi()), ans:ans, unit:u, sai:nhanSai(sai, ans), goiY:gy()};
  }, check:function(q){ var e=q._cong ? q._a+q._b : q._a-q._b; return q.ans===e && e>0 && e<=1000; }},

  /* D2 — Tính ba số (Tiết 1, bài 1b) */
  {name:'Tính ba số', sec:'Tiết 1, bài 1b — 37 g + 63 g − 30 g; 87 mm − 17 mm + 10 mm', mt:['MT1'], levels:3,
   muc:['Cộng rồi trừ: số tròn chục ở bước đầu (37 + 63 − 30).', 'Trừ rồi cộng (87 − 17 + 10).', 'Ba số có ba chữ số (251 + 262 − 113).'],
   make:function(lv){
    var u=pick(DON)[0], kind = lv<=1 ? 'ct' : (lv===2 ? 'tc' : pick(['ct3','tc3'])), a, b, c, s, ans, bt, sai;
    if(kind==='ct'){ a=rnd(11,59); b=100-a; c=10*rnd(1,9); s=a+b; ans=s-c; bt=a+' '+u+' + '+b+' '+u+' − '+c+' '+u; sai=[[s+c,'chon-sai-phep'],[s,'thieu-buoc'],[ans+10,'nham-bang']]; }
    else if(kind==='tc'){ a=rnd(60,99); b=10*rnd(1,5)+(a%10); c=10*rnd(1,5); s=a-b; ans=s+c; bt=a+' '+u+' − '+b+' '+u+' + '+c+' '+u; sai=[[s-c>0 ? s-c : 0,'chon-sai-phep'],[s,'thieu-buoc'],[ans+10,'nham-bang']]; }
    else if(kind==='ct3'){ a=rnd(150,450); b=rnd(120,400); c=rnd(60,Math.min(300,a+b-50)); s=a+b; ans=s-c; bt=a+' '+u+' + '+b+' '+u+' − '+c+' '+u; sai=[[s+c>1000 ? 0 : s+c,'chon-sai-phep'],[s,'thieu-buoc'],[ans+10,'nham-bang'],[ans-10,'nham-bang']]; }
    else { a=rnd(600,990); b=rnd(120,400); s=a-b; c=rnd(60,Math.min(300,1000-s)); ans=s+c; bt=a+' '+u+' − '+b+' '+u+' + '+c+' '+u; sai=[[s-c>0 ? s-c : 0,'chon-sai-phep'],[s,'thieu-buoc'],[ans+10,'nham-bang'],[ans-10,'nham-bang']]; }
    return {type:'num', _lv:lv, _kind:kind, _a:a, _b:b, _c:c, q:kyHieu('Tính', bt+' ='+oHoi()), ans:ans, unit:u, sai:nhanSai(sai, ans), goiY:gy({'thieu-buoc':'Bé tính từ trái sang phải: làm phép đầu, rồi làm phép sau.', 'chon-sai-phep':'Bé xem dấu của từng phép: cộng hay trừ.'})};
  }, check:function(q){ var a=q._a, b=q._b, c=q._c, k=q._kind, e = (k==='ct'||k==='ct3') ? a+b-c : a-b+c; return q.ans===e && e>0 && e<=1000 && (k==='ct' ? a+b===100 : true); }},

  /* D3 — Cân thăng bằng: hộp quà, chùm nho (Tiết 1, bài 2) */
  {name:'Hộp quà và chùm nho', sec:'Tiết 1, bài 2 — Cân thăng bằng: quả cân 100 g và hộp quà, bên kia quả cân 500 g', mt:['MT2'], levels:3,
   muc:['Một quả cân và hộp quà thăng bằng với một quả cân.', 'Hai quả cân bên kia (100 g + 100 g).', 'Hai hoặc ba quả cân mỗi bên.'],
   make:function(lv){
    var P=[50,100,200,500], nL = lv<=1 ? 1 : (lv===2 ? 1 : pick([1,2])), nR = lv<=1 ? 1 : (lv===2 ? 2 : pick([2,3])), L, R, hop, g=0, ten=pick(['Hộp quà','Chùm nho','Gói bánh']), tl, tp, i;
    do{ g++; tl=[]; tp=[]; for(i=0;i<nL;i++) tl.push(pick(P)); for(i=0;i<nR;i++) tp.push(pick(P)); L=tl.reduce(function(a,b){ return a+b; },0); R=tp.reduce(function(a,b){ return a+b; },0); hop=R-L; }while(g<500 && (hop<=0 || hop>900 || (lv<=1 && hop<100)));
    var tr=tl.map(function(x){ return {g:x,k:'can'}; }).concat([{g:hop,k:'goi',an:true}]), ph=tp.map(function(x){ return {g:x,k:'can'}; });
    var sai=[[R+L,'chon-sai-phep'],[R,'thieu-buoc'],[L,'thieu-buoc'],[hop+50,'nham-bang'],[hop-50,'nham-bang']];
    return {type:'num', _lv:lv, _hop:hop, q:canDia(tr, ph)+'<div>Cân thăng bằng. '+ten+' nặng bao nhiêu gam?</div>', ans:hop, unit:'g', sai:nhanSai(sai, hop), goiY:gy({'thieu-buoc':'Hai bên nặng bằng nhau: bé tính tổng bên phải, rồi trừ đi quả cân bên trái.', 'chon-sai-phep':'Bên có hộp quà nhẹ hơn bên kia khi chưa kể hộp: bé lấy bên nặng trừ bên nhẹ.'})};
  }, check:function(q){ var d=docCanNhieu(q.q)[0]; if(!d || d.nghieng!=='can') return false; var t=tongBen(d.items,'t'), p=tongBen(d.items,'p'); return t===p && d.items.filter(function(x){ return x.k==='goi'; }).length===1 && q.ans===q._hop && q.ans>0 && d.items.filter(function(x){ return x.s==='t'; }).length<=3 && d.items.filter(function(x){ return x.s==='p'; }).length<=3; }},

  /* D4 — Cân nghiêng: túi nào nặng nhất (Tiết 2, bài 2) */
  {name:'Cân nghiêng: túi nặng nhất', sec:'Tiết 2, bài 2 — Ba túi A, B, C trên cân đĩa: túi nào nặng nhất', mt:['MT2'], levels:3,
   muc:['Cân nghiêng: bên nào nặng hơn.', 'Ba cân: túi A và B nặng bằng nhau, túi C nặng hơn: túi nào nặng nhất.', 'Túi C nhẹ hơn: túi nào nhẹ nhất; số khác.'],
   make:function(lv){
    if(lv<=1){ var p=pick([[500,[200,200]],[500,[100,200]],[200,[50,100]],[200,[50,50]],[100,[20,50]]].filter(function(x){ return x[0]>x[1][0]+x[1][1]; })); var l=p[0], r=p[1], heavyL=Math.random()<0.5;
      var tl = heavyL ? [{g:l,k:'can'}] : r.map(function(x){ return {g:x,k:'can'}; }), tp = heavyL ? r.map(function(x){ return {g:x,k:'can'}; }) : [{g:l,k:'can'}], ch=['Bên trái','Bên phải'], dung = heavyL ? 'Bên trái' : 'Bên phải', sai={}; sai[String(1-ch.indexOf(dung))]='nham-cao-thap';
      return {type:'mcq', cot:1, _lv:1, _dung:dung, q:canDia(tl,tp,heavyL ? 'trai' : 'phai')+'<div>Cân nghiêng như hình. Đĩa nào thấp hơn thì bên đó nặng hơn. Bên nào nặng hơn?</div>', choices:ch, correct:ch.indexOf(dung), sai:sai, goiY:gy()}; }
    var combos = lv===2 ? [[300,[100,200],500,200]] : [[400,[200,200],500,100],[200,[100,100],500,300],[300,[100,200],500,200],[400,[100,300],500,100],[250,[50,200],500,250]].filter(function(c){ return c[3]>0; }), c=pick(combos), m=c[0], wa=c[1], W=c[2], w3=c[3];
    var nhat = lv===2 ? true : Math.random()<0.5, nghieng = nhat ? 'trai' : 'phai';
    var cap=function(t){ return '<div class="text-center font-extrabold text-slate-700 mt-1">'+t+'</div>'; };
    var f1=canDia([{g:0,k:'goi',nhan:'A'}], wa.map(function(x){ return {g:x,k:'can'}; })), f2=canDia([{g:0,k:'goi',nhan:'B'},{g:w3,k:'can'}], [{g:W,k:'can'}]), f3=canDia([{g:0,k:'goi',nhan:'C'}], [{g:0,k:'goi',nhan:'B'}], nghieng);
    var ch=['Túi A','Túi B','Túi C'], dung='Túi C', sai={}; ch.forEach(function(x,i){ if(x!==dung) sai[String(i)]='nham-cao-thap'; });
    return {type:'mcq', cot:1, _lv:lv, _m:m, _wa:wa, _W:W, _w3:w3, _nhat:nhat, _dung:dung, q:cap('Cân 1')+f1+cap('Cân 2')+f2+cap('Cân 3')+f3+'<div>Cân 1 và cân 2 thăng bằng. Ở cân 3, đĩa chứa túi C '+(nhat ? 'thấp hơn' : 'cao hơn')+' đĩa chứa túi B. Túi nào '+(nhat ? 'nặng nhất' : 'nhẹ nhất')+'?</div>', choices:ch, correct:2, sai:sai, goiY:gy({'nham-cao-thap':'Túi A và túi B nặng bằng nhau. Đĩa thấp hơn thì nặng hơn, đĩa cao hơn thì nhẹ hơn.'})};
  }, check:function(q){
    if(q._lv<=1){ var d=docCanNhieu(q.q)[0]; if(!d) return false; var t=tongBen(d.items,'t'), p=tongBen(d.items,'p'); return (t>p)===(d.nghieng==='trai') && t!==p && q._dung===(t>p ? 'Bên trái' : 'Bên phải') && kiemMCQ(q); }
    var f=docCanNhieu(q.q); if(f.length!==3) return false;
    var a=tongBen(f[0].items,'p'), b=tongBen(f[1].items,'p')-tongBen(f[1].items,'t'); if(f[0].nghieng!=='can' || f[1].nghieng!=='can' || a!==b || a!==q._m) return false;
    var kq = f[2].nghieng==='trai' ? 'nang' : (f[2].nghieng==='phai' ? 'nhe' : null); return (q._lv===2 ? kq==='nang' : true) && kq===(q._nhat ? 'nang' : 'nhe') && kiemMCQ(q) && q._dung==='Túi C'; }},

  /* D5 — Chỉ đơm cúc áo (Tiết 1, bài 3) */
  {name:'Chỉ đơm cúc áo', sec:'Tiết 1, bài 3 — Cô Ba đơm 1 chiếc cúc áo hết 70 mm chỉ: 5 chiếc hết bao nhiêu mi-li-mét', mt:['MT3'], levels:3,
   muc:['Đơm k chiếc cúc, mỗi chiếc hết a mm chỉ: tất cả bao nhiêu mm.', 'Biết tất cả, chia đều: mỗi chiếc hết bao nhiêu mm.', 'Cuộn chỉ dài L mm: đơm k chiếc cúc, còn lại bao nhiêu mm.'],
   make:function(lv){
    var a=10*rnd(3,9), k=rnd(2,8), g=0, L; while(a*k>700) k--; var T=a*k;
    if(lv<=1) return {type:'num', _lv:1, _a:a, _k:k, q:'<div>Cô Ba đơm một chiếc cúc áo hết <b>'+a+' mm</b> chỉ. Cô đơm <b>'+k+' chiếc</b> cúc như vậy. Cô dùng hết bao nhiêu mi-li-mét chỉ?</div>', ans:T, unit:'mm', sai:nhanSai([[a+k,'cong-thay-nhan'],[T+10,'nham-bang'],[T-10,'nham-bang'],[a,'thieu-buoc']], T), goiY:gy()};
    if(lv===2){ return {type:'num', _lv:2, _a:a, _k:k, q:'<div>Cô Ba đơm <b>'+k+' chiếc</b> cúc áo giống nhau hết tất cả <b>'+T+' mm</b> chỉ. Mỗi chiếc cúc hết bao nhiêu mi-li-mét chỉ?</div>', ans:a, unit:'mm', sai:nhanSai([[T-k,'chon-sai-phep'],[T*k,'nham-chieu'],[a+10,'nham-bang'],[a-10,'nham-bang']], a), goiY:gy()}; }
    do{ L=10*rnd(60,100); g++; }while(g<200 && L-T<50);
    return {type:'num', _lv:3, _a:a, _k:k, _L:L, q:'<div>Cuộn chỉ dài <b>'+so(L)+' mm</b>. Cô Ba đơm <b>'+k+' chiếc</b> cúc áo, mỗi chiếc hết <b>'+a+' mm</b> chỉ. Cuộn chỉ còn lại bao nhiêu mi-li-mét?</div>', ans:L-T, unit:'mm', sai:nhanSai([[T,'tra-loi-sai-buoc'],[L+T>1000?0:L+T,'chon-sai-phep'],[L-a,'thieu-buoc'],[L-T+10,'nham-bang']], L-T), goiY:gy({'tra-loi-sai-buoc':'Bé tìm số chỉ đã dùng ('+a+' × '+k+') trước, rồi lấy số chỉ cả cuộn trừ đi.', 'thieu-buoc':'Bé trừ cả '+k+' chiếc cúc, không chỉ một chiếc.'})};
  }, check:function(q){ var a=q._a, k=q._k, T=a*k; if(q._lv<=1) return q.ans===T && T<=700; if(q._lv===2) return q.ans===a && T/k===a; return q.ans===q._L-T && q.ans>=50 && q._L<=1000; }},

  /* D6 — Đong nước bằng hai cốc (Tiết 1, bài 4) */
  {name:'Đong nước bằng hai cốc', sec:'Tiết 1, bài 4 — Hai cốc 150 ml và 400 ml: làm thế nào lấy được 250 ml nước từ thùng', mt:['MT3'], levels:3,
   muc:['Hai cốc 150 ml và 400 ml: lấy 250 ml (chọn cách đúng).', 'Hai cốc khác (200 ml và 500 ml; 100 ml và 400 ml).', 'Lấy một lượng khác (gấp đôi cốc nhỏ; hai cốc gộp lại).'],
   make:function(lv){
    var pairs = lv<=1 ? [[150,400]] : (lv===2 ? [[200,500],[100,400],[150,500],[300,700],[100,600]] : [[150,700],[200,700],[300,800],[100,500]]), pr=pick(pairs), a=pr[0], b=pr[1];
    var P=[['Đổ đầy cốc '+b+' ml rồi rót sang cốc '+a+' ml cho đầy. Lấy phần nước còn lại trong cốc '+b+' ml.', b-a],['Đổ đầy cả hai cốc rồi gộp nước lại.', a+b],['Đổ đầy cốc '+a+' ml, lấy nước trong cốc đó.', a],['Đổ đầy cốc '+b+' ml, lấy nước trong cốc đó.', b],['Đổ đầy cốc '+a+' ml hai lần rồi gộp nước lại.', 2*a]];
    var T = lv<=2 ? b-a : pick([b-a,a+b,2*a]), ok=P.filter(function(p){ return p[1]===T; }); if(ok.length!==1 || new Set(P.map(function(p){ return p[1]; })).size!==5) return BAI.topics[5].make(lv);
    var dung=ok[0], opts=[dung].concat(shuffle(P.filter(function(p){ return p!==dung; })).slice(0,3)); opts=shuffle(opts); var ch=opts.map(function(p){ return p[0]; }), sai={}; opts.forEach(function(p,i){ if(p!==dung) sai[String(i)]='nham-bang'; });
    return {type:'mcq', cot:1, _lv:lv, _a:a, _b:b, _T:T, _ps:opts.map(function(p){ return [p[0],p[1]]; }), _dung:dung[0], q:'<div>Rô-bốt có hai cốc, một cốc <b>'+a+' ml</b> và một cốc <b>'+b+' ml</b>. Rô-bốt cần lấy đúng <b>'+T+' ml</b> nước từ thùng. Cách nào đúng?</div>', choices:ch, correct:ch.indexOf(dung[0]), sai:sai, goiY:gy({'nham-bang':'Bé thử từng cách xem được bao nhiêu mi-li-lít nước: '+b+' − '+a+', '+a+' + '+b+'…'})};
  }, check:function(q){
    var a=q._a, b=q._b, T=q._T, kq=function(c){ if(c.indexOf('hai lần')>0) return 2*a; if(c.indexOf('cả hai cốc')>0) return a+b; if(c.indexOf('rót sang')>0) return b-a; if(c.indexOf('Đổ đầy cốc '+a+' ml,')===0) return a; if(c.indexOf('Đổ đầy cốc '+b+' ml,')===0) return b; return -1; };
    var rs=q.choices.map(kq); return kiemMCQ(q) && q.choices.length===4 && rs.indexOf(-1)<0 && rs.filter(function(x){ return x===T; }).length===1 && kq(q._dung)===T && a<b && b<=1000; }},

  /* D7 — Chuỗi hai bước với số đo (Tiết 2, bài 1) */
  {name:'Chuỗi hai bước', sec:'Tiết 2, bài 1 — 8 ml gấp 3 lần rồi giảm 4 lần; 42 g giảm 3 lần rồi gấp 5 lần; 20 mm gấp 2 lần rồi giảm 8 lần', mt:['MT1'], levels:3,
   muc:['Một phép gấp, giảm, thêm hoặc bớt với số đo.', 'Hai phép liền nhau: gấp rồi giảm, giảm rồi gấp (số đo nhỏ).', 'Hai phép liền nhau hỗn hợp: gấp rồi thêm, giảm rồi bớt.'],
   make:function(lv){
    var u=pick(DON)[0], l1, l2, v, k1, k2, g=0, mid, end;
    if(lv<=1){ do{ l1=pick(['gap','giam','them','bot']); k1 = l1==='gap' ? rnd(2,5) : (l1==='giam' ? rnd(2,5) : 10*rnd(1,9)); v = l1==='giam' ? k1*rnd(3,14) : rnd(5,60); g++; }while(g<500 && !okPhep(l1,v,k1) || (l1==='bot' && v<=k1));
      var a1=ap(l1,v,k1); return {type:'num', _lv:1, _o:[[l1,k1]], _v:v, q:soDoGT([{v:v},{v:null}], [cuaChu(l1,k1)])+'<div>Số đo <b>'+v+' '+u+'</b> đi qua phép <b>'+cuaChu(l1,k1)+'</b>. Số ở ô <b class="text-amber-700">?</b> là bao nhiêu '+u+'?</div>', ans:a1, unit:u, sai:nhanSai(nhamPhep(l1,v,k1).concat([[k1,'dao-vai'],[a1+10,'nham-bang']]), a1), goiY:gy()}; }
    do{ g++;
      var pr = lv===2 ? pick([['gap','giam'],['giam','gap']]) : pick([['gap','them'],['giam','bot'],['gap','bot'],['giam','them']]); l1=pr[0]; l2=pr[1];
      k1 = l1==='gap' ? rnd(2,5) : (l1==='giam' ? rnd(2,6) : 10*rnd(1,9)); k2 = l2==='gap' ? rnd(2,5) : (l2==='giam' ? rnd(2,8) : 10*rnd(1,9));
      v = l1==='giam' ? k1*rnd(3,14) : rnd(6,40); if(!okPhep(l1,v,k1)) continue; mid=ap(l1,v,k1); if(!okPhep(l2,mid,k2)) continue; end=ap(l2,mid,k2);
    }while(g<3000 && !(okPhep(l1,v,k1) && okPhep(l2,mid,k2) && end!==mid && end!==v && mid<=1000));
    var sai=nhamPhep(l2,mid,k2).concat([[mid,'thieu-buoc'],[end+10,'nham-bang'],[end-10,'nham-bang']]);
    return {type:'num', _lv:lv, _o:[[l1,k1],[l2,k2]], _v:v, q:soDoGT([{v:v},{v:''},{v:null}], [cuaChu(l1,k1), cuaChu(l2,k2)])+'<div>Số đo <b>'+v+' '+u+'</b> đi qua hai phép liền nhau. Số ở ô <b class="text-amber-700">?</b> cuối cùng là bao nhiêu '+u+'? (Ô nét đứt ở giữa là kết quả của phép đầu.)</div>', ans:end, unit:u, sai:nhanSai(sai, end), goiY:gy({'thieu-buoc':'Hai phép nối nhau: ô giữa là kết quả của phép đầu, ô cuối là kết quả của phép sau.'})};
  }, check:function(q){
    var o=q._o, r=q._v, i; for(i=0;i<o.length;i++){ if(!okPhep(o[i][0], r, o[i][1])) return false; r=ap(o[i][0], r, o[i][1]); }
    return q.ans===r && o.length===(q._lv<=1 ? 1 : 2) && r<=1000; }},

  /* D8 — Tính nhanh (trò chơi Dế mèn phiêu lưu kí) */
  {name:'Tính nhanh', sec:'Trò chơi "Dế mèn phiêu lưu kí" — Các ô phép tính: ô nào có kết quả 100', mt:['MT4'], levels:3,
   muc:['Ô nào có kết quả 100 (chọn một trong bốn).', 'Trong sáu ô, có mấy ô có kết quả 100.', 'Trong tám ô, có mấy ô có kết quả 100.'],
   make:function(lv){
    var T=100, dung=GAME.filter(function(t){ return tinhBT(t)===T; }), khac=GAME.filter(function(t){ return tinhBT(t)!==T; }), sl = lv<=1 ? 4 : (lv===2 ? 6 : 8), nd = lv<=1 ? 1 : pick([2,3]);
    var d=shuffle(dung.slice()).slice(0,nd), kh=shuffle(khac.slice()), ds=[], i;
    for(i=0;i<kh.length && ds.length<sl-nd;i++){ if(ds.every(function(x){ return tinhBT(x)!==tinhBT(kh[i]); })) ds.push(kh[i]); }
    ds=shuffle(d.concat(ds));
    if(lv<=1) return {type:'mcq', cot:1, _lv:1, _ds:ds, _dung:d[0], q:theTinh(ds)+'<div>Mỗi thẻ là một số đo cùng đơn vị. Phép tính nào có kết quả bằng <b class="text-2xl text-orange-600">100</b>?</div>', choices:ds, correct:ds.indexOf(d[0]), goiY:gy({'chung':'Bé tính kết quả của từng thẻ, rồi tìm thẻ bằng 100.'})};
    var dem=ds.filter(function(t){ return tinhBT(t)===T; }).length;
    return {type:'num', _lv:lv, _ds:ds, q:theTinh(ds)+'<div>Mỗi thẻ là một số đo cùng đơn vị. Có bao nhiêu thẻ có kết quả bằng <b class="text-2xl text-orange-600">100</b>?</div>', ans:dem, unit:'thẻ', sai:nhanSai([[dem+1,'dem-sot-phep'],[dem-1,'dem-sot-phep'],[dem+2,'dem-sot-phep']], dem), goiY:gy()};
  }, check:function(q){
    var ds=q._ds, v=ds.map(function(t){ return tinhBT(t); }); if(!v.every(Number.isInteger) || v.some(function(x){ return x<=0 || x>1000; }) || docThe(q.q).join('|')!==ds.join('|')) return false;
    var dem=v.filter(function(x){ return x===100; }).length;
    if(q._lv<=1) return kiemMCQ(q) && ds.length===4 && dem===1 && tinhBT(q._dung)===100;
    return q.ans===dem && ds.length===(q._lv===2 ? 6 : 8) && dem>=2 && dem<=3; }},

  /* D9 — Bạn nói đúng hay sai (không có trong SGK) */
  {name:'Bạn nói đúng hay sai', sec:'Tìm lỗi — Đúng / Sai một phép tính; bạn An tính ba số; bạn An nói hộp quà nặng bao nhiêu', mt:['MT4'], levels:3,
   muc:['Đúng / Sai: một phép tính với số đo.', 'Bạn An tính ba số: em thấy thế nào.', 'Bạn An nói hộp quà nặng bao nhiêu gam: em thấy thế nào.'],
   make:function(lv){
    var u=pick(DON)[0];
    if(lv<=1){ var cong=Math.random()<0.5, a=cong ? rnd(120,480) : rnd(300,900), b=cong ? rnd(21,89) : rnd(60,190), e=cong ? a+b : a-b, dung=Math.random()<0.5, x = dung ? e : pick([e+10,e-10,e+100]);
      return {type:'mcq', figFn:dsBtn35, _lv:1, _a:a, _b:b, _cong:cong, _x:x, _dung:(x===e?'Đ':'S'), q:'<div class="text-xl font-extrabold text-orange-700 my-2">'+a+' '+u+(cong ? ' + ' : ' − ')+b+' '+u+' = '+x+' '+u+'.</div><div class="text-base text-slate-500">Đúng (Đ) hay sai (S)?</div>', choices:['Đ','S'], correct:(x===e?0:1), sai:(x===e?{}:{'0':'nham-bang'}), goiY:gy()}; }
    if(lv===2){ var a2=rnd(21,59), b2=100-a2, c2=10*rnd(1,9), s=a2+b2, T=s-c2, U=s+c2, ok=Math.random()<0.5, dungC, saiC;
      if(ok){ dungC='Đồng ý, vì '+a2+' + '+b2+' = '+s+' và '+s+' − '+c2+' = '+T; saiC='Không đồng ý, vì '+a2+' + '+b2+' = '+s+' và '+s+' + '+c2+' = '+U; }
      else { dungC='Không đồng ý, vì '+a2+' + '+b2+' = '+s+' và '+s+' − '+c2+' = '+T; saiC='Đồng ý, vì '+a2+' + '+b2+' = '+s+' và '+s+' + '+c2+' = '+U; }
      var ch=shuffle([dungC,saiC]), x2=ok ? T : U, s2={}; s2[String(1-ch.indexOf(dungC))]='chon-sai-phep';
      return {type:'mcq', cot:1, _lv:2, _a:a2, _b:b2, _c:c2, _x:x2, _dung:dungC, q:nguoi('boy','Bạn An')+'<div>Bạn An tính: «<b>'+a2+' '+u+' + '+b2+' '+u+' − '+c2+' '+u+' = '+x2+' '+u+'</b>.» Em thấy thế nào?</div>', choices:ch, correct:ch.indexOf(dungC), sai:s2, goiY:gy({'chon-sai-phep':'Bé làm lần lượt từ trái sang phải; dấu trừ là bớt đi.'})}; }
    var L=pick([100,200,50]), R=pick([500,300,400]), hop=R-L, ok3=Math.random()<0.5, x3 = ok3 ? hop : R+L, dungC3, saiC3;
    if(ok3){ dungC3='Đồng ý, vì '+R+' − '+L+' = '+hop; saiC3='Không đồng ý, vì '+R+' + '+L+' = '+(R+L); } else { dungC3='Không đồng ý, vì '+R+' − '+L+' = '+hop; saiC3='Đồng ý, vì '+R+' + '+L+' = '+(R+L); }
    var ch3=shuffle([dungC3,saiC3]), s3={}; s3[String(1-ch3.indexOf(dungC3))]='chon-sai-phep';
    return {type:'mcq', cot:1, _lv:3, _L:L, _R:R, _x:x3, _dung:dungC3, q:nguoi('boy','Bạn An')+'<div>Cân thăng bằng. Bên trái có quả cân <b>'+L+' g</b> và hộp quà, bên phải có quả cân <b>'+R+' g</b>. Bạn An nói: «Hộp quà nặng <b>'+x3+' g</b>.» Em thấy thế nào?</div>', choices:ch3, correct:ch3.indexOf(dungC3), sai:s3, goiY:gy({'chon-sai-phep':'Hai bên nặng bằng nhau: hộp quà nặng bằng bên phải trừ quả cân bên trái.'})};
  }, check:function(q){
    if(q._lv<=1){ var e=q._cong ? q._a+q._b : q._a-q._b; return q.choices.join()==='Đ,S' && (q._dung==='Đ')===(q._x===e) && q.correct===(q._x===e?0:1); }
    var eq=/(\d+) ([+−]) (\d+) = (\d+)/g, okEq=q.choices.every(function(c){ var m, n=0, ok=true; eq.lastIndex=0; while((m=eq.exec(c))){ n++; var x=+m[1], y=+m[3], r=+m[4]; if(m[2]==='+' ? x+y!==r : x-y!==r) ok=false; } return ok && n>=1; });
    if(q._lv===2){ var T=q._a+q._b-q._c, agree=(q._x===T); return okEq && kiemMCQ(q) && q.choices.length===2 && /^Đồng ý/.test(q._dung)===agree && q._a+q._b===100; }
    var hop=q._R-q._L, ag=(q._x===hop); return okEq && kiemMCQ(q) && q.choices.length===2 && /^Đồng ý/.test(q._dung)===ag && q._dung.indexOf(q._R+' − '+q._L+' = '+hop)>0; }}
 ]
};
