import { Box, Container, Typography, Grid, Paper, List, ListItem, ListItemIcon, ListItemText, CircularProgress } from '@mui/material';
import CheckCircleOutline from '@mui/icons-material/CheckCircleOutline';
import TimerOutlined from '@mui/icons-material/TimerOutlined';
import DirectionsCar from '@mui/icons-material/DirectionsCar';
import Groups from '@mui/icons-material/Groups';
import EmojiEvents from '@mui/icons-material/EmojiEvents';
import Security from '@mui/icons-material/Security';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { getAboutContent } from '../services/api';

const iconMap = { 
  timer: TimerOutlined,
  car: DirectionsCar,
  check: CheckCircleOutline,
  groups: Groups,
  security: Security,
  event: EmojiEvents,
};

function About() {
  const [loading, setLoading] = useState(true);
  const [aboutData, setAboutData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAboutData = async () => {
      try {
        const data = await getAboutContent();
        setAboutData(Array.isArray(data) ? data[0] : data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAboutData();
  }, []);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
        <Typography color="error">Error loading content: {error}</Typography>
      </Box>
    );
  }

  if (!aboutData) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
        <Typography>No content available</Typography>
      </Box>
    );
  }

return (    
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          bgcolor: 'primary.main',
          color: 'white',
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
        }}
      >
        <Container maxWidth="lg">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Typography
              variant="h1"
              sx={{
                fontSize: { xs: '2.5rem', md: '3.5rem' },
                fontWeight: 700,
                mb: 2,
              }}
            >
              {aboutData.title}
            </Typography>
            <Typography
              variant="h5"
              sx={{
                fontWeight: 400,
                mb: 4,
                maxWidth: '800px',
              }}
            >
              {aboutData.subtitle}
            </Typography>
          </motion.div>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ py: 8 }}>
        {/* What is Gymkhana Section */}
          <Box sx={{ mb: 8 }}>
                  <Typography
                    variant="h2"
                    sx={{
                      mb: 4,
                      fontFamily: 'Bebas Neue',
                      color: 'primary.main',
                      position: 'relative',
                      '&::after': {
                        content: '""',
                        position: 'absolute',
                        bottom: -8,
                        left: 0,
                        width: 60,
                        height: 3,
                        bgcolor: 'secondary.main',
                      },
                    }}
                  >
                    What is Auto-Gymkhana?
                  </Typography>
                  <Typography variant="body1" paragraph sx={{ fontSize: '1.1rem', lineHeight: 1.8 }}>
                   {aboutData.whatis}
                  </Typography>
                 
                </Box>

      </Container>

      
      <Box sx={{ bgcolor: 'grey.100', py: 8 }}>
        <Container maxWidth="lg">
          {/* <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                <Typography variant="h3" gutterBottom>
                  Organization
                </Typography>
                <Typography paragraph>
                  {aboutData.organization}
                </Typography>
              </motion.div>
            </Grid>
            <Grid item xs={12} md={6}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
              >
                <Paper
                  elevation={3}
                  sx={{
                    p: 3,
                    height: '100%',
                    bgcolor: 'background.paper',
                    borderRadius: 2,
                  }}
                >
                  <Typography variant="h4" gutterBottom>
                    Key Personnel
                  </Typography>
                  <List>
                    <ListItem>
                      <ListItemIcon sx={{ color: 'primary.main' }}>
                        <Groups />
                      </ListItemIcon>
                      <ListItemText
                        primary="Event Coordinator"
                        secondary={aboutData.coordinator}
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon sx={{ color: 'primary.main' }}>
                        <Security />
                      </ListItemIcon>
                      <ListItemText
                        primary="Director"
                        secondary={aboutData.director}
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon sx={{ color: 'primary.main' }}>
                        <EmojiEvents />
                      </ListItemIcon>
                      <ListItemText
                        primary="Assistant"
                        secondary={aboutData.assistant}
                      />
                    </ListItem>
                  </List>
                </Paper>
              </motion.div>
            </Grid>
          </Grid> */}
          {/* Organization Section */}
      <Box>
          <Typography
            variant="h2"
            sx={{
              mb: 4,
              fontFamily: 'Bebas Neue',
              color: 'primary.main',
              position: 'relative',
              '&::after': {
                content: '""',
                position: 'absolute',
                bottom: -8,
                left: 0,
                width: 60,
                height: 3,
                bgcolor: 'secondary.main',
              },
            }}
          >
            Organization & Governance
          </Typography>
          <Paper
            sx={{
              p: 4,
              background: 'linear-gradient(45deg, #001F3F 30%, #003366 90%)',
              color: 'white',
              position: 'relative',
              overflow: 'hidden',
              '&::before': {
                content: '""',
                position: 'absolute',
                top: 0,
                right: 0,
                width: '150px',
                height: '150px',
                background: 'radial-gradient(circle, rgba(255,215,0,0.1) 0%, rgba(255,215,0,0) 70%)',
                borderRadius: '50%',
              },
            }}
          >
            <Typography variant="body1" paragraph sx={{ fontSize: '1.1rem', lineHeight: 1.8 }}>
            {aboutData.organization}
            </Typography>
          
            <Box sx={{ mt: 4 }}>
              <Typography variant="h6" sx={{ color: '#FFD700', mb: 2, fontFamily: 'Bebas Neue' }}>
                Current Leadership
              </Typography>
              <List sx={{ color: 'white' }}>
                <ListItem>
                  <ListItemIcon>
                    <Groups sx={{ color: '#FFD700' }} />
                  </ListItemIcon>
                  <ListItemText
                    primary="Coordinator"
                    secondary={aboutData.coordinator}
                    secondaryTypographyProps={{ sx: { color: 'rgba(255,255,255,0.7)' } }}
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <Groups sx={{ color: '#FFD700' }} />
                  </ListItemIcon>
                  <ListItemText
                    primary="Deputy Director"
                    secondary={aboutData.director}
                    secondaryTypographyProps={{ sx: { color: 'rgba(255,255,255,0.7)' } }}
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <Groups sx={{ color: '#FFD700' }} />
                  </ListItemIcon>
                  <ListItemText
                    primary="Assistant"
                    secondary={aboutData.assistant}
                    secondaryTypographyProps={{ sx: { color: 'rgba(255,255,255,0.7)' } }}
                  />  
                </ListItem>
              </List>
            </Box>
          </Paper>
        </Box>  
        </Container>
      </Box>
    </Box>
  );
}

export default About;
