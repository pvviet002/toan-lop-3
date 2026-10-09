/* bai-31.js — Bài 31: Gam. BÀI MỚI, Engine v2 — LUYỆN THÔNG MINH.
   Theo bảng phân tích sư phạm (phan-tich-su-pham/bai-31.md): 4 MỤC TIÊU (muctieu) × 10 DẠNG (topics), mỗi dạng 3 mức (Thông tư 27).
   Lỗi lớn nhất: nhầm gam với ki-lô-gam (200 g khác 200 kg), nhầm bội (1 kg = 100 g), quên đổi đơn vị.
   D6 phục vụ MT3 và MT4: make(lv, mt) và q.mt đúng mục tiêu. Số đo tới 1 000 (đổi đơn vị có thể ra 1 000 trở lên); viết "1 000"; không số thập phân, không phân số.
   Hình mới viết ngay trong file này (không sửa figures.js): quaCan (hàng quả cân, data-dem="can"), canDia (cân đĩa thăng bằng), canDongHo (cân đồng hồ, kim data-g).
   Mọi số trong hình do mã tính; check() đọc lại từ chuỗi SVG.
   QUY TẮC: nối chuỗi, KHÔNG backtick và KHÔNG template literal. */

/* ---- Tiện ích chung ---- */
function nhanSai(ds, dung){ var o={}; ds.forEach(function(p){ var v=p[0]; if(Number.isInteger(v) && v>0 && v!==dung && !(String(v) in o)) o[String(v)]=p[1]; }); return o; }
function kiemMCQ(q){ return q.choices[q.correct]===q._dung && new Set(q.choices).size===q.choices.length; }
function dsBtn31(ch){ return '<span class="text-2xl font-extrabold text-slate-700">'+ch+'</span><span class="ml-2 text-base font-bold text-slate-600">'+(ch==='Đ'?'Đúng':'Sai')+'</span>'; }
function svgX(w, h, px){ return svgHinh(w, h, px).replace('<svg ', '<svg class="text-slate-700" '); }
function demDem(s, loai){ var m=String(s).match(new RegExp('data-dem="'+loai+'"', 'g')); return m ? m.length : 0; }
function khungHinh(s){ return '<div class="flex justify-center my-2">'+s+'</svg></div>'; }
function nguoi(ten, alt){ return '<div class="flex justify-center mb-1">'+anh(ten, 72, alt)+'</div>'; }
function kyHieu(nhan, bt){ return '<div class="text-slate-500 mb-1">'+nhan+'</div><div class="text-3xl font-extrabold text-orange-600">'+bt+'</div>'; }
function so(n){ return n>=1000 ? Math.floor(n/1000)+' '+('00'+(n%1000)).slice(-3) : String(n); }
var GOI={'nham-g-kg':'1 kg nặng bằng 1 000 g. Gam là đơn vị nhỏ, dùng cho vật nhẹ; ki-lô-gam dùng cho vật nặng hơn.', 'nham-boi':'1 kg = 1 000 g.', 'quen-doi':'Muốn cộng trừ hay so sánh, bé đổi về cùng gam: 1 kg = 1 000 g.',
  'nham-bang':'Bé tính lại cho đúng nhé!', 'cong-thay-nhan':'Nhân với một số, không phải cộng.', 'chon-sai-phep':'Bé đọc kỹ: cả hai thì cộng, hơn thì trừ, chia đều thì chia.', 'thieu-buoc':'Bài này cần làm đủ các bước nhé!',
  'dao-vai':'Bé xem lại: ô trả lời là số nào?', 'dem-sot-phep':'Bé đếm lại các quả cân nhé!'};
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

/* ---- Hình mới 1 (D1): hàng n quả cân 100 g (5 quả một hàng); mỗi quả data-dem="can" ---- */
function quaCan(n){
  var moi=5, hang=Math.ceil(n/moi), W=moi*56+56, H=hang*56+28, s=svgX(W,H), i;
  for(i=0;i<n;i++){ var cx=28+28+(i%moi)*56, cy=14+28+Math.floor(i/moi)*56;
    s+='<circle data-dem="can" cx="'+cx+'" cy="'+cy+'" r="25" fill="'+HM.xam+'" stroke="currentColor" stroke-width="2.5"/>'
      +'<text x="'+cx+'" y="'+(cy+6)+'" text-anchor="middle" font-size="16" '+HFONT+' fill="'+HM.chu+'">100 g</text>'; }
  return khungHinh(s);
}

/* ---- Hình mới 2 (D3, D4): cân đĩa thăng bằng. Mỗi bên là danh sách vật: {g, k:'can'} quả cân có nhãn; {g, k:'goi', an:true} gói hàng (an = hiện "?");
   {g, k:'ho'} chỗ trống nét đứt "?" (quả cân còn thiếu). Mỗi vật rect có data-g, data-s (t = trái, p = phải), data-k. Tổng hai bên luôn bằng nhau. ---- */
