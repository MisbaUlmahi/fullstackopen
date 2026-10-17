import React, { useState, useEffect } from 'react'

const CountryDetails = ({ country }) => {
  const languages = country.languages ? Object.values(country.languages) : []

  return (
    <div>
      <h2>{country.name.common}</h2>
      <p>capital {country.capital ? country.capital[0] : 'N/A'}</p>
      <p>area {country.area}</p>

      <h3>languages:</h3>
      <ul>
        {languages.map(lang => (
          <li key={lang}>{lang}</li>
        ))}
      </ul>

      <img
        src={country.flags.png}
        alt={`Flag of ${country.name.common}`}
        width="150"
      />
    </div>
  )
}

const App = () => {
  const [value, setValue] = useState('')
  const [allCountries, setAllCountries] = useState([])
  const [selectedCountry, setSelectedCountry] = useState(null)

  useEffect(() => {
    fetch('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then(response => response.json())
      .then(data => setAllCountries(data))
      .catch(error => console.error('Error fetching countries:', error))
  }, [])

  const handleChange = (event) => {
    setValue(event.target.value)
    setSelectedCountry(null)
  }

  const matchedCountries = value.trim() === ''
    ? []
    : allCountries.filter(c =>
        c.name.common.toLowerCase().includes(value.toLowerCase())
      )

  return (
    <div>
      <div>
        find countries <input value={value} onChange={handleChange} />
      </div>

      {matchedCountries.length > 10 && (
        <p>Too many matches, specify another filter</p>
      )}

      {matchedCountries.length > 1 && matchedCountries.length <= 10 && (
        <div>
          {matchedCountries.map(country => (
            <div key={country.cca3}>
              {country.name.common}{' '}
              <button onClick={() => setSelectedCountry(country)}>show</button>
            </div>
          ))}
        </div>
      )}

      {matchedCountries.length === 1 && (
        <CountryDetails country={matchedCountries[0]} />
      )}

      {selectedCountry && (
        <CountryDetails country={selectedCountry} />
      )}
    </div>
  )
}

export default App