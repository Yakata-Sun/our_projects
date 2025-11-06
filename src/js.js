window.addEventListener('DOMContentLoaded', function () {
  "use strict";

/* twoLinks*/
  const twoLinks = () => {
    const cont = document.querySelector(".around"),
    leftScreen = document.querySelector(".horse"),
    rightScreen = document.querySelector(".onFoot");

    leftScreen.addEventListener('mouseenter', () => cont.classList.add('horse-hover'));
    leftScreen.addEventListener('mouseleave', () => cont.classList.remove('horse-hover'));

    rightScreen.addEventListener('mouseenter', () => cont.classList.add('onfoot-hover'));
    rightScreen.addEventListener('mouseleave', () => cont.classList.remove('onfoot-hover'));

  };

  twoLinks();

/* ширина скрола */
  function calcScroll() {
        let div = document.createElement('div');

        div.style.width = '50px';
        div.style.height = '50px';
        div.style.overflowY = 'scroll';
        div.style.visibility = 'hidden';

        document.body.appendChild(div);
        let scrollWidth = div.offsetWidth - div.clientWidth;
        div.remove();

        return scrollWidth;
    }

// Данные о ценах для маршрутов

  const modal = document.getElementById('orderPhone');
  const modalContent = modal.querySelector('.modal-content');
  const closeBtn = modal.querySelector('.close-btn');
  const form = document.getElementById('newOrder');
  const heading = modalContent.querySelector('h2');
  // Данные о ценах для маршрутов
  const routePrices = {
    ochnauche: {
      horse: { price: '6000', duration: '6-7 часов', groupSize: 'до 4 человек' },
      foot: { price: 'от 3000', duration: '7-8 часов', groupSize: 'до 10 человек' }
    },
    chasovny: {
      horse: { price: '3000', duration: '1-2 часа', groupSize: 'до 4 человек' },
      foot: { price: 'от 1500', duration: '2-3 часа', groupSize: 'до 10 человек' }
    },
    bogatyrka: {
      horse: { price: '4000', duration: '5-6 часов', groupSize: 'до 4 человек' },
      foot: { price: 'от 2000', duration: '7-8 часов', groupSize: 'до 10 человек' }
    },
    klady: {
      horse: { price: '3000', duration: '2-3 часа', groupSize: 'до 4 человек' },
      foot: { price: 'от 2000', duration: '3-4 часов', groupSize: 'до 10 человек' }
    },
    fars: {
      foot: { price: 'от 2500', duration: '6-8 часов', groupSize: 'до 10 человек' }
    }
  };

  // Текущий тип тура (horse или foot)
  let currentTourType = null;

  // Функция инициализации
  function init() {
    addPricesToCards();
    setupModalHandlers();
    setupPriceButtons();
  }

  // Проверка доступных типов туров для маршрута
  function getAvailableTourTypes(routeKey) {
    const data = routePrices[routeKey];
    return {
      hasHorse: !!data.horse,
      hasFoot: !!data.foot,
      horseOnly: !!data.horse && !data.foot,
      footOnly: !!data.foot && !data.horse,
      both: !!data.horse && !!data.foot
    };
  }

  // Добавление цен к карточкам
  function addPricesToCards() {
    const cards = document.querySelectorAll('.catalog_item');

    cards.forEach((card, index) => {
      const routeKeys = Object.keys(routePrices);
      if (index >= routeKeys.length) return;

      const routeKey = routeKeys[index];
      const data = routePrices[routeKey];
      const tourTypes = getAvailableTourTypes(routeKey);

      // Создаем блок с ценами
      const priceBlock = document.createElement('div');
      priceBlock.className = 'price-block';
      priceBlock.dataset.route = routeKey;

      let priceHTML = '';

      // Добавляем конную цену, если доступна
      if (tourTypes.hasHorse) {
        priceHTML += `
        <div class="price-option horse-price">
          <div class="price-icon"><img src="img/routes/horses/horseicon.svg" alt="конная прогулка"></div>
          <div class="price-details">
            <div class="price-amount">${data.horse.price} ₽</div>
            <div class="price-info">${data.horse.duration}</div>
            <div class="price-info">${data.horse.groupSize}</div>
          </div>
        </div>
      `;
      }

      // Добавляем пешую цену, если доступна
      if (tourTypes.hasFoot) {
        priceHTML += `
        <div class="price-option foot-price">
          <div class="price-icon">🥾</div>
          <div class="price-details">
            <div class="price-amount">${data.foot.price} ₽</div>
            <div class="price-info">${data.foot.duration}</div>
            <div class="price-info">${data.foot.groupSize}</div>
          </div>
        </div>
      `;
      }

      priceBlock.innerHTML = priceHTML;

      // Вставляем блок цен перед кнопками
      const btnsContainer = card.querySelector('.btns') || card.querySelector('.load-more');
      if (btnsContainer) {
        btnsContainer.parentNode.insertBefore(priceBlock, btnsContainer);
      }

      // Обновляем кнопку "Заказать" для открытия модального окна
      const orderBtn = card.querySelector('.accent-btn');
      if (orderBtn) {
        orderBtn.dataset.route = routeKey;
        orderBtn.dataset.routeName = card.querySelector('h2, h3').textContent.trim();
      }
    });
  }

  // Настройка обработчиков модального окна
  function setupModalHandlers() {

    // Открытие модального окна при клике на кнопки "Заказать"
    document.addEventListener('click', (e) => {
      if (e.target.classList.contains('accent-btn')) {
        e.preventDefault();

        const routeKey = e.target.dataset.route;
        const routeName = e.target.dataset.routeName;

        if (routeKey && routeName) {
          openModal(routeKey, routeName);
        } else {
          openModal();
        }
      }
    });

    // Закрытие модального окна
    closeBtn.addEventListener('click', closeModal);

    // Закрытие при клике вне модального окна
    window.addEventListener('click', (e) => {
      if (e.target === modal) {
        closeModal();
      }
    });

    // Обработка отправки формы
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      handleFormSubmit();
    });
  }

  // Открытие модального окна
  function openModal(routeKey = null, routeName = null) {

    const tourTypes = getAvailableTourTypes(routeKey);

    // Определяем тип тура
    let tourType;
    if (tourTypes.horseOnly) {
      tourType = 'horse';
    } else if (tourTypes.footOnly) {
      tourType = 'foot';
    } else {
      tourType = currentTourType || 'horse';
    }

    // Обновляем заголовок модального окна
    if (routeName && routeKey) {
      heading.innerHTML = `Вы выбрали: </br> ${routeName}`;


      // Создаем или обновляем блок выбора типа тура
      let tourSelector = modalContent.querySelector('.tour-type-selector');
      if (!tourSelector) {
        tourSelector = document.createElement('div');
        tourSelector.className = 'tour-type-selector';

        const description = modalContent.querySelector('p');
        description.parentNode.insertBefore(tourSelector, description.nextSibling);
      }

      // Формируем HTML в зависимости от доступных опций
      let selectorHTML = '';

      if (tourTypes.both) {
        // Оба варианта доступны - показываем выбор
        const horseData = routePrices[routeKey].horse;
        const footData = routePrices[routeKey].foot;

        selectorHTML = `
      <div class="tour-option ${tourType === 'horse' ? 'selected' : ''}" data-type="horse">
        <input type="radio" name="tourType" id="tourHorse" value="horse" ${tourType === 'horse' ? 'checked' : ''}>
        <label for="tourHorse">
          <div class="price-icon"><img src="img/routes/horses/horseicon.svg" alt="конная прогулка"></div>
          <div class="tour-option-details">
            <div class="tour-option-title">Конная прогулка</div>
            <div class="tour-option-price">${horseData.price} ₽</div>
            <div class="tour-option-info">${horseData.duration}</div>
            <div class="tour-option-info">${horseData.groupSize}</div>
          </div>
        </label>
      </div>
      <div class="tour-option ${tourType === 'foot' ? 'selected' : ''}" data-type="foot">
        <input type="radio" name="tourType" id="tourFoot" value="foot" ${tourType === 'foot' ? 'checked' : ''}>
        <label for="tourFoot">
          <div class="tour-option-icon">🥾</div>
          <div class="tour-option-details">
            <div class="tour-option-title">Пеший тур</div>
            <div class="tour-option-price">${footData.price} ₽</div>
            <div class="tour-option-info">${footData.duration}</div>
            <div class="tour-option-info">${footData.groupSize}</div>
          </div>
        </label>
      </div>
    `;
      } else if (tourTypes.horseOnly) {
        // Только конный тур
        const horseData = routePrices[routeKey].horse;

        selectorHTML = `
      <div class="tour-option single-option selected" data-type="horse">
        <input type="hidden" name="tourType" value="horse">
        <div class="tour-option-icon"><img src="img/routes/horses/horseicon.svg" alt="конная прогулка"></div>
        <div class="tour-option-details">
          <div class="tour-option-title">Конная прогулка</div>
          <div class="tour-option-price">${horseData.price} ₽</div>
          <div class="tour-option-info">${horseData.duration}</div>
          <div class="tour-option-info">${horseData.groupSize}</div>
        </div>
      </div>
    `;
      } else if (tourTypes.footOnly) {
        // Только пеший тур
        const footData = routePrices[routeKey].foot;

        selectorHTML = `
      <div class="tour-option single-option selected" data-type="foot">
        <input type="hidden" name="tourType" value="foot">
        <div class="tour-option-icon">🥾</div>
        <div class="tour-option-details">
          <div class="tour-option-title">Пеший тур</div>
          <div class="tour-option-price">${footData.price} ₽</div>
          <div class="tour-option-info">${footData.duration}</div>
          <div class="tour-option-info">${footData.groupSize}</div>
        </div>
      </div>
    `;
      }

      tourSelector.innerHTML = selectorHTML;
    } else {
      tourSelector.innerHTML = '';
    }

    // Сохраняем данные в форму
    if (routeKey && routeName) {
      form.dataset.route = routeKey;
      form.dataset.routeName = routeName;
    }

    // Добавляем обработчики выбора типа тура только если есть выбор
    if (tourTypes.both) {
      setupTourTypeSelection();
    }

    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
  }

  // Настройка выбора типа тура в модальном окне
  function setupTourTypeSelection() {
    const tourOptions = document.querySelectorAll('.tour-option:not(.single-option)');
    const radioButtons = document.querySelectorAll('input[name="tourType"]');

    tourOptions.forEach(option => {
      option.addEventListener('click', function () {
        const type = this.dataset.type;
        const radio = this.querySelector('input[type="radio"]');

        // Снимаем выделение со всех опций
        tourOptions.forEach(opt => opt.classList.remove('selected'));

        // Выделяем выбранную опцию
        this.classList.add('selected');
        radio.checked = true;
      });
    });

    radioButtons.forEach(radio => {
      radio.addEventListener('change', function () {
        tourOptions.forEach(opt => opt.classList.remove('selected'));
        const selectedOption = document.querySelector(`.tour-option[data-type="${this.value}"]`);
        if (selectedOption) {
          selectedOption.classList.add('selected');
        }
      });
    });
  }

  // Закрытие модального окна
  function closeModal() {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
  }

  // Обработка отправки формы
  function handleFormSubmit() {
    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;
    const message = document.getElementById('newsText').value;

    const routeName = form.dataset.routeName;

    // Получаем выбранный тип тура
    const tourTypeInput = form.querySelector('input[name="tourType"]:checked') ||
      form.querySelector('input[name="tourType"][type="hidden"]');
    const tourTypeValue = tourTypeInput ? tourTypeInput.value : 'horse';
    const tourType = tourTypeValue === 'horse' ? 'Конная прогулка' : 'Пеший тур';

    // Получаем цену из выбранной опции
    const selectedOption = document.querySelector('.tour-option.selected');
    const price = selectedOption ? selectedOption.querySelector('.tour-option-price').textContent : '';

    // Формируем сообщение для отправки

    const fullMessage = `
Заказ маршрута: ${routeName}
Тип: ${tourType}
Стоимость: ${price}
Контакт: ${name}
Телефон: ${phone}
Сообщение: ${message || 'не указано'}
  `.trim();

    console.log('Отправка заказа:', fullMessage);

    // Здесь добавить отправку данных на сервер
    // Пример отправки через fetch (Node.js >=18 либо через node-fetch)
    async function sendToServer() {
      const payload = {
        routeName,
        tourType,
        price,
        name,
        phone,
        message
      };

      // Преобразуем в form-urlencoded
      const formData = new URLSearchParams();
      for (const [k, v] of Object.entries(payload)) {
        formData.append(k, v ?? '');
      }

      try {
        const response = await fetch('mailer/routes.php', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          body: formData.toString()
        });

        if (!response.ok) {
          const errText = await response.text();
          throw new Error(`Server responded with ${response.status}: ${errText}`);
        }

        const data = await response.json();
        console.log('Server response:', data);
        // Успех
        setTimeout(() => {
          form.reset();
          modal.style.display = 'none';
        }, 3000);
        return data;
      } catch (err) {
        console.error('Ошибка отправки на сервер:', err);
        throw err;
      }

    }

    sendToServer();
    // Например, через fetch API

  }

  // Настройка кнопок показа цен
  function setupPriceButtons() {
    const horsePriceBtn = document.querySelector('.offer.horse .load-more:first-child');
    const footPriceBtn = document.querySelector('.offer.onFoot .load-more:first-child');

    if (horsePriceBtn) {
      horsePriceBtn.addEventListener('click', (e) => {
        e.preventDefault();
        togglePriceHighlight('horse');
      });
    }

    if (footPriceBtn) {
      footPriceBtn.addEventListener('click', (e) => {
        e.preventDefault();
        togglePriceHighlight('foot');
      });
    }

    // Обработчики для кнопок "Оставить заявку" в блоках offer
    const horseOrderBtn = document.querySelector('.offer.horse .accent-btn');
    const footOrderBtn = document.querySelector('.offer.onFoot .accent-btn');

    if (horseOrderBtn) {
      horseOrderBtn.addEventListener('click', (e) => {
        e.preventDefault();
        currentTourType = 'horse';
        heading.innerHTML = `Добрый день!`
        modal.style.display = 'flex';
        document.body.style.overflow = 'auto';
      });
    }

    if (footOrderBtn) {
      footOrderBtn.addEventListener('click', (e) => {
        e.preventDefault();
        currentTourType = 'foot';
        heading.innerHTML = `Добрый день!`
        modal.style.display = 'flex';
        document.body.style.overflow = 'auto';
      });
    }
  }

  // Переключение подсветки цен
  function togglePriceHighlight(type) {
    currentTourType = type;

    const allPriceOptions = document.querySelectorAll('.price-option');

    // Убираем все активные классы
    allPriceOptions.forEach(option => {
      option.classList.remove('active');
    });

    // Добавляем активный класс к выбранному типу
    const targetClass = type === 'horse' ? '.horse-price' : '.foot-price';
    const targetOptions = document.querySelectorAll(targetClass);

    targetOptions.forEach(option => {
      option.classList.add('active');
    });

    // Плавная прокрутка к карточкам
    const firstCard = document.querySelector('.catalog_item');
    if (firstCard) {
      firstCard.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    // Обновляем текст на кнопках offer
    const horseBtn = document.querySelector('.offer.horse .load-more:first-child');
    const footBtn = document.querySelector('.offer.onFoot .load-more:first-child');

    if (horseBtn && footBtn) {
      if (type === 'horse') {
        horseBtn.textContent = '✓ Показаны конные туры';
        footBtn.textContent = 'Показать пешие туры';
      } else {
        footBtn.textContent = '✓ Показаны пешие туры';
        horseBtn.textContent = 'Показать конные туры';
      }
    }
  }
  init();

/* большие картинки как модал */
const bigImg = (containerSelector) => {
    const contImgs = document.querySelector(containerSelector),
      popup = document.createElement('div'),
      big = document.createElement('img'),
      scroll = calcScroll();

      console.log(`${scroll}px`);

    popup.classList.add('popup');
    popup.style.cssText = "display: none;";
    contImgs.appendChild(popup);
    popup.appendChild(big);

    contImgs.addEventListener('click', (e) => {
  e.preventDefault();

  // Проверяем, кликнули ли по изображению с классом "preview"
  const target = e.target.closest('.preview');
  if (!target) return;
console.log(target);
  // Получаем корректный href из ссылки
  const link = target.closest('a');
  if (!link) return;

  const path = link.getAttribute('href');
  big.setAttribute('src', path);
  console.log(big);
  popup.style.display = 'flex';
  document.body.style.marginRight = `${scroll}px`; // Устанавливаем margin-right для предотвращения перекрытия содержимого на странице
  document.body.style.overflow = 'hidden';
  console.log(document.body.style);
});
    // Закрытие по клику вне изображения
    popup.addEventListener('click', () => {
      popup.style.display = 'none';
      big.src = '';
      document.body.style.overflow = '';
      document.body.style.marginRight = 0;
    });

  };

  bigImg('.galleryLite');

/*  отправка заявки  */

});
