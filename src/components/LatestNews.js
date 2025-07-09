import React, { useState, useEffect } from 'react';
import { Card, Row, Col } from 'antd';
import { getLatestNews } from '../services/api';
import moment from 'moment';
import styled from 'styled-components';
import {
  Box,
  Button,
  Container,
  Typography,
  Grid,
  CardContent,
  CardMedia,
  IconButton,
  Paper,
  Divider,
  MobileStepper,
  Stack,
} from '@mui/material';
import { motion, useAnimation, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import SwipeableViews from 'react-swipeable-views';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import NewspaperIcon from '@mui/icons-material/Newspaper';
import EventIcon from '@mui/icons-material/Event';
import PhotoLibraryIcon from '@mui/icons-material/PhotoLibrary';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import PeopleIcon from '@mui/icons-material/People';
import EmojiEventsOutlinedIcon from '@mui/icons-material/EmojiEventsOutlined';
import FlagIcon from '@mui/icons-material/Flag';
const { Meta } = Card;

const SectionTitle = styled.h2`
  text-align: center;
  font-size: 2.5rem;
  margin-bottom: 2rem;
`;

const NewsImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
`;

const NewsDate = styled.p`
  color: #666;
  margin-bottom: 0.5rem;
`;

const NewsDescription = styled.p`
  color: #333;
  margin-top: 1rem;
`;
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

const LatestNews = () => {
  const [news, setNews] = useState([]);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const data = await getLatestNews(3);
        setNews(data);
      } catch (error) {
        console.error('Error fetching news:', error);
      }
    };

    fetchNews();
  }, []);

  return (
       <Container id="news" maxWidth="lg" sx={{ py: 8 }}>
        <Grid container spacing={4}>
          {/* Latest News */}
          <Grid item xs={12} md={8}>
            <AnimatedSection>
              <Typography
                variant="h2"
                sx={{
                  mb: 4,
                  fontFamily: 'Bebas Neue',
                  color: 'primary.main',
                  borderBottom: '3px solid',
                  borderColor: 'primary.main',
                  pb: 1,
                }}
              >
                Latest News
              </Typography>
              <Grid container spacing={3}>
              {news.map((item) => (
                  <Grid item xs={12} md={6} key={item.id}>
                    <Paper
                      component={motion.div}
                      whileHover={{ x: 8 }}
                      sx={{
                        p: 3,
                        display: 'flex',
                        gap: 3,
                        cursor: 'pointer',
                        transition: 'all 0.3s ease-in-out',
                        borderLeft: 3,
                        borderColor: 'primary.main',
                        '&:hover': {
                          boxShadow: 4,
                          borderColor: '#FFD700',
                          '& img': {
                            transform: 'scale(1.05)',
                          },
                        },
                      }}
                    >
                      <Box
                        sx={{
                          position: 'relative',
                          width: 180,
                          height: 120,
                          borderRadius: 1,
                          overflow: 'hidden',
                          flexShrink: 0,
                        }}
                      >
                        <Box
                          component="img"
                          src={item.imageUrl}
                          sx={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            transition: 'transform 0.3s ease-in-out',
                          }}
                        />
                      </Box>
                      <Box sx={{ flex: 1 }}>
                        <Typography
                          variant="subtitle2"
                          color="primary"
                          sx={{ mb: 0.5, fontWeight: 600 }}
                        >
                          {item.date}
                        </Typography>
                        <Typography 
                          variant="h6" 
                          sx={{ 
                            mb: 1,
                            fontWeight: 600,
                            fontSize: '1.25rem',
                          }}
                        >
                          {item.title}
                        </Typography>
                        <Typography 
                          variant="body2" 
                          color="text.secondary"
                          sx={{ lineHeight: 1.6 }}
                        >
                          {item.description}
                        </Typography>
                      </Box>
                    </Paper>
                  </Grid>
                ))}
              </Grid>
            </AnimatedSection>
          </Grid>

         
        </Grid>
      </Container>

    // <section style={{ padding: '4rem 0', background: '#f5f5f5' }}>
    //   <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 1rem' }}>
    //     <SectionTitle>Latest News</SectionTitle>
    //     <Row gutter={[24, 24]}>
    //       {news.map((item) => (
    //         <Col xs={24} sm={12} md={8} key={item.id}>
    //           <Card
    //             hoverable
    //             cover={<NewsImage src={item.imageUrl} alt={item.title} />}
    //           >
    //             <NewsDate>{moment(item.date).format('MMMM D, YYYY')}</NewsDate>
    //             <Meta title={item.title} />
    //             <NewsDescription>
    //               {item.description.length > 150
    //                 ? `${item.description.substring(0, 150)}...`
    //                 : item.description}
    //             </NewsDescription>
    //           </Card>
    //         </Col>
    //       ))}
    //     </Row>
    //   </div>
    // </section>
  );
};

export default LatestNews;
