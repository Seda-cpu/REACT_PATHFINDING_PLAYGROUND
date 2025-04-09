function astar (grid, start, goal) {
    const rows = grid.length
    const cols = grid[0].length

    const openSet = [start]
    const cameFrom = new Map()

    const g_score = {}
    const f_score = {}
    
    const key = (p) => `${p.x},${p.z}`

    for (let x=0; x<rows; x++){
        for (let z=0; z<cols; z++){
            const k = `${x},${z}`
            g_score[k] = Infinity
            f_score[k] = Infinity
        }
    }

    g_score[key(start)] = 0
    f_score[key(start)] = heuristic(start, goal)


    while (openSet.length > 0) {
        openSet.sort((a,b) => f_score[key(a)] - f_score[key(b)])

        const current = openSet.shift()
        const curKey = key(current)

        if(current.x === goal.x && current.z === goal.z) {
            return reconstructPath(cameFrom, current)
        }

        for(const neighbor of getNeighbors(current, grid)){
            const neighborKey = key(neighbor)
            const tentativeG = g_score[curKey] + 1

            if (tentativeG < g_score[neighborKey]) {
                cameFrom.set(neighborKey, current)
                g_score[neighborKey] = tentativeG
                f_score[neighborKey] = tentativeG + heuristic(neighbor, goal)
        
                if (!openSet.some((p) => p.x === neighbor.x && p.z === neighbor.z)) {
                  openSet.push(neighbor)
                }
            }
        }
    }
    return []
}

function getNeighbors(node, grid){
    const {x,z} = node
    const moves = [
        [0, 1], [1, 0], [0, -1], [-1, 0]
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
      
function heuristic(a, b) {
    return Math.abs(a.x - b.x) + Math.abs(a.z - b.z)
}
  

function reconstructPath(cameFrom, current) {
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