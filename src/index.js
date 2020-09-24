// ES6 syntax example
const fn = () => 1;

let a = 2;

class Person {}

const imgs = Array.from(document.querySelectorAll('img'));

imgs.forEach((element) => {
  element.addEventListener('load', function () {
    console.log('load image');
  });
});
