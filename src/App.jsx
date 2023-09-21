import { useState } from 'react'
import './App.css'


function App() {
  const [count, setCount] = useState(0)

    const increment = () => {
      setCount(count => count + 1)
      setCount(count => count + 1)
      setCount(count => count + 1)
    }


  return (
    <>
        <p>Compteur: {count}</p>
        <button onClick={increment} >Incrément</button>
    </>
  )
}

export default App
