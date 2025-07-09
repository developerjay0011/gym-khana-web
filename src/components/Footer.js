import { Box, Container, Grid, Typography, IconButton, Link } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';

function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: 'primary.main',
        color: 'white',
        py: 6,
        mt: 'auto',
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom sx={{ fontFamily: 'Bebas Neue' }}>
              AAGC
            </Typography>
            <Typography variant="body2">
              Asia Auto Gymkhana Championship
              <br />
              Precision. Speed. Control.
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom sx={{ fontFamily: 'Bebas Neue' }}>
              Quick Links
            </Typography>
            <Link href="/about" color="inherit" display="block" sx={{ mb: 1 }}>
              About Us
            </Link>
            <Link href="/events" color="inherit" display="block" sx={{ mb: 1 }}>
              Events
            </Link>
            <Link href="/contact" color="inherit" display="block">
              Contact
            </Link>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom sx={{ fontFamily: 'Bebas Neue' }}>
              Follow Us
            </Typography>
            <IconButton color="inherit" aria-label="Facebook" component="a" href="#" target="_blank">
              <FacebookIcon />
            </IconButton>
            <IconButton color="inherit" aria-label="Instagram" component="a" href="#" target="_blank">
              <InstagramIcon />
            </IconButton>
            <IconButton color="inherit" aria-label="YouTube" component="a" href="#" target="_blank">
              <YouTubeIcon />
            </IconButton>
          </Grid>
        </Grid>
        <Typography variant="body2" align="center" sx={{ mt: 4 }}>
          © {new Date().getFullYear()} Asia Auto Gymkhana Championship. All rights reserved.
        </Typography>
      </Container>
    </Box>
  );
}

export default Footer;
