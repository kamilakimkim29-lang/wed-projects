const books = [
  {t:'Le Prince cruel',a:'Holly Black',cat:'fantasy',price:890,img:'b1'},
  {t:'The Prison Healer',a:'Lynette Noni',cat:'fantasy',price:950,img:'b2'},
  {t:'Dance of Thieves',a:'Mary E. Pearson',cat:'fantasy',price:920,img:'b3'},
  {t:'Fourth Wing',a:'Rebecca Yarros',cat:'fantasy',price:1190,img:'b4'},
  {t:'La Chasseuse et l’Alchimiste',a:'Allison Saft',cat:'fantasy',price:980,img:'b5'},
  {t:'Il était une fois un cœur brisé',a:'Stephanie Garber',cat:'romance',price:1050,img:'b6'},
  {t:'Caraval',a:'Stephanie Garber',cat:'romance',price:880,img:'b7'},
  {t:'Unearthly',a:'Cynthia Hand',cat:'romance',price:990,img:'b8'},
  {t:'Hallowed',a:'Cynthia Hand',cat:'romance',price:990,img:'b9'},
  {t:'Война и мир. Том 1',a:'Л. Н. Толстой',cat:'classic',price:420,img:'b10'},
  {t:'Скотный двор',a:'Джордж Оруэлл',cat:'classic',price:350,img:'b11'},
  {t:'Идиот',a:'Ф. М. Достоевский',cat:'classic',price:390,img:'b12'}
];
const money = n => n.toLocaleString('ru-RU') + ' ₽';
const grid = document.getElementById('grid'), empty = document.getElementById('empty'), toast = document.getElementById('toast'), cartCount = document.getElementById('cartCount'), search = document.getElementById('search');
let filter = 'all', count = 0, timer;
const say = t => { toast.textContent = t; toast.classList.add('show'); clearTimeout(timer); timer = setTimeout(() => toast.classList.remove('show'), 1800); };

function render(){
  const q = search.value.trim().toLowerCase();
  const list = books.filter(b => (filter === 'all' || b.cat === filter) && (b.t + ' ' + b.a).toLowerCase().includes(q));
  empty.hidden = list.length > 0;
  grid.innerHTML = list.map(b => `
    <article class="card">
      <button class="heart" aria-label="В избранное">♥</button>
      <img src="images/${b.img}.jpg" alt="Обложка: ${b.t}" loading="lazy">
      <h3>${b.t}</h3><p>${b.a}</p>
      <div class="row"><span class="price">${money(b.price)}</span><button class="add" aria-label="В корзину" data-name="${b.t}">+</button></div>
    </article>`).join('');
}
render();

function setFilter(f){
  filter = f;
  document.querySelectorAll('.chip').forEach(c => c.classList.toggle('active', c.dataset.f === f));
  render();
}
document.getElementById('filters').addEventListener('click', e => { const b = e.target.closest('.chip'); if (b) setFilter(b.dataset.f); });
document.getElementById('toClassic').addEventListener('click', () => setFilter('classic'));
search.addEventListener('input', render);
grid.addEventListener('click', e => {
  const h = e.target.closest('.heart'), a = e.target.closest('.add');
  if (h) h.classList.toggle('on');
  if (a){ cartCount.textContent = ++count; say(`«${a.dataset.name}» в корзине`); }
});
document.getElementById('monthBtn').addEventListener('click', () => { cartCount.textContent = ++count; say('Комплект «Cynthia Hand» в корзине'); });

// Подписка: простая проверка e-mail
document.getElementById('newsForm').addEventListener('submit', e => {
  e.preventDefault();
  const v = document.getElementById('email').value.trim(), hint = document.getElementById('hint');
  const ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
  hint.className = 'hint ' + (ok ? 'ok' : 'err');
  hint.textContent = ok ? 'Готово! Промокод придёт на почту.' : 'Проверьте адрес: нужен вид name@mail.com';
  if (ok) e.target.reset();
});
