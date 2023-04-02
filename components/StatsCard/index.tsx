import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export default function StatsCard(props) {
    const { title, amount } = props;
    return (
        <Card>
            <CardContent>
                <Typography variant="caption" component="div">
                    {title}
                </Typography>
                <Typography variant="h4" component="span">
                    {amount}
                </Typography>
            </CardContent>
        </Card>
    );
}
