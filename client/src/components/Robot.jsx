import { useFrame } from '@react-three/fiber'
import { useRef, useEffect, useState } from 'react'
import { useSimStore } from './store/useSimStore'
import { useGLTF, useAnimations} from '@react-three/drei'

const SPEED = 1.5 

const Robot = ({ path }) => {
  const group = useRef()
  const [currentIndex, setCurrentIndex] = useState(0);

  const robotPos = useSimStore((s)=>s.robotPos)
  const setRobotPos = useSimStore((s)=>s.setRobotPos)

  const { scene, animations } = useGLTF('/models/kedi.glb')
  const { actions } = useAnimations(animations, group)
  console.log(animations.map(a=>a.name))



  useEffect(() => {
    setCurrentIndex(0);
  }, [path])

  useFrame((_, delta) => {
    if (!group.current || !path || path.length===0 || currentIndex>=path.length) return

    const pos = group.current.position
    const target = path[currentIndex]
    const dx = target.x - pos.x
    const dz = target.z - pos.z
    const dist = Math.sqrt(dx * dx + dz * dz)

    if (dist < 0.1) {
      setCurrentIndex((prev) => prev+1)
      actions['Normal']?.play()
      actions['Walkcycle']?.stop()
      return
    } 

    const step = SPEED * delta
    pos.x += (dx / dist) * step
    pos.z += (dz / dist) * step
    setRobotPos([pos.x, pos.z])

    actions['Walkcycle']?.play()
    actions['Normal']?.stop()

    const angle = Math.atan2(dz, dx)
    group.current.rotation.y = -angle + Math.PI / 2

  })

  return (
    <group ref={group} position={[robotPos[0], 0.5, robotPos[1]]} >
      <primitive object={scene} scale={0.2}/>
    </group>
  )
}

export default Robot
