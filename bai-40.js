/* bai-40.js — Bài 40: Luyện tập chung (cuối Chủ đề 6). BÀI MỚI, Engine v2 — LUYỆN THÔNG MINH.
   Theo bảng phân tích sư phạm đã duyệt (phan-tich-su-pham/bai-40.md, PR #31): 4 MỤC TIÊU (muctieu) × 9 DẠNG (topics), mỗi dạng 3 mức (Thông tư 27).
   Ôn nhân, chia số có ba chữ số (nhanDoc3, chiaDoc3 chép từ bài 36, 37), gấp – giảm – gấp mấy lần (soDoGT chép từ bài 37), biểu thức (bộ sinh chép từ bài 38),
   bài toán hai bước và tính thuận tiện (cách ghép thừa số). Mọi hàm chép nguyên từ bài 36–38 (mỗi bài một tệp, không dùng chung); check() tính lại mọi giá trị.
   QUY TẮC: nối chuỗi, KHÔNG backtick và KHÔNG template literal. */

/* ---- Tiện ích chung ---- */
function nhanSai(ds, dung){ var o={}; ds.forEach(function(p){ var v=p[0]; if(Number.isInteger(v) && v>0 && v!==dung && !(String(v) in o)) o[String(v)]=p[1]; }); return o; }
function kiemMCQ(q){ return q.choices[q.correct]===q._dung && new Set(q.choices).size===q.choices.length; }
function svgX(w, h, px){ return svgHinh(w, h, px).replace('<svg ', '<svg class="text-slate-700" '); }
function khungHinh(s){ return '<div class="flex justify-center my-2">'+s+'</svg></div>'; }
function nguoi(ten, alt){ return '<div class="flex justify-center mb-1">'+anh(ten, 72, alt)+'</div>'; }
function kyHieu(nhan, bt){ return '<div class="text-slate-500 mb-1">'+nhan+'</div><div class="text-3xl font-extrabold text-orange-600">'+bt+'</div>'; }
var TRU='−', NHAN='×', CHIA=':';
var GOI={'nham-bang':'Bé tính lại từng bước cho đúng nhé.', 'cong-thay-nhan':'Nhiều phần bằng nhau thì nhân, không cộng.', 'thieu-buoc':'Bài này có hai bước. Bé làm đủ các bước nhé!', 'dao-vai':'Bé xem lại câu hỏi hỏi gì.', 'chon-sai-phep':'Bé đọc kỹ: gấp lên là nhân, giảm đi là chia, hơn là trừ.',
  'quen-nho':'Nhân ở một hàng được số có hai chữ số thì viết chữ số đơn vị, NHỚ chữ số chục sang hàng bên trái.', 'nho-sai-hang':'Số nhớ cộng vào hàng liền bên trái.', 'quen-ha':'Chia xong một hàng, bé HẠ chữ số tiếp theo xuống rồi chia tiếp.', 'thieu-so-0':'Hạ chữ số xuống mà không chia được thì viết 0 ở thương rồi hạ tiếp.',
  'du-lon-hon-chia':'Số dư luôn bé hơn số chia.', 'nham-thuong-du':'Thương là kết quả phép chia, số dư là phần còn lại.', 'nham-chieu':'Giảm đi là chia, gấp lên là nhân.', 'nham-giam-bot':'Giảm đi n lần là chia cho n. Bớt n đơn vị mới là trừ n.',
  'chia-nguoc':'Muốn biết số lớn gấp mấy lần số bé, bé lấy SỐ LỚN chia cho SỐ BÉ.', 'nham-hon-gap':'"Nhiều hơn bao nhiêu" thì trừ; "gấp mấy lần" thì chia.', 'tinh-trai-sang-phai':'Có nhân, chia thì làm NHÂN, CHIA trước, rồi mới cộng, trừ.', 'bo-ngoac':'Có dấu ngoặc thì tính TRONG NGOẶC trước.', 'nhan-chia-sau':'Nhân, chia trước; cộng, trừ sau.', 'nham-gia-tri':'Giá trị của biểu thức là kết quả sau khi tính hết mọi phép tính.', 'nham-hang':'Bé nhẩm theo chục, theo trăm rồi viết đủ chữ số 0.'};
