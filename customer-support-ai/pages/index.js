import { useRouter } from 'next/router';
import { Box, Button, Typography } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#d32f2f', // Deadpool red
    },
    secondary: {
      main: '#000000', // Deadpool black
    },
    background: {
      default: '#121212', // Dark background
      paper: '#1e1e1e', // Slightly lighter background for paper elements
    },
  },
  typography: {
    h4: {
      fontWeight: 700,
    },
    body1: {
      fontWeight: 400,
      fontSize: '1rem',
    },
  },
});

export default function Home() {
  const router = useRouter();

  const handleSignInClick = () => {
    router.push('/signin');
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        width="100vw"
        height="100vh"
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        bgcolor="background.default"
      >
        <Box
          width="80%"
          maxWidth="600px"
          p={4}
          borderRadius={2}
          bgcolor="background.paper"
          boxShadow={5}
          textAlign="center"
        >
          <Typography variant="h4" gutterBottom>
            Welcome to the AI Chatbot
          </Typography>
          <Typography variant="body1" paragraph>
            This is an experimental project designed to showcase the capabilities of modern AI. 
            The chatbot is designed to engage users in friendly and meaningful conversations, 
            while also providing insights and assistance on various topics. Feel free to explore 
            and interact with the chatbot to experience the technology firsthand.
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSignInClick}
            sx={{ mt: 2 }}
          >
            Sign In
          </Button>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
