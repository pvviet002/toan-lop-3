/* bai-32.js — Bài 32: Mi-li-lít. BÀI MỚI, Engine v2 — LUYỆN THÔNG MINH.
   Theo bảng phân tích sư phạm (phan-tich-su-pham/bai-32.md) và chỉnh sửa của thầy trên PR #19:
   4 MỤC TIÊU (muctieu) × 10 DẠNG (topics), mỗi dạng 3 mức (Thông tư 27).
   Ca đong: mỗi vạch ứng với 100 ml (ca 500 ml có 5 khoảng, ca 1 l có 10 khoảng); nhãn số ở 500 ml và 1 l; mức nước chỉ ở bội của 100 ml.
   Lỗi lớn nhất: nhầm ml với l, nhầm bội (1 l = 100 ml), quên đổi đơn vị, trả lời bước giữa.
   Số đo tới 1 000 (đổi đơn vị có thể ra 1 000 trở lên); viết "1 000"; không số thập phân, không phân số.
   Hình mới viết ngay trong file này (không sửa figures.js): caDong, hangCa (ca đong có vạch, data-ml), quaCa (các ca 100 ml, data-dem="ca"); theTinh chép từ bài 24.
   Mọi đẳng thức trong phương án đúng số học; các phương án khác nhau ở hệ số đổi.
   QUY TẮC: nối chuỗi, KHÔNG backtick và KHÔNG template literal. */

