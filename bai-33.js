/* bai-33.js — Bài 33: Nhiệt độ. Đơn vị đo nhiệt độ. BÀI MỚI, Engine v2 — LUYỆN THÔNG MINH.
   Theo bảng phân tích sư phạm (phan-tich-su-pham/bai-33.md): 4 MỤC TIÊU (muctieu) × 9 DẠNG (topics), mỗi dạng 3 mức (Thông tư 27).
   Chỉ dùng nhiệt độ từ 0 °C trở lên; không số âm, không số thập phân. Nhiệt độ cơ thể bình thường 37 °C.
   Hình mới viết ngay trong file này (không sửa figures.js): nhietKe (nhiệt kế nằm ngang, thuỷ ngân đỏ, vạch mỗi 1 °C); check() đọc data-t, data-lo, data-hi và số vạch từ SVG.
   Mọi phép tính trong phương án đúng số học.
   QUY TẮC: nối chuỗi, KHÔNG backtick và KHÔNG template literal. */

/* ---- Tiện ích chung ---- */
function nhanSai(ds, dung){ var o={}; ds.forEach(function(p){ var v=p[0]; if(Number.isInteger(v) && v>0 && v!==dung && !(String(v) in o)) o[String(v)]=p[1]; }); return o; }
function kiemMCQ(q){ return q.choices[q.correct]===q._dung && new Set(q.choices).size===q.choices.length; }
function dsBtn33(ch){ return '<span class="text-2xl font-extrabold text-slate-700">'+ch+'</span><span class="ml-2 text-base font-bold text-slate-600">'+(ch==='Đ'?'Đúng':'Sai')+'</span>'; }
function svgX(w, h, px){ return svgHinh(w, h, px).replace('<svg ', '<svg class="text-slate-700" '); }
function demDem(s, loai){ var m=String(s).match(new RegExp('data-dem="'+loai+'"', 'g')); return m ? m.length : 0; }
function khungHinh(s){ return '<div class="flex justify-center my-2">'+s+'</svg></div>'; }
function nguoi(ten, alt){ return '<div class="flex justify-center mb-1">'+anh(ten, 72, alt)+'</div>'; }
function kyHieu(nhan, bt){ return '<div class="text-slate-500 mb-1">'+nhan+'</div><div class="text-3xl font-extrabold text-orange-600">'+bt+'</div>'; }
function so(n){ return n>=1000 ? Math.floor(n/1000)+' '+('00'+(n%1000)).slice(-3) : String(n); }
var GOI={'doc-sai-vach':'Bé đọc số ở nhãn gần nhất, rồi đếm thêm từng vạch nhỏ: mỗi vạch là 1 độ.', 'nham-cao-thap':'Số lớn hơn thì nóng hơn; số bé hơn thì lạnh hơn.', 'nham-bang':'Bé tính lại cho đúng nhé!', 'nham-hang':'Bé đọc kỹ từng chữ số nhé!',
  'chon-sai-phep':'Hơn kém bao nhiêu độ thì lấy số lớn trừ số bé.', 'thieu-buoc':'Bé làm đủ các bước nhé!', 'dao-vai':'Bé xem lại: ô trả lời là số nào?', 'dem-sot-phep':'Bé đếm lại các vạch nhé!'};
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

/* Đọc số bằng chữ (chỉ các số có cách đọc không bất thường) */
function vn(n){
  var d=['không','một','hai','ba','bốn','năm','sáu','bảy','tám','chín'], c=Math.floor(n/10), u=n%10, s;
  if(c===0) return d[u];
  s = c===1 ? 'mười' : d[c]+' mươi';
  if(u===0) return s;
  return s+' '+(u===5 ? 'lăm' : d[u]);
}
var SO_DOC=[10,12,13,15,16,17,18,19,20,22,23,25,26,27,28,29,30,32,33,35,36,37,38,39,40];

/* ---- Hình mới (D3, D4): nhiệt kế nằm ngang. Thang lo..hi, vạch mỗi 1 °C (data-v), nhãn mỗi 5 °C (thang rộng) hoặc mỗi 1 °C (thang hẹp);
   thuỷ ngân đỏ tới t: rect có data-t, data-lo, data-hi. ---- */
