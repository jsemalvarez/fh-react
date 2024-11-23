import { useCalendarStore } from '../../hooks'


export const FabDelete = () => {

    const { startDeleteEvent, hasActiveEvent } = useCalendarStore();

    const onNewEvent = () => {
        startDeleteEvent();
    }

  return (
    <button
        className='btn btn-danger fab-danger'
        onClick={ onNewEvent }
        style={{
            display: (hasActiveEvent)? '':'none'
        }}
    >
        <i className='fas fa-trash-alt'></i>
    </button>
  )
}
