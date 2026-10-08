/* bai-23.js — Bài 23: Nhân số có hai chữ số với số có một chữ số. Engine v2 — LUYỆN THÔNG MINH.
   Theo bảng phân tích sư phạm đã duyệt (phan-tich-su-pham/bai-23.md + bình luận duyệt trên PR #10):
   4 MỤC TIÊU (muctieu) × 11 DẠNG (topics), mỗi dạng 3 mức (Thông tư 27: Nhận biết · Hiểu · Vận dụng).
   Mọi tích < 100. Phép nhân đặt dọc là MỘT hình SVG (phepTinhDoc), số nhớ nhỏ viết phía trên chữ số hàng chục.
   Mỗi chữ số trong hình mang data-pt; check() đọc lại các chữ số từ chuỗi SVG, so với số trong câu.
   Hình dùng chung (figures.js): hopBut, anh, svgHinh, tinhBT, oHoi, xepHang. Hình mới (trong file này): phepTinhDoc, theSo, bangChu.
   QUY TẮC: nối chuỗi, KHÔNG backtick và KHÔNG template literal. */

/* ---- Tiện ích ---- */
function nhanSai(ds, dung){ var o={}; ds.forEach(function(p){ var v=p[0]; if(v>0 && v!==dung && !(String(v) in o)) o[String(v)]=p[1]; }); return o; }
function dsBtn(ch){ return '<span class="text-2xl font-extrabold text-slate-700">'+ch+'</span><span class="ml-2 text-base font-bold text-slate-600">'+(ch==='Đ'?'Đúng':'Sai')+'</span>'; }
function kyHieu(nhan, bt){ return '<div class="text-slate-500 mb-1">'+nhan+'</div><div class="text-4xl font-extrabold text-orange-600">'+bt+'</div>'; }
function kiemMCQ(q){ return q.choices[q.correct]===q._dung && new Set(q.choices).size===q.choices.length; }
function demDem(s, loai){ var m=String(s).match(new RegExp('data-dem="'+loai+'"', 'g')); return m ? m.length : 0; }
function nguoiNoi(ten, loi){ return '<div class="flex justify-center mb-1">'+anh(ten, 72, ten==='boy'?'Bạn An':'Bạn Mai')+'</div>'+loi; }

/* ---- Phép nhân a × b (a có hai chữ số, tích < 100) ---- */
/* loai 'kn': không nhớ (u × b < 10) · 'cn': có nhớ (u × b >= 10). tMax: chữ số hàng chục lớn nhất; tichMin: tích nhỏ nhất */
function chonPhep(loai, tMax, bMin, bMax, tichMin, tichKhac){
  for(var i=0;i<3000;i++){
    var t=rnd(1,tMax), u=rnd(1,9), b=rnd(bMin,bMax), a=10*t+u, p=a*b;
    if(p>99 || (tichMin && p<tichMin)) continue;
    if(loai==='kn' && u*b>=10) continue;
    if(loai==='cn' && u*b<10) continue;
    if(tichKhac && tichKhac.indexOf(p)>=0) continue;
    return {a:a, b:b, t:t, u:u, p:p, c:Math.floor(u*b/10), d:(u*b)%10};
  }
  return null;
}
function coNho(a, b){ return (a%10)*b>=10; }
/* Đáp án nhiễu cho tích p.a × p.b, kèm nhãn lỗi */
function saiTich(p){
  var o=[];
  if(p.c>0){ o.push([p.p-10*p.c,'quen-nho']); o.push([p.t*p.b*100+p.u*p.b,'viet-ca-hai-chu-so']); o.push([p.p+10,'nho-nham']); if(p.c>1) o.push([p.p-10,'nho-nham']); }
  else { o.push([p.t*p.b*10,'thieu-buoc']); o.push([p.u*p.b,'thieu-buoc']); o.push([p.p+10,'nham-bang']); o.push([p.p-10,'nham-bang']); }
  o.push([p.a+p.b,'cong-thay-nhan']); o.push([(p.p%10)*10+Math.floor(p.p/10),'dao-vai']);
  return nhanSai(o, p.p);
}
function goiYTich(p){
  return {'quen-nho':'Nhân hàng chục xong phải cộng thêm số nhớ '+p.c+'.',
    'viet-ca-hai-chu-so':'Hàng đơn vị chỉ viết một chữ số. '+p.u+' × '+p.b+' = '+(p.u*p.b)+': viết '+p.d+', nhớ '+p.c+'.',
    'nho-nham':'Số nhớ là chữ số hàng chục của '+(p.u*p.b)+'.',
    'cong-thay-nhan':'Đây là phép nhân, không phải phép cộng.',
    'dao-vai':'Bé xem lại chữ số hàng chục và chữ số hàng đơn vị của tích nhé.',
    'thieu-buoc':'Bé nhân cả hai hàng: hàng đơn vị rồi hàng chục.',
    'nham-bang':'Bé nhân nhẩm lại từng hàng: '+p.u+' × '+p.b+' và '+p.t+' × '+p.b+'.'};
}

/* ---- Hình: phép nhân đặt dọc căn phải. Cột: trăm (38) · chục (76) · đơn vị (114).
   tuy.nho: số nhớ nhỏ phía trên chữ số hàng chục (null: không viết) · tuy.kq: tích, mỗi ký tự một chữ số
   ('?' = ô cần điền, ' ' = để trống) · tuy.an: 'a1' | 'a0' | 'b0' = chữ số của thừa số bị che bằng ô "?" ---- */
function phepTinhDoc(a, b, tuy){
  tuy=tuy||{};
  var X=[38,76,114], W=152, H=198, t=Math.floor(a/10), u=a%10, s=svgHinh(W,H,W).replace('<svg ','<svg class="text-slate-700" ');
  var hang=function(x, y, c, id, co){
    c=String(c);
    if(c===' ' || c==='') return '';
    var r='';
    if(c==='?') r+='<rect x="'+(x-17)+'" y="'+(y-co*0.8).toFixed(1)+'" width="34" height="'+(co*1.1).toFixed(1)+'" rx="7" fill="none" stroke="'+HM.hoi+'" stroke-width="2.5" stroke-dasharray="5 3"/>';
    return r+'<text data-pt="'+id+'" x="'+x+'" y="'+y+'" text-anchor="middle" font-size="'+co+'" '+HFONT+' fill="'+(c==='?'?HM.hoi:'currentColor')+'">'+c+'</text>';
  };
  if(tuy.nho!==null && tuy.nho!==undefined) s+=hang(X[1], 34, tuy.nho, 'n', 20);
  s+=hang(X[1], 82, tuy.an==='a1' ? '?' : t, 'a1', 34)+hang(X[2], 82, tuy.an==='a0' ? '?' : u, 'a0', 34);
  s+=hang(X[2], 128, tuy.an==='b0' ? '?' : b, 'b0', 34);
  s+='<text x="'+X[1]+'" y="128" text-anchor="middle" font-size="30" '+HFONT+' fill="currentColor">&#215;</text>';
  s+='<line x1="'+(X[0]-24)+'" y1="146" x2="'+(X[2]+24)+'" y2="146" stroke="currentColor" stroke-width="3" stroke-linecap="round"/>';
  var kq=String(tuy.kq===undefined ? '' : tuy.kq), L=kq.length, i;
  for(i=0;i<L;i++) s+=hang(X[3-L+i], 184, kq.charAt(i), 'k'+(L-1-i), 34);
  return s+'</svg>';
}
function figPT(a, b, tuy){ return '<div class="flex justify-center my-1">'+phepTinhDoc(a, b, tuy)+'</div>'; }
function docPT(s){ var o={}, re=/data-pt="(\w+)"[^>]*>([^<]*)<\/text>/g, m; while((m=re.exec(String(s)))) o[m[1]]=m[2]; return o; }
/* Chữ số trong hình phải khớp với số trong câu: pt = {a, b, an, n, kq} */
function kiemPT(q){
  var p=q._pt, d=docPT(q.q), t=Math.floor(p.a/10), u=p.a%10, kq=String(p.kq), L=kq.length, i, dem=0;
  if(d.a1!==(p.an==='a1'?'?':String(t)) || d.a0!==(p.an==='a0'?'?':String(u)) || d.b0!==(p.an==='b0'?'?':String(p.b))) return false;
  if(p.n===null || p.n===undefined){ if('n' in d) return false; } else if(d.n!==String(p.n)) return false;
  for(i=0;i<L;i++){ var ch=kq.charAt(i); if(ch===' ') continue; dem++; if(d['k'+(L-1-i)]!==ch) return false; }
  var soK=Object.keys(d).filter(function(k){ return k.charAt(0)==='k'; }).length;
  return soK===dem;
}