/* ---- Tiện ích chung ---- */
function nhanSai(ds, dung){ var o={}; ds.forEach(function(p){ var v=p[0]; if(Number.isInteger(v) && v>0 && v!==dung && !(String(v) in o)) o[String(v)]=p[1]; }); return o; }
function kiemMCQ(q){ return q.choices[q.correct]===q._dung && new Set(q.choices).size===q.choices.length; }
function dsBtn32(ch){ return '<span class="text-2xl font-extrabold text-slate-700">'+ch+'</span><span class="ml-2 text-base font-bold text-slate-600">'+(ch==='Đ'?'Đúng':'Sai')+'</span>'; }
function svgX(w, h, px){ return svgHinh(w, h, px).replace('<svg ', '<svg class="text-slate-700" '); }
function demDem(s, loai){ var m=String(s).match(new RegExp('data-dem="'+loai+'"', 'g')); return m ? m.length : 0; }
function khungHinh(s){ return '<div class="flex justify-center my-2">'+s+'</svg></div>'; }
function nguoi(ten, alt){ return '<div class="flex justify-center mb-1">'+anh(ten, 72, alt)+'</div>'; }
function kyHieu(nhan, bt){ return '<div class="text-slate-500 mb-1">'+nhan+'</div><div class="text-3xl font-extrabold text-orange-600">'+bt+'</div>'; }
function so(n){ return n>=1000 ? Math.floor(n/1000)+' '+('00'+(n%1000)).slice(-3) : String(n); }
var GOI={'nham-ml-l':'1 l nặng bằng 1 000 ml. Mi-li-lít là đơn vị nhỏ, dùng cho lượng nước ít; lít dùng cho lượng nước nhiều hơn.', 'nham-boi':'1 l = 1 000 ml.', 'quen-doi':'Muốn cộng trừ hay so sánh, bé đổi về cùng mi-li-lít: 1 l = 1 000 ml.',
  'nham-bang':'Bé tính lại cho đúng nhé!', 'cong-thay-nhan':'Nhân với một số, không phải cộng.', 'chon-sai-phep':'Bé đọc kỹ: rót ra là trừ, thêm vào là cộng, gấp là nhân, giảm đi là chia.', 'thieu-buoc':'Bài này cần làm đủ các bước nhé!',
  'dao-vai':'Bé xem lại: ô trả lời là số nào?', 'dem-sot-phep':'Bé đếm lại các vạch hoặc các ca nhé!', 'tra-loi-sai-buoc':'Bé đọc lại câu hỏi cuối: còn một bước nữa mới ra đáp số.', 'nham-gap-them':'Gấp n lần là nhân với n. Thêm n đơn vị mới là cộng n.', 'nham-chieu':'Giảm đi là chia, gấp lên là nhân.'};
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
function docThe(s){ var o=[], re=/<span class="inline-block px-3 py-2[^>]*>([^<]*)<\/span>/g, m; while((m=re.exec(String(s)))) o.push(m[1]); return o; }

/* ---- Hình mới 1 (D1, D2, D4, D7): ca đong có vạch mỗi 100 ml. ds = [{ml, cap, ten}] (tối đa 3 ca, cap = 500 hoặc 1000); nhãn số ở 500 và "1 l";
   mức nước data-ml (ml), data-cap, data-j (số thứ tự ca); vạch data-v. ---- */
function hangCa(ds){
  var n=ds.length, mc=0, k; ds.forEach(function(d){ mc=Math.max(mc,d.cap); });
  var PX=14, SW=118, L=n===1 ? 60 : 24, W=n===1 ? 240 : L+n*SW+12, yb=66+PX*mc/100, H=yb+40, s=svgX(W,H);
  ds.forEach(function(d,j){
    var x0=L+j*SW, bx=x0+46, bw=52, yt=yb-PX*d.cap/100, yw=yb-PX*d.ml/100;
    s+='<text x="'+(bx-6)+'" y="'+(yt-26)+'" text-anchor="end" font-size="18" '+HFONT+' fill="currentColor">ml</text>';
    s+='<rect data-ml="'+d.ml+'" data-cap="'+d.cap+'" data-j="'+j+'" x="'+bx+'" y="'+yw+'" width="'+bw+'" height="'+(yb-yw)+'" fill="'+HM.troi+'" fill-opacity="0.65"/>';
    s+='<path d="M'+bx+' '+yt+' V'+yb+' H'+(bx+bw)+' V'+yt+'" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>'
      +'<path d="M'+(bx+bw)+' '+(yt+12)+' Q'+(bx+bw+14)+' '+(yt+12)+' '+(bx+bw+14)+' '+(yt+28)+' Q'+(bx+bw+14)+' '+(yt+44)+' '+(bx+bw)+' '+(yt+44)+'" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"/>';
    for(k=1;k<=d.cap/100;k++){ var y=yb-PX*k, lon=(k===5 || k===10);
      s+='<line data-v="'+k+'" x1="'+(bx-(lon?14:8))+'" y1="'+y+'" x2="'+bx+'" y2="'+y+'" stroke="currentColor" stroke-width="'+(lon?2.4:1.6)+'" stroke-linecap="round"/>';
      if(lon) s+='<text x="'+(bx-18)+'" y="'+(y+6)+'" text-anchor="end" font-size="18" '+HFONT+' fill="currentColor">'+(k===10 ? '1 l' : '500')+'</text>'; }
    if(d.ten) s+='<text x="'+(bx+bw/2)+'" y="'+(yb+27)+'" text-anchor="middle" font-size="18" '+HFONT+' fill="currentColor">'+d.ten+'</text>';
  });
  return khungHinh(s);
}
function caDong(ml, cap, ten){ return hangCa([{ml:ml, cap:cap, ten:ten||''}]); }
function docCa(s){ var o=[], re=/data-ml="(\d+)" data-cap="(\d+)" data-j="(\d+)"/g, m, v=String(s).match(/data-v="/g); while((m=re.exec(String(s)))) o.push({ml:+m[1], cap:+m[2], j:+m[3]}); return {ca:o, vach:v ? v.length : 0}; }

/* ---- Hình mới 2 (D2): n ca nhỏ 100 ml xếp 4 một hàng; mỗi ca data-dem="ca" ---- */
function quaCa(n){
  var moi=4, hang=Math.ceil(n/moi), W=moi*72-6+48, H=hang*52+20, s=svgX(W,H), i;
  for(i=0;i<n;i++){ var x=24+(i%moi)*72, y=10+Math.floor(i/moi)*52;
    s+='<rect data-dem="ca" x="'+x+'" y="'+y+'" width="66" height="40" rx="9" fill="'+HM.troi+'" fill-opacity="0.45" stroke="currentColor" stroke-width="2.5"/>'
      +'<text x="'+(x+33)+'" y="'+(y+26)+'" text-anchor="middle" font-size="17" '+HFONT+' fill="currentColor">100 ml</text>'; }
  return khungHinh(s);
}

var CA_VAT=[['Thìa thuốc',5,'ml'],['Chai nước',500,'ml'],['Bình nước',2,'l'],['Xô nước',10,'l'],['Ly nước',200,'ml'],['Nồi canh',3,'l']];

var BAI = {
 n: 32,
 title: 'Mi-li-lít',
 sub: 'Luyện thông minh: câu hỏi tự đổi theo bé — làm hết lượt để xem ngọn lửa!',
 goal: 10, soCau: 18, soCauToiDa: 24,
 loi: {'nham-ml-l':'Nhầm mi-li-lít với lít', 'nham-boi':'Nhầm bội của đơn vị (10, 100, 1 000)', 'quen-doi':'Quên đổi đơn vị', 'tra-loi-sai-buoc':'Trả lời bước giữa thay vì bước cuối', 'nham-gap-them':'Nhầm "gấp n lần" với "thêm n đơn vị"', 'dem-sot-phep':'Đếm sót hoặc thừa vạch, thừa ca'},
 muctieu: [
  {id:'MT1', ten:'Mi-li-lít và lít', muc:['Ca đầy là 1 l = ? ml; 1 l gồm mấy ca 100 ml.', '2 l = ? ml; 3 000 ml = ? l; thìa thuốc, chai nước: ml hay l.', 'Đổi số lớn (7 l = ? ml); đủ 1 l cần bao nhiêu ca; 800 ml và 1 l.']},
  {id:'MT2', ten:'Đọc ca đong, cộng các ca', muc:['Đọc mức nước một ca (500 ml); hai ca.', 'Đọc mức nước bằng cách đếm vạch 100 ml; ba ca rót vào bình (500 + 200 + 300).', 'Đọc mức nước trên nhãn 500 ml (600 đến 900 ml); bình 1 l còn thiếu bao nhiêu.']},
  {id:'MT3', ten:'Tính với mi-li-lít', muc:['100 ml + 20 ml; 8 ml × 4.', '120 ml − 20 ml; 12 ml × 3; 16 ml gấp 3 lần.', 'Số lớn (386 ml + 214 ml; 25 ml × 3; 96 ml : 4); phép nào cho kết quả 60 ml.']},
  {id:'MT4', ten:'Giải toán và vận dụng', muc:['Phích 1 000 ml, rót ra 200 ml; chai dầu 750 ml còn 350 ml; 1 l = 1 000 ml đúng hay sai.', 'Rót ba lần (200 + 200 + 100): còn 500 ml; hai ca nước: đã dùng bao nhiêu; bạn nói 200 ml nhiều hơn 2 l.', 'Số khác; biết đã dùng, tìm lúc đầu; bạn nói 3 l bằng 300 ml.']}
 ],
 topics: [
  /* D1 — Đọc ca đong (Khám phá) */
  {name:'Đọc ca đong', sec:'Khám phá — Ca đong có vạch chia: mức nước 500 ml là nửa ca; ca đầy là 1 l', mt:['MT2'], levels:3,
   muc:['Mức nước ở nhãn 500 ml hoặc ca đầy (1 l).', 'Đếm các vạch 100 ml từ đáy ca (200, 300, 400 ml).', 'Mức nước trên nhãn 500 ml: đếm các khoảng tiếp theo (600 đến 900 ml).'],
   make:function(lv){
    var ml = lv<=1 ? pick([500,1000]) : (lv===2 ? pick([100,200,300,400]) : pick([600,700,800,900]));
    var sai = [[ml/100,'dem-sot-phep'],[ml+100,'dem-sot-phep'],[ml-100,'dem-sot-phep'],[ml*10,'nham-boi'],[ml===1000 ? 1 : ml,'nham-ml-l']];
    return {type:'num', _lv:lv, _ml:ml, q:caDong(ml,1000,'Ca đong')+'<div>Mức nước trong ca đong là bao nhiêu mi-li-lít? (Mỗi vạch nhỏ là 100 ml.)</div>', ans:ml, unit:'ml', sai:nhanSai(sai, ml),
      goiY:gy({'dem-sot-phep':'Bé đếm từng vạch từ đáy ca: mỗi vạch là 100 ml. Vạch lớn ghi 500 ml và 1 l.', 'nham-ml-l':'Ca đầy là 1 l, tức là 1 000 ml.'})};
  }, check:function(q){
    var d=docCa(q.q); return d.ca.length===1 && d.ca[0].cap===1000 && d.ca[0].ml===q._ml && d.ca[0].ml%100===0 && d.vach===10 && q.ans===q._ml && q._ml>0 && q._ml<=1000; }},

  /* D2 — Nửa ca và một lít (Khám phá) */
  {name:'Nửa ca và một lít', sec:'Khám phá — 500 ml là nửa ca; 1 l = 1 000 ml', mt:['MT1'], levels:3,
   muc:['Ca đầy là 1 l: 1 l = ? ml.', 'Hai ca 500 ml rót vào bình: được mấy lít.', 'Đủ một bình cần bao nhiêu ca 100 ml (đếm các ca trong hình).'],
   make:function(lv){
    if(lv<=1) return {type:'num', _lv:1, _ml:1000, q:caDong(1000,1000,'Ca đầy')+'<div>Ca đầy chứa <b>1 l</b> nước. 1 l bằng bao nhiêu mi-li-lít?</div>', ans:1000, unit:'ml', sai:nhanSai([[100,'nham-boi'],[10,'nham-boi'],[1,'nham-ml-l']], 1000), goiY:gy()};
    if(lv===2) return {type:'num', _lv:2, _ml:500, q:hangCa([{ml:500,cap:500,ten:'Ca 1'},{ml:500,cap:500,ten:'Ca 2'}])+'<div>Rót cả hai ca đầy <b>500 ml</b> vào một bình. Trong bình có bao nhiêu lít nước?</div>', ans:1, unit:'l', sai:nhanSai([[1000,'quen-doi'],[500,'thieu-buoc'],[2,'dem-sot-phep'],[100,'nham-boi']], 1), goiY:gy({'quen-doi':'Hai ca 500 ml là 1 000 ml, tức là 1 l.', 'thieu-buoc':'Bé cộng cả hai ca, rồi đổi sang lít.'})};
    var n=pick([5,10]), tong=100*n;
    return {type:'num', _lv:3, _n:n, q:quaCa(n)+'<div>Rót đầy các ca <b>100 ml</b> trong hình vào một bình thì được '+(n===10 ? '<b>1 l</b>' : '<b>500 ml</b>')+'. Trong hình có bao nhiêu ca?</div>', ans:n, unit:'ca', sai:nhanSai([[n+1,'dem-sot-phep'],[n-1,'dem-sot-phep'],[tong,'dao-vai'],[10*n,'nham-boi']], n), goiY:gy()};
  }, check:function(q){
    if(q._lv<=1){ var d=docCa(q.q); return d.ca.length===1 && d.ca[0].ml===1000 && q.ans===1000; }
    if(q._lv===2){ var d2=docCa(q.q); return d2.ca.length===2 && d2.ca.every(function(c){ return c.ml===500 && c.cap===500; }) && q.ans===1; }
    return demDem(q.q,'ca')===q._n && q.ans===q._n && (q._n===5 || q._n===10); }},

  /* D3 — Đổi l và ml (Khám phá) */
  {name:'Đổi l và ml', sec:'Khám phá — 1 l = 1 000 ml', mt:['MT1'], levels:3,
   muc:['1 l = ? ml; 1 000 ml = ? l.', '2 l = ? ml; 3 000 ml = ? l.', '7 l = ? ml; 8 000 ml = ? l.'],
   make:function(lv){
    var k = lv<=1 ? 1 : (lv===2 ? rnd(2,3) : rnd(4,9)), dir=Math.random()<0.5, ans, bt, sai;
    if(dir){ ans=1000*k; bt=k+' l = '+oHoi()+' ml'; sai=[[100*k,'nham-boi'],[k,'quen-doi'],[10*k,'nham-boi'],[1000*k+100,'nham-bang']]; }
    else { ans=k; bt=so(1000*k)+' ml = '+oHoi()+' l'; sai=[[1000*k,'quen-doi'],[100*k,'nham-boi'],[10*k,'nham-boi'],[k+1,'nham-bang']]; }
    return {type:'num', _lv:lv, _k:k, _dir:dir, q:kyHieu('Đổi đơn vị', bt), ans:ans, sai:nhanSai(sai, ans), goiY:gy()};
  }, check:function(q){ return q.ans===(q._dir ? 1000*q._k : q._k) && q._k>=1 && q._k<=9; }},

  /* D4 — Ba ca vào bình (Hoạt động 1) */
  {name:'Ba ca vào bình', sec:'Hoạt động 1 — Ba ca đong rót vào bình: 500 ml + 200 ml + 300 ml = 1 000 ml', mt:['MT2'], levels:3,
   muc:['Hai ca rót vào bình (500 ml + 200 ml).', 'Ba ca rót vào bình (500 + 200 + 300 = 1 000).', 'Ba ca rót vào bình 1 l: còn thiếu bao nhiêu mi-li-lít.'],
   make:function(lv){
    var n = lv<=1 ? 2 : 3, vals, g=0, T;
    do{ vals=[]; for(var i=0;i<n;i++) vals.push(100*rnd(1,5)); T=vals.reduce(function(a,b){ return a+b; },0); g++; }while(g<300 && ((lv===2 && (T>1000 || T<500)) || (lv>=3 && (T>=1000 || T<500)) || (lv<=1 && T>900)));
    if(lv===2 && g>=300){ vals=[500,200,300]; T=1000; } if(lv>=3 && g>=300){ vals=[500,200,200]; T=900; } if(lv<=1 && g>=300){ vals=[500,200]; T=700; }
    var ten=['Ca A','Ca B','Ca C'], ds=vals.map(function(v,i){ return {ml:v, cap:500, ten:ten[i]}; });
    var ans = lv>=3 ? 1000-T : T, cau = lv>=3 ? 'Bình đựng đầy <b>1 l</b>. Rót cả ba ca vào bình thì còn thiếu bao nhiêu mi-li-lít mới đầy bình?' : 'Rót tất cả các ca vào một bình. Trong bình có bao nhiêu mi-li-lít nước?';
    var sai = lv>=3 ? [[T,'tra-loi-sai-buoc'],[1000+T,'chon-sai-phep'],[ans+100,'nham-bang'],[ans-100,'nham-bang']] : [[T-vals[0],'thieu-buoc'],[T+100,'nham-bang'],[T-100,'nham-bang'],[Math.abs(vals[0]-vals[1]),'chon-sai-phep']];
    return {type:'num', _lv:lv, _vals:vals, q:hangCa(ds)+'<div>'+cau+'</div>', ans:ans, unit:'ml', sai:nhanSai(sai, ans), goiY:gy({'tra-loi-sai-buoc':'Bé tính số nước trong bình trước, rồi so với 1 000 ml để tìm số còn thiếu.', 'thieu-buoc':'Bé cộng nước của tất cả các ca.'})};
  }, check:function(q){
    var d=docCa(q.q), vs=d.ca.map(function(c){ return c.ml; }), T=vs.reduce(function(a,b){ return a+b; },0);
    if(vs.join()!==q._vals.join() || d.ca.some(function(c){ return c.cap!==500 || c.ml>500 || c.ml%100!==0; }) || d.ca.length!==(q._lv<=1 ? 2 : 3)) return false;
    return q.ans===(q._lv>=3 ? 1000-T : T) && q.ans>0 && T<=1000; }},

  /* D5 — Phích nước (Hoạt động 2) */
  {name:'Phích nước', sec:'Hoạt động 2 — Phích đựng 1 l nước, rót ra ba lần: 200 ml, 200 ml, 100 ml', mt:['MT4'], levels:3,
   muc:['Phích 1 000 ml, rót ra một lần: còn bao nhiêu.', 'Rót ra ba lần (200 + 200 + 100): còn bao nhiêu.', 'Số khác (150 + 250 + 100): còn bao nhiêu.'],
   make:function(lv){
    var a, b, c, ans, cau, sai, T;
    if(lv<=1){ a=100*rnd(1,6); ans=1000-a; cau='Phích đựng <b>1 000 ml</b> nước. Rót ra <b>'+a+' ml</b>. Trong phích còn bao nhiêu mi-li-lít nước?'; sai=[[a,'dao-vai'],[1000+a,'chon-sai-phep'],[ans+100,'nham-bang'],[ans-100,'nham-bang']]; return {type:'num', _lv:1, _p:[a], q:'<div>'+cau+'</div>', ans:ans, unit:'ml', sai:nhanSai(sai, ans), goiY:gy()}; }
    var u = lv===2 ? 100 : 50, g=0; do{ a=u*rnd(1,5); b=u*rnd(1,5); c=u*rnd(1,3); T=a+b+c; g++; }while(g<300 && (T>=900 || T<400));
    ans=1000-T; sai=[[T,'tra-loi-sai-buoc'],[1000-a,'thieu-buoc'],[1000-a-b,'thieu-buoc'],[1000+T,'chon-sai-phep'],[ans+50,'nham-bang']];
    return {type:'num', _lv:lv, _p:[a,b,c], q:'<div>Phích đựng <b>1 l</b> nước. Lần một rót ra <b>'+a+' ml</b>, lần hai rót ra <b>'+b+' ml</b>, lần ba rót ra <b>'+c+' ml</b>. Trong phích còn bao nhiêu mi-li-lít nước?</div>', ans:ans, unit:'ml', sai:nhanSai(sai, ans),
      goiY:gy({'tra-loi-sai-buoc':'Bé tính số nước đã rót ra ('+a+' + '+b+' + '+c+') trước, rồi lấy 1 000 trừ đi.', 'thieu-buoc':'Bé trừ đủ cả ba lần rót.'})};
  }, check:function(q){ var T=q._p.reduce(function(a,b){ return a+b; },0); return q.ans===1000-T && T<1000 && q.ans>0 && q._p.length===(q._lv<=1 ? 1 : 3); }},

  /* D6 — Tính với ml (Luyện tập 1) */
  {name:'Tính với ml', sec:'Luyện tập 1 — 100 ml + 20 ml = 120 ml; 120 ml − 20 ml = 100 ml; 8 ml × 4 = 32 ml; 12 ml × 3 = 36 ml', mt:['MT3'], levels:3,
   muc:['100 ml + 20 ml; 8 ml × 4.', '120 ml − 20 ml; 12 ml × 3; 16 ml gấp 3 lần.', 'Số lớn (386 ml + 214 ml; 25 ml × 3; 96 ml : 4).'],
   make:function(lv){
    var kind = lv<=1 ? pick(['c','n']) : (lv===2 ? pick(['t','n','ch']) : pick(['c3','t3','n3','ch3'])), a, b, ans, bt, sai;
    if(kind==='c'){ a=10*rnd(5,50); b=10*rnd(1,9); if(Math.random()<0.4){ a=100; b=10*rnd(1,9); } ans=a+b; bt=a+' ml + '+b+' ml ='+oHoi(); sai=[[ans+10,'nham-bang'],[ans-10,'nham-bang'],[Math.abs(a-b),'chon-sai-phep']]; }
    else if(kind==='t'){ a=10*rnd(30,90); b=10*rnd(2,20); ans=a-b; bt=a+' ml − '+b+' ml ='+oHoi(); sai=[[a+b,'chon-sai-phep'],[ans+10,'nham-bang'],[ans-10,'nham-bang']]; }
    else if(kind==='n'){ a=lv<=1 ? rnd(6,9) : rnd(11,19); b=lv<=1 ? 4 : 3; ans=a*b; bt=a+' ml × '+b+' ='+oHoi(); sai=[[a+b,'cong-thay-nhan'],[ans+10,'nham-bang'],[ans-10,'nham-bang']]; }
    else if(kind==='ch'){ b=pick([4,5,3]); ans=rnd(6,16); a=b*ans; bt=a+' ml : '+b+' ='+oHoi(); sai=[[a-b,'chon-sai-phep'],[ans+1,'nham-bang'],[ans-1,'nham-bang']]; }
    else if(kind==='c3'){ do{ a=rnd(150,600); b=rnd(100,Math.min(500,990-a)); }while((a%10)+(b%10)<10 && Math.random()<0.8); ans=a+b; bt=a+' ml + '+b+' ml ='+oHoi(); sai=[[ans-10,'nham-bang'],[ans+10,'nham-bang'],[ans+100,'nham-bang']]; }
    else if(kind==='t3'){ a=rnd(400,990); b=rnd(120,a-100); ans=a-b; bt=a+' ml − '+b+' ml ='+oHoi(); sai=[[ans+10,'nham-bang'],[ans-10,'nham-bang'],[ans+100,'nham-bang'],[a+b>1000?0:a+b,'chon-sai-phep']]; }
    else if(kind==='n3'){ a=rnd(21,32); b=3; while(a*b>=100) a--; ans=a*b; bt=a+' ml × '+b+' ='+oHoi(); sai=[[a+b,'cong-thay-nhan'],[ans+10,'nham-bang'],[ans-10,'nham-bang']]; }
    else { b=pick([4,6]); ans=rnd(14,24); a=b*ans; while(a>=100){ ans--; a=b*ans; } bt=a+' ml : '+b+' ='+oHoi(); sai=[[a-b,'chon-sai-phep'],[ans+1,'nham-bang'],[ans-1,'nham-bang']]; }
    return {type:'num', _lv:lv, _kind:kind, _a:a, _b:b, q:kyHieu('Tính', bt), ans:ans, unit:'ml', sai:nhanSai(sai, ans), goiY:gy()};
  }, check:function(q){
    var a=q._a, b=q._b, k=q._kind, e = (k==='c'||k==='c3') ? a+b : ((k==='t'||k==='t3') ? a-b : ((k==='n'||k==='n3') ? a*b : a/b));
    return q.ans===e && Number.isInteger(e) && e>0 && e<=1000 && a<=1000; }},

  /* D7 — Chai dầu ăn (Luyện tập 2) */
  {name:'Chai dầu ăn', sec:'Luyện tập 2 — Chai dầu ăn 750 ml, dùng một lúc còn 350 ml: đã dùng bao nhiêu mi-li-lít', mt:['MT4'], levels:3,
   muc:['Biết lúc đầu và còn lại, tìm đã dùng (750 ml, 350 ml).', 'Đọc hai ca đong (lúc đầu, lúc sau), tìm đã dùng.', 'Biết đã dùng và còn lại, tìm lúc đầu.'],
   make:function(lv){
    var a, b, d, cau, ans, sai, fig='';
    if(lv<=1){ a=50*rnd(8,19); b=50*rnd(2,Math.floor(a/50)-3); d=a-b; ans=d; cau='Chai dầu ăn có <b>'+a+' ml</b> dầu. Cô dùng một lúc, trong chai còn <b>'+b+' ml</b>. Cô đã dùng bao nhiêu mi-li-lít dầu?'; sai=[[a+b>1000?0:a+b,'chon-sai-phep'],[b,'thieu-buoc'],[ans+50,'nham-bang'],[ans-50,'nham-bang']]; }
    else if(lv===2){ a=100*rnd(5,10); b=100*rnd(1,(a/100)-2); d=a-b; ans=d; fig=hangCa([{ml:a,cap:1000,ten:'Lúc đầu'},{ml:b,cap:1000,ten:'Lúc sau'}]); cau='Trong hai ca đong là lượng dầu ăn lúc đầu và lúc sau. Đã dùng bao nhiêu mi-li-lít dầu?'; sai=[[a,'thieu-buoc'],[b,'thieu-buoc'],[a+b>1000?0:a+b,'chon-sai-phep'],[ans+100,'dem-sot-phep'],[ans-100,'dem-sot-phep']]; }
    else { b=50*rnd(2,10); d=50*rnd(2,10); a=b+d; while(a>1000){ d-=50; a=b+d; } ans=a; cau='Cô đã dùng <b>'+d+' ml</b> dầu ăn, trong chai còn <b>'+b+' ml</b>. Lúc đầu chai có bao nhiêu mi-li-lít dầu?'; sai=[[Math.abs(d-b),'chon-sai-phep'],[d,'dao-vai'],[b,'dao-vai'],[ans+50,'nham-bang']]; }
    return {type:'num', _lv:lv, _a:a, _b:b, _d:d, _fig:!!fig, q:fig+'<div>'+cau+'</div>', ans:ans, unit:'ml', sai:nhanSai(sai, ans), goiY:gy({'chon-sai-phep':'Dùng đi là trừ: lúc đầu trừ lúc sau là số đã dùng. Tìm lúc đầu thì cộng.', 'dao-vai':'Lúc đầu là số lớn nhất: bé cộng đã dùng với còn lại.'})};
  }, check:function(q){
    var a=q._a, b=q._b, d=q._d;
    if(q._fig){ var c=docCa(q.q); if(c.ca.length!==2 || c.ca[0].ml!==a || c.ca[1].ml!==b || c.ca.some(function(x){ return x.cap!==1000 || x.ml%100!==0; })) return false; }
    else if(q._lv===2) return false;
    return a-b===d && q.ans===(q._lv>=3 ? a : d) && a<=1000 && b>0 && d>0; }},

  /* D8 — Gấp và giảm số đo (không có trong SGK) */
  {name:'Gấp và giảm số đo', sec:'Gấp và giảm số đo — 12 ml gấp 3 lần; phép nào cho kết quả 60 ml', mt:['MT3'], levels:3,
   muc:['12 ml gấp 3 lần; 96 ml giảm 4 lần (một phép).', 'Phép nào cho kết quả 60 ml (chọn một trong bốn thẻ).', 'Trong tám thẻ, có mấy thẻ cho kết quả 60 ml.'],
   make:function(lv){
    if(lv<=1){ var gap=Math.random()<0.5, a, k, ans, bt, sai;
      if(gap){ a=rnd(12,19); k=rnd(3,5); while(a*k>=100){ a=rnd(12,19); } ans=a*k; bt=a+' ml gấp '+k+' lần ='+oHoi(); sai=[[a+k,'nham-gap-them'],[ans+10,'nham-bang'],[k,'nham-bang']]; }
      else { k=rnd(2,4); ans=rnd(12,30); a=k*ans; while(a>=100){ ans--; a=k*ans; } bt=a+' ml giảm '+k+' lần ='+oHoi(); sai=[[a-k,'chon-sai-phep'],[a*k,'nham-chieu'],[ans+1,'nham-bang']]; }
      return {type:'num', _lv:1, _gap:gap, _a:a, _k:k, q:kyHieu('Tính', bt), ans:ans, unit:'ml', sai:nhanSai(sai, ans), goiY:gy()}; }
    var T=pick([24,36,48,60,72,80]), sl = lv===2 ? 4 : 8, nd = lv===2 ? 1 : pick([2,3]), g, ds, vals=[];
    for(g=2;g<=9;g++){ if(T%g===0 && T/g>=2) vals.push(T/g+' × '+g); if(T*g<100) vals.push((T*g)+' : '+g); } for(g=1;g<=60;g++){ if(g!==T && T-g>=2) vals.push(g+' + '+(T-g)); }
    var exact=vals.filter(function(t){ return tinhBT(t)===T; }), nhieu=[], i;
    for(g=0;g<300;g++){ var p=rnd(4,90), r=rnd(2,9), kind=rnd(0,2), t = kind===0 ? p+' × '+r : (kind===1 ? (p*r<100 ? (p*r)+' : '+r : p+' − '+r) : p+' + '+r); if(tinhBT(t)!==T && Number.isInteger(tinhBT(t)) && tinhBT(t)>0 && tinhBT(t)<100) nhieu.push(t); }
    shuffle(exact); shuffle(nhieu); var d=exact.slice(0,nd), kh=[]; for(i=0;i<nhieu.length && kh.length<sl-nd;i++){ if(kh.every(function(x){ return tinhBT(x)!==tinhBT(nhieu[i]); }) && tinhBT(nhieu[i])!==T) kh.push(nhieu[i]); }
    ds=shuffle(d.concat(kh));
    if(lv===2){ var dung=d[0];
      return {type:'mcq', cot:1, _lv:2, _ds:ds, _T:T, _dung:dung, q:theTinh(ds)+'<div>Mỗi thẻ là một lượng nước tính bằng mi-li-lít. Phép tính nào có kết quả bằng <b class="text-2xl text-orange-600">'+T+'</b>?</div>', choices:ds, correct:ds.indexOf(dung), goiY:gy({'chung':'Bé tính kết quả của từng thẻ, rồi tìm thẻ bằng '+T+'.'})}; }
    var dem=ds.filter(function(t){ return tinhBT(t)===T; }).length;
    return {type:'num', _lv:3, _ds:ds, _T:T, q:theTinh(ds)+'<div>Mỗi thẻ là một lượng nước tính bằng mi-li-lít. Có bao nhiêu thẻ có kết quả bằng <b class="text-2xl text-orange-600">'+T+'</b>?</div>', ans:dem, unit:'thẻ', sai:nhanSai([[dem+1,'dem-sot-phep'],[dem-1,'dem-sot-phep'],[dem+2,'dem-sot-phep']], dem), goiY:gy()};
  }, check:function(q){
    if(q._lv<=1){ var e = q._gap ? q._a*q._k : q._a/q._k; return Number.isInteger(e) && q.ans===e && e<100; }
    var ds=q._ds, v=ds.map(function(t){ return tinhBT(t); }); if(!v.every(Number.isInteger) || v.some(function(x){ return x<=0 || x>=100; })) return false;
    var dem=v.filter(function(x){ return x===q._T; }).length;
    if(docThe(q.q).join('|')!==ds.join('|')) return false;
    if(q._lv===2) return kiemMCQ(q) && ds.length===4 && dem===1 && tinhBT(q._dung)===q._T;
    return ds.length===8 && q.ans===dem && dem>=2 && dem<=3; }},

  /* D9 — Chọn ml hay l (không có trong SGK) */
  {name:'Chọn ml hay l', sec:'Chọn đơn vị — mi-li-lít hay lít; so sánh 800 ml với 1 l', mt:['MT1'], levels:3,
   muc:['Thìa thuốc ho chứa 5 … (ml hay l).', 'Chai nước, bình nước, xô nước, ly nước, nồi canh: ml hay l.', 'So sánh số đo khác đơn vị: 800 ml và 1 l.'],
   make:function(lv){
    if(lv<=2){ var vs = lv<=1 ? [CA_VAT[0],CA_VAT[1],CA_VAT[2],CA_VAT[3]] : CA_VAT, it=pick(vs);
      var ch=['ml','l'], dung=it[2], sai={}; ch.forEach(function(c,i){ if(c!==dung) sai[String(i)]='nham-ml-l'; });
      return {type:'mcq', cot:1, _lv:lv, _it:it, _dung:dung, q:'<div class="text-xl font-extrabold text-orange-600 my-1">'+it[0]+' chứa '+it[1]+' …</div><div>Điền đơn vị nào cho hợp lí?</div>', choices:ch, correct:ch.indexOf(dung), sai:sai, goiY:gy()}; }
    var X=100*rnd(3,15), Y=rnd(1,2), ch3=[so(X)+' ml nhiều hơn', Y+' l nhiều hơn', 'Hai lượng nước bằng nhau'], T=Y*1000, dung3 = X>T ? ch3[0] : (X<T ? ch3[1] : ch3[2]), sai3={};
    ch3.forEach(function(c,i){ if(c!==dung3) sai3[String(i)] = i===2 ? 'quen-doi' : 'nham-ml-l'; });
    return {type:'mcq', cot:1, _lv:3, _X:X, _Y:Y, _dung:dung3, q:'<div>So sánh <b>'+so(X)+' ml</b> và <b>'+Y+' l</b>. Lượng nước nào nhiều hơn?</div>', choices:ch3, correct:ch3.indexOf(dung3), sai:sai3, goiY:gy({'chung':'Bé đổi '+Y+' l ra mi-li-lít ('+so(T)+' ml), rồi so sánh với '+so(X)+' ml.'})};
  }, check:function(q){
    if(q._lv<=2) return kiemMCQ(q) && q.choices.join()==='ml,l' && q._dung===q._it[2];
    var X=q._X, T=q._Y*1000, e = X>T ? so(X)+' ml nhiều hơn' : (X<T ? q._Y+' l nhiều hơn' : 'Hai lượng nước bằng nhau'); return kiemMCQ(q) && q._dung===e && q.choices.length===3; }},

  /* D10 — Bạn nói đúng hay sai (không có trong SGK) */
  {name:'Bạn nói đúng hay sai', sec:'Tìm lỗi — 1 l = 1 000 ml đúng hay sai; bạn An nói 200 ml nhiều hơn 2 l', mt:['MT4'], levels:3,
   muc:['Đúng / Sai: một phép đổi l và ml.', 'Bạn An so sánh số đo khác đơn vị: em thấy thế nào.', 'Bạn An nói k l bằng x ml: em thấy thế nào.'],
   make:function(lv){
    var k, T;
    if(lv<=1){ k=rnd(1,5); var dung=Math.random()<0.5, x = dung ? 1000*k : pick([100*k, k, 10*k]), tr=(x===1000*k), tag = x===k ? 'nham-ml-l' : 'nham-boi';
      return {type:'mcq', figFn:dsBtn32, _lv:1, _k:k, _x:x, _dung:(tr?'Đ':'S'), q:'<div class="text-xl font-extrabold text-orange-700 my-2">'+k+' l = '+so(x)+' ml.</div><div class="text-base text-slate-500">Đúng (Đ) hay sai (S)?</div>', choices:['Đ','S'], correct:(tr?0:1), sai:(tr?{}:{'0':tag}), goiY:gy()}; }
    if(lv===2){ var Y=rnd(2,5), X=100*rnd(2,9), nhieu=Math.random()<0.5, T2=1000*Y, claim = nhieu ? Y+' l nhiều hơn '+X+' ml' : X+' ml nhiều hơn '+Y+' l', dungC, saiC;
      if(nhieu){ dungC='Đồng ý, vì '+Y+' l = '+so(T2)+' ml, mà '+so(T2)+' ml lớn hơn '+X+' ml'; saiC='Không đồng ý, vì '+X+' lớn hơn '+Y; }
      else { dungC='Không đồng ý, vì '+Y+' l = '+so(T2)+' ml, mà '+X+' ml nhỏ hơn '+so(T2)+' ml'; saiC='Đồng ý, vì '+X+' lớn hơn '+Y; }
      var ch=[dungC,saiC]; shuffle(ch); var s2={}; s2[String(ch.indexOf(saiC))]='nham-ml-l';
      return {type:'mcq', cot:1, _lv:2, _X:X, _Y:Y, _nhieu:nhieu, _dung:dungC, q:nguoi('boy','Bạn An')+'<div>Bạn An nói: «<b>'+claim+'</b>.» Em thấy thế nào?</div>', choices:ch, correct:ch.indexOf(dungC), sai:s2, goiY:gy()}; }
    k=rnd(2,9); T=1000*k; var fx = Math.random()<0.5 ? 1000 : pick([1,100]), x3=k*fx, ptT=k+' × 1 000 = '+so(T), ch3, dung3, s3={};
    if(fx===1000){ dung3='Đồng ý, vì '+ptT; ch3=[dung3, 'Không đồng ý, vì '+k+' × 100 = '+so(100*k)]; } else { dung3='Không đồng ý, vì '+ptT; ch3=[dung3, 'Đồng ý, vì '+k+' × '+fx+' = '+so(x3)]; }
    shuffle(ch3); s3[String(1-ch3.indexOf(dung3))] = fx===1000 ? 'nham-bang' : (fx===1 ? 'nham-ml-l' : 'nham-boi');
    return {type:'mcq', cot:1, _lv:3, _k:k, _x:x3, _T:T, _fx:fx, _dung:dung3, q:nguoi('boy','Bạn An')+'<div>Bạn An nói: «<b>'+k+' l</b> bằng <b>'+so(x3)+' ml</b>.» Em thấy thế nào?</div>', choices:ch3, correct:ch3.indexOf(dung3), sai:s3, goiY:gy({'chung':'Bé nhớ 1 l = 1 000 ml, rồi tính '+k+' × 1 000.'})};
  }, check:function(q){
    if(q._lv<=1) return q.choices.join()==='Đ,S' && (q._dung==='Đ')===(q._x===1000*q._k) && q.correct===(q._x===1000*q._k?0:1);
    if(q._lv===2){ var T2=1000*q._Y; return q._X<T2 && q._X>q._Y && kiemMCQ(q) && q.choices.length===2 && q._dung.indexOf(q._nhieu ? 'Đồng ý' : 'Không đồng ý')===0; }
    var eq=/^(Đồng ý|Không đồng ý), vì (\d+) × ([\d ]+) = ([\d ]+)$/, okEq=q.choices.every(function(c){ var m=eq.exec(c); return m && (+m[2])*(+m[3].replace(/ /g,''))===+m[4].replace(/ /g,''); });
    var agree=(q._x===q._T), k=q._k;
    return okEq && q.choices.length===2 && new Set(q.choices).size===2 && q._T===1000*k && q._x===k*q._fx && q.choices[q.correct]===q._dung && q._dung.indexOf(agree ? 'Đồng ý' : 'Không đồng ý')===0 && q._dung.indexOf(k+' × 1 000 = '+so(q._T))>0; }}
 ]
};
