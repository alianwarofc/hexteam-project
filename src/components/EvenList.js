import React, { useState, useEffect } from 'react';
import {
  Flex,
  Box,
  Heading,
  Text,
  Button,
  Wrap,
  WrapItem,
  Stack,
  Card,
  useColorModeValue,
} from '@chakra-ui/react';

const EventList = ({ events, joinEvent }) => {
  const [displayedEvents, setDisplayedEvents] = useState(events);
  const [selectedLocation, setSelectedLocation] = useState(null);

  useEffect(() => {
    if (selectedLocation) {
      const filteredEvents = selectedLocation === 'All Locations'
        ? events
        : events.filter((event) => event.location === selectedLocation);
      setDisplayedEvents(filteredEvents);
    }
  }, [selectedLocation, events]);

  const citiesToShow = [
    'DKI Jakarta', 'Surabaya', 'Bandung', 'Yogyakarta', 'Semarang', 'Bali', 'Medan', 'Riau', 'Palembang', 'Padang',
    'Samarinda', 'Balikpapan', 'Makassar', 'Palu', 'Manado', 'Maluku', 'Lombok', 'Papua'
  ];

  const filterByLocation = (location) => {
    setSelectedLocation(location);
  };

  const groupedByYear = displayedEvents.reduce((acc, event) => {
    const year = new Date(event.date).getFullYear();
    if (!acc[year]) {
      acc[year] = [];
    }
    acc[year].push(event);
    return acc;
  }, {});

  return (
    <Flex direction='column' alignItems='center'>
      <Wrap spacing={12} justify='center' mb={4} >
        {citiesToShow.map((location, index) => (
          <WrapItem key={index}>
            <Button
              variant='outline'
              padding={4}
              borderRadius='5px'
              colorScheme='blue'
              backgroundColor='peachpuff'
              _hover={{ backgroundColor: 'tomato' }}
              onClick={() => filterByLocation(location)}
            >
              {location}
            </Button>
          </WrapItem>
        ))}
        <WrapItem>
          <Button
            variant='outline'
            padding={4}
            borderRadius='5px'
            colorScheme='blue'
            backgroundColor='peachpuff'
            _hover={{ backgroundColor: 'tomato' }}
            onClick={() => filterByLocation('All Locations')}
          >
            All Locations
          </Button>
        </WrapItem>
      </Wrap>
      
      {Object.entries(groupedByYear).map(([year, eventsForYear]) => (
        <Box key={year} mb={8}>
          <Heading as='h2' size='lg' mb={4}>
            {year}
          </Heading>
          <Flex direction='row' flexWrap='wrap' gap={16}>
            {eventsForYear.map((displayedEvent) => (
              <EventCard key={displayedEvent.id} event={displayedEvent} joinEvent={joinEvent} />
            ))}
          </Flex>
        </Box>
      ))}
    </Flex>
  );
};
    
const EventCard = ({ event, joinEvent }) => {
  const participantsCount = event.participants ? event.participants.length : 0;
  const formattedDate = () => {
    if (!event.date) {
      return {
        year: '',
        month: '',
        day: '',
      };
    }

    const date = new Date(event.date);
    if (isNaN(date)) {
      return {
        year: '',
        month: '',
        day: '',
      };
    }

    const year = date.getFullYear();
    const month = new Intl.DateTimeFormat('en-US', { month: 'short' }).format(date);
    const day = date.getDate();

    return {
      year,
      month,
      day,
    };
  };

  const { year, month, day } = formattedDate();
  
  return (
    <Card
  // width='350px'
  // height='250px'
  minW='100%'

  marginBottom='20px'
  p={8}
  borderRadius='15px'
  backgroundColor='#faf7e7'
  textAlign='left'
  marginRight='120px'
  display='flex'
>
  <Stack direction='row' alignItems='stretch' width='100%'>
    {/* Modified date format */}
    <Stack direction='column' alignItems='center' flex='0 0 120px' marginRight='20px'>
      <Box width='120px' height='120px'>
        <img
          src={event.image}
          alt='Event Image'
          objectFit='cover'
          width='100%'
          height='100%'
          style={{ borderRadius: '15px' }}
        />
      </Box>
      <Stack direction='row' spacing={2} alignItems='center'>
        <Text fontSize='lg' fontWeight='bold'>
          {month}
        </Text>
        <Text fontSize='lg'>{day}</Text>
      </Stack>
    </Stack>
    <Stack direction='column' flexGrow={1} spacing={2}>
      <Heading as='h2' size='md' marginBottom='10px'>
        {event.name}
      </Heading>
      {/* Rest of the event details */}
      <Text>Lokasi: {event.location}</Text>
      <Text>Detail:</Text>
      <Box maxH='80px' overflow='hidden' textOverflow='ellipsis'>
        <Text>{event.description}</Text>
      </Box>
      <Flex justifyContent='space-between' gap='20px' alignItems='center'>
        <Button onClick={() => joinEvent(event.id)} backgroundColor='peachpuff' _hover={{ backgroundColor: 'tomato' }} padding={4} borderRadius='10px'>
          Join Event
        </Button>
        <Text>{participantsCount} Participants</Text>
      </Flex>
    </Stack>
  </Stack>
</Card>

  );
};

export default EventList;
