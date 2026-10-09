/* bai-29.js — Bài 29: Luyện tập chung (Chủ đề 4). BÀI MỚI, Engine v2 — LUYỆN THÔNG MINH.
   Theo bảng phân tích sư phạm đã duyệt (phan-tich-su-pham/bai-29.md) và chỉnh sửa của thầy trên PR #16:
   5 MỤC TIÊU (muctieu) × 10 DẠNG (topics), mỗi dạng 3 mức (Thông tư 27: Nhận biết · Hiểu · Vận dụng); goal:10, soCau:20, soCauToiDa:26.
   Hình mới: haiCau (một bạn, hai cây cầu, bốn giỏ táo). Còn lại chép từ bài 24 (soDoGT), 26 (chiaDoc2), 28 (soDoHai): không dùng chung tệp.
   D10 phục vụ MT3 và MT4: make(lv, mt) và q.mt đúng mục tiêu.
   Mọi kết quả nguyên < 100 (ô bước giữa có thể tới 100); phép giảm chia hết; phép chia có dư luôn nói rõ "còn thừa".
   QUY TẮC: nối chuỗi, KHÔNG backtick và KHÔNG template literal. */

/* ---- Tiện ích chung ---- */
function nhanSai(ds, dung){ var o={}; ds.forEach(function(p){ var v=p[0]; if(Number.isInteger(v) && v>0 && v!==dung && !(String(v) in o)) o[String(v)]=p[1]; }); return o; }
function kiemMCQ(q){ return q.choices[q.correct]===q._dung && new Set(q.choices).size===q.choices.length; }
function dsBtn29(ch){ return '<span class="text-2xl font-extrabold text-slate-700">'+ch+'</span><span class="ml-2 text-base font-bold text-slate-600">'+(ch==='Đ'?'Đúng':'Sai')+'</span>'; }
function svgX(w, h, px){ return svgHinh(w, h, px).replace('<svg ', '<svg class="text-slate-700" '); }
function demDem(s, loai){ var m=String(s).match(new RegExp('data-dem="'+loai+'"', 'g')); return m ? m.length : 0; }
function khungHinh(s){ return '<div class="flex justify-center my-2">'+s+'</svg></div>'; }
function nguoi(ten, alt){ return '<div class="flex justify-center mb-1">'+anh(ten, 72, alt)+'</div>'; }
function kyHieu(nhan, bt){ return '<div class="text-slate-500 mb-1">'+nhan+'</div><div class="text-4xl font-extrabold text-orange-600">'+bt+'</div>'; }
function cap(s){ return s.charAt(0).toUpperCase()+s.slice(1); }
function chia(a, b){ var q=Math.floor(a/b); return {q:q, r:a-q*b}; }
/* Nhận xét "Em thấy thế nào?": mo(n) viết lý do có số n; x = số bạn nói, T = số đúng */

function goiYChia(a, b){ var c=chia(a,b), a1=Math.floor(a/10), q1=Math.floor(a1/b);
  return {'quen-ha':'Sau khi chia hàng chục, bé hạ chữ số hàng đơn vị xuống rồi chia tiếp. '+a+' : '+b+' = '+c.q+(c.r ? ' (dư '+c.r+')' : '')+'.',
    'thieu-so-0':'Thương có chữ số 0 ở hàng đơn vị thì bé phải viết chữ số 0. '+a+' : '+b+' = '+c.q+'.',
    'du-lon-hon-chia':'Số dư luôn bé hơn số chia ('+b+'). Nếu số dư còn chia được cho '+b+', bé chia tiếp.',
    'quen-du':'Nếu còn thừa thì phải thêm một nữa: '+c.q+' và còn '+c.r+', cần '+(c.q+1)+'.',
    'tru-sai-buoc':'Bé tính lại bước trừ: số bị chia trừ tích (số chia × thương).', 'nham-thuong-du':'Thương là kết quả phép chia, số dư là phần còn lại. '+a+' : '+b+' = '+c.q+' (dư '+c.r+').',
    'nham-hang':'Bé nhớ: số chục chia xong vẫn là số chục. Ví dụ 6 chục : 2 = 3 chục = 30.', 'nham-bang':'Bé nhẩm lại bảng chia '+b+' nhé!', 'dao-vai':'Bé xem lại: ô ? là số bị chia, số chia hay thương?',
    'cong-thay-nhan':'Đây là phép chia (hoặc phép nhân), không phải phép cộng, trừ.', 'thieu-buoc':'Bé làm hết các bước của bài toán nhé!', 'dem-sot-phep':'Bé tính từng thẻ, rồi đếm.', 'lech-nhom':'Bé đếm lại nhé!'}; }


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


/* Phép tính viết ra: pt(x,'+',y) → {s:'x + y = r', r:r} */
function pt(x, op, y){ var r = op==='+' ? x+y : (op==='−' ? x-y : x*y); return {s:x+' '+op+' '+y+' = '+r, r:r, x:x, op:op, y:y}; }
var TRU='−';


/* ---- Hình mới 1: sơ đồ đoạn thẳng hai đoạn (độ dài tỉ lệ với số). kieu = 'nhieu' (đoạn 2 = đoạn 1 + k), 'it' (đoạn 2 = đoạn 1 bớt k, phần bớt nét đứt),
   'gap' (đoạn 2 = k đoạn bằng đoạn 1). hoi = 'r2' (ngoặc dưới đoạn 2 ghi "? don"), 'tong' (ngoặc phải ôm cả hai đoạn), '' (không hỏi).
   Mỗi đoạn là một rect có data-v (số), data-r (hàng 1 hoặc 2), data-t (goc / them / bot). ---- */
