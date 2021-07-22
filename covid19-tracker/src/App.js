import TopBar from './components/TopBar/TopBar';
import InfoBox from './components/InfoBox/InfoBox'
import Map from './components/Map/Map';
import Table from './components/Table/Table';
import LineGraph from './components/LineGraph/LineGraph';
import {useEffect, useState} from 'react';
import {Card, CardContent} from '@material-ui/core';
import {Sort} from './components/Utils/util';
import  "leaflet/dist/leaflet.css"
import './App.css';

function App() {
  const [countries, setCountries] = useState([]);    
  const [country, setCountry] = useState('worldwide');
  const [countryInfo, setCountryInfo] = useState([]);
  const [mapCountries, setMapCountries] = useState([]);
  const [casesType, setCasesType] = useState("cases");
  const [tableData, setTableData] = useState([]);
  const [mapCenter, setMapCenter] = useState({lat: 34.8746, lng: -40.4796});
  const [mapZoom, setMapZoom] = useState(3);
  
  useEffect( () => {
    async function fetchData () {
      await fetch("https://disease.sh/v3/covid-19/all")
        .then(response => response.json())
        .then(data => 
        setCountryInfo(data)
      );
    }
    fetchData();
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
            setMapCountries(data);
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

      if(countryCode !== "worldwide"){
        setMapCenter([data.countryInfo.lat, data.countryInfo.long]);
        setMapZoom(5);
      }else{
        setMapCenter({lat: 34.8746, lng: -40.4796});
        setMapZoom(3);
      }
    });
  }

  return (
    <div className="root">
      <div className="root__left">
        <TopBar country={country} countries={countries} countryChange={onCountryChange}></TopBar>
        <div className="root__stats">
          <InfoBox id="1" active={casesType==="cases"} isRed changeMap={() => setCasesType("cases")} title="Coronavirus Cases" cases={countryInfo.todayCases} total={countryInfo.cases} />
          <InfoBox id="2" active={casesType==="recovered"} changeMap={() => setCasesType("recovered")} title="Recoverd" cases={countryInfo.todayRecovered} total={countryInfo.recovered} />
          <InfoBox id="3" active={casesType==="deaths"} isRed changeMap={() => setCasesType("deaths")} title="Deaths" cases={countryInfo.todayDeaths} total={countryInfo.deaths} />
        </div>
        <Map countries={mapCountries} casesType={casesType}  center={mapCenter} zoom={mapZoom} />
      </div>
      <Card className="root__right">
        <CardContent>
          <h4>Live Cases by Country</h4>
          <Table countries={tableData} />
          <h4 className="root__graphTitle">Worldwide new {casesType}</h4>
          <LineGraph casesType={casesType} />
        </CardContent>
      </Card>


    </div>
  );
}

export default App;

