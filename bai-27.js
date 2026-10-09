/* bai-27.js — Bài 27: Giảm một số đi một số lần. BÀI MỚI, Engine v2 — LUYỆN THÔNG MINH.
   Theo bảng phân tích sư phạm đã duyệt (phan-tich-su-pham/bai-27.md) và chỉnh sửa của thầy trên PR #16:
   4 MỤC TIÊU (muctieu) × 10 DẠNG (topics), mỗi dạng 3 mức (Thông tư 27: Nhận biết · Hiểu · Vận dụng).
   Lỗi lớn nhất: nhầm "giảm n lần" (phép chia) với "bớt n đơn vị" (phép trừ), nhầm chiều phép tính (gấp thay giảm).
   Mê cung của sách đổi thành "qua hai cửa liên tiếp" (chọn một / số cuối); chỉ một thứ tự "giảm rồi gấp".
   Hình mới viết ngay trong file này (không sửa figures.js): nhomThu, soDoGT (có ô trống), theo mẫu bài 24.
   Vật để đếm mang data-dem (nhom, vat, nhom2, vat2); check() đếm lại trong chuỗi SVG; mọi bước tính được check() tính lại.
   QUY TẮC: nối chuỗi, KHÔNG backtick và KHÔNG template literal. */

/* ---- Tiện ích chung ---- */
function nhanSai(ds, dung){ var o={}; ds.forEach(function(p){ var v=p[0]; if(Number.isInteger(v) && v>0 && v!==dung && !(String(v) in o)) o[String(v)]=p[1]; }); return o; }
function kiemMCQ(q){ return q.choices[q.correct]===q._dung && new Set(q.choices).size===q.choices.length; }
function dsBtn27(ch){ return '<span class="text-2xl font-extrabold text-slate-700">'+ch+'</span><span class="ml-2 text-base font-bold text-slate-600">'+(ch==='Đ'?'Đúng':'Sai')+'</span>'; }
function svgX(w, h, px){ return svgHinh(w, h, px).replace('<svg ', '<svg class="text-slate-700" '); }
function demNhom(s, loai){ var m=String(s).match(new RegExp('data-'+loai+'="1"', 'g')); return m ? m.length : 0; }
function demDem(s, loai){ var m=String(s).match(new RegExp('data-dem="'+loai+'"', 'g')); return m ? m.length : 0; }
function khungHinh(s){ return '<div class="flex justify-center my-2">'+s+'</svg></div>'; }
function nguoi(ten, alt){ return '<div class="flex justify-center mb-1">'+anh(ten, 72, alt)+'</div>'; }
var GOI={'nham-giam-bot':'Giảm đi n lần là chia cho n. Bớt n đơn vị mới là trừ n.', 'nham-chieu':'Giảm đi là chia, gấp lên là nhân. Bé đọc kỹ cửa nhé!', 'nham-so-lan':'Số lần là số phần bằng nhau, không phải số bị chia.',
  'cong-thay-nhan':'Gấp n lần là nhân với n, không phải cộng.', 'nham-bang':'Bé nhẩm lại bảng nhân, bảng chia nhé!', 'thieu-buoc':'Bé làm đủ các bước của bài toán nhé!', 'dao-vai':'Bé làm ngược lại: thương và số chia đổi chỗ cho nhau thì sao?',
  'lech-nhom':'Bé tính từng bước, xem kết quả có đúng không.', 'chon-sai-phep':'Giảm đi một số lần là chia, không phải trừ.', 'dem-sot-phep':'Bé đếm lại các nhóm nhé!'};
function gy(extra){ var o={}, k; for(k in GOI) o[k]=GOI[k]; for(k in (extra||{})) o[k]=extra[k]; return o; }
var CAP_TEN=[['Việt','Mai'],['Nam','Lan'],['An','Bình'],['Hà','Minh']];
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

/* ---- Hình mới 1 (D1): sơ đồ nhóm "giảm". Lúc đầu: n nhóm bằng nhau, mỗi nhóm moi vật; lúc sau: 1 nhóm.
   Khung nhóm mang data-nhom / data-nhom2 (khung chứa vật nên không dùng data-dem); vật data-dem="vat" / "vat2". ---- */
function nhomThu(n, moi){
  var cols=Math.min(moi,3), rows=Math.ceil(moi/cols), gw=cols*24+12, gh=rows*24+12, gap=10, ox=24;
  var W=Math.max(220, n*(gw+gap)-gap+2*ox), H=ox+gh+40+gh+ox, s=svgX(W,H), i, j, y1=34, y2=y1+gh+44;
  function nhom(x, y, tag, tagVat){
    var r=('<rect data-'+tag+'="1" x="'+x+'" y="'+y+'" width="'+gw+'" height="'+gh+'" rx="10" fill="'+HM.vang+'" fill-opacity="0.25" stroke="currentColor" stroke-width="2.5"/>'), k;
    for(k=0;k<moi;k++) r+='<circle data-dem="'+tagVat+'" cx="'+(x+6+12+(k%cols)*24)+'" cy="'+(y+6+12+Math.floor(k/cols)*24)+'" r="9" fill="'+HM.troi+'" stroke="currentColor" stroke-width="1.5"/>';
    return r;
  }
  s+='<text x="'+ox+'" y="'+(y1-8)+'" font-size="17" '+HFONT+' fill="currentColor">Lúc đầu</text>';
  for(i=0;i<n;i++) s+=nhom(ox+i*(gw+gap), y1, 'nhom', 'vat');
  s+='<text x="'+ox+'" y="'+(y2-8)+'" font-size="17" '+HFONT+' fill="currentColor">Lúc sau</text>';
  s+=nhom(ox, y2, 'nhom2', 'vat2');
  return khungHinh(s);
}

