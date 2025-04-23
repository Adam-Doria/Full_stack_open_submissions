import React from 'react'

export default function Persons({ persons,filter }) {
  return persons
    .filter((person) => person.name.toLowerCase().includes(filter))
    .map((person) => (
      <p key={person.name}>
        {person.name} : {person.number}
      </p>
    ))
}
