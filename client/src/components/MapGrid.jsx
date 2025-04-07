import {useState, useEffect} from 'react'
import { useSimStore } from './store/useSimStore'

const GRID_SIZE = 10
const CELL_SIZE = 1

const MapGrid = ({onCellClick}) => {

    const grid = useSimStore((s) => s.grid)
    const setGrid = useSimStore((s) => s.setGrid)

    useEffect(() => {
        const initial = []

        for (let x=0; x<GRID_SIZE; x++){
            const row = []
            for (let z=0; z < GRID_SIZE; z++){
                row.push({x,z,isObstacle: false})
            }
            initial.push(row)
        }
        setGrid(initial)
    }, [setGrid])

    const toggleObstacle = (x,z) => {
        const updated = grid.map((row) => 
            row.map((cell) => 
            cell.x === x && cell.z === z 
            ? { ...cell, isObstacle: !cell.isObstacle}
            : cell
            )
        )
        setGrid(updated)
        //onCellClick(x,z)
    }

    const mode = useSimStore((s) => s.mode)
    const setTarget = useSimStore((s) => s.setTarget)
    
    const handleClick = (x, z) => {
        if (mode === 'obstacle') {
          toggleObstacle(x, z)
        } else if (mode === 'target') {
          setTarget([x, z])
        }
    }

    return (
        <>
            {grid.flat().map((cell, idx) =>(
                <mesh key={idx} position={[cell.x,0,cell.z]} rotation={[-Math.PI/2,0,0]} onClick={() => handleClick(cell.x,cell.z)}>
                    <planeGeometry args={[CELL_SIZE, CELL_SIZE]}/>
                    <meshStandardMaterial color={cell.isObstacle ? '#fb6376ff' : '#f3efe0ff'}/>
                </mesh>
            ))}
        </>
    )
}

export default MapGrid