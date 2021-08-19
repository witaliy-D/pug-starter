// eslint-disable-next-line no-redeclare
/* global document */

const ready = require('../../js/utils/documentReady.js');

ready(function (){

  const fields = document.querySelectorAll( '.field-num' );
  if (fields.length) {
    Array.prototype.forEach.call( fields, function ( field ) {
      const input = field.querySelector('.field-num__input');
      const valueMin = input.getAttribute('min') ? Number(input.getAttribute('min')) : -Infinity;
      const valueMax = input.getAttribute('max') ? Number(input.getAttribute('max')) : Infinity;
      const valueStep = input.getAttribute('step') ? Number(input.getAttribute('step')) : 1;
      field.addEventListener('click', function (event){
        if (event.target.classList.contains('field-num__btn') && !input.getAttribute('disabled')) {
          let num = parseInt(input.value);
          if (isNaN(num)) {num = 0;}
          if (event.target.classList.contains('field-num__btn--plus')) {
            if (num < valueMax) {input.value = num + valueStep;}
          }
          if (event.target.classList.contains('field-num__btn--minus')) {
            if (num > valueMin) {input.value = num - valueStep;}
          }
        }
      });
    });
  }

});
