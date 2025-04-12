import { useGLTF, useAnimations } from '@react-three/drei'
import { useEffect, useRef } from 'react'



const Target = ({position}) => {
    const group = useRef()
    const { scene, animations } = useGLTF('/models/flag.glb') 
    const { actions } = useAnimations(animations, group)
    

    useEffect(() => {
        actions['Object_0']?.play()
    }, [actions])

    return (
        <group ref={group} position={[position[0], 0, position[1]]}>
            <primitive object={scene} scale={0.8} />
        </group>
    )
}


export default Target