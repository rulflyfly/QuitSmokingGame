const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');


const cat = document.getElementById('cat');
const cig = document.getElementById('cig');
const click = document.getElementById('click');

const catSize = 100;
const cigSize = 100;



let mew = new Audio();
let lose = new Audio();

mew.src = "mew.mp3";
lose.src = "lose.mp3"

var catX = 200;
var catY = 60;
var catSpeed = 2;

var cigSpeed = 1;

var cigs = [];

var paused = false;

var start = false;

cigs[0] = {
  x: 0,
  y: 30
};


canvas.addEventListener('mousemove', followMouse);

function followMouse(e) {
  if (e.offsetX < canvas.width - catSize && e.offsetY < canvas.height - catSize)
  {
    catX = e.offsetX;
    catY = e.offsetY;
  }
}

canvas.addEventListener('touchstart', followTouch);
canvas.addEventListener('touchmove', followTouch);
canvas.addEventListener('touchend', followTouch);

function followTouch(e) {
  
    // console.log(e.touches[0].clientX, e.touches[0].clientY)
    catX = e.touches[0].clientX - 4*catSize;
    catY = e.touches[0].clientY - 4*catSize;
  
}

canvas.addEventListener('click', toggle);

function toggle() {
  if (lives === 0) {
  location.reload();
  } else if (!paused) {
    paused = true;
    canvas.removeEventListener("mousemove", followMouse);

  } else {
    paused = false;
    canvas.addEventListener('mousemove', followMouse);
  };
}



document.addEventListener('keydown', function(e){
  switch(e.keyCode) {
    case 37:
    if (catX !== 0) {
    catX = catX - catSpeed;
    }
    break;
    case 38:
    if (catY !== 0) {
    catY = catY - catSpeed;
    }
    break;
    case 39:
    if (catX + catSize !== canvas.width - 5) {
    catX = catX + catSpeed;
    }
    break;
    case 40:
    if (catY + catSize !== canvas.height + 10) {
    catY = catY + catSpeed;
    }
    break;
    case 32:
    if (lives === 0) {
    location.reload();
  }
    break;
    case 27:
    if (paused == false) {
      paused = true;
    } else {
      paused = false;
    }

  }

})

let score = 0;
let lives = 3;

function update() {
  if (paused === true) {
    return;
  }
}



function draw() {
  ctx.clearRect(0, 0, 889, 500)



  ctx.drawImage(cat, catX, catY, catSize, catSize);



  for (let i = 0; i < cigs.length; i++) {

      ctx.drawImage(cig, cigs[i].x, cigs[i].y, cigSize, cigSize);


      cigs[i].x = cigs[i].x + cigSpeed;

      //collision detection

      if (cigs[i].x + cigSize > catX && cigs[i].x < catX + catSize && cigs[i].y > catY - (cigSize/2) && cigs[i].y + cigSize < (catY + catSize) + (cigSize/2)) {
        cigs[i].x = cigs[i]-100;
        score++;
        mew.play();
      }

      if (cigs[i].x + cigSize === canvas.width) {
        lives--;
        lose.play();
      }
    }

         ctx.font = "25px Indie Flower";
         ctx.fillStyle = "black";
         ctx.textAlign = "left";
         ctx.fillText("Cigs caught:" + " " + score, 20, 40)

         ctx.font = "25px Indie Flower";
         ctx.fillStyle = "black";
         ctx.textAlign = "left";
         ctx.fillText("Lives:" + " " + lives, 20, 70)



         if (lives === 0) {
          ctx.style = "black";
          ctx.fillRect(0, 0, 889, 500)

          ctx.font = "40px Indie Flower";
          ctx.fillStyle = "white";
          ctx.textAlign = "center";
          ctx.fillText("You let her smoke :(", canvas.width / 2, canvas.height / 2);
          return;
         }

         //handling PAUSE

         if (paused === true){
           ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
           ctx.fillRect(0, 0, 889, 500);
           ctx.font = "40px Indie Flower";
           ctx.fillStyle = "white";
           ctx.textAlign = "center";
           ctx.fillText("Catch your breath :3", canvas.width / 2, canvas.height / 2);

           catSpeed = 0;
           cigSpeed = 0;
         }
         if (paused === false){
           catSpeed = 2;
           cigSpeed = 1;
         }


      requestAnimationFrame(draw);
}


    setInterval(function(){
      if (!paused && start) {
     cigs.push({
       x: 0,
       y: Math.floor(Math.random()*(canvas.height-cigSize))
     })
   } ;
 }, 1000);



   function game() {
     if (!start) {
       ctx.style = "black";
       ctx.fillRect(0, 0, 889, 500)
       ctx.drawImage(click, 344.5, 197.5, 200, 105);
       canvas.removeEventListener('click', toggle);

       canvas.addEventListener('click', function(){
         canvas.addEventListener('click', toggle);
         start = true;
         draw();
       })
     }
   }

   game();
