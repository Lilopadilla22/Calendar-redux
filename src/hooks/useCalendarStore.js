import { useDispatch, useSelector } from "react-redux"
import { onSetActiveEvent } from "../store/calendar/calendarSlice"


export const useCalendarStore = () => {

    const dispatch = useDispatch()

    const {events, activeEvents} = useSelector(state => state.calendar)

    const setActiveEvent = (calendarEvent) => {
        dispatch(onSetActiveEvent(calendarEvent))
    }
    


    return {
        //propiedades
        events,
        activeEvents,

        //metodo
        setActiveEvent
     }
}
