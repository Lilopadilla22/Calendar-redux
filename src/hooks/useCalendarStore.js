import { useDispatch, useSelector } from "react-redux"
import { onAddNewEvent, onDeleteEvent, onSetActiveEvent, onUpdateEvent } from "../store/calendar/calendarSlice"


export const useCalendarStore = () => {

    const dispatch = useDispatch()

    const {events, activeEvents} = useSelector(state => state.calendar)

    const setActiveEvent = (calendarEvent) => {
        dispatch(onSetActiveEvent(calendarEvent))
    }

    const startSavignEvent = async (calendarEvent) => {
        if(calendarEvent._id) {
            dispatch(onUpdateEvent({...calendarEvent}))

        } else {
            dispatch(onAddNewEvent({...calendarEvent, _id: new Date().getDate()}))
        }
    }

    const startDeleteEvent = () => {
        dispatch(onDeleteEvent())
    }

    return {
        //propiedades
        events,
        activeEvents,
        hasEvenSeleted: !!activeEvents,

        //metodo
        setActiveEvent,
        startSavignEvent,
        startDeleteEvent
     }
}
