import React, { useEffect, useState } from 'react'
import { DragDropContext } from 'react-beautiful-dnd'
import { useCTX } from '@hooks/useContextHook'
import Column from './Column'
import { times } from '@utils/data'

function Schedule() {
  const { scheduleData } = useCTX()

  const [data, setData] = useState([...scheduleData])

  useEffect(() => {
    setData(scheduleData)
  }, [data])

  const handleOnDragEnd = (result) => {
    const { destination, source, draggableId } = result

    if (!destination) return

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    )
      return

    const [sourceGroup] = data.filter(
      (column) => column.day === source.droppableId
    )

    const [destinationGroup] = destination
      ? data.filter((column) => column.day === destination.droppableId)
      : { ...sourceGroup }

    const [movingTask] = sourceGroup.tasks.filter((t) => t.id === draggableId)
    const [destinationSpot] = destinationGroup.tasks.filter(
      (t) => t.id.split('-')[1] === movingTask.id.split('-')[1]
    )

    let newSourceGroupTasks = sourceGroup.tasks.splice(source.index, 1)

    let newDestinationGroupTasks = destinationGroup.tasks.splice(
      destination.index,
      0,
      movingTask
    )
    // Removing extra item from destination and adding empty item in source
    if (destination.droppableId !== source.droppableId) {
      newSourceGroupTasks = sourceGroup.tasks.splice(source.index, 0, {
        id: `${new Date().getTime()}`,
        subject: '',
      })
      if (!destinationGroup.tasks[destination.index + 1]?.subject) {
        newDestinationGroupTasks = destinationGroup.tasks.splice(
          destination.index + 1,
          1
        )
      } else {
        let done = 0
        destinationGroup.tasks.forEach((t, i) => {
          if (done > 0) return
          console.log('ieiei', i, t)
          console.log('indedede', destinationGroup.tasks[i])
          if (
            !destinationGroup.tasks[destinationGroup.tasks.length - (i + 1)]
              .subject
          ) {
            newDestinationGroupTasks = destinationGroup.tasks.splice(
              destinationGroup.tasks.length - (i + 1),
              1
            )
            done += 1
          }
        })
      }
    }
    const newDayList = data.map((column) => {
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

    setData((prev) => {
      return newDayList
    })
  }

  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <div className='grid grid-cols-5 relative'>
        <div className='absolute h-full grid font-mono font-medium place-items-center w-fit -left-20'>
          {times.map((time) => (
            <p key={time}>{time} AM</p>
          ))}
        </div>
        {data.map((day) => {
          return <Column key={day.day} day={day} />
        })}
      </div>
    </DragDropContext>
  )
}

export default Schedule
