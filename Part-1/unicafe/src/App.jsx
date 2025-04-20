import { useState } from 'react'

const Title = ({ label }) => {
  return <h1>{label}</h1>
}

const Button = ({ label, action }) => {
  return <button onClick={action}>{label}</button>
}

const StatisticsLabel = ({ label, count }) => {
  return (
    <div>
      {label} : {count}
    </div>
  )
}

const Statistics = ({ good, bad, neutral }) => {
  const allFeedback = good + bad + neutral
  const positiveFeedbackRatio = `${(good / allFeedback) * 100} %`
  const average = (good - bad) / allFeedback
  return (
    <>
      <Title label={'Statistics'} />
      <StatisticsLabel label={'good'} count={good} />
      <StatisticsLabel label={'neutral'} count={neutral} />
      <StatisticsLabel label={'bad'} count={bad} />
      <StatisticsLabel label={'all'} count={allFeedback} />
      <StatisticsLabel label={'average'} count={average} />
      <StatisticsLabel label={'positive'} count={positiveFeedbackRatio} />
    </>
  )
}

function App() {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGoodFeedback = () => setGood((prev) => prev + 1)
  const handleNeutralFeedback = () => setNeutral((prev) => prev + 1)
  const handleBadFeedback = () => setBad((prev) => prev + 1)
  const displayStatistic = Boolean(good || bad || neutral)

  return (
    <>
      <Title label={'Give Feedback'} />
      <Button label="good" action={handleGoodFeedback} />
      <Button label="neutral" action={handleNeutralFeedback} />
      <Button label="bad" action={handleBadFeedback} />
      {displayStatistic ? (
        <Statistics good={good} neutral={neutral} bad={bad} />
      ) : (
        <div> No feedback given</div>
      )}
    </>
  )
}

export default App
