import React from 'react'

export const CalendarEvent = (props) => {

    const {event}  = props

    const {title, user} = event


  return (
    <>
        <strong>{title}</strong>
        <span> - {user.name}</span>
    </>
  )
}
