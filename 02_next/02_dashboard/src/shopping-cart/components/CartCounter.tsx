'use client';

import { useAppDispatch, useAppSelector } from '@/app/store/store';
import { useEffect } from 'react';
import { addOne, initCounter, reset, substractOne } from '@/app/store/counter/counterSlice'

interface Props {
  value?: number;
}

export interface CounterResponse {
  method: string;
  count:  number;
}

const getApiCounter = async():Promise<CounterResponse> => {
  const data = await fetch('/api/counter').then( res => res.json() );
  return data
}


export const CartCounter = ({  value = 0 }: Props) => {

  // const [count, setCount] = useState(value);
  // const count = useAppSelector( state => state.counter.count)
  const count = useAppSelector( state => state.counter.count );
  const dispatch = useAppDispatch();

  // useEffect(() => {
  //   dispatch( initCounter(value) )
  // },[dispatch, value])

  useEffect(() => {
    getApiCounter()
      .then( ({ count }) => dispatch( initCounter(count) ) );
  }, [dispatch])

  return (
    <>
      <span className="text-9xl"> {count} </span>

      <div className="flex">
        <button
          onClick={() => dispatch( addOne() )}
          className="flex items-center justify-center p-2 rounded-xl bg-gray-900 text-white hover:bg-gray-600 transition-all w-[100px] mr-2">
          +1
        </button>

        <button
          onClick={() => dispatch( substractOne() )}
          className="flex items-center justify-center p-2 rounded-xl bg-gray-900 text-white hover:bg-gray-600 transition-all w-[100px] mr-2">
          -1
        </button>
      </div>
    </>
  )
}