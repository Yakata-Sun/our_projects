'use strict'
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
export default tabRoutes;



