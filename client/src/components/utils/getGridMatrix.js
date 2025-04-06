export const getGridMatrix = (grid) => {
    if(!grid || grid.length === 0) return []

    return grid.map((row) => 
        row.map((cell) => (cell.isObstacle ? 1 : 0))
    )
}

//Grid fonksiyonu su sekildeydi 
/* [
    [ { x: 0, z: 0, isObstacle: false }, { x: 0, z: 1, isObstacle: true }, ... ],
    ...
] */

//Şu şekle çevirdik: 
/* [
    [0, 1, 0, 0, 1],
    [0, 0, 1, 0, 0],
    ...
] */