import { Part } from './Part'
import { Total } from './Total'

export const Content = ({ course }) => {
  const totalExersises = course.parts.reduce(
    (acc, part) => acc + part.exercises,
    0
  )

  return (
    <>
      <h2>{course.name}</h2>
      {course.parts.map((part) => (
        <Part
          key={part.id}
          name={part.name}
          exercises={part.exercises}
        />
      ))}
      <Total total={totalExersises} />
    </>
  )
}
