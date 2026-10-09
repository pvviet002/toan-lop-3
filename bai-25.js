/* bai-25.js — Bài 25: Phép chia hết, phép chia có dư. BÀI MỚI, Engine v2 — LUYỆN THÔNG MINH.
   Theo bảng phân tích sư phạm đã duyệt (phan-tich-su-pham/bai-25.md) và chỉnh sửa của thầy trên PR #13:
   4 MỤC TIÊU (muctieu) × 10 DẠNG (topics), mỗi dạng 3 mức (Thông tư 27: Nhận biết · Hiểu · Vận dụng).
   Số dư luôn bé hơn số chia; câu chọn số dư có đáp án nhiễu lớn hơn hoặc bằng số chia (nhãn du-lon-hon-chia).
   Số bị chia <= 63, số chia 2–9, thương một chữ số. Mỗi câu "số dư lớn nhất" chỉ có đúng MỘT phép có số dư lớn nhất (không hoà).
   Cách viết: "(dư 1)" sau thương; trong khung đặt tính, số dư ở dưới cùng. Không "cần thêm mấy con để đủ rổ" (lớp 3 chưa học).
   Hình mới viết ngay trong file này (không sửa figures.js): phepChiaDoc, ronQua, chauCay; dùng lại anh, oHoi, tinhBT.
   Vật để đếm mang data-dem (qua, chau); mỗi chữ số trong khung đặt tính mang data-pt; check() đọc lại từ chuỗi SVG.
   QUY TẮC: nối chuỗi, KHÔNG backtick và KHÔNG template literal. */

