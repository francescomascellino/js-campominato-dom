/* Consegna
Copiamo la griglia fatta ieri nella nuova repo e aggiungiamo la logica del gioco (attenzione: non bisogna copiare tutta la cartella dell'esercizio ma solo l'index.html, e le cartelle js/ css/ con i relativi script e fogli di stile, per evitare problemi con l'inizializzazione di git).

Il computer deve generare 16 numeri casuali nello stesso range della difficoltà prescelta: le bombe. Attenzione: **nella stessa cella può essere posizionata al massimo una bomba, perciò nell’array delle bombe non potranno esserci due numeri uguali.

In seguito l'utente clicca su una cella: se il numero è presente nella lista dei numeri generati - abbiamo calpestato una bomba - la cella si colora di rosso e la partita termina. Altrimenti la cella cliccata si colora di azzurro e l'utente può continuare a cliccare sulle altre celle.

La partita termina quando il giocatore clicca su una bomba o quando raggiunge il numero massimo possibile di numeri consentiti (ovvero quando ha rivelato tutte le celle che non sono bombe).

Al termine della partita il software deve comunicare il punteggio, cioè il numero di volte che l’utente ha cliccato su una cella che non era una bomba.


BONUS:
Aggiungere una select accanto al bottone di generazione, che fornisca una scelta tra tre diversi livelli di difficoltà:
difficoltà 1 ⇒ 100 caselle, con un numero compreso tra 1 e 100, divise in 10 caselle per 10 righe;
difficoltà 2 ⇒ 81 caselle, con un numero compreso tra 1 e 81, divise in 9 caselle per 9 righe;
difficoltà 3 ⇒ 49 caselle, con un numero compreso tra 1 e 49, divise in 7 caselle per 7 righe;
*/

const generateBtn = document.getElementById("generateBtn");
const generateFieldForm = document.getElementById("generateFieldForm");
const resetBtn = document.getElementById("resetBtn");
const fieldElement = document.querySelector(".field");
const gameOverElement = document.getElementById("gameOver");
const gameOverMessage = document.getElementById("gameOverMessage");
const scoreCounter = document.getElementById("scoreCounter");
let scoreValue = 0;
const minesToGenerate = 16; //inserito in una variabile per eventuali modifiche
const fieldSize = document.getElementById("fieldSize");
let limit = fieldSize.value;

/**
 * ## Generates a cartain value of random numbers wich will be assigned to an array
 * @param {number} minesNumber how many random numbers have to be generated
 * @param {number} limit the maximum value the generated random number, corresponding to the number of cells on the field.
 * @returns an array of "minesNumber" values between 1 and "limit"
 */
function generateMines(minesNumber, limit) {
    const minesList = [];

    /*  With For Loop

    for (let i = 0; minesList.length < minesNumber; i++) {
    
            let mine = Math.floor(Math.random() * limit) + 1;
    
            if (!minesList.includes(mine)) {
                minesList.push(mine);
            }
    
        }
    
    */
    //Finche l'array lista di mine è inferiore del numero di mine
    while (minesList.length < minesNumber) {

        //genera un numero casuale tra 1 e il numero massimo d celle
        let mine = Math.floor(Math.random() * limit) + 1;

        //se questo valore non è incluso nell'array minesList, viene pushato dentro
        if (!minesList.includes(mine)) {

            minesList.push(mine);

        }

    }

    console.log("Mines =", minesList);
    return minesList;

}

/**
 * ### Generate Mine Field Cells
 * @param {domElement} domElement div in wich the cells will be generated 
 * @param {number} limit the number of the cells to generate
 */
function generateMineField(domElement, limit) {

    console.log("generating cells");

    //Generates an array of mines
    const minesArray = generateMines(minesToGenerate, Number(limit));

    //resets the score value
    scoreValue = 0;

    for (let i = 0; i < limit; i++) {

        //creates the cells
        const cellElement = document.createElement('div');
        cellElement.classList.add('cell');

        //calcs the cell width based on the number of cells on the grid
        cellElement.style.width = `calc(100% / ${Math.sqrt(limit)})`;

        //appends the new created cell to the markup
        domElement.append(cellElement);

        //updates the cell counter
        const cellValue = i + 1;

        //If the mines array includes the value of the cell being checked on this loop
        if (minesArray.includes(cellValue)) {

            //Adds the "mine" class to the cell
            cellElement.classList.add("mine");

            //EVIDENZIATORE MINE TEMPORANEO DI DEBUG
            cellElement.classList.add("bgRed");

        }

        //adds an event listener to the newly created cell, wich will stay on hold
        cellElement.addEventListener("click", function () {

            //If the cells do not contain the "gameOver" class
            if (!cellElement.classList.contains("gameOver")) {

                //If the cell contains the "mine" class, when clicked it's background will become red and a bomb will be displayed. The gameOver function will be invoked
                if (cellElement.classList.contains("mine")) {

                    cellElement.classList.add("bgRed");
                    console.log("Cella cliccata =", cellValue);

                    cellElement.append("💣");

                    gameOver(limit);

                    //Altrimenti se la cella non contiele la classe "bgGreen", questa viene applicata (rendendola verde e non più cliccabile)
                } else if (!cellElement.classList.contains("bgGreen")) {

                    //this fa rifermento al "soggetto" dell'eventListener
                    //Non è più possibile rimuovere la selezione e la cella mostra il suo valore
                    this.classList.add("bgGreen");
                    console.log("Cella cliccata =", cellValue);

                    // cellElement.append(cellValue);
                    cellElement.append("🚩");

                    //il contapunti viene aggiornato
                    scoreCounter.innerHTML = scoreValue += 1;
                    console.log("punteggio =", scoreValue);

                    //se sono state cliccate tutte le celle libere (limit - il numero di mine) il gioco finisce)
                    if (scoreValue == (limit - minesArray.length)) {

                        victory(limit);

                    }

                }

            }

        })

    }
};

