const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const cat = document.getElementById('cat');
const cig = document.getElementById('cig');

const catSize = 30;
const cigSize = 40;

var catX = 200;
var catY = 60;
var catSpeed = 1;

// var cigX = 0;
// var cigY = 80;
var cigSpeed = 1;

var cigs = [];

cigs[0] = {
  x: 0,
  y: 30
};

document.addEventListener('keydown', function(e){
  switch(e.keyCode) {
    case 37:
    catX = catX - catSpeed;
    break;
    case 38:
    catY = catY - catSpeed;
    break;
    case 39:
    catX = catX + catSpeed;
    break;
    case 40:
    catY = catY + catSpeed;
    break;
  }
})


function draw() {
  ctx.clearRect(0, 0, 300, 150)
  ctx.drawImage(cat, catX, catY, catSize, catSize);

  for (let i = 0; i < cigs.length; i++) {
      ctx.drawImage(cig, cigs[i].x, cigs[i].y, cigSize, cigSize);


      cigs[i].x++;

      if (cigs[i].x == 100) {
        cigs.push({
          x: 0,
          y: Math.floor(Math.random()*canvas.height)
        })
      }
    }



  requestAnimationFrame(draw);
}

draw();
