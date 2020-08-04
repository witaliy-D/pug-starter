// eslint-disable-next-line no-redeclare
/* global document */

const autosize = require('autosize');
const ready = require('../../js/utils/documentReady.js');

ready(function (){

  autosize(document.querySelectorAll('textarea'));

});
