window.addEventListener('DOMContentLoaded', function () {
  "use strict";


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
  tabRoutes('tabRoutes', 'tabRoutes_content');
/*   tabRoutes('catalog_tab', 'catalog_content'); */
const bigImg = (containerSelector) => {
    const contImgs = document.querySelector(containerSelector),
      popup = document.createElement('div'),
      big = document.createElement('img');

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
  console.log(path); // Теперь путь будет корректным
  big.setAttribute('src', path);
  console.log(big);
  popup.style.display = 'flex';
  document.body.style.overflow = 'hidden';
});
    // Закрытие по клику вне изображения
    popup.addEventListener('click', () => {
      popup.style.display = 'none';
      big.src = '';
      document.body.style.overflow = '';
    });

  };

  bigImg('.galleryLite');
});
