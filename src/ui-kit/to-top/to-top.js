// eslint-disable-next-line no-redeclare
/* global document window performance requestAnimationFrame */

const ready = require('../../js/utils/documentReady.js');

ready(function (){

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

  function visibilityToggle() {
    if (window.pageYOffset >= 500) {
      document.getElementById('to-top').classList.add('to-top--visible');
    }
    else {
      document.getElementById('to-top').classList.remove('to-top--visible');
    }
  }


  if (document.getElementById('to-top')) {

    document.getElementById('to-top').addEventListener('click', function (e) {
      e.preventDefault();
      const scroll = window.pageYOffset;
      const targetTop = 0;
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
    }, false);

    window.addEventListener('scroll', visibilityToggle);
    visibilityToggle();

  }
});
