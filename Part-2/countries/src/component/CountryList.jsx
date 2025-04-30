import { useState } from 'react'
import Country from './Country'
const CountryList = ({ country }) => {
  const [showCountry, setShowCountry] = useState(false)

  const handleShowCountry = () => {
    setShowCountry(!showCountry)
  }
  
  return (
    <>
      <div key={country.name.common}>
        {country.name.common}
        <button onClick={() => handleShowCountry(country)}>
          {showCountry ? 'hide' : 'show'}
        </button>
      </div>
      {showCountry && <Country data={country} />}
    </>
  )
}

export default CountryList
