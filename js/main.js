// L’utente indica un livello di difficoltà in base al quale viene generata una griglia di gioco quadrata, in cui ogni cella contiene un numero tra quelli compresi in un range (vedi immagine allegata):
// con difficoltà 1 => tra 1 e 100
// con difficoltà 2 => tra 1 e 81
// con difficoltà 3 => tra 1 e 49
// Quando l’utente clicca su ogni cella, la cella cliccata si colora di azzurro.
// Il computer deve generare 16 numeri casuali nello stesso range della difficoltà prescelta: le bombe.
// I numeri nella lista delle bombe non possono essere duplicati.
// In seguito l’utente clicca su ogni cella: se il numero è presente nella lista dei numeri generati - abbiamo calpestato una bomba - la cella si colora di rosso e la partita termina, altrimenti la cella cliccata si colora di azzurro e l’utente può continuare a cliccare sulle altre celle.
// La partita termina quando il giocatore clicca su una bomba o raggiunge il numero massimo possibile di numeri consentiti.
// Al termine della partita il software deve scoprire tutte le bombe e comunicare il punteggio, cioè il numero di volte che l’utente ha inserito un numero consentito.

// Creo le mie variabili per la griglia e la selezione del livello, che mi serviranno al click dell btn Play
const wrapGrid = document.querySelector(".wrap-grid");

const difficultLevel = document.getElementById("level-select");

// Aggiugno evento al clic sul btn Play
const btnPlay = document.querySelector(".btn-play");

btnPlay.addEventListener("click", function () {
  //  reset di h2
  wrapGrid.innerHTML = "";

  //   Creare la griglia a seconda del livello che viene selezionato dall'utente
  const gridLevel = difficultLevel.value;

  let cellsNumber;
  let cellPerSide;

  switch (gridLevel) {
    case "1":
      cellsNumber = 100;
      cellPerSide = 10;
      break;

    case "2":
      cellsNumber = 81;
      cellPerSide = 9;
      break;

    case "3":
      cellsNumber = 49;
      cellPerSide = 7;
  }

  // Generazione delle bombe utilizzando la funzione creata
  const bombList = generateBombs(cellsNumber, 16);
  console.log("bombe generate", bombList);
  // Generazione della griglia totale (div con classe grid)
  const grid = document.createElement("div");
  grid.classList.add("grid");

  //   Generare le celle/square
  for (let i = 1; i <= cellsNumber; i++) {
    const squareElement = createGridSquare(i, cellPerSide);
    // Aggiungo allo square Element la classe square-clicked quado clicco sopra uno degli square
    squareElement.addEventListener("click", function () {
      this.classList.add("square-clicked");
    });
    // Aggiungo alla grid lo square Element
    grid.append(squareElement);
  }

  //   Appendo alla wrap grid (main in html) l'elemento creato sopra che ha la classe grid
  wrapGrid.append(grid);
});

/*****************************
 FUNZIONI
 *****************************/

function createGridSquare(num, cells) {
  // Inserire numeri crescenti con span
  const span = document.createElement("span");
  span.append(num);

  // Creare nodo square
  const square = document.createElement("div");
  square.classList.add("square", "square-number");

  square.style.width = `calc(100% / ${cells})`;

  square.style.height = `calc(100% / ${cells})`;

  //   Inserisco lo span nel nodo square
  square.append(span);

  //   Ritorno
  return square;
}

// Generare le bombe
function generateBombs(totCells, totBombs) {
  // Lista di numeri/bombe vuota
  const bombs = [];

  // Ciclo per looppare le bombe/numeri nell'array bombs
  while (bombs.length < totBombs) {
    // Generazione di un numero random da inserire nell'array delle bombe con una funzione
    const bomb = getRandomNumber(1, totCells);

    // Controllare che il numero sia univoco con if

    if (!bombs.includes(bomb)) {
      bombs.push(bomb);
    }
  }
  return bombs;
}

// Funzione per generazione di un numero random
function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