/* ---- Hình mới 2 (D3, D4, D5): số – cửa – kết quả. nut = [{v}] (v = null → ô "?", v = '' → ô trống nét đứt), cua = nhãn trên mũi tên ---- */
function soDoGT(nut, cua){
  var nhieu=nut.length>=3, D=nhieu?48:56, A=nhieu?108:128, W=nut.length*D+(nut.length-1)*A+8, s=svgX(W,76), x=4, i;
  for(i=0;i<nut.length;i++){
    var v=nut[i].v, hoi=(v===null || v===undefined), trong=(v===''), cx=x+D/2;
    if(trong) s+='<circle cx="'+cx+'" cy="46" r="'+(D/2-1.5)+'" fill="none" stroke="currentColor" stroke-width="2.5" stroke-dasharray="5 4" opacity=".55"/>';
    else s+='<circle cx="'+cx+'" cy="46" r="'+(D/2-1.5)+'" fill="'+(hoi ? '#fff' : HM.vang)+'"'+(hoi ? ' stroke="'+HM.vangDam+'" stroke-width="3"' : '')+'/>'+chuSo(cx, 46, hoi ? '?' : v, hoi ? 24 : (String(v).length>2 ? 18 : 22));
    x+=D;
    if(i<cua.length){
      s+='<text x="'+(x+A/2)+'" y="30" text-anchor="middle" font-size="17" '+HFONT+' fill="currentColor">'+cua[i]+'</text>'
       +'<path d="M'+(x+8)+' 46 H'+(x+A-8)+' M'+(x+A-15)+' 40 L'+(x+A-8)+' 46 L'+(x+A-15)+' 52" stroke="currentColor" stroke-width="2.6" fill="none" stroke-linecap="round" stroke-linejoin="round" opacity=".6"/>';
      x+=A;
    }
  }
  return khungHinh(s);
}
function cuaChu(loai, k){ return loai==='gap' ? 'gấp '+k+' lần' : 'giảm '+k+' lần'; }
function ap(loai, v, k){ return loai==='gap' ? v*k : v/k; }
function mau(a, b){ return rnd(a,b); }

/* D4: tạo cặp hai phép liền nhau; tp 1 = gấp rồi giảm, tp 2 = giảm rồi gấp. Mọi bước nguyên, ≤ 100. */
function haiBuoc(lv){
  var tp, v, m, k, g, mid, end;
  for(g=0;g<500;g++){
    tp=pick([1,2]);
    if(lv<=1){ v=rnd(2,6); m=rnd(2,4); k=rnd(2,3); if(tp===2) v=k*rnd(2,6); }
    else if(tp===1){ v=rnd(6,20); m=rnd(2,7); k=rnd(2,5); }
    else { k=rnd(2,6); v=k*rnd(3,13); m=rnd(2,5); }
    if(tp===1){ mid=v*m; if(mid%k) continue; end=mid/k; } else { if(v%k) continue; mid=v/k; end=mid*m; }
    if(mid<=(lv<=1?36:100) && end<=100 && mid!==end && v!==end && (lv>1 || end<=36)) return {tp:tp, v:v, m:m, k:k, mid:mid, end:end};
  }
  return {tp:1, v:6, m:3, k:2, mid:18, end:9};
}
function cuaHai(h){ return h.tp===1 ? [cuaChu('gap',h.m), cuaChu('giam',h.k)] : [cuaChu('giam',h.k), cuaChu('gap',h.m)]; }
function tinhHai(h){ var mid = h.tp===1 ? h.v*h.m : h.v/h.k; return {mid:mid, end: h.tp===1 ? mid/h.k : mid*h.m}; }

