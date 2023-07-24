import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import EventItem from "../components/EventItem";

export default function EventDetail() {
    const { eventId } = useParams(),
        [event, setEvent] = useState(null),
        [isLoading, setIsLoading] = useState(true),
        [error, setError] = useState(null);;

    useEffect(() => {
        (
            async () => {
                setIsLoading(true);
                await fetch(`http://localhost:8080/events/${eventId}`)
                    .then((res) => {
                        if (res.ok) return res.json();
                        setError('Couldn\'t fetch event');
                    })
                    .then((data) => {
                        setError(null);
                        setIsLoading(false);
                        setEvent(data.event);
                    })
                    .catch((err) => {
                        setIsLoading(false);
                        setError(err.message);
                    });
            }
        )();
    }, [eventId]);

    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;
    return <EventItem event={event} />;
}