function canDia(trai, phai){
  var W=390, H=216, xL=104, xR=286, yBeam=62, yPan=158, s=svgX(W,H);
  s+='<path d="M'+xL+' '+yBeam+' H'+xR+'" fill="none" stroke="currentColor" stroke-width="4" stroke-linecap="round"/>'
    +'<path d="M195 '+yBeam+' V200 M155 204 H235" fill="none" stroke="currentColor" stroke-width="5" stroke-linecap="round"/>'
    +'<path d="M'+xL+' '+yBeam+' L24 '+yPan+' M'+xL+' '+yBeam+' L184 '+yPan+' M'+xR+' '+yBeam+' L206 '+yPan+' M'+xR+' '+yBeam+' L366 '+yPan+'" fill="none" stroke="currentColor" stroke-width="1.8" opacity=".5"/>'
    +'<path d="M24 '+yPan+' H184 Q184 '+(yPan+16)+' 104 '+(yPan+16)+' Q24 '+(yPan+16)+' 24 '+yPan+'" fill="'+HM.vang+'" fill-opacity="0.5" stroke="currentColor" stroke-width="2.5"/>'
    +'<path d="M206 '+yPan+' H366 Q366 '+(yPan+16)+' 286 '+(yPan+16)+' Q206 '+(yPan+16)+' 206 '+yPan+'" fill="'+HM.vang+'" fill-opacity="0.5" stroke="currentColor" stroke-width="2.5"/>';
  function xep(ds, cx, side){
    var n=ds.length, o='', pos=[], i;
    var w=function(d){ return d.k==='goi' ? 74 : 62; }, h=function(d){ return d.k==='goi' ? 46 : 32; };
    if(n===1) pos=[[cx,0]]; else if(n===2) pos=[[cx-34,0],[cx+34,0]]; else pos=[[cx-34,0],[cx+34,0],[cx,1]];
    for(i=0;i<n;i++){ var d=ds[i], ww=w(d), hh=h(d), x=pos[i][0]-ww/2, y=yPan-hh-pos[i][1]*34, tx=pos[i][0], ty=y+hh/2+6;
      if(d.k==='ho') o+='<rect data-g="'+d.g+'" data-s="'+side+'" data-k="ho" x="'+x+'" y="'+y+'" width="'+ww+'" height="'+hh+'" rx="6" fill="none" stroke="'+HM.hoi+'" stroke-width="2.5" stroke-dasharray="5 3"/><text x="'+tx+'" y="'+ty+'" text-anchor="middle" font-size="20" '+HFONT+' fill="'+HM.hoi+'">?</text>';
      else if(d.k==='goi') o+='<rect data-g="'+d.g+'" data-s="'+side+'" data-k="goi" x="'+x+'" y="'+y+'" width="'+ww+'" height="'+hh+'" rx="8" fill="'+HM.cam+'" fill-opacity="0.55" stroke="currentColor" stroke-width="2.5"/><text x="'+tx+'" y="'+(ty+(d.an?2:0))+'" text-anchor="middle" font-size="'+(d.an?24:18)+'" '+HFONT+' fill="'+(d.an?HM.hoi:HM.chu)+'">'+(d.an?'?':d.g+' g')+'</text>';
      else o+='<rect data-g="'+d.g+'" data-s="'+side+'" data-k="can" x="'+x+'" y="'+y+'" width="'+ww+'" height="'+hh+'" rx="6" fill="'+HM.xam+'" stroke="currentColor" stroke-width="2.5"/><text x="'+tx+'" y="'+ty+'" text-anchor="middle" font-size="18" '+HFONT+' fill="'+HM.chu+'">'+d.g+' g</text>'; }
    return o;
  }
  s+=xep(trai, xL, 't')+xep(phai, xR, 'p');
  return khungHinh(s);
}
function docCan(s){ var o=[], re=/<rect data-g="(\d+)" data-s="(\w)" data-k="(\w+)"/g, m; while((m=re.exec(String(s)))) o.push({g:+m[1], s:m[2], k:m[3]}); return o; }
function tongBen(o, s){ var t=0; o.forEach(function(d){ if(d.s===s) t+=d.g; }); return t; }

/* ---- Hình mới 3 (D5, D6): mặt cân đồng hồ nửa vòng, vạch mỗi 50 g, số ở 0, 250, 500, 750, 1 kg; kim chỉ g (data-g) ---- */
function canDongHo(g){
  var W=340, H=178, cx=170, cy=146, R=92, s=svgX(W,H), v;
  s+='<path d="M'+(cx-R)+' '+cy+' A'+R+' '+R+' 0 0 1 '+(cx+R)+' '+cy+'" fill="'+HM.vang+'" fill-opacity="0.3" stroke="currentColor" stroke-width="3"/>'
    +'<path d="M'+(cx-R-8)+' '+cy+' H'+(cx+R+8)+'" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"/><rect x="'+(cx-34)+'" y="'+(cy+4)+'" width="68" height="14" rx="5" fill="'+HM.xam+'" stroke="currentColor" stroke-width="2.5"/>';
  for(v=0;v<=1000;v+=50){ var a=Math.PI-Math.PI*v/1000, c=Math.cos(a), sn=Math.sin(a), len = v%250===0 ? 16 : 8;
    s+='<line x1="'+(cx+R*c).toFixed(1)+'" y1="'+(cy-R*sn).toFixed(1)+'" x2="'+(cx+(R-len)*c).toFixed(1)+'" y2="'+(cy-(R-len)*sn).toFixed(1)+'" stroke="currentColor" stroke-width="'+(v%250===0 ? 2.6 : 1.5)+'" stroke-linecap="round"/>';
    if(v%250===0) s+='<text x="'+(cx+(v===0||v===1000 ? R : R+24)*c).toFixed(1)+'" y="'+(v===0||v===1000 ? cy+26 : cy-(R+24)*sn+6).toFixed(1)+'" text-anchor="middle" font-size="17" '+HFONT+' fill="currentColor">'+(v===1000 ? '1 kg' : v)+'</text>'; }
  var ag=Math.PI-Math.PI*g/1000;
  s+='<line data-g="'+g+'" data-kim="1" x1="'+cx+'" y1="'+cy+'" x2="'+(cx+74*Math.cos(ag)).toFixed(1)+'" y2="'+(cy-74*Math.sin(ag)).toFixed(1)+'" stroke="'+HM.do+'" stroke-width="4.5" stroke-linecap="round"/>'
    +'<circle cx="'+cx+'" cy="'+cy+'" r="3" fill="none" stroke="currentColor" stroke-width="9"/>';
  return khungHinh(s);
}
function docKim(s){ var m=/data-g="(\d+)" data-kim="1"/.exec(String(s)); return m ? +m[1] : null; }
function tenVat(ten, hinh){ return '<div class="text-center font-extrabold text-slate-700 mt-1">'+ten+'</div>'+hinh; }

