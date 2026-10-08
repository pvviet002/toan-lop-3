/* bai-12.js — Bài 12: Bảng nhân 9, bảng chia 9. Engine v2 — LUYỆN THÔNG MINH.
   Theo bảng phân tích sư phạm đã duyệt (phan-tich-su-pham/bai-12.md):
   5 MỤC TIÊU (muctieu) × 13 DẠNG (topics), mỗi dạng 3 mức (Thông tư 27: Nhận biết · Hiểu · Vận dụng).
   Mỗi câu gắn nhãn lỗi cho đáp án nhiễu (q.sai) + gợi ý (q.goiY) để engine phản hồi đúng kiểu sai.
   Hình dùng chung (figures.js): doiMuaRong, thuyen, tuiCam, hangCan, hopBut, melon, flower, soDo, bnDaySo, xepHang, anh.
   Vật để ĐẾM (người múa rồng, quả cam, can, bút) mang data-dem; check() đếm lại trong chuỗi SVG của câu.
   QUY TẮC: nối chuỗi, KHÔNG backtick và KHÔNG template literal. */

/* ---- Tiện ích riêng bài 12 (chép từ bài 11, đổi 8 thành 9) ---- */
/* Bảng nhãn lỗi cho đáp số: ds = [[giá trị, nhãn], …]; bỏ giá trị <= 0 hoặc trùng đáp án đúng */
function nhanSai(ds, dung){ var o={}; ds.forEach(function(p){ var v=p[0]; if(v>0 && v!==dung && !(String(v) in o)) o[String(v)]=p[1]; }); return o; }
/* Nhãn lỗi hay gặp khi tính 9 × k: dòng bên cạnh, cộng thay nhân, nhầm sang bảng 8 hoặc bảng 10 */
function saiNhan9(k){ return nhanSai([[9*(k-1),'canh-dong'],[9*(k+1),'canh-dong'],[9+k,'cong-thay-nhan'],[8*k,'nham-bang'],[10*k,'nham-bang']], 9*k); }
function goiYNhan9(k){ return {'canh-dong':'Bé thử: 9 × '+k+' = 10 × '+k+' − '+k+' = '+(10*k)+' − '+k+'.', 'cong-thay-nhan':'9 × '+k+' là '+k+' lần số 9, không phải 9 + '+k+'.',
  'nham-bang':'Đây là bảng nhân 9: 9, 18, 27, 36, 45, 54, 63, 72, 81, 90. Hai chữ số của kết quả cộng lại bằng 9.'}; }
function saiChia9(k){ return nhanSai([[k-1,'canh-dong'],[k+1,'canh-dong'],[9*k-9,'cong-thay-nhan'],[9,'dao-vai']], k); }
function goiYChia9(k){ return {'canh-dong':'Bé nhẩm: 9 × mấy = '+(9*k)+'?', 'cong-thay-nhan':'Đây là phép chia, không phải phép trừ.', 'dao-vai':'Tìm số mà 9 × số đó = '+(9*k)+'.'}; }
function dsBtn12(ch){ return '<span class="text-2xl font-extrabold text-slate-700">'+ch+'</span><span class="ml-2 text-base font-bold text-slate-600">'+(ch==='Đ'?'Đúng':'Sai')+'</span>'; }
function kyHieu(nhan, bt){ return '<div class="text-slate-500 mb-1">'+nhan+'</div><div class="text-4xl font-extrabold text-orange-600">'+bt+'</div>'; }
function kiemMCQ(q){ return q.choices[q.correct]===q._dung && new Set(q.choices).size===q.choices.length; }
/* Đếm số vật có data-dem="loai" trong chuỗi SVG của câu hỏi */
function demDem(s, loai){ var m=String(s).match(new RegExp('data-dem="'+loai+'"', 'g')); return m ? m.length : 0; }
/* Đếm số chiếc thuyền (thuyền không mang data-dem: nhận ra bằng cột buồm) */
function demThuyen(s){ var m=String(s).match(/M31 6 V44/g); return m ? m.length : 0; }
/* Đúng hay sai của một đẳng thức dạng "a × b = c" hoặc "a : b = c" */
function dungPT(s){ var p=s.split(' = '); return tinhBT(p[0])===+p[1]; }

/* ---- Bảng nhân 9 / bảng chia 9 có một dòng bị che (Khám phá). chia = true: bảng chia. ---- */
function bang9(lv, chia){
  var k = lv<=1 ? rnd(2,5) : (lv===2 ? rnd(6,10) : rnd(3,9)), an = lv>=3 ? [k-1,k+1] : [], mau = chia ? '#7dd3fc' : '#fcd34d', i;
  var rows='<div class="text-center '+(chia?'text-sky-700':'text-orange-700')+' font-extrabold mb-1">Bảng '+(chia?'chia ':'nhân ')+'9</div>';
  for(i=1;i<=10;i++){
    var trai = chia ? (9*i)+' : 9' : '9 × '+i, phai = chia ? i : 9*i;
    if(i===k) rows+='<div class="'+(chia?'bg-sky-100':'bg-amber-200')+' rounded font-extrabold">'+trai+' = <span class="'+(chia?'text-sky-700':'text-amber-700')+'">?</span></div>';
    else if(an.indexOf(i)>=0) rows+='<div class="text-slate-500">'+trai+' = &#8230;</div>';
    else rows+='<div>'+trai+' = '+phai+'</div>';
  }
  var tbl='<div style="display:inline-block;text-align:left"><div style="border:2px solid '+mau+';border-radius:12px;background:#fff;padding:8px 18px;font-weight:700;line-height:1.5">'+rows+'</div></div>';
  return {type:'num', mt:(chia?'MT3':'MT2'), _k:k, _b:9, _div:chia, q:tbl+'<div class="mt-2">Số còn thiếu ở <b class="text-amber-700">'+(chia?(9*k)+' : 9':'9 × '+k)+'</b> là bao nhiêu?</div>', ans:chia?k:9*k,
    sai:(chia?saiChia9(k):saiNhan9(k)), goiY:(chia?goiYChia9(k):goiYNhan9(k))};
}

