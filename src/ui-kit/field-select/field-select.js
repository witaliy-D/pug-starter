// eslint-disable-next-line no-redeclare
/* global document */

const ready = require('../../js/utils/documentReady.js');

ready(function (){

  if (typeof Object.assign !== 'function') {
    Object.assign = function (target) {
      'use strict';
      // eslint-disable-next-line no-eq-null,eqeqeq
      if (target == null) {
        throw new TypeError('Cannot convert undefined or null to object');
      }

      target = Object(target);
      for (let index = 1; index < arguments.length; index++) {
        const source = arguments[index];
        // eslint-disable-next-line no-eq-null,eqeqeq
        if (source != null) {
          for (const key in source) {
            if (Object.prototype.hasOwnProperty.call(source, key)) {
              target[key] = source[key];
            }
          }
        }
      }
      return target;
    };
  }

  const Choices = require('choices.js');

  // Включим отдельно
  // const choices = new Choices('#some-if', {/* options */});

  // Или тупо найдём все селекты и включим на них Choices
  const selects = document.querySelectorAll('.field-select__select');
  selects.forEach(function (item){
    // eslint-disable-next-line no-new
    new Choices(item, {
      searchEnabled: false,
      placeholderValue: 'Выберите'
    });
  });

});
