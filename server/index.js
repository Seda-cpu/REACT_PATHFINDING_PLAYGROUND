const express = require("express");
const cors = require("cors");
const astar = require("./astar")

const app = express();
app.use(cors());
app.use(express.json());


app.get("/", (req, res) => {
    res.send("Backend aktif");
});

app.listen(3001, () => {
    console.log("server on http://localhost:3001");
})

app.post('/astar', (req, res) => {
    const { grid, start, goal } = req.body

    if(!grid || !start || !goal ) {
        return res.status(400).json({error: "Eksik veri"})
    }

    const path = astar(grid, start, goal)
    res.json({path})
})