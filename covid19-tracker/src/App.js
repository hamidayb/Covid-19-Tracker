import './App.css';
import TopBar from './components/TopBar/TopBar';
import InfoBox from './components/InfoBox/InfoBox'
import Map from './components/Map/Map';
import Table from './components/Table/Table';
import LineGraph from './components/LineGraph/LineGraph';
import {useEffect, useState} from 'react';
import {Card, CardContent} from '@material-ui/core';
import Sort from './sort.js';

function App() {
  const [countries, setCountries] = useState([]);    
  const [country, setCountry] = useState('worldwide');
  const [countryInfo, setCountryInfo] = useState([]);
  const [tableData, setTableData] = useState([])
  
  useEffect( async () => {
    await fetch("https://disease.sh/v3/covid-19/all")
      .then(response => response.json())
      .then(data => 
      setCountryInfo(data)
      );
  }, [])

  useEffect(() => {
    const getCountries = async() => {
        await fetch("https://disease.sh/v3/covid-19/countries")
        .then(response => response.json())
        .then(data => {
            const countries = data.map(country => (
            {
                name: country.country,
                value: country.countryInfo.iso2
            }
            ));
            const sortedData = Sort(data);
            setTableData(sortedData);
            setCountries(countries);
        });
    }
    getCountries();
  }, [countries]) 

  const onCountryChange = async (event) => {
    const countryCode = event.target.value;
    
    const url = countryCode === "worldwide" 
      ? "https://disease.sh/v3/covid-19/all"
      : `https://disease.sh/v3/covid-19/countries/${countryCode}`;

    await fetch(url)
    .then(response => response.json())
    .then(data => {
      setCountry(countryCode)
      setCountryInfo(data)
    });
  }

  return (
    <div className="root">
      <div className="root__left">
        <TopBar country={country} countries={countries} countryChange={onCountryChange}></TopBar>
        <div className="root__stats">
          <InfoBox id="1" title="Coronavirus Cases" cases={countryInfo.todayCases} total={countryInfo.cases} />
          <InfoBox id="2" title="Recoverd" cases={countryInfo.todayRecovered} total={countryInfo.recovered} />
          <InfoBox id="3" title="Deaths" cases={countryInfo.todayDeaths} total={countryInfo.deaths} />
        </div>
        <Map></Map>
      </div>
      <Card className="root__right">
        <CardContent>
          <h3>Live Cases by Country</h3>
          <Table countries={tableData} />
          <h3>Worldwide new cases</h3>
          <LineGraph />
        </CardContent>
      </Card>


    </div>
  );
}

export default App;
