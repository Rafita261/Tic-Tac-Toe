import Game from '../game/game.mjs';
import coup_facile from '../game/ia_facile.mjs';
import coup_moyen from '../game/ia_moyen.mjs';
import coup_difficile from '../game/ia_difficile.mjs';

function afficherFinDePartie(resultat, mode) {
    let emoji = "";
    let titre = "";
    let texte = "";

    if (resultat === "victoire") {
        emoji = mode === "ia" ? "✅" : "🎉";
        titre = "Victoire !";
        texte = mode === "ia" ? "Bravo, tu as battu l'IA !" : "Félicitations ! 🎊";
    } else if (resultat === "defaite") {
        emoji = "❌";
        titre = "Dommage...";
        texte = "Tu as perdu contre l'IA.";
    } else if (resultat === "nul") {
        emoji = "🤝";
        titre = "Match nul";
        texte = mode === "ia" ? "Vous êtes à égalité avec l'IA." : "Match équilibré entre amis.";
    }

    Swal.fire({
        title: `${emoji} ${titre}`,
        text: texte,
        icon: resultat === "victoire" ? "success" : resultat === "defaite" ? "error" : "info",
        confirmButtonText: 'Rejouer',
        backdrop: true,
        background: '#f0f0f0',
        color: '#000'
    }).then(() => {
        document.getElementById("reset").click(); 
    });
}


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
    let player = x ? "X" : "O"
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
            if (game_play.is_end()) {
                if(game_play.is_winner("X"))
                    afficherFinDePartie("victoire", "ia")
                if (game_play.is_winner("O"))
                    afficherFinDePartie("defaite", "ia")
                else
                    afficherFinDePartie("nul","ia")
            }
        }
        if (!game_play.is_end() && niveau[niveau.selectedIndex].value == "moyen") {
            info.innerHTML += "<br>Tour de l'IA"
            pos = coup_moyen(game_play);
            game_play.coup("O", pos);
            document.getElementById(pos.join(" ")).innerText = "O";
            x = (x + 1) % 2
            if (game_play.is_end()) {
                if(game_play.is_winner("X"))
                    afficherFinDePartie("victoire", "ia")
                if (game_play.is_winner("O"))
                    afficherFinDePartie("defaite", "ia")
                else
                    afficherFinDePartie("nul","ia")
            }
        }
        if (!game_play.is_end() && niveau[niveau.selectedIndex].value == "difficile") {
            info.innerHTML += "<br>Tour de l'IA"
            pos = coup_difficile(game_play);
            game_play.coup("O", pos);
            document.getElementById(pos.join(" ")).innerText = "O";
            x = (x + 1) % 2
            if (game_play.is_end()) {
                if(game_play.is_winner("X"))
                    afficherFinDePartie("victoire", "ia")
                if (game_play.is_winner("O"))
                    afficherFinDePartie("defaite", "ia")
                else
                    afficherFinDePartie("nul","ia")
            }
        }
        if (game_play.is_null()) {
            info.innerHTML += "<br>Match Nul" ;
            x = 0;
            document.getElementById("reset").classList.remove("hidden")
            afficherFinDePartie("nul","multi")
        }
        else if (game_play.is_end()) {
            info.innerHTML += "<br>Victoire pour le joueur : " + (game_play.is_winner("X") ? "X" : "O");
            x = 0;
            document.getElementById("reset").classList.remove("hidden")
            afficherFinDePartie("victoire","multi")
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