import { useEffect, useState } from 'react'
import { getBackendMessage } from './api'
import './App.css'
import Scene from './components/Scene'
import ControlPanel from './components/ControlPanel'

function App() {
  const [msg, setMsg] = useState('')

  useEffect(() => {
    getBackendMessage().then(setMsg);
  }, []);

  
  return (
    <div className="app-container">
      <div className="canvas-wrapper">
        <Scene />
      </div>
      <div className="control-panel dark_moss_green">
        <div className="cornsilk" style={{padding: "5%", borderRadius: "0.5rem"}}>
          <ControlPanel />
        </div>
      </div>
    </div>
  )
}

export default App
