import { useFrame } from '@react-three/fiber'
import { useRef, useEffect, useState } from 'react'
import { useSimStore } from './store/useSimStore'

const SPEED = 1.5 

const Robot = ({ path }) => {
  const meshRef = useRef()
  const [currentIndex, setCurrentIndex] = useState(0);

  const robotPos = useSimStore((s)=>s.robotPos)
  const setRobotPos = useSimStore((s)=>s.setRobotPos)

  useEffect(() => {
    setCurrentIndex(0);
  }, [path])

  useFrame((_, delta) => {
    if (!meshRef.current || !path || path.length===0 || currentIndex>=path.length) return

    const pos = meshRef.current.position
    const target = path[currentIndex]
    const dx = target.x - pos.x
    const dz = target.z - pos.z
    const dist = Math.sqrt(dx * dx + dz * dz)

    if (dist < 0.1) {
      setCurrentIndex((prev) => prev+1)
      return
    } 

    const step = SPEED * delta
    pos.x += (dx / dist) * step
    pos.z += (dz / dist) * step
    setRobotPos([pos.x, pos.z])
  })

  return (
    <mesh ref={meshRef} position={[robotPos[0], 0.5, robotPos[1]]} >
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="#BC6C25" />
    </mesh>
  )
}

export default Robot
