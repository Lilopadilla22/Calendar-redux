import { createSlice } from "@reduxjs/toolkit";
import { addHours } from "date-fns";

const tempEvents = {
    _id: new Date().getTime(),
    title: 'CUMPLEAÑOS DE SAUL',
    notes: 'salir',
    start: new Date(),
    end: addHours(new Date(), 2),
    bgColor: 'pink',
    user: {
      _id: '123', 
      name: 'Lilia'
    }
  }  

export const calendarSlice = createSlice({
    name: 'calendar',
    initialState: {
        events: [
            tempEvents
        ],
        activeEvents: null 
    },
    reducers: {
        onSetActiveEvent: (state, {payload}) => {
            state.activeEvents = payload
        }
       
    }
})


export const {onSetActiveEvent} = calendarSlice.actions