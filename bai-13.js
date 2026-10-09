/* bai-13.js — Bài 13: Tìm thành phần trong phép nhân, phép chia. Engine v2 — LUYỆN THÔNG MINH.
   Theo bảng phân tích sư phạm đã duyệt (phan-tich-su-pham/bai-13.md):
   5 MỤC TIÊU (muctieu) × 11 DẠNG (topics), mỗi dạng 3 mức (Thông tư 27: Nhận biết · Hiểu · Vận dụng).
   Mức 1 = bảng 2–5 · Mức 2 = bảng 2–9 · Mức 3 = vế còn lại là một phép tính / tính ngược hai bước / bài hai bước.
   Mỗi câu gắn nhãn lỗi cho đáp án nhiễu (q.sai) + gợi ý (q.goiY) để engine phản hồi đúng kiểu sai.
   Hình: jug (ca nước, riêng bài này), anh('bouquet'), tuỳ dạng: arrowFind, tri. Bài toán không dùng emoji.
   QUY TẮC: nối chuỗi, KHÔNG backtick và KHÔNG template literal. */

/* ---- Hình riêng Bài 13 ---- */
/* Ca đựng nước */
function jug(){
  return '<svg width="46" height="58" viewBox="0 0 60 74" style="display:inline-block">'
   +'<path d="M14 16 h30 a3 3 0 0 1 3 3 v44 a7 7 0 0 1 -7 7 h-22 a7 7 0 0 1 -7 -7 v-44 a3 3 0 0 1 3 -3 z" fill="#FFFFFF" stroke="'+HM.troiDam+'" stroke-width="2"/>'
   +'<path d="M47 26 q11 1 11 12 q0 11 -11 12" fill="none" stroke="'+HM.troiDam+'" stroke-width="3" stroke-linecap="round"/>'
   +'<path d="M13 40 h34 v20 a7 7 0 0 1 -7 7 h-20 a7 7 0 0 1 -7 -7 z" fill="'+HM.troi+'"/>'
   +'<ellipse cx="30" cy="16" rx="17" ry="4" fill="#F4F4F4" stroke="'+HM.troiDam+'" stroke-width="2"/>'
   +'</svg>';
}
/* Ô ẩn (?) màu hổ phách trong phép tính */
function ubox(){ return '<span style="width:44px;height:44px" class="inline-flex items-center justify-center rounded-lg bg-white border-2 border-amber-500 text-amber-700 font-extrabold text-2xl align-middle">?</span>'; }
/* Một dòng phép tính lớn (chuỗi HTML đã dựng sẵn) */
function eqline(html){ return '<div class="flex items-center justify-center gap-2 flex-wrap text-3xl font-extrabold text-slate-700 my-3">'+html+'</div>'; }
/* Bảng 3 dòng tìm thành phần: nhãn r1/r2/r3, giá trị v1/v2/v3, ô hide = ? */
function tri(r1,r2,r3, v1,v2,v3, hide){
  function cell(v,on){ return '<td class="px-5 py-1 text-center text-lg '+(on?'bg-amber-100 text-amber-700 font-extrabold':'font-bold text-slate-700')+'" style="border:1px solid #fcd34d">'+(on?'?':v)+'</td>'; }
  function lab(t){ return '<td class="px-3 py-1 font-bold text-slate-600 bg-amber-50" style="border:1px solid #fcd34d">'+t+'</td>'; }
  return '<table class="mx-auto border-collapse my-2" style="border:2px solid #fcd34d;border-radius:8px;overflow:hidden">'
   +'<tr>'+lab(r1)+cell(v1,hide===0)+'</tr>'
   +'<tr>'+lab(r2)+cell(v2,hide===1)+'</tr>'
   +'<tr>'+lab(r3)+cell(v3,hide===2)+'</tr></table>';
}
function oVuong(v){ return v===null
  ? '<span style="width:56px;height:56px" class="inline-flex items-center justify-center rounded-xl bg-white border-2 border-amber-500 text-amber-700 font-extrabold text-2xl">?</span>'
  : '<span style="width:56px;height:56px" class="inline-flex items-center justify-center rounded-full bg-emerald-300 text-slate-900 font-extrabold text-2xl">'+v+'</span>'; }
function muiTen(op){ return '<span class="text-slate-600 font-bold">'+op+' &#8594;</span>'; }
/* Sơ đồ tìm số ĐẦU: [?] --op--> (R)  ·  hai bước: [?] --op1--> ( ) --op2--> (R) */
function arrowFind(op, R){ return '<div class="flex items-center justify-center gap-1 md:gap-2 my-3 flex-wrap">'+oVuong(null)+muiTen(op)+oVuong(R)+'</div>'; }
function arrowFind2(op1, op2, R){
  return '<div class="flex items-center justify-center gap-1 md:gap-2 my-3 flex-wrap">'+oVuong(null)+muiTen(op1)
   +'<span style="width:48px;height:48px" class="inline-flex items-center justify-center rounded-full bg-slate-100 border border-slate-300 text-slate-500 font-extrabold text-lg">&#8230;</span>'
   +muiTen(op2)+oVuong(R)+'</div>';
}
/* Cặp thừa số khác của P (b × c, b,c ≤ 10), khác cặp {x,y} — cho Mức 3 */
function capKhac(P, x, y){
  var o=[]; for(var b=2;b<=10;b++){ var c=P/b; if(Number.isInteger(c) && c>=2 && c<=10 && !((b===x&&c===y)||(b===y&&c===x))) o.push(b+' × '+c); }
  return o.length ? pick(o) : null;
}
function soLon(lv){ return lv<=1 ? rnd(2,5) : (lv===2 ? rnd(2,9) : rnd(4,9)); }   /* chỉ trong các bảng đã học (2–9) */

