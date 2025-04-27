import React from 'react'

export default function Persons({ persons, filter, onDelete }) {
  return persons
    .filter((person) => person.name.toLowerCase().includes(filter))
    .map((person) => (
      <div key={person.id}>
        <span>{person.name} : {person.number}{' '}</span>
        <button onClick={() => onDelete(person.id)}> delete</button>
      </div>
    ))
}