/**
 * ### Remove Mine Field Cells
 * @param {number} limit the number ot times in wich the code will loop to remove the cells. it has the same value as the number of the cells in the field.
 */
function removeMineField(limit) {

    console.log("removing cells");

    for (let i = 0; i < limit; i++) {

        // Select the first element with class "cell"
        const cells = document.querySelector(".cell");
        //remove the selected element from the dom
        cells.remove();

        //adds the d-none class from the game over message
        gameOverElement.classList.add("d-none");

    }

    // fieldElement.innerHTML = "";

};

/**
 * ### Adds the gameOver class to each cell on the field and displays "Game Over" Message
 * @param {number} limit the number ot times in wich the code will loop to add the "gameOver" class. it has the same value as the number of the cells in the field.
 */
function gameOver(limit) {
    for (let i = 0; i < limit; i++) {

        // Crea un array con tutti i div classe "cell"
        const cellsArray = document.querySelectorAll(".cell");

        //aggiunge la classe "gameover" all'elemento all'indice i dell'array di celle fino a termine del ciclo. Gli elementi con la classe "gameOver" non sono cliccabili (vedi funzione generateMineField).
        cellsArray[i].classList.add("gameOver");

    }

    //removes the d-none class from the game over message
    gameOverElement.classList.remove("d-none");
    gameOverMessage.classList.remove("text-light", "border-success", "text-bg-success");
    gameOverMessage.classList.add("text-danger", "border-danger", "text-bg-dark");
    gameOverMessage.innerHTML = "Game Over";

};

/**
 * ### Adds the gameOver class to each cell on the field and displays "You Win" Message
 * @param {number} limit the number ot times in wich the code will loop to add the "gameOver" class. it has the same value as the number of the cells in the field. 
 */
function victory(limit) {
    for (let i = 0; i < limit; i++) {

        // Crea un array con tutti i div classe "cell"
        const cellsArray = document.querySelectorAll(".cell");

        //aggiunge la classe "gameover" all'elemento all'indice i dell'array di celle fino a termine del ciclo. Gli elementi con la classe "gameOver" non sono cliccabili (vedi funzione generateMineField).
        cellsArray[i].classList.add("gameOver");

    }

    //removes the d-none class from the game over message
    gameOverElement.classList.remove("d-none");
    gameOverMessage.classList.remove("text-danger", "border-danger", "text-bg-dark");
    gameOverMessage.classList.add("text-light", "border-success", "text-bg-success");
    gameOverMessage.innerHTML = "You Win";

}

/* Generate Field Button */
generateFieldForm.addEventListener("submit", function (e) {

    e.preventDefault();

    //adds or remove the "active" class from the button at each click
    generateFieldForm.classList.toggle("active");

    //resets the innerHtml of the score counter
    scoreCounter.innerHTML = 0;

    limit = fieldSize.value;
    console.log("Number of cells =", fieldSize.value);

    //if the button has the "active" class
    if (generateFieldForm.classList.contains("active")) {

        //changes the button inner text
        generateBtn.innerHTML = "Delete the Field";

        //disables the field size select if there is a field on screen
        fieldSize.setAttribute("disabled", "");

        //generates the cells inside the .field
        generateMineField(fieldElement, limit);

        //If the buttos doesn't have the "active" class
    } else {

        //changes the button inner text
        generateBtn.innerHTML = "Generate the Field";

        //remove the disabled attribute in the field size select if there is not a field on screen
        fieldSize.removeAttribute("disabled", "");

        //removes the cells from the .field
        removeMineField(limit);

    }

});

/* Reset Button */
resetBtn.addEventListener("click", function (e) {

    e.preventDefault();

    //resets the innerHtml of the score counter
    scoreCounter.innerHTML = 0;

    limit = fieldSize.value;
    console.log("Number of cells =", limit);

    //if the button has the "active" class (then there is a grid on screen)
    if (generateFieldForm.classList.contains("active")) {

        console.log("resetting the field");

        //removes the grid
        removeMineField(limit);

        //generates a new grid
        generateMineField(fieldElement, limit);

    }

});
