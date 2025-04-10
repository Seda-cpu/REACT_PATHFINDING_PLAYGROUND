import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import MapGrid from './MapGrid'
import { useEffect, useState } from 'react'
import Cat from './Cat'
import { useSimStore } from './store/useSimStore'
import { getGridMatrix } from './utils/getGridMatrix'
import { requestAStarPath } from '../api'
import Target from './Target'




const Scene = () => {
    const targetPos = useSimStore((s) => s.target)
    const setTarget = useSimStore((s) => s.setTarget)

    const grid = useSimStore((s) => s.grid)

    const robotPos = useSimStore((s) => s.robotPos)
    const setRobotPos = useSimStore((s) => s.setRobotPos)

    const path = useSimStore((s) => s.path)
    const setPath = useSimStore((s) => s.setPath)


    /* console.log("grid: ", grid); */
    /* console.log("targetPos: ", targetPos);
    console.log("robotPos: ", robotPos); */

    useEffect(() => {

        if(!grid || !targetPos || !robotPos) return

        const matrix = getGridMatrix(grid)

        const start = {
            x: Math.round(robotPos[0]),
            z: Math.round(robotPos[1])
        } 

        const goal = {
            x: targetPos[0],
            z: targetPos[1]
        }

        requestAStarPath(matrix, start, goal).then((path) => {
            console.log("Gelen path: ", path)
            setPath(path)
        })

    }, [targetPos, grid])


    const handleCellClick = (x,z) => {
        setTarget([x,z])
    }
    return (
        
        <Canvas camera={{ position: [5,5,5], fov: 50}} shadows 
        style={{
            background: 'radial-gradient(circle at center,rgb(57, 76, 36) 0%, #283618 40%,rgb(27, 39, 13) 100%)',
          }}
          >
            <ambientLight intensity={0.3}/>
            <spotLight position={[10, 20, 10]} angle={0.35} penumbra={1} intensity={1} castShadow/>
            <directionalLight position={[5,10,5]}/>
            <OrbitControls/>
            <gridHelper args={[20, 20, '#606C38', '#606C38']} />
            <MapGrid onCellClick={handleCellClick}/>
            {targetPos && <Target position={targetPos} /> } 
            <Cat path={path} />
        </Canvas>
    )
}

export default Scene