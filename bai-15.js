/* bai-15.js — Bài 15: Luyện tập chung. BÀI MỚI, Engine v2 — LUYỆN THÔNG MINH ngay từ đầu.
   Theo bảng phân tích sư phạm đã duyệt (phan-tich-su-pham/bai-15.md):
   5 MỤC TIÊU (muctieu) × 12 DẠNG (topics), mỗi dạng 3 mức (Thông tư 27: Nhận biết · Hiểu · Vận dụng).
   Mỗi câu gắn nhãn lỗi cho đáp án nhiễu (q.sai) + gợi ý (q.goiY).
   Hình mới viết ngay trong file này (không sửa figures.js): banLi, tamGiacSo, hinhPS, luoiVat.
   Vật để ĐẾM gắn data-dem; check() đếm lại bằng demDem() và so với đáp án. Không số thập phân. Không emoji.
   QUY TẮC: nối chuỗi, KHÔNG backtick và KHÔNG template literal. */

/* ---- Tiện ích chung ---- */
function nhanSai(ds, dung){ var o={}; ds.forEach(function(p){ var v=p[0]; if(v>0 && v!==dung && !(String(v) in o)) o[String(v)]=p[1]; }); return o; }
function kiemMCQ(q){ return q.choices[q.correct]===q._dung && new Set(q.choices).size===q.choices.length; }
function dsBtn15(ch){ return '<span class="text-2xl font-extrabold text-slate-700">'+ch+'</span><span class="ml-2 text-base font-bold text-slate-600">'+(ch==='Đ'?'Đúng':'Sai')+'</span>'; }
function kyHieu(nhan, bt){ return '<div class="text-slate-500 mb-1">'+nhan+'</div><div class="text-4xl font-extrabold text-orange-600">'+bt+'</div>'; }
/* Đếm số chi tiết gắn data-dem="loai" trong chuỗi SVG/HTML của câu hỏi */
function demDem(s, loai){ var m=String(s).match(new RegExp('data-dem="'+loai+'"','g')); return m ? m.length : 0; }
/* Mở SVG cho nét/chữ đi theo màu giao diện (currentColor) */
function svgX(w, h){ return svgHinh(w, h).replace('<svg ', '<svg class="text-slate-700" '); }
function cung(cx, cy, r, a0, a1){   /* quạt tròn từ góc a0 đến a1 (độ) */
  function p(a){ var t=a*Math.PI/180; return (cx+r*Math.cos(t)).toFixed(1)+' '+(cy+r*Math.sin(t)).toFixed(1); }
  return 'M'+cx+' '+cy+' L'+p(a0)+' A'+r+' '+r+' 0 '+((a1-a0)>180?1:0)+' 1 '+p(a1)+' Z';
}

/* ---- Hình mới 1: các bàn, mỗi bàn có moiBan cái li (đếm được) ---- */
function banLi(soBan, moiBan){
  var cols = moiBan<=4 ? moiBan : (moiBan<=6 ? 3 : 4), rows=Math.ceil(moiBan/cols), o=26, w=cols*o+14, h=rows*o+22, ds=[], i, j;
  for(i=0;i<soBan;i++){
    var s=svgHinh(w, h)+'<rect x="1" y="1" width="'+(w-2)+'" height="'+(h-2)+'" rx="10" fill="'+HM.goNhat+'"/>'
      +'<rect x="1" y="'+(h-13)+'" width="'+(w-2)+'" height="12" rx="6" fill="'+HM.go+'"/>';
    for(j=0;j<moiBan;j++) s+='<circle data-dem="li" cx="'+(7+o/2+(j%cols)*o)+'" cy="'+(7+o/2+Math.floor(j/cols)*o)+'" r="9" fill="'+HM.troi+'"/>';
    ds.push(s+'</svg>');
  }
  return xepHang(ds, 3);
}

/* ---- Hình mới 2: tam giác số. dinh = 3 số ở đỉnh; ô vuông giữa hai đỉnh = TÍCH hai đỉnh.
   tt = {d:[...], t:[...]}: mỗi phần tử 0 = hiện số · 1 = hiện "?" · 2 = ô trống (chưa biết, không hỏi) ---- */
function tamGiacSo(dinh, tt){
  var V=[[130,30],[36,150],[224,150]], E=[[0,1],[1,2],[2,0]], s=svgX(260,180), i;
  for(i=0;i<3;i++){ var a=V[E[i][0]], b=V[E[i][1]]; s+='<line x1="'+a[0]+'" y1="'+a[1]+'" x2="'+b[0]+'" y2="'+b[1]+'" stroke="currentColor" stroke-width="3" stroke-linecap="round"/>'; }
  for(i=0;i<3;i++){   /* ô tích ở giữa cạnh */
    var p=V[E[i][0]], q=V[E[i][1]], cx=(p[0]+q[0])/2, cy=(p[1]+q[1])/2, v=dinh[E[i][0]]*dinh[E[i][1]], st=tt.t[i];
    s+= st===1 ? '<rect x="'+(cx-26)+'" y="'+(cy-20)+'" width="52" height="40" rx="10" fill="#fff" stroke="'+HM.vangDam+'" stroke-width="3"/>'+chuSo(cx, cy, '?', 24)
      : '<rect x="'+(cx-26)+'" y="'+(cy-20)+'" width="52" height="40" rx="10" fill="'+(st===2?HM.xam:HM.troi)+'"/>'+(st===2 ? '' : nhanVien(cx, cy, 42, 28, v, 20));
  }
  for(i=0;i<3;i++){   /* đỉnh */
    var st2=tt.d[i], x=V[i][0], y=V[i][1];
    s+= st2===1 ? '<circle cx="'+x+'" cy="'+y+'" r="25" fill="#fff" stroke="'+HM.vangDam+'" stroke-width="3"/>'+chuSo(x, y, '?', 24)
      : '<circle cx="'+x+'" cy="'+y+'" r="26" fill="'+(st2===2?HM.xam:HM.vang)+'"/>'+(st2===2 ? '' : nhanTron(x, y, 19, dinh[i], 20));
  }
  return '<div class="flex justify-center my-2">'+s+'</svg></div>';
}

/* ---- Hình mới 3: hình chia thành các phần, tô một phần. code = 'loai:n:s'
   loai: dai (n dải bằng nhau) · tron (n quạt bằng nhau) · thap (chữ thập 5 ô) · sao (ngôi sao 5 cánh) · luc (lục giác 6 phần) · lech (5 dải KHÔNG bằng nhau) ---- */