/* ---- Tiện ích chung ---- */
function nhanSai(ds, dung){ var o={}; ds.forEach(function(p){ var v=p[0]; if(v>0 && v!==dung && !(String(v) in o)) o[String(v)]=p[1]; }); return o; }
function kiemMCQ(q){ return q.choices[q.correct]===q._dung && new Set(q.choices).size===q.choices.length; }
function dsBtn25(ch){ return '<span class="text-2xl font-extrabold text-slate-700">'+ch+'</span><span class="ml-2 text-base font-bold text-slate-600">'+(ch==='Đ'?'Đúng':'Sai')+'</span>'; }
function svgX(w, h, px){ return svgHinh(w, h, px).replace('<svg ', '<svg class="text-slate-700" '); }
function f1(v){ return v.toFixed(1); }
function demDem(s, loai){ var m=String(s).match(new RegExp('data-dem="'+loai+'"', 'g')); return m ? m.length : 0; }
function khungHinh(s){ return '<div class="flex justify-center my-2">'+s+'</svg></div>'; }
function nguoi(ten, alt){ return '<div class="flex justify-center mb-1">'+anh(ten, 72, alt)+'</div>'; }
function kyHieu(nhan, bt){ return '<div class="text-slate-500 mb-1">'+nhan+'</div><div class="text-4xl font-extrabold text-orange-600">'+bt+'</div>'; }
function chia(a, b){ var q=Math.floor(a/b); return {q:q, r:a-q*b}; }
function viet(a, b){ var c=chia(a,b); return a+' : '+b+' = '+c.q+(c.r ? ' (dư '+c.r+')' : ''); }
/* Nhận xét "Em thấy thế nào?": mo(n) viết lý do có số n; x = số bạn nói, T = số đúng */
function haiNhanXet(x, T, mo){
  var maiDung = x===T, alt, ch;
  if(maiDung){ alt=T+pick([-2,-1,1,2]); if(alt<0) alt=T+1; ch=[['Đồng ý, vì '+mo(T), true, T],['Không đồng ý, vì '+mo(alt), false, alt]]; }
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
/* Gợi ý chung cho thương, số dư */
function goiYChia(a, b){ var c=chia(a,b);
  return {'nham-thuong-du':'Thương là kết quả phép chia, số dư là phần còn lại. '+a+' : '+b+' = '+c.q+' (dư '+c.r+').',
    'du-lon-hon-chia':'Số dư luôn bé hơn số chia ('+b+'). Nếu số dư còn chia được cho '+b+', bé chia tiếp.',
    'tru-sai-buoc':'Bé tính lại: '+a+' − '+b+' × '+c.q+' = '+c.r+'.', 'canh-dong':'Bé nhẩm lại bảng chia '+b+' nhé!', 'dao-vai':'Bé xem lại: ô ? là thương, tích hay số dư?',
    'lech-nhom':'Bé đếm lại số quả trong mỗi rổ nhé!', 'thieu-buoc':'Bé làm hết các bước của bài toán nhé!', 'dem-sot-chau':'Bé tính từng chậu, rồi đếm.'}; }

/* ---- Hình mới 1 (D3): phép chia đặt dọc theo khung. Hàng 1: số bị chia | số chia; hàng 2: tích (thương × số chia) | thương; hàng 3: số dư.
   Cột chữ số: chục (44) · đơn vị (80); thanh đứng x=104; số chia và thương ở x=134. tuy.an = 'thuong' | 'tich' | 'du': chữ số bị che bằng ô "?". ---- */
function phepChiaDoc(a, b, tuy){
  tuy=tuy||{}; var c=chia(a,b), t=c.q*b, X=[44,80], s=svgX(190,170,190), hang=function(x, y, ch, id){
    var r='';
    if(ch==='?') r+='<rect x="'+(x-17)+'" y="'+(y-27)+'" width="34" height="37" rx="7" fill="none" stroke="'+HM.hoi+'" stroke-width="2.5" stroke-dasharray="5 3"/>';
    return r+'<text data-pt="'+id+'" x="'+x+'" y="'+y+'" text-anchor="middle" font-size="34" '+HFONT+' fill="'+(ch==='?'?HM.hoi:'currentColor')+'">'+ch+'</text>'; };
  function so(v, an, ids, y){ var d=String(v), L=d.length, i, r=''; for(i=0;i<L;i++) r+=hang(X[2-L+i], y, an ? '?' : d.charAt(i), ids+(L-1-i)); return r; }
  s+=so(a, false, 'a', 44)+hang(134, 44, String(b), 'b0');
  s+='<text x="12" y="96" text-anchor="middle" font-size="26" '+HFONT+' fill="currentColor">&#8722;</text>';
  s+=so(t, tuy.an==='tich', 't', 96)+hang(134, 96, tuy.an==='thuong' ? '?' : String(c.q), 'q0');
  s+='<line x1="104" y1="10" x2="104" y2="106" stroke="currentColor" stroke-width="3" stroke-linecap="round"/><line x1="104" y1="54" x2="176" y2="54" stroke="currentColor" stroke-width="3" stroke-linecap="round"/>'
    +'<line x1="24" y1="108" x2="98" y2="108" stroke="currentColor" stroke-width="3" stroke-linecap="round"/>';
  s+=hang(80, 150, tuy.an==='du' ? '?' : String(c.r), 'r0');
  return khungHinh(s);
}
function figPD(a, b, tuy){ return phepChiaDoc(a, b, tuy); }
function docPT(s){ var o={}, re=/data-pt="(\w+)"[^>]*>([^<]*)<\/text>/g, m; while((m=re.exec(String(s)))) o[m[1]]=m[2]; return o; }
/* Chữ số trong khung phải khớp thương, tích, số dư tính lại từ a, b */
function kiemPD(q){
  var p=q._pt, a=p.a, b=p.b, c=chia(a,b), t=c.q*b, d=docPT(q.q), want={}, i, ids;
  String(a).split('').reverse().forEach(function(ch,i){ want['a'+i]=ch; });
  want.b0=String(b);
  String(t).split('').reverse().forEach(function(ch,i){ want['t'+i]=(p.an==='tich') ? '?' : ch; });
  want.q0 = p.an==='thuong' ? '?' : String(c.q);
  want.r0 = p.an==='du' ? '?' : String(c.r);
  ids=Object.keys(want);
  return ids.length===Object.keys(d).length && ids.every(function(k){ return d[k]===want[k]; });
}

/* ---- Hình mới 2 (D1, D8): nCt cái rổ (hoặc đĩa), mỗi cái có per quả; phần thừa left quả nằm riêng trong khung nét đứt "thừa".
   Mỗi quả là một vòng tròn data-dem="qua" (các quả cách nhau, không chồng nhau); mỗi rổ mang data-ct="1". ---- */
function ronQua(nCt, per, left, kieu){
  var cw=74, ch=88, tong=nCt+(left>0 ? 1 : 0), moi=Math.min(4, tong), hang=Math.ceil(tong/moi), W=moi*cw, H=hang*ch+4, s=svgX(W,H), i, j;
  function qua(cx, top, n){ var nc=Math.min(n,3), r='', k; for(k=0;k<n;k++){ var col=k%3, row=Math.floor(k/3); r+='<circle data-dem="qua" cx="'+f1(cx-(nc-1)*8+col*16)+'" cy="'+f1(top+14+row*16)+'" r="7" fill="'+HM.do+'"/>'; } return r; }
  for(i=0;i<tong;i++){
    var cx=(i%moi)*cw+cw/2, y0=Math.floor(i/moi)*ch+6, rows=Math.ceil(Math.max(per,1)/3), hh=rows*16+16;
    if(i<nCt){
      if(kieu==='dia') s+='<ellipse data-ct="1" cx="'+cx+'" cy="'+f1(y0+hh/2+6)+'" rx="32" ry="'+f1(hh/2+4)+'" fill="'+HM.xam+'" stroke="currentColor" stroke-width="2.5"/>';
      else s+='<rect data-ct="1" x="'+(cx-31)+'" y="'+y0+'" width="62" height="'+hh+'" rx="9" fill="'+HM.goNhat+'" stroke="currentColor" stroke-width="2.5"/>';
      s+=qua(cx, y0+(kieu==='dia' ? 4 : 0), per);
    } else {
      s+='<rect x="'+(cx-31)+'" y="'+y0+'" width="62" height="'+(Math.ceil(left/3)*16+16)+'" rx="9" fill="none" stroke="currentColor" stroke-width="2.5" stroke-dasharray="6 5"/>'+qua(cx, y0, left)
       +'<text x="'+cx+'" y="'+f1(y0+Math.ceil(left/3)*16+38)+'" text-anchor="middle" font-size="17" '+HFONT+' fill="currentColor">thừa</text>';
    }
  }
  return khungHinh(s);
}
function docCt(s){ var m=String(s).match(/data-ct="1"/g); return m ? m.length : 0; }

/* ---- Hình mới 3 (D6): bốn chậu cây A, B, C, D, mỗi chậu mang một phép chia (nhãn trắng); chậu data-dem="chau" ghi phép chia trong data-pc ---- */
function chauCay(ds){
  var cw=84, W=cw*ds.length, s=svgX(W,168,W), ten=['A','B','C','D'];
  ds.forEach(function(t, i){
    var cx=i*cw+cw/2, y0=84, e=t.split(' : ');
    s+='<ellipse cx="'+(cx-14)+'" cy="52" rx="9" ry="21" transform="rotate(-28 '+(cx-14)+' 52)" fill="'+HM.xanhLa+'"/><ellipse cx="'+cx+'" cy="42" rx="9" ry="24" fill="'+HM.la+'"/><ellipse cx="'+(cx+14)+'" cy="52" rx="9" ry="21" transform="rotate(28 '+(cx+14)+' 52)" fill="'+HM.xanhLa+'"/>'
     +'<rect x="'+(cx-35)+'" y="'+(y0-10)+'" width="70" height="12" rx="5" fill="'+HM.camDam+'"/>'
     +'<path data-dem="chau" data-pc="'+e[0]+':'+e[1]+'" d="M'+(cx-31)+' '+(y0+2)+' L'+(cx+31)+' '+(y0+2)+' L'+(cx+23)+' '+(y0+48)+' L'+(cx-23)+' '+(y0+48)+' Z" fill="'+HM.cam+'"/>'
     +nhanVien(cx, y0+26, 62, 24, t, 16)+'<text x="'+cx+'" y="'+(y0+78)+'" text-anchor="middle" font-size="22" '+HFONT+' fill="currentColor">'+ten[i]+'</text>';
  });
  return khungHinh(s);
}
function docChau(s){ var o=[], re=/data-pc="(\d+):(\d+)"/g, m; while((m=re.exec(String(s)))) o.push([+m[1], +m[2]]); return o; }

var BAI = {
 n: 25,
 title: 'Phép Chia Hết, Phép Chia Có Dư',
 sub: 'Luyện thông minh: câu hỏi tự đổi theo bé — làm hết lượt để xem ngọn lửa!',
 goal: 10, soCau: 18, soCauToiDa: 24,
 loi: {'du-lon-hon-chia':'Số dư lớn hơn hoặc bằng số chia', 'nham-thuong-du':'Nhầm thương với số dư', 'tru-sai-buoc':'Trừ sai ở bước đặt tính', 'dem-sot-chau':'Đếm sót chậu'},
 muctieu: [
  {id:'MT1', ten:'Chia hết, chia có dư', muc:['Chia đều quả vào rổ (đếm hình): hết hay còn thừa.', 'Phép chia nào chia hết, phép nào có dư (chọn một).', 'Phép chia nào có số dư lớn nhất.']},
  {id:'MT2', ten:'Thương và số dư', muc:['Chia hết: 15 : 3, 24 : 6, 20 : 5; đặt tính chia, ô ? ở thương.', 'Chia có dư 32 : 6, 41 : 8, 23 : 3; ô ? ở tích; thương hoặc số dư.', 'Số dư của các phép chia lớn hơn; chọn số dư (có đáp án lớn hơn số chia).']},
  {id:'MT3', ten:'Số dư bé hơn số chia', muc:['Chậu cây A, B, C, D: chậu nào có số dư là 3.', 'Số dư lớn nhất khi chia cho 5; số nào không thể là số dư.', 'Đúng / Sai về số dư; bạn nói đúng hay sai.']},
  {id:'MT4', ten:'Vận dụng', muc:['Chia 18 quả vào các đĩa, mỗi đĩa 3 quả; 56 con cá vào các rổ.', 'Chia có dư: chia được mấy đĩa, thừa mấy quả; 49 con cá vào các rổ.', 'Chọn cách chia hết; hai bước (đã xếp mấy con vào rổ); bạn nói.']}
 ],
 topics: [
  /* D1 — Chia đều vào rổ (Khám phá a, b) */
  {name:'Chia đều vào rổ', sec:'Khám phá — Chia đều quả táo vào các rổ: chia hết, còn thừa', mt:['MT1'], levels:3,
   muc:['Chia hết: 6 quả vào 2 rổ (đếm hình).', 'Có dư: 7 quả vào 2 rổ; mỗi rổ mấy quả hoặc thừa mấy quả.', 'Số quả lớn hơn (11 quả vào 3 rổ): mỗi rổ mấy quả hoặc thừa mấy quả.'],
   make:function(lv){
    var b, q, r, a, hoi, ans, cau, sai;
    if(lv<=1){ b=rnd(2,4); q=rnd(2,4); r=0; hoi='q'; }
    else if(lv===2){ b=rnd(2,3); q=rnd(3,4); r=rnd(1,b-1); hoi=pick(['q','r']); }
    else { b=rnd(3,5); q=rnd(2,4); r=rnd(1,b-1); hoi=pick(['q','r']); }
    a=q*b+r;
    if(hoi==='q'){ ans=q; cau='Chia đều <b>'+a+' quả táo</b> vào <b>'+b+' cái rổ</b>'+(r ? ', mỗi rổ có số quả bằng nhau' : '')+'. Mỗi rổ có mấy quả?'; sai=[[a,'thieu-buoc'],[r,'nham-thuong-du'],[q+1,'lech-nhom'],[q-1,'lech-nhom'],[b,'dao-vai']]; }
    else { ans=r; cau='Chia đều <b>'+a+' quả táo</b> vào <b>'+b+' cái rổ</b>, mỗi rổ có số quả bằng nhau. Còn thừa mấy quả?'; sai=[[q,'nham-thuong-du'],[r+1,'lech-nhom'],[r-1,'lech-nhom'],[a,'thieu-buoc']]; }
    return {type:'num', _lv:lv, _a:a, _b:b, _q:q, _r:r, _hoi:hoi, q:ronQua(b, q, r, 'ro')+'<div>'+cau+'</div>', ans:ans, unit:'quả', sai:nhanSai(sai, ans), goiY:goiYChia(a,b)};
  }, check:function(q){
    var a=q._a, b=q._b, c=chia(a,b);
    if(demDem(q.q,'qua')!==a || docCt(q.q)!==b || c.q!==q._q || c.r!==q._r) return false;
    if(q._lv<=1 && c.r!==0) return false;
    if(q._lv>=2 && c.r===0) return false;
    return q.ans===(q._hoi==='q' ? c.q : c.r); }},

  /* D2 — Chia hết hay có dư (Hoạt động 1) */
  {name:'Chia hết hay có dư', sec:'Hoạt động 1 — Phép chia nào chia hết, phép chia nào có dư', mt:['MT1'], levels:3,
   muc:['Phép nào chia hết trong ba phép (số nhỏ).', 'Phép nào có dư trong ba phép.', 'Phép nào có số dư lớn nhất (đúng một phép lớn nhất).'],
   make:function(lv){
    var ps=[], ds, g, kind = lv<=1 ? 'het' : (lv===2 ? 'du' : 'max');
    for(g=0;g<500;g++){
      ps=[];
      var nHet = kind==='het' ? 1 : (kind==='du' ? 2 : 0), i;
      while(ps.length<3){ var b=rnd(2, lv<=1 ? 5 : 9), qq=rnd(2,9), r = (ps.length<nHet) ? 0 : rnd(1,b-1), a=qq*b+r; if(a>(lv<=1?30:63) || a<6) continue;
        if(ps.every(function(x){ return x[0]!==a && x[1]!==b; })) ps.push([a,b]); }
      var rs=ps.map(function(x){ return x[0]%x[1]; });
      if(kind==='het' && rs.filter(function(v){ return v===0; }).length===1 && rs.filter(function(v){ return v>0; }).length===2) break;
      if(kind==='du' && rs.filter(function(v){ return v>0; }).length===1 && rs.filter(function(v){ return v===0; }).length===2) break;
      if(kind==='max' && rs.every(function(v){ return v>0; }) && new Set(rs).size===3) break;
    }
    var ch=ps.map(function(x){ return x[0]+' : '+x[1]; }), rs2=ps.map(function(x){ return x[0]%x[1]; }), di;
    if(kind==='het') di=rs2.indexOf(0); else if(kind==='du') di=rs2.findIndex(function(v){ return v>0; }); else di=rs2.indexOf(Math.max.apply(null, rs2));
    var cau = kind==='het' ? 'Phép chia nào là phép <b>chia hết</b>?' : (kind==='du' ? 'Phép chia nào là phép <b>chia có dư</b>?' : 'Phép chia nào có <b>số dư lớn nhất</b>?');
    return {type:'mcq', cot:1, _kind:kind, _ps:ps, _dung:ch[di], q:'<div>'+cau+'</div>', choices:ch, correct:di,
      goiY:{'chung':'Bé tính từng phép chia: chia hết khi số dư bằng 0, chia có dư khi còn thừa. Với câu số dư lớn nhất, bé so sánh các số dư.'}};
  }, check:function(q){
    var rs=q._ps.map(function(x){ return x[0]%x[1]; }), mx=Math.max.apply(null,rs);
    if(!kiemMCQ(q) || q._ps.length!==3 || q.choices[q.correct]!==q._ps[q.correct][0]+' : '+q._ps[q.correct][1]) return false;
    if(q._kind==='het') return rs[q.correct]===0 && rs.filter(function(v){ return v===0; }).length===1;
    if(q._kind==='du') return rs[q.correct]>0 && rs.filter(function(v){ return v>0; }).length===1;
    return rs[q.correct]===mx && rs.filter(function(v){ return v===mx; }).length===1 && rs.every(function(v){ return v>0; }); }},

  /* D3 — Đặt tính chia (Khám phá a, b) */
  {name:'Đặt tính chia', sec:'Khám phá — Đặt tính chia: 6 : 2 = 3 và 7 : 2 = 3 (dư 1)', mt:['MT2'], levels:3,
   muc:['Chia hết: ô ? ở thương.', 'Ô ? ở tích (thương × số chia); chia hết hoặc có dư.', 'Ô ? ở số dư, hoặc ở thương khi có dư.'],
   make:function(lv){
    var b, q, r, a, an, ans, sai, cau;
    if(lv<=1){ b=rnd(2,7); q=rnd(2,9); r=0; a=q*b; an='thuong'; }
    else if(lv===2){ b=rnd(2,8); q=rnd(2,8); r=Math.random()<0.35 ? 0 : rnd(1,b-1); a=q*b+r; an='tich'; }
    else { b=rnd(3,9); q=rnd(2,7); r=rnd(1,b-1); a=q*b+r; an=Math.random()<0.65 ? 'du' : 'thuong'; }
    while(a>63){ q=rnd(2,6); a=q*b+r; }
    var t=q*b;
    if(an==='thuong'){ ans=q; cau='Số ở ô <b class="text-amber-700">?</b> là bao nhiêu? (thương)'; sai=[[r,'nham-thuong-du'],[q+1,'canh-dong'],[q-1,'canh-dong'],[a,'dao-vai']]; }
    else if(an==='tich'){ ans=t; cau='Số ở ô <b class="text-amber-700">?</b> là bao nhiêu? (thương × số chia)'; sai=[[a,'dao-vai'],[q,'dao-vai'],[t+b,'canh-dong'],[t-b,'canh-dong']]; }
    else { ans=r; cau='Số ở ô <b class="text-amber-700">?</b> là bao nhiêu? (số dư)'; sai=[[q,'nham-thuong-du'],[r+b,'du-lon-hon-chia'],[q+1,'canh-dong'],[t,'dao-vai']]; }
    return {type:'num', _lv:lv, _pt:{a:a,b:b,an:an}, q:figPD(a,b,{an:an})+'<div>'+cau+'</div>', ans:ans, sai:nhanSai(sai, ans), goiY:goiYChia(a,b)};
  }, check:function(q){
    var p=q._pt, c=chia(p.a,p.b);
    if(!kiemPD(q) || p.a>63) return false;
    if(q._lv<=1 && !(c.r===0 && p.an==='thuong')) return false;
    var e = p.an==='thuong' ? c.q : (p.an==='tich' ? c.q*p.b : c.r);
    if(p.an==='du' && c.r===0) return false;
    return q.ans===e && c.q>=2 && c.q<=9; }},

  /* D4 — Chia nhẩm có dư (Hoạt động 1; Luyện tập 1a) */
  {name:'Chia nhẩm có dư', sec:'Hoạt động 1; Luyện tập 1a — Tính 15 : 3, 32 : 6, 41 : 8, 23 : 5, 43 : 7, 17 : 8', mt:['MT2'], levels:3,
   muc:['Chia hết (15 : 3, 24 : 6, 20 : 5): tìm thương.', 'Chia có dư (32 : 6, 41 : 8, 23 : 3): tìm thương hoặc số dư.', 'Số lớn hơn (43 : 7, 17 : 8, 23 : 5): tìm số dư hoặc thương.'],
   make:function(lv){
    var b, q, r, a, hoi;
    if(lv<=1){ b=rnd(2,7); q=rnd(2,9); r=0; hoi='q'; }
    else if(lv===2){ b=rnd(3,8); q=rnd(3,7); r=rnd(1,b-1); hoi=pick(['q','r']); }
    else { b=rnd(5,9); q=rnd(2,7); r=rnd(1,b-1); hoi=pick(['r','r','q']); }
    a=q*b+r; while(a>63){ q=rnd(2,6); a=q*b+r; }
    var sai = hoi==='q' ? [[r,'nham-thuong-du'],[q+1,'canh-dong'],[q-1,'canh-dong'],[a,'dao-vai']] : [[q,'nham-thuong-du'],[r+b,'du-lon-hon-chia'],[b,'du-lon-hon-chia'],[r+1,'tru-sai-buoc'],[r-1,'tru-sai-buoc']];
    var cau = r===0 ? 'Thương của phép chia này là bao nhiêu?' : (hoi==='q' ? 'Thương của phép chia này là bao nhiêu?' : 'Số dư của phép chia này là bao nhiêu?');
    return {type:'num', _lv:lv, _a:a, _b:b, _q:q, _r:r, _hoi:hoi, q:kyHieu('Tính', a+' : '+b)+'<div class="mt-1">'+cau+'</div>', ans: hoi==='q' ? q : r, sai:nhanSai(sai, hoi==='q' ? q : r), goiY:goiYChia(a,b)};
  }, check:function(q){ var c=chia(q._a,q._b); return c.q===q._q && c.r===q._r && c.q>=2 && q._a<=63 && (q._lv<=1 ? c.r===0 : c.r>0) && q.ans===(q._hoi==='q' ? c.q : c.r); }},

  /* D5 — Chọn số dư (Luyện tập 2) */
  {name:'Chọn số dư', sec:'Luyện tập 2 — Chọn số dư của phép chia (bốn phương án)', mt:['MT2'], levels:3,
   muc:['Chia cho 2 hoặc 3, số bị chia nhỏ.', 'Chia cho 4–7 (41 : 6, 19 : 7).', 'Chia cho 5–9, đáp án nhiễu rất giống đáp án đúng (19 : 5, 34 : 6, 16 : 6).'],
   make:function(lv){
    var b = lv<=1 ? rnd(2,3) : (lv===2 ? rnd(4,7) : rnd(5,9)), q=rnd(2, lv<=1 ? 6 : 8), r=rnd(1,b-1), a=q*b+r; while(a>63){ q=rnd(2,6); a=q*b+r; }
    var ds=[[r,''],[r+b,'du-lon-hon-chia']], extra=[[q,'nham-thuong-du'],[b,'du-lon-hon-chia'],[r+1,'tru-sai-buoc'],[r-1,'tru-sai-buoc'],[r+b+1,'du-lon-hon-chia'],[b+1,'du-lon-hon-chia'],[r+2,'tru-sai-buoc']], k;
    shuffle(extra);
    for(k=0;k<extra.length && ds.length<4;k++){ var v=extra[k][0]; if(v>0 && ds.every(function(d){ return d[0]!==v; })) ds.push(extra[k]); }
    shuffle(ds);
    var ch=ds.map(function(d){ return String(d[0]); }), sai={}; ds.forEach(function(d,i){ if(d[1]) sai[String(i)]=d[1]; });
    return {type:'mcq', _lv:lv, _a:a, _b:b, _dung:String(r), q:kyHieu('Chọn số dư', a+' : '+b), choices:ch, correct:ch.indexOf(String(r)), sai:sai, goiY:goiYChia(a,b)};
  }, check:function(q){
    var c=chia(q._a,q._b);
    return kiemMCQ(q) && q.choices.length===4 && q._dung===String(c.r) && c.r>0 && q.choices.filter(function(v){ return +v>=q._b; }).length>=1 && q.choices.filter(function(v){ return +v===c.r; }).length===1; }},

  /* D6 — Chậu cây A, B, C, D (Luyện tập 1) */
  {name:'Chậu cây A, B, C, D', sec:'Luyện tập 1 — Bốn chậu cây ghi bốn phép chia: chậu nào có số dư là 3', mt:['MT3'], levels:3,
   muc:['Chậu nào có số dư là 3 (đúng một chậu).', 'Có bao nhiêu chậu ghi phép chia hết.', 'Chậu nào có số dư lớn nhất (đúng một chậu lớn nhất).'],
   make:function(lv){
    var ps, g, kind = lv<=1 ? 'ba' : (lv===2 ? 'het' : 'max');
    for(g=0;g<2000;g++){
      ps=[]; var guard=0;
      while(ps.length<4 && guard++<200){ var b=rnd(2,9), q=rnd(1,9), r=rnd(0,b-1), a=q*b+r;
        if(kind==='ba' && ps.length===0){ b=rnd(4,9); r=3; a=q*b+r; }
        if(a>63 || a<4 || ps.some(function(x){ return x[0]===a || x[1]===b; })) continue;
        ps.push([a,b]); }
      if(ps.length<4) continue;
      var rs=ps.map(function(x){ return x[0]%x[1]; }), ok=false;
      if(kind==='ba') ok = rs.filter(function(v){ return v===3; }).length===1;
      else if(kind==='het') ok = rs.filter(function(v){ return v===0; }).length>=1 && rs.filter(function(v){ return v===0; }).length<=2;
      else ok = new Set(rs).size===4 && rs.every(function(v){ return v>0; });
      if(ok) break;
    }
    ps=shuffle(ps.slice()); var ex=ps.map(function(x){ return x[0]+' : '+x[1]; }), rs2=ps.map(function(x){ return x[0]%x[1]; }), fig=chauCay(ex);
    if(kind==='het'){ var dem=rs2.filter(function(v){ return v===0; }).length;
      return {type:'num', _kind:kind, _ps:ps, q:fig+'<div>Có bao nhiêu chậu ghi phép chia <b>chia hết</b>?</div>', ans:dem, unit:'chậu', sai:nhanSai([[dem+1,'dem-sot-chau'],[dem-1,'dem-sot-chau'],[dem+2,'dem-sot-chau']], dem), goiY:goiYChia(ps[0][0],ps[0][1])}; }
    var ten=['Chậu A','Chậu B','Chậu C','Chậu D'], di = kind==='ba' ? rs2.indexOf(3) : rs2.indexOf(Math.max.apply(null,rs2)), sai={};
    ps.forEach(function(x,i){ if(i!==di && Math.floor(x[0]/x[1])===3) sai[String(i)]='nham-thuong-du'; });
    var cau = kind==='ba' ? 'Chậu nào ghi phép chia có <b>số dư là 3</b>?' : 'Chậu nào ghi phép chia có <b>số dư lớn nhất</b>?';
    return {type:'mcq', _kind:kind, _ps:ps, _dung:ten[di], q:fig+'<div>'+cau+'</div>', choices:ten, correct:di, sai:sai, goiY:goiYChia(ps[di][0], ps[di][1])};
  }, check:function(q){
    var ps=q._ps, d=docChau(q.q), rs=ps.map(function(x){ return x[0]%x[1]; });
    if(d.length!==4 || demDem(q.q,'chau')!==4) return false;
    var ok=true; d.forEach(function(x){ if(!ps.some(function(p){ return p[0]===x[0] && p[1]===x[1]; })) ok=false; });
    if(!ok) return false;
    if(q._kind==='het') return q.ans===rs.filter(function(v){ return v===0; }).length && q.ans>=1;
    if(q._kind==='ba') return kiemMCQ(q) && rs[q.correct]===3 && rs.filter(function(v){ return v===3; }).length===1;
    var mx=Math.max.apply(null,rs); return kiemMCQ(q) && rs[q.correct]===mx && rs.filter(function(v){ return v===mx; }).length===1; }},

  /* D7 — Số dư có thể là mấy (không có trong SGK) */
  {name:'Số dư có thể là mấy', sec:'Số dư luôn bé hơn số chia', mt:['MT3'], levels:3,
   muc:['Chia cho 2, 3, 4: số dư lớn nhất có thể là mấy.', 'Chia cho 5 hoặc 6: số nào không thể là số dư.', 'Đúng hay sai: số dư có thể là một số cho trước.'],
   make:function(lv){
    var b;
    if(lv<=1){ b=rnd(2,4);
      return {type:'num', _lv:1, _b:b, q:'<div>Khi chia một số cho <b>'+b+'</b>, số dư <b>lớn nhất</b> có thể là mấy?</div>', ans:b-1, sai:nhanSai([[b,'du-lon-hon-chia'],[b+1,'du-lon-hon-chia'],[1,'nham-thuong-du']], b-1),
        goiY:{'du-lon-hon-chia':'Số dư luôn bé hơn số chia. Số lớn nhất bé hơn '+b+' là '+(b-1)+'.', 'nham-thuong-du':'Số dư lớn nhất là số liền trước số chia.'}}; }
    if(lv===2){ b=rnd(5,6); var khong=b+pick([0,1,2]), co=shuffle([0,1,2,3,4,5].filter(function(v){ return v<b; })).slice(0,3), ch=shuffle(co.concat([khong]).map(String));
      return {type:'mcq', _lv:2, _b:b, _dung:String(khong), q:'<div>Chia một số cho <b>'+b+'</b>. Số nào <b>không thể</b> là số dư?</div>', choices:ch, correct:ch.indexOf(String(khong)), goiY:{'chung':'Số dư bé hơn số chia '+b+'. Số không thể là số dư là số lớn hơn hoặc bằng '+b+'.'}}; }
    b=rnd(3,8); var x = Math.random()<0.5 ? rnd(0,b-1) : rnd(b,b+3), dung=x<b;
    return {type:'mcq', figFn:dsBtn25, _lv:3, _b:b, _x:x, _dung:(dung?'Đ':'S'), q:'<div class="text-xl font-extrabold text-orange-700 my-2">Chia một số cho '+b+', số dư có thể là '+x+'.</div><div class="text-base text-slate-500">Đúng (Đ) hay sai (S)?</div>', choices:['Đ','S'], correct:(dung?0:1), sai:(dung?{}:{'0':'du-lon-hon-chia'}),
      goiY:{'du-lon-hon-chia':'Số dư luôn bé hơn số chia '+b+'. Số dư có thể là 0, 1, … '+(b-1)+'.', 'chung':'Số dư bé hơn số chia '+b+'.'}};
  }, check:function(q){
    if(q._lv===1) return q.ans===q._b-1;
    if(q._lv===2) return kiemMCQ(q) && +q._dung>=q._b && q.choices.filter(function(v){ return +v>=q._b; }).length===1 && q.choices.length===4;
    return q.choices.join()==='Đ,S' && (q._dung==='Đ')===(q._x<q._b) && q.correct===(q._x<q._b?0:1); }},

  /* D8 — Chia 18 quả vào các đĩa (Hoạt động 2) */
  {name:'Chia quả vào các đĩa', sec:'Hoạt động 2 — Chia 18 quả vào các đĩa, mỗi đĩa 3, 4 hoặc 5 quả', mt:['MT4'], levels:3,
   muc:['Mỗi đĩa 3 quả (chia hết): được mấy đĩa.', 'Mỗi đĩa 4 hoặc 5 quả (có dư): được mấy đĩa hoặc thừa mấy quả.', 'Chọn cách chia hết trong ba cách.'],
   make:function(lv){
    var T, k, q, r, hoi;
    if(lv<=1){ k=pick([2,3]); q=rnd(3,7); T=q*k; r=0; hoi='q'; }
    else if(lv===2){ do { T=pick([18,20,22,23,25]); k=rnd(3,5); } while(T%k===0); var c=chia(T,k); q=c.q; r=c.r; hoi=pick(['q','r']); }
    else { var Ts=[16,18,21,25,27,28], T3=pick(Ts), ks=[3,4,5].filter(function(v){ return T3%v===0; }), kd=ks[0], ch=shuffle([3,4,5].map(function(v){ return 'Mỗi đĩa '+v+' quả'; })), dung='Mỗi đĩa '+kd+' quả';
      return {type:'mcq', cot:1, _lv:3, _T:T3, _dung:dung, q:'<div>Có <b>'+T3+' quả</b> chia vào các đĩa, mỗi đĩa có số quả bằng nhau. Cách nào <b>chia hết</b> (không thừa quả nào)?</div>', choices:ch, correct:ch.indexOf(dung),
        goiY:{'chung':'Bé tính '+T3+' : 3, '+T3+' : 4, '+T3+' : 5: cách nào có số dư bằng 0 thì chia hết.'}}; }
    var cau = hoi==='q' ? 'Chia được mấy đĩa như thế?' : 'Còn thừa mấy quả?', ans = hoi==='q' ? q : r;
    return {type:'num', _lv:lv, _T:T, _k:k, _q:q, _r:r, _hoi:hoi, q:ronQua(q, k, r, 'dia')+'<div>Chia <b>'+T+' quả</b> vào các đĩa, mỗi đĩa <b>'+k+' quả</b>. '+cau+'</div>', ans:ans, unit: hoi==='q' ? 'đĩa' : 'quả',
      sai:nhanSai(hoi==='q' ? [[r,'nham-thuong-du'],[q+1,'lech-nhom'],[k,'dao-vai'],[T,'thieu-buoc']] : [[q,'nham-thuong-du'],[r+k,'du-lon-hon-chia'],[r+1,'lech-nhom'],[k,'dao-vai']], ans), goiY:goiYChia(T,k)};
  }, check:function(q){
    if(q._lv===3){ var ks=[3,4,5].filter(function(v){ return q._T%v===0; }); return kiemMCQ(q) && ks.length===1 && q._dung==='Mỗi đĩa '+ks[0]+' quả' && q.choices.length===3; }
    var c=chia(q._T,q._k);
    if(demDem(q.q,'qua')!==q._T || docCt(q.q)!==q._q || c.q!==q._q || c.r!==q._r) return false;
    if(q._lv<=1 && c.r!==0) return false;
    if(q._lv===2 && c.r===0) return false;
    return q.ans===(q._hoi==='q' ? c.q : c.r); }},

  /* D9 — Chia cá vào rổ (Luyện tập 3) */
  {name:'Chia cá vào rổ', sec:'Luyện tập 3 — 56 con cá chia vào các rổ, mỗi rổ 8 con: mấy rổ?', mt:['MT4'], levels:3,
   muc:['Chia hết: 56 con cá, mỗi rổ 8 con, được mấy rổ.', 'Có dư: 49 con cá, mỗi rổ 8 con; được mấy rổ hoặc còn thừa mấy con.', 'Hai bước: đã xếp được bao nhiêu con cá vào các rổ.'],
   make:function(lv){
    var b=rnd(6,9), q, r, a, hoi, ans, cau, sai;
    if(lv<=1){ q=rnd(3,8); r=0; hoi='q'; }
    else if(lv===2){ q=rnd(3,7); r=rnd(1,b-1); hoi=pick(['q','r']); }
    else { q=rnd(4,7); r=rnd(1,b-1); hoi='xep'; }
    a=q*b+r;
    if(hoi==='q'){ ans=q; cau='Hỏi xếp được mấy rổ cá?'; sai=[[r,'nham-thuong-du'],[q+1,'lech-nhom'],[q-1,'lech-nhom'],[b,'dao-vai']]; }
    else if(hoi==='r'){ ans=r; cau='Hỏi còn thừa mấy con cá?'; sai=[[q,'nham-thuong-du'],[r+b,'du-lon-hon-chia'],[r+1,'lech-nhom'],[r-1,'lech-nhom']]; }
    else { ans=a-r; cau='Hỏi đã xếp được bao nhiêu con cá vào các rổ?'; sai=[[a,'thieu-buoc'],[q,'nham-thuong-du'],[r,'nham-thuong-du'],[a-r+b,'lech-nhom']]; }
    return {type:'num', _lv:lv, _a:a, _b:b, _q:q, _r:r, _hoi:hoi, q:nguoi('girl','Bạn nhỏ')+'<div>Có <b>'+a+' con cá</b>. Người ta xếp cá vào các rổ, mỗi rổ <b>'+b+' con</b>'+(r ? ' (rổ nào cũng đủ '+b+' con)' : '')+'.</div><div class="mt-1">'+cau+'</div>', ans:ans, unit: hoi==='q' ? 'rổ' : 'con cá',
      sai:nhanSai(sai, ans), goiY:goiYChia(a,b)};
  }, check:function(q){
    var c=chia(q._a,q._b); if(c.q!==q._q || c.r!==q._r || q._a>81) return false;
    if(q._lv<=1 && c.r!==0) return false;
    if(q._lv>=2 && c.r===0) return false;
    var e = q._hoi==='q' ? c.q : (q._hoi==='r' ? c.r : q._a-c.r);
    return q.ans===e && e>0; }},

  /* D10 — Bạn nói đúng hay sai (không có trong SGK) */
  {name:'Bạn nói đúng hay sai', sec:'Tìm lỗi — Bạn An nói về thương và số dư', mt:['MT3','MT4'], levels:3,
   muc:['Bạn An nói số dư của một phép chia (có thể lớn hơn số chia).', 'Bạn An nói thương của một phép chia có dư.', 'Bạn An nói về chia hết hay có dư; bài toán xếp cá vào rổ.'],
   make:function(lv, mt){
    var b=rnd(3,9), qq=rnd(2,7), r=rnd(1,b-1), a=qq*b+r, x, T, mo, cau, tag;
    while(a>63){ qq=rnd(2,6); a=qq*b+r; }
    if(mt==='MT4'){ var b2=rnd(6,9), q2=rnd(3,7), r2 = lv<=1 ? 0 : rnd(1,b2-1), a2=q2*b2+r2; T=q2; x = Math.random()<0.5 ? T : pick([T+1,T-1,r2+b2].filter(function(v){ return v>0 && v!==T; })); mo=function(n){ return 'xếp được '+n+' rổ'; }; tag='nham-thuong-du';
      cau='Có <b>'+a2+' con cá</b>, xếp vào các rổ, mỗi rổ <b>'+b2+' con</b>. Bạn An nói: «<b>Xếp được '+x+' rổ</b> (mỗi rổ đủ '+b2+' con).» Em thấy thế nào?';
      var hn=haiNhanXet(x, T, mo), sa={}; sa[String(1-hn.correct)]=tag;
      return {type:'mcq', cot:1, mt:mt, _lv:lv, _mt:mt, _a:a2, _b:b2, _x:x, _T:T, _ds:hn.ds, _dung:hn.choices[hn.correct], q:nguoi('boy','Bạn An')+'<div>'+cau+'</div>', choices:hn.choices, correct:hn.correct, sai:sa, goiY:goiYChia(a2,b2)}; }
    if(lv<=1){ T=r; x = Math.random()<0.5 ? T : (Math.random()<0.5 ? T+b : qq); if(x===T && false) x=T; mo=function(n){ return 'số dư là '+n; }; tag = x>=b ? 'du-lon-hon-chia' : 'nham-thuong-du';
      cau='Bạn An nói: «'+a+' : '+b+' = '+qq+' (dư <b>'+x+'</b>).» Em thấy thế nào?'; }
    else if(lv===2){ T=qq; x = Math.random()<0.5 ? T : pick([r,T+1,T-1].filter(function(v){ return v>0 && v!==T; })); mo=function(n){ return 'thương là '+n; }; tag='nham-thuong-du';
      cau='Bạn An nói: «'+a+' : '+b+' có thương là <b>'+x+'</b> và còn dư '+r+'.» Em thấy thế nào?'; }
    else { var het=Math.random()<0.5, a3=het ? qq*b : a; T=het ? 0 : r; x = Math.random()<0.5 ? T : (het ? pick([1,2].filter(function(v){ return v<b; })) : 0); mo=function(n){ return 'số dư là '+n; }; tag='nham-thuong-du';
      cau='Bạn An nói: «'+a3+' : '+b+' '+(x===0 ? 'là phép chia hết' : 'là phép chia có dư '+x)+'.» Em thấy thế nào?'; a=a3; }
    var h2=haiNhanXet(x, T, mo), sb={}; sb[String(1-h2.correct)]=tag;
    return {type:'mcq', cot:1, mt:mt, _lv:lv, _mt:mt, _a:a, _b:b, _x:x, _T:T, _ds:h2.ds, _dung:h2.choices[h2.correct], q:nguoi('boy','Bạn An')+'<div>'+cau+'</div>', choices:h2.choices, correct:h2.correct, sai:sb, goiY:goiYChia(a,b)};
  }, check:function(q){
    var c=chia(q._a,q._b);
    if(!kiemNhanXet(q)) return false;
    if(q._mt==='MT4') return q._T===c.q;
    if(q._lv<=1) return q._T===c.r;
    if(q._lv===2) return q._T===c.q;
    return q._T===c.r; }}
 ]
};
