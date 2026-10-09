/* bai-26.js — Bài 26: Chia số có hai chữ số cho số có một chữ số. BÀI MỚI, Engine v2 — LUYỆN THÔNG MINH.
   Theo bảng phân tích sư phạm đã duyệt (phan-tich-su-pham/bai-26.md) và chỉnh sửa của thầy trên PR #13:
   3 MỤC TIÊU (muctieu) × 11 DẠNG (topics), mỗi dạng 3 mức (Thông tư 27: Nhận biết · Hiểu · Vận dụng); goal:10, soCau:15, soCauToiDa:21.
   D11 (Bạn An làm có đúng?) phục vụ MT1 và MT2: make(lv, mt) và q.mt đúng mục tiêu.
   Mọi phép chia có số bị chia <= 99, số chia 2–9; số dư luôn bé hơn số chia; tích thương × số chia < 100.
   Dữ kiện Luyện tập 2 theo sách: mèo 4 con 12 kg (3 kg), chó 4 con 72 kg (18 kg), rô-bốt 3 con 45 kg (15 kg); số con vật trong hình khớp số chia (đếm được, data-dem) và check() đếm lại.
   Hình mới viết ngay trong file này (không sửa figures.js): chiaDoc2 (khung đặt tính chia nhiều bước, chép và mở rộng từ bai-25.js), conVat, theChia.
   QUY TẮC: nối chuỗi, KHÔNG backtick và KHÔNG template literal. */

/* ---- Tiện ích chung ---- */
function nhanSai(ds, dung){ var o={}; ds.forEach(function(p){ var v=p[0]; if(v>0 && v!==dung && !(String(v) in o)) o[String(v)]=p[1]; }); return o; }
function kiemMCQ(q){ return q.choices[q.correct]===q._dung && new Set(q.choices).size===q.choices.length; }
function dsBtn26(ch){ return '<span class="text-2xl font-extrabold text-slate-700">'+ch+'</span><span class="ml-2 text-base font-bold text-slate-600">'+(ch==='Đ'?'Đúng':'Sai')+'</span>'; }
function svgX(w, h, px){ return svgHinh(w, h, px).replace('<svg ', '<svg class="text-slate-700" '); }
function f1(v){ return v.toFixed(1); }
function demDem(s, loai){ var m=String(s).match(new RegExp('data-dem="'+loai+'"', 'g')); return m ? m.length : 0; }
function khungHinh(s){ return '<div class="flex justify-center my-2">'+s+'</svg></div>'; }
function nguoi(ten, alt){ return '<div class="flex justify-center mb-1">'+anh(ten, 72, alt)+'</div>'; }
function kyHieu(nhan, bt){ return '<div class="text-slate-500 mb-1">'+nhan+'</div><div class="text-4xl font-extrabold text-orange-600">'+bt+'</div>'; }
function chia(a, b){ var q=Math.floor(a/b); return {q:q, r:a-q*b}; }
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
function goiYChia(a, b){ var c=chia(a,b), a1=Math.floor(a/10), q1=Math.floor(a1/b);
  return {'quen-ha':'Sau khi chia hàng chục, bé hạ chữ số hàng đơn vị xuống rồi chia tiếp. '+a+' : '+b+' = '+c.q+(c.r ? ' (dư '+c.r+')' : '')+'.',
    'thieu-so-0':'Thương có chữ số 0 ở hàng đơn vị thì bé phải viết chữ số 0. '+a+' : '+b+' = '+c.q+'.',
    'du-lon-hon-chia':'Số dư luôn bé hơn số chia ('+b+'). Nếu số dư còn chia được cho '+b+', bé chia tiếp.',
    'quen-du':'Nếu còn thừa thì phải thêm một nữa: '+c.q+' và còn '+c.r+', cần '+(c.q+1)+'.',
    'tru-sai-buoc':'Bé tính lại bước trừ: số bị chia trừ tích (số chia × thương).', 'nham-thuong-du':'Thương là kết quả phép chia, số dư là phần còn lại. '+a+' : '+b+' = '+c.q+' (dư '+c.r+').',
    'nham-hang':'Bé nhớ: số chục chia xong vẫn là số chục. Ví dụ 6 chục : 2 = 3 chục = 30.', 'nham-bang':'Bé nhẩm lại bảng chia '+b+' nhé!', 'dao-vai':'Bé xem lại: ô ? là số bị chia, số chia hay thương?',
    'cong-thay-nhan':'Đây là phép chia (hoặc phép nhân), không phải phép cộng, trừ.', 'thieu-buoc':'Bé làm hết các bước của bài toán nhé!', 'dem-sot-phep':'Bé tính từng thẻ, rồi đếm.', 'lech-nhom':'Bé đếm lại nhé!'}; }

/* ---- Hình mới 1 (D2): phép chia hai chữ số đặt dọc theo khung, hai bước (số chục rồi hạ số đơn vị); chỉ dùng khi chữ số hàng chục >= số chia.
   Cột chữ số: chục (44) · đơn vị (80); thanh đứng x=104; số chia x=134; thương: q1 x=134, q0 x=170.
   Hàng 1: số bị chia | số chia · Hàng 2: tích 1 | thương · Hàng 3: số dư bước 1 và chữ số vừa hạ · Hàng 4: tích 2 · Hàng 5: số dư cuối.
   tuy.an = 'q1' | 'q0' | 't1' | 'ha' | 'u' | 'r' : chữ số bị che bằng ô "?". ---- */
