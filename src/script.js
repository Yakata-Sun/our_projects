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

const TabsModule = (function () {
  // Приватные переменные
  const tabButtons = document.querySelectorAll('.catalog_tab');
  const tabContents = document.querySelectorAll('.catalog_content');

  // Установка начального активного таба
  function initActiveTab() {
    const activeTab = document.querySelector('.catalog_tab_active');
    if (activeTab) {
      const target = activeTab.dataset.tab;
      const content = document.querySelector(`[data-tab-id="${target}"]`);
      if (content) {
        content.classList.add('catalog_content_active');
      }
    }
  }

  // Переключение табов
  function switchTab(event) {
    const clickedTab = event.currentTarget;
    const target = clickedTab.dataset.tab;

    // Удаляем классы у всех табов и контента
    tabButtons.forEach(tab => tab.classList.remove('catalog_tab_active'));
    tabContents.forEach(content => content.classList.remove('catalog_content_active'));

    // Добавляем классы к выбранному табу и контенту
    clickedTab.classList.add('catalog_tab_active');
    const targetContent = document.querySelector(`[data-tab-id="${target}"]`);
    if (targetContent) {
      targetContent.classList.add('catalog_content_active');
    }
  }

  // Назначаем обработчики событий
  function bindEvents() {
    tabButtons.forEach(tab => {
      tab.addEventListener('click', switchTab);
    });
  }

  // Инициализация модуля
  function init() {
    initActiveTab();
    bindEvents();
  }

  return {
    init: init
  };
})();

// Запуск модуля после загрузки DOM
document.addEventListener('DOMContentLoaded', () => {
  TabsModule.init();
});

//кнопка подробнее
  function modal(){
    document.getElementById('work').style.display = 'block';
    document.getElementById('ok').addEventListener('click', function(){
      document.getElementById('work').style.display = 'none';
    })
  }
  document.getElementById('loadMoreNewsBtn').addEventListener('click', modal);

  // subscribe
  document.getElementById('subscribeForm').addEventListener('submit', function(event) {
    event.preventDefault();
  
    const emailInput = document.getElementById('email');
  
    const email = emailInput.value.trim();

    function openThanks() {
      document.getElementById('thanks').style.display = 'block';
    }
    function closeThanks() {
      document.getElementById('thanks').style.display = 'none';
    }
  
    if (!validateEmail(email)) {
      alert('Пожалуйста, введите корректный email.');
      return;
    }
  
    fetch('mailer/smart.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: 'email=' + encodeURIComponent(email)
    })
    .then(response => response.json())
    .then(data => {
      if (data.status === 'success') {
        console.log(data);
        emailInput.value = '';
        openThanks();
        console.log('Спасибо за подписку!');
        setTimeout(closeThanks, 3000);
      }
    })
    .catch(error => {
      console.error('Ошибка:', error);
    });
  });
  
  function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }

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
