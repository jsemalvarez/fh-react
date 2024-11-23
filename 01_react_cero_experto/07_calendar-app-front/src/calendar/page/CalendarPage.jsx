import { useState } from 'react';

import { Calendar } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css'

import { Navbar } from "../"
import { localizer } from '../helpers/calendarLocalizer';
import { getMessages } from '../helpers/getMessages';
import { CalendarEvent } from '../components/CalendarEvent';
import { CalendarModal } from '../components/CalendarModal';
import { useCalendarStore, useUiStore } from '../../hooks';
import { FabAddNew } from '../components/FabAddNew';
import { FabDelete } from '../components/FabDelete';


export const CalendarPage = () => {

    const { openDateModal } = useUiStore()
    const { setActiveEvent } = useCalendarStore()

    const [lastView, setLastView] = useState(localStorage.getItem('view') || 'week')

    const { events } = useCalendarStore()

    const eventStyleGetter = ( event, start, end, isSelected ) => {

        const style = {
            backgroundColor: '#347CF7',
            borderRadius: '0px',
            opacity: '0.8',
            color: 'white'
        }

        return {
            style
        }
    }

    const onSelectEvent = (event)=> {
        setActiveEvent( event )
    }

    const onDoubleClickEvent = (event)=> {
        openDateModal()
    }

    const onViewChanged = (event)=> {
        localStorage.setItem('view', event)
        setLastView(event)
    }

    return (
        <>
            <Navbar />

            <Calendar
                culture='es'
                localizer={localizer }
                events={events}
                defaultView={ lastView }
                startAccessor="start"
                endAccessor="end"
                style={{ height: 'calc(100vh - 80px)' }}
                messages={ getMessages() }
                eventPropGetter={ eventStyleGetter }
                components={{
                    event: CalendarEvent
                }}
                onSelectEvent={ onSelectEvent }
                onDoubleClickEvent={ onDoubleClickEvent }
                onView={ onViewChanged }
            />

            <CalendarModal />
            <FabAddNew />
            <FabDelete />
        </>
    )
}