function gy(extra){ var o={}, k; for(k in GOI) o[k]=GOI[k]; for(k in (extra||{})) o[k]=extra[k]; return o; }
function buocNhan(a, b){
  var a2=Math.floor(a/100), a1=Math.floor(a/10)%10, a0=a%10, p0=a0*b, c0=Math.floor(p0/10), p1=a1*b+c0, c1=Math.floor(p1/10), p2=a2*b+c1, tich=a*b;
  return {a2:a2, a1:a1, a0:a0, c0:c0, c1:c1, d0:p0%10, d1:p1%10, d2:p2, tich:tich, soNho:(c0>0?1:0)+(c1>0?1:0)};
}
function nhanDoc3(a, b, tuy){
  tuy=tuy||{}; var B=buocNhan(a,b), X=[44,80,116], s=svgX(150,182,150), i;
  function hang(x, y, ch, id){
    var r='';
    if(ch==='?') r+='<rect x="'+(x-17)+'" y="'+(y-27)+'" width="34" height="37" rx="7" fill="none" stroke="'+HM.hoi+'" stroke-width="2.5" stroke-dasharray="5 3"/>';
    return r+'<text data-pt="'+id+'" x="'+x+'" y="'+y+'" text-anchor="middle" font-size="34" '+HFONT+' fill="'+(ch==='?'?HM.hoi:'currentColor')+'">'+ch+'</text>'; }
  if(tuy.nho){ if(B.c0>0) s+='<text data-pt="n1" x="'+(X[1]+13)+'" y="22" text-anchor="middle" font-size="16" '+HFONT+' fill="currentColor" opacity=".75">'+B.c0+'</text>'; if(B.c1>0) s+='<text data-pt="n2" x="'+(X[0]+13)+'" y="22" text-anchor="middle" font-size="16" '+HFONT+' fill="currentColor" opacity=".75">'+B.c1+'</text>'; }
  s+=hang(X[0], 64, String(B.a2), 'a2')+hang(X[1], 64, String(B.a1), 'a1')+hang(X[2], 64, String(B.a0), 'a0');
  s+='<text x="14" y="114" text-anchor="middle" font-size="28" '+HFONT+' fill="currentColor">&#215;</text>'+hang(X[2], 114, String(b), 'b0');
  s+='<line x1="26" y1="128" x2="136" y2="128" stroke="currentColor" stroke-width="3" stroke-linecap="round"/>';
  if(tuy.an==='tich'){ s+='<rect x="'+(X[0]-20)+'" y="138" width="'+(X[2]-X[0]+40)+'" height="38" rx="8" fill="none" stroke="'+HM.hoi+'" stroke-width="2.5" stroke-dasharray="5 3"/><text data-pt="p" x="'+X[1]+'" y="168" text-anchor="middle" font-size="34" '+HFONT+' fill="'+HM.hoi+'">?</text>'; }
  else { var d=String(tuy.bieuDien!==undefined ? tuy.bieuDien : B.tich), L=d.length; for(i=0;i<L;i++){ var vt=3-L+i, id='p'+(L-1-i), an=(tuy.an==='tram'&&vt===0)||(tuy.an==='chuc'&&vt===1)||(tuy.an==='donvi'&&vt===2); s+=hang(X[vt], 168, an ? '?' : d.charAt(i), id); } }
  return khungHinh(s);
}
function docPT(s){ var o={}, re=/data-pt="(\w+)"[^>]*>([^<]*)<\/text>/g, m; while((m=re.exec(String(s)))) o[m[1]]=m[2]; return o; }
/* kiểm hình nhanDoc3 đúng với a, b và cách che; bieuDien = tích hiện trong hình (nếu khác tích thật) */
function kiemNhan3(q){
  var p=q._pt, B=buocNhan(p.a,p.b), d=docPT(q.q), want={a2:String(B.a2), a1:String(B.a1), a0:String(B.a0), b0:String(p.b)}, i;
  if(p.nho){ if(B.c0>0) want.n1=String(B.c0); if(B.c1>0) want.n2=String(B.c1); }
  if(p.an==='tich') want.p='?';
  else { var t=String(p.bieuDien!==undefined ? p.bieuDien : B.tich), L=t.length; for(i=0;i<L;i++){ var vt=3-L+i, an=(p.an==='tram'&&vt===0)||(p.an==='chuc'&&vt===1)||(p.an==='donvi'&&vt===2); want['p'+(L-1-i)] = an ? '?' : t.charAt(i); } }
  var ids=Object.keys(want);
  return p.a>=100 && p.a<=999 && p.b>=2 && p.b<=9 && B.tich<=999 && ids.length===Object.keys(d).length && ids.every(function(k){ return d[k]===want[k]; });
}
/* sinh phép nhân ba chữ số × một chữ số với số lần nhớ cho trước (0, 1, 2) và tích <= 999 */
function phepNhan(soNho, lo){
  lo=lo||{}; for(var g=0;g<4000;g++){ var b=rnd(2,9), a=rnd(100, Math.floor(999/b)), B=buocNhan(a,b);
    if(B.soNho!==soNho) continue; if(lo.coSo0 && B.a1!==0) continue; if(lo.khongSo0 && (B.a1===0 || B.a0===0)) continue; if(lo.tramLon && B.a2<2) continue;
    return {a:a, b:b, tich:B.tich}; }
  return {a:111, b:2, tich:222};
}
function chuSoTich(t, vt){ var d=('00'+t).slice(-3); return +d.charAt(vt); }
function tri(r1,r2,r3, v1,v2,v3, hide){
  function cell(v,on){ return '<td data-o="'+(on?'?':v)+'" class="px-5 py-1 text-center text-lg '+(on?'bg-amber-100 text-amber-700 font-extrabold':'font-bold text-slate-700')+'" style="border:1px solid #fcd34d">'+(on?'?':v)+'</td>'; }
  function lab(t){ return '<td class="px-3 py-1 font-bold text-slate-600 bg-amber-50" style="border:1px solid #fcd34d">'+t+'</td>'; }
  return '<table class="mx-auto border-collapse my-2" style="border:2px solid #fcd34d;border-radius:8px;overflow:hidden">'
   +'<tr>'+lab(r1)+cell(v1,hide===0)+'</tr><tr>'+lab(r2)+cell(v2,hide===1)+'</tr><tr>'+lab(r3)+cell(v3,hide===2)+'</tr></table>';
}
function docTri(s){ var o=[], re=/data-o="([^"]*)"/g, m; while((m=re.exec(String(s)))) o.push(m[1]); return o; }
function ketQuaSai(a, b, kieu){ var B=buocNhan(a,b);
  if(kieu==='quen-nho') return Number(''+(B.a2*b)+String(B.a1*b%10)+String(B.d0)) ;
  return B.tich + (B.c0 ? 90*B.c0 : 0) + (B.c1 ? 900*B.c1 : 0); }
function chia(a, b){ var q=Math.floor(a/b); return {q:q, r:a-q*b}; }
function duChu(c){ return c.q+(c.r ? ' (dư '+c.r+')' : ''); }
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
function nhieuChia(a, b){ var c=chia(a,b), B=buocChia3(a,b), th=String(c.q), ds=[];
  ds.push([+th.replace(/0/g,''),'thieu-so-0']); ds.push([+th.slice(0,-1),'quen-ha']); ds.push([c.q+1,'nham-bang']); ds.push([c.q-1,'nham-bang']); if(c.r) ds.push([c.r,'nham-thuong-du']); return ds; }
