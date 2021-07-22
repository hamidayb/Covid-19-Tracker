import { Circle, Popup } from "react-leaflet"
import numeral from "numeral";
import './utils.scss'

const mapData = {
    cases: {
        hex: "#CC1034",
        multiplier: 250
    },
    recovered: {
        hex: "#7dd71d",
        multiplier: 350
    },
    deaths: {
        hex: "#fb4443",
        multiplier: 500
    }
}

export const showDataMap = (data, casesType="cases") => (
    data.map((country, index) => (
        <Circle key={index}
            center = {[country.countryInfo.lat, country.countryInfo.long]}
            fillOpacity= {0.4}
            color = {mapData[casesType].hex}
            fillColor = {mapData[casesType].hex}
            radius = {
                Math.sqrt(country[casesType]) * mapData[casesType].multiplier
            }
        >
            <Popup>
                <div>
                    <div className="info-flag" style={{backgroundImage: `url(${country.countryInfo.flag})`}}></div>
                    <div className="info-name">{country.country}</div>
                    <div className="info-confirmed">Cases: {numeral(country.cases).format("0,0")}</div>
                    <div className="info-recovered">Recovered: {numeral(country.recovered).format("0,0")}</div>
                    <div className="info-deaths">Deaths: {numeral(country.deaths).format("0,0")}</div>
                </div>
            </Popup>
        </Circle>
        
    ))
)

export const prettyText = (value) => 
    value ? `+${numeral(value).format("0.0a")}` : "+0";

export const Sort = (data) => {
    const sortedData = [...data]
    return sortedData.sort((a, b) => { return a.cases > b.cases ? -1 : 1 })
}