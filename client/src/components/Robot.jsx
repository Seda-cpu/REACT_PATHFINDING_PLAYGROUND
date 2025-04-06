import { useFrame } from '@react-three/fiber'
import { useRef } from 'react'

const SPEED = 1.5 

const Robot = ({ target }) => {
  const meshRef = useRef()

  useFrame((_, delta) => {
    if (!meshRef.current || !target) return

    const pos = meshRef.current.position
    const targetVec = { x: target[0], z: target[1] }

    const dx = targetVec.x - pos.x
    const dz = targetVec.z - pos.z
    const dist = Math.sqrt(dx * dx + dz * dz)

    if (dist < 0.05) return 

    const step = SPEED * delta
    pos.x += (dx / dist) * step
    pos.z += (dz / dist) * step
  })

  return (
    <mesh ref={meshRef} position={[0, 0.5, 0]}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="#BC6C25" />
    </mesh>
  )
}

export default Robot