function soDoHai(kieu, a, k, ten1, ten2, hoi, don){
  var seg2 = kieu==='nhieu' ? [{v:a,t:'goc',l:''},{v:k,t:'them',l:k}] : (kieu==='it' ? [{v:a-k,t:'goc',l:''},{v:k,t:'bot',l:k}] : []), i;
  if(kieu==='gap') for(i=0;i<k;i++) seg2.push({v:a,t:'goc',l:a});
  var tot2=0; seg2.forEach(function(g){ tot2+=g.v; });
  var mx=Math.max(a,tot2), ox=92, barW = hoi==='tong' ? 150 : 170, u=barW/mx, y1=34, y2=98, hh=30;
  var W = hoi==='tong' ? ox+barW+8+22+82+26 : ox+barW+26, H = hoi==='r2' ? y2+hh+16+34+16 : y2+hh+20, s=svgX(W,H);
  function hang(r, y, ten, segs){
    var x=ox, o='<text x="'+(ox-10)+'" y="'+(y+21)+'" text-anchor="end" font-size="17" '+HFONT+' fill="currentColor">'+ten+'</text>';
    segs.forEach(function(g){
      var w=g.v*u;
      o+='<rect data-v="'+g.v+'" data-r="'+r+'" data-t="'+g.t+'" x="'+x.toFixed(1)+'" y="'+y+'" width="'+w.toFixed(1)+'" height="'+hh+'" rx="3" '
        +(g.t==='bot' ? 'fill="none" stroke-dasharray="5 4" opacity=".8"' : 'fill="'+(g.t==='them' ? HM.vang : HM.troi)+'" fill-opacity="'+(g.t==='them' ? '0.8' : '0.5')+'"')+' stroke="currentColor" stroke-width="2.5"/>';
      if(g.l!=='') o+='<text x="'+(x+w/2).toFixed(1)+'" y="'+(y-7)+'" text-anchor="middle" font-size="17" '+HFONT+' fill="currentColor">'+g.l+'</text>';
      x+=w;
    });
    return o;
  }
  s+=hang(1, y1, ten1, [{v:a,t:'goc',l:a}]);
  s+=hang(2, y2, ten2, seg2);
  if(hoi==='r2'){ var xa=ox, xb=ox+tot2*u, yb=y2+hh+14;
    s+='<path d="M'+xa+' '+(yb-6)+' L'+xa+' '+yb+' L'+xb.toFixed(1)+' '+yb+' L'+xb.toFixed(1)+' '+(yb-6)+'" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>';
    s+='<text x="'+((xa+xb)/2).toFixed(1)+'" y="'+(yb+30)+'" text-anchor="middle" font-size="20" '+HFONT+' fill="'+HM.hoi+'">? '+don+'</text>'; }
  if(hoi==='tong'){ var xr=ox+mx*u+8, ym=(y1+y2+hh)/2;
    s+='<path d="M'+xr.toFixed(1)+' '+y1+' H'+(xr+8).toFixed(1)+' V'+(y2+hh)+' H'+xr.toFixed(1)+' M'+(xr+8).toFixed(1)+' '+ym+' H'+(xr+16).toFixed(1)+'" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>';
    s+='<text x="'+(xr+22).toFixed(1)+'" y="'+(ym+7)+'" font-size="20" '+HFONT+' fill="'+HM.hoi+'">? '+don+'</text>'; }
  return khungHinh(s);
}
function docDoan(s){ var o=[], re=/<rect data-v="(\d+)" data-r="(\d)" data-t="(\w+)"/g, m; while((m=re.exec(String(s)))) o.push({v:+m[1], r:+m[2], t:m[3]}); return o; }
/* Đối chiếu hình với số trong đề: đoạn 1 = a; đoạn 2 đúng kiểu */
function kiemSoDo(q){
  var d=docDoan(q.q), a=q._a, k=q._k, r1=d.filter(function(g){ return g.r===1; }), r2=d.filter(function(g){ return g.r===2; });
  if(r1.length!==1 || r1[0].v!==a || r1[0].t!=='goc') return false;
  if(q._kieu==='nhieu') return r2.length===2 && r2[0].v===a && r2[0].t==='goc' && r2[1].v===k && r2[1].t==='them';
  if(q._kieu==='it') return r2.length===2 && r2[0].v===a-k && r2[0].t==='goc' && r2[1].v===k && r2[1].t==='bot' && a-k>0;
  return r2.length===k && r2.every(function(g){ return g.v===a && g.t==='goc'; });
}
function tongThuc(kieu, a, k){ return kieu==='nhieu' ? a+(a+k) : (kieu==='it' ? a+(a-k) : a+a*k); }
function haiThuc(kieu, a, k){ return kieu==='nhieu' ? a+k : (kieu==='it' ? a-k : a*k); }


/* ---- Hình mới 2 (D3, D4, D5): số – cửa – kết quả. nut = [{v}] (v = null → ô "?", v = '' → ô trống nét đứt), cua = nhãn trên mũi tên ---- */
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

function cuaChu(loai, k){ return loai==='gap' ? 'gấp '+k+' lần' : (loai==='giam' ? 'giảm '+k+' lần' : (loai==='them' ? 'thêm '+k+' đơn vị' : 'bớt '+k+' đơn vị')); }
function ap(loai, v, k){ return loai==='gap' ? v*k : (loai==='giam' ? v/k : (loai==='them' ? v+k : v-k)); }
/* Các đáp án nhiễu thật cho một phép: nhầm chiều, nhầm gấp với thêm, giảm với bớt */
function nhamPhep(loai, v, k){
  if(loai==='gap') return [[v+k,'nham-gap-them'],[v%k===0 ? v/k : 0,'nham-chieu']];
  if(loai==='giam') return [[v-k,'nham-giam-bot'],[v*k,'nham-chieu']];
  if(loai==='them') return [[v*k,'nham-gap-them'],[v-k,'chon-sai-phep']];
  return [[v%k===0 ? v/k : 0,'nham-giam-bot'],[v+k,'chon-sai-phep']];
}
function okPhep(loai, v, k){ var r=ap(loai,v,k); return Number.isInteger(r) && r>=1 && r<=100; }
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
var GOI={'nham-gap-them':'Gấp n lần là nhân với n. Thêm n đơn vị mới là cộng n.', 'nham-giam-bot':'Giảm đi n lần là chia cho n. Bớt n đơn vị mới là trừ n.', 'nham-chieu':'Giảm đi là chia, gấp lên là nhân. Bé đọc kỹ cầu hoặc cửa nhé!',
  'nham-so-lan':'Số lần là số nhân hoặc chia, không phải kết quả.', 'chon-sai-phep':'Thêm là cộng, bớt là trừ. Bé xem lại nhé!', 'quen-thua':'Phép chia có dư thì còn thừa. Bé nhớ trả lời cả phần còn thừa nhé!',
  'nham-thuong-du':'Thương là số bộ, số dư là số mét còn thừa.', 'lech-nhom':'Bé tính lại từng bước nhé!', 'dem-sot-phep':'Bé đếm lại nhé!', 'tra-loi-sai-buoc':'Bé đọc lại câu hỏi cuối: còn một bước nữa mới ra đáp số.', 'thieu-buoc':'Bài này có hai bước. Bé làm đủ các bước nhé!', 'cong-thay-nhan':'Gấp n lần là nhân với n, không phải cộng.',
  'nham-bang':'Bé tính lại cho đúng nhé!', 'dao-vai':'Bé xem lại: ô ? là số nào trong phép tính?', 'nham-hang':'Số chục nhân hoặc chia xong vẫn là số chục.', 'thieu-so-0':'Thương có chữ số 0 thì bé nhớ viết chữ số 0.',
  'quen-ha':'Sau khi chia hàng chục, bé hạ chữ số hàng đơn vị xuống rồi chia tiếp.', 'du-lon-hon-chia':'Số dư luôn bé hơn số chia.', 'tru-sai-buoc':'Bé tính lại bước trừ: số bị chia trừ tích.'};
function gy(extra, a, b){ var o={}, k, c=(a && b) ? goiYChia(a,b) : {}; for(k in GOI) o[k]=GOI[k]; for(k in c) o[k]=c[k]; for(k in (extra||{})) o[k]=extra[k]; return o; }
var CAP_TEN=[['Việt','Mai'],['Nam','Lan'],['An','Bình'],['Hà','Minh']];

