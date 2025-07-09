import React, { useState, useEffect } from 'react';
import { Card, Row, Col } from 'antd';
import { getUpcomingEvents } from '../services/api';
import moment from 'moment';
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
import styled from 'styled-components';

const SectionTitle = styled.h2`
  text-align: center;
  font-size: 2.5rem;
  margin-bottom: 2rem;
`;

const EventCard = styled(Card)`
  height: 100%;
  .ant-card-body {
    height: calc(100% - 24px);
    display: flex;
    flex-direction: column;
  }
`;

const EventDate = styled.div`
  background: #1890ff;
  color: white;
  text-align: center;
  padding: 1rem;
  border-radius: 4px;
  margin-bottom: 1rem;
`;

const EventDay = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
`;

const EventMonth = styled.div`
  font-size: 1rem;
  text-transform: uppercase;
`;

const EventTitle = styled.h3`
  font-size: 1.25rem;
  margin: 0 0 1rem 0;
`;

const EventDescription = styled.p`
  color: #666;
  flex-grow: 1;
`;

const UpcomingEvents = () => {
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
    <section style={{ padding: '4rem 0' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 1rem' }}>
        <SectionTitle>Upcoming Events</SectionTitle>
        <Stack spacing={2}>
                {events.map((item) => (
                  <Paper
                    key={item.id}
                    component={motion.div}
                    whileHover={{ y: -4 }}
                    sx={{
                      p: 3,
                      cursor: 'pointer',
                      transition: 'all 0.3s ease-in-out',
                      borderLeft: 3,
                      borderColor: 'secondary.main',
                      '&:hover': {
                        boxShadow: 4,
                        borderColor: '#FF4081',
                        '& .event-icon': {
                          transform: 'rotate(360deg)',
                          color: '#FF4081',
                        },
                      },
                    }}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <EventIcon 
                        className="event-icon"
                        sx={{ 
                          mr: 1,
                          color: 'secondary.main',
                          transition: 'all 0.6s ease-in-out',
                        }} 
                      />
                      <Typography
                        variant="subtitle2"
                        color="primary"
                        sx={{ fontWeight: 600 }}
                      >
                        {moment(item.date).format('D MMM YYYY')}
                      </Typography>
                    </Box>
                    <Typography 
                      variant="h6" 
                      sx={{ 
                        mb: 1,
                        fontWeight: 600,
                        fontSize: '1.1rem',
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
                  </Paper>
                ))}
              </Stack>
        {/* <Row gutter={[24, 24]}>
          {events.map((event) => {
            const eventDate = moment(event.date);
            return (
              <Col xs={24} sm={12} md={8} key={event.id}>
                <EventCard hoverable>
                  <EventDate>
                    <EventDay>{eventDate.format('D')}</EventDay>
                    <EventMonth>{eventDate.format('MMM')}</EventMonth>
                  </EventDate>
                  <EventTitle>{event.title}</EventTitle>
                  <EventDescription>
                    {event.description.length > 150
                      ? `${event.description.substring(0, 150)}...`
                      : event.description}
                  </EventDescription>
                </EventCard>
              </Col>
            );
          })} 
        </Row> */}
      </div>
    </section>
  );
};

export default UpcomingEvents;
