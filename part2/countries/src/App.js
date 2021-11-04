import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Find = (props) => {
  return (
    <div>
      find countries <input type="text" value={props.filter} onChange={props.handleFilter}/>
    </div>
  )
}

const CountriesList = ({ countries }) => (
  <div>
    <p>{countries.length} countries found:</p>
    {countries.map(country => <li key={country.ccn3}>{country.name.common}</li>)}
  </div>
)

const LanguagesList = ({ languages }) => {
  console.log('languages:',languages)
  return (
    <div>
      <h2>languages</h2>
      {Object.entries(languages).map((language) => <li key={language[0]}>{language[1]}</li> )}
    </div>
  )
}

const CountryData = ({ country }) => {
  console.log('country data:',country)
  return (
    <div>
      <p>capital {country.capital}</p>
      <p>population {country.population}</p>
      <LanguagesList languages={country.languages}/>
      <img src={country.flags.png} alt="Flag" />
    </div>
  )
}

const CountriesDisplay = ({ countries }) => {
  console.log(countries)
  const numCountries = countries.length
  console.log('Number of countries:', numCountries)
  if (numCountries > 10) {
    return (
      <div>
        <p>Too many, matches, specify another filter</p>
      </div>
    )
  } else if (numCountries > 1) {
    return (
      <CountriesList countries={countries} />
    )
  } else if (numCountries === 1) {
    return (
      <CountryData country={countries[0]} />
    )
  }
  return (
    <div>
      <p>No countries found.</p>
    </div>
  )

}

const App = () => {
  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState('')

  const hook = () => {
    console.log('effect')
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        console.log('promise fulfilled: ', response.data)
        setCountries(response.data)
      })
  }

  useEffect(hook, [])

  const handleFilter = (event) => {
    console.log('filter: ', event.target.value);
    setFilter(event.target.value)
  }

  const filterCountries = () => {
    const filteredCountries = countries.filter(country => country.name.common.toUpperCase().indexOf(filter.toUpperCase()) >= 0)
    return filteredCountries
  }

  return (
    <div>
      <Find filter={filter} handleFilter={handleFilter}/>
      <CountriesDisplay countries={filterCountries()} />
    </div>
  )
}

export default App;
