import React from 'react'

import { useUiStore } from '../../hooks/useUiStore'
import { useCalendarStore } from '../../hooks/useCalendarStore'


export const DeleteNote = () => {

    const {startDeleteEvent, hasEvenSeleted} = useCalendarStore()

    const handleDelete = () => {
        startDeleteEvent()
    }

  return (
    <button className='btn btn-danger fab-delete' onClick={handleDelete} style={{
        display: hasEvenSeleted ? ' ' : 'none'
    }}>
        <i className='fas fa-trash-alt'></i>
    </button>
  )
}
