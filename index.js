/*
TODOS:
  Need to work on body collision
*/
import Game from "./game/Game.js";
import Queue from "./util/Queue";

function trackKeys(keys) {
  let down = Object.create(null);

  let keyEventQueue = new Queue();

  function track(event) {
    if (keys.includes(event.key)) {
      // down[event.key] = event.type == "keydown";
      if (event.type == "keydown") {
        keyEventQueue.enqueue({ [event.key]: true });
      }
      event.preventDefault();
    }
  }
  window.addEventListener("keydown", track);
  // window.addEventListener("keyup", track);
  // console.log(down)
  console.log(keyEventQueue.queue);
  return keyEventQueue;
}

var arrowKeys = trackKeys(["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"]);

let game = new Game();

function startGame() {
  let gameStart = setInterval(update, 200);

  function update() {
    // want to update the game
    let result = game.update(arrowKeys);

    if (result == -1) {
      alert("Game Lost");
      clearInterval(gameStart);
    }
  }
}

startGame();
