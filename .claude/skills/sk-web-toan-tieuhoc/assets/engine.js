/* engine.js — Engine v2 DÙNG CHUNG cho mọi bài luyện Toán tiểu học.
   Đọc biến toàn cục BAI và dựng TOÀN BỘ giao diện + chấm điểm + game layer.

   HAI CHẾ ĐỘ
   1) LUYỆN THÔNG MINH (mặc định khi BAI có muctieu): BAI.muctieu = [{id, ten, muc:[3 câu tả Mức 1/2/3]}];
      mỗi topic (= một DẠNG câu) khai báo mt:['MT1',…], levels:3, muc:[…], make(lv, mt), check(q).
      Engine chọn câu: khởi động mỗi mục tiêu 1 câu (Mức 2) -> luôn chọn mục tiêu còn thiếu bằng chứng /
      đang yếu nhất, đổi dạng liên tục (không quá 2 câu liền một dạng), câu sai hẹn ôn lại sau 3–5 câu
      bằng dạng khác. Mức lên/xuống RIÊNG từng mục tiêu. Kết thúc khi đủ BAI.soCau (18) câu và mỗi mục
      tiêu >= 3 câu (tối đa BAI.soCauToiDa = 24).
   2) CHỌN DẠNG (tab): luyện riêng một dạng, goal câu đúng, mức lên/xuống trong dạng đó (bài chưa có
      muctieu chỉ có chế độ này).
   ĐÁNH GIÁ (Thông tư 27/2020: 1 Nhận biết · 2 Hiểu · 3 Vận dụng): chỉ tính LẦN TRẢ LỜI ĐẦU mỗi câu; đúng 2
   câu liền -> lên mức, sai 2 câu liền -> xuống. Mức đạt = mức cao nhất có >= 2 câu đúng ngay và >= 60%.
   Cấp độ chung của bài = trung vị các mục tiêu. Hiển thị bằng NGỌN LỬA (lua.js): xanh lá nhạt -> xanh lá ->
   cam -> đỏ bùng. Câu sai: gợi ý theo nhãn lỗi (q.sai = {đáp án/chỉ số lựa chọn: nhãn}, q.goiY = {nhãn: câu}).
   Mở trang với ?kiemthu=1 thì có window.__ENG cho công cụ soát tự động.
   QUY TẮC: nối chuỗi, KHÔNG backtick và KHÔNG template literal (để chèn được editor GitHub). */
