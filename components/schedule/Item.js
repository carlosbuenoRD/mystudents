import React from 'react'
import { Draggable } from 'react-beautiful-dnd'
import { TbTrash } from 'react-icons/tb'

function Item({ clase, index }) {
  return (
    <Draggable draggableId={clase.id} index={index}>
      {(provided, snapshot) => (
        <div
          className={`h-20 border relative flex items-center justify-center ${
            clase.subject.includes('ñol')
              ? 'bg-red-300'
              : clase.subject.includes('Soci')
              ? 'bg-yellow-300'
              : clase.subject.includes('ticas')
              ? 'bg-blue-300'
              : clase.subject.includes('Natu')
              ? 'bg-green-300'
              : ''
          } ${snapshot.isDragging ? 'shadow-md' : ''}`}
          ref={provided.innerRef}
          {...provided.dragHandleProps}
          {...provided.draggableProps}
        >
          {clase.subject && (
            <TbTrash
              onClick={() => console.log(clase)}
              className='absolute top-2 right-2'
            />
          )}
          {clase.subject}
        </div>
      )}
    </Draggable>
  )
}

export default Item