var TO15='#FF822D';
function soPhan(code){ var p=code.split(':'); return p[0]==='lech' ? 0 : (+p[1]); }
function hinhPS(code, nhan){
  var p=code.split(':'), t=p[0], n=+p[1], s=+p[2], h=svgX(110,110), K='stroke="currentColor" stroke-width="2.5" stroke-linejoin="round"', i, fl;
  function fill(k){ return k===s ? TO15 : '#fff'; }
  if(t==='dai' || t==='lech'){
    var w=(t==='lech') ? [12,30,16,26,18] : null, x=4, W=102;
    for(i=0;i<n;i++){ var dw = w ? w[i] : W/n; h+='<rect x="'+x.toFixed(1)+'" y="24" width="'+dw.toFixed(1)+'" height="62" fill="'+fill(i)+'" '+K+'/>'; x+=dw; }
  } else if(t==='tron'){
    for(i=0;i<n;i++) h+='<path d="'+cung(55, 55, 50, -90+i*360/n, -90+(i+1)*360/n)+'" fill="'+fill(i)+'" '+K+'/>';
  } else if(t==='thap'){
    var pos=[[39,7],[7,39],[39,39],[71,39],[39,71]];
    for(i=0;i<5;i++) h+='<rect x="'+pos[i][0]+'" y="'+pos[i][1]+'" width="32" height="32" fill="'+fill(i)+'" '+K+'/>';
  } else if(t==='sao'){
    var pt=[]; for(i=0;i<10;i++){ var a=(-90+i*36)*Math.PI/180, r=(i%2===0)?50:19; pt.push([55+r*Math.cos(a), 57+r*Math.sin(a)]); }
    for(i=0;i<5;i++){ var A=pt[(2*i+9)%10], B=pt[2*i], C=pt[2*i+1];
      h+='<polygon points="55,57 '+A[0].toFixed(1)+','+A[1].toFixed(1)+' '+B[0].toFixed(1)+','+B[1].toFixed(1)+' '+C[0].toFixed(1)+','+C[1].toFixed(1)+'" fill="'+fill(i)+'" '+K+'/>'; }
  } else if(t==='luc'){
    for(i=0;i<6;i++){ var a0=(-90+i*60)*Math.PI/180, a1=(-90+(i+1)*60)*Math.PI/180;
      h+='<polygon points="55,55 '+(55+50*Math.cos(a0)).toFixed(1)+','+(55+50*Math.sin(a0)).toFixed(1)+' '+(55+50*Math.cos(a1)).toFixed(1)+','+(55+50*Math.sin(a1)).toFixed(1)+'" fill="'+fill(i)+'" '+K+'/>'; }
  }
  return '<div class="flex flex-col items-center gap-1">'+h+'</svg>'+(nhan ? '<div class="text-lg font-extrabold text-slate-700">'+nhan+'</div>' : '')+'</div>';
}
/* Một hình có đúng n phần bằng nhau, tô 1 phần (n = 5: chữ thập / sao / dải / quạt) */
function hinhDung(n){
  var o=['dai:'+n+':'+rnd(0,n-1)];
  if(n>=3) o.push('tron:'+n+':'+rnd(0,n-1));
  if(n===5){ o.push('thap:5:'+rnd(0,4)); o.push('sao:5:'+rnd(0,4)); }
  if(n===6) o.push('luc:6:'+rnd(0,5));
  return pick(o);
}

/* ---- Hình mới 4: lưới r hàng × c cột con ếch đơn giản (thân tròn xanh + hai mắt), đếm được ---- */
function luoiVat(r, c){
  var o=34, w=c*o+14, h=r*o+14, s=svgX(w, h)+'<rect x="1" y="1" width="'+(w-2)+'" height="'+(h-2)+'" rx="12" fill="#fef9ec"/>', i, j;
  for(i=0;i<r;i++) for(j=0;j<c;j++){
    var x=7+o/2+j*o, y=7+o/2+i*o+2;
    s+='<circle data-dem="ech" cx="'+x+'" cy="'+y+'" r="12" fill="'+HM.xanhLa+'"/>'
      +'<circle cx="'+(x-5)+'" cy="'+(y-6)+'" r="3.8" fill="#fff"/><circle cx="'+(x+5)+'" cy="'+(y-6)+'" r="3.8" fill="#fff"/>'
      +'<circle cx="'+(x-5)+'" cy="'+(y-6)+'" r="1.7" fill="'+HM.den+'"/><circle cx="'+(x+5)+'" cy="'+(y-6)+'" r="1.7" fill="'+HM.den+'"/>';
  }
  return '<div class="flex justify-center mb-2">'+s+'</svg></div>';
}

/* ---- Bộ sinh "tìm thành phần" (dạng 4) ---- */
function tp15(lv){
  var kind=pick(['a','b','c','d']), o={kind:kind}, a, b, P, q, x, ve;
  var lo = lv<=1 ? 3 : 3, hi = lv<=1 ? 5 : 10;
  a=rnd(lo,hi); b=rnd(lo,hi); P=a*b;
  if(kind==='a' || kind==='b'){   /* ? × b = P  ·  a × ? = P */
    ve=String(P);
    if(lv>=3){ var cs=[]; for(var u=2;u<=10;u++){ var v=P/u; if(Number.isInteger(v) && v>=2 && v<=10 && !((u===a&&v===b)||(u===b&&v===a))) cs.push(u+' × '+v); } if(cs.length) ve=pick(cs); }
    var kn = kind==='a' ? b : a, ans = kind==='a' ? a : b;
    o.eq = kind==='a' ? oHoi()+' × '+b+' = '+ve : a+' × '+oHoi()+' = '+ve; o.ans=ans; o.known=kn; o.ve=ve; o.P=P;
    o.ds=[[P*kn,'chon-sai-phep'],[P-kn,'cong-thay-nhan'],[kn,'dao-vai'],[ans-1,'canh-dong'],[ans+1,'canh-dong']];
  } else if(kind==='c'){   /* ? : b = q */
    q = lv>=3 ? pick([4,6,8,9]) : rnd(2,hi);
    ve = lv>=3 ? (q===4?'2 × 2':(q===6?'2 × 3':(q===8?'2 × 4':'3 × 3'))) : String(q);
    o.eq = oHoi()+' : '+b+' = '+ve; o.ans=b*q; o.known=b; o.q=q; o.ve=ve;
    o.ds=[[q,'dao-vai'],[q+b,'cong-thay-nhan'],[b*q-b,'canh-dong'],[b*q+b,'canh-dong'],[b,'dao-vai']];
  } else {   /* P : ? = q */
    q=rnd(2,hi>5?9:5); ve=String(q);
    if(lv>=3){ var xx=pick([2,3,4]); ve=(q*xx)+' : '+xx; }
    P=b*q; o.eq = P+' : '+oHoi()+' = '+ve; o.ans=b; o.known=q; o.q=q; o.P=P; o.ve=ve;
    o.ds=[[P*q,'chon-sai-phep'],[P-q,'cong-thay-nhan'],[q,'dao-vai'],[b-1,'canh-dong'],[b+1,'canh-dong']];
  }
  o.nhan=nhanSai(o.ds, o.ans);
  var gtd = {a:'Muốn tìm một thừa số, lấy tích chia cho thừa số kia.', b:'Muốn tìm một thừa số, lấy tích chia cho thừa số kia.', c:'Muốn tìm số bị chia, lấy thương nhân số chia.', d:'Muốn tìm số chia, lấy số bị chia chia cho thương.'}[kind];
  o.goiY={'chon-sai-phep':gtd, 'cong-thay-nhan':'Đây là phép nhân, chia, không phải cộng, trừ. '+gtd, 'dao-vai':'Số bé chép lại là số đã cho. Ô trống mới là số cần tìm.', 'canh-dong':'Bé thử lại: thay đáp số vào phép tính xem có đúng không.', 'chung':gtd};
  return o;
}
function kiemTP15(q){
  var t=q._tp; if(!t || q.ans!==t.ans || !(t.ans>0)) return false; var v=tinhBT(t.ve);
  if(t.kind==='a' || t.kind==='b') return t.ans*t.known===v;
  if(t.kind==='c') return t.ans===t.known*v && t.ans%t.known===0;
  return t.P%t.ans===0 && t.P/t.ans===v;
}

