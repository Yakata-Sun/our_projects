import tabRoutes from './tabs.js';
import bigImg from './bigImg.js';

window.addEventListener('DOMContentLoaded', function () {
  "use strict";
  tabRoutes('tabRoutes', 'tabRoutes_content');
/*   tabRoutes('catalog_tab', 'catalog_content'); */
  bigImg('.galleryLite');
});
