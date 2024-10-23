const state = {
  view:{
    squares: document.querySelectorAll(".square"),
    enemy: document.querySelector(".enemy"),
    timeLeft:document.querySelector("#time-left"),
    score:document.querySelector("#score"),
    lives:document.querySelector("#lives"),

  },
  values: {     
    gameVelocity: 1000,
    hitPosition:0,
    result:0,
    currentTime: 60,
    lives:3
  },
  actions: {
    timerId: setInterval(randomSquare, 1000),
    countDownTimerId: setInterval(countDown, 1000),
  }
};

function addListenerHitBox(){
          
  if(state.values.lives > 0 ) {    
    state.view.squares.forEach((square) => {
      square.addEventListener("mousedown", () => {
        if (square.id === state.values.hitPosition){
          state.values.result++;
          state.view.score.textContent = state.values.result;
          state.values.hitPosition = null;
          playSound("hit");
        } else {
          if(state.values.lives > 0 ) {  
            state.values.lives--;
            state.view.lives.textContent = state.values.lives;
            
            if (state.values.lives === 0){
              state.values.currentTime = 1;
              countDown();
            }
          }
        }
      });
    });
  }
};


function randomSquare(){
  state.view.squares.forEach((square) => {
    square.classList.remove("enemy");
  })
  let randomSquareNumber = Math.floor(Math.random() * 9);
  let randomSquare = state.view.squares[randomSquareNumber];
  randomSquare.classList.add("enemy");
  state.values.hitPosition = randomSquare.id;
}

//function moveEnemy(){
//  state.values.timerId = setInterval(randomSquare, state.values.gameVelocity);
//}


function countDown(){
    state.values.currentTime--;
    state.view.timeLeft.textContent = state.values.currentTime;
    if(state.values.currentTime <= 0){
      clearInterval(state.actions.countDownTimerId);
      clearInterval(state.actions.timerId);
      alert("Game Over! Resultado final: " + state.values.result);
    }
}

function init() {
//  moveEnemy();
  addListenerHitBox();
  
}


function playSound(audioName) {
  let audio = new Audio(`../../src/audios/${audioName}.m4a`);
  audio.volume = 0.05;
  audio.play();
}


init();