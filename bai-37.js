/* bai-37.js — Bài 37: Chia số có ba chữ số cho số có một chữ số. BÀI MỚI, Engine v2 — LUYỆN THÔNG MINH.
   Theo bảng phân tích sư phạm đã duyệt (phan-tich-su-pham/bai-37.md, PR #28): 4 MỤC TIÊU (muctieu) × 11 DẠNG (topics), mỗi dạng 3 mức (Thông tư 27).
   Số bị chia 100–999, số chia 2–9, thương 10–499; số dư luôn bé hơn số chia; cách viết "(dư r)" sau thương như bài 25, 26.
   Hình mới viết ngay trong file này (không sửa figures.js): chiaDoc3 (khung ⌐ tối đa ba bước chia – nhân – trừ – hạ; thương có chữ số 0 thì vẫn vẽ hàng tích 0 và số dư như sách). Mỗi chữ số mang data-pt; check() dựng lại danh sách chữ số từ a, b rồi so với chuỗi SVG.
   soDoGT chép từ bài 35 (bản PR #20), canDia chép từ bài 36, theTinh chép từ bài 35.
   QUY TẮC: nối chuỗi, KHÔNG backtick và KHÔNG template literal. */

/* ---- Tiện ích chung ---- */
function nhanSai(ds, dung){ var o={}; ds.forEach(function(p){ var v=p[0]; if(Number.isInteger(v) && v>0 && v!==dung && !(String(v) in o)) o[String(v)]=p[1]; }); return o; }
function kiemMCQ(q){ return q.choices[q.correct]===q._dung && new Set(q.choices).size===q.choices.length; }
function dsBtn37(ch){ return '<span class="text-2xl font-extrabold text-slate-700">'+ch+'</span><span class="ml-2 text-base font-bold text-slate-600">'+(ch==='Đ'?'Đúng':'Sai')+'</span>'; }
function svgX(w, h, px){ return svgHinh(w, h, px).replace('<svg ', '<svg class="text-slate-700" '); }
function khungHinh(s){ return '<div class="flex justify-center my-2">'+s+'</svg></div>'; }
function nguoi(ten, alt){ return '<div class="flex justify-center mb-1">'+anh(ten, 72, alt)+'</div>'; }
function kyHieu(nhan, bt){ return '<div class="text-slate-500 mb-1">'+nhan+'</div><div class="text-3xl font-extrabold text-orange-600">'+bt+'</div>'; }
function chia(a, b){ var q=Math.floor(a/b); return {q:q, r:a-q*b}; }
function duChu(c){ return c.q+(c.r ? ' (dư '+c.r+')' : ''); }
var GOI={'quen-ha':'Chia xong một hàng, bé HẠ chữ số tiếp theo xuống rồi chia tiếp. Chia đến hết chữ số hàng đơn vị mới thôi.', 'thieu-so-0':'Hạ chữ số xuống mà không chia được cho số chia thì bé viết 0 ở thương rồi hạ tiếp (714 : 7 = 102).',
  'du-lon-hon-chia':'Số dư luôn bé hơn số chia. Nếu số dư còn chia được nữa, bé chia tiếp.', 'quen-du':'Còn thừa thì phải thêm một nữa: số thương cộng 1.', 'tru-sai-buoc':'Bé tính lại bước trừ: số bị chia trừ tích (số chia × thương).',
  'nham-thuong-du':'Thương là kết quả phép chia, số dư là phần còn lại.', 'nham-hang':'6 trăm : 2 = 3 trăm, tức là 300. Bé nhẩm theo trăm rồi viết đủ hai chữ số 0.', 'nham-giam-bot':'Giảm đi n lần là chia cho n. Bớt n đơn vị mới là trừ n.', 'nham-chieu':'Giảm đi là chia, gấp lên là nhân. Bé đọc kỹ nhé!',
  'nham-bang':'Bé nhẩm lại bảng chia rồi làm từng bước.', 'cong-thay-nhan':'Nhiều phần bằng nhau: chia hoặc nhân, không cộng, trừ.', 'dao-vai':'Bé xem lại: ô ? là số bị chia, số chia, thương hay số dư?', 'thieu-buoc':'Bài này có hai bước. Bé làm đủ các bước nhé!', 'chon-sai-phep':'Bé đọc kỹ: chia đều là chia, gộp lại là cộng, bớt đi là trừ.', 'dem-sot-phep':'Bé tính từng thẻ rồi đếm lại nhé!'};
