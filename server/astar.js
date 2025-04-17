function astar (grid, start, goal) {
    const rows = grid.length
    const cols = grid[0].length

    const openSet = [start] //Henüz ziyaret edilmemiş ziyaret edilmesi gereken düğümlerdir.
    const cameFrom = new Map() //Hangi hücrenin hangi hücreden geldiğini tutar, geri yol çizmek için.

    const g_score = {} //Baslangictan o hucreye kadar olan gercek maliyet
    const f_score = {} // f_score = g_score + h
    
    const key = (p) => `${p.x},${p.z}`

    for (let x=0; x<rows; x++){
        for (let z=0; z<cols; z++){
            const k = `${x},${z}`
            g_score[k] = Infinity
            f_score[k] = Infinity
        }
    } //her nokta icin baslangicta degerler sonsuz atanir.

    g_score[key(start)] = 0 //baslangic noktasinin kendisine olan mesafesi 0'dir.
    f_score[key(start)] = heuristic(start, goal)


    while (openSet.length > 0) { //Ziyaret edilmesi gereken dugumler 
        openSet.sort((a,b) => f_score[key(a)] - f_score[key(b)]) //f_score'a göre sıralanır.

        const current = openSet.shift() //en dusuk f_score'a sahip olan node alinir.
        const curKey = key(current)

        if(current.x === goal.x && current.z === goal.z) { //Hedefe ulaşıldıysa yol geri cizilir.
            return reconstructPath(cameFrom, current)
        }

        for(const neighbor of getNeighbors(current, grid)){ //komsu hucreler gezilir.
            const neighborKey = key(neighbor) //komşunun g_score'u guncellenir.
            const tentativeG = g_score[curKey] + 1 

            if (tentativeG < g_score[neighborKey]) { //eger yeni deger eski degerden daha iyiyse daha kısa yoldur.
                cameFrom.set(neighborKey, current)
                g_score[neighborKey] = tentativeG
                f_score[neighborKey] = tentativeG + heuristic(neighbor, goal)
        
                if (!openSet.some((p) => p.x === neighbor.x && p.z === neighbor.z)) {
                  openSet.push(neighbor) //ve openset'e eklenir.
                }
            }
        }
    }
    return []
}

function getNeighbors(node, grid){
    const {x,z} = node
    const moves = [
        [0, 1], [1, 0], [0, -1], [-1, 0] //sag, asagi, sol, yukari komsular
    ]
    const neighbors  = []
    for (const [dx, dz] of moves) {
        const nx = x + dx
        const nz = z + dz

        if(nx >= 0 && nx >= 0 && nx<grid.length && nz<grid[0].length && grid[nx][nz] === 0){
            neighbors.push({ x: nx, z:nz })
        }
    }
    return neighbors
}
       
function heuristic(a, b) { //Manhattan Mesafesi
    return Math.abs(a.x - b.x) + Math.abs(a.z - b.z)
}
  

function reconstructPath(cameFrom, current) { //Hedeften başlayıp, cameFrom map’ini izleyerek başlangıca kadar yolu oluşturur.
    const path = [current]
    let key = `${current.x},${current.z}`
    while (cameFrom.has(key)) {
      const prev = cameFrom.get(key)
      path.unshift(prev)
      key = `${prev.x},${prev.z}`
    }
    return path
}

module.exports = astar 