/* ---- Hình: dãy thẻ số [a1][a2] × [b] = [k1][k2], mỗi thẻ đánh số 1..5 bên dưới ---- */
function theSo(c){
  var vx=[8,50,122,194,236], W=280, s=svgHinh(W,84,W).replace('<svg ','<svg class="text-slate-700" '), i;
  for(i=0;i<5;i++){
    s+='<rect x="'+vx[i]+'" y="6" width="36" height="46" rx="8" fill="none" stroke="currentColor" stroke-width="2.5"/>'
     +'<text data-the="'+i+'" x="'+(vx[i]+18)+'" y="39" text-anchor="middle" font-size="30" '+HFONT+' fill="currentColor">'+c[i]+'</text>'
     +'<text x="'+(vx[i]+18)+'" y="74" text-anchor="middle" font-size="16" '+HFONT+' fill="currentColor">'+(i+1)+'</text>';
  }
  s+='<text x="104" y="40" text-anchor="middle" font-size="28" '+HFONT+' fill="currentColor">&#215;</text>'
   +'<text x="176" y="40" text-anchor="middle" font-size="28" '+HFONT+' fill="currentColor">=</text>';
  return s+'</svg>';
}
function docThe(s){ var o=[], re=/data-the="(\d)"[^>]*>(\d)<\/text>/g, m; while((m=re.exec(String(s)))) o[+m[1]]=+m[2]; return o; }
function theDung(c){ return (10*c[0]+c[1])*c[2]===10*c[3]+c[4]; }
function doiCho(c, i, j){ var d=c.slice(), t=d[i]; d[i]=d[j]; d[j]=t; return d; }
function cacCachDoi(c){ var o=[], i, j; for(i=0;i<5;i++) for(j=i+1;j<5;j++) if(theDung(doiCho(c,i,j))) o.push([i,j]); return o; }
function chuCap(i, j){ return 'Thẻ '+(i+1)+' và thẻ '+(j+1); }

