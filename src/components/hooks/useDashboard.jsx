// src/components/hooks/useDashboard.js
const { useState } = require('react');
const axios = require('axios');

const useDashboard = () => {
  const [events, setEvents] = useState([]);

  const getAllEvents = async () => {
    try {
      const response = await axios.get('https://eventmakers-api.vercel.app/api/events');
      //console.log('Fetched events:', response.data.data); // Log fetched data
      if (Array.isArray(response.data.data)) {
        setEvents(response.data.data); // Set fetched events in state
      } else {
        console.error('Invalid data format for events:', response.data.data);
      }
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };

  const createEvent = async (newEventData) => {
    try {
      await axios.post('https://eventmakers-api.vercel.app/api/events', newEventData);
      // You might want to update events after creation
      getAllEvents();
    } catch (error) {
      console.error('Error creating event:', error);
    }
  };

  const joinEvent = async (eventId, userData) => {
    try {
      await axios.post('https://eventmakers-api.vercel.app/api/join-events', {
        ...userData,
        eventId,
      });
      // You might want to update events after joining
      getAllEvents();
    } catch (error) {
      console.error('Error joining event:', error);
    }
  };

  return { getAllEvents, createEvent, joinEvent, events };
};

module.exports = useDashboard;
