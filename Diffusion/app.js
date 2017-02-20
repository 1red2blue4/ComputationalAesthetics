const obj = require('./bundle.js');

window.addEventListener('load', () => {
  console.log('obj included', obj);
});