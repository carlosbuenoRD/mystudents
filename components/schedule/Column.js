import React from 'react'
import { Droppable } from 'react-beautiful-dnd'
import Item from './Item'

function Column({ day }) {
  return (
    <Droppable droppableId={day.day}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.droppableProps}
          className='border'
        >
          {day.tasks.map((clase, i) => (
            <Item key={clase.id} clase={clase} index={i} />
          ))}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  )
}

export default Column
