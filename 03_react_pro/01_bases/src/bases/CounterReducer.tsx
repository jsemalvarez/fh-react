import { useReducer } from "react"

interface CounterReducer {
    changes: number;
    value: number;
    previous: number;
}

const initilaState: CounterReducer = {
    changes: 0,
    value: 0,
    previous: 0
}   

type CounterActions = 
    | { type: 'increaseBy', payload: { value: number }}
    | { type: 'reset'}

const counterReducer = (state: CounterReducer, action: CounterActions): CounterReducer => {

    switch (action.type) {
        case 'reset':
            return {
                changes: 0,
                value: 0,
                previous: 0
            }
        
        case 'increaseBy':
            return {
                changes: state.changes + 1,
                value: state.value + action.payload.value,
                previous: state.value
            }
    
        default:
            return state;
    }
}

export const CounterReducerComponent = () => {

    const [ counter, dispatch] = useReducer(counterReducer, initilaState)

    const handleReset = () => {
        dispatch({type: 'reset'})
    }

    const increaseBy = (value:number) => {
        dispatch({type: 'increaseBy', payload: { value }})
    }

    return (
        <div>
            <h2>CounterReducer</h2>

            <pre>
                { JSON.stringify(counter, null, 2) }
            </pre>

            <button onClick={ handleReset }>reset</button>
            <button onClick={ () => increaseBy(1) }>+1</button>
            <button onClick={ () => increaseBy(5) }>+5</button>
            <button onClick={ () => increaseBy(10) }>+10</button>
        </div>
  )
}
