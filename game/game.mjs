function compare(arr1, arr2) {
    if (arr1.length != arr2.length) return false
    for (let i in arr1) {
        if(arr1[i]!=arr2[i]) return false
    }
    return true
}

export default class Game{
    constructor(table = [["", "", ""],["", "", ""],["", "", ""]]) {
        this.table = table
    }
    is_winner(player) {
        // Lignes Horizontal
        for (let i = 0; i < 3; i++){
            if (compare(this.table[i],[player, player, player])) return true;
        }
        // Lignes Vertical
        for (let i = 0; i < 3; i++){
            if (compare([this.table[0][i], this.table[1][i], this.table[2][i]] , [player, player, player])) return true;
        }
        // Les 2 diagonales
        if (compare([this.table[0][0], this.table[1][1], this.table[2][2]] , [player, player, player]) || compare([this.table[0][2], this.table[1][1], this.table[2][0]] , [player, player, player])) return true;
        
        return false;
    }
    is_end() {
        var k = true;
        for (let e of this.table) {
            for (let f of e) {
                if (f == "") {
                    k = false; break;
                }
            }
        }
        return this.is_winner("O") || this.is_winner("X") || k;
    }
    is_null() {
        return !(this.is_winner("O") || this.is_winner("X")) && this.is_end();
    }
    //Jouer un coup
    coup(player, positions) {
        if(this.valid_coup(positions))
            this.table[positions[0]][positions[1]] = player
    }
    // Vérifier si c'est un coup valide
    valid_coup(positions) {
        return this.table[positions[0]][positions[1]] == "" && !this.is_end();
    }
    // Liste des coups possibles
    possible_coup() {
        let pos = [];
        for (let i = 0; i < 3; i++){
            for (let j = 0; j < 3; j++){
                if (this.table[i][j]=="") pos.push([i,j])
            }
        }
        return pos;
    }
    undo(pos) {
        this.table[pos[0]][pos[1]] = ""
    }
}