function nhietKe(t, lo, hi){
  var W=372, x0=56, x1=W-34, u=(x1-x0)/(hi-lo), H=118, s=svgX(W,H), k, buoc = hi-lo>10 ? 5 : 1, xt=x0+(t-lo)*u;
  s+='<rect x="'+x0+'" y="38" width="'+(x1-x0+16)+'" height="26" rx="13" fill="'+HM.xam+'" fill-opacity="0.5" stroke="currentColor" stroke-width="2.5"/>';
  s+='<circle cx="'+(x0-8)+'" cy="51" r="17" fill="'+HM.do+'" stroke="currentColor" stroke-width="2.5"/>';
  s+='<rect data-t="'+t+'" data-lo="'+lo+'" data-hi="'+hi+'" x="'+(x0-8)+'" y="45" width="'+(xt-x0+8).toFixed(1)+'" height="12" rx="6" fill="'+HM.do+'"/>';
  for(k=lo;k<=hi;k++){ var x=x0+(k-lo)*u, lon=((k-lo)%buoc===0);
    s+='<line data-v="'+k+'" x1="'+x.toFixed(1)+'" y1="66" x2="'+x.toFixed(1)+'" y2="'+(66+(lon?14:7))+'" stroke="currentColor" stroke-width="'+(lon?2.4:1.4)+'" stroke-linecap="round"/>';
    if(lon) s+='<text x="'+x.toFixed(1)+'" y="104" text-anchor="middle" font-size="17" '+HFONT+' fill="currentColor">'+k+'</text>'; }
  return khungHinh(s);
}
function docNhiet(s){ var d=/data-t="(\d+)" data-lo="(\d+)" data-hi="(\d+)"/.exec(String(s)), v=String(s).match(/data-v="/g); return d ? {t:+d[1], lo:+d[2], hi:+d[3], vach:v ? v.length : 0} : null; }
function docNhietNhieu(s){ var o=[], re=/data-t="(\d+)" data-lo="(\d+)" data-hi="(\d+)"/g, m; while((m=re.exec(String(s)))) o.push({t:+m[1], lo:+m[2], hi:+m[3]}); return o; }
function tenBang(rows){ var s='<div class="overflow-x-auto my-2"><table class="mx-auto border-collapse text-lg font-bold text-slate-700"><tbody>'; rows.forEach(function(r){ s+='<tr><td class="border-2 border-amber-300 px-4 py-2">'+r[0]+'</td><td class="border-2 border-amber-300 px-4 py-2 text-orange-700">'+r[1]+' °C</td></tr>'; }); return s+'</tbody></table></div>'; }
function docBang(s){ var o=[], re=/<td class="border-2 border-amber-300 px-4 py-2">([^<]*)<\/td><td class="border-2 border-amber-300 px-4 py-2 text-orange-700">(\d+) °C<\/td>/g, m; while((m=re.exec(String(s)))) o.push([m[1], +m[2]]); return o; }

var BAI = {
 n: 33,
 title: 'Nhiệt Độ. Đơn Vị Đo Nhiệt Độ',
 sub: 'Luyện thông minh: câu hỏi tự đổi theo bé — làm hết lượt để xem ngọn lửa!',
 goal: 10, soCau: 18, soCauToiDa: 24,
 loi: {'doc-sai-vach':'Đọc sai vạch nhiệt kế', 'nham-cao-thap':'Nhầm cao hơn với thấp hơn', 'nham-hang':'Nhầm khi đọc, viết số', 'dem-sot-phep':'Đếm sót hoặc thừa vạch'},
 muctieu: [
  {id:'MT1', ten:'Nóng, lạnh và độ C', muc:['Cốc nào nóng nhất; 10 °C đọc là gì.', 'Nóng hơn hay lạnh hơn; "hai mươi lăm độ xê" viết là.', 'Xếp từ lạnh nhất đến nóng nhất; đọc số có hai chữ số.']},
  {id:'MT2', ten:'Đọc nhiệt kế', muc:['Mức thuỷ ngân ở vạch có số (30 °C); nhiệt kế y tế 37 °C.', 'Vạch 5 °C, 15 °C; hai nhiệt kế y tế: ai cao hơn.', 'Đếm vạch từ nhãn gần nhất (27 °C); hai nhiệt kế: cao hơn bao nhiêu độ.']},
  {id:'MT3', ten:'So sánh và tính nhiệt độ', muc:['Hai nơi, nơi nào cao hơn; buổi nào nóng nhất; 38 °C cao hơn 37 °C đúng hay sai.', 'Ba nơi, nơi nào thấp nhất; thấp nhất, cao nhất; có cao hơn bình thường không.', 'Cao hơn bao nhiêu độ; cao nhất hơn thấp nhất bao nhiêu độ; mấy người cao hơn bình thường.']},
  {id:'MT4', ten:'Vận dụng', muc:['Trời lạnh nên mặc gì; 35 °C nóng hơn 25 °C đúng hay sai.', 'Cơ thể 39 °C nên làm gì; bạn nói Sa Pa nóng hơn Hà Nội.', 'Buổi nào nên mang áo ấm; bạn nói Nam cao hơn bình thường 1 độ.']}
 ],
 topics: [
  /* D1 — Nóng và lạnh (Khám phá a) */
  {name:'Nóng và lạnh', sec:'Khám phá — Cốc A nước nóng, chai B nước nguội, cốc C nước đá', mt:['MT1'], levels:3,
   muc:['Vật nào nóng nhất hoặc lạnh nhất.', 'Nước cốc này nóng hơn hay lạnh hơn nước chai kia.', 'Xếp ba vật từ lạnh nhất đến nóng nhất.'],
   make:function(lv){
    var v=shuffle([['Cốc A','nước nóng',3],['Chai B','nước nguội (nước thường)',2],['Cốc C','nước đá',1]]), ch, dung, sai={}, cau, tag='nham-cao-thap';
    var lead='<div>'+v.map(function(x){ return x[0]+' đựng '+x[1]; }).join('. ')+'.</div>';
    if(lv<=1){ var nong=Math.random()<0.5; cau = nong ? 'Cốc hoặc chai nào có nước nóng nhất?' : 'Cốc hoặc chai nào có nước lạnh nhất?'; ch=v.map(function(x){ return x[0]; }); var best=v.slice().sort(function(a,b){ return nong ? b[2]-a[2] : a[2]-b[2]; })[0]; dung=best[0]; }
    else if(lv===2){ var p=shuffle(v.slice()).slice(0,2), a=p[0], b=p[1]; ch=['nóng hơn','lạnh hơn']; dung = a[2]>b[2] ? 'nóng hơn' : 'lạnh hơn'; cau='Nước ở '+a[0].toLowerCase()+' nóng hơn hay lạnh hơn nước ở '+b[0].toLowerCase()+'?'; lead='<div>'+a[0]+' đựng '+a[1]+'. '+b[0]+' đựng '+b[1]+'.</div>'; }
    else { var ord=function(arr){ return arr.slice().sort(function(a,b){ return a[2]-b[2]; }).map(function(x){ return x[0]; }).join(', '); };
      var perms=[[0,1,2],[0,2,1],[1,0,2],[1,2,0],[2,0,1],[2,1,0]].map(function(p){ return p.map(function(i){ return v[i]; }).map(function(x){ return x[0]; }).join(', '); });
      ch=shuffle(perms).slice(0,4); dung=ord(v); if(ch.indexOf(dung)<0) ch[0]=dung; ch=shuffle(ch); cau='Xếp từ lạnh nhất đến nóng nhất:'; }
    ch.forEach(function(c,i){ if(c!==dung) sai[String(i)]=tag; });
    return {type:'mcq', cot:1, _lv:lv, _v:v, _dung:dung, q:lead+'<div class="mt-1">'+cau+'</div>', choices:ch, correct:ch.indexOf(dung), sai:sai, goiY:gy({'nham-cao-thap':'Nước nóng thì nhiệt độ cao, nước đá thì nhiệt độ thấp.'})};
  }, check:function(q){
    var v=q._v, e;
    if(q._lv<=1){ var nong=/nóng nhất/.test(q.q); var s=v.slice().sort(function(a,b){ return nong ? b[2]-a[2] : a[2]-b[2]; }); e=s[0][0]; return kiemMCQ(q) && q._dung===e && q.choices.length===3; }
    if(q._lv===2){ var m=/Nước ở (cốc|chai) (\w) nóng hơn hay lạnh hơn nước ở (cốc|chai) (\w)/.exec(q.q); if(!m) return false; var f=function(k){ return v.filter(function(x){ return x[0].toLowerCase()===k; })[0][2]; }; var a=f(m[1]+' '+m[2].toLowerCase()), b=f(m[3]+' '+m[4].toLowerCase()); return kiemMCQ(q) && q._dung===(a>b ? 'nóng hơn' : 'lạnh hơn'); }
    e=v.slice().sort(function(a,b){ return a[2]-b[2]; }).map(function(x){ return x[0]; }).join(', '); return kiemMCQ(q) && q._dung===e && q.choices.length===4; }},

  /* D2 — Đọc và viết độ C (Khám phá b) */
  {name:'Đọc và viết độ C', sec:'Khám phá — 10 °C đọc là "mười độ xê"', mt:['MT1'], levels:3,
   muc:['10 °C đọc là gì.', '"Hai mươi lăm độ xê" viết là.', 'Đọc số có hai chữ số (36 °C, 38 °C).'],
   make:function(lv){
    var n = lv<=1 ? pick([10,20,30,40]) : pick(SO_DOC), ch, dung, sai={}, cau, doc=function(m){ return vn(m)+' độ xê'; };
    if(lv<=1||lv===3){ var alt=SO_DOC.filter(function(x){ return x!==n && (x%10===n%10 || Math.floor(x/10)===Math.floor(n/10) || (x%10===Math.floor(n/10) && Math.floor(x/10)===n%10)); });
      var ds=[n]; shuffle(alt).forEach(function(x){ if(ds.length<4) ds.push(x); }); while(ds.length<4){ var z=pick(SO_DOC); if(ds.indexOf(z)<0) ds.push(z); }
      ch=shuffle(ds.map(function(m){ return doc(m); })); dung=doc(n); cau='<div class="text-slate-500 mb-1">Đọc nhiệt độ</div><div class="text-3xl font-extrabold text-orange-600">'+n+' °C</div><div>đọc là:</div>'; }
    else { var d2=[n]; var sw=(n%10)*10+Math.floor(n/10); [sw, n+10, n-10, n+1, n-1].forEach(function(x){ if(x>0 && x<=60 && d2.indexOf(x)<0 && d2.length<4) d2.push(x); }); ch=shuffle(d2.map(function(m){ return m+' °C'; })); dung=n+' °C'; cau='<div class="text-slate-500 mb-1">Viết nhiệt độ</div><div class="text-2xl font-extrabold text-orange-600">'+doc(n)+'</div><div>viết là:</div>'; }
    ch.forEach(function(c,i){ if(c!==dung) sai[String(i)]= lv===2 ? 'nham-hang' : 'nham-hang'; });
    return {type:'mcq', cot:1, _lv:lv, _n:n, _dung:dung, q:cau, choices:ch, correct:ch.indexOf(dung), sai:sai, goiY:gy()};
  }, check:function(q){
    var n=q._n, doc=function(m){ return vn(m)+' độ xê'; };
    if(q._lv===2) return kiemMCQ(q) && q._dung===n+' °C' && q.choices.length===4 && q.choices.every(function(c){ return /^\d+ °C$/.test(c); });
    return kiemMCQ(q) && q._dung===doc(n) && q.choices.length===4 && q.choices.filter(function(c){ return c===doc(n); }).length===1; }},

  /* D3 — Nhiệt kế không khí (Hoạt động 1a) */
  {name:'Nhiệt kế không khí', sec:'Hoạt động 1 — Mức thuỷ ngân ở vạch 30: nhiệt độ không khí ở Hà Nội là 30 °C', mt:['MT2'], levels:3,
   muc:['Mức thuỷ ngân ở vạch có số (10, 20, 30, 40).', 'Mức thuỷ ngân ở vạch 5, 15, 25, 35.', 'Đếm vạch nhỏ từ nhãn gần nhất (27, 33, 18).'],
   make:function(lv){
    var t = lv<=1 ? pick([10,20,30,40]) : (lv===2 ? pick([5,15,25,35,45]) : pick([12,17,18,22,23,27,28,32,33,37,38,42,43]));
    var near=Math.round(t/5)*5, sai=[[near===t ? t+5 : near,'doc-sai-vach'],[t+1,'dem-sot-phep'],[t-1,'dem-sot-phep'],[t+5,'doc-sai-vach'],[t-5,'doc-sai-vach']];
    return {type:'num', _lv:lv, _t:t, q:nhietKe(t,0,50)+'<div>Nhiệt kế đo nhiệt độ không khí. Mức thuỷ ngân chỉ bao nhiêu độ C?</div>', ans:t, unit:'°C', sai:nhanSai(sai, t), goiY:gy({'doc-sai-vach':'Bé tìm nhãn số gần nhất bên trái mức thuỷ ngân, rồi đếm thêm từng vạch nhỏ: mỗi vạch là 1 độ.'})};
  }, check:function(q){ var d=docNhiet(q.q); return !!d && d.lo===0 && d.hi===50 && d.vach===51 && d.t===q._t && q.ans===d.t && d.t>0 && d.t<50 && (q._lv>=3 || d.t%5===0); }},

  /* D4 — Nhiệt kế y tế (Hoạt động 2) */
  {name:'Nhiệt kế y tế', sec:'Hoạt động 2 — Nhiệt kế y tế chỉ 37 °C: Việt 37 °C, Nam 38 °C', mt:['MT2'], levels:3,
   muc:['Đọc một nhiệt kế y tế (36 đến 40 °C).', 'Hai nhiệt kế y tế: ai có nhiệt độ cao hơn.', 'Hai nhiệt kế y tế: cao hơn bao nhiêu độ.'],
   make:function(lv){
    if(lv<=1){ var t=rnd(36,40); return {type:'num', _lv:1, _t:t, q:nhietKe(t,35,42)+'<div>Nhiệt kế y tế đo nhiệt độ cơ thể. Mức thuỷ ngân chỉ bao nhiêu độ C?</div>', ans:t, unit:'°C', sai:nhanSai([[t+1,'doc-sai-vach'],[t-1,'doc-sai-vach'],[t+5,'doc-sai-vach'],[t-5,'doc-sai-vach']], t), goiY:gy({'doc-sai-vach':'Mỗi nhãn số trên nhiệt kế y tế cách nhau 1 độ. Bé đọc đúng nhãn mà mức thuỷ ngân chỉ tới.'})}; }
    var a=rnd(36,39), b=a+rnd(1,2); if(b>40) b=40; var ten=pick([['Việt','Nam'],['Mai','Lan'],['An','Bình']]), dao=Math.random()<0.5, ta=dao?b:a, tb=dao?a:b;
    var fig=nhietKe(ta,35,42), fig2=nhietKe(tb,35,42), cap=function(n){ return '<div class="text-center font-extrabold text-slate-700 mt-1">'+n+'</div>'; };
    if(lv===2){ var ch=[ten[0],ten[1]], dung = ta>tb ? ten[0] : ten[1], sai={}; sai[String(1-ch.indexOf(dung))]='nham-cao-thap';
      return {type:'mcq', cot:1, _lv:2, _ta:ta, _tb:tb, _ten:ten, _dung:dung, q:cap(ten[0])+fig+cap(ten[1])+fig2+'<div>Bác sĩ đo nhiệt độ cơ thể hai bạn. Bạn nào có nhiệt độ cao hơn?</div>', choices:ch, correct:ch.indexOf(dung), sai:sai, goiY:gy()}; }
    var e=Math.abs(ta-tb);
    return {type:'num', _lv:3, _ta:ta, _tb:tb, q:cap(ten[0])+fig+cap(ten[1])+fig2+'<div>Bác sĩ đo nhiệt độ cơ thể hai bạn. Nhiệt độ cao hơn cao hơn nhiệt độ kia bao nhiêu độ C?</div>', ans:e, unit:'°C', sai:nhanSai([[ta+tb,'chon-sai-phep'],[Math.max(ta,tb),'thieu-buoc'],[e+1,'nham-bang']], e), goiY:gy()};
  }, check:function(q){
    if(q._lv<=1){ var d=docNhiet(q.q); return !!d && d.lo===35 && d.hi===42 && d.vach===8 && d.t===q._t && q.ans===d.t; }
    var o=docNhietNhieu(q.q); if(o.length!==2 || o[0].t!==q._ta || o[1].t!==q._tb || o.some(function(x){ return x.lo!==35 || x.hi!==42; }) || q._ta===q._tb) return false;
    if(q._lv===2){ var m=q._ta>q._tb ? q._ten[0] : q._ten[1]; return kiemMCQ(q) && q._dung===m; }
    return q.ans===Math.abs(q._ta-q._tb); }},

  /* D5 — Nhiệt độ các nơi (Hoạt động 1b) */
  {name:'Nhiệt độ các nơi', sec:'Hoạt động 1 — Buổi sáng: Hà Nội 30 °C, Lào Cai 26 °C, Sa Pa 10 °C', mt:['MT3'], levels:3,
   muc:['Hai nơi: nơi nào có nhiệt độ cao hơn.', 'Ba nơi: nơi nào có nhiệt độ thấp nhất.', 'Một nơi cao hơn nơi khác bao nhiêu độ.'],
   make:function(lv){
    var nơi=shuffle(['Hà Nội','Lào Cai','Sa Pa','Huế','Đà Lạt','Hải Phòng']).slice(0,3), tt=shuffle([10,12,15,18,20,24,26,28,30,32,34]).slice(0,3).sort(function(a,b){ return b-a; }), rows=[], i;
    nơi=shuffle(nơi); for(i=0;i<3;i++) rows.push([nơi[i], tt[i]]);
    var lead='<div class="text-slate-600">Nhiệt độ không khí buổi sáng:</div>'+tenBang(rows), ch, dung, cau, sai={}, ans;
    if(lv<=1){ var p=shuffle(rows.slice()).slice(0,2), cao=Math.random()<0.5; ch=[p[0][0],p[1][0]]; var best=p[0][1]>p[1][1] ? p[0] : p[1], low=p[0][1]>p[1][1] ? p[1] : p[0]; dung = cao ? best[0] : low[0]; cau='Hỏi '+p[0][0]+' và '+p[1][0]+', nơi nào có nhiệt độ '+(cao ? 'cao hơn' : 'thấp hơn')+'?';
      ch.forEach(function(c,i){ if(c!==dung) sai[String(i)]='nham-cao-thap'; });
      return {type:'mcq', cot:1, _lv:1, _rows:rows, _p:[p[0][0],p[1][0]], _cao:cao, _dung:dung, q:lead+'<div>'+cau+'</div>', choices:ch, correct:ch.indexOf(dung), sai:sai, goiY:gy()}; }
    if(lv===2){ ch=rows.map(function(r){ return r[0]; }); dung=rows.slice().sort(function(a,b){ return a[1]-b[1]; })[0][0]; ch.forEach(function(c,i){ if(c!==dung) sai[String(i)]='nham-cao-thap'; });
      return {type:'mcq', cot:1, _lv:2, _rows:rows, _dung:dung, q:lead+'<div>Hỏi nơi nào có nhiệt độ thấp nhất?</div>', choices:ch, correct:ch.indexOf(dung), sai:sai, goiY:gy()}; }
    var hi=rows[0], lo=rows[2]; ans=hi[1]-lo[1];
    return {type:'num', _lv:3, _rows:rows, q:lead+'<div>Hỏi '+hi[0]+' có nhiệt độ cao hơn '+lo[0]+' bao nhiêu độ C?</div>', ans:ans, unit:'°C', sai:nhanSai([[hi[1]+lo[1],'chon-sai-phep'],[hi[1],'thieu-buoc'],[lo[1],'thieu-buoc'],[ans+1,'nham-bang']], ans), goiY:gy()};
  }, check:function(q){
    var r=docBang(q.q); if(r.length!==3 || r.map(function(x){ return x[0]; }).join()!==q._rows.map(function(x){ return x[0]; }).join() || r.map(function(x){ return x[1]; }).join()!==q._rows.map(function(x){ return x[1]; }).join()) return false;
    if(new Set(r.map(function(x){ return x[1]; })).size!==3) return false;
    if(q._lv===1){ var f=function(n){ return r.filter(function(x){ return x[0]===n; })[0][1]; }; var a=f(q._p[0]), b=f(q._p[1]); return kiemMCQ(q) && q._dung===(q._cao===(a>b) ? q._p[0] : q._p[1]); }
    if(q._lv===2) return kiemMCQ(q) && q._dung===r.slice().sort(function(a,b){ return a[1]-b[1]; })[0][0];
    var s=r.slice().sort(function(a,b){ return b[1]-a[1]; }); return q.ans===s[0][1]-s[2][1]; }},

  /* D6 — Dự báo trong ngày (Luyện tập 1) */
  {name:'Dự báo trong ngày', sec:'Luyện tập 1 — Dự báo nhiệt độ: sáng 27 °C, trưa 36 °C, đêm 15 °C', mt:['MT3'], levels:3,
   muc:['Buổi nào có nhiệt độ cao nhất.', 'Nhiệt độ thấp nhất hoặc cao nhất trong ngày là bao nhiêu độ.', 'Cao nhất hơn thấp nhất bao nhiêu độ.'],
   make:function(lv){
    var sang=rnd(22,30), trua=rnd(32,40), dem=rnd(10,20), rows=[['Sáng',sang],['Trưa',trua],['Đêm',dem]], lead='<div class="text-slate-600">Dự báo nhiệt độ không khí trong ngày:</div>'+tenBang(rows), ch, dung, sai={};
    if(lv<=1){ ch=['Sáng','Trưa','Đêm']; var nong=Math.random()<0.7, e = nong ? 'Trưa' : 'Đêm'; ch.forEach(function(c,i){ if(c!==e) sai[String(i)]='nham-cao-thap'; });
      return {type:'mcq', cot:1, _lv:1, _rows:rows, _nong:nong, _dung:e, q:lead+'<div>Hỏi buổi nào có nhiệt độ '+(nong ? 'cao nhất' : 'thấp nhất')+'?</div>', choices:ch, correct:ch.indexOf(e), sai:sai, goiY:gy()}; }
    if(lv===2){ var cao=Math.random()<0.5, ans=cao ? trua : dem;
      return {type:'num', _lv:2, _rows:rows, _cao:cao, q:lead+'<div>Nhiệt độ '+(cao ? 'cao nhất' : 'thấp nhất')+' trong ngày là bao nhiêu độ C?</div>', ans:ans, unit:'°C', sai:nhanSai([[cao ? dem : trua,'nham-cao-thap'],[sang,'nham-cao-thap'],[ans+1,'nham-bang']], ans), goiY:gy()}; }
    var e2=trua-dem;
    return {type:'num', _lv:3, _rows:rows, q:lead+'<div>Nhiệt độ cao nhất hơn nhiệt độ thấp nhất bao nhiêu độ C?</div>', ans:e2, unit:'°C', sai:nhanSai([[trua+dem,'chon-sai-phep'],[trua,'thieu-buoc'],[dem,'thieu-buoc'],[e2+1,'nham-bang'],[trua-sang,'thieu-buoc']], e2), goiY:gy()};
  }, check:function(q){
    var r=docBang(q.q); if(r.length!==3 || r.map(function(x){ return x[0]; }).join()!=='Sáng,Trưa,Đêm') return false;
    var tr=r[1][1], dm=r[2][1], sg=r[0][1]; if(!(tr>sg && sg>dm)) return false;
    if(q._lv===1) return kiemMCQ(q) && q._dung===(q._nong ? 'Trưa' : 'Đêm');
    if(q._lv===2) return q.ans===(q._cao ? tr : dm);
    return q.ans===tr-dm; }},

  /* D7 — Nhiệt độ cơ thể (Luyện tập 2) */
  {name:'Nhiệt độ cơ thể', sec:'Luyện tập 2 — Nhiệt độ cơ thể người bình thường là 37 °C: ai cao hơn bình thường', mt:['MT3'], levels:3,
   muc:['Đúng / Sai: một nhiệt độ cao hơn 37 °C.', 'Bạn này có nhiệt độ cao hơn bình thường không (Có / Không).', 'Trong ba người, mấy người cao hơn bình thường.'],
   make:function(lv){
    if(lv<=1){ var x=pick([36,37,38,39,40,35]), tr=(x>37), kieu=Math.random()<0.5; var ph = kieu ? x+' °C cao hơn 37 °C.' : x+' °C thấp hơn 37 °C.'; var ds=kieu ? x>37 : x<37;
      return {type:'mcq', figFn:dsBtn33, _lv:1, _x:x, _kieu:kieu, _dung:(ds?'Đ':'S'), q:'<div class="text-slate-600">Nhiệt độ cơ thể người bình thường là 37 °C.</div><div class="text-xl font-extrabold text-orange-700 my-2">'+ph+'</div><div class="text-base text-slate-500">Đúng (Đ) hay sai (S)?</div>', choices:['Đ','S'], correct:(ds?0:1), sai:(ds?{}:{'0':'nham-cao-thap'}), goiY:gy()}; }
    if(lv===2){ var t=rnd(35,40), ten=pick(['Việt','Nam','Mai','Lan']), cao=t>37, ch=['Có','Không'], dung=cao?'Có':'Không', sai={}; sai[String(ch.indexOf(cao?'Không':'Có'))]='nham-cao-thap';
      return {type:'mcq', cot:1, _lv:2, _t:t, _dung:dung, q:'<div class="text-slate-600">Nhiệt độ cơ thể người bình thường là 37 °C.</div><div>'+ten+' đo được <b>'+t+' °C</b>. Nhiệt độ của '+ten+' có cao hơn bình thường không?</div>', choices:ch, correct:ch.indexOf(dung), sai:sai, goiY:gy()}; }
    var ts, dem; do{ ts=shuffle([35,36,37,38,39,40]).slice(0,3); dem=ts.filter(function(v){ return v>37; }).length; }while(dem<1 || dem>2);
    return {type:'num', _lv:3, _ts:ts, q:'<div class="text-slate-600">Nhiệt độ cơ thể người bình thường là 37 °C.</div><div>Ba bạn đo được <b>'+ts.join(' °C, ')+' °C</b>. Có mấy bạn có nhiệt độ cao hơn bình thường?</div>', ans:dem, unit:'bạn', sai:nhanSai([[dem+1,'dem-sot-phep'],[dem-1,'dem-sot-phep'],[3-dem,'nham-cao-thap']], dem), goiY:gy({'dem-sot-phep':'Bé so sánh từng nhiệt độ với 37 °C, rồi đếm các số lớn hơn 37.'})};
  }, check:function(q){
    if(q._lv<=1){ var tr = q._kieu ? q._x>37 : q._x<37; return q.choices.join()==='Đ,S' && (q._dung==='Đ')===tr && q.correct===(tr?0:1); }
    if(q._lv===2) return q.choices.join()==='Có,Không' && q._dung===(q._t>37 ? 'Có' : 'Không') && q.choices[q.correct]===q._dung;
    return q.ans===q._ts.filter(function(v){ return v>37; }).length && q._ts.length===3 && new Set(q._ts).size===3 && q.ans>=1; }},

  /* D8 — Nên làm gì (Luyện tập 3) */
  {name:'Nên làm gì', sec:'Luyện tập 3 — Xem nhiệt kế để mặc áo cho hợp; khi sốt nhờ người lớn đo', mt:['MT4'], levels:3,
   muc:['Trời lạnh hoặc trời nóng: nên làm gì.', 'Nhiệt độ cơ thể 37 °C hoặc 39 °C: nên làm gì.', 'Ba buổi trong ngày: buổi nào nên mang áo ấm.'],
   make:function(lv){
    if(lv<=2){ var kinh = lv<=1 ? [[pick([10,12,13]),'Trời lạnh, nhiệt độ không khí là','Mặc áo ấm',['Mặc áo mỏng, đi dép','Đi bơi','Bật quạt thật mạnh']],[pick([35,36,37]),'Trời nóng, nhiệt độ không khí là','Đội mũ, uống nước mát',['Mặc áo len dày','Ngồi sưởi lửa','Đắp chăn']]] : [[39,'Em đo nhiệt độ cơ thể được','Báo ngay cho người lớn',['Chơi đá bóng','Đi tắm nước đá','Không nói với ai']],[37,'Em đo nhiệt độ cơ thể được','Bình thường, em không cần lo',['Phải đi bệnh viện ngay','Đắp chăn thật dày','Uống thuốc một mình']]], it=pick(kinh);
      var ch=shuffle([it[2]].concat(it[3])), sai={}; ch.forEach(function(c,i){ if(c!==it[2]) sai[String(i)]='nham-cao-thap'; });
      return {type:'mcq', cot:1, _lv:lv, _it:it, _dung:it[2], q:'<div>'+it[1]+' <b>'+it[0]+' °C</b>. Em nên làm gì?</div>', choices:ch, correct:ch.indexOf(it[2]), sai:sai, goiY:gy({'nham-cao-thap':'Trời lạnh thì mặc ấm; trời nóng thì mặc thoáng, uống nước; cơ thể nóng cao thì báo người lớn.'})}; }
    var sang=rnd(22,30), trua=rnd(32,40), dem=rnd(10,20), rows=[['Sáng',sang],['Trưa',trua],['Đêm',dem]], ch2=['Sáng','Trưa','Đêm'], sai2={}; ch2.forEach(function(c,i){ if(c!=='Đêm') sai2[String(i)]='nham-cao-thap'; });
    return {type:'mcq', cot:1, _lv:3, _rows:rows, _dung:'Đêm', q:'<div class="text-slate-600">Dự báo nhiệt độ không khí trong ngày:</div>'+tenBang(rows)+'<div>Buổi nào em nên mang áo ấm?</div>', choices:ch2, correct:2, sai:sai2, goiY:gy()};
  }, check:function(q){
    if(q._lv<=2){ var it=q._it; return kiemMCQ(q) && q._dung===it[2] && q.choices.length===4; }
    var r=docBang(q.q); return r.length===3 && r[2][1]<r[0][1] && r[0][1]<r[1][1] && q._dung==='Đêm' && kiemMCQ(q); }},

  /* D9 — Bạn nói đúng hay sai (không có trong SGK) */
  {name:'Bạn nói đúng hay sai', sec:'Tìm lỗi — 35 °C nóng hơn 25 °C đúng hay sai; bạn An nói Sa Pa nóng hơn Hà Nội', mt:['MT4'], levels:3,
   muc:['Đúng / Sai: so sánh hai nhiệt độ.', 'Bạn An so sánh hai nơi: em thấy thế nào.', 'Bạn An nói chênh lệch với 37 °C: em thấy thế nào.'],
   make:function(lv){
    if(lv<=1){ var a=pick([15,20,25,30,35]), b=pick([10,18,22,28,32,38]); while(a===b) b=pick([10,18,22,28,32,38]); var nong=Math.random()<0.5, tr = nong ? a>b : a<b;
      return {type:'mcq', figFn:dsBtn33, _lv:1, _a:a, _b:b, _nong:nong, _dung:(tr?'Đ':'S'), q:'<div class="text-xl font-extrabold text-orange-700 my-2">'+a+' °C '+(nong ? 'nóng hơn' : 'lạnh hơn')+' '+b+' °C.</div><div class="text-base text-slate-500">Đúng (Đ) hay sai (S)?</div>', choices:['Đ','S'], correct:(tr?0:1), sai:(tr?{}:{'0':'nham-cao-thap'}), goiY:gy()}; }
    if(lv===2){ var hn=pick([28,30,32,34]), sp=pick([10,12,15,18]), dungNong=Math.random()<0.5, claim = dungNong ? 'Hà Nội '+hn+' °C nóng hơn Sa Pa '+sp+' °C' : 'Sa Pa '+sp+' °C nóng hơn Hà Nội '+hn+' °C', dungC, saiC;
      if(dungNong){ dungC='Đồng ý, vì '+hn+' lớn hơn '+sp; saiC='Không đồng ý, vì '+sp+' nhỏ hơn '+hn; } else { dungC='Không đồng ý, vì '+sp+' nhỏ hơn '+hn; saiC='Đồng ý, vì '+sp+' nhỏ hơn '+hn; }
      var ch=[dungC,saiC]; if(dungNong===false && dungC===saiC) ch=[dungC,'Đồng ý, vì Sa Pa ở trên núi cao'];
      shuffle(ch); var s2={}; s2[String(1-ch.indexOf(dungC))]='nham-cao-thap';
      return {type:'mcq', cot:1, _lv:2, _hn:hn, _sp:sp, _dungNong:dungC.indexOf('Đồng ý')===0, _dung:dungC, q:nguoi('boy','Bạn An')+'<div>Bạn An nói: «<b>'+claim+'</b>.» Em thấy thế nào?</div>', choices:ch, correct:ch.indexOf(dungC), sai:s2, goiY:gy()}; }
    var t=rnd(38,40), claimD = Math.random()<0.5 ? t-37 : t-36, dungC3, saiC3, ch3;
    if(claimD===t-37){ dungC3='Đồng ý, vì '+t+' − 37 = '+(t-37); saiC3='Không đồng ý, vì '+t+' − 36 = '+(t-36); } else { dungC3='Không đồng ý, vì '+t+' − 37 = '+(t-37); saiC3='Đồng ý, vì '+t+' − 36 = '+(t-36); }
    ch3=shuffle([dungC3,saiC3]); var s3={}; s3[String(1-ch3.indexOf(dungC3))]='chon-sai-phep';
    return {type:'mcq', cot:1, _lv:3, _t:t, _claim:claimD, _dung:dungC3, q:nguoi('boy','Bạn An')+'<div>Nhiệt độ cơ thể người bình thường là 37 °C. Nam đo được '+t+' °C. Bạn An nói: «Nam cao hơn bình thường <b>'+claimD+' độ</b>.» Em thấy thế nào?</div>', choices:ch3, correct:ch3.indexOf(dungC3), sai:s3, goiY:gy({'chon-sai-phep':'Cao hơn bình thường bao nhiêu độ thì lấy nhiệt độ của Nam trừ 37.'})};
  }, check:function(q){
    if(q._lv<=1){ var tr = q._nong ? q._a>q._b : q._a<q._b; return q.choices.join()==='Đ,S' && (q._dung==='Đ')===tr && q.correct===(tr?0:1); }
    if(q._lv===2){ var ok = q._hn>q._sp; var dongY = /^Đồng ý/.test(q._dung); var claimNong = /Hà Nội \d+ °C nóng hơn/.test(q.q); return ok && kiemMCQ(q) && q.choices.length===2 && dongY===claimNong && (claimNong ? q._dung.indexOf(q._hn+' lớn hơn '+q._sp)>0 : q._dung.indexOf(q._sp+' nhỏ hơn '+q._hn)>0); }
    var t=q._t, eq=/^(Đồng ý|Không đồng ý), vì (\d+) − (\d+) = (\d+)$/, okEq=q.choices.every(function(c){ var m=eq.exec(c); return m && (+m[2])-(+m[3])===+m[4]; });
    var dongY = /^Đồng ý/.test(q._dung); return okEq && kiemMCQ(q) && dongY===(q._claim===t-37) && q._dung.indexOf(t+' − 37 = '+(t-37))>0; }}
 ]
};
