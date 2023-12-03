import React, { useState } from 'react';
import {
  Flex,
  Card,
  Badge,
  CardHeader,
  CardBody,
  CardFooter,
  Heading,
  Text,
  Button,
  Divider,
  Stack,
  Box,
  useColorModeValue,
} from '@chakra-ui/react';

const EventList = ({ events, joinEvent }) => {
  const sortedEvents = events.slice().sort((a, b) => new Date(b.date) - new Date(a.date));
  const [displayedEvents, setDisplayedEvents] = useState(sortedEvents);

  const filterEvents = (range) => {
    let filteredEvents = [];
    const today = new Date();
    const todayFormatted = today.toISOString().split('T')[0];

    switch (range) {
      case 'today':
        filteredEvents = sortedEvents.filter((event) => event.date === todayFormatted);
        break;
      case 'thisWeek':
        const startOfWeek = new Date(today.setDate(today.getDate() - today.getDay())).toISOString().split('T')[0];
        const endOfWeek = new Date(today.setDate(today.getDate() - today.getDay() + 6)).toISOString().split('T')[0];
        filteredEvents = sortedEvents.filter((event) => event.date >= startOfWeek && event.date <= endOfWeek);
        break;
      case 'thisMonth':
        const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1).toISOString().split('T')[0];
        filteredEvents = sortedEvents.filter((event) => event.date >= startOfMonth && event.date <= todayFormatted);
        break;
      default:
        filteredEvents = sortedEvents;
    }

    setDisplayedEvents(filteredEvents);
  };

  return (
    <Flex direction='column' alignItems='center'>
      <Button variant='outline' colorScheme='blue' marginBottom='10px' onClick={() => filterEvents('today')}>
        Today
      </Button>
      <Button variant='outline' colorScheme='green' marginBottom='10px' onClick={() => filterEvents('thisWeek')}>
        This Week
      </Button>
      <Button variant='outline' colorScheme='purple' marginBottom='10px' onClick={() => filterEvents('thisMonth')}>
        This Month
      </Button>
      <Divider marginBottom='20px' />

      <Flex
        direction='row'
        alignItems='flex-start'
        justifyContent='center'
        flexWrap='wrap'
        gap={4}
        maxWidth='1200px' // Set a max width to limit the cards per row based on screen size
        width='100%'
        paddingX={[4, 6]}
      >
        {displayedEvents.map((event) => (
          <EventCard key={event.id} event={event} joinEvent={joinEvent} />
        ))}
      </Flex>
    </Flex>
  );
};

const EventCard = ({ event, joinEvent }) => {
  const participantsCount = event.participants ? event.participants.length : 0;

  return (
    <Card
      key={event.id}
      width='auto'
      marginBottom='20px'
      display='flex'
      flexDirection='column'
      justifyContent='space-between'
      boxShadow='0px 0px 2px 2px rgba(0,0,0,0.1)'
      p={4}
      borderRadius='xl'
      backgroundColor={useColorModeValue('white', 'gray.800')}
      textAlign='center'
    >
      <Box width={{ base: '100%', sm: '200px' }} flexShrink='0' marginRight={{ base: '0', sm: '20px' }}>
        <img src={event.image} alt='Event Image' objectFit='cover' maxW='100%' />
      </Box>

      <Stack flexGrow={3} marginLeft={{ base: '0', sm: '20px' }} marginTop={{ base: '10px', sm: '0' }}>
        <CardHeader>
          <Heading size='md'>{event.name}</Heading>
        </CardHeader>
        <CardBody>
          <Text>Tanggal: {event.date}</Text>
          <Text>Lokasi: {event.location}</Text>
          <Text>Detail:</Text>
          <Text>{event.description}</Text>
        </CardBody>
        <Divider />
        <CardFooter justifyContent='space-between' alignItems='center' display='flex'>
          <Button onClick={() => joinEvent(event.id)} backgroundColor='MediumSeaGreen'>
            Join Event
          </Button>
          <Text>{participantsCount} Participants</Text>
        </CardFooter>
      </Stack>
    </Card>
  );
};

export default EventList;
