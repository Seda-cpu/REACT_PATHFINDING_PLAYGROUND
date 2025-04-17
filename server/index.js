const express = require("express");
const cors = require("cors");
const astar = require("./astar")
// const runDijkstra = require("./dijkstra")

const app = express();
app.use(cors());
app.use(express.json());


app.get("/", (req, res) => {
    res.send("Backend aktif");
});

app.listen(3001, () => {
    console.log("server on http://localhost:3001");
})

// app.post('/astar', (req, res) => {
//     const { grid, start, goal, algorithm } = req.body

//     if(!grid || !start || !goal ) {
//         return res.status(400).json({error: "Eksik veri"})
//     }

//     let result = []

//     if(algorithm == "astar") result = astar(grid, start, goal)
//     else if (algorithm === 'dijkstra') result = runDijkstra(grid, start, goal)
//     else return res.status(400).json({ error: 'Geçersiz algoritma' })

//     res.json({path: result})
// })


app.post('/astar', (req, res) => {
    const { grid, start, goal } = req.body

    if(!grid || !start || !goal ) {
        return res.status(400).json({error: "Eksik veri"})
    }

    const path = astar(grid, start, goal)
    res.json({path})
})
