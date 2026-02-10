let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");
let turnO = true;
let count = 0;
let nextStarter = "O";

const winPatterns = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8],
];

const resetGame = () => {
  if (count > 0 && !gameEnded) {
    nextStarter = nextStarter === "O" ? "X" : "O";
  }

  turnO = nextStarter === "O";
  count = 0;
  gameEnded = false;
  enableBoxes();
  msgContainer.classList.add("hide");

  resetBtn.classList.remove("hide");
};

boxes.forEach((box) => {
  box.addEventListener("click", () => {
    box.classList.remove("O-color", "X-color");

    if (turnO == true) {
      //player O turn
      box.innerText = "O";
      box.classList.add("O-color");
      //   box.classList.remove("X-color");
      turnO = false;
    } else {
      //player x turn
      box.innerText = "X";
      box.classList.add("X-color");
      //   box.classList.remove("O-color");
      turnO = true;
    }
    box.disabled = true;
    count++;

    let isWinner = checkWinner();

    if (count === 9 && !isWinner) {
      gameDraw();
    }
  });
});

const gameDraw = () => {
  msg.innerText = `Game was a draw`;
  msgContainer.classList.remove("hide");
  disableBoxes();

  //Alternate starter after draw;
  nextStarter = nextStarter === "O" ? "X" : "O";
  gameEnded = true;

  resetBtn.classList.add("hide");
};

const disableBoxes = () => {
  for (let box of boxes) {
    box.disabled = true;
  }
};

const enableBoxes = () => {
  for (let box of boxes) {
    box.disabled = false;
    box.innerText = "";
    box.classList.remove("O-color", "X-color");
  }
};

const showWinner = (winner) => {
  msg.innerText = `Congratulations, Winner is ${winner}`;
  msgContainer.classList.remove("hide");
  disableBoxes();

  //the winner gets to choose first.
  nextStarter = winner;
  gameEnded = true;
  resetBtn.classList.add("hide");
};

const checkWinner = () => {
  for (let pattern of winPatterns) {
    let posVal1 = boxes[pattern[0]].innerText;
    let posVal2 = boxes[pattern[1]].innerText;
    let posVal3 = boxes[pattern[2]].innerText;

    if (posVal1 != "" && posVal2 != "" && posVal3 != "") {
      if (posVal1 === posVal2 && posVal2 === posVal3) {
        showWinner(posVal1);
        return true;
      }
    }
  }
  return false;
};

const newGameStart = () => {
  turnO = nextStarter === "O";
  count = 0;
  enableBoxes();
  msgContainer.classList.add("hide");
};

newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", newGameStart);
