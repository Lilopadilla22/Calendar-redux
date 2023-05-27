import React from 'react'
import { Calendar } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import { Navbar } from '../components/Navbar'
import { addHours } from 'date-fns'
import { localizer } from '../../Helpers/CalendarLocalizer'
import { GetMessage } from '../../Helpers/GetMessage'


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

  return (
    <>
      <Navbar/> 
      <div>Calendar</div>
      <div>
        <Calendar
          culture= 'es'
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 500 }}
          messages={GetMessage()}
          eventPropGetter={eventStyleGetter}
        />
      </div>
    </>
  )
}
