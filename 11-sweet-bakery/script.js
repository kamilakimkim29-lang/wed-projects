const items = [
  {n:'Круассан с шоколадными каплями',d:'Кремовая начинка и тёмный шоколад',cat:'croissant',p:320,img:'c1'},
  {n:'Круассан «Орео»',d:'Крем с печеньем и шоколадные нити',cat:'croissant',p:340,img:'c2'},
  {n:'Круассан черничный',d:'Ягодный крем и ягодный соус',cat:'croissant',p:350,img:'c3'},
  {n:'Круассан фисташковый',d:'Фисташковый крем и орехи',cat:'croissant',p:390,img:'c4'},
  {n:'Макарон клубничный',d:'Нежный крем и ягодная начинка',cat:'macaron',p:160,img:'m1'},
  {n:'Макарон фисташковый',d:'Зелёная скорлупа и сливочный крем',cat:'macaron',p:160,img:'m2'},
  {n:'Лимонный десерт',d:'Цитрусовый вкус и маковая крошка',cat:'macaron',p:210,img:'m3'},
  {n:'Клубничный кусочек',d:'Бисквит, крем и свежая клубника',cat:'dessert',p:290,img:'k1'},
  {n:'Красный бархат',d:'Мини-торт со сливочным кремом',cat:'dessert',p:420,img:'k2'},
  {n:'Десерт с клубникой',d:'Воздушный мусс и ягода сверху',cat:'dessert',p:310,img:'k3'},
  {n:'Капкейк ванильный',d:'Ванильный кекс и кремовая шапка',cat:'cupcake',p:190,img:'u1'},
  {n:'Капкейк лимонный',d:'Мягкий кекс с цедрой лимона',cat:'cupcake',p:180,img:'u2'}
];
const money = n => n.toLocaleString('ru-RU') + ' ₽';
const grid = document.getElementById('grid'), toast = document.getElementById('toast'), cartCount = document.getElementById('cartCount');
let filter = 'all', count = 0, timer;
const say = t => { toast.textContent = t; toast.classList.add('show'); clearTimeout(timer); timer = setTimeout(() => toast.classList.remove('show'), 1800); };

function render(){
  grid.innerHTML = items.filter(i => filter === 'all' || i.cat === filter).map(i => `
    <article class="card">
      <button class="heart" aria-label="В избранное">♥</button>
      <img src="images/${i.img}.jpg" alt="${i.n}" loading="lazy">
      <h3>${i.n}</h3><p>${i.d}</p>
      <div class="row"><span class="price">${money(i.p)}</span><button class="add" aria-label="В корзину" data-name="${i.n}">+</button></div>
    </article>`).join('');
}
render();
document.getElementById('filters').addEventListener('click', e => {
  const b = e.target.closest('.chip'); if (!b) return;
  document.querySelectorAll('#filters .chip').forEach(c => c.classList.toggle('active', c === b));
  filter = b.dataset.f; render();
});
grid.addEventListener('click', e => {
  const h = e.target.closest('.heart'), a = e.target.closest('.add');
  if (h) h.classList.toggle('on');
  if (a){ cartCount.textContent = ++count; say(`«${a.dataset.name}» в корзине`); }
});

// Конструктор набора
const flavors = [['🍓','Макарон клубничный'],['🌿','Макарон фисташковый'],['🍋','Лимонный десерт'],['🧁','Капкейк ванильный'],['🍫','Шоколадный брауни']];
const PRICE = 150;
let size = 4, qty = flavors.map(() => 0);
const box = {fl:document.getElementById('flavors'), bar:document.getElementById('bar'), st:document.getElementById('status'), tot:document.getElementById('total'), btn:document.getElementById('boxBtn')};
const sum = () => qty.reduce((a,b) => a + b, 0);

function drawBox(){
  box.fl.innerHTML = flavors.map((f,i) => `<div class="fl"><span>${f[0]} ${f[1]}</span><div class="qty"><button data-i="${i}" data-d="-1" aria-label="Меньше">−</button><b>${qty[i]}</b><button data-i="${i}" data-d="1" aria-label="Больше">+</button></div></div>`).join('');
  const s = sum();
  box.bar.style.width = (s / size * 100) + '%';
  box.st.textContent = `Выбрано ${s} из ${size}`;
  box.tot.textContent = money(s * PRICE);
  box.btn.disabled = s !== size;
}
drawBox();
box.fl.addEventListener('click', e => {
  const b = e.target.closest('button'); if (!b) return;
  const i = +b.dataset.i, d = +b.dataset.d;
  if (d > 0 && sum() >= size) return;
  if (d < 0 && qty[i] === 0) return;
  qty[i] += d; drawBox();
});
document.getElementById('sizes').addEventListener('click', e => {
  const b = e.target.closest('.chip'); if (!b) return;
  document.querySelectorAll('#sizes .chip').forEach(c => c.classList.toggle('active', c === b));
  size = +b.dataset.n; qty = flavors.map(() => 0); drawBox();
});
box.btn.addEventListener('click', () => { cartCount.textContent = ++count; say(`Набор из ${size} шт. в корзине`); qty = flavors.map(() => 0); drawBox(); });
