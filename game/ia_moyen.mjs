import Game from "./game.mjs";

export default function coup_moyen(game_play) {
    var copie_game_play = new Game();
    let heuristics = [[],[],[]]
    for (let i = 0; i < 3; i++){
        for (let j = 0; j < 3; j++){
            if (game_play.valid_coup([i,j])) {
                copie_game_play = new Game();
                copie_game_play.table = game_play.table
                copie_game_play.coup("O", [i, j])
                let h = heuristic(copie_game_play);
                copie_game_play.undo([i,j])
                if (h == 10) {
                    heuristics[i].push(h)
                }
                else {
                    copie_game_play = new Game();
                    copie_game_play.table = game_play.table
                    copie_game_play.coup("X", [i, j])
                    h = heuristic(copie_game_play)
                    heuristics[i].push(h)
                    copie_game_play.undo([i,j])
                }
            }
            else {
                heuristics[i].push(-10)
            }
        }
    }
    console.log(heuristics,random_max_index(heuristics))
    return random_max_index(heuristics);
}

const heuristic = (game_play) => {
    if (!game_play.is_end()) {
        return 0;
    }
    if (game_play.is_winner("O")) {
        return 10;
    }
    if (game_play.is_winner("X")) {
        return 5;
    }
}

const random_max_index = (arr) => {
    let max = -Infinity;
    let index = [[0,0]]
    for (let i in arr) {
        for (let j in arr[0]) {
            if (max <= arr[i][j]) {
                let last = index.pop()
                if (max != arr[i][j]) {
                    index = [];
                    index.push([parseInt(i),parseInt(j)])
                }
                else{
                    index.push(last)
                    index.push([parseInt(i),parseInt(j)])
                }
                max = arr[i][j]
            }
        }
    }
    console.log(index)
    return index[parseInt(Math.random()*index.length)];
}