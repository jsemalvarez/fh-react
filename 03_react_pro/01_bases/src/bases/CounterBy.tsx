import { useState } from "react"

interface Props {
    initialValue?: number;
}

interface CounterState {
    value: number;
    clicks: number;
}

export const CounterBy = ({initialValue = 0}: Props) => {

    const [counter, setCounter] = useState<CounterState>({
        value: initialValue,
        clicks: 0
    })

    const handleClick = (value:number) => {
        setCounter( state => ({
            value: state.value + value, 
            clicks: state.clicks + 1
        }))
    }

    return (
        <div>
            <h2>Counter: { counter.value }</h2>
            <h3>Counter: { counter.clicks }</h3>

            <button onClick={ () => handleClick(1) }>+1</button>
            <button onClick={ () => handleClick(5) }>+5</button>

        </div>
  )
}
