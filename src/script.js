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

document.getElementById('loadMoreNewsBtn').addEventListener('click', () => {
  const extraNews = {
    date: new Date().toLocaleDateString(),
    title: "Новое объявление",
    text: "Пример нового объявления."
  };
  newsItems.push(extraNews);
  renderNews();
});

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
document.getElementById('addNewsForm').addEventListener('submit', function(e) {
  e.preventDefault();
  
  const title = document.getElementById('newsTitle').value;
  const text = document.getElementById('newsText').value;
  
  if (title.trim() && text.trim()) {
    const newNewsItem = {
      date: new Date().toLocaleDateString(),
      title: title,
      text: text
    };
    
    // Добавляем новое объявление в массив (в реальном приложении отправьте данные на сервер)
    newsItems.push(newNewsItem);
    
    // Скрываем модальное окно добавления
    closeModal('addNewsModal');
    
    // Показываем подтверждение
    document.getElementById('confirmationModal').style.display = 'block';
    
    // Обновляем список новостей
    renderNews();
    
    // Скрываем подтверждение через 3 секунды
    setTimeout(() => {
      closeModal('confirmationModal');
    }, 3000);
    
    // Очищаем форму
    document.getElementById('addNewsForm').reset();
  }
});

// Обработчик клика outside модального окна для его закрытия
window.onclick = function(event) {
  if (event.target.className === 'modal') {
    event.target.style.display = 'none';
  }
}

// Инициализация
document.getElementById('loadMoreNewsBtn').addEventListener('click', openAddNewsModal);
renderNews();
// Форма подписки
document.getElementById('subscribeForm').addEventListener('submit', function(e) {
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
let currentIndex = 0;
    let slideInterval;
    let isPaused = false;

    // Инициализация индикаторов и нумерации
    function initCarousel() {
      const slides = document.querySelectorAll('.carousel-item');
      const indicatorsContainer = document.getElementById('carouselIndicators');

      indicatorsContainer.innerHTML = '';
      slides.forEach((_, index) => {
        const indicator = document.createElement('div');
        indicator.className = 'carousel-indicator';
        if (index === 0) indicator.classList.add('active');
        indicator.addEventListener('click', () => showSlide(index));
        indicatorsContainer.appendChild(indicator);
      });

      updateCarousel();
    }

    // Показать текущий слайд
    function showSlide(index) {
      const slides = document.querySelectorAll('.carousel-item');
      const indicators = document.querySelectorAll('.carousel-indicator');
      const counter = document.getElementById('carouselCounter');

      if (index >= slides.length) currentIndex = 0;
      else if (index < 0) currentIndex = slides.length - 1;
      else currentIndex = index;

      const offset = -currentIndex * 100;
      document.getElementById('carouselInner').style.transform = `translateX(${offset}%)`;

      // Обновить индикаторы
      indicators.forEach((ind, i) => {
        ind.classList.toggle('active', i === currentIndex);
      });

      // Обновить нумерацию
      counter.textContent = `${currentIndex + 1} / ${slides.length}`;
    }

    function nextSlide() {
      if (!isPaused) showSlide(currentIndex + 1);
    }

    function prevSlide() {
      if (!isPaused) showSlide(currentIndex - 1);
    }

    function startAutoSlide() {
      stopAutoSlide(); // Очистка предыдущего интервала
      slideInterval = setInterval(() => {
        nextSlide();
      }, 5000);
    }

    function stopAutoSlide() {
      clearInterval(slideInterval);
    }

    // Автопауза при наведении
    const carousel = document.getElementById('newsCarousel');
    carousel.addEventListener('mouseenter', () => isPaused = true);
    carousel.addEventListener('mouseleave', () => isPaused = false);

    // Поддержка свайпа
    let touchStartX = 0;
    carousel.addEventListener('touchstart', e => {
      touchStartX = e.changedTouches[0].screenX;
    });

    carousel.addEventListener('touchend', e => {
      const touchEndX = e.changedTouches[0].screenX;
      if (touchEndX < touchStartX - 50) nextSlide();
      if (touchEndX > touchStartX + 50) prevSlide();
    });

    // Обработчики кнопок "Подробнее"
    document.querySelectorAll('.description-toggle').forEach((btn, index) => {
      btn.addEventListener('click', () => {
        const description = btn.previousElementSibling;
        const isOpen = description.classList.contains('open');
        description.classList.toggle('open');
        btn.textContent = isOpen ? 'Подробнее' : 'Скрыть';
      });
    });

    // Инициализация
    initCarousel();
    startAutoSlide();

