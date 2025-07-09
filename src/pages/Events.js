import { useState, useEffect } from 'react';
import { getUpcomingEvents } from '../services/api';
import {
  Box,
  Container,
  Typography,
  Grid,
  Paper,
  Card,
  CardContent,
  CardMedia,
  Button,
  Tab,
  Tabs,
  Chip,
  IconButton,
  Divider,
  useTheme,
} from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { motion, AnimatePresence } from 'framer-motion';
import { format, isFuture } from 'date-fns';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import ShareIcon from '@mui/icons-material/Share';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';

function Events() {
  const theme = useTheme();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [tabValue, setTabValue] = useState(0);
  const [animate, setAnimate] = useState(false);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setAnimate(true);
    const fetchEvents = async () => {
      try {
        const data = await getUpcomingEvents();
        setEvents(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: 'easeOut',
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
        ease: 'easeOut',
      },
    },
  };

  // Fallback event data in case API fails
  const fallbackEvents = [
    {
      id: 1,
      title: 'AAGC Round 1 - Thailand',
      date: '2025-07-15',
      location: 'Bangkok, Thailand',
      image: '/images/event1.jpg',
      description: 'Opening round of the 2025 Asia Auto Gymkhana Championship',
      status: 'upcoming',
    },
    {
      id: 2,
      title: 'AAGC Round 2 - Malaysia',
      date: '2025-08-20',
      location: 'Kuala Lumpur, Malaysia',
      image: '/images/event2.jpg',
      description: 'Second round featuring technical course challenges',
      status: 'upcoming',
    },
    {
      id: 3,
      title: 'AAGC Round 3 - Taiwan',
      date: '2025-09-10',
      location: 'Taipei, Taiwan',
      image: '/images/event3.jpg',
      description: 'Championship continues with exciting night race',
      status: 'upcoming',
    },
  ];

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const filteredEvents = (events || fallbackEvents).filter(event => {
    if (tabValue === 0) return true; // All events
    if (tabValue === 1) return new Date(event.date) > new Date(); // Upcoming
    return new Date(event.date) < new Date(); // Past
  });

  return (
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          position: 'relative',
          height: '300px',
          bgcolor: 'primary.main',
          color: 'white',
          overflow: 'hidden',
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
        <Container maxWidth="lg" sx={{ height: '100%', position: 'relative', zIndex: 1 }}>
          <Box
            sx={{
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
            }}
          >
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <Typography
                variant="h1"
                sx={{
                  fontFamily: 'Bebas Neue',
                  fontSize: { xs: '3rem', md: '4.5rem' },
                  mb: 2,
                  background: 'white',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                Upcoming Events
              </Typography>
              <Typography variant="h5" sx={{ fontWeight: 300, maxWidth: '600px' }}>
                {loading ? 'Loading events...' : error ? 'Unable to load events' : 'Join us for the most thrilling Gymkhana events across Asia'}
              </Typography>
            </motion.div>
          </Box>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ py: 8 }}>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={animate ? 'visible' : 'hidden'}
        >


        <Grid container spacing={4}>
          {/* Calendar Section */}
          <Grid item xs={12} md={4}>
            <Paper 
              elevation={3} 
              sx={{ 
                p: 2, 
                mb: 3,
                borderRadius: 2,
                background: 'linear-gradient(135deg, #fff 0%, #f5f5f5 100%)',
                boxShadow: '0 8px 32px rgba(0, 31, 63, 0.1)',
              }}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DateCalendar
                  value={selectedDate}
                  onChange={(newValue) => setSelectedDate(newValue)}
                  sx={{
                    '& .MuiPickersDay-root.Mui-selected': {
                      backgroundColor: 'primary.main',
                    },
                  }}
                />
              </LocalizationProvider>
            </Paper>

            <Paper 
              elevation={3} 
              sx={{ 
                p: 3,
                borderRadius: 2,
                background: 'linear-gradient(135deg, #fff 0%, #f5f5f5 100%)',
                boxShadow: '0 8px 32px rgba(0, 31, 63, 0.1)',
              }}>
              <Typography variant="h6" sx={{ mb: 2, fontFamily: 'Bebas Neue' }}>
                Selected Date Events
              </Typography>
              {events.filter(event => 
                format(new Date(event.date), 'yyyy-MM-dd') === 
                format(selectedDate, 'yyyy-MM-dd')
              ).map(event => (
                <Box key={event.id} sx={{ mb: 2 }}>
                  <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                    {event.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {event.location}
                  </Typography>
                </Box>
              ))}
            </Paper>
          </Grid>

          {/* Events List Section */}
          <Grid item xs={12} md={8}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
              <Tabs value={tabValue} onChange={handleTabChange}>
                <Tab label="All Events" />
                <Tab label="Upcoming" />
                <Tab label="Past Events" />
              </Tabs>
            </Box>

            <Grid container spacing={3} sx={{ maxWidth: '700px', margin: '0 auto' }}>
              {filteredEvents.map((event) => (
                <Grid item xs={12} key={event.id}>
                  <motion.div variants={cardVariants}>
                    <Card
                      sx={{
                        display: 'flex',
                        width: '100%',
                        maxWidth: '900px',
                        margin: '0 auto',
                        borderRadius: 2,
                        overflow: 'hidden',
                        position: 'relative',
                        transition: 'all 0.3s ease-in-out',
                        '&:hover': {
                          transform: 'translateY(-4px)',
                          boxShadow: '0 12px 40px rgba(0, 31, 63, 0.15)',
                        },
                      }}
                    >
                    <CardMedia
                      component="img"
                      sx={{
                        width: { xs: '150px', sm: '250px', md: '300px' },
                        height: '100%',
                        objectFit: 'cover',
                        transition: 'transform 0.3s ease-in-out',
                        '&:hover': {
                          transform: 'scale(1.05)',
                        },
                      }}
                      image={event.imageUrl}
                      alt={event.title}
                    />
                    <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
                      <CardContent sx={{ flex: '1 0 auto', p: 2 }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                          <Typography variant="h5" sx={{ 
                            fontFamily: 'Bebas Neue', 
                            fontSize: '1.8rem',
                            color: 'primary.main',

                          }}>
                            {event.title}
                          </Typography>
                          <Chip
                            label={isFuture(new Date(event.date)) ? 'Upcoming' : 'Past'}
                            color={isFuture(new Date(event.date)) ? 'secondary' : 'default'}
                            size="small"
                            sx={{ borderRadius: '4px' }}
                          />
                        </Box>
                        
                        <Box sx={{ display: 'flex', gap: 2, mb: 1 }}>
                          <Box sx={{ display: 'flex', alignItems: 'center', color: 'text.secondary' }}>
                            <CalendarTodayIcon sx={{ fontSize: 18, mr: 0.5 }} />
                            {format(new Date(event.date), 'MMMM d, yyyy')}
                          </Box>
                          <Box sx={{ display: 'flex', alignItems: 'center', color: 'text.secondary' }}>
                            <LocationOnIcon sx={{ fontSize: 18, mr: 0.5 }} />
                            {event.location}
                          </Box>
                        </Box>

                        <Typography 
                          variant="body1" 
                          paragraph
                          sx={{ 
                            mb: 3,
                            color: 'text.secondary',
                            lineHeight: 1.6
                          }}
                        >
                          {event.description}
                        </Typography>

                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <Button
                            variant="contained"
                            color="primary"
                            startIcon={<DirectionsCarIcon />}
                            sx={{
                              borderRadius: '25px',
                              px: 3,
                              background: 'linear-gradient(45deg, #001F3F, #0066cc)',
                              boxShadow: '0 4px 15px rgba(0, 31, 63, 0.2)',
                              '&:hover': {
                                background: 'linear-gradient(45deg, #0066cc, #001F3F)',
                              },
                            }}
                          >
                            Event Details
                          </Button>
                          <Box>
                            <IconButton size="small" sx={{ mr: 1 }}>
                              <ShareIcon />
                            </IconButton>
                            <IconButton size="small">
                              <BookmarkBorderIcon />
                            </IconButton>
                          </Box>
                        </Box>
                      </CardContent>
                    </Box>
                  </Card>
                </motion.div>
              </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </motion.div>
    </Container>
    </Box>
  );
}

export default Events;
