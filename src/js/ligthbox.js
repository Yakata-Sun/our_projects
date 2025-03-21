<script type="module">
import Lightbox from './photoswipe-lightbox.esm.js';
const lightbox = new Lightbox({
  gallery: '#my-gallery',
  children: 'a',
  pswpModule: () => import('./photoswipe.esm.js')
});
lightbox.init();
</script>