import { useState, useEffect } from 'react';
import { getGalleryItems } from '../services/api';
import {
  Box,
  Container,
  Typography,
  ImageList,
  ImageListItem,
  useMediaQuery,
  useTheme,
  CircularProgress,
  Alert
} from '@mui/material';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';
import Zoom from 'yet-another-react-lightbox/plugins/zoom';
import Captions from 'yet-another-react-lightbox/plugins/captions';
import 'yet-another-react-lightbox/plugins/captions.css';
import { motion, AnimatePresence } from 'framer-motion';

function Gallery() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isMedium = useMediaQuery(theme.breakpoints.between('sm', 'md'));
  
  const [isOpen, setIsOpen] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);

  const getColumns = () => {
    if (isMobile) return 1;
    if (isMedium) return 2;
    return 3;
  };

  const [galleryItems, setGalleryItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchGalleryItems = async () => {
      try {
        setLoading(true);
        setError('');
        const data = await getGalleryItems();
        setGalleryItems(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error('Error fetching gallery items:', error);
        setError(error.message || 'Failed to fetch gallery items');
        setGalleryItems(fallbackItems);
      } finally {
        setLoading(false);
      }
    };

    fetchGalleryItems();
  }, []);

  // Fallback gallery items in case API is not available
  const fallbackItems = [
    {
      id: 1,
      title: 'Racing in Rain',
      description: 'Intense racing action during wet conditions',
      image: 'https://images.unsplash.com/photo-1580273916550-e323be2ae537',
    },
    {
      id: 2,
      title: 'Night Race',
      description: 'Formula racing under the lights',
      image: 'https://images.unsplash.com/photo-1590066221822-0ef9de38b4e4',
    },
    {
      id: 3,
      title: 'Track Action',
      description: 'Multiple cars battling for position',
      image: 'https://images.unsplash.com/photo-1590066221100-9fdf1004de95',
    },
    {
      id: 4,
      title: 'Race Start',
      description: 'The crucial moment at the start of the race',
      image: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7',
    },
    {
      id: 5,
      title: 'Pit Lane Action',
      description: 'Quick pit stop during the race',
      image: 'https://images.unsplash.com/photo-1547744037-c92247cf0355',
    },
    {
      id: 6,
      title: 'Racing Spirit',
      description: 'The thrill of motorsport competition',
      image: 'https://images.unsplash.com/photo-1511919884226-fd3cad34687c',
    },
    {
      id: 7,
      title: 'Championship Battle',
      description: 'Close racing in the championship',
      image: 'https://images.unsplash.com/photo-1494905998402-395d579af36f',
    },
    {
      id: 8,
      title: 'Racing Line',
      description: 'Perfect racing line through the corner',
      image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70',
    },
    {
      id: 9,
      title: 'Speed and Precision',
      description: 'High-speed action on the track',
      image: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7',
    },
    {
      id: 10,
      title: 'Racing Team',
      description: 'Team celebration after success',
      image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf',
    },
  ];

  const openLightbox = (index) => {
    setPhotoIndex(index);
    setIsOpen(true);
  };

  return (
    <>
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
                   Gymkhana Gallery
                  </Typography>
                  <Typography variant="h5" sx={{ fontWeight: 300, maxWidth: '600px' }}>
                    {loading ? 'Loading Gallery...' : error ? 'Unable to load Gallery' : 'Here are some of the most thrilling Gymkhana events across Asia'}
                  </Typography>
                </motion.div>
              </Box>
            </Container>
          </Box>
    <Container maxWidth="lg" sx={{ py: 8 }}>
      
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
          <CircularProgress />
        </Box>
      ) : error ? (
        <Box sx={{ py: 4 }}>
          <Alert severity="error">{error}</Alert>
        </Box>
      ) : (
        <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <Typography
          variant="h1"
          sx={{
            mb: 4,
            fontFamily: 'Bebas Neue',
            color: 'primary.main',
            fontSize: { xs: '2rem', sm: '3rem', md: '3.5rem' },
            textAlign: 'center',
          }}
        >
          Gymkhana Gallery
        </Typography>

        <Box sx={{ overflowY: 'hidden' }}>
          <ImageList
            variant="masonry"
            cols={getColumns()}
            gap={16}
            sx={{
              mb: 8,
              '& .MuiImageListItem-root': {
                overflow: 'hidden',
                '& img': {
                  transition: 'transform 0.3s ease-in-out',
                  '&:hover': {
                    transform: 'scale(1.05)',
                  },
                },
              },
            }}
          >
            {(galleryItems.length > 0 ? galleryItems : fallbackItems).map((item, index) => (
              <ImageListItem 
                key={item.id}
                sx={{ cursor: 'pointer' }}
                onClick={() => openLightbox(index)}
              >
                <motion.img
                  src={item.imageUrl}
                  alt={item.title}
                  loading="lazy"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                  }}
                />
              </ImageListItem>
            ))}
          </ImageList>
        </Box>
        <Lightbox
        open={isOpen}
        close={() => setIsOpen(false)}
        index={photoIndex}
        slides={galleryItems.map(event => ({
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
        {/* {isOpen && (
          
          <Lightbox
            mainSrc={galleryItems[photoIndex].imageUrl}
            nextSrc={galleryItems[(photoIndex + 1) % galleryItems.length].imageUrl}
            prevSrc={galleryItems[(photoIndex + galleryItems.length - 1) % galleryItems.length].imageUrl}
            onCloseRequest={() => setIsOpen(false)}
            onMovePrevRequest={() =>
              setPhotoIndex((photoIndex + galleryItems.length - 1) % galleryItems.length)
            }
            onMoveNextRequest={() =>
              setPhotoIndex((photoIndex + 1) % galleryItems.length)
            }
            imageTitle={galleryItems[photoIndex].title}
            imageCaption={galleryItems[photoIndex].description}
          />
        )} */}
      </motion.div>
      )}

    </Container>
    </>
  );
}

export default Gallery;