var DONG_VAT=[['Con gà',2,'kg'],['Con chó',20,'kg'],['Con chim sẻ',200,'g'],['Con bò',200,'kg'],['Quả táo',200,'g'],['Quyển vở',100,'g']];

var BAI = {
 n: 31,
 title: 'Gam',
 sub: 'Luyện thông minh: câu hỏi tự đổi theo bé — làm hết lượt để xem ngọn lửa!',
 goal: 10, soCau: 18, soCauToiDa: 24,
 loi: {'nham-g-kg':'Nhầm gam với ki-lô-gam', 'nham-boi':'Nhầm bội của đơn vị (10, 100, 1 000)', 'quen-doi':'Quên đổi đơn vị', 'dem-sot-phep':'Đếm sót hoặc thừa quả cân'},
 muctieu: [
  {id:'MT1', ten:'Gam và ki-lô-gam', muc:['Quả cân 100 g; 1 kg = ? g; gói kẹo 100 g hay 100 kg.', '2 kg = ? g; 3 000 g = ? kg; bao gạo, cuốn vở: g hay kg.', 'Đổi số lớn (7 kg = ? g); mấy quả cân 100 g cân được 700 g; 800 g và 1 kg.']},
  {id:'MT2', ten:'Cân đĩa, cân đồng hồ', muc:['Cân đĩa: gói nặng bằng một quả cân; kim chỉ đúng vạch 500 g.', 'Cân thăng bằng: tổng các quả cân (100 g + 50 g); kim chỉ vạch 250 g, 750 g.', 'Ba quả cân; quả cân còn thiếu; kim giữa hai vạch.']},
  {id:'MT3', ten:'Tính với gam', muc:['250 g + 300 g; tính với số đo trên cân.', '740 g − 360 g; 15 g × 4; 40 g : 5.', 'Số lớn (386 g + 214 g; 25 g × 3; 96 g : 4); nhân số đo.']},
  {id:'MT4', ten:'Ước lượng và vận dụng', muc:['Táo 500 g, bột mì 250 g: cả hai; con gà nặng khoảng 2 kg; 1 kg = 1 000 g đúng hay sai.', 'Táo nặng hơn bột mì bao nhiêu gam; con chim sẻ, quả táo; bạn nói 200 g nặng hơn 2 kg.', 'Chọn phép tính; câu nào hợp lí; bạn nói 3 kg bằng 300 g.']}
 ],
 topics: [
  /* D1 — Quả cân 100 g (Khám phá) */
  {name:'Quả cân 100 g', sec:'Khám phá — Quả cân 100 g; 10 quả cân 100 g nặng 1 kg', mt:['MT1'], levels:3,
   muc:['Có vài quả cân 100 g: tất cả nặng bao nhiêu gam.', 'Đếm các quả cân trong hình rồi tính (tới 10 quả).', 'Mấy quả cân 100 g cân được số gam cho trước.'],
   make:function(lv){
    var n, ans, fig='', cau;
    if(lv<=1){ n=rnd(2,5); ans=100*n; fig=quaCan(n); cau='Mỗi quả cân nặng <b>100 g</b>. Các quả cân trong hình nặng tất cả bao nhiêu gam?'; }
    else if(lv===2){ n=rnd(6,10); ans=100*n; fig=quaCan(n); cau='Mỗi quả cân nặng <b>100 g</b>. Các quả cân trong hình nặng tất cả bao nhiêu gam?'; }
    else { n=rnd(3,9); ans=n; cau='Cần mấy quả cân <b>100 g</b> để cân được <b>'+so(100*n)+' g</b>?'; }
    var sai = lv<=2 ? [[n,'dem-sot-phep'],[ans-100,'dem-sot-phep'],[ans+100,'dem-sot-phep'],[10*n,'nham-boi']] : [[100*n,'dao-vai'],[n+1,'dem-sot-phep'],[n-1,'dem-sot-phep'],[10*n,'nham-boi']];
    return {type:'num', _lv:lv, _n:n, _fig:!!fig, q:fig+'<div>'+cau+'</div>', ans:ans, unit: lv<=2 ? 'g' : 'quả cân', sai:nhanSai(sai, ans), goiY:gy()};
  }, check:function(q){
    if(q._fig && demDem(q.q,'can')!==q._n) return false; if(!q._fig && q._lv<3) return false;
    return q.ans===(q._lv<=2 ? 100*q._n : q._n) && q._n<=10; }},

  /* D2 — Đổi kg và g (Khám phá) */
  {name:'Đổi kg và g', sec:'Khám phá — 1 kg = 1 000 g', mt:['MT1'], levels:3,
   muc:['1 kg = ? g; 1 000 g = ? kg.', '2 kg = ? g; 3 000 g = ? kg.', '5 kg = ? g; 7 000 g = ? kg.'],
   make:function(lv){
    var k = lv<=1 ? 1 : (lv===2 ? rnd(2,3) : rnd(4,9)), dir=Math.random()<0.5, ans, bt, sai;
    if(dir){ ans=1000*k; bt=k+' kg = '+oHoi()+' g'; sai=[[100*k,'nham-boi'],[k,'quen-doi'],[10*k,'nham-boi'],[1000*k+100,'nham-bang']]; }
    else { ans=k; bt=so(1000*k)+' g = '+oHoi()+' kg'; sai=[[1000*k,'quen-doi'],[100*k,'nham-boi'],[10*k,'nham-boi'],[k+1,'nham-bang']]; }
    return {type:'num', _lv:lv, _k:k, _dir:dir, q:kyHieu('Đổi đơn vị', bt), ans:ans, sai:nhanSai(sai, ans), goiY:gy()};
  }, check:function(q){ return q.ans===(q._dir ? 1000*q._k : q._k) && q._k>=1 && q._k<=9; }},

  /* D3 — Cân đĩa: gói nặng bao nhiêu (Hoạt động 1) */
  {name:'Cân đĩa: gói nặng bao nhiêu', sec:'Hoạt động 1 — Cân đĩa thăng bằng: gói hàng nặng bao nhiêu gam', mt:['MT2'], levels:3,
   muc:['Một quả cân bên kia (500 g).', 'Hai quả cân (100 g + 50 g).', 'Ba quả cân (200 g + 100 g + 50 g).'],
   make:function(lv){
    var n = lv<=1 ? 1 : (lv===2 ? 2 : 3), pool=lv<=1 ? [100,200,500] : [20,50,100,200,500], ds=[], i;
    for(i=0;i<n;i++) ds.push({g:pick(pool), k:'can'});
    var T=ds.reduce(function(a,d){ return a+d.g; },0); if(T>900) return BAI.topics[2].make(lv);
    var sai = n===1 ? [[ds[0].g*2,'nham-bang'],[ds[0].g/10,'nham-boi'],[ds[0].g+100,'nham-bang']] : [[T-ds[0].g,'thieu-buoc'],[T+ds[0].g,'nham-bang'],[T+10,'nham-bang'],[ds[0].g,'thieu-buoc']];
    return {type:'num', _lv:lv, _T:T, q:canDia(ds, [{g:T,k:'goi',an:true}])+'<div>Cân đĩa thăng bằng. Gói hàng nặng bao nhiêu gam?</div>', ans:T, unit:'g', sai:nhanSai(sai, T),
      goiY:gy({'thieu-buoc':'Bé cộng tất cả các quả cân ở bên trái.', 'nham-bang':'Cân thăng bằng: hai bên nặng bằng nhau.'})};
  }, check:function(q){
    var d=docCan(q.q), t=tongBen(d,'t'), p=tongBen(d,'p'); return t===p && d.filter(function(x){ return x.k==='goi' && x.s==='p'; }).length===1 && q.ans===t && t<=900 && d.filter(function(x){ return x.s==='t'; }).length===(q._lv<=1 ? 1 : (q._lv===2 ? 2 : 3)); }},

  /* D4 — Cộng quả cân (Hoạt động 1) */
  {name:'Cộng quả cân', sec:'Hoạt động 1 — 100 g + 50 g = 150 g; 20 g + 20 g = 40 g; 200 g + 200 g = 400 g', mt:['MT2'], levels:3,
   muc:['Hai quả cân giống nhau (20 g + 20 g).', 'Hai quả cân (200 g + 200 g; 100 g + 50 g).', 'Gói đã biết số gam: thiếu quả cân nào để thăng bằng.'],
   make:function(lv){
    var a, b, T, ds, ds2, ans, cau, sai;
    if(lv<=1){ a=pick([20,50,100,200]); T=2*a; ds=[{g:a,k:'can'},{g:a,k:'can'}]; ds2=[{g:T,k:'goi',an:true}]; ans=T; cau='Hai quả cân bên trái nặng bao nhiêu gam?'; sai=[[a,'thieu-buoc'],[a*3,'nham-bang'],[T+10,'nham-bang']]; }
    else if(lv===2){ var p=pick([[200,200],[100,50],[500,100],[200,50],[100,20],[500,200]]); a=p[0]; b=p[1]; T=a+b; ds=[{g:a,k:'can'},{g:b,k:'can'}]; ds2=[{g:T,k:'goi',an:true}]; ans=T; cau='Hai quả cân bên trái nặng bao nhiêu gam?'; sai=[[a,'thieu-buoc'],[Math.abs(a-b),'chon-sai-phep'],[T+10,'nham-bang'],[T-10,'nham-bang']]; }
    else { var q3=pick([[400,200,100],[500,200,100],[300,100,100],[500,300,100],[400,100,200]]); T=q3[0]; a=q3[1]; b=q3[2]; ans=T-a-b; if(ans<=0) return BAI.topics[3].make(lv);
      ds=[{g:T,k:'goi'}]; ds2=[{g:a,k:'can'},{g:b,k:'can'},{g:ans,k:'ho'}]; cau='Cân thăng bằng. Quả cân còn thiếu (ô ?) nặng bao nhiêu gam?'; sai=[[T-a,'thieu-buoc'],[T-b,'thieu-buoc'],[a+b,'chon-sai-phep'],[ans+50,'nham-bang']]; }
    return {type:'num', _lv:lv, _ans:ans, q:canDia(ds, ds2)+'<div>'+cau+'</div>', ans:ans, unit:'g', sai:nhanSai(sai, ans), goiY:gy({'thieu-buoc':'Cân thăng bằng thì hai bên nặng bằng nhau. Bé cộng các quả cân đã có, rồi so với bên kia.'})};
  }, check:function(q){
    var d=docCan(q.q), t=tongBen(d,'t'), p=tongBen(d,'p'); if(t!==p || t>900) return false;
    if(q._lv<=2) return q.ans===t;
    var ho=d.filter(function(x){ return x.k==='ho'; }); return ho.length===1 && q.ans===ho[0].g && q.ans>0; }},

  /* D5 — Cân đồng hồ (Hoạt động 2): kim luôn chỉ đúng vạch có nhãn (250, 500, 750, 1 kg) */
  {name:'Cân đồng hồ', sec:'Hoạt động 2 — Kim cân chỉ vạch 500 g, 250 g, 750 g, 1 kg', mt:['MT2'], levels:3,
   muc:['Kim chỉ đúng vạch 500 g.', 'Kim chỉ vạch 250 g hoặc 750 g.', 'Hai cân đồng hồ: cân nào nặng hơn, hoặc nặng hơn bao nhiêu gam.'],
   make:function(lv){
    var g;
    if(lv<=1) g=500; else if(lv===2) g=pick([250,750,1000,500]);
    if(lv<=2) return {type:'num', _lv:lv, _g:g, q:canDongHo(g)+'<div>Kim của cân đồng hồ chỉ bao nhiêu gam?</div>', ans:g, unit:'g', sai:nhanSai([[1000-g,'dao-vai'],[g+250,'nham-bang'],[g-250,'nham-bang'],[g/10,'nham-g-kg'],[g===1000 ? 1 : g,'nham-g-kg']], g), goiY:gy({'dao-vai':'Bé đọc số ở đúng vạch kim chỉ, tính từ bên trái (0 g).'})};
    var a=pick([250,500,750,1000]), b=pick([250,500,750,1000]); while(b===a) b=pick([250,500,750,1000]);
    var ten=pick([['Túi gạo','Túi đường'],['Quả bưởi','Quả cam'],['Quả bí','Quả dưa']]), fig=tenVat(ten[0],canDongHo(a))+tenVat(ten[1],canDongHo(b));
    if(Math.random()<0.5){ var ch=[ten[0],ten[1]], dung = a>b ? ten[0] : ten[1], sai={}; sai[String(1-ch.indexOf(dung))]='nham-bang';
      return {type:'mcq', cot:1, _lv:3, _a:a, _b:b, _hoi:'hon', _ten:ten, _dung:dung, q:fig+'<div>Hai vật được cân như trong hình. Vật nào nặng hơn?</div>', choices:ch, correct:ch.indexOf(dung), sai:sai, goiY:gy({'nham-bang':'Bé đọc kim của từng cân: kim càng sang phải thì vật càng nặng.'})}; }
    var ans=Math.abs(a-b);
    return {type:'num', _lv:3, _a:a, _b:b, _hoi:'hieu', q:fig+'<div>Hai vật được cân như trong hình. Vật nặng hơn nặng hơn vật nhẹ bao nhiêu gam?</div>', ans:ans, unit:'g', sai:nhanSai([[a+b,'chon-sai-phep'],[Math.max(a,b),'thieu-buoc'],[ans+250,'nham-bang'],[ans-250,'nham-bang']], ans), goiY:gy({'thieu-buoc':'Bé đọc cả hai kim rồi trừ: số lớn trừ số bé.'})};
  }, check:function(q){
    var kims=[], re=/data-g="(\d+)" data-kim="1"/g, m; while((m=re.exec(q.q))) kims.push(+m[1]);
    if(q._lv<=2) return kims.length===1 && kims[0]===q._g && kims[0]%250===0 && q.ans===q._g;
    if(kims.join()!==[q._a,q._b].join() || q._a===q._b || kims.some(function(k){ return k%250!==0 || k<250; })) return false;
    return q._hoi==='hon' ? (kiemMCQ(q) && q._dung===(q._a>q._b ? q._ten[0] : q._ten[1])) : q.ans===Math.abs(q._a-q._b); }},

  /* D6 — Táo và bột mì (Hoạt động 2): phục vụ MT3 và MT4 */
  {name:'Táo và bột mì', sec:'Hoạt động 2 — Quả táo 500 g, túi bột mì 250 g: cả hai nặng bao nhiêu gam', mt:['MT3','MT4'], levels:3,
   muc:['Đọc cân đồng hồ rồi tính: cả hai nặng bao nhiêu; quả táo nặng hơn bao nhiêu.', 'Số khác; chọn phép tính; nặng hơn bao nhiêu gam.', 'Gấp số đo: mấy túi như thế nặng bao nhiêu.'],
   make:function(lv, mt){
    var tt = mt==='MT3' ? 3 : 4, a, b, ans, cau, fig, sai, ten=pick([['Quả táo','Túi bột mì'],['Quả bí','Túi đường'],['Quả dưa','Túi gạo']]);
    var vals=[250,500,750,100,200,300,400];
    if(tt===4){ a=pick([500,750,400,600]); b=pick([250,100,200,150]); while(b>=a){ b=pick([250,100,200,150]); }
      fig=tenVat(ten[0],canDongHo(a))+tenVat(ten[1],canDongHo(b));
      if(lv<=1){ ans=a+b; cau='Hỏi cả hai nặng bao nhiêu gam?'; sai=[[a-b,'chon-sai-phep'],[a,'thieu-buoc'],[ans+50,'nham-bang']]; }
      else if(lv===2){ ans=a-b; cau='Hỏi '+ten[0].toLowerCase()+' nặng hơn '+ten[1].toLowerCase()+' bao nhiêu gam?'; sai=[[a+b,'chon-sai-phep'],[a,'thieu-buoc'],[ans+50,'nham-bang'],[ans-50,'nham-bang']]; }
      else { var dung=a+' − '+b, ds=[[dung,''],[a+' + '+b,'chon-sai-phep'],[a+' × '+b,'cong-thay-nhan'],[a+' : '+b,'chon-sai-phep']];
        shuffle(ds); var ch=ds.map(function(d){ return d[0]; }), sx={}; ds.forEach(function(d,i){ if(d[1]) sx[String(i)]=d[1]; });
        return {type:'mcq', mt:'MT4', cot:1, _lv:3, _tt:4, _a:a, _b:b, _dung:dung, q:fig+'<div>Hỏi '+ten[0].toLowerCase()+' nặng hơn '+ten[1].toLowerCase()+' bao nhiêu gam? Phép tính nào đúng?</div>', choices:ch, correct:ch.indexOf(dung), sai:sx, goiY:gy()}; }
      return {type:'num', mt:'MT4', _lv:lv, _tt:4, _a:a, _b:b, q:fig+'<div>'+ten[0]+' và '+ten[1].toLowerCase()+' như trong hình. '+cau+'</div>', ans:ans, unit:'g', sai:nhanSai(sai, ans), goiY:gy()}; }
    a=pick([250,500,100,200,300,150]);
    if(lv<=1){ b=pick([250,100,200,150]); ans=a+b; cau='Cái cân thứ hai chỉ '+b+' g. Hai vật nặng tất cả bao nhiêu gam?'; sai=[[Math.abs(a-b),'chon-sai-phep'],[ans+50,'nham-bang'],[ans-50,'nham-bang']];
      return {type:'num', mt:'MT3', _lv:lv, _tt:3, _a:a, _b:b, _k:0, q:tenVat(ten[0],canDongHo(a))+'<div>'+cau+'</div>', ans:ans, unit:'g', sai:nhanSai(sai, ans), goiY:gy()}; }
    if(lv===2){ b=pick([50,100,150,200]); while(b>=a) b=pick([50,100]); ans=a-b; cau=ten[0]+' nặng như trong hình. Lấy bớt đi '+b+' g. Còn lại bao nhiêu gam?'; sai=[[a+b,'chon-sai-phep'],[ans+50,'nham-bang'],[ans-50,'nham-bang']];
      return {type:'num', mt:'MT3', _lv:lv, _tt:3, _a:a, _b:b, _k:-1, q:tenVat(ten[0],canDongHo(a))+'<div>'+cau+'</div>', ans:ans, unit:'g', sai:nhanSai(sai, ans), goiY:gy()}; }
    var k=rnd(2,4); a=pick([100,150,200,250]); while(a*k>1000) k--; ans=a*k; sai=[[a+k,'cong-thay-nhan'],[ans+50,'nham-bang'],[ans-50,'nham-bang'],[a*(k-1),'nham-bang']];
    return {type:'num', mt:'MT3', _lv:lv, _tt:3, _a:a, _b:0, _k:k, q:tenVat(ten[1],canDongHo(a))+'<div>Mỗi túi nặng như trong hình. '+k+' túi như vậy nặng bao nhiêu gam?</div>', ans:ans, unit:'g', sai:nhanSai(sai, ans), goiY:gy()};
  }, check:function(q){
    var d=q.q, kims=[], re=/data-g="(\d+)" data-kim="1"/g, m; while((m=re.exec(d))) kims.push(+m[1]);
    if(q._tt===4){ if(kims.join()!==[q._a,q._b].join() || q._a<=q._b) return false; if(q.mt!=='MT4') return false;
      if(q._lv===3) return kiemMCQ(q) && q.choices.filter(function(c){ return tinhBT(c)===q._a-q._b; }).length===1 && tinhBT(q._dung)===q._a-q._b;
      return q.ans===(q._lv<=1 ? q._a+q._b : q._a-q._b); }
    if(q.mt!=='MT3' || kims.length!==1 || kims[0]!==q._a) return false;
    var e = q._lv<=1 ? q._a+q._b : (q._lv===2 ? q._a-q._b : q._a*q._k); return q.ans===e && e>0 && e<=1000; }},

  /* D7 — Tính với gam (Luyện tập 1) */
  {name:'Tính với gam', sec:'Luyện tập 1 — 250 g + 300 g = 550 g; 740 g − 360 g; 40 g : 5 = 8 g; 15 g × 4', mt:['MT3'], levels:3,
   muc:['250 g + 300 g; 20 g + 30 g.', '740 g − 360 g; 15 g × 4; 40 g : 5.', 'Số lớn (386 g + 214 g; 25 g × 3; 96 g : 4).'],
   make:function(lv){
    var kind = lv<=1 ? 'c' : pick(['t','n','ch']), a, b, ans, bt, sai;
    if(lv>=3) kind=pick(['c3','t3','n3','ch3']);
    if(kind==='c'){ a=50*rnd(2,9); b=50*rnd(1,6); if(a+b>900){ a=100; } if(Math.random()<0.4){ a=10*rnd(1,4); b=10*rnd(1,4); } ans=a+b; bt=a+' g + '+b+' g ='+oHoi(); sai=[[ans+10,'nham-bang'],[ans-10,'nham-bang'],[Math.abs(a-b),'chon-sai-phep']]; }
    else if(kind==='t'){ a=10*rnd(30,90); b=10*rnd(10,Math.floor(a/10)-5); ans=a-b; bt=a+' g − '+b+' g ='+oHoi(); sai=[[a+b,'chon-sai-phep'],[ans+10,'nham-bang'],[ans-10,'nham-bang']]; }
    else if(kind==='n'){ a=rnd(12,24); b=rnd(3,4); ans=a*b; bt=a+' g × '+b+' ='+oHoi(); sai=[[a+b,'cong-thay-nhan'],[ans+10,'nham-bang'],[ans-10,'nham-bang']]; }
    else if(kind==='ch'){ b=pick([5,3,2]); ans=rnd(6,16); a=b*ans; bt=a+' g : '+b+' ='+oHoi(); sai=[[a-b,'chon-sai-phep'],[ans+1,'nham-bang'],[ans-1,'nham-bang']]; }
    else if(kind==='c3'){ do{ a=rnd(150,600); b=rnd(100,Math.min(500,990-a)); }while((a%10)+(b%10)<10 && Math.random()<0.8); ans=a+b; bt=a+' g + '+b+' g ='+oHoi(); sai=[[ans-10,'nham-bang'],[ans+10,'nham-bang'],[ans+100,'nham-bang']]; }
    else if(kind==='t3'){ a=rnd(400,990); b=rnd(120,a-100); ans=a-b; bt=a+' g − '+b+' g ='+oHoi(); sai=[[ans+10,'nham-bang'],[ans-10,'nham-bang'],[ans+100,'nham-bang'],[a+b>1000?0:a+b,'chon-sai-phep']]; }
    else if(kind==='n3'){ a=rnd(21,32); b=3; while(a*b>=100) a--; ans=a*b; bt=a+' g × '+b+' ='+oHoi(); sai=[[a+b,'cong-thay-nhan'],[ans+10,'nham-bang'],[ans-10,'nham-bang']]; }
    else { b=pick([4,6]); ans=rnd(14,24); a=b*ans; while(a>=100){ ans--; a=b*ans; } bt=a+' g : '+b+' ='+oHoi(); sai=[[a-b,'chon-sai-phep'],[ans+1,'nham-bang'],[ans-1,'nham-bang']]; }
    return {type:'num', _lv:lv, _kind:kind, _a:a, _b:b, q:kyHieu('Tính', bt), ans:ans, unit:'g', sai:nhanSai(sai, ans), goiY:gy()};
  }, check:function(q){
    var a=q._a, b=q._b, k=q._kind, e = (k==='c'||k==='c3') ? a+b : ((k==='t'||k==='t3') ? a-b : ((k==='n'||k==='n3') ? a*b : a/b));
    return q.ans===e && Number.isInteger(e) && e>0 && e<=1000 && a<=1000; }},

  /* D8 — Ước lượng cân nặng (Luyện tập 2: đổi thành chọn một) */
  {name:'Ước lượng cân nặng', sec:'Luyện tập 2 — Con gà, con chó, con chim sẻ, con bò nặng khoảng bao nhiêu', mt:['MT4'], levels:3,
   muc:['Con vật nặng khoảng bao nhiêu (ba đáp án cùng số, khác đơn vị).', 'Quả táo, con chim sẻ, quyển sách, quả trứng (bốn đáp án).', 'Câu nào hợp lí nhất (bốn câu về bốn vật).'],
   make:function(lv){
    var it=pick(DONG_VAT), u2=it[2]==='kg' ? 'g' : 'kg';
    if(lv<=2){ var dung=it[1]+' '+it[2], kg=it[2]==='kg', ds=[[dung,''],[it[1]+' '+u2,'nham-g-kg'],[kg ? (it[1]*100)+' kg' : (it[1]/10)+' kg','nham-boi']]; if(lv===2) ds.push([kg ? (it[1]*10)+' g' : (it[1]*10)+' kg','nham-boi']);
      shuffle(ds); var ch=ds.map(function(d){ return d[0]; }), sai={}; ds.forEach(function(d,i){ if(d[1]) sai[String(i)]=d[1]; });
      return {type:'mcq', cot:1, _lv:lv, _it:it, _dung:dung, q:'<div>'+it[0]+' nặng khoảng bao nhiêu?</div>', choices:ch, correct:ch.indexOf(dung), sai:sai, goiY:gy({'nham-g-kg':'Bé nghĩ vật nhẹ như quả trứng thì dùng gam, vật nặng như con chó thì dùng ki-lô-gam.'})}; }
    var vs=shuffle(DONG_VAT.slice()).slice(0,4), k=rnd(0,3), ch3=[], sai3={};
    vs.forEach(function(v,i){ if(i===k) ch3.push(v[0]+' nặng khoảng '+v[1]+' '+v[2]+'.'); else { ch3.push(v[0]+' nặng khoảng '+v[1]+' '+(v[2]==='kg' ? 'g' : 'kg')+'.'); sai3[String(i)]='nham-g-kg'; } });
    return {type:'mcq', cot:1, _lv:3, _vs:vs, _k:k, _dung:ch3[k], q:'<div>Câu nào đúng với thực tế?</div>', choices:ch3, correct:k, sai:sai3, goiY:gy({'nham-g-kg':'Bé thử nghĩ: một con bò nặng bằng vài quả trứng hay vài trăm ki-lô-gam?'})};
  }, check:function(q){
    if(q._lv<=2){ var it=q._it, g=function(c){ var m=/^(\d+) (g|kg)$/.exec(c); return m ? (+m[1])*(m[2]==='kg' ? 1000 : 1) : 0; }, e=g(q._dung); return kiemMCQ(q) && q._dung===it[1]+' '+it[2] && q.choices.length===(q._lv===1 ? 3 : 4) && q.choices.every(function(c){ if(c===q._dung) return true; var r=g(c)/e; return r>=100 || r<=0.01; }); }
    var vs=q._vs, k=q._k; return kiemMCQ(q) && q.choices.length===4 && q._dung===vs[k][0]+' nặng khoảng '+vs[k][1]+' '+vs[k][2]+'.' && new Set(vs.map(function(v){ return v[0]; })).size===4; }},

  /* D9 — Chọn g hay kg (không có trong SGK) */
  {name:'Chọn g hay kg', sec:'Chọn đơn vị — gam hay ki-lô-gam; so sánh 800 g với 1 kg', mt:['MT1'], levels:3,
   muc:['Gói kẹo nặng 100 … (g hay kg).', 'Bao gạo, quyển vở, em bé: g hay kg.', 'So sánh số đo khác đơn vị: 800 g và 1 kg.'],
   make:function(lv){
    if(lv<=2){ var vs = lv<=1 ? [['Gói kẹo',100,'g'],['Bao xi măng',50,'kg'],['Quả trứng',60,'g'],['Em bé',3,'kg']] : [['Bao gạo',5,'kg'],['Quyển vở',100,'g'],['Cô giáo',55,'kg'],['Quả cam',150,'g'],['Cái cặp',2,'kg'],['Chiếc bút',20,'g']], it=pick(vs);
      var ch=['g','kg'], dung=it[2], sai={}; ch.forEach(function(c,i){ if(c!==dung) sai[String(i)]='nham-g-kg'; });
      return {type:'mcq', cot:1, _lv:lv, _it:it, _dung:dung, q:'<div class="text-xl font-extrabold text-orange-600 my-1">'+it[0]+' nặng '+it[1]+' …</div><div>Điền đơn vị nào cho hợp lí?</div>', choices:ch, correct:ch.indexOf(dung), sai:sai, goiY:gy()}; }
    var X=100*rnd(3,15), Y=rnd(1,2), ch3=[X+' g nặng hơn', Y+' kg nặng hơn', 'Hai khối lượng bằng nhau'], T=Y*1000, dung3 = X>T ? ch3[0] : (X<T ? ch3[1] : ch3[2]), sai3={};
    ch3.forEach(function(c,i){ if(c!==dung3) sai3[String(i)] = i===2 ? 'quen-doi' : 'nham-g-kg'; });
    return {type:'mcq', cot:1, _lv:3, _X:X, _Y:Y, _dung:dung3, q:'<div>So sánh <b>'+so(X)+' g</b> và <b>'+Y+' kg</b>. Khối lượng nào nặng hơn?</div>', choices:ch3, correct:ch3.indexOf(dung3), sai:sai3, goiY:gy({'chung':'Bé đổi '+Y+' kg ra gam ('+so(T)+' g), rồi so sánh với '+so(X)+' g.'})};
  }, check:function(q){
    if(q._lv<=2) return kiemMCQ(q) && q.choices.join()==='g,kg' && q._dung===q._it[2];
    var X=q._X, T=q._Y*1000, e = X>T ? X+' g nặng hơn' : (X<T ? q._Y+' kg nặng hơn' : 'Hai khối lượng bằng nhau'); return kiemMCQ(q) && q._dung===e && q.choices.length===3; }},

  /* D10 — Bạn nói đúng hay sai (không có trong SGK) */
  {name:'Bạn nói đúng hay sai', sec:'Tìm lỗi — 1 kg = 1 000 g đúng hay sai; bạn An nói 200 g nặng hơn 2 kg', mt:['MT4'], levels:3,
   muc:['Đúng / Sai: một phép đổi kg và g.', 'Bạn An so sánh số đo khác đơn vị: em thấy thế nào.', 'Bạn An nói k kg bằng x g: em thấy thế nào.'],
   make:function(lv){
    var k, T;
    if(lv<=1){ k=rnd(1,5); var dung=Math.random()<0.5, x = dung ? 1000*k : pick([100*k, k, 10*k]), tr=(x===1000*k), tag = x===k ? 'nham-g-kg' : 'nham-boi';
      return {type:'mcq', figFn:dsBtn31, _lv:1, _k:k, _x:x, _dung:(tr?'Đ':'S'), q:'<div class="text-xl font-extrabold text-orange-700 my-2">'+k+' kg = '+so(x)+' g.</div><div class="text-base text-slate-500">Đúng (Đ) hay sai (S)?</div>', choices:['Đ','S'], correct:(tr?0:1), sai:(tr?{}:{'0':tag}), goiY:gy()}; }
    if(lv===2){ var Y=rnd(2,5), X=100*rnd(2,9), nang=Math.random()<0.5, T2=1000*Y, claim = nang ? Y+' kg nặng hơn '+X+' g' : X+' g nặng hơn '+Y+' kg', dungC, saiC;
      if(nang){ dungC='Đồng ý, vì '+Y+' kg = '+so(T2)+' g, mà '+so(T2)+' g lớn hơn '+X+' g'; saiC='Không đồng ý, vì '+X+' lớn hơn '+Y; }
      else { dungC='Không đồng ý, vì '+Y+' kg = '+so(T2)+' g, mà '+X+' g nhỏ hơn '+so(T2)+' g'; saiC='Đồng ý, vì '+X+' lớn hơn '+Y; }
      var ch=[dungC,saiC]; shuffle(ch); var s2={}; s2[String(ch.indexOf(saiC))]='nham-g-kg';
      return {type:'mcq', cot:1, _lv:2, _X:X, _Y:Y, _nang:nang, _dung:dungC, q:nguoi('boy','Bạn An')+'<div>Bạn An nói: «<b>'+claim+'</b>.» Em thấy thế nào?</div>', choices:ch, correct:ch.indexOf(dungC), sai:s2, goiY:gy()}; }
    k=rnd(2,9); T=1000*k; var fx = Math.random()<0.5 ? 1000 : pick([1,100]), x3=k*fx, ptT=k+' × 1 000 = '+so(T), ch, dung3, s3={};
    if(fx===1000){ dung3='Đồng ý, vì '+ptT; ch=[dung3, 'Không đồng ý, vì '+k+' × 100 = '+so(100*k)]; } else { dung3='Không đồng ý, vì '+ptT; ch=[dung3, 'Đồng ý, vì '+k+' × '+fx+' = '+so(x3)]; }
    shuffle(ch); s3[String(1-ch.indexOf(dung3))] = fx===1000 ? 'nham-bang' : (fx===1 ? 'nham-g-kg' : 'nham-boi');
    return {type:'mcq', cot:1, _lv:3, _k:k, _x:x3, _T:T, _fx:fx, _dung:dung3, q:nguoi('boy','Bạn An')+'<div>Bạn An nói: «<b>'+k+' kg</b> bằng <b>'+so(x3)+' g</b>.» Em thấy thế nào?</div>', choices:ch, correct:ch.indexOf(dung3), sai:s3, goiY:gy({'chung':'Bé nhớ 1 kg = 1 000 g, rồi tính '+k+' × 1 000.'})};
  }, check:function(q){
    if(q._lv<=1) return q.choices.join()==='Đ,S' && (q._dung==='Đ')===(q._x===1000*q._k) && q.correct===(q._x===1000*q._k?0:1);
    if(q._lv===2){ var T2=1000*q._Y; return q._X<T2 && q._X>q._Y && kiemMCQ(q) && q.choices.length===2 && q._dung.indexOf(q._nang ? 'Đồng ý' : 'Không đồng ý')===0; }
    var eq=/^(Đồng ý|Không đồng ý), vì (\d+) × ([\d ]+) = ([\d ]+)$/, okEq=q.choices.every(function(c){ var m=eq.exec(c); return m && (+m[2])*(+m[3].replace(/ /g,''))===+m[4].replace(/ /g,''); });
    var agree=(q._x===q._T);
    return okEq && q.choices.length===2 && new Set(q.choices).size===2 && q._T===1000*q._k && q._x===q._k*q._fx && q.choices[q.correct]===q._dung && q._dung.indexOf(agree ? 'Đồng ý' : 'Không đồng ý')===0 && q._dung.indexOf(q._k+' × 1 000 = '+so(q._T))>0; }}
 ]
};