(function(){
  var BAI = window.BAI || { n:0, title:'', topics:[] };
  var topics = BAI.topics || [];
  var goal = BAI.goal || 10;
  var MTS = (BAI.muctieu && BAI.muctieu.length) ? BAI.muctieu : null, SMART = !!MTS;
  var TONG = BAI.soCau || 18, TRAN = BAI.soCauToiDa || 24;

  function load(k,d){ try{ var v=localStorage.getItem(k); return v?JSON.parse(v):d; }catch(e){ return d; } }
  function save(k,v){ try{ localStorage.setItem(k, JSON.stringify(v)); }catch(e){} }
  var CFG = load('toanlop3-cfg', {sound:true});
  if(CFG.sound===undefined) CFG.sound=true;
  if(!CFG.size) CFG.size='md';
  if(!CFG.device) CFG.device='auto';
  if(!CFG.theme) CFG.theme='light';
  /* Giao diện: Sáng / Tối / Dịu mắt — đặt data-theme trên <html>, màu đổi trong engine.css */
  var THEMES=[['light','Sáng','&#9728;&#65039;'],['dark','Tối','&#127769;'],['sepia','Dịu mắt','&#128214;']];
  function themeIdx(){ for(var i=0;i<THEMES.length;i++) if(THEMES[i][0]===CFG.theme) return i; return 0; }
  function applyTheme(){ try{ document.documentElement.setAttribute('data-theme', CFG.theme); }catch(e){} var b=document.getElementById('btnTheme'); if(b) b.innerHTML=THEMES[themeIdx()][2]; }
  applyTheme();
  var PKEY = 'toanlop3-bai-'+BAI.n;
  var PROG = load(PKEY, {});
  function chuanHoaProg(){ ['stars','muc','lich','mt','mtLan'].forEach(function(k){ if(!PROG[k]) PROG[k]={}; }); if(!PROG.lichTM) PROG.lichTM=[]; }
  chuanHoaProg();

  /* ----- Cấp độ tư duy + nhãn lỗi ----- */
  var MUC_TEN=['Đang làm quen','Nhận biết','Hiểu','Vận dụng'];
  var MUC_MOTA=['Bé cần luyện thêm những câu giống mẫu, có người lớn cùng làm.',
    'Bé nhận ra và làm được bài giống mẫu, với số nhỏ, quen thuộc.',
    'Bé hiểu cách làm, làm đúng cả khi số lớn hơn hoặc có bẫy quen thuộc.',
    'Bé vận dụng được vào tình huống mới, suy luận được nhiều bước.'];
  var MUC_MAU=['bg-slate-100 text-slate-700 border-slate-300','bg-emerald-100 text-emerald-700 border-emerald-300',
    'bg-amber-100 text-amber-700 border-amber-300','bg-rose-100 text-rose-700 border-rose-300'];
  var LOI_TEN={'canh-dong':'Nhầm với dòng bên cạnh trong bảng', 'nham-bang':'Nhầm sang bảng khác',
    'cong-thay-nhan':'Cộng/trừ thay cho nhân/chia', 'sai-buoc':'Đếm thêm, bớt sai bước', 'chon-sai-phep':'Chọn nhầm phép tính cho tình huống',
    'lech-nhom':'Đếm thiếu hoặc thừa số nhóm', 'dao-vai':'Nhầm vai trò các số (thừa số, tích, số chia, thương)', 'thieu-buoc':'Làm thiếu một bước của bài toán'};
  var LOI_GOIY={'canh-dong':'Mỗi dòng của bảng hơn dòng trước đúng một lần số. Bé đếm lại nhé!', 'nham-bang':'Bé xem lại: đây là bảng nào?',
    'cong-thay-nhan':'Phép nhân là cộng nhiều lần cùng một số, không phải cộng hai số.', 'sai-buoc':'Mỗi ô hơn (hoặc kém) ô bên cạnh cùng một số. Bé tìm bước đếm nhé!',
    'chon-sai-phep':'Chia thành các phần bằng nhau thì dùng phép chia; gộp nhiều nhóm bằng nhau thì dùng phép nhân.',
    'lech-nhom':'Bé đếm lại số nhóm nhé!', 'dao-vai':'Bé xem lại: ô trống là thừa số, tích, số chia hay thương?', 'thieu-buoc':'Bài này cần hai bước. Bé đã làm xong bước thứ hai chưa?'};
  if(BAI.loi) Object.keys(BAI.loi).forEach(function(k){ LOI_TEN[k]=BAI.loi[k]; });
  function trungVi(a){ if(!a.length) return 0; var b=a.slice().sort(function(x,y){ return x-y; }); return b[Math.floor((b.length-1)/2)]; }
  function lua(m, px, cls){ return window.veLua ? window.veLua(m, px, cls) : ''; }

  var score=0, streak=0, topic=0, cur=null, che='dang', finished=false;
  var sesCorrect=0, sesMiss=0;
  var lv=1, upRun=0, downRun=0, sesLog=[];          /* chế độ Chọn dạng */
  var T=null;                                         /* chế độ Luyện thông minh */
  var firstTry=true, qT0=0, luaTruoc=-1, dangTruoc=-1;
  var tabMaxH=0;  /* khoá chiều cao thẻ theo câu cao nhất (chống nhảy khung) */
  var fitOn=false, fitScale=1;  /* Vừa màn hình: co bằng CSS cho lọt một màn hình thiết bị */

  function byId(x){ return document.getElementById(x); }

  /* ----- Âm thanh tổng hợp (Web Audio, không cần file) ----- */
  var actx=null;
  function ac(){ if(!actx){ try{ actx=new (window.AudioContext||window.webkitAudioContext)(); }catch(e){ actx=null; } } return actx; }
  function tone(f,t0,dur,type,gain){ if(!CFG.sound) return; var c=ac(); if(!c) return; try{ var o=c.createOscillator(), g=c.createGain(); o.type=type||'sine'; o.frequency.value=f; o.connect(g); g.connect(c.destination); var t=c.currentTime+t0; g.gain.setValueAtTime(gain||0.08,t); g.gain.exponentialRampToValueAtTime(0.0001,t+dur); o.start(t); o.stop(t+dur); }catch(e){} }
  function sGood(){ tone(660,0,0.13,'sine',0.09); tone(990,0.10,0.15,'sine',0.09); }
  function sBad(){ tone(160,0,0.25,'square',0.05); }
  function sWin(){ var a=[523,659,784,1047]; for(var i=0;i<a.length;i++) tone(a[i], i*0.13, 0.22, 'triangle', 0.08); }

  /* ----- Chấm sao theo số lần sai trong buổi (chế độ Chọn dạng) ----- */
  function starsFor(miss){ var t3=Math.max(1,Math.round(goal*0.15)); var t2=Math.max(t3+1,Math.round(goal*0.5)); if(miss<=t3) return 3; if(miss<=t2) return 2; return 1; }
  function starRow(n, big){ var sz=big?'text-4xl md:text-5xl':'text-base'; var s=''; for(var i=0;i<3;i++){ s+='<span class="'+sz+' '+(i<n?'text-amber-400':'text-slate-300')+(big?' star-pop':'')+'" style="animation-delay:'+(i*0.15)+'s">&#9733;</span>'; } return s; }

  var NUT='bg-white text-slate-600 px-2 sm:px-3 py-2 rounded-xl shadow-sm border border-slate-200 hover:bg-slate-50 btn-press font-semibold text-sm';
  /* ----- Dựng khung giao diện ----- */
  function build(){
    var h='';
    h+='<div id="appwrap" class="w-full flex-grow flex flex-col" style="margin:0 auto">';
    h+= '<div class="w-full mb-3 flex justify-between items-center gap-2">';
    h+=  '<div class="flex flex-wrap gap-1.5 sm:gap-2">';
    h+=   '<a href="index.html" class="'+NUT+'">&#127968;<span class="hidden sm:inline"> Sảnh chính</span></a>';
    h+=   '<button id="btnFull" title="Vừa màn hình" class="'+NUT+'">&#128306;<span class="hidden sm:inline"> Vừa màn hình</span></button>';
    h+=   '<button id="btnDisp" title="Hiển thị" class="'+NUT+'">&#128421;</button>';
    h+=   '<button id="btnTheme" title="Đổi giao diện (Sáng / Tối / Dịu mắt)" class="'+NUT+'">'+THEMES[themeIdx()][2]+'</button>';
    h+=   '<button id="btnSound" title="Âm thanh" class="'+NUT+'">'+(CFG.sound?'&#128266;':'&#128263;')+'</button>';
    h+=  '</div>';
    h+=  '<div class="bg-white px-3 sm:px-4 py-2 rounded-xl shadow-sm border border-slate-200 flex items-center gap-3 sm:gap-4 font-bold shrink-0">';
    h+=   '<span class="text-amber-700" title="Điểm">&#11088; <span id="score">0</span></span>';
    h+=   '<span class="text-sky-700" title="Chuỗi đúng liên tiếp">&#9889; <span id="streak">0</span></span>';
    h+=  '</div>';
    h+= '</div>';
    h+= '<div class="w-full bg-white rounded-3xl shadow-xl border border-amber-100 overflow-hidden flex-grow flex flex-col">';
    h+=  '<div class="bg-gradient-to-r from-amber-600 to-orange-700 text-white p-4 md:p-5 text-center">';
    h+=   '<h1 class="text-xl md:text-3xl font-extrabold tracking-wide">Bài '+BAI.n+': '+BAI.title+'</h1>';
    h+=   '<p class="text-white font-medium text-sm md:text-base mt-1">'+(BAI.sub||'Bé chọn một hoạt động rồi luyện tập nhé!')+'</p>';
    h+=  '</div>';
    if(SMART){
      h+= '<div id="modeBar" class="flex bg-slate-100 border-b border-slate-200">';
      h+=  '<button id="btnTM" class="flex-1 py-2.5 px-2 text-sm font-extrabold border-b-4">&#10024; Luyện thông minh</button>';
      h+=  '<button id="btnDang" class="flex-1 py-2.5 px-2 text-sm font-extrabold border-b-4">&#128203; Chọn dạng</button>';
      h+= '</div>';
    }
    h+=  '<div id="tabs" class="flex flex-wrap bg-slate-100 border-b border-slate-200"></div>';
    h+=  '<div class="px-4 md:px-6 pt-3">';
    h+=   '<div class="flex items-center gap-2">';
    h+=    '<span id="luaBox" class="inline-flex items-end gap-1 shrink-0" style="min-height:42px"></span>';
    h+=    '<span id="tienDoTen" class="text-xs font-bold text-slate-500 whitespace-nowrap">Mục tiêu</span>';
    h+=    '<div class="flex-grow h-3 bg-slate-100 rounded-full overflow-hidden border border-slate-200"><div id="progbar" class="h-full bg-gradient-to-r from-emerald-400 to-emerald-500 transition-all duration-300" style="width:0%"></div></div>';
    h+=    '<span class="text-xs font-bold text-emerald-700 whitespace-nowrap"><span id="sesC">0</span>/<span id="sesT">'+goal+'</span></span>';
    h+=    '<button id="btnHoSo" title="Hồ sơ luyện tập" class="text-sm px-2 py-0.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 btn-press">&#128202;</button>';
    h+=   '</div>';
    h+=  '</div>';
    h+=  '<div class="p-4 md:p-6 flex-grow flex flex-col items-center justify-start">';
    h+=   '<div id="secname" class="text-orange-700 font-extrabold text-sm mb-2"></div>';
    h+=   '<div id="card" class="w-full max-w-xl bg-amber-50 border-2 border-amber-100 rounded-2xl p-5 md:p-6 text-center pop">';
    h+=    '<div id="qhtml" class="text-lg md:text-xl font-bold text-slate-700 mb-4 leading-relaxed"></div>';
    h+=    '<div id="answerArea"></div>';
    h+=    '<div id="feedback" class="mt-3 font-bold" style="min-height:1.6rem"></div>';
    h+=   '</div>';
    h+=   '<button id="btnNext" class="mt-4 px-5 py-2.5 bg-slate-100 text-slate-600 font-bold rounded-xl border border-slate-200 hover:bg-slate-200 btn-press text-sm">Câu khác &#128260;</button>';
    h+=  '</div>';
    h+= '</div>';
    h+='</div>';
    h+='<div id="dispPanel" class="hidden fixed inset-0 z-50 flex items-start justify-center pt-16 px-4">';
    h+= '<div id="dispBackdrop" class="absolute inset-0 bg-slate-900/30"></div>';
    h+= '<div class="relative bg-white rounded-2xl shadow-2xl border border-slate-200 p-4 w-72 max-w-full end-in">';
    h+=  '<div class="flex items-center justify-between mb-3"><span class="font-extrabold text-slate-700">&#128421; Hiển thị</span><button id="dispClose" class="text-slate-400 hover:text-slate-600 font-bold text-lg px-2 btn-press">&#10005;</button></div>';
    h+=  '<div class="text-xs font-bold text-slate-500 mb-1">Giao diện</div>';
    h+=  '<div id="themeRow" class="grid grid-cols-3 gap-1 mb-3"></div>';
    h+=  '<div class="text-xs font-bold text-slate-500 mb-1">Cỡ chữ</div>';
    h+=  '<div id="sizeRow" class="grid grid-cols-3 gap-1 mb-3"></div>';
    h+=  '<div class="text-xs font-bold text-slate-500 mb-1">Thiết bị</div>';
    h+=  '<div id="deviceRow" class="grid grid-cols-2 gap-1"></div>';
    h+= '</div>';
    h+='</div>';
    h+='<div id="hoSoPanel" class="hidden fixed inset-0 z-50 flex p-4 overflow-y-auto">';
    h+= '<div id="hoSoBackdrop" class="fixed inset-0 bg-slate-900/30"></div>';
    h+= '<div id="hoSoBox" class="relative m-auto bg-white rounded-2xl shadow-2xl border border-slate-200 p-4 w-full max-w-md end-in"></div>';
    h+='</div>';
    h+='<div id="toast" class="fixed top-4 left-1/2 -translate-x-1/2 z-50 pointer-events-none"></div>';
    h+='<div id="endscreen" class="hidden fixed inset-0 z-40 bg-slate-900/50 flex p-4 overflow-y-auto"></div>';
    document.body.innerHTML=h;
    byId('btnFull').onclick=toggleFit;
    byId('btnSound').onclick=toggleSound;
    byId('btnTheme').onclick=cycleTheme;
    byId('btnNext').onclick=function(){ if(che==='tm') tiepTM(); else nextQ(); };
    byId('btnDisp').onclick=function(){ buildDispPanel(); byId('dispPanel').classList.remove('hidden'); };
    byId('dispClose').onclick=closeDisp;
    byId('dispBackdrop').onclick=closeDisp;
    byId('btnHoSo').onclick=openHoSo;
    byId('hoSoBackdrop').onclick=closeHoSo;
    if(SMART){ byId('btnTM').onclick=batDauTM; byId('btnDang').onclick=function(){ setTopic(0); }; }
  }
  function veModeBar(){
    if(!SMART) return;
    [['btnTM','tm'],['btnDang','dang']].forEach(function(p){
      var b=byId(p[0]), on=(che===p[1]);
      b.className='flex-1 py-2.5 px-2 text-sm font-extrabold border-b-4 btn-press '+(on?'text-orange-700 bg-white border-orange-500':'text-slate-600 bg-slate-100 border-transparent hover:bg-slate-200');
    });
    byId('tabs').style.display = che==='tm' ? 'none' : '';
  }

  /* ----- Nút Hiển thị: cỡ chữ + loại thiết bị ----- */
  var SIZES={sm:0.85, md:1, lg:1.2};
  var DEVS={auto:'48rem', phone:'26rem', tablet:'45rem', desktop:'60rem'};
  function applyZoom(){ var w=byId('appwrap'); if(!w) return; try{ w.style.zoom=(SIZES[CFG.size]||1)*(fitOn?fitScale:1); }catch(e){} }
  /* Vừa màn hình: đo chiều cao cần rồi co để lọt viewport (sàn 0.5 giữ chữ đọc được; dài quá thì cuộn) */
  function refit(){
    var w=byId('appwrap'); if(!w || !fitOn){ fitScale=1; applyZoom(); return; }
    var base=SIZES[CFG.size]||1;
    try{ w.style.zoom=base; }catch(e){}
    var top=Math.max(0, Math.round(w.getBoundingClientRect().top));
    var avail=window.innerHeight - top*2;
    var need=w.scrollHeight;
    if(avail<120 || need<=0){ fitScale=1; applyZoom(); return; }  /* viewport chưa sẵn -> không co bậy */
    fitScale = Math.max(0.5, Math.min(1, avail/need));
    applyZoom();
  }
  function applyDisplay(){ var w=byId('appwrap'); if(!w) return; w.style.maxWidth=DEVS[CFG.device]||'48rem'; tabMaxH=0; if(cur) lockHeight(); if(fitOn) refit(); else applyZoom(); }
  function seg(k,v,label){ var on=CFG[k]===v; return '<button data-k="'+k+'" data-v="'+v+'" class="w-full px-2 py-1.5 rounded-lg text-xs font-bold border btn-press '+(on?'bg-amber-500 text-amber-950 border-amber-500':'bg-white text-slate-600 border-slate-200 hover:bg-slate-50')+'">'+label+'</button>'; }
  function buildDispPanel(){
    var sizes=[['sm','Nhỏ'],['md','Vừa'],['lg','Lớn']];
    var devs=[['auto','Tự động'],['phone','Điện thoại'],['tablet','Máy tính bảng'],['desktop','Máy tính']];
    byId('themeRow').innerHTML = THEMES.map(function(t){ return seg('theme', t[0], t[2]+' '+t[1]); }).join('');
    byId('sizeRow').innerHTML = sizes.map(function(s){ return seg('size', s[0], s[1]); }).join('');
    byId('deviceRow').innerHTML = devs.map(function(d){ return seg('device', d[0], d[1]); }).join('');
    Array.prototype.forEach.call(document.querySelectorAll('#dispPanel [data-k]'), function(b){
      b.onclick=function(){ CFG[b.getAttribute('data-k')]=b.getAttribute('data-v'); save('toanlop3-cfg',CFG); applyTheme(); applyDisplay(); buildDispPanel(); };
    });
  }
  function closeDisp(){ byId('dispPanel').classList.add('hidden'); }

  function buildTabs(){
    var t=byId('tabs'); t.innerHTML='';
    topics.forEach(function(tp,i){
      var st=PROG.stars[i]||0;
      var badge = st>0 ? '<span class="ml-1 text-amber-400 text-[10px]">'+ new Array(st+1).join('★') +'</span>' : '';
      var b=document.createElement('button');
      b.innerHTML=tp.name+badge;
      b.className='flex-1 basis-1/3 py-2.5 px-2 text-xs md:text-sm font-bold border-b-4 whitespace-nowrap '+((che==='dang'&&i===topic)?'text-orange-700 bg-white border-orange-500':'text-slate-600 bg-slate-100 border-transparent hover:bg-slate-200');
      b.onclick=function(){ setTopic(i); };
      t.appendChild(b);
    });
  }

  function updateHUD(){ byId('score').innerText=score; byId('streak').innerText=streak; }
  function updateProg(){
    var n = che==='tm' ? T.q : sesCorrect, m = che==='tm' ? TONG : goal;
    byId('sesC').innerText=n; byId('sesT').innerText=m; byId('tienDoTen').innerText = che==='tm' ? 'Câu' : 'Mục tiêu';
    byId('progbar').style.width=Math.min(100,Math.round(n/m*100))+'%';
  }

  /* ----- Đánh giá (dùng chung) ----- */
  /* Mức đạt = mức cao nhất có >= 2 câu đúng ngay và >= 60% số câu ở mức đó */
  function danhGia(log){
    var n=[0,0,0,0], k=[0,0,0,0], ms=0;
    log.forEach(function(e){ n[e.lv]++; if(e.ok) k[e.lv]++; ms+=e.ms||0; });
    var dat=0; for(var l=1;l<=3;l++) if(k[l]>=2 && k[l]>=0.6*n[l]) dat=l;
    return {n:n, k:k, dat:dat, tong:log.length, dung:k[1]+k[2]+k[3], giay:log.length?Math.round(ms/log.length/1000):0};
  }
  function uocLuongTM(log){
    var mt={}, ds=[];
    MTS.forEach(function(m){ var l=log.filter(function(e){ return e.mt===m.id; }); var d=danhGia(l); mt[m.id]={dat:d.dat, so:l.length, ev:d}; ds.push(d.dat); });
    return {mt:mt, tong:trungVi(ds)};
  }
  function mucHienTai(){ return che==='tm' ? uocLuongTM(T.log).tong : danhGia(sesLog).dat; }
  function capNhatLua(){
    var m=mucHienTai(), b=byId('luaBox'); if(!b) return;
    b.innerHTML=lua(m, 42, 'lua-song'+(luaTruoc>=0 && m>luaTruoc ? ' lua-bung' : ''))+'<span class="text-xs font-extrabold text-slate-600 hidden sm:inline">'+(m?'Mức '+m:'')+'</span>';
    b.title='Cấp độ tư duy hiện tại: '+(m?'Mức '+m+' · ':'')+MUC_TEN[m];
    luaTruoc=m;
  }

  /* ----- Chế độ CHỌN DẠNG: thích ứng trong một dạng ----- */
  function nLv(){ var t=topics[topic]; return (t && t.levels>1) ? Math.min(3, t.levels) : 1; }
  function setTopic(i){
    che='dang'; topic=i; sesCorrect=0; sesMiss=0; finished=false; tabMaxH=0; hideEnd(); veModeBar(); buildTabs(); updateProg();
    sesLog=[]; upRun=0; downRun=0; lv=nLv()>1 ? Math.max(1, Math.min(nLv(), PROG.muc[i]||1)) : 1;   /* bắt đầu ở mức cao nhất từng đạt */
    luaTruoc=-1; nextQ();
  }
  function ghiNhanDang(ok, loi){
    sesLog.push({lv:lv, ok:ok, ms:Date.now()-qT0, loi:loi||''});
    if(nLv()<2) return '';
    if(ok){ upRun++; downRun=0; if(upRun>=2 && lv<nLv()){ lv++; upRun=0; return '&#128640; Lên Mức '+lv+' · '+MUC_TEN[lv]+'!'; } }
    else { downRun++; upRun=0; if(downRun>=2 && lv>1){ lv--; downRun=0; return '&#128170; Mình luyện chắc Mức '+lv+' nhé!'; } }
    return '';
  }

  /* ----- Chế độ LUYỆN THÔNG MINH: chọn câu theo mục tiêu ----- */
  function mtTen(id){ for(var i=0;i<MTS.length;i++) if(MTS[i].id===id) return MTS[i].ten; return id; }
  function batDauTM(){
    che='tm'; finished=false; tabMaxH=0; hideEnd(); veModeBar(); buildTabs(); luaTruoc=-1; dangTruoc=-1;
    T={q:0, log:[], lv:{}, up:{}, down:{}, hen:[], dung:{}, ganDay:[], warm:shuffle(MTS.map(function(m){ return m.id; }))};
    MTS.forEach(function(m){ T.lv[m.id]=Math.min(3, Math.max(2, PROG.mt[m.id]||0)); T.up[m.id]=0; T.down[m.id]=0; });
    updateProg(); nextQ();
  }
  function soCauMT(id){ return T.log.filter(function(e){ return e.mt===id; }).length; }
  function chonCauTM(){
    var mt=null, tranh=-1, n=T.q, i;
    if(n < T.warm.length) mt=T.warm[n];                                   /* khởi động: mỗi mục tiêu một câu */
    else {
      for(i=0;i<T.hen.length;i++) if(T.hen[i].due<=n){ mt=T.hen[i].mt; tranh=T.hen[i].tranh; T.hen.splice(i,1); break; }   /* ôn lại câu sai */
      if(!mt){
        var uoc=uocLuongTM(T.log), truoc=T.log.length ? T.log[T.log.length-1].mt : null;
        var ds=MTS.map(function(m){ return {id:m.id, thieu:(soCauMT(m.id)<3?0:1), lap:(m.id===truoc?1:0), dat:uoc.mt[m.id].dat, lv:T.lv[m.id], r:Math.random()}; });
        ds.sort(function(a,b){ return a.thieu-b.thieu || a.lap-b.lap || a.dat-b.dat || a.lv-b.lv || a.r-b.r; });
        mt=ds[0].id;
      }
    }
    /* chọn DẠNG của mục tiêu: tránh dạng vừa sai, không quá 2 câu liền một dạng, ưu tiên dạng ít gặp */
    var cand=[]; topics.forEach(function(tp,j){ if((tp.mt||[]).indexOf(mt)>=0) cand.push(j); });
    var g=T.ganDay, cam = (g.length>=2 && g[g.length-1]===g[g.length-2]) ? g[g.length-1] : -1;
    var loc=cand.filter(function(j){ return j!==tranh && j!==cam; }); if(!loc.length) loc=cand;
    var it=Math.min.apply(null, loc.map(function(j){ return T.dung[j]||0; }));
    var chot=loc.filter(function(j){ return (T.dung[j]||0)===it; });
    return {mt:mt, dang:pick(chot), lv:T.lv[mt]};
  }
  function ghiNhanTM(ok, loi){
    var mt=cur._mt, e={mt:mt, dang:topic, lv:cur._lv, ok:ok, ms:Date.now()-qT0, loi:loi||''}, khoiDong=(T.q < T.warm.length);
    T.log.push(e); T.q++; T.dung[topic]=(T.dung[topic]||0)+1; T.ganDay.push(topic);
    if(!ok) T.hen.push({mt:mt, due:T.q+rnd(3,5), tranh:topic});
    var cu=T.lv[mt];
    if(khoiDong){ if(ok){ T.up[mt]=1; T.down[mt]=0; } else { T.lv[mt]=Math.max(1,cu-1); T.up[mt]=0; T.down[mt]=0; } }
    else if(ok){ T.up[mt]++; T.down[mt]=0; if(T.up[mt]>=2 && cu<3){ T.lv[mt]=cu+1; T.up[mt]=0; } }
    else { T.down[mt]++; T.up[mt]=0; if(T.down[mt]>=2 && cu>1){ T.lv[mt]=cu-1; T.down[mt]=0; } }
    if(T.lv[mt]>cu) return '&#128640; Lên Mức '+T.lv[mt]+' ở «'+mtTen(mt)+'»!';
    if(T.lv[mt]<cu && !khoiDong) return '&#128170; Mình luyện chắc Mức '+T.lv[mt]+' ở «'+mtTen(mt)+'» nhé!';
    return '';
  }
  function xongTM(){ return T.q>=TRAN || (T.q>=TONG && MTS.every(function(m){ return soCauMT(m.id)>=3; })); }
  function tiepTM(){ if(finished) return; if(xongTM()) finishTM(); else nextQ(); }

  /* ----- Câu hỏi ----- */
  function render(){
    byId('secname').innerText = topics[topic].sec || '';
    byId('qhtml').innerHTML = cur.q;
    var area=byId('answerArea'); area.innerHTML='';
    byId('feedback').innerHTML='';
    if(cur.type==='num'){
      var box=document.createElement('div'); box.className='flex items-center justify-center gap-2 flex-wrap';
      var inp=document.createElement('input'); inp.id='ans'; inp.type='number'; inp.setAttribute('inputmode','numeric');
      inp.className='w-36 text-center text-2xl font-extrabold border-2 border-amber-300 rounded-xl py-2 focus:outline-none focus:border-amber-500';
      inp.onkeydown=function(e){ if(e.key==='Enter') checkNum(); };
      box.appendChild(inp);
      if(cur.unit){ var u=document.createElement('span'); u.className='text-lg text-slate-500 font-semibold'; u.innerText=cur.unit; box.appendChild(u); }
      area.appendChild(box);
      var btn=document.createElement('button'); btn.innerHTML='Kiểm tra đáp án &#9989;';
      btn.className='mt-4 px-6 py-3 bg-amber-500 hover:bg-amber-600 text-amber-950 font-bold rounded-full btn-press shadow';
      btn.onclick=checkNum; area.appendChild(btn);
      setTimeout(function(){ try{inp.focus({preventScroll:true});}catch(e){} },40);
    } else {
      var grid=document.createElement('div'); grid.className='grid '+(cur.cot===1?'grid-cols-1 max-w-xs':'grid-cols-2 max-w-lg')+' gap-3 mx-auto';   /* cot:1 = lựa chọn dài, xếp một cột */
      cur.choices.forEach(function(ch,i){
        var b=document.createElement('button');
        b.innerHTML = cur.figFn ? cur.figFn(ch) : ch;
        b.className='px-2 py-3 bg-white border-2 border-amber-200 rounded-xl font-extrabold text-lg btn-press hover:bg-amber-50 flex items-center justify-center';
        b.onclick=function(){ checkMCQ(i,b); }; grid.appendChild(b);
      });
      area.appendChild(grid);
    }
    var nx=byId('btnNext');
    if(che==='tm'){ nx.innerHTML='Câu tiếp &#10145;&#65039;'; nx.style.visibility='hidden'; }   /* chỉ hiện sau khi đã trả lời (không bỏ qua câu khó) */
    else { nx.innerHTML='Câu khác &#128260;'; nx.style.visibility='visible'; }
  }

  function checkNum(){ var inp=byId('ans'); if(!inp||inp.value==='') return; var v=parseInt(inp.value,10); if(v===cur.ans) good(); else bad(String(v)); }
  function checkMCQ(i,b){ if(i===cur.correct){ b.classList.add('bg-emerald-100','border-emerald-400'); good(); } else { b.classList.add('bg-rose-100','border-rose-400'); bad(String(i)); } }
  function nhanLoi(key){ return (cur.sai && cur.sai[key]) || ''; }
  function loiGoiY(tag){ return (tag && ((cur.goiY && cur.goiY[tag]) || LOI_GOIY[tag])) || (cur.goiY && cur.goiY.chung) || ''; }

  function ghiNhan(ok, loi){
    if(!firstTry) return ''; firstTry=false;
    var tb = che==='tm' ? ghiNhanTM(ok, loi) : ghiNhanDang(ok, loi);
    updateProg(); capNhatLua();
    return tb;
  }
  function good(){
    if(finished) return;
    var tb=ghiNhan(true);
    score+=10; streak++; if(che!=='tm') sesCorrect++; updateHUD(); updateProg();
    try{ confetti({particleCount:60,spread:70,origin:{y:.6}}); }catch(e){}
    sGood(); if(tb) toast(tb); else milestone();
    byId('feedback').innerHTML='<span class="text-emerald-600">Chính xác! &#127881; (+10 &#11088;)</span>';
    byId('btnNext').style.visibility='hidden';
    if(che==='tm'){ setTimeout(tiepTM, 1000); return; }
    if(sesCorrect>=goal){ setTimeout(finishSession, 850); } else { setTimeout(nextQ, 1000); }
  }
  function bad(key){
    if(finished) return;
    var tag=nhanLoi(key), tb=ghiNhan(false, tag); if(tb) toast(tb);
    streak=0; sesMiss++; updateHUD(); sBad();
    var c=byId('card'); c.classList.remove('shake'); void c.offsetWidth; c.classList.add('shake');
    var gy=loiGoiY(tag);
    byId('feedback').innerHTML='<span class="text-rose-500">Chưa đúng. '+(gy||'Bé thử lại nhé! &#129300;')+'</span>'+(che==='tm'?'<div class="text-sm text-slate-500 font-semibold mt-1">Bé có thể làm lại, hoặc bấm «Câu tiếp».</div>':'');
    byId('btnNext').style.visibility='visible';
  }
  function milestone(){ if(streak===3||streak===5||streak===10||(streak>10&&streak%10===0)) toast('&#9889; Chuỗi '+streak+' câu đúng liền! Giỏi quá!'); }
  /* Khoá chiều cao thẻ: chỉ tăng, không co lại trong một dạng -> khung đứng yên khi làm bài */
  function lockHeight(){ var c=byId('card'); if(!c) return; c.style.minHeight='0px'; var nat=c.offsetHeight; var grew=nat>tabMaxH; if(grew) tabMaxH=nat; c.style.minHeight=tabMaxH+'px'; if(fitOn && grew) refit(); }
  function nextQ(){
    if(finished) return;
    if(che==='tm'){ var ch=chonCauTM(); topic=ch.dang; cur=topics[topic].make(ch.lv, ch.mt); cur._lv=ch.lv; cur._mt=cur.mt||ch.mt; }
    else { cur=topics[topic].make(lv, (topics[topic].mt||[])[0]); cur._lv=lv; cur._mt=cur.mt||(topics[topic].mt||[])[0]; }
    if(topic!==dangTruoc){ tabMaxH=0; dangTruoc=topic; }   /* đổi dạng: thả khoá chiều cao */
    firstTry=true; qT0=Date.now(); render(); capNhatLua(); lockHeight();
    var c=byId('card'); c.classList.remove('pop'); void c.offsetWidth; c.classList.add('pop');
  }

  /* ----- Kết thúc: chế độ Chọn dạng ----- */
  function capNhatTong(){ if(SMART) return; var ds=Object.keys(PROG.muc).map(function(k){ return PROG.muc[k]; }); if(ds.length) PROG.tong={dat:trungVi(ds), d:Date.now()}; }
  function finishSession(){
    finished=true;
    var st=starsFor(sesMiss), best=PROG.stars[topic]||0;
    if(st>best) PROG.stars[topic]=st;
    var ev=danhGia(sesLog), truoc=PROG.muc[topic]||0;
    if(ev.dat>truoc) PROG.muc[topic]=ev.dat;
    PROG.lich[topic]=(PROG.lich[topic]||[]).concat([{d:Date.now(), dat:ev.dat, dung:ev.dung, tong:ev.tong}]).slice(-10);
    capNhatTong(); save(PKEY,PROG);
    buildTabs(); sWin();
    try{ confetti({particleCount:160,spread:100,origin:{y:.5}}); }catch(e){}
    showEnd(st, ev, truoc);
  }
  function khoiDanhGia(ev, truoc){
    var tp=topics[topic], L=nLv(), h='';
    h+='<div class="flex items-center gap-3 rounded-2xl border-2 p-3 mb-2 text-left '+MUC_MAU[ev.dat]+'">'+lua(ev.dat, 64)
      +'<div><div class="text-xs font-bold">Cấp độ tư duy ở dạng này</div><div class="text-xl font-extrabold">'+(ev.dat?'Mức '+ev.dat+' · '+MUC_TEN[ev.dat]:MUC_TEN[0])+'</div>'
      +'<div class="text-sm font-medium mt-1">'+MUC_MOTA[ev.dat]+'</div></div></div>';
    h+='<div class="text-left mb-2 px-1">';
    for(var l=1;l<=L;l++){ var tt = ev.n[l] ? ('đúng ngay '+ev.k[l]+'/'+ev.n[l]+' câu') : 'chưa làm tới';
      h+='<div class="flex justify-between gap-2 text-sm py-0.5"><span class="font-bold text-slate-700">Mức '+l+' · '+MUC_TEN[l]+'</span><span class="text-slate-600">'+tt+'</span></div>'; }
    h+='</div>';
    var ke = ev.dat>=L ? 'Tuyệt vời! Bé đã làm chủ dạng này — thử các hoạt động khác nhé.'
      : ('Bước tiếp theo — Mức '+(ev.dat+1)+': '+((tp.muc && tp.muc[ev.dat]) ? tp.muc[ev.dat] : MUC_MOTA[ev.dat+1]));
    h+='<div class="text-sm text-slate-600 text-left px-1 mb-1">'+ke+'</div>';
    if(truoc>ev.dat) h+='<div class="text-sm text-slate-600 text-left px-1 mb-1">Bé từng đạt Mức '+truoc+' ở dạng này — cố lên nhé!</div>';
    h+='<div class="text-xs text-slate-500 text-left px-1 mb-4">Trung bình '+ev.giay+' giây một câu · chỉ tính lần trả lời đầu của mỗi câu.</div>';
    return h;
  }
  function showEnd(st, ev, truoc){
    var praise = st>=3 ? 'Tuyệt vời!' : (st>=2 ? 'Làm tốt lắm!' : 'Hoàn thành rồi!');
    var e=byId('endscreen');
    var h='<div class="bg-white rounded-3xl shadow-2xl border-2 border-amber-200 max-w-sm w-full p-6 text-center end-in m-auto">';
    h+='<div class="text-lg font-extrabold text-orange-700 mb-1">'+topics[topic].name+'</div>';
    h+='<div class="mb-2">'+starRow(st,true)+'</div>';
    h+='<div class="text-2xl font-extrabold text-slate-700 mb-1">'+praise+'</div>';
    h+='<div class="text-slate-500 text-sm mb-4">Bé làm đúng '+goal+' câu'+(sesMiss>0?(', sai '+sesMiss+' lần'):' liền một mạch')+'.</div>';
    h+=khoiDanhGia(ev || danhGia(sesLog), truoc||0);
    h+='<div class="flex flex-col gap-2">';
    h+='<button id="btnAgain" class="px-5 py-3 bg-amber-500 hover:bg-amber-600 text-amber-950 font-bold rounded-full btn-press shadow">Chơi lại &#128260;</button>';
    h+='<button id="btnOther" class="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold rounded-xl border border-slate-200 btn-press">'+(SMART?'&#10024; Luyện thông minh':'Chọn hoạt động khác')+'</button>';
    h+='<a href="index.html" class="px-5 py-2.5 bg-white hover:bg-slate-50 text-slate-500 font-bold rounded-xl border border-slate-200 btn-press">&#127968; Về sảnh chính</a>';
    h+='</div></div>';
    e.innerHTML=h; e.classList.remove('hidden');
    byId('btnAgain').onclick=function(){ setTopic(topic); };
    byId('btnOther').onclick=function(){ if(SMART) batDauTM(); else { hideEnd(); toast('Bé chọn một hoạt động ở trên nhé!'); } };
  }

  /* ----- Kết thúc: Luyện thông minh — ngọn lửa lớn + bản đồ mục tiêu ----- */
  function finishTM(){
    finished=true;
    var u=uocLuongTM(T.log), ban={};
    MTS.forEach(function(m){ var d=u.mt[m.id].dat; ban[m.id]=d; PROG.mtLan[m.id]=d; if(d>(PROG.mt[m.id]||0)) PROG.mt[m.id]=d; });
    PROG.tong={dat:u.tong, d:Date.now()};
    PROG.lichTM=(PROG.lichTM||[]).concat([{d:Date.now(), tong:u.tong, mt:ban, dung:T.log.filter(function(e){ return e.ok; }).length, cau:T.log.length}]).slice(-10);
    save(PKEY,PROG);
    sWin(); try{ confetti({particleCount:160,spread:100,origin:{y:.5}}); }catch(e){}
    showEndTM(u);
  }
  function thongKeLoi(log){ var c={}; log.forEach(function(e){ if(!e.ok && e.loi) c[e.loi]=(c[e.loi]||0)+1; }); return Object.keys(c).map(function(k){ return {k:k, n:c[k]}; }).sort(function(a,b){ return b.n-a.n; }); }
  function banDoMT(dsMuc, px){
    var h='<div class="grid gap-2 mb-3" style="grid-template-columns:repeat('+Math.min(MTS.length,5)+',minmax(0,1fr))">';
    MTS.forEach(function(m){ var d=dsMuc[m.id]||0;
      h+='<div class="flex flex-col items-center text-center" title="'+m.ten+': '+(d?'Mức '+d+' · ':'')+MUC_TEN[d]+'">'+lua(d, px)
        +'<div class="text-xs font-extrabold text-slate-700 leading-tight mt-1">'+m.ten+'</div><div class="text-xs text-slate-600">'+(d?'Mức '+d:'Làm quen')+'</div></div>'; });
    return h+'</div>';
  }
  function showEndTM(u){
    var e=byId('endscreen'), dung=T.log.filter(function(x){ return x.ok; }).length, ms=0; T.log.forEach(function(x){ ms+=x.ms; });
    var dsMuc={}; MTS.forEach(function(m){ dsMuc[m.id]=u.mt[m.id].dat; });
    var h='<div class="bg-white rounded-3xl shadow-2xl border-2 border-amber-200 max-w-md w-full p-5 text-center end-in m-auto">';
    h+='<div class="text-sm font-bold text-slate-500">Cấp độ tư duy · Bài '+BAI.n+'</div>';
    h+='<div class="flex justify-center my-2">'+lua(u.tong, 120, 'lua-song lua-bung')+'</div>';
    h+='<div class="text-2xl font-extrabold text-slate-700">'+(u.tong?'Mức '+u.tong+' · '+MUC_TEN[u.tong]:MUC_TEN[0])+'</div>';
    h+='<div class="text-sm text-slate-600 mb-3">'+MUC_MOTA[u.tong]+'</div>';
    h+=banDoMT(dsMuc, 40);
    var loi=thongKeLoi(T.log);
    if(loi.length) h+='<div class="text-sm text-left text-slate-600 mb-2"><b class="text-slate-700">Lỗi hay gặp:</b> '+loi.slice(0,3).map(function(x){ return (LOI_TEN[x.k]||x.k)+' ('+x.n+' lần)'; }).join('; ')+'.</div>';
    var yeu=MTS.slice().sort(function(a,b){ return dsMuc[a.id]-dsMuc[b.id]; })[0], dy=dsMuc[yeu.id];
    h+='<div class="text-sm text-left text-slate-600 mb-2">'+(dy>=3 ? 'Tuyệt vời! Bé đã vận dụng được mọi mục tiêu của bài này.'
      : '<b class="text-slate-700">Nên luyện thêm:</b> '+yeu.ten+' — Mức '+(dy+1)+': '+((yeu.muc && yeu.muc[dy]) ? yeu.muc[dy] : MUC_MOTA[dy+1]))+'</div>';
    h+='<div class="text-xs text-slate-500 text-left mb-4">Làm '+T.log.length+' câu, đúng ngay '+dung+' câu · trung bình '+(T.log.length?Math.round(ms/T.log.length/1000):0)+' giây một câu · chỉ tính lần trả lời đầu.</div>';
    h+='<div class="flex flex-col gap-2">';
    h+='<button id="btnAgain" class="px-5 py-3 bg-amber-500 hover:bg-amber-600 text-amber-950 font-bold rounded-full btn-press shadow">&#10024; Luyện lượt mới</button>';
    h+='<button id="btnOther" class="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold rounded-xl border border-slate-200 btn-press">&#128203; Chọn dạng để luyện riêng</button>';
    h+='<a href="index.html" class="px-5 py-2.5 bg-white hover:bg-slate-50 text-slate-500 font-bold rounded-xl border border-slate-200 btn-press">&#127968; Về sảnh chính</a>';
    h+='</div></div>';
    e.innerHTML=h; e.classList.remove('hidden');
    byId('btnAgain').onclick=batDauTM;
    byId('btnOther').onclick=function(){ setTopic(0); };
  }
  function hideEnd(){ var e=byId('endscreen'); e.classList.add('hidden'); e.innerHTML=''; }

  /* ----- Hồ sơ luyện tập của bài (📊) ----- */
  function openHoSo(){
    var h='<div class="flex items-center justify-between mb-2"><span class="font-extrabold text-slate-700">&#128202; Hồ sơ luyện tập · Bài '+BAI.n+'</span><button id="hoSoClose" class="text-slate-500 hover:text-slate-700 font-bold text-lg px-2 btn-press">&#10005;</button></div>';
    if(SMART){
      var ls=PROG.lichTM||[];
      if(ls.length){
        var t=PROG.tong ? PROG.tong.dat : 0;
        h+='<div class="flex items-center gap-3 rounded-2xl border-2 p-3 mb-3 '+MUC_MAU[t]+'">'+lua(t, 64)+'<div><div class="text-xs font-bold">Cấp độ tư duy · lượt gần nhất</div><div class="text-xl font-extrabold">'+(t?'Mức '+t+' · '+MUC_TEN[t]:MUC_TEN[0])+'</div><div class="text-sm font-medium">'+MUC_MOTA[t]+'</div></div></div>';
        h+='<div class="text-xs font-bold text-slate-500 mb-1">Từng mục tiêu (lượt gần nhất)</div>'+banDoMT(PROG.mtLan, 34);
        h+='<div class="text-sm text-slate-600 mb-3"><b class="text-slate-700">Các lượt gần đây:</b> '+ls.slice(-6).map(function(x){ return 'Mức '+x.tong; }).join(' → ')+' ('+ls.length+' lượt).</div>';
      } else h+='<div class="text-sm text-slate-600 mb-3">Bé chưa hoàn thành lượt «Luyện thông minh» nào ở bài này. Làm hết một lượt (khoảng '+TONG+' câu) để có đánh giá nhé!</div>';
    } else {
      var ds=[], can=[], rows='';
      topics.forEach(function(tp,i){
        var lich=PROG.lich[i]||[], m=PROG.muc[i]||0, st=PROG.stars[i]||0, coMuc=tp.levels>1;
        if(lich.length && coMuc){ ds.push(m); if(m<3) can.push({ten:tp.name, m:m}); }
        rows+='<div class="flex items-center justify-between gap-2 py-1.5 border-b border-slate-200"><span class="text-sm font-bold text-slate-700">'+tp.name+(st?' <span class="text-amber-400">'+new Array(st+1).join('★')+'</span>':'')+'</span>'
          +(lich.length ? '<span class="inline-flex items-end gap-1">'+lua(m, 22)+'<span class="text-xs text-slate-600">'+(m?'Mức '+m:'Làm quen')+'</span></span>' : '<span class="text-xs text-slate-500">chưa luyện</span>')+'</div>';
      });
      if(ds.length){ var chung=trungVi(ds);
        h+='<div class="flex items-center gap-3 rounded-2xl border-2 p-3 mb-3 '+MUC_MAU[chung]+'">'+lua(chung, 64)+'<div><div class="text-xs font-bold">Cấp độ tư duy trong bài (theo '+ds.length+' dạng đã luyện)</div><div class="text-xl font-extrabold">'+(chung?'Mức '+chung+' · '+MUC_TEN[chung]:MUC_TEN[0])+'</div><div class="text-sm font-medium">'+MUC_MOTA[chung]+'</div></div></div>';
      } else h+='<div class="text-sm text-slate-600 mb-3">Bé chưa hoàn thành hoạt động nào ở bài này. Làm đủ '+goal+' câu một hoạt động để có đánh giá nhé!</div>';
      h+='<div class="mb-3">'+rows+'</div>';
      if(can.length){ can.sort(function(a,b){ return a.m-b.m; }); h+='<div class="text-sm text-slate-600 mb-2"><b class="text-slate-700">Nên luyện thêm:</b> '+can.slice(0,3).map(function(c){ return c.ten; }).join(', ')+'.</div>'; }
    }
    h+='<div class="text-xs text-slate-500 mb-3">Ngọn lửa: xanh lá nhạt Đang làm quen · xanh lá Mức 1 Nhận biết · cam Mức 2 Hiểu · đỏ bùng Mức 3 Vận dụng (theo Thông tư 27/2020). Hồ sơ lưu trên máy này.</div>';
    h+='<button id="hoSoXoa" class="text-xs font-bold text-slate-600 px-3 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 btn-press">Xoá hồ sơ bài này (cho bạn khác dùng máy)</button>';
    byId('hoSoBox').innerHTML=h; byId('hoSoPanel').classList.remove('hidden');
    byId('hoSoClose').onclick=closeHoSo;
    byId('hoSoXoa').onclick=function(){ var ok=true; try{ ok=window.confirm('Xoá toàn bộ sao và mức của Bài '+BAI.n+' trên máy này?'); }catch(e){} if(!ok) return; PROG={}; chuanHoaProg(); save(PKEY,PROG); buildTabs(); openHoSo(); };
  }
  function closeHoSo(){ byId('hoSoPanel').classList.add('hidden'); }

  var toastT=null;
  function toast(msg){
    var t=byId('toast');
    t.innerHTML='<div class="toast-in bg-slate-800 text-white font-bold text-sm px-4 py-2 rounded-full shadow-lg">'+msg+'</div>';
    if(toastT) clearTimeout(toastT);
    toastT=setTimeout(function(){ t.innerHTML=''; }, 1800);
  }

  function toggleFit(){
    fitOn=!fitOn;
    var btn=byId('btnFull');
    if(fitOn){
      if(btn){ btn.classList.add('bg-amber-100','border-amber-300','text-amber-700'); btn.classList.remove('bg-white','text-slate-600'); }
      var d=document.documentElement;
      if(d.requestFullscreen){ try{ d.requestFullscreen(); }catch(e){} }
      refit();
    } else {
      if(btn){ btn.classList.remove('bg-amber-100','border-amber-300','text-amber-700'); btn.classList.add('bg-white','text-slate-600'); }
      try{ if(document.fullscreenElement && document.exitFullscreen) document.exitFullscreen(); }catch(e){}
      fitScale=1; applyZoom();
    }
  }
  function cycleTheme(){ CFG.theme=THEMES[(themeIdx()+1)%THEMES.length][0]; save('toanlop3-cfg',CFG); applyTheme(); toast('Giao diện: '+THEMES[themeIdx()][1]); }
  function toggleSound(){ CFG.sound=!CFG.sound; save('toanlop3-cfg',CFG); byId('btnSound').innerHTML=CFG.sound?'&#128266;':'&#128263;'; if(CFG.sound) sGood(); }

  var rzT=null;
  function onResize(){ if(!fitOn) return; if(rzT) clearTimeout(rzT); rzT=setTimeout(refit, 150); }
  function loadCounter(){ try{ if(document.getElementById('siteCounter')||window.__cnt) return; window.__cnt=1; var s=document.createElement('script'); s.src='counter.js'; s.async=true; document.body.appendChild(s); }catch(e){} }
  /* Cổng kiểm thử (chỉ khi URL có ?kiemthu=1): cho công cụ soát đọc trạng thái, đặt mức, mở màn kết thúc */
  function congKiemThu(){
    if(!/[?&]kiemthu=1/.test(location.search)) return;
    window.__ENG={ cur:function(){ return cur; }, che:function(){ return che; }, lv:function(){ return che==='tm' ? cur._lv : lv; }, nLv:nLv,
      log:function(){ return che==='tm' ? T.log : sesLog; }, T:function(){ return T; }, smart:SMART, mts:function(){ return (MTS||[]).map(function(m){ return m.id; }); },
      muc:mucHienTai, uocLuong:function(l){ return uocLuongTM(l); }, danhGia:danhGia,
      datMuc:function(l){ lv=Math.max(1,Math.min(nLv(),l)); upRun=0; downRun=0; nextQ(); return lv; },
      xong:function(log){ sesLog=log||sesLog; sesMiss=0; finishSession(); return danhGia(sesLog); },
      xongTM:function(log){ if(log) T.log=log; finishTM(); return uocLuongTM(T.log); },
      batDauTM:function(){ batDauTM(); return 1; }, chonDang:function(i){ setTopic(i); return 1; }, hoSo:openHoSo };
  }
  function start(){
    build(); applyDisplay(); updateHUD();
    if(SMART) batDauTM(); else setTopic(0);
    congKiemThu(); window.addEventListener('resize', onResize); document.addEventListener('fullscreenchange', function(){ if(fitOn) refit(); }); loadCounter();
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded', start); else start();
})();
