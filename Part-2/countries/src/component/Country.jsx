import { useEffect, useState } from 'react'
import axios from 'axios'

export default function Country({ data }) {
  const [meteo, setMeteo] = useState([])
  const languages = Object.values(data.languages)
  useEffect(() => {
    axios
      .get(
        `https://api.open-meteo.com/v1/forecast?latitude=${data.capitalInfo.latlng[0]}&longitude=${data.capitalInfo.latlng[1]}&current=wind_speed_10m,temperature_2m`
      )
      .then((response) => setMeteo(response.data))
  }, [])

  console.log(meteo)
  return (
    <>
      <h3>{data.name.common}</h3>
      <p> Capital : {data.capital[0]}</p>
      <p> Area : {data.area}</p>
      <h3>Languages</h3>
      <ul>
        {languages.map((language) => (
          <li key={language}> {language}</li>
        ))}
      </ul>
      <img src={`${data.flags.png}`} alt={`${data.flags.alt}`} />
      <h3>Weather in {data.capital[0]}</h3>
      <p>Temperature {meteo?.current?.temperature_2m}°C</p>
      <p>Wind {meteo?.current?.wind_speed_10m}m/s</p>
    </>
  )
}