/* Phép tính (bảng 2–5) có kết quả bằng v — cho dạng "Cùng kết quả" (như SGK: 45 : 9 và 20 : 4) */
function btBang25(v){
  var o=[];
  for(var x=2;x<=5;x++){ if(v%x===0 && v/x<=10 && v/x>=1) o.push(x+' × '+(v/x)); if(v*x<=50) o.push((v*x)+' : '+x); }
  return o;
}
function kiemCung(q){ var n=q.choices.filter(function(c){ return tinhBT(c)===q._v; }).length; return n===1 && tinhBT(q.choices[q.correct])===q._v && tinhBT(q._target)===q._v && new Set(q.choices).size===q.choices.length; }

var BAI = {
 n: 12,
 title: 'Bảng Nhân 9, Bảng Chia 9',
 sub: 'Luyện thông minh: câu hỏi tự đổi theo bé — làm hết lượt để xem ngọn lửa!',
 goal: 10, soCau: 18, soCauToiDa: 24,
 muctieu: [
  {id:'MT1', ten:'Ý nghĩa phép nhân', muc:['Đếm các nhóm 9 bằng phép cộng các số 9 (2–3 nhóm).', 'Viết tổng 4–7 số 9 thành phép nhân; nhận ra 9 × n là n lần số 9.', 'Biết tổng, tìm số nhóm; nhận ra cách viết sai.']},
  {id:'MT2', ten:'Bảng nhân 9', muc:['Nhớ 9 × 1 đến 9 × 5.', 'Nhớ cả bảng (9 × 6 … 9 × 10), đổi chỗ thừa số, nhận ra kết quả sai.', 'Dùng kết quả đã biết để tính nhanh (9 × 5 = 45 nên 9 × 6 = 45 + 9); chỉ ra lỗi của bạn.']},
  {id:'MT3', ten:'Bảng chia 9', muc:['Chia nhẩm 18 : 9 … 45 : 9.', 'Chia nhẩm cả bảng (54 : 9 … 90 : 9); từ phép nhân suy ra phép chia.', 'Từ một phép nhân suy ra cả hai phép chia; tìm số bị chia; tìm lỗi sai của bạn.']},
  {id:'MT4', ten:'Liên hệ phép tính', muc:['Đếm thêm 9 (đầu dãy); sơ đồ nhân rồi chia số nhỏ; so kết quả với 10 khi kết quả khác xa 10; đổi chỗ thừa số.', 'Đếm thêm hoặc bớt 9 (giữa dãy); sơ đồ nhân rồi chia các số trong bảng đã học; so với 10 khi kết quả sát 10; cùng kết quả ở bảng khác.', 'Dãy bị che ô cạnh; sơ đồ số lớn; so với 10 phép tính hai bước; hiểu cấu tạo bảng (9 × 5 = 9 × 4 + 9).']},
  {id:'MT5', ten:'Giải toán', muc:['Bài toán một phép nhân với số nhỏ; chọn phép nhân cho tình huống.', 'Nhân hoặc chia đều với 9; chọn phép chia.', 'Bài toán hai bước (nhân rồi trừ, chia rồi nhân); chọn biểu thức hai bước.']}
 ],
 topics: [
  /* D1 — Múa rồng (Khám phá) */
  {name:'Múa rồng', sec:'Khám phá — Phép nhân 9 từ phép cộng', mt:['MT1'], levels:3,
   muc:['Đếm số người của 2–3 đội múa rồng bằng phép cộng các số 9.', 'Cộng nhiều số 9 (4 đội) mà không cần gợi ý phép nhân.', 'Làm ngược lại: biết tổng số người, tìm số đội múa rồng.'],
   make:function(lv){
    if(lv>=3){ var m=rnd(3,9);
      return {type:'num', _m:m, _nguoc:true, q:doiMuaRong(1)+'<div>Mỗi đội múa rồng có 9 người. Có tất cả '+(9*m)+' người múa rồng.</div><div class="mt-1">Hỏi có mấy đội múa rồng?</div>', ans:m, unit:'đội',
        sai:nhanSai([[9*m,'chon-sai-phep'],[m-1,'lech-nhom'],[m+1,'lech-nhom']], m), goiY:{'chon-sai-phep':'Bé tìm xem 9 × mấy = '+(9*m)+'.', 'lech-nhom':'Bé nhẩm: 9 × mấy = '+(9*m)+'?'}}; }
    var n = lv<=1 ? rnd(2,3) : 4, add=[];
    for(var i=0;i<n;i++) add.push('9');
    return {type:'num', _n:n, _nguoc:false, q:doiMuaRong(n)
      +'<div class="text-slate-600 text-base mb-2">Mỗi đội múa rồng có 9 người. Có '+n+' đội múa rồng như thế.</div>'
      +'<div class="text-xl">'+add.join(' + ')+' = ?</div>'
      +(lv<=1 ? '<div class="text-slate-500 text-base mt-1">(tức là 9 × '+n+')</div>' : ''), ans:9*n, unit:'người',
      sai:nhanSai([[9+n,'cong-thay-nhan'],[9*(n-1),'lech-nhom'],[9*(n+1),'lech-nhom']], 9*n), goiY:{'cong-thay-nhan':'Có '+n+' đội, mỗi đội 9 người: cộng '+n+' số 9.', 'lech-nhom':'Bé đếm lại số đội múa rồng nhé!'}};
  }, check:function(q){ return q._nguoc ? (q.ans===q._m && demDem(q.q,'ban')===9) : (q.ans===9*q._n && demDem(q.q,'ban')===9*q._n); }},

  /* D2 — Tổng các số 9 → phép nhân (không có trong SGK) */
  {name:'Tổng số 9', sec:'Viết tổng các số 9 thành phép nhân', mt:['MT1'], levels:3,
   muc:['Viết tổng 2–3 số 9 thành phép nhân.', 'Viết tổng 5–7 số 9 thành phép nhân.', 'Nhận ra cách viết sai (đếm nhầm số các số 9).'],
   make:function(lv){
    var k = lv<=1 ? rnd(2,3) : (lv===2 ? rnd(5,7) : rnd(4,7)), a=[]; for(var i=0;i<k;i++) a.push('9');
    if(lv>=3){ var m = Math.random()<0.5 ? k : k+pick([-1,1]), dung = m===k ? 'Đ' : 'S';
      return {type:'mcq', figFn:dsBtn12, _dung:dung, _k:k, _m:m, q:'<div class="text-2xl font-extrabold text-orange-600 my-2">'+a.join(' + ')+' = 9 × '+m+'</div><div class="text-base text-slate-500">Đúng (Đ) hay sai (S)?</div>',
        choices:['Đ','S'], correct:(dung==='Đ'?0:1), sai:(dung==='Đ'?{}:{'0':'lech-nhom'}), goiY:{'lech-nhom':'Bé đếm lại xem có mấy số 9 nhé!', 'chung':'Bé đếm xem có mấy số 9 trong tổng.'}}; }
    return {type:'num', _e:k, q:'<div class="text-2xl font-extrabold text-orange-600 my-2">'+a.join(' + ')+' = 9 ×'+oHoi()+'</div>', ans:k,
      sai:nhanSai([[k-1,'lech-nhom'],[k+1,'lech-nhom'],[9*k,'dao-vai']], k), goiY:{'lech-nhom':'Bé đếm lại xem có mấy số 9 nhé!', 'dao-vai':'Ô trống là số lần lấy 9, không phải kết quả.'}};
  }, check:function(q){ return q.type==='mcq' ? (kiemMCQ(q) && (q._dung==='Đ')===(q._m===q._k)) : q.ans===q._e; }},

  /* D3 — Lập bảng nhân 9 / bảng chia 9 (Khám phá). Dùng chung MT2 và MT3 */
  {name:'Lập bảng', sec:'Khám phá — Hoàn thành bảng nhân 9, bảng chia 9', mt:['MT2','MT3'], levels:3,
   muc:['Điền các dòng đầu của bảng nhân 9 hoặc bảng chia 9.', 'Điền các dòng cuối của bảng nhân 9 hoặc bảng chia 9.', 'Điền khi các dòng bên cạnh cũng bị che — phải nhớ, không đếm thêm.'],
   make:function(lv, mt){ return bang9(lv, mt==='MT3' ? true : (mt==='MT2' ? false : Math.random()<0.5)); },
   check:function(q){ return bnKiemBang(q) && q.ans>0; }},

  /* D4 — Nhân nhẩm bảng 9 (Hoạt động 1) */
  {name:'Nhân nhẩm', sec:'Hoạt động 1 — Tính nhẩm bảng nhân 9', mt:['MT2'], levels:3,
   muc:['Nhớ 9 × 1 đến 9 × 5.', 'Nhớ 9 × 6 đến 9 × 10, cả khi đổi chỗ thừa số.', 'Dùng kết quả đã biết để tính nhanh kết quả bên cạnh, hoặc tìm thừa số chưa biết.'],
   make:function(lv){
    var k;
    if(lv<=1){ k=rnd(1,5); return {type:'num', _e:9*k, q:kyHieu('Tính nhẩm', '9 × '+k+' ='+oHoi()), ans:9*k, sai:saiNhan9(k), goiY:goiYNhan9(k)}; }
    if(lv===2){ k=pick([6,7,8,9,10,rnd(2,10)]); var bt = Math.random()<0.6 ? '9 × '+k : k+' × 9';
      return {type:'num', _e:9*k, q:kyHieu('Tính nhẩm', bt+' ='+oHoi()), ans:9*k, sai:saiNhan9(k), goiY:goiYNhan9(k)}; }
    k=rnd(3,9);
    if(Math.random()<0.4){ k=rnd(3,10);
      return {type:'num', _e:k, q:kyHieu('Tìm số thích hợp', '9 ×'+oHoi()+'= '+(9*k)), ans:k, sai:nhanSai([[k-1,'canh-dong'],[k+1,'canh-dong'],[9*k,'dao-vai']], k),
        goiY:{'canh-dong':'Bé nhẩm: 9 × mấy = '+(9*k)+'? Đếm theo bảng nhân 9.', 'dao-vai':'Ô trống là số lần lấy 9, không phải tích.'}}; }
    var len=Math.random()<0.6, k2=len?k+1:k-1, kq=9*k2;
    return {type:'num', _e:kq, q:'<div class="text-slate-600 mb-1">Biết <b>9 × '+k+' = '+(9*k)+'</b>.</div>'+kyHieu('Vậy', '9 × '+k2+' ='+oHoi()), ans:kq,
      sai:nhanSai([[9*k,'sai-buoc'],[9*k+(len?1:-1),'sai-buoc'],[9+k2,'cong-thay-nhan']], kq), goiY:{'sai-buoc': len ? 'Thêm một lần 9 vào '+(9*k)+'.' : 'Bớt một lần 9 từ '+(9*k)+'.', 'cong-thay-nhan':'9 × '+k2+' là '+k2+' lần số 9, không phải 9 + '+k2+'.'}};
  }, check:function(q){ return q.ans===q._e; }},

  /* D5 — Chia nhẩm bảng 9 (Hoạt động 1) */
  {name:'Chia nhẩm', sec:'Hoạt động 1 — Tính nhẩm bảng chia 9', mt:['MT3'], levels:3,
   muc:['Chia nhẩm 18 : 9 đến 45 : 9.', 'Chia nhẩm 54 : 9 đến 90 : 9.', 'Từ một phép nhân suy ra phép chia cho thừa số kia; tìm số bị chia.'],
   make:function(lv){
    if(lv>=3){ var k=pick([2,3,4,5,6,7,8,10]);
      if(Math.random()<0.4) return {type:'num', _e:9*k, q:kyHieu('Tìm số thích hợp', oHoi()+': 9 = '+k), ans:9*k,
        sai:nhanSai([[k,'dao-vai'],[9+k,'cong-thay-nhan'],[9*(k-1),'canh-dong'],[9*(k+1),'canh-dong']], 9*k), goiY:{'dao-vai':'Ô trống là số bị chia: lấy thương '+k+' nhân với số chia 9.', 'cong-thay-nhan':'Số bị chia = thương × số chia, không phải cộng.', 'canh-dong':'Bé nhẩm: mấy chia 9 được '+k+'? Lấy '+k+' × 9.'}};
      return {type:'num', _e:9, q:'<div class="text-slate-600 mb-1">Biết <b>9 × '+k+' = '+(9*k)+'</b>.</div>'+kyHieu('Vậy', (9*k)+' : '+k+' ='+oHoi()), ans:9,
        sai:nhanSai([[k,'dao-vai'],[9*k-k,'cong-thay-nhan']], 9), goiY:{'dao-vai':'Từ 9 × '+k+' = '+(9*k)+' ta có '+(9*k)+' : 9 = '+k+' và '+(9*k)+' : '+k+' = ?', 'cong-thay-nhan':'Đây là phép chia, không phải phép trừ.'}}; }
    var k2 = lv<=1 ? rnd(2,5) : rnd(6,10);
    return {type:'num', _e:k2, q:kyHieu('Tính nhẩm', (9*k2)+' : 9 ='+oHoi()), ans:k2, sai:saiChia9(k2), goiY:goiYChia9(k2)};
  }, check:function(q){ return q.ans===q._e; }},

  /* D6 — Từ phép nhân suy ra phép chia (không có trong SGK) */
  {name:'Nhân → chia', sec:'Từ phép nhân suy ra phép chia', mt:['MT3'], levels:3,
   muc:['Điền kết quả phép chia suy ra từ một phép nhân.', 'Chọn phép chia đúng suy ra từ một phép nhân.', 'Tìm phép tính KHÔNG suy ra được từ một phép nhân.'],
   make:function(lv){
    var k = lv<=1 ? rnd(2,6) : pick([2,3,4,5,6,7,8,10]), P=9*k, dau='<div class="text-2xl font-extrabold text-orange-600 my-2">9 × '+k+' = '+P+'</div>';
    if(lv<=1) return {type:'num', _e:k, q:dau+kyHieu('Vậy', P+' : 9 ='+oHoi()), ans:k, sai:nhanSai([[9,'dao-vai'],[P-9,'cong-thay-nhan']], k), goiY:{'dao-vai':'Trong 9 × '+k+' = '+P+', lấy '+P+' chia cho 9 được số nào?', 'cong-thay-nhan':'Đây là phép chia, không phải phép trừ.'}};
    var ch, dung;
    if(lv===2){ dung=P+' : 9 = '+k; ch=[dung, P+' : 9 = 9', P+' : '+k+' = '+k, k+' : 9 = '+P]; shuffle(ch);
      var sai={}; ch.forEach(function(c,i){ if(c!==dung) sai[String(i)]='dao-vai'; });
      return {type:'mcq', cot:1, _dung:dung, _loai:'dung', q:dau+'<div>Từ phép nhân trên, phép chia nào đúng?</div>', choices:ch, correct:ch.indexOf(dung), sai:sai,
        goiY:{'dao-vai':'Từ 9 × '+k+' = '+P+': '+P+' : 9 = '+k+' và '+P+' : '+k+' = 9.'}}; }
    dung=P+' : 9 = '+k+' × 9'; dung=P+' : 9 = 9'; ch=[dung, k+' × 9 = '+P, P+' : 9 = '+k, P+' : '+k+' = 9']; shuffle(ch);
    return {type:'mcq', cot:1, _dung:dung, _loai:'khong', q:dau+'<div>Phép tính nào <b>KHÔNG</b> suy ra được từ phép nhân trên?</div>', choices:ch, correct:ch.indexOf(dung),
      goiY:{'chung':'Từ 9 × '+k+' = '+P+' ta có: '+k+' × 9 = '+P+', '+P+' : 9 = '+k+', '+P+' : '+k+' = 9. Phép còn lại là sai.'}};
  }, check:function(q){ if(q.type!=='mcq') return q.ans===q._e; var t=q.choices.filter(dungPT).length;
    return kiemMCQ(q) && (q._loai==='dung' ? (t===1 && dungPT(q._dung)) : (t===q.choices.length-1 && !dungPT(q._dung))); }},

  /* D7 — Cùng kết quả (Hoạt động 2) */
  {name:'Cùng kết quả', sec:'Hoạt động 2 — Hai phép tính cùng kết quả', mt:['MT4'], levels:3,
   muc:['Nhận ra đổi chỗ hai thừa số thì kết quả không đổi (9 × 4 = 4 × 9).',
        'Tìm phép tính ở bảng khác có cùng kết quả (45 : 9 = 20 : 4).',
        'Hiểu cấu tạo bảng nhân: 9 × 5 = 9 × 4 + 9.'],
   make:function(lv){
    var target, V, dung, ds=[], them=function(t, nhan){ var v=tinhBT(t); if(v!==V && v>0 && ds.every(function(x){ return tinhBT(x[0])!==v; })) ds.push([t, nhan]); };
    if(lv<=1){ var a=rnd(2,9); target='9 × '+a; V=9*a; dung=a+' × 9'; them('9 × '+(a>3?a-2:a+2), 'canh-dong'); them('9 × '+(a>4?a-3:a+3), 'canh-dong'); them((a>5?a-4:a+4)+' × 9', 'canh-dong'); }
    else if(lv===2){ var a2=rnd(2,10); target=(9*a2)+' : 9'; V=a2; dung=pick(btBang25(a2));
      [a2-1,a2+1,a2+2,a2-2,a2+3].forEach(function(w){ if(w>=1){ var o=btBang25(w); if(o.length) them(pick(o), 'canh-dong'); } }); }
    else { var a3=rnd(3,9); target='9 × '+a3; V=9*a3; dung='9 × '+(a3-1)+' + 9'; them('9 × '+(a3-1)+' + 1', 'sai-buoc'); them('9 × '+(a3+1)+' + 9', 'sai-buoc'); them('9 × '+a3+' + 9', 'sai-buoc'); them('8 × '+a3+' + 9', 'sai-buoc'); }
    shuffle(ds); var sel=[[dung,'']].concat(ds.slice(0, lv<=1?2:3)); shuffle(sel);
    var ch=sel.map(function(d){ return d[0]; }), sai={}; sel.forEach(function(d,i){ if(d[1]) sai[String(i)]=d[1]; });
    return {type:'mcq', figFn:melon, _target:target, _v:V,
      q:'<div class="mb-1">Phép tính nào có cùng kết quả với</div><div class="flex justify-center my-2">'+melon(target)+'</div>', choices:ch, correct:ch.indexOf(dung), sai:sai,
      goiY:{'canh-dong':'Bé tính kết quả của phép tính trên quả dưa, rồi tính từng đáp án và so sánh.', 'sai-buoc':'Bé nhớ: 9 × '+(lv>=3?'n':'')+' bằng 9 × (số liền trước) cộng thêm đúng một lần 9.'}};
  }, check:kiemCung},

  /* D8 — Số còn thiếu trong dãy đếm thêm/bớt 9 (Luyện tập) */
  {name:'Số còn thiếu', sec:'Luyện tập — Nêu các số còn thiếu', mt:['MT4'], levels:3,
   muc:['Đếm thêm 9 từ 9, tìm số ở đầu dãy.', 'Đếm thêm hoặc bớt 9, tìm số ở giữa dãy.', 'Dãy không bắt đầu từ 9 và ô bên cạnh bị che — dùng bước đếm 9.'],
   make:function(lv){
    var q=bnDaySo(9, lv, 'vuong', 'tron'), a=q.ans;
    q.sai=nhanSai([[a+9,'canh-dong'],[a-9,'canh-dong'],[a+1,'sai-buoc'],[a-1,'sai-buoc'],[a+8,'sai-buoc'],[a-8,'sai-buoc'],[a+10,'sai-buoc'],[a-10,'sai-buoc']], a);
    q.goiY={'canh-dong':'Bé đếm lại đúng vị trí ô có dấu ? nhé!', 'sai-buoc':'Mỗi ô hơn (hoặc kém) ô bên cạnh đúng 9.'};
    return q;
  }, check:bnKiemDay},

  /* D9 — Sơ đồ nhân rồi chia (Luyện tập — Số?) */
  {name:'Sơ đồ', sec:'Luyện tập — Số?', mt:['MT4'], levels:3,
   muc:['Nhân 9 với 2 hoặc 3 rồi chia cho 3 hoặc 9.', 'Nhân 9 rồi chia cho một số trong bảng chia đã học.', 'Số lớn hơn: nhân 9 với số tới 10 rồi chia cho 4, 5, 6, 8.'],
   make:function(lv){
    var p = lv<=1 ? rnd(2,3) : (lv===2 ? rnd(2,6) : rnd(4,10)), mid=9*p, divs=[];
    for(var q2=2;q2<=9;q2++){ if(mid%q2!==0 || mid/q2>10 && lv<3) continue; if(lv<=1 && [3,9].indexOf(q2)<0) continue; if(lv>=3 && (q2===9 || q2<4)) continue; divs.push(q2); }
    if(!divs.length) divs=[9];
    var qd=pick(divs), kq=mid/qd;
    return {type:'num', _mid:mid, _qd:qd, q: soDo([{v:9, h:'vuong'}, {v:'', h:'tron'}, {v:null, h:'vuong'}], ['× '+p, ': '+qd])+'<div>Số ở ô cuối cùng là bao nhiêu?</div>', ans:kq,
      sai:nhanSai([[mid,'thieu-buoc'],[mid-qd,'cong-thay-nhan'],[9*qd,'chon-sai-phep']], kq),
      goiY:{'thieu-buoc':'Bé mới làm xong mũi tên thứ nhất. Còn mũi tên : '+qd+' nữa!', 'cong-thay-nhan':'Mũi tên : '+qd+' là phép chia cho '+qd+', không phải phép trừ.', 'chon-sai-phep':'Mũi tên thứ hai là chia: lấy số ở ô giữa chia cho '+qd+'.'}};
  }, check:function(q){ return q._mid%q._qd===0 && q.ans===q._mid/q._qd; }},

  /* D10 — So kết quả với 10 (Luyện tập; hình bông hoa chở phép tính). Phép tính ngắn: <= 9 ký tự */
  {name:'So với 10', sec:'Luyện tập — Kết quả lớn hơn hay bé hơn 10?', mt:['MT4'], levels:3,
   muc:['So kết quả với 10 khi kết quả khác xa 10.', 'So kết quả với 10 khi kết quả rất gần 10 (9, 10, 11…).', 'So kết quả phép tính hai bước với 10.'],
   make:function(lv){
    var e;
    if(lv<=1) e=pick(['9 × 3','9 × 4','9 × 5','9 × 6','9 × 8','9 × 9','18 : 9','27 : 9','36 : 9','45 : 9']);
    else if(lv===2) e=pick(['9 × 1','9 × 2','90 : 9','90 : 9','81 : 9','63 : 9','72 : 9','54 : 9']);
    else e=pick(['9 × 2 − 9','9 × 2 − 7','9 × 2 − 8','9 × 3 − 9','9 × 1 + 1','9 × 1 + 2','9 × 2 + 1','9 × 3 − 8']);
    var v=tinhBT(e), correct = v>10 ? 0 : (v<10 ? 1 : 2);
    return {type:'mcq', _e:e,
      q:'<div class="mb-1">Kết quả của phép tính trên bông hoa so với <b>10</b> thế nào?</div><div class="flex justify-center my-2">'+flower(e)+'</div>',
      choices:['Lớn hơn 10','Bé hơn 10','Bằng 10'], correct:correct, goiY:{'chung':'Bé tính kết quả của phép tính trên bông hoa, rồi so sánh với 10.'}};
  }, check:function(q){ var v=tinhBT(q._e); return q.correct===(v>10?0:(v<10?1:2)) && Number.isInteger(v) && q._e.length<=9; }},

  /* D11 — Đúng hay sai? Tìm lỗi (không có trong SGK) */
  {name:'Đúng / Sai', sec:'Tìm lỗi — Bạn tính đúng hay sai?', mt:['MT2','MT3'], levels:3,
   muc:['Nhận ra kết quả sai thô (cộng thay nhân).', 'Nhận ra kết quả sai tinh (nhầm dòng bên cạnh, nhầm bảng 8 hoặc 10).', 'Chỉ ra lỗi của bạn và tìm kết quả đúng.'],
   make:function(lv, mt){
    var chia = (mt==='MT3'), k = lv<=1 ? rnd(2,5) : rnd(2,10), dung = chia ? k : 9*k, X, tag;
    var bt = chia ? (9*k)+' : 9' : '9 × '+k;
    var loaiSai = lv<=1 ? [[chia ? 9*k-9 : 9+k, 'cong-thay-nhan']]
      : (chia ? [[k-1,'canh-dong'],[k+1,'canh-dong']] : [[9*(k-1),'canh-dong'],[9*(k+1),'canh-dong'],[8*k,'nham-bang'],[10*k,'nham-bang']]);
    var ls=pick(loaiSai.filter(function(p){ return p[0]>0 && p[0]!==dung; }));
    if(lv>=3){ X=ls[0]; tag=ls[1];
      return {type:'num', mt:(chia?'MT3':'MT2'), _e:dung, q:'<div class="flex justify-center mb-1">'+anh('boy', 72, 'Bạn An')+'</div><div>Bạn An tính: <b class="text-orange-600">'+bt+' = '+X+'</b>. An tính sai rồi!</div><div class="mt-1">Kết quả đúng là bao nhiêu?</div>',
        ans:dung, sai:nhanSai([[X, tag]], dung), goiY: chia ? goiYChia9(k) : goiYNhan9(k)}; }
    var laDung=Math.random()<0.5; X = laDung ? dung : ls[0]; tag = laDung ? '' : ls[1];
    var sai = laDung ? {} : {'0': tag};
    var gy = chia ? goiYChia9(k) : goiYNhan9(k); gy.chung = laDung ? 'Phép tính này đúng. Bé nhẩm lại bảng '+(chia?'chia':'nhân')+' 9 nhé!' : 'Bé nhẩm lại '+bt+' nhé!';
    return {type:'mcq', mt:(chia?'MT3':'MT2'), figFn:dsBtn12, _dung:(laDung?'Đ':'S'), _X:X, _k:k, _chia:chia,
      q:'<div class="text-3xl font-extrabold text-orange-600 my-2">'+bt+' = '+X+'</div><div class="text-base text-slate-500">Đúng (Đ) hay sai (S)?</div>',
      choices:['Đ','S'], correct:(laDung?0:1), sai:sai, goiY:gy};
  }, check:function(q){ if(q.type==='num') return q.ans===q._e; var d = q._chia ? q._k : 9*q._k; return q.choices.join()==='Đ,S' && q.correct===(q._X===d?0:1) && (q._dung==='Đ') === (q._X===d); }},

  /* D12 — Giải toán (Luyện tập): thuyền, túi cam, can nước mắm */
  {name:'Giải toán', sec:'Luyện tập — Giải toán', mt:['MT5'], levels:3,
   muc:['Bài toán một phép nhân với số nhỏ, có hình các chiếc thuyền.', 'Bài toán một phép nhân hoặc phép chia với 9.', 'Bài toán hai bước (nhân rồi trừ, chia rồi nhân).'],
   make:function(lv){
    var r=Math.random(), n = lv<=1 ? rnd(2,5) : rnd(2,9);
    if(lv<=1) return {type:'num', _e:9*n, _hinh:'thuyen', _n:n, q:xepHang(Array(n+1).join('x').split('').map(function(){ return thuyen(); }), 5)+'Trên mỗi thuyền có 9 người. Hỏi '+n+' thuyền như thế có bao nhiêu người?', ans:9*n, unit:'người',
      sai:nhanSai([[9+n,'cong-thay-nhan'],[9*(n-1),'lech-nhom'],[9*(n+1),'lech-nhom']], 9*n), goiY:{'cong-thay-nhan':n+' thuyền, mỗi thuyền 9 người: 9 × '+n+'.', 'lech-nhom':'Bé đếm lại số thuyền nhé!'}};
    if(lv===2){
      if(r<0.34) return {type:'num', _e:9*n, _hinh:'thuyen', _n:1, q:'<div class="flex justify-center mb-2">'+thuyen(64)+'</div>Trên mỗi thuyền có 9 người. Hỏi '+n+' thuyền như thế có bao nhiêu người?', ans:9*n, unit:'người', sai:saiNhan9(n), goiY:goiYNhan9(n)};
      if(r<0.68) return {type:'num', _e:9*n, _hinh:'qua', _n:9, q:'<div class="flex justify-center mb-2">'+tuiCam(64)+'</div>Mỗi túi có 9 quả cam. Hỏi '+n+' túi như thế có bao nhiêu quả cam?', ans:9*n, unit:'quả', sai:saiNhan9(n), goiY:goiYNhan9(n)};
      return {type:'num', _e:n, _hinh:'can', _n:9, q:'<div class="flex justify-center mb-2">'+hangCan(9)+'</div>Chia đều '+(9*n)+' l nước mắm vào 9 cái can. Hỏi mỗi can có bao nhiêu lít nước mắm?', ans:n, unit:'lít',
        sai:nhanSai([[9*n,'chon-sai-phep'],[n-1,'lech-nhom'],[n+1,'lech-nhom']], n), goiY:{'chon-sai-phep':'Chia đều vào các can thì dùng phép chia.', 'lech-nhom':'Bé nhẩm: 9 × mấy = '+(9*n)+'?'}}; }
    if(r<0.5){ var m=rnd(2,9*n-2);
      return {type:'num', _e:9*n-m, _hinh:'thuyen', _n:1, q:'<div class="flex justify-center mb-2">'+thuyen(64)+'</div>Trên mỗi thuyền có 9 người. Có '+n+' thuyền cập bến, đã có '+m+' người lên bờ. Hỏi còn bao nhiêu người trên thuyền?', ans:9*n-m, unit:'người',
        sai:nhanSai([[9*n,'thieu-buoc'],[9*n+m,'chon-sai-phep'],[n+m,'cong-thay-nhan']], 9*n-m), goiY:{'thieu-buoc':'Bé tìm số người của '+n+' thuyền, rồi bớt đi '+m+' người đã lên bờ.', 'chon-sai-phep':'Đã lên bờ nghĩa là bớt đi: dùng phép trừ.', 'cong-thay-nhan':n+' thuyền, mỗi thuyền 9 người: 9 × '+n+', rồi mới trừ.'}}; }
    var h=rnd(2,5);
    return {type:'num', _e:n*h, _hinh:'can', _n:9, q:'<div class="flex justify-center mb-2">'+hangCan(9)+'</div>Chia đều '+(9*n)+' l nước mắm vào 9 cái can. Hỏi '+h+' can như thế có bao nhiêu lít nước mắm?', ans:n*h, unit:'lít',
      sai:nhanSai([[n,'thieu-buoc'],[9*n,'chon-sai-phep'],[n*(h-1),'lech-nhom'],[n*(h+1),'lech-nhom']], n*h), goiY:{'thieu-buoc':'Bé tìm số lít trong mỗi can ('+(9*n)+' : 9), rồi nhân với '+h+' can.', 'chon-sai-phep':'Bé chia '+(9*n)+' cho 9 trước, rồi nhân với số can.', 'lech-nhom':'Bé đếm lại số can nhé!'}};
  }, check:function(q){ if(!(q.ans===q._e && q.ans>0)) return false;
    if(q._hinh==='thuyen') return demThuyen(q.q)===q._n; if(q._hinh==='qua') return demDem(q.q,'qua')===9; if(q._hinh==='can') return demDem(q.q,'can')===9; return true; }},

  /* D13 — Chọn phép tính cho bài toán (không có trong SGK) */
  {name:'Chọn phép tính', sec:'Chọn phép tính — không cần tính ra kết quả', mt:['MT5'], levels:3,
   muc:['Chọn phép nhân cho tình huống gộp nhiều nhóm bằng nhau.', 'Chọn phép chia cho tình huống chia thành các phần bằng nhau.', 'Chọn biểu thức cho bài toán hai bước.'],
   make:function(lv){
    var ds, q, hinh, dem=null;   /* ds = [[lựa chọn, nhãn lỗi]] — phần tử đầu là đáp án đúng; hinh = hình gợi tình huống (không có số để đếm) */
    if(lv<=1){ var n=rnd(2,9), ctx=pick([['Trên mỗi thuyền có 9 người. Có '+n+' thuyền.','số người',thuyen(56),null],['Mỗi túi có 9 quả cam. Có '+n+' túi.','số quả cam',tuiCam(56),['qua',9]],['Mỗi hộp có 9 chiếc bút chì màu. Có '+n+' hộp.','số bút chì màu',hopBut(9,52),['but',9]]]);
      ds=[['9 × '+n,''], ['9 + '+n,'cong-thay-nhan'], [(9*n)+' : 9','chon-sai-phep']]; hinh=ctx[2]; dem=ctx[3]; q='<div>'+ctx[0]+'</div><div class="mt-1">Phép tính nào tìm được <b>'+ctx[1]+'</b>?</div>'; }
    else if(lv===2){ var k=pick([3,4,5,6,7,8,10]), P=9*k, ct=pick([['Có '+P+' quả cam xếp đều vào 9 túi.','số quả cam mỗi túi',tuiCam(56),['qua',9]],['Có '+P+' người ngồi đều trên 9 chiếc thuyền.','số người mỗi thuyền',thuyen(56),null],['Có '+P+' chiếc bút chì màu xếp đều vào 9 hộp.','số bút mỗi hộp',hopBut(9,52),['but',9]]]);
      ds=[[P+' : 9',''], [P+' × 9','chon-sai-phep'], [P+' − 9','cong-thay-nhan'], ['9 : '+P,'dao-vai']]; hinh=ct[2]; dem=ct[3]; q='<div>'+ct[0]+'</div><div class="mt-1">Phép tính nào tìm được <b>'+ct[1]+'</b>?</div>'; }
    else { var n3=rnd(3,8), m3=rnd(2,9); if(m3===n3) m3=n3+1;
      ds=[['9 × '+n3+' − '+m3,''], ['9 × '+n3+' + '+m3,'chon-sai-phep'], ['9 + '+n3+' − '+m3,'cong-thay-nhan'], ['9 × '+m3+' − '+n3,'dao-vai']]; hinh=hopBut(9,52); dem=['but',9];
      q='<div>Lớp mua '+n3+' hộp bút chì màu, mỗi hộp 9 chiếc. Các bạn đã dùng '+m3+' chiếc.</div><div class="mt-1">Phép tính nào tìm được <b>số bút còn lại</b>?</div>'; }
    var dung=ds[0][0]; shuffle(ds);
    var ch=ds.map(function(d){ return d[0]; }), sai={}; ds.forEach(function(d,i){ if(d[1]) sai[String(i)]=d[1]; });
    return {type:'mcq', cot:1, _dung:dung, _dem:dem, q:'<div class="flex justify-center gap-1 mb-2">'+hinh+'</div>'+q, choices:ch, correct:ch.indexOf(dung), sai:sai,
      goiY:{'chon-sai-phep':'Gộp nhiều nhóm bằng nhau: phép nhân. Chia thành phần bằng nhau: phép chia. Bớt đi: phép trừ.', 'cong-thay-nhan':'Có nhiều nhóm bằng nhau thì dùng phép nhân (hoặc chia), không phải cộng, trừ với 9.', 'dao-vai':'Bé xem lại: số nào là số hộp, số nào là số bút mỗi hộp?'}};
  }, check:function(q){ return kiemMCQ(q) && (!q._dem || demDem(q.q, q._dem[0])===q._dem[1]); }}
 ]
};
