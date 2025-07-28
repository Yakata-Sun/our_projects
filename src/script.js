// Анимация при прокрутке
const faders = document.querySelectorAll('.fade-in');
const appearOnScroll = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.05 });

faders.forEach(el => appearOnScroll.observe(el));

// === Табы ===

const tabRoutes = (tabBaseClass, contentBaseClass) => {
  const tabs = document.querySelectorAll(`.${tabBaseClass}`);
  const contents = document.querySelectorAll(`.${contentBaseClass}`);

  tabs.forEach((tab, index) => {
    tab.addEventListener('click', () => {
      // Удаляем активные классы у всех
      tabs.forEach(t => t.classList.remove(`${tabBaseClass}_active`));
      contents.forEach(c => c.classList.remove(`${contentBaseClass}_active`));
      
      // Добавляем активный класс текущему
      tab.classList.add(`${tabBaseClass}_active`);
      contents[index].classList.add(`${contentBaseClass}_active`);
    });
  });
};
 tabRoutes('catalog_tab', 'catalog_content');

// subscribe
document.getElementById('subscribeForm').addEventListener('submit', function (event) {
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
 let slides = document.querySelectorAll('.slider-item');
    let prev = document.querySelector('.prev');
    let next = document.querySelector('.next');
    let dots = document.querySelectorAll('.dot');
    let currentSlide = 0;

    // Показать слайд по индексу
    function showSlide(index) {
        // Скрыть все слайды
        slides.forEach(slide => slide.classList.remove('active'));
        // Убрать активный класс у всех точек
        dots.forEach(dot => dot.classList.remove('dot-active'));
        
        // Показать нужный слайд
        slides[index].classList.add('active');
        // Активировать нужную точку
        dots[index].classList.add('dot-active');
        
        currentSlide = index;
    }

    // Следующий слайд
    function nextSlide() {
        let newIndex = currentSlide + 1;
        if (newIndex >= slides.length) {
            newIndex = 0;
        }
        showSlide(newIndex);
    }

    // Предыдущий слайд
    function prevSlide() {
        let newIndex = currentSlide - 1;
        if (newIndex < 0) {
            newIndex = slides.length - 1;
        }
        showSlide(newIndex);
    }

    // Перейти к слайду по точке
    function goToSlide(index) {
        showSlide(index);
    }

    // Автоматическая смена слайдов каждые 5 секунд
    let slideInterval = setInterval(nextSlide, 3000);

    // Остановка автосмены при наведении мыши
    const slider = document.querySelector('.slider-main');
    slider.addEventListener('mouseenter', () => {
        clearInterval(slideInterval);
    });

    // Возобновление автосмены при уходе мыши
    slider.addEventListener('mouseleave', () => {
        slideInterval = setInterval(nextSlide, 2000);
    });

    // События для стрелок
    if (next) {
        next.addEventListener('click', nextSlide);
    }
    
    if (prev) {
        prev.addEventListener('click', prevSlide);
    }

    // События для точек
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            goToSlide(index);
        });
    });

    // Инициализация слайдера
    showSlide(currentSlide);
