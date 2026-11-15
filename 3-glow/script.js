(function(){
var bag=document.getElementById('bag'),n=0;
function upd(){bag.textContent='Корзина · '+n}
document.querySelectorAll('.pc').forEach(function(c){
 var h=c.querySelector('.heart'),a=c.querySelector('.add');
 h.onclick=function(){h.classList.toggle('on');h.textContent=h.classList.contains('on')?'♥':'♡'};
 a.onclick=function(){n++;upd();a.classList.add('on');a.textContent='✓';setTimeout(function(){a.classList.remove('on');a.textContent='+'},1100)};
});
var S=[['#f3d3c0','Porcelain','Очень светлая кожа с тёплым подтоном. Подойдёт кушон Pearl Glow в самом светлом оттенке.'],['#e8b898','Sand','Светлая кожа. Тональная основа All Day и румяна Velvet Rose в нежном персике.'],['#d09a72','Honey','Средний тон. Бронзер Sun Kiss и тёплый хайлайтер подчеркнут сияние.'],['#b87a54','Caramel','Тёплый загар. Кушон в оттенке карамели и золотистые румяна.'],['#8a5438','Mocha','Глубокий тон. Насыщенные румяна и кушон Bordeaux для яркого образа.'],['#5c3626','Espresso','Тёмная кожа. Бордовые и ягодные акценты, сияющий хайлайтер.']];
var sw=document.getElementById('sw'),orb=document.getElementById('orb'),nm=document.getElementById('shName'),ds=document.getElementById('shDesc');
S.forEach(function(s,i){var b=document.createElement('button');b.style.setProperty('--c',s[0]);b.setAttribute('aria-label',s[1]);b.onclick=function(){set(i)};sw.appendChild(b)});
function set(i){orb.style.setProperty('--tone',S[i][0]);nm.textContent=S[i][1];ds.textContent=S[i][2];[].forEach.call(sw.children,function(b,j){b.classList.toggle('on',j===i)})}
set(1);
var Q=document.querySelectorAll('.quotes blockquote'),D=document.querySelectorAll('.dots i'),q=0;
function show(i){q=i;Q.forEach(function(e,j){e.style.display=j===i?'block':'none'});D.forEach(function(e,j){e.classList.toggle('on',j===i)})}
show(0);setInterval(function(){show((q+1)%Q.length)},5000);
D.forEach(function(d,i){d.onclick=function(){show(i)}});
document.getElementById('nf').onsubmit=function(e){e.preventDefault();document.getElementById('nm').textContent='Спасибо! Мы пришлём вам подарок на первый заказ ✨';e.target.reset()};
})();
