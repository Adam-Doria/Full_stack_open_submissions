import { useState, useEffect } from 'react'
import axios from 'axios'
import Country from './component/Country'
import CountryList from './component/CountryList'

const App = () => {
  const [countriesSearch, setCountriesSearch] = useState('')
  const [countries, setCountries] = useState([])
  const handleSearch = (event) => {
    setCountriesSearch(event.target.value)
  }

  const filteredCountries = countries.filter((country) =>
    country.name.common.toLowerCase().includes(countriesSearch)
  )

  useEffect(() => {
    axios
      .get('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then((response) => setCountries(response.data))
  }, [])

  return (
    <>
      <div>
        find countries :
        <input value={countriesSearch} onChange={handleSearch} />
      </div>
      {filteredCountries.length > 10 && (
        <div> too many matches, specify another filter </div>
      )}
      {filteredCountries.length < 10 &&
        filteredCountries.length > 1 &&
        filteredCountries.map((country) => (
          <CountryList country={country} key={country.name.common} />
        ))}
      {filteredCountries.length === 1 && (
        <Country data={filteredCountries[0]} />
      )}
      {filteredCountries.length === 0 && <p> no results</p>}
    </>
  )
}

export default App