function cacBuoc(a, b){
  var a1=Math.floor(a/10), a0=a%10, q1=Math.floor(a1/b), t1=q1*b, c1=a1-t1, cur=c1*10+a0, q0=Math.floor(cur/b), t0=q0*b, r=cur-t0;
  return {a1:a1, a0:a0, q1:q1, t1:t1, c1:c1, cur:cur, q0:q0, t0:t0, r:r};
}
function chiaDoc2(a, b, tuy){
  tuy=tuy||{}; var B=cacBuoc(a,b), s=svgX(200,290,200), X=[44,80];
  function hang(x, y, ch, id){
    var r='';
    if(ch==='?') r+='<rect x="'+(x-17)+'" y="'+(y-27)+'" width="34" height="37" rx="7" fill="none" stroke="'+HM.hoi+'" stroke-width="2.5" stroke-dasharray="5 3"/>';
    return r+'<text data-pt="'+id+'" x="'+x+'" y="'+y+'" text-anchor="middle" font-size="34" '+HFONT+' fill="'+(ch==='?'?HM.hoi:'currentColor')+'">'+ch+'</text>'; }
  function so(v, an, pre, y){ var d=String(v), L=d.length, i, r=''; for(i=0;i<L;i++) r+=hang(X[2-L+i], y, an ? '?' : d.charAt(i), pre+(L-1-i)); return r; }
  s+=hang(X[0], 44, String(B.a1), 'a1')+hang(X[1], 44, String(B.a0), 'a0')+hang(134, 44, String(b), 'b0');
  s+='<text x="12" y="96" text-anchor="middle" font-size="26" '+HFONT+' fill="currentColor">&#8722;</text>'+hang(X[0], 96, tuy.an==='t1' ? '?' : String(B.t1), 't1')+hang(134, 96, tuy.an==='q1' ? '?' : String(B.q1), 'q1')+hang(170, 96, tuy.an==='q0' ? '?' : String(B.q0), 'q0');
  if(B.c1>0) s+=hang(X[0], 148, String(B.c1), 'c1');
  s+=hang(X[1], 148, tuy.an==='ha' ? '?' : String(B.a0), 'c0');
  s+='<text x="12" y="200" text-anchor="middle" font-size="26" '+HFONT+' fill="currentColor">&#8722;</text>'+so(B.t0, tuy.an==='u', 'u', 200);
  s+=hang(X[1], 252, tuy.an==='r' ? '?' : String(B.r), 'r0');
  s+='<line x1="104" y1="10" x2="104" y2="106" stroke="currentColor" stroke-width="3" stroke-linecap="round"/><line x1="104" y1="54" x2="196" y2="54" stroke="currentColor" stroke-width="3" stroke-linecap="round"/>'
    +'<line x1="30" y1="108" x2="64" y2="108" stroke="currentColor" stroke-width="3" stroke-linecap="round"/><line x1="30" y1="212" x2="98" y2="212" stroke="currentColor" stroke-width="3" stroke-linecap="round"/>';
  return khungHinh(s);
}
function docPT(s){ var o={}, re=/data-pt="(\w+)"[^>]*>([^<]*)<\/text>/g, m; while((m=re.exec(String(s)))) o[m[1]]=m[2]; return o; }
function kiemChia2(q){
  var p=q._pt, B=cacBuoc(p.a,p.b), d=docPT(q.q), want={};
  want.a1=String(B.a1); want.a0=String(B.a0); want.b0=String(p.b);
  want.t1 = p.an==='t1' ? '?' : String(B.t1); want.q1 = p.an==='q1' ? '?' : String(B.q1); want.q0 = p.an==='q0' ? '?' : String(B.q0);
  if(B.c1>0) want.c1=String(B.c1);
  want.c0 = p.an==='ha' ? '?' : String(B.a0);
  String(B.t0).split('').reverse().forEach(function(ch,i){ want['u'+i]= p.an==='u' ? '?' : ch; });
  want.r0 = p.an==='r' ? '?' : String(B.r);
  var ids=Object.keys(want);
  return ids.length===Object.keys(d).length && ids.every(function(k){ return d[k]===want[k]; });
}
/* phép chia hai chữ số hợp lệ cho hình chiaDoc2: chữ số hàng chục >= số chia */
function phepHaiBuoc(lo){
  for(var g=0;g<3000;g++){ var b=rnd(2,9), a=rnd(10,99), c=chia(a,b), B=cacBuoc(a,b);
    if(Math.floor(a/10)<b) continue;
    if(lo.het===true && c.r!==0) continue; if(lo.het===false && c.r===0) continue;
    if(lo.q0khac0 && B.q0===0) continue; if(lo.q0bang0 && B.q0!==0) continue;
    return {a:a, b:b, q:c.q, r:c.r}; }
  return null;
}

