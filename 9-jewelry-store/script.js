const products = [
  {name:'Колье «Ледяная река»',desc:'Дорожка из огранённых камней',cat:'necklaces',price:48500,img:'p1'},
  {name:'Кольцо «Изумрудная грань»',desc:'Центральный камень эмеральд',cat:'rings',price:62000,img:'p2'},
  {name:'Кольцо «Овал в сиянии»',desc:'Овальный камень с паве',cat:'rings',price:74000,img:'p3'},
  {name:'Кольцо «Три мгновения»',desc:'Овал и два боковых камня',cat:'rings',price:58000,img:'p4'},
  {name:'Набор «Нежная капля»',desc:'Колье и серьги-капли',cat:'sets',price:19800,img:'p5'},
  {name:'Колье «Лавровый лист»',desc:'Листья из камней маркиз',cat:'necklaces',price:36900,img:'p6'},
  {name:'Серьги «Звёздная пыль»',desc:'Пусеты с россыпью камней',cat:'earrings',price:12400,img:'p7'},
  {name:'Кольцо «Радиант»',desc:'Прямоугольная огранка',cat:'rings',price:69000,img:'p8'}
];
const money = n => n.toLocaleString('ru-RU') + ' ₽';
const grid = document.getElementById('grid'), toast = document.getElementById('toast'), cartCount = document.getElementById('cartCount');
let filter = 'all', sort = 'def', count = 0, timer;
const say = t => { toast.textContent = t; toast.classList.add('show'); clearTimeout(timer); timer = setTimeout(() => toast.classList.remove('show'), 1800); };

function render(){
  let list = products.filter(p => filter === 'all' || p.cat === filter);
  if (sort === 'asc') list = [...list].sort((a,b) => a.price - b.price);
  if (sort === 'desc') list = [...list].sort((a,b) => b.price - a.price);
  grid.innerHTML = list.map(p => `
    <article class="card">
      <button class="heart" aria-label="В избранное">♥</button>
      <img src="images/${p.img}.jpg" alt="${p.name}">
      <h3>${p.name}</h3><p>${p.desc}</p>
      <div class="row"><span class="price">${money(p.price)}</span><button class="add" aria-label="В корзину" data-name="${p.name}">+</button></div>
    </article>`).join('');
}
render();

document.getElementById('filters').addEventListener('click', e => {
  const b = e.target.closest('.chip'); if (!b) return;
  document.querySelectorAll('.chip').forEach(c => c.classList.toggle('active', c === b));
  filter = b.dataset.f; render();
});
document.getElementById('sort').addEventListener('change', e => { sort = e.target.value; render(); });
grid.addEventListener('click', e => {
  const h = e.target.closest('.heart'), a = e.target.closest('.add');
  if (h) h.classList.toggle('on');
  if (a){ cartCount.textContent = ++count; say(`«${a.dataset.name}» в корзине`); }
});

// Размер кольца: российский размер = диаметр пальца в мм (шаг 0,5)
document.getElementById('circ').addEventListener('input', e => {
  const c = parseFloat(e.target.value), out = document.getElementById('sizeOut');
  if (!c || c < 40 || c > 80){ out.textContent = 'Введите от 40 до 80 мм'; return; }
  const d = c / Math.PI, size = Math.round(d * 2) / 2;
  out.textContent = `Ваш размер: ${size.toString().replace('.', ',')}`;
});
