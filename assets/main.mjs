import Game from '../game/game.mjs';
import coup_facile from '../game/ia_facile.mjs';

let x = 1;
let multi = document.getElementById("multi")
let info = document.getElementById("information")
let game_play = new Game();
document.getElementById("reset").classList.add("hidden")
function jouer() {
    document.getElementById("jouer_ia").classList.add("hidden")
    document.getElementById("niveau").classList.add("hidden")
    let game_table = document.getElementById("game")
    game_table.classList.remove('hidden');
    for (let e of document.getElementsByClassName("start")) {
        e.classList.add("hidden")
    }
}

function jouer_un_coup() {
    let niveau = document.getElementById("niveau");
    let pos = this.id.split(" ").map(a => parseInt(a))
    let player = x?"X":"O"
    if (game_play.valid_coup(pos)) {
        game_play.coup(player, pos)
        this.innerText = player;
        if (x) this.classList.add("Red")
        
        if (!game_play.is_end() && niveau[niveau.selectedIndex].value == "facile") {
            info.innerHTML += "<br>Tour de l'IA"
            pos = coup_facile(game_play);
            game_play.coup("O", pos);
            document.getElementById(pos.join(" ")).innerText = "O";
            x = (x + 1) % 2
        }
        if (game_play.is_null()) {
            info.innerHTML += "<br>Match Nul" ;
            x = 0;
            document.getElementById("reset").classList.remove("hidden")
        }
        else if (game_play.is_end()) {
            info.innerHTML += "<br>Victoire pour le joueur : " + (game_play.is_winner("X") ? "X" : "O");
            x = 0;
            document.getElementById("reset").classList.remove("hidden")
        }
        else {
            x = (x + 1) % 2;
            info.innerHTML += "<br>Tour de " + (x ? "X" : "O")
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
document.addEventListener("load", affiche_loader())
multi.addEventListener('click', async() => { document.getElementById("niveau").selectedIndex = 0; await affiche_loader(); jouer(); })
for (let e of positions) {
    document.getElementById(e).addEventListener("click", jouer_un_coup)
}
document.getElementById("ia").addEventListener("click", () => {
    document.getElementById("niveau").classList.remove("hidden")
    document.getElementById("multi").classList.add("hidden")
    document.getElementById("online").classList.add("hidden")
    document.getElementById("ia").classList.add("hidden")
    document.getElementById("jouer_ia").classList.remove("hidden")
})

document.getElementById("jouer_ia").addEventListener("click", async() => {
    if (document.getElementById("niveau").selectedIndex == 0) alert("Veillez choisir un niveau");
    else {
        await affiche_loader();
        jouer();
    }
})
document.getElementById("reset").addEventListener("click", () => window.location = "/")
document.getElementById("online").addEventListener("click", ()=>alert("Desolé, le jeu en ligne ne marche pas encore"))