/* ---- Hình mới 2 (D8): n con vật (mèo, chó, rô-bốt) trên một hàng; mỗi con là một nhóm data-dem="con" ---- */
function conVat(loai, n){
  var cw=72, W=n*cw, s=svgX(W,80,W), i;
  for(i=0;i<n;i++){
    var cx=i*cw+cw/2, g='<g data-dem="con">';
    if(loai==='meo') g+='<polygon points="'+(cx-19)+',34 '+(cx-15)+',10 '+(cx-4)+',24" fill="'+HM.cam+'"/><polygon points="'+(cx+19)+',34 '+(cx+15)+',10 '+(cx+4)+',24" fill="'+HM.cam+'"/><ellipse cx="'+cx+'" cy="62" rx="15" ry="10" fill="'+HM.cam+'"/><circle cx="'+cx+'" cy="40" r="19" fill="'+HM.cam+'"/>'
      +'<circle cx="'+(cx-7)+'" cy="38" r="2.8" fill="'+HM.den+'"/><circle cx="'+(cx+7)+'" cy="38" r="2.8" fill="'+HM.den+'"/><polygon points="'+(cx-3)+',44 '+(cx+3)+',44 '+cx+',48" fill="'+HM.hong+'"/>'
      +'<path d="M'+(cx-12)+' 47 L'+(cx-24)+' 45 M'+(cx-12)+' 50 L'+(cx-24)+' 52 M'+(cx+12)+' 47 L'+(cx+24)+' 45 M'+(cx+12)+' 50 L'+(cx+24)+' 52" stroke="'+HM.goDam+'" stroke-width="1.6" fill="none" stroke-linecap="round"/>';
    else if(loai==='cho') g+='<ellipse cx="'+(cx-20)+'" cy="40" rx="7" ry="14" transform="rotate(12 '+(cx-20)+' 40)" fill="'+HM.go+'"/><ellipse cx="'+(cx+20)+'" cy="40" rx="7" ry="14" transform="rotate(-12 '+(cx+20)+' 40)" fill="'+HM.go+'"/><ellipse cx="'+cx+'" cy="64" rx="15" ry="9" fill="'+HM.goNhat+'"/><circle cx="'+cx+'" cy="40" r="18" fill="'+HM.goNhat+'"/>'
      +'<circle cx="'+(cx-7)+'" cy="36" r="2.8" fill="'+HM.den+'"/><circle cx="'+(cx+7)+'" cy="36" r="2.8" fill="'+HM.den+'"/><ellipse cx="'+cx+'" cy="46" rx="5" ry="3.6" fill="'+HM.den+'"/>';
    else g+='<line x1="'+cx+'" y1="22" x2="'+cx+'" y2="12" stroke="currentColor" stroke-width="2.4"/><circle cx="'+cx+'" cy="10" r="3.6" fill="'+HM.do+'"/><rect x="'+(cx-18)+'" y="22" width="36" height="28" rx="7" fill="'+HM.xam+'" stroke="currentColor" stroke-width="2.4"/><rect x="'+(cx-13)+'" y="52" width="26" height="16" rx="4" fill="'+HM.troi+'" stroke="currentColor" stroke-width="2.4"/>'
      +'<rect x="'+(cx-11)+'" y="30" width="7" height="7" rx="1.5" fill="'+HM.troiDam+'"/><rect x="'+(cx+4)+'" y="30" width="7" height="7" rx="1.5" fill="'+HM.troiDam+'"/><path d="M'+(cx-8)+' 43 H'+(cx+8)+'" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"/>';
    s+=g+'</g>';
  }
  return khungHinh(s);
}

