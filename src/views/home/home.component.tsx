import React, { useState } from 'react';
import DashboardCard from '../../components/DashboardCard';
import { Grid } from '@mui/material';

export function HomePage(props: any) {
    const cards = [
        {
            title: 'System monitoring',
            imageUrl: '/assets/images/Healthcare.png',
            link: process.env.REACT_APP_HEALTH_DASHBOARD_URL
        },
        {
            title: 'Usage Dashboard',
            imageUrl: '/assets/images/Calendar.png',
            link: process.env.REACT_APP_POSTHOG_URL
        }
    ];

    const clickHandler = (data: any) => {
        window.open(data.link)
    }

    return (
        <React.Fragment>
            <Grid container spacing={5}>
                {cards.map(card => (
                    <Grid key={card.title} item xs={3}>
                        <DashboardCard {...card} clickHandler={clickHandler} />
                    </Grid>
                ))}
            </Grid>
        </React.Fragment >
    );
}
