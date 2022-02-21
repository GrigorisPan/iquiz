import React, { useEffect } from 'react';
import Typography from '@material-ui/core/Typography';

export default function Timer({ timeLeft, setTimeLeft }) {
  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => {
      clearInterval(interval);
      console.log('clean');
    };
  }, [setTimeLeft]);
  return (
    <Typography variant='subtitle1' style={{ color: '#ee6600' }}>
      Time: {timeLeft}
    </Typography>
  );
}
