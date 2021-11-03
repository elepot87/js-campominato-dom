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

  // Lista dei tentativi
  const tentativi = [];
  const maxTentativi = cellsNumber - bombList.length;
  console.log("tentativi possibili", maxTentativi);

  // Generazione della griglia totale (div con classe grid)
  const grid = document.createElement("div");
  grid.classList.add("grid");

  //   Generare le celle/square
  for (let i = 1; i <= cellsNumber; i++) {
    const squareElement = createGridSquare(i, cellPerSide);
    // Aggiungo evento al clic di una cella/squareElement
    squareElement.addEventListener("click", function () {
      // funzione per gestione del click
      handleSquareClick(squareElement, bombList, tentativi, maxTentativi);
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

// Funzione per gestione click
function handleSquareClick(squareElement, bombList, tentativi, maxTentativi) {
  // ottenere il numero dello square che utente ha cliccato
  const number = parseInt(squareElement.innerText);
  console.log(number);

  // capire se utente ha calpestato una bomba, quindi se il number appena restituito è nella lista delle bombe(array bombList). E poi se non è una bomba o numero già cliccato.

  if (bombList.includes(number)) {
    // console.log("hai colpito una bomba!");
    endGame(bombList, tentativi, maxTentativi);
  } else if (!tentativi.includes(number)) {
    // aggiungere colore di sfondo relativo alla casella "safe"
    squareElement.classList.add("safe");

    // aggiungere il numero alla lista dei tentativi
    tentativi.push(number);
    console.log("tentativi riusciti", tentativi);

    // controllo se numero di tentativi è uguale al maxTentativi possibili
    if (tentativi.length === maxTentativi) {
      console.log("hai vinto!");
      endGame(bombList, tentativi, maxTentativi);
    }
  }
}

// Funzione per la fine del gioco
function endGame(bombList, tentativi, maxTentativi) {
  // Ottenere tutte le celle/square - restituisce un array
  const squares = document.querySelectorAll(".square");
  console.log(squares);
  // Mostrare tutte le bombe
  for (let i = 0; i < squares.length; i++) {
    const squareElement = squares[i];
    const squareValue = parseInt(squareElement.innerText);
    console.log(squareValue);
    if (bombList.includes(squareValue)) {
      squareElement.classList.add("bomb");
    }
  }
  // Testo del messaggio per la fine del gioco
  let messaggeResult = `Complimenti, hai vinto! Hai fatto bene i ${maxTentativi} tentativi.`;

  // Se si perde
  if (tentativi.length < maxTentativi) {
    messaggeResult = `Peccato, hai perso! :( Hai azzeccato ${tentativi.length} tentativi.`;
  }

  // Creare elemento per inserire il messaggio del risultato
  const messaggeElement = document.createElement("div");
  messaggeElement.classList.add("messagge");
  messaggeElement.append(messaggeResult);

  const wrapGrid = document.querySelector(".wrap-grid");
  wrapGrid.append(messaggeElement);

  // Disabilitare le square, quindi non renderle più cliccabili
  document.querySelector(".grid").classList.add("end-game");
}
