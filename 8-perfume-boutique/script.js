const products = [
  {id:1,name:'Розовый шёлк',notes:'Пион, мускус, белый кедр',cat:'women',price:8900,img:'p1',mood:'soft'},
  {id:2,name:'Розовое облако',notes:'Роза, ваниль, пудровые ноты',cat:'women',price:9400,img:'p2',mood:'soft'},
  {id:3,name:'Бант и пион',notes:'Пион, жасмин, лимон',cat:'gift',price:10500,img:'p3',mood:'bright'},
  {id:4,name:'Золотой час',notes:'Мандарин, ирис, амбра',cat:'women',price:9900,img:'p4',mood:'warm'},
  {id:5,name:'Чёрная орхидея',notes:'Кофе, белые цветы, пачули',cat:'unisex',price:11200,img:'p5',mood:'mystic'},
  {id:6,name:'Алмазная роза',notes:'Груша, роза, тёплая ваниль',cat:'gift',price:10900,img:'p6',mood:'warm'},
  {id:7,name:'Рубиновая ваниль',notes:'Вишня, ваниль, сандал',cat:'unisex',price:12800,img:'p7',mood:'mystic'},
  {id:8,name:'Пудровый дым',notes:'Роза, шафран, ветивер',cat:'unisex',price:13500,img:'p8',mood:'bright'}
];
const money = n => n.toLocaleString('ru-RU') + ' ₽';
const grid = document.getElementById('grid');
const toast = document.getElementById('toast');
const cartCount = document.getElementById('cartCount');
let count = 0, timer;

function say(t){ toast.textContent = t; toast.classList.add('show'); clearTimeout(timer); timer = setTimeout(() => toast.classList.remove('show'), 1800); }

function render(f = 'all'){
  grid.innerHTML = products.filter(p => f === 'all' || p.cat === f).map(p => `
    <article class="card">
      <button class="heart" aria-label="В избранное">♥</button>
      <img src="images/${p.img}.jpg" alt="${p.name}">
      <h3>${p.name}</h3><p>${p.notes}</p>
      <div class="row"><span class="price">${money(p.price)}</span><button class="add" aria-label="В корзину" data-name="${p.name}">+</button></div>
    </article>`).join('');
}
render();

document.getElementById('filters').addEventListener('click', e => {
  const b = e.target.closest('.chip'); if (!b) return;
  document.querySelectorAll('.chip').forEach(c => c.classList.toggle('active', c === b));
  render(b.dataset.f);
});
grid.addEventListener('click', e => {
  const h = e.target.closest('.heart'), a = e.target.closest('.add');
  if (h) h.classList.toggle('on');
  if (a){ cartCount.textContent = ++count; say(`«${a.dataset.name}» в корзине`); }
});

// Подбор аромата
document.getElementById('moods').addEventListener('click', e => {
  const b = e.target.closest('button'); if (!b) return;
  document.querySelectorAll('#moods button').forEach(x => x.classList.toggle('on', x === b));
  const list = products.filter(p => p.mood === b.dataset.m);
  const p = list[Math.floor(Math.random() * list.length)];
  document.getElementById('result').innerHTML = `
    <div><img src="images/${p.img}.jpg" alt="${p.name}"><h3>${p.name}</h3><p>${p.notes}</p>
    <p class="price">${money(p.price)}</p><a href="#catalog" class="btn" style="margin-top:12px">В каталог</a></div>`;
});
