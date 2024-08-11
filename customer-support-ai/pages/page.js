'use client'
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Box, Button, Stack, TextField, Typography } from '@mui/material'
import CssBaseline from '@mui/material/CssBaseline';
import { React, useState } from 'react'
import { red, yellow, blue, grey } from '@mui/material/colors';
const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});
export default function Home() {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: "WOOHOO! IT'S YOUR BOY DEATHPOODLE(No copyrights), THE MERC WITH A MOUTH, THE REGENERATING DEGENERATE, THE GUY WHO BREAKS THE FOURTH WALL MORE OFTEN THAN A TEENAGER BREAKS OUT IN ACNE!",
    },
  ])
  const [message, setMessage] = useState('')

  const sendMessage = async () => {
    setMessage('')  // Clear the input field
    setMessages((messages) => [
      ...messages,
      { role: 'user', content: message },  // Add the user's message to the chat
      { role: 'assistant', content: '' },  // Add a placeholder for the assistant's response
    ])
  
    // Send the message to the server
    const response = fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify([...messages, { role: 'user', content: message }]),
    }).then(async (res) => {
      const reader = res.body.getReader()  // Get a reader to read the response body
      const decoder = new TextDecoder()  // Create a decoder to decode the response text
  
      let result = ''
      // Function to process the text from the response
      return reader.read().then(function processText({ done, value }) {
        if (done) {
          return result
        }
        const text = decoder.decode(value || new Uint8Array(), { stream: true })  // Decode the text
        setMessages((messages) => {
          let lastMessage = messages[messages.length - 1]  // Get the last message (assistant's placeholder)
          let otherMessages = messages.slice(0, messages.length - 1)  // Get all other messages
          return [
            ...otherMessages,
            { ...lastMessage, content: lastMessage.content + text },  // Append the decoded text to the assistant's message
          ]
        })
        return reader.read().then(processText)  // Continue reading the next chunk of the response
      })
    })
  }

  return (
    <ThemeProvider theme={darkTheme}>
    <CssBaseline />
    <Box
        width="100vw"
        height="100vh"
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        sx={{
          backgroundImage: 'url(/images/img.png)', // Path to your background image
          backgroundSize: 'cover', // Cover the entire container
          // Center the background image
          backgroundRepeat: 'no-repeat', // Prevent repeating the image
        }}
      >

  
      <Stack
        direction={'column'}
        width="900px"
        height="700px"
        borderRadius={5}
        border={`1px solid ${grey[700]}`}
        bgcolor={grey[800]}
        p={2}
        spacing={3}
        boxShadow={3}
      >
        <Stack
          direction={'column'}
          spacing={2}
          flexGrow={1}
          overflow="auto"
          maxHeight="100%"
        >
          {messages.map((message, index) => (
            <Box
              key={index}
              display="flex"
              justifyContent={
                message.role === 'assistant' ? 'flex-start' : 'flex-end'
              }
            >
              <Box
                bgcolor={
                  message.role === 'assistant'
                    ? red[700] // Deadpool's dark red
                    : yellow[600] // Wolverine's darker yellow
                }
                color={message.role === 'assistant' ? 'white' : 'black'} // Text color for contrast
                borderRadius={5}
                p={2}
                maxWidth="80%"
                sx={{
                  overflowWrap: 'break-word',
                  wordBreak: 'break-word',
                  whiteSpace: 'pre-wrap',
                  textOverflow: 'ellipsis',
                  display: '-webkit-box',
                  WebkitLineClamp: 4, // Increase the number of lines before truncating
                  overflow: 'hidden',
                  border: `1px solid ${message.role === 'assistant' ? red[900] : yellow[700]}`, // Darker border color
                }}
              >
                <Typography variant="body1" sx={{ whiteSpace: 'pre-wrap' }}>
                  {message.content}
                </Typography>
              </Box>
            </Box>
          ))}
        </Stack>
        <Stack direction={'row'} spacing={2} alignItems="center">
          <TextField
            label="Type a message..."
            fullWidth
            variant="outlined"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            InputProps={{
              style: {
                borderRadius: 5, // Rounded corners for the input
                borderColor: red[700], // Deadpool's red border color
              },
            }}
            sx={{
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: red[700], // Border color for the input field
                },
                '&:hover fieldset': {
                  borderColor: red[900], // Darker red on hover
                },
              },
            }}
          />
          <Button
            variant="contained"
            onClick={sendMessage}
            sx={{
              borderRadius: 20, // Rounded corners for the button
              bgcolor: red[600], // Wolverine's blue for the button background
              color: 'white', // White text color
              boxShadow: 1, // Small shadow for the button
              ':hover': {
                bgcolor: red[700], // Darker blue on hover
              },
            }}
          >
            Send
          </Button>
        </Stack>
      </Stack>
    </Box>
    </ThemeProvider>
  );
};
