/* bai-42.js — Bài 42: Ôn tập biểu thức số (Chủ đề 7). BÀI MỚI, Engine v2 — LUYỆN THÔNG MINH.
   Theo bảng phân tích sư phạm đã duyệt (phan-tich-su-pham/bai-42.md, PR #31): 4 MỤC TIÊU (muctieu) × 10 DẠNG (topics), mỗi dạng 3 mức (Thông tư 27).
   Bộ sinh biểu thức, tinhBT2 (dấu ngoặc), tinhTSP, tinhBoNgoac, okBuoc chép nguyên từ bài 38; thêm bộ sinh số ba chữ số (btTrai3, btUuTien3, btNgoac3).
   Đố em: 5 ? 5 ? 5 = 5 (chỉ giữ một cặp dấu đúng trong phương án); 6 × (6 ? 6) bé nhất / lớn nhất. "Lớn hơn 80" không gồm "bằng 80" (bẫy có nhãn riêng).
   Mọi giá trị nguyên 0–999, mọi bước không âm, chia hết; check() tính lại bằng tinhBT2. QUY TẮC: nối chuỗi, KHÔNG backtick và KHÔNG template literal. */

/* ---- Tiện ích chung ---- */
function nhanSai(ds, dung){ var o={}; ds.forEach(function(p){ var v=p[0]; if(Number.isInteger(v) && v>0 && v!==dung && !(String(v) in o)) o[String(v)]=p[1]; }); return o; }
function kiemMCQ(q){ return q.choices[q.correct]===q._dung && new Set(q.choices).size===q.choices.length; }
function svgX(w, h, px){ return svgHinh(w, h, px).replace('<svg ', '<svg class="text-slate-700" '); }
function khungHinh(s){ return '<div class="flex justify-center my-2">'+s+'</svg></div>'; }
function nguoi(ten, alt){ return '<div class="flex justify-center mb-1">'+anh(ten, 72, alt)+'</div>'; }
function kyHieu(nhan, bt){ return '<div class="text-slate-500 mb-1">'+nhan+'</div><div class="text-3xl font-extrabold text-orange-600">'+bt+'</div>'; }
var TRU='−', NHAN='×', CHIA=':';
var GOI={'tinh-trai-sang-phai':'Biểu thức có phép nhân hoặc phép chia thì bé làm NHÂN, CHIA trước, rồi mới cộng, trừ.', 'nhan-chia-sau':'Nhân, chia trước; cộng, trừ sau.', 'bo-ngoac':'Có dấu ngoặc thì bé tính TRONG NGOẶC trước.', 'nham-gia-tri':'Giá trị của biểu thức là kết quả sau khi tính hết mọi phép tính.', 'nham-bang-lon-hon':'"Lớn hơn 80" là phải hơn 80; bằng 80 thì không tính.',
  'nham-bang':'Bé tính lại từng bước cho đúng nhé.', 'thieu-buoc':'Bài này có hai bước. Bé làm đủ các bước nhé!', 'chon-sai-phep':'Bé đọc kỹ: gộp lại là cộng, bớt đi là trừ, nhiều phần bằng nhau là nhân, chia đều là chia.', 'dem-sot-phep':'Bé xét từng thẻ rồi đếm lại nhé!', 'dao-vai':'Bé xem lại câu hỏi hỏi gì.', 'cong-thay-nhan':'Nhiều phần bằng nhau thì nhân.'};
function gy(extra){ var o={}, k; for(k in GOI) o[k]=GOI[k]; for(k in (extra||{})) o[k]=extra[k]; return o; }
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

/* ---- Bộ sinh với số ba chữ số (ôn tập) ---- */
function btTrai3(){ for(var g=0;g<500;g++){ var k=pick(['−+','+−','−−']), a=rnd(300,900), b=rnd(100,a-50), c=rnd(10,150), t = k==='−+' ? a+' − '+b+' + '+c : (k==='+−' ? a+' + '+c+' − '+b : a+' − '+b+' − '+c); if(okBuoc(t)) return t; } return '731 − 680 + 19'; }
function btNhanChia(){ for(var g=0;g<500;g++){ var a=rnd(11,99), b=rnd(2,9), c=pick([2,3,4,5,6,7,8,9].filter(function(x){ return (a*b)%x===0; })), t = Math.random()<0.5 ? a+' × '+b+' : '+c : (a*c)+' : '+c+' × '+b; if(okBuoc(t) && tinhBT2(t)<=999) return t; } return '63 × 2 : 7'; }
function btUuTien3(){ for(var g=0;g<500;g++){ var k=pick(['×−','+:','+×','−:']), a, b, c, t;
    if(k==='×−'){ a=rnd(11,30); b=rnd(2,9); c=rnd(10,a*b-10); t=a+' × '+b+' − '+c; } else if(k==='+:'){ c=rnd(2,9); b=c*rnd(10,40); a=rnd(100,600); t=a+' + '+b+' : '+c; } else if(k==='+×'){ a=rnd(100,500); b=rnd(11,40); c=rnd(2,9); t=a+' + '+b+' × '+c; } else { c=rnd(2,9); b=c*rnd(10,40); a=rnd(b/c+20,900); t=a+' − '+b+' : '+c; }
    if(okBuoc(t) && tinhTSP(t)!==tinhBT2(t)) return t; } return '14 × 6 − 29'; }
