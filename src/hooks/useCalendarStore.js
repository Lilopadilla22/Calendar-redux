import { useDispatch, useSelector } from "react-redux"
import { onAddNewEvent, onSetActiveEvent } from "../store/calendar/calendarSlice"


export const useCalendarStore = () => {

    const dispatch = useDispatch()

    const {events, activeEvents} = useSelector(state => state.calendar)

    const setActiveEvent = (calendarEvent) => {
        dispatch(onSetActiveEvent(calendarEvent))
    }

    const startSavignEvent = async (calendarEvent) => {

        if(calendarEvent._id) {

        } else {
            dispatch(onAddNewEvent({...calendarEvent, _id: new Date().getDate()}))
        }

    }

    return {
        //propiedades
        events,
        activeEvents,

        //metodo
        setActiveEvent,
        startSavignEvent
     }
}
