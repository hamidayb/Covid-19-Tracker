import React from 'react'
import './table.scss'

export default function Table({ countries }) {
    return (
        <div className="table">
            {countries.map(({country, cases}, index) => (
            <tr key={index}>
                    <td>{country}</td>
                    <td><strong>{cases}</strong></td>
                </tr>
            ))}
        </div>
    )
}
