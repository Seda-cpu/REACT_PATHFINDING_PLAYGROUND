import { useMemo } from 'react'
import * as THREE from 'three'

const PathLine = ({ path, color = '#F9F9F9' }) => {
  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry()
    const points = path.map(p => new THREE.Vector3(p.x, 0.05, p.z))
    geo.setFromPoints(points)
    return geo
  }, [path])

  if (!path || path.length < 2) return null

  return (
    <line>
      <primitive object={geometry} attach="geometry" />
      <lineBasicMaterial 
        color={color} 
        linewidth={5} 
        toneMapped={false}
      />
    </line>
  )
}

export default PathLine
