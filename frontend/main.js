const background = document.querySelector('.inner-header');
// g
const Element1 = document.querySelector('.bottle1 #bottle1');
const description1 = document.querySelector('.inner-header .description1');
const Element2 = document.querySelector('.bottle2 #bottle2');
const description2 = document.querySelector('.bottle2 .description2');
// const cancel = document.querySelector('.description1 .cancel');

// div
const bottle1 = document.querySelector('.bottle1');
const bottle2 = document.querySelector('.bottle2');

let Visible1 = false;
let Visible2 = false;


Element1.addEventListener('click', () => {
  Visible1 = !Visible1;
  console.log('click1');
  description1.style.display = '';
});



let counter = 0;

background.addEventListener('click', () => {  
  console.log(counter);
  console.log('clickback');  
  // if (counter == 0) {
  //   bottle1.style.display = '';
  // }
  if (counter == 0) {
    counter++;
    bottle2.style.display = ''; 
    setTimeout(() => {      
      bottle2.style.display = 'none';
    }, 1800); // 两秒后执行   
  }else{
    bottle1.style.display = '';
  }  
  console.log(counter);
});

function cancel() {
  description1.style.display = 'none';
}