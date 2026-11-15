const data = {
  runway:{t:'Подиум',n:'01',d:'Показы на неделях моды и закрытых шоу брендов. Готовим моделей к выходу: походка, образ, работа за кулисами.',l:['Школа подиума при агентстве','Участие в 40+ показах в год','Работа с дизайнерами и бутиками']},
  photo:{t:'Фотосъёмки',n:'02',d:'Каталоги, лукбуки и съёмки для журналов. Студии со светом и командой стилистов на каждый проект.',l:['Тестовые съёмки для портфолио','Студии и выездные площадки','Команда: стилист, визажист, ретушёр']},
  ads:{t:'Реклама',n:'03',d:'Рекламные кампании для брендов красоты, одежды и аксессуаров. Видео, фото, наружная реклама.',l:['Договоры с прозрачной оплатой','Эксклюзив и неэксклюзив','Сопровождение менеджера на съёмке']},
  cast:{t:'Кастинги',n:'04',d:'Открытые и закрытые кастинги каждый месяц. Приходите с анкетой — мы поможем подготовиться.',l:['Бесплатное участие','Обратная связь после просмотра','Дальнейшее ведение карьеры']}
};
const panel = document.getElementById('panel');
function showTab(k){
  const x = data[k];
  panel.innerHTML = `<div><h3>${x.t}</h3><p>${x.d}</p><ul>${x.l.map(i => `<li>${i}</li>`).join('')}</ul></div><div class="big" aria-hidden="true">${x.n}</div>`;
}
showTab('runway');
document.getElementById('tabs').addEventListener('click', e => {
  const b = e.target.closest('.tab'); if (!b) return;
  document.querySelectorAll('.tab').forEach(t => t.classList.toggle('active', t === b));
  showTab(b.dataset.t);
});

// Счётчики при появлении на экране
const io = new IntersectionObserver(es => es.forEach(en => {
  if (!en.isIntersecting) return;
  io.unobserve(en.target);
  const to = +en.target.dataset.to, t0 = performance.now();
  const step = t => { const p = Math.min((t - t0) / 1200, 1); en.target.textContent = Math.round(to * p) + (p === 1 ? '+' : ''); if (p < 1) requestAnimationFrame(step); };
  requestAnimationFrame(step);
}), {threshold:.6});
document.querySelectorAll('[data-to]').forEach(el => io.observe(el));

// Заявка: проверка полей
const toast = document.getElementById('toast');
document.getElementById('form').addEventListener('submit', e => {
  e.preventDefault();
  const name = document.getElementById('name').value.trim(), phone = document.getElementById('phone').value.replace(/\D/g, ''), h = +document.getElementById('height').value, city = document.getElementById('city').value.trim();
  const hint = document.getElementById('hint');
  let err = '';
  if (name.length < 2) err = 'Введите имя';
  else if (phone.length < 10) err = 'Проверьте номер телефона';
  else if (h < 140 || h > 210) err = 'Рост укажите от 140 до 210 см';
  else if (city.length < 2) err = 'Укажите город';
  hint.className = 'hint ' + (err ? 'err' : 'ok');
  hint.textContent = err || 'Спасибо! Менеджер свяжется с вами в течение трёх дней.';
  if (!err){ e.target.reset(); toast.textContent = 'Заявка отправлена'; toast.classList.add('show'); setTimeout(() => toast.classList.remove('show'), 2000); }
});
