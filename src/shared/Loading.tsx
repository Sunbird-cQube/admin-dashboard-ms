import React from 'react';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

export default function Loading(props: any) {
  const { loading } = props;

  return (
    <div>
      <Backdrop sx={{ zIndex: 25000, color: '#fff' }} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
}