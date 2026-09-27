/* engine.js — Engine v2 DÙNG CHUNG cho mọi bài luyện Toán tiểu học.
   Đọc biến toàn cục BAI = { n, title, sub, goal, topics:[{name, sec, make, check?}] }
   và dựng TOÀN BỘ giao diện + chấm điểm + game layer (mục tiêu buổi, thanh tiến trình,
   màn kết thúc chấm sao, mốc streak, âm thanh, lưu tiến trình localStorage) + nút
   Hiển thị (chọn cỡ chữ + loại thiết bị).
   QUY TẮC: nối chuỗi, KHÔNG backtick và KHÔNG template literal (để chèn được editor GitHub). */
(function(){
  var BAI = window.BAI || { n:0, title:'', topics:[] };
  var topics = BAI.topics || [];
  var goal = BAI.goal || 10;

  function load(k,d){ try{ var v=localStorage.getItem(k); return v?JSON.parse(v):d; }catch(e){ return d; } }
  function save(k,v){ try{ localStorage.setItem(k, JSON.stringify(v)); }catch(e){} }
  var CFG = load('toanlop3-cfg', {sound:true});
  if(CFG.sound===undefined) CFG.sound=true;
  if(!CFG.size) CFG.size='md';
  if(!CFG.device) CFG.device='auto';
  var PKEY = 'toanlop3-bai-'+BAI.n;
  var PROG = load(PKEY, {stars:{}});

  var score=0, streak=0, topic=0, cur=null;
  var sesCorrect=0, sesMiss=0, finished=false;
  var tabMaxH=0;  /* khoá chiều cao thẻ theo câu cao nhất của tab (chống nhảy khung) */
  var fitOn=false, fitScale=1;  /* Vừa màn hình: co bằng CSS cho lọt một màn hình thiết bị */

  function byId(x){ return document.getElementById(x); }

  /* ----- Âm thanh tổng hợp (Web Audio, không cần file) ----- */
  var actx=null;
  function ac(){ if(!actx){ try{ actx=new (window.AudioContext||window.webkitAudioContext)(); }catch(e){ actx=null; } } return actx; }
  function tone(f,t0,dur,type,gain){ if(!CFG.sound) return; var c=ac(); if(!c) return; try{ var o=c.createOscillator(), g=c.createGain(); o.type=type||'sine'; o.frequency.value=f; o.connect(g); g.connect(c.destination); var t=c.currentTime+t0; g.gain.setValueAtTime(gain||0.08,t); g.gain.exponentialRampToValueAtTime(0.0001,t+dur); o.start(t); o.stop(t+dur); }catch(e){} }
  function sGood(){ tone(660,0,0.13,'sine',0.09); tone(990,0.10,0.15,'sine',0.09); }
  function sBad(){ tone(160,0,0.25,'square',0.05); }
  function sWin(){ var a=[523,659,784,1047]; for(var i=0;i<a.length;i++) tone(a[i], i*0.13, 0.22, 'triangle', 0.08); }

  /* ----- Chấm sao theo số lần sai trong buổi ----- */
  function starsFor(miss){ var t3=Math.max(1,Math.round(goal*0.15)); var t2=Math.max(t3+1,Math.round(goal*0.5)); if(miss<=t3) return 3; if(miss<=t2) return 2; return 1; }
  function starRow(n, big){ var sz=big?'text-4xl md:text-5xl':'text-base'; var s=''; for(var i=0;i<3;i++){ s+='<span class="'+sz+' '+(i<n?'text-amber-400':'text-slate-300')+(big?' star-pop':'')+'" style="animation-delay:'+(i*0.15)+'s">&#9733;</span>'; } return s; }

  /* ----- Dựng khung giao diện ----- */
  function build(){
    var h='';
    h+='<div id="appwrap" class="w-full flex-grow flex flex-col" style="margin:0 auto">';
    h+= '<div class="w-full mb-3 flex justify-between items-center gap-2">';
    h+=  '<div class="flex flex-wrap gap-2">';
    h+=   '<a href="index.html" class="bg-white text-slate-600 px-3 py-2 rounded-xl shadow-sm border border-slate-200 hover:bg-slate-50 btn-press font-semibold text-sm">&#127968; Sảnh chính</a>';
    h+=   '<button id="btnFull" title="Vừa màn hình" class="bg-white text-slate-600 px-3 py-2 rounded-xl shadow-sm border border-slate-200 hover:bg-slate-50 btn-press font-semibold text-sm">&#128306; Vừa màn hình</button>';
    h+=   '<button id="btnDisp" title="Hiển thị" class="bg-white text-slate-600 px-3 py-2 rounded-xl shadow-sm border border-slate-200 hover:bg-slate-50 btn-press font-semibold text-sm">&#128421;</button>';
    h+=   '<button id="btnSound" title="Âm thanh" class="bg-white text-slate-600 px-3 py-2 rounded-xl shadow-sm border border-slate-200 hover:bg-slate-50 btn-press font-semibold text-sm">'+(CFG.sound?'&#128266;':'&#128263;')+'</button>';
    h+=  '</div>';
    h+=  '<div class="bg-white px-4 py-2 rounded-xl shadow-sm border border-slate-200 flex items-center gap-4 font-bold shrink-0">';
    h+=   '<span class="text-amber-500">&#11088; <span id="score">0</span></span>';
    h+=   '<span class="text-orange-500">&#128293; <span id="streak">0</span></span>';
    h+=  '</div>';
    h+= '</div>';
    h+= '<div class="w-full bg-white rounded-3xl shadow-xl border border-amber-100 overflow-hidden flex-grow flex flex-col">';
    h+=  '<div class="bg-gradient-to-r from-amber-500 to-orange-600 text-white p-4 md:p-5 text-center">';
    h+=   '<h1 class="text-xl md:text-3xl font-extrabold tracking-wide">Bài '+BAI.n+': '+BAI.title+'</h1>';
    h+=   '<p class="text-amber-100 text-sm md:text-base mt-1">'+(BAI.sub||'Bé chọn một hoạt động rồi luyện tập nhé!')+'</p>';
    h+=  '</div>';
    h+=  '<div id="tabs" class="flex flex-wrap bg-slate-100 border-b border-slate-200"></div>';
    h+=  '<div class="px-4 md:px-6 pt-3">';
    h+=   '<div class="flex items-center gap-2">';
    h+=    '<span class="text-xs font-bold text-slate-400 whitespace-nowrap">Mục tiêu</span>';
    h+=    '<div class="flex-grow h-3 bg-slate-100 rounded-full overflow-hidden border border-slate-200"><div id="progbar" class="h-full bg-gradient-to-r from-emerald-400 to-emerald-500 transition-all duration-300" style="width:0%"></div></div>';
    h+=    '<span class="text-xs font-bold text-emerald-600 whitespace-nowrap"><span id="sesC">0</span>/'+goal+'</span>';
    h+=   '</div>';
    h+=  '</div>';
    h+=  '<div class="p-4 md:p-6 flex-grow flex flex-col items-center justify-start">';
    h+=   '<div id="secname" class="text-orange-600 font-extrabold text-sm mb-2"></div>';
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
    h+=  '<div class="text-xs font-bold text-slate-400 mb-1">Cỡ chữ</div>';
    h+=  '<div id="sizeRow" class="grid grid-cols-3 gap-1 mb-3"></div>';
    h+=  '<div class="text-xs font-bold text-slate-400 mb-1">Thiết bị</div>';
    h+=  '<div id="deviceRow" class="grid grid-cols-2 gap-1"></div>';
    h+= '</div>';
    h+='</div>';
    h+='<div id="toast" class="fixed top-4 left-1/2 -translate-x-1/2 z-50 pointer-events-none"></div>';
    h+='<div id="endscreen" class="hidden fixed inset-0 z-40 bg-slate-900/50 flex items-center justify-center p-4"></div>';
    document.body.innerHTML=h;
    byId('btnFull').onclick=toggleFit;
    byId('btnSound').onclick=toggleSound;
    byId('btnNext').onclick=nextQ;
    byId('btnDisp').onclick=function(){ buildDispPanel(); byId('dispPanel').classList.remove('hidden'); };
    byId('dispClose').onclick=closeDisp;
    byId('dispBackdrop').onclick=closeDisp;
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
  function seg(k,v,label){ var on=CFG[k]===v; return '<button data-k="'+k+'" data-v="'+v+'" class="w-full px-2 py-1.5 rounded-lg text-xs font-bold border btn-press '+(on?'bg-amber-500 text-white border-amber-500':'bg-white text-slate-600 border-slate-200 hover:bg-slate-50')+'">'+label+'</button>'; }
  function buildDispPanel(){
    var sizes=[['sm','Nhỏ'],['md','Vừa'],['lg','Lớn']];
    var devs=[['auto','Tự động'],['phone','Điện thoại'],['tablet','Máy tính bảng'],['desktop','Máy tính']];
    byId('sizeRow').innerHTML = sizes.map(function(s){ return seg('size', s[0], s[1]); }).join('');
    byId('deviceRow').innerHTML = devs.map(function(d){ return seg('device', d[0], d[1]); }).join('');
    Array.prototype.forEach.call(document.querySelectorAll('#dispPanel [data-k]'), function(b){
      b.onclick=function(){ CFG[b.getAttribute('data-k')]=b.getAttribute('data-v'); save('toanlop3-cfg',CFG); applyDisplay(); buildDispPanel(); };
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
      b.className='flex-1 basis-1/3 py-2.5 px-2 text-xs md:text-sm font-bold border-b-4 whitespace-nowrap '+(i===topic?'text-orange-700 bg-white border-orange-500':'text-slate-400 bg-slate-100 border-transparent hover:bg-slate-200');
      b.onclick=function(){ setTopic(i); };
      t.appendChild(b);
    });
  }

  function updateHUD(){ byId('score').innerText=score; byId('streak').innerText=streak; }
  function updateProg(){ byId('sesC').innerText=sesCorrect; byId('progbar').style.width=Math.min(100,Math.round(sesCorrect/goal*100))+'%'; }

  function setTopic(i){ topic=i; sesCorrect=0; sesMiss=0; finished=false; tabMaxH=0; hideEnd(); buildTabs(); updateProg(); nextQ(); }

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
      btn.className='mt-4 px-6 py-3 bg-amber-500 hover:bg-amber-600 text-white font-bold rounded-full btn-press shadow';
      btn.onclick=checkNum; area.appendChild(btn);
      setTimeout(function(){ try{inp.focus({preventScroll:true});}catch(e){} },40);
    } else {
      var grid=document.createElement('div'); grid.className='grid grid-cols-2 gap-3 max-w-lg mx-auto';
      cur.choices.forEach(function(ch,i){
        var b=document.createElement('button');
        b.innerHTML = cur.figFn ? cur.figFn(ch) : ch;
        b.className='px-2 py-3 bg-white border-2 border-amber-200 rounded-xl font-extrabold text-lg btn-press hover:bg-amber-50 flex items-center justify-center';
        b.onclick=function(){ checkMCQ(i,b); }; grid.appendChild(b);
      });
      area.appendChild(grid);
    }
  }

  function checkNum(){ var inp=byId('ans'); if(!inp||inp.value==='') return; if(parseInt(inp.value,10)===cur.ans) good(); else bad('Chưa đúng, bé thử lại nhé! &#129300;'); }
  function checkMCQ(i,b){ if(i===cur.correct){ b.classList.add('bg-emerald-100','border-emerald-400'); good(); } else { b.classList.add('bg-rose-100','border-rose-400'); bad('Chưa đúng rồi! &#129300;'); } }

  function good(){
    if(finished) return;
    score+=10; streak++; sesCorrect++; updateHUD(); updateProg();
    try{ confetti({particleCount:60,spread:70,origin:{y:.6}}); }catch(e){}
    sGood(); milestone();
    byId('feedback').innerHTML='<span class="text-emerald-600">Chính xác! &#127881; (+10 &#11088;)</span>';
    if(sesCorrect>=goal){ setTimeout(finishSession, 850); } else { setTimeout(nextQ, 1000); }
  }
  function bad(msg){ streak=0; sesMiss++; updateHUD(); sBad(); var c=byId('card'); c.classList.remove('shake'); void c.offsetWidth; c.classList.add('shake'); byId('feedback').innerHTML='<span class="text-rose-500">'+msg+'</span>'; }
  function milestone(){ if(streak===3||streak===5||streak===10||(streak>10&&streak%10===0)) toast('&#128293; Chuỗi '+streak+'! Giỏi quá!'); }
  /* Khoá chiều cao thẻ: chỉ tăng, không co lại trong một tab -> khung đứng yên khi làm bài */
  function lockHeight(){ var c=byId('card'); if(!c) return; c.style.minHeight='0px'; var nat=c.offsetHeight; var grew=nat>tabMaxH; if(grew) tabMaxH=nat; c.style.minHeight=tabMaxH+'px'; if(fitOn && grew) refit(); }
  function nextQ(){ if(finished) return; cur=topics[topic].make(); render(); lockHeight(); var c=byId('card'); c.classList.remove('pop'); void c.offsetWidth; c.classList.add('pop'); }

  function finishSession(){
    finished=true;
    var st=starsFor(sesMiss);
    var best=PROG.stars[topic]||0;
    if(st>best){ PROG.stars[topic]=st; save(PKEY,PROG); }
    buildTabs();
    sWin();
    try{ confetti({particleCount:160,spread:100,origin:{y:.5}}); }catch(e){}
    showEnd(st);
  }

  function showEnd(st){
    var praise = st>=3 ? 'Tuyệt vời!' : (st>=2 ? 'Làm tốt lắm!' : 'Hoàn thành rồi!');
    var e=byId('endscreen');
    var h='<div class="bg-white rounded-3xl shadow-2xl border-2 border-amber-200 max-w-sm w-full p-6 text-center end-in">';
    h+='<div class="text-lg font-extrabold text-orange-600 mb-1">'+topics[topic].name+'</div>';
    h+='<div class="mb-2">'+starRow(st,true)+'</div>';
    h+='<div class="text-2xl font-extrabold text-slate-700 mb-1">'+praise+'</div>';
    h+='<div class="text-slate-500 text-sm mb-5">Bé làm đúng '+goal+' câu'+(sesMiss>0?(', sai '+sesMiss+' lần'):' liền một mạch'+'')+'.</div>';
    h+='<div class="flex flex-col gap-2">';
    h+='<button id="btnAgain" class="px-5 py-3 bg-amber-500 hover:bg-amber-600 text-white font-bold rounded-full btn-press shadow">Chơi lại &#128260;</button>';
    h+='<button id="btnOther" class="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold rounded-xl border border-slate-200 btn-press">Chọn hoạt động khác</button>';
    h+='<a href="index.html" class="px-5 py-2.5 bg-white hover:bg-slate-50 text-slate-500 font-bold rounded-xl border border-slate-200 btn-press">&#127968; Về sảnh chính</a>';
    h+='</div></div>';
    e.innerHTML=h; e.classList.remove('hidden');
    byId('btnAgain').onclick=function(){ setTopic(topic); };
    byId('btnOther').onclick=function(){ hideEnd(); toast('Bé chọn một hoạt động ở trên nhé!'); };
  }
  function hideEnd(){ var e=byId('endscreen'); e.classList.add('hidden'); e.innerHTML=''; }

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
  function toggleSound(){ CFG.sound=!CFG.sound; save('toanlop3-cfg',CFG); byId('btnSound').innerHTML=CFG.sound?'&#128266;':'&#128263;'; if(CFG.sound) sGood(); }

  var rzT=null;
  function onResize(){ if(!fitOn) return; if(rzT) clearTimeout(rzT); rzT=setTimeout(refit, 150); }
  function loadCounter(){ try{ if(document.getElementById('siteCounter')||window.__cnt) return; window.__cnt=1; var s=document.createElement('script'); s.src='counter.js'; s.async=true; document.body.appendChild(s); }catch(e){} }
  function start(){ build(); applyDisplay(); updateHUD(); setTopic(0); window.addEventListener('resize', onResize); document.addEventListener('fullscreenchange', function(){ if(fitOn) refit(); }); loadCounter(); }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded', start); else start();
})();
