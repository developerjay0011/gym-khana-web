import React, { useState, useEffect } from 'react';
import { Carousel } from 'antd';
import { getSliderItems } from '../services/api';
import styled from 'styled-components';
import './HomeSlider.css';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import SwipeableViews from 'react-swipeable-views';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import MobileStepper from '@mui/material/MobileStepper';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Container from '@mui/material/Container';
import NewspaperIcon from '@mui/icons-material/Newspaper';
import EventIcon from '@mui/icons-material/Event';
import PhotoLibraryIcon from '@mui/icons-material/PhotoLibrary';
import EmojiEventsOutlinedIcon from '@mui/icons-material/EmojiEventsOutlined';
const quickLinks = [
  {
    icon: <NewspaperIcon sx={{ fontSize: 40 }} />,
    title: 'Latest News',
    link: '/#/news',
    color: '#FF4081',
  },
  {
    icon: <EventIcon sx={{ fontSize: 40 }} />,
    title: 'Events Calendar',
    link: '/#/events',
    color: '#FFD700',
  },
  {
    icon: <PhotoLibraryIcon sx={{ fontSize: 40 }} />,
    title: 'Gallery',
    link: '/#/gallery',
    color: '#00E676',
  },
  {
    icon: <EmojiEventsOutlinedIcon sx={{ fontSize: 40 }} />,
    title: 'History',
    link: '/#/history',
    color: '#40C4FF',
  },
];


const BACKEND_URL = 'https://gmk-web-api.chronopulse.com';

const HomeSlider = () => {
  const [slides, setSlides] = useState([]);
  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    setActiveStep((prevStep) => (prevStep + 1) % slides.length);
  };

  const handleBack = () => {
    setActiveStep((prevStep) => (prevStep - 1 + slides.length) % slides.length);
  };

  useEffect(() => {
    const fetchSlides = async () => {
      try {
        const data = await getSliderItems();
        // Add full URL to image paths
        const slidesWithFullUrls = data.map(slide => ({
          ...slide,
          imageUrl: slide.imageUrl.startsWith('http') 
            ? slide.imageUrl 
            : slide.imageUrl.startsWith('/') 
              ? `${BACKEND_URL}${slide.imageUrl}` 
              : `${BACKEND_URL}/uploads/${slide.imageUrl}`
        }));
        console.log('Slides with URLs:', slidesWithFullUrls); // Debug log
        setSlides(slidesWithFullUrls);
      } catch (error) {
        console.error('Error fetching slider items:', error);
      }
    };

    fetchSlides();
  }, []);

  return (
    <>
    <Box sx={{ position: 'relative', overflow: 'hidden' }}>
    <SwipeableViews
      axis="x"
      index={activeStep}
      onChangeIndex={setActiveStep}
      enableMouseEvents
    >
      {slides.map((slide, index) => (
        <Box
          key={index}
          sx={{
            height: { xs: '60vh', md: '80vh' },
            position: 'relative',
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.7))',
              zIndex: 1,
            },
          }}
        >
          <Box
            component="img"
            src={slide.imageUrl}
            alt={slide.title}
            sx={{
              height: '100%',
              width: '100%',
              objectFit: 'cover',
            }}
          />
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              zIndex: 2,
              width: '100%',
              maxWidth: '1200px',
              px: { xs: 2, md: 4 },
              textAlign: 'center',
              color: 'white',
            }}
          >
            <Typography
              variant="h1"
              sx={{
                fontFamily: 'Bebas Neue',
                fontSize: { xs: '2.5rem', md: '4rem' },
                mb: 2,
                textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
              }}
            >
              {slide.title}
            </Typography>
            <Typography
              variant="h5"
              sx={{
                mb: 4,
                fontWeight: 300,
                textShadow: '1px 1px 2px rgba(0,0,0,0.5)',
              }}
            >
              {slide.subtitle}
            </Typography>
            <Button
              variant="contained"
              color="primary"
              size="large"
              href={slide.link}
              sx={{
                fontWeight: 'bold',
                px: 4,
                py: 1.5,
                fontSize: '1.1rem',
              }}
            >
              Learn More
            </Button>
          </Box>
        </Box>
      ))}
    </SwipeableViews>
    <MobileStepper
      steps={slides.length}
      position="static"
      activeStep={activeStep}
      sx={{
        position: 'absolute',
        bottom: 0,
        width: '100%',
        background: 'transparent',
        '& .MuiMobileStepper-dot': {
          backgroundColor: 'rgba(255,255,255,0.5)',
        },
        '& .MuiMobileStepper-dotActive': {
          backgroundColor: 'white',
        },
      }}
      nextButton={
        <IconButton onClick={handleNext} sx={{ color: 'white' }}>
          <KeyboardArrowRight />
        </IconButton>
      }
      backButton={
        <IconButton onClick={handleBack} sx={{ color: 'white' }}>
          <KeyboardArrowLeft />
        </IconButton>
      }
    />
  </Box>
    {/* Quick Links Section */}
    <Container maxWidth="lg" sx={{ mt: -4, position: 'relative', zIndex: 2 }}>
    <Grid container spacing={2}>
      {quickLinks.map((link, index) => (
        <Grid item xs={6} md={3} key={index}>
          <Paper
            component={motion.div}
            whileHover={{ y: -8 }}
            sx={{
              p: 3,
              height: '100%',
              width: '170px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
              cursor: 'pointer',
              background: 'white',
              boxShadow: 3,
              borderTop: 3,
              borderColor: link.color,
              transition: 'all 0.3s ease-in-out',
              '&:hover': {
                boxShadow: 6,
              },
            }}
            onClick={() => window.location.href = link.link}
          >
            <Box sx={{ color: link.color, mb: 2 }}>{link.icon}</Box>
            <Typography
              variant="h6"
              sx={{
                fontFamily: 'Bebas Neue',
                fontSize: { xs: '1.2rem', md: '1.5rem' },
              }}
            >
              {link.title}
            </Typography>
          </Paper>
        </Grid>
      ))}
    </Grid>
  </Container>
  </>
    // <SliderContainer>
    //   <Carousel autoplay effect="fade">
    //     {slides.map((slide) => (
    //       <div key={slide.id}>
    //         <SlideContent image={slide.imageUrl}>
    //           <SlideText>
    //             <SlideTitle>{slide.title}</SlideTitle>
    //             {slide.subtitle && <SlideSubtitle>{slide.subtitle}</SlideSubtitle>}
    //           </SlideText>
    //         </SlideContent>
    //       </div>
    //     ))}
    //   </Carousel>
    // </SliderContainer>
  );
};

export default HomeSlider;
