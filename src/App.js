import React from "react"
import './style.css'



export default function App() {
    const [starWarsData, setStarWarsData] = React.useState({})
    const [count, setCount] = React.useState(0)



    React.useEffect(
        () => {
            async function getData() {
                const res = await fetch("http://192.168.0.146/emeter/0")
                const data = await res.json()
                setStarWarsData(data)
                //setStarWarsData(data.emeters[0])
            }
            getData()
        }, [count])

    return (
        <div>
            <pre>{JSON.stringify(starWarsData, null, 2)} Watts</pre>
            <h2>The count is {count}</h2>
            <button onClick={() => setCount(prevCount => prevCount + 1)}> Add</button>
        </div>
    )
}