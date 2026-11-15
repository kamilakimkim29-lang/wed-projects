(function(){
var cards=[].slice.call(document.querySelectorAll('.card')),chips=document.querySelectorAll('.chips button'),q=document.getElementById('q'),cat='all',empty=document.getElementById('empty');
function filter(){var t=q.value.trim().toLowerCase(),n=0;cards.forEach(function(c){var ok=(cat==='all'||c.dataset.cat===cat)&&c.textContent.toLowerCase().indexOf(t)>-1;c.style.display=ok?'':'none';if(ok)n++});empty.style.display=n?'none':'block'}
chips.forEach(function(b){b.onclick=function(){chips.forEach(function(x){x.classList.remove('on')});b.classList.add('on');cat=b.dataset.cat;filter()}});
q.oninput=filter;
var n=0,sum=0,cart=document.getElementById('cart'),toast=document.getElementById('toast'),tm;
cards.forEach(function(c){c.querySelector('.add').onclick=function(){n++;sum+=parseFloat(c.dataset.price);cart.textContent='Корзина · '+n;toast.textContent='✓ '+c.querySelector('h3').textContent+' добавлен. Итого: $'+sum;toast.classList.add('show');clearTimeout(tm);tm=setTimeout(function(){toast.classList.remove('show')},2200)}});
var pr=document.getElementById('pr'),prv=document.getElementById('prv'),mo=document.querySelectorAll('.mths button'),m=12,out=document.getElementById('out'),tot=document.getElementById('tot');
function calc(){prv.textContent='$'+pr.value;out.textContent='$'+Math.ceil(pr.value/m);tot.textContent='на '+m+' мес. · переплата 0%'}
pr.oninput=calc;mo.forEach(function(b){b.onclick=function(){mo.forEach(function(x){x.classList.remove('on')});b.classList.add('on');m=+b.dataset.m;calc()}});calc();
})();
