// eslint-disable-next-line no-redeclare
/* global document Element */

const ready = require('../../js/utils/documentReady.js');

ready(function (){

  // Добавление/удаление модификаторов при фокусировке на ссылочном элементе
  const linkClassName = 'main-nav__link';
  const linkClassNameShowChild = 'main-nav__item--show-child';
  const findLinkClassName = new RegExp(linkClassName);
  // Слежение за всплывшим событием focus (нужно добавить класс, показывающий потомков)
  document.addEventListener('focus', function (event) {
    // Если событие всплыло от одной из ссылок гл. меню
    if (findLinkClassName.test(event.target.className)) {
      // Добавим классы, показывающие списки вложенных уровней, на всех родителей
      // eslint-disable-next-line no-use-before-define
      const parents = getParents(event.target, '.main-nav__item');
      for (let i = 0; i < parents.length; i++) {
        parents[i].classList.add(linkClassNameShowChild);
      }
    }
  }, true);
  // Слежение за всплывшим событием blur (нужно убрать класс, показывающий потомков)
  document.addEventListener('blur', function (event) {
    // Если событие всплыло от одной из ссылок гл. меню
    if (findLinkClassName.test(event.target.className)) {
      // Уберем все классы, показывающие списки 2+ уровней
      const parents = document.querySelectorAll('.' + linkClassNameShowChild);
      for (let i = 0; i < parents.length; i++) {
        parents[i].classList.remove(linkClassNameShowChild);
      }
    }
  }, true);



  // eslint-disable
  /* ! getParents.js | (c) 2017 Chris Ferdinandi | MIT License | http://github.com/cferdinandi/getParents */
  /**
   * Get all of an element's parent elements up the DOM tree
   * @param  {Node}   elem     The element
   * @param  {String} selector Selector to match against [optional]
   * @return {Array}           The parent elements
   */
  // eslint-disable-next-line no-var,vars-on-top
  var getParents = function ( elem, selector ) {

    // Element.matches() polyfill
    if (!Element.prototype.matches) {
      Element.prototype.matches =
              Element.prototype.matchesSelector ||
              Element.prototype.mozMatchesSelector ||
              Element.prototype.msMatchesSelector ||
              Element.prototype.oMatchesSelector ||
              Element.prototype.webkitMatchesSelector ||
              function (s) {
              	const matches = (this.document || this.ownerDocument).querySelectorAll(s);// eslint-disable-line
              	let i = matches.length;// eslint-disable-line
                  while (--i >= 0 && matches.item(i) !== this) {} // eslint-disable-line
              	return i > -1;// eslint-disable-line
              };
    }

    // Setup parents array
    const parents = [];

    // Get matching parent elements
    for ( ; elem && elem !== document; elem = elem.parentNode ) {

      // Add matching parents to array
      if ( selector ) {
        if ( elem.matches( selector ) ) {
          parents.push( elem );
        }
      }else {
        parents.push( elem );
      }

    }

    return parents;

  };

});
