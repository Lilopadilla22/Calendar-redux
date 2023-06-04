import { useDispatch, useSelector } from "react-redux"
import { onAddNewEvent, onDeleteEvent, onLoadEvents, onSetActiveEvent, onUpdateEvent } from "../store/calendar/calendarSlice"
import calendarApi from "../api/calendarApi"
import { conversToeventToDate } from "../Helpers/conversToeventToDate"


export const useCalendarStore = () => {

    const dispatch = useDispatch()

    const {events, activeEvents} = useSelector(state => state.calendar)
    const {user}= useSelector(state => state.auth)

    const setActiveEvent = (calendarEvent) => {
        dispatch(onSetActiveEvent(calendarEvent))
    }

    const startSavignEvent = async (calendarEvent) => {
        //TODO: update

        if(calendarEvent.id) {
            dispatch(onUpdateEvent({...calendarEvent}))

        } else {
            const {data} = await calendarApi.post('/events', calendarEvent)
            dispatch(onAddNewEvent({...calendarEvent, id: data.event.id, user}))
        }
    }

    const startDeleteEvent = () => {
        dispatch(onDeleteEvent())
    }

    const startLoadingEvents = async () => {
        try {
            const {data} = await calendarApi.get('/events')
            const events = conversToeventToDate(data.eventos)
            dispatch(onLoadEvents(events))            
        } catch (error) {
            console.log(error)
            console.log('Error cargando Eventos')
        }
    }

    return {
        //propiedades
        events,
        activeEvents,
        hasEvenSeleted: !!activeEvents,

        //metodo
        setActiveEvent,
        startSavignEvent,
        startDeleteEvent,
        startLoadingEvents
     }
}
