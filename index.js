/*
TODOS:

Need to work on collision with walls and rabbit
if colide with wall, clear the interval and end game
if collide with the rabbit, update score, increase size of snake
create new rabbit and place the new rabbit

GAME IS DETECTING RABBIT COLLISION
NEED TO CHANGE THE WAY THE SNAKE IS BUILT
MIGHT USED A LINKED LIST

when creating a the snake as a linked list, create a new head
// when eating rabbit,

to handle movement, create a new head with the position of the current direction
this pushed the links down, when doing this the tail must be deleted

NOTE, making the snake a doubly linked list might be a good idea
each node has a data attribute, a previous and a next
this would allow grabbing the tails previous link and making it the new tail
and deleting the current tail
*/
import Game from "./game/Game.js";
import Queue from "./util/Queue";

const SCALE = 20;

function trackKeys(keys) {
  let down = Object.create(null);

  let keyEventQueue = new Queue();

  function track(event) {
    if (keys.includes(event.key)) {
      // down[event.key] = event.type == "keydown";
      if(event.type == "keydown") {
        keyEventQueue.enqueue({[event.key]: true});
      }
      event.preventDefault();
    }
  }
  window.addEventListener("keydown", track);
  // window.addEventListener("keyup", track);
  // console.log(down)
  console.log(keyEventQueue.queue)
  return keyEventQueue;
}

var arrowKeys =
  trackKeys(["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"]);

let game = new Game();

function update() {
  // want to update the game
  game.update(arrowKeys);
}

update()

setInterval(update, 500);