var BAI = {
 n: 15,
 title: 'Luyện Tập Chung',
 sub: 'Luyện thông minh: câu hỏi tự đổi theo bé — làm hết lượt để xem ngọn lửa!',
 goal: 10, soCau: 18, soCauToiDa: 24,
 loi: {'phan-khong-bang':'Quên kiểm tra các phần có bằng nhau không'},
 muctieu: [
  {id:'MT1', ten:'Nhân, chia trong các bảng', muc:['Nhân nhẩm bảng 3–5; nhận ra cụm "nhân → đổi chỗ → hai phép chia".', 'Nhân nhẩm bảng 3–10; điền ô trống trong cụm bốn phép tính; Đúng hay Sai.', 'Từ một phép nhân suy ra các phép còn lại; tìm lỗi trong phép tính.']},
  {id:'MT2', ten:'Tìm thành phần chưa biết', muc:['Tìm thừa số, số bị chia, số chia, bảng 3–5; tam giác số: tìm ô tích.', 'Tìm số trên mũi tên (cả ô đầu lẫn số ở giữa mũi tên); tam giác số tìm tích bảng 2–9 hoặc tìm đỉnh.', 'Tam giác số: tìm ô tích khi chưa biết hai đỉnh; vế còn lại là một phép tính.']},
  {id:'MT3', ten:'So sánh kết quả', muc:['So kết quả một phép tính với một số, kết quả khác xa số đó.', 'Đếm số phép tính có kết quả bé hơn một số; kết quả gần số đó.', 'Đếm số phép tính thoả HAI điều kiện (lớn hơn a và bé hơn b); so sánh hai bước.']},
  {id:'MT4', ten:'Một phần mấy', muc:['Nhận ra hình tô màu 1/n, các hình khác hẳn nhau.', 'Tìm một phần mấy của số vật xếp hàng, cột; hình có số phần gần nhau.', 'Bẫy hình có số phần khác n (6 phần mà hỏi 1/5), các phần không bằng nhau; hiệu hai phân số của cùng nhóm vật.']},
  {id:'MT5', ten:'Giải toán', muc:['Bài toán một phép nhân với số nhỏ, có hình để đếm; chọn phép nhân.', 'Nhân hoặc chia theo nhóm với bảng 3–10; chọn phép chia.', 'Bài toán hai bước; chọn biểu thức hai bước.']}
 ],
 topics: [
  /* D1 — Nhân nhẩm bảng 3–10 (Tiết 1, Luyện tập 1) */
  {name:'Nhân nhẩm', sec:'Tiết 1, Luyện tập 1 — Tính nhẩm', mt:['MT1'], levels:3,
   muc:['Nhân nhẩm bảng 3–5.', 'Nhân nhẩm bảng 3–10, cả khi đổi chỗ thừa số.', 'Biết một phép nhân, tính phép nhân bên cạnh.'],
   make:function(lv){
    var a, b, P;
    if(lv<=2){ a = lv<=1 ? rnd(3,5) : rnd(3,10); b = lv<=1 ? rnd(2,9) : rnd(2,10); P=a*b; var doi=Math.random()<0.5;
      return {type:'num', _e:P, q:kyHieu('Tính nhẩm', (doi ? b+' × '+a : a+' × '+b)+' ='+oHoi()), ans:P,
        sai:nhanSai([[P-a,'canh-dong'],[P+a,'canh-dong'],[P-b,'canh-dong'],[P+b,'canh-dong'],[a+b,'cong-thay-nhan']], P),
        goiY:{'canh-dong':'Bé nhẩm lại bảng nhân '+a+' và bảng nhân '+b+' nhé!', 'cong-thay-nhan':a+' × '+b+' là '+b+' lần số '+a+', không phải '+a+' + '+b+'.'}}; }
    a=rnd(5,9); b=rnd(5,9); P=a*b; var len=Math.random()<0.5, Q = len ? (a+1)*b : a*(b+1), bt = len ? (a+1)+' × '+b : a+' × '+(b+1), them = len ? b : a;
    return {type:'num', _e:Q, q:'<div class="text-slate-600 mb-1">Biết <b>'+a+' × '+b+' = '+P+'</b>.</div>'+kyHieu('Vậy', bt+' ='+oHoi()), ans:Q,
      sai:nhanSai([[P,'sai-buoc'],[Q+them,'sai-buoc'],[Q-them,'sai-buoc'],[a+b+1,'cong-thay-nhan']], Q),
      goiY:{'sai-buoc':'Hơn một nhóm: thêm '+them+' vào '+P+'.', 'cong-thay-nhan':'Đây là phép nhân, không phải phép cộng.'}};
  }, check:function(q){ return q.ans===q._e; }},

  /* D2 — Cụm bốn phép tính: nhân, đổi chỗ, hai phép chia (Tiết 2, Luyện tập 1) */
  {name:'Cụm bốn phép tính', sec:'Tiết 2, Luyện tập 1 — Nhân, đổi chỗ, hai phép chia', mt:['MT1'], levels:3,
   muc:['Điền kết quả phép nhân và phép nhân đổi chỗ.', 'Điền ô trống trong cụm bốn phép tính.', 'Biết một phép nhân, chọn đúng ba phép tính còn lại.'],
   make:function(lv){
    var a, b, P, c;
    do { a = lv<=1 ? rnd(2,5) : rnd(3,9); b = lv<=1 ? rnd(2,5) : rnd(3,9); } while(a===b);
    P=a*b;
    if(lv<=1) return {type:'num', _e:P, q:'<div class="text-2xl font-extrabold text-slate-700 leading-loose">'+a+' × '+b+' = '+P+'<br>'+b+' × '+a+' ='+oHoi()+'</div>', ans:P,
      sai:nhanSai([[a+b,'cong-thay-nhan'],[P-a,'canh-dong'],[P+a,'canh-dong']], P), goiY:{'cong-thay-nhan':'Đổi chỗ hai thừa số thì tích không đổi: bằng '+P+'.', 'canh-dong':'Đổi chỗ hai thừa số thì tích không đổi.'}};
    if(lv===2){
      var dong=[a+' × '+b+' = '+P, b+' × '+a+' = '+P, P+' : '+a+' = '+b, P+' : '+b+' = '+a], vi=rnd(0,3), an=[P,P,b,a][vi], hi=['','','',''];
      var so=[[P,P],[P,P],[b,P],[a,P]][vi];
      var t=[a+' × '+b+' = '+P, b+' × '+a+' = '+P, P+' : '+a+' = '+b, P+' : '+b+' = '+a];
      t[vi] = [a+' × '+b+' =', b+' × '+a+' =', P+' : '+a+' =', P+' : '+b+' ='][vi]+oHoi();
      return {type:'num', _e:an, _vi:vi, q:'<div class="text-2xl font-extrabold text-slate-700 leading-loose">'+t.join('<br>')+'</div>', ans:an,
        sai: vi<2 ? nhanSai([[a+b,'cong-thay-nhan'],[P-a,'canh-dong'],[P+a,'canh-dong']], P) : nhanSai([[P,'dao-vai'],[a+b,'cong-thay-nhan'],[an-1,'canh-dong'],[an+1,'canh-dong']], an),
        goiY:{'cong-thay-nhan':'Bé xem lại các phép tính còn lại trong cụm.', 'canh-dong':'Bé nhẩm lại bảng nhân nhé!', 'dao-vai':'Số '+P+' là số bị chia. Ô trống là một thừa số.'}};
    }
    var dung=b+' × '+a+' = '+P+'  ·  '+P+' : '+a+' = '+b+'  ·  '+P+' : '+b+' = '+a;
    var ch=[dung, b+' × '+a+' = '+P+'  ·  '+P+' : '+a+' = '+a+'  ·  '+P+' : '+b+' = '+b, b+' × '+a+' = '+P+'  ·  '+P+' − '+a+' = '+b+'  ·  '+P+' − '+b+' = '+a, a+' : '+b+' = '+P+'  ·  '+P+' : '+a+' = '+b+'  ·  '+P+' : '+b+' = '+a]; var sai={};
    var lab=['', 'dao-vai', 'cong-thay-nhan', 'chon-sai-phep']; var ord=[0,1,2,3]; shuffle(ord);
    var ch2=ord.map(function(i){ return ch[i]; }); ord.forEach(function(i,k){ if(lab[i]) sai[String(k)]=lab[i]; });
    return {type:'mcq', cot:1, _dung:dung, q:'<div class="text-2xl font-extrabold text-orange-600 my-2">'+a+' × '+b+' = '+P+'</div><div>Từ phép nhân trên, cụm nào đúng?</div>', choices:ch2, correct:ch2.indexOf(dung), sai:sai,
      goiY:{'dao-vai':'Từ '+a+' × '+b+' = '+P+': '+P+' : '+a+' = '+b+' và '+P+' : '+b+' = '+a+'.', 'cong-thay-nhan':'Đây là phép chia, không phải phép trừ.', 'chon-sai-phep':'Phép nhân mới là '+a+' × '+b+'; phép chia lấy tích chia cho một thừa số.'}};
  }, check:function(q){ return q.type==='mcq' ? kiemMCQ(q) : q.ans===q._e; }},

  /* D3 — Đúng hay sai? (ý của trò chơi cầu thang – cầu trượt; không có trong SGK) */
  {name:'Đ/S phép tính', sec:'Đúng hay sai — Phép tính này đi được không?', mt:['MT1'], levels:3,
   muc:['Nhận ra kết quả sai thô (cộng thay nhân).', 'Nhận ra kết quả sai tinh (nhầm dòng, nhầm bảng).', 'Chỉ ra lỗi của bạn và tìm kết quả đúng.'],
   make:function(lv){
    var a = lv<=1 ? rnd(3,5) : (lv===2 ? rnd(3,9) : rnd(4,10)), b = lv<=1 ? rnd(3,5) : rnd(3,9), chia=Math.random()<0.4, P=a*b, dung = chia ? b : P, bt = chia ? P+' : '+a : a+' × '+b;
    var ds = lv<=1 ? [[chia ? P-a : a+b,'cong-thay-nhan']] : (chia ? [[b-1,'canh-dong'],[b+1,'canh-dong']] : [[P-a,'canh-dong'],[P+a,'canh-dong'],[P-b,'canh-dong'],[P+b,'canh-dong']]);
    ds=ds.filter(function(p){ return p[0]>0 && p[0]!==dung; }); var ls=pick(ds);
    var gy={'cong-thay-nhan':'Phép nhân là cộng nhiều lần cùng một số; phép chia không phải phép trừ.', 'canh-dong':'Bé nhẩm lại '+bt+' nhé!'};
    if(lv>=3) return {type:'num', _e:dung, q:'<div class="flex justify-center mb-1">'+anh('boy', 72, 'Bạn An')+'</div><div>Bạn An tính: <b class="text-orange-600">'+bt+' = '+ls[0]+'</b>. An tính sai rồi!</div><div class="mt-1">Kết quả đúng là bao nhiêu?</div>', ans:dung, sai:nhanSai([[ls[0],ls[1]]], dung), goiY:gy};
    var laDung=Math.random()<0.5, X = laDung ? dung : ls[0]; gy.chung = laDung ? 'Phép tính này đúng. Bé nhẩm lại để chắc nhé!' : 'Bé nhẩm lại '+bt+' nhé!';
    return {type:'mcq', figFn:dsBtn15, _dung:(laDung?'Đ':'S'), _X:X, _d:dung, q:'<div class="text-3xl font-extrabold text-orange-600 my-2">'+bt+' = '+X+'</div><div class="text-base text-slate-500">Đúng (Đ) hay sai (S)?</div>',
      choices:['Đ','S'], correct:(laDung?0:1), sai:(laDung?{}:{'0':ls[1]}), goiY:gy};
  }, check:function(q){ if(q.type==='num') return q.ans===q._e; return kiemMCQ(q) && (q._dung==='Đ')===(q._X===q._d); }},

  /* D4 — Tìm thành phần chưa biết (theo bài 13; không có trong SGK) */
  {name:'Tìm thành phần', sec:'Tìm thành phần chưa biết', mt:['MT2'], levels:3,
   muc:['Tìm thừa số, số bị chia, số chia, bảng 3–5.', 'Tìm thành phần, bảng 3–10, ô trống ở mọi vị trí.', 'Tìm thành phần khi vế phải là một phép tính.'],
   make:function(lv){ var t=tp15(lv); return {type:'num', _tp:t, q:'<div class="text-3xl font-extrabold text-slate-700 my-3 text-center">'+t.eq+'</div>', ans:t.ans, sai:t.nhan, goiY:t.goiY}; },
   check:kiemTP15},

  /* D5 — Mũi tên: tìm ô đầu và tìm SỐ TRÊN MŨI TÊN (Tiết 1, Luyện tập 3) */
  {name:'Mũi tên', sec:'Tiết 1, Luyện tập 3 — Số? (mũi tên)', mt:['MT2'], levels:3,
   muc:['Tìm số ở ô đầu sau phép nhân hoặc chia.', 'Tìm SỐ TRÊN MŨI TÊN (4 × ? → 36; 35 : ? → 5).', 'Cả hai kiểu với bảng 6–10.'],
   make:function(lv){
    var kind = lv<=1 ? pick(['d1','d2']) : pick(['d1','d2','t1','t2']), k = lv<=1 ? rnd(2,5) : (lv===2 ? rnd(3,9) : rnd(6,10)), x = lv<=1 ? rnd(2,8) : (lv===2 ? rnd(3,9) : rnd(6,10)), s, R, ans, q, ds, gy, bt;
    if(kind==='d1'){ R=x*k; ans=x; q=soDo([{v:null,h:'tron'},{v:R,h:'vuong'}], ['× '+k]); bt=ans+' × '+k+' = '+R;   /* ? × k → R */
      ds=[[R,'dao-vai'],[R-k,'cong-thay-nhan'],[R*k,'chon-sai-phep'],[ans-1,'canh-dong'],[ans+1,'canh-dong']]; gy={'dao-vai':'Số '+R+' là kết quả ở ô cuối. Ô đầu nhân '+k+' ra '+R+'.', 'chon-sai-phep':'Mũi tên × '+k+': muốn quay về ô đầu thì chia cho '+k+'.', 'cong-thay-nhan':'Đây là phép nhân, chia, không phải trừ.', 'canh-dong':'Bé thử lại: số đó nhân '+k+' có ra '+R+' không?'}; }
    else if(kind==='d2'){ R=x; ans=x*k; q=soDo([{v:null,h:'tron'},{v:R,h:'vuong'}], [': '+k]); bt=ans+' : '+k+' = '+R;   /* ? : k → R */
      ds=[[R,'dao-vai'],[R+k,'cong-thay-nhan'],[ans-k,'canh-dong'],[ans+k,'canh-dong']]; gy={'dao-vai':'Số '+R+' là kết quả ở ô cuối. Ô đầu chia '+k+' ra '+R+'.', 'cong-thay-nhan':'Mũi tên : '+k+': muốn quay về ô đầu thì nhân với '+k+'.', 'canh-dong':'Bé thử lại: số đó chia '+k+' có ra '+R+' không?'}; }
    else if(kind==='t1'){ s=x; R=x*k; ans=k; q=soDo([{v:s,h:'tron'},{v:R,h:'vuong'}], ['× ?']); bt=s+' × '+k+' = '+R;   /* s × ? → R */
      ds=[[R,'dao-vai'],[s,'dao-vai'],[R-s,'cong-thay-nhan'],[R*s,'chon-sai-phep'],[ans-1,'canh-dong'],[ans+1,'canh-dong']]; gy={'dao-vai':'Số bé chép lại là số đã cho. Số trên mũi tên là số nhân với '+s+'.', 'cong-thay-nhan':'Đây là phép nhân, chia, không phải trừ.', 'chon-sai-phep':'Muốn tìm số nhân, lấy '+R+' chia cho '+s+'.', 'canh-dong':'Bé thử lại: '+s+' nhân số đó có ra '+R+' không?'}; }
    else { R=x; s=x*k; ans=k; q=soDo([{v:s,h:'tron'},{v:R,h:'vuong'}], [': ?']); bt=s+' : '+k+' = '+R;   /* s : ? → R */
      ds=[[s,'dao-vai'],[R,'dao-vai'],[s-R,'cong-thay-nhan'],[s*R,'chon-sai-phep'],[ans-1,'canh-dong'],[ans+1,'canh-dong']]; gy={'dao-vai':'Số bé chép lại là số đã cho. Số trên mũi tên là số chia.', 'cong-thay-nhan':'Đây là phép chia, không phải trừ.', 'chon-sai-phep':'Muốn tìm số chia, lấy '+s+' chia cho '+R+'.', 'canh-dong':'Bé thử lại: '+s+' chia cho số đó có ra '+R+' không?'}; }
    var hoi = (kind==='t1'||kind==='t2') ? '<div>Số trên mũi tên <b class="text-amber-700">?</b> là bao nhiêu?</div>' : '<div>Số ở ô đầu <b class="text-amber-700">?</b> là bao nhiêu?</div>';
    return {type:'num', _bt:bt, _ans:ans, q:q+hoi, ans:ans, sai:nhanSai(ds, ans), goiY:gy};
  }, check:function(q){ var p=q._bt.split(' '), A=+p[0], B=+p[2], C=+p[4], v = p[1]==='×' ? A*B : A/B; return v===C && Number.isInteger(v) && q.ans===q._ans && q.ans>0 && (p[1]==='×' ? (q.ans===A||q.ans===B) : (q.ans===A||q.ans===B)); }},

  /* D6 — Tam giác số (Tiết 1, Luyện tập 5) */
  {name:'Tam giác số', sec:'Tiết 1, Luyện tập 5 — Tam giác số', mt:['MT2'], levels:3,
   muc:['Biết ba đỉnh, tìm một ô tích (bảng 2–5).', 'Tìm ô tích bảng 2–9, hoặc tìm một đỉnh khi biết tích và đỉnh bên cạnh.', 'Chưa biết hai đỉnh: tìm ô tích còn lại.'],
   make:function(lv){
    var hi = lv<=1 ? 5 : 9, d=[rnd(2,hi), rnd(2,hi), rnd(2,hi)], E=[[0,1],[1,2],[2,0]], tich=E.map(function(e){ return d[e[0]]*d[e[1]]; }), ans, tt, ds, gy, kind;
    if(lv<=1 || (lv===2 && Math.random()<0.5)){ var ti=rnd(0,2); kind='tich'; ans=tich[ti]; tt={d:[0,0,0], t:[0,0,0]}; tt.t[ti]=1;
      var e=E[ti], u=d[e[0]], w=d[e[1]];
      ds=[[u+w,'cong-thay-nhan'],[ans-u,'canh-dong'],[ans+u,'canh-dong'],[ans-w,'canh-dong'],[ans+w,'canh-dong']];
      gy={'cong-thay-nhan':'Ô vuông là TÍCH hai đỉnh, không phải tổng.', 'canh-dong':'Bé nhẩm lại '+u+' × '+w+' nhé!'}; }
    else if(lv===2){ var vi=rnd(0,2); kind='dinh'; ans=d[vi]; tt={d:[0,0,0], t:[0,0,0]}; tt.d[vi]=1;
      var bk=(vi+1)%3, ti2=E.findIndex(function(e){ return (e[0]===vi && e[1]===bk) || (e[1]===vi && e[0]===bk); }), tk=tich[ti2], kn=d[bk];
      ds=[[tk,'dao-vai'],[tk-kn,'cong-thay-nhan'],[tk*kn,'chon-sai-phep'],[ans-1,'canh-dong'],[ans+1,'canh-dong']];
      gy={'dao-vai':'Số '+tk+' là tích hai đỉnh. Đỉnh cần tìm nhân '+kn+' ra '+tk+'.', 'cong-thay-nhan':'Đây là phép chia, không phải phép trừ.', 'chon-sai-phep':'Muốn tìm một đỉnh, lấy tích chia cho đỉnh kia.', 'canh-dong':'Bé thử lại: '+kn+' nhân số đó có ra '+tk+' không?'}; }
    else { kind='hai'; tt={d:[0,2,2], t:[0,1,0]};   /* biết đỉnh 0, tích (0,1), tích (2,0); hỏi tích (1,2) */
      var b1=d[1], c1=d[2]; ans=b1*c1; ds=[[tich[0]+tich[2],'cong-thay-nhan'],[tich[0]*tich[2],'chon-sai-phep'],[b1+c1,'cong-thay-nhan'],[tich[0],'thieu-buoc'],[tich[2],'thieu-buoc']];
      gy={'thieu-buoc':'Bé tìm hai đỉnh chưa biết trước (lấy tích chia cho đỉnh '+d[0]+'), rồi nhân hai đỉnh đó.', 'cong-thay-nhan':'Ô vuông là TÍCH hai đỉnh, không phải tổng.', 'chon-sai-phep':'Tìm hai đỉnh chưa biết bằng phép chia, rồi nhân hai đỉnh.'}; }
    var dd=d.slice(); if(kind==='hai'){ dd=[d[0],d[1],d[2]]; }
    return {type:'num', _dinh:d, _tt:tt, _kind:kind, q:tamGiacSo(dd, tt)+'<div>Số ở ô <b class="text-amber-700">?</b> là bao nhiêu?</div>', ans:ans, sai:nhanSai(ds, ans), goiY:gy};
  }, check:function(q){ var d=q._dinh, E=[[0,1],[1,2],[2,0]], tich=E.map(function(e){ return d[e[0]]*d[e[1]]; }), tt=q._tt, i, r=null;
    for(i=0;i<3;i++){ if(tt.d[i]===1) r=d[i]; if(tt.t[i]===1) r=tich[i]; } return r!==null && q.ans===r && r>0; }},

  /* D7 — Phép chia có kết quả bé hơn một số: ĐẾM hoặc chọn một (Tiết 1, Luyện tập 2; SGK cho chọn nhiều) */
  {name:'Phép chia bé hơn số', sec:'Tiết 1, Luyện tập 2 — Phép tính nào có kết quả bé hơn?', mt:['MT3'], levels:3,
   muc:['Đếm phép chia có kết quả bé hơn một số, kết quả khác xa số đó.', 'Kết quả gần số đó (có phép bằng số đó, không tính).', 'Đếm phép chia thoả HAI điều kiện: lớn hơn a và bé hơn b.'],
   make:function(lv){
    var cnt = lv<=1 ? 3 : 5, pool=[], g=0, N, lo=-1, hi, ans, i;
    while(pool.length<cnt && g<400){ g++; var d=rnd(5,9), qv=rnd(3,10), v=qv; if(pool.every(function(p){ return p.v!==v && (lv>1 || Math.abs(p.v-v)>=2); })) pool.push({t:(d*qv)+' : '+d, v:v}); }
    var vals=pool.map(function(p){ return p.v; }).sort(function(a,b){ return a-b; }), ord=pool.slice(); shuffle(ord);
    if(lv>=3){ var i0=rnd(0,2), j0=rnd(i0+2,4); lo=vals[i0]; hi=vals[j0]; ans=j0-i0-1;
      var cau='có <b>kết quả lớn hơn '+lo+'</b> và <b>bé hơn '+hi+'</b>'; }
    else { var c=rnd(1,cnt-1); N=vals[c]; hi=N; ans=c; var cau2='có <b>kết quả bé hơn '+N+'</b>'; }
    var chips=ord.map(function(p){ return '<span class="inline-block px-3 py-1 m-1 rounded-xl bg-white border-2 border-amber-400 text-xl font-extrabold text-slate-700">'+p.t+'</span>'; }).join('');
    var gy={'lech-nhom':'Bé tính kết quả từng phép chia rồi so sánh. Kết quả bằng số đã cho thì không tính.', 'chung':'Bé tính kết quả từng phép chia rồi so sánh.'};
    if(lv<=2 && Math.random()<0.5){   /* câu chọn một: phép nào KHÔNG thoả */
      var ko=pool.filter(function(p){ return p.v>=N; }); if(ko.length===1){ var ch=ord.map(function(p){ return p.t; }), dung=ko[0].t, sai={}; ord.forEach(function(p,i2){ if(p.v<N) sai[String(i2)]='lech-nhom'; });
        return {type:'mcq', cot:2, _N:N, _dung:dung, q:'<div>Phép tính nào có kết quả <b>KHÔNG bé hơn '+N+'</b>?</div>', choices:ch, correct:ch.indexOf(dung), sai:sai, goiY:gy}; }
    }
    return {type:'num', _pool:pool.map(function(p){ return p.t; }), _lo:lo, _hi:hi, q:'<div class="text-center mb-2">'+chips+'</div><div>Có bao nhiêu phép tính '+(lv>=3?cau:cau2)+'?</div>', ans:ans, unit:'phép tính',
      sai:nhanSai([[ans+1,'lech-nhom'],[ans-1,'lech-nhom'],[ans+2,'lech-nhom']], ans), goiY:gy};
  }, check:function(q){ if(q.type==='mcq'){ var k=q.choices.filter(function(c){ return tinhBT(c)>=q._N; }); return k.length===1 && k[0]===q.choices[q.correct] && kiemMCQ(q); }
    var c=q._pool.filter(function(t){ var v=tinhBT(t); return v>q._lo && v<q._hi && Number.isInteger(v); }).length; return c>=1 && q.ans===c && new Set(q._pool).size===q._pool.length; }},

  /* D8 — So sánh hai kết quả (không có trong SGK) */
  {name:'So sánh', sec:'So sánh (>, <, =)', mt:['MT3'], levels:3,
   muc:['So sánh một phép tính với một số.', 'So sánh hai phép tính nhân, chia.', 'So sánh phép tính hai bước.'],
   make:function(lv){
    var A, B;
    if(lv<=1){ var a=rnd(3,5), b=rnd(3,5), v=a*b; A=a+' × '+b; B=String(v+pick([-5,-3,0,3,5])); if(+B<=0) B=String(v+3); }
    else if(lv===2){ var a2=rnd(3,9), b2=rnd(3,9), P2=a2*b2, c2=rnd(2,9); A=a2+' × '+b2; B = Math.random()<0.5 ? (P2*c2)+' : '+c2 : (rnd(3,9))+' × '+rnd(3,9); if(Math.random()<0.3) B=b2+' × '+a2; }
    else { var k=rnd(3,9), m=rnd(3,9), j=rnd(k,k+2); A=m+' × '+k+(Math.random()<0.5?' + '+m:' − '+m); B=m+' × '+j; if(Math.random()<0.5){ var t=A; A=B; B=t; } }
    var va=tinhBT(A), vb=tinhBT(B), sign = va>vb ? '>' : (va<vb ? '<' : '='), ds=['>','<','='], cr=ds.indexOf(sign), sai={};
    if(lv>=3) ds.forEach(function(c,i){ if(i!==cr) sai[String(i)]='sai-buoc'; });
    return {type:'mcq', _a:A, _b:B, q:'<div class="text-2xl font-extrabold text-orange-700 my-2">'+A+' &nbsp; ? &nbsp; '+B+'</div><div>Điền dấu thích hợp:</div>', choices:ds, correct:cr, sai:sai,
      goiY:{'sai-buoc':'Bé tính phép nhân trước, rồi thêm (hoặc bớt) đúng một nhóm. Sau đó so sánh.', 'chung':'Bé tính kết quả của từng vế rồi so sánh.'}};
  }, check:function(q){ var va=tinhBT(q._a), vb=tinhBT(q._b); return Number.isInteger(va) && Number.isInteger(vb) && q.choices[q.correct]===(va>vb?'>':(va<vb?'<':'=')); }},

  /* D9 — Hình đã tô màu 1/n: ĐẾM hoặc chọn một (Tiết 2, Luyện tập 3a; SGK cho chọn nhiều) */
  {name:'Hình tô màu', sec:'Tiết 2, Luyện tập 3a — Đã tô màu một phần mấy?', mt:['MT4'], levels:3,
   muc:['Nhận ra hình tô 1/5 trong các hình khác hẳn nhau.', 'Các hình có 4, 5, 6 phần: đếm số phần bằng nhau.', 'BẪY: hình 6 phần mà hỏi 1/5; hình 5 phần KHÔNG bằng nhau.'],
   make:function(lv){
    var n = lv<=1 ? 5 : (lv===2 ? pick([5,6]) : 5), dem=Math.random()<0.5, ten=['A','B','C','D'], dung=[], saiL=[], i;
    function kinds(){ var o=['dai','tron']; if(n===5){ o.push('thap'); o.push('sao'); } if(n===6) o.push('luc'); return shuffle(o); }
    function maDung(k){ return k==='dai' ? 'dai:'+n+':'+rnd(0,n-1) : (k==='tron' ? 'tron:'+n+':'+rnd(0,n-1) : k+':'+n+':'+rnd(0,n-1)); }
    var nd, ns;
    if(lv<=1){ nd=2; ns=1; } else if(lv===2){ nd = dem ? 2 : 3; ns = dem ? 2 : 1; } else { nd=2; ns=dem ? 2 : 1; }
    var ks=kinds().slice(0, nd); for(i=0;i<ks.length;i++) dung.push(maDung(ks[i]));
    if(lv>=3){ var xau=shuffle(['luc:6:'+rnd(0,5), 'lech:5:'+rnd(0,4)]); for(i=0;i<ns;i++) saiL.push(xau[i]); }
    else if(lv<=1){ saiL.push('dai:'+pick([2,3])+':0'); }
    else { var ok=shuffle([3,4,5,6].filter(function(v){ return v!==n; })); var kk=shuffle(['dai','tron']); for(i=0;i<ns;i++) saiL.push(kk[i]+':'+ok[i]+':'+rnd(0,ok[i]-1)); }
    var codes=shuffle(dung.concat(saiL)), dd=dung.length;
    if(dem){
      var coLech=saiL.some(function(c){ return c.split(':')[0]==='lech'; });
      return {type:'num', _codes:codes, _n:n, q:xepHang(codes.map(function(c,k){ return hinhPS(c, ten[k]); }), 4)+'<div>Có bao nhiêu hình đã tô màu <span class="text-2xl text-slate-700">'+frM(n)+'</span> hình đó?</div>', ans:dd, unit:'hình',
        sai:nhanSai([[dd+1, coLech?'phan-khong-bang':'lech-nhom'],[dd-1,'lech-nhom'],[dd+2,'lech-nhom']], dd),
        goiY:{'lech-nhom':'Bé đếm số phần BẰNG NHAU của từng hình. Hình 6 phần không phải một phần năm.', 'phan-khong-bang':'Các phần phải BẰNG NHAU mới gọi là một phần mấy.'}};
    }
    var sai={}; codes.forEach(function(c,k){ if(soPhan(c)===n) sai[String(k)]='lech-nhom'; });
    return {type:'mcq', figFn:function(c){ return hinhPS(c, ''); }, _n:n, q:'<div>Hình nào <b>KHÔNG</b> tô màu <span class="text-2xl text-slate-700">'+frM(n)+'</span> hình đó?</div>', choices:codes, correct:codes.indexOf(saiL[0]), sai:sai,
      goiY:{'lech-nhom':'Bé đếm số phần bằng nhau của hình. Hình có đúng '+n+' phần bằng nhau thì tô 1 phần là một phần '+n+'.'}};
  }, check:function(q){ if(q.type==='num'){ var d=q._codes.filter(function(c){ return soPhan(c)===q._n; }).length; return d>=1 && d<q._codes.length && q.ans===d && new Set(q._codes).size===q._codes.length; }
    var k=q.choices.filter(function(c){ return soPhan(c)!==q._n; }); return k.length===1 && k[0]===q.choices[q.correct] && new Set(q.choices).size===q.choices.length; }},

  /* D10 — Một phần mấy của số con ếch (Tiết 2, Luyện tập 3b) */
  {name:'Con ếch', sec:'Tiết 2, Luyện tập 3b — Một phần mấy số con ếch?', mt:['MT4'], levels:3,
   muc:['Tìm một phần mấy của số ếch xếp thành hàng, số nhỏ.', 'Lưới nhiều ếch (như 3 hàng × 6): tìm 1/6, 1/9, 1/3 số ếch.', 'Hai phân số của cùng một nhóm ếch: tìm hiệu.'],
   make:function(lv){
    var G = lv<=1 ? [[2,6,12],[2,8,16],[3,4,12]] : [[3,6,18],[4,5,20],[3,8,24],[5,6,30],[2,8,16]], g=pick(G), r=g[0], c=g[1], N=g[2], dv=[2,3,4,5,6,8,9].filter(function(v){ return N%v===0; }), n, m;
    if(lv<=1) dv=dv.filter(function(v){ return v<=4; });
    if(lv>=3 && dv.length>=2){ var u=pick(dv), w=pick(dv.filter(function(v){ return v!==u; })), lon=Math.min(u,w), be=Math.max(u,w), ans=N/lon-N/be;
      return {type:'num', _N:N, _r:r, _c:c, _kieu:'hieu', _u:lon, _w:be, q:luoiVat(r,c)+'<div>'+frM(lon)+' số ếch hơn '+frM(be)+' số ếch bao nhiêu con ếch?</div>', ans:ans, unit:'con',
        sai:nhanSai([[N/lon+N/be,'chon-sai-phep'],[N/lon,'thieu-buoc'],[N/be,'thieu-buoc'],[N,'dao-vai']], ans), goiY:{'thieu-buoc':'Bé tìm '+frM(lon)+' số ếch và '+frM(be)+' số ếch, rồi lấy số lớn trừ số bé.', 'chon-sai-phep':'Hơn bao nhiêu thì lấy số lớn trừ số bé, không cộng.', 'dao-vai':'Số '+N+' là tất cả số ếch.'}}; }
    n=pick(dv); m=N/n;
    return {type:'num', _N:N, _r:r, _c:c, _kieu:'mot', _u:n, q:luoiVat(r,c)+'<div>'+frM(n)+' số ếch là bao nhiêu con ếch?</div>', ans:m, unit:'con',
      sai:nhanSai([[N,'dao-vai'],[n,'dao-vai'],[N-m,'chon-sai-phep'],[m-1,'lech-nhom'],[m+1,'lech-nhom']], m),
      goiY:{'dao-vai':'Bé chia '+N+' con ếch thành '+n+' phần bằng nhau. Một phần có mấy con?', 'chon-sai-phep':'Tìm một phần mấy thì dùng phép chia '+N+' : '+n+'.', 'lech-nhom':'Bé nhẩm: '+n+' × mấy = '+N+'?'}};
  }, check:function(q){ if(demDem(q.q,'ech')!==q._r*q._c || q._r*q._c!==q._N) return false;
    if(q._kieu==='hieu') return q._N%q._u===0 && q._N%q._w===0 && q.ans===q._N/q._u-q._N/q._w && q.ans>0;
    return q._N%q._u===0 && q.ans===q._N/q._u && q.ans>=1; }},

  /* D11 — Giải toán: li xếp vào bàn (Tiết 1, LT4) · hoa cắm vào lọ (Tiết 2, LT2) */
  {name:'Giải toán', sec:'Tiết 1, Luyện tập 4 · Tiết 2, Luyện tập 2 — Giải toán', mt:['MT5'], levels:3,
   muc:['Xếp li vào các bàn: tìm tất cả (nhân, có hình).', 'Chia theo nhóm: bông hoa cắm vào các lọ; hoặc nhân với số lớn hơn.', 'Bài toán hai bước.'],
   make:function(lv){
    var n, m, k, d;
    if(lv<=1){ n=rnd(2,5); m=rnd(2,6);
      return {type:'num', _e:n*m, _n:n, _m:m, q:banLi(n,m)+'Có '+n+' bàn, mỗi bàn có '+m+' cái li. Hỏi có tất cả bao nhiêu cái li?', ans:n*m, unit:'cái',
        sai:nhanSai([[n+m,'cong-thay-nhan'],[n*m-m,'lech-nhom'],[n*m+m,'lech-nhom']], n*m), goiY:{'cong-thay-nhan':n+' bàn, mỗi bàn '+m+' cái: '+n+' × '+m+'.', 'lech-nhom':'Bé đếm lại số bàn nhé!'}}; }
    if(lv===2){
      if(Math.random()<0.6){ m=rnd(3,9); d=rnd(2,9);   /* chia theo nhóm */
        return {type:'num', _e:d, q:'<div class="flex justify-center mb-2">'+anh('bouquet',64)+'</div>Có '+(m*d)+' bông hoa cắm vào các lọ, mỗi lọ '+m+' bông. Hỏi cắm được mấy lọ hoa như vậy?', ans:d, unit:'lọ',
          sai:nhanSai([[m*d,'dao-vai'],[m*d-m,'cong-thay-nhan'],[m*d*m,'chon-sai-phep'],[d-1,'canh-dong'],[d+1,'canh-dong']], d),
          goiY:{'dao-vai':'Số '+(m*d)+' là tổng số bông hoa. Bé tìm số lọ.', 'cong-thay-nhan':'Đây là phép chia, không phải phép trừ.', 'chon-sai-phep':'Mỗi lọ '+m+' bông, hỏi mấy lọ: lấy '+(m*d)+' chia cho '+m+'.', 'canh-dong':'Bé nhẩm: '+m+' × mấy = '+(m*d)+'?'}}; }
      n=rnd(5,9); m=rnd(3,9);
      return {type:'num', _e:n*m, _n:n, _m:m, q:banLi(Math.min(n,5),Math.min(m,6))+'Có '+n+' bàn, mỗi bàn có '+m+' cái li. Hỏi có tất cả bao nhiêu cái li?', ans:n*m, unit:'cái', _bo:true,
        sai:nhanSai([[n+m,'cong-thay-nhan'],[n*m-m,'lech-nhom'],[n*m+m,'lech-nhom']], n*m), goiY:{'cong-thay-nhan':n+' bàn, mỗi bàn '+m+' cái: '+n+' × '+m+'.', 'lech-nhom':'Bé đếm lại số bàn nhé!'}}; }
    if(Math.random()<0.5){ n=rnd(3,5); m=rnd(2,6); k=rnd(2,n*m-2);
      return {type:'num', _e:n*m-k, _n:n, _m:m, q:banLi(n,m)+'Có '+n+' bàn, mỗi bàn có '+m+' cái li. Các bạn đã dùng '+k+' cái. Hỏi còn lại bao nhiêu cái li?', ans:n*m-k, unit:'cái',
        sai:nhanSai([[n*m,'thieu-buoc'],[n*m+k,'chon-sai-phep'],[n+m-k,'cong-thay-nhan']], n*m-k), goiY:{'thieu-buoc':'Bé tìm số li của tất cả các bàn. Còn bước trừ đi '+k+' cái đã dùng!', 'chon-sai-phep':'Đã dùng thì số li còn lại ít đi: dùng phép trừ.', 'cong-thay-nhan':n+' bàn, mỗi bàn '+m+' cái: '+n+' × '+m+'.'}}; }
    m=rnd(3,8); d=rnd(4,9); k=rnd(1,d-1);
    return {type:'num', _e:d-k, q:'<div class="flex justify-center mb-2">'+anh('bouquet',64)+'</div>Có '+(m*d)+' bông hoa cắm vào các lọ, mỗi lọ '+m+' bông. Đã bán '+k+' lọ. Hỏi còn lại mấy lọ hoa?', ans:d-k, unit:'lọ',
      sai:nhanSai([[d,'thieu-buoc'],[m*d,'dao-vai'],[d+k,'chon-sai-phep']], d-k), goiY:{'thieu-buoc':'Bé đã tìm được số lọ hoa. Còn bước trừ đi '+k+' lọ đã bán!', 'dao-vai':'Số '+(m*d)+' là số bông hoa, còn bài hỏi số lọ.', 'chon-sai-phep':'Đã bán thì số lọ còn lại ít đi: dùng phép trừ.'}};
  }, check:function(q){ if(q._n && !q._bo && demDem(q.q,'li')!==q._n*q._m) return false; return q.ans===q._e && q.ans>0; }},

  /* D12 — Chọn phép tính (không có trong SGK) */
  {name:'Chọn phép tính', sec:'Chọn phép tính — không cần tính ra kết quả', mt:['MT5'], levels:3,
   muc:['Chọn phép nhân cho tình huống gộp nhiều nhóm bằng nhau.', 'Chọn phép chia cho tình huống chia theo nhóm.', 'Chọn biểu thức cho bài toán hai bước.'],
   make:function(lv){
    var ds, q, hinh='';
    if(lv<=1){ var n=rnd(2,5), m=rnd(2,6);
      ds=[[n+' × '+m,''], [n+' + '+m,'cong-thay-nhan'], [(n*m)+' : '+m,'chon-sai-phep']]; hinh=banLi(2,3); q='<div>Có '+n+' bàn, mỗi bàn có '+m+' cái li.</div><div class="mt-1">Phép tính nào tìm được <b>tất cả số li</b>?</div>'; }
    else if(lv===2){ var m2=rnd(3,9), d2=rnd(3,9), P=m2*d2;
      ds=[[P+' : '+m2,''], [P+' × '+m2,'chon-sai-phep'], [P+' − '+m2,'cong-thay-nhan'], [m2+' : '+P,'dao-vai']]; hinh=anh('bouquet',52); q='<div>Có '+P+' bông hoa cắm vào các lọ, mỗi lọ '+m2+' bông.</div><div class="mt-1">Phép tính nào tìm được <b>số lọ hoa</b>?</div>'; }
    else { var n3=rnd(3,6), m3=rnd(2,6), k3=rnd(2,9); if(k3===n3) k3=n3+1;
      ds=[[n3+' × '+m3+' − '+k3,''], [n3+' × '+m3+' + '+k3,'chon-sai-phep'], [n3+' + '+m3+' − '+k3,'cong-thay-nhan'], [k3+' × '+m3+' − '+n3,'dao-vai']]; hinh=banLi(2,3);
      q='<div>Có '+n3+' bàn, mỗi bàn có '+m3+' cái li. Các bạn đã dùng '+k3+' cái.</div><div class="mt-1">Phép tính nào tìm được <b>số li còn lại</b>?</div>'; }
    var texts=ds.map(function(d){ return d[0]; }); if(new Set(texts).size<texts.length) return BAI.topics[11].make(lv);
    var dung=ds[0][0]; shuffle(ds);
    var ch=ds.map(function(d){ return d[0]; }), sai={}; ds.forEach(function(d,i){ if(d[1]) sai[String(i)]=d[1]; });
    return {type:'mcq', cot:1, _dung:dung, q:'<div class="flex justify-center gap-1 mb-2">'+hinh+'</div>'+q, choices:ch, correct:ch.indexOf(dung), sai:sai,
      goiY:{'chon-sai-phep':'Gộp nhiều nhóm bằng nhau: phép nhân. Chia theo nhóm: phép chia. Đã dùng: phép trừ.', 'cong-thay-nhan':'Có nhiều nhóm bằng nhau thì dùng phép nhân (hoặc chia), không phải cộng, trừ.', 'dao-vai':'Bé xem lại: số nào là tổng, số nào là số cái mỗi nhóm?'}};
  }, check:kiemMCQ}
 ]
};
/* Phân số 1/n viết dọc (dùng trong lời hỏi) */
function frM(n){
  return '<span style="display:inline-flex;flex-direction:column;align-items:center;vertical-align:middle;line-height:1.05;margin:0 3px;font-weight:800"><span>1</span><span style="border-top:2px solid currentColor;padding:0 3px;min-width:0.9em;text-align:center">'+n+'</span></span>';
}
