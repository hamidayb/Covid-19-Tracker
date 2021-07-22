import React from 'react';
import {Card, CardContent, Typography} from '@material-ui/core';

export default function InfoBox({id, title, cases, total}) {
    return (
        <Card key={id} className="infoBox">
            <CardContent>
                <Typography className="infoBox__title" color="textSecondary">{title}</Typography>
                <h2 className="infoBox__cases">{cases}</h2>
                <Typography className="infoBox__total" color="textSecondary">{total}</Typography>
            </CardContent>
        </Card>
    )
}
