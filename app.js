let boxes=document.querySelectorAll(".box");
let resetbtn=document.querySelector(".reset");
let stats=document.querySelectorAll(".stats");
let newbtn=document.querySelector(".new");
let msgcont=document.querySelector(".msg-container");
let msg=document.querySelector("#msg");
let quitbtn=document.querySelector(".quit");
let totalEl=document.querySelector(".total");
let player1El=document.querySelector(".player1");
let player2El=document.querySelector(".player2");
let DrawEl=document.querySelector(".Draw");
let turn0=true;
let total = 0;
let player1 = 0;
let player2 = 0;
let Draw = 0;
const winpattern=[
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];
const resetgame=()=>{
    turn0=true;
    enablebox();


}
const quitgame=()=>{
    total=0;
    player1=0;
    player2=0;
    Draw=0;
    updateStats();
    enablebox();
}
const updateStats = () => {
    totalEl.innerText = `Total: ${total}`;
    player1El.innerText = `Player1: ${player1}`;
    player2El.innerText = `Player2: ${player2}`;
    DrawEl.innerText = `Draw: ${Draw}`;
};
boxes.forEach((box)=>{
    box.addEventListener("click",()=>{
        console.log(`box is clicked`);
        if(turn0){
            box.innerHTML="O";
            turn0=false;
        }
        else{
            box.innerHTML="X";
            turn0=true;
        }
        box.disabled=true;
        checkwinner();
    })
})
const enablebox=()=>{
    for(let box of boxes){
        box.innerText="";
        box.disabled=false;
        msgcont.classList.add("hide");
    }
}
const disablebox=()=>{
    for(let box of boxes){
        box.disabled=true;
    }
}

const showwinner = (winner) => {
    msgcont.classList.remove("hide");

    if (winner === "O") {
        msg.innerText = `Congratulations! The winner is Player 1 (O).`;
        player1 += 1;
    } else if (winner === "X") {
        msg.innerText = `Congratulations! The winner is Player 2 (X).`;
        player2 += 1;
    } else {
        msg.innerText = "It's a draw!";
        Draw += 1;
    }

    total += 1;
    updateStats();
    disablebox();
};

const checkwinner=()=>{
    let Wfound=false;
    for(let pattern of winpattern){
        let pos0val=boxes[pattern[0]].innerText;
        let pos1val=boxes[pattern[1]].innerText;
        let pos2val=boxes[pattern[2]].innerText;
        if(pos0val!="" && pos1val!=""&& pos2val!=""){
            if(pos0val===pos1val && pos1val===pos2val){
                console.log(`winner is ${pos0val}`);
                showwinner(pos0val);
                Wfound=true;
                break;
                }
            }
            
        }
        if(Wfound==false&& Array.from(boxes).every((box) => box.innerText !== "")) {
            console.log("It's a draw!");
            showwinner("Draw");
        }
}
newbtn.addEventListener("click",resetgame);
resetbtn.addEventListener("click",resetgame);
quitbtn.addEventListener("click",quitgame);
