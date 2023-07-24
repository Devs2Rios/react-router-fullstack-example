import { useState, useEffect } from "react";
import EventsList from '../components/EventsList';

export default function Events() {
    const [events, setEvents] = useState([]),
        [isLoading, setIsLoading] = useState(true),
        [error, setError] = useState(null);

    useEffect(() => {
        (
            async () => {
                setIsLoading(true);
                await fetch("http://localhost:8080/events")
                    .then((res) => {
                        if (res.ok) return res.json();
                        setError('Couldn\'t fetch events');
                    })
                    .then((data) => {
                        setError(null);
                        setIsLoading(false);
                        setEvents(data.events);
                    })
                    .catch((err) => {
                        setIsLoading(false);
                        setError(err.message);
                    });
            }
        )();
    }, []);

    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;
    return <EventsList events={events} />;
}