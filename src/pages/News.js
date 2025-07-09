import { Box, Container, Typography } from '@mui/material';
import LatestNews from '../components/LatestNews';

function News() {
  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
     
      <LatestNews />
    </Container>
  );
}

export default News;
