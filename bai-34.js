/* bai-34.js — Bài 34: Thực hành và trải nghiệm (mm, g, ml, °C). BÀI MỚI, Engine v2 — LUYỆN THÔNG MINH.
   Theo bảng phân tích sư phạm (phan-tich-su-pham/bai-34.md): 4 MỤC TIÊU (muctieu) × 8 DẠNG (topics), mỗi dạng 3 mức (Thông tư 27).
   Bài thực hành của sách đổi thành câu hỏi trên màn hình: đo trên thước vẽ sẵn (đồng xu), chọn số đo hợp với đồ vật, chọn quả cân, chọn ca nước, đọc bảng nhiệt độ, chọn nhiệt kế. Không bắt đo vật thật.
   Hình mới viết ngay trong file này (không sửa figures.js): thuocVat (vật đặt trên thước, hai đường dóng); nhietKe chép từ bài 33. check() đọc lại số từ chuỗi SVG.
   Mọi phép tính trong phương án đúng số học. Số đo tới 1 000; không số âm, không số thập phân.
   QUY TẮC: nối chuỗi, KHÔNG backtick và KHÔNG template literal. */

/* ---- Tiện ích chung ---- */
function nhanSai(ds, dung){ var o={}; ds.forEach(function(p){ var v=p[0]; if(Number.isInteger(v) && v>0 && v!==dung && !(String(v) in o)) o[String(v)]=p[1]; }); return o; }
function kiemMCQ(q){ return q.choices[q.correct]===q._dung && new Set(q.choices).size===q.choices.length; }
function dsBtn34(ch){ return '<span class="text-2xl font-extrabold text-slate-700">'+ch+'</span><span class="ml-2 text-base font-bold text-slate-600">'+(ch==='Đ'?'Đúng':'Sai')+'</span>'; }
function svgX(w, h, px){ return svgHinh(w, h, px).replace('<svg ', '<svg class="text-slate-700" '); }
function demDem(s, loai){ var m=String(s).match(new RegExp('data-dem="'+loai+'"', 'g')); return m ? m.length : 0; }
function khungHinh(s){ return '<div class="flex justify-center my-2">'+s+'</svg></div>'; }
function nguoi(ten, alt){ return '<div class="flex justify-center mb-1">'+anh(ten, 72, alt)+'</div>'; }
function kyHieu(nhan, bt){ return '<div class="text-slate-500 mb-1">'+nhan+'</div><div class="text-3xl font-extrabold text-orange-600">'+bt+'</div>'; }
function so(n){ return n>=1000 ? Math.floor(n/1000)+' '+('00'+(n%1000)).slice(-3) : String(n); }
var GOI={'nham-don-vi':'Cùng một số mà khác đơn vị thì khác hẳn nhau: 20 g nhẹ, 20 kg rất nặng. Bé nghĩ vật nhẹ hay nặng, rồi chọn đơn vị.', 'nham-boi':'1 kg = 1 000 g; 1 cm = 10 mm.', 'doc-sai-vach':'Bé đọc số ở đúng vạch của hai mép vật, rồi lấy số bên phải trừ số bên trái.',
  'nham-bang':'Bé tính lại cho đúng nhé!', 'nham-cao-thap':'Số lớn hơn thì nóng hơn; số bé hơn thì lạnh hơn.', 'chon-sai-phep':'Bé đọc kỹ: cả hai thì cộng, hơn kém bao nhiêu thì trừ.', 'thieu-buoc':'Bé làm đủ các bước nhé!', 'dao-vai':'Bé xem lại: ô trả lời là số nào?',
  'dem-sot-phep':'Bé đếm lại nhé!', 'tra-loi-sai-buoc':'Bé đọc lại câu hỏi cuối: còn một bước nữa mới ra đáp số.'};
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


/* ---- Hình mới (D1): vật đặt trên thước dài cm xăng-ti-mét, hai đường dóng nét đứt từ hai mép vật xuống vạch thước. vat = 'xu' (đồng xu, hình tròn),
   'kep' (kẹp giấy), 'tay' (cục tẩy); a, b = vạch hai mép (mm). Vật nằm trong <g data-tu data-den>; vạch thước data-mm. ---- */
