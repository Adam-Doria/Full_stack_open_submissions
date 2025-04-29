import React from 'react'

export default function Country({ data }) {

  const languages = Object.values(data.languages)

  return <> 
  <h3>{data.name.common}</h3>
  <p> Capital : {data.capital[0]}</p>
  <p> Area : {data.area}</p>
  <h3>Languages</h3>
  <ul>
    {languages.map(language => <li key={language}> {language}</li>)}
  </ul>
  <img src={`${data.flags.png}`} alt={`${data.flags.alt}`}/>
  </>
}
