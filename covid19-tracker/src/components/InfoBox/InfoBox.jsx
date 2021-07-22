import React from 'react';
import {Card, CardContent, Typography} from '@material-ui/core';
import {prettyText} from '../Utils/util';
import './infobox.scss'

export default function InfoBox({id, active, isRed, title, cases, total, ...props}) {
    return (
        <Card onClick={props.changeMap} key={id} className={`infoBox + ${active && "infoBox-selected"} + ${isRed && "infoBox-red"}`}>
            <CardContent>
                <Typography className="infoBox__title" color="textSecondary">{title}</Typography>
                <h2 className={`infoBox__cases + ${!isRed && 'infoBox__cases-green'}`}>{prettyText(cases)}</h2>
                <Typography className="infoBox__total" color="textSecondary">{prettyText(total)} Total</Typography>
            </CardContent>
        </Card>
    )
}
