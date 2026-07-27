class Gameboard{
    rows=3;
    columns=3;
    board= [];
    constructor(){
        for(let i=0; i<this.rows; i++)
        {
            this.board [i]=[];
            for(let j=0; j<this.columns; j++){
                this.board[i].push(new Cell());
            }
        }
    }
    marktoken(row, column, player){
        if(this.board[row][column].getvalue()===0)
        {
            this.board[row][column].changevalue(player);
        }
        else
        {
            return `This place is already taken.`;
        }
    }
    getboard(){
        return this.board;
    }
    printBoard(){
        const boardCellValue= this.board.map((row)=> row.map((cell)=> cell.getvalue()));
        console.log(boardCellValue);
    }
    resetboard(){
        this.board.map(row=> row.map(cell=> cell.changevalue(0)));
    }
}
class Cell{
    value=0;
    changevalue(player){
        this.value=player;
    }
    getvalue(){
        return this.value;
    }
}
class GameController{
    playerOne="Player One";
    playerTwo="Player Two";
    constructor(playerOne="Player One",playerTwo="Player Two"){
        this.board= new Gameboard();
        this.player= [
            {
                name: playerOne,
                token: "X",
            },
            {
                name: playerTwo,
                token: "O",
            },
        ]
        this.activeplayer= this.player[0];
    }
    getActivePlayer(){
        return this.activeplayer;
    }
    changeturn(){
        this.activeplayer = this.activeplayer === this.player[0] ? this.player[1] : this.player[0];
    }
    checkboard(){
        const gboard= this.board.getboard().map(row => row.map(column=> column.getvalue()));
        if(gboard[0][0] === gboard[0][1] && gboard[0][1] === gboard[0][2] && gboard[0][0]!=0){
            this.board.resetboard();
            return `${this.activeplayer.name} Wins.`;
        };
        if(gboard[1][0] === gboard[1][1] && gboard[1][1] === gboard[1][2] && gboard[1][0]!=0){
            this.board.resetboard();
            return `${this.activeplayer.name} Wins.`;
        };
        if(gboard[2][0] === gboard[2][1] && gboard[2][1] === gboard[2][2] && gboard[2][0]!=0){
            this.board.resetboard();
            return `${this.activeplayer.name} Wins.`;
        };
        if(gboard[0][0] === gboard[1][0] && gboard[1][0] === gboard[2][0] && gboard[0][0]!=0){
            this.board.resetboard();
            return `${this.activeplayer.name} Wins.`;
        };
        if(gboard[0][1] === gboard[1][1] && gboard[1][1] === gboard[2][1] && gboard[0][1]!=0){
            this.board.resetboard();
            return `${this.activeplayer.name} Wins.`;
        };
        if(gboard[0][2] === gboard[1][2] && gboard[1][2] === gboard[2][2] && gboard[0][2]!=0){
            this.board.resetboard();
            return `${this.activeplayer.name} Wins.`;
        };
        if(gboard[0][0] === gboard[1][1] && gboard[1][1] === gboard[2][2] && gboard[0][0]!=0){
            this.board.resetboard();
            return `${this.activeplayer.name} Wins.`;
        };
        if(gboard[0][2] === gboard[1][1] && gboard[1][1] === gboard[2][0] && gboard[0][2]!=0){
            this.board.resetboard();
            return `${this.activeplayer.name} Wins.`;
        };
        if(!gboard.flat().includes(0)){
            this.board.resetboard();
            return "It's a draw";
        }
        return false;
    }
    playround(row, column){
        const markStatus= this.board.marktoken(row, column, this.getActivePlayer().token);
        if(markStatus=== `This place is already taken.`){
            return markStatus;
        }
        const msg= this.checkboard();
        if(msg) return msg;
        this.changeturn();
        return `${this.getActivePlayer().name}'s turn`;
    }
    restartGame(){
        document.querySelectorAll(".cell").forEach(cell=> cell.textContent="");
        this.endDialog.close();
        this.startDialog.showModal();
    }
}
class display{
    constructor(){
        this.game=0;
        this.startDialog= document.querySelector("#startDialog");
        this.startBtn= document.querySelector("#startBtn");
        this.playerOne= document.querySelector("#playerOne");
        this.playerTwo= document.querySelector("#playerTwo");
        this.cells= document.querySelector("#board");
        this.result= document.querySelector("#result");
        this.endDialog= document.querySelector("#endDialog");
        this.endResult= document.querySelector("#endResult");
        this.restartBtn= document.querySelector("#restartBtn");
        this.init();
    }
    init(){
        this.startDialog.showModal();
        this.bindEvents();
    }
    bindEvents(){
        this.startBtn.addEventListener("click", () => this.startGame());
        this.cells.addEventListener("click", (event) => this.handleCellClick(event));
        this.restartBtn.addEventListener("click", () => this.restartGame());
    }
    startGame(){
        const player1= this.playerOne.value;
        const player2= this.playerTwo.value;
        this.game= new GameController(player1, player2);
        this.startDialog.close();
    }
    handleCellClick(event){
        if(!event.target.classList.contains("cell"))return;
        if(event.target.textContent!== "")return;
        if(!this.game)return;
        const row= parseInt(event.target.dataset.row);
        const col= parseInt(event.target.dataset.col);
        const tokenToPlace= this.game.getActivePlayer().token;
        const statusMessage= this.game.playround(row, col);
        event.target.textContent= tokenToPlace;
        this.result.textContent= statusMessage;
        if(statusMessage.includes("Wins") || statusMessage.includes("draw")){
            this.endResult.textContent= statusMessage;
            this.endDialog.showModal();
        }
    }
    restartGame(){
        document.querySelectorAll(".cell").forEach(cell=> cell.textContent="");
        this.endDialog.close();
        this.game.reset();
        this.startDialog.showModal();
    }
}
const displayApp= new display();