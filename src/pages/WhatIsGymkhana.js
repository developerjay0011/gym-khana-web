import { Box, Container, Typography, Grid, Paper, List, ListItem, ListItemIcon, ListItemText, useTheme, useMediaQuery, CircularProgress } from '@mui/material';
import { motion } from 'framer-motion';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import SpeedIcon from '@mui/icons-material/Speed';
import SettingsIcon from '@mui/icons-material/Settings';
import SecurityIcon from '@mui/icons-material/Security';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import TimerIcon from '@mui/icons-material/Timer';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import { useState, useEffect } from 'react';
import axios from 'axios';

function WhatIsGymkhana() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [loading, setLoading] = useState(true);
  const [content, setContent] = useState(null);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const response = await axios.get('https://gmk-web-api.chronopulse.com/api/what-is-gymkhana');
        const data = response.data; // Get the first entry
        if (data) {
          setContent({
            ...data,
            competitionFormats: JSON.parse(data.competitionFormats || '[]'),
            technicalElements: JSON.parse(data.technicalElements || '[]'),
            scoringElements: JSON.parse(data.scoringElements || '[]')
          });
        }
      } catch (error) {
        console.error('Error fetching content:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchContent();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  const principles = [
    {
      title: 'Safety First',
      description: 'All events prioritize driver and spectator safety with comprehensive safety measures.',
      icon: <SecurityIcon />,
    },
    {
      title: 'Technical Precision',
      description: 'Focus on precise driving techniques and vehicle control.',
      icon: <SettingsIcon />,
    },
    {
      title: 'Speed Management',
      description: 'Controlled speed through technical courses requiring skill and strategy.',
      icon: <SpeedIcon />,
    },
  ];

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box>
      {/* Hero Section */}
      <Box
        component={motion.div}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        sx={{
          position: 'relative',
          height: { xs: '40vh', md: '60vh' },
          bgcolor: 'primary.main',
          color: 'white',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '5px',
            background: 'linear-gradient(90deg, #FFD700, #FF4081, #00E676)',
          },
          '&::after': {
            content: '""',
            position: 'absolute',
            top: '50%',
            right: '-10%',
            width: '500px',
            height: '500px',
            background: 'radial-gradient(circle, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 70%)',
            transform: 'translateY(-50%)',
            borderRadius: '50%',
            pointerEvents: 'none',
          }
        }}
      >
        <Container maxWidth="lg">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Typography 
              variant="h1" 
              sx={{ 
                fontSize: { xs: '2.5rem', md: '4rem' },
                fontWeight: 700,
                mb: 2,
                position: 'relative',
                display: 'inline-block',
                '&::after': {
                  content: '""',
                  position: 'absolute',
                  bottom: -8,
                  left: 0,
                  width: '60%',
                  height: '4px',
                  background: 'linear-gradient(90deg, #FFD700, transparent)',
                }
              }}
            >
             {content?.title}
            </Typography>
            <Typography
              variant="h5"
              sx={{
                maxWidth: '600px',
                fontWeight: 300,
                lineHeight: 1.6,
                opacity: 0.9
              }}
            >
              {content?.subtitle}
            </Typography>
          </motion.div>
        </Container>
      </Box>

      {/* Main Content */}
      <Container 
        maxWidth="lg" 
        sx={{ py: 8 }}
        component={motion.div}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >


        <Box 
          sx={{ mb: 8 }}
          component={motion.div}
          variants={itemVariants}
        >
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography variant="body1" paragraph sx={{ fontSize: '1.1rem', lineHeight: 1.8 }}>
                {content?.description || 'Loading description...'}
              </Typography>
             
            </Grid>
 
          </Grid>
        </Box>

        <Box 
          sx={{ mb: 8 }}
          component={motion.div}
          variants={itemVariants}
        >
          <Typography 
            variant="h3" 
            sx={{ 
              mb: 4,
              fontWeight: 700,
              color: 'primary.main',
              position: 'relative',
              '&::after': {
                content: '""',
                position: 'absolute',
                bottom: -8,
                left: 0,
                width: 60,
                height: 4,
                bgcolor: 'secondary.main',
              }
            }}
          >
            Core Principles
          </Typography>
          <Grid container spacing={4}>
            {principles.map((principle) => (
              <Grid item xs={12} md={4} key={principle.title}>
                <Paper
                  elevation={3}
                  sx={{
                    p: 4,
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    textAlign: 'center',
                    transition: 'all 0.3s ease-in-out',
                    position: 'relative',
                    overflow: 'hidden',
                    '&:hover': {
                      transform: 'translateY(-5px)',
                      boxShadow: 6,
                      '& .icon': {
                        transform: 'scale(1.1)',
                      },
                      '&::after': {
                        transform: 'rotate(45deg) translate(-50%, -50%)',
                      }
                    },
                    '&::after': {
                      content: '""',
                      position: 'absolute',
                      top: -100,
                      right: -100,
                      width: '200px',
                      height: '200px',
                      background: 'linear-gradient(45deg, rgba(255,255,255,0), rgba(255,255,255,0.1))',
                      transition: 'transform 0.3s ease-in-out',
                      transform: 'rotate(45deg) translate(-60%, -60%)',
                    },
                  }}
                >
                  <Box 
                    className="icon"
                    sx={{ 
                      mb: 2, 
                      color: 'primary.main',
                      transition: 'transform 0.3s ease-in-out',
                      '& > svg': { 
                        fontSize: 48,
                        filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.1))'
                      } 
                    }}
                  >
                    {principle.icon}
                  </Box>
                  <Typography variant="h5" sx={{ mb: 2, fontFamily: 'Bebas Neue' }}>
                    {principle.title}
                  </Typography>
                  <Typography variant="body1">{principle.description}</Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Box>

        <Box sx={{ mb: 8 }}>
          <Typography variant="h4" sx={{ mb: 4, fontFamily: 'Bebas Neue', color: 'primary.main' }}>
            Competition Formats
          </Typography>
          <List>
            {content?.competitionFormats?.map((format) => (
              <ListItem key={format}>
                <ListItemIcon>
                  <CheckCircleOutlineIcon color="primary" />
                </ListItemIcon>
                <ListItemText
                  primary={format}
                  sx={{ '& .MuiListItemText-primary': { fontSize: '1.1rem' } }}
                />
              </ListItem>
            ))}
          </List>
        </Box>

        <Box>
          <Typography variant="h4" sx={{ mb: 4, fontFamily: 'Bebas Neue', color: 'primary.main' }}>
            Course Design
          </Typography>
          <Typography variant="body1" paragraph>
            Gymkhana courses are carefully designed to test various driving skills:
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Paper sx={{ p: 3, height: '100%' }}>
                <Typography variant="h6" sx={{ mb: 2, fontFamily: 'Bebas Neue' }}>
                  Technical Elements
                </Typography>
                <List>
                  {content?.technicalElements?.map((element) => (
                    <ListItem key={element}>
                      <ListItemIcon>
                        <CheckCircleOutlineIcon color="primary" />
                      </ListItemIcon>
                      <ListItemText primary={element} />
                    </ListItem>
                  ))}
                </List>
              </Paper>
            </Grid>
            <Grid item xs={12} md={6}>
              <Paper sx={{ p: 3, height: '100%' }}>
                <Typography variant="h6" sx={{ mb: 2, fontFamily: 'Bebas Neue' }}>
                  Scoring Elements
                </Typography>
                <List>
                  {content?.scoringElements?.map((element) => (
                    <ListItem key={element}>
                      <ListItemIcon>
                        <CheckCircleOutlineIcon color="primary" />
                      </ListItemIcon>
                      <ListItemText primary={element} />
                    </ListItem>
                  ))}
                </List>
              </Paper>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Box>
  );
}

export default WhatIsGymkhana;
