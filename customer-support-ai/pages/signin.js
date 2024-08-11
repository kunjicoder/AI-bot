import { useState } from 'react';
import { useRouter } from 'next/router';
import { auth, handleSignIn as firebaseSignIn } from '../lib/firebase'; // Import functions
import { TextField, Button, Box, Typography } from '@mui/material';
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
    h5: {
      fontWeight: 700,
    },
    body1: {
      fontWeight: 400,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 20,
          '&:hover': {
            backgroundColor: '#b71c1c', // Darker red on hover
          },
        },
      },
    },
  },
});

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState(''); // Added for error handling
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await firebaseSignIn(email); // Call the imported function
      router.push('/page'); // Redirect to desired page after successful sign-in
    } catch (error) {
      setError(error.message); // Set error message for display
    }
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
          width="300px"
          p={4}
          borderRadius={2}
          bgcolor="background.paper"
          boxShadow={5}
          textAlign="center"
        >
          <Typography variant="h5" gutterBottom>
            Sign In
          </Typography>
          {error && <p style={{ color: 'red' }}>{error}</p>} {/* Display error message */}
          <form onSubmit={handleSubmit}>
            <TextField
              label="Email"
              type="email"
              fullWidth
              margin="normal"
              variant="outlined"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              sx={{
                input: {
                  color: 'white',
                },
                label: {
                  color: 'white',
                },
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: '#d32f2f', // Deadpool red
                  },
                  '&:hover fieldset': {
                    borderColor: '#b71c1c', // Darker red on hover
                  },
                },
              }}
            />
            <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
              Sign In
            </Button>
          </form>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
