import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([{ name: 'Arto Hellas' }])
  const [newName, setNewName] = useState('')

  const handleChange = (event) => {
    event.preventDefault()
    setNewName(event.target.value)
  }


  const addContact = (event) => {

    event.preventDefault()
    if (! newName) return

    const person = {
      name: newName,
    }

    const isContactAlreadyExist = persons.find(
      (person) => {
        console.log( person.name, newName)
        return person.name === newName}
    )

    if (isContactAlreadyExist) {
      alert(`${newName} is already added to phonebook`)
    }

    setPersons([...persons, person])
    setNewName('')
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addContact}>
        <div>
          name: <input value={newName} onChange={handleChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map((person) => (
        <p key={person.name}>{person.name}</p>
      ))}
    </div>
  )
}

export default App
