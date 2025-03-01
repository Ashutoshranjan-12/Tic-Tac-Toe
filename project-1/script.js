// let boxes = document.querySelectorAll(".box");
// let restbtn = document.querySelector("#rest");
// let nwebtn = document.querySelector("#nwebtn");
// let msgcontainer = document.querySelector(".msg-container");
// let msg = document.querySelector("#msg");

// let turnO = true;

// const winPatterns = [
//     [0, 1, 2],
//     [0, 3, 6],
//     [0, 4, 8],
//     [1, 4, 7],
//     [2, 5, 8],
//     [2, 4, 6],
//     [3, 4, 5],
//     [6, 7, 8],
// ];

// const restgame = () =>{
//     turnO = true;
//     enableBoxes();
//     msgcontainer.classList.add('hide');
// }

// boxes.forEach((box) => {
//     box.addEventListener("click", () => {
//         console.log("hii");
//         if (turnO) {
//             box.innerText = "O"
//             turnO = false
//         }

//         else {
//             box.innerText = "X"
//             turnO = true
//         }

//         box.disabled = true

//         checkwinner();
//     });
// });

// const disableBoxes = () =>{
//     for (let box of boxes){
//         box.disabled = true;
//     }
// };

// const enableBoxes = () =>{
//     for (let box of boxes){
//         box.disabled = false;
//         box.innerText = "";
//     }
// };

// const showWinner = (winner) =>{
//     msg.innerText = `congratulation, winner is ${winner}`;
//     msgcontainer.classList.remove("hide");
//     disableBoxes();
// };

// const checkwinner = () => {
//     for (let pattern of winPatterns) {
//         let pos1val = boxes[pattern[0]].innerText;
//         let pos2val = boxes[pattern[1]].innerText;
//         let pos3val = boxes[pattern[2]].innerText;

//         if (pos1val != "" && pos2val != "" && pos3val != "") {
//             if (pos1val === pos2val && pos2val === pos3val) {
//                 console.log("winner", pos1val);
//                 showWinner(pos1val);
//             }
//         }
//     }
// };

// nwebtn.addEventListener("click",restgame);
// reset.addEventListener("click",restgame);

let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset");
let newGameBtn = document.querySelector("#nwebtn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");
let popup = document.querySelector("#popup");
let winnerMsg = document.querySelector("#winner-msg");
let closePopupBtn = document.querySelector("#close-popup");

let turnO = true;

const winPatterns = [
    [0, 1, 2], [0, 3, 6], [0, 4, 8], 
    [1, 4, 7], [2, 5, 8], [2, 4, 6], 
    [3, 4, 5], [6, 7, 8]
];

const resetGame = () => {
    turnO = true;
    enableBoxes();
    msgContainer.classList.add("hide");
    popup.classList.add("hide"); // Hide popup on reset
};

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (box.innerText === "") {
            box.innerText = turnO ? "O" : "X";
            box.disabled = true;
            turnO = !turnO;
            checkWinner();
        }
    });
});

const disableBoxes = () => {
    boxes.forEach((box) => box.disabled = true);
};

const enableBoxes = () => {
    boxes.forEach((box) => {
        box.disabled = false;
        box.innerText = "";
    });
};

const showWinner = (winner) => {
    msg.innerText = `Congratulations! Winner is ${winner}`;
    msgContainer.classList.remove("hide");

    // Show winner popup
    winnerMsg.innerText = `🎉 Winner: ${winner} 🎉`;
    popup.classList.remove("hide");

    disableBoxes();
    
    // Confetti Effect (Party Bomb)
    confetti({
        particleCount: 100,
        spread: 70,
        origin: { y:1 }
    });
};

const checkWinner = () => {
    for (let pattern of winPatterns) {
        let [a, b, c] = pattern;
        let pos1val = boxes[a].innerText;
        let pos2val = boxes[b].innerText;
        let pos3val = boxes[c].innerText;

        if (pos1val && pos1val === pos2val && pos2val === pos3val) {
            showWinner(pos1val);
            return;
        }
    }

    // Check for draw
    if ([...boxes].every(box => box.innerText !== "")) {
        msg.innerText = "It's a Draw!";
        popup.classList.remove("hide");
        winnerMsg.innerText = "😮 It's a Draw!";
    }
};

// Close popup when clicking "Play Again"
closePopupBtn.addEventListener("click", resetGame);
newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);