/* ---- Hình mới (D3): một bạn cầm số n, hai cây cầu (A: giảm 2 lần, B: gấp 3 lần), bốn giỏ táo mang số. Mỗi giỏ data-dem="gio" data-v="số"; bạn mang data-n. ---- */
function haiCau(n, gio){
  var W=372, H=214, s=svgX(W,H), i, ys=[17,65,113,161];
  s+='<text x="44" y="66" text-anchor="middle" font-size="17" '+HFONT+' fill="currentColor">Bạn</text>';
  s+='<circle data-n="'+n+'" cx="44" cy="107" r="26" fill="'+HM.vang+'"/>'+chuSo(44,107,n,22);
  s+='<path d="M68 96 L94 58 M68 118 L94 168" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" opacity=".6"/>';
  [['A','giảm 2 lần',50],['B','gấp 3 lần',160]].forEach(function(c){
    s+='<text x="165" y="'+(c[2]-10)+'" text-anchor="middle" font-size="18" '+HFONT+' fill="currentColor">Cầu '+c[0]+': '+c[1]+'</text>'
      +'<rect x="94" y="'+c[2]+'" width="142" height="16" rx="5" fill="'+HM.goNhat+'" stroke="currentColor" stroke-width="2.5"/>'
      +'<path d="M118 '+c[2]+' V'+(c[2]+16)+' M142 '+c[2]+' V'+(c[2]+16)+' M166 '+c[2]+' V'+(c[2]+16)+' M190 '+c[2]+' V'+(c[2]+16)+' M214 '+c[2]+' V'+(c[2]+16)+'" fill="none" stroke="currentColor" stroke-width="1.5" opacity=".5"/>';
  });
  for(i=0;i<gio.length;i++) s+='<rect data-dem="gio" data-v="'+gio[i]+'" x="268" y="'+ys[i]+'" width="78" height="36" rx="9" fill="'+HM.cam+'" fill-opacity="0.35" stroke="currentColor" stroke-width="2.5"/>'+nhanVien(307, ys[i]+18, 54, 30, gio[i], 18);
  return khungHinh(s);
}
function docCau(s){ var g=[], re=/data-dem="gio" data-v="(\d+)"/g, m, n=/data-n="(\d+)"/.exec(s); while((m=re.exec(String(s)))) g.push(+m[1]); return {n: n ? +n[1] : null, gio:g}; }
function ketCau(c, n){ return c==='A' ? (n%2===0 ? n/2 : null) : n*3; }