function thuocVat(cm, a, b, vat){
  var u=Math.min(100, 290/cm), L=cm*u, W=Math.round(Math.max(L+68, 250)), x0=(W-L)/2, xa=x0+a*u/10, xb=x0+b*u/10, d=xb-xa, k;
  var oh = vat==='xu' ? d : (vat==='tay' ? 36 : 26), top=18, rt=top+oh+40, H=rt+86, s=svgX(W,H), cy=top+oh/2;
  s+='<g data-tu="'+a+'" data-den="'+b+'" data-vat="'+vat+'">';
  if(vat==='xu') s+='<circle cx="'+((xa+xb)/2).toFixed(1)+'" cy="'+cy.toFixed(1)+'" r="'+(d/2).toFixed(1)+'" fill="'+HM.vang+'" fill-opacity="0.8" stroke="currentColor" stroke-width="3"/><circle cx="'+((xa+xb)/2).toFixed(1)+'" cy="'+cy.toFixed(1)+'" r="'+(d/2-8).toFixed(1)+'" fill="none" stroke="currentColor" stroke-width="1.5" opacity=".5"/>';
  else if(vat==='tay') s+='<rect x="'+xa.toFixed(1)+'" y="'+top+'" width="'+d.toFixed(1)+'" height="'+oh+'" rx="6" fill="'+HM.hong+'" fill-opacity="0.8" stroke="currentColor" stroke-width="3"/>';
  else s+='<rect x="'+xa.toFixed(1)+'" y="'+top+'" width="'+d.toFixed(1)+'" height="'+oh+'" rx="12" fill="none" stroke="currentColor" stroke-width="4"/><rect x="'+(xa+8).toFixed(1)+'" y="'+(top+7)+'" width="'+(d-16).toFixed(1)+'" height="'+(oh-14)+'" rx="7" fill="none" stroke="currentColor" stroke-width="3" opacity=".6"/>';
  s+='</g>';
  s+='<path d="M'+xa.toFixed(1)+' '+cy.toFixed(1)+' V'+rt+' M'+xb.toFixed(1)+' '+cy.toFixed(1)+' V'+rt+'" fill="none" stroke="'+HM.hoi+'" stroke-width="2" stroke-dasharray="5 4"/>';
  s+='<rect x="'+(x0-8)+'" y="'+rt+'" width="'+(L+16)+'" height="68" rx="6" fill="'+HM.vang+'" fill-opacity="0.35" stroke="currentColor" stroke-width="2.5"/>';
  for(k=0;k<=cm*10;k++){ var x=x0+k*u/10, len = k%10===0 ? 24 : (k%5===0 ? 16 : 9);
    s+='<line data-mm="'+k+'" x1="'+x.toFixed(1)+'" y1="'+rt+'" x2="'+x.toFixed(1)+'" y2="'+(rt+len)+'" stroke="currentColor" stroke-width="'+(k%10===0 ? 2.4 : 1.5)+'" stroke-linecap="round"/>';
    if(k%10===0) s+='<text x="'+x.toFixed(1)+'" y="'+(rt+50)+'" text-anchor="middle" font-size="17" '+HFONT+' fill="currentColor">'+(k/10)+'</text>'; }
  return khungHinh(s);
}
function docVat(s){ var d=/data-tu="(\d+)" data-den="(\d+)" data-vat="(\w+)"/.exec(String(s)), v=String(s).match(/data-mm="/g); return d ? {a:+d[1], b:+d[2], vat:d[3], vach:v ? v.length : 0} : null; }

var VAT_DO=[['Cục tẩy',20,'g'],['Hộp sữa',400,'g'],['Quả bí đao',3,'kg'],['Quả trứng',100,'g'],['Quả tạ đòn',100,'kg'],['Túi cà chua',1,'kg']];
var QUA_CAN=[100,100,200,200,500];
function tapCan(){ var o=[], m, c, i, j, k, l, n; for(m=1;m<32;m++){ c=[]; for(i=0;i<5;i++) if(m&(1<<i)) c.push(QUA_CAN[i]); c.sort(function(a,b){ return b-a; }); var t=c.join(' + '); if(!o.some(function(x){ return x.t===t; })) o.push({t:t, n:c.length, sum:c.reduce(function(a,b){ return a+b; },0)}); } return o; }
var DS_CAN=tapCan();

var BAI = {
 n: 34,
 title: 'Thực Hành Và Trải Nghiệm',
 sub: 'Luyện thông minh: câu hỏi tự đổi theo bé — làm hết lượt để xem ngọn lửa!',
 goal: 10, soCau: 18, soCauToiDa: 24,
 loi: {'nham-don-vi':'Nhầm đơn vị (cùng số, khác đơn vị)', 'nham-boi':'Nhầm bội của đơn vị', 'doc-sai-vach':'Đọc sai vạch thước, nhiệt kế', 'nham-cao-thap':'Nhầm cao hơn với thấp hơn', 'dem-sot-phep':'Đếm sót hoặc thừa'},
 muctieu: [
  {id:'MT1', ten:'Đo độ dài và chọn số đo', muc:['Đồng xu từ vạch 0: dài bao nhiêu mm; cục tẩy 20 g hay 20 kg.', 'Đồng xu không bắt đầu từ vạch 0; hộp sữa, quả bí đao, quả trứng.', 'Kẹp giấy, cục tẩy trên thước; quả tạ đòn, túi cà chua.']},
  {id:'MT2', ten:'Cân và đong', muc:['Chọn các quả cân để cân đúng 1 kg gạo; ca nước ít nhất.', 'Cân 700 g, 800 g, 900 g; hai ca nước được 350 ml.', 'Cần ít nhất mấy quả cân; hai ca nước được 550 ml.']},
  {id:'MT3', ten:'Nhiệt độ', muc:['Ngày nóng nhất trong bảng; nhiệt kế hợp với bức tranh.', 'Cao nhất hơn thấp nhất bao nhiêu độ; đọc nhiệt kế của bạn.', 'Hai ngày hơn kém bao nhiêu độ; nóng hơn trời rét bao nhiêu độ.']},
  {id:'MT4', ten:'Chọn đơn vị và vận dụng', muc:['Đơn vị nào hợp (mm, g, ml, °C); Đúng / Sai về cân nặng.', 'Hai thông tin: điền đơn vị; bạn nói quả tạ đòn nặng 100 g.', 'Bốn đơn vị cho bốn đồ vật; bạn nói hai ca nước rót chung.']}
 ],
 topics: [
  /* D1 — Đồng xu trên thước (Trang 1, Hoạt động 1) */
  {name:'Đồng xu trên thước', sec:'Trang 1, Hoạt động 1 — Đo độ dài đồng xu 1 000 đồng bằng thước (hai đường dóng): 19 mm', mt:['MT1'], levels:3,
   muc:['Đồng xu bắt đầu từ vạch 0: dài bao nhiêu mm.', 'Đồng xu không bắt đầu từ vạch 0: lấy vạch phải trừ vạch trái.', 'Kẹp giấy hoặc cục tẩy trên thước.'],
   make:function(lv){
    var vat = lv<=2 ? 'xu' : pick(['kep','tay']), len = vat==='xu' ? pick([17,19,21,23]) : (vat==='kep' ? pick([25,28,30,32]) : pick([22,25,27,30])), a = lv<=1 ? 0 : rnd(3,Math.min(12,38-len)), b=a+len, ten = vat==='xu' ? 'đồng xu' : (vat==='kep' ? 'chiếc kẹp giấy' : 'cục tẩy');
    var sai=[[b,'doc-sai-vach'],[a,'doc-sai-vach'],[len+1,'doc-sai-vach'],[len-1,'doc-sai-vach'],[len/10>=1 && len%10===0 ? len/10 : 0,'nham-boi']];
    return {type:'num', _lv:lv, _a:a, _b:b, _vat:vat, q:thuocVat(4,a,b,vat)+'<div>Em đo '+(vat==='xu' ? 'chiều rộng của' : 'chiều dài của')+' <b>'+ten+'</b> bằng thước có hai đường dóng như hình. Số đo là bao nhiêu mi-li-mét?</div>', ans:len, unit:'mm', sai:nhanSai(sai, len), goiY:gy()};
  }, check:function(q){ var d=docVat(q.q); return !!d && d.vach===41 && d.a===q._a && d.b===q._b && d.vat===q._vat && d.b<=40 && d.b>d.a && q.ans===d.b-d.a && (q._lv>=2 || d.a===0); }},

  /* D2 — Chọn số đo phù hợp (Trang 1 Hoạt động 2; Trang 2 Hoạt động 2) */
  {name:'Chọn số đo phù hợp', sec:'Trang 1, Hoạt động 2 và Trang 2, Hoạt động 2 — Cục tẩy 20 g; hộp sữa 400 g; quả bí đao 3 kg; quả trứng 100 g', mt:['MT1'], levels:3,
   muc:['Cục tẩy, quả trứng, hộp sữa (g): chọn số đo phù hợp.', 'Quả bí đao, túi cà chua (kg): chọn số đo phù hợp.', 'Quả tạ đòn 100 kg; chọn số đo phù hợp cho cả sáu đồ vật.'],
   make:function(lv){
    var it = lv<=1 ? pick(VAT_DO.slice(0,2).concat([VAT_DO[3]])) : (lv===2 ? pick([VAT_DO[2],VAT_DO[5]]) : pick(VAT_DO)), n=it[1], u=it[2], kg=(u==='kg');
    var dung=n+' '+u, ds=[[dung,''],[n+' '+(kg ? 'g' : 'kg'),'nham-don-vi'],[kg ? (n*100)+' kg' : (n%10===0 ? (n/10)+' kg' : (n*100)+' g'),'nham-boi']];
    var ch=ds.map(function(d){ return d[0]; }), sai={}; shuffle(ds); ch=ds.map(function(d){ return d[0]; }); ds.forEach(function(d,i){ if(d[1]) sai[String(i)]=d[1]; });
    return {type:'mcq', cot:1, _lv:lv, _it:it, _dung:dung, q:'<div>'+it[0]+' nặng khoảng bao nhiêu?</div>', choices:ch, correct:ch.indexOf(dung), sai:sai, goiY:gy()};
  }, check:function(q){
    var it=q._it, g=function(c){ var m=/^(\d+) (g|kg)$/.exec(c); return m ? (+m[1])*(m[2]==='kg' ? 1000 : 1) : 0; }, e=g(q._dung);
    return kiemMCQ(q) && q._dung===it[1]+' '+it[2] && q.choices.length===3 && q.choices.every(function(c){ if(c===q._dung) return true; var r=g(c)/e; return r>=100 || r<=0.01; }); }},

  /* D3 — Chọn quả cân (Trang 1, Hoạt động 3) */
  {name:'Chọn quả cân', sec:'Trang 1, Hoạt động 3 — Chọn các quả cân 100 g, 100 g, 200 g, 200 g, 500 g để cân đúng 1 kg gạo', mt:['MT2'], levels:3,
   muc:['Cách nào cân đúng 1 kg (1 000 g).', 'Cách nào cân đúng 700 g, 800 g hoặc 900 g.', 'Cần ít nhất mấy quả cân để cân đúng số gam cho trước.'],
   make:function(lv){
    var t = lv<=1 ? 1000 : (lv===2 ? pick([700,800,900]) : pick([600,700,900,1000])), ok=DS_CAN.filter(function(d){ return d.sum===t; });
    var chips=theTinh(QUA_CAN.map(function(g){ return g+' g'; })), lead='<div>Em có các quả cân như sau:</div>'+chips;
    if(lv<=2){ var dung=pick(ok), sai=shuffle(DS_CAN.filter(function(d){ return d.sum!==t && d.n>=2 && d.sum>=300; })).slice(0,3), ds=shuffle([dung].concat(sai)), ch=ds.map(function(d){ return d.t; }), s={}; ds.forEach(function(d,i){ if(d.sum!==t) s[String(i)]='nham-bang'; });
      return {type:'mcq', cot:1, _lv:lv, _t:t, _ch:ds.map(function(d){ return d.t; }), _dung:dung.t, q:lead+'<div>Chọn các quả cân để cân đúng <b>'+so(t)+' g</b> gạo:</div>', choices:ch, correct:ch.indexOf(dung.t), sai:s, goiY:gy({'nham-bang':'Bé cộng các quả cân của từng cách, rồi tìm cách có tổng bằng '+so(t)+' g.'})}; }
    var ans=Math.min.apply(null, ok.map(function(d){ return d.n; }));
    return {type:'num', _lv:3, _t:t, q:lead+'<div>Cần ít nhất mấy quả cân để cân đúng <b>'+so(t)+' g</b> gạo?</div>', ans:ans, unit:'quả cân', sai:nhanSai([[ans+1,'dem-sot-phep'],[ans-1,'dem-sot-phep'],[ans+2,'dem-sot-phep']], ans), goiY:gy({'dem-sot-phep':'Bé thử dùng các quả cân nặng nhất trước để cần ít quả cân nhất.'})};
  }, check:function(q){
    var t=q._t, ok=DS_CAN.filter(function(d){ return d.sum===t; });
    if(q._lv<=2){ var sums=q._ch.map(function(c){ var d=DS_CAN.filter(function(x){ return x.t===c; })[0]; return d ? d.sum : -1; }); return kiemMCQ(q) && q.choices.length===4 && sums.filter(function(x){ return x===t; }).length===1 && sums.indexOf(-1)<0 && q._dung===q._ch[sums.indexOf(t)]; }
    return q.ans===Math.min.apply(null, ok.map(function(d){ return d.n; })) && ok.length>0; }},

  /* D4 — Bốn ca nước (Trang 2, Hoạt động 3) */
  {name:'Bốn ca nước', sec:'Trang 2, Hoạt động 3 — Bốn ca nước A 300 ml, B 150 ml, C 200 ml, D 250 ml: ca ít nhất; hai ca được 350 ml', mt:['MT2'], levels:3,
   muc:['Ca nào có ít nước nhất.', 'Hai ca khác nhau rót chung được 350 ml.', 'Hai ca khác nhau rót chung được 550 ml.'],
   make:function(lv){
    var vals, ten=['A','B','C','D'], g=0, T, par=null, i, j;
    do{ vals=shuffle([100,150,200,250,300,350]).slice(0,4); g++; if(lv<=1) break; var sums={}; for(i=0;i<4;i++) for(j=i+1;j<4;j++){ var s=vals[i]+vals[j]; sums[s]=(sums[s]||[]).concat([[i,j]]); }
      var keys=Object.keys(sums).filter(function(k){ return sums[k].length===1 && (lv===2 ? +k<=450 : +k>=450); }); if(keys.length){ T=+keys[rnd(0,keys.length-1)]; par=sums[T][0]; } }while(g<500 && lv>1 && !par);
    var chips=theTinh(vals.map(function(v,i){ return 'Ca '+ten[i]+': '+v+' ml'; })), lead='<div>Bốn ca đong đựng nước như sau:</div>'+chips;
    if(lv<=1){ var mi=vals.indexOf(Math.min.apply(null,vals)), ch=ten.map(function(t){ return 'Ca '+t; }), sai={}; ch.forEach(function(c,k){ if(k!==mi) sai[String(k)]='nham-cao-thap'; });
      return {type:'mcq', cot:1, _lv:1, _vals:vals, _dung:ch[mi], q:lead+'<div>Ca nào có ít nước nhất?</div>', choices:ch, correct:mi, sai:sai, goiY:gy()}; }
    var all=[]; for(i=0;i<4;i++) for(j=i+1;j<4;j++) all.push([i,j]); var dung=ten[par[0]]+' và '+ten[par[1]], opts=[dung], oth=shuffle(all.filter(function(p){ return vals[p[0]]+vals[p[1]]!==T; }));
    oth.slice(0,3).forEach(function(p){ opts.push(ten[p[0]]+' và '+ten[p[1]]); }); opts=shuffle(opts); var s2={}; opts.forEach(function(o,k){ if(o!==dung) s2[String(k)]='nham-bang'; });
    return {type:'mcq', cot:1, _lv:lv, _vals:vals, _T:T, _dung:dung, q:lead+'<div>Chọn hai ca khác nhau, rót chung vào một bình được <b>'+T+' ml</b> nước:</div>', choices:opts, correct:opts.indexOf(dung), sai:s2, goiY:gy({'nham-bang':'Bé cộng nước của hai ca, rồi so với '+T+' ml.'})};
  }, check:function(q){
    var ch=docThe(q.q), vals=q._vals; if(ch.join('|')!==vals.map(function(v,i){ return 'Ca '+['A','B','C','D'][i]+': '+v+' ml'; }).join('|') || new Set(vals).size!==4) return false;
    if(q._lv<=1) return kiemMCQ(q) && q._dung==='Ca '+['A','B','C','D'][vals.indexOf(Math.min.apply(null,vals))] && q.choices.length===4;
    var T=q._T, ten=['A','B','C','D'], hit=q.choices.filter(function(c){ var m=/^([ABCD]) và ([ABCD])$/.exec(c); return m && vals[ten.indexOf(m[1])]+vals[ten.indexOf(m[2])]===T; }); return kiemMCQ(q) && q.choices.length===4 && hit.length===1 && hit[0]===q._dung; }},

  /* D5 — Bảng nhiệt độ các ngày (Trang 1, Hoạt động 4) */
  {name:'Bảng nhiệt độ các ngày', sec:'Trang 1, Hoạt động 4 — Đo nhiệt độ không khí thứ Hai, thứ Ba, thứ Tư (đọc bảng cho trước)', mt:['MT3'], levels:3,
   muc:['Ngày nào nóng nhất.', 'Nhiệt độ cao nhất hơn thấp nhất bao nhiêu độ.', 'Một ngày cao hơn ngày khác bao nhiêu độ.'],
   make:function(lv){
    var tt=shuffle([20,22,24,25,26,27,28,29,30,32,33,34,35]).slice(0,3), days=['Thứ Hai','Thứ Ba','Thứ Tư'], rows=days.map(function(d,i){ return [d, tt[i]]; }), lead='<div class="text-slate-600">Nhiệt độ không khí buổi sáng:</div>'+tenBang(rows);
    if(lv<=1){ var ch=days.slice(), best=rows.slice().sort(function(a,b){ return b[1]-a[1]; })[0][0], sai={}; ch.forEach(function(c,i){ if(c!==best) sai[String(i)]='nham-cao-thap'; });
      return {type:'mcq', cot:1, _lv:1, _rows:rows, _dung:best, q:lead+'<div>Ngày nào nóng nhất?</div>', choices:ch, correct:ch.indexOf(best), sai:sai, goiY:gy()}; }
    var s=rows.slice().sort(function(a,b){ return b[1]-a[1]; });
    if(lv===2){ var e=s[0][1]-s[2][1]; return {type:'num', _lv:2, _rows:rows, q:lead+'<div>Nhiệt độ cao nhất hơn nhiệt độ thấp nhất bao nhiêu độ C?</div>', ans:e, unit:'°C', sai:nhanSai([[s[0][1]+s[2][1],'chon-sai-phep'],[s[0][1],'thieu-buoc'],[s[2][1],'thieu-buoc'],[e+1,'nham-bang']], e), goiY:gy()}; }
    var a=s[0], b=s[1], e3=a[1]-b[1];
    return {type:'num', _lv:3, _rows:rows, _pa:a[0], _pb:b[0], q:lead+'<div>'+a[0]+' có nhiệt độ cao hơn '+b[0].toLowerCase()+' bao nhiêu độ C?</div>', ans:e3, unit:'°C', sai:nhanSai([[a[1]+b[1],'chon-sai-phep'],[a[1],'thieu-buoc'],[e3+1,'nham-bang'],[e3-1,'nham-bang']], e3), goiY:gy()};
  }, check:function(q){
    var r=docBang(q.q); if(r.length!==3 || r.map(function(x){ return x[0]+x[1]; }).join()!==q._rows.map(function(x){ return x[0]+x[1]; }).join() || new Set(r.map(function(x){ return x[1]; })).size!==3) return false;
    var s=r.slice().sort(function(a,b){ return b[1]-a[1]; });
    if(q._lv===1) return kiemMCQ(q) && q._dung===s[0][0];
    if(q._lv===2) return q.ans===s[0][1]-s[2][1];
    var f=function(n){ return r.filter(function(x){ return x[0]===n; })[0][1]; }; return q.ans===f(q._pa)-f(q._pb) && q.ans>0; }},

  /* D6 — Chọn nhiệt kế (Trang 2, Hoạt động 1) */
  {name:'Chọn nhiệt kế', sec:'Trang 2, Hoạt động 1 — Chọn nhiệt kế A, B, C hợp với mỗi bức tranh: đọc sách trong phòng mát, ngồi quạt vì nóng, sưởi lửa vì rét', mt:['MT3'], levels:3,
   muc:['Nhiệt kế nào hợp với bức tranh.', 'Nhiệt kế đó chỉ bao nhiêu độ C.', 'Nhiệt độ ở bức tranh nóng hơn bức tranh rét bao nhiêu độ.'],
   make:function(lv){
    var ten=['A','B','C'], kind=shuffle(['ret','mat','nong']), val={ret:rnd(3,8), mat:rnd(22,28), nong:rnd(36,40)}, tv=kind.map(function(k){ return val[k]; });
    var cap=function(n){ return '<div class="text-center font-extrabold text-slate-700 mt-1">Nhiệt kế '+n+'</div>'; }, figs=tv.map(function(t,i){ return cap(ten[i])+nhietKe(t,0,50); }).join('');
    var tranh={ret:'Rô-bốt mặc ấm, đốt lửa sưởi vì trời rét', mat:'Bạn đọc sách trong phòng mát', nong:'Bạn ngồi quạt vì trời nóng'}, ask=pick(['ret','mat','nong']), idx=kind.indexOf(ask);
    if(lv<=1){ var ch=ten.map(function(t){ return 'Nhiệt kế '+t; }), sai={}; ch.forEach(function(c,i){ if(i!==idx) sai[String(i)]='nham-cao-thap'; });
      return {type:'mcq', cot:1, _lv:1, _tv:tv, _kind:kind, _ask:ask, _dung:ch[idx], q:figs+'<div>Bức tranh: <b>'+tranh[ask]+'</b>. Nhiệt kế nào hợp với bức tranh?</div>', choices:ch, correct:idx, sai:sai, goiY:gy({'nham-cao-thap':'Trời rét thì nhiệt độ thấp, trời nóng thì nhiệt độ cao.'})}; }
    if(lv===2){ var t=tv[idx]; return {type:'num', _lv:2, _tv:tv, _kind:kind, _ask:ask, q:figs+'<div>Bức tranh: <b>'+tranh[ask]+'</b>. Nhiệt kế hợp với bức tranh chỉ bao nhiêu độ C?</div>', ans:t, unit:'°C', sai:nhanSai([[Math.round(t/5)*5===t ? t+5 : Math.round(t/5)*5,'doc-sai-vach'],[t+1,'doc-sai-vach'],[t-1,'doc-sai-vach'],[t+5,'doc-sai-vach']], t), goiY:gy()}; }
    var e=val.nong-val.ret;
    return {type:'num', _lv:3, _tv:tv, _kind:kind, q:figs+'<div>Nhiệt độ ở bức tranh <b>ngồi quạt vì trời nóng</b> cao hơn nhiệt độ ở bức tranh <b>sưởi lửa vì trời rét</b> bao nhiêu độ C?</div>', ans:e, unit:'°C', sai:nhanSai([[val.nong+val.ret,'chon-sai-phep'],[val.nong,'thieu-buoc'],[e+1,'nham-bang'],[e-1,'nham-bang']], e), goiY:gy()};
  }, check:function(q){
    var o=docNhietNhieu(q.q); if(o.length!==3 || o.map(function(x){ return x.t; }).join()!==q._tv.join() || o.some(function(x){ return x.lo!==0 || x.hi!==50; })) return false;
    var k=q._kind, v={}; k.forEach(function(x,i){ v[x]=q._tv[i]; }); if(!(v.ret<v.mat && v.mat<v.nong)) return false;
    if(q._lv===1) return kiemMCQ(q) && q._dung==='Nhiệt kế '+['A','B','C'][k.indexOf(q._ask)];
    if(q._lv===2) return q.ans===v[q._ask]; return q.ans===v.nong-v.ret; }},

  /* D7 — Chọn đơn vị (tổng hợp mm, g, ml, °C) */
  {name:'Chọn đơn vị', sec:'Thực hành — Điền đơn vị mm, g, ml hoặc °C cho hợp lí', mt:['MT4'], levels:3,
   muc:['Một đại lượng: chọn đơn vị (mm, g, ml, °C).', 'Hai đại lượng cùng lúc.', 'Bốn đại lượng cho bốn đồ vật.'],
   make:function(lv){
    var DL=[['Con kiến dài 3 …','mm'],['Quả cam nặng 200 …','g'],['Ly nước đựng 200 …','ml'],['Nhiệt độ phòng là 28 …','°C'],['Hạt gạo dài 6 …','mm'],['Hộp sữa nặng 400 …','g'],['Chai nước đựng 500 …','ml'],['Nước nóng là 90 …','°C']];
    var n = lv<=1 ? 1 : (lv===2 ? 2 : 3), its=shuffle(DL.slice()), pick1=[], units=[], i;
    for(i=0;i<its.length && pick1.length<n+(lv>=3?1:0);i++){ if(units.indexOf(its[i][1])<0){ pick1.push(its[i]); units.push(its[i][1]); } }
    if(lv<=1){ var it=pick1[0], ch=shuffle(['mm','g','ml','°C']), sai={}; ch.forEach(function(c,k){ if(c!==it[1]) sai[String(k)]='nham-don-vi'; });
      return {type:'mcq', cot:1, _lv:1, _it:[it], _dung:it[1], q:'<div class="text-xl font-extrabold text-orange-600 my-1">'+it[0]+'</div><div>Điền đơn vị nào cho hợp lí?</div>', choices:ch, correct:ch.indexOf(it[1]), sai:sai, goiY:gy()}; }
    var use=pick1.slice(0, lv===2 ? 2 : 4), dung=use.map(function(x){ return x[1]; }).join(', '), perms=[dung], tries=0;
    while(perms.length<4 && tries<200){ var p=shuffle(use.map(function(x){ return x[1]; })).join(', '); if(perms.indexOf(p)<0) perms.push(p); tries++; if(perms.length<4 && tries>=150){ var q2=shuffle(['mm','g','ml','°C']).slice(0,use.length).join(', '); if(perms.indexOf(q2)<0) perms.push(q2); } }
    perms=perms.slice(0,4); var ch2=shuffle(perms), s2={}; ch2.forEach(function(c,k){ if(c!==dung) s2[String(k)]='nham-don-vi'; });
    return {type:'mcq', cot:1, _lv:lv, _it:use, _dung:dung, q:'<div>Điền đơn vị cho từng chỗ trống, theo thứ tự:</div><ol class="list-decimal text-left inline-block my-1 text-lg font-bold">'+use.map(function(x){ return '<li>'+x[0]+'</li>'; }).join('')+'</ol>', choices:ch2, correct:ch2.indexOf(dung), sai:s2, goiY:gy({'nham-don-vi':'Bé nghĩ từng đồ vật: dài, nặng, đựng nước hay nóng lạnh, rồi chọn đơn vị.'})};
  }, check:function(q){
    var use=q._it, dung=use.map(function(x){ return x[1]; }).join(', '); return kiemMCQ(q) && q._dung===dung && new Set(use.map(function(x){ return x[1]; })).size===use.length && use.length===(q._lv<=1 ? 1 : (q._lv===2 ? 2 : 4)) && (q._lv<=1 || q.choices.length>=2); }},

  /* D8 — Bạn nói đúng hay sai (không có trong SGK) */
  {name:'Bạn nói đúng hay sai', sec:'Tìm lỗi — Quả trứng nặng 100 g đúng hay sai; bạn An nói quả tạ đòn nặng 100 g', mt:['MT4'], levels:3,
   muc:['Đúng / Sai: số đo của một đồ vật.', 'Bạn An nói số đo sai đơn vị: em thấy thế nào.', 'Bạn An nói hai ca nước rót chung: em thấy thế nào.'],
   make:function(lv){
    if(lv<=1){ var it=pick(VAT_DO), dung=Math.random()<0.5, ph = dung ? it[1]+' '+it[2] : it[1]+' '+(it[2]==='kg' ? 'g' : 'kg'), tr=dung;
      return {type:'mcq', figFn:dsBtn34, _lv:1, _it:it, _x:ph, _dung:(tr?'Đ':'S'), q:'<div class="text-xl font-extrabold text-orange-700 my-2">'+it[0]+' nặng khoảng '+ph+'.</div><div class="text-base text-slate-500">Đúng (Đ) hay sai (S)?</div>', choices:['Đ','S'], correct:(tr?0:1), sai:(tr?{}:{'0':'nham-don-vi'}), goiY:gy()}; }
    if(lv===2){ var it2=pick(VAT_DO), kg=it2[2]==='kg', dungNoi=Math.random()<0.5, claim = dungNoi ? it2[1]+' '+it2[2] : it2[1]+' '+(kg ? 'g' : 'kg'), dungC, saiC;
      if(dungNoi){ dungC='Đồng ý, vì '+it2[0].toLowerCase()+' '+(kg ? 'khá nặng' : 'khá nhẹ')+', hợp với '+claim; saiC='Không đồng ý, vì '+it2[0].toLowerCase()+' '+(kg ? 'rất nhẹ' : 'rất nặng'); }
      else { dungC='Không đồng ý, vì '+it2[0].toLowerCase()+' '+(kg ? 'khá nặng' : 'khá nhẹ')+', không hợp với '+claim; saiC='Đồng ý, vì số đo đúng là '+claim; }
      var ch=shuffle([dungC,saiC]), s2={}; s2[String(1-ch.indexOf(dungC))]='nham-don-vi';
      return {type:'mcq', cot:1, _lv:2, _it:it2, _dungNoi:dungNoi, _dung:dungC, q:nguoi('boy','Bạn An')+'<div>Bạn An nói: «<b>'+it2[0]+' nặng khoảng '+claim+'</b>.» Em thấy thế nào?</div>', choices:ch, correct:ch.indexOf(dungC), sai:s2, goiY:gy()}; }
    var a=pick([100,150,200,250,300]), b=pick([100,150,200,250,300]); while(a===b || a<b) { a=pick([200,250,300,350]); b=pick([100,150]); }
    var T=a+b, d=a-b, okSay=Math.random()<0.5, x= okSay ? T : d, dungC3, saiC3;
    if(okSay){ dungC3='Đồng ý, vì '+a+' + '+b+' = '+T; saiC3='Không đồng ý, vì '+a+' − '+b+' = '+d; } else { dungC3='Không đồng ý, vì '+a+' + '+b+' = '+T; saiC3='Đồng ý, vì '+a+' − '+b+' = '+d; }
    var ch3=shuffle([dungC3,saiC3]), s3={}; s3[String(1-ch3.indexOf(dungC3))]='chon-sai-phep';
    return {type:'mcq', cot:1, _lv:3, _a:a, _b:b, _x:x, _dung:dungC3, q:nguoi('boy','Bạn An')+'<div>Ca thứ nhất đựng '+a+' ml nước, ca thứ hai đựng '+b+' ml nước. Rót cả hai ca vào một bình. Bạn An nói: «Trong bình có <b>'+x+' ml</b> nước.» Em thấy thế nào?</div>', choices:ch3, correct:ch3.indexOf(dungC3), sai:s3, goiY:gy({'chon-sai-phep':'Rót chung hai ca là cộng, không phải trừ.'})};
  }, check:function(q){
    if(q._lv<=1){ var it=q._it, tr=q._x===it[1]+' '+it[2]; return q.choices.join()==='Đ,S' && (q._dung==='Đ')===tr && q.correct===(tr?0:1); }
    if(q._lv===2){ var it2=q._it; return kiemMCQ(q) && q.choices.length===2 && /^Đồng ý/.test(q._dung)===q._dungNoi && VAT_DO.some(function(v){ return v[0]===it2[0]; }); }
    var T=q._a+q._b, d=q._a-q._b, eq=/^(Đồng ý|Không đồng ý), vì (\d+) ([+−]) (\d+) = (\d+)$/, okEq=q.choices.every(function(c){ var m=eq.exec(c); if(!m) return false; var x=+m[2], y=+m[4], r=+m[5]; return m[3]==='+' ? x+y===r : x-y===r; });
    return okEq && kiemMCQ(q) && q._a>q._b && /^Đồng ý/.test(q._dung)===(q._x===T) && q._dung.indexOf(q._a+' + '+q._b+' = '+T)>0; }}
 ]
};
