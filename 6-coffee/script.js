const slider = document.getElementById('slider');
const prev = document.getElementById('prev');
const next = document.getElementById('next');
const cartCount = document.getElementById('cartCount');
const toast = document.getElementById('toast');
let count = 0, toastTimer;

// Слайдер «Хиты меню»
const step = () => slider.querySelector('.dish').offsetWidth + 28;
next.addEventListener('click', () => {
  const end = slider.scrollLeft + slider.clientWidth >= slider.scrollWidth - 4;
  slider.scrollTo({ left: end ? 0 : slider.scrollLeft + step() });
});
prev.addEventListener('click', () => slider.scrollBy({ left: -step() }));

// Избранное
document.querySelectorAll('.heart').forEach(btn =>
  btn.addEventListener('click', () => btn.classList.toggle('liked')));

// Корзина
function showToast(text){
  toast.textContent = text;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 1800);
}
document.querySelectorAll('.add').forEach(btn =>
  btn.addEventListener('click', () => {
    count++;
    cartCount.textContent = count;
    const name = btn.closest('.dish').querySelector('h3').textContent;
    showToast(`«${name}» добавлено в корзину`);
  }));

// Поиск по блюдам
document.getElementById('searchBtn').addEventListener('click', () => {
  const q = prompt('Что ищете?');
  if (!q) return;
  const dish = [...document.querySelectorAll('.dish')]
    .find(d => d.querySelector('h3').textContent.toLowerCase().includes(q.toLowerCase()));
  if (dish) {
    dish.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'center' });
    showToast('Нашли: ' + dish.querySelector('h3').textContent);
  } else showToast('Ничего не нашлось');
});