function gy(extra){ var o={}, k; for(k in GOI) o[k]=GOI[k]; for(k in (extra||{})) o[k]=extra[k]; return o; }
function theTinh(ds){
  var s='<div class="flex flex-wrap justify-center gap-2 my-2">';
  ds.forEach(function(t){ s+='<span class="inline-block px-3 py-2 rounded-xl border-2 border-amber-300 text-slate-700 font-extrabold text-xl whitespace-nowrap">'+t+'</span>'; });
  return s+'</div>';
}
function docThe(s){ var o=[], re=/<span class="inline-block px-3 py-2[^>]*>([^<]*)<\/span>/g, m; while((m=re.exec(String(s)))) o.push(m[1]); return o; }

/* ---- Các bước chia số có ba chữ số: bước đầu lấy một hoặc hai chữ số đầu (đủ chia), rồi hạ từng chữ số ---- */
function buocChia3(a, b){
  var d=[Math.floor(a/100), Math.floor(a/10)%10, a%10], steps=[], start=0, cur=d[0], j;
  if(cur<b){ cur=d[0]*10+d[1]; start=1; }
  var q=Math.floor(cur/b), t=q*b, r=cur-t; steps.push({col:start, cur:cur, q:q, t:t, r:r});
  for(j=start+1;j<3;j++){ cur=r*10+d[j]; q=Math.floor(cur/b); t=q*b; r=cur-t; steps.push({col:j, cur:cur, q:q, t:t, r:r}); }
  return {d:d, steps:steps, thuong:steps.map(function(s){ return s.q; }).join(''), q:Math.floor(a/b), r:a%b, soBuoc:steps.length};
}
/* Danh sách chữ số của khung ⌐ (id, cột, hàng, chữ) — dùng chung cho vẽ và kiểm. an = 'q0'|'q1'|'q2' (chữ số thương tính từ phải), 'ha' (chữ số hạ cuối), 'u' (tích cuối), 'r' (số dư cuối).
   Mọi bước đều vẽ hàng tích và số dư, kể cả bước thương 0 (như sách: 714 : 7 → hạ 1, 1 : 7 = 0, viết 0, hạ 4). */
function chuSoChia3(a, b, tuy){
  tuy=tuy||{}; var B=buocChia3(a,b), it=[], X=[44,80,116], Q=[170,206,242], row=0, k, s, lastU=-1, lastHa=-1, lastR=-1, i;
  function add(id, x, y, ch){ it.push({id:id, x:x, y:y, ch:ch}); }
  add('a2', X[0], 44, String(B.d[0])); add('a1', X[1], 44, String(B.d[1])); add('a0', X[2], 44, String(B.d[2])); add('b0', 170, 44, String(b));
  var th=B.thuong, L=th.length;
  for(i=0;i<L;i++){ var qi=L-1-i; add('q'+qi, Q[i], 96, (tuy.an==='q'+qi) ? '?' : th.charAt(i)); }
  var yRow=44, lines=[];   /* hàng đang chứa số dư và chữ số hạ */
  for(k=0;k<B.steps.length;k++){ s=B.steps[k];
    if(k>0) add('h'+k, X[s.col], yRow, String(B.d[s.col]));
    var yU=yRow+52, tt=String(s.t), n=tt.length;
    for(i=0;i<n;i++) add('u'+k+'_'+(n-1-i), X[s.col-(n-1)+i], yU, tt.charAt(i));
    lines.push([X[s.col-(n-1)]-18, yU+12, X[s.col]+18]); lastU=k; yRow=yU+52;
    add('r'+k, X[s.col], yRow, String(s.r)); lastR=k;
  }
  lastHa=B.steps.length-1;
  if(tuy.an==='ha' && lastHa>=1) it.forEach(function(e){ if(e.id==='h'+lastHa) e.ch='?'; });
  if(tuy.an==='u' && lastU>=0) it.forEach(function(e){ if(e.id.indexOf('u'+lastU+'_')===0) e.ch='?'; });
  if(tuy.an==='r' && lastR>=0) it.forEach(function(e){ if(e.id==='r'+lastR) e.ch='?'; });
  return {it:it, H:yRow+30, B:B, lines:lines};
}
function chiaDoc3(a, b, tuy){
  var o=chuSoChia3(a,b,tuy), s=svgX(270,o.H,270);
  o.it.forEach(function(e){
    if(e.ch==='?') s+='<rect x="'+(e.x-17)+'" y="'+(e.y-27)+'" width="34" height="37" rx="7" fill="none" stroke="'+HM.hoi+'" stroke-width="2.5" stroke-dasharray="5 3"/>';
    s+='<text data-pt="'+e.id+'" x="'+e.x+'" y="'+e.y+'" text-anchor="middle" font-size="34" '+HFONT+' fill="'+(e.ch==='?'?HM.hoi:'currentColor')+'">'+e.ch+'</text>';
  });
  o.lines.forEach(function(l){ s+='<text x="12" y="'+(l[1]-12)+'" text-anchor="middle" font-size="26" '+HFONT+' fill="currentColor">&#8722;</text><line x1="'+l[0]+'" y1="'+l[1]+'" x2="'+l[2]+'" y2="'+l[1]+'" stroke="currentColor" stroke-width="3" stroke-linecap="round"/>'; });
  s+='<line x1="140" y1="10" x2="140" y2="106" stroke="currentColor" stroke-width="3" stroke-linecap="round"/><line x1="140" y1="54" x2="266" y2="54" stroke="currentColor" stroke-width="3" stroke-linecap="round"/>';
  return khungHinh(s);
}
function docPT(s){ var o={}, re=/data-pt="(\w+)"[^>]*>([^<]*)<\/text>/g, m; while((m=re.exec(String(s)))) o[m[1]]=m[2]; return o; }
function kiemChia3(q){
  var p=q._pt, o=chuSoChia3(p.a, p.b, {an:p.an}), d=docPT(q.q), want={};
  o.it.forEach(function(e){ want[e.id]=e.ch; });
  var ids=Object.keys(want);
  return p.a>=100 && p.a<=999 && p.b>=2 && p.b<=9 && ids.length===Object.keys(d).length && ids.every(function(k){ return d[k]===want[k]; });
}
/* sinh phép chia ba chữ số theo yêu cầu: het (true/false), so0 (thương có chữ số 0 ở giữa hoặc cuối), khong0 (thương không có 0), baSo (thương ba chữ số), haiSo (thương hai chữ số), tronChuc (thương tận cùng 0) */
function phepChia3(lo){
  lo=lo||{}; for(var g=0;g<6000;g++){ var b=rnd(2,9), a=rnd(100,999), c=chia(a,b), B=buocChia3(a,b), th=String(c.q);
    if(c.q<10) continue;
    if(lo.het===true && c.r!==0) continue; if(lo.het===false && c.r===0) continue;
    if(lo.so0 && th.indexOf('0')<0) continue; if(lo.khong0 && th.indexOf('0')>=0) continue;
    if(lo.baSo && th.length!==3) continue; if(lo.haiSo && th.length!==2) continue;
    if(lo.tronChuc && c.q%10!==0) continue; if(lo.giua0 && !(th.length===3 && th.charAt(1)==='0')) continue;
    if(lo.cuoiKhac0 && B.steps[B.steps.length-1].q===0) continue;
    return {a:a, b:b, q:c.q, r:c.r}; }
  return {a:312, b:2, q:156, r:0};
}

/* ---- Hình (D8): sơ đồ số – cửa – kết quả (chép từ bài 35) ---- */
function soDoGT(nut, cua){
  var nhieu=nut.length>=3, ml=0, D=nhieu?48:56, A,  W, s, x=4, i; var dong=function(c){ var m=/^(.+?) (đơn vị)$/.exec(c); return m ? [m[1], m[2]] : [c]; }; cua.forEach(function(c){ dong(c).forEach(function(d){ ml=Math.max(ml, d.length); }); }); A=Math.max(nhieu?108:128, Math.ceil(ml*8.8)+8); W=nut.length*D+(nut.length-1)*A+8; s=svgX(W,92);
  for(i=0;i<nut.length;i++){
    var v=nut[i].v, hoi=(v===null || v===undefined), trong=(v===''), cx=x+D/2;
    if(trong) s+='<circle cx="'+cx+'" cy="62" r="'+(D/2-1.5)+'" fill="none" stroke="currentColor" stroke-width="2.5" stroke-dasharray="5 4" opacity=".55"/>';
    else s+='<circle cx="'+cx+'" cy="62" r="'+(D/2-1.5)+'" fill="'+(hoi ? '#fff' : HM.vang)+'"'+(hoi ? ' stroke="'+HM.vangDam+'" stroke-width="3"' : '')+'/>'+chuSo(cx, 62, hoi ? '?' : v, hoi ? 24 : (String(v).length>2 ? 18 : 22));
    x+=D;
    if(i<cua.length){
      var ls=dong(cua[i]); s+=ls.map(function(t,j){ return '<text x="'+(x+A/2)+'" y="'+(ls.length>1 ? 22+j*24 : 42)+'" text-anchor="middle" font-size="17" '+HFONT+' fill="currentColor">'+t+'</text>'; }).join('')
       +'<path d="M'+(x+8)+' 62 H'+(x+A-8)+' M'+(x+A-15)+' 56 L'+(x+A-8)+' 62 L'+(x+A-15)+' 68" stroke="currentColor" stroke-width="2.6" fill="none" stroke-linecap="round" stroke-linejoin="round" opacity=".6"/>';
      x+=A;
    }
  }
  return khungHinh(s);
}
function cuaChu(loai, k){ return loai==='gap' ? 'gấp '+k+' lần' : 'giảm '+k+' lần'; }
function ap(loai, v, k){ return loai==='gap' ? v*k : v/k; }

/* ---- Hình (D9): cân đĩa (chép từ bài 36; mỗi bên tối đa 4 vật; vật có nhan=true mang nhãn trắng 60×30) ---- */
function canDia(trai, phai, nghieng){
  var W=390, H=236, xL=104, xR=286, yBeam=70, yPan=172, s=svgX(W,H), dy = nghieng==='trai' ? 14 : (nghieng==='phai' ? -14 : 0), yb1=yBeam+dy, yb2=yBeam-dy, yp1=yPan+dy, yp2=yPan-dy;
  s+='<path data-nghieng="'+(nghieng||'can')+'" d="M'+xL+' '+yb1+' L'+xR+' '+yb2+'" fill="none" stroke="currentColor" stroke-width="4" stroke-linecap="round"/>'
    +'<path d="M195 '+yBeam+' V216 M155 220 H235" fill="none" stroke="currentColor" stroke-width="5" stroke-linecap="round"/>'
    +'<path d="M'+xL+' '+yb1+' L24 '+yp1+' M'+xL+' '+yb1+' L184 '+yp1+' M'+xR+' '+yb2+' L206 '+yp2+' M'+xR+' '+yb2+' L366 '+yp2+'" fill="none" stroke="currentColor" stroke-width="1.8" opacity=".5"/>'
    +'<path d="M24 '+yp1+' H184 Q184 '+(yp1+16)+' 104 '+(yp1+16)+' Q24 '+(yp1+16)+' 24 '+yp1+'" fill="'+HM.vang+'" fill-opacity="0.5" stroke="currentColor" stroke-width="2.5"/>'
    +'<path d="M206 '+yp2+' H366 Q366 '+(yp2+16)+' 286 '+(yp2+16)+' Q206 '+(yp2+16)+' 206 '+yp2+'" fill="'+HM.vang+'" fill-opacity="0.5" stroke="currentColor" stroke-width="2.5"/>';
  function xep(ds, cx, side, yp){
    var n=ds.length, o='', pos=[], i;
    var w=function(d){ return d.k==='goi' ? 74 : (d.nhan ? 70 : 66); }, h=function(d){ return d.k==='goi' ? 46 : (d.nhan ? 40 : 34); };
    if(n===1) pos=[[cx,0]]; else if(n===2) pos=[[cx-38,0],[cx+38,0]]; else if(n===3) pos=[[cx-38,0],[cx+38,0],[cx,1]]; else pos=[[cx-38,0],[cx+38,0],[cx-38,1],[cx+38,1]];
    for(i=0;i<n;i++){ var d=ds[i], ww=w(d), hh=h(d), x=pos[i][0]-ww/2, y=yp-hh-pos[i][1]*46, tx=pos[i][0], ty=y+hh/2+6;
      if(d.k==='goi') o+='<rect data-g="'+d.g+'" data-s="'+side+'" data-k="goi" x="'+x+'" y="'+y+'" width="'+ww+'" height="'+hh+'" rx="8" fill="'+HM.cam+'" fill-opacity="0.55" stroke="currentColor" stroke-width="2.5"/>'+(d.an ? '<text x="'+tx+'" y="'+(ty+2)+'" text-anchor="middle" font-size="24" '+HFONT+' fill="'+HM.hoi+'">?</text>' : nhanVien(tx, y+hh/2, 60, 30, d.g+' g', 18));
      else o+='<rect data-dem="vat" data-g="'+d.g+'" data-s="'+side+'" data-k="can" x="'+x+'" y="'+y+'" width="'+ww+'" height="'+hh+'" rx="6" fill="'+(d.nhan ? HM.troi : HM.xam)+'" stroke="currentColor" stroke-width="2.5"/>'+(d.nhan ? (d.an ? '<text x="'+tx+'" y="'+(ty+2)+'" text-anchor="middle" font-size="24" '+HFONT+' fill="'+HM.hoi+'">?</text>' : nhanVien(tx, y+hh/2, 60, 30, d.g+' g', 18)) : '<text x="'+tx+'" y="'+ty+'" text-anchor="middle" font-size="18" '+HFONT+' fill="'+HM.chu+'">'+d.g+' g</text>'); }
    return o;
  }
  s+=xep(trai, xL, 't', yp1)+xep(phai, xR, 'p', yp2);
  return khungHinh(s);
}
function docCanNhieu(html){ return String(html).split('<svg ').slice(1).map(function(seg){ var o=[], re=/<rect (?:data-dem="vat" )?data-g="(\d+)" data-s="(\w)" data-k="(\w+)"/g, m, n=/data-nghieng="(\w+)"/.exec(seg); while((m=re.exec(seg))) o.push({g:+m[1], s:m[2], k:m[3]}); return {items:o, nghieng:n ? n[1] : null}; }); }
function tongBen(o, s){ var t=0; o.forEach(function(d){ if(d.s===s) t+=d.g; }); return t; }

/* đáp án nhiễu thật cho phép chia a : b */
function nhieuChia(a, b){ var c=chia(a,b), B=buocChia3(a,b), th=String(c.q), ds=[];
  ds.push([+th.replace(/0/g,''),'thieu-so-0']); ds.push([+th.slice(0,-1),'quen-ha']); ds.push([c.q+1,'nham-bang']); ds.push([c.q-1,'nham-bang']); if(c.r) ds.push([c.r,'nham-thuong-du']); return ds; }

var BAI = {
 n: 37,
 title: 'Chia Số Có Ba Chữ Số Cho Số Có Một Chữ Số',
 sub: 'Luyện thông minh: câu hỏi tự đổi theo bé — làm hết lượt để xem ngọn lửa!',
 goal: 10, soCau: 18, soCauToiDa: 24,
 loi: {'quen-ha':'Quên hạ chữ số', 'thieu-so-0':'Thương thiếu chữ số 0', 'du-lon-hon-chia':'Số dư lớn hơn hoặc bằng số chia', 'quen-du':'Quên cộng 1 khi còn dư', 'tru-sai-buoc':'Trừ sai ở bước đặt tính',
       'nham-thuong-du':'Nhầm thương với số dư', 'nham-hang':'Nhẩm sai hàng (600 : 2 = 30)', 'nham-giam-bot':'Nhầm "giảm n lần" với "bớt n đơn vị"', 'nham-chieu':'Nhầm chiều phép tính (gấp thay giảm)', 'dem-sot-phep':'Đếm sót hoặc thừa thẻ'},
 muctieu: [
  {id:'MT1', ten:'Chia hết', muc:['312 : 2, 381 : 3: ô ? là một chữ số của thương; nhẩm 600 : 2.', '625 : 5, 371 : 7: điền thương; 270 : 3, 560 : 4 (thương tròn chục).', 'Thương có chữ số 0 ở giữa: 714 : 7 = 102; 810 : 9 = 90; chọn thẻ nhẩm.']},
  {id:'MT2', ten:'Chia có dư', muc:['156 : 5 = 31 (dư 1): chia hết hay có dư; hỏi thương.', '554 : 4, 237 : 5, 428 : 6: hỏi số dư; chọn phép chia có dư.', '102 : 5 = 20 (dư 2); 638 : 6 = 106 (dư 2); 518 : 5 = 103 (dư 3): thương có 0 và có dư.']},
  {id:'MT3', ten:'Vận dụng', muc:['354 quả táo vào hộp 6 quả; 144 m giảm 3 lần; rô-bốt 600 g và 4 khối; Việt được mấy điểm.', '460 bánh, hộp 4; 264 phút giảm 8 lần; số khác.', 'Cần ít nhất mấy hộp khi có dư; giảm rồi gấp; lạc đà 225 bướu (hai bước).']},
  {id:'MT4', ten:'Tìm lỗi', muc:['808 : 8 = 11: Đúng hay Sai?', 'Sai ở đâu: thiếu chữ số 0, quên hạ, số dư lớn hơn số chia.', 'Kết quả đúng là bao nhiêu.']}
 ],
 topics: [
  /* D1 — Vỏ chai làm đồ chơi (Khám phá 1a) */
  {name:'Vỏ chai làm đồ chơi', sec:'Khám phá 1 — 312 vỏ chai, mỗi đồ chơi làm từ 2 vỏ chai: 312 : 2 = 156 đồ chơi', mt:['MT1'], levels:3,
   muc:['312 vỏ chai, mỗi đồ chơi 2 vỏ (chia cho 2).', 'Số khác chia hết (chia cho 2–4).', 'Có dư: làm được bao nhiêu đồ chơi, còn thừa mấy vỏ.'],
   make:function(lv){
    var vat=pick([['vỏ chai','đồ chơi'],['viên bi','túi'],['bông hoa','lọ'],['quyển vở','chồng']]), p, c;
    if(lv<=1){ p=phepChia3({het:true}); p.b=2; p.a=2*rnd(50,499); } else if(lv===2){ p=phepChia3({het:true}); if(p.b>4){ p.b=pick([2,3,4]); p.a=p.b*rnd(Math.ceil(100/p.b),Math.floor(999/p.b)); } } else { p=phepChia3({het:false}); }
    c=chia(p.a,p.b);
    if(lv<=2) return {type:'num', _lv:lv, _a:p.a, _b:p.b, _hoi:'q', q:'<div>Có <b>'+p.a+' '+vat[0]+'</b>. Mỗi '+vat[1]+' cần <b>'+p.b+' '+vat[0]+'</b>. Làm được bao nhiêu '+vat[1]+'?</div>', ans:c.q, unit:vat[1], sai:nhanSai(nhieuChia(p.a,p.b).concat([[p.a-p.b,'cong-thay-nhan']]), c.q), goiY:gy()};
    var hoiDu=Math.random()<0.5;
    return {type:'num', _lv:3, _a:p.a, _b:p.b, _hoi:(hoiDu?'r':'q'), q:'<div>Có <b>'+p.a+' '+vat[0]+'</b>. Mỗi '+vat[1]+' cần <b>'+p.b+' '+vat[0]+'</b>. '+(hoiDu ? 'Làm được nhiều nhất có thể thì còn thừa mấy '+vat[0]+'?' : 'Làm được nhiều nhất bao nhiêu '+vat[1]+'?')+'</div>', ans:(hoiDu ? c.r : c.q), unit:(hoiDu ? vat[0] : vat[1]), sai:nhanSai(hoiDu ? [[c.q,'nham-thuong-du'],[c.r+p.b,'du-lon-hon-chia'],[c.r+1,'tru-sai-buoc']] : nhieuChia(p.a,p.b).concat([[c.q+1,'quen-du']]), hoiDu ? c.r : c.q), goiY:gy()};
  }, check:function(q){ var c=chia(q._a,q._b); if(q._a<100 || q._a>999 || c.q<10) return false; if(q._lv<=2) return c.r===0 && q.ans===c.q && (q._lv<=1 ? q._b===2 : q._b<=4); return c.r>0 && q.ans===(q._hoi==='r' ? c.r : c.q); }},

  /* D2 — Đặt tính chia hết (Hoạt động 1a, Luyện tập 1) */
  {name:'Đặt tính chia hết', sec:'Hoạt động 1, Luyện tập 1 — Đặt tính rồi tính: 381 : 3 = 127; 625 : 5 = 125; 371 : 7 = 53', mt:['MT1'], levels:3,
   muc:['Ô ? là chữ số đầu của thương.', 'Ô ? ở chữ số hạ xuống hoặc ở tích.', 'Ô ? là chữ số cuối của thương (381 : 3, 625 : 5, 371 : 7).'],
   make:function(lv){
    var p=phepChia3({het:true, khong0:true}), B=buocChia3(p.a,p.b), L=String(p.q).length, an, ans, sai, last=B.steps[B.steps.length-1];
    if(lv<=1){ an='q'+(L-1); ans=+String(p.q).charAt(0); sai=[[+String(p.q).charAt(1),'dao-vai'],[ans+1,'nham-bang'],[ans-1,'nham-bang']]; }
    else if(lv===2){ an=pick(['ha','u']); if(an==='ha'){ ans=B.d[last.col]; sai=[[last.r,'dao-vai'],[B.d[last.col-1],'dao-vai'],[last.cur,'tru-sai-buoc']]; } else { ans=last.t; sai=[[last.cur,'tru-sai-buoc'],[last.q,'dao-vai'],[last.t+p.b,'nham-bang'],[last.t-p.b,'nham-bang']]; } }
    else { an='q0'; ans=p.q%10; sai=[[last.cur,'dao-vai'],[ans+1,'nham-bang'],[ans-1,'nham-bang'],[last.t,'dao-vai']]; }
    return {type:'num', _lv:lv, _pt:{a:p.a,b:p.b,an:an}, q:chiaDoc3(p.a,p.b,{an:an})+'<div>Số ở ô <b class="text-amber-700">?</b> là bao nhiêu?</div>', ans:ans, sai:nhanSai(sai, ans), goiY:gy()};
  }, check:function(q){ var p=q._pt, c=chia(p.a,p.b), B=buocChia3(p.a,p.b), L=String(c.q).length, last=B.steps[B.steps.length-1]; if(!kiemChia3(q) || c.r!==0 || String(c.q).indexOf('0')>=0) return false;
    var e = p.an==='q'+(L-1) ? +String(c.q).charAt(0) : (p.an==='q0' ? c.q%10 : (p.an==='ha' ? B.d[last.col] : last.t)); return q.ans===e; }},

  /* D3 — Thương có chữ số 0 (Khám phá 2, Hoạt động trang 2, Luyện tập 1) */
  {name:'Thương có chữ số 0', sec:'Khám phá 2 — 714 : 7 = 102 (hạ 1, 1 không chia được cho 7, viết 0); 270 : 3 = 90; 810 : 9 = 90; 844 : 8 = 105 (dư 4)', mt:['MT1'], levels:3,
   muc:['Thương tròn chục: 270 : 3, 560 : 4, 450 : 9.', 'Thương có 0 ở giữa: 714 : 7 = 102; 810 : 9 = 90.', 'Có 0 và có dư: 844 : 8 = 105 (dư 4); 638 : 6 = 106 (dư 2).'],
   make:function(lv){
    var p = lv<=1 ? phepChia3({het:true, tronChuc:true}) : (lv===2 ? phepChia3({het:true, so0:true}) : phepChia3({het:false, so0:true})), c=chia(p.a,p.b), hoiDu = lv===3 && Math.random()<0.4;
    return {type:'num', _lv:lv, _pt:{a:p.a,b:p.b,an:(hoiDu?'r':'q0')}, _hoi:(hoiDu?'r':'q'), q:chiaDoc3(p.a,p.b,{an:(hoiDu?'r':'q0')})+'<div>'+(hoiDu ? 'Số dư ở ô <b class="text-amber-700">?</b> là bao nhiêu?' : 'Thương của phép chia <b>'+p.a+' : '+p.b+'</b> là bao nhiêu? (Ô <b class="text-amber-700">?</b> là chữ số cuối của thương.)')+'</div>', ans:(hoiDu ? c.r : c.q), sai:nhanSai(hoiDu ? [[c.q,'nham-thuong-du'],[c.r+p.b,'du-lon-hon-chia'],[c.r+1,'tru-sai-buoc']] : nhieuChia(p.a,p.b), hoiDu ? c.r : c.q), goiY:gy()};
  }, check:function(q){ var p=q._pt, c=chia(p.a,p.b), th=String(c.q); if(!kiemChia3(q) || th.indexOf('0')<0) return false;
    if(q._lv<=1 && (c.q%10!==0 || c.r!==0)) return false; if(q._lv===2 && c.r!==0) return false; if(q._lv===3 && c.r===0) return false;
    return q.ans===(q._hoi==='r' ? c.r : c.q); }},

  /* D4 — Chia nhẩm số tròn trăm (Luyện tập 2) */
  {name:'Chia nhẩm số tròn trăm', sec:'Luyện tập 2 — Tính nhẩm theo mẫu 600 : 2: 6 trăm : 2 = 3 trăm; 400 : 4; 600 : 3; 800 : 2', mt:['MT1'], levels:3,
   muc:['600 : 2, 400 : 4 (có gợi ý "6 trăm : 2").', '600 : 3, 800 : 2: nhẩm không gợi ý.', 'Chọn thẻ có kết quả 200 (hoặc 100, 300) trong bốn thẻ.'],
   make:function(lv){
    if(lv<=2){ var t=rnd(2,9), b=pick([2,3,4,5,6,7,8,9].filter(function(x){ return t%x===0; })), a=100*t, ans=a/b;
      return {type:'num', _lv:lv, _a:a, _b:b, q:kyHieu('Tính nhẩm', a+' : '+b+' ='+oHoi())+(lv<=1 ? '<div class="text-base text-slate-500">Mẫu: 600 : 2: 6 trăm : 2 = 3 trăm. Vậy 600 : 2 = 300.</div><div class="text-base text-slate-600">'+t+' trăm : '+b+' = ? trăm</div>' : ''), ans:ans, sai:nhanSai([[ans/10,'nham-hang'],[ans/100,'nham-hang'],[a-b,'cong-thay-nhan'],[ans+100,'nham-bang']], ans), goiY:gy()}; }
    var T=pick([100,200,300]), cands=[], x, y, g;
    for(x=2;x<=9;x++) for(y=2;y<=9;y++) if(x%y===0) cands.push(x*100+' : '+y);
    var dung=shuffle(cands.filter(function(c){ return tinhBT(c)===T; }))[0], khac=shuffle(cands.filter(function(c){ return tinhBT(c)!==T; })), ds=[dung];
    for(g=0;g<khac.length && ds.length<4;g++){ if(ds.every(function(c){ return tinhBT(c)!==tinhBT(khac[g]); })) ds.push(khac[g]); }
    ds=shuffle(ds); var sai={}; ds.forEach(function(c,i){ if(c!==dung) sai[String(i)]='nham-hang'; });
    return {type:'mcq', cot:1, _lv:3, _T:T, _ds:ds, _dung:dung, q:theTinh(ds)+'<div>Phép tính nào có kết quả bằng <b class="text-2xl text-orange-600">'+T+'</b>?</div>', choices:ds, correct:ds.indexOf(dung), sai:sai, goiY:gy({'nham-hang':'Bé nhẩm từng thẻ theo trăm: ví dụ 6 trăm : 3 = 2 trăm = 200.'})};
  }, check:function(q){
    if(q._lv<=2) return q._a%100===0 && q._a%q._b===0 && q.ans===q._a/q._b && q.ans%100===0;
    var ds=q._ds, v=ds.map(function(c){ return tinhBT(c); }); return kiemMCQ(q) && ds.length===4 && docThe(q.q).join('|')===ds.join('|') && v.filter(function(x){ return x===q._T; }).length===1 && tinhBT(q._dung)===q._T && new Set(v).size===4; }},

  /* D5 — Chia hết hay có dư (Khám phá 1b) */
  {name:'Chia hết hay có dư', sec:'Khám phá 1 — Xếp 156 đồ chơi vào hộp, mỗi hộp 5: 156 : 5 = 31 (dư 1)', mt:['MT2'], levels:3,
   muc:['Phép chia có chia hết không (Có / Không).', 'Thương hoặc số dư của một phép chia.', 'Chọn phép chia có dư trong ba phép.'],
   make:function(lv){
    var p, c;
    if(lv<=1){ p=phepChia3({het:Math.random()<0.5}); c=chia(p.a,p.b);
      return {type:'mcq', _lv:1, _a:p.a, _b:p.b, _dung:(c.r===0?'Có':'Không'), q:'<div>Phép chia <b class="text-2xl text-orange-600">'+p.a+' : '+p.b+'</b> có <b>chia hết</b> không?</div>', choices:['Có','Không'], correct:(c.r===0?0:1), sai:(c.r===0?{}:{'0':'nham-thuong-du'}), goiY:gy({'nham-thuong-du':'Chia hết khi số dư bằng 0. Bé tính '+p.a+' : '+p.b+' xem còn dư không.', 'chung':'Bé tính số dư: chia hết khi số dư bằng 0.'})}; }
    if(lv===2){ p=phepChia3({het:false}); c=chia(p.a,p.b); var hq=Math.random()<0.5;
      return {type:'num', _lv:2, _a:p.a, _b:p.b, _hoi:(hq?'q':'r'), q:kyHieu('Tính', p.a+' : '+p.b)+'<div class="mt-1">'+(hq ? 'Thương' : 'Số dư')+' của phép chia này là bao nhiêu?</div>', ans:(hq ? c.q : c.r), sai:nhanSai(hq ? nhieuChia(p.a,p.b) : [[c.q,'nham-thuong-du'],[c.r+p.b,'du-lon-hon-chia'],[c.r+1,'tru-sai-buoc'],[c.r-1,'tru-sai-buoc']], hq ? c.q : c.r), goiY:gy()}; }
    var ps=[], g, pp;
    for(g=0;g<500 && ps.length<3;g++){ pp=phepChia3({het:(ps.length>0)}); if(ps.every(function(x){ return x[0]!==pp.a; })) ps.push([pp.a,pp.b]); }
    var ds=shuffle(ps.slice()), ch=ds.map(function(x){ return x[0]+' : '+x[1]; }), dung=ps[0][0]+' : '+ps[0][1], sai={}; ch.forEach(function(x,i){ if(x!==dung) sai[String(i)]='nham-thuong-du'; });
    return {type:'mcq', cot:1, _lv:3, _ps:ps, _dung:dung, q:'<div>Phép chia nào <b>có dư</b>?</div>', choices:ch, correct:ch.indexOf(dung), sai:sai, goiY:gy({'nham-thuong-du':'Bé tính số dư của từng phép chia: phép có dư là phép có số dư khác 0.'})};
  }, check:function(q){
    if(q._lv<=1){ var c=chia(q._a,q._b); return q.correct===(c.r===0?0:1) && q._a>=100 && c.q>=10; }
    if(q._lv===2){ var c2=chia(q._a,q._b); return c2.r>0 && q.ans===(q._hoi==='q' ? c2.q : c2.r); }
    var rs=q._ps.map(function(x){ return x[0]%x[1]; }); return kiemMCQ(q) && q._ps.length===3 && rs.filter(function(v){ return v>0; }).length===1 && q._ps[0][0]%q._ps[0][1]>0; }},

  /* D6 — Đặt tính chia có dư (Hoạt động 1b, Hoạt động trang 2b, Luyện tập 1) */
  {name:'Đặt tính chia có dư', sec:'Hoạt động 1b, Luyện tập 1 — 237 : 5 = 47 (dư 2); 428 : 6 = 71 (dư 2); 403 : 3 = 134 (dư 1); 518 : 5 = 103 (dư 3)', mt:['MT2'], levels:3,
   muc:['Ô ? là chữ số cuối của thương (237 : 5, 428 : 6).', 'Ô ? là số dư (554 : 4, 251 : 5).', 'Thương có chữ số 0 và có dư (518 : 5, 764 : 7): thương hoặc số dư.'],
   make:function(lv){
    var p = lv<=2 ? phepChia3({het:false, khong0:true, cuoiKhac0:true}) : phepChia3({het:false, so0:true, cuoiKhac0:true}), c=chia(p.a,p.b), an, ans, sai, hoi;
    if(lv<=1){ an='q0'; ans=c.q%10; hoi='q0'; sai=[[c.r,'nham-thuong-du'],[ans+1,'nham-bang'],[ans-1,'nham-bang']]; }
    else if(lv===2){ an='r'; ans=c.r; hoi='r'; sai=[[c.q%10,'nham-thuong-du'],[c.r+p.b,'du-lon-hon-chia'],[c.r+1,'tru-sai-buoc'],[c.r-1,'tru-sai-buoc']]; }
    else { hoi=pick(['q','r']); an = hoi==='q' ? 'q0' : 'r'; ans = hoi==='q' ? c.q : c.r; sai = hoi==='q' ? nhieuChia(p.a,p.b) : [[c.q,'nham-thuong-du'],[c.r+p.b,'du-lon-hon-chia'],[c.r+1,'tru-sai-buoc']]; }
    var loi = hoi==='q0' ? 'Chữ số ở ô <b class="text-amber-700">?</b> là bao nhiêu?' : (hoi==='r' ? 'Số dư ở ô <b class="text-amber-700">?</b> là bao nhiêu?' : 'Thương của phép chia <b>'+p.a+' : '+p.b+'</b> là bao nhiêu? (Ô <b class="text-amber-700">?</b> là chữ số cuối của thương.)');
    return {type:'num', _lv:lv, _pt:{a:p.a,b:p.b,an:an}, _hoi:hoi, q:chiaDoc3(p.a,p.b,{an:an})+'<div>'+loi+'</div>', ans:ans, sai:nhanSai(sai, ans), goiY:gy()};
  }, check:function(q){ var p=q._pt, c=chia(p.a,p.b); if(!kiemChia3(q) || c.r===0 || c.r>=p.b) return false;
    if(q._lv<=2 && String(c.q).indexOf('0')>=0) return false; if(q._lv===3 && String(c.q).indexOf('0')<0) return false;
    return q.ans===(q._hoi==='q0' ? c.q%10 : (q._hoi==='r' ? c.r : c.q)); }},

  /* D7 — Xếp vào hộp (Hoạt động 2 trang 1, Hoạt động 2 trang 2) */
  {name:'Xếp vào hộp', sec:'Hoạt động 2 — 354 quả táo, mỗi hộp 6 quả: 354 : 6 = 59 hộp; 460 cái bánh, mỗi hộp 4 cái: 115 hộp', mt:['MT3'], levels:3,
   muc:['354 quả táo, mỗi hộp 6 quả: xếp được mấy hộp.', '460 cái bánh, mỗi hộp 4 cái; số khác.', 'Có dư: cần ít nhất mấy hộp để đựng hết.'],
   make:function(lv){
    var vat=pick([['quả táo','hộp'],['cái bánh','hộp'],['quyển sách','thùng'],['cái kẹo','túi']]), p, c;
    if(lv<=1){ p=phepChia3({het:true, haiSo:true}); } else if(lv===2){ p=phepChia3({het:true}); } else { p=phepChia3({het:false}); }
    c=chia(p.a,p.b);
    if(lv<=2) return {type:'num', _lv:lv, _a:p.a, _b:p.b, q:'<div>Có <b>'+p.a+' '+vat[0]+'</b>, xếp đều vào các '+vat[1]+', mỗi '+vat[1]+' <b>'+p.b+' '+vat[0]+'</b>. Xếp được bao nhiêu '+vat[1]+'?</div>', ans:c.q, unit:vat[1], sai:nhanSai(nhieuChia(p.a,p.b).concat([[p.a-p.b,'cong-thay-nhan']]), c.q), goiY:gy()};
    return {type:'num', _lv:3, _a:p.a, _b:p.b, q:'<div>Có <b>'+p.a+' '+vat[0]+'</b>, xếp vào các '+vat[1]+', mỗi '+vat[1]+' <b>'+p.b+' '+vat[0]+'</b>. Cần ít nhất bao nhiêu '+vat[1]+' để đựng hết số '+vat[0]+' đó? ('+vat[0].split(' ').slice(1).join(' ').charAt(0).toUpperCase()+vat[0].split(' ').slice(1).join(' ').slice(1)+' còn lại cũng cần một '+vat[1]+'.)</div>', ans:c.q+1, unit:vat[1], sai:nhanSai([[c.q,'quen-du'],[c.r,'nham-thuong-du'],[c.q+2,'nham-bang']], c.q+1), goiY:gy({'quen-du':'Xếp được '+c.q+' '+vat[1]+' còn thừa '+c.r+' '+vat[0]+'. Số thừa cũng cần một '+vat[1]+' nữa: '+c.q+' + 1 = '+(c.q+1)+'.'})};
  }, check:function(q){ var c=chia(q._a,q._b); if(q._a<100 || c.q<10) return false; if(q._lv<=2) return c.r===0 && q.ans===c.q && (q._lv<=1 ? c.q<100 : true); return c.r>0 && q.ans===c.q+1; }},

  /* D8 — Giảm đi n lần (Hoạt động 3 trang 1) */
  {name:'Giảm đi n lần', sec:'Hoạt động 3 — Số?: 144 m giảm 3 lần = 48 m; 264 phút giảm 8 lần = 33 phút; 312 ml giảm 6 lần = 52 ml; 552 g giảm 4 lần = 138 g', mt:['MT3'], levels:3,
   muc:['144 m giảm 3 lần (số chia 2–4).', '264 phút giảm 8 lần; 312 ml giảm 6 lần (số chia 5–9).', 'Giảm rồi gấp: hai mũi tên.'],
   make:function(lv){
    var u=pick(['m','phút','ml','g','kg','cm']), p, v, k, ans;
    if(lv<=2){ p=phepChia3({het:true}); k=p.b; if(lv<=1 && k>4){ k=pick([2,3,4]); } if(lv===2 && k<5){ k=rnd(5,9); } v=k*rnd(Math.ceil(100/k),Math.floor(999/k)); ans=v/k;
      return {type:'num', _lv:lv, _o:[['giam',k]], _v:v, q:soDoGT([{v:v},{v:null}], [cuaChu('giam',k)])+'<div>Số đo <b>'+v+' '+u+'</b> giảm đi <b>'+k+' lần</b>. Số ở ô <b class="text-amber-700">?</b> là bao nhiêu '+u+'?</div>', ans:ans, unit:u, sai:nhanSai([[v-k,'nham-giam-bot'],[v*k>999 ? 0 : v*k,'nham-chieu'],[ans+1,'nham-bang'],[ans-1,'nham-bang']].concat(nhieuChia(v,k)), ans), goiY:gy()}; }
    var g=0, k2, mid, end; do{ g++; k=rnd(2,9); k2=rnd(2,5); v=k*rnd(Math.ceil(100/k),Math.floor(999/k)); mid=v/k; end=mid*k2; }while(g<500 && (end>999 || end===v));
    return {type:'num', _lv:3, _o:[['giam',k],['gap',k2]], _v:v, q:soDoGT([{v:v},{v:''},{v:null}], [cuaChu('giam',k), cuaChu('gap',k2)])+'<div>Số đo <b>'+v+' '+u+'</b> giảm đi <b>'+k+' lần</b> rồi gấp lên <b>'+k2+' lần</b>. Số ở ô <b class="text-amber-700">?</b> cuối cùng là bao nhiêu '+u+'? (Ô nét đứt ở giữa là kết quả của phép đầu.)</div>', ans:end, unit:u, sai:nhanSai([[mid,'thieu-buoc'],[v-k,'nham-giam-bot'],[mid+k2,'nham-chieu'],[end+10,'nham-bang']], end), goiY:gy({'thieu-buoc':'Hai phép nối nhau: ô giữa là kết quả của phép đầu ('+v+' : '+k+'), ô cuối là kết quả của phép sau.'})};
  }, check:function(q){ var o=q._o, r=q._v, i; for(i=0;i<o.length;i++){ r=ap(o[i][0], r, o[i][1]); if(!Number.isInteger(r) || r<1 || r>999) return false; }
    return q.ans===r && q._v>=100 && o.length===(q._lv<=1||q._lv===2 ? 1 : 2) && (q._lv<=1 ? o[0][1]<=4 : (q._lv===2 ? o[0][1]>=5 : true)); }},

  /* D9 — Rô-bốt và khối ru-bích (Luyện tập 3) */
  {name:'Rô-bốt và khối ru-bích', sec:'Luyện tập 3 — Rô-bốt nặng 600 g cân bằng với 4 khối ru-bích giống nhau: mỗi khối 600 : 4 = 150 g', mt:['MT3'], levels:3,
   muc:['Rô-bốt 600 g cân bằng với 4 khối: mỗi khối bao nhiêu gam.', '2–6 khối (tối đa 4 khối vẽ, hoặc nói bằng lời); tổng 200–900 g.', 'Hỏi 3 khối nặng bao nhiêu (hai bước).'],
   make:function(lv){
    var n, g, T, vat=pick([['rô-bốt','khối ru-bích'],['quả dưa','quả cam'],['hộp quà','gói kẹo']]), i, ph=[];
    if(lv<=1){ n=4; g=pick([150,120,110,200,125]); } else { n = lv===2 ? rnd(2,4) : rnd(3,4); g=rnd(105, Math.floor(999/n)); }
    T=n*g; for(i=0;i<n;i++) ph.push({g:g,k:'can',nhan:true,an:true});
    var tr=[{g:T,k:'goi'}];
    if(lv<=2) return {type:'num', _lv:lv, _n:n, _g:g, q:canDia(tr, ph)+'<div>Cân thăng bằng: '+vat[0]+' nặng <b>'+T+' g</b>, bên kia là <b>'+n+' '+vat[1]+'</b> giống nhau. Mỗi '+vat[1]+' nặng bao nhiêu gam?</div>', ans:g, unit:'g', sai:nhanSai([[T-n,'chon-sai-phep'],[g+10,'nham-bang'],[g-10,'nham-bang'],[T,'dao-vai']].concat(nhieuChia(T,n)), g), goiY:gy({'chon-sai-phep':n+' '+vat[1]+' giống nhau nặng '+T+' g: lấy '+T+' chia cho '+n+'.'})};
    var m=pick([2,3].filter(function(x){ return x<n; })), ans=g*m;
    return {type:'num', _lv:3, _n:n, _g:g, _m:m, q:canDia(tr, ph)+'<div>Cân thăng bằng: '+vat[0]+' nặng <b>'+T+' g</b>, bên kia là <b>'+n+' '+vat[1]+'</b> giống nhau. Hỏi <b>'+m+' '+vat[1]+'</b> như thế nặng bao nhiêu gam?</div>', ans:ans, unit:'g', sai:nhanSai([[g,'thieu-buoc'],[T-m,'chon-sai-phep'],[ans+10,'nham-bang'],[T,'dao-vai']], ans), goiY:gy({'thieu-buoc':'Bước 1: một '+vat[1]+' nặng '+T+' : '+n+' = '+g+'. Bước 2: nhân với '+m+'.'})};
  }, check:function(q){ var d=docCanNhieu(q.q)[0]; if(!d || d.nghieng!=='can') return false; var t=tongBen(d.items,'t'), p=tongBen(d.items,'p'), ch=d.items.filter(function(x){ return x.s==='p'; });
    return t===p && ch.length===q._n && ch.every(function(x){ return x.g===q._g; }) && t===q._n*q._g && t<=999 && t>=100 && q.ans===(q._lv===3 ? q._g*q._m : q._g); }},

  /* D10 — Phi tiêu và lạc đà (Luyện tập 4, 5) */
  {name:'Phi tiêu và lạc đà', sec:'Luyện tập 4, 5 — Mai 3 phi tiêu trúng vòng vàng được 375 điểm, Việt 1 phi tiêu: 125 điểm; trang trại 15 lạc đà một bướu, tất cả 225 bướu', mt:['MT3'], levels:3,
   muc:['Mai ném 3 phi tiêu trúng vòng vàng được 375 điểm; Việt 1 phi tiêu: chọn số điểm.', 'Số phi tiêu và điểm khác (2–4 phi tiêu).', 'Lạc đà: biết số con một bướu và tổng số bướu, tìm số con hai bướu (hai bước).'],
   make:function(lv){
    if(lv<=2){ var n = lv<=1 ? 3 : rnd(2,4), e = lv<=1 ? 125 : rnd(50, Math.floor(999/n)), T=n*e, ch=shuffle([e, e-10, e+10, e+5]).filter(function(x,i,a){ return a.indexOf(x)===i && x>0; }).slice(0,3); if(ch.indexOf(e)<0) ch[0]=e; ch=shuffle(ch); ch=ch.map(String);
      var dung=String(e), sai={}; ch.forEach(function(c,i){ if(c!==dung) sai[String(i)]='nham-bang'; });
      return {type:'mcq', cot:1, _lv:lv, _n:n, _e:e, _dung:dung, q:'<div>Mỗi phi tiêu trúng vòng vàng được số điểm như nhau. Bạn Mai ném <b>'+n+' phi tiêu</b> trúng vòng vàng, được <b>'+T+' điểm</b>. Bạn Việt ném <b>1 phi tiêu</b> trúng vòng vàng. Việt được bao nhiêu điểm?</div>', choices:ch, correct:ch.indexOf(dung), sai:sai, goiY:gy({'nham-bang':'Một phi tiêu được '+T+' : '+n+' điểm. Bé chia rồi so với các đáp án.'})}; }
    var mot=rnd(5,40), hai=rnd(20,300), tong=mot+2*hai; while(tong>999){ hai-=10; tong=mot+2*hai; }
    return {type:'num', _lv:3, _mot:mot, _hai:hai, q:'<div>Trang trại có <b>'+mot+' con lạc đà một bướu</b>, còn lại là lạc đà hai bướu. Đếm tất cả có <b>'+tong+' cái bướu</b>. Trang trại có bao nhiêu con lạc đà hai bướu?</div>', ans:hai, unit:'con', sai:nhanSai([[tong-mot,'thieu-buoc'],[Math.floor(tong/2),'thieu-buoc'],[hai+1,'nham-bang'],[hai-1,'nham-bang'],[tong-mot*2,'chon-sai-phep']], hai), goiY:gy({'thieu-buoc':'Bước 1: số bướu của lạc đà hai bướu là '+tong+' − '+mot+' = '+(tong-mot)+'. Bước 2: mỗi con có 2 bướu nên chia cho 2.'})};
  }, check:function(q){ if(q._lv<=2) return kiemMCQ(q) && q.choices.length===3 && +q._dung===q._e && q._n*q._e<=999 && (q._lv<=1 ? q._n===3 && q._e===125 : true);
    var tong=q._mot+2*q._hai; return tong<=999 && q.ans===q._hai && (tong-q._mot)%2===0; }},

  /* D11 — Phép chia đúng hay sai (Hoạt động 3 trang 2 + mở rộng) */
  {name:'Phép chia đúng hay sai', sec:'Hoạt động 3 — Đ, S?: 216 : 7 = 30 (dư 6) Đ; 808 : 8 = 11 S (đúng là 101); 423 : 6 = 7 (dư 3) S (đúng là 70 dư 3)', mt:['MT4'], levels:3,
   muc:['Đúng / Sai một phép chia đã làm sẵn (808 : 8 = 11).', 'An sai ở đâu: thiếu chữ số 0, quên hạ, số dư lớn hơn số chia.', 'Kết quả đúng là bao nhiêu.'],
   make:function(lv){
    var kinds=['thieu-so-0','quen-ha','du-lon-hon-chia'], kind=pick(kinds), p, c, xq, xr, th;
    if(kind==='thieu-so-0'){ p=phepChia3({so0:true}); c=chia(p.a,p.b); xq=+String(c.q).replace(/0/g,''); xr=c.r; }
    else if(kind==='quen-ha'){ p=phepChia3({khong0:true}); c=chia(p.a,p.b); th=String(c.q); xq=+th.slice(0,-1); xr=buocChia3(p.a,p.b).steps[buocChia3(p.a,p.b).steps.length-2].r; }
    else { p=phepChia3({het:false, khong0:true, cuoiKhac0:true}); c=chia(p.a,p.b); xq=c.q-1; xr=c.r+p.b; }
    var tenLoi={'thieu-so-0':'Thương thiếu chữ số 0', 'quen-ha':'Quên hạ chữ số hàng đơn vị', 'du-lon-hon-chia':'Số dư lớn hơn hoặc bằng số chia'};
    if(lv<=1){ var dung=Math.random()<0.5, sq = dung ? c.q : xq, sr = dung ? c.r : xr;
      return {type:'mcq', figFn:dsBtn37, _lv:1, _a:p.a, _b:p.b, _sq:sq, _sr:sr, _dung:(dung?'Đ':'S'), q:'<div class="text-xl font-extrabold text-orange-700 my-2">'+p.a+' : '+p.b+' = '+sq+(sr ? ' (dư '+sr+')' : '')+'.</div><div class="text-base text-slate-500">Đúng (Đ) hay sai (S)?</div>', choices:['Đ','S'], correct:(dung?0:1), sai:(dung?{}:{'0':kind}), goiY:gy()}; }
    if(lv===2){ var ds=shuffle(kinds.slice()), ch=ds.map(function(k){ return tenLoi[k]; }), dung2=tenLoi[kind], sai2={}; ds.forEach(function(k,i){ if(k!==kind) sai2[String(i)]=k; });
      return {type:'mcq', cot:1, _lv:2, _a:p.a, _b:p.b, _sq:xq, _sr:xr, _kind:kind, _dung:dung2, q:nguoi('boy','Bạn An')+'<div>Bạn An viết: «'+p.a+' : '+p.b+' = '+xq+(xr ? ' (dư '+xr+')' : '')+'». An làm sai rồi! An sai ở đâu?</div>', choices:ch, correct:ch.indexOf(dung2), sai:sai2, goiY:gy()}; }
    return {type:'num', _lv:3, _a:p.a, _b:p.b, _sq:xq, _sr:xr, _kind:kind, q:nguoi('boy','Bạn An')+'<div>Bạn An viết: «'+p.a+' : '+p.b+' = '+xq+(xr ? ' (dư '+xr+')' : '')+'». An làm sai rồi! Thương đúng là bao nhiêu?</div>', ans:c.q, sai:nhanSai([[xq,kind],[c.r,'nham-thuong-du'],[c.q+1,'nham-bang'],[c.q-1,'nham-bang']], c.q), goiY:gy()};
   }, check:function(q){ var c=chia(q._a,q._b); if(q._a<100 || c.q<10) return false;
    if(q._lv<=1){ var ok=(q._sq===c.q && q._sr===c.r); return q.choices.join()==='Đ,S' && (q._dung==='Đ')===ok && q.correct===(ok?0:1) && (ok || q._sq!==c.q || q._sr!==c.r); }
    if(q._sq===c.q && q._sr===c.r) return false;
    if(q._kind==='du-lon-hon-chia' && !(q._sr>=q._b)) return false;
    if(q._kind==='thieu-so-0' && String(c.q).indexOf('0')<0) return false;
    if(q._lv===2) return kiemMCQ(q) && q.choices.length===3;
    return q.ans===c.q; }}
 ]
};