/* ---- Hình: bảng ghép phép tính – chữ cái (hai nửa bảng cạnh nhau) ---- */
function bangChu(ds){
  var W=300, H=Math.ceil(ds.length/2)*38+8, s=svgHinh(W,H,W).replace('<svg ','<svg class="text-slate-700" '), n=Math.ceil(ds.length/2);
  ds.forEach(function(d, i){
    var x0 = i<n ? 6 : 158, y = 24+(i%n)*38;
    s+='<circle cx="'+(x0+15)+'" cy="'+(y-6)+'" r="15" fill="'+HM.vang+'"/>'
     +'<text data-chu="'+d.chu+'" x="'+(x0+15)+'" y="'+y+'" text-anchor="middle" font-size="20" '+HFONT+' fill="'+HM.chu+'">'+d.chu+'</text>'
     +'<text data-phep="'+d.phep+'" x="'+(x0+40)+'" y="'+y+'" font-size="20" '+HFONT+' fill="currentColor">'+d.phep+'</text>';
  });
  return s+'</svg>';
}
function docBang(s){ var ch=[], ph=[], m, re1=/data-chu="([^"]+)"/g, re2=/data-phep="([^"]+)"/g; while((m=re1.exec(String(s)))) ch.push(m[1]); while((m=re2.exec(String(s)))) ph.push(m[1]); return ch.map(function(c,i){ return {chu:c, phep:ph[i]}; }); }
/* Tám phép tính — tám chữ. Kết quả khác nhau, đều < 100 */
var BANG_CHU=[{chu:'C',phep:'12 × 7'},{chu:'H',phep:'23 × 4'},{chu:'Ù',phep:'18 × 3'},{chu:'A',phep:'15 × 5'},
              {chu:'M',phep:'31 × 3'},{chu:'Ộ',phep:'24 × 2'},{chu:'T',phep:'17 × 4'},{chu:'N',phep:'26 × 3'}];
function chuaChu(chu){ return BANG_CHU.filter(function(d){ return d.chu===chu; })[0]; }
function ketQuaChu(chu){ return tinhBT(chuaChu(chu).phep); }

/* ---- Lỗi của bạn An khi đặt tính (cần phép có nhớ, tích hàng chục < 10) ---- */
function loiAn(kind, p){
  var tb=p.t*p.b;
  if(p.c<1) return null;
  if(kind==='quen-nho') return {nho:p.c, kq:String(tb)+p.d, tag:kind};
  if(kind==='viet-ca-hai-chu-so') return {nho:null, kq:String(tb)+String(p.u*p.b), tag:kind};
  if(kind==='nho-nham'){ var n2 = (tb+p.c+1<=9) ? p.c+1 : (p.c>=2 ? p.c-1 : -1); if(n2<0) return null; return {nho:n2, kq:String(tb+n2)+p.d, tag:kind}; }
  return null;
}
function phepAn(){ for(var i=0;i<200;i++){ var p=chonPhep('cn',3,2,4); if(loiAn('quen-nho',p) && loiAn('viet-ca-hai-chu-so',p) && loiAn('nho-nham',p)) return p; } return null; }
var TEN_LOI_AN={'quen-nho':'An quên cộng số nhớ vào hàng chục.', 'viet-ca-hai-chu-so':'An viết cả hai chữ số ở hàng đơn vị.', 'nho-nham':'An nhớ nhầm số.'};
function goiYAn(p){
  return {'quen-nho':'Bé xem hàng chục: phải lấy '+p.t+' × '+p.b+' rồi cộng thêm số nhớ '+p.c+'.',
    'viet-ca-hai-chu-so':'Hàng đơn vị chỉ viết một chữ số: '+p.u+' × '+p.b+' = '+(p.u*p.b)+', viết '+p.d+', nhớ '+p.c+'.',
    'nho-nham':'Số nhớ là chữ số hàng chục của '+(p.u*p.b)+', tức là '+p.c+'.',
    'chung':'Bé tính lại '+p.a+' × '+p.b+' từng hàng, rồi so với bài của An.'};
}

var BAI = {
 n: 23,
 title: 'Nhân số có hai chữ số với số có một chữ số',
 sub: 'Luyện thông minh: câu hỏi tự đổi theo bé — làm hết lượt để xem ngọn lửa!',
 goal: 10, soCau: 18, soCauToiDa: 24,
 loi: {'quen-nho':'Quên cộng số nhớ', 'viet-ca-hai-chu-so':'Viết cả hai chữ số ở hàng đơn vị', 'nho-nham':'Nhớ nhầm số', 'nham-hang':'Nhầm hàng khi nhẩm số tròn chục'},
 muctieu: [
  {id:'MT1', ten:'Nhân không nhớ', muc:['12 × 3 = 12 + 12 + 12; đặt tính 11 × 7, 13 × 3; nhẩm 10 × 8.', 'Đặt tính 34 × 2, 42 × 2; nhẩm số tròn chục 20 × 4, 30 × 3.', 'Nhẩm 31 × 3 trực tiếp; tìm thừa số chưa biết (? × 3 = 90).']},
  {id:'MT2', ten:'Nhân có nhớ', muc:['Nhớ ở hàng đơn vị, hàng chục không vượt 9 (26 × 3).', '37 × 2, 16 × 4, 29 × 3, 18 × 5; viết chữ số hàng đơn vị, hàng chục.', 'Tích sát 100 (19 × 5 = 95, 24 × 4 = 96); số nhớ; phân biệt có nhớ hay không.']},
  {id:'MT3', ten:'Tìm lỗi và sửa', muc:['Phép tính của bạn An có đúng không (một lỗi rõ).', 'Nhận ra lỗi: quên nhớ, viết cả hai chữ số, nhớ nhầm.', 'Điền chữ số còn thiếu; đổi chỗ hai thẻ số để phép tính đúng.']},
  {id:'MT4', ten:'Vận dụng', muc:['Bài toán một phép nhân không nhớ; tìm phép tính có kết quả cho trước.', 'Bài toán một phép nhân có nhớ; kết quả ứng với chữ cái.', 'Bài toán hai bước (nhân rồi cộng hoặc trừ); ghép chữ.']}
 ],
 topics: [
  /* D1 — Cộng các số bằng nhau (Khám phá 1: 12 × 3 = 12 + 12 + 12) */
  {name:'Cộng các số bằng nhau', sec:'Khám phá 1 — Mỗi hộp 12 bút, 3 hộp: 12 × 3 = 12 + 12 + 12', mt:['MT1'], levels:3,
   muc:['Tính tổng 2–3 số bằng nhau (có hình các hộp bút).', 'Chọn phép cộng bằng phép nhân cho trước.', 'Đúng hay sai: một phép nhân viết thành tổng.'],
   make:function(lv){
    var i, a, n;
    if(lv<=1){ a=pick([11,12,13]); n=rnd(2,3); var hop=[], cong=[];
      for(i=0;i<n;i++){ hop.push(hopBut(a)); cong.push(a); }
      return {type:'num', _lv:1, _a:a, _n:n, q:xepHang(hop,2)+'<div>Mỗi hộp có '+a+' bút màu. Có '+n+' hộp như thế.</div><div class="text-2xl font-extrabold text-orange-600 my-1">'+cong.join(' + ')+' = ?</div><div class="text-slate-500 text-base">(tức là '+a+' × '+n+')</div>',
        ans:a*n, unit:'bút', sai:nhanSai([[a*(n-1),'lech-nhom'],[a*(n+1),'lech-nhom'],[a+n,'cong-thay-nhan']], a*n),
        goiY:{'lech-nhom':'Bé đếm lại số hộp: có '+n+' hộp, mỗi hộp '+a+' bút.', 'cong-thay-nhan':a+' × '+n+' là '+n+' lần số '+a+', không phải '+a+' + '+n+'.'}}; }
    if(lv===2){ a=pick([12,13,14,21,22]); n=rnd(3,4);
      var rep=function(k){ var r=[]; for(var j=0;j<k;j++) r.push(a); return r.join(' + '); };
      var ds=[[rep(n),''],[rep(n-1),'lech-nhom'],[rep(n+1),'lech-nhom'],[a+' + '+n,'cong-thay-nhan']], dung=ds[0][0]; shuffle(ds);
      var ch=ds.map(function(d){ return d[0]; }), sai={}; ds.forEach(function(d,k){ if(d[1]) sai[String(k)]=d[1]; });
      return {type:'mcq', cot:1, _lv:2, _a:a, _n:n, _dung:dung, q:'<div class="text-3xl font-extrabold text-orange-600 my-2">'+a+' × '+n+'</div><div>Phép cộng nào có kết quả bằng phép nhân trên?</div>', choices:ch, correct:ch.indexOf(dung), sai:sai,
        goiY:{'lech-nhom':a+' × '+n+' là cộng đúng '+n+' số '+a+'. Bé đếm lại số các số '+a+' nhé!', 'cong-thay-nhan':a+' × '+n+' là '+n+' lần số '+a+', không phải '+a+' + '+n+'.'}}; }
    a=pick([12,13,14,21,22,31]); n=rnd(3,4);
    var lap=function(k){ var r=[]; for(var j=0;j<k;j++) r.push(a); return r.join(' + '); }, laDung=Math.random()<0.5, ve;
    if(laDung) ve=lap(n); else ve=pick([[lap(n-1),'lech-nhom'],[lap(n+1),'lech-nhom'],[a+' + '+n,'cong-thay-nhan']]);
    var vp = laDung ? ve : ve[0], tag = laDung ? '' : ve[1];
    return {type:'mcq', figFn:dsBtn, _lv:3, _lhs:a+' × '+n, _rhs:vp, _dung:(laDung?'Đ':'S'),
      q:'<div class="text-2xl font-extrabold text-orange-600 my-2">'+a+' × '+n+' = '+vp+'</div><div class="text-base text-slate-500">Đúng (Đ) hay sai (S)?</div>',
      choices:['Đ','S'], correct:(laDung?0:1), sai:(laDung?{}:{'0':tag}),
      goiY:{'lech-nhom':'Bé đếm lại xem có mấy số '+a+' trong tổng nhé!', 'cong-thay-nhan':a+' × '+n+' là '+n+' lần số '+a+', không phải cộng '+a+' với '+n+'.', 'chung':'Bé tính cả hai vế rồi so sánh.'}};
  }, check:function(q){
    if(q._lv===1) return q.ans===q._a*q._n && demDem(q.q,'but')===q._a*q._n && q.ans<100;
    if(q._lv===2) return kiemMCQ(q) && q.choices.filter(function(c){ return tinhBT(c)===q._a*q._n; }).length===1 && tinhBT(q._dung)===q._a*q._n;
    return q.choices.join()==='Đ,S' && (q._dung==='Đ')===(tinhBT(q._lhs)===tinhBT(q._rhs)) && q.correct===(q._dung==='Đ'?0:1); }},

  /* D2 — Đặt tính, nhân không nhớ (Khám phá 1, Hoạt động 1) */
  {name:'Đặt tính, nhân không nhớ', sec:'Khám phá 1 và Hoạt động 1 — Đặt tính rồi tính (không nhớ)', mt:['MT1'], levels:3,
   muc:['Nhân hàng đơn vị trong phép đặt tính (có cả nhân với 1).', 'Đặt tính và tìm tích: 34 × 2, 43 × 2, 11 × 7.', 'Nhẩm trực tiếp tích, hoặc chữ số hàng chục của tích.'],
   make:function(lv){
    var p;
    if(lv<=1){ p=chonPhep('kn',3,1,3);
      return {type:'num', _lv:1, _p:p, _pt:{a:p.a,b:p.b,n:null,kq:' ?'}, q:figPT(p.a,p.b,{kq:' ?'})+'<div>Nhân từng hàng, bắt đầu từ hàng đơn vị. Số ở ô <b class="text-amber-700">?</b> là bao nhiêu?</div>',
        ans:p.u*p.b, sai:nhanSai([[p.t*p.b,'dao-vai'],[p.u+p.b,'cong-thay-nhan'],[p.u*p.b+1,'nham-bang'],[p.u*p.b-1,'nham-bang']], p.u*p.b),
        goiY:{'dao-vai':'Bé nhân hàng đơn vị trước: '+p.u+' × '+p.b+'.', 'cong-thay-nhan':'Đây là phép nhân, không phải phép cộng.', 'nham-bang':'Bé nhẩm lại: '+p.u+' × '+p.b+' bằng mấy?'}}; }
    if(lv===2){ p = Math.random()<0.3 ? chonPhep('kn',1,5,9) : chonPhep('kn',4,2,4);
      return {type:'num', _lv:2, _p:p, _pt:{a:p.a,b:p.b,n:null,kq:'??'}, q:figPT(p.a,p.b,{kq:'??'})+'<div>Đặt tính rồi tính. Tích <b class="text-amber-700">'+p.a+' × '+p.b+'</b> bằng bao nhiêu?</div>', ans:p.p, sai:saiTich(p), goiY:goiYTich(p)}; }
    p=chonPhep('kn',4,2,4);
    if(Math.random()<0.35) return {type:'num', _lv:3, _p:p, _loai:'chuc', q:'<div class="text-slate-500 mb-1">Tính nhẩm</div><div class="text-4xl font-extrabold text-orange-600">'+p.a+' × '+p.b+'</div><div class="mt-1">Chữ số hàng chục của tích là'+oHoi()+'</div>', ans:p.t*p.b,
      sai:nhanSai([[p.u*p.b,'dao-vai'],[p.t+p.b,'cong-thay-nhan'],[p.t*p.b+1,'nham-bang'],[p.t*p.b-1,'nham-bang']], p.t*p.b),
      goiY:{'dao-vai':'Chữ số hàng chục của tích là '+p.t+' × '+p.b+', không phải '+p.u+' × '+p.b+'.', 'cong-thay-nhan':'Đây là phép nhân, không phải phép cộng.', 'nham-bang':'Bé nhẩm lại: '+p.t+' × '+p.b+' bằng mấy?'}};
    var sw=Math.random()<0.4;
    return {type:'num', _lv:3, _p:p, _loai:'tich', q:kyHieu('Tính nhẩm', (sw ? p.b+' × '+p.a : p.a+' × '+p.b)+' ='+oHoi()), ans:p.p, sai:saiTich(p), goiY:goiYTich(p)};
  }, check:function(q){ var p=q._p;
    if(q._lv===1) return q.ans===p.u*p.b && !coNho(p.a,p.b) && kiemPT(q);
    if(q._lv===2) return q.ans===p.p && !coNho(p.a,p.b) && kiemPT(q) && p.p<100;
    return !coNho(p.a,p.b) && p.p<100 && q.ans===(q._loai==='chuc' ? p.t*p.b : p.p); }},

  /* D3 — Nhân nhẩm số tròn chục (Hoạt động 2) */
  {name:'Nhân nhẩm số tròn chục', sec:'Hoạt động 2 — Tính nhẩm: 2 chục × 3 = 6 chục = 60', mt:['MT1'], levels:3,
   muc:['10 × b: 1 chục × b = b chục.', '20 × 4, 30 × 3, 40 × 2 (chục × số = chục).', 'Tìm thừa số chưa biết (? × 3 = 90); nhẩm khi đổi chỗ thừa số.'],
   make:function(lv){
    var t, b;
    if(lv<=1){ b=rnd(2,9);
      return {type:'num', _lv:1, _t:1, _b:b, q:kyHieu('Tính nhẩm', '10 × '+b+' ='+oHoi())+'<div class="text-slate-600 text-base mt-1">1 chục × '+b+' = '+b+' chục = ?</div>', ans:10*b,
        sai:nhanSai([[b,'nham-hang'],[100*b,'nham-hang'],[10+b,'cong-thay-nhan']], 10*b),
        goiY:{'nham-hang':b+' chục là '+(10*b)+' (viết '+b+' ở hàng chục, 0 ở hàng đơn vị).', 'cong-thay-nhan':'Đây là phép nhân, không phải phép cộng.'}}; }
    var cs=[[2,2],[2,3],[2,4],[3,2],[3,3],[4,2]], c;
    if(lv===2){ c=pick(cs); t=c[0]; b=c[1];
      return {type:'num', _lv:2, _t:t, _b:b, q:kyHieu('Tính nhẩm', (10*t)+' × '+b+' ='+oHoi()), ans:10*t*b,
        sai:nhanSai([[t*b,'nham-hang'],[t*b*100,'nham-hang'],[10*t+b,'cong-thay-nhan']], 10*t*b),
        goiY:{'nham-hang':t+' chục × '+b+' = '+(t*b)+' chục, tức là '+(10*t*b)+'.', 'cong-thay-nhan':'Đây là phép nhân, không phải phép cộng.'}}; }
    c=pick(cs); t=c[0]; b=c[1]; var P=10*t*b;
    if(Math.random()<0.5) return {type:'num', _lv:3, _t:t, _b:b, _loai:'tim', q:kyHieu('Tìm số thích hợp', oHoi()+' × '+b+' = '+P), ans:10*t,
      sai:nhanSai([[t,'nham-hang'],[t*100,'nham-hang'],[P,'dao-vai'],[P-b,'cong-thay-nhan']], 10*t),
      goiY:{'nham-hang':'Bé nhẩm: mấy chục × '+b+' = '+(t*b)+' chục? Rồi viết thành số.', 'dao-vai':'Ô trống là thừa số chưa biết, không phải tích.', 'cong-thay-nhan':'Đây là phép nhân, không phải phép trừ.'}};
    return {type:'num', _lv:3, _t:t, _b:b, _loai:'doi', q:kyHieu('Tính nhẩm', b+' × '+(10*t)+' ='+oHoi()), ans:P,
      sai:nhanSai([[t*b,'nham-hang'],[t*b*100,'nham-hang'],[10*t+b,'cong-thay-nhan']], P),
      goiY:{'nham-hang':b+' × '+t+' chục = '+(t*b)+' chục, tức là '+P+'.', 'cong-thay-nhan':'Đây là phép nhân, không phải phép cộng.'}};
  }, check:function(q){ var P=10*q._t*q._b;
    if(q._lv===1) return q.ans===10*q._b;
    if(q._lv===2) return q.ans===P && q._t*q._b<=9;
    return q._t*q._b<=9 && P<100 && q.ans===(q._loai==='tim' ? 10*q._t : P); }},

  /* D4 — Nhân có nhớ: chùm nho (Khám phá 2) */
  {name:'Nhân có nhớ: bài toán', sec:'Khám phá 2 — Mỗi chùm 26 quả nho, 3 chùm: 26 × 3 = 78', mt:['MT2'], levels:3,
   muc:['Bài toán nhân có nhớ, số nhỏ (b = 2 hoặc 3).', 'Tính 37 × 2, 16 × 4, 29 × 3, 18 × 5.', 'Tích sát 100 (19 × 5, 24 × 4, 48 × 2) trong bài toán.'],
   make:function(lv){
    var p, ct=pick([['chùm','quả nho'],['giỏ','quả táo'],['khay','quả cà chua'],['rổ','quả cam']]);
    if(lv<=1){ p=chonPhep('cn',3,2,3);
      return {type:'num', _p:p, q:'<div>Mỗi '+ct[0]+' có '+p.a+' '+ct[1]+'. Có '+p.b+' '+ct[0]+' như thế.</div><div class="mt-1">Hỏi tất cả có bao nhiêu '+ct[1]+'?</div>', ans:p.p, unit:ct[1], sai:saiTich(p), goiY:goiYTich(p)}; }
    if(lv===2){ p=chonPhep('cn',4,2,5);
      return {type:'num', _p:p, q:kyHieu('Tính', p.a+' × '+p.b+' ='+oHoi()), ans:p.p, sai:saiTich(p), goiY:goiYTich(p)}; }
    p=chonPhep('cn',4,2,5,85);
    return {type:'num', _p:p, q:'<div>Mỗi '+ct[0]+' có '+p.a+' '+ct[1]+'. Có '+p.b+' '+ct[0]+' như thế.</div><div class="mt-1">Hỏi tất cả có bao nhiêu '+ct[1]+'?</div>', ans:p.p, unit:ct[1], sai:saiTich(p), goiY:goiYTich(p)};
  }, check:function(q){ var p=q._p; return coNho(p.a,p.b) && p.p<100 && q.ans===p.p && p.t*p.b+p.c<=9; }},

  /* D5 — Đặt tính, nhân có nhớ (Khám phá 2, Hoạt động) */
  {name:'Đặt tính, nhân có nhớ', sec:'Khám phá 2 — Đặt tính: viết 8 nhớ 1; 3 × 2 = 6, thêm 1 bằng 7', mt:['MT2'], levels:3,
   muc:['Chữ số viết ở hàng đơn vị của tích (viết một chữ số, nhớ chữ số kia).', 'Chữ số viết ở hàng chục khi đã có số nhớ.', 'Tính cả tích 29 × 3, 18 × 5, 19 × 5.'],
   make:function(lv){
    var p;
    if(lv<=1){ p=chonPhep('cn',3,2,3);
      return {type:'num', _lv:1, _p:p, _pt:{a:p.a,b:p.b,n:null,kq:' ?'}, q:figPT(p.a,p.b,{kq:' ?'})+'<div>'+p.u+' × '+p.b+' = '+(p.u*p.b)+'. Chữ số viết ở hàng đơn vị của tích (ô <b class="text-amber-700">?</b>) là mấy?</div>',
        ans:p.d, sai:nhanSai([[p.u*p.b,'viet-ca-hai-chu-so'],[p.c,'nho-nham'],[p.t*p.b,'dao-vai']], p.d),
        goiY:{'viet-ca-hai-chu-so':'Hàng đơn vị chỉ viết một chữ số: viết '+p.d+', nhớ '+p.c+'.', 'nho-nham':p.c+' là số nhớ (nhớ sang hàng chục), không phải chữ số viết ở hàng đơn vị.', 'dao-vai':'Ô ? ở hàng đơn vị, bé lấy chữ số hàng đơn vị của '+(p.u*p.b)+'.'}}; }
    if(lv===2){ p=chonPhep('cn',4,2,5);
      return {type:'num', _lv:2, _p:p, _pt:{a:p.a,b:p.b,n:p.c,kq:'?'+p.d}, q:figPT(p.a,p.b,{nho:p.c,kq:'?'+p.d})+'<div>Số nhớ <b>'+p.c+'</b> đã viết. Chữ số ở ô <b class="text-amber-700">?</b> là mấy?</div>',
        ans:p.t*p.b+p.c, sai:nhanSai([[p.t*p.b,'quen-nho'],[p.t*p.b+p.c+1,'nho-nham'],[p.c,'nho-nham']], p.t*p.b+p.c),
        goiY:{'quen-nho':'Nhân hàng chục: '+p.t+' × '+p.b+' = '+(p.t*p.b)+', rồi cộng thêm số nhớ '+p.c+'.', 'nho-nham':'Chỉ cộng đúng số nhớ '+p.c+' vào '+p.t+' × '+p.b+'.'}}; }
    p=chonPhep('cn',4,2,5,80);
    return {type:'num', _lv:3, _p:p, _pt:{a:p.a,b:p.b,n:null,kq:'??'}, q:figPT(p.a,p.b,{kq:'??'})+'<div>Đặt tính rồi tính. Tích <b class="text-amber-700">'+p.a+' × '+p.b+'</b> bằng bao nhiêu?</div>', ans:p.p, sai:saiTich(p), goiY:goiYTich(p)};
  }, check:function(q){ var p=q._p;
    if(!(coNho(p.a,p.b) && p.t*p.b+p.c<=9 && kiemPT(q))) return false;
    if(q._lv===1) return q.ans===p.d;
    if(q._lv===2) return q.ans===p.t*p.b+p.c;
    return q.ans===p.p; }},

  /* D6 — Có nhớ hay không nhớ (không có trong SGK) */
  {name:'Có nhớ hay không nhớ', sec:'Phân biệt phép nhân có nhớ và không nhớ', mt:['MT2'], levels:3,
   muc:['Chọn phép nhân có nhớ trong ba phép.', 'Chọn phép nhân KHÔNG có nhớ trong ba phép.', 'Số nhớ khi nhân hàng đơn vị là mấy?'],
   make:function(lv){
    if(lv>=3){ var p=chonPhep('cn',4,2,5);
      return {type:'num', _lv:3, _p:p, q:'<div class="text-slate-500 mb-1">Tính</div><div class="text-4xl font-extrabold text-orange-600">'+p.a+' × '+p.b+'</div><div class="mt-1">Nhân hàng đơn vị: '+p.u+' × '+p.b+' = '+(p.u*p.b)+'. Số nhớ là'+oHoi()+'</div>', ans:p.c,
        sai:nhanSai([[p.u*p.b,'viet-ca-hai-chu-so'],[p.d,'nho-nham'],[p.t*p.b,'dao-vai']], p.c),
        goiY:{'viet-ca-hai-chu-so':'Số nhớ chỉ là chữ số hàng chục của '+(p.u*p.b)+', không phải cả số.', 'nho-nham':'Viết '+p.d+' ở hàng đơn vị, còn số nhớ là chữ số hàng chục của '+(p.u*p.b)+'.', 'dao-vai':'Số nhớ lấy từ phép nhân hàng đơn vị, không phải hàng chục.'}}; }
    var coCh = lv<=1, ps=[], g;   /* coCh: hỏi phép CÓ nhớ; ngược lại hỏi phép KHÔNG nhớ */
    for(g=0;g<400 && ps.length<3;g++){
      var need = ps.length===0 ? (coCh ? 'cn' : 'kn') : (coCh ? 'kn' : 'cn'), x=chonPhep(need, 4, 2, 5);
      if(x && ps.every(function(y){ return y.p!==x.p && y.a!==x.a; })) ps.push(x);
    }
    var dung=ps[0], ds=shuffle(ps.slice()), ch=ds.map(function(x){ return x.a+' × '+x.b; }), sai={};
    if(!coCh) ds.forEach(function(x,i){ if(x!==dung) sai[String(i)]='quen-nho'; });
    return {type:'mcq', cot:1, _lv:lv, _co:coCh, _dung:dung.a+' × '+dung.b, q:'<div>Phép nhân nào '+(coCh ? '<b>có nhớ</b>' : '<b>không có nhớ</b>')+'?</div>', choices:ch, correct:ch.indexOf(dung.a+' × '+dung.b), sai:sai,
      goiY:{'quen-nho':'Bé nhân hàng đơn vị: nếu kết quả có hai chữ số (từ 10 trở lên) thì phép nhân đó có nhớ.', 'chung':'Bé nhân hàng đơn vị: kết quả có hai chữ số (từ 10 trở lên) thì phép nhân có nhớ, còn một chữ số thì không nhớ.'}};
  }, check:function(q){
    if(q.type==='num') return coNho(q._p.a,q._p.b) && q.ans===q._p.c && q._p.c>=1 && q._p.c<=4;
    var f=q.choices.map(function(c){ var s=c.split(' × '); return coNho(+s[0], +s[1]); }), dem=f.filter(function(x){ return x; }).length;
    return kiemMCQ(q) && q.choices.length===3 && f[q.correct]===q._co && (q._co ? dem===1 : dem===2); }},

  /* D7 — Bạn An làm có đúng? (không có trong SGK) */
  {name:'Bạn An làm có đúng?', sec:'Tìm lỗi — Phép nhân đặt tính của bạn An', mt:['MT3'], levels:3,
   muc:['Em thấy thế nào về bài của An (một lỗi rõ)?', 'An sai ở bước nào: quên nhớ, viết cả hai chữ số hay nhớ nhầm?', 'An tính sai. Kết quả đúng là bao nhiêu?'],
   make:function(lv){
    var p=phepAn(), kinds=['quen-nho','viet-ca-hai-chu-so','nho-nham'], kind=pick(kinds), e=loiAn(kind,p), gy=goiYAn(p);
    if(lv<=1){ var dungAn=Math.random()<0.4, X, ve, fig, dsn;
      if(dungAn){ X=p.p-10*p.c; fig=figPT(p.a,p.b,{nho:p.c,kq:String(p.p)}); ve={nho:p.c,kq:String(p.p)};
        dsn=[['Đồng ý, vì '+p.a+' × '+p.b+' = '+p.p, true, p.p],['Không đồng ý, vì '+p.a+' × '+p.b+' = '+X, false, X]]; }
      else { fig=figPT(p.a,p.b,{nho:e.nho,kq:e.kq}); ve={nho:e.nho,kq:e.kq};
        dsn=[['Đồng ý, vì '+p.a+' × '+p.b+' = '+(+e.kq), true, +e.kq],['Không đồng ý, vì '+p.a+' × '+p.b+' = '+p.p, false, p.p]]; }
      shuffle(dsn); var ch=dsn.map(function(d){ return d[0]; }), idx=dsn.findIndex(function(d){ return d[2]===p.p; }), sai={};
      if(!dungAn) sai[String(1-idx)]=kind;
      return {type:'mcq', cot:1, _lv:1, _p:p, _dungAn:dungAn, _pt:{a:p.a,b:p.b,n:ve.nho,kq:ve.kq}, _dsn:dsn, _dung:dsn[idx][0],
        q:nguoiNoi('boy','<div class="text-center">Bạn An đặt tính và nói: «Mình tính đúng rồi.»</div>')+fig+'<div>Em thấy thế nào?</div>', choices:ch, correct:idx, sai:sai, goiY:gy}; }
    if(lv===2){
      var tx=[['quen-nho',TEN_LOI_AN['quen-nho']],['viet-ca-hai-chu-so',TEN_LOI_AN['viet-ca-hai-chu-so']],['nho-nham',TEN_LOI_AN['nho-nham']],['',  'An không sai ở bước nào cả.']];
      shuffle(tx); var ch2=tx.map(function(d){ return d[1]; }), sai2={}; tx.forEach(function(d,i){ if(d[0] && d[0]!==kind) sai2[String(i)]=d[0]; });
      var di = tx.findIndex(function(d){ return d[0]===kind; });
      return {type:'mcq', cot:1, _lv:2, _p:p, _kind:kind, _pt:{a:p.a,b:p.b,n:e.nho,kq:e.kq}, _dung:ch2[di],
        q:nguoiNoi('boy','<div class="text-center">Bạn An đặt tính như hình. Kết quả của An sai.</div>')+figPT(p.a,p.b,{nho:e.nho,kq:e.kq})+'<div>An sai ở bước nào?</div>', choices:ch2, correct:di, sai:sai2, goiY:gy}; }
    return {type:'num', _lv:3, _p:p, _kind:kind, _pt:{a:p.a,b:p.b,n:e.nho,kq:e.kq}, q:nguoiNoi('boy','<div class="text-center">Bạn An đặt tính như hình nhưng tính sai.</div>')+figPT(p.a,p.b,{nho:e.nho,kq:e.kq})+'<div>Kết quả đúng của <b>'+p.a+' × '+p.b+'</b> là bao nhiêu?</div>',
      ans:p.p, sai:nhanSai([[+e.kq,kind]].concat(Object.keys(saiTich(p)).map(function(k){ return [+k, saiTich(p)[k]]; })), p.p), goiY:gy};
  }, check:function(q){
    var p=q._p, e;
    if(!(p.c>=1 && p.t*p.b+p.c<=9 && kiemPT(q))) return false;
    if(q._lv===1){
      var okDs = q._dsn.length===2 && q._dsn.filter(function(d){ return d[2]===p.p; }).length===1 && q.choices[q.correct]===q._dung && new Set(q.choices).size===2;
      var kq=+q._pt.kq; if(q._dungAn) return okDs && kq===p.p && q._pt.n===p.c;
      return okDs && kq!==p.p; }
    e=loiAn(q._kind,p); if(!e || e.kq!==q._pt.kq || e.nho!==q._pt.n || +e.kq===p.p) return false;
    if(q._lv===2) return kiemMCQ(q) && q.choices.length===4;
    return q.ans===p.p && +e.kq!==p.p; }},

  /* D8 — Điền chữ số còn thiếu (không có trong SGK) */
  {name:'Điền chữ số còn thiếu', sec:'Điền chữ số còn thiếu trong phép nhân đặt dọc', mt:['MT3'], levels:3,
   muc:['Ô ? ở tích, phép không nhớ.', 'Ô ? ở tích, phép có nhớ (số nhớ đã viết).', 'Ô ? ở thừa số: tìm chữ số khi biết tích.'],
   make:function(lv){
    var p, pos;
    if(lv<=1){ p=chonPhep('kn',4,2,4); pos=pick(['t','u']); var ks = pos==='t' ? '?'+(p.p%10) : String(Math.floor(p.p/10))+'?', ans = pos==='t' ? Math.floor(p.p/10) : p.p%10;
      return {type:'num', _lv:1, _p:p, _ans:ans, _pt:{a:p.a,b:p.b,n:null,kq:ks}, q:figPT(p.a,p.b,{kq:ks})+'<div>Chữ số ở ô <b class="text-amber-700">?</b> là mấy?</div>', ans:ans,
        sai:nhanSai([[pos==='t' ? p.p%10 : Math.floor(p.p/10),'dao-vai'],[ans+1,'nham-bang'],[ans-1,'nham-bang']], ans),
        goiY:{'dao-vai':'Bé nhân hàng '+(pos==='t'?'chục':'đơn vị')+': '+(pos==='t' ? p.t : p.u)+' × '+p.b+'.', 'nham-bang':'Bé nhẩm lại phép nhân ở hàng đó nhé!'}}; }
    if(lv===2){ p=chonPhep('cn',4,2,5); pos=pick(['t','u']); var ks2 = pos==='t' ? '?'+p.d : String(p.t*p.b+p.c)+'?', ans2 = pos==='t' ? p.t*p.b+p.c : p.d;
      return {type:'num', _lv:2, _p:p, _ans:ans2, _pt:{a:p.a,b:p.b,n:p.c,kq:ks2}, q:figPT(p.a,p.b,{nho:p.c,kq:ks2})+'<div>Chữ số ở ô <b class="text-amber-700">?</b> là mấy?</div>', ans:ans2,
        sai:nhanSai(pos==='t' ? [[p.t*p.b,'quen-nho'],[p.t*p.b+p.c+1,'nho-nham']] : [[p.u*p.b,'viet-ca-hai-chu-so'],[p.c,'nho-nham']], ans2),
        goiY:{'quen-nho':'Hàng chục: '+p.t+' × '+p.b+' rồi cộng thêm số nhớ '+p.c+'.', 'nho-nham':'Viết '+p.d+' ở hàng đơn vị, số nhớ là '+p.c+'.', 'viet-ca-hai-chu-so':'Hàng đơn vị chỉ viết một chữ số.'}}; }
    p = Math.random()<0.5 ? chonPhep('cn',4,2,5) : chonPhep('kn',4,2,4); pos=pick(['a1','a0','b0']);
    var ans3 = pos==='a1' ? p.t : (pos==='a0' ? p.u : p.b), kq3=String(p.p);
    return {type:'num', _lv:3, _p:p, _pos:pos, _ans:ans3, _pt:{a:p.a,b:p.b,n:null,kq:kq3,an:pos}, q:figPT(p.a,p.b,{kq:kq3,an:pos})+'<div>Chữ số ở ô <b class="text-amber-700">?</b> là mấy?</div>', ans:ans3,
      sai:nhanSai([[ans3+1,'nham-bang'],[ans3-1,'nham-bang'],[pos==='b0' ? p.u : p.b,'dao-vai']], ans3),
      goiY:{'nham-bang':'Bé thử chữ số đó rồi nhân lại xem có ra tích không.', 'dao-vai':'Ô ? là một chữ số của thừa số, không phải của tích.'}};
  }, check:function(q){
    var p=q._p, d, nghiem=[], c;
    if(!kiemPT(q)) return false;
    if(q._lv<=2) return String(q._pt.kq).replace('?',q.ans)===String(p.p) && q.ans===q._ans && (q._lv===1 ? !coNho(p.a,p.b) : (coNho(p.a,p.b) && p.t*p.b+p.c<=9));
    for(d=0;d<=9;d++){ var a2 = q._pos==='a1' ? 10*d+p.u : (q._pos==='a0' ? 10*p.t+d : p.a), b2 = q._pos==='b0' ? d : p.b;
      if(a2>=10 && b2>=1 && a2*b2===p.p) nghiem.push(d); }
    return nghiem.length===1 && nghiem[0]===q.ans && q.ans===q._ans; }},

  /* D9 — Đổi chỗ hai thẻ số (Luyện tập 2) */
  {name:'Đổi chỗ hai thẻ số', sec:'Luyện tập 2 — Đổi chỗ hai thẻ số để phép tính đúng', mt:['MT3'], levels:3,
   muc:['Đổi chỗ một thẻ của số thứ nhất với thẻ của số thứ hai (như sách), phép không nhớ.', 'Đổi chỗ hai thẻ của cùng một số, hoặc hai thẻ cạnh nhau; có cả phép có nhớ.', 'Đổi chỗ hai thẻ ở xa nhau, một thẻ ở tích.']
   ,
   make:function(lv){
    var cap = lv<=1 ? [[0,2],[1,2]] : (lv===2 ? [[3,4],[0,1],[1,2]] : [[0,3],[1,3],[0,4],[1,4],[2,3],[2,4],[0,2],[1,2]]);
    for(var g=0;g<4000;g++){
      var p=chonPhep(lv<=1 ? 'kn' : (Math.random()<0.5 ? 'cn' : 'kn'), 4, 2, 5);
      if(!p || p.p%10===0) continue;
      var T=[p.t,p.u,p.b,Math.floor(p.p/10),p.p%10], ij=pick(cap), i=ij[0], j=ij[1];
      if(T[i]===T[j]) continue;
      var D=doiCho(T,i,j), cc=cacCachDoi(D);
      if(theDung(D) || cc.length!==1 || cc[0][0]!==i || cc[0][1]!==j) continue;
      var tat=[], a, b;
      for(a=0;a<5;a++) for(b=a+1;b<5;b++) if(!(a===i && b===j)) tat.push([a,b]);
      var sel=shuffle(tat).slice(0,3), dsx=[[i,j]].concat(sel); shuffle(dsx);
      var ch=dsx.map(function(x){ return chuCap(x[0],x[1]); }), dung=chuCap(i,j), sai={};
      dsx.forEach(function(x,k){ if(!(x[0]===i && x[1]===j)) sai[String(k)]='dao-vai'; });
      return {type:'mcq', cot:1, _cap:[i,j], _the:D, _dung:dung, q:'<div class="flex justify-center my-1">'+theSo(D)+'</div><div>Đổi chỗ <b>hai thẻ số</b> để phép tính đúng. Em đổi chỗ hai thẻ nào?</div>', choices:ch, correct:ch.indexOf(dung), sai:sai,
        goiY:{'dao-vai':'Bé thử đổi chỗ hai thẻ đó, rồi tính lại xem phép tính có đúng không.'}};
    }
    return null;
  }, check:function(q){
    var c=docThe(q.q), cc=cacCachDoi(c);
    return c.length===5 && !theDung(c) && cc.length===1 && cc[0][0]===q._cap[0] && cc[0][1]===q._cap[1] && q._the.join()===c.join() && kiemMCQ(q) && q.choices.length===4
      && q._dung===chuCap(cc[0][0],cc[0][1]); }},

  /* D10 — Giải toán bằng phép nhân (Hoạt động 3 và bài toán) */
  {name:'Giải toán bằng phép nhân', sec:'Hoạt động 3 — 3 bình, mỗi bình 21 viên sỏi: tất cả bao nhiêu viên?', mt:['MT4'], levels:3,
   muc:['Một phép nhân không nhớ (3 bình, mỗi bình 21 viên).', 'Một phép nhân có nhớ (4 hộp, mỗi hộp 18 viên).', 'Hai bước: nhân rồi cộng thêm hoặc trừ bớt.'],
   make:function(lv){
    var ct=pick([['bình','viên sỏi'],['túi','viên bi'],['hộp','viên kẹo'],['rổ','quả trứng']]), av=pick(['boy','girl']), p;
    var dau=function(){ return '<div class="flex justify-center mb-1">'+anh(av, 64, 'Bạn nhỏ')+'</div>'; };
    if(lv<=1){ p=chonPhep('kn',3,2,3);
      return {type:'num', _lv:1, _p:p, q:dau()+'<div>Có '+p.b+' '+ct[0]+', mỗi '+ct[0]+' có '+p.a+' '+ct[1]+'.</div><div class="mt-1">Hỏi tất cả có bao nhiêu '+ct[1]+'?</div>', ans:p.p, unit:ct[1], sai:saiTich(p), goiY:goiYTich(p)}; }
    if(lv===2){ p=chonPhep('cn',4,2,5);
      return {type:'num', _lv:2, _p:p, q:dau()+'<div>Có '+p.b+' '+ct[0]+', mỗi '+ct[0]+' có '+p.a+' '+ct[1]+'.</div><div class="mt-1">Hỏi tất cả có bao nhiêu '+ct[1]+'?</div>', ans:p.p, unit:ct[1], sai:saiTich(p), goiY:goiYTich(p)}; }
    p=chonPhep('cn',4,2,5,50); var them=Math.random()<0.5 && p.p<=90, c=rnd(5,Math.min(30,them ? 99-p.p : p.p-5)); if(c<5) c=5;
    var kq = them ? p.p+c : p.p-c, sai=[[p.p,'thieu-buoc'],[them ? p.p-c : p.p+c,'chon-sai-phep'],[p.a+p.b+(them?c:-c),'cong-thay-nhan'],[(p.p-10*p.c)+(them?c:-c),'quen-nho']];
    return {type:'num', _lv:3, _p:p, _c:c, _them:them, q:dau()+'<div>Có '+p.b+' '+ct[0]+', mỗi '+ct[0]+' có '+p.a+' '+ct[1]+'. '+(them ? 'Sau đó có thêm '+c+' '+ct[1]+' nữa.' : 'Đã lấy đi '+c+' '+ct[1]+'.')+'</div><div class="mt-1">Hỏi '+(them ? 'bây giờ có tất cả' : 'còn lại')+' bao nhiêu '+ct[1]+'?</div>',
      ans:kq, unit:ct[1], sai:nhanSai(sai, kq),
      goiY:{'thieu-buoc':'Bài này cần hai bước: tìm số '+ct[1]+' của '+p.b+' '+ct[0]+' trước, rồi '+(them ? 'cộng thêm' : 'trừ đi')+' '+c+'.', 'chon-sai-phep':(them ? 'Có thêm là cộng, không phải trừ.' : 'Lấy đi là bớt, dùng phép trừ.'), 'cong-thay-nhan':p.b+' '+ct[0]+', mỗi '+ct[0]+' '+p.a+': dùng phép nhân '+p.a+' × '+p.b+'.', 'quen-nho':'Bé tính lại '+p.a+' × '+p.b+', nhớ cộng số nhớ nhé!'}};
  }, check:function(q){ var p=q._p;
    if(q._lv<=2) return q.ans===p.p && (q._lv===1 ? !coNho(p.a,p.b) : coNho(p.a,p.b)) && p.p<100;
    return coNho(p.a,p.b) && q.ans===(q._them ? p.p+q._c : p.p-q._c) && q.ans>0 && q.ans<=99+q._c; }},

  /* D11 — Phép tính ứng với kết quả (Luyện tập 1: tìm chữ qua kết quả; không chép trò chơi của sách) */
  {name:'Phép tính ứng với kết quả', sec:'Luyện tập 1 — Kết quả của phép tính ứng với chữ cái', mt:['MT4'], levels:3,
   muc:['Phép tính nào có kết quả cho trước (chọn một trong bốn).', 'Kết quả cho trước ứng với chữ nào trong bảng.', 'Các kết quả cho trước ghép lại thành từ nào.'],
   make:function(lv){
    var chus=BANG_CHU.map(function(d){ return d.chu; });
    if(lv<=1){ var pool=shuffle(BANG_CHU.slice()).slice(0,4), tg=pool[0], ket=tinhBT(tg.phep), ch=shuffle(pool.map(function(d){ return d.phep; }));
      return {type:'mcq', cot:1, _lv:1, _kq:ket, _dung:tg.phep, q:'<div>Phép tính nào có kết quả bằng <b class="text-orange-600 text-2xl">'+ket+'</b>?</div>', choices:ch, correct:ch.indexOf(tg.phep),
        goiY:{'chung':'Bé tính kết quả từng phép tính, rồi tìm phép có kết quả '+ket+'.'}}; }
    if(lv===2){ var tg2=pick(BANG_CHU), ket2=tinhBT(tg2.phep), ch2=shuffle([tg2.chu].concat(shuffle(chus.filter(function(c){ return c!==tg2.chu; })).slice(0,3)));
      return {type:'mcq', _lv:2, _kq:ket2, _dung:tg2.chu, q:'<div class="flex justify-center my-1">'+bangChu(BANG_CHU)+'</div><div>Kết quả <b class="text-orange-600 text-2xl">'+ket2+'</b> ứng với chữ nào?</div>', choices:ch2, correct:ch2.indexOf(tg2.chu),
        goiY:{'chung':'Bé tính kết quả từng phép tính trong bảng, tìm phép có kết quả '+ket2+', rồi đọc chữ của phép đó.'}}; }
    var tu=pick(['CHÙA','MỘT','CỘT']), kqs=tu.split('').map(function(c){ return ketQuaChu(c); }), ds=[tu], g;
    for(g=0;g<200 && ds.length<4;g++){ var w=tu.split(''), k=rnd(0,w.length-1); w[k]=pick(chus.filter(function(c){ return c!==tu.charAt(k); })); var ws=w.join(''); if(ds.indexOf(ws)<0) ds.push(ws); }
    shuffle(ds);
    return {type:'mcq', _lv:3, _tu:tu, _kqs:kqs, _dung:tu, q:'<div class="flex justify-center my-1">'+bangChu(BANG_CHU)+'</div><div>Các kết quả <b class="text-orange-600 text-xl">'+kqs.join(', ')+'</b> ứng với các chữ nào? Em đọc được từ nào?</div>', choices:ds, correct:ds.indexOf(tu),
      goiY:{'chung':'Bé tính kết quả từng phép tính trong bảng, ghi chữ ứng với từng kết quả theo thứ tự đề bài.'}};
  }, check:function(q){
    var seen={}, bang=BANG_CHU.every(function(d){ var v=tinhBT(d.phep); if(seen[v]) return false; seen[v]=1; return Number.isInteger(v) && v<100; });
    if(!bang || !kiemMCQ(q)) return false;
    if(q._lv===1) return q.choices.filter(function(c){ return tinhBT(c)===q._kq; }).length===1 && tinhBT(q._dung)===q._kq;
    var b=docBang(q.q); if(b.length!==8 || b.some(function(d,i){ return d.chu!==BANG_CHU[i].chu || d.phep!==BANG_CHU[i].phep; })) return false;
    if(q._lv===2) return tinhBT(chuaChu(q._dung).phep)===q._kq && q.choices.length===4;
    return q._tu.split('').every(function(c,i){ return ketQuaChu(c)===q._kqs[i]; }) && q.choices.length===4; }}
 ]
};
