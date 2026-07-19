function Gameboard(){
    const rows=3;
    const columns=3;
    const board= [];
    for(let i=0; i<rows; i++)
    {
        board [i]=[];
        for(let j=0; j<columns; j++)
        {
            board[i].push(Cell());
        }
    }
    const marktoken= (row, column, player) =>{
        if(board[row][column].getvalue()===0)
        {
            board[row][column].changevalue(player);
        }
        else
        {
            return `This place is already taken.`;
        }
    }
    const getboard= ()=> board;
    const printBoard= ()=>{
        const boardCellValue= board.map((row)=> row.map((cell)=> cell.getvalue()));
        console.log(boardCellValue);
    };
    const resetboard= ()=> {
        board.map(row=> row.map(cell=> cell.changevalue(0)));
    }
    return {getboard, printBoard, marktoken,resetboard};
}
function Cell(){
    let value=0;
    const changevalue= (player)=> {
        value=player;
    }
    const getvalue= ()=> value;
    return {changevalue, getvalue};
}
function GameController(playerOne="Player One", playerTwo="Player Two"){
    const board= Gameboard();
    const player= [
        {
            name: playerOne,
            token: "X",
        },
        {
            name: playerTwo,
            token: "O",
        },
    ]
    let activeplayer= player[0];
    const getActivePlayer= ()=> activeplayer;
    const changeturn= ()=> {activeplayer = activeplayer === player[0] ? player[1] : player[0]};
    const checkboard= () => {
        const gboard= board.getboard().map(row => row.map(column=> column.getvalue()));
        if(gboard[0][0] === gboard[0][1] && gboard[0][1] === gboard[0][2] && gboard[0][0]!=0){
            board.resetboard();
            return `${activeplayer.name} Wins.`;
        };
        if(gboard[1][0] === gboard[1][1] && gboard[1][1] === gboard[1][2] && gboard[1][0]!=0){
            board.resetboard();
            return `${activeplayer.name} Wins.`;
        };
        if(gboard[2][0] === gboard[2][1] && gboard[2][1] === gboard[2][2] && gboard[2][0]!=0){
            board.resetboard();
            return `${activeplayer.name} Wins.`;
        };
        if(gboard[0][0] === gboard[1][0] && gboard[1][0] === gboard[2][0] && gboard[0][0]!=0){
            board.resetboard();
            return `${activeplayer.name} Wins.`;
        };
        if(gboard[0][1] === gboard[1][1] && gboard[1][1] === gboard[2][1] && gboard[0][1]!=0){
            board.resetboard();
            return `${activeplayer.name} Wins.`;
        };
        if(gboard[0][2] === gboard[1][2] && gboard[1][2] === gboard[2][2] && gboard[0][2]!=0){
            board.resetboard();
            return `${activeplayer.name} Wins.`;
        };
        if(gboard[0][0] === gboard[1][1] && gboard[1][1] === gboard[2][2] && gboard[0][0]!=0){
            board.resetboard();
            return `${activeplayer.name} Wins.`;
        };
        if(gboard[0][2] === gboard[1][1] && gboard[1][1] === gboard[2][0] && gboard[0][2]!=0){
            board.resetboard();
            return `${activeplayer.name} Wins.`;
        };
        if(!gboard.flat().includes(0)){
            board.resetboard();
            return "It's a draw";
        }
        return false;
    }
    const playround= (row, column) => {
        board.marktoken(row, column, getActivePlayer().token);
        const msg= checkboard();
        if(msg) return msg;
        changeturn();
        return `${getActivePlayer().name}'s turn`;
    };
    return {playround, getActivePlayer, checkboard};
}
function display(){
    let game=0;
    const startDialog= document.querySelector("#startDialog");
    const startBtn= document.querySelector("#startBtn");
    const playerOne= document.querySelector("#playerOne");
    const playerTwo= document.querySelector("#playerTwo");
    startDialog.showModal();
    startBtn.addEventListener("click",()=>{
        const player1=playerOne.value;
        const player2=playerTwo.value;
        game=GameController(player1, player2);
        startDialog.close();
    })
    const cells= document.querySelector("#board");
    const result= document.querySelector("#result");
    const endDialog= document.querySelector("#endDialog");
    const endResult= document.querySelector("#endResult");
    const restartBtn= document.querySelector("#restartBtn");
    cells.addEventListener("click", (event) => {
        if(event.target.classList.contains("cell")){
            if (event.target.textContent !== "") return; 
            const row= parseInt(event.target.dataset.row);
            const col= parseInt(event.target.dataset.col);
            const tokenToPlace= game.getActivePlayer().token;
            const statusMessage= game.playround(row, col);
            event.target.textContent= tokenToPlace;
            result.textContent= statusMessage;
            if (statusMessage.includes("Wins") || statusMessage.includes("draw")) {
                endResult.textContent= statusMessage;
                endDialog.showModal();
            }
        }
    });
    restartBtn.addEventListener("click",() => {
        document.querySelectorAll(".cell").forEach(cell => cell.textContent = "");
        endDialog.close();
    })
}
display();