import React, { useState } from 'react'
import { DragDropContext } from 'react-beautiful-dnd'
import { useCTX } from '@hooks/useContextHook'
import Column from './Column'

function Schedule() {
  const { scheduleData } = useCTX()

  const handleOnDragEnd = (result) => {
    const { destination, source, draggableId } = result

    if (!destination) return

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    )
      return

    const [sourceGroup] = scheduleData.filter(
      (column) => column.day === source.droppableId
    )

    const [destinationGroup] = destination
      ? scheduleData.filter((column) => column.day === destination.droppableId)
      : { ...sourceGroup }

    // if (
    //   destinationGroup.tasks.length > 6 &&
    //   destinationGroup.day !== sourceGroup.day
    // )
    //   return

    const [movingTask] = sourceGroup.tasks.filter((t) => t.id === draggableId)
    const [destinationSpot] = destinationGroup.tasks.filter(
      (t) => t.id.split('-')[1] === movingTask.id.split('-')[1]
    )

    const newSourceGroupTasks = sourceGroup.tasks.splice(source.index, 1)
    const removingIndex = destinationGroup.tasks.filter((i) => i.subject === '')
    let newDestinationGroupTasks = destinationGroup.tasks.splice(
      destination.index,
      0,
      movingTask
    )

    const newDayList = scheduleData.map((column) => {
      if (column.day === source.day) {
        return {
          day: column.day,
          tasks: newSourceGroupTasks,
        }
      }
      if (column.day === destination.day) {
        return {
          day: column.day,
          tasks: newDestinationGroupTasks,
        }
      }
      return column
    })

    // setData(newDayList)
  }

  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <div className='grid grid-cols-5'>
        {scheduleData.map((day) => {
          return <Column key={day.day} day={day} />
        })}
      </div>
    </DragDropContext>
  )
}

export default Schedule
