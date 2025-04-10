



const Target = ({position}) => {
    return (
        <mesh position={[position[0], 0.5, position[1]]}>
            <sphereGeometry args={[0.3, 32, 32]}/>
            <meshStandardMaterial color="red"/>
        </mesh>
    )
}


export default Target