/* ---- Tiện ích riêng bài 13 (chép từ bài 10, 11) ---- */
/* Bảng nhãn lỗi cho đáp số: ds = [[giá trị, nhãn], …]; bỏ giá trị <= 0 hoặc trùng đáp án đúng */
function nhanSai(ds, dung){ var o={}; ds.forEach(function(p){ var v=p[0]; if(v>0 && v!==dung && !(String(v) in o)) o[String(v)]=p[1]; }); return o; }
function dsBtn13(ch){ return '<span class="text-2xl font-extrabold text-slate-700">'+ch+'</span><span class="ml-2 text-base font-bold text-slate-600">'+(ch==='Đ'?'Đúng':'Sai')+'</span>'; }
function kiemMCQ(q){ return q.choices[q.correct]===q._dung && new Set(q.choices).size===q.choices.length; }

/* ---- Bộ sinh "tìm một thành phần" dùng chung cho dạng 2, 3, 4, 5, 9 ----
   mt: MT1 tìm thừa số · MT2 tìm số bị chia · MT3 tìm số chia. Trả về cả phép tính, đáp số, đáp án nhiễu có nhãn, gợi ý. */
function tp(mt, lv){
  var o={mt:mt}, i;
  if(mt==='MT1'){
    var f1=soLon(lv), f2=soLon(lv), P=f1*f2, ve=String(P);
    if(lv>=3){ var k=capKhac(P, f1, f2); if(k) ve=k; }
    var dau = lv<=1 ? true : Math.random()<0.5;   /* Mức 1: ô trống ở thừa số thứ nhất; từ Mức 2 có cả ô trống ở thừa số thứ hai (6 × ? = 24) */
    o.known = dau ? f2 : f1; o.ans = dau ? f1 : f2; o.P=P; o.ve=ve;
    o.eq = dau ? ubox()+'<span>× '+f2+' = '+ve+'</span>' : '<span>'+f1+' ×</span>'+ubox()+'<span>= '+ve+'</span>';
    o.plain = dau ? '? × '+f2+' = '+ve : f1+' × ? = '+ve;
    o.ds=[[P*o.known,'chon-sai-phep'],[P-o.known,'cong-thay-nhan'],[o.known,'dao-vai'],[o.ans-1,'canh-dong'],[o.ans+1,'canh-dong']];
    o.gt='Muốn tìm một thừa số, lấy tích chia cho thừa số kia.';
  } else if(mt==='MT2'){
    var b=soLon(lv), q, ve2;
    if(lv>=3){ var c=rnd(2,3), d=rnd(2,5); if(c*d>10) d=2; q=c*d; ve2=c+' × '+d; } else { q=soLon(lv); ve2=String(q); }
    var D=b*q;
    o.b=b; o.q=q; o.D=D; o.ve=ve2; o.ans=D;
    o.eq = ubox()+'<span>: '+b+' = '+ve2+'</span>';
    o.plain = '? : '+b+' = '+ve2;
    o.ds=[[q,'dao-vai'],[q+b,'cong-thay-nhan'],[D-b,'canh-dong'],[D+b,'canh-dong'],[b,'dao-vai']];
    o.gt='Muốn tìm số bị chia, lấy thương nhân số chia.';
  } else {
    var s=soLon(lv), q3=(lv>=3 ? rnd(2,9) : soLon(lv)), D3=s*q3, ve3=String(q3);
    if(lv>=3){ var x=pick([2,3,4,5]); ve3=(q3*x)+' : '+x; }
    o.s=s; o.q=q3; o.D=D3; o.ve=ve3; o.ans=s;
    o.eq = '<span>'+D3+' :</span>'+ubox()+'<span>= '+ve3+'</span>';
    o.plain = D3+' : ? = '+ve3;
    o.ds=[[D3*q3,'chon-sai-phep'],[D3-q3,'cong-thay-nhan'],[q3,'dao-vai'],[s-1,'canh-dong'],[s+1,'canh-dong']];
    o.gt='Muốn tìm số chia, lấy số bị chia chia cho thương.';
  }
  o.nhan=nhanSai(o.ds, o.ans);
  o.goiY={'chon-sai-phep':o.gt, 'cong-thay-nhan':'Đây là phép nhân, chia, không phải cộng, trừ. '+o.gt, 'dao-vai':'Số bé chép lại là số đã cho. Ô trống mới là số cần tìm.', 'canh-dong':'Bé thử lại: thay đáp số vào phép tính xem có đúng không.', 'chung':o.gt};
  return o;
}
function kiemTP(q){
  var t=q._tp; if(!t || !(t.ans>0) || (q.type==='num' && q.ans!==t.ans)) return false;
  var v=tinhBT(t.ve);
  if(t.mt==='MT1') return t.ans*t.known===v;
  if(t.mt==='MT2') return t.ans===t.b*v && t.ans%t.b===0;
  return t.D%t.ans===0 && t.D/t.ans===v;
}
/* Các cách làm (một dòng chữ) để chọn: Mức 1–2 là phép tính; Mức 3 vế phải là phép tính nên tả hai bước */
function cacPhep(t, lv){
  var ex = lv>=3, ve=t.ve;
  if(t.mt==='MT1') return [[ex ? 'Tính '+ve+' rồi chia cho '+t.known : t.P+' : '+t.known, ''],
    [ex ? 'Tính '+ve+' rồi nhân với '+t.known : t.P+' × '+t.known, 'chon-sai-phep'],
    [ex ? 'Tính '+ve+' rồi trừ đi '+t.known : t.P+' − '+t.known, 'cong-thay-nhan'],
    [ex ? 'Tính '+ve+' rồi lấy '+t.known+' chia cho kết quả' : t.known+' : '+t.P, 'dao-vai']];
  if(t.mt==='MT2') return [[ex ? 'Tính '+ve+' rồi nhân với '+t.b : t.q+' × '+t.b, ''],
    [ex ? 'Tính '+ve+' rồi chia cho '+t.b : t.q+' : '+t.b, 'chon-sai-phep'],
    [ex ? 'Tính '+ve+' rồi cộng với '+t.b : t.q+' + '+t.b, 'cong-thay-nhan'],
    [ex ? 'Tính '+ve+' rồi lấy '+t.b+' chia cho kết quả' : t.b+' : '+t.q, 'dao-vai']];
  return [[ex ? 'Tính '+ve+' rồi lấy '+t.D+' chia cho kết quả' : t.D+' : '+t.q, ''],
    [ex ? 'Tính '+ve+' rồi nhân với '+t.D : t.D+' × '+t.q, 'chon-sai-phep'],
    [ex ? 'Tính '+ve+' rồi lấy '+t.D+' trừ đi kết quả' : t.D+' − '+t.q, 'cong-thay-nhan'],
    [ex ? 'Tính '+ve+' rồi chia kết quả cho '+t.D : t.q+' : '+t.D, 'dao-vai']];
}
var TEN_TP = {'MT1':'thừa số', 'MT2':'số bị chia', 'MT3':'số chia'};

