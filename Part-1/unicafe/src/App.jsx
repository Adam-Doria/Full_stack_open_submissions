import { useState } from 'react'

const Title = ({ label }) => {
  return <h1>{label}</h1>
}

const Button = ({ label, action }) => {
  return <button onClick={action}>{label}</button>
}

const Statistics = ({ label, count }) => {
  return (
    <div>
      {label} : {count}
    </div>
  )
}

function App() {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGoodFeedback = ()=> setGood((prev) => prev + 1)
  const handleNeutralFeedback = ()=> setNeutral((prev) => prev + 1)
  const handleBadFeedback = ()=> setBad((prev) => prev + 1)

  return (
    <>
      <Title label={'Give Feedback'} />
      <Button label="good" action={handleGoodFeedback} />
      <Button label="neutral" action={handleNeutralFeedback} />
      <Button label="bad" action={handleBadFeedback} />

      <Title label={'Statistics'} />
      <Statistics label={'good'} count={good} />
      <Statistics label={'neutral'} count={neutral} />
      <Statistics label={'bad'} count={bad} />
    </>
  )
}

export default App
