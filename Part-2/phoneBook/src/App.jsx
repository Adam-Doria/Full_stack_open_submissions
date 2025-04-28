import { useState, useEffect } from 'react'
import PersonForm from './component/PersonForm'
import Filter from './component/Filter'
import Persons from './component/Persons'
import contactService from './services/contact'
import Notification from './component/Notification'



const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [notification, setNotification] = useState({message:'',type:''})

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }
  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }
  const displayNotification  = ({message,type}) => {
    setNotification({ message, type})
    setTimeout(()=>setNotification({ message: '', type: '' }), 5000)
  }

  const addContact = (event) => {
    event.preventDefault()
    if (!newName || !newNumber) return

    const newContact = {
      name: newName,
      number: newNumber,
    }

    const isContactAlreadyExist = persons.find((person) => {
      return person.name.toLowerCase() === newName.toLowerCase()
    })

    if (isContactAlreadyExist) {
      if (
        window.confirm(
          `${isContactAlreadyExist.name} is already added to phonebook, replace the old number with a new one ?`
        )
      ) {
        contactService
          .update(isContactAlreadyExist.id, newContact)
          .then((response) => {
            setPersons(
              persons.map((person) =>
                person.id === response.id ? response : person
              )
            )
            displayNotification({
              message: `${response.name} mis à jour}`,
              type: 'success',
            })
          })
          .catch((error) =>
            console.error('Erreur lors de la mise à jour du contact', error)
          )
      }
    } else {
      contactService
        .create(newContact)
        .catch((error) =>
          console.error('Erreur lors de la création de contact', error)
        )

        setPersons([...persons, newContact])

        displayNotification({ message: `${newContact.name} added`, type: 'success' })
    }
    setNewName('')
    setNewNumber('')
  }

  const deleteContact = (id) => {
    if (!id) return
    const contactToDelete = persons.find((person) => person.id === id)

    if (window.confirm(`Delete ${contactToDelete.name} ?`)) {
      contactService
        .deleteContact(id)
        .catch((error) =>{ 
          displayNotification({ message: ` Informations of ${contactToDelete.name} has already been deleted`, type: 'error' })
          console.error('Erreur lors de la supression', error)
        })

      const newContactList = persons.filter((person) => person.id !== id)
      setPersons([...newContactList])
    }
  }

  useEffect(() => {
    contactService
      .getAll()
      .then((persons) => {
        setPersons(persons)
      })
      .catch((error) =>
        console.error('Erreur lors de la récupération des personnes', error)
      )
  }, [])

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notification.message} type={notification.type} />
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
      <Persons filter={filter} persons={persons} onDelete={deleteContact} />
    </div>
  )
}

export default App
