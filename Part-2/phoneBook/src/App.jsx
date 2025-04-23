import { useState } from 'react'
import PersonForm from './component/PersonForm'
import Filter from './component/Filter'
import Persons from './component/Persons'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 },
  ])

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  const handleNameChange = (event) => {
    event.preventDefault()
    setNewName(event.target.value)
  }
  const handleFilterChange = (event) => {
    event.preventDefault()
    setFilter(event.target.value)
  }
  const handleNumberChange = (event) => {
    event.preventDefault()
    setNewNumber(event.target.value)
  }

  const addContact = (event) => {
    event.preventDefault()
    if (!newName || !newNumber) return

    const person = {
      name: newName,
      number: newNumber,
    }

    const isContactAlreadyExist = persons.find((person) => {
      console.log(person.name, newName)
      return person.name === newName
    })

    if (isContactAlreadyExist) {
      alert(`${newName} is already added to phonebook`)
    }

    setPersons([...persons, person])
    setNewName('')
    setNewNumber('')
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} handleFilterChange={handleFilterChange} />
      <h3>add a new</h3>
      <PersonForm
        addContact={addContact}
        newName={newName}
        newNumber={newNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
      />
      <h3>Numbers</h3>
      <Persons filter={filter} persons={persons} />
    </div>
  )
}

export default App
