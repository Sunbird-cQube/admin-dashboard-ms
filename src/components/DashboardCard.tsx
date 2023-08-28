import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

interface Props {
  title: string;
  imageUrl: string;
  clickHandler: (data: any) => void;
}

export default function DashboardCard(props: Props) {
  const { title, imageUrl, clickHandler } = props;
  return (
    <Card onClick={() => clickHandler(props)} style={{cursor: 'pointer'}}>
      <CardContent>
        <Typography sx={{ fontSize: 14, textAlign: 'center', fontWeight: '700' }} color="#3A3846" gutterBottom>
          {title} 
        </Typography>
      </CardContent>
      <CardMedia
        sx={{ height: 200, backgroundSize: 'auto' }}
        image={imageUrl}
        title={title}
      />
    </Card>
  );
}
