(function(){
var t=document.getElementById('track');
document.getElementById('next').onclick=function(){t.scrollBy({left:290,behavior:'smooth'})};
document.getElementById('prev').onclick=function(){t.scrollBy({left:-290,behavior:'smooth'})};
var count=0,sum=0,cart=document.getElementById('cart');
document.querySelectorAll('.add').forEach(function(b){
 b.onclick=function(){
  count++;sum+=parseFloat(b.dataset.price);
  cart.textContent='🛍 '+count+' · $'+sum.toFixed(2);
  b.classList.add('ok');b.textContent='Добавлено ✓';
  setTimeout(function(){b.classList.remove('ok');b.textContent='В корзину'},1200);
 };
});
})();
