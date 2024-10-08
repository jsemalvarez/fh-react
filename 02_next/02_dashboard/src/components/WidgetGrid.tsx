'use client'
import { useAppSelector } from '@/app/store/store'
import { SimpleWidget } from './SimpleWidget'
import { IoCartOutline } from 'react-icons/io5'

export const WidgetGrid = () => {

    const counter = useAppSelector(state => state.counter )

  return (

    <div className="flex flex-wrap p-2 items-center justify-center ">

    <SimpleWidget 
        label='Productos'
        title={`${counter.count}`}
        subtitle='productos agregados'
        icon={ <IoCartOutline size={70} className='text-blue-600'/> }
        href='/dashboard/counter' 
    />

</div>
  )
}
