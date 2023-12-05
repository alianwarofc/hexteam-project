"use client";
import React, { useEffect, useState } from 'react';
import axios from 'axios';

import {
  Flex,
  Text,
  Button,
  Spacer,
  Input,
  Textarea,
  Box,
} from '@chakra-ui/react';
import EventList from '../components/EvenList'; // Assuming you'll create this component
import useDashboard from '@/components/hooks/useDashboard';

const Dashboard = () => {
  const { getAllEvents, createEvent, joinEvent, events } = useDashboard();
  const [newEventData, setNewEventData] = useState({
    name: '',
    description: '',
    image: '', // Image URL or file
    location: '',
    date: '',
    authorId: '', // Assuming you'll manage authorId
  });

  useEffect(() => {
    getAllEvents(); // Fetch all events on component mount
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEventData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleCreateEvent = async () => {
    try {
      const response = await axios.post('https://eventmakers-api.vercel.app/api/events', newEventData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log('Event created:', response.data);
      // You might want to update UI or reset form fields after creating event
    } catch (error) {
      console.error('Error creating event:', error);
    }
  };

  const handleJoinEvent = (eventId, userData) => {
    joinEvent(eventId, userData); // Function to join an event
    // You might want to update UI/Reset form fields after joining event
  };

  const handleLogoutClick = () => {
    // Your logout logic here
    // For example, clearing local storage, redirecting to the login page, etc.
  };


  return (
    <Flex direction='column' minHeight='100vh'>
      {/* Header */}
      <Flex
        direction='row'
        as='header'
        p='4'
        boxShadow='0 4px 6px -1px rgba(0,0,0,0.1)'
        alignItems='center'
        justifyContent='space-between'
        backgroundColor='#da4b45'
      >
        {/* Logo */}
        <Text fontWeight='bold' fontSize='xl'>
          Event Organizer
        </Text>

        {/* User Info and Logout */}
        <Flex alignItems='center' gap={4}>
          <Text marginRight='2' fontSize='sm'>
            Welcome, Username {/*{payload.name}*/}
          </Text>
          <Button onClick={handleLogoutClick} variant='link' colorScheme='blue' backgroundColor='peachpuff'>
            Logout
          </Button>
        </Flex>
      </Flex>

      {/* Main Content */}
      
      <Box p='4' backgroundColor='#faf7e7'>
        <Text fontSize='xl' fontWeight='bold' mb='4'>
          Create Event
        </Text>
        <Flex
        flex='2'
        justifyContent='center'
        alignItems='center'
        p='4'
        bg='cyan.50'
        borderRadius='xl'
        boxShadow='md'>
        <Input
          name='name'
          placeholder='Event Name'
          value={newEventData.name}
          onChange={handleInputChange}
          mb='2'
        />
        <Textarea
          name='description'
          placeholder='Event Description'
          value={newEventData.description}
          onChange={handleInputChange}
          mb='2'
        />
        <Input
          name='image'
          placeholder='Event Image URL'
          value={newEventData.image}
          onChange={handleInputChange}
          mb='2'
        />
        <Input
          name='location'
          placeholder='Event Location'
          value={newEventData.location}
          onChange={handleInputChange}
          mb='2'
        />
        <Input
          name='date'
          type='date'
          placeholder='Event Date'
          value={newEventData.date}
          onChange={handleInputChange}
          mb='2'
        />
        <Input
          name='authorId'
          placeholder='Author ID'
          value={newEventData.authorId}
          onChange={handleInputChange}
          mb='2'
        />
        <Button onClick={handleCreateEvent} backgroundColor='tomato' borderRadius='xl'>
          Create Event
        </Button>
        </Flex>
      </Box>
      
      <EventList events={events} joinEvent={handleJoinEvent} />
      {/* Additional components for creating events */}
      {/* Implement form inputs and button for creating events */}

      {/* Footer */}
      <Box as='footer' textAlign='center' p='4' marginTop='auto' backgroundColor='#da4b45'>
        <Text fontSize='sm' >Created by HexTeam</Text>
      </Box>
    </Flex>
  );
};

export default Dashboard;
