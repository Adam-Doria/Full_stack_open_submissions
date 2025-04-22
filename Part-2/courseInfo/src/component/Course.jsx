import { Content } from './Content'
import { Header } from './Header'

export const Course = ({ courses }) => {
  const courseName = 'Web development curriculum'
  return (
    <>
      <Header name={courseName} />
      {courses.map((course) => (
        <Content key={course.id} course={course} />
      ))}
    </>
  )
}