function btNgoac3(){ for(var g=0;g<500;g++){ var k=pick(['−(−','×(:','(+):','(+)×','×(−']), a, b, c, t;
    if(k==='−(−'){ b=rnd(50,300); c=rnd(10,b-10); a=rnd(b,600); t=a+' − ('+b+' − '+c+')'; } else if(k==='×(:'){ a=rnd(2,9); c=rnd(2,9); b=c*rnd(2,12); t=a+' × ('+b+' : '+c+')'; } else if(k==='(+):'){ c=rnd(2,9); var s1=c*rnd(10,60); a=rnd(10,s1-10); b=s1-a; t='('+a+' + '+b+') : '+c; } else if(k==='(+)×'){ c=rnd(2,5); b=rnd(10,60); a=rnd(10,60); t='('+a+' + '+b+') × '+c; } else { a=rnd(2,9); b=rnd(20,60); c=rnd(1,b-1); t=a+' × ('+b+' − '+c+')'; }
    if(okBuoc(t) && okSo(tinhBoNgoac(t)) && tinhBoNgoac(t)!==tinhBT2(t)) return t; } return '182 − (96 − 54)'; }
/* Biểu thức cho bài "lớn hơn 80": có nhân chia trước, giá trị 50–150 */
function btNguong(){ for(var g=0;g<500;g++){ var k=pick(['×+','+:',':+','+×','×−']), a, b, c, t, v;
    if(k==='×+'){ a=10*rnd(2,6); b=rnd(2,4); c=10*rnd(1,5); t=a+' × '+b+' + '+c; } else if(k==='+:'){ a=10*rnd(2,8); c=rnd(2,5); b=c*10*rnd(1,10); t=a+' + '+b+' : '+c; } else if(k===':+'){ c=rnd(2,5); a=c*10*rnd(1,6); b=10*rnd(2,8); t=a+' : '+c+' + '+b; } else if(k==='+×'){ a=10*rnd(2,6); b=10*rnd(2,5); c=rnd(2,4); t=a+' + '+b+' × '+c; } else { a=10*rnd(2,6); b=rnd(2,5); c=10*rnd(1,5); t=a+' × '+b+' − '+c; }
    if(!okBuoc(t)) continue; v=tinhBT2(t); if(v>=40 && v<=200) return t; } return '30 × 2 + 20'; }
function bieuThucTo(t){ return '<div class="text-3xl font-extrabold text-orange-600 my-2">'+t+'</div>'; }

