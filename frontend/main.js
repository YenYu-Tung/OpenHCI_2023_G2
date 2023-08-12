const background = document.querySelector('.inner-header');
// g
const gElement = document.querySelector('.bottle1 #bottle1');
const descriptionElement = document.querySelector('.bottle1 .description1');
const gElement1 = document.querySelector('.bottle2 #bottle2');
const descriptionElement1 = document.querySelector('.bottle2 .description2');
const gElement2 = document.querySelector('.bottle3 #bottle3');
const descriptionElement2 = document.querySelector('.bottle3 .description3');
// div
const bottle0 = document.querySelector('.bottle1');
const bottle1 = document.querySelector('.bottle2');
const bottle2 = document.querySelector('.bottle3');

let Visible = false;
let Visible1 = false;
let Visible2 = false;

gElement.addEventListener('click', () => {
  Visible = !Visible;
  console.log('click');
  descriptionElement.classList.toggle('visible', Visible);
});
gElement1.addEventListener('click', () => {
  Visible1 = !Visible1;
  console.log('click1');
  descriptionElement1.classList.toggle('visible', Visible1);
});
gElement2.addEventListener('click', () => {
  Visible2 = !Visible2;
  console.log('click2');
  descriptionElement2.classList.toggle('visible', Visible2);
});

let counter = 0;

background.addEventListener('click', () => {  
  console.log(counter);
  console.log('clickback');  
  if (counter == 0) {
    bottle0.style.display = '';
  }
  if (counter == 1) {
    bottle1.style.display = '';
  }
  if (counter == 2) {
    bottle2.style.display = '';
  }
  counter++;
  // console.log(counter);
});



// const root = document.querySelector(".root");
// if(token){
//   counter++;
//   if(counter == 1){
//     bottle.style.display = '';
//   }else if (counter == 2){
//     bottle1.style.display = ''
//   }else{
//     bottle2.style.display = ''
//   }
// }

function slideIn() {
  let position = 100; // 初始位置
  const interval = setInterval(() => {
    if (position >= 0) {
      clearInterval(interval); // 动画结束后清除定时器
    } else {
      position -= 5; // 增加位置，可以根据需要调整步进值
      bottle0.style.bottom = position + 'px';
    }
  }, 10); // 每10毫秒更新一次位置
}

