import { useEffect, useState } from 'react'
import { Calendar } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import { Navbar } from '../components/Navbar'
import { localizer } from '../../Helpers/CalendarLocalizer'
import { GetMessage } from '../../Helpers/GetMessage'
import { CalendarEvent } from '../components/CalendarEvent'
import { CalendarModal } from '../components/CalendarModal'
import { useUiStore } from '../../hooks/useUiStore'
import { useCalendarStore } from '../../hooks/useCalendarStore'
import { FabAddNew } from '../components/FabAddNew'
import { DeleteNote } from '../components/DeleteNote'
import { useAuthStore } from '../../hooks/useAuthStore'

export const CalendarPage = () => {

  const {openDateModal } = useUiStore()
  const {events, setActiveEvent, startLoadingEvents} = useCalendarStore()
  const [lasView, setLasView] = useState(localStorage.getItem('lastView') || 'week')
  const {user} =useAuthStore()

  const eventStyleGetter = (event) => {

    const isMyEvents = (user.uid === event.user)

    console.log(event)
    const style = {
      backgroundColor: isMyEvents ? 'pink' : 'green',
      boderRadius: '0px',
      opacity: 0.8,
      color: 'white'
    }
    return {
      style
    }
  }

  const onDoubleClick = (event) => {
    console.log({doubleClick: event})
    openDateModal()
  }

  const onClick = (event) => {
    console.log({click: event})
    setActiveEvent(event)
  }

  const onViewChanged = (event) => {
    localStorage.setItem('lastView', event)
    setLasView(event)
    // console.log({viewChange: event})
  }

  useEffect(() => {
    startLoadingEvents()
  }, [])
  
  return (
    <>
      <Navbar/> 

      <div>
        <Calendar
          culture= 'es'
          localizer={localizer}
          events={events}
          defaultView={lasView}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 'calc( 100vh - 80px )' }}
          messages={GetMessage()}
          eventPropGetter={eventStyleGetter}
          components={{ 
            event: CalendarEvent
          }}
          onDoubleClickEvent={onDoubleClick}
          onSelectEvent={onClick}
          onView={onViewChanged}
        />
        <CalendarModal/>
        <FabAddNew/>
        <DeleteNote/>
      </div>
    </>
  )
}
