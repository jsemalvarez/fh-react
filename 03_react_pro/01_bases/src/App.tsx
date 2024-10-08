import './App.css'
import { Counter } from './bases/Counter'
import { CounterBy } from './bases/CounterBy'
import { CounterEffect } from './bases/CounterEffect'
import { CounterReducerComponent } from './bases/CounterReducer'

function App() {

  return (
    <>
      <h1>React Bases</h1>
      <hr />

      <Counter initialValue={ 15 }/>
      <hr />

      <CounterBy />
      <hr />

      <CounterEffect />
      <hr />

      <CounterReducerComponent />
    </>
  )
}

export default App
