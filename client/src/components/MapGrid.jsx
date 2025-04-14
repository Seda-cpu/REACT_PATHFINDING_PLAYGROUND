import {useState, useEffect} from 'react'
import { useSimStore } from './store/useSimStore'
import { GradientTexture } from '@react-three/drei'

const GRID_SIZE = 10
const CELL_SIZE = 1
const GAP = 0.05
const FINAL_SIZE = CELL_SIZE - GAP

const MapGrid = ({onCellClick}) => {

    const grid = useSimStore((s) => s.grid)
    const setGrid = useSimStore((s) => s.setGrid)

    const [bridges, setBridges] = useState([])

    const addAudio = new Audio('/sounds/pillar-add.mp3')
    const removeAudio = new Audio('/sounds/pillar-remove.mp3')

    const [hoveredCell, setHoveredCell] = useState(null)

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
      const cell = grid.flat().find(c => c.x === x && c.z === z)

      const updated = grid.map((row) => 
          row.map((cell) => 
          cell.x === x && cell.z === z 
          ? { ...cell, isObstacle: !cell.isObstacle}
          : cell
          )
      )
      setGrid(updated)
      updateBridges(updated)

      if (!cell.isObstacle) {
        addAudio.play()
      } else {
        removeAudio.play()
      }
    }
    const updateBridges = (currentGrid) => {
        const pillars = currentGrid.flat().filter((cell) => cell.isObstacle)
    
        const newBridges = []
    
        pillars.forEach((p1) => {
          pillars.forEach((p2) => {
            if (p1.x === p2.x && Math.abs(p1.z - p2.z) === 1) {
              newBridges.push({
                id: `${p1.x}-${p1.z}-${p2.x}-${p2.z}`,
                position: [p1.x, 0.25, (p1.z + p2.z) / 2],
                scale: [0.1, 0.5, 1],
              })
            }
            if (p1.z === p2.z && Math.abs(p1.x - p2.x) === 1) {
              newBridges.push({
                id: `${p1.x}-${p1.z}-${p2.x}-${p2.z}`,
                position: [(p1.x + p2.x) / 2, 0.25, p1.z],
                scale: [1, 0.5, 0.1],
              })
            }
          })
        })
    
        setBridges(newBridges)
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

            {/* Tile (Kabartmalı Hücreler) */}
            {grid.flat().map((cell, idx) => (
              <mesh
                key={idx}
                position={[cell.x, 0, cell.z]}
                scale={hoveredCell === idx ? [1.05, 1, 1.05] : [1, 1, 1]}
                onClick={() => handleClick(cell.x, cell.z)}
                onPointerOver={() => setHoveredCell(idx)}
                onPointerOut={() => setHoveredCell(null)}
              >
                <boxGeometry args={[FINAL_SIZE, 0.05, FINAL_SIZE]} />
                <meshStandardMaterial
                    color={cell.isObstacle ? '#DDA15E' : '#FEFAE0'}
                    emissive={hoveredCell === idx ? '#DDA15E' : 'black'}
                    emissiveIntensity={hoveredCell === idx ? 0.5 : 0}
                />
                
              </mesh>
            ))}

            {/* Pillars */}
            {grid.flat().map(
                (cell, idx) =>
                cell.isObstacle && (
                    <mesh key={`pillar-${idx}`} position={[cell.x, 0.25, cell.z]}>
                        <cylinderGeometry args={[0.1, 0.1, 0.7, 32]} />
                        <meshStandardMaterial color={'#BC6C25'} />
                    </mesh>
                )
            )}

            {/* Bridges */}
            {bridges.map((b) => (
                <mesh key={b.id} position={b.position}>
                <boxGeometry args={b.scale} />
                <meshStandardMaterial color={'#606C38'} />
                </mesh>
            ))}
        </>
    )
}

export default MapGrid