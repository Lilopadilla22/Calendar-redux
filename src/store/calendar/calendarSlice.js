import { createSlice } from "@reduxjs/toolkit";

// const tempEvents = {
//     _id: new Date().getTime(),
//     title: 'CUMPLEAÑOS DE SAUL',
//     notes: 'salir',
//     start: new Date(),
//     end: addHours(new Date(), 2),
//     bgColor: 'pink',
//     user: {
//       _id: '123', 
//       name: 'Lilia'
//     }
//   }  

export const calendarSlice = createSlice({
    name: 'calendar',
    initialState: {
        isLoadingEvents: true,
        events: [
            // tempEvents
        ],
        activeEvents: null 
    },
    reducers: {
        onSetActiveEvent: (state, {payload}) => {
            state.activeEvents = payload
        },

        onAddNewEvent: (state, {payload}) => {
            state.events.push(payload)
            state.activeEvents = null 
        },

        onUpdateEvent: (state, {payload}) => {
            state.events = state.events.map(event => {

                if(event.id === payload.id){

                    return payload
                }
                return event
            })
        },

        onDeleteEvent: (state) => {
            if(state.activeEvents) {
                state.events= state.events.fill(event => event.id !== state.activeEvents.id)
                state.activeEvents=null
            }            
        },
        
        onLoadEvents: (state, {payload}) => {
            state.isLoadingEvents = false
            // state.events= payload
            payload.forEach(event => {
                const exists = state.events.some(dbEvent => dbEvent.id === event.id)
                if(!exists) {
                    state.events.push(event)
                }
            });
        },

        onLogoutCalendar: (state) => {
            state.isLoadingEvents= true,
            state.events= [],
            state.activeEvents= null 
        }
    }
})


export const {onSetActiveEvent, onAddNewEvent, onUpdateEvent,  onDeleteEvent, onLoadEvents, onLogoutCalendar} = calendarSlice.actions