import Game from '../game/game.mjs';
let x = 1;
let multi = document.getElementById("multi")
let info = document.getElementById("information")
let game_play = new Game();
function jouer() {
    let game_table = document.getElementById("game")
    game_table.classList.remove('hidden');
    for (let e of document.getElementsByClassName("start")) {
        e.classList.add("hidden")
    }
}

function jouer_un_coup() {
    let pos = this.id.split(" ").map(a => parseInt(a))
    let player = x?"X":"O"
    if (game_play.valid_coup(pos)) {
        game_play.coup(player, pos)
        this.innerText = player;
        if (x) this.classList.add("Red")
        if (game_play.is_null()) {
            info.innerHTML += "<br>Match Nul" ;
            x = 0;
        }
        else if (game_play.is_end()) {
            info.innerHTML += "<br>Victoire pour le joueur : " + (game_play.is_winner("X") ? "X" : "O");
            x = 0;
        }
        else {
            x = (x + 1) % 2;
            info.innerHTML += "<br>Tour de "+(x?"X":"O")
        }
    }
}

let positions = [];
for (let i = 0; i < 3; i++){
    for (let j = 0; j < 3; j ++)
        positions.push(`${i} ${j}`)
}

const affiche_loader = async () => {
    let loader = document.getElementById("loader");
    loader.classList.remove("hidden")
    loader.classList.add("absolute");
    setTimeout(() => {
        loader.classList.remove("absolute")
        loader.classList.add("hidden")
    }, 1000);
}
document.addEventListener("load", affiche_loader)
multi.addEventListener('click',jouer)
for (let e of positions) {
    document.getElementById(e).addEventListener("click", jouer_un_coup)
}