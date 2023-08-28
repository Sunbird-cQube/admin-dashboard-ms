import React, { useState } from 'react';
import DashboardCard from '../../components/DashboardCard';
import { Grid } from '@mui/material';

export function HomePage(props: any) {
    const cards = [
        {
            title: 'System monitoring',
            imageUrl: '/assets/images/Healthcare.png',
            link: 'https://www.google.com'
        },
        {
            title: 'Usage Dashboard',
            imageUrl: '/assets/images/Calendar.png',
            link: 'https://www.google.com'
        },
        {
            title: 'Usage Dashboard',
            imageUrl: '/assets/images/Calendar.png',
            link: 'https://www.google.com'
        }
    ];

    const clickHandler = (data: any) => {
        window.open(data.link)
    }

    return (
        <React.Fragment>
            <Grid container spacing={5}>
                {cards.map(card => (
                    <Grid key={card.title} item xs={4}>
                        <DashboardCard {...card} clickHandler={clickHandler} />
                    </Grid>
                ))}
            </Grid>
        </React.Fragment >
    );
}
