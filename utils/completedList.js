export default function completedList(checklist) {
  let completed = checklist.list.filter((i) => i.present === false).length === 0
  return completed
}
