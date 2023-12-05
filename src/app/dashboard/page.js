// src/app/dashboard/page.js
"use client";
import { useEffect, useState } from 'react';
const useDashboard = require('../../components/hooks/useDashboard');
import EventList from '../../components/EvenList2'; // Assuming you'll create this component

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

  const handleCreateEvent = () => {
    createEvent(newEventData); // Function to create a new event
    // You might want to update UI/Reset form fields after creating event
  };

  const handleJoinEvent = (eventId, userData) => {
    joinEvent(eventId, userData); // Function to join an event
    // You might want to update UI/Reset form fields after joining event
  };

  return (
    <div>
      {/* Your dashboard UI here */}
      <EventList events={events} joinEvent={handleJoinEvent} />
      {/* Additional components for creating events */}
      {/* Implement form inputs and button for creating events */}
    </div>
  );
};

export default Dashboard;