function theTinh(ds){
  var s='<div class="flex flex-wrap justify-center gap-2 my-2">';
  ds.forEach(function(t){ s+='<span class="inline-block px-3 py-2 rounded-xl border-2 border-amber-300 text-slate-700 font-extrabold text-xl whitespace-nowrap">'+t+'</span>'; });
  return s+'</div>';
}
function docThe(s){ var o=[], re=/<span class="inline-block px-3 py-2[^>]*>([^<]*)<\/span>/g, m; while((m=re.exec(String(s)))) o.push(m[1]); return o; }
function bieuThuc(t){ return '<div class="text-3xl font-extrabold text-orange-600 my-2">'+t+'</div>'; }
function tinhBT2(t){ var s=String(t), m; while((m=/\(([^()]+)\)/.exec(s))) s=s.replace(m[0], String(tinhBT(m[1]))); return tinhBT(s); }
function tinhTSP(t){ var tk=String(t).replace(/[()]/g,'').replace(/−/g,'-').trim().split(/\s+/), r=+tk[0], i; for(i=1;i<tk.length;i+=2){ var o=tk[i], v=+tk[i+1]; r = o==='+' ? r+v : (o==='-' ? r-v : (o==='×' ? r*v : r/v)); } return r; }
function tinhBoNgoac(t){ return tinhBT(String(t).replace(/[()]/g,'')); }
function okSo(v){ return Number.isInteger(v) && v>=0 && v<=999; }
function laBT(t){ return /^\d+( [+−×:] \d+)+$/.test(t); }
function soPhep(t){ return (String(t).match(/[+−×:]/g)||[]).length; }
/* Mọi bước của biểu thức (không ngoặc, theo đúng thứ tự) đều là số nguyên không âm <= 999 */
function okBuoc(t){ var s=String(t), m; while((m=/\(([^()]+)\)/.exec(s))){ var v=tinhBT(m[1]); if(!okSo(v) || !okBuocPhang(m[1])) return false; s=s.replace(m[0], String(v)); } return okBuocPhang(s) && okSo(tinhBT(s)); }
function okBuocPhang(t){ var tk=String(t).replace(/−/g,'-').trim().split(/\s+/), vals=[+tk[0]], ops=[], i;
  for(i=1;i<tk.length;i+=2){ var o=tk[i], v=+tk[i+1]; if(o==='×'){ vals[vals.length-1]*=v; } else if(o===':'){ if(v===0 || vals[vals.length-1]%v!==0) return false; vals[vals.length-1]/=v; } else { ops.push(o); vals.push(v); } if(!okSo(vals[vals.length-1])) return false; }
  var r=vals[0]; for(i=0;i<ops.length;i++){ r = ops[i]==='+' ? r+vals[i+1] : r-vals[i+1]; if(!okSo(r)) return false; } return true; }
function bt(a, op, b){ return a+' '+op+' '+b; }
function btUuTien(){
  for(var g=0;g<500;g++){ var kieu=pick(['+×','−×','+:','−:','×+','×−',':+',':−']), a, b, c, t;
    if(kieu==='+×'){ b=rnd(2,9); c=rnd(2,9); a=rnd(5,60); t=a+' + '+b+' × '+c; }
    else if(kieu==='−×'){ b=rnd(2,9); c=rnd(2,9); a=rnd(b*c+1, b*c+60); t=a+' − '+b+' × '+c; }
    else if(kieu==='+:'){ c=rnd(2,9); b=c*rnd(2,9); a=rnd(5,60); t=a+' + '+b+' : '+c; }
    else if(kieu==='−:'){ c=rnd(2,9); b=c*rnd(2,9); a=rnd(b/c+1, b/c+60); t=a+' − '+b+' : '+c; }
    else if(kieu==='×+'){ a=rnd(2,9); b=rnd(2,9); c=rnd(5,60); t=a+' × '+b+' + '+c; }
    else if(kieu==='×−'){ a=rnd(2,9); b=rnd(2,9); c=rnd(1,a*b-1); t=a+' × '+b+' − '+c; }
    else if(kieu===':+'){ b=rnd(2,9); a=b*rnd(2,9); c=rnd(5,60); t=a+' : '+b+' + '+c; }
    else { b=rnd(2,9); a=b*rnd(2,9); c=rnd(1,a/b-1); t=a+' : '+b+' − '+c; }
    if(okBuoc(t) && tinhTSP(t)!==tinhBT2(t)) return t; }
  return '24 + 5 × 6';
}
/* chỉ cộng trừ hoặc chỉ nhân chia: hai phép, từ trái sang phải */
function btTrai(lv){
  for(var g=0;g<500;g++){ var t, kieu=pick(lv<=1 ? ['+−','−+','++','−−'] : ['+−','−+','++','−−','×:',':×']), a, b, c;
    var M = lv<=1 ? 60 : (lv===2 ? 100 : 500);
    if(kieu==='+−'){ a=rnd(10,M); b=rnd(5,M); c=rnd(5,a+b); t=a+' + '+b+' − '+c; }
    else if(kieu==='−+'){ a=rnd(20,M); b=rnd(5,a); c=rnd(5,M); t=a+' − '+b+' + '+c; }
    else if(kieu==='++'){ a=rnd(10,M); b=rnd(5,M); c=rnd(5,M); t=a+' + '+b+' + '+c; }
    else if(kieu==='−−'){ a=rnd(30,M); b=rnd(5,a); c=rnd(1,a-b); t=a+' − '+b+' − '+c; }
    else if(kieu==='×:'){ a=rnd(2,9); b=rnd(2,9); c=pick([2,3,4,5,6,7,8,9].filter(function(x){ return (a*b)%x===0; })); t=a+' × '+b+' : '+c; }
    else { b=rnd(2,9); a=b*rnd(2,9); c=rnd(2,9); t=a+' : '+b+' × '+c; }
    if(okBuoc(t)) return t; }
  return '27 − 7 + 30';
}
/* có dấu ngoặc: a × (b + c), a : (b + c), (a + b) : c, a − (b + c), a + (b − c), (a − b) × c */
function btNgoac(){
  for(var g=0;g<500;g++){ var kieu=pick(['×(+','×(−',':(+',':(−','(+):','(−):','−(+','−(−','+(−']), a, b, c, t;
    if(kieu==='×(+'){ a=rnd(2,9); b=rnd(2,9); c=rnd(1,9); t=a+' × ('+b+' + '+c+')'; }
    else if(kieu==='×(−'){ a=rnd(2,9); b=rnd(5,15); c=rnd(1,b-1); t=a+' × ('+b+' − '+c+')'; }
    else if(kieu===':(+'){ b=rnd(2,7); c=rnd(1,7); a=(b+c)*rnd(2,9); t=a+' : ('+b+' + '+c+')'; }
    else if(kieu===':(−'){ b=rnd(10,20); c=rnd(1,b-2); a=(b-c)*rnd(2,9); t=a+' : ('+b+' − '+c+')'; }
    else if(kieu==='(+):'){ c=rnd(2,9); var s1=c*rnd(2,9); a=rnd(1,s1-1); b=s1-a; t='('+a+' + '+b+') : '+c; }
    else if(kieu==='(−):'){ c=rnd(2,9); var s2=c*rnd(2,9); b=rnd(1,20); a=s2+b; t='('+a+' − '+b+') : '+c; }
    else if(kieu==='−(+'){ b=rnd(5,30); c=rnd(1,9); a=rnd(b+c, b+c+40); t=a+' − ('+b+' + '+c+')'; }
    else if(kieu==='−(−'){ b=rnd(10,50); c=rnd(1,b-1); a=rnd(b, b+40); t=a+' − ('+b+' − '+c+')'; }
    else { b=rnd(10,50); c=rnd(1,b-1); a=rnd(5,40); t=a+' + ('+b+' − '+c+')'; }
    if(okBuoc(t) && okSo(tinhBoNgoac(t)) && tinhBoNgoac(t)!==tinhBT2(t)) return t; }
  return '45 : (5 + 4)';
}
/* n biểu thức có giá trị đôi một khác nhau, lấy từ bộ sinh gen */
function nhieuBT(gen, n){ var ds=[], g; for(g=0;g<300 && ds.length<n;g++){ var t=gen(); if(ds.every(function(x){ return tinhBT2(x)!==tinhBT2(t) && x!==t; })) ds.push(t); } return ds; }
function nhieuGiaTri(t){ var v=tinhBT2(t); return [[tinhTSP(t),'tinh-trai-sang-phai'],[tinhBoNgoac(t),'bo-ngoac'],[v+1,'nham-bang'],[v-1,'nham-bang'],[v+10,'nham-bang']]; }
function okEq(s){ var re=/(\d+) ([+−×:]) (\d+) = (\d+)/g, m, n=0, ok=true; while((m=re.exec(s))){ n++; if(tinhBT(m[1]+' '+m[2]+' '+m[3])!==+m[4]) ok=false; } return ok && n>=1; }

var BAI = {
 n: 40,
 title: 'Luyện Tập Chung',
 sub: 'Luyện thông minh: câu hỏi tự đổi theo bé — làm hết lượt để xem ngọn lửa!',
 goal: 10, soCau: 18, soCauToiDa: 24,
 loi: {'quen-nho':'Quên nhớ', 'nho-sai-hang':'Nhớ nhầm hàng', 'quen-ha':'Quên hạ chữ số', 'thieu-so-0':'Thương thiếu chữ số 0', 'du-lon-hon-chia':'Số dư lớn hơn hoặc bằng số chia', 'nham-thuong-du':'Nhầm thương với số dư', 'nham-chieu':'Nhầm chiều phép tính (gấp thay giảm)', 'nham-giam-bot':'Nhầm "giảm n lần" với "bớt n đơn vị"',
       'chia-nguoc':'Lấy số bé chia số lớn', 'nham-hon-gap':'Nhầm "hơn bao nhiêu" với "gấp mấy lần"', 'tinh-trai-sang-phai':'Làm từ trái sang phải khi có nhân, chia', 'bo-ngoac':'Bỏ dấu ngoặc', 'nhan-chia-sau':'Làm nhân, chia sau cộng, trừ', 'nham-gia-tri':'Nhầm giá trị với một số trong biểu thức', 'nham-hang':'Nhẩm sai hàng'},
 muctieu: [
  {id:'MT1', ten:'Nhân, chia số có ba chữ số', muc:['122 × 4 (không nhớ); 645 : 3 (ô ? một chữ số); chọn kết quả đúng.', '327 × 3 (có nhớ); 715 : 5 (có bước dư); chọn thương đúng.', 'Nhớ hai lần; thương có chữ số 0; số dư của phép chia.']},
  {id:'MT2', ten:'Gấp, giảm, gấp mấy lần', muc:['12 giảm 3 lần (một mũi tên); 36 và 9 gấp mấy lần.', 'Giảm rồi gấp (hai mũi tên); 40 và 8, 45 và 5.', 'Biết ô cuối, hỏi ô giữa; cây cau 2 m và 6 m; số tròn chục.']},
  {id:'MT3', ten:'Biểu thức', muc:['80 + 60 × 2; (150 + 30) : 6 (có mẫu).', 'Cánh hoa: biểu thức nào bằng 305.', '360 − (335 − 30); 132 × (12 − 9).']},
  {id:'MT4', ten:'Bài toán hai bước, tính thuận tiện', muc:['Bê 120 kg, bò gấp 3: bò nặng bao nhiêu; chó gấp 2 lần ngỗng; 8 × 5 × 2.', 'Cả hai nặng bao nhiêu; lợn 6 × 2 × 5; 9 × 2 × 5.', 'Bò nặng hơn bê bao nhiêu; cách ghép thuận tiện; chọn cách ghép đúng.']}
 ],
 topics: [
  /* D1 — Đặt tính nhân (Luyện tập 1 trang 1) */
  {name:'Đặt tính nhân', sec:'Luyện tập 1 — Đặt tính rồi tính: 122 × 4 = 488; 327 × 3 = 981', mt:['MT1'], levels:3,
   muc:['Không nhớ: ô ? là một chữ số của tích.', 'Nhớ một lần: điền cả tích.', 'Nhớ hai lần: điền cả tích.'],
   make:function(lv){
    var p, an, ans, B, sai;
    if(lv<=1){ p=phepNhan(0,{khongSo0:true}); an=pick(['tram','chuc','donvi']); } else { p=phepNhan(lv===2 ? 1 : 2); an='tich'; }
    B=buocNhan(p.a,p.b);
    if(an==='tich'){ ans=B.tich; sai=[[ketQuaSai(p.a,p.b,'quen-nho'),'quen-nho'],[ketQuaSai(p.a,p.b,'nho-sai-hang')>999 ? 0 : ketQuaSai(p.a,p.b,'nho-sai-hang'),'nho-sai-hang'],[p.a+p.b,'cong-thay-nhan'],[ans+10,'nham-bang'],[ans-10,'nham-bang']]; }
    else { var vt = an==='tram' ? 0 : (an==='chuc' ? 1 : 2), tsA = an==='tram' ? B.a2 : (an==='chuc' ? B.a1 : B.a0); ans=chuSoTich(B.tich, vt); sai=[[tsA,'dao-vai'],[tsA+p.b,'cong-thay-nhan'],[ans+1,'nham-bang'],[ans-1,'nham-bang']]; }
    return {type:'num', _lv:lv, _pt:{a:p.a,b:p.b,an:an}, q:nhanDoc3(p.a, p.b, {an:an})+'<div>'+(an==='tich' ? 'Tích ở ô <b class="text-amber-700">?</b> là bao nhiêu?' : 'Chữ số ở ô <b class="text-amber-700">?</b> là bao nhiêu?')+'</div>', ans:ans, sai:nhanSai(sai, ans), goiY:gy()};
  }, check:function(q){ var p=q._pt, B=buocNhan(p.a,p.b); if(!kiemNhan3(q)) return false; if(B.soNho!==(q._lv<=1 ? 0 : (q._lv===2 ? 1 : 2))) return false;
    var e = p.an==='tich' ? B.tich : chuSoTich(B.tich, p.an==='tram' ? 0 : (p.an==='chuc' ? 1 : 2)); return q.ans===e; }},

  /* D2 — Đặt tính chia (Luyện tập 1 trang 1) */
  {name:'Đặt tính chia', sec:'Luyện tập 1 — Đặt tính rồi tính: 715 : 5 = 143; 645 : 3 = 215', mt:['MT1'], levels:3,
   muc:['Chia hết: ô ? là chữ số đầu của thương.', 'Chia hết, có bước dư giữa chừng (715 : 5): điền cả thương.', 'Thương có chữ số 0 hoặc phép chia có dư: thương hoặc số dư.'],
   make:function(lv){
    var p, c, an, ans, hoi, sai;
    if(lv<=1){ p=phepChia3({het:true, khong0:true}); c=chia(p.a,p.b); an='q'+(String(c.q).length-1); hoi='qd'; ans=+String(c.q).charAt(0); sai=[[+String(c.q).charAt(1),'dao-vai'],[ans+1,'nham-bang'],[ans-1,'nham-bang']]; }
    else if(lv===2){ p=phepChia3({het:true, khong0:true}); c=chia(p.a,p.b); an='q0'; hoi='q'; ans=c.q; sai=nhieuChia(p.a,p.b); }
    else { if(Math.random()<0.5){ p=phepChia3({het:true, so0:true}); c=chia(p.a,p.b); an='q0'; hoi='q'; ans=c.q; sai=nhieuChia(p.a,p.b); } else { p=phepChia3({het:false, cuoiKhac0:true}); c=chia(p.a,p.b); an='r'; hoi='r'; ans=c.r; sai=[[c.q,'nham-thuong-du'],[c.r+p.b,'du-lon-hon-chia'],[c.r+1,'tru-sai-buoc']]; } }
    var loi = hoi==='qd' ? 'Chữ số ở ô <b class="text-amber-700">?</b> là bao nhiêu?' : (hoi==='r' ? 'Số dư ở ô <b class="text-amber-700">?</b> là bao nhiêu?' : 'Thương của phép chia <b>'+p.a+' : '+p.b+'</b> là bao nhiêu? (Ô <b class="text-amber-700">?</b> là chữ số cuối của thương.)');
    return {type:'num', _lv:lv, _pt:{a:p.a,b:p.b,an:an}, _hoi:hoi, q:chiaDoc3(p.a,p.b,{an:an})+'<div>'+loi+'</div>', ans:ans, sai:nhanSai(sai, ans), goiY:gy()};
  }, check:function(q){ var p=q._pt, c=chia(p.a,p.b); if(!kiemChia3(q) || c.q<10) return false;
    if(q._lv<=2 && (c.r!==0 || String(c.q).indexOf('0')>=0)) return false;
    return q.ans===(q._hoi==='qd' ? +String(c.q).charAt(0) : (q._hoi==='r' ? c.r : c.q)); }},

  /* D3 — Chọn kết quả đúng (không có trong SGK) */
  {name:'Chọn kết quả đúng', sec:'Ôn tập — Chọn kết quả đúng của phép nhân, phép chia trong bốn số', mt:['MT1'], levels:3,
   muc:['Tích của phép nhân có nhớ (122 × 4, 327 × 3).', 'Thương của phép chia hết (645 : 3).', 'Số dư của phép chia có dư.'],
   make:function(lv){
    var p, T, ch, lb, sai={}, i, bt;
    if(lv<=1){ p=phepNhan(1); T=p.tich; bt=p.a+' × '+p.b; ch=[[T,''],[ketQuaSai(p.a,p.b,'quen-nho'),'quen-nho'],[T+10,'nham-bang'],[+String(T).split('').reverse().join(''),'nham-bang'],[T-100,'nham-bang']]; }
    else if(lv===2){ p=phepChia3({het:true}); T=p.q; bt=p.a+' : '+p.b; var th=String(T); ch=[[T,''],[+th.replace(/0/g,''),'thieu-so-0'],[T+1,'nham-bang'],[T*10>999 ? T-10 : T*10,'nham-hang'],[+th.split('').reverse().join(''),'nham-bang']]; }
    else { p=phepChia3({het:false}); T=p.r; bt=p.a+' : '+p.b; ch=[[T,''],[T+p.b,'du-lon-hon-chia'],[p.q%10,'nham-thuong-du'],[T+1,'nham-bang'],[T-1,'nham-bang']]; }
    var seen=[T], opts=[[T,'']]; for(i=1;i<ch.length && opts.length<4;i++){ var v=ch[i][0]; if(Number.isInteger(v) && v>0 && v<=999 && seen.indexOf(v)<0){ seen.push(v); opts.push(ch[i]); } }
    opts=shuffle(opts); var cs=opts.map(function(o){ return String(o[0]); }); opts.forEach(function(o,k){ if(o[0]!==T) sai[String(k)]=o[1]||'nham-bang'; });
    return {type:'mcq', cot:2, _lv:lv, _a:p.a, _b:p.b, _T:T, _dung:String(T), q:'<div class="text-3xl font-extrabold text-orange-600 my-2">'+bt+'</div><div>'+(lv<=1 ? 'Tích' : (lv===2 ? 'Thương' : 'Số dư'))+' của phép tính này là số nào?</div>', choices:cs, correct:cs.indexOf(String(T)), sai:sai, goiY:gy()};
  }, check:function(q){ var e = q._lv<=1 ? q._a*q._b : (q._lv===2 ? q._a/q._b : q._a%q._b); if(q._lv===2 && q._a%q._b!==0) return false; if(q._lv===3 && q._a%q._b===0) return false; return kiemMCQ(q) && q.choices.length>=3 && +q._dung===e && e===q._T && e<=999; }},

  /* D4 — Giảm rồi gấp (Luyện tập 2a trang 1) */
  {name:'Giảm rồi gấp', sec:'Luyện tập 2a — Số đã cho 12, giảm 3 lần được 4, gấp 4 lần được 48; 15 → 5 → 60; 18 → 6 → 72', mt:['MT2'], levels:3,
   muc:['Một mũi tên: giảm k lần.', 'Hai mũi tên: giảm 3 lần rồi gấp 4 lần.', 'Hai mũi tên, biết ô cuối: hỏi ô giữa.'],
   make:function(lv){
    var k=rnd(2,5), m=rnd(2,9), v=k*m, k2=rnd(2,5), end=m*k2;
    if(lv<=1) return {type:'num', _lv:1, _o:[['giam',k]], _v:v, q:soDoGT([{v:v},{v:null}], [cuaChu('giam',k)])+'<div>Số <b>'+v+'</b> giảm đi <b>'+k+' lần</b>. Số ở ô <b class="text-amber-700">?</b> là bao nhiêu?</div>', ans:m, sai:nhanSai([[v-k,'nham-giam-bot'],[v*k,'nham-chieu'],[m+1,'nham-bang'],[m-1,'nham-bang']], m), goiY:gy()};
    if(lv===2) return {type:'num', _lv:2, _o:[['giam',k],['gap',k2]], _v:v, q:soDoGT([{v:v},{v:''},{v:null}], [cuaChu('giam',k), cuaChu('gap',k2)])+'<div>Số <b>'+v+'</b> giảm đi <b>'+k+' lần</b> rồi gấp lên <b>'+k2+' lần</b>. Số ở ô <b class="text-amber-700">?</b> cuối cùng là bao nhiêu? (Ô nét đứt ở giữa là kết quả của phép đầu.)</div>', ans:end, sai:nhanSai([[m,'thieu-buoc'],[v-k,'nham-giam-bot'],[m+k2,'nham-chieu'],[end+10,'nham-bang']], end), goiY:gy({'thieu-buoc':'Hai phép nối nhau: ô giữa là '+v+' : '+k+', ô cuối là kết quả nhân với '+k2+'.'})};
    return {type:'num', _lv:3, _o:[['giam',k],['gap',k2]], _v:v, _hoiGiua:true, q:soDoGT([{v:v},{v:null},{v:end}], [cuaChu('giam',k), cuaChu('gap',k2)])+'<div>Số <b>'+v+'</b> giảm đi <b>'+k+' lần</b> rồi gấp lên <b>'+k2+' lần</b> được <b>'+end+'</b>. Số ở ô <b class="text-amber-700">?</b> ở giữa là bao nhiêu?</div>', ans:m, sai:nhanSai([[end,'dao-vai'],[v-k,'nham-giam-bot'],[end*k2>999 ? 0 : end*k2,'nham-chieu'],[m+1,'nham-bang']], m), goiY:gy({'dao-vai':'Ô giữa là '+v+' giảm đi '+k+' lần, cũng là '+end+' giảm đi '+k2+' lần.'})};
  }, check:function(q){ var o=q._o, r=q._v, mid=null, i; for(i=0;i<o.length;i++){ r=ap(o[i][0], r, o[i][1]); if(!Number.isInteger(r) || r<1 || r>999) return false; if(i===0) mid=r; }
    return q.ans===(q._hoiGiua ? mid : r) && o[0][0]==='giam' && (q._lv>=2 ? o[1][0]==='gap' : o.length===1); }},

  /* D5 — Gấp mấy lần (Luyện tập 2b trang 1; Luyện tập 2 trang 2) */
  {name:'Gấp mấy lần', sec:'Luyện tập 2b — 36 và 9: 4 lần; 40 và 8: 5 lần; 45 và 5: 9 lần; cây cau 2 m và 6 m: 3 lần', mt:['MT2'], levels:3,
   muc:['36 và 9, 40 và 8, 45 và 5.', 'Số lớn 10–90, số bé 2–9.', 'Cây cau 2 m lúc trồng, nay 6 m; số tròn chục (80 và 20).'],
   make:function(lv){
    var a, b, k;
    if(lv<=1){ var p=pick([[36,9],[40,8],[45,5],[24,6],[32,4]]); a=p[0]; b=p[1]; }
    else if(lv===2){ b=rnd(2,9); k=rnd(2,9); a=b*k; }
    else { if(Math.random()<0.5){ b=rnd(2,3); k=rnd(2,5); a=b*k; var kk=a/b;
        return {type:'num', _lv:3, _a:a, _b:b, q:'<div>Lúc mới trồng, cây cau cao <b>'+b+' m</b>. Nay cây cau cao <b>'+a+' m</b>. Hỏi cây cau nay cao gấp mấy lần lúc mới trồng?</div>', ans:kk, unit:'lần', sai:nhanSai([[a-b,'nham-hon-gap'],[kk+1,'nham-bang'],[a,'dao-vai']], kk), goiY:gy()}; }
      b=10*rnd(1,4); k=rnd(2,9); a=b*k; while(a>999) a=b*(--k); }
    k=a/b;
    return {type:'num', _lv:lv, _a:a, _b:b, q:'<div>Số lớn là <b>'+a+'</b>, số bé là <b>'+b+'</b>. Số lớn gấp mấy lần số bé?</div>', ans:k, unit:'lần', sai:nhanSai([[a-b,'nham-hon-gap'],[k+1,'nham-bang'],[k-1,'nham-bang'],[k*10,'nham-hang']], k), goiY:gy()};
  }, check:function(q){ return q._a%q._b===0 && q.ans===q._a/q._b && q.ans>=2 && q._a<=999; }},

  /* D6 — Bê và bò (Luyện tập 3 trang 1) */
  {name:'Bê và bò', sec:'Luyện tập 3 — Con bê nặng 120 kg, con bò nặng gấp 3 lần con bê: bò 360 kg, cả hai 480 kg', mt:['MT4'], levels:3,
   muc:['Bò nặng gấp 3 lần bê 120 kg: bò nặng bao nhiêu.', 'Cả hai con nặng bao nhiêu (hai bước).', 'Bò nặng hơn bê bao nhiêu (hai bước); số khác.'],
   make:function(lv){
    var cap=pick([['con bê','con bò','kg'],['em','bố','kg'],['cây non','cây mẹ','cm'],['thùng nhỏ','thùng lớn','l']]), a, k;
    if(lv<=1){ a=pick([120,110,105,130]); k=3; } else { k=rnd(2,4); a=rnd(100, Math.floor(999/(k+1))); }
    var bo=a*k, ca=a+bo, hon=bo-a, u=cap[2];
    var de='<div>'+cap[0].charAt(0).toUpperCase()+cap[0].slice(1)+' nặng <b>'+a+' '+u+'</b>, '+cap[1]+' nặng gấp <b>'+k+' lần</b> '+cap[0]+'. ';
    if(cap[2]!=='kg') de='<div>'+cap[0].charAt(0).toUpperCase()+cap[0].slice(1)+' có số đo <b>'+a+' '+u+'</b>, '+cap[1]+' gấp <b>'+k+' lần</b> '+cap[0]+'. ';
    if(lv<=1) return {type:'num', _lv:1, _a:a, _k:k, _hoi:'bo', q:de+cap[1].charAt(0).toUpperCase()+cap[1].slice(1)+' có số đo bao nhiêu '+u+'?</div>', ans:bo, unit:u, sai:nhanSai([[a+k,'cong-thay-nhan'],[bo+10,'nham-bang'],[ca,'dao-vai']], bo), goiY:gy()};
    if(lv===2) return {type:'num', _lv:2, _a:a, _k:k, _hoi:'ca', q:de+'Cả hai có tất cả bao nhiêu '+u+'?</div>', ans:ca, unit:u, sai:nhanSai([[bo,'thieu-buoc'],[a+k,'cong-thay-nhan'],[hon,'chon-sai-phep'],[ca+10,'nham-bang']], ca), goiY:gy({'thieu-buoc':'Bước 1: '+cap[1]+' là '+a+' × '+k+'. Bước 2: cộng với '+a+'.'})};
    return {type:'num', _lv:3, _a:a, _k:k, _hoi:'hon', q:de+cap[1].charAt(0).toUpperCase()+cap[1].slice(1)+' hơn '+cap[0]+' bao nhiêu '+u+'?</div>', ans:hon, unit:u, sai:nhanSai([[bo,'thieu-buoc'],[ca,'chon-sai-phep'],[k,'nham-hon-gap'],[hon+10,'nham-bang']], hon), goiY:gy({'thieu-buoc':'Bước 1: '+cap[1]+' là '+a+' × '+k+'. Bước 2: lấy số đó trừ đi '+a+'.'})};
  }, check:function(q){ var a=q._a, k=q._k, bo=a*k; if(a+bo>999 || a<100) return false; return q.ans===(q._hoi==='bo' ? bo : (q._hoi==='ca' ? a+bo : bo-a)); }},

  /* D7 — Cánh hoa (Luyện tập 1 trang 2) */
  {name:'Cánh hoa', sec:'Luyện tập 1 — Mỗi số ở cánh hoa là giá trị của biểu thức nào: 360 + 47 − 102 = 305; 360 − (335 − 30) = 55; 132 × (12 − 9) = 396; 80 + 60 × 2 = 200; (150 + 30) : 6 = 30', mt:['MT3'], levels:3,
   muc:['Tính một biểu thức có nhân chia trước (80 + 60 × 2).', 'Bốn thẻ: biểu thức nào có giá trị bằng số ở cánh hoa.', 'Có dấu ngoặc với số ba chữ số: 360 − (335 − 30); 132 × (12 − 9).'],
   make:function(lv){
    if(lv<=1){ var t=btUuTien(), T=tinhBT2(t); return {type:'num', _lv:1, _bt:t, q:'<div class="text-base text-slate-500">Mẫu: 24 + 8 : 2 = 24 + 4 = 28.</div>'+kyHieu('Tính giá trị của biểu thức', t+' ='+oHoi()), ans:T, sai:nhanSai(nhieuGiaTri(t), T), goiY:gy()}; }
    if(lv===2){ var ds=nhieuBT(function(){ return Math.random()<0.5 ? btUuTien() : btNgoac(); }, 4), dung=pick(ds), T2=tinhBT2(dung), sai={}; ds.forEach(function(c,i){ if(c!==dung) sai[String(i)]=(tinhTSP(c)===T2 ? 'tinh-trai-sang-phai' : (tinhBoNgoac(c)===T2 ? 'bo-ngoac' : 'nham-bang')); });
      return {type:'mcq', cot:1, _lv:2, _ds:ds, _T:T2, _dung:dung, q:theTinh(ds)+'<div>Cánh hoa ghi số <b class="text-2xl text-orange-600">'+T2+'</b>. Biểu thức nào có giá trị bằng '+T2+'?</div>', choices:ds, correct:ds.indexOf(dung), sai:sai, goiY:gy({'nham-bang':'Bé tính giá trị từng thẻ rồi so với '+T2+'.'})}; }
    var t3, g; for(g=0;g<300;g++){ var kieu=pick(['−(−','×(−','(+):']), a, b, c;
      if(kieu==='−(−'){ b=rnd(150,400); c=rnd(10,b-20); a=rnd(b, 600); t3=a+' − ('+b+' − '+c+')'; } else if(kieu==='×(−'){ a=rnd(101,160); b=rnd(5,15); c=rnd(1,b-2); t3=a+' × ('+b+' − '+c+')'; } else { c=rnd(2,9); var s1=c*rnd(20,120); a=rnd(10,s1-10); b=s1-a; t3='('+a+' + '+b+') : '+c; }
      if(okBuoc(t3) && okSo(tinhBoNgoac(t3)) && tinhBoNgoac(t3)!==tinhBT2(t3)) break; }
    var T3=tinhBT2(t3), trong=/\(([^()]+)\)/.exec(t3)[1];
    return {type:'num', _lv:3, _bt:t3, q:kyHieu('Tính giá trị của biểu thức', t3+' ='+oHoi()), ans:T3, sai:nhanSai(nhieuGiaTri(t3).concat([[tinhBT(trong),'thieu-buoc']]), T3), goiY:gy({'thieu-buoc':'Trong ngoặc được '+tinhBT(trong)+', bé làm tiếp phép còn lại.'})};
  }, check:function(q){
    if(q._lv===2){ var ds=q._ds; if(docThe(q.q).join('|')!==ds.join('|') || ds.length!==4 || !ds.every(okBuoc)) return false; return kiemMCQ(q) && ds.filter(function(t){ return tinhBT2(t)===q._T; }).length===1 && tinhBT2(q._dung)===q._T; }
    var t=q._bt; if(!okBuoc(t)) return false; if(q._lv<=1) return laBT(t) && /[×:]/.test(t) && /[+−]/.test(t) && q.ans===tinhBT2(t); return /\(/.test(t) && q.ans===tinhBT2(t) && tinhBoNgoac(t)!==tinhBT2(t); }},

  /* D8 — Ngỗng, chó, lợn (Luyện tập 3a trang 2) */
  {name:'Ngỗng, chó, lợn', sec:'Luyện tập 3a — Ngỗng 6 kg; chó gấp 2 lần ngỗng; lợn gấp 5 lần chó: 6 × 2 × 5 = 60 kg; (6 × 2) × 5 = 6 × (2 × 5)', mt:['MT4'], levels:3,
   muc:['Chó nặng bao nhiêu (6 × 2).', 'Lợn nặng bao nhiêu (ba thừa số).', 'Cách ghép nào thuận tiện hơn: (6 × 2) × 5 hay 6 × (2 × 5).'],
   make:function(lv){
    var a=pick([6,7,8,9,4,3]), cap=pick([[2,5],[5,2]]), b=cap[0], c=cap[1], cho=a*b, lon=a*b*c, ten=pick([['con ngỗng','con chó','con lợn'],['túi gạo','bao gạo','thùng gạo'],['quả bí','quả mít','quả dưa']]);
    var de='<div>'+ten[0].charAt(0).toUpperCase()+ten[0].slice(1)+' nặng <b>'+a+' kg</b>. '+ten[1].charAt(0).toUpperCase()+ten[1].slice(1)+' nặng gấp <b>'+b+' lần</b> '+ten[0]+'. '+ten[2].charAt(0).toUpperCase()+ten[2].slice(1)+' nặng gấp <b>'+c+' lần</b> '+ten[1]+'. ';
    if(lv<=1) return {type:'num', _lv:1, _a:a, _b:b, _c:c, _hoi:'cho', q:de+ten[1].charAt(0).toUpperCase()+ten[1].slice(1)+' nặng bao nhiêu ki-lô-gam?</div>', ans:cho, unit:'kg', sai:nhanSai([[a+b,'cong-thay-nhan'],[lon,'dao-vai'],[cho+1,'nham-bang']], cho), goiY:gy()};
    if(lv===2) return {type:'num', _lv:2, _a:a, _b:b, _c:c, _hoi:'lon', q:de+ten[2].charAt(0).toUpperCase()+ten[2].slice(1)+' nặng bao nhiêu ki-lô-gam?</div><div class="text-base text-slate-500">Biểu thức: '+a+' × '+b+' × '+c+'</div>', ans:lon, unit:'kg', sai:nhanSai([[cho,'thieu-buoc'],[a*c,'thieu-buoc'],[a+b+c,'cong-thay-nhan'],[lon+10,'nham-bang']], lon), goiY:gy({'thieu-buoc':'Bước 1: '+ten[1]+' nặng '+a+' × '+b+'. Bước 2: nhân tiếp với '+c+'.'})};
    var tron=a+' × ('+b+' × '+c+')', khac='('+a+' × '+b+') × '+c, ch=shuffle([tron, khac]), sai={}; sai[String(ch.indexOf(khac))]='nham-bang';
    return {type:'mcq', cot:1, _lv:3, _a:a, _b:b, _c:c, _hoi:'ghep', _dung:tron, q:de+'Để tính '+a+' × '+b+' × '+c+', cách ghép nào tính <b>thuận tiện hơn</b>?</div>', choices:ch, correct:ch.indexOf(tron), sai:sai, goiY:gy({'nham-bang':b+' × '+c+' = 10 là số tròn chục, nhân tiếp với '+a+' rất dễ.'})};
  }, check:function(q){ var a=q._a, b=q._b, c=q._c; if(b*c!==10 || a*b*c>999) return false; if(q._hoi==='cho') return q.ans===a*b; if(q._hoi==='lon') return q.ans===a*b*c; return kiemMCQ(q) && q.choices.length===2 && q._dung===a+' × ('+b+' × '+c+')' && tinhBT2(q.choices[0])===tinhBT2(q.choices[1]); }},

  /* D9 — Nhân ba số thuận tiện (Luyện tập 3b trang 2) */
  {name:'Nhân ba số thuận tiện', sec:'Luyện tập 3b — Tính thuận tiện: 8 × 5 × 2 = 80; 9 × 2 × 5 = 90', mt:['MT4'], levels:3,
   muc:['8 × 5 × 2 (ghép 5 × 2 = 10).', '9 × 2 × 5; 7 × 2 × 5.', 'Chọn cách ghép đúng trong bốn thẻ.'],
   make:function(lv){
    var a = lv<=1 ? pick([8,6,4]) : rnd(3,9), cap=pick([[5,2],[2,5]]), b=cap[0], c=cap[1], t=a+' × '+b+' × '+c, T=a*10;
    if(lv<=2) return {type:'num', _lv:lv, _bt:t, q:kyHieu('Tính thuận tiện', t+' ='+oHoi())+(lv<=1 ? '<div class="text-base text-slate-500">Gợi ý: '+b+' × '+c+' = 10.</div>' : ''), ans:T, sai:nhanSai([[a*b,'thieu-buoc'],[a+b+c,'cong-thay-nhan'],[T+10,'nham-bang'],[a*b+c,'chon-sai-phep']], T), goiY:gy({'thieu-buoc':'Ghép '+b+' × '+c+' = 10 rồi nhân với '+a+'.'})};
    var dung=a+' × ('+b+' × '+c+')', ch=shuffle([dung, '('+a+' × '+b+') + '+c, a+' + '+b+' × '+c, a+' × '+b+' + '+c]), sai={}; ch.forEach(function(x,i){ if(x!==dung) sai[String(i)]='chon-sai-phep'; });
    if(ch.filter(function(x){ return tinhBT2(x)===T; }).length!==1) return BAI.topics[8].make(3);
    return {type:'mcq', cot:1, _lv:3, _bt:t, _dung:dung, q:bieuThuc(t)+'<div>Cách ghép nào tính đúng và thuận tiện giá trị của biểu thức trên?</div>', choices:ch, correct:ch.indexOf(dung), sai:sai, goiY:gy({'chon-sai-phep':'Biểu thức chỉ có phép nhân: ghép '+b+' × '+c+' = 10 rồi nhân với '+a+'.'})};
  }, check:function(q){ var m=/^(\d+) × (\d+) × (\d+)$/.exec(q._bt); if(!m) return false; var a=+m[1], b=+m[2], c=+m[3]; if(b*c!==10) return false; if(q._lv<=2) return q.ans===a*b*c; return kiemMCQ(q) && q.choices.length===4 && tinhBT2(q._dung)===a*b*c && q.choices.filter(function(x){ return tinhBT2(x)===a*b*c; }).length===1; }}
 ]
};
