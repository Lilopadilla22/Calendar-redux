import React, { useState } from 'react'
import { Calendar } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import { Navbar } from '../components/Navbar'
import { addHours } from 'date-fns'
import { localizer } from '../../Helpers/CalendarLocalizer'
import { GetMessage } from '../../Helpers/GetMessage'
import { CalendarEvent } from '../components/CalendarEvent'
import { CalendarModal } from '../components/CalendarModal'


const events = [{
  title: 'cumple',
  notes: 'salir',
  start: new Date(),
  end: addHours(new Date(), 2),
  bgColor: 'pink',
  user: {
    id: '123', 
    name: 'Lilia'
  }
}]

export const CalendarPage = () => {

  const [lasView, setLasView] = useState(localStorage.getItem('lastView') || 'week')

  const eventStyleGetter = (event, start, end, isSelected) => {

    const style = {
      backgroundColor: 'pink',
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
  }

  const onClick = (event) => {

    console.log({click: event})
  }

  const onViewChanged = (event) => {

    localStorage.setItem('lastView', event)
    setLasView(event)
    // console.log({viewChange: event})
  }

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
          style={{ height: 500 }}
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
      </div>
    </>
  )
}
