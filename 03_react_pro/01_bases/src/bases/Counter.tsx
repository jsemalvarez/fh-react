import { useState } from "react"

interface Props {
    initialValue?: number;
}
// {initialValue:number = 0} no funciona porque estamos renombrando initialValue a number,
// no le estamos indicando el tipo de valor
export const Counter = ({initialValue = 0}: Props) => {

    const [counter, setCounter] = useState(initialValue)

    const handleClick = () => {
        setCounter( state => state + 1)
    }

    return (
        <div>
            <h2>Counter: { counter }</h2>

            <button
            onClick={ handleClick }
            >
                +1
            </button>
        </div>
  )
}