var BAI = {
 n: 29,
 title: 'Luyện Tập Chung',
 sub: 'Luyện thông minh: câu hỏi tự đổi theo bé — làm hết lượt để xem ngọn lửa!',
 goal: 10, soCau: 20, soCauToiDa: 26,
 loi: {'nham-gap-them':'Nhầm "gấp n lần" với "thêm n đơn vị"', 'nham-giam-bot':'Nhầm "giảm n lần" với "bớt n đơn vị"', 'nham-chieu':'Nhầm chiều phép tính (gấp thay giảm)', 'nham-so-lan':'Nhầm số lần với kết quả',
       'thieu-so-0':'Thương thiếu chữ số 0', 'nham-hang':'Nhầm hàng khi nhẩm số tròn chục', 'quen-ha':'Quên hạ chữ số', 'du-lon-hon-chia':'Số dư lớn hơn hoặc bằng số chia', 'tru-sai-buoc':'Trừ sai ở bước đặt tính',
       'quen-thua':'Quên "còn thừa"', 'nham-thuong-du':'Nhầm thương với số dư', 'tra-loi-sai-buoc':'Trả lời bước 1 thay vì bước cuối'},
 muctieu: [
  {id:'MT1', ten:'Nhân, chia nhẩm số tròn chục', muc:['10 × 7, 60 : 2.', '20 × 4, 40 × 2, 90 : 3, 70 : 7.', 'Tìm thừa số, số bị chia; thương có chữ số 0.']},
  {id:'MT2', ten:'Gấp lên, giảm đi', muc:['Gấp hoặc giảm một số nhỏ (27 giảm 3 lần).', 'Thiệp của Rô-bốt gấp 3 lần (27 → 81); gạo buổi chiều giảm 2 lần (30 → 15).', 'Chọn phép tính; số khác; cả hai buổi.']},
  {id:'MT3', ten:'Giải toán hai bước', muc:['Trồng cây: Việt 5 cây, Rô-bốt gấp 3 lần (hỏi Rô-bốt).', 'Cả hai bạn (5 + 15).', 'Số lớn hơn; chọn dãy hai phép tính; bạn nói đúng hay sai.']},
  {id:'MT4', ten:'Chia có dư', muc:['Đặt tính chia 60 : 2 (ô ? ở thương); 35 m vải, mỗi bộ 3 m: mấy bộ.', '73 : 4, 39 : 3; còn thừa mấy mét.', 'Ô ? ở số dư; số khác; đã dùng bao nhiêu mét; phát hiện lỗi quên "còn thừa".']},
  {id:'MT5', ten:'Mũi tên và cửa', muc:['Qua một cầu hoặc một cửa (32 giảm 2 lần).', 'Hai bước: 32 gấp 3 lần rồi giảm 4 lần; bạn muốn lấy giỏ 27 thì đi cầu nào.', 'Hai bước hỗn hợp: 42 giảm 3 lần rồi bớt 3 đơn vị; qua hai cầu liên tiếp.']}
 ],
 topics: [
  /* D1 — Nhân nhẩm số tròn chục (Tiết 1, Luyện tập 1a) */
  {name:'Nhân nhẩm số tròn chục', sec:'Tiết 1, Luyện tập 1a — Tính nhẩm: 10 × 7, 20 × 4, 40 × 2, 30 × 3', mt:['MT1'], levels:3,
   muc:['10 nhân với một số (10 × 7).', '20 × 4, 40 × 2, 30 × 3 (số chục nhân với số).', 'Tìm thừa số (? × 3 = 90, 3 × ? = 60).'],
   make:function(lv){
    var t, k, a, ans, bt;
    if(lv<=1){ t=1; k=rnd(2,9); a=10*t; ans=a*k; bt=a+' × '+k+' ='+oHoi(); }
    else if(lv===2){ var ps=[[2,4],[4,2],[3,3],[2,3],[3,2],[2,2],[2,4],[4,2]]; var p=pick(ps); t=p[0]; k=p[1]; a=10*t; ans=a*k; bt = Math.random()<0.5 ? a+' × '+k+' ='+oHoi() : k+' × '+a+' ='+oHoi(); }
    else { var q=pick([[3,3],[3,2],[2,4],[4,2],[2,3],[3,1],[9,1]]); k=q[0]; t=q[1]; a=10*t; ans=a; var tich=a*k; 
      return {type:'num', _lv:3, _t:t, _k:k, _tich:tich, q:kyHieu('Tìm số thích hợp', Math.random()<0.5 ? oHoi()+'× '+k+' = '+tich : k+' ×'+oHoi()+'= '+tich), ans:a, sai:nhanSai([[t,'nham-hang'],[a*10,'nham-hang'],[tich,'dao-vai'],[tich-k,'cong-thay-nhan']], a), goiY:gy({'nham-hang':(tich/10)+' chục : '+k+' = '+t+' chục = '+a+'.','dao-vai':'Ô ? là thừa số, không phải tích.'},0,0)}; }
    return {type:'num', _lv:lv, _t:t, _k:k, q:kyHieu('Tính nhẩm', bt), ans:ans, sai:nhanSai([[t*k,'nham-hang'],[ans*10,'nham-hang'],[a+k,'cong-thay-nhan'],[ans-10,'nham-bang']], ans),
      goiY:gy({'nham-hang':t+' chục × '+k+' = '+(t*k)+' chục = '+ans+'.'})};
  }, check:function(q){
    if(q._lv>=3) return q.ans===10*q._t && q.ans*q._k===q._tich && q._tich<100;
    return q.ans===10*q._t*q._k && q.ans<100; }},

  /* D2 — Chia nhẩm số tròn chục (Tiết 1, Luyện tập 1b) */
  {name:'Chia nhẩm số tròn chục', sec:'Tiết 1, Luyện tập 1b — Tính nhẩm: 60 : 2, 90 : 3, 70 : 7, 40 : 2', mt:['MT1'], levels:3,
   muc:['60 : 2, 40 : 2 (thương tròn chục nhỏ).', '90 : 3, 70 : 7, 60 : 3.', 'Số lớn hơn; thương có chữ số 0 (90 : 9).'],
   make:function(lv){
    var b, t;
    if(lv<=1){ b=2; t=pick([4,6,8]); } else if(lv===2){ var p=pick([[3,9],[7,7],[3,6],[2,8],[4,8]]); b=p[0]; t=p[1]; } else { var r=pick([[9,9],[8,8],[6,6],[5,5],[4,8],[7,7]]); b=r[0]; t=r[1]; }
    var a=10*t, ans=10*(t/b);
    return {type:'num', _lv:lv, _a:a, _b:b, q:kyHieu('Tính nhẩm', a+' : '+b+' ='+oHoi())+'<div class="text-slate-600 text-base mt-1">'+t+' chục : '+b+' = '+(t/b)+' chục = ?</div>', ans:ans,
      sai:nhanSai([[t/b,'thieu-so-0'],[ans*10,'nham-hang'],[a-b,'cong-thay-nhan']], ans), goiY:gy({'thieu-so-0':t+' chục : '+b+' = '+(t/b)+' chục, tức là '+ans+'. Bé nhớ viết chữ số 0 ở hàng đơn vị.', 'nham-hang':'Số chục chia xong vẫn là số chục: '+(t/b)+' chục là '+ans+'.'})};
  }, check:function(q){ return q._a%q._b===0 && q.ans===q._a/q._b && (q._a/10)%q._b===0 && q.ans%10===0; }},

  /* D3 — Cầu A, cầu B (Tiết 1, Luyện tập 2): chỉ một bạn, hai cầu, bốn giỏ */
  {name:'Cầu A, cầu B', sec:'Tiết 1, Luyện tập 2 — Bạn cầm số đi qua cầu A (giảm 2 lần) hoặc cầu B (gấp 3 lần) để lấy giỏ táo', mt:['MT5'], levels:3,
   muc:['Bạn cầm số đi qua một cầu: lấy giỏ nào.', 'Bạn muốn lấy giỏ có số cho trước: đi cầu nào.', 'Bạn qua cả hai cầu liên tiếp: lấy giỏ nào.'],
   make:function(lv){
    var n, cau, target, gio, tag, ch, dung, sai={}, cand, i;
    function chonGio(t, ds){ var g=[t], j; ds.forEach(function(d){ if(g.length<4 && Number.isInteger(d[0]) && d[0]>=1 && d[0]<100 && g.every(function(x){ return x!==d[0]; })) g.push(d[0]); }); return g; }
    if(lv<=1){ cau=pick(['A','B']); n = cau==='A' ? 2*rnd(4,24) : rnd(4,30); target=ketCau(cau,n);
      cand = cau==='A' ? [[n*3,'nham-chieu'],[n*2,'nham-chieu'],[n-2,'nham-giam-bot'],[n/2+1,'nham-giam-bot']] : [[n%2===0 ? n/2 : n+1,'nham-chieu'],[n+3,'nham-gap-them'],[n*2,'nham-gap-them'],[n*3+3,'nham-giam-bot']];
      gio=chonGio(target, cand); if(gio.length<4) return BAI.topics[2].make(lv);
      var tg={}; cand.forEach(function(d){ tg[d[0]]=d[1]; }); shuffle(gio); ch=gio.map(function(v){ return 'Giỏ '+v; }); dung='Giỏ '+target; gio.forEach(function(v,j){ if(v!==target) sai[String(j)]=tg[v]||'nham-bang'; });
      return {type:'mcq', cot:1, _lv:lv, _n:n, _cau:cau, _target:target, _gio:gio, _dung:dung, q:haiCau(n,gio)+'<div>Bạn cầm số <b>'+n+'</b> đi qua <b>cầu '+cau+'</b> ('+(cau==='A' ? 'giảm 2 lần' : 'gấp 3 lần')+'). Bạn lấy được giỏ nào?</div>', choices:ch, correct:ch.indexOf(dung), sai:sai, goiY:gy()}; }
    if(lv===2){ var dungCau=pick(['A','B']); n = Math.random()<0.4 ? pick([5,7,9,11,13]) : 2*rnd(3,16); if(n%2===1) dungCau='B'; target=ketCau(dungCau,n);
      var kia = dungCau==='A' ? ketCau('B',n) : ketCau('A',n);
      cand=[[kia,'nham-chieu'],[n*2,'nham-chieu'],[n+3,'nham-gap-them'],[n-2,'nham-giam-bot'],[n+2,'nham-giam-bot']];
      gio=chonGio(target, cand.filter(function(d){ return d[0]!==target; })); if(gio.length<4) return BAI.topics[2].make(lv);
      shuffle(gio); ch=['Cầu A','Cầu B']; dung='Cầu '+dungCau; sai[String(ch.indexOf(dung)===0 ? 1 : 0)]='nham-chieu';
      return {type:'mcq', cot:1, _lv:2, _n:n, _cau:dungCau, _target:target, _gio:gio, _dung:dung, q:haiCau(n,gio)+'<div>Bạn cầm số <b>'+n+'</b> và muốn lấy <b>giỏ '+target+'</b>. Bạn đi qua cầu nào?</div>', choices:ch, correct:ch.indexOf(dung), sai:sai,
        goiY:gy({'nham-chieu':'Bé thử cả hai cầu với số '+n+': giảm 2 lần, gấp 3 lần. Cầu nào ra '+target+'?'})}; }
    n=2*rnd(2,16); target=n/2*3; cand=[[n/2,'thieu-buoc'],[n*3,'thieu-buoc'],[n/2*2,'nham-chieu'],[n*2*3,'nham-chieu'],[n+3,'nham-gap-them'],[n+n/2,'nham-bang']];
    gio=chonGio(target, cand); if(gio.length<4) return BAI.topics[2].make(3);
    var tg3={}; cand.forEach(function(d){ tg3[d[0]]=d[1]; }); shuffle(gio); ch=gio.map(function(v){ return 'Giỏ '+v; }); dung='Giỏ '+target; gio.forEach(function(v,j){ if(v!==target) sai[String(j)]=tg3[v]||'nham-bang'; });
    return {type:'mcq', cot:1, _lv:3, _n:n, _cau:'AB', _target:target, _gio:gio, _dung:dung, q:haiCau(n,gio)+'<div>Bạn cầm số <b>'+n+'</b> đi qua <b>cầu A</b> rồi <b>cầu B</b>. Bạn lấy được giỏ nào?</div>', choices:ch, correct:ch.indexOf(dung), sai:sai,
      goiY:gy({'thieu-buoc':'Bạn qua cả hai cầu: cầu A trước ('+n+' : 2), rồi cầu B (nhân với 3).'})};
  }, check:function(q){
    var c=docCau(q.q), n=q._n, t=q._target, a=ketCau('A',n), b=ketCau('B',n);
    if(c.n!==n || c.gio.length!==4 || new Set(c.gio).size!==4 || c.gio.join()!==q._gio.join() || (q._cau!=='B' && n%2!==0 && q._lv!==2) || !kiemMCQ(q)) return false;
    if(q._lv===2){ var hit=[a===t,b===t].filter(Boolean).length; return q.choices.join()==='Cầu A,Cầu B' && hit===1 && ((q._dung==='Cầu A')===(a===t)) && c.gio.indexOf(t)>=0 && c.gio.filter(function(v){ return v===t; }).length===1; }
    var e = q._cau==='A' ? a : (q._cau==='B' ? b : n/2*3);
    return t===e && c.gio.filter(function(v){ return v===e; }).length===1 && q.choices.length===4 && q._dung==='Giỏ '+e && e<100; }},

  /* D4 — Thiệp của Mai và Rô-bốt (Tiết 1, Luyện tập 3) */
  {name:'Thiệp của Mai và Rô-bốt', sec:'Tiết 1, Luyện tập 3 — Mai làm 27 tấm thiệp, số thiệp của Rô-bốt gấp 3 lần', mt:['MT2'], levels:3,
   muc:['Số thiệp của Rô-bốt gấp k lần của Mai (27 × 3).', 'Chọn phép tính: gấp là nhân, không phải cộng.', 'Số nhỏ hơn, gấp 4 lần; hoặc Rô-bốt hơn Mai bao nhiêu tấm.'],
   make:function(lv){
    var a, k;
    if(lv<=1){ a=pick([27,18,24,12,21]); k=3; while(a*k>=100){ a=rnd(10,30); } }
    else if(lv===2){ a=rnd(12,30); k=rnd(3,4); while(a*k>=100){ a=rnd(12,30); } }
    else { a=rnd(12,24); k=4; while(a*k>=100){ a=rnd(12,20); } }
    var T=a*k;
    if(lv===2){ var dung=a+' × '+k, ds=[[dung,''],[a+' + '+k,'nham-gap-them'],[a+' : '+k,'nham-chieu'],[a+' − '+k,'chon-sai-phep']]; shuffle(ds); var ch=ds.map(function(d){ return d[0]; }), sai={}; ds.forEach(function(d,i){ if(d[1]) sai[String(i)]=d[1]; });
      return {type:'mcq', cot:1, _lv:2, _a:a, _k:k, _dung:dung, q:nguoi('girl','Mai')+'<div>Mai làm <b>'+a+' tấm thiệp</b>. Số thiệp của Rô-bốt <b>gấp '+k+' lần</b> số thiệp của Mai. Phép tính nào tìm số thiệp của Rô-bốt?</div>', choices:ch, correct:ch.indexOf(dung), sai:sai, goiY:gy()}; }
    if(lv>=3 && Math.random()<0.5){ var hon=T-a;
      return {type:'num', _lv:3, _a:a, _k:k, _hon:true, q:nguoi('girl','Mai')+'<div>Mai làm <b>'+a+' tấm thiệp</b>. Số thiệp của Rô-bốt <b>gấp '+k+' lần</b> số thiệp của Mai. Hỏi Rô-bốt làm nhiều hơn Mai bao nhiêu tấm thiệp?</div>', ans:hon, unit:'tấm thiệp',
        sai:nhanSai([[T,'thieu-buoc'],[a+k,'nham-gap-them'],[hon+1,'nham-bang'],[a,'thieu-buoc']], hon), goiY:gy({'thieu-buoc':'Bé tìm số thiệp của Rô-bốt ('+a+' × '+k+') rồi so với Mai bằng phép trừ.'})}; }
    return {type:'num', _lv:lv, _a:a, _k:k, q:nguoi('girl','Mai')+'<div>Mai làm <b>'+a+' tấm thiệp</b>. Số thiệp của Rô-bốt <b>gấp '+k+' lần</b> số thiệp của Mai. Hỏi Rô-bốt làm được bao nhiêu tấm thiệp?</div>', ans:T, unit:'tấm thiệp',
      sai:nhanSai([[a+k,'nham-gap-them'],[a/k===Math.floor(a/k) ? a/k : 0,'nham-chieu'],[k,'nham-so-lan'],[T+1,'nham-bang']], T), goiY:gy()};
  }, check:function(q){
    var a=q._a, k=q._k, T=a*k; if(T>=100) return false;
    if(q._lv===2) return kiemMCQ(q) && q.choices.filter(function(c){ return tinhBT(c)===T; }).length===1 && tinhBT(q._dung)===T;
    return q.ans===(q._hon ? T-a : T); }},

  /* D5 — Gạo buổi chiều (Tiết 1, Luyện tập 4) */
  {name:'Gạo buổi chiều', sec:'Tiết 1, Luyện tập 4 — Buổi sáng bán 30 kg gạo, buổi chiều số gạo giảm đi 2 lần', mt:['MT2'], levels:3,
   muc:['Buổi chiều giảm đi k lần (30 : 2).', 'Chọn phép tính: giảm đi là chia, không phải trừ.', 'Số khác; cả hai buổi bán bao nhiêu ki-lô-gam (hai bước).'],
   make:function(lv){
    var k, m, a;
    if(lv<=1){ k=2; m=pick([15,10,12,20,25]); a=k*m; if(Math.random()<0.5){ a=30; m=15; } }
    else if(lv===2){ k=rnd(2,4); m=rnd(6,24); a=k*m; while(a>=100){ m=rnd(6,24); a=k*m; } }
    else { k=pick([2,3,4]); m=rnd(8,24); a=k*m; while(a>=100 || a+m>=100){ m=rnd(8,24); a=k*m; } }
    var lead='Buổi sáng cửa hàng bán được <b>'+a+' kg</b> gạo. Buổi chiều số gạo bán được <b>giảm đi '+k+' lần</b> so với buổi sáng.';
    if(lv===2){ var dung=a+' : '+k, ds=[[dung,''],[a+' − '+k,'nham-giam-bot'],[a+' × '+k,'nham-chieu'],[a+' + '+k,'chon-sai-phep']]; shuffle(ds); var ch=ds.map(function(d){ return d[0]; }), sai={}; ds.forEach(function(d,i){ if(d[1]) sai[String(i)]=d[1]; });
      return {type:'mcq', cot:1, _lv:2, _a:a, _k:k, _dung:dung, q:'<div>'+lead+' Phép tính nào tìm số gạo bán được buổi chiều?</div>', choices:ch, correct:ch.indexOf(dung), sai:sai, goiY:gy()}; }
    if(lv>=3) return {type:'num', _lv:3, _a:a, _k:k, q:'<div>'+lead+'</div><div class="mt-1">Hỏi cả hai buổi cửa hàng bán được bao nhiêu ki-lô-gam gạo?</div>', ans:a+m, unit:'kg',
      sai:nhanSai([[m,'thieu-buoc'],[a,'thieu-buoc'],[a-m,'chon-sai-phep'],[a+k,'nham-giam-bot']], a+m), goiY:gy({'thieu-buoc':'Hai bước: tìm số gạo buổi chiều ('+a+' : '+k+'), rồi cộng với buổi sáng.'})};
    return {type:'num', _lv:1, _a:a, _k:k, q:'<div>'+lead+'</div><div class="mt-1">Hỏi buổi chiều bán được bao nhiêu ki-lô-gam gạo?</div>', ans:m, unit:'kg',
      sai:nhanSai([[a-k,'nham-giam-bot'],[a*k,'nham-chieu'],[k,'nham-so-lan'],[m+1,'nham-bang']], m), goiY:gy()};
  }, check:function(q){
    var a=q._a, k=q._k, m=a/k; if(!Number.isInteger(m) || a>=100) return false;
    if(q._lv===2) return kiemMCQ(q) && q.choices.filter(function(c){ return tinhBT(c)===m; }).length===1 && tinhBT(q._dung)===m;
    return q.ans===(q._lv>=3 ? a+m : m) && q.ans<100; }},

  /* D6 — Đặt tính chia (Tiết 2, Luyện tập 1): cả chia hết (39 : 3) và có dư (73 : 4) */
  {name:'Đặt tính chia', sec:'Tiết 2, Luyện tập 1 — Đặt tính rồi tính 60 : 2, 73 : 4, 39 : 3', mt:['MT4'], levels:3,
   muc:['Chia hết: ô ? ở chữ số hàng chục của thương (60 : 2).', 'Chia hết hoặc có dư (39 : 3 = 13, 73 : 4 = 18 dư 1): ô ? ở số hạ xuống, tích thứ nhất hoặc tích thứ hai.', 'Phép chia có dư: ô ? ở số dư.'],
   make:function(lv){
    var p, an, B, g=0, ans;
    do{ g++;
      if(lv<=1){ p=phepHaiBuoc({het:true}); an='q1'; }
      else if(lv===2){ p=phepHaiBuoc({}); an=pick(['ha','t1','u']); }
      else { p=phepHaiBuoc({het:false}); an='r'; }
      B=cacBuoc(p.a,p.b); ans = an==='q1' ? B.q1 : (an==='ha' ? B.a0 : (an==='u' ? B.t0 : (an==='t1' ? B.t1 : B.r)));
    }while(g<500 && (ans<=0 || (an==='u' && B.q0===0)));
    var sai = an==='q1' ? [[B.q0,'dao-vai'],[B.t1,'tru-sai-buoc'],[B.q1+1,'nham-bang'],[B.q1-1,'nham-bang']] : (an==='ha' ? [[B.c1,'dao-vai'],[B.a1,'dao-vai'],[B.a0+1,'quen-ha'],[B.cur,'tru-sai-buoc']] : (an==='t1' ? [[B.q1,'dao-vai'],[B.a1,'dao-vai'],[B.t1+p.b,'nham-bang'],[B.t1-p.b,'nham-bang']] : (an==='u' ? [[B.cur,'tru-sai-buoc'],[B.q0,'dao-vai'],[B.t0+p.b,'nham-bang'],[B.t0-p.b,'nham-bang']] : [[B.q0,'nham-thuong-du'],[B.r+p.b,'du-lon-hon-chia'],[B.cur,'tru-sai-buoc'],[B.t0,'dao-vai']])));
    return {type:'num', _lv:lv, _pt:{a:p.a,b:p.b,an:an}, q:chiaDoc2(p.a, p.b, {an:an})+'<div>Số ở ô <b class="text-amber-700">?</b> là bao nhiêu?</div>', ans:ans, sai:nhanSai(sai, ans), goiY:gy({}, p.a, p.b)};
  }, check:function(q){
    var p=q._pt, B=cacBuoc(p.a,p.b);
    if(!kiemChia2(q) || Math.floor(p.a/10)<p.b || p.a>99) return false;
    var e = p.an==='q1' ? B.q1 : (p.an==='ha' ? B.a0 : (p.an==='u' ? B.t0 : (p.an==='t1' ? B.t1 : B.r)));
    if(p.an==='r' && B.r===0) return false;
    if(q._lv<=1 && (B.r!==0 || p.an!=='q1')) return false;
    return q.ans===e && e>0; }},

  /* D7 — Mũi tên hai bước (Tiết 2, Luyện tập 2) */
  {name:'Mũi tên hai bước', sec:'Tiết 2, Luyện tập 2 — Số? 32 gấp 3 lần rồi giảm 4 lần; 42 giảm 3 lần rồi bớt 3 đơn vị', mt:['MT5'], levels:3,
   muc:['Một mũi tên: gấp, giảm, thêm hoặc bớt (32 gấp 3 lần).', 'Hai mũi tên gấp rồi giảm (32 gấp 3 lần → giảm 4 lần), hoặc giảm rồi gấp.', 'Hai mũi tên hỗn hợp: giảm rồi bớt; gấp rồi thêm.']
   ,
   make:function(lv){
    var l1, l2, v, k1, k2, g=0, mid, end;
    if(lv<=1){ do{ l1=pick(['gap','giam','them','bot']); k1 = l1==='gap' ? rnd(2,5) : (l1==='giam' ? rnd(2,5) : rnd(2,9)); v = l1==='giam' ? k1*rnd(3,12) : rnd(5,30); g++; }while(g<500 && !okPhep(l1,v,k1));
      var ans1=ap(l1,v,k1);
      return {type:'num', _lv:1, _o:[[l1,k1]], _v:v, q:soDoGT([{v:v},{v:null}], [cuaChu(l1,k1)])+'<div>Số <b>'+v+'</b> đi qua cửa <b>'+cuaChu(l1,k1)+'</b>. Số ở ô <b class="text-amber-700">?</b> là bao nhiêu?</div>', ans:ans1,
        sai:nhanSai(nhamPhep(l1,v,k1).concat([[k1,'nham-so-lan'],[ans1+1,'nham-bang']]), ans1), goiY:gy()}; }
    do{ g++;
      if(lv===2){ var pr=pick([['gap','giam'],['giam','gap']]); l1=pr[0]; l2=pr[1]; } else { var pr2=pick([['giam','bot'],['gap','them'],['giam','them'],['gap','bot']]); l1=pr2[0]; l2=pr2[1]; }
      k1 = l1==='gap' ? rnd(2,7) : (l1==='giam' ? rnd(2,6) : rnd(2,9)); k2 = l2==='gap' ? rnd(2,5) : (l2==='giam' ? rnd(2,6) : rnd(2,9));
      v = l1==='giam' ? k1*rnd(3,14) : rnd(6,32); if(!okPhep(l1,v,k1)) continue; mid=ap(l1,v,k1); if(!okPhep(l2,mid,k2)) continue; end=ap(l2,mid,k2);
    }while(g<2000 && !(okPhep(l1,v,k1) && okPhep(l2,mid,k2) && end!==mid && end!==v && mid<=100));
    var sai=nhamPhep(l2,mid,k2).concat([[mid,'thieu-buoc'],[end+1,'nham-bang'],[end-1,'nham-bang']]);
    return {type:'num', _lv:lv, _o:[[l1,k1],[l2,k2]], _v:v, q:soDoGT([{v:v},{v:''},{v:null}], [cuaChu(l1,k1), cuaChu(l2,k2)])+'<div>Số ở ô <b class="text-amber-700">?</b> cuối cùng là bao nhiêu? (Ô nét đứt ở giữa là kết quả của phép đầu.)</div>', ans:end, sai:nhanSai(sai, end),
      goiY:gy({'thieu-buoc':'Hai phép nối nhau: ô giữa là kết quả của phép đầu, ô cuối là kết quả của phép sau.'})};
  }, check:function(q){
    var o=q._o, v=q._v, r=v, i;
    for(i=0;i<o.length;i++){ if(!okPhep(o[i][0], r, o[i][1])) return false; r=ap(o[i][0], r, o[i][1]); }
    var fig=/data-pt|<circle/.test(q.q);
    return fig && q.ans===r && (q._lv<=1 ? o.length===1 : o.length===2) && r<=100; }},

  /* D8 — Vải may quần áo (Tiết 2, Luyện tập 3): bẫy quên "còn thừa" */
  {name:'Vải may quần áo', sec:'Tiết 2, Luyện tập 3 — 35 m vải, mỗi bộ quần áo hết 3 m: may được mấy bộ, còn thừa mấy mét', mt:['MT4'], levels:3,
   muc:['May được nhiều nhất mấy bộ (35 : 3).', 'Còn thừa mấy mét vải (số dư).', 'Số khác (47 m, mỗi bộ 5 m): đã dùng bao nhiêu mét vải.'],
   make:function(lv){
    var a, b, c, g=0;
    do{ g++; b=rnd(3,9); a=lv<=2 ? rnd(20,60) : rnd(40,99); c=chia(a,b); }while(g<500 && (c.r===0 || c.q<5 || a<=b*5));
    var lead='Cô thợ may có <b>'+a+' m</b> vải. Mỗi bộ quần áo may hết <b>'+b+' m</b> vải.', ans, cau, sai, unit;
    if(lv<=1){ ans=c.q; cau='Hỏi may được nhiều nhất mấy bộ quần áo?'; unit='bộ'; sai=[[c.q+1,'nham-bang'],[c.r,'nham-thuong-du'],[c.q-1,'nham-bang'],[a-b,'cong-thay-nhan']]; }
    else if(lv===2){ ans=c.r; cau='Sau khi may được nhiều nhất, còn thừa mấy mét vải?'; unit='m'; sai=[[c.q,'nham-thuong-du'],[c.r+b,'du-lon-hon-chia'],[c.r+1,'nham-bang'],[b-c.r,'nham-bang']]; }
    else { ans=b*c.q; cau='Hỏi đã dùng bao nhiêu mét vải để may nhiều nhất các bộ quần áo?'; unit='m'; sai=[[a,'quen-thua'],[c.q,'thieu-buoc'],[ans+b,'nham-bang'],[c.r,'nham-thuong-du']]; }
    return {type:'num', _lv:lv, _a:a, _b:b, q:'<div>'+lead+'</div><div class="mt-1">'+cau+'</div>', ans:ans, unit:unit, sai:nhanSai(sai, ans),
      goiY:gy({'quen-thua':'Vải còn thừa thì không dùng hết: bé nhân số bộ với '+b+' m rồi mới ra số mét đã dùng.', 'nham-bang':a+' : '+b+' = '+c.q+' (dư '+c.r+').'}, a, b)};
  }, check:function(q){
    var c=chia(q._a,q._b); if(c.r===0 || q._a>=100) return false;
    var e = q._lv<=1 ? c.q : (q._lv===2 ? c.r : q._b*c.q); return q.ans===e && e>0; }},

  /* D9 — Ngày hội trồng cây (Tiết 2, Luyện tập 4) */
  {name:'Ngày hội trồng cây', sec:'Tiết 2, Luyện tập 4 — Việt trồng 5 cây, Rô-bốt trồng gấp 3 lần Việt: hai bạn trồng bao nhiêu cây', mt:['MT3'], levels:3,
   muc:['Bước 1: Rô-bốt trồng bao nhiêu cây (5 × 3).', 'Hai bước: cả hai bạn trồng bao nhiêu cây (5 + 15).', 'Số lớn hơn; chọn dãy hai phép tính đúng.'],
   make:function(lv){
    var a=lv<=2 ? rnd(3,9) : rnd(5,12), k=rnd(2,4); while(a*(k+1)>=100){ k=2; }
    var b=a*k, T=a+b, lead='Ngày hội trồng cây, Việt trồng <b>'+a+' cây</b>. Rô-bốt trồng <b>gấp '+k+' lần</b> số cây của Việt.';
    if(lv<=1) return {type:'num', _lv:1, _a:a, _k:k, _kieu:'gap', q:soDoHai('gap',a,k,'Việt','Rô-bốt','r2','cây')+'<div>'+lead+'</div><div class="mt-1">Hỏi Rô-bốt trồng được bao nhiêu cây?</div>', ans:b, unit:'cây',
      sai:nhanSai([[a+k,'nham-gap-them'],[T,'tra-loi-sai-buoc'],[b+1,'nham-bang']], b), goiY:gy({'tra-loi-sai-buoc':'Câu này chỉ hỏi Rô-bốt, bé chưa cộng với Việt.'})};
    if(lv===2) return {type:'num', _lv:2, _a:a, _k:k, _kieu:'gap', q:soDoHai('gap',a,k,'Việt','Rô-bốt','tong','cây')+'<div>'+lead+'</div><div class="mt-1">Hỏi cả hai bạn trồng được bao nhiêu cây?</div>', ans:T, unit:'cây',
      sai:nhanSai([[b,'tra-loi-sai-buoc'],[2*a+k,'nham-gap-them'],[a,'thieu-buoc'],[T+1,'nham-bang']], T), goiY:gy({'tra-loi-sai-buoc':'Bé tìm số cây của Rô-bốt trước ('+a+' × '+k+'), rồi cộng với số cây của Việt.'})};
    var p1=pt(a,'×',k), ok=[p1, pt(a,'+',b)], s1=pt(a,'+',k), ds=[[ok,''],[[s1,pt(a,'+',s1.r)],'nham-gap-them'],[[p1,pt(b,TRU,a)],'chon-sai-phep'],[[p1],'thieu-buoc']];
    var txt=function(o){ return o.map(function(p){ return p.s; }).join(', rồi '); };
    shuffle(ds); var ch=ds.map(function(d){ return txt(d[0]); }), dung=txt(ok), sai={}; ds.forEach(function(d,i){ if(d[1]) sai[String(i)]=d[1]; });
    return {type:'mcq', cot:1, _lv:3, _a:a, _k:k, _ds:ds.map(function(d){ return d[0]; }), _dung:dung, q:'<div>'+lead+'</div><div class="mt-1">Hỏi cả hai bạn trồng được bao nhiêu cây? Chọn các phép tính đúng.</div>', choices:ch, correct:ch.indexOf(dung), sai:sai, goiY:gy()};
  }, check:function(q){
    var a=q._a, k=q._k, b=a*k, T=a+b; if(T>=100) return false;
    if(q._lv<=2) return kiemSoDo(q) && q.ans===(q._lv<=1 ? b : T);
    var dem=q._ds.filter(function(o){ var p1=o[0], p2=o[1]; return p1.x===a && p1.op==='×' && p1.y===k && p1.r===b && p2 && p2.op==='+' && ((p2.x===a && p2.y===b) || (p2.x===b && p2.y===a)); }).length;
    return kiemMCQ(q) && q.choices.length===4 && dem===1; }},

  /* D10 — Bạn nói đúng hay sai (không có trong SGK): phục vụ MT3 và MT4 */
  {name:'Bạn nói đúng hay sai', sec:'Tìm lỗi — Đúng / Sai; bạn An nói về bài trồng cây và bài may quần áo', mt:['MT3','MT4'], levels:3,
   muc:['Đúng / Sai: số cây của Rô-bốt, số bộ quần áo may được.', 'Bạn An nói: cả hai bạn trồng x cây; 35 : 3 = 11 hết vải (quên "còn thừa").', 'Bạn An nói với số lớn hơn: em thấy thế nào?'],
   make:function(lv, mt){
    var tt = mt==='MT4' ? 4 : 3;
    if(tt===3){ var a=lv<=2 ? rnd(4,9) : rnd(10,20), k=rnd(2,4); while(a*(k+1)>=100) k=2; var b=a*k, T=a+b;
      if(lv<=1){ var dung=Math.random()<0.5, x = dung ? b : pick([T, a+k, b+1]), tag = x===T ? 'tra-loi-sai-buoc' : (x===a+k ? 'nham-gap-them' : 'nham-bang');
        return {type:'mcq', mt:'MT3', figFn:dsBtn29, _lv:1, _tt:3, _a:a, _k:k, _x:x, _dung:(x===b?'Đ':'S'), q:'<div>Việt trồng <b>'+a+' cây</b>. Rô-bốt trồng <b>gấp '+k+' lần</b> số cây của Việt.</div><div class="text-xl font-extrabold text-orange-700 my-2">Rô-bốt trồng được '+x+' cây.</div><div class="text-base text-slate-500">Đúng (Đ) hay sai (S)?</div>', choices:['Đ','S'], correct:(x===b?0:1), sai:(x===b?{}:{'0':tag}), goiY:gy()}; }
      var x2 = Math.random()<0.5 ? T : (Math.random()<0.6 ? b : T+pick([-2,-1,1,2])), mo=function(n){ return a+' + '+b+' = '+n; }, hnx=haiNhanXet(x2, T, mo), sai3={}; sai3[String(1-hnx.correct)] = x2===b ? 'thieu-buoc' : 'nham-bang';
      return {type:'mcq', mt:'MT3', cot:1, _lv:lv, _tt:3, _a:a, _k:k, _x:x2, _T:T, _ds:hnx.ds, _dung:hnx.choices[hnx.correct], q:nguoi('boy','Bạn An')+'<div>Việt trồng '+a+' cây. Rô-bốt trồng gấp '+k+' lần số cây của Việt, tức là '+b+' cây. Bạn An nói: «Cả hai bạn trồng được <b>'+x2+'</b> cây.» Em thấy thế nào?</div>', choices:hnx.choices, correct:hnx.correct, sai:sai3, goiY:gy()}; }
    var m, b2, c, g=0; do{ g++; b2=rnd(3,9); m=lv<=2 ? rnd(20,60) : rnd(40,99); c=chia(m,b2); }while(g<500 && (c.r===0 || c.q<5 || m<=b2*5));
    if(lv<=1){ var dung4=Math.random()<0.5, xb=dung4 ? c.q : pick([c.q+1,c.q-1,c.r]), yr=dung4 ? c.r : (xb===c.q ? c.r+1 : c.r), tr=(xb===c.q && yr===c.r);
      if(!dung4 && xb===c.q) yr=c.r+1; tr=(xb===c.q && yr===c.r);
      return {type:'mcq', mt:'MT4', figFn:dsBtn29, _lv:1, _tt:4, _a:m, _b:b2, _x:xb, _y:yr, _dung:(tr?'Đ':'S'), q:'<div>Có <b>'+m+' m</b> vải. Mỗi bộ quần áo may hết <b>'+b2+' m</b> vải.</div><div class="text-xl font-extrabold text-orange-700 my-2">May được '+xb+' bộ và còn thừa '+yr+' m vải.</div><div class="text-base text-slate-500">Đúng (Đ) hay sai (S)?</div>', choices:['Đ','S'], correct:(tr?0:1), sai:(tr?{}:{'0': xb===c.r ? 'nham-thuong-du' : 'nham-bang'}), goiY:gy({}, m, b2)}; }
    if(lv===2){ var dungC='Không đồng ý, vì '+b2+' × '+c.q+' = '+(b2*c.q)+', còn thừa '+c.r+' m', saiC='Đồng ý, vì '+m+' : '+b2+' = '+c.q+', vừa hết vải', ch=[dungC,saiC]; shuffle(ch);
      return {type:'mcq', mt:'MT4', cot:1, _lv:2, _tt:4, _a:m, _b:b2, _dung:dungC, q:nguoi('boy','Bạn An')+'<div>Có '+m+' m vải. Mỗi bộ quần áo may hết '+b2+' m vải. Bạn An nói: «'+m+' : '+b2+' = '+c.q+' nên may được '+c.q+' bộ và <b>vừa hết vải</b>.» Em thấy thế nào?</div>', choices:ch, correct:ch.indexOf(dungC), sai:(function(){ var o={}; o[String(ch.indexOf(saiC))]='quen-thua'; return o; })(), goiY:gy({}, m, b2)}; }
    var xr = Math.random()<0.5 ? c.r : (Math.random()<0.6 ? c.q : c.r+pick([1,-1])), mo2=function(n){ return m+' : '+b2+' = '+c.q+' (dư '+n+')'; }, T4=c.r;
    if(xr<=0) xr=c.r+1;
    var hn=haiNhanXet(xr, T4, mo2), sai4={}; sai4[String(1-hn.correct)] = xr===c.q ? 'nham-thuong-du' : 'nham-bang';
    return {type:'mcq', mt:'MT4', cot:1, _lv:3, _tt:4, _a:m, _b:b2, _x:xr, _T:T4, _ds:hn.ds, _dung:hn.choices[hn.correct], q:nguoi('boy','Bạn An')+'<div>Có '+m+' m vải. Mỗi bộ quần áo may hết '+b2+' m vải, may được '+c.q+' bộ. Bạn An nói: «Còn thừa <b>'+xr+' m</b> vải.» Em thấy thế nào?</div>', choices:hn.choices, correct:hn.correct, sai:sai4, goiY:gy({}, m, b2)};
  }, check:function(q){
    if(q._tt===3){ var a=q._a, k=q._k, b=a*k, T=a+b; if(T>=100) return false;
      if(q._lv<=1) return q.mt==='MT3' && q.choices.join()==='Đ,S' && (q._dung==='Đ')===(q._x===b) && q.correct===(q._x===b?0:1);
      return q.mt==='MT3' && kiemNhanXet(q) && q._T===T; }
    var c=chia(q._a,q._b); if(c.r===0 || q._a>=100) return false;
    if(q._lv<=1) return q.mt==='MT4' && q.choices.join()==='Đ,S' && (q._dung==='Đ')===(q._x===c.q && q._y===c.r) && q.correct===((q._x===c.q && q._y===c.r)?0:1);
    if(q._lv===2) return q.mt==='MT4' && q.choices.length===2 && q.choices[q.correct]===q._dung && q._dung.indexOf('Không đồng ý')===0 && q._dung.indexOf('còn thừa '+c.r+' m')>0 && new Set(q.choices).size===2;
    return q.mt==='MT4' && kiemNhanXet(q) && q._T===c.r; }}
 ]
};
