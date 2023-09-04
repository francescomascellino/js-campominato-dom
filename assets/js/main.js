/* Consegna
L'utente clicca su un bottone che genererà una griglia di gioco quadrata.
Ogni cella ha un numero progressivo, da 1 a 100.
Ci saranno quindi 10 caselle per ognuna delle 10 righe.
Quando l'utente clicca su ogni cella, la cella cliccata si colora di azzurro ed emetto un messaggio in console con il numero della cella cliccata. */

const generateBtn = document.getElementById("generateBtn");
const resetBtn = document.getElementById("resetBtn");
const fieldElement = document.querySelector(".field");
const gameOverElement = document.getElementById("gameOver");
const limit = 100;

/**
 * ### Generate Mine Field Cells
 * @param {domElement} domElement div in wich the cells will be generated 
 * @param {number} limit the number of the cells to generate
 */
function generateMineField(domElement, limit) {

    console.log("generating cells");

    //Aggiunge le mine nelle caselle il cui valore è contenuto nell'array delle mine
    const minesArray = generateMines(16, Number(limit));

    for (let i = 0; i < limit; i++) {

        const cellElement = document.createElement('div');
        cellElement.classList.add('cell');
        domElement.append(cellElement);
        const cellValue = i + 1;

        if (minesArray.includes(cellValue)) {

            cellElement.classList.add("mine");

        }

        //l'addEventListener viene associato a ogni cella ogni volta che viene creata durante il ciclo e rimane in attesa.
        cellElement.addEventListener("click", function () {

            //this fa rifermento al "soggetto" dell'eventListener
            this.classList.toggle("bgGreen");
            console.log(cellValue);

        })

    }
};

/**
 * ## Generates a cartain value of random numbers wich will be assigned to an array
 * @param {number} minesNumber how many random numbers have to be generated
 * @param {number} limit the maximum value the generated random number, corresponding to the number of cells on the field.
 * @returns an array of "minesNumber" values between 1 and "limit"
 */
function generateMines(minesNumber, limit) {
    const minesList = [];

    /* For Loop
    for (let i = 0; minesList.length < minesNumber; i++) {
    
            let mine = Math.floor(Math.random() * limit) + 1;
    
            if (!minesList.includes(mine)) {
                minesList.push(mine);
            }
    
        }
    */

    while (minesList.length < minesNumber) {

        let mine = Math.floor(Math.random() * limit) + 1;

        if (!minesList.includes(mine)) {
            minesList.push(mine);
        }

    }

    console.log("Mines =", minesList);
    return minesList;
}

/**
 * ### Remove Mine Field Cells
 * @param {number} limit the number ot times in wich the code will loop to remove the cells. it has the same value as the number of the cells in the field.
 */
function removeMineField(limit) {

    console.log("removing cells");

    /*     for (let i = 0; i < limit; i++) {
    
            // Select the first element with class "cell"
            const cells = document.querySelector(".cell");
            //remove the selected element from the dom
            cells.remove();
    
        } */

    fieldElement.innerHTML = "";

};

/**
 * ### Adds the gameOver class to each cell on the field
 * @param {number} limit the number ot times in wich the code will loop to add the "gameOver" class. it has the same value as the number of the cells in the field.
 */
function gameOver(limit) {
    for (let i = 0; i < limit; i++) {

        // Crea un array con tutti i div classe "cell"
        const cellsArray = document.querySelectorAll(".cell");
        //aggiunge la classe "gameover" all'elemento all'indfice i dell'array di celle fino a termine del ciclo
        cellsArray[i].classList.add("gameOver");

    }

    //removes the d-none class from the game over message
    gameOverElement.classList.remove("d-none");

}

/* Generate Field Button */
generateBtn.addEventListener("click", function () {

    //adds or remove the "active" class from the button at each click
    generateBtn.classList.toggle("active");

    //if the button has the "active" class
    if (generateBtn.classList.contains("active")) {

        //changes the button inner text
        generateBtn.innerHTML = "Delete the Field";

        //generates the cells inside the .field
        generateMineField(fieldElement, limit);

        //If the buttos doesn't have the "active" class
    } else {

        //changes the button inner text
        generateBtn.innerHTML = "Generate the Field";

        //removes the cells from the .field
        removeMineField(limit);

    }

});

/* Reset Button */
resetBtn.addEventListener("click", function () {

    //if the button has the "active" class (then there is a grid on screen)
    if (generateBtn.classList.contains("active")) {

        console.log("resetting the field");

        //removes the grid
        removeMineField(limit);

        //generates a new grid
        generateMineField(fieldElement, limit);

    }

});

