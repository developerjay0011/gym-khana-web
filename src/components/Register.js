import React, { useState, useEffect } from 'react';
import { getUpcomingEvents } from '../services/api';
import {
  Box,
  Button,
  Container,
  Typography,
  Grid,
  Paper,

} from '@mui/material';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import PeopleIcon from '@mui/icons-material/People';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import FlagIcon from '@mui/icons-material/Flag';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import styled from 'styled-components';

const SectionTitle = styled.h2`
  text-align: center;
  font-size: 2.5rem;
  margin-bottom: 2rem;
`;

  // Stats data with color assignments
  const stats = [
    {
      icon: <DirectionsCarIcon sx={{ fontSize: 40 }} />,
      value: '150+',
      label: 'Competitors',
      color: '#FFD700',
    },
    {
      icon: <PeopleIcon sx={{ fontSize: 40 }} />,
      value: '8',
      label: 'Countries',
      color: '#FF4081',
    },
    {
      icon: <EmojiEventsIcon sx={{ fontSize: 40 }} />,
      value: '12',
      label: 'Events',
      color: '#00E676',
    },
    {
      icon: <FlagIcon sx={{ fontSize: 40 }} />,
      value: '24',
      label: 'Champions',
      color: '#40C4FF',
    },
  ];

function AnimatedSection({ children, delay = 0 }) {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  useEffect(() => {
    if (inView) {
      controls.start({
        opacity: 1,
        y: 0,
        transition: { duration: 0.8, delay },
      });
    }
  }, [controls, inView, delay]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={controls}
    >
      {children}
    </motion.div>
  );
}
const Register = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const data = await getUpcomingEvents(3);
        setEvents(data);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    fetchEvents();
  }, []);

  return (
    <div>
     {/* Statistics Section */}
          <Box
            sx={{
              bgcolor: 'primary.white',
              color: 'primary.black',
              py: 8,
              position: 'relative',
              '&::before': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: '5px',
                background: 'linear-gradient(90deg, #FFD700, #FF4081, #00E676)',
              },
              overflow: 'hidden',
              '&::after': {
                content: '""',
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                height: '5px',
                background: 'linear-gradient(90deg, #FFD700, #FF4081, #00E676)',
              },
            }}
          >
            <Container maxWidth="lg">
              <AnimatedSection>
                <Typography
                  variant="h2"
                  align="center"
                  sx={{ mb: 6, fontFamily: 'Bebas Neue' }}
                >
                  Championship Statistics
                </Typography>
                <Grid container spacing={4} justifyContent="center">
                  {stats.map((stat, index) => (
                    <Grid item xs={6} md={3} key={index}>
                      <Paper
                        component={motion.div}
                        whileHover={{ y: -8 }}
                        sx={{
                          p: 4,
                          height: '100%',
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          textAlign: 'center',
                          background: 'rgba(255,255,255,0.05)',
                          borderTop: 3,
                          borderColor: stat.color,
                          transition: 'all 0.3s ease-in-out',
                          '&:hover': {
                            background: 'rgba(255,255,255,0.1)',
                            '& .icon-wrapper': {
                              background: stat.color,
                              '& svg': {
                                transform: 'scale(1.2)',
                              },
                            },
                          },
                        }}
                      >
                        <Box
                          className="icon-wrapper"
                          sx={{
                            mb: 3,
                            p: 2,
                            borderRadius: '50%',
                            background: 'rgba(255,255,255,0.1)',
                            transition: 'all 0.3s ease-in-out',
                            '& svg': {
                              fontSize: '2.5rem',
                              transition: 'transform 0.3s ease-in-out',
                            },
                          }}
                        >
                          {stat.icon}
                        </Box>
                        <Typography
                          variant="h3"
                          sx={{
                            mb: 1,
                            fontFamily: 'Bebas Neue',
                            fontSize: { xs: '2.5rem', md: '3.5rem' },
                            color: stat.color,
                          }}
                        >
                          {stat.value}
                        </Typography>
                        <Typography
                          variant="h6"
                          sx={{
                            fontWeight: 300,
                            opacity: 0.9,
                            letterSpacing: 1,
                          }}
                        >
                          {stat.label}
                        </Typography>
                      </Paper>
                    </Grid>
                  ))}
                </Grid>
              </AnimatedSection>
            </Container>
          </Box>
         <Box
                sx={{
                  py: 8,
                  background: `linear-gradient(rgba(0, 31, 63, 0.9), rgba(0, 31, 63, 0.9)), url('/images/3c93e6c3-cff2-40ec-bf53-e9cbf73f0f9c.jpg')`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  backgroundAttachment: 'fixed',
                  color: 'white',
                  position: 'relative',
                  overflow: 'hidden',
                  '&::after': {
                    content: '""',
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: '5px',
                    background: 'linear-gradient(90deg, #FFD700, #FF4081, #00E676)',
                  },
                }}
              >
                <Container maxWidth="lg">
                  <AnimatedSection delay={0.6}>
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                    >
                    <Box sx={{ textAlign: 'center' }}>
                      <Typography variant="h2" sx={{ mb: 3, fontFamily: 'Bebas Neue' }}>
                        Ready to Join the Championship?
                      </Typography>
                      <Typography variant="h5" sx={{ mb: 4, fontWeight: 300 }}>
                        Register now and be part of the most exciting motorsport event in Asia
                      </Typography>
                      <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                        <Button
                          variant="contained"
                          color="secondary"
                          size="large"
                          sx={{
                            fontWeight: 'bold',
                            px: 4,
                            py: 1.5,
                            fontSize: '1.2rem',
                            borderRadius: '30px',
                            background: 'linear-gradient(45deg, #FFD700, #FF4081)',
                            boxShadow: '0 4px 15px rgba(255, 215, 0, 0.3)',
                            '&:hover': {
                              background: 'linear-gradient(45deg, #FF4081, #FFD700)',
                            },
                          }}
                        >
                          Register Now
                        </Button>
                      </motion.div>
                    </Box>
                  </motion.div>
                  </AnimatedSection>
                </Container>
              </Box>
              </div>
  );
};

export default Register;
