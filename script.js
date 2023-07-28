const cardscontainer = document.getElementById("cards");
let firstcard, secondcard;
let cards = [];
let score = 0;
let lockboard = false;
document.getElementById("score").textContent = "score:" + score;

fetch("./data/cards.json")
  .then((res) => res.json())
  .then((data) => {
    cards = [...data, ...data];
    shuffleCards();
    generateCards();
    console.log(cards);
  });

function shuffleCards() {
  let currentIndex = cards.length; // 18
  let randomIndex;
  let tempvalue;
  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    tempvalue = cards[currentIndex];
    cards[currentIndex] = cards[randomIndex];
    cards[randomIndex] = tempvalue;
  }
}
function generateCards() {
  for (let card of cards) {
    const cardElement = document.createElement("div");
    cardElement.classList.add("card");
    cardElement.setAttribute("data-name", card.image);
    cardElement.innerHTML = `
<div class="front">
<img class="front-image" src=${card.image}>
</div>
<div class="back"> </div>
`;
    cardscontainer.appendChild(cardElement);
    cardElement.addEventListener("click", flipCard);
    cardElement.addEventListener("touch", flipCard)
  }
}

function flipCard() {
  if (lockboard) return;
  if (this === firstcard) return;
  this.classList.add("flipped");
  if (!firstcard) {
    firstcard = this;
    return;
  }
  secondcard = this;
  lockboard = true;
  checkforMatch();
}
function checkforMatch() {
  let ismatch = firstcard.dataset.name === secondcard.dataset.name;
  if (ismatch) {
    disablecards();
  } else {
    unflipcards();
  }
}
function unlockBoard() {
  firstcard = null;
  secondcard = null;
  lockboard = false;
}
function disablecards() {
  firstcard.removeEventListener("click", flipCard);
  secondcard.removeEventListener("click", flipCard);
  
  firstcard.removeEventListener("touch", flipCard);
  secondcard.removeEventListener("touch", flipCard);
  score++;
  document.getElementById("score").textContent = "score:" + score;
  unlockBoard();
}
function unflipcards() {
  console.log("unflip");
  setTimeout(() => {
    firstcard.classList.remove("flipped");
    secondcard.classList.remove("flipped");
    unlockBoard();
  }, 1000);
}
function restart(){
  shuffleCards();
  unflipcards();
  cardscontainer.innerHTML="";
  generateCards();
  score=0;
  document.getElementById("score").textContent=score;
}


