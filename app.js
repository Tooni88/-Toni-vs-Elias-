const categories = [
  "Ones","Twos","Threes","Fours","Fives","Sixes",
  "One Pair","Two Pairs","Three of a Kind",
  "Four of a Kind","Full House","Small Straight",
  "Large Straight","Chance","Yatzy"
];

const scores = {};
let streakToni = 0;
let streakElias = 0;

const table = document.getElementById("scoreTable");

categories.forEach(cat => {
  scores[cat] = { toni: "", elias: "" };

  const row = document.createElement("tr");

  row.innerHTML = `
    <td>${cat}</td>
    <td class="score" onclick="setScore('${cat}','toni', this)">-</td>
    <td class="score" onclick="setScore('${cat}','elias', this)">-</td>
  `;

  table.appendChild(row);
});

function setScore(cat, player, cell) {
  const val = prompt(`Score for ${player.toUpperCase()} - ${cat}`);
  if (val === null) return;

  const num = parseInt(val);
  if (isNaN(num)) return;

  scores[cat][player] = num;
  cell.textContent = num;

  updateTotals();
}

function updateTotals() {
  let toni = 0, elias = 0;

  for (let c in scores) {
    toni += scores[c].toni || 0;
    elias += scores[c].elias || 0;
  }

  document.getElementById("totalToni").textContent = toni;
  document.getElementById("totalElias").textContent = elias;

  updateStreak(toni, elias);
}

function updateStreak(t, e) {
  if (t > e) {
    streakToni++;
    streakElias = 0;
  } else if (e > t) {
    streakElias++;
    streakToni = 0;
  }

  document.getElementById("streakToni").textContent = streakToni;
  document.getElementById("streakElias").textContent = streakElias;
}

function resetGame() {
  for (let c in scores) {
    scores[c].toni = "";
    scores[c].elias = "";
  }

  document.querySelectorAll(".score").forEach(cell => {
    cell.textContent = "-";
  });

  updateTotals();
}

function toggleMusic() {
  const music = document.getElementById("music");

  if (music.paused) {
    music.play();
  } else {
    music.pause();
  }
}