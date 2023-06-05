import { useDispatch, useSelector } from "react-redux"
import { onAddNewEvent, onDeleteEvent, onLoadEvents, onSetActiveEvent, onUpdateEvent } from "../store/calendar/calendarSlice"
import calendarApi from "../api/calendarApi"
import { conversToeventToDate } from "../Helpers/conversToeventToDate"
import Swal from "sweetalert2"


export const useCalendarStore = () => {

    const dispatch = useDispatch()

    const {events, activeEvents} = useSelector(state => state.calendar)
    const {user}= useSelector(state => state.auth)

    const setActiveEvent = (calendarEvent) => {
        dispatch(onSetActiveEvent(calendarEvent))
    }

    const startSavignEvent = async (calendarEvent) => {
        try {

            if(calendarEvent.id) {
                await calendarApi.put(`/events/${calendarEvent.id}`, calendarEvent)
                dispatch(onUpdateEvent({...calendarEvent, user}))
                return
            } 
            const {data} = await calendarApi.post('/events', calendarEvent)
            dispatch(onAddNewEvent({...calendarEvent, id: data.event.id, user}))

        } catch (error) {
            console.log(error)
            Swal.fire('error al guardar', error.response.data?.msg, 'error')            
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
