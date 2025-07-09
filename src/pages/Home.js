import React from 'react';
import { Box } from '@mui/material';
import HomeSlider from '../components/HomeSlider';
import LatestNews from '../components/LatestNews';
import UpcomingEvents from '../components/UpcomingEvents';
import Register from '../components/Register';
const Home = () => {
  return (
    <Box sx={{ width: '100%', overflow: 'hidden' }}>
      <HomeSlider />
      <LatestNews />
      <UpcomingEvents />
      <Register />
    </Box>
  );
};

export default Home;
