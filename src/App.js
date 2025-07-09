import { Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';

// Pages
import Home from './pages/Home';
import About from './pages/About';
import WhatIsGymkhana from './pages/WhatIsGymkhana';
import Events from './pages/Events';
import Gallery from './pages/Gallery';
import News from './pages/News';
import Governance from './pages/Governance';
import Contact from './pages/Contact';
import History from './pages/History';

// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';

const theme = createTheme({
  palette: {
    primary: {
      main: '#001F3F',
    },
    secondary: {
      main: '#FFD700',
    },
  },
  typography: {
    fontFamily: '"Open Sans", "Inter", sans-serif',
    h1: {
      fontFamily: '"Bebas Neue", sans-serif',
    },
    h2: {
      fontFamily: '"Bebas Neue", sans-serif',
    },
    h3: {
      fontFamily: '"Bebas Neue", sans-serif',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/history" element={<History />} />
        <Route path="/what-is-gymkhana" element={<WhatIsGymkhana />} />
        <Route path="/events" element={<Events />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/news" element={<News />} />
        <Route path="/governance" element={<Governance />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
      <Footer />
    </ThemeProvider>
  );
}

export default App;
