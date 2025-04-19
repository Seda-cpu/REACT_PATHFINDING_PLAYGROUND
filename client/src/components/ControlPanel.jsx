import { useSimStore } from "./store/useSimStore";
import { useState } from "react"

const ControlPanel = () => {

    const [isOpen, setIsOpen] = useState(true)

    const mode = useSimStore((s) => s.mode)
    const setMode = useSimStore((s) => s.setMode)

    const robotType = useSimStore((s) => s.robotType)
    const setRobotType = useSimStore((s) => s.setRobotType)

    const algorithm = useSimStore((s) => s.algorithm)
    const setAlgorithm = useSimStore((s) => s.setAlgorithm)

    return (
        <>
        <button onClick={() => setIsOpen(!isOpen)} className="absolute top-4 left-4 px-3 py-1 rounded z-20 wisteria_purple">
            {isOpen ? '← Hide' : '→ Show'}
        </button>
        {
            isOpen && (
                <div className="absolute top-16 left-4 z-10 p-4 rounded-lg shadow-lg space-y-4 transition-all" >
                    <div style={{width: "220px"}}> {/* STATIK !!! */}
                        <h3 className="font-semibold text-lg mb-1" style={{color: "#283618"}}>Select Mode</h3>
                        <div style={{display: "flex", flexDirection: "row"}}>
                        <button
                            style={{marginRight: "3%" }}
                            onClick={() => setMode('target')}
                            className={`flex items-center gap-1 rounded ${
                            mode === 'target' ? 'wisteria_purple text-white' : 'pale_pink'
                            }`}
                        >
                            Target
                        </button>
                        <button
                            style={{marginRight: "3%" }}

                            onClick={() => setMode('obstacle')}
                            className={`rounded ${
                            mode === 'obstacle' ? 'wisteria_purple text-white' : 'pale_pink'
                            }`}
                        >
                            Obstacle
                        </button>
                        </div>
                    </div>

                    <div>
                        <h3 className="font-semibold text-lg mb-1" style={{color: "#283618"}}>Shortest Path Algorithm</h3>
                        <select
                            value={algorithm}
                            onChange={(e) => setAlgorithm(e.target.value)}
                            className="w-full p-2 border rounded"
                        >
                            <option value="astar">A*</option>
                            <option value="dijkstra">Dijkstra</option>
                            <option value="custom">Custom</option>
                        </select>
                    </div>
                </div>
            )
        }
        </>
    )
}
export default ControlPanel