/* ---- Hình mới 3 (D7): dãy thẻ phép chia ---- */
function theChia(ds){
  var s='<div class="flex flex-wrap justify-center gap-2 my-2">';
  ds.forEach(function(t){ s+='<span class="inline-block px-3 py-2 rounded-xl border-2 border-amber-300 text-slate-700 font-extrabold text-xl whitespace-nowrap">'+t+'</span>'; });
  return s+'</div>';
}
function docThe(s){ var o=[], re=/<span class="inline-block px-3 py-2[^>]*>([^<]*)<\/span>/g, m; while((m=re.exec(String(s)))) o.push(m[1]); return o; }
function chiaThe(t){ var p=t.split(' : '); return chia(+p[0], +p[1]); }

var BAI = {
 n: 26,
 title: 'Chia Số Có Hai Chữ Số Cho Số Có Một Chữ Số',
 sub: 'Luyện thông minh: câu hỏi tự đổi theo bé — làm hết lượt để xem ngọn lửa!',
 goal: 10, soCau: 15, soCauToiDa: 21,
 loi: {'quen-ha':'Quên hạ chữ số', 'thieu-so-0':'Thương thiếu chữ số 0', 'du-lon-hon-chia':'Số dư lớn hơn hoặc bằng số chia', 'quen-du':'Quên cộng 1 khi còn dư', 'tru-sai-buoc':'Trừ sai ở bước đặt tính',
       'nham-thuong-du':'Nhầm thương với số dư', 'nham-hang':'Nhầm hàng khi nhẩm số tròn chục', 'dem-sot-phep':'Đếm sót hoặc thừa phép tính'},
 muctieu: [
  {id:'MT1', ten:'Chia hết số có hai chữ số', muc:['48 : 2, 36 : 3; chia nhẩm 60 : 2, 80 : 4; tìm thừa số 3 × ? = 63.', 'Đặt tính 86 : 2, 48 : 4, 77 : 7 (có bước hạ); chia nhẩm 90 : 9; tìm thừa số ? × 5 = 55.', 'Chia hết có bước trừ (51 : 3); thương có chữ số 0; bạn An làm có đúng.']},
  {id:'MT2', ten:'Chia có dư', muc:['Chia hết hay có dư; 74 : 3 = 24 dư 2 (thương hoặc số dư).', '91 : 4, 53 : 6, 33 : 2, 79 : 5; chọn phép có số dư là 3.', 'Đếm các phép có số dư là 3 hoặc chia hết; nhận ra lỗi quên hạ, số dư lớn hơn số chia.']},
  {id:'MT3', ten:'Vận dụng', muc:['75 quả trứng vào 3 rổ; 4 con mèo 12 kg; 28 học sinh, mỗi bàn 2 em.', '4 con chó 72 kg, 3 rô-bốt 45 kg; 29 học sinh, mỗi bàn 2 em: cần ít nhất mấy bàn; tìm số bị chia.', 'Mỗi bàn 3 hoặc 4 em: 50 học sinh cần ít nhất mấy bàn; số bị chia lớn (? : 6 = 15).']}
 ],
 topics: [
  /* D1 — Chia đều vào khay (Khám phá 1) */
  {name:'Chia đều vào khay', sec:'Khám phá 1 — Chia đều 48 quả cà chua vào 2 khay: 48 : 2 = 24', mt:['MT1'], levels:3,
   muc:['Chia cho 2 (48 : 2, 36 : 2).', 'Chia cho 3, 4, 5 (36 : 3, 55 : 5).', 'Thương hai chữ số lớn hơn (84 : 4, 96 : 3).'],
   make:function(lv){
    var b = lv<=1 ? 2 : (lv===2 ? pick([3,4,5]) : pick([3,4,6])), q = lv<=1 ? rnd(12,24) : (lv===2 ? rnd(11,19) : rnd(14,24)), a;
    while(b*q>99){ q=rnd(11,Math.floor(99/b)); } a=b*q;
    var vat=pick([['quả cà chua','khay'],['quả cam','giỏ'],['quả trứng','rổ'],['viên bi','hộp']]);
    return {type:'num', _lv:lv, _a:a, _b:b, q:nguoi('girl','Bạn nhỏ')+'<div>Chia đều <b>'+a+' '+vat[0]+'</b> vào <b>'+b+' '+vat[1]+'</b>. Mỗi '+vat[1]+' có bao nhiêu '+vat[0]+'?</div>', ans:q, unit:vat[0],
      sai:nhanSai([[Math.floor(q/10),'quen-ha'],[q%10,'quen-ha'],[q+1,'nham-bang'],[q-1,'nham-bang'],[a-b,'cong-thay-nhan']], q), goiY:goiYChia(a,b)};
  }, check:function(q){ var c=chia(q._a,q._b); return c.r===0 && q.ans===c.q && q._a<=99 && c.q>=11; }},

  /* D2 — Đặt tính chia (Hoạt động 1) */
  {name:'Đặt tính chia', sec:'Hoạt động 1 — Đặt tính rồi tính 36 : 3, 86 : 2, 48 : 4, 77 : 7', mt:['MT1'], levels:3,
   muc:['Chia hết: ô ? ở chữ số hàng chục của thương.', 'Chia hết: ô ? ở chữ số hạ xuống hoặc ở tích thứ hai.', 'Có chữ số 0 trong thương; hoặc phép chia có dư, ô ? ở số dư.'],
   make:function(lv){
    var p, an, ans, B, sai;
    if(lv<=1){ p=phepHaiBuoc({het:true, q0khac0:true}); an='q1'; }
    else if(lv===2){ p=phepHaiBuoc({het:true, q0khac0:true}); an=pick(['ha','u']); }
    else { var kieu=pick(['r','q0']); if(kieu==='r'){ p=phepHaiBuoc({het:false}); an='r'; } else { p=phepHaiBuoc({het:true, q0bang0:true}); an='q0'; } }
    B=cacBuoc(p.a,p.b);
    ans = an==='q1' ? B.q1 : (an==='ha' ? B.a0 : (an==='u' ? B.t0 : (an==='r' ? B.r : B.q0)));
    sai = an==='q1' ? [[B.q0,'dao-vai'],[B.t1,'tru-sai-buoc'],[B.q1+1,'nham-bang'],[B.q1-1,'nham-bang']] : (an==='ha' ? [[B.c1,'dao-vai'],[B.a1,'dao-vai'],[B.a0+1,'quen-ha'],[B.cur,'tru-sai-buoc']] : (an==='u' ? [[B.cur,'tru-sai-buoc'],[B.q0,'dao-vai'],[B.t0+p.b,'nham-bang'],[B.t0-p.b,'nham-bang']] : (an==='r' ? [[B.q0,'nham-thuong-du'],[B.r+p.b,'du-lon-hon-chia'],[B.cur,'tru-sai-buoc'],[B.t0,'dao-vai']] : [[B.q1,'thieu-so-0'],[B.cur,'dao-vai'],[1,'quen-ha'],[B.a0,'dao-vai']])));
    return {type:'num', _lv:lv, _pt:{a:p.a,b:p.b,an:an}, q:chiaDoc2(p.a, p.b, {an:an})+'<div>Số ở ô <b class="text-amber-700">?</b> là bao nhiêu?</div>', ans:ans, sai:nhanSai(sai, ans), goiY:goiYChia(p.a,p.b)};
  }, check:function(q){
    var p=q._pt, B=cacBuoc(p.a,p.b);
    if(!kiemChia2(q) || Math.floor(p.a/10)<p.b || p.a>99) return false;
    var e = p.an==='q1' ? B.q1 : (p.an==='ha' ? B.a0 : (p.an==='u' ? B.t0 : (p.an==='r' ? B.r : B.q0)));
    if(p.an==='r' && B.r===0) return false;
    if(q._lv<=2 && B.r!==0) return false;
    return q.ans===e; }},

  /* D3 — Chia nhẩm số tròn chục (Hoạt động 2) */
  {name:'Chia nhẩm số tròn chục', sec:'Hoạt động 2 — Tính nhẩm: 90 : 3 → 9 chục : 3 = 3 chục = 30', mt:['MT1'], levels:3,
   muc:['60 : 2, 80 : 4, 40 : 2 (thương tròn chục nhỏ).', '90 : 9, 60 : 3, 90 : 3, 80 : 2.', 'Số lớn hơn: 70 : 7, 90 : 3, 80 : 4; thương có chữ số 0.'],
   make:function(lv){
    var b, t;
    if(lv<=1){ b=2; t=pick([4,6,8]); } else if(lv===2){ var ps=[[3,6],[3,9],[4,8],[9,9],[3,3]]; var pp=pick(ps); b=pp[0]; t=pp[1]; } else { var pr=[[7,7],[3,9],[4,8],[2,8],[6,6],[5,5],[9,9]]; var pq=pick(pr); b=pq[0]; t=pq[1]; }
    var a=10*t, q=a/b*1, ans=10*(t/b);
    return {type:'num', _lv:lv, _a:a, _b:b, q:kyHieu('Tính nhẩm', a+' : '+b+' ='+oHoi())+'<div class="text-slate-600 text-base mt-1">'+t+' chục : '+b+' = '+(t/b)+' chục = ?</div>', ans:ans,
      sai:nhanSai([[t/b,'thieu-so-0'],[ans*10,'nham-hang'],[a-b,'cong-thay-nhan']], ans), goiY:{'thieu-so-0':t+' chục : '+b+' = '+(t/b)+' chục, tức là '+ans+'. Bé nhớ viết chữ số 0 ở hàng đơn vị.', 'nham-hang':'Số chục chia xong vẫn là số chục: '+(t/b)+' chục là '+ans+'.', 'cong-thay-nhan':'Đây là phép chia, không phải phép trừ.'}};
  }, check:function(q){ return q._a%q._b===0 && q.ans===q._a/q._b && (q._a/10)%q._b===0 && q.ans%10===0; }},

  /* D4 — Tìm thừa số (Hoạt động 3) */
  {name:'Tìm thừa số', sec:'Hoạt động 3 — Tìm thừa số: 3 × ? = 63, ? × 5 = 55, 2 × ? = 42', mt:['MT1'], levels:3,
   muc:['2 × ? = 42, 3 × ? = 63 (thương hai chữ số).', '? × 5 = 55, ? × 4 = 52.', '? × 4 = 84, ? × 3 = 96, ? × 6 = 90.'],
   make:function(lv){
    var b = lv<=1 ? pick([2,3]) : (lv===2 ? pick([4,5]) : pick([3,4,6])), q=rnd(11, Math.floor(99/b)), a, dau=Math.random()<0.5;
    if(lv>=3) q=rnd(14, Math.floor(99/b)); a=b*q;
    return {type:'num', _lv:lv, _a:a, _b:b, q:kyHieu('Tìm số thích hợp', dau ? b+' ×'+oHoi()+'= '+a : oHoi()+'× '+b+' = '+a), ans:q,
      sai:nhanSai([[a,'dao-vai'],[q+1,'nham-bang'],[q-1,'nham-bang'],[a-b,'cong-thay-nhan'],[Math.floor(q/10),'quen-ha']], q), goiY:goiYChia(a,b)};
  }, check:function(q){ return q._a%q._b===0 && q.ans===q._a/q._b && q.ans*q._b===q._a && q._a<=99; }},

  /* D5 — Chia hết hay có dư (Khám phá 2) */
  {name:'Chia hết hay có dư', sec:'Khám phá 2 — 51 : 3 = 17 (chia hết) và 74 : 3 = 24 (dư 2)', mt:['MT2'], levels:3,
   muc:['Phép chia có chia hết không (Có / Không).', 'Thương hoặc số dư của một phép chia (74 : 3).', 'Chọn phép chia có dư trong ba phép.'],
   make:function(lv){
    var b, q, r, a, g;
    if(lv<=1){ b=rnd(2,6); q=rnd(11,Math.floor(99/b)); var het=Math.random()<0.5; r = het ? 0 : rnd(1,b-1); a=b*q+r; while(a>99){ q--; a=b*q+r; }
      return {type:'mcq', _lv:1, _a:a, _b:b, _dung:(r===0?'Có':'Không'), q:'<div>Phép chia <b class="text-2xl text-orange-600">'+a+' : '+b+'</b> có <b>chia hết</b> không?</div>', choices:['Có','Không'], correct:(r===0?0:1), sai:(r===0?{}:{'0':'nham-thuong-du'}),
        goiY:{'nham-thuong-du':'Chia hết khi số dư bằng 0. Bé tính '+a+' : '+b+' xem còn dư không.', 'chung':'Bé tính số dư: chia hết khi số dư bằng 0.'}}; }
    if(lv===2){ b=rnd(2,7); q=rnd(11,Math.floor(99/b)); r=rnd(1,b-1); a=b*q+r; while(a>99){ q--; a=b*q+r; } var hq=Math.random()<0.5;
      return {type:'num', _lv:2, _a:a, _b:b, _hoi:(hq?'q':'r'), q:kyHieu('Tính', a+' : '+b)+'<div class="mt-1">'+(hq ? 'Thương' : 'Số dư')+' của phép chia này là bao nhiêu?</div>', ans:(hq ? q : r),
        sai:nhanSai(hq ? [[r,'nham-thuong-du'],[q+1,'nham-bang'],[q-1,'nham-bang'],[Math.floor(q/10),'quen-ha']] : [[q,'nham-thuong-du'],[r+b,'du-lon-hon-chia'],[r+1,'tru-sai-buoc'],[r-1,'tru-sai-buoc']], hq ? q : r), goiY:goiYChia(a,b)}; }
    var ps=[], kd=null;
    for(g=0;g<500 && ps.length<3;g++){ b=rnd(2,9); q=rnd(5,Math.floor(99/b)); r = ps.length===0 ? rnd(1,b-1) : 0; a=b*q+r; if(a>99 || a<10) continue; if(ps.every(function(x){ return x[0]!==a && x[1]!==b; })) ps.push([a,b]); }
    var ds=shuffle(ps.slice()), ch=ds.map(function(x){ return x[0]+' : '+x[1]; }), dung=ps[0][0]+' : '+ps[0][1];
    return {type:'mcq', cot:1, _lv:3, _ps:ps, _dung:dung, q:'<div>Phép chia nào <b>có dư</b>?</div>', choices:ch, correct:ch.indexOf(dung), goiY:{'chung':'Bé tính số dư của từng phép chia: phép có dư là phép có số dư khác 0.'}};
  }, check:function(q){
    if(q._lv<=1){ var c=chia(q._a,q._b); return q.correct===(c.r===0?0:1) && q._a<=99; }
    if(q._lv===2){ var c2=chia(q._a,q._b); return c2.r>0 && q.ans===(q._hoi==='q' ? c2.q : c2.r); }
    var rs=q._ps.map(function(x){ return x[0]%x[1]; }); return kiemMCQ(q) && rs.filter(function(v){ return v>0; }).length===1 && q._ps.every(function(x){ return x[0]<=99; }); }},

  /* D6 — Chia có dư (Khám phá 2, Hoạt động 1; Luyện tập 1) */
  {name:'Chia có dư', sec:'Khám phá 2, Hoạt động 1; Luyện tập 1 — 91 : 4, 53 : 6, 33 : 2, 79 : 5, 77 : 2, 97 : 4, 51 : 2, 98 : 7', mt:['MT2'], levels:3,
   muc:['Tìm thương: 91 : 4, 33 : 2, 77 : 2.', 'Tìm số dư: 53 : 6, 79 : 5, 91 : 4.', 'Số khó hơn (97 : 4, 98 : 7, 51 : 2): thương hoặc số dư.'],
   make:function(lv){
    var b, q, r, a, hoi;
    if(lv<=1){ b=pick([2,3,4]); hoi='q'; } else if(lv===2){ b=rnd(4,7); hoi='r'; } else { b=rnd(2,8); hoi=pick(['q','r']); }
    q=rnd(8, Math.floor(98/b)); r=rnd(1,b-1); a=b*q+r; while(a>99){ q--; a=b*q+r; }
    var ans = hoi==='q' ? q : r;
    return {type:'num', _lv:lv, _a:a, _b:b, _hoi:hoi, q:kyHieu('Tính', a+' : '+b)+'<div class="mt-1">'+(hoi==='q' ? 'Thương' : 'Số dư')+' của phép chia này là bao nhiêu?</div>', ans:ans,
      sai:nhanSai(hoi==='q' ? [[r,'nham-thuong-du'],[Math.floor(q/10),'quen-ha'],[q+1,'nham-bang'],[q-1,'nham-bang']] : [[q,'nham-thuong-du'],[r+b,'du-lon-hon-chia'],[r+1,'tru-sai-buoc'],[r-1,'tru-sai-buoc']], ans), goiY:goiYChia(a,b)};
  }, check:function(q){ var c=chia(q._a,q._b); return c.r>0 && q._a<=99 && q.ans===(q._hoi==='q' ? c.q : c.r); }},

  /* D7 — Số dư là 3 (Hoạt động 3 của Khám phá 2): thẻ phép chia */
  {name:'Số dư là 3', sec:'Khám phá 2, Hoạt động 3 — Tìm các phép chia có số dư là 3 (43 : 3, 53 : 5, 64 : 4, 25 : 5, 73 : 7)', mt:['MT2'], levels:3,
   muc:['Phép nào có số dư là 3 (chọn một trong bốn).', 'Trong năm phép, có bao nhiêu phép có số dư là 3.', 'Trong năm phép, có bao nhiêu phép chia hết (một yêu cầu).'],
   make:function(lv){
    var sl = lv<=1 ? 4 : 5, ps, g, kind = lv<=1 ? 'chon' : (lv===2 ? 'ba' : 'het');
    for(g=0;g<4000;g++){
      ps=[]; var guard=0;
      while(ps.length<sl && guard++<300){ var b=rnd(2,9), q=rnd(5,Math.floor(99/b)), r=rnd(0,b-1), a=b*q+r; if(a>99 || a<10) continue; if(ps.every(function(x){ return x[0]!==a && x[1]!==b; })) ps.push([a,b]); }
      if(ps.length<sl) continue;
      var rs=ps.map(function(x){ return x[0]%x[1]; }), n3=rs.filter(function(v){ return v===3; }).length, n0=rs.filter(function(v){ return v===0; }).length;
      if(kind==='chon' && n3===1) break; if(kind==='ba' && n3>=1 && n3<=2) break; if(kind==='het' && n0>=1 && n0<=2) break; }
    var ex=ps.map(function(x){ return x[0]+' : '+x[1]; }), rs2=ps.map(function(x){ return x[0]%x[1]; });
    if(kind==='chon'){ var di=rs2.indexOf(3);
      return {type:'mcq', cot:1, _lv:1, _ps:ps, _dung:ex[di], q:'<div>Phép chia nào có <b>số dư là 3</b>?</div>', choices:ex, correct:di, goiY:{'chung':'Bé tính số dư của từng phép chia, tìm phép có số dư là 3.'}}; }
    var dem = kind==='ba' ? rs2.filter(function(v){ return v===3; }).length : rs2.filter(function(v){ return v===0; }).length;
    return {type:'num', _lv:lv, _kind:kind, _ps:ps, q:theChia(ex)+'<div>Có bao nhiêu phép chia '+(kind==='ba' ? 'có <b>số dư là 3</b>' : '<b>chia hết</b>')+'?</div>', ans:dem, unit:'phép',
      sai:nhanSai([[dem+1,'dem-sot-phep'],[dem-1,'dem-sot-phep'],[dem+2,'dem-sot-phep']], dem), goiY:goiYChia(ps[0][0],ps[0][1])};
  }, check:function(q){
    var ps=q._ps, rs=ps.map(function(x){ return x[0]%x[1]; });
    if(!ps.every(function(x){ return x[0]<=99 && x[1]>=2 && x[1]<=9; })) return false;
    if(q._lv<=1) return kiemMCQ(q) && ps.length===4 && rs[q.correct]===3 && rs.filter(function(v){ return v===3; }).length===1;
    if(docThe(q.q).join('|')!==ps.map(function(x){ return x[0]+' : '+x[1]; }).join('|')) return false;
    var e = q._kind==='ba' ? rs.filter(function(v){ return v===3; }).length : rs.filter(function(v){ return v===0; }).length;
    return ps.length===5 && q.ans===e && e>=1 && e<=2; }},

  /* D8 — Chia đều (Hoạt động 2; Luyện tập 2): mèo, chó, rô-bốt */
  {name:'Chia đều', sec:'Hoạt động 2; Luyện tập 2 — 75 quả trứng vào 3 rổ; 4 con mèo 12 kg; 4 con chó 72 kg; 3 rô-bốt 45 kg', mt:['MT3'], levels:3,
   muc:['4 con mèo cân nặng 12 kg (mỗi con 3 kg); 75 quả trứng vào 3 rổ.', '4 con chó 72 kg (mỗi con 18 kg); 3 rô-bốt 45 kg (mỗi con 15 kg).', 'Số khác (tổng 96 kg, 4 con).'],
   make:function(lv){
    var loai = lv<=1 ? 'meo' : pick(['cho','robot']), n, moi, tong, ten;
    if(lv<=1){ if(Math.random()<0.35) return trung(); n=4; moi=rnd(2,5); }
    else if(lv===2){ n = loai==='cho' ? 4 : 3; moi=rnd(12,24); } else { n=pick([3,4]); moi=rnd(14,24); loai=pick(['cho','robot','meo']); }
    while(n*moi>99){ moi--; }
    tong=n*moi; ten = loai==='meo' ? 'mèo' : (loai==='cho' ? 'chó' : 'rô-bốt');
    return {type:'num', _lv:lv, _loai:loai, _n:n, _tong:tong, q:conVat(loai, n)+'<div>Có <b>'+n+' con '+ten+'</b> (có cân nặng bằng nhau). Tất cả cân nặng <b>'+tong+' kg</b>.</div><div class="mt-1">Mỗi con '+ten+' cân nặng bao nhiêu ki-lô-gam?</div>', ans:moi, unit:'kg',
      sai:nhanSai([[tong,'thieu-buoc'],[n,'dao-vai'],[tong-n,'cong-thay-nhan'],[moi+1,'nham-bang'],[moi-1,'nham-bang'],[Math.floor(moi/10),'quen-ha']], moi), goiY:goiYChia(tong,n)};
    function trung(){ var m=pick([[75,3],[84,4],[96,3],[54,3]]), kq=m[0]/m[1];
      return {type:'num', _lv:lv, _loai:'trung', _n:m[1], _tong:m[0], q:nguoi('boy','Bạn nhỏ')+'<div>Có <b>'+m[0]+' quả trứng</b> chia đều vào <b>'+m[1]+' cái rổ</b>. Mỗi rổ có bao nhiêu quả trứng?</div>', ans:kq, unit:'quả',
        sai:nhanSai([[m[0],'thieu-buoc'],[m[1],'dao-vai'],[m[0]-m[1],'cong-thay-nhan'],[kq+1,'nham-bang'],[Math.floor(kq/10),'quen-ha']], kq), goiY:goiYChia(m[0],m[1])}; }
  }, check:function(q){
    if(q._loai!=='trung' && demDem(q.q,'con')!==q._n) return false;
    if(q._loai==='trung' && demDem(q.q,'con')!==0) return false;
    return q._tong%q._n===0 && q.ans===q._tong/q._n && q._tong<=99 && q._n>=3 && q._n<=4 && q.ans>=2; }},

  /* D9 — Cần ít nhất mấy bàn (Luyện tập 3) */
  {name:'Cần ít nhất mấy bàn', sec:'Luyện tập 3 — Lớp có 29 học sinh, mỗi bàn 2 em: cần ít nhất mấy cái bàn', mt:['MT3'], levels:3,
   muc:['Số học sinh chẵn, mỗi bàn 2 em (28 học sinh: 14 bàn).', '29 học sinh, mỗi bàn 2 em: cần ít nhất 15 bàn (còn một em).', 'Mỗi bàn 3 hoặc 4 em: 50 học sinh cần ít nhất mấy bàn.'],
   make:function(lv){
    var N, g, c, ans;
    if(lv<=1){ g=2; N=2*rnd(10,24); }
    else if(lv===2){ g=2; N=2*rnd(10,24)+1; }
    else { g=pick([3,4]); do { N=rnd(40,59); } while(N%g===0); }
    c=chia(N,g); ans = c.r ? c.q+1 : c.q;
    return {type:'num', _lv:lv, _N:N, _g:g, q:nguoi('boy','Học sinh')+'<div>Lớp có <b>'+N+' học sinh</b>. Mỗi bàn ngồi <b>'+g+' em</b>'+(c.r ? ' (em còn lại cũng cần một chỗ ngồi)' : '')+'.</div><div class="mt-1">Cần ít nhất bao nhiêu cái bàn?</div>', ans:ans, unit:'cái bàn',
      sai: c.r ? nhanSai([[c.q,'quen-du'],[ans+1,'lech-nhom'],[c.r,'nham-thuong-du'],[N,'thieu-buoc']], ans) : nhanSai([[N,'thieu-buoc'],[g,'dao-vai'],[ans+1,'lech-nhom'],[ans-1,'lech-nhom']], ans),
      goiY:{'quen-du':'Còn '+c.r+' em chưa có bàn, nên phải thêm một bàn: '+c.q+' + 1 = '+(c.q+1)+'.', 'lech-nhom':'Bé tính lại: '+N+' : '+g+' = '+c.q+(c.r ? ' (dư '+c.r+')' : '')+'.', 'nham-thuong-du':'Số dư là số em chưa có bàn, không phải số bàn.', 'thieu-buoc':'Bé chia số học sinh cho số em mỗi bàn.', 'dao-vai':'Bé chia số học sinh cho số em mỗi bàn.'}};
  }, check:function(q){ var c=chia(q._N,q._g); return q.ans===(c.r ? c.q+1 : c.q) && q._N<=99 && (q._lv<=1 ? c.r===0 : c.r>0) && (q._lv<3 ? q._g===2 : (q._g===3 || q._g===4)); }},

  /* D10 — Tìm số bị chia (Luyện tập 4) */
  {name:'Tìm số bị chia', sec:'Luyện tập 4 — Tìm số bị chia: ? : 4 = 15, ? : 5 = 17, ? : 3 = 28', mt:['MT3'], levels:3,
   muc:['? : 2 = 21, ? : 3 = 24 (thương hai chữ số, tích < 100).', '? : 4 = 15, ? : 5 = 17, ? : 3 = 28.', '? : 6 = 15, ? : 4 = 23, ? : 7 = 13 (tích < 100).'],
   make:function(lv){
    var b = lv<=1 ? pick([2,3]) : (lv===2 ? pick([3,4,5]) : pick([4,6,7])), q = lv<=1 ? rnd(11,Math.floor(99/b)) : (lv===2 ? rnd(11,19) : rnd(13,Math.floor(99/b))), a;
    while(b*q>99) q--; a=b*q;
    return {type:'num', _lv:lv, _b:b, _q:q, q:kyHieu('Tìm số bị chia', oHoi()+': '+b+' = '+q), ans:a,
      sai:nhanSai([[q,'dao-vai'],[q+b,'cong-thay-nhan'],[a-b,'nham-bang'],[a+b,'nham-bang'],[q*10+b,'dao-vai']], a), goiY:{'dao-vai':'Số bị chia = thương × số chia. Bé nhân '+q+' với '+b+'.', 'cong-thay-nhan':'Muốn tìm số bị chia, bé lấy thương nhân với số chia, không cộng.', 'nham-bang':'Bé nhân lại '+q+' × '+b+' nhé!'}};
  }, check:function(q){ return q.ans===q._b*q._q && q.ans<100 && q.ans/q._b===q._q && q._q>=11; }},

  /* D11 — Bạn An làm có đúng? (không có trong SGK): phục vụ MT1 và MT2 */
  {name:'Bạn An làm có đúng?', sec:'Tìm lỗi — Phép chia bạn An làm', mt:['MT1','MT2'], levels:3,
   muc:['Em thấy thế nào về kết quả của An (một lỗi rõ)?', 'An sai ở bước nào: quên hạ, thương thiếu 0, số dư lớn hơn số chia.', 'Kết quả đúng là bao nhiêu.'],
   make:function(lv, mt){
    var p, kinds, kind, a, b, q, r, xq, xr, lbl, mota, tenLoi={'quen-ha':'An quên hạ chữ số hàng đơn vị xuống.', 'thieu-so-0':'Thương của An thiếu chữ số 0.', 'du-lon-hon-chia':'Số dư của An lớn hơn hoặc bằng số chia.', 'nham-bang':'An nhân sai ở bước kiểm tra.'}, i;
    if(mt==='MT1'){ kind=pick(['quen-ha','thieu-so-0']);
      for(i=0;i<500;i++){ p=phepHaiBuoc({het:true, q0khac0: kind==='quen-ha', q0bang0: kind==='thieu-so-0'}); if(p) break; } a=p.a; b=p.b; var B=cacBuoc(a,b); q=p.q; r=0; xq=B.q1; xr=0; lbl=kind;
      mota = 'An tính '+a+' : '+b+' = '+xq+'.'; }
    else { kind=pick(['du-lon-hon-chia','quen-ha']);
      if(kind==='du-lon-hon-chia'){ for(i=0;i<500;i++){ b=rnd(3,9); q=rnd(8,Math.floor(98/b)); r=rnd(1,b-1); a=b*q+r; if(a<=99 && q-1>=5) break; } xq=q-1; xr=r+b; mota='An tính '+a+' : '+b+' = '+xq+' (dư '+xr+').'; lbl=kind; }
      else { for(i=0;i<500;i++){ p=phepHaiBuoc({het:false, q0khac0:true}); if(p) break; } a=p.a; b=p.b; q=p.q; r=p.r; xq=cacBuoc(a,b).q1; xr=cacBuoc(a,b).c1; mota='An tính '+a+' : '+b+' = '+xq+' (dư '+xr+').'; lbl=kind; } }
    var anNoi = mota;
    if(lv<=1){ var T=q, x = Math.random()<0.4 ? q : xq, mo=function(n){ return a+' : '+b+' = '+n+(r ? ' (dư '+r+')' : ''); };
      var hn=haiNhanXet(x, T, function(n){ return 'thương là '+n; }), sai={}; sai[String(1-hn.correct)]=lbl;
      var nx = x===q ? 'An tính '+a+' : '+b+' = '+q+(r ? ' (dư '+r+')' : '')+'.' : mota;
      return {type:'mcq', cot:1, mt:mt, _lv:1, _mt:mt, _kind:lbl, _a:a, _b:b, _x:x, _T:T, _ds:hn.ds, _dung:hn.choices[hn.correct], q:nguoi('boy','Bạn An')+'<div>'+nx+' Bạn An nói: «Mình làm đúng.» Em thấy thế nào?</div>', choices:hn.choices, correct:hn.correct, sai:sai, goiY:goiYChia(a,b)}; }
    if(lv===2){ var tx=[[lbl, tenLoi[lbl]]], khac=['quen-ha','thieu-so-0','du-lon-hon-chia'].filter(function(k){ return k!==lbl; });
      var ds=[[lbl,tenLoi[lbl]]]; khac.forEach(function(k){ if(ds.length<3) ds.push([k, tenLoi[k]]); }); ds.push(['', 'An nhân sai ở bước kiểm tra.']);
      shuffle(ds); var ch=ds.map(function(d){ return d[1]; }), sai2={}, di=ds.findIndex(function(d){ return d[0]===lbl; }); ds.forEach(function(d,k){ if(d[0] && d[0]!==lbl) sai2[String(k)]=d[0]; });
      return {type:'mcq', cot:1, mt:mt, _lv:2, _mt:mt, _kind:lbl, _a:a, _b:b, _dung:ch[di], q:nguoi('boy','Bạn An')+'<div>'+mota+' Kết quả của An <b>sai</b>. An sai ở bước nào?</div>', choices:ch, correct:di, sai:sai2, goiY:goiYChia(a,b)}; }
    return {type:'num', mt:mt, _lv:3, _mt:mt, _kind:lbl, _a:a, _b:b, _q:q, q:nguoi('boy','Bạn An')+'<div>'+mota+' Kết quả của An <b>sai</b>.</div><div class="mt-1">Thương đúng của '+a+' : '+b+' là bao nhiêu?</div>', ans:q,
      sai:nhanSai([[xq,lbl],[r,'nham-thuong-du'],[q+1,'nham-bang'],[q-1,'nham-bang']], q), goiY:goiYChia(a,b)};
  }, check:function(q){
    var c=chia(q._a,q._b), B=cacBuoc(q._a,q._b);
    if(q._a>99 || q._b<2 || q._b>9) return false;
    if(q._mt==='MT1' && c.r!==0) return false;
    if(q._mt==='MT2' && c.r===0) return false;
    if(q._kind==='quen-ha' && (B.q0===0 || Math.floor(q._a/10)<q._b)) return false;
    if(q._kind==='thieu-so-0' && B.q0!==0) return false;
    if(q._lv===1) return kiemNhanXet(q) && q._T===c.q;
    if(q._lv===2) return kiemMCQ(q) && q.choices.length===4;
    return q.ans===c.q; }}
 ]
};
