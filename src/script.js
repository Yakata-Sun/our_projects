// Анимация при прокрутке
const faders = document.querySelectorAll('.fade-in');
const appearOnScroll = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.2 });

faders.forEach(el => appearOnScroll.observe(el));

// === Табы ===
document.querySelectorAll('.catalog_tab').forEach(tab => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.catalog_tab').forEach(t => t.classList.remove('catalog_tab_active'));
    document.querySelectorAll('.catalog_content').forEach(c => c.classList.remove('catalog_content_active'));

    tab.classList.add('catalog_tab_active');
    const target = tab.dataset.tab;
    document.querySelector(`[data-tab-id="${target}"]`).classList.add('catalog_content_active');
  });
});

// Массив новостей/объявлений
const newsItems = [
  { date: "05.04.2025", title: "Рассписание автобуса", text: "Из станицы автобус отправляется в 6:10, 14:10, 19:00 </br> Из Майкопа в станицу автобус отправляется в 12:00 и 17:00" },
  { date: "01.04.2025", title: "Мобильная связь", text: "В станице работает только оператор Теле2" },
  { date: "28.03.2025", title: "Мастер-классы", text: "Открыта запись на мастер-классы по керамике, линогравюре, игре на варганах " }
];

function renderNews() {
  const container = document.getElementById('newsCards');
  container.innerHTML = '';
  newsItems.forEach(item => {
    const card = document.createElement('div');
    card.className = 'news-card';
    card.innerHTML = `
      <span class="date">${item.date}</span>
      <h3>${item.title}</h3>
      <p>${item.text}</p>
    `;
    container.appendChild(card);
  });
}

renderNews();
// Открывает модальное окно для добавления объявления
function openAddNewsModal() {
  document.getElementById('addNewsModal').style.display = 'block';
}

// Закрывает модальное окно
function closeModal(modalId) {
  document.getElementById(modalId).style.display = 'none';
}

// Отправляет форму добавления нового объявления
document.getElementById('addNewsForm').addEventListener('submit', function (e) {
  e.preventDefault();

  const title = document.getElementById('newsTitle').value;
  const text = document.getElementById('newsText').value;

  if (title.trim() && text.trim()) {
    const newNewsItem = {
      date: new Date().toLocaleDateString(),
      title: title,
      text: text
    };


    // Скрываем модальное окно добавления
    closeModal('addNewsModal');

    // Показываем подтверждение
    document.getElementById('confirmationModal').style.display = 'block';


    // Скрываем подтверждение через 3 секунды
    setTimeout(() => {
      closeModal('confirmationModal');
    }, 3000);

    // Очищаем форму
    document.getElementById('addNewsForm').reset();
  }
});

// Обработчик клика outside модального окна для его закрытия
window.onclick = function (event) {
  if (event.target.className === 'modal') {
    event.target.style.display = 'none';
  }
}

// Инициализация
document.getElementById('loadMoreNewsBtn').addEventListener('click', openAddNewsModal);
renderNews();
// Форма подписки
document.getElementById('subscribeForm').addEventListener('submit', function (e) {
  e.preventDefault();
  const email = document.getElementById('email').value.trim();
  if (email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    alert("Вы успешно подписаны!");
    this.reset();
  } else {
    alert("Введите корректный email.");
  }
});
//slaider
let slides = document.querySelectorAll('.slider-item'),
    prev = document.querySelector('.prev'),
    next = document.querySelector('.next'),
    dotsDiv = document.querySelector('.slider-dots'),
    dots = document.querySelectorAll('.dot'),
    thumbnails = document.querySelectorAll('.thumbnail'), // новые миниатюры
    slideIndex = 1;

showSlide(slideIndex);

function showSlide(n) {
  if (n > slides.length) slideIndex = 1;
  if (n < 1) slideIndex = slides.length;

  slides.forEach((item) => item.style.display = 'none');
  dots.forEach((item) => item.classList.remove('dot-active'));
  thumbnails.forEach((item) => item.classList.remove('active')); // убираем active с миниатюр

  slides[slideIndex - 1].style.display = 'block';
  dots[slideIndex - 1].classList.add('dot-active');
  thumbnails[slideIndex - 1].classList.add('active'); // добавляем active к текущей миниатюре
}

function nextSlide(n) {
  slideIndex += n;
  showSlide(slideIndex);
}

function dotSlide(n) {
  slideIndex = n;
  showSlide(slideIndex);
}

// События для стрелок
next.addEventListener('click', () => nextSlide(1));
prev.addEventListener('click', () => nextSlide(-1));

// Событие для точек
dotsDiv.addEventListener('click', function (event) {
  for (let i = 0; i < dots.length; i++) {
    if (event.target === dots[i]) {
      dotSlide(i + 1); // точки начинаются с индекса 0, слайды с 1
    }
  }
});

// Событие для миниатюр
thumbnails.forEach((thumbnail, index) => {
  thumbnail.addEventListener('click', () => {
    dotSlide(index + 1); // слайды начинаются с 1
  });
});