var BAI = {
 n: 42,
 title: 'Ôn Tập Biểu Thức Số',
 sub: 'Luyện thông minh: câu hỏi tự đổi theo bé — làm hết lượt để xem ngọn lửa!',
 goal: 10, soCau: 18, soCauToiDa: 24,
 loi: {'tinh-trai-sang-phai':'Làm từ trái sang phải khi có nhân, chia', 'nhan-chia-sau':'Làm nhân, chia sau cộng, trừ', 'bo-ngoac':'Bỏ dấu ngoặc', 'nham-gia-tri':'Nhầm giá trị với một số trong biểu thức', 'dem-sot-phep':'Đếm sót hoặc thừa thẻ', 'nham-bang-lon-hon':'Nhầm "bằng" với "lớn hơn"'},
 muctieu: [
  {id:'MT1', ten:'Tính giá trị không ngoặc', muc:['731 − 680 + 19; 63 × 2 : 7 (từ trái sang phải); bạn An làm từ trái sang phải: em thấy thế nào.', '14 × 6 − 29; 348 + 84 : 6 (nhân chia trước); An bỏ ngoặc.', 'Ba phép hỗn hợp với số ba chữ số; kết quả đúng là bao nhiêu.']},
  {id:'MT2', ten:'Tính giá trị có ngoặc', muc:['7 × (48 : 6); cá heo: biểu thức nào bằng 40.', '182 − (96 − 54); quả bóng nào ứng với biểu thức.', 'Số ba chữ số và ngoặc chứa phép chia; đếm thẻ bằng số đã cho.']},
  {id:'MT3', ten:'So sánh và chọn dấu', muc:['Thẻ nào có giá trị lớn hơn 80 (có thẻ bằng 80); 5 ? 5 ? 5 = 5.', 'Có mấy thẻ lớn hơn 80; 6 × (6 ? 6) bé nhất.', 'Ngưỡng khác với năm thẻ; a ? a ? a = a; 6 × (6 ? 6) lớn nhất.']},
  {id:'MT4', ten:'Vận dụng và tính thuận tiện', muc:['3 bao gạo nặng bao nhiêu; 27 + 34 + 66; 288 bánh xe vào hộp 4.', '3 bao gạo và 1 bao ngô (30 × 3 + 45); 7 × 5 × 2; mỗi thùng 8 hộp: mấy thùng.', 'Chọn biểu thức đúng; chọn cách ghép thuận tiện; mỗi thùng có bao nhiêu bánh xe.']}
 ],
 topics: [
  /* D1 — Từ trái sang phải (Bài 1a, b trang 1) */
  {name:'Từ trái sang phải', sec:'Bài 1 trang 1 — 731 − 680 + 19 = 70; 63 × 2 : 7 = 18', mt:['MT1'], levels:3,
   muc:['Chỉ cộng trừ với số ba chữ số (731 − 680 + 19).', 'Chỉ nhân chia (63 × 2 : 7).', 'Ba phép cộng trừ với số ba chữ số.'],
   make:function(lv){
    var t = lv<=1 ? btTrai3() : (lv===2 ? btNhanChia() : null), g;
    if(lv===3){ for(g=0;g<300;g++){ var a=rnd(300,900), b=rnd(50,300), c=rnd(20,200), d=rnd(10,150), k=pick(['−+−','+−−','−−+']), s=a, ok=true; t=String(a); [b,c,d].forEach(function(v,i){ var op=k.charAt(i); s = op==='+' ? s+v : s-v; if(!okSo(s)) ok=false; t+=' '+(op==='+'?'+':TRU)+' '+v; }); if(ok) break; } }
    var T=tinhBT2(t), tk=t.split(' '), b1=tk.slice(0,3).join(' '), v1=tinhBT(b1), sai=[[v1,'thieu-buoc'],[T+1,'nham-bang'],[T-1,'nham-bang'],[T+10,'nham-bang'],[tinhBT(tk.slice(2).join(' ')),'nham-gia-tri']];
    return {type:'num', _lv:lv, _bt:t, q:kyHieu('Tính giá trị của biểu thức', t+' ='+oHoi()), ans:T, sai:nhanSai(sai, T), goiY:gy({'thieu-buoc':'Bé làm phép đầu được '+v1+', rồi làm tiếp phép sau.', 'nham-gia-tri':'Bé làm từ trái sang phải: '+b1+' = '+v1+' trước.'})};
  }, check:function(q){ var t=q._bt; if(!laBT(t) || !okBuoc(t) || (/[×:]/.test(t) && /[+−]/.test(t))) return false; return q.ans===tinhBT2(t) && soPhep(t)===(q._lv===3 ? 3 : 2) && (q._lv===2 ? /[×:]/.test(t) : !/[×:]/.test(t)); }},

  /* D2 — Nhân chia trước (Bài 1c, d trang 1) */
  {name:'Nhân chia trước', sec:'Bài 1 trang 1 — 14 × 6 − 29 = 55; 348 + 84 : 6 = 362', mt:['MT1'], levels:3,
   muc:['14 × 6 − 29.', '348 + 84 : 6.', 'Hai phép nhân chia trong một biểu thức.'],
   make:function(lv){
    var t, g;
    if(lv<=1){ for(g=0;g<200;g++){ var a=rnd(11,30), b=rnd(2,9), c=rnd(10,a*b-10); t=a+' × '+b+' − '+c; if(okBuoc(t)) break; } }
    else if(lv===2){ for(g=0;g<200;g++){ var c2=rnd(2,9), b2=c2*rnd(10,40), a2=rnd(100,600); t=a2+' + '+b2+' : '+c2; if(okBuoc(t)) break; } }
    else { for(g=0;g<300;g++){ var a3=rnd(11,30), b3=rnd(2,9), d3=rnd(2,9), c3=d3*rnd(2,20), op=pick(['+','−']); t=a3+' × '+b3+' '+op+' '+c3+' : '+d3; if(okBuoc(t) && tinhTSP(t)!==tinhBT2(t)) break; } }
    var T=tinhBT2(t);
    return {type:'num', _lv:lv, _bt:t, q:kyHieu('Tính giá trị của biểu thức', t+' ='+oHoi()), ans:T, sai:nhanSai(nhieuGiaTri(t).concat([[tinhBT(t.split(' ').slice(0,3).join(' ')),'thieu-buoc']]), T), goiY:gy({'thieu-buoc':'Bé làm phép nhân, chia trước rồi mới cộng, trừ.'})};
  }, check:function(q){ var t=q._bt; if(!laBT(t) || !okBuoc(t) || !/[×:]/.test(t) || !/[+−]/.test(t)) return false; return q.ans===tinhBT2(t) && soPhep(t)===(q._lv===3 ? 3 : 2) && (q._lv<=1 || tinhTSP(t)!==tinhBT2(t)); }},

  /* D3 — Gạo và ngô (Bài 2 trang 1) */
  {name:'Gạo và ngô', sec:'Bài 2 trang 1 — Mỗi bao gạo 30 kg, mỗi bao ngô 45 kg: 3 bao gạo và 1 bao ngô nặng 30 × 3 + 45 = 135 kg', mt:['MT4'], levels:3,
   muc:['3 bao gạo nặng bao nhiêu.', '3 bao gạo và 1 bao ngô nặng bao nhiêu (30 × 3 + 45).', 'Chọn biểu thức đúng trong bốn.'],
   make:function(lv){
    var g=pick([30,25,40,35,50]), n=rnd(2,5), ngo=pick([45,55,65,40].filter(function(x){ return x!==g; })), vat=pick([['bao gạo','bao ngô','kg'],['thùng cam','thùng táo','kg'],['can nước mắm','can dầu','l']]), t=g+' × '+n+' + '+ngo, T=g*n+ngo;
    var de='<div>Mỗi '+vat[0]+' nặng <b>'+g+' '+vat[2]+'</b>, mỗi '+vat[1]+' nặng <b>'+ngo+' '+vat[2]+'</b>. ';
    if(lv<=1) return {type:'num', _lv:1, _g:g, _n:n, _ngo:ngo, _hoi:'gao', q:de+n+' '+vat[0]+' nặng bao nhiêu '+vat[2]+'?</div>', ans:g*n, unit:vat[2], sai:nhanSai([[g+n,'cong-thay-nhan'],[T,'dao-vai'],[g*n+10,'nham-bang']], g*n), goiY:gy()};
    if(lv===2) return {type:'num', _lv:2, _g:g, _n:n, _ngo:ngo, _hoi:'ca', q:de+n+' '+vat[0]+' và 1 '+vat[1]+' nặng tất cả bao nhiêu '+vat[2]+'?</div><div class="text-base text-slate-500">Biểu thức: '+t+'</div>', ans:T, unit:vat[2], sai:nhanSai([[g*n,'thieu-buoc'],[tinhTSP(t),'tinh-trai-sang-phai'],[g+ngo,'thieu-buoc'],[T+10,'nham-bang']], T), goiY:gy({'thieu-buoc':'Bước 1: '+n+' '+vat[0]+' nặng '+g+' × '+n+'. Bước 2: cộng thêm '+ngo+'.'})};
    var ch=shuffle([t, '('+g+' + '+ngo+') × '+n, g+' + '+ngo+' × '+n, g+' × '+n+' − '+ngo]), sai={}; ch.forEach(function(c,i){ if(c!==t) sai[String(i)]='chon-sai-phep'; });
    return {type:'mcq', cot:1, _lv:3, _g:g, _n:n, _ngo:ngo, _hoi:'bt', _dung:t, q:de+'Biểu thức nào tính số '+vat[2]+' của '+n+' '+vat[0]+' và 1 '+vat[1]+'?</div>', choices:ch, correct:ch.indexOf(t), sai:sai, goiY:gy({'chon-sai-phep':n+' '+vat[0]+' là '+g+' × '+n+', rồi cộng 1 '+vat[1]+' '+ngo+' '+vat[2]+'.'})};
  }, check:function(q){ var T=q._g*q._n+q._ngo; if(T>999) return false; if(q._hoi==='gao') return q.ans===q._g*q._n; if(q._hoi==='ca') return q.ans===T; return kiemMCQ(q) && q.choices.length===4 && q._dung===q._g+' × '+q._n+' + '+q._ngo && q.choices.filter(function(c){ return tinhBT2(c)===T; }).length===1; }},

  /* D4 — Lớn hơn 80 (Bài 3 trang 1) */
  {name:'Lớn hơn 80', sec:'Bài 3 trang 1 — Biểu thức nào có giá trị lớn hơn 80: A 30 × 2 + 20 = 80 (không lớn hơn); B 50 + 100 : 2 = 100; C 60 : 3 + 70 = 90; D 30 + 40 × 2 = 110; E 20 × 5 − 30 = 70', mt:['MT3'], levels:3,
   muc:['Ba thẻ, thẻ nào lớn hơn 80 (một thẻ đúng bằng 80 để đánh lạc).', 'Bốn thẻ: có mấy thẻ lớn hơn 80 (một thẻ bằng 80).', 'Năm thẻ, ngưỡng khác (bé hơn 50, lớn hơn 100).'],
   make:function(lv){
    var N = lv<=2 ? 80 : pick([50,100,120]), lon = lv===3 ? Math.random()<0.5 : true, n = lv<=1 ? 3 : (lv===2 ? 4 : 5), ds=[], g=0, bang=null;
    while(g<600 && ds.length<n-1){ g++; var t=btNguong(), v=tinhBT2(t); if(ds.indexOf(t)>=0 || v===N) continue; if(ds.map(tinhBT2).indexOf(v)>=0) continue; ds.push(t); }
    for(g=0;g<400 && !bang;g++){ var tb=btNguong(); if(tinhBT2(tb)===N && ds.indexOf(tb)<0) bang=tb; }
    if(!bang){ var bb=N-20; bang=bb+' + 40 : 2'; } ds.push(bang);
    var ok=ds.filter(function(t){ var v=tinhBT2(t); return lon ? v>N : v<N; });
    if(lv<=1){ if(ok.length!==1) return BAI.topics[3].make(1); var dung=ok[0]; ds=shuffle(ds); var sai={}; ds.forEach(function(t,i){ if(t!==dung) sai[String(i)]=(tinhBT2(t)===N ? 'nham-bang-lon-hon' : 'nham-bang'); });
      return {type:'mcq', cot:1, _lv:1, _N:N, _lon:lon, _ds:ds, _dung:dung, q:theTinh(ds)+'<div>Thẻ nào ghi biểu thức có giá trị <b>lớn hơn '+N+'</b>?</div>', choices:ds, correct:ds.indexOf(dung), sai:sai, goiY:gy({'nham-bang':'Bé tính từng thẻ rồi so với '+N+'.'})}; }
    if(ok.length<1 || ok.length>=n) return BAI.topics[3].make(lv);
    ds=shuffle(ds); var dem=ok.length;
    return {type:'num', _lv:lv, _N:N, _lon:lon, _ds:ds, q:theTinh(ds)+'<div>Có bao nhiêu thẻ ghi biểu thức có giá trị <b>'+(lon ? 'lớn hơn' : 'bé hơn')+' '+N+'</b>?</div>', ans:dem, unit:'thẻ', sai:nhanSai([[dem+1,'nham-bang-lon-hon'],[dem-1,'dem-sot-phep'],[n,'dem-sot-phep']], dem), goiY:gy({'nham-bang-lon-hon':'Thẻ có giá trị đúng bằng '+N+' thì không '+(lon ? 'lớn hơn' : 'bé hơn')+' '+N+'.'})};
  }, check:function(q){ var ds=q._ds, N=q._N; if(docThe(q.q).join('|')!==ds.join('|') || !ds.every(function(t){ return laBT(t) && okBuoc(t); })) return false; var vs=ds.map(tinhBT2), ok=vs.filter(function(v){ return q._lon ? v>N : v<N; }).length, co=vs.indexOf(N)>=0;
    if(q._lv<=1) return kiemMCQ(q) && ds.length===3 && ok===1 && tinhBT2(q._dung)>N && co; return q.ans===ok && ok>=1 && ok<ds.length && (q._lv===2 ? ds.length===4 && co && N===80 : ds.length===5); }},

  /* D5 — Đố em: chọn dấu (Bài 4 trang 1; Bài 5 trang 2) */
  {name:'Đố em: chọn dấu', sec:'Bài 4 trang 1, Bài 5 trang 2 — 5 ? 5 ? 5 = 5 (5 + 5 − 5); 6 × (6 ? 6) bé nhất khi ? là − (6 × 0 = 0)', mt:['MT3'], levels:3,
   muc:['5 ? 5 ? 5 = 5: chọn cặp dấu đúng (một cặp đúng trong bốn).', '6 × (6 ? 6): dấu nào cho giá trị bé nhất.', 'a ? a ? a = a với a khác; 6 × (6 ? 6) lớn nhất.'],
   make:function(lv){
    var a = lv<=1 ? 5 : pick([3,4,6,7,8,9]);
    if(lv<=1 || (lv===3 && Math.random()<0.5)){ var cap=[['+','−'],['−','+'],['+','+'],['−','−'],['×',':'],[':','×'],['×','−'],['+','×'],['×','+'],[':','+']].filter(function(p){ return okBuoc(a+' '+p[0]+' '+a+' '+p[1]+' '+a); }), dungs=cap.filter(function(p){ return tinhBT(a+' '+p[0]+' '+a+' '+p[1]+' '+a)===a; }), dung=pick(dungs), khac=shuffle(cap.filter(function(p){ return tinhBT(a+' '+p[0]+' '+a+' '+p[1]+' '+a)!==a; })).slice(0,3);
      var ch=shuffle([dung].concat(khac)).map(function(p){ return a+' '+p[0]+' '+a+' '+p[1]+' '+a; }), dungT=a+' '+dung[0]+' '+a+' '+dung[1]+' '+a, sai={}; ch.forEach(function(c,i){ if(c!==dungT) sai[String(i)]='nham-bang'; });
      return {type:'mcq', cot:2, _lv:lv, _kieu:'ba', _a:a, _dung:dungT, q:'<div>Chọn dấu thích hợp thay cho dấu ? để được <b class="text-2xl text-orange-600">'+a+' ? '+a+' ? '+a+' = '+a+'</b>. Cách điền nào đúng?</div>', choices:ch, correct:ch.indexOf(dungT), sai:sai, goiY:gy({'nham-bang':'Bé tính từng cách từ trái sang phải (nhân chia trước nếu có) rồi xem cách nào bằng '+a+'.'})}; }
    var be = lv===2, b=6, ops=['+','−','×',':'], vals=ops.map(function(o){ return tinhBT2(b+' × ('+b+' '+o+' '+b+')'); }), muon = be ? Math.min.apply(null, vals) : Math.max.apply(null, vals), dungOp=ops[vals.indexOf(muon)], ch2=ops.map(function(o){ return b+' × ('+b+' '+o+' '+b+')'; }), dung2=b+' × ('+b+' '+dungOp+' '+b+')', sai2={}; ch2.forEach(function(c,i){ if(c!==dung2) sai2[String(i)]='bo-ngoac'; });
    return {type:'mcq', cot:2, _lv:lv, _kieu:'ngoac', _b:b, _be:be, _dung:dung2, q:'<div>Thay dấu ? trong <b class="text-2xl text-orange-600">'+b+' × ('+b+' ? '+b+')</b> bằng một dấu + , − , × hoặc : . Cách nào cho biểu thức có giá trị <b>'+(be ? 'bé nhất' : 'lớn nhất')+'</b>?</div>', choices:ch2, correct:ch2.indexOf(dung2), sai:sai2, goiY:gy({'bo-ngoac':'Bé tính trong ngoặc với từng dấu: 6 + 6, 6 − 6, 6 × 6, 6 : 6, rồi nhân với 6 và so sánh.'})};
  }, check:function(q){
    if(q._kieu==='ba'){ var a=q._a; return kiemMCQ(q) && q.choices.length===4 && q.choices.every(okBuoc) && tinhBT(q._dung)===a && q.choices.filter(function(c){ return tinhBT(c)===a; }).length===1; }
    var vs=q.choices.map(tinhBT2), m = q._be ? Math.min.apply(null, vs) : Math.max.apply(null, vs); return kiemMCQ(q) && q.choices.length===4 && tinhBT2(q._dung)===m && vs.filter(function(v){ return v===m; }).length===1; }},

  /* D6 — Có dấu ngoặc (Bài 1 trang 2) */
  {name:'Có dấu ngoặc', sec:'Bài 1 trang 2 — 182 − (96 − 54) = 140; 7 × (48 : 6) = 56', mt:['MT2'], levels:3,
   muc:['7 × (48 : 6): ngoặc chứa phép chia.', '182 − (96 − 54): số ba chữ số.', 'Số ba chữ số và ngoặc chứa phép chia hoặc nhân.'],
   make:function(lv){
    var t, g; for(g=0;g<300;g++){ t=btNgoac3(); if(lv<=1 && /× \(\d+ : /.test(t)) break; if(lv===2 && /^\d{3} − \(/.test(t)) break; if(lv===3 && /\(\d+ [:×+] /.test(t) && (/^\d{3}/.test(t) || tinhBT2(t)>=100)) break; }
    var T=tinhBT2(t), trong=/\(([^()]+)\)/.exec(t)[1];
    return {type:'num', _lv:lv, _bt:t, q:kyHieu('Tính giá trị của biểu thức', t+' ='+oHoi()), ans:T, sai:nhanSai(nhieuGiaTri(t).concat([[tinhBT(trong),'thieu-buoc']]), T), goiY:gy({'thieu-buoc':'Trong ngoặc được '+tinhBT(trong)+', bé làm tiếp phép còn lại.'})};
  }, check:function(q){ var t=q._bt; return /\(/.test(t) && okBuoc(t) && q.ans===tinhBT2(t) && tinhBoNgoac(t)!==tinhBT2(t); }},

  /* D7 — Cá heo và bóng (Bài 2 trang 2) */
  {name:'Cá heo và bóng', sec:'Bài 2 trang 2 — Bốn con cá heo và bốn quả bóng 100, 50, 210, 40: 4 × (54 − 44) = 40; (33 + 67) : 2 = 50; (25 + 45) × 3 = 210; 52 + 24 × 2 = 100', mt:['MT2'], levels:3,
   muc:['Biểu thức nào có giá trị bằng số trên quả bóng (bốn thẻ).', 'Quả bóng nào (bốn số) ứng với một biểu thức.', 'Có mấy thẻ có giá trị bằng số đã cho.'],
   make:function(lv){
    var ds=nhieuBT(function(){ return Math.random()<0.7 ? btNgoac3() : btUuTien3(); }, 4);
    if(lv<=1){ var dung=pick(ds), T=tinhBT2(dung), sai={}; ds.forEach(function(c,i){ if(c!==dung) sai[String(i)]=(tinhBoNgoac(c)===T ? 'bo-ngoac' : (tinhTSP(c)===T ? 'tinh-trai-sang-phai' : 'nham-bang')); });
      return {type:'mcq', cot:1, _lv:1, _ds:ds, _T:T, _dung:dung, q:theTinh(ds)+'<div>Quả bóng ghi số <b class="text-2xl text-orange-600">'+T+'</b>. Con cá heo nào (biểu thức nào) có giá trị bằng '+T+'?</div>', choices:ds, correct:ds.indexOf(dung), sai:sai, goiY:gy()}; }
    if(lv===2){ var t2=pick(ds), T2=tinhBT2(t2), ch=[T2], g=0; while(ch.length<4 && g<200){ g++; var x=pick([tinhBoNgoac(t2), tinhTSP(t2), T2+1, T2-1, T2+10, T2-10, T2+2]); if(okSo(x) && x>0 && ch.indexOf(x)<0) ch.push(x); } ch=shuffle(ch.map(String)); var sai2={}; ch.forEach(function(c,i){ if(+c!==T2) sai2[String(i)]=(+c===tinhBoNgoac(t2) ? 'bo-ngoac' : (+c===tinhTSP(t2) ? 'tinh-trai-sang-phai' : 'nham-bang')); });
      return {type:'mcq', cot:2, _lv:2, _bt:t2, _dung:String(T2), q:bieuThucTo(t2)+'<div>Mỗi quả bóng ghi một số. Quả bóng nào ghi đúng giá trị của biểu thức?</div>', choices:ch, correct:ch.indexOf(String(T2)), sai:sai2, goiY:gy()}; }
    ds.sort(function(x,y){ return tinhBT2(y)-tinhBT2(x); }); var T3=tinhBT2(ds[0]), them=null, h; for(h=0;h<300 && !them;h++){ var u=Math.random()<0.7 ? btNgoac3() : btUuTien3(); if(tinhBT2(u)===T3 && ds.indexOf(u)<0) them=u; }
    if(!them){ var k = T3>=10 ? rnd(1,9) : 0; them=(T3-k)+' + '+k; }
    var ds3=shuffle(ds.slice(0,3).concat([them])), dem=ds3.filter(function(x){ return tinhBT2(x)===T3; }).length;
    return {type:'num', _lv:3, _ds:ds3, _T:T3, q:theTinh(ds3)+'<div>Quả bóng ghi số <b class="text-2xl text-orange-600">'+T3+'</b>. Có bao nhiêu thẻ ghi biểu thức có giá trị bằng '+T3+'?</div>', ans:dem, unit:'thẻ', sai:nhanSai([[dem-1,'dem-sot-phep'],[dem+1,'dem-sot-phep'],[4,'dem-sot-phep']], dem), goiY:gy()};
  }, check:function(q){
    if(q._lv===2) return okBuoc(q._bt) && kiemMCQ(q) && q.choices.length===4 && +q._dung===tinhBT2(q._bt);
    var ds=q._ds; if(docThe(q.q).join('|')!==ds.join('|') || ds.length!==4 || !ds.every(okBuoc)) return false; var dem=ds.filter(function(t){ return tinhBT2(t)===q._T; }).length;
    if(q._lv<=1) return kiemMCQ(q) && dem===1 && tinhBT2(q._dung)===q._T; return q.ans===dem && dem===2; }},

  /* D8 — Tính thuận tiện (Bài 3 trang 2) */
  {name:'Tính thuận tiện', sec:'Bài 3 trang 2 — 27 + 34 + 66 = 127 (ghép 34 + 66 = 100); 7 × 5 × 2 = 70 (ghép 5 × 2 = 10)', mt:['MT4'], levels:3,
   muc:['Ba số cộng, hai số ghép thành tròn trăm (27 + 34 + 66).', 'Ba thừa số, hai thừa số ghép thành 10 (7 × 5 × 2).', 'Chọn cách ghép thuận tiện và đúng trong bốn thẻ.'],
   make:function(lv){
    if(lv<=1){ var tron=pick([100,100,200]), b=rnd(11,tron-11); while(b%10===0) b=rnd(11,tron-11); var c=tron-b, a=rnd(11,99), T=a+b+c, t=a+' + '+b+' + '+c;
      return {type:'num', _lv:1, _bt:t, q:kyHieu('Tính thuận tiện', t+' ='+oHoi())+'<div class="text-base text-slate-500">Gợi ý: ghép hai số có tổng là số tròn trăm.</div>', ans:T, sai:nhanSai([[a+b,'thieu-buoc'],[T+10,'nham-bang'],[T-10,'nham-bang'],[T+100,'nham-bang']], T), goiY:gy({'thieu-buoc':'Ghép '+b+' + '+c+' = '+tron+' rồi cộng với '+a+'.'})}; }
    var a2=rnd(3,9), cap=pick([[5,2],[2,5]]), t2=a2+' × '+cap[0]+' × '+cap[1], T2=a2*10;
    if(lv===2) return {type:'num', _lv:2, _bt:t2, q:kyHieu('Tính thuận tiện', t2+' ='+oHoi()), ans:T2, sai:nhanSai([[a2*cap[0],'thieu-buoc'],[a2+cap[0]+cap[1],'cong-thay-nhan'],[T2+10,'nham-bang'],[a2*cap[0]+cap[1],'chon-sai-phep']], T2), goiY:gy({'thieu-buoc':'Ghép '+cap[0]+' × '+cap[1]+' = 10 rồi nhân với '+a2+'.'})};
    var dung=a2+' × ('+cap[0]+' × '+cap[1]+')', ch=shuffle([dung, '('+a2+' × '+cap[0]+') + '+cap[1], a2+' + '+cap[0]+' × '+cap[1], a2+' × '+cap[0]+' + '+cap[1]]), sai={}; ch.forEach(function(x,i){ if(x!==dung) sai[String(i)]='chon-sai-phep'; });
    if(ch.filter(function(x){ return tinhBT2(x)===T2; }).length!==1) return BAI.topics[7].make(3);
    return {type:'mcq', cot:1, _lv:3, _bt:t2, _dung:dung, q:bieuThucTo(t2)+'<div>Cách ghép nào tính đúng và thuận tiện giá trị của biểu thức trên?</div>', choices:ch, correct:ch.indexOf(dung), sai:sai, goiY:gy({'chon-sai-phep':'Biểu thức chỉ có phép nhân: ghép '+cap[0]+' × '+cap[1]+' = 10 rồi nhân với '+a2+'.'})};
  }, check:function(q){ var t=q._bt;
    if(q._lv<=1){ var p=t.split(' + ').map(Number); return p.length===3 && q.ans===p[0]+p[1]+p[2] && (p[1]+p[2]===100 || p[1]+p[2]===200) && q.ans<=999; }
    var m=/^(\d+) × (\d+) × (\d+)$/.exec(t); if(!m || (+m[2])*(+m[3])!==10) return false; var T=(+m[1])*10; if(q._lv===2) return q.ans===T; return kiemMCQ(q) && q.choices.length===4 && tinhBT2(q._dung)===T && q.choices.filter(function(x){ return tinhBT2(x)===T; }).length===1; }},

  /* D9 — Bánh xe: hộp và thùng (Bài 4 trang 2) */
  {name:'Bánh xe: hộp và thùng', sec:'Bài 4 trang 2 — 288 bánh xe ô tô, mỗi hộp 4 bánh, mỗi thùng 8 hộp: 288 : 4 = 72 hộp; 72 : 8 = 9 thùng', mt:['MT4'], levels:3,
   muc:['288 bánh xe, mỗi hộp 4 bánh: mấy hộp.', 'Mỗi thùng 8 hộp: mấy thùng (hai bước).', 'Mỗi thùng có bao nhiêu bánh xe (nhân); số khác.'],
   make:function(lv){
    var h=rnd(2,6), th=rnd(4,9), nth = lv<=1 ? rnd(5,20) : rnd(3,12), hop=th*nth, banh=hop*h; while(banh>999){ nth--; hop=th*nth; banh=hop*h; }
    var vat=pick([['bánh xe ô tô','hộp','thùng'],['viên bi','túi','hộp'],['cái bút','hộp','thùng']]);
    var de='<div>Có <b>'+banh+' '+vat[0]+'</b> xếp đều vào các '+vat[1]+', mỗi '+vat[1]+' <b>'+h+' '+vat[0]+'</b>. ';
    if(lv<=1) return {type:'num', _lv:1, _h:h, _th:th, _nth:nth, _hoi:'hop', q:de+'Xếp được bao nhiêu '+vat[1]+'?</div>', ans:hop, unit:vat[1], sai:nhanSai([[banh-h,'chon-sai-phep'],[hop+1,'nham-bang'],[hop-1,'nham-bang']], hop), goiY:gy()};
    if(lv===2) return {type:'num', _lv:2, _h:h, _th:th, _nth:nth, _hoi:'thung', q:de+'Rồi xếp các '+vat[1]+' đó vào các '+vat[2]+', mỗi '+vat[2]+' <b>'+th+' '+vat[1]+'</b>. Xếp được bao nhiêu '+vat[2]+'?</div>', ans:nth, unit:vat[2], sai:nhanSai([[hop,'thieu-buoc'],[nth+1,'nham-bang'],[hop-th,'chon-sai-phep']], nth), goiY:gy({'thieu-buoc':'Bước 1: số '+vat[1]+' là '+banh+' : '+h+' = '+hop+'. Bước 2: số '+vat[2]+' là '+hop+' : '+th+'.'})};
    return {type:'num', _lv:3, _h:h, _th:th, _nth:nth, _hoi:'moi', q:'<div>Mỗi '+vat[1]+' có <b>'+h+' '+vat[0]+'</b>, mỗi '+vat[2]+' có <b>'+th+' '+vat[1]+'</b>. Mỗi '+vat[2]+' có bao nhiêu '+vat[0]+'?</div>', ans:h*th, unit:vat[0], sai:nhanSai([[h+th,'cong-thay-nhan'],[h*th+h,'nham-bang'],[th,'dao-vai']], h*th), goiY:gy({'cong-thay-nhan':'Mỗi '+vat[2]+' có '+th+' '+vat[1]+', mỗi '+vat[1]+' '+h+' '+vat[0]+': nhân '+h+' × '+th+'.'})};
  }, check:function(q){ var hop=q._th*q._nth, banh=hop*q._h; if(banh>999) return false; return q.ans===(q._hoi==='hop' ? hop : (q._hoi==='thung' ? q._nth : q._h*q._th)); }},

  /* D10 — Bạn An tính (không có trong SGK) */
  {name:'Bạn An tính', sec:'Tìm lỗi — An làm từ trái sang phải khi có nhân chia; An bỏ dấu ngoặc: em thấy thế nào', mt:['MT1'], levels:3,
   muc:['An làm từ trái sang phải: em thấy thế nào.', 'An bỏ dấu ngoặc: em thấy thế nào.', 'Kết quả đúng là bao nhiêu.'],
   make:function(lv){
    var t, T, x, g, ok, kieu = lv<=1 ? 'tsp' : (lv===2 ? 'ngoac' : pick(['tsp','ngoac']));
    for(g=0;g<300;g++){ t = kieu==='tsp' ? btUuTien3() : btNgoac3(); T=tinhBT2(t); x = kieu==='tsp' ? tinhTSP(t) : tinhBoNgoac(t); if(okSo(x) && x!==T) break; }
    var tk=t.split(' '), dungC, saiC;
    if(kieu==='tsp'){ var i=/[×:]/.test(tk[1]) ? 0 : 2, uu=tk.slice(i,i+3).join(' '), vU=tinhBT(uu), con = i===0 ? vU+' '+tk[3]+' '+tk[4] : tk[0]+' '+tk[1]+' '+vU, b1=tk.slice(0,3).join(' '), v1=tinhBT(b1);
      dungC='Không đồng ý, vì '+uu+' = '+vU+' và '+con+' = '+T; saiC='Đồng ý, vì '+b1+' = '+v1; if(!Number.isInteger(v1)){ saiC='Đồng ý, vì '+uu+' = '+vU; } }
    else { var trong=/\(([^()]+)\)/.exec(t)[1], vT=tinhBT(trong), m2=/^(\d+) ([+−×:]) \((\d+) ([+−×:]) (\d+)\)$/.exec(t), m3=/^\((\d+) ([+−×:]) (\d+)\) ([+−×:]) (\d+)$/.exec(t), ngoai = m2 ? m2[1]+' '+m2[2]+' '+m2[3] : m3[3]+' '+m3[4]+' '+m3[5], buoc2 = m2 ? m2[1]+' '+m2[2]+' '+vT+' = '+T : vT+' '+m3[4]+' '+m3[5]+' = '+T;
      dungC='Không đồng ý, vì '+trong+' = '+vT+' và '+buoc2; saiC='Đồng ý, vì '+ngoai+' = '+tinhBT(ngoai); if(!Number.isInteger(tinhBT(ngoai))) saiC='Đồng ý, vì '+trong+' = '+vT; }
    if(lv===3) return {type:'num', _lv:3, _bt:t, _x:x, _kieu:kieu, q:nguoi('boy','Bạn An')+'<div>Bạn An tính: «<b>'+t+' = '+x+'</b>». An tính sai rồi! Giá trị đúng của biểu thức là bao nhiêu?</div>', ans:T, sai:nhanSai([[x, kieu==='tsp' ? 'tinh-trai-sang-phai' : 'bo-ngoac'],[T+1,'nham-bang'],[T-1,'nham-bang']], T), goiY:gy()};
    var ch=shuffle([dungC,saiC]), sai={}; sai[String(ch.indexOf(saiC))]=(kieu==='tsp' ? 'tinh-trai-sang-phai' : 'bo-ngoac');
    return {type:'mcq', cot:1, _lv:lv, _bt:t, _x:x, _kieu:kieu, _dung:dungC, q:nguoi('boy','Bạn An')+'<div>Bạn An tính: «<b>'+t+' = '+x+'</b>». Em thấy thế nào?</div>', choices:ch, correct:ch.indexOf(dungC), sai:sai, goiY:gy()};
  }, check:function(q){ var t=q._bt, T=tinhBT2(t); if(!okBuoc(t) || q._x===T || q._x!==(q._kieu==='tsp' ? tinhTSP(t) : tinhBoNgoac(t))) return false; if(q._lv===3) return q.ans===T; return q.choices.length===2 && q.choices.every(okEq) && kiemMCQ(q) && /^Không đồng ý/.test(q._dung); }}
 ]
};
