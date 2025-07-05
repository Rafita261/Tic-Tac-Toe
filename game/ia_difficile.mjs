import Game from "./game.mjs";

export default function coup_difficile(game_play){
    var copie_game_play = new Game();
    let heuristics = [[],[],[]]
    for (let i = 0; i < 3; i++){
        for (let j = 0; j < 3; j++){
            if (game_play.valid_coup([i,j])) {
                copie_game_play = new Game();
                copie_game_play.table = game_play.table
                copie_game_play.coup("O", [i, j])
                let h = heuristic(copie_game_play,[i,j]);
                copie_game_play.undo([i,j])
                if (h == 10) {
                    heuristics[i].push(h)
                }
                else {
                    copie_game_play = new Game();
                    copie_game_play.table = game_play.table
                    copie_game_play.coup("X", [i, j])
                    h = heuristic(copie_game_play,[i,j])
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

const heuristic = (game_play,pos) => {
    if (!game_play.is_end()) {
        if (compare(pos, [0, 1]) || compare(pos, [1, 0]) || compare(pos, [1, 2]) || compare(pos, [2, 1])) {
            return 0;
        }
        if (compare(pos, [1, 1])) {
            return 2;
        }
        return 1;
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

function compare(arr1, arr2) {
    if (arr1.length != arr2.length) return false
    for (let i in arr1) {
        if(arr1[i]!=arr2[i]) return false
    }
    return true
}