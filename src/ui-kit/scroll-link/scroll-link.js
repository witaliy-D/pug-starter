// eslint-disable-next-line no-redeclare
/* global document window performance requestAnimationFrame */

const ready = require('../../js/utils/documentReady.js');

ready(function (){

  function getOffsetRect(elem) {
    const box = elem.getBoundingClientRect();
    const body = document.body;
    const docElem = document.documentElement;
    const scrollTop = window.pageYOffset || docElem.scrollTop || body.scrollTop;
    const scrollLeft = window.pageXOffset || docElem.scrollLeft || body.scrollLeft;
    const clientTop = docElem.clientTop || body.clientTop || 0;
    const clientLeft = docElem.clientLeft || body.clientLeft || 0;
    const top = box.top + scrollTop - clientTop;
    const left = box.left + scrollLeft - clientLeft;
    return {top: Math.round(top), left: Math.round(left)};
  }

  function animate(_ref) {
    const timing = _ref.timing;
    const draw = _ref.draw;
    const duration = _ref.duration;
    const start = performance.now();
    // eslint-disable-next-line no-shadow
    requestAnimationFrame(function animate(time) {
      let timeFraction = (time - start) / duration;
      if (timeFraction > 1) {timeFraction = 1;}
      const progress = timing(timeFraction);
      draw(progress);
      if (timeFraction < 1) {
        requestAnimationFrame(animate);
      }
    });
  }

  const links = document.querySelectorAll('[href^="#"][data-scroll-link]');
  for (let i = 0; i < links.length; i++) {
    links[i].addEventListener('click', function (e) {
      const hash = this.href.replace(/[^#]*(.*)/, '$1');
      if (hash && hash !== '#') {
        e.preventDefault();
        const scroll = window.pageYOffset;
        const targetTop = getOffsetRect(document.querySelector(hash)).top - 10; // С поправкой в 10px
        const scrollDiff = (scroll - targetTop) * -1;
        animate({
          duration: 500,
          timing(timeFraction) {
            return Math.pow(timeFraction, 4); // https://learn.javascript.ru/js-animation
          },
          draw(progress) {
            const scrollNow = scroll + progress * scrollDiff;
            window.scrollTo(0, scrollNow);
          }
        });
      }
    }, false);
  }
});
