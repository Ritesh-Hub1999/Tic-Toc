const boxes = document.querySelectorAll(".box");
const gameInfo = document.querySelector(".game-info");
const newGameBtn = document.querySelector(".btn");

//current player jo hai uska variable
let currentPlayer;
//game ki grid ki need hogi ki pata laga paai ki game ka state ky hai ya aur turn dena cahiya means sara ka sara cell fill hua hai, yeah varaible array hoga
let gameGrid;

const winningPosition = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [6,4,2]
];


//let's create a fucntion to initialize a game 
function initGame(){
    currentPlayer = "X";
    gameGrid = ["","","","","","","","",""];
    //UI par empty karna hoga functions ko
    boxes.forEach((box,index)=>{
        box.innerText = "";
        boxes[index].style.pointerEvents = "all";

        //hama jo jeeta hai usko color sa show karta tha usa hama hatana hoga means hama duabara css property initialize karna hoga 
        box.classList = `box box${index+1}`;
    });
    newGameBtn.classList.remove("active");
    //game info wali filed mai text dalenga ki kon current player hai
    gameInfo.innerText = `Current Player - ${currentPlayer}`;
}

initGame();

// box pe eventlistner lagana hoga qki waga X and O add ho rha hai daba mai click karka
boxes.forEach((box,index)=>{
    box.addEventListener("click", ()=>{
        //index islia pass kara hai ki pata chal paai konsa box pe click hua hai yaha hum eventTarget bhi use kar skta hai but yeah best practice hai
        handleClick(index);
    })
})

function handleClick(index){
    //condition check ki uss index pe nahi X ya nahi O para hai
    if(gameGrid[index] === ""){
        //UI mai update krna hai uss box mai current player daal do kon hai X ya O
        boxes[index].innerHTML = currentPlayer;
        //ab grid mai bhi update kr do hamara grid mai JS mai
        gameGrid[index] = currentPlayer;
        //jis bhi box mai value daal dia hai usko duabra hover kara tho pointer bannna do
        boxes[index].style.pointerEvents = "none";
        //ab turn swap karna hai agla player ka jaisa abhi X chal hai uska baad O chalega
        swapTurn();
        //check karo koi jeet tho nai gaya
        checkGameOver();
    }
}

function swapTurn(){
    if(currentPlayer === "X"){
        currentPlayer = "O";
    }
    else{
        currentPlayer = "X";
    }
    // ab current player change kar hi dia hai tho UI update kr do
    gameInfo.innerText = `Current Player - ${currentPlayer}`
}


function checkGameOver(){

    let answer = "";
    
    winningPosition.forEach((position)=>{
        //yeah condition darsa raha hai all the 3 boxes should not be empty and exaclty have a same value
        if((gameGrid[position[0]]!=="" && gameGrid[position[1]]!==""  && gameGrid[position[2]]!=="") &&(gameGrid[position[0]] === gameGrid[position[1]] && 
            gameGrid[position[1]] === gameGrid[position[2]]))
        {
            //check if winner is X
            if(gameGrid[position[0]] === "X")
                answer = "X";
            else
                answer = "O";

            //winner milna ka baad pointer event ko band karwa doo ki hum koi box mai ab press nai kar paai
            boxes.forEach((box)=>{
                box.style.pointerEvents = "none";
            })

            //ab hama pata chal gaya hai kon winner hai
            boxes[position[0]].classList.add("win");
            boxes[position[1]].classList.add("win");
            boxes[position[2]].classList.add("win");
        }
    })

    //iska matlab answer mai value hai tho winner milgaya hai so hama newgame wala button active karna hoga
    //and hama winner ko bhi show karna hoga
    if(answer !==""){
        newGameBtn.classList.add("active");
        gameInfo.innerText = `Current Player - ${answer}`;
    }

    //when there is no winner
    if(answer === ""){
        newGameBtn.classList.add("active");
        gameInfo.innerText = `Tied!`;
    }
       
}


newGameBtn.addEventListener("click",initGame);















