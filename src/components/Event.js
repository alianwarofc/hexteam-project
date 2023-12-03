import { useEffect, useState } from 'react';
import axios from 'axios';
import EventList from './EventList'; // Assuming EventList component path

const Event = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    axios.get('https://eventmakers-api.vercel.app/api/events')
      .then((response) => {
        console.log('API Response:', response.data);
        setEvents(response.data.data);
        setLoading(false); // Set loading to false after data is fetched
      })
      .catch((error) => {
        console.error('Error fetching events:', error);
        setLoading(false); // Set loading to false in case of error
      });
  }, []);

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <EventList events={events} />
      )}
    </div>
  );
};

export default Event;
