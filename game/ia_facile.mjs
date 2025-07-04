export default function coup_facile(game_play) {
    let positions = game_play.possible_coup()
    let index = parseInt(Math.random() * positions.length)
    return positions[index]
}