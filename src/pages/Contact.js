import { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Grid,
  Paper,
  Alert,
  CircularProgress,
  Snackbar,
  IconButton,
  Link,
} from '@mui/material';
import { motion } from 'framer-motion';
import SendIcon from '@mui/icons-material/Send';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';
import { submitContactForm, getAllContacts } from '../services/api';

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  const [loading, setLoading] = useState(false);
  const [contactInfo, setContactInfo] = useState(null);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success',
  });

  useEffect(() => {
    const fetchContactInfo = async () => {
      try {
        const data = await getAllContacts();
        if (data && data.length > 0) {
          const info = {
            ...data[0],
            socialMedia: data[0].socialMedia ? JSON.parse(data[0].socialMedia) : {}
          };
          setContactInfo(info);
        }
      } catch (error) {
        console.error('Error fetching contact info:', error);
      }
    };

    fetchContactInfo();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await submitContactForm(formData);
      setSnackbar({
        open: true,
        message: 'Thank you for your message! We will get back to you soon.',
        severity: 'success',
      });
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
      });
    } catch (error) {
      setSnackbar({
        open: true,
        message: error.message || 'Something went wrong. Please try again.',
        severity: 'error',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

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
              alignItems: 'left',
              textAlign: 'left',
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
                Get in Touch
              </Typography>
              <Typography variant="h5" sx={{ fontWeight: 300, maxWidth: '600px' }}>
                Have questions about Gymkhana? We'd love to hear from you!
              </Typography>
            </motion.div>
          </Box>
        </Container>
      </Box>
      <Box sx={{
        background: 'linear-gradient(135deg, #f5f5f5 0%, #fff 100%)',
        py: 8,
        position: 'relative',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'radial-gradient(circle at 20% 150%, rgba(0, 31, 63, 0.03) 0%, transparent 50%),\n                     radial-gradient(circle at 80% -50%, rgba(255, 64, 129, 0.03) 0%, transparent 50%)',
          zIndex: 0,
        },
      }}>
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Typography
            variant="h1"
            sx={{
              mb: 2,
              fontFamily: 'Bebas Neue',
              fontSize: { xs: '3rem', md: '4.5rem' },
              textAlign: 'center',
              color: 'primary.main',
            }}
          >
            Get in Touch
          </Typography>


          <Grid container spacing={4}>
            <Grid item xs={12} md={4}>
              <Box sx={{ mb: { xs: 4, md: 0 } }}>
                <Paper
                  elevation={3}
                  sx={{
                    p: 3,
                    height: '100%',
                    background: 'linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.95) 100%)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255,255,255,0.3)',
                  boxShadow: '0 8px 32px rgba(0, 31, 63, 0.1)',
                  }}
                >
                  <Typography 
                    variant="h6" 
                    sx={{ 
                      mb: 3, 
                      color: 'primary.main',
                      fontFamily: 'Bebas Neue',
                      fontSize: '1.5rem',
                    }}
                  >
                    Contact Information
                  </Typography>
                  <Box sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
                    <LocationOnIcon sx={{ mr: 2, color: 'primary.main' }} />
                    <Typography variant="body1">
                      {contactInfo?.address || 'Loading address...'}
                    </Typography>
                  </Box>
                  <Box sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
                    <PhoneIcon sx={{ mr: 2, color: 'primary.main' }} />
                    <Typography variant="body1">{contactInfo?.phone || 'Loading phone...'}</Typography>
                  </Box>
                  <Box sx={{ mb: 3, display: 'flex', alignItems: 'center' }}>
                    <EmailIcon sx={{ mr: 2, color: 'primary.main' }} />
                    <Typography variant="body1">{contactInfo?.email || 'Loading email...'}</Typography>
                  </Box>
                  {contactInfo?.socialMedia && (
                    <Box sx={{ display: 'flex', gap: 2 }}>
                      {contactInfo.socialMedia.facebook && (
                        <IconButton
                          component={Link}
                          href={contactInfo.socialMedia.facebook}
                          target="_blank"
                          color="primary"
                        >
                          <FacebookIcon />
                        </IconButton>
                      )}
                      {contactInfo.socialMedia.twitter && (
                        <IconButton
                          component={Link}
                          href={contactInfo.socialMedia.twitter}
                          target="_blank"
                          color="primary"
                        >
                          <TwitterIcon />
                        </IconButton>
                      )}
                      {contactInfo.socialMedia.instagram && (
                        <IconButton
                          component={Link}
                          href={contactInfo.socialMedia.instagram}
                          target="_blank"
                          color="primary"
                        >
                          <InstagramIcon />
                        </IconButton>
                      )}
                      {contactInfo.socialMedia.youtube && (
                        <IconButton
                          component={Link}
                          href={contactInfo.socialMedia.youtube}
                          target="_blank"
                          color="primary"
                        >
                          <YouTubeIcon />
                        </IconButton>
                      )}
                    </Box>
                  )}
                </Paper>
              </Box>
            </Grid>

            <Grid item xs={12} md={8}>
              {contactInfo?.mapLocation && (
                <Box sx={{ mb: 4, height: '400px' }}>
                  <iframe
                    src={contactInfo.mapLocation}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </Box>
              )}
              <Paper
                elevation={3}
                sx={{
                  position: 'relative',
                  p: 4,
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.98) 100%)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255,255,255,0.3)',
                  boxShadow: '0 8px 32px rgba(0, 31, 63, 0.1)',
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'radial-gradient(circle at 0% 0%, rgba(0, 31, 63, 0.03) 0%, transparent 50%),\n                                radial-gradient(circle at 100% 100%, rgba(255, 64, 129, 0.03) 0%, transparent 50%)',
                    borderRadius: 'inherit',
                    zIndex: 0,
                  },
                  '& > *': {
                    position: 'relative',
                    zIndex: 1,
                  },
                }}
              >
                <Typography
                  variant="h5"
                  sx={{
                    mb: 4,
                    color: 'primary.main',
                    fontWeight: 600,
                    textAlign: 'center',
                    position: 'relative',
                    '&::after': {
                      content: '""',
                      position: 'absolute',
                      bottom: '-10px',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      width: '60px',
                      height: '3px',
                      background: 'linear-gradient(45deg, #1a237e 30%, #0d47a1 90%)',
                      borderRadius: '2px',
                    }
                  }}
                >
                  Send us a Message
                </Typography>
                <form onSubmit={handleSubmit}>
                  <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        variant="outlined"
                        InputProps={{
                          sx: {
                            borderRadius: 2,
                            backgroundColor: 'rgba(255, 255, 255, 0.7)',
                            transition: 'all 0.3s ease-in-out',
                            '&:hover': {
                              backgroundColor: 'rgba(255, 255, 255, 0.9)',
                              transform: 'translateY(-2px)',
                              boxShadow: '0 4px 8px rgba(0, 31, 63, 0.1)',
                            },
                          },
                        }}
                        InputLabelProps={{
                          sx: {
                            color: 'text.secondary',
                            '&.Mui-focused': {
                              color: 'primary.main',
                            },
                          },
                        }}
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            '& fieldset': {
                              borderWidth: '1px',
                              borderColor: 'rgba(0, 31, 63, 0.2)',
                            },
                            '&:hover fieldset': {
                              borderColor: 'primary.main',
                              borderWidth: '1px',
                            },
                            '&.Mui-focused fieldset': {
                              borderColor: 'primary.main',
                              borderWidth: '2px',
                            },
                          },
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        variant="outlined"
                        InputProps={{
                          sx: {
                            borderRadius: 2,
                            backgroundColor: 'rgba(255, 255, 255, 0.7)',
                            transition: 'all 0.3s ease-in-out',
                            '&:hover': {
                              backgroundColor: 'rgba(255, 255, 255, 0.9)',
                              transform: 'translateY(-2px)',
                              boxShadow: '0 4px 8px rgba(0, 31, 63, 0.1)',
                            },
                          },
                        }}
                        InputLabelProps={{
                          sx: {
                            color: 'text.secondary',
                            '&.Mui-focused': {
                              color: 'primary.main',
                            },
                          },
                        }}
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            '& fieldset': {
                              borderWidth: '1px',
                              borderColor: 'rgba(0, 31, 63, 0.2)',
                            },
                            '&:hover fieldset': {
                              borderColor: 'primary.main',
                              borderWidth: '1px',
                            },
                            '&.Mui-focused fieldset': {
                              borderColor: 'primary.main',
                              borderWidth: '2px',
                            },
                          },
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        variant="outlined"
                        InputProps={{
                          sx: {
                            borderRadius: 2,
                            backgroundColor: 'rgba(255, 255, 255, 0.7)',
                            transition: 'all 0.3s ease-in-out',
                            '&:hover': {
                              backgroundColor: 'rgba(255, 255, 255, 0.9)',
                              transform: 'translateY(-2px)',
                              boxShadow: '0 4px 8px rgba(0, 31, 63, 0.1)',
                            },
                          },
                        }}
                        InputLabelProps={{
                          sx: {
                            color: 'text.secondary',
                            '&.Mui-focused': {
                              color: 'primary.main',
                            },
                          },
                        }}
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            '& fieldset': {
                              borderWidth: '1px',
                              borderColor: 'rgba(0, 31, 63, 0.2)',
                            },
                            '&:hover fieldset': {
                              borderColor: 'primary.main',
                              borderWidth: '1px',
                            },
                            '&.Mui-focused fieldset': {
                              borderColor: 'primary.main',
                              borderWidth: '2px',
                            },
                          },
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                        variant="outlined"
                        InputProps={{
                          sx: {
                            borderRadius: 2,
                            backgroundColor: 'rgba(255, 255, 255, 0.7)',
                            transition: 'all 0.3s ease-in-out',
                            '&:hover': {
                              backgroundColor: 'rgba(255, 255, 255, 0.9)',
                              transform: 'translateY(-2px)',
                              boxShadow: '0 4px 8px rgba(0, 31, 63, 0.1)',
                            },
                          },
                        }}
                        InputLabelProps={{
                          sx: {
                            color: 'text.secondary',
                            '&.Mui-focused': {
                              color: 'primary.main',
                            },
                          },
                        }}
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            '& fieldset': {
                              borderWidth: '1px',
                              borderColor: 'rgba(0, 31, 63, 0.2)',
                            },
                            '&:hover fieldset': {
                              borderColor: 'primary.main',
                              borderWidth: '1px',
                            },
                            '&.Mui-focused fieldset': {
                              borderColor: 'primary.main',
                              borderWidth: '2px',
                            },
                          },
                        }}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        multiline
                        rows={6}
                        variant="outlined"
                        InputProps={{
                          sx: {
                            borderRadius: 2,
                            backgroundColor: 'rgba(255, 255, 255, 0.7)',
                            transition: 'all 0.3s ease-in-out',
                            '&:hover': {
                              backgroundColor: 'rgba(255, 255, 255, 0.9)',
                              transform: 'translateY(-2px)',
                              boxShadow: '0 4px 8px rgba(0, 31, 63, 0.1)',
                            },
                          },
                        }}
                        InputLabelProps={{
                          sx: {
                            color: 'text.secondary',
                            '&.Mui-focused': {
                              color: 'primary.main',
                            },
                          },
                        }}
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            '& fieldset': {
                              borderWidth: '1px',
                              borderColor: 'rgba(0, 31, 63, 0.2)',
                            },
                            '&:hover fieldset': {
                              borderColor: 'primary.main',
                              borderWidth: '1px',
                            },
                            '&.Mui-focused fieldset': {
                              borderColor: 'primary.main',
                              borderWidth: '2px',
                            },
                          },
                        }}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Button
                        type="submit"
                        variant="contained"
                        size="large"
                        disabled={loading}
                        startIcon={
                          loading ? (
                            <CircularProgress size={20} sx={{ color: 'white' }} />
                          ) : (
                            <SendIcon />
                          )
                        }
                        fullWidth
                        sx={{
                          mt: 2,
                          py: 1.8,
                          px: 4,
                          borderRadius: 2,
                          textTransform: 'none',
                          fontSize: '1.1rem',
                          letterSpacing: '0.5px',
                          background: 'linear-gradient(45deg, #1a237e 30%, #0d47a1 90%)',
                          boxShadow: '0 3px 5px 2px rgba(26, 35, 126, 0.2)',
                          transition: 'all 0.3s ease-in-out',
                          '&:hover': {
                            background: 'linear-gradient(45deg, #0d47a1 30%, #1a237e 90%)',
                            transform: 'translateY(-2px)',
                            boxShadow: '0 6px 12px rgba(26, 35, 126, 0.3)',
                          },
                          '&:disabled': {
                            background: 'linear-gradient(45deg, #cccccc 30%, #999999 90%)',
                            boxShadow: 'none',
                          }
                        }}
                      >
                        {loading ? 'Sending...' : 'Send Message'}
                      </Button>
                    </Grid>
                  </Grid>
                </form>
              </Paper>
            </Grid>
          </Grid>
        </motion.div>

        <Snackbar
          open={snackbar.open}
          autoHideDuration={6000}
          onClose={handleCloseSnackbar}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
          <Alert
            onClose={handleCloseSnackbar}
            severity={snackbar.severity}
            variant="filled"
            sx={{ width: '100%' }}
          >
            {snackbar.message}
          </Alert>
        </Snackbar>
      </Container>
      </Box>
    </Box>
  );
}

export default Contact;
