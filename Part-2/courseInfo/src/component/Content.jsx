import { Part } from './Part'
import { Total } from './Total'

export const Content = ({ parts }) => {
const totalExersises = parts.reduce((acc,part)=> acc + part.exercises,0)



  return (
    <>
      {parts.map((part) => (
        <Part key={part.id} name={part.name} exercises={part.exercises} />
      ))}
      <Total total={totalExersises}/>
    </>
  )
}
