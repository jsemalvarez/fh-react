import { createSlice } from "@reduxjs/toolkit";
import { addHours } from "date-fns";

const mockEvent =     {
    _id: new Date().getTime(),
    title:'cumple del jefe',
    notes:'comprar torta',
    start: new Date(),
    end: addHours( new Date, 2),
    bgColor: '#FaFaFa',
    user:{
        _id: '123',
        name: 'Jose'
    }
}

export const calendarSlice = createSlice({
    name:'calendar',
    initialState: {
        events: [mockEvent],
        activeEvent: null,
    },
    reducers: {
        onSetActiveEvent: (state, { payload }) => {
            state.activeEvent = payload
        },
        onAddNewEvent: (state, { payload }) => {
            state.events.push( payload );
            state.activeEvent = null;
        },
        onUpdateEvent: (state, { payload }) => {
            state.events = state.events.map( event => {
                if(event._id === payload._id){
                    return payload;
                }
                return  event;
            })
        },
        onDeleteEvent: (state, { payload }) => {
            if(state.activeEvent){
                state.events = state.events.filter( event => event._id !== payload._id);
                state.activeEvent = null;
            }
        }
    }
})

export const { onSetActiveEvent, onAddNewEvent, onUpdateEvent, onDeleteEvent } = calendarSlice.actions;