'use strict';
window.addEventListener('DOMContentLoaded', function () {
  //вкладки
  let catalogTab = document.querySelectorAll(".catalog_tabs li"),
    catalogContent = document.querySelectorAll(".catalog_content");

  function resetTabs() {
    // Удаляет классы у ВСЕХ элементов
    catalogTab.forEach(tab => tab.classList.remove('catalog_tab_active'));
    catalogContent.forEach(content => content.classList.remove('catalog_content_active'));
  }

  function activeTab(index) {
    catalogTab[index].classList.add('catalog_tab_active');
    catalogContent[index].classList.add('catalog_content_active');
  }

  document.addEventListener('click', function (e) {
    let target = e.target.closest('.catalog_tab');// Работает даже при клике на вложенные элементы - closest() для поиска родителя с классом.
    if (target) {
      for (let i = 0; i < catalogTab.length; i++) {
        if (target === catalogTab[i]) {
          resetTabs();  // Сначала сбросить все
          activeTab(i); // Затем активировать нужную
          break;        // Прервать после нахождения
        }
      }
    }
  });
});

