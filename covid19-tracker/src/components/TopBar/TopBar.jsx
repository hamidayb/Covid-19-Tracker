import { FormControl, Select, MenuItem } from "@material-ui/core"
import './topBar.scss';

export default function TopBar({ country, countries, countryChange }) {
    return (
        <div className="topBar">
            <h1>Covid-19 Tracker</h1>
            <FormControl className="dropdown">
                <Select variant="outlined" onChange={(e) => countryChange(e)} value={country}>
                    <MenuItem value="worldwide">Worldwide</MenuItem>
                        {countries.map((country,index) => (
                            <MenuItem key={index} value={country.value}>{country.name}</MenuItem>
                        ))}
                </Select>
            </FormControl>
        </div>
    )
}