var BAI = {
 n: 27,
 title: 'Giảm Một Số Đi Một Số Lần',
 sub: 'Luyện thông minh: câu hỏi tự đổi theo bé — làm hết lượt để xem ngọn lửa!',
 goal: 10, soCau: 18, soCauToiDa: 24,
 loi: {'nham-giam-bot':'Nhầm "giảm n lần" với "bớt n đơn vị"', 'nham-chieu':'Nhầm chiều phép tính (gấp thay giảm)', 'nham-so-lan':'Nhầm số lần với số bị chia', 'dem-sot-phep':'Đếm sót hoặc thừa nhóm'},
 muctieu: [
  {id:'MT1', ten:'Giảm một số đi một số lần', muc:['Sơ đồ nhóm: lúc đầu mấy nhóm; 6 giảm 3 lần.', 'Tính giảm đi n lần bằng phép chia (30 giảm 5 lần); chọn phép tính đúng.', 'Số lớn hơn (54 giảm 9 lần); số lần là ước của số có hai chữ số (96 giảm 4 lần).']},
  {id:'MT2', ten:'Gấp hay giảm (chiều phép tính)', muc:['Một cửa: gấp hoặc giảm (số nhỏ).', 'Lò nướng xen giảm và gấp; hai mũi tên liền nhau (14 gấp 7 lần rồi giảm 2 lần).', 'Biết kết quả, tìm số đầu; qua hai cửa liên tiếp, chọn cặp cửa cho kết quả cho trước.']},
  {id:'MT3', ten:'Giảm n lần khác bớt n đơn vị', muc:['Đúng / Sai: 27 giảm 3 lần được 9.', 'Từ hai số, nói đúng "bớt … đơn vị" hay "giảm … lần".', 'Hai quan hệ cùng một lúc; bạn nói đúng hay sai ("Em thấy thế nào?").']},
  {id:'MT4', ten:'Giải toán và vận dụng', muc:['Nhãn vở còn lại giảm 3 lần; 28 bút màu giảm 4 lần.', 'Chọn phép chia hay phép trừ; còn lại giảm 3 lần so với lúc đầu; tìm số chia.', 'Hai bước: tìm số nhãn đã cho; tìm số bút lúc đầu; số chia lớn.']}
 ],
 topics: [
  /* D1 — Sơ đồ nhóm "giảm" (Khám phá) */
  {name:'Sơ đồ nhóm giảm', sec:'Khám phá — 6 con thỏ giảm đi 3 lần: lúc đầu 3 nhóm, lúc sau 1 nhóm', mt:['MT1'], levels:3,
   muc:['Lúc đầu có mấy nhóm bằng nhau (đếm).', 'Số viên bi giảm đi n lần: lúc sau còn bao nhiêu (đếm trong hình).', 'Giảm số lớn hơn đi n lần (không có hình).'],
   make:function(lv){
    var n, m, a, ans, fig='', cau, sai;
    if(lv<=1){ n=rnd(2,4); m=rnd(2,3); a=n*m; ans=n; fig=nhomThu(n,m); cau='Lúc đầu có <b>'+a+' viên bi</b> xếp thành các nhóm bằng nhau. Lúc sau còn lại <b>1 nhóm</b>. Lúc đầu có mấy nhóm?';
      sai=[[n+1,'dem-sot-phep'],[n-1,'dem-sot-phep'],[m,'nham-so-lan'],[a,'nham-so-lan']]; }
    else if(lv===2){ do{ n=rnd(2,4); m=rnd(2,4); }while(n===2 && m===2); a=n*m; ans=m; fig=nhomThu(n,m); cau='Số viên bi <b>giảm đi '+n+' lần</b>, lúc sau còn lại 1 nhóm. Hỏi lúc sau còn bao nhiêu viên bi?';
      sai=[[a-n,'nham-giam-bot'],[a,'thieu-buoc'],[n,'nham-so-lan'],[a+n,'nham-chieu']]; }
    else { n=pick([3,4,5]); m=rnd(3,4); a=n*m; ans=m; cau='Có <b>'+a+' viên bi</b>. Số bi <b>giảm đi '+n+' lần</b>. Hỏi còn lại bao nhiêu viên bi?';
      sai=[[a-n,'nham-giam-bot'],[a*n,'nham-chieu'],[n,'nham-so-lan'],[m+1,'nham-bang'],[m-1,'nham-bang']]; }
    return {type:'num', _lv:lv, _n:n, _m:m, _fig:!!fig, q:fig+'<div>'+cau+'</div>', ans:ans, unit: lv<=1 ? 'nhóm' : 'viên bi', sai:nhanSai(sai, ans),
      goiY:gy({'dem-sot-phep':'Bé đếm lại các nhóm bằng nhau ở hàng "Lúc đầu".', 'nham-so-lan':'Số lần là số nhóm. Một nhóm là kết quả.', 'nham-giam-bot':'Giảm đi '+n+' lần là chia cho '+n+', không phải trừ '+n+'.'})};
  }, check:function(q){
    var n=q._n, m=q._m;
    if(q._fig){ if(demNhom(q.q,'nhom')!==n || demDem(q.q,'vat')!==n*m || demNhom(q.q,'nhom2')!==1 || demDem(q.q,'vat2')!==m || n<2) return false; }
    else if(q._lv<3) return false;
    return q.ans===(q._lv<=1 ? n : m) && n*m<=20; }},

  /* D2 — Giảm một số đi n lần (quy tắc) */
  {name:'Giảm một số đi n lần', sec:'Khám phá — Muốn giảm một số đi một số lần, ta lấy số đó chia cho số lần', mt:['MT1'], levels:3,
   muc:['Giảm số nhỏ đi 2 hoặc 3 lần.', 'Chọn phép tính đúng để giảm một số đi n lần.', 'Giảm số lớn đi n lần (54 giảm 9 lần, 96 giảm 4 lần).'],
   make:function(lv){
    var n, m, a;
    if(lv<=1){ n=rnd(2,3); m=rnd(2,5); a=n*m;
      return {type:'num', _lv:1, _a:a, _n:n, q:'<div class="text-slate-500 mb-1">Tính nhẩm</div><div class="text-3xl font-extrabold text-orange-600">Giảm '+a+' đi '+n+' lần được'+oHoi()+'</div>', ans:m,
        sai:nhanSai([[a-n,'nham-giam-bot'],[a*n,'nham-chieu'],[n,'nham-so-lan'],[m+1,'nham-bang']], m), goiY:gy()}; }
    if(lv===2){ n=rnd(2,5); m=rnd(3,9); a=n*m; var dung=a+' : '+n, ds=[[dung,''],[a+' − '+n,'nham-giam-bot'],[a+' × '+n,'nham-chieu'],[n+' : '+a,'dao-vai']];
      shuffle(ds); var ch=ds.map(function(d){ return d[0]; }), sai={}; ds.forEach(function(d,i){ if(d[1]) sai[String(i)]=d[1]; });
      return {type:'mcq', cot:1, _lv:2, _a:a, _n:n, _dung:dung, q:'<div class="text-xl font-extrabold text-orange-600 my-1">Giảm '+a+' đi '+n+' lần</div><div>Phép tính nào đúng?</div>', choices:ch, correct:ch.indexOf(dung), sai:sai,
        goiY:gy({'dao-vai':'Số lớn chia cho số lần. Bé xem thứ tự các số nhé!'})}; }
    var pr=pick([[54,9],[96,4],[72,8],[81,9],[64,8],[95,5],[84,7],[90,6],[63,7],[88,4]]); a=pr[0]; n=pr[1]; m=a/n;
    return {type:'num', _lv:3, _a:a, _n:n, q:'<div class="text-slate-500 mb-1">Tính nhẩm</div><div class="text-3xl font-extrabold text-orange-600">Giảm '+a+' đi '+n+' lần được'+oHoi()+'</div>', ans:m,
      sai:nhanSai([[a-n,'nham-giam-bot'],[m+1,'nham-bang'],[m-1,'nham-bang'],[n,'nham-so-lan']], m), goiY:gy()};
  }, check:function(q){
    var a=q._a, n=q._n, m=a/n;
    if(!Number.isInteger(m) || a>=100) return false;
    if(q._lv===2) return kiemMCQ(q) && q.choices.filter(function(c){ return tinhBT(c)===m; }).length===1 && tinhBT(q._dung)===m;
    return q.ans===m; }},

  /* D3 — Lò nướng: gấp hay giảm (Hoạt động 1) */
  {name:'Lò nướng: gấp hay giảm', sec:'Hoạt động 1 — Số? Mỗi ô là một phép: gấp lên hoặc giảm đi một số lần', mt:['MT2'], levels:3,
   muc:['Một phép trên số nhỏ (12 giảm 3 lần).', 'Hàng trên là ví dụ phép ngược lại; tính hàng dưới.', 'Biết kết quả, tìm số đầu (? giảm 4 lần được 6).'],
   make:function(lv){
    var loai=pick(['gap','giam']), k, v, ra, tl;
    function so(l, big){ var kk=l==='gap' ? rnd(2,5) : rnd(2,6), vv; if(l==='gap') vv=rnd(2, big?17:9); else vv=kk*rnd(2, big?10:9); return [kk, vv]; }
    if(lv<=1){ var p=so(loai,false); k=p[0]; v=p[1]; ra=ap(loai,v,k);
      return {type:'num', _lv:1, _loai:loai, _k:k, _v:v, q:soDoGT([{v:v},{v:null}], [cuaChu(loai,k)])+'<div>Số <b>'+v+'</b> đi qua cửa <b>'+cuaChu(loai,k)+'</b>. Số ở ô <b class="text-amber-700">?</b> là bao nhiêu?</div>', ans:ra,
        sai:nhanSai(loai==='gap' ? [[v+k,'cong-thay-nhan'],[(v%k===0 ? v/k : 0),'nham-chieu'],[k,'nham-so-lan'],[ra+1,'nham-bang']] : [[v-k,'nham-giam-bot'],[v*k,'nham-chieu'],[k,'nham-so-lan'],[ra+1,'nham-bang']], ra), goiY:gy()}; }
    if(lv===2){ var pq=so(loai,true), pe=so(loai==='gap'?'giam':'gap',true); k=pq[0]; v=pq[1]; ra=ap(loai,v,k); var el=loai==='gap'?'giam':'gap', ek=pe[0], ev=pe[1], er=ap(el,ev,ek);
      return {type:'num', _lv:2, _loai:loai, _k:k, _v:v, _ex:[el,ev,ek], q:soDoGT([{v:ev},{v:er}], [cuaChu(el,ek)])+soDoGT([{v:v},{v:null}], [cuaChu(loai,k)])+'<div>Hàng trên đã có kết quả. Hàng dưới: số <b>'+v+'</b> qua cửa <b>'+cuaChu(loai,k)+'</b>. Số ở ô <b class="text-amber-700">?</b> là bao nhiêu?</div>', ans:ra,
        sai:nhanSai(loai==='gap' ? [[(v%k===0 ? v/k : 0),'nham-chieu'],[v+k,'cong-thay-nhan'],[k,'nham-so-lan'],[ra+k,'nham-bang']] : [[v*k,'nham-chieu'],[v-k,'nham-giam-bot'],[k,'nham-so-lan'],[ra+1,'nham-bang']], ra), goiY:gy()}; }
    var ps=so(loai,true); k=ps[0]; var st = loai==='gap' ? ps[1] : ps[1], r2=ap(loai,st,k);
    return {type:'num', _lv:3, _loai:loai, _k:k, _v:st, _ra:r2, q:soDoGT([{v:null},{v:r2}], [cuaChu(loai,k)])+'<div>Một số đi qua cửa <b>'+cuaChu(loai,k)+'</b> thì ra số <b>'+r2+'</b>. Số ban đầu ở ô <b class="text-amber-700">?</b> là bao nhiêu?</div>', ans:st,
      sai:nhanSai([[r2,'dao-vai'],[(loai==='gap' ? r2+k : r2-k),'dao-vai'],[k,'nham-so-lan'],[(loai==='gap' ? r2*k : r2/k),'nham-chieu']], st), goiY:gy({'dao-vai':'Bé làm ngược lại: '+(loai==='gap' ? 'số nào nhân với '+k+' được '+r2+'?' : 'số nào chia cho '+k+' được '+r2+'?')})};
  }, check:function(q){
    var k=q._k, l=q._loai;
    if(q._lv===3){ return Number.isInteger(ap(l,q.ans,k)) && ap(l,q.ans,k)===q._ra && q.ans===q._v && q._ra<100 && q.ans<100; }
    var v=q._v, r=ap(l,v,k);
    if(!Number.isInteger(r) || r>=100) return false;
    if(q._lv===2){ var e=q._ex, er=ap(e[0],e[1],e[2]); if(!Number.isInteger(er) || er>=100 || e[0]===l) return false; }
    return q.ans===r; }},

  /* D4 — Hai mũi tên liền nhau (Luyện tập 1) */
  {name:'Hai mũi tên liền nhau', sec:'Luyện tập 1 — Số? 14 gấp 7 lần rồi giảm 2 lần; 52 giảm 4 lần rồi gấp 3 lần', mt:['MT2'], levels:3,
   muc:['Gấp rồi giảm, ô giữa đã có (số nhỏ).', 'Hai phép liền nhau, ô giữa để trống: tìm ô cuối cùng.', 'Biết ô cuối, tìm ô giữa.'],
   make:function(lv){
    var h=haiBuoc(lv), cu=cuaHai(h), r=tinhHai(h), nut, cau, ans, sai;
    if(lv<=1){ nut=[{v:h.v},{v:r.mid},{v:null}]; cau='Số ở ô <b class="text-amber-700">?</b> cuối cùng là bao nhiêu?'; ans=r.end; }
    else if(lv===2){ nut=[{v:h.v},{v:''},{v:null}]; cau='Số ở ô <b class="text-amber-700">?</b> cuối cùng là bao nhiêu? (Ô nét đứt ở giữa là kết quả của phép đầu.)'; ans=r.end; }
    else { nut=[{v:h.v},{v:null},{v:r.end}]; cau='Số ở ô <b class="text-amber-700">?</b> ở giữa là bao nhiêu?'; ans=r.mid; }
    if(lv<=2) sai=[[r.mid,'thieu-buoc'],[(h.tp===1 ? r.mid*h.k : h.v*h.k*h.m),'nham-chieu'],[r.end+1,'nham-bang'],[r.end-1,'nham-bang'],[h.k,'nham-so-lan']];
    else sai=[[r.end,'thieu-buoc'],[h.v,'thieu-buoc'],[r.mid+1,'nham-bang'],[r.mid-1,'nham-bang'],[(h.tp===1 ? h.v+h.m : h.v-h.k),'nham-giam-bot']];
    return {type:'num', _lv:lv, _h:h, q:soDoGT(nut, cu)+'<div>'+cau+'</div>', ans:ans, sai:nhanSai(sai, ans), goiY:gy({'thieu-buoc':'Hai phép nối nhau: ô giữa là kết quả của phép đầu, ô cuối là kết quả của phép sau.'})};
  }, check:function(q){
    var h=q._h, r=tinhHai(h);
    if(!Number.isInteger(r.mid) || !Number.isInteger(r.end) || r.mid>100 || r.end>100) return false;
    return q.ans===(q._lv<=2 ? r.end : r.mid); }},

  /* D5 — Qua hai cửa (Luyện tập 2, thay mê cung): chỉ thứ tự "giảm rồi gấp" */
  {name:'Qua hai cửa', sec:'Luyện tập 2 — Rô-bốt qua hai cửa liên tiếp (thay mê cung): giảm đi rồi gấp lên', mt:['MT2'], levels:3,
   muc:['30 qua "giảm 3 lần" rồi "gấp 4 lần": số cuối (số nhỏ).', 'Chọn cặp cửa cho kết quả 40 từ 30 (chọn một).', 'Biết số cuối và hai cửa, tìm số đầu.'],
   make:function(lv){
    var m, k, t, s, ra, g;
    if(lv<=1){ m=rnd(2,4); k=rnd(2,4); t=rnd(2,8); s=m*t; ra=t*k;
      return {type:'num', _lv:1, _m:m, _k:k, _s:s, q:soDoGT([{v:s},{v:''},{v:null}], [cuaChu('giam',m), cuaChu('gap',k)])+'<div>Số <b>'+s+'</b> đi qua cửa <b>'+cuaChu('giam',m)+'</b> rồi cửa <b>'+cuaChu('gap',k)+'</b>. Số ở ô <b class="text-amber-700">?</b> cuối cùng là bao nhiêu? (Ô nét đứt ở giữa là kết quả của cửa đầu.)</div>', ans:ra,
        sai:nhanSai([[t,'thieu-buoc'],[s*k,'thieu-buoc'],[(s-m)*k,'nham-giam-bot'],[s*m*k,'nham-chieu'],[ra+1,'nham-bang']], ra), goiY:gy()}; }
    if(lv===2){ m=pick([2,3,5,6]); t=rnd(3,12); s=m*t; k=rnd(2,6); ra=t*k; while(ra>=100 || s>=100){ t=rnd(3,12); s=m*t; ra=t*k; }
      var ds=[[m,k]], thu=[], i, p1, p2; for(p1=2;p1<=9;p1++) for(p2=2;p2<=9;p2++) thu.push([p1,p2]); shuffle(thu);
      for(i=0;i<thu.length && ds.length<4;i++){ var a=thu[i][0], b=thu[i][1]; if(s%a===0 && (s/a)*b!==ra && (s/a)*b<100 && ds.every(function(d){ return d[0]!==a || d[1]!==b; })) ds.push([a,b]); }
      shuffle(ds); var tx=ds.map(function(d){ return cuaChu('giam',d[0])+' rồi '+cuaChu('gap',d[1]); }), dung=cuaChu('giam',m)+' rồi '+cuaChu('gap',k), sai={}; tx.forEach(function(c,j){ if(c!==dung) sai[String(j)]='lech-nhom'; });
      return {type:'mcq', cot:1, _lv:2, _s:s, _ra:ra, _dung:dung, q:soDoGT([{v:s},{v:''},{v:ra}], ['cửa 1','cửa 2'])+'<div>Số <b>'+s+'</b> đi qua hai cửa liên tiếp thì ra số <b>'+ra+'</b>. Hai cửa nào đúng?</div>', choices:tx, correct:tx.indexOf(dung), sai:sai,
        goiY:gy({'lech-nhom':'Bé thử từng cặp cửa: giảm số '+s+' trước, rồi gấp lên. Cặp nào ra '+ra+'?'})}; }
    m=rnd(2,6); k=rnd(2,5); t=rnd(3,12); s=m*t; ra=t*k; while(s>=100 || ra>=100){ t=rnd(3,12); s=m*t; ra=t*k; }
    return {type:'num', _lv:3, _m:m, _k:k, _s:s, _ra:ra, q:soDoGT([{v:null},{v:''},{v:ra}], [cuaChu('giam',m), cuaChu('gap',k)])+'<div>Một số đi qua cửa <b>'+cuaChu('giam',m)+'</b> rồi cửa <b>'+cuaChu('gap',k)+'</b> thì ra số <b>'+ra+'</b>. Số ban đầu ở ô <b class="text-amber-700">?</b> là bao nhiêu? (Ô nét đứt ở giữa là kết quả của cửa đầu.)</div>', ans:s,
      sai:nhanSai([[ra,'dao-vai'],[t,'thieu-buoc'],[ra*m,'thieu-buoc'],[ra/k+m,'dao-vai'],[s+m,'nham-bang']], s), goiY:gy({'dao-vai':'Bé làm ngược lại: từ số cuối, chia cho '+k+' rồi nhân với '+m+'.', 'thieu-buoc':'Hai bước: ngược cửa sau trước, rồi ngược cửa đầu.'})};
  }, check:function(q){
    if(q._lv===2){
      var s=q._s, ra=q._ra, tl=q.choices.filter(function(c){ var x=/^giảm (\d+) lần rồi gấp (\d+) lần$/.exec(c); return x && s%(+x[1])===0 && (s/(+x[1]))*(+x[2])===ra; });
      return kiemMCQ(q) && q.choices.length===4 && tl.length===1 && tl[0]===q._dung && s<100 && ra<100 && q.choices.every(function(c){ var x=/^giảm (\d+) lần rồi gấp (\d+) lần$/.exec(c); return x && s%(+x[1])===0 && (s/(+x[1]))<=100; }); }
    var m=q._m, k=q._k, s2=q._s;
    if(s2%m) return false;
    if(q._lv===1) return q.ans===(s2/m)*k && s2<100;
    return q.ans===s2 && (s2/m)*k===q._ra && q._ra<100; }},

  /* D6 — Đúng / Sai giảm hay bớt (không có trong SGK) */
  {name:'Đúng / Sai giảm hay bớt', sec:'Tìm lỗi — Giảm đi mấy lần, bớt mấy đơn vị (Đ / S)', mt:['MT3'], levels:3,
   muc:['"Giảm 27 đi 3 lần được 9" đúng hay sai.', 'Từ hai số, câu "bớt … đơn vị" hoặc "giảm đi … lần".', 'Câu có hai quan hệ cùng lúc: giảm đi … lần và bớt … đơn vị.'],
   make:function(lv){
    var n, m, a, b, x, y, dung, tag='nham-giam-bot', ph, thatSu, loai;
    if(lv<=1){ n=rnd(2,5); m=rnd(3,9); a=n*m; dung=Math.random()<0.5; x = dung ? m : pick([a-n, m+1, m-1, n].filter(function(v){ return v>0 && v!==m; })); thatSu=(x*n===a);
      ph='Giảm '+a+' đi '+n+' lần được '+x+'.'; tag = x===a-n ? 'nham-giam-bot' : (x===n ? 'nham-so-lan' : 'nham-bang'); return mk(); }
    if(lv===2){ n=rnd(2,5); b=rnd(3,12); a=n*b; loai=pick(['bot','giam']); dung=Math.random()<0.5;
      if(loai==='bot'){ x = dung ? a-b : pick([n, a-b+1, a-b-1, b].filter(function(v){ return v>0 && v!==a-b; })); thatSu=(a-x===b); ph='Từ '+a+' xuống '+b+' là bớt '+x+' đơn vị.'; tag = x===n ? 'nham-giam-bot' : 'nham-bang'; }
      else { x = dung ? n : pick([a-b, n+1, n-1].filter(function(v){ return v>1 && v!==n; })); thatSu=(b*x===a); ph='Từ '+a+' xuống '+b+' là giảm đi '+x+' lần.'; tag = x===a-b ? 'nham-giam-bot' : 'nham-bang'; }
      return mk(); }
    n=rnd(2,4); b=rnd(6,24); a=n*b; dung=Math.random()<0.5; x=n; y=a-b;
    if(!dung){ var v=pick([[y,n],[n,n],[y,y],[n+1,y],[n,y+1]]); x=v[0]; y=v[1]; }
    thatSu=(b*x===a && a-y===b); ph='Từ '+a+' xuống '+b+' là giảm đi '+x+' lần và bớt '+y+' đơn vị.'; tag='nham-giam-bot';
    function mk(){
      return {type:'mcq', figFn:dsBtn27, _lv:lv, _a:a, _b:b, _n:n, _x:x, _y:y, _loai:loai, _dung:(thatSu?'Đ':'S'), q:'<div class="text-xl font-extrabold text-orange-700 my-2">'+ph+'</div><div class="text-base text-slate-500">Đúng (Đ) hay sai (S)?</div>', choices:['Đ','S'], correct:(thatSu?0:1), sai:(thatSu?{}:{'0':tag}),
        goiY:gy({'chung':'Bé thử: '+a+' : ? = '+(lv<=1 ? 'kết quả' : b)+' và '+a+' − ? = '+(lv<=1 ? 'kết quả' : b)+'.'})}; }
    return mk();
  }, check:function(q){
    var a=q._a, b=q._b, tr;
    if(q._lv<=1) tr = q._x*q._n===a;
    else if(q._lv===2) tr = q._loai==='bot' ? a-q._x===b : b*q._x===a;
    else tr = b*q._x===a && a-q._y===b;
    return q.choices.join()==='Đ,S' && (q._dung==='Đ')===tr && q.correct===(tr?0:1) && a<100 && Number.isInteger(a/q._n) && (q._lv<=1 || a===b*q._n) && q._x>0; }},

  /* D7 — Bạn nói đúng hay sai (không có trong SGK) */
  {name:'Bạn nói đúng hay sai', sec:'Tìm lỗi — Bạn An nói giảm một số đi mấy lần được bao nhiêu', mt:['MT3'], levels:3,
   muc:['Bạn An nói kết quả giảm đi n lần (số sai nhỏ, lệch một).', 'Bạn An nói kết quả bằng hiệu (trừ thay chia).', 'Bạn An nói kết quả bằng tích (nhân thay chia).'],
   make:function(lv){
    var k=rnd(2,5), T=rnd(3,9), a=k*T, x, mo, tag, ok=Math.random()<0.5;
    mo=function(n){ return n+' × '+k+' = '+(n*k); };
    if(lv<=1){ x = ok ? T : pick([T+1,T-1].filter(function(v){ return v>0; })); }
    else if(lv===2){ x = ok ? T : (a-k!==T ? a-k : T+1); }
    else { x = ok ? T : (a*k<100 ? a*k : T+2); }
    tag = x===T ? 'nham-bang' : (x===a-k ? 'nham-giam-bot' : (x===a*k ? 'nham-chieu' : 'nham-bang'));
    var hnx=haiNhanXet(x, T, mo), sai={}; sai[String(1-hnx.correct)]=tag;
    return {type:'mcq', cot:1, _lv:lv, _a:a, _k:k, _x:x, _T:T, _ds:hnx.ds, _dung:hnx.choices[hnx.correct], q:nguoi('boy','Bạn An')+'<div>Bạn An nói: «Giảm '+a+' đi '+k+' lần được <b>'+x+'</b>.» Em thấy thế nào?</div>', choices:hnx.choices, correct:hnx.correct, sai:sai,
      goiY:gy({'chung':'Bé thử: ? × '+k+' = '+a+'. Số nào đúng?'})};
  }, check:function(q){
    return kiemNhanXet(q) && q._T*q._k===q._a && q._a<100 && Number.isInteger(q._T); }},

  /* D8 — Nhãn vở còn lại (Hoạt động 2) */
  {name:'Nhãn vở còn lại', sec:'Hoạt động 2 — Nam có 42 nhãn vở, cho bạn một số nhãn; số còn lại giảm đi 3 lần', mt:['MT4'], levels:3,
   muc:['Số nhãn vở giảm đi n lần: còn bao nhiêu.', 'Cho bạn một số nhãn thì số còn lại giảm đi n lần so với lúc đầu: số nhãn còn lại.', 'Số nhãn đã cho bạn (hai bước).'],
   make:function(lv){
    var n, m, a, cau, ans, sai, unit='nhãn vở';
    if(lv<=1){ n=rnd(2,4); m=rnd(3,9); a=n*m; ans=m; cau='Nam có <b>'+a+' nhãn vở</b>. Số nhãn vở của Nam <b>giảm đi '+n+' lần</b>. Hỏi còn lại bao nhiêu nhãn vở?'; sai=[[a-n,'nham-giam-bot'],[a*n,'nham-chieu'],[n,'nham-so-lan'],[m+1,'nham-bang']]; }
    else if(lv===2){ n=rnd(2,4); m=rnd(5,14); a=n*m; while(a>=60){ m=rnd(5,14); a=n*m; } ans=m; cau='Nam có <b>'+a+' nhãn vở</b>, cho bạn một số nhãn thì số nhãn còn lại <b>giảm đi '+n+' lần</b> so với lúc đầu. Hỏi Nam còn lại bao nhiêu nhãn vở?'; sai=[[a-n,'nham-giam-bot'],[a-m,'thieu-buoc'],[a,'thieu-buoc'],[n,'nham-so-lan']]; }
    else { n=rnd(2,4); m=rnd(5,14); a=n*m; while(a>=60){ m=rnd(5,14); a=n*m; } ans=a-m; cau='Nam có <b>'+a+' nhãn vở</b>, cho bạn một số nhãn thì số nhãn còn lại <b>giảm đi '+n+' lần</b> so với lúc đầu. Hỏi Nam đã cho bạn bao nhiêu nhãn vở?'; sai=[[m,'thieu-buoc'],[a,'thieu-buoc'],[a-n,'nham-giam-bot'],[ans+1,'nham-bang'],[ans-1,'nham-bang']]; }
    return {type:'num', _lv:lv, _a:a, _n:n, q:nguoi('boy','Nam')+'<div>'+cau+'</div>', ans:ans, unit:unit, sai:nhanSai(sai, ans),
      goiY:gy({'thieu-buoc':'Bé tìm số nhãn còn lại trước ('+a+' : '+n+'). Rồi đọc kỹ câu hỏi: hỏi còn lại hay hỏi đã cho?'})};
  }, check:function(q){
    var a=q._a, n=q._n; if(a%n || a>=100) return false;
    var m=a/n; return q.ans===(q._lv<=2 ? m : a-m) && q.ans>0; }},

  /* D9 — Bút màu sau khoá vẽ (Luyện tập 3) */
  {name:'Bút màu sau khoá vẽ', sec:'Luyện tập 3 — Mai có 28 bút màu, sau khoá vẽ số bút còn lại giảm đi 4 lần', mt:['MT4'], levels:3,
   muc:['28 bút màu giảm đi 4 lần: còn bao nhiêu.', 'Chọn phép tính đúng (chia hay trừ).', 'Biết số bút còn lại, tìm số bút lúc đầu.'],
   make:function(lv){
    var n, m, a;
    if(lv<=1){ n=rnd(2,5); m=rnd(3,9); a=n*m;
      return {type:'num', _lv:1, _a:a, _n:n, q:nguoi('girl','Mai')+'<div>Mai có <b>'+a+' bút màu</b>. Sau khoá vẽ, số bút màu <b>giảm đi '+n+' lần</b>. Hỏi Mai còn lại bao nhiêu bút màu?</div>', ans:m, unit:'bút màu',
        sai:nhanSai([[a-n,'nham-giam-bot'],[a*n,'nham-chieu'],[n,'nham-so-lan'],[m+1,'nham-bang']], m), goiY:gy()}; }
    if(lv===2){ n=rnd(2,5); m=rnd(3,9); a=n*m; var dung=a+' : '+n, ds=[[dung,''],[a+' − '+n,'nham-giam-bot'],[a+' × '+n,'nham-chieu'],[a+' + '+n,'chon-sai-phep']];
      shuffle(ds); var ch=ds.map(function(d){ return d[0]; }), sai={}; ds.forEach(function(d,i){ if(d[1]) sai[String(i)]=d[1]; });
      return {type:'mcq', cot:1, _lv:2, _a:a, _n:n, _dung:dung, q:nguoi('girl','Mai')+'<div>Mai có '+a+' bút màu. Sau khoá vẽ, số bút màu giảm đi '+n+' lần. Phép tính nào tìm số bút màu còn lại?</div>', choices:ch, correct:ch.indexOf(dung), sai:sai, goiY:gy()}; }
    n=rnd(2,5); m=rnd(4,12); a=n*m;
    return {type:'num', _lv:3, _a:a, _n:n, q:nguoi('girl','Mai')+'<div>Sau khoá vẽ, số bút màu của Mai <b>giảm đi '+n+' lần</b> và còn lại <b>'+m+' bút màu</b>. Hỏi lúc đầu Mai có bao nhiêu bút màu?</div>', ans:a, unit:'bút màu',
      sai:nhanSai([[m+n,'dao-vai'],[m-n,'dao-vai'],[n,'nham-so-lan'],[a+n,'nham-bang']], a), goiY:gy({'dao-vai':'Lúc đầu gấp '+n+' lần lúc sau: bé lấy '+m+' × '+n+'.'})};
  }, check:function(q){
    var a=q._a, n=q._n, m=a/n;
    if(!Number.isInteger(m) || a>=100) return false;
    if(q._lv===2) return kiemMCQ(q) && q.choices.filter(function(c){ return tinhBT(c)===m; }).length===1 && tinhBT(q._dung)===m;
    return q.ans===(q._lv<=1 ? m : a); }},

  /* D10 — Tìm số chia (Luyện tập 4) */
  {name:'Tìm số chia', sec:'Luyện tập 4 — Tìm số chia: 54 : ? = 6, 56 : ? = 7, 36 : ? = 9', mt:['MT4'], levels:3,
   muc:['Số chia nhỏ (24 : ? = 6).', 'Số chia bất kì (56 : ? = 7, 36 : ? = 9).', 'Số chia và thương lớn (72 : ? = 8).'],
   make:function(lv){
    var d, q, a;
    if(lv<=1){ d=rnd(2,5); q=rnd(3,9); } else if(lv===2){ d=rnd(2,9); q=rnd(4,9); } else { d=rnd(6,9); q=rnd(6,9); }
    a=d*q;
    return {type:'num', _lv:lv, _a:a, _q:q, q:'<div class="text-slate-500 mb-1">Tìm số chia</div><div class="text-3xl font-extrabold text-orange-600">'+a+' : '+oHoi()+' = '+q+'</div>', ans:d,
      sai:nhanSai([[q,'dao-vai'],[a-q,'chon-sai-phep'],[a+q,'cong-thay-nhan'],[d+1,'nham-bang'],[d-1,'nham-bang']], d), goiY:gy({'dao-vai':'Số chia là số nhân với '+q+' được '+a+'. Bé tìm số mà ? × '+q+' = '+a+'.'})};
  }, check:function(q){
    var d=q.ans; return Number.isInteger(d) && d>=2 && q._a===d*q._q && q._a<100; }}
 ]
};