var BAI = {
 n: 13,
 title: 'Tìm Thành Phần Trong Phép Nhân, Phép Chia',
 sub: 'Luyện thông minh: câu hỏi tự đổi theo bé — làm hết lượt để xem ngọn lửa!',
 goal: 10, soCau: 18, soCauToiDa: 24,
 muctieu: [
  {id:'MT1', ten:'Tìm thừa số', muc:['Tìm thừa số trong bảng nhân 2–5; hiểu chia đều số lít cho 2–3 ca.', 'Tìm thừa số trong bảng 2–9, ô trống ở thừa số thứ nhất hoặc thứ hai; chia đều tới 5 ca.', 'Vế còn lại là một phép nhân (? × 4 = 3 × 8); bài hai bước (tìm một ca rồi tính vài ca).']},
  {id:'MT2', ten:'Tìm số bị chia', muc:['Tìm số bị chia với số chia, thương nhỏ (bảng 2–5).', 'Tìm số bị chia trong bảng chia 2–9.', 'Thương là một phép nhân (? : 4 = 2 × 3).']},
  {id:'MT3', ten:'Tìm số chia', muc:['Tìm số chia với số nhỏ (bảng 2–5).', 'Tìm số chia trong bảng chia 2–9.', 'Thương là một phép chia khác (24 : ? = 20 : 5).']},
  {id:'MT4', ten:'Bảng và sơ đồ', muc:['Tìm tích hoặc thương trong bảng, số nhỏ; sơ đồ một bước tìm số đầu (nhân hoặc chia cho 2, 3).', 'Tìm thừa số, số bị chia, số chia hoặc tích trong bảng 2–9; sơ đồ tìm số đầu, nhân hoặc chia cho 2–5.', 'Số lớn (tới 10); sơ đồ HAI bước tính ngược từ cuối về đầu.']},
  {id:'MT5', ten:'Giải toán', muc:['Bài toán một bước với số nhỏ; chọn phép tính.', 'Bài toán chia đều (tìm mỗi phần), chia theo nhóm (tìm số phần), hoặc nhân; chọn phép chia.', 'Bài toán hai bước (chia rồi trừ, chia rồi nhân); chọn biểu thức hai bước.']}
 ],
 topics: [
  /* D1 — Chia đều: ca nước (Khám phá — Tìm thừa số trong một tích) */
  {name:'Chia đều', sec:'Khám phá — Tìm thừa số trong một tích (ca nước)', mt:['MT1'], levels:3,
   muc:['Chia đều số lít nước cho 2–3 ca (số nhỏ).', 'Chia đều số lít nước cho tới 5 ca.', 'Bài hai bước: tìm một ca rồi tính vài ca.'],
   make:function(lv){
    var n = lv<=1 ? rnd(2,3) : rnd(2,5), each = lv<=1 ? rnd(2,5) : rnd(2,9), tot=n*each, js='', i;
    for(i=0;i<n;i++) js+=jug();
    var hinh='<div class="flex justify-center gap-1 mb-2 flex-wrap">'+js+'</div><div class="text-slate-600 text-base mb-1">'+n+' ca đựng nước như nhau, tất cả '+tot+' l nước.</div>';
    if(lv>=3){ var h=rnd(2,4); if(h===n) h=n+1;
      return {type:'num', _e:each*h, q:hinh+'<div>Hỏi '+h+' ca như thế đựng bao nhiêu lít nước?</div>', ans:each*h, unit:'lít',
        sai:nhanSai([[each,'thieu-buoc'],[tot,'thieu-buoc'],[each+h,'cong-thay-nhan']], each*h),
        goiY:{'thieu-buoc':'Bước 1: tìm một ca đựng mấy lít (lấy '+tot+' chia cho '+n+'). Bước 2: tìm '+h+' ca.', 'cong-thay-nhan':'Mỗi ca '+each+' l, '+h+' ca thì '+each+' × '+h+'.'}}; }
    return {type:'num', _e:each, q:hinh+'<div>Hỏi mỗi ca đựng mấy lít nước?</div>'+(lv<=1 ? '<div class="text-slate-500 text-sm mt-1">(? × '+n+' = '+tot+')</div>' : ''), ans:each, unit:'lít',
      sai:nhanSai([[tot,'dao-vai'],[tot-n,'cong-thay-nhan'],[tot*n,'chon-sai-phep'],[each-1,'canh-dong'],[each+1,'canh-dong']], each),
      goiY:{'dao-vai':'Số '+tot+' là tổng số lít của tất cả các ca, chưa phải của một ca.', 'cong-thay-nhan':'Chia đều thì dùng phép chia, không phải phép trừ.', 'chon-sai-phep':'Chia đều thì dùng phép chia: lấy tổng số lít chia cho số ca.', 'canh-dong':'Bé thử lại: '+n+' ca, mỗi ca bao nhiêu lít thì được '+tot+' l?'}};
  }, check:function(q){ return q.ans===q._e && q.ans>0; }},

  /* D2 — Tìm thừa số (Hoạt động 1: theo mẫu) */
  {name:'Tìm thừa số', sec:'Hoạt động 1 — Tìm thừa số theo mẫu', mt:['MT1'], levels:3,
   muc:['Tìm thừa số trong bảng nhân 2–5.', 'Tìm thừa số trong bảng nhân 2–9, ô trống ở thừa số thứ nhất hoặc thứ hai.', 'Tìm thừa số khi vế kia là một phép nhân khác (? × 4 = 3 × 8).'],
   make:function(lv){
    var t=tp('MT1', lv);
    return {type:'num', _tp:t, q:(lv<=1 ? '<div class="text-slate-500 text-sm mb-1">'+t.gt+'</div>' : '')+eqline(t.eq), ans:t.ans, sai:t.nhan, goiY:t.goiY};
  }, check:kiemTP},

  /* D3 — Tìm số bị chia (Khám phá a, Hoạt động 1a: lọ hoa, nhân) */
  {name:'Tìm số bị chia', sec:'Khám phá a, Hoạt động 1a — Tìm số bị chia', mt:['MT2'], levels:3,
   muc:['Tìm số bị chia với số chia, thương nhỏ (bảng 2–5).', 'Tìm số bị chia trong bảng chia 2–9.', 'Tìm số bị chia khi thương là một phép nhân (? : 4 = 2 × 3).'],
   make:function(lv){
    var t=tp('MT2', lv), mo='';
    if(lv<=1) mo='<div class="flex justify-center mb-1">'+anh('bouquet',56)+'</div><div class="text-slate-600 text-base mb-1">Có <b>?</b> bông hoa cắm đều vào '+t.b+' lọ, mỗi lọ '+t.q+' bông.</div><div class="text-slate-500 text-sm mb-1">'+t.gt+'</div>';
    return {type:'num', _tp:t, q:mo+eqline(t.eq), ans:t.ans, sai:t.nhan, goiY:t.goiY};
  }, check:kiemTP},

  /* D4 — Tìm số chia (Khám phá b, Hoạt động 1b: lọ hoa, chia theo nhóm) */
  {name:'Tìm số chia', sec:'Khám phá b, Hoạt động 1b — Tìm số chia', mt:['MT3'], levels:3,
   muc:['Tìm số chia với số nhỏ (bảng 2–5).', 'Tìm số chia trong bảng chia 2–9.', 'Tìm số chia khi thương là một phép chia khác (24 : ? = 20 : 5).'],
   make:function(lv){
    var t=tp('MT3', lv), mo='';
    if(lv<=1) mo='<div class="flex justify-center mb-1">'+anh('bouquet',56)+'</div><div class="text-slate-600 text-base mb-1">Có '+t.D+' bông hoa cắm vào các lọ, mỗi lọ '+t.q+' bông. Cần mấy lọ?</div><div class="text-slate-500 text-sm mb-1">'+t.gt+'</div>';
    return {type:'num', _tp:t, q:mo+eqline(t.eq), ans:t.ans, sai:t.nhan, goiY:t.goiY};
  }, check:kiemTP},

  /* D5 — Chọn cách tìm: chọn phép tính để tìm ô trống (không có trong SGK) */
  {name:'Chọn cách tìm', sec:'Chọn cách tìm — không cần tính ra kết quả', mt:['MT1','MT2','MT3'], levels:3,
   muc:['Chọn phép tính tìm ô trống, bảng 2–5.', 'Chọn phép tính tìm ô trống, bảng 2–9.', 'Chọn các bước làm khi vế kia là một phép tính.'],
   make:function(lv, mt){
    mt = mt || pick(['MT1','MT2','MT3']);
    var t, ds, texts, g=0;
    do { t=tp(mt, lv); ds=cacPhep(t, lv); if(lv<=1) ds.pop(); texts=ds.map(function(d){ return d[0]; }); g++; } while(new Set(texts).size<texts.length && g<40);
    var dung=ds[0][0]; shuffle(ds);
    var ch=ds.map(function(d){ return d[0]; }), sai={}; ds.forEach(function(d,i){ if(d[1]) sai[String(i)]=d[1]; });
    return {type:'mcq', cot:1, mt:mt, _dung:dung, q:'<div class="text-3xl font-extrabold text-orange-700 my-2">'+t.plain+'</div><div>Muốn tìm <b>'+TEN_TP[mt]+'</b> ở ô <b class="text-amber-700">?</b>, bé làm thế nào?</div>',
      choices:ch, correct:ch.indexOf(dung), sai:sai, goiY:t.goiY};
  }, check:kiemMCQ},

  /* D6 — Bảng thừa số · thừa số · tích (Hoạt động 2) */
  {name:'Bảng thừa số', sec:'Hoạt động 2 — Số? (thừa số và tích)', mt:['MT4'], levels:3,
   muc:['Tìm tích của hai thừa số nhỏ.', 'Tìm thừa số hoặc tích trong bảng nhân 2–9.', 'Tìm thừa số với các số lớn (tới 10).'],
   make:function(lv){
    var f1=soLon(lv), f2=soLon(lv), P=f1*f2, hide = lv<=1 ? 2 : (lv===2 ? rnd(0,2) : rnd(0,1)), ans = hide===0?f1 : (hide===1?f2 : P), kn = hide===0 ? f2 : f1, sai, gy;
    if(hide===2){ sai=nhanSai([[f1+f2,'cong-thay-nhan'],[P-f1,'canh-dong'],[P+f1,'canh-dong'],[P-f2,'canh-dong'],[P+f2,'canh-dong']], P);
      gy={'cong-thay-nhan':'Tích là kết quả của phép nhân, không phải phép cộng.', 'canh-dong':'Bé nhẩm lại '+f1+' × '+f2+' nhé!'}; }
    else { sai=nhanSai([[P*kn,'chon-sai-phep'],[P-kn,'cong-thay-nhan'],[kn,'dao-vai'],[ans-1,'canh-dong'],[ans+1,'canh-dong']], ans);
      gy={'chon-sai-phep':'Muốn tìm một thừa số, lấy tích chia cho thừa số kia.', 'cong-thay-nhan':'Đây là phép chia, không phải phép trừ.', 'dao-vai':'Số bé chép lại là thừa số đã có. Ô trống là thừa số còn lại.', 'canh-dong':'Bé thử lại: nhân với '+kn+' có ra '+P+' không?'}; }
    return {type:'num', _a:ans, _f1:f1, _f2:f2, _h:hide, q:tri('Thừa số','Thừa số','Tích', f1,f2,P, hide)+'<div class="mt-1">Số ở ô <b class="text-amber-700">?</b> là bao nhiêu?</div>', ans:ans, sai:sai, goiY:gy};
  }, check:function(q){ return q.ans===[q._f1,q._f2,q._f1*q._f2][q._h]; }},

  /* D7 — Bảng số bị chia · số chia · thương (Hoạt động 2) */
  {name:'Bảng chia', sec:'Hoạt động 2 — Số? (số bị chia, số chia, thương)', mt:['MT4'], levels:3,
   muc:['Tìm thương với số nhỏ.', 'Tìm số bị chia, số chia hoặc thương trong bảng chia 2–9.', 'Tìm số chia hoặc số bị chia với các số lớn (tới 10).'],
   make:function(lv){
    var s=soLon(lv), q2=soLon(lv), D=s*q2, hide = lv<=1 ? 2 : (lv===2 ? rnd(0,2) : rnd(0,1)), ans = hide===0?D : (hide===1?s : q2), sai, gy;
    if(hide===2){ sai=nhanSai([[s,'dao-vai'],[D-s,'cong-thay-nhan'],[q2-1,'canh-dong'],[q2+1,'canh-dong']], q2);
      gy={'dao-vai':'Thương là kết quả của phép chia, không phải số chia.', 'cong-thay-nhan':'Đây là phép chia, không phải phép trừ.', 'canh-dong':'Bé nhẩm: '+s+' × mấy = '+D+'?'}; }
    else if(hide===1){ sai=nhanSai([[D,'dao-vai'],[D*q2,'chon-sai-phep'],[D-q2,'cong-thay-nhan'],[q2,'dao-vai'],[s-1,'canh-dong'],[s+1,'canh-dong']], s);
      gy={'dao-vai':'Số bé chép lại là số đã cho. Ô trống là số chia.', 'chon-sai-phep':'Muốn tìm số chia, lấy số bị chia chia cho thương.', 'cong-thay-nhan':'Đây là phép chia, không phải phép trừ.', 'canh-dong':'Bé thử lại: '+D+' chia cho số đó có ra '+q2+' không?'}; }
    else { sai=nhanSai([[q2,'dao-vai'],[q2+s,'cong-thay-nhan'],[D-s,'canh-dong'],[D+s,'canh-dong'],[s,'dao-vai']], D);
      gy={'dao-vai':'Số bé chép lại là số đã cho. Ô trống là số bị chia.', 'cong-thay-nhan':'Muốn tìm số bị chia, lấy thương nhân số chia, không phải cộng.', 'canh-dong':'Bé thử lại: chia số đó cho '+s+' có ra '+q2+' không?'}; }
    return {type:'num', _a:ans, _s:s, _q:q2, _h:hide, q:tri('Số bị chia','Số chia','Thương', D,s,q2, hide)+'<div class="mt-1">Số ở ô <b class="text-amber-700">?</b> là bao nhiêu?</div>', ans:ans, sai:sai, goiY:gy};
  }, check:function(q){ return q.ans===[q._s*q._q,q._s,q._q][q._h]; }},

  /* D8 — Sơ đồ mũi tên tìm ô đầu (Luyện tập 1) */
  {name:'Sơ đồ', sec:'Luyện tập 1 — Số? (mũi tên tìm ô đầu)', mt:['MT4'], levels:3,
   muc:['Tìm số đầu sau một phép nhân hoặc chia cho 2, 3.', 'Tìm số đầu sau một phép nhân hoặc chia cho 2–5.', 'Tìm số đầu qua HAI bước (tính ngược từ cuối về đầu).'],
   make:function(lv){
    var hoi='<div>Số ở ô đầu <b class="text-amber-700">?</b> là bao nhiêu?</div>';
    if(lv>=3){ var st=rnd(2,9), k=rnd(2,4), m=rnd(2,9), R;
      if(Math.random()<0.5){ R=st*k+m;
        return {type:'num', _a:st, _bt:st+' × '+k+' + '+m, _R:R, q:arrowFind2('× '+k, '+ '+m, R)+hoi, ans:st,
          sai:nhanSai([[R-m,'thieu-buoc'],[R,'dao-vai'],[st-1,'canh-dong'],[st+1,'canh-dong']], st), goiY:{'thieu-buoc':'Bé quay ngược từng mũi tên, từ cuối về đầu: trừ '+m+' trước, rồi chia cho '+k+'.', 'dao-vai':'Số '+R+' là số ở ô cuối, chưa phải ô đầu.', 'canh-dong':'Bé thử lại: lấy số đó nhân '+k+', cộng '+m+' có ra '+R+' không?'}}; }
      var m2=rnd(1,st*k-1); R=st*k-m2;
      return {type:'num', _a:st, _bt:st+' × '+k+' − '+m2, _R:R, q:arrowFind2('× '+k, '− '+m2, R)+hoi, ans:st,
        sai:nhanSai([[R+m2,'thieu-buoc'],[R,'dao-vai'],[st-1,'canh-dong'],[st+1,'canh-dong']], st), goiY:{'thieu-buoc':'Bé quay ngược từng mũi tên, từ cuối về đầu: cộng '+m2+' trước, rồi chia cho '+k+'.', 'dao-vai':'Số '+R+' là số ở ô cuối, chưa phải ô đầu.', 'canh-dong':'Bé thử lại: lấy số đó nhân '+k+', trừ '+m2+' có ra '+R+' không?'}}; }
    var k2 = lv<=1 ? rnd(2,3) : rnd(2,5);
    if(Math.random()<0.5){ var s0 = lv<=1 ? rnd(2,5) : rnd(2,10), R1=s0*k2;
      return {type:'num', _a:s0, _bt:s0+' × '+k2, _R:R1, q:arrowFind('× '+k2, R1)+hoi, ans:s0,
        sai:nhanSai([[R1,'dao-vai'],[R1-k2,'cong-thay-nhan'],[s0-1,'canh-dong'],[s0+1,'canh-dong']], s0), goiY:{'dao-vai':'Số '+R1+' là số ở ô cuối. Ô đầu nhân '+k2+' ra '+R1+'.', 'cong-thay-nhan':'Mũi tên × '+k2+': muốn quay về ô đầu thì chia cho '+k2+'.', 'canh-dong':'Bé thử lại: số đó nhân '+k2+' có ra '+R1+' không?'}}; }
    var R2 = lv<=1 ? rnd(2,5) : rnd(2,10), s2=R2*k2;
    return {type:'num', _a:s2, _bt:s2+' : '+k2, _R:R2, q:arrowFind(': '+k2, R2)+hoi, ans:s2,
      sai:nhanSai([[R2,'dao-vai'],[R2+k2,'cong-thay-nhan'],[s2-k2,'canh-dong'],[s2+k2,'canh-dong']], s2), goiY:{'dao-vai':'Số '+R2+' là số ở ô cuối. Ô đầu chia '+k2+' ra '+R2+'.', 'cong-thay-nhan':'Mũi tên : '+k2+': muốn quay về ô đầu thì nhân với '+k2+'.', 'canh-dong':'Bé thử lại: số đó chia '+k2+' có ra '+R2+' không?'}};
  }, check:function(q){ return q.ans===q._a && tinhBT(q._bt)===q._R && +q._bt.split(' ')[0]===q.ans; }},

  /* D9 — Đúng hay sai? Tìm lỗi (không có trong SGK) */
  {name:'Đúng / Sai', sec:'Tìm lỗi — Bạn tính đúng hay sai?', mt:['MT1','MT2','MT3'], levels:3,
   muc:['Nhận ra kết quả sai thô (cộng, trừ thay nhân, chia).', 'Nhận ra kết quả sai tinh (nhầm sang ô bên cạnh, lấy nhầm số).', 'Chỉ ra lỗi của bạn và tìm kết quả đúng.'],
   make:function(lv, mt){
    mt = mt || pick(['MT1','MT2','MT3']);
    var t=tp(mt, lv), tho=['chon-sai-phep','cong-thay-nhan'], tinh=['canh-dong','dao-vai'];
    var ds=t.ds.filter(function(p){ return p[0]>0 && p[0]!==t.ans && (lv<=1 ? tho : (lv===2 ? tinh : tho.concat(tinh))).indexOf(p[1])>=0; });
    if(!ds.length) ds=t.ds.filter(function(p){ return p[0]>0 && p[0]!==t.ans; });
    var ls=pick(ds);
    if(lv>=3){
      return {type:'num', mt:mt, _tp:t, q:'<div class="flex justify-center mb-1">'+anh('boy', 72, 'Bạn An')+'</div><div class="text-2xl font-extrabold text-orange-600 my-1">'+t.plain+'</div><div>Bạn An tìm được <b class="text-orange-600">? = '+ls[0]+'</b>. An tính sai rồi!</div><div class="mt-1">Số đúng ở ô <b class="text-amber-700">?</b> là bao nhiêu?</div>',
        ans:t.ans, sai:nhanSai([[ls[0], ls[1]]], t.ans), goiY:t.goiY};
    }
    var laDung=Math.random()<0.5, X = laDung ? t.ans : ls[0], sai = laDung ? {} : {'0': ls[1]}, gy={};
    Object.keys(t.goiY).forEach(function(k){ gy[k]=t.goiY[k]; });
    gy.chung = laDung ? 'Phép tính này đúng. Bé thử lại bằng cách thay số vào ô trống!' : 'Bé thử lại: thay '+X+' vào ô trống xem có đúng không.';
    return {type:'mcq', mt:mt, figFn:dsBtn13, _tp:t, _dung:(laDung?'Đ':'S'), _X:X,
      q:'<div class="text-3xl font-extrabold text-orange-600 my-2">'+t.plain+'</div><div class="mt-1">Bạn An nói: <b>? = '+X+'</b></div><div class="text-base text-slate-500">Đúng (Đ) hay sai (S)?</div>',
      choices:['Đ','S'], correct:(laDung?0:1), sai:sai, goiY:gy};
  }, check:function(q){ if(!kiemTP(q)) return false; if(q.type==='num') return true; return kiemMCQ(q) && (q._dung==='Đ')===(q._X===q._tp.ans); }},

  /* D10 — Giải toán: ca-bin chia đều (Hoạt động 3), đĩa cam chia theo nhóm (Luyện tập 2), lọ hoa */
  {name:'Giải toán', sec:'Hoạt động 3, Luyện tập 2 — Giải toán', mt:['MT5'], levels:3,
   muc:['Bài toán một bước với số nhỏ (tìm tổng số hoa).', 'Chia đều (tìm mỗi ca-bin), chia theo nhóm (tìm số đĩa cam), hoặc nhân.', 'Bài toán hai bước (chia rồi trừ, chia rồi nhân).'],
   make:function(lv){
    var r=Math.random(), hoa=function(){ return '<div class="flex justify-center mb-2">'+anh('bouquet',64)+'</div>'; };
    if(lv<=1){ var L=rnd(2,4), b=rnd(2,5);
      return {type:'num', _e:L*b, q:hoa()+'Mai cắm hết số bông hoa vào '+L+' lọ, mỗi lọ có '+b+' bông. Hỏi Mai đã cắm tất cả bao nhiêu bông hoa?', ans:L*b, unit:'bông',
        sai:nhanSai([[L+b,'cong-thay-nhan'],[L*b-b,'canh-dong'],[L*b+b,'canh-dong']], L*b), goiY:{'cong-thay-nhan':L+' lọ, mỗi lọ '+b+' bông: '+L+' × '+b+'.', 'canh-dong':'Bé đếm lại số lọ hoa nhé!'}}; }
    if(lv===2){
      if(r<0.34){ var m=rnd(2,7), d=rnd(3,7), T=m*d;   /* chia theo nhóm: biết mỗi đĩa m quả, tìm số đĩa */
        return {type:'num', _e:d, q:'Có '+T+' quả cam xếp vào các đĩa, mỗi đĩa '+m+' quả. Hỏi xếp được mấy đĩa cam như vậy?', ans:d, unit:'đĩa',
          sai:nhanSai([[T,'dao-vai'],[T-m,'cong-thay-nhan'],[T*m,'chon-sai-phep'],[d-1,'canh-dong'],[d+1,'canh-dong']], d),
          goiY:{'dao-vai':'Số '+T+' là tổng số quả cam. Bé tìm số đĩa.', 'cong-thay-nhan':'Đây là phép chia, không phải phép trừ.', 'chon-sai-phep':'Xếp mỗi đĩa '+m+' quả, hỏi mấy đĩa: lấy '+T+' chia cho '+m+'.', 'canh-dong':'Bé nhẩm: '+m+' × mấy = '+T+'?'}}; }
      if(r<0.67){ var n=rnd(3,6), each=rnd(3,8), T2=n*each;   /* chia đều: tìm mỗi ca-bin */
        return {type:'num', _e:each, q:n+' ca-bin chở tất cả '+T2+' người, mỗi ca-bin chở như nhau. Hỏi mỗi ca-bin chở bao nhiêu người?', ans:each, unit:'người',
          sai:nhanSai([[T2,'dao-vai'],[T2-n,'cong-thay-nhan'],[T2*n,'chon-sai-phep'],[each-1,'canh-dong'],[each+1,'canh-dong']], each),
          goiY:{'dao-vai':'Số '+T2+' là tổng số người của tất cả ca-bin.', 'cong-thay-nhan':'Đây là phép chia, không phải phép trừ.', 'chon-sai-phep':'Chia đều cho '+n+' ca-bin: lấy '+T2+' chia cho '+n+'.', 'canh-dong':'Bé nhẩm: '+n+' × mấy = '+T2+'?'}}; }
      var L2=rnd(2,6), b2=rnd(3,8);
      return {type:'num', _e:L2*b2, q:hoa()+'Mai cắm hết số bông hoa vào '+L2+' lọ, mỗi lọ có '+b2+' bông. Hỏi Mai đã cắm tất cả bao nhiêu bông hoa?', ans:L2*b2, unit:'bông',
        sai:nhanSai([[L2+b2,'cong-thay-nhan'],[L2*b2-b2,'canh-dong'],[L2*b2+b2,'canh-dong']], L2*b2), goiY:{'cong-thay-nhan':L2+' lọ, mỗi lọ '+b2+' bông: '+L2+' × '+b2+'.', 'canh-dong':'Bé đếm lại số lọ hoa nhé!'}}; }
    if(r<0.5){ var m3=rnd(2,6), d3=rnd(4,9), ban=rnd(1,d3-1);   /* chia theo nhóm rồi trừ */
      return {type:'num', _e:d3-ban, q:'Có '+(m3*d3)+' quả cam xếp vào các đĩa, mỗi đĩa '+m3+' quả. Đã bán '+ban+' đĩa. Hỏi còn lại mấy đĩa cam?', ans:d3-ban, unit:'đĩa',
        sai:nhanSai([[d3,'thieu-buoc'],[m3*d3,'dao-vai'],[d3+ban,'chon-sai-phep']], d3-ban),
        goiY:{'thieu-buoc':'Bé đã tìm được số đĩa cam. Còn bước trừ đi '+ban+' đĩa đã bán!', 'dao-vai':'Số '+(m3*d3)+' là số quả cam, còn bài hỏi số đĩa.', 'chon-sai-phep':'Đã bán thì số đĩa còn lại ít đi: dùng phép trừ.'}}; }
    var n3=rnd(3,6), e3=rnd(3,8), h3=rnd(2,4); if(h3===n3) h3=2;   /* chia đều rồi nhân */
    return {type:'num', _e:e3*h3, q:n3+' ca-bin chở tất cả '+(n3*e3)+' người, mỗi ca-bin chở như nhau. Hỏi '+h3+' ca-bin như thế chở bao nhiêu người?', ans:e3*h3, unit:'người',
      sai:nhanSai([[e3,'thieu-buoc'],[n3*e3,'thieu-buoc'],[n3+h3,'cong-thay-nhan']], e3*h3),
      goiY:{'thieu-buoc':'Bước 1: tìm mỗi ca-bin chở bao nhiêu người. Bước 2: tìm '+h3+' ca-bin.', 'cong-thay-nhan':'Mỗi ca-bin '+e3+' người, '+h3+' ca-bin thì '+e3+' × '+h3+'.'}};
  }, check:function(q){ return q.ans===q._e && q.ans>0; }},

  /* D11 — Chọn phép tính cho bài toán (không có trong SGK) */
  {name:'Chọn phép tính', sec:'Chọn phép tính — không cần tính ra kết quả', mt:['MT5'], levels:3,
   muc:['Chọn phép nhân cho tình huống gộp nhiều nhóm bằng nhau.', 'Chọn phép chia cho tình huống chia đều hoặc chia theo nhóm.', 'Chọn biểu thức cho bài toán hai bước.'],
   make:function(lv){
    var ds, q, hinh='';   /* ds = [[lựa chọn, nhãn lỗi]] — phần tử đầu là đáp án đúng; hinh = hình gợi tình huống (không có số để đếm) */
    if(lv<=1){ var L=rnd(2,6), b=rnd(2,5);
      ds=[[L+' × '+b,''], [L+' + '+b,'cong-thay-nhan'], [(L*b)+' : '+b,'chon-sai-phep']]; hinh=anh('bouquet',52);
      q='<div>Mai cắm hoa vào '+L+' lọ, mỗi lọ '+b+' bông.</div><div class="mt-1">Phép tính nào tìm được <b>tổng số bông hoa</b>?</div>'; }
    else if(lv===2){ var k=rnd(3,8), m=rnd(3,7), T=k*m, ct=pick([['Chia đều '+T+' l nước vào '+k+' ca.','số lít mỗi ca',jug()],['Có '+T+' quả cam xếp vào các đĩa, mỗi đĩa '+m+' quả.','số đĩa cam','']]);
      var cs = ct[1]==='số lít mỗi ca' ? [T+' : '+k, T+' × '+k, T+' − '+k, k+' : '+T] : [T+' : '+m, T+' × '+m, T+' − '+m, m+' : '+T];
      ds=[[cs[0],''], [cs[1],'chon-sai-phep'], [cs[2],'cong-thay-nhan'], [cs[3],'dao-vai']]; hinh=ct[2]; q='<div>'+ct[0]+'</div><div class="mt-1">Phép tính nào tìm được <b>'+ct[1]+'</b>?</div>'; }
    else { var m3=rnd(2,6), d3=rnd(4,9), ban=rnd(1,d3-1); if(ban===m3) ban = ban===1 ? 2 : ban-1;
      var T3=m3*d3;
      ds=[[T3+' : '+m3+' − '+ban,''], [T3+' : '+m3+' + '+ban,'chon-sai-phep'], [T3+' − '+m3+' − '+ban,'cong-thay-nhan'], [T3+' : '+ban+' − '+m3,'dao-vai']];
      q='<div>Có '+T3+' quả cam xếp vào các đĩa, mỗi đĩa '+m3+' quả. Đã bán '+ban+' đĩa.</div><div class="mt-1">Phép tính nào tìm được <b>số đĩa cam còn lại</b>?</div>'; }
    var dung=ds[0][0]; shuffle(ds);
    var ch=ds.map(function(d){ return d[0]; }), sai={}; ds.forEach(function(d,i){ if(d[1]) sai[String(i)]=d[1]; });
    return {type:'mcq', cot:1, _dung:dung, q:(hinh ? '<div class="flex justify-center gap-1 mb-2">'+hinh+'</div>' : '')+q, choices:ch, correct:ch.indexOf(dung), sai:sai,
      goiY:{'chon-sai-phep':'Gộp nhiều nhóm bằng nhau: phép nhân. Chia thành phần bằng nhau: phép chia. Đã bán đi: phép trừ.', 'cong-thay-nhan':'Có nhiều nhóm bằng nhau thì dùng phép nhân (hoặc chia), không phải cộng, trừ.', 'dao-vai':'Bé xem lại: số nào là tổng, số nào là số quả mỗi đĩa?'}};
  }, check:kiemMCQ}
 ]
};
