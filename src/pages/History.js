import { useState, useEffect } from 'react';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';
import Zoom from 'yet-another-react-lightbox/plugins/zoom';
import Captions from 'yet-another-react-lightbox/plugins/captions';
import 'yet-another-react-lightbox/plugins/captions.css';
import { Box, Container, Typography, Grid, Paper, Divider, CircularProgress } from '@mui/material';
import {
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineOppositeContent,
} from '@mui/lab';
import { motion } from 'framer-motion';
import SportsCar from '@mui/icons-material/DirectionsCar';
import Flag from '@mui/icons-material/Flag';
import Trophy from '@mui/icons-material/EmojiEvents';
import Group from '@mui/icons-material/Group';
import Event from '@mui/icons-material/Event';
import Star from '@mui/icons-material/StarBorder';
import { getHistoryItems } from '../services/api';

// Icon mapping for different types of events
const iconMap = {
  'car': <SportsCar />,
  'flag': <Flag />,
  'trophy': <Trophy />,
  'group': <Group />,
  'event': <Event />,
  'star': <Star />
};

function History() {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [timelineEvents, setTimelineEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);
  const [imageLoadingStates, setImageLoadingStates] = useState({});

  // Handle image loading states
  const preloadImage = (url) => {
    if (!imageLoadingStates[url]) {
      setImageLoadingStates(prev => ({ ...prev, [url]: false }));
      const img = new Image();
      img.onload = () => {
        setImageLoadingStates(prev => ({ ...prev, [url]: true }));
      };
      img.src = url;
    }
  };

  // Preload current, next and previous images
  useEffect(() => {
    if (isOpen && timelineEvents.length > 0) {
      const currentImage = timelineEvents[photoIndex].imageUrl;
      const nextIndex = (photoIndex + 1) % timelineEvents.length;
      const prevIndex = (photoIndex + timelineEvents.length - 1) % timelineEvents.length;
      
      preloadImage(currentImage);
      if (timelineEvents.length > 1) {
        preloadImage(timelineEvents[nextIndex].imageUrl);
        preloadImage(timelineEvents[prevIndex].imageUrl);
      }
    }
  }, [isOpen, photoIndex, timelineEvents]);


  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const data = await getHistoryItems();
        // Sort by year and then by order
        const sortedData = data.sort((a, b) => {
          if (a.year === b.year) {
            return a.order - b.order;
          }
          return a.year - b.year;
        });
        setTimelineEvents(sortedData);
      } catch (err) {
        console.error('Error fetching history:', err);
        setError('Failed to load history data');
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, []);

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
              align="left"
              sx={{
                mb: 2,
                fontFamily: 'Bebas Neue',
                fontSize: { xs: '3rem', md: '4.5rem' },
              }}
            >
              Our History
            </Typography>
            <Typography
              variant="h5"
              align="left"
              sx={{
                maxWidth: '800px',
                fontWeight: 300,
                opacity: 0.9,
              }}
            >
              Two decades of passion, innovation, and grassroots motorsport development in Asia
            </Typography>
          </motion.div>
        </Container>
      </Box>

      {/* Timeline Section */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        {loading ? (
          <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
            <CircularProgress />
          </Box>
        ) : error ? (
          <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
            <Typography color="error">{error}</Typography>
          </Box>
        ) : (
          <Timeline position="alternate">
            {timelineEvents.map((event, index) => {
              return (
                <TimelineItem key={index}>
                  <TimelineOppositeContent sx={{ py: 3 }}>
                    <Typography
                      variant="h3"
                      sx={{
                        fontFamily: 'Bebas Neue',
                        color: 'primary.main',
                        fontSize: { xs: '2rem', md: '2.5rem' },
                      }}
                    >
                      {event.year}
                    </Typography>
                  </TimelineOppositeContent>
                  <TimelineSeparator>
                    <TimelineDot
                      sx={{
                        bgcolor: hoveredIndex === index ? 'secondary.main' : 'primary.main',
                        transition: 'all 0.3s ease-in-out',
                        p: 2,
                      }}
                    >
                      {iconMap[event.icon] || <Event />}
                    </TimelineDot>
                    {index < timelineEvents.length - 1 && <TimelineConnector />}
                  </TimelineSeparator>
                  <TimelineContent sx={{ py: 3 }}>
                    <Paper
                      component={motion.div}
                      whileHover={{ y: -4 }}
                      onMouseEnter={() => setHoveredIndex(index)}
                      onMouseLeave={() => setHoveredIndex(null)}
                      sx={{
                        p: 3,
                        transition: 'all 0.3s ease-in-out',
                        borderLeft: 3,
                        borderColor: hoveredIndex === index ? 'secondary.main' : 'primary.main',
                        '&:hover': {
                          boxShadow: 4
                        },
                        overflow: 'hidden'
                      }}
                    >
                      {event.imageUrl && (
                        <Box
                          component="img"
                          src={event.imageUrl}
                          alt={event.title}
                          onClick={() => {
                            setPhotoIndex(index);
                            setIsOpen(true);
                            preloadImage(event.imageUrl);
                          }}
                          sx={{
                            display: { xs: 'none', sm: 'block' },
                            width: '100%',
                            height: 200,
                            objectFit: 'cover',
                            mb: 2,
                            borderRadius: 1,
                            filter: 'brightness(0.9)',
                            transition: 'all 0.3s ease-in-out',
                            cursor: 'pointer',
                            '&:hover': {
                              filter: 'brightness(1.1)'
                            }
                          }}
                        />
                      )}
                      <Typography variant="h6" sx={{ mb: 1, fontWeight: 600 }}>
                        {event.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {event.description}
                      </Typography>
                    </Paper>
                  </TimelineContent>
                </TimelineItem>
              );
            })}
          </Timeline>
        )}
      </Container>

      {/* Vision Section */}
      <Box sx={{ bgcolor: 'grey.100', py: 8 }}>
        <Container maxWidth="lg">
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
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
                  Looking Ahead
                </Typography>
                <Typography variant="body1" sx={{ mb: 3, lineHeight: 1.8 }}>
                  The AAGC has proven itself as a unique, inclusive, and adaptable model of grassroots motorsport. With a shared vision, persistent effort, and genuine regional cooperation, we believe this model can be expanded to other regions and continents.
                </Typography>
                <Typography variant="body1" sx={{ lineHeight: 1.8 }}>
                  Our ultimate dream: a FIA Auto Gymkhana World Cup, akin to the FIFA World Cup—uniting drivers from around the world through skill, spirit, and sport.
                </Typography>
              </motion.div>
            </Grid>
            <Grid item xs={12} md={6}>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <Paper
                  sx={{
                    p: 4,
                    height: '100%',
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
                  <Typography
                    variant="h3"
                    sx={{
                      mb: 3,
                      fontFamily: 'Bebas Neue',
                      color: '#FFD700',
                    }}
                  >
                    2025 Championship Rounds
                  </Typography>
                  {['Kyrgyzstan', 'Sri Lanka', 'India', 'Chinese Taipei', 'Uzbekistan'].map((location, index) => (
                    <Box key={index} sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
                      <Typography
                        variant="h6"
                        sx={{
                          mr: 2,
                          color: '#FFD700',
                          fontFamily: 'Bebas Neue',
                          fontSize: '1.5rem',
                        }}
                      >
                        {`0${index + 1}`}
                      </Typography>
                      <Typography variant="h6" sx={{ fontWeight: 300 }}>
                        {location}
                      </Typography>
                    </Box>
                  ))}
                </Paper>
              </motion.div>
            </Grid>
          </Grid>
        </Container>
      </Box>

      <Lightbox
        open={isOpen}
        close={() => setIsOpen(false)}
        index={photoIndex}
        slides={timelineEvents.map(event => ({
          src: event.imageUrl,
          title: event.title,
          description: event.description
        }))}
        plugins={[Zoom, Captions]}
        on={{
          view: ({ index }) => setPhotoIndex(index)
        }}
        animation={{ zoom: 500 }}
        zoom={{
          maxZoomPixelRatio: 3,
          zoomInMultiplier: 2
        }}
        carousel={{
          spacing: 0.5,
          padding: 0,
          imageFit: 'contain'
        }}
      />
    </Box>
  );
}

export default History;
