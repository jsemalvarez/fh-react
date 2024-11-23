import { useCalendarStore, useUiStore } from '../../hooks'
import { addHours } from 'date-fns';

export const FabAddNew = () => {

    const { openDateModal } = useUiStore();
    const { setActiveEvent } = useCalendarStore();

    const onNewEvent = () => {
        setActiveEvent({
            title:'',
            notes:'',
            start: new Date(),
            end: addHours( new Date, 2),
            bgColor: '#FaFaFa',
            user:{
                _id: '123',
                name: 'Jose'
            }
        })
        openDateModal();
    }

  return (
    <button
        className='btn btn-primary fab'
        onClick={ onNewEvent }
    >
        <i className='fas fa-plus'></i>
    </button>
